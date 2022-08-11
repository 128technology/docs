---
title: SSR Device Onboarding
sidebar_label: SSR Device Onboarding
---

## Onboarding a Conductor-Managed SSR Appliance

Juniper SSR hardware devices (SSR120/130, SSR1200/1300/1400/1500) come pre-installed with the version 5.4.4 software. The device includes a QR code that when scanned, automatically adopts your device into your Mist Organization. Scan the code using your Mist AI App or a QR Scanner and follow the on screen instructions to adopt your device. 

The Mist App can be downloaded from the following locations:
- [For Apple Devices](https://apps.apple.com/us/app/mistai/id1215196902) 
- [For Android Devices](https://play.google.com/store/apps/details?id=com.mist.mistify&hl=en_US&gl=US)

When onboarding a conductor-managed device, the process is simplified by ensuring that the IP address of the managing conductor is configured for the site that will adopt the device. This is typically done during Site Configuration. To verify the conductor IP address has been assigned:

1. Select Site Configuration from the Organization menu.

	![Site Configuration](/img/wanas_select_site_config.png)

2. Select the Site the device will be adopted into from the list of Sites.

3. Scroll down to **Session Smart Conductor** and verify the IP address. 

	![Session Smart Conductor Address](/img/wanas_conductor_ip_mist.png)

If no IP address is present, use the SSR GUI to copy the IP address.

1.  On the Configuration Home panel in the SSR GUI, click the Authority button. 

	![Authority Home](/img/wanas_conductor_ip1.png)

2. Under Authority Settings, scroll down to **Conductor Addresses** and copy the IP address of the conductor.

	![Conductor Address](/img/wanas_conductor_ip.png)

3. Return to the Mist Site Configuration, and scroll down to the Session Smart Conductor field and add the Conductor IP address.

	![Session Smart Conductor Address](/img/wanas_conductor_ip_mist.png)

Use the following process to onboard a conductor-managed SSR device into the Mist cloud using the Mist UI and your Claim Code. 

1. Unbox the SSR appliance.
2. Connect to the WAN port. The WAN 1 network interface is labeled port 0/0 on the device.

	![SSR 1200](/img/jnpr_ssr1200.png)

3. Power up the SSR appliance.
4. Copy the Claim Code from the QR sticker.
	![Claim code](/img/wanas_claim_code_example.png)
5. Login to the Mist UI on another device and navigate to your organization.
6. Go to the WAN Edges page.
	![WAN Edge](/img/wanas_wan_edges.png)
7. Select the Claim WAN Edges button. 
	![WAN Edges Button](/img/wanas_claim_wan_edge_button.png)
8. Enter the Claim Code.
	![Claim Code](/img/wanas_claimwanedge1.png)

In the onboarding processes, conductor-managed devices reinitialize to use the factory default configuration with the conductor IP address. During the initialization process, it reaches out to the conductor and pulls down the appropriate configuration.  

After a few minutes the SSR will appear in the inventory as "Unassigned". Once it appears in the inventory, it must be assigned to a site. Use the [Site Assignment](wan_site_assignment.md) procedure to complete the SSR onboarding.

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


