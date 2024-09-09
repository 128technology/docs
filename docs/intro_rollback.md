---
title: Rolling Back Software
sidebar_label: Rollback
---

Occasionally you may need to revert to a previously running version of SSR software. This is referred to as *rolling back*, and can be accomplished via either the standalone SSR installer application, or by using Automated Provisioner. 

:::note
As with upgrading, rolling back software using Automated Provisioner is only possible on routers managed by an SSR Conductor.
:::

## Rollback Considerations

With an upgrade or installation of SSR v6.3.0, conductor rollbacks are performed using the `request system software revert` command from the conductor's PCLI. The `show system software revert` command to view the progress of a revert operation. On routers, it is recommended that upgrades are performed from the conductor's GUI. Router rollbacks must be performed from the PCLI. 

Beginning with SSR v6.3.0, the use of the interactive installer is not supported, or necessary. Software installation and upgrade upgrade activities are supported from the GUI or PCLI; rollback activities can only be performed from the the PCLI.

## Legacy Rollback

Use the information below when rolling back software versions prior to 6.3.0. 

Rollbacks are not supported if configuration changes are made after the conductor or router are updated to the target version. For example, if the conductor and/or router has been upgraded to version 5.4, and a new feature such as Traffic Engineering is configured on the target conductor or router, rolling back to an earlier version of software may result in loss of configuration or router functionality.

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
