---
title: System Requirements
sidebar_label: System Requirements
---
Use the following information to prepare your system for the 128T installation.

## Hardware Requirements
The 128T routing software runs on both bare metal servers and as a virtual machine within hypervisor environments. For virtual environments, the same CPU, memory, and storage specifications are required for comparable throughput.

The 128T routing software recommends a minimum of 4 CPU cores, 8GB of RAM, and at least 25GB of hard drive space.

:::info
Larger hard drives may be required if you intended to support an increased volume of flow and stored session-related information. These are used for analysis of the traffic patterns and utilization of your 128T routing system. Consult with your account representative for hardware recommendations specific to your traffic throughput needs, or visit our [online community](https://community.128technology.com/) for hardware profile examples.
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
- Depending on your environment, set the 128T router node portgroup to either promiscuous or bridged mode when supporting one or more redundant interfaces. (For example, when you are defining and configuring a MAC address for each redundant interface.) For VMware ESXi, the portgroup mode should be set to _promiscuous_. For KVM libvirt, the portgroupo mode should be set to _bridged_. For more information, refer to the [High Availability](config_ha.md) guide.

## Operating System Requirements
The 128T routing software supports CentOS 7.5 as its underlying operating system. 

### CentOS
When installing from a 128T ISO, CentOS 7.5 is included and automatically installed. Other (manual) installations require that CentOS 7.5 be installed. We recommend installing the minimal CentOS package, as the 128T installer will fetch and install any additional dependencies during the installation process.

## BIOS Recommendations
In order to configure standard, off-the-shelf hardware to perform in line with traditional routing hardware, we recommend that you configure the following BIOS settings to increase performance and resiliency.

### Enable Automatic Restart
In the event of power disruption, the Automatic Restart setting in your system's BIOS can automatically restart your system once power is restored. As BIOS settings may vary between hardware vendors, consult your hardware platform's operating guides for specific instructions, or look on [Interchange](https://community.128technology.com/) for commonly deployed 128T hardware platforms. Below are representative steps for common BIOS parameters:

#### To enable Automatic Restart:
1. From the BIOS settings screen, select ACPI \> Power Settings.
2. Change the Automatic Restart setting to On.
3. Save the configuration and reboot your system. 