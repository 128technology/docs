---
title: WAN Edge Templates
sidebar_label: WAN Edge Templates
---

Configuring your SSR device is made simple through the use of the SSR WAN Edge Templates. 

The WAN Edge Templates provide you with the basic network configuration in a single step, and allow for re-usable and consistent configuration for every SSR device you deploy. The template provides device specific, preconfigured WAN interfaces, LAN interfaces, a traffic steering policy, and an application policy. You simply name the template and select the device type.  


![Add template](/img/intro_wa_quickstart_5.gif)

1. From the the organization sidebar menu, select **WAN Edge Templates**.
2. Select **Create Template** in the upper right.
3. Name the template.
4. Place a checkmark in the **`Create from Device Model`** box.
5. Select your device model from the dropdown.
6. Click **`Create`**.

The device template is displayed - great job! You now have a working WAN Edge template you can apply to many sites and devices across your organization.

## Assign to Site

With your template set up, you need to save and assign it to the site where your WAN edge device will be deployed.

![Configure access](/img/intro_wa_quickstart_14.gif)

1. At the top of the template page, click the **Assign to Site** button.
2. Select a site from the list where you want the template applied.
3. Click **Apply**.

Great work! All that remains is to [associate the **device** with a site](intro_wa_quickstart_4_siteassign.md).
