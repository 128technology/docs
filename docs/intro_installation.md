---
title: 128T Software Installation Guide
sidebar_label: Installation Overview
---
## Introduction
Welcome to 128T - the first software-based routing solution designed to be both session-oriented and service-centric through the application of Secure Vector Routing. The purpose of this guide is to provide an overview and installation walkthrough for the 128T Router and 128T Conductor products into a Linux operating system environment. This product suite is collectively known as 128T Routing Software.

:::info
The installation guides are version agnostic and are applicable for all current and future versions of software.
:::

## Before You Begin
Before you begin the installation and configuration of 128T Networking Plaform, you must:
- Be familiar with Linux fundamentals, basic network addressing, and IP networking terminology. 
- Be a system administrator to perform the installation and configuration.
- Have an entry in /etc/sudoers allowing you to execute Linux shell commands as root (via sudo). Failure to do so may result in the loss of remote management connectivity to the router. 

:::note
The examples listed in this guide generally prefer running commands as a non-root user, except as noted, and prepend commands that must be run as a superuser with sudo. **The SSH Root login is not permitted.** 
:::

### Regarding Upgrades
[Prerequisites for upgrades](intro_upgrading.md) include configuring a user with super user (sudo) privileges. **The SSH Root login is not permitted.** If the existing version allows SSH Root login, it will be disabled during the upgrade. When a system is installed using the OTP ISO, a "t128" user is configured with sudo privileges. 

## Installation Process
Installation is done from the 128T ISOs, typically from a bootable image on a flash drive or disk. The install process is as follows:
- [Download the ISOs](intro_downloading_iso.md)
- [Create Bootable Media](intro_creating_bootable_usb.md)
- [Perform the Interactive ISO installation](intro_installation_bootable_media.md) 
- [Configure a Conductor](intro_basic_conductor_config.md)
- [Create the Router configuration with the Conductor](intro_basic_router_config.md)
- [Install and Reboot the Router using the OTP ISO](intro_otp_iso_install.mdx)

To install the 128T software on AWS or Azure, refer to: 
 - [Installation from Amazon Web Services (AWS) Marketplace](intro_installation_aws.md)
 	- [Amazon Web Services Quickstart](intro_installation_quickstart_aws.md)
 - [Installation in Microsoft Azure](intro_installation_azure.md)	



