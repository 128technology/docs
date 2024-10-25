---
title: Installing a BYOL Conductor-managed Router in AWS
sidebar_label: Installing a BYOL Conductor-managed Router in AWS
---
This guide describes the process for deploying a BYOL Session Smart Conductor and a BYOL Session Smart Router (SSR) in AWS.

The installation and deployment process consists of the following steps:

* [Selecting the AMI](#selecting-the-ami).
* Deploying a [Session Smart Conductor](#session-smart-conductor-deployment).
* Deploying the [Session Smart Router](#session-smart-router-deployment).

Proceed to the next section [Selecting the AMI](#selecting-the-ami).

### Selecting the AMI

**Bring Your Own License (BYOL):** This allows you to install your own licensed copy of the SSR software on an AWS VM. Artifactory credentials are required to authenticate access to the installation repositories. Refer to the [Session Smart Networking Platform (BYOL)](https://aws.amazon.com/marketplace/pp/prodview-lz6cjd43qgw3c?sr=0-2&ref_=beagle&applicationId=AWSMPContessa) offering.

Once you have selected the AMI that better suits the needs of your deployment, proceed to the section [Session Smart Conductor Deployment](#session-smart-conductor-deployment) to deploy a Session Smart Conductor, or proceed to the section [Session Smart Router Deployment](#session-smart-router-deployment) to deploy a Session Smart Router.

## Session Smart Conductor Deployment

Use the following information to deploy a BYOL Session Smart Conductor in AWS.

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

1. Click on the **Session Smart Networking Platform BYOL** offering.
2. Click on the **Continue to Subscribe** button and accept the terms and conditions.
3. Click on the **Continue to Configuration** button.
4. In the **Fulfillment Option** drop down box select **CloudFormation Template**, select the template **Juniper Session Smart Counductor** and select the desired region.
5. Click on the **Continue to Launch** button.
6. In the **Choose Action** box, select **Launch CloudFormation** and click on the button **Launch**.


![CloudFormation Template](/img/aws-byol-conductor-template.png)

7. Answer the following questions to launch the deployment of an SSR. For a description of the parameters of the template, please refer to [Launch the Template](#launch-the-template).


- What version of SSR software do you want to install?
- What name do you want to give the instance?
  - Provide it in the **Stack name** field (for example: Conductor).
- Where do you want to deploy it?
  - Select the VPC in the region.
  - Select the subnet within the VPC.
- What are the artifactory credentials used to install the software?
- Who is going to be the administrator?
  - Select the IAM user key.
8. Click the **Next** button.
9. Click on the **Create stack** button to launch the deployment.

![Plans](/img/platforms_aws_deployment_complete.png)


Once the deployment completes, information is provided in the Outputs tab, and the BYOL installation process begins. After the VM is deployed it will take an addditional 10-15 minutes for the desired SSR version to be installed.

To login to the instance via SSH, use `t128` as the username and the SSH public key of the IAM user provided in the template.

### Using the AWS CLI

To deploy the Session Smart Networking software via the AWS CLI:

1. Click on the **Session Smart Networking Platform BYOL** offering.
2. Click on the **Continue to Subscribe** button and accept the terms and conditions.
3. Click on the **Continue to Configuration** button.
4. In the **Fulfillment Option** drop down box select **CloudFormation Template**, select the template **Juniper Session Smart Conductor** and select the desired region.
5. Click on the **Continue to Launch** button.
6. In the **Choose Action** box, select **Launch CloudFormation** and click on the button **Launch**.
7. Copy to the clipboard the URL of the template located in the field **Amazon S3 URL**.

Launch the deployment with the corresponding AWS CLI commands making use of the S3 URL of the template identified previously. For a description of the parameters of the template, please refer to [Launch the Template](#launch-the-template).

### Cloud-init Onboarding
When launching an AWS EC2 instance using automation the following user-data section can be leveraged to setup the onboarding data for the instance. Additionally, this method can be used to further customize the conductor onboarding configuration.

```
#cloud-config
write_files:
  - path: /etc/128T-hardware-bootstrapper/onboarding-config.json
    content: |
        {
            "name": "<conductor-name>",
            "ssr-version": "<version>",
            "mode": "conductor",
            "artifactory-user": "<username>",
            "artifactory-password": "<password>",
            "node-name": "node0"
        }
```

| Option | Meaning |
| ------ | ------- |
| name | The name of the router to use for Mist onboarding. By default, the instance name will be used. |
| ssr-version | The SSR software version to be installed on the instance. (BYOL only) |
| artifactory-user | User portion of the artifactory credentials. |
| artifactory-password | Password portion of the artifactory credentials. |
| node-name | The name of the node being provisioned. For a standalone conductor, this is `node0`. |

Additional Conductor configuration options can be found in [initialize your device - Advanced Workflows.] (initialize_u-iso_other.md)

### Manual Onboarding
If a user does not supply the onboarding configuration before launching the instance, the onboarding steps can be manually executed.

1. Log into the instance using the default AWS username `ec2-user` and the key pair provided when launching.
2. Run `/usr/libexec/hardwareBootstrapper128t config-generator`
3. Follow the prompts to generate and apply the onboarding configuration.
4. Upon completion, the instance will reboot once.


### Launch the Conductor Template

This section describes the parameters to complete the template to deploy a SSR conductor.

![CloudFormation Template](/img/aws-byol-conductor-template.png)

A description of the parameters of the template are listed in the following table:

| Parameter            | Description |
| -------------------- | ----------- |
| Stack name           | Fill out the Instance Name field to provide a name to the VM for the Mist-managed router.|
| VPC ID               | ID of the existing VPC where the Mist-managed router is going to be deployed. |
| Public Subnet ID     | ID of the management subnet within the VPC. |
| Public Subnet Allowed CIDR | The IP CIDR range of the endpoints allowed to originate traffic to the Conductor's management interface in the management subnet. |
| Artifactory Username | User portion of the artifactory credentials used to install the SSR software. |
| Artifactory Token | portion of the artifactory credentials used to install the SSR software. |
| Version | SSR software version installed on the instance. |
| Instance size        | Size of the EC2 instance.|
| Key Name             | IAM user key (SSH public key) to login to the EC2 instance (Linux) via SSH.|


#### AWS Console

1. Go to the **Session Smart Networking Platform BYOL** offering following the steps described in the section [Selecting the AMI](#selecting-the-ami).
2. Click on the **Continue to Subscribe** button and accept the terms and conditions.
3. Click on the **Continue to Configuration** button.
4. In the **Fulfillment Option** drop down box select **CloudFormation Template**, select the template **Juniper Session Smart Conductor** and select the desired region.
5. Click on the **Continue to Launch** button.
6. In the **Choose Action** box, select **Launch CloudFormation** and click on the button **Launch**.
7. Click the **Next** button.
8. Fill out the template. Review the section above to understand the parameters of the template.
9. Continue clicking the **Next** button.
10. Click **Create Stack** to start the deployment.

Once the deployment of the template is complete, information about the new router deployment is provided in the Output tab.

The information listed in the Outputs tab is the following:
* Instance ID of the Router EC2 instance.
* Public IP address of the public interface for administration purposes.
* SSH command to login to the Linux VM.

#### AWS CLI

Alternatively, it is possible to launch the template programmatically. Please adjust the content of the JSON file below to match the input of each template.

Create the parameters file router.parameters.json with the following command:

```
vi router.parameters.json
```

Paste the following JSON content. Please adjust the values to your specific environment:

```
{
  "StackName": "<instance name>",
  "VpcId": "<ID of the VPC>",
  "ManagementSubnet": "<ID of the management subnet within the VPC>",
  "ManagementSubnetAllowedCidr": "0.0.0.0/0",
  "ArtifactoryUsername": "<username>",
  "ArtifactoryUsername": "<password>",
  "SSRVersion": "<ssr-version>",
  "InstanceType": "c5.xlarge",
  "KeyName": "<username>"
}
```

1. Go to the **Session Smart Networking Platform BYOL** offering following the steps described in the section [Selecting the AMI](#selecting-the-ami).
2. Click on the **Continue to Subscribe** button and accept the terms and conditions.
3. Click on the **Continue to Configuration** button.
4. In the **Fulfillment Option** drop down box select **CloudFormation Template**, select the template **Juniper Session Smart Conductor** and select the desired region.
5. Click on the **Continue to Launch** button.
6. In the **Choose Action** box, select **Launch CloudFormation** and click on the button **Launch**.
7. Copy to the clipboard the URL of the template located in the field **Amazon S3 URL**.

Launch the template running the following command:

```
aws ec2 create-launch-template \
  --launch-template-name <template-file> \
  --launch-template-data file://router.parameters.json
```


## Deploying a Router without Templates

1. Launch a web browser and navigate to https://aws.amazon.com/
2. Login to AWS with your account.
   :::note
   If you do not have an account, click **Create an AWS Account** to register.
   :::
3. Click **EC2 Dashboard** and select your deployment region from the drop down list.
4. Click **Launch Instance**.
5. On the _Step 1: Choose an Amazon Machine Image (AMI)_ page, select the **Amazon Marketplace** tab and enter Session Smart Networking in the search bar.
6. Locate the SSR image and click **Select**.
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
11. Click **Next: Add Tags**. See [Interface Tagging](#interface-tagging) for additional tag configuration information.
12. On the the _Step 5: Add Tags_ page, click **Add Tags**.
13. Click inside the Key column and select **Name**. Under the Value column enter the name for your instance.
14. Click **Next: Configure Security Group**.
15. On the _Step 6: Configure Security Group_ page, click **select an existing security group** and choose one from the list.
    :::note
    If the desired security group is not listed you can create your own by selecting **Create a new security group** and following the prompts.
    :::
16. Expand the _Advanced Details_ and scroll down to the **User data** section. To onboard the router to the desired Mist organization, you can add cloud-init user-data using the steps in the [Cloud-init Onboarding](#cloud-init-onboarding) section.
17. Select **Review and Launch**.
18. In the _Boot from General Purpose_ window, select **Continue** and then click **Next**.
19. On the _Step 7: Review Instance Launch_ page, click **Launch** to finalize the instance.
20. In the _Select an existing key pair or create a new key pair_ dialog box, select **Choose an existing key pair** and select the desired key pair from the list.
    :::note
    If the desired key pair is not listed click **Create a new key pair**, enter a name in the Key pair name field and click **Download Key Pair**.
    :::
21. Check the acknowledgment check box and then click **Launch Instances**.
22. If an onboarding configuration was not provided in step 16, follow the manual steps to in the [Manual Onboarding](#manual-onboarding) section.



## Session Smart Router Deployment

Use the following guide to deploy a BYOL Session Smart Router in AWS.

### Requirements

The following infrastructure must exist in your AWS account:
* A VPC where the Session Smart Router will be deployed.
* The existing VPC is segmented with at least three subnets. The role of each subnet is described below
* [Enable enhanced network](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/enhanced-networking-ena.html#enabling_enhanced_networking) with ENA for maximum throughput performance. For SSR routers, execute the following command from your local computer

```
aws ec2 modify-instance-attribute --instance-id instance_id --ena-support
```

#### Public Subnet
This subnet must provide connectivity to enable communication with external/remote SSR peers.

#### Private Subnet
This subnet must provide connectivity to internal workloads within the cloud.

#### Management Subnet
This subnet is used for conductor-managed deployments, and has the following requirements:
* The subnet is reachable for SSH for administration purposes.
* The interface of the Conductor that manages this router must be reachable from this subnet.

### Deployment

A Session Smart Router can be deployed manually via the [AWS Console](https://console.aws.amazon.com) or in an automated fashion using AWS CLI commands. This section describes both methods. Choose the method that better suits your needs.

When deploying the Session Smart Router using the templates referenced in this section, the following infrastructure elements are created automatically to assist with the deployment process:
* EC2 instance using a Session Smart image available in the marketplace.
* The router is deployed with appropriate network interfaces as described [here](#requirements-1)
* Each network interface has a network security group associated. The network security groups are configured in accordance with the requirements to deploy a fabric with Session Smart Networking software.
* The public and management interfaces have a unique and static public IP address associated.

The following image shows the infrastructure elements deployed:

![Router deployment](/img/platforms_aws_router_deployment.png)

### Using the AWS Console

To deploy the Session Smart Networking software via the AWS Console:

1. Click on the **Session Smart Networking Platform BYOL** offering.
2. Click on the **Continue to Subscribe** button and accept the terms and conditions.
3. Click on the **Continue to Configuration** button.
4. In the **Fulfillment Option** drop down box select **CloudFormation Template**, select the template **Juniper Session Smart Conductor Managed Router** and select the desired region.
5. Click on the **Continue to Launch** button.
6. In the **Choose Action** box, select **Launch CloudFormation** and click on the button **Launch**.

![CloudFormation Template](/img/aws-byol-conductor-managed-template.png)

7. Answer the following questions to launch the deployment of an SSR. For a description of the parameters of the template, please refer to [Launch the Template](#launch-the-template).

- What version of SSR software do you want to install?
- What name do you want to give the instance?
  - Provide it in the **Stack name** field (for example: SSR_1_Router).
- Where do you want to deploy it?
  - Select the VPC in the region.
  - Select the public, private, and management subnets within the VPC.
- What are the artifactory credentials used to install the software?
- What is the control IP address of the Conductor used to manage it?
- **Optional** What is the secondary control IP address of the Conductor used to manage it?
- Who is going to be the administrator?
  - Select the IAM user key.
8. Click the **Next** button.
9. Click on the **Create stack** button to launch the deployment.


![Plans](/img/platforms_aws_deployment_complete.png)

Once the deployment completes, information is provided in the Outputs tab, and the BYOL installation process begins. After the VM is deployed it will take an addditional 10-15 minutes for the desired SSR version to be installed.

To login to the instance via SSH, use `t128` as the username and the SSH public key of the IAM user provided in the template.

### Using the AWS CLI

To deploy the Session Smart Networking software via the AWS CLI:

1. Click on the **Session Smart Networking Platform BYOL** offering.
2. Click on the **Continue to Subscribe** button and accept the terms and conditions.
3. Click on the **Continue to Configuration** button.
4. In the **Fulfillment Option** drop down box select **CloudFormation Template**, select the template **Juniper Session Smart Conductor Managed Router** and select the desired region.
5. Click on the **Continue to Launch** button.
6. In the **Choose Action** box, select **Launch CloudFormation** and click on the button **Launch**.
7. Copy to the clipboard the URL of the template located in the field **Amazon S3 URL**.

Launch the deployment with the corresponding AWS CLI commands making use of the S3 URL of the template identified previously. For a description of the parameters of the template, please refer to [Launch the Template](#launch-the-template).

```
#cloud-config
write_files:
  - path: /etc/128T-hardware-bootstrapper/onboarding-config.json
    content: |
        { 
            "name": "<conductor-name>",
            "ssr-version": "<version>",
            “mode”: "conductor-managed", 
            “conductor-hosts”: ["<conductor-host>"] 
        }
```
| Option | Meaning |
| ------ | ------- |
| name | The name of the router to use for Mist onboarding. By default, the instance name will be used. |
| ssr-version | The SSR software version to be installed on the instance. (BYOL only) |
| artifactory-user | User portion of the artifactory credentials. |
| artifactory-password | Password portion of the artifactory credentials. |
| conductor-hosts | The list of Conductor control IPs used to manage the router. |


### Manual Onboarding
If a user does not supply the onboarding configuration before launching the instance, the onboarding steps can be manually executed.

1. Log into the instance using the default AWS username `ec2-user` and the key pair provided when launching.
2. Run `/usr/libexec/hardwareBootstrapper128t config-generator`
3. Follow the prompts to generate and apply the onboarding configuration.

### Network Interfaces Layout

The _Session Smart Router Template_ deploys an EC2 instance for the SSR with two network interfaces. The template attaches the network interfaces to the EC2 instance in the following order: Public, and Private. The network interfaces to be used in Mist configuration are as follows:

| Network Interface name | Subnet           | PCI Address     |
| ---------------------- | ---------------- | ----------------|
| ge-0-0                 | Management       | 0000:00:05.0    |
| ge-0-1                 | Public           | 0000:00:06.0    |
| ge-0-2                 | Private          | 0000:00:07.0    |

### Launch the Conductor Managed Template

This section describes the parameters to complete the template to deploy a Mist-managed SSR, as well as how to launch it using the portal or programmatically.

![CloudFormation Template](/img/aws-byol-conductor-managed-template.png)

A description of the parameters of the template are listed in the following table:

| Parameter            | Description |
| -------------------- | ----------- |
| Stack name           | Fill out the Instance Name field to provide a name to the VM for the Mist-managed router.|
| VPC ID               | ID of the existing VPC where the Mist-managed router is going to be deployed. |
| Public Subnet ID     | ID of the public subnet within the VPC. |
| Public Subnet Allowed CIDR | The IP CIDR range of the endpoints allowed to originate traffic to the Router's public interface in the public subnet. |
| Private Subnet ID    | ID of the private subnet within the VPC. |
| Private Subnet Allowed CIDR | The IP CIDR range of the endpoints allowed to originate traffic to the Router's private interface in the private subnet. |
| Management Subnet ID | ID of the management subnet within the VPC. |
| Management Allowed CIDR   | The IP CIDR range of the endpoints allowed to SSH to the EC2 instance as well as login to the Router's GUI. |
| Artifactory Username | User portion of the artifactory credentials used to install the SSR software. |
| Artifactory Token | portion of the artifactory credentials used to install the SSR software. |
| Primary Control IP | The primary IP address of the Conductor |
| Secondary Control IP | The secondary IP address of the Conductor |
| Version | SSR software version installed on the instance. |
| Instance size        | Size of the EC2 instance.|
| Key Name             | IAM user key (SSH public key) to login to the EC2 instance (Linux) via SSH.|


#### AWS Console

1. Go to the **Session Smart Networking Platform BYOL** offering following the steps described in the section [Selecting the AMI](#selecting-the-ami).
2. Click on the **Continue to Subscribe** button and accept the terms and conditions.
3. Click on the **Continue to Configuration** button.
4. In the **Fulfillment Option** drop down box select **CloudFormation Template**, select the template **Juniper Session Smart Conductor Managed Router** and select the desired region.
5. Click on the **Continue to Launch** button.
6. In the **Choose Action** box, select **Launch CloudFormation** and click on the button **Launch**.
7. Click the **Next** button.
8. Fill out the template. Review the section above to understand the parameters of the template.
9. Continue clicking the **Next** button.
10. Click **Create Stack** to start the deployment.

Once the deployment of the template is complete, information about the new router deployment is provided in the Output tab.

The information listed in the Outputs tab is the following:
* Instance ID of the Router EC2 instance.
* Public IP address of the public interface for administration purposes.
* SSH command to login to the Linux VM.

#### AWS CLI

Alternatively, it is possible to launch the template programmatically. Please adjust the content of the JSON file below to match the input of each template.

Create the parameters file router.parameters.json with the following command:

```
vi router.parameters.json
```

Paste the following JSON content. Please adjust the values to your specific environment:

```
{
  "StackName": "<instance name>",
  "VpcId": "<ID of the VPC>",
  "PublicSubnet": "<ID of the public subnet within the VPC>",
  "PublicSubnetAllowedCidr": "0.0.0.0/0",
  "PrivateSubnet": "<ID of the public subnet within the VPC>",
  "PrivateSubnetAllowedCidr": "0.0.0.0/0",
  "AdminAllowedCidr": "0.0.0.0/0",
  "conductorPrimaryControlIP": "<control-ip>",
  "conductorSecondaryControlIP": "<control-ip>",
  "ArtifactoryUsername": "<username>",
  "ArtifactoryUsername": "<password>",
  "SSRVersion": "<ssr-version>",
  "InstanceType": "c5.xlarge",
  "KeyName": "<username>"
}
```

1. Go to the **Session Smart Networking Platform BYOL** offering following the steps described in the section [Selecting the AMI](#selecting-the-ami).
2. Click on the **Continue to Subscribe** button and accept the terms and conditions.
3. Click on the **Continue to Configuration** button.
4. In the **Fulfillment Option** drop down box select **CloudFormation Template**, select the template **Juniper Session Smart Conductor Managed Router** and select the desired region.
5. Click on the **Continue to Launch** button.
6. In the **Choose Action** box, select **Launch CloudFormation** and click on the button **Launch**.
7. Copy to the clipboard the URL of the template located in the field **Amazon S3 URL**.

Launch the template running the following command:

```
aws ec2 create-launch-template \
  --launch-template-name <template-file> \
  --launch-template-data file://router.parameters.json
```


## Deploying a Router without Templates

1. Launch a web browser and navigate to https://aws.amazon.com/
2. Login to AWS with your account.
   :::note
   If you do not have an account, click **Create an AWS Account** to register.
   :::
3. Click **EC2 Dashboard** and select your deployment region from the drop down list.
4. Click **Launch Instance**.
5. On the _Step 1: Choose an Amazon Machine Image (AMI)_ page, select the **Amazon Marketplace** tab and enter Session Smart Networking in the search bar.
6. Locate the SSR image and click **Select**.
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
11. Click **Next: Add Tags**. See [Interface Tagging](#interface-tagging) for additional tag configuration information.
12. On the the _Step 5: Add Tags_ page, click **Add Tags**.
13. Click inside the Key column and select **Name**. Under the Value column enter the name for your instance.
14. Click **Next: Configure Security Group**.
15. On the _Step 6: Configure Security Group_ page, click **select an existing security group** and choose one from the list.
    :::note
    If the desired security group is not listed you can create your own by selecting **Create a new security group** and following the prompts.
    :::
16. Expand the _Advanced Details_ and scroll down to the **User data** section. To onboard the router to the desired Mist organization, you can add cloud-init user-data using the steps in the [Cloud-init Onboarding](#cloud-init-onboarding) section.
17. Select **Review and Launch**.
18. In the _Boot from General Purpose_ window, select **Continue** and then click **Next**.
19. On the _Step 7: Review Instance Launch_ page, click **Launch** to finalize the instance.
20. In the _Select an existing key pair or create a new key pair_ dialog box, select **Choose an existing key pair** and select the desired key pair from the list.
    :::note
    If the desired key pair is not listed click **Create a new key pair**, enter a name in the Key pair name field and click **Download Key Pair**.
    :::
21. Check the acknowledgment check box and then click **Launch Instances**.
22. If an onboarding configuration was not provided in step 16, follow the manual steps to in the [Manual Onboarding](#manual-onboarding) section.

## Interface Tagging

In addition to using the cloud formation template, the admin can tag the interface with the key `SSR-ROLE`. The possible values are as follows:

| Tag Value | Meaning |
| --------- | ------- |
| WAN       | Interface is marked as WAN for onboarding purposes and is assumed to have connectivity to Mist cloud infrastructure. |
| LAN       | Interface is marked as LAN and is assumed to be used as a private network for internal workflows. |

:::note
The EC2 instance must be assigned the IAM role containing the `ec2_describeNetwork` permission to leverage the interface tagging.
:::
