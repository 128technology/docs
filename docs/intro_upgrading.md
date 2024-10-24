---
title: Upgrade Overview
sidebar_label: Upgrade Overview 
---

:::note
Please refer to the [Upgrade Considerations](intro_upgrade_considerations.md) before proceeding.
:::

Your SSR conductor or router must have internet access to download the latest software packages; however, we recognize that there are deployments where the SSR does not have internet access. In those cases you can use the SSR conductor as a repository (or proxy) to retrieve or store software images. For information about upgrading offline or air-gap network devices, refer to [Upgrades with Restricted Internet Access](upgrade_restricted_access.md).

For Upgrade procedures, refer to the appropriate section:

- [Upgrading the Conductor](upgrade_ibu_conductor.md)
- [Upgrading the Router](upgrade_router.md)
- [Upgrades with Restricted Internet Access](upgrade_restricted_access.md)
- [Legacy Upgrades](upgrade_legacy.md) Software versions prior to SSR 6.3.0

As with any upgrade activity, it is always prudent to create a backup of your current software configuration before initiating any upgrade activity.

Conductor and router upgrades may be performed from the GUI of the Conductor, the PCLI of the conductor, or in the case of an unmanaged router, from the router itself. 

:::note
The router upgrade process using the PCLI and the GUI is done in two stages: First, the software is downloaded, then it is installed.
:::

Prerequisites for upgrades include configuring a user with super user (sudo) privileges. **SSH Root login is not permitted.** If the existing version allows SSH Root login, it will be disabled during the upgrade. Systems that were installed using the OTP ISO have a **t128** user configured by default with `sudo` privileges. 

### Version Dependencies

The conductor `major.minor` version must be greater than or equal to the router version. The router version can not exceed the conductors `major.minor` version, but it can have a greater patch version. All [versions currently under support](about_support_policy.md) can be run on a router and managed by the conductor, provided that the conductor version is greater. Versions of software not under support *may* work, but are not guaranteed to do so.  

Examples:
- Conductor running version 6.2.6, managing Routers running version 6.2.5: Supported.
- Conductor running version 6.2.5, managing Routers running version 6.2.6: Supported.
- Conductor running version 6.3.0, managing Routers running version 6.1.10: Supported.
- Conductor running version 5.6.10, managing Routers running version 6.1.3; Not supported.
