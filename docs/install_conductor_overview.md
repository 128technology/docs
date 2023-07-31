---
title: Conductor Overview
sidebar_label: Conductor Overview
---
The Conductor is an SSR instance that is used to manage the SSR Routers you configure within the same Authority. It offers centralized administration, provisioning, monitoring, analytics, and lifecycle management of the SSR routers. 

The Authority is where system-wide data is stored. Conceptually, the Authority represents the complete set of all SSR Routers managed under a single organizational entity. Service configuration, which represents the cornerstone of the SSR Router’s worldview, is part of the set of global data within an authority. Services represent specific applications that a network delivers; e.g., web services, database services, or voice/video services. Each Authority is uniquely named, in the same way a domain name is unique.

The [Conductor Deployment](bcp_conductor_deployment.md) section is a great starting point before installing and configuring your conductor. This document includes best practices for conductor deployment, creating a topology, example configurations, and conductor redundancy. It is recommended to review this section before installing and configuring the conductor.

The following Conductor installation processes are covered in this guide:

- [Standalone Conductor](single_conductor_install.mdx)
- [High Availability](ha_conductor_install.mdx)
- [Import Configurations to the Conductor](single_conductor_config.md)
- [Conductor Software Upgrades](conductor_upgrade.md)
<!-- markdown-link-check-disable-next-line -->
- [Conversion of an SSR Router to a Conductor](single_conductor_install#conductor-conversion)

Cloud deployments are not covered in this guide. Please see [Conductor High Availability for Cloud Deployments](intro_initialize_HA_conductor.md) for more information.
