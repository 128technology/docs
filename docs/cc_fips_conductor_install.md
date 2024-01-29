---
title: Conductor Installation
sidebar_label: Conductor Installation 
---

This process assumes you have already created a bootable device using a USB. Instructions for downloading and creating a bootable device are available in [Downloading an SSR ISO](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/intro_downloading_iso.md) and [Creating a Bootable USB](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/intro_creating_bootable_usb.md).

The steps in this section describe the interactive conductor installation from the packaged-based ISO, using the serial console. The section [Initialize the Conductor](#initialize-the-conductor-node) describes using the Initializer to configure the system as a Conductor after installing from the interactive installation.

:::note
The Conductor installation must be completed before installing a Session Smart Router or routers using the ISO. The same ISO is used for both installations.
:::

## Prerequisites

- Ensure that the platform you are installing on meets the [SSR hardware requirements](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/about_supported_platforms.md#minimum-platform-specifications).
- Verify that the boot priority of the USB drive is properly listed in the system BIOS.
- Local console connectivity to the device/VM. 

## Installation

After imaging the ISO onto removable media, connect a computer to the SSR, then insert the imaged drive into the SSR device and power it on.

### Connect the SSR to a Management Console

Ensure that you have an RJ-45 to DB-9 rollover cable available. The SSR has a console port (CONSOLE) with an RJ-45 connector. Use the console port to connect the appliance to a management console or to a console server. The default baud rate of the console port is 115200 bps.

:::note
If your laptop or PC does not have a DB-9 pin contact and you want to connect your laptop or PC directly to the SSR130, use a combination of the RJ-45 cable, an RJ-45 to DB-9 adapter, and a USB to DB-9 plug adapter. 
:::

1. Connect one end of the Ethernet cable to the console port (labeled CONSOLE).

2. Connect the other end of the Ethernet cable into the console server or management console.

**Open an SSH console. When do we do this? What do we do next to be SECURE?**

3. Power on the SSR. Upon boot, the following screen is displayed. The default selection is booting to the serial console (115200 baud). You must manually choose the installation process suited for your environment.

4. Use the Up/Down keys to select the `Install 128T Routing Software Serial Console` option. This is the supported installation option for Common Criteria. It uses `/dev/ttyS0` 115200 baud as the serial console for interacting with the installer.

  ![Select Serial Install](/img/cc_fips_serial_install1.png)

  Selecting the wrong type of console (Serial or VGA) may result in garbled characters being displayed. If allowed to continue it will result in an incorrect installation. If the wrong console is selected, reboot the target system and select the correct line for the target hardware.

  For serial console issues please refer to [Serial Console Troubleshooting](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/ts_serial_console_tsing.md).

5. Press the TAB key to edit the configuration.

  To enable FIPS Enforcement for SSR software version 6.2.3-14R2, add the `fips=1` kernel option  to the kernel command line during system installation as shown in the steps below. This ensures that key generation is done with FIPS approved algorithms and continuous monitoring tests in place.

6. Add `fips=1` to the end of the `vmlinuz` parameters.

  ![FIPS Parameter](/img/cc_fips_serial_install2.png)

7. Press **Enter** to start the install. 

After the Linux installation completes, the SSR software installation begins. Note that this may take several minutes to complete (up to 40 minutes). After the process has completed, the following screen is displayed:

![Installation Complete](/img/intro_installation_bootable_media_install_complete.png)

Select `<Yes>` to shut down the system. Remove the bootable media, then power the system up to complete the installation process. 

### Initial Boot and NMTUI

When the system boots from the `Install 128T Routing Software...` Interactive Installation work flow, the system asks whether to configure initial Linux Networking before the SSR Initializer is started.

![128T NetManager TUI Start](/img/Initializer_Serial0.png)

Selecting `Yes` launches the NMTUI application to perform an initial network interface setup.

![128T NetManager TUI Option](/img/Initializer_Serial1.png)

### Configure the Network Interface 

Configure the IP address that will be used to manage the network routers.  

1. Select the device ethernet interface that corresponds to the management port for your Conductor and select `<Edit>`

<img src="/img/nmtui-linux-a.png" alt="Configure the Ethernet port" width="192" height="243" />

2. In the Edit Connection screen, configure the following:
- The IP address for the port
- the Gateway IP address
- DNS server addresses

<img src="/img/nmtui-linux-b-static-ipv4-config.png" alt="Edit Connection" width="654" height="394" />

3. Scroll to the bottom of the screen and select `Automatically Connect` and `Available to All Users`, then select OK. 

<img src="/img/nmtui-linux-c-static-ipv4-autoconx.png" alt="Edit Connection" width="654" height="394" />

4. From the NMTUI screen, select `Set system hostname`, and `<OK>`.

<img src="/img/nmtui-linux-set-hostname.png" alt="Select Hostname" width="354" height="381" />

5. Enter the hostname and select `<OK>`. Note that the hostname will be used as the Asset ID.

<img src="/img/nmtui-linux-set-hostname2.png" alt="Add Hostname" width="354" height="381" />

6. From the NMTUI screen, select `Activate a connection`, and `<OK>`.

7. Select the port, and `<Activate>`. 

<img src="/img/nmtui-linux-activate-port.png" alt="Activate port" width="379" height="378" />

 When the port has been activated, an asterisk will appear next to the port name.

```
Ethernet (enp2s0f0)
* enp2s0f0
```
8. Select `<Back>` and then `<Quit>` NMTUI.

The Initializer process starts automatically.

### Initialize the Conductor Node

The SSR Initializer tunes your operating system, prepares the platform to run the SSR software, and creates the bootstrapping files necessary to load the software. The Initializer is launched on first boot.

There are two different types of conductor installations supported; 
- Standalone Conductor 
- [Conductor High Availability](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/ha_conductor_install.mdx)
Conductor High Availability for Cloud Deployments is not supported under Common Criteria.

## Standalone Conductor

1. On the SSR Initializer wizard screen, use the space bar to select the **Conductor** role for the SSR node, and press the **Enter** key to select **OK**.

  ![SSR Role](/img/initializer_Serial2.png)

2. When asked _What kind of Conductor node is this?_, select **Standalone** from the following options:

  ![Identify the Node](/img/initializer_standalone.png)

- **Standalone:** This conductor has no highly available peer, and is not currently planned for high availability.

3. Enter the following system properties on the **Node Info** screen:

    ![Node Information](/img/initializer_Serial5a.png)

    - **Node Name:** The name of the system within your Conductor, in this example, _test-conductor_. By default this field uses the Linux system's hostname. The node name identifies the conductor node under the **Conductor** element in the Authority. 

    :::note
    Both routers and conductors can consist of one node (for standalone systems) or two nodes (for highly available systems).
    :::
    - **Conductor Name:** The name of the Conductor system as a whole. When referring to a running SSR software instance, it is identifiable by the full name; e.g., `test-conductor.conductor`. The full system name is reflected in the PCLI prompt.

4. On the **Password Setup** screen, create a password for the SSR Admin user. The administrator password must be at least 8 characters long, contain at least 1 uppercase letter, at least 1 lowercase letter, at least 1 number, cannot contain the username in any form, and cannot repeat characters more than 3 times. This operation is only performed on the standalone or first node in the HA peer, and the password must be entered twice. 
  :::note
  Resetting a password requires entering the old password. If a password is lost or forgotten and the account is inaccessible, the account cannot be recovered. Please keep password records accessible and secure. 
  :::

  ![Password Setup](/img/initializer_Serial6.png)

5. Press the **Enter** key to select **OK**. The Initializer performs a hardware compatibility check. The compatibility check may fail due to warnings or failure notices, which are displayed in the output script. If no failures are present, you can choose to continue with the installation even if multiple warnings exist. For information on why a specific test may have failed or generated a warning, contact Juniper Technical Support.

6. When prompted, select `<Yes>` to start the conductor. 

  ![Initializer Complete](/img/initializer_complete.png)

### Verify the Installation

After installing the SSR Software it is important to verify that the installation was completed successfully.

### To Verify the SSR Installation:

After starting the Conductor, the login screen appears. 

1. Login using the admin credentials.

```
test-conductor login: admin
Password:
```
  ![Conductor Admin Login](/img/conductor_install1.png)

2. Enter the Linux shell:

  a. Type `exit` to exit the PCLI.

  b. Type `shell` and press `Enter` to enter the linux shell.

3. Log into the command window as `root`.
4. Execute the command: `sudo systemctl status 128T`

![Linux Shell](/img/conductor_install2.png)

5. When the service is listed as _Active_, log into the system using the system default password. By logging into the system, you have verified the installation. 

### Change the Default Passwords

The following user accounts and passwords are created during the ISO installation process:

| Username | Password   |
| -------- | ---------- |
| root     | 128tRoutes |
| t128     | 128tRoutes |

Change these passwords immediately. Use the `passwd` command from the UNIX window.

```
[t128@test-conductor ~]$ passwd
Changing password for user t128
Changing password for t128
(current)UNIX password:
New password:
Retype new password: 
passwd: all authentication tokens updated successfully.
[t128@test-conductor ~]$ su - 
Password:
[root@test-conductor ~]# passwd
Changing password for user root.
New password:
Retype new password: 
passwd: all authentication tokens updated successfully.
[root@test-conductor ~]#
```

### Configure the Token

Once the system has been setup for the first time, the next step is to provision credentials for SSR software access on the conductor. Provisioning the software credentials on the conductor propagates those settings down to all of the managed routers.

Use the PCLI command `set software access-token`. For information on this command, see [`set software access-token`](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/cli_reference.md#set-software-access-token).

From the root user in the workflow above, run the `pcli` command to access the PCLI and configure the token.

```
[root@test-conductor ~]# pcli
Starting the PCLI...
root@node1.test-conductor# set software access-token <username> <password>
Saving...
Waiting for process to complete
...(messages removed for brevity)...
Making the DNF cache
No further operation requested. Exiting
Installer complete
Successfully saved credentials.
root@node1.test-conductor#
```

## Next Steps - Router Configuration

Congratulations, you have successfully installed and configured a conductor! The next step is to optimize the router onboarding process. 

Creating router configurations on the conductor allows individual routers to download the necessary configuration to get up and running smoothly. 

If you will be using the OTP Quickstart router installation process, use the conductor GUI to generate a basic configuration and quickstart file for router installation. When configuring and installing a router in an environment operating under the Common Criteria guidelines, it is acceptable to provision this file using the GUI. Other uses of the SSR GUI are not supported under the Common Criteria guidelines.

Instructions for generating the quickstart file are found at [QuickStart From the OTP ISO](cc_fips_install_quickstart_otpiso.md)

If you are installing routers using the Interactive Installation, continue with [Router Installation](cc_fips_router_install.md).

To see an example router configuration, refer to the [Appendix](cc_fips_appendix.md).













