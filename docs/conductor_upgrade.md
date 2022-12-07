---
title: Upgrade the SSR Conductor
sidebar_label: Upgrade the SSR Conductor
---

:::note
If you are upgrading to version 5.3 or higher of the SSR software, please refer to the [Upgrade Considerations](intro_upgrade_considerations.md) before proceeding.
:::

Your SSR conductor must have internet access to download the latest software packages; for deployments where the routers managed by the conductor do not have internet access, you can use the SSR conductor as a repository (or proxy) to retrieve software images. As with any upgrade activity, it is always prudent to create a backup of your current software configuration before initiating any upgrade activity.

There are two standard ways of upgrading a conductor:

- Using the conductor's GUI to initiate the upgrade
- Using the conductor's PCLI to initiate the upgrade

Prerequisites for upgrades now include configuring a user with super user (sudo) privileges. **SSH Root login is not permitted.** If the existing version allows SSH Root login, it will be disabled during the upgrade. When a system is installed using the OTP ISO, a "t128" user is configured with sudo privileges. 

### Version Dependencies

The conductor `major.minor` version must be greater than or equal to the router version. The router version can not exceed the conductors `major.minor` version, but it can have a greater patch version. All [versions currently under support](about_support_policy.md) can be run on a router and managed by the conductor, provided that the conductor version is greater. Versions of software not under support *may* work, but are not guaranteed to do so.  

Examples:
- Conductor running version 6.0.5, managing Routers running version 6.0.1: Supported.
- Conductor running version 5.4.8, managing Routers running version 5.4.10: Supported.
- Conductor running version 6.0.5, managing Routers running version 5.5.7: Supported.
- Conductor running version 4.5.13, managing Routers running version 4.2.9: Not supported, but may work.

## Upgrading the Conductor 
Use the following procedures to upgrade a Conductor from the GUI or using the Interactive Installer (linux shell).

:::note
Before upgrading a conductor, it is recommended to [export the running configuration](config_basics.md#importexport).
:::

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

## Upgrading using the Interactive Installer

Use this procedure to upgrade the conductor from a linux shell.

:::note
While the linux shell is available for upgrading the conductor, it is advised to use the GUI. Upgrading through the interactive installer should be used in environments where a GUI is not otherwise accessible.
:::

1. Launch a Linux command prompt window on the node you wish to upgrade.

   :::note
   It is strongly recommended that you first upgrade to the latest version of the Installer. If the upgrade is not possible, and you are running an Installer version prior to 2.7.0, use the Screen utility when performing an upgrade in interactive mode to avoid SSH session timeout.

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

## Next Steps

See [Router Interactive Installation](install_router_merged.mdx) or [Router Installation Using OTP](intro_otp_iso_install.mdx) for steps to install your routers. 

If your deployment will take advantage of Mist Telemetry, see [Enable WAN Assurance on the Conductor](config_wan_assurance.md#enable-wan-assurance-on-the-conductor) for those next steps. 

