---
name: generate-deployment-guides
description: 'Generate a consistently structured SSR Conductor Deployment Guide set or SSR Hub and Spoke Router Deployment Guide set (overview, VM creation, install/initialize, configuration, appendix, and partials) for a target platform, modeled on the Azure deployment guides.'
user-invocable: true
disable-model-invocation: true
---

# SSR Conductor Deployment Guide Generator

Generate a complete SSR Conductor Deployment Guide set for a target platform (for example, Azure, AWS, VMware ESXi, KVM, Google Cloud) using a fixed file structure and outline. The reference implementation is the **Azure Conductor Deployment Guide**:

| Reference File | Role |
|----------------|------|
| [deploy_azure_conductor.mdx](../../../docs/deploy_azure_conductor.mdx) | Overview |
| [deploy_azure_conductor_vm.mdx](../../../docs/deploy_azure_conductor_vm.mdx) | Step 1 — Create the VM |
| [deploy_azure_conductor_install.mdx](../../../docs/deploy_azure_conductor_install.mdx) | Step 2 — Initialize and access |
| [deploy_azure_conductor_config.mdx](../../../docs/deploy_azure_conductor_config.mdx) | Step 3 — Configure the conductor |
| [deploy_appendix_azure_conductor.md](../../../docs/deploy_appendix_azure_conductor.md) | Appendix — PCLI configuration |
| [_deploy_azure_conductor_network_design.md](../../../docs/_deploy_azure_conductor_network_design.md) | Partial — network design table |
| [_deploy_azure_conductor_to_authority.md](../../../docs/_deploy_azure_conductor_to_authority.md) | Partial — assign asset ID |

The VMware ESXi Conductor guide (`deploy_vmware_conductor*.mdx`) follows the same structure and is the reference for on-premises variations (ISO install, management VLAN, air-gap offline mode).

## Guide Types

| Guide Type | Template |
|------------|----------|
| Conductor Deployment Guide | This file |
| Hub and Spoke Router Deployment Guide | [hub-spoke-guide-template.md](hub-spoke-guide-template.md) |

When the request is for a hub and spoke guide, follow [hub-spoke-guide-template.md](hub-spoke-guide-template.md) instead of the conductor outline below.

## Inputs

Ask for the following if not provided:

1. **Platform name** — display name used in titles (for example, `Azure`, `AWS`, `VMware ESXi`).
2. **Platform slug** — lowercase identifier used in filenames (for example, `azure`, `aws`, `vmware`).
3. **SSR version** — the version the guide installs (for example, `7.1.4`).
4. **License / deployment model** — for example, BYOL Marketplace template, PAYG, ISO install, OVA.
5. **Example network values** — region/location, resource group or datacenter, network/VNet/VPC name and CIDR, conductor subnet, private IP, gateway, public IP behavior.
6. **Platform prerequisites** — account permissions, identity/role requirements, required existing infrastructure.
7. **Recommended instance sizes** — instance/VM types with vNICs, vCPU, and memory.
8. **Install mechanism** — automated (cloud-init / bootstrapper) or interactive (ISO installer), and expected install duration.
9. **Optional configuration** — whether the guide needs extra configuration steps (for example, air-gap offline mode, management VLAN).
10. **Screenshots** — whether platform screenshots exist in `static/img/`. If not, insert image placeholders and list them in the report.

## File Structure

Every Conductor Deployment Guide set consists of five published pages and at least one partial. Replace `<platform>` with the platform slug.

```text
docs/
├── deploy_<platform>_conductor.mdx                  # Overview (sidebar: "Overview")
├── deploy_<platform>_conductor_vm.mdx               # Step 1: Create the <Platform> Conductor VM
├── deploy_<platform>_conductor_install.mdx          # Step 2: Initialize and Access the Conductor
├── deploy_<platform>_conductor_config.mdx           # Step 3: Configure the Conductor
├── deploy_appendix_<platform>_conductor.md(x)       # Appendix - <Platform> Conductor Configuration
├── _deploy_<platform>_conductor_network_design.md   # Partial: network design reference table
└── _deploy_<platform>_conductor_to_authority.md     # Partial (optional): assign the conductor asset ID
```

Shared partials reused across platforms (import, do not duplicate):

| Partial | Used In | Purpose |
|---------|---------|---------|
| `_set_authority_name.md` | Step 3 | Set the authority name in the GUI |
| `_set_conductor_ip.md` | Step 3 | Set the conductor address in the GUI |
| `_conductor_to_authority.md` | Step 3 | Generic asset ID assignment (use when no platform-specific variant is needed) |

### Sidebar Registration

Register the five published pages (never the partials) in [sidebars.js](../../../sidebars.js) under **Conductor Deployment Guides**, in this order:

```js
{
  "type": "category",
  "label": "<Platform> Conductor",
  "items": [
    "deploy_<platform>_conductor",
    "deploy_<platform>_conductor_vm",
    "deploy_<platform>_conductor_install",
    "deploy_<platform>_conductor_config",
    "deploy_appendix_<platform>_conductor",
  ],
},
```

## Placeholder Conventions

Use these placeholders throughout the outline. Replace every one before publishing.

| Placeholder | Meaning | Azure Example |
|-------------|---------|---------------|
| `<Platform>` | Platform display name | `Azure` |
| `<platform>` | Platform slug | `azure` |
| `<version>` | SSR version installed | `7.1.4` |
| `<license-model>` | License / deployment model | `BYOL` |
| `<conductor-public-ip>` | Conductor public or management IP | Azure-assigned public IP |
| `<network-name>` | VNet / VPC / port group name | `SSR-VNet` |
| `<conductor-subnet>` | Conductor management subnet | `ssr-conductor-subnet` |
| `<authority-name>` | Authority name | `Authority128` |

Use the same example values in every file of the set. The network design partial is the single source of truth for these values.

## File Outlines

Each outline lists the frontmatter, imports, intro paragraph, and the required headings in order. Under each heading, the bullets describe the required content. Keep the heading text as shown unless the platform requires a different action (for example, `Deploy via Azure Portal` becomes `Deploy via AWS Console`).

### 1. Overview — `deploy_<platform>_conductor.mdx`

**Frontmatter**

```yaml
---
title: <Platform> Conductor Deployment Guide
sidebar_label: Overview
---
```

**Imports**

```mdx
import NetworkDesign from './_deploy_<platform>_conductor_network_design.md';
```

**Intro paragraph** (no heading)

- One paragraph: This guide walks you through deploying a **Juniper Session Smart Conductor on `<Platform>`** using `<license-model>`.
- State the end state: the conductor runs SSR `<version>`, is configured with an authority name, conductor address, and shared services, and is ready for routers to onboard.

**`## Guide Topics`**

- Table with columns `Step`, `Topic`, `Description`.
- One row per published page: Steps 1–3 and the appendix (use `—` as the step number for the appendix).
- Each topic links to its page.

**`## Network Topology`**

- One sentence introducing the diagram.
- Mermaid `graph TD` diagram showing: Internet, platform region/datacenter, network (VNet/VPC) with CIDR, conductor VM (name, node, public and private IPs, subnet), example router VM (WAN, LAN), LAN devices (tenant `corp`), internet gateway.
- Label the router-to-conductor link with management ports (`930 / 4505 / 4506`).

**`## Roles`**

- One paragraph: the role is a `Conductor` on a `<Platform>` VM (`<license-model>`) functioning as a standalone SSR conductor providing centralized management and provisioning.

**`## Network Design Reference`**

- Render `<NetworkDesign/>` only.

**`## Prerequisites`**

- Lead-in sentence: Before beginning, ensure the following are available.
- Bulleted list, each item with a bold label and description:
  - Platform account/subscription with required permissions.
  - Network and subnets that must already exist (list each subnet and its purpose).
  - Identity / role / managed identity with minimum permissions (link to Step 1 `#requirements`).
  - Juniper software access credentials (Artifactory username and token).
  - SSH key pair (RSA 2048-bit or stronger), if applicable.

**`## Software Version Requirements`**

- State the SSR version this guide installs.
- `:::note` — router software version must be lower than or equal to the conductor software version.
- `:::note` — any license-model minimum version requirement (for example, BYOL requires SSR 6.3.0-R1 or newer).

**`## Related Documentation`**

- Bulleted links, at minimum:
  - [System Requirements](intro_system_reqs)
  - [Conductor Deployment Best Practices](bcp_conductor_deployment)
  - [Management Traffic over Forwarding Interfaces](config_management_over_forwarding)
  - [Onboard an SSR Device to a Conductor](onboard_ssr_to_conductor)
  - Platform-specific installation page (for example, `intro_installation_byol_<platform>_conductor`)

### 2. Step 1 — `deploy_<platform>_conductor_vm.mdx`

**Frontmatter**

```yaml
---
title: "Step 1: Create the <Platform> Conductor VM"
sidebar_label: "Create the Conductor VM"
---
```

**Imports**

```mdx
import NetworkDesign from './_deploy_<platform>_conductor_network_design.md';
```

**Intro paragraph** (no heading)

- What this step deploys and from where (Marketplace, template, ISO, OVA).
- What the template or process creates automatically (VM, public IP, security group).
- How SSR is installed and initialized (for example, cloud-init installs SSR `<version>` and initializes the node as a conductor).

**`## Requirements`**

- Lead-in: The following infrastructure must exist before deploying the conductor.
- Bulleted list: network, administration subnet (SSH/HTTPS reachable), reachability from every router WAN interface, identity/role.
- Code block (`text`) listing the minimum permissions for the identity/role.

**`## Recommended VM Sizes`**

- Lead-in: Select the instance size that best meets the scale of your deployment.
- Table with columns `Recommended <Platform> VM Size`, `Max vNICs`, `vCPU Cores`, `Memory`.
- Link to [System Requirements](intro_system_reqs.md#conductor-scaling-recommendations) for scaling guidance.
- On-premises platforms: rename to `## VM Minimum Requirements` and list CPU, memory, disk, and NIC minimums.

**`## What the Template Creates`** (template-based platforms only)

- Lead-in: When you deploy the conductor using the template, `<Platform>` automatically creates:
- Bulleted list: VM and image, network interfaces (name and subnet), security group and association, public IP.
- Infrastructure diagram or screenshot with alt text.

**`## Select the <license-model> Plan`** (Marketplace platforms only)

- Numbered procedure: open the Marketplace listing (linked), select the plan tab, locate the conductor offering, launch.
- Screenshot after each step that changes the UI.

**`## Deploy via <Platform> Portal`** (or Console / CLI / vSphere Client)

- Numbered procedure.
- Parameter table with columns `Parameter`, `Example Value`, `Notes`. Include every template field in UI order. Example values must match the network design partial.
- `:::caution` — restrict administrative and control CIDR access to known source addresses.
- Steps to validate, review terms, and create.
- Step to open deployment outputs, with a screenshot.
- List of values to record for later steps (public IP, SSH login command).
- `:::important` — default Linux username (`t128`) and key used for SSH.
- Closing sentence: installation of SSR `<version>` begins when the deployment completes.

**`## Next Step`**

- Single sentence: Proceed to [Step 2 — Initialize and Access the Conductor](deploy_<platform>_conductor_install.mdx).

### 3. Step 2 — `deploy_<platform>_conductor_install.mdx`

**Frontmatter**

```yaml
---
title: "Step 2: Initialize and Access the Conductor"
sidebar_label: "Initialize and Access"
---
```

For interactive installs, use `title: "Step 2: Install the SSR Software and Initialize the Conductor"` and `sidebar_label: "Install and Initialize"`.

**Intro paragraph** (no heading)

- This step verifies the installation, confirms the conductor is running, and walks you through the first GUI login.

**`## Wait for Installation to Complete`** (automated installs)

- Expected duration (for example, approximately 20 minutes).
- State that installation runs in the background and no installer screens appear.

**`## Install SSR Software`** (interactive installs only — replaces the section above)

- Import and render shared install partials rather than duplicating content.

**`## Configure the Conductor Management VLAN`** (only when the platform requires it)

- Numbered procedure for management interface or VLAN setup.

**`## Initialize the Conductor`** (interactive installs only)

- Numbered procedure for the initializer, with the values from the network design partial.

**`## Verify the Successful Conductor Installation`**

- Lead-in: verify by logging in to the Conductor GUI using the public/management IP.
- Screenshot showing where to find the IP.
- `:::important` — opening the GUI before install completes returns an error; this does not mean the install failed.
- Numbered procedure:
  1. Browse to `https://<conductor-public-ip>`, with a `:::note` about the self-signed certificate.
  2. Log in with default credentials (table with columns `Field`, `Value`), with a `:::important` about the mandatory password change and password rules.
  3. Successful login confirms the conductor is running and reachable.

**`## Troubleshooting the Installation`**

- **`### Device Does Not Initialize Properly`**
  - Expected install-and-initialize time.
  - SSH command (`ssh -i <private-ssh-key> t128@<conductor-public-ip>`).
  - Bulleted checks: PCLI access (`su admin`, `show system`), bootstrapper tech-support archive path, journal units to inspect (`128T-hardware-bootstrapper`, `ember`).
- Add further `###` subsections for platform-specific failure modes.

**`## Next Step`**

- Single sentence: Proceed to [Step 3 — Configure the Conductor](deploy_<platform>_conductor_config.mdx).

### 4. Step 3 — `deploy_<platform>_conductor_config.mdx`

**Frontmatter**

```yaml
---
title: "Step 3: Configure the Conductor"
sidebar_label: "Configure the Conductor"
---
```

**Imports**

```mdx
import NetworkDesign from './_deploy_<platform>_conductor_network_design.md';
import AuthorityName from './_set_authority_name.md';
import SetConductorIP from './_set_conductor_ip.md';
import ConductorAuthority from './_deploy_<platform>_conductor_to_authority.md';
```

**Intro paragraph** (no heading)

- This step configures authority-level settings: authority name, conductor address, corporate tenant, and internet service. These objects are shared by every managed router.
- State that all steps are performed from the Conductor GUI at `https://<conductor-public-ip>` unless otherwise noted.

**`## Network Design Reference`** (optional)

- Render `<NetworkDesign/>` when the reader benefits from seeing the values again.

Number the configuration sections sequentially. When you include the optional air-gap section, it becomes section 4 and the sections after it shift by one.

**`## 1. Assign the Conductor's Asset ID`**

- Render `<ConductorAuthority/>`.

**`## 2. Set the Authority Name`**

- Render `<AuthorityName/>`.
- `:::note` — use your organization's name; changing it after routers are provisioned requires re-onboarding.

**`## 3. Set the Conductor Address`**

- Explain which IP to use for this platform and why (public IP so external routers can reach it).
- `:::note` — when a private IP is acceptable instead.
- Render `<SetConductorIP/>`.

**`## 4. Air-Gap Network - Set Offline Mode`** (optional — on-premises or air-gapped deployments)

- Numbered procedure to enable offline mode.

**`## 4. Create the Corporate Tenant`** (section 5 when air-gap is included)

- One-sentence explanation of tenants and the role of `corp`.
- Numbered GUI procedure (Authority → Tenants → ADD → name `corp` → SAVE → VALIDATE → COMMIT), with a screenshot after each step.
- `:::info` — tenants are authority-wide.

**``## 5. Create the `Internet-Traffic` Service``** (section 6 when air-gap is included)

- One-sentence explanation of the service element.
- Numbered GUI procedure: Authority → Services → ADD → name `Internet-Traffic` → verify Enabled → Service Addresses `0.0.0.0/0` → Access Policies with source `corp` → VALIDATE → COMMIT, with a screenshot after each step.

**`## What Was Configured`**

- Lead-in: At the end of this step your authority contains:
- Table with columns `Name`, `Value`, `Description` listing Authority, Conductor Address, Tenant, Service.
- Closing sentence: The conductor is now ready to accept router onboarding.

**`## Next Step`**

- Congratulate the reader and point to the router deployment guides for onboarding routers.

### 5. Appendix — `deploy_appendix_<platform>_conductor.md`

Use `.mdx` only when the appendix imports a partial.

**Frontmatter**

```yaml
---
title: Appendix - <Platform> Conductor Configuration
sidebar_label: Appendix - <Platform> Conductor Configuration
---
```

**Intro paragraph** (no heading)

- This appendix contains the SSR PCLI configuration for the conductor described in this guide, as it exists after completing [Step 3 — Configure the Conductor](deploy_<platform>_conductor_config.mdx).

**`## Network Design Reference`** (optional)

- Render `<NetworkDesign/>`.

**`## Applying This Configuration`** (optional)

- How to paste or load the configuration through the PCLI, then validate and commit.

**`## Complete Configuration`**

- Instruction to replace angle-bracket placeholders with environment values.
- Code block (`text`) containing the full PCLI configuration: `authority` with `conductor-address`, `router conductor` with `node0` (`asset-id`, `platform-type`), `tenant corp`, `service Internet-Traffic` with `address 0.0.0.0/0` and `access-policy corp`.
- Values must match the network design partial and Step 3.

**`## Configuration Notes`** (optional)

- Bulleted explanations of non-obvious configuration choices.

### 6. Partial — `_deploy_<platform>_conductor_network_design.md`

**First line**

```md
<!--- <Platform> Conductor Deployment Guide - Network Design Reference --->
```

**Content** (no headings — partials render inside the parent heading)

- Lead-in: The following IP addressing and naming scheme is used consistently throughout this guide. Substitute your own values when configuring your network.
- Table with columns `Parameter`, `Example Value`, `Description`. Required rows, in order:
  - Region / location
  - Resource group or datacenter
  - Network name (with CIDR)
  - Conductor subnet (with CIDR)
  - Conductor private IP
  - Conductor gateway
  - Conductor public IP
  - Authority name
  - Conductor name
  - Conductor node name
  - Tenant name
  - Service name
  - Service address
  - Neighborhood

### 7. Partial — `_deploy_<platform>_conductor_to_authority.md` (optional)

Create only when the asset ID procedure differs from the shared `_conductor_to_authority.md`. Otherwise, import the shared partial in Step 3.

**First line**

```md
<!----Add the Conductor to the Authority---->
```

**Content**

- Lead-in explaining that logging into the GUI validates the installation and familiarizes you with GUI operations.
- **`#### Assign the Conductor's Asset`**
  - Numbered procedure: select the conductor, open the node **Configure** icon, enter the hostname under **Associated Asset ID**, validate and commit, with screenshots.

## Workflow

### Step 1 — Gather Inputs

Collect every value in [Inputs](#inputs). Ask for any that are missing. Do not invent platform parameters, permissions, or instance sizes.

### Step 2 — Read the Reference Set

Read every file listed in the reference table so the generated guide matches the current wording, admonitions, and example values. When generating an on-premises guide, also read the VMware conductor files.

### Step 3 — Create the Network Design Partial

Create `_deploy_<platform>_conductor_network_design.md` first. Every other file draws its example values from this table.

### Step 4 — Create the Published Pages

Create the overview, Step 1, Step 2, Step 3, and appendix files in that order, following the outlines above. Include optional sections only when they apply, and renumber Step 3 sections accordingly.

### Step 5 — Create or Reuse the Asset ID Partial

Reuse `_conductor_to_authority.md` unless the platform requires a different procedure.

### Step 6 — Register the Sidebar

Add the category to [sidebars.js](../../../sidebars.js) under **Conductor Deployment Guides**.

### Step 7 — Validate

- Follow the repository style guide in [copilot-instructions.md](../../copilot-instructions.md) (second person, Title Case headings for new headings, Docusaurus admonitions, language hints on code blocks, alt text on images).
- Confirm every `<placeholder>` is replaced.
- Confirm example values match across the partial, diagram, parameter table, Step 3 summary, and appendix.
- Confirm every image referenced exists in `static/img/`.
- Run `docker-compose up` from the project root and confirm a clean strict build with no broken links, anchors, or images.

### Step 8 — Report

Report the files created, the sidebar change, any optional sections included or omitted, missing screenshots, and any values that need confirmation from a subject matter expert.
