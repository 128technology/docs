---
title: 128T 5.1 Release Notes
sidebar_label: '5.1'
---

:::info
Issues resolved in a release are merged into subsequent releases chronologically AND numerically. 

If you do not see an issue listed below, it may have been resolved in another recently released version. A link to the Release Notes for the most recent chronological release of SSR / 128T Software is provided.

Alternatively, refer to the **[List of Releases](about_releases.md)** page for release dates and links to all SSR / 128T Release Notes; or, if you know the Issue ID Number, enter that into the Search field at the top right of this page. 
:::

## Release 5.1.4
**Release Date:** June 29, 2021

### New Features

- **I95-35414 Refresh actions now available for individual sections on the Router Page:** The Device interface, Network Interface, and Peer Paths table sections now can be refreshed independently.
------
- **I95-38244 The Routers Page is easier to Search:** Added a column selector and a search matching system to make the search function more granular. 
------
- **I95-38445 [GUI Session Capture](ts_packet_capture.md#session-capture-in-the-gui):** Added pages to the user interface that allow you to view and configure capture information.  
------
- **I95-39293 and I95-40139 GUI Plugin Details and Commands:** Added pages to the user interface that allow you to [run the commands that are bundled with the installed plugins](plugin_intro.md#installation-and-management). 
------
- **I95-40458 Added the ability to toggle between Advanced and Basic Configuration mode:** Added the option to limit the main configuration screen to the most frequently used fields, or display all configuration options. 
------
- **I95-40532 Added Tenant prefix support on network interface:** Provides a simpler way to configure the tenant prefixes on a per branch basis.

### Resolved Issues

- **I95-39249 Validation Warning when services collide:** Additional warnings are now provided during configuration validation when two services have overlapping protocol specifications.
------
- **I95-39713 Access policy object screen has incorrect heading text:** The heading for the access policy setting has been changed to display the correct heading text.
------
- **I95-39954 Conductor Service Generation Service Policy cannot be set:** Resolved a `management-service-generation` validation error. 
------
- **I95-40144 EoSVR with outbound only sessions showing errors:** Resolved an issue where EoSVR with outbound only sessions may show errors when FPM is turned on, and will not contribute to FPM data.
------
- **I95-40158 Missing namespace argument:** Added a missing namespace argument.
------
- **I95-40239 CVE-2021-26937:** This vulnerability has been resolved.
------
- **I95-40241 RHSA-2020:1180:** Resolved RHSA-2020:1180 by deprecating package ImageMagick.
------
- **I95-40242 CESA-2021:0856 advisory:** This vulnerability has been resolved. 
------
- **I95-40304 Allow for duplicate domain names:** When the same domain name appears for multiple categories, the system will preserve the first such entry and ignore the rest.
------
- **I95-40334 `show service-path` shows BGPoSVR for an EoSVR interface:** Resolved the issue where `ethernet-over-svr` routes would be displayed as `bgp-over-svr` in the output. 
------
- **I95-40349 Improve Session Not Found Message:** The message is now more user-friendly. 
------
- **I95-40380 Routers Page facet selector requires a search value:** Removed a condition causing the facets to be ignored when the search bar is empty.
------
- **I95-40407 Conductor cli complains that it is a managed router:** This issue has been resolved. 
------
- **I95-40429 Unable to make local router changes:** Resolved an issue where any local changes were overwritten immediately, rather than when the configuration on the conductor was committed.
------
- **I95-40435 Loss of HA headend after configuration changes to spoke:** Resoved an issue where configuration changes to traffic-engineering when HA is enabled force the interface into standby mode.
------
- **I95-40460 The Download Quickstart link in Firefox does not download the file:** This issue has been resolved. 
------
- **I95-40473 API Username not being recorded:** Resolved an issue where the "modify_user" event was omitting the "fullName" modified field.
------
- **I95-40489 ISO missing 128T-minion-connector rpm:** The 128T-minion-connector plugin rpm was not included in the 5.1 OTP ISO. This has been corrected in the 128T-5.1.3-1.el7.OTP.v3.x86_64.iso ISO.
------
- **I95-40477 Import certificate webserver doesn't copy the private key:** This issue has been resolved.
------
- **I95-40669 Reverse SSH config file only generated if remote login enabled:** The reverse SSH config file is now generated correctly. 
------
- **I95-40682 GUI login page keeps focus on the last selected element:** The Login page now focuses on the username field after an invalid login.
------
- **I95-40690 Update cloud templates:** The templates have been updated. 
------
- **I95-40709 Add timestamp to runtime stats log file:** The timestamp has been added.
------
- **I95-40721 CESA-2021:0856:** This vulnerability has been addressed. 

## Release 5.1.3
**Release Date:** May 14, 2021

### New Features

- **I95-40046 Support for [BGP over SVR on VRF](config_bgp.md#vrf-bgp-over-svr):** BGP over SVR is now supported on BGP instances inside a VRF.

### Resolved Issues

- **I95-39477 Configuration validation failure when conductor non-forwarding fabric interfaces are configured in different subnets:** Updated to display a warning to the user to correct the issue, rather than failing.
------
- **I95-39509 Service Configuration has Empty Access Policy List:** Resolved an issue where the Access Policy list was not showing any items in the drop-down.
------
- **I95-39683 After changing the configuration, the `diff` operation shows no changes:** Resolved an issue where the `show events config commit` was not returning any changes.
------
- **I95-39852 Sync System clock to the Hardware clock with NTP:** The hardware clock now synchronizes with the NTP server. 
------
- **I95-39854 Management over Forwarding not bringing up Eth0 on shutdown:** Resolved an issue preventing devices from unbinding cleanly.
------
- **I95-39887 Router deployments taking longer than expected to complete:** Resolved an issue where assets take a long time to transition out of the connected state. 
------
- **I95-39953 IPFIX Export Loop:** Resolved a race condition causing the IPFIX collector to get into an infinite loop exporting interim records.
------
- **I95-39986 Mellanox driver discarding large segmented packets:** Resolved an issue where the Mellanox driver was discarding large segmented packets and reporting them as errors. 
------
- **I95-40000 LTE Module Reset overwrites the LTE interface MTU:** The LTE target interface MTU is now persisted at 9000.
------
- **I95-40032 `show device-interface speed` returns incorrect value for virtio devices:** Resolved a comparison error causing `show device-interface` to display the wrong speed. 
------
- **I95-40208 Quickstart not setting the minion_id to the hardware identifier when the value is blank:** Previously, if the Quickstart configuration did not have a value for the `minion_id`, the `minion_id` would not be set to the hardware identifier. This has been corrected in the `128T-5.1.3-1.el7.OTP.v2.x86_64.iso` ISO.
------
- **I95-40489 ISO missing 128T-minion-connector rpm:** The 128T-minion-connector plugin rpm was not included in the 5.1 OTP ISO. This has been corrected in the `128T-5.1.3-1.el7.OTP.v3.x86_64.iso` ISO.

## Release 5.1.2
**Release Date:** April 30, 2021 

**Includes changes from:** [Version 4.5.8 April 28, 2021](release_notes_128t_4.5.md#release-458).

### Resolved Issues

- **I95-29583 Default Language Setting:** Changes to the default language are now saved per user, not per system.
------
- **I95-39245 Show detected domain names on the Applications Seen page:** Domain names are now displayed on the Applications Seen page in the GUI.
------
- **I95-39298 STEP Waypoint NAT Support:** When a resolved external NAT address is present in the adjacency configuration, it is used when advertising the peer path in the STEP router document.
------
- **I95-39374 Multi-core TE and Per-AdjacencyTE feature interaction:** Resolved an issue where it was possible for a packet on a non-scheduled adjacency to make it into the schedulerGroup when adjacency-only Traffic Engineering was enabled.
------
- **I95-39377 Provide progress while PCLI connects to 128T:** The system now provides progress to prevent users from attempting to use the PCLI before the system is fully operational. 
------
- **I95-39380 Inline performance monitoring causes metadata parsing errors:** Added validation for the presence of performance-monitoring profile when enabled.
------
- **I95-39406 Installer Update/software upgrade dependencies:** Upgrades from the Conductor now require an updated Installer before downloading and installing software to the Router. 
------
- **I95-39483 Validate/Commit And Diff Endpoints Not Filtered by RBAC:** Validate, Commit and diff operations now honor RBAC settings.
------
- **I95-39492 The GUI displays configuration changes "Ready to Commit" when there are no pending config changes:** This issue has been resolved.
------
- **I95-39538 Periodic disruptions in service:** Resolved an issue in the HttpParser for application identification when parsing malformed HTTP traffic.
------
- **I95-39555 Active interface out-of-sync with the leadership status for the underlying device interface:** Resolved an issue when both nodes of an HA router start 128T at a similar time, the active node for a redundant interface is not determined correctly, resulting in a failure to forward traffic.
------
- **I95-39558 After setting a custom favicon, clearing the icon does not reset to the default:** This issue has been resolved. 
------
- **I95-39568 Error when running "compare config running candidate" after adding second domain-server:** Resolved an issue where a user-ordered list was not being parsed properly.
------
- **I95-39587 Duplicate entries in show commands on PCLI when using bulk-edit:** Resolved an issue with the use of bulk-edit in the PCLI.
------
- **I95-39639 Packet transmit fails when Traffic Engineering is enabled with multiple worker cores.** This issue has been resolved.
------
- **I95-39641 `show device-interface extended-stats` command reported unavailable when the virtio device does not expose extended stats:** Resolved an issue with the show device-interface extended-statistics/registers command.
------
- **I95-39695 Delete Session feature not working:** Resolved an issue with the Session Details dialog.
------
- **I95-39701 Remote router login ignores 'User' selection:** Resolved an issue where a parameter name mismatch caused the current user to be ignored.
------
- **I95-39711 PCLI unhandled error when exporting a config using a name that has already been used.** The PCLI now provides a clear error message describing the issue.
------
- **I95-39764 Per Adjacency Traffic Engineering Crashing For Multiple Paths on Configuration:** Resolved an issue when receiving adjacencies with out of order path-indexes. 
------
- **I95-39780 Hugepage tool incorrectly calculates hugepages based on Tenant table:** Revised the scaling of the Hugepage tool. 
------
- **I95-39782 The aggregate stats pull from highway logs provides more detail than necessary:** Reduced the unnecessary detail. 
------
- **I95-39792 Import ISO command results in terminal launch not working:** Resolved a conflict between an ISO upgrade and invoking a terminal window at the same time. 
------
- **I95-39796 Conductor and Authority missing from GUI on first login:** Added multiple retries to retrieve system data upon first login. 
------
- **I95-39818 Conductor logging out when selecting a router mid-upgrade:** The conductor no longer logs out when it runs into the error. 
------
- **I95-39859 Conductor unable to display some PCLI commands after upgrade to 5.1:** This issue has been resolved.
------
- **I95-39936 Pagination for the output of `show fib` does not work correctly:** Pagination headers are now handled correctly, and pagination is supported in the `show fib` output. 
------
- **I95-39985 Template save error:** Resolved an issue where creating persistent fields on an **existing** template in Advanced Mode generated a validation error and the template changes were not saved. 
------
- **I95-39992 AuthClient request queue fills up with concurrent requests:** Resolved an issue with using authenticated REST APIs when under heavy load. 

## Release 5.1.1
**Release Date:** April 12, 2021

### New Features and Improvements

- **Support for Installer 3.0, providing token-based software access.** For Installation and Upgrade information, refer to [Conductor Interactive Installation](intro_installation_bootable_media.md). 

### Resolved Issues

- **I95-39650 Repository access tokens provisioned on the Conductor are not automatically distributed to its managed routers.** Access Tokens are now distributed to managed routers. 
------
- **I95-39649/BEL-42 Conductors/Routers on initial deployment not going to running state.** Resolved an issue where Conductors or Routers on initial deployment would not transition to a running state until a certificate was added. 

### Caveats

- **I95-39798 Token Update and Available Version Update stuck on GPG key access:** In rare occasions the GPG key access may cause the token and version updates to hang, and block access to the software. To prevent this issue, log out of all open web and PCLI sessions before applying the token. 

## Release 5.1.0

**Release Date:** April 12, 2021

**Includes changes from:** [Version 4.5.5 February 10, 2021](release_notes_128t_4.5.md#release-455)

### New Features and Improvements 

- **[I95-19132 Role-Based Access Control](config_RBAC.md):** Role-Based Access Control provides a mechanism for an Administrator to create Access Management Roles that allow specific access to 128T resources such as routers, tenants, services, and other Authority-level configuration objects, as well as actions such as install, upgrade, or download.  
------
- **[I95-21775 BGP VRF Support:](concepts_learning_VRF_routes.md)** Support for learning VRF routes through BGP and the associated routing tables has been added. Virtual Routing and Forwarding (VRF) instances make it possible to maintain multiple routing tables with overlapping address spaces in one router.
------
- **[I95-21776 Ethernet Over SVR Support:](concepts_EthOverSVR.md)** Ethernet Over SVR (EoSVR) is a proprietary 128 Technology protocol that extends the Ethernet broadcast domain across multiple sites. EoSVR provides a site to site ethernet broadcast domain between 128T routers with increased security and efficiency, without the overhead of IP packet encapsulation.
------
- **I95-23206 Custom Chart Legends:** This feature allows the user to assign a custom series name to each trace in the legend by hovering over the series name, and clicking on the displayed icon. The pop up dialog allows you to assign a name to the series.
------
- **I95-24412 Dual PPPoE Per Node Support:** [Multiple PPPoE interfaces can be configured on a single node.](howto_config_PPPoE.md)
------
- **I95-27678 [Configurable Audit Events](config_audit_event.md):** Audit events such as traffic, admin, and system can be configured with this feature. The persistence of those events is now configurable.
------
- **I95-33016 Router and Node Page Dynamically Refresh Analytics and State:** Router and Node pages automatically refresh data at 30 second intervals. 
------
- **I95-33385 Implement dark-mode in GUI:** There is a switch in the User Profile under Preferences allowing a user to switch the display to "dark mode"; a black background with light text. 
------
- **I95-34919 Show Commands for Services:** The [`show service path`](cli_reference.md#show-service-path) and [`show fib`](cli_reference.md#show-fib) commands have been enhanced to provide more granular path-related debugging. 
------
- **[I95-35051 Provide a way to generate & stage all auto-generated configuration](cli_reference.md#create-config-autogenerated):** The `create config autogenerated` command has been added, which forces re-generation of all automatically generated configuration items, and stages the configuration changes into the current candidate configuration. This command serves only to aid in debugging, and allows you to validate, inspect, and make edits, without committing the changes.
------
- **I95-35952 PCLI support for multi-line fields:** Configurations with multi-line input fields are restricted to a single line when displayed. 
------
- **[I95-36118 Add a command to compare running/candidate config to an exported config](cli_reference.md#compare-config):** Added the ability to specify _a previously exported configuration file_ to compare against the running or candidate config allows you to compare configurations **without** having to import the exported config into the candidate config for comparison. 
------
- **I95-36912 PCLI commands accept resource-group wherever possible:** Commands that can specify `router` all on the conductor can now target a resource group using the new `group` argument. `router` and `group` are mutually exclusive, so only one can be specified at a time.
------
- **I95-37251 Provide an Interface description on hover:** An interface description is provided in the GUI on hover. 
------
- **I95-37443 Latency/Jitter/Loss chart:** A chart showing the latency, jitter, and loss for the selected peer path over time is accessible by clicking the **Source** field in the Peer Paths table on the Router page. 
------
- **I95-37473 PCLI: Advanced mode:** Advanced Mode allows viewing and editing configuration fields that are normally hidden and automatically generated by 128T. The new mode is invoked by passing `--user-mode=advanced` to the PCLI at launch.
------
- **I95-37663 GUI rebrand for managed service providers:** The Authority Settings now has a 'Theme' section that allows you to change the primary color, secondary color, and main icon of the GUI. 
------
- **I95-38212 Restart System From the Node Panel:** The Process Management button has been added to the top of the Node Panel in the GUI. When selected, a list of operations displays, allowing the user to; Start, Stop, or Restart the 128T Conductor or Router. The option to Reboot the OS is also available.
------
- **I95-38514 View User Activity:** Added a user activity table to the GUI on the Users page, as well as adding a new [PCLI command `show user activity`](cli_reference.md/#show-user-activity).
------
- **I95-38642 Form Based Template Instantiation:**  An administrator can now define a JSON Schema to create a template for variables so a user can fill out the variables in a simple form.
------
- **I95-38920 MIB additions - router metadata:** The following fields have been added to the T128-SYSTEM MIB:
	- Router Description
	- Router Location
	- Router Coordinates
	- Node Description
	- Node Location
------
- **I95-39017 SR-IOV VLAN filtering:** VLAN filtering has been enabled for the SR-IOV virtual functions to support the NFX150 and NFX250 platforms.
------
:::note
Please refer to the [**Caveats**](#caveats) section for important information prior to installation.
:::

### Resolved Issues

- **I95-30812 PCLI session terminated when actively running commands:** PCLI sessions now recognize all activity. 
------
- **I95-30883 Add Enumeration Description to Combo Dropdown in Edit Config Pages:** GUI drop downs now display descriptions.
------
- **I95-31882 Inconsistency in `show alarm` output:** The `show alarms` output message is now consistent for shelved alarms and active alarms.
------
- **I95-33272 End port field validation accepts leading space:** An issue where the PCLI accepted a leading space in some fields has been resolved. Validation now removes leading and trailing spaces for number types.
------
- **I95-33526 No indication that a restore configuration operation has completed:** Users are now directed to view the restored configuration, indicating that the operation has completed. 
------
- **I95-33973 PCLI suggesting commands not available in the config context:** This issue has been resolved. 
------
- **I95-34443 Provisioner status in router dialog not matching the Asset status in router page:** Asset Reconciliation now takes place automatically every 1.5 minutes in the GUI to assure the states of all assets are correctly reflected in the UI.
------
- **I95-35521 Ambigious validation error:** Errors now more clearly identify the source of the error.
------
- **I95-35646 Wrong date for weekday in date picker:** The date-picker logic has been updated to resolve this issue. 
------
- **I95-35783 Bootstrap DHCP server not resilient to power loss or abrupt shutdown:** The handling of abrupt shutdowns has been strengthened.
------
- **I95-36053 High number of System Events on 128T Config changes:** Added a filter to audit logs of type SERVICE-START and SERVICE-STOP based on service to filter just the required services.
------
- **I95-36366 Security keys are not automatically generated for unmanaged router:** Security keys are now automatically generated. 
------
- **I95-36397 / I95-36614 Auto Generated DHCP Server Interface Down:** Generate namespace ID with node specific namespace name for device interface to prevent namespace id collision.
------
- **I95-36509 Validation may be terminated or not execute if the 128T SSR experiences a disconnect from the conductor:** This issue has been resolved.
------
- **I95-36761 Configuring `default-route-distance` under bgp causes a fault in the PCLI:** This issue has been resolved by providing defaults for default BGP distances (ebgp, ibgp, and local).
------
- **I95-37002 Help text on shared-mac parameter should be more explicit:** The description has been updated to provide additional information. 
------
- **I95-37181 LTE Modem denied from network with 128T Service Running:** Resolved an issue where UDP packets larger than the network-interface MTU causes Rx Error on the LTE interface, resulting in denial of the LTE modem.
------
- **I95-37699 `save tech-support-info` may generate a corrupted zip file on systems that have greater than 10K alarms:** Added a `limit` argument to PCLI show events and Tech Support to resolve this issue.  
------
- **I95-37728 `show rib summary` hangs/return no data:** Added support to proxy the routing engine endpoint in the web server, and provided support for the vrf argument in `show rib summary`.
------
- **I95-37770 Password Obfuscator consumes password as a command line argument:** This issue has been resolved. 
------
- **I95-37826 Ensure permissions on bootloader config are configured:** Appropriate permissions are set on bootloader config files.
------
- **I95-37832 Ensure no world writable files exist:** Added software tools to avoid world writable files. 
------
- **I95-37910 AWS c5.xlarge instance shows 2 cores in GUI:** Custom Report charts now persist the displayed data even if an error occurs, specifically if internet connection drops or a node becomes unavailable. A small error indicator now appears above the chart, which can be hovered and displays the error.
------
- **I95-38378 Salt-minion config broken after enabling asset connection resiliency:** The minion config is now loaded on conductor migration operations at time of operation. 
------
- **I95-38389 PDM gets pegged at 100% which makes the GUI and PCLI inaccessible:** The config export process has been made more efficient to reduce the chance of a race condition. 
------
- **I95-38393 Router Cannot Get Past Connected State:** Resolved an issue where assets could become stuck in Connected state.
------
- **I95-38458 PCLI fails to start after upgrade:** Resolved an issue where caching errors prevented 128T from starting. 
------
- **I95-38474 The `router > dns-config` does not account for the immutable bit on `/etc/resolv.conf`:** Resolved an issue with the DNS proxy not working due to the immutable bit set by ISO. 
------
- **I95-38495 Duplicate link-layer-address configuration causes DHCP server to fail to start:** A configuration validation error is shown when duplicate link-layer-address are configured.
------
- **I95-38500 CVE Medium: binutils (CESA-2018:3032), binutils (CESA-2019:2075):** Added binutils to deprecated packages.
------
- **I95-38543 salt_master memory leak using up all conductor memory:** This issue has been resolved with an update to saltstack 3002.2
------
- **I95-38666 Management Services and routes may not be generated for PPPoE:** Resolved an issue where `management-over-forwarding` was not generating service or service-route config for PPPoE interfaces.
------
- **I95-38682 CVE Medium: Rebuild Python:** Python has been updated to address vulnerabilities.
------
- **I95-38694 SNMP ifTable does not conform to correct IF-MIB representation of high speed interfaces:** The `ifSpeed` field in the legacy `ifTable` has been set to conform with the higher speed values. 
------
- **I95-38728 Interface configuration on Azure:** Resolved an issue where a module was not loaded by default, causing the interface configuration to fail. 
------
- **I95-38768 VMXNet3 driver not functional:** A fix has been applied to the ip header checksum and is now calculated via hardware offload.
------
- **I95-38830 Validation error when device-interface type is set to vmbus-uuid and forwarding is disabled:** Resolved a configuration problem wherein vmbus-uuid could not be configured unless forwarding was explicitly configured.
------
- **I95-38832 Intermittent PCLI command failure when issues queries against managed routers:** Resolved an issue that resulted in unresponsive web and command line interfaces caused by certain configuration sizes.
------
- **I95-38919 Prevent DNF Corruption prior to Plugin Install:** Added corruption detection/remediation to plugin installation.
------
- **I95-38963 Address sudo CVE-2021-3156:** Upgraded to later version.
------
- **I95-38986 Template parse error is difficult to find:** Added additonal context to the error to help identify.
------
- **I95-39011 AutomatedProvisioner process consuming 300%:** Resolved by increasing the timeout for local rpm queries. 
------
- **I95-39036 dns-config=automatic should be allowed when using PPPoE:** Resolved an issue where management over pppoe interface does not allow dns-config mode to be configured.
------
- **I95-39163 Long propagation times in FIB entries:** The routing agent implementation was improved to enable faster processing of configuration changes when there are services with a large port range.
------
- **I95-39167 IP violations caused by un-natted packets:** Resolved an issue where ICMP unreachables on an LTE interface are generating IP violations causing an unexpected disconnect.
------
- **I95-39186 Interactive Install ISO not shutting down properly after install:** This issue has been resolved.  
------
- **I95-39187 Use same time format in Alarms and Event History:** Time format is now consistent between Alarms and Event History. 
------
- **I95-39190 CVE Medium: CESA-2021:0153 dnsmasq:** Upgraded dnsmasq to version 2.76-16.el7_9.1 as a remediation for CESA-2021:0153.
------
- **I95-39239 Event persistence gets stuck on a high number of events:** This issue has been resolved. 
------
- **I95-39278 CVE High/Medium: Saltstack Updates:** Updated saltstack to 3002.5 to address Saltstack CVEs.

### Caveats

- **I95-39023 Conductor Upgrade process forces a log out from the GUI:** An issue has been identified that when upgrading the conductor, the user is logged out of the GUI, and presented with an error message when attempting to log back in. The installation is running, and does complete. Log in is again available after the system has restarted. 
------
- **I95-39406 Installer Fails to Update:** In some situations, such as an installer conflict, the Installer will fail to update, but the 5.1 software has downloaded and installed. 
------
- **I95-38622 5.1.0 Kernel Upgrade Required for Wireguard Support:** Support for the wireguard plugin is not available on a router with 5.1.0 installed. The wireguard plugin can be installed on a Conductor, provided that the Routers are running a version older than 5.1.0. 
------
- **I95-37050 Remove Deprecated API Fields:** 

	- "averageBandwidth" and "traffic" fields have been removed from the `/router/{router}/node/{node}/deviceInterface` response message.

	- "averageBandwidth" and "traffic" fields have been removed from `/router/{router}/node/{node}/networkInterface` and `/router/{router}/node/{node}/deviceInterface/{deviceInterface}/networkInterface` response message.

	- "traffic", "averageBandwidth", "sessions", "sessionArrivalRate", "cpu", "disk", "memory", and "platform" have been removed from the `/router/{router}/node and /router/{router}/node/{node}` response message.

	- "bandwidth", "sessions", "sessionArrivalRate" and "bytesTransmitted" fields have been removed from `/service and /service/{service}` response message.

	- "averageBandwidth", "traffic", "sessions", and "sessionArrivalRate" fields have been removed from `/serviceClass` response message.

	- "bandwidth", "sessions" and "traffic" fields have been removed from `/tenant and /tenant/{tenant}` response message.

	- The following endpoint has been removed entirely: `/router/{router}/node/{node}/networkInterface/byDeviceInterface`
