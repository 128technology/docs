---
title: Upgrading the SSR Networking Platform
sidebar_label: Upgrading
---

:::note
If you are upgrading to version 5.3 or higher of the SSR software, please refer to the [Upgrade Considerations](intro_upgrade_considerations.md) before proceeding.
:::

Your SSR router or conductor must have internet access to download the latest software packages; for deployments where the SSR router does not have internet access, you can use the SSR conductor as a repository (or proxy) to retrieve software images. As with any upgrade activity, it is always prudent to create a backup of your current software configuration before initiating any upgrade activity.

There are three standard ways of upgrading routers:

- Using the conductor's PCLI to initiate the upgrade
- Using the conductor's GUI to initiate the upgrade
- Manually upgrading a router by invoking the `install128t` application from the Linux shell

:::note
The router upgrade process using the PCLI and the GUI is done in two stages: First, the software is downloaded, then it is installed. Use the `install128t` application steps through both of these processes.
:::

Prerequisites for upgrades now include configuring a user with super user (sudo) privileges. **SSH Root login is not permitted.** If the existing version allows SSH Root login, it will be disabled during the upgrade. When a system is installed using the OTP ISO, a "t128" user is configured with sudo privileges. 

### Version Dependencies

The conductor `major.minor` version must be greater than or equal to the router version. The router version can not exceed the conductors `major.minor` version, but it can have a greater patch version. All [versions currently under support](about_support_policy.md) can be run on a router and managed by the conductor, provided that the conductor version is greater. Versions of software not under support *may* work, but are not guaranteed to do so.  

Examples:
- Conductor running version 5.3.0, managing Routers running version 5.1.1: Supported.
- Conductor running version 5.2.0, managing Routers running version 5.2.2: Supported.
- Conductor running version 5.2.1, managing Routers running version 4.5.13: Supported.
- Conductor running version 4.5.13, managing Routers running version 4.2.9: Not supported, but may work.

### Stopping the SSR Software

Before upgrading the SSR Software, use the following procedure to stop the the software.

1. Launch a Linux shell window.
2. Execute the command: 

   `sudo systemctl stop 128T`

3. Verify that the software has stopped by executing the command:

   `sudo systemctl status 128T`

   Result: The software is listed as inactive (dead).

4. Stop the salt-minion.

   `sudo systemctl stop salt-minion`
   
5. Close the Linux shell.

## Upgrading the Conductor 
Use the following procedures to upgrade a Conductor from the GUI or using the Interactive Installer (linux shell).

### Upgrade using the GUI

1. Select **Conductor** under Authority.
2. In the **Node: Conductor** panel, select the **Upgrade SSR** icon (the arrow within a circle). This icon displays green when upgrades are available. 
3. In the **Upgrade SSR** window, use the drop down to select the SSR version for the upgrade. 
4. Click **Proceed**.

The Upgrade screen displays the Raw Log with the upgrade progress. Once the upgrade is complete, the Conductor is restarted and the GUI is refreshed. 

### Using the Interactive Installer

:::important
For systems with both primary and secondary conductors, it is a best practice to upgrade only one conductor at a time. 
:::

Use the [Interactive Installer](#upgrading-using-the-interactive-installer) procedure to upgrade the conductor from a linux shell. 

## Upgrading a Router 
Use the following procedures to upgrade a Router from either the GUI or the PCLI.

### Upgrade using the Conductor's PCLI

For routers managed by an SSR Conductor, upgrades can be initiated via the SSR conductor's PCLI. This upgrade process is completed in two stages: *download* followed by *upgrade*.

As an administrator-level user, log into the conductor's PCLI.

1. Use the command `show assets` to list the devices managed by this conductor, and the software revision each asset is currently running.

2. For a given asset, use the command `show asset [asset ID]` or `show asset software router [router name]`  to view the available software upgrades for that asset. The list will be in the section labeled "Available for Download" at the end of the output.
   :::note
   If there are software releases absent from the list that you are confident should appear, use the command `send command yum-cache-refresh router [router name]` to refresh the software list.
   :::

3. Type `send command download router [your router name] [software version]`. You can monitor the progress by using the `show asset` and/or `show asset [asset ID]` command, which will indicate Automated Provisioner status (e.g., *downloading*).

4. Once the download is complete, use the command `send command upgrade router [your router name]` to initiate the upgrade process.

The conductor's _automated provisioner_ will upgrade both nodes in a high availability router in series to minimize/avoid downtime. Despite this, it is still recommended to perform upgrade activity during periods of low traffic or maintenance windows.

### Upgrade using the Conductor's GUI

Similar to the process for upgrading using the PCLI, the upgrade process using the GUI is done in two stages: *download* and *upgrade*.

1. Navigate to the Router page in the Conductor's GUI. Routers that have available upgrades are indicated with the green **Upgrade SSR** icon (the arrow within a circle) in the router list.
2. Click on the **Upgrade SSR** icon next to your router. A list of upgrade and download options appears. This list is filterable if the list grows large.
3. Click on the target release in the Available Downloads section of the list. 
4. Confirm the operation to begin downloading the software. Clicking on the router in the router list shows download progress.
5. Once complete, click the **Upgrade SSR** icon again, and select the target software release from the Available Upgrades list. Confirm this operation to begin the upgrade process.

The Automated Provisioner upgrades both nodes in a high availability router in series to minimize/avoid downtime. Despite this, it is still recommended to perform upgrade activity during periods of low traffic or maintenance windows.

## Upgrading using the Interactive Installer
The Interactive Installer can be used to upgrade a conductor or a router.

1. Launch a Linux command prompt window on the node you wish to upgrade.

   :::note
   If you are running an older version of the Installer (prior to version 2.7.0), it is strongly recommended that you first upgrade to the latest version of the Installer. If the upgrade is not possible, and you are running an Installer version prior to 2.7.0, use the Screen utility when performing an upgrade in interactive mode to avoid SSH session timeout. Installer versions 2.7.0 and above do not need to use the Screen utility.

   To upgrade the installer run `dnf update 128T-installer` from the linux prompt.
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

## Routers with Restricted Internet Access

The standard upgrade workflow is for individual instances of SSR software to download software upgrades directly from mirror servers hosted and managed by Juniper on the public internet. Occasionally, SSR routers are deployed in locations with restricted or no access to the internet. In this case, you can configure the routers to retrieve software from a conductor.

Within a given router's configuration, at `router > system > software-update > repository`, you can configure the `source-type` setting to one of three values:

- `conductor-only`: The router retrieves software versions only from the conductor.

  :::note 
  The conductor(s) require internet access, and the routers must be able to resolve internet hosted repositories.
  :::
- `prefer-conductor`: The router will retrieve software versions from the conductor, and fall back to using the internet
- `internet-only` (default): The router will use Juniper's publicly hosted repositories for retrieving sofwtare images

:::note
Because this is a router setting, your collection of routers can each use different preferences. For example, a router on the internet can use a Juniper repository, but another router managed by the same conductor sitting in an isolated environment can use the conductor.
:::

For routers that have no access to the internet, set `router > system > software-update > repository > offline-mode` to `true`. This overrides the `source-type` leaf.

The `import iso` command is used to import packages contained within an SSR ISO onto a local yum repository, allowing the SSR to be upgraded without connecting to 128 Technology servers. 
:::note
In an HA setup, when using offline-mode for routers to access the software from the conductors, the ISO must be imported to both conductors before performing the upgrade.
:::

The [import iso](cli_reference.md#import-iso) command allows a user to specify the exact `filepath` to the ISO, or to specify `hunt` which searches the disk for a file that matches the pattern `128T*.iso` (except in the following directories `/boot`, `/dev`, `/proc`, and `/sys`).

This feature works on either the Conductor or the Routers. It can be combined with the Conductor Hosted Repos feature where the ISO is imported to the Conductor and then the Routers use the Conductor as the yum repository to download SSR packages.

Once the local software repository has been updated with the software from the ISO, the upgrade can proceed using your preferred method.
