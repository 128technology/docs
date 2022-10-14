---
title: Downloading ISOs
sidebar_label: Downloading ISOs
---

## Introduction

With your purchase of a SSR license, you are provided a set of credentials used to access the Session Smart Routing software. These credentials, in the form of a username and password are used to access the software assets.

Juniper Session Smart Networking provides the following workflows for the installation process:

- **Image-based ISO:** Beginning with version 6.0, an image-based ISO installation process has been implemented for users who manage their network using the Mist Cloud. This installation and upgrade process is only available for SSR version 6.0 and higher, and is currently only available for Mist-managed deployments.

  For details about the Image-based install process, see [Image-based Installation.](intro_installation_image.md) 

- **Package-based ISO:** For users who do not use Mist Cloud, this ISO offers multiple local installation methods.
  - **One Touch Provisioning (OTP)** is the default and preferred method of installation. OTP sets up DHCP on all interfaces and boots a Web Server GUI. After installing the Conductor and configuring routers through the Conductor, the OTP bootstrap process will install and configure the router. See the following procedures for OTP installation steps: 
    - [Router Installation Using OTP](intro_otp_iso_install.mdx)
    - [Quickstart from the OTP ISO](intro_install_quickstart_otpiso.md)
  - **Interactive:** For bespoke deployments where customized platform configuration is necessary, an interactive mode exists. Installation is done via a serial console or VGA. An interactive session is started to configure network interfaces, passwords, node name and type, and conductor IP (if applicable) before the SSR software is started.

:::note
Beginning with release 5.4.7-7 and any 5.x ISO [**released after August 4, 2022**](about_releases.mdx#all-releases---limited-and-general-availability), the ISO name format has changed from using `OTP` to `ISO`:

- 128T-5.4.7-7.el7.ISO.v1.x86_64.iso
:::

## Downloading an ISO

The SSR Software packages are available from our public servers using the username and token provided to you and can be accessed at the following location:

The image-based ISOs for Mist-managed deployments are available to download at the following location:

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

