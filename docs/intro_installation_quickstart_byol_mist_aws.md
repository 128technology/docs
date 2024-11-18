---
title: Installing a BYOL Mist-managed Router in AWS
sidebar_label: Installing a BYOL Mist-managed Router in AWS
---
This guide describes the process for deploying a Mist-managed instance through AWS. When installed as an AWS image, SSR Version 6.x supports Mist-managed routers. The installation and deployment process consists of the following steps:

* [Selecting the AMI](#selecting-the-ami).
* Deploying the [Session Smart Router](#session-smart-router-deployment).

Proceed to the next section [Selecting the AMI](#selecting-the-ami).

### Selecting the AMI

**Bring Your Own License (BYOL):** This allows you to install your own licensed copy of the SSR software on an AWS VM. The device registration code is used to authenticate access to the Mist installation repositories. Refer to the [Session Smart Networking Platform (BYOL)](https://aws.amazon.com/marketplace/pp/prodview-lz6cjd43qgw3c?sr=0-2&ref_=beagle&applicationId=AWSMPContessa) offering.

For the latest information about SSR BYOL offereings, please refer to the [Cloud Images BYOL Release Notes](release_notes_byol.md).

Once you have selected the AMI that suits the needs of your deployment, proceed to the [Session Smart Router Deployment](#session-smart-router-deployment) to deploy a Session Smart Router.

## Session Smart Router Deployment

Use the following steps to deploy a Mist-managed Session Smart Router in AWS.

### Requirements

The following infrastructure must exist in your AWS account:
* A VPC where the Session Smart Router will be deployed.
* The existing VPC is segmented with the following subnets. The role of each subnet is described below.
  - Public Subnet: This subnet must provide connectivity to enable communication with external/remote SSR peers as well as access to the Mist cloud infrastructure.
  - Private Subnet: This subnet must provide connectivity to internal workloads within the cloud.
* [Enable enhanced network](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/enhanced-networking-ena.html#enabling_enhanced_networking) with ENA for maximum throughput performance. For SSR routers, execute the following command from your local computer

```
aws ec2 modify-instance-attribute --instance-id instance_id --ena-support
```

:::important
Please note that deploying Mist-managed Session Smart Routers is limited to deployments within the cloud. If you also require the deployment of an on-premises SSR, please contact your Juniper sales representative.
:::

### Deployment

A Session Smart Router can be deployed manually via the [AWS Console](https://console.aws.amazon.com) or using AWS CLI commands. This section describes both methods. Choose the method that better suits your needs.

When deploying the Session Smart Router using the templates referenced in this section, the following infrastructure elements are created automatically to assist with the deployment process:
* EC2 instance using a Session Smart image available in the marketplace. When selecting a platform for deployment, Juniper recommends the use of an AWS EC2 instance size c5.xlarge, or larger.
* The router is deployed with appropriate [network interfaces.](#requirements)
* Each network interface has a network security group associated. The network security groups are configured in accordance with the requirements to deploy a fabric with Session Smart Networking software.
* The public and management interfaces have a unique and static public IP address associated.

The following image shows the infrastructure elements deployed:

![Router deployment](/img/platforms_aws_router_deployment.png)

### Using the AWS Console

To deploy the Session Smart Networking software via the AWS Console:

1. Click on the **Session Smart Networking Platform BYOL** offering.
2. Click on the **Continue to Subscribe** button and accept the terms and conditions.
3. Click on the **Continue to Configuration** button.
4. In the **Fulfillment Option** drop down box select **CloudFormation Template**, select the template **Juniper Session Smart Mist Managed Router** and select the desired region.
5. Click on the **Continue to Launch** button.
6. In the **Choose Action** box, select **Launch CloudFormation** and click on the button **Launch**.

![CloudFormation Template](/img/aws-byol-mist-template.png)

7. Answer the following questions to launch the deployment of an SSR. For a description of the parameters of the template, please refer to [Launch the Template](#launch-the-template).

- What version of SSR software do you want to install?
- What name do you want to give the instance?
  - Provide it in the **Stack name** field (for example: SSR_1_Router).
- Where do you want to deploy it?
  - Select the VPC in the region.
  - Select the public, private, and management subnets within the VPC.
- Which Mist organization is going to manage it?
  Provide the [registration code](wan_onboarding_whitebox.md#manual-adoption) for the Mist organization.
- Who is going to be the administrator?
  - Select the IAM user key.
8. Click the **Next** button.
9. Click on the **Create stack** button to launch the deployment.

![Plans](/img/platforms_aws_deployment_complete.png)

Once the deployment completes, information is provided in the Outputs tab, and the Zero Touch Provisioning (ZTP) installation process begins. After the VM is deployed, an additional 2-3 minutes are required before the ZTP process initializes. When the ZTP process is ready, there will be an asset in the Mist inventory to be associated with the router configuration. It will then take an additional 5-10 minutes for the desired SSR version to be installed.

### Using the AWS CLI

To deploy the Session Smart Networking software via the AWS CLI:

1. Click on the **Session Smart Networking Platform BYOL** offering.
2. Click on the **Continue to Subscribe** button and accept the terms and conditions.
3. Click on the **Continue to Configuration** button.
4. In the **Fulfillment Option** drop down box select **CloudFormation Template**, select the template **Juniper Session Smart Mist Managed Router** and select the desired region.
5. Click on the **Continue to Launch** button.
6. In the **Choose Action** box, select **Launch CloudFormation** and click on the button **Launch**.
7. Copy to the clipboard the URL of the template located in the field **Amazon S3 URL**.

Launch the deployment with the corresponding AWS CLI commands making use of the S3 URL of the template identified previously. For a description of the parameters of the template, please refer to [Launch the Template](#launch-the-template).

### Cloud-init Onboarding
When launching an AWS EC2 instance using automation the following user-data section can be leveraged to setup the onboarding data for the instance.

```
#cloud-config
write_files:
  - path: /etc/128T-hardware-bootstrapper/onboarding-config.json
    content: |
      { "name": "<router-name>", "ssr-version": "<version>", "registration-code": "<regcode>", "mode": "mist-managed", "cloud-provider": "aws"}
```

| Option | Meaning |
| ------ | ------- |
| name | The name of the router to use for Mist onboarding. By default, the instance name will be used. |
| registration-code | The Mist registration used for adoption of the EC2 instance to a Mist organization. |
| ssr-version | The SSR software version to be installed on the instance. (BYOL only) |

### Manual Onboarding
If a user does not supply the onboarding configuration before launching the instance, the onboarding steps can be manually executed.

1. Log into the instance using the default AWS username `ec2-user` and the key pair provided when launching.
2. Run `/usr/libexec/hardwareBootstrapper128t config-generator`
3. Follow the prompts to generate and apply the onboarding configuration.


### Mist-Managed Setup

Once the EC2 instance is launched with the correct registration-code, the device will self-onboard to appropriate Mist organization. The device is visible as Unassigned in the Mist organization once onboarding is complete. At this point, the SSR install process will begin. This process can take up to 15 minutes to complete.

If the device does not show up in the Mist organization or the desired SSR version was not installed after 15 minutes, SSH into the instance. If the instance was created using the BYOL template, the default username will be `t128`. If not, the username will be `ec2-user`.

- Try to log into the pcli, run `su admin` and then `show mist`.

- If the pcli is not accessable or the status and necessary action is not obvious, unzip the Hardware Bootstrapper tech support (`/var/log/128T-hardware-bootstrapper/hardware-bootstrapper-tech-support.zip`) and examine the journal for `128T-hardware-bootstrapper`, `ember`, and `128T-mist-agent`.


### Network Interfaces Layout

The _Session Smart Router Template_ deploys an EC2 instance for the SSR with two network interfaces. The template attaches the network interfaces to the EC2 instance in the following order: Public, and Private. The network interfaces to be used in Mist configuration are as follows:

| Network Interface Name | Subnet           | Mist Config Name     |
| ---------------------- | ---------------- | ----------------|
| ge-0-0                 | Public           | ge-0/0/0    |
| ge-0-1                 | Private          | ge-0/0/1    |

#### Interface Tagging

In addition to using the cloud formation template, the admin can tag the interface with the key `SSR-ROLE`. The possible values are as follows:

| Tag Value | Meaning |
| --------- | ------- |
| WAN       | Interface is marked as WAN for onboarding purposes and is assumed to have connectivity to Mist cloud infrastructure. |
| LAN       | Interface is marked as LAN and is assumed to be used as a private network for internal workflows. |

:::note
The EC2 instance must be assigned the IAM role containing the `ec2_describeNetwork` permission to leverage the interface tagging.
:::

## Source / Destination Check

Disabling Source / Destination checking allows the SSR AWS instance to send and receive traffic when it is not the source or destination. This feature is enabled by default. Perform the following steps to disable Source / Destination checking.

1. On the Instances page, select the **Launch Instances** dropdown.
2. Select **Networking**.

![AWS Instances page](/img/AWS-bootstrap1.png)

3. From the pull out menu, select **Change source/destination check**.
4. In the Change Source / Destination Check window, select **Stop**, and **Save**.

![Source/Destination Check](/img/AWS-bootstrap2.png)

## Launch the Template

This section describes the parameters to complete the template to deploy a Mist-managed SSR, as well as how to launch it using the portal or programmatically.

![CloudFormation Template](/img/aws-byol-mist-template.png)

A description of the parameters of the template are listed in the following table:

| Parameter            | Description |
| -------------------- | ----------- |
| Stack name           | Fill out the Instance Name field to provide a name to the VM for the Mist-managed router.|
| VPC ID               | ID of the existing VPC where the Mist-managed router is going to be deployed. |
| Public Subnet ID     | ID of the public subnet within the VPC. |
| Public Subnet Allowed CIDR | The IP CIDR range of the endpoints allowed to originate traffic to the Router's public interface in the public subnet. |
| Private Subnet ID    | ID of the private subnet within the VPC. |
| Private Subnet Allowed CIDR | The IP CIDR range of the endpoints allowed to originate traffic to the Router's private interface in the private subnet. |
| Admin Allowed CIDR   | The IP CIDR range of the endpoints allowed to SSH to the EC2 instance as well as login to the Router's GUI. |
| Registration Code   | The Mist registration used for adoption of the EC2 instance to a Mist organization. |
| Version | SSR software version installed on the instance. |
| Instance size        | Size of the EC2 instance.|
| Key Name             | IAM user key (SSH public key) to login to the EC2 instance (Linux) via SSH.|

#### AWS Console

1. Go to the **Session Smart Networking Platform BYOL** offering following the steps described in the section [Selecting the AMI](#selecting-the-ami).
2. Click on the **Continue to Subscribe** button and accept the terms and conditions.
3. Click on the **Continue to Configuration** button.
4. In the **Fulfillment Option** drop down box select **CloudFormation Template**, select the template **Juniper Session Smart Mist Managed Router** and select the desired region.
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
  "RegistrationCode": "<Registration code>",
  "SSRVersion": "<ssr-version>",
  "InstanceType": "c5.xlarge",
  "KeyName": "<username>"
}
```

1. Go to the **Session Smart Networking Platform BYOL** offering following the steps described in the section [Selecting the AMI](#selecting-the-ami).
2. Click on the **Continue to Subscribe** button and accept the terms and conditions.
3. Click on the **Continue to Configuration** button.
4. In the **Fulfillment Option** drop down box select **CloudFormation Template**, select the template **Juniper Session Smart Router** and select the desired region.
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
22. If an onboarding configuration was not provided in step 16, follow the steps in the [Manual Onboarding](#manual-onboarding) section.

## Configuring a Default Route to an Internet Gateway

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
10. In the 0.0.0.0/0 row, click the empty cell under the Target column and the local name automatically appears as a selectable option.
11. Select it and click **Save**.
