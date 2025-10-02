---
title: WAN Assurance Plugin 3.13 Release Notes
sidebar_label: '3.13'

---
## Release 3.13.2

**Release Date:** October 2, 2025

### Resolved Issues

- **WAN-4450 Migration script fails when running 3.13.1**

  _**Resolution**_ The migration script will no longer rely on local salt calls which can fail on certain environments. The new version explicitly performs the necessary steps without relying on salt.

- **WAN-4487 Migration fails on an HA system due to incorrect init files**

  _**Resolution**_ Added support for migration for HA systems.

- **WAN-4505 Revert workflow does not work when the router is already MIST managed.**

  _**Resolution**_ The revert operation was originally expected to be run while the site was not mist managed. A new flag is added to skip this validation and continue with the revert operation even after MIST config was applied on the router.


---
## Release 3.13.1

**Release Date:** September 2, 2025

### Resolved Issues

- **WAN-4357 Sites migrated from Conductor managed to MIST Managed failed to upgrade SSR software**

  _**Resolution**_ The plugin now performs additional salt state cleanup during migration which prevented the SSR software image from being successfully downloaded.

- **WAN-4414 Remove debug log level in mist-wan-assurance config-gen log**

  _**Resolution**_ The config generation logic will no longer generate verbose logging by default.

---
## Release 3.13.0

**Release Date:** August 5, 2025

### New Features
- **WAN-2934 Speedtest for Conductor Managed SSR**

A conductor-managed SSR now includes support for initiating speedtest directly from the MIST UI. Speedtests cannot be initiated from the SSR GUI or PCLI.

### Resolved Issues

- **WAN-3814 Connectivity test to destination behind local network sources pings from redirect gateway IP**

    _**Resolution:**_ The source address selection logic now picks an IP address from the end of the IP range to avoid collisions. In addition, if no other option is available, the interface IP will be used instead.

- **WAN-3833 Improving catalyst debugability when the yaml is malformed**

    _**Resolution:**_  The catalyst component used for sending various telemetry to MIST cloud now handles malformed yaml files more gracefully.

- **WAN-4048 Site packet capture UI is using network interface name instead of device interface or device interface and VLAN**

    _**Resolution:**_ Added better support for conductor managed naming conventions for network and device interface names when VLAN are present for site packet capture API.

- **WAN-4110 CIA not sending correct name for netlink based port after HA formation**

    _**Resolution:**_ Correctly handle the node name changes that can occur post HA formation so that reported telemetry reflects the proper names.

- **WAN-4111 Race condition in concurrent index updates and persistence in Telegraf**

    _**Resolution:**_ Race condition in Telegraf during quick stop and start of the processes left some index files in a bad state. This condition is now handled correctly during restarts.

- **WAN-4160 Exclude all non-fowarding device interfaces from dynamic PCAP registration**

    _**Resolution:**_ Certain non-forwarding interfaces such as KNIs are excluded from dynamic PCAP registration to avoid false positives.

- **WAN-4188 Repeating SSR PCAP stop message for same capture ID across Mist environments and over time**

    _**Resolution:**_ SSR PCAP stop message was using incorrect capture ID causing additional processing churn on the backend. The issue has now been resolved.

- **WAN-4205 In progress Speedtest report does not contain VLAN information**

    _**Resolution:**_ For a currently running speed test that has not concluded, the correct VLAN id is now being reported to enable appropriate correlation of data in the backend.

- **WAN-4264 Multiple Interfaces in stats due to PPPOE type interfaces**

    _**Resolution:**_ Added better handling of PPPOE interface types for various telemetry components such as stats and events.

- **WAN-4290 WAN Edge DHCP Pool Exhausted alerts generated even when IP addresses are available**

    _**Resolution:**_ Fixed some edge conditions where data not being available resulted in incorrect WAN Edge DHCP pool exhaustion events.

- **WAN-4320 Application not displaying correctly**

    _**Resolution:**_ The custom applications were incorrectly being run through a normalization function causing confusion when visualizing the data in the MIST UI. The issue has now been addressed.

- **WAN-4254 Remove unwanted logs from cloud-intel-agent**

    _**Resolution:**_ Reduced some of the log spam in the cloud-intel-agent process.
