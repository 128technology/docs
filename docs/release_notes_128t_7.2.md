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

:::important
Before upgrading please review the [**Upgrade Considerations**](intro_upgrade_considerations.md) and the [**Rolling Back Software**](intro_rollback.md) pages. Several modifications have been made to the process for verifying configurations, which will impact existing configurations.
:::

:::important
After installing / upgrading to SSR 7.1.3 or later, downgrading *to an earlier version* of SSR software where Configuration Integrity (CI) is not available is NOT supported. 

Rollback to the previously installed version of software *is* supported.  
:::

**7.0.1 Conductor Upgrades**

If you are upgrading a conductor that is currently installed with version 6.3.4 or lower, and you wish to upgrade to version 7.0.1 or higher, you must first upgrade the conductor to any version of the 6.3.x software, including and higher than 6.3.5. 

Routers running SSR software versions earlier than 6.3.5 cannot connect to conductors running SSR software version 7.0.1 and higher. A transitional step is required to enable routers running versions earlier than 6.3.5 (6.0.x, 6.1.x, 6.2.x, 6.3.4 and lower) to communicate with a conductor running 7.0.1+. 

1. Upgrade the conductor to any version of the 6.3.x software, including and higher than 6.3.5.
2. Upon completion of the install, allow all managed routers to connect and reach the **Synchronized** state. 
  The new keying requirements that are part of 6.3.5+ are loaded onto the routers during synchronization. These are required for routers to communicate with a 7.0.1+ conductor. If the routers do not reach the synchronized state, those routers will not be able to communicate with the 7.0.1+ conductor.
3. Once the routers are synchronized, you may upgrade the conductor to 7.0.1. All synchronized routers, regardless of version, will be able to communicate with the upgraded conductor. The routers are not required to upgrade to 7.0.1 or to 6.3.5.

If your conductor is currently running SSR version 6.3.5+, you may upgrade to 7.0.1 normally.

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
