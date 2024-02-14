---
title: SSR Secure Installation
sidebar_label: Secure Installation Overview
---

Welcome to Session Smart Routing - the first software-based routing solution designed to be both session-oriented and service-centric through the application of Secure Vector Routing. The purpose of this guide is to provide an overview and installation walkthrough for the SSR Router and Conductor products into a Linux operating system environment. This product suite is collectively known as SSR Software.

## Before You Begin
Before you begin the installation and configuration of an SSR Networking Plaform, you must:
- Be familiar with Linux fundamentals, basic network addressing, and IP networking terminology. 
- Be a system administrator to perform the installation and configuration.
- Have an entry in /etc/sudoers allowing you to execute Linux shell commands as root (via sudo). Failure to do so may result in the loss of remote management connectivity to the router. 

:::note
The examples listed in this guide generally run commands as a non-root user, except as noted, and prepend commands that must be run as a superuser with sudo. **The SSH Root login is not permitted.** 
:::

### SSR Software Version

The SSR devices ship with an older version of SSR software that is not Common Criteria and FIPS compliant. It is required that you install SSR 6.2.3-14R2 software on the device to configure and run Common Criteria and FIPS compliant instances.

The installation process is the most efficient way to achieve compliant software. The upgrade process may be used for updates after having installed SSR 6.2.3-14R2 software.

Access to the SSR Software packages available for downloand from our software repositories is provided using the username and token provided to you.

## Installation Process Overview

Installation is done from the SSR ISO, typically from a bootable image on a flash drive or disk. 
The install process is as follows:
- [Download the OTP ISO](cc_fips_downloading_iso.md)
- [Create Bootable Media](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/intro_creating_bootable_usb)
- [Install a Conductor](cc_fips_conductor_install.md)
- [Create the Router configuration with the Conductor](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/intro_basic_router_config) or [Import a Configuration](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/single_conductor_config)
- [Install the Router](cc_fips_router_install.md) 

## Upgrades

To determine the current version of software running on your Conductor or Router, run the following command from the Conductor PCLI:

[`show system version`](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/cli_reference#show-system-version)

Use this information if you upgrading to a software version **after having installed** SSR Version 6.2.3-14R2. 

The SSR Software packages are available from our public servers using the **username and token provided to you.** During the upgrade process, your SSR uses this information to securely access the download location. Depending on your upgrade selection, the following locations are accessed by the upgrade process at the following location:

<!-- markdown-link-check-disable-next-line -->
- https://software.128technology.com/artifactory/list/generic-128t-isos-release-local

Please refer to [Upgrade Considerations](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/intro_upgrade_considerations) before upgrading. Additional prerequisites include configuring a user with super user (sudo) privileges. **The SSH Root login is not permitted.** If the existing version allows SSH Root login, it will be disabled during the upgrade. When a system is installed using the OTP ISO, a "t128" user is configured with sudo privileges. 

To perform an upgrade on either a conductor or router, refer to the detailed instructions at [Upgrading the SSR Networking Platform.](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/intro_upgrading)

