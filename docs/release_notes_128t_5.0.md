---
title: 128T 5.0 Release Notes
sidebar_label: '5.0'
---

## Release 5.0.0

:::warning
SSH Root Login is not permitted. 

Before upgrading, ensure that there is at least one user on each 128T system that has sudo privileges. Failure to do so may result in the loss of remote management connectivity to the 128T Networking Platform. Please see the [Installation Overview](intro_installation.md) for additional information. 
:::

### New Features and Improvements

- **I95-9152 [PCLI configuration help text identifies required fields](cli_reference.md#required-fields):** When using the PCLI configuration command, the required fields are now identified within the Help text. 
------
- **I95-9242 Service and Topology Exchange Protocol (STEP):** STEP facilitates the design and scale of new (and exisiting) networks by network administrators, and provides insight into service availablity across the network. STEP is designed for service exchange and reachability to those services used by routers to efficiently route packets for each service. 
------
- **I95-15618 [Auto completion](cli_reference.md#clear-arp):** Auto completion is  now available on `clear arp` PCLI command.
------
- **I95-20757 [Displaying alarm history](cli_reference.md#show-events-alarm):** Displaying the Alarm History within the PCLI using `show events alarm` now supports relative timestamps.
------
- **I95-22350 [Hierarchical Services](bcp_service_and_service_policy_design.md#hierarchical-services)** allow you to create groupings of services that inherit properties from one another.
------
- **I95-22789 Dual LTE Support** Dual LTE support is valuable when connecting to two discrete wireless carriers when there is a need for an active/active LTE connection. For details, please see [LTE and Dual LTE Configuration](howto_lte.md).
------
- **I95-24412 Dual PPPoE Support:** Multiple PPPoE devices can be configured on a single node to leverage all PPPoE broadband access available at the location. This provides multiple failover paths in case of an outage. 
------
- **I95-27886 Packet Duplication for inter-node High Availability:** Packet duplication over multiple inter-node links helps reduce packet loss during transmission. For protocols such as UDP that do not verify packet integrity, this helps ensure full transmission of traffic.
------
- **I95-28531 Application Categorization:** Application Identification/Categorization utilizes a database of traffic categories, such as “News”, “Social Media”, “Health”, “Sports”, etc. These categories can be assigned to services, which can then be prioritized, monitored for traffic levels, or blocked for security purposes. Each category is populated with a list of domain names associated with the type of traffic.
------
- **I95-32558 In-line Flow Performance Monitoring:** Inline performance metrics have been enhanced to achieve a finer granularity than what is currently available via BFD. Statistics are now collected per path, priority, and protocol (TCP or UDP) level. Sessions can be forwarded using more granular SLA metrics. 
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
- **I95-35150 [PCLI Clone Configuration](cli_reference.md#clone):** The clone command duplicates the configuration data from an existing router into a new router with a new name, and stages it to the candidate configuration.
------
- **I95-35190 [PCLI bulk paste configuration](concepts_pcli.md#paste-config):** The PCLI detects configuration entered in bulk and accepts input in either show config native format or flat format.
------
- **I95-35741 [PCLI plugin service commands](cli_reference.md#manage-plugin-install):** Plugin installation and removal is handled through the PCLI. 

### Resolved Issues

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
- **I95-36645** UI: Bytes converter does not handle values larger than Terabyte (TB).
------
- **I95-36828** Unable to acquire logs through GUI when `remote-login` is disabled.

## Special Considerations

- **I95-12833** Provisioning deprecated configuration fields now prompts for confirmation.
------
- **I95-20718** PCLI now produces a warning when creating configuration objects with the keywords ("delete", "force", "move", "clone", "all") as their name.
------
- **I95-34624** Remove Automated Provisioner driven install from 128T.
------
- **I95-34983, I95-35892** Remove unused PCLI Commands.
------
- **I95-36096** PCLI sessions are now captured in their own respective log file.
------
- **I95-36102** `compare config` now defaults to `compare config running candidate` when no additional arguments are supplied.
------
- **I95-36525** TLS 1.0 is no longer supported.

## Caveats
