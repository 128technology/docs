---
title: WAN Assurance Plugin 3.100 Release Notes
sidebar_label: '3.100'
---

## Release 3.100.1

**Release Date:** March 10, 2026

### Resolved Issues

- **WAN-3904 Unclaimed `mist-agent` with 3 month uptime using 5GB**

  _**Resolution**_ Fixed a memory leak in `mist-agent` during prolonged disconnect/reconnect cycles by optimizing memory usage and cleanup.

- **WAN-4457 Incorrect VPN Peer Path State reported in MIST stats**

  _**Resolution**_ Fixed the VPN peer path state reporting mechanism to ensure accurate status information is fetched for each sample.

- **WAN-4571 Speedtest failed to prepare system to perform test**

  _**Resolution**_ Enhanced async API operation handling during speed test execution preparation to improve reliability and test initiation.

- **WAN-4582 Add peer details for Application Path Insights events**

  _**Resolution**_ Enhanced Application Path Insights events to include comprehensive peer details for improved troubleshooting and monitoring.

- **WAN-4606 Clean up cached IPs on factory reset**

  _**Resolution**_ Enhanced the logic to properly clear cached IPs during system transitions, ensuring cached IPs are used only when DNS resolution is unavailable.

- **WAN-4610 LAN Connectivity test fails on IPv4 environment with an IPv6 error**

  _**Resolution**_ Enhanced LAN connectivity checks to correctly handle both IPv4 and IPv6 interfaces, while rejecting IPv6 tests as they are not currently supported.

- **WAN-4611 Extend Mist agent auto fixup logic to all scenarios**

  _**Resolution**_ Enhanced Mist agent auto-fixup logic to apply across all scenarios, including automatic updates of the `128T-mist-agent` component during Juniper hardware onboarding with older software versions to improve environment learning and support new use cases.

- **WAN-4638 Update `mist-analytics` to include serial number for optics stats**

  _**Resolution**_ Added device serial number information to optics statistics reporting in `mist-analytics` for better device tracking and identification.

- **WAN-4640 DHCP full table event and stats were missing information**

  _**Resolution**_ Fixed the GraphQL query to retrieve DHCP data and support functionality across multiple software versions.

- **WAN-4653 SSRs disconnected from AWS and other clouds**

  _**Resolution**_ Fixed DNS resolution logic in `mist-agent` to prioritize current DNS resolutions over cached IPs. Cached IPs are now used only as a fallback mechanism when DNS resolution is unavailable, preventing connectivity issues caused by stale address data.

- **WAN-4717 Mist agent not able to connect to Mist with proxy set to learned and with no DNS reachability after factory-reset**

  _**Resolution**_ Fixed HTTP client to use custom dialer for OpenSSL with proxy, resolving certificate validation issues. The custom dialer is now properly configured to support HTTP proxy connections for Mist communication.
