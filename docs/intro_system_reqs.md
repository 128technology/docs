---
title: System Requirements
sidebar_label: System Requirements
---
## Hardware Requirements
The Session Smart Networking Platform runs on both bare metal servers and as a virtual machine within hypervisor environments. For virtual environments the same CPU, memory, and storage specifications are required for comparable throughput.

Please review the router and conductor [minimum requirements](about_supported_platforms.md#minimum-platform-specifications). See [Certified Platforms](about_certified_platforms.mdx) and the [Platform Support Policy](about_supported_platforms.md) for more details.

:::info
Larger hard drives may be required if you intended to support an increased volume of flow and stored session-related information. These are used for analysis of the traffic patterns and utilization of your Session Smart Router (SSR) system. Consult with your account representative for hardware recommendations specific to your traffic throughput needs, or visit our [online community](https://community.juniper.net/answers/communities/community-home?CommunityKey=310d1a41-12fa-4627-9a99-880145a7c87c/) for hardware profile examples.
:::

:::important
While the SSR uses a journaled filesystem to limit the risk of data corruption during a power failure, the use of an uninterrupted power supply (UPS) is recommended whenever practical.
:::

:::important
When run as a virtual machine, CPU cores must be dedicated to the SSR router using core affinity.
:::

:::important
It is strongly recommended to use ECC memory for all hardware platforms.
:::

## Environmental Requirements
The SSR software has certain basic environmental requirements to ensure smooth operation. Chief among those are reliable NTP (Network Time Protocol) and DNS (Domain Name System). Please make certain you have NTP and DNS servers that are reachable by the host platform upon which the SSR application is installed.

:::important
Because the SSR application has various time-series databases that rely on precision timekeeping, the SSR application as a whole relies on precision timekeeping. It is therefore ill-advised to only use NTP servers that can be reached over SVR once the SSR application is running; this creates a circular dependency, where SSR relies on NTP and NTP relies on SSR. This can lead to clock skew and general product instability.
:::

## BIOS Recommendations
In order to configure standard, off-the-shelf hardware to perform in line with traditional routing hardware, we recommend that you configure several BIOS settings to increase performance and resiliency.

### Boot Priority
It may be necessary to change the target system’s BIOS settings to allow booting from removable media. Consult your hardware vendor’s documentation (or pay close attention to the messages displayed during the boot sequence) to verify that it will boot from a USB, CD, or DVD.

![BIOS Screen](/img/intro_installation_bootable_media_bios.png)

### Enable Automatic Restart
In the event of power disruption, the Automatic Restart setting in your system's BIOS can automatically restart your system once power is restored. As BIOS settings may vary between hardware vendors, consult your hardware platform's operating guides for specific instructions, or look on [AI-Driven SD-WAN powered by Session Smart community](https://community.juniper.net/communities/community-home?communitykey=18c17e96-c010-4653-84e4-f21341a8f208) for commonly deployed SSR hardware platforms. Below are representative steps for common BIOS parameters:

#### To enable Automatic Restart:
1. From the BIOS settings screen, select ACPI \> Power Settings.
2. Change the Automatic Restart setting to On.
3. Save the configuration and reboot your system. 

### Disable Secure Boot
Secure Boot verifies the integrity of the system. Because the kernel modules of the SSR are not signed, the modules required by the network interface drivers cannot be loaded at runtime. In order to allow the loading of the necessary drivers, the Secure Boot setting in the BIOS must be disabled. 

:::note
When deploying SSR on VMware ESXi release 6.7 (or newer), Secure Boot must be disabled when the Virtual Machine is created (New Virtual Machine wizard). To disable, deselect **Secure Boot (EFI boot only)** found on the **VM Options** tab within the **Customize Hardware** section.
:::

#### To disable Secure Boot:
1. On the BIOS settings screen, select Boot.
2. Change the Secure Boot setting to Off.
3. Save the configuration.
4. Reboot your system.

BIOS settings may vary between hardware vendors. Please consult your hardware documentation for specific instructions. Additional information for common deployments of SSR hardware platforms may be found on [AI-Driven SD-WAN powered by Session Smart community](https://community.juniper.net/answers/communities/community-home?CommunityKey=310d1a41-12fa-4627-9a99-880145a7c87c/).

## Interface Requirements
Logically, SSR routers have at least two interfaces; in many deployments they represent LAN and WAN interfaces. These may be separate physical interfaces, or they may be separate VLANs on a single physical interface. There is also typically a third interface used for management traffic.

Though not a hard requirement, it is recommended to use a dedicated physical interface for management traffic whenever practical, to avoid commingling data plane and management traffic.

When configuring two software _nodes_ in a highly available router, each node requires a dedicated physical interface for synchronizing session data to its redundant peer. Each also generally have another, separate physical interface (referred to as a "fabric" interface) that is used to forward traffic between the nodes across a logical backplane between them. The fabric interface is not mandatory; refer to the [High Availability](config_ha.md) documentation for more information on configuration design for high availability deployments.

### Assigning the System Interfaces
Interfaces on host systems running as an SSR, either bare metal or virtual deployment environments, are assigned for packet forwarding. At least one dedicated interface is required for packet forwarding.

:::note
Interface assignments are required only on software instances that are running as routers. Conductor nodes do not require interface assignments.
:::

:::info
As mentioned in [Hardware Requirements](#hardware-requirements), it is recommended to use a separate interface for management traffic.
:::

#### Identify Interface PCI Addresses
Each Ethernet interface within a Linux system has a unique PCI address. This PCI address is used in the router's configuration to access the underlying hardware. Session Smart Routing (SSR) functionality is dependent upon immutable PCI addresses. If the PCI address for an interface changes, the interface may no longer be accessible. 

Use the procedure below to identify PCI addresses. During identification, be sure to record the PCI bus addresses for the individual interfaces.

:::note
Once the PCI addresses are configured for packet forwarding, the interfaces are no longer available to the Linux operating system. Incorrectly configuring the PCI addresses causes ssh connections and package installs to fail.
:::

#### To Identify PCI Addresses:
1. Launch a command prompt window.
2. Issue the command `lshw -c network -businfo`
3. The PCI addresses are displayed in the tabular output in the column labeled Bus info. These addresses are also referenced in your SSR configuration, with the preceding pci@ omitted, to identify which interfaces you want the system to manage and use for packet forwarding.
4. Record the PCI addresses you wish to use, and close the command prompt window.

After identification, verify that the PCI address is immutable using one of the following procedures.

#### Verify Immutability of the PCI Address:

Reboot the system:
1. Run `lshw -c network -businfo`. 
2. Record the output. 
3. Reboot the system and run `lshw -c network -businfo` again.

If any PCI address changes, the system is disqualified.

Connect an additional PCI card (if possible): 
1. Run `lshw -c network -businfo`. 
2. Record the output. 
3. Shutdown the system.
4. Plug in a NIC.
5. Boot the system.
6. Run `lshw -c network -businfo`. 
7. Record the output. 

If a PCI address for an interfaces change, the system will be disqualified. Examples of a PCI address changing are; after an OS reboot, or a BIOS setting change after the system is imaged. 


:::tip
If you are unsure which device maps to which physical port on your Linux system, you can use Linux's ethtool application to blink the NIC's activity light. For example, the command `ethtool --identify eno1 120` will blink eno1's activity light for two minutes (120 seconds).
:::
:::note
PCI-to-port maps are available for commonly deployed hardware systems on our user community, [AI-Driven SD-WAN powered by Session Smart community](https://community.juniper.net/answers/communities/community-home?CommunityKey=310d1a41-12fa-4627-9a99-880145a7c87c/)
:::

## VMware ESXi and KVM Requirements
When deploying SSR Software on VMware ESXi release 6.7 (or newer), [Secure Boot must be disabled](#disable-secure-boot) when the Virtual Machine is created (New Virtual Machine wizard). 
To disable Secure Boot on VMWare ESXi, deselect **Secure Boot (EFI boot only)** found on the **VM Options** tab within the **Customize Hardware** section.

![New Virtual Machine Wizard](/img/intro_vmware_secureboot.png)

VMware ESXi (5.5, 6.0, and 6.5) and KVM (2.1.3) with libvirt (1.2.9.3 and 3.2.0) are hypervisor environments. The following adjustments are required to run SSR Software in these environments: 
- Leverage core affinity to dedicate CPU cores to SSR software, instead of leveraging virtual CPUs.
- Set the SCSI controller to LSI Logic SAS.
- For VMWare ESXi deployments, set network adapters to type e1000. 
- For KVM deployments, set the network adapters to type Virtio. 
- Separate the management interface, which is used for inter-component communication and out-of-band management, from the forwarding plane interfaces. 
- Reserve a minimum of two network interfaces for production traffic.
- Depending on your environment, set the SSR router node portgroup to either promiscuous or bridged mode when supporting one or more redundant interfaces. (For example, when you are defining and configuring a MAC address for each redundant interface.) For VMware ESXi, the portgroup mode should be set to _promiscuous_. For KVM libvirt, the portgroup mode should be set to _bridged_. For more information, refer to the [High Availability](config_ha.md) guide.

## Next Steps
Once you have identified the platform best suited for your needs, please refer to the [SSR Software Installation Guide](intro_installation.md) for information about the install process. 
