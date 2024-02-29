---
title: Router Interactive Installation
sidebar_label: Router Interactive Installation 
--- 

This process assumes you have already created a bootable device using a USB. Instructions for downloading and creating a bootable device are available in [Downloading an SSR ISO](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/intro_downloading_iso) and [Creating a Bootable USB](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/intro_creating_bootable_usb).

Router installation can be performed using either the Interactive Installation, or the OTP process. The steps in this section describes the Interactive Installation.

:::note
The Conductor installation must be completed before installing a Session Smart Router or routers using the ISO. The same ISO is used for both installations.
:::

## Prerequisites

- Ensure that the platform you are installing on is an approved Common Criteria platform:
    - SSR 120, SSR 130
    - SSR 1200, SSR 1300, SSR 1400, SSR 1500
- Verify that the boot priority of the USB drive is properly listed in the system BIOS.
- Local console connectivity to the device. 

## Installation

### Connect the SSR to a Management Console

Ensure that you have an appropriate rollover cable available to connect to you computer. The SSR has a console port (CONSOLE) with an RJ-45 connector. Use the console port to connect the appliance to a management console or to a console server. The default baud rate of the console port is 115200 bps.

1. Connect the RJ45 rollover cable to the console port on the SSR device.
2. Connect the other end of the cable to your computer.
3. Insert your USB with the new ISO image into the USB port of the SSR device.
4. Connect the power input to the SSR device
5. Power on the SSR. 

### Booting from the USB

Use the steps appropriate for your device to direct the device to boot from the USB for installation. 

#### SSR100 Series Devices

1. At the instruction in the terminal window: `Press ESC for boot menu`, do so. 

 ![Boot Menu prompt](/img/onboard_otp_boot_menu.png)

2. From the boot menu, enter the boot device number corresponding to the USB, and press Enter. 

 ![Select Boot Device](/img/onboard_otp_boot_device.png)

3. When the USB installer boot menu is displayed, continue with the [Router Installation](#router-installation).

#### SSR1000 Series Devices

1. At the instruction in the terminal window: `Press <Tab> or <DEL> to enter Setup`, do so.

 ![Setup Menu Prompt](/img/1x00_setup_menu.png)

2. When the Setup Utility window appears, use the left and right arrow keys to navigate to the `Save & Exit` tab.

 ![Setup Utility](/img/setup-menu-prompt.png)

3. Use the up and down arrow keys to highlight the USB device in the the Boot Override list.

 ![Boot Override list](/img/1x00_boot-override.png)

4. Press Enter to confirm boot from the USB device.
5. When the USB installer boot menu is displayed, continue with the [Router Installation](#router-installation).

### Router Installation

Upon boot, the following screen is displayed. The default selection is booting to the serial console (115200 baud). You must manually choose the installation process suited for your environment.

1. Use the Up/Down keys to select the `Install 128T Routing Software Serial Console` option. This is the supported installation option for Common Criteria. It uses `/dev/ttyS0` 115200 baud as the serial console for interacting with the installer.

  ![Select Serial Install](/img/cc_fips_serial_install1.png)

  Selecting the wrong type of console (Serial or VGA) may result in garbled characters being displayed. If allowed to continue it will result in an incorrect installation. If the wrong console is selected, reboot the target system and select the correct line for the target hardware.

  For serial console issues please refer to [Serial Console Troubleshooting](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/ts_serial_console_tsing).

2. Press the TAB key to edit the configuration.

  To enable FIPS Enforcement for SSR software version 6.2.3-14R2, add the `fips=1` kernel option  to the kernel command line during system installation as shown in the steps below. This ensures that key generation is done with FIPS approved algorithms and continuous monitoring tests in place.

  :::important
  FIPS mode is required for Common Criteria compliance. Failure to configure FIPS mode, or the use of any other cryptographic engine nullifies compliance.
  :::

3. Add `fips=1` to the end of the `vmlinuz` parameters.

  ![FIPS Parameter](/img/cc_fips_serial_install2.png)

4. Press **Enter** to start the install. 

After the Linux installation completes, the SSR software installation begins. Note that this may take several minutes to complete (up to 40 minutes). After the installation has completed, the following screen is displayed:

![Installation Complete](/img/intro_installation_bootable_media_install_complete.png)

Select `<Yes>` to shut down the system. Remove the bootable media, then power the system up to complete the installation process. 

### Initial Boot and Management Network Configuration

When the system boots from the `Install 128T Routing Software...` Interactive Installation work flow, the system asks whether to configure initial Linux Networking before the SSR Initializer is started.

![128T NetManager TUI Start](/img/Initializer_Serial0.png)

Selecting `Yes` launches the NMTUI application to perform an initial network interface setup.

![128T NetManager TUI Option](/img/Initializer_Serial1.png)

### Initialize the SSR Node

The SSR Initializer tunes your operating system, prepares the platform to run the SSR software, and creates the bootstrapping files necessary to load the software. The Initializer is launched on first boot.

1. On the SSR Initializer wizard screen, use the space bar to select the **Router** role for the SSR node and press the **Enter** key to select **OK**.

  ![SSR Role](/img/initializer_Serial2a.png)

2. For SSR routers, you will be prompted for the IP address(es) of the conductor. If you have a conductor, enter the administrative IP address and the node will retrieve the configuration from the conductor. If you have only one conductor (i.e., a standalone conductor), leave the field labeled 2nd Conductor Address blank. If you have no conductors, choose **Skip**.

 ![Conductor Info](/img/cc_fips_router_install_ip.png)

3. On the **Password Setup** screen, create a password for the SSR Admin user. The administrator password must be at least 9 characters long, contain at least 1 uppercase letter, at least 1 lowercase letter, at least 1 number, cannot contain the username in any form, and cannot repeat characters more than 3 times. This operation is only performed on the standalone or first node in the HA peer.
  :::note
  Resetting a password requires entering the old password. If a password is lost or forgotten and the account is inaccessible, the account cannot be recovered. Please keep password records accessible and secure. 
  :::

  ![Password Setup](/img/initializer_Serial6.png)

4. Press the **Enter** key to select **OK**. The Initializer performs a hardware compatibility check. The compatibility check may fail due to warnings or failure notices, which are displayed in the output script. If no failures are present, you can choose to continue with the installation even if multiple warnings exist. For information on why a specific test may have failed or generated a warning, contact Juniper Technical Support.

5. When prompted, select Yes to start the SSR.

  ![Initializer Complete](/img/initializer_complete.png)

  :::note
  A system reboot is required.
  :::

### Change the Default Passwords after Installation

The following user accounts and passwords are created during the ISO installation process:

| Username | Password   |
| -------- | ---------- |
| root     | 128tRoutes |
| t128     | 128tRoutes |

Change these passwords immediately. Use the `passwd` command from the Linux shell.

```
[t128@test-router ~]$ passwd
Changing password for user t128
Changing password for t128
(current)UNIX password:
New password:
Retype new password: 
passwd: all authentication tokens updated successfully.
[t128@test-router ~]$ su - 
Password:
[root@test-router ~]# passwd
Changing password for user root.
New password:
Retype new password: 
passwd: all authentication tokens updated successfully.
[root@test-router ~]#
```

### PCLI Access Post Install

Use the following procedure to access the PCLI at any time after installation. 

1. Open a terminal window and ssh to the conductor's IP address. 
2. Use your login credentials to log in to the conductor, and run the `pcli` command to start the SSR PCLI. 

Common Criteria certification does not require any restrictions on executing commands. See the [Configuration Command Reference Guide](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/config_command_guide) for command information and usage.

