---
title: Onboard an SSR Device using OTP
sidebar_label: Onboard an SSR Device using OTP
---

The steps in this section describe the process of onboarding an SSR 1x0/0 to a Conductor using the OTP process. The SSR must be re-imaged with an OTP compatible software version. 

This process is to be followed for SSR devices that **will not** use Mist for onboarding, telemetry, or WAN Assurance. 

:::note
For information about WAN Assurance offerings;

- See [Cloud Telemetry](config_wan_assurance.md) for information about conductor-managed deployments with access to Mist Telemetry data.
- See [Mist WAN Assurance](https://www.juniper.net/documentation/product/us/en/mist-wan-assurance/) for information about Mist-managed deployments.
- See [Onboarding and SSR Device to a Conductor](onboard_ssr_to_conductor.md) to onboard an SSR Device using the Mist-redirect ZTP process. 
:::

#### High Level Process:

Re-image the SSR Device with an OTP-compatible SSR software release (anything but 5.4.4-9, preferably an image-based install). The image shipped on the device was designed to connect with Mist and Mist WAN Assurance.

Important: to successfully onboard an SSR using OTP, you must already have a Conductor up and running in the network where the SSR router can connect and receive configuration information. The conductor **must have** a software version equal to or greater than the version that will be installed on the routers using OTP. 

- if the SSR device is to be used as a Conductor, it must first be converted into a Conductor. See [Conductor Conversion](conductor_conversion.md) for more information. 

	*Questions*
	If the routers are converted to OTP, they will likely have a newer version of SSR software. Conductors must have the same or higher versions of software than the routers they manage. Which is the better workflow for Conductor conversion and upgrading to a new software version; Convert first then upgrade, or upgrade then provision as a conductor? (two different procedures)

- If the device is to be used as an SSR Router, do this:

1. Use the procedure [Creating a Bootable USB from an ISO](intro_creating_bootable_usb.md) to download and create a bootable USB. Once you have completed that step, continue below. 
2. Connect the RJ45/USB cable to the console port on the SSR1x0/0.
3. Connect the USB end of the cable to your pc/mac using the serial adapter provided with the SSR device.
4. Connect the power input to the back of the SSR1x0/0, but do not power it up. 
5. Open a terminal window.
6. Run `ls -al /dev/*usb*` to identify the USB port.
7. Copy the serial port information.
8. In the terminal window, type `screen` and paste the serial port info
press enter. 
9. Power up the SSR1x0/0.
10. At the instruction in the terminal window: `Press ESC for the boot menu`, do so. 
11. Insert your USB with the new ISO image into the serial port of the SSR1x0/0.
12. From the boot menu, select the USB Boot device and press Enter.
13. If there are multiple images on the USB device, select the appropriate image for your install.
14. Follow the [Installing SSR Using OTP] instructions to complete the installation process.


