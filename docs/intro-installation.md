---
title: Installation Overview 
sidebar_label:  Installation Overview
---

The SSR Installation process provides two major installation processes, the 6.3.0+ image-based installation, and the pre-6.3.0 package-based installation.

Beginning with version 6.3.0, the SSR uses a single image-based SSR ISO with a significantly simplified installation process. After the SSR installation completes, the GUI provides clear choices and processes for each of the device configuration options: Conductor, a Conductor-managed router, or a Mist-managed router. This version supports Conductor-managed deployments as well as Mist-managed deployments.

### How Does It Work?

The image-based installation provides a significantly simplified installation and onboarding process. When the image is copied from the USB to the conductor, two volumes are created on the conductor. The 6.3.x image is copied into one of the volumes, and the device boots into that image. After the SSR installation completes, the GUI provides clear choices and processes for each of the device configuration options: Conductor, a Conductor-managed router, or a Mist-managed router. When an upgrade is initiated, the new image is copied into the available volume. The upgrade process then copies configurations and persistent information from the old image to the new image, then reboots into the new version.

### Installling Earlier Software Versions 

For new installs and upgrades of older software - those prior to version 6.3.0 - you will use the package-based, Interactive Installation process. Rather than a single image, his process installs individual packages onto the device.

Upgrades to 6.3.0+ from any version of software will automatically install the image based software.

#### Version History

| Release | Modification |
| ------- | ------------ |
| 6.0.0 | Image-based SSR ISO installation process implemented for Mist-managed networks. |
| 6.3.0 | Image-based SSR ISO updated, migrating to a single ISO installation format for Conductor, Conductor-managed, and Mist-managed deployments. |
