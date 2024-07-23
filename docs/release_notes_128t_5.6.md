---
title: SSR 5.6 Release Notes
sidebar_label: '5.6'
---
:::info
Issues resolved in a release are merged into subsequent releases chronologically AND lexicographically. 

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

## Release 5.6.16-8

**Release Date:** July 26, 2024

### Resolved Issues

- **The following CVE's have been identified and addressed in this release:** 
CVE-2024-21011, CVE-2024-21012, CVE-2024-21068, CVE-2024-21085, CVE-2024-21094, CVE-2019-13631, CVE-2019-15505, CVE-2019-25162, CVE-2020-25656, CVE-2020-36777, CVE-2021-3753, CVE-2021-4204, CVE-2021-46934, CVE-2021-47013, CVE-2021-47055, CVE-2021-47118, CVE-2021-47153, CVE-2021-47171, CVE-2021-47185, CVE-2022-0500, CVE-2022-23222, CVE-2022-3565, CVE-2022-45934, CVE-2022-48627, CVE-2022-48669, CVE-2023-1513, CVE-2023-24023, CVE-2023-25775, CVE-2023-28464, CVE-2023-31083, CVE-2023-3567, CVE-2023-37453, CVE-2023-38409, CVE-2023-39189, CVE-2023-39192, CVE-2023-39193, CVE-2023-39194, CVE-2023-39198, CVE-2023-4133, CVE-2023-4244, CVE-2023-42754, CVE-2023-42755, CVE-2023-45863, CVE-2023-51779, CVE-2023-51780, CVE-2023-52340, CVE-2023-52434, CVE-2023-52439, CVE-2023-52445, CVE-2023-52448, CVE-2023-52477, CVE-2023-52489, CVE-2023-52513, CVE-2023-52520, CVE-2023-52528, CVE-2023-52565, CVE-2023-52574, CVE-2023-52578, CVE-2023-52580, CVE-2023-52581, CVE-2023-52594, CVE-2023-52595, CVE-2023-52598, CVE-2023-52606, CVE-2023-52607, CVE-2023-52610, CVE-2023-52620, CVE-2023-6121, CVE-2023-6176, CVE-2023-6240, CVE-2023-6622, CVE-2023-6915, CVE-2023-6932, CVE-2024-0340, CVE-2024-0841, CVE-2024-23307, CVE-2024-25742, CVE-2024-25743, CVE-2024-25744, CVE-2024-26593, CVE-2024-26602, CVE-2024-26603, CVE-2024-26609, CVE-2024-26610, CVE-2024-26615, CVE-2024-26642, CVE-2024-26643, CVE-2024-26659, CVE-2024-26664, CVE-2024-26671, CVE-2024-26693, CVE-2024-26694, CVE-2024-26743, CVE-2024-26744, CVE-2024-26779, CVE-2024-26872, CVE-2024-26892, CVE-2024-26897, CVE-2024-26901, CVE-2024-26919, CVE-2024-26933, CVE-2024-26934, CVE-2024-26964, CVE-2024-26973, CVE-2024-26993, CVE-2024-27014, CVE-2024-27048, CVE-2024-27052, CVE-2024-27056, CVE-2024-27059, CVE-2024-2961, CVE-2024-33599, CVE-2024-33600, CVE-2024-33601, CVE-2024-33602, CVE-2024-32487, CVE-2023-4408, CVE-2023-50387, CVE-2023-50868, CVE-2023-4408, CVE-2023-50387, CVE-2023-50868
------
- **I95-47195 Address multiple PPPoE issues:** Reintroduced the PPPoE network `reinit` script to resolve a highway crash caused by the PPPoE/LTE target `ifcfg` being a `nullptr`.
------
- **I95-47196 PPPoE device shown as operationally down when it is up:** Reintroduced network `reinit` script to reinitialize namespace, KNI, and target-interface after a config change in the `network-interface`, or under abnormal conditions such as the `target-interface` being moved out from the namespace.
------
- **I95-49015 PPPoE interface is not resolved after reboot of node even though auto negotiation is enabled:** Reintroduced network `reinit` script to reinitialize namespace, KNI, and target-interface after a config change in the `network-interface`, or under abnormal conditions such as the `target-interface` being moved out from the namespace.
------
- **I95-49018 Peers are not coming up for PPPoE interface on a standalone setup:** Reintroduced network `reinit` script to reinitialize namespace, KNI, and target-interface after a config change in the `network-interface`, or under abnormal conditions such as the `target-interface` being moved out from the namespace.
------
- **I95-49218 Filter OSPF routes using RIB Policy routes:** Use the `rib-policy ipv4|ipv6 <protocol> policy <policy>` command from either the `routing default-instance` or inside `vrf` to provide addtional filtering for OSPF routes. For more information see [`routing default-instance rib-policy`](add_link_here).
------
- **I95-49599 PPPd and PPPoE-connect prematurely killed by `reinit`:** This has been resolved by skipping network `reinit` when namespace, KNI, and target-interface remain unchanged. This avoids pppd being killed prematurely before PADO timeout (used to determine server not responding).
------
- **I95-56203 The First Article Inspection (FAI) scan archive is empty:** Resolved an issue with `logrotate` clearing all the FAI scan archives. This was due to each archive having a unique name using a timestamp. A different service is now used to rotate the FAI scan files.
------
- **I95-56236 Routers not able to be onboarded after upgrading a Conductor:** Resolved an issue where the automated provisioner and the Quickstart processes overlapped, preventing the results files from being reviewed for errors, which stopped the onboarding process. 
------
- **I95-56326 Potential crash while collecting TSI:** Added protection against unmapped memory access to resolve an issue where, if a TSI is collected at just the wrong time, it can cause a highway crash.
------
- **I95-56455 Zero-byte files when updating conductor hardware using an OTP image:** A check has been added to verify that `api.key` and `router-api.key` are non-zero length and valid. If not, the keys are regenerated.
------
- **I95-56527 Failure of GUI to validate and commit PCLI executed change:** Resolved an issue where an escape character caused the generation of an invalide JSON document. 
------
- **I95-56575 Reduce polling rate of disk monitoring and add optimization:** The `ComponentDiskUtilizationMonitor` checks the disk usage too frequently and is inefficient. Reduced the frequency that disk usage is checked, and streamlined the process.
------
- **I95-56612 `fib-service-match any-match` missing some FIB entries:** Resolved an issue when a service-address was more specific than the last route update, a search for other less specific services was not performed. Now when the service address update is more specific, additional searches will continue. 
------
- **I95-56682  :** Reintroduced network `reinit` script to reinitialize namespace, KNI, and target-interface after a config change in the `network-interface`, or under abnormal conditions such as the `target-interface` being moved out from the namespace.
------
- **I95-56715 Address validation in migrate feature in conductor UI is not working correctly:** Resolved an isssue between the client and the server during the use of the GUI `migrate` operation, where the conductor address was not read correctly, and returning an irrelevant error message. 
------
- **I95-56726 `No Timeout Queue` message logged in cases where a config commit fails, or a conductor fails to load a config on startup:** Resolved an issue with `ThreadPoolWithExternalPoller` that resulted in a stack trace in the logs which starts with message `No TimeoutQueue:`.
------
- **I95-56727 Allow domain names that begin with numerically:** Warnings are no longer generated for domain-name elements of service configurations which have labels beginning with a number, for example `123.abc.com`.
------
- **I95-56822 Router stuck in a continuous upgrade/failure state:** Resolved an issue when DNS name servers were changed on the conductor, in certain cases the conductor software proxy would not correctly load these changes. In this scenario the proxied router software requests would use an out of date DNS configuration for the proxied requests. 
------
- **I95-56843 Error logs filled with irrelevant KNI network script info:** The log output has been reduced to provide related information.
------
- **I95-56843 lte / pppoe default-route check incorrectly reporting warnings:** Resolved an issue where warnings were incorrectly shown on the conductor for interfaces without `default-route` or `management-vector` configured.
------
- **I95-56850 Overlap warning on router not present on conductor:** Resolved a case where a service on a router is configured with `applies-to`, and the same service is configured on the conductor (overlap) but does not have `applies-to` configured, the validation process will generate a warning on the router but not the conductor. 
------
- **I95-57000 Hub crash while generating TSI log:** Resolved an issue where unmapped memory access during packet buffer location walk caused a hub crash. Protections against unmapped memory access have been added.
------
- **I95-57017 Application ID failed to block some domains:** Resolved an issue where DPI failed to identify the domain-name from SNI if the `client-hello` is split up into multiple TCP packet segments.
------
- **I95-57082 Unable to delete a capture-filter using an escape character (/):** This issue has been resolved. 
------
- **I95-57110 Crash seen during add and delete peers while sending traffic:** A race condition has been fixed that could cause a crash in the packet-processing highway process if a peer-path is removed from configuration.
------
- **I95-57114 Unable to upgrade AWS Conductor:** Resolved an issue where an incorrect package version was installed, triggering a downgrade and preventing the upgrade.
------
- **I95-57205 Repeated core dumps:** Resolved a race condition where a thread tries to call a function before the object is fully made. In this case the object was for DHCP, LTE, and PPPoE interfaces.


## Release 5.6.15-1

**Release Date:** June 27, 2024

### Resolved Issues

- **The following CVE's have been identified and addressed in this release:** CVE-2024-2973

## Release 5.6.14-7

**Release Date:** May 14, 2024

### Resolved Issues

- **The following CVE's have been identified and addressed in this release:** CVE-2020-22218, CVE-2024-20918, CVE-2024-20919, CVE-2024-20921, CVE-2024-20926, CVE-2024-20945, CVE-2024-20952, CVE-2023-40217, CVE-2023-20569, CVE-2022-43552, CVE-2023-48795, CVE-2023-2176, CVE-2023-40283, CVE-2023-4623, CVE-2024-22019, CVE-2023-46724,CVE-2023-46728, CVE-2023-49285, CVE-2023-49286, CVE-2023-50269, CVE-2024-25617.
------
- **I95-50697 RFC1918 sessions (private IP addresses) are reclassified in error:** When a session destined for a private IP (RFC1918) experiences an App-ID modify, the session will now only be reclassified if the classification data reflects a positive classification change.
------
- **I95-52251 Changes to the conductor address on the router result in loss of ssh connection to the router:** Resolved an issue where changing the router level `conductor-address` did not update the salt-created services with the new addresses.
------
- **I95-52500 SVR multi-hop failover causes traffic to drop when using outbound-only:** Added a session ID lookup to resolve a situation where sessions failing between multi-hop SVR and direct SVR connections may lead to duplicate flow exceptions and dropped traffic.
------
- **I95-53216 Unable to change password for users managed through external user databases (such as LDAP or RADIUS):** Resolved an issue that caused a Password Change dialog to appear for remotely authenticated users.
------
- **I95-54127 Users managed through external user databases (such as LDAP or RADIUS) cannot generate or view TSI:** Resolved an issue that did not provide a home directory for custom roles, which prevented LDAP users from viewing the systemd journal.
------
- **I95-54750 Load Balancer API Calls not working:** The original API and Swagger documentation used `Load Balancer`, which was misleading. The `Reachability Detection` REST APIs have been updated to use `Reachability Detection` as reference, instead of `Load Balancer`.
------
- **I95-54833 HA port is showing as redundant:** Resolved an issue where adding a device-interface back into the configuration after it was removed did not recreate the device-state.
------
- **I95-54867 SSR-1300 baud rate set incorrectly:** Resolved an issue where the incorrect baud rate was allowed. The only allowed baud rate for the SSR is now 115200. This is the default rate.
------
- **I95-54918 Highway process crashed on the active node of a router:** Resolved a crash caused by a race condition when the last instance of a capture filter referencing a particular file-name is removed while a packet is in the process of being captured.
------
- **I95-55069 One HA node is missing from the Mist GUI:** Resolved an issue where a managed router had an empty product version config metadata field, which resulted in the conductor version metadata field being cleared.
------
- **I95-55164 Dropping GRE encapsulated packets:** Classification support for Enhanced GRE Header, version 1, as defined by RFC 2637 Point-to-Point Tunneling Protocol (PPTP) has been added.
------
- **I95-55208 Asset fails to transition state and never reaches RUNNING:** In some cases where the RPM database may be corrupt or another process holds an indefinite lock, the highstate will block other processes from starting. A timeout has been added for the `rpm -q` process in highstate to allow other processes to run. 
------
- **I95-55226 Validation incorrectly allows a network interface to be used as both DHCP relay and server:** The validation process has been updated to include several checks against DHCP relays, clients, servers, and access-policies.
------
- **I95-55270 DHCP server not coming up:** Resolved an issue where a network namespace was using a namespace ID that was not cleaned up properly after removal.
------
- **I95-55389 Queries for private domains with Websense classified as Miscellaneous:** Domains categorized by Websense as Uncategorized are now classified as Uncategorized/Uncategorized, rather than Miscellaneous/Uncategorized.
------
- **I95-55550 node0 went down and did not fail over to node1:** Multiple disk errors caused corruption on the `128T_root` filesystem causing it to enter `read-only` mode and becoming non-responsive. To resolve this issue, issues in the filesystem now result in kernel panic mode, launching a reboot and in HA systems, failover. Additionally, the filesystem check is run to check and repair the filesystem. 
------
- **I95-55586 GraphQL API returns `IsActive` incorrectly if the `device-interface` is `vrrp_standby`:** The `router-peer-path` setting now returns the correct value when in `vrrp-standby`.
------
- **I95-55591 Some network interface stats are not updated:** Some network interface stats are not updated with the port name when a device interface is renamed. Device interface name changes are now handled correctly, and `network-interface` metrics are properly updated when `device-interface name` changes.
------
- **I95-55603 HA router stuck in connected state due to runtime corruption issue:** Resolved an issue causing an unzip race condition with Python files. The packaging and installation process has been improved to prevent this issue.
------
- **I95-55762 Unable to view more than 50 prefixes in BGP:** Updated the routing engine to display all rows for BGP show commands if a count parameter is not specified.
------
- **I95-55764 Race condition and highway crash with DHCP devices:** Resolved a race condition that caused a highway crash when the DHCP client is configured for LTE or PPPoE, and the respective link flaps prior to the lease being assigned.
------
- **I95-55830 Rollback results in missing Admin user:** Resolved an issue where HA nodes running mixed versions of 5.6.0 or greater with versions less than 5.6.0, the admin user could be temporarily removed until both nodes were upgraded or rolled back to the same version.
------
- **I95-55848 / I95-56403 Session traffic is black-holed during path failover when `nat-keep-alive` is in use:** Resolved an issue where an outbound-only session with a `nat-keep-alive` moved from a dogleg path to a direct inter-router path. This causes repeated session modifications on the hub side and drops reverse traffic.
------
<!-- markdown-link-check-disable -->
- **I95-55904 No service-paths seen after upgrade:** Resolved an issue where adding services with overlapping address prefixes prevented the configuration from being applied. For additional details, refer to the Knowledge Base article [Upgrade from 5.6 to 6.1 may result in missing FIB entries](../kb/2024/04/24/I95-55904). <!-- markdown-link-check-enable -->
------
- **I95-55912 Validate Patterns for Service Domains and URLs:** The `url` and `domain-name` fields on a service were an unformatted string. This allowed you to configure fields that would be silently discarded. The `domain-name` and `url` fields within services are now validated for correctness and viability from an App-ID perspective. Anything to be ignored during validation now triggers a config warning.
------
- **I95-55949 Silicom Valencia Atom C1130 CPU flags are not properly detected:** Resolved an issue where the `cpuinfo` parser fails due to a collision between the processor key name and value - the Silicom Valencia model name in the `cpuinfo` contains the word `processor`. 
------
- **I95-56263 Add `show capacity`, and debugging commands to the TSI output:** Support for additional information in the TSI output has been added.
------
- **I95-56475 HA-sync network interface shows warning after router upgrade:** Resolved an issue where non-forwarding interfaces would appear to be administratively down in the web UI when they were not.
------
- **I95-56541 Include kernel journal entries in TSI:** A separate `kernel.log` journal file is now created in the TSI output.
------
- **I95-56575 Reduce polling rate of disk monitoring and add optimization:** The `ComponentDiskUtilizationMonitor` checks the disk usage too frequently and is inefficient. Reduced the frequency that disk usage is checked, and streamlined the process.
------
- **I95-56600 Add `show tenant members` to the TSI output:** `show tenant members` and additional network scripts have been added to the TSI output.

## Release 5.6.13-7

**Release Date:** January 30, 2024

### Resolved Issues

- **The following CVE's have been identified and addressed in this release:** CVE-2022-41974, CVE-2023-32360, CVE-2023-22045, CVE-2023-22049, CVE-2022-41741, CVE-2022-41742, CVE-2020-12321, CVE-2023-2650, CVE-2023-3446, CVE-2023-3817, CVE-2023-3341, CVE-2023-22081, CVE-2022-0934, CVE-2023-46847, CVE-2021-43975, CVE-2022-28388, CVE-2022-3594, CVE-2022-3640, CVE-2022-38457, CVE-2022-40133, CVE-2022-40982, CVE-2022-42895, CVE-2022-45869, CVE-2022-45887, CVE-2022-4744, CVE-2023-0458, CVE-2023-0590, CVE-2023-0597, CVE-2023-1073, CVE-2023-1074, CVE-2023-1075, CVE-2023-1079, CVE-2023-1118, CVE-2023-1206, CVE-2023-1252, CVE-2023-1382, CVE-2023-1855, CVE-2023-1989, CVE-2023-1998, CVE-2023-23455, CVE-2023-2513, CVE-2023-26545, CVE-2023-28328, CVE-2023-28772, CVE-2023-30456, CVE-2023-31084, CVE-2023-3141, CVE-2023-31436, CVE-2023-3161, CVE-2023-3212, CVE-2023-3268, CVE-2023-33203, CVE-2023-33951, CVE-2023-33952, CVE-2023-35823, CVE-2023-35824, CVE-2023-35825, CVE-2023-3609, CVE-2023-3611, CVE-2023-3772, CVE-2023-4128, CVE-2023-4132, CVE-2023-4155, CVE-2023-4206, CVE-2023-4207, CVE-2023-4208, CVE-2023-4732, CVE-2022-45884, CVE-2022-45886, CVE-2022-45919, CVE-2023-1192, CVE-2023-2163, CVE-2023-3812, CVE-2023-5178, CVE-2023-38406, CVE-2023-38407, CVE-2023-47234, CVE-2023-47235.
------
- **I95-38188 Re-Homing an SSR in certain circumstances leaves residual services:** If an SSR is rehomed from an HA conductor to a standalone conductor, the services pointing to the second node of the HA conductor were not removed. Resolved the issue where the reverse SSH tunnels from a managed router to the second HA conductor node were not cleaned up if the conductor was converted back to a standalone conductor.
------
- **I95-48783 Conductor process logs are unbounded, risking storage exhaustion:** `auditd` logs consuming the disk space when the node monitor is in a disconnected state and the audit logs are left unconsumed. There was a limit to the log file size, but not the number of files. The number of files is now limited.
------
- **I95-50493 Memory calculation for alarms is confusing:** This alarm was designed to trigger when memory usage went above 90% and clear only when memory usage went below 80%, causing confusion. The memory usage alarm no longer requires memory usage to go below 80% to clear; it will clear when memory usage goes below 90%.
------
- **I95-50540 Denied traffic events not displaying in the GUI or PCLI:** Resolved an issue that prevented displaying denied traffic events in the `show events` PCLI command and in the GUI. Users would see `% Error: Unhandled TypeError: list indices must be integers or slices` in the PCLI, and `An unknown traffic event occurred` in the GUI. 
------
- **I95-51191 BFD metrics not cleaned up properly:** The BFDAgent holds onto the stats for peer paths; If the config is changed on a router, new stats are made but the old ones were not being deleted. The old BFD by-peer-path stats are now deleted when a VLAN configuration change is made.
------
- **I95-51459 Logs and exception pcaps are periodically filled with error logs and truncated packets:** Resolved an issue where ICMP error respond packets for encapsulated traffic caused `PacketBufferDataNotFound: Could not find specified data in packet` error logs to be generated, or truncated packets to arrive in the FastLane exceptions pcap. 
------
- **I95-51492 Password expiration not working:** This issue has been resolved. Adminstrators must use the global setting `configure authority password-policy lifetime N ` to indicate that all user passwords must be changed every `N` days.
------
- **I95-51663 TCP port reuse causing application steering crashes:** Resolved an issue where backwards state transitions was causing an issue with the TCP client reusing ports. 
------
- **I95-52018 Overlapping IP Prefix validation may be incorrect, causing a false configuration warning:** Configuration validation for IP Prefixes has been corrected.
------
- **I95-52414 RBAC not being honored for `show fib` output:** Resolved an issue where `show fib` included entries that the current user did not have permission to view.
------
- **I95-52540 Metrics infrastructure resource consumption:** The reporting infrastructure reaching load capacity led to data gaps in custom graphs. Several internal optimizations have been implemented to address this issue. However, to reduce the metrics infrastructure load, metrics in the GUI regarding firmware-generated services, service routes, and tenants will no longer be tracked.
------
- **I95-52799 Display Lock Status/Failed Login Attempts in the PCLI and GUI:** Add a "Lock Status" column to the User table as well as the User Details pane, with more details availble on hover. The `show user` command now includes two new rows, "Lock Status" and "Last Failed Login". For command details, please see [`show user lock-status`](cli_reference.md#show-user-lock-status).
------
- **I95-52889 Highway crash caused by a false negative waypoint exhaustion check:** Waypoint ports reinitialization that is triggered by a false negative exhaustion check can lead to duplicate waypoints and reverse flows on two sessions resulting in a highway crash. This issue has been resolved.
------
- **I95-53344 Exception on device interface tear down terminates process:** Resolved a rare case where Highway process can terminate and core during config changes if there is an underlying exception to a device-interface on removal.
------
- **I95-53393 Empty password attempts not counting towards user lockout:** The SSR counts login attempts with an empty password as failed login attempts. These  contribute to locking a user account if they reach the threshold (the value configured in `configure authority password-policy deny`,) within a short time window. 
------
- **I95-53472 Service Routes passing validation on conductor but then failing on local router:** The validation process on the conductor has been updated to identify service-routes with deleted or empty destination lists as invalid.  
------
- **I95-53538 Custom audit rules not preserved on SSR upgrade:** Resolved an issue where the image-based upgrade (IBU) was not preserving audit rules or `dnf.conf`.
------
- **I95-53787 Stats not present on conductor:** Running `show device-interface router all` on a conductor caused stats (in-octets, in-unicast-pkts, etc.) to be incorrectly displayed as "n/a" instead of the correct value. This issue has been resolved.
------
- **I95-53852 `host-service snmp-server` blocks SVR pings to a `network-interface` owned address:** Ping traffic was hitting the generated (wildcarded) snmp-server service. The session could not setup due to security policy conflicts. This issue has been resolved; the generated service from an snmp-server host-service now has a UDP transport.
------
- **I95-53858 Active sessions counter continuously incrementing:** The SSC active sessions counter has been updated to correctly handle session removal. 
------
- **I95-53875 The `show stats service-area sent success` metric was retained longer than needed:** Resolved an issue where the `stats default retention short` setting was not being honored.
------
- **I95-53894 DNS cache-service does not start:** Resolved a race condition that causes the DNS process to fail to start. The log message `No TimeoutQueue:` can be seen in the logs during this condition.
------
- **I95-53916 Pre-existing Teams interfaces conflict with HA interfaces:** In a Mist-managed HA configuration where an HA node has been configured with non-default HA interfaces, performing a release operation on a node in an HA pair leaves the pre-configured HA interfaces in place, and creates a conflict when a new configuration is pushed down from Mist. This would prevent the HA node from operating correctly and forming its HA connections again. This issue has been resolved, and the release operation now removes any pre-existing HA interfaces.
------
- **I95-53920 Password expiration being applied to remote users:** Resolved an issue that incorrectly enforced password expiration (`configure authority password-policy lifetime`) to RADIUS users.
------
- **I95-53986 `nodeMonitor` failed to get data for `show platform disk`:** Some of the dynamic access for `smartctl` objects were not protected. A check for the object existence has been added before attempting to read it.
------
- **I95-54086 Conductor memory exceeded:** In certain cases the salt master on the conductor could grow indefinitely in memory. This may be related to situations with both poor connectivity and the use of the `asset-connection-resiliency` feature. An update to the salt package has been made to resolve this issue.
------
- **I95-54155 nodeMonitor coredump on secondary node after upgrade:** During an upgrade where `deviceType` was `LTE` the attempt to get a linux interface name (not supported) failed. This issue has been resolved by implementing a device interface type verification.
------
- **I95-54180 Unable to fetch reports from Conductor GUI:** A refactor moved the connectivity check exception, which prevented a service restart. This has been resolved, and the stats now being written to the database and GUI tables.
------
- **I95-54189 Application mapping does not correctly match services:** Resolved an issue where the application director was misclassifying sessions due to IP overlap; this is a valid configuration, when services use an IP address with different ports assigned to different services. The SSR now recognizes these different port configurations.
------
- **I95-54271 Race condition after a configuration change related to the source nat:** Resolved a rare condition wherethe SharedNatPool was being reset while it was accessed for session setup. This caused a race condition that led to a highway process crash. 
------
- **I95-54294 Unable to delete capture-filter created with `&&` operator:** Resolved an issue that disallowed deleting capture-filters containing `&&`. Customers on older versions of software can work around this by creating capture-filters using `and` instead of `&&`.
------
- **I95-54340 Hub-to-spoke sessions break when failing over from outbound-only Path:** When a session modify occurs due to an ingress change (inter-node -> inter-router) AND an egress change is also detected, the incorrect security was being looked up for the old flow, causing an exception to be thrown and the modify to fail. This would present itself as dropped packets and in logs as a SecurityNotFound error. This issue has been resolved. 
------
- **I95-54490 Permission denied when trying to open a user config file:** Resolved a permissions issue for the `connect router` command by adding ACLs for reverse SSH so that this is accessible for admin users.
------
- **I95-54512 SSR130 moved into an HA cluster does not come up properly:** Resolved an issue where the generation of an improper configuration could lead to a crash loop in the NodeMonitor process.
------
- **I95-54803 Control packets are treated with equal priority in overload conditions, causing drops:** Control packets now have preferential treatment under overload conditions, reducing the drop rate. 
------
- **I95-55002 Password reset loop:** Resolved an issue that caused users created with the **Require password change on first login?** set to `yes` to get stuck in an infinite loop of password changes when logging in using the GUI.
------
- **WAN-2486 SSR data reporting values that are unrealistically high:** When capturing application usage for application summary learned apps, we sometimes observe really high values for bandwidth and other metrics.
Resolution: The high value was due to an internal corruption when the metrics for these learned applications were removed and added. During such transition there may be memory corruption resulting in the bogus high value. The part of the solution is to ensure the transition happens more gracefully.
------
- **WAN-2547 Invalid memory access producing incorrect bandwidth values:** Implemented a resolution that identifies the invalid memory access, and drops values that are out of scope or otherwise invalid.

## Release 5.6.12-1

**Release Date:** October 20, 2023

### Resolved Issues

- **I95-53833 Timeout prevents startup:** Resolved a regression introduced in 5.6.11 in the SSR reboot startup logic. If any of the processes took longer than 30 seconds to complete, the startup sequence was abandoned and rendered the platform inoperable. This issue has been resolved.

## Release 5.6.11-4

**Release Date:** October 2, 2023

### Resolved Issues Requiring Configuration Changes

- **I95-48174 Expand supported values for DHCP option:** DHCP option 43 is now a supported option, as well as a binary encoded-type (hex/byte) support. Valid examples are `0xabcdef` and `0x123456`.
------
- **I95-51181 Improve `save-tech-support-info` command:** The PCLI command `save tech-support-info` now has a default of one day. Additionally, a `since` argument has been added that limits log collection to only logs generated after the specified value. The `since` argument can be a relative time delta or an absolute timestamp. The GUI's About and Logs pages has the same functionality with a drop down that allows limiting the time window for the displayed/downloaded logs/tech-support-info.
------
- **I95-52406 Add ability to download MIBs from GUI:** A button has been added to the GUI, in the Documentation pane of the About Page, to download the SNMP MIB definitions for SSR.

### Resolved Issues

- **The following CVE's have been identified and addressed in this release:** CVE-2021-26341, CVE-2021-33655, CVE-2021-33656, CVE-2022-1462, CVE-2022-1679, CVE-2022-1789, CVE-2022-2196, CVE-2022-2663, CVE-2022-3028, CVE-2022-3239, CVE-2022-3522, CVE-2022-3524, CVE-2022-3564, CVE-2022-3566, CVE-2022-3567, CVE-2022-3619 ,CVE-2022-3623, CVE-2022-3625, CVE-2022-3628, CVE-2022-3707, CVE-2022-4129, CVE-2022-20141, CVE-2022-25265, CVE-2022-30594, CVE-2022-39188, CVE-2022-39189, CVE-2022-41218, CVE-2022-41674, CVE-2022-42703, CVE-2022-42720, CVE-2022-42721, CVE-2022-42722, CVE-2022-43750, CVE-2022-47929, CVE-2023-0394, CVE-2023-0461, CVE-2023-1195, CVE-2023-1582, CVE-2023-23454, CVE-2023-32233, CVE-2023-28466, CVE-2023-21930, CVE-2023-21937, CVE-2023-21938, CVE-2023-21939, CVE-2023-21954, CVE-2023-21967, CVE-2023-21968, CVE-2023-24329, CVE-2023-32067, CVE-2023-24329, CVE-2023-21930, CVE-2023-21937, CVE-2023-21938, CVE-2023-21939, CVE-2023-21954, CVE-2023-21967, CVE-2023-21968, CVE-2023-2828, CVE-2023-38408, CVE-2023-20569, CVE-2023-20593, CVE-2023-38802.
------
- **I95-42466 Changing the physical linux address of an HA interface breaks the configuration:** Resolved an issue where moving a non-forwarding fabric HA sync device-interface from one PCI address to another PCI address would not properly clean up the team interface from the old PCI address.
------
- **I95-50671 Office365 traffic is not recognized:** Resolved an issue where Office365 traffic was being miscategorized and therefore not fully qualified. O365 traffic, when traversing over SVR, is no longer miscategorized.
------
- **I95-50708 Time series data for memory of the salt_master process periodically significantly decreases:** Incorrect method for polling application memory data; this resulted in dips in application memory being presented. This issue has been resolved.
------
- **I95-51864 Ethernet Over SVR (EoSVR) not working for multi-hop SVR scenarios:** When EoSVR traffic traverses over a dogleg path in a HA node topology, traffic failed to traverse the middle node. EoSVR packets are no longer incorrectly dropped when routed over an inter-node path when coming from an SVR path.
------
- **I95-52491 Crash in highway process due to segmented metadata:** Resolved an issue processing metadata that is segmented across two packet buffers. The segmented packets are no longer discarded and the dataplane no longer crashes when processing a packet comprised of segmented metadata.
------
- **I95-52599 Conductors display different assets on different HA nodes:** If the state table of an inactive HA node becomes out of sync with the active HA node, then some assets were being skipped when parsing the asset state response. This issue has been resolved through the reporting of asset IDs from the active node state table.
------
- **I95-52822 ARP fails to resolve:** An earlier change caused ports on an X553 that use SFPs to no longer correctly report link status. This issue has been resolved and the link status is now reported accurately.
------
- **I95-52855 DHCP Relay stopped functioning after removing disabled DHCP Servers:** When a number of disabled DHCP servers were deleted from the configuration, the server interface mappings were deleted as well. Updates have been made to re-enable DHCP relay when a DHCP server or interface is removed. 
------
- **I95-52859 Issue moving interface between chassis of hypervisor platforms running SSR (e.g., ENCS):** When swapping physical cable from active node to standby node, the customer experienced low rate packet loss on traffic-engineering enabled device-interfaces. To resolve this issue, the `traffic-engineering transmit-cap` is no longer ignored on device-interfaces which have unresolved link-speed. 
------
- **I95-52994 Routers continue to request the conductor configuration:** Resolved an issue where a managed router continued to request the configuration from the conductor even after a validation or datamodel incompatibility issue.
------
- **I95-53000 process highway disconnected messages caused by NIC driver bug:** The DPDK driver code for the Broadcom NICs contained a bug that caused the querying of the extended statistic to fail. The Broadcom NIC driver has been upgraded to resolve the issue.
------
- **I95-53002 NTP setup check fails on startup:** Resolved an issue in the NTP startup sequence, due to an incorrect path for the NTP configuration.
------
- **I95-53015 Highway log has large number of unnecessary INFO messages:** A previous log message of icmp response packet failed was incorrectly logged at INFO level. It is neither an error nor actually informational, and has now been downgraded to DEBUG level.
------
- **I95-53017 Some files incorrectly marked as executable:** While strengthening the security posture of the platform, some files with superfluous executable bits set have been identified and correctly marked.
------
- **I95-53105 Conductor to router API RBAC rules not being followed:** Resolved an issue where the user is getting elevated to admin on the managed router, thus returning more data than necessary.
------
- **I95-53114 Broadcom interfaces stuck in `admin down` after upgrade:** Resolved an issue where device-interfaces on Broadcom NICs wouldn't come up properly if initially configured with `enabled false`.
------
- **I95-53185 Rare race condition causing highway crash:** Resolved a rare race condition between flow install and flow lookup causing a highway crash.
------
- **I95-53253 Include `dmesg` and `systemd journal unit` in TSI:** Include output from `dmesg` and `systemd journal` unit in TSI in order to assist in debugging future platform related issues.
------
- **I95-53259 Initialization time out may result in SSR failing to start:** Resolved an issue where SSR may fail to start. An example of this would be unreachable audit server was configured that would delay the startup initialization causing SSR to exceed the timeout and fail to start.
------
- **I95-53285 User datastore issue when renaming a router:** Resolved an issue where HTTP requests would stop working to a router after the router's name was changed, but before the SSR was restarted.
------
- **I95-53321 Syslog datamodel is limited:** Added the following configurable syslog facility values `auth`, `authpriv`, `cron`, `daemon`, `kern`, `lpr`, `mail`, `news`, `syslog`, `user`, and `uucp`.

### Caveats

- **I95-53833 Timeout prevents startup:** 5.6.11 introduced a regression in the SSR reboot startup logic. If any of the processes take longer than 30 seconds to complete, the startup sequence is abandoned and renders the platform inoperable. The system can be recovered by manually restarting the SSR software. This issue is tracked by I95-53833.

## Release 5.6.10-6

**Release Date:** August 29, 2023

### Resolved Issues Requiring Configuration Changes

- **I95-52198 Handle incoming public keys from peer conductor node:** Added functionality to allow conductor nodes to share the authorized keys of managed routers between each other. If the SSH public key is retrieved from a managed router by one conductor node, then it is automatically shared with its conductor peer node.
------
- **I95-52316 Enhancements to Overlapping FIB Services:** The [`fib-service-match`](config_command_guide.md#configure-authority-fib-service-match) command allows you to configure either `best-match-only` or `any-match`. 
	- `best-match-only` considers the best matching prefix length. In cases of transport overlap, services are visited in alphabetical order.
	- Using `any-match` will consider all services that match the route update but do not have the best match service address when creating FIB entries, minimizing missed entries. The transports from the service with the longest prefix are considered first.
------
- **I95-52517 Allow users the ability to configure the OSPF SPF timers:** Support for user-configured values for SPF delay has been added. Users can now specify values for spf delay, hold-time, and maximum-hold-time. For additional information, see [OSPF SPF Timers](config_command_guide.md#configure-authority-router-routing-ospf-timers-spf).

### Resolved Issues

- **The following CVE have been identified and addressed in this release:** I95-51758, I95-52495, I95-52496, I95-52497, I95-52509, I95-52625. 
------
- **I95-41386/I95-52114 HA pair device interface's redundancy status stays non-redundant even though the interface operational status is up:** Resolved a race condition when selecting the active components between HA nodes.
------
- **I95-51336 App-ID memory leak for some uncommon cases, such as duplicate flow:** Resolved an issue where the `app-id stats` entry was not added to the `Expiring` list to be cleaned up.
------
- **I95-51800 Radius authentication failure - Incorrect NAS IP address:** The ability to specify the NAS-IP-Address and NAS-Identifier has been added to the data model for configuring these Radius options per node. This can be used in cases where the Radius server is configured to use an identifier, or in cases where it is necessary to match the source IP address of the Radius requests behind SSR or NAT.
------
- **I95-52208 Metrics queries return incomplete data when FIPS is enabled:** Resolved an issue where a FIPS-incompatible hashing function was causing missing or incomplete metrics data. 
------
- **I95-52283 Correct the Domain Matching order:** When using web filtering, the SSR now properly enforces the [Service Matching Order.](config_domain-based_web_filter.md#service-matching-order)
------
- **I95-52305 Compacting rate limit exceeded:** Resolved memory and CPU issues resulting from attempting to compact very large application identification documents.
------
- **I95-52402 Router stuck in `Upgrading` state:** Resolved an issue with `conductor-only` mode, where the conductor was attempting to download the installer before the software access proxies were in place, preventing an update to the installer.
------
- **I95-50562 / I95-52626 Forwarding plane control message bursts create exception, causing a packet buffer leak:** Resolved a condition where backpressure caused the messaging mechanism to develop buffer leaks. Proper handling of exceptions now prevents buffer leaks. The control buffer capacity has been increased to better handle bursts as part of the resolution.
------
- **I95-52650 Asset state transition on conductor is slow for deployments with greater than 250 routers:** An optimization was made to an internal calculation and improve the speed at which synchronization requests are processed.
------
- **I95-52816 Config Validation may generate errors in the wrong field:** Resolved an issue during the validation of BGP graceful-restart configuration settings that could lead to generating incorrect errors/warnings during configuration validation.
------
- **WAN-2090 Conductor managed SSR Applications in WAN Insights Showing up as Numbers:** Resolved an issue with stats APIs, which were not properly handling some internal service names.

## Release 5.6.9-3

**Release Date:** July 19, 2023

### Resolved Issues Requiring Configuration Changes

- **I95-50949 Add packet buffer tracking to help analyze buffer exhaustion:** Packet buffer location tracking has been added, and the following PCLI commands have been created for buffer tracking.
	- `show packet-buffer locations`
	- `save packet-buffer snapshot`
------
- **I95-51450 Support for 100/Full Speed/Duplex on Intel I225-V Driver NICs:** The DPDK driver has been updated to allow fixed speed and duplex configuration to work with IGC i225 NICs.

### Resolved Issues

- **I95-47960 Incorrect progress message for `show dns resolutions`:** The progress message for this command now correctly displays `Retrieving dns resolutions...`.
------
- **I95-48931 Service area Highway crash:** Now prevent crashing in SSR's highway process in rare race conditions when a session's flow is removed before the session is fully established.
------
- **I95-49587 ICMP session classification improvement:** The application lookup for ICMP sessions now accurately identifies the correct service.
------
- **I95-50722 Highway crashes during session migration:** Resolved a crash in the SSR's highway process, due to a race condition between configuration changes and BFD sessions.
------
- **I95-51053 ESP session stuck in Incomplete state:** Resolved an issue where SVR sessions from network-interfaces with dscp-steering enabled can be stuck in an incomplete state.
------
- **I95-51167 Unable to override auto-generated peer service-route:** The user can now provision a service-route with the same name as an automatically-generated one. The user's service-route takes precedence and will be used instead of the generated one.
------
- **I95-51177 Ethernet over SVR setting wrong egress MAC address:** Ethernet over SVR now correctly sets the egress MAC address when using outbound-only mode.
------
- **I95-51178 Increase default juteMaxBufferSize:** The default juteMaxBufferSize has been increased to 10MB, which addresses issues where the device is unable to commit very large configurations.
------
- **I95-51284 Routers remain in the connected state:** Updated the dependencies within the salt minion to resolve an issue where an asset is stuck in the connected state, displaying the error: `Error getting asset's public key: 'ssh.set_auth_key', retrying....`
------
- **I95-51296 Show Time in Status in the show assets detail view:** The asset Time in Status field has been added to the Detail view.
------
- **I95-51359 Unable to set the OSPF MTU:** Added the ability for users to set the MTU to a non-default value.
------
- **I95-51403 GUI displays download in progress even after the download is complete:** Resolved an issue where a download success event is never created even though the version shows as downloaded in the software versions.
------
- **I95-51427 GUI not displaying all the version information:** The GUI About page now displays additional version information previously only displayed in the PCLI `show system version detail.`
------
- **I95-51650 `log-category PCLI` command not working:** Resolved an issue that disallowed setting `config authority router <name> system log-category PCLI`. We now also allow configuring the following log categories:
	- CFGD
	- SNMP
	- HTTP
------
- **I95-51658 Allow sync command in resynchronizing state:** Resolved an issue where the user received an error when executing the send command sync command while an asset was in the resynchronizing state.
------
- **I95-51734 Remove duplicate transport port-ranges from modules before adding to service:** Resolved an issue where FIB entries are not installed when app-id modules have conflicting or overlapping port-ranges, and are being placed into one service.
------
- **I95-51788 Path index is not displayed correctly for `show sessions by-id`:** `show sessions by-id` has been updated to display MTU and PathIndex.
------
- **I95-51792 Low MTU threshold causing metadata fragmentation:** Fixed the incorrect handling of packets where metadata is fragmented due to unreasonably low MTU, causing the packet buffers to become exhausted.
------
- **I95-51793 Path MTU discovery dropping very low:** Fixed PMTU discovery from ever resolving to an unreasonably low MTU, which could previously occur during a link flap event.
------
- **I95-51794 Core dump on systems with greater than 10 physical interfaces, such as Lenovo SR-650:** Resolved an issue where the SR-650 was crashing due to uninitialized flags field. Support has been added for these devices.
------
- **I95-51865 NTP not syncing for HA nodes:** Added the ability to configure the orphan stratum for the HA peer node. This was previously hard-coded to 5 but this change allows an HA peer to be able to sync when the upstream server is of a lower stratum, if so desired by the user.
------
- **I95-51915 Report buffer allocation failures to watchdog:** `alloc-failure` stats are now gathered per device and included in the device stats, allowing the watchdog to detect a failure and respond.
------
- **I95-52104 URI escape characters handled incorrectly:** The `lookup application by-domain` and `clear app-id cache-entry url` were handling url parameters incorrectly, in lookup, creating and clearing cache entries. This has been resolved and each command now performs the correct operation. 
------
- **I95 52105 Permissions error when attempting to `delete certificate webserver`:** Resolved an issue where `delete certificate webserver` and `create cerificate webserver` with an existing certificate were failing. On older versions of software this can be worked around by running `sudo rm -rf /etc/128technology/pki/webserver.pem`. 

## Release 5.6.8-9

**Release Date:** May 25, 2023

### Resolved Issues Requiring Configuration Changes

- **I95-48862 Load balance sessions across BGP RIB Entries with multiple paths:** Resolved an issue when BGP was used to build a routing table, only the first next hop was used. All next hops are now used, and load balancing occurs over all routing protocol routes. 
------
- **I95-50510 New fields for IPFIX:** The SSR IPFIX implementation was not sending the industry standard fields of flowStartMilliseconds and flowEndMilliseconds. In the new implementation, all IPFIX records include these fields. The start time is set to the start time of the flow, and the end time is always set to the time the last packet was received on the flow. For intermediate records, this indicates that the flow is still ongoing but provides the last activity timestamp. For the end records, this indicates when the last packet was received on the flow prior to the session terminating. For additional information, see [IPFIX](concepts_application_discovery.md#ipfix).
------
- **I95-50571 Add packet buffer tracking to help analyze buffer exhaustion:** The following features have been added to help diagnose packet buffer pool depletions in certain environments:
	- Track packet buffer locations.
	- Enforce setting of packet location.
	- Add the ability to walk packet buffer pools, count the locations, and display.
------
- **I95-51169, I95-51173 Buffer tracking improvements:** The following improvements have been made to Buffer Tracking:
	- Refined packet buffer location tracking to better identify buffers in use for `TSI` collection.
	- Provide more diagnostic information, when possible.
	- The following new metrics have been added for tracking utilization of packet pools. These can be found under `show stats packet-processing pool-utilization`. 
		- `fastlane-generated-packet-pool`
		- `host-packet-pool`
		- `network-packet-pool`
		- `tcp-proxy-packet-pool`
------
- **I95-51316 Add Resynchronization state:** Transition an asset into the `Resynchronizing` state instead of `Connected` when a configuration change is made, or when the user executes the `send command sync` command from the PCLI. This better identifies the actions being performed within the SSR, and is not an indicator of the device health. Previously when an asset required a highstate due to a config change or running the `sync` command, the device would transition to `Connected` from `Running`, which caused concern with users.  

### Resolved Issues

- **The following CVE have been identified and addressed in this release:** I95-48448, I95-49456, I95-50358, I95-50359, I95-50506, I95-50508, I95-50535, I95-50790.
------
- **I95-37833 Apply password policy more consistently:** The password policy for SSR users has been updated, and now requires passwords to have a special character in addition to previous requirements. 
:::important
Please refer to [Password Policies](config_password_policies.md) for updated password requirements.
:::
------
- **I95-47776 Tank hostname parsing errors:** Resolved two issues in the Tank instance where the localhost could not resolve to an IP address, and Tank was not identifying non-default ports. These issues have been resolved. 
------
- **I95-48518 Application Identification not recognizing Apps on HA systems:** Resolved an issue where the GUI was only pulling Application data from one node in an HA configuration. Application ID Summary display now aggregates data from both nodes.
------
- **I95-48965, I95-51086 Race condition with routing updates inducing crash in highway process:** Resolved an issue where a routing change that affects the `forwarding-table` can incur a race condition with sessions completing and being removed, which could lead to a highway crash and restart.
------
- **I95-49594 Highway Crash:** Resolved an issue for systems where any of the following are configured:
  - `application-identification` is enabled, 
  - a service is defined with `domain-name child services`, or 
  - a `service address` is configured as a `domain`
and there are established flows for any of these services, a link flap triggering a flow invalidation (changes to FIB) will induce a crash in the highway process of the SSR. This issue exists in versions 6.1.0 and 6.1.1, and is resolved in 6.1.2.
------
- **I95-49603 Process Manager crash:** When a long running process was being cleaned up by the subprocess, the cleanup would fail causing a crash. Long running processes are now properly terminated, which allows the cleanup subprocess to complete correctly. 
------
- **I95-49675 Incorrect path in console help message for `export config running`:** The help message now correctly identifies the export path: **Exported files are stored in `/etc/128technology/config-exports/` and are stored as GZIP compressed files.**
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
- **I95-50047 Conductor config unable to pass local validation on one of the routers:** Resolved an issue where a router missing the `reachability-profile` configuration may pass validation on conductor.
------
- **I95-50050 VRRP High Availability gets stuck in Active/Active:** The DPDK version has been updated to resolve this issue.
------
- **I95-50247 Duplicate peer path alarms:** Resolved an issue where both BFD and the path MTU feature were generating alarms for the same peer path being down. The criteria for which peer path state changes can trigger peer path events has been tightened.
------
- **I95-50262 Routers disconnected from their conductor may have incorrect log rotation settings:** Resolved an issue where a managed router was not able to pull down the configuration from the Conductor - which includes the log rotation config. The default salt log rotation configuration has been improved, preventing the log from growing too large before the connection to the Conductor can be established. 
------
- **I95-50269 Router clone operation fails:** Implemented checks to prevent cloning obsolete elements and internal lists/containers on legacy versions of the SSR software.
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
- **I95-50656 Improve metrics for REST API performance:** Performance improvements have been made in metrics REST APIs to alleviate intermittent metrics graphs on heavily loaded systems.
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
- **I95-50967 SSR is not allowing other DHCP relay traffic to pass through:** When the SSR acts as a DHCP Relay, it will no longer drop packets received from other relay agents on the network. Instead the packets will be routed appropriately as per the configured policies.
------
- **I95-50977 Installer fails to download software when the Conductor software proxy is enabled:** Resolved an issue where when the Conductor software proxy is being used, DNF transactions to the conductor repo go through the proxy, despite the repo pointing to a local tunnel to the conductor. These transactions now go through the proper tunnel.
------
- **I95-50979 Routers remain in connected state:** Resolved an issue where assets will perform a new highstate unnecessarily if a commit occurs while a highstate is already in progress, causing assets to take a long time to get to the running state.
------
- **I95-51006 Nodes stuck in connected state after upgrade:** On an HA conductor, if the user is performing an upgrade on the first conductor node and that user makes a config commit during the upgrade, then the configuration's modified time will become out of sync between the two conductor nodes. When the conductor first node is finished upgrading the result is a loop where the configuration keeps getting committed by each node back and forth until a new commit is made. This issue has been resolved by allowing the peer conductor node to accept the config despite the perceived version disparity. Please note performing a commit mid-upgrade is not supported.
------
- **I95-51007 Conductor is incorrectly honoring core pinning:** The cpuProperties cores setting in /etc/128technology/local.init was erroneously isolating cores on conductor nodes when set, even though this setting is intended for a router. This would cause a reduction in available processing cores for normal conductor operations. This setting will now be ignored on the conductor.
------
- **I95-51044 Hide `forwarding-core-mode` on conductor:** Disabled the `forwarding-core-mode` setting on conductor nodes, since this setting doesn't apply to conductor.
------
- **I95-51087 SSR fails to download firmware after upgrading the conductor:** Resolved an issue where the first time a conductor is upgraded and **conductor-only** is selected in the software-update settings, the proxy service on the conductor does not work correctly, and downloads fail. The downloads no longer fail. 
------
- **WAN-1958 Mist agent crashes:** Increased internal file system limits which were preventing some services from starting correctly at boot. Limits were raised based on expected system usage.

## Release 5.6.7-4

**Release Date:** March 16, 2023

### Resolved Issues Requiring Configuration Changes

- **I95-48928 Set Time using PCLI command:** Add a new PCLI command `set time` which allows an admin to bootstrap a system without NTP connectivity. The PCLI uses the date(1) shell command and accepts a wide variety of inputs. To see more documentation about the date format see setting the time or the -d option on options for date.
------
- **I95-49354 Display SSD smartctl info in `show platform disk`:** We now display the following disk info, if supported by the disk, in `show platform disk`:
	- Lifetime used
	- Power On Hours
	- TBW (Terabyte Written)
	- TBW per year
------
- **I95-50072 Support for ConnectX-6 Lx PCIe device:** Support has been added for this device. 

### Resolved Issues 

:::important
- **I95-49594 Highway Crash:** In a system where any of the following are configured:
	- `application-identification` is enabled, 
	- a service is defined with `domain-name child services`, or 
	- a `service address` is configured as a `domain`
and there are established flows for any of these services, a link flap triggering a flow invalidation (changes to FIB) will induce a crash in the highway process of the SSR. This issue exists in versions 5.6.3 through 5.6.6, and is resolved in 5.6.7.
:::

- **The following CVE have been identified and addressed in this release:** I95-48445, I95-48643, I95-48859, I95-48907, I95-49079, I95-49445, I95-49745, I95-49746, I95-49747, I95-49748.
------
- **I95-48054 STEP not working in Core Network:** Resolved an issue where processing STEP route updates can cause modification of unrelated FIB entries, potentially interrupting existing sessions.
------
- **I95-48232 Ability to ping lost after failover:** We now prevent unnecessary FIB changes (which may lead to a short traffic interruption) when new routes are added to the RIB that are more specific than some configured service IP prefixes.
------
- **I95-48485 Broadcom NIC (NetXtreme) fails to initialize properly:** Resolved an issue with initization errors during memzone creation. 
------
- **I95-48590 ACK RTT Improvements:** Resolved an issue where the stats were not resetting properly, and added supporting sampling to ACK RTT tracking.    
------
- **I95-48927 Audit log disk failure mode:** Added a Failure Notification parameter and failure mode to inform users that the `auditd.conf` log disk is nearing capacity, or has reached capacity, and that action is required.
------
- **I95-48942 Routing policy filter condition reference type not validated:** Added a check to verify that when a routing policy condition references a filter, the condition type and filter type match. 
------
- **I95-49118 HA LTE Interfaces go down and impact BGPoSVR and Conductor:** The handling of FIB updates due to interface state changes has been optimized to avoid possible traffic loss for unaffected FIB entries.
------
- **I95-49242 When HMAC is disabled, the automatic MSS adjustment calculation for `enforced-mss = automatic` may be wrong:** The Automatic MSS adjustment calculation has been corrected (expanded). 
------
- **I95-49350 BFD echo generating latency overhead:** BFD echo tests are now staggered to minimize application latency's contribution to overall peer path latency.
------
- **I95-49377 Transmit packets dropped by NIC for established sessions - packet counters are incrementing and can be seen in packet capture, but not seen by next-hop:** Added hooks for NIC driver to trigger an unrecoverable event and invoke the Highway lockup detector mechanism. 
------
- **I95-49431 Unable to edit or add static route config from Conductor GUI:** When editing configuration on the stand-by node of an HA pair, creating a list item with a slash, /, such as specifying the destination-address of a static-route, caused an error. This has been resolved.
------
- **I95-49447 Conditional BGP advertisement is not respected:** Resolved an issue that if a peer went down and came back up, the conditional advertisement was no longer respected. 
------
- **I95-49454 Error while creating a new Radius user from the GUI:** The create user API now rejects requests with invalid input parameters. 
------
- **I95-49514 Linux interfaces bounced on startup:** Resolved an issue where all Linux interfaces managed by 128T are bounced once on 128T startup.
------
- **I95-49564 Reduce volume of logs during pending lookups:** The error logs during a pending lookup has been changed to a muted error log with a stat.
------
- **I95-49604 Alarm when a node is disconnected:** An alarm is now raised when a node is disconnected from the internal synchronization database.
------
- **I95-49633 Validation not strict for static assignment within DHCP server configuration:** Configuration for static addresses within DHCP server exists in multiple locations per design. Cross-validation has been added to prevent the same ip-address from being configured and assigned to multiple dhcp-clients.
------
- **I95-49655 Cutting and pasting the output of `show flat` does not work for OSPF:** Resolved the issue that prevented editing the OSPF list.
------
- **I95-49722 Event filter does not work on HA router nodes:** Resolved issues with filtering by node, and an incorrect value was displayed for the node column in the GUI.
------
- **I95-49756 RDP sessions failure over peer path:** Resolved an issue that caused RDP traffic to fail when adaptive encryption and AppId are both enabled.
------
- **I95-49778 Conductor GUI not showing data metrics for routers running:** Resolved an issue where API keys were not properly synced down to the managed routers which caused certain router data to not show up on the GUI.
------
- **I95-50014 Hitting Buffer Overflow during configuration changes:** Resolved an issue where a config change request may not make it to a managed router, and returns a buffer overflow error.
------
- **I95-50034 Issues with stuck sessions in load balancer:** Resolved an issue with session modify, where gateway changes on the same egress interface can fail due to a missing ARP.
------
- **I95-50050 VRRP High Availability gets stuck in Active/Active:** The DPDK version has been updated to resolve this issue. 
------
- **I95-50058 Performance regression in Running Config APIs:** Resolved a constant cache miss for a specific set of the running config APIs.
------
- **I95-50076 EthResource descriptor calcs don't account for variable defaults:** Resolved an issue where Mellanox ConnectX-5 and ConnectX-6 could be initialized with insufficient packet receive capacity.
------
- **I95-50139 Include PID in User-Agent header:** Added a debugging aid to identify which process is sending requests.
------
- **I95-50172 Download error not cleared until next successful download:** Resolved an issue where failed download errors are not cleared when a new download starts.

## Release 5.6.6-7

**Release Date:** January 18, 2023

### Resolved Issues Requiring Configuration Changes

- **I95-47947 Increase max CoreDump size to 4GB:** The maximum size of coredumps now defaults to 4G. This value can be configured in environment config by modifying the `maxCoredumpSize` field of the new `crashReporting` object. Any manual modifications to `coredump.conf` will be overwritten whenever the service is started. 

:::important
Upgrading to this release version will cause `coredump.conf` to be re-written with 4G limits for coredumps even if `coredump.conf` had been updated manually for a higher value!
:::

### Resolved Issues

- **I95-46336 Peer connection not established after AWS upgrade:** Resolved an issue where an AWS C5 instance size can fail to initialize when more than one accelerated network interface is configured.
------
- **I95-48352 Application ID is not identifying MS-Teams correctly:** Resolved an issue where sessions with IP addresses as their domain names were not classified correctly when the information was received via HTTP web proxy. Sessions with IP addresses as their domain name are now verified against the IP tree, and not the domain name database.
------
- **I95-48447 JWTs signing does not meet stringent security standards:** Changed how JWTs are signed to increase security posture.
------
- **I95-48464 This CVE has been addressed.**
------
- **I95-49139 `show network-interface application` renders poorly for empty hostnames:** The DHCP server state script has been updated to not escape `<empty>` hostname.
------
- **I95-49166 OSPF is not configurable using the GUI:** This issue has been resolved.
------
- **I95-49225 Packets containing only path-metrics metadata are dropped:** Resolved an issue where FPM calculations caused these packets to be dropped when flows were affected due to routing changes.
------
- **I95-49326 New sessions become associated with defunct sessions on next-hop routers:** Enhanced session reuse detection to validate all incoming metadata once a session-id has been properly latched.

### Caveats

- **I95-49724 Quickstart URL Upload not working:** In Release 5.6.6, the QuickStart file upload using the `https://<ssr-ip>/quick-start` URL is not working. This is currently being worked on and will be fixed in 5.6.7. No other patches/releases are affected. 

**Workaround:** Upload the Quickstart file using a USB as outlined in [Configure the SSR and Network Interfaces](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/intro_otp_iso_install#2-configure-the-ssr-and-network-interfaces) section of the [Router Installation Using OTP](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/intro_otp_iso_install) guide. 

## Release 5.6.5-5

**Release Date:** December 28, 2022

### Resolved Issues

- **The following CVE have been addressed and resolved:** I95-48644, I95-48648, I95-48650, I95-48653, I95-49039.
------
- **I95-34384 Rotated datastores with different permissions:** Resolved an issue where some rotated datastore files had different permissions.
------
- **I95-44926 Configuration validation for `as-path` incorrect for certain values:** Resolved an issue where a subset of 4-byte BGP private AS numbers was not accepted inside AS path specifications for routing policy `modify-as-path` actions.
------
- **I95-45478 Segmentation Fault in the Dynamic Peer Update process:** Resolved an issue with multi-threaded access to a data member, leading to a segmentation fault.
------
- **I95-47797 Packet duplication does not interoperate well with outbound-only adjacencies:** When utilizing the packet-duplication feature (`service-policy -> session-resiliency = packet-duplication`), any peer adjacencies marked as `outbound-only` are no longer used. Packets are only duplicated along bidirectional paths.
------
- **I95-47929 Missing BGP advertisement after deleting all sessions after an upgrade:** Resolved an issue where BGP update suppress was not removing any pending withdrawls.
------
- **I95-47992 HTTP service not working in WAN Assurance:** Resolved an issue where HTTP traffic is dropped when using a combination of application-identification, adaptive-encryption, and spoke-to-hub-to-spoke topology (outbound-only peer-connectivity).
------
- **I95-48107 EoSVR sessions not stable:** Resolved an issue with loss of connectivity to STEP EoSVR peer. The STEP route is now held in place and available when STEP connectivity is restored. 
------
- **I95-48163 Only services with load-balanced paths are shown in `show services`:** Resolved an issue where services without load-balanced paths weremissing from show services output.
------
- **I95-48324 Application Identification not parsing domain names:** The App-ID parsing mode has been updated to correctly parse domain names.
------
- **I95-48396 `show-rib` limited to 512 entries:** The `show rib` count maximum has been increased.
------
- **I95-48529 BFD sending link notification before hold-down timer expires:** Resolved an issue where peer service-paths do not remain down while the BFD session / peer status is in the hold-down period after transitioning from down to up. Peer service-paths status now correctly reflect the peer status. Sessions will not be moved back to peers that have re-established connectivity but are still in the hold-down period.
------
- **I95-48580 Application summary classification fails for hub-to-spoke sessions:** The spoke now learns application names for sessions when receiving packets from a hub with application identification disabled.
------
- **I95-48582 `show bfd` command ignoring parameters:** The query parameters are now passed to the REST endpoint to be used byt the `show bfd` command.
------
- **I95-48641 Recreating BFD flow when an outbound-only session is reset:** Flow creation is now deferred until a reverse packet arrives from the peer, similar to the initial creation case.
------
- **I95-48656 Reduce TSI service log limit:** The size of the Tech Support Info journal has been restricted to prevent excessive resource consumption.
------
- **I95-48684 SSR not answering ARP requests:** Increased `internal-application traffic-engineering` rates for ARP traffic which was being dropped in a multiple packet-processing core environment incorrectly due to an over aggressive traffic engineering profile.
------
- **I95-48685 GUI and/or PCLI unresponsive:** Resolved an issue where on an HA conductor the user interface would become unresponsive if a managed router was offline or unreachable.
------
- **I95-48689 Top Sessions not displaying source address:** Restored the **Source** column in the Top Sessions table. 
------
- **I95-48723 HA sync not running after systems reconnect:** Historical metrics and events are synced between HA nodes after extended downtime.
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
- **I95-49157 Poor GUI and PCLI performance for other users during a change/validate/commit operation:** Resolved the performance issue by optimizing the export config API.

## Release 5.6.4-3

**Release Date:** November 18, 2022

### Resolved Issues Requiring Configuration Changes

- **I95-48223 Add Application-specific information to `show sessions by-id`:** The following information has been added to `show sessions by-id`: 
	- domainName
	- uri
	- category
	- overrideServiceName
	- appStatsTrackingKey (combination of application, client ip, ingress-interface, next-hop, and traffic-class) 

### Resolved Issues

- **I95-48076 SSR Failover on GRE tunnels not working:** The base interface giid is now used to identify the state of a GRE tunnel next-hop.
------
- **I95-48158 Unable to capture child services using session capture:** When a session capture is configured on a child service (e.g., `social.internet` instead of `internet`), the session is now recorded.
------
- **I95-48427 BGP ignoring multihop TTL (Time To Live) setting leading to invalid nexthop:** Resolved an issue where BGP may temporarily "forget" about the TTL value configured for a neighbor.
------
- **I95-48508 Keep-alive cache may cause worker core CPU spikes:** Resolved potential worker core utilization CPU spikes by utilizing aggressive keep-alive timeouts.
------
- **I95-48600 Compare Session ID's to prevent flow collisions:** Re-use of sessions is prevented when waypoint pool is exhausted and sessions linger on egress router.
------
- **I95-48685 GUI and/or PCLI unresponsive:** Resolved an issue where on an HA conductor the user interface would become unresponsive if a managed router was offline or unreachable.
------
- **I95-48686 Transmitted packet buffers held too long:** The packet pool sizing has been adjusted to prevent pool depletion when local.init overrides for descriptor counts are present.
------
- **I95-48731 Sessions created on a `fin-ack` may get stuck:** Resolved an issue where, if tcp-state-enforcement is set to allow, a TCP session is established from a fin-ack may not get torn down in a timely manner.
------
- **WAN-1372 Improve CPU Usage Reporting:** Devised a more efficient collection scheme to minimize the CPU impact when collecting the CPU and memory data.

## Release 5.6.3-6

:::important
The following issue has been discovered in the releases listed here:

- 5.6.2 
- 5.6.3

If an HA Conductor queries a disconnected router from the Conductor GUI Router page or from the Conductor PCLI, the conductor may encounter periods of poor performance until the requests time out. The issue has been resolved in the next patch release with I95-48685. 

For immediate resolution on the impacted releases, contact Juniper Technical Support, or your SE.
:::

**Release Date:** November 7, 2022

### Resolved Issues

- **I95-32789 Peer metrics unavailable after Conflux synchronization:** Resolved an issue with HA routers where the metrics application stops streaming metrics to the peer node after loading configuration.
------
- **I95-43302 Rename Third-Party menu text:** The menu text has been changed to **External** to more accurately reflect the links to other Juniper platforms.
------
- **I95-44957 Azure is not able to identify the asset-id of the depolyed conductor and router:** The Azure ID has been modified to a value that can be processed by Azure.
------
- **I95-45478 Segmentation Fault in the Dynamic Peer Update process:** Resolved an issue with multi-threaded access to a data member, leading to a segmentation fault.
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
- **I95-47438 ESP Session Missing:** Resolved an issue that created stuck sessions when a NAT device was rebinding and failing to establish sessions from reverse packets.
------
- **I95-47475 Session capture not downloadable for a read only user:** Adjusted permissions to provide access to session capture files to read-only users.
------
- **I95-47476 Session table associated paths not scalable, scroll bar hidden:** The Session Table window has been enlarged to more clearly show information.
------
- **I95-47529 Outbound-only sessions get stuck after NAT rebinding:** Resolved an issue that created stuck sessions when a NAT device was rebinding and failing to establish sessions from reverse packets.
------
- **I95-47642 Plugin state summary (table view) for HA router overlays both nodes:** The Plugin state table has been separated by node.
------
- **I95-47787 Worker core packet processing spikes to 100%:** Added the ability to tune the [Reverse Packet Session Resiliency](config_reference_guide.md#reverse-packet-session-resiliency) `Minimum Packet Count` (default is 3) and `Detection Interval` (default is 5) settings for session failover without requiring forward packet, and resolved the underlying issue that caused excessively high worker-core CPU.
------
- **I95-47909 Handle GRE tunnels in ICMP reachability probe:** The base interface for egress is now used if the `icmp-probe probe-address` is the same as the tunnel destination, and the `internal-address` is used as the source if the `egress-interface` is `gre-overlay`.
------
- **I95-47967 Cloud bootstrapper does not bootstrap the deployed Conductor:** Resolved an issue where the configuration was being rejected by the cloud bootstrapper when the device was a conductor.
------
- **I95-48019 Issue with deleting a flow on reverse metadata:** Resolved an issue that created stuck sessions when a NAT device was rebinding and failing to establish sessions from reverse packets.
------
- **I95-48103 Commit triggered BGP issue:** Resolved an issue where BGP neighbors configured with a short hold time might experience a BGP session flap during a configuration commit when app-ID is enabled.
------
- **I95-48108 Service Ping for a Service without Source NAT uses Source IP Address:** The service-ping now uses the source-ip as the packet source-ip if provided.
------
- **I95-48125 Save TSI streaming from router to conductor not working:** Adding a node and router argument to the PCLI command `save tech-support-info` now works correctly.
------
- **I95-48138 Enabling metadata only works for packets that match the port-range specified:** Resolved this issue by identifying the specific flow, and enabling reverse metadata for a that flow.
------
- **I95-48181 "Failed to send IPFIX interim record" log messages:** Changed log level from Error to appropriate logging level for the cases when ipfix records should not be generated.
------
- **I95-48246 Peer path GQL query should provide a node filter:** Added a parameter to stats on peer-path so that the node can be overwritten.
------
- **I95-48357 CoreDump on Failover with DSCP Steering:** Resolved an issue where DSCP Steering sessions would fail to move a flow under certain circumstances and, when using DSCP value 0, crash.
------
- **I95-483381 Race condition in session teardown:** Shared context is now maintained to allow all packet processing to be completed before session teardown. 
------
- **I95-48507 VLAN packets are generated without a valid VLAN from the flow-move cache:** Resolved an issue where sessions could be modified incorrectly when a VLAN is present and session resiliency is enabled for failover.

## Release 5.6.2-7

**Release Date:** October 4, 2022

### Resolved Issues Requiring Configuration Changes

- **I95-35571 Enhanced Syslog:** The SSR can be configured to send system generated events over a secure TLS or TCP connection to a remote-logging server for analysis and storage. For more information, see [Secure Syslog Transport](config_audit_event.md#secure-syslog-transport)
------
- **I95-44863 Automatic Core Assignment after Reboot:** On systems where `forwarding-core-mode` is set to `automatic`, if the CPU core count changes the software will automatically recalculate the core count and allocation at reboot.
------
- **I95-47077 Configuration options for User Accounts:** Added configuration options for number of login attempts before locking user account, and number of seconds that user account will be locked before being able to attempt to login again. For information, see [Password Policies](config_password_policies.md).
------
- **I95-47418 Audit Events for Plugins:** A new audit event has been added that tracks when a plugin is installed or uninstalled. This can be viewed on the Audit History page in the GUI or in the PCLI by running `show events type admin.plugin`.

### Resolved Issues

- **The following CVE have been addressed and resolved:** I95-45056, I95-45059, I95-45060, I95-45123, I95-45165, I95-47482, I95-47483, I95-47484, I95-47485, I95-47805, I95-48048, I95-48049. 
------
- **I95-39454 Created User cannot access PCLI operations:** Resolved an issue where in rare cases, during bulk user additions, it was possible for the operation to fail, leaving the new user created but unable to login.
------
- **I95-42320 BGP aggregate-address not working:** Add support for BGP address summarization.
------
- **I95-44434 Peer metric sends IP of WAN interface instead of the expected string:** Logic has been added to show the available destination address.
------
- **I95-44976 Highway issue when modifying an app-id session:** SSR software versions 5.1.5 and greater are susceptible to a crash during a flow migration when `application-identification` is enabled (modes `tls` or `all`) on spoke to hub traffic traversing over SVR. The condition occurs for sessions migrating that have timed out or that are traversing the ha-fabric link in the reverse direction.
------
- **I95-45847 Duplicate Alarms on Multiple Routers:** Resolved duplicate alarms by obtaining alarms from only one node in an HA pair.
------
- **I95-46056 `show ntp` has no output from PCLI, even though NTP is configured:** The output of show ntp will now report IP addresses of the time servers rather than resolve hostnames.
------
- **I95-46126 Router Status:** Resolved an issue in HA configurations when a router is connected to HA Conductor 1, but not directly connected to HA Conductor 2, alarms generated on the router are now seen on Conductor 2 - the conductor to which the router is not directly connected. 
------
- **I95-46281 Update Kernel to RHCK 8.6:** Updated the kernel to integrate the latest security fixes.
------
- **I95-46545 Conductor Validation passing when a URL is configured in a Parent Service:** Validation for application-identification has been updated to include URL and subcategory. 
------
- **I95-46641 Modem lockup after reset on dual LTE system:** Resolved an issue with dual LTE modem lockup after reset.
------
- **I95-46662 Tenant prefix differences on two HA router nodes are not validating correctly:** Added a validation check to ensure that the tenant-prefixes between two redundant interfaces are identical.
------
- **I95-46701 Packet Loss on Headend Router:** Added device-interface rx/tx descriptor ring size to resolve this issue.
------
- **I95-46807 Validation insufficient for reachability-detection:** Added validation logic to report and error when `service-route > reachability-detection` was configured, but neither `icmp-probe-profile` or `reachability-profile` exist.
------
- **I95-46826 Carrier detection logic not recognizing disaster recovery modem:** Updated the carrier detection logic to properly recognize the carrier when a modem is attached to a disaster recovery cell tower.
------
- **I95-46918 GUI and PCLI out of sync when new configuration elements added/modified:** Resolved an issue where `show network-interface` and `show config` were not updating properly.
------
- **I95-46919 LDAP Users Not Shown in GUI Users Display:** Updated username requirements and the ability to identify issues with usernames not meeting those requirements. See [Username and Password Policies](config_password_policies.md) for username requirements.
------
- **I95-46921 `128status.sh` script incorrectly checks for non-existent listening port:** Removed port 830 check for software versions 5.3.0 and greater
------
- **I95-46966 BGP Connection Restarts on SVR Peer Failover:** Resolved an issue with FIB entry setup that was causing BGP connection reset when the session fails over.
------
- **I95-47129 Metadata is not disabled after flow-move for EoSVR sessions:** Added a metadata turnoff after session failover for EoSVR.
------
- **I95-47336 Running configuration change events are missing:** Updates have been made to include `username` in the running configuration change events log. 
------
- **I95-47414 Skip the AD lookup in highway for ICMP:** ICMP is now skipped during AD lookup to keep the App stats reults relevant.
------
- **I95-47437 TSI creation is leading into Network Failure - BGP BFD went down:** Refined the output for TSI to prevent failures. 
------
- **I95-47537/I95-47556 Synchronize writing to files to avoid a race condition:** Added a common file lock to synchronize writes.
------
- **I95-47551 Keep-alives are not generated for unidirectional outbound-only sessions:** Resolved an issue with keep-alive generation for unidirectional outbound-only sessions.
------
- **I95-47552 LTE modem not coming up after upgrade:** Resolved an issue with modem detection and port scanning for Quectel EC25.
------
- **I95-47585  Transmit-failure increments when TE is enabled:** When `device-interface traffic-engineering` is enabled, the `stats/packet-processing/sent/interface-failure` statistic is no longer erroneously incremented.
------
- **I95-47655 BGP issues with VRRP:** VRRP failover may cause routing to not function if internal device numbering is not consistent across the redundant nodes.
------
- **I95-47767 Next Hop choice of "Blackhole" does not stay visible in Conductor:** This option was displayed in error, as the option is ignored. It has been removed.
------
- **I95-47872 App-ID summary tracking of failed sessions still incremented when feature disabled:** App-ID stats tracking for failed sessions now checks the feature enabled flag and responds appropriately. 
------
- **I95-47969 Increased Memory use when generating TSI:** Resolved an issue where the `save runtime-stats` command and TSI generation could result in particularly high memory usage when Application Identification was enabled.

	The `save runtime-stats` command no longer operates across multiple nodes and routers, and will not aggregate the metrics to disk on the conductor. This is to protect against excessive memory consumption. This is a change in functionality; however the public metrics APIs achieve the same result and are the preferred mechanism to collect authority wide metrics.
------
- **I95-47981 Ignore VRRP advertisements if the VRID doesn't match:** The VRID is now validated before accepting an advertisement to resolv an issue where VRRP advertisements intended for a different router were being processed.
------
- **I95-48018 APP-ID implementation with proxy web server unable to identify traffic correctly:** Resolved an issue reading certain HTTP headers that was causing Application Identification to miss them.
------
- **I95-48038 502 Error returned if managed routers are offline:** Resolved an issue that caused HTTP requests on the conductor to return a 502 error for all requests if a managed router is offline.

## Release 5.6.1-18

**Release Date:** August 1, 2022

### Resolved Issues Requiring Configuration Changes

- **I95-35610 Session Failover without a Forward Packet:** A keep-alive mechanism has been added for flow moves. When flow move is triggered, the SSR detects inactivity in forward traffic and generates a keep-alive packet in the forward direction.
------
- **I95-40195 LDAP does not allow search base to be configured correctly:** Search base parameters, filter generation, certificate assurance, and logging enhancements have been added to the `ldap-server` configuration. See [LDAP](config_ldap.md) for more information.
------
- **I95-40333 Save credentials for accessing SSR software repositories:** `set software access-token` is a new PCLI command to save credentials for accessing SSR software repositories. This provides a way to run `install128t repo authenticate` without dropping to a linux shell. For additional information on this command, see [`set software access-token`](cli_reference.md#set-software-access-token).
------
- **I95-43048 NIST FIPS Validated Cryptography:** FIPS Enforcement Mode has been added to the  package-based installation processes. Refer to [FIPS Enforcement Mode](intro_installation_bootable_media.mdx#fips-enforcement-mode) for details.
------
- **I95-43785 DSCP Tag Preservation:** When set to `true` the `preserve-dscp` command allows you to preserve DSCP values that have been set in a service class or received on a LAN-Interface, over an SVR path. See [DSCP Preservation](config_dscp_preservation.md) for more inforamation.
------
- **I95-44769 Add Linux system logs to the Tech Support Information data:** This patch allows for customizations of the systemd journal content included in the `tech-support-info` bundle, and includes additional default content.
------
- **I95-44863 Automatic Core Assignment after Reboot:** On systems where `forwarding-core-mode` is set to `automatic`, if the CPU core count changes the software will automatically recalculate the core count and allocation at reboot.
------
- **I95-44870 Mist Self-Registration and Onboarding:** Onboarding a Mist Managed SSR instance can be accomplished as part of the installation process. For details, refer to the steps to [Associate the Router with Mist](intro_installation_image.md#associate-the-router-with-mist) as part of the image-based installation. 
------
- **I95-45670 BGP Conditional Advertisement:** When an SSR prefers a given provider for outbound traffic, it can now be configured to receive locally destined traffic specifically from that provider. For details and configuration information, see [BGP Conditional Advertisement.](config_bgp.md#bgp-conditional-advertisement)
------
- **I95-45679 Round trip time to packet acknowledgement:** A new TCP metric that samples round trip time from data sent to acknowledgement has been added.
------
- **I95-46562 Allow targeting another router or node when saving tech-support-info:** GUI: A button has been added to the **Logs** page in the GUI to download a tech-support-info bundle. This allows downloading a router's `tech-support-info` directly from the Conductor GUI. <br />
PCLI: The PCLI command `save tech-support-info` can now collect logs from another node. Using the Conductor's PCLI, a `tech-support-info` bundle can be collected from a Managed Router or the HA peer.
------
- **I95-46747 Improved the Password user experience:** You now are re-propmpted up to three times for the current password if it is incorrect. If a new password does not meet the strength check, you are prompted with that information, and required to update the password. 

### Resolved Issues

- **The following CVE have been addressed and resolved:** I95-45054, I9-45056, I95-45059, I95-45060, I95-45165, I95-46020, I95-46359. 
------
- **I95-35228 DHCP waypoint addresses not displayed on standby node in UI:** Resolved an issue where the PCLI logic was not matching the GUI Network Interface table.
------
- **I95-39274 DNS-based services kill asset connection resiliency:** Resolved an issue where an internal commit was bouncing the kni254 interface and causing a series of connection resets.
------
- **I95-42438 Save Tech Support tries to run when SSR service is down:** In situations where the PCLI is still active, but the SSR service is down, trying to run `save tech support` will appear to work, but does not return any info. This issue has been resolved, and will return a message when information is not retrievable. 
------
- **I95-43606 No communication between Routers:** In rare instances the BFD Pinhole feature experienced collisions between forward session flows. Session modification has been addressed and collisions are now avoided.
------
- **I95-43779 DHCP IP Address not releasing appropriately:** When the cable is physically disconnected and reconnected from DHCP-enabled interfaces, the interfaces are now triggered to send out a DHCP Request for their current IP address.
------
- **I95-44001 Peer uptime showing "Unavailable":** Peer path uptime now displays the correct values.
------
- **I95-44548 Application Summary Sort Order:** Resolved an issue with the Application Summary sort order changing unintentionally.
------
- **I95-44551 DHCP Relay not working after upgrade:** A packet for traffic matching a summary service may be dropped because it was incorrectly flagged as hierarchical on the SVR peer. Well known non-hierarchical services such as DHCP relay will no longer perform hierarchical service checks on the peer.
------
- **I95-44726 Invalid return code returned by T1 card firmware creating a memory leak:** Resolved a buffer leak in the wanpipe driver.
------
- **I95-44988 SSR Stuck in Upgrade status:** Improved logging to detect when an installer session is started and there is an already an active interactive installer session; for example when an interactive installer session was left open.
------
- **I95-45094 Unnecessary rotation of salt minion config:** Resolved an issue where the global.init and salt minion config are unnecessarily rotated and updated with no changes to the actual contents of the file.
------
- **I95-45126 Split-brain after the sync interface goes down:** Resolved an issue that if the SSR software experienced a crash while it owned an interface from an X553 device, other devices hosted by the same chip could be impacted.
------
- **I95-45164 `show-active-peers` missing some information:** Resolved a corner case where an RFC-compliant device ahead of a non-compliant device with a smaller MTU, the SSR misinterprets the non-compliant device's timeouts and the MTU will be unresolvable.
------
- **I95-45271 Error while trying to change appearance or selecting custom reports:** In some cases where error messages are vague, a path to the error location is provided. 
------
- **I95-45372 Filters in the Routers Tab not working:** Resolved a logic issue with the GUI table.
------
- **I95-45489 `ifcfg` custom options issues:** Resolved an issue where  interface ifcfg option changes were not being processed.
------
- **I95-45814 No Bandwidth statistics visible in GUI:** Resolved an issue when processing high numbers of services and service routes which prevented a subset of stats from being stored and displayed.
------
- **I95-45842 PCLI `show events` does not paginate correctly:** This issue has been resolved.
------
- **I95-45882 Rare case where an invalid DHCP server configuration generated:** This issue has been resolved.
------
- **I95-45890 Service paths for BGP over SVR routes are not being rebuilt:** Resolved an issue when the vector configuration is changed on a network interface, the service paths for BGP over SVR routes are not being rebuilt. 
------
- **I95-45999 Azure Router Crash:** Added support for NetVSC/VF hotswapping to resolve this issue.
------
- **I95-46055 Add warning when transmit caps are too low:** Users now get a warning when configuring a traffic-engineering transmit-cap under 1Mbps.
------
- **I95-46114 SSR flooded with Highway messages:** The chatty `InterfaceMap::Exception: Unable to find path to peer` highway log has been suppressed. 
------
- **I95-46136 Unused Application ID stats not being purged fast enough:** Resolved an issue where application ID stats tracked per client, per app, per next-hop are not cleaned up when inactive.
------
- **I95-46169 RIB Doesn't Update Connected Route After Changing Network Interface Address Prefix from /24 to /27:** Resolved an issue when changing the prefix length for a network interface address, the RIB was not updated and routing protocols were not aware of the change.
------
- **I95-46230 Highway Crash:** Resolved an issue where uncaught exceptions were causing highway issues.
------
- **I95-46314 Configuring Static Assignment with Client-Identifier Causes DHCP failure:** Updated config validation to verify that, within a single DHCP server host-service, all static assignments use unique client-identifiers.
------
- **I95-46332 VRRP Does Not Work with Ethernet Controller X710 for 10GbE SFP+:** Configuring VRRP on an Intel X700 series NIC can see discard broadcast packets due to the source pruning feature which is enabled by default. This change disables source pruning when VRRP is enabled on these NICs.
------
- **I95-46411 PPPoE over VLAN interface status missing in `show` commands:** Added atttribute to show the missing information. 
------ 
- **I95-46419 Forward Error Correction (FEC) with OutBound Only Fails:** Resolved an issue where FEC actions are not installed properly after the modifcation to resolve the outbound only path.
------
- **I95-46454 ICMP manager excessively logs ICMP echo replies with no matching context:** This issue has been resolved.
------
- **I95-46458 `set password` from PCLI hangs at "Modifying password":** This issue has been resolved. 
------
- **I95-46613 Flow move may not happen without forward packet for outbound only sessions:** Resolved an issue that when a session has been idle for more than 10 seconds, sessions for outbound-only connections may not failover properly without a forward packet.
------
- **I95-46641 Modem lockup after reset on dual LTE system:** Resolved an issue with dual LTE modem lockup after reset.
------
- **I95-46822 Revertible failover traffic not restored when reverse traffic is present:** For a "revertible-failover" service policy, when the preferred path is restored and a session no longer traverses an internode dogleg path, it was taking several seconds for traffic to be restored when forward traffic is present; in situations where only reverse traffic is present, traffic may not be restored. This issue has been resolved.
------
- **I95-46931 Hardware using ConnectX6-DX fails to initialize:** Added support for this card variant.
------
- **I95-46959 PPPoE over VLAN not working when target interface is down:** Added code to bring up parent interface before VLAN interface.
------
- **I95-47111 Issues with redundant interfaces on startup:** Resolved an issue where the notifications for active interfaces may get lost when using VRRP for redundancy.

## Release 5.6.0-44

**Release Date:** May 20, 2022

### New Features

- **I95-10056 RADIUS support for Multi-Factor Authentication:** Integration between Radius user access and Role-based Access Control allows the SSR to support Multi-Factor Authentication using Yubikey. 
------
- **I95-200118 Configuration Concurrency at Scale:** Support for multiple users concurrently editing the SSR configuration is now supported. For more information, see [Candidate Configuration](config_basics.md#candidate-configuration).
------
- **I95-32820 and I95-41915 STEP High Availability:** See [STEP High Availability](config_step_ha.md) for more information. 
------
- **I95-37417 Additional factory default session-type configuration:** Added factory-default session-types for NetBIOS Name Service, NTP, and LDAP over UDP.
------
- **I95-37648 Configurable Password Policy:** The SSR password policies have been updated to provide a more secure experience. See [Password Policies](config_password_policies.md) for additional information.
------
- **I95-38430 Support for PPPoE over VLAN:** Added support for PPPoE over VLAN. See [VLAN Support on a PPPoE Interface](howto_pppoe_vlan.md) for configuration information. 
------
- **I95-39712 Hierarchical Service Inheritance For STEP Learned Routes:** Child services now inherit routes of their parent services, when the parent route is learned through STEP. For more information see [Hierarchical Services.](config_STEP.md#hierarchical-services)
------
- **I95-40130 Factory Defaults for Conductor Communication:** Added SaltStack, Conductor, and IKE default session-types. For new deployments, SIP, SIPS, and IPSEC-NAT use NAT Keep Alive by default, and the timeout for IPSEC-NAT is 125 seconds.
------
- **I95-40660 Kernel Upgrade:** The OS kernel has been upgraded to address several CVEs and provide support for Wireguard and Cordoba.
------
- **I95-41449 NTP Authentication with SHA1 or better:** Support for NTP authentication provides options for external NTP server authentication. See [NTP Authentication](config_ntp_auth.md) for more information.
------
- **I95-41509 STEP Route Computation enhancements:** STEP uses additional service policy information when computing the best path scenario. See [STEP Route Computation](config_STEP.md#route-computation) for more information.
------
- **I95-41557 Software Lifecycle Management:** The download, upgrade, and software lifecycle process is more easily managed from a single location in the GUI. See [Software Lifecycle](intro_upgrading.md#upgrade-using-the-conductors-gui) for additional information. 
------
- **I95-42483 STEP Page in the GUI:** [The STEP page in the GUI](howto_STEP_GUI.md) provides graphical representations of STEP data.  
------
- **I95-42887 Real-time alerts for Audit failure events:** A service has been added a service that warns all logged in users if auditd fails to start and audit logging capability is impacted. See [Audit Events](config_audit_event.md#basic-configuration) for more information. 
------
- **I95-42888 Logout mechanism for administrator-initiated communication sessions:** A PCLI command and audit log are available to verify session closure.
------
- **I95-43039 File permissions, ownership/membership of system files and commands remain static:** Unauthorized or unintended changes are not introduced during the operation of the SSR Software.
------
- **I95-43040 Non-certificate trusted host is not allowed SSH logon to the system:** The SSH daemon performs strict mode checking and does not allow a non-trusted host SSH to logon to the system.
------
- **I95-43041 Datagram Congestion Control Protocol (DCCP) kernel module is disabled unless required:** The DCCP module is prevented from loading unless it is specifically required. 
------
- **I95-43047 Local initialization files do not execute world-writable programs:** The directories are not world-writable.
------
- **I95-43049 The audit system notifies the user when there is an error sending audit records to a remote system:** Remote logging for audit logs and appropriate messaging has been added. See [Audit Events](config_audit_event.md#basic-configuration) for more information.
------
- **I95-43050 Strict mode checking of home directory configuration files:** The SSH daemon performs strict mode checking home directory configuration files.
------
- **I95-43051 Remote X connections are disabled except to fulfill documented and validated requirements:** X server is disabled as part of the mode checking of home directory configuration files. 
------
- **I95-43496 BFD for Routing Protocols:** BFD support for BGP and OSPF protocols has been added. See [Optimizing Routing Protocols: BFD](config_bfd.md) for more information.

## Resolved Issues

- **I95-36758 Redistributed service route distance not configurable:** Support has been added for the configuration of admin distance for kernel routes generated by services with service routes and for BGP over SVR services. 
------
- **I95-38408 DHCP server on wrong vlan sends offer in response to discover message:** Hosted DHCP servers that do not have an explicit vlan configured are now explicitly treated as vlan 0, and handle any DHCP packets that are untagged/vlan 0, in order to prevent those packets from being multicasted to multiple DHCP servers.
------
- **I95-40904 Power save mode not working:** This issue has been resolved.
------
- **I95-41992 Warning for Rate-Limit with Flow-Limit values at 0:** A warning has been added to advise users that this will cause dropped packets.
------
- **I95-43239 LTE APN on Modem not set up correctly:** The APN is now always written to the the modem using the default index of 1. 
------
- **I95-44142 Automated Provisioner Race condition:** Resolved a rare crash where applications would attempt to get information about already-closed sockets when responding to API requests.
------
- **I95-44435 Save Tech Support should include Service Paths:** `save tech-support-info` includes `show service-path` and `show rib`.
------
- **I95-44722 Time series HMAC failures after rebooting node in HA router:** Device interfaces are flushed upon becoming active to avoid handling of packets which have been delayed due to inactivity.
------
- **I95-44726 Invalid return code returned by T1 firmware creating a memory leak:** Resolved a buffer leak in the wanpipe driver.
------
- **I95-44823 Conductor upgrade failure - extra space in integer is invalid:** Extra spaces on integer types are now trimmed off to avoid this issue.
------
- **I95-44854 Extra "Application" column in Top Sessions panel:** The extra column has been removed. 
------
- **I95-44913 kmod-i40e metapackage causing upgrade issues:** The metapackage has been removed and upgrade issues have been resolved.
------
- **I95-44985 Update salt-minion minimum version to resolve CVEs:** This issue has been resolved. 
------
- **I95-44991 SSR not passing Aruba data on GRE Tunnels:** Resolved an issue where GRE packets with reserved bit in the header are incorrectly dropped as invalid.
------
- **I95-45063 SSR azure instances unstable on large machine types:** Resolved an unpgrade issue causing instability in Azure instances using Mellanox5. 
------
- **I95-45113 snmp override of the IfTable:** An issue with SNMP reporting has been resolved.
------
- **I95-45123 CVE Issue:** The latest Security vulnerabilities have been identified and addressed.
------
- **I95-45124 RBAC Config Endpoints Leaking Information:** Resolved an issue where some configuration endpoints would allow users with incorrect permissions make requests.
------
- **I95-45146 GUI error message for users authenticated by LDAP to Active Directory Server:** This issue has been resolved.
------
- **I95-45162 Improve download/upgrade error message if a router name does not exist:** In situations where a router does not exist, the download and upgrade message now indicates that the router does not exist.
------
- **I95-45211 New users run into permissions errors:** Access Control Lists are now preserved on file rotations.
------
- **I95-45220 Conductor local forwarding parameters not dynamic:** Resolved an issue when transitioning a conductor from standalone to HA the managed routers were not automatically connecting to the newly added conductor node.
------
- **I95-45268 Third-party-drivers rpm install hung:** Resolved an issue where the installation hangs when running a post-install scriptlet. The script is not necessary at that stage and has been disabled.
------
- **I95-45348 Update salt master and minion to 3002.8:** This update resolves several CVE and requires that the conductor must be running this release containing these fixes **before** upgrading a router. 
**Important** Please see the Caveat below for additional important information about HA upgrades.
------
- **I95-45374 Router Dropping SIP traffic:** A warning is displayed if users configure a service-class to rate-limit but don't set max-flow-burst/max-flow-rate values (default is set to 0).
------
- **I95-45541 LDAP users are unable to login to the PCLI due to permission errors:** This issue has been resolved.
------
- **I95-45559 Corrupted resolv.conf after ODM imaging:** Resolved an issue on SSR systems running dns-proxy services with external interfaces configured using PEERDNS=yes, where a race condition may occur that results in corrupt nameservers being added to the /etc/resolv.conf file.
------
- **I95-45583 HA Connection lost during commit:** Resolved an issue where  session was missing necessary path data information relating to the peer path.
------
- **I95-45618 MAC address issue in Azure environment:** Non-ethernet MAC addresses are now handled correctly during MLX device discovery.
------
- **I95-45641 Stuck BGPoSVR Sessions after Failover:** Made changes to provide updates to less specific FIB entries when routes are updated to resolve this issue.
------
- **I95-45643 User created users missing after upgrade:** Resolved an issue where the XML values true/false are also handled as 1/0.
------
- **I95-45696 Memory leak in pam challenge library:** Resolved a memory leak in the PAM challenge library. 
------
- **I95-45779 LDAP user login blocked during HA upgrade:** Resolved an issue where the LDAP user login was blocked until the upgrade was complete on both HA conductors.
------
- **I95-45761 SSH ClientAliveInterval change:** The SSH `ClientAliveInterval` has been reset to 900.
------
- **I95-45783 User home directories different across the topology during upgrade:** Resolved an issue with incorrect LDAP user roles during upgrade.
------
- **I95-45816 "TCP State Stream Parse Error" filling up the flpp.log:** This log issue has been addressed. 

## Caveats

- **I95-45348: Update salt master and minion to 3002.8:** When upgrading an HA pair to version 5.6.0, please be aware of the following: While updating the conductors in an HA pair, the upgraded conductor node asset state will remain DISCONNECTED if the active `automatedProvisioner` is not running a corrected version. When performing an HA conductor upgrade the node running the oldest software assumes leadership. However, the older version will not be able to talk to the new software on the upgraded conductor. 

The active `automatedProvisioner` can be determined by running the command `show system processes`. Once the upgrade begins on the old node, the newly upgraded conductor takes over.

#### Corrected Versions

| Router Software Version | Minimum Required Conductor Version |
| --- | --- |
| 5.6.0 | 5.6.0 or later |

