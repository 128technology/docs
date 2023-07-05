---
title: SSR 5.5 Release Notes
sidebar_label: '5.5'
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

- **I95-43243/IN-460 Upgrade and Rollback:** Upgrading or rolling back a system (conductor peer or router) with the interactive installer `install128t`, that is managed by a conductor may result in the system becoming unresponsive. It is highly recommended that upgrades be performed through the conductor UI. Manual upgrades and rollbacks may not be resilient to failures. See [Rolling Back Software](intro_rollback.md) for more information on these operations.
------
- **I95-42452 Conductor Upgrade Time:** Upgrades to version 5.4 and above can take up to 40 minutes due to the number of rpms being upgraded. Please plan accordingly.
------
- **I95-42624 Upgrade Installer:** Before **upgrading to, or installing** version 5.4 and above, update the Installer to at least version 3.1.0. Failing to upgrade the installer may result in a rollback failure, should a rollback be necessary at any time.
------
- **Plugin Upgrades:** If you are running with plugins, updates are required for some plugins **before** upgrading the conductor to SSR version 5.4.0 or higher. Please review the [Plugin Configuration Generation Changes](intro_upgrade_considerations.md#plugin-configuration-generation-changes) for additional information.  

:::note
The Juniper SSR team does not publicly disclose known or resolved CVEs in our public documentation but instead utilizes our internal bug tracking IDs. Customers can obtain the actual CVE numbers by contacting Juniper Support.
:::

## Release 5.5.9-4

**Release Date:** June 2, 2023

### New Features

- **I95-47409 Enhance tracking around Application ID expirations:** The following enhancements have been made to provide additonal insight to Application Identification:
	- Track next hop additions and removals separately for more insight
	- Track the number of times an expiration timer is set (globally and per next hop)
	- Track the number of times an expiration timer is cleared due to a new session (globally and per next hop)
------
- **I95-49354 Display SSD smartctl info in `show platform disk`:** We now display the following disk info, if supported by the disk, in `show platform disk`:
	- Lifetime used
	- Power On Hours
	- TBW (Terabyte Written)
	- TBW per year
------
- **I95-50072 Support for ConnectX-6 Lx PCIe device:** Support has been added for this device.
------
- **I95-50571 Add packet buffer tracking to help analyze buffer exhaustion:** The following features have been added to help diagnose packet buffer pool depletions in certain environments:
	- Track packet buffer locations.
	- Enforce setting of packet location.
	- Add the ability to walk packet buffer pools, count the locations, and display.
------
- **I95-51169 Buffer tracking improvements:** The following improvements have been made to Buffer Tracking:
	- Refined packet buffer location tracking to better identify buffers in use for `TSI` collection.
	- Provide more diagnostic information, when possible.

### Resolved Issues:

- **The following CVE's have been addressed:** I95-47497, I95-48445, I95-48859, I95-49079, I95-49445, I95-49745, I95-49746, I95-49747, I95-49748, I95-50358, I95-50359, I95-50506, I95-50508. 
------
- **I95-48485 Broadcom NIC (NetXtreme) fails to initialize properly:** Resolved an issue with initization errors during memzone creation.
------
- **I95-48518 Application Identification not recognizing Apps on HA systems:** Resolved an issue where the GUI was only pulling Application data from one node in an HA configuration. Application ID Summary display now aggregates data from both nodes.
------
- **I95-48931 Service area Highway crash:** Now prevents crashing in SSR's highway process in unusual race conditions when a session's flow is removed before the session is fully established.
------
- **I95-48942 Routing policy filter condition reference type not validated:** Added a check to verify that when a routing policy condition references a filter, the condition type and filter type match.
------
- **I95-48965, I95-50070, I95-51086 Race condition with routing updates inducing crash in highway process:** Resolved an issue where a routing change that affects the `forwarding-table` can incur a race condition with sessions completing and being removed, which could lead to a highway crash and restart.
------
-  **I95-49350 BFD echo generating latency overhead:** BFD echo tests are now staggered to minimize application latency's contribution to overall peer path latency.
------
- **I95-49431 Unable to edit or add static route config from Conductor GUI:** When editing configuration on the stand-by node of an HA pair, creating a list item with a slash, /, such as specifying the destination-address of a static-route, caused an error. This has been resolved.
------
- **I95-49587 ICMP session classification improvement:** The application lookup for ICMP sessions has been optimized to accurately identify the correct service.
------
- **I95-49603 Process Manager crash:** When a long running process was being cleaned up by the subprocess, the cleanup would fail causing a crash. Long running processes are now properly terminated, which allows the cleanup subprocess to complete correctly.
------
- **I95-49604 No alarm raised when a node is disconnected from the internal synchronization database:** When nodes are unable to connect to the internal synchronization database, a critical alarm is now raised.
------
- **I95-49633 Validation not strict for static assignment within DHCP server configuration:** Configuration for static addresses within DHCP server exists in multiple locations per design. Cross-validation has been added to prevent the same ip-address from being configured and assigned to multiple dhcp-clients.
------
- **I95-49655 Cutting and pasting the output of `show flat` does not work for OSPF:** Resolved the issue that prevented editing the OSPF list.
------
- **I95-49675 Incorrect path in console help message for `export config running`:** The help message now correctly identifies the export path: `Exported files are stored in /etc/128technology/config-exports/ and are stored as GZIP compressed files.`
------
- **I95-49722 Event filter does not work on HA router nodes:** Resolved issues with filtering by node, and an incorrect value was displayed for the node column in the GUI.
------
- **I95-49756 RDP sessions failure over peer path:** Resolved an issue that caused RDP traffic to fail when adaptive encryption and AppId are both enabled.
------
- **I95-49791 Add audit rules to track modification of grub config files:** Added rules to log notifications in case of changes to grub configuration files.
------
- **I95-49925 GRE tunnel health-check not migrating sessions when path is down:** The GRE tunnel manager now removes all sessions before adding new ones rather than modifying the existing sessions.
------
- **I95-49974 Stuck flow not cleared when reverse metadata is incomplete:** Resolved an issue where reverse metadata is coming through incomplete - without the source tenant. The source tenant has been added to the reverse metadata.
------
- **I95-50014 Hitting Buffer Overflow during configuration changes:** Resolved an issue where a config change request may not make it to a managed router, and returns a buffer overflow error.
------
- **I95-50047 Conductor config unable to pass local validation on one of the routers:** Resolved an issue where a router missing the `reachability-profile` configuration may pass validation on conductor.
------
- **I95-50050 VRRP High Availability gets stuck in Active/Active:** The DPDK version has been updated to resolve this issue.
------
- **I95-50247 Duplicate peer path alarms:** Resolved an issue where both BFD and the path MTU feature were generating alarms for the same peer path being down. The criteria for which peer path state changes can trigger peer path events has been tightened.
------
- **I95-50262 Routers disconnected from their conductor may have incorrect log rotation settings:** Resolved an issue where a managed router was not able to pull down the configuration from the Conductor - which includes the log rotation config. The default salt log rotation configuration has been improved, preventing the log from growing too large before the connection to the Conductor can be established. 
------
- **I95-50269 Router clone operation fails:** Implemented checks to prevent cloning obsolete elements and internal lists/containers on legacy versions of the SSR software (SSR Software equal to, or greater than version 4.4).
------
- **I95-50286 Rebooting a node of an HA pair from Linux breaks routing:** Resolved an issue where a delay in the shutdown process caused a node to take over a VRRP interface, creating routing issues. 
------
- **I95-50331 System fails to synchronize keys on startup:** The SSR now dynamically updates the `rsync IP host address` from the non forwarding HA sync interfaces, and will fall back to the `global.init` host IPs if they don't exist.
------
- **I95-50363 MOS Metrics not refreshing:** Resolved an issue where the SLA and MOS values were not being updated in the stats (or PeerPathTable) when a BFD session was brought down. The SLA and MOS stats are now set to 0 when the BFD session is brought down.
------
- **I95-50376 Failure to make config changes after rollback:** Resolved an issue where commits would not take effect after rolling back an HA router, because of older/newer version conflicts. 
------
- **I95-50445, I95-49377 i40e and ice devices enter malicious descriptor detection state, preventing forwarding of traffic:** Resolved an issue where fragmented packet chains larger than 8 buffers were discarded causing a malicious descriptor event. 
  - The below `dpdk.log` snippet provides an example of the event:
```
[DPDK| -- ] ERROR (00007f03ec18e700) i40e_dev_alarm_handler(): ICR0: malicious programming detected
[DPDK| -- ] WARN  (00007f03ec18e700) i40e_handle_mdd_event(): Malicious Driver Detection event 0x02 on TX queue 6 PF number 0x01 VF number 0x00 device 0000:08:00.1
[DPDK| -- ] WARN  (00007f03ec18e700) i40e_handle_mdd_event(): TX driver issue detected on PF
```
  - Added hooks for the NIC driver to trigger an unrecoverable event and invoke the Highway lockup detector mechanism.
------
- **I95-50534 Race condition between NetworkInterfaceManager and FastLane:** Resolved a race condition caused by adding and deleting the same network interface in a very short window of time, potentially causing a system crash.
------
- **I95-50554 No dynamic synchronization of repos to the routers:** Resolved an issue where it was necessary to restart 128T on the Conductor in order for the Conductor to recognize newly added repositories and sync them down to the assets. Authenticated repos are now automatically synchronized when repos are added to the conductor.
------
- **I95-50710 Configuration cannot be applied to router when its time is ahead of the conductor:** Implemented time detection for configurations using a future time that is corrected upon commit. This resulted in an `mtime` older than what is in the datastore, and the configurations were rejected.
------
- **I95-50722 Highway crashes during session migration:** Resolved a crash in the SSR's highway process, due to a race condition between configuration changes and BFD sessions.
------
- **I95-50736 SSH key change not propogated to secondary conductor:** Resolved an issue where an SSH key change to `/etc/128technology/ssh/pdc_ssh_key` was not automatically detected and resynced between peer node and conductor nodes.
------
- **I95-50754 Race condition between ICMP ping request and a reverse flow:** Resolved a crash due to a race condition when `service ping icmp-request` is matched against a partially installed flow.
------
- **I95-50778 Event History filter not working:** Resolved an issue where searching on the Event History page didn't show matching results when the search string is only found in the Details column.
------
- **I95-50823 Support for time-offset DHCP option:** `int-32 encoded-type` has been added to provide support for the time-offset DHCP option.
------
- **I95-50967 SSR is not allowing other DHCP relay traffic to pass through:** When the SSR acts as a DHCP Relay, it will no longer drop packets received from other relay agents on the network. Instead the packets will be routed appropriately as per the configured policies.
------
- **I95-50977 Installer fails to download software when the Conductor software proxy is enabled:** Resolved an issue where when the Conductor software proxy is being used, DNF transactions to the conductor repo go through the proxy, despite the repo pointing to a local tunnel to the conductor. These transactions now go through the proper tunnel.
------
- **I95-51006 Nodes stuck in connected state after upgrade:** On an HA conductor, if the user is performing an upgrade on the first conductor node and that user makes a config commit during the upgrade, then the configuration's modified time will become out of sync between the two conductor nodes. When the conductor first node is finished upgrading the result is a loop where the configuration keeps getting committed by each node back and forth until a new commit is made. This issue has been resolved by allowing the peer conductor node to accept the config despite the perceived version disparity. Please note performing a commit mid-upgrade is not supported.
------
- **I95-51044 Hide `forwarding-core-mode` on conductor:** Disabled the `forwarding-core-mode` setting on conductor nodes, since this setting doesn't apply to conductor.
------
- **I95-51087 SSR fails to download firmware after upgrading the conductor:** Resolved an issue where the first time a conductor is upgraded and **conductor-only** is selected in the software-update settings, the proxy service on the conductor does not work correctly, and downloads fail. The downloads no longer fail.
------
- **I95-51177 EoSVR sets wrong egress MAC:** `ethernet-over-svr` now correctly sets egress MAC address when using `outbound-only` mode.
------
- **I95-51427 GUI not displaying full version information:** The GUI **About Page** now displays additional version information that was previously only displayed in the PCLI `show system version detail`.
------
- **WAN-1958 Mist agent crashes:** Increased internal file system limits which were preventing some services from starting correctly at boot. Limits were raised based on expected system usage.

## Release 5.5.8-7

**Release Date:** February 1, 2023

### New Features

- **I95-47947 Increase max CoreDump size to 4GB:** The maximum size of coredumps now defaults to 4G. This value can be configured in environment config by modifying the `maxCoredumpSize` field of the new `crashReporting` object. Any manual modifications to `coredump.conf` will be overwritten whenever the service is started. 

:::important
Upgrading to this release version will cause `coredump.conf` to be re-written with 4G limits for coredumps even if `coredump.conf` had been updated manually for a higher value!
:::

### Resolved Issues:

- **The following CVE's have been addressed:** I95-48464, I95-48644, I95-48648, I95-48650, I95-48653, I95-48907, I95-49039.
------
- **I95-44926 Configuration validation for `as-path` incorrect for certain values:** Resolved an issue where a subset of 4-byte BGP private AS numbers was not accepted inside AS path specifications for routing policy `modify-as-path` actions.
------
- **I95-45478 Segmentation Fault in the Dynamic Peer Update process:** Resolved an issue with multi-threaded access to a data member, leading to a segmentation fault.
------
- **I95-46336 Peer connection not established after AWS upgrade:** Resolved an issue where an AWS C5 instance size can fail to initialize when more than one accelerated network interface is configured.
------
- **I95-47888 Race condition in Application identification stats tracking causes crash:** This issue has been resolved. 
------
- **I95-47992 HTTP service not working in WAN Assurance:** Resolved an issue where HTTP traffic is dropped when using a combination of application-identification, adaptive-encryption, and spoke-to-hub-to-spoke topology (outbound-only peer-connectivity).
------
- **I95-48163 Only services with load-balanced paths are shown in `show services`:** Resolved an issue where services without load-balanced paths were missing from show services output.
------
- **I95-48324 Application Identification not parsing domain names:** The Application Identification parsing mode has been updated to correctly parse domain names on hub to spoke outbound traffic.
------
- **I95-48352 Application ID is not identifying MS-Teams correctly:** Resolved an issue where sessions with IP addresses as their domain names were not classified correctly when the information was received via HTTP web proxy. Sessions with IP addresses as their domain name are now verified against the IP tree, and not the domain name database.
------
- **I95-48396 `show-rib` limited to 512 entries:** The `show rib` count maximum has been increased.
------
- **I95-48447 JWTs signing does not meet stringent security standards:** Changed how JWTs are signed to increase security posture.
------
- **I95-48529 BFD hold-down timer does not hold-down peer service-paths:** Resoled an issue where peer service-paths do not remain down while the BFD session / peer status is in the hold-down period after transitioning from down to up. Peer service-paths status now reflects the peer status, and sessions will not be moved back to peers that have re-established connectivity, but are still in the hold-down period.
------
- **I95-48580 Application summary classification fails for hub-to-spoke sessions:** The spoke now learns application names for sessions when receiving packets from a hub with application identification disabled.
------
- **I95-48600 Compare Session ID's to prevent flow collisions:** Re-use of sessions is prevented when waypoint pool is exhausted and sessions linger on egress router.
------
- **I95-48689 Top Sessions not displaying source address:** Restored the **Source** column in the Top Sessions table. 
------
- **I95-48723 HA sync not running after systems reconnect:** Historical metrics and events are synced between HA nodes after extended downtime.
------
- **I95-48731 Sessions created on a `fin-ack` may get stuck:** Resolved an issue where, if tcp-state-enforcement is set to allow, a TCP session is established from a fin-ack may not get torn down in a timely manner.
------
- **I95-48772 `show running config` command displays an error:** Resolved an issue where `show config` requests on the PCLI failed if enum leaf-list entries were changed.
------
- **I95-48872 `show sessions by-id` doesn't display correctly tcp state or retransmission counts:** `show sessions by-id` now correctly display `tcp state` and `retransmissions` when `udp-transform` is enabled for a session.
------
- **I95-48897 Adaptive encryption breaks after flow move:** Resolved an issue where the session breaks during failover when adaptive encryption is enabled.
------
- **I95-48904 Stuck pinhole session after flow invalidation:** Resolved an issue with a stuck session that was setup from hub to HA spoke after a routing change.
------
- **I95-48950 Application identification modify packet is dropped:** Packets with `inline-modify` that traverse the BFD pinhole are now handled correctly.
------
- **I95-48988 High CPU for packet processing core:** Resolved an issue where the CPU can spike to 100% after a failover from internode/interrouter path to local breakout when failover is enabled for local breakout.
------
- **I95-49106 Degradation in performance during file rotation:** This issue has been resolved.
------
- **I95-49124 `show network-interface application` always has `unavailable` router name:** This issue has been resolved.
------
- **I95-49134 DHCP server does not work when device IDs on HA interface do not match:** Resolved an issue where a DHCP server interface may instead forward DHCP requests through the `service-area` and out to the WAN.
------
- **I95-49139 `show network-interface application` renders poorly for empty hostnames:** The DHCP server state script has been updated to not escape `<empty>` hostname.
------
- **I95-49143 Read data core utilization from graphQL metrics:** Timeseries is now used to improve the accuracy of the Data Core Utilization metrics.
------
- **I95-49157 Poor GUI and PCLI performance for other users during a change/validate/commit operation:** Resolved the performance issue by optimizing the export config API.
------
- **I95-49166 OSPF is not configurable using the GUI:** This issue has been resolved.
------
- **I95-49225 Packets containing only path-metrics metadata are dropped:** Resolved an issue where FPM calculations caused these packets to be dropped when flows were affected due to routing changes.
------
- **I95-49242 When HMAC is disabled, the automatic MSS adjustment calculation for `enforced-mss = automatic` may be wrong :** The Automatic MSS adjustment calculation has been corrected (expanded). 
------
- **I95-49341 BGP next hop exception being thrown:** Resolved an issue where a duplicate BGP next hop resulted in an exception. 

## Release 5.5.7-3

**Release Date:** November 15, 2022

### New Features

- **I95-48223 Add Application-specific information to `show sessions by-id`:** The following information has been added to `show sessions by-id`: 
	- domainName
	- uri
	- category
	- overrideServiceName
	- appStatsTrackingKey (combination of application, client ip, ingress-interface, next-hop, and traffic-class) 

### Resolved Issues:

- **I95-32789 Peer metrics unavailable after Conflux synchronization:** Resolved an issue with HA routers where the metrics application stops streaming metrics to the peer node after loading configuration.
------
- **I95-43302 Rename Third-Party menu text:** The menu text has been changed to **External** to more accurately reflect the links to other Juniper platforms.
------
- **I95-45478 Segmentation Fault in the Dynamic Peer Update process:** Resolved an issue with multi-threaded access to a data member, leading to a segmentation fault.
------
- **I95-46677 Modify GUI to not resize dashboard tiles:** Dashboard tiles now do not resize when the window is resized.
------
- **I95-46904 Labels in Reachability Profile are not correct:** Added missing labels to Traffic Class and Time to Establishment information screens.
------
- **I95-47475 Session capture not downloadable for a read only user:** Adjusted permissions to provide access to session capture files to read-only users.
------
- **I95-47787 Worker core packet processing spikes to 100%:** Added the ability to tune the [Reverse Packet Session Resiliency](config_reference_guide.md#reverse-packet-session-resiliency) `Minimum Packet Count` (default is 3) and `Detection Interval` (default is 5) settings for session failover without requiring forward packet, and resolved the underlying issue that caused excessively high worker-core CPU.
------
- **I95-47909 Handle GRE tunnels in ICMP reachability probe:** The base interface for egress is now used if the `icmp-probe probe-address` is the same as the tunnel destination, and the `internal-address` is used as the source if the `egress-interface` is `gre-overlay`.
------
- **I95-48076 SSR Failover on GRE tunnels not working:** The base interface giid is now used to identify the state of a GRE tunnel next-hop.
------
- **I95-48108 Service Ping for a Service without Source NAT uses Source IP Address:** The service-ping now uses the source-ip as the packet source-ip if provided.
------
- **I95-48158 Unable to capture child services using session capture:** When a session capture is configured on a child service (e.g., `social.internet` instead of `internet`), the session is now recorded.
------
- **I95-48246 Peer path GQL query should provide a node filter:** Added a parameter to stats on peer-path so that the node can be overwritten.
------
- **I95-48353 Optimize Application-ID stats allocation:** Reduced memory usage by avoiding unnecessary app-id stats tracking allocations.
------
- **I95-48357 Process Fault on Failover with DSCP Steering:** Resolved an issue where DSCP Steering sessions would fail to move a flow under certain circumstances and, when using DSCP value 0, crash.
------
- **I95-483381 Race condition in session teardown:** Shared context is now maintained to allow all packet processing to be completed before session teardown. 
------
- **I95-48507 VLAN packets are generated without a valid VLAN from the flow-move cache:** Resolved an issue where sessions could be modified incorrectly when a VLAN is present and session resiliency is enabled for failover.
------
- **I95-48685 GUI and/or PCLI unresponsive:** Resolved an issue where on an HA conductor the user interface would become unresponsive if a managed router was offline or unreachable.

## Release 5.5.6-2

:::important
The following issue has been discovered in the releases listed here:

- 5.5.5
- 5.5.6

If an HA Conductor queries a disconnected router from the Conductor GUI Router page or from the Conductor PCLI, the conductor may encounter periods of poor performance until the requests time out. The issue has been resolved in the next patch release with I95-48685. 

For immediate resolution on the impacted releases, contact Juniper Technical Support, or your SE.
:::

**Release Date:** October 21, 2022

### Resolved Issues:

- **The following CVE's have been addressed and resolved:** I95-47805, I95-48048, I95-48049. 
------
- **I95-39454 Created User cannot access PCLI operations:** Resolved an issue where in rare cases, during bulk user additions, it was possible for the operation to fail, leaving the new user created but unable to login.
------
- **I95-41992 Warning for Rate-Limit with Flow-Limit values at 0:** A warning has been added to advise users that this will cause dropped packets.
------
- **I95-42320 BGP aggregate-address not working:** Add support for BGP address summarization.
------
- **I95-44957 Azure is not able to identify the asset-id of the depolyed conductor and router:** The Azure ID has been modified to be more easily identifiable.
------
- **I95-44976 Highway issue when modifying an app-id session:** Resolved an issue where modifying an app-id session with a new session-id can lead to a crash.
------
- **I95-46701 Packet Loss on Headend Router:** Added `device-interface` rx/tx descriptor ring size to resolve this issue.
------
- **I95-46966 BGP Connection Restarts on SVR Peer Failover:** Resolved an issue with FIB entry setup that was causing BGP connection reset when the session fails over.
------
- **I95-47271 VRRP Alarm for Backup becoming Primary:** There is now an alarm when the backup VRRP node in an HA pair takes over as the primary.
------
- **I95-47552 LTE modem not coming up after upgrade:** Resolved an issue with modem detection and port scanning for Quectel EC25.
------
- **I95-47585 Transmit-failure increments when Traffic Engineering is enabled:** When `device-interface traffic-engineering` is enabled, the `stats/packet-processing/sent/interface-failure` statistic is no longer erroneously incremented.
------
- **I95-47767 Next Hop choice of "Blackhole" does not stay visible in Conductor:** This option was displayed in error, as the option is ignored. It has been removed.
------
- **I95-47872 App-ID summary tracking of failed sessions still incremented when feature disabled:** App-ID stats tracking for failed sessions now checks if the feature is enabled and responds appropriately.
------
- **I95-47967 Cloud bootstrapper does not bootstrap the deployed Conductor:** Resolved an issue where the configuration was being rejected by the cloud bootstrapper when the device was a conductor.
------
- **I95-47969 Increased Memory use when generating TSI:** Resolved an issue where the s`ave runtime-stats` command and TSI generation could result in particularly high memory usage when Application Identification was enabled.

	The `save runtime-stats` command no longer operates across multiple nodes and routers, and will not aggregate the metrics to disk on the conductor. This is to protect against excessive memory consumption. This is a change in functionality; however the public metrics APIs achieve the same result and are the preferred mechanism to collect authority wide metrics.
------
- **I95-47981 Ignore VRRP advertisements if the VRID doesn't match:** The VRID is now validated before accepting an advertisement to resolv an issue where VRRP advertisements intended for a different router were being processed.
------
- **I95-48018 APP-ID implementation with proxy web server unable to identify traffic correctly:** Resolved an issue reading certain HTTP headers that was causing Application Identification to miss them.
------
- **I95-48103 Commit triggered BGP issue:** Resolved an issue where BGP neighbors configured with a short hold time might experience a BGP session flap during a configuration commit when app-ID is enabled.
------
- **I95-48125 Save TSI streaming from router to conductor not working:** Adding a node and router argument to the PCLI command `save tech-support-info` now works correctly.

## Release 5.5.5-3

**Release Date:** September 23, 2022

### Resolved Issues:

- **I95-48038 502 Error returned if managed routers are offline:** Resolved an issue introduced in Release 5.5.4-8 that caused HTTP requests on the conductor to return a 502 error for all requests if a managed router is offline.

## Release 5.5.4-8

**Release Date:** September 19, 2022

:::important
Release 5.5.4-8 has been withdrawn from the Release Repository due to an issue identified shortly after release. This issue is being resolved and a new patch release will be forthcoming. 
:::


### New Features

- **I95-47418 Audit Events for Plugin Install/Remove:** There is a new audit event that tracks when a plugin is installed or uninstalled. This can be viewed on the Audit History page in the GUI or in the PCLI by running `show events type admin.plugin`

### Resolved Issues

- **The following CVE's have been addressed and resolved:** I95-47482, I95-47483, I95-47484, I95-47485.
------
- **I95-38408 DHCP server on wrong vlan sends offer in response to discover message:** Hosted DHCP servers that do not have an explicit vlan configured are now explicitly treated as vlan 0, and handle any DHCP packets that are untagged/vlan 0, in order to prevent those packets from being multicasted to multiple DHCP servers.
------
- **I95-44976 Highway issue when modifying an `app-id` session:** Resolved an issue where modifying an app-id session with a new session-id can lead to a crash.
------
- **I95-45847 Duplicate Alarms on Multiple Routers:** Resolved duplicate alarms by obtaining alarms from only one node in an HA pair.
------
- **I95-46126 Router Status:** Resolved an issue in HA configurations when a router is connected to HA Conductor 1, but not directly connected to HA Conductor 2, alarms generated on the router are now seen on Conductor 2 - the conductor to which the router is not directly connected. 
------
- **I95-46281 Update Kernel to RHCK 8.6:** Updated the kernel to integrate the latest security fixes.
------
- **I95-46662 Tenant prefix differences on two HA router nodes are not validating correctly:** Added a validation check to ensure that the tenant-prefixes between two redundant interfaces are identical.
------
- **I95-46918 GUI and PCLI out of sync when new configuration elements added/modified:** Resolved an issue where `show network-interface` and `show config` were not updating properly.
------
- **I95-46919 LDAP Users Not Shown in GUI Users Display:** Updated username requirements and the ability to identify issues with usernames not meeting those requirements. See [Username and Password Policies](config_password_policies.md) for username requirements.
------
- **I95-46921 `128status.sh` script incorrectly checks for non-existent listening port:** Removed port 830 check for software versions 5.3.0 and greater
------
- **I95-47551 Keep-alives are not generated for unidirectional outbound-only sessions:** Resolved an issue with keep-alive generation for unidirectional outbound-only sessions.
------
- **I95-47552 LTE modem not coming up after upgrade:** Resolved an issue with modem detection and port scanning for Quectel EC25.
------
- **I95-47655 BGP issues with VRRP:** VRRP failover may cause routing to not function if internal device numbering is not consistent across the redundant nodes.

## Release 5.5.3-4

**Release Date:** August 11, 2022

### New Features

- **I95-41561 EoSVR Active / Standby:** EoSVR Active Standby configuration gives you the ability to configure two different endpoints on the P2P L2 service, while making sure only one is active at a time. For more information, see [Configuring Ethernet Over SVR for Active/Standby](config_EthoSVR_activestandby.md).
------
- **I95-44863 Automatic Core Assignment after Reboot:** On systems where `forwarding-core-mode` is set to `automatic`, if the CPU core count changes the software will automatically recalculate the core count and allocation at reboot.
------
- **I95-46145 Extend clear app-id PCLI command to support stats purge:** The `clear app-id` command has been extended to clear expired client and next hop stats. For more information, see [`clear app-id stats`](cli_reference.md#clear-app-id-stats).
------
- **I95-46747 Improved the Password user experience:** You now are re-prompted up to three times for the current password if it is incorrect. If a new password does not meet the strength check, you are prompted with that information, and required to update the password.

### Resolved Issues

- **I95-38408 DHCP server on wrong vlan sends offer in response to discover message:** Hosted DHCP servers that do not have an explicit vlan configured are now explicitly treated as vlan 0, and handle any DHCP packets that are untagged/vlan 0, in order to prevent those packets from being multicasted to multiple DHCP servers.
------
- **I95-44434 Peer metric sends IP of WAN interface instead of the expected string:** Logic has been added to show the available destination address.
------
- **I95-44548 Application Summary Sort Order:** Resolved an issue with the Application Summary sort order changing unintentionally.
------ 
- **I95-45890 Service paths for BGP over SVR routes are not being rebuilt:** Resolved an issue when the vector configuration is changed on a network interface, the service paths for BGP over SVR routes are not being rebuilt. 
------
- **I95-46056 `show ntp` has no output from PCLI, even though NTP is configured:** The output of show ntp will now report IP addresses of the time servers rather than resolve hostnames.
------
- **I95-46281 Kernel Update:** Update to RHCK 8.6 for the latest security fixes.
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
------
- **I95-47371 Config code generation changing enum values to lowercase:** Resolved an issue that prevented setting device interface `link-settings` to anything other than `auto`.

## Release 5.5.2-5

**Release Date:** June 30, 2022

### New Features

- **I95-40195 LDAP does not allow search base to be configured correctly:** Search base parameters, filter generation, certificate assurance, and logging enhancements have been added to the `ldap-server` configuration. See [LDAP](config_ldap.md) for more information.
------
- **I95-40333 Save credentials for accessing SSR software repositories:** `set software access-token` is a new PCLI command to save credentials for accessing SSR software repositories. This provides a way to run `install128t repo authenticate` without dropping to a linux shell. For additional information on this command, see [`set software access-token`](cli_reference.md#set-software-access-token).
------
- **I95-44863 Automatic Core Assignment after Reboot:** On systems where `forwarding-core-mode` is set to `automatic`, if the CPU core count changes the software will automatically recalculate the core count and allocation at reboot.
------
- **I95-46562 Allow targeting another router or node when saving tech-support-info:** GUI: A button has been added to the **Logs** page in the GUI to download a tech-support-info bundle. This allows downloading a router's `tech-support-info` directly from the Conductor GUI. <br />
PCLI: The PCLI command `save tech-support-info` can now collect logs from another node. Using the Conductor's PCLI, a `tech-support-info` bundle can be collected from a Managed Router or the HA peer.

### Resolved Issues

- **The following CVE's have been addressed and resolved:** I95-45060, I95-45123, I95-45165, I95-46020, I95-46359.
------
- **I95-45126 Split-brain after the sync interface goes down:** Resolved an issue that if the SSR software experienced a crash while it owned an interface from an X553 device, other devices hosted by the same chip could be impacted.
------
- **I95-45814 No Bandwidth statistics visible in GUI:** Resolved an issue when processing high numbers of services and service routes which prevented a subset of stats from being stored and displayed.
------
- **I95-46114 SSR flooded with Highway messages:** The chatty `InterfaceMap::Exception: Unable to find path to peer` highway log has been suppressed.
------
- **I95-46136 Unused app-id stats not being purged fast enough:** Resolved an issue where app-id stats tracked per client, per app, per next-hop are not cleaned up when inactive.
------
- **I95-46169 RIB Doesn't Update Connected Route After Changing Network Interface Address Prefix from /24 to /27:** Resolved an issue when changing the prefix length for a network interface address, the RIB was not updated and routing protocols were not aware of the change.
------
- **I95-46314 Configuring Static Assignment with Client-Identifier Causes DHCP failure:** Updated config validation to verify that, within a single DHCP server host-service, all static assignments use unique client-identifiers.
------
- **I95-46332 VRRP Does Not Work with Ethernet Controller X710 for 10GbE SFP+:** Configuring VRRP on an Intel X700 series NIC can see discard broadcast packets due to the source pruning feature which is enabled by default. This change disables source pruning when VRRP is enabled on these NICs.
------
- **I95-46394 Conductor missing generated GIID's:** Resolved a rare case where the GIID on generated redundant interfaces was missing.
------
- **I95-46419 FEC w/ OutBound Only Fails:** Resolved an issue where FEC actions are not installed properly after the modifcation to resolve the outbound only path.
------
- **I95-46451 Active Node not updating properly:** Resolved an issue with inter-node VRRP wherein the virtual interface could get stuck in a bad state after a flap.
------
- **I95-46454 ICMP manager excessively logs ICMP echo replies with no matching context:** This issue has bee resolvd.
------
- **I95-46613 Flow move may not happen without forward packet for outbound only sessions:** Resolved an issue that when a session has been idle for more than 10 seconds, sessions for outbound-only connections may not failover properly without a forward packet.
------
- **I95-46641 Modem lockup after reset on dual LTE system:** This issue has been resolved. 

### Caveats

- **I95-46822 Revertible failover traffic may not be restored when reverse traffic is present:** For a "revertible-failover" service policy, when the preferred path is restored and a session no longer traverses an internode dogleg path, it may take seconds for traffic to be restored when forward traffic is present; in situations where **only** reverse traffic is present, traffic may not be restored. This issue will be resolved in a future release.

## Release 5.5.1-6

**Release Date:** June 1, 2022

### New Features

- **I95-37417 Additional factory default session-type configuration:** Added factory-default session-types for NetBIOS Name Service, NTP, and LDAP over UDP.
------
- **I95-40130 Factory Defaults for Conductor Communication:** Added SaltStack, Conductor, and IKE default session-types. For new deployments, SIP, SIPS, and IPSEC-NAT use NAT Keep Alive by default, and the timeout for IPSEC-NAT is 125 seconds.
------
- **I95-44769 Add linux system logs to the Tech Support Information data:** Added settings to SaveTechSupportInfo to allow for customizations of journalctl settings, as well as some additional collection.

### Resolved Issues

- **The following CVE issues have been addressed and resolved with this release:**
I95-45054, I95-45056, I95-45059
------
- **I95-35228 DHCP waypoint addresses not displayed on standby node in UI:** Resolved an issue where the PCLI logic was not matching the GUI Network Interface table.
------
- **I95-36758 Redistributed service route distance not configurable:** Support has been added for the configuration of admin distance for kernel routes generated by services with service routes and for BGP over SVR services.
------
- **I95-38408 DHCP server on wrong vlan sends offer in response to discover message:** Hosted DHCP servers that do not have an explicit vlan configured are now explicitly treated as vlan 0, and handle any DHCP packets that are untagged/vlan 0, in order to prevent those packets from being multicasted to multiple DHCP servers.
------
- **I95-39274 DNS-based services kill asset connection resiliency:** Resolved an issue where an internal commit was bouncing the kni254 interface and causing a series of connection resets.
------
- **I95-40348 Unable to rename a router:** Increased the maximum message size so that the larger configuration changes can be processed correctly.
------
- **I95-40904 Power save mode not working:** This issue has been resolved.
------
- **I95-41931 Peers show the IP address not the router name in the GUI:** This issue has been resolved, and both the IP address and router name are displayed. 
------
- **I95-42318 Broken symlink for plugins results in a highway crash:** Resolved the handling of a broken symlink for plugins, which was resulting in a failure to apply config and a highway crash.
------
- **I95-42438 Save Tech Support tries to run when SSR service is down:** In situations where the PCLI is still active, but the SSR service is down, trying to run `save tech support` will appear to work, but does not return any info. This issue has been resolved, and will return a message when information is not retrievable. 
------
- **I95-42608 BGP over SVR not able to open BGP session when routingManager is active on different node than interface:** This has been resolved by sending the packet to the node where routingManager is active via the inter node path.
------
- **I95-43606 No communication between Routers:** In rare instances the BFD Pinhole feature experienced collisions between forward session flows. Session modification has been addressed and collisions are now avoided.
------
- **I95-43779 DHCP IP Address is not released:** Updated the state machine to cause DHCP-enabled interfaces to send out a DHCP Request for their current IP address.
------
- **I95-43897 Planned failover did not work properly:** Resolved an issue where a waypoint missing from an internal database prevented failover.  
------
- **I95-44001 Peer uptime showing "Unavailable":** Peer path uptime now displays the correct values.
------
- **I95-44142 Automated Provisioner race condition:** Resolved a rare crash where applications would attempt to get information about already-closed sockets when responding to API requests.
------
- **I95-44443 NTP Server config not always picked up:** Resolved an issue where NTP configuration was changed but the backend would not take action on those changes.
------
- **I95-44551 DHCP Relay not working after upgrade:** A packet for traffic matching a summary service may be dropped because it was incorrectly flagged as hierarchical on the SVR peer. Well known non-hierarchical services such asDHCP relay will no longer perform hierarchical service checks on the peer.
------
- **I95-44554 Metadata packets may incorrectly pin flow affinity:** Worker core affinity latching has been prevented, resolving this issue. 
------
- **I95-44722 Time based HMAC failure after HA reboot:** Resolved a buffering issue where device interfaces are now flushed upon becoming active to avoid handling of inactive packets.
------
- **I95-44726 Invalid return code returned by T1 card firmware creating a memory leak:** Resolved a buffer leak in the wanpipe driver.
------
- **I95-44730 Export event history exports only last 30 minutes:** Resolved an issue where `time` was captured, but never updated. 
------
- **I95-44854 Extra "Application" column in Top Sessions panel:** The extra column has been removed. 
------
- **I95-44988 SSR Stuck in Upgrade status:** Improved logging to detect when an installer session is started and there is an already an active interactive installer session; for example when an interactive installer session was left open.
------
- **I95-45113 snmp override of the IfTable:** An issue with SNMP reporting has been resolved.
------
- **I95-45124 RBAC Config Endpoints Leaking Information:** Resolved an issue where some configuration endpoints would allow users with incorrect permissions make requests.
------
- **I95-45171 Mist Service Route is not auto-generated when Mist WAN-Assurance is enabled by default:** This issue has been resolved.
------
- **I95-45348 Update salt master and minion to 3002.8:** This update resolves several CVE's and requires that the conductor must be running this release containing these fixes **before** upgrading a router. 
**Important** Please see the Caveat below for additional important information about HA upgrades.
------
- **I95-45374 Service-class with a rate-limit of 0 will drop traffic:** A warning is displayed if users configure a service-class to rate-limit but don't set max-flow-burst/max-flow-rate values (default is set to 0).
------
- **I95-45514 Only allow DSCP-steering config on forwarding interfaces:** DSCP Steering config no longer appears on non-forwarding interfaces.
------
- **I95-45541 LDAP users are unable to login to the PCLI due to permission errors:** This issue has been resolved.
------
- **I95-45696 Memory leak in PAM challenge library:** Resolved a memory leak in the PAM challenge library. 
------
- **I95-45842 PCLI `show events` does not paginate correctly:** This issue has been resolved.
------
- **I95-45882 Rare case where an invalid DHCP server configuration generated:** This issue has been resolved.
------
- **I95-46055 Add warning when transmit caps are too low:** Users now get a warning when configuring a traffic-engineering transmit-cap under 1Mbps.
------

### Caveats

- **I95-45348: Update salt master and minion to 3002.8:** When upgrading an HA pair to version 5.5.1, please be aware of the following: While updating the conductors in an HA pair, the upgraded conductor node asset state will remain DISCONNECTED if the active `automatedProvisioner` is not running a corrected version (see table below). When performing an HA conductor upgrade the node running the oldest software assumes leadership. However, the older version will not be able to talk to the new software on the upgraded conductor. 

The active `automatedProvisioner` can be determined by running the command `show system processes`. Once the upgrade begins on the old node, the newly upgraded conductor takes over.

#### Corrected Versions

| Router Software Version | Minimum Required Conductor Version |
| --- | --- |
| 5.5.1 | 5.5.1, 5.6.0 or later |

## Release 5.5.0-43

**Release Date:** March 7, 2022

### New Features

- **I95-28791 Forward Error Correction:** Forward Error Correction (FEC) adds resiliency against packet loss between two points in the network. Profiles are configured at the authority level and are not traffic-specific, which allows them to be used on any service and any router in the authority. For information about using this feature, please see [Configuring Forward Error Correction](config_forward_error_correction.md).
------
- **I95-37464 WAN Assurance Application Summary:** The Application Summary displays session statistics and information by application, category, and clients. See [Using Application Summary](how_to_use_app_summary.md) for more information. 
------
- **I95-40660 Kernel Upgrade:** The OS kernel has been upgraded to that of CentOS 8.4 to address several CVEs and provide support for Wireguard and the Cordoba platform. 
------
- **I95-41072 Enhanced Web Filtering:** Web Filtering allows administrators to limit or prevent user access to internet content. These limitations may be based on company or organization policies, or because a domain may be know to contain malicious, inappropriate, or dangerous content. Individual services and service policies can be configured on the SSR to allow or deny access to an entire domain category, or specific domains within a category. For more information, see [Web Filtering.](config_domain-based_web_filter.md)
------
- **I95-41527 Application Identification:** Application Identification is a component of Enhanced Web Filtering, and can automatically learn, identify, and classify applications processed by the SSR and store them in the web filtering cache. For more information, see [Application Identification.](config_app_ident.md)
------
- **I95-43395 ESP protocol for DSCP Traffic Steering:** DSCP Traffic Steering now supports the ESP protocol. For more information, see [Configuring DSCP Steering.](config_dscp_steering.md)
------
- **I95-44224 Autocomplete for Resource Groups:** Autocomplete has been added to the pcli when configuring resource groups. 

### Resolved Issues

- **I95-25630 Gateway IP is required:** When creating or changing a service-route with a next-hop of a static IP net-int, a gateway IP is required. If no gateway IP has been specified, the network-interface gateway will be used. 
------
- **The following CVE issues have been addressed and resolved with this release:**
I95-40268, I95-41591, I95-42448, I95-43261, I95-43471, I95-43625, I95-44087, I95-44088, I95-44206
------
- **I95-42339 `show stats traffic-eng internal-application` not handling spaces:** This issue has been resolved. 
------
- **I95-42689 Missing config validation for `ethernet-over-svr` on HA routers:** Validation for EoSVR on HA routers has been added.
------
- **I95-42942 GUI Session Capture not working:** Resolved an issue with Packet Count and Session Count options. Session Capture now works as expected. 
------
- **I95-43327 Exchange FPM loss information between adjacent SSR nodes:** Added a mechanism to communicate marking counts between adjacent nodes to allow both sides to understand the calculated loss. 
------
- **I95-43809 CLI commands fail to run from the Conductor:** Resolved an issue where requests made to a HA conductor would not always try its peer.
------
- **I95-44085 SVR Savings Incorrectly calculated:** Resolved a computational issue that was providing an incorrect calculation.
------
- **I95-44107 Service routes with a GRE interface in the next-hop fail validation:** Updated the validation process for mapping interfaces.
------
- **I95-44144 Update Zookeeper Logging:** Zookeeper logging library has been replaced with reload4j.
------
- **I95-44175 Changes made to Service-Route->Reachability-Detection Settings do not show the correct state:** The service path builder has been updated to resolve this issue.
------
- **I95-44207 Unprovisioned OSPF configuration causes the PCLI to generate an error when issuing show ospf:** This issue has been resolved.
------
- **I95-44246 The "Piping Output..." message does not clear:** When running a grep command from the pcli, the piping output does not clear. This issue has been resolved.
------
- **I95-44252 Unneeded package dependencies may cause upgrade or rollback failures:** The packages and logic is obsolete and have been removed.
------
- **I95-44278 Paste configuration error:** Resolved an issue where pasting multiple lines that beginning with `configure` caused an error.
------
- **I95-44424 Cannot set log level configured on remote router from conductor CLI:** This issue has been resolved.
------
- **I95-44425 `show service-paths` not consistently displaying output:** This issue has been resolved.
------
- **I95-44480 Not allowing some valid identifiers or values:** This issue has been resolved.
------
- **I95-44517 Time check incorrectly locking upgrade process:** The time check has been replaced with a process name check.  
------
- **I95-44534 Session Capture in GUI not working:** A Session Capture triggered from the GUI now creates a capture for new sessions traversing the same path as this session. 
------
- **I95-44538 Invalid Stat increment:** This issue has been resolved. 
------
- **I95-44591 Paste-config does not allow small config snippets to be pasted:** Resolved an issue where the list keys were not being passed as part of the `value` in the transaction.

### Caveats

- **I95-44691 Restart the SSR after disabling Application Identification:** On a system with Application Identification enabled; if you choose to disable Application Identification, you must restart the SSR.
------
- **I95-44915 Application Summary page may take a long time to load:** Wait times of up to 1.5 minutes may occur when displaying large amounts of data. Additionally, display issues may be encountered if you attempt to change nodes while in this load process.
------
- **I95-45946: Forwarding Plane Fault preventing packet forwarding:** Systems containing the Intel x553 NIC and running the IXGBE driver may stop forwarding packets due to an SSR forwarding plane fault. In configurations where data plane interfaces and non-forwarding interfaces such as management or high availability synchronization are mixed on the same IXBGE-based PCI device, a highway failure may prevent the non-forwarding interfaces from passing traffic. 

	**Workaround:** Restart the SSR software. 

	This issue has been found in earlier versions of the SSR software. Please use this workaround should you encounter this issue on an earlier release. 
