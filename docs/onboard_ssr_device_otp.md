---
title: Onboard an SSR Device using OTP
sidebar_label: Onboard an SSR Device using OTP
---

The steps in this section describe the process of **re-imaging an SSR 1x0/0** for onboarding to a Conductor using the OTP process. This process is for SSR devices that **can not** use Mist for onboarding, telemetry, or WAN Assurance. 

:::important
For customers or partners who can access Mist and are not in an "air-gap" network, the easiest way to onboard an SSR Device is to configure an account on Mist, and onboard to a conductor using ZTP. This provides a simple conductor onboarding process, and does not require access to Mist after the onboarding. See [ZTP Onboarding to a Conductor.](config_wan_assurance.md) This process provides the ability to do conductor-managed onboarding for customers who will not be using Mist Telemetry or WAN Assurance.  
:::

## Re-Imaging Process

The image shipped on the SSR Devices is designed to connect with Mist and Mist WAN Assurance. For use in a conductor-managed environment that does not have access to Mist, re-image the SSR Device with a generally available, package-based, OTP-compatible SSR software release. 

:::note
Use of non-GA, unofficial software releases will void the Juniper device warranty.
:::

### Prerequisites

- To successfully onboard an SSR using OTP, you must already have a Conductor up and running in the network where the SSR router can connect and receive configuration information. 

- The conductor **must have** a software version equal to or greater than the version that will be installed on the routers using OTP. 

- To retain a valid warranty, the software used to re-image the SSR device must be an [**official Juniper GA Release of the SSR Software**](about_releases.md#general-availability). 

- If the SSR 1x0/0 device is to be used as a Conductor, it must first be converted into a Conductor. See [Conductor Conversion](conductor_conversion.md) for more information. 

## OTP Re-Image Process

Use the following procedure to re-image both the Conductor and Routers:

1. Use the procedure [Creating a Bootable USB from an ISO](intro_creating_bootable_usb.md) to download the package-based ISO and create a bootable USB. Once you have completed that step, continue below. 
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
14. Follow the [Installation Using OTP](intro_otp_iso_install.md) instructions to complete the installation process.


