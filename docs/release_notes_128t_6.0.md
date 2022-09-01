---
title: SSR 6.0 Release Notes
sidebar_label: '6.0'
---
:::info
Issues resolved in a release are merged into subsequent releases chronologically AND numerically.

If you do not see an issue listed below, it may have been resolved in another recently released version. A link to the Release Notes for the most recent chronological release of SSR Software is provided.

Alternatively, refer to the **[List of Releases](about_releases.mdx)** page for release dates and links to all SSR Release Notes; or, if you know the Issue ID Number, enter that into the Search field at the top right of this page.
:::

### Upgrade Considerations

:::important
Before upgrading please review the [**Upgrade Considerations**](intro_upgrade_considerations.md) and the [**Rolling Back Software**](intro_rollback.md) pages. Several modifications have been made to the process for verifying configurations, which will impact existing configurations.
:::

- **I95-43243/IN-460 Upgrade and Rollback:** Upgrading or rolling back a system (conductor peer or router) with the interactive installer `install128t`, that is managed by a conductor may result in the system becoming unresponsive. It is highly recommended that upgrades be performed through the conductor UI. Manual upgrades and rollbacks may not be resilient to failures. See [Rolling Back Software](intro_rollback.md) for more information on these operations.
------
- **I95-42452 Conductor Upgrade Time:** Upgrades to version 5.4 and above can take up to 40 minutes due to the number of rpms being upgraded. Please plan accordingly.
------
- **I95-42624 Upgrade Installer:** Before **upgrading to, or installing** version 5.4 and above, update the Installer to at least version 3.1.0. Failing to upgrade the installer may result in a rollback failure, should a rollback be necessary at any time. The Installer typically prompts you update when a new version is available. Select **Update** when prompted.
------
- **Plugin Upgrades:** If you are running with plugins, updates are required for some plugins **before** upgrading the conductor to SSR version 5.4.0 or higher. Please review the [Plugin Configuration Generation Changes](intro_upgrade_considerations.md#plugin-configuration-generation-changes) for additional information.  

## Release 6.0.4-4

**Release Date:** September 9, 2022

### New Features


- **I95-35571 Enhanced Syslog:** Beginning with Version 6.0.4, the SSR can be configured to send system generated events over a secure TLS or TCP connection to a remote-logging server for analysis and storage. For more information, see [Secure Syslog Transport](config_audit_event.md#secure-syslog-transport)
------ 
- **I95-44533 Intrusion Detection and Prevention:** Using the Juniper IDP Signature Database, IDP is now available on the SSR and on Mist-managed devices. For detailed information, see [Intrusion Detection and Prevention](concepts_ssr_idp.md)
------
- **I95-47418 Audit Events for Plugins:** A new audit event has been added that tracks when a plugin is installed or uninstalled. This can be viewed on the Audit History page in the GUI or in the PCLI by running `show events type admin.plugin`.

### Resolved Issues

- **The following CVE's have been addressed and resolved:** I95-45054, I95-45060, I95-45165, I95-47485. 
------
- **I95-45094 Unnecessary rotation of salt minion config:** Resolved an issue where the global.init and salt minion config are unnecessarily rotated and updated with no changes to the actual contents of the file.
------
- **I95-45583 HA Connection lost during commit:** Resolved an issue where session was missing necessary path data information relating to the peer path.
------
- **I95-46281 Update Kernel to RHCK 8.6:** Updated the kernel to integrate the latest security fixes.
------
- **I95-46807 Validation not catching when a router does not have an icmp-probe-profile or reachability-profile configured:** This issue has been resolved.
------
- **I95-46918 GUI and PCLI out of sync when new configuration elements added/modified:** Resolved an issue where `show network-interface` and `show config` were not updating properly.
------
- **I95-46919 LDAP Users Not Shown in GUI Users Display:** Updated username requirements and the ability to identify issues with usernames not meeting those requirements. See [Username and Password Policies](config_password_policies.md) for username requirements.
------
- **I95-47314 Ping command has high session timeout:** The ICMP sessions for ping command will now use the correct timeout of 5 seconds.
------
- **I95-47336 Running config change events are missing:** Resolved an issue where running config events under a different username were filtered out. 
------
- **I95-47421 Quad Zero Tenant-Prefix Doesn't Get Applied in the Router:** Resolved an issue where the source lookup from global tenant took precedence over the local tenant.
------
- **I95-47537/I95-47556 Synchronize writing to files to avoid a race condition:** Added a common file lock to synchronize writes.
------
- **I95-47655 BGP issues with VRRP:** VRRP failover may cause routing to not function if internal device numbering is not consistent across the redundant nodes.

## Release 6.0.2-8

**Release Date:** August 16, 2022

### Resolved Issues

- **I95-47578 NIC ports incorrectly named:** Resolved an issue where systems installing SSR software version 6.0.1-12 using the ISO or IBU image resulted in the SSR120 and SSR130 NIC ports being named incorrectly. 

## Release 6.0.1-12

**Release Date:** August 15, 2022

### New Features

- **I95-46387 New Service Route Type for BGP over SVR:** Added a new service route type that indicates to the Routing Agent that local service routes and BGP over SVR routes should be merged together when creating local balanced paths.
------
- **I95-47077 Configuration options for User Accounts:** Added configuration options for number of login attempts before locking user account, and number of seconds that user account will be locked before being able to attempt to login again. For information, see [Password Policies](config_password_policies.md).
------
- **I95-47136/MIST-62741 Settings for WAN Link Speed and Duplex (Mist-managed):** With this update, the auto-negotiation, disable, and speed/duplex settings are visible in Mist.

### Resolved Issues

- **I95-38408 DHCP server on wrong vlan sends offer in response to discover message:** Hosted DHCP servers that do not have an explicit vlan configured are now explicitly treated as vlan 0, and handle any DHCP packets that are untagged/vlan 0, in order to prevent those packets from being multicasted to multiple DHCP servers.
------
- **I95-44434 Peer metric sends IP of WAN interface instead of the expected string:** Logic has been added to show the available destination address.
------
- **I95-46056 `show ntp` has no output from PCLI, even though NTP is configured:** The output of `show ntp` now reports IP addresses of the time servers rather than resolve hostnames.
------
- **I95-46545 Conductor Validation passing when a URL is configured in a Parent Service:** Validation for application-identification has been updated to include URL and subcategory. 
------
- **I95-46684 Image-based Installer / Interactive Installer:** `intialize128t` now runs automatically on first boot when using the image-based 6.0 installation with Interactive Install selected.
------
- **I95-46931 Hardware using ConnectX6-DX fails to initialize:** Added support for this card variant.
------
- **I95-46959 PPPoE over VLAN not working when target interface is down:** Added code to bring up the parent interface before VLAN interface.
------
- **I95-47111 Issues with redundant interfaces on startup:** Resolved an issue where the notifications for active interfaces may get lost when using VRRP for redundancy.
------
- **I95-47129 Metadata is not disabled after flow-move for EoSVR sessions:** Added a metadata turnoff after session failover for EoSVR.
------
- **I95-47336 Running configuration change events are missing:** Updates have been made to include `username` in the running configuration change events log. 

### Caveats

- **I95-47390 Inline BFD Collisions:** BFD peering between two router fails when one of the peer has a DHCP interface and has external NAT configured on neighborhood. This will occur in AWS deployments. This issue will be addressed in an future release. 

## Release 6.0.0-56

**Release Date:** July 18, 2022

### New Features

- **I95-35794 IP TTL Handling:** The SSR's handling of SVR traffic can be configured to adjust the TTL value on hops between SSR routers. This adjustment can prevent situations where the TTL expires on packets flowing through multiple hops and then out to the Internet to their final destination. For more information, see [TTL Handling](concepts_machine_communication.md#ttl-handling).
------
- **I95-36916 IPv6/v4 Dual Stack Operation:** Dual Stack operation is now fully supported.
------
- **I95-40373 Appliance Image-based Installation:** An image-based ISO installation process has been implemented for users who manage their network using the Mist Cloud. For a full description of this feature, see [Image-Based Installation](intro_installation_image.md).
------ 
- **I95-44267 NIST FIPS Validated Cryptography:** FIPS Enforcement Mode has been added to both the new image-based and existing package-based installation processes. See [Image-Based Installation](intro_installation_image.md#installation) for FIPS activation steps as part of the image-based installation. Refer to [FIPS Enforcement Mode](intro_installation_bootable_media.md#fips-enforcement-mode) for details using the legacy package-based installation.
------
- **I95-44870 Mist Self-Registration and Onboarding:** Onboarding a Mist Managed SSR instance can be accomplished as part of the installation process. For details, refer to the steps to [Associate the Router with Mist](intro_installation_image.md#associate-the-router-with-mist) as part of the image-based installation. 
------
- **I95-46747 Improved the Password user experience:** You now are re-prompted up to three times for the current password if it is incorrect. If a new password does not meet the strength check, you are prompted with that information, and required to update the password.

### Resolved Issues

- **I95-44375 ICMPv6 Neighbor Solicitations are not responded to in IPv4/v6 Dual Stack:** Resolved an issue with Neighbor solicitation processing in a Dual Stack configuration. 
------
- **I95-44548 Application Summary Sort Order:** Resolved an issue with the Application Summary sort order changing unintentionally.
------
- **I95-45478 Segmentation Fault in the Dynamic Peer Update process:** Resolved an issue with multi-threaded access to a data member, leading to a segmentation fault. 
------
- **I95-45890 Service paths for BGP over SVR routes are not being rebuilt:** Resolved an issue when the vector configuration is changed on a network interface, the service paths for BGP over SVR routes are not being rebuilt. 
------
- **I95-46411 PPPoE over VLAN interface status missing in `show` commands:** Added atttribute to show the missing information.
------
- **I95-46822 Revertible failover traffic not restored when reverse traffic is present:** For a "revertible-failover" service policy, when the preferred path is restored and a session no longer traverses an internode dogleg path, it was taking several seconds for traffic to be restored when forward traffic is present; in situations where only reverse traffic is present, traffic may not be restored. This issue has been resolved.
------
- **I95-46826 Carrier detection logic not recognizing disaster recovery modem:** Updated the carrier detection logic to properly recognize the carrier when a modem is attached to a disaster recovery cell tower.
------
- **WAN-1191 - Incorrect interface Port Mapping for Silicom Madrid supported platforms:** This update corrects the port mappings. It is recommended that the latest image be used for all image-based installs. For information about Image-based installs and where to download the latest ISO, please refer to [Image-Based Installation](intro_installation_image.md).

### Caveats

- **I95-46684 Image-based Installer / Interactive Installer:** When using the image-based 6.0 installation, be aware that if Interactive Install is selected, `intialize128t` does not launch automatically on first boot. This must be run manually; log in to the console as root using the default credentials, and type `initialize128t` to perform interactive initialization. This will be resolved in a future release.
------
- **I95-47095/MIST-66000 LAN Redundancy breaks WAN Redundancy (Mist-managed):** If you need to convert a LAN or WAN interface from non-redundant to redundant or from redundant to non-redundant, the affected nodes must be restarted.
------
- **MIST-65629 Traffic Shaping (SSR Only) option not available (Mist-managed):** Traffic engineering may not be properly enabled in a high availability configuration for Mist-managed SSR's. This issue is under investigation.
------
- **MIST-65945 SSR does not support Second BGP neighbor (Mist-managed):** More than one BGP neighbor is not currently supported via the “Add BGP Neighbors” GUI button for Mist-managed SSR's. Multiple neighbors however can be added via the BGP configuration tab. 






