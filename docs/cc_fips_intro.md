---
title: Introduction - Common Criteria and FIPS Mode
sidebar_label: Introduction - Common Criteria and FIPS Mode
---

The focus of this document is to provide the required configuration steps to install and operate the SSR in a manner consistent with the requirements of Common Criteria and FIPS.

## Compliance Guidelines

For compliance, the following considerations must be made:
- All installation and configuration procedures must be performed from the PCLI; use of the GUI is not part of the approved use case.
- FIPS mode must be enabled **during installation**.
- Only the OTP Installation and upgrade processes have been tested for compliance. Use of other methods of install or upgrade do not fit with the compliance model. 
- When installing a router, the [IPv4 Option Filter](cc_fips_sec_firewall_filtering.md#ipv4-option-filtering) must be set to `drop-all`.
- When installing a router, the [ICMP Session Match](cc_fips_sec_firewall_filtering.md#from-the-command-line) must be set to `identifier-and-type`.
- Configuring the TCP Half-Open Connections Limit for firewall.
- Configuring the umber of permitted login attempts per user.

For the compliant installation process and configuration parameters please refer to the specific [Conductor](cc_fips_conductor_install.md) or [Router](cc_fips_router_install.md) Installation and Configuration procedure.

## Out of Scope Features

The following functionality and platforms are not supported under Common Criteria.

- Non-Juniper branded hardware platforms and Juniper branded hardware platforms not explicitly included.
- Juniper SSR Software for virtual platforms.
- HTTPS/TLS, IPSec, SNMP, RADIUS.
- X.509 certificate management, validation or verification.
- Virtual Private Network (VPN) and Intrusion Prevention System (IPS) functions.
- Graphical User Interface (GUI) and Juniper MIST.

## Installation Process Overview

Installation of the SSR network devices should follow the following high-level process:

Installation is done from the SSR ISOs, typically from a bootable image on a flash drive or disk. The install process is as follows:
- [Download the OTP ISO](intro_downloading_iso.md)
- [Create Bootable Media](intro_creating_bootable_usb.md)
- [Perform the Interactive ISO installation](intro_installation_bootable_media.mdx) 
- [Install a Conductor](install_conductor_overview.md)
- [Create the Router configuration with the Conductor](intro_basic_router_config.md) or [Import a Configuration](single_conductor_config.md)
- [Install the Router using the OTP ISO](intro_otp_iso_install.mdx) or [Install the Router using the Interactive Installation](intro_installation_bootable_media.mdx)


