---
title: 128T in Azure
sidebar_label: Azure
---

## Introduction ##

This quickstart guide describes the process for deploying a 128T Conductor and a 128T Session Smart Router in Azure.

## 128T Conductor Deployment ##

### Requirements ###

The following infrastructure must exist in your Azure subscription:
* A VNet where the 128T Conductor will be deployed.
* The existing VNet should be segmented with at least one subnet.

### Deployment ###

A 128T Conductor can be deployed manually via the Azure Portal or in an automated fashion using Azure CLI or PowerShell commands. This section describes both methods, please proceed to the method that better suits your needs.

#### Azure Portal ####

Please click [here](https://azuremarketplace.microsoft.com/en-ca/marketplace/apps/128technology.128technology_conductor_hourly?tab=Overview) to go to the Marketplace. Click on the “Get it now” button, agree to the terms of use and privacy policy and click on the tab “Plans” as shown in the following picture:

![Plans](/img/platforms_azure_plans.png)

Lastly click on the "Launch" link of the template that better suits your needs.

Answer the following 4 questions to launch the deployment of a 128T Conductor:
* What name do you want to give it? Provide it in the “Instance Name” field.
* Where do you want to deploy it? Provide the location where the VNet exists in the “Location” field, the name of the VNet in the “Virtual Network Name” field and the name of a subnet in the “Control Subnet Name” field.
* Which software version do you want to deploy? Select it in the “Version” field.
* Who is going to be the administrator? Provide an username and the content of your public SSH key in the “Admin Username” and “Admin Public Key Data” fields respectively.

Agree to the terms of use and conditions and lastly click on the “Purchase” button to launch the deployment.

![Plans](/img/platforms_azure_deployment_complete.png)

Once the deployment completes information of the newly 128T Conductor deployment is provided in the Outputs tab placed on the left hand side. Click on the HTTPs URL to login to the 128T Conductor GUI. The credentials are “admin” for username and the name of the VM for the password. To login to the VM via SSH use the username and the SSH public key provided in the template.

#### Azure CLI or PowerShell ####

Please click [here](https://azuremarketplace.microsoft.com/en-ca/marketplace/apps/128technology.128technology_conductor_hourly?tab=Overview) to go to the Marketplace. Click on the “Get it now” button, agree to the terms of use and privacy policy, click on the “Get started” button to enable programmatic deployment for the subscription and click the button “Save” to save the changes.

![Plans](/img/platforms_azure_programmatically.png)

Click on the tab “Plans” as shown in the following picture:

![Plans](/img/platforms_azure_plans.png)

Lastly copy to the clipboard the URL of the template located in the field "URL" that better suits your needs.

Create the parameters file, accept the terms of use and conditions and lastly launch the deployment with the corresponding Azure CLI or PowerShell commands making use of the URL of the template identified previously.

Once the deployment completes information of the newly 128T Conductor deployment is provided in the Outputs section. Click on the HTTPs URL to login to the 128T Conductor GUI. The credentials are “admin” for username and the password is the name of the VM. To login to the VM via SSH use the username and the SSH public key provided in the template.

## 128T Session Smart Router Deployment ##

### Requirements ###

The following infrastructure must exist in your Azure subscription:
* A VNet where the 128T Session Smart Router will be deployed.
* An Availability Set where the 128T Session Smart Router will be deployed.
* The existing VNet should be segmented with at least three subnets. The role of each subnet is described below:
  * Public subnet. The expectation is that this subnet provides connectivity to enable communication with external/remote 128T Router peers.
  * Private subnet. The expectation is that this subnet provides connectivity to internal workloads within the cloud.
  * Management subnet. The expectation is that this subnet meets the following capabilities:
    * This subnet should be reachable via SSH for administration purposes.
    * The interface of the 128T Conductor that is going to manage this router must be reachable from this subnet.

### Deployment ###

A 128T Session Smart Router can be deployed manually via the Azure Portal or in an automated fashion using Azure CLI or PowerShell commands. This section describes both methods, please proceed to the method that better suits your needs.

#### Azure Portal ####

Please click [here](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/128technology.128technology_router_100_hourly?tab=Overview) to go to the Marketplace. Click on the “Get it now” button, agree to the terms of use and privacy policy and click on the tab “Plans” as shown in the following picture:

![Plans](/img/platforms_azure_plans.png)

Lastly click on the "Launch" link of the template that better suits your needs.

Answer the following 5 questions to launch the deployment of a 128T Session Smart Router:
* What name do you want to give it? Provide it in the “Instance Name” field.
* Where do you want to deploy it? Provide the location where the VNet exists in the “Location” field, the name of the VNet in the “Virtual Network Name” field, the name of the availability set in the "Availability Set Name" field and the name of the public, private and management subnets in the “Public Subnet Name”, "Private Subnet Name" and "Management Subnet Name" fields respectively.
* Which 128T Conductor is going to manage it? Provide the IP address of the primary node of Conductor in the "Conductor Primary Control IP" field, and only if the Conductor is highly available then provide the IP address of the secondary node of Conductor in the "Conductor Secondary Control IP" field.
* Which software version do you want to deploy? Select it in the “Version” field.
* Who is going to be the administrator? Provide an username and the content of your public SSH key in the “Admin Username” and “Admin Public Key Data” fields respectively.

Agree to the terms of use and conditions and lastly click on the “Purchase” button to launch the deployment.

![Plans](/img/platforms_azure_deployment_complete.png)

Once the deployment completes information of the newly 128T Session Smart Router deployment is provided in the Outputs tab placed on the left hand side. To login to the instance via SSH use the username and the SSH public key provided in the template.

The deployment will be non interactive as the Zero Touch Provisioning (ZTP) method will be triggered. The ZTP process will take 1-2 minutes to initialize. Please login to Conductor via HTTPs to associate the pending asset with the configuration of the router once the ZTP process is ready to start.

#### Azure CLI or PowerShell ####

Please click [here](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/128technology.128technology_router_100_hourly?tab=Overview) to go to the Marketplace. Click on the “Get it now” button, agree to the terms of use and privacy policy, click on the “Get started” button to enable programmatic deployment for the subscription and click the button “Save” to save the changes.

![Plans](/img/platforms_azure_programmatically.png)

Click on the tab “Plans” as shown in the following picture:

![Plans](/img/platforms_azure_plans.png)

Lastly copy to the clipboard the URL of the template located in the field "URL" that better suits your needs.

Create the parameters file, accept the terms of use and conditions and lastly launch the deployment with the corresponding Azure CLI or PowerShell commands making use of the URL of the template identified previously.

Once the deployment completes information of the newly 128T Session Smart Router deployment is provided in the Outputs section.