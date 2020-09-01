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
Before you begin the installation and configuration of 128T Routing Software, you must:
- Be familiar with Linux fundamentals, basic network addressing, and IP networking terminology. 
- Be a system administrator to perform the installation and configuration.
- Have root access to the target machine, or have an entry in /etc/sudoers allowing you to execute Linux shell commands as root (via sudo).

:::note
The examples listed in this guide generally prefer running commands as a non-root user, except as noted, and prepend commands that must be run as a superuser with sudo.
:::

## Installation Methods
The 128T routing software offers the following installation methods to address your specific system. 
 - Interactive ISO
 - One Touch Provisioning (OTP) ISO Image
 - Zero Touch Provisioning (ZTP) ISO Image
 - Manual Installer
 - Installation from Amazon Web Services (AWS) Marketplace
 	- Manual Installation
 	- Install using ZTP
 - Installation in Microsoft Azure	



## Post Installation

After installing your 128T Routing Software you may want to stop or upgrade your software. The procedure for stopping the software is provided for reference and is not required as part of your software installation or maintenance.

### Stopping the 128T Routing Software
Occasionally, you may need to stop the 128T software to perform maintenance on your system.

1. Launch a Linux shell window.
2. Execute the command
  ```
sudo systemctl stop 128T
  ```
3. Verify that the software has stopped by executing the command
  ```
sudo systemct1 status 128T
  ```
**Result**: The software is listed as _inactive (dead)_.
4. Close the Linux shell.
