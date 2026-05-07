import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { z } from "zod";

const DEFAULT_ENDPOINT = "https://mcp.atlassian.com/v1/mcp";

function getConfig() {
  return {
    endpoint: process.env.ATLASSIAN_MCP_ENDPOINT || DEFAULT_ENDPOINT,
    oauthBearerToken: process.env.ATLASSIAN_BEARER_TOKEN,
    apiToken: process.env.ATLASSIAN_API_TOKEN,
    atlassianEmail: process.env.ATLASSIAN_EMAIL
  };
}

function buildAuthHeaders(config) {
  const headers = {
    "Content-Type": "application/json"
  };

  if (config.oauthBearerToken) {
    headers.Authorization = `Bearer ${config.oauthBearerToken}`;
    return headers;
  }

  if (config.apiToken && config.atlassianEmail) {
    const token = Buffer.from(`${config.atlassianEmail}:${config.apiToken}`).toString("base64");
    headers.Authorization = `Basic ${token}`;
    return headers;
  }

  throw new Error(
    "Authentication is not configured. Set ATLASSIAN_BEARER_TOKEN for OAuth 2.1, or ATLASSIAN_EMAIL + ATLASSIAN_API_TOKEN if your Atlassian org allows API token auth."
  );
}

async function withAtlassianClient(callback) {
  const config = getConfig();
  const headers = buildAuthHeaders(config);

  const client = new Client({
    name: "patch-release-notes-upstream-client",
    version: "0.1.0"
  });

  const transport = new StreamableHTTPClientTransport(new URL(config.endpoint), {
    requestInit: {
      headers
    }
  });

  try {
    await client.connect(transport);
    return await callback(client);
  } finally {
    await client.close();
  }
}

function normalizeTextFromContent(content) {
  if (!Array.isArray(content)) {
    return "";
  }

  return content
    .map((item) => {
      if (!item) {
        return "";
      }

      if (typeof item.text === "string") {
        return item.text;
      }

      if (typeof item === "string") {
        return item;
      }

      return JSON.stringify(item);
    })
    .join("\n")
    .trim();
}

function classifyLine(line) {
  const lower = line.toLowerCase();

  if (lower.includes("bug") || lower.includes("fix") || lower.includes("defect") || lower.includes("hotfix")) {
    return "Fixed";
  }

  if (lower.includes("feat") || lower.includes("story") || lower.includes("new") || lower.includes("add")) {
    return "Added";
  }

  return "Changed";
}

function buildPatchReleaseNotes({
  productName,
  patchVersion,
  releaseDate,
  upstreamFindings,
  includeRawOutputs
}) {
  const today = new Date().toISOString().slice(0, 10);
  const dateValue = releaseDate || today;

  const grouped = {
    Added: [],
    Changed: [],
    Fixed: []
  };

  for (const finding of upstreamFindings) {
    const text = finding.outputText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (text.length === 0) {
      grouped.Changed.push(`Result from ${finding.toolName}: no textual content returned.`);
      continue;
    }

    for (const line of text) {
      grouped[classifyLine(line)].push(line);
    }
  }

  const lines = [];
  lines.push(`# ${productName} ${patchVersion}`);
  lines.push("");
  lines.push(`Patch release date: ${dateValue}`);
  lines.push("");

  for (const section of ["Added", "Changed", "Fixed"]) {
    lines.push(`## ${section}`);

    if (grouped[section].length === 0) {
      lines.push("- No updates in this category.");
    } else {
      for (const entry of grouped[section]) {
        lines.push(`- ${entry}`);
      }
    }

    lines.push("");
  }

  if (includeRawOutputs) {
    lines.push("## Source Data");
    lines.push("");

    for (const finding of upstreamFindings) {
      lines.push(`### ${finding.toolName}`);
      lines.push("```text");
      lines.push(finding.outputText || "(no text output)");
      lines.push("```");
      lines.push("");
    }
  }

  return lines.join("\n").trim();
}

const server = new McpServer({
  name: "atlassian-rovo-release-notes-mcp",
  version: "0.1.0"
});

server.registerTool(
  "list_atlassian_tools",
  {
    title: "List Atlassian Rovo Tools",
    description: "Lists tools available from the Atlassian Rovo Remote MCP server.",
    inputSchema: {}
  },
  async () => {
    const result = await withAtlassianClient(async (client) => client.listTools());
    const toolNames = result.tools?.map((tool) => tool.name) || [];

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ endpoint: getConfig().endpoint, toolNames }, null, 2)
        }
      ]
    };
  }
);

server.registerTool(
  "test_atlassian_connection",
  {
    title: "Test Atlassian Rovo Connection",
    description: "Verifies connectivity and authentication by listing tools from the remote MCP endpoint.",
    inputSchema: {}
  },
  async () => {
    const result = await withAtlassianClient(async (client) => client.listTools());
    const count = result.tools?.length || 0;

    return {
      content: [
        {
          type: "text",
          text: `Connected to ${getConfig().endpoint}. ${count} tool(s) are available.`
        }
      ]
    };
  }
);

server.registerTool(
  "generate_patch_release_notes",
  {
    title: "Generate Patch Release Notes",
    description:
      "Calls one or more Atlassian Rovo MCP tools, then composes markdown release notes for a patch version.",
    inputSchema: {
      productName: z.string().min(1).describe("Product or service name."),
      patchVersion: z.string().min(1).describe("Patch version, for example 3.2.7."),
      releaseDate: z.string().optional().describe("Release date in YYYY-MM-DD. Defaults to today."),
      includeRawOutputs: z.boolean().default(false),
      remoteCalls: z
        .array(
          z.object({
            toolName: z.string().min(1),
            arguments: z.record(z.any()).default({})
          })
        )
        .min(1)
        .describe("Ordered list of remote Atlassian MCP tool calls used as source data.")
    }
  },
  async ({ productName, patchVersion, releaseDate, includeRawOutputs, remoteCalls }) => {
    const upstreamFindings = await withAtlassianClient(async (client) => {
      const findings = [];

      for (const call of remoteCalls) {
        const remoteResult = await client.callTool({
          name: call.toolName,
          arguments: call.arguments
        });

        findings.push({
          toolName: call.toolName,
          outputText: normalizeTextFromContent(remoteResult.content)
        });
      }

      return findings;
    });

    const markdown = buildPatchReleaseNotes({
      productName,
      patchVersion,
      releaseDate,
      upstreamFindings,
      includeRawOutputs
    });

    return {
      content: [
        {
          type: "text",
          text: markdown
        }
      ]
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("MCP server failed to start:", error);
  process.exit(1);
});