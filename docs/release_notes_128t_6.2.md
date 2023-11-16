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
**WAN-1728 SSR1000 series Out of band management improvements:** The following improvements have been made to enhance the management functionality in Mist Managed environments:
 - NTP sync
 - MIST & conductor connectivity
 - Other host services  
 - Support for static IP address (including VLAN)
 - Failover support between the management and WAN interface
------
- **WAN-1735 Set log levels on SSR:** Added new `log_level` and `log_category` fields in the `root_override` section of the intent config.

### Caveats

- **I95-52426 Alerts not issued when decreasing the action type on an IDP custom rule definition:** In a case where a user is modifying a rule to **decrease** the action type to an `alert`, alerts for that vulnerability will not be reported. The attack will be allowed to pass through undetected. For example, if the action `close-tcp-connection` is downgraded to `alert`, the attacks will pass through undetected.
------
- **I95-53777 Multicast traffic not passing after HA Failover:** High Availability with Multicast is not fully supported. Drop or complete loss of traffic may be seen when the primary node resumes traffic after a node failure and failover.
------
- **I95-53878 Dynamic Reconfiguration Issues with LAG:** Dynamic reconfiguration is not currently supported. Changes in LAG configuration require a 128T service restart and may result in service disruption. Any changes to LAG configuration should be performed during a maintenance window.
