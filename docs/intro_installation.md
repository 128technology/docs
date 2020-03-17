---
title: 128T Software Installation Guide
sidebar_label: Installation
---
## Introduction
Welcome to 128T - the first software-based routing solution designed to be both session-oriented and service-centric through the application of Secure Vector Routing. The purpose of this guide is to provide an overview and installation walkthrough for the 128T Router and 128T Conductor products into a Linux operating system environment. This product suite is collectively known as 128T Routing Software.

## Before You Begin
Before you begin the installation configuration of 128T Routing Software, the following prerequisites must be met:
- You must be familiar with Linux fundamentals, basic network addressing, and IP networking terminology. 
- You must be a system administrator to perform the installation, and have root access to the target machine, or have an entry in /etc/sudoers allowing you to execute Linux shell commands as root (via sudo).
- You must be a system administrator in order to configure the 128T Routing Software.

:::note
The examples listed in this guide generally prefer running commands as a non-root user, except as noted, and prepend commands that must be run as a superuser with sudo.
:::

## Hardware Requirements
The 128T routing software runs on both bare metal servers and as a virtual machine within hypervisor environments. For virtual environments, the same CPU, memory, and storage specifications are required for comparable throughput.

The 128T routing software recommends a minimum of two CPU cores, 8GB of RAM, and at least 25GB of hard drive space.

:::info
Larger hard drives may be required if you intended to support an increased volume of flow and stored session-related information. These are used for analytical analysis of the traffic patterns and utilization of your 128T routing system. Consult with your account representative for hardware recommendations specific to your traffic throughput needs, or visit our [online community](https://community.128technology.com/) for hardware profile examples.
:::

:::important
When run as a virtual machine, CPU cores must be dedicated to the 128T router using core affinity.
:::

:::important
128 Technology strongly recommends the use of ECC memory for all hardware platforms.
:::

## Interface Requirements
Logically, 128T routers have at least two interfaces; in many deployments they represent "LAN" and "WAN" interfaces. These may be separate physical interfaces, or they may be separate VLANs on a single physical interface. There is also typically a third interface used for management traffic.

Though not a hard requirement, 128 Technology, recommends using a dedicated physical interface for management traffic whenever practical, to avoid commingling data plane traffic and management traffic.

When configuring two software _nodes_ in a highly available router, each node requires a dedicated physical interface for synchronizing session data to its redundant peer. Each also generally have another, separate physical interface (referred to as a "fabric" interface) that is used to forward traffic between the nodes across a logical "backplane" between them. The fabric interface is not mandatory; refer to the [High Availability](config_ha) documentation for more information on configuration design for high availability deployments.

## VMware ESXi and KVM Requirements
VMware ESXi (5.5, 6.0, and 6.5) and KVM (2.1.3) with libvirt (1.2.9.3 and 3.2.0) are hypervisor environments. The following adjustments are required to run 128T Routing Software in these environments: 
- Leverage core affinity to dedicate CPU cores to 128T software, instead of leveraging virtual CPUs.
- Set the SCSI controller to LSI Logic SAS.
- Set network adapters to type e1000. As mentioned above, typical installations include a minimum of three network adapters for router deployments.
- Separate the management interface, which is used for inter-component communication and out-of-band management, from the forwarding plane interfaces. 
- Reserve a minimum of two network interfaces for production traffic.
- Depending on your environment, set the 128T router node portgroup to either promiscuous or bridged mode when supporting one or more redundant interfaces. (For example, when you are defining and configuring a MAC address for each redundant interface.) For VMware ESXi, the portgroup mode should be set to _promiscuous_. For KVM libvirt, the portgroupo mode should be set to _bridged_. For more information, refer to the [High Availability](config_ha) guide.

## Operating System Requirements
The 128T routing software supports CentOS 7.5 as its underlying operating system. 

### CentOS
When not installing from a 128T ISO, which includes a version of the CentOS operating system, the 128T routing software requires, at a minimum, an installation of CentOS 7.5. We recommend installing the minimal package that CentOS offers, as the 128T installer will fetch and install any additional dependencies during the installation process.

## BIOS Recommendations
In order to configure standard, off-the-shelf hardware to perform in line with traditional routing hardware, we recommend that you configure several BIOS settings to increase performance and resiliency.

### Enable Automatic Restart
In the event of power disruption, the Automatic Restart setting in your system's BIOS can automatically restart your system once power is restored. As BIOS settings may vary between hardware vendors, consult your hardware platform's operating guides for specific instructions, or look on [Interchange](https://community.128technology.com/) for commonly deployed 128T hardware platforms. Below are representative steps for common BIOS parameters:

#### To enable Automatic Restart:
1. From the BIOS settings screen, select ACPI \> Power Settings.
2. Change the Automatic Restart setting to On.
3. Save the configuration and reboot your system. 

## Preparing the Operating System
Before installing 128T Routing Software you must prepare your operating system according to 128 Technology's recommendations and guidelines.

### Assigning the System Interfaces
Interfaces on host systems running as a 128T router, either bare metal or virtual deployment environments, are assigned for packet forwarding. At least one dedicated interface is required for packet forwarding.

:::note
Interface assignments are required only on software instances that are running as routers. Conductor nodes do not require interface assignments.
:::

:::info
As mentioned in the section on Hardware Requirements, 128 Technology recommends using a separate interface for management traffic if possible.
:::

#### Identify Interface PCI Addresses
Each Ethernet interface within a Linux system has a unique PCI address. This PCI address is used to bind the 128T router's configuration to the underlying hardware. During identification, be sure to record the PCI bus addresses for the individual interfaces.

:::note
Once the PCI addresses are configured for packet forwarding, the interfaces are no longer available to the Linux operating system. Incorrectly configuring the PCI addresses causes ssh connections and package installs to fail.
:::

#### To Identify PCI Addresses:
1. Launch a command prompt window.
2. Issue the command `lshw -c network -businfo`
3. The PCI addresses are displayed in the tabular output in the column labeled Bus info. These addresses are also referenced in your 128T router's configuration, with the preceding pci@ omitted, to identify which interfaces you want the system to manage and use for packet forwarding.
4. Record the PCI addresses you wish to use, and close the command prompt window.
:::tip
If you are unsure which device maps to which physical port on your Linux system, you can use Linux's ethtool application to blink the NIC's activity light. For example, the command `ethtool --identify eno1 120` will blink eno1's activity light for two minutes (120 seconds).
:::
:::note
PCI-to-port maps are available for commonly deployed hardware systems on our user community, [Interchange](https://community.128technology.com/)
:::

## Install Using 128T-installer
The 128T router software installer package is hosted in the 128 Technology software repository, located at yum.128technology.com. During installation the system will need access to the Internet to retrieve software applications and libraries. Please ensure the system can reach the public Internet prior to commencing. For offline installation options, contact 128 Technology, Inc. or visit Interchange, our user community.

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

### Before You Begin

#### Media Preparation
The purpose of the media preparation stage is to create bootable media, which will bootstrap your new system through the Linux and 128T installation procedures. The basic process is to retrieve the install media (supplied by 128 Technology as an ISO file), and write it to bootable media – typically either a USB stick or a CD-ROM/DVD-ROM disc.

##### Acquiring Install Media
The ISO installation media is hosted on the same location as the 128T software packages, albeit in a different location.  The easiest means of acquiring the ISO is to use the `curl` command while specifying the certificate obtained from 128 Technology with a valid software license.
```
curl -O --cert /etc/pki/128technology/release.pem https://yum.128technology.com/isos/128T-OTP-4.2.4-1.el7.x86_64.iso
```

##### Verifying Install Media
Each ISO file created by 128 Technology, Inc. has an accompanying checksum to ensure that the image has not been tampered with. The checksum file contains all the checksums for all hosted ISOs. The name of the checksum file is sha256sum.txt.

```
curl -O --cert /etc/pki/128technology/release.pem https://yum.128technology.com/isos/sha256sum.txt
```

To verify the checksum, use sha256sum (Linux) or shasum (Macintosh), or the checksum tool of your choice:

```
sha256sum -c sha256sum.txt 128T-OTP-4.2.4-1.el7.x86_64.iso 2>&1 | grep OK
```
The output of the command should produce the result
```
128T-OTP-4.2.4-1.el7.x86_64.iso: OK
```

If the checksum validation fails, reattempt the download. If the error message persists after multiple attempts, please contact 128 Technology, Inc. immediately.

##### Creating a Bootable USB
Once the ISO has been verified, you can write it to a bootable USB using the command line tool `dd`. There are many helpful resources online to illustrate how to write an ISO file to a USB stick; be advised that choosing the wrong output file (of=) can overwrite any system drive.
In this example, the USB stick is mounted as disk4 (use `fdisk –l` on Linux, or `diskutil list` on Macintosh to find the USB device on your system):

```
sudo dd if=128T-3.2.1-1.el7.centos.x86_64.iso of=/dev/disk4
```

There are also many GUI tools available for most major operating systems to write ISO files to removable media (e.g., Etcher for Mac OS X).

##### Creating a CDROM/DVD
Rather than writing the ISO to a USB stick, it may be preferable on systems with an onboard optical drive to write the ISO to CD/DVD/BlueRay. There are many tools available on all of the major platforms to write ISOs to optical discs, suck as K3b, Disco, etc.

#### BIOS Configuration
It may be necessary to change the target system’s BIOS settings to allow booting from removable media. Consult your hardware vendor’s documentation (or pay close attention to the messages displayed during the boot sequence!) to enter into the BIOS to validate that it will boot from USB/CD-ROM/DVD, as necessary.

After imaging the ISO onto removable media, insert it into the target machine and power it on.

### Installing the ISO

#### Choose the Installation Type
Note: because not all hardware has video support, booting to console is the default (to account for the fact that a console user may not be able to select an option). The default option is selected after a 30 second timeout.

##### 128T Router via Serial Console
Use this option when running on hardware with no video chipset. It uses /dev/ttyS0 as the serial console for interacting with the installer.
Note: selecting the wrong type of console may result in garbage characters being displayed and the install hanging. If this is the case, reboot the target system and select the correct line for the target hardware.

##### 128T Router with VGA Console
Use this option when running on hardware that has onboard graphics chipsets. This installs 128T using the GUI installer.

##### CentOS Linux Only
Selecting this option will only install the CentOS 7 Linux operating system. It uses a GUI installer.


#### 128T Installation
Once Linux is installed, the system will install the 128T software. Note that this may several minutes to complete.

At this point, please remove the install media and select **Yes** to reboot the system. Upon reboot, the system will begin the 128T initialization process.

#### Initialization of the Node
The initialization of the new node will follow the standard process outlined in the 128T Installation Guide. Please refer to that document for details on how to initialize your system.

### Installation Notes

1. The following user accounts and passwords are created during the ISO installation process:

   | Username | Password   |
   | -------- | ---------- |
   | root     | 128tRoutes |
   | t128     | 128tRoutes |

   It is *strongly recommended* that you change these passwords immediately.

2. GUI login via HTTPS is enabled by default on port 443.

## Install from AWS Marketplace
Partnering with Amazon, you can install 128T conductors and routers using Amazon Web Services (AWS). AWS is a secure cloud platform that offers computing power, data storage, content delivery, flexibility, scalability, and reliability for software products. 
:::note
For more information on Amazon Web Services, refer to the [AWS website](https://aws.amazon.com/what-is-aws/).
:::
#### To Manually Install a Conductor or Router Using AWS:
1. Launch a web browser and navigate to https://aws.amazon.com/
2. Login to AWS with your account. 
:::note
If you do not have an account, click **Create an AWS Account** to register.
:::
3. Click **EC2 Dashboard** and select your deployment region from the drop down list.
4. Click **Launch Instance**.
5. On the _Step 1: Choose an Amazon Machine Image (AMI)_ page, select the **Amazon Marketplace** tab and enter 128 Technology in the search bar.
6. Locate the 128 Technology image and click **Select**. 
7. On the _Step 2: Choose and Instance Type_ page, choose an instance type.
8. On the _Step 3: Configure Instance Details_ page, click **Subnet** and select the desired subnet and retain the default values for the other fields.
:::note
If the desired subnet is not listed, click **Create New Subnet** to create one.
:::
9. Click **Next: Add Storage**.
:::note
The _You have changed your network setting_ window may appear.
:::
Select **Yes, I want to continue with this change** and click **Next**.
10. On the _Step 4: Add Storage_ page, ensure the size is 128 GB (default value).
11. Click **Next: Add Tags**.
12. On the the _Step 5: Add Tags_ page, click **Add Tags**. 
13. Click inside the Key column and select **Name**. Under the Value column enter the name for your instance.
14. Click **Next: Configure Security Group**.
15. On the _Step 6: Configure Security Group_ page, click **select an existing security group** and choose one from the list.
:::note
If the desired security group is not listed you can create your own by selecting **Create a new security group** and following the prompts.
:::
16. Select **Review and Launch**.
17. In the _Boot from General Purpose_ window, select **Continue** and then click **Next**.
18. On the _Step 7: Review Instance Launch_ page, click **Launch** to finalize the instance.
19. In the _Select an existing key pair or create a new key pair_ dialog box, select **Choose an existing key pair** and select the desired key pair from the list.
:::note
If the desired key pair is not listed click **Create a new key pair**, enter a name in the Key pair name field and click **Download Key Pair**.
:::
20. Check the acknowledgment check box and then click **Launch Instances**.
21. On the _Launch Status_ page, click **View Instances**.
22. Record the instances IP address.
23. Launch a command window prompt.
24. Enter the IP address of the instance. **Result:** The interactive 128T Installer application launches.
25. When prompted by the installer, press the **Enter** key to select Begin.

Follow the instructions as outlined in [Install the 128T Routing Software](#install-using-128t-installer)

## Install 128T From Amazon Web Services Using ZTP
After installing a 128T conductor, you can use ZTP to install your 128 routers from Amazon Web Services.

### To install 128T from AWS using ZTP:
1. Launch a web browser and navigate to [https://aws.amazon.com/](https://aws.amazon.com/).
2. Login to AWS with your account. 
> If you do not have an account, click **Create an AWS Account** to register.
3. Click **EC2 Dashboard** and select your deployment region from the drop down list.
4. Click **Launch Instance**.
5. On the _Step 1: Choose an Amazon Machine Image (AMI)_ page, select the **Amazon Marketplace** tab and enter 128 Technology in the search bar.
6.  Locate the 128 Technology image and click **Select**. 
7. On the _Step 2: Choose and Instance Type_ page, choose an instance type.
8. On the _Step 3: Configure Instance Details_ page click **Subnet** and select the desired subnet and retain the default values for the other fields.
> If the desired subnet is not listed, click **Create New Subnet** to create one.
9. In the IAM role field, select **128T\_ZTP**.
10. Click **Next: Add Storage**.
> The _You have changed your network setting_ window may appear. Select **Yes, I want to continue with this change** and click **Next**.
11. On the _Step 4: Add Storage_ page, ensure the size is 128 GB (default value).
12. Click **Next: Add Tags**.
13. On the the _Step 5: Add Tags_ page, click **Add Tags**.
14. Click inside the Key column, select the following tags, and enter the tag definition in the Value column.
- conductor-ip-primary: populate this with the IP address of your 128T conductor
15. Click **Next: Configure Security Group**.
16. On the _Step 6: Configure Security Group_ page, click **select an existing security group** and choose one from the list.
> If the desired security group is not listed you can create your own by selecting **Create a new security group** and following the prompts.
17. Select **Review and Launch**.
18. In the _Boot from General Purpose_ window, select **Continue** and then click **Next**.
19. On the _Step 7: Review Instance Launch_ page, click **Launch** to finalize the instance.
20. In the _Select an existing key pair or create a new key pair_ dialog box, select **Choose an existing key pair** and select the desired key pair from the list.
> If the desired key pair is not listed click **Create a new key pair**, enter a name in the Key pair name field and click **Download Key Pair**.
21. Check the acknowledgment check box and then click **Launch Instances**.
22. On the _Launch Status_ page, click **View Instances**.
23. Connect and assign this router/instance to your 128T conductor either using the GUI or PCLI. **Result**: The router installs automatically.

### Configure 128T Using AWS
After  installing 128T using Amazon Web Services, you must then create and apply configuration elements. During the configuration process you'll set up the following:
- Route Tables
- Internet Gateways

#### To configure a conductor or router on AWS:
1. Using AWS, navigate to the EC2 Dashboard pane and **Select Instances**. 
2. On the _Description_ tab and next to the Security field, click **Launch Wizard**.
3. On the _Inbound_ tab, click **Edit** and adjust your settings for HTTPS access to your conductor.
4. From the _Edit Inbound Rules_ section, click **Add Rule** to add HTTPS specific rules using the drop down menu.
5. After all rules are added, click **Save**.
6. From the main toolbar, click **Services** to expand the Services list and select **VPC**.
7. From the VPC Dashboard pane, click **Your VPCs**.
8. From the VPC Dashboard pane, click **Route Tables** and then **Create Route Table**.
9. In the _Create Route Table_ dialog box, enter the following information and click **Yes, Create**.
- Name Tag: Enter a name for your route table
- VPC: Using the dropdown list, select the VPC to associate with the route table
10. From the VPC Dashboard pane, select **Internet Gateways** and click **Create Internet Gateway**.
11. In the _Create Internet Gateway_ dialog box, enter an Internet Gateway name in the Name Tag field and click **Yes, Create**.
12. On the _Internet Gateways_ page, click **Attach to VPC** and assign the Internet Gateway to your VPC.
13. From the VPC Dashboard pane, select **Route Tables** and click **Edit**.
14. Click **Add Another Route**.
15. In the 0.0.0.0/0 row, click the empty cell under the Target column and the local name automatically appears as a selectable option. Select it and click **Save**.
## Post Installation

On occasion, after installing your 128T Routing Software, you may want to stop or upgrade your software. The procedures for stopping and upgrading your software are intended for reference and are not required as part of your software installation or maintenance.

### Stopping the 128T Routing Software
Occasionally, you may need to stop the 128T software to perform maintenance on your system.

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
4. Close the command prompt window.

### Upgrading the 128T Software
Upgrading your 128T Routing Software follows a similar process as the initial installation and also uses the install128 application. Your 128T Router or Conductor must have internet access to download the latest software packages (128T routers can be configured to use the conductor as their software repository; please refer to the configuration section of the 128T documentation for instructions on configuring the Conductor-Hosted Repository). As with any upgrade activity, it is always prudent to create a backup of your current software configuration before initiating any upgrade activity.

#### Upgrading using the Interactive Installer
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

#### Upgrading using Automated Provisioner (PCLI)
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

#### Upgrading using Automated Provisioner (GUI)
Similar to the process for upgrading using the PCLI, the Automated Provisioner upgrade process using the GUI is done in two stages: *download* and *upgrade*.

1. Navigate to the Router page in the Conductor's UI. Routers that have available upgrades will indicate as such using a blue upgrade badge in the router list.
2. Click on the Upgrade 128T icon (the arrow within a circle) next to your router. Result: a list of upgrade and download options appears. This list is filterable if the list of available options grows large.
3. Click on the target release in the Available Downloads section of the list. You will be asked to confirm the operation.<br/>Result: the 128T will begin downloading the software. Click on the router in the router list to monitor its progress.
4. Once complete, click the Upgrade 128T icon again, and select the target software release from the Available Upgrades list. You will again be asked to confirm this operation.<br/>Result: the router will now begin the upgrade process.

The Automated Provisioner will upgrade both nodes in a high availability router in series to minimize/avoid downtime. Despite this, it is still recommended to perform upgrade activity during periods of low traffic or maintenance windows.

### Rolling Back Software
Occasionally you may want or need to revert to a previously running version of 128T software. This is referred to as *rolling back*, and can be accomplished via either the standalone 128T installer application, or by using Automated Provisioner. (Note: as with upgrading, rolling back software using Automated Provisioner is only possible on routers managed by a 128T Conductor.)

#### Rolling Back using the Interactive Installer
1. As a Linux superuser (or as a Linux user with *sudoers* capability) run the Interactive Installer by issuing the command
  ```
install128t
  ```

2. Skip the step regarding the installation of a certificate by selecting *No* at the prompt.

3. The Interactive Installer will determine that 128T software is already installed. In the dialog box, navigate to the item labeled Roll Back and press the space bar to select the item.
:::tip
The version of software that will be running after executing the roll back function is displayed in the footer of the window.
:::

4. Navigate to the OK button and press `enter` to select it.

5. Follow the on-screen prompts to complete the Roll Back operation.

#### Rolling Back using Automated Provisioner
From the PCLI command line on your 128T conductor, issue the command:
```
send command rollback router [router name]
```
Confirming the action will initiate the rollback process.

### Uninstalling 128T
To uninstall 128T software and remove all configuration, libraries, and applications installed along with 128T, use the command `nuke128t` from the Linux shell, as root user.

:::warning
This action is not revertible.
:::