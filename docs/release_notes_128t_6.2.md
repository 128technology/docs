---
title: SSR 6.2 Release Notes
sidebar_label: '6.2'
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

- **I95-43243/IN-460 Upgrade and Rollback:** Upgrading or rolling back a system (conductor peer or router) with the interactive installer `install128t`, that is managed by a conductor may result in the system becoming unresponsive. It is recommended that upgrades be performed through the conductor UI. Manual upgrades and rollbacks may not be resilient to failures. See [Rolling Back Software](intro_rollback.md) for more information on these operations.
------
- **I95-42542 Conductor Upgrade Time:** Upgrades can take up to 40 minutes due to the number of rpms being upgraded. Please plan accordingly.
------
- **I95-42624 Upgrade Installer:** Before **upgrading to, or installing** version 5.4 and above, update the Installer to at least version 3.1.0. Failing to upgrade the installer may result in a rollback failure, should a rollback be necessary at any time. The Installer typically prompts you update when a new version is available. Select **Update** when prompted.
------
- **Plugin Upgrades:** If you are running with plugins, updates are required for some plugins **before** upgrading the conductor to SSR version 5.4.0 or higher. Please review the [Plugin Configuration Generation Changes](intro_upgrade_considerations.md#plugin-configuration-generation-changes) for additional information.

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

## Release 6.2.0-39

**Release Date:** November 16, 2023

### New Features

- **I95-15554 IPv6 Support for BGP:** The SSR now supports BGP using IPv6 addressing. IPv6 can be used alone, combined with IPv4, or IPv4 can continue to be used without IPv6. For more information, see [IPv6 Addressing](config_bgp.md#ipv6-addressing).
------
- **I95-17284 SNMPv3:** Support for SNMPv3 has been added. For configuration details, see [SNMPv3 Basic Configuration](config_snmp.md#snmp-v3-basic-configuration).
------
- **I95-43657 Static NAT:** Static NAT address mapping is supported by the SSR. For supporting information about this feature, see [Static NAT](config_nat.md#static-nat).
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
