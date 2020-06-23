---
title: M800 Watchdog
---

## Installation

## Configuration

## Troubleshooting

`systemctl status M800_watchdog`

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