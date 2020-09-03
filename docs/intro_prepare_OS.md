---
title: Preparing the Operating System
sidebar_label: Preparing the Operating System
---

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

- [Installing from 128T Installer](intro_installation_installer.md)
- [Installing from bootable media](intro_installation_bootable_media.md)
- [Installing on AWS](intro_installation_aws.md)