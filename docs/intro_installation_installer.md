---
title: Installing 128T
sidebar_label: Installing 128T
---

## Install Using 128T-installer

The 128T router software installer package is hosted in the 128 Technology software repository, located at yum.128technology.com. During installation the system will need access to the internet to retrieve software applications and libraries. Please ensure the system can reach the public internet prior to commencing. For offline installation instructions, follow the [instructions on installing from an ISO](intro_installation_bootable_media.md).

1. Launch a Linux command prompt.
2. Enter the command to install the Yum repository that corresponds to the 128T software installer.

```
sudo yum install http://yum.128technology.com/installer/repo.rpm
```

3. Enter the command to download the installer.

```
sudo yum install 128T-installer
```

4. Enter the command to launch the interactive installer wizard.<br/>**Result: ** The 128T installer application's splash screen appears.

```
sudo install128t
```

5. Press the **enter** key to select **Begin** and start the installation wizard.
  > Items that have a hotkey have a bold or alternate color letter within the element. If two items have the same hotkey, pressing the hotkey in succession will toggle among all items with a common hotkey shortcut.

  > To select a radio button option, navigate to the radio button using the arrow keys or **tab** key and press the space bar. Pressing the **enter** key will execute the function highlighted at the bottom of the pane, typically _OK_ or _Back_. Additionally, you can navigate fields using the **tab** key.

6. When prompted, open the client certificate you received as part of your 128T purchase. Copy the entire contents, _including the Certificate and Private key information_, and paste it into the Client Certificate window of the install wizard.<br/>The content must begin with the line `-----BEGIN CERTIFICATE-----` and end with `-----END RSA PRIVATE KEY-----`.

7. Press the **tab** key after pasting the client certificate to select the **OK** button, and hit **enter**.
  
  > This is performed more easily when accessing the target machine over SSH using terminal software, rather than interacting with the target machine directly. Alternatively, you can also store certificate as /etc/pki/128technology/release.pem to avoid having to copy and paste.
  
8. From the Version Selection window, select your desired version from the list and select **OK** to continue.<br/>**Result:** the installation begins. This process may take several minutes to download and install.
9. Press the **enter** key to select **OK** and close the installer. **Result:** upon completing the installation, the installer automatically launches the Initializer.

### Initialize the 128T Node

The 128T Initializer is a complementary application to the installer that tunes your operating system, prepares the platform to run the 128T software, and creates the bootstrapping files necessary to load the software. The Initializer is automatically launched once the 128T Installation wizard is complete.

> The 128T Initializer is bundled as part of the 128T routing software (not as part of the 128T installer application!), and therefore may change as newer versions of the 128T routing software are released.

#### To Initialize the 128T Node:

1. In the 128T Initializer wizard screen select either a **Router** or **Conductor **role for the 128T node and press the **enter** key to select **OK**.
2. For 128T routers, you will be prompted for the IP address(es) of your 128T conductor(s). If you have conductors, enter their administrative addresses here, and this node will retrieve its configuration from the conductor. If you have only one conductor (i.e., a standalone conductor), leave the field labeled 2nd Conductor Address blank. If you have no conductors, choose **Skip**.
3. When asked What kind of Router node is this?, select from the following options:

- Standalone: This router has no highly available peer, nor is it planned to have a highly available peer at the current time.
- 1st HA Node: This router is part of a high availability pair of nodes, and is the first node to be initialized of that pair. By choosing 1st HA Node, you will be prompted for the High Availability address of this node. Note: this address _must_ be reachable by the 2nd HA Node.
- 2nd HA Node: This router is part of a high availability pair of nodes, and the first node has already been initialized. By choosing 2nd HA Node, you will subsequently be prompted for the High Availability address of the already initialized peer node.

4. On the Node Info screen, enter the following system properties:

- Node Name: The unique name of the system within your 128T Router or Conductor, for example _labsystem1_. By default this field uses the Linux system's hostname.
  :::note
  Both routers and conductors can consist of one node (for standalone systems) or two nodes (for highly available systems).
  :::
- Router/Conductor Name: The name of the Router or Conductor system as a whole. When referring to a running 128T software instance, it is identifiable by the full name of `nodeName.routerName`; e.g., `labsystem1.boston`. This full system name will be reflected in the PCLI prompt as discussed in the Document Conventions section of this document.

5. Clicking the **Advanced** button allows you to specify the number of CPU cores that are to be allocated to running your 128T routing software.
   :::info
   This is only recommended for experienced users.  This setting is intended to optimize the forwarding capabilites of the 128T platform beyond the default settings for the target platform.
   :::
6. On the Password Setup screen, create a password for the 128T Admin user. **Restriction:** The administrator password must be at least 8 characters long, contain at least 1 uppercase letter, contain at least 1 lowercase letter, contain at least 1 number, and cannot repeat characters more than 3 times.
7. On the Anonymous Data Collection screen, select either **Accept** or **Disable** to enable or disable the RoadRunner process which measures the health of your 128T router and components.
8. Press the **enter** key to select **OK**. **Result:** The Initializer performs a hardware compatibility check. The compatibility check may fail due to warnings or failure notices, which are displayed in the output script. If no failures are present, you can choose to continue with the installation even if multiple warnings exist. For information on why a specific test may have failed or generated a warning, contact 128T technical support.
9. When prompted, either reboot your system or start 128T.
   :::note
   If installing the 128T software for the first time, a system reboot is required.
   :::

### Verify Installation

After installing the 128T Routing Software it is important to verify that the installation was completed successfully.

#### To Verify the 128T Installation:

1. Launch a command prompt window.

2. Execute the command.

   ```
   sudo systemctl status 128T
   ```

   **Result:** The service is listed as _Active (running)_.<br/>If the service is listed as _Inactive_, run the `sudo systemctl start 128T` command. This may take several minutes to fully launch the service.

3. Once the service is listed as _Active_, log into the system as Admin using the system default password.<br/>**Result:** The installation is verified.

4. Close the command prompt window.
