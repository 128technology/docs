---
title: WAN Edge Template
sidebar_label: WAN Edge Template
---

Templates allow for re-usable and consistent configuration for every SSR device you deploy. Navigate to “WAN Edge Templates” and create a new template.

![WAN Edge Template](/img/wanas_standalone_template.gif)

Enter your NTP and DNS settings.

![Define Template](/img/wanas_template_static.png)

## Create the WAN Interface

Add a new WAN interface to the template.

![WAN Interface](/img/wanas_add_wan.gif)

Enter and save the WAN interface settings.

![WAN Settings](/img/wanas_add_wan.png)

## Create the LAN Interface

Add a new LAN interface to the template.

![LAN Interface](/img/wanas_add_lan.gif)

Select your previously created network, and set the IP address the device will use from within the subnet.

![Set IP](/img/wanas_add_lan.png)

Set up a DHCP server pool for the LAN network.

![Set Server Pool](/img/wanas_add_lan_dhcp.png)

## Create Breakout Steering Policy

Add a traffic steering policy specifying use of WAN path, and previously configured WAN interface.

![Steering Policy](/img/wanas_add_steering.gif)

## Create an Access Policy

Add an access policy to the template.

![Add Access Policy](/img/wanas_add_access_policy.gif)

Select your network, your internet app, and breakout steering policy.

![Define Access Policy](/img/wanas_add_access_policy2.gif)

## Associate Template With Site

Save the template you have configured, and associate the template with your previously created site.

![Save Template](/img/wanas_save_assign_template.gif)