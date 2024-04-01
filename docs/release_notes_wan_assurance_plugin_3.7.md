---
title: WAN Assurance Plugin 3.7 Release Notes
sidebar_label: '3.7'
---
## Release 3.7.7

**Release Date:** March 29, 2024

### Resolved Issues

- **WAN-2121 Port down events are not seen on the Insights page after a cable disconnect**

  _**Resolution**_ When a cable was disconnected on an interface with an active MIST connection, some events were getting dropped. The mechanism is now more robust and handles the reconnect scenario more gracefully.

- **WAN-2240 WAN bandwidth graph is blank after the user adds new WAN interfaces: `oc-stats` from the SSR is missing some interfaces**

  _**Resolution**_ The logic to include configured interfaces in the `oc-stats` and validating data for completeness is more robust, ensuring that accurate data is sent for new configuration changes.

- **WAN-2478 Disabling the WAN Assurance plugin does not stop the mist-agent service**

  _**Resolution**_ When the WAN Assurance plugin is disabled on a router, all relevant services are now stopped.

- **WAN-2518 _internal_ network showing up on the Networks dropdown for Application Policy Insights**

  _**Resolution**_ The internal network will not be included in the data reported for the feature.

- **WAN-2637 One of the nodes in HA pair was not sending any data to the cloud**

  _**Resolution**_ The runtime par file corruption of the monitoring-agent package has been addressed by adopting a better packaging approach.

- **WAN-2647 Peer path status is displayed incorrectly under Topology Details view for HA routers**

  _**Resolution**_ For VRRP based redundancy, the active/standby status will be reported correctly.

- **WAN-2678 MIST onboarding for HA routers fails with a `mutual authentication failed` error**

  _**Resolution**_ The condition that checks for the completeness of the HA configuration has been made more robust, preventing an authentication failure error. This allows the completion of the MIST onboarding process.

- **WAN-2696 Client information displays user as `Anonymous`**

  _**Resolution**_ In addition to the realtime lease updates, the full DHCP server lease data is sent to the cloud once a day.

- **WAN-2748 MIST org sees too many LTE ARP interface flaps**

  _**Resolution**_ ARP event generation for bad LTE connections has been made more robust to prevent false positives.

- **WAN-2754 No peer path up events seen for interfaces on the Insights page**

  _**Resolution**_ The handling of cached peer path events has been corrected to no longer crash.

- **WAN-2858 LLDP client information not sent for routers running version 6.2.3 software**

  _**Resolution**_ The logic to check for `LLDP enabled` now covers the new mechanism used in 6.2.3 software allowing the LLDP client information to be successfully sent to the MIST cloud.

- **WAN-2861 LTE_stats are received from the device but are missing in the GUI**

  _**Resolution**_ LTE devices with no peer paths were incorrectly being reported as a LAN interface. LTE interfaces will now always be reported as WAN interfaces.

- **WAN-2897 Router not reporting CPU, memory, and port metrics**

  _**Resolution**_ The condition that checks for the completeness of the HA configuration has been made more robust, preventing an authentication failure error. This allows the full data set to be sent post onboarding.

- **WAN-3031 The performance-monitoring profile generation is skipped on hub routers**

  _**Resolution**_ Additional logs have been added for config generation to indicate the conditions under which the auto generation for performance-monitoring will be skipped.

## Release 3.7.6

**Release Date:** November 20, 2023

### New Features
- **WAN-2423 Application Path Insights for conductor managed routers**

Support for the [Application Path Insights](https://www.mist.com/documentation/september-28th-2023-updates/) feature in MIST has been extended to conductor managed routers as part of this release. The feature is enabled on all spoke routers by default upon installing the plugin. The feature can be turned off at the authority and router level if needed.

### Resolved Issues

- **WAN-2545 Router configuration reset during WAN Assurance onboarding**

  _**Resolution:**_ When using MIST redirect onboarding for a router, an additional initialization step caused the existing router to be reset and the configuration removed. Conductor onboarding has been made more robust, avoiding unnecessary reinitialization.

## Release 3.7.5

**Release Date:** September 29, 2023

### Resolved Issues

- **WAN-2364 LTE enhancements when certain metrics don't show up**

  _**Resolution:**_ In some scenarios data for IMSI, Carrier and other information may not be available. The fix is to include what is available in the update to MIST cloud.

- **WAN-2375 Collect cloud-intel-agent monitoring journal**

  _**Resolution:**_ For better troubleshooting, additional journal logs were included in the tech-support info.

- **WAN-2399 User initiated PCAPs are getting deleted**

  _**Resolution:**_ The internally generated PCAPs and the user configured PCAPs will now coexist more seamlessly on the same system.

## Release 3.7.4

**Release Date:** September 20, 2023

### New Features
- **WAN-1079 Report tunnel status events for IPSec tunnels**

The system will report the tunnel status events along with reason for tunnel down for routers running the [IPSec plugin version 3.5.0](plugin_ipsec_client.md#release-350) or higher.

- **WAN-1851 Report health metrics for local breakout paths**

SSR will report health metrics such as latency, loss and jitter for the individual WAN paths which can be accessed via MIST org level WAN metric APIs.

- **WAN-2005 MARVIS action for known device failures**

For known device failures such as Malicious Driver Detection and Buffer Pool Exhaustion, the SSR router will send notification about those events to the MIST cloud for alerting. In addition, older firmware versions without the fix for these issues will automatically restart the system to mitigate the problem along with notifying the MIST cloud.

- **WAN-2369 Add support for upcoming AWS Australia and GCP UK cloud environments**

Support for onboarding to the upcoming AWS Australia and GCP UK environments was added.

### Resolved Issues

- **WAN-1634 The mist-agent is logging stack traces with retries**

  _**Resolution:**_ Cleaned up some left over debugging code which was causing the stack trace to be logged on the system.

- **WAN-1744 DHCP Usage Statistics Leased IPs and Available IPs show impossible values**

  _**Resolution:**_ Better handling of the negative value conditions when leases have been reclaimed by the DHCP server which resulted in the bad values to be reported.

- **WAN-1753 The cloud-intel-agent service is running even when WAN assurance is not enabled**

  _**Resolution:**_ The service will no longer be launched on system startup automatically unless the WAN assurance plugin is enabled.

- **WAN-1817 Releasing conductor managed SSR from MIST wipes config**

  _**Resolution:**_ The system will now skip factory reset for a conductor managed greenfield device.

- **WAN-1879 DHCP events are clobbered when same DHCP server name is used for multiple device interfaces**

  _**Resolution:**_ The interface name is made part of the key for tracking DHCP server events to allow both events to be sent.

- **WAN-1933 The URL filtering status is not getting updated in MIST for conductor managed devices**

  _**Resolution:**_ Added support for sending the URL filtering status for routers running SSR version < 6.1.0.

- **WAN-1944 The cloud-intel agent does not honor the configured log level**

  _**Resolution:**_ The log-level configuration setting is correctly propagated to the cloud-intel agent.

- **WAN-2051 The DHCP client reports unresolved event even after a valid lease is acquired**

  _**Resolution:**_ SSR generates multiple events during some transition states which are now better accounted for when sending the data to MIST cloud.

- **WAN-2128 Router is not showing MIST stats after a site power outage**

  _**Resolution:**_ Two separate processes were doing cleanup and config generation for metric generation causing one of the config files to get erased. The interaction between the two services has been made more robust to avoid this race condition.

- **WAN-2244 Mist agent crash during onboarding of greenfield devices**

  _**Resolution:**_ The underlying crash has been fixed by adding better error handling during the greenfield onboarding of SSR devices.

- **WAN-2291 Mist agent crash when performing health check for whitebox devices**

  _**Resolution:**_ The logic to perform the health check has been made more robust to prevent the underlying crash.


## Release 3.7.3
**Release Date:** May 25, 2023

### New Features
- **WAN-965 Support sending URL filtering block events to MIST cloud**

- **WAN-1751 Support fast updates for interface and peer path status on the MIST UI**

### Resolved Issues

- **WAN-1816 Mist agent monitoring fails and mist agent does not restart**

  _**Resolution:**_ The logic to inspect the failure of monitoring agent service was made more robust.

- **WAN-1883 Application summary data is not visible on the MIST UI due to negative values in the data**

  _**Resolution:**_ Handle errors in the application summary document more gracefully by dropping negative value samples.

- **WAN-1914 Packet capture feature on MIST UI is not capturing any packets with reason "Backend could not process"**

  _**Resolution:**_ Handle multiple ongoing PCAPs more gracefully when the process restarts in the middle of a previous capture.

- **WAN-1932 SSR stops sending stats and events but stays connected**

  _**Resolution:**_ Prevent a dead lock condition while sending events when cloud connection transitions from disconnect to connect.

## Release 3.7.2
**Release Date:** Apr 26, 2023

### New Features
- **WAN-1591 Report the rx/tx bytes and packet information for HA control interfaces**

### Resolved Issues

- **WAN-1763 De-duplicate DHCP pool exhausted events**

  _**Resolution:**_ Any duplicated DHCP pool exhausted event generated by the SSR will be dropped from the list of events sent to the MIST cloud.

- **WAN-1796 Prevent a mist-agent crash during initial telemetry push**

  _**Resolution:**_ Gracefully handle the timing of initial config and initial telemetry push to prevent the crash from occurring.

- **WAN-1855 Incorrect neighborhood information displayed in topology details view**

  _**Resolution:**_ Report the correct neighborhood information when the same neighborhood name is used by multiple Hub WAN interfaces.

## Release 3.7.1
**Release Date:** Mar 31, 2023

### Resolved Issues

- **WAN-1698 Classify custom apps on the hub routers based on the service profile**

  _**Resolution:**_ Any service with RFC1918 address space will be tagged as custom app in the data that hub sends to MIST cloud.

- **WAN-1737 De-duplicate peer path down events**

  _**Resolution:**_ Any duplicated peer path down event generated by the SSR will be dropped from the list of events sent to the MIST cloud.

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
