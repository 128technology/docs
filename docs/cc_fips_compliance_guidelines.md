---
title: Common Criteria Compliance Guidelines
sidebar_label: Common Criteria Compliance Guidelines
---

For compliance, the following configuration considerations must be made:
 
- FIPS mode must be enabled **during installation**.
- Except during installation, all configuration procedures must be performed from the PCLI; use of the GUI is not part of the approved use case. Configuring the router OTP Quickstart file from the Conductor GUI is acceptable under the Common Criteria guidelines.
- When installing a router, the [IPv4 Option Filter](cc_fips_sec_firewall_filtering.md#ipv4-option-filtering) must be set to `drop-all`.
- When installing a router, the [ICMP Session Match](cc_fips_sec_firewall_filtering.md#from-the-command-line) must be set to `identifier-and-type`.
- Configure the [TCP Half-Open Connections Limit](cc_fips_sec_firewall_filtering.md#tcp-half-open-connection-limit) for firewall.
- The `password-policy` must define the minimum password length and maximum number of permitted login attempts per user. Please refer to [`configure authority password-policy`](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/config_command_guide.md#configure-authority-password-policy) for pcli commands and context for assigning these values.
- The `admin` account must be given `sudo` privileges allowing it to use the shell for some management capabilities. Edit the `/etc/sudoers` file as `root` using the `visudo` command. This allows you to add an entry for `admin` which will persist across reboots.
- Traffic logging must be enabled by setting the following command to `true`: `configure authority router router system audit traffic enabled true`
 This is a resource intensive setting. Not more than a few sessions are expected to run while collecting traffic events.

- Any services that are used to enforce evaluated firewall functionality must have a service-policy attached that applies strict transport state enforcement:
 `configure authority service-policy <service_policy> transport-state-enforcement strict`
 This feature must be configured on services where the evaluated firewall capabilities are expected to be enforced. For services that fall outside of the need for firewall security functionality, such as an HA configuration where the states are not synced across devices, setting this feature to strict may have an impact on traffic flow. It is up to your discretion whether to apply the same restrictions on the service. 

 For overview information about service policies, please see [Service and Service Policy Design](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/bcp_service_and_service_policy_design.md). 

 For information about configuration baselines, please see [Service Policy Baseline Configuration](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/bcp_service-policy_defaults.md)

:::note
An example configuration has been provided in the [Appendix](cc_fips_appendix.md).
:::

## Out of Scope Features

The following functionality and platforms are not certified under Common Criteria.

- Non-Juniper branded hardware platforms and Juniper branded hardware platforms not explicitly included.
- Juniper SSR Software for virtual platforms.
- HTTPS/TLS, IPSec, SNMP, RADIUS, LDAP.
- X.509 certificate management, validation or verification.
- Virtual Private Network (VPN) and Intrusion Prevention System (IPS) functions.
- Graphical User Interface (GUI) and Juniper MIST.
- SSR Plugins, particularly Wireshark, are excluded from Common Criteria certification. 

The SSR Hardware has no physical restrictions for Common Criteria certification, however, there is an assumption of physical security.

## Installation Process Overview

Installation is done from the SSR ISO, typically from a bootable image on a flash drive or disk. The install process is as follows:
- [Download the OTP ISO](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/intro_downloading_iso.md)
- [Create Bootable Media](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/intro_creating_bootable_usb.md)
- [Install a Conductor](cc_fips_conductor_install.md)
- [Install the Router](cc_fips_router_install.md) 
