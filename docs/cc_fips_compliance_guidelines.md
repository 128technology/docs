---
title: Common Criteria Compliance Guidelines
sidebar_label: Common Criteria Compliance Guidelines
---

For compliance, the following configuration considerations must be made:
 
- FIPS mode must be enabled **during installation**.
- All configuration procedures must be performed from the PCLI; use of the GUI is not part of the approved use case.
- When installing a router, the [IPv4 Option Filter](cc_fips_sec_firewall_filtering.md#ipv4-option-filtering) must be set to `drop-all`.
- When installing a router, the [ICMP Session Match](cc_fips_sec_firewall_filtering.md#from-the-command-line) must be set to `identifier-and-type`.
- Configure the [TCP Half-Open Connections Limit](cc_fips_sec_firewall_filtering.md#tcp-half-open-connection-limit) for firewall.
- The `password-policy` must define the minimum password length and maximum number of permitted login attempts per user. Please refer to [`configure authority password-policy`](config_command_guide.md#configure-authority-password-policy) for pcli commands and context for assigning these values.
- Traffic logging must be enabled by setting the following command to `true`: 

 `configure authority router router system audit traffic enabled true`
- Any services that are used to enforce evaluated firewall functionality must have a service-policy attached that applies strict transport state enforcement:
 `configure authority service-policy <service_policy> transport-state-enforcement strict`

 For overview information about service policies, please see [Service and Service Policy Design](bcp_service_and_service_policy_design.md). 

 For information about configuration baselines, please see [Service Policy Baseline Configuration](bcp_service-policy_defaults.md)

<!---It was once mentioned that sometimes clients may not want to enforce this, especially in HA configurations as the states are not synced across devices. It should be made clear to users that this feature must be configured on services where the evaluated firewall capabilities are expected to be enforced. It is up to the users whether to enable this or not if they have no need to enforce the firewall security functionality on the relevant service.--->

## Out of Scope Features

The following functionality and platforms are not supported under Common Criteria.

- Non-Juniper branded hardware platforms and Juniper branded hardware platforms not explicitly included.
- Juniper SSR Software for virtual platforms.
- HTTPS/TLS, IPSec, SNMP, RADIUS.
- X.509 certificate management, validation or verification.
- Virtual Private Network (VPN) and Intrusion Prevention System (IPS) functions.
- Graphical User Interface (GUI) and Juniper MIST.

The SSR Hardware has no physical restrictions for Common Criteria certification, however, there is an assumption of physical security.

## Installation Process Overview

Installation of the SSR network devices should follow the following high-level process:

Installation is done from the SSR ISOs, typically from a bootable image on a flash drive or disk. The install process is as follows:
- [Download the OTP ISO](intro_downloading_iso.md)
- [Create Bootable Media](intro_creating_bootable_usb.md)
- [Install a Conductor](cc_fips_conductor_install.md)
- [Create the Router configuration with the Conductor](intro_basic_router_config.md) or [Import a Configuration](single_conductor_config.md)
- [Install the Router using the OTP ISO](cc_fips_router_install.md) 

For the compliant installation process and configuration parameters please refer to the specific [Conductor](cc_fips_conductor_install.md) or [Router](cc_fips_router_install.md) Installation and Configuration procedure.