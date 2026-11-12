---
title: Cloud Upgrades
sidebar_label: Cloud Upgrades
---

Some legacy Azure, AWS, or GCP installations, including installations originating from the historical 5.4.4 private offer, have a disk layout that cannot be automatically converted to the layout required for image-based software delivery. Specifically, these installations did not use LVM for partitioning. For these systems, the automatic resizing of disk partitions will fail and they cannot be upgraded. Installing a newer package on an old VM does not change its disk layout.

This guide documents the upgrade path for users moving from a non-LVM, SSR package-based cloud deployment to an image-based cloud deployment. For these users, this procedure requires a new deployment with an image-based installation using the official SSR BYOL image for either [AWS](intro_installation_byol_aws_conductor.md) or [Azure](intro_installation_byol_azure_conductor.md).

:::important
Mist-managed routers are not affected and do not require this procedure.
:::

### How can I tell in advance if my upgrade path is not possible with standard upgrade procedures?

Run the following command on your conductor instance to determine whether you require the upgrade-via-migration process.

`[root@t236-dut1 t128]# lvm lvs`

If nothing is returned from the command, then you must use the Upgrade via Migration procedure.

If any output is returned, then you do not need to rebuild your conductor on a new instance. You can follow the standard image-based (post 6.3.0) upgrade procedure. 

### Upgrade Failure Messages

The following log messages and errors indicate the upgrade failure is due to disk partition restrictions (non-LVM disk configuration).

- `SSR firmware upgrade failed for the local node: Failed to prepare SSR for upgrade.`
- `SSR firmware download failed: Failed to download supplementary packages for SSR upgrade.`
- `Failed to prepare disk for conversion:` 
- `Prerequisites for disk preparation are not met:` 
- `Failed to determine root volume size:` 
- `Failed to get root volume info:` 
- `lvm failed to get volume report for volume group vg00:` 
- `Error running "/usr/sbin/lvm lvs -o lv_name,lv_size --units G vg00 --reportformat json": exit status 5 100.00%`

## Conductor Upgrade via Migration 

The procedure that follows deploys either a standalone Session Smart Conductor (node0), or a Highly Available Session Smart Conductor (node0, node1) in Azure from the BYOL marketplace image, using an ARM template, a parameters file and a cloud-init file. Allow approximately 60 minutes to complete the upgrade process.

Backup procedures are the same for Standalone or High Availability Conductors. The  Migration procedures are different for each type of deployment. 

- Create a Conductor Backup File
- Standalone Cloud Conductor Upgrade Process
- HA Cloud Conductor Upgrade Process
