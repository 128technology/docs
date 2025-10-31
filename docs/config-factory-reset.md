---
title: Factory Reset
sidebars_label: Factory Reset
---

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

The rescue configuration is a previously committed, valid configuration. One must have previously set the rescue configuration through the CLI, or the Conductor, or Mist Cloud. 

(NEED INFO ON RESCUE CONFIGURATION - WHERE IS THIS COVERED?)

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

**********************
## Software Factory Reset

SSR Software Factory reset removes system files and zero-writes unallocated data for increased security.

The following  security enhancements and platform cleanup have been added to the factory reset operation.

* SSR running configs - Remove user/t128-running JSON files
* Environment configs - Remove local/global init files
* Factory defaults - Remove rotated XML files, leaving the most recent
* Config exports - Remove exported configuration directory
* PKI - Remove all 128T keys and certificates
* InfluxDB data - Remove database storage
* Tank storage - Remove tank state data
* User accounts - Delete created users (UID ≥ 1000)
* Inactive IBU partition - Zero out non-active partition and remove boot metadata for that partition
* Free space - FIPS-compliant disk zeroization of all free space on the active partition
* Log files - Remove all system logs

A log file of the platform cleanup operation is written out to /tmp while it is being run, and once everything is cleaned, it is migrated to /var/log for inspection afterwards.

The root/admin accounts have been reverted back to the default passwords according to which account it is (root/t128 share the same, admin uses its own)



