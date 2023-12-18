---
title: Router Installation - FIPS
sidebar_label: Router Installation - FIPS 
--- 

This process assumes you have already created a bootable device using a USB. Instructions for downloading and creating a bootable device are available in [Downloading an SSR ISO](intro_downloading_iso.md) and [Creating a Bootable USB](intro_creating_bootable_usb.md).

The steps in this section describe the *interactive router installation* from the packaged-based ISO. The section [Initialize the Router](#initialize-the-router-node) describes using the Initializer to configure the system as a Router after installing from the Interactive ISO.

:::note
The Conductor installation must be completed before installing a Session Smart Router or routers using the ISO. The same ISO is used for both installations.
:::

## Prerequisites

- Ensure that the platform you are installing on meets the [SSR hardware requirements](about_supported_platforms.md#minimum-platform-specifications).
- Verify that the boot priority of the USB drive is properly listed in the system BIOS.
- Local console connectivity to the device/VM. 

## FIPS Mode

Use this process to install a FIPS-compliant SSR Conductor. 

To enable FIPS Enforcement for SSR software version 6.2.3-14R2, add the `fips=1` kernel option  to the kernel command line during system installation as shown in the steps below. This ensures that key generation is done with FIPS approved algorithms and continuous monitoring tests in place.


Use the following procedure to enable FIPS enforcement.

1. Use up/down keys to highlight the desired install mode. 

  ![Bios Install](/img/56fips_BIOSinstall_1.png)

2. Press TAB to edit the configuration.

3. Add `fips=1` to the end of the `vmlinuz` parameters.

  ![FIPS Parameter](/img/56fips_BIOSinstall_2.png)

4. Press Enter to start the install. 

## SSR Installation

## Conductor Installation 

After the Linux installation completes, the SSR software installation begins. Note that this may take several minutes to complete (approximately 20 minutes). After the installation has completed, the following screen is displayed:

![Installation Complete](/img/intro_installation_bootable_media_install_complete.png)

Select `<Yes>` to shut down the system. Remove the bootable media, then power the system up to complete the installation process. 

### Initial Boot and NMTUI

When the system boots from the `Install 128T Routing Software...` Interactive Installation work flow, the system asks whether to configure initial Linux Networking before the SSR Initializer is started.

![128T NetManager TUI Start](/img/Initializer_Serial0.png)

Selecting `Yes` launches the NMTUI application to perform an initial network interface setup.

![128T NetManager TUI Option](/img/Initializer_Serial1.png)

### Initialize the SSR Node

The SSR Initializer tunes your operating system, prepares the platform to run the SSR software, and creates the bootstrapping files necessary to load the software. The Initializer is launched on first boot.

1. On the SSR Initializer wizard screen, use the space bar to select the **Router** role for the SSR node and press the **Enter** key to select **OK**.

  ![SSR Role](/img/initializer_Serial2a.png)

2. For SSR routers, you will be prompted for the IP address(es) of the conductor. If you have a conductor, enter the administrative IP address and the node will retrieve the configuration from the conductor. If you have only one conductor (i.e., a standalone conductor), leave the field labeled 2nd Conductor Address blank. If you have no conductors, choose **Skip**.
3. When asked _What kind of Router/Conductor node is this?_, select from the following options:

  ![Identify the Node](/img/initializer_Serial3.png)

- **Standalone:** This router has no highly available peer, and is not currently planned for high availability.

- **1st HA Node:** This router is the first node of a high availability pair. You will be prompted to provide the local IP address for this node. The 2nd HA node will contact this node at the address provided to synchronize state. Note: The 1st Node IP address must be reachable by the 2nd HA Node.
  
- **2nd HA Node:** This router is the second node of a high availability pair, where the first node has been initialized. You will be prompted to provide the 1st Node IP address for this 2nd node that will be used to synchronize state. Note: The 2nd Node IP address must be reachable by the 1st HA Node.

4. Enter the following system properties on the **Node Info** screen:

  ![Node Information](/img/initializer_Serial5.png)

  - **Node Name:** The name of the system within your SSR Router or Conductor, for example, _boston_router_. By default this field uses the Linux system's hostname.

  :::note
  Both routers and conductors can consist of one node (for standalone systems) or two nodes (for highly available systems).
    :::
  - **Router/Conductor Name:** The name of the router system as a whole. When referring to a running SSR software instance, it is identifiable by the full name of `nodeName.routerName`; e.g., `boston_router-node1.router`. The full system name is reflected in the PCLI prompt as discussed in the Document Conventions section of this document.

5. On the **Password Setup** screen, create a password for the SSR Admin user. The administrator password must be at least 8 characters long, contain at least 1 uppercase letter, at least 1 lowercase letter, at least 1 number, cannot contain the username in any form, and cannot repeat characters more than 3 times. This operation is only performed on the standalone or first node in the HA peer.
  :::note
  Resetting a password requires entering the old password. If a password is lost or forgotten and the account is inaccessible, the account cannot be recovered. Please keep password records accessible and secure. 
  :::

  ![Password Setup](/img/initializer_Serial6.png)

6. Press the **Enter** key to select **OK**. The Initializer performs a hardware compatibility check. The compatibility check may fail due to warnings or failure notices, which are displayed in the output script. If no failures are present, you can choose to continue with the installation even if multiple warnings exist. For information on why a specific test may have failed or generated a warning, contact Juniper Technical Support.

7. When prompted, select Yes to start the SSR.

  ![Initializer Complete](/img/initializer_complete.png)

  :::note
  A system reboot is required.
  :::