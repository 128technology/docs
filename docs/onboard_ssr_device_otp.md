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

The process varies based on the SSR Device, as well as Mac and Windows. 

### Mac Re-Image Process

Use the following procedure to re-image SSR1x0 Devices:

1. Use the procedure [Creating a Bootable USB from an ISO](intro_creating_bootable_usb.md) to download the package-based ISO and create a bootable USB. Once you have completed that step, continue below. 
2. Connect the RJ45/USB cable to the console port on the SSR1x0/1x00.
3. Connect the USB end of the cable to your laptop.
4. Connect the power input to the back of the SSR1x0/1x00, but do not power it up. 
5. Open a terminal window.
6. Run the following command to identify the USB port: 
```
	ls -al /dev/*usb*
```
7. In the terminal window, type `screen`, paste the serial port info, and add the baud rate. 
```
	screen /dev/cu.usbserial-A50285BI 115200
```
8. Press Enter.
9. Insert your USB with the new ISO image into the USB port of the SSR1x0/1x00.
10. Power up the SSR device. 
11. At the instruction in the terminal window: `Press ESC for the boot menu`, do so. 

	![Boot Menu prompt](/img/onboard_otp_boot_menu.png)

12. From the boot menu, select the USB Boot device and press Enter; or enter the boot device number and press Enter.

	![Select Boot Device](/img/onboard_otp_boot_device.png)

13. Select the image for your install.
14. After the re-installation completes, follow the [Installation Using OTP](intro_otp_iso_install.mdx) instructions to complete the installation process.

#### Use the follwing process to re-image SSR1x00 Devices

1. Use the procedure [Creating a Bootable USB from an ISO](intro_creating_bootable_usb.md) to download the package-based ISO and create a bootable USB. Once you have completed that step, continue below. 
2. Connect the RJ45/USB cable to the console port on the SSR1x0/1x00.
3. Connect the USB end of the cable to your laptop.
4. Connect the power input to the back of the SSR1x0/1x00, but do not power it up. 
5. Open a terminal window.
6. Run the following command to identify the USB port: 
```
	ls -al /dev/*usb*
```
7. In the terminal window, type `screen`, paste the serial port info, and add the baud rate. 
```
	screen /dev/cu.usbserial-A50285BI 115200
```
8. Press Enter.
9. Insert your USB with the new ISO image into the USB port of the SSR1x0/1x00.
10. Power up the SSR device.
11. At the instruction in the terminal window: `Press <Tab> or <DEL> to enter Setup`, do so.

	![Setup Menu Prompt](/img/1x00_setup_menu.png)

12. When the Setup Utility window appears, use the left and right arrow keys to navigate to the `Save & Exit` tab.
13. Use the up and down arrow keys to highlight the boot device in the the Boot Override list.

	![Boot Override list](/img/1x00_boot-override.png)

14. Press Enter to confirm boot from the USB device.
15. After the re-installation completes, follow the [Installation Using OTP](intro_otp_iso_install.mdx) instructions to complete the installation process.

### Windows Re-Imaging Process

 1. Use the procedure [Creating a Bootable USB from an ISO](intro_creating_bootable_usb.md) to download the package-based ISO and create a bootable USB. Once you have completed that step, continue below. 
2. Connect the RJ45/USB cable to the console port on the SSR1x0/1x00.
3. Connect the USB end of the cable to your laptop.
4. Connect the power input to the back of the SSR1x0/1x00, but do not power it up. 
5. From the Windows Device Manager, open a PuTTY session, and select the serial port and baud rate.
	
	![PuTTY window](/img/putty-window.png)

6. Insert your USB with the new ISO image into the USB port of the SSR1x0/1x00.
7. Power up the SSR device. 

#### SSR1x0 Devices:

8. At the instruction in the terminal window: `Press ESC for the boot menu`, do so. 

	![Boot Menu prompt](/img/putty-ssr1x0-boot-menu.png)

9. From the boot menu, select the USB Boot device and press Enter; or enter the boot device number and press Enter.
10. Select the image for your install.
11. After the re-installation completes, follow the [Installation Using OTP](intro_otp_iso_install.mdx) instructions to complete the installation process.

#### SSR1x00 Devices

8. At the instruction in the terminal window: `Press <Tab> or <DEL> to enter Setup`, do so.

	![Setup Menu Prompt](/img/1x00_setup_menu.png)

9. When the Setup Utility window appears, use the left and right arrow keys to navigate to the `Save & Exit` tab.
	
	![Setup Utility](/img/setup-menu-prompt.png)

10. Use the up and down arrow keys to highlight the boot device in the the Boot Override list.

	![Boot Override list](/img/1x00_boot-override.png)

11. Press Enter to confirm boot from the USB device.
12. After the re-installation completes, follow the [Installation Using OTP](intro_otp_iso_install.mdx) instructions to complete the installation process.




