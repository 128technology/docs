---
title: M800 Watchdog
---

The Audiocodes M800 platform is among 128 Technology's certified platforms. Of its capabilities, it supports a hardware watchdog which is enabled by way of a user space application. The watchdog will monitor the responsiveness of the operating system and if there is no activity for a period of time, the system will perform a restart.

## Installation

The M800 watchdog plugin is obtained from the official 128T software repository.

:::note
The instructions for installing and managing the plugin can be found [here](plugin_intro.md#installation-and-management).
:::

## Configuration

No configuration is necessary to activate this plugin.

## Troubleshooting

The plugin is installed on the 128T as a Linux service.  To confirm its operation, execute the command `systemctl status M800_watchdog`.

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

### Release 2.0.0

#### Issues Fixed

- **PLUGIN-768** Support the m800 Watchdog plugin in 128T versions `5.1.0` and greater.
