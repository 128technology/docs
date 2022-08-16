---
title: Image-Based Installation
sidebar_label: Image-Based Installation
---

Beginning with version 6.0, an image-based ISO installation process has been implemented for users who manage their network using the Mist Cloud. This installation and upgrade process is only available for SSR version 6.0 and higher, and is currently only available for Mist-managed deployments.

For conductor-managed deployments, the [package-based installation](intro_installation_bootable_media.md) is used. 

The image-based installation creates two volumes on the disk, installs the full 6.0.x image into one of the volumes, and boots into that image. When an upgrade is intiated, the new ISO image is copied into the other volume. The upgrade process copies configurations and persistent information from the old image to the new image, then reboots into the new version.

The Image-based install consists of the following steps:

- [Download](#download)
- [Installation](#installation)
- [Default Port Identification](#device-default-port-identification)
- [Associate the Device with Mist Using the GUI](#associate-the-router-with-mist)
	- OR
- [Adopt the device using the PCLI](#adopt-the-router-from-the-ssr-pcli)

## Download

The image-based ISO's are available to download at the following location:

`https://software.128technology.com/artifactory/list/generic-128t-install-images-release-local/<Major>.<Minor>/`. 

Files available for download are:

- `*.iso` - This file is used for installing/staging bare metal platforms.
- `*.qcow` - This file is used for virtual environments such as KVM or ESXi.
- `*.tar` - This file is used by Mist or the SSR conductor for image-based upgrades, and is accessed directly by the system during the upgrade. User download is not necessary or advised.
- `*.ztp.raw.gz` - This file is used by manufacturing, and is not applicable for customer use. 

You will be prompted for your username and token to access the web page listing the software versions. Download is done directly from the page. For the detailed download process, see [Downloading an ISO](intro_downloading_iso.md#downloading-an-iso). 

### Create a Bootable USB

Use the instructions [Creating a Bootable ISO](intro_creating_bootable_usb.md) to create a USB to be used to install the image. 

## Installation 

1. Insert the flash drive into the appliance, and boot into the flash drive.
2. Select the installation methods; Serial Console or VGA. If you do not make a selection, the Serial mode installation is selected by default. 

	![Select Mode](/img/install_imagebased_1.png)

3. In the Installer window, select 2 for the ZTP Install Mode. This is the default mode for image-based installation.  

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

- [Lanner 1515:](install_onboard_hdware.md#lanner-1515) Certified Device
- [Silicom Madrid 90500-0151-G61:](install_onboard_hdware.md#silicom-madrid-90500-0151-g61) Certified Device
- [Fitlet2 Dual Port:](install_onboard_hdware.md#fitlet2-dual-port) Non-certified, Compatible Device
- [Fitlet2 Quad Port:](install_onboard_hdware.md#fitlet2-quad-port) Non-certified, Compatible Device
- [Additional Non-certified, Compatible Devices](install_onboard_hdware.md#additional-non-certified-compatible)

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

