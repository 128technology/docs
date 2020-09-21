---
title: Installing From Bootable Media
sidebar_label: Installing from Bootable Media
---

This section assumes you have already created a bootable device, either a USB or CD/DVD/Blueray disk. Instructions for downloading and creating a bootable device are available in [Downloading a 128T ISO](intro_downloading_iso.md)and [Creating a Bootable USB](intro_creating_bootable_usb.md).

### BIOS Configuration

It may be necessary to change the target system’s BIOS settings to allow booting from removable media. Consult your hardware vendor’s documentation (or pay close attention to the messages displayed during the boot sequence!) to enter into the BIOS to validate that it will boot from USB/CD-ROM/DVD, as necessary.

![BIOS Screen](/img/intro_installation_bootable_media_bios.png)

### Installing the ISO

After imaging the ISO onto removable media, insert it into the target machine and power it on.

#### Choose the Installation Type

Upon boot, you are prompted with the following screen for the Linux installation:

![Boot Screen](/img/intro_installation_bootable_media_boot.png)

:::note
Not all hardware has video support, therefore booting to console is the default (a console user may not be able to select an option). The default option is selected after a 30 second timeout.
::: 

##### 128T Router via Serial Console

Use this option when running on hardware with no video chipset. It uses `/dev/ttyS0` as the serial console for interacting with the installer.

:::note
Selecting the wrong type of console may result in garbage characters being displayed and the install hanging. If this is the case, reboot the target system and select the correct line for the target hardware.
::: 

##### 128T Router with VGA Console

Use this option when running on hardware that has onboard graphics chipsets. This installs 128T using the GUI installer.

#### 128T Installation

After the Linux installation completes, the 128T software installation begins. Note that this may take several minutes to complete. After the installation has completed, the following screen is displayed:

![Installation Complete](/img/intro_installation_bootable_media_install_complete.png)

### Installation Notes

1. The following user accounts and passwords are created during the ISO installation process:

   | Username | Password   |
   | -------- | ---------- |
   | root     | 128tRoutes |
   | t128     | 128tRoutes |

   It is *strongly recommended* that you change these passwords immediately.

2. GUI login via HTTPS is enabled by default on port 443.
