---
title: Upgrading the 128T Networking Platform
sidebar_label: Upgrading
---

Your 128T router or conductor must have internet access to download the latest software packages; for deployments where the 128T router does not have internet access, you can use the 128T conductor as a repository (or proxy) to retrieve software images. As with any upgrade activity, it is always prudent to create a backup of your current software configuration before initiating any upgrade activity.

There are three standard ways of upgrading routers:

- Using the conductor's PCLI to initiate the upgrade
- Using the conductor's GUI to initiate the upgrade
- Manually upgrading a router by invoking the `install128t` application from the Linux shell

:::note
The router upgrade process using the PCLI and the GUI is done in two stages: first, the software is downloaded, then it is installed. Using the `install128t` application steps through both of these processes.
:::

Requirements for upgrades now include configuring a user with super user (sudo) privileges. **SSH Root login is not permitted.** If the existing version allows SSH Root login, it will be disabled during the upgrade. When a system is installed using the OTP ISO, a default user is configured with sudo privileges. 

### Stopping the 128T Routing Software
Before upgrading the 128T Routing Software, use the following procedure to stop the the software.

1. Launch a Linux shell window.
2. Execute the command
  ```
sudo systemctl stop 128T
  ```
3. Verify that the software has stopped by executing the command
  ```
sudo systemct1 status 128T
  ```
**Result**: The software is listed as _inactive (dead)_.
4. Close the Linux shell.

## Upgrading using the Conductor's PCLI

For routers managed by a 128T Conductor, upgrades can be initiated via the 128T conductor's PCLI. This upgrade process is completed in two stages: *download* followed by *upgrade*.

As an administrator-level user, log into the conductor's PCLI.

1. Use the command `show assets` to list the devices managed by this conductor, and the software revision each asset is currently running.

2. For a given asset, use the command `show asset [asset ID]` or `show asset software router [router name]`  to view the available software upgrades for that asset. The list will be in the section labeled "Available for Download" at the end of the output.
   :::note
   If there are software releases absent from the list that you are confident should appear, use the command `send command yum-cache-refresh router [router name]` to refresh the software list.
   :::

3. Type `send command download router [your router name] [software version]`. You can monitor the progress by using the `show asset` and/or `show asset [asset ID]` command, which will indicate Automated Provisioner status (e.g., *downloading*).

4. Once the download is complete, use the command `send command upgrade router [your router name]` to initiate the upgrade process.

The conductor's _automated provisioner_ will upgrade both nodes in a high availability router in series to minimize/avoid downtime. Despite this, it is still recommended to perform upgrade activity during periods of low traffic or maintenance windows.

## Upgrading using the Conductor's GUI

Similar to the process for upgrading using the PCLI, the GUI upgrade process using the GUI is done in two stages: *download* and *upgrade*.

1. Navigate to the Router page in the Conductor's UI. Routers that have available upgrades will indicate as such using a blue upgrade badge in the router list.
2. Click on the Upgrade 128T icon (the arrow within a circle) next to your router. Result: a list of upgrade and download options appears. This list is filterable if the list of available options grows large.
3. Click on the target release in the Available Downloads section of the list. You will be asked to confirm the operation.<br/>Result: the 128T will begin downloading the software. Click on the router in the router list to monitor its progress.
4. Once complete, click the Upgrade 128T icon again, and select the target software release from the Available Upgrades list. You will again be asked to confirm this operation.<br/>Result: the router will now begin the upgrade process.

The Automated Provisioner will upgrade both nodes in a high availability router in series to minimize/avoid downtime. Despite this, it is still recommended to perform upgrade activity during periods of low traffic or maintenance windows.

## Upgrading using the Interactive Installer

1. Launch a Linux command prompt window on the node you wish to upgrade.

2. Enter the command to launch the installer.

   ```
   sudo install128t
   ```

   **Result**:  The 128T splash screen appears.
   :::note
   The `install128t` application will check to see if it has an update available, and will ask that you upgrade if it detects a newer version is available.
   :::

3. Press the **enter** key to select **Begin** and start the installation wizard.

4. When prompted, select **Upgrade**.<br/>**Result**: The application queries 128 Technology's software repository for new software.

5. Select the desired software version from the list of available options.

6. Once the upgrade is complete, press the **enter** key to select **Yes** to start your software.
   :::note
   Your output may vary based upon the nature of the upgrade, occasion, various packages, and dependencies that 128T requires as part of the 128T Routing Software upgrade.
   :::

## Routers with Restricted Internet Access

The standard upgrade workflow is for individual instances of 128T software to download software upgrades directly from mirror servers hosted and managed by 128 Technology on the public internet. Occasionally, 128T routers are deployed in locations with restricted or no access to the internet. In this case, you can configure the routers to retrieve software from conductor.

Within a given router's configuration, at `router > system > software-update > repository`, you can configure the `source-type` setting to one of three values:

- `conductor-only`: the router will retrieve software versions only from (or through) the conductor
- `prefer-conductor`: the router will retrieve software versions from the conductor, and fall back to using the internet
- `internet-only` (default): the router will use 128 Technology's publicly hosted repositories for retrieving sofwtare images

:::note
Because this is a router setting, your collection of routers can each use different preferences. E.g., a router in on the internet can use 128 Technology's repository, but another router managed by the same conductor sitting in an isolated environment can use the conductor.
:::

For routers that have no access to the internet, at `router > system > software-update > repository > offline-mode` to `true`. This overrides the `source-type` leaf.

The `import iso` command can be used to import packages contained within a 128T ISO onto a local yum repository, thereby allowing that 128T to be upgraded without contacting to 128 Technology servers.

[import iso](cli_reference.md#import-iso) command allows user to specify the exact `filepath` to the ISO or specify `hunt` which will look everywhere on disk for a file that matches the pattern `128T*.iso` except for the following directories `/boot`, `/dev`, `/proc`, and `/sys` .

This feature works on either Conductor or Routers. It can be combined with Conductor Hosted Repos feature where the ISO is imported on the Conductor and then Routers use the Conductor as the yum repository to download 128T packeges from.

Once the local software repository has been updated to the software from the ISO, the upgrade can proceed using your preferred method.
