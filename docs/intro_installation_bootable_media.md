---
title: Installing the Interacive ISO From Bootable Media
sidebar_label: Installing the Interacive ISO from Bootable Media
---

This section assumes you have already created a bootable device, either a USB or CD/DVD/Blueray disk. Instructions for downloading and creating a bootable device are available in [Downloading a 128T ISO](intro_downloading_iso.md) and [Creating a Bootable USB](intro_creating_bootable_usb.md).

The following steps to install using the Interactive ISO provide the option to configure the system as either a Router or a Conductor. This section describes how to configure the 128T as a Conductor. To install complex router configurations, use the [One-Touch Provisioning (OTP) ISO](intro_installation_otp_iso.md).

### Prerequisites

- Ensure that the platform you are installing on meets the 128T hardware requirements.
- Verify that the boot priority of the USB drive is properly listed in the system BIOS.

### Installing the Interactive ISO

After imaging the ISO onto removable media, insert it into the target machine and power it on.

#### Choose the Installation Type

Upon boot, you are prompted with the following screen for the Linux installation:

![Boot Screen](/img/intro_installation_bootable_media_boot.png)

:::note
Not all hardware has video support, therefore booting to console is the default (a console user may not be able to select an option). The default option is selected after a 30 second timeout.
::: 

##### 128T Router via Serial Console

Use this option when running on hardware with no video chipset. It uses `/dev/ttyS0` as the serial console for interacting with the installer.

:::note
Selecting the wrong type of console may result in garbage characters being displayed and the install hanging. If this is the case, reboot the target system and select the correct line for the target hardware.
::: 

##### 128T Router with VGA Console

Use this option when running on hardware that has onboard graphics chipsets. This installs 128T using the GUI installer.

#### 128T Installation

After the Linux installation completes, the 128T software installation begins. Note that this may take several minutes to complete. After the installation has completed, the following screen is displayed:

![Installation Complete](/img/intro_installation_bootable_media_install_complete.png)

After shutting down the system and removing the bootable media, power the system to complete the installation process using the Initializer. 

### Installation Notes

1. The following user accounts and passwords are created during the ISO installation process:

   | Username | Password   |
   | -------- | ---------- |
   | root     | 128tRoutes |
   | t128     | 128tRoutes |

   It is *strongly recommended* that you change these passwords immediately.

2. GUI login via HTTPS is enabled by default on port 443.

### Initialize the 128T Node

The 128T Initializer tunes your operating system, prepares the platform to run the 128T software, and creates the bootstrapping files necessary to load the software. The Initializer is launched after the installation reboot.

#### Initialize the 128T Node:

1. On the 128T Initializer wizard screen, use the space bar to select either a **Router** or **Conductor **role for the 128T node and press the **Enter** key to select **OK**.
2. For 128T routers, you will be prompted for the IP address(es) of your 128T conductor(s). If you have conductors, Enter their administrative addresses here, and this node will retrieve its configuration from the conductor. If you have only one conductor (i.e., a standalone conductor), leave the field labeled 2nd Conductor Address blank. If you have no conductors, choose **Skip**.
3. When asked _What kind of Router node is this?_, select from the following options:

- **Standalone:** This router has no highly available peer, and is not currently planned for high availability.
- **1st HA Node:** This router is the first node of a high availability pair. You will be prompted for the High Availability address of this node. Note: The address _must_ be reachable by the 2nd HA Node.
- **2nd HA Node:** This router is the second node of a high availability pair, where the first node has been initialized. You will be prompted for the High Availability address of the first node.

4. Enter the following system properties on the Node Info screen:

- **Node Name:** The unique name of the system within your 128T Router or Conductor, for example _labsystem1_. By default this field uses the Linux system's hostname.
  :::note
  Both routers and conductors can consist of one node (for standalone systems) or two nodes (for highly available systems).
  :::
- **Router/Conductor Name:** The name of the Router or Conductor system as a whole. When referring to a running 128T software instance, it is identifiable by the full name of `nodeName.routerName`; e.g., `labsystem1.boston`. The full system name is reflected in the PCLI prompt as discussed in the Document Conventions section of this document.

5. The **Advanced** button allows you to specify the number of CPU cores to be allocated for running your 128T routing software.
   :::info
   This is only recommended for experienced users. This setting is intended to optimize the forwarding capabilites of the 128T platform beyond the default settings for the target platform.
   :::

6. On the **Password Setup** screen, create a password for the 128T Admin user. The administrator password must be at least 8 characters long, contain at least 1 uppercase letter, at least 1 lowercase letter, at least 1 number, and cannot repeat characters more than 3 times.

7. On the **Anonymous Data Collection** screen, select either **Accept** or **Disable** to enable or disable the RoadRunner process that measures the health of your 128T router and components.

8. Press the **Enter** key to select **OK**. The Initializer performs a hardware compatibility check. The compatibility check may fail due to warnings or failure notices, which are displayed in the output script. If no failures are present, you can choose to continue with the installation even if multiple warnings exist. For information on why a specific test may have failed or generated a warning, contact 128T technical support.

9. When prompted, either reboot your system or start 128T.
   :::note
   If installing the 128T software for the first time, a system reboot is required.
   :::

### Verify Installation

After installing the 128T Routing Software it is important to verify that the installation was completed successfully.

#### To Verify the 128T Installation:

1. Launch a command prompt window.

2. Execute the command:

   ```
   sudo systemctl status 128T
   ```

   **Result:** The service is listed as _Active (running)_.<br/>If the service is listed as _Inactive_, run the `sudo systemctl start 128T` command. This may take several minutes to fully launch the service.

3. Once the service is listed as _Active_, log into the system as Admin using the system default password.<br/>**Result:** The installation is verified.

4. Close the command prompt window. 




