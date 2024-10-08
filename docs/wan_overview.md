---
title: WAN Assurance Overview
sidebar_label: Overview
---

SSR software can run on Juniper branded appliances, whitebox hardware (certified or self-evaluated), or virtual environments. Beginning with version 6.0, WAN Assurance for the SSR is available for users who [manage their network using the Mist Cloud](https://www.juniper.net/documentation/product/us/en/mist-wan-assurance/). 

For conductor-managed SSR devices running software versions 5.4.x and greater, [WAN Assurance Cloud Telemetry](config_wan_assurance.md) is available through Mist.

![SSR Managment Models](/img/wan_ssr_mgmt_models.png)

The onboarding process for each deployment is similar - connect your device to the Mist Cloud, claim the device into your organization's inventory, create the topology, and add the device to the site. The process is simplified using zero-touch-provisioning (ZTP) beginning with either scanning the QR code, or entering the claim code into your Mist Organization. 

### Onboard a Mist-Managed SSR Device

For onboarding an SSR device to the Mist Cloud, start with the onboarding process appropriate for your deployment.

- [SSR120 Onboarding](wan_assurance_ssr120_quickstart.md) 
- [SSR130 Onboarding](wan_assurance_ssr130_quickstart.md)
- [SSR1200 Onboarding](wan_assurance_ssr1200_quickstart.md)
- [SSR1300 Onboarding](wan_assurance_ssr1300_quickstart.md)
- [SSR1400 Onboarding](wan_assurance_ssr1400_quickstart.md)
- [SSR1500 Onboarding](wan_assurance_ssr1500_quickstart.md)

### Adopt a Conductor-Managed SSR Device

To adopt conductor-managed SSR devices into Mist, refer to [Cloud Telemetry for a Conductor-Managed SSR](config_wan_assurance.md). 

### Adopt a Mist-Managed Whitebox Device

To adopt a Mist-managed whitebox device with 6.x software - a non-Juniper hardware device, that is either certified by Juniper, or a Juniper approved, self-evaluated device - use the following procedure:

1. [Whitebox Staging](wan_staging.md)
2. [Whitebox Onboarding](wan_onboarding_whitebox.md)
3. [Site Assignment ](wan_telemetry_site_assign.md)

