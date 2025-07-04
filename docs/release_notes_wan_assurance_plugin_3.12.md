---
title: WAN Assurance Plugin 3.12 Release Notes
sidebar_label: '3.12'
---
### Release 3.12.0

**Release Date:** Jun 24, 2025

### New Features
- **WAN-2944 App Routing Insights for IDP**

Add support for IDP based services for Application Path Insights feature

- **WAN-3075 DHCP Lease Visibility**

Report the client lease information when SSR acts as a DHCP server to the MIST cloud.

### Resolved Issues

 - **WAN-4180 Config generation fails to apply due to empty performance-monitoring configuration**

    _**Resolution:**_ The config generation logic handles an empty, user-configured, performance-monitoring container more gracefully.

 - **WAN-2236 DHCP Leased statistics show up as 0**

    _**Resolution:**_ Update the lease count calculation to account for edge cases.

 - **WAN-2584 TSI status/ep-command stuck on the device**

    _**Resolution:**_ Increase the duration to get support files and add an expiration in case the command gets stuck.

 - **WAN-2716 MDD event generated but no evidence on device**

    _**Resolution:**_ Disable the generation of MDD events on versions where the problem is fixed.

 - **WAN-2802 High Memory & CPU Utilization on certain hubs**

    _**Resolution:**_ Application summary parser has been optimized for document parsing, reducing overall CPU & memory usage.

 - **WAN-3019 Ensure the monitoring-agent-once service runs without failures**

    _**Resolution:**_ Add appropriate conditions in the data collection logic to avoid unnecessary failures.

 - **WAN-3027 ARV events for peers with hostnames are delayed**

    _**Resolution:**_ Adjacencies configured with an adjacent hostname are correlated more quickly.

 - **WAN-3223 Request to add HA state details for LACP/AE interfaces**

    _**Resolution:**_ Added redundancy state for LAG interfaces based on the state of the parent interface.

 - **WAN-3236 Dynamic PCAP captured on wrong VLAN WAN interface for Path Down event**

    _**Resolution:**_ Addressed a bug in handling of interface matching logic with multiple VLANs on a device interface.

 - **WAN-3295 VPN Peer path API is returning empty data, and the Ports display on the MIST UI shows no active ports**

    _**Resolution:**_ Improved the telegraf config handling & generation during upgrades and reconfiguration.

 - **WAN-3315 Custom applications not being populated for some application summaries**

    _**Resolution:**_ Improve the tagging of custom applications when processing the application summary document.

 - **WAN-3374 Exclude the paths with infinite cost for ARV**

    _**Resolution:**_ Paths with infinite cost are invalid and are removed from Application Path Insights.

 - **WAN-3384 Static reservation IP should be included in the Total IP count (if not within the pool range) under DHCP Statistics**

    _**Resolution:**_ When static IPs are outside the range of dynamic IPs, they are reported to the total capacity.

 - **WAN-3401 "WAN Edge DHCP Pool Exhausted" event is seen when no IP is leased for a network**

    _**Resolution:**_ When both leased and total count are zero, the DHCP pool exhausted event will be skipped.

 - **WAN-3418 Report ARV paths every 23 hours**

    _**Resolution:**_ To improve efficiency and prevent data loss, the application path insights data is reported once a day.

 - **WAN-3434 DHCP leased IP information is missing on the UI in all product environments.**

    _**Resolution:**_ During onboarding, the node name change from default to configured is now handled more gracefully.

 - **WAN-3439 LACP state is shown as blank for LAG LAN interfaces during LACP force up**

    _**Resolution:**_ Adjust the LACP state and stats based on the force up state and configuration.

 - **WAN-3451 HA sync interface missing from TSI and showing half-duplex in UI**

    _**Resolution:**_ Report speed and duplex settings for non-forwarding interfaces.

 - **WAN-3453 Mist cloud telemetry agent fails to report the app stats**

    _**Resolution:**_ Large application summary documents are now compressed before sending to the cloud to avoid overload issues in the backend.

 - **WAN-3461 ARP Unresolved Service events when Peerpath is down**

    _**Resolution:**_ When an interface is down, the device will no longer generate an ARP unresolved event.

 - **WAN-3649 Certain tenant/service changes can go undetected in the policy access feature**

    _**Resolution:**_ Improve the matching and hashing scheme to cover all tenants and service style configurations.

  - **WAN-3847: `unrelease mist agent` command rename**

    _**Resolution:**_ To avoid a bug in the web server proxy code, the `unrelease mist agent` command has been renamed to `unrelease-mist-agent`. The behavior and functionality of the command remains the same.
