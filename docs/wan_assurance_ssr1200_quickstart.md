---
title: SSR1200 Device Onboarding
sidebar_label: SSR1200 Device Onboarding
---

Congratulations on your new Session Smart Routing (SSR) WAN Edge device!

Let's get it set up in the Mist cloud with WAN Assurance. This guide walks you through the simple steps to get a new cloud-ready Juniper Networks® SSR1200 router up and running in the Juniper Mist™ cloud portal. You can onboard a single device using your mobile phone, or one or more devices using your computer. Once onboarded, we'll walk you through the steps to create a basic configuration.
You'll need your Juniper Mist WAN Assurance subscription and your login credentials for the Juniper Mist portal. If you have not already activated your subscriptions and set up your organization and sites, please follow the steps in [Create a Mist Account and Organization](https://www.juniper.net/documentation/us/en/quick-start/software/mist/quick-start/mist-quick-start/product-quick-start/topics/topic-map/step-1-begin.html). 

## Connect Your Device to the Cloud

![Port Connections](/img/hdwr_ssr1200_qs_ports_g101893.png)

Your SSR device uses the MGMT port (`mgmt-0-0`) as a default WAN port to contact Mist for zero-touch provisioning (ZTP). You will also be setting up Port 0/3 (`ge-0-3`) with a LAN network.

1. **Connect the MGMT port** to an Ethernet link capable of providing the device with:
    * DHCP address assignment
    * Connectivity to the Internet and Mist

:::note
For management, you can connect the SSR1200 to Mist using the MGMT port. You can also connect to Mist from one of the WAN ports only when the MGMT port is disconnected, or does not have a valid DHCP leased address and default route.
:::

2. **Connect port 0/3** to your LAN devices, including:
    * Mist-managed Juniper EX switches
    * Mist APs
    * User devices

3. **Power on the device**.

Great job! Your SSR device is now connected to the Mist cloud and awaiting further instructions.

## Claim Your Device

To add the SSR1200 to your organization's WAN Edge inventory, you must enter the SSR1200 claim information into Mist. The claim label (QR code sticker) on the front panel has the claim information.

To enter the claim information, do one of the following:

- Scan the QR code with the Mist mobile application.

- You can also manually enter the claim code in Mist. The claim code is the number above the QR code. 

![Claim Code](/img/hdwr_ssr1200_qs_claimcode_s053292.png)

### Mobile App QR Scan

You can download the Mist AI App from the [Mac App Store](https://apps.apple.com/us/app/mistai/id1215196902) or from the [Google Play Store](https://play.google.com/store/apps/details?id=com.mist.mistify&hl=en_US&gl=US).

1. Open your MistAI app.
2. Select "Claim Devices to Org".
3. Scan the QR code.

![Mist AI App](/img/intro_wa_quickstart_mobile_app.png)

### Mist Claim Code Entry

1. Log into your Mist organization's dashboard.
2. Navigate to your organization's inventory, and select the WAN tab at the top.
3. Select the "Claim WAN Edges" button in the upper right of the inventory screen.
4. Add the device claim code into the list of devices to claim.
5. **Un-check** the "Assign claimed WAN edges to site" box. This will place the device into inventory, and it will be assigned to a site later.
6. Click the "Claim" button to claim the device into your inventory.

![Claim device](/img/intro_wa_quickstart_claim.gif)

:::note
When a device is assigned to a site and set to be managed by Mist, upon first connection of the device to the cloud you will be prompted to upgrade to a version of software compatible with Mist. In some initial onboarding cases, this upgrade process may take up to 30 minutes or more.
:::

## Onboarding Complete!

Fantastic, your device is in your inventory! To provision your SSR device with ZTP, log into Mist and **[configure a template](intro_wa_quickstart_3_templates.md)** for your SSR.
