---
title: Add Device to Site
sidebar_label: Add Device to Site
---

### WAN Edge Template

So far your org has a SSR device in your inventory, a network for you LAN, and an `Internet` application for your WAN to deliver.

A WAN Edge template is going to tie them all together! The use of templates allow for re-usable and consistent configuration for every SSR device you deploy beyond the one you are currently working with.

![Add template](/img/intro_wa_quickstart_5.gif)

1. Navigate back to the WAN section of the organization sidebar menu, and select "WAN Edge Templates".
2. Select "Create Template" in the upper right.
3. Name the template.
4. **Click `Create`**.
5. Enter NTP and DNS information to be used by the WAN edge device.

#### WAN

The first thing to do in your template, is describe which port to use for WAN.

![Add WAN](/img/intro_wa_quickstart_6.gif)

1. Scroll down to the WAN section of the template, and select "Add WAN".
2. Name the WAN port `wan1`.
3. Since you already plugged port 0 on the device into Internet, enter `ge-0/0/0` to designate it as a WAN port.
4. Make sure IP configuration is set to be learned from DHCP, and source NAT is enabled.
5. **Click `Add` at the bottom of the "Edit WAN Configuration" side panel.

<img src="/img/intro_wa_quickstart_7.png" alt="Configure WAN" width="500"/>

#### LAN

#### Policy

## Claim Your Device
