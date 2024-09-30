---
title: SSR Software Installation Guide
sidebar_label: Installation Overview
---
## Introduction

Welcome to Session Smart Routing - the first software-based routing solution designed to be both session-oriented and service-centric through the application of Secure Vector Routing. The purpose of this guide is to provide an overview and installation walkthrough for the SSR Router and Conductor products into a Linux operating system environment. This product suite is collectively known as SSR Software.

## Before You Begin
Before you begin the installation and configuration of an SSR Networking Plaform, you must:
- Be familiar with Linux fundamentals, basic network addressing, and IP networking terminology. 
- Be a system administrator to perform the installation and configuration.
- Have an entry in `/etc/sudoers` allowing you to execute Linux shell commands as root (via sudo). Failure to do so may result in the loss of remote management connectivity to the router. 

:::note
The examples listed in this guide generally prefer running commands as a non-root user, except as noted, and prepend commands that must be run as a superuser with sudo. **The SSH Root login is not permitted.** 
:::

## Installation Process

Beginning with SSR 6.3.0, the Universal ISO Installation simplifies and streamlines the SSR installation and initialization process, and supports Conductor-managed image-based installations as well as Mist-managed deployments. 

Installation is done from the SSR ISOs, typically from a bootable image on a flash drive or disk. The install process is as follows:
- Pre-Installation Process:
   - [Download the ISOs](intro_downloading_iso.md)
   - [Create Bootable Media](intro_creating_bootable_usb.md)
- [SSR Universal ISO Installation (SSR 6.3.0+)](intro_installation_univ-iso.md)
   - [SSR Installation](install_univ_iso.md)
   - [Device Initialization](initialize_u-iso_device.md)

- Cloud Platform Installation: 
   - [Installation from Amazon Web Services (AWS) Marketplace](intro_installation_aws.md)
   - [Installation in Microsoft Azure](intro_installation_azure.md)
   - [Installing in VMWare](install_vmware_config.mdx)

A Mist-redirect ZTP process for Conductor-managed deployments is supported on Juniper branded hardware devices - the SSR1x0/1x00. See [Onboard an SSR Device to a Conductor](onboard_ssr_to_conductor.md) for details about this process.

## Upgrades

Please refer to [Upgrade Considerations](intro_upgrade_considerations.md) before upgrading. Additional prerequisites include configuring a user with super user (sudo) privileges. **The SSH Root login is not permitted.** If the existing version allows SSH Root login, it will be disabled during the upgrade. When a system is installed using the OTP ISO, a "t128" user is configured with sudo privileges. 

For full details and instructions refer to [Upgrading the SSR Networking Platform.](intro_upgrading.md)

## Version Dependencies

The conductor `major.minor` version must be greater than or equal to the router version. The router version can not exceed the conductors `major.minor` version, but it can have a greater patch version. All [versions currently under support](about_support_policy.md) can be run on a router and managed by the conductor, provided that the conductor version is greater. Versions of software not under support *may* work, but are not guaranteed to do so.  
