---
title: QuickStart Installation in AWS
sidebar_label: QuickStart Installation in AWS
---

## Introduction

This QuickStart guide describes the process for deploying a Conductor and a Session Smart Router in AWS.

## Conductor Deployment

### Requirements

The following infrastructure must exist in your AWS account:
* A VPC where the Conductor will be deployed.
* The existing VPC should be segmented with at least one subnet.

### Deployment

A Conductor can be deployed manually via the AWS Console or in an automated fashion using AWS CLI commands. This section describes both methods, please proceed to the method that better suits your needs.

#### AWS Console

Please click [here](https://aws.amazon.com/marketplace/pp/B07T6JM3FR) to go to the Marketplace:

1. Click on the “Continue to Subscribe” button and accept the terms and conditions.
2. Click on the “Continue to Configuration” button.
3. In the "Fulfillment Option" drop down box select "CloudFormation Template", select the template "Standalone Conductor", select the desired region and click on the "Continue to Launch" button.
4. In the "Choose Action" box select "Launch CloudFormation" and click on the button "Launch".

Answer the following 3 questions to launch the deployment of a Conductor:
* What name do you want to give it? Provide it in the "Stack name" field.
* Where do you want to deploy it? Select a VPC and select a subnet within the VPC.
* Who is going to be the administrator? Select the IAM user key.

Continue to click the "Next" button and lastly click on the "Create stack" button to launch the deployment.

![Plans](/img/platforms_aws_deployment_complete.png)

Once the deployment completes, information about the new Conductor deployment is provided in the Outputs tab. Click on the HTTPs URL to login to the Conductor GUI. The credentials are “admin” for username and the name of the VM for the password. To login to the instance via SSH use the username t128 and the SSH public key of the IAM user provided in the template.

:::important
Be sure to change the password that conforms to your business' password requirements and criteria.
:::

#### AWS CLI

Please click [here](https://aws.amazon.com/marketplace/pp/B07T6JM3FR) to go to the Marketplace:

1. Click on the “Continue to Subscribe” button and accept the terms and conditions.
2. Click on the “Continue to Configuration” button.
3. In the "Fulfillment Option" drop down box select "CloudFormation Template", select the template "Standalone Conductor", select the desired region and click on the "Continue to Launch" button.
4. In the "Choose Action" box select "Launch CloudFormation" and click on the button "Launch".
5. Lastly copy to the clipboard the URL of the template located in the field "Amazon S3 URL".

Launch the deployment with the corresponding AWS CLI commands making use of the S3 URL of the template identified previously.

Once the deployment completes, information about the new Conductor deployment is provided in the Outputs section. Click on the HTTPs URL to login to the Conductor GUI. The credentials are “admin” for username and the password is the ID of the instance. To login to the instance via SSH use the username t128 and the SSH public key of the IAM user provided in the template.

:::important
Be sure to change the password that conforms to your business' password requirements and criteria.
:::

## Session Smart Router Deployment

### Requirements

The following infrastructure must exist in your Azure subscription:
* A VPC where the Session Smart Router will be deployed.
* The existing VPC should be segmented with at least three subnets. The role of each subnet is described below:
  * Public subnet. The expectation is that this subnet provides connectivity to enable communication with external/remote SSR peers.
  * Private subnet. The expectation is that this subnet provides connectivity to internal workloads within the cloud.
  * Management subnet. The expectation is that this subnet meets the following capabilities:
    * This subnet should be reachable via SSH for administration purposes.
    * The interface of the Conductor that is going to manage this router must be reachable from this subnet.

:::important
Please note that deploying Session Smart Routers without a valid certificate will be limited to deployments within the cloud only. If your use case requires the deployment of an SSR Router on your premises as well please contact Juniper Networks.
:::

### Deployment

An SSR can be deployed manually via the AWS Console or in an automated fashion using AWS CLI commands. This section describes both methods, please proceed to the method that better suits your needs.

#### AWS Console

Please click [here](https://aws.amazon.com/marketplace/pp/B07T7Y7RVQ) to go to the Marketplace:

1. Click on the “Continue to Subscribe” button and accept the terms and conditions.
2. Click on the “Continue to Configuration” button.
3. In the "Fulfillment Option" drop down box select "CloudFormation Template", select the template "Session Smart Router", select the desired region and click on the "Continue to Launch" button.
4. In the "Choose Action" box select "Launch CloudFormation" and click on the button "Launch".

Answer the following 4 questions to launch the deployment of an SSR:
* What name do you want to give it? Provide it in the "Stack name" field.
* Where do you want to deploy it? Select a VPC and select the public, private and management subnets within the VPC.
* Which Conductor is going to manage it? Provide the IP address of the primary node of Conductor, and only if the Conductor is highly available then provide the IP address of the secondary node of Conductor.
* Who is going to be the administrator? Select the IAM user key.

Continue to click the "Next" button and lastly click on the "Create stack" button to launch the deployment.

![Plans](/img/platforms_aws_deployment_complete.png)

Once the deployment completes, information about the new SSR deployment is provided in the Outputs tab. To login to the instance via SSH use the username t128 and the SSH public key of the IAM user provided in the template.

The deployment will be non interactive as the Zero Touch Provisioning (ZTP) method will be triggered. The ZTP process will take 1-2 minutes to initialize. Please login to Conductor via HTTPs to associate the pending asset with the configuration of the router once the ZTP process is ready to start.

#### AWS CLI

Please click [here](https://aws.amazon.com/marketplace/pp/B07T7Y7RVQ) to go to the Marketplace:

1. Click on the “Continue to Subscribe” button and accept the terms and conditions.
2. Click on the “Continue to Configuration” button.
3. In the "Fulfillment Option" drop down box select "CloudFormation Template", select the template "Session Smart Router", select the desired region and click on the "Continue to Launch" button.
4. In the "Choose Action" box select "Launch CloudFormation" and click on the button "Launch".
5. Lastly copy to the clipboard the URL of the template located in the field "Amazon S3 URL".

Launch the deployment with the corresponding AWS CLI commands making use of the S3 URL of the template identified previously.

Once the deployment completes, information about the new SSR deployment is provided in the Outputs tab. To login to the instance via SSH use the username t128 and the SSH public key of the IAM user provided in the template.
