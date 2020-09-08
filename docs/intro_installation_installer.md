---
title: Manually Installing the 128T
sidebar_label: Manually Installing the 128T
---
This section describes the manual installation process for the 128T. For automated installation see Installing from the OTP ISO, or Installing from the Bootable ISO. 

## Install Using 128T-installer

The 128T router software installer package is hosted in the 128 Technology software repository, located at yum.128technology.com. During installation the system will need access to the internet to retrieve software applications and libraries. Please ensure the system can reach the public internet prior to commencing. For offline installation instructions, follow the [instructions on installing from an ISO](intro_installation_bo*Table_media.md).

1. Launch a Linux command prompt.
2. Enter the command to install the Yum repository that corresponds to the 128T software installer.

```
sudo yum install http://yum.128technology.com/installer/repo.rpm
```

3. Enter the command to download the installer.

```
sudo yum install 128T-installer
```

4. Enter the command to launch the interactive installer wizard.

```
sudo install128t
```
The 128T installer splash screen appears.

5. Press the **Enter** key to select **Begin** and start the installation wizard.
  > Items that have a hotkey have a bold or alternate color letter within the element. If two items have the same hotkey, pressing the hotkey in succession will toggle among all items with a common hotkey shortcut.

  > To select a radio button option, navigate to the radio button using the arrow keys or **Tab** key and press the Space bar. Pressing the **Enter** key will execute the function highlighted at the bottom of the pane, typically _OK_ or _Back_. Additionally, you can navigate fields using the **Tab** key.

6. When prompted, open the client certificate you received as part of your 128T purchase. Copy the entire contents, _including the Certificate and Private key information_, and paste it into the Client Certificate window of the install wizard.<br/>The content must begin with the line `-----BEGIN CERTIFICATE-----` and end with `-----END RSA PRIVATE KEY-----`.

7. Press the **Tab** key after pasting the client certificate to select the **OK** button, and press **Enter**.
  
  > This is performed more easily when accessing the target machine over SSH using terminal software, rather than interacting with the target machine directly. Alternatively, you can also store the certificate as /etc/pki/128technology/release.pem to avoid having to copy and paste.
  
8. From the Version Selection window, select your desired version from the list and select **OK** to continue. The installation begins, and may take several minutes to download and install.
9. Press the **Enter** key to select **OK** and close the installer. Upon completing the installation, the installer automatically launches the Initializer.

### Initialize the 128T Node

The 128T Initializer is a complementary application to the installer that tunes your operating system, prepares the platform to run the 128T software, and creates the bootstrapping files necessary to load the software. The Initializer is automatically launched once the 128T Installation wizard is complete.

> The 128T Initializer is bundled as part of the 128T routing software (not as part of the 128T installer application!), and may change as newer versions of the 128T routing software are released.

#### To Initialize the 128T Node:

1. On the 128T Initializer wizard screen, use the space bar to select either a **Router** or **Conductor **role for the 128T node and press the **Enter** key to select **OK**.
2. For 128T routers, you will be prompted for the IP address(es) of your 128T conductor(s). If you have conductors, Enter their administrative addresses here, and this node will retrieve its configuration from the conductor. If you have only one conductor (i.e., a standalone conductor), leave the field labeled 2nd Conductor Address blank. If you have no conductors, choose **Skip**.
3. When asked _What kind of Router node is this?_, select from the following options:

- **Standalone:** This router has no highly available peer, and is not currently planned for high availability.
- **1st HA Node:** This router is the first node of a high availability pair. You will be prompted for the High Availability address of this node. Note: The address _must_ be reachable by the 2nd HA Node.
- **2nd HA Node:** This router is the second node of a high availability pair, where the first node has been initialized. You will be prompted for the High Availability address of the first node.

4. Enter the following system properties on the Node Info screen:

- **Node Name:** The unique name of the system within your 128T Router or Conductor, for example _labsystem1_. By default this field uses the Linux system's hostname.
  :::note
  Both routers and conductors can consist of one node (for standalone systems) or two nodes (for highly available systems).
  :::
- **Router/Conductor Name:** The name of the Router or Conductor system as a whole. When referring to a running 128T software instance, it is identifiable by the full name of `nodeName.routerName`; e.g., `labsystem1.boston`. The full system name is reflected in the PCLI prompt as discussed in the Document Conventions section of this document.

5. The **Advanced** button allows you to specify the number of CPU cores to be allocated for running your 128T routing software.
   :::info
   This is only recommended for experienced users. This setting is intended to optimize the forwarding capabilites of the 128T platform beyond the default settings for the target platform.
   :::

6. On the **Password Setup** screen, create a password for the 128T Admin user. The administrator password must be at least 8 characters long, contain at least 1 uppercase letter, at least 1 lowercase letter, at least 1 number, and cannot repeat characters more than 3 times.

7. On the **Anonymous Data Collection** screen, select either **Accept** or **Disable** to enable or disable the RoadRunner process that measures the health of your 128T router and components.

8. Press the **Enter** key to select **OK**. The Initializer performs a hardware compatibility check. The compatibility check may fail due to warnings or failure notices, which are displayed in the output script. If no failures are present, you can choose to continue with the installation even if multiple warnings exist. For information on why a specific test may have failed or generated a warning, contact 128T technical support.

9. When prompted, either reboot your system or start 128T.
   :::note
   If installing the 128T software for the first time, a system reboot is required.
   :::

### Verify Installation

After installing the 128T Routing Software it is important to verify that the installation was completed successfully.

#### To Verify the 128T Installation:

1. Launch a command prompt window.

2. Execute the command:

   ```
   sudo systemctl status 128T
   ```

   **Result:** The service is listed as _Active (running)_.<br/>If the service is listed as _Inactive_, run the `sudo systemctl start 128T` command. This may take several minutes to fully launch the service.

3. Once the service is listed as _Active_, log into the system as Admin using the system default password.<br/>**Result:** The installation is verified.

4. Close the command prompt window.
