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

## Installation Process
To properly deploy the 128 Technolgy system, you must first install and configure the Conductor. Once the Conductor is installed and configured, the router software can be installed on one or many systems using automated ISO process. 

## Installation Methods
The 128T routing software offers the following installation methods to address your specific system. 
 - [Interactive ISO](intro_installation_bootable_media.md)
 - [One Touch Provisioning (OTP) ISO Image](intro_installation_otp_iso.mdx)
 - [Installation from Amazon Web Services (AWS) Marketplace](intro_installation_aws)
 	- [Amazon Web Services Quickstart](intro_installation_quickstart_aws.md)
 - [Installation in Microsoft Azure](intro_installation_azure.md)	



