---
title: WAN Assurance Plugin 3.6 Release Notes
sidebar_label: '3.6'
---

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

- **WAN-1320 Control CPU usage incorrectly includes the data core usage:**

  _**Resolution:**_ The control plane CPU utilization will exclude the data core usage sent to the MIST cloud.

- **I95-47776 The tank instance for cloud-intel-agent fails to start on certain systems:**

  _**Resolution:**_ The tank instance for CIA handles the startup failures more gracefully.


## Release 3.6.1

**Release Date:** Sep 14, 2022

### New Features
- **I95-47639 Report IDP Security Events**

When IDP is enabled on the router, the security events will be reported to the MIST cloud.
