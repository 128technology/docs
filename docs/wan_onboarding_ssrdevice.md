---
title: SSR Device Onboarding
sidebar_label: SSR Device Onboarding
---

## Onboarding a Conductor-Managed SSR Appliance

Juniper SSR hardware devices (SSR120/130, SSR1000-1500) come pre-installed with the version 5.4.4 software. The device includes a QR code that when scanned, automatically adopts your device into your Mist Organization. Scan the code using your Mist AI App or a QR Scanner and follow the on screen instructions to adopt your device. For information about using the QR code, refer to the [Claiming APs page](https://www.mist.com/documentation/claiming-aps/).

Alternatively, you can onboard a conductor-managed SSR device into the Mist cloud using the Mist UI and your Claim Code. 

1. Unbox the SSR appliance.
2. Power up the SSR appliance.
3. Connect to the WAN port.
4. Copy the Claim Code from the QR sticker.
5. Login to the Mist UI on another device and navigate to your organization.
6. Go to the WAN Edges page
7. Select the Claim WAN Edges button and enter the Claim Code.
8. Assign the device to a site.

In both onboarding processes, when Mist identifies that the device is conductor-managed from the cloud, it reinitializes to use the factory default configuration with the conductor IP address. During the initialization process, it reaches out to the conductor and pulls down the appropriate configuration.  

## Upgrading from Earlier SSR Versions

For Juniper SSR Devices that have SSR Version 5.4.4 pre-installed, if you wish to upgrade to version 6.0, you must install the software using a USB. 

### Download 

The image-based ISO's are available to download at the following location:

`https://software.128technology.com/artifactory/list/generic-128t-install-images-release-local/<Major>.<Minor>/`. 

You will be prompted for your username and token to access the web page listing the software versions. Download is done directly from the page. For the detailed download process, see [Downloading an ISO](intro_downloading_iso.md#downloading-an-iso). 

### Create a Bootable USB

Use the instructions [Creating a Bootable ISO](intro_creating_bootable_usb.md) to create a USB to be used to install the image. 

### Installation 

Use the [Installation instructions](wan_staging.md#installation) to install and upgrade to the SSR version 6.0 image.

After the install completes, you will be able to scan the QR code as above, or enter the claim code to adopt the device. 

If the site that the SSR has been assigned to has a configuration for the router, the SSR is automatically configured. If the site does not have a configuration, use the Mist UI to complete the onboarding and configuration process. 


