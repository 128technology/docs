---
title: Creating a Bootable USB from ISO
sidebar_label: Creating Bootable USB
---

## Introduction

128 Technology distributes our software as a set of applications, an ISO, or a container. The ISO is most commonly used to stage a system that does not have an operating system, or if the system is being repurposed as a 128T system. The goal of this guide is produce a bootable USB drive from a 128T ISO.

### Bootable USB

For small deployments or a proof of concept, each image can be loaded on to a bootable USB to install the operating system and 128T software. Follow the [instructions for installing from bootable media](intro_installation_bootable_media.md). After installation, the platform will power off.

### Disk Cloning

Another method that can be used to perform multiple installations quickly and efficiently is Disk Cloning. After the initial ISO installation and power off, the platform is generic and can be cloned to a bootable USB to create a master copy of that platform. 
:::note
When using cloned images, an identical hardware platform must be used. Create a new master image for each hardware variation.
:::
The cloned platform disk is then used to install the filesystem and 128T software on any number of other identical hardware platforms. 

The high level steps are as follows:

- The platform is installed using an ISO image which powers down on success.
- Use Clonezilla or other Live USB to copy the platform on to bootable media.
- Distribute the cloned disk using USB, multicast, or other technique.

Refer to [Installing from an ISO](intro_otp_iso_install.md) for installation information.


### Creating a CDROM/DVD

For systems with an onboard optical drive, it may be preferable to write the ISO to a CD, DVD, or BlueRay disk. There are many tools available on the major platforms to write ISOs to optical discs, suck as K3b, Disco, etc. Those procedures are not addressed here. 

## Linux and macOS

Creating a bootable ISO from Linux or the MacOS is straightforward. You must have administrative privileges to the system.

1. Download the ISO for the software version to be loaded onto the USB. Use the [download instructions](intro_downloading_iso.md). 

2. Locate the USB volume name of the target drive (in this example, “disk2s1”) with the `diskutil` command.

```
diskutil list
```

3. Use the command below to copy the ISO image onto the USB. 

```
sudo diskutil unmount /dev/disk2s1
sudo dd if=~/128T-<VERSION>.el7.x86_64.iso of=/dev/rdisk2 bs=16384
diskutil eject /dev/disk2s1
```
Where `<VERSION>` is replaced with the 128T version you are interested in.

## Windows

Before beginning, install the Rufus software https://rufus.akeo.ie/downloads/ on your Windows system. [^1]

### Procedure
1. Launch Rufus.
2. Select the USB Device.
3. Select **MBR partition scheme for BIOS or UEFI**.
4. Select the 128T ISO.
5. Click **Start**.
6. Select **Write in ISO image mode**.
7. Click **OK**.

;;;note
The 128 Technology ISOs are desiged to be installed on both BIOS and uEFI partitions, however hardware support varies. Please check your hardware configuration requirements before specifying one or the other during install. 
:::

## Further Resources

Additional information on Bootable USB creation tools can be found here:

https://www.pcsteps.com/1461-create-linux-installation-usb-dvd/

[^1]: tested with version 2.18.1213

