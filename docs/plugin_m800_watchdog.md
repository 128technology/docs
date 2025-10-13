---
title: M800 Watchdog
---

The Audiocodes M800 platform is among Juniper's certified platforms. Of its capabilities, it supports a hardware watchdog which is enabled by way of a user space application. The watchdog will monitor the responsiveness of the operating system and if there is no activity for a period of time, the system will perform a restart.

## Installation

The M800 watchdog plugin is obtained from the official SSR software repository.

:::note
The instructions for installing and managing the plugin can be found [here](plugin_intro.md#installation-and-management).
:::

## Configuration

No configuration is necessary to activate this plugin.

## Troubleshooting

The plugin is installed on the SSR as a Linux service.  To confirm its operation, execute the command `systemctl status M800_watchdog`.

```
Feb 12 16:28:11 sol_acm800_dut1 systemd[1]: Started Watchdog for the Audiocodes M800 platform.
Feb 12 16:28:11 sol_acm800_dut1 M800_watchdog[17848]: Watchdog thread active
Feb 12 16:28:12 sol_acm800_dut1 M800_watchdog[17848]: Poked the watchdog
Feb 12 16:28:13 sol_acm800_dut1 M800_watchdog[17848]: Poked the watchdog
Feb 12 16:28:14 sol_acm800_dut1 systemd[1]: Stopping Watchdog for the Audiocodes M800 platform...
Feb 12 16:28:14 sol_acm800_dut1 M800_watchdog[17848]: Interrupt signal (15) received.
Feb 12 16:28:14 sol_acm800_dut1 M800_watchdog[17848]: Destructor called
Feb 12 16:28:14 sol_acm800_dut1 M800_watchdog[17848]: Stop called
Feb 12 16:28:14 sol_acm800_dut1 M800_watchdog[17848]: Watchdog thread signaled to disable watchdog and exit
Feb 12 16:28:14 sol_acm800_dut1 M800_watchdog[17848]: Joined with the watchdog thread
Feb 12 16:28:14 sol_acm800_dut1 systemd[1]: Stopped Watchdog for the Audiocodes M800 platform.
```

## Release Notes

### Release 4.0.0

SSR 7.0 OS Support Release

**Release Date:** Oct 13, 2025

### Release 3.0.2

**Release Date:** Apr 30, 2025

#### Issues Fixed

- **PLUGIN-2959** Resolve copying unncessary files on image-based upgrade

### Release 3.0.1

**Release Date:** Oct 31, 2024

#### Issues Fixed

- **PLUGIN-2721** Resolve on plugin downgrade config removal

### Release 3.0.0

Image based install and upgrade (IBU) support for SSR 6.3.0.

**Release Date:** Sep 30, 2024

### Release 2.0.0

#### Issues Fixed

- **PLUGIN-768** Support the m800 Watchdog plugin in SSR versions `5.1.0` and greater.
