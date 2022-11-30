---
title: Router Interactive Installation
sidebar_label: Router Interactive Installation
---

This procedure assumes you have already created a bootable device, either a USB or CD/DVD/Blueray disk. Instructions for downloading and creating a bootable device are available in [Downloading an SSR ISO](intro_downloading_iso.md) and [Creating a Bootable USB](intro_creating_bootable_usb.md).

The steps in this section describe the interactive installation from the ISO. The section [Initialize the SSR](#initialize-the-ssr-node) describes using the Initializer to configure the system after installing from the Interactive ISO. 

:::note
The [Conductor](single_conductor_install.md) installation must be completed before installing a router or routers using the OTP ISO.
:::
This procedure may be used to install a router, or the procedure [Router Installation Using OTP](intro_otp_iso_install.mdx) can be used to install complex router configurations **after** installing the Conductor. 

## Prerequisites

- Ensure that the platform you are installing on meets the [SSR hardware requirements](about_supported_platforms.md#minimum-platform-specifications).
- Verify that the boot priority of the USB drive is properly listed in the system BIOS.
- Local console connectivity to the device/VM. 

## Installing the ISO

After imaging the ISO onto removable media, insert it into the target machine and power it on.

### Choose the Installation Type

Upon boot, the following screen is displayed. Not all hardware has video support, so booting to the serial console (115200 baud) is the default. 

To install using the Interactive Installation, use the arrow keys to select either `Install 128T Routing Software Serial Console` or `Install 128T Routing Software VGA Console`. As noted earlier, this guide describes the installation process using the Interactive Installation, specifically using the VGA console. 

![VGA Boot with Interactive Install](/img/install_select_interactive.png)

Differences for the serial console are described in [Serial Console Installation Information](#serial-console-installation-information). 

To perform the installation using the OTP Installation, use the arrow keys to select either `OTP Install 128T Routing Software Serial Console` or `OTP Install 128T Routing Software VGA Console`. The OTP Installation for the serial or VGA console is described in the section [Router Installation Using OTP](intro_otp_iso_install.mdx).

:::note
Not all hardware has video support. Booting to the serial console 115200 baud is the default, and is automatically selected after 30 seconds. When using the serial console, the terminal size is 80x25 - anything smaller may result in abnormal navigation behavior.

Selecting the wrong type of console (Serial or VGA) may result in garbled characters being displayed, and if left to continue will result in an incorrect installation. If the wrong console is selected, reboot the target system and select the correct line for the target hardware.
::: 

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

The procedure that follows here is the Interactive Install on the VGA Console.

#### Install via Serial Console

Use this option when running on hardware with no video chipset. It uses `/dev/ttyS0` 115200 baud as the serial console for interacting with the installer. For serial console issues please refer to [Serial Console Troubleshooting](#serial-console-troubleshooting).

#### Install via VGA Console

Use this option when running on hardware that has onboard graphics chipsets. This installs SSR software using the GUI installer.

### SSR Installation

After the Linux installation completes, the SSR software installation begins. Note that this may take several minutes to complete. After the installation has completed, the following screen is displayed:

![Installation Complete](/img/intro_installation_bootable_media_install_complete.png)

Shut down the system and remove the bootable media. Then power the system up to complete the installation process. 

## Initial Boot and NMTUI

When the system boots from the `Install 128T Routing Software...` Interactive Installation work flow, the system asks whether to configure initial Linux Networking before the SSR Initializer is started.

![128T NetManager TUI Start](/img/Initializer_Serial0.png)

Selecting `Yes` launches the CentOS NMTUI application to perform an initial network interface setup.

![128T NetManager TUI Option](/img/Initializer_Serial1.png)

Refer to the NMTUI user documentation for more details.

## Initialize the SSR Node

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

7. When prompted, either reboot your system or start SSR.

  ![Initializer Complete](/img/initializer_complete.png)

  :::note
  If installing the SSR software for the first time, a system reboot is required.
  :::

## Verify Installation

After installing the SSR Software it is important to verify that the installation was completed successfully.

### To Verify the SSR Installation:

1. Launch a command prompt window.

2. Execute the command:

   ```
   sudo systemctl status 128T
   ```

   **Result:** The service is listed as _Active (running)_.

   If the service is listed as _Inactive_, run the `sudo systemctl start 128T` command. This may take several minutes to fully launch the service.

3. Once the service is listed as _Active_, log into the system as Admin using the system default password.

   **Result:** The installation is verified.

4. Close the command prompt window. 

## Serial Console Installation Information

Please note that Legacy and UEFI consoles display differently. The following is the  installation screen when booting to a Legacy console:

![Boot Screen](/img/intro_install_LegacyInstall.png)

The following is the  installation screen when booting to a UEFI console:

![New Boot Screen](/img/intro_install_OTPInstall_1.png)

### Serial Console Troubleshooting

- Default baud rate for serial console access is 115200/8-n-1
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


