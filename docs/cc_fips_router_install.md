---
title: Router Installation
sidebar_label: Router Installation 
--- 

This process assumes you have already created a bootable device using a USB. Instructions for downloading and creating a bootable device are available in [Downloading an SSR ISO](intro_downloading_iso.md) and [Creating a Bootable USB](intro_creating_bootable_usb.md).

Router installation can be performed using either the Interactive Installation, or the OTP process. The steps in this section describes both methods.

:::note
The Conductor installation must be completed before installing a Session Smart Router or routers using the ISO. The same ISO is used for both installations.
:::

## Prerequisites

- Ensure that the platform you are installing on is an approved Common Criteria platform:
    - SSR 120, SSR 130
    - SSR 1200, SSR 1300, SSR 1400, SSR 1500
- Verify that the boot priority of the USB drive is properly listed in the system BIOS.
- Local console connectivity to the device/VM. 

## Installation

After imaging the ISO onto removable media, insert it into the SSR device and power it on.

Upon boot, the following screen is displayed. The default selection is booting to the serial console (115200 baud). You must manually choose the installation process suited for your environment.

1. Use the Up/Down keys to select the `Install 128T Routing Software Serial Console` option. This is the supported installation option for Common Criteria. It uses `/dev/ttyS0` 115200 baud as the serial console for interacting with the installer.

  ![Select Serial Install](/img/cc_fips_serial_install1.png)

  Selecting the wrong type of console (Serial or VGA) may result in garbled characters being displayed. If allowed to continue it will result in an incorrect installation. If the wrong console is selected, reboot the target system and select the correct line for the target hardware.

  For serial console issues please refer to [Serial Console Troubleshooting](ts_serial_console_tsing.md).

2. Press the TAB key to edit the configuration.

  To enable FIPS Enforcement for SSR software version 6.2.3-14R2, add the `fips=1` kernel option  to the kernel command line during system installation as shown in the steps below. This ensures that key generation is done with FIPS approved algorithms and continuous monitoring tests in place.

3. Add `fips=1` to the end of the `vmlinuz` parameters.

  ![FIPS Parameter](/img/cc_fips_serial_install2.png)

4. Press **Enter** to start the install. 

After the Linux installation completes, the SSR software installation begins. Note that this may take several minutes to complete (up to 40 minutes). After the installation has completed, the following screen is displayed:

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

  - **Node Name:** The name of the system within your SSR Router, for example, _boston_router_. By default this field uses the Linux system's hostname.

  :::note
  Routers can consist of one node (for standalone systems) or two nodes (for highly available systems).
    :::
  - **Router Name:** The name of the router system as a whole. When referring to a running SSR software instance, it is identifiable by the full name of `nodeName.routerName`; e.g., `boston_router-node1.router`. The full system name is reflected in the PCLI prompt as discussed in the Document Conventions section of this document.

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

## OTP Router Installation

The simplest deployment of the OTP solution is highly automated and leverages just two components, the Conductor and at least one SSR. For many customers, the SSR platform is ordered and delivered as a pre-integrated, off-the-shelf solution through the Juniper SSR partner network. An image leveraging QuickStart provisioning can also be deployed into a VM or cloud environment, though consideration must be made to the mechanism of injecting the file. Virtual environments may be better suited for cloud automation tools to assist in automated, dynamic deployment.

The OTP installation process produces a Router installed with SSR software set to factory defaults. Upon completing the OTP installation process, the default behavior is to provision the device to be configured with a DHCP client on the first ethernet port and DHCP server listening on all other ports. A user then connects to the SSR via ethernet cable and use the QuickStart file generated by the Conductor to finalize the SSR configuration. After performing the QuickStart operation, the SSR will have connectivity to its Conductor and can download the latest configuration (if necessary) and begin operation. These defaults [can be changed](#quickstart-location) to suit your needs.

### QuickStart Provisioning
Basic configuration parameters are encoded within an encrypted file. For each node, a custom file can be exported from the Conductor and minimally contains the following configuration encoded parameters:
- WAN IP address, subnet mask and gateway
- Conductor IP address
- Asset ID

### Before you Begin

Before beginning the Router installation, you must have a Conductor operationally deployed and reachable by the router.

This diagram is one possible topology for a standalone SSR deployed at the edge of the network.

![QuickStart network diagram](/img/intro_ztp_quickstart_network_diagram.png)

## Installation

Upon boot, the following screen is displayed. The default selection is booting to the serial console (115200 baud). You must manually choose the installation process suited for your environment.

1. Use the Up/Down keys to select the `OTP Install 128T Routing Software Serial Console` option. This is a supported installation option for Common Criteria. It uses `/dev/ttyS0` 115200 baud as the serial console for interacting with the installer. 

  ![Serial Install Selection](/img/cc_fips_otp_serial.png)

  Selecting the wrong type of console may result in garbled characters being displayed. If allowed to continue it will result in an incorrect installation. If the wrong console is selected, reboot the target system and select the correct line for the target hardware.

  For serial console issues please refer to [Serial Console Troubleshooting](ts_serial_console_tsing.md).

2. Press the TAB key to edit the configuration.

  To enable FIPS Enforcement for SSR software version 6.2.3-14R2, add the `fips=1` kernel option  to the kernel command line during system installation as shown in the steps below. This ensures that key generation is done with FIPS approved algorithms and continuous monitoring tests in place.

3. Add `fips=1` to the end of the `vmlinuz` parameters.

  ![FIPS Parameter](/img/cc_fips_serial_install2.png)

4. Press **Enter** to start the install. 

### SSR Installation

This installation process is an automated workflow which does not require user interaction after selecting and initiating the OTP menu option. The system will power off after installation.

### Bootstrapping

After the initial installation and poweroff, the system is generic - it has no specific configuration. Once the platform is started again, an automated script performs bootstrapping of the platform. This script is a single run service unit that executes **once** during the first bootup, and automatically performs the following steps:

#### 1. Configure Hostname and Salt Minion Identifier

The hostname and salt minion identifier are set to the same value during the bootstrapping process.

If the system serial number is provisioned (seen by `dmidecode --string system-serial-number`) this value will be used. Otherwise use the first MAC address found in the format of: `mac-<address>`

#### 2. Configure the SSR and Network Interfaces

The Bootstrapper sets the SSR configuration via the QuickStart file found in one of the following locations:

- The root of an attached USB drive. i.e. `/bootstrap.quickstart`. The USB drive MUST be named "BOOTSTRAP" in all caps.

- In `/etc/128technology/bootstrap.quickstart`.

If no file source is present in either location, the Bootstrapper executes HTTP GET requests to the following endpoints to download the QuickStart File from a server. The REST response is explained in [REST details](#quickstart-file-via-rest).
    1. `http://quickstart.128t-bootstrap.local/quickstart/<identifier>`
    2. `http://192.168.128.128/quickstart/<identifier>`

The `<identifier>` is the minion-id as determined by the algorithm discussed in [Configure Hostname and Salt Minion Identifier](#configure-hostname-and-salt-minion-identifier). Typically, it is the system serial number.

If none of the above are successful, the OTP defaults are used. This configures the DHCP client on the first ethernet port and a DHCP server listening on all other ports.

#### 3. Enable the SSR and Salt-Minion Service

The quickstart file configures and enables the SSR and the associated salt-minion service.

#### 4. Write a Result Report

Once the platform is rebooted after bootstrapping, the bootstrap validation report can be found at the root filesystem (`/root/128T-bootstrap.txt`) containing details about the steps taken. The `/root/128T-bootstrap.json` file contains the same information in JSON format. The report contains a message that includes additional details for each step.

Shown below is the location of the bootstrap report as well as an example of the contents.
```
[root@sn123456789 ~]# cat /root/128T-bootstrap.txt
+--------------------+--------+---------------------------------+
| Label              | Result | Message                         |
+--------------------+--------+---------------------------------+
| Minion ID          | True   | mac-000000                      |
| Hostname           | True   | mac-000000                      |
| Clock Sync         | True   |                                 |
| Initialize 128T    | True   | node.Router                     |
| Enable 128T        | True   |                                 |
| Enable salt-minion | True   |                                 |
| Factory Defaults   | True   | http://192.168.0.100/quickstart |
| Ifgcfg files       | True   |                                 |
+--------------------+--------+---------------------------------+
```

#### 5. Reboot

After reboot, the SSR service will be configured and running.

:::info
It is important to note that after the OS installation the dhclient is configured across all network interfaces until the platform has completed Bootstrapping.
:::

