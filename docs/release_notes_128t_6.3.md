---
title: SSR 6.3 Release Notes
sidebar_label: '6.3'
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

- **I95-43243/IN-460 Upgrade and Rollback:** Upgrading or rolling back a system (conductor or router) with the interactive installer `install128t`, that is managed by a conductor may result in the system becoming unresponsive. It is recommended that upgrades be performed through the conductor UI. Manual upgrades and rollbacks may not be resilient to failures. See [Rolling Back Software](intro_rollback.md) for more information on these operations.
------
- **I95-42542 Conductor Upgrade Time:** Upgrades can take up to 40 minutes due to the number of rpms being upgraded. Please plan accordingly.
------
- **I95-42624 Upgrade Installer:** Before **upgrading to, or installing** version 5.4 and above, update the Installer to at least version 3.1.0. Failing to upgrade the installer may result in a rollback failure, should a rollback be necessary at any time. The Installer typically prompts you update when a new version is available. Select **Update** when prompted.
------
- **Plugin Upgrades:** If you are running with plugins, updates are required for some plugins **before** upgrading the conductor to SSR version 5.4.0 or higher. Please review the [Plugin Configuration Generation Changes](intro_upgrade_considerations.md#plugin-configuration-generation-changes) for additional information.

## Release 6.3.0-107r1

**Release Date:** September 30, 2024

### New Features

- **I95-23304 Dynamic Source NAT:** Dynamic Source NAT translates multiple source IP addresses into a smaller pool of translated addresses and dynamic ports, which conserves public IP address space and provides the flexibility to source NAT a specific IP range. This supports scaling up sessions for an internal service. For more information, see [Dynamic NAT](config_dnat.md).
------
- **I95-23816 Network Interface Traffic Engineering:** Network interface traffic engineering allows you to impose limitations on all traffic egressing a specific network-interface. For more information about using and configuring network interface traffic engineering, see [Network Interface Traffic Engineering](config_te_net_intf.md).
------
- **I95-41264 Metrics and Application ID Improvements:** Steps have been taken to reduce system resource consumption for HA metrics and application identification, specifically when HA nodes are disconnected. In this situation visibility into the peer's data will be limited to the time of disconnection, and the peer history will not be available. When HA nodes are connected there is no difference in behavior. 
------
- **I95-47041 Selection of Mist Cloud during Adoption:** The onboarding process queries all Mist Instances and provides a drop down selector to allow login to the appropriate Mist instance (Global01, Global03, EU, etc.).
------
- **I95-47154 Conductor-management of image-based SSR devices:** Upgrading to or installing SSR 6.3.0 now supports conductor managed deployments. See [SSR Universal ISO Installation](intro_installation_univ-iso.md) for installation information, and refer to [Upgrading the Conductor](upgrade_ibu_conductor.md) for upgrade information. 
------
- **I95-48255 BYOL SSR images for AWS and Azure marketplaces:** New streamlined instances for AWS and Azure have been introduced. For installation and deployment information, refer to [Installing a BYOL Mist-managed Router in AWS](intro_installation_quickstart_byol_mist_aws.md) and [Installing a BYOL Mist-managed Router in Azure](intro_installation_byol_azure_mist.md).
------
- **I95-50572 Unified ISO for Mist and Conductor Onboarding:** A single, image-based ISO is the preferred method of installation for all SSR deployments. This new ISO greatly simplifies the software installation process and onboarding of routers to both the Mist-managed and Conductor-managed environments. For information about the install and onboarding process, refer to [SSR Universal ISO Installation](intro_installation_univ-iso.md).
------
- **I95-51303 Offline Documentation available upon installation:** The SSR documentation site is now installed as a snapshot at the time of release, and run as a web server on the SSR router and conductor installations. This makes the full documentation site available from within a network that does not have internet access. To access the documentation, click on the Offline Product Documentation selection on the About this System page in the GUI after installation. 
------
- **I95-51501 Use of the physical MAC address for VRRP:** The command [`use-physical-address`](config_command_guide.md#configure-authority-router-node-device-interface-vrrp-use-physical-address) has been added to the device-interface configuration. This allows VRRP to use the physical MAC rather than the virtual MAC and prevents platforms that reject the virtual MAC from dropping traffic.
------
- **I95-51512 Simplify onboarding of SSR devices in an Air-gap network:** The image-based ISO is the preferred method of installation for **all** SSR deployments. This new ISO greatly simplifies the software installation process and onboarding of routers to both the Mist-managed and Conductor-managed environments, as well as environments without internet access (air-gap). For information about the install and onboarding process, refer to [SSR Universal ISO Installation](intro_installation_univ-iso.md).
------
- **I95-53295 Support BGP and OSPF stat outputs:** Added the following stats to the GUI:
	| BGP | OSPF |
	| --- | --- |
	| Summary | Summary |
	| Neighbors | Neighbors |
	| IPV6Routes | Database |
	| IPv6VPN | Interface |
	| IPv4VPN | Routes |
	| - | BorderRouters |
------
- **I95-53821 Radius Remote Authentication:** Users can now be added and identified on the server, with each user account created automatically upon successful authentication on a local device. This provides a simple method for managing user accounts connected to a single authentication server with devices deployed over a wide geography. See [Configuring RADIUS](config_radius.md#configuring-radius) for more information.
------
- **I95-54300 Session performance capacity tracking and troubleshooting:** Added Session Performance Metric in Node Health. Session Processing CPU that displays average CPU, with an expandable selection that shows the individual CPU of each of the session processing threads that come from system resource scaling/config.
------
- **I95-54699 VRRP Redundancy per VLAN:** VRRP can now be [configured at the network-interface level](config_ha.md#configuring-vrrp-on-the-network-interface) allowing you to configure VRRP redundancy per VLAN. For command information, see [`configure authority router node device-interface network-interface vrrp`.](config_command_guide.md#configure-authority-router-node-device-interface-network-interface-vrrp)
------
- **I95-55855 Support the `force up` mode for LACP Bond interfaces:** When enabled, a bond interface that does not receive any LACP PDU's on any member interfaces over a configured time-out period enters the `force up` mode, where one member is used as an active interface sending and receiving without the required LACP negotiation. For more information, see [LACP Bond Interfaces - Force-up](config_lacp.md#force-up)
------
- **I95-56337 / I95-56339 / I95-56341 REST API changes to better support BGP endpoints:** Updated BGP REST endpoints for better functionality, by adding pagination support to summary commands and altering json schema to use arrays where necessary to preserve ordering. Added `show bgp family-summary` to condense address-family information per peer into one entry.
------
- **I95-56723 TLS Client Support:** RADIUS over TLS is designed to provide secure communication of RADIUS requests using the Transport Secure Layer (TLS) protocol. RADIUS authentication, authorization, and accounting data can now be passed safely across untrusted networks. For more information, see [Configuring RADUIS over TLS](config_radsec.md).

### Resolved Issues

- **The following CVE's have been identified and addressed in this release:** CVE-2024-22232, CVE-2024-21011, CVE-2024-21012, CVE-2024-21068, CVE-2024-21085, CVE-2024-21094, CVE-2019-13631, CVE-2019-15505, CVE-2019-25162, CVE-2020-25656, CVE-2020-36777, CVE-2021-3753, CVE-2021-4204, CVE-2021-46934, CVE-2021-47013, CVE-2021-47055, CVE-2021-47118, CVE-2021-47153, CVE-2021-47171, CVE-2021-47185, CVE-2022-0500, CVE-2022-23222, CVE-2022-3565, CVE-2022-45934, CVE-2022-48627, CVE-2022-48669, CVE-2023-1513, CVE-2023-24023, CVE-2023-25775, CVE-2023-28464, CVE-2023-31083, CVE-2023-3567, CVE-2023-37453, CVE-2023-38409, CVE-2023-39189, CVE-2023-39192, CVE-2023-39193, CVE-2023-39194, CVE-2023-39198, CVE-2023-4133, CVE-2023-4244, CVE-2023-42754, CVE-2023-42755, CVE-2023-45863, CVE-2023-51779, CVE-2023-51780, CVE-2023-52340, CVE-2023-52434, CVE-2023-52439, CVE-2023-52445, CVE-2023-52448, CVE-2023-52477, CVE-2023-52489, CVE-2023-52513, CVE-2023-52520, CVE-2023-52528, CVE-2023-52565, CVE-2023-52574, CVE-2023-52578, CVE-2023-52580, CVE-2023-52581, CVE-2023-52594, CVE-2023-52595, CVE-2023-52598, CVE-2023-52606, CVE-2023-52607, CVE-2023-52610, CVE-2023-52620, CVE-2023-6121, CVE-2023-6176, CVE-2023-6240, CVE-2023-6622, CVE-2023-6915, CVE-2023-6932, CVE-2024-0340, CVE-2024-0841, CVE-2024-23307, CVE-2024-25742, CVE-2024-25743, CVE-2024-25744, CVE-2024-26593, CVE-2024-26602, CVE-2024-26603, CVE-2024-26609, CVE-2024-26610, CVE-2024-26615, CVE-2024-26642, CVE-2024-26643, CVE-2024-26659, CVE-2024-26664, CVE-2024-26671, CVE-2024-26693, CVE-2024-26694, CVE-2024-26743, CVE-2024-26744, CVE-2024-26779, CVE-2024-26872, CVE-2024-26892, CVE-2024-26897, CVE-2024-26901, CVE-2024-26919, CVE-2024-26933, CVE-2024-26934, CVE-2024-26964, CVE-2024-26973, CVE-2024-26993, CVE-2024-27014, CVE-2024-27048,CVE-2024-27052, CVE-2024-27056, CVE-2024-27059, CVE-2024-2961, CVE-2024-33599, CVE-2024-33600, CVE-2024-33601, CVE-2024-33602, CVE-2024-32487, CVE-2023-4408, CVE-2023-50387, CVE-2023-50868, CVE-2023-4408, CVE-2023-50387, CVE-2023-50868, CVE-2024-3596. 
------
- **I95-48453 Reverse SSH tunnels do not check Known Hosts file:** Functionality has been added to allow for the retrieval of the ssh known hosts and authorized keys file contents on the SSR. For details on the known host functionality, see [Strict Host Key Checking](cc_fips_otp_router_install.md#enable-strict-host-key-checking). 
------
- **I95-49218 Filter OSPF routes using RIB Policy routes:** Use the `configure authority router routing rib-policy` command from either the routing default-instance (`configure authority router routing`) or inside `configure authority router routing vrf` to provide additional filtering for OSPF routes. For more information see [`configure authority router routing rib-policy`](config_command_guide.md#configure-authority-router-routing-rib-policy) and [`configure authority router routing vrf rib-policy`](config_command_guide.md#configure-authority-router-routing-vrf-rib-policy).
------
- **I95-49712 Configuration validation error uninformative:** Resolved an issue where invalid configuration parameters were returning errors that were not specific enough to allow the user to locate the invalid configuration. Invalid configuration elements now generate messages that include relevant information for the invalid element, such as an IP address, node name, router name, interface names, etc.
------ 
- **I95-52337 Uninformative error when STEP is selected for the Conductor:** The error message now clearly states that STEP is not supported on the Conductor.
------
- **I95-54844 Default to Multi-threading for session processing:** New session processing rates are now increased by default when the system has sufficient CPU resources, by using multiple CPU threads.
------
- **I95-55725 Highway crashes when peer-path routers are removed:** Resolved a race condition that could cause a crash in the forwarding plane (highway) if peer routers are removed from the configuration.
------
- **I95-55965 IDP engine not starting due to invalid environmental conditions:**  In cases where the IDP engine does not shut down cleanly, the IDP engine will fail to restart. These conditions are now detected and handled correctly.
------
- **I95-55982 X722 interface MAC being set to 00:00:00:00:00:00 on SSR1300/SSR1400:** Identified an issue where the MAC address would change during a power cycle. Another power cycle can restore the MAC to its previous value. An upgrade to the X722 firmware addresses this issue. NOTE: A power cycle is required as part of the firmware flashing sequence. All power feeds must be manually disconnected and reconnected to cycle it correctly.
------
- **I95-56013 Automatically created Conductor user accounts show as "LDAP":** Resolved an issue with user authentication where accounts were listed as `LDAP` rather than `Remote`.
------ 
- **I95-56233 / I95-56546 Relay routers in AWS unresponsive, showing device errors:** Resolved an issue where ENA devices in some environments have shown command queue failures and are no longer able to retrieve device stats, or pass traffic. The device is now reinitialized when the driver watchdog issues a reset event.
------
- **I95-56236 Quick Start config validation failures not being reported:** Made changes to the initialization process to allow quick start errors to be reported.
------
- **I95-56345 Multiple reboots of the same node of a dual node router causes the multicast stream to stop:** Resolved an issue where multiple reboots of an HA node did not allow traffic to pass. Now in this scenario an exception is thrown, which allows the session to rebuild once the internode link comes up. 
------
- **I95-56527 Failure to validate and commit config; system incorrectly expected escape sequence:** Resolved an issue where capture-filter expected an escape sequence for input when it was not necessary. 
------
- **I95-56702 O365/Sharepoint application missing from the Applications list:** Resolved an issue where certain applications and protocols were excluded from automatic updates.
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
- **I95-56879 PPPoE stopped working:** Resolved an issue where the system configuration for the PPPoE interface was missing `LCP_FAILURE` and `LCP_INTERVAL` fields. These fields are now set correctly.
------
- **I95-56905 Conserve memory footprint on the router:** If the SSR configuration does not have `application-identification mode all`, then do not load the database. This will save memory on the router. 
------
- **I95-56939 Multicast stream temporarily stopping when changing vectors:** Resolved an issue when an S,G inherited an outgoing interface inherited from a `*,G` entry, sometimes this interface would not be correctly removed from the outgoing list after being removed from the `*,G` entry. This resulted in unnecessary forwarding out this interface. The "Inherited" interface is now correctly removed from the S,G mroute entries.
------
- **I95-56973 Child services do not inherit the service-path configurations from the parent service:** Resolved an issue where child service routes for peers were not inheriting vectors and the `enable-failover` field. 
------
- **I95-57017 Application ID failed to block some domains:** Resolved an issue where DPI failed to identify the domain-name from SNI if the `client-hello` is split up into multiple TCP packet segments.
------
- **I95-57028 IDP core files consume disk space:** In cases where large amounts of files are stored on disk, the files will be managed/deleted based upon the folder size. 
------
- **I95-57071 Changing router context in session debug does not update correctly:** Resolved an issue where a missing dependency was not initiating a re-render of the output using the correct router name. 
------
- **I95-57082 Unable to delete a capture-filter that contains a forward slash (/):** This issue has been resolved. 
------
- **I95-57099 Race condition causing crash in highway process when peer path timers expire:** Resolved an issue with handling BFD timers in multi-threaded environments.
------
- **I95-57110 Crash seen during add and delete peers while sending traffic:** A race condition has been fixed that could cause a crash in the forwarding plane (highway) process if a peer-path is removed from configuration.
------
- **I95-57114 Unable to upgrade AWS Conductor:** Resolved an issue where an incorrect package version was installed, triggering a downgrade and preventing the upgrade.
------
- **I95-57205 Race condition on startup with DHCP configured on LTE or PPPoE interface, causing system to crash:** This issue has been resolved.
------
- **I95-57272 Multicast stream unexpectedly stops when adjacent hub is restarted:** Resolved an issue when the sending SVR peer changes for multicast, the receiving router was not updating the stored sending peer correctly. As a result, the receiving SVR router discarded the traffic due to RPF mismatch. The sending SVR peer is now updated correctly from the metadata.
------
- **I95-57283 Unable to perform SNMP discovery:** Resolved an issue where alarms in the `SERVICE`, `BGP_NEIGHBOR`, or `MSDP_NEIGHBOR` category would cause the SNMP server to crash and fail to send messages.
------
- **I95-57337 Updates during Application ID reload/refresh:** Updated the processes involved in application reload.
------
- **I95-57421 Viewing BGP Neighbors in GUI returns errors:** Resolved an issue with the display of BGP neighbor information in the GUI, where the options were too broad. BGP neighbors now have a selection field for ipv4 or ipv6, as well as a `neighbor` field.
------
- **I95-57538 WayPoint exception - failing to allocate waypoint ports on mesh peer re-establishment:** Resolved an issue where a configuration change may cause existing waypoint ports to become invalidated, creating an exhaustion scenario.
------
- **I95-57578 Candidate configuration values not showing in GUI:** Resolved an issue that caused configuration drop-downs in the GUI for tenants and services to only display values from the running configuration, not the candidate configuration.
------
- **I95-57580 Provide drop down list in UI for Session Record Profile:** There is now a Session Records Profile drop down list in the GUI.
------
- **I95-57592 Password expiration not enforced on the GUI:** Resolved an issue that caused password and account expiration to not work properly when logging into the GUI.
------
- **I95-57593 No option to require password change on first login:** Added a **Require Password Change On First Login** checkbox to the **Create User** dialog. Previously this feature was only available in the `create-user` command.
------
- **I95-57599 Duplicate password entries causing login issues:** After an upgrade, `/etc/passwd.radius` showed multiple duplicate entries. This has been resolved by forcing a restart of an internal program during the reboot as part of an upgrade. 
------
- **I95-57607 Saving TSI as root from the conductor generates oversized file:** Added and enforcement  that when calling `/usr/bin/save-tech-support-info` the `--output` argument always ends in `.zip`.
------
- **I95-57692 SSR120/SSR130 Upgrade issues when upgrading from version 6.2.5:** Resolved an issue where if the `128T` process is running and memory usage increases during upgrade, the upgrade will fail due to running out of memory.
------
- **I95-57712 DSCP steering issue with outbound traffic:** Resolved an issue with processing reverse pinhole packets when DSCP steering is enabled. 
------
- **I95-57853 OTP ISO does not have DHCP server enabled:** Identified and resolved a breaking change with how `logging` is configured. This prevented the DHCP server instance from starting successfully. The default configuration for the DHCP server running in the OTP ISO has been corrected, allowing the server to be started correctly.
------
- **I95-58152 Correctly reflect 128T service start time:** The previous logic for node start time used the internal database cluster connection time, which caused unexpected behaviors, such as restarting the system up time if an HA link bounces. The new logic reports the start time of the 128T service of each node.
------
- **I95-58273 Web UI login banner not visible in "Dark Mode":** This issue has been resolved and the login banner is now visible in dark mode.

### Caveats
<!-- markdown-link-check-disable -->
- **I95-56628 Unable to upgrade second HA Conductor to 6.3.0:** After successfully upgrading the primary HA conductor, attempting to upgrade the second node using the GUI prompt fails. This is a known issue and is currently under investigation. Please see the Knowledgebase Article [Unable to upgrade second HA Conductor to 6.3.0](../kb/2024/08/30/I95-56628) for workaround information. <!-- markdown-link-check-enable -->
------
- **I95-57844 Software versions not listed for download from the GUI:** In rare failure scenarios when initiating a software download via the GUI, known software versions are missing from the upgrade list but no errors are reported to the user. If such a scenario is observed, it is recommended that you initiate a second download from the PCLI. In this case any errors are better reported and can be resolved.