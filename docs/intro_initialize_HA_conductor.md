---
title: Conductor High Availability for Cloud Deployments
sidebar_label: Conductor High Availability for Cloud Deployments
---

This document describes the process for deploying a Highly Available Conductor in the AWS and Azure clouds. The procedure for deploying on Azure has additional steps performed using the Azure Portal. If you are installing on Azure, please refer to [Using the Azure Portal](#using-the-azure-portal) before beginning.  

## Introduction

Juniper Networks is committed to providing the highest quality software with each release. As such, Critical Vulnerability Exposures (CVE) are continuously addressed, and security and administration best practices are enforced. Allowing SSH Root login has been identified as a significant vulnerability and has been mitigated. Additionally, all public cloud providers enforce SSH key-based authentication instead of password-based authentication. As a result of this stricter security posture, the process to deploy a Highly Available Conductor in the public cloud requires additional steps during the Initialization procedure. Use the following procedure to successfully deploy an HA Conductor in the cloud. 

The process to deploy a highly available Conductor in the public cloud consists of the following steps:

1. Launch two Session Smart Conductor VMs as described in the following links:

* [AWS](intro_installation_quickstart_aws.md)
* [Azure](intro_installation_azure.md)

Click on the link of the public cloud provider where you want to perform the Session Smart Conductor HA deployment. In this document these Conductors are referred to as Node A and Node B respectively.

2. If you have selected the Hourly or Private AWS AMI or Azure Plan during step 1, then proceed to step 3. Otherwise, refer to [Deploying the Primary Node Conductor – Node A](#deploying-the-primary-node-conductor--node-a) to install the SSR software in Node A. When completed, proceed to step 4.
 
3. Initialize the primary node of Conductor as described in the section [Configure Node A](#configure-node-a).

4. If you have selected the Hourly or Private AWS AMI or Azure Plan during step 1, then proceed to step 5. Otherwise, refer to [Deploying the Primary Node Conductor – Node B](#deploying-the-secondary-node-conductor--node-b) to install the SSR software in Node B. When completed, proceed to step 6.

5. Initialize the secondary node of Conductor as described in the section [Configure Node B](#configure-node-b).

6. [Disable Password-based Authentication in the Primary Node](#disable-password-based-authentication-in-the-primary-node).

7. [Validate the HA Conductor Deployment](#validate-the-ha-conductor-deployment).

## Deploying the Primary Node Conductor – Node A

If the SSR software is not already installed on the Node A VM, refer to the [High Availability Conductor Installation](ha_conductor_install.mdx) procedure. After the installation is complete, the system will restart and the initializer will launch automatically.

If the software is already installed, launch the initializer from the command line using `initialize128t`.

### Configure Node A
1. On the SSR Initializer Wizard, use the spacebar to select the Conductor role for the SSR node and press the Enter key to select OK.
2. To configure Node A, select **1st HA Node HA peer is not set up** on the HA Setup screen, and OK. 

	![HA Setup](/img/CloudHA_NodeA1.png)

3. Enter the IP address of Node A that will be used as the HA sync interface.
4. Continue with step 4 in the [Initialize the SSR Node](intro_installation_bootable_media.mdx#initialize-the-ssr-node) procedure. After the initialization is complete, reboot Node A as instructed.

	Once Node A has rebooted, you must perform the following steps to configure SSH key-based authentication. Please note the commands vary depending on the public cloud provider.

5. Log in to the Node A VM via SSH and run the following commands, according to your public cloud provider.
	- Azure: `sudo su -`
	         `passwd <username of the VM>`
	- AWS: `sudo su –`
	       `passwd t128`

	When the password has been updated successfully the following message is displayed:

	`passwd: all authentication tokens updated successfully`
	
	:::note 
	Do not proceed to the next step until the password has been updated successfully.
	:::

6. After updating the password, perform the following commands.
```
mv /etc/sudoers.d/90-cloud-init-users /etc
visudo -f /etc/sudoers
```

7. In the output of `visudo -f`, verify the line `%wheel  ALL=(ALL)  ALL` is **not** prepended with a #.
8. In the output of `visudo -f`, verify the line `# %wheel   ALL=(ALL)  NOPASSWD: ALL` is prepended with a #.
```
## Allows people in group wheel to run all commands
%wheel  ALL=(ALL) 	ALL
## Same thing without a password
# %wheel 	ALL=(ALL) 	NOPASSWD: ALL
```

Node A is now ready to allow access to Node B in order to form the HA pair. The user (t128 for AWS, or the user login for the Azure VM) has been set up in Node A to temporarily accept password-based authentication.

## Deploying the Secondary Node Conductor – Node B

Log in to the Node B VM. If the SSR software is not already installed on the Node A VM, refer to the [High Availability Conductor Installation](ha_conductor_install.mdx) procedure. After the installation is complete, the system will restart and the initializer will launch automatically.
If the software is already installed, launch the initializer from the command line using `initialize128t.`

1. On the SSR Initializer Wizard, use the space bar to select the Conductor role for the SSR node and press the Enter key to select OK.
2. To configure Node B, select **2nd HA Node HA peer is already set up** on the HA Setup screen, and **OK**.

	![HA Setup](/img/CloudHA_NodeB1.png)

3. Enter the IP address for the HA Sync Interface on Node B in the HA Address field.

	![HA Setup Node](/img/CloudHA_NodeB2.png)

4. Enter the IP address for Node A in the Peer HA Address field.

	![HA Peer Credentials](/img/CloudHA_NodeB3.png)

5. On the HA Peer Credentials screen, enter the username and password configured for Node A.

| Azure | Amazon Web Services - AWS |
|------ | ------ |
| Username is (username of the VM) | Username is t128 |

6.  Select OK. Upon successful configuration, the following message is displayed.

:::important
Do not restart Node A. Restart only Node B as suggested by the installer.
:::

### Disable Password-based Authentication in the Primary Node

To ensure secure operation, you must disable password-based authentication so Node A only allows SSH Key-based authentication.
1. Log in to Node A via SSH.
2. Based on your public cloud provider, run the following commands to disable password-based authentication.
	**Azure:**


```
	sudo su -
mv /etc/90-cloud-init-users /etc/sudoers.d
passwd -d <username of the VM>
passwd -l <username of the VM>
```

**AWS:**
```
	sudo su -
mv /etc/90-cloud-init-users /etc/sudoers.d
passwd -d t128
passwd -l t128
```

3. Reboot Node A in order for it to recognize Node B.

### Validate the HA Conductor Deployment

When Node A has fully rebooted, both Node A and Node B will be synced. To validate the Conductor deployment is Highly Available, login to the Conductor CLI (pCLI) on Node A and run the command `show system connectivity`. If the status displays **Connected**, the HA setup has completed successfully.

## Using the Azure Portal

This section describes the process to deploy a SSR Conductor in HA using the Azure Portal.

1. Begin with the section [Deploying the Primary Node Conductor – Node A](#deploying-the-primary-node-conductor--node-a).
2. After Node A reboots, click on the name of the VM shown in the Azure Portal (Node A).
3. In the left menu, scroll down to the Support + troubleshooting section and select Reset password.

	![Support and Troubleshooting](/img/CloudHA_azure1.png)

4. Enter the username you use to log into the VM via SSH, and enter a temporary password.

	![Reset Screen](/img/CloudHA_azure2.png)

5. Click on Save and wait until the request to reset the password is completed.

	![Update Screen](/img/CloudHA_azure3.png)

	![Notifications Screen](/img/CloudHA_azure4.png)

6. Check the list of notifications to confirm the change.
7. Perform the configuration steps in the section [Deploying the Secondary Node Conductor – Node B](#deploying-the-secondary-node-conductor--node-b).

8. To disable password-based authentication in the primary node of the Conductor using the Azure portal, click on the name of the VM shown in the Azure Portal (Node A).
9. In the left menu, scroll down to the **Support + troubleshooting** section and select Reset password.

![Support and Troubleshooting](/img/CloudHA_azure1.png)

10. Select mode “reset SSH public key.”

![Reset SSH Key](/img/CloudHA_azure5.png)


11. Enter the username and paste the value of the corresponding public SSH key.
12. Click on Save and verify the request to reset the SSH key in the notifications list.

To validate the Conductor has been deployed successfully, refer to the section [Validate the HA Conductor Deployment](#validate-the-ha-conductor-deployment).

