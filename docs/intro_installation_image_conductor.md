---
title: Conductor Image-Based Installation 
sidebar_label: Conductor Image-Based Installation
---

The release of the SSR Univeral Installation ISO provides a single downloadable ISO to simplify the SSR installation process, and provides image-based installations for both conductors and routers. The image-based installation creates two volumes on the disk, installs the full SSR image into one of the volumes, and boots into that image. When an upgrade is intiated, the new ISO image is copied into the other volume. The upgrade process copies configurations and persistent information from the old image to the new image, then reboots into the new version. 

#### Version History

| Release | Modification |
| ------- | ------------ |
| 6.0.0 | Image-based ISO installation process implemented for Mist-managed networks. |
| 6.3.0 | Universal ISO released, migrating to a single ISO and Image-based installation format for both Conductor-managed and Mist-managed deployments. |

The Conductor image-based install consists of the following steps:

- [Download](#download)
- [Create a bootable USB](intro_creating_bootable_usb.md)
- [Installation](#installation)

## Download

The image-based ISO's are available to download at the following location:

<!-- markdown-link-check-disable-next-line -->
https://software.128technology.com/artifactory/list/generic-128t-install-images-release-local/

Files available for download are:

- `*.iso` - This file is used for installing/staging bare metal platforms. **Use this file to perform an image-based install.** 
- `*.tar` - This file is used by Mist or the SSR conductor for image-based upgrades, and is accessed directly by the system during the upgrade. User download is not necessary or advised.

You will be prompted for your username and token to access the web page listing the software versions. Download is done directly from the page.

### Create a Bootable USB

Use the instructions for [Creating a Bootable USB](intro_creating_bootable_usb.md) to create a USB to be used to install the image. 

## Installation 

1. Insert the bootable USB into the SSR and boot into the flash drive.
2. Select the installation methods; Serial Console or VGA. If you do not make a selection, the Serial mode installation is selected by default. **(really need a new screenshot here)**

	![Select Mode](/img/install_imagebased_1.png)

3. In the Installer window, select 3 for the Interactive Install Mode. Conductor installations are performed using the interactive installation. **(need new screenshot here)**

	![Select Install Mode](/img/install_imagebased_2.png)

	On a system with multiple disks, the **Install Devices** selection allows you to _steer_ the boot and root filesystems to individual devices if necessary.

4. If you require FIPS enforcement, select 5 for `Enable FIPS 140-2 mode`. If you do not require FIPS enforcement, skip to step 7. 

	![Generated Menu](/img/60fips_install_1.png)

5. The resulting system boots into FIPS 140-2 enforcing mode. 

	![Boot](/img/60fips_install_2.png)

6. Verify FIPS mode is active by reading the kernel crypto state using `sysctl`. The result is an error when attempting to use a non-FIPS compliant crypto such as md5.
	
	![Error Message at bottom](/img/60fips_install_3.png)

7. Press the enter key to start the installation. 
8. Once complete, you are prompted with an option to press Esc to reboot immediately, or Enter to shutdown and continue later. 
9. Upon restart, the system initializes and is internet ready. Since each manufacturer's device port layout is different, use the following information to identify the port layout of the device to complete the onboarding process.

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

### Associate the Router with Mist

This section covers the basic steps to associate your router with a Mist Organization using the SSR and Mist GUI. The following animation presents the steps for associating the onboarded router with a Mist organization.

![GUI Adopt](/img/gui-adopt.gif)

The steps performed in the animation are listed below.

1. Upon reboot, you are presented with the SSR login screen where you can choose to Manage the router through the Mist cloud. Select this option. 

2. Choose how to associate the router with the Mist Cloud; selecting an Organization, or use a registration code. In this example, we will choose the organization.

3. Log in to Mist.

4. Select the organization from the drop down list.

5. If you assigned your router a name, enter it here and select ADOPT.

6. If there are no errors, the router is associated with the organization and visible in the Mist UI.

7. Click on the link to the Mist Cloud to see the router in the Mist inventory.

### Adopt the Router from the SSR PCLI

If you prefer to work from the PCLI, you can use the [`adopt`](cli_reference.md#adopt) command to associate the router with Mist. 

![Adopt command](/img/adopt_pcli_imagebased1.png)


![Adopt output](/img/adopt_pcli_imagebased2.png)

