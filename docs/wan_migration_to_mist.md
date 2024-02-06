---
title: Migrating a Router to Mist
sidebar_label: Migrating a Router to Mist
---

This document explains the process of migrating a Conductor-managed router to a Mist-managed environment. 

## Prerequisites

- The conductor and router are running version x.x.x or newer of the [Mist WAN Assurance plugin](link-to-install-doc). 
- The router was previously onboarded and connected to the Mist cloud using the [ZTP Onboarding to a Conductor workflow](config_wan_assurance.md). 
- For HA routers, each node should have a direct connection to the Mist cloud.
- The router must be online and connected to the cloud for the migration process to be initiated.
- The router is running a cloud-ready installation of SSR software, such as V6.0.0 or greater. 
- The router configuration must be re-created on the Mist cloud.
- The Mist cloud configuration should have the necessary components for establishing a successful cloud connection post migration.

:::warning
The migration operation will be service impacting.
:::

:::note
After upgrading to an image based software version, verify that the `mist-agent` is running. Use [Mist Agent Startup](add-link-here) to verify operation. 
:::

## Migrating a Standalone Router

Use the following preparation and configuration steps to complete migration. 

### Migration Process

1. Login to the Conductor as root. 
2. SSH to the router from the conductor.
3. Use the `harware-bootstrapper migrator` to perform the migration process. The options for using the script are shown below:

```
Usage: python -m hardware-bootstrapper migrator [OPTIONS]

  migrate the device from conductor managed to mist managed

Options:
  -v, --verbosity LVL  Either CRITICAL, ERROR, WARNING, INFO or DEBUG
  -l, --log-dir PATH   Log directory
  --verify             Only verify if device is migratable
  --dry-run            Perform a dry run. Log instead of making changes
  -f, --force          Skip confirmation
  --help               Show this message and exit.
```
#### 1. Run the Compatibility Check

This check verifies that the router is compatible for migration to Mist.

```
[root@t133-dut2 centos]# /usr/libexec/hardwareBootstrapper128t migrator --verify
Verifying 128T is up
Validing reverse ssh
Validing mist agent state
only verify flag present. Exiting
```

#### 2. Run the Migrator

Once you initiate this command, expect a loss of connectivity to the router from the conductor. The migrator will run some system checks, and then ask whether to proceed. 

- Run the command `/usr/libexec/hardwareBootstrapper128t migrator`
- The migrator will run system checks, and then ask whether to proceed. 
- Enter Y to proceed. 

```
[root@t133-dut2 centos]# /usr/libexec/hardwareBootstrapper128t migrator
Verifying 128T is up
Validing reverse ssh
Validing mist agent state
WARNING: This tool could break connection to your conductor and/or MIST. Only run this command if you know what you are doing.
Proceed? (y/n)
Cleaning migration backup directory
Backing up file: /etc/128technology/global.init to /etc/128T-hardware-bootstrapper/migration-backups
Backing up file: /etc/128technology/local.init to /etc/128T-hardware-bootstrapper/migration-backups
Backing up file: /etc/128T-hardware-bootstrapper/config.json to /etc/128T-hardware-bootstrapper/migration-backups
Backing up file: /etc/udev/rules.d/128-persistent-net.rules to /etc/128T-hardware-bootstrapper/migration-backups
invalid format returned for interfaces: 17
unable to find device map. using default: {'ethernet': [{'type': 'WAN', 'name': 'ge-0-0', 'description': '', 'bcpNetwork': {'standaloneBranch': {'name': 'lan1'}}, 'pciAddress': '0000:00:03.0', 'vmbusId': None}, {'type': 'LAN', 'name': 'ge-0-1', 'description': '', 'bcpNetwork': {'standaloneBranch': {'name': 'lan2'}}, 'pciAddress': '0000:00:04.0', 'vmbusId': None}, {'type': 'HASync', 'name': 'ge-0-2', 'description': '', 'bcpNetwork': {'standaloneBranch': {'name': 'lan3'}}, 'pciAddress': '0000:00:05.0', 'vmbusId': None}, {'type': 'HAFabric', 'name': 'ge-0-3', 'description': '', 'bcpNetwork': {'standaloneBranch': {'name': 'lan4'}}, 'pciAddress': '0000:00:06.0', 'vmbusId': None}]}
invalid format returned for interfaces: 17
Writing linux udev rules
Removing conductor address from global.init
Stopping and disabling salt-minion service
Populating Hardware Config
Restarting 128T-mist-agent service
```

#### 3. Unassign the Router from the Mist Site

1. Log in to your Mist Org.
2. Go to WAN Edges Inventory.
![Show Device](/img/mist-migration-unassign1.png)
3. Select your device.
4. From the More dropdown, select Assign to Site.
![Assign to Site](/img/mist-migration-unassign3.png)
5. In the Assign WAN Edges dialog, use the Site dropdown to select Unassigned. This unassigns your router from your conductor managed site. 
![Select Unassigned](/img/mist-migration-unassign4.png)
6. Select the Organization, and choose WAN Edge Templates from the pull out menu. 
7. Select the `Standalone_SSR_Migration` template from the list.
8. Click the Assign to Sites button.
9. Select your site from the list of sites, and click apply.
![Assign to Site](/img/mist-migration2.png)
10. From the Organization menu, select Inventory.
11. Choose your site.
12. Assign the device for migration back to your site and select `Manage configuration with Mist`.
![Manage with Mist](/img/mist-migration-unassign6.png)

#### 4. Installation

The device will start installing the necessary cloud components ato become a Mist-managed device. The SSR will restart several times during the process. 

You will be able to remote SSH into the device from the conductor until the migration is complete. 

If the SSR is currently running a package-based 6.x install, it will not be converted to image-based until the next upgrade.

