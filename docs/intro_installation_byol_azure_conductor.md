---
title: Installing a BYOL Conductor-managed Router in Azure
sidebar_label: Installing a BYOL Conductor-managed Router in Azure
---
import useBaseUrl from '@docusaurus/useBaseUrl';

This guide describes the process for deploying a Conductor-managed Session Smart Router (SSR) in Azure using your own license. The process consists of the following steps:

* [Selecting the Azure Plan](#selecting-the-azure-plan).
* Deploying a [Session Smart Conductor](#session-smart-conductor-deployment).
* Deploying the [Session Smart Conductor-managed Router](#session-smart-conductor-managed-router-deployment).

:::note
BYOL instances only support image-based installations, and require the conductor to run 6.3.0-R1 or newer in order to manage these instances.
:::

## Selecting the Azure Plan

The **Bring Your Own License (BYOL)** plan allows you to install your own licensed copy of the SSR software on an Azure VM. Artifactory credentials are required to authenticate access to the installation repositories. Select the BYOL plan of the [Session Smart Networking Platform](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/juniper-networks.session-smart-networking-payg?tab=Overview) offering.


Once you have selected the BYOL plan for your deployment, proceed to [Session Smart Conductor Deployment](#session-smart-conductor-deployment) to deploy a Session Smart Conductor, or proceed to the section [Session Smart Conductor-managed Router Deployment](#session-smart-conductor-managed-router-deployment) to deploy a Session Smart Router.

## Session Smart Conductor Deployment

Use the following information to deploy a BYOL Session Smart Conductor in Azure.

### Requirements

The following infrastructure must exist in your Azure subscription:
* A VNet where the Conductor will be deployed.
* The existing VNet is segmented with at least one subnet.
  * The subnet is reachable for SSH and HTTPs access for administration purposes.
  * The Session Smart Routers managed by this Conductor must be able to reach the IP address of the Conductor in this subnet.

### Deployment

A BYOL Conductor can be deployed manually via the [Azure Portal](https://portal.azure.com) or in an automated fashion using Azure CLI or PowerShell commands. This section describes both methods. Choose the method that better suits your needs.

When deploying the BYOL Session Smart Conductor using the templates referenced in this section, the following infrastructure elements are created automatically to assist with the deployment process:
* Virtual machine with the Session Smart image specified in the template.
* The Conductor is deployed with a single network interface identified as the control interface.
 * There is a network security group associated with the control interface.
 * The control interface has a unique and static public IP address.

The following image shows the infrastructure elements deployed:

![Conductor deployment](/img/platforms_azure_conductor_deployment.png)

### Azure Portal

To deploy the Session Smart Networking software via the Azure Portal:

1. Click **Session Smart Networking Platform BYOL**.
2. Click **Get it now**.
3. Agree to the terms of use and privacy policy of the image.
4. Click the **Plans + Pricing** tab as shown below:

![Plans](/img/platforms_azure_plans.png)

5. Click the **Launch** link on the **Juniper Session Smart Conductor** template to open the template.

![ARM Template](/img/azure-byol-conductor-template.png)

6. Answer the following questions to launch the deployment of a Conductor. For a description of the parameters of the template, please refer to [Launch the Conductor Template](#launch-the-conductor-template).

- What name do you want to give it?
  - Provide it in the **Instance Name** field (for example: Conductor).
- What version of SSR software do you want to install?
- Where do you want to deploy it?
  - Provide the location where the VNet exists in the **Location** field (for example: eastus). All available locations [here](https://azure.microsoft.com/en-us/global-infrastructure/locations). Note the name of the Location field is one word and all lowercase like eastus, westus, westeurope, eastasia, etc.
  - Provide the name of the VNet in the **Virtual Network Name** field (for example: `128T-VNet`).
  - Provide the name of the availability set in the **Availability Set Name** field (for example: `128TSet`).
  - Provide the name of the **Management Subnet**
- What are the artifactory credentials used to install the software?
- Who is going to be the administrator?
  - Provide the content of your public SSH key in the `Admin Public Key Data` field.

7. Agree to the terms of use and conditions of the deployment.

8. Click **Purchase** to launch the deployment.

![Plans](/img/platforms_azure_deployment_complete.png)

Once the deployment completes, information is provided in the Outputs tab and the BYOL installation process begins. After the VM is deployed it will take an addditional 10-15 minutes for the desired SSR version to be installed.

To login to the instance via SSH, use `t128` as the username and the SSH public key provided in the template.

### Azure CLI or PowerShell

To deploy the Session Smart Networking software using the Azure CLI or Powershell:

1. Click **Session Smart Networking Platform BYOL**.
2. Click **Get it now**.
3. Agree to the terms of use and privacy policy of the image.
4. Click on **Get started** to enable programmatic deployment for the subscription, then click **Save**.

![Plans](/img/platforms_azure_programmatically.png)

5. Click the **Plans + Pricing** tab as shown below:

![Plans](/img/platforms_azure_plans.png)

6. Copy the URL of the template located in the field **URL** that best suits your needs.
7. Create the parameters file.
8. Accept the terms of use and conditions of the image.
9. Launch the deployment with the corresponding Azure CLI or PowerShell commands, making use of the URL of the template identified previously. For additional information see [Launch the Conductor Template](#launch-the-conductor-template).

Once the deployment completes, information is provided in the Outputs tab and the BYOL installation process begins. After the VM is deployed it will take an addditional 10-15 minutes for the desired SSR version to be installed.

To login to the instance via SSH, use `t128` as the username and the SSH public key provided in the template.

### Cloud-init Onboarding
When launching an instance using the CLI, Powershell, or while using automation, the following user-data section can be leveraged to setup the onboarding data for the instance. Additionally, this method can be used to further customize the conductor onboarding configuration.

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
            "node-name": "node0",
            "cloud-provider": "azure"
        }
```

| Option | Meaning |
| ------ | ------- |
| name | The name of the router. |
| ssr-version | The SSR software version to be installed on the instance. (BYOL only) |
| artifactory-user | User portion of the artifactory credentials. |
| artifactory-password | Password portion of the artifactory credentials. |
| node-name | The name of the node being provisioned. For a standalone conductor, this is `node0`. |

Additional Conductor configuration options can be found in [Initialize Your Device - Advanced Workflows.](initialize_u-iso_adv_workflow.md#initialize-a-conductor)

### Manual Onboarding
If a user does not supply the onboarding configuration before launching the instance, the onboarding steps can be manually executed.

1. Log into the instance using the admin credentials provided when launching.
2. Run `/usr/libexec/hardwareBootstrapper128t config-generator`
3. Follow the prompts to generate and apply the onboarding configuration.

#### Launch the Conductor Template

This section describes the parameters to complete the template to deploy an SSR Conductor.

![ARM Template](/img/azure-byol-conductor-template.png)

A description of the parameters of the template are listed in the following table:
A description of the parameters of the template are listed in the following table:

| Parameter               | Description |
| ---| --- |
| Subscription            | Subscription for the deployment. |
| Resource group          | Select an existing resource group or create a new one. |
| Region                  | The first instance of the Region field is automatically populated with the region corresponding to the resource group. |
| Location                | As indicated in the requirements, the Session Smart Conductor is going to be deployed into an existing VNet. The Location field is the name of the location where such VNet exists. Please refer to the following list https://azure.microsoft.com/en-us/global-infrastructure/locations (the name of the Location field is one word and all lowercase; e.g., eastus, westus, westeurope, eastasia).     |
| Avaiability Set Name    | Name of the existing availability set within the same resource group and region as the VNet selected above where the device will be deployed. |
| Instance size        | Select the size of the VM in the field Instance Size. |
| Instance Name           | Provide a name to the VM for the Session Smart Conductor. |
| SSR Version                 | SSR software version installed on the instance. |
| Artifactory Username | User portion of the artifactory credentials used to install the SSR software. |
| Artifactory Token | Token for the artifactory credentials used to install the SSR software. |
| Managed Identity | The Azure Managed identity used to manage permissions for the router instance. |
| Virtual Network Name    | Name of the existing VNet where the Session Smart Router is going to be deployed. |
| Control Subnet Name  | The name of the management subnet within the VNet. |
| Control Allowed CIDR      | The IP CIDR range of the endpoints allowed to originate traffic to the Conductor's management interface in the management subnet.  |
| Admin Allowed CIDR      | Allows for restricting reachability to the management interface of the router to a well known source IP address CIDR range. Default is set to 0.0.0.0/0 allowing every IP address to reach the management interface. Once the deployment completes, it is highly recommended to update the configuration of the network security group to allow only access from the source IP address/es where the Session Smart Router will be administered.  |
| Admin Public Key Data | Paste in the field Admin Public Key Data the SSH public key to be used to authenticate with the VM (Linux) instance via SSH. The key needs to be at least 2048-bit and in ssh-rsa format. Please find the following an example of a valid key next (To reduce the length of the key in this example multiple character have been replaced by three dots): ```ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDHwB1Qe1KndGqKuT3F...GumfdHfdasy8N0kncMtp2wtkqoLsRWdJ4/WKaZBOrPd4Q== admin@Admin-MacBook-Pro.local```. For more information about creating ssh keys, see [Create SSH keys on Linux and Mac for Linux VMs in Azure](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/mac-create-ssh-keys). |


### Azure Portal

1. Click the **Session Smart Networking Platform BYOL** offering.
2. Click **Get it now**.
3. Agree to the terms of use and privacy policy of the image.
4. Click the **Plans + Pricing** tab as shown below:

![Plans](/img/platforms_azure_plans.png)

5. Click the **Launch** link of the **Juniper Session Smart Conductor** template.
6. Agree to the terms of use and conditions of the deployment.
7. Click on the **Purchase** button to launch the deployment.

Once the deployment of the template is complete, information about the new conductor deployment is provided in the Output tab.

![Plans](/img/platforms_azure_deployment_complete.png)

The information listed in the Outputs tab is the following:
* Name of the VM instance.
* Public IP address assigned to the management interface of the instance.
* SSH command to login to the Linux VM via the management interface.

:::important
When logging to the Linux instance via SSH use the default username of `t128` and the private key specified in the **Admin Public Key Data** field.
:::

### Azure CLI or PowerShell

Alternatively, it is possible to launch the template programmatically. Please adjust the content of the JSON file below to match the input of each template:

Create the parameters file `conductor_private.parameters.json` with the following command:

```
vi conductor_private.parameters.json
```

Paste the following JSON content. Please adjust the values to your specific environment:

```
{
  "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentParameters.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "location": {
      "value": "<location of the VNet>"
    },
    "availabilitySetName": {
      "value": "<name of the Availability Set>"
    },
    "instanceSize": {
      "value": "Standard_DS3_v2"
    },
    "instanceName": {
      "value": "<instance name>"
    },
    "SSR Version": {
      "value": "<ssr version to be installed>"
    },
    "artifactoryUsername": {
      "value": "The username portion of the artifactory credentials"
    },
    "artifactoryToken": {
      "value": "The password portion of the artifactory credentials"
    },
    "managedIdentity": {
      "value": "<name of the managed identity>"
    },
    "virtualNetworkName": {
      "value": "<name of the VNet>"
    },
    "controlSubnetName": {
      "value": "<name of the management subnet>"
    },
    "controlAllowedCidr": {
      "value": "0.0.0.0/0"
    },
    "adminAllowedCidr": {
      "value": "0.0.0.0/0"
    },
    "adminPublicKeyData": {
      "value": "<content of ssh-rsa key>"
    }
  }
}
```

1. Go to the **Session Smart Networking Platform BYOL** offering.
2. Click **Get it now**.
3. Agree to the terms of use and privacy policy of the image.
4. Click **Get started** to enable programmatic deployment for the subscription.
5. Click **Save** to save the changes.

![Plans](/img/platforms_azure_programmatically.png)

6. Close the **Configure Programmatic Deployment** window.
7. Click the **Plans + Pricing** tab.
8. Copy the URL for the **Session Smart Router** template from the **URL** field.
9. Launch the template by running the following command:

```
New-AzResourceGroupDeployment -ResourceGroupName <your-resource-group-name> `
-TemplateUri <template-URL> `
-TemplateParameterFile ./conductor_private.parameters.json
```

:::important
When logging to the Linux instance via SSH, use the default username of `t128` and the private key specified in the **Admin Public Key Data** field.
:::

### Deploying a Conductor without Templates

1. Go to the **Session Smart Networking Platform BYOL** offering.
2. Click **Create**.
3. Complete the Basics tab then review the additional tabs for further customization.
4. Under the Advanced tab, you can add cloud-init custom data to automatically install and initalize the conductor. Use the steps in the [Cloud-init Onboarding](#cloud-init-onboarding) section.
5. Click **Review and Create**
6. If an onboarding configuration was not provided in step 4, follow the steps in the [Manual Onboarding](#manual-onboarding) section.

## Session Smart Conductor-managed Router Deployment

Use the following guide to deploy a BYOL Session Smart Conductor-managed Router in Azure.

### Requirements

The following infrastructure must exist in your Azure subscription:
* A VNet where the Session Smart Router (SSR) will be deployed.
* An Availability Set where the SSR will be deployed.
* The existing VNet is segmented with at least the following three subnets:
  - **Public Subnet**: This subnet must provide connectivity to enable communication with external/remote SSR peers.
  - **Private Subnet**: This subnet must provide connectivity to internal workloads within the cloud.
  - **[OPTIONAL] Management Subnet**: This subnet is used for conductor-managed deployments, and has the following requirements:
    * The subnet is reachable for SSH for administration purposes.
    * The interface of the Conductor that manages this router must be reachable from this subnet.

### Deployment
A Session Smart Conductor-managed Router can be deployed manually via the [Azure Portal](https://portal.azure.com) or in an automated fashion using Azure CLI or PowerShell commands. This section describes both methods. Choose the method that better suits your needs.

When deploying the Session Smart Router using the templates referenced in this section, the following infrastructure elements are created automatically to assist with the deployment process:
* Virtual machine with the Session Smart image specified in the template.
* The router is deployed with three network interfaces: public, private, and optional management interfaces.
* Each network interface has a network security group associated. The network security groups are configured in accordance with the requirements to deploy a fabric with Session Smart Networking software.
* The public and optional management interfaces have a unique and static public IP address associated.

The following image shows the infrastructure elements deployed:

![Router deployment](/img/platforms_azure_router_deployment.png)

### Azure Portal

To deploy the Session Smart Networking software via the Azure Portal:
1. Click the **Session Smart Networking Platform BYOL** offering.
2. Click **Get it now**.
3. Agree to the terms of use and privacy policy of the image.
4. Click the **Plans + Pricing** tab as shown below:

![Plans](/img/platforms_azure_plans.png)

5. Click the **Launch** link of the **Juniper Session Smart Conductor** template.

![ARM Template](/img/azure-byol-conductor-managed-template.png)

6. Answer the following questions to launch the deployment of a Conductor-managed Router. For a description of the parameters of the template, please refer to [Launch the Conductor-managed Template](#launch-the-conductor-managed-template).

- Where do you want to deploy it?
  - Provide the location where the VNet exists in the **Location** field (for example: eastus). See [Locations](https://azure.microsoft.com/en-us/global-infrastructure/locations) for a full list of locations. Note the name of the Location field is one word and all lowercase like eastus, westus, westeurope, eastasia, etc.
- Provide the name of the availability set in the **Availability Set Name** field (for example: `128TSet`).
- What name do you want to give it?
  - Provide it in the **Instance Name** field (for example: Router).
- What version of SSR software do you want to install?
- What are the artifactory credentials used to install the software?
- Provide the name of the VNet in the **Virtual Network Name** field (for example: `128T-VNet`).
  - Provide the name of the **Public Subnet Name**
  - Provide the name of the **Private Subnet Name**
  - Provide the name of the Optional **Management Subnet**
- What Conductor is going to manage the router?
  - Provide the **Primary Control IP**
  - Optionally, provide the **Seoncdary Control IP**
- Who is going to be the administrator?
  - Provide the content of your public SSH key in the `Admin Public Key Data` field.

7. Agree to the terms of use and conditions of the deployment.

8. Click **Purchase** to launch the deployment.

![Plans](/img/platforms_azure_deployment_complete.png)

Once the deployment completes, information is provided in the Outputs tab and the BYOL installation process begins. After the VM is deployed it will take an addditional 10-15 minutes for the desired SSR version to be installed. The Router will automatically be associated with the desired Conductor.

To login to the instance via SSH, use `t128` as the username and the SSH public key provided in the template.


### Azure CLI or PowerShell

To deploy the Session Smart Networking software using the Azure CLI or Powershell:

1. Click the **Session Smart Networking Platform BYOL** offering.
2. Click **Get it now**.
3. Agree to the terms of use and privacy policy of the image.
4. Click **Get started** to enable programmatic deployment for the subscription, then click **Save**.

![Plans](/img/platforms_azure_programmatically.png)

5. Click the **Plans + Pricing** tab as shown below:

![Plans](/img/platforms_azure_plans.png)

6. Copy the URL of the template located in the field **URL** that best suits your needs.
7. Create the parameters file.
8. Accept the terms of use and conditions of the image.
9. Launch the deployment with the corresponding Azure CLI or PowerShell commands, making use of the URL of the template identified previously. For additional information see [Launch the Conductor-managed Template](#launch-the-conductor-managed-template).

Once the deployment completes, information is provided in the Outputs tab and the BYOL installation process begins. After the VM is deployed it will take an addditional 10-15 minutes for the desired SSR version to be installed. The Router will automatically be associated with the desired Conductor.

To login to the instance via SSH, use `t128` as the username and the SSH public key provided in the template.

### Cloud-init Onboarding

When launching an instance using the CLI, Powershell, or using automation, the following custom data section can be leveraged to setup the onboarding data for the instance.

```
#cloud-config
write_files:
  - path: /etc/128T-hardware-bootstrapper/onboarding-config.json
    content: |
        {
            "name": "<router-name>",
            "ssr-version": "<version>",
            “mode”: "conductor-managed",
            “conductor-hosts”: ["<conductor-host>"],
            "cloud-provider": "azure"
        }
```
| Option | Meaning |
| ------ | ------- |
| name | The name of the Router. |
| ssr-version | The SSR software version to be installed on the instance. (BYOL only) |
| artifactory-user | User portion of the artifactory credentials. |
| artifactory-password | Password portion of the artifactory credentials. |
| conductor-hosts | The list of Conductor control IPs used to manage the router. |

### Manual Onboarding
If a user does not supply the onboarding configuration before launching the instance, the onboarding steps can be manually executed.

1. Log into the instance using the admin credentials provided when launching.
2. Run `/usr/libexec/hardwareBootstrapper128t config-generator`
3. Follow the prompts to generate and apply the onboarding configuration.

#### Launch the Conductor-managed Template

This section describes the parameters to complete the template to deploy an SSR using either the Azure marketplace, or programmatically.


![ARM Template](/img/azure-byol-conductor-managed-template.png)

A description of the parameters of the template are listed in the following table:

| Parameter               | Description |
| ---| --- |
| Subscription            | Subscription for the deployment. |
| Resource group          | Select an existing resource group or create a new one. |
| Region                  | The first instance of the Region field is automatically populated with the region corresponding to the resource group. |
| Location                | As indicated in the requirements, the Session Smart Router is going to be deployed into an existing VNet. The Location field is the name of the location where such VNet exists. Please refer to the following list https://azure.microsoft.com/en-us/global-infrastructure/locations (the name of the Location field is one word and all lowercase; e.g., eastus, westus, westeurope, eastasia).     |
| Avaiability Set Name    | Name of the existing availability set within the same resource group and region as the VNet selected above. |
| Instance size        | Select the size of the VM in the field Instance Size. |
| Instance Name           | Provide a name to the VM for the Session Smart Router. |
| SSR Version                 | SSR software version installed on the instance. |
| Primary Control IP | The primary IP address of the Conductor |
| Secondary Control IP | The secondary IP address of the Conductor |
| Artifactory Username | User portion of the artifactory credentials used to install the SSR software. |
| Artifactory Token | Token for the artifactory credentials used to install the SSR software. |
| Virtual Network Name    | Name of the existing VNet where the Session Smart Router is going to be deployed. |
| Public Subnet Name      | The name of the public subnet within the VNet. |
| Public Subnet Allowed CIDR     | Corresponds to the source IP CIDR range of the SSR/s at the data center/branch (outside the cloud) allowed to originate traffic to the public interface of the router. This field allows for defining a well defined and trusted IP address range. It is common to set this field to 0.0.0.0/0 for now, as the source IP addresses of the routers at the data center or branch (outside the cloud) are not known at this time. However, after the deployment and once these external IP addresses are known it is recommended to provision them in the corresponding security groups to increase the degree of security. |
| Admin Allowed CIDR      | Allows for restricting reachability to the management interface of the router to a well known source IP address CIDR range. Default is set to 0.0.0.0/0 allowing every IP address to reach the interface. Once the deployment completes, it is highly recommended to update the configuration of the network security group to allow only access from the source IP address/es where the Session Smart Router will be administered. |
| Private Subnet Name     | The name of the private subnet within the VNet. |
| Private Subnet Allowed CIDR    | Corresponds to the source IP CIDR range of the internal workloads/endpoints allowed to originate traffic to the private interface of the router. This field allows for defining a well defined and trusted IP address range. Default is set to 0.0.0.0/0 to allow every workload/endpoint to communicate with the router.  |
| [OPTIONAL] Management Subnet Name  | The name of the management subnet within the VNet. |
| Admin Public Key Data | Paste in the field Admin Public Key Data the SSH public key to be used to authenticate with the VM (Linux) instance via SSH. The key needs to be at least 2048-bit and in ssh-rsa format. Please find the following an example of a valid key next (To reduce the length of the key in this example multiple character have been replaced by three dots): ```ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDHwB1Qe1KndGqKuT3F...GumfdHfdasy8N0kncMtp2wtkqoLsRWdJ4/WKaZBOrPd4Q== admin@Admin-MacBook-Pro.local```. For more information about creating ssh keys, see [Create SSH keys on Linux and Mac for Linux VMs in Azure](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/mac-create-ssh-keys). |

### Azure Portal

1. Click the **Session Smart Networking Platform BYOL** offering.
2. Click **Get it now**.
3. Agree to the terms of use and privacy policy of the image.
4. Click the **Plans + Pricing** tab as shown below:

![Plans](/img/platforms_azure_plans.png)

5. Click the **Launch** link on the **Juniper Session Smart Conductor** template.
6. Agree to the terms of use and conditions of the deployment.
7. Click **Purchase** to launch the deployment.

Once the deployment of the template is complete, information about the new router deployment is provided in the Output tab.

![Plans](/img/platforms_azure_deployment_complete.png)

The information listed in the Outputs tab is the following:
* Name of the VM instance.
* Public IP address assigned to the management interface of the instance.
* SSH command to login to the Linux VM via the management interface.

:::important
When logging to the Linux instance via SSH use the default username of `t128` and the private key specified in the **Admin Public Key Data** field.
:::

### Azure CLI or PowerShell

Alternatively, it is possible to launch the template programmatically. Please adjust the content of the JSON file below to match the input of each template:

Create the parameters file `router_private.parameters.json` with the following command:

```
vi router_private.parameters.json
```

Paste the following JSON content. Please adjust the values to your specific environment:

```
{
  "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentParameters.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "location": {
      "value": "<location of the VNet>"
    },
    "availabilitySetName": {
      "value": "<name of the Availability Set>"
    },
    "instanceSize": {
      "value": "Standard_DS3_v2"
    },
    "instanceName": {
      "value": "<instance name>"
    },
    "SSR Version": {
      "value": "<ssr version to be installed>"
    },
    "conductorPrimaryControlIP": {
        "value" "The primary control IP of the Conductor",
    },
    "conductorSecondaryControlIP": {
        "value" "The primary control IP of the Conductor",
    },
    "artifactoryUsername": {
      "value": "The username portion of the artifactory credentials"
    },
    "artifactoryToken": {
      "value": "The password portion of the artifactory credentials"
    },
    "managedIdentity": {
      "value": "Name of the user managed identity resource to be assigned to the Router."
    },
    "virtualNetworkName": {
      "value": "<name of the VNet>"
    },
    "publicSubnetName": {
      "value": "<name of the public subnet>"
    },
    "publicSubnetAllowedCidr": {
      "value": "0.0.0.0/0"
    },
    "adminAllowedCidr": {
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
    "adminPublicKeyData": {
      "value": "<content of ssh-rsa key>"
    }
  }
}
```

1. Go to the **Session Smart Networking Platform BYOL** offering.
2. Click **Get it now**.
3. Agree to the terms of use and privacy policy of the image.
4. Click **Get started** to enable programmatic deployment for the subscription.
5. Click the button **Save** to save the changes.

![Plans](/img/platforms_azure_programmatically.png)

6. Close the **Configure Programmatic Deployment** window.
7. Click the **Plans + Pricing** tab.
8. Copy the URL of the **Session Smart Router** template located in the **URL** field.
9. Launch the template by running the following command:

```
New-AzResourceGroupDeployment -ResourceGroupName <your-resource-group-name> `
-TemplateUri <template-URL> `
-TemplateParameterFile ./router_private.parameters.json
```

:::important
When logging to the Linux instance via SSH use the default username of `t128` and the private key specified in the **Admin Public Key Data** field.
:::

### Deploying a Conductor-managed Router without Templates

1. Go to the **Session Smart Networking Platform BYOL** offering.
2. Click **Create**.
3. Complete the Basics tab then review the additional tabs for further customization.
4. Under the Advanced tab, you can add cloud-init custom data to automatically install and onboard the router. Use the steps in the [Cloud-init Onboarding](#cloud-init-onboarding-1) section.
5. Click **Review and Create**
6. If an onboarding configuration was not provided in step 4, follow the steps in the [Manual Onboarding](#manual-onboarding-1) section.

## Interface Tagging

In addition to using the cloud formation template, the admin can tag the interface with the key `SSR-ROLE`. The possible values are as follows:

| Tag Value | Meaning |
| --------- | ------- |
| WAN       | Interface is marked as WAN for onboarding purposes. |
| LAN       | Interface is marked as LAN and is assumed to be used as a private network for internal workflows. |
| MGMT       | Interface is marked as MGMT and is assumed to have SSH connectivity. |

## Troubleshooting

### Device Does Not Initalize Properly

Once the instance is launched with the correct parameters, the device will begin to install the SSR software. After installing the software, the device will either initialize as a Conductor or automatically onboard to the associated conductor. This process can take up to 15 minutes to complete.

If the instance does not install SSR as expected, SSH into the instance using the credentials provided during VM creation.

- Try to log into the pcli, run `su admin` and then `show system`.

- If the pcli is not accessable or the status and necessary action is not obvious, capture the Hardware Bootstrapper tech support (`/var/log/128T-hardware-bootstrapper/hardware-bootstrapper-tech-support.zip`) and examine the journal for `128T-hardware-bootstrapper`, and `ember`.
