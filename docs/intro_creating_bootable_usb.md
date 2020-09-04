---
title: Creating a Bootable USB from ISO
sidebar_label: Creating Bootable USB
---

## Introduction

128 Technology distributes its software as a set of RPM packages, an ISO or a container.  The ISO is most commonly used to stage a system when it does not have an operating system or if the system is being repurposed as a 128T.

The goal of this guide is produce a bootable USB drive from a 128T ISO.

The first step is to acquire an ISO of the version of software that is intended to be loaded onto the bootable USB media following the [download instructions](intro_downloading_iso.md).

## Linux and macOS

Creating a bootable ISO from OS is straightforward.  The only requirements are that you need administrative privileges to the system.

Locate the USB volume name of the target drive (in this example, “disk2s1”) with the `diskutil` command.

```
diskutil list
```

Once you have identified the target USB device, ensure that you have ISO already copied onto the machine creating the bootable USB.  This example uses `128T-OTP-4.2.4-1.el7.x86_64.iso`

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
- Launch Rufus
- Select the USB Device
- Select "MBR partition scheme for BIOS or UEFI"
- Select the 128T ISO
- Click "Start"
- Select "Write in ISO image mode"
- Click "OK"

## System Preparation

- Ensure that the platform meets minimal 128T hardware requirements
- BIOS configured to boot off from USB drive first

## Further Resources

Additional information on other available possible USB bootable creation tools can be found here as well:

https://www.pcsteps.com/1461-create-linux-installation-usb-dvd/