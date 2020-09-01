---
title: Creating a Bootable USB from ISO
sidebar_label: Creating Bootable USB
---

## Introduction

128 Technology distributes its software as a set of RPM packages, an ISO, or a container. The ISO is most commonly used to stage a system when it does not have an operating system or if the system is being repurposed as a 128T.

The goal of this guide is produce a bootable USB drive from a 128T ISO.

## Linux and macOS

Creating a bootable ISO from Linux or the MacOS is straightforward. You must have administrative privileges to the system.

1. Download the ISO for the software version to be loaded onto the USB. Use the [download instructions](intro_downloading_iso.md). This example uses `128T-OTP-4.2.4-1.el7.x86_64.iso`

2. Locate the USB volume name of the target drive (in this example, “disk2s1”) with the `diskutil` command.

```
diskutil list
```

3. Use the command below to copy the ISO image onto the USB. 

```
sudo diskutil unmount /dev/disk2s1
sudo dd if=~/128T-OTP-4.2.4-1.el7.x86_64.iso of=/dev/rdisk2 bs=16384
diskutil eject /dev/disk2s1
```

## Windows

### Prerequisites

- Install Rufus software https://rufus.akeo.ie/downloads/ [^1]
- Verify in system BIOS that the USB drive is listed in the boot priority properly
[^1]: tested on version 2.18.1213

### Procedure
1. Launch Rufus.
2. Select the USB Device.
3. Select **MBR partition scheme for BIOS or UEFI**.
4. Select the 128T ISO.
5. Click **Start**.
6. Select **Write in ISO image mode**.
7. Click **OK**.

## System Preparation

- Ensure that the platform meets minimal 128T hardware requirements
- BIOS configured to boot off from USB drive first

## Further Resources

Additional information on Bootable USB creation tools can be found here:

https://www.pcsteps.com/1461-create-linux-installation-usb-dvd/