---
title: Cloud Upgrades
sidebar_label: Cloud Upgrades
---


In certain scenarios, existing cloud routers have been installed from images that did not use LVM for partitions. For these systems, the automatic resizing of disk partitions will fail and they cannot be upgraded. These instances must be rebuilt using the SSR BYOL image in AWS or Azure.


This guide provides an upgrade path for users moving from an SSR package-based cloud deployment to an image-based cloud deployment. 

Some legacy Azure installations, including installations originating from the historical 5.4.4 private offer, have a disk layout that cannot be automatically converted to the layout required for image-based software delivery. The SSR release notes specifically identify cloud images without LVM as a conversion failure case and recommend rebuilding from the official BYOL image. Installing a newer package on an old VM does not necessarily change its disk layout.

For customers running the legacy package-based Conductor deployment, this procedure replaces that deployment with an image-based installation/upgrade. 

Do not attempt manual repartitioning of the old VMs. 

Mist-managed routers are not affected and do not require this procedure.

The replacement VMs use the official Azure BYOL offering. The source release is SSR 6.2.10 and the destination release is SSR 7.0.5. Use the sequence below rather than the generic upgrade-path selection process.  

No transitional intermediate version step is required for this 6.2.10-to-7.0.5 migration. It exports and re-imports the keying changes needed for the existing managed routers to communicate with a 7.0.5 Conductor. 



#### How can I tell in advance if my upgrade path is not possible with standard upgrade procedures?

Use the following steps to determine whether you require the upgrade-via-rebuild process.


Conductor upgrades failing from 6.3.7 with:

7.0 Upgrade failed with "SSR firmware upgrade failed for the local node: Failed to prepare SSR for upgrade"

7.1 Upgrade failed with "SSR firmware download failed: Failed to download supplementary packages for SSR upgrade"

Error messaging found was "failed to prepare disk for conversion: requisites for disk preparation are not met: failed to determine root volume size: failed to get root volume info: lvm failed to get volume report for volume group vg00: error running "/usr/sbin/lvm lvs -o lv_name,lv_size --units G vg00 --reportformat json": exit status 5 100.00%"


dev has stated there is no path forward for upgrades, redeployment would be necessary.



#### My upgrade failed, how can I tell if the failure was due to environment disk restrictions?

The following log messages and errors indicate upgrade failure due to disk partition restrictions.

#### Procedures for Upgrade/Migration 

The process is different for a Conductor and for a Router. 

Conductor: rebuild using forthcoming export/import procedure.

Router: follow RMA process to replace one node with another.



#### Scope and Exclusions

In scope: Azure and AWS deployments built using legacy PAYG or BYOL images

Provide specific definition “legacy PAYG or BYOL images”, e.g. “Nodes build from images version xyx or older”, or “Nodes built from images available in marketplace between X and Y dates” 



Is there an in-place upgrade path?

No. SSR versions 6.3.x/7.x require an LVM volume group (vg00) to dynamically partition the disk during the Image-Based Upgrade (IBU) conversion. Instances created with standard partitions on cloud providers (DigitalOcean, Azure, AWS, GCP) cannot perform this conversion in place.

Recommended Remediation:

Deploy new Conductor VM nodes directly using the target SSR version (or an LVM-compatible BYOL deployment).

Back up the current Conductor configuration and export certificates/keys.

Restore configuration onto the newly deployed Conductor nodes.

Note that interface naming conventions change from ethX in SSR 6.x to predictable names in SSR 7.x, so console access during setup is recommended.

