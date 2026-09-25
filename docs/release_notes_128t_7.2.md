---
title: SSR 7.2 Release Notes
sidebar_label: '7.2'
---

The SSR has moved away from the historical package-based delivery to an image-based delivery. As such, it is strongly suggested that you revisit your "standard" procedures for installation and upgrade of SSR Software. 

Beginning with SSR v6.3.0, the use of the interactive installer is not supported, or necessary. Software installation and upgrade activities are supported from the Web Interface or the Command Line Interface. 

With the image-based ISO delivered beginning with version 6.3.0, the manual installation process no longer supports the `initialize128t` command. 

Initializing devices as a conductor or conductor-managed router is easily accomplished from the GUI using the [Initialize Your Device - Web Workflow](initialize_u-iso_device.md), or from the CLI using the the `initialize conductor` and `initialize conductor-managed` commands described in the [Initialize Your Device - Advanced Workflow](initialize_u-iso_adv_workflow.md#initialize-a-conductor) documentation.

### Installation from ISO

When installing SSR V6.3.0 or newer on a new system, use the image-based ISO - identified by the filename prefix "SSR": `SSR-6.3.0-107.r1.el7.x86_64.ibu-v1.iso`. Installation documentation for the image-based process can be found in the [Image-based ISO Installation Overview](intro_installation_univ-iso.md). 

Offline mode conductor and router upgrades to image-based installations are detailed in the [Single-Version 6.3.0 Upgrade](upgrade_restricted_access.md#single-version-630-upgrade) instructions.

### Upgrade Considerations

**7.x Conductor Upgrades**

If you are upgrading a **conductor** that is currently running version 6.3.4 or lower, and you wish to upgrade to any version of 7.x, you must first perform a transitional upgrade of the conductor to version 6.3.5 - 6.3.7.

Once the conductor has completed the 6.3.5-6.3.7 transitional upgrade, you may then upgrade the conductor to any 7.x version of the SSR software.

If your conductor is currently running SSR version 6.3.5+, you may upgrade to 7.x normally.

:::important
**Routers that are being upgraded to 7.x DO NOT have to make a transitional upgrade step. The transitional upgrade through 6.3.5-6.3.7 applies ONLY to Conductor. Routers can be upgraded directly from pre-7.x to 7.x.**
::: 

**VM Upgrades 6.2.x to 7.x**

Users upgrading a virtual machine, including those on AWS or Azure, previously installed with package-based SSR releases (6.2 and prior on Conductor-managed deployments only) should be aware of the following:

Due to changes in the base SSR/Linux OS in 7.X, interface naming behavior has changed for virtual machines. Older SSR versions using earlier versions of the SSR OS may have named Linux interfaces with the `ethX` naming convention. Interfaces in 7.X and above use the Linux predictable interface naming convention as seen in SSR hardware installs. This change in interface naming could prevent existing Linux interface configurations not to apply to the `ethX`-named interface. This applies to interfaces configured directly in Linux, such as dedicated management interfaces, and **not** interfaces configured via SSR configuration.  

This issue is currently being addressed by engineering. However, if your deployment requires an upgrade to 7.X on a VM configured with interfaces using the `ethX` naming convention, please ensure that console access is available, as manual updates to the Linux interface configuration may be required.

**System Disk Considerations**

As mentioned above, during the upgrade to an image-based installation, existing systems will go through a conversion process to support image-based delivery. This process involves resizing the existing disk partition to support writing a new disk image to the remaining disk space. As such, the usable disk space seen after this conversion will be approximately halved. The system will automatically detect if there is not enough usable disk space on the existing drive to support this partition resizing and, if so, will trigger an upgrade failure. Even if the conversion is successful and the upgrade succeeds, users may note that the system is experiencing disk space alarms after the upgrade due to the reduction in overall capacity. It is suggested to remove unnecessary large files from systems before upgrading. Old saved tech-support-info archives (check for tar.gz or zip files in `/var/log/128technology`) and uploaded ISO images are frequent contributors to used disk space and should be manually deleted.

In certain scenarios, existing cloud routers may have been installed from images that did not use LVM for partitions. For these systems, the automatic resizing of disk partitions will fail and they cannot be upgraded. It is suggested to rebuild these instances from the official SSR BYOL image for either [AWS](intro_installation_byol_aws_conductor.md) or [Azure](intro_installation_byol_azure_conductor.md).

When the conductor is initially upgraded to an image-based installation, it will be upgraded as a package-based system. This is because the system does not understand how to handle image-based delivery until it is running 6.3 software. Once the conductor is running 6.3 all router upgrades will be treated as image-based upgrades and any subsequent conductor upgrade will be treated as image-based. Therefore, it is possible that issues related to disk usage on conductor may not arise until a subsequent upgrade of the conductor beyond the initial step to 6.3.

**Offline-Mode: Upgrading 6.3.x Conductor Deployments to 6.3.x+**

An issue has been identified that may be observed in conductor deployments running version 6.3.x software, when attempting to upgrade from one 6.3.x patch release to another. This results in the message, “SSR firmware upgrade failed for the local node: SSR upgrade failed after reboot”. To work around this, run `request system software upgrade installation-service` from the command line of the Conductor, after importing the image-based ISO. Once complete, perform the full system upgrade from the Web interface. This issue will be resolved in a future release. 

**Offline-Mode: Onboarding Routers Running older SSR Software to a 6.3.x Conductor**

An issue has been identified when onboarding SSR routers installed with older versions of software (such as 5.4.4) to Conductors running 6.3.x, when running in offline-mode. In some cases, certain software packages are not available to be installed during onboarding. To work around this issue, import the **package-based** (the "128T" prefixed) ISO for the current conductor version onto the conductor. This provides the necessary software packages to complete the onboarding process. This issue will be resolved in a future release. 

:::important
After installing / upgrading to SSR 7.1.3 or later, downgrading *to an earlier version* of SSR software where Configuration Integrity (CI) is not available is NOT supported. 

Rollback to the previously installed version of software *is* supported.  
:::

:::warning
An issue has been identified involving the use of the HA Sync Redundancy Plugin with SSR 7.0.1, which prevents proper functioning of the plugin. If you use the HA Plugin in your SSR deployment and are upgrading to SSR 7.X, it is recommended to upgrade to SSR 7.2.x and replace the plugin with a `bond` control interface.
::: 

:::important
Before upgrading please review the [**Upgrade Considerations**](intro_upgrade_considerations.md) and the [**Rolling Back Software**](intro_rollback.md) pages. Several modifications have been made to the process for verifying configurations, which will impact existing configurations.
:::

After the installation of SSR 7.x, it is not possible to downgrade to a 6.x version of the SSR software. Because of the format of the image based installation (dividing the disk into two partitions), downgrading from SSR 7.x to any package based installation (6.x) is not possible. A downgrade is defined as uninstalling the 7.x software, and attempting to install a 6.x version.

**[Rollback](intro_rollback.md) (to the previously installed version) is supported.** 

## Release 7.2.3-8r2 

**Release Date:** September 29, 2026

### New Features

- **I95-62044 Peer Certificate Expiration Alarms:** The router now raises an alarm when a received SVR peer certificate is approaching expiration (within a month or a week), in addition to the existing alarms for the router's own certificates. This gives you advance warning of an expiring peer certificate before the peer path goes down.
------
- **I95-62790 ML-DSA for SVR Certificates:** ML-DSA has been added as a new algorithm option to the existing certificate lifecycle. ML-DSA support applies exclusively to SVR peering certificates managed by the customer through the REST API. For more information, see [ML-DSA](sec_enhanced_key_mgmt.md#ml-dsa).
------
- **I95-63281 Configurable serial console baud rate:** Added the ability to configure the serial baud rate on the SSR devices to either 9600, 38400, or 115200 (default). This can be done from the command line `config authority router <router> node <node> serial-console-baud-rate`, or the web interface at `Router -> Node -> Serial Console Baud Rate` using the dropdown.

  :::note
  Since the baud rate change happens at the kernel level, output such as bios or grub remains at 115200bps. If the serial console client is set to a value other than 115200, the output will be displayed as garbled text. If one of those garbled characters happens to be `xon`, the client will stop the display. To prevent the display issue, it is recommended to turn off software flow control (`xon/xoff`).
  :::
------
- **I95-63985 VRRP Non-revertive Active/Active Recovery:** Added support for VRRP to automatically revert from an active/active state back to active/standby when the underlying Layer 2 connectivity is restored, without requiring manual intervention such as priority changes or interface flaps.
------
- **I95-64184 Static Route State Tracking:** Added the monitoring of service path reachability state to prevent traffic from being forwarded to an unreachable destination if an intermediate network fails even when the next hop or destination remains operational. ICMP probes monitor network connectivity; when a failure is detected and exceeds the configured threshold, the system now automatically removes the kernel route from the RIB. When the ICMP probes recover and the destination is reachable again, the kernel routes are automatically added back to the RIB. For more information about reachability profiles, see [Configuring a Reachability Detection Profile](config_service_health.md#creating-a-reachability-detection-profile).  
------
- **I95-64692 Improved L7-Security Packet Interface:** The internal packet interface used for L7-Security function chaining, such as IDP, has changed affording more throughput headroom for IDP-enabled deployments.
------
- **I95-64862 Waypoint Pool Exhaustion Monitoring:** Added visibility into waypoint pool utilization including the historical maximum number of ports used, and added a peer name column to help identify the peer-related usage in the waypoint table. See [`show waypoints`](cli_reference.md#show-waypoints) for more information.
------
- **I95-65332 Allow BGP/MSDP to use TCP MD5 even when kernel is in FIPS mode:** The use of BGP and MSDP protocols with TCP MD5 authentication has been enabled when kernel is in FIPS mode. 

  :::important
  The use of MD5 is strictly prohibited for secure hashing and cryptographic authentication by FIPS 140 because MD5 is vulnerable to collision attacks and considered legacy from a compliance standpoint. The use of these legacy BGP and MSDP protocols with TCP MD5 authentication enabled is outside of the SSR cryptographic module boundary, and is not covered by the FIPS power-on self-tests. 
  :::
------
- **I95-65348 Added Support for Bouncing PoE Ports:** Added the ability to force a link down/up cycle ("bounce") on SSR4x0 PoE ports, allowing a connected access point to be power-cycled without physically disconnecting the cable.
------
- **I95-65365 PCLI Command to Trigger GARP:** Added the PCLI command to manually trigger Gratuitous ARP (GARP) on VRRP interfaces, accepting device and network-interface as arguments.
------
- **I95-65366 Maximum GARP interval for VRRP:** Added a configurable `maximum-garp-interval` parameter for VRRP, allowing control over how frequently gratuitous ARP messages are sent during VRRP state transitions. This prevents excessive ARP traffic in environments with many VRRP instances.

### Resolved Issues

- **The following CVEs have been identified and resolved in this release:** CVE-2024-12086, CVE-2024-34459, CVE-2025-10911, CVE-2025-12748, CVE-2025-13151, CVE-2025-14087, CVE-2025-14512, CVE-2025-5278, CVE-2025-61662, CVE-2025-6170, CVE-2025-9714, CVE-2026-0865, CVE-2026-14380, CVE-2026-14474, CVE-2026-14476, CVE-2026-14739, CVE-2026-1519, CVE-2026-15308, CVE-2026-1933, CVE-2026-2291, CVE-2026-2340, CVE-2026-23479, CVE-2026-23631, CVE-2026-25243, CVE-2026-25646, CVE-2026-25749, CVE-2026-27651, CVE-2026-27654, CVE-2026-27784, CVE-2026-28390, CVE-2026-28417, CVE-2026-28421, CVE-2026-28780, CVE-2026-28847, CVE-2026-28883, CVE-2026-28901, CVE-2026-28902, CVE-2026-28903, CVE-2026-28904, CVE-2026-28905, CVE-2026-28907, CVE-2026-28942, CVE-2026-28946, CVE-2026-28947, CVE-2026-28953, CVE-2026-28955, CVE-2026-28958, CVE-2026-29111, CVE-2026-29518, CVE-2026-3012, CVE-2026-3039, CVE-2026-31431, CVE-2026-32647, CVE-2026-32748, CVE-2026-33007, CVE-2026-33278, CVE-2026-33412, CVE-2026-33526, CVE-2026-33845, CVE-2026-33846, CVE-2026-33857, CVE-2026-34032, CVE-2026-34059, CVE-2026-34180, CVE-2026-34181, CVE-2026-34182, CVE-2026-34183, CVE-2026-34980, CVE-2026-35177, CVE-2026-35385, CVE-2026-37555, CVE-2026-3832, CVE-2026-3833, CVE-2026-39979, CVE-2026-40164, CVE-2026-40170, CVE-2026-40355, CVE-2026-40356, CVE-2026-4046, CVE-2026-40460, CVE-2026-40622, CVE-2026-40701, CVE-2026-41035, CVE-2026-41292, CVE-2026-41411, CVE-2026-42009, CVE-2026-42010, CVE-2026-42011, CVE-2026-42012, CVE-2026-42013, CVE-2026-42014, CVE-2026-42015, CVE-2026-42055, CVE-2026-42533, CVE-2026-42534, CVE-2026-42764, CVE-2026-42766, CVE-2026-42767, CVE-2026-42768, CVE-2026-42769, CVE-2026-42770, CVE-2026-42926, CVE-2026-42934, CVE-2026-42944, CVE-2026-42945, CVE-2026-42946, CVE-2026-42959, CVE-2026-43284, CVE-2026-43500, CVE-2026-43618, CVE-2026-43658, CVE-2026-43660, CVE-2026-4408, CVE-2026-4437, CVE-2026-4438, CVE-2026-44390, CVE-2026-44431, CVE-2026-44432, CVE-2026-44673, CVE-2026-4480, CVE-2026-45186, CVE-2026-4519, CVE-2026-45445, CVE-2026-45446, CVE-2026-45447, CVE-2026-46300, CVE-2026-46333, CVE-2026-46483, CVE-2026-47162, CVE-2026-47167, CVE-2026-4786, CVE-2026-4800, CVE-2026-48142, CVE-2026-4878, CVE-2026-48864, CVE-2026-4890, CVE-2026-4891, CVE-2026-48914, CVE-2026-4892, CVE-2026-4893, CVE-2026-5119, CVE-2026-5260, CVE-2026-52858, CVE-2026-5419, CVE-2026-5435, CVE-2026-54369, CVE-2026-54370, CVE-2026-5450, CVE-2026-55693, CVE-2026-56434, CVE-2026-57455, CVE-2026-57456, CVE-2026-58016, CVE-2026-5928, CVE-2026-5946, CVE-2026-59856, CVE-2026-59858, CVE-2026-60005, CVE-2026-6238, CVE-2026-6893, CVE-2026-7383, CVE-2026-9076, CVE-2026-9256, CVE-2026-9698.
------
- **The following issues have been addressed and delivered to increase the overall security posture of the SSR:** I95-62091, I95-65017, I95-65018, I95-65021, I95-65025, I95-65026, I95-65027, I95-65028, I95-65030, I95-65033, I95-65034, I95-65038, I95-65039, I95-65044, I95-65054, I95-65055, I95-65205, I95-65206, I95-65208, I95-65210, I95-65211, I95-65217, I95-65219, I95-65221, I95-65224, I95-65226, I95-65228, I95-65235, I95-65238, I95-65239, I95-65247, I95-65249, I95-65250, I95-65252, I95-65254, I95-65297.
------
- **I95-58472 SSR4x0 Platform Provisioning Reboot Loop:** Resolved an issue where SSR4x0 platforms could enter an infinite reboot loop during initial provisioning.
------
- **I95-60912 PIM and PIMv6 cannot be enabled on the same interface:** Resolved an issue where enabling both PIM (IPv4) and PIMv6 on the same interface was not possible, preventing dual-stack multicast configurations.
------
- **I95-62331 OSPF Default Route Not Re-Advertised After Restart:** Resolved an issue where a timing condition could prevent OSPF from generating the external (Type 5) LSA for a configured default route after a restart, so peers did not receive the default route until the OSPF process was manually cleared. OSPF now reliably advertises the default route after a restart.
------
- **I95-62758 BGP Establishment Taking Incorrect Path Over GRE:** Resolved an issue where BGP SYN packets were sent over the wrong GRE tunnel instead of using the direct path, causing BGP to establish over an unintended interface.
------
- **I95-63195 Highway Crash During ESKM Session Scaling:** Resolved an issue where the highway process could crash during high session scaling due to incorrect metadata propagation in ESKM encrypt/decrypt contexts.
------
- **I95-63811 IPv6 Service with ICMP Transport Not Routed:** Resolved an issue where PINGv6 sessions were not routed when an IPv6 service was configured with ICMP as the transport protocol. The system now correctly remaps ICMP to ICMPv6 for IPv6 service prefixes.
------
- **I95-63876 Route Flapping and Inaccessibility:** Resolved an issue where BGP routes would flap or become inaccessible in hub-and-spoke topologies with inter-hub steering preferences configured, causing intermittent connectivity failures.
------
- **I95-63895 SSR sending packets larger than configured MTU:** Resolved an issue where the SSR was sending packets larger than the configured MTU (e.g., 1518 bytes instead of 1500), causing packet drops on downstream network elements.
------
- **I95-63913 Session-source incorrect in BFD pinhole:** Resolved an issue where session-source was incorrectly set to public when a BFD pinhole also happened to be a flow-move scenario.
------
- **I95-64054 Highway Crash with ESKM Jumbo Packets:** Resolved an issue where the highway process could crash when processing jumbo packets with ESKM due to an uninitialized encryption context.
------
- **I95-64407 Alternate SHA Ciphers with ESKM:** Resolved an issue where configuring alternate SHA ciphers (`sha384` and `sha512`) on security policies in ESKM did not properly allocate metadata keys or verify HMAC digests on metadata headers.
------
- **I95-64411 IPv6 BGP route-map `set ipv6 next-hop peer-address` support:** Added support for the `set ipv6 next-hop peer-address` directive in route-maps, which is required for IPv6 WAN assurance deployments.
------
- **I95-64464 Slow Initial Router Onboarding to Conductor:** Resolved an issue where router onboarding to the conductor was slow, causing assets to remain in a `synchronizing` state for extended periods.
------
- **I95-64550 Persisted Waypoint Pool Historical Maximum:** The historical maximum number of waypoint ports used is now persisted to long-term analytics storage, so this value survives a router restart. This complements the waypoint pool utilization visibility described above.
------
- **I95-64603 `Chronyd` Requires Manual Restart After Reboot:** Resolved an issue where all NTP servers appeared as rejected after a reboot, requiring a manual restart of the `chronyd` service to restore time synchronization.
------
- **I95-64610 Peer Name in `show waypoints`:** The `show waypoints` command output now includes a peer name column, making it easier to identify which peer is associated with a given waypoint entry.
------
- **I95-64627 Certificate Unavailable for Peering After Upgrade:** Resolved an issue where the local certificate became unavailable for peering after an upgrade, resulting in peer paths remaining down with a "No local certificate available" error.
------
- **I95-64684 HMAC Cipher Mode Information in Logs and Session Output:** Added HMAC mode and HMAC cipher details to session logs and `show sessions` output, improving visibility into the active encryption and authentication state of sessions.
------
- **I95-64688 Highway coredumps causing peer path flaps:** Resolved an issue where highway process coredumps were occurring, resulting in peer path flaps.
------
- **I95-64811 Highway crash causing session drops:** Resolved a highway process crash that occurred under specific traffic conditions, resulting in session drops and temporary traffic disruption.
------
- **I95-64857 REST API for Trusted CA Certificate Ingestion:** Added a REST API endpoint to ingest a trusted CA certificate bundle directly, so that certificates referenced by a `trusted-ca-certificate` file pointer no longer need to be placed on disk manually.
------
- **I95-64903 High CPU and Disk Usage on SSR440:** Resolved an issue where SSR440 devices experienced high CPU and disk usage without corresponding syslog messages being generated, making the condition difficult to diagnose.
------
- **I95-64905 401 Authorization Required error when refreshing Logs page:** Resolved an issue where refreshing the Logs page on the conductor GUI returned a 401 Authorization Required error, requiring a full page reload or re-login.
------
- **I95-64908 Runtime Error Collapsing Logs Panel in Web Interface:** Resolved an issue where interacting with the collapse control on the Conductor Logs page before the page had fully rendered could trigger a runtime script error. The Logs page now safely handles this interaction.
------
- **I95-64978 Highway crash on head-end router causing interface flaps:** Resolved an issue where a race condition on session classification fields (such as domain name, URI, and application classification) could cause the highway process to crash, resulting in interface flaps.
------
- **I95-65129 Peer Path Up Using Mixed Certificates:** Resolved an issue where peer paths could come up using certificates from different issuers (default Juniper certificate on one side and a custom CA-signed certificate on the other), even with a custom trusted CA configured.
------
- **I95-65171 TSI Download Missing File Extension:** Resolved an issue where Tech Support Info (TSI) bundles downloaded from the SSR Web UI had no file extension, preventing extraction with standard archive tools. Tech support files downloaded from the web UI now have the correct `.zip` extension.
------
- **I95-65190 Node Deletion Cleanup in High Availability Configurations:** Resolved an issue where transitioning a router from a dual-node High Availability (HA) configuration to a single-node configuration failed to remove the deleted node from `global.init`, leaving residual fabric interfaces and causing synchronization failures on the remaining node.
------
- **I95-65296 ESKM Peering Failures with Fragmentation:** Resolved an issue where ESKM peer paths failed to establish in environments where fragmentation occurs on the underlay, such as GCP with Cloud Routers.
------
- **I95-65299 SSR440 upgrade failure:** Resolved an issue where upgrading an SSR440 could fail, with the highway process not running after reboot, causing the system to roll back automatically.
------
- **I95-65314 Sessions Not Switching to Available Source NAT IPs:** Resolved an issue where a source NAT database corruption and race condition prevented sessions from switching to additional available IP addresses on a WAN interface, causing packet drops.
------
- **I95-65336 Factory reset resilience to interruption:** Improved the factory reset procedure to be more resilient to interruption (e.g., unexpected reboot). The system now tracks reset progress and can resume or indicate completion status after recovery.
------
- **I95-65337 Missing FIB Entries After Router Migration:** Resolved an issue where FIB entries were missing after migrating WAN interfaces from one router to another using the same IP addresses. The system now correctly detects new peers and triggers path addition for peers that are already up.
------
- **I95-65351 IMA and Security Stack Incompatibility:** Resolved an issue where enabling IDP with IMA caused the security engine to fail to start due to an incompatibility between IMA enforcement and the security stack binaries.
------
- **I95-65354 Missing Dependencies in Offline ISO:** Resolved an issue where required software dependencies were missing from the offline ISO, preventing plugin upgrades in air-gapped environments.
------
- **I95-65374 Child tenants not applied to security policies:** Resolved an issue where child tenants were not correctly applied to security policies, preventing IDP rules from being enforced on traffic matching child tenant definitions.
------
- **I95-65390 Conductor Migration Deadlock in SSH-Only Mode:** Resolved an issue where conductor migration could deadlock when using `asset-connection-resiliency` in `SSH-only` mode because the router switched to the unauthenticated tunnel before the new conductor completed SSH key exchange.
------
- **I95-65392 Hierarchical services ping traffic failure between sites:** Resolved an issue where ICMP ping traffic between specific sites failed when using hierarchical service configurations with application identification groups.
------
- **I95-65393 ESKM Certificate Invalid Alarm After Upgrade:** Resolved an issue where a certificate invalid alarm was incorrectly raised after upgrading to a newer SSR version, causing peering to go down even though the certificate was not expired.
------
- **I95-65394 Improved Detail in Peer Certificate Validation Alarms:** Resolved an issue where the peer certificate invalid alarm provided no specific reason for the validation failure. The alarm now includes the underlying certificate validation error, such as expiration, revocation, or a name mismatch, to help identify the root cause.
------
- **I95-65403 Disallow CA Certificates for Peering:** Added validation to prevent certificates with the CA:True basic constraint from being used as peering certificates, as these are intended for signing other certificates rather than direct peering authentication.
------
- **I95-65410 Incorrect RBAC for Certificate Ingestion API:** Resolved an issue where the POST `/api/v1/certificate` endpoint incorrectly required READ permission for the entire configuration instead of WRITE permission.
------
- **I95-65411 CLI Command Appending Unrelated Output:** Resolved an issue where executing certain PCLI commands (such as `show peer router all force`) would append unrelated command output at the end of the expected results.
------
- **I95-65414 Overlapping child tenant IP validation:** Added configuration validation to disallow overlapping IP addresses across child tenants, preventing ambiguous traffic classification.
------
- **I95-65432 Conflux process crash during upgrade:** Resolved an issue where the Conflux process exited unexpectedly during or after an upgrade, causing temporary loss of analytics data collection.
------
- **I95-65439 CRL in Certificate Not Taken into Account:** Resolved an issue where the Certificate Revocation List (CRL) distribution point specified within a certificate was not being honored, requiring manual CRL configuration on the conductor.
------
- **I95-65455 Network Manager Interface Preventing HA Sync:** Resolved an issue where a spurious "Wired Connection 1" Network Manager interface prevented the HA sync interface from obtaining an IP address after an upgrade.
------
- **I95-65459 IDP bypass not engaged during restart/rebuild:** Resolved an issue where IDP bypass rules were not properly engaged during engine restart or rebuild operations, causing traffic that should be bypassed to be dropped temporarily.
------
- **I95-65469 GUI Network Interface Display:** Resolved an issue where the SSR Web UI displayed "No Data" in the Network Interfaces table on the Router page due to overly strict GraphQL filter and pagination validation.
------
- **I95-65470 Multicast session display count discrepancy:** Resolved an issue where `show sessions` displayed fewer multicast sessions than expected (e.g., 334 of 400), even though all multicast routes were correctly installed.
------
- **I95-65478 Mist-Agent Upgrade Blocked by Version Mismatch:** Resolved an issue where a router running a newer `mist-agent` package version than the one bundled with the target software release could fail to upgrade, because `mist-agent` downgrades were not permitted by default.
------
- **I95-65486 Highway Crash During Upgrade from Legacy Version:** Resolved a highway crash that occurred during router upgrades from legacy versions (e.g., 5.5.x to 7.2.x), causing the upgrade to fail after timing out.
------
- **I95-65488 Improved Logging for File-Based Trusted CA Certificates:** Added logging to the configuration director to make it easier to determine when a file-pointer-based trusted CA certificate is referenced in configuration but the file is not yet present on disk.
------
- **I95-65512 Web Server and Nginx Crash Looping:** Resolved an issue where the web server and nginx processes entered a crash loop, preventing access to the SSR Web UI.
------
- **I95-65526 Stale Onboarding State During Node Redeployment:** Resolved an issue where redeploying a node or reusing a node name after deletion caused Secure Conductor Onboarding (SCO) to fail due to stale onboarding state and residual keys persisting on the conductor, resulting in onboarding rejections and expired tokens.
------
- **I95-65527 Added Missing sysServices SNMP OID on Conductor:** Resolved an issue where the conductor did not return the standard `sysServices` SNMP OID (`.1.3.6.1.2.1.1.7.0`), which some third-party management systems require for device discovery. The conductor's generated SNMP configuration now includes this OID.
------
- **I95-65529 Auto-generated syslog service incorrectly uses UDP for TLS:** Resolved an issue where the auto-generated service for TLS-based syslog was incorrectly configured with UDP as the transport protocol instead of TCP.
------
- **I95-65532 Unclassified Application Sessions After Security Engine Rebuild:** Resolved an issue where, after the security engine container was rebuilt, application identification stopped classifying traffic and reported sessions as an unclassified application until the next scheduled package update. The required application-identification packages are now installed during IDP startup.
------
- **I95-65534 Waypoint Usage Alarm Not Triggering at 100% Usage:** Resolved an issue where the waypoint pool utilization alarm did not trigger when port usage reached 100%.
------
- **I95-65535 Assets Stuck in Synchronizing State:** Resolved an issue where assets could become stuck in a synchronizing state for extended periods (up to 24 hours) due to overly aggressive watchdog timer defaults. The default timer settings have been relaxed.
------
- **I95-65544 Host Service Exposure on WAN Interface During Startup:** Resolved an issue where host services (such as SSH) were exposed on external WAN interfaces during system boot because `firewalld` flushed interface-to-zone associations during startup reloads before security rules were fully established.
------
- **I95-65545 Incorrect Fragmentation Stats Table Name:** Resolved an issue where the PCLI displayed an incorrect table name ("Non-Fabric IPv6 Fragmented Packets" instead of "Non-Fabric IPv4 Fragmented Packets") for IPv4 fragmentation statistics.
------
- **I95-65548 DSCP steering support with deferred classification in hierarchical services:** Added support for DSCP steering services when classification is deferred in hierarchical service configurations, enabling correct traffic handling in Mist-managed deployments.
------
- **I95-65557 Highway Crash when running `show fib` commands on HA Router:** Resolved an issue where issuing `show fib` commands on an HA router could cause a highway crash on both nodes due to FIB table contention. FIB table operations are now batched to prevent mutex lock errors.
------
- **I95-65559 PCLI Content Mode Discarding Certificate Input:** Resolved a regression where entering a certificate in PCLI `content` interactive mode as a single SSH write containing embedded new lines caused the certificate to be silently discarded from the candidate configuration instead of being stored.
------
- **I95-65583 InfluxDB HTTP Log Growth and Disk Space Exhaustion:** Resolved an issue on Enterprise Linux 9 systems where `logrotate` executed only once daily instead of hourly, allowing `influxdb_http.log` files to grow rapidly and exhaust available disk space on `/var/log`.
------
- **I95-65603 Peer Path UP with Mixed Certificates in Fail-Hard Mode:** Resolved an issue where peer paths remained UP between nodes using mismatched certificate trust anchors (default factory-signed and custom CA-signed certificates) even when `invalid-certificate-behavior` was configured to `fail-hard`.
------
- **I95-65609 Routers Reverting to Waiting State After Conductor Upgrade:** Resolved an issue where previously onboarded routers incorrectly reverted to a "waiting" state in `show secure-conductor-onboarding` following a conductor upgrade due to improper handling of startup HTTP responses during authorized key retrieval.
------
- **I95-65617 Loss of syslog forwarding over TLS after upgrade:** Resolved an issue where syslog forwarding over TLS stopped working after upgrading, preventing log delivery to remote collectors.
------
- **I95-65635 Source NAT Port Exhaustion on Loopback Interface:** Resolved an issue where a large number of `SourceNatPortException` errors for the local KNI interface caused SSH connection failures to the SSR loopback IP. Host-type service routes no longer use the KNI IPv6 control interface for source NAT.
------
- **I95-65656 Conductor upgrade fails on health check:** Resolved an issue where conductor upgrades could fail due to a health check timeout, preventing the upgrade from completing successfully.
------
- **I95-65669 Configuration Synchronization Following Conductor Migration:** Resolved an issue where a router appeared synchronized after conductor migration but retained stale configuration because a temporary `NONE_AVAILABLE` response from the conductor was treated as terminal, halting configuration retrieval until a manual commit was executed.
------
- **I95-65680 RoutingManager Not Running on HA Headend Router:** Resolved an issue where the routingManager could remain in STANDBY after a session interruption, leaving the router without an active routing process (loss of BGP/routing connectivity) until restarted.
------
- **I95-65691 Node disconnected after headend partial rollback:** Resolved an issue where a node could remain disconnected from the conductor after a partial rollback scenario on a headend router.
------
- **I95-65719 Secure Conductor Onboarding (SCO) failing:** Resolved an issue where Secure Conductor Onboarding (SCO) failed when using RSA certificates in full chain format, incorrectly reporting that only RSA certificates are supported.
------
- **I95-65754 Highway Crash on Shutdown Due to Static Sessions:** Resolved an issue where the highway process crashed during shutdown on HA nodes performing a downgrade. Static sessions were not being cleared during the shutdown sequence. Static sessions are now properly cleared alongside the session table during shutdown, preventing the crash.
------
- **I95-65757 Highway Crash Adding a Second WAN Circuit on an HA Node:** Resolved an issue where the highway process could crash on both nodes of an HA pair when bringing up an additional WAN interface, triggered by a BGP flapping condition that occurred while the new circuit's physical link had not yet come up.
------
- **I95-65769 SSR400-series platforms failed to start due to missing IMA file signatures:** Resolved an issue where runtime RPM upgrades of the minion-connector on SSR400-series platforms failed to start due to missing IMA file signatures, resulting in loss of conductor connectivity.
------
- **I95-65771 Resolved a Highway Crash Related to Unclassified Application Statistics:** Resolved an issue where the highway process could crash while collecting application identification statistics for sessions that had no classified application type. Application statistics handling now safely accounts for this case.
------
- **I95-65797 ESKM Peering Stays Down After Late Metadata Key:** Resolved an issue where ESKM peering remained down when BFD received the local metadata key late because retransmit timers were not being restarted after their initial firing.
------
- **I95-65803 Connected Routes on a Bonded Interface Missing from the RIB After Upgrade:** Resolved an issue where, after an upgrade, directly connected routes on a bonded (LAG) interface could be missing from the routing table even though the interface and its members were up, requiring users to manually reset the interface to restore the routes. The system now correctly handles the race condition.
------
- **I95-65804 RADIUS Certificate Validation Rule Coverage:** Extended the configuration validation rule that requires a client certificate when a RADIUS server is configured for TLS to also cover router-level RADIUS server lists, which had previously been missed.
------
- **I95-65819 Fixed Syslog TLS Certificate Validation Failure:** Resolved an issue where syslog messages configured to use TLS could fail to be forwarded because the certificate authority bundle was not concatenated correctly. CA certificate bundles are now assembled correctly.
------
- **I95-65826 Assets enter a `Disconnected` state after upgrading the Conductor:** After a Conductor upgrade, assets entered a `Disconnected` state while the SSH connections were restored. In some cases this took an hour or more. The minion connector has been upgraded to version 1.7.7 to resolve this issue. 
------
- **I95-65855 IPv6 Link-Local Resolver Nginx Failures:** Resolved an issue where Nginx failed to start, or entered a crash loop when no external DNS was configured because IPv6 link-local addresses were selected as resolvers. The resolver logic now filters link-local addresses, properly formats IPv6 addresses, and prioritizes `/etc/hosts` and `dnsmasq` overrides.
------
- **I95-65886 Static DNS Host Entries Not Honored for Syslog Destinations:** Resolved an issue where syslog destinations configured by hostname did not resolve using locally configured static host-to-IP mappings when public DNS was unavailable. Syslog now resolves configured hostnames using static entries directly, rather than through the nginx resolver.
------
- **I95-65893 Display ESKM Payload Key Indices in Session Details:** Resolved an issue where operators could not verify active ESKM encryption key indices on live sessions. The `show session detail` and `show sessions by-id` command outputs now include ESKM payload key indices (`currentEncryptionIndex` and `currentDecryptionIndex`) for active encrypted flows.
------
- **I95-65899 Router not synchronized After Conductor Migration:** Resolved an issue where an HA router pair could remain un-synchronized with the production conductor after migrating from a staging conductor, because the new conductor address was not persisted following migration.
------
- **I95-65912 Resolved Source NAT Port Exhaustion Caused by Duplicate Internal Interfaces:** Resolved an issue where enabling both source NAT and IDP could result in duplicate internal interface identifiers being created, contributing to premature exhaustion of available source NAT ports and dropped packets. Internal IDP interface identifiers are now allocated uniquely.
------
- **I95-65914 Trusted CA Certificate File Resolution:** Resolved an issue where the `file` attribute of a trusted CA certificate was ignored in favor of the `name` attribute when resolving the certificate file on disk, which could prevent Secure Conductor Onboarding from locating the expected certificate file.
------
- **I95-65941 DHCP Subnet-Level Custom Options Rejected:** Resolved an issue where non-standard DHCP options and vendor-specific information (VIVSO) configured at the subnet level could be rejected due to a missing option definition, preventing the DHCP service from starting.
------
- **I95-65959 Improved Subtenant Support in IDP Access Policy Configuration:** Improved handling of subtenant relationships in IDP access policy configuration to ensure access policies are applied correctly across tenant hierarchies.
------
- **I95-65962 False-Positive NAT Duplicate Validation Error on HA Routers with IDP Enabled:** Resolved an issue where committing a dynamic or bidirectional source NAT configuration on an HA router with IDP enabled could fail with a false "duplicate" validation error, because the configuration validator did not account for the shared interface existing identically on both HA nodes. The validator now correctly recognizes this as a single logical interface.
------
- **I95-65963 Secure Conductor Onboarding Panels Displayed in Inconsistent Order:** Resolved an issue where Secure Conductor Onboarding (SCO) panels were displayed in a random order in the web interface. Panels are now displayed in a consistent, deterministic order.
------
- **I95-65971 Improved Subtenant Support in Access Policy Validation:** Improved access policy validation to correctly accept bidirectional tenant relationships when subtenants are configured.
------
- **I95-65972 Improved Subtenant Prefix Inheritance in Access Policy:** Resolved an issue where child tenants did not correctly inherit prefix bindings from an ancestor tenant in access policy configurations. Subtenant configurations now correctly inherit ancestor prefix bindings.
------
- **I95-66066 CA Bundle Not Refreshed After REST API Certificate Ingestion:** Resolved an issue where ingesting a trusted CA certificate through the REST API did not refresh the in-memory CA bundle used for certificate validation, causing subsequent client certificate ingestion to fail with a certificate validation error until an unrelated configuration commit was performed.
------
- **I95-66067 Offline upgrade failure:** Resolved an issue during upgrade that was being reported as an `Unpacker Failure`. The service startup order has been adjusted to prevent the issue in future upgrades/installations.
------
- **I95-66071 Resolved a Highway Crash During GRE Tunnel Configuration Updates:** Resolved an issue where a failed lookup during a GRE tunnel interface modification could leave stale internal state, causing the highway process to crash on a subsequent configuration change to the same tunnel. GRE tunnel state is now cleaned up correctly when a lookup fails.
------
- **I95-66077 BGP Peers Down After Enabling a Second Internet Provider:** Resolved a defect in BGP conditional advertisement processing that could cause all BGP peers to go down when a second BGP-connected internet provider was enabled.
------
- **I95-66082 Resolved a Highway Crash on Reverse-Flow Session Collision:** Resolved an issue where the highway process could crash when a returning packet collided with an internal session during reverse-flow processing, causing peer instability. The colliding packet is now safely dropped instead of causing a crash.
------
- **I95-66125 Assets Remain Disconnected After Conductor Upgrade:** Resolved an issue where assets could remain in a Disconnected or flapping state after a conductor upgrade instead of reaching a stable Running state.
------
- **I95-66127 401 Authorization Required error when refreshing Logs page:** Resolved a `401 Authorization Required` error that prevented non-default administrator users from viewing router displays, the Logs page, and FIB tables in the Conductor GUI. 
------
- **I95-66131 Highway Crash when setting PoE Port Provisional Status:** Resolved an issue where setting the provisional status of a PoE port could cause the highway process to abort due to a cross-thread access violation. The operation now safely executes on the correct thread.
------
- **I95-66133 Improved Conflux Shutdown Diagnostics:** Added logging to more clearly capture a shutdown deadlock condition in the Conflux analytics process, improving the ability to diagnose the issue if it recurs.
------
- **I95-66165 AES-GCM-256 Commit Failure:** Resolved an issue where committing a security policy using the `aes-gcm-256` cipher failed because the encryption vector was not automatically generated.
------
- **I95-66196 Commit Failures After Upgrade Due to Auto-Generated IPv6 DNS Service Routes:** Resolved an issue where upgrading could automatically generate an IPv6 DNS management service and associated service-route even when IPv6 DNS was not in use, causing configuration commits to fail on routers where the management interface did not have source NAT enabled. The DNS service route is now generated only for address families that have a corresponding management interface.
------
- **I95-66234 Creating a snapshot log for large configurations appears to stall the system:** Resolved an issue where generating a diagnostic snapshot log, including as part of a tech support info bundle, could take an excessive amount of time on a system with a large configuration and cause the configuration director's poller thread to appear unresponsive.
------
- **I95-66238 NTP Rejected State After Upgrade:** Resolved an issue where NTP synchronization could enter a rejected state after an upgrade, caused by a boot-sequence race condition where the NTP time-sync dispatcher ran before the internal management interface was ready. This could also result in missing analytics graphs and authentication errors on the Conductor GUI due to clock skew.
------
- **I95-66246 Antivirus Connectivity Failing on Vhost Platforms:** Resolved an issue where the antivirus (IDP AV) engine failed to establish connectivity on platforms using vhost-based networking, and improved parsing of security event information.
------
- **I95-66278 Resolved Peer-Path Instability with ML-KEM Sessions:** Resolved an issue where an incorrect retransmit timer for  sessions using ML-KEM could cause peer-paths to intermittently flap and drop traffic. The retransmit timer has been corrected.
------
- **I95-66291 RoutingManager Crash With Unresolved FQDN Service Route:** Resolved an issue where the routing manager process could crash when a service route's NAT target was an unresolved fully qualified domain name (FQDN), such as one still pending DNS resolution.
------
- **I95-66333 Highway Crash on Hub After Spoke WAN Interface Disruption:** Resolved an issue where the highway process on a hub could crash while decrypting payload traffic over a fabric or inter-router interface that did not have inter-router security configured, following a peer-path failure on a spoke.
------
- **I95-66351 Peer Paths Not Recovering After Interface Changes:** Resolved an issue where peer paths could remain down and next-hop routes unreachable after a network-interface configuration change, such as a shutdown or rename, requiring a full system restart to recover. Device-interface configuration changes are now retried automatically after a transient failure.
------
- **I95-66371 Antivirus Engine Startup Failure on Repeated CA Load:** Resolved an issue where the antivirus engine could fail to start if the certificate authority had already been extracted from a previous startup attempt.

### Caveats

- **I9566331 Peer path failure between SSR routers running version 7.2.1 and a hub running version 7.2.3 when using ESKM:** There is an issue where the ESKM metadata-key exchange between different software versions may fail to reach the  MetadataKeyExchCompleted state causing a peer path failure.

  Any sender on 7.1.0-7.1.6 or 7.2.0-7.2.1 will remain in MetadataKeyExchInitiated when its peer is running 7.0.5, 7.1.7 or 7.2.3. This issue will be addressed in later releases.

  If you are required to pair a 7.1.0-7.1.6 or 7.2.0-7.2.1 router with a 7.0.5, 7.1.7 or 7.2.3 peer on an ESKM path (during an upgrade, for example), upgrade both ends of each ESKM path in the same upgrade window.  Avoid rolling back to the earlier release while the peer remains on 7.0.5, 7.1.7 or 7.2.3.

## Release 7.2.1-1r1 

**Release Date:** July 14, 2026

### Resolved Issues 

- **I95-65610 SSR400/SSR440 routers not connecting to the Conductor after upgrade:** Resolved an issue where runtime RPM upgrades of the minion-connector on SSR400-series platforms failed to start due to missing IMA file signatures, resulting in loss of conductor connectivity.

## Release 7.2.0-29r1 

**Release Date:** July 1, 2026

### New Features

- **I95-25150 AES-GCM Encryption:** AES-GCM is now supported as a higher-performance encryption and authentication algorithm, replacing the previous AES-CBC + HMAC-SHA approach. AES-GCM combines encryption and authentication in a single operation, reducing per-packet processing overhead. The implementation includes frequent key rotation, per-path unique keys to reduce the cryptographic load on any single key, and a deterministic incrementing nonce scheme to prevent nonce reuse. For more information, see [AES-GCM Encryption](sec_security_policy.md#aes-gcm-encryption). 
------
- **I95-34472 Waypoint Pool Exhaustion Monitoring:** Added visibility into waypoint pool utilization including a `show waypoint` command that allows operators to monitor,the waypoint pool. See [`show waypoints`](cli_reference.md#show-waypoints) for more information.
------
- **I95-55344 SSL Forward Proxy:** SSL Forward Proxy uses signed, trusted certificates to allow the SSR to perform a man-in-the-middle (MITM) function that decrypts and re-encrypts HTTPS traffic, and supports IDP and AV scans of traffic at that time. For more information, see [Configure SSL Forward Proxy](sec-ssl-fwd-proxy.md).
------
- **I95-60371 Adaptive PMTU Change Handling for Long-Lived Sessions:** The SSR performs Path MTU Discovery (PMTUD) along the overlay to determine the correct maximum transmission unit (MTU) for each peer path. Devices in the underlay may report an ICMP Destination Unreachable / Fragmentation Needed (type 3, code 4) error to indicate they could not forward a packet due to an undersized MTU. With 7.2.0, the SSR updates the affected overlay flow and generates a corrected packet toward the original packet sender, allowing the sender to adjust its segment size. The flow which was traversed to trigger the response from the underlay is now updated to use the new updated MTU. For more information, see [Path MTU Discovery](config_pmtu.md).
------
- **I95-61066 Simplified Interface Naming:** Simplified Interface Naming for Cloud Images: Forwarding device-interfaces can now be configured using Linux interface names instead of PCI addresses or VMBus UUIDs. This simplifies deployment in Hyper-V and Azure environments, where VMBus UUIDs are randomly generated per VM instance and require manual discovery. Template-based configurations are now more portable across hardware changes and scaled deployments.
------
- **I95-61467 Show filtered-routes in `show bgp` output:** When an inbound BGP policy rejects prefixes received from a neighbor, those routes do not appear in the BGP table or the FIB. The `filtered-routes` option exposes exactly which prefixes were suppressed by the inbound policy for a given neighbor, making it straightforward to troubleshoot why expected routes are absent from the routing table. For more information, see [Viewing Filtered BGP Routes](config_bgp.md#viewing-filtered-bgp-routes).
------
- **I95-63012 AppID Scale Optimization:** Improved application identification scalability including automatic scaling of the app-id cache by platform, enhanced sessions-per-second rate with app-id enabled, and automatic tuning of service area for app-id functionality.
------
- **I95-63030 HA Sync Redundancy:** Beginning with SSR 7.2.0, [HA Sync Redundancy](config_non_forwarding_ha_interfaces.md#ha-sync-redundancy) allows you to configure a non-forwarding `bond` device interface for the HA control traffic interface. Grouping this bond interface with multiple ethernet device interfaces provides redundancy in the event of a port or cable failure.
------
- **I95-64149 Enhanced Security Key Management Events:** Added system audit events for all success-path PKI operations in Certificate Management — including private key generation/deletion, certificate update/deletion, and CSR deletion — complementing the existing audit coverage for CSR generation and certificate ingest. See the [Troubleshooting section of Enhanced Security Key Managament](sec_enhanced_key_mgmt.md#troubleshooting) for additional information. 
------
- **I95-64435 SSR400/SSR440 FIPS Compliant EEPROM:** Migrated SSR400/SSR440 devices to a FIPS-compliant EEPROM encryption scheme, replacing the previously used RSA ES cipher. Existing inventory remains forward compatible with new SSR software.
------
- **I95-64645 Certificate Management - CSR Improvements:** Starting in SSR 7.2.0, the peering identity can be carried in a Subject Alternative Name (SAN) URI extension instead of the Common Name (CN). This is especially useful in **HA deployments**, where both nodes in a router share the same `peering-common-name` but enterprise PKI policies require unique CNs per certificate. See [Enhanced Security Key Management — API Naming Rules](sec_enhanced_key_mgmt.md#peering-identity-via-subject-alternative-name-uri) for details.
------
- **I95-64845 Add Additional Audit Events for Certificate APIs:** Adds several audit events and logs for certificate activity. See the [Audit Events and Logging](sec-cert-based-encrypt.md#audit-eventslogging) section of Certificate-based Security Encryption for additional information.
------
- **WAN-3182 In-band Management Inbound Apps:** When a Mist-managed device uses an in-band management address, inbound services such as ICMP and SNMP can now be allowed from selected user networks, enabling network monitoring and diagnostics without a dedicated management interface.

### Resolved Issues 

- **The following CVEs have been identified and resolved in this release:** CVE-2023-40403, CVE-2023-43000, CVE-2025-9230, CVE-2025-12084, CVE-2025-13502, CVE-2025-13601, CVE-2025-13947, CVE-2025-14087, CVE-2025-14512, CVE-2025-43272, CVE-2025-43342, CVE-2025-43343, CVE-2025-43356, CVE-2025-43368, CVE-2025-43392, CVE-2025-43419, CVE-2025-43421, CVE-2025-43425, CVE-2025-43427, CVE-2025-43429, CVE-2025-43430, CVE-2025-43431, CVE-2025-43432, CVE-2025-43434, CVE-2025-43440, CVE-2025-43443, CVE-2025-43458, CVE-2025-43480, CVE-2025-43501, CVE-2025-43529, CVE-2025-43531, CVE-2025-43535, CVE-2025-43536, CVE-2025-43541, CVE-2025-53859, CVE-2025-61662, CVE-2025-66287, CVE-2025-67873, CVE-2025-68114, CVE-2025-68973, CVE-2026-1519, CVE-2026-1642, CVE-2026-3497, CVE-2026-4111, CVE-2026-4424, CVE-2026-4519, CVE-2026-4786, CVE-2026-4878, CVE-2026-5119, CVE-2026-5121, CVE-2026-6100, CVE-2026-21710, CVE-2026-25749, CVE-2026-26996, CVE-2026-27135, CVE-2026-27651, CVE-2026-27654, CVE-2026-27784, CVE-2026-27904, CVE-2026-28417, CVE-2026-28421, CVE-2026-29111, CVE-2026-31431, CVE-2026-32647, CVE-2026-32748, CVE-2026-33412, CVE-2026-33416, CVE-2026-33526, CVE-2026-33636, CVE-2026-34982, CVE-2026-35385, CVE-2026-35386, CVE-2026-35387, CVE-2026-35388, CVE-2026-35414, CVE-2026-35535, CVE-2026-39979, CVE-2026-40164, CVE-2026-40460, CVE-2026-40701, CVE-2026-41242, CVE-2026-42926, CVE-2026-42934, CVE-2026-42945, CVE-2026-42946, CVE-2026-43284, CVE-2026-43500, CVE-2026-46300, CVE-2026-46333.
------
- **The following issues have been addressed and delivered to increase the overall security posture of the SSR:** I95-62091, I95-65017, I95-65019, I95-65030, I95-65039, I95-65054, I95-65080, I95-65206, I95-65210, I95-65222, I95-65249. 
------
- **I95-61693 DHCP INFORM Response Improvements:** Resolved an issue where DHCP INFORM packets were not correctly answered. The DHCP ACK response now includes the requested options, ensuring clients retain vital information such as DNS servers, domain name, and gateway.
------
- **I95-63033 `show lte detail` crash when LTE apn-name is invalid:** Resolved an issue where executing `show lte detail` when an invalid APN name is configured caused a CLI crash due to an unhandled dictionary update error.
------
- **I95-63035 Antivirus warning when missing tenant for AV traffic:** Resolved an issue where an antivirus alert was incorrectly raised on the passive node in an HA system, indicating AV was not active.
------
- **I95-63547 Time-based HMAC peering issues due to unsynchronized peers:** Addressed an issue where peering using time-based HMAC encryption failed when the time delta between peers exceeded 2 seconds due to unsynchronized clocks.
------
- **I95-63673 Peer Paths `no paths` text fix:** Resolved a styling issue on the web interface where the `no paths` text on the Peer Paths page was not displayed correctly.
------
- **I95-63794 `show lte detail` error handling for invalid APN configuration:** Resolved an issue where executing `show lte detail` with an invalid APN configuration caused a `ValueError` crash. The CLI now handles unexpected response formats gracefully.
------
- **I95-63873 DHCP Leases Not Showing in Conductor UI:** Resolved an issue where attempting to retrieve DHCP v4 leases via the Conductor UI for a specific router results in `no leases found`. Also resolved an issue where viewing a router Logs page via the Conductor UI displayed ALL logs rather than using the selected time range.
------
- **I95-63876 Route Flapping and Inaccessibility:** Resolved an issue where routes would flap or become inaccessible in hub-and-spoke topologies with inter-hub steering preferences configured, causing intermittent connectivity failures.
------
- **I95-63951 BGP Graceful Restart Sending EOR Prematurely:** Resolved an issue where the SSR sent End-of-RIB (EOR) markers prematurely during BGP graceful restart, without waiting to receive EOR from its peers as required by RFC 4724, potentially causing route convergence issues.
------
- **I95-63955 SSR Process Inactive After Conductor Onboarding but UI shows `Synchronized`:** Resolved an issue where, after completing the Secure Conductor Onboarding (SCO) workflow in Azure with vTPM enabled, the UI incorrectly showed the device as `Synchronized` while the SSR service was inactive, triggering a `No Connectivity` alarm.
------
- **I95-63965 SNMP MIB subinterfaces not reporting correct stats:** Resolved an issue where SNMP MIB statistics for VLAN sub-interfaces were incorrectly reporting the same values as the parent interface instead of per-sub-interface statistics.
------
- **I95-63966 SNMP MIB cannot retrieve description:** Resolved an issue where the SNMP interface description field was returned as empty during SNMP walks, even though the description was configured in the SSR software.
------
- **I95-63982 Disallow upgrades when unsigned packages are present and IMA is enabled:** Added protections to prevent upgrades to unsigned packages when IMA is enabled, avoiding scenarios where the system loses connectivity after an upgrade due to unsigned executables being denied execution.
------
- **I95-63983 System LED does not turn off after halt or shutdown:** Resolved an issue where the system LED on SSR400/SSR440 devices did not turn off or change state after a halt or shutdown, making it difficult to determine whether the unit was still running.
------
- **I95-63985 VRRP Non-revertive Active/Active Recovery:** Added support for VRRP to automatically revert from an active/active state back to active/standby when the underlying Layer 2 connectivity is restored, without requiring manual intervention such as priority changes or interface flaps.
------
- **I95-64051 AWS inconsistent interface mapping:** Resolved an issue where interface mapping in AWS deployments was inconsistent, causing the HA fabric interface to remain in the kernel while the HA sync interface was incorrectly taken by the forwarding process, preventing HA from functioning properly.
------
- **I95-64061 Azure Kernel Hung Task After Upgrade:** Resolved an issue where Azure VMs experienced kernel hung task crashes related to `uio_hv_generic` after upgrading, requiring a reboot to recover.
------
- **I95-64063 Salt Minion restarting every minute when one Conductor is Unreachable:** Resolved an issue where the Salt Minion restarted once per minute whenever one conductor in a two-conductor deployment was unreachable, causing repeated instability in the management plane connection.
------
- **I95-64150 User defined SNMP metrics not working:** Resolved an issue where user-defined SNMP metrics were not functional due to a missing configuration file (`snmpMetricsConfig.json`) and missing references in the SNMP object agent.
------
- **I95-64152 Conductor connectivity blocked by stale SSH control sockets:** Resolved a condition where, after a router reboot (particularly following an unclean shutdown), the router could remain **Disconnected** in the Conductor due to stale SSH control sockets. The SSH coordination logic now cleans up stale control sockets automatically, restoring Conductor–router connectivity.
------
- **I95-64221 TPM firmware update capsule support:** Added TPM firmware update capsule support in the SSR400/SSR440 firmware, enabling in-field TPM firmware updates.
------
- **I95-64238 RADIUS Authentication Non-Functional:** Resolved an issue where RADIUS authentication produced no traffic toward the configured server. The `radsec proxy` configuration file is now placed inside an encrypted directory so that RADIUS shared secrets are protected at rest. 
------
- **I95-64250 BGP routes received but not installed in BGP table or RIB:** Resolved an issue where BGP routes from specific neighbors were received but not installed in the BGP table or RIB, requiring neighbor reconfiguration to restore route installation.
------
- **I95-64306 Optimize ICMP probe profile update on config change:** Resolved an issue where ICMP probe profiles were unnecessarily restarted on every configuration update even when no actual changes occurred, causing excessive work and log noise.
------
- **I95-64341 SSR400/SSR440 front panel port LEDs not turned off on reset:** Resolved an issue where the SSR400/SSR440 front panel port LEDs were not turned off when the system was reset or halted.
------
- **I95-64344 Extended multicast traffic loss during HA failover:** Resolved an issue where multicast traffic experienced extended loss (37+ seconds) during an HA failover. 
------
- **I95-64397 Cosmetic error message on SSR1500:** Resolved an issue where cosmetic error messages about `rc.local` and `telegraf` systemd unit files were displayed on the CLI of SSR1500 devices.
------
- **I95-64408 TCP timers for syslog connections too relaxed:** Resolved an issue where TCP connection timers for syslog were either not set or too relaxed. This resulted in excessive retransmit attempts when a syslog receiver became unavailable, delaying failover to an alternate server.
------
- **I95-64412 Factory reset to include removal of salt cache:** Added recursive cleanup of the salt cache directory and smart sync hashes in the platform cleanup script to ensure a more complete reset.
------
- **I95-64434 IDP Bypass Alert Policy Not Applied:** Resolved an issue where the IDP bypass `alert` policy was not being applied correctly, causing traffic to be incorrectly handled by the IDP engine.
------
- **I95-64448 Metrics retrieval failing for node1 when HA is down:** Resolved an issue where empty data was returned when HA links were down. Peer node system metrics (CPU, memory, disk) now return an error response instead of silently returning empty data.
------
- **I95-64479 Invalid application WEBEX not recognized:** Resolved an issue where the WEBEX application was not being recognized by the application identification module after an upgrade, resulting in `invalid application` events and missing FIB entries for the associated service.
------
- **I95-64541 Node disconnection during upgrade:** Resolved an issue where upgrading HA router nodes could result in one node entering a disconnected state with stale SSH control sockets, while the other node became stuck in the upgrading state, requiring a manual reboot to recover.
------
- **I95-64542 Highway crash during service path refresh:** Resolved a highway crash that occurred during service path load-balanced route refresh operations. Protections have been added to prevent the crash.
------
- **I95-64549 Onboarding routers cannot install salt packages:** Resolved an issue where routers being onboarded to a conductor could not install the required salt packages, preventing successful onboarding.
------
- **I95-64566 CSR generation ignores camelCase parameters:** Resolved an issue where the certificate signing request (CSR) API silently ignored camelCase parameter names (e.g., `commonName` instead of `common_name`).
------
- **I95-64567 SSR router status Disconnected on Conductor:** Resolved an issue where configuring a loopback address on a router node caused the router to become Disconnected from the Conductor due to incorrect source NAT behavior on internal sessions.
------
- **I95-64575 Unable to login to SSR routers from conductor in Cloud deployment:** Resolved an issue where the SSH configuration on cloud-deployed routers disabled password authentication, preventing login from the conductor.
------
- **I95-64603 `Chronyd` Requires Manual Restart After Reboot:** Resolved an issue where all NTP servers appeared as rejected after a reboot, requiring a manual restart of the `chronyd` service to restore time synchronization.
------
- **I95-64619 Config validate rejects DHCP network-interface when VRRP is present:** Resolved an issue where configuration validation incorrectly rejected a DHCP-enabled network-interface if VRRP was present in the configuration, even when VRRP was not enabled.
------
- **I95-64627 Certificate Unavailable for Peering After Upgrade:** Resolved an issue where the local certificate became unavailable for peering after an upgrade, resulting in peer paths remaining down with a "No local certificate available" error.
------
- **I95-64684 HMAC Cipher Mode Information in Logs and Session Output:** Added HMAC mode and HMAC cipher details to session logs and `show sessions` output, improving visibility into the active encryption and authentication state of sessions.
------
- **I95-64687 Factory Reset Does Not Recursively Clean `/var/cache/salt/`:** Resolved an issue where factory reset operations did not recursively remove the `/var/cache/salt/` directory, leaving stale salt cache files behind. The cleanup process now removes this directory recursively.
------
- **I95-64696 Salt connectivity issues after Conductor upgrade:** Resolved an issue where salt-minion lost connectivity to the salt-master after a Conductor upgrade, affecting approximately 20% of routers. The minion-connector service now correctly manages the salt master address.
------
- **I95-64703 Swagger Documentation for Private-Key, Certificate, and Certificate Request APIs:** Updated the Swagger API documentation to include router-level and node-level paths (`/router/{router}/node/{node}/...`) for the `private-key`, `certificate`, and `certificate-request` endpoints, which were previously documented at the top level only.
------
- **I95-64709 Premature route installation complete notification during Graceful Restart:** Resolved a documentation discrepancy and corrected the behavior of the `stale-routes-time` parameter and its relationship to RFC 4724's `Selection_Deferral_Timer`, ensuring proper Graceful Restart route handling.
------
- **I95-64732 Update `show peers certificate` date format:** Updated the `show peers certificate` command to use a newer API for certificate date rendering, providing a more user-friendly output format.
------
- **I95-64829 Device disconnected from MIST and stopped processing sessions:** Resolved a highway crash triggered by a config change that caused the device to go offline and stop processing sessions, requiring a power cycle to recover.
------
- **I95-64835 Remove UI checkbox for Rollback on Failure during Conductor migration:** Removed the erroneous `Rollback on Failure` checkbox from the Conductor migration UI, as the underlying feature was never implemented. This prevents user confusion during migration operations.
------
- **I95-64876 Intermittent Application Issues Due to Child Service:** Resolved an issue that lead to NAT pool exhaustion and intermittent application failures. When domain name–based child services had different routing paths than the parent service, it caused stale sessions on upstream firewalls.
------
- **I95-64877 Changes to guard against L7 security stack crash:** Resolved an issue where the IDP attack database was lost on reboot. The database is now stored persistently, and additional safeguards have been added for AV engine health checks, SSL certificate staging retries, and error code accuracy.
------
- **I95-64903 High CPU and Disk Usage on SSR440:** Resolved an issue where SSR440 devices experienced high CPU and disk usage without corresponding syslog messages being generated, making the condition difficult to diagnose.
------
- **I95-64929 Peer certificate expiration timer overflow at 49 days:** Resolved an issue where the seconds-to-milliseconds conversion for peer certificate expiration timers used unsigned 32-bit arithmetic, causing silent overflow and premature timer firing for certificates with expiration periods greater than 49 days.
------
- **I95-64977 Certificate ingestion ignores expiry and revocation validation:** Resolved an issue where certificate ingestion did not properly enforce expiry and revocation validation results, allowing expired or revoked certificates to be ingested.
------
- **I95-64997 SYSLOG SEIM Integration Not Sending Failed Session Attempts:** Resolved an issue where the SYSLOG SEIM integration did not send log events for ERROR/FAILED session attempts (dropped packets), limiting visibility into denied traffic.
------
- **I95-65019 TLS client peer-verification skipped when no CA certificate is configured:** Resolved a critical issue where TLS client connections without a configured CA certificate silently skipped peer verification.
------
- **I95-65056 `show app-id cache-sizes` Command Not Available:** Resolved an issue where the `show app-id cache-sizes` CLI command was not available.
------
- **I95-65099 Traffic Engineering Stats Incorrect Output:** Resolved an issue where `show stats traffic-eng internal-application per-traffic-class` displayed incorrect or unexpected output.
------
- **I95-65128 nodeMonitor Crash Loop on Hub Node:** Resolved an issue where a Linux interface name with an empty string caused a continuous crash loop on a hub node. Users are now prevented from configuring an empty Linux interface name.
------
- **I95-65129 Peer Path Up Using Mixed Certificates:** Resolved an issue where peer paths could come up using certificates from different issuers (default Juniper certificate on one side and a custom CA-signed certificate on the other), even with a custom trusted CA configured.
------
- **I95-65131 CPS Performance Degradation:** Resolved an issue that caused approximately 10% connections-per-second (CPS) performance degradation observed on SSR1300 platforms.
------
- **I95-65171 TSI Download Missing File Extension:** Resolved an issue where Tech Support Info (TSI) bundles downloaded from the SSR Web UI had no file extension, preventing extraction with standard archive tools. Tech support files downloaded from the web UI now have the correct `.zip` extension.
------
- **I95-65296 ESKM Peering Failures with Fragmentation:** Resolved an issue where ESKM peer paths failed to establish in environments where fragmentation occurs on the underlay, such as GCP with Cloud Routers.
------
- **I95-65351 IMA and Security Stack Incompatibility:** Resolved an issue where enabling IDP with IMA caused the security engine to fail to start due to an incompatibility between IMA enforcement and the security stack binaries.
------
- **I95-65354 Missing Dependencies in Offline ISO:** Resolved an issue where required software dependencies were missing from the offline ISO, preventing plugin upgrades in air-gapped environments.
------
- **I95-65390 Conductor Migration Deadlock:** Resolved an issue where conductor migration could deadlock when using `asset-connection-resiliency` in `SSH-only` mode, leaving routers unable to connect to the production conductor.
------
- **I95-65393 ESKM Certificate Invalid Alarm After Upgrade:** Resolved an issue where a certificate invalid alarm was incorrectly raised after upgrading to a newer SSR version, causing peering to go down even though the certificate was not expired.
------
- **I95-65403 Disallow CA Certificates for Peering:** Added validation to prevent certificates with the CA:True basic constraint from being used as peering certificates, as these are intended for signing other certificates rather than direct peering authentication.
------
- **I95-65410 Incorrect RBAC for Certificate Ingestion API:** Resolved an issue where the POST `/api/v1/certificate` endpoint incorrectly required READ permission for the entire configuration instead of WRITE permission.
------
- **I95-65411 CLI Command Appending Unrelated Output:** Resolved an issue where executing certain PCLI commands (such as `show peer router all force`) would append unrelated command output at the end of the expected results.
------
- **I95-65431 SSR Failing to Sync with NTP Server After Reboot:** Resolved an issue where the SSR failed to synchronize with NTP servers after a reboot, requiring manual intervention to restore time synchronization.
------
- **I95-65439 CRL in Certificate Not Taken into Account:** Resolved an issue where the Certificate Revocation List (CRL) distribution point specified within a certificate was not being honored, requiring manual CRL configuration on the conductor.
------
- **I95-65455 Network Manager Interface Preventing HA Sync:** Resolved an issue where a spurious "Wired Connection 1" Network Manager interface prevented the HA sync interface from obtaining an IP address after an upgrade.
------
- **I95-65469 GUI Not Showing Network Interfaces:** Resolved an issue where the SSR Web UI no longer displayed Network Interfaces under device details, showing only Device Interfaces.
------
- **I95-65486 Highway Crash During Upgrade from Legacy Version:** Resolved a highway crash that occurred during router upgrades from legacy versions (e.g., 5.5.x to 7.2.x), causing the upgrade to fail after timing out.
------
- **I95-65512 Web Server and Nginx Crash Looping:** Resolved an issue where the web server and nginx processes entered a crash loop, preventing access to the SSR Web UI.
------
- **WAN-4340 Force Up on Bond Interface Member Causes Bond Down:** Resolved an issue where enabling Force Up on one interface of a bond caused the entire bond to go down due to the configuration being incorrectly applied at the VLAN sub-interface level.
------
- **WAN-4341 Auto-Generated Service Route Name Changes on Bond Modification:** Resolved an issue where adding or removing an interface from a Bond Interface caused auto-generated service route names to change, disrupting traffic steering.
------
- **WAN-4510 Multiple Syslog Servers Causing Configuration Failure:** Resolved an issue where defining more than one syslog server in the SSR device configuration caused the syslog configuration to fail.
------
- **WAN-4513 Enable Syslog Policy for URL Filtering:** Added syslog policy support for URL filtering events, enabling URL filter matches to be forwarded to configured syslog servers.
------
- **WAN-4592 Internet Application Conflict Between Overlay and Local Breakout:** Resolved an issue where using the same internet application for both overlay traffic and local breakout created routing conflicts when app-id was used on the overlay, causing incorrect traffic steering.
------
- **WAN-4612 ICMPv6 Probes Not Working for Non-Directly-Connected Targets:** Resolved an issue where ICMPv6 probe packets were not generated for targets that were multiple hops away (not directly connected), causing probe-based health monitoring to fail for IPv6 WAN interfaces.
------
- **WAN-4641 Next-Hop-Self Not Applied for BGPv6 Over SVR Neighbors:** Resolved an issue where the `next-hop-self true` configuration was not being applied for BGPv6 over SVR neighbors, causing prefixes learned via eBGP on the LAN to be advertised across the overlay with incorrect next-hop values.
------
- **WAN-4709 Route Reflector Config Not Applied for IPv6 Peers:** Resolved an issue where route-reflector configuration was not automatically enabled on hub routers for IPv6 BGP SVR spoke peers in the IPv6 Unicast address family.
------
- **WAN-4740 IPv6 Overlay Traffic Failure Between Hub and Spoke LANs:** Resolved an issue where wired client traffic between HubLAN and SpokeLAN via the IPv6 overlay failed due to FIB entries missing vector, next-hop, and cost information for the overlay-v6 application policy.
------
- **WAN-4747 IPv6 Routing Policy Next-Hop-Self Statement:** Resolved an issue where removing the `set-next-hop-self` statement from IPv6 routing policies caused the policies to lack a required catch-all accept rule, breaking IPv6 route advertisement.

### Caveats

- **I95-64407 Alternate SHA ciphers (256/384/512) not working properly with ESKM:** SSR 7.1.3 and 7.2.0 introduce `sha384` and `sha512` as configurable options for the `hmac-cipher` field on security policies, alongside a new internal data structure that tracks metadata keys per HMAC mode and cipher combination. 

  In deployments with peers running different versions of software and sharing security policies, configuring `hmac-cipher sha384` or `hmac-cipher sha512` in a fabric where any peer has not yet been upgraded to 7.2.0 or 7.1.3,  those older versions of software will not recognize `hmac-cipher sha384` or `hmac-cipher sha512`. These devices will continue to run `sha-256-128`. Currently, no alarm or warning will be generated, and there is no performance impact.
------
- **I95-65609 After upgrading using Secure Conductor Onboarding and reaching the Syncronized state, routers return to Waiting:** An issue has been identified for any upgrade where 128T processes start slowly relative to the SCO server could produce this symptom for all previously-onboarded routers. 

  *Workaround:* Restart the Secure Conductor Onboarding service: `systemctl restart 128T-secure-onboarding-server`. 
------
- **I95-65667 Rare case of an Automated Provisioner crash:** In some cases, an Automated Provisioner crash has been encountered. The Automated Provisioner recovers on it's own, and no loss of functionality or data is experienced. This will be addressed and resolved in a future release. 
