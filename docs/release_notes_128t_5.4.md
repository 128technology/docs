---
title: SSR 5.4 Release Notes
sidebar_label: '5.4'
---
:::info
Issues resolved in a release are merged into subsequent releases chronologically AND lexicographically.

If you do not see an issue listed below, it may have been resolved in another recently released version. A link to the Release Notes for the most recent chronological release of SSR Software is provided.

Alternatively, refer to the **[List of Releases](about_releases.md)** page for release dates and links to all SSR Release Notes; or, if you know the Issue ID Number, enter that into the Search field at the top right of this page.
:::

### Upgrade Considerations

:::important
Before upgrading please review the [**Upgrade Considerations**](intro_upgrade_considerations.md) and the [**Rolling Back Software**](intro_rollback.md) pages. Several modifications have been made to the process for verifying configurations, which will impact existing configurations.
:::

- **I95-43243/IN-460 Upgrade and Rollback:** Upgrading or rolling back a system (conductor or router) with the interactive installer `install128t`, that is managed by a conductor may result in the system becoming unresponsive. It is highly recommended that upgrades be performed through the conductor UI. Manual upgrades and rollbacks may not be resilient to failures. See [Rolling Back Software](intro_rollback.md) for more information on these operations.
------
- **I95-42452 Conductor Upgrade Time:** Upgrades to version 5.4 can take up to 40 minutes due to the number of rpms being upgraded. Please plan accordingly.
------
- **I95-42624 Upgrade Installer:** Before **upgrading to, or installing** version 5.4, update the Installer to at least version 3.1.0. Failing to upgrade the installer may result in a rollback failure, should a rollback be necessary at any time. The Installer typically prompts you update when a new version is available. Select **Update** when prompted.
------
- **Plugin Upgrades:** If you are running with plugins, updates are required for some plugins **before** upgrading the conductor to SSR version 5.4.0. Please review the [Plugin Configuration Generation Changes](intro_upgrade_considerations.md#plugin-configuration-generation-changes) for additional information.  

:::note
The Juniper SSR team does not publicly disclose known or resolved CVEs in our public documentation but instead utilizes our internal bug tracking IDs. Customers can obtain the actual CVE numbers by contacting Juniper Support.
:::

## Release 5.4.11-4

**Release Date: December 30, 2022**

### Resolved Issues

- **I95-46336 Peer connection not established after AWS upgrade:** Resolved an issue where an AWS C5 instance size can fail to initialize when more than one accelerated network interface is configured.
------
- **I95-48600 Compare Session ID's to prevent flow collisions:** Re-use of sessions is prevented when waypoint pool is exhausted and sessions linger on egress router.
------
- **I95-48723 HA sync not running after systems reconnect:** Historical metrics and events are synced between HA nodes after extended downtime.
------
- **I95-48988 High CPU for packet processing core:** Resolved an issue where the CPU can spike to 100% after a failover from internode/interrouter path to local breakout when failover is enabled for local breakout.
------
- **I95-49106 Degradation in performance during file rotation:** This issue has been resolved.
------
- **I95-49157 Poor GUI and PCLI performance for other users during a change/validate/commit operation:** Resolved the performance issue by optimizing the export config API.

## Release 5.4.10-3

**Release Date: November 23, 2022**

### Resolved Issues

- **The following CVEs have been addressed in this release:** I95-48644, I95-48648, I95-48650, I95-48653. 
------
- **I95-48529 BFD sending link notification before hold-down timer expires:** Resolved an issue where peer service-paths do not remain down while the BFD session / peer status is in the hold-down period after transitioning from down to up. Peer service-paths status now correctly reflect the peer status. Sessions will not be moved back to peers that have re-established connectivity but are still in the hold-down period.
------
- **I95-48656 Reduce TSI service log limit:** The size of the Tech Support Info journal has been restricted to prevent excessive resource consumption.
------
- **I95-48685 GUI and/or PCLI unresponsive:** Resolved an issue where on an HA conductor the user interface would become unresponsive if a managed router was offline or unreachable.
------
- **I95-48731 Sessions created on a `fin-ack` may get stuck:** Resolved an issue where, if `tcp-state-enforcement` is set to allow, a TCP session is established from a `fin-ack` may not get torn down in a timely manner.
------
- **I95-48772 `show running config` command displays an error:** Resolved an issue where `show config` requests on the PCLI failed if enum leaf-list entries were changed.
------
- **I95-48785 Service Area logging is missing the modify reason:** Resolved an issue when `session-capture` was enabled, service area logs were missing the `update reason`.

## Release 5.4.9-7

:::important

The following issue has been discovered in the following releases:

- 5.4.8 
- 5.4.9

If an HA Conductor queries a disconnected router from the Conductor GUI Router page or from the Conductor PCLI, the conductor may encounter periods of poor performance until the requests time out. The issue has been resolved in the next patch release with I95-48685. 

For immediate resolution on the impacted releases, contact Juniper Technical Support, or your SE.
:::

**Release Date: November 9, 2022**

### Resolved Issues

- **I95-32789 Peer metrics unavailable after Conflux synchronization:** Resolved an issue with HA routers where the metrics application stops streaming metrics to the peer node after loading configuration.
------
- **I95-45478 Segmentation Fault in the Dynamic Peer Update process:** Resolved an issue with multi-threaded access to a data member, leading to a segmentation fault.
------
- **I95-47271 VRRP Alarm for Backup becoming Primary:** There is now an alarm when the backup VRRP node in an HA pair takes over as the primary.
------
- **I95-47787 Worker core packet processing spikes to 100%:** Added the ability to tune the Reverse Packet Session Resiliency Minimum Packet Count (default is 3) and Detection Interval (default is 5) settings for session failover without requiring forward packet, and resolved the underlying issue that caused excessively high worker-core CPU.
------
- **I95-47909 Handle GRE tunnels in ICMP reachability probe:** The base interface for egress is now used if the icmp-probe probe-address is the same as the tunnel destination, and the internal-address is used as the source if the egress-interface is gre-overlay.
------
- **I95-48103 Commit triggered BGP issue:** Resolved an issue where BGP neighbors configured with a short hold time might experience a BGP session flap during a configuration commit when app-ID is enabled.
------
- **I95-48108 Service Ping for a Service without Source NAT uses Source IP Address:** The service-ping now uses the source-ip as the packet source-ip if provided.
------
- **I95-48158 Unable to capture child services using session capture:** When a session capture is configured on a child service (e.g., `social.internet` instead of `internet`), the session is now recorded.
------
- **I95-483381 Race condition in session teardown:** Shared context is now maintained to allow all packet processing to be completed before session teardown.
------
- **I95-48507 VLAN packets are generated without a valid VLAN from the flow-move cache:** Resolved an issue where sessions could be modified incorrectly when a VLAN is present and session resiliency is enabled for failover.

## Release 5.4.8-8

**Release Date: October 11, 2022**

### Resolved Issues Requiring Configuration Changes

- **I95-41072 Enhanced Web Filtering:** Web Filtering allows administrators to limit or prevent user access to internet content. These limitations may be based on company or organization policies, or because a domain may be know to contain malicious, inappropriate, or dangerous content. Individual services and service policies can be configured on the SSR to allow or deny access to an entire domain category, or specific domains within a category. For more information, see [Web Filtering.](config_domain-based_web_filter.md)
------
- **I95-47418 Audit Events for Plugin Install/Remove:** There is a new audit event that tracks when a plugin is installed or uninstalled. This can be viewed on the Audit History page in the GUI or in the PCLI by running `show events type admin.plugin`

### Resolved Issues

- **The following CVE's have been addressed and resolved:** I95-47482, I95-47483, I95-47484, I95-47485, I95-47805, I95-48048, I95-48049. 
------
- **I95-39454 Created User cannot access PCLI operations:** Resolved an issue where in rare cases, during bulk user additions, it was possible for the operation to fail, leaving the new user created but unable to login.
------
- **I95-44976 Highway issue when modifying an app-id session:** Resolved an issue where modifying an app-id session with a new session-id can lead to a crash.
------
- **I95-45847 Duplicate Alarms on Multiple Routers:** Resolved duplicate alarms by obtaining alarms from only one node in an HA pair.
------
- **I95-46126 Router Status:** Resolved an issue in HA configurations when a router is connected to HA Conductor 1, but not directly connected to HA Conductor 2, alarms generated on the router are now seen on Conductor 2 - the conductor to which the router is not directly connected.
------
- **I95-46281 Update Kernel to RHCK 8.6:** Updated the kernel to integrate the latest security fixes.
------
- **I95-46701 Packet Loss on Headend Router:** Added `device-interface` rx/tx descriptor ring size to resolve this issue.
------
- **I95-46918 GUI and PCLI out of sync when new configuration elements added/modified:** Resolved an issue where `show network-interface` and `show config` were not updating properly.
------
- **I95-46921 `128status.sh` script incorrectly checks for non-existent listening port:** Removed port 830 check for software versions 5.3.0 and greater.
------
- **I95-47271 VRRP Alarm for Backup becoming Primary:** There is now an alarm when the backup VRRP node in an HA pair takes over as the primary.
------
- **I95-47551 Keep-alives are not generated for unidirectional outbound-only sessions:** Resolved an issue with keep-alive generation for unidirectional outbound-only sessions.
------
- **I95-47552 LTE modem not coming up after upgrade:** Resolved an issue with modem detection and port scanning for Quectel EC25.
------
- **I95-47585 Transmit-failure increments when TE is enabled:** When `device-interface traffic-engineering` is enabled, the `stats/packet-processing/sent/interface-failure` statistic is no longer erroneously incremented.
------
- **I95-47655 BGP issues with VRRP:** VRRP failover may cause routing to not function if internal device numbering is not consistent across the redundant nodes.
------
- **I95-47685 Hitting maximum number of allocatable datapath memory regions:** Doubled the maximum number of allocatable datapath memory regions. 
------
- **I95-47767 Next Hop choice of "Blackhole" does not stay visible in Conductor:** This option was displayed in error, as the option is ignored. It has been removed.
------
- **I95-47969 Increased Memory use when generating TSI:** Resolved an issue where the s`ave runtime-stats` command and TSI generation could result in particularly high memory usage when Application Identification was enabled.

	The `save runtime-stats` command no longer operates across multiple nodes and routers, and will not aggregate the metrics to disk on the conductor. This is to protect against excessive memory consumption. This is a change in functionality; however the public metrics APIs achieve the same result and are the preferred mechanism to collect authority wide metrics.
------
- **I95-47981 Ignore VRRP advertisements if the VRID doesn't match:** The VRID is now validated before accepting an advertisement to resolv an issue where VRRP advertisements intended for a different router were being processed.
------
- **I95-48038 502 Error returned if managed routers are offline:** Resolved an issue that caused HTTP requests on the conductor to return a 502 error for all requests if a managed router is offline.
------
- **I95-48125 Save TSI streaming from router to conductor not working:** Adding a node and router argument to the PCLI command `save tech-support-info` now works correctly.
------
- **WAN-1327 Device Adoption may fail** Resolved issues where a "factory reset" system failed to be adopted. This could be seen if an invalid claim code was entered during the adoption process, or when a whitebox system (non Juniper-branded) was not successfully released.

## Release 5.4.7-7

**Release Date: August 4, 2022**

With release 5.4.7-7 (and greater) the iso name format has changed from using `OTP` to `ISO`:

- 128T-5.4.7-7.el7.ISO.v1.x86_64.iso

### Resolved Issues Requiring Configuration Changes

- **I95-40195 LDAP does not allow search base to be configured correctly:** Search base parameters, filter generation, certificate assurance, and logging enhancements have been added to the `ldap-server` configuration. See [LDAP](config_ldap.md) for more information.
------
- **I95-40333 Save credentials for accessing SSR software repositories:** `set software access-token` is a new PCLI command to save credentials for accessing SSR software repositories. This provides a way to run `install128t repo authenticate` without dropping to a linux shell. For additional information on this command, see [`set software access-token`](cli_reference.md#set-software-access-token).
------
- **I95-46562 Allow targeting another router or node when saving tech-support-info:** GUI: A button has been added to the **Logs** page in the GUI to download a tech-support-info bundle. This allows downloading a router's `tech-support-info` directly from the Conductor GUI. <br />
PCLI: The PCLI command `save tech-support-info` can now collect logs from another node. Using the Conductor's PCLI, a `tech-support-info` bundle can be collected from a Managed Router or the HA peer.
------
- **I95-46747 Improved the Password user experience:** You now are re-prompted up to three times for the current password if it is incorrect. If a new password does not meet the strength check, you are prompted with that information, and required to update the password. 

### Resolved Issues

- **The following CVE's have been addressed and resolved:** I95-47482, I95-47483, I95-47484, I95-47485, I95-47805, I95-48048, I95-48049.
------
- **I95-38408 DHCP server on wrong vlan sends offer in response to discover message:** Hosted DHCP servers that do not have an explicit vlan configured are now explicitly treated as vlan 0, and handle any DHCP packets that are untagged/vlan 0, in order to prevent those packets from being multicasted to multiple DHCP servers.
------
- **I95-44434 Peer metric sends IP of WAN interface instead of the expected string:** Logic has been added to show the available destination address.
------
- **I95-45890 Service paths for BGP over SVR routes are not being rebuilt:** Resolved an issue when the vector configuration is changed on a network interface, the service paths for BGP over SVR routes are not being rebuilt. 
------
- **I95-45999 Azure Router Crash:** Added support for NetVSC/VF hotswapping to resolve this issue.
------
- **I95-46056 `show ntp` has no output from PCLI, even though NTP is configured:** The output of show ntp will now report IP addresses of the time servers rather than resolve hostnames.
------
- **I95-46230 Highway Crash:** Resolved an issue where uncaught exceptions were causing highway issues.
------
- **I95-46332 VRRP Does Not Work with Ethernet Controller X710 for 10GbE SFP+:** Configuring VRRP on an Intel X700 series NIC can see discard broadcast packets due to the source pruning feature which is enabled by default. This change disables source pruning when VRRP is enabled on these NICs.
------
- **I95-46454 ICMP manager excessively logs ICMP echo replies with no matching context:** This issue has been resolved.
------
- **I95-46822 Revertible failover traffic not restored when reverse traffic is present:** For a "revertible-failover" service policy, when the preferred path is restored and a session no longer traverses an internode dogleg path, it was taking several seconds for traffic to be restored when forward traffic is present; in situations where only reverse traffic is present, traffic may not be restored. This issue has been resolved.
------
- **I95-46826 Carrier detection logic not recognizing disaster recovery modem:** Updated the carrier detection logic to properly recognize the carrier when a modem is attached to a disaster recovery cell tower.
------
- **I95-46931 Hardware using ConnectX6-DX fails to initialize:** Added support for this card variant.
------
- **I95-46933 `save-tech-support-info` creates a 0B file when manifest is missing:** This issue has been resolved and no file is created. 
------
- **I95-47111 Issues with redundant interfaces on startup:** Resolved an issue where the notifications for active interfaces may get lost when using VRRP for redundancy.
------
- **I95-47129 Metadata is not disabled after flow-move for EoSVR sessions:** Added a metadata turnoff after session failover for EoSVR.

## Release 5.4.6-9

**Release Date: June 28, 2022**

### Resolved Issues Requiring Configuration Changes

- **I95-44863 Automatic Core Assignment after Reboot:** On systems where `forwarding-core-mode` is set to `automatic`, if the CPU core count changes the software will automatically recalculate the core count and allocation at reboot.
------
- **I95-44769 Add Linux system logs to the Tech Support Information data:** This patch allows for customizations of the systemd journal content included in the `tech-support-info` bundle, and includes additional default content.

### Resolved Issues

- **The following CVE's have been addressed and resolved:** I95-45054, I95-45056, I95-45059, I95-45060, I95-45123, I95-45165, I95-46020, I95-46359.
------
- **I95-36758 Redistributed service route distance not configurable:** Support has been added for the configuration of admin distance for kernel routes generated by services with service routes and for BGP over SVR services.
------
- **I95-38408 DHCP server on wrong vlan sends offer in response to discover message:** Hosted DHCP servers that do not have an explicit vlan configured are now explicitly treated as vlan 0, and handle any DHCP packets that are untagged/vlan 0, in order to prevent those packets from being multicasted to multiple DHCP servers.
------
- **I95-40904 Power save mode not working:** This issue has been resolved.
------
- **I95-42438 `save tech-support-info` tries to run when SSR service is down:** In situations where the PCLI is still active, but the SSR service is down, trying to run `save tech-support-info` will appear to work, but does not return any info. This issue has been resolved, and will return a message when information is not retrievable. 
------
- **I95-43606 No communication between Routers:** In rare instances, BFD outbound-only flows experienced collisions between forward session flows. Session modification has been addressed and collisions are now avoided.
------
- **I95-43779 DHCP IP Address not releasing appropriately:** Reboot now triggers DHCP-enabled interfaces to send out a DHCP Request for their current IP address.
------
- **I95-44001 Peer uptime showing "Unavailable":** Peer path uptime now displays the correct values.
------
- **I95-44551 DHCP Relay not working after upgrade:** A packet for traffic matching a summary service may be dropped because it was incorrectly flagged as hierarchical on the SVR peer. Well known non-hierarchical services such as DHCP relay will no longer perform hierarchical service checks on the peer.
------
- **I95-44910 SSR provisioning failing to complete due to parsing error:** An additional failure case was found in the saltstack used in the SSR for provisioning when messages become corrupted. This failure case is now handled by the watchdog mechanism and the salt stack will be automatically recovered.
------
- **I95-44988 SSR Stuck in Upgrade status:** Improved logging to detect when an installer session is started and there is an already an active interactive installer session; for example when an interactive installer session was left open.
------
- **I95-45113 SNMP override of the IfTable:** An issue with SNMP reporting has been resolved.
------
- **I95-45124 RBAC Config Endpoints Leaking Information:** Resolved an issue where some configuration endpoints would allow users with insufficient permissions to make configuration requests.
------
- **I95-45126 Split-brain after the sync interface goes down:** Resolved an issue that if the SSR software experienced a crash while it owned an interface from an X553 device, other devices hosted by the same chip could be impacted.
------
- **I95-45162 Improve download/upgrade error message if a router name does not exist:** In situations where a router does not exist, the download and upgrade message now indicates that the router does not exist.
------
- **I95-45164 `show-active-peers` missing some information:** Resolved a corner case where an RFC-compliant device ahead of a non-compliant device with a smaller MTU, the SSR misinterprets the non-compliant device's timeouts and the MTU will be unresolvable.
------
- **I95-45220 Conductor local forwarding parameters not dynamic:** Resolved an issue when transitioning a conductor from standalone to HA, the managed routers were not automatically connecting to the newly added conductor node.
------
- **I95-45271 Error while trying to change appearance or selecting custom reports:** In some cases where error messages are vague, a path to the error location is provided. 
------
- **I95-45353 Filter with node does not work in session debug table:** Filter by Node is not a candidate for searching in the debug tables. It has a separate filter mechanism. This option has been removed from the session debug tables.
------
- **I95-45541 LDAP users are unable to login to the PCLI due to permission errors:** This issue has been resolved.
------
- **I95-45643 User-created users are missing after upgrade:** Resolved an issue where the XML values true/false are also handled as 1/0.
------
- **I95-45696 Memory leak in PAM challenge library:** Resolved a memory leak in the PAM challenge library. 
------
- **I95-45814 No Bandwidth statistics visible in GUI:** Resolved an issue when processing high numbers of services and service routes which prevented a subset of stats from being stored and displayed.
------
- **I95-45842 PCLI `show events` does not paginate correctly:** This issue has been resolved.
------
- **I95-45882 Rare case where an invalid DHCP server configuration generated:** This issue has been resolved.
------
- **I95-46055 Add warning when transmit caps are too low:** Users now get a warning when configuring a traffic-engineering transmit-cap under 1Mbps.
------
- **I95-46114 SSR flooded with Highway messages:** The chatty `InterfaceMap::Exception: Unable to find path to peer` highway log has been suppressed. 
------
- **I95-46169 RIB Doesn't Update Connected Route After Changing Network Interface Address Prefix from /24 to /27:** Resolved an issue when changing the prefix length for a network interface address, the RIB was not updated and routing protocols were not aware of the change.
------
- **I95-46314 Configuring Static Assignment with Client-Identifier Causes DHCP failure:** Updated config validation to verify that, within a single DHCP server host-service, all static assignments use unique client-identifiers.
------
- **I95-46343 Routers page Search not working for UpperCase values:** Resolved an issue with the search bar for the Routers page.  
------
- **I95-46451 Active Node not updating properly:** Resolved an issue with inter-node VRRP wherein the virtual interface could get stuck in a bad state after a flap.
------
- **I95-46458 `set password` from PCLI hangs at "Modifying password":** This issue has been resolved. 
------
- **I95-46613 Flow move may not properly happen without forward packet for outbound only sessions:** Resolved an issue where a session that has been idle for more than 10 seconds, sessions for outbound-only connections may not failover properly without a forward packet.
------
- **I95-46641 Modem lockup after reset on dual LTE system:** Resolved an issue with dual LTE modem lockup after reset.

### Caveats

- **I95-45348: Update salt master and minion to 3002.8:** When upgrading an HA pair to version 5.4.6, please be aware of the following: While updating the conductors in an HA pair, the upgraded conductor node asset state will remain DISCONNECTED if the active `automatedProvisioner` is not running a corrected version (see table below). When performing an HA conductor upgrade the node running the oldest software assumes leadership. However, the older version will not be able to talk to the new software on the upgraded conductor. 

	The active `automatedProvisioner` can be determined by running the command `show system processes`. Once the upgrade begins on the old node, the newly upgraded conductor takes over.

	#### Corrected Versions

	| Router Software Version | Minimum Required Conductor Version |
	| --- | --- |
	| 5.4.6 | 5.4.6, 5.5.1, 5.6.0 or later |

## Release 5.4.5-8

**Release Date: May 11, 2022**

### Resolved Issues Requiring Configuration Changes

- **I95-44847 PCLI Typo Corrections:** When a user incorrectly types a PCLI command or the name of a router or node, the error message now contains a suggestion of what command they might've wanted to run. These suggestions are seen in the form of `Did you mean ... ?`

### Resolved Issues

- **I95-35228 DHCP waypoint addresses not displayed on standby node in UI:** Resolved an issue where the PCLI logic was not matching the GUI Network Interface table.
------
- **I95-39274 DNS-based services kill asset connection resiliency:** Resolved an issue where an internal commit was bouncing the kni254 interface and causing a series of connection resets.
------
- **I95-40348 Unable to rename a router:** Increased the maximum message size so that the larger configuration changes can be processed correctly.
------
- **I95-41931 Peers show the IP address not the router name in the GUI:** This issue has been resolved, and both the IP address and router name are displayed. 
------
- **I95-42318 Broken symlink for plugins results in a highway crash:** Resolved the handling of a broken symlink for plugins, which was resulting in a failure to apply config and a highway crash.
------
- **I95-42818 Service Path Does not show DOWN when Reachability Probes Fail:** Resolved an issue with the state logic for the service path, causing the GUI to not return the same/correct information as the PCLI.
------
- **I95-43239 LTE APN on Modem not set up correctly:** The APN is now always written to the the modem using the default index of 1.
------
- **I95-43897 Planned failover did not work properly:** Resolved an issue where a waypoint missing from an internal database prevented failover.  
------
- **I95-44029 FIB in GUI does not show Next Hops:** Updates have been made to the behavior of the Routing Details menu to display this information.
------
- **I95-44142 Automated Provisioner race condition:** Resolved a rare crash where applications would attempt to get information about already-closed sockets when responding to API requests.
------
- **I95-44424 Cannot set log level configured on remote router from conductor CLI:** This issue has been resolved.
------
- **I95-44425 `show service-paths` output frequently shows "Nothing to display" when there should be output:** This issue has been resolved.
------
- **I95-44443 NTP Server config not always picked up:** Resolved an issue where NTP configuration was changed but the backend would not take action on those changes.
------
- **I95-44534 Session Capture in GUI not working:** A Session Capture triggered from the GUI now creates a capture for new sessions traversing the same path as this session. 
------
- **I95-44554 Metadata packets may incorrectly pin flow affinity:** Worker core affinity latching has been prevented, resolving this issue. 
------
- **I95-44568 VRRP interfaces both report "vrrp-standby" after provisional down of primary interface:** Resolved an issue when using `provisional-down` on the primary interface while reconfiguring `shared-phy` to `vrrp` causes a deadlock in the highway process.
------
- **I95-44591 Paste-config does not allow small config snippets to be posted:** Resolved an issue where the list keys were not being passed in as part of the `value` in the transaction.
------
- **I95-44618 OS package update:** This package has been updated to resolve a CVE issue.
------
- **I95-44722 Time based HMAC failure after HA reboot:** Resolved a buffering issue where device interfaces are now flushed upon becoming active to avoid handling of inactive packets.
------
- **I95-44726 Invalid return code returned by T1 card firmware creating a memory leak:** Resolved a buffer leak in the wanpipe driver.
------
- **I95-44730 Export event history exports only last 30 minutes:** Resolved an issue where `time` was captured, but never updated. 
------
- **I95-44741 Initializer fails with empty global init:** Resolved an issue where the initializer would fail if the existing global.init was empty. 
------
- **I95-44759 Unable to initiate SR-IOV interface when multiple cores running:** This issue has been resolved. 
------
- **I95-44816 Highway process fails to run when a config committed with a DSCP range missing an end value:** This issue has been resolved by updating the `dscp-range` in the data model so the `endValue` of the range is always populated.
------
- **I95-44823 Conductor upgrade failure - extra space in integer is invalid:** Extra spaces on integer types are now trimmed off to avoid this issue. 
------
- **I95-44913 kmod-i40e metapackage causing upgrade issues:** The metapackage has been removed and upgrade issues have been resolved. 
------
- **I95-44985 Update salt-minion minimum version to resolve CVEs:** This issue has been resolved. 
------
- **I95-44991 SSR not passing Aruba data on GRE Tunnels:** Resolved an issue where GRE packets with a reserved bit in the header are incorrectly dropped as invalid.
------
- **I95-45063 SSR Azure instances unstable on large machine types:** Resolved an issue with Mellanox5 after upgrading the SSR to 5.4.
------
- **I95-45094 Unnecessary rotation of salt minion config:** Resolved an issue where the global.init and salt minion config are unnecessarily rotated and updated with no changes to the actual contents of the file.
------
- **I95-45146 GUI error message for users authenticated by LDAP to Active Directory Server:** This issue has been resolved.
------
- **I95-45164 Active peers show Unavailable for PATH-MTU, LATENCY, JITTER, LOSS & MOS for some transports:** Resolved a rare issue in the case of an RFC-compliant device ahead of a non-compliant device with a smaller MTU, the non-compliant device's timeouts are incorrectly interpreted and the MTU becomes unresolvable.
------
- **I95-45211 New users run into permissions errors:** Access Control Lists are now preserved on file rotations.
------
- **I95-45372 Filters in the Routers Tab not working:** Resolved a logic issue with the GUI table.
------
- **I95-45462 128T-monitoring agent does not start automatically after upgrade to 5.4.4:** Updated the Monitoring Agent to resolve this issue. 
------
- **I95-45489 `ifcfg` custom options issues:** Resolved an issue where  interface ifcfg option changes were not being processed.
------
- **I95-45559 Corrupted `resolv.conf` after ODM imaging:** Resolved an issue on SSR systems running dns-proxy services with external interfaces configured using `PEERDNS=yes`, where a race condition may occur that results in corrupt nameservers being added to the `/etc/resolv.conf` file.
------
- **I95-45583 HA Connection lost during commit:** Resolved an issue where session was missing necessary path data information relating to the peer path.
------
- **I95-45618 Issue with MAC address in Azure environment:** Resolved this issue by handling non-ethernet MAC addresses during MLX device discovery.
------
- **I95-45641 Stuck BGPoSVR Sessions after Failover:** Made changes to provide updates to less specific FIB entries when routes are updated to resolve this issue. 
------
- **I95-45783 User home directores are different across the network topology:** Resolved an issue where findUser was hitting a "User not Found" error and exiting. 
------
- **I95-45799 Monitoring Agent Service Fix:** Updated the Monitoring Agent to include the latest updates. 

### Caveats

- **I95-45946: Forwarding Plane Fault preventing packet forwarding:** Systems containing the Intel x553 NIC and running the IXGBE driver may stop forwarding packets due to an SSR forwarding plane fault. In configurations where data plane interfaces and non-forwarding interfaces such as management or high availability synchronization are mixed on the same IXBGE-based PCI device, a highway failure may prevent the non-forwarding interfaces from passing traffic. 

	**Workaround:** Restart the SSR software. 

	This issue has been found in earlier versions of the SSR software. Please use this workaround should you encounter this issue on an earlier release. 

## Release 5.4.4-9

**Release Date:** February 18, 2022

### Resolved Issues Requiring Configuration Changes

- **I95-25630 Gateway IP is required:** When creating or changing a service-route with a next-hop of a static IP net-int, a gateway IP is required. If no gateway IP has been specified, the network-interface gateway will be used. 
------
- **I95-40660 Kernel Upgrade:** The OS kernel has been upgraded to address several CVEs and provide support for Wireguard and Cordoba. 
------
- **I95-44224 Autocomplete for Resource Groups:** Autocomplete has been added to the pcli when configuring resource groups. 

### Resolved Issues

- **The following CVE issues have been addressed and resolved with this release:**
I95-40268, I95-41591, I95-41794, I95-41863, I95-42448, I95-43258, I95-43260, I95-43261, I95-43471, I95-43623, I95-43625, I95-44087, I95-44088, I95-44206, I95-44322 
------
- **I95-42942 GUI Session Capture not working:** Resolved an issue with Packet Count and Session Count options. Session Capture now works as expected. 
------
- **I95-43809 CLI commands fail to run from the Conductor:** Resolved an issue where requests made to a HA conductor would not always try its peer.
------
- **I95-44107 Service routes with a GRE interface in the next-hop fail validation:** Updated the validation process for mapping interfaces.
------
- **I95-44144 Update Zookeeper Logging:** Zookeeper logging library has been replaced with reload4j.
------
- **I95-44152 `reachability-detection probe-type` description does not match implementation:** The configuration field description for `reachability-detection probe-type` has been updated.
------
- **I95-44207 Unprovisioned OSPF configuration causes the PCLI to generate an error when issuing show ospf:** This issue has been resolved.
------
- **I95-44246 The "Piping Output..." message does not clear:** When running a grep command from the pcli, the piping output does not clear. This issue has been resolved.
------
- **I95-44252 Unneeded package dependencies may cause upgrade or rollback failures:** The packages and logic is obsolete and have been removed.
------
- **I95-44278 Paste configuration error:** Resolved an issue where pasting multiple lines that beginning with `configure` caused an error.
------
- **I95-44360 Custom Charts Create/Delete Dialog Boxes Not Dismissing:** Resolved an issue where a race condition was preventing dismissal of the dialog boxes.
------
- **I95-44480 Not allowing some valid identifiers or values:** This issue has been resolved.
------
- **I95-44517 Time check incorrectly locking upgrade process:** The time check has been replaced with a process name check.  
------
- **I95-44538 Invalid Stat increment:** This issue has been resolved. 

### Caveats

- **I95-44222 Commit fails for RBAC users with config-write permissions:** RBAC users with config-write permissions, but who do not have explicit write access to t128/ get a “failure to commit” message.
	**_Workaround:_** Manually create a `commit` role and set the 128t:/ resource in the role. Add this role to users who need the ability to commit.	
------
- **I95-45559 Corrupted `resolv.conf` after ODM imaging:** On SSR systems running dns-proxy services with external interfaces configured using `PEERDNS=yes`, a race condition may occur that results in corrupt nameservers being added to the `/etc/resolv.conf` file.
	
	**_Workaround:_** A temporary workaround is to force an update of this file by either of the following methods:

	- Perform a dummy modification of the file to force it to be updated:
	  ```
	  touch /etc/resolv.conf
	  ```

	- Restart 128T:
	  ```
	  systemctl restart 128T
	  ```

## Release 5.4.3-8

**Release Date:** January 27, 2022

### Resolved Issues Requiring Configuration Changes

- **I95-39193 Extend Timeout after completion of three way handshake:** The TCP timer for the `initial-timeout` is now configurable per session-type.

### Resolved Issues

- **I95-33730 The `Completed in .* seconds` includes the time waiting for the user to confirm:** The execution time now only includes the time spent executing a command.  
------
- **I95-41108 EthoSVR doesn't restart the session when all peer paths are disabled:** This is not specific to EthoSVR and can happen to any session that is unidirectional. This issue has been resolved. 
------
- **I95-41320 When quitting the PCLI, a slow PCLI response may result in traceback messages:** This is not harmful, and this situation is now handled internally. 
------
- **I95-42364 `off-subnet-reverse-arp-mac-learning` does not work when `outbound-only` is configured:** The learned MAC is now saved in the reverse flow placeholder for use when the flow is established. 
------
- **I95-42608 BGP over SVR not able to open BGP session when routingManager is active on different node than interface:** This has been resolved by sending the packet to the node where routingManager is active via the inter node path.
------
- **I95-42813 Access Manager reports Reload Audit rules failed:** Resolved an issue where the per-user home directory audit rules were being generated without new lines, causing them to be appended to the same line.
------
- **I95-43264/I95-43624 CVE Issues:** The latest Security vulnerabilities have been identified and addressed. 
------
- **I95-43442 BGP peering breaks when VRRP is enabled on the interface:** Resolved an issue with transitioning the redundancy state of network interfaces.
------
- **I95-43591 When deleting a linux user, the default bash is not restored:** A protection has been added to the SSR to disallow the creation of a user that already exists on the linux system.
------
- **I95-43643 EoSVR services frozen:** Resolved an issue where EoSVR services were not setting up actions properly.
------
- **I95-43684 SSC Callback In ConfigClient:** An SSC callback in Config Client was causing a long lived reference to the config client instance. This callback has been removed. 
------
- **I95-43794 Waypoint allocation issue on peer connectivity change:** The `waypointManager` was not looking at the peer connectivity for `modify` cases. A check for peer connectivity has been added. 
------
- **I95-43799 ICMP not responding on IPs, if multiple IPs are used for one interface:** The SSR now properly handles dynamic reconfiguration for additional ip-addresses.
------
- **I95-43823 Cannot configure IP prefix in access policy from GUI:** Resolved an issue that prevented the SAVE button from activating.
------
- **I95-43833 Unable to commit new configuration after upgrade to 5.4.1:** Resolved an issue where missing IDs in the candidate configuration caused an exception during a commit.
------
- **I95-43839 Spaces in config filename cause issues importing the config after a rollback:** Spaces in filenames are no longer allowed, and the encoding of those spaces is now blocked. 
------
- **I95-43938 StateMonitor does not sync different files with the same modified time:** For files with identical timestamps, a tiebreaker has been added to sync the files. 
------
- **I95-43943 SCTP packets have 0 for source and destination ports in the SCTP packet header:** Resolved an issue where the SCTP header is being mishandled.
------
- **I95-44059 Conductor Latency issue:** The API cache was constantly requesting downstream router version. The cache instantiation in the API client has been updated and the issue has been resolved. 
------
- **I95-44095 VRRP Manager only sending GARPs on some VLANs:** Resolved an issue where the VRRP Manager was only sending GARPs on some VLANs when the advertise timer was firing.
------
- **I95-44108 Interfaces were failing to GARP when withdrawing from redundancy:** Resolved an issue where interfaces withdrawing from redundancy were not advertising the change.
------
- **I95-44115 Conductor Failover fails, with no connection to Branch-Nodes:** Added checks for both ssh status code and uptime to determine the state of the connection.
------
- **I95-44129 Issue when converting management over forwarding config generation:** Resolved an issue where config generation was throwing an error when generating management over forwarding services for PPPoE type device-interfaces.

## Release 5.4.2-5

**Release Date:** December 22, 2021

### Resolved Issues

- **I95-42193 salt minion fails to connect to conductor:** `asset-connection-resiliency` has been enhanced to ensure all communication channels are operational.
------
- **I95-42449 Removing a list element from config produces a confusing error:** Improved error reporting for deleting non-existing list elements.
------
- **I95-42467 save tech-support-info does not save verbose configuration:** Corrected save tech-support-info manifest to collect necessary configuration.
------
- **I95-42973 `show config running generated` does not display generated configuration:** Corrected display output.
------
- **I95-43071 Service health learning and path avoidance working intermittently for inter-node paths:** Race condition causing paths to be determined non-viable prior to service routes being created. 
------
- **I95-43089 Cannot import custom charts:** Corrected issue that prevented custom charts with tables from being imported.
------
- **I95-43066 Issue with Database Query:** Resolved an issue when the buffer queue is full, the inflight message was dropped.
------
- **I95-43091 `show fib` does not display interface next hop when gateway IP address is empty:** Corrected display.
------
- **I95-43143 Web server fails to start when template name matches system defaults:** Corrected system behavior when template naming conflicts exist.
------
- **I95-43147 SSR fails to start when an invalid MTU is configured:** Updated NIC support to handle MTU > 9K.
------
- **I95-43150 Highway process crash on receipt of LLDP message on standby node:** Corrected LLDP handling in HA.
------
- **I95-43180 Missing validation for non-forwarding fabric or shared interfaces sharing the same IP address:** Added validation to prevent the use of the same IP address for shared interfaces. 
------
- **I95-43273 GUI upgrade version selector does not show same version from multiple repositories:** Correctly display same version from multiple repositories.
------
- **I95-43276 DSCP steering configured on a child service will cause sessions to be dropped if DSCP values are not defined:** If DSCP values are not defined in child service, correctly inherit them from parent.
------
- **I95-43328 GUI config diff difficult to see in dark mode:** Increased contrast for configuration diff in dark mode.
------
- **I95-43380 Validation errors created by plugins augmenting existing configuration:** Corrected plugin validation handling.
------
- **I95-43389 Minion files truncated:** Corrected condition when empty SSR configuration would cause the minion file to be incorrectly created.
------
- **I95-43468 Unable to commit asset ID in GUI of newly adopted router:** Corrected adoption of new router behavior in GUI.
------
- **I95-43555 Missing 128T-manifest blocks upgrade:** If the user removes the 128T-mist-wan-assurance plugin, the 128T-manifest was removed/downgraded. This plugin is required for SSR 5.4 and higher, and is no longer removable. 
------
- **I95-43557 Highway process crash when per-adjacency TE and device TE is enabled and TE is not configured on all associated adjacencies:** Corrected issue.
------
- **I95-43558 Rolling back from 5.4.1 results in the message "There are no nodes configured" in the GUI:** Corrected issue.
------
- **I95-43604 NAT Keepalive Issue:** Resolved an issue where the keep-alive cache entry was being removed if the flow was invalidated. 
------
- **I95-43611 `modifySessionWithNewFlow` not updating the session flows:** Resolved an issue so the  metric bandwidth is being counted for the correct interface after flow-move.
------
- **I95-43612 REST API swagger documentation is incorrect for `/api/v1/user`:** Corrected API documentation.
------
- **I95-43671 Progress indicators for validate and generate config added:** GUI-based progress indicator added for better user feedback.
------
- **I95-43687 GUI missing menu items after Upgrade:** Resolved an issue where the Service Addresses and Port Ranges menu items were missing from the GUI after an upgrade.
------
- **I95-43706 Quick Start workflow is difficult to see in dark mode:** Increased contrast for quick start in dark mode.
------
- **I95-43836 Inactive node to active node proxy privilege escalation:** Resolved an issue where requests sent to the inactive node would be elevated to admin status when they reached the active node. 

## Release 5.4.1-4

**Release Date:** November 23, 2021

This release replaces the existing `5.4.0-104` release.

### Resolved Issues

- **I95-42990 Upgrade may cause a kernel panic:** Package order dependancy created a situation where upgrades from earlier versions of software may result in a kernel panic. Addressed package order dependencies.

## Release 5.4.0-104

**Release Date:** November 18, 2021

### New Features and Improvements

- **I95-118 BGP Alarm:** A new category of alarm has been added to provide details regarding the BGP connection state. See `bgp_neighbor` under [Alarms](events_alarms.md) for additional information.
------
- **I95-17275 [Single Flow DSCP Packet Steering](config_dscp_steering.md):** The SSR can now use the DSCP value set at the tunnel endpoint as both a representation of traffic engineering priority, and path priority.
------
- **I95-21360 [Transport Based Encryption](config_transport_encryption.md):** Transport based encryption provides more control points for enabling payload encryption.
------
- **I95-24970 New Feature List:** Upon first login to a newly upgraded or installed version of the SSR software, a dialog is displayed that contains a brief list of new features and a link to the Release Notes.
------
- **I95-25600 Updates to `show-tech-support-info`:** OSPF show commands have been added to `show-tech-support-info`.
------
- **I95-26074 Enable Session View:** Added a 'Find Associated Paths' button to each session, which shows another modal listing all SSR routers that are along the path for the session.
------
- **I95-26311 Added Debug and Logs links to Tools Menu:** To provide easy access to these valuable tools, links have been added to the Tools menu on the main page.
------
- **I95-29583 Default Language Setting:** The default language is now saved per user, so the default language is displayed wherever the user logs into the GUI.
------
- **I95-27842 [Per Adjacency Traffic Engineering](bcp_per-adjacency_traffic_engineering.md):** Per-adjacency traffic engineering can be enabled to regulate the upload and download rates between peers.
------
- **I95-30081 Health State Value simplified:** The "Provisioner" column in the router table has been removed, and its status combined with the alarm indicator on the left side of the table.
------
- **I95-31358 VRRP Interface Redundancy:** VRRP is now supported as a protocol for configuring High Availability and Failover. For more information, see [Configuring Dual Router High Availability and VRRP](config_ha_vrrp.md).
------
- **I95-34664 Add Ability to disable `graceful-restart`:** Users can now configure `graceful-restart` as disabled, rather than helper mode or full graceful restart. For more information, see [BGP Graceful Restart](config_bgp.md#bgp-graceful-restart)
------
- **I95-35131 Description Field for static DHCP Pool Assignment:** A description field has been added for static DHCP pool assignment. This is helpful to associate the device name with the static assignment.
------
- **I95-35180 SSH Re-key Support:** The ability to rekey the interval on ssh sessions has been added.
------
- **I95-35570 Limit Private Web and SSH access:** Admin access to private web key and SSH key has been restricted.
------
- **I95-35654 Improved Upgrade Workflow (GUI):** Added `Select Operation` to the router upgrade workflow, allowing users to see which versions are available based on the desired operation (either Download or Upgrade).
------
- **I95-36272 [Service Route Redundancy and Vectors](config_ha.md#service-route-redundancy):** Using a new `enable-failover` command, service routes can now failover to a secondary service route. Using a `vector` value, primary and secondary service routes can be established. Additionally, secondary `next-hop` routes can be defined.
------
- **I95-38790 Default Templates:** A default Standalone Branch configuration template has been provided to streamline the configuration process. This template provides a basic configuration for a list of Juniper supported hardware.  For information, please see [Default Templates](config_templates.md#default-templates).
------
- **I95-38244 Router Page search enhanced:** Searches on the Routers page can now be targeted to specific columns using the search selector.
------
- **I95-39158 CPU Utilization and Memory Tracking:** On the Custom Reports page in the GUI, the CPU and Memory Utilization now displays data for python-based scripts.
------
- **I95-40192 Chinese GUI is now supported:** The SSR now supports a Chinese-language GUI.
------
- **I95-40294 DPDK Upgrade:** With release 5.4, the DPDK libraries have been upgraded to the latest LTS release, version 20.11, bringing in critical bug fixes and support.
------
- **i95-40325 Configurable Metrics Retention:** Metrics retention intervals and storage duration values are now user configurable. See [In-Memory Metrics](config_in-memory_metrics.md) for more information.
------
- **I95-40436 Updated Application ID Domain Data:** Application Identification can be configured to automatically download updated domain and application datatsets daily, weekly (default), or monthly. For more information, see [Update the Domain List](config_domain-based_web_filter.md).
------
- **I95-40416 Google Cloud Platform Support:** The SSR now supports the Google Cloud Platform (GCP).
------
 - **I95-40438 Support for Lenovo X722:** Upgrades to the DPDK version now provide support for the Lenovo Ethernet Connection X722 for 10GbE SFP+.
------
- **I95-40558 OSPF `show` commands:** Several new `show ospf` and `show ospf database` commands have been added.
------
- **I95-40679 Show DPU command pagination:** Pagination has been added to the `show dpu` command to better present the volume of information.
------
- **I95-41016 WAN Assurance:** SSR provides integration with Mist WAN Assurance. For configuration information, see [WAN Assurance Overview](wan_overview.md).
------
- **I95-41093 Show Commit time:** The GUI now displays the time of the last commit operation.
------
- **I95-41418 User Mode accessible from the PCLI:** The `edit user mode` command is now availble in the PCLI. This command sets the configuration mode for both the PCLI and GUI. Setting this field to `advanced` allows the user to view and configure fields that are normally hidden.
------
- **I95-41457 VRF Learning via OSPF:** VRF can now learn via OSPF as well as BGP. For more information, see [VRF Learning.](config_vrf_learning.md)
------
- **I95-42107 User defined Help for Templates:** When defining templates, adminstrators can provide help text for the template that will display for the user completing the templated configuration. For more information, see [Adding Help for a Template.](config_templates.md#adding-help-for-a-template)
------
- **I95-42278 Template filters for use with Subnets:** Filters have been added for use with CIDR formatting.
------
- **I95-42445 Upload Template Schema:** The ability to upload template schema through an API using the GUI. For additional information see [Configuring Templates.](config_templates.md)
------
- **I95-42479 Router Upgrade GUI Improvements:** Several improvements have been made to the Router Upgrade display in the GUI.
------
- **I95-42923 `restore system factory-default` command added:** Configuration is reset to the factory defaults, the configuration is committed, and the system is rebooted. This is an Admin only function. Please see [`restore system factory-default`](cli_reference.md#restore-system-factory-default) for additional information. 

## Resolved Issues

- **I95-23613 Incorrectly logging missing xml and Json config files as an error:** The logging category has been changed to Info.
------
- **I95-35068 Not getting past the Asset Starting state when a bad configuration is stored:** This issue has been resoved.
------
- **I95-38729/I95-41374 Unbinding devices:** VMBus devices are now released at startup.
------
- **I95-39357 Issues when DHCP configured for non-forwarding fabric interface:** Users are now prevented from configuring DHCP on a non-forwarding fabric interface.
------
- **I95-39931 Missing validation for service hierarchy:** Added validation around hierarchical services that requires child services to be at least as specific as their parents.
------
- **I95-40013 `reverse-flow-enforcement` breaks `management-over-forwarding` in HA:** Modifications have been made to `reverse-flow-enforcement` to resolve this issue.
------
 - **I95-40177/I95-41517 Selecting "Differences" in the "Explore Configuration" GUI tab causes web to crash** Resolved an underlying issue where generating a configuration with an unnamed Tenant was allowed.
------
- **I95-40210 Streamline GUI Autocomplete:** Updated the autocomplete feature to improve usability.
------
- **I95-40360 Processes should not log to journal if they already log to file:** Adjusted thresholds for logging to syslog.
------
- **I95-40923 Interface Redundancy Check Failing:** The Interface Redundancy Check has been updated to account for default values being present.
------
- **I95-41319 Reachability metrics not updating:** The reachability metrics for the min & max time to establishment now reset and report correctly.
------
- **I95-41369 TCP sessions are not established when adaptive encryption is enabled on a router in Azure:** Resolved an issue where the Firewall detector was not identifying links that require UDP transform. The firewall discovery was enhanced to use an additional TCP port 1283 to the detection mechanism.
------
- **I95-41601 NAT Keep-alive metric incrementing on the wrong interface:** The metrics now use egress interface to track keep-alive packets.
------
- **I95-41619 Templating breaks on unicode characters:** This issue has been resolved.
------
- **I95-41849 Plugin Commands not working in PCLI:** The PCLI is now sending the correct arguments to the plugin service.
------
- **I95-42017 Configuration validation for Traffic Engineering allows a transmit cap of 0:** Configuration validation returns an error if Traffic Engineering is configured with a Transmit Cap of 0.
------
- **I95-42136 GUI should display subtype in event history:** Added the subtype column to the event history page, as well as a filter option using subtype.
------
- **I95-42306 Shared Physical address accepts null MAC:** A null MAC (00:00:00:00:00:00) is prevented from being configured as a shared-phys-address.
------
- **I95-42310 Cannot delete a Conductor address in the Authority using the GUI:** This issue has been resoved.
------
- **I95-42396 Highway crash after receiving a bad packet:** Resolved an issue in the DPDK internal storage space.
------
- **I95-42441 AP downloads taking too long:** Resolved an issue where a download request would timeout if too many routers were requested at once.
------
- **I95-42563 Attempting to open Help (?) for Adjacency fails:** An issue with the help traceback has been resolved.
------
- **I95-42619 Salt-minion spontaneous restarts:** Resolved an issue where salt minions would spontaneously restart themselves and transition back into the connected state, especially when the conductor is under heavy load.
------
- **I95-42625 Unable to add egress-source-nat-pool to interface:** This issue has been resolved.
------
- **I95-42649 `delete grant access` for access management role not working:** This issue has been resolved.
------
- **I95-42702 Newly created users not being saved:** Resolved an issue where the user datastore was not being written to disk on edits.
------
- **I95-42779 ICMP Probe not detecting interface is UP causing Probe to fail:** Resolved an issue where IcmpProbeManager hangs on an invalid node id.
------
- **I95-42840 Post upgrade peer path flap:** Resolved an issue where keep-alive packets were not processed on the same flow.
------
- **I95-42897 Occasional uninformative "Base Exception: Failed to get random bytes" accompanying traffic failures:** Updated the exception to include error string and source location.
------
- **I95-43205 Changed ssh key permissions:** In AWS instances during the upgrade to 5.4.0, the sshd user and ssh_keys group required for the sshd service have been removed or had their group-id replaced. This issue has been resolved and the sshd service has been preserved.
------
- **I95-43028 Downloaded software for the router does not show up on secondary conductor:** Resolved this issue so that full output is delivered to all nodes.
------
- **I95-43083 ISO imaged system missing rescue boot entry:** Replaced packages that were missing in versions 5.1.6 and 5.1.7.
------
- **I95-43135 Rare Race condition in an HA configuration:** Resolved a rare race condition that may occur if an `export config` command is run during a failover.
------
- **I95-43194 GraphQL Type Supports Proto Primitive:** Incorrect integer types causing an error. This issue has been resolved.
------
- **I95-43244 Reverse Packet injection on Affinity Mismatch:** Resolved an issue where a reverse packet was being injected into a flow with no flow affinity.
------
- **I95-43311 Validation of MSS value not working:** Updated the validation logic to allow for enforced-mss value.

## Caveats

- **I95-42973 `show config running generated` not displaying configuration:** At the time of release, the following commands were not displaying the configuration.
	- `show config running generated`
	- `show config running candidate generated`
This is being addressed, and will be resolved in an upcoming point release.
------
- **I95-43283 Not all configured device interfaces are available in charts:** After upgrading to 5.4, only the `device-interfaces`, `network-interfaces` and `services` that have observed active traffic will be available as permutations for charts and graphs.
------
- **I95-43380 PCLI and UI does not allow the user to edit the [`http-probe-profile`](plugin_http_probe.md) configuration:** There is no known workaround at this time. This is being addressed in an upcoming point release.
