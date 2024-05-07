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

With each of these settings, the conductor(s) require internet access, and the routers must be able to resolve internet hosted repositories. Because the access mode is configured on the router, your collection of routers can each use different preferences. For example, a router on the internet can use a Juniper repository, but another router managed by the same conductor sitting in an isolated environment can use the conductor.

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
                    repository
                        offline-mode true
                    exit
                exit
            exit
        exit
    exit
exit
```

### Import ISO

The [`import iso`](cli_reference.md#import-iso)command is used to import packages contained within an SSR ISO onto a local repository, allowing the SSR to be upgraded without connecting to Juniper servers. When upgrading a conductor or when `offline-mode` is defined for a router, the ISO must be imported to the target conductor to perform the upgrade. 

Use the `filepath` argument to specify the exact location of the ISO. `hunt` will search for files that match the patterns `128T*.iso`, `SSR*.iso`, or `SSR*.tar`, and the corresponding checksum and signature files. These checksum and signature files are essential for security verification and are required as part of the `import iso` operation. 

For example, in order to import and install the 6.3.0 software the following three files must be downloaded and saved to the same directory:

    - `SSR-6.3.0-xx.r1.el7.x86_64.ibu-v1.iso`
    - `SSR-6.3.0-xx.r1.el7.x86_64.ibu-v1.tar.sha256sum`
    - `SSR-6.3.0-xx.r1.el7.x86_64.ibu-v1.tar.sha256sum.asc` 

After the local software repository has been updated with the software from the ISO, the upgrade can proceed.

:::note
In an HA setup, when using offline-mode for routers to access the software from the conductors, the ISO must be imported to both conductors before performing the upgrade.
:::

### Selecting the Boot Volume

In instances where you are downloading and storing an SSR version for *router* upgrades, you can identify the boot volume (the disk volume where the image-based software is stored) from which the router will boot. 

To view the current boot volume, use the `show system version` command: 

```
admin@conductor-node-1.Conductor# show system version router RTR_WEST_COMBO node combo-west-1 detail
Thu 2024-05-02 14:03:28 UTC
Retrieving system version...

=================================================================
 Node: combo-west-1.RTR_WEST_COMBO
=================================================================
 Version:               6.3.0
 Status:                r1
 Build Date:            2024-05-01T21:25:38Z
 Build Machine:         releaseslave3.openstacklocal
 Build User:            jenkins
 Build Directory:       /i95code
 Hash:                  1d892d709c45409369048d129840b02e435b4e21
 Package:               128T-6.3.0-60.r1.el7
 SSR-IMG-release:       SSR-6.3.0-60.r1.el7.x86_64.ibu-v1
 ---> Volume ID:             b  <---
 ---> Selected Boot Volume:  b  <---
 Idle Volume:
   Version:               5.4.11
   Status:                unavailable
   Build Date:            2022-12-21T03:10:13Z
   Build Machine:         releaseslave4.openstacklocal
   Build User:
   Build Directory:
   Hash:
   Package:               128T-5.4.11-4.el7
   Volume ID:             a

Completed in 5.53 seconds
admin@conductor-node-1.Conductor#

```

Change the `Selected Boot Volume` using the command `set system software router <name> node <name> boot-volume {a|b}`.

Use the reboot command to boot into the specifed volume: `send command reboot router <name> node <name>`.








