---
title: Rolling Back Software
sidebar_label: Rollback
---

Occasionally you may want or need to revert to a previously running version of 128T software. This is referred to as *rolling back*, and can be accomplished via either the standalone 128T installer application, or by using Automated Provisioner. (Note: as with upgrading, rolling back software using Automated Provisioner is only possible on routers managed by a 128T Conductor.)

#### Rolling Back using the Interactive Installer

1. Launch a Linux command prompt window on the node you wish to rollback.

:::note
To avoid SSH session timeout during installation, it is strongly recommended to use the Screen utility when performing a rollback in interactive mode.
:::

2. Create a screen and attach to it.
   ```
   screen -d -m -s <name-of-screen-session>
   screen -x <name-of-screen-session>
   ```
3. Enter the command to launch the interactive installer wizard.
   ```
   sudo install128t
   ```

4. Skip the step regarding the installation of a certificate by selecting *No* at the prompt.

5. The Interactive Installer will determine that 128T software is already installed. In the dialog box, navigate to the item labeled Roll Back and press the space bar to select the item.
   :::tip
   The version of software that will be running after executing the roll back function is displayed in the footer of the window.
   :::

6. Navigate to the OK button and press `enter` to select it.

7. Follow the on-screen prompts to complete the Roll Back operation.

8. Detach from the Screen utility.
   ```
   ctrl+a
   d
   ```

#### Rolling Back using Automated Provisioner

From the PCLI command line on your 128T conductor, issue the command:

```
send command rollback router [router name]
```

Confirming the action will initiate the rollback process.

### Uninstalling 128T

To uninstall 128T software and remove all configuration, libraries, and applications installed along with 128T, use the command `erase128t` from the Linux shell, as root user.

:::warning
This action is not revertible.
:::
