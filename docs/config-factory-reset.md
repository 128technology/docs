---
title: Factory Reset
sidebars_label: Factory Reset
---

Both the SSR software and SSR4x0 series provide the ability to reset to factory defaults. With the SSR400 and SSR440, you have the option of a user designated rescue configuration, or a secure zeroization and factory configuration. The SSR software resets to the original factory defaults, and removes any customer configurations.

Use the information below to determine the best option for your deployment.  

## SSR400 and SSR440 Factory Reset

The SSR400 and SSR440 devices are equipped with a reset switch to perform the following actions:

1.	Press for 4 seconds to reboot the device.
2.	Press and hold for 15 seconds initiates a reset to a rescue configuration.
3.	Press and hold for up to 30 seconds initiates a reset to the factory default configuration.

Holding the reset button for longer than 30 seconds cancels any of the button press actions described above. 

### Reboot

This action is the standard system reboot, often performed as part of troubleshooting. Hold the **Reset** button for 4 seconds to reboot.

### Reset to the Rescue Configuration

Pressing and hold the **Reset** button for more than 5 seconds but less than 15 loads and commits the rescue configuration.

The rescue, or "golden" configuration is a previously committed, valid configuration that has been designated as the fall-back configuration when performing a reset. This configuration was designated by the user or administrator as the rescue configuration through the CLI, the Conductor, or the Mist Cloud. 

### Factory Reset

Press and hold for up to 30 seconds to initiate a reset to the factory default configuration.

This process deletes all configurations on the device, including the backup configurations and rescue configuration, and loads and commits the original factory configuration. It also removes all data files, including customized configuration and log files, by unlinking the files from their directories. The command removes all user-created files from the system, including all plain-text passwords, secrets, and private keys for SSH, local encryption, local authentication, IPsec, RADIUS, TACACS+, and others.


### Fail-Safe Restore Process

The following procedure is to be used as a recovery method when **both** the Serial Console Port and Firmware Recovery have been set as **disabled**. When configured, it means that a failed upgrade will not allow the user to select the image on the other volume (since the Console port is disabled, no user input is possible). 

If **both** the Serial Console Port and Firmware Recovery are disabled, and an incorrect or empty IP address is configured for one of the Ethernet ports (or system boot repeatedly fails for any other reason), use the Fail-Safe Restore process for recovery.

1. Power off the system. 

2. Press and hold the Reset switch.

3. Power on the system. Do not release the Reset switch. When the switch is detected, the LED will fade to Red.

4. Continue to hold the Reset switch for 10 seconds. The LED will slowly fade from red to black. 

:::important
If you release the Reset switch during the 10 seconds of red to black fade, the system will simply reboot without resetting.
:::

5. The LED will turn white, and fade to black. 

6. Release the Reset switch.

7. The LED will slowly fade white to black every two seconds until the reset is complete. 

:::important
DO NOT reboot during this process. The factory reset will not complete.
:::

8. When the LED has stopped the slow white to black fade, it has returned to the factory settings and will shut down. You can then power up the system. 

## Software Factory Reset

SSR Software Factory reset removes system files and zero-writes unallocated data for increased security.

The `reset factory-default` command performs the following steps: **there is no reset factory-default command in the cli 

- Reset the device configuration to the factory defaults found on the device hard drive.

- Commit the configuration.

- Check the root-only directory for any executables and run any that are found.

- Reboot the device.

The following security enhancements and platform cleanup operations take place during the factory reset operation.

- All JSON files run by `user/t128` are removed. 
- All local/global init files are removed from the environment configurations.
- Rotated XML files are removed, leaving only the most recent.
- The exported configuration directory is removed.
- All 128T keys and certificates are removed
- Database storage is removed.
- Tank state data is removed.
- Created users (UID ≥ 1000) are removed.
- Non-active partitions are zeroed and boot metadata is removed for that partition
- Perform FIPS-compliant disk zeroization of all free space on the active partition
- All system logs are removed.
- The root/admin accounts are reverted to the default passwords for the respective account: `root` and `t128` share the same password, `admin` has a separate default password.

A log file of the platform cleanup operation is written out to `/tmp` while the `reset factory-default` command is being run. After the device is scrubbed, the log file is migrated to `/var/log` for inspection.


### Zeroization Process

Use the following process to ensure there is no unauthorized access possible to sensitive residual information (e.g. cryptographic keys, keying material, PINs, passwords, etc.) on SSR network equipment when that equipment is discarded or removed from its operational environment. 

For the certified SSR platforms, all software and configuration reside on the SSD hard drive `/dev/sda`. Use the following procedure to zeroize/erase the SSD hard drive. 

1. Log in to the local serial console as the root user 

2. Enter the following to gracefully shut down SSR service: 
 
 `systemctl stop 128T` 

3. Enter the following command to enter single-user mode: 
 
 `systemctl emergency` 

4. Re-enter the root password when prompted 

5. Enter the following command to zeroize the SSD hard drive: 
 
 `dd if=/dev/zero of=/dev/sda bs=1M conv=fsync status=progress `
 
 This process may take 30 minutes or more and will report **No space left on device** when complete. 

 ![Uninstall and wipe SSD](/img/cc_fips_uninstall.png)
 
6. Power off the system, or use the following command for soft power-off: 
 `echo o > /proc/sysrq-trigger` 

The system is wiped of all information, and is no longer operational as an SSR. If the system is to be reused in future, perform the ISO installation process. 


