---
title: Downloading ISOs
sidebar_label: Downloading ISOs
---

## Introduction

With the purchase of an SSR license, you are provided a set of credentials used to access the Session Smart Routing software. These credentials, in the form of a username and password are used to access the software assets.

Juniper Session Smart Networking provides the following workflows for the installation process:

- **SSR Image-based ISO:** **Beginning with version 6.3.0**, the SSR uses a single downloadable image-based SSR ISO with a significantly simplified installation process. After the SSR installation completes, the GUI provides clear choices and processes for each of the device configuration options: Conductor, a Conductor-managed router, or a Mist-managed router. 

  Please see [SSR Image-based ISO Installation Overview](intro_installation_univ-iso.md) for the installation instructions and software image download location.

For users installing *earlier, package-based versions of the SSR software*, the following installation methods are available:

- **Package-based 128T ISO:** For users who do not use Mist Cloud, the package-based 128T ISO is used in the following deployments. 

  - When the initial installation is going to be a version prior to 6.3.0.
  - When upgrading to a version prior to 6.3.0 on air-gap network using the `import ISO` operation. For example, upgrading an air-gap conductor or routers from 5.6.6 to 6.2.7. See [Package-based Software Upgrade in an Air-Gap Network](upgrade_restricted_access.md#package-based-software-upgrade) for the more information. 

  This ISO also provides different local installation methods.

  - **One Touch Provisioning (OTP)** is the default and preferred method of installation. OTP sets up DHCP on all interfaces and boots a Web Server GUI. After installing the Conductor and configuring routers through the Conductor, the OTP bootstrap process will install and configure the router. See the following procedures for OTP installation steps: 
    - [Router Installation Using OTP](intro_otp_iso_install.mdx)
    - [Quickstart from the OTP ISO](intro_install_quickstart_otpiso.md)
  - **Interactive:** Beginning with SSR version 6.3.0, the use of the interactive installer is not supported, nor necessary. Software installation and upgrade activities are supported from the GUI or PCLI. With software versions earlier than 6.3.0, upgrading the SSR software on a conductor or router that is managed by a conductor using the interactive installer may result in the system becoming unresponsive. For this reason it is highly recommended that upgrades be performed through the conductor UI. For a new installation of a conductor using software prior to 6.3.0, the interactive method can be used.

  :::note
  Beginning with release 5.4.7-7 and any 5.x ISO [**released after August 4, 2022**](about_releases.md), the ISO name format has changed from using `OTP` to `ISO`:

  `128T-5.4.7-7.el7.ISO.v1.x86_64.iso`
  :::

## Downloading an ISO

The SSR Software packages are available from our public servers using the username and token provided to you and can be accessed at the following location:

The image-based SSR ISOs are available to download at the following location:

<!-- markdown-link-check-disable-next-line -->
- https://software.128technology.com/artifactory/list/generic-128t-install-images-release-local

The package-based 128T ISOs are available to download at the following location:

<!-- markdown-link-check-disable-next-line -->
- https://software.128technology.com/artifactory/list/generic-128t-isos-release-local

You will be prompted for your username and token to access the web page listing the software versions, and will be able to download directly from the page.

Files available for download are:

- `*.iso` - This file is used for installing/staging bare metal platforms.
- `*.qcow` - This file is used for virtual environments such as KVM.
:::note
Operation of SSR qcow2 without cloud-init is not supported at this time. Please see 
[Deployment Using QCOW2](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/install_qcow2_deployment/) for further details.
:::
- `*.tar` - This file is used by Mist for image-based upgrades, and is accessed directly by the system during the upgrade. User download is not necessary or advised.
- `*.ztp.raw.gz` - This file is used by manufacturing, and is not applicable for customer use. 
- `sha256sum` - checksum file used to verify integrity of asset.
- `sha256sum.asc` - GPG verification file used to verify asset signature.

