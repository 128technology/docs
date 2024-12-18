---
title: Rollback and Reinstallation
sidebar_label: Rollback and Reinstallation
---

Occasionally you may need to revert to a previously running version of SSR software. This is referred to as *rolling back*, and can be accomplished via either the standalone SSR installer application, or by using Automated Provisioner. 

:::note
As with upgrading, rolling back software using Automated Provisioner is only possible on routers managed by an SSR Conductor.
:::

## Rollback Considerations

With an upgrade or installation of SSR v6.3.0, conductor rollbacks are performed using the `request system software revert` command from the conductor's PCLI. The `show system software revert` command to view the progress of a revert operation. On routers, it is recommended that upgrades are performed from the conductor's GUI. Router rollbacks must be performed from the PCLI. 

Beginning with SSR v6.3.0, the use of the interactive installer is not supported, or necessary. Software installation and upgrade activities are supported from the GUI or PCLI; rollback activities can only be performed from the the PCLI.

## Reinstallation

In some cases, you may have already qualified a version of firmware to run on your network. Due to network expansion or an RMA, you may need to add or replace a device that is preinstalled with firmware newer than what is currently running on your network. The SSR provides a process for an image-based reinstall to an SSR firmware version which is less than the firmware version on the target device.

### Reinstallation from Mist

In the Mist interface you have the option of selecting any available software version from the repository. Selecting the same or lower version of firmware than is currently installed initiates an SSR firmware reinstall to the requested version. An informational message is displayed, explaining the [limitations of reinstall](#limitations).

### Conductor-initiated Reinstallation

The following section describes the Reinstallation process from both the Conductor web interface and the PCLI.

#### Web Interface

The Conductor web interface displays a checkbox to allow reinstallation. When selected, the UI displays **all** versions in the selection dropdown. If you select a version less than or equal to the router’s current version, the reinstallation is initiated and proceeds in the same manner as an upgrade.

#### PCLI

Use the `request system software reinstall` command to identify the image-based target version of firmware to be installed. To display all software versions available for reinstallation, use the `skip-version-check` flag with `show system software available`.

The reinstallation status is visible under **Install Type** in the PCLI using `show assets`.

:::note
The states displayed in the `status` column under `show assests` have changed. The old and new states are mapped below. 

| Old | New |
| --- | ---|
| Disconnected | Disconnected |
| Connected | Synchronizing or Resynchronizing |
| Running | Synchronized |
:::

```
admin@t106-dut1.Conductor# show assets
Mon 2024-09-09 18:14:18 UTC
Retrieving assets...

=========== =========== ===================== ================== ============== ================ ================ ========
 Router      Node        Asset Id              SSR Version        Install Type   Status           Time in Status   Errors
=========== =========== ===================== ================== ============== ================ ================ ========
 Conductor   t106-dut1   t106-dut1.novalocal   6.3.0-107.r1.el7   Image          Synchronized     34m 44s               0
             t106-dut2   t106-dut2.novalocal   6.3.0-107.r1.el7   Image          Synchronized     21m 19s               0
```

### Limitations

The Reinstallation process has the following limitations:

- Configuration that enables features not present in the target SSR version will no longer apply after a reinstall.

- System state and configuration outside of the datamodel (for example; analytics, logs, custom salt states, user-installed packages) will not be preserved after a reinstall, except for those required for basic system functionality and cloud connectivity.

- SSR plugins may be downgraded (but not removed) as part of a reinstall, if the currently installed plugins are not compatible with the target SSR version.

## Legacy Rollback

Use the information below when rolling back software versions prior to 6.3.0. 

Rollbacks are not supported if configuration changes are made after the conductor or router are updated to the target version. For example, if the conductor and/or router has been upgraded to version 6.2, and a new feature is configured on the target conductor or router, rolling back to an earlier version of software may result in loss of configuration or router functionality.

### Rolling Back using Automated Provisioner

From the PCLI command line on your conductor, issue the command:

```
send command rollback router [router name]
```
Confirming the action will initiate the rollback process.

### Rolling Back using the Interactive Installer

For software versions prior to SSR v6.3.0, **conductors** can only be rolled back with the interactive installer. Shutting down the salt-minion is required.

:::important
Rolling back an earlier version of the SSR software on a router that is managed by a conductor using the interactive installer `install128t` may result in the system becoming unresponsive. It is highly recommended that managed router rollbacks be performed through the conductor UI. Manual upgrades and rollbacks may not be resilient to failures.
:::

For all software versions prior to SSR v6.3.0 in a situation where a rollback must be performed with the interactive installer, the salt-minion must be shut down. This is done on the target node using the following command:

`sudo systemctl stop salt-minion`

1. Launch a Linux command prompt window on the node you wish to rollback.

:::note
To avoid SSH session timeout during installation, it is strongly recommended to use the Screen utility when performing a rollback in interactive mode.
:::

2. Create a screen and attach to it.
   ```
   screen -d -m -s <name-of-screen-session>
   screen -x <name-of-screen-session>
   ```
3. Shut down the salt-minion on the target node using the following command:
   ```
   sudo systemctl stop salt-minion
   ```
4. Enter the command to launch the interactive installer wizard.
   ```
   sudo install128t
   ```

5. Skip the step regarding the installation of a certificate by selecting *No* at the prompt.

6. The Interactive Installer will determine that SSR software is already installed. In the dialog box, navigate to the item labeled Roll Back and press the space bar to select the item.
   :::tip
   The version of software that will be running after executing the roll back function is displayed in the footer of the window.
   :::

7. Navigate to the OK button and press `enter` to select it.

8. Follow the on-screen prompts to complete the Roll Back operation.

9. Detach from the Screen utility.
   ```
   ctrl+a
   d
   ```
