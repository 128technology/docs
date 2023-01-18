---
title: Rolling Back Software
sidebar_label: Rollback
---

Occasionally you may want or need to revert to a previously running version of SSR software. This is referred to as *rolling back*, and can be accomplished via either the standalone SSR installer application, or by using Automated Provisioner. (Note: as with upgrading, rolling back software using Automated Provisioner is only possible on routers managed by an SSR Conductor.)

## Rollback Considerations

Rollbacks are not supported if configuration changes are made after the conductor or router are updated to the target version. For example, if the conductor and/or router has been upgraded to version 5.4, and a new feature such as Traffic Engineering is configured on the target conductor or router, rolling back to an earlier version of software may result in loss of configuration or router functionality.

If rolling back must be done with the interactive installer (below), the salt-minion must be shutdown.
This is done on the target node using the following command:

`sudo systemctl stop salt-minion`

Conductors can only be rolled back with the interactive installer. Shutting down the salt-minion is required.

### Rolling Back using Automated Provisioner

From the PCLI command line on your conductor, issue the command:

```
send command rollback router [router name]
```
Confirming the action will initiate the rollback process.

### Rolling Back using the Interactive Installer

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
