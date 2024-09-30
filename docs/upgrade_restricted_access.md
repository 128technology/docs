---
title: Upgrades with Restricted Internet Access
sidebar_label: Upgrades with Restricted Internet Access
---

In some secure deployments where networks are strictly internal to an organization, SSR devices do not have access to the internet to download updated software. In these networks, referred to as "air-gap" networks, it is necessary to manually download the SSR software on to a device such as a USB and perform an upgrade from inside the network. 

To identify a device in an air-gap network, SSR conductors and routers are configured in `offline-mode`, indicating they do not have internet access. This is defined in the `router > system > software-update > repository` configuration, using the `source-type` setting. Upgrading devices in this configuration is addressed in this document. 

Other configurable software access modes on a router:

- `conductor-only`: The router retrieves software versions only from the conductor. This is often used on internal networks where the routers do not have direct internet access. 
- `prefer-conductor`: The router will retrieve software versions from the conductor, but if the conductor is not available it will fall back to using the internet. 
- `internet-only` (default): The router will use Juniper's publicly hosted repositories for retrieving software images.

For information about configuring software access modes on a router, please see, [Software Access Modes](insert link here when it is done)

## How Does it Work?

In networks that do not have internet access, routers are configured to override the `source-type` setting and retrieve software directly from the conductor. 

### Setting Offline Mode

In the GUI, set `router > system > software-update > repository > offline-mode` to `true`. 

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
## Air-Gap Network Upgrade Process

There are two use cases for upgrades within an air-gap network and each is slightly different.

- A single-version 6.3.0 upgrade
- A mixed-version upgrade, where the conductor is V6.2.x and the routers are similar or earlier versions

### Single-Version 6.3.0 Upgrade

The following process is used to upgrade a Conductor and Conductor-managed Routers to **version 6.3.0** of the SSR software.

1. On a system that has internet access, use the [ISO Download procedure](intro_downloading_iso.md#downloading-an-iso) to download the `128T-6.3.0-107.r1.el7.OTP.v1.x86_64.iso` and the `SSR-6.3.0-xx.r1.el7.x86_64.ibu-v1.iso` software packages.
2. [Create a bootable USB](intro_creating_bootable_usb.md) drive from the SSR ISO.
2. Import the `128T-6.3.0-107.r1.el7.OTP.v1.x86_64.iso` package onto the conductor using the [`import iso`](cli_reference.md#import-iso) command. 
3. Upgrade the conductor using the [Conductor Upgrade procedure](upgrade_ibu_conductor.md).
4. Import the `SSR-6.3.0-xx.r1.el7.x86_64.ibu-v1.iso` package onto the conductor. The conductor will act as the software repository for the subsequent router upgrades. You do **not** install this package onto the conductor, only import it. 
5. Upgrade individual routers using the [Router Upgrade](upgrade_router.md) procedure.
6. Continue with [Import ISO](#import-iso).

### Mixed Version Upgrade

In this workflow, the conductor will be upgraded to 6.2.6, and the routers to 6.1.10. 

1. On a system that has internet access, use the [ISO Download procedure](intro_downloading_iso.md#downloading-an-iso) to download the `128T-6.3.0-107.r1.el7.OTP.v1.x86_64.iso` and the `SSR-6.3.0-xx.r1.el7.x86_64.ibu-v1.iso` software packages.
2. [Create a bootable USB](intro_creating_bootable_usb.md) drive from the SSR ISO.
2. Import the `128T-6.3.0-107.r1.el7.OTP.v1.x86_64.iso` package onto the conductor using the [`import iso`](cli_reference.md#import-iso) command. 
3. Upgrade the conductor using the [Conductor Upgrade procedure](upgrade_ibu_conductor.md).
4. Import the `SSR-6.3.0-xx.r1.el7.x86_64.ibu-v1.iso` package onto the conductor. The conductor will act as the software repository for the subsequent router upgrades. You do **not** install this package onto the conductor, only import it. 
5. Upgrade individual routers using the [Router Upgrade](upgrade_router.md) procedure.
6. Continue with [Import ISO](#import-iso).






** I'm starting to see holes in this scenario. 
 - Conductor managed deployments are all package based installs, so there will be no mixed deployments of 6.3 managing image based routers unless they are choosing to do that upgrade as part of this process, which does not make any sense; if they want to go to ib-routers, then install 6.3 across the boards.
 - If they are upgrading a conductor to 6.2.6 (pb) they will have to upgrade the routers to some PB install.  



### Import ISO

The [`import iso`](cli_reference.md#import-iso) command is used to import the SSR ISO onto a local repository, allowing the SSR to be upgraded without connecting to Juniper servers. When upgrading a conductor or when `offline-mode` is defined for a router, the ISO must be imported to the target conductor to perform the upgrade. 

Use the `filepath` argument to specify the exact location of the ISO. `hunt` will search for files that match the patterns `128T*.iso`, `SSR*.iso`, or `SSR*.tar`, and the corresponding checksum and signature files. These checksum and signature files are essential for security verification and are included as part of the `import iso` operation. To install the 6.3.0 software, the following file must be downloaded to the USB and imported onto the conductor:

- `SSR-6.3.0-xx.r1.el7.x86_64.ibu-v1.iso`

After the local software repository has been updated with the ISO, the upgrade can proceed.

#### Version Checks (outlier - 98% of router ibu's will be done in mist)

If you are upgrading or installing older image-based software on a router (versions 6.2.5 or older) you may need to include the checksum and signature files with the ISO when you download and import the software to the conductor. 

- `SSR-6.2.5-xx.r1.el7.x86_64.ibu-v1.iso`
- `SSR-6.2.5-xx.r1.el7.x86_64.ibu-v1.tar.sha256sum`
- `SSR-6.2.5-xx.r1.el7.x86_64.ibu-v1.tar.sha256sum.asc`

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
 Package:               128T-6.3.0-107.r1.el7
 SSR-IMG-release:       SSR-6.3.0-107.r1.el7.x86_64.ibu-v1
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
