---
title: M800 Watchdog
---

The Audiocodes M800 platform is among 128 Technology's certified platforms. Of its capabilites, it supports a hardware watchdog which is enabled by way of a userspace application. The watchdog will monitor the responsiveness of the operating system and if there is no activity for a period of time, the system will perform a restart.

## Installation

The M800 watchdog plugin is obtained from the official 128T software repository.

:::important
It is recommended to use the conductor GUI > Plugins page for installing plugins. This allows the system to select the correct version of plugin based on the 128T version.
:::

:::important
After installing the plugin, the 128T service on the conductor should be restarted for the changes to take effect.
:::

## Configuration

No configuration is necessary to activate this plugin.

## Troubleshooting

The plugin is installed on the 128T as a linux service.  To confirm its operation, execute the command `systemctl status M800_watchdog`.

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