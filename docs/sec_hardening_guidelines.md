---
title: Security Hardening Guidelines
sidebar_label: Security Hardening Guidelines
---

This section provides a list of security hardening actions and guidelines to provide additional security to your SSR and your network overall. Many of the guidelines below are covered in the [SSR Common Critieria Install and Configuration](cc_fips_titlepage.md) documentation. 

## Administrative
- Review SSR security polices for CVE tracking and notifications: [Juniper SSR Security Policies](about_security_policy.md#release).
- Install the latest supported/recommended version of SSR software.
- Always verify cryptographic (MD5) checksums prior to software installation.

## Physical Security
- When redeploying a previously installed device, use [`restore system factory-default`](cli_reference.md#restore-system-factory-default) to reset the factory defaults, ensuring all previous configurations and data is removed.
- **Unused Ports**
	- Disable unused network interfaces.
	- For non-Juniper hardware, disable unused USB ports in the BIOS.

## Network Security
- When using the Out-of-Band (OOB) management interface for management related traffic, ensure access policies are configured to restrict inbound access.
- Use a node loopback address for all in-band management traffic to create a known source IP for NTP, SNMP, Syslog, etc.
- Configure LLDP only on required network ports.
- Configure a Service Policy with Strict [TCP Transport State Enforcement](sec_firewall_filtering.md#transport-state-enforcement) to ensure packets that fall outside of the expected sequence numbers are dropped.
- Configure the [Half Open TCP Connection limit](sec_firewall_filtering.md#tcp-half-open-connection-limit).

:::note 
When the SSR approaches the configured limit of half-open TCP connections, the establishment of healthy TCP sessions may be significantly impacted. Please ensure that this value is set appropriately for your network. More importantly, attempt to identify the devices that are creating half-open sessions.
:::

## ICMP and ARP Handling
- Enable ICMP type as a session attribute to block non-matched ICMP responses.
- Configure ICMP sync reply as `drop` and add desired ICMP drop exclusions. Refer to [ICMP Filtering](sec_firewall_filtering.md#icmp) for more information.
- Ensure Proxy ARP is either not configured, or is restricted to specific interfaces.

## Management Services Security
- Consider enabling [FIPS mode](cc_fips_conductor_install.md#conductor-installation) to restrict the encryption algorithms used for management connections.
- Configure known/trusted NTP servers and authentication.
- Configure SNMP using the most secure method with more than one trusted server.
- Community strings and USM passwords should be difficult to guess and follow password complexity policy.
- Be sure to configure read-only access; use read-write only when absolutely required.
- Allow queries and/or send traps to more than one trusted server to provide resiliency.
- Send Syslog messages to more than one trusted server with enhanced timestamps to provide resiliency.
- Create configuration backups to more than one trusted server to provide resiliency.

## Access Security
- Configure a [login warning banner](cc_fips_banners.md) that is displayed prior to credentials being provided.
- Ensure unnecessary host services (SSH, HTTPS, etc.) are not configured.
- Use HTTPS with a valid certificate signed by a trusted CA.
- Ensure access lists are configured for required services (SSH, HTTPS).
- Restrict access only from authorized particular interfaces.
- Restrict authentication by setting the authentication token timeout value.

## User Authentication Security
- Configure a [password complexity policy](config_command_guide.md#configure-authority-password-policy) that incorporates the following, and meets your organization’s password complexity policy.
  - Minimum password length.
  - Password lifetime.
  - Maximum failed login attempts.
  - User lock time.
- Ensure the admin account has been configured with a strong password that meets your organization’s password complexity policy.
- Configure custom access management roles to support different access levels using the least privilege principle.
- Restrict configuration access by job function.
- Configure resources and resource groups to limit device access.

## Centralized Authentication
- Use a strong password that complies with your organization’s password complexity policy.
- Configure multiple servers for resiliency.
- Configure accounting to trace activity and usage.
- Create an emergency local account in the event authentication servers are unavailable.

## Local Authentication
- Use a strong password that complies with your organization’s password complexity policy.
- Limit Local accounts to required users.
- Know the origin and purpose for all configured local accounts.

## Routing Protocol Security
- Ensure routing protocols are configured only on required interfaces.
- BGP communication should source from a loopback interface.
- Configure neighbor password for BGP peers.
- Use strong authentication keys that meet your organization’s password complexity policy.
- Limit key exposure by using separate authentication keys for different organizations.
- Periodically change route authentication keys in accordance with your organization’s security policy.

## Access Control and Encryption
- Ensure inter-node security is configured with encryption for fabric metadata.
- Ensure that the network interface adjacency (authority>router>node>device-interface>network-interface>adjacency) has a security policy configured to encrypt peer metadata. See [configure authority security](config_command_guide.md#configure-authority-security) for information about configuring security policies.
- Ensure inter-router security is configured to decrypt metadata.
- Ensure service security policy is configured to encrypt application payload.
- Optionally apply HMAC when packet authentication is required.
- Audit service/application access control policies for services and applications on a regular basis.