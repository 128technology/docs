---
title: WAN Assurance Overview
sidebar_label: Overview
---

SSR software can run on Juniper branded appliances, whitebox hardware (certified or self-evaluated), or virtual environments, and beginning with version 6.0, WAN Assurance for the SSR is available for users who manage their network using the Mist Cloud. For onboarding a Juniper device with 6.0.x software, refer to the [SSR120 Quickstart](wan_assurance_ssr120_quickstart.md) or the [SSR130 Quickstart](wan_assurance_ssr130_quickstart.md).

For software versions prior to SSR Version 6.0, WAN Assurance is available with Mist, but routers are managed by an on-premises conductor. Juniper SSR hardware devices are currently shipping with the version 5.4.4 software installed. For conductor-managed deployments, see the [WAN Assurance Telemetry Overview.](wan_telemetry_overview.md)

The onboarding process for each deployment is similar - create the topology and configuration where the SSR will be adopted before adding the SSR to the Mist Cloud. The adoption is simplified through the zero-touch-provisioning process (ZTP) beginning with either scanning the QR code, or entering the claim code into your Mist Org. 

### Process

The process for bringing your SSR into the Mist cloud is the following:
- [WAN Edge Provisioning](wan_edge_provisioning.md)

and then either

- [SSR 120/130/1200/1300 Onboarding](wan_onboarding_ssrdevice.md)

Or

- [Whitebox Staging](wan_staging.md)
- [Whitebox Onboarding](wan_onboarding_whitebox.md)
- [Site Assignment ](wan_site_assignment.md)

For a new deployment of an SSR in the Mist Cloud, see [Conductor Managed WAN Assurance](config_wan_assurance.md).