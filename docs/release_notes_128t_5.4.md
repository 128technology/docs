---
title: SSR 5.4 Release Notes
sidebar_label: '5.4'
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
- **I95-42452 Conductor Upgrade Time:** Upgrades to version 5.4 can take up to 40 minutes due to the number of rpms being upgraded. Please plan accordingly.
------
- **I95-42624 Upgrade Installer:** Before **upgrading to, or installing** version 5.4, update the Installer to at least version 3.1.0. Failing to upgrade the installer may result in a rollback failure, should a rollback be necessary at any time.
------
- **Plugin Upgrades:** If you are running with plugins, updates are required for some plugins **before** upgrading the conductor to SSR version 5.4.0. Please review the [Plugin Configuration Generation Changes](intro_upgrade_considerations.md#plugin-configuration-generation-changes) for additional information.  

## Release 5.4.3-8

**Release Date:** January 27, 2022

### New Features

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
- **I95-40436 Updated Application ID Domain Data:** Application Identification can be configured to automatically download updated domain and application datatsets daily, weekly (default), or monthly. For more information, see [Auto Update the Domain List](config_domain-based_web_filter.md#auto-update-the-domain-list).
------
- **I95-40416 Google Cloud Platform Support:** The SSR now supports the Google Cloud Platform (GCP).
------
 - **I95-40438 Support for Lenovo X722:** Upgrades to the DPDK version now provide support for the Lenovo Ethernet Connection X722 for 10GbE SFP+.
------
- **I95-40558 OSPF `show` commands:** Several new `show ospf` and `show ospf database` commands have been added.
------
- **I95-40679 Show DPU command pagination:** Pagination has been added to the `show dpu` command to better present the volume of information.
------
- **I95-41016 WAN Assurance:** SSR provides integration with Mist WAN Assurance. For configuration information, see [Configuring WAN Assurance](config_wan_assurance.md).
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
- **I95-43380 PCLI and UI does not allow the user to edit the [`http-probe-profile`](#plugin_http_probe.md) configuration:** There is no known workaround at this time. This is being addressed in an upcoming point release. See additional considerations [here](intro_upgrade_considerations.md#unsupported-plugins).
