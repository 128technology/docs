---
title: WAN Assurance Telemetry
sidebar_label: WAN Assurance Telemetry
---

## Overview

SSR software can run on Juniper branded appliances, whitebox hardware (certified or self-evaluated), or virtual environments. For software versions prior to SSR Version 6.0, router adoption relies on an on-premise conductor to assist in the onboarding and management. This document explains the process of enabling WAN Assurance telemetry and zero-touch provisioning (ZTP) for conductor-based deployments. This procedure assumes you **do not** already have an account, organization, or sites configured on the Mist portal. These items are required for SSR/Mist WAN Assurance.

:::important
Configuring WAN Assurance requires Administrator level privileges on all platforms, SSR and Mist.
:::

High Level Steps:
- Create an account on the Mist portal.
- Add your Organization.
- Create Sites.
- Register the Conductor with Mist.
- Assign routers to a Site.

For detailed information about Mist WAN Assurance, please refer to the [Mist WAN Assurance documentation](https://www.juniper.net/us/en/products/cloud-services/wan-assurance.html).
