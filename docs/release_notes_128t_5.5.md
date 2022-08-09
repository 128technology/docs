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

## Release 5.5.3-X

**Release Date:** August 11, 2022

### New Features

- **I95-44863 Automatic Core Assignment after Reboot:** On systems where `forwarding-core-mode` is set to `automatic`, if the CPU core count changes the software will automatically recalculate the core count and allocation at reboot.
------
- **I95-46145 Extend clear app-id PCLI command to support stats purge:** The `clear app-id` command has been extended to clear expired client and next hop stats.
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
- **I95-42438 Save Tech Support tries to run when 128T service is down:** In situations where the PCLI is still active, but the 128T service is down, trying to run `save tech support` will appear to work, but does not return any info. This issue has been resolved, and will return a message when information is not retrievable. 
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
| 5.5.1 | 5.5.1, 5.6.0 |

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
- **I95-43327 Exchange FPM loss information between adjacent 128T nodes:** Added a mechanism to communicate marking counts between adjacent nodes to allow both sides to understand the calculated loss. 
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
