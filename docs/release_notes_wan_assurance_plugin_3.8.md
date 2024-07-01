---
title: WAN Assurance Plugin 3.8 Release Notes
sidebar_label: '3.8'
---
## Release 3.8.0

**Release Date:** June 04, 2024

### New Features
- **WAN-2632 Display the interface description on MIST UI**

Any description configured under the `device-interface` will be displayed on the WAN Edge view on MIST UI.

- **WAN-2309 Generate an alarm when device fails to register with MIST**

A new alarm will be generated when a device is unable to register with the MIST cloud during initial onboarding and will include the failure reason.

### Resolved Issues

- **WAN-2839 The `show mist` command sometimes reports inaccurate status**

  _**Resolution:**_ The logic to detect the connection down state and reason was made more robust to capture additional scenarios.

- **WAN-2842 LTE interface missing tx/rx_bps**

  _**Resolution:**_ The rx/tx bps for interfaces will now average the value across the 3 minute oc-stats window as opposed to sending a single snapshot at time of data collection.

- **WAN-2853 Same interface is reported twice under different names**

  _**Resolution:**_ For conductor managed devices runnning on Juniper branded hardware, the logic now accounts for custom user defined device names for HA sync and HA fabric interfaces.

- **WAN-2991 DHCP pool exhaustion event not being generated**

  _**Resolution:**_ The DHCP pool exhaustion event generation better accounts for the previous event status to accurately generate the event.

- **WAN-3000 Process data collection spamming the logs**

  _**Resolution:**_ The logs were updated to be less aggressive.

- **WAN-3001 TSI collection times out on certain devices**

  _**Resolution:**_ TSI collection is handled more efficiently by limiting the amount of CPU and memory the collection can consume and affording more time for the operation to complete.

- **WAN-3003 For port errors, same value is being reported for both nodes in an HA pair**

  _**Resolution:**_ Each node will report the local error counts for a given port.

- **WAN-3049 Probe up/down events are generated even when the physical WAN port is down**

  _**Resolution:**_ The probe up/down events are suppressed for a physical down port.

- **WAN-3053 Duplicate path add/remove events being generated for HA interfaces**

  _**Resolution:**_ The path add/remove events will be suppressed for fabric interfaces

- **WAN-3072 Path Up events related to Application Path insights have incorrect reason**

  _**Resolution:**_ Remove the reason code from path up events since the previous Path Down will always have the correct reason code.

- **WAN-3077 DHCP pool events are missing the pool name**

  _**Resolution:**_ Add the pool name for DHCP pool events in addition to the DHCP pool udpates.

- **WAN-3104 Duplicate LTE interface with null stats being reported**

  _**Resolution:**_ The logic to detect LTE interfaces for conductor managed whitebox devices was made more robust to handle user configured device names.
