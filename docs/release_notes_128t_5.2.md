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
**Release Date:** May 10, 2021

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
- **I95-38514 View User Activity:** Added a user activity table to the GUI on the Users page, as well as adding a new [PCLI command `show user activity`](cli_reference.md/#show-user-activity).
------
- **I95-39303 `show application modules` added:** [`show application modules status`](cli_reference.md/#show-application-modules-status) displays application names and transport information of a module. [`show application modules registration`](cli_reference.md/#show-application-modules-registration) displays registered application modules. 
------
- **I95-39336 Best Path Criteria:** The [service-policy](config_reference_guide.md/#service-policy) has been enhanced to include values that allow the the router to select the best path based on the current latency/MoS values of the paths. 
------
- **I95-39544 Non-persistent template fields:** You now have the option to create non-persistent template input parameters, allowing the template to create unique instances per instantiation.
------
- **I95-39580 Reference Candidate Config Values in a Template:** Using a custom tag in Advanced Mode allows you to reference a value from a candidate configuration. For details about using this tag in Advanced Mode, refer to [Pulling Values from the Candidate Configuration](config_templates.md).
------
- **I95-39602 Additional detail for `show peers hostnames`:** The `show peer hostnames` command now displays additional supporting information: Node, Destination IP address, and Status. 

### Resolved Issues

------
- **I95-37101 PCLI Updates for `show stats since` command:** The PCLI notes inconsistencies in data between current values and historical ones to indicate when the data may not be accurate.
------
- **I95-38510 Security mismatch on HA nodes dropping internode traffic:**  Resolved an issue where dynamically reconfiguring inter-node-security may cause all internode traffic to be dropped.
------
- **I95-39477 Configuration validation failure when conductor non-forwarding fabric interfaces are configured in different subnets:** Updated to display a warning to the user to correct the issue, rather than failing.
------
- **I95-39811 Not showing TCP and UDP endpoints:** Resolved an issue where the service was not displaying Office 365 endpoints. 
------
- **I95-39817 General CPU Stats not showing in Conductor UI after upgrade:** Resolved an issue where stats were not captured. 
------
- **I95-39854 Management over Forwarding not bringing up Eth0 on shutdown:** Resolved an issue preventing devices from unbinding cleanly. 
------
- **I95-39883 Use String Name for Protocol:** Resolved an issue where the protocol was displaying as a number instead of a name. 
------
- **I95-39953 Spike in IPFIX records:** Resolved a race condition causing a collector to enter an infinite loop.
------
- **I95-39982 module registration removal not refreshing services:** App-ID services now refresh correctly. 
------
- **I95-40036 Attempting to save Configurations that are too large:** The Data Manager log an error when a configuration to be saved is larger than the buffer. 
------
- **I95-40060 `show session captures` not displaying active captures:** Updated the query argument to correctly display session captures for all services.

## Caveats

- **I95-26627 Prevent static route interface next hops with the same global id:** If two interfaces with the same global id are an HA pair, only one should be permitted as a static route next hop. If the configuration is committed and one of the interfaces is deleted, FRR will delete the entire static route. 

