---
title: Disable SSR4x0 Management Interfaces
sidebar_label: Disable SSR4x0 Management Interfaces
---

Use the following commands to disable out of band management ports on the SSR 400/440 (Models 1 and 2) - the USB, serial and JTAG ports and block the local admin access. There are no HDMI, VGA, or dedicated network management ports on the SSR 400/440 (Models 1 and 2).

These commands are also available to disable out of band management ports on the SSR1x0 and SSR1x00 devices and virtual platforms, which include the USB, serial, JTAG, HDMI, VGA, and dedicated network management ports.

**Is this statement true? My belief is yes, because it is a software command (?).**

The following configuration commands have been added to control physical security features on the SSR-400 series:

```
usb-mass-storage-enabled true/false 
serial-console-enabled true/false 
recovery-mode-enabled true/false 
reset-button-enabled true/false 
```

#### Setting via PCLI:

:::note
The flags are marked as `advanced` config and do not autocomplete.
:::

**Does `true` enable or disable the port? I hope `false` disables...**

```
config authority router router1 node node1 usb-mass-storage-enabled true/false 
config authority router router1 node node1 serial-console-enabled true/false
config authority router router1 node node1 recovery-mode-enabled true/false 
config authority router router1 node node1 reset-button-enabled true/false
```

#### Setting via GUI:

**Insert Image Here**

:::note
Changes made and committed using the GUI require a reboot to display.
:::

### How It Works

Each of the port commands is described below.

#### Disable Linux USB

When disabled (set to **false**), the Linux USB host controller is excluded from the `devicetree`. No driver is bound by the operating system or applications.

#### Disable Reset Pushbutton

When disabled (set to **false**), the pushbutton interrupt is disabled, and no action will be taken by the operating system or applications in response to a button push.

#### Disable Linux Serial Console Port

When disabled (set to **false**), the Linux serial console is excluded from the kernel cmdline, and no driver will be bound by the operating system or applications. Kernel error logs are only accessible via the system journal.

See [Uninterruptable Boot Process](#uninterruptable-boot-process) below for important information.

#### Disable Firmware Recovery

When disabled (set to **false**), the boot firmware `Press Esc to boot from USB` option and the image boot menu are prevented. The configured active boot image will be auto loaded; no recovery paths are available in the event of a boot failure.

See [Uninterruptable Boot Process](#uninterruptable-boot-process) below for important information.

#### Uninterruptable Boot Process

This feature is configured on the SSR4x0 by setting **both** the Linux Serial Console Port and Firmware Recovery as **disabled**. When configured, it means that a failed upgrade will not allow the user to select the image on the other volume (since the Console port is disabled, no user input is possible).  

If **both** the Linux Serial Console Port and Firmware Recovery are disabled, **and** no IP address is configured for one of the Ethernet ports (or system boot repeatedly fails for any other reason), there is no access to the system. This will require an RMA for recovery.

**It is strongly recommended that recovery not be disabled on production units until post-deployment boot has been successfully validated.**
