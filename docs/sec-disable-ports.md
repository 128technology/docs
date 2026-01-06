---
title: Disable SSR4x0 Management Interfaces
sidebar_label: Disable SSR4x0 Management Interfaces
---

#### Version History

| Release | Modification                |
| ------- | --------------------------- |
| 7.1.0   | Support for disabling SSR4x0 Managment interfaces added. |

The following configuration fields have been added to node configuration, allowing you to control physical security features on the SSR4x0 series. A `true` setting enables the feature, `false` disables the feature. 

```
usb-mass-storage-enabled true 
serial-console-enabled true 
recovery-mode-enabled true 
reset-button-enabled true
```
Use the following configuration commands to disable out of band management ports on the SSR400 and SSR440 - the USB and Serial ports, and block the local admin access.

#### Setting via PCLI:

:::note
The flags are marked as `advanced` config and do not autocomplete.
:::

```
config authority router router1 node node1 usb-mass-storage-enabled true
config authority router router1 node node1 serial-console-enabled true
config authority router router1 node node1 recovery-mode-enabled true 
config authority router router1 node node1 reset-button-enabled true
```

#### Setting via GUI:

![Disable ports from the GUI](/img/sec-disable-ports-gui.png)

:::note
Changes made and committed require a reboot to take effect.
:::

## How It Works

Each of the port commands is described below.

### Disable USB

When disabled (set to **false**), the USB host controller is excluded from the `devicetree`. No driver is bound by the operating system or applications.

### Disable Reset Pushbutton

When disabled (set to **false**), the pushbutton interrupt is disabled, and no action will be taken by the operating system or applications in response to a button push. However, with the pushbutton disabled, device reboot is possible from either the command line or through Mist. 

### Disable Serial Console Port

When disabled (set to **false**), the serial console is excluded from the kernel command line, and no driver will be bound by the operating system or applications. Kernel error logs are only accessible via the system journal.

See [Uninterruptable Boot Process](#uninterruptable-boot-process) below for important information.

### Disable Firmware Recovery

When disabled (set to **false**), the boot firmware `Press Esc to boot from USB` option and the image boot menu are prevented. The configured active boot image will be auto loaded; no recovery paths except system zeroization are available in the event of a boot failure.

See [Uninterruptable Boot Process](#uninterruptable-boot-process) below for important information.

### Uninterruptable Boot Process

This feature is configured on the SSR400 and SSR440 by setting **both** the Serial Console Port and Firmware Recovery as **disabled**. When configured, it means that a failed upgrade will not allow the user to select the image on the other volume (since the Console port is disabled, no user input is possible).  

If **both** the Serial Console Port and Firmware Recovery are disabled, and an incorrect or empty IP address is configured for one of the Ethernet ports (or system boot repeatedly fails for any other reason), use the push button to [Reset to the Rescue configuration](config-factory-reset.md#reset-to-the-rescue-configuration).

If the Reset Pushbutton is also disabled, the [Zeroization process](config-factory-reset.md#ssr400-and-ssr-440-zeroization) or RMA to Juniper are the only methods available for recovery.

**It is strongly recommended that recovery not be disabled on production units until post-deployment boot has been successfully validated.**


<!---### Fail-Safe Restore Process

:::important
This process has not been implemented at this time. It will be provided in a future Beta release.
:::

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

8. When the LED has stopped the slow white to black fade, it has returned to the factory settings and will shut down. You can then power up the system. --->


