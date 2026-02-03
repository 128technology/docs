---
title: SSR 6.3 Release Notes
sidebar_label: '6.3'
---

SSR release 6.3.0 represents a significant change in the software delivery of the SSR. The SSR has moved away from the historical package-based delivery to an image-based delivery. As such, it is strongly suggested that you revisit your "standard" procedures for installation and upgrade of SSR Software. 

Beginning with SSR v6.3.0, the use of the interactive installer is not supported, or necessary. Software installation and upgrade upgrade activities are supported from the Web Interface or the Command Line Interface. 

### Installation from ISO

When installing SSR V6.3.0 or newer on a new system, use the image-based ISO - identified by the filename prefix "SSR": `SSR-6.3.0-107.r1.el7.x86_64.ibu-v1.iso`. Installation documentation for the image-based process can be found in the [Image-based ISO Installation Overview](intro_installation_univ-iso.md). 

The traditional package-based ISOs are identified by the filename prefix "128T": (`128T-6.3.0-107.r1.el7.OTP.v1.x86_64.iso`). These are available for offline-mode conductor upgrades to 6.3 before being able to support the image-based installation. Details on upgrading a conductor deployment configured in offline-mode to 6.3 can be found in the [Single-Version 6.3.0 Upgrade](upgrade_restricted_access.md#single-version-630-upgrade) instructions.


### Upgrade Considerations

:::important
Before upgrading please review the [**Upgrade Considerations**](intro_upgrade_considerations.md) and the [**Rolling Back Software**](intro_rollback.md) pages. Several modifications have been made to the process for verifying configurations, which will impact existing configurations.
:::

**System Disk Considerations**

As mentioned above, during the upgrade to 6.3, existing systems will go through a conversion process to support image-based delivery. This process involves resizing the existing disk partition to support writing a new disk image to the remaining disk space. As such, the usable disk space seen after this conversion will be approximately halved. The system will automatically detect if there is not enough usable disk space on the existing drive to support this partition resizing and, if so, will trigger an upgrade failure. Even if the conversion is succesful and the upgrade succeeds, users may note that the system is experiencing disk space alarms after the upgrade due to the reduction in overall capacity. It is suggested to remove unnecessary large files from systems before upgrading. Old saved tech-support-info archives (check for tar.gz or zip files in `/var/log/128technology`) and uploaded ISO images are frequent contributors to used disk space and should be manually deleted.

In certain scenarios, existing cloud routers may have been installed from images that did not use LVM for partitions. For these systems, the automatic resizing of disk partitions will fail and they cannot be upgraded. It is suggested to rebuild these instances from the official [SSR BYOL](intro_installation_quickstart_byol_conductor_aws.md) image.

When the conductor is initially upgraded to 6.3, it will be upgraded as a package-based system. This is because the system does not understand how to handle image-based delivery until it is running 6.3 software. Once the conductor is running 6.3 all router upgrades will be treated as image-based upgrades and any subsequent conductor upgrade will be treated as image-based. Therefore, it is possible that issues related to disk usage on conductor may not arise until a subsequent upgrade of the conductor beyond the initial step to 6.3.

**Offline-Mode: Upgrading 6.3.x Conductor Deployments to 6.3.x+**

An issue has been identified that may be observed in conductor deployments running version 6.3.x software, when attempting to upgrade from one 6.3.x patch release to another. This results in the message, “SSR firmware upgrade failed for the local node: SSR upgrade failed after reboot”. To work around this, run `request system software upgrade installation-service` from the command line of the Conductor, after importing the image-based ISO. Once complete, perform the full system upgrade from the Web-interface. This issue will be resolved in a future release. 

**Offline-Mode: Onboarding Routers Running older SSR Software to a 6.3.x Conductor**

We have identified an issue when onboarding SSR routers installed with older versions of software (such as 5.4.4) to Conductors running 6.3.x, when running in offline-mode. In some cases, certain software packages are not available to be installed during onboarding. To work around this issue, import the **package-based** (the "128T" prefixed) ISO for the current conductor version onto the conductor. This provides the necessary software packages to complete the onboarding process. This issue will be resolved in a future release. 

**SSR-6.3.5 Software and Version Compatibility** 

Beginning with SSR-6.3.5, conductor-managed **routers** running SSR-6.3.5 must be managed by conductors running SSR-6.3.5 or higher software. Internal updates to the software prevent successful management from a lower patch version on the conductor when 6.3.5 is installed on the router. For example:

- Conductor: SSR-6.3.5 / Router: SSR-6.3.5 Compatible
- Conductor: SSR-6.3.5+ / Router: SSR-6.3.5 Compatible
- Conductor: SSR-6.3.5 / Router: SSR-6.2.6 Compatible
- Conductor: SSR-6.3.4 / Router: SSR-6.3.5 Not Compatible
- Conductor: SSR-6.2.9 / Router: SSR-6.3.5 Not Compatible

## Release 6.3.7-6-sts

**Release Date:** January 21, 2026

**Before installing, please see the note above on Conductor/Router compatibility**

### New Features:

- **I95-26081 Display negotiated BFD Interval:** The command `show peers bfd-interval` has been added to display  the negotiated bfd-interval in three columns, `Rx Timer`, `Tx Timer`, and `Multiplier`. See [Negotiated BFD Intervals](howto_tune_bfd.md#negotiated-bfd-intervals) for more information. 
------
- **I95-58446 EoSVR Loop Prevention:** EoSVR A/S Loop Prevention has been added, allowing EoSVR traffic to pass Broadcast, unknown-unicast, and multicast traffic through a switch without causing the port to be shut down. 

### Resolved Issues:

<!---- **The following CVEs have been identified and resolved in this release:** CVE-2024-56326, CVE-2023-26604, CVE-2025-47273, CVE-2025-6965, CVE-2025-6020, CVE-2025-4802, CVE-2025-30749, CVE-2025-30754, CVE-2025-30761, CVE-2025-50106, CVE-2025-32414, CVE-2025-49794, CVE-2025-49796, CVE-2025-6021, CVE-2025-7425, CVE-2025-32415, CVE-2025-49844, CVE-2025-58060, CVE-2025-54389, CVE-2025-8194, CVE-2025-32462, CVE-2018-10906, CVE-2018-14468, CVE-2021-42574, CVE-2022-24407, CVE-2019-12749, CVE-2021-20277, CVE-2021-4034, CVE-2021-3621, CVE-2024-28956, CVE-2025-53057, CVE-2025-53066, CVE-2025-62168, CVE-2025-11561, CVE-2024-12087, CVE-2025-40778.
------ --->
- **I95-58007 Add ability to set PIM graceful restart-time:** The routing default-instance pim restart-time command has been added to allow users to define the number of seconds that the PIM protocol will perform graceful-restart after a node failure. For more information, see [PIM Graceful Restart Timer](config_multicast.md#pim-graceful-restart-timer).
------
- **I95-60545 Attempting network interface lookup with invalid ID:** Resolved an issue where errors due to an invalid ID were flooding the logs. Error logs in highway regarding a failed interface lookup for an invalid interface are now suppressed.
------
- **I95-60799 Tenant prefix use within a VRF:** The SSR allows the configuration of tenant-prefixes without giving an error, and correctly handles interfaces with tenant-prefixes within the protocol code.
------
- **I95-61588 Console access failures post-migration:** Resolved an issue where a lower baud rate was being used by the serial console. The check / enforcement for the 115200 baud rate has been improved.
------
- **I95-62011 Stats from adjacency traffic engineering throw an exception when a hostname is used:** Resolved an issue where dynamic reconfiguration when adding neighbors/adjacencies that use an FQDN and have adjacency Traffic Engineering enabled, caused the device interface to reach a failure state.
------
- **I95-62071 Multicast Traffic contributing to service area resource contention:** Resolved an issue when we have an mroute with no outgoing interfaces. We now use a Detour Path instead of NoServicePaths to prevent resource contention.
------
- **I95-62179 Software Lifecycle History not up to date:** Resolved an issue where the software lifecycle page was not showing any history, or in some cases, the history was outdated. Internal functionality has been updated, and both the GUI and CLI outputs now show the correct information.
------
- **I95-62258 Packet steered to egress non-existent interface causes highway crash:** Added logic to capture the errant packet and prevent the crash. An exception is logged so that the issue can be more easily rectified.
------
- **I95-62580 Conflicting network interface names slowing application traffic:** Resolved an issue in the app summary tracking logic related to conflicting network interface names for non-redundant ports of an HA router.
------
- **I95-62668 Routers disconnected following conductor upgrade:** Resolved an issue where SSH keys were erroneously written to the authorized-keys file. 
------
- **I95-62703 Highway process crashes when BGP over SVR is activated:** Resolved an issue where the unicast code path was incorrectly invoking multicast variant of a function call.
------
- **I95-62742 Cannot see sync errors for nodes that are stuck synchronizing:** Resolved an issue where errors in show assets disappeared when the synchronizing state retries.
------
- **I95-62859 Duplicate alarms created for duplicate asset IDs:** Resolved an issue where the Conductor created a duplicate asset ID alarm each time an asset with a duplicate ID tried to authenticate.
------
- **I95-62860 250 max connection limit not respected by the web interface:** Resolved an issue where requesting too much data over graphql with a large config led to missing data.
------
- **I95-62877 SSR continues to forward traffic to external MAC after failover:** Resolved an issue where the SSR was continuing to forward traffic for an existing session to the original next-hop after failover. A new configuration field has been added to the service policy configuration; `reverse-gateway-change-detection`. When enabled, this feature will identify a failover/MAC change, trigger a flow-move, and update the reverse next-hop accordingly. For additional details see [`reverse-gateway-change-detection`](config_command_guide.md#configure-authority-service-policy-reverse-gateway-change-detection).
------
- **I95-62956 Configuration failure due to service definition expecting subnet mask:** Resolved an issue where the CSRX configuration expected a subnet mask as part of the Service Address. The subnet mask has been added.
------
- **I95-62956 Configuration failure due to invalid name:** The CSRX does not allow policynames using a dot (.). This has been resolved - CSRX configurations will use an underscore for policyname creation.
------
- **I95-62982 SSR limits the number of supported network-interfaces:** Resolved an issue where the limit on the number of network-interfaces was low. Improved implementation of data structure storing network-interface objects, resulting in an increase of 7x the current capacity.
------
- **I95-63018 memory corruption after reading VSA:** Resolved a rare issue where in remote authentication through Radius server, pam_radius was causing memory corruption after VSA is read.
------
- **I95-63036 Web interface auto-refresh:** Auto Refresh in the GUI is now a user setting and is persisted across user sessions. It is disabled by default.
------
- **I95-63084 Web interface refreshes alarms status too often:** Resolved an issue where the web interface would repeatedly request all alarms when alarm flapping occurred. This placed an unnecessarily high load on the GUI refresh process. 
------
- **I95-63190 SSC process errors causing node disconnections from Conductor:** Resolved an issue where SSC process errors were filling the buffer queue, dropping messages, and causing node disconnections. 
------
- **I95-63228 Premature route installation complete notification:** In some cases an internal notification that the route installation was complete was being transmitted, causing the Graceful Restart process to terminate early. This issue has been resolved.
------
- **I95-63241 Prevent GUI resource exhaustion:** Resolved an issue where a single client consumed all resources by improving the internal API requests and preventing resource exhaustion.
------
- **I95-63324 Duplicate static DHCP addresses cause crashes:** Added validation steps to identify and prevent duplicate MAC addresses for the static address assignment.
------
- **I95-63295 Highway crash when show fib is executed on very large FIB:** Resolved an issue where a time intensive operation on a large entry was preventing other threads from accessing data and causing a crash.
------
- **I95-63330 Repeated interface flaps on vSSR led to crash in highway process:** Truncated packets are validated prior to processing, preventing crash.
------
- **I95-63353 Invalid assert that leads to a crash:** Resolved an issue where an incorrect assertion led to a crash. Protections have been added to prevent the race condition leading to the crash.
------
- **I95-63412 Glare condition leading to highway crash when session terminates prematurely:** Resolved an issue where session exception processing was not handled properly.
------
- **I95-63604 GUI import/export config only shows uncompressed size:** Resolved an issue where the GUI import and export operations were only showing the uncompressed side of the configuration. Both the compressed and uncompressed size are now shown in the UI.
------
- **I95-63664 Salt packages incorrectly downgraded:** Resolved an issue where salt downgraded a package if the highest available version of a package was lower than the currently installed version of that package.
------
- **I95-63675 Node page in the GUI appears to load indefinitely:** Resolved an issue where the GUI Node page would load infinitely.
------
- **I95-63976 Waypoints fail to allocate when service-path peer next-hop gateway is off the subnet:** Resolved an issue with waypoint allocation failures when using BGP over SVR with multiple IP addresses on the egress SVR interface.
------
- **I95-63729 Asset state not accurately reported in conductor:** Resolved an issue where issue where the SSH authorized keys from one HA conductor node were deleted after restarting both HA conductor nodes.

## Release 6.3.6-6-sts

**Release Date:** September 4, 2025

**Before installing, please see the note above on Conductor/Router compatibility**

### Resolved Issues:

<!--- - **The following CVEs have been identified and resolved in this release:** CVE-2024-3651, CVE-2024-24806, CVE-2024-6232, CVE-2023-48161, CVE-2024-21208, CVE-2024-21210, CVE-2024-21217, CVE-2024-21235, CVE-2024-56326, CVE-2022-1304, CVE-2023-26604, CVE-2025-27363, CVE-2025-0624, CVE-2024-55549, CVE-2025-24855, CVE-2024-7347, CVE-2025-23419, CVE-2022-49011, CVE-2024-40906, CVE-2024-43842, CVE-2024-44970, CVE-2024-53141, CVE-2025-21756, CVE-2025-21587, CVE-2025-30691, CVE-2025-30698, CVE-2024-0727, CVE-2023-5678, CVE-2024-5535, CVE-2024-9143, CVE-2024-13176, CVE-2016-9840. 
------ --->
- **I95-39653 Negative duration in session table after applying filter:** Resolved an issue where applying a filter to the session table resulted in sessions displaying a negative duration. This issue has been resolved.
------
- **I95-57584 IGMP ingress packets not being accepted after defining tenant prefixes on LAN subnet:** Resolved an issue when using `tenant-prefix` on the interface, all PIM/IGMP messages were blocked. This issue has been resolved. In addition, the ability to only allow igmp messages sent from specifc source-addresses has been added. For more information, see [`source-address-prefix-list`](config_command_guide.md#configure-authority-router-routing-igmp-interface-source-address-prefix-list)
------
- **I95-60321 DHCP relay service not honoring configuration change for the addition of a new subtenant:** Resolved an issue where new subtenants were not inheriting server mapping from the parent tenant. 
------
- **I95-60377 Alarm suppression - alarms not unshelved after deleting the shelf:** Resolved an issue where user-defined Alarm Shelves created on version 6.3+ conductors experience unexpected behavior on routers version 6.2 and below. This issue has been resolved and routers receiving user-defined shelves now handle them correctly.
------
- **I95-60425 Router Advertisement (RA) responses to Router Solicitation (RS) are dropped as unknown-dropped-from-application:** Support has been added to send a unicast IPv6 RA to the LAN client immediately upon receiving a IPv6 RS from the LAN client.
------
- **I95-60471 Add the ability to configure the RP address of MSDP SA packets:** The `router-id` command has been added to provide a method to configure a general routing `router-id`. When sending an MSDP SA message, the configured `router-id` will be used as the RP Address field. For example, `config authority router hub1 routing default-instance router-id 10.10.110.10`.
------
- **I95-60507 URL Filter blocking networks not on Block List:** Resolved an issue where SVR traffic was treated as an AppId session. The SVR traffic is now handled correctly, preventing inadvertent TCP resets and AppId deny events.
------
- **I95-60647 Migrate command not forcing a router re-sync:** Resolved an issue where a router is successfully migrated from one conductor to another conductor and establishes connectivity, but does not apply the configuration from the new conductor until a commit is performed.
------
- **I95-60730 Mulitcast stream is not recovering after failover:** Resolved an issue where an HA node does not recover after failover. The error handling method has been updated to use the global interface ID rather than the local interface ID when running the multicast incoming interface check.
------
- **I95-60747 TANK thread failure:** Resolved a rare issue where exceptions in the TANK response handling logic resulted in data missing from the GUI and PCLI. This issue has been resolved.
------
- **I95-60765 Application module does not clear previous entries:** Resolved an issue where if a module has services configured, using the REST API to send the clear command to delete those services from the module does not work. The list may appear empty, but the services still persist on the module. This issue has been resolved and the services list is now cleared properly.
------
- **I95-60767 `service-route > next-hop` validation rejects configuration:** Resolved an issue where the rule validator did not consider the service application-type as DNS proxy during the configuration rule validation. This issue has been resolved.
------
- **I95-60768 Rare race condition between packet processing and configuration update:** Resolved a rare race condition where invalid memory was accessed during packet processing if the configuration was being loaded at the same time.
------
- **I95-60924 Adopt command error message is misleading:** Resolved an issue where username/password login failures are not clear. The `adopt` PCLI command now interactively prompts for `mist-instance` if it is not specified on the command line. This helps avoid confusion when trying to associate using username/password which fails if connecting to the wrong instance. Also resolved a related issue that prevented adoption using a Mist account with Multi Factor Authentication (MFA/2FA) enabled.
------
- **I95-60948 RADIUS secret length limited to 16 characters:** The RADIUS secret size was erroneously set to 16 octets. The allowable RADIUS secret size has been updated from 1 to 255.
------
- **I95-61024 Pagination issues when performing show events:** Resolved an issue where `show events` fails to produce multiple pages.
------
- **I95-61058 Peer paths fail when additional IPs are added to a WAN interface:** Resolved a case where adding a second address for use in nat-pools to a peering interface caused continuous bfd peer flaps. The SSR now handles address changes when the local IP address changes.
------
- **I95-61075 BGP does not re-establish after firewall failover:** Resolved an issue where when initiating a BFD for BGP session, the cached MAC to IP mapping was being used. If the MAC address had changed, stale information was used and the BFD session would not be established. We now issue an ARP request to get the latest MAC Address.
------
- **I95-61085 Highway crash after incorrectly adding an IP address for a Multicast service:** Resovled an issue where a packet reached the router and matched a FIB without a service association, i.e. a FIB created for multicast traffic. The SSR will now drop a packet for a summary service if it matches a FIB without an associated service.
------
- **I95-61093 Router first time synchronization:** Resolved an issue where a minion is restarted multiple times during the first connection to the conductor, resulting an extended wait time before synchronization.
------
- **I95-61201 Renaming VRF on an active VRF stream causes a coredump:** Resolved a race condition during configuration processing while active traffic uses the same VRF, causing a coredump.
------
- **I95-61275 Network Interface Alarm shows as Category: Interface:** Resolved an issue with a mismatch in underlying alarm shelf categories. Alarm Shelves set to the category `Interface` will now correctly shelve alarms that display as `Interface` in the alarm list.
------
- **I95-61276 Modifying Alarm Shelves does not correctly propagate the change:** Modifying the shelving criteria of an alarm shelf will now correctly shelve alarms according to the new criteria.
------
- **I95-61458 BGP-VRF Conductor in `Connected` state instead of Running state:** Resolved an issue where salt modules fell out of sync, causing unexpected exceptions and preventing the system from picking up configuration changes.
------
- **I95-61483 Remove outdated CA certificates:** Improved security posture by removing outdated and untrusted certificates.
------
- **I95-61579 Highway crashes when executing command show device-interface name `<name>` registers on an i40e network port:** Resolved an issue with the registers sub option that caused the crash on the i40e network port. The sub option has been removed.
------
- **I95-61580 CLI does not prompt for required router restart:** Resolved an issue where making a configuration change requiring a restart only generates a warning for the router that the PCLI is running on. Committing a configuration change that requires a restart now results in a warning even when the change is on a different router.
------
- **I95-61866 Unnecessary events sync:** Resolved an issue where data is unintentionally sync'ed between HA nodes.
------
- **I95-61869 Peer paths not coming back up after manual reboot:** Resolved an issue with the control message capacity. In configurations with more than 1000 VLANs, the aggregate size of all the control messages grew larger than the space allocated for the messages, and messages failed to send and some packet processing threads were left with incomplete interface tables. The capacity to handle these messages has been increased and can now handle up to 12,000 VLANs.
------
- **I95-61910 FIPS installation failure:** Resolved an issue where package renaming resulted in missing installation files.
------
- **WAN-4308 Dynamic calculation of service path:** Service path calculations are now done dynamically.
------
- **WAN-4344 Hub crashes due to duplicate flows:** Resolved an issue where traffic received from different tenants for the same S,G may cause the creation of a session without the Detour path, resulting in collisions. The old session is now removed.

## Release 6.3.5-37-sts

**Release Date:** August 6, 2025

**Before installing, please see the note above on Conductor/Router compatibility**

### Resolved Issues:

<!--- - **The following CVEs have been identified and resolved in this release:** CVE-2023-26916, CVE-2025-24928, CVE-2024-56171, CVE-2024-11187, CVE-2024-1737, CVE-2024-1975, CVE-2024-3596, CVE-2024-37370, CVE-2024-37371, CVE-2025-24528, CVE-2023-46846, CVE-2024-45802, CVE-2024-12085, CVE-2023-26604, CVE-2025-27363, CVE-2025-0624.
------ --->
- **I95-56557 `show service` command not displaying URL:** Resolved an issue where even after adding a URL to the service, the URL was not showing in the output of the `show service` command. This has been resolved. 
------
- **I95-56665 Unable to change the default security policy for PIM:** The security and service policies for PIM and MSDP services can now be configured using `bgp-service-generation`.
------
- **I95-57145 Unable to change the default security policy for MSDP:** The configured security policy for MSDP SVR generated services can now be changed using `bgp-service-generation`.
------
- **I95-57265 Highway crash when generating TSI on Azure instance:** An Azure instance can crash while accessing an uninitialized RX queue. This invalid access has been prevented and the issue resolved.
-------
- **I95-57508 `icmp-probe-manager` not running:** When an HA interface becomes non-redundant (reconfigured as non-HA), state updates were not showing on the active-interface path. This led to the icmp-probe-manager not running. This issue has been resolved.
------
- **I95-58017 `show fib` output incomplete on routers:** Resolved an issue with `show fib` stalling and not returning complete data where the next hop entries are in excess of 200. The `show fib` output now correctly handles larger output. 
------
- **I95-58999 Packet Processing CPU reads 100% when interface is operationally down:** Resolved an issue where an attempt to transmit packets on an operationally down standby interface resulted in a persistent false report of packet processing activity, which led to an erroneous calculation of 100% CPU utilization.
------
- **I95-59338 Drop in performance on SSR130:** Resolved an issue where disabling kernel mitigations negatively impacted performance. Kernel mitigations are no longer disabled by default. 
------
- **I95-59367 Race condition during configuration change, resulting in highway crash:** Resolved a race condition between configuration processing and packet processing, which led to invalid memory access and resulted in a highway crash.
------
- **I95-59478 Recover PPPoE after highway crash:** Updated the PPPoE re-init script to resolve an issue where, after a highway crash, the PPPoE NSID becomes invalid and causes the device status to stay `down` even if the monitoring script reports `up`.
------
- **I95-59521 Local Config Override not working in the GUI:** Added support for the local configuration override mode to the GUI. For more information, see [Local Configuration Override](how_to_local_config_override.md#using-the-gui).
------
- **I95-59634 Allow Highway lockup detection to be disabled:** Added a `local.init` override for disabling datapath lockup detector mechanism.
```
  "datapath": {
    "lockupDetectionEnabled": true/false
  },
```
------
- **I95-59676 Alarm when default passwords are not changed:** An alarm has been added to detect when default password hashes are detected for standard system users. It is highly recommended that all system user passwords be updated to a secure password as soon as possible.
------
- **I95-59745 Routers are stuck in the connected state and not transitioning to running:** Resolved an issue where the router repeatedly sent the same incorrect values to the config during startup, resulting in a race condition. 
------
- **I95-59758 Prompt for password change:** The user is now prompted to change the `admin`, `t128`, and `root` passwords during installation. The password is changed to the same value for all three users. 
------
- **I95-59855 The hardware bootstrapper created bridge is not removed during intialization:** During installation, the hardware bootstrapper creates a bridge in Linux and binds all of the designated LAN NICs to the bridge to allow SSH. This bridge is removed during intialization of the conductor, and Mist managed routers, but is not removed from conductor managed routers. This has been addressed and the issue resolved. 
------
- **I95-59860 Incorrect timestamps shown on IDP startup:** The `Engine started` and `Last Commit` timestamps have been updated to provide accurate readings when the engine has not yet started, or the values are not available.
------ 
- **I95-59996 Force password change in GUI:** Steps have been added during the initialization workflow in the GUI to require that the user change the default password.
------
- **I95-60038 `show fib` lookup fails for IPv6 addresses:** Parsing IPv6 addresses was not performed properly, resulting in an invalid query. The code has been updated to properly parse the request before processing.
------
- **I95-60041 Force password change in the CLI:** Steps have been added during the initialization workflow in the CLI to require that the user change the default password.
------
- **I95-60180 Installation screen displays incorrect SSR OS:** After the OS rebranding to SSR OS, the option to install erroneously shows on the install screen. This has been removed. 
------
- **I95-60282 Disk space usage growing to more than 90%:** DNF logs were increasing in size and not being rotated, causing a significant increase in size. A `log rotate` configuration file for DNF has been added to limit the size of DNF log files to prevent them from filling the hard drive. When this fix is installed on the conductor, it is automatically propogated to all managed routers. 
------
- **I95-60287 Add option to disable Kernel Metric SLA Calculation:** In rare cases on a heavily loaded system, the kernel metric calculation process can sometimes hang for a period of time, causing an internal watchdog to fire. This results in a system restart. Setting `routing default-instance > service-metric-use-lsa > false` will prevent the kernel flap that causes this issue. See [`service-metric-use-lsa`](config_command_guide.md#configure-authority-router-routing-service-metric-use-sla) for addtional information.
------
- **I95-60424 Anti-Virus whitelist not implemented:** Resolved an issue where a configuration error in the cSRX generated an error that was being ignored. The error is now handled correctly and the whitelist is implemented.
------
- **I95-60438 `anti-virus-profile custom-profile max-filesize` setting not honoring the custom profile setting:** Resolved an issue when configuring a custom anti-virus profile, configuring a value for the `max-filesize` was not honored. Any time the filesize was set to any value less than 10,000 bytes (default) it would be overridden and set to back to 10,000 bytes. This issue has been resolved. 
------
- **I95-60465 Warning added when routers running SSR-5.4.0 or less are detected:** Routers running version 5.4.0 or less are not compatible with software versions 6.3.5 and higher. A warning has been added, noting that routers must be upgraded to avoid configuration issues.
------
- **I95-60471 Add the ability to configure the RP address of MSDP SA packets:** The `router-id` command has been added to provide a method to configure a general routing `router-id`. When sending an MSDP SA message, the configured `router-id` will be used as the **RP Address** field. For example, `config authority router hub1 routing default-instance router-id 10.10.110.10`.
------
- **I95-60505 Download in progress message not clearing after software download complete:** Resolved an issue where the GUI would display that a download was still in progress even though the download had completed.
------
- **I95-60507 URL Filter blocking networks not on Block List:** Resolved an issue where SVR traffic was treated as an AppId session. The SVR traffic is now handled correctly, preventing inadvertent TCP resets and AppId deny events.
------
- **I95-60593, I95-60686 Unable to onboard 6.2.3 routers to 6.3.3:** Resolved an issue where assets would transition to `Reinitializing` and get stuck there because the asset was unable to succesfully complete highstate. Validations have been added to ensure the asset completes highstate successfully before transitioning to `Reinitializing`.
------
- **I95-60651 SSR upgrade from 6.3.0 to 6.3.3 reboots back to 6.3.0:** Resolved an issue where the Conductor was unable to upgrade router packages to the latest version even though the packages were available on the Conductor. A `dnf refresh` now runs to ensure package accessibility. 
------
- **I95-60688 Password change upon first login throws error message:** Resolved an issue that prevented users from changing their password on the secondary node of an HA pair. This would happen with both an expired password, or upon first login. 
------
- **I95-60741 KNI no longer passes traffic when it is operationally down, preventing IPSec from functioning:** Resolved an issue with the KNI interface that prevented transmit-through even when the interface is operationally down.
------
- **I95-60750 Password Confirmation missing:** When onboarding an SSR using the web interface, users are now required to confirm the password change.
------
- **I95-60768 Rare race condition between packet processing and configuration update:** Resolved a rare race condition where invalid memory was accessed during packet processing if config was being loaded at the same time.
------
- **I95-60924 Adopt command error message is misleading:** Resolved an issue where username/password login failures are not clear. The `adopt` PCLI command now interactively prompts for `mist-instance` if it is not specified on the command line. This helps avoid confusion when trying to associate using username/password which fails if connecting to the wrong instance. Also resolved a related issue that prevented adopting using a Mist account with Multi Factor Authentication (MFA/2FA) enabled.
------
- **I95-61024 Pagination issues when performing `show events`:** Resolved an issue where `show events` fails to produce multiple pages.
------
- **I95-61085 Highway crash after incorrectly adding an IP address for a Multicast service:** Resovled an issue where a packet reached the router and matched a FIB without a service association, i.e. a FIB created for multicast traffic. The SSR will now drop a packet for a summary service if it matches a FIB without an associated service. 
------
- **I95-61093 Router first time synchronization :** Resolved an issue where a minion is restarted multiple times during the first connection to the conductor, resulting an extended wait time before synchronization.
------
- **I95-61458 BGP-VRF Conductor in `Connected` state instead of `Running` state:** Resolved an issue where salt modules fell out of sync, causing unexpected exceptions and preventing the system from picking up configuration changes.

## Release 6.3.4-7r2

**Release Date:** February 21, 2025

### Resolved Issues:

- **I95-60088 Memory Alarm on SSR130 when enabling IDP:** Resolved an issue introduced in 6.3.3; the new IDP engine allocates maximum memory on startup versus growing dynamically as needed. The default sizing on the SSR130 could result in memory threshold alarms as soon as IDP starts. The IDP engine size on the SSR130 has been reduced to decrease the overall memory usage.

## Release 6.3.3-40r2

**Release Date:** January 9, 2025

### New Features

- **I95-50045 IDP Throughput Improvements:** Improvements have been made to increase IDP performance on SSR Devices. While improvements have been made on all SSRs, the larger multi-core SSR devices now auto-size to scale IDP processing and throughput. 
------
- **I95-51685 WAN Edge Firmware Downgrade:** Due to network expansion or an RMA, you may need to add or replace a device that is preinstalled with firmware newer than what is currently running on your network. The SSR provides a process for an image-based reinstall to an SSR firmware version which is less than the firmware version on the target device. For additional information, see [Reinstallation](intro_rollback.md#reinstallation). 
------
- **I95-54553 DCSP Steering with BGP over SVR:** DSCP Steering service will now utilize a routing lookup when no explicit service-route configuration is present. For more information, see [Configuring DSCP Steering](config_dscp_steering.md#service-route-configuration).
------
- **I95-55228 IDP Critical Profile:** A new **Critical** profile has been added to the IDP feature. This profile focuses on `critical` level attacks, and has a more focused policy, improving the processing time. For more information about IDP, see [Intrusion Detection and Prevention](concepts_ssr_idp.md). 
------
- **I95-55342 Anti-Virus for SSR:** The SSR now offers Anti-Virus protection on spoke and branch devices, configurable on a per-application basis. The SSR Anti-Virus protection can run with or without IDP configuration, reports metrics to the User Interface, and generates alarms if the anti-virus engine fails for any reason. For more information, see [SSR Anti-Virus](sec-config-antivirus.md). 
------
- **I95-55574 Events Sync Improvements:** In the event of broken communication between HA nodes, each node provides access to one hour of peer events leading up to the disconnection. This is reduced from the full history of events to lower storage needs and expedite restoration and troubleshooting. 
------
- **I95-56292 Increase the length of SSH keys to 4096:** The size of the Salt and SSH keys has been changed to 4096 bits for newly deployed systems.
------
- **I95-56936 OS Hardening:** To provide greater security on the SSR devices, the ability to disable USB booting and storage, as well as disable the console output has been implemented. For additional details, please see [USB Boot and Storage Security](sec-usb-security.md) and [Disable Console Output](sec-disable-console-output.md).
------
- **I95-57305 Add flow timeout value to Associated Paths:** The Associated Paths window accessed from the Session view of the SSR GUI now displays a Flow Timeout column, providing a way to determine where the session is activity is focused. 
------
- **I95-57471 Allow RADIUS configuration per router:** RADIUS servers can now be configured at the router level. The servers can continue to be configured at the Authority level. If a radius server is configured at the Authority level but not the router, then the Authority value will be used. If it is configured at the Authority and the router level, the router value will be used.

### Resolved Issues

<!--- - **The following CVEs have been identified and resolved in this release:** CVE-2019-13631, CVE-2019-15505, CVE-2019-25162, CVE-2020-25656, CVE-2020-36777, CVE-2021-3753, CVE-2021-4204, CVE-2021-46934, CVE-2021-47013, CVE-2021-47055, CVE-2021-47118, CVE-2021-47153, CVE-2021-47171, CVE-2021-47185, CVE-2022-0500, CVE-2022-23222, CVE-2022-3565, CVE-2022-45934, CVE-2022-48627, CVE-2022-48669, CVE-2023-1513, CVE-2023-24023, CVE-2023-25775, CVE-2023-28464, CVE-2023-31083, CVE-2023-3567, CVE-2023-37453, CVE-2023-38409, CVE-2023-39189, CVE-2023-39192, CVE-2023-39193, CVE-2023-39194, CVE-2023-39198, CVE-2023-4133, CVE-2023-4244, CVE-2023-42754, CVE-2023-42755, CVE-2023-45863, CVE-2023-51779, CVE-2023-51780, CVE-2023-52340, CVE-2023-52434, CVE-2023-52439, CVE-2023-52445, CVE-2023-52448, CVE-2023-52477, CVE-2023-52489, CVE-2023-52513, CVE-2023-52520, CVE-2023-52528, CVE-2023-52565, CVE-2023-52574, CVE-2023-52578, CVE-2023-52580, CVE-2023-52581, CVE-2023-52594, CVE-2023-52595, CVE-2023-52598, CVE-2023-52606, CVE-2023-52607, CVE-2023-52610, CVE-2023-52620, CVE-2023-6121, CVE-2023-6176, CVE-2023-6240, CVE-2023-6622, CVE-2023-6915, CVE-2023-6932, CVE-2024-0340, CVE-2024-0841, CVE-2024-23307, CVE-2024-25742, CVE-2024-25743, CVE-2024-25744, CVE-2024-26593, CVE-2024-26602, CVE-2024-26603, CVE-2024-26609, CVE-2024-26610, CVE-2024-26615, CVE-2024-26642, CVE-2024-26643, CVE-2024-26659, CVE-2024-26664, CVE-2024-26671, CVE-2024-26693, CVE-2024-26694, CVE-2024-26743, CVE-2024-26744, CVE-2024-26779, CVE-2024-26872, CVE-2024-26892, CVE-2024-26897, CVE-2024-26901, CVE-2024-26919, CVE-2024-26933, CVE-2024-26934, CVE-2024-26964, CVE-2024-26973, CVE-2024-26993, CVE-2024-27014, CVE-2024-27048, CVE-2024-27052, CVE-2024-27056, CVE-2024-27059, CVE-2024-21131, CVE-2024-21138, CVE-2024-21140, CVE-2024-21144, CVE-2024-21145, CVE-2024-21147, CVE-2024-5564, CVE-2021-27290, CVE-2022-24999.
------ --->
- **I95-53274 PIM multicast routes unable to maintain more than 1,400 concurrent (Source, Group) sessions:** The SSR cannot maintain more than 1400 active (Source,Group) sessions. This scaling limitation has been addressed. 
------
- **I95-54366 Unable to assign an SNMP view name via the GUI:** Resolved an issue that prevented configuring SNMP (v3) Access Policy View in the GUI.
------
- **I95-57128 Inter-VLAN traffic on the same x710 or x722 port has 8ms delay:** Resolved an issue where devices controlled by i40e driver (x710, x722) were incurring 8ms (8000us) latency due to an incorrect MAX value. This has been resolved and latency reduced to 32us.
------
- **I95-57205 Race condition on startup with LTE or PPPoE interfaces configured for DHCP, causing system to crash:** This issue has been resolved.
------
- **I95-57711 Source NATing on the underlay path is not working:** Resolved an issue where bi-directional and dynamic ingress source nat for non-svr sessions was not working. The ingress source is now applied to local breakout sessions for bi-directional and dynamic source-nat.
------
- **I95-57730 Peer Service Next Hops Not Reloaded After Provisional Status Change:** Resolved an issue where a `bgp-over-svr service-route` does not failback to primary node on a `provisional-status` change.
------
- **I95-57784 Add `show network-interface redundancy` command output to TSI collection:** The `show network-interface redundancy` command has been added to the TSI output to aid in troubleshooting.
------
- **I95-58201 Throughput Performance Improvements Across Platforms:** Kernel parameter tuning has improved throughput performance on most AMD and Intel platforms (excluding Intel Atom), with the greatest gains on AMD processors. This includes Juniper-branded platforms like the SSR1200 and SSR1500, as well as cloud instances, VM hosts, and other hardware configurations.
------
- **I95-58264 EoSVR session breaks after upgrading:** Resolved an issue where a high number of STEP route updates carried in an FPM message disconnected the Routing manager to agent connection. This has been resolved by limiting the max number of STEP paths in a single STEP route.
------
- **I95-58332 Show service-path incorrectly shows the state as `up` in an unreachable next-hop:** In a config where a `service-route next-hop` is pointing to an unreachable address, the show service-path shows the state is being up. This has been resolved by adding a next-hop reachability check to `show service-path`.
------
- **I95-58427 Capture SNMP configuration in TSI:** The `/etc/snmp` directory is now captured in the TSI, allowing the inspection of the output.
------
- **I95-58428 DSCP Steering Collision on Flow Move:** When IPSec traffic exists on a router and the DSCP steering feature is enabled, upon a flow-move DSCP 0 traffic would collide with the pre-existing tunnel session. This issue has been resolved; the DSCP 0 packet is no longer dropped, and traffic is treated correctly. 
------
- **I95-58444 DSCP steering is not correctly using revertible-failover:** Resolved an issue where DSCP Steering on child services were not using learned peer routes from the parent service. DSCP steering child services now properly utilize revertible-failover resiliency policies.
------
- **I95-58528 SSR OS renaming:** The SSR OS version has been updated from "CentOS" to "Oracle Linux" to accurately reflect its upstream Linux distribution. All internal naming has been updated.
------
- **I95-58539 The `validate` command does not check or test for router `applies-to` config:**  Resolved an issue whereby the DHCP relay inspector rule was not honoring router-based services for interfaces without DHCP relay. Errors from this rule are now warnings.
------
- **I95-58569 OSPF Graceful Restart link missing from GUI:** Resolved an issue that prevented the link to the Graceful Restart page from displaying. 
------
- **I95-58583 Bypass message-authentication in RADIUS:** An option to to bypass the requirement for the Message-Authenticator check in RADIUS requests and responses has been added. Disabling this check is considered unsafe and will allow for vulnerabilities to be exploited for users authenticating. Disabling this check is NOT recommended, but may be necessary for some backwards compatiblity scenarios. 
------ 
- **I95-58637 Relax API RBAC policies for quickstart files:** Users with config-read permissions are now able to generate quickstart files.
------
- **I95-58722 Update allowed Key Exchange Algorithms to add better support for Gov Cloud environments:** Expand the list of supported Key Exchange Algorithms in both FIPS and non-FIPS mode.
------
- **I95-58881 Multicast forwarding to spoke without any PIM signaling present:** This issue has been resolved; the routing engine now correctly removes the SVR OIF.
------
- **I95-58885 Add `identifier` to option to PCLI interface ping command:** The `ping` action now allows you to set a custom identifier.
------
- **I95-59054 Add the Downgrade option to the GUI selection:** The software version selection dropdown now displays and allows you to select versions older than the currently installed version.
------
- **I95-59130 `save tech-support-info since 1d`:** The default action of the `save tech-support-info since 1d` command or the **Save TSI** button in the GUI now includes at least one log file from each application, even if the file is outdated based on the since flag.
------
- **I95-59131 Next Hops not updated properly when OSPF is used:** Resolved a race condition found in OSPF and the end of FIB update message.
------
- **I95-59146 BGP confederation member-as not dynamically reconfigurable:** Resolved an issue where modifications to `bgp confederation member-as` were not comparing and validating the changes correctly. 
------
- **I95-59264 BGP community data model regex incorrect:** Resolved an issue with the validation pattern in the routing policy for extended communities. 
------
- **I95-59537, I95-59551 Apply `ingress-source-nat-pool` to local breakout sessions:** Resolved an issue where `ingress-source-nat-pool`  was only applied to SVR sessions. The `ingress-source-nat-pool` has been updated with the `applies-to-local-breakout` flag.

### Caveats

- **I95-58622 IDP Engine Intermittent Start-up:** 6.3.3-R2 introduces the support of multi-core capabilities for IDP for image-based routers. For legacy package-based routers, multi-core IDP capability is not supported, and those systems will continue to operate in the single-core mode. For customers running IDP on older image-based firmware versions (6.3.0-R1 and under) on the SSR1300, SSR1400, and SSR1500, IDP multicore will be automatically enabled when upgrading to 6.3.3-R2. In some cases, after an upgrade the IDP engine can fail to start as it transitions from single-core to multi-core mode. When the IDP engine fails to start, the following alarm will be generated on the system:  `IDP engine unable to start; reboot-required`. In this situation, it is recommended to reboot the system post-upgrade to ensure future reliable reboots with IDP multi-core enabled.

:::note
Multi-core IDP is not supported on the following SSR devices: SSR120, SSR130, and SSR1200.
:::

------
- **I95-58782 `node.js` process may crash on SSR120, SSR130, and other branch router devices while generating Swagger documentation:** The `node.js` process may crash on SSR120, SSR130, and other branch router devices during SSR application startup while generating Swagger documentation. This is due to an internal error, and will generate a `node.js` coredump, but has **no impact** on the SSR. Swagger documentation is generated on a subsequent restart of the SSR. This is not service impacting.
------
- **I95-59477 Race condition can lead to highway crash on HA node when application identification is enabled:** In dual node High Availability configurations, highway crashes happen when `node1` does not successfully classify during the TCP handshake, but `node2` does successfully classify. This issue is currently under investigation and will be resolved in an upcoming release. For this release, defensive code has been added to preserve the session state and avoid a crash.

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
- **I95-53862 Alarm Suppression Support:** The Alarm Suppression feature allows you to filter or hide individual alarms as well as alarm types. You can write custom shelves, allowing you to silence alarming on interfaces that are intentionally configured as administratively down, for example. For more information, see [Alarm Suppression](config_alarm_suppression.md).
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

<!--- - **The following CVE's have been identified and addressed in this release:** CVE-2024-22232, CVE-2024-21011, CVE-2024-21012, CVE-2024-21068, CVE-2024-21085, CVE-2024-21094, CVE-2019-13631, CVE-2019-15505, CVE-2019-25162, CVE-2020-25656, CVE-2020-36777, CVE-2021-3753, CVE-2021-4204, CVE-2021-46934, CVE-2021-47013, CVE-2021-47055, CVE-2021-47118, CVE-2021-47153, CVE-2021-47171, CVE-2021-47185, CVE-2022-0500, CVE-2022-23222, CVE-2022-3565, CVE-2022-45934, CVE-2022-48627, CVE-2022-48669, CVE-2023-1513, CVE-2023-24023, CVE-2023-25775, CVE-2023-28464, CVE-2023-31083, CVE-2023-3567, CVE-2023-37453, CVE-2023-38409, CVE-2023-39189, CVE-2023-39192, CVE-2023-39193, CVE-2023-39194, CVE-2023-39198, CVE-2023-4133, CVE-2023-4244, CVE-2023-42754, CVE-2023-42755, CVE-2023-45863, CVE-2023-51779, CVE-2023-51780, CVE-2023-52340, CVE-2023-52434, CVE-2023-52439, CVE-2023-52445, CVE-2023-52448, CVE-2023-52477, CVE-2023-52489, CVE-2023-52513, CVE-2023-52520, CVE-2023-52528, CVE-2023-52565, CVE-2023-52574, CVE-2023-52578, CVE-2023-52580, CVE-2023-52581, CVE-2023-52594, CVE-2023-52595, CVE-2023-52598, CVE-2023-52606, CVE-2023-52607, CVE-2023-52610, CVE-2023-52620, CVE-2023-6121, CVE-2023-6176, CVE-2023-6240, CVE-2023-6622, CVE-2023-6915, CVE-2023-6932, CVE-2024-0340, CVE-2024-0841, CVE-2024-23307, CVE-2024-25742, CVE-2024-25743, CVE-2024-25744, CVE-2024-26593, CVE-2024-26602, CVE-2024-26603, CVE-2024-26609, CVE-2024-26610, CVE-2024-26615, CVE-2024-26642, CVE-2024-26643, CVE-2024-26659, CVE-2024-26664, CVE-2024-26671, CVE-2024-26693, CVE-2024-26694, CVE-2024-26743, CVE-2024-26744, CVE-2024-26779, CVE-2024-26872, CVE-2024-26892, CVE-2024-26897, CVE-2024-26901, CVE-2024-26919, CVE-2024-26933, CVE-2024-26934, CVE-2024-26964, CVE-2024-26973, CVE-2024-26993, CVE-2024-27014, CVE-2024-27048,CVE-2024-27052, CVE-2024-27056, CVE-2024-27059, CVE-2024-2961, CVE-2024-33599, CVE-2024-33600, CVE-2024-33601, CVE-2024-33602, CVE-2024-32487, CVE-2023-4408, CVE-2023-50387, CVE-2023-50868, CVE-2023-4408, CVE-2023-50387, CVE-2023-50868, CVE-2024-3596. 
------ --->
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
- **I95-56492 Sessions configured for outbound-only with nat-keep-alive enabled experience reverse flow packet drops after flow migration:** A flow move from an inter-router (WAN) peer path to an inter-node (fabric) peer path causes repeated session modifies on the hub side causing reverse traffic packet drops due to NAT keepalives incorrectly testing the failed WAN path for the migrated session. This issue has been resolved.
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
