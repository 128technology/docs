---
title: Downloading ISOs
sidebar_label: Downloading ISOs
---

## Introduction

With your purchase of a SSR license, you are provided a set of credentials used to access the Session Smart Routing software. These credentials, in the form of a username and password are used to access the software assets.

Juniper Session Smart Networking provides the following workflows for the installation process:

- **Image-based ISO:** Beginning with version 6.0, an image-based ISO installation process has been implemented for users who manage their network using the Mist Cloud. This installation and upgrade process is only available for SSR version 6.0 and higher, and is currently only available for Mist-managed deployments.

  For details about the Image-based install process, see [Image-based Installation.](intro_installation_image.md) 

- **One Touch Provisioning (OTP):** This is the preferred method of installation. Sets up DHCP on all interfaces and boots a Web Server GUI. After installing the Conductor and configuring routers through the Conductor, the OTP bootstrap process will install and configure the router.

:::note
For bespoke deployments where customized platform configuration is necessary, an interactive mode exists.

- **Interactive:** Installation is done via a serial console or VGA. An interactive session is started to configure network interfaces, passwords, node name and type, and conductor IP (if applicable) before the SSR software is started.
:::

## Downloading an ISO

The SSR Software packages are available from our public servers using the username and token provided to you and can be accessed at the following location:

  The image-based ISOs for Mist-based deployments are available to download at the following location:

<!-- markdown-link-check-disable-next-line -->
- https://software.128technology.com/artifactory/list/generic-128t-install-images-release-local

  The package-based ISOs for Conductor-managed deployments are available to download at the following location:

<!-- markdown-link-check-disable-next-line -->
- https://software.128technology.com/artifactory/list/generic-128t-isos-release-local

You will be prompted for your username and token to access the web page listing the software versions, and will be able to download directly from the page.


Files available for download are:

- `*.iso` - This file is used for installing/staging bare metal platforms.
- `*.qcow` - This file is used for virtual environments such as KVM or ESXi.
- `*.tar` - This file is used by Mist for image-based upgrades, and is accessed directly by the system during the upgrade. User download is not necessary or advised.
- `*.ztp.raw.gz` - This file is used by manufacturing, and is not applicable for customer use. 
- `sha256sum` - checksum file used to verify integrity of asset.
- `sha256sum.asc` - GPG verification file used to verify asset signature.

