---
title: SSR Secure Installation
sidebar_label: Secure Installation Overview
---

Welcome to Session Smart Routing - the first software-based routing solution designed to be both session-oriented and service-centric through the application of Secure Vector Routing. The purpose of this guide is to provide an overview and installation walkthrough for the SSR Router and Conductor products into a Linux operating system environment. This product suite is collectively known as SSR Software.

## Before You Begin
Before you begin the installation and configuration of an SSR Networking Platform, you must:
- Be familiar with Linux fundamentals, basic network addressing, and IP networking terminology. 
- Be a system administrator to perform the installation and configuration.

:::note
The examples listed in this guide generally run commands as a non-root user, except as noted, and prepend commands that must be run as a superuser with sudo. **Logging in as `root` over SSH is not permitted.** 
:::

### SSR Software Version

The SSR devices ship with an older version of SSR software that is not Common Criteria and FIPS compliant. It is required that you install SSR 6.2.5-5r2 software on the device to configure and run Common Criteria and FIPS compliant instances.

:::note
The installation process is the only way to achieve compliant software. The upgrade process may only be used for subsequent updates after the initial installation of the SSR 6.2.5-5r2 software.
:::

Access to the SSR Software packages available for download from our software repositories is authenticated using the username and token provided to you.

## Installation Process Overview

Installation is done from the SSR ISO, typically from a bootable image on a flash drive or disk. 
The install process is as follows:
- [Download the OTP ISO](cc_fips_6.2.5_downloading_iso.md)
- [Create Bootable Media](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/intro_creating_bootable_usb)
- [Install a Conductor](cc_fips_6.2.5_conductor_install.md)
- [Create the Router configuration with the Conductor](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/intro_basic_router_config) or [Import a Configuration](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/single_conductor_config)
- [Install the Router](cc_fips_6.2.5_router_install.md) 


