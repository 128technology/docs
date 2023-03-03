---
title: WAN Assurance Plugin 3.7 Release Notes
sidebar_label: '3.7'
---

## Release 3.7.0
**Release Date:** Mar 03, 2023

### New Features
- **WAN-1440 Report metrics per network interface**

For each network-interface the router will report additional metrics such as received packets and bytes as well as transmitted packets and bytes.

- **WAN-1352 Report DHCP server related information**

The router will report DHCP pool usage data along with an event when a particular pool is exhausted.

### Resolved Issues

- **WAN-1182 The device port layout takes a long time to populate after initial onboarding**

  _**Resolution:**_ Upon establishing a new connection to the MIST cloud, the device will immediately send all relevant telemetry information to provide most up-to-date information.

- **WAN-1415 Missing port up/down events for non-forwarding ports**

  _**Resolution:**_ The agent will monitor the link status using netlink to report the appropriate runtime state for non-forwarding interfaces.

- **WAN-1420 EP commands are dropped due to no registration**

  _**Resolution:**_ After initial onboarding, the agent will maintain a single active connection to EP terminator to avoid commands being sent on the wrong connection.

- **WAN-1509 Link up/down events and process restart events sometime get lost**

  _**Resolution:**_ The cloud-intel agent will process incoming events in real time and not cache the events for too long to avoid any delays and drops.

- **WAN-1557 SSR reports stale firmware version**

  _**Resolution:**_ The mist-agent will scan and report the latest package version during each stats push.

- **WAN-1564 The data core CPU usage date can sometimes be empty**

  _**Resolution:**_ The mist-agent will ensure that the CPU data is always present in the oc-stats.

- **WAN-1566 Port up/down events are seen for kni254 interface**

  _**Resolution:**_ The mist-agent will filter the port events for KNI interfaces such as kni254.

- **WAN-1632 SSR devices have been sending bytes data as zero, causing large dips**

  _**Resolution:**_ The mist-agent internal collection timers were adjusted to ensure all relevant data is captured in time before pushing the oc-stats.
