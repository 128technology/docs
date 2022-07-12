---
title: Next Generation Installation
sidebar_label: Next Generation Installation
---

Beginning with version 6.0, an image-based ISO installation process has been implemented for users who manage their network using the Mist Cloud. This installation and upgrade process is only available for SSR version 6.0 and higher, and is currently only available for Mist-managed deployments.

For on-premises and conductor-managed deployments, the [package-based installation](intro_installation_bootable_media.md) is used. 

The image-based installation creates two partitions on the disk, and installs the full 6.0 image onto one of the partitions (partition A), and then boots into that image. When upgrades become available and are intiated, the new ISO image is copied onto partition B. The upgrade process then copies configurations and persistent information from the Active partition to the new image, then reboots into the new version.

## Download

The image-based ISO's are available to download at the following location:

`https://software.128technology.com/artifactory/list/generic-128t-install-images-release-local/<Major>.<Minor>/`. 

You will be prompted for your username and token to access the web page listing the software versions. Download is done directly from the page. For the detailed download process, see [Downloading an ISO](intro_downloading_iso.md#downloading-an-iso). 

### Create a Bootable USB

Use the instructions [Creating a Bootable ISO](intro_creating_bootable_usb.md) to create a USB to be used to install the image. 

## Installation 

1. Insert the flash drive into the appliance, and boot into the flash drive.
2. Select the installation methods; Serial Console or VGA. If you do not make a selection, the Serial mode installation is selected by default. 

	![Select Mode](/img/install_imagebased_1.png)

3. In the Installer window, select 2 for the ZTP Install Mode. 

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
9. Upon restart, the system initializes and is internet ready. You can now use one of the following ways to associate the device with a Mist organization.
    * GUI through LAN port.
    * PCLI `adopt` command.
    * Have a USB flash drive inserted on first boot with whitebox config already on it. 
    :::note 
    Do not insert the USB before reaching step 5, or it may be erased during install.
    :::

