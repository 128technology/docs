---
title: Overview
sidebar_label: Overview
---

SSR software can run on Juniper branded appliances, whitebox hardware (certified or self-evaluated), or virtual environments. This document explains the process of enabling Mist WAN Assurance Telemetry and zero-touch provisioning (ZTP) to adopt SSR routers into the Mist Cloud for **conductor-managed deployments**. 

This procedure assumes you have a conductor running SSR Version 5.4.4 or greater, deployed either on-premise or in the AWS Cloud, and **do not** already have an account, organization, or sites configured on the Mist portal.  

For Mist-managed SSR deployments, see the [WAN Assurance Overview for Mist Managed devices.](wan_overview.md)

:::important
Configuring WAN Assurance requires Administrator level privileges on SSR and Mist platforms.
:::

Running Mist WAN Assurance in a conductor-managed configuration requires a minimum of SSR Version 5.4.4 software on each device. To gain the full benefit of Telemetry data, it is recommended that you [upgrade to SSR version 5.5.4 or higher](intro_upgrade_considerations.md).

The high level steps to configure WAN Assurance Telemetry are listed below and detailed in subsequent sections.

- [Create a Site:](wan_telemetry_create_site.md)
    - Create an account on the Mist portal
    - Add your Organization
    - Create a site
- [Provisioning:](wan_telemetry_provisioning.md)
	- Add a network
	- Identify applications
- [Create a WAN Edge Template](wan_telemetry_template.md)
    - WAN Interface
    - LAN interface
    - Steering policy
    - Application Policy
    - Associate Template with the Site
- [Register and Onboard the SSR](wan_telemetry_register.md)
- [Site Assignment](wan_telemetry_site_assign.md)
- [View SSR Events and Activity](wan_telemetry_features.md)

To help reconcile any issues detected, see [Troubleshooting](wan_telemetry_troubleshooting.md).

For detailed information about Mist WAN Assurance, please refer to the [Mist WAN Assurance documentation](https://www.juniper.net/us/en/products/cloud-services/wan-assurance.html).
