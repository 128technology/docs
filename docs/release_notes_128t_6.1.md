---
title: SSR 6.1 Release Notes
sidebar_label: '6.1'
---
:::info
Issues resolved in a release are merged into subsequent releases chronologically AND lexicographically. 

If you do not see an issue listed below, it may have been resolved in another recently released version. A link to the Release Notes for the most recent chronological release of SSR Software is provided.

Alternatively, refer to the **[List of Releases](about_releases.mdx)** page for release dates and links to all SSR Release Notes; or, if you know the Issue ID Number, enter that into the Search field at the top right of this page.
:::

### Upgrade Considerations

:::important
Before upgrading please review the [**Upgrade Considerations**](intro_upgrade_considerations.md) and the [**Rolling Back Software**](intro_rollback.md) pages. Several modifications have been made to the process for verifying configurations, which will impact existing configurations.
:::

- **I95-43243/IN-460 Upgrade and Rollback:** Upgrading or rolling back a system (conductor peer or router) with the interactive installer `install128t`, that is managed by a conductor may result in the system becoming unresponsive. It is recommended that upgrades be performed through the conductor UI. Manual upgrades and rollbacks may not be resilient to failures. See [Rolling Back Software](intro_rollback.md) for more information on these operations.
------
- **I95-42542 Conductor Upgrade Time:** Upgrades can take up to 40 minutes due to the number of rpms being upgraded. Please plan accordingly.
------
- **I95-42624 Upgrade Installer:** Before **upgrading to, or installing** version 5.4 and above, update the Installer to at least version 3.1.0. Failing to upgrade the installer may result in a rollback failure, should a rollback be necessary at any time. The Installer typically prompts you update when a new version is available. Select **Update** when prompted.
------
- **Plugin Upgrades:** If you are running with plugins, updates are required for some plugins **before** upgrading the conductor to SSR version 5.4.0 or higher. Please review the [Plugin Configuration Generation Changes](intro_upgrade_considerations.md#plugin-configuration-generation-changes) for additional information.
------
- **I95-51007 Conductor only - cpuProperties-core value isolating cores:** *In SSR software versions 6.0.0 and greater*, the `cpuProperties-cores` setting in `/etc/128technology/local.init` is erroneously isolating cores on conductor nodes when set. Because the conductor does not forward packets, there should be no traffic cores allocated to or isolated on the conductor for packet forwarding. This setting was previously ignored on the conductor, but while resolving an earlier issue with the installer and initializer that allocated CPU cores for traffic, that is no longer the case. 

It is recommended that prior to upgrading the conductor that the user modify local.init to set this setting to `0`. For example, a setting like this in `/etc/128technology/local.init`:

```
  "cpuProperties" : {
    "cores" : 4
  },
``` 
should be changed to:
```
  "cpuProperties" : {
    "cores" : 0
  },
```

Note that only the relevant section of `local.init` is shown for clarity. All other settings should be left the same.
The change should be made on both nodes of an HA system. If a conductor is already running 6.0.0 or later it will be necessary to `systemctl restart 128T` on each node after making this change. If the modification is made prior to upgrade it is not necessary to restart 128T service as this will be performed during the upgrade. Making this change on versions earlier than 6.0.0 will not affect operation, and will not require a restart. 

This issue will be corrected in an upcoming release.

## Release 6.1.10-2

**Release Date:** August 13, 2024

### Resolved Issues

- **The following CVE's have been identified and addressed in this release:** CVE-2023-20569, CVE-2023-48795, CVE-2023-2176, CVE-2023-40283, CVE-2023-4623, CVE-2024-22019, CVE-2023-46724, CVE-2023-46728, CVE-2023-49285, CVE-2023-49286, CVE-2023-50269, CVE-2024-25617, CVE-2024-21011, CVE-2024-21012, CVE-2024-21068, CVE-2024-21085, CVE-2024-21094, CVE-2019-13631, CVE-2019-15505, CVE-2019-25162, CVE-2020-25656, CVE-2020-36777, CVE-2021-3753, CVE-2021-4204, CVE-2021-46934, CVE-2021-47013, CVE-2021-47055, CVE-2021-47118, CVE-2021-47153, CVE-2021-47171, CVE-2021-47185, CVE-2022-0500, CVE-2022-23222, CVE-2022-3565, CVE-2022-45934, CVE-2022-48627, CVE-2022-48669, CVE-2023-1513, CVE-2023-24023, CVE-2023-25775, CVE-2023-28464, CVE-2023-31083, CVE-2023-3567, CVE-2023-37453, CVE-2023-38409, CVE-2023-39189, CVE-2023-39192, CVE-2023-39193, CVE-2023-39194, CVE-2023-39198, CVE-2023-4133, CVE-2023-4244, CVE-2023-42754, CVE-2023-42755, CVE-2023-45863, CVE-2023-51779, CVE-2023-51780, CVE-2023-52340, CVE-2023-52434, CVE-2023-52439, CVE-2023-52445, CVE-2023-52448, CVE-2023-52477, CVE-2023-52489, CVE-2023-52513, CVE-2023-52520, CVE-2023-52528, CVE-2023-52565, CVE-2023-52574, CVE-2023-52578, CVE-2023-52580, CVE-2023-52581, CVE-2023-52594, CVE-2023-52595, CVE-2023-52598, CVE-2023-52606, CVE-2023-52607, CVE-2023-52610, CVE-2023-52620, CVE-2023-6121, CVE-2023-6176, CVE-2023-6240, CVE-2023-6622, CVE-2023-6915, CVE-2023-6932, CVE-2024-0340, CVE-2024-0841, CVE-2024-23307, CVE-2024-25742, CVE-2024-25743, CVE-2024-25744, CVE-2024-26593, CVE-2024-26602, CVE-2024-26603, CVE-2024-26609, CVE-2024-26610, CVE-2024-26615, CVE-2024-26642, CVE-2024-26643, CVE-2024-26659, CVE-2024-26664, CVE-2024-26671, CVE-2024-26693, CVE-2024-26694, CVE-2024-26743, CVE-2024-26744, CVE-2024-26779, CVE-2024-26872, CVE-2024-26892, CVE-2024-26897, CVE-2024-26901, CVE-2024-26919, CVE-2024-26933, CVE-2024-26934, CVE-2024-26964, CVE-2024-26973, CVE-2024-26993, CVE-2024-27014, CVE-2024-27048, CVE-2024-27052, CVE-2024-27056, CVE-2024-27059, CVE-2024-2961, CVE-2024-33599, CVE-2024-33600, CVE-2024-33601, CVE-2024-33602, CVE-2024-32487, CVE-2023-4408, CVE-2023-50387, CVE-2023-50868, CVE-2023-4408, CVE-2023-50387, CVE-2023-50868, 
------
- **I95-47195, I95-47196, I95-49015, I95-49599, I95-56682 Forwarding plane crash, causing stranded network namespaces when LTE/PPPoE network-interface name is changed:** Implemented reinit script to reiniatilize namespace, KNI and target-interface after a configuration change in the network-interface.
------
- **I95-49218 Filter OSPF routes using RIB Policy routes:** Use the `configure authority router routing rib-policy` command from either the routing default-instance (`configure authority router routing`) or inside `configure authority router routing vrf` to provide addtional filtering for OSPF routes. For more information see [`configure authority router routing rib-policy`](config_command_guide.md#configure-authority-router-routing-rib-policy) and [`configure authority router routing vrf rib-policy`](config_command_guide.md#configure-authority-router-routing-vrf-rib-policy).
------
- **I95-49712 Config Validation Error uniformative:** Resolved an issue where paths pointing to missing keys or elements returned error messages that did not provide recognizable information. Now the error message provides key or element names.
------ 
- **I95-50697 RFC1918 sessions (private IP addresses) are reclassified in error:** When a session destined for a private IP (RFC1918) experiences an App-ID modify, the session will now only be reclassified if the classification data reflects a positive classification change.
------
- **I95-52251 Changes to the conductor address on the router result in loss of ssh connection to the router:** Resolved an issue where changing the router level `conductor-address` did not update the salt-created services with the new addresses.
------
- **I95-53619 Anomaly in Maintenance Mode reporting:** Resolved an issue where BGP alarms were not automatically shelved when routers are put into maintenance mode. `BGP peer path is down` alarms are now shelved properly on routers in maintenance mode.
------
- **I95-54833 HA port is showing as redundant:** Resolved an issue where adding a device-interface back into the configuration after it was removed did not recreate the device-state.
------
- **I95-55550 Abrupt power failure may result in filesystem corruption:** Multiple disk errors caused corruption on the 128T_root filesystem causing it to enter read-only mode and becoming non-responsive. To resolve this issue, the filesystem triggers a kernel panic, launching a reboot and in HA systems, failover. Additionally, the filesystem check is run to check and repair the filesystem.
------
- **I95-55603 HA router stuck in connected state due to runtime corruption issue:** Resolved an issue causing an unzip race condition with Python files. The packaging and installation process has been improved to prevent this issue.
------
- **I95-55725 Highway crashes when peer-path routers are removed:** Resolved a race condition that could cause a crash in the highway worker-core packet-processor if peer routers are removed from the configuration.
------
- **I95-55912 Validate Patterns for Service Domains and URLs:** The `url` and `domain-name` fields on a service were an unformatted string. This allowed you to configure fields that would be silently discarded. The `domain-name` and `url` fields within services are now validated for correctness and viability from an App-ID perspective. Anything to be ignored during validation now triggers a config warning.
------
- **I95-55965 IDP engine not starting due to invalid environmental conditions:** AIn cases where a container/csrx does not shut down cleanly, the IDP engine does not start. These conditions are now detected, and a force stop/remove of the container is implemented.
------
- **I95-56263 Add `show capacity`, and debugging commands to the TSI output:** Support for additional information in the TSI output has been added.
------
- **I95-56292 Increase the length of SSH keys to 4096:** The size of the Salt and 128T SSH keys has been changed to 4096 bits for newly deployed systems.
------
- **I95-56317 Journal logs missing from Conductors running 6.2.3:** An issue related to a typo was creating zero byte files when downloading journal logs using the GUI.
------
- **I95-56326 Potential crash while collecting TSI:** Added protection against unmapped memory access to resolve an issue where, if a TSI is collected at just the wrong time, it can cause a highway crash.
------
- **I95-56363 Highway crash due to traffic metrics manager thread error:** A potential crash due to a race condition in per-service-route metrics has been fixed.
------
- **I95-56411 Remove outdated performance package:** Older versions of the `perf` package were not removed after a kernel upgrade as part of the software upgrade. The SSR upgrade process now removes older `perf` packages during the software upgrade proces.  
------
- **I95-56455 Zero-byte files when updating conductor hardware using an OTP image:** A check has been added to verify that `api.key` and `router-api.key` are non-zero length and valid. If not, the keys are regenerated.
------
- **I95-56475 HA-sync network interface shows warning after router upgrade:** Resolved an issue where non-forwarding interfaces would appear to be administratively down in the web UI when they were not.
------
- **I95-56527 List elements containing backslash renamed during validation:** Resolved an issue with the use of a backslash in a list key or a list element. During the configuration validation process, if a difference between configurations in a child of a list element with a `\` in its key; Or when the parent list or leaf-list exists in both configurations, but the list or list element with the `\` only exists in one configuration, the list element with the `\` was being renamed.
------
- **I95-56541 Include kernel journal entries in TSI:** A separate `kernel.log` journal file is now created in the TSI output.
------
- **I95-56575 Reduce polling rate of disk monitoring and add optimization:** The `ComponentDiskUtilizationMonitor` checks the disk usage too frequently and is inefficient. Reduced the frequency that disk usage is checked, and streamlined the process.
------
- **I95-56600 Add `show tenant members` to the TSI output:** `show tenant members` and additional network scripts have been added to the TSI output.
------
- **I95-56612 `fib-service-match any-match` missing some FIB entries:** Resolved an issue when a service-address was more specific than the last route update, a search for other less specific services was not performed. Now when the service address update is more specific, additional searches will continue. 
------
- **I95-56702 O365/Sharepoint application missing from the Applications list:** Resolved an issue where certain applications and protocols were excluded from automatic updates.
------
- **I95-56715 Address validation in migrate feature in conductor UI is not working correctly:** Resolved an isssue between the client and the server during the use of the GUI `migrate` operation, where the conductor address was not read correctly, and returning an irrelevant error message. 
------
- **I95-56726 `No Timeout Queue` message logged in cases where a config commit fails, or a conductor fails to load a config on startup:** Resolved an issue with `ThreadPoolWithExternalPoller` that resulted in a stack trace in the logs which starts with message `No TimeoutQueue:`.
------
- **I95-56727 Domain names that begin with numbers are not allowed to be configured:** Warnings are no longer generated for domain-name elements of service configurations which have labels beginning with a number, for example `123.abc.com`.
------
- **I95-56822 Router stuck in a continuous upgrade/failure state:** DNS name servers changes on the conductor are not honored. In cases where the DNS configuration changed post boot, the conductor software proxy would not reload the config. In this scenario the proxied router software requests would use an out of date DNS configuration for the proxied requests, resulting in failure. 
------
- **I95-56827 NTP Auth key only permits keys of 20 or 40 characters:** Loosened restrictions on NTP server key length to allow plaintext keys. 
------
- **I95-56843 Error logs filled with irrelevant KNI network script info:** The log output has been reduced to provide related information.
------
- **I95-56847 lte / pppoe default-route check incorrectly reporting warnings:** Resolved an issue where warnings were incorrectly shown on the conductor for interfaces without `default-route` or `management-vector` configured.
------
- **I95-56850 Overlap warning on router not present on conductor:** Resolved a case where a service on a router is configured with `applies-to`, and the same service is configured on the conductor (overlap) but does not have `applies-to` configured, the validation process will generate a warning on the router but not the conductor. 
------
- **I95-56879 PPPoE stopped working:** Resolved an issue where the system configuration for the PPPoE interface was missing `LCP_FAILURE` and `LCP_INTERVAL` fileds. These fields are now set correctly.
------
- **I95-56905 Conserve memory footprint on the router:** If the SSR configuration does not have `application-identification mode all`, then do not load the database. This will save memory on the router. 
------
- **I95-56973 Child services do not inherit the service-path configurations from the parent service:** Resolved an issue where child service routes for peers were not inheriting vectors and the `enable-failover` field. 
------
- **I95-57000 Hub crash while generating TSI:** Protection has been added to prevent unmapped memory access during packet buffer location walk.
------
- **I95-57017 Application ID failed to block some domains:** Resolved an issue where DPI failed to identify the domain-name from SNI if the `client-hello` is split up into multiple TCP packet segments.
------
- **I95-57028 IDP core files consume disk space:** In cases where large amounts of files are stored on disk, the files will be managed/deleted based upon the folder size. 
------
- **I95-57071 Changing router context in session debug does not update correctly:** Resolved an issue where a missing dependency was not initiating a re-render of the output using the correct router name. 
------
- **I95-57082 Unable to delete a capture-filter that contains a forward slash (/):** This issue has been resolved. 
------
- **I95-57099 BFD Session timeout discovered:** Resolved an issue where BFD sessions were deleted prematurely.
------
- **I95-57110 Crash seen during add and delete peers while sending traffic:** A race condition has been fixed that could cause a crash in the packet-processing highway process if a peer-path is removed from configuration.
------
- **I95-57114 Unable to upgrade AWS Conductor:** Resolved an issue where an incorrect package version was installed, triggering a downgrade and preventing the upgrade.
------
- **I95-57205 Race condition on startup with DHCP configured on LTE or PPPoE interface, causing system to crash:** This issue has been resolved.
------
- **I95-57283 Unable to perform SNMP discovery:** Resolved an issue where alarms in the `SERVICE`, `BGP_NEIGHBOR`, or `MSDP_NEIGHBOR` category would cause the SNMP server to crash and fail to send messages.
------
- **I95-57337 Updates during Application ID reload/refresh:** Updated the processes involved in application reload.
------
- **I95-57578 Candidate configuration values not showing in GUI:** Resolved an issue that caused configuration drop-downs in the GUI for tenants and services to only display values from the running configuration, not the candidate configuration.
------
- **I95-57580 Provide drop down list in UI for Session Record Profile:** There is now a Session Records Profile drop down list in the GUI.
------
- **I95-57593 No option to require password change on first login:** Added a **Require Password Change On First Login** checkbox to the **Create User** dialog. Previously this feature was only available in the `create-user` command.
------
- **I95-57607 Saving TSI as root from the conductor generates oversized file:** Added and enforcement  that when calling `/usr/bin/save-tech-support-info` the `--output` argument always ends in .`zip`.

## Release 6.1.9-2

**Release Date:** June 27, 2024

### Resolved Issues

- **The following CVE's have been identified and addressed in this release:** CVE-2024-2973

## Release 6.1.8-15

**Release Date:** May 3, 2024

### New Features

- **I95-51556 Added New LACP Metrics:** The following lacp metrics have been added for bond interfaces: 
  - /interface/received/lacp/packets
  - /interface/received/lacp/unknown
  - /interface/received/lacp/illegal
  - /interface/sent/lacp/packets
  - /interface/sent/lacp/queue-full

These counters are available per-bond-member. 

### Resolved Issues

- **The following CVE's have been identified and addressed in this release:** CVE-2023-38406, CVE-2023-38407, CVE-2023-47234, CVE-2023-47235, CVE-2024-20918, CVE-2024-20919, CVE-2024-20921, CVE-2024-20926, CVE-2024-20945, CVE-2024-20952, CVE-2023-40217, CVE-2023-20569, CVE-2022-43552, CVE-2023-48795, CVE-2023-2176, CVE-2023-40283, CVE-2023-4623, CVE-2024-22019, CVE-2023-46724, CVE-2023-46728, CVE-2023-49285, CVE-2023-49286, CVE-2023-50269, CVE-2024-25617.
------
- **I95-53523 Bond interface shut down generates errors:** Resolved an issue where the device interface clean up process was out of order and generated a detach failure. 
------
- **I95-53565 Port state of LAG members not dynamically updated:** Resolved an issue where enabling or disabling a bond member port does not update the status until the 128T service is restarted. The adminisrative enable and disable now works as expected.
------
- **I95-54440 / I95-50787 Rebooting the OS from the conductor throws error code 400:** Resolved an issue in the GUI with the reboot button on the Router page. When trying to reboot a router, the button would fail and display **Error: EOF**.
------
<!-- markdown-link-check-disable -->
- **I95-54541 Device interfaces on Azure VMs with a 2K or greater MTU fail to initialize:** Resolved an issue where device-interfaces configured in an Azure VM fail during initialization, and the port remains operationally down. For additional details, refer to the Knowledge Base article [Unable to bind accelerated networking interfaces in Azure when using vmbus-id](../kb/2024/04/25/I95-54541).<!-- markdown-link-check-enable -->
------
- **I95-54750 Load Balancer API Calls not working:** The original API and Swagger documentation used `Load Balancer`, which was misleading. The `Reachability Detection` REST APIs have been updated to use `Reachability Detection` as reference, instead of `Load Balancer`.
------
- **I95-54833 HA port is showing as redundant:** Resolved an issue where adding a device-interface back into the configuration after it was removed did not recreate the device-state. 
------
- **I95-54867 SSR-1300 baud rate set incorrectly:** Resolved an issue where the incorrect baud rate was allowed. The only allowed baud rate for the SSR is now 115200. This is the default rate.
------
- **I95-54918 Highway process crashed on the active node of a router:** Resolved a crash caused by a race condition when the last instance of a capture filter referencing a particular file-name is removed while a packet is in the process of being captured. 
------
- **I95-55164 Dropping GRE encapsulated packets:** Classification support for Enhanced GRE Header, version 1, as defined by RFC 2637 Point-to-Point Tunneling Protocol (PPTP) has been added.
------
- **I95-55226 Validation incorrectly allows a network interface to be used as both DHCP relay and server:** The validation process has been updated to include several checks against DHCP relays, clients, servers, and access-policies. 
------
- **I95-55270 DHCP server not coming up:** Resolved an issue where a network namespace was using a namespace ID that was not cleaned up properly after removal.
------
- **I95-55416 Dynamic reconfig of the PCI address of a bond member breaks connectivity:** Added an identifier to the LAG member, enabling the proper handling of the member whenever the PCI address is changed.
------
- **I95-55444 ICMP probe stats missing per service route:** Statistics were not available for ICMP probes that did not meet SLA per service route. These stats have been added.
------
- **I95-55467 Incorrect VLAN Tagging in Azure HCI Stack with Hyper-V Hypervisor:** When using VLANs on Azure HCI Stack with Hyper-V, bit shifting occurs resulting in incorrect VLAN tags. This has been resolved for **non-accelerated NICs** by adding handling for the VLAN tags on Azure HCI. However, this issue is still present when using accelerated mode with the Azure HCI Stack with Hyper-V. The current solution is to **not** use accelerated mode if configuring VLAN interfaces.
------
- **I95-55562 BGP aggregate on router and in Mist intent may cause rare race condition:** Resolved a rare edge case: If an aggregate (summary) is configured in BGP, (e.g., 10.0.0.0/8), and that same prefix also exists as a BGP route present in the network, a race condition may occur and the router with the aggregate configuration may not originate the aggregate.
------
- **I95-55578 Traceroute not stopping at the specified `destination-ip`:** Resolved an issue where traceroute would continue probing after a response from the endpoint, if a subsequent probe timed out. 
------
- **I95-55586 GraphQL API returns `IsActive` incorrectly if the `device-interface` is `vrrp_standby`:** The `router-peer-path` setting now returns the correct value when in `vrrp-standby`.
------
- **I95-55591 Some network interface stats are not updated:** Some network interface stats are not updated with the port name when a device interface is renamed. Device interface name changes are now handled correctly, and `network-interface` metrics are properly updated when `device-interface name` changes.
------
- **I95-55603 HA router stuck in connected state due to runtime corruption issue:** Resolved an issue with an unzip race condition with Python files. The packaging and installation process has been improved to prevent this issue. 
------
- **I95-55762 Unable to view more than 50 prefixes in BGP:** Updated the routing engine to display all rows for BGP show commands if a count parameter is not specified.
------
- **I95-55764 Race condition and highway crash with DHCP devices:** Resolved a race condition that caused a highway crash when the DHCP client is configured for LTE or PPPoE, and the respective link flaps prior to the lease being assigned.
------
- **I95-55775 Race condition exposed by service-area multithreading:** We now prevent a crash due to a race condition in the processing of session collisions when session-processing multithreading is enabled.
------
- **I95-55830 Rollback results in missing Admin user:** Resolved an issue where HA nodes running mixed versions of 5.6.0 or greater with versions less than 5.6.0, the admin user could be temporarily removed until both nodes were upgraded or rolled back to the same version.
------
- **I95-55850 Changing the name of a `bond-interface` fails:** Resolved an issue where changing the name of a `bond-interface` required a restart to take effect.
------ 
<!-- markdown-link-check-disable -->
- **I95-55904 No service-paths seen after upgrade:** Resolved an issue where adding services with overlapping address prefixes prevented the configuration from being applied. For additional details, refer to the Knowledge Base article [Upgrade from 5.6 to 6.1 may result in missing FIB entries](../kb/2024/04/24/I95-55904). <!-- markdown-link-check-enable -->
------
- **I95-55949 Silicom Valencia Atom C1130 CPU flags are not properly detected:** Resolved an issue where the `cpuinfo` parser fails due to a collision between the processor key name and value - the Silicom Valencia model name in the `cpuinfo` contains the word ‘processor’. 
------
- **I95-56127 Changes to KNI device driver increased CPU load per KNI device:** Added KNI module tuning, and excessive CPU usage by idle KNI devices has been alleviated.
------
- **I95-56326 Potential crash while collecting TSI:** Added protection against unmapped memory access to resolve an issue where, if a TSI is collected at just the wrong time, it can cause a highway crash.
------
- **I95-56363 Highway crash due to traffic metrics manager thread error:** A potential crash due to a race condition in per-service-route metrics has been fixed.
------
- **I95-56411 Remove outdated performance package:** Older versions of the `perf` package were not removed after a kernel upgrade as part of the software upgrade. The SSR upgrade process now removes older `perf` packages during the software upgrade proces.  
------
- **WAN-2753 IDP Engine Failed to Start:** Resolved an issue that prevented IDP from starting if its configuration had changed. 
------
- **WAN-3013 MistAnalytics HA onboarding timeout too short:** The timeout for HA analytics formation has been extended. 

## Release 6.1.7-3

**Release Date:** February 17, 2024

### Resolved Issues

- **The following CVE's have been identified and addressed in this release:** CVE-2020-22218, CVE-2023-38406, CVE-2023-38407, CVE-2023-47234, CVE-2023-47235, CVE-2021-43975, CVE-2022-28388, CVE-2022-3594, CVE-2022-3640, CVE-2022-38457, CVE-2022-40133, CVE-2022-40982, CVE-2022-42895, CVE-2022-45869, CVE-2022-45887, CVE-2022-4744, CVE-2023-0458, CVE-2023-0590, CVE-2023-0597, CVE-2023-1073, CVE-2023-1074, CVE-2023-1075, CVE-2023-1079, CVE-2023-1118, CVE-2023-1206, CVE-2023-1252, CVE-2023-1382, CVE-2023-1855, CVE-2023-1989, CVE-2023-1998, CVE-2023-23455, CVE-2023-2513, CVE-2023-26545, CVE-2023-28328, CVE-2023-28772, CVE-2023-30456, CVE-2023-31084, CVE-2023-3141, CVE-2023-31436, CVE-2023-3161, CVE-2023-3212, CVE-2023-3268, CVE-2023-33203, CVE-2023-33951, CVE-2023-33952, CVE-2023-35823, CVE-2023-35824, CVE-2023-35825, CVE-2023-3609, CVE-2023-3611, CVE-2023-3772, CVE-2023-4128, CVE-2023-4132, CVE-2023-4155, CVE-2023-4206, CVE-2023-4207, CVE-2023-4208, CVE-2023-4732.
------
- **I95-50697 Private RFC1918 Web Applications ignored by Mist when collecting SLE data:** Handling of RFC1918 traffic classification returned a private domain causing an undesirable clumping of session stats. With the new behavior, when a session destined for a private IP (RFC1918) experiences an App-ID modify, the session will only be reclassified if the classification data reflects a positive classification change.
------
- **I95-51663 TCP port reuse causes crash during application steering:** Resolved an issue where TCP state transitions was causing an issue with the client reusing ports.
------
- **I95-52250 Security Package Update:** Updates have been made to Intrusion Detection and Prevention (IDP).
------
- **I95-52500 SVR Multi Hop Failover:** Added a session lookup by session-ID to resolve a situation where sessions failing between multi-hop SVR and direct SVR connections may lead to duplicate flow exceptions and dropped traffic.  
------
- **I95-53216 "Unable to change password" message showing for remote users:** Resolved an issue that caused a "Password Change" dialog to appear for remotely authenticated users.
------
- **I95-53920 Password expiration mistakenly applied to remote users:** Resolved an issue that incorrectly enforced password expiration (configure authority password-policy lifetime) to RADIUS users.
------
- **I95-54127 Users not locally created on managed routers cannot get TSI:** Resolved an issue that did not provide a home directory for custom roles, which prevented LDAP users from viewing the systemd journal.
------
- **I95-54271 Race condition during a configuration change related to source NAT leading to crash:** Resolved a rare condition where the NAT pool was being reset while it was accessed for session setup. This caused a race condition that led to a highway process crash.
------
- **I95-54340 Hub-to-spoke sessions break when failing over from outbound-only path:** When a session modify occurs due to an ingress change (inter-node -> inter-router) AND an egress change is also detected, the incorrect security was being looked up for the old flow, causing an exception to be thrown and the modify to fail. This would present itself as dropped packets and in logs as a SecurityNotFound error. This issue has been resolved. 
------
- **I95-54512 SSR-130 reconfigured to join an HA cluster does not come up properly:** Resolved an issue where the generation of an improper configuration could lead to a crash loop in the NodeMonitor process.
------
- **I95-54726 Duplicate service-routes for IDP being created:** Resolved an issue where duplicate routes were being created in `hub` mode because the service-name field was being used rather than the name field. This issue has been corrected.  
------
- **I95-54729 Marking of packets for Performance Monitoring:** Performance monitoring now prefers to mark non-metadata packets on established sessions instead of packets which already contain metadata, such as first packets or packets which have had metadata turned on due to a session change event.
------
- **I95-54740 Upgrade Kernel to 8.9:** The kernel has been updated to address multiple CVE's (Listed in the CVE note above).
------
- **I95-54867 SSR-1300 baud rate set incorrectly:** Resolved an issue where the incorrect baud rate was allowed. The only allowed baud rate for the SSR is now 115200. This is the default rate. 
------
- **I95-54909 Alarm when websense connection is down:** An alarm has been added to indicate that the connection to the Websense URL is down or responds with a 5xx error. 
------
- **I95-54927 Receiver can join stream without any tenant assigned to interface:** This issue has been resolved. Multicast boundaries have been added to block all multicast addresses on interfaces that do not match the multicast service access-policy.
------
- **I95-55002 Password reset loop:** Resolved an issue that caused users created with the **Require password change on first login?** set to `yes` to get stuck in an infinite loop of password changes when logging in using the GUI.
------
- **I95-55069 One HA node is missing from the Mist GUI:** Resolved an issue where a managed router had an empty product version config metadata field, which resulted in the conductor version metadata field being cleared.
------
- **I95-55208 `state.apply` hangs and device does not get to the `running` state:** In certain cases the `highstate` prevents `rpm -q` from running. This issue has been resolved by instituting a timeout for `rpm -q` in highstate.
------
- **I95-55244 Unable to initialize DPDK; SSR does not start:** Resolved an issue with the way the initializer identified the amount of memory in the processor. The initializer is now more NUMA aware when sizing the number of hugepages on a system.
------
- **I95-55261 Only run `validate` for plugins on the Conductor:** Resolved an issue where the plugin validator was running on routers. 
------
- **I95-55270 DHCP server not coming up:** Resolved an issue where a network namespace was using a namespace ID that was not cleaned up properly after removal.
------
- **I95-55359 IDP log disk usage:** Resolved an issue where IDP TSI files persisted too long, using too much disk space.
------
- **I95-55360 Modules becoming un-sync'ed during upgrade:** Resolved an issue during an HA upgrade when the conductor running the lower software version re-syncs modules after the initial synchronization by the higher software version conductor. 
------
- **I95-55378 Matching SSH keys cause resync loop:** Resolved an issue when there was interference with the process of inserting keys into the authorized keys file. The keys are now only inserted into the authorized keys or known hosts file if the key does not exist. 
------
- **I95-55389 Queries for private domains with Websense classified as Miscellaneous:** Domains categorized by Websense as Uncategorized are now classified as Uncategorized/Uncategorized, rather than Miscellaneous/Uncategorized.

## Release 6.1.6-7

**Release Date:** January 2, 2024

### Resolved Issues Requiring Configuration Changes

- **I95-46120 HA Fabric Warning message supression in Azure:** In Azure, it is not possible to configure a non-forwarding fabric interface on the SSR, thus this error will be present on every commit. This message is now supressed.
------
- **I95-51181 Improve `save-tech-support-info` command:** The PCLI command `save tech-support-info` now has a default collection period of one day. Additionally, a `since` argument has been added that limits log collection to only logs generated after the specified value. The `since` argument can be a relative time delta or an absolute timestamp. The GUI's About and Logs pages has the same functionality with a drop down that allows limiting the time window for the displayed/downloaded logs/tech-support-info.
------
- **I95-52406 Download MIBs from the GUI:** A button has been added to the GUI, in the Documentation pane of the About Page, to download the SNMP MIB definitions for SSR.
------
- **I95-52703 Tenancy consideration in Application ID lookup:** Application Identification service lookups now consider the source tenant. This allows matches to be specific to certain networks/users. See [AppID and Tenancy](concepts_appid.md#appid-and-tenancy) for more information.
------
- **I95-52799 Display Lock Status/Failed Login Attempts in the PCLI and GUI:** Add a "Lock Status" column to the User table as well as the User Details pane, with more details availble on hover. The `show user` command now includes two new rows, "Lock Status" and "Last Failed Login". For command details, please see [`show user lock-status`](cli_reference.md#show-user-lock-status).

### Resolved Issues

- **The following CVE's have been identified and addressed in this release:** CVE-2022-42896, CVE-2023-1281, CVE-2023-1829, CVE-2023-2124, CVE-2023-2194, CVE-2023-2235, CVE-2022-41974, CVE-2023-32360, CVE-2023-22045, CVE-2023-22049, CVE-2020-12321, CVE-2022-41742, CVE-2022-41741, CVE-2023-2650, CVE-2023-3446, CVE-2023-3817, CVE-2023-3341, CVE-2023-22081, CVE-2022-0934, CVE-2023-46847.
------
- **I95-38188 Re-Homing an SSR in certain circumstances leaves residual services:** If an SSR is rehomed from an HA conductor to a standalone conductor, the services pointing to the second node of the HA conductor were not removed. Resolved the issue where the reverse SSH tunnels from a managed router to the second HA conductor node were not cleaned up if the conductor was converted back to a standalone conductor.
------
- **I95-42466 Changing the PCI address of an HA interface breaks HA:** Resolved an issue where moving a non-forwarding fabric HA sync device-interface from one PCI address to another PCI address would not properly clean up the team interface from the old PCI address.
------
- **I95-48783 Conductor process logs are unbounded, risking storage exhaustion:** `auditd` logs consuming the disk space when the node monitor is in a disconnected state and the audit logs are left unconsumed. There was a limit to the log file size, but not the number of files. The number of files is now limited.
------
- **I95-50493 Memory calculation for alarms is confusing:** This alarm was designed to trigger when memory usage went above 90% and clear only when memory usage went below 80%, causing confusion. The memory usage alarm no longer requires memory usage to go below 80% to clear; it will clear when memory usage goes below 90%.
------
- **I95-50537 Detect and log invalid TCP establishment flags:** TCP packets with illegal flag combinations are dropped before they can set up a session, rather than after. 
------
- **I95-50540 Denied traffic events not displaying in the GUI or PCLI:** Resolved an issue that prevented displaying denied traffic events in the `show events` PCLI command and in the GUI. Users would see `% Error: Unhandled TypeError: list indices must be integers or slices` in the PCLI, and `An unknown traffic event occurred` in the GUI. 
------
- **I95-51191 BFD metrics not cleaned up properly:** The BFDAgent holds onto the stats for peer paths; If the config is changed on a router, new stats are made but the old ones were not being deleted. The old BFD by-peer-path stats are now deleted when a VLAN configuration change is made.
------
- **I95-51459 Logs and exception pcaps are periodically filled with error logs and truncated packets:** Resolved an issue where ICMP error respond packets for encapsulated traffic caused `PacketBufferDataNotFound: Could not find specified data in packet` error logs to be generated, or truncated packets to arrive in the FastLane exceptions pcap. 
------
- **I95-51864 Ethernet Over SVR (EoSVR) not working for multi-hop SVR scenarios:** When EoSVR traffic traverses over a dogleg path in a HA node topology, traffic failed to traverse the middle node. EoSVR packets are no longer incorrectly dropped when routed over an inter-node path when coming from an SVR path.
------
- **I95-52018 Overlapping IP Prefix validation may be incorrect, causing a false configuration warning:** Configuration validation for IP Prefixes has been corrected.
------
- **I95-52414 RBAC not being honored for `show fib` output:** Resolved an issue where `show fib` included entries that the current user did not have permission to view.
------
- **I95-52498 AppID allows session when it should be blocked:** When utilizing the Application Identification functionality, a TCP reset is now sent to clients to correct this behavior.
------- 
- **I95-52615 Set TTL multi-hop range correctly:** The TTL multi-hop field allowed a value of 0, but had no impact. The range has been corrected to 1-255, and no longer accepts a value of 0.
------
- **I95-52855 DHCP Relay stopped functioning after removing disabled DHCP Servers:** When a number of disabled DHCP servers were deleted from the configuration, the server interface mappings were deleted as well. Updates have been made to re-enable DHCP relay when a DHCP server or interface is removed.
------
- **I95-52859 Issue moving interface between chassis of hypervisor platforms running SSR (e.g., ENCS):** When swapping physical cable from active node to standby node, the customer experienced low rate packet loss on traffic-engineering enabled device-interfaces. To resolve this issue, the traffic-engineering transmit-cap is no longer ignored on device-interfaces which have unresolved link-speed.
------
- **I95-52889 Highway crash caused by a false negative waypoint exhaustion check:** Waypoint ports reinitialization that is triggered by a false negative exhaustion check can lead to duplicate waypoints and reverse flows on two sessions resulting in a highway crash. This issue has been resolved.
------
- **I95-52994 Routers continue to request the conductor configuration:** Resolved an issue where a managed router continued to request the configuration from the conductor even after a validation or datamodel incompatibility issue.
------
- **I95-52999 Package-based Interactive Install does not recognize Mellanox CX6 LX (10/25G) interfaces:** Resolved a rare case where NICs with kernel drivers that exist in EL8 but not in EL7 will not be enumerated during Interactive ISO installation. 
------
- **I95-53000 Process highway disconnected messages caused by NIC driver bug:** The DPDK driver code for the Broadcom NICs contained a bug that caused the querying of the extended statistic to fail. The Broadcom NIC driver has been upgraded to resolve the issue.
------
- **I95-53002 NTP setup check fails on startup:** Resolved an issue in the NTP startup sequence, due to an incorrect path for the NTP configuration.
------ 
- **I95-53009 RPM signature verification missing for all artifacts:** Verification for all ISO RPMs has been added.
------
- **I95-53015 Highway log fills with `INFO (divertedPackeTP) icmp response packet failed` messages when the BFD peer is down:** This message is informational and is now logged appropriately.
------
- **I95-53105 Conductor to router API RBAC rules not being followed:** Resolved an issue where the user is getting elevated to admin on the managed router, thus returning more data than necessary.
------
- **I95-53114 Broadcom interfaces stuck in `admin down` after upgrade:** Resolved an issue where device-interfaces on Broadcom NICs wouldn't come up properly if initially configured with `enabled false`.
------
- **I95-53130 Errors seen on Q-in-Q enabled interface after upgrade:** Interfaces were unable to receive jumbo packets unless MTU is configured to be large enough. This resolution allows the reception of jumbo packets regardless of the MTU setting.
------
- **I95-53185 Rare race condition causing highway crash:** Resolved a rare race condition between flow install and flow lookup causing a highway crash.
------
- **I95-53253 Include dmesg and systemd journal unit in TSI:** Include output from dmesg and systemd journal unit in TSI in order to assist in debugging future platform related issues.
------
- **I95-53259 Initialization time out may result in SSR failing to start:** Resolved an issue where SSR may fail to start. An example of this would be unreachable audit server was configured that would delay the startup initialization causing SSR to exceed the timeout and fail to start.
------
- **I95-53262 VRRP status shows active for both nodes when dual node ha redundancy is configured on bond interface:** Bonded X710 devices were unable to receive VRRP from each other, resulting in active-active scenario. This resolution disables source pruning by default on these devices.
------
- **I95-53288 Fetching detailed bond info from the conductor for routers fails:** The conductor was incorrectly posting a `JSONDecodeError` when trying to parse bond information that was missing from the router response. This issue has been resolved.
------
- **I95-53321 Syslog datamodel is limited:** Added the following configurable syslog facility values `auth`, `authpriv`, `cron`, `daemon`, `kern`, `lpr`, `mail`, `news`, `syslog`, `user`, and `uucp`.
-----
- **I95-53344 Exception on device interface tear down terminates process:** Resolved a rare case where Highway process can terminate and core during config changes if there is an underlying exception to a device-interface on removal.
------
- **I95-53358 Disable/enable of LACP takes the Bond interface down:** Dynamic reconfiguration has been enhanced to support LACP enable/disable while traffic flows by removing the dedicated queue flow (for LACP) when removing a member from bond. 
------
- **I95-53393 Empty password attempts not counting towards user lockout:** The SSR counts login attempts with an empty password as failed login attempts. These  contribute to locking a user account if they reach the threshold (the value configured in `configure authority password-policy deny`,) within a short time window. 
------
- **I95-53472 Service Routes passing validation on conductor but then failing on local router:** The validation process on the conductor has been updated to identify service-routes with deleted or empty destination lists as invalid.  
------
- **I95-53538 Custom audit rules not preserved on SSR upgrade:** Resolved an issue where the image-based upgrade (IBU) was not preserving audit rules or `dnf.conf`.
------
- **I95-53641 BGP routes between peers do not immediately transition to the Connected state:** A change has been made to reduce the time that BGP routes learned from a BGP over SVR neighbor are withdrawn when the peer paths are lost to the neighbor.
------
- **I95-53787 Stats not present on conductor:** Running `show device-interface router all` on a conductor caused stats (in-octets, in-unicast-pkts, etc...) to be incorrectly displayed as "n/a" instead of the correct value. This issue has been resolved.
------
- **I95-53852 `host-service snmp-server` blocks SVR pings to a `network-interface` owned address:** Ping traffic was hitting the generated (wildcarded) snmp-server service. The session could not setup due to security policy conflicts. This issue has been resolved; the generated service from an snmp-server host-service now has a UDP transport.
------
- **I95-53858 Active sessions counter continuously incrementing:** The SSC active sessions counter has been updated to correctly handle session removal. 
------
- **I95-53875 The `show stats service-area sent success` metric was retained longer than needed:** Resolved an issue where the `stats default retention short` setting was not being honored.
------
- **I95-53894 DNS cache-service does not start:** Resolved a race condition that causes the DNS process to fail to start. The log message `No TimeoutQueue:` can be seen in the logs during this condition.
------
- **I95-53907 SSR readvertising SA to MSDP mesh peers:** Resolved an issue where MSDP SA's received from a mesh-group peer were being re-advertised to the mesh-group. This issue has been resolved by verifying sender of the SA.
------
- **I95-53915 Removing an X710/X722 port from SSR can cause high RX latency:** Deleting an SSR interface from an X710/722 NIC which is part of a multi-port device introduces RX latency into sibling ports until the SSR is restarted. This has been resolved by enabling the i40e “multi-driver” mode to preserve global registers that are shared across ports.
------
- **I95-53916 Pre-existing Teams interfaces conflict with HA interfaces:** In a Mist-managed HA configuration where an HA node has been configured with non-default HA interfaces, performing a release operation on a node in an HA pair leaves the pre-configured HA interfaces in place, and creates a conflict when a new configuration is pushed down from Mist. This would prevent the HA node from operating correctly and forming its HA connections again. This issue has been resolved, and the release operation now removes any pre-existing HA interfaces.
------
- **I95-53986 `nodeMonitor` failed to get data for `show platform disk`:** Some of the dynamic access for `smartctl` objects were not protected. A check for the object existence has been added before attempting to read it.
------
- **I95-54030 Node sending ARP requests to the wrong MAC:** After an SFP hot swap, node1 was sending ARP requests to the wrong MAC. An issue where E810 interfaces with default MTU configuration could potentially transmit corrupt ARP response packets has been resolved. 
------
- **I95-54051 Broadcom driver causing memory corruption, leading to a system fault:** Updated the driver support for BNXT NICs. 
------
- **I95-54086 Conductor memory exceeded:** In certain cases the salt master on the conductor could grow indefinitely in memory. This may be related to situations with both poor connectivity and the use of the `asset-connection-resiliency` feature. An update to the salt package has been made to resolve this issue.
------
- **I95-54091 Software Lifecycle History page does not load:** A time selector has been added to allow the user to provide parameters around the amount of data that is loaded. 
------
- **I95-54126 VRRP HA - EoSVR to VRRP HA - EoSVR not recovering after failure:** When EoSVR is enabled, VRRP packets (which are multicast frames) are not detected as destined for the SSR and are being classified as non-IP frames that should be encapsulated for EoSVR. To resolve this issue, detection/classification enhancements have been made to recognize VRRP packets that match the configured VRID and not forward them in the EoSVR tunnel.
------
- **I95-54133 IDP severity grouping mislabeled:** Resolved an issue where minor severity levels were labeled incorrectly.
------
- **I95-54155 nodeMonitor coredump on secondary node after upgrade:** During an upgrade where `deviceType` was `LTE` the attempt to get a linux interface name (not supported) failed. This issue has been resolved by implementing a device interface type verification.
------
- **I95-54180 Unable to fetch reports from Conductor GUI:** A refactor moved the connectivity check exception, which prevented a service restart. This has been resolved, and the stats now being written to the database and GUI tables.
------
- **I95-54199 Image based installation hangs in Azure:** Resolved a dependency issue causing a race condition between Azure and the SSR setup; azure agent requires networking, but `t128-firstboot-setup.sh` must run before network startup to configure the NIC names. The dependencies have been correctly sequenced.
------
- **I95-54265 Schema not included in API response for a template:** The `schema` object has been added to the API. 
------
- **I95-54294 Unable to delete capture-filter created with `&&` operator:** Resolved an issue that disallowed deleting capture-filters containing `&&`. Customers on older versions of software can work around this by creating capture-filters using `and` instead of `&&`.
------
- **I95-54398 ASM - Prune flag set incorrectly:** Resolved an issue with how outgoing interfaces in the mroute entry are reported. If the outgoing interface list only contains PIM SVR interfaces, the P flag was displayed incorrectly. The outgoing interface list is populated correctly, and the P flag now shows correctly.
------
- **I95-54434 Mist PCAP failure - inverted commands observed by the device:** In rare cases where captures are created and deleted too quickly, a delete command may be received by the device before the create command. These timing issues have been resolved.
------
- **I95-54490 Permission denied when trying to open a user config file:** Resolved a permissions issue for the `connect router` command by adding ACLs for reverse SSH so that this is accessible for admin users.

## Release 6.1.5-14

**Release Date:** September 22, 2023

### Resolved Issues Requiring Configuration Changes

- **I95-48174 Expand supported values for DHCP option:** DHCP option 43 is now a supported option, as well as a binary encoded-type (hex/byte) support. Valid examples are `0xabcdef` and `0x123456`.
------
- **I95-52163 Handle incoming public keys from peer conductor node:** Added functionality to allow conductor nodes to share the authorized keys of managed routers between each other. If the SSH public key is retrieved from a managed router by one conductor node, then it is automatically shared with its conductor peer node.
------
- **I95-52316 Enhancements to Overlapping FIB Services:** The [`fib-service-match`](config_command_guide.md#configure-authority-fib-service-match) command has been added to provide additional control over the creation of FIB entries in combination with routing updates. 
  - `best-match-only` This is the default value, and legacy behavior. When comparing prefixes from a route update to addresses configured in services, only addresses with the longest prefix match for a particular route are considered. In cases of transport overlap, services are visited in alphabetical order.
  - `any-match` introduces new behavior. All service addresses that match the route update are considered when creating the FIB entries, including those with prefixes shorter than the update or those that do not have the best match service address. The transports from the service with the longest prefix are considered first. This minimizes missed entries, but may result in a higher FIB usage. 
------
- **I95-52517 Allow users the ability to configure the OSPF SPF timers:** Support for user-configured values for SPF delay has been added. Users can now specify values for spf delay, hold-time, and maximum-hold-time. For additional information, see [OSPF SPF Timers](config_command_guide.md#configure-authority-router-routing-ospf-timers-spf).

### Resolved Issues

- **The following CVE's have been identified and addressed in this release:** CVE-2021-26341, CVE-2021-33655, CVE-2021-33656, CVE-2022-1462, CVE-2022-1679, CVE-2022-1789, CVE-2022-2196, CVE-2022-2663, CVE-2022-3028, CVE-2022-3239, CVE-2022-3522, CVE-2022-3524, CVE-2022-3564, CVE-2022-3566, CVE-2022-3567, CVE-2022-3619, CVE-2022-3623, CVE-2022-3625, CVE-2022-3628, CVE-2022-3707, CVE-2022-4129, CVE-2022-20141, CVE-2022-25265, CVE-2022-30594, CVE-2022-39188, CVE-2022-39189, CVE-2022-41218, CVE-2022-41674, CVE-2022-42703, CVE-2022-42720, CVE-2022-42721, CVE-2022-42722, CVE-2022-43750, CVE-2022-47929, CVE-2023-0394, CVE-2023-0461, CVE-2023-1195, CVE-2023-1582, CVE-2023-23454, CVE-2023-21930, CVE-2023-21937, CVE-2023-21938, CVE-2023-21939, CVE-2023-21954, CVE-2023-21967, CVE-2023-21968, CVE-2023-24329, CVE-2023-32067, CVE-2023-24329, CVE-2023-21930, CVE-2023-21937, CVE-2023-21938, CVE-2023-21939, CVE-2023-21954, CVE-2023-21967, CVE-2023-21968, CVE-2023-2828, CVE-2023-38408, CVE-2023-20569, CVE-2023-20593, CVE-2023-38802.
------
- **I95-41386/I95-52114 HA pair device interface's redundancy status stays non-redundant even though the interface operational status is up:** Resolved a race condition when selecting the active components between HA nodes.
------
- **I95-50671 Office365 traffic is not recognized:** Resolved an issue where Office365 traffic was being miscategorized and therefore not fully qualified. O365 traffic, when traversing over SVR, is no longer miscategorized.
------
- **I95-50708 Time series data for memory of the salt_master process periodically significantly decreases:** Incorrect method for polling application memory data; this resulted in dips in application memory being presented. This issue has been resolved.
------
- **I95-51336 App-ID stats entry not getting cleaned up after expiration:** In some cases, a session may not have installed correctly, preventing the expired App-ID stats from being removed. The App-ID stats entries are now cleaned up appropriately.
------
- **I95-51450 Support for 100/Full Speed/Duplex on Intel I225-V Driver NICs:** The DPDK driver has been updated to allow fixed speed and duplex configuration to work with IGC i225 NICs.
------
- **I95-51492 Password expiration not working:** This issue has been resolved. Adminstrators must use the global setting `configure authority password-policy lifetime N ` to indicate that all user passwords must be changed every `N` days.
------
- **I95-51638 Traceroute does not complete over SSR, but does using linux:** The traceroute command was unable to resolve through some network elements. The default SSR traceroute UDP port number has been changed to a more common/recognized port.
------
- **I95-51766 TX lockup detector not enabled for LAG/bonded interfaces:** The datapath lockup detection mechanism has been re-enabled to run on bond interfaces. 
------
- **I95-51800 Radius authentication failure - Incorrect NAS IP address:** The ability to specify the NAS-IP-Address and NAS-Identifier has been added to the data model for configuring these Radius options per node. This can be used in cases where the Radius server is configured to use an identifier, or in cases where it is necessary to match the source IP address of the Radius requests behind SSR or NAT.
------
- **I95-51801 The SSR is unable to see DHCP ACK for the DHCP Request sent by an EX4100:** Added an `authoritative` field for DHCP servers to enable/disable `authoritative` mode, which allows the server to send a NAK in response to unknown clients. This field is set to `true` by default.
------
- **I95-51992 Multi-queue support for Bond interfaces:** Support for a bond `device-interface` to use multiple RX/TX queues has been added. 
------
- **I95-52104 URI escape characters handled incorrectly:** The `lookup application by-domain` and `clear app-id cache-entry url` were handling url parameters incorrectly, in lookup, creating and clearing cache entries. This has been resolved and each command now performs the correct operation.
------
- **I95 52105 Permissions error when attempting to `delete certificate webserver`:** Resolved an issue where `delete certificate webserver` and `create cerificate webserver` with an existing certificate were failing. On older versions of software this can be worked around by running `sudo rm -rf /etc/128technology/pki/webserver.pem`.
------
- **I95-52113 Application Identification on the SSR runs at 100% CPU utilization:** Resolved an overrun bug that was causing the SSR to enter a loop when loading port ranges. This issue has been resolved.
------
- **I95-52147 Adding and deleting bond interfaces with the same name would leave the interface in a down state:** This issue has been resolved.
------
- **I95-52158 Spoke is rejecting hub BFD packets, and peering is unable to come up over LTE:** In a corner case where the spoke private LTE IP changes before BFD is up and the public/hub-received IP stays the same, the hub gets stuck in the init state. 
This issue has been resolved; the LTE IP change is now handled it as a source-nat change, where the flows and actions can be recreated with the updated LTE private IP.
------
- **I95-52208 Metrics queries return incomplete data when FIPS is enabled:** Resolved an issue where a FIPS-incompatible hashing function was causing missing or incomplete metrics data. 
------
- **I95-52279 Bond configured with VRRP not receiving UDP traffic when LACP is enabled:** Resolved an issue on the SSR120/SSR130 where VRRP Virtual MACs are being silently dropped by Bond PMD in LACP mode. Packets with VRRP virtual destination MACs are now correctly processed by the Bond PMD when using LACP on the SSR120/SSR130. This issue will be resolved on the SSR1200/1300/1400/1500 in an upcoming release.

- **I95-52283 Correct the Domain Matching order:** When using web filtering, the SSR now properly enforces the [Service Matching Order.](config_domain-based_web_filter.md#service-matching-order)
------
- **I95-52305 High CPU and memory utilization when Application Identification is enabled:** Resolved memory and CPU issues resulting from attempting to compact very large application identification documents.
------
- **I95-52402 Router stuck in `Upgrading` state:** Resolved an issue with `conductor-only` mode, where the conductor was attempting to download the installer before the software access proxies were in place, preventing an update to the installer.
------
- **I95-52480 Conductor shows alarms when applications are added to the router configuration:** A condition has been added that verifies whether the node is a router or conductor before running application update and generating alarms on a conductor.
------
- **I95-52491 Crash in highway process due to segmented metadata:** Resolved an issue processing metadata that is segmented across two packet buffers. The segmented packets are no longer discarded and the dataplane no longer crashes when processing a packet comprised of segmented metadata.
------
- **I95-52547 Unable to set DHCP option 160:** Resolved an issue where DHCP option 160 was being treated as a standard option and was unavailable to be defined as an option. When it was set, it would prevent the DHCP server from starting. This has been corrected. 
------
- **I95-52599 Conductors display different assets on different HA nodes:** If the state table of an inactive HA node becomes out of sync with the active HA node, then some assets were being skipped when parsing the asset state response. This issue has been resolved through the reporting of asset IDs from the active node state table. 
------
- **I95-50562 / I95-52626 Forwarding plane control message bursts create exception, causing a packet buffer leak:** Resolved a condition where backpressure caused the messaging mechanism to develop buffer leaks. Proper handling of exceptions now prevents buffer leaks. The control buffer capacity has been increased to better handle bursts as part of the resolution.
------
- **I95-52650 Asset state transition on conductor is slow for deployments with greater than 250 routers:** An optimization was made to an internal calculation and improve the speed at which synchronization requests are processed.
------
- **I95-52816 Config Validation may generate errors in the wrong field:** Resolved an issue during the validation of BGP graceful-restart configuration settings that could lead to generating incorrect errors/warnings during configuration validation.
------
- **I95-52822 ARP fails to resolve:** An earlier change caused ports on an X553 that use SFPs to no longer correctly report link status. This issue has been resolved and the link status is now reported accurately. 
------
- **I95-52968 Configuration template not being applied by the conductor to a router during upgrade:** Resolved an issue where a managed router would silently fail to apply a configuration from a conductor with a greater software version if the configuration contained features that the router's earlier SSR version did not understand. Specifically, if a config field such as an enumeration, that the router was aware of, had new values added to it in the conductor's version of software then the configuration would not be applied.
------
- **I95-52971 Inconsistent hash and signing of RPM files:** Some small number of RPM files did not usen the `sha256` hash for sigining. This has been corrected and all RPM packages on the distribution ISO are digest sha256 for Common Criteria.
------
- **I95-53017 Some files incorrectly marked as executable:** Some cache files were incorrectly marked as executable, and were flagged as part of the Common Criteria validation. These files have been correctly identified and marked. 
------
- **I95-53285 User datastore issue when renaming a router:** Resolved an issue where HTTP requests would stop working to a router after the router's name was changed, but before the SSR was restarted.
------
- **WAN-2090 Conductor managed SSR applications in WAN Insights showing up as numbers:** Resolved an issue with stats APIs, which were not properly handling some internal service names.

### Caveats

- **I95-52426 Incorrect behavior when configuring an IDP custom rule definition:** In a case where a user is modifying a rule to **decrease** the action type to an `alert`, alerts for that vulnerability will not work. The attack will be allowed to pass through undetected. For example, if the action `close-tcp-connection` is downgraded to `alert`, the attacks will pass through undetected.
This issue is actively being addressed, and will be resolved in an upcoming patch release. If you need to use this specific functionality, we recommend creating a custom exception rule specifying the source and destination IP address, along with the vulnerability name, rather than downgrading a vulnerability to an `alert`. 
------
- **I95-53124 Sessions destined to private IP address (RFC1918) are incorrectly reported using the application name as the service name:** We have identified an issue where sessions destined to private IP address (RFC1918), are incorrectly reported with the application name as the service name, even if the traffic is HTTP/HTTPS. Session traffic continues to follow the appropriate service / routing profile, but the stats reported may not accurately reflect the learned applications. This is actively being addressed and will be resolved in a future patch.
------
- **I95-53878 Dynamic Reconfiguration with LAG/LACP:** Any changes to the LAG configuration require a restart of the 128T service. Configuration changes to the LAG should be performed during a maintenance window, as the changes may disrupt traffic flow. 

### Known Issues

- **I95-52977 Mellanox NIC Port Appropriation:** Port 4791 is an IANA reserved port for ROCEv2 and should not be used for user traffic. 

## Release 6.1.4-23.r2

**Release Date:** July 14, 2023

### New Features

- **I95-466 LAG/LACP Support:** Link Aggregation Groups are formed by connecting multiple ports in parallel between two devices. LACP is the protocol that defines how the group of interfaces operates. Users define the LAG interface and then configure the member device interfaces. This feature is currently in Beta; for more information, a list of supported devices and caveats, see [Link Aggregation and LACP](config_lacp.md).
------
- **I95-10141 LLDP Support:** The LLDP mode and parameters allow users to configure the device interface to disable LLDP advertisements, set a `receive-only` mode, or enable sending and receiving LLDP packets. For information about configuring LLDP, see [`lldp`](config_reference_guide.md#lldp).
------
- **I95-20864 Support for Multicast:** Multicast is a “one source, many destinations” method of traffic distribution. For more information, see [Multicast](config_multicast.md). The previous implementation of multicast has been replaced by this new version and is no longer supported. The issue relating to encryption (I95-48792) is addressed in the new implementation. 
------
- **I95-44473 Application Steering:** Application Steering provides the ability to configure unique steering policies for individual applications based on the application name, category, application signatures, URLs, and domains. Once the traffic has been classified, it can be steered across the available paths. For more information, see [Application Steering](config_application_steering.md).
------
- **I95-49928 BGP over SVR Inter-Hub Steering:** Path based BGP over SVR Routing responds to changes in peer adjacency, operational status, or SLA. It adds the ability to select and advertise BGP routes between BGP over SVR neighbors. It does this by monitoring the peer paths between BGP over SVR peers and dynamically adjusting the BGP neighbor inbound and outbound policy on those peers to reflect the priority and SLA of the peer paths. For more information, see [BGP over SVR Inter-Hub Steering](config_bgp.md#bgp-over-svr-inter-hub-steering).
------
- **I95-50571/I95-50949/I95-51039 Add packet buffer tracking to help analyze buffer exhaustion:** Packet buffer location tracking has been added, and the following PCLI commands have been created for buffer tracking. 
  - `show packet-buffer locations`
  - `save packet-buffer snapshot`
------
- **I95-48014 IDP Custom Rules and Policies:** Users can customize an existing base IDP policy by creating exception-based rules. Using an existing IDP policy, you can modify the profile to allow the specific traffic to flow as expected within the network. See [IDP Custom Rules](concepts_ssr_idp.md#idp-custom-rules) for overview information, and refer to [Modifying IDP Policies](config_idp.md#modifying-idp-policies) for configuration information.
------
- **I95-50973 DSCP Steering with BGP over SVR:** [DSCP steering](config_dscp_steering.md) is now supported on BGP over SVR.
------
- **I95-51105 Options added to the import operation to enable or disable checking the signatures of RPMs:** The `import iso` command now verifies the signatures of all imported RPMs. This is controlled from the PCLI by passing in the `check-rpm-signature {required(default) | allow-unsigned | disabled}` option to require that all RPMs are signed and verified, allow importing ISOs with unsigned RPMs and verify those that are signed, or to disable the signature checking altogether. 
------
- **I95-51296 Show `Time in Status` in the `show assets` detail view:** The asset `Time in Status` field has been added to the Detail view. 
------
- **I95-51946 Add LAG related TLVs to LLDP:** Support for LLDP on LAG interfaces has been added.

### Resolved Issues

- **The following issues have been resolved as part of our ongoing security certification-related initiative:** I95-48924, I95-48927, I95-48928, I95-48943, I95-49912, I95-49913, I95-49914, I95-50535, I95-51397, IN-533
------
- **I95-35069 Disallow changing the role of a node:** Once set, changing the role of a node cannot be changed. The configuration validation process has been updated to not allow this change. 
------
- **I95-46895 Teams traffic classified as Azure:** Improvements made to the application database `ip-protocol-port lookup` during session classification. 
------
- **I95-47960 Incorrect progress message for `show dns resolutions`:** The progress message for this command now correctly displays `Retrieving dns resolutions...`.
------
- **I95-49587 ICMP session classification improvement:** The application lookup for ICMP sessions now accurately identifies the correct service.
------
- **I95-49598 Automatically choose the number of session-processor threads:** If session-setup-scaling is provisioned to true, the SSR will now automatically determine the number of threads to use for session processing.
------
- **I95-49791 Audit rules to track modification of config files:** Added rules to track the modification of grub configuration files, to aid in troubleshooting. 
------
- **I95-50338 "About this System" link on GUI not working:** The link target is no longer valid, and the link has been removed from the GUI. 
------
- **I95-50632 Add Buffer tracking monitoring to lockup detector:** LockupDetector is now able to identify and take corrective action should a network packet pool buffer exhaustion event occur. 
------
- **I95-51003 `show stats process queue depth` command is redundant:** The redundant `process/queue/depth` statistic has been removed. It is superseded by `process/thread/queue/depth` and the information available using `show stats process thread queue depth` and related commands.
------
- **I95-51053 ESP session stuck in Incomplete state:** Resolved an issue where SVR sessions from network-interfaces with `dscp-steering enabled` can be stuck in an incomplete state.
------
- **I95-51081 `bgp-service-generation service-policy` is being filtered on the conductor:** The `bgp-service-generation service-policy` is now marked as authority wide so it is not filtered. This prevents managed routers from rejecting configurations containing `bgp-service-generation` and getting out of sync with the conductor.
------
- **I95-51167 Unable to override auto-generated peer service-route:** The user can now provision a `service-route` with the same `name` as an automatically-generated one. The user's `service-route` takes precedence and will be used instead of the generated one.
------
- **I95-51177 Ethernet over SVR setting wrong egress MAC address:** Ethernet over SVR now correctly sets the egress MAC address when using `outbound-only` mode.
------
- **I95-51178 Increase default `juteMaxBufferSize`:** The default `juteMaxBufferSize` has been increased to 10MB, which addresses issues where the device is unable to commit very large configurations.
------
- **I95-51201 Autocompletion in `adopt` command generates invalid organization name:** When using tab-completion to enter the site name from the `adopt` command in the PCLI, it will add quotations around the site name if there are whitespaces in the name. The PCLI now properly handles quotes and whitespace in organization names when running the PCLI adopt command.
------
- **I95-51203 Update stats retention periods:** Some of the `process/thread/queue`  statistics are now recorded for a longer time period, and are available in custom charts and tables on the Conductor.
------
- **I95-51235 Remove service-address overlap warning:** Configuration validation warnings for overlapping IP addresses within the same service are no longer generated, because they are valid in certain scenarios. A new warning has been added when a service address of only "0.0.0.0" (without the trailing prefix /0) is provisioned.
------
- **I95-51284 Routers remain in the connected state:** Updated the dependencies within the salt minion to resolve an issue where an asset is stuck in the connected state, displaying the error: `Error getting asset's public key: 'ssh.set_auth_key', retrying...`.
------
- **I95-51296 Show Time in Status in the show assets detail view:** The asset Time in Status field has been added to the Detail view.
------
- **I95-51359 Unable to set the OSPF MTU:** Added the ability for users to set the MTU to a non-default value.
------
- **I95-51403 GUI displays "Download in Progress" even after the download is complete:** Resolved an issue where a download success event is not created after the version shows up as downloaded in the Software Versions. 
------
- **I95-51427 GUI not displaying all the version information:** The GUI About page now displays additional version information previously only displayed in the PCLI `show system version detail`.
------
- **I95-51629 `ingress-source-nat-pool` should not display non-SVR traffic:** Previously, the `ingress-source-nat-pool` configured under `network-interface` applied to both SVR and non-SVR sessions. Now it only applies to SVR sessions.
------
- **I95-51635 `traceroute` command unable to resolve an endpoint:** Resolved a scenario where an aborted `traceroute` command that was not able to resolve could result in a highway process crash.
------
- **I95-51650 `log-category PCLI` command not working:** Resolved an issue that disallowed setting `config authority router <name> system log-category PCLI`. We now also allow configuring the following log categories:
  - CFGD
  - SNMP
  - HTTP
------
- **I95-51658 Allow `sync` command in resynchronizing state:** Resolved an issue where the user received an error when executing the `send command sync` command while an asset was in the `resynchronizing` state.
------
- **I95-51714 Adding and deleting a `domain-name` in the same operation causes an error:** Resolved an issue in the configuration validation that generated an error when duplicate domain-names are removed from and added to the service configuration.
------
- **I95-51734 Remove duplicate transport port-ranges from modules before adding to service:** Resolved an issue where FIB entries are not installed when app-id modules have conflicting or overlapping port-ranges, and are being placed into one service.
------
- **I95-51788 Path index is not displayed correctly for `show sessions by-id`:** `show sessions by-id` has been updated to display MTU and PathIndex.
------
- **I95-51792 Low MTU threshold causing metadata fragmentation:** Fixed the incorrect handling of packets where metadata is fragmented due to unreasonably low MTU, causing the packet buffers to become exhausted.
-----
- **I95-51793 Path MTU discovery dropping very low:** Fixed PMTU discovery from ever resolving to an unreasonably low MTU, which could previously occur during a link flap event.
------
- **I95-51794 Core dump on systems with greater than 10 physical interfaces, such as Lenovo SR-650:** Resolved an issue where the SR-650 was crashing due to uninitialized flags field. Support has been added for these devices. 
------
- **I95-51865 NTP not syncing for HA nodes:** Added the ability to configure the orphan stratum for the HA peer node. This was previously hard-coded to 5 but this change allows an HA peer to sync when the upstream server is of a lower stratum, if so desired by the user.
------
- **I95-51915 Report buffer allocaction failures:** `alloc-failure` stats are now gathered per device and included in the device stats, allowing the watchdog to detect a failure and respond.
------
- **I95-51951 Packets not being properly encapsulated in BFD:** Path metrics drop packets are now properly encapsulated when SVR over BFD feature is enabled.
------
- **I95-51964 Make the loopback-address available on the conductor:** The loopback-address configuration  is now accessible on the conductor, and allows for a per node user defined address to be configured for overlay management traffic.
------
- **I95-52083 Race condition with `application-identification`:** Resolved a race condition on systems with 4 cores and 8GB RAM running `application-identification` resulting in a failure of packet forwarding.
------
- **WAN-1471 Cannot distinguish between an SSR installed with OTP ISO and IBU image:** The `show system version` PCLI command now clarifies image-based or ISO in the summary view as well as the detail view.

### Caveats

- **I95-52426 Incorrect behavior when configuring an IDP custom rule definition:** In a case where a user is modifying a rule to **decrease** the action type, for example, the action `close-tcp-connection` is downgraded to `alert`, this may impact other rules, and some attacks may pass through undetected. 

  **Example:** If `HTTP:SQL:INJ:HEADER-1` is excluded from the ruleset, some other `HTTP` attacks may pass through undetected. **This behavior only occurs when decreasing the action type in the rule;** i.e.; the action `close-tcp-connection` is downgraded to `alert`. 

  This issue is actively being addressed, and will be resolved in an upcoming patch release. If you need to use this specific functionality, we recommend avoiding this configuration and waiting for the SSR 6.1.5 patch release.
------
- **I95-53777 Multicast traffic not passing after HA Failover:** High Availability with Multicast is not fully supported. Drop or complete loss of traffic may be seen when the primary node resumes traffic after a node failure and failover.

## Release 6.1.3-4

**Release Date:** May 22, 2023

### Resolved Issues

- **I95-48931 Service area Highway crash:** Now prevents crashing in SSR's highway process in unusual race conditions when a session's flow is removed before the session is fully established.
------
- **I95-50722 Highway crashes during session migration:** Resolved a crash in the SSR's highway process, due to a race condition between configuration changes and BFD sessions.
------
- **I95-51364 Highway crash on both nodes of an HA system:** Resolved a crash that can occur in the highway process of the SSR, due to spurious redundancy database errors. This redundancy database is present on all SSR instances, and may contain an unexpected IP address of 0.0.0.0 (such as netbios) due to session traffic, which can generate errors and ultimately cause a highway crash. The exception causing the errors is now caught and the issue has been resolved.
------
- **I95-51378 REST API improvements:** Performance improvements have been made in the metrics REST APIs to alleviate issues with intermittent metrics graphs on heavily loaded systems.
------
- **WAN-1958 Mist agent crashes:** Increased internal file system limits which were preventing some services from starting correctly at boot. Limits were raised based on expected system usage. 

## Release 6.1.2-7

**Release Date:** May 12, 2023

### Resolved Issues Requiring Configuration Changes

- **I95-48862 Load balance sessions across BGP RIB Entries with multiple paths:** Resolved an issue when BGP was used to build a routing table, only the first next hop was used. All next hops are now used, and load balancing occurs over all routing protocol routes. 
------
- **I95-50510 New fields for IPFIX:** The SSR IPFIX implementation was not sending the industry standard fields of `flowStartMilliseconds` and `flowEndMilliseconds`. In the new implementation, all IPFIX records include these fields. The start time is set to the start time of the flow, and the end time is always set to the time the last packet was received on the flow. For intermediate records, this indicates that the flow is still ongoing but provides the last activity timestamp. For the end records, this indicates when the last packet was received on the flow prior to the session terminating. For additional information, see [IPFIX](concepts_application_discovery.md#ipfix). 
---
- **I95-50571 Add packet buffer tracking to help analyze buffer exhaustion:** The following features have been added to help diagnose frequent packet buffer pool depletions in customer environments:
  - Track packet buffer locations. 
  - Enforce setting of packet location.
  - Add the ability to walk packet buffer pools, count the locations, and display. 

### Resolved Issues

- **The following CVE's have been identified and addressed in this release:** I95-50535, I95-50790.
------
- **I95-47776 Tank hostname parsing errors:** Resolved two issues in the Tank instance where the localhost could not resolve to an IP address, and Tank was not identifying non-default ports. These issues have been resolved. 
------
- **I95-48518 Application Identification not recognizing Apps on HA systems:** Resolved an issue where the GUI was only pulling Application data from one node in an HA configuration. Application ID Summary display now aggregates data from both nodes.
------
- **I95-49594 Highway Crash:** Resolved an issue for systems where any of the following are configured:
  - `application-identification` is enabled, 
  - a service is defined with `domain-name child services`, or 
  - a `service address` is configured as a `domain`
and there are established flows for any of these services, a link flap triggering a flow invalidation (changes to FIB) will induce a crash in the highway process of the SSR. This issue exists in versions 6.1.0 and 6.1.1, and is resolved in 6.1.2.
------
- **I95-49603 Process Manager crash:** When a long running process was being cleaned up by the subprocess, the cleanup would fail causing a crash. Long running processes are now properly terminated, which allows the cleanup subprocess to complete correctly. 
------
- **I95-49754 Waypoint re-use causing duplicate reverse flows:** Resolved a case where when the waypoint pool is nearly depleted, released waypoints were reused prematurely causing errors when installing reverse flows.
------
- **I95-49969 Permission Denied error when attempting to self-generate a webserver certificate:** Resolved an issue that prevented users with the admin role from creating a new self-signed web certificate via the PCLI command `create certificate self-signed webserver`.
------
- **I95-49974 Stuck flow not cleared when reverse metadata is incomplete:** Resolved an issue where reverse metadata is coming through incomplete - without the source tenant. The source tenant has been added to the reverse metadata.
------
- **I95-50363 MOS Metrics not refreshing:** Resolved an issue where the SLA and MOS values were not being updated in the stats (or PeerPathTable) when a BFD session was brought down. The SLA and MOS stats are now set to 0 when the BFD session is brought down.
------
- **I95-50543 systemd unable to start 128T after upgrade:** This issue has been resolved by ensuring that the netfilter kernel is installed.
------
- **I95-50710 Configuration cannot be applied to router when its time is ahead of the conductor:** Implemented time detection for configurations using a future time that is corrected upon commit. This resulted in an `mtime` older than what is in the datastore, and the configurations were rejected.
------
- **I95-50736 SSH key change not propogated to secondary conductor:** Resolved an issue where an SSH key change to `/etc/128technology/ssh/pdc_ssh_key` was not automatically detected and resynced between peer node and conductor nodes. 
------
- **I95-50778 Event History filter not working:** Resolved an issue where searching on the Event History page didn't show matching results when the search string is only found in the **Details** column.
------
- **I95-50823 Support for time-offset DHCP option:** `int-32 encoded-type` has been added to provide support for the time-offset DHCP option.
------
- **I95-50834 NodeMonitor crash on 128T startup when hardware interface is missing:** Resolved a `NodeMonitor` crash when the interface configuration is not present. 
------
- **I95-50967 SSR is not allowing other DHCP relay traffic to pass through:** When the SSR acts as a DHCP Relay, it will no longer drop packets received from other relay agents on the network. Instead the packets will be routed appropriately as per the configured policies.
------
- **I95-50977 Installer fails to download software when the Conductor software proxy is enabled:** Resolved an issue where when the Conductor software proxy is being used, DNF transactions to the conductor repo go through the proxy, despite the repo pointing to a local tunnel to the conductor. These transactions now go through the proper tunnel. 
------
- **I95-50979 Routers remain in connected state:** Resolved an issue where assets will perform a new highstate unnecessarily if a commit occurs while a highstate is already in progress, causing assets to take a long time to get to the running state.
------
- **I95-51006 Nodes stuck in connected state after upgrade:** On an HA conductor, if the user is performing an upgrade on the first conductor node and that user makes a config commit during the upgrade, then the configuration's modified time will become out of sync between the two conductor nodes. When the conductor first node is finished upgrading the result is a loop where the configuration keeps getting committed by each node back and forth until a new commit is made. This issue has been resolved by allowing the peer conductor node to accept the config despite the perceived version disparity. Please note performing a commit mid upgrade is not supported. 
------
- **I95-51007 Conductor is incorrectly honoring core pinning:** The cpuProperties cores setting in /etc/128technology/local.init was erroneously isolating cores on conductor nodes when set, even though this setting is intended for a router. This would cause a reduction in available processing cores for normal conductor operations. This setting will now be ignored on the conductor.
------
- **I95-51021 Package to Image conversion fails on FIPS enabled SSR:** Conversion of `package-based` to `image-based` is now supported for systems with FIPS 140-2 mode enabled.
------
- **I95-51044 Hide `forwarding-core-mode` on conductor:** Disabled the `forwarding-core-mode` setting on conductor nodes, since this setting doesn't apply to conductor.
------

### Caveats

- **I95-51087 SSR fails to download firmware after upgrading the conductor:** An issue has been identified where the first time a conductor is upgraded and **conductor-only** is selected in the software-update settings. The proxy service on the conductor does not work correctly, and downloads attempted by the router will fail. This issue will be resolved in the next release. 

  **_Workaround:_** Make a simple configuration change and commit the change. Any configuration change is sufficient to start the internal proxy service. Once this commit has been made this will no longer be an issue.

## Release 6.1.1-6

**Release Date:** April 28, 2023

### Resolved Issues

- **I95-48965, I95-50070, I95-51086 Race condition with routing updates inducing crash in highway process:** Resolved an issue where a routing change that affects the `forwarding-table` can incur a race condition with sessions completing and being removed, which could lead to a highway crash and restart.
------
- **I95-51052 NAT changes in network may cause sessions to fail:** If `session-scaling` is set to `enabled` with `outbound-only`, and a NAT between the routers causes an address and/or port change for existing TCP or UDP sessions between them, the SSR may not automatically recover idle or one-way traffic sessions. <br/>
The impacted sessions will time out when all packets for the failed sessions stop. New sessions are not impacted, nor are any pre-existing sessions with regular bi-directional traffic.
------
- **I95-51093 Race condition in `session-scaling` can cause crash/restart:** Resolved an issue when `session-scaling` is set to `enabled` together with `outbound-only`, a race condition can cause a crash and restart of the `highway` process in the SSR.

## Release 6.1.0-55

**Release Date:** April 14, 2023

### New Features

- **I95-21086 Traceroute:** Traceroute is implemented as a troubleshooting tool, allowing you to debug connectivity from point to point. For more information, see [Traceroute.](ts_traceroute.md)
------
- **I95-38746 [`show arp [<verbosity>]`](cli_reference.md#show-arp):** Added the `<verbosity>` subcommand to provide additional information, including time to next refresh (ms), retry count (if expired), and time of last resolved ARP.
------
- **I95-40660 Kernel Upgrade:** The OS kernel has been upgraded to address several CVEs and provide support for the i225 NIC, Wireguard, and Cordoba. 
------
- **I95-40130 Create factory defaults for all router-conductor communication:** SaltStack, Conductor, and IKE default session-types have been added. For new deployments, SIP, SIPS, and IPSEC-NAT use NAT Keep Alive by default, and the timeout for IPSEC-NAT is now 5 seconds.
------
- **I95-41728 Session Recovery Detection:** `session recovery detection` provides an effective monitoring method for session recovery. When `inactivity-based detection` is enabled, the originating node monitors activity on the flow, and takes action if no activity is detected for a specified time. For additional information, see [Session Recovery Detection.](config_session_recovery.md)
------
- **I95-42282 Highlight errors in Template:** Highlighting has been added for errors found in a template, making it easier to find.
------
- **I95-42379 BGP over SVR global service policy:** [Security and Service Policy](config_bgp.md#security-policy-and-service-policy) configuration options are provided for specifying the policy to be used for generated BGP-over-SVR services. 
------
- **I95-42483 STEP Diagnostics in GUI:** A Debug table and Replay visualization have been added to aid in STEP diagnostics. 
------
- **I95-44456 Support for DHCP vendor options:** DHCP options are now configurable on the SSR from the Mist dashboard. 
------
- **I95-47136/MIST-62741 Settings for WAN Link Speed and Duplex (Mist-managed):** With this update, the auto-negotiation, disable, and speed/duplex settings are visible in Mist.
------
- **I95-47259 Session Setup Scaling:** The [`session-setup-scaling`](config_reference_guide.md#session-setup-scaling) feature improves the session setup rate by enabling multi-threaded processing. 
------
- **I95-49824 SVR Transport Reuse** In deployments where the number of SVR sessions between SSRs are limited due to carrier settings, the established BFD transport session is reused to carry SVR sessions. For details about using this feature, see [SVR Transport Reuse.](config_bfd_tunnel.md)
------
- **I95-50159 Automatic mesh created for route-reflector topology:** Enables the generation of additional BGP service-routes for creating mesh connectivity between all clients of a route reflector. See [Service-route Mesh For Route Reflector Clients](config_bgp.md#service-route-mesh-for-route-reflector-clients) for additional information. 

### Resolved Issues

- **The following CVE's have been identified and addressed in this release:** I95-46020, I95-48448, I95-48455, I95-48458, I95-48859, I95-49456, I95-50358, I95-50359, I95-50506, I95-50508, I95-50523. 
------
- **I95-36758 Redistributed service route distance not configurable:** Support has been added for the configuration of admin distance for kernel routes generated by services with service routes and for BGP over SVR services.
------
- **I95-37833 Apply password policy more consistently:** The password policy for SSR users has been updated, and now requires passwords to have a special character in addition to previous requirements. 
:::important
Please refer to [Password Policies](config_password_policies.md) for updated password requirements.
:::
------
- **I95-40130 Factory Defaults for Conductor Communication:** Added SaltStack, Conductor, and IKE default session-types. For new deployments, SIP, SIPS, and IPSEC-NAT use NAT Keep Alive by default, and the timeout for IPSEC-NAT is 125 seconds.
------
- **I95-40904 Power save mode not working:** Add a method to read current power saver mode setting from existing config before committing the new configuration, and changing the setting.
------
- **I95-41992 Warning for Rate-Limit with Flow-Limit values at 0:** A warning has been added to advise users that this will cause dropped packets.
------
- **I95-43239 LTE APN on Modem not set up correctly:** The APN is now always written to the the modem using the default index of 1.
------
- **I95-43779 DHCP IP Address is not refreshed when cable is physically removed and reinserted:** Updated the state machine to cause DHCP-enabled interfaces to send out a DHCP Request for their current IP address.
------
- **I95-44142 Automated Provisioner race condition:** Resolved a rare crash where applications would attempt to get information about already-closed sockets when responding to API requests.
------
- **I95-44443 NTP Server config not honored when back-to-back configuration changes are made:** Resolved an issue where NTP configuration was changed but the backend would not take action on those changes.
------
- **I95-44722 Time series HMAC failures after rebooting node in HA router:** Device interfaces are flushed upon becoming active to avoid handling of packets which have been delayed due to inactivity.
------
- **I95-44757 Quickstart validation error when quickstarting a conductor:** The quickstart validation process no longer requires an IP address when quickstarting a conductor.
------
- **I95-44769 Add Linux system logs to the Tech Support Information data:** This patch allows for customizations of the systemd journal content included in the `tech-support-info` bundle, and includes additional default content.
------
- **I95-44988 SSR Stuck in Upgrade status:** Improved logging to detect when an installer session is started and there is an already an active interactive installer session; for example when an interactive installer session was left open.
------
- **I95-45063 SSR azure instances unstable on large machine types:** Resolved an unpgrade issue causing instability in Azure instances using Mellanox5.
------
- **I95-45113 SNMP override of the IfTable:** `ifAlias` and `IfDescr` have been swapped in our SNMP reporting; `ifDescr` is always the `ifName`. This change was made for consistency with other Juniper products.
------
- **I95-45146 GUI error message for users authenticated by LDAP to Active Directory Server:** This issue has been resolved.
------
- **I95-45162 Improve download/upgrade error message if a router name does not exist:** In situations where a router does not exist, the download and upgrade message now indicates that the router does not exist.
------
- **I95-45164 `show-active-peers` missing some information:** Resolved a corner case where an RFC-compliant device ahead of a non-compliant device with a smaller MTU, the SSR misinterprets the non-compliant device's timeouts and the MTU will be unresolvable.
------
- **I95-45220 Managed routers do not connect to newly added HA conductor:** Resolved an issue when transitioning a conductor from standalone to HA, the managed routers were not automatically connecting to the newly added conductor node.
------
- **I95-45489 `ifcfg` custom options are not real-time configurable:** Resolved an issue where interface `ifcfg` option changes were not being processed.
------
- **I95-45541 LDAP users are unable to login to the PCLI due to permission errors:** This issue has been resolved.
------
- **I95-45559 Corrupted resolv.conf after ODM imaging:** Resolved an issue on SSR systems running dns-proxy services with external interfaces configured using PEERDNS=yes, where a race condition may occur that results in corrupt nameservers being added to the /etc/resolv.conf file.
------
- **I95-45641 Stuck BGPoSVR Sessions after Failover:** Made changes to provide updates to less specific FIB entries when routes are updated to resolve this issue.
------
- **I95-45643 Users that were created by non-admin users were missing after upgrade:** Resolved a config type conversion issue that caused users to disappear after upgrade.
------
- **I95-45814 No Bandwidth statistics visible in GUI:** Resolved an issue when processing high numbers of services and service routes which prevented a subset of stats from being stored and displayed.
------
- **I95-45882 Invalid DHCP server config causes a crash:** Resolved an issue when the DHCP server was misconfigured with duplicate interfaces and then committed, the validation would not catch this and cause a crash. The SSR code has been hardened to handle the misconfiguration.
------
- **I95-46169 RIB Doesn't Update Connected Route After Changing Network Interface Address Prefix from /24 to /27:** Resolved an issue when changing the prefix length for a network interface address, the RIB was not updated and routing protocols were not aware of the change.
------
- **I95-46230 Exceptions with invalid giid causing a highway crash:** Resolved an issue where uncaught exceptions (invalid giid of 0) were causing highway issues.
------
- **I95-46419 Forward Error Correction (FEC) with OutBound Only Fails:** Resolved an issue where FEC actions are not installed properly after the modifcation to resolve the outbound only path.
------
- **I95-47362 Internal process SSH tunnel watchdog:** Implement a watchdog for the SSH tunnels maintained by SCM. If the watchdog detects a dead connection, it will:
A) if the connection is a critical one, restart the 128T service, or
B) if the connection is not critical, terminate the application that owns the dead connection. If this fails, it will then attempt to restart the 128T service.
------
- **I95-47662 Switch to only using VFIO when binding devices for DPDK:** The SSR now uses VFIO to bind devices to DPDK, providing better support for NICs. 
------
- **I95-47750 DHCP client interface info not listed in "show dhcp v4 detail" pcli command output:** The software now expects redundant interfaces with a non-zero vlan to have the vlan at the end of the line, after the list of comma-separated interfaces.
------
- **I95-48274 Mixed IDP policy causes traffic to fail:** When a tenant is configured with an IDP policy enabled, and shares a service with another tenant that does not have IDP enabled, all traffic was being steered through the IDP. This issue has been resolved; the SSR now will automatically split the service into a maximum of 4 idpPolicy services; `alert`, `strict`, `standard`, and `none` to allow the correct handling of traffic. 
------
- **I95-48571 IDP topology improvements in the GUI:** The SSR now includes the auto-generated IDP mode if enabled as a part of `show idp application status`. Additionally, enabling `hub` mode will not result in engine bring-up errors.
------
- **I95-49340 Crash when the unexpected input of tenant-prefixes with no source-addresses is committed:** Validation has been added to restrict the tenant-prefixes's source-addresses to a minimum of one.
------
- **I95-49604 No alarm raised when a node is disconnected from the internal synchronization database:** When nodes are unable to connect to the internal synchronization database, a critical alarm is now raised.
------
- **I95-49675 Incorrect path in console help message for `export config running`:** The help message now correctly identifies the export path: `Exported files are stored in /etc/128technology/config-exports/ and are stored as GZIP compressed files.`
------
- **I95-49913 Some Login/Logout Events not logged in Audit Logs:** A new function has been added to create an event to process USER_LOGOUT audit messages. 
------
- **I95-49925 GRE tunnel health-check not migrating sessions when path is down:** The GRE tunnel manager now removes all sessions before adding new ones rather than modifying the existing sessions. 
------
- **I95-49974 Stuck flow is not clearing when the reverse metadata is incomplete:** Added the source tenant to the reverse metadata to prevent the metadata parsing exception. 
------
- **I95-50047 Conductor config unable to pass local validation on one of the routers:** Resolved an issue where a router missing the `reachability-profile` configuration may pass validation on conductor.
------
- **I95-50247 Duplicate peer path alarms:** Resolved an issue where both BFD and the path MTU feature were generating alarms for the same peer path being down. The criteria for which peerPath state changes can trigger peer path events has been tightened.
------
- **I95-50260 `show idp events` does not honor the `router` or `node` arguments:** Resolved an issue where `show idp events` did not honor the `router` and `node` arguments and always executed against the local node. The command is now executed correctly, using the specified arguments.
------
- **I95-50262 Unconnected routers not rotating logs often enough:** Resolved an issue where a managed router was not able to pull down the configuration from the Conductor - which includes the log rotation config. The default salt log rotation configuration has been improved, preventing the log from growing too large before the connection to the Conductor can be established. 
------
- **I95-50269 Router clone operation fails:** Implemented checks to prevent cloning obsolete elements and internal lists/containers on legacy versions of the SSR software (pre-4.4).
------
- **I95-50286 Rebooting a node of an HA pair from Linux breaks routing:** Resolved an issue where a delay in the shutdown process caused a node to take over a VRRP interface, creating routing issues. 
------
- **I95-50331 System fails to synchronize keys on startup:** The SSR now dynamically updates rsync IP host address from the non forwarding HA sync interfaces, and will fall back to the global.init host IPs if they don't exist.
------
- **I95-50376 Failure to make config changes after rollback:** Resolved an issue where commits would not take effect after rolling back an HA router, because of older/newer version conflicts. 
------
- **I95-50409 Audit Log Collector cleanup:** Templates have been applied to Audit Log Event processing to reduce code duplication.
------
- **I95-50445, I95-49377 i40e and ice devices enter malicious descriptor detection state, preventing forwarding of traffic:** Resolved an issue where fragmented packet chains larger than 8 buffers were discarded causing a malicious descriptor event. 
  - The below `dpdk.log` snippet provides an example of the event:
```
[DPDK| -- ] ERROR (00007f03ec18e700) i40e_dev_alarm_handler(): ICR0: malicious programming detected
[DPDK| -- ] WARN  (00007f03ec18e700) i40e_handle_mdd_event(): Malicious Driver Detection event 0x02 on TX queue 6 PF number 0x01 VF number 0x00 device 0000:08:00.1
[DPDK| -- ] WARN  (00007f03ec18e700) i40e_handle_mdd_event(): TX driver issue detected on PF
```
  - Added hooks for the NIC driver to trigger an unrecoverable event and invoke the Highway lockup detector mechanism.
------
- **I95-50534 Race condition between NetworkInterfaceManager and FastLane:** Resolved a race condition caused by adding and deleting the same network interface in a very short window of time, potentially causing a system crash.
------
- **I95-50554 No dynamic synchronization of repos to the routers:** Resolved an issue where it was necessary to restart 128T on the Conductor in order for the Conductor to recognize newly added repositories and sync them down to the assets. Authenticated repos are now automatically synchronized when repos are added to the conductor. 
------
- **I95-50699 Upgrade process to 6.0.8 failure:** Mist-managed systems with low available memory could fail to upgrade. An updated dependency and fix for these Mist-managed systems has been published via the cloud and will be absorbed the next time a customer attempts an upgrade.
------
- **I95-50754 Race condition between ICMP ping request and a reverse flow:** Resolved a crash due to a race condition when `service ping icmp-request` is matched against a partially installed flow.
------
- **I95-50787 Rebooting the OS from the conductor throws error code 400:** Resolved an issue in the GUI with the reboot button on the Router page. When trying to reboot a router, the button would fail and display "Error: EOF"; this has been resolved. 
