---
title: SSR 7.0 Release Notes
sidebar_label: '7.0'
---
The SSR has moved away from the historical package-based delivery to an image-based delivery. As such, it is strongly suggested that you revisit your "standard" procedures for installation and upgrade of SSR Software. 

Beginning with SSR v6.3.0, the use of the interactive installer is not supported, or necessary. Software installation and upgrade upgrade activities are supported from the Web Interface or the Command Line Interface. 

### Installation from ISO

When installing SSR V6.3.0 or newer on a new system, use the image-based ISO - identified by the filename prefix "SSR": `SSR-6.3.0-107.r1.el7.x86_64.ibu-v1.iso`. Installation documentation for the image-based process can be found in the [Image-based ISO Installation Overview](intro_installation_univ-iso.md). 

Offline mode conductor and router upgrades to image-based installations are detailed in the [Single-Version 6.3.0 Upgrade](upgrade_restricted_access.md#single-version-630-upgrade) instructions.


### Upgrade Considerations

:::important
Before upgrading please review the [**Upgrade Considerations**](intro_upgrade_considerations.md) and the [**Rolling Back Software**](intro_rollback.md) pages. Several modifications have been made to the process for verifying configurations, which will impact existing configurations.
:::

**System Disk Considerations**

As mentioned above, during the upgrade to an image-based installation, existing systems will go through a conversion process to support image-based delivery. This process involves resizing the existing disk partition to support writing a new disk image to the remaining disk space. As such, the usable disk space seen after this conversion will be approximately halved. The system will automatically detect if there is not enough usable disk space on the existing drive to support this partition resizing and, if so, will trigger an upgrade failure. Even if the conversion is succesful and the upgrade succeeds, users may note that the system is experiencing disk space alarms after the upgrade due to the reduction in overall capacity. It is suggested to remove unnecessary large files from systems before upgrading. Old saved tech-support-info archives (check for tar.gz or zip files in `/var/log/128technology`) and uploaded ISO images are frequent contributors to used disk space and should be manually deleted.

In certain scenarios, existing cloud routers may have been installed from images that did not use LVM for partitions. For these systems, the automatic resizing of disk partitions will fail and they cannot be upgraded. It is suggested to rebuild these instances from the official SSR BYOL image for either [AWS](intro_installation_quickstart_byol_conductor_aws.md) or [Azure](intro_installation_byol_azure_conductor.md).

When the conductor is initially upgraded to an image-based installation, it will be upgraded as a package-based system. This is because the system does not understand how to handle image-based delivery until it is running 6.3 software. Once the conductor is running 6.3 all router upgrades will be treated as image-based upgrades and any subsequent conductor upgrade will be treated as image-based. Therefore, it is possible that issues related to disk usage on conductor may not arise until a subsequent upgrade of the conductor beyond the initial step to 6.3.

**Offline-Mode: Upgrading 6.3.x Conductor Deployments to 6.3.x+**

An issue has been identified that may be observed in conductor deployments running version 6.3.x software, when attempting to upgrade from one 6.3.x patch release to another. This results in the message, “SSR firmware upgrade failed for the local node: SSR upgrade failed after reboot”. To work around this, run `request system software upgrade installation-service` from the command line of the Conductor, after importing the image-based ISO. Once complete, perform the full system upgrade from the Web-interface. This issue will be resolved in a future release. 

**Offline-Mode: Onboarding Routers Running older SSR Software to a 6.3.x Conductor**

An issue has been identified when onboarding SSR routers installed with older versions of software (such as 5.4.4) to Conductors running 6.3.x, when running in offline-mode. In some cases, certain software packages are not available to be installed during onboarding. To work around this issue, import the **package-based** (the "128T" prefixed) ISO for the current conductor version onto the conductor. This provides the necessary software packages to complete the onboarding process. This issue will be resolved in a future release. 

## Release 7.0.0-48r1

**Release Date:** September 12, 2025

### New Features

- **I95-22432 Conductor Management over IPv6:** All router to conductor communication along with management protocols (ssh, radius, syslog, snmp, web gui/api) now support IPv6. However in an IPv6 managed node, devices must be running the same IP version. For example, in an IPv6 HA configuration, both Conductors must be running IPv6. 
------
- **I95-29382 Enhanced Security Key Management:** Introduces a new peer-to-peer, certificate-based key exchange mechanism to the SVR protocol. This key exchange avoids mid-network re-encryption and provides the ability to rotate keys as required. The security rekeying mechanism is configured at the Authority, and requires that all routers and conductors be running the same version of software that supports this capability. The existing security key exchange mechanisms continue to exist and will be supported during the transition to the new model. The two security approaches cannot coexist at the same time within an authority. See [Enhanced Security Key Management](enhanced-sec-key-mgmt.md) for more information.
------
- **I95-52924 NIC Driver FEC Support:** Support has been added to configure optical FEC for SFPs.
------
- **I95-53993 Display LLDP Neighbors:** A CLI command to output neighbors discovered through LLDP has been added.
------
- **I95-57454 Management traffic over SVR (in-band management):** Router to Conductor communication is supported over SVR with the use of [rekey](enhanced-sec-key-mgmt.md#peer-key-and-key-rotation).
------
- **I95-58635 Source Peer added to output of `show session by-id`:** Added information to the output of `show session by-id`, making it easier to troubleshoot sessions.
------
- **I95-59239 Application Policy Hit Counter:** [Application Policy Hit Count (APHC)](app_policy_hit_count.md) provides insight into the routing policies being referenced to direct traffic in your network operations; it reports which policies are being referenced ("hit") and how. These values are presented as metrics tracked per service, per tenant; where each tenant service combination could be "hit" in one of the following ways.

| Count  | Description |
| ---- | ----------- |
| Allowed | The session was allowed and created successfully. |
| Failed | The session could not be created. |
| Denied due to Access Policy | The packet was denied because an access policy explicitly disallows access. |
| Denied due to URL Filtering | The session was created was blocked once app classification was completed. |
| Denied due to Local Service Definition | The session was allowed on another ingress router, but is denied here based on the policy on this router (commonly related to hierarchical services). | 
------
- **I95-59634 Allow Highway lockup detection to be disabled:** Added a `local.init` override for disabling datapath lockup detector mechanism.

```
  "datapath": {
    "lockupDetectionEnabled": true/false
  },
```
------
- **I95-59758 Interactive Initializer updates all system account passwords:** Interactive initialization now changes the `admin`, `t128` and `root` user passwords to the same value. The initialization preference file has the fields, `t128-password`, `root-password`, and `admin-password`, to set password hashes for each user, respectively.
------
- **I95-59996 GUI Initialization sets passwords for all system accounts:** GUI initialization now changes the `admin`, `t128` and `root` user passwords to the same value. See [Password Security](config_password_security.md) for additional information. 
------
- **I95-60041 `initialize conductor` command sets password for all system accounts:** The system accounts `admin`, `t128` and `root` are simultaneously set to the provided password hash, ensuring default passwords are not used.
------
- **I95-60220 SSR OS Upgrade:** SSR OS distribution has been upgraded to Oracle Linux 9.
------
- **WAN-2284 Critical IDP Profile:** A new **Critical** attack list profile that is more lightweight has been added to reduce the commit/policy change times.

### Resolved Issues

- **The following CVEs have been identified and resolved in this release:** CVE-2023-4527, CVE-2023-4806, CVE-2023-4813, CVE-2023-4911, CVE-2024-3651, CVE-2024-24806, CVE-2024-56171, CVE-2025-24928, CVE-2024-6232, CVE-2024-11187, CVE-2024-1737, CVE-2024-1975, CVE-2024-56326, CVE-2024-3596, CVE-2024-37370, CVE-2024-37371, CVE-2025-24528, CVE-2023-46846, CVE-2024-45802, CVE-2024-12085, CVE-2023-48161, CVE-2024-21208, CVE-2024-21210, CVE-2024-21217, CVE-2024-21235, CVE-2022-1304, CVE-2023-26604, CVE-2025-27363, CVE-2025-0624, CVE-2024-55549, CVE-2025-24855, CVE-2024-7347, CVE-2025-23419, CVE-2025-21587, CVE-2025-30691, CVE-2025-30698, CVE-2016-9840, CVE-2024-12718, CVE-2025-4138, CVE-2025-4330, CVE-2025-4435, CVE-2025-4517, CVE-2025-32462, CVE-2025-4802, CVE-2025-5702, CVE-2025-6020, CVE-2025-47268, CVE-2025-25724, CVE-2025-3576, CVE-2025-49794, CVE-2025-49796, CVE-2025-6021, CVE-2023-26916, CVE-2025-47273, CVE-2024-23337, CVE-2025-48060, CVE-2023-52572, CVE-2023-52621, CVE-2023-52757, CVE-2024-26686, CVE-2024-26739, CVE-2024-26952, CVE-2024-27402, CVE-2024-35790, CVE-2024-35866, CVE-2024-35867, CVE-2024-35943, CVE-2024-36350, CVE-2024-36357, CVE-2024-36908, CVE-2024-38540, CVE-2024-38541, CVE-2024-42160, CVE-2024-42322, CVE-2024-44938, CVE-2024-46742, CVE-2024-46751, CVE-2024-46774, CVE-2024-46784, CVE-2024-46816, CVE-2024-49960, CVE-2024-49989, CVE-2024-50047, CVE-2024-50125, CVE-2024-50258, CVE-2024-50272, CVE-2024-50280, CVE-2024-53128, CVE-2024-53185, CVE-2024-53203, CVE-2024-54458, CVE-2024-56551, CVE-2024-56599, CVE-2024-56655, CVE-2024-56658, CVE-2024-56751, CVE-2025-21681, CVE-2025-21839, CVE-2025-21853, CVE-2025-22027, CVE-2025-22062, CVE-2025-23140, CVE-2025-23142, CVE-2025-23144, CVE-2025-23145, CVE-2025-23146, CVE-2025-23147, CVE-2025-23148, CVE-2025-23150, CVE-2025-23151, CVE-2025-23156, CVE-2025-23157, CVE-2025-23158, CVE-2025-23159, CVE-2025-23161, CVE-2025-23163, CVE-2025-37738, CVE-2025-37739, CVE-2025-37740, CVE-2025-37741, CVE-2025-37742, CVE-2025-37749, CVE-2025-37752, CVE-2025-37756, CVE-2025-37757, CVE-2025-37758, CVE-2025-37765, CVE-2025-37766, CVE-2025-37767, CVE-2025-37768, CVE-2025-37770, CVE-2025-37771, CVE-2025-37773, CVE-2025-37780, CVE-2025-37781, CVE-2025-37787, CVE-2025-37788, CVE-2025-37789, CVE-2025-37790, CVE-2025-37792, CVE-2025-37794, CVE-2025-37796, CVE-2025-37797, CVE-2025-37803, CVE-2025-37805, CVE-2025-37808, CVE-2025-37810, CVE-2025-37812, CVE-2025-37817, CVE-2025-37819, CVE-2025-37823, CVE-2025-37824, CVE-2025-37829, CVE-2025-37830, CVE-2025-37836, CVE-2025-37838, CVE-2025-37839, CVE-2025-37840, CVE-2025-37841, CVE-2025-37844, CVE-2025-37850, CVE-2025-37857, CVE-2025-37858, CVE-2025-37859, CVE-2025-37862, CVE-2025-37867, CVE-2025-37875, CVE-2025-37881, CVE-2025-37883, CVE-2025-37885, CVE-2025-37890, CVE-2025-37892, CVE-2025-37905, CVE-2025-37909, CVE-2025-37911, CVE-2025-37913, CVE-2025-37914, CVE-2025-37915, CVE-2025-37923, CVE-2025-37927, CVE-2025-37929, CVE-2025-37930, CVE-2025-37940, CVE-2025-37949, CVE-2025-37967, CVE-2025-37969, CVE-2025-37970, CVE-2025-37982, CVE-2025-37983, CVE-2025-37985, CVE-2025-37989, CVE-2025-37990, CVE-2025-37991, CVE-2025-37992, CVE-2025-37994, CVE-2025-37995, CVE-2025-37997, CVE-2025-37998, CVE-2025-38005, CVE-2025-38009, CVE-2025-38023, CVE-2025-38024, CVE-2025-38031, CVE-2025-38089.
------
- **I95-54844 Default to Multi-threading for session processing:** New session processing rates are now increased by default when the system has sufficient CPU resources, by using multiple CPU threads.
------
- **I95-55698 BGP advertisement not forwarded from HA spoke after VRRP LAN failover:** Resolved an issue where the `minimum-advertisement-interval` in the SSR was set incorrectly, causing BGP to react slower than necessary during VRRP LAN failovers. The `minimum-advertisement-interval` has been set to 0 for MIST BGP LAN neighbors.
------
- **I95-56168 Health check messages unclear:** Improved wording and capitalization of the error messages to provide a better user experience. 
------
- **I95-56537 `show software` does not handle `router node all`:** Resolved an issue where the `node all` option was not handled correctly and indicated that node all did not exist. The SSR now reads the command correctly and provides accurate results.
------
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
- **I95-57584 IGMP ingress packets not being accepted after defining tenant prefixes on LAN subnet:** Resolved an issue when using `tenant-prefix` on the interface, all PIM/IGMP messages were blocked. This issue has been resolved. In addition, the ability to only allow igmp messages sent from specifc source-addresses has been added. For more information, see [`source-address-prefix-list`](config_command_guide.md#configure-authority-router-routing-igmp-interface-source-address-prefix-list)
------
- **I95-58017 FIB entries on `show fib` not available for all headends:** Resolved an issue with `show fib` stalling and not returning complete data. 
------
- **I95-58999 Packet Processing CPU reads 100% when interface is operationally down:** Resolved an issue where an attempt to transmit packets on an operationally down standby interface resulted in a persistent false report of packet processing activity, which led to an erroneous calculation of 100% CPU utilization.
------
- **I95-59338 Drop in performance on SSR130:** Resolved an issue where disabling kernel mitigations negatively impacted performance. Kernel mitigations are no longer disabled by default. 
------
- **I95-59367 Race condition during configuration change, resulting in highway crash:** Resolved a race condition between configuration processing and packet processing, which led to invalid memory access and resulted in a highway crash.
------
- **I95-59407 Ping utility in the Web interface does not accept an IPv6 address:** Resolved an issue where the web interface ping utility was hardcoded to only accept IPv4 addresses. This has been resolved.
------
- **I95-59478 Recover PPPoE after highway crash:** Updated the PPPoE re-init script to resolve an issue where, after a highway crash, the PPPoE NSID becomes invalid and causes the device status to stay `down` even if the monitoring script reports `up`.
------
- **I95-59521 Local Config Override not working in the GUI:** Added support for the local configuration override mode to the GUI. For more information, see [Local Configuration Override](how_to_local_config_override.md#using-the-gui).
------
- **I95-59676 Alarm when default passwords are not changed:** An alarm has been added to detect when default password hashes are detected for standard system users. It is highly recommended that all system user passwords be updated to a secure password as soon as possible.
------
- **I95-59745 Routers are stuck in the connected state and not transitioning to running:** Resolved an issue where the router repeatedly sent the same incorrect values to the config during startup, resulting in a race condition. 
------
- **I95-59758 Prompt for password change:** The user is now prompted to change the `admin`, `t128`, and `root` passwords during installation. The password is changed to the same value for all three users. 
------
- **I95-59860 Incorrect timestamps shown on IDP startup:** The `Engine started` and `Last Commit` timestamps have been updated to provide accurate readings when the engine has not yet started, or the values are not available.
------ 
- **I95-60038 `show fib` lookup fails for IPv6 addresses:** Parsing IPv6 addresses was not performed properly, resulting in an invalid query. The code has been updated to properly parse the request before processing.
------
- **I95-60180 Installation screen displays incorrect SSR OS:** After the OS rebranding to SSR OS, the option to install erroneously shows on the install screen. This has been removed.
------
- **I95-60282 Disk space usage growing to more than 90%:** DNF logs were increasing in size and not being rotated, causing a significant increase in size. A `log rotate` configuration file for DNF has been added to limit the size of DNF log files to prevent them from filling the hard drive. When this fix is installed on the conductor, it is automatically propogated to all managed routers. 
------
- **I95-60287 Add option to disable Kernel Metric SLA Calculation:** In rare cases on a heavily loaded system, the kernel metric calculation process can sometimes hang for a period of time, causing an internal watchdog to fire. This results in a system restart. Setting `routing default-instance > service-metric-use-lsa > false` will prevent the kernel flap that causes this issue. See [`service-metric-use-lsa`](config_command_guide.md#configure-authority-router-routing-service-metric-use-sla) for addtional information.
------
- **I95-60321 DHCP relay service not honoring configuration change for the addition of a new subtenant:** Resolved an issue where new subtenants were not inheriting server mapping from the parent tenant. 
------
- **I95-60377 Alarm suppression - alarms not unshelved after deleting the shelf:** Resolved an issue where user-defined Alarm Shelves created on version 6.3+ conductors experience unexpected behavior on routers version 6.2 and below. This issue has been resolved and routers receiving user-defined shelves now handle them correctly.
------
- **I95-60425 Router Advertisement (RA) responses to Router Solicitation (RS) are dropped as `unknown-dropped-from-application`:** Support has been added to send a unicast IPv6 RA to the LAN client immediately upon receiving a IPv6 RS from the LAN client.
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
- **I95-60647 Migrate command not forcing a router re-sync:** Resolved an issue where a router is successfully migrated from one conductor to another conductor and establishes connectivity, but does not apply the configuration from the new conductor until a commit is performed.
------
- **I95-60651 SSR upgrade from 6.3.0 to 6.3.3 reboots back to 6.3.0:** Resolved an issue where the Conductor was unable to upgrade router packages to the latest version even though the packages were available on the Conductor. A `dnf refresh` now runs to ensure package accessibility. 
------
- **I95-60688 Password change upon first login throws error message:** Resolved an issue that prevented users from changing their password on the secondary node of an HA pair. This would happen with both an expired password, or upon first login. 
------
- **I95-60730 Mulitcast stream is not recovering after failover:** Resolved an issue where an HA node does not recover after failover. The error handling method has been updated to use the global interface ID rather than the local interface ID when running the multicast incoming interface check.
------
- **I95-60741 KNI no longer passes traffic when it is operationally down, preventing IPSec from functioning:** Resolved an issue with the KNI interface that prevented transmit-through even when the interface is operationally down.
------
- **I95-60747 TANK thread failure:** Resolved a rare issue where exceptions in the TANK response handling logic resulted in data missing from the GUI and PCLI. This issue has been resolved. 
------ 
- **I95-60750 Password Confirmation missing:** When onboarding an SSR using the web interface, users are now required to confirm the password change.
------
- **I95-60765 Application module does not clear previous entries:** Resolved an issue where if a module has services configured, using the REST API to send the clear command to delete those services from the module does not work. The list may appear empty, but the services still persist on the module. This issue has been resolved and the services list is now cleared properly. 
------
- **I95-60767 ServiceRouteNextHops validation rejects configuration:** Resolved an issue where the rule validator did not consider the `service application-type` as DNS proxy into consideration during the configuration rule validation. This issue has been resolved.
------
- **I95-60768 Rare race condition between packet processing and configuration update:** Resolved a rare race condition where invalid memory was accessed during packet processing if config was being loaded at the same time.
------
- **I95-60924 Adopt command error message is misleading:** Resolved an issue where username/password login failures are not clear. The `adopt` PCLI command now interactively prompts for `mist-instance` if it is not specified on the command line. This helps avoid confusion when trying to associate using username/password which fails if connecting to the wrong instance. Also resolved a related issue that prevented adopting using a Mist account with Multi Factor Authentication (MFA/2FA) enabled.
------
- **I95-60948 RADIUS secret length limited to 16 characters:** The RADIUS secret size was erroneously set to 16 octets. The allowable RADIUS secret size has been updated from 1 to 255.
------
- **I95-60960 After reboot, the PIM RP IP address moves to a VRF:** Resolved an issue where after reboot the PIM RP IP moves to a VRF, leaving the base instance without a PIM RP IP address. The VRF is now explicitly added to the config, preventing this issue. 
------
- **I95-61024 Pagination issues when performing `show events`:** Resolved an issue where `show events` fails to produce multiple pages.
------
- **I95-61058 Peer paths fail when additional IPs are added to a WAN interface:** Resolved a case where adding a second address for use in nat-pools to a peering interface caused continuous bfd peer flaps. The SSR now handles address changes when the local IP address changes.
------
- **I95-61075 BGP does not re-establish after firewall failover:** Resolved an issue where when initiating a BFD for BGP session, the cached MAC to IP mapping was being used. If the MAC address had changed, stale information was used and the BFD session would not be established. We now issue an ARP request to get the latest MAC Address.
------
- **I95-61085 Highway crash after incorrectly adding an IP address for a Multicast service:** Resovled an issue where a packet reached the router and matched a FIB without a service association, i.e. a FIB created for multicast traffic. The SSR will now drop a packet for a summary service if it matches a FIB without an associated service. 
------
- **I95-61093 Router first time synchronization :** Resolved an issue where a minion is restarted multiple times during the first connection to the conductor, resulting an extended wait time before synchronization.
------
- **I95-61201 Renaming VRF on an active VRF stream causes a coredump:** Resolved a race condition during configuration processing while active traffic uses the same VRF, causing a coredump.
------
- **I95-61275 Network Interface Alarm shows as Category: Interface:** Resolved an issue with a mismatch in underlying alarm shelf categories. Alarm Shelves set to the category `Interface` will now correctly shelve alarms that display as Interface in the alarm list. 
------
- **I95-61276 Modifying Alarm Shelves does not correctly propagate the change:** Modifying the shelving criteria of an alarm shelf will now correctly shelve alarms according to the new criteria. 
------
- **I95-61453 'mist' user missing from '128t-user' group at login:** Resolved an issue that prevented the modification of lock files causing the process responsible for managing user permissions to fail.
------
- **I95-61458 BGP-VRF Conductor in `Connected` state instead of `Running` state:** Resolved an issue where salt modules fell out of sync, causing unexpected exceptions and preventing the system from picking up configuration changes.
------
- **I95-61579 Highway crashes when executing command `show device-interface name <name> registers` on an i40e network port:** Resolved an issue with the `registers` sub option that caused the crash on the i40e network port. The sub option has been removed. 
------
- **I95-61580 CLI does not prompt for required router restart:** Resolved an issue where making a configuration change requiring a restart only generates a warning only for the router that the PCLI is running on. Committing a configuration change that requires a restart now results in a warning even when the change is on a different router.
------
- **I95-61866 Unnecessary events sync:** Resolved an issue where data is unintentionally synched between HA nodes. 





