---
title: Onboard an SSR Device using OTP
sidebar_label: Onboard an SSR Device using OTP
---

The steps in this section describe the process of onboarding an SSR 1x0/0 to a Conductor using the OTP process. This process is only to be followed for SSR devices that **will not** use Mist for onboarding, telemetry, or WAN Assurance. 

For information about WAN Assurance offerings;

- See [Cloud Telemetry](config_wan_assurance.md) for information about conductor-managed deployments with access to Mist Telemetry data.
- See [Mist WAN Assurance](https://www.juniper.net/documentation/product/us/en/mist-wan-assurance/) for information about Mist-managed deployments.

To onboard an SSR Device using the Mist-redirect ZTP process, see [Onboarding and SSR Device to a Conductor.](onboard_ssr_to_conductor.md)

#### High Level Process:

Re-image the SSR Device with an OTP-compatible SSR software release. The image shipped on the device was designed to connect with Mist and Mist WAN Assurance.
- if the device is to be used as a Conductor, it must be provisioned as such. See [Creating a wicked cool Conductor] 
- if the device is to be used as an SSR Router, do this:

1. Use the procedure [Creating a Bootable USB from an ISO](intro_creating_bootable_usb.md) to create a bootable USB. Once you have completed that step; 
2. Connect the rj45/usb cable to the rj45 console port on the SSR1x0.
3. Connect the usb end of the cable to your pc/mac (a serial adapter is provided, get the name from the hardware guide)
4. Connect the power input to the back of the SSR1x0, but do not power it up. 
5. Open a terminal window
6. Run `ls -al /dev/*usb*` 
7. Copy the serial port information.
8. In the terminal window, type `screen` and paste the serial port info
press enter. 
9. Power up the SSR1x0. As the device is booting you will need to watch the terminal window for the prompt to enter the boot menu.
10. At the instruction: `Press ESC for the boot menu`, do so. 
11. Insert your USB with the new ISO image into the serial port of the SSR1x0.
12. From the boot menu, select the USB Boot device and press Enter.
13. Follow the [Installing SSR Using OTP] instructions to complete the installation process.

If you are pre-loading some number of SSR devices to be deployed at a later date and managed by a conductor, you will need to do this:

Standard conductor Onboarding process here. 
- can you OTP a conductor?

