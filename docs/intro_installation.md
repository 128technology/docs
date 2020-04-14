---
title: 128T Software Installation Guide
sidebar_label: Installation
---
## Introduction
Welcome to 128T - the first software-based routing solution designed to be both session-oriented and service-centric through the application of Secure Vector Routing. The purpose of this guide is to provide an overview and installation walkthrough for the 128T Router and 128T Conductor products into a Linux operating system environment. This product suite is collectively known as 128T Routing Software.

## Before You Begin
Before you begin the installation configuration of 128T Routing Software, the following prerequisites must be met:
- You must be familiar with Linux fundamentals, basic network addressing, and IP networking terminology. 
- You must be a system administrator to perform the installation, and have root access to the target machine, or have an entry in /etc/sudoers allowing you to execute Linux shell commands as root (via sudo).
- You must be a system administrator in order to configure the 128T Routing Software.

:::note
The examples listed in this guide generally prefer running commands as a non-root user, except as noted, and prepend commands that must be run as a superuser with sudo.
:::

## Hardware Requirements
The 128T routing software runs on both bare metal servers and as a virtual machine within hypervisor environments. For virtual environments, the same CPU, memory, and storage specifications are required for comparable throughput.

The 128T routing software recommends a minimum of two CPU cores, 8GB of RAM, and at least 25GB of hard drive space.

:::info
Larger hard drives may be required if you intended to support an increased volume of flow and stored session-related information. These are used for analytical analysis of the traffic patterns and utilization of your 128T routing system. Consult with your account representative for hardware recommendations specific to your traffic throughput needs, or visit our [online community](https://community.128technology.com/) for hardware profile examples.
:::

:::important
When run as a virtual machine, CPU cores must be dedicated to the 128T router using core affinity.
:::

:::important
128 Technology strongly recommends the use of ECC memory for all hardware platforms.
:::

## Interface Requirements
Logically, 128T routers have at least two interfaces; in many deployments they represent "LAN" and "WAN" interfaces. These may be separate physical interfaces, or they may be separate VLANs on a single physical interface. There is also typically a third interface used for management traffic.

Though not a hard requirement, 128 Technology, recommends using a dedicated physical interface for management traffic whenever practical, to avoid commingling data plane traffic and management traffic.

When configuring two software _nodes_ in a highly available router, each node requires a dedicated physical interface for synchronizing session data to its redundant peer. Each also generally have another, separate physical interface (referred to as a "fabric" interface) that is used to forward traffic between the nodes across a logical "backplane" between them. The fabric interface is not mandatory; refer to the [High Availability](config_ha.md) documentation for more information on configuration design for high availability deployments.

## VMware ESXi and KVM Requirements
VMware ESXi (5.5, 6.0, and 6.5) and KVM (2.1.3) with libvirt (1.2.9.3 and 3.2.0) are hypervisor environments. The following adjustments are required to run 128T Routing Software in these environments: 
- Leverage core affinity to dedicate CPU cores to 128T software, instead of leveraging virtual CPUs.
- Set the SCSI controller to LSI Logic SAS.
- Set network adapters to type e1000. As mentioned above, typical installations include a minimum of three network adapters for router deployments.
- Separate the management interface, which is used for inter-component communication and out-of-band management, from the forwarding plane interfaces. 
- Reserve a minimum of two network interfaces for production traffic.
- Depending on your environment, set the 128T router node portgroup to either promiscuous or bridged mode when supporting one or more redundant interfaces. (For example, when you are defining and configuring a MAC address for each redundant interface.) For VMware ESXi, the portgroup mode should be set to _promiscuous_. For KVM libvirt, the portgroupo mode should be set to _bridged_. For more information, refer to the [High Availability](config_ha) guide.

## Operating System Requirements
The 128T routing software supports CentOS 7.5 as its underlying operating system. 

### CentOS
When not installing from a 128T ISO, which includes a version of the CentOS operating system, the 128T routing software requires, at a minimum, an installation of CentOS 7.5. We recommend installing the minimal package that CentOS offers, as the 128T installer will fetch and install any additional dependencies during the installation process.

## BIOS Recommendations
In order to configure standard, off-the-shelf hardware to perform in line with traditional routing hardware, we recommend that you configure several BIOS settings to increase performance and resiliency.

### Enable Automatic Restart
In the event of power disruption, the Automatic Restart setting in your system's BIOS can automatically restart your system once power is restored. As BIOS settings may vary between hardware vendors, consult your hardware platform's operating guides for specific instructions, or look on [Interchange](https://community.128technology.com/) for commonly deployed 128T hardware platforms. Below are representative steps for common BIOS parameters:

#### To enable Automatic Restart:
1. From the BIOS settings screen, select ACPI \> Power Settings.
2. Change the Automatic Restart setting to On.
3. Save the configuration and reboot your system. 

## Preparing the Operating System
Before installing 128T Routing Software you must prepare your operating system according to 128 Technology's recommendations and guidelines.

### Assigning the System Interfaces
Interfaces on host systems running as a 128T router, either bare metal or virtual deployment environments, are assigned for packet forwarding. At least one dedicated interface is required for packet forwarding.

:::note
Interface assignments are required only on software instances that are running as routers. Conductor nodes do not require interface assignments.
:::

:::info
As mentioned in the section on Hardware Requirements, 128 Technology recommends using a separate interface for management traffic if possible.
:::

#### Identify Interface PCI Addresses
Each Ethernet interface within a Linux system has a unique PCI address. This PCI address is used to bind the 128T router's configuration to the underlying hardware. During identification, be sure to record the PCI bus addresses for the individual interfaces.

:::note
Once the PCI addresses are configured for packet forwarding, the interfaces are no longer available to the Linux operating system. Incorrectly configuring the PCI addresses causes ssh connections and package installs to fail.
:::

#### To Identify PCI Addresses:
1. Launch a command prompt window.
2. Issue the command `lshw -c network -businfo`
3. The PCI addresses are displayed in the tabular output in the column labeled Bus info. These addresses are also referenced in your 128T router's configuration, with the preceding pci@ omitted, to identify which interfaces you want the system to manage and use for packet forwarding.
4. Record the PCI addresses you wish to use, and close the command prompt window.
:::tip
If you are unsure which device maps to which physical port on your Linux system, you can use Linux's ethtool application to blink the NIC's activity light. For example, the command `ethtool --identify eno1 120` will blink eno1's activity light for two minutes (120 seconds).
:::
:::note
PCI-to-port maps are available for commonly deployed hardware systems on our user community, [Interchange](https://community.128technology.com/)
:::

Once you have identified the platform and determined it meets the minimum requirements, select the appropriate installation mechanism best suited for your needs

- [Installing from 128T Installer](intro_installation_installer)
- [Installing from bootable media](intro_installation_bootable_media)
- [Installing on AWS](intro_installation_aws)

## Post Installation

On occasion, after installing your 128T Routing Software, you may want to stop or upgrade your software. The procedures for stopping and upgrading your software are intended for reference and are not required as part of your software installation or maintenance.

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
4. Close the command prompt window.
