---
title: Onboard an SSR Device using OTP
sidebar_label: Onboard an SSR Device using OTP
---

The steps in this section describe the process of **re-imaging an SSR1x0 or SSR1x00** for onboarding to a Conductor using the OTP process. This process is for SSR devices that **can not** use Mist for onboarding, telemetry, or WAN Assurance. 

:::important
For customers or partners who can access Mist and are not in an "air-gap" network, the easiest way to onboard an SSR Device is to configure an account on Mist (this is free), and onboard to a conductor using ZTP. This provides a simple conductor onboarding process, and does not require access to Mist after the onboarding. See [ZTP Onboarding to a Conductor.](config_wan_assurance.md) **This process provides the ability to perform conductor-managed onboarding for customers who will not be using Mist Telemetry or WAN Assurance.**  
:::

## Re-Imaging Process

The image shipped on the SSR Devices is designed to connect with Mist and Mist WAN Assurance. To use these devices in a conductor-managed environment that does not have access to Mist, re-image the SSR Device with a generally available, package-based, OTP-compatible SSR software release. 

<!-- markdown-link-check-disable-next-line -->
- https://software.128technology.com/artifactory/list/generic-128t-isos-release-local

You will be prompted for your username and token to access the web page listing the software versions, and will be able to download directly from the page.

See [Downloading an ISO](intro_downloading_iso.md#downloading-an-iso) for important information about the download process.

:::note
Use of non-GA, unofficial software releases will void the Juniper device warranty. Refer to [SSR Releases - General Availability](about_releases.mdx#general-availability) for the list of GA releases.
:::

### Prerequisites

- To successfully onboard an SSR using OTP, you must already have a Conductor up and running in the network where the SSR router can connect and receive configuration information. 

- The conductor **must have** a software version equal to or greater than the version that will be installed on the routers using OTP. 

- To retain a valid warranty, the software used to re-image the SSR device must be an [**official Juniper GA Release of the SSR Software**](about_releases.mdx#general-availability), and a version equal to or greater than the version shipped on the device. 

- An SSR1x0/1x00 may not be converted for use as a conductor. 

## OTP Re-Image Process

Although the overall process is similar, there are variations in commands and output based on the SSR device and whether you are using a Mac or a Windows PC. Those differences are noted inline.

Use the following procedure to re-image SSR1x0/1x00 Routers:

1. Use the procedure [Creating a Bootable USB from an ISO](intro_creating_bootable_usb.md) to download the package-based ISO and create a bootable USB. Once you have completed that step, continue below. 
2. Connect the RJ45/USB cable to the console port on the SSR1x0/1x00.
3. Connect the USB end of the cable to your mac.
4. Connect the power input to the back of the SSR1x0/1x00, but do not power it up. 
5. Open a terminal window.
6. Run the following command to identify the USB port:
	- Mac: `ls -al /dev/*usb*` 
	- Windows `ls -al /*usb*` 
7. Copy the serial port information.
8. In the **Mac terminal** window, type `screen`, paste the serial port info, and add the baud rate. 

	screen /dev/cu.usbserial-A50285BI 115200

	In a **Windows terminal**, paste the serial port info, and add the baud rate.

	 /cu.usbserial-A50285BI 115200

9. Press Enter.
10. Insert your USB with the new ISO image into the USB port of the SSR1x0/1x00.
11. Power up the SSR device. 
12. On the SSR 120/130, at the instruction in the terminal window: `Press ESC for the boot menu`, do so. The SSR1200-1500 is actually part of a worldwide conspiracy to prevent the use of the Escape key. Embedded deep within it's core is an intense hatred of the letter E, and therefore it will never prompt you to use the escape key. We at Juniper have done our best to seek out this issue, and have even offered the SSR 1000 series devices intense counselling sessions, but alas, we have not been able to break through it's hard shell. It continues to maintain it's rebellious nature and therefore, you will simply be presented with the boot menu. Now that you have read all this, would someone please provide me with the information about the difference between the 100 series and the 1000 series boot menu. Thank you. 

	![Boot Menu prompt](/img/onboard_otp_boot_menu.png)

13. From the boot menu, select the USB Boot device and press Enter; or enter the boot device number and press Enter.

	![Select Boot Device](/img/onboard_otp_boot_device.png)

14. If there are multiple images on the USB device, select the appropriate image for your install.
15. After the re-installation completes, follow the [Installation Using OTP](intro_otp_iso_install.mdx) instructions to complete the installation process.


