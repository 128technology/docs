---
title: SSR Software Installation Guide
sidebar_label: Installation Overview
---
## Introduction
Welcome to Session Smart Routing - the first software-based routing solution designed to be both session-oriented and service-centric through the application of Secure Vector Routing. The purpose of this guide is to provide an overview and installation walkthrough for the SSR Router and Conductor products into a Linux operating system environment. This product suite is collectively known as SSR Software.

:::info
The installation guides are version agnostic and are applicable for all current and future versions of software.
:::

## Before You Begin
Before you begin the installation and configuration of an SSR Networking Plaform, you must:
- Be familiar with Linux fundamentals, basic network addressing, and IP networking terminology. 
- Be a system administrator to perform the installation and configuration.
- Have an entry in /etc/sudoers allowing you to execute Linux shell commands as root (via sudo). Failure to do so may result in the loss of remote management connectivity to the router. 

:::note
The examples listed in this guide generally prefer running commands as a non-root user, except as noted, and prepend commands that must be run as a superuser with sudo. **The SSH Root login is not permitted.** 
:::

## Installation Process
Installation is done from the SSR ISOs, typically from a bootable image on a flash drive or disk. The install process is as follows:
- [Download the ISOs](intro_downloading_iso.md)
- [Create Bootable Media](intro_creating_bootable_usb.md)
- [Perform the Interactive ISO installation](intro_installation_bootable_media.mdx) 
- [Install a Conductor](install_conductor_overview.md)
- [Create the Router configuration with the Conductor](intro_basic_router_config.md) or [Import a Configuration](single_conductor_config.md)
- [Install the Router using the OTP ISO](intro_otp_iso_install.mdx) or [Install the Router using the Interactive Installation](intro_installation_bootable_media.mdx)

To install the SSR software on AWS or Azure, refer to: 
 - [Installation from Amazon Web Services (AWS) Marketplace](intro_installation_aws.md)
    - [Amazon Web Services Quickstart](intro_installation_quickstart_aws.md)
 - [Installation in Microsoft Azure](intro_installation_azure.md)   

A Mist-redirect ZTP process for Conductor-managed deployments is supported on Juniper branded hardware devices - the SSR1x0/1x00. See [Onboard an SSR Device to a Conductor](onboard_ssr_to_conductor.md) for details about this process.

## Image Based Installation

Beginning with version 6.0, an image-based ISO installation process has been implemented for users who manage their network using the Mist Cloud. This installation and upgrade process is only available for SSR version 6.0 and higher, and is currently only available for Mist-managed deployments. See [Image-Based Installation](intro_installation_image.md) for information and the ISO installation process.

:::important
The Image-Based Installation process supports Mist WAN Assurance; the Mist-managed WAN Assurance offering. Do not use the image-based installation for conductor-managed WAN Telemetry deployments.
:::

For customers with conductor-managed deployments, the [package-based installation](intro_installation_bootable_media.mdx) continues to be used for upgrades and new installations.

## Upgrades

Please refer to [Upgrade Considerations](intro_upgrade_considerations.md) before upgrading. Additional prerequisites include configuring a user with super user (sudo) privileges. **The SSH Root login is not permitted.** If the existing version allows SSH Root login, it will be disabled during the upgrade. When a system is installed using the OTP ISO, a "t128" user is configured with sudo privileges. 

For full details and instructions refer to [Upgrading the SSR Networking Platform.](intro_upgrading.md)

## Version Dependencies

The conductor Major.Minor version must be greater than or equal to the router version. The router version can not exceed the conductors major.minor version, but it can have a greater patch version. All [versions currently under support](about_support_policy.md) contract can be run on a router and managed by the conductor, provided that the conductor version is greater. Versions of software not under support contract *may* work, but are not guaranteed to do so.  

Examples:
- Conductor running version 6.0.5, managing Routers running version 6.0.1: Supported.
- Conductor running version 5.4.8, managing Routers running version 5.4.10: Supported.
- Conductor running version 6.0.5, managing Routers running version 5.5.7: Supported.
- Conductor running version 4.5.13, managing Routers running version 4.2.9: Not supported, but may work.




