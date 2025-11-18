--- 
title: SSR400 and SSR440 Software Installation 
sidebar_label: SSR400 and SSR440 Software Installation
---

Use the following process to manually install software on an SSR400 or SSR440.

1. Connect a VT terminal emulator to the front USB-C serial console, at a baud rate of 115200.
2. Power on the device.
3. The System LED will flash Red -> Red, indicating a hardware reset in progress.

```
BootROM - 2.03
Starting CP-0 IOROM 1.07
Booting from SPI NOR flash 0 (0x34)
Found valid image at boot postion 0x000
```

4. System LED will begin a slow flash from Red to Amber, indicating a firmware boot in progress.

```
BootROM - 2.03
Starting CP-0 IOROM 1.07
Booting from SPI NOR flash 0 (0x34)
Found valid image at boot postion 0x000     

U-Boot 2023.01-dev_12.25.06-33 (Aug 15 2025 - 10:03:56 EDT)

           CPLD version: 1f
    Golden CPLD version: 1f
       Firmware version: 12.25.06-33
 Golden firmware version: 12.25.06-33


Press Esc to boot from USB
```

There are two boot modes available; Normal System Boot, and USB Boot. The SSR4x0 is shipped with SSR 7.1 software. If you are installing a new version via USB, [press `ESC` to boot from the USB](#usb-install-boot). Otherwise after 5 seconds, the system LED will begin a slow flash from Green to Amber, indicating an SSR software boot is in progress.

### Normal System Boot

Before a normal boot, the firmware will check the system and compare against the firmware capsule versions available on disk. Any required firmware updates will be installed automatically.

The System LED will begin a slow flash from Amber to Amber to indicate a firmware update is in progress

:::note
Multiple firmware updates may be installed with an automatic reboot after each. Do not power cycle or interrupt the firmware update process.
:::

```
Found 1 update capsule on disk
disk:00-cn9130-leopard-flash-image-12.25.06-33-signed.capsule:firmware:33

Capsule 1 of 1: disk:00-cn9130-leopard-flash-image-12.25.06-33-signed.capsule
Firmware: capsule version is 33, current version is 32
Reading capsule
Applying capsule
The primary flash is unlocked
Capsule authentication successful
########################################################################
########################################################################
########################################################################
########################################################################
####################################
Apply succeeded.

Rebooting...

```
Subsequent boots skip the already-installed updates, and will continue to the bootloader menu.

```
Found 2 update capsules on disk
disk:00-cn9130-leopard-flash-image-12.25.06-33-signed.capsule:firmware:33  
disk:01-cn9130-leopard-cpld-1f-signed.capsule:cpld:1f 
Capsule 1 of 2: disk:00-cn9130-leopard-flash-image-12.25.06-33-signed.capsule
Firmware: capsule version is 33, current version is 33
Skipping capsule
Capsule 2 of 2: disk:01-cn9130-leopard-cpld-1f-signed.capsule
CPLD: capsule version is 1f, current version is 1f
Skipping capsule
```

System LED will be Green Amber, to indicate booting is in progress.
 
SSR image A is installed by default.
If an upgrade has been performed, the menu will display images A and B. 

```
switch to partitions #0, OK 
mmc0(part 0) is current device 
1404928 bytes read in 111 ms (12.1 MiB/s)                                          
Booting /EFI\BOOT\BOOTAA64.EFI                                              
The secondary flash is locked                                        
The primary flash is locked                                   
Loading signature database A                    
Loading signature database B


                                 GRUB version 2.06

 ┌────────────────────────────────────────────────────────────────────────────
 │* Boot image A: SSR-7.1.0                                                   │ 
 │  Boot image B: SSR-7.2.0                                                   │
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
                                                                    
   The highlighted entry will be executed automatically in 5s...

```

If no selection is made, the default image will boot after 5 seconds.

```
  Booting `Boot image A: SSR-7.1.0'

Loading kernel A and verifying signature...
Loading ramfs A and verifying signature...
Booting...


Oracle Linux Server 9.6
Kernel 5.15.0-310.184.5.2.el9uek.128tech.32.aarch64 on an aarch64

localhost login:

```

System LED will be Amber, to indicate SSR OS boot in progress.

After OS boot has completed, the hardware bootstrapper will run. System LED will briefly change to Teal during this activity.

Once the SSR 128T software application is up and running, System LED will show:
•	Red for out-of-service
•	Amber for degraded service
•	Green for in-service

### USB Install Boot

1. Burn SSR-7.1.0*.aarch64*.iso to a [USB flash drive](intro_creating_bootable_usb.md) and insert into the rear USB-C.
2. Power on, at the prompt Press Esc to boot from USB. 

The USB installer will boot:

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
3. Press enter or wait for the countdown timer to expire. The SSR OS installer will boot:

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

After installer has booted the following menu is displayed:

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

System LED will change to Teal Teal, to indicate installation is in progress
Default install options for SSR-400 series are FIPS enabled and cloud-init disabled.
Press 1 or 2 to toggle the options if required.
Press enter or wait for the countdown timer to expire, then disk install will begin.

Installation sequence:
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
