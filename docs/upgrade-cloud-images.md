---
title: Cloud Upgrades
sidebar_label: Cloud Upgrades
---

Some legacy Azure, AWS, or GCP installations, including installations originating from the historical 5.4.4 private offer, have a disk layout that cannot be automatically converted to the layout required for image-based software delivery. Specifically, these installations did not use LVM for partitioning. For these systems, the automatic resizing of disk partitions will fail and they cannot be upgraded. Installing a newer package on an old VM does not change its disk layout.

It is recommended that these instances use the Migration / Upgrade process provided here, and rebuild these instances from the official SSR BYOL image for either [AWS](intro_installation_byol_aws_conductor.md) or [Azure](intro_installation_byol_azure_conductor.md).

This guide provides that upgrade path for users moving from a non-LVM, SSR package-based cloud deployment to an image-based cloud deployment. For customers running the legacy package-based Conductor deployment, this procedure requires a new deployment with an image-based installation/upgrade. 

:::important
Mist-managed routers are not affected and do not require this procedure.
:::

#### How can I tell in advance if my upgrade path is not possible with standard upgrade procedures?

Run the following command on your conductor instance to determine whether you require the upgrade-via-rebuild process.

`[root@t236-dut1 t128]# lvm lvs`

If nothing is returned from the command, then you must use the Migration/Upgrade procedure.

If any output is returned, then you do not need to rebuild your conductor on a new instance. You can follow the standard image-based (post 6.3.0) upgrade procedure. 

#### Upgrade Failure Messages

The following log messages and errors indicate the upgrade failure is due to disk partition restrictions (non-LVM disk configuration).

- `SSR firmware upgrade failed for the local node: Failed to prepare SSR for upgrade.`
- `SSR firmware download failed: Failed to download supplementary packages for SSR upgrade.`
- `Failed to prepare disk for conversion:` 
- `Prerequisites for disk preparation are not met:` 
- `Failed to determine root volume size:` 
- `Failed to get root volume info:` 
- `lvm failed to get volume report for volume group vg00:` 
- `Error running "/usr/sbin/lvm lvs -o lv_name,lv_size --units G vg00 --reportformat json": exit status 5 100.00%`

## Conductor Upgrade/Migration 

This procedure deploys a standalone Session Smart Conductor (node0) in Azure from the BYOL marketplace image, using an ARM template, a parameters file and a cloud-init file. Allow 60 minutes to complete the upgrade process.



## Environment

| Item | Value |
|---|---|
| Resource group | `ssr-conductor-rg` |
| Region | `eastus` |
| VNet / subnet | `ssr-vnet` / `conductor-subnet` |
| Managed identity | `ssr-conductor-identity` |
| node0 | SSR node `node0` (hostname and asset ID `Conductor-node0`), VM `conductor-node0`, IP `10.0.1.10`, zone 1 |
| Public IPs | no |
| Conductor name | `Conductor` |
| SSR version | `7.2.3` |

## Network Topology

The SSR conductor node is one Azure VM with a **single NIC** in the same existing subnet. Inside the VM, SSR sees that NIC as `ge-0-0`, and it carries the conductor (control) traffic from managed routers.

| SSR term (inside the VM) | Azure resource (outside the VM) | Details |
|---|---|---|
| Conductor router `Conductor`, nodes `node0` | VMs `conductor-node0` (zone 1) | One VM per node from the BYOL marketplace image, deployed from the same ARM template. Hostnames (also the asset IDs) `Conductor-node0` / `Conductor-node1`. The MOP calls the nodes node0 and node1 whatever their SSR node names are. |
| Interface `ge-0-0` | NICs `conductor-node0-control` / `conductor-node1-control` | The only NIC on each VM, so SSR names it `ge-0-0` (NICs become `ge-0-0`, `ge-0-1`, ... in attach order). Tagged `SSR-ROLE=MGMT`; accelerated networking and IP forwarding enabled. |
| Node IP (`node-ip`), the conductor address | Static private IPs `10.0.1.10` / `10.0.1.11` | The NIC IP (template `controlPrivateIp`) and the cloud-init `node-ip` are the same value. Managed routers connect to both addresses. |
| HA sync interface (node1 `ha-peer-ip` = `10.0.1.10`) | Same NIC and IP; no HA sync NIC | Conductor-to-conductor sync runs over `ge-0-0` through the subnet. Hardware conductors use a dedicated HA sync NIC on `169.254.253.x` (`clustered`), which an Azure VNet cannot carry. |
| HA fabric interface | None | Conductors do not forward session traffic, so there is no fabric link. |
| - | NSGs `conductor-node0-control` / `conductor-node1-control`, one per NIC | Inbound allow: TCP 22, 443 from `0.0.0.0/0`; TCP 930 (router control), 933 (secure onboarding), 4505-4506 (salt) from `0.0.0.0/0`; all traffic from the HA peer's IP. |
| - | No public IP | Routers and administrators reach the nodes on their private IPs (VNet peering, VPN or ExpressRoute). |
| - | VNet `ssr-vnet`, subnet `conductor-subnet` | Existing, not created by the template. Needs outbound HTTPS for the SSR download and must allow traffic between the two nodes. |

## Prerequisites

- The resource group, VNet, subnet and managed identity listed above exist. The node IP is free in the subnet.
- The subnet has outbound HTTPS access to download the SSR software.
- Azure Cloud Shell (PowerShell) with permission to deploy to the resource group.
- The five deployment files below, uploaded to one Cloud Shell directory (Manage files > Upload). Run every Cloud Shell command from that directory.
- A terminal with an SSH client and the private key that matches the SSH public key in the parameters files. It must reach the nodes on TCP 22 at their public IPs (`10.0.1.10`), from an address inside the admin allowed range `0.0.0.0/0`.


