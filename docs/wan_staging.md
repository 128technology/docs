---
title: Staging
sidebar_label: Staging
---

Beginning with version 6.0, WAN Assurance for the SSR is available for users who manage their network using the Mist Cloud. This document assumes that you have the Mist Cloud configured and currently managing your network. 

The installation consists of the following steps:
- Staging
	- [Download](#download)
	- [Create a Bootable USB](#create-a-bootable-usb)
- [Installation](#installation)
- [Default Port Identification](wan_onboarding_whitebox.md#device-default-port-identification)
- [Associate the Device with Mist Using the GUI](wan_onboarding_whitebox.md#associate-the-router-with-mist)
	- OR
- [Adopt the device using the PCLI](wan_onboarding_whitebox.md#adopt-the-router-from-the-ssr-pcli)

For conductor-managed deployments, the [package-based installation](intro_installation_bootable_media.md) is used. To onboard a conductor-managed deployment, see [Configuring Conductor-Managed WAN Assurance](config_wan_assurance.md).

## Staging

Prepare your system for installation - appliance installation and power up - per the hardware installation instructions provided with the system.

### Download 

The image-based ISO's are available to download at the following location:

`https://software.128technology.com/artifactory/list/generic-128t-install-images-release-local/<Major>.<Minor>/`. 

You will be prompted for your username and token to access the web page listing the software versions. Download is done directly from the page. For the detailed download process, see [Downloading an ISO](intro_downloading_iso.md#downloading-an-iso). 

### Create a Bootable USB

Use the instructions [Creating a Bootable ISO](intro_creating_bootable_usb.md) to create a USB to be used to install the image. 

## Installation 

1. Insert the flash drive into the appliance, and boot into the flash drive.
2. Select the installation methods; Serial Console or VGA. If you do not make a selection, the Serial mode installation is selected by default. 

	![Select Mode](/img/install_imagebased_1.png)

3. In the Installer window, select 2 for the ZTP Install Mode. This is the default mode for image-based installation.  

:::note
When using the image-based 6.0 installation, be aware that if Interactive Install is selected, `intialize128t` does not launch automatically on first boot. This must be run manually; log in to the console as root using the default credentials, and type `initialize128t` to perform interactive initialization. This will be resolved in a future release.
:::

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
9. Upon restart, the system initializes and is internet ready. Since each manufacturer's device port layout is different, use the [Device Default Port Layout](wan_onboarding_whitebox.md#device-default-port-identification) to identify the port layout of the device to complete the onboarding process.

