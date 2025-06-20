---
title: 128T 5.0 Release Notes
sidebar_label: '5.0'
---

:::info
Issues resolved in a release are merged into subsequent releases chronologically AND lexicographically. 

If you do not see an issue listed below, it may have been resolved in another recently released version. A link to the Release Notes for the most recent chronological release of SSR / 128T Software is provided.

Alternatively, refer to the **[List of Releases](about_releases.md)** page for release dates and links to all SSR / 128T Release Notes; or, if you know the Issue ID Number, enter that into the Search field at the top right of this page. 
:::

## Release 5.0.1
**Release Date:** April 12, 2021 

### Resolved Issues Requiring Configuration Changes

- **Support for Installer 3.0, providing token-based software access.** For Installation and Upgrade information, refer to [Conductor Interactive Installation](intro_installation_bootable_media.mdx). 

### Resolved Issues

- **I95-39650 Repository access tokens provisioned on the Conductor are not automatically distributed to its managed routers.** Access Tokens are now distributed to managed routers. 
------
- **I95-39649/BEL-42 Conductors/Routers on initial deployment not going to running state.** Resolved an issue where Conductors or Routers on initial deployment would not transition to a running state until a certificate was added.

### Caveats

- **I95-39798 Token Update and Available Version Update stuck on GPG key access:** In rare occasions the GPG key access may cause the token and version updates to hang, and block access to the software. To prevent this issue, log out of all open web and PCLI sessions before applying the token. 

## Release 5.0.0
**Release Date:** December 18, 2020

:::warning
SSH Root Login is not permitted. 

Before upgrading, ensure that there is at least one user on each 128T system that has sudo privileges. Failure to do so may result in the loss of remote management connectivity to the 128T Networking Platform. Please see the [Installation Overview](intro_installation.md) for additional information. 
:::

### New Features and Improvements

- **I95-9152 [PCLI configuration help text identifies required fields](cli_reference.md#required-fields):** When using the PCLI configuration command, the required fields are now identified within the Help text. 
------
- **I95-9242 [Service and Topology Exchange Protocol (STEP)](concepts_STEP.md):** STEP facilitates the design and scale of new (and exisiting) networks by network administrators, and provides insight into service availablity across the network. STEP is designed for service exchange and reachability to those services used by routers to efficiently route packets for each service. 
------
- **I95-15618 [Auto completion](cli_reference.md#clear-arp):** Auto completion is now available on the `clear arp` PCLI command.
------
- **I95-20757 [Displaying alarm history](cli_reference.md#show-events):** Displaying the Alarm History within the PCLI using `show events alarm` now supports relative timestamps.
------
- **I95-22350 [Hierarchical Services](bcp_service_and_service_policy_design.md#hierarchical-services)** allow you to create groupings of services that inherit properties from one another.
------
- **I95-25513 Display 128T, Installer, and Installer Repo Versions:** The GUI and CLI both display the software version, installer version, and installer repo versions. 
------
- **I95-27886 Packet Duplication for Inter-Node High Availability:** Packet duplication over multiple inter-node links helps reduce packet loss during transmission. For protocols such as UDP that do not verify packet integrity, this helps ensure full transmission of traffic. See [service-policy](config_reference_guide.md#service-policy) for usage information. 
------
- **I95-28531 Application Categorization:** Application Identification/Categorization utilizes a database of traffic categories, such as “News”, “Social Media”, “Health”, “Sports”, etc. These categories can be assigned to services, which can then be prioritized, monitored for traffic levels, or blocked for security purposes. Each category is populated with a list of domain names associated with the type of traffic.
------
- **I95-31218 [Configurable BFD Hold-Down Timer](howto_tune_bfd.md#damping):** BFD (Bidirectional Forwarding Detection) is used to detect path failures between routers. A configurable hold-down time and dynamic-damping field in the [BFD settings](config_reference_guide.md#bfd-router), shared at the router, peer, interface neighborhood, and adjacency levels, provides BFD damping functionality when links are unpredictable. 
------
- **I95-32508 Binding Device Interface Identifiers in Azure:** Beginning with the release of 5.0.0, the VMBus UUID is used to identify the device interfaces on a router in Azure cloud deployments. Use of the PCI address is no longer supported. For the steps to identify and configure the VMBus UUID on each device interface, please refer to [Configuring a Device Interface with VMBus UUID](intro_installation_azure.md#configuring-a-device-interface-with-vmbus-uuid). Please note that for upgrades to version 5.0 and higher, the VMBus UUID must be manually configured on the device interfaces using this procedure. 
------
- **I95-32558 [In-line Flow Performance Monitoring](config_flow_perf_mon.md):** Inline performance metrics have been enhanced to achieve a finer granularity than what is currently available via BFD. Statistics are now collected per path, traffic class, and protocol (TCP or UDP) level. Sessions can be forwarded using more granular SLA metrics. 
------
- **I95-33376 Address Latest Vulnerabilities:** Security Vulnerability testing is ongoing, and fixes are in place for identified issues. 
------
- **I95-33395 Improved PCLI startup time by 60%:** The PCLI start up process has been streamlined to be quicker and more efficient.
------
- **I95-34217 GraphiQL API explorer and request builder within GUI:** The GraphiQLExplorer is an extension to the existing GraphiQL interactive API viewer in the 128T GUI. The addition of the GraphiQLExplorer makes it even easier to write 128T configuration queries and explore schema types. A new sidebar labeled “Explorer” contains a list of the top-level queries used throughout the GUI. Click on each one to expand their nested properties, which reflect the GraphQL schema structure.
------
- **I95-34788 Support for bulk configuration edits via REST:** The 128T REST API can be used to add a new configuration consisting of multiple objects, or to modify or patch multiple levels of configuration, with a single REST request. 
------
- **I95-34823 About page includes link to online documentation:** The 128T GUI now includes a link to the online documentation set.
------
- **I95-35150 PCLI Clone Configuration:** The clone command duplicates the configuration data from an existing router into a new router with a new name, and stages it to the candidate configuration.
------
- **I95-35190 [PCLI bulk paste configuration](concepts_pcli.md#paste-config):** The PCLI detects configuration entered in bulk and accepts input in either show config native format or flat format.
------
- **I95-35212 [Adaptive Encryption](sec_adaptive_encrypt.md):** Most end hosts employ secure protocols such as TLS and IPSEC. Adaptive Encryption is aimed at identifying this already encrypted traffic and providing security for non-encrypted traffic by encrypting it through the 128T Router. This eliminates the performance penalty of encrypting traffic that is already encrypted. 
------
- **I95-35741 [PCLI plugin service commands](cli_reference.md#manage-plugin-install):** The plugin lifecycle can now be managed through the PCLI. 
------
- **I95-36876 `show assets software` includes Repository information:** The PCLI command [`show assets software`](cli_reference.md#show-assets-software) includes the repository for each available software version. 
------
- **I95-38170 Updated path metrics for `show service-path`:** Latency, loss, and jitter metrics are displayed when they are available, even if performance monitor is not enabled for the path.   
------

### Resolved Issues

- **I95-20718:** Keywords as Configuration Values - the PCLI now prevents the use of keywords as configuration values. 
------
- **I95-29643** Changing the name of an existing configuration object to one that already exists merges the two objects.
------
- **I95-30670** Version mismatch alarm in HA pair is not generated when the salt minion is disconnected on one of the nodes in the pair.
------
- **I95-32016** Output from `show config out-of-sync` displays `49 years` for disconnected routers.
------
- **I95-34065** Leading and trailing whitespace is now correctly trimmed from configuration input fields.
------
- **I95-34078** Conductor asset status is empty.
------
- **I95-34448** Viewing "Event History" in GUI can result in an error dialog with the following content:
  ```
  Error: TypeError: expected dynamic type `int/double/bool/string', but had type `null'
    at t.f [as project] (https://1.2.3.4/21.chunk.4855571a0034f587fb2f.js:1:28085)
    at t._next (https://1.2.3.4/main.98467ce8a2ab8ddd6c0c.js:29:145514)
    at t.next (https://1.2.3.4/main.98467ce8a2ab8ddd6c0c.js:16:68940)
    at https://1.2.3.4/main.98467ce8a2ab8ddd6c0c.js:41:211792
  ```
------
- **I95-34775** Linux save-tech-support does not output the archive location information.
------
- **I95-34908** GraphiQL produces an error when collapsing the sidebar.
------
- **I95-35020** PCLI command history was previously unbounded.
------
- **I95-35238** PCLI prompt shows incorrect location on when the object key has changed.
------
- **I95-35722** PCLI warning message formatting is now consistent with error messages.
------
- **I95-35892** Regex use during search and replace config negatively impacts performance. 
------
- **I95-36645** UI: Bytes converter does not handle values larger than Terabyte (TB).
------
- **I95-36828** Unable to acquire logs through GUI when `remote-login` is disabled.
------
- **I95-36981** Upgrade and restart of 128T caused PCLI error state. 
------
- **I95-37519** Updating session-types can cause erroneous config abort.
------
- **I95-38084** Resolved an issue where the snmpd service was starting before the configuration had been received causing the failure alarm.
------
- **I95-38259** Update the kernel to 3.10.0-1160.6.1 to address CESA-2020:5023 CVE.
------
- **I95-38395** Resolved an issue where a TCP FIN received before the data that proceeded it could cause a stuck flow.
------
- **I95-38438** Resolved an issue where, during an upgrade, the standby AP incorrectly reports the asset state, causing an error to be thrown in the PCLI. 
------
## Special Considerations

- **I95-12833** Provisioning deprecated configuration fields now prompts for confirmation.
------
- **I95-20718** PCLI now produces a warning when creating configuration objects with the keywords ("delete", "force", "move", "clone", "all") as their name.
------
- **I95-34624** Remove Automated Provisioner driven install from 128T.
------
- **I95-34983, I95-35892** Remove unused PCLI Commands.
------
- **I95-36096** PCLI sessions are now captured in their own respective log file. To view PCLI logs, run `journalctl -u PCLILogger`. For additional information about accessing the PCLI logs, see [Understanding Logs](ts_logs.md).
------
- **I95-36102** `compare config` now defaults to `compare config running candidate` when no additional arguments are supplied.
------
- **I95-36525** Due to known vulnerabilities, only TLS versions 1.2 and 1.3 are supported. We do not support TLS 1.0 and 1.1.

## Caveats

- **I95-35521** pcli may provide a validation error but does not provide the specific configuration in error.

  _**Corrective Action:**_ If a validation error is provided, review the configuration of each sub list between the items identified in the error response provided. For example, the same vlan id cannot be used for different networks interfaces on the same device interface.
