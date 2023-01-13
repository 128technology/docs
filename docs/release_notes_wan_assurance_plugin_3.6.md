---
title: WAN Assurance Plugin 3.6 Release Notes
sidebar_label: '3.6'
---

## Release 3.6.4
**Release Date:** Nov 5, 2022

### Resolved Issues

- **WAN-1463 CPU and memory reporting causes a spike in CPU usage:**

  _**Resolution:**_ Devised a more efficient collection scheme to minimize the CPU impact when collecting the CPU and memory data.

## Release 3.6.3
**Release Date:** Oct 18, 2022

### Resolved Issues

- **WAN-1403 Optimize the amount of memory used by the plugin:**

  _**Resolution:**_ The number of telegraf instances were consolidated to reduce the overall memory footprint of the plugin.

- **WAN-1391 High CPU usage during peer path stat collection:**

  _**Resolution:**_ Optimized the peer path data collection on HA routers with large number of peer paths.

- **WAN-1307 The FPM and BFD stats for dynamic interface were not reported consistently:**

  _**Resolution:**_ The FPM and BFD metric samples for the dynamic interfaces are combined before sending to the MIST cloud.

## Release 3.6.2
**Release Date:** Sep 29, 2022

### New Features
- **WAN-1138 Report additional information for peer paths**

The peer path stats now report the router hop count and the IP address for the peer path as seen by the neighbor.

### Resolved Issues

- **WAN-1338 The `show mist` command shows stale connection status:**

  _**Resolution:**_ The connection status is correctly updated after auth changes and reconnects.

- **WAN-1320 The wan assurance telegraf instances are restarted too frequently:**

  _**Resolution:**_ The telegraf instances are no longer restarted on disconnect.

- **WAN-1322 Control CPU usage incorrectly includes the data core usage:**

  _**Resolution:**_ The control plane CPU utilization excludes the data core usage sent to the MIST cloud.

- **I95-47776 The tank instance for cloud-intel-agent fails to start on certain systems:**

  _**Resolution:**_ The tank instance for CIA handles the startup failures more gracefully.


## Release 3.6.1

**Release Date:** Sep 14, 2022

### New Features
- **I95-47639 Report IDP Security Events**

When IDP is enabled on the router, the security events are reported to the MIST cloud.
