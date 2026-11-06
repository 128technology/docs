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

### Backup Process

#### Older version

Before starting this process, it is suggested to backup certain information that is vital to the functioning of the Conductor. First, through the UI, navigate to the “Import / Export” option under “Configuration”. Click the button with the circular arrow in the upper right of the screen. Then select the option to “Export Running Configuration”.
A menu will pop up asking you to provide a name for the export. Provide a name and then click the “Export” button. Now, you should see your configuration export as shown below. Click the icon to download the export off the Conductor and onto your local machine. This can be used in cases where the entire conductor may need to be restored.
Also, there are two files in the “/etc/128technology/salt/pki/master” directory. One is named “master.pem” and the other is named “master.pub”. Please copy these files off the conductor. These files will be necessary for restoring service should the conductor need to be rebuilt from scratch. These are keys that the routers use to authenticate the conductor and should the conductor be rebuilt without these exact keys, the routers will reject any attempt to be managed by the new conductor and require hands on each router instance to accept the new conductor’s keys. These keys are synced between HA nodes of an active conductor so therefore they should be the same on both nodes of your existing conductor.
Lastly, copy of the file “/var/lib/128technology/user-running.json” which contains all current users and their credentials. This file will be synchronized between both nodes on the conductor so you only need to copy it off of one node.
On both conductor nodes, please execute the following commands and save their output. This information will be helpful when building the new instance:
•	ip a
•	ip r
•	firewall-cmd --list-all-zones
•	for f in /etc/sysconfig/network-scripts/ifcfg-*; do echo "------ $f ------"; cat $f; done 
•	for f in /etc/sysconfig/network-scripts/route-*; do echo "------ $f ------"; cat $f; done
•	cat /etc/resolv.conf
•	cat /etc/128technology/local.init
•	cat /etc/128technology/global.init


#### Rogers Version

This section provides the steps to backup all relevant backup files for your conductor and save the files onto a separate machine.
Run the command below to save all relevant backup files as a tarball in the `/var/log/128technology/` directory. The tarball file name must be unique for each conductor node, and uses the convention: `conductor-backup-$(hostname)-$(date '+%Y-%m-%d').tar.gz`. 

As an example if the primary node is named primary-node and the below command was executed on 10/10/2026, the tarball file name will be conductor-backup-primary-node-2026-10-10.tar.gz.

```
sudo tar -czf /var/log/128technology/conductor-backup-$(hostname)-$(date '+%Y-%m-%d').tar.gz /var/lib/128technology/t128-running.json 
/var/lib/128technology/user-running.json 
/etc/128technology/salt/pki/master/master.pem 
/etc/128technology/salt/pki/master/master.pub 
/etc/128technology/salt/pki/master/minions/ /etc/128technology/global.init 
/etc/128technology/local.init /etc/salt/pki/minion/minion.pem 
/etc/salt/pki/minion/minion.pub /etc/salt/pki/minion/minion_master.pub /srv/salt 
/etc/salt/minion_id
```

To verify that the backup tarball file was successfully created, run the below command on each conductor node.
ls -lh /var/log/128technology/conductor-backup*

To verify all files that were copied into the backup tarball file, run the below command on each conductor node.
tar -ztvf /var/log/128technology/<insert-your-tarball-filename>

On a separate machine, securely copy the tarball file from each conductor node into this separate machine. Note that this machine needs to be able to connect to the conductor nodes. Below is a sample command using scp on a Ubuntu machine to copy the tarball file from a conductor node (with the IP address 10.9.0.6) and saving the file in the Ubuntu machine’s local user’s Downloads folder.
scp -i <insert-your-private-key-filename> t128@10.9.0.6:'/var/log/128technology/<insert-your-tarball-filename>' ~/Downloads


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


