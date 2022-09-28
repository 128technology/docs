---
title: WAN Assurance Overview
sidebar_label: Overview
---

SSR software can run on Juniper branded appliances, whitebox hardware (certified or self-evaluated), or virtual environments, and beginning with version 6.0, WAN Assurance for the SSR is available for users who manage their network using the Mist Cloud. 

The onboarding process for each deployment is similar - connect your device to the Mist Cloud, claim the device into your organization's inventory, create the topology for the SSR, and add the device to the site. The adoption is simplified through the zero-touch-provisioning process (ZTP) beginning with either scanning the QR code, or entering the claim code into your Mist Organization. 

### Onboard a Mist-Managed SSR Device

For onboarding an SSR device with 6.x software, start with the [SSR120 Onboarding](wan_assurance_ssr120_quickstart.md) or the [SSR130 Onboarding](wan_assurance_ssr130_quickstart.md).

### Onboard a Conductor-Managed SSR Device

For SSR devices running software versions prior to version 6.x, WAN Assurance is available through Mist, but routers are managed by a conductor. Begin with [SSR Device Onboarding](wan_onboarding_ssrdevice.md), and then proceed to either [SSR120 Onboarding](wan_assurance_ssr120_quickstart.md) or the [SSR130 Onboarding](wan_assurance_ssr130_quickstart.md) and the process that follows. 

### Onboard a Whitebox Device

To onboard a Whitebox device - a non-Juniper hardware device, that is either certified by Juniper, or a Juniper approved, self-evaluated device - Use the following procedure:

1. [Whitebox Staging](wan_staging.md)
2. [Whitebox Onboarding](wan_onboarding_whitebox.md)
3. [Site Assignment ](wan_telemetry_site_assign.md)
