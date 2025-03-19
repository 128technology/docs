---
title: SSR 7.0 Release Notes
sidebar_label: '7.0'
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

- **I95-43243/IN-460 Upgrade and Rollback:** Upgrading or rolling back a system (conductor or router) with the interactive installer `install128t`, that is managed by a conductor may result in the system becoming unresponsive. It is recommended that upgrades be performed through the conductor UI. Manual upgrades and rollbacks may not be resilient to failures. See [Rolling Back Software](intro_rollback.md) for more information on these operations.
------
- **I95-42542 Conductor Upgrade Time:** Upgrades can take up to 40 minutes due to the number of rpms being upgraded. Please plan accordingly.
------
- **I95-42624 Upgrade Installer:** Before **upgrading to, or installing** version 5.4 and above, update the Installer to at least version 3.1.0. Failing to upgrade the installer may result in a rollback failure, should a rollback be necessary at any time. The Installer typically prompts you update when a new version is available. Select **Update** when prompted.
------
- **Plugin Upgrades:** If you are running with plugins, updates are required for some plugins **before** upgrading the conductor to SSR version 5.4.0 or higher. Please review the [Plugin Configuration Generation Changes](intro_upgrade_considerations.md#plugin-configuration-generation-changes) for additional information.

## Release 7.0.0-63r1

**Release Date:** April 30, 2025

### New Features

- **I95-58635 Source Peer added to output of `show session by-id`:** Added information to the output of `show session by-id`, making it easier to troubleshoot sessions.
------
- **I95-59634 Allow Highway lockup detection to be disabled:** Added a `local.init` override for disabling datapath lockup detector mechanism.

```
  "datapath": {
    "lockupDetectionEnabled": true/false
  },
```
------
- **I95-60041 `initialize conductor` command sets password for all system accounts:** The system accounts "admin", "t128", and "root" are simultaneously set to the provided password hash, ensuring default passwords are not used.
------
- **I95-60220 SSR OS Upgrade:** SSR OS distribution upgraded to Oracle Linux 9.
------
- **I95-57454 Management traffic over SVR (in-band management):** Router to Conductor communication can be supported over SVR with the use of rekey.
------
- **I95-59758 Interactive Initializer updates all system account passwords:** Interactive initialization now changes the "admin", "t128" and "root" user passwords to the same value. The initialization preference file has the fields, `t128-password`, `root-password`, and `admin-password`, to set password hashes for each user, respectively.
------
- **I95-59996 GUI Initialization sets passwords for all system accounts:** GUI initialization now changes the "admin", "t128" and "root" user passwords to the same value.
------
- **I95-22432 Conductor Management IPv6:** All router to conductor communication along with management protocols (ssh, radius, syslog, snmp, web gui/api) now support IPv6.
------
- **I95-29382 Certificate-based Security Encryption for SVR:** Introduces a new peer-to-peer key exchange mechanism to the SVR protocol that is based on certificates. This feature avoids mid-network re-encryption, provides the ability to rotate keys as required, and supports all deployment scenarios. The new security rekeying mechanism requires that all routers and conductors use the same version of software that supports this capability. The existing security key exchange mechanism will continue to exist and will be supported to support a transition to the new model. The two security approaches, however, cannot coexist at the same time within an authority. The new security rekeying mechanism is configured at the authority.
------
- **I95-52924 NIC Driver FEC Support:** Support has been added to configure optical FEC for SFPs.
------
- **I95-53993 Display LLDP Neighbors:** A CLI command to output neighbors discovered through LLDP has been added.
------
- **I95-59239 Application Policy Hit Counter:** Application Policy Hit Count provides insight into what routing policies are being referenced to direct traffic in the network's typical operation. Application Policy Hit Count reports both the policies are that are being referenced ("hit"), and in which ways. In the firmware, these values are presented as metrics tracked per service/per tenant, where each tenant service combination could be "hit" in one of the following ways.

| Count  | Description |
| ---- | ----------- |
| Allowed | The session was allowed and created successfully. |
| Failed | The session could not be created. |
| Denied due to Access Policy | The packet was denied because an access policy explicitly disallows access. |
| Denied due to URL Filtering | The session was created was blocked once app classification was completed. |
| Denied due to Local Service Definition | The session was allowed by some other ingress router but is denied based on the rules of this router. (relates to hierarchical services) |
------
- **WAN-2284 Critical IDP Profile:** A new **Critical** attack list profile that is more lightweight has been added to reduce the commit/policy change times.
------
- **WAN-3834 Remove Private AS for BGP Neighbor:**

### Resolved Issues:
