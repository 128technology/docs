Se---
title: Conductor Interactive Installation
sidebar_label: Conductor Interactive Installation
---

This section assumes you have already created a bootable device, either a USB or CD/DVD/Blueray disk. Instructions for downloading and creating a bootable device are available in [Downloading a 128T ISO](intro_downloading_iso.md) and [Creating a Bootable USB](intro_creating_bootable_usb.md).

The steps in this section describe the interactive Conductor installation from the ISO. The section [Initialize the 128T](#initialize-the-128t-node) describes using the Initializer to configure the system as a Conductor after installing from the Interactive ISO. 

:::note
The Conductor installation must be completed before installing a router or routers using the OTP ISO.
:::
This same procedure may be used to install a router, or the procedure [Router Installation Using OTP](intro_otp_iso_install.mdx) can be used to install complex router configurations **after** installing and configuring the Conductor. 

## Prerequisites

- Ensure that the platform you are installing on meets the 128T hardware requirements.
- Verify that the boot priority of the USB drive is properly listed in the system BIOS.

## Installing the ISO

After imaging the ISO onto removable media, insert it into the target machine and power it on.

### Choose the Installation Type

Upon boot, the following screen is displayed. Not all hardware has video support, so booting to the serial console is the default. 

To install using the Interactive Installation, use the arrow keys to select either `Install 128T Routing Software Serial Console` or `Install 128T Routing Software VGA Console`. As noted earlier, this guide describes the installation process using the Interactive Installation, specifically using the VGA console. The process for a Conductor or a Router is the same. 

![VGA Boot with Interactive Install](/img/install_select_interactive.png)

Differences for the serial console are described in [Serial Console Installation Information](#serial-console-installation-information). 

To perform the installation using the OTP Installation, use the arrow keys to select either `OTP Install 128T Routing Software Serial Console` or `OTP Install 128T Routing Software VGA Console`. The OTP Installation for the serial or VGA console is described in the section [Router Installation Using OTP](intro_otp_iso_install.mdx).

:::note
Not all hardware has video support. Booting to the serial console is the default, and is automatically selected after 30 seconds. When using the serial console, the terminal size is 80x25 - anything smaller may result in abnormal navigation behavior.

Selecting the wrong type of console (Serial or VGA) may result in garbled characters being displayed, and if left to continue will result in an incorrect installation. If the wrong console is selected, reboot the target system and select the correct line for the target hardware.
::: 

The procedure that follows here is the Interactive Install on the VGA Console.

#### 128T System via Serial Console

Use this option when running on hardware with no video chipset. It uses `/dev/ttyS0` as the serial console for interacting with the installer. For serial console issues please refer to [Serial Console Troubleshooting](#serial-console-troubleshooting).

#### 128T System with VGA Console

Use this option when running on hardware that has onboard graphics chipsets. This installs 128T using the GUI installer.

### 128T Installation

After the Linux installation completes, the 128T software installation begins. Note that this may take several minutes to complete. After the installation has completed, the following screen is displayed:

![Installation Complete](/img/intro_installation_bootable_media_install_complete.png)

Shut down the system and remove the bootable media. Then power the system up to complete the installation process. 

- GUI login via HTTPS is enabled by default on port 443.

- The following user accounts and passwords are created during the ISO installation process:

   | Username | Password   | Access Scope |
   | -------- | ---------- | ------------ |
   | root     | 128tRoutes | Linux account |
   | t128     | 128tRoutes | Linux account |
   | admin | 128Tadmin | 128T PCLI admin account - see note below |
 
   It is *strongly recommended* that you change these passwords immediately.

  :::note
  The admin default password is only created during the OTP installation. There is no admin defaut for an interactive installation.
  :::

## Initial Boot and NMTUI

When the system boots from the `Install 128T Routing Software...` Interactive Installation work flow, the system asks whether to configure initial Linux Networking before the 128T Initializer is started.

Selecting `Yes` launches the CentOS NMTUI application to perform an initial network interface setup.

Refer to the NMTUI user documentation for more details.

## Initialize the 128T Node

The 128T Initializer tunes your operating system, prepares the platform to run the 128T software, and creates the bootstrapping files necessary to load the software. The Initializer is launched on first boot for the `Install 128T Routing Software...` installation options.

If you are installing a highly available Conductor on the cloud, please refer to [Conductor High Availability for Cloud Deployments](intro_initialize_HA_conductor.md).

1. On the 128T Initializer wizard screen, use the space bar to select either a **Router** or **Conductor **role for the 128T node and press the **Enter** key to select **OK**.

  ![128T Role](/img/initializer_Serial2.png)

2. For 128T routers, you will be prompted for the IP address(es) of your 128T conductor(s). If you have conductors, enter the administrative addresses and the node will retrieve the configuration from the conductor. If you have only one conductor (i.e., a standalone conductor), leave the field labeled 2nd Conductor Address blank. If you have no conductors, choose **Skip**.
3. When asked _What kind of Router/Conductor node is this?_, select from the following options:

  ![Identify the Node](/img/initializer_Serial3.png)

- **Standalone:** This router/conductor has no highly available peer, and is not currently planned for high availability.

- **1st HA Node:** This router/conductor is the first node of a high availability pair. You will be prompted to provide the local IP address for this node. The 2nd HA node will contact this node at the address provided to synchronize state. Note: The 1st Node IP address must be reachable by the 2nd HA Node.
  
- **2nd HA Node:** This router/conductor is the second node of a high availability pair, where the first node has been initialized. You will be prompted to provide the 1st Node IP address for this 2nd node that will be used to synchronize state. Note: The 2nd Node IP address must be reachable by the 1st HA Node.

4. The following steps configure a high availability conductor node. If you are not configuring HA, you will be presented with the **Node Info** screen in step 4b. 

  a). Enter the IP address of the local HA sync interface. 

    ![High Availability IP Address](/img/initializer_Serial3HAIP.png)

  b). Enter the following system properties on the **Node Info** screen:

    ![Node Information](/img/initializer_Serial5.png)

    - **Node Name:** The name of the system within your 128T Router or Conductor, for example, _conductor_. By default this field uses the Linux system's hostname.

    :::note
    Both routers and conductors can consist of one node (for standalone systems) or two nodes (for highly available systems).
    :::
    - **Router/Conductor Name:** The name of the Router or Conductor system as a whole. When referring to a running 128T software instance, it is identifiable by the full name of `nodeName.routerName`; e.g., `conductor-node1.conductor`. The full system name is reflected in the PCLI prompt as discussed in the Document Conventions section of this document.

5. On the **Password Setup** screen, create a password for the 128T Admin user. The administrator password must be at least 8 characters long, contain at least 1 uppercase letter, at least 1 lowercase letter, at least 1 number, and cannot repeat characters more than 3 times. This operation is only performed on the standalone or first node in the HA peer.
  :::note
  Resetting a password requires entering the old password. If a password is lost or forgotten and the account is inaccessible, the account cannot be recovered. Please keep password records accessible and secure. 
  :::

  ![Password Setup](/img/initializer_Serial6.png)

6. Press the **Enter** key to select **OK**. The Initializer performs a hardware compatibility check. The compatibility check may fail due to warnings or failure notices, which are displayed in the output script. If no failures are present, you can choose to continue with the installation even if multiple warnings exist. For information on why a specific test may have failed or generated a warning, contact 128T technical support.

7. When prompted, either reboot your system or start 128T.

  ![Initializer Complete](/img/initializer_complete.png)

  :::note
  If installing the 128T software for the first time, a system reboot is required.
  :::

### Install a Second HA Node for the Conductor

If there is a second node for Conductor HA, install the system using the same process beginning with [Installing the ISO](intro_installation_bootable_media.md#installing-the-iso) and ending at [Initialize 128T](intro_installation_bootable_media.md#initialize-the-128t-node) step 2. From step 2, perform the following:

1. When prompted for `What kind of Conductor node is this?` Select the **2nd HA Node**.

  ![2nd HA Node Setup](/img/initializer_Serial4cHANode.png)

2. Enter the **HA Address** and **Peer HA Address** for the second node. The HA Address is the local 2nd HA Node IP address, and the Peer HA Address is the 1st HA Node IP address.

  ![2nd HA Peer IP](/img/initializer_Serial4dHANode.png)

3. Enter the **HA Peer Credentials**. This is a one time operation for the initialization of the second HA Node with the first HA Peer. The `t128` user can be used for this operation.

  ![HA Peer Credentials](/img/initializer_Serial4eHAPeer.png)

4. Press the **Enter** key to select **OK**. The Initializer performs a hardware compatibility check. The compatibility check may fail due to warnings or failure notices, which are displayed in the output script. If no **failures** are present, you can choose to continue with the installation even if multiple warnings exist. For information about why a specific test may have failed or generated a warning, contact 128T technical support.

5. After the initialization process completes the setup, the following screen displays. Use the Enter key to select `Got it!`

  ![Peer Restart](/img/initializer_Serial7.png)

6. The Installer Status screen indicates success. Use the spacebar to either reboot your system or start 128T.

  ![Initializer Complete](/img/initializer_complete.png)

  :::note
  If installing the 128T software for a router, a system reboot may be required.
  :::

## Verify Installation

After installing the 128T Software it is important to verify that the installation was completed successfully.

### To Verify the 128T Installation:

1. Launch a command prompt window.

2. Execute the command:

   ```
   sudo systemctl status 128T
   ```

   **Result:** The service is listed as _Active (running)_.

   If the service is listed as _Inactive_, run the `sudo systemctl start 128T` command. This may take several minutes to fully launch the service.

3. Once the service is listed as _Active_, log into the system as Admin using the system default password.

   **Result:** The installation is verified.

4. Close the command prompt window. 

## Serial Console Installation Information

Please note that Legacy and UEFI consoles display differently. The following is the  installation screen when booting to a Legacy console:

![Boot Screen](/img/intro_install_LegacyInstall.png)

The following is the  installation screen when booting to a UEFI console:

![New Boot Screen](/img/intro_install_OTPInstall_1.png)

### Serial Console Troubleshooting

- When performing an installation via the serial console, some systems do not interpret control characters that may be passed on the serial console line. For example, the following may be seen during the installation process:

  ![Corrupt Serial Install Complete](/img/install_serial_corrupt.png)

  In cases where the screen output becomes unreadable, use the following procedure. 
  - Type: `^a` (Ctrl-a)
  - Type: `k`
  - Type: `y` [for yes to exist screen]
  - Reconnect with screen (i.e., Screen command could be `screen /dev/tty.usbserial-1430 115200`).
  - Type: `^l` (Ctrl-l) (lower case L) to repaint the screen. 

  ![Resolved Serial Install Complete](/img/install_serial_resolved.png)

  :::note
  Repaint does not work on the initial boot screen when imaging a system. If the serial console is disconnected, it is recommended to restart the system and begin the imaging process again.
  :::

  Repeat these steps if the screen becomes unreadable at any time during the initialization process. 


