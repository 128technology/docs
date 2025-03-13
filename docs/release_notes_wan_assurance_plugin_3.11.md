---
title: WAN Assurance Plugin 3.11 Release Notes
sidebar_label: '3.11'
---
### Release 3.11.0

**Release Date:** Mar 19, 2025

### New Features
- **WAN-2944 App Routing Insights for IDP**

Add support for IDP based services for Application Path Insights feature

- **WAN-3075 DHCP Lease Visibility**

Report the client lease information when SSR acts as DHCP server to MIST cloud.

### Resolved Issues

 - **WAN-2236 DHCP Leased statistics show up as 0**

    _**Resolution:**_ Update the lease count calculation to account for edge cases.

 - **WAN-2584 TSI status/ep-command stuck on the device**

    _**Resolution:**_ Increase the duration to get support files and add an expiry in case command gets stuck.

 - **WAN-2716 MDD event generated but no evidence on device**

    _**Resolution:**_ Disable the generation of MDD events on versions where the problem is fixed.

 - **WAN-2802 High Memory & CPU Utilization on certain hubs**

    _**Resolution:**_ Application summary parser was optimized for document parsing reducing overall CPU & memory usage.

 - **WAN-3019 Ensure the monitoring-agent-once service runs without failures**

    _**Resolution:**_ Add approproate conditions in the data collection logic to avoid unnecessary failures.

 - **WAN-3027 ARV events for peers with hostnames are delayed**

    _**Resolution:**_ Adjacencies configured with an adjacent hostname are supported during data reporting.

 - **WAN-3223 Request to add HA state details for LACP/AE interfaces**

    _**Resolution:**_ Added redundancy state for LAG interfaces based on the state of the parent interface.

 - **WAN-3236 D-PCAP captured on wrong VLAN WAN interface for Path Down event**

    _**Resolution:**_ Addressed a bug in handling of interface matching logic with multiple VLANs on a device interface.

 - **WAN-3295 VPN Peer path API is returning empty data and the Ports on the MIST UI shows as there are no active ports**

    _**Resolution:**_ Improved the telegraf config handling & generation during upgrades and reconfiguration.

 - **WAN-3315 Custom app not being populated for some app summaries**

    _**Resolution:**_ Improve the tagging of custom applications when processing app summary document.

 - **WAN-3374 Exclude the paths with infinite cost for ARV**

    _**Resolution:**_ Paths with infinite cost are invalid and are removed from Application Path Insights.

 - **WAN-3384 Static reservation ip should be included in the Total IP count (if not within the pool range) under DHCP Statistics**

    _**Resolution:**_ When static IPs are outside the range of dynamic IPs, they would be reported to the total capacity.

 - **WAN-3401 "WAN Edge DHCP Pool Exhausted" event is seen when no IP is leased for a network**

    _**Resolution:**_ When both leased and total count are zero, the DHCP pool exhausted event will be skipped.

 - **WAN-3418 Report ARV paths every 23 hours**

    _**Resolution:**_ To improve the efficiency and prevent data loss, the application path insights data is reported once a day.

 - **WAN-3434 DHCP leased ips information missing on UI in all prod envs.**

    _**Resolution:**_ During onboarding, the node name change from default to configured nodw is now handled more gracefully.

 - **WAN-3439 LACP state is shown as blank for LAG LAN interfaces LACP Force up**

    _**Resolution:**_ Adjust the LACP state and stats based on the force up state and configuration.

 - **WAN-3451 HA sync interface missing from TSI and showing half duplex in UI**

    _**Resolution:**_ Report speed and duplex settings for non-forwarding interfaces.

 - **WAN-3453 CIA agent fails to report the app stats**

    _**Resolution:**_ Large application summary documents are now compressed before sending to the cloud to avoid overload issues in the backend.

 - **WAN-3461 ARP Unresolved Service events when Peerpath is down**

    _**Resolution:**_ When interface is down, device will no longer generate an ARP unresolved event.

 - **WAN-3649 Certain tenant/service changes can go undetected in the policy access feature**

    _**Resolution:**_ Improve the matching nad hashing scheme for the feature to cover all tenants and service style configurations.
