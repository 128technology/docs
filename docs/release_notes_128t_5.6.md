---
title: SSR 5.6 Release Notes
sidebar_label: '5.6'
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

## Release 5.6.0-1

**Release Date:** May 6, 2022

### New Features

- **I95-10056 JITC: RADIUS support for Multi-Factor Authentication:** Integration between Radius user access and Role-based Access Control allows the SSR to support Multi-Factor Authentication using Yubikey. 
------
- **I95-200118 Configuration Concurrency at Scale:** Support for multiple users concurrently editing the SSR configuration is now supported. For more information, see [Candidate Configuration](config_basics.md#candidate-configuration).
------
- **I95-32820 and I95-41915 STEP High Availability:** See [STEP High Availability(config_step_ha.md)] for more information. 
------
- **I95-37648 JITC: Configurable Password Policy:** The SSR password policies have been updated to provide a more secure experience. See [Password Policies](config_password_policies.md) for additional information.
------
- **I95-39712 Hierarchical Service Inheritance For STEP Learned Routes:** Child services now inherit routes of their parent services, when the parent route is learned through STEP. For more information see [Hierarchical Services.](config_STEP.md#hierarchical-services)
------
- **I95-40660 Kernel Upgrade:** The OS kernel has been upgraded to that of CentOS 8.4 to address several CVEs and provide support for Wireguard and Cordoba.
------
- **I95-41449 JITC: NTP Authentication with SHA1 or better:** Support for NTP authentication provides options for external NTP server authentication. See [NTP Authentication](config_ntp_auth.md) for more information.
------
- **I95-41509 STEP Route Computation enhancements:** STEP uses additional service policy information when computing the best path scenario. See [STEP Route Computation](config_STEP.md#route-computation) for more information.
------
- **I95-41557 Software Lifecycle Management:** The download, installation, and software lifecycle process is more easily managed from a single location in the GUI. See [Software Lifecycle] for additional information. 
------
- **I95-42483 STEP Page in the GUI:** [The STEP page in the GUI](howto_STEP_GUI.md) provides graphical representations of STEP data.  
------
- **I95-42887 JITC: Real-time alerts for Audit failure events:** A service has been added a service that warns all logged in users if auditd fails to start and audit logging capability is impacted. See [Audit Events](config_audit_event.md#basic-configuration) for more information. 
------
- **I95-42888 JITC: Logout mechanism for administrator-initiated communication sessions:** A PCLI command and audit log are available to verify session closure.
------
- **I95-43039 JITC: File permissions, ownership/membership of system files and commands remain static:** Unauthorized or unintended changes are not introduced during the operation of the SSR Software.
------
- **I95-43040 JITC: Non-certificate trusted host is not allowed SSH logon to the system:** The SSH daemon performs strict mode checking and does not allow a non-trusted host SSH to logon to the system.
------
- **I95-43041 JITC: Datagram Congestion Control Protocol (DCCP) kernel module is disabled unless required:** The DCCP module is prevented from loading unless it is specifically required. 
------
- **I95-43047 JITC: Local initialization files do not execute world-writable programs:** The directories are not world-writable.
------
- **I95-43049 JITC: The audit system notifies the user when there is an error sending audit records to a remote system:** Remote logging for audit logs and appropriate messaging has been added. See [Audit Events](config_audit_event.md#basic-configuration) for more information.
------
- **I95-43050 JITC: Strict mode checking of home directory configuration files:** The SSH daemon performs strict mode checking home directory configuration files.
------
- **I95-43051 JITC: Remote X connections are disabled except to fulfill documented and validated requirements:** X server is disabled as part of the mode checking of home directory configuration files. 
------
- **I95-43496 BFD for Routing Protocols:** BFD support for BGP and OSPF protocols has been added. See [Optimizing Routing Protocols: BFD](config_bfd.md) for more information.
------

## Resolved Issues


