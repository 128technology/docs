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
- **Plugin Upgrades:** If you are running with plugins, updates are required for some plugins **before** upgrading the conductor to SSR version 5.4.0. Please review the [Plugin Configuration Generation Changes](intro_upgrade_considerations.md#plugin-config-generation-changes) for additional information.  

## Release 5.4.1-4

**Release Date:** November 23, 2021

### Resolved Issues
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
- **I95-34664 Add Ability to disable `graceful-restart`:** Users can now configure `graceful-restart` as disabled, rather than helper mode or full graceful restart. For more information, see [BGP Graceful Restart](config_bgp.md/#bgp-graceful-restart)
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
- **I95-40436 Updated Application ID Domain Data:** Application Identification can be configured to automatically download updated domain and application datatsets daily, weekly (default), or monthly. For more information, see [Auto Update the Domain List](config_domain-based_web_filter.md/#auto-update-the-domain-list).
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
- **I95-42107 User defined Help for Templates:** When defining templates, adminstrators can provide help text for the template that will display for the user completing the templated configuration. For more information, see [Adding Help for a Template.](config_templates.md/#adding-help-for-a-template)
------
- **I95-42278 Template filters for use with Subnets:** Filters have been added for use with CIDR formatting. 
------
- **I95-42445 Upload Template Schema:** The ability to upload template schema through an API using the GUI. For additional information see [Configuring Templates.](config_templates.md)
------
- **I95-42479 Router Upgrade GUI Improvements:** Several improvements have been made to the Router Upgrade display in the GUI.
------
- **I95-42923 `restore system factory-default` command added:** Configuration is reset to the factory defaults, the configuration is committed, and the system is rebooted. This is an Admin only function. Please see [`restore system factory-default`](cli_reference.md/#restore-system-factory-default) for additional information. 

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
- **I95-43205 Changes to ssh key permissions create problems:** This issue has been resolved. 
------
- **I95-43028 Downloaded software for the router does not show up on secondary conductor:** Resolved this issue so that full output is delivered to all nodes.
------
- **I95-43083 ISO missing Rescue Boot Image:** Replacing packages that were removed during upgrade. 
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

