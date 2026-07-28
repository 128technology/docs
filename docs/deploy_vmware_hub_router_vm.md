---
title: "Create the Hub VMware Router VM"
sidebar_label: "Create the Hub VMware VM"
---
import CreateHubVM from './_vmware_router_vm_create_hub.md';

This step creates the VMware ESXi virtual machine that will host the SSR hub router. The hub VM will use **four VMXNet3 network adapters**: NICs 1 and 2 connected to the WAN portgroup and NICs 3 and 4 connected to the LAN portgroup.

## VM Minimum Requirements

| Resource | Minimum Value | Notes |
|----------|---------------|-------|
| vCPUs | `4` | |
| Scheduling Affinity | `0-3` | Set under CPU → expand |
| Memory | `8 GB` | |
| Disk | `62 GB` | |
| Network Adapters | 4 × VMXNet3 | NICs 1 and 2 = WAN portgroup, NICs 3 and 4 = LAN portgroup |
| Boot Firmware | BIOS | Secure boot disabled |

<CreateHubVM/>

## Next Step

Proceed to [Step 2 — Install SSR Software and Initialize the Router](deploy_vmware_router_install.mdx).