---
title: Downloading ISOs
sidebar_label: Downloading ISOs
---

## Introduction

With your purchase of a SSR license, you are provided a set of credentials used to access the Session Smart Routing software. These credentials, in the form of a username and token are used to access the software assets.

Juniper Session Smart Networking provides the following workflows for the compliant installation process:

- **Package-based ISO:** This ISO offers multiple local installation methods.
  - **One Touch Provisioning (OTP)** is the default and preferred method of Router installation. OTP sets up DHCP on all interfaces and boots a Web Server GUI. After installing the Conductor and configuring routers through the Conductor, the OTP quickstart process will install and configure the router. See the following procedures for OTP installation steps: 
    - [Router Installation Using OTP](intro_otp_iso_install.mdx)
    - [Quickstart from the OTP ISO](intro_install_quickstart_otpiso.md)
  - **Interactive:** For Conductor installations and bespoke deployments where customized platform configuration is necessary, an interactive mode exists. Installation is done using the serial console. An interactive session is started to configure network interfaces, passwords, node name and type, and conductor IP (if applicable) before the SSR software is started.


## Downloading an ISO

The SSR Software packages are available from our servers using the username and token provided to you and can be accessed at the following location:

<!-- markdown-link-check-disable-next-line -->
- https://software.128technology.com/artifactory/list/generic-128t-isos-release-local

You will be prompted for your username and token to access the web page listing the software versions and will be able to download directly from the page.

Files available for download are:

- `*.iso` - This file is used for installing/staging Juniper platforms.
- `sha256sum` - checksum file used to verify integrity of asset.
- `sha256sum.asc` - GPG verification file used to verify asset signature.

