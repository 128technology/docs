---
title: SSR 5.2 Release Notes
sidebar_label: '5.2'
---
:::info
Issues resolved in a release are merged into subsequent releases chronologically AND numerically. 

If you do not see an issue listed below, it may have been resolved in another recently released version. A link to the Release Notes for the most recent chronological release of SSR Software is provided.

Alternatively, refer to the **[List of Releases](about_releases.mdx)** page for release dates and links to all SSR Release Notes; or, if you know the Issue ID Number, enter that into the Search field at the top right of this page. 
:::

### Upgrade Considerations

:::important
Before upgrading please review the [**Upgrade Considerations**](intro_upgrade_considerations.md) and the [**Rolling Back Software**](intro_rollback.md) pages. Several modifications have been made to the process for verifying configurations, which will impact existing configurations.
:::

- **I95-43243/IN-460 Upgrade and Rollback:** Upgrading or rolling back a system (conductor, peer, or router) with the interactive installer `install128t`, that is managed by a conductor may result in the system becoming unresponsive. It is highly recommended that upgrades be performed through the conductor UI. Manual upgrades and rollbacks may not be resilient to failures. See [Rolling Back Software](intro_rollback.md) for more information on these operations.

## Release 5.2.4-1

**Release Date:** July 7, 2022

### New Features

- **I95-44769 Add Linux system logs to the Tech Support Information data:** This patch allows for customizations of the systemd journal content included in the `tech-support-info` bundle, and includes additional default content.
------
- **I95-44863 Automatic Core Assignment after Reboot:** On systems where `forwarding-core-mode` is set to `automatic`, if the CPU core count changes the software will automatically recalculate the core count and allocation at reboot.
------
- **I95-44887 Add Admin User to default groups:** Users with the admin role are added to groups such as `systemd-journal` by default to allow them access to logs from `save-tech-support-info`.

### Resolved Issues

- **The following CVE's have been addressed and resolved:** I95-44985, I95-45054, I95-45056, I95-45059, I95-45060, I95-123, I95-45165, I95-45348, I95-46020. I95-46359. 
------
- **I95-35228 DHCP waypoint addresses not displayed on standby node in UI:** Resolved an issue where the PCLI logic was not matching the GUI Network Interface table.
------
- **I95-40904 Power save mode not working:** This issue has been resolved.
------
- **I95-43239 LTE APN on Modem not set up correctly:** The APN is now always written to the the modem using the default index of 1. 
------
- **I95-43606 No communication between Routers:** In rare instances the BFD Pinhole feature experienced collisions between forward session flows. Session modification has been addressed and collisions are now avoided.
------
- **I95-43779 DHCP IP Address is not released:** Updated the state machine to cause DHCP-enabled interfaces to send out a DHCP Request for their current IP address.
------
- **I95-44001 Peer uptime showing "Unavailable":** Peer path uptime now displays the correct values.
------
- **I95-44551 DHCP Relay not working after upgrade:** A packet for traffic matching a summary service may be dropped because it was incorrectly flagged as hierarchical on the SVR peer. Well known non-hierarchical services such asDHCP relay will no longer perform hierarchical service checks on the peer.
------
- **I95-44722 Time based HMAC failure after HA reboot:** Resolved a buffering issue where device interfaces are now flushed upon becoming active to avoid handling of inactive packets.
------
- **I95-44913 kmod-i40e metapackage causing upgrade issues:** The metapackage has been removed and upgrade issues have been resolved. 
------
- **I95-45094 Unnecessary rotation of salt minion config:** Resolved an issue where the global.init and salt minion config are unnecessarily rotated and updated with no changes to the actual contents of the file.
------
- **I95-45113 SNMP override of the IfTable:** An issue with SNMP reporting has been resolved.
------
- **I95-45126 Split-brain after the sync interface goes down:** Resolved an issue that if the SSR software experienced a crash while it owned an interface from an X553 device, other devices hosted by the same chip could be impacted.
------
- **I95-45162 Improve download/upgrade error message if a router name does not exist:** In situations where a router does not exist, the download and upgrade message now indicates that the router does not exist.
------
- **I95-45164 `show-active-peers` missing some information:** Resolved a corner case where an RFC-compliant device ahead of a non-compliant device with a smaller MTU, the SSR misinterprets the non-compliant device's timeouts and the MTU will be unresolvable.
------
- **I95-45211 New users run into permissions errors:** Access Control Lists are now preserved on file rotations.
------
- **I95-45220 Conductor local forwarding parameters not dynamic:** Resolved an issue when transitioning a conductor from standalone to HA, the managed routers were not automatically connecting to the newly added conductor node.
------
- **I95-45489 `ifcfg` custom options issues:** Resolved an issue where  interface ifcfg option changes were not being processed.
------
- **I95-45541 LDAP users are unable to login to the PCLI due to permission errors:** This issue has been resolved.
------
- **I95-45559 Corrupted `resolv.conf` after ODM imaging:** Resolved an issue on SSR systems running dns-proxy services with external interfaces configured using `PEERDNS=yes`, where a race condition may occur that results in corrupt nameservers being added to the `/etc/resolv.conf` file.
------
- **I95-45696 Memory leak in PAM challenge library:** Resolved a memory leak in the PAM challenge library. 
------
- **I95-45842 PCLI `show events` does not paginate correctly:** This issue has been resolved.
------
- **I95-46169 RIB Doesn't Update Connected Route After Changing Network Interface Address Prefix from /24 to /27:** Resolved an issue when changing the prefix length for a network interface address, the RIB was not updated and routing protocols were not aware of the change.
------
- **I95-46641 Modem lockup after reset on dual LTE system:** Resolved an issue with dual LTE modem lockup after reset.

### Caveats

- **I95-45348: Update salt master and minion to 3002.8:** When upgrading an HA pair to version 5.2.4, please be aware of the following: While updating the conductors in an HA pair, the upgraded conductor node asset state will remain DISCONNECTED if the active `automatedProvisioner` is not running a corrected version (see table below). When performing an HA conductor upgrade the node running the oldest software assumes leadership. However, the older version will not be able to talk to the new software on the upgraded conductor. 

	The active `automatedProvisioner` can be determined by running the command `show system processes`. Once the upgrade begins on the old node, the newly upgraded conductor takes over.

	#### Corrected Versions

	| Router Software Version | Minimum Required Conductor Version |
	| --- | --- |
	| 5.2.4 | 5.2.4, 5.4.6, 5.5.1, 5.6.0 |


## Release 5.2.3

**Release Date:** May 20, 2022

### Resolved Issues

- **I95-41319 Reachability metrics not updating:** The reachability metrics for the min & max time to establishment now reset and report correctly.
------
- **I95-41849 Plugin Commands not working in PCLI:** The PCLI is now sending the correct arguments to the plugin service.
------
- **I95-42193 salt minion fails to connect to conductor:** `asset-connection-resiliency` has been enhanced to ensure all communication channels are operational.
------
- **I95-42396 Highway crash after receiving a bad packet:** Resolved an issue in the DPDK internal storage space.
------
- **I95-42608 BGP over SVR not able to open BGP session when routingManager is active on different node than interface:** This has been resolved by sending the packet to the node where routingManager is active via the inter node path.
------
- **I95-42779 ICMP Probe not detecting interface is UP causing Probe to fail:** Resolved an issue where IcmpProbeManager hangs on an invalid node id.
------
- **I95-42942 GUI Session Capture not working:** Resolved an issue with Packet Count and Session Count options. Session Capture now works as expected. 
------
- **I95-43071 Service health learning and path avoidance working intermittently for inter-node paths:** Race condition causing paths to be determined non-viable prior to service routes being created. 
------
- **I95-43091 `show fib` does not display interface next hop when gateway IP address is empty:** The display has been corrected.
------
- **I95-43239 LTE APN on Modem not set up correctly:** The APN is now always written to the the modem using the default index of 1.
------
- **I95-43794 Waypoint allocation issue on peer connectivity change:** The `waypointManager` was not looking at the peer connectivity for `modify` cases. A check for peer connectivity has been added. 
------
- **I95-44142 Automated Provisioner race condition:** Resolved a rare crash where applications would attempt to get information about already-closed sockets when responding to API requests.
------
- **I95-44991 SSR not passing Aruba data on GRE Tunnels:** Resolved an issue where GRE packets with a reserved bit in the header are incorrectly dropped as invalid.
------
- **I95-45583 HA Connection lost during commit:** Resolved an issue where session was missing necessary path data information relating to the peer path.

## Release 5.2.2
**Release Date:** August 24, 2021
Contains fixes from: [Release 5.1.5, August 13, 2021](release_notes_128t_5.1.md#release-515)

### New Features

- **I95-26075 Generate PCAP directly from Session table:** A button has been added to both the Session Debug table and the Top Sessions table that allows the user to create a PCAP file containing the specific row data from each table.

### Resolved Issues

- **I95-41481 Reachability metrics actions are not available for TLS modify scenarios:** Reachability stats for app-id session updates have been added. 
------
- **I95-41617 In some rare cases the GUI may enter a re-render loop:** Resolved an issue where the value provided by `usePreLoginData` was being used to determine if the application should re-render.
------
- **I95-41652 Misspelled parameter in the Influx setup template:** This issue has been resolved. 
------
- **I95-41689 Limited search on FIB table:** Restore FIB filtering query parameters.
------
- **I95-41704 Node processes using excessive CPU during upgrade:** Changes made to initiate Swagger generation only when a file is updated or changed.

### Caveats

- **I95-40335 Package dependency conflicts:** 5.2.2 supports the `vrsx-sfc` plugin. With this plugin, upgrading to 5.3.0 is not supported. If the system is upgraded to 5.3.0 with this plugin installed, the plugin dependencies will be removed and the features provided with this plugin will no longer function.
------
- **I95-44608 Conductor Rollback:** In a High Availability configuration where release 5.1.7 or higher has been installed, and a rollback is necessary to a version less than 5.1.7, both conductors must be rolled back before access to the PCLI is available from one HA conductor to the other - both must be running the same software version. 
------
- **I95-45946: Forwarding Plane Fault preventing packet forwarding:** Systems containing the Intel x553 NIC and running the IXGBE driver may stop forwarding packets due to an SSR forwarding plane fault. In configurations where data plane interfaces and non-forwarding interfaces such as management or high availability synchronization are mixed on the same IXBGE-based PCI device, a highway failure may prevent the non-forwarding interfaces from passing traffic. 

	**Workaround:** Restart the SSR software. 

	This issue has been found in earlier versions of the SSR software. Please use this workaround should you encounter this issue on an earlier release. 

## Release 5.2.1
**Release Date:** July 20, 2021

Contains fixes from: [Release 5.1.4, June 28, 2021](release_notes_128t_5.1.md#release-514)

###  New Features and Improvements

- **I95-35414 Refresh actions now available for individual sections on the Router Page:** The Device interface, Network Interface, and Peer Paths table sections now can be refreshed independently.
------
- **I95-36224 Handle names in application-id JSON:** The application-module json output `common-name object` now includes a list of referenced common-names, in addition to the transport-information list.
------
- **I95-38244 The Routers Page is easier to Search:** Added a column selector and a search matching system to make the search function more granular.
------
- **I95-38445 GUI Session Capture:** Added pages to the user interface that allow you to view and configure capture information.
------
- **I95-40458 Added the ability to toggle between Advanced and Basic Configuration mode:** Added the option to limit the main configuration screen to the most frequently used fields, or display all configuration options.

### Resolved Issues

- **I95-19871 Unknown session-type mismatched:** When a session-type does not have a match, the `Unclassified` service-class is used when it is available.**
------
- **I95-40075/I95-40134 Use gateway from service route for interface ping gateway:** The `service-route next-hop gateway-ip` will be used for ICMP ping reachability probe if so configured. If no IP is configured, then the `fib-route gateway` will be used, and finally the `network-interface gateway` will be used.
------
- **I95-40124 GRE Interface not inherting teneancy from parent:** The GRE Interface now inherts teneancy and neighborhood configuration from parent.
------
- **I95-40168 `show udp-transform` not providing result details:** The `show udp-tranform` reason field now provides correct details.
------
- **I95-40185 Duration type assignment values are not being set correctly:** This issue has been resolved by ensuring that fields using duration type always use default values.
------
- **I95-40191 Office365 service failing on bootup:** This issue has been resolved.
------
- **I95-40888`show application modules status` generating an unhandled error:** Resolved an issue with `show application modules status` causing unandled errors.
------

## Release 5.2.0
**Release Date:** May 10, 2021

### New Features and Improvements

- **I95-61 Service Health Learning and Fault Avoidance:** In-path metrics and heuristics are now able to be used for server reachability and to determine network health. See [Service Health Learning](config_service_health.md) for more information.  
------
- **I95-17681 Pre- and Post-Login Banners:** Pre- and post-login banners can be configured by selecting Configuration, clicking on the Authority tile, and scrolling down to the Web Messages field. 
------
- **I95-21631 Customized Tables:** Support has been added for user customizable tables in the Custom Reports view of the GUI. Tables can have multiple metrics and display sum, average, min or max values across the selected time range.
------
- **I95-33451 Support Persistence for [In-Memory Metrics](config_in-memory_metrics.md):** Metrics intended for persistence can be configured as part of a Metrics Profile. Profiles are configured at the Authority level and referenced by the relevant routers. Each Profile specifies a number of metrics and the desired parameter filters.
------
- **I95-36657 Improve Packet throughput of KNI-based Interfaces:** KNI buffer performance has been enhanced to handle large bursts of traffic. 
------
- **I95-37296 Native 128T Support for GRE:** Native support (non-plugin) is availble for GRE Tunneling, providing better performance. For more information, see [Native GRE Tunnels](config_gre_tunnel.md).
------
- **I95-37459 Show Commands for Services:** The [show fib](cli_reference.md#show-fib) and [show fib lookup](cli_reference.md#show-fib-lookup) commands have been enhanced to provide more granular path-related debugging.
------
- **I95-37510 [AppID Modules](concepts_appid.md#appid-using-modules) can be run as systemd units:** Added support for module execution as a systemd unit in addition to the existing script-based method, and the use of REST APIs to propagate module registrations and results.
------
- **I95-38081 Automatic generation of MSS Value:** The [network-interface configuration object](config_reference_guide.md#network-interface) now has an automatic option for the enforced-mss value. This automatically calculates the MSS of the network interface from the interface session MTU.
------
- **I95-38514 View User Activity:** Added a user activity table to the GUI on the Users page, as well as adding a new [PCLI command `show user activity`](cli_reference.md#show-user-activity).
------
- **I95-39303 `show application modules` added:** [`show application modules status`](cli_reference.md#show-application-modules-status) displays application names and transport information of a module. [`show application modules registration`](cli_reference.md#show-application-modules-registration) displays registered application modules. 
------
- **I95-39336 Best Path Criteria:** The [service-policy](config_reference_guide.md#service-policy) has been enhanced to include values that allow the router to select the best path based on the current latency/MOS values of the paths. 
------

### Resolved Issues

------
- **I95-37101 PCLI Updates for `show stats since` command:** The PCLI notes inconsistencies in data between current values and historical ones to indicate when the data may not be accurate.
------
- **I95-38510 Security mismatch on HA nodes dropping internode traffic:**  Resolved an issue where dynamically reconfiguring inter-node-security may cause all internode traffic to be dropped.
------
- **I95-39477 Configuration validation failure when conductor non-forwarding fabric interfaces are configured in different subnets:** Updated to display a warning to the user to correct the issue, rather than failing.
------
- **I95-39811 Office365 module not including TCP and UDP ports:** Resolved an issue where the AppID module was not including port and protocol data.
------
- **I95-39817 General CPU Stats not showing in Conductor UI after upgrade:** Resolved an issue where stats were not captured. 
------
- **I95-39854 Management over Forwarding not bringing up Eth0 on shutdown:** Resolved an issue preventing devices from unbinding cleanly. 
------
- **I95-39883 Use String Name for Protocol:** Resolved an issue where the protocol was displaying as a number instead of a name. 
------
- **I95-39953 Spike in IPFIX records:** Resolved a race condition causing a collector to enter an infinite loop.
------
- **I95-39982 module registration removal not refreshing services:** App-ID services now refresh correctly. 
------
- **I95-40036 Attempting to save Configurations that are too large:** The Data Manager logs an error when a configuration to be saved is larger than the buffer. 
------
- **I95-40060 `show session captures` not displaying active captures:** Updated the query argument to correctly display session captures for all services.
------
- **I95-40208 Quickstart not setting the minion_id to the hardware identifier when the value is blank:** Previously, if the Quickstart configuration did not have a value for the `minion_id`, the `minion_id` would not be set to the hardware identifier. This has been corrected in the `128T-5.2.0-1.el7.OTP.v2.x86_64.iso` ISO.

## Caveats

- **I95-26627 Prevent static route interface next hops with the same global ID:** In HA configurations with a shared interface, only one node in the pair should be configured as a static route next hop. Othrewise, deleting the shared interface from one node will also cause the static route to be deleted.

