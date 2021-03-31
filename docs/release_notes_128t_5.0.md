---
title: 128T 5.0 Release Notes
sidebar_label: '5.0'
---

## Release 5.0.1

### New Features and Improvements

- **I95-22789** Dual LTE Support
  For information on how to configure the 128T with two LTE interfaces, please refer to the [How To: LTE](howto_lte.md) guide.
------
- **I95-24412 Dual PPPoE Per Node Support:** [Multiple PPPoE interfaces can be configured on a single node.](howto_config_PPPoE.md)
------
- **I95-39580 Reference Candidate Config Values in a Template:** Using the `fromconfig` tag in Advanced Mode, the user can now reference a value from the candidate configuration. For more information, see [Pulling Values from the Candidate Configuration](config_templates.md#pulling-values-from-the-candidate-configuration).

### Resolved Issues

- **I95-38543 salt_master memory leak using up all conductor memory:** This issue has been resolved with an update to saltstack 3002.2
------
- **I95-38728 Interface configuration on Azure:** Resolved an issue where a module was not loaded by default, causing the interface configuration to fail. 
------
- **I95-38830 Validation error when device-interface type is set to vmbus-uuid and forwarding is disabled:** Resolved a configuration problem wherein vmbus-uuid could not be configured unless forwarding was explicitly configured.
------
- **I95-39278 CVE High/Medium: Saltstack Updates:** Updated saltstack to 3002.5 to address Saltstack CVEs.
------
- **I95-39385 Configuration changes are incorrectly showing as pending:** Resolved an issue where the PCLI notifications were out of sync.
------
- **I95-39298 Support External NAT Addresses in the STEP Router tables:** Peer paths with external NAT configuration are now considered in STEP path computations.
------
- **I95-39492 GUI shows config changes "Ready to Commit" when there are not any pending config changes:** Resolved an issue where the PCLI notifications were out of sync causing incorrect notifications in the GUI.

## Release 5.0.0

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
- **I95-20757 [Displaying alarm history](cli_reference.md#show-events-alarm):** Displaying the Alarm History within the PCLI using `show events alarm` now supports relative timestamps.
------
- **I95-22350 [Hierarchical Services](bcp_service_and_service_policy_design.md#hierarchical-services)** allow you to create groupings of services that inherit properties from one another.
------
- **I95-25513 Display 128T, Installer, and Installer Repo Versions:** The GUI and CLI both display the software version, installer version, and installer repo versions. 
------
- **I95-27886 Packet Duplication for Inter-Node High Availability:** Packet duplication over multiple inter-node links helps reduce packet loss during transmission. For protocols such as UDP that do not verify packet integrity, this helps ensure full transmission of traffic. See [service-policy](config_reference_guide.md/#service-policy) for usage information. 
------
- **I95-28531 Application Categorization:** Application Identification/Categorization utilizes a database of traffic categories, such as “News”, “Social Media”, “Health”, “Sports”, etc. These categories can be assigned to services, which can then be prioritized, monitored for traffic levels, or blocked for security purposes. Each category is populated with a list of domain names associated with the type of traffic.
------
- **I95-31218 [Configurable BFD Hold-Down Timer](howto_tune_bfd.md#damping):** BFD (Bidirectional Forwarding Detection) is used to detect path failures between routers. A configurable hold-down time and dynamic-damping field in the [BFD settings](config_reference_guide.md#bfd-router), shared at the router, peer, interface neighborhood, and adjacency levels, provides BFD damping functionality when links are unpredictable. 
------
- **I95-32508 Binding Device Interface Identifiers in Azure:** Beginning with the release of 5.0.0, the VMBus UUID is used to identify the device interfaces on a router in Azure cloud deployments. Use of the PCI address is no longer supported. For the steps to identify and configure the VMBus UUID on each device interface, please refer to [Configuring a Device Interface with VMBus UUID](intro_installation_azure.md#configuring-a-device-interface-with-vmbus-uuid). Please note that for upgrades to version 5.0 and higher, the VMBus UUID must be manually configured on the device interfaces using this procedure. 
------
- **I95-32558 In-line Flow Performance Monitoring:** Inline performance metrics have been enhanced to achieve a finer granularity than what is currently available via BFD. Statistics are now collected per path, traffic class, and protocol (TCP or UDP) level. Sessions can be forwarded using more granular SLA metrics. 
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
- **I95-35212 [Adaptive Encryption](sec_adaptive_encrypt.md):** Most end hosts employ secure protocols such as TLS and IPSEC. Adaptive Encryption is aimed at identifying this already encrypted traffic and providing security for non-encrypted traffic by encrypting it through the 128T Router. This eliminates the performance penalty of encrypting traffic that is already encrypted. 
------
- **I95-35741 [PCLI plugin service commands](cli_reference.md#manage-plugin-install):** The plugin lifecycle can now be managed through the PCLI. 
------
- **I95-36876 `show assests software` includes Repository information:** The PCLI command [`show assets software`](cli_reference.md/#show-assets-software) includes the repository for each available software version. 
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
- **I95-36525** TLS 1.0 is no longer supported.

## Caveats

- **I95-35521** pcli may provide a validation error but does not provide the specific configuration in error.

  _**Corrective Action:**_ If a validation error is provided, review the configuration of each sub list between the items identified in the error response provided. For example, the same vlan id cannot be used for different networks interfaces on the same device interface.
