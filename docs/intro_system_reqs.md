---
title: Hardware Requirements
sidebar_label: Hardware Requirements
---
## Hardware Requirements
The 128T routing software runs on both bare metal servers and as a virtual machine within hypervisor environments. For virtual environments, the same CPU, memory, and storage specifications are required for comparable throughput.

The 128T routing software recommends a minimum of 4 CPU cores, 8GB of RAM, and at least 25GB of hard drive space. See [certified platforms](about_certified_platforms.mdx) and the [platform support policy](about_supported_platforms.md) for more details.

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
- Depending on your environment, set the 128T router node portgroup to either promiscuous or bridged mode when supporting one or more redundant interfaces. (For example, when you are defining and configuring a MAC address for each redundant interface.) For VMware ESXi, the portgroup mode should be set to _promiscuous_. For KVM libvirt, the portgroupo mode should be set to _bridged_. For more information, refer to the [High Availability](config_ha.md) guide.