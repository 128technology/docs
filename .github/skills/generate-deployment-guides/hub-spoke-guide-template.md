# SSR Hub and Spoke Deployment Guide Template

Use this template to generate a consistently structured SSR Hub and Spoke Router Deployment Guide set for a target platform (for example, Azure, AWS, VMware ESXi, KVM, Google Cloud). The reference implementation is the **Azure Hub and Spoke Routers** guide:

| Reference File | Role |
|----------------|------|
| [deploy_azure_hub_spoke_overview.mdx](../../../docs/deploy_azure_hub_spoke_overview.mdx) | Overview |
| [deploy_azure_hub_spoke_hub_vm.mdx](../../../docs/deploy_azure_hub_spoke_hub_vm.mdx) | Step 1 — Create the hub router VM |
| [deploy_azure_hub_spoke_spoke_vm.mdx](../../../docs/deploy_azure_hub_spoke_spoke_vm.mdx) | Step 2 — Create the spoke router VM |
| [deploy_azure_hub_spoke_vmbus.mdx](../../../docs/deploy_azure_hub_spoke_vmbus.mdx) | Step 3 — Verify installation and discover interface identifiers |
| [deploy_azure_hub_spoke_config.mdx](../../../docs/deploy_azure_hub_spoke_config.mdx) | Step 4 — Configure the hub and spoke routers |
| [deploy_appendix_azure_hub_spoke.mdx](../../../docs/deploy_appendix_azure_hub_spoke.mdx) | Appendix — PCLI configuration |
| [_deploy_azure_hub_spoke_network_design.md](../../../docs/_deploy_azure_hub_spoke_network_design.md) | Partial — network design table |

The VMware hub and spoke router guides (`deploy_vmware_hub_router_*`, `deploy_vmware_router_*`) cover the same deployment as two separate guides. Use them as the reference for on-premises variations: interactive ISO install, VLAN setup, router initialization, and PCI address discovery.

This guide set depends on a deployed conductor. Generate the conductor guide first by using [SKILL.md](SKILL.md).

## Inputs

Ask for the following if not provided:

1. **Platform name** — display name used in titles (for example, `Azure`, `AWS`, `VMware ESXi`).
2. **Platform slug** — lowercase identifier used in filenames (for example, `azure`, `aws`, `vmware`).
3. **SSR version** — the version installed on both routers (for example, `7.1.4`). Must be lower than or equal to the conductor version.
4. **License / deployment model** — for example, BYOL conductor-managed router template, PAYG, ISO install, OVA.
5. **Conductor guide** — the doc id of the conductor deployment guide this set depends on (for example, `deploy_azure_conductor`).
6. **Example network values** — region/location, resource group or datacenter, network name and CIDR, hub WAN/LAN subnets, spoke WAN/LAN subnets, LAN gateway IPs.
7. **Router names** — hub and spoke router names (for example, `azure-hub-router`, `azure-spoke-router`).
8. **Interface identifier type** — how device interfaces are identified on this platform: VMBus UUID (Azure), PCI address (VMware, KVM), or other.
9. **Interface layout** — Linux interface names, platform NIC names, and subnets for each router (for example, `ge-0-0` WAN, `ge-0-1` LAN).
10. **Platform prerequisites** — account permissions, identity/role requirements, required existing infrastructure.
11. **Recommended instance sizes** — instance/VM types with vNICs, vCPU, and memory.
12. **Install mechanism** — automated (cloud-init / bootstrapper) or interactive (ISO installer), and expected install duration.
13. **Screenshots** — whether platform screenshots exist in `static/img/`. If not, insert image placeholders and list them in the report.

## File Structure

Every Hub and Spoke Deployment Guide set consists of six published pages and one partial. Replace `<platform>` with the platform slug.

```text
docs/
├── deploy_<platform>_hub_spoke_overview.mdx          # Overview (sidebar: "Overview")
├── deploy_<platform>_hub_spoke_hub_vm.mdx            # Step 1: Create the Hub Router VM
├── deploy_<platform>_hub_spoke_spoke_vm.mdx          # Step 2: Create the Spoke Router VM
├── deploy_<platform>_hub_spoke_<id-type>.mdx         # Step 3: Verify Installation and Discover <Identifier>s
├── deploy_<platform>_hub_spoke_config.mdx            # Step 4: Configure Hub and Spoke Routers
├── deploy_appendix_<platform>_hub_spoke.mdx          # Appendix: <Platform> Hub and Spoke Configuration
└── _deploy_<platform>_hub_spoke_network_design.md    # Partial: network design reference table
```

`<id-type>` is the interface identifier slug: `vmbus` for Azure, `pci` for VMware or KVM.

### Sidebar Registration

Register the six published pages (never the partial) in [sidebars.js](../../../sidebars.js) under **Router Deployment Guides**, in this order:

```js
{
  "type": "category",
  "label": "<Platform> Hub and Spoke Routers",
  "items": [
    "deploy_<platform>_hub_spoke_overview",
    "deploy_<platform>_hub_spoke_hub_vm",
    "deploy_<platform>_hub_spoke_spoke_vm",
    "deploy_<platform>_hub_spoke_<id-type>",
    "deploy_<platform>_hub_spoke_config",
    "deploy_appendix_<platform>_hub_spoke",
  ],
},
```

## Placeholder Conventions

Use these placeholders throughout the outline. Replace every one before publishing, except the identifier placeholders that the reader fills in (for example, `<hub-wan-vmbus-uuid>`).

| Placeholder | Meaning | Azure Example |
|-------------|---------|---------------|
| `<Platform>` | Platform display name | `Azure` |
| `<platform>` | Platform slug | `azure` |
| `<version>` | SSR version installed | `7.1.4` |
| `<license-model>` | License / deployment model | `BYOL` |
| `<Identifier>` | Interface identifier display name | `VMBus UUID` |
| `<id-type>` | Interface identifier slug | `vmbus` |
| `<conductor-guide>` | Conductor guide doc id | `deploy_azure_conductor` |
| `<conductor-public-ip>` | Conductor public or management IP | Azure-assigned public IP |
| `<hub-router>` | Hub router name | `azure-hub-router` |
| `<spoke-router>` | Spoke router name | `azure-spoke-router` |
| `<hub-tenant>` | Hub LAN tenant | `hub-corp` |
| `<spoke-tenant>` | Spoke LAN tenant | `spoke-corp` |
| `<hub-wan-id>`, `<hub-lan-id>`, `<spoke-wan-id>`, `<spoke-lan-id>` | Reader-supplied interface identifiers | `<hub-wan-vmbus-uuid>` |

Use the same example values in every file of the set. The network design partial is the single source of truth for these values.

### Fixed Design Values

These values define the hub and spoke pattern. Keep them unless the subject matter expert specifies otherwise.

| Object | Hub Router | Spoke Router |
|--------|-----------|--------------|
| Node name | `node0` | `node0` |
| Node role | `Combo` | `Combo` |
| WAN device interface / network interface | `wan-dev` / `wan1` | `wan-dev` / `wan1` |
| LAN device interface / network interface | `lan-dev` / `lan1` | `lan-dev` / `lan1` |
| WAN Global-ID / LAN Global-ID | `1` / `2` | `1` / `2` |
| Neighborhood / topology | `internet` / `hub` | `internet` / `spoke` |
| Management vector name / priority | `mgmt-vec-wan` / `100` | `mgmt-vec-wan` / `100` |
| DNS servers | `1.1.1.1`, `8.8.8.8` | `1.1.1.1`, `8.8.8.8` |
| Service | `Internet-Traffic` (`0.0.0.0/0`) | `Internet-Traffic` (`0.0.0.0/0`) |
| Service route | `internet-breakout` — Service Agent, next hop `node0/wan1` | `internet-via-hub` — Peer, peer `<hub-router>` |

## File Outlines

Each outline lists the frontmatter, imports, intro paragraph, and the required headings in order. Under each heading, the bullets describe the required content. Keep the heading text as shown unless the platform requires a different action (for example, `Deploy via Azure Portal` becomes `Deploy via AWS Console`).

### 1. Overview — `deploy_<platform>_hub_spoke_overview.mdx`

**Frontmatter**

```yaml
---
title: "Deploying <Platform> Hub and Spoke Routers"
sidebar_label: Overview
---
```

**Imports**

```mdx
import NetworkDesign from './_deploy_<platform>_hub_spoke_network_design.md';
```

**Intro paragraph** (no heading)

- One paragraph: This guide walks you through deploying a **hub router and a spoke router on `<Platform>`** as conductor-managed SSR instances using `<license-model>`.
- State the end state: both routers run SSR `<version>`, are connected to a pre-existing conductor, and forward traffic with the behavior below.
- Bulleted behavior list:
  - **Hub router** — direct internet breakout for hub LAN users; internet gateway for the spoke over an SVR peer path.
  - **Spoke router** — LAN services for spoke users; routes internet-bound traffic through the hub via SVR.
  - **Both routers** — reach the conductor using management over forwarding on their WAN interfaces.
- `:::note` — this guide assumes a conductor running SSR `<version>` exists; link to the conductor deployment guide.

**`## Guide Topics`**

- Table with columns `Step`, `Topic`, `Description`.
- One row per published page: Steps 1–4 and the appendix (use `—` as the step number for the appendix).
- Each topic links to its page.

**`## Network Topology`**

- One sentence introducing the diagram.
- Mermaid `graph TD` diagram showing: Internet, platform region/datacenter, network with CIDR, conductor (private IP, subnet), hub router (WAN DHCP subnet, LAN IP), spoke router (WAN DHCP subnet, LAN IP), hub LAN devices (`<hub-tenant>`), spoke LAN devices (`<spoke-tenant>`), internet gateway.
- Required labeled links:
  - Hub ↔ Internet — internet breakout, `Internet-Traffic`.
  - Spoke ↔ Hub — SVR `Internet-Traffic`, topology spoke → hub.
  - Each router ↔ Conductor — management ports `930/4505/4506`.

**`## Roles`**

- Table with columns `Device`, `Type`, `Role`. One row each for the conductor (pre-existing), hub router, and spoke router.
- `:::note` — any SSR conductor (hardware or virtual) can be used; the examples use a `<Platform>` conductor.

**`## Network Design Reference`**

- Render `<NetworkDesign/>` only.

**`## Prerequisites`**

- Lead-in sentence: Before beginning, ensure the following are available.
- Bulleted list, each item with a bold label and description:
  - **Pre-existing SSR conductor** — running SSR `<version>`, reachable from both WAN interfaces; link to the conductor guide.
  - Platform account/subscription with required permissions.
  - Network with the four router subnets already created (hub WAN, hub LAN, spoke WAN, spoke LAN). WAN subnets must have internet egress.
  - Identity / role with minimum permissions (link to Step 1 `#requirements`).
  - Juniper software access credentials (Artifactory username and token).

**`## Software Version Requirements`**

- State the SSR version installed on both routers and the minimum conductor version.
- `:::note` — router software version must be lower than or equal to the conductor software version.

**`## Related Documentation`**

- Bulleted links, at minimum:
  - The conductor deployment guide for this platform
  - [Management Traffic over Forwarding Interfaces](config_management_over_forwarding.md)
  - [Conductor Deployment Best Practices](bcp_conductor_deployment.md)
  - [Onboard an SSR Device to a Conductor](onboard_ssr_to_conductor.md)
  - Platform-specific router installation page
  - [System Requirements](intro_system_reqs.md)

### 2. Step 1 — `deploy_<platform>_hub_spoke_hub_vm.mdx`

**Frontmatter**

```yaml
---
title: "Step 1: Create the Hub Router VM"
sidebar_label: "Create the Hub Router VM"
---
```

**Intro paragraph** (no heading)

- What this step deploys and from where, which subnets the VM attaches to, and that SSR `<version>` installs and configures the node as a conductor-managed router automatically (or describe the interactive install).

**`## Requirements`**

- Lead-in: The following infrastructure must exist before deploying the hub router.
- Bulleted list: network with hub WAN and hub LAN subnets, identity/role, conductor public IP (link to conductor guide).
- Code block (`text`) listing the minimum permissions for the identity/role.
- `:::note` — a dedicated management subnet is not required; management traffic uses management over forwarding on the WAN interface (single link to `config_management_over_forwarding.md`).

**`## Recommended VM Sizes`**

- Table with columns `<Platform> VM Size`, `Max vNICs`, `vCPU Cores`, `Memory`.
- Link to [System Requirements](intro_system_reqs.md) for sizing guidance.
- On-premises platforms: rename to `## VM Minimum Requirements` and list CPU, memory, disk, and NIC minimums.

**`## What the Template Creates`** (template-based platforms only)

- Lead-in: When you deploy the hub router using the template, `<Platform>` automatically creates:
- Bulleted list: VM and image, two network interfaces (WAN `ge-0-0`, LAN `ge-0-1`), security group per interface, public IP on WAN.
- Sentence noting the optional dedicated management interface is not used in this guide.

**`## Select the <license-model> Plan`** (Marketplace platforms only)

- Numbered procedure: open the Marketplace listing (linked), select the plan tab, locate the **conductor-managed router** offering, launch.
- Screenshot after each step that changes the UI.

**`## Deploy via <Platform> Portal`** (or Console / CLI / vSphere Client)

- Numbered procedure.
- Parameter table with columns `Parameter`, `Example Value`, `Notes`. Include every template field in UI order. Router-specific rows:
  - Instance Name — `<hub-router>`.
  - Primary Control IP — `<conductor-public-ip>`.
  - Secondary Control IP — leave blank unless the conductor is HA.
  - Public (WAN) subnet and allowed CIDR — hub WAN subnet.
  - Private (LAN) subnet and allowed CIDR — hub LAN subnet.
  - Admin allowed CIDR and SSH public key.
- `:::caution` — restrict the public subnet and admin CIDRs to known source addresses.
- Steps to validate, review terms, and create.
- Step to open deployment outputs, with a screenshot, and record the router public IP.

**`## Network Interface Layout`**

- Lead-in: use this interface information to assign the LAN and WAN interfaces later.
- Table with columns `Linux Interface`, `<Platform> NIC Name`, `Subnet`. Rows: `ge-0-0` → hub WAN, `ge-0-1` → hub LAN.

**`## Next Step`**

- Single sentence: Proceed to [Step 2 — Create the Spoke Router VM](deploy_<platform>_hub_spoke_spoke_vm.mdx).

### 3. Step 2 — `deploy_<platform>_hub_spoke_spoke_vm.mdx`

Mirrors Step 1 with spoke values. Do not repeat sections that are identical for both routers when a link back to Step 1 is sufficient (for example, recommended VM sizes).

**Frontmatter**

```yaml
---
title: "Step 2: Create the Spoke Router VM"
sidebar_label: "Create the Spoke Router VM"
---
```

**Intro paragraph** (no heading)

- Same as Step 1, with spoke subnets.

**`## Requirements`**

- Bulleted list: network with spoke WAN and spoke LAN subnets; the same identity as the hub (or one with the same permissions); a conductor; a hub router.
- State that you can deploy the spoke while the hub installation completes.

**`## Select the <license-model> Plan`** (Marketplace platforms only)

- Same procedure as Step 1.

**`## Deploy via <Platform> Portal`**

- Same structure as Step 1. Use `<spoke-router>` and the spoke WAN/LAN subnets in every row and note.

**`## Network Interface Layout`**

- Table with columns `Linux Interface`, `<Platform> NIC Name`, `Subnet`. Rows: `ge-0-0` → spoke WAN, `ge-0-1` → spoke LAN. Use spoke NIC names.

**`## Next Step`**

- Single sentence: After both VMs are deployed, proceed to [Step 3 — Verify Installation and Discover `<Identifier>`s](deploy_<platform>_hub_spoke_<id-type>.mdx).

### 4. Step 3 — `deploy_<platform>_hub_spoke_<id-type>.mdx`

**Frontmatter**

```yaml
---
title: "Step 3: Verify Installation and Discover <Identifier>s"
sidebar_label: "Verify and Discover <Identifier>s"
---
```

**Intro paragraph** (no heading)

- This step waits for SSR `<version>` to finish installing on both VMs, confirms both routers appear on the conductor, and discovers the `<Identifier>` for each WAN and LAN interface. You must record these before configuring the routers.

**`## Wait for Installation to Complete`** (automated installs)

- Expected duration (for example, approximately 20 minutes).
- State that both VMs install in parallel.
- Completion criterion: both routers appear in `show assets` on the conductor.

**`## Install SSR Software`** and **`## Initialize the Router`** (interactive installs only — replace the section above)

- Import shared install partials. Initialize each router with the conductor address and asset ID.

**`## Verify the Routers Are Running`**

- Procedure: on each router, `su admin`, then `show system` (code block, `text`). Expected status `running`. Show the prompt for both routers.

**`## Verify the Routers Appear on the Conductor`**

- Numbered GUI procedure: **Configuration** → **Authority** → **Routers**; both routers appear with pending associations.
- Troubleshooting bullets when a router does not appear within 15 minutes: conductor reachability on ports `930`, `4505`, `4506`; correct conductor IP in the template or cloud-init.

**`## Network Interface Layout`**

- Lead-in: the template attaches interfaces in the following order.
- Table with columns `Router`, `Linux Interface`, `<Platform> NIC Name`, `Subnet`. Include all four interfaces (hub WAN, hub LAN, spoke WAN, spoke LAN).

**`## Discover <Identifier>s`**

- Explain why the identifier is required on this platform (for example, Azure identifies interfaces by VMBus UUID rather than PCI address).
- State that you perform the steps on each router separately and record the values for Step 4.

**`### Identify <Identifier>s From the Router VM`**

- Command to read the identifier mapping (for example, `sudo cat /var/lib/128technology/devicemap.json | jq`).
- Instruction to exit the PCLI and run the command from the Linux shell.
- Example output in a code block (`json` or `text`), with the identifier field shown for each interface.

**`### <Identifier> Reference Table`**

- Lead-in: record your discovered values; you substitute them throughout Step 4.
- Table with columns `Router`, `Interface`, `Role`, `Subnet`, `<Identifier>`. Four rows using reader-supplied placeholders (`<hub-wan-id>`, `<hub-lan-id>`, `<spoke-wan-id>`, `<spoke-lan-id>`).

**`## Next Step`**

- Single sentence: Proceed to [Step 4 — Configure Hub and Spoke Routers](deploy_<platform>_hub_spoke_config.mdx).

### 5. Step 4 — `deploy_<platform>_hub_spoke_config.mdx`

**Frontmatter**

```yaml
---
title: "Step 4: Configure Hub and Spoke Routers"
sidebar_label: "Configure Hub and Spoke Routers"
---
```

**Intro paragraph** (no heading)

- This step updates authority-level objects for hub and spoke tenants, then configures each router's WAN interface, LAN interface, and service routes. The hub provides direct breakout; the spoke routes internet traffic to the hub over SVR.
- All steps are performed from the Conductor GUI at `https://<conductor-public-ip>` unless otherwise noted.
- `:::note` — the complete PCLI configuration is in the appendix.

**`## Part 1: Update Authority-Level Configuration`**

- Explain that tenants and services must exist before the routers are activated, and how to handle the `corp` tenant / `Internet-Traffic` service created by the conductor guide (rename or create new).
- `:::note` — authority name and conductor address must already be set; link to steps 1–3 of the conductor configuration page.

- **`### 1. Create the Hub Tenant`**
  - One sentence describing `<hub-tenant>`.
  - Numbered GUI procedure: Authority → Tenants → ADD → name → SAVE → VALIDATE → COMMIT, with screenshots.
- **`### 2. Create the Spoke Tenant`**
  - One sentence describing `<spoke-tenant>`.
  - Numbered GUI procedure (same pattern), with screenshots.
- **``### 3. Create or Update the `Internet-Traffic` Service``**
  - Explain that both tenants need access so the hub forwards traffic for hub LAN users and spoke users arriving over SVR.
  - Numbered GUI procedure: Authority → Services → ADD (or select existing) → name → verify Enabled → Service Addresses `0.0.0.0/0` → two access policies (`<hub-tenant>`, `<spoke-tenant>`) → VALIDATE → COMMIT, with screenshots.
  - `:::info` — without the `<spoke-tenant>` access policy, the hub drops spoke-originated internet traffic.

**`## Part 2: Configure the Hub Router`**

- **`### Add the Hub Router to the Authority`**
  - Numbered GUI procedure: Authority → Routers → ADD → `<hub-router>` → SAVE → Inter-node Security Policy `Internal` → Nodes ADD → `node0` → SAVE, with screenshots.
- **`### Assign the Hub Router's Asset ID`**
  - One sentence explaining why the asset ID is required.
  - Bullets: select the asset ID reported by the hub VM; set Role to `Combo`. Then VALIDATE and COMMIT.
- **`### 1. Configure the Hub WAN Interface`**
  - One paragraph: the WAN interface (`ge-0-0` / hub WAN subnet) gets a DHCP address, carries internet forwarding and conductor management traffic, and uses neighborhood topology `hub`.
  - **`#### 1a. Create the Hub WAN Device Interface`**
    - Numbered procedure: router → node → Device Interfaces ADD → `wan-dev` → type `ethernet` → identifier type `<Identifier>` and value from Step 3, with screenshots.
    - `:::note` — `ge-0-0` must be the WAN device interface for onboarding to succeed.
  - **`#### 1b. Create the Hub WAN Network Interface`**
    - Numbered procedure: Network Interfaces ADD → `wan1`.
    - Basic Information bullets: Global-ID `1`, Type `external`, DHCP `v4`, Security Policy `internal`.
    - Management Traffic Settings bullets: Conductor `true`, Management Enabled `true`, Management Vector Name `mgmt-vec-wan`, Priority `100`, Default Route `true`.
    - Source NAT `true`.
    - Neighborhood `internet`, Topology `hub`.
    - Screenshot after each settings group.
  - `:::important` — topology `hub` distinguishes the hub from spokes and drives auto-generated adjacencies; Conductor, Source NAT, and Default Route must all be `true` because management traffic originates from `169.254.x.x`.
- **`### 2. Configure the Hub LAN Interface`**
  - One sentence: the LAN interface (`ge-0-1` / hub LAN subnet) assigns `<hub-tenant>` to inbound traffic.
  - **`#### 2a. Create the Hub LAN Device Interface`**
    - Numbered procedure: Device Interfaces ADD → `lan-dev` → type `ethernet` → `<Identifier>` from Step 3 → Forwarding `true`, with screenshots.
  - **`#### 2b. Create the Hub LAN Network Interface`**
    - Numbered procedure: Network Interfaces ADD → `lan1`.
    - Basic Information bullets: Type `external`, Global-ID `2`, DHCP `disabled`, Tenant `<hub-tenant>`, Security Policy `internal`.
    - Source NAT `true`.
    - Interface Addresses: hub LAN IP and prefix length.
- **`### 3. Configure Hub DNS`**
  - One sentence: DNS lets the router resolve FQDNs for conductor connectivity and software downloads.
  - Numbered procedure: return to router level → DNS Config ADD → Mode **Static** → add `1.1.1.1` and `8.8.8.8`, with screenshots.
- **`### 4. Create the Hub Internet Service Route`**
  - One sentence: the hub sends internet traffic from its LAN and from spokes directly out of its WAN.
  - Numbered procedure: router level → Service Routes ADD → `internet-breakout` → Service Name `Internet-Traffic` → Type **Service Agent** → Next Hops ADD (`node0`, `wan1`) → VALIDATE → COMMIT, with screenshots.

**`## Part 3: Configure the Spoke Router`**

Mirror Part 2 with spoke values. Keep the same subsection names, replacing "Hub" with "Spoke". Differences from Part 2:

- WAN neighborhood topology is `spoke`.
- LAN tenant is `<spoke-tenant>` and LAN IP is the spoke LAN IP.
- **`### 4. Create the Spoke Internet Service Route`**
  - One sentence: the spoke does not break out directly; it forwards internet traffic to the hub over the SVR peer path in the shared `internet` neighborhood.
  - Numbered procedure: router level → Service Routes ADD → `internet-via-hub` → Service Name `Internet-Traffic` → Type **Peer Service Route** → Peer `<hub-router>` → VALIDATE → COMMIT, with screenshots.
  - `:::info` — the peer service route sends matched traffic over SVR to the hub, whose `internet-breakout` route forwards it to the internet.

**`## Verify Connectivity`**

- Lead-in: after commit, all nodes must reach the `synchronized` state; view status under **Routers** in the Conductor GUI.
- **`### Verify Both Routers Are Connected to the Conductor`**
  - Both routers show **Connected** within 2–5 minutes, with status `Up`.
- **`### Verify SVR Peering Between Hub and Spoke`**
  - GUI path to **Peer Paths**. Hub shows spoke as peer `Up`; spoke shows hub as peer `Up`.
- **`### Verify ARP on the WAN Interfaces`**
  - Platform note on why ARP is used (for example, Azure gateways do not respond to ICMP).
  - `show arp` on each router (code block, `text`); look for valid entries on `wan1`.
- **`### Verify Internet Reachability`**
  - Optional `ping 8.8.8.8` from each router (code block, `text`).
  - Spoke traffic traverses the SVR path to the hub before breakout.
  - First troubleshooting steps if the ping fails.

**`## Configuration Summary`**

- **`### Hub Router`** — table with columns `Object`, `Name`, `Key Settings`. Rows: Router, WAN Device Interface, WAN Network Interface, LAN Device Interface, LAN Network Interface, DNS, Service Route.
- **`### Spoke Router`** — same table with spoke values.

**`## Related Documentation`**

- Bulleted links, at minimum: the appendix, [Management Traffic over Forwarding Interfaces](config_management_over_forwarding.md), the platform page that explains the interface identifier, [Conductor Deployment Best Practices](bcp_conductor_deployment.md).

### 6. Appendix — `deploy_appendix_<platform>_hub_spoke.mdx`

**Frontmatter**

```yaml
---
title: "Appendix: <Platform> Hub and Spoke Configuration"
sidebar_label: "Appendix: Hub and Spoke Config"
---
```

**Imports**

```mdx
import NetworkDesign from './_deploy_<platform>_hub_spoke_network_design.md';
```

**Intro paragraph** (no heading)

- This appendix contains the complete PCLI configuration for `<hub-router>` and `<spoke-router>`, reflecting the final state after [Step 4 — Configure Hub and Spoke Routers](deploy_<platform>_hub_spoke_config.mdx).
- `:::important` — list every placeholder the reader must replace: conductor IP, conductor interface identifier, and the four router interface identifiers.

**`## Network Design Reference`**

- Render `<NetworkDesign/>`.

**`## Applying This Configuration`**

- Numbered procedure:
  1. Save the configuration to a file (for example, `<platform>-hub-spoke.cfg`).
  2. Copy it to the conductor with `scp` (code block, `bash`).
  3. Log in to the conductor and run `su admin` (code block, `bash`).
  4. Run `import config` (code block, `text`).
  5. Review validation warnings and `commit` (code block, `text`).
- Alternative: paste blocks in `configure` → `edit` mode.
- `:::note` — the configuration includes authority-level objects (tenants, service, authority name, conductor address); reconcile conflicts before importing.

**`## Complete Configuration`**

- Code block (`text`) containing the full PCLI configuration, in this order:
  - `authority` with `conductor-address`.
  - Conductor router and node.
  - Hub router: node `node0` (asset ID, role), device interfaces `wan-dev` and `lan-dev` with network interfaces `wan1` and `lan1`, DNS, service route `internet-breakout`.
  - Spoke router: same structure, service route `internet-via-hub`.
  - Tenants `<hub-tenant>` and `<spoke-tenant>`.
  - Service `Internet-Traffic` with both access policies.
- Values must match the network design partial and Step 4.

**`## Interface Summary`**

- **``### Hub Router (`<hub-router>`)``** — table with columns `Interface`, `Device Interface`, `<Identifier>`, `Type`, `Configuration`. Rows for `wan1` and `lan1`.
- **``### Spoke Router (`<spoke-router>`)``** — same table with spoke values.

**`## Service Route Summary`**

- Table with columns `Router`, `Service Route`, `Service`, `Type`, `Next Hop`, `Effect`. One row per router.

**`## Traffic Flow Reference`**

- One-sentence lead-in.
- Table with columns `Source`, `Destination`, `Path`. Rows: hub LAN device → internet; spoke LAN device → internet; hub or spoke router → conductor.

### 7. Partial — `_deploy_<platform>_hub_spoke_network_design.md`

**First line**

```md
<!--- <Platform> Hub and Spoke Router Deployment Guide - Network Design Reference --->
```

**Content** (no headings — partials render inside the parent heading)

- Lead-in: The following IP addressing and naming scheme is used consistently throughout this guide. Substitute your own values when configuring your network.
- Table with columns `Parameter`, `Example Value`, `Description`. Required rows, in order:
  - **Shared:** region / location, resource group or datacenter, network name (with CIDR), conductor subnet (with CIDR), conductor private IP, conductor public IP, authority name, conductor name.
  - **Hub:** WAN subnet (with CIDR), LAN subnet (with CIDR), router name, node name, WAN device interface, WAN network interface, LAN device interface, LAN network interface, LAN IP, tenant.
  - **Spoke:** same rows as hub, with spoke values.
  - **Service:** service name, service address, neighborhood.

## Known Defects in the Reference Guide

Do not copy these issues from the Azure reference into new guides:

- The spoke VM page's **Network Interface Layout** table lists hub NIC names and hub subnets. Use spoke values.
- The spoke VM parameter table describes the spoke subnets as "Hub WAN subnet" and "Hub LAN subnet". Use "Spoke".
- The Step 3 **Network Interface Layout** table lists only the spoke router. Include all four interfaces.
- The hub VM page links to management over forwarding twice in the same note. Link once.
- The appendix `scp` and `ssh` commands are missing the key file and conductor IP. Use `scp -i <private-ssh-key> <file> t128@<conductor-public-ip>:/tmp/` and `ssh -i <private-ssh-key> t128@<conductor-public-ip>`.
- Several numbered procedures skip or repeat step numbers (for example, `1, 3, 4` and two step `8`s). Number steps sequentially.

## Workflow

### Step 1 — Gather Inputs

Collect every value in [Inputs](#inputs). Ask for any that are missing. Do not invent platform parameters, permissions, instance sizes, or interface identifiers.

### Step 2 — Read the Reference Set

Read every file in the reference table. For on-premises platforms, also read the VMware hub router and spoke router guides.

### Step 3 — Create the Network Design Partial

Create `_deploy_<platform>_hub_spoke_network_design.md` first. Every other file draws its example values from this table.

### Step 4 — Create the Published Pages

Create the overview, Step 1, Step 2, Step 3, Step 4, and appendix in that order, following the outlines above. Include optional sections only when they apply.

### Step 5 — Register the Sidebar

Add the category to [sidebars.js](../../../sidebars.js) under **Router Deployment Guides**.

### Step 6 — Validate

- Follow the repository style guide in [copilot-instructions.md](../../copilot-instructions.md) (second person, Title Case for new headings, Docusaurus admonitions, language hints on code blocks, alt text on images).
- Confirm every author placeholder is replaced and reader placeholders are listed in the appendix `:::important`.
- Confirm hub and spoke values are not swapped anywhere (see [Known Defects in the Reference Guide](#known-defects-in-the-reference-guide)).
- Confirm example values match across the partial, diagram, parameter tables, interface tables, Step 4, configuration summary, and appendix.
- Confirm every image referenced exists in `static/img/`.
- Run `docker-compose up` from the project root and confirm a clean strict build with no broken links, anchors, or images.

### Step 7 — Report

Report the files created, the sidebar change, any optional sections included or omitted, missing screenshots, and any values that need confirmation from a subject matter expert.
