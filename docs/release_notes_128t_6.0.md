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

### Caveats

- **I95-40373 Image-based Installer / Interactive Installer:** When using the image-based 6.0 installation, be aware that if Interactive Install is selected, `intialize128t` does not launch automatically on first boot. This must be run manually; log in to the console as root using the default credentials, and type `initialize128t` to perform interactive initialization. This will be resolved in a future release.
------
- **I95-47095/MIST-66000 LAN Redundancy breaks WAN Redundancy (Mist-managed):** If you need to convert a LAN or WAN interface from non-redundant to redundant or from redundant to non-redundant, the affected nodes must be restarted.
------
- **MIST-65629 Traffic Shaping (SSR Only) option not available (Mist-managed):** Traffic engineering may not be properly enabled in a high availability configuration for Mist-managed SSR's. This issue is under investigation.
------
- **MIST-65945 SSR does not support Second BGP neighbor (Mist-managed):** More than one BGP neighbor is not currently supported via the “Add BGP Neighbors” GUI button for Mist-managed SSR's. Multiple neighbors however can be added via the BGP configuration tab. 






