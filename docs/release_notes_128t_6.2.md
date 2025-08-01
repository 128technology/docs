---
title: SSR 6.2 Release Notes
sidebar_label: '6.2'
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

- **I95-43243/IN-460 Upgrade and Rollback:** Upgrading or rolling back a system (conductor peer or router) with the interactive installer `install128t`, that is managed by a conductor may result in the system becoming unresponsive. It is recommended that upgrades be performed through the conductor UI. Manual upgrades and rollbacks may not be resilient to failures. See [Rolling Back Software](intro_rollback.md) for more information on these operations.
------
- **I95-42542 Conductor Upgrade Time:** Upgrades can take up to 40 minutes due to the number of rpms being upgraded. Please plan accordingly.
------
- **I95-42624 Upgrade Installer:** Before **upgrading to, or installing** version 5.4 and above, update the Installer to at least version 3.1.0. Failing to upgrade the installer may result in a rollback failure, should a rollback be necessary at any time. The Installer typically prompts you update when a new version is available. Select **Update** when prompted.
------
- **Plugin Upgrades:** If you are running with plugins, updates are required for some plugins **before** upgrading the conductor to SSR version 5.4.0 or higher. Please review the [Plugin Configuration Generation Changes](intro_upgrade_considerations.md#plugin-configuration-generation-changes) for additional information.

## Release 6.2.9-5-lts

**Release Date:** June 10, 2025

### Resoved Issues

- **The following CVEs have been identified and resolved in this release:** CVE-2024-24806, CVE-2023-26916, CVE-2024-56171, CVE-2025-24928, CVE-2024-11187, CVE-2024-1737, CVE-2024-1975, CVE-2024-3596, CVE-2024-37370, CVE-2024-37371, CVE-2025-24528, CVE-2023-46846, CVE-2024-45802, CVE-2024-12085, CVE-2025-27363.
------
- **I95-56557 `show service` command not displaying URL:** Resolved an issue where even after adding a URL to the service, the URL was not showing in the output of the `show service` command. This has been resolved. 
------
- **I95-57265 Highway crash when generating TSI on Azure instance:** An Azure instance can crash while accessing an uninitialized RX queue. This invalid access has been prevented and the issue resolved.
-------
- **I95-57508 Traffic from node1 LAN to node1 WAN does not show on graph:** When an HA interface becomes non-redundant (reconfigured as non-HA), state updates were not showing on the active-interface path. This led to the icmp-probe-manager not running. This issue has been resolved.
------
- **I95-57584 IGMP ingress packets not being accepted after defining tenant prefixes on LAN subnet:** Resolved an issue when using `tenant-prefix` on the interface, all PIM/IGMP messages were blocked. This issue has been resolved. In addition, the ability to only allow igmp messages sent from specifc source-addresses has been added. For more information, see [`source-address-prefix-list`](config_command_guide.md#configure-authority-router-routing-igmp-interface-source-address-prefix-list)
------
- **I95-58017 FIB entries on `show fib` not available for all headends:** Resolved an issue with `show fib` stalling and not returning complete data. 
------
- **I95-58999 CPU usage for Packet Processing CPU always reads 100%:** Resolved an issue where the size of the packet transmit burst was reported, rather than the actual number transmitted when `transmit-on-standby` fails. The correct information is now provided.
------
- **I95-59676 Alarm when default passwords are not changed:** An alarm has been added to detect when default password hashes are detected for standard system users. It is highly recommended that all system user passwords be updated to a secure password as soon as possible.
------
- **I95-59745 Routers are stuck in the connected state and not transitioning to running:** Resolved an issue where the router repeatedly sent the same incorrect values to the config during startup, resulting in a race condition. 
------
- **I95-59758 Prompt for password change:** The user is now prompted to change the `admin`, `t128`, and `root` passwords during installation. The password is changed to the same value for all three users. 
------
- **I95-60038 `show fib` lookup fails for IPv6 addresses:** Parsing IPv6 addresses was not performed properly, resulting in an invalid query. The code has been updated to properly parse the request before processing.
------
- **I95-60180 Installation screen displays incorrect SSR OS:** After the OS rebranding to SSR OS, the option to install erroneously shows on the install screen. This has been removed. 
------
- **I95-60282 Disk space usage growing to more than 90%:** DNF logs were increasing in size and not being rotated, causing a significant increase in size. A `logrotate` configuration file for DNF has been added to limit the size of DNF log files to prevent them from filling the hard drive. When this fix is installed on the conductor, it is automatically propogated to all managed routers. 
------
- **I95-60287 Add option to disable Kernel Metric SLA Calculation:** In rare cases on a heavily loaded system, the kernel metric calculation process can sometimes hang for a period of time, causing an internal watchdog to fire. This results in a system restart. Setting the `service-metric-use-lsa` (under the `routing default-instance`) to `false` will prevent the kernel flap that causes this issue. See [`service-metric-use-lsa`](config_command_guide.md#configure-authority-router-routing-service-metric-use-sla) for addtional information.
------
- **I95-60321 DHCP relay service not honoring configuration change for the addition of a new subtenant:** Resolved an issue where new subtenants were not inheriting server mapping from the parent tenant. 
------
- **I95-60471 Add the ability to configure the RP address of MSDP SA packets:** The `router-id` command has been added to provide a method to configure a general routing `router-id`. When sending an MSDP SA message, the configured `router-id` will be used as the **RP Address** field. For example, `config authority router hub1 routing default-instance router-id 10.10.110.10`.
------
- **I95-60505 Download in progress message not clearing after software download complete:** Resolved an issue where the GUI would display that a download was still in progress even though the download had completed.
------
- **I95-60507 URL Filter blocking networks not on Block List:** Resolved an issue where SVR traffic was treated as an AppId session. The SVR traffic is now handled correctly, preventing inadvertent TCP resets and AppId deny events.
------
- **I95-60647 Migrate command not forcing a router re-sync:** Resolved an issue where a router is successfully migrated from one conductor to another conductor and establishes connectivity, but does not apply the configuration from the new conductor until a commit is performed.
------
- **I95-60688 Password change upon first login throws error message:** Resolved an issue that prevented users from changing their password on the secondary node of an HA pair. This would happen with both an expired password, or upon first login. 
------
- **I95-60741 KNI no longer passes traffic when it is operationally down, preventing IPSec from functioning:** Resolved an issue with the KNI interface that prevented transmit-through even when the interface is operationally down.
------
- **I95-60765 Application module does not clear previous entries:** Resolved an issue where if a module has services configured, using the REST API to send the clear command to delete those services from the module does not work. The list may appear empty, but the services still persist on the module. This issue has been resolved and the services list is now cleared properly. 
------
- **I95-60948 RADIUS secret length limited to 16 characters:** The RADIUS secret size was erroneously set to 16 octets. The allowable RADIUS secret size has been updated from 1 to 255.
------
- **I95-60960 After reboot, the PIM RP IP address moves to a VRF:** Resolved an issue where after reboot the PIM RP IP moves to a VRF, leaving the base instance without a PIM RP IP address. The VRF is now explicitly added to the config, preventing this issue. 
------
- **I95-61085 Highway crash after incorrectly adding an IP address for a Multicast service:** Resovled an issue where a packet reached the router and matched a FIB without a service association, i.e. a FIB created for multicast traffic. The SSR will now drop a packet for a summary service if it matches a FIB without an associated service. 
------
- **I95-61093 Router first time synchronization :** Resolved an issue where a minion is restarted multiple times during the first connection to the conductor, resulting an extended wait time before synchronization.
------
- **I95-61201 Renaming VRF on an active VRF stream causes a coredump:** Resolved a race condition during configuration processing while active traffic uses the same VRF, causing a coredump.

## Release 6.2.8-10-lts

**Release Date:** January 30, 2025

### Resoved Issues

- **The following CVEs have been identified and resolved in this release:** CVE-2021-27290, CVE-2022-24999.
------
- **I95-54366 Unable to assign an SNMP view name via the GUI:** Resolved an issue that prevented configuring SNMP (v3) Access Policy View in the GUI.
------
- **I95-56259, I95-56260, I95-57029 Failed to bring up KNI and management interfaces after upgrade:** The dynamic allocation of packet processing resources per interface is based on number of packet forwarding cores and the number of interfaces; the algorithm has been refined to adapt to both the largest and smallest platforms supported by SSR software. 
------
- **I95-56665 Unable to change the default security policy for PIM:** The security and service policies for PIM and MSDP services can now be configured using `bgp-service-generation`.
------
- **I95-57128 Inter-VLAN traffic slow:** Identified an issue where devices controlled by the i40e driver (x710, x722) were incurring 8ms latency due to incorrectly setting a device throttling register to a MAX of 8ms. This has been reduced to 32us to resolve the issue.
------
- **I95-57145 Unable to change the default security policy for MSDP:** The configured security policy for MSDP SVR generated services can now be changed using `bgp-service-generation`.
------
- **I95-57305 Add flow timeout value to Associated Paths:** The Associated Paths window accessed from the Session view of the SSR GUI now displays a Flow Timeout column, providing a way to determine when the session will expire following inactivity. 
------
- **I95-57730 Peer Service Next Hops Not Reloaded After Provisional Status Change:** Resolved an issue where a `bgp-over-svr service-route` does not failback to primary node on a `provisional-status` change.
------
- **I95-58264 EoSVR session breaks after upgrading:** Resolved an issue where a high number of STEP route updates carried in an FPM message disconnected the Routing manager to agent connection. This has been resolved by limiting the max number of STEP paths in a single STEP route.
------
- **I95-58332 `show service-path` incorrectly shows the state as `up` in an unreachable next-hop:** In a config where a `service-route next-hop` is pointing to an unreachable address, the show service-path shows the state is being up. This has been resolved by adding a next-hop reachability check to `show service-path`.
------
- **I95-58427 Capture SNMP configuration in TSI:** SNMP logs and stats are now captured in the TSI, allowing the inspection of the output for troubleshooting.
------
- **I95-58428 DSCP Steering Collision on Flow Move, resulting in traffic drops:** When traffic is traversing an IPSec connection and the DSCP steering feature is enabled, upon a flow-move DSCP 0 traffic would collide with the pre-existing tunnel session. This issue has been resolved; the DSCP 0 packet is no longer dropped, and traffic is treated correctly.
------
- **I95-58444 DSCP steering is not correctly using revertible-failover:** Resolved an issue where DSCP Steering on child services were not using learned peer routes from the parent service. DSCP steering child services now properly utilize revertible-failover resiliency policies.
------
- **I95-58528 SSR OS renaming:** The SSR OS version has been updated from "CentOS" to "Oracle Linux" to accurately reflect its upstream Linux distribution. All internal naming has been updated.
------
- **I95-58539 The `validate` command does not check or test for router `applies-to` config:**  Resolved an issue whereby the DHCP relay inspector rule was not honoring router-based services for interfaces without DHCP relay. Errors from this rule are now warnings.
------
- **I95-58569 OSPF Graceful Restart link missing from GUI:** Resolved an issue that prevented the link to the Graceful Restart page from displaying. 
------
- **I95-58583 Bypass message-authentication in RADIUS:** An option to bypass the requirement for the Message-Authenticator check in RADIUS requests and responses has been added. Disabling this check is considered unsafe and will allow for vulnerabilities to be exploited for users authenticating. Disabling this check is NOT recommended, but may be necessary for some backwards compatiblity scenarios. 
------
- **I95-58637 Relax API RBAC policies for quickstart files:** Users with config-read permissions are now able to generate quickstart files.
------
- **I95-58722 Update allowed Key Exchange Algorithms to add better support for Gov Cloud environments:** Expand the list of supported Key Exchange Algorithms in both FIPS and non-FIPS mode.
------
- **I95-58745 Multicast receiver could not join the multicast group:** When sending a protocol control message to an SVR peer, choosing an interface with a vlan confused the internal logic and caused forwarding issues. This issue has been resolved by only selecting a well-known internal interface as the source interface.
------
- **I95-58763 Provide a way to correlate running config to log entries:** The output of the `show events type admin.running_config_change detail` command has been added to the TSI output. This provides visibility into the last 25 config changes. 
------
- **I95-58797 DHCP stopped working:** Resolved an issue where multiple redundant VLAN interfaces with a DHCP server configured would not recover after a highway crash, until manually restarted. 
------
- **I95-58881 Multicast forwarding to spoke without any PIM signaling present:** This issue has been resolved; the routing engine now correctly removes the SVR OIF.
------
- **I95-58885 Add `identifier` to option to ping command:** The `ping` action now allows you to set a custom identifier.
------
- **I95-59130 `save tech-support-info since 1d`:** The default action of the `save tech-support-info since 1d` command or the **Save TSI** button in the GUI now includes at least one log file from each application, even if the file is outdated based on the since flag.
------
- **I95-59131 Next Hops not updated properly when OSPF is used:** Resolved a race condition found in OSPF and the end of FIB update message.
------
- **I95-59146 BGP confederation member-as not dynamically reconfigurable:** Resolved an issue where modifications to `bgp confederation member-as` were not comparing and validating the changes correctly. 
------
- **I95-59264 BGP community data model regex incorrect:** Resolved an issue with the validation pattern in the routing policy for extended communities. 
------
- **I95-59367 Race condition during configuration change, resulting in highway crash:** Resolved a race condition between configuration processing and packet processing, which led to invalid memory access and resulted in a highway crash.
------
- **I95-59431 MTU mismatch on PPPoE interfaces:** Resolved an issue where the namespace target KNI resource incorrectly sets target-interface MTU based on network-interface maximum MTU. This issue was encountered with restarts of the 128T service.
------
- **I95-59477 Race condition can lead to highway crash on HA node when application identification is enabled:** Resolved an issue in dual node High Availability configurations, highway crashes happen when `node1` does not successfully classify during the TCP handshake, but `node2` does successfully classify. See I95-59563, I95-59618 below for additional information.
------
- **I95-59478 Recover PPPoE after highway crash:** Updated the PPPoE re-init script to resolve an issue where, after a highway crash, the PPPoE NSID becomes invalid and causes the device status to stay `down` even if the monitoring script reports `up`.
------
- **I95-59537, I95-59551 Apply `ingress-source-nat-pool` to local breakout sessions:** Resolved an issue where `ingress-source-nat-pool`  was only applied to SVR sessions. The `ingress-source-nat-pool` has been updated with the `applies-to-local-breakout` flag.
------
- **I95-59563, I95-59618 SSR crashing, downing interfaces and causing peer path flap:** Resolved an issue with mismatched App-ID classification between nodes of an HA pair. An IP-Port-Protocol application classification is now only performed for new sessions on the ingress node, instead of every node / router.
------
- **I95-59634 Allow Highway lockup detection to be disabled:** Added a `local.init` override for disabling datapath lockup detector mechanism
```
  "datapath": {
    "lockupDetectionEnabled": true/false
  },
```
------
- **I95-59745 Routers are stuck in the connected state:** Resolved an issue where the router would unnecessarily write to `yum.dnf` and `dnf.conf`, resulting in a race condition.
------
- **I95-59813 The `unrelease mist agent` command fails:** Resolved an issue that caused the `unrelease mist agent` command to fail when run from a conductor against a router. 

## Release 6.2.7-4-sts

**Release Date:** October 3, 2024

### Resoved Issues

- **The following CVE's have been identified and addressed in this release:** CVE-2024-21131, CVE-2024-21138, CVE-2024-21140, CVE-2024-21144, CVE-2024-21145, CVE-2024-21147, CVE-2024-5564.
------
- **I95-53274 PIM scaling above 1500 multicast routes:** Resolved an issue where the SSR could not maintain more than 1400 active sessions.  
------
- **I95-57538 WayPoint exception - failing to allocate waypoint ports on mesh peer re-establishment:** Resolved an issue where a configuration change may cause existing waypoint ports to become invalidated, creating an exhaustion scenario.
------
- **I95-57667 / I95-57912 Traffic Engineering traffic throughput improvements:** Internal improvements have been made to optimize the throughput of traffic when traffic engineering is configured. 
------
- **I95-58201 Increase AMD performance:** Throughput performance on AMD processors has been improved through the tuning of some kernel parameters. 

## Release 6.2.6-15-sts

**Release Date:** September 6, 2024

### New Features

- **I95-56894 OSPF Graceful Restart:** Support for OSPF graceful restart has been added. For a feature description and configuration information, see [OSPF Graceful Restart](config_ospf.md#ospf-graceful-restart). For command details, see [`ospf graceful-restart`](config_command_guide.md#configure-authority-router-routing-ospf-graceful-restart).
------
- **I95-56337 / I95-56339 / I95-56341 REST API changes to better support BGP endpoints:** Updated BGP REST endpoints for better functionality, by adding pagination support to summary commands and altering json schema to use arrays where necessary to preserve ordering. Added `show bgp family-summary` to condense address-family information per peer into one entry.

### Resoved Issues

- **The following CVE's have been identified and addressed in this release:** CVE-2024-21011, CVE-2024-21012, CVE-2024-21068, CVE-2024-21085, CVE-2024-21094, CVE-2019-13631, CVE-2019-15505, CVE-2019-25162, CVE-2020-25656, CVE-2020-36777, CVE-2021-3753, CVE-2021-4204, CVE-2021-46934, CVE-2021-47013, CVE-2021-47055, CVE-2021-47118, CVE-2021-47153, CVE-2021-47171, CVE-2021-47185, CVE-2022-0500, CVE-2022-23222, CVE-2022-3565, CVE-2022-45934, CVE-2022-48627, CVE-2022-48669, CVE-2023-1513, CVE-2023-24023, CVE-2023-25775, CVE-2023-28464, CVE-2023-31083, CVE-2023-3567, CVE-2023-37453, CVE-2023-38409, CVE-2023-39189, CVE-2023-39192, CVE-2023-39193, CVE-2023-39194, CVE-2023-39198, CVE-2023-4133, CVE-2023-4244, CVE-2023-42754, CVE-2023-42755, CVE-2023-45863, CVE-2023-51779, CVE-2023-51780, CVE-2023-52340, CVE-2023-52434, CVE-2023-52439, CVE-2023-52445, CVE-2023-52448, CVE-2023-52477, CVE-2023-52489, CVE-2023-52513, CVE-2023-52520, CVE-2023-52528, CVE-2023-52565, CVE-2023-52574, CVE-2023-52578, CVE-2023-52580, CVE-2023-52581, CVE-2023-52594, CVE-2023-52595, CVE-2023-52598, CVE-2023-52606, CVE-2023-52607, CVE-2023-52610, CVE-2023-52620, CVE-2023-6121, CVE-2023-6176, CVE-2023-6240, CVE-2023-6622, CVE-2023-6915, CVE-2023-6932, CVE-2024-0340, CVE-2024-0841, CVE-2024-23307, CVE-2024-25742, CVE-2024-25743, CVE-2024-25744, CVE-2024-26593, CVE-2024-26602, CVE-2024-26603, CVE-2024-26609, CVE-2024-26610, CVE-2024-26615, CVE-2024-26642, CVE-2024-26643, CVE-2024-26659, CVE-2024-26664, CVE-2024-26671, CVE-2024-26693, CVE-2024-26694, CVE-2024-26743, CVE-2024-26744, CVE-2024-26779, CVE-2024-26872, CVE-2024-26892, CVE-2024-26897, CVE-2024-26901, CVE-2024-26919, CVE-2024-26933, CVE-2024-26934, CVE-2024-26964, CVE-2024-26973, CVE-2024-26993, CVE-2024-27014, CVE-2024-27048, CVE-2024-2705, CVE-2024-27056, CVE-2024-27059, CVE-2024-2961, CVE-2024-33599, CVE-2024-33600, CVE-2024-33601, CVE-2024-33602, CVE-2024-32487, CVE-2023-4408, CVE-2023-50387, CVE-2023-50868, CVE-2023-4408, CVE-2023-50387, CVE-2023-50868, CVE-2024-3596.
------
- **I95-47195, I95-47196, I95-49015, I95-49018, I95-49599, I95-56682 Forwarding plane crash, causing stranded network namespaces when LTE/PPPoE network-interface name is changed:** Implemented reinit script to reiniatilize namespace, KNI and target-interface after a configuration change in the network-interface.
------
- **I95-49218 Filter OSPF routes using RIB Policy routes:** Use the `configure authority router routing rib-policy` command from either the routing default-instance (`configure authority router routing`) or inside `configure authority router routing vrf` to provide addtional filtering for OSPF routes. For more information see [`configure authority router routing rib-policy`](config_command_guide.md#configure-authority-router-routing-rib-policy) and [`configure authority router routing vrf rib-policy`](config_command_guide.md#configure-authority-router-routing-vrf-rib-policy).
------
- **I95-49712 Configuration validation error uniformative:** Resolved an issue that when configuring an SSR, invalid configuration parameters were returning errors that were not specific enough to allow the user to locate the invalid configuration. Now when invalid configuration elements are identified during validation, the messages include relevant information for the invalid element, such as an IP address, node name, router name, interface names, etc.
------
- **I95-55725 Highway crashes when peer-path routers are removed:** Resolved a race condition that could cause a crash in the highway worker-core packet-processor if peer routers are removed from the configuration.
------
- **I95-55965 IDP engine not starting due to invalid environmental conditions:**  In cases where the IDP engine does not shut down cleanly, the IDP engine will fail to restart. These conditions are now detected and handled correctly.
------
- **I95-56013 Automatically created Conductor user accounts show as "LDAP":** Resolved an issue with user authentication where accounts were listed as `LDAP` rather than `Remote`.
------
- **I95-56233 / I95-56546 Relay routers in AWS unresponsive, showing device errors:** Resolved an issue where ENA devices in some environments have shown command queue failures and are no longer able to retrieve device stats, or pass traffic. The device is now reinitialized when the driver watchdog issues a reset event.
------
- **I95-56236 Quick Start config validation failures not being reported:** Made changes to the initialization process such that quick start errors can be reported.
------
- **I95-56345 Multiple reboots of the same node of a dual node router causes the multicast stream to stop:** Resolved an issue where multiple reboots of an HA node did not allow traffic to pass. Now in this scenario an exception is thrown, which allows the session to rebuild once the internode link comes up. 
------
- **I95-56492 Sessions configured for outbound-only with nat-keep-alive enabled experience reverse flow packet drops after flow migration:** A flow move from an inter-router (WAN) peer path to an inter-node (fabric) peer path causes repeated session modifies on the hub side causing reverse traffic packet drops due to NAT keepalives incorrectly testing the failed WAN path for the migrated session. This issue has been resolved.
------
- **I95-56527 Failure to validate and commit config; system incorrectly expected escape sequence:** Resolved an issue where capture-filter expected an escape sequence for input when it was not necessary. 
------
- **I95-56702 O365/Sharepoint application missing from the Applications list:** Resolved an issue where certain applications and protocols were excluded from automatic updates.
------
- **I95-56727 Domain names that begin with numbers are not allowed to be configured:** Warnings are no longer generated for domain-name elements of service configurations which have labels beginning with a number, for example `123.abc.com`.
------
- **I95-56822 Router stuck in a continuous upgrade/failure state:** DNS name servers changes on the conductor are not honored. In cases where the DNS configuration changed post boot, the conductor software proxy would not reload the config. In this scenario the proxied router software requests would use an out of date DNS configuration for the proxied requests, resulting in failure. 
------
- **I95-56827 NTP Auth key only permits keys of 20 or 40 characters:** Loosened restrictions on NTP server key length to allow plaintext keys. 
------
- **I95-56843 Error logs filled with irrelevant KNI network script info:** The log output has been reduced to provide related information.
------
- **I95-56847 lte / pppoe default-route check incorrectly reporting warnings:** Resolved an issue where warnings were incorrectly shown on the conductor for interfaces without `default-route` or `management-vector` configured.
------
- **I95-56850 Overlap warning on router not present on conductor:** Resolved a case where a service on a router is configured with `applies-to`, and the same service is configured on the conductor (overlap) but does not have `applies-to` configured, the validation process will generate a warning on the router but not the conductor. 
------
- **I95-56879 PPPoE stopped working:** Resolved an issue where the system configuration for the PPPoE interface was missing `LCP_FAILURE` and `LCP_INTERVAL` fileds. These fields are now set correctly.
------
- **I95-56905 Conserve memory footprint on the router:** If the SSR configuration does not have `application-identification mode all`, then do not load the database. This will save memory on the router. 
------
- **I95-56939 Multicast stream temporarily stopping when changing vectors:** Resolved an issue when an S,G inherited an outgoing interface inherited from a `*,G` entry, sometimes this interface would not be correctly removed from the outgoing list after being removed from the `*,G` entry. This resulted in unnecessary forwarding out this interface. The "Inherited" interface is now correctly removed from the S,G mroute entries.
------
- **I95-56973 Child services do not inherit the service-path configurations from the parent service:** Resolved an issue where child service routes for peers were not inheriting vectors and the `enable-failover` field. 
------
- **I95-57000 Hub crash while generating TSI:** Protection has been added to prevent unmapped memory access during packet buffer location walk.
------
- **I95-57017 Application ID failed to block some domains:** Resolved an issue where DPI failed to identify the domain-name from SNI if the `client-hello` is split up into multiple TCP packet segments.
------
- **I95-57028 IDP core files consume disk space:** In cases where large amounts of files are stored on disk, the files will be managed/deleted based upon the folder size. 
------
- **I95-57071 Changing router context in session debug does not update correctly:** Resolved an issue where a missing dependency was not initiating a re-render of the output using the correct router name. 
------
- **I95-57082 Unable to delete a capture-filter that contains a forward slash (/):** This issue has been resolved. 
------
- **I95-57099 Race condition causing crash in highway process when peer path timers expire:** Resolved an issue with handling BFD timers in multi-threaded environments.
------
- **I95-57110 Crash seen during add and delete peers while sending traffic:** A race condition has been fixed that could cause a crash in the packet-processing highway process if a peer-path is removed from configuration.
------
- **I95-57114 Unable to upgrade AWS Conductor:** Resolved an issue where an incorrect package version was installed, triggering a downgrade and preventing the upgrade.
------
- **I95-57205 Race condition on startup with DHCP configured on LTE or PPPoE interface, causing system to crash:** This issue has been resolved.
------
- **I95-57272 Multicast stream unexpectedly stops when adjacent hub is restarted:** Resolved an issue when the sending SVR peer changes for multicast, the receiving router was not updating the stored sending peer correctly. As a result, the receiving SVR router discarded the traffic due to RPF mismatch. The sending SVR peer is now updated correctly from the metadata.
------
- **I95-57283 Unable to perform SNMP discovery:** Resolved an issue where alarms in the `SERVICE`, `BGP_NEIGHBOR`, or `MSDP_NEIGHBOR` category would cause the SNMP server to crash and fail to send messages.
------
- **I95-57337 Updates during Application ID reload/refresh:** Updated the processes involved in application reload.
------
- **I95-57421 Viewing BGP Neighbors in GUI returns errors:** Resolved an issue with the display of BGP neighbor information in the GUI, where the options were too broad. BGP neighbors now have a selection field for ipv4 or ipv6, as well as a `neighbor` field.
------
- **I95-57538 WayPoint exception - failing to allocate waypoint ports on mesh peer re-establishment:** Resolved an issue where a configuration change may cause existing waypoint ports to become invalidated, creating an exhaustion scenario.
------
- **I95-57578 Candidate configuration values not showing in GUI:** Resolved an issue that caused configuration drop-downs in the GUI for tenants and services to only display values from the running configuration, not the candidate configuration.
------
- **I95-57580 Provide drop down list in UI for Session Record Profile:** There is now a Session Records Profile drop down list in the GUI.
------
- **I95-57592 Password expiration not enforced on the GUI:** Resolved an issue that caused password and account expiration to not work properly when logging into the GUI.
------
- **I95-57593 No option to require password change on first login:** Added a **Require Password Change On First Login** checkbox to the **Create User** dialog. Previously this feature was only available in the `create-user` command.
------
- **I95-57599 Duplicate password entries causing login issues:** After an upgrade, `/etc/passwd.radius` showed multiple duplicate entries. This has been resolved by forcing a restart of an internal program during the reboot as part of an upgrade. 
------
- **I95-57607 Saving TSI as root from the conductor generates oversized file:** Added and enforcement  that when calling `/usr/bin/save-tech-support-info` the `--output` argument always ends in .`zip`.
------
- **I95-57692 SSR120/SSR130 Upgrade issues when upgrading from version 6.2.5:** Resolved an issue where if the `128T` process is running and memory usage increases during upgrade, the upgrade will fail due to running out of memory.
------
- **I95-57712 DSCP steering issue with outbound traffic:** Resolved an issue with processing reverse pinhole packets when DSCP steering is enabled. 
------
- **I95-57853 OTP ISO does not have DHCP server enabled:** Identified and resolved a breaking change with how `logging` is configured. This prevented the DHCP server instance from starting successfully. The default configuration for the DHCP server running in the OTP ISO has been corrected, allowing the server to be started correctly.

## Release 6.2.5-5r2

**Release Date:** June 6, 2024

### Resoved Issues

- **The following CVEs have been resolved in this release:** CVE-2024-2973, CVE-2023-20569, CVE-2023-48795, CVE-2023-2176, CVE-2023-40283, CVE-2023-4623, CVE-2024-22019, CVE-2023-46724, CVE-2023-46728, CVE-2023-49285, CVE-2023-49286, CVE-2023-50269, CVE-2024-25617.
------
- **I95-52251 Router's conductor-address did not update the salt created services with the new addresses:** The router override for conductor addresses is now used in the software update info. This causes the router override value to properly trigger highstate and the salt created services to use the new conductor addresses.
------
- **I95-53619 Anomaly in Maintenance Mode reporting:** Resolved an issue where BGP alarms were not automatically shelved when routers are put into maintenance mode. `BGP peer path is down` alarms are now shelved properly on routers in maintenance mode.
------
- **I95-54918 Highway process crashed on the active node of a router:** Resolved a crash caused by a race condition when the last instance of a capture filter referencing a particular file-name is removed while a packet is in the process of being captured. 
------
- **I95-55226 Validation incorrectly allows a network interface to be used as both DHCP relay and server:** The validation process has been updated to include several checks against DHCP relays, clients, servers, and access-policies. 
------
- **I95-55550 node0 went down and did not fail over to node1:** Multiple disk errors caused corruption on the `128T_root` filesystem causing it to enter `read-only` mode and becoming non-responsive. To resolve this issue, issues in the filesystem now result in kernel panic mode, launching a reboot and in HA systems, failover. Additionally, the filesystem check is run to check and repair the filesystem. 
------
- **I95-55603 HA router stuck in connected state due to runtime corruption issue:** Resolved an issue causing an unzip race condition with Python files. The packaging and installation process has been improved to prevent this issue.
------
- **I95-55764 Race condition and highway crash with DHCP devices:** Resolved a race condition that caused a highway crash when the DHCP client is configured for LTE or PPPoE, and the respective link flaps prior to the lease being assigned.
------
- **I95-55768 BGP Routes are not propagated after HUB reboot when Hub to Hub Mesh is enabled:** Resolved a race condition in the BGP graceful restart code that caused a router to sometimes not forward BGP routes learned via route leaking.
------
- **I95-55775 Race condition exposed by service-area multithreading:** We now prevent a crash due to a race condition in the processing of session collisions when session-processing multithreading is enabled.
------
- **I95-55912 Validate Patterns for Service Domains and URLs:** The `url` and `domain-name` fields on a service were an unformatted string. This allowed you to configure fields that would be silently discarded. The `domain-name` and `url` fields within services are now validated for correctness and viability from an App-ID perspective. Anything to be ignored during validation now triggers a config warning.
------
- **I95-55949 Silicom Valencia Atom C1130 CPU flags are not properly detected:** Resolved an issue where the `cpuinfo` parser fails due to a collision between the processor key name and value - the Silicom Valencia model name in the `cpuinfo` contains the word `processor`. 
------
- **I95-55041 IP Database reload failure:** Resolved an issue where concurrent database reloads were causing a race condition and reload failures. The database reload will now only be run sequentially.
------
- **I95-56114 Inactivity timers not working correctly:** Resolved an issue with serial console inactivity timers. The inactivity timer enforces timeouts set for serial consoles by logging out users and closing the serial connection. The timeout is configured using `config authority router <name> system inactivity-timer <seconds>`.
------
- **I95-56127 Changes to KNI device driver increased CPU load per KNI device:** Added KNI module tuning, and excessive CPU usage by idle KNI devices has been alleviated.
------
- **I95-56203 The First Article Inspection (FAI) scan archive is empty:** Resolved an issue with `logrotate` clearing all the FAI scan archives. This was due to each archive having a unique name using a timestamp. A different service is now used to rotate the FAI scan files.
------
- **I95-56263 Add `show capacity`, and debugging commands to the TSI output:** Support for additional information in the TSI output has been added.
------
- **I95-56279 When a multicast route changes due to failover, SSR does not forward traffic:** Resolved an issue that when the incoming interface changes from one SVR interface to another, the multicast route is not updated correctly. As a result the new incoming traffic does not match the incoming interface and is dropped. The multicast route is now correctly updated when there is an SVR incoming interface change. 
------
- **I95-56292 Increase the length of SSH keys to 4096:** The size of the Salt and 128T SSH keys has been changed to 4096 bits for newly deployed systems.
------
- **I95-56317 Journal logs missing from Conductors running 6.2.3:** An issue related to a typo was creating zero byt files when downloading journal logs using the GUI.
------
- **I95-56326 Potential crash while collecting TSI:** Added protection against unmapped memory access to resolve an issue where, if a TSI is collected at just the wrong time, it can cause a highway crash.
------
- **I95-56363 Highway crash due to traffic metrics manager thread error:** A potential crash due to a race condition in per-service-route metrics has been fixed.
------
- **I95-56411 Remove outdated performance package:** Older versions of the `perf` package were not removed after a kernel upgrade as part of the software upgrade. The SSR upgrade process now removes older `perf` packages during the software upgrade proces.  
------
- **I95-56455 Zero-byte files when updating conductor hardware using an OTP image:** A check has been added to verify that `api.key` and `router-api.key` are non-zero length and valid. If not, the keys are regenerated.
------
- **I95-56475 HA-sync network interface shows warning after router upgrade:** Resolved an issue where non-forwarding interfaces would appear to be administratively down in the web UI when they were not.
------
- **I95-56507 I350 interface fails to come up when assigned in LAG:** Resolved an issue where configuring an LACP Bond using I350 bond members would fail to come up when more than 7 worker cores were assigned. The I350 is an 8 queue device. It reserves one core as a dedicated queue, and on systems with 8 or more queues it could not assign the dedicated queue, causing an init failure.
------
- **I95-56541 Include kernel journal entries in TSI:** A separate `kernel.log` journal file is now created in the TSI output.
------
- **I95-56575 Reduce polling rate of disk monitoring and add optimization:** The `ComponentDiskUtilizationMonitor` checks the disk usage too frequently and is inefficient. Reduced the frequency that disk usage is checked, and streamlined the process.
------
- **I95-56600 Add `show tenant members` to the TSI output:** `show tenant members` and additional network scripts have been added to the TSI output.
------
- **I95-56612 `fib-service-match any-match` missing some FIB entries:** Resolved an issue when a service-address was more specific than the last route update, a search for other less specific services was not performed. Now when the service address update is more specific, additional searches will continue. 
------
- **I95-56715 Address validation in migrate feature in conductor UI is not working correctly:** Resolved an isssue between the client and the server during the use of the GUI `migrate` operation, where the conductor address was not read correctly, and returning an irrelevant error message. 
------
- **I95-56726 `No Timeout Queue` message logged in cases where a config commit fails, or a conductor fails to load a config on startup:** Resolved an issue with `ThreadPoolWithExternalPoller` that resulted in a stack trace in the logs which starts with message `No TimeoutQueue:`.
------
- **I95-56837 When running `traceroute` after a conductor upgrade, the message `Error: failed to authorize user: you do not have access to resource='128t:*' capability='config-read'` appears:** This issue has been resolved by allowing traceroute access to the wildcard (`*`) resource.

## Release 6.2.4-14r2

**Release Date:** March 29, 2024

### New Features

- **I95-53878 New LACP protocol stats added:** LACP related counters are now available at a per-bond-member resolution. For more information, see [show stats interface received lacp](cli_stats_reference.md#show-stats-interface-received-lacp) or [show stats interface sent lacp](cli_stats_reference.md#show-stats-interface-sent-lacp). 
------
- **I95-53821 Radius Remote Authentication:** Radius Authentication supports the remote authentication of users created remotely, automatically adding them to the appropriate local user databases. This is especially helpful for large organizations that are geographically diverse. See [Configuring RADIUS](config_radius.md#configuring-radius) for more information.
------
- **I95-55672 MSDP Alarms for Peer State Change:** MSDP Alarms have been added for peer state change. For more information, see [`show msdp peer`](cli_reference.md#show-msdp-peer) 

### Resolved Issues

- **The following CVEs have been resolved in this release:**  CVE-2021-43975, CVE-2022-3594, CVE-2022-3640, CVE-2022-4744, CVE-2022-28388, CVE-2022-38457, CVE-2022-40133, CVE-2022-40982, CVE-2022-42895, CVE-2022-45869, CVE-2022-45887, CVE-2023-0458, CVE-2023-0590, CVE-2023-0597, CVE-2023-1073, CVE-2023-1074, CVE-2023-1075, CVE-2023-1079, CVE-2023-1118, CVE-2023-1206, CVE-2023-1252, CVE-2023-1382, CVE-2023-1855, CVE-2023-1989, CVE-2023-1998, CVE-2023-2513, CVE-2023-3141, CVE-2023-3161, CVE-2023-3212, CVE-2023-3268, CVE-2023-3609, CVE-2023-3611, CVE-2023-3772, CVE-2023-4128, CVE-2023-4132, CVE-2023-4155, CVE-2023-4206, CVE-2023-4207, CVE-2023-4208, CVE-2023-4732, CVE-2023-23455, CVE-2023-26545, CVE-2023-28328, CVE-2023-28772, CVE-2023-30456, CVE-2023-31084, CVE-2023-31436, CVE-2023-33203, CVE-2023-33951, CVE-2023-33952, CVE-2023-35823, CVE-2023-35824, CVE-2023-35825, CVE-2022-45884, CVE-2022-45886, CVE-2022-45919, CVE-2023-1192, CVE-2023-2163, CVE-2023-3812, CVE-2023-5178, CVE-2020-22218, CVE-2023-38406, CVE-2023-38407, CVE-2023-47234, CVE-2023-47235, CVE-2024-20918, CVE-2024-20919, CVE-2024-20921, CVE-2024-20926, CVE-2024-20945, CVE-2024-20952, CVE-2023-40217, CVE-2022-43552.
------
- **I95-50697 RFC1918 sessions (private IP addresses) are reclassified in error:** When a session destined for a private IP (RFC1918) experiences an App-ID modify, the session will now only be reclassified if the classification data reflects a positive classification change.
------
- **I95-51663 TCP port reuse causing session issues in session timeout management:** Resolved an issue where TCP client port reused caused backwards state transitions in TCP state tracking.
------
- **I95-51787 SNMP alarms generation is not FIPS compliant:** SNMP now uses the SHA1 algorithm to identify a specific instance of an alarm. After upgrading to this release, you will see different values for these instance IDs. These values are defined as "opaque" and are not guaranteed to be consistent from release to release. 
------
- **I95-52250 Security Package Update:**  Intrusion Detection and Prevention (IDP) signatures have been updated.
------
- **I95-52500 SVR multi-hop failover causes traffic to drop when using outbound-only:** Added a session lookup by session-ID to resolve a situation where sessions failing between multi-hop SVR and direct SVR connections may lead to duplicate flow exceptions and dropped traffic. 
------
- **I95-53216 Unable to change password for users managed through external user databases (such as LDAP or RADIUS):** Resolved an issue that caused a "Password Change" dialog to appear for remotely authenticated users.
------
- **I95-53523 LAG interface unbind errors following shutdown of the 128T service:** The order in which a LAG interface is broken down and cleaned up after shutdown has been optimized and errors resolved. 
------
- **I95-53565 Port state of LAG members not dynamically updated:** Resolved an issue where enabling or disabling a bond member port does not update the status until the 128T service is restarted. The adminisrative enable and disable now works as expected.
------
- **I95-53920 Password expiration incorrectly applied to users managed through external user databases (such as LDAP or RADIUS):** Resolved an issue that incorrectly enforced password expiration (`configure authority password-policy lifetime`) to RADIUS users.
------
- **I95-54127 Users managed through external user databases (such as LDAP or RADIUS) cannot generate or view TSI:** Resolved an issue that did not provide a home directory for custom roles, which prevented LDAP users from viewing the systemd journal.
------
- **I95-54189 Application classification mapping does not correctly match configured services:** Resolved an issue where DPI was misclassifying sessions due to IP overlap. When services use an IP address with different ports assigned to different services, the SSR now recognizes these different port configurations.
------
- **I95-54271 Race condition after a configuration change related to the source NAT:** Resolved a rare condition where the NAT pool was being reset while it was accessed for session setup. This caused a race condition that led to a highway process crash. 
------
- **I95-54340 Hub-to-spoke sessions fail during failover from outbound-only path:** When a session modify occurs due to an ingress change (inter-node -> inter-router) AND an egress change is also detected, the incorrect security was looked up for the old flow, causing an exception to be thrown and the modify to fail. This would present itself as dropped packets and in logs as a SecurityNotFound error. This issue has been resolved. 
------
- **I95-54440 / I95-50787 Rebooting the OS from the conductor throws error code 400:** Resolved an issue in the GUI with the reboot button on the Router page. When trying to reboot a router, the button would fail and display **Error: EOF**.
------
- **I95-54471 LAN-to-LAN traffic with Destination NAT without a gateway configured for either subnet results in dropped traffic and the error log: `ServiceAreaGatewayLookupFailed` exceptions:** When the egress interface has no gateway, the original packet dest IP was used for gateway lookup. Oftentimes, the original packet dest IP is off-subnet, but the matching `bidirectional-nat local-ip` is in-subnet. Applying dest NAT first and then looking up the gateway can avoid the `ServiceAreaGatewayLookupFailed` exception. 
------
- **I95-54512 Forming an HA cluster with an SSR 130 does not come up properly:** Resolved an issue where the generation of an improper configuration could lead to a crash loop in the NodeMonitor process.
------
- **I95-54726 Duplicate service-routes for IDP being created, resulting in a `nodeMonitor` crash:** Resolved an issue where duplicate routes were being created in `hub` mode because the service-name field was being used rather than the name field. This issue has been corrected.
------
- **I95-54750 Load Balancer API Calls not working:** The original API and Swagger documentation used `Load Balancer`, which was misleading. The `Reachability Detection` REST APIs have been updated to use `Reachability Detection` as reference, instead of `Load Balancer`.
------
- **I95-54780 Forwarding CPU utilization metrics missing for duration greater than 1 hour:** Updated the retention policy for forwarding CPU utilization and other metrics.
------
- **I95-54803 Control packets are treated with equal priority in overload conditions, causing drops:** Control packets now have preferential treatment, reducing the drop rate. 
------
- **I95-54808 Ingress VLAN tag getting stripped for vSSR with SR-IOV:** Added measures to prevent the vlan reinsert flag from being reset.
------
- **I95-54833 HA port is showing as redundant:** Resolved an issue where adding a device-interface back into the configuration after it was removed did not recreate the device-state. 
------
- **I95-54841 No service paths available on RP after all receivers leave the stream:** The PIM Register State would time out at the RP due to the First-Hop router (FHR) not correctly processing the PIM Packets to send the PIM Registers. The FHR now send the PIM Registers periodically to prevent the state from timing out.
------
- **I95-54867 SSR-1300 baud rate set incorrectly:** Resolved an issue where the incorrect baud rate was allowed. The only allowed baud rate for the SSR is now 115200. This is the default rate.
------
- **I95-54901 During source specific multicast, the FHR is displaying the Register Flag (F):** The display was incorrectly showing the register flag (F); PIM registers are not sent for SSM groups, so this flag should not be sent. The display issue causing this has been resolved.
------
- **I95-54909 Alarm not generated when Websense is down** Implemented an alarm when the connection to the Websense server is down or responds with a 5xx error. 
------
- **I95-54927 Receiver can join stream without any tenant assigned to interface:** This issue has been resolved by creating multicast boundaries in the routing engine to block all multicast addresses on interfaces that do not match the multicast service access-policy.
------
- **I95-55002 Password reset loop:** Resolved an issue that caused users created with the **Require password change on first login?** set to `yes` to get stuck in an infinite loop of password changes when logging in using the GUI.
------
- **I95-55060 PIM register messages don't need a tenant assigned to be sent over SVR:** This could potentially be disruptive to multicast services. PIM RP and LAN services have been made private. 
------
- **I95-55067 Unable to select specific Mist Cloud instance during onboarding:** This functionality has been added to the CLI using the `mist-instance` argument under the `adopt` command, and in the GUI when onboarding a router. 
------
- **I95-55069 One HA node is missing from the Mist GUI:** Resolved an issue where a managed router had an empty product version config metadata field, which resulted in the conductor version metadata field being cleared.
------
- **I95-55164 Dropping GRE encapsulated packets:** Classification support for Enhanced GRE Header, version 1, as defined by RFC 2637 Point-to-Point Tunneling Protocol (PPTP) has been added.
------
- **I95-55179 FIPS-enabled SSR Conductors not creating HA connection:** The SSH library used by the initializer was using md5 internally for key identification and logging purposes. Since md5 is not supported with FIPS, it raised an error. The SSH library has been upgraded to use a FIPS compliant key generator.
------
- **I95-55203 HA on the last hop router takes too long to failover:** During failover, the multicast state is relearned by the routing engine. Updates have been made to the Graceful Restart (GR) time for multicast to shorten the failover time. 
------
- **I95-55208 Asset fails to transition state:** In certain cases when the RPM database is corrupted or another process holds its lock indefinitely, the highstate can block forever running rpm -q. Since other highstate attempts see an existing highstate job, they don't try to do anything else and the asset stays stuck like that forever without manual intervention.
------
- **I95-55244 Unable to initialize DPDK; SSR does not start:** Resolved an issue with the way the initializer identified the amount of memory in the processor. The initializer is now more NUMA aware when sizing the number of hugepages on a system.
------
- **I95-55261 Config validation incorrectly being run on router:** Resolved an issue where the plugin validator was running on routers. Validate is now correctly run only on the conductor. 
------
- **I95-55270 DHCP server not coming up:** Resolved an issue where a network namespace was using a namespace ID that was not cleaned up properly after removal.
------
- **I95-55298 KNI interface is generating packets but are being dropped by the SSR:** In a case where a network interface can be configured with a /31 net mask, the SSR will exclude network-interface IP addresses that are point-to-point from source-ip broadcast filtering.
------
- **I95-55353 Error message `out-of-memory KNI254 management down`:** Resolved an issue on systems with a large number of packet forwarding cores, connectivity to the host interface was impaired due to buffer pool depletion. The buffer pool is now scaled to compensate for forwarding core count.
------
- **I95-55389 Queries for private domains with Websense classified as Miscellaneous:** Domains categorized by Websense as Uncategorized are now classified as Uncategorized/Uncategorized, rather than Miscellaneous/Uncategorized.
------
- **I95-55416 Dynamic reconfig of the PCI address of a bond member breaks connectivity:** Added an identifier to the LAG member, enabling the proper handling of the member whenever the PCI address is changed.
------
- **I95-55444 ICMP probe stats missing per service route:** Statistics were not available for ICMP probes that did not meet SLA per service route. These stats have been added.
------
- **I95-55454 Dropped packets incorrectly listed as a result of Firewall filter rule:** Firewall filter rules on the network interface can be configured to drop non-ip packets. The non-ip packets were incorrectly classified on the Dropped Packets page. This has been resolved and they are now displayed correctly.
------
- **I95-55467 Incorrect VLAN Tagging in Azure HCI Stack with Hyper-V Hypervisor:** When using VLANs on Azure HCI Stack with Hyper-V, bit shifting occurs resulting in incorrect VLAN tags. This has been resolved for **non-accelerated NICs** by updating the DPDK and adding handling for the VLAN tags on Azure HCI. However, this issue is still present when using accelerated mode with the Azure HCI Stack with Hyper-V. The current solution is to **not** use accelerated mode if configuring VLAN interfaces.
------
- **I95-55470 Allow the configuration of an `access-policy deny` when a `summary service` is allowed:** When utilizing `router > allow-summary-services true` (MIST deployments), a received SVR packet will now be dropped if the locally (FIB) matched service indicates an `access-policy deny` using the given tenant.
------
- **I95-55562 BGP aggregate on router and in Mist intent may cause rare race condition:** Resolved a rare edge case: If an aggregate (summary) is configured in BGP, (e.g., 10.0.0.0/8), and that same prefix also exists as a BGP route present in the network, a race condition may occur and the router with the aggregate configuration may not originate the aggregate.
------
- **I95-55578 Traceroute not stopping at the specified `destination-ip`:** Resolved an issue where traceroute would continue probing after a response from the endpoint, if a subsequent probe timed out. 
------
- **I95-55586 GraphQL API returns `IsActive` incorrectly if the `device-interface` is `vrrp_standby`:** The `router-peer-path` setting now returns the correct value when in `vrrp-standby`.
------
- **I95-55591 Some network interface stats are not updated:** Some network interface stats are not updated with the port name when a device interface is renamed. Device interface name changes are now handled correctly, and `network-interface` metrics are properly updated when `device-interface name` changes.
------
- **I95-55762 Unable to view more than 50 prefixes in BGP:** Updated the routing engine to display all rows for BGP show commands if a count parameter is not specified.
------
- **I95-55770 LLDP Information is not displaying properly in Mist:** LLDP packets are now properly received when only VLAN interfaces are configured on a device interface.
------
- **I95-55793 Stuck session not being sourceNAT-ed:** In some cases after an interface configuration change, a session was allowed to pass without a `source-NAT`, leading to stuck sessions. Resolved a race condition where `source-NAT` not being applied to a session that should have had `source-NAT-ports`, causing the stuck sessions. 
------
- **I95-55804 After node restart, stream is lost for approximately 2 minutes on HA router:** During restart the multicast state is relearned by the routing engine. To prevent data loss the routing engine now goes into a Graceful Restart. After the Graceful Restart (GR) all state information is programmed, limiting any traffic loss.
------
- **I95-55830 Rollback results in missing Admin user:** Resolved an issue where HA nodes running mixed versions of 5.6.0 or greater with versions less than 5.6.0, the admin user could be temporarily removed until both nodes were upgraded or rolled back to the same version.
------
- **I95-55850 Changing the name of a `bond-interface` fails:** Resolved an issue where changing the name of a `bond-interface`required a restart to take effect.
------
- **I95-55903 Memory alarm persists in LAG/HA/VRRP configuration:** The `Memory exceeded 90%` alarm appears and persists in an HA configuration due to multiple database connections being made and not released. These database connections are now properly released and memory use maintained at a reasonable level. 
------
- **I95-55904 No service-paths seen after upgrade:** Resolved an issue where adding services with overlapping address prefixes prevented the configuration from being applied.
------
- **WAN-2753 IDP Engine Failed to Start:** Resolved an issue that prevented IDP from starting if its configuration had changed. 

## Release 6.2.3-14r2

**Release Date:** December 15, 2023

### New Features

- **I95-28073 Support for OSPFv3:** Support for OSPF v3 routing protocol for IPv6 networks. See [OSPF](config_ospf.md) for additional information and command information.
------
- **I95-40184 SSR Device Configuration Templates:** For conductor-based deployments, fourteen individual templates (for SSR 1x00/SSR1x00 and Juniper certified device) are now provided to simplify configuration. Templates are available from the Templates menu in the GUI.
------
- **I95-46049 Peer Traceroute enhancements:** Additional support has been added to the traceroute command to provide more robust peer, service, and routed traceroute functionality. For more information, refer to [Traceroute](ts_traceroute.md).
------
- **I95-46120 HA Fabric Warning message supression in Azure:** In Azure, it is not possible to configure a non-forwarding fabric interface on the SSR, thus this error will be present on every commit. This message is now supressed.
------
- **I95-47041 Selection of Mist Cloud instance during whitebox onboarding:** The onboarding interface now silently queries all Mist Instances and provides a drop down selector to allow login to the appropriate Mist instance (Global01, Global03, EU, etc.).
------
- **I95-47253 Stuck Session Detection:** In situations where forward traffic is received, but there is no reverse traffic; for example, when the local IP of an interface performing source-nat changes, or when the local IP of an interface changes while sending traffic over SVR to a waypoint, the SSR will now mark the session for a flow-move with new reverse flow needed. If the criteria is met, the source-NAT or waypoint will be updated with the correct information on the next forward packet.
------
- **I95-51614 Firewall Protection Profile:** Several updates to existing functionality have been made to address firewall filtering. For additional information, see [Customizable Firewall Rules and Filters](sec_firewall_filtering.md). 
	* **Packet Filtering:** Packets can be filtered by any known packet field, and the order in which filters are applied can be set by the user. Filters are configured and applied on the receiving network-interface. 
	* **ICMP Filtering:** The SSR matches ICMP error packets with the sessions that generated them, and only accepts those ICMP packets when they match an existing session. Additionally, when configured, ICMP Echo Replies that arrive at the SSR are dropped if no corresponding request has been seen and the ICMP Aysnc Reply is set to drop.
	* **IPv4 Option Filtering:** The SSR has the ability to go deeper than the basic IPv4 header options check and inspect the options to make necessary decisions whether the packets are allowed or dropped and logged.
	* **Transport State Enforcement:** By default, the SSR checks and follows the TCP sequence numbers of all the sessions passing through, and increments the associated metrics. Setting the Transport State Enforcement field to Strict ensures any packets in the TCP stream that fall outside of the sequence number stream will be dropped.
	* **TCP Half-open Connection Limit:** Half-open TCP connections are those where the handshake has started but not completed. The SSR provides the ability to configure a limit to these half-open TCP connections.
------
- **I95-51648 Application ID Database Memory Improvements:** Internal improvements have been made to reduce memory consumption of the Application Identification IP database.
------
- **I95-52799 Display Lock Status/Failed Login Attempts in the PCLI and GUI:** Add a "Lock Status" column to the User table as well as the User Details pane, with more details availble on hover. The `show user` command now includes two new rows, "Lock Status" and "Last Failed Login". For command details, please see [`show user lock-status`](cli_reference.md#show-user-lock-status).
------
- **I95-53045 Increase default redundancy and capacity settings:** The default values have been adjusted for deployments with large configurations and potentially high latency between nodes. 
------
- **I95-53820 MD5 Authentication for MSDP:** An `auth` password option has been added to the [`msdp peer`](config_command_guide.md#configure-authority-router-routing-msdp-peer) and the [`msdp mesh-group`](config_command_guide.md#configure-authority-router-routing-msdp-mesh-group) configurations to support MD5 authentication. For more information, refer to the MSDP command documentation linked above. 

### Resolved Issues

- **The following CVEs have been resolved in this release:** CVE-2022-41974, CVE-2023-32360, CVE-2023-22045, CVE-2023-22049, CVE-2022-41741, CVE-2022-41742, CVE-2020-12321, CVE-2023-2650, CVE-2023-3446, CVE-2023-3817, CVE-2023-3341, CVE-2023-22081, CVE-2022-0934, CVE-2023-46847.
------
- **I95-38188 Repurposing an HA conductor to a standalone conductor left services for the second conductor:** Resolved an issue where the reverse SSH tunnels from a managed router to the second HA conductor node were not cleaned up if the conductor was converted back to a standalone conductor. The salt states now stop services to a second conductor when it is removed from the HA configuration. 
------
- **I95-48783 Conductor process logs are unbounded, risking storage exhaustion:** auditd logs consuming the disk space when the node monitor is in a disconnected state and the audit logs are left unconsumed. There was a limit to the log file size, but not the number of files. The number of files is now limited.
------
- **I95-50493 Memory calculation for alarms is confusing:** This alarm was designed to trigger when memory usage went above 90% and clear only when memory usage went below 80%, causing confusion. The memory usage alarm no longer requires memory usage to go below 80% to clear; it will clear when memory usage goes below 90%.
------
- **I95-50537 Detect and log invalid TCP establishment flags:** TCP packets with illegal flag combinations are dropped before they can set up a session, rather than after. 
------
- **I95-50540 Denied traffic events not displaying in the GUI or PCLI:** Resolved an issue that prevented displaying denied traffic events in the `show events` PCLI command and in the GUI. Users would see `% Error: Unhandled TypeError: list indices must be integers or slices` in the PCLI, and `An unknown traffic event occurred` in the GUI.
------
- **I95-51191 BFD metrics not cleaned up properly:** The BFDAgent holds onto the stats for peer paths; If the config is changed on a router, new stats are made but the old ones were not being deleted. The old BFD by-peer-path stats are now deleted when a VLAN configuration change is made.
------
- **I95-52540 Metrics infrastructure resource consumption:** The reporting infrastructure reaching load capacity led to data gaps in custom graphs. Several internal optimizations have been implemented to address this issue. However, to reduce the metrics infrastructure load, metrics in the GUI regarding firmware-generated services, service routes, and tenants will no longer be tracked.
------
- **I95-52615 Set TTL multi-hop range correctly:** The TTL multi-hop field allowed a value of 0, but had no impact. The range has been corrected to 1-255, and no longer accepts a value of 0.
------
- **I95-53358 Disable/enable of LACP takes the Bond interface down:** Dynamic reconfiguration has been enhanced to support LACP enable/disable while traffic flows by removing the dedicated queue flow (for LACP) when removing a member from bond. 
------
- **I95-53666 Unable to create webserver certificate request:** This issue has been resolved by providing ACL permissions for the webserver to the certificate directory.  
------
- **I95-53777 Multicast traffic not passing after an HA failover:** Resolved an issue where the multicast service next hops were not reloading on a configuration change. 
------
- **I95-53787 Stats not present on conductor:** Running show device-interface router all on a conductor caused stats (in-octets, in-unicast-pkts, etc...) to be incorrectly displayed as "n/a" instead of the correct value. This issue has been resolved.
------
- **I95-53851 DHCP server scripts return false positive:** During the creation process, the DHCP scripts check the server name for an existing namespace. The script would return a false positive if the configured name was a substring of an existing name. Resolved an issue where a DHCP server won't come up if the device port is a substring of another device port that is also configured as a DHCP server.
------
- **I95-53852 host-service snmp-server blocks SVR pings to a network-interface owned address:** Ping traffic was hitting the generated (wildcarded) snmp-server service. The session could not setup due to security policy conflicts. This issue has been resolved; the generated service from an snmp-server host-service now has a UDP transport.
------
- **I95-53858 Active sessions counter continuously incrementing:** The SSC active sessions counter has been updated to correctly handle session removal.
------
- **I95-53875 The `show stats service-area sent success` metric was retained longer than needed:** Resolved an issue where the `stats default retention short` setting was not being honored.
------
- **I95-53907 SSR readvertising SA to MSDP mesh peers:** Resolved an issue where MSDP SA's received from a mesh-group peer were being re-advertised to the mesh-group. This issue has been resolved by verifying sender of the SA.
------
- **I95-53915 Removing an X710/X722 port from SSR can cause high RX latency:** Deleting an SSR interface from an X710/722 NIC which is part of a multi-port device introduces RX latency into sibling ports until the SSR is restarted. This has been resolved by enabling the i40e “multi-driver” mode to preserve global registers that are shared across ports. 
------
- **I95-54051 Broadcom driver causing memory corruption, leading to a system fault:** Updated the driver support for BNXT NICs.
------
- **I95-54091 Software Lifecycle History page does not load:** A time selector has been added to allow the user to provide parameters around the amount of data that is loaded. 
------
- **I95-54126 VRRP HA - EoSVR to VRRP HA - EoSVR not recovering after failure:** When EoSVR is enabled, VRRP packets (which are multicast frames) are not detected as destined for the SSR and are being classified as non-IP frames that should be encapsulated for EoSVR. To resolve this issue, detection/classification enhancements have been made to recognize VRRP packets that match the configured VRID and not forward them in the EoSVR tunnel.
------
- **I95-54133 IDP severity grouping mislabeled:** Resolved an issue where minor severity levels were labeled incorrectly.
------
- **I95-54155 nodeMonitor coredump on secondary node after upgrade:** During an upgrade where `deviceType` was `LTE` the attempt to get a linux interface name (not supported) failed. This issue has been resolved by implementing a device interface type verification.
------
- **I95-54180 Unable to fetch reports from Conductor GUI:** A refactor moved the connectivity check exception, which prevented a service restart. This has been resolved, and the stats now being written to the database and GUI tables.
------
- **I95-54199 Image based installation hangs in Azure:** Resolved a dependency issue causing a race condition between Azure and the SSR setup; azure agent requires networking, but `t128-firstboot-setup.sh` must run before network startup to configure the NIC names. The dependencies have been correctly sequenced.
------
- **I95-54265 Schema not included in API response for a template:** The `schema` object has been added to the API. 
------
- **I95-54294 Unable to delete capture-filter created with `&&` operator:** Resolved an issue that disallowed deleting capture-filters containing `&&`. Customers on older versions of software can work around this by creating capture-filters using `and` instead of `&&`.
------
- **I95-54398 ASM - Prune flag set incorrectly:** Resolved an issue with how outgoing interfaces in the mroute entry are reported. If the outgoing interface list only contains PIM SVR interfaces, the P flag was displayed incorrectly. The outgoing interface list is populated correctly, and the P flag now shows correctly.
------
- **I95-54434 Mist PCAP failure - inverted commands observed by the device:** In rare cases where captures are created and deleted too quickly, a delete command may be received by the device before the create command. These timing issues have been resolved.
------
- **I95-54490 Permission denied when trying to open a user config file:** Resolved a permissions issue for the `connect router` command by adding ACLs for reverse SSH so that this is accessible for admin users.
------
- **WAN-1958 Mist agent crashes:** Increased internal file system limits which were preventing some services from starting correctly at boot. Limits were raised based on expected system usage.

### Caveats

- **I95-54780 Forwarding Utilization stats are not retained beyond one hour:** This issue is the result of the fix in place for the `stats default retention short` setting was not being honored (I95-53875). This will be resolved in the next patch release. 
------
- **I95-54856 Rollback issue after upgrade to 6.2 from versions 6.1 or earlier:** If the SSR is upgraded from 6.1 (or older) to 6.2 and you have BGP neighbors with address family configuration, and then try to downgrade to a version prior to 6.2, the downgrade will fail.

That configuration looks like this:
```
		neighbor 172.16.0.1
    		neighbor-as 300
        		address-family ipv4-unicast
             		<anything>
```

The downgrade fails because a new default `disable` value for the `remove-private-as` option was added under the neighbor address family. This value is present in the configuration under `neighbor address-family` even if it was not explicitly configured.

**Workaround Options:**

Delete the `neighbor address-family` container from the configuration before the downgrade. **It is recommended to make a copy of the `neighbor address-family` configuration**, because you will need to add it back after the downgrade.

Explicitly configure `remove-private-as` to one of the other valid values. It is recommended to review your BGP configuration before making any of the below changes, as they may have an impact. 

Valid values for `remove-as-path`:

- `all`: Remove all private AS in the AS path.
- `replace-all`: Replace all private AS with the local AS.
- `only`: Remove private AS only if the AS path contains just private AS.
- `replace-only`: Replace private AS with the local AS only if the AS path contains just private AS.

## Release 6.2.0-39r1

**Release Date:** November 16, 2023

### New Features

- **I95-15554 IPv6 Support for BGP:** The SSR now supports BGP using IPv6 addressing. IPv6 can be used alone, combined with IPv4, or IPv4 can continue to be used without IPv6. For more information, see [IPv6 Addressing](config_bgp.md#ipv6-addressing).
------
- **I95-17284 SNMPv3:** Support for SNMPv3 has been added. For configuration details, see [SNMPv3 Basic Configuration](config_snmp.md#snmp-v3-basic-configuration).
------
- **I95-43657 Static NAT:** Static NAT address mapping is supported by the SSR. For supporting information about this feature, see [Static NAT](config_static_nat.md).
------
- **I95-46537 Azure Mini-R Platform Support:** The Azure Mini-R is now a supported platform for the SSR software. 
------
- **I95-46671 VRF Route Leaking:** VRF Route Leaking allows the intentinoal sharing of route information across VRF instances. For a more detailed explanation and configuration information please refer to [VRF Route Leaking](config_vrf_route_leaking.md).
------
- **I95-47133 Local Configuration Override:** Administrators can now make configuration changes to a local router without access to the conductor, and prevent the conductor from overriding those changes. For more information about using this feature, see [Local Configuration Override](how_to_local_config_override.md).
------
- **I95-48174 Expand supported values for DHCP option:** DHCP option 43 is now a supported option, as well as a binary encoded-type (hex/byte) support. Valid examples are `0xabcdef` and `0x123456`.
------
- **I95-50071 Lenovo SR650 platform support as a 100G ports solution:** The Lenovo SR650 has been added as a Juniper-certified platfform to provide 100G port connectivity. 
------
- **I95-51181 Improve save-tech-support-info command:** The PCLI command `save tech-support-info` now has a `since` argument that limits log collection to only logs generated after a specified time. The `since` argument can be a relative time delta or an absolute timestamp. The GUI's About and Logs pages has the same functionality with a drop down that allows limiting the time window for the displayed/downloaded logs/tech-support-info.
------
- **I95-51194 Support for Multicast Source Discovery Protocol (MSDP), and the SSR as a Rendezvous Point (RP):** MSDP support has been added, allowing the RP's to share active Multicast Sources. For detailed configuration information, see [Multicast Source Discovery Protocol (MSDP)](config_multicast.md#multicast-source-discovery-protocol-msdp). 
------
- **I95-51450 Support for 100/Full Speed/Duplex on Intel I225-V Driver NICs:** The DPDK driver has been updated to allow fixed speed and duplex configuration to work with IGC i225 NICs.
------
- **I95-51544 Add the option to use the physical source MAC on VRRP interfaces:** The command [`use-physical-address`](config_command_guide.md#configure-authority-router-node-device-interface-vrrp-use-physical-address) has been added to the device-interface configuration. This allows VRRP to use the physical MAC rather than the virtual MAC and prevents platforms that reject the virtual MAC from dropping traffic. 
------
- **I95-52406 Download MIBs from the GUI:** A button has been added to the GUI, in the Documentation pane of the About Page, to download the SNMP MIB definitions for SSR.
------
- **I95-52703 Tenancy consideration in Application ID lookup:** Application Identification service lookups now consider the source tenant. This allows matches to be specific to certain networks/users. See [AppID and Tenancy](concepts_appid.md#appid-and-tenancy) for more information.
------
**WAN-1728 SSR1000 series Out of band management improvements:** The following improvements have been made to enhance the management functionality in Mist Managed environments:
 - NTP sync
 - MIST & conductor connectivity
 - Other host services  
 - Support for static IP address (including VLAN)
 - Failover support between the management and WAN interface

### Resolved Issues 

- **The following CVEs have been resolved in this release:** CVE-2023-2828, CVE-2022-42896, CVE-2023-1281, CVE-2023-1829, CVE-2023-2124, CVE-2023-2194, CVE-2023-2235, CVE-2023-20569, CVE-2023-20593, CVE-2023-38802, CVE-2022-41974, CVE-2023-32360, CVE-2023-22045, CVE-2023-22049.
------
- **I95-42466 Changing the physical linux address of an HA interface breaks the configuration:** Resolved an issue where moving a non-forwarding fabric HA sync device-interface from one PCI address to another PCI address would not properly clean up the team interface from the old PCI address.
------
- **I95-47838 SSR does not remove networks on stop:** Resolved an issue where the SSR does not remove networks on stop. This has been corrected and the SSR now will cleanup networks on container stop and create them on restart to optimize start/restart process. 
------
- **I95-48346 BGP peering between two SSRs not coming up:** When a network interface is configured with tenant-prefixes and these match a BGP neighbor, then that neighbor cannot establish a connection with the router. The SSR now creates FIB entries that allow communication from routing protocol neighbors.
------
- **I95-50539 SSR not handling and logging Multicast packets correctly:** Per security best practices, the SSR now filters and drops packets if the source address is a multicast source IP address. 
------
- **I95-50671 Office365 traffic is not recognized:** Resolved an issue where Office365 traffic was being miscategorized and therefore not fully qualified. O365 traffic, when traversing over SVR, is no longer miscategorized.
------
- **I95-50708 Time series data for memory of the salt_master process periodically significantly decreases:** Incorrect method for polling application memory data; this resulted in dips in application memory being presented. This issue has been resolved.
------
- **I95-51492 Password expiration not working:** This issue has been resolved. Adminstrators must use the global setting `configure authority password-policy lifetime N ` to indicate that all user passwords must be changed every `N` days.
------
- **I95-51638 Traceroute does not complete over SSR, but does using linux:** The traceroute command was unable to resolve through some network elements. The default SSR traceroute UDP port number has been changed to a more common/recognized port.
------
- **I95-51766 TX lockup detector not enabled for LAG/bonded interfaces:** The datapath lockup detection mechanism has been re-enabled to run on bond interfaces. 
------
- **I95-51801 The SSR is unable to see DHCP ACK for the DHCP Request sent by an EX4100:** Added an `authoritative` field for DHCP servers to enable/disable `authoritative` mode, which allows the server to send a NAK in response to unknown clients. This field is set to `true` by default.
------
- **I95-51864 Ethernet Over SVR (EoSVR) not working for multi-hop SVR scenarios:** When EoSVR traffic traverses over a dogleg path in a HA node topology, traffic failed to traverse the middle node. EoSVR packets are no longer incorrectly dropped when routed over an inter-node path when coming from an SVR path.
------
- **I95-51992 Multi-queue support for Bond interfaces:** Support for a bond `device-interface` to use multiple RX/TX queues has been added. 
------
- **I95-52018 Path returned contained ip-address with no escaping:** The Inspector path has been modified with the ability to escape.
------
- **I95-52113 Application Identification on the SSR runs at 100% CPU utilization:** Resolved an overrun bug that was causing the SSR to enter a loop when loading port ranges. This issue has been resolved.
------
- **I95-52147 Adding and deleting bond interfaces with the same name would leave the interface in a down state:** This issue has been resolved.
------
- **I95-52158 Spoke is rejecting hub BFD packets, and peering is unable to come up over LTE:** In a corner case where the spoke private LTE IP changes before BFD is up and the public/hub-received IP stays the same, the hub gets stuck in the init state. 
This issue has been resolved; the LTE IP change is now handled it as a source-nat change, where the flows and actions can be recreated with the updated LTE private IP.
------
- **I95-52178 Reset of SSR IDP does not turn it off:** Resolved an issue when performing a factory reset on SSR IDP did not turn it off properly. 
------
- **I95-52279 Bond interface configured with VRRP not receiving UDP traffic when LACP is enabled:** An issue where VRRP Virtual MACs from being silently dropped has been resolved. Packets with VRRP virtual dest MACs are now processed by the Bond PMD when using LACP.
------
- **I95-52414 RBAC not being honored for `show fib` output:** Resolved an issue where `show fib` included entries that the current user did not have permission to view.
------
- **I95-52480 Conductor shows alarms when applications are added to the router configuration:** A condition has been added that verifies whether the node is a router or conductor before running application update and generating alarms on a conductor.
------
- **I95-52491 Crash in highway process due to segmented metadata:** Resolved an issue processing metadata that is segmented across two packet buffers. The segmented packets are no longer discarded and the dataplane no longer crashes when processing a packet comprised of segmented metadata.
------
- **I95-52498 AppID allows session when it should be blocked:** When utilizing the Application Identification functionality, a TCP reset is now sent to clients to correct this behavior.
------
- **I95-52547 Unable to set DHCP option 160:** Resolved an issue where DHCP option 160 was being treated as a standard option and was unavailable to be defined as an option. When it was set, it would prevent the DHCP server from starting. This has been corrected. 
------
- **I95-52599 Conductors display different assets on different HA nodes:** If the state table of an inactive HA node becomes out of sync with the active HA node, then some assets were being skipped when parsing the asset state response. This issue has been resolved through the reporting of asset IDs from the active node state table. 
------
- **I95-52822 ARP fails to resolve:** An earlier change caused ports on an X553 that use SFPs to no longer correctly report link status. This issue has been resolved and the link status is now reported accurately. 
------
- **I95-52855 DHCP Relay stopped functioning after removing disabled DHCP Servers:** When a number of disabled DHCP servers were deleted from the configuration, the server interface mappings were deleted as well. Updates have been made to re-enable DHCP relay when a DHCP server or interface is removed.
------
- **I95-52859 Issue moving interface between chassis of hypervisor platforms running SSR (e.g., ENCS):** When swapping physical cable from active node to standby node, the customer experienced low rate packet loss on traffic-engineering enabled device-interfaces. To resolve this issue, the traffic-engineering transmit-cap is no longer ignored on device-interfaces which have unresolved link-speed.
------
- **I95-52889 Highway crash caused by a false negative waypoint exhaustion check:** Waypoint ports reinitialization that is triggered by a false negative exhaustion check can lead to duplicate waypoints and reverse flows on two sessions resulting in a highway crash. This issue has been resolved.
------
- **I95-52971 Inconsistent hash and signing of RPM files:** Some small number of RPM files did not usen the `sha256` hash for sigining. This has been corrected and all RPM packages on the distribution ISO are digest sha256 for Common Criteria.
------
- **I95-52994 Routers continue to request the conductor configuration:** Resolved an issue where a managed router continued to request the configuration from the conductor even after a validation or datamodel incompatibility issue.
------
- **I95-52999 Package-based Interactive Install does not recognize Mellanox CX6 LX (10/25G) interfaces:** Resolved a rare case where NICs with kernel drivers that exist in EL8 but not in EL7 will not be enumerated during Interactive ISO installation. 
------
- **I95-53000 process highway disconnected messages caused by NIC driver bug:** The DPDK driver code for the Broadcom NICs contained a bug that caused the querying of the extended statistic to fail. The Broadcom NIC driver has been upgraded to resolve the issue.
------
- **I95-53002 NTP setup check fails on startup:** Resolved an issue in the NTP startup sequence, due to an incorrect path for the NTP configuration.
------
- **I95-53009 RPM signature verification missing for all artifacts:** Verification for all ISO RPMs has been added.
------
- **I95-53017 Some files incorrectly marked as executable:** Some cache files were incorrectly marked as executable, and were flagged as part of the Common Criteria validation. These files have been correctly identified and marked. 
------
- **I95-53105 Conductor to router API RBAC rules not being followed:** Resolved an issue where the user is getting elevated to admin on the managed router, thus returning more data than necessary.
------
- **I95-53114 Broadcom interfaces stuck in `admin down` after upgrade:** Resolved an issue where device-interfaces on Broadcom NICs wouldn't come up properly if initially configured with `enabled false`.
------
- **I95-53124 AppID fails to get application category information:** If a service becomes refined to a child-service, sessions to an RFC1918 destination addresses now update their stats tracking under the new classified application.
------
- **I95-53130 Errors seen on Q-in-Q enabled interface after upgrade:** Interfaces were unable to receive jumbo packets unless MTU is configured to be large enough. This resolution allows the reception of jumbo packets regardless of the MTU setting.
------
- **I95-53185 Rare race condition causing highway crash:** Resolved a rare race condition between flow install and flow lookup causing a highway crash.
------
- **I95-53253 Include dmesg and systemd journal unit in TSI:** Include output from dmesg and systemd journal unit in TSI in order to assist in debugging future platform related issues.
------
- **I95-53262 VRRP status shows active for both nodes when dual node ha redundancy is configured on bond interface:** Bonded X710 devices were unable to receive VRRP from each other, resulting in active-active scenario. This resolution disables source pruning by default on these devices.
------
- **I95-53285 User datastore issue when renaming a router:** Resolved an issue where HTTP requests would stop working to a router after the router's name was changed, but before the SSR was restarted.
------
- **I95-53288 Fetching detailed bond info from the conductor for routers fails:** The conductor was incorrectly posting a `JSONDecodeError` when trying to parse bond information that was missing from the router response. This issue has been resolved.
------
- **I95-53321 Syslog datamodel is limited:** Added the following configurable syslog facility values `auth`, `authpriv`, `cron`, `daemon`, `kern`, `lpr`, `mail`, `news`, `syslog`, `user`, and `uucp`.
-----
- **I95-53344 Exception on device interface tear down terminates process:** Resolved a rare case where Highway process can terminate and core during config changes if there is an underlying exception to a device-interface on removal.
------
- **I95-53393 Empty password attempts not counting towards user lockout:** The SSR counts login attempts with an empty password as failed login attempts. These  contribute to locking a user account if they reach the threshold (the value configured in `configure authority password-policy deny`,) within a short time window. 
------
- **I95-53472 Service Routes passing validation on conductor but then failing on local router:** The validation process on the conductor has been updated to identify service-routes with deleted or empty destination lists as invalid.  
------
- **I95-53538 Custom audit rules not preserved on SSR upgrade:** Resolved an issue where the image-based upgrade (IBU) was not preserving audit rules or `dnf.conf`.
------
- **I95-53583 `show service-path` on hub always shows ADDR_UNKNOWN IP address for the peers:** Add remote host name to `show service-path [detail]` . This resolves an issue where hub routers interacting with dynamic spoke interfaces do not show information in `show service-path detail` to identify those individual paths. 
------
- **I95-53641 BGP between peers does not immediately transition to the Connected state:** A change has been made to reduce the time that BGP routes learned from a BGP over SVR neighbor are withdrawn when we lose all peer paths to the neighbor.
------
- **I95-53894 DNS cache-service does not start:** Resolved a race condition that causes the DNS process to fail to start. The log message `No TimeoutQueue:` can be seen in the logs during this condition.
------
- **I95-53916 Stale Teams interfaces conflict with HA interfaces:** In some cases a stale teams interface could conflict with a new configuration pushed down from MIST. Resolved an issue where the use of non-standard HA ports could result in non-functional HA after a factory reset.
------
- **I95-54030 Node sending ARP requests to the wrong MAC:** After an SFP hot swap, node1 was sending ARP requests to the wrong MAC. An issue where E810 interfaces with default MTU configuration could potentially transmit corrupt ARP response packets has been resolved.
------
- **I95-54086 Conductor memory exceeded:** In certain cases the salt master on the conductor could grow indefinitely in memory. This may be related to situations with both poor connectivity and the use of the `asset-connection-resiliency` feature. An update to the salt package has been made to resolve this issue.
------
- **WAN-1323 Remove bootstrapper interfaces after Mist Onboarding:** The bridge interface used for bootstrapping in the default linux environment is now removed.
------
- **WAN-1735 Set log levels on SSR:** Added new `log_level` and `log_category` fields in the `root_override` section of the intent config.

### Caveats

- **I95-52426 Alerts not issued when decreasing the action type on an IDP custom rule definition:** In a case where a user is modifying a rule to **decrease** the action type to an `alert`, alerts for that vulnerability will not be reported. The attack will be allowed to pass through undetected. For example, if the action `close-tcp-connection` is downgraded to `alert`, the attacks will pass through undetected.
------
- **I95-53274 PIM scaling above 1500 (Source,Group) sessions:** The SSR cannot maintain more than 1400 active (Source,Group) sessions. Juniper recommends a limit of 1400 (Source,Group) sessions to prevent a loss of traffic. 
------
- **I95-53777 Multicast traffic not passing after HA Failover:** High Availability with Multicast is not fully supported. Drop or complete loss of traffic may be seen when the primary node resumes traffic after a node failure and failover.
------
- **I95-53878 Dynamic Reconfiguration Issues with LAG:** Dynamic reconfiguration is not currently supported. Changes in LAG configuration require a 128T service restart and may result in service disruption. Any changes to LAG configuration should be performed during a maintenance window.
