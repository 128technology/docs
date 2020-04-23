---
title: Upgrading the 128T Networking Platform
sidebar_label: Upgrading
---

#### History

| Release | Modification                                |
| ------- | ------------------------------------------- |
| 4.4.0   | Added instructions for upgrading from ISO   |

Upgrading your 128T Routing Software follows a similar process as the initial installation and also uses the `install128t` application. Your 128T Router or Conductor must have internet access to download the latest software packages (128T routers can be configured to use the conductor as their software repository; please refer to the configuration section of the 128T documentation for instructions on configuring the Conductor-Hosted Repository). As with any upgrade activity, it is always prudent to create a backup of your current software configuration before initiating any upgrade activity.

## Upgrading using the Interactive Installer

1. Launch a command prompt window.

2. Enter the command to launch the installer.

   ```
   sudo install128t
   ```

   **Result**:  The 128T splash screen appears.

3. Press the **enter** key to select **Begin** and start the installation wizard.

4. When prompted, select **Upgrade**.<br/>**Result**: The application queries 128 Technology's software repository for new software.

5. Select the desired software version from the list of available options.

6. Once the upgrade is complete, press the **enter** key to select **Yes** to start your software.
   :::note
   Your output may vary based upon the nature of the upgrade, occasion, various packages, and dependencies that 128T requires as part of the 128T Routing Software upgrade.
   :::

## Upgrading using Automated Provisioner (PCLI)

For routers managed by a 128T Conductor, upgrades can be initiated via the 128T Conductor's PCLI. This upgrade process is completed in two stages: *download* followed by *upgrade*.

As an administrator-level user, log into the Conductor's PCLI.

1. Use the command `show assets` to list the devices managed by this conductor, and the software revision each asset is currently running.

2. For a given asset, use the command `show asset [asset ID]` to view the available software upgrades for that asset. The list will be in the section labeled "Available for Download" at the end of the output.
   :::note
   If there are software releases absent from the list that you are confident should appear, use the command `send command yum-cache-refresh router [router name]` to refresh the software list.
   :::

3. Type `send command download router [your router name] [software version]`. You can monitor the progress by using the `show asset` and/or `show asset [asset ID]` command, which will indicate Automated Provisioner status (e.g., *downloading*).

4. Once the download is complete, use the command `send command upgrade router [your router name]` to initiate the upgrade process.

The Automated Provisioner will upgrade both nodes in a high availability router in series to minimize/avoid downtime. Despite this, it is still recommended to perform upgrade activity during periods of low traffic or maintenance windows.

## Upgrading using Automated Provisioner (GUI)

Similar to the process for upgrading using the PCLI, the Automated Provisioner upgrade process using the GUI is done in two stages: *download* and *upgrade*.

1. Navigate to the Router page in the Conductor's UI. Routers that have available upgrades will indicate as such using a blue upgrade badge in the router list.
2. Click on the Upgrade 128T icon (the arrow within a circle) next to your router. Result: a list of upgrade and download options appears. This list is filterable if the list of available options grows large.
3. Click on the target release in the Available Downloads section of the list. You will be asked to confirm the operation.<br/>Result: the 128T will begin downloading the software. Click on the router in the router list to monitor its progress.
4. Once complete, click the Upgrade 128T icon again, and select the target software release from the Available Upgrades list. You will again be asked to confirm this operation.<br/>Result: the router will now begin the upgrade process.

The Automated Provisioner will upgrade both nodes in a high availability router in series to minimize/avoid downtime. Despite this, it is still recommended to perform upgrade activity during periods of low traffic or maintenance windows.

## Upgrading from an ISO

Some network environments are configured to disallow access to the public internet.  In these environments, the 128T will not be able to access its public software repositories and therefore be unable to download any software updates. Typically an administrator will download software updates on a system in a DMZ and transfer the software onto the target platform once its integrity has been verified.

The `import iso` command can be used to import packages contained within a 128T ISO onto a local yum repository, thereby allowing that 128T to be upgraded without contacting to 128 Technology servers.

[import iso](cli_reference.md#import-iso) command allows user to specify the exact `filepath` to the ISO or specify `hunt` which will look everywhere on disk for a file that matches the pattern `128T*.iso` except for the following directories `/boot`, `/dev`, `/proc`, and `/sys` .

This feature works on either Conductor or Routers. It can be combined with Conductor Hosted Repos feature where the ISO is imported on the Conductor and then Routers use the Conductor as the yum repository to download 128T packeges from.

Once the local software repository has been updated to the software from the ISO, the upgrade can proceed using your preferred method above.
