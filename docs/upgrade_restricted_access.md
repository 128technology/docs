---
title: Upgrades with Restricted Internet Access
sidebar_label: Upgrades with Restricted Internet Access
---

The standard upgrade workflow is for individual instances of SSR software to download upgrades directly from mirror servers hosted and managed by Juniper on the public internet. However, we recognize that there are deployments where the SSR does not have internet access. In this case, you can configure the routers to retrieve software from a conductor.

There are four configurable software access modes on a router:

- `conductor-only`: The router retrieves software versions only from the conductor.

- `prefer-conductor`: The router will retrieve software versions from the conductor, and fall back to using the internet.
- `internet-only` (default): The router will use Juniper's publicly hosted repositories for retrieving software images.
- `offline-mode`: This mode is used for conductors and routers that do not have internet access - "air-gap" networks.

In the `router > system > software-update > repository` configuration, use the `source-type` setting to define the software update repository to one of the first three values; `conductor-only`, `prefer-conductor`, or `internet-only`.

With each of these settings, the conductor(s) require internet access, and the routers must be able to resolve internet hosted repositories. Because this is a router setting, your collection of routers can each use different preferences. For example, a router on the internet can use a Juniper repository, but another router managed by the same conductor sitting in an isolated environment can use the conductor.

### Offline Mode

For routers that have no access to the internet, set `router > system > software-update > repository > offline-mode` to `true`. This overrides the `source-type` setting and directs the routers to retrieve software from the conductor. 

For networks that do not have internet access, routers can be configured to override the `source-type` setting and retrieve software directly from the conductor. In the GUI, set `router > system > software-update > repository > offline-mode` to `true`. 

**From the PCLI:**
```
config
    authority
        router
            system
                software-update
                    repository <name>
                        offline-mode
                        true
                    exit
                exit
            exit
        exit
    exit
exit
```

### Import ISO

The `import iso` command is used to import packages contained within an SSR ISO onto a local repository, allowing the SSR to be upgraded without connecting to Juniper servers. When upgrading a conductor or when `offline-mode` is defined for a router, the ISO must be imported to the target conductor to perform the upgrade. 

Use the [import iso](cli_reference.md#import-iso) command to specify the exact `filepath` to the ISO, or to specify `hunt` which searches the disk for a file that matches the pattern `128T*.iso` (except in the following directories `/boot`, `/dev`, `/proc`, and `/sys`).

After the local software repository has been updated with the software from the ISO, the upgrade can proceed.

:::note
In an HA setup, when using offline-mode for routers to access the software from the conductors, the ISO must be imported to both conductors before performing the upgrade.
:::
