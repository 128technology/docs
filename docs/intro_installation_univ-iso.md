---
title: SSR Installation 
sidebar_label: SSR Installation
---

Beginning with version 6.3.0, the SSR uses a single downloadable ISO with a significantly simplified installation process. After the SSR installation completes, the GUI provides clear choices and processes for each of the device configuration options: Conductor, a Conductor-managed router, or a Mist-managed router. 

#### Version History

| Release | Modification |
| ------- | ------------ |
| 6.0.0 | Image-based ISO installation process implemented for Mist-managed networks. |
| 6.3.0 | Universal ISO released, migrating to a single ISO installation format for Conductor, Conductor-managed, and Mist-managed deployments. |

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

Use the instructions for [Creating a Bootable USB](intro_creating_bootable_usb.md) to create a bootable USB drive containing the universal ISO image. 

## Installation  

Before beginning, ensure that you have an appropriate rollover cable available to connect to your computer. The SSR has a console port (CONSOLE) with an RJ-45 connector. Use the console port to connect the SSR to a management console or to a console server. The baud rate of the console port is 115200 bps.

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

11. If you are installing a FIPS enabled system, select Install Option 1, and select **Enter**. 

	If you are installting a virtual device, select option 2 (Cloud-init), and select **Enter**.

  ![Install Options](/img/u-iso4_install_options.png)

	If you are installing a physical device and do not require FIPS, skip the options and select **Enter**. The download and installation begins.

  ![Unpacker](/img/u-iso5_begin_install.png)

12. When the installation completes, you will be prompted to reboot. A reboot is necessary to start the services and launch the GUI. Device intialization and management is performed from the GUI.
  
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

2. To initialize a single conductor, or the first conductor of an HA pair, enter the node name, the Conductor name, and user name and password, and click **ASSOCIATE**.

 ![Conductor Association](/img/u-iso9_define_conductor.png)

  To initialize the second conductor of an HA Pair, enter the information as above, but also select the checkboxes for **Existing HA Peer** and **Learn from HA Peer**. 

  ![HA Conductor Association](/img/u-iso9a_ha_conductor.png)

3. Click **ASSOCIATE** when you have completed the required information. 

The Conductor is now available in the Configuration. You must commit the configuration changes from the SSR GUI.

### Initialize a Conductor-Managed Router

Use the following process to initialize your device as a Conductor-managed router.
1. Select **SSR Router Managed via Conductor** under SSR Managed.

  ![SSR Conductor-managed router](/img/u-iso10_cond-mngd_router.png)

2. Enter the router name and the associated Conductor IP address.

  ![Conductor Managed Association](/img/u-iso11_cond-mngd-assoc.png)

3. Click **ASSOCIATE** when you have completed the required information. 

The Router will onboard itself to the Conductor. You must commit the configuration changes from the SSR GUI.

### Initialize a Mist-Managed Router

Use the following process to initialize your device as a Mist-managed router.

1. Select Mist Organization Selection under **Mist Cloud Managed**. 

  ![Mist Org Selection](/img/u-iso12_select_mist_managed.png)

2. Enter your login credentials to log in to Mist.

  ![Login to Mist](/img/u-iso13_mist_login.png)

3. Select the Organization, and enter the router name.

   ![Select Org](/img/u-iso14_assign-org-name.png)

4. Click Adopt. The router information is displayed on the SSR GUI.

  ![Mist-Managed](/img/u-iso14a_adopted_router.png)

5. Log into your Mist Organization.

6. Once you are in your Mist Organization, select Organization from the left side menu, and then select Inventory.

7. On the Inventory list for the Organization, select the newly installed router.

  ![Mist Inventory](/img/u-iso15_router-in-mist.png)

8. Use the More... dropdown and select Assign To Site. 

  ![More dropdown](/img/u-iso16_inventory_more_dropdown.png)

9. Select the Site, and click Assign to Site.

  ![Assign to site](/img/u-iso17_assign_wan_edges.png)

The router is now available in your inventory, assigned to the selected site. 


