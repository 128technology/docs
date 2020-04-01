---
title: Installing From ISO
sidebar_label: Installing From ISO
---



## Installing from bootable Media

Before you begin, you must first [obtain a 128T ISO](intro_downloading_iso). If you are planning on using a bootable USB device, follow the instructions for [creating a bootable USB](intro_creating_bootable_usb).

##### Creating a CDROM/DVD

Rather than writing the ISO to a USB stick, it may be preferable on systems with an onboard optical drive to write the ISO to CD/DVD/BlueRay. There are many tools available on all of the major platforms to write ISOs to optical discs, suck as K3b, Disco, etc.

#### BIOS Configuration

It may be necessary to change the target system’s BIOS settings to allow booting from removable media. Consult your hardware vendor’s documentation (or pay close attention to the messages displayed during the boot sequence!) to enter into the BIOS to validate that it will boot from USB/CD-ROM/DVD, as necessary.

After imaging the ISO onto removable media, insert it into the target machine and power it on.

### Installing the ISO

#### Choose the Installation Type

Note: because not all hardware has video support, booting to console is the default (to account for the fact that a console user may not be able to select an option). The default option is selected after a 30 second timeout.

##### 128T Router via Serial Console

Use this option when running on hardware with no video chipset. It uses /dev/ttyS0 as the serial console for interacting with the installer.
Note: selecting the wrong type of console may result in garbage characters being displayed and the install hanging. If this is the case, reboot the target system and select the correct line for the target hardware.

##### 128T Router with VGA Console

Use this option when running on hardware that has onboard graphics chipsets. This installs 128T using the GUI installer.

##### CentOS Linux Only

Selecting this option will only install the CentOS 7 Linux operating system. It uses a GUI installer.


#### 128T Installation

Once Linux is installed, the system will install the 128T software. Note that this may several minutes to complete.

At this point, please remove the install media and select **Yes** to reboot the system. Upon reboot, the system will begin the 128T initialization process.

#### Initialization of the Node

The initialization of the new node will follow the standard process outlined in the 128T Installation Guide. Please refer to that document for details on how to initialize your system.

### Installation Notes

1. The following user accounts and passwords are created during the ISO installation process:

   | Username | Password   |
   | -------- | ---------- |
   | root     | 128tRoutes |
   | t128     | 128tRoutes |

   It is *strongly recommended* that you change these passwords immediately.

2. GUI login via HTTPS is enabled by default on port 443.
