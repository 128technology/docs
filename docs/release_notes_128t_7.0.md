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

In certain scenarios, existing cloud routers may have been installed from images that did not use LVM for partitions. For these systems, the automatic resizing of disk partitions will fail and they cannot be upgraded. It is suggested to rebuild these instances from the official [SSR BYOL](intro_installation_quickstart_byol_conductor_aws.md) image.

When the conductor is initially upgraded to an image-based installation, it will be upgraded as a package-based system. This is because the system does not understand how to handle image-based delivery until it is running 6.3 software. Once the conductor is running 6.3 all router upgrades will be treated as image-based upgrades and any subsequent conductor upgrade will be treated as image-based. Therefore, it is possible that issues related to disk usage on conductor may not arise until a subsequent upgrade of the conductor beyond the initial step to 6.3.

**Offline-Mode: Upgrading 6.3.x Conductor Deployments to 6.3.x+**

An issue has been identified that may be observed in conductor deployments running version 6.3.x software, when attempting to upgrade from one 6.3.x patch release to another. This results in the message, “SSR firmware upgrade failed for the local node: SSR upgrade failed after reboot”. To work around this, run `request system software upgrade installation-service` from the command line of the Conductor, after importing the image-based ISO. Once complete, perform the full system upgrade from the Web-interface. This issue will be resolved in a future release. 

**Offline-Mode: Onboarding Routers Running older SSR Software to a 6.3.x Conductor**

We have identified an issue when onboarding SSR routers installed with older versions of software (such as 5.4.4) to Conductors running 6.3.x, when running in offline-mode. In some cases, certain software packages are not available to be installed during onboarding. To work around this issue, import the **package-based** (the "128T" prefixed) ISO for the current conductor version onto the conductor. This provides the necessary software packages to complete the onboarding process. This issue will be resolved in a future release. 

## Release 7.0.0-63r1

**Release Date:** July 10, 2025

### New Features

- **I95-22432 Conductor Management over IPv6:** All router to conductor communication along with management protocols (ssh, radius, syslog, snmp, web gui/api) now support IPv6. However in an IPv6 managed node, devices must be running the same IP version. For example, in an IPv6 HA configuration, both Conductors must be running IPv6. 
------
- **I95-29382 Zero-Trust Network Architecture for SVR:** Introduces a new peer-to-peer, certificate-based key exchange mechanism to the SVR protocol. This key exchange avoids mid-network re-encryption and provides the ability to rotate keys as required. The security rekeying mechanism is configured at the Authority, and requires that all routers and conductors be running the same version of software that supports this capability. The existing security key exchange mechanisms continue to exist and will be supported during the transition to the new model. The two security approaches cannot coexist at the same time within an authority. See [CSVR Zero Trust Network Architecture](svr-ztna.md) for more information.
------
- **I95-52924 NIC Driver FEC Support:** Support has been added to configure optical FEC for SFPs.
------
- **I95-53993 Display LLDP Neighbors:** A CLI command to output neighbors discovered through LLDP has been added.
------
- **I95-57454 Management traffic over SVR (in-band management):** Router to Conductor communication is supported over SVR with the use of [rekey](svr-ztna.md#peer-key-and-key-rotation).
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
| Denied due to Local Service Definition | The session was allowed on another ingress router, but is denied here based on the rules of this router (relates to hierarchical services). |
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
------
- **WAN-3834 Remove Private AS for BGP Neighbor:**

### Resolved Issues
