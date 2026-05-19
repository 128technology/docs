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
After installing / upgrading to SSR 7.1.3, downgrading *to an earlier version* of SSR software where Configuration Integrity (CI) is not available is NOT supported. 

Rollback to the previously installed version of software *is* supported.  
:::

:::warning
An issue has been identified involving the use of the HA Sync Redundancy Plugin with SSR 7.0.0, which prevents proper functioning of the plugin. If you use the HA Plugin in your SSR deployment, it is not advised to upgrade at this time. The issue is being investigated and will be resolved in a future release.
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

In certain scenarios, existing cloud routers may have been installed from images that did not use LVM for partitions. For these systems, the automatic resizing of disk partitions will fail and they cannot be upgraded. It is suggested to rebuild these instances from the official SSR BYOL image for either [AWS](intro_installation_quickstart_byol_conductor_aws.md) or [Azure](intro_installation_byol_azure_conductor.md).

When the conductor is initially upgraded to an image-based installation, it will be upgraded as a package-based system. This is because the system does not understand how to handle image-based delivery until it is running 6.3 software. Once the conductor is running 6.3 all router upgrades will be treated as image-based upgrades and any subsequent conductor upgrade will be treated as image-based. Therefore, it is possible that issues related to disk usage on conductor may not arise until a subsequent upgrade of the conductor beyond the initial step to 6.3.

**Offline-Mode: Upgrading 6.3.x Conductor Deployments to 6.3.x+**

An issue has been identified that may be observed in conductor deployments running version 6.3.x software, when attempting to upgrade from one 6.3.x patch release to another. This results in the message, “SSR firmware upgrade failed for the local node: SSR upgrade failed after reboot”. To work around this, run `request system software upgrade installation-service` from the command line of the Conductor, after importing the image-based ISO. Once complete, perform the full system upgrade from the Web interface. This issue will be resolved in a future release. 

**Offline-Mode: Onboarding Routers Running older SSR Software to a 6.3.x Conductor**

An issue has been identified when onboarding SSR routers installed with older versions of software (such as 5.4.4) to Conductors running 6.3.x, when running in offline-mode. In some cases, certain software packages are not available to be installed during onboarding. To work around this issue, import the **package-based** (the "128T" prefixed) ISO for the current conductor version onto the conductor. This provides the necessary software packages to complete the onboarding process. This issue will be resolved in a future release. 

## Release 7.2.0-10r1 

**Beta Release Date:** May 21, 2026

### New Features

- **Adaptive PMTU Change Handling for Long-Lived Sessions:** The SSR performs Path MTU Discovery (PMTUD) along the overlay to determine the correct maximum transmission unit (MTU) for each peer path. Devices in the underlay may report an ICMP Destination Unreachable / Fragmentation Needed (type 3, code 4) error to indicate they could not forward a packet due to an undersized MTU. With 7.2.0, the SSR updates the affected overlay flow and generates a corrected packet toward the original packet sender, allowing the sender to adjust its segment size. The flow which was traversed to trigger the response from the underlay is now updated to use the new updated MTU. For more information, see [Path MTU Discovery](config_pmtu.md).
------
- **I95-61066  Simplified Interface Naming:** Removed the platform restriction (SSR400/SSR440 only) that prevented the ability to configure forwarding device-interfaces via Linux `interface-name`. `interface-name` can now be used as a device identifier on all physical and virtual SSR platforms for  both forwarding and non-forwarding interfaces, enabling stable, name-based NIC configuration for cloud VMs, bare-metal servers, and purpose-built hardware alike.
------
- **I95-61467 Show filtered-routes in `show bgp` output:** When an inbound BGP policy rejects prefixes received from a neighbor, those routes do not appear in the BGP table or the FIB. The `filtered-routes` option exposes exactly which prefixes were suppressed by the inbound policy for a given neighbor, making it straightforward to troubleshoot why expected routes are absent from the routing table. For more information, see [Viewing Filtered BGP Routes](config_bgp.md#viewing-filtered-bgp-routes).
------
- **I95-64645 Certificate Management - CSR Improvements:** Starting in SSR 7.2.0, the peering identity can be carried in a Subject Alternative Name (SAN) URI extension instead of the Common Name (CN). This is especially useful in **HA deployments**, where both nodes in a router share the same `peering-common-name` but enterprise PKI policies require unique CNs per certificate. See [Enhanced Security Key Management — API Naming Rules](sec_enhanced_key_mgmt.md#peering-identity-via-subject-alternative-name-uri) for details.
------
- **I95-64845 Add Missing Audit Events for Certificate APIs:** Addes several audit events and logs for certificate activity. See [Audit Events and Logging](sec-cert-based-encrypt.md#audit-eventslogging) for additional information.
