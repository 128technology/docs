---
title: High Availability Conductor Installation
sidebar_label: High Availability Conductor Installation
---

This process covers the installation of two HA Conductor Nodes, and assumes you have already created a bootable device, either a USB or CD/DVD/Blueray disk. Instructions for downloading and creating a bootable device are available in [Downloading an SSR ISO](intro_downloading_iso.md) and [Creating a Bootable USB](intro_creating_bootable_usb.md).

The steps in this section describe the *interactive conductor installation* from the packaged-based ISO. The section [Initialize the SSR](#initialize-the-128t-node) describes using the Initializer to configure both systems as Conductors after installing from the Interactive ISO. 

If you are installing a highly available Conductor on the cloud, please refer to [Conductor High Availability for Cloud Deployments](intro_initialize_HA_conductor.md).

## Install the First Conductor HA Node 

1. On the SSR Initializer wizard screen, use the space bar to select the **Conductor** role for the SSR node, and press the **Enter** key to select **OK**.

  ![SSR Role](/img/initializer_Serial2.png)

2. For SSR routers, you will be prompted for the IP address(es) of your conductor(s). If you have conductors, enter the administrative addresses and the node will retrieve the configuration from the conductor. If you have only one conductor (i.e., a standalone conductor), leave the field labeled 2nd Conductor Address blank. If you have no conductors, choose **Skip**.

3. When asked _What kind of Router/Conductor node is this?_, select **1st HA Node**:

  ![Identify the Node](/img/initializer_Serial3.png)

- **1st HA Node:** This router/conductor is the first node of a high availability pair. You will be prompted to provide the local IP address for this node. The 2nd HA node will contact this node at the address provided to synchronize state. Note: The 1st Node IP address must be reachable by the 2nd HA Node.
  
- **2nd HA Node:** This router/conductor is the second node of a high availability pair, where the first node has been initialized. You will be prompted to provide the 1st Node IP address for this 2nd node that will be used to synchronize state. Note: The 2nd Node IP address must be reachable by the 1st HA Node.

4. The following steps configure a high availability conductor node.

  a). Enter the IP address of the local HA sync interface. 

    ![High Availability IP Address](/img/initializer_Serial3HAIP.png)

  b). Enter the following system properties on the **Node Info** screen:

    ![Node Information](/img/initializer_Serial5.png)

    - **Node Name:** The name of the system within your SSR Router or Conductor, for example, _conductor_. By default this field uses the Linux system's hostname.

    :::note
    Both routers and conductors can consist of one node (for standalone systems) or two nodes (for highly available systems).
    :::

    - **Conductor Name:** The name of the Conductor system as a whole. When referring to a running SSR software instance, it is identifiable by the full name; e.g., `conductor-node1.conductor`. The full system name is reflected in the PCLI prompt.

5. On the **Password Setup** screen, create a password for the SSR Admin user. The administrator password must be at least 8 characters long, contain at least 1 uppercase letter, at least 1 lowercase letter, at least 1 number, cannot contain the username in any form, and cannot repeat characters more than 3 times. This operation is only performed on the standalone or first node in the HA peer, and the password must be entered twice. 
  :::note
  Resetting a password requires entering the old password. If a password is lost or forgotten and the account is inaccessible, the account cannot be recovered. Please keep password records accessible and secure. 
  :::

  ![Password Setup](/img/initializer_Serial6.png)

6. Press the **Enter** key to select **OK**. The Initializer performs a hardware compatibility check. The compatibility check may fail due to warnings or failure notices, which are displayed in the output script. If no failures are present, you can choose to continue with the installation even if multiple warnings exist. For information on why a specific test may have failed or generated a warning, contact Juniper Technical Support.

7. When prompted, select `<Yes>` to start the conductor.

  ![Initializer Complete](/img/initializer_complete.png)

  :::note
  If installing the SSR software for the first time, a system reboot is required.
  :::

## Install the Second Conductor HA Node

For the second node for Conductor HA, install the system using the same process beginning with [Installing the ISO](intro_installation_bootable_media.md#installing-the-iso) and ending at [Initialize 128T](intro_installation_bootable_media.md#initialize-the-128t-node) step 2. From step 2, perform the following:

1. When prompted for `What kind of Conductor node is this?` Select the **2nd HA Node**.

  ![2nd HA Node Setup](/img/initializer_Serial4cHANode.png)

2. Enter the **HA Address** and **Peer HA Address** for the second node. The HA Address is the local 2nd HA Node IP address, and the Peer HA Address is the 1st HA Node IP address.

  ![2nd HA Peer IP](/img/initializer_Serial4dHANode.png)

3. Enter the **HA Peer Credentials**. This is a one time operation for the initialization of the second HA Node with the first HA Peer. The `t128` user can be used for this operation.

  ![HA Peer Credentials](/img/initializer_Serial4eHAPeer.png)

4. Press the **Enter** key to select **OK**. The Initializer performs a hardware compatibility check. The compatibility check may fail due to warnings or failure notices, which are displayed in the output script. If no **failures** are present, you can choose to continue with the installation even if multiple warnings exist. For information about why a specific test may have failed or generated a warning, contact Juniper Technical Support.

5. After the initialization process completes the setup, the following screen displays. Use the Enter key to select `Got it!`

  ![Peer Restart](/img/initializer_Serial7.png)

6. The Installer Status screen indicates success. Use the spacebar to either reboot your system or start SSR.

  ![Initializer Complete](/img/initializer_complete.png)

  :::note
  If installing the SSR software for a router, a system reboot may be required.
  :::

## Verify Installation

After installing the SSR Software it is important to verify that the installation was completed successfully.

### To Verify the SSR Installation:

1. Launch a command prompt window.

2. Execute the command:

  ```
  sudo systemctl status 128T
  ```

  If the service is listed as _Active_ (running), go to step 3. 

  If the service is listed as _Inactive_, run the `sudo systemctl start 128T` command. This may take several minutes to fully launch the service.

3. Once the service is listed as _Active_, log into the system as Admin using the system default password. By logging into the system, you have verified the installation. 

4. Close the command prompt window. 

5. Use a web browser to navigate to the IP address of the SSR GUI. For example; `https://192.168.1.25`

6. Log in to the SSR GUI using the admin name and password you created earlier.

## Repository Authentication

To save repository access credentials it is necessary to configure a token for for authentication with SSR software repositories. See [Configure the Token](single_conductor_install.md#configure-the-token) for additional details. 



