---
title: Installing a Mist-Managed Router in Azure
sidebar_label: Installing Mist-Managed Router in Azure
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Introduction

This guide describes the process for deploying a Mist Managed Session Smart Router (SSR) in Azure. The process consists of the following steps:

1. [Selecting the Azure plan"](#selecting-the-azure-plan).
3. Deploying a [Session Smart Router](#session-smart-router).


## Selecting the Azure Plan

There are different Plans available for the Juniper Session Smart Networking Platform offering:

* Private Plan: For cases where there is no access to the SSR repositories (no internet connection) from the Azure environment where the software will be deployed, a Private image can be shared in the Azure Marketplace using your Azure subscription. To request access to a private plan, refer to [Requesting access to a Private plan](#requesting-access-to-a-private-plan) for additional information.
* Hourly Plan: This provides a free trial period for 30 days and an hourly software cost after the trial expires. This plan is recommended for Proof of Concepts and Trials only. Software upgrades and deployments outside of the cloud, (on premises) require a token or certificate. The software can not be purchased via the marketplace. Select the Hourly plan of the [Session Smart Networking Platform](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/juniper-networks.session-smart-networking-payg?tab=Overview) offering.

Once you have selected the plan that best suits the needs of your deployment, proceed to the [Session Smart Router Deployment](#session-smart-router) to deploy a Session Smart Router.

### Requesting access to a Private plan

:::important
There is no software cost associated with deploying the Private image, the cost of running the VM is the only cost (i.e., Azure compute cost). Please also note that software upgrades and deployments **outside** of the cloud (e.g., on premises) will not be possible without a software access token.
:::

To request access to a Private plan follow the next steps:

1. Locate the Subscription ID of the Azure account where the deployment of the software is going to take place. Follow the next steps to find the Subscription ID:

* Please click [here](https://portal.azure.com) to go to the Azure portal.
* On the search box right at the top of the screen, search for "Subscriptions". If you cannot find the subscription associated with your Azure account click [here](https://portal.azure.com/#blade/Microsoft_Azure_Billing/SubscriptionsBlade).
* Take note of your Subscription ID.

2. Contact your Juniper Networks Sales representative and provide:

* The Subscription ID of the Azure account that will be used for the deployment.
* The version of the Session Smart Networking software. Your Juniper Sales representative will assist you if you do not know the desired version needed for your deployment.

3. Wait for the confirmation from your Juniper Sales representative to confirm that your Azure Subscription has been allowlisted and therefore access has been granted.

4. Once your Subscription ID has been allowlisted, validate that the Private plan has been shared with your Subscription:

* Click [here](https://portal.azure.com) to go to the Azure portal. On the search box right at the top of the screen, search for "Marketplace". If you are unable to access the Marketplace via your Azure Portal, click [here](https://portal.azure.com/#blade/Microsoft_Azure_Marketplace/GalleryMenuBlade/selectedMenuItemId/home).
* The following banner is displayed at the top:

![Marketplace private offerings](/img/platforms_azure_marketplace_private_banner.png)

* Click on the "View private products" link.
* If the Private image of the **Session Smart Networking Platform** offering is displayed, then the Private image has been shared successfully with your Azure Subscription ID.

<img src={useBaseUrl('/img/platforms_azure_marketplace_image_private.png')} alt="Session Smart Networking Private offering" width="192" height="243" />

## Session Smart Router

Use the following guide to deploy a MIST managed Session Smart Router in Azure.

### Requirements

The following infrastructure must exist in your Azure subscription:
* A VNet where the Session Smart Router (SSR) will be deployed.
* An Availability Set where the SSR will be deployed.
* The existing VPC is segmented with the following subnets. The role of each subnet is described below.

#### Public Subnet
This subnet must provide connectivity to enable communication with external/remote SSR peers. For Mist-managed deployments, this subnet should also provide access to the Mist cloud infrastructure.

#### Private Subnet
This subnet must provide connectivity to internal workloads within the cloud.

:::important
Please note that deploying Session Smart Routers without a valid token or certificate is limited to deployments within the cloud. If your use case also requires the deployment of an on-premises SSR, please contact your Juniper sales representative.
:::

## Deployment

A Session Smart Router can be deployed manually via the [Azure Portal](https://portal.azure.com) or in an automated fashion using Azure CLI or PowerShell commands. This section describes both methods. Choose the method that better suits your needs.

When deploying the Session Smart Router using the templates referenced in this section, the following infrastructure elements are created automatically to assist with the deployment process:
* Virtual machine using a Session Smart image available in the marketplace.
* The router is deployed with three network interfaces: public, private and management interfaces.
* Each network interface has a network security group associated. The network security groups are configured in accordance with the requirements to deploy a fabric with Session Smart Networking software.
* The public and management interfaces have a unique and static public IP address associated.

The following image shows the infrastructure elements deployed:

![Router deployment](/img/platforms_azure_router_deployment.png)

### Azure Portal

To deploy the Session Smart Networking software via the Azure Portal:

Click on the **Session Smart Networking Platform** offering selected during the previous section [selecting the Azure plan"](#selecting-the-azure-plan).
Click on the "Get it now" button.
Agree to the terms of use and privacy policy of the image.
Click on the tab "Plans + Pricing" as shown in the following picture:

![Plans](/img/platforms_azure_plans.png)

Lastly click on the "Launch" link of the MIST managed template.

Answer the following 4 questions to launch the deployment of an SSR (additional information [here](#launch-the-template)):
* What name do you want to give it?
Provide it in the "Instance Name" field (for example: 128TRouter).
* Where do you want to deploy it?
  * Provide the location where the VNet exists in the "Location" field (for example: eastus). All available locations [here](https://azure.microsoft.com/en-us/global-infrastructure/locations). Note the name of the Location field is one word and all lowercase like eastus, westus, westeurope, eastasia, etc.
  * Provide the name of the VNet in the "Virtual Network Name" field (for example: 128T-VNet).
  * Provide the name of the availability set in the "Availability Set Name" field (for example: 128TRouterSet).
  * Provide the name of the "Public Subnet Name"
  * Provide the name of the "Private Subnet Name"
* Which Mist org is going to manage it?
  Provide the [registration code](wan_onboarding_whitebox.md#manual-adoption) for the Mist org.
* Who is going to be the administrator?
Provide an username (for example: t128) and the content of your public SSH key in the "Admin Username" and "Admin Public Key Data" fields respectively.

Agree to the terms of use and conditions of the deployment and lastly click on the "Purchase" button to launch the deployment.

![Plans](/img/platforms_azure_deployment_complete.png)

If the validation process fails with the error shown below, please make sure you are deploying the version of the software Juniper has allowlisted to your Subscription ID and try again later. If the problem persists, please contact your Juniper representative.

<img src={useBaseUrl('/img/platforms_azure_private_image_version_mismatch.png')} alt="Private Image Version Mismatch" width="75%" height="75%" />

Once the deployment completes, information is provided in the Outputs tab on the left hand side:
* If the **Session Smart Networking Platform** offering selected for the deployment is a **Private image**, the non-interactive, Zero Touch Provisioning (ZTP) method is triggered. After the VM is deployed, an additional 2-3 minutes are required before the ZTP process initializes. When the ZTP process is ready, there will be an asset in the Mist inventory to be associated with the router configuration.

### Azure CLI or PowerShell

To deploy the Session Smart Networking software via Azure CLI or Powershell:

Click on the **Session Smart Networking Platform** offering selected during the previous section [Selecting the Azure plan"](#selecting-the-azure-plan).
Click on the "Get it now" button.
Agree to the terms of use and privacy policy of the image.
Click on the "Get started" button to enable programmatic deployment for the subscription and click the button "Save" to save the changes.

![Plans](/img/platforms_azure_programmatically.png)

Click on the tab "Plans + Pricing" as shown in the following picture:

![Plans](/img/platforms_azure_plans.png)

Lastly copy to the clipboard the URL of the template located in the field "URL" that better suits your needs.

Create the parameters file, accept the terms of use and conditions of the image and lastly launch the deployment with the corresponding Azure CLI or PowerShell commands making use of the URL of the template identified previously. For additional information please click [here](#launch-the-template).

If the validation process fails with the error shown below, please make sure you are deploying the version of the software Juniper has allowlisted to your Subscription ID and try again later. If the problem persists, please contact your Juniper representative.

<img src={useBaseUrl('/img/platforms_azure_private_image_version_mismatch.png')} alt="Private Image Version Mismatch" width="75%" height="75%" />

Once the deployment completes, information is provided in the Outputs tab on the left hand side:
* If the **Session Smart Networking Platform** offering selected for the deployment is a **Private image**, the non-interactive, Zero Touch Provisioning (ZTP) method is triggered. After the VM is deployed, an additional 2-3 minutes are required before the ZTP process initializes. When the ZTP process is ready, there will be an asset in the Mist inventory to be associated with the router configuration.

### Cloud-init Onboarding
When launching an instance using CLI or Powershell or while using automation the following user-data section can be leveraged to setup the onboarding data for the instance.

```
#cloud-config
write_files:
  - path: /etc/128T-hardware-bootstrapper/onboarding-config.json
    content: |
      { "name": "<router-name>", "registration-code": "<regcode>", "version": "2.0", "mode": "mist-managed", "cloud-provider": "azure"}
```

| Option | Meaning |
| ------ | ------- |
| name | The name of the router to use for Mist onboarding. By default, the instance name will be used. |
| registration-code | The Mist registration used for adoption of the EC2 instance to a Mist org. |

### Mist-Managed Setup

Once the instance is launched with the correct registration-code, the device will self-onboard to appropriate Mist org. The process can take up to 5 minutes. The device is visible as Unassigned in the Mist org once onboarding is complete.

If the device does not show up in the Mist org after 5 minutes, ssh into the instance.
- Log into the pcli, run `su admin` and then `show mist`.

- If that does not show the device, drop back to the linux shell and look at the journal for the bootstrapper:
 - `journalctl -u 128T-hardware-bootstrapper`

 And the Mist agent:
 - `journalctl -u 128T-mist-agent`

### Network Interfaces Layout

The _Session Smart Router Template_ deploys a VM for the SSR with three network interfaces. The template attaches the network interfaces to the VM in the following order: Public, and Private. The network interfaces to be used in Mist configuration are as follows:

| Network Interface Name | Subnet           | Mist Config Name     |
| ---------------------- | ---------------- | ----------------|
| eth1                   | Public           | ge-0/0/0    |
| eth2                   | Private          | ge-0/0/1    |



## Annexes

### Agree to the Terms of Use and the Privacy Policy

To agree to the Terms of Use and the Privacy Policy for the Session Smart Networking image used, click on **Get It Now** as shown in the following image:

<img src={useBaseUrl('/img/platforms_azure_marketplace_getitnow.png')} alt="Session Smart Networking" width="25%" height="25%" />

Click on **Continue** in order to agree to the Terms of Use and the Privacy Policy.

To deploy the Session Smart Networking software programmatically, you must enable Programmatic Deployment and accept its Terms of Use. If Programmatic Deployment is desirable, please click on the **Get started** button located under the **Create** button as shown in the image below:

![Plans](/img/platforms_azure_programmatically.png)

Finally, select the subscription you want and click on **Save** to apply the changes.

Alternatively, it is possible to accept the term of use and privacy policy programmatically. The PowerShell commands for each Session Smart Networking software image are shown next, please run the commands corresponding to the image you want to use:

* Session Smart Networking - Private Image:

```
Get-AzureRmMarketplaceTerms `
-Publisher "juniper-networks" `
-Product "session-smart-networking-payg" `
-Name "session-smart-networking-private-XYZ" `
| Set-AzureRmMarketplaceTerms -Accept
```

:::important
Replace the XYZ placeholder right in the command above with the version of the Session Smart Software to be deployed. For example, if the version to deploy is 5.4.4, then replace XYZ with 544
:::

### Load the template

After the Terms of Use and the Privacy Policy have been accepted, select the **Plan** tab. The available templates are listed there.

When you select a template, a new tab opens in the browser that redirects you to the template.

### Launch the Template

This section describes how to fill out and launch the template using either the Azure marketplace or programmatically to deploy a Session Smart Router.

### Mist-Managed Session Smart Router

This section describes the parameters to fill out the template to deploy an SSR as well as how to launch it via the portal and programmatically.

A description of the parameters of the template are listed in the following table:

| Parameter               | Description                                                                                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Subscription            | Subscription for the deployment.                                                                                                                                          |
| Resource group          | Select an existing resource group or create a new one.                                                                                                                    |
| Region                  | The first instance of the Region field is automatically populated with the region corresponding to the resource group.                                                    |
| Instance Name           | Provide a name to the VM for the Session Smart Router.                                                                                                               |
| Router Name             | Provide a name to the Smart Router Router. Optional.                                                                                                                      |
| Node Name               | Provide a name to the node of the Smart Router Router. Optional.                                                                                                          |
| Location                | As indicated in the requirements, the Session Smart Router is going to be deployed into an existing VNet. The Location field is the name of the location where such VNet exists. Please refer to the following list https://azure.microsoft.com/en-us/global-infrastructure/locations (the name of the Location field is one word and all lowercase). Example: eastus, westus, westeurope, eastasia...     |
| Virtual Network Name    | Name of the existing VNet where the Session Smart Router is going to be deployed to.                                                                                 |
| Avaiability Set Name    | Name of the existing availability set within the same resource group and region as the VNet selected above the Session Smart  Router is going to be deployed to.          |
| Public Subnet Name      | The name of the public subnet within the VNet.                                                                                                                            |
| Public Subnet Allowed CIDR     | It corresponds to the source IP CIDR range of the SSR/s at the data center/branch (outside the cloud) allowed to originate traffic to the public interface of the router. This field allows for defining a well defined and trusted IP address range. It is common to set this field to 0.0.0.0/0 for now, as the source IP addresses of the routers at the data center or branch (outside the cloud) are not known at this time. However, after the deployment and once these external IP addresses are known it is recommended to provision them in the corresponding security groups to increase the degree of security.             |
| Private Subnet Name     | The name of the private subnet within the VNet.                                                                                                                           |
| Private Subnet Allowed CIDR    | It corresponds to the source IP CIDR range of the internal workloads/endpoints allowed to originate traffic to the private interface of the router. This field allows for defining a well defined and trusted IP address range. By default is set to 0.0.0.0/0 to allow every workload/endpoint to communicate with the router.                                                                             |
| Management Subnet Name  | The name of the management subnet within the VNet.                                                                                                                        |
| Admin Allowed CIDR      | It allows for restricting reachability to the management interface of the router to a well known source IP address CIDR range. By default is set to 0.0.0.0/0 allowing every IP address to reach the management interface. Once the deployment completes, it is highly recommended to update the configuration of the network security group to allow only access from the source IP address/es where the Session Smart Router will be administered.                                                                                                                                                                                         |
| Registration Code   | The Mist registration used for adoption of the EC2 instance to a Mist org. |
| Instance size        | Select the size of the VM in the field Instance Size.                                                                                                                        |
| Admin Username       | Fill out the field Admin Username with the desired username to login to the VM (Linux) via SSH.                                                                              |
| Admin Public Key Data| Paste in the field Admin Public Key Data the SSH public key to be used to authenticate with the VM (Linux) instance via SSH. The key needs to be at least 2048-bit and in ssh-rsa format. Please find the following an example of a valid key next (To reduce the length of the key in this example multiple character have been replaced by three dots): ```ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDHwB1Qe1KndGqKuT3F...GumfdHfdasy8N0kncMtp2wtkqoLsRWdJ4/WKaZBOrPd4Q== admin@Admin-MacBook-Pro.local```. For more information about creating ssh keys, see [Create SSH keys on Linux and Mac for Linux VMs in Azure](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/mac-create-ssh-keys).                                                                                                         |

##### Azure Portal

Click on the **Session Smart Networking Platform** offering selected during the previous section [Selecting the Azure plan"](#selecting-the-azure-plan).
Click on the "Get it now" button.
Agree to the terms of use and privacy policy of the image.
Click on the tab "Plans + Pricing" as shown in the following picture:

![Plans](/img/platforms_azure_plans.png)

Click on the "Launch" link of the "Juniper Session Smart Router" template that better suits your needs.
Agree to the terms of use and conditions of the deployment and lastly click on the **Purchase** button to launch the deployment.

Once the deployment of the template is complete, information about the new router deployment is provided in the Output tab.

![Plans](/img/platforms_azure_deployment_complete.png)


The information listed in the Outputs tab is the following:
* Name of the VM instance.
* Public IP address assigned to the management interface of the instance.
* SSH command to login to the Linux VM via the management interface.

:::important
When logging to the Linux instance via SSH make use of the username specified in the "Admin Username" field and the corresponding private key specified in the "Admin Public Key Data" field.
:::

#### Azure CLI or PowerShell

Alternatively, it is possible to launch the template programmatically. Please adjust the content of the JSON file below to match the input of each template:

Create the parameters file router_private.parameters.json with the following command:

```
vi router_private.parameters.json
```

and paste the following JSON content, please adjust the values to your specific environment:

```
{
  "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentParameters.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "instanceName": {
      "value": "<instance name>"
    },
    "routerName": {
      "value": "<name to assign to the router. Optional>"
    },
    "nodeName": {
      "value": "<name to assign to the node of the router. Optional>"
    },
    "location": {
      "value": "<location of the VNet>"
    },
    "virtualNetworkName": {
      "value": "<name of the VNet>"
    },
    "availabilitySetName": {
      "value": "<name of the Availability Set>"
    },
    "publicSubnetName": {
      "value": "<name of the public subnet>"
    },
    "publicSubnetAllowedCidr": {
      "value": "0.0.0.0/0"
    },
    "privateSubnetName": {
      "value": "<name of the private subnet>"
    },
    "privateSubnetAllowedCidr": {
      "value": "0.0.0.0/0"
    },
    "managementSubnetName": {
      "value": "<name of the management subnet>"
    },
    "adminAllowedCidr": {
      "value": "0.0.0.0/0"
    },
    "registrationCode": {
      "value": "The registration code from the Mist UI."
    },
    "instanceSize": {
      "value": "Standard_DS3_v2"
    },
    "adminUsername": {
      "value": "<username>"
    },
    "adminPublicKeyData": {
      "value": "<content of ssh-rsa key>"
    }
  }
}
```

Go to the **Session Smart Networking Platform** offering following the steps described in the section [Selecting the Azure plan"](#selecting-the-azure-plan).
Click on the "Get it now" button.
Agree to the terms of use and privacy policy of the image.
Click on the "Get started" button to enable programmatic deployment for the subscription.
Click the button "Save" to save the changes.

![Plans](/img/platforms_azure_programmatically.png)

Close the "Configure Programmatic Deployment" window.
Click on the tab "Plans + Pricing".
Copy the URL of the "Session Smart Router" template located in the field "URL" to the clipboard.
Launch the template running the following command:

```
New-AzResourceGroupDeployment -ResourceGroupName <your-resource-group-name> `
-TemplateUri <template-URL> `
-TemplateParameterFile ./router_private.parameters.json
```

:::important
When logging to the Linux instance via SSH make use of the username specified in the "Admin Username" field and the corresponding private key specified in the "Admin Public Key Data" field.
:::
