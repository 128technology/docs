---
title: WAN Assurance Plugin 3.9 Release Notes
sidebar_label: '3.9'
---
## Release 3.9.0

**Release Date:** July 03, 2024

### New Features
- **WAN-2374 LAG Visibility Improvements**

When the SSR router is configured with LAG ports, the MIST UI will show the appropriate port layout with LAG and LACP related information.

- **WAN-3048 Service with destination IP of /24 or greater will be included as custom apps**

Any service with address prefix of /24 or greater for IPv4 (and /128 or greater for IPv6) will be treated as a custom application allowing the Mist backend to provide higher precedence for these applications for SLE and insights.

- **WAN-3002 Report the duplex status for fabric and sync ports**

The duplex status for the HA sync and fabric ports will be reported from the device.
