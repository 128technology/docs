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
- **I95-42624 Upgrade Installer:** Before **upgrading to, or installing** version 5.4 and above, update the Installer to at least version 3.1.0. Failing to upgrade the installer may result in a rollback failure, should a rollback be necessary at any time. The Installer typically prompts you update when a new version is available. Select **Update** when prompted.
------
- **Plugin Upgrades:** If you are running with plugins, updates are required for some plugins **before** upgrading the conductor to SSR version 5.4.0 or higher. Please review the [Plugin Configuration Generation Changes](intro_upgrade_considerations.md#plugin-configuration-generation-changes) for additional information.  

## Release 5.6.0-1

**Release Date:** May 11, 2022

### New Features

- **I95-10056 RADIUS support for Multi-Factor Authentication:** Integration between Radius user access and Role-based Access Control allows the SSR to support Multi-Factor Authentication using Yubikey. 
------
- **I95-200118 Configuration Concurrency at Scale:** Support for multiple users concurrently editing the SSR configuration is now supported. For more information, see [Candidate Configuration](config_basics.md#candidate-configuration).
------
- **I95-32820 and I95-41915 STEP High Availability:** See [STEP High Availability(config_step_ha.md)] for more information. 
------
- **I95-37417 Additional factory default session-type configuration:** Added factory-default session-types for NetBIOS Name Service, NTP, and LDAP over UDP.
------
- **I95-37648 Configurable Password Policy:** The SSR password policies have been updated to provide a more secure experience. See [Password Policies](config_password_policies.md) for additional information.
------
- **I95-39712 Hierarchical Service Inheritance For STEP Learned Routes:** Child services now inherit routes of their parent services, when the parent route is learned through STEP. For more information see [Hierarchical Services.](config_STEP.md#hierarchical-services)
------
- **I95-40130 Factory Defaults for Conductor Communication:** Added SaltStack, Conductor, and IKE default session-types. For new deployments, SIP, SIPS, and IPSEC-NAT use NAT Keep Alive by default, and the timeout for IPSEC-NAT is 5 seconds.
------
- **I95-40660 Kernel Upgrade:** The OS kernel has been upgraded to that of CentOS 8.4 to address several CVEs and provide support for Wireguard and Cordoba.
------
- **I95-41449 NTP Authentication with SHA1 or better:** Support for NTP authentication provides options for external NTP server authentication. See [NTP Authentication](config_ntp_auth.md) for more information.
------
- **I95-41509 STEP Route Computation enhancements:** STEP uses additional service policy information when computing the best path scenario. See [STEP Route Computation](config_STEP.md#route-computation) for more information.
------
- **I95-41557 Software Lifecycle Management:** The download, upgrade, and software lifecycle process is more easily managed from a single location in the GUI. See [Software Lifecycle](intro_upgrading.md#upgrade-using-the-conductors-gui) for additional information. 
------
- **I95-42483 STEP Page in the GUI:** [The STEP page in the GUI](howto_STEP_GUI.md) provides graphical representations of STEP data.  
------
- **I95-42887 Real-time alerts for Audit failure events:** A service has been added a service that warns all logged in users if auditd fails to start and audit logging capability is impacted. See [Audit Events](config_audit_event.md#basic-configuration) for more information. 
------
- **I95-42888 Logout mechanism for administrator-initiated communication sessions:** A PCLI command and audit log are available to verify session closure.
------
- **I95-43039 File permissions, ownership/membership of system files and commands remain static:** Unauthorized or unintended changes are not introduced during the operation of the SSR Software.
------
- **I95-43040 Non-certificate trusted host is not allowed SSH logon to the system:** The SSH daemon performs strict mode checking and does not allow a non-trusted host SSH to logon to the system.
------
- **I95-43041 Datagram Congestion Control Protocol (DCCP) kernel module is disabled unless required:** The DCCP module is prevented from loading unless it is specifically required. 
------
- **I95-43047 Local initialization files do not execute world-writable programs:** The directories are not world-writable.
------
- **I95-43049 The audit system notifies the user when there is an error sending audit records to a remote system:** Remote logging for audit logs and appropriate messaging has been added. See [Audit Events](config_audit_event.md#basic-configuration) for more information.
------
- **I95-43050 Strict mode checking of home directory configuration files:** The SSH daemon performs strict mode checking home directory configuration files.
------
- **I95-43051 Remote X connections are disabled except to fulfill documented and validated requirements:** X server is disabled as part of the mode checking of home directory configuration files. 
------
- **I95-43496 BFD for Routing Protocols:** BFD support for BGP and OSPF protocols has been added. See [Optimizing Routing Protocols: BFD](config_bfd.md) for more information.

## Resolved Issues

- **I95-36758 Redistributed service route distance not configurable:** Support has been added for the configuration of admin distance for kernel routes generated by services with service routes and for BGP over SVR services. 
------
- **I95-40940 Power save mode not working:** This issue has been resolved.
------
- **I95-41992 Warning for Rate-Limit with Flow-Limit values at 0:** A warning has been added to advise users that this will cause dropped packets.
------
- **I95-44142 Automated Provisioner Race condition:** Resolved a rare crash where applications would attempt to get information about already-closed sockets when responding to API requests.
------
- **I95-44435 Save Tech Support should include Service Paths:** `save tech-support-info` includes `show service-path` and `show rib`.
------
- **I95-44772 Time series HMAC failures after rebooting node in HA router:** Device interfaces are flushed upon becoming active to avoid handling of packets which have been delayed due to inactivity.
------
- **I95-44823 Conductor upgrade failure - extra space in integer is invalid:** Extra spaces on integer types are now trimmed off to avoid this issue.
------
- **I95-44854 Extra "Application" column in Top Sessions panel:** The extra column has been removed. 
------
- **I95-44913 kmod-i40e metapackage causing upgrade issues:** The metapackage has been removed and upgrade issues have been resolved.
------
- **I95-44991 SSR not passing Aruba data on GRE Tunnels:** Resolved an issue where GRE packets with reserved bit in the header are incorrectly dropped as invalid.
------
- **I95-45063 SSR azure instances unstable on large machine types:** Resolved an unpgrade issue causing instability in Azure instances using Mellanox5. 
------
- **I95-45113 snmp override of the IfTable:** An issue with SNMP reporting has been resolved.
------
- **I95-45124 RBAC Config Endpoints Leaking Information:** Resolved an issue where some configuration endpoints would allow users with incorrect permissions make requests.
------
- **I95-45162 Improve download/upgrade error message if a router name does not exist:** In situations where a router does not exist, the download and upgrade message now indicates that the router does not exist.
------
- **I95-45211 New users run into permissions errors:** Access Control Lists are now preserved on file rotations.
------
- **I95-45220 Conductor local forwarding parameters not dynamic:** Resolved an issue when transitioning a conductor from standalone to HA the managed routers were not automatically connecting to the newly added conductor node.
------
- **I95-45268 Third-party-drivers rpm install hung:** Resolved an issue where the installation hangs when running a post-install scriptlet. The script is not necessary at that stage and has been disabled.
------
- **I95-45348 Update salt master and minion to 3002.8:** This update resolves several CVE's and requires that the conductor must be running this release containing these fixes **before** upgrading a router. 
**Important** Please see the Caveat below for additional important information about HA upgrades.
------
- **I95-45374 Router Dropping SIP traffic:** Provide a warning if users configure a service-class to rate-limit but don't set max-flow-burst/max-flow-rate values (default is set to 0).
------
- **I95-45541 LDAP users are unable to login to the PCLI due to getting permission errors on global.init:** This issue has been resolved.
------
- **I95-45583 HA Connection lost during commit:** Resolved an issue where  session was missing necessary path data information relating to the peer path.
------
- **I95-45696 Memory leak in pam challenge library:** Resolved a memory leak in the PAM challenge library. 
------
- **I95-45761 SSH ClientAliveInterval change:** The SSH `ClientAliveInterval` has been reset to 900.
------
- **I95-45816 "TCP State Stream Parse Error" filling up the flpp.log:** This log issue has been addressed. 

## Caveats

- **I95-45348: Update salt master and minion to 3002.8:** When upgrading an HA pair to version 5.6.0, please be aware of the following: While updating the conductors in an HA pair, the upgraded conductor node asset state will remain DISCONNECTED if the active `automatedProvisioner` is not running a corrected version. When performing an HA conductor upgrade the node running the oldest software assumes leadership. However, the older version will not be able to talk to the new software on the upgraded conductor. 

The active `automatedProvisioner` can be determined by running the command `show system processes`. Once the upgrade begins on the old node, the newly upgraded conductor takes over.

