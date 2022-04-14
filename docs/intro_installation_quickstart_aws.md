---
title: Installing in AWS
sidebar_label: Installing in AWS
---

## Introduction

This guide describes the process for deploying a Session Smart Conductor and a Session Smart Router (SSR) in AWS.

#### Selecting the AMI

There are different AMIs (images) available for the Juniper Session Smart Networking Platform offering:

* Bring Your Own License: The pricing model of this offering is Bring Your Own License (BYOL). A token or certificate is required to install the software. If a token or certificate is not in your possession, please contact your Juniper Sales representative. Refer to the [Session Smart Networking Platform (BYOL)](https://aws.amazon.com/marketplace/pp/prodview-lz6cjd43qgw3c?sr=0-2&ref_=beagle&applicationId=AWSMPContessa) offering.
* Private: For cases where there is no access to the SSR repositories (no internet connection) from the AWS environment where the software will be deployed, a Private Offer can be issued to your AWS account via the AWS Marketplace. To request access to a private offer, refer to [Requesting access to a Private offer](#requesting-access-to-a-private-offer) for additional information.
* Hourly: This provides a free trial period for 30 days and an hourly software cost after the trial expires. This plan is recommended for Proof of Concepts and Trials only. Software upgrades and deployments outside of the cloud, (on premises) require a token or certificate. The software can not be purchased via the marketplace. Refer to the [Session Smart Networking Platform (PAYG)](https://aws.amazon.com/marketplace/pp/prodview-l5kwn7puwvt3g?sr=0-1&ref_=beagle&applicationId=AWSMPContessa) offering.

### Requesting access to a Private Offer

:::important
There is no software cost associated with deploying the Private image, the cost of running the EC2 instance is the only cost (AWS compute cost). Please also note that software upgrades and deployments **outside** of the cloud (e.g., on premises) will not be possible without a token or certificate.
:::

To request access to a Private offer:

1. Locate the account ID of the AWS account where the deployment of the software is going to take place:

* Click [here](https://console.aws.amazon.com) to go to the AWS console.
* On the right at the top of the screen, click on the downward arrow next to your username. If you cannot find the account ID associated with your AWS account access the following URL https://console.aws.amazon.com/billing/home?region=us-east-1&skipRegion=true#/account.
* Take note of your account ID.

2. Contact your Juniper Networks Sales representative and provide:

* The Account ID of the AWS account that will be used for the deployment.
* The version of the Session Smart Networking software. Your Juniper Sales representative will assist you if you don't know the version you need for your deployment.

Your Juniper Sales representative will email you the private offer.

3. When you receive the email containing the private offer, click to open and review / accept the terms and conditions.

## Session Smart Conductor Deployment

### Requirements

The following infrastructure must exist in your AWS account:
* A VPC where the Conductor will be deployed.
* The existing VPC is segmented with at least one subnet.
  * The subnet is reachable for SSH and HTTPs access for administration purposes.
  * The Session Smart Routers managed by this Conductor must be able to reach the IP address of the Conductor in this subnet.

### Deployment

A Conductor can be deployed manually via the [AWS Console](https://console.aws.amazon.com) or in an automated fashion using AWS CLI commands. This section describes both methods. Choose the method that better suits your needs.

When deploying the Session Smart Conductor using the templates referenced in this section, the following infrastructure elements are created automatically to assist with the deployment process:
* EC2 instance using a Session Smart image available in the marketplace.
* The Conductor is deployed with a single network interface identified as the control interface.
 * There is a network security group associated with the control interface.
 * The control interface has a unique and static public IP address.

The following image shows the infrastructure elements deployed:

![Conductor deployment](/img/platforms_aws_conductor_deployment.png)

#### AWS Console

To deploy the Session Smart Networking software via the AWS Console:

Click on the **Session Smart Networking Platform** offering selected during the previous section "Selecting the AMI". 
Click on the “Continue to Subscribe” button and accept the terms and conditions.
Click on the “Continue to Configuration” button.
In the "Fulfillment Option" drop down box select "CloudFormation Template", select the template "Juniper Session Smart Conductor" and select the desired region.
Click on the "Continue to Launch" button.
In the "Choose Action" box, select "Launch CloudFormation" and click on the button "Launch".

Answer the following 3 questions to launch the deployment of a Conductor (additional information [here](#launch-the-template)):
* What name do you want to give it?  
Provide it in the "Stack name" field (for example: Conductor).
* Where do you want to deploy it?
 * Select the VPC in the region.
 * Select the subnet within the VPC.
* Who is going to be the administrator?
Select the IAM user key.

Click the "Next" button.
Click on the "Create stack" button to launch the deployment.

![Plans](/img/platforms_aws_deployment_complete.png)

Once the deployment completes, information is provided in the Outputs tab:
* If the **Session Smart Networking Platform** offering selected for the deployment was the **BYOL**, SSH to the EC2 instance using `t128` as the username as indicated in the `SSHLogin` field. Launch the software installation process with the command `sudo ssr-install`.
* If the **Session Smart Networking Platform** offering selected for the deployment was a **Private AMI** or an **Hourly AMI**, click on the HTTPS URL of the `HTTPSLogin` field to login to the Conductor GUI (In some cases when using Chrome, the self-signed certificate may return an "unsafe" connection. Click through the message.). The credentials are “admin” for username and the password is 128Tadmin. To login to the instance via SSH, use `t128` as the username and the SSH public key of the IAM user provided in the template.

:::important
Be sure to change the password that conforms to your business' password requirements and criteria.
:::

#### AWS CLI

To deploy the Session Smart Networking software via the AWS CLI:

Click on the **Session Smart Networking Platform** offering selected during the previous section "Selecting the AMI". 
Click on the “Continue to Subscribe” button and accept the terms and conditions.
Click on the “Continue to Configuration” button.
In the "Fulfillment Option" drop down box select "CloudFormation Template", select the template "Juniper Session Smart Conductor" and select the desired region.
Click on the "Continue to Launch" button.
In the "Choose Action" box, select "Launch CloudFormation" and click on the button "Launch".
Copy to the clipboard the URL of the template located in the field "Amazon S3 URL".

Launch the deployment with the corresponding AWS CLI commands making use of the S3 URL of the template identified previously. For additional information please click [here](#launch-the-template).

Once the deployment completes, information is provided in the Outputs tab:
* If the **Session Smart Networking Platform** offering selected for the deployment was the **BYOL**, SSH to the EC2 instance using `t128` as the username as indicated in the `SSHLogin` field. Launch the software installation process with the command `sudo ssr-install`.
* If the **Session Smart Networking Platform** offering selected for the deployment was a **Private AMI** or an **Hourly AMI**, click on the HTTPS URL of the `HTTPSLogin` field to login to the Conductor GUI (In some cases when using Chrome, the self-signed certificate may return an "unsafe" connection. Click through the message.). The credentials are “admin” for username and the password is 128Tadmin. To login to the instance via SSH, use `t128` as the username and the SSH public key of the IAM user provided in the template.

:::important
Be sure to change the password that conforms to your business' password requirements and criteria.
:::

## Session Smart Router Deployment

### Requirements

The following infrastructure must exist in your AWS account:
* A VPC where the Session Smart Router will be deployed.
* The existing VPC is segmented with at least three subnets. The role of each subnet is described below:
  * Public subnet. The expectation is that this subnet provides connectivity to enable communication with external/remote SSR peers.
  * Private subnet. The expectation is that this subnet provides connectivity to internal workloads within the cloud.
  * Management subnet. The expectation is that this subnet meets the following capabilities:
    * The subnet is reachable for SSH for administration purposes.
    * The interface of the Conductor that is going to manage this router must be reachable from this subnet.

:::important
Please note that deploying Session Smart Routers without a valid token or certificate will be limited to deployments within the cloud only. If your use case requires the deployment of an SSR on your premises as well, please contact your Juniper Sales representative.
:::

### Deployment

A Session Smart Router can be deployed manually via the [AWS Console](https://console.aws.amazon.com) or in an automated fashion using AWS CLI commands. This section describes both methods. Choose the method that better suits your needs.

When deploying the Session Smart Router using the templates referenced in this section, the following infrastructure elements are created automatically to assist with the deployment process:
* EC2 instance using a Session Smart image available in the marketplace.
* The router is deployed with three network interfaces: public, private and management interfaces.
* Each network interface has a network security group associated. The network security groups are configured in accordance with the requirements to deploy a fabric with Session Smart Networking software.
* The public and management interfaces have a unique and static public IP address associated.

The following image shows the infrastructure elements deployed:

![Router deployment](/img/platforms_aws_router_deployment.png)

#### AWS Console

To deploy the Session Smart Networking software via the AWS Console:

Click on the **Session Smart Networking Platform** offering selected during the previous section "Selecting the AMI". 
Click on the “Continue to Subscribe” button and accept the terms and conditions.
Click on the “Continue to Configuration” button.
In the "Fulfillment Option" drop down box select "CloudFormation Template", select the template "Juniper Session Smart Router" and select the desired region.
Click on the "Continue to Launch" button.
In the "Choose Action" box, select "Launch CloudFormation" and click on the button "Launch".

Answer the following 4 questions to launch the deployment of an SSR (additional information [here](#launch-the-template)):
* What name do you want to give it?  
Provide it in the "Stack name" field (for example: 128TRouter).
* Where do you want to deploy it?
 * Select the VPC in the region.
 * Select the public, private and management subnets within the VPC.
* Which Session Smart Conductor is going to manage it?  
Provide the IP address of the primary node of Conductor in the "Conductor Primary Control IP" field, and only if the Conductor is highly available then provide the IP address of the secondary node of Conductor in the "Conductor Secondary Control IP" field. Please check the public IP address assigned to the Session Smart Conductor deployed in the previous section.
* Who is going to be the administrator?
Select the IAM user key.

Click the "Next" button.
Click on the "Create stack" button to launch the deployment.

![Plans](/img/platforms_aws_deployment_complete.png)

Once the deployment completes, information is provided in the Outputs tab:
* If the **Session Smart Networking Platform** offering selected for the deployment was the **BYOL**, SSH to the EC2 instance using `t128` as the username as indicated in the `SSHLogin` field. Launch the software installation process with the command `sudo ssr-install`.
* If the **Session Smart Networking Platform** offering selected for the deployment is a **Private AMI** or an **Hourly AMI**, and IP address/es to an existing Conductor have been provided in the template, the non-interactive, Zero Touch Provisioning (ZTP) method is triggered. After the VM is deployed, an additional 2-3 minutes are required before the ZTP process initializes. When the ZTP process is ready, there will be an asset in the Conductor to be associated with the router configuration. Then, login to Conductor via HTTPs to associate the pending asset with the configuration of the router. If the asset is not associated with a router, an unmanaged router will be deployed, and must be initialized manually. To login to the instance via SSH, use `t128` as the username and the SSH public key of the IAM user provided in the template.

#### AWS CLI

To deploy the Session Smart Networking software via the AWS CLI:

Click on the **Session Smart Networking Platform** offering selected during the previous section "Selecting the AMI". 
Click on the “Continue to Subscribe” button and accept the terms and conditions.
Click on the “Continue to Configuration” button.
In the "Fulfillment Option" drop down box select "CloudFormation Template", select the template "Juniper Session Smart Router" and select the desired region.
Click on the "Continue to Launch" button.
In the "Choose Action" box, select "Launch CloudFormation" and click on the button "Launch".
Copy to the clipboard the URL of the template located in the field "Amazon S3 URL".

Launch the deployment with the corresponding AWS CLI commands making use of the S3 URL of the template identified previously. For additional information please click [here](#launch-the-template).

Once the deployment completes, information is provided in the Outputs tab:
* If the **Session Smart Networking Platform** offering selected for the deployment was the **BYOL**, SSH to the EC2 instance using `t128` as the username as indicated in the `SSHLogin` field. Launch the software installation process with the command `sudo ssr-install`.
* If the **Session Smart Networking Platform** offering selected for the deployment is a **Private AMI** or an **Hourly AMI**, and IP address/es to an existing Conductor have been provided in the template, the non-interactive, Zero Touch Provisioning (ZTP) method is triggered. After the VM is deployed, an additional 2-3 minutes are required before the ZTP process initializes. When the ZTP process is ready, there will be an asset in the Conductor to be associated with the router configuration. Then, login to Conductor via HTTPs to associate the pending asset with the configuration of the router. If the asset is not associated with a router, an unmanaged router will be deployed, and must be initialized manually. To login to the instance via SSH, use `t128` as the username and the SSH public key of the IAM user provided in the template.

### Configuring a Device Interface

The _Session Smart Router Template_ deploys an EC2 instance for the SSR with three network interfaces. The template attaches the network interfaces to the EC2 instance in the following order: Management, Public, and Private. The network interfaces are mapped as follows:

| Network interface name | Subnet           | PCI Address     |
| ---------------------- | ---------------- | ----------------|
| eth0                   | Management       | 0000:00:05.0    |
| eth1                   | Public           | 0000:00:06.0    |
| eth2                   | Private          | 0000:00:07.0    |

In earlier versions of the 128T Networking Platform software (pre-5.0), the SSR used the PCI addresses to map to the device interfaces. If you are installing an earlier version of the Software, please see [PCI Address Association](#pci-address-association).

#### Assign the PCI Address Identifier to a Device Interface

Assign the VMBus UUID to a device interface using the CLI.

1. Login to the CLI on the Conductor. 
2. Run the following commands to configure a device interface with a PCI Address on a router:

```
configure authority router <router name> node <node name> device-interface <device interface name>
type ethernet
forwarding true
pci-address <device interface vmbus uuid>
top
```

3. Repeat the steps above for each device interface and router running on AWS.

4. Validate and commit the changes.
```
validate
commit
```

#### Verify Connectivity

1. Login via SSH to the EC2 instance of each router running on AWS. 

2. Login to the SSR CLI.
	
	`su admin`

3. Ping the gateway of each device interface.
	
	`ping <gateway IP address>`

4. Confirm AWS gateways reply to ping successfully.

## Annexes

### Launch the Template

This section describes how to fill out and launch the template via the AWS marketplace and programmatically to deploy a Session Smart Conductor and SSR.

#### Session Smart Conductor

This section describes the parameters to fill out the template to deploy a Session Smart Conductor as well as how to launch it via the portal and programmatically.

A description of the parameters of the template are listed in the following table:

| Parameter            | Description                                                                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Stack name           | Fill out the Instance Name field to provide a name to the VM for the Conductor.                                                                                     |
| VPC ID               | ID of the existing VPC where the Conductor is going to be deployed to.                                                                                           |
| Control Subnet ID    | ID of the control (public) subnet within the VPC.                                                                                                                          |
| Control Allowed CIDR | It is used to define a trusted source IP address range which represents the source IP addresses of the management interface of the SSRs to be managed. Connections originated from source IP addresses which are outside the range are not allowed, effectively protecting the Control Subnet. It is common to set this field to 0.0.0.0/0 (accepting traffic from all source IP addresses) for now, as the source IP addresses of the SSRs may not be known at this time. However, after the deployment and once these external IP addresses are known, it may be desirable to provision them explicitly in the corresponding security groups to increase the degree of security.                                                                                                |
| Instance size        | Size of the EC2 instance.                                                                                                                                                          |
| Key Name             | IAM user key (SSH public key) to login to the EC2 instance (Linux) via SSH.                                                                                                                 |
| Admin Allowed CIDR   | It allows for restricting reachability to the control interface of the Conductor to a well known source IP address CIDR range for management purposes. It is common to set this field to 0.0.0.0/0 (accepting traffic from all source IP addresses) for now, as the source IP address/es where the Conductor will be administered from may not be known at this time. However, once the deployment completes, it is highly recommended to update the configuration of the network security group to allow only access from the source IP address/es where the Conductor will be administered.                                                                                                                                                                                     |

##### AWS Console

Go to the **Session Smart Networking Platform** offering following the steps described in the section "Selecting the AMI".
Click on the “Continue to Subscribe” button and accept the terms and conditions.
Click on the “Continue to Configuration” button.
In the "Fulfillment Option" drop down box select "CloudFormation Template", select the template "Juniper Session Smart Conductor" and select the desired region.
Click on the "Continue to Launch" button.
In the "Choose Action" box, select "Launch CloudFormation" and click on the button "Launch".
Click the "Next" button.
Fill out the template. Review the section above to understand the parameters of the template.
Continue clicking the "Next" button.
Click **Create Stack** to start the deployment.

Once the deployment of the template is complete, information about the new Conductor deployment is provided in the Output tab.

The information listed in the Outputs tab is the following:
* Instance ID of the Conductor EC2 instance.
* Private IP address of the control interface.
* Public IP address of the control interface.
* HTTPs URL to login to the Conductor GUI. Please continue to the end of this section below for more information regarding the credentials to login.
* SSH command to login to the Linux VM. Please continue to the end of this section below for more information regarding the credentials to login.

:::important
When logging to the Linux instance via SSH use `t128` as the username and the SSH public key of the IAM user provided in the template.
If a template of the Bring Your Own License image was used, SSH to the EC2 instance using `t128` as the username as indicated in the `SSHLogin` field. Launch the software installation process with the command `sudo ssr-install`.
If a Conductor template of a Private or Hourly image was used, you can login to the application via HTTPs as indicated in the `HTTPSLogin` fields respectively, the username is "admin" and the password is 128Tadmin.
:::

##### AWS CLI 

Alternatively, it is possible to launch the template programmatically. Please adjust the content of the JSON file below to match the input of each template.

Create the parameters file conductor.parameters.json with the following command:

```
vi conductor.parameters.json
```

and paste the following JSON content, please adjust the values to your specific environment:

```
{
  "StackName": "<instance name>",
  "VpcId": "<ID of the VPC>",
  "ControlSubnet": "<ID of the subnet within the VPC>",
  "ControlAllowedCidr": "0.0.0.0/0",
  "InstanceType": "c5.xlarge",
  "KeyName": "<username>",
  "AdminAllowedCidr": "0.0.0.0/0"
}
```

Go to the **Session Smart Networking Platform** offering following the steps described in the section "Selecting the AMI".
Click on the “Continue to Subscribe” button and accept the terms and conditions.
Click on the “Continue to Configuration” button.
In the "Fulfillment Option" drop down box select "CloudFormation Template", select the template "Juniper Session Smart Conductor" and select the desired region.
Click on the "Continue to Launch" button.
In the "Choose Action" box, select "Launch CloudFormation" and click on the button "Launch".
Copy to the clipboard the URL of the template located in the field "Amazon S3 URL".

Launch the template running the following command:

```
aws ec2 create-launch-template \
  --launch-template-name <template-file> \
  --launch-template-data file://conductor.parameters.json
```

:::important
When logging to the Linux instance via SSH use `t128` as the username and the SSH public key of the IAM user provided in the template.
If a template of the Bring Your Own License image was used, SSH to the EC2 instance using `t128` as the username as indicated in the `SSHLogin` field. Launch the software installation process with the command `sudo ssr-install`.
If a Conductor template of a Private or Hourly image was used, you can login to the application via HTTPs as indicated in the `HTTPSLogin` fields respectively, the username is "admin" and the password is 128Tadmin.
:::

#### Session Smart Router

This section describes the parameters to fill out the template to deploy an SSR as well as how to launch it via the portal and programmatically.

A description of the parameters of the template are listed in the following table:

| Parameter            | Description                                                                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Stack name           | Fill out the Instance Name field to provide a name to the VM for the Conductor.                                                                                     |
| VPC ID               | ID of the existing VPC where the Conductor is going to be deployed to.                                                                                           |
| Public Subnet ID     | ID of the public subnet within the VPC.                                                                                                                          |
| Public Subnet Allowed CIDR | The IP CIDR range of the endpoints allowed to originate traffic to the Router's public interface in the public subnet.                                     |
| Private Subnet ID    | ID of the private subnet within the VPC.                                                                                                                          |
| Private Subnet Allowed CIDR | The IP CIDR range of the endpoints allowed to originate traffic to the Router's private interface in the private subnet.                                     |
| Management Subnet ID    | ID of the management subnet within the VPC.                                                                                                                          |               
| Admin Allowed CIDR   | It allows for restricting reachability to the control interface of the Conductor to a well known source IP address CIDR range for management purposes. It is common to set this field to 0.0.0.0/0 (accepting traffic from all source IP addresses) for now, as the source IP address/es where the Conductor will be administered from may not be known at this time. However, once the deployment completes, it is highly recommended to update the configuration of the network security group to allow only access from the source IP address/es where the Conductor will be administered.                                                                                                                                                                                  |
| Conductor Primary Control IP   | If a Session Smart  Conductor has already been deployed, fill out the field Conductor Primary Control IP with the IP address of the control interface of the primary node of Session Smart  Conductor. The IP address of the control interface of Conductor should be reachable from the Management subnet selected above. It must be a valid IP address of the form x.x.x.x. If no Session Smart Conductor has been deployed yet or the intention is simply deploying an unmanaged router please refrain from entering any value in this field.                                                                                        |
| Conductor Secondary Control IP | If there is an existing Session Smart  Conductor already deployed and the deployment of the Conductor is Highly Available, please enter the IP address of the control interface of the secondary node of Session Smart  Conductor in the field Conductor Secondary Control IP. If the existing deployment of the Session Smart  Conductor is not Highly Available, in other words if the Conductor is standalone, please refrain from entering any value in this field.    |
| Instance size        | Size of the EC2 instance.                                                                                                                                                          |
| Key Name             | IAM user key (SSH public key) to login to the EC2 instance (Linux) via SSH.                                                                                                                 |

##### AWS Console

Go to the **Session Smart Networking Platform** offering following the steps described in the section "Selecting the AMI".
Click on the “Continue to Subscribe” button and accept the terms and conditions.
Click on the “Continue to Configuration” button.
In the "Fulfillment Option" drop down box select "CloudFormation Template", select the template "Juniper Session Smart Router" and select the desired region.
Click on the "Continue to Launch" button.
In the "Choose Action" box, select "Launch CloudFormation" and click on the button "Launch".
Click the "Next" button.
Fill out the template. Review the section above to understand the parameters of the template.
Continue clicking the "Next" button.
Click **Create Stack** to start the deployment.

Once the deployment of the template is complete, information about the new router deployment is provided in the Output tab.

The information listed in the Outputs tab is the following:
* Instance ID of the Router EC2 instance.
* Public IP address of the management interface for administration purposes.
* SSH command to login to the Linux VM. Please continue to the end of this section below for more information regarding the credentials to login.

:::important
When logging to the Linux instance via SSH use `t128` as the username and the SSH public key of the IAM user provided in the template.
If a template of the Bring Your Own License image was used, SSH to the EC2 instance using `t128` as the username as indicated in the `SSHLogin` field. Launch the software installation process with the command `sudo ssr-install`.
If a Conductor template of a Private or Hourly image was used, you can login to the application via HTTPs as indicated in the `HTTPSLogin` fields respectively, the username is "admin" and the password is 128Tadmin.
:::

##### AWS CLI 

Alternatively, it is possible to launch the template programmatically. Please adjust the content of the JSON file below to match the input of each template.

Create the parameters file router.parameters.json with the following command:

```
vi router.parameters.json
```

and paste the following JSON content, please adjust the values to your specific environment:

```
{
  "StackName": "<instance name>",
  "VpcId": "<ID of the VPC>",
  "PublicSubnet": "<ID of the public subnet within the VPC>",
  "PublicSubnetAllowedCidr": "0.0.0.0/0",
  "PrivateSubnet": "<ID of the public subnet within the VPC>",
  "PrivateSubnetAllowedCidr": "0.0.0.0/0",
  "ManagementSubnet": "<ID of the management subnet within the VPC>",
  "AdminAllowedCidr": "0.0.0.0/0",
  "ConductorPrimaryControlIP": "<IP address of primary node of Conductor>",
  "ConductorSecondaryControlIP": "<IP address of secondary node of Conductor>",
  "InstanceType": "c5.xlarge",
  "KeyName": "<username>"
}
```

Go to the **Session Smart Networking Platform** offering following the steps described in the section "Selecting the AMI".
Click on the “Continue to Subscribe” button and accept the terms and conditions.
Click on the “Continue to Configuration” button.
In the "Fulfillment Option" drop down box select "CloudFormation Template", select the template "Juniper Session Smart Router" and select the desired region.
Click on the "Continue to Launch" button.
In the "Choose Action" box, select "Launch CloudFormation" and click on the button "Launch".
Copy to the clipboard the URL of the template located in the field "Amazon S3 URL".

Launch the template running the following command:

```
aws ec2 create-launch-template \
  --launch-template-name <template-file> \
  --launch-template-data file://router.parameters.json
```

:::important
When logging to the Linux instance via SSH use `t128` as the username and the SSH public key of the IAM user provided in the template.
If a template of the Bring Your Own License image was used, SSH to the EC2 instance using `t128` as the username as indicated in the `SSHLogin` field. Launch the software installation process with the command `sudo ssr-install`.
If a Conductor template of a Private or Hourly image was used, you can login to the application via HTTPs as indicated in the `HTTPSLogin` fields respectively, the username is "admin" and the password is 128Tadmin.
:::

### Deploying a Conductor or Router without using the templates

1. Launch a web browser and navigate to https://aws.amazon.com/
2. Login to AWS with your account.
   :::note
   If you do not have an account, click **Create an AWS Account** to register.
   :::
3. Click **EC2 Dashboard** and select your deployment region from the drop down list.
4. Click **Launch Instance**.
5. On the _Step 1: Choose an Amazon Machine Image (AMI)_ page, select the **Amazon Marketplace** tab and enter 128 Technology in the search bar.
6. Locate the 128 Technology image and click **Select**. 
7. On the _Step 2: Choose and Instance Type_ page, choose an instance type.
8. On the _Step 3: Configure Instance Details_ page, click **Subnet** and select the desired subnet and retain the default values for the other fields.
   :::note
   If the desired subnet is not listed, click **Create New Subnet** to create one.
   :::
9. Click **Next: Add Storage**.
   :::note
   The _You have changed your network setting_ window may appear.
   :::
   Select **Yes, I want to continue with this change** and click **Next**.
10. On the _Step 4: Add Storage_ page, ensure the size is 128 GB (default value).
11. Click **Next: Add Tags**.
12. On the the _Step 5: Add Tags_ page, click **Add Tags**. 
13. Click inside the Key column and select **Name**. Under the Value column enter the name for your instance.
14. Click **Next: Configure Security Group**.
15. On the _Step 6: Configure Security Group_ page, click **select an existing security group** and choose one from the list.
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
22. Record the instances IP address.
23. Launch a command window prompt.
24. Enter the IP address of the instance. **Result:** The interactive 128T Installer application launches.
25. When prompted by the installer, press the **Enter** key to select Begin.

### Configuring a default route to an Internet Gateway

If the EC2 instance deployed for the Session Smart software does not have access to the Internet, verify a default route to an Internet Gateway exists:

1. From the main toolbar, click **Services** to expand the Services list and select **VPC**.
2. From the VPC Dashboard pane, click **Your VPCs**.
3. From the VPC Dashboard pane, click **Route Tables** and then **Create Route Table**.
4. In the _Create Route Table_ dialog box, enter the following information and click **Yes, Create**.
* Name Tag: Enter a name for your route table
* VPC: Using the dropdown list, select the VPC to associate with the route table
5. From the VPC Dashboard pane, select **Internet Gateways** and click **Create Internet Gateway**.
6. In the _Create Internet Gateway_ dialog box, enter an Internet Gateway name in the Name Tag field and click **Yes, Create**.
7. On the _Internet Gateways_ page, click **Attach to VPC** and assign the Internet Gateway to your VPC.
8. From the VPC Dashboard pane, select **Route Tables** and click **Edit**.
9. Click **Add Another Route**.
10. In the 0.0.0.0/0 row, click the empty cell under the Target column and the local name automatically appears as a selectable option. Select it and click **Save**.