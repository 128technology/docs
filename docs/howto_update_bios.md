---
title: SSR1300 and SSR1400 BIOS Upgrade for the Intel X722
sidebar_labe: SSR1300 and SSR1400 BIOS Upgrade for the Intel X722
---

Juniper SSR1300 and SSR1400 incorporate Intel X722 NICs. To support the LLDP feature available in SSR releases 6.1 and greater, a BIOS upgrade to version 4.09 is required. This BIOS version contains updated Intel Management Engine (ME) and X722 NIC firmware, which is required for the LLDP feature. 

The Intel X722 NIC will be referred to as the X722 or X722 NIC for the remainder of this document. 

In order to fully integrate the new Intel ME firmware delivered by the BIOS, the software powers down the system after the firmware upgrade, and the user must manually power the system back up. 

Although the update procedure can be initiated remotely over ssh, personnel must be available **ON SITE** to perform the mandatory post-update power cycle.

### Affected Hardware

- SSR1300
- SSR1400

### Prerequsites

- BIOS update package: `afulnx-5.16.02.0111-3.el7.x86_64.rpm`
- SSH or console for root access to the target system
- Personnel available on site to perform power cycle

#### Version Checks

To verify the BIOS version use the `dmidecode` command:

```
$ dmidecode -s bios-version
SSR1300V408
```

In this example, the BIOS version of the SSR1300 is `4.08`.

To verify the NIC firmware version, first find the X722 PCI address:

```
[t128@PERF-SSR1300-AR49230058 ~]$ lspci | grep X722
6a:00.0 Ethernet controller: Intel Corporation Ethernet Connection X722 for 10GbE SFP+ (rev 04)
6a:00.1 Ethernet controller: Intel Corporation Ethernet Connection X722 for 10GbE SFP+ (rev 04)
6a:00.2 Ethernet controller: Intel Corporation Ethernet Connection X722 for 10GbE SFP+ (rev 04)
6a:00.3 Ethernet controller: Intel Corporation Ethernet Connection X722 for 10GbE SFP+ (rev 04)
```

Using the PCI address found above (6a:00), use `dmesg` to identify the firmware version:

```
[t128@PERF-SSR1300-AR49230058 ~]$ dmesg |grep 6a:00 | grep nvm
[    5.373011] i40e 0000:6a:00.0: fw 5.6.74624 api 1.12 nvm 6.20 0x80004200 1.3353.0
[    5.497829] i40e 0000:6a:00.1: fw 5.6.74624 api 1.12 nvm 6.20 0x80004200 1.3353.0
[    5.666600] i40e 0000:6a:00.2: fw 5.6.74624 api 1.12 nvm 6.20 0x80004200 1.3353.0
[    5.812634] i40e 0000:6a:00.3: fw 5.6.74624 api 1.12 nvm 6.20 0x80004200 1.3353.0
```
In the example above, the X722 firmware version is 6.20.

Alternatively, if the X722 NIC is bound to linux only, you can use `ethtool`:

```
[root@PERF-SSR1300-AR49230058 t128]# ethtool -i xe-0-0
driver: i40e
version: 2.16.11
firmware-version: 6.20 0x80004200 1.3353.0
expansion-rom-version: 
bus-info: 0000:6a:00.0
supports-statistics: yes
supports-test: yes
supports-eeprom-access: yes
supports-register-dump: yes
supports-priv-flags: yes
```

## Installation

The BIOS update package can be installed using either of two methods:
- On-line install from Juniper SSR repositories
- RPM download & off-line installation

### Online Installation from the SSR Repository

On systems with internet access, use the following steps to download and install the updated BIOS RPM package from the SSR Repositories. 

1. Login to your SSR device using SSH or through the console.
2. Enter the following command:
  `sudo dnf install -y afulnx`

```
sudo dnf install -y afulnx-5.16.02.0111-3

Dependencies resolved.
========================================================================================================================
 Package                Arch                   Version                               Repository                    Size
========================================================================================================================
Installing:
 afulnx                 x86_64                 5.16.02.0111-3.el7                    @commandline                  13 M

Transaction Summary
========================================================================================================================
Install  1 Package

Total size: 13 M
Installed size: 66 M
Downloading Packages:
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                                1/1 
  Installing       : afulnx-5.16.02.0111-3.el7.x86_64                                                               1/1 
  Verifying        : afulnx-5.16.02.0111-3.el7.x86_64                                                               1/1 

Installed:
  afulnx.x86_64 5.16.02.0111-3.el7                                                                                      

Complete!

```

Proceed with the next step, [Upgrading the BIOS and Firmware](#upgrading-the-bios-and-x722-firmware).

### RPM Download and Off-line Installation

For systems that do not have internet access (air-gap systems), you can download the BIOS update package `afulnx-5.16.02.0111-3.el7.x86_64.rpm` from the SSR repository. This method requires saving the RPM to a USB device and then copying it into the `/tmp` directory of the SSR. Use the following steps to perform the download and installation:

1. From an internet connected computer, download the BIOS update package from the following repository to a USB drive:
  `https://software.128technology.com/artifactory/list/rpm-128t-deps-release-local/CentOS/7.5/packaging/afulnx-5.16.02.0111-3.el7.x86_64.rpm` 
2. Login to your SSR device using SSH or through the console.
3. Insert the USB into the SSR device.
4. Download the BIOS update RPM into the `/tmp` directory on the target SSR device.
5. Enter the following command:
  `sudo dnf install -y /tmp/afulnx-5.16.02.0111-3.el7.x86_64.rpm`

Proceed with the next step, [Upgrading the BIOS and Firmware](#upgrading-the-bios-and-x722-firmware).

## Upgrading the BIOS and X722 firmware

After the upgrade package has been installed onto your SSR hardware, the BIOS and X722 firmware must be upgraded. 

1. Enter the following command:
  `sudo /usr/libexec/update_bios.sh`

2. When prompted, confirm [`Y`] that you understand this will shut down the system, and a manual power cycle will be required from on-site personnel to resume service.

:::important
DO NOT INTERRUPT THIS PROCESS AFTER CONFIRMING! Doing so may result in an unbootable system, requiring it to be returned to the factory for reprogramming.
:::

3. The upgrade process takes place:
  - Current BIOS version is saved as a backup
  - Current DMI information (serial number etc) is saved
  - BIOS, ME and NIC firmware is updated
  - Saved DMI information is programmed into the new BIOS
  - The system initiates a controlled shutdown and power-off

  The update process can take up to 10 minutes, from confirmation to initiating system shutdown.

4. On site personnel **must** perform the following post-update power cycle. Power cycle the unit as follows:
  - Remove all power cords from the system 
  - Wait 30 seconds 
  - Reconnect all power cords to the system 

The system will boot using the new v4.09 BIOS and v6.5 X722 firmware

### Sample Upgrade Output

```
[root@as43220096]# /usr/libexec/update_bios.sh 

Current BIOS version SSR1400V405 will be updated using FNCA5520C0SSR6B409.BIN

WARNING: Continuing will automatically shut down this system after BIOS update
         A manual power cycle will be required to resume service

Continue? [y/n] : y

+---------------------------------------------------------------------------+
|                 AMI Firmware Update Utility v5.16.02.0111                 |
|      Copyright (c) 1985-2023, American Megatrends International LLC.      |
|         All rights reserved. Subject to AMI licensing agreement.          |
+---------------------------------------------------------------------------+
 Saving current BIOS into file: /usr/libexec/afulnx64/SSR1400V405.saved
 Reading flash ............... done                

 Process completed.

Saving DMI: AS43220096 0002 0002 AS43220096 AS43220096 71C15841-ECD5-5C49-9D13-447D356767E7 (4158C171D5EC495C9D13447D356767E7)

CAUTION: DO NOT interrupt this operation, the system may become unbootable


Broadcast message from root@as43220096 (pts/0) (Tue Aug 13 14:29:36 2024):

BIOS update in progress. DO NOT reboot or interrupt

+---------------------------------------------------------------------------+
|                 AMI Firmware Update Utility v5.16.02.0111                 |
|      Copyright (c) 1985-2023, American Megatrends International LLC.      |
|         All rights reserved. Subject to AMI licensing agreement.          |
+---------------------------------------------------------------------------+
 Reading flash ...................... Done                
 - ME Data Size Checking ............ Pass
 - System Secure Flash .............. Enabled
 - FFS Checksums .................... Pass
 - Check RomLayout .................. Pass
 Loading File To Verify Memory ...... Done                
 Erasing Main Block ................. Done                
 Updating Main Block ................ Done                
 Verifying Main Block ............... Done                
 Erasing Boot Block ................. Done                
 Updating Boot Block ................ Done                
 Verifying Boot Block ............... Done                
 Erasing NVRAM Block ................ Done                
 Updating NVRAM Block ............... Done                
 Verifying NVRAM Block .............. Done                
 Loading The ME Data To BIOS ........ Done                
 - Update success for FDR                              
 - Update success for GBEA                             
 - PTT is locked, skip updating.                       
 - Successful Update Recovery Loader to OPRx!!         
 - Successful Update MFSB                              
 - Successful Update FTPR!!                            
 - Successful Update MFS, IVB1 and IVB2!!              
 - Successful Update FLOG and UTOK!!                   
 - ME Entire Image update success !!                   
 
 WARNING !!
 System must power-off to have the changes which take effect!

 Process completed.


Restoring DMI: AS43220096 0002 0002 AS43220096 AS43220096 71C15841-ECD5-5C49-9D13-447D356767E7 (4158C171D5EC495C9D13447D356767E7)

+---------------------------------------------------------------------------+
|        AMI Desktop Management Interface Edit Utility v5.27.03.0010        |
|      Copyright (c) 1985-2021, American Megatrends International LLC.      |
|         All rights reserved. Subject to AMI licensing agreement.          |
+---------------------------------------------------------------------------+

Initializing the SMBIOS interface.  Please wait a moment......
          Name              R/W  Status  Information
--------------------------  ---  ------  ----------------------------------
(/SS)System Serial number    W    Done   "AS43220096" 
(/SV)System version          W    Done   "0002" 
(/SU)System UUID             W    Done   "4158C171D5EC495C9D13447D356767E7" 
(/BV)Baseboard version       W    Done   "0002" 
(/BS)Baseboard Serial number W    Done   "AS43220096" 
(/BT)Baseboard Asset Tag     W    Done   "AS43220096" 
BIOS update successful

IMPORTANT: Please power cycle the system now

Shutdown scheduled for Tue 2024-08-13 14:34:39 UTC, use 'shutdown -c' to cancel.

[root@as43220096]# 
Broadcast message from root@as43220096 (Tue 2024-08-13 14:33:39 UTC):

Powering off due to BIOS update
The system is going down for power-off at Tue 2024-08-13 14:34:39 UTC!

```
