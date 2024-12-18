---
title: USB Boot and Storage Security
sidebar_label: USB Boot and Storage Security
---

This document provides guidance on disabling USB booting and storage in the SSR BIOS, and disabling USB storage in the Operating System. 

The steps to disable USB storage in the BIOS vary depending on the model of SSR system, while the steps for disabling USB storage in the operating system are the same across all models.

These steps assume that you have a working and configured connection to the serial port on the device.

### Disabling USB Storage on the BIOS: SSR120 and SSR130

When an administrator password is set in the SSR120 or SSR130 BIOS, USB mass storage devices are not presented as options in the boot order, nor are they offered as a single boot override option when the BIOS is not in administrator mode. 

1. If the system is powered off, power it on. If it is currently running, reboot it from the linux shell. When the system reboots, the message `Press ESC for boot menu` will appear. 

2. Press `Escape`. The following menu appears:

```
Select boot device:

    1. AHCI/1: KINGSTON SA400M8120G ATA-10 Hard-Disk (111 GiBytes)
    2. iPXE (PCI 04:00.0)
    3. iPXE (PCI 04:00.1)
    4. Payload [admin]
    5. Payload [setup]

    t. TPM Configuration
```

 The exact number of entries in this list are determined by the devices plugged into the unit at the time, and if the BIOS is already in administrator mode. 

3. Locate the entry labeled `Payload [admin]` and enter the number. 

4. In the `Payload [admin]` menu, enter `e` to enter the administrator mode before proceeding. 

 `e Enter administrator mode`

 If prompted for a password, press `<enter>`.

 Once in administrator mode, there will be an entry to change the password:

 `c Change Password`

5. Press `c` to change the administrator password. 

6. When prompted, enter the new administrator password and then enter it again to verify.

7. Press `l` to leave administrator mode.

8. Press `s` to save these changes and exit.

Upon subsequent boots, if interrupted with `esc` when prompted, USB devices will not be shown as bootable devices. To reset the USB as a bootable device, the password set in the steps above will be required to re-enter administrator mode.

### BIOS on SSR1200 SSR1300 SSR1400 SSR1500

On the SSR1200, SSR1300, SSR1400, SSR1500 the BIOS contains configuration specifically for USB mass storage devices.

1. If the unit is powered off, power it on. If it is already running, reboot it
from the linux shell.

2. When prompted, press a key to enter setup.

3. Use the `right arrow` key to move to the tab labeled `Advanced`. 

![BIOS Advanced Tab](/img/sec-bios-adv-tab.png)

4. Use the `down arrow` key to select `USB Configuration`. 

5. Use the `down arrow` key to select the `USB Mass Storage Driver Support` menu entry. 

6. Press `enter`.

![USB Mass Storage](/img/sec-usb-storage-disable.png)

7. Select `Disabled`.

8. Exit the BIOS.

#### BIOS Passwords

Please use the BIOS menus to enable/set the BIOS password.

### Disabling the USB Storage Module

Use the following procedure to disable the USB storage module in the Operating System. This process applies to all SSR devices. 

1. As the `root` user in the linux shell, create the following file, with the contents and permissions shown here:

 ```
chown root:root /etc/modprobe.d/disable-usb-storage.conf
chmod 644 /etc/modprobe.d/disable-usb-storage.conf
 ```

2. Verify that the following module is disabled using each of the commands below. 
	- The `rmmod` command may return a **Module not loaded** error if there are no USB storage devices connected.
 	```
 	rmmod usb-storage
 	modprobe usb-storage
 	```
	- The `lsmod` command should succeed without error, eturn no output, and the module will remain unloaded:

	`lsmod | grep usb_storage`

3. Rebuild initramfs images with the command

 `dracut -f --regenerate-all`

4. Reboot, and verify that the `usb_storage` module does not load.

 `lsmod | grep usb-storage`

