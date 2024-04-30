---
title: SSR 6.3 Release Notes
sidebar_label: '6.3'
---
:::info
Issues resolved in a release are merged into subsequent releases chronologically AND lexicographically. 

If you do not see an issue listed below, it may have been resolved in another recently released version. A link to the Release Notes for the most recent chronological release of SSR Software is provided.

Alternatively, refer to the **[List of Releases](about_releases.mdx)** page for release dates and links to all SSR Release Notes; or, if you know the Issue ID Number, enter that into the Search field at the top right of this page.
:::

### Upgrade Considerations

:::important
Before upgrading please review the [**Upgrade Considerations**](intro_upgrade_considerations.md) and the [**Rolling Back Software**](intro_rollback.md) pages. Several modifications have been made to the process for verifying configurations, which will impact existing configurations.
:::

- **I95-43243/IN-460 Upgrade and Rollback:** Upgrading or rolling back a system (conductor peer or router) with the interactive installer `install128t`, that is managed by a conductor may result in the system becoming unresponsive. It is recommended that upgrades be performed through the conductor UI. Manual upgrades and rollbacks may not be resilient to failures. See [Rolling Back Software](intro_rollback.md) for more information on these operations.
------
- **I95-42542 Conductor Upgrade Time:** Upgrades can take up to 40 minutes due to the number of rpms being upgraded. Please plan accordingly.
------
- **I95-42624 Upgrade Installer:** Before **upgrading to, or installing** version 5.4 and above, update the Installer to at least version 3.1.0. Failing to upgrade the installer may result in a rollback failure, should a rollback be necessary at any time. The Installer typically prompts you update when a new version is available. Select **Update** when prompted.
------
- **Plugin Upgrades:** If you are running with plugins, updates are required for some plugins **before** upgrading the conductor to SSR version 5.4.0 or higher. Please review the [Plugin Configuration Generation Changes](intro_upgrade_considerations.md#plugin-configuration-generation-changes) for additional information.

## Release 6.3.0-

**Release Date:** May 10, 2024

### New Features

- **I95-23304 Dynamic Source NAT:** Dynamic Source NAT translates multiple source IP addresses into a smaller pool of translated addresses and dynamic ports, which conserves public IP address space and provides the flexibility to source NAT a specific IP range. This supports scaling up sessions for an internal service. For more information, see [Dynamic NAT](config_dnat.md).
------
- **I95-23816 Network Interface Traffic Engineering:** Network interface traffic engineering allows you to impose limitations on all traffic egressing a specific network-interface. For more information about using and configuring network interface traffic engineering, see [Network Interface Traffic Engineering](config_te_net_intf.md).
------
- **I95-41264 Metrics and Application ID Improvements:** Steps have been taken to reduce system resource consumption for HA metrics and application identification, specifically when HA nodes are disconnected. In this situation visibility into the peer's data will be limited to the time of disconnection, and the peer history will not be available. When HA nodes are connected there is no difference in behavior. 
------
- **I95-47041 Selection of Mist Cloud during Adoption:** The onboarding process queries all Mist Instances and provides a drop down selector to allow login to the appropriate Mist instance (Global01, Global03, EU, etc.).
------
- **I95-47154 Conductor-management of image-based SSR devices:** The Image-based ISO now supports conductor managed deployments. For information about the universal ISO and imaged-based installation, see [SSR Universal ISO Installation]. 
------
- **I95-48255 BYOL SSR images for AWS and Azure marketplaces:** Concerns with CVEs have been addressed and the SSR images are again available on AWS and Azure.
------
- **I95-50572 Unified ISO for Mist and Conductor Onboarding:** A single, image-based ISO is the preferred method of installation for all SSR deployments. This new ISO greatly simplifies the software installation process and onboarding of routers to both the Mist-managed and Conductor-managed environments. For information about the install and onboarding process, refer to [SSR Universal ISO Installation].
------
- **I95-51303 Offline Documentation available upon installation:** The SSR documentation site is now installed as a snapshot at the time of release, and run as a web server on the SSR router and conductor installations. This makes the full documentation site availble from within a network that does not have internet access. To access the documentation, click on the Documentation icon from the GUI after installation. 
------
- **I95-51501 Use of the physical MAC address for VRRP:** The command [`use-physical-address`](config_command_guide.md#configure-authority-router-node-device-interface-vrrp-use-physical-address) has been added to the device-interface configuration. This allows VRRP to use the physical MAC rather than the virtual MAC and prevents platforms that reject the virtual MAC from dropping traffic.
------
- **I95-51512 Simplify onboarding of SSR devices in an Air-gapped network:** The image-based ISO is the preferred method of installation for **all** SSR deployments. This new ISO greatly simplifies the software installation process and onboarding of routers to both the Mist-managed and Conductor-managed environments, as well as environments without internet access (air-gap). For information about the install and onboarding process, refer to [SSR Universal ISO Installation].
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
- **I95-54300 Session performance capacity tracking and troubleshooting:** Added Session Performance Metric in Node Health. Session Processing CPU that displays average CPU, with an expandable selection that shows the individual CPU of each of the session processing threads that come from system resource scaling/config.
------
- **I95- 54699 VRRP Redundancy per VLAN:** VRRP can now be configured at the network-interface level. Use the `show network interface` command to display active standby at vlan level, and the `show network-interface redundancy` command to show redundancy status of network-interfaces.
------
- **I95_55388 Dynamic FIB support for Dynamic NAT:** 
------
- **I95-55855 Support the `force up` mode for LACP Bond interfaces:** When enabled, a bond interface that does not receive any LACP PDU's on any member interfaces over a configured time-out period enters the `force up` mode, where one member is used as an active interface sending and receiving without the required LACP negotiation. For more information, see [LACP Bond Interfaces - Force-up](config_lacp.md#force-up)


### Resolved Issues






