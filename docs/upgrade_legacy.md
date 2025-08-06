---
title: Legacy Upgrades
sidebar_label: Legacy Upgrades
---

This guide focuses on legacy software upgrades - those prior to version 6.3.0.

:::note
Please refer to the [Upgrade Considerations](intro_upgrade_considerations.md) before proceeding.
:::

The SSR conductor or router must have internet access to download the latest software packages; however, we recognize that there are deployments where the SSR does not have internet access. In those cases you can use the SSR conductor as a repository (or proxy) to retrieve or store software images. For information about upgrading offline or air-gap network devices, refer to [Upgrades with Restricted Internet Access](upgrade_restricted_access.md).

As with any upgrade activity, it is always prudent to create a backup of your current software configuration before initiating any upgrade activity.

With software versions prior to 6.3.0, there are three standard ways of upgrading routers:

- Using the conductor's [Web Interface](#using-the-web-interface) to initiate the upgrade
- Using the conductor's [PCLI](#using-the-pcli) to initiate the upgrade
- Using the [Interactive Installer](#upgrading-using-the-interactive-installer) from the Linux shell

:::note
The router upgrade process using the PCLI and the GUI is done in two stages: First, the software is downloaded, then it is installed. Use the `install128t` application steps through both of these processes.
:::

Prerequisites for upgrades now include configuring a user with super user (sudo) privileges. **SSH Root login is not permitted.** If the existing version allows SSH Root login, it will be disabled during the upgrade. When a system is installed using the OTP ISO, a **t128** user is configured with `sudo` privileges. 

#### Version Dependencies

**SSR-6.3.5 Software and Version Compatibility** 

Beginning with SSR-6.3.5, conductor-managed **routers** running SSR-6.3.5 must be managed by conductors running SSR-6.3.5 or higher software. Internal updates to the software prevent successful management from a lower patch version on the conductor when 6.3.5 is installed on the router. For example:

- Conductor: SSR-6.3.5 / Router: SSR-6.3.5 Compatible
- Conductor: SSR-6.3.5+ / Router: SSR-6.3.5 Compatible
- Conductor: SSR-6.3.5 / Router: SSR-6.2.6 Compatible
- Conductor: SSR-6.3.4 / Router: SSR-6.3.5 Not Compatible
- Conductor: SSR-6.2.9 / Router: SSR-6.3.5 Not Compatible

#### General Dependency Information

The conductor `major.minor.patch` version must be greater than or equal to the router version. All [versions currently under support](about_support_policy.md) can be run on a router and managed by the conductor, provided that the conductor version is greater. Versions of software not under support *may* work, but are not guaranteed to do so.  

Examples:
- Conductor running version 6.0.10, managing Routers running version 6.0.5: Supported.
- Conductor running version 5.6.7, managing Routers running version 5.6.17: Not supported.
- Conductor running version 6.2.5, managing Routers running version 5.6.17: Supported.
- Conductor running version 5.6.8, managing Routers running version 6.1.3; Not supported.

## Upgrading Software Versions Prior to 6.3.0

Use the following procedure to upgrade your software versions earlier than 6.3.0.

### Using the Web Interface

1. Navigate to the Router page in the Conductor's GUI. Routers that have available upgrades are indicated with the green **Upgrade SSR** icon (the arrow within a circle) in the router list.
2. Click on the **Upgrade SSR** icon next to your router. A list of upgrade and download options appears. This list is filterable if the list grows large.
3. Click on the target release in the Available Downloads section of the list. 
4. Confirm the operation to begin downloading the software. Clicking on the router in the router list shows download progress.
5. Once complete, click the **Upgrade SSR** icon again, and select the target software release from the Available Upgrades list. Confirm this operation to begin the upgrade process.

The Automated Provisioner upgrades both nodes in a high availability router in series to minimize/avoid downtime. Despite this, it is still recommended to perform upgrade activity during periods of low traffic or maintenance windows.

### Using the PCLI

Before upgrading the SSR Software from the PCLI, use the following procedure to stop the the software.

1. Launch a Linux shell window.
2. Execute the command: 

   `sudo systemctl stop 128T`

3. Verify that the software has stopped by executing the command:

   `sudo systemctl status 128T`

   Result: The software is listed as inactive (dead).

4. Stop the salt-minion.

   `sudo systemctl stop salt-minion`
   
5. Close the Linux shell.

Use the steps below to download and upgrade SSR software if you are running earlier software versions.

#### Log into the PCLI

As an administrator-level user, log into the conductor's PCLI.

1. Use the command `show assets` to list the devices managed by this conductor, and the software revision each asset is currently running.

2. For a given asset, use the command `show asset [asset ID]` or `show asset software router [router name]`  to view the available software upgrades for that asset. The list will be in the section labeled "Available for Download" at the end of the output.
   :::note
   If there are software releases absent from the list that you are confident should appear, use the command `send command yum-cache-refresh router [router name]` to refresh the software list.
   :::

3. Type `send command download router [your router name] [software version]`. You can monitor the progress by using the `show asset` and/or `show asset [asset ID]` command, which will indicate Automated Provisioner status (e.g., *downloading*).

4. Once the download is complete, use the command `send command upgrade router [your router name]` to initiate the upgrade process.

The conductor's _automated provisioner_ will upgrade both nodes in a high availability router in series to minimize/avoid downtime. Despite this, it is still recommended to perform upgrade activity during periods of low traffic or maintenance windows.

### Upgrading Using the Interactive Installer

The Interactive Installer can be used to upgrade a conductor or a router for versions of SSR software prior to 6.3.0, and are performed from a linux shell. 

1. Launch a Linux command prompt window on the node you wish to upgrade.

   :::note
   If you are running an older version of the Installer (prior to version 2.7.0), it is strongly recommended that you first upgrade to the latest version of the Installer. If the upgrade is not possible, and you are running an Installer version prior to 2.7.0, use the Screen utility when performing an upgrade in interactive mode to avoid SSH session timeout. Installer versions 2.7.0 and above do not need to use the Screen utility.

   To upgrade the installer, run `dnf update 128T-installer` from the linux prompt.
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

   **Result**: The SSR splash screen appears.
   :::note
   The `install128t` application checks for an available update. If a newer version is detected, it requests that you update. 
   :::

5. Press the **enter** key to select **Begin** and start the installation wizard.

   :::note
   Use the spacebar to move between entries in the installer windows.
   :::

6. When prompted, select **Upgrade**.
   
   ![Conductor Upgrade](/img/conductor_upgrade1.png)

   **Result**: The application queries the SSR software repository for the latest software.

7. Select the desired software version from the list of available options.

   ![Version Selection dialog](/img/conductor_upgrade2_version.png)

8. Confirm the upgrade to begin the upgrade process.

   ![Confirm Upgrade](/img/conductor_upgrade3_confirm.png)

9. Once the upgrade is complete, press the **enter** key to select **Yes** to start your software.
   :::note
   Your output may vary based upon the nature of the upgrade, occasion, various packages, and dependencies that SSR requires as part of the SSR Routing Software upgrade.
   :::
   
9. Detach from the Screen utility (if applicable).
   ```
   ctrl+a
   d
   ```
