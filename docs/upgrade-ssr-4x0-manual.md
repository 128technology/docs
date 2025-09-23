---
title: Upgrade the SSR400/440
sidebars_label: Upgrade the SSR400/440
---

Use the following procedure to upgrade an SSR400/440 in an air gap network.

This procedure assumes you have already copied the SSR-7.1.x*.aarch64*.iso to a USB flash drive. For information about the procedure, see [Creating a Bootable USB](intro_creating_bootable_usb.md). 

1. Insert the USB with the new image into the USB-C port on the rear of the device.
2. Power the system on and at the prompt, press **Esc** to boot from the USB. The USB installer boots as follows:

```
Esc pressed, booting from USB
starting USB...
Bus usb3@500000: Register 2000120 NbrPorts 2
Starting the controller
USB XHCI 1.00
Bus usb3@510000: Register 2000120 NbrPorts 2
Starting the controller
USB XHCI 1.00
scanning bus usb3@500000 for devices... 1 USB Device(s) found
scanning bus usb3@510000 for devices... 2 USB Device(s) found
       scanning usb for storage devices... 1 Storage Device(s) found
1404928 bytes read in 44 ms (30.5 MiB/s)
Booting /EFI\BOOT\BOOTAA64.EFI
The secondary flash is locked
The primary flash is locked

                                 GRUB version 2.06

 ┌────────────────────────────────────────────────────────────────────────────
 │*Install Session Smart Router - SSR400-CW-US                                │ 
 │ Maintenance Operations -->                                                 │
 │                                                                            │
 │                                                                            │
 │                                                                            │
 │                                                                            │
 │                                                                            │
 │                                                                            │
 │                                                                            │
 │                                                                            │
 │                                                                            │
 │                                                                            │
 │                                                                            │
 │                                                                            │
 │                                                                            │
 │                                                                            │
 │                                                                            │
 │                                                                            │
 │                                                                            │
 │                                                                            │
 │                                                                            │
 │                                                                            │
 │                                                                            │
 └────────────────────────────────────────────────────────────────────────────┘
      Use the ▲ and ▼ keys to select which entry is highlighted.                                            
      Press enter to boot the selected OS
                                                                    
   The highlighted entry will be executed automatically in 30s...
```

3. Press **Enter** or wait for the countdown timer to expire. The SSR OS installer boots:

```
Loading signature database
Loading kernel and verifying signature...
Loading ramfs and verifying signature...
Booting...
EFI stub: Booting Linux Kernel...
EFI stub: EFI_RNG_PROTOCOL unavailable
EFI stub: Using DTB from configuration table
EFI stub: Exiting boot services...

[    0.000000] Booting Linux on physical CPU 0x0000000000 [0x410fd083]
[    0.000000] Linux version 5.15.0-308.179.6.3.el9uek.128tech.30.aarch64
[    0.000000] Machine model: CN9130-Leopard
[    0.000000] efi: EFI v2.100 by Das U-Boot
[    0.000000] secureboot: Secure boot enabled
...
```

4. Once the installer has booted, the following menu is displayed:

```
Welcome to the Session Smart Router Installer for SSR-7.1.0-1.r1.el9.aarch64.ibu-v0

Skipping removable device /dev/sda
Disk device /dev/mmcblk0 has size 83 GB

Install Options:
  1 - FIPS 140-3 : ENABLED 
  2 - Cloud-init : DISABLED

Press a number/letter to change current selections,
[Esc] to reboot or [Enter] to start the installation: 

Installation will begin in 30 seconds...
```

5. The default install options for the SSR400 series are **FIPS enabled** and **cloud-init disabled**. Press 1 or 2 to toggle the options if required. Press **Enter**, or wait for the countdown timer to expire. The System LED flashes Teal, indicating the installation is in progress.

``` 
Install device selections total 2 GB for boot and 81 GB for root

Install Configuration:
MIN_RAM_MB=7000
MIN_BOOT_GB=2
MIN_ROOT_GB=58
CLOUDINIT_ENABLE=0
FIPS_ENABLE=1
BOOT_INSTALL_DEV=/dev/mmcblk0
ROOT_INSTALL_DEV=/dev/mmcblk0

Launching unpacker...
cloud-init will be disabled
Building for aarch64
/dev/mapper/live-rw on / type ext4 (rw,relatime)
Removing detected vg00 volume group.
Erasing device /dev/mmcblk0
Creating partitions on target /dev/mmcblk0
Writing first stage bootloader on target /dev/mmcblk0
Writing second stage bootloader on target /dev/mmcblk0
Writing rootfs on target /dev/mmcblk0
Decompressing image slice 1 of 5
Decompressing image slice 2 of 5
Decompressing image slice 3 of 5
Decompressing image slice 4 of 5
Decompressing image slice 5 of 5
Applying boot configuration defaults
Adding boot config
Adding CN9130-Leopard nic interface rename files
Pre-populating saved package repository

unpacker was successful

Press [Esc] to reboot or [Enter] to shutdown:

System will shutdown in 30 seconds...
```

6. Press **Esc** to reboot the system. Optionally, you can choose to power down and power up the system. 

7. After the OS boot has completed, the hardware bootstrapper runs. The System LED will briefly change to Teal during this activity. Once the SSR software application is up and running, the system LED will show:

 - Red for out-of-service
 - Amber for degraded service
 - Green for in-service

After the device has booted into the SSR software, you must initialize your device as either a Conductor, conductor-managed Router, or a Mist-managed Router. The recommended method is using the Web Interface. 

As a first step, connect your laptop or other device to any of the designated LAN ports and connect to 192.168.128.1 to access the [SSR initialization Web Workflow](initialize_u-iso_device.md). 

If you prefer to use the command line interface, use the information provided in the [Advanced Initialization](initialize_u-iso_adv_workflow.md) workflow.

