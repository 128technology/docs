---
title: Onboarding
sidebar_label: Onboarding
---

Use the following information to access the management port and begin the onboarding process.

## Device Default Port Identification

When a whitebox device is installed with SSR software, the software scans the device to generate a default port map. When the device is recognized as a certified device, a known port layout is configured as the device default.
When the device is unrecognized, a default port layout is generated based upon PCI address order.
This order often does NOT match the external bezel port order. Some plugging in and testing may be required.

The following sections provide information about port connections on Juniper certified devices and non-certified devices that are considered compatible. 

- [Lanner 1515:](install_onboard_hdware.md#lanner-1515) Certified Device
- [Silicom Madrid 90500-0151-G61:](install_onboard_hdware.md#silicom-madrid-90500-0151-g61) Certified Device
- [Fitlet2 Dual Port:](install_onboard_hdware.md#fitlet2-dual-port) Non-certified, Compatible Device
- [Fitlet2 Quad Port:](install_onboard_hdware.md#fitlet2-quad-port) Non-certified, Compatible Device
- [Additional Non-certified, Compatible Devices](install_onboard_hdware.md#additional-non-certified-compatible)

Use this data to identify the port layout for your whitebox device. A link to return to this process is provided at the end of the process for each device. 

:::info
IP connectivity is required for GUI onboarding. If you do not have an ethernet interface to connect to the device, you must use pcli adoption through the console.
:::

## Associate the Router with Mist

This section covers the basic steps to associate your router with a Mist Organization using the SSR and Mist GUI. The following animation presents the steps for associating the onboarded router with a Mist organization. The steps performed in the animation are provided below.

![GUI Adopt](/img/gui-adopt.gif)

1. Upon reboot, you are presented with the SSR login screen where you can choose to Manage the router through the Mist cloud. Select this option. 

2. Choose how to associate the router with the Mist Cloud; selecting an Organization, or use a registration code. In this example, we will choose the organization.

3. Log in to Mist.

4. Select the organization from the drop down list.

5. If you assigned your router a name, enter it here and select ADOPT.

6. If there are no errors, the router is associated with the organization and visible in the Mist UI.

7. Click on the link to the Mist Cloud to see the router in the Mist inventory and begin managing your device.

## Adopt the Router from the SSR PCLI

If you prefer to work from the PCLI, you can use the [`adopt`](cli_reference.md#adopt) command to associate the router with Mist. 

![Adopt command](/img/adopt_pcli_imagebased1.png)


![Adopt output](/img/adopt_pcli_imagebased2.png)
