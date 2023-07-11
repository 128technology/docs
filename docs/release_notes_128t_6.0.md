---
title: SSR 6.0 Release Notes
sidebar_label: '6.0'
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
- **I95-42624 Upgrade Installer:** Before **upgrading to, or installing** version 5.4 and above, update the Installer to at least version 3.1.0. Failing to upgrade the installer may result in a rollback failure, should a rollback be necessary at any time. The Installer typically prompts you update when a new version is available. Select **Update** when prompted.
------
- **Plugin Upgrades:** If you are running with plugins, updates are required for some plugins **before** upgrading the conductor to SSR version 5.4.0 or higher. Please review the [Plugin Configuration Generation Changes](intro_upgrade_considerations.md#plugin-configuration-generation-changes) for additional information.
------
- **I95-51007 Conductor only - cpuProperties-core value isolating cores:** *In SSR software versions 6.0.0 and greater*, the `cpuProperties-cores` setting in `/etc/128technology/local.init` is erroneously isolating cores on conductor nodes when set. Because the conductor does not forward packets, there should be no traffic cores allocated to or isolated on the conductor for packet forwarding. This setting was previously ignored on the conductor, but while resolving an earlier issue with the installer and initializer that allocated CPU cores for traffic, that is no longer the case. 

It is recommended that prior to upgrading the conductor that the user modify local.init to set this setting to `0`. For example, a setting like this in `/etc/128technology/local.init`:

```
  "cpuProperties" : {
    "cores" : 4
  },
``` 
should be changed to:
```
  "cpuProperties" : {
    "cores" : 0
  },
```

Note that only the relevant section of `local.init` is shown for clarity. All other settings should be left the same.
The change should be made on both nodes of an HA system. If a conductor is already running 6.0.0 or later it will be necessary to `systemctl restart 128T` on each node after making this change. If the modification is made prior to upgrade it is not necessary to restart 128T service as this will be performed during the upgrade. Making this change on versions earlier than 6.0.0 will not affect operation, and will not require a restart. 

This issue will be corrected in an upcoming release.

:::note
The Juniper SSR team does not publicly disclose known or resolved CVEs in our public documentation but instead utilizes our internal bug tracking IDs. Customers can obtain the actual CVE numbers by contacting Juniper Support.
:::


## Release 6.0.10-5

**Release Date:** May 12, 2023

### New Features

- **I95-48862 Load balance sessions across BGP RIB Entries with multiple paths:** Resolved an issue when BGP was used to build a routing table, only the first next hop was used. All next hops are now used, and load balancing occurs over all routing protocol routes.
------
- **I95-49354 Display SSD smartctl info in `show platform disk`:** We now display the following disk info, if supported by the disk, in `show platform disk`:
	- Lifetime used
	- Power On Hours
	- TBW (Terabyte Written)
	- TBW per year
------
- **I95-49824 SVR Transport Reuse** In deployments where the number of SVR sessions between SSRs are limited due to carrier settings, the established BFD channel is leveraged to encapsulate SVR sessions. For details about using this feature, see [SVR Transport Reuse.](config_bfd_tunnel.md)
------
- **I95-50072 Support for ConnectX-6 Lx PCIe device:** Support has been added for this device.
------
- **I95-50510 New fields for IPFIX:** The SSR IPFIX implementation was not sending the industry standard fields of flowStartMilliseconds and flowEndMilliseconds. In the new implementation, all IPFIX records include these fields. The start time is set to the start time of the flow, and the end time is always set to the time the last packet was received on the flow. For intermediate records, this indicates that the flow is still ongoing but provides the last activity timestamp. For the end records, this indicates when the last packet was received on the flow prior to the session terminating. For additional information, see [IPFIX](concepts_application_discovery.md#ipfix).
------
- **I95-50571 Add packet buffer tracking to help analyze buffer exhaustion:** The following features have been added to help diagnose packet buffer pool depletions in certain environments:
- Track packet buffer locations.
- Enforce setting of packet location.
- Add the ability to walk packet buffer pools, count the locations, and display.

### Resolved Issues 

- **The following CVE's have been identified and addressed in this release:** I95-48445, I95-48448, I95-48643, I95-49079, I95-49445, I95-49456, I95-49745, I95-49746, I95-49747, I95-49748, I95-49912, I95-49913, I95-49914, I95-50358, I95-50359, I95-50506, I95-50508, I95-50523, I95-50535, I95-50790.
------
- **I95-37833 Apply password policy more consistently:** The password policy for SSR users has been updated, and now requires passwords to have a special character in addition to previous requirements. 
:::important
Please refer to [Password Policies](config_password_policies.md) for updated password requirements.
:::
------
- **I95-42379 BGP over SVR global service policy:** [Security and Service Policy](config_bgp.md#security-policy-and-service-policy) configuration options are provided for specifying the policy to be used for generated BGP-over-SVR services.
------
- **I95-48485 Broadcom NIC (NetXtreme) fails to initialize properly:** Resolved an issue with initization errors during memzone creation.
------
- **I95-48518 Application Identification not recognizing Apps:** Resolved an issue where the GUI was only pulling Application data from one node in an HA configuration. Application ID Summary display now aggregates data from both nodes.
------
 - **I95-49340 Crash when the unexpected input of `tenant-prefix` with no `source-address` is committed:** Validation has been added to restrict the `tenant-prefix source-address` to a minimum of one.
------
-  **I95-49350 BFD echo generating latency overhead:** BFD echo tests are now staggered to minimize application latency's contribution to overall peer path latency.
------
- **I95-49447 Conditional BGP advertisement is not respected:** Resolved an issue that if a peer went down and came back up, the conditional advertisement was no longer respected. 
------
- **I95-49514 Linux interfaces bounced on startup:** Resolved an issue where all Linux interfaces managed by 128T are bounced once on 128T startup.
------
- **I95-49564 Reduce volume of logs during pending lookups:** The error logs during a pending lookup has been changed to a muted error log with a stat.
------
- **I95-49603 Process Manager crash:** When a long running process was being cleaned up by the subprocess, the cleanup would fail causing a crash. Long running processes are now properly terminated, which allows the cleanup subprocess to complete correctly.
------
- **I95-49604 Alarm when a node is disconnected:** An alarm is now raised when a node is disconnected from the internal synchronization database.
------
- **I95-49633 Validation not strict for static assignment within DHCP server configuration:** Configuration for static addresses within DHCP server exists in multiple locations per design. Cross-validation has been added to prevent the same ip-address from being configured and assigned to multiple dhcp-clients.
------
- **I95-49675 Incorrect path in console help message for `export config running`:** The help message now correctly identifies the export path: `Exported files are stored in /etc/128technology/config-exports/ and are stored as GZIP compressed files.`
------
- **I95-49754 Waypoint re-use causing duplicate reverse flows:** Resolved a case where when the waypoint pool is nearly depleted, released waypoints were reused prematurely causing errors when installing reverse flows.
------
- **I95-49791 Add audit rules to track modification of grub config files:** Added rules to log notifications in case of changes to grub configuration files.
------
- **I95-49925 GRE tunnel health-check not migrating sessions when path is down:** The GRE tunnel manager now removes all sessions before adding new ones rather than modifying the existing sessions.
------
- **I95-49969 Permission Denied error when attempting to self-generate a webserver certificate:** Resolved an issue that prevented users with the admin role from creating a new self-signed web certificate via the PCLI command `create certificate self-signed webserver`.
------
- **I95-49974 Stuck flow not cleared when reverse metadata is incomplete:** Resolved an issue where reverse metadata is coming through incomplete - without the source tenant. The source tenant has been added to the reverse metadata.
------
- **I95-50014 Hitting Buffer Overflow during configuration changes:** Resolved an issue where a config change request may not make it to a managed router, and returns a buffer overflow error.
------
- **I95-50034 Issues with stuck sessions in load balancer:** Resolved an issue with session modify, where gateway changes on the same egress interface can fail due to a missing ARP.
------
- **I95-50047 Conductor config unable to pass local validation on one of the routers:** Resolved an issue where a router missing the `reachability-profile` configuration may pass validation on conductor.
------
- **I95-50050 VRRP High Availability gets stuck in Active/Active:** The DPDK version has been updated to resolve this issue.
------
- **I95-50247 Duplicate peer path alarms:** Resolved an issue where both BFD and the path MTU feature were generating alarms for the same peer path being down. The criteria for which peerPath state changes can trigger peer path events has been tightened.
------
- **I95-50260 `show idp events` does not honor the `router` or `node` arguments:** Resolved an issue where `show idp events` did not honor the `router` and `node` arguments and always executed against the local node. The command is now executed correctly, using the specified arguments.
------
- **I95-50262 Routers disconnected from their conductor may have incorrect log rotation settings:** Resolved an issue where a managed router was not able to pull down the configuration from the Conductor - which includes the log rotation config. The default salt log rotation configuration has been improved, preventing the log from growing too large before the connection to the Conductor can be established. 
------
- **I95-50269 Router clone operation fails:** Implemented checks to prevent cloning obsolete elements and internal lists/containers on legacy versions of the SSR software (SSR Software </= version 4.4).
------
- **I95-50286 Rebooting a node of an HA pair from Linux breaks routing:** Resolved an issue where a delay in the shutdown process caused a node to take over a VRRP interface, creating routing issues. 
------
- **I95-50331 System fails to synchronize keys on startup:** The SSR now dynamically updates rsync IP host address from the non forwarding HA sync interfaces, and will fall back to the global.init host IPs if they don't exist.
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
- **I95-50543 systemd unable to start 128T after upgrade:** This issue has been resolved by ensuring that the netfilter kernel is installed.
------
- **I95-50554 No dynamic synchronization of repos to the routers:** Resolved an issue where it was necessary to restart 128T on the Conductor in order for the Conductor to recognize newly added repositories and sync them down to the assets. Authenticated repos are now automatically synchronized when repos are added to the conductor.
------
- **I95-50699 Upgrade process to 6.0.8 failure:** Mist-managed systems with low available memory could fail to upgrade. An updated dependency and fix for these Mist-managed systems has been published via the cloud and will be absorbed the next time a customer attempts an upgrade.
------
- **I95-50710 Configuration cannot be applied to router when its time is ahead of the conductor:** Implemented time detection for configurations using a future time that is corrected upon commit. This resulted in an `mtime` older than what is in the datastore, and the configurations were rejected.
------
- **I95-50736 SSH key change not propogated to secondary conductor:** Resolved an issue where an SSH key change to `/etc/128technology/ssh/pdc_ssh_key` was not automatically detected and resynced between peer node and conductor nodes.
------
- **I95-50754 Race condition between ICMP ping request and a reverse flow:** Resolved a crash due to a race condition when `service ping icmp-request` is matched against a partially installed flow.
------
- **I95-50778 Event History filter not working:** Resolved an issue where searching on the Event History page didn't show matching results when the search string is only found in the Details column.
------
- **I95-50787 Rebooting the OS from the conductor throws error code 400:** Resolved an issue in the GUI with the reboot button on the Router page. When trying to reboot a router, the button would fail and display **Error: EOF**. 
------
- **I95-50823 Support for time-offset DHCP option:** `int-32 encoded-type` has been added to provide support for the time-offset DHCP option.
------
- **I95-50834 NodeMonitor crash on 128T startup when hardware interface is missing:** Resolved a NodeMonitor crash when the interface configuration is not present.
------
- **I95-50967 SSR is not allowing other DHCP relay traffic to pass through:** When the SSR acts as a DHCP Relay, it will no longer drop packets received from other relay agents on the network. Instead the packets will be routed appropriately as per the configured policies.
------
- **I95-50977 Installer fails to download software when the Conductor software proxy is enabled:** Resolved an issue where when the Conductor software proxy is being used, DNF transactions to the conductor repo go through the proxy, despite the repo pointing to a local tunnel to the conductor. These transactions now go through the proper tunnel.
------
- **I95-50979 Routers remain in connected state:** Resolved an issue where assets will perform a new highstate unnecessarily if a commit occurs while a highstate is already in progress, causing assets to take a long time to get to the running state.
------
- **I95-51006 Nodes stuck in connected state after upgrade:** On an HA conductor, if the user is performing an upgrade on the first conductor node and that user makes a config commit during the upgrade, then the configuration's modified time will become out of sync between the two conductor nodes. When the conductor first node is finished upgrading the result is a loop where the configuration keeps getting committed by each node back and forth until a new commit is made. This issue has been resolved by allowing the peer conductor node to accept the config despite the perceived version disparity. Please note performing a commit mid-upgrade is not supported.
------
- **I95-51007 Conductor is incorrectly honoring core pinning:** The `cpuProperties` cores setting in `/etc/128technology/local.init` was erroneously isolating cores on conductor nodes when set, even though this setting is intended for a router. This would cause a reduction in available processing cores for normal conductor operations. This setting will now be ignored on the conductor.
------
- **I95-51021 Package to Image conversion fails on FIPS enabled SSR:** Conversion of package-based to image-based is now supported for systems with FIPS 140-2 mode enabled.
------
- **I95-51044 Hide forwarding-core-mode on conductor:** Disabled the `forwarding-core-mode` setting on conductor nodes, since this setting does not apply to a conductor.

### Caveats
- **I95-51087 SSR fails to download firmware after upgrading the conductor:** An issue has been identified where the first time a conductor is upgraded and `conductor-only` is selected in the `software-update` settings. The proxy service on the conductor does not work correctly, and downloads attempted by the router will fail. This issue will be resolved in the next release.

  **_Workaround:_** Make a simple configuration change and commit the change. Any configuration change is sufficient to start the internal proxy service. Once this commit has been made this will no longer be an issue.

## Release 6.0.9-3

**Release Date:** April 3, 2023

### Resolved Issues 

:::important
- **I95-49594 Highway Crash:** In a system where any of the following are configured:
	- `application-identification` is enabled, 
	- a service is defined with `domain-name child services`, or 
	- a `service address` is configured as a `domain`
and there are established flows for any of these services, a link flap triggering a flow invalidation (changes to FIB) will induce a crash in the highway process of the SSR. This issue exists in versions 5.6.3 through 5.6.6, and is resolved in 5.6.7.
:::

- **I95-50543 SSR may not start after upgrade:** A race condition during startup may cause some services to start out of order, causing the SSR to not start. A reboot is required to start the system normally. 

## Release 6.0.8-20

**Release Date:** March 7, 2023

### New Features

- **I95-47947 Increase max CoreDump size to 4GB:** The maximum size of coredumps now defaults to 4G. This value can be configured in environment config by modifying the `maxCoredumpSize` field of the new `crashReporting` object. Any manual modifications to `coredump.conf` will be overwritten whenever the service is started. 

:::important
Upgrading to this release version will cause `coredump.conf` to be re-written with 4G limits for coredumps even if `coredump.conf` had been updated manually for a higher value!
:::
------
- **I95-48571 IDP Topology User Experience Improvements:** The SSR will include the auto-generated IDP mode when enabled as a part of `show idp application status`. Additionally, enabling `hub` mode will not result in engine bring-up errors.
------

### Resolved Issues

- **The following CVE's have been identified and addressed in this release:** I95-48464, I95-48859, I95-48907, I95-49039, I95-49079, I95-49445, I95-49745, I95-49746, I95-49747, I95-49748.
------
- **I95-34384 Rotated datastores with different permissions:** Resolved an issue where some rotated datastore files had different permissions.
------
- **I95-44926 Configuration validation for `as-path` incorrect for certain values:** Resolved an issue where a subset of 4-byte BGP private AS numbers was not accepted inside AS path specifications for routing policy `modify-as-path` actions.
------
- **I95-46336 Peer connection not established after AWS upgrade:** Resolved an issue where an AWS C5 instance size can fail to initialize when more than one accelerated network interface is configured.
------
- **I95-47797 Packet duplication does not interoperate well with outbound-only adjacencies:** When utilizing the packet-duplication feature (`service-policy -> session-resiliency = packet-duplication`), any peer adjacencies marked as `outbound-only` are no longer used. Packets are only duplicated along bidirectional paths.
------
- **I95-47992 HTTP service not working in WAN Assurance:** Resolved an issue where HTTP traffic is dropped when using a combination of application-identification, adaptive-encryption, and spoke-to-hub-to-spoke topology (outbound-only peer-connectivity).
------
- **I95-48054 STEP not working in Core Network:** Resolved an issue where processing STEP route updates can cause modification of unrelated FIB entries, potentially interrupting existing sessions.
------
- **I95-48061 DHCP server not starting after upgrade:** Resolved an issue where existing DHCP servers were not coming back up after upgrading from pre-6.0.X to post-6.0.X SSR software.
------
- **I95-48107 EoSVR sessions not stable:** Resolved an issue with loss of connectivity to STEP EoSVR peer. The STEP route is now held in place and available when STEP connectivity is restored. 
------
- **I95-48163 Only services with load-balanced paths are shown in `show services`:** Resolved an issue where services without load-balanced paths were missing from show services output.
------
- **I95-48232 Ability to ping lost after failover:** We now prevent unnecessary FIB changes (which may lead to a short traffic interruption) when new routes are added to the RIB that are more specific than some configured service IP prefixes.
------
- **I95-48324 Application Identification not parsing domain names:** The App-ID parsing mode has been updated to correctly parse domain names.
------
- **I95-48352 Application ID is not identifying MS-Teams correctly:** Resolved an issue where sessions with IP addresses as their domain names were not classified correctly. Sessions with IP addresses as their domain name are now verified against the IP tree, and not the domain name database.
------
- **I95-48396 `show-rib` limited to 512 entries:** The `show rib` count maximum has been increased.
------
- **I95-48447 JWTs signing does not meet stringent security standards:** Changed how JWTs are signed to increase security posture.
------
- **I95-48580 Application summary classification fails for hub-to-spoke sessions:** The spoke now learns application names for sessions when receiving packets from a hub with application identification disabled.
------
- **I95-48581 Missing entry timestamp for `show app-id cache`:** Additional timing information has been added to `show app-id cache` to help identify the oldest entry.
------
- **I95-48582 `show bfd` command ignoring parameters:** The query parameters are now passed to the REST endpoint to be used byt the `show bfd` command.
------
- **I95-48590 ACK RTT Improvements:** Resolved an issue where the stats were not resetting properly, and added supporting sampling to ACK RTT tracking.    
------
- **I95-48641 Recreating BFD flow when an outbound-only session is reset:** Flow creation is now deferred until a reverse packet arrives from the peer, similar to the initial creation case.
------
- **I95-48684 SSR not answering ARP requests:** Increased `internal-application traffic-engineering` rates for ARP traffic which was being dropped in a multiple packet-processing core environment incorrectly due to an over aggressive traffic engineering profile.
------
- **I95-48689 Top Sessions not displaying source address:** Restored the **Source** column in the Top Sessions table. 
------
- **I95-48723 HA metrics sync not running after systems reconnect:** Historical metrics and events are synced between HA nodes after extended downtime.
------
- **I95-48869 Validation for idp-policy incorrectly permits mixing modes across access-policies (e.g., `strict` and `alert`):** The default IDP policy is now handled as `IDP off` in all cases.
------
- **I95-48872 `show sessions by-id` doesn't correctly display tcp state or retransmission counts:** `show sessions by-id` now correctly display `tcp state` and `retransmissions` when `udp-transform` is enabled for a session.
------
- **I95-48897 Adaptive encryption breaks after flow move:** Resolved an issue where the session breaks during failover when adaptive encryption is enabled.
------
- **I95-48904 Stuck pinhole session after flow invalidation:** Resolved an issue with a stuck session that was setup from hub to HA spoke after a routing change.
------
- **I95-48927 Audit log disc failure mode:** Added a Failure Notification parameter and failure mode to inform users that the `auditd.conf` log disc is nearing capacity, or has reached capacity, and that action is required.
------
- **I95-48942 Routing policy filter condition reference type not validated:** Added a check to verify that when a routing policy condition references a filter, the condition type and filter type match. 
------
- **I95-48950 Application identification modify packet is dropped:** Packets with `inline-modify` that traverse the BFD pinhole are now handled correctly.
------
- **I95-48988 High CPU for packet processing core:** Resolved an issue where the CPU can spike to 100% after a failover from internode/interrouter path to local breakout when failover is enabled for local breakout.
------
- **I95-49106 Degradation in performance during file rotation:** This issue has been resolved.
------
- **I95-49118 HA LTE Interfaces go down and impact BGPoSVR and Conductor:** The handling of FIB updates due to interface state changes has been optimized to avoid possible traffic loss for unaffected FIB entries.
------
- **I95-49134 DHCP server does not work when device IDs on HA interface do not match:** Resolved an issue where a DHCP server interface may instead forward DHCP requests through the `service-area` and out to the WAN.
------
- **I95-49166 OSPF is not configurable using the GUI:** This issue has been resolved.
------
- **I95-49225 Packets containing only path-metrics metadata are dropped:** Resolved an issue where FPM calculations caused these packets to be dropped when flows were affected due to routing changes.
------
- **I95-49242 When HMAC is disabled, the automatic MSS adjustment calculation for `enforced-mss = automatic` may be wrong:** The Automatic MSS adjustment calculation has been corrected (expanded). 
------
- **I95-49341 BGP next hop exception being thrown:** Resolved an issue where a duplicate BGP next hop resulted in an exception.
------
- **I95-49451 Secondary conductor failed to synchronize after upgrade:** This issue was resolved by re-ordering the start up process for the 128T service.
------
- **I95-49454 Error while creating a new Radius user from the GUI:** The create user API now rejects requests with invalid input parameters. 
------
- **I95-49655 Cutting and pasting the output of `show flat` does not work for OSPF:** Resolved the issue that prevented editing the OSPF list.
------
- **I95-49722 Event filter does not work on HA router nodes:** Resolved issues with filtering by node, and an incorrect value was displayed for the node column in the GUI.
------
- **I95-49756 RDP sessions failure over peer path:** Resolved an issue that caused RDP traffic to fail when adaptive encryption and AppId are both enabled.
------
- **I95-49778 Conductor GUI not showing data metrics for routers running:** Resolved an issue where API keys were not properly synced down to the managed routers which caused certain router data to not show up on the GUI.
------
- **I95-50058 Performance regression in Running Config APIs:** Resolved a constant cache miss for a specific set of the running config APIs.
------
- **WAN-1598 IDP Policies not set on the SSR:** This issue has been resolved. 

## Release 6.0.7-8

**Release Date:** December 5, 2022

### New Features

- **I95-47222 Add a Cleanup boot function for brownfield conversions:** Added a function that removes all kernels and unmatched `initramfs` files, as well as removing the copies of the saved files post-conversion from their original location.
------
- **I95-47409 Enhance tracking around Application ID expirations:** The following enhancements have been made to provide additonal insight to Application Identification:
	- Track next hop additions and removals separately for more insight
	- Track the number of times an expiration timer is set (globally and per next hop)
	- Track the number of times an expiration timer is cleared due to a new session (globally and per next hop)
------
**I95-48223 Add Application-specific information to `show sessions by-id`:** The following information has been added to `show sessions by-id`:
	- domainName
	- uri
	- category
	- overrideServiceName
	- appStatsTrackingKey (combination of application, client ip, ingress-interface, next-hop, and traffic-class)

### Resolved Issues

- **The following CVE's have been addressed and resolved:** I95-48644, I95-48648, I95-48650, I95-48653.
------
- **I95-32789 Peer metrics unavailable after Conflux synchronization:** Resolved an issue with HA routers where the metrics application stops streaming metrics to the peer node after loading configuration.
------
- **I95-43302 Rename Third-Party menu text:** The menu text has been changed to **External** to more accurately reflect the links to other Juniper platforms.
------
- **I95-44957 Azure is not able to identify the asset-id of the deployed conductor and router:** The Azure ID has been modified to a value that can be processed by Azure.
------
- **I95-46561 Peer table Sort by Destination does not work consistently:** Resolved an issue with sorting for Peer Path Source/Destination columns in the GUI.
------
- **I95-46677 Modify GUI to not resize dashboard tiles:** Dashboard tiles now do not resize when the window is resized.
------
- **I95-46879 ICMP error responses are not NATed when sent over SVR:** Certain ICMP error messages can now be encapsulated over SVR when enabled within the neighborhood or adjacency configuration: Flows that are UDP over SVR are able to have their ICMP error messages encapsulated. 
------
- **I95-46904 Labels in Reachability Profile are not correct:** Added missing labels to Traffic Class and Time to Establishment information screens.
------
- **I95-47075 Disable weak SSH ciphers:** Resolved issues where the remote SSH server was configured to allow weak key exchange algorithms on `tcp/22` and `tcp/930`. 
------
- **I95-47271 VRRP Alarm for Backup becoming Primary:** There is now an alarm when the backup VRRP node in an HA pair takes over as the primary.
------
- **I95-47475 Session capture not downloadable for a read only user:** Adjusted permissions to provide access to session capture files to read-only users.
------
- **I95-47476 Session table associated paths not scalable, scroll bar hidden:** The Session Table window has been enlarged to more clearly show information.
------
- **I95-47519 Add First Article Inspection scan output to Tech Support Info:** Added the output of the FAI (First Article Inspection) script to Tech Support Info.
------
- **I95-47787 Worker core packet processing spikes to 100%:** Added the ability to tune the [Reverse Packet Session Resiliency](config_reference_guide.md#reverse-packet-session-resiliency) `Minimum Packet Count` (default is 3) and `Detection Interval` (default is 5) settings for session failover without requiring forward packet, and resolved the underlying issue that caused excessively high worker-core CPU.
------
- **I95-47909 Handle GRE tunnels in ICMP reachability probe:** The base interface for egress is now used if the `icmp-probe probe-address` is the same as the tunnel destination, and the `internal-address` is used as the source if the `egress-interface` is `gre-overlay`.
------
- **I95-47929 Missing BGP advertisement after deleting all sessions after an upgrade:** Resolved an issue where BGP update suppress was not removing any pending withdrawls.
------
- **I95-47992 HTTP service not working in WAN Assurance:** Resolved an issue where HTTP traffic is dropped when using a combination of application-identification, adaptive-encryption, and spoke-to-hub-to-spoke topology (outbound-only peer-connectivity).
------
- **I95-48070 IDP breaking DHCP for bridge mode interfaces:** Resolved an issue where the IDP Docker install configured values that interfered with bridging on the SSR.
------
- **I95-48076 SSR Failover on GRE tunnels not working:** The base interface giid is now used to identify the state of a GRE tunnel next-hop.
------
- **I95-48103 Commit triggered BGP issue:** Resolved an issue where BGP neighbors configured with a short hold time might experience a BGP session flap during a configuration commit when app-ID is enabled.
------
- **I95-48108 Service Ping for a Service without Source NAT uses Source IP Address:** The service-ping now uses the source-ip as the packet source-ip if provided.
------
- **I95-48138 Enabling metadata only works for packets that match the port-range specified:** Resolved this issue by identifying the specific flow, and enabling reverse metadata for a that flow.
------
- **I95-48158 Unable to capture child services using session capture:** When a session capture is configured on a child service (e.g., `social.internet` instead of `internet`), the session is now recorded.
------
- **I95-48163 Only services with load-balanced paths are shown in "show services":** Resolved an issue where services without load-balanced paths weremissing from show services output.
------
- **I95-48181 "Failed to send IPFIX interim record" log messages:** Changed log level from Error to appropriate logging level for the cases when ipfix records should not be generated.
------
- **I95-48246 Peer path GQL query should provide a node filter:** Added a parameter to stats on peer-path so that the node can be overwritten.
------
- **I95-48343 Cannot complete Image-based installation if secondary disks are greater than 2TB:** Resolved the issue so that image-based installation will complete correctly for systems containing drives larger than 2TB.
------
- **I95-48357 CoreDump on Failover with DSCP Steering:** Resolved an issue where DSCP Steering sessions would fail to move a flow under certain circumstances and, when using DSCP value 0, crash.
------
- **I95-48381 Race condition in session teardown:** Shared context is now maintained to allow all packet processing to be completed before session teardown.
------
- **I95-48427 BGP ignoring multihop TTL (Time To Live) setting leading to invalid nexthop:** Resolved an issue where BGP may temporarily "forget" about the TTL value configured for a neighbor. 
------
- **I95-48476 SSR cannot be adopted into Mist if DNS server 1.1.1.1 is unreachable:** Resolved an issue where blocking 1.1.1.1 prevented the `adopt` command and the GUI first-time mist onboarding process from completing. 
------
- **I95-48507 VLAN packets are generated without a valid VLAN from the flow-move cache:** Resolved an issue where sessions could be modified incorrectly when a VLAN is present and session resiliency is enabled for failover.
------
- **I95-48508 Keep-alive cache may cause worker core CPU spikes:** Resolved potential worker core utilization CPU spikes by utilizing aggressive keep-alive timeouts.
------
- **I95-48529 BFD sending link notification before hold-down timer expires:** Resolved an issue where peer service-paths do not remain down while the BFD session / peer status is in the hold-down period after transitioning from down to up. Peer service-paths status now correctly reflect the peer status. Sessions will not be moved back to peers that have re-established connectivity but are still in the hold-down period.
------
- **I95-48579 Application director does not handle overlapping prefixes correctly:** The radix tree has been updated and now handles overlapping prefixes correctly. 
------
- **I95-48580 Application summary classification fails for hub-to-spoke sessions:** The spoke now learns application names for sessions when receiving packets from a hub with application identification disabled.
------
- **I95-48581 No entry timestamp for `show app-id cache`:** Additional timing information has been added to `show app-id cache`.
------
- **I95-48600 Compare Session ID's to prevent flow collisions:** Re-use of sessions is prevented when waypoint pool is exhausted and sessions linger on egress router.
------
- **I95-48656 Reduce TSI service log limit:** The size of the Tech Support Info journal has been restricted to prevent excessive resource consumption.
------
- **I95-48685 GUI and/or PCLI unresponsive:** Resolved an issue where on an HA conductor the user interface would become unresponsive if a managed router was offline or unreachable.
------
- **I95-48686 Transmitted packet buffers held too long:** The packet pool sizing has been adjusted to prevent pool depletion when local.init overrides for descriptor counts are present.
------
- **I95-48731 Sessions created on a `fin-ack` may get stuck:** Resolved an issue where, if tcp-state-enforcement is set to allow, a TCP session is established from a fin-ack may not get torn down in a timely manner.
------
- **I95-48772 `show running config` command displays an error:** Resolved an issue where `show config` requests on the PCLI failed if enum leaf-list entries were changed.
------
- **I95-48826 Unable to get BGP over SVR connection up:** Updates made to use hostname as `peer-path-id` in forward metadata for LTE, PPPoE, and T1 on cloud-managed routers.
------
- **I95-48872 `show sessions by-id` doesn't display correctly tcp state or retransmission counts:** `show sessions by-id` now correctly display `tcp state` and `retransmissions` when `udp-transform` is enabled for a session.
------
- **I95-48897 Adaptive encryption breaks after flow move:** Resolved an issue where the session breaks during failover when adaptive encryption is enabled.
------
- **I95-48904 Stuck pinhole session after flow invalidation:** Resolved an issue with a stuck session that was setup from hub to HA spoke after a routing change.
------
- **WAN-1372 Improve CPU Usage Reporting:** Devised a more efficient collection scheme to minimize the CPU impact when collecting the CPU and memory data.

## Release 6.0.5-17

:::important
The following issue has been discovered in the releases listed here:

- 6.0.4
- 6.0.5

If an HA Conductor queries a disconnected router from the Conductor GUI Router page or from the Conductor PCLI, the conductor may encounter periods of poor performance until the requests time out. The issue has been resolved in the next patch release with I95-48685. 

For immediate resolution on the impacted releases, contact Juniper Technical Support, or your SE.
:::

**Release Date:** October 14, 2022

### New Features

- **I95-47795 Serial and VGA rescue boot options:** from the IBU ISO A "Maintenance Operations" submenu has been added to the image-based ISO, and VGA and serial rescue mode options along with a reboot option have been added to the menu.

### Resolved Issues

- **The following CVE's have been addressed and resolved:** I95-47482, I95-47483, I95-47484, I95-47485, I95-47805, I95-48048, I95-48049.
------
- **I95-39454 Newly created user cannot access PCLI operations:** Resolved an issue where in rare cases, during bulk user additions, it was possible for the operation to fail, leaving the new user created but unable to login.
------
- **I95-42320 BGP aggregate-address not working:** Add support for BGP address summarization.
------
- **I95-44976 Highway issue when modifying an app-id session:** Resolved an issue where modifying an app-id session with a new session-id can lead to a crash.
------
- **I95-45847 Duplicate Alarms on Multiple Routers:** Resolved duplicate alarms by obtaining alarms from only one node in an HA pair.
------
- **I95-46056 `show ntp` has no output from PCLI, even though NTP is configured:** The output of show ntp will now report IP addresses of the time servers rather than resolve hostnames.
------
- **I95-46281 Update Kernel to RHCK 8.6:** Updated the kernel to integrate the latest security fixes.
------
- **I95-46662 Tenant prefix differences on two HA router nodes are not validating correctly:** Added a validation check to ensure that the tenant-prefixes between two redundant interfaces are identical.
------
- **I95-46701 Packet Loss on Headend Router:** Added `device-interface` rx/tx descriptor ring size to resolve this issue.
------
- **I95-46918 GUI and PCLI out of sync when new configuration elements added/modified:** Resolved an issue where `show network-interface` and `show config` were not updating properly.
------
- **I95-46919 LDAP Users Not Shown in GUI Users Display:** Updated username requirements and the ability to identify issues with usernames not meeting those requirements. See [Username and Password Policies](config_password_policies.md) for username requirements.
------
- **I95-46921 `128status.sh` script incorrectly checks for non-existent listening port:** Removed port 830 check for software versions 5.3.0 and greater
------
- **I95-46966 BGP Connection Restarts on SVR Peer Failover:** Resolved an issue with FIB entry setup that was causing BGP connection reset when the session fails over.
------
- **I95-47271 VRRP Alarm for Backup becoming Primary:** There is now an alarm when the backup VRRP node in an HA pair takes over as the primary.
------
- **I95-47274 Service Paths not showing status:** The `state` column in the GUI now correctly reflects the Service Path state.
------
- **I95-47390 Inline BFD collision issue:** Resolved an inline BFD collision issue that was preventing peering from occurring.
------
- **I95-47437 TSI creation is leading into Network Failure - BGP BFD went down:** Refined the output for TSI to prevent failures.
------
- **I95-47438 ESP Session Missing:** Resolved an issue that created stuck sessions when a NAT device was rebinding and failing to establish sessions from reverse packets.
------
- **I95-47529 Outbound-only sessions get stuck after NAT rebinding:** Resolved an issue that created stuck sessions when a NAT device was rebinding and failing to establish sessions from reverse packets.
------
- **I95-47551 Keep-alives are not generated for unidirectional outbound-only sessions:** Resolved an issue with keep-alive generation for unidirectional outbound-only sessions.
------
- **I95-47552 LTE modem not coming up after upgrade:** Resolved an issue with modem detection and port scanning for Quectel EC25.
------
- **I95-47585 Transmit-failure increments when TE is enabled:** When `device-interface traffic-engineering` is enabled, the `stats/packet-processing/sent/interface-failure` statistic is no longer erroneously incremented.
------
- **I95-47642 Plugin state summary (table view) for HA router overlays both nodes:** The Plugin state table has been separated by node.
------
- **I95-47655 BGP issues with VRRP:** VRRP failover may cause routing to not function if internal device numbering is not consistent across the redundant nodes.
------
- **I95-47767 Next Hop choice of "Blackhole" does not stay visible in Conductor:** This option was displayed in error, as the option is ignored. It has been removed.
------
- **I95-47872 App-ID summary tracking of failed sessions still incremented when feature disabled:** App-ID stats tracking for failed sessions now checks the feature enabled flag and responds appropriately.
------
- **I95-47909 Handle GRE tunnels in ICMP reachability probe:** We now use the base interface for egress if the `icmp-probe probe-address` is the same as the tunnel destination, and use the `internal-address` as the source if the `egress-interface` is `gre-overlay`.
------
- **I95-47967 Cloud bootstrapper does not bootstrap the deployed Conductor:** Resolved an issue where the configuration was being rejected by the cloud bootstrapper when the device was a conductor.
------
- **I95-47969 Increased Memory use when generating TSI:** Resolved an issue where the s`ave runtime-stats` command and TSI generation could result in particularly high memory usage when Application Identification was enabled.

	The `save runtime-stats` command no longer operates across multiple nodes and routers, and will not aggregate the metrics to disk on the conductor. This is to protect against excessive memory consumption. This is a change in functionality; however the public metrics APIs achieve the same result and are the preferred mechanism to collect authority wide metrics.
------
- **I95-47981 Ignore VRRP advertisements if the VRID doesn't match:** The VRID is now validated before accepting an advertisement to resolv an issue where VRRP advertisements intended for a different router were being processed.
------
- **I95-48017 Security Events not displaying correctly:** In cases where a managed router and the conductor were not on equal versions, the router would return an ambiguous error for IDP Security Events. This issue has been resolved.
------
- **I95-48018 APP-ID implementation with proxy web server unable to identify traffic correctly:** Resolved an issue reading certain HTTP headers that was causing Application Identification to miss them.
------
- **I95-48019 Issue with deleting a flow on reverse metadata:** Resolved an issue that created stuck sessions when a NAT device was rebinding and failing to establish sessions from reverse packets.
------
- **I95-48038 502 Error returned if managed routers are offline:** Resolved an issue that caused HTTP requests on the conductor to return a 502 error for all requests if a managed router is offline.
------
- **I95-48125 Save TSI streaming from router to conductor not working:** Adding a node and router argument to the PCLI command `save tech-support-info` now works correctly.
------
- **I95-48221 Image-Based Upgrade failing on systems with 8GB RAM:** Image-based unpacker now uses a temporary disk file if the available RAM is low during filesystem decompression.
------
- **WAN-1262 WAN Assurance login error issue:** Resolved an issue when logging into the SSR GUI for the first time on a whitebox system, selecting the option to log into the Mist cloud and entering an incorrect password caused the application to crash.

## Release 6.0.4-11

**Release Date:** September 12, 2022

### New Features

- **I95-35571 Enhanced Syslog:** Beginning with Version 6.0.4, the SSR can be configured to send system generated events over a secure TLS or TCP connection to a remote-logging server for analysis and storage. For more information, see [Secure Syslog Transport](config_audit_event.md#secure-syslog-transport)
------
- **I95-44533 Intrusion Detection and Prevention:** Using the Juniper IDP Signature Database, IDP is now available on the SSR and on Mist-managed devices. For detailed information, see [Intrusion Detection and Prevention](concepts_ssr_idp.md)
------
- **I95-47418 Audit Events for Plugins:** A new audit event has been added that tracks when a plugin is installed or uninstalled. This can be viewed on the Audit History page in the GUI or in the PCLI by running `show events type admin.plugin`.

### Resolved Issues

- **The following CVE's have been addressed and resolved:** I95-45054, I95-45060, I95-45165, I95-47485.
------
- **I95-45094 Unnecessary rotation of salt minion config:** Resolved an issue where the global.init and salt minion config are unnecessarily rotated and updated with no changes to the actual contents of the file.
------
- **I95-45583 HA Connection lost during commit:** Resolved an issue where session was missing necessary path data information relating to the peer path.
------
- **I95-46281 Update Kernel to RHCK 8.6:** Updated the kernel to integrate the latest security fixes.
------
- **I95-46807 Validation not catching when a router does not have an icmp-probe-profile or reachability-profile configured:** This issue has been resolved.
------
- **I95-46918 GUI and PCLI out of sync when new configuration elements added/modified:** Resolved an issue where `show network-interface` and `show config` were not updating properly.
------
- **I95-46919 LDAP Users Not Shown in GUI Users Display:** Updated username requirements and the ability to identify issues with usernames not meeting those requirements. See [Username and Password Policies](config_password_policies.md) for username requirements.
------
- **I95-47314 Ping command has high session timeout:** The ICMP sessions for ping command will now use the correct timeout of 5 seconds.
------
- **I95-47336 Running config change events are missing:** Resolved an issue where running config events under a different username were filtered out.
------
- **I95-47421 Quad Zero Tenant-Prefix Doesn't Get Applied in the Router:** Resolved an issue where the source lookup from global tenant took precedence over the local tenant.
------
- **I95-47537/I95-47556 Synchronize writing to files to avoid a race condition:** Added a common file lock to synchronize writes.
------
- **I95-47655 BGP issues with VRRP:** VRRP failover may cause routing to not function if internal device numbering is not consistent across the redundant nodes.
------
- **WAN-1327/MIST-69263 Device Adoption may fail:** Resolved issues where a "factory reset" system failed to be adopted. This could be seen if an invalid claim code was entered during the adoption process, or when a whitebox system (non Juniper-branded) was not successfully released.

	This issue has been corrected in the `SSR-6.0.4-11.el7.x86_64.ibu-v8.iso` ISO.

### Caveats

- **I95-46126 Router Status:** In HA configurations where a router is connected to HA Conductor 1, but not directly connected to HA Conductor 2, alarms generated on the router will not be seen on Conductor 2 - the conductor to which the router is not directly connected. To see alarms on a router, the Conductor must be directly connected to the Router.

## Release 6.0.2-8

**Release Date:** August 16, 2022

### Resolved Issues

- **I95-47578 NIC ports incorrectly named:** Resolved an issue where systems installing SSR software version 6.0.1-12 using the ISO or IBU image resulted in the SSR120 and SSR130 NIC ports being named incorrectly.

## Release 6.0.1-12

**Release Date:** August 15, 2022

### New Features

- **I95-46387 New Service Route Type for BGP over SVR:** Added a new service route type that indicates to the Routing Agent that local service routes and BGP over SVR routes should be merged together when creating local balanced paths.
------
- **I95-47077 Configuration options for User Accounts:** Added configuration options for number of login attempts before locking user account, and number of seconds that user account will be locked before being able to attempt to login again. For information, see [Password Policies](config_password_policies.md).
------
- **I95-47136/MIST-62741 Settings for WAN Link Speed and Duplex (Mist-managed):** With this update, the auto-negotiation, disable, and speed/duplex settings are visible in Mist.

### Resolved Issues

- **I95-38408 DHCP server on wrong vlan sends offer in response to discover message:** Hosted DHCP servers that do not have an explicit vlan configured are now explicitly treated as vlan 0, and handle any DHCP packets that are untagged/vlan 0, in order to prevent those packets from being multicasted to multiple DHCP servers.
------
- **I95-44434 Peer metric sends IP of WAN interface instead of the expected string:** Logic has been added to show the available destination address.
------
- **I95-46056 `show ntp` has no output from PCLI, even though NTP is configured:** The output of `show ntp` now reports IP addresses of the time servers rather than resolve hostnames.
------
- **I95-46545 Conductor Validation passing when a URL is configured in a Parent Service:** Validation for application-identification has been updated to include URL and subcategory.
------
- **I95-46684 Image-based Installer / Interactive Installer:** `intialize128t` now runs automatically on first boot when using the image-based 6.0 installation with Interactive Install selected.
------
- **I95-46931 Hardware using ConnectX6-DX fails to initialize:** Added support for this card variant.
------
- **I95-46959 PPPoE over VLAN not working when target interface is down:** Added code to bring up the parent interface before VLAN interface.
------
- **I95-47111 Issues with redundant interfaces on startup:** Resolved an issue where the notifications for active interfaces may get lost when using VRRP for redundancy.
------
- **I95-47129 Metadata is not disabled after flow-move for EoSVR sessions:** Added a metadata turnoff after session failover for EoSVR.
------
- **I95-47336 Running configuration change events are missing:** Updates have been made to include `username` in the running configuration change events log.

### Caveats

- **I95-47390 Inline BFD Collisions:** BFD peering between two router fails when one of the peer has a DHCP interface and has external NAT configured on neighborhood. This will occur in AWS deployments. This issue will be addressed in an future release.

## Release 6.0.0-56

**Release Date:** July 18, 2022

### New Features

- **I95-35794 IP TTL Handling:** The SSR's handling of SVR traffic can be configured to adjust the TTL value on hops between SSR routers. This adjustment can prevent situations where the TTL expires on packets flowing through multiple hops and then out to the Internet to their final destination. For more information, see [TTL Handling](concepts_machine_communication.md#ttl-handling).
------
- **I95-36916 IPv6/v4 Dual Stack Operation:** Dual Stack operation is now fully supported.
------
- **I95-40373 Appliance Image-based Installation:** An image-based ISO installation process has been implemented for users who manage their network using the Mist Cloud. For a full description of this feature, see [Image-Based Installation](intro_installation_image.md).
------
- **I95-44267 NIST FIPS Validated Cryptography:** FIPS Enforcement Mode has been added to both the new image-based and existing package-based installation processes. See [Image-Based Installation](intro_installation_image.md#installation) for FIPS activation steps as part of the image-based installation. Refer to [FIPS Enforcement Mode](intro_installation_bootable_media.mdx#fips-enforcement-mode) for details using the legacy package-based installation.
------
- **I95-44870 Mist Self-Registration and Onboarding:** Onboarding a Mist Managed SSR instance can be accomplished as part of the installation process. For details, refer to the steps to [Associate the Router with Mist](intro_installation_image.md#associate-the-router-with-mist) as part of the image-based installation.
------
- **I95-46747 Improved the Password user experience:** You now are re-prompted up to three times for the current password if it is incorrect. If a new password does not meet the strength check, you are prompted with that information, and required to update the password.

### Resolved Issues

- **I95-44375 ICMPv6 Neighbor Solicitations are not responded to in IPv4/v6 Dual Stack:** Resolved an issue with Neighbor solicitation processing in a Dual Stack configuration.
------
- **I95-44548 Application Summary Sort Order:** Resolved an issue with the Application Summary sort order changing unintentionally.
------
- **I95-45478 Segmentation Fault in the Dynamic Peer Update process:** Resolved an issue with multi-threaded access to a data member, leading to a segmentation fault.
------
- **I95-45890 Service paths for BGP over SVR routes are not being rebuilt:** Resolved an issue when the vector configuration is changed on a network interface, the service paths for BGP over SVR routes are not being rebuilt.
------
- **I95-46411 PPPoE over VLAN interface status missing in `show` commands:** Added atttribute to show the missing information.
------
- **I95-46822 Revertible failover traffic not restored when reverse traffic is present:** For a "revertible-failover" service policy, when the preferred path is restored and a session no longer traverses an internode dogleg path, it was taking several seconds for traffic to be restored when forward traffic is present; in situations where only reverse traffic is present, traffic may not be restored. This issue has been resolved.
------
- **I95-46826 Carrier detection logic not recognizing disaster recovery modem:** Updated the carrier detection logic to properly recognize the carrier when a modem is attached to a disaster recovery cell tower.
------
- **WAN-1191 - Incorrect interface Port Mapping for Silicom Madrid supported platforms:** This update corrects the port mappings. It is recommended that the latest image be used for all image-based installs. For information about Image-based installs and where to download the latest ISO, please refer to [Image-Based Installation](intro_installation_image.md).

### Caveats

- **I95-46684 Image-based Installer / Interactive Installer:** When using the image-based 6.0 installation, be aware that if Interactive Install is selected, `intialize128t` does not launch automatically on first boot. This must be run manually; log in to the console as root using the default credentials, and type `initialize128t` to perform interactive initialization. This will be resolved in a future release.
------
- **I95-47095/MIST-66000 LAN Redundancy breaks WAN Redundancy (Mist-managed):** If you need to convert a LAN or WAN interface from non-redundant to redundant or from redundant to non-redundant, the affected nodes must be restarted.
------
- **MIST-65629 Traffic Shaping (SSR Only) option not available (Mist-managed):** Traffic engineering may not be properly enabled in a high availability configuration for Mist-managed SSR's. This issue is under investigation.
------
- **MIST-65945 SSR does not support Second BGP neighbor (Mist-managed):** More than one BGP neighbor is not currently supported via the “Add BGP Neighbors” GUI button for Mist-managed SSR's. Multiple neighbors however can be added via the BGP configuration tab.
