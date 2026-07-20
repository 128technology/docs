---
title: SSR 7.0 Release Notes
sidebar_label: '7.0'
---
The SSR has moved away from the historical package-based delivery to an image-based delivery. As such, it is strongly suggested that you revisit your "standard" procedures for installation and upgrade of SSR Software. 

Beginning with SSR v6.3.0, the use of the interactive installer is not supported, or necessary. Software installation and upgrade upgrade activities are supported from the Web Interface or the Command Line Interface. 

With the image-based ISO delivered beginning with version 6.3.0, the manual installation process no longer supports the `initialize128t` command. 

Initializing devices as a conductor or conductor-managed router is easily accomplished from the GUI using the [Initialize Your Device - Web Workflow](initialize_u-iso_device.md), or from the CLI using the the `initialize conductor` and `initialize conductor-managed` commands described in the [Initialize Your Device - Advanced Workflow](initialize_u-iso_adv_workflow.md#initialize-a-conductor) documentation.

### Installation from ISO

When installing SSR V6.3.0 or newer on a new system, use the image-based ISO - identified by the filename prefix "SSR": `SSR-6.3.0-107.r1.el7.x86_64.ibu-v1.iso`. Installation documentation for the image-based process can be found in the [Image-based ISO Installation Overview](intro_installation_univ-iso.md). 

Offline mode conductor and router upgrades to image-based installations are detailed in the [Single-Version 6.3.0 Upgrade](upgrade_restricted_access.md#single-version-630-upgrade) instructions.


### Upgrade Considerations

:::important
Before upgrading please review the [**Upgrade Considerations**](intro_upgrade_considerations.md) and the [**Rolling Back Software**](intro_rollback.md) pages. Several modifications have been made to the process for verifying configurations, which will impact existing configurations.
:::

:::warning
An issue has been identified involving the use of the HA Sync Redundancy Plugin with SSR 7.0.1, which prevents proper functioning of the plugin. If you use the HA Plugin in your SSR deployment, it is not advised to upgrade at this time. The issue is being investigated and will be resolved in a future release.
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

An issue has been identified that may be observed in conductor deployments running version 6.3.x software, when attempting to upgrade from one 6.3.x patch release to another. This results in the message, “SSR firmware upgrade failed for the local node: SSR upgrade failed after reboot”. To work around this, run `request system software upgrade installation-service` from the command line of the Conductor, after importing the image-based ISO. Once complete, perform the full system upgrade from the Web-interface. This issue will be resolved in a future release. 

**Offline-Mode: Onboarding Routers Running older SSR Software to a 6.3.x Conductor**

An issue has been identified when onboarding SSR routers installed with older versions of software (such as 5.4.4) to Conductors running 6.3.x, when running in offline-mode. In some cases, certain software packages are not available to be installed during onboarding. To work around this issue, import the **package-based** (the "128T" prefixed) ISO for the current conductor version onto the conductor. This provides the necessary software packages to complete the onboarding process. This issue will be resolved in a future release. 

## Release 7.0.5-7-lts

**Release Date:** July 23, 2026

### New Features

- **I95-26081 Display negotiated BFD Interval:** The command `show peers bfd-interval` has been added to display the negotiated bfd-interval in three columns, `Rx Timer`, `Tx Timer`, and `Multiplier`. See [Negotiated BFD Intervals](howto_tune_bfd.md#negotiated-bfd-intervals) for more information.
------
- **I95-55746 Connection to Mist via proxy server/Support Mist Secure ZTP Onboarding:** Support has been added to allow a connection to a public URL or to MIST using an explicit proxy and a private web proxy. See [Proxy Server Configuration](config_proxy_server.md) for information to configure the SSR to identify and use the non-transparent proxy. For information about the secure ztp process using Mist, see [Secure ZTP Onboarding Using a Mist Proxy](sec-ztp-web-proxy.md).
------
- **I95-59235 HTTP/S proxy server for all public URLs:** Support has been added to allow a connection to a public URL or to MIST using an explicit proxy and a private web proxy. See [Proxy Server Configuration](config_proxy_server.md) for information to configure the SSR to identify and use the non-transparent proxy. This process can also be used to support the [Mist secure ZTP onboarding](sec-ztp-web-proxy.md) process.
------
- **I95-63012 AppID Scale Optimization:** Improved application identification performance and scale for WAN deployments. Optimizations reduce resource consumption on spoke routers where application identification is enabled by default, improving capacity under high traffic loads.
------
- **I95-63604 GUI import/export config only shows uncompressed size:** Resolved an issue where the GUI import and export operations were only showing the uncompressed side of the configuration. Both the compressed and uncompressed size are now shown in the UI.
------
- **I95-63985 VRRP Non-revertive Active/Active Recovery:** Added support for VRRP to automatically revert from an active/active state back to active/standby when the underlying Layer 2 connectivity is restored, without requiring manual intervention such as priority changes or interface flaps.
------
- **I95-65332 BGP Authentication with MD5 in FIPS Mode:** BGP and MSDP now support TCP MD5 authentication when the system is operating in FIPS mode. Previously, enabling FIPS mode prevented BGP authentication from functioning.

### Resolved Issues

- **The following CVEs have been identified and resolved in this release:** CVE-2018-10906, CVE-2018-14468, CVE-2020-11023, CVE-2021-28651, CVE-2021-47670, CVE-2022-25883, CVE-2022-49058, CVE-2022-49111, CVE-2022-49136, CVE-2022-49788, CVE-2022-49846, CVE-2022-49977, CVE-2022-49985, CVE-2022-50020, CVE-2022-50087, CVE-2022-50228, CVE-2022-50367, CVE-2022-50386, CVE-2022-50543, CVE-2023-26604, CVE-2023-31484, CVE-2023-40403, CVE-2023-49083, CVE-2023-52572, CVE-2023-52621, CVE-2023-52757, CVE-2023-53125, CVE-2023-53178, CVE-2023-53226, CVE-2023-53257, CVE-2023-53297, CVE-2023-53305, CVE-2023-53386, CVE-2023-53401, CVE-2023-53513, CVE-2023-53539, CVE-2024-5642, CVE-2024-6174, CVE-2024-12086, CVE-2024-12087, CVE-2024-23337, CVE-2024-26686, CVE-2024-26739, CVE-2024-26952, CVE-2024-27402, CVE-2024-28956, CVE-2024-34459, CVE-2024-35790, CVE-2024-35866, CVE-2024-35867, CVE-2024-35943, CVE-2024-36350, CVE-2024-36357, CVE-2024-36908, CVE-2024-38540, CVE-2024-38541, CVE-2024-42160, CVE-2024-42322, CVE-2024-43876, CVE-2024-43877, CVE-2024-44938, CVE-2024-46742, CVE-2024-46751, CVE-2024-46774, CVE-2024-46784, CVE-2024-46816, CVE-2024-47252, CVE-2024-49960, CVE-2024-49989, CVE-2024-50047, CVE-2024-50125, CVE-2024-50154, CVE-2024-50258, CVE-2024-50272, CVE-2024-50280, CVE-2024-53128, CVE-2024-53185, CVE-2024-53203, CVE-2024-54458, CVE-2024-56326, CVE-2024-56551, CVE-2024-56599, CVE-2024-56644, CVE-2024-56655, CVE-2024-56658, CVE-2024-56751, CVE-2024-57980, CVE-2024-58002, CVE-2025-3576, CVE-2025-4802, CVE-2025-4945, CVE-2025-5278, CVE-2025-5318, CVE-2025-5987, CVE-2025-6020, CVE-2025-6021, CVE-2025-6069, CVE-2025-6075, CVE-2025-6176, CVE-2025-6395, CVE-2025-6965, CVE-2025-7425, CVE-2025-8058, CVE-2025-8194, CVE-2025-8291, CVE-2025-9086, CVE-2025-9230, CVE-2025-9714, CVE-2025-10911, CVE-2025-11021, CVE-2025-11083, CVE-2025-11187, CVE-2025-11561, CVE-2025-12084, CVE-2025-12748, CVE-2025-13151, CVE-2025-13601, CVE-2025-13699, CVE-2025-14087, CVE-2025-14104, CVE-2025-14512, CVE-2025-14523, CVE-2025-15467, CVE-2025-15468, CVE-2025-15469, CVE-2025-21681, CVE-2025-21727, CVE-2025-21759, CVE-2025-21839, CVE-2025-21853, CVE-2025-21905, CVE-2025-21919, CVE-2025-21928, CVE-2025-21991, CVE-2025-22004, CVE-2025-22020, CVE-2025-22026, CVE-2025-22027, CVE-2025-22058, CVE-2025-22062, CVE-2025-22097, CVE-2025-23048, CVE-2025-23140, CVE-2025-23142, CVE-2025-23143, CVE-2025-23144, CVE-2025-23145, CVE-2025-23146, CVE-2025-23147, CVE-2025-23148, CVE-2025-23150, CVE-2025-23151, CVE-2025-23156, CVE-2025-23157, CVE-2025-23158, CVE-2025-23159, CVE-2025-23161, CVE-2025-23163, CVE-2025-30749, CVE-2025-30754, CVE-2025-30761, CVE-2025-32414, CVE-2025-32415, CVE-2025-32462, CVE-2025-32988, CVE-2025-32989, CVE-2025-32990, CVE-2025-37738, CVE-2025-37739, CVE-2025-37740, CVE-2025-37741, CVE-2025-37742, CVE-2025-37749, CVE-2025-37752, CVE-2025-37756, CVE-2025-37757, CVE-2025-37758, CVE-2025-37765, CVE-2025-37766, CVE-2025-37767, CVE-2025-37768, CVE-2025-37770, CVE-2025-37771, CVE-2025-37773, CVE-2025-37780, CVE-2025-37781, CVE-2025-37787, CVE-2025-37788, CVE-2025-37789, CVE-2025-37790, CVE-2025-37792, CVE-2025-37794, CVE-2025-37796, CVE-2025-37797, CVE-2025-37803, CVE-2025-37805, CVE-2025-37808, CVE-2025-37810, CVE-2025-37812, CVE-2025-37817, CVE-2025-37819, CVE-2025-37823, CVE-2025-37824, CVE-2025-37829, CVE-2025-37830, CVE-2025-37836, CVE-2025-37838, CVE-2025-37839, CVE-2025-37840, CVE-2025-37841, CVE-2025-37844, CVE-2025-37850, CVE-2025-37857, CVE-2025-37858, CVE-2025-37859, CVE-2025-37862, CVE-2025-37867, CVE-2025-37875, CVE-2025-37881, CVE-2025-37883, CVE-2025-37885, CVE-2025-37890, CVE-2025-37892, CVE-2025-37905, CVE-2025-37909, CVE-2025-37911, CVE-2025-37913, CVE-2025-37914, CVE-2025-37915, CVE-2025-37923, CVE-2025-37927, CVE-2025-37929, CVE-2025-37930, CVE-2025-37940, CVE-2025-37949, CVE-2025-37967, CVE-2025-37969, CVE-2025-37970, CVE-2025-37982, CVE-2025-37983, CVE-2025-37985, CVE-2025-37989, CVE-2025-37990, CVE-2025-37991, CVE-2025-37992, CVE-2025-37994, CVE-2025-37995, CVE-2025-37997, CVE-2025-37998, CVE-2025-38005, CVE-2025-38009, CVE-2025-38023, CVE-2025-38024, CVE-2025-38031, CVE-2025-38052, CVE-2025-38079, CVE-2025-38085, CVE-2025-38086, CVE-2025-38089, CVE-2025-38159, CVE-2025-38200, CVE-2025-38211, CVE-2025-38250, CVE-2025-38332, CVE-2025-38350, CVE-2025-38352, CVE-2025-38380, CVE-2025-38392, CVE-2025-38449, CVE-2025-38461, CVE-2025-38464, CVE-2025-38477, CVE-2025-38498, CVE-2025-38527, CVE-2025-38556, CVE-2025-38566, CVE-2025-38571, CVE-2025-38678, CVE-2025-38718, CVE-2025-38724, CVE-2025-39697, CVE-2025-39718, CVE-2025-39730, CVE-2025-39810, CVE-2025-39817, CVE-2025-39825, CVE-2025-39841, CVE-2025-39849, CVE-2025-39864, CVE-2025-39880, CVE-2025-39883, CVE-2025-39885, CVE-2025-39898, CVE-2025-39911, CVE-2025-39913, CVE-2025-39923, CVE-2025-39945, CVE-2025-39949, CVE-2025-39953, CVE-2025-39955, CVE-2025-39964, CVE-2025-39967, CVE-2025-39968, CVE-2025-39969, CVE-2025-39970, CVE-2025-39971, CVE-2025-39972, CVE-2025-39973, CVE-2025-39980, CVE-2025-39993, CVE-2025-39994, CVE-2025-39996, CVE-2025-39998, CVE-2025-40001, CVE-2025-40006, CVE-2025-40011, CVE-2025-40018, CVE-2025-40019, CVE-2025-40020, CVE-2025-40021, CVE-2025-40022, CVE-2025-40026, CVE-2025-40027, CVE-2025-40030, CVE-2025-40035, CVE-2025-40042, CVE-2025-40044, CVE-2025-40048, CVE-2025-40049, CVE-2025-40053, CVE-2025-40055, CVE-2025-40070, CVE-2025-40078, CVE-2025-40081, CVE-2025-40085, CVE-2025-40087, CVE-2025-40092, CVE-2025-40094, CVE-2025-40105, CVE-2025-40109, CVE-2025-40111, CVE-2025-40115, CVE-2025-40118, CVE-2025-40120, CVE-2025-40121, CVE-2025-40125, CVE-2025-40134, CVE-2025-40140, CVE-2025-40153, CVE-2025-40154, CVE-2025-40167, CVE-2025-40171, CVE-2025-40173, CVE-2025-40178, CVE-2025-40179, CVE-2025-40183, CVE-2025-40186, CVE-2025-40187, CVE-2025-40190, CVE-2025-40194, CVE-2025-40197, CVE-2025-40200, CVE-2025-40204, CVE-2025-40205, CVE-2025-40215, CVE-2025-40248, CVE-2025-40250, CVE-2025-40258, CVE-2025-40271, CVE-2025-40280, CVE-2025-40300, CVE-2025-40778, CVE-2025-45582, CVE-2025-47273, CVE-2025-48060, CVE-2025-48964, CVE-2025-49794, CVE-2025-49796, CVE-2025-49812, CVE-2025-49844, CVE-2025-50106, CVE-2025-53057, CVE-2025-53066, CVE-2025-53905, CVE-2025-53906, CVE-2025-54389, CVE-2025-54574, CVE-2025-58060, CVE-2025-58098, CVE-2025-58364, CVE-2025-58436, CVE-2025-61662, CVE-2025-61726, CVE-2025-61728, CVE-2025-61729, CVE-2025-61732, CVE-2025-61915, CVE-2025-61984, CVE-2025-61985, CVE-2025-62168, CVE-2025-64720, CVE-2025-65018, CVE-2025-65082, CVE-2025-66199, CVE-2025-66200, CVE-2025-66293, CVE-2025-66418, CVE-2025-66471, CVE-2025-67873, CVE-2025-68114, CVE-2025-68121, CVE-2025-68160, CVE-2025-68209, CVE-2025-68615, CVE-2025-68973, CVE-2025-69418, CVE-2025-69419, CVE-2025-69420, CVE-2025-69421, CVE-2026-0719, CVE-2026-0865, CVE-2026-1519, CVE-2026-1761, CVE-2026-1933, CVE-2026-2291, CVE-2026-2340, CVE-2026-3012, CVE-2026-3039, CVE-2026-3497, CVE-2026-3832, CVE-2026-3833, CVE-2026-4046, CVE-2026-4111, CVE-2026-4408, CVE-2026-4424, CVE-2026-4437, CVE-2026-4438, CVE-2026-4480, CVE-2026-4519, CVE-2026-4786, CVE-2026-4878, CVE-2026-4890, CVE-2026-4891, CVE-2026-4892, CVE-2026-4893, CVE-2026-5119, CVE-2026-5121, CVE-2026-5260, CVE-2026-5419, CVE-2026-5450, CVE-2026-5946, CVE-2026-6100, CVE-2026-6893, CVE-2026-7383, CVE-2026-9076, CVE-2026-9256, CVE-2026-21441, CVE-2026-21710, CVE-2026-22695, CVE-2026-22795, CVE-2026-22796, CVE-2026-22801, CVE-2026-23479, CVE-2026-23631, CVE-2026-25243, CVE-2026-25646, CVE-2026-25749, CVE-2026-26996, CVE-2026-27135, CVE-2026-27651, CVE-2026-27654, CVE-2026-27784, CVE-2026-27904, CVE-2026-28390, CVE-2026-28417, CVE-2026-28421, CVE-2026-28780, CVE-2026-28847, CVE-2026-28883, CVE-2026-28901, CVE-2026-28902, CVE-2026-28903, CVE-2026-28904, CVE-2026-28905, CVE-2026-28907, CVE-2026-28942, CVE-2026-28946, CVE-2026-28947, CVE-2026-28953, CVE-2026-28955, CVE-2026-28958, CVE-2026-29111, CVE-2026-29518, CVE-2026-31431, CVE-2026-32647, CVE-2026-32748, CVE-2026-33007, CVE-2026-33278, CVE-2026-33412, CVE-2026-33416, CVE-2026-33526, CVE-2026-33636, CVE-2026-33845, CVE-2026-33846, CVE-2026-33857, CVE-2026-34032, CVE-2026-34059, CVE-2026-34180, CVE-2026-34181, CVE-2026-34182, CVE-2026-34183, CVE-2026-34982, CVE-2026-35177, CVE-2026-35385, CVE-2026-35386, CVE-2026-35387, CVE-2026-35388, CVE-2026-35414, CVE-2026-35535, CVE-2026-37555, CVE-2026-39979, CVE-2026-40164, CVE-2026-40170, CVE-2026-40355, CVE-2026-40356, CVE-2026-40460, CVE-2026-40622, CVE-2026-40701, CVE-2026-41035, CVE-2026-41242, CVE-2026-41292, CVE-2026-41411, CVE-2026-42009, CVE-2026-42010, CVE-2026-42011, CVE-2026-42012, CVE-2026-42013, CVE-2026-42014, CVE-2026-42015, CVE-2026-42534, CVE-2026-42764, CVE-2026-42766, CVE-2026-42767, CVE-2026-42768, CVE-2026-42769, CVE-2026-42770, CVE-2026-42926, CVE-2026-42934, CVE-2026-42944, CVE-2026-42945, CVE-2026-42946, CVE-2026-42959, CVE-2026-43284, CVE-2026-43500, CVE-2026-43618, CVE-2026-43658, CVE-2026-43660, CVE-2026-44390, CVE-2026-44431, CVE-2026-44432, CVE-2026-44673, CVE-2026-45186, CVE-2026-45445, CVE-2026-45446, CVE-2026-45447, CVE-2026-46300, CVE-2026-46333.
------
- **The following issues have been addressed and delivered to increase the overall security posture of the SSR:** I95-65017, I95-65018, I95-65021, I95-65026, I95-65030, I95-65033, I95-65039, I95-65054, I95-65055, I95-65080, I95-65205, I95-65210, I95-65211, I95-65217, I95-65219, I95-65221, I95-65225, I95-65226, I95-65228, I95-65236, I95-65237, I95-65238, I95-65239, I95-65247, I95-65249, I95-65297, I95-65677.
------
- **I95-58007 Add ability to set PIM graceful restart-time:** The `routing default-instance pim restart-time` command has been added to allow users to define the number of seconds that the PIM protocol will perform `graceful-restart` after a node failure. This resolution addresses all the listed issues. For more information, see [PIM Graceful Restart Timer](config_multicast.md#pim-graceful-restart-timer). This also addresses I95-57702, I95-57906, I95-60637, and I95-60731.
------
- **I95-60545 Attempting network interface lookup with invalid ID:** Resolved an issue where errors due to an invalid ID were flooding the logs. Error logs in highway regarding a failed interface lookup for an invalid interface are now suppressed.
------
- **I95-60719 BGP routes take ~70 seconds to be withdrawn:** Resolved an issue where BGP route withdrawal after a WAN interface failure took approximately 70 seconds, causing extended multicast traffic outages during failover scenarios.
------
- **I95-60799 Tenant prefix use within a VRF:** The SSR allows the configuration of tenant-prefixes without giving an error, and correctly handles interfaces with tenant-prefixes within the protocol code.
------
- **I95-60912 PIM and PIMv6 cannot be enabled on the same interface:** Resolved an issue where enabling both PIM (IPv4) and PIMv6 on the same interface was not possible, preventing dual-stack multicast configurations.
------
- **I95-61058 Peer paths fail when additional IPs are added to a WAN interface:** Resolved a case where adding a second address for use in nat-pools to a peering interface caused continuous bfd peer flaps. The SSR now handles address changes when the local IP address changes.
------
- **I95-61075 BGP does not re-establish after firewall failover:** Resolved an issue where when initiating a BFD for BGP session, the cached MAC to IP mapping was being used. If the MAC address had changed, stale information was used and the BFD session would not be established. We now issue an ARP request to get the latest MAC Address.
------
- **I95-61580 CLI does not prompt for required router restart:** Resolved an issue where making a configuration change requiring a restart only generates a warning only for the router that the PCLI is running on. Committing a configuration change that requires a restart now results in a warning even when the change is on a different router.
------
- **I95-61588 Console access failures post-migration:** Resolved an issue where a lower baud rate was being used by the serial console, resulting in unreadable output. The check and enforcement for the 115200 baud rate has been improved.
------
- **I95-62011 Stats from adjacency traffic engineering throw an exception when a hostname is used:** Resolved an issue where dynamic reconfiguration when adding neighbors/adjacencies that use an FQDN and have adjacency Traffic Engineering enabled, caused the device interface to reach a failure state.
------
- **I95-62071 Multicast Traffic contributing to service area resource contention:** Resolved an issue when an mroute has no outgoing interfaces. A Detour Path is now used instead of NoServicePaths to prevent resource contention.
------
- **I95-62179 Software Lifecycle History not up to date:** Resolved an issue where the software lifecycle page was not showing any history, or in some cases, the history was outdated. Internal functionality has been updated, and both the GUI and CLI outputs now show the correct information.
------
- **I95-62258 Packet steered to egress non-existent interface causes highway crash:** Added logic to capture the errant packet and prevent the crash. An exception is logged so that the issue can be more easily rectified.
------
- **I95-62343 Routers disconnecting from the Conductor while still successfully routing traffic:** Resolved an issue where Salt gets stuck with a bad network connection. Added new functionality to the `minion-watchdog` service which will restart the `salt-minion` if there is a salt job stuck for over an hour.
------
- **I95-62369 Session error record shows 0s for session-id:** Resolved an issue where the session record information was incomplete. The SSR now also uses the redundancy session data to gather records.
------
- **I95-62421 DHCP relay failures causing clients to miss IP assignment:** Resolved an issue where DHCP session information is lost on the hub, causing the session reverse flow to collide with the forward flow of the session initiated originally from the spoke. This includes a new (configurable) default behavior for collision resolution. For detailed information, see [`configure authority service-policy prefer-established-session {true | false}`](config_command_guide.md#configure-authority-service-policy-prefer-established-session). 
------
- **I95-62580 Conflicting network interface names slowing application traffic:** Resolved an issue in the app summary tracking logic related to conflicting network interface names for non-redundant ports of an HA router.
------
- **I95-62631 Race condition for multiple dhcp servers startup:** Resolved and issue where the multiple DHCP server config change from single DHCP server to multiple DHCP servers under the same device interface would stop working. Updates have been made to the monitoring script to identify the changes and prevent the issue.
------
- **I95-62668 Routers disconnected following conductor upgrade:** Resolved an issue where SSH keys were erroneously written to the `authorized-keys` file. 
------
- **I95-62695 Management interface placed in incorrect zone during conductor onboarding:** Resolved an issue where an earlier change did not put the management infterface in the t128 zone. 
------
- **I95-62703 Highway process crashed when BGP over SVR is activated:** Resolved an issue where the unicast code path was incorrectly calling the multicast code path causing a highway crash.
------
- **I95-62710 Unnecessary web server processing for `router all` in the PCLI:** Addressed a problem where the web server performed unnecessary work when PCLI commands referenced `router all`. This optimization reduces overhead and improves responsiveness.
------
- **I95-62742 Cannot see sync errors for nodes that are stuck synchronizing:** Resolved an issue where errors in `show assets` disappeared when the synchronizing state retries. 
------
- **I95-62758 BGP Establishment Taking Incorrect Path Over GRE:** Resolved an issue where BGP SYN packets were sent over the wrong GRE tunnel instead of using the direct path, causing BGP to establish over an unintended interface.
------
- **I95-62772 Add details to `show peers certificate` output:** The `show peers certificate` output no longer just shows PEM file output; the data has been rendered in a more friendly format.
------
- **I95-62859 Duplicate alarms created for duplicate asset IDs:** Resolved an issue where the Conductor created a duplicate asset ID alarm each time an asset with a duplicate ID tried to authenticate.
------
- **I95-62860 Web server connection limit not enforced:** Resolved an issue where the 250 maximum connection limit was not being properly enforced by the web server.
------
- **I95-62956 Configuration failure due to service definition expecting subnet mask:** Resolved an issue where the Anti-Virus and IDP configuration expected a subnet mask as part of the Service Address. The subnet mask has been added.
------
- **I95-62957 Configuration failure due to invalid name:** Anti-Virus and IDP do not allow policy names using a dot (.). This has been resolved — configurations will use an underscore for policy name creation.
------
- **I95-62982 SSR limits the number of supported network-interfaces:** Resolved an issue where the limit on the number of network-interfaces was low. Improved implementation of data structure storing network-interface objects, resulting in an increase of 7x the current capacity.
------
- **I95-63018 Memory corruption after reading VSA:** Resolved a rare issue where in remote authentication through a RADIUS server, `pam_radius` was causing memory corruption after a Vendor Specific Attribute (VSA) is read.
------
- **I95-63033 `show lte detail` crash when LTE apn-name is invalid:** Resolved an issue where executing `show lte detail` when an invalid APN name is configured caused a CLI crash due to an unhandled dictionary update error.
------
- **I95-63035 Antivirus warning when missing tenant for AV traffic:** Resolved an issue where an antivirus alert was incorrectly raised on the passive node in an HA system, indicating AV was not active.
------
- **I95-63174 IDP `Critical` profile not applied:** Resolved an issue where setting the IDP policy/profile to `Critical` was not properly applied on IDP. With this fix, profile changes to `Critical` now take effect as expected.
------
- **I95-63190 Router intermittently disconnects from conductor:** Resolved an issue where process errors were filling the buffer queue, dropping messages, and causing node disconnections from the Conductor.
------
- **I95-63195 Highway Crash During ESKM Session Scaling:** Resolved an issue where the highway process could crash during high session scaling due to incorrect metadata propagation in ESKM encrypt/decrypt contexts.
------
- **I95-63228 Premature route installation complete notification:** In some cases a premature internal notification that the route installation was complete was being transmitted, causing the Graceful Restart process to terminate early. This issue has been resolved.
------
- **I95-63288 automatedProvisioner Crash on Conductor Shutdown:** Resolved an issue where the automatedProvisioner process could crash during shutdown due to ZooKeeper watcher callbacks firing during object destruction.
------
- **I95-63295 Highway crash when `show fib` is executed on very large FIB:** Resolved an issue where a time intensive operation on a large entry was preventing other threads from accessing data and causing a crash.
------
- **I95-63299 Keys signed with ECDSA do not work with Enhanced Security Key Management:** Resolved an issue where ECC-based keys fail during the validation process, because the SSR was using hardcoded SHA256 for its signature validation checking. This issue has been resolved.
------
- **I95-63324 Duplicate static DHCP addresses cause crashes:** Added validation steps to identify and prevent duplicate MAC addresses for the static address assignment.
------
- **I95-63330 Repeated interface flaps on vSSR led to crash in highway process:** Truncated packets are validated prior to processing, preventing a crash.
------
- **I95-63355 Node-level security controls for serial console and USB:** Restored support for configuring node-level security features that disable serial console output and USB boot/mass storage (for example, settings such as `serial-console-enabled` and `usb-mass-storage-enabled`). This allows users to reapply hardened platform settings where supported.
------
- **I95-63422 Factory reset routers not re-onboarding when ESKM enabled:** Resolved an issue where if ESKM was initially started using invalid certificate on one node, it would be unable to onboard until the remote peering relationship is restarted.
------
- **I95-63462 Conductor monitoring fails when one HA node is down:** Resolved an issue where conductor UI monitoring calls at the router level failed when one node in an HA pair was down, even though node-level queries succeeded.
------
- **I95-63554 Stale sessions causing site-to-site communication issues:** Resolved an issue where stuck or stale sessions interrupted site-to-site communication in hub-and-spoke topologies.
------
- **I95-63590 Repeated interface flaps leading to highway coredumps:** Truncated packets are now validated prior to processing, preventing a crash. An exception is logged so that the issue can be more easily rectified.
------
- **I95-63664 Salt packages incorrectly downgraded:** Resolved an issue where salt downgraded a package if the highest available version of a package was lower than the currently installed version of that package.
------
- **I95-63673 Peer Paths `no paths` text fix:** Resolved a styling issue on the web interface where the `no paths` text on the Peer Paths page was not displayed correctly.
------
- **I95-63675 Node page in the GUI appears to load indefinitely:** Resolved an issue where the GUI Node page would load infinitely.
------
- **I95-63676 Waypoints fail to allocate when the `service-path peer next-hop gateway` is off the subnet:** Resolved an issue where the first network-interface IP was selected as the local IP for waypoint allocation, even if that IP is not a valid waypoint. 
------
- **I95-63729 Asset state not accurately reported in conductor:** Resolved an issue where issue where the SSH authorized keys from one HA conductor node were deleted after restarting both HA conductor nodes.
------
- **I95-63794 `show lte detail` error handling for invalid APN configuration:** Resolved an issue where executing `show lte detail` with an invalid APN configuration caused a `ValueError` crash. The CLI now handles unexpected response formats gracefully.
------
- **I95-63811 IPv6 Service with ICMP Transport Not Routed:** Resolved an issue where PINGv6 sessions were not routed when an IPv6 service was configured with ICMP as the transport protocol. The system now correctly remaps ICMP to ICMPv6 for IPv6 service prefixes.
------
- **I95-63839 SNMP walk failures on Conductors onboarding to NMS:** Resolved an issue where SNMP walks on Conductors could fail with a `genError`, preventing successful onboarding into some network management systems. System MIB walks on Conductors now complete successfully; IF-MIB is no longer exposed on Conductors where it is not supported.
------
- **I95-63873 DHCP leases not showing in Conductor UI:** Resolved an issue where attempting to retrieve DHCP v4 leases via the Conductor UI for a specific router results in `no leases found`. Also resolved an issue where viewing a router Logs page via the Conductor UI displayed ALL logs rather than using the selected time range.
------
- **I95-63876 Route Flapping and Inaccessibility:** Resolved an issue where routes would flap or become inaccessible in hub-and-spoke topologies with inter-hub steering preferences configured, causing intermittent connectivity failures.
------
- **I95-63895 SSR sending packets larger than configured MTU:** Resolved an issue where the SSR was sending packets larger than the configured MTU (e.g., 1518 bytes instead of 1500), causing packet drops on downstream network elements.
------
- **I95-63913 Session-source incorrect in BFD pinhole:** Resolved an issue where session-source was incorrectly set to public when a BFD pinhole also happened to be a flow-move scenario.
------
- **I95-63923 Redundant conductor fails to upgrade:** Resolved an issue where a minion disconnects from the conductor node and never attempts to reconnect. The minion watchdog process now restarts the salt minion if it is not connected to all conductor nodes.
------
- **I95-63943 Edge-case crash when changing from regular services to app-id:** Resolved an issue where a system that never had app-id services or had app-id services, reverted them and restarted the highway process; and then modified an existing service to use app-id caused a crash. Protections have been added to safeguard against this edge case. 
------
- **I95-63951 BGP Graceful Restart Sending EOR Prematurely:** Resolved an issue where the SSR sent End-of-RIB (EOR) markers prematurely during BGP graceful restart, without waiting to receive EOR from its peers as required by RFC 4724, potentially causing route convergence issues.
------
- **I95-63965 SNMP MIB subinterfaces not reporting correct stats:** Resolved an issue where SNMP MIB walks on subinterfaces were not reporting correct statistics, causing inaccurate monitoring data in network management systems.
------
- **I95-63970 Highway crash due to null app-id service reference:** Resolved a rare highway crash that can occur when an App-ID session is modified at the same time that a module or configuration update is occurring.
------
- **I95-63996 LTE is not wiped with factory reset:** Resolved an issue where performing a factory reset did not clear the LTE configuration, allowing the router to reconnect using the previous LTE connection without a configured WAN interface.
------
- **I95-64052 Software History Missing Rollback and Revert Events:** Resolved an issue where the software lifecycle history in the GUI only displayed upgrades and did not show rollback or revert operations.
------
- **I95-64054 Highway Crash with ESKM Jumbo Packets:** Resolved an issue where the highway process could crash with a null pointer dereference when processing jumbo packets with ESKM due to an uninitialized encryption context.
------
- **I95-64061 Azure kernel hung task after upgrade:** Resolved an issue where Azure VMs could experience a kernel hung task condition related to the `uio_hv_generic` driver after upgrading.
------
- **I95-64063 Salt Minion restarting every minute when one Conductor is Unreachable:** Resolved an issue where the Salt Minion restarted once per minute whenever one conductor in a two-conductor deployment was unreachable, causing repeated instability in the management plane connection.
------
- **I95-64104 Software History Not Showing Downgrades:** Resolved an issue where software downgrade operations were not displayed in the software lifecycle history UI.
------
- **I95-64150 User-defined SNMP metrics not working:** Resolved an issue where custom SNMP metric MIBs were not functioning correctly after upgrading, preventing SNMP-based polling systems from collecting metrics.
------
- **I95-64152 Conductor connectivity blocked by stale SSH control sockets:** Resolved a condition where, after a router reboot (particularly following an unclean shutdown), the router could remain **Disconnected** in the Conductor due to stale SSH control sockets. The SSH coordination logic now cleans up stale control sockets automatically, restoring Conductor–router connectivity.
------
- **I95-64218 Conductor upgrade failed with health check failure:** Resolved an issue where an upgrade of a redundant conductor could fail with a `System Processes Check` health check failure during the HA upgrade process.
------
- **I95-64250 BGP routes received but not installed in RIB:** Resolved an issue where BGP routes were received from peers but not installed in the BGP table or the routing information base (RIB), preventing traffic from using those routes.
------
- **I95-64291 NAT keep-alive statistics not accurately reported:** Resolved an issue where NAT keep-alive packets were not being sent at the expected interval, resulting in incorrect statistics and session flow verification failures.
------
- **I95-64306 Optimize ICMP probe profile update on config change:** Resolved an issue where configuration changes that contained no actual ICMP probe modifications still triggered a full restart of all ICMP probes, causing unnecessary overhead and brief monitoring gaps.
------
- **I95-64389 SSR440-2AC HA Port Not Working:** Resolved an issue where the HA synchronization port on SSR440-2AC hardware did not function because Linux was auto-creating wired connection profiles that interfered with the HA interface configuration.
------
- **I95-64411 IPv6 BGP route-map `set ipv6 next-hop peer-address` support:** Added support for the `set ipv6 next-hop peer-address` directive in route-maps, which is required for IPv6 WAN assurance deployments.
------
- **I95-64434 IDP bypass `alert` policy not working:** Resolved an issue where setting the IDP bypass policy to `alert` mode was not functioning correctly, preventing traffic from being properly inspected and alerts issued.
------
- **I95-64448 Metrics retrieval failing for node1 when HA is down:** Resolved an issue where empty data was returned when HA links were down. Peer node system metrics (CPU, memory, disk) now return an error response instead of silently returning empty data.
------
- **I95-64464 Slow Initial Router Onboarding to Conductor:** Resolved an issue where router onboarding to the conductor was slow, causing assets to remain stuck in a synchronizing state for extended periods before reaching the synchronized state.
------
- **I95-64479 Invalid application WEBEX not recognized:** Resolved an issue where the WEBEX application was not being recognized by the application identification module after an upgrade, resulting in `invalid application` events and missing FIB entries for the associated service.
------
- **I95-64541 Node disconnection during upgrade:** Resolved an issue where upgrading HA router nodes could result in one node entering a disconnected state with stale SSH control sockets, while the other node became stuck in the upgrading state, requiring a manual reboot to recover.
------
- **I95-64542 Highway crash during service path refresh:** Resolved a highway crash that occurred during service path load-balanced route refresh operations. Protections have been added to prevent the crash.
------
- **I95-64549 Onboarding routers cannot install salt packages:** Resolved an issue where routers being onboarded to a conductor could not install the required salt packages, preventing successful onboarding completion.
------
- **I95-64567 SSR router status Disconnected on Conductor:** Resolved an issue where configuring a loopback address on a router node caused the router to become Disconnected from the Conductor due to incorrect source NAT behavior on internal sessions.
------
- **I95-64575 Unable to login to SSR routers from conductor in cloud deployment:** Resolved an issue where the SSH configuration on cloud-deployed routers disabled password authentication, preventing login from the conductor.
------
- **I95-64595 Excessive audit log severity:** Adjusted the log severity for the audit log event collector to better match expected operational conditions and reduce unnecessary log noise.
------
- **I95-64603 Chronyd requires manual restart after reboot:** Resolved an issue where all NTP servers appeared as rejected after a reboot, requiring a manual restart of chronyd to restore time synchronization.
------
- **I95-64619 Config validation rejects DHCP network-interface when VRRP is present:** Resolved an issue where configuration validation incorrectly rejected DHCP-enabled network-interfaces when VRRP was configured on the same interface, even if VRRP was not enabled.
------
- **I95-64684 HMAC cipher mode information in logs and session output:** Added HMAC mode and cipher information to session logs and `show sessions` output, improving visibility into the encryption parameters used for active sessions.
------
- **I95-64688 Highway coredumps causing peer path flaps:** Resolved an issue where highway process coredumps were occurring, resulting in peer path flaps.
------
- **I95-64696 Salt connectivity issues after Conductor upgrade:** Resolved an issue where salt-minion lost connectivity to the salt-master after a Conductor upgrade, affecting approximately 20% of routers. The minion-connector service now correctly manages the salt master address.
------
- **I95-64709 BGP stale-routes-time and Selection Deferral Timer alignment:** Resolved an issue where the `stale-routes-time` parameter behavior did not properly align with RFC 4724's Selection_Deferral_Timer semantics, potentially causing premature route selection during graceful restart.
------
- **I95-64811 Highway crash causing session drops:** Resolved a highway process crash that occurred under specific traffic conditions, resulting in session drops and temporary traffic disruption.
------
- **I95-64829 Device disconnected from Mist and stopped processing sessions:** Resolved an issue where a device could disconnect from Mist and stop processing sessions after a configuration push, requiring a power cycle to recover.
------
- **I95-64835 Remove UI checkbox for Rollback on Failure during Conductor migration:** Removed the erroneous `Rollback on Failure` checkbox from the Conductor migration UI, as the underlying feature was never implemented. This prevents user confusion during migration operations.
------
- **I95-64876 Intermittent application issues due to child service design:** Resolved an issue where hierarchical service configurations with child services could intermittently fail to match traffic correctly, causing application connectivity issues.
------
- **I95-64877 Changes to guard against L7 security stack crash:** Resolved an issue where the IDP attack database was lost on reboot. The database is now stored persistently, and additional safeguards have been added for AV engine health checks, SSL certificate staging retries, and error code accuracy.
------
- **I95-64929 Peer certificate expiration time unit conversion error:** Resolved an issue where a seconds-to-milliseconds conversion error caused premature peer certificate expiration.
------
- **I95-64977 Certificate ingestion ignores expiry and revocation validation:** Resolved an issue where ingesting a certificate did not properly validate its expiry date or revocation status, allowing expired or revoked certificates to be accepted.
------
- **I95-64978 Highway crash on head-end router causing interface flaps:** Resolved an issue where a race condition on session classification fields (such as domain name, URI, and application classification) could cause the highway process to crash with a core dump, resulting in interface flaps. Access to these fields is now properly synchronized.
------
- **I95-65056 `show app-id cache-sizes` command not found:** Resolved an issue where the `show app-id cache-sizes` command was missing from the CLI, preventing users from inspecting application identification cache utilization.
------
- **I95-65075 Process Crash During Configuration Processing:** Resolved an issue where an uncaught exception during configuration processing could cause a process abort when looking up node identifiers in the endpoint manager.
------
- **I95-65099 Traffic engineering stats displaying incorrect output:** Resolved an issue where `show stats traffic-eng internal-application per-traffic-class` displayed incorrect or unexpected output.
------
- **I95-65128 nodeMonitor crash loop on hub node:** Resolved an issue where the nodeMonitor process entered a continuous crash loop on hub nodes during conductor-based Hub-and-Spoke setup, preventing the hub from becoming operational.
------
- **I95-65129 Peer Path Up Using Mixed Certificates:** Resolved an issue where peer paths could come up using certificates from different issuers (default Juniper certificate on one side and a custom CA-signed certificate on the other), even with a custom trusted CA configured.
------
- **I95-65171 TSI Download Missing File Extension:** Resolved an issue where Tech Support Info (TSI) bundles downloaded from the SSR Web UI had no file extension, preventing extraction with standard archive tools. Tech support files downloaded from the web UI now have the correct `.zip` extension.
------
- **I95-65296 ESKM peering failures with fragmentation:** Resolved an issue where ESKM peering connections failed when packet fragmentation occurred on the path between peers, preventing secure peer relationships from establishing.
------
- **I95-65314 Sessions Not Switching to Available Source NAT IPs:** Resolved an issue where a source NAT database corruption and race condition prevented sessions from switching to additional available IP addresses on a WAN interface, causing packet drops.
------
- **I95-65337 Missing FIB Entries After Router Migration:** Resolved an issue where FIB entries were missing after migrating WAN interfaces from one router to another using the same IP addresses. The system now correctly detects new peers and triggers path addition for peers that are already up.
------
- **I95-65340 DHCP Relay Failure After Adding New Tenant on HA Topology:** Resolved an issue where adding a new tenant as an allowed policy to a DHCP relay service on an HA topology did not function correctly.
------
- **I95-65352 Bootstrap Configuration Symlink Protection Extended:** Resolved an issue where the bootstrap.json symlink attack protection was not applied to an additional route introduced in later software versions.
------
- **I95-65354 Missing dependencies in offline ISO:** Resolved an issue where certain package dependencies were missing from the offline ISO, preventing successful package installation in air-gapped environments.
------
- **I95-65365 PCLI Command to Trigger GARP:** A new PCLI command has been added to manually trigger Gratuitous ARP (GARP) on VRRP interfaces, accepting device and network-interface as arguments.
------
- **I95-65366 Maximum GARP interval for VRRP:** Added a configurable `maximum-garp-interval` parameter for VRRP, allowing control over how frequently gratuitous ARP messages are sent during VRRP state transitions. This prevents excessive ARP traffic in environments with many VRRP instances.
------
- **I95-65392 Hierarchical services ping traffic failure between sites:** Resolved an issue where ICMP ping traffic between specific sites failed when using hierarchical service configurations with application identification groups.
------
- **I95-65403 Disallow CA certificates from being used for peering:** Added validation to prevent CA certificates (those with `CA:True` in basic constraints) from being used as peering certificates, which would cause unexpected trust chain behavior.
------
- **I95-65410 Incorrect RBAC requirements for certificate API:** Resolved an issue where the POST `/api/v1/certificate` endpoint required READ permission for the entire configuration instead of WRITE permission, allowing unintended access.
------
- **I95-65431 SSR failing to sync with NTP server:** Resolved an issue where the SSR failed to synchronize with configured NTP servers after boot, requiring manual intervention to restore time synchronization.
------
- **I95-65432 Conflux process crash during upgrade:** Resolved an issue where the Conflux process exited unexpectedly during or after an upgrade, causing temporary loss of analytics data collection.
------
- **I95-65439 CRL in certificate not taken into account:** Resolved an issue where the CRL distribution point embedded in a certificate was not being used for revocation checking, requiring manual CRL configuration on the conductor.
------
- **I95-65455 Network Manager interface preventing HA sync:** Resolved an issue where a spurious "Wired Connection" entry in Network Manager could prevent HA sync interfaces from obtaining IP addresses after an upgrade.
------
- **I95-65486 Highway crash during upgrade from older versions:** Resolved a highway crash that could occur during router upgrades from significantly older software versions (e.g., 5.5.x to 7.x).
------
- **I95-65535 Assets Stuck in Synchronizing State:** Resolved an issue where assets could become stuck in a synchronizing state for extended periods (up to 24 hours) due to overly aggressive watchdog timer defaults. The default timer settings have been relaxed.
------
- **I95-65545 Incorrect Fragmentation Stats Table Name:** Resolved an issue where the PCLI displayed an incorrect table name ("Non-Fabric IPv6 Fragmented Packets" instead of "Non-Fabric IPv4 Fragmented Packets") for IPv4 fragmentation statistics.
------
- **I95-65557 Highway Crash During Show Commands on HA Router:** Resolved an issue where issuing show commands on an HA router could cause a highway crash on both nodes due to FIB table contention. FIB table operations are now batched to prevent mutex lock errors.
------
- **I95-65635 Source NAT Port Exhaustion on Loopback Interface:** Resolved an issue where a large number of `SourceNatPortException` errors for the local KNI interface caused SSH connection failures to the SSR loopback IP. Host-type service routes no longer use the KNI IPv6 control interface for source NAT.
------
- **I95-65656 Conductor upgrade fails on health check:** Resolved an issue where conductor upgrades could fail due to a health check timeout, preventing the upgrade from completing successfully.
------
- **I95-65680 RoutingManager Not Running on HA Headend Router:** Resolved an issue where the routingManager could remain in STANDBY after a session interruption, leaving the router without an active routing process (loss of BGP/routing connectivity) until restarted.
------
- **I95-65754 Highway Crash on Shutdown Due to Static Sessions:** Resolved an issue where the highway process crashed during shutdown on HA nodes performing a downgrade. Static sessions were not being cleared during the shutdown sequence, causing a use-after-free condition when session destructors ran after the worker thread pool had already been destroyed. Static sessions are now properly cleared alongside the session table during shutdown, preventing the crash.
------
- **I95-65797 ESKM Peering Stays Down After Late Metadata Key:** Resolved an issue where ESKM peering remained down when BFD received the local metadata key late because retransmit timers were not being restarted after their initial firing.
------
- **I95-65850 Redundant conductor fails upgrade:** Resolved an issue where runtime RPM upgrades of the minion-connector on SSR400-series platforms failed to start due to missing IMA file signatures, resulting in loss of conductor connectivity.
------
- **WAN-4440 Config error validation for DHCP:** Added configuration error validation for DHCP at the inspector level to catch and report invalid DHCP configurations before they are applied.
------
- **WAN-4466 LTE interface incorrect graphing and interface behavior:** Resolved an issue where LTE interfaces with no signal were incorrectly reporting RX traffic in interface graphs, despite the WAN path being down and the SIM card not being connected to the carrier network.

## Release 7.0.1-1r1

:::important
**7.0.1 Conductor Upgrades**

If you are upgrading a conductor that is currently installed with version 6.3.4 or lower, and you wish to upgrade to version 7.0.1 or higher, you must first upgrade the conductor to any version of the 6.3.x software, including and higher than 6.3.5. 

Routers running SSR software versions earlier than 6.3.5 cannot connect to conductors running SSR software version 7.0.1 and higher. A transitional step is required to enable routers running versions earlier than 6.3.5 (6.0.x, 6.1.x, 6.2.x, 6.3.4 and lower) to communicate with a conductor running 7.0.1+. 

1. Upgrade the conductor to any version of the 6.3.x software, including and higher than 6.3.5.
2. Upon completion of the install, allow all managed routers to connect and reach the **Synchronized** state. 
  The new keying requirements that are part of 6.3.5+ are loaded onto the routers during synchronization. These are required for routers to communicate with a 7.0.1+ conductor. If the routers do not reach the synchronized state, those routers will not be able to communicate with the 7.0.1+ conductor.
3. Once the routers are synchronized, you may upgrade the conductor to 7.0.1. All synchronized routers, regardless of version, will be able to communicate with the upgraded conductor. The routers are not required to upgrade to 7.0.1 or to 6.3.5.

If your conductor is currently running SSR version 6.3.5+, you may upgrade to 7.0.1 normally.
:::

:::note
SSR-OS support for the team interface has been removed in 7.0.1. There are two significant impacts with this change:

- If you have a conductor deployed with an L3 hop on the HA interface, update your static route to point to the parent interface. The exception to this is if the interface is configured as `non-forwarding shared`. 
- The HA Sync Redundancy Plugin is not supported on 7.0.
:::

**Release Date:** October 14, 2025

:::warning
An issue has been identified involving the use of the HA Sync Redundancy Plugin with SSR 7.0.1, which prevents proper functioning of the plugin. If you use the HA Plugin in your SSR deployment, it is not advised to upgrade at this time. The issue is being investigated and will be resolved in a future release.
::: 

### New Features

- **I95-22432 Conductor Management over IPv6:** All router to conductor communication along with management protocols (ssh, radius, syslog, snmp, web gui/api) now support IPv6. However in an IPv6 managed node, devices must be running the same IP version. For example, in an IPv6 HA configuration, both Conductors must be running IPv6. 
------
- **I95-29382 Enhanced Security Key Management:** Introduces a new peer-to-peer, certificate-based key exchange mechanism to the SVR protocol. This key exchange avoids mid-network re-encryption and provides the ability to rotate keys as required. The security rekeying mechanism is configured at the Authority, and requires that all routers and conductors be running the same version of software that supports this capability. The existing security key exchange mechanisms continue to exist and will be supported during the transition to the new model. The two security approaches cannot coexist at the same time within an authority. See [Enhanced Security Key Management](sec_enhanced_key_mgmt.md) for more information.
------
- **I95-52924 NIC Driver FEC Support:** Support has been added to configure optical FEC for SFPs.
------
- **I95-53993 Display LLDP Neighbors:** A CLI command to output neighbors discovered through LLDP has been added.
------
- **I95-55574 Events Sync Improvements:** In the event of broken communication between HA nodes, each node provides access to one hour of peer events leading up to the disconnection. This is reduced from the full history of events to lower storage needs and expedite restoration and troubleshooting. 
------
- **I95-57305 Add flow timeout value to Associated Paths:** The Associated Paths window accessed from the Session view of the SSR GUI now displays a Flow Timeout column, providing a way to determine when the session will expire following inactivity. 
------
- **I95-57454 Management traffic over SVR (in-band management):** Router to Conductor communication is supported over SVR with the use of [rekey](sec_enhanced_key_mgmt.md#peer-key-and-key-rotation).
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
- **I95-59634 Allow Highway lockup detection to be disabled:** Added a `local.init` override for disabling datapath lockup detector mechanism
```
  "datapath": {
    "lockupDetectionEnabled": true/false
  },
```
------
- **I95-59758 Interactive Initializer updates all system account passwords:** Interactive initialization now changes the `admin`, `t128` and `root` user passwords to the same value. The initialization preference file has the fields, `t128-password`, `root-password`, and `admin-password`, to set password hashes for each user, respectively.
------
- **I95-59819 SEIM Syslog Integration:** The SSR provides Syslog integration with Security Event and Incident Management (SEIM) platforms for aggregating and analyzing security events across vendors and devices. For more information see [SEIM Syslog Integration](sec-config-seim-syslog.md).
------
- **I95-59996 GUI Initialization sets passwords for all system accounts:** GUI initialization now changes the `admin`, `t128` and `root` user passwords to the same value. See [Password Security](config_password_security.md) for additional information. 
------
- **I95-60041 `initialize conductor` command sets password for all system accounts:** The system accounts `admin`, `t128` and `root` are simultaneously set to the provided password hash, ensuring default passwords are not used.
------
- **I95-60220 SSR OS Upgrade:** SSR OS distribution has been upgraded to a customized upstream Linux distribution.
------
- **WAN-2284 Critical IDP Profile:** A new **Critical** attack list profile that is more lightweight has been added to reduce the commit/policy change times. 

### Resolved Issues

- **The following CVEs have been identified and resolved in this release:** CVE-2023-4527, CVE-2023-4806, CVE-2023-4813, CVE-2023-4911, CVE-2024-3651, CVE-2024-24806, CVE-2024-56171, CVE-2025-24928, CVE-2024-6232, CVE-2024-11187, CVE-2024-1737, CVE-2024-1975, CVE-2024-56326, CVE-2024-3596, CVE-2024-37370, CVE-2024-37371, CVE-2025-24528, CVE-2023-46846, CVE-2024-45802, CVE-2024-12085, CVE-2023-48161, CVE-2024-21208, CVE-2024-21210, CVE-2024-21217, CVE-2024-21235, CVE-2022-1304, CVE-2023-26604, CVE-2025-27363, CVE-2025-0624, CVE-2024-55549, CVE-2025-24855, CVE-2024-7347, CVE-2025-23419, CVE-2025-21587, CVE-2025-30691, CVE-2025-30698, CVE-2016-9840, CVE-2024-12718, CVE-2025-4138, CVE-2025-4330, CVE-2025-4435, CVE-2025-4517, CVE-2025-32462, CVE-2025-4802, CVE-2025-5702, CVE-2025-6020, CVE-2025-47268, CVE-2025-25724, CVE-2025-3576, CVE-2025-49794, CVE-2025-49796, CVE-2025-6021, CVE-2023-26916, CVE-2025-47273, CVE-2024-23337, CVE-2025-48060, CVE-2023-52572, CVE-2023-52621, CVE-2023-52757, CVE-2024-26686, CVE-2024-26739, CVE-2024-26952, CVE-2024-27402, CVE-2024-35790, CVE-2024-35866, CVE-2024-35867, CVE-2024-35943, CVE-2024-36350, CVE-2024-36357, CVE-2024-36908, CVE-2024-38540, CVE-2024-38541, CVE-2024-42160, CVE-2024-42322, CVE-2024-44938, CVE-2024-46742, CVE-2024-46751, CVE-2024-46774, CVE-2024-46784, CVE-2024-46816, CVE-2024-49960, CVE-2024-49989, CVE-2024-50047, CVE-2024-50125, CVE-2024-50258, CVE-2024-50272, CVE-2024-50280, CVE-2024-53128, CVE-2024-53185, CVE-2024-53203, CVE-2024-54458, CVE-2024-56551, CVE-2024-56599, CVE-2024-56655, CVE-2024-56658, CVE-2024-56751, CVE-2025-21681, CVE-2025-21839, CVE-2025-21853, CVE-2025-22027, CVE-2025-22062, CVE-2025-23140, CVE-2025-23142, CVE-2025-23144, CVE-2025-23145, CVE-2025-23146, CVE-2025-23147, CVE-2025-23148, CVE-2025-23150, CVE-2025-23151, CVE-2025-23156, CVE-2025-23157, CVE-2025-23158, CVE-2025-23159, CVE-2025-23161, CVE-2025-23163, CVE-2025-37738, CVE-2025-37739, CVE-2025-37740, CVE-2025-37741, CVE-2025-37742, CVE-2025-37749, CVE-2025-37752, CVE-2025-37756, CVE-2025-37757, CVE-2025-37758, CVE-2025-37765, CVE-2025-37766, CVE-2025-37767, CVE-2025-37768, CVE-2025-37770, CVE-2025-37771, CVE-2025-37773, CVE-2025-37780, CVE-2025-37781, CVE-2025-37787, CVE-2025-37788, CVE-2025-37789, CVE-2025-37790, CVE-2025-37792, CVE-2025-37794, CVE-2025-37796, CVE-2025-37797, CVE-2025-37803, CVE-2025-37805, CVE-2025-37808, CVE-2025-37810, CVE-2025-37812, CVE-2025-37817, CVE-2025-37819, CVE-2025-37823, CVE-2025-37824, CVE-2025-37829, CVE-2025-37830, CVE-2025-37836, CVE-2025-37838, CVE-2025-37839, CVE-2025-37840, CVE-2025-37841, CVE-2025-37844, CVE-2025-37850, CVE-2025-37857, CVE-2025-37858, CVE-2025-37859, CVE-2025-37862, CVE-2025-37867, CVE-2025-37875, CVE-2025-37881, CVE-2025-37883, CVE-2025-37885, CVE-2025-37890, CVE-2025-37892, CVE-2025-37905, CVE-2025-37909, CVE-2025-37911, CVE-2025-37913, CVE-2025-37914, CVE-2025-37915, CVE-2025-37923, CVE-2025-37927, CVE-2025-37929, CVE-2025-37930, CVE-2025-37940, CVE-2025-37949, CVE-2025-37967, CVE-2025-37969, CVE-2025-37970, CVE-2025-37982, CVE-2025-37983, CVE-2025-37985, CVE-2025-37989, CVE-2025-37990, CVE-2025-37991, CVE-2025-37992, CVE-2025-37994, CVE-2025-37995, CVE-2025-37997, CVE-2025-37998, CVE-2025-38005, CVE-2025-38009, CVE-2025-38023, CVE-2025-38024, CVE-2025-38031, CVE-2025-38089, CVE-2025-32462, CVE-2025-7425, CVE-2025-32414, CVE-2025-32415, CVE-2025-27151, CVE-2025-32023, CVE-2025-48367, CVE-2025-49133, CVE-2025-6965, CVE-2025-5222, CVE-2025-4373, CVE-2024-52533, CVE-2024-6174, CVE-2025-5994, CVE-2025-40909, CVE-2024-52615, CVE-2022-29458, CVE-2024-47081, CVE-2025-8058, CVE-2025-5914, CVE-2025-54389, CVE-2025-7425, CVE-2025-8194.
------
- **I95-39653 Negative duration in session table after applying filter:** Resolved an issue where applying a filter to the session table resulted in sessions displaying a negative duration.
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
------
- **I95-57508 `icmp-probe-manager` not running:** When an HA interface becomes non-redundant (reconfigured as non-HA), state updates were not showing on the active-interface path. This led to the icmp-probe-manager not running. This issue has been resolved.
------
- **I95-57584 IGMP ingress packets not being accepted after defining tenant prefixes on LAN subnet:** Resolved an issue when using `tenant-prefix` on the interface, all PIM/IGMP messages were blocked. This issue has been resolved. In addition, the ability to only allow igmp messages sent from specific source-addresses has been added. For more information, see [`source-address-prefix-list`](config_command_guide.md#configure-authority-router-routing-igmp-interface-source-address-prefix-list)
------
- **I95-58017 `show fib` output incomplete on routers:** Resolved an issue with `show fib` stalling and not returning complete data where the next hop entries are in excess of 200. The `show fib` output now correctly handles larger output. 
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
- **I95-59521 Local Config Override not working in the GUI:** Added support for the local configuration override mode to the GUI. For more information, see [Local Configuration Override](howto_local_config_override.md#using-the-gui).
------
- **I95-59676 Alarm when default passwords are not changed:** An alarm has been added to detect when default password hashes are detected for standard system users. It is highly recommended that all system user passwords be updated to a secure password as soon as possible.
------
- **I95-59745 Routers are stuck in the connected state and not transitioning to running:** Resolved an issue where the router repeatedly sent the same incorrect values to the config during startup, resulting in a race condition. 
------
- **I95-59758 Interactive Initializer updates all system account passwords:** Interactive initialization now changes the `admin`, `t128` and `root` user passwords to the same value. The initialization preference file has the fields, `t128-password`, `root-password`, and `admin-password`, to set password hashes for each user, respectively.
------
- **I95-59860 Incorrect timestamps shown on IDP startup:** The `Engine started` and `Last Commit` timestamps have been updated to provide accurate readings when the engine has not yet started, or the values are not available.
------
- **I95-60038 `show fib` lookup fails for IPv6 addresses:** Parsing IPv6 addresses was not performed properly, resulting in an invalid query. The code has been updated to properly parse the request before processing.
------
- **I95-60180 Installation screen displays incorrect SSR OS:** After the OS rebranding to SSR OS, the option to install erroneously shows on the install screen. This has been removed.
------
- **I95-60282 Disk space usage growing to more than 90%:** DNF logs were increasing in size and not being rotated, causing a significant increase in size. A `logrotate` configuration file for DNF has been added to limit the size of DNF log files to prevent them from filling the hard drive. When this fix is installed on the conductor, it is automatically propagated to all managed routers. 
------
- **I95-60287 Add option to disable Kernel Metric SLA Calculation:** In rare cases on a heavily loaded system, the kernel metric calculation process can sometimes hang for a period of time, causing an internal watchdog to fire. This results in a system restart. Setting `routing default-instance > service-metric-use-lsa > false` will prevent the kernel flap that causes this issue. See [`service-metric-use-lsa`](config_command_guide.md#configure-authority-router-routing-service-metric-use-sla) for additional information.
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
- **I95-60593, I95-60686 Unable to onboard 6.2.3 routers to 6.3.3:** Resolved an issue where assets would transition to `Reinitializing` and get stuck there because the asset was unable to successfully complete highstate. Validations have been added to ensure the asset completes highstate successfully before transitioning to `Reinitializing`.
------
- **I95-60647 Migrate command not forcing a router re-sync:** Resolved an issue where a router is successfully migrated from one conductor to another conductor and establishes connectivity, but does not apply the configuration from the new conductor until a commit is performed.
------
- **I95-60651 SSR upgrade from 6.3.0 to 6.3.3 reboots back to 6.3.0:** Resolved an issue where the Conductor was unable to upgrade router packages to the latest version even though the packages were available on the Conductor. A `dnf refresh` now runs to ensure package accessibility. 
------
- **I95-60688 Password change upon first login throws error message:** Resolved an issue that prevented users from changing their password on the secondary node of an HA pair. This would happen with both an expired password, or upon first login. 
------
- **I95-60730 Multicast stream is not recovering after failover:** Resolved an issue where an HA node does not recover after failover. The error handling method has been updated to use the global interface ID rather than the local interface ID when running the multicast incoming interface check.
------
- **I95-60741 KNI no longer passes traffic when it is operationally down, preventing IPSec from functioning:** Resolved an issue with the KNI interface that prevented transmit-through even when the interface is operationally down.
------
- **I95-60747 TANK thread failure:** Resolved a rare issue where exceptions in the TANK response handling logic resulted in data missing from the GUI and PCLI. This issue has been resolved. 
------
- **I95-60750 Password Confirmation missing:** When onboarding an SSR using the web interface, users are now required to confirm the password change.
------
- **I95-60765 Application module does not clear previous entries:** Resolved an issue where if a module has services configured, using the REST API to send the clear command to delete those services from the module does not work. The list may appear empty, but the services still persist on the module. This issue has been resolved and the services list is now cleared properly. 
------
- **I95-60767 `service-route > next-hop` validation rejects configuration:** Resolved an issue where the rule validator did not consider the service application-type as DNS proxy during the configuration rule validation. This issue has been resolved.
------
- **I95-60768 Rare race condition between packet processing and configuration update:** Resolved a rare race condition where invalid memory was accessed during packet processing if the configuration was being loaded at the same time.
------
- **I95-60924 Adopt command error message is misleading:** Resolved an issue where username/password login failures are not clear. The `adopt` PCLI command now interactively prompts for `mist-instance` if it is not specified on the command line. This helps avoid confusion when trying to associate using username/password which fails if connecting to the wrong instance. Also resolved a related issue that prevented adopting using a Mist account with Multi Factor Authentication (MFA/2FA) enabled.
------
- **I95-60948 RADIUS secret length limited to 16 characters:** The RADIUS secret size was erroneously set to 16 octets. The allowable RADIUS secret size has been updated from 1 to 255.
------
- **I95-60960 The PIM RP moved from the base instance to a VRF after a reboot:** When PIM RPs are configured in different VRF, upon reboot the PIM RP could appear in the wrong VRF. This issue has been resolved by generating the VRF explicitly when configuring Multicast routing.  
------
- **I95-61024 Pagination issues when performing `show events`:** Resolved an issue where `show events` fails to produce multiple pages.
------
- **I95-61058 Peer paths fail when additional IPs are added to a WAN interface:** Resolved a case where adding a second address for use in nat-pools to a peering interface caused continuous bfd peer flaps. The SSR now handles address changes when the local IP address changes.
------
- **I95-61075 BGP does not re-establish after firewall failover:** Resolved an issue where when initiating a BFD for BGP session, the cached MAC to IP mapping was being used. If the MAC address had changed, stale information was used and the BFD session would not be established. We now issue an ARP request to get the latest MAC Address.
------
- **I95-61085 Highway crash after incorrectly adding an IP address for a Multicast service:** Resolved an issue where a packet reached the router and matched a FIB without a service association, i.e. a FIB created for multicast traffic. The SSR will now drop a packet for a summary service if it matches a FIB without an associated service. 
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
- **I95-61567 LLDP neighbors shown as from the same port:** Resolved an issue that when LLDP was enabled on a bond interface, the LLDP neighbor for each member was shown coming from the same physical port. When LLDP is enabled on a bond device-interface, each member interface will now properly send an LLDP frame. 
------
- **I95-61579 Highway crashes when executing command `show device-interface name <name> registers` on an i40e network port:** Resolved an issue with the `registers` sub option that caused the crash on the i40e network port. The sub option has been removed. 
------
- **I95-61580 CLI does not prompt for required router restart:** Resolved an issue where making a configuration change requiring a restart only generates a warning only for the router that the PCLI is running on. Committing a configuration change that requires a restart now results in a warning even when the change is on a different router.
------
- **I95-61866 Unnecessary events sync:** Resolved an issue where data is unintentionally sync'ed between HA nodes. 
------
- **I95-61998 Empty username and password fields fails validation:** Resolved an issue with empty username and password fields prevented the parser from handling the data correctly. 
------
- **I95-61999 ATT SIM card MNC code update:** Resolved an issue with the ATT SIM card using an unexpected MNC code.
------
- **I95-62283 Enhance keypress detection logic:** Resolved an issue that during ISO installation, pressing any key during the install countdown reduced the the remaining countdown. This issue has been resolved. 
------
- **I95-62291 Conductor minion watchdog may incorrectly restart the minion:** Updated the `128T-minion-watchdog` package to version 2.0 which does not restart the salt-minion if it has an active connection to 1/2 conductor nodes in an HA conductor.

### Caveats

- **I95-62830 Asset may not synchronize on both conductor nodes:** Due to a change in the Salt watchdog process, an asset may not sync automatically to both conductor nodes in an HA conductor configuration after upgrading to 7.0.1. If you encounter this behavior, restarting the salt minion will resolve this issue. This a display issue and the asset has been properly provisioned by the conductor if the state is Synchronized on one of the conductors. 
------
- **I95-62836 IDP Engine failed to start up on the SSR1500 after upgrade to 7.0.1:** In 7.0.1, the default allocations used by the SSR are not sufficient to launch the security engine on the SSR1500 preventing IDP, AV, and other security features from functioning. If you are using these features on an SSR1500, it is not recommended to upgrade to 7.0.1 at this time.
------
- **WAN-4457 Incorrect VPN Peer path state reported in `oc-stats`:** Peer path stats are not reported correctly from the device. This issue has been identified and resolved in a separate WAN Assurance plugin release, 3.100.1. This plugin will be generally available after the SSR 7.0.1 release, and should be manually installed to resolve the peer path stats issue. 

