---
title: SSR 5.5 Release Notes
sidebar_label: '5.5'
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
- **I95-42624 Upgrade Installer:** Before **upgrading to, or installing** version 5.4 and above, update the Installer to at least version 3.1.0. Failing to upgrade the installer may result in a rollback failure, should a rollback be necessary at any time.
------
- **Plugin Upgrades:** If you are running with plugins, updates are required for some plugins **before** upgrading the conductor to SSR version 5.4.0 or higher. Please review the [Plugin Configuration Generation Changes](intro_upgrade_considerations.md#plugin-configuration-generation-changes) for additional information.  

## Release 5.5.0-1

**Release Date:** March 4, 2022

### New Features

- **I95-28791 Forward Error Correction:** Forward Error Correction (FEC) adds resiliency against packet loss between two points in the network. Profiles are configured at the authority level and are not traffic-specific, which allows them to be used on any service and any router in the authority. For information about using this feature, please see [Configuring Forward Error Correction](config_forward_error_correction.md).
------
- **I95-37464 WAN Assurance Application Summary:** The Application Summary displays session statistics and information by application, category, and clients. See [Using Application Summary](how_to_use_app_summary.md) for more information. 
------
- **I95-40660 Kernel Upgrade:** The OS kernel has been upgraded to that of CentOS 8.4 to address several CVEs and provide support for Wireguard and the Cordoba platform. 
------
- **I95-41072 Enhanced Web Filtering:** Web Filtering allows administrators to limit or prevent user access to internet content. These limitations may be based on company or organization policies, or because a domain may be know to contain malicious, inappropriate, or dangerous content. Individual services and service policies can be configured on the SSR to allow or deny access to an entire domain category, or specific domains within a category. For more information, see [Web Filtering.](config_domain-based_web_filter.md)
------
- **I95-41527 Application Identification:** Application Identification is a component of Enhanced Web Filtering, and can automatically learn, identify, and classify applications processed by the SSR and store them in the web filtering cache. For more information, see [Application Identification.](config_app_ident.md)
------
- **I95-43395 ESP protocol for DSCP Traffic Steering:** DSCP Traffic Steering now supports the ESP protocol. For more information, see [Configuring DSCP Steering.](config_dscp_steering.md)
------
- **I95-44224 Autocomplete for Resource Groups:** Autocomplete has been added to the pcli when configuring resource groups. 

### Resolved Issues

- **I95-25630 Gateway IP is required:** When creating or changing a service-route with a next-hop of a static IP net-int, a gateway IP is required. If no gateway IP has been specified, the network-interface gateway will be used. 
------
- **The following CVE issues have been addressed and resolved with this release:**
I95-40268, I95-41591, I95-42448, I95-43261, I95-43471, I95-43625, I95-44087, I95-44088, I95-44206
------
- **I95-42339 `show stats traffic-eng internal-application` not handling spaces:** This issue has been resolved. 
------
- **I95-42689 Missing config validation for `ethernet-over-svr` on HA routers:** Validation for EoSVR on HA routers has been added.
------
- **I95-42942 GUI Session Capture not working:** Resolved an issue with Packet Count and Session Count options. Session Capture now works as expected. 
------
- **I95-43327 Exchange FPM loss information between adjacent 128T nodes:** Added a mechanism to communicate marking counts between adjacent nodes to allow both sides to understand the calculated loss. 
------
- **I95-43809 CLI commands fail to run from the Conductor:** Resolved an issue where requests made to a HA conductor would not always try its peer.
------
- **I95-44085 SVR Savings Incorrectly calculated:** Resolved a computational issue that was providing an incorrect calculation.
------
- **I95-44107 Service routes with a GRE interface in the next-hop fail validation:** Updated the validation process for mapping interfaces.
------
- **I95-44144 Update Zookeeper Logging:** Zookeeper logging library has been replaced with reload4j.
------
- **I95-44175 Changes made to Service-Route->Reachability-Detection Settings do not show the correct state:** The service path builder has been updated to resolve this issue.
------
- **I95-44207 Unprovisioned OSPF configuration causes the PCLI to generate an error when issuing show ospf:** This issue has been resolved.
------
- **I95-44246 The "Piping Output..." message does not clear:** When running a grep command from the pcli, the piping output does not clear. This issue has been resolved.
------
- **I95-44252 Unneeded package dependencies may cause upgrade or rollback failures:** The packages and logic is obsolete and have been removed.
------
- **I95-44278 Paste configuration error:** Resolved an issue where pasting multiple lines that beginning with `configure` caused an error.
------
- **I95-44424 Cannot set log level configured on remote router from conductor CLI:** This issue has been resolved.
------
- **I95-44425 `show service-paths` not consistently displaying output:** This issue has been resolved.
------
- **I95-44480 Not allowing some valid identifiers or values:** This issue has been resolved.
------
- **I95-44517 Time check incorrectly locking upgrade process:** The time check has been replaced with a process name check.  
------
- **I95-44534 Session Capture in GUI not working:** A Session Capture triggered from the GUI now creates a capture for new sessions traversing the same path as this session. 
------
- **I95-44538 Invalid Stat increment:** This issue has been resolved. 
------
- **I95-44591 Paste-config does not allow small config snippets to be pasted:** Resolved an issue where the list keys were not being passed as part of the `value` in the transaction.

## Caveats
- **I95-44691 Restart the SSR after disabling Application Identification:** On a system with Application Identification enabled; if you choose to disable Application Identification, you must restart the SSR.
