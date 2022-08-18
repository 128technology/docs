---
title: Networks
sidebar_label: Networks
---

## Configure the Device in Mist

To provision your SSR device with ZTP, first log into your organization in Mist.

### LAN Network Users

Start by describing your users that will be accessing applications over a LAN network segment.

![Add network](/img/intro_wa_quickstart_1.gif)

1. Navigate to the WAN section of the organization sidebar menu, and select "Networks".
2. Select "Add Networks" in the upper right.
3. Give the network a name.
4. Configure the network subnet as `192.168.1.0`/`24`.
5. **Click `Save`** at the bottom of the "Edit Network" side panel.

<img src="/img/intro_wa_quickstart_2.png" alt="Configure network" width="500"/>

Excellent! This network is now defined for use across the entire org, including in the template you will soon apply to your new SSR device.

Continue to set up some [applications](intro_wa_quickstart_2_apps.md) for these users to access.
