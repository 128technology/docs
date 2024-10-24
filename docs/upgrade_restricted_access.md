---
title: Upgrades with Restricted Internet Access
sidebar_label: Upgrades with Restricted Internet Access
---

In some secure deployments where networks are strictly internal to an organization, SSR devices do not have access to the internet to download updated software. In these networks, referred to as "air-gap" networks, it is necessary to manually download the SSR software on to a device such as a USB and perform an upgrade from inside the network. 

To identify a device in an air-gap network, SSR conductors and routers are configured in `offline-mode`, indicating they do not have internet access. This is defined in the `router > system > software-update > repository` configuration, using the `source-type` setting. Upgrading devices in this configuration is addressed in this document. 

Other configurable software update modes on a router:

- `conductor-only`: The router retrieves software versions only from the conductor. This is often used on internal networks where the routers do not have direct internet access. 
- `prefer-conductor`: The router will retrieve software versions from the conductor, but if the conductor is not available it will fall back to using the internet. 
- `internet-only` (default): The router will use Juniper's publicly hosted repositories for retrieving software images.

For information about configuring software access modes on a router, please see [`software-update`](config_reference_guide.md#software-update)

## How Does It Work?

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

The following are use cases for upgrades within an air-gap network.

- [Single-Version 6.3.0 Upgrade](#single-version-630-upgrade).
- [Mixed Version Upgrade](#mixed-version-upgrade), where the conductor is upgraded to version 6.3 and the routers are upgraded to earlier image-based versions, or left to be upgraded later.
- [Package-based Software Upgrade](#package-based-software-upgrade).

:::note
Use these procedures for upgrades only. When performing an initial installation of version 6.3.x software or greater, the image-based SSR ISO is required. 
:::

### Single-Version 6.3.0 Upgrade

The following process is used to upgrade a Conductor and Conductor-managed Routers to **version 6.3.0** of the SSR software. Beginning with SSR software version 6.3.0, a conductor can manage routers running image-based software installations. 

<!-- markdown-link-check-disable -->
1. On a system that has internet access, use the [ISO Download procedure](intro_downloading_iso.md#downloading-an-iso) to download the `128T-6.3.0-107.r1.el7.OTP.v1.x86_64.iso` from the [6.3 Package Based ISO Download](https://software.128technology.com/artifactory/list/generic-128t-isos-release-local/6.3/) page. 

2. [Create a bootable USB](intro_creating_bootable_usb.md) drive from the downloaded ISO.

3. Import the `128T-6.3.0-107.r1.el7.OTP.v1.x86_64.iso` ISO onto the conductor using the [`import iso`](#import-iso) command. 

4. Upgrade the conductor using the [Conductor Upgrade procedure](upgrade_ibu_conductor.md).

5. Download the `SSR-6.3.0-107.r1.el7.x86_64.ibu-v1.iso` from the [SSR Software Images](https://software.128technology.com/artifactory/list/generic-128t-install-images-release-local) page. <!-- markdown-link-check-enable --> 

6. [Create a bootable USB](intro_creating_bootable_usb.md) drive from the SSR ISO.

7. Import the `SSR-6.3.0-xx.r1.el7.x86_64.ibu-v1.iso` ISO onto the conductor. The conductor will act as the software repository for the subsequent router upgrades. Do **not** install this package onto the conductor, only import it. 

8. Upgrade individual routers using the [Router Upgrade](upgrade_router.md) procedure.

:::note
The process to upgrade a **conductor from a version less than 6.3.0 to 6.3.0 or greater** requires the use of the `128T-6.3.X-XX.r1.el7.OTP.v1.x86_64.iso` package based 128T ISO. After the initial upgrade to 6.3.X, all future upgrades will only require the import of the image-based SSR ISO; for example, `SSR-6.3.3-1.r1.el7.x86_64.ibu-v1.iso`. 
:::

### Mixed Version Upgrade 

If you are upgrading to version 6.3.0 on the Conductor and wish to upgrade the routers, note that after the conductor is upgraded to 6.3.x, routers upgraded to 6.1 or greater will require the image-based SSR ISO. In versions prior to version 6.3.0, image-based software running on conductor-managed routers was not supported, however version 6.3.0 allows your conductor to manage routers running **both** image-based and package-based software. 

The following workflow demonstrates upgrading a conductor to version 6.3.0, and a router to version 6.1.10.

:::note
The process to upgrade a **conductor to 6.3.0** requires the use of the `128T-6.3.0-107.r1.el7.OTP.v1.x86_64.iso`. After the initial upgrade to 6.3.0, all future upgrades will only require the import of the `SSR-6.3.X-XX.r1.el7.x86_64.ibu-v1.iso`. 
:::

<!-- markdown-link-check-disable -->
1. On a system that has internet access, use the [ISO Download procedure](intro_downloading_iso.md#downloading-an-iso) to download the `128T-6.3.0-107.r1.el7.OTP.v1.x86_64.iso` from the [SSR ISO Download](https://software.128technology.com/artifactory/list/generic-128t-isos-release-local) page. 

2. [Create a bootable USB](intro_creating_bootable_usb.md) drive from the SSR ISO.

3. Import the `128T-6.3.0-107.r1.el7.OTP.v1.x86_64.iso` ISO onto the conductor using the [`import iso`](#import-iso) command. 

4. Upgrade the conductor using the [Conductor Upgrade procedure](upgrade_ibu_conductor.md).

5. Navigate to the [SSR Software Images](https://software.128technology.com/artifactory/list/generic-128t-install-images-release-local) page, identify the software image version you will use to upgrade the target router or routers, and download it. <!-- markdown-link-check-enable -->

:::note
If you are upgrading or installing earlier image-based software on a router (versions 6.2.5 or earlier) you will need to include the checksum and signature files with the ISO when you download and import the software to the conductor.
:::

 For example, if you are upgrading a router to SSR Version 6.1.10, you will need to download the following files:

 - `SSR-6.1.10-8.lts.el7.x86_64.ibu-v1.iso`
 - `SSR-6.1.10-8.lts.el7.x86_64.ibu-v1.tar.sha256sum`
 - `SSR-6.1.10-8.lts.el7.x86_64.ibu-v1.tar.sha256sum.asc`

6. Copy the files to a USB that has an EXT4 file system.

7. Plug the USB in to the Conductor and mount the USB. 

8. Import the ISO, checksum, and signature file package you downloaded in step 5 onto the conductor. The conductor will act as the software repository for the subsequent router upgrades. Do **not** install these files onto the conductor, only import them.  

9. Upgrade individual routers using the [Router Upgrade](upgrade_router.md) procedure.

:::note
In an HA setup, when using offline-mode for routers to access the software from the conductors, the ISO must be imported to both conductors before performing the upgrade.
:::

### Package-based Software Upgrade

For upgrades of Conductor and Conductor-managed routers to software versions prior to 6.3.0, the package-based ISO's are used. 

In this example workflow, the conductor will be upgraded to 6.2.6, and the routers to 6.1.10. 
<!-- markdown-link-check-disable -->
1. On a system that has internet access, use the [ISO Download procedure](intro_downloading_iso.md#downloading-an-iso) to download the `128T-6.2.6-15.sts.el7.OTP.v1.x86_64.iso` software package from the [128T package-based ISO Download](https://software.128technology.com/artifactory/list/generic-128t-isos-release-local) page. 

2. [Create a bootable USB](intro_creating_bootable_usb.md) drive from the SSR ISO.

3. Plug the USB into your device.

4. Import the `128T-6.2.6-15.sts.el7.OTP.v1.x86_64.iso` package onto the conductor using the [`import iso`](#import-iso) command. 

5. Upgrade the conductor using the [Conductor Upgrade procedure](upgrade_ibu_conductor.md).

6. Download the `128T-6.1.10-8.lts.el7.OTP.v1.x86_64.iso` software package from the [SSR ISO Download](https://software.128technology.com/artifactory/list/generic-128t-isos-release-local) page. <!-- markdown-link-check-enable -->

7. Import the `128T-6.1.10-8.lts.el7.OTP.v1.x86_64.iso` package onto the conductor using the [`import iso`](#import-iso) command. The conductor will act as the software repository for the subsequent router upgrades. You do **not** install this package onto the conductor, only import it. 

8. Upgrade individual routers using the [Router Upgrade](upgrade_router.md) procedure.

### Import ISO

The [`import iso`](cli_reference.md#import-iso) command is used to import the SSR ISO onto a local repository, allowing the SSR to be upgraded without connecting to Juniper servers. When upgrading a conductor or when `offline-mode` is defined for a router, the ISO must be imported to the target conductor to perform the upgrade. 

`import iso [check-rpm-signature <check-rpm-signature>] [force] [verbose] {hunt | filepath <filepath>}`

Use the `filepath` argument to specify the exact location of the ISO. `hunt` will search for files that match the patterns `128T*.iso`, `SSR*.iso`, or `SSR*.tar`, and the corresponding checksum and signature files. These checksum and signature files are essential for security verification and are included as part of the `import iso` operation. To install the 6.3.0 software, the following file must be downloaded to the USB and imported onto the conductor:

- `SSR-6.3.0-107.r1.el7.x86_64.ibu-v1.iso`

After the local software repository has been updated with the ISO, the upgrade can proceed.
