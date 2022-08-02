---
title: SSR Device Onboarding
sidebar_label: SSR Device Onboarding
---

With SSR version 6.0, SSR device onboarding to the Mist cloud is a "zero-touch" process. After powering up the hardware device and connecting to the WAN port, simply use your Mist App to scan the QR code on the back of the appliance. 

1. Log into the Mist app and select your Organization.
2. Click on Claim device to Organization. The camera will open and allow you to scan the QR code on the device.
3. Scan the QR code. If the SSR is claimed by a Site within the Mist Org that has a configuration associated with it, then the SSR is automatically assigned and configured. After a few minutes, the device is visible in the Mist WAN Edge - Device View. Use the Insights view to see events and activity.

If you do not have the ability to scan the QR code, you can enter the Claim Code directly into the Mist UI.

![Mist Claim Code](/img/wan_claim_code.png)

### Earlier SSR Versions

For Juniper SSR Devices that have SSR Version 5.4.4 pre-installed, if you wish to upgrade to version 6.0, you must install the software using a USB. 

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
9. Upon restart, the system initializes and is internet ready.

After the install completes, you will be able to scan the QR code as above, or enter the claim code to adopt the device. 

If the site that the SSR has been assigned to has a configuration for the router, the SSR is automatically configured. If the site does not have a configuration, use the Mist UI to complete the onboarding and configuration process. 
