---
title: SSR 5.6 Release Notes
sidebar_label: '5.6'
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

:::important
The following issue has been discovered in the following releases:

- 5.6.2 
- 5.6.3

If an HA Conductor queries a disconnected router from the Conductor GUI Router page or from the Conductor PCLI, the conductor may encounter periods of poor performance until the requests time out. The issue will be resolved in the next patch release. 

For immediate resolution on the impacted releases, contact Juniper Technical Support, or your SE.
:::

## Release 5.6.3-6

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

## Release 5.6.2-7

**Release Date:** October 4, 2022

### New Features

- **I95-35571 Enhanced Syslog:** The SSR can be configured to send system generated events over a secure TLS or TCP connection to a remote-logging server for analysis and storage. For more information, see [Secure Syslog Transport](config_audit_event.md#secure-syslog-transport)
------
- **I95-44863 Automatic Core Assignment after Reboot:** On systems where `forwarding-core-mode` is set to `automatic`, if the CPU core count changes the software will automatically recalculate the core count and allocation at reboot.
------
- **I95-47077 Configuration options for User Accounts:** Added configuration options for number of login attempts before locking user account, and number of seconds that user account will be locked before being able to attempt to login again. For information, see [Password Policies](config_password_policies.md).
------
- **I95-47418 Audit Events for Plugins:** A new audit event has been added that tracks when a plugin is installed or uninstalled. This can be viewed on the Audit History page in the GUI or in the PCLI by running `show events type admin.plugin`.

### Resolved Issues

- **The following CVE's have been addressed and resolved:** I95-45056, I95-45059, I95-45060, I95-45123, I95-45165, I95-47482, I95-47483, I95-47484, I95-47485, I95-47805, I95-48048, I95-48049. 
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

### New Features

- **I95-35610 Session Failover without a Forward Packet:** A keep-alive mechanism has been added for flow moves. When flow move is triggered, the SSR detects inactivity in forward traffic and generates a keep-alive packet in the forward direction.
------
- **I95-40195 LDAP does not allow search base to be configured correctly:** Search base parameters, filter generation, certificate assurance, and logging enhancements have been added to the `ldap-server` configuration. See [LDAP](config_ldap.md) for more information.
------
- **I95-40333 Save credentials for accessing SSR software repositories:** `set software access-token` is a new PCLI command to save credentials for accessing SSR software repositories. This provides a way to run `install128t repo authenticate` without dropping to a linux shell. For additional information on this command, see [`set software access-token`](cli_reference.md#set-software-access-token).
------
- **I95-43048 NIST FIPS Validated Cryptography:** FIPS Enforcement Mode has been added to the  package-based installation processes. Refer to [FIPS Enforcement Mode](intro_installation_bootable_media.md#fips-enforcement-mode) for details.
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

- **The following CVE's have been addressed and resolved:** I95-45054, I9-45056, I95-45059, I95-45060, I95-45165, I95-46020, I95-46359. 
------
- **I95-35228 DHCP waypoint addresses not displayed on standby node in UI:** Resolved an issue where the PCLI logic was not matching the GUI Network Interface table.
------
- **I95-39274 DNS-based services kill asset connection resiliency:** Resolved an issue where an internal commit was bouncing the kni254 interface and causing a series of connection resets.
------
- **I95-42438 Save Tech Support tries to run when 128T service is down:** In situations where the PCLI is still active, but the 128T service is down, trying to run `save tech support` will appear to work, but does not return any info. This issue has been resolved, and will return a message when information is not retrievable. 
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
- **I95-40660 Kernel Upgrade:** The OS kernel has been upgraded to that of CentOS 8.4 to address several CVEs and provide support for Wireguard and Cordoba.
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
- **I95-44726 Invalid return code returned by LTE firmware creating a memory leak:** Resolved a buffer leak in the wanpipe driver.
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
- **I95-45348 Update salt master and minion to 3002.8:** This update resolves several CVE's and requires that the conductor must be running this release containing these fixes **before** upgrading a router. 
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
