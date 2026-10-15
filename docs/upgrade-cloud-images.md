---
title: Cloud Upgrades
sidebar_label: Cloud Upgrades
---

This guide provides an upgrade path for users moving from an SSR package-based cloud deployment to an image-based cloud deployment. 

Some legacy Azure installations, including installations originating from the historical 5.4.4 private offer, have a disk layout that cannot be automatically converted to the layout required for image-based software delivery. The SSR release notes specifically identify cloud images without LVM as a conversion failure case and recommend rebuilding from the official BYOL image. Installing a newer package on an old VM does not necessarily change its disk layout.

For customers running the legacy package-based Conductor deployment, this procedure replaces that deployment with an image-based installation/upgrade. 

Do not attempt manual repartitioning of the old VMs. 

The replacement VMs use the official Azure BYOL offering. The source release is SSR 6.2.10 and the destination release is SSR 7.0.5. Use the sequence below rather than the generic upgrade-path selection process.  

No transitional intermediate version step is required for this 6.2.10-to-7.0.5 migration. It exports and re-imports the keying changes needed for the existing managed routers to communicate with a 7.0.5 Conductor. 