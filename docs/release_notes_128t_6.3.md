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
- **I95-23816 Network Interface Traffic Engineering:** Network interface traffic engineering allows you to impose traffic limitations on all traffic egressing a specific network-interface. For more information about using and configuring network interface traffic engineering, see [Network Interface Traffic Engineering](config_te_net_intf.md).
------
- **I95-41264 Metrics and Application ID Improvements:** Steps have been taken to reduce system resource consumption for HA metrics and application identification, specifically when HA nodes are disconnected. In this situation visibility into the peer's data will be limited to the time of disconnection, and the peer history will not be available. When HA nodes are connected there is no difference in behavior. 
------
- **I95-







