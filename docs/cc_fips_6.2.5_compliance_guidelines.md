---
title: Common Criteria Compliance Guidelines
sidebar_label: Common Criteria Compliance Guidelines
---

For compliance, the following configuration considerations must be made:
 
- FIPS mode must be enabled **during installation**. Use of anything other than FIPS mode is not compliant with Common Criteria certification.
- **Except during installation**, all configuration procedures must be performed from the CLI; use of the GUI is not part of the approved use case. Configuring the router OTP Quickstart file from the Conductor GUI **is acceptable under the Common Criteria guidelines**.
- When installing a router, the [IPv4 Option Filter](cc_fips_6.2.5_sec_firewall_filtering.md#ipv4-option-filtering) must be set to `drop-all`.
- When installing a router, the [ICMP Session Match](cc_fips_6.2.5_sec_firewall_filtering.md#icmp-type-as-a-session-attribute) must be set to `identifier-and-type`.
- Configure the [TCP Half-Open Connections Limit](cc_fips_6.2.5_sec_firewall_filtering.md#tcp-half-open-connection-limit) for firewall.
- The `password-policy` must define the minimum password length and maximum number of permitted login attempts per user. Please refer to [Username and Password Policies](cc_fips_6.2.5_config_password_policies.md) for policies, and to [`configure authority password-policy`](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/config_command_guide#configure-authority-password-policy) for CLI commands and context for assigning these values.
- The `admin` account must be given `sudo` privileges allowing it to use the shell for some management capabilities. Edit the `/etc/sudoers` file as `root` using the `visudo` command. This allows you to add an entry for `admin` which will persist across reboots. For additional information, please see [Root Access](cc_fips_6.2.5_access_mgmt.md#root-access) in the Access Management section.
- Traffic logging must be enabled by setting the following command to `true`: `configure authority router router system audit traffic enabled true`. This is a resource intensive setting. Not more than a few sessions are expected to run while collecting traffic events.

- Any services that are used to enforce evaluated firewall functionality must have a service-policy attached that applies strict transport state enforcement:
 `configure authority service-policy <service_policy> transport-state-enforcement strict`
 This feature must be configured on services where the evaluated firewall capabilities are expected to be enforced. For services that fall outside of the need for firewall security functionality, such as an HA configuration where the states are not synced across devices, setting this feature to strict may have an impact on traffic flow. It is up to your discretion whether to apply the same restrictions on the service. 

 For overview information about service policies, please see [Service and Service Policy Design](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/bcp_service_and_service_policy_design). 

 For information about configuration baselines, please see [Service Policy Baseline Configuration](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/bcp_service-policy_defaults).

- Common Criteria Compliance assessment includes all SSR interfaces.
- Security functionality called out in this guide is required for Common Criteria compliance. Other security features available with the SSR will not jeopardize the compliance certification, but are not compliance requirements. 
- The use of SSH is necessary for installation and configuration. Use of SSH on the SSR after FIPS mode has been enabled during install is secure, and compliant with Common Criteria.   

## Compliant SSR Hardware

The following table provides a complete list of compliant hardware. 

| PLATFORM | NETWORKING |
| --- | --- |
| SSR120 | 2 x 1GbE combo RJ45/SFP <br/>4 x 1GbE RJ4 |
| SSR130 | 2 x 1GbE combo RJ45/SFP <br/>6 x 1GbE RJ45 |
| SSR1200 | 8 x 1GBe RJ45 <br/>4 x 1/10 GbE SFP+ |
| SSR1300 | 6 x RJ-45 <br/>4 x 10GbE SFP+ <br/>3 x 1/10GBe SFP+ <br/>4 x 1GBe Ethernet |
| SSR1400 | 6 x 1G RJ-45 <br/>4 x 10G SFP+ <br/>4 x 1/10/25G SFP28 |
| SSR1500 | 6 x 1G RJ-45 |

Juniper SSR Common Criteria certified platforms implement cryptographic algorithms on CPUs covered by the following validations: 
- [37481](https://csrc.nist.gov/projects/cryptographic-algorithm-validation-program/details?validation=37481)
- [37482](https://csrc.nist.gov/projects/cryptographic-algorithm-validation-program/details?validation=37482)
- [37469](https://csrc.nist.gov/projects/cryptographic-algorithm-validation-program/details?validation=37469)

## Out of Scope Features

The following functionality and platforms **are not certified** under Common Criteria.

- SSR Software versions other than V6.2.5-5r2. 
- Non-Juniper branded hardware platforms running SSR Software
- Juniper branded hardware platforms not explicitly included
- Juniper SSR Software for virtual platforms.
- SSR Graphical User Interface (GUI) 
- Juniper MIST
- HTTPS/TLS, IPSec, SNMP, RADIUS, LDAP, syslog/TLS
- X.509 certificate management, validation or verification
- Virtual Private Network (VPN) and Intrusion Prevention System (IPS) functions
- SSR Plugins, particularly Wireguard, are excluded from Common Criteria certification 

### Physical Security

The SSR Hardware has no physical restrictions for Common Criteria certification, however, there is an assumption of physical security. The Administrator should ensure that physical security, commensurate with the value of the SSR and the data it contains, is provided by the environment into which SSR is deployed. 

### Additional Information Related to Common Criteria

Common Criteria certification uses FIPS mode to provide cryptographic support. Without FIPS mode enabled during installation, the SSR is not compliant. FIPS mode provides all secure cyphers, and therefore **no additional cryptographic keys are used**. 

:::important
The use of non-evaluated cryptographic engines or use without FIPS mode enabled does not conform to the Common Criteria compliance guidelines and is not certified.
::: 

