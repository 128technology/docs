---
title: SSR 7.1 Release Notes
sidebar_label: '7.1'
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

:::warning
An issue has been identified involving the use of the HA Sync Redundancy Plugin with SSR 7.0.0, which prevents proper functioning of the plugin. If you use the HA Plugin in your SSR deployment, it is not advised to upgrade at this time. The issue is being investigated and will be resolved in a future release.
::: 

**System Disk Considerations**

As mentioned above, during the upgrade to an image-based installation, existing systems will go through a conversion process to support image-based delivery. This process involves resizing the existing disk partition to support writing a new disk image to the remaining disk space. As such, the usable disk space seen after this conversion will be approximately halved. The system will automatically detect if there is not enough usable disk space on the existing drive to support this partition resizing and, if so, will trigger an upgrade failure. Even if the conversion is succesful and the upgrade succeeds, users may note that the system is experiencing disk space alarms after the upgrade due to the reduction in overall capacity. It is suggested to remove unnecessary large files from systems before upgrading. Old saved tech-support-info archives (check for tar.gz or zip files in `/var/log/128technology`) and uploaded ISO images are frequent contributors to used disk space and should be manually deleted.

In certain scenarios, existing cloud routers may have been installed from images that did not use LVM for partitions. For these systems, the automatic resizing of disk partitions will fail and they cannot be upgraded. It is suggested to rebuild these instances from the official SSR BYOL image for either [AWS](intro_installation_quickstart_byol_conductor_aws.md) or [Azure](intro_installation_byol_azure_conductor.md).

When the conductor is initially upgraded to an image-based installation, it will be upgraded as a package-based system. This is because the system does not understand how to handle image-based delivery until it is running 6.3 software. Once the conductor is running 6.3 all router upgrades will be treated as image-based upgrades and any subsequent conductor upgrade will be treated as image-based. Therefore, it is possible that issues related to disk usage on conductor may not arise until a subsequent upgrade of the conductor beyond the initial step to 6.3.

**Offline-Mode: Upgrading 6.3.x Conductor Deployments to 6.3.x+**

An issue has been identified that may be observed in conductor deployments running version 6.3.x software, when attempting to upgrade from one 6.3.x patch release to another. This results in the message, “SSR firmware upgrade failed for the local node: SSR upgrade failed after reboot”. To work around this, run `request system software upgrade installation-service` from the command line of the Conductor, after importing the image-based ISO. Once complete, perform the full system upgrade from the Web-interface. This issue will be resolved in a future release. 

**Offline-Mode: Onboarding Routers Running older SSR Software to a 6.3.x Conductor**

An issue has been identified when onboarding SSR routers installed with older versions of software (such as 5.4.4) to Conductors running 6.3.x, when running in offline-mode. In some cases, certain software packages are not available to be installed during onboarding. To work around this issue, import the **package-based** (the "128T" prefixed) ISO for the current conductor version onto the conductor. This provides the necessary software packages to complete the onboarding process. This issue will be resolved in a future release. 

## Release 7.1.0-xxr1

**Release Date:** November 25, 2025

### New Features

- **I95-34739 SSR400 and SSR440 Factory reset:** The SSR4x0 devices provide the ability to reset the device to either a pre-defined rescue (or **Golden**) configuration, or a secure zeroization of the system and a return to the factory default configuration. For more information, see [Factory Reset](config-factory-reset.md).
------
- **I95-53402 SSR400/SSR440 Chassis Manager:** The SSR400 and SSR440 support an integrated Chassis Manager to help monitor connectivity, power, temperature, as well as providing insight into other vital operational data. For more information, see the [SSR Chassis Manager](ssr-chassis-manager.md).
------
- **I95-53405 5G modem support:** Support for 5G modems as provided in the SSR400 and SSR440 devices has been added. 
------
- **I95-54238 Uninterruptable Boot Process:** When the uninterruptable boot process is configured, a failed upgrade will not allow the user to select the image on the other volume (since the Console port is disabled, no user input is possible). For more information, see the [Uniterruptable Boot Process](sec-disable-ports.md#uninterruptable-boot-process).
------
- **I95-54244 Secure Boot:** The SSR400 and SSR440 are factory configured with a cryptographic public key that only allows an authenticated firmware image to run on the device. This ensures that only trusted (Juniper-signed) code will run from power-on through to linux OS boot. For additional information, see [Secure Boot](sec-secure-boot.md).
------
- **I95-55746 Connection to Mist via proxy server/Support Mist Secure ZTP Onboarding:** Support has been added to allow a connection to a public URL or to MIST using an explicit proxy and a private web proxy. See [Proxy Server Configuration](config-proxy-server.md) for information to configure the SSR to identify and use the non-transparent proxy. For information about the secure ztp process using Mist, see [Secure ZTP Onboarding Using a Mist Proxy](sec-ztp-web-proxy.md).
------
- **I95-55936 Alarm and Events when service area hits threshold:** Support has been added to allow users to configure alarms thresholds to monitor session processing capacity, and provide visibility into the system’s capacity to establish new sessions. For more information, see [Session Processing Alarms](ts_session_processing.md#session-processing-alarms).
------
- **I95-57174 DCSP Steering - UDP/TCP destination port:** With SSR version 7.1.0, the restriction for matching ports has been lifted, and support has been added for DCSP steering over non-IPSEC tunnels. For more information, see [DSCP Steering Using GTP](config_dscp_steering.md#dscp-steering-using-gtp). 
------
- **I95-58502 Disable on box management ports:** Configuration fields have been added to node configuration on the SSR400 and SSR440 devices, allowing you to control physical security features. For more information, see [Disable SSR400 and SSR440 Management Interfaces](sec-disable-ports.md).
------
- **I95-59235 HTTP/S proxy server for all public URLs:** Support has been added to allow a connection to a public URL or to MIST using an explicit proxy and a private web proxy. See [Proxy Server Configuration](config-proxy-server.md) for information to configure the SSR to identify and use the non-transparent proxy. This process can also be used to support the [Mist secure ZTP onboarding](sec-ztp-web-proxy.md) process.

### Resolved Issues

- **The following CVEs have been identified and resolved in this release:** CVE-2024-3651, CVE-2024-56171, CVE-2025-24928, CVE-2024-11187, CVE-2024-1737, CVE-2024-1975, CVE-2024-3596, CVE-2024-37370, CVE-2024-37371, CVE-2025-24528, CVE-2023-46846, CVE-2024-45802, CVE-2024-12085, CVE-2023-26604, CVE-2024-7347, CVE-2025-23419, CVE-2024-43842, CVE-2024-40906, CVE-2024-44970, CVE-2025-21756, CVE-2022-49011, CVE-2024-53141, CVE-2025-21587, CVE-2025-30691, CVE-2025-30698, CVE-2024-0727, CVE-2023-5678, CVE-2024-5535, CVE-2024-9143, CVE-2024-13176, CVE-2016-9840, CVE-2024-12718, CVE-2025-4138, CVE-2025-4330, CVE-2025-4435, CVE-2025-4517, CVE-2025-32462, CVE-2025-5702, CVE-2025-5702, CVE-2025-4802, CVE-2025-6020, CVE-2025-47268, CVE-2025-25724, CVE-2025-3576, CVE-2025-47273, CVE-2024-23337, CVE-2025-48060, CVE-2023-52572
CVE-2023-52621, CVE-2023-52757, CVE-2024-26686, CVE-2024-26739, CVE-2024-26952, CVE-2024-27402, CVE-2024-35790, CVE-2024-35866, CVE-2024-35867, CVE-2024-35943, CVE-2024-36350, CVE-2024-36357, CVE-2024-36908, CVE-2024-38540, CVE-2024-38541, CVE-2024-42160, CVE-2024-42322, CVE-2024-44938, CVE-2024-46742, CVE-2024-46751, CVE-2024-46774, CVE-2024-46784, CVE-2024-46816, CVE-2024-49960, CVE-2024-49989, CVE-2024-50047, CVE-2024-50125, CVE-2024-50258, CVE-2024-50272, CVE-2024-50280, CVE-2024-53128, CVE-2024-53185, CVE-2024-53203, CVE-2024-54458, CVE-2024-56551, CVE-2024-56599, CVE-2024-56655, CVE-2024-56658, CVE-2024-56751, CVE-2025-21681, CVE-2025-21839, CVE-2025-21853, CVE-2025-22027, CVE-2025-22062, CVE-2025-23140, CVE-2025-23142, CVE-2025-23144, CVE-2025-23145, CVE-2025-23146, CVE-2025-23147, CVE-2025-23148, CVE-2025-23150, CVE-2025-23151, CVE-2025-23156, CVE-2025-23157, CVE-2025-23158, CVE-2025-23159, CVE-2025-23161, CVE-2025-23163, CVE-2025-37738, CVE-2025-37739, CVE-2025-37740, CVE-2025-37741, CVE-2025-37742, CVE-2025-37749, CVE-2025-37752, CVE-2025-37756, CVE-2025-37757, CVE-2025-37758, CVE-2025-37765, CVE-2025-37766, CVE-2025-37767, CVE-2025-37768, CVE-2025-37770, CVE-2025-37771, CVE-2025-37773, CVE-2025-37780, CVE-2025-37781, CVE-2025-37787, CVE-2025-37788, CVE-2025-37789, CVE-2025-37790, CVE-2025-37792, CVE-2025-37794, CVE-2025-37796, CVE-2025-37797, CVE-2025-37803, CVE-2025-37805, CVE-2025-37808, CVE-2025-37810, CVE-2025-37812, CVE-2025-37817, CVE-2025-37819, CVE-2025-37823, CVE-2025-37824, CVE-2025-37829, CVE-2025-37830, CVE-2025-37836, CVE-2025-37838, CVE-2025-37839, CVE-2025-37840, CVE-2025-37841, CVE-2025-37844, CVE-2025-37850, CVE-2025-37857, CVE-2025-37858, CVE-2025-37859, CVE-2025-37862, CVE-2025-37867, CVE-2025-37875, CVE-2025-37881, CVE-2025-37883, CVE-2025-37885, CVE-2025-37890, CVE-2025-37892, CVE-2025-37905, CVE-2025-37909, CVE-2025-37911, CVE-2025-37913, CVE-2025-37914, CVE-2025-37915, CVE-2025-37923, CVE-2025-37927, CVE-2025-37929, CVE-2025-37930, CVE-2025-37940, CVE-2025-37949, CVE-2025-37967, CVE-2025-37969, CVE-2025-37970, CVE-2025-37982, CVE-2025-37983, CVE-2025-37985, CVE-2025-37989, CVE-2025-37990, CVE-2025-37991, CVE-2025-37992, CVE-2025-37994, CVE-2025-37995, CVE-2025-37997, CVE-2025-37998, CVE-2025-38005, CVE-2025-38009, CVE-2025-38023, CVE-2025-38024, CVE-2025-38031, CVE-2025-38089, CVE-2025-7425, CVE-2025-32414, CVE-2025-32415, CVE-2025-27151, CVE-2025-32023, CVE-2025-48367, CVE-2025-49133, CVE-2025-6965, CVE-2025-5222, CVE-2025-4373, CVE-2024-52533, CVE-2024-6174, CVE-2025-5994, CVE-2024-52615, CVE-2025-40909, CVE-2022-29458, CVE-2024-47081, CVE-2025-6965, CVE-2025-8058, CVE-2025-30749, CVE-2025-30754, CVE-2025-30761, CVE-2025-50106, CVE-2025-5914, CVE-2025-54389, CVE-2025-7425, CVE-2025-8194, CVE-2025-48964, CVE-2025-53905, CVE-2025-53906, CVE-2025-58060, CVE-2025-58364, CVE-2025-32988, CVE-2025-32989, CVE-2025-32990, CVE-2025-6395, CVE-2023-49083, CVE-2024-47252, CVE-2025-23048, CVE-2025-49812, CVE-2020-11023, CVE-2025-5318. 
------
- **I95-39653 Negative duration in session table after applying filter:** Resolved an issue where applying a filter to the session table resulted in sessions displaying a negative duration.
------
- **I95-60767 ServiceRouteNextHops validation rejects configuration:** Resolved an issue where the rule validator did not consider the `service application-type` as DNS proxy into consideration during the configuration rule validation. This issue has been resolved.
------
- **I95-60799 Tenant prefix use within a VRF:** The SSR allows the configuration of tenant-prefixes without giving an error, and correctly handles interfaces with tenant-prefixes within the protocol code.
------
- **I95-61058 Peer paths fail when additional IPs are added to a WAN interface:** Resolved a case where adding a second address for use in nat-pools to a peering interface caused continuous bfd peer flaps. The SSR now handles address changes when the local IP address changes.
------
- **I95-61075 BGP does not re-establish after firewall failover:** Resolved an issue where when initiating a BFD for BGP session, the cached MAC to IP mapping was being used. If the MAC address had changed, stale information was used and the BFD session would not be established. We now issue an ARP request to get the latest MAC Address.
------
- **I95-61093 Router first time synchronization :** Resolved an issue where a minion is restarted multiple times during the first connection to the conductor, resulting an extended wait time before synchronization.
------
- **I95-61453 'mist' user missing from '128t-user' group at login:** Resolved an issue that prevented the modification of lock files causing the process responsible for managing user permissions to fail.
------
- **I95-61580 CLI does not prompt for required router restart:** Resolved an issue where making a configuration change requiring a restart only generates a warning only for the router that the PCLI is running on. Committing a configuration change that requires a restart now results in a warning even when the change is on a different router.
------
- **I95-61866 Unnecessary events sync:** Resolved an issue where data is unintentionally sync'ed between HA nodes. 
------
- **I95-61869 Peer Path Issues:**
------
- **I95-61910 FIPS installation failure:** Resolved an issue where package renaming resulted in missing installation files.
------
- **I95-61999 ATT SIM card MNC code update:** Resolved an issue with the ATT SIM card using an unexpected MNC code.
------
- **I95-62071 Multicast Traffic contributing to service area resource contention:** Resolved an issue when we have an mroute with no outgoing interfaces. We now use a Detour Path instead of NoServicePaths to prevent resource contention.
------
- **I95-62179 Software Lifecycle History not up to date:** Resolved an issue where the software lifecycle page was not showing any history, or in some cases, the history was outdated. Internal functionality has been updated, and both the GUI and CLI outputs now show the correct information.
------
- **I95-62369 Session error record shows 0s for session-id:** Resolved an issue where the session record information was incomplete. The SSR now also uses the redundancy session data to gather records.
------
- **I95-62449 HA conductor fails to initialize secondary node:** 







