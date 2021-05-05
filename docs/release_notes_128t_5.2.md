---
title: 128T 5.2 Release Notes
sidebar_label: '5.2'
---
:::info
Issues resolved in a release are merged into subsequent releases chronologically AND numerically. 

If you do not see an issue listed below, it may have been resolved in another recently released version. A link to the Release Notes for the most recent chronological release of SSR / 128T Software is provided.

Alternatively, refer to the **[List of Releases](about_releases.md)** page for release dates and links to all SSR / 128T Release Notes; or, if you know the Issue ID Number, enter that into the Search field at the top right of this page. 
:::

## Release 5.2.0
**Release Date:** May 7, 2021

### New Features and Improvements

- **I95-61 Service Health Learning and Fault Avoidance:** In-path metrics and heuristics are now able to be used for server reachability and to determine network health. See [Service Health Learning](config_service_health.md) for more information.  
------
- **I95-17681 Pre- and Post-Login Banners:** Pre- and post-login banners can be configured by selecting Configuration, clicking on the Authority tile, and scrolling down to the Web Messages field. 
------
- **I95-21631 Customized Tables:** Support has been added for user customizable tables in the Custom Reports view of the GUI. Tables can have multiple metrics and display sum, average, min or max values across the selected time range.
------
- **I95-33451 Support Persistence for [In-Memory Metrics](config_in-memory_metrics.md):** Metrics intended for persistence can be configured as part of a Metrics Profile. Profiles are configured at the Authority level and referenced by the relevant routers. Each Profile specifies a number of metrics and the desired parameter filters.
------
- **I95-36657 Improve Packet throughput of KNI-based Interfaces:** KNI buffer performance has been enhanced to handle large bursts of traffic. 
------
- **I95-37296 Native 128T Support for GRE:** Native support (non-plugin) is availble for GRE Tunneling, providing better performance. For more information, see [Native GRE Tunnels](config_gre_tunnel.md).
------
- **I95-37459 Show Commands for Services:** The [show fib](cli_reference.md#show-fib) and [show fib lookup](cli_reference.md#show-fib-lookup)commands have been enhanced to provide more granular path-related debugging.
------
- **I95-37510 [AppID Modules](concepts_appid.md#appid-using-modules) can be run as systemd unit:** The AppId manager now can handle the module execution as systemd unit instead of subprocess, in addition to the existing script-based method. Use REST APIs to propagate module registrations and results with AppId manager. 
------
- **I95-38081 Automatic generation of MSS Value:** The [network-interface configuration object](config_reference_guide.md#network-interface) now has an automatic option for the enforced-mss value. This automatically calculates the MSS of the network interface from the interface session MTU.
------
- **I95-38303 `show application modules` added:** [`show application modules status`](cli_reference.md/#show-application-modules-status) displays application names and transport information of a module. [`show application modules registration`](cli_reference.md/#show-application-modules-registration) displays registered application modules. 
------
- **I95-38514 View User Activity:** Added a user activity table to the GUI on the Users page, as well as adding a new [PCLI command `show user activity`](cli_reference.md/#show-user-activity).
------
- **I95-38968 128T as VNF on Juniper NFX:** Please refer to the [Deploying Branch SSR SD-WAN Router Using NFX Series NextGen uCPE](https://www.juniper.net/documentation/us/en/software/nce/ssr-nfx/topics/example/ssr-nfx-ucpe-example.html) document for configuration details. 
------
- **I95-39336 Best Path Criteria:** The [service-policy](config_reference_guide.md/#service-policy) has been enhanced to include values that allow the the router to select the best path based on the current latency/MoS values of the paths. 
------
- **I95-39544 Non-persistent template fields:** You now have the option to create non-persistent template input parameters, allowing the template to create unique instances per instantiation.
------
- **I95-39580 Reference Candidate Config Values in a Template:** Using a custom tag in Advanced Mode allows you to reference a value from a candidate configuration. For details about using this tag in Advanced Mode, refer to [Pulling Values from the Candidate Configuration](config_templates.md).
------
- **I95-39602 Additional detail for `show peers hostnames`:** The `show peer hostnames` command now displays additional supporting information: Node, Destination IP address, and Status. 

### Resolved Issues

- **I95-29583 Default Language Setting:** Changes to the default language are now saved per user, not per system.
------
- **I95-37101 PCLI Updates for `show stats since` command:** The PCLI notes inconsistencies in data between current values and historical ones to indicate when the data may not be accurate.
------
- **I95-38510 Security mismatch on HA nodes dropping internode traffic:**  Resolved an issue where dynamically reconfiguring inter-node-security may cause all internode traffic to be dropped.
------
- **I95-39298 STEP Waypoint NAT Support:** When a resolved external NAT address is present in the adjacency configuration, it is used when advertising the peer path in the STEP router document.
------
- **I95-39374 Multi-core Traffic Engineering and Per-Adjacency Traffic Engineering feature interaction:** Resolved an issue where it was possible for a packet on a non-scheduled adjacency to make it into the schedulerGroup when adjacency-only Traffic Engineering was enabled.
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
- **I95-39602 Show peer path status under `show peers hostnames`:** Replaced redundant Router column with `Node`, and added a `Status` column.
------
- **I95-39632 Toggling traffic engineering causes power saver to fail:** Resolved an issue that causes power saver to fail on muti-core systems when traffic engineering is toggled. 
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
- **I95-39782 The aggregate stats pull from highway logs provides more detail than necessary:** Reduced the unnecessary detail. 
------
- **I95-39796 Conductor and Authority missing from GUI on first login:** Added multiple retries to retrieve system data upon first login. 
------

## Caveats

- **I95-26627 Prevent static route interface next hops with the same global id:** If two interfaces with the same global id are an HA pair, only one should be permitted as a static route next hop. If the configuration is committed and one of the interfaces is deleted, FRR will delete the entire static route. 

