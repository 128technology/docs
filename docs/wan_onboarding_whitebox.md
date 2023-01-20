---
title: Whitebox Onboarding
sidebar_label: Whitebox Onboarding
---

Use the following information to access the management port and begin the onboarding process.

- [Connect to the Device](#device-default-port-identification)
- Adopt the Router into the Mist Cloud
	- [GUI](#gui-adoption)
	- [CLI](#cli-adoption)
	- [Enter the Registration Code Manually](#manual-adoption)

:::info
IP connectivity is required for GUI onboarding. If you do not have an ethernet interface to connect to the device, you must use pcli adoption through the console.
:::

## GUI Adoption

This section covers the basic steps to associate your router with a Mist Organization using the SSR and Mist GUI. The following animation presents the steps for associating the onboarded router with a Mist organization. The steps performed in the animation are provided below.

![GUI Adopt](/img/gui-adopt.gif)

1. Upon reboot, you are presented with the SSR login screen where you can choose to Manage the router through the Mist cloud. Select this option. 

2. Choose how to associate the router with the Mist Cloud; selecting an Organization, or use a registration code. In this example, we will choose the organization.

3. Log in to Mist.

4. Select the organization from the drop down list.

5. If you assigned your router a name, enter it here and select ADOPT.

6. If there are no errors, the router is associated with the organization and visible in the Mist UI.

7. Click on the link to the Mist Cloud to see the router in the Mist inventory and begin managing your device.

![GUI Adoption Success](/img/gui_adopt_success.png)

## CLI Adoption

If you prefer to work from the PCLI, you can use the [`adopt`](cli_reference.md#adopt) command to associate the router with Mist. 

![Adopt command](/img/adopt_pcli_imagebased1.png)


![Adopt output](/img/adopt_pcli_imagebased2.png)

## Manual Adoption

It is possible to obtain a registration code directly from the Mist portal. 

1. In the Mist portal, under Organization > Inventory, select **WAN Edges** at the top of the screen. 

2. Select "Adopt WAN Edge" on the top-right. 

3. Select the radio button "Session Smart Router (SSR)" to create a registration code.

![Adopt WAN Edge](/img/adopt-wan-edge.png)

4. Copy the registration code into your clipboard.

![Registration Code](/img/adopt-registration-code.png)

5. Enter the registration code via GUI:

![GUI Adoption Step 1](/img/gui-reg-code-adoption-1.png)
![GUI Adoption Step 2](/img/gui-reg-code-adoption-2.png)
![GUI Adoption Step 3](/img/gui-reg-code-adoption-3.png)

Or enter the registration code using the PCLI:

```
admin@128t-east.128t-east# adopt
✔ Waiting for help...
usage: adopt [{org-id <org-id> | registration-code <registration-code>}] [force]
             [router-name <router-name>]

Assign the current router to a Mist organization.

If you already know the ID of the organization or the registration code then you can
use the optional 'org-id' or 'registration-code' arguments. Otherwise an interactive
dialog will walk you through entering your Mist credentials and choosing an
organization to assign the router to.

keyword arguments:
force                Skip confirmation prompt
org-id               The ID of the mist organization to assign the router to.
registration-code    The registration code used to assign this router to an
                     organization.
router-name          Assign a name to the router

see also:
show mist    Display information about the link between the SSR and the Mist Cloud
admin@128t-east.128t-east# adopt router-name 128t-east registration-code eyJ0eXAi...
```

