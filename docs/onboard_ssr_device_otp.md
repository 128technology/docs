---
title: Onboard an SSR Device using OTP
sidebar_label: Onboard an SSR Device using OTP
---

The steps in this section describe the process of **re-imaging an SSR1x0 or SSR1x00** for onboarding to a Conductor using the OTP process. This process is for SSR devices that **cannot** use Mist for onboarding, telemetry, or WAN Assurance. 

:::important
For customers or partners who can access Mist and are not in an "air-gap" network, the easiest way to onboard an SSR Device is to configure an account on Mist (this is free), and onboard to a conductor using ZTP. This provides a simple conductor onboarding process, and does not require access to Mist after the onboarding. See [ZTP Onboarding to a Conductor.](config_wan_assurance.md) **This process provides the ability to perform conductor-managed onboarding for customers who will not be using Mist Telemetry or WAN Assurance.**  
:::

## Re-Imaging Process

The image shipped on the SSR Devices is designed to connect with Mist and Mist WAN Assurance. To use these devices in a conductor-managed environment that does not have access to Mist, re-image the SSR Device with a generally available, package-based, OTP-compatible SSR software release. The minimum requirement for this re-imaging process is SSR Version 5.4.9. OTP software images are located at the following link:

<!-- markdown-link-check-disable-next-line -->
- https://software.128technology.com/artifactory/list/generic-128t-isos-release-local

You will be prompted for your username and token to access the web page listing the software versions, and will be able to download directly from the page.

See [Downloading an ISO](intro_downloading_iso.md#downloading-an-iso) for important information about the download process.

:::note
Use of a non-GA software release will void the Juniper device warranty. Refer to [**SSR Releases - General Availability**](about_releases.mdx#general-availability) for the list of GA releases.
:::

### Prerequisites

- To successfully onboard an SSR using OTP, you must already have a [Conductor up and running](install_conductor_overview.md) in the network where the SSR router can connect and receive configuration information. 

- The conductor **must have** a software version equal to or greater than the version that will be installed on the routers using OTP. 

- To retain a valid warranty, the software used to re-image the SSR device must be an [**official Juniper GA Release of the SSR Software**](about_releases.mdx#general-availability), and at a minumum, version 5.4.9. 

## OTP Re-Imaging Process

The process varies based on the SSR Device, as well as Mac and Windows. 

### Mac Re-Imaging Process

#### Use the following procedure to re-image SSR Devices:

1. Use the procedure [Creating a Bootable USB from an ISO](intro_creating_bootable_usb.md) to download the package-based ISO and create a bootable USB. Once you have completed that step, continue below. 
2. Connect the RJ45/USB cable to the console port on the SSR1x0/1x00.
3. Connect the USB end of the cable to your computer.
4. Connect the power input to the back of the SSR1x0/1x00, but do not power it up. 
5. Open a terminal window.
6. Run the following command to identify the USB port: 
```
	ls -al /dev/*usb*
```
7. Copy the serial port info displayed after running the command above. 
8. In the terminal window, type `screen`, paste the serial port info, and add the baud rate as shown in the example below. 
```
	screen /dev/tty.usbserial-A50285BI 115200
```
9. Press Enter.
10. Insert your USB with the new ISO image into the USB port of the SSR device.
11. Power up the SSR device. 
12. Use the instructions below appropriate for your device (SSR1x0 or SSR1x00) to complete the re-imaging process.

#### SSR1x0 Devices

1. At the instruction in the terminal window: `Press ESC for boot menu`, do so. 

	![Boot Menu prompt](/img/onboard_otp_boot_menu.png)

2. From the boot menu, select the USB Boot device and press Enter; or enter the boot device number and press Enter.

	![Select Boot Device](/img/onboard_otp_boot_device.png)

3. Select the image for your install.
4. When the USB installer boot menu is displayed, follow the [Installing SSR Using OTP](intro_otp_iso_install.mdx#installing-ssr-using-one-touch-provisioning-otp) instructions to complete the installation process.

#### SSR1x00 Devices

1. At the instruction in the terminal window: `Press <Tab> or <DEL> to enter Setup`, do so.

	![Setup Menu Prompt](/img/1x00_setup_menu.png)

2. When the Setup Utility window appears, use the left and right arrow keys to navigate to the `Save & Exit` tab.
3. Use the up and down arrow keys to highlight the boot device in the the Boot Override list.

	![Boot Override list](/img/1x00_boot-override.png)

4. Press Enter to confirm boot from the USB device.
5. When the USB installer boot menu is displayed, follow the [Installing SSR Using OTP](intro_otp_iso_install.mdx#installing-ssr-using-one-touch-provisioning-otp) instructions to complete the installation process.

### Windows Re-Imaging Process

 1. Use the procedure [Creating a Bootable USB from an ISO](intro_creating_bootable_usb.md) to download the package-based ISO and create a bootable USB. Once you have completed that step, continue below. 
2. Connect the RJ45/USB cable to the console port on the SSR1x0/1x00.
3. Connect the USB end of the cable to your laptop.
4. Connect the power input to the back of the SSR1x0/1x00, but do not power it up. 
5. From the Windows Device Manager, open a [PuTTY](https://www.putty.org/) session, and select the serial port and baud rate.
	
	![PuTTY window](/img/putty-window.png)

6. Insert your USB with the new ISO image into the USB port of the SSR1x0/1x00.
7. Power up the SSR device. 
8. Use the instructions below appropriate for your device (SSR1x0 or SSR1x00) to complete the re-imaging process.

#### SSR1x0 Devices:

1. At the instruction in the terminal window: `Press ESC for the boot menu`, do so. 

	![Boot Menu prompt](/img/onboard_otp_boot_device.png)

2. From the boot menu, type the boot device number and press Enter.
3. When the USB installer boot menu is displayed, follow the [Installing SSR Using OTP](intro_otp_iso_install.mdx#installing-ssr-using-one-touch-provisioning-otp) instructions to complete the installation process.

#### SSR1x00 Devices

1. At the instruction in the terminal window: `Press <Tab> or <DEL> to enter Setup`, do so.

	![Setup Menu Prompt](/img/1x00_setup_menu.png)

2. When the Setup Utility window appears, use the left and right arrow keys to navigate to the `Save & Exit` tab.
	
	![Setup Utility](/img/setup-menu-prompt.png)

3. Use the up and down arrow keys to highlight the boot device in the the Boot Override list.

	![Boot Override list](/img/1x00_boot-override.png)

4. Press Enter to confirm boot from the USB device.
5. When the USB installer boot menu is displayed, follow the [Installing SSR Using OTP](intro_otp_iso_install.mdx#installing-ssr-using-one-touch-provisioning-otp) instructions to complete the installation process.




