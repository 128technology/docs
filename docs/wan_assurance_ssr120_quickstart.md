---
title: SSR120 Device Onboarding
sidebar_label: SSR120 Device Onboarding
---

Congratulations on your new Session Smart Routing (SSR) WAN Edge device!

Let's get it set up in the Mist cloud with WAN Assurance.

## Connect Your Device to the Cloud

![Device Connections](/img/intro_wa_ssr120_quickstart_1.png)

Your SSR device uses Port 0 (`ge-0-0`) as a default WAN port to contact Mist for zero-touch provisioning (ZTP). You will also be setting up Port 3 (`ge-0-3`) with a LAN network.

1. **Connect Port 0** to an Ethernet WAN link capable of providing the device with:
    * DHCP address assignment
    * Connectivity to the Internet and Mist

2. **Connect Port 3** to your LAN devices, including:
    * Mist-managed Juniper EX switches
    * Mist APs
    * User devices

3. **Power on the device**.

Great job! Your SSR device is now connected to the Mist cloud and awaiting further instructions.

## Claim Your Device

To add the device to your organization's WAN Edge inventory, locate the claim label found on the device.

![Claim Code](/img/intro_wa_ssr120_quickstart_2.png)

To enter the device claim information into Mist, you can:
* Enter the claim code in Mist
* Scan the QR code with the Mist mobile app

### Mist Claim Code Entry

1. Log into your Mist organization's dashboard.
2. Navigate to your organization's inventory, and select the WAN tab at the top.
3. Select the "Claim WAN Edges" button in the upper right of the inventory screen.
4. Add the device claim code into the list of devices to claim.
5. **Un-check** the "Assign claimed WAN edges to site" box. This will place the device into inventory, and it will be assigned to a site later.
6. Click the "Claim" button to claim the device into your inventory.

![Claim device](/img/intro_wa_quickstart_claim.gif)

### Mobile App QR Scan

1. Open your MistAI app.
2. Select "Claim Devices to Org".
3. Scan the QR code.

![Mist AI App](/img/intro_wa_quickstart_mobile_app.png)

:::note

The MistAI app can be downloaded from mobile app stores:
- [For Apple Devices](https://apps.apple.com/us/app/mistai/id1215196902)
- [For Android Devices](https://play.google.com/store/apps/details?id=com.mist.mistify&hl=en_US&gl=US)
:::

## Onboarding Complete!

Fantastic, your device is in your inventory! To provision your SSR device with ZTP, log into Mist and **[continue to WAN configuration.](intro_wa_quickstart_1_networks.md)**
