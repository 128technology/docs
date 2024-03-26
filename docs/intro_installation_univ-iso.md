---
title: SSR Universal ISO Installation 
sidebar_label: SSR Universal ISO Installation
---

The release of the SSR Univeral ISO provides a single, image-based downloadable ISO that provides one installation workflow for conductors, conductor-managed routers, and Mist-managed routers. 

With a single process requiring minimal interaction, SSR installation has been greatly simplified.

The image-based installation creates two volumes on the disk, installs the full SSR image into one of the volumes, and boots into that image. When an upgrade is intiated, the new ISO image is copied into the other volume. The upgrade process copies configurations and persistent information from the old image to the new image, then reboots into the new version. 

#### Version History

| Release | Modification |
| ------- | ------------ |
| 6.0.0 | Image-based ISO installation process implemented for Mist-managed networks. |
| 6.3.0 | Universal ISO released, migrating to a single ISO and Image-based installation format for both Conductor-managed and Mist-managed deployments. |

The installation workflow consists of the following steps:

- [Download](#download)
- [Create a bootable USB](intro_creating_bootable_usb.md)
- [Installation](#installation)

## Download

The ISO is available for download at the following location:

<!-- markdown-link-check-disable-next-line -->
https://software.128technology.com/artifactory/list/generic-128t-install-images-release-local/

Files available for download are:

- `*.iso` - This file is used for installing/staging bare metal platforms. **Use this file to perform an image-based install.** 
- `*.tar` - This file is used by Mist or the SSR conductor for image-based upgrades, and is accessed directly by the system during the upgrade. User download is not necessary or advised.

You will be prompted for your username and token to access the web page listing the software versions. Download is done directly from the page.

### Create a Bootable USB

Use the instructions for [Creating a Bootable USB](intro_creating_bootable_usb.md) to create a USB to be used to install the image. 

## Installation 

Ensure that you have an appropriate rollover cable available to connect to your computer. The SSR has a console port (CONSOLE) with an RJ-45 connector. Use the console port to connect the SSR to a management console or to a console server. The baud rate of the console port is 115200 bps.

1. Connect an RJ45 rollover cable to the console port on the SSR device.
2. Connect the other end of the cable to your computer.
3. Insert your bootable USB with the new ISO image into the USB port of the SSR device.
4. Connect the power input to the SSR device.
5. Power on the SSR.
6. At the instruction in the terminal window: `Press ESC for boot menu`, do so.
7. From the boot menu, enter the boot device number corresponding to your USB, and press Enter.
8. From the boot menu select **TAB** or **DEL** to enter Setup.

  ![Boot menu](/img/u-iso1_install_presstab_setup.png)

9. Select the Boot image on the USB device you wish to install. In the example below, there is only one image downloaded. 

  ![Choose Image](/img/u-iso2_choose_image.png)

10. At the Install menu, select Serial or VGA.

  ![Install Type](/img/u-iso3_choose_install_type.png)

11. If you are installing a FIPS enabled system select install option 1, and then select **Enter**. If you are installting a Mist-managed router, select the **cloud-init** option (option 2), and select **Enter**

  ![Install Options](/img/u-iso4_install_options.png)

  If you are installing a Conductor or conductor managed router, skip the options and select **Enter**. The download and installation begins.

  ![Unpacker](/img/u-iso5_begin_install.png)

12. When the installation completes, you will be prompted to reboot. A reboot is necessary to start the necessary services and launch the GUI to configure the device as a conductor or router, and choose they management type (Conductor-managed or Mist-managed).
  
  ![Unpacker Successful](/img/u-iso6_unpacker_complete.png)

13. When the login screen appears, log in to launch the GUI.

  ![Final Install Screen](/img/u-iso7_serial_install.png)

## Select the Device Type

Use the GUI to initialize the device as a Conductor, a conductor-managed router, or a Mist-managed router. 

![U-ISO Device Selection GUI](/img/u-iso8_launch_gui.png)

### Initialize a Conductor

Use the following process to initialize your device as a Conductor.

1. Select **SSR Conductor** under SSR Managed.

  ![SSR Conductor](/img/u-iso8a_initialize_conductor.png)

2. To initialize a single conductor or the first conductor of an HA pair, enter the node name, the Conductor name, and Artifiactory user name and password, and click **ASSOCIATE**.

 ![Conductor Association](/img/u-iso9_define_conductor.png)

  To initialize the second conductor of an HA Pair, enter the information as above, but also select the checkboxes for **Existing HA Peer** and **Learn from HA Peer**. 

  ![HA Conductor Association](/img/u-iso9a_ha_conductor.png)

3. Click **ASSOCIATE** when you have completed the required information. 

The Conductor is now available in the Configuration. You must commit the configuration changes for the conductor to become active. 

### Initialize a Conductor-Managed Router

Use the following process to initialize your device as a Conductor-managed router.
1. Select **SSR Router Managed via Conductor** under SSR Managed.

  ![SSR Conductor-managed router](/img/u-iso10_cond-mngd_router.png)

2. Enter the router name and the associated Conductor IP address.

  ![Conductor Managed Association](/img/u-iso11_cond-mngd-assoc.png)

3. Click **ASSOCIATE** when you have completed the required information. 

The Router will onboard itself to the Conductor. You must commit the configuration changes for the conductor to become active.

### Initialize a Mist-Managed Router

Use the following process to initialize your device as a Mist-managed router.

1. Select Mist Organization Selection under **Mist Cloud Managed**. 

  ![Mist Org Selection](/img/u-iso12_select_mist_managed.png)

2. Enter your login credentials to log in to Mist.

  ![Login to Mist](/img/u-iso13_mist_login.png)

3. Select the Organization, and enter the router name.

   ![Select Org](/img/u-iso14_assign-org-name.png)

4. From the Mist Org page, select Organization from the left side menu, and select Inventory.

5. On the Inventory list for the Org, select the newly installed router.

  ![Mist Inventory](/img/u-iso15_router-in-mist.png)

6. Use the More... menu to associate the router with the Org. 

The router is now available in the Mist Org. 


### Device Default Port Identification

When a whitebox device is installed with SSR software, the software scans the device to generate a default port map. When the device is recognized as a certified device, a known port layout is configured as the device default.
When the device is unrecognized, a default port layout is generated based upon PCI address order.
This order often does NOT match the external bezel port order. Some plugging in and testing may be required.

The following sections provide information about port connections on Juniper certified devices and non-certified devices that are considered compatible. 

- [Lanner 1515:](hdwr_whitebox_port_layout.md#lanner-1515) Certified Device
- [Silicom Madrid 90500-0151-G61:](hdwr_whitebox_port_layout.md#silicom-madrid-90500-0151-g61) Certified Device
- [Fitlet2 Dual Port:](hdwr_whitebox_port_layout.md#fitlet2-dual-port) Non-certified, Compatible Device
- [Fitlet2 Quad Port:](hdwr_whitebox_port_layout.md#fitlet2-quad-port) Non-certified, Compatible Device
- [Additional Non-certified, Compatible Devices](hdwr_whitebox_port_layout.md#additional-non-certified-compatible)

Use this data to identify the port layout for your whitebox device. A link to return to this process is provided at the end of the process for each device. 

