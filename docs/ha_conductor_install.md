---
title: High Availability Conductor Installation
sidebar_label: High Availability Conductor Installation
---

This process covers the installation of two HA Conductor Nodes, and assumes you have already created a bootable USB. Instructions for downloading and creating a bootable device are available in [Downloading an SSR ISO](intro_downloading_iso.md) and [Creating a Bootable USB](intro_creating_bootable_usb.md).

The steps in this section describe the *interactive conductor installation* from the packaged-based ISO. The section [Initialize the SSR](#initialize-the-128t-node) describes using the Initializer to configure the system as a Conductor after installing from the Interactive ISO. 

:::note
The Conductor installation must be completed before installing a Session Smart Router or routers using the ISO. The same ISO is used for both installations.
:::

To install a router **after** installing and configuring the Conductor, use the [SSR Installation](intro_installation_bootable_media.mdx#initialize-the-ssr-node). The [Router Installation Using OTP](intro_otp_iso_install.mdx) procedure can be used to install more complex router configurations. 

## Prerequisites

- Ensure that the platform you are installing on meets the [SSR hardware requirements](about_supported_platforms.md#minimum-platform-specifications).
- Verify that the boot priority of the USB drive is properly listed in the system BIOS.
- Local console connectivity to the device/VM. 

## Installing the ISO

After imaging the ISO onto removable media, insert it into the target device and power it on.

### Choose the Installation Type

Upon boot, the following screen is displayed. The default selection is booting to the serial console (115200 baud). You must manually choose the installation process suited for your environment. 

To install using the Interactive Installation, use the arrow keys to select either `Install SSR Routing Software Serial Console` or **`Install SSR Routing Software VGA Console`**. As noted earlier, this guide describes the installation process using the Interactive Installation, specifically using the VGA console.

![VGA Boot with Interactive Install](/img/install_select_interactive.png)

Differences for the serial console are described in [Serial Console Installation Information](intro_installation_bootable_media.mdx#serial-console-installation-information). 

:::note
Because not all hardware has video support, booting to the serial console 115200 baud is the default, and is automatically selected after 30 seconds. When using the serial console, the terminal size is 80x25 - anything smaller may result in abnormal navigation behavior.

Selecting the wrong type of console (Serial or VGA) may result in garbled characters being displayed. If allowed to continue it will result in an incorrect installation. If the wrong console is selected, reboot the target system and select the correct line for the target hardware.
::: 

#### Install via Serial Console

Use this option when running on hardware with no video chipset. It uses `/dev/ttyS0` 115200 baud as the serial console for interacting with the installer. 

![Serial Install Selection](/img/install_select_interactive2.png)

For serial console issues please refer to [Serial Console Troubleshooting](#serial-console-troubleshooting).

#### Install via VGA Console

Use this option when running on hardware that has onboard graphics chipsets. This installs SSR software using the GUI installer.

The procedure that follows here is the **Interactive Install on the VGA Console**.

### FIPS Enforcement Mode

FIPS Enforcement is available for **version 6.0 and later**. FIPS mode can be enabled manually during the installation. In cases where the flag was not or cannot be set during installation, a FIPS RPM is available for download from the SSR repos, and can be installed.

:::important
If you require strict FIPS compliance, the `fips=1` kernel option must be added to the kernel command line during system installation to ensure that key generation is done with FIPS approved algorithms and continuous monitoring tests in place.

If FIPS enablement is done retrospectively via RPM installation, the already created accounts could be using non-FIPS compliant cyphers.
:::

Use the following procedure to enable FIPS enforcement.

1. Use up/down keys to highlight the desired install mode. 

  ![Bios Install](/img/56fips_BIOSinstall_1.png)

2. Press TAB to edit the config.

3. Add `fips=1` to the end of the vmlinuz parameters.

  ![FIPS Parameter](/img/56fips_BIOSinstall_2.png)

4. Press Enter to start the install.   

## Conductor Installation

After the Linux installation completes, the SSR software installation begins. Note that this may take several minutes to complete (approximately 20 minutes). After the installation has completed, the following screen is displayed:

![Installation Complete](/img/intro_installation_bootable_media_install_complete.png)

Select `<Yes>` to shut down the system. Remove the bootable media, then power the system up to complete the installation process. 

### Initial Boot and NMTUI

When the system boots from the Interactive Installation work flow, the system prompts you to configure initial Linux Networking before the Initializer is started. By default, all interfaces are disabled; at least one must be enabled to allow administrative access to the Conductor GUI, and for the routers to reach the Conductor.  

![128T NetManager TUI Start](/img/Initializer_Serial0.png)

Select `Yes` to launch the CentOS NMTUI application and perform an initial network interface setup. 

![128T NetManager TUI Option](/img/Initializer_Serial1.png)

Configure a Linux interface that corresponds to the management port for your Conductor. 

![Config eno1](/img/nmtui-linux.png)

![Edit Connection 1](/img/nmtui-linux-1.png)

![Config Connection](/img/nmtui-linux-2.png)

Return to the NMTUI home screen and make any additional edits. Note that the system hostname will be used as the Asset ID. 

Refer to the NMTUI user documentation for additional details.

### Initialize the SSR Node

The SSR Initializer tunes your operating system, prepares the platform to run the SSR software, and creates the bootstrapping files necessary to load the software. The Initializer is launched on first boot.

## Install the First Conductor HA Node 

1. On the SSR Initializer wizard screen, use the space bar to select the **Conductor** role for the SSR node, and press the **Enter** key to select **OK**.

  ![SSR Role](/img/initializer_Serial2.png)

2. When asked _What kind of Router/Conductor node is this?_, select **1st HA Node**:

  ![Identify the Node](/img/initializer_Serial3.png)

- **1st HA Node:** This conductor is the first node of a high availability pair. You will be prompted to provide the local IP address for this node. The 2nd HA node will contact this node at the address provided to synchronize state. Note: The 1st Node IP address must be reachable by the 2nd HA Node.
  
- **2nd HA Node:** This conductor is the second node of a high availability pair, where the first node has been initialized. You will be prompted to provide the 1st Node IP address for this 2nd node that will be used to synchronize state. Note: The 2nd Node IP address must be reachable by the 1st HA Node.

4. The following steps configure a high availability conductor node.

  a). Enter the IP address of the local HA sync interface. 

    ![High Availability IP Address](/img/initializer_Serial3HAIP.png)

  b). Enter the following system properties on the **Node Info** screen:

    ![Node Information](/img/initializer_Serial5.png)

    - **Node Name:** The name of the system within your SSR Router or Conductor, for example, _conductor_. By default this field uses the Linux system's hostname.

    :::note
    Both routers and conductors can consist of one node (for standalone systems) or two nodes (for highly available systems).
    :::

    - **Conductor Name:** The name of the Conductor system as a whole. When referring to a running SSR software instance, it is identifiable by the full name; e.g., `conductor-node1.conductor`. The full system name is reflected in the PCLI prompt.

5. On the **Password Setup** screen, create a password for the SSR Admin user. The administrator password must be at least 8 characters long, contain at least 1 uppercase letter, at least 1 lowercase letter, at least 1 number, cannot contain the username in any form, and cannot repeat characters more than 3 times. This operation is only performed on the standalone or first node in the HA peer, and the password must be entered twice. 
  :::note
  Resetting a password requires entering the old password. If a password is lost or forgotten and the account is inaccessible, the account cannot be recovered. Please keep password records accessible and secure. 
  :::

  ![Password Setup](/img/initializer_Serial6.png)

6. Press the **Enter** key to select **OK**. The Initializer performs a hardware compatibility check. The compatibility check may fail due to warnings or failure notices, which are displayed in the output script. If no failures are present, you can choose to continue with the installation even if multiple warnings exist. For information on why a specific test may have failed or generated a warning, contact Juniper Technical Support.

7. When prompted, select `<Yes>` to start the conductor.

  ![Initializer Complete](/img/initializer_complete.png)

  :::note
  If installing the SSR software for the first time, a system reboot is required.
  :::

## Install the Second Conductor HA Node

For the second node for Conductor HA, install the system using the same process beginning with [Installing the ISO](intro_installation_bootable_media.mdx#installing-the-iso) and ending at [Initialize SSR](intro_installation_bootable_media.mdx#initialize-the-128t-node) step 2. From step 2, perform the following:

1. When prompted for `What kind of Conductor node is this?` Select the **2nd HA Node**.

  ![2nd HA Node Setup](/img/initializer_Serial4cHANode.png)

2. Enter the **HA Address** and **Peer HA Address** for the second node. The HA Address is the local 2nd HA Node IP address, and the Peer HA Address is the 1st HA Node IP address.

  ![2nd HA Peer IP](/img/initializer_Serial4dHANode.png)

3. Enter the **HA Peer Credentials**. This is a one time operation for the initialization of the second HA Node with the first HA Peer. The `t128` user can be used for this operation.

  ![HA Peer Credentials](/img/initializer_Serial4eHAPeer.png)

4. Press the **Enter** key to select **OK**. The Initializer performs a hardware compatibility check. The compatibility check may fail due to warnings or failure notices, which are displayed in the output script. If no **failures** are present, you can choose to continue with the installation even if multiple warnings exist. For information about why a specific test may have failed or generated a warning, contact Juniper Technical Support.

5. After the initialization process completes the setup, the following screen displays. Use the Enter key to select `Got it!`

  ![Peer Restart](/img/initializer_Serial7.png)

6. The Installer Status screen indicates success. Use the spacebar to either reboot your system or start SSR.

  ![Initializer Complete](/img/initializer_complete.png)

  :::note
  A system reboot is required.
  :::

## Verify Installation

After installing the SSR Software it is important to verify that the installation was completed successfully.

### To Verify the SSR Installation:

1. Launch a command prompt window.

2. Execute the command:

  ```
  sudo systemctl status 128T
  ```

3. When the service is listed as _Active_, log into the system as Admin using the system default password. By logging into the system, you have verified the installation. 

4. Close the command prompt window. 

5. Use a web browser to navigate to the IP address of the SSR GUI. For example; `https://192.168.1.25`

6. Log in to the SSR GUI using the admin name and password you created earlier.

## Repository Authentication

To save repository access credentials it is necessary to configure a token for for authentication with SSR software repositories. See [Configure the Token](single_conductor_install.mdx#configure-the-token) for additional details. 

