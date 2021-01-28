---
title: Installing in Azure
sidebar_label: Installing in Azure
---

## Introduction

This guide describes the process for deploying a 128T Conductor and a 128T Session Smart Router in Azure.

## 128T Conductor Deployment

### Requirements

The following infrastructure must exist in your Azure subscription:
* A VNet where the 128T Conductor will be deployed.
* The existing VNet should be segmented with at least one subnet.
  * This subnet should be reachable for SSH and HTTPs access for administration purposes.
  * The 128T Routers managed by this 128T Conductor must be able to reach the IP address of Conductor in this subnet.

### Deployment

A 128T Conductor can be deployed manually via the [Azure Portal](https://portal.azure.com) or in an automated fashion using Azure CLI or PowerShell commands. This section describes both methods, please proceed to the method that better suits your needs.

When deploying the 128 Technology Conductor using the templates referenced later in this section, the following infrastructure elements are created automatically on your behalf in order to assist you with the deployment process:
* Virtual machine using a 128 Technology image available in the marketplace.
* The Conductor is deployed with one network interface known as the control interface.
* The network interface has a network security group associated.
* The control interface has a unique and static public IP address associated.
* Depending on the template selected the 128T Conductor application or the 128T installer will be installed.

The following image depicts a graphical representation of the infrastructure elements deployed:

![Conductor deployment](/img/platforms_azure_conductor_deployment.png)

#### Azure Portal

Please click [here](https://azuremarketplace.microsoft.com/en-ca/marketplace/apps/128technology.128technology_conductor_hourly) to go to the Marketplace. Click on the "Get it now" button, agree to the terms of use and privacy policy of the image and click on the tab "Plans" as shown in the following picture:

![Plans](/img/platforms_azure_plans.png)

Lastly click on the "Launch" link of the template that better suits your needs.

Answer the following 3 questions to launch the deployment of a 128T Conductor (additional information [here](#launch-the-template)):
* What name do you want to give it?  
Provide it in the "Instance Name" field (for example: 128TConductor).
* Where do you want to deploy it?  
Provide the location where the VNet exists in the "Location" field (for example: eastus. All available locations [here](https://azure.microsoft.com/en-us/global-infrastructure/locations)), the name of the VNet in the "Virtual Network Name" field (for example: 128T-VNet) and the name of a subnet in the "Control Subnet Name" field (for example: default).
* Who is going to be the administrator?  
Provide an username (for example: t128) in the "Admin Username" field and the content of your public SSH key in the "Admin Public Key Data" field respectively.

Agree to the terms of use and conditions of the deployment and lastly click on the "Purchase" button to launch the deployment.

![Plans](/img/platforms_azure_deployment_complete.png)

Once the deployment completes, information of the newly 128T Conductor deployment is provided in the Outputs tab placed on the left hand side. Click on the HTTPs URL to login to the 128T Conductor GUI (if the web browser used is Chrome and it does not trust the connection to the 128T Conductor GUI due to its self-signed certificate type: thisisunsafe). The credentials are "admin" for username and the name of the VM for the password. To login to the VM via SSH use the username and the SSH public key provided in the template.

:::important
Be sure to change the password that conforms to your business' password requirements and criteria.
:::

#### Azure CLI or PowerShell

Please click [here](https://azuremarketplace.microsoft.com/en-ca/marketplace/apps/128technology.128technology_conductor_hourly) to go to the Marketplace. Click on the "Get it now" button, agree to the terms of use and privacy policy of the image, click on the "Get started" button to enable programmatic deployment for the subscription and click the button "Save" to save the changes.

![Plans](/img/platforms_azure_programmatically.png)

Click on the tab "Plans" as shown in the following picture:

![Plans](/img/platforms_azure_plans.png)

Lastly copy to the clipboard the URL of the template located in the field "URL" that better suits your needs.

Create the parameters file, accept the terms of use and conditions of the image and lastly launch the deployment with the corresponding Azure CLI or PowerShell commands making use of the URL of the template identified previously. For additional information please click [here](#launch-the-template).

Once the deployment completes, information of the newly 128T Conductor deployment is provided in the Outputs section. Click on the HTTPs URL to login to the 128T Conductor GUI (if the web browser used is Chrome and it does not trust the connection to the 128T Conductor GUI due to its self-signed certificate type: thisisunsafe). The credentials are "admin" for username and the password is the name of the VM. To login to the VM via SSH use the username and the SSH public key provided in the template.

:::important
Be sure to change the password that conforms to your business' password requirements and criteria.
:::

## 128T Session Smart Router Deployment

### Requirements

The following infrastructure must exist in your Azure subscription:
* A VNet where the 128T Session Smart Router will be deployed.
* An Availability Set where the 128T Session Smart Router will be deployed.
* The existing VNet should be segmented with at least three subnets. The role of each subnet is described below:
  * Public subnet. The expectation is that this subnet provides connectivity to enable communication with external/remote 128T Router peers.
  * Private subnet. The expectation is that this subnet provides connectivity to internal workloads within the cloud.
  * Management subnet. The expectation is that this subnet meets the following capabilities:
    * This subnet should be reachable via SSH for administration purposes.
    * The interface of the 128T Conductor that is going to manage this router must be reachable from this subnet.

:::important
Please note that deploying 128 Technology Session Smart Routers without a valid certificate will be limited to deployments within the cloud only. If your use case requires the deployment of a 128T Router on your premises as well please contact 128 Technology.
:::

### Deployment

A 128T Session Smart Router can be deployed manually via the [Azure Portal](https://portal.azure.com) or in an automated fashion using Azure CLI or PowerShell commands. This section describes both methods, please proceed to the method that better suits your needs.

When deploying a 128T Session Smart Router using either of the templates referenced later in this section, the following infrastructure elements are created automatically on your behalf in order to assist you with the deployment process:
* Virtual machine using a 128 Technology image available in the marketplace.
* The router is deployed with three network interfaces: public, private and management interfaces.
* Each network interface has a network security group associated. The network security groups are configured in accordance with the requirements to deploy a fabric with 128 Technology.
* The public and management interfaces have a unique and static public IP address associated.
* Depending on the template selected the 128T Session Smart Router application or the 128T installer will be installed.

The following image depicts a graphical representation of the infrastructure elements deployed:

![Router deployment](/img/platforms_azure_router_deployment.png)

#### Azure Portal

Please click [here](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/128technology.128technology_router_100_hourly) to go to the Marketplace. Click on the "Get it now" button, agree to the terms of use and privacy policy of the image and click on the tab "Plans" as shown in the following picture:

![Plans](/img/platforms_azure_plans.png)

Lastly click on the "Launch" link of the template that better suits your needs.

Answer the following 4 questions to launch the deployment of a 128T Session Smart Router (additional information [here](#launch-the-template)):
* What name do you want to give it?  
Provide it in the "Instance Name" field (for example: 128TRouter).
* Where do you want to deploy it?  
Provide the location where the VNet exists in the "Location" field (for example: eastus. All available locations [here](https://azure.microsoft.com/en-us/global-infrastructure/locations)), the name of the VNet in the "Virtual Network Name" field (for example: 128T-VNet), the name of the availability set in the "Availability Set Name" field (for example: 128TRouterSet) and the name of the public, private and management subnets in the "Public Subnet Name", "Private Subnet Name" and "Management Subnet Name" fields respectively (for example: wan, lan and default).
* Which 128T Conductor is going to manage it?  
Provide the IP address of the primary node of Conductor in the "Conductor Primary Control IP" field, and only if the Conductor is highly available then provide the IP address of the secondary node of Conductor in the "Conductor Secondary Control IP" field. Please check the public IP address assigned to the 128 Technology Conductor deployed in the previous section.
* Who is going to be the administrator?  
Provide an username (for example: t128) and the content of your public SSH key in the "Admin Username" and "Admin Public Key Data" fields respectively.

Agree to the terms of use and conditions of the deployment and lastly click on the "Purchase" button to launch the deployment.

![Plans](/img/platforms_azure_deployment_complete.png)

Once the deployment completes, information of the newly 128T Session Smart Router deployment is provided in the Outputs tab placed on the left hand side. To login to the instance via SSH use the username and the SSH public key provided in the template.

The deployment will be non interactive as the Zero Touch Provisioning (ZTP) method will be triggered. The ZTP process will take 1-2 minutes to initialize. Please login to Conductor via HTTPs to associate the pending asset with the configuration of the router once the ZTP process is ready to start.

#### Azure CLI or PowerShell

Please click [here](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/128technology.128technology_router_100_hourly) to go to the Marketplace. Click on the "Get it now" button, agree to the terms of use and privacy policy of the image, click on the "Get started" button to enable programmatic deployment for the subscription and click the button "Save" to save the changes.

![Plans](/img/platforms_azure_programmatically.png)

Click on the tab "Plans" as shown in the following picture:

![Plans](/img/platforms_azure_plans.png)

Lastly copy to the clipboard the URL of the template located in the field "URL" that better suits your needs.

Create the parameters file, accept the terms of use and conditions of the image and lastly launch the deployment with the corresponding Azure CLI or PowerShell commands making use of the URL of the template identified previously. For additional information please click [here](#launch-the-template).

Once the deployment completes, information of the newly 128T Session Smart Router deployment is provided in the Outputs section. To login to the VM via SSH use the username and the SSH public key provided in the template.

### Network Interfaces Layout

The _Session Smart Router Template_ deploys a VM for the 128T Session Smart Router with three network interfaces. The template attaches the network interfaces to the VM in the following order: Management, Public, and Private. The network interfaces are mapped as follows:

| Network interface name | Subnet           | 
| ---------------------- | ---------------- |
| eth0                   | Management       |
| eth1                   | Public           |
| eth2                   | Private          |

In earlier versions of the 128T Networking Platform software (pre-5.0), the 128T Router used the PCI addresses to map to the device interfaces. If you are installing an earlier version of the 128T Software, please see [PCI Address Association](#pci-address-association). 

With the release of 5.0, device interfaces are mapped using the VMBus UUID; use of the PCI addresses is no longer supported. Use the following process to map the VMBus UUID to the device interfaces. 

### Configuring a Device Interface with VMBus UUID

The following are the high level steps to configure a device interface on a 128T router running in the Azure cloud.

- Determine the Device Interface Layout 
- Configure and Assign the VMBus UUID Identifier to a Device Interface
- Verify Connectivity

:::note
If you are *upgrading* the 128T software from a version prior to 5.0, repeat this procedure for each router running on Azure.
:::

#### Determine the Device Interface Layout

1. Identify the VMBus UUID address associated with each device interface on the Linux VM. 

	a) Login via SSH to the VM corresponding to the 128T router. 

	b) Run the following command in Linux:
		`sudo dpdk-devbind.py --status`

	In the VMBus devices section, the VMBus UUID is the first column (outlined below in red). The parameter `if` (outlined below in green) is the name of the associated device interface in Linux.

	![VMBusDevices](/img/VMBusDevicesLinux.png)

2. Identify the Azure mapping of each device interface.

	a) Login to the Azure portal. 

	b) Click on the name of the VM of the router.

	c) Select Networking under the Settings section on the left side of the interface.

	![Settings Menu](/img/VMBusAzureUI1.png)
	
	d) The device interfaces attached to the VM are shown. 

	![Azure Port UI](/img/VMBusAzureUI2.png)

	From left to right, the interfaces are: **Router-mgmt** (management interface), **Router-public** (WAN interface), and **Router-private** (LAN interface). 

	In this example, the _Session Smart Router Template_ assigned the Linux interfaces to eth0, eth1, and eth2 respectively.

3. Use the information gathered from the Azure portal (Router-mgmt, Router-public, Router-private) and the output from the `sudo dpdk-devbind.py --status` command to determine the VMBus UUID, as shown in the following table.

| Device Interface Name (Linux) | Subnet | VMBus UUID |
| ------ | ------ | ------ |
| eth0 | mgmt | -4e97000d3a04 |
| eth1 | public | -efd3000d3a04 |
| eth2 | private | -e5e2000d3a04 |

#### Assign the VMBus UUID Identifier to a Device Interface

Assign the VMBus UUID to a device interface using the CLI.

1. Login to the CLI on the Conductor. 
2. Run the following commands to configure a device interface with a VMBus UUID on a router:

```
configure authority router <router name> node <node name> device-interface <device interface name>
type ethernet
forwarding true
vmbus-uuid <device interface vmbus uuid>
top
```

3. Repeat the steps above for each device interface and router running on Azure.

4. Validate and commit the changes.
```
validate
commit
```

#### Verify Connectivity

1. Login via SSH to the VM of each router running on Azure. 

2. Login to the 128T CLI.
	
	`su admin`

3. Ping the gateway of each device interface.
	
	`ping <gateway IP address>`

4. Azure gateways do not reply to ping, but you can verify connectivity by checking the ARP table on the 128T router. Use `show arp` to display the ARP table, and look for **valid** entries. 

### PCI Address Association

In order to configure the 128T Router using pre-5.0 software, each device interface must be mapped to the corresponding PCI address. Use the following steps to identify the correct PCI address for each ethernet port. 

1. Log in via SSH to the VM corresponding to the 128T Session Smart Router as indicated in the Outputs section of the deployed template.
2. Run the following command:

```
sudo dpdk-devbind.py --status
```

The PCI address is the first column under **Network devices using kernel driver** shown in the image below. The corresponding network interfaces follow the **if** parameter. 

![DPDK PCI addresses](/img/platforms_azure_dpdk_pci.png)

The following table clarifies the PCI mapping to each network interface. 

| Network interface name | Subnet           | PCI address  |
| ---------------------- | ---------------- | ------------ |
| eth3                   | Management       | be6d:00:02.0 |
| eth4                   | Public           | 8061:00:02.0 |
| eth5                   | Private          | a994:00:02.0 |

When configuring the managed 128T Router via its corresponding Conductor, use the PCI addresses to configure each device interface.

## Annexes

### Marketplace images

This section describes in greater detail the different 128T images available in the Marketplace. For a quick and easy deployment of the 128T software for Proof Of Concept purposes, please refer to the hourly images that are linked in the first two sections of this document: [128T Conductor Deployment](#128t-conductor-deployment) and [128T Session Smart Router Deployment](#128t-session-smart-router-deployment).

#### 128 Technology Conductor images

The images available to deploy a 128T Conductor are the following:

* 128 Technology Conductor. No certificate from 128 Technology is required to deploy this image, therefore it is the recommended image to use if a certificate from 128 Technology is not in your possession. The 128T software is billed hourly when running in addition to the cost of running the VM. For additional information about this image please visit the Marketplace [here](https://azuremarketplace.microsoft.com/en-ca/marketplace/apps/128technology.128technology_conductor_hourly).
* 128T Networking Platform. A certificate from 128 Technology is required to install the software, therefore it is the recommended image to use if a certificate from 128 Technology is in your possession. There is no cost for running the 128T software, the cost of running the VM is the only cost. For more information about the image please visit the Marketplace [here](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/128technology.128t_networking_platform).
* Private. No certificate from 128 Technology is required to deploy this image. There is no cost for running the 128T software, the cost of running the VM is the only cost. Access to the 128 Technology software should have been provided to your Azure subscription as a result of a partnership agreement.

A section for each of the images available discussed above is shown next. To begin the deployment, please refer to the section for the image that suits your requirements.

##### <u>128 Technology Conductor (Hourly)</u>

Deploy the 128T Conductor using the 128 Technology Conductor (Hourly) image: 

1. Login to the [Azure Portal](https://portal.azure.com). 

2. In the Search Bar enter **Marketplace** as shown below.

![Marketplace](/img/platforms_azure_portal_marketplace.png)

3. Once in the Marketplace, type **128 Technology** in the Marketplace Search Bar and hit **Enter**.

![Search](/img/platforms_azure_marketplace_search.png)

4. Select the **128 Technology Conductor** offering.

<img src="/img/platforms_azure_marketplace_conductor_hourly.png" alt="128 Technology Conductor Hourly" width="220" height="250" />

##### <u>128T Networking Platform (BYOL)</u>

Deploy the 128T Conductor using the 128T Networking Platform (BYOL) image: 

1. Login to the [Azure Portal](https://portal.azure.com). 

2. In the Search Bar enter **Marketplace** as shown below.

![Marketplace](/img/platforms_azure_portal_marketplace.png)

3. Once in the Marketplace, type **128 Technology** in the Marketplace Search Bar and hit **Enter**.

![Search](/img/platforms_azure_marketplace_search.png)

4. Select the **128T Networking Platform** offering.

<img src="/img/platforms_azure_marketplace_networkingplatform_byol.png" alt="128T Networking Platform" width="220" height="250" />

##### <u>Private</u>

Deploy the 128T Conductor using the Private image:

1. Login to the [Azure Portal](https://portal.azure.com). 

2. In the Search Bar enter **Marketplace** as shown below.

![Marketplace](/img/platforms_azure_portal_marketplace.png)

3. Once your subscription ID has been whitelisted, the following banner will display:

![Marketplace private offerings](/img/platforms_azure_marketplace_private_banner.png)

4. Click on the banner.

5. Select the **128 Technology Conductor** offering.

<img src="/img/platforms_azure_marketplace_conductor_private.png" alt="128 Technology Conductor Private" width="220" height="250" />

#### 128T Session Smart Router images

The images available in the Azure Marketplace to deploy a 128T Session Smart Router are the following:

* 128T Session Smart Router. No certificate from 128 Technology is required to deploy this image, therefore it is the recommended image to use if a 128 Technology certificate is not in your possession. The 128T software is billed hourly when running in addition to the cost of running the VM. For additional information about this image please visit the Marketplace [here](https://azuremarketplace.microsoft.com/en-ca/marketplace/apps/128technology.128technology_router_100_hourly).
* 128T Networking Platform. A certificate from 128 Technology is required to install the software, therefore it is the recommended image to use if a 128 Technology certificate is in your possession. There is no cost for running the 128T software, the cost of running the VM is the only cost. For more information about the image please visit the Marketplace [here](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/128technology.128t_networking_platform).
* Private. No certificate from 128 Technology is required to deploy this image. There is no cost for running the 128T software, the cost of running the VM is the only cost. Access to the 128 Technology software should have been provided to your Azure subscription as a result of a partnership agreement.

A section for each of the images available discussed above is shown next. To begin the deployment, please refer to the section for the image that suits your requirements.

##### <u>128T Session Smart Router (Hourly)</u>

Deploy the 128T Session Smart Router using the 128T Session Smart Router (Hourly) image:

1. Login to the [Azure Portal](https://portal.azure.com).

2. In the Search Bar enter **Marketplace** as shown below.

![Marketplace](/img/platforms_azure_portal_marketplace.png)

3. Once in the Marketplace, type **128 Technology** in the Marketplace Search Bar and hit **Enter**.

![Search](/img/platforms_azure_marketplace_search.png)

4. Select the **128 Technology Session Smart Router** offering.

<img src="/img/platforms_azure_marketplace_router_hourly.png" alt="128 Technology Session Smart Router Hourly" width="220" height="250" />

##### <u>128T Networking Platform (BYOL)</u>

Deploy the 128T Session Smart Router using the 128T Networking Platform (BYOL) image:
1. Login to the [Azure Portal](https://portal.azure.com).

2. In the Search Bar enter **Marketplace** as shown below.

![Marketplace](/img/platforms_azure_portal_marketplace.png)

3. Once in the Marketplace, type **128 Technology** in the Marketplace Search Bar and hit **Enter**.

![Search](/img/platforms_azure_marketplace_search.png)

4. Select the **128T Networking Platform** offering.

<img src="/img/platforms_azure_marketplace_networkingplatform_byol.png" alt="128T Networking Platform" width="220" height="250" />

##### <u>Private</u>

Deploy the 128T Session Smart Router using the Private image:
1. Login to the [Azure Portal](https://portal.azure.com).

 2. In the Search Bar enter **Marketplace** as shown below.

![Marketplace](/img/platforms_azure_portal_marketplace.png)

3. Once your subscription ID has been whitelisted, the following banner will display:

![Marketplace private offerings](/img/platforms_azure_marketplace_private_banner.png)

4. Click on the banner.

5. Select the **128 Technology Session Smart Router** offering.

<img src="/img/platforms_azure_marketplace_router_private.png" alt="128 Technology Session Smart Router Private" width="220" height="250" />

### Agree to the Terms of Use and the Privacy Policy

To agree to the Terms of Use and the Privacy Policy for the 128T image used, click on **GET IT NOW** as shown in the following image:

![128 Technology Conductor Hourly](/img/platforms_azure_marketplace_getitnow.png)

Click on **Continue** in order to agree to the Terms of Use and the Privacy Policy.

To deploy the 128T software programmatically, you must enable Programmatic Deployment and accept its Terms of Use. If Programmatic Deployment is desirable, please click on the **Get started** button located under the **Create** button as shown in the image below:

![Plans](/img/platforms_azure_programmatically.png)

Finally, select the subscription you want and click on **Save** to apply the changes.

Alternatively, it is possible to accept the term of use and privacy policy programmatically. The PowerShell commands for each 128 Technology image are shown next, please run the commands corresponding to the image you want to use:

* 128 Technology Conductor:

```
Get-AzureRmMarketplaceTerms `
-Publisher "128technology" `
-Product "128technology_conductor_hourly" `
-Name "128 Technology Conductor" `
| Set-AzureRmMarketplaceTerms -Accept
```

* 128T Session Smart Router:

```
Get-AzureRmMarketplaceTerms `
-Publisher "128technology" `
-Product "128technology_router_100_hourly" `
-Name "128T Session Smart Router - 100 Mbps" `
| Set-AzureRmMarketplaceTerms -Accept
```

* 128T Networking Platform:

```
Get-AzureRmMarketplaceTerms `
-Publisher "128technology" `
-Product "128t_networking_platform" `
-Name "128T Networking Platform" `
| Set-AzureRmMarketplaceTerms -Accept
```

### Load the template

After the Terms of Use and the Privacy Policy have been accepted, select the **Plan** tab. The available templates are listed there.

When you select a template, a new tab opens in the browser that redirects you to the template. 

:::important
As an additional note and only applicable when the chosen image is the 128T Networking Platform, please be aware of the following conditions before using any of its templates:
* Applicable when deploying either a 128 Technology Conductor or a 128T Session Smart Router using the 128T Networking Platform image only:
  * The management network must allow outbound access to the Internet so that the 128T installer can download the 128T software from the 128T YUM repositories available on the Internet.
* Applicable when deploying a 128T Session Smart Router using the 128T Networking Platform image only:
  * If there is an existing 128T Conductor in the network and the intent is to perform a non interactive installation of a 128T Router (for example a ZTP installation) please make sure the certificate provided by 128 Technology has been imported and loaded in 128T Conductor before launching this template.
:::

### Launch the Template

This section describes how to fill out and launch the template via the portal and programmatically deploy a 128 Technology Conductor and a 128T Session Smart Router.

#### 128 Technology Conductor

This section describes the parameters to fill out the template to deploy a 128 Technology Conductor as well as how to launch it via the portal and programmatically.

A description of the parameters of the template are listed in the following table:

| Parameter            | Description                                                                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Subscription         | Subscription for the deployment.                                                                                                                                         |
| Resource group       | Select an existing resource group or create a new one.                                                                                                                   |
| Location             | The first instance of the Location field will be  filled out automatically with the location corresponding to the resource group on your behalf.                         |
| Instance Name        | Fill out the Instance Name field to provide a name to the VM for the 128T Conductor.                                                                                     |
| Location             | As indicated in the requirements, the 128T Conductor is going to be deployed into an existing VNet. The Location field is the name of the location where such VNet exists. Please refer to the following list https://azure.microsoft.com/en-us/global-infrastructure/locations (the name of the Location field is one word and all lowercase). Example: eastus, westus, westeurope, eastasia...                                                                                                                                                                                       |
| Virtual Network Name | Name of the existing VNet where the 128T Conductor is going to be deployed to.                                                                                           |
| Control Subnet Name  | The name of the control subnet within the VNet.                                                                                                                          |
| Control Allowed CIDR | It is used to define a trusted source IP address range which represents the source IP addresses of the management interface of the 128T Routers to be managed. Connections originated from source IP addresses which are outside the range are not allowed, effectively protecting the Control Subnet. It is common to set this field to 0.0.0.0/0 (accepting traffic from all source IP addresses) for now, as the source IP addresses of the 128T Routers may not be known at this time. However, after the deployment and once these external IP addresses are known, it may be desirable to provision them explicitly in the corresponding security groups to increase the degree of security.                                                                                                |
| Instance size        | Size of the VM.                                                                                                                                                          |
| Admin Username       | The desired username to login to the VM (Linux) via SSH.                                                                                                                 |
| Admin Public Key Data| Paste in this field the SSH public key to be used to authenticate with the VM (Linux) instance via SSH. The key needs to be at least 2048-bit and in ssh-rsa format. Please find the following an example of a valid key next (To reduce the length of the key in this example multiple character have been replaced by three dots): ```ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDHwB1Qe1KndGqKuT3F...GumfdHfdasy8N0kncMtp2wtkqoLsRWdJ4/WKaZBOrPd4Q== admin@Admin-MacBook-Pro.local```. For more information about creating ssh keys see [Create SSH keys on Linux and Mac for Linux VMs in Azure](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/mac-create-ssh-keys).                                                                                                                                                                                                 |
| Admin Allowed CIDR   | It allows for restricting reachability to the control interface of the Conductor to a well known source IP address CIDR range for management purposes. It is common to set this field to 0.0.0.0/0 (accepting traffic from all source IP addresses) for now, as the source IP address/es where the Conductor will be administered from may not be known at this time. However, once the deployment completes, it is highly recommended to update the configuration of the network security group to allow only access from the source IP address/es where the 128T Conductor will be administered.                                                                                                                                                                                     |
| Certificate SASURL   | Optional field and only applicable to BYOL images. The field Certificate SAS URL is optional even when deploying a BYOL image. If the field is not set the installation of the 128T software will be interactive and will commence after logging into the instance via SSH. On the other hand, if the field is set to a SAS URL that points to a valid 128 Technology certificate then the deployment will be performed in non interactive mode, in other words, the latest version of the 128T software will be installed as part of the deployment automatically on your behalf. Please note that installing the 128T software requires additional time. While the 128T software installs SSH access to the VM instance will be disabled, and it will be enabled once the 128T software installation completes. For additional information regarding how to obtain a SAS URL for your 128 Technology certificate please refer to [Certificate SAS URL](#certificate-sas-url).                                                                                                                          |

Accept the Terms and Conditions of the deployment by ticking the box "I agree to the terms and conditions stated above".

Finally, click **Purchase** to start the deployment.

Once the deployment of the template is complete, information about the new 128T Conductor deployment is provided in the Output tab.

![Plans](/img/platforms_azure_deployment_complete.png)

The information listed in the Outputs tab is the following:
* Name of the VM instance.
* Public IP address for administration purposes.
* HTTPs URL to login to the 128T Conductor GUI. Please continue to the end of this section below for more information regarding the credentials to login.
* SSH command to login to the Linux VM. Please continue to the end of this section below for more information regarding the credentials to login.

:::important
When logging to the Linux instance via SSH make use of the username specified in the "Admin Username" field and the corresponding private key specified in the "Admin Public Key Data" field. 
When logging to the 128T application via CLI or HTTPs the username is "admin" and the password:
* For Hourly and Private images the password is the name of the VM.
* For BYOL images the password is the one that was specified during the interactive initialization process.
:::

Alternatively, it is possible to launch the template programmatically. The PowerShell commands for each 128 Technology image are shown next, please run the commands corresponding to the image you want to use:

##### <u>128 Technology Conductor (Hourly)</u>

Create the parameters file conductor_hourly.parameters.json with the following command:

```
vi conductor_hourly.parameters.json
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
    "location": {
      "value": "<location of the VNet>"
    },
    "virtualNetworkName": {
      "value": "<name of the VNet"
    },
    "controlSubnetName": {
      "value": "<name of the subnet>"
    },
    "controlAllowedCidr": {
      "value": "0.0.0.0/0"
    },
    "instanceSize": {
      "value": "Standard_DS3_v2"
    },
    "adminUsername": {
      "value": "<username>"
    },
    "adminPublicKeyData": {
      "value": "<content of ssh-rsa key>"
    },
    "adminAllowedCidr": {
      "value": "0.0.0.0/0"
    }
  }
}
```

Click [here](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/128technology.128technology_conductor_hourly) to go to the Marketplace. Click on the "Get it now" button, agree to the terms of use and privacy policy of the image, click on the "Get started" button to enable programmatic deployment for the subscription and click the button "Save" to save the changes.

![Plans](/img/platforms_azure_programmatically.png)

Close the "Configure Programmatic Deployment" window, click on the tab "Plans" and lastly copy to the clipboard the URL of the "Standalone Conductor" template located in the field "URL". Lastly launch the template running the following command:

```
New-AzResourceGroupDeployment -ResourceGroupName <your-resource-group-name> `
-TemplateUri <template-URL> `
-TemplateParameterFile ./conductor_hourly.parameters.json
```

##### <u>128T Networking Platform (BYOL)</u>

Create the parameters file conductor_byol.parameters.json with the following command:

```
vi conductor_byol.parameters.json
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
    "location": {
      "value": "<location of the VNet>"
    },
    "virtualNetworkName": {
      "value": "<name of the VNet>"
    },
    "controlSubnetName": {
      "value": "<name of the subnet>"
    },
    "controlAllowedCidr": {
      "value": "0.0.0.0/0"
    },
    "instanceSize": {
      "value": "Standard_DS3_v2"
    },
    "adminUsername": {
      "value": "<username>"
    },
    "adminPublicKeyData": {
      "value": "<content of ssh-rsa key>"
    },
    "adminAllowedCidr": {
      "value": "0.0.0.0/0"
    }
  }
}
```

Click [here](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/128technology.128t_networking_platform) to go to the Marketplace. Click on the "Get it now" button, agree to the terms of use and privacy policy of the image, click on the "Get started" button to enable programmatic deployment for the subscription and click the button "Save" to save the changes.

![Plans](/img/platforms_azure_programmatically.png)

Close the "Configure Programmatic Deployment" window, click on the tab "Plans" and lastly copy to the clipboard the URL of the "Standalone Conductor" template located in the field "URL". Lastly launch the template running the following command:

```
New-AzResourceGroupDeployment -ResourceGroupName <your-resource-group-name> `
-TemplateUri <template-URL> `
-TemplateParameterFile ./conductor_byol.parameters.json
```

#### 128T Session Smart Router

This section describes the parameters to fill out the template to deploy a 128T Session Smart Router as well as how to launch it via the portal and programmatically.

A description of the parameters of the template are listed in the following table:

| Parameter               | Description                                                                                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Subscription            | Subscription for the deployment.                                                                                                                                          |
| Resource group          | Select an existing resource group or create a new one.                                                                                                                    |
| Location                | The first instance of the Location field will be  filled out automatically with the location corresponding to the resource group on your behalf.                          |
| Instance Name           | Provide a name to the VM for the 128T Session Smart Router.                                                                                                               |
| Location                | As indicated in the requirements, the 128T Technology Router is going to be deployed into an existing VNet. The Location field is the name of the location where such VNet exists. Please refer to the following list https://azure.microsoft.com/en-us/global-infrastructure/locations (the name of the Location field is one word and all lowercase). Example: eastus, westus, westeurope, eastasia...     |
| Virtual Network Name    | Name of the existing VNet where the 128T Session Smart Router is going to be deployed to.                                                                                 |
| Avaiability Set         | Name of the existing availability set within the same resource group and region as the VNet selected above the 128 Technology Router is going to be deployed to.          |
| Public Subnet Name      | The name of the public subnet within the VNet.                                                                                                                            |
| Public Allowed CIDR     | It corresponds to the source IP CIDR range of the 128T Router/s at the data center/branch (outside the cloud) allowed to originate traffic to the public interface of the router. This field allows for defining a well defined and trusted IP address range. It is common to set this field to 0.0.0.0/0 for now, as the source IP addresses of the routers at the data center or branch (outside the cloud) are not known at this time. However, after the deployment and once these external IP addresses are known it is recommended to provision them in the corresponding security groups to increase the degree of security.             |
| Private Subnet Name     | The name of the private subnet within the VNet.                                                                                                                           |
| Private Allowed CIDR    | It corresponds to the source IP CIDR range of the internal workloads/endpoints allowed to originate traffic to the private interface of the router. This field allows for defining a well defined and trusted IP address range. By default is set to 0.0.0.0/0 to allow every workload/endpoint to communicate with the router.                                                                             |
| Management Subnet Name  | The name of the management subnet within the VNet.                                                                                                                        |
| Admin Allowed CIDR      | It allows for restricting reachability to the management interface of the router to a well known source IP address CIDR range. By default is set to 0.0.0.0/0 allowing every IP address to reach the management interface. Once the deployment completes, it is highly recommended to update the configuration of the network security group to allow only access from the source IP address/es where the 128T Session Smart Router will be administered.                                                                                                                                                                                         |
| Conductor Primary Control IP   | If a 128 Technology Conductor has already been deployed, fill out the field Conductor Primary Control IP with the IP address of the control interface of the primary node of 128 Technology Conductor. The IP address of the control interface of Conductor should be reachable from the Management subnet selected above. It must be a valid IP address of the form x.x.x.x. If no 128 Technology Conductor has been deployed yet or the intention is simply deploying an unmanaged router please refrain from entering any value in this field.                                                                                        |
| Conductor Secondary Control IP | If there is an existing 128 Technology Conductor already deployed and the deployment of the Conductor is Highly Available, please enter the IP address of the control interface of the secondary node of 128 Technology Conductor in the field Conductor Secondary Control IP. If the existing deployment of the 128 Technology Conductor is not Highly Available, in other words if the Conductor is standalone, please refrain from entering any value in this field.                                                                                                                                                                     |
| Instance size        | Select the size of the VM in the field Instance Size.                                                                                                                        |
| Admin Username       | Fill out the field Admin Username with the desired username to login to the VM (Linux) via SSH.                                                                              |
| Admin Public Key Data| Paste in the field Admin Public Key Data the SSH public key to be used to authenticate with the VM (Linux) instance via SSH. The key needs to be at least 2048-bit and in ssh-rsa format. Please find the following an example of a valid key next (To reduce the length of the key in this example multiple character have been replaced by three dots): ```ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDHwB1Qe1KndGqKuT3F...GumfdHfdasy8N0kncMtp2wtkqoLsRWdJ4/WKaZBOrPd4Q== admin@Admin-MacBook-Pro.local```. For more information about creating ssh keys, see [Create SSH keys on Linux and Mac for Linux VMs in Azure](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/mac-create-ssh-keys).                                                                                                         |

Accept the terms and conditions of the deployment ticking on the box "I agree to the terms and conditions stated above".

Lastly click on the button Purchase to start the deployment.

Once the deployment of the template completes, information of the newly 128T Session Smart Router deployment is provided in the tab Output placed at the left hand side.

![Plans](/img/platforms_azure_deployment_complete.png)

The information listed in the Outputs tab is the following:
* Name of the VM instance.
* Public IP address assigned to the management interface of the instance.
* SSH command to login to the Linux VM via the management interface.

If the IP address/es of a Conductor were provided in the template, the deployment will be non interactive as Zero Touch Provisioning (ZTP) method will be triggered. Once the VM is deployed wait for an additional 2-3 minutes for the ZTP process to initialize. Once the ZTP process is ready to start there will be an asset in Conductor waiting to be associated with the configuration of the router. Please login to Conductor via HTTPs and associate the pending asset to the desired configuration suited for the newly deployed router.

If no IP address/es of a Conductor were provided an unmanaged router will be deployed, initialized, and ready to be configured, in this case proceed to login to the router via SSH.

:::important
When logging to the Linux instance via SSH make use of the username specified in the "Admin Username" field and the corresponding private key specified in the "Admin Public Key Data" field.
When logging to the 128T application via CLI or HTTPs the username is "admin" and the password will be:
* For Hourly and Private images the password is the name of the VM.
* For BYOL images the password is the one that was specified during the interactive initialization process.
:::

Alternatively, it is possible to launch the template programmatically. The PowerShell commands for each 128 Technology image are shown next, please run the commands corresponding to the image you want to use:

##### <u>128T Session Smart Router (Hourly)</u>

Create the parameters file router_hourly.parameters.json with the following command:

```
vi router_hourly.parameters.json
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
    "conductorPrimaryControlIP": {
      "value": "<IP address of primary node of Conductor>"
    },
    "conductorSecondaryControlIP": {
      "value": "<IP address of secondary node of Conductor>"
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

Click [here](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/128technology.128technology_router_100_hourly) to go to the Marketplace. Click on the "Get it now" button, agree to the terms of use and privacy policy of the image, click on the "Get started" button to enable programmatic deployment for the subscription and click the button "Save" to save the changes.

![Plans](/img/platforms_azure_programmatically.png)

Close the "Configure Programmatic Deployment" window, click on the tab "Plans" and lastly copy to the clipboard the URL of the "Session Smart Router" template located in the field "URL". Lastly launch the template running the following command:

```
New-AzResourceGroupDeployment -ResourceGroupName <your-resource-group-name> `
-TemplateUri <template-URL> `
-TemplateParameterFile ./router_hourly.parameters.json
```

##### <u>128T Networking Platform (BYOL)</u>

Create the parameters file conductor_byol.parameters.json with the following command:

```
vi router_byol.parameters.json
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
    "conductorPrimaryControlIP": {
      "value": "<IP address of primary node of Conductor>"
    },
    "conductorSecondaryControlIP": {
      "value": "<IP address of secondary node of Conductor>"
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

Click [here](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/128technology.128t_networking_platform) to go to the Marketplace. Click on the "Get it now" button, agree to the terms of use and privacy policy of the image, click on the "Get started" button to enable programmatic deployment for the subscription and click the button "Save" to save the changes.

![Plans](/img/platforms_azure_programmatically.png)

Close the "Configure Programmatic Deployment" window, click on the tab "Plans" and lastly copy to the clipboard the URL of the "Session Smart Router template" located in the field "URL". Lastly launch the template running the following command:

```
New-AzResourceGroupDeployment -ResourceGroupName <your-resource-group-name> `
-TemplateUri <template-URL> `
-TemplateParameterFile ./router_byol.parameters.json
```

### Certificate SAS URL

A SAS URL can be used to perform a deployment of a 128 Technolody Conductor using the 128T Networking Platform image. It allows for a non interactive installation of the 128T Conductor fully automated and on your behalf as part of the deployment process. This section describes how a SAS URL for your 128 Technology certificate is created.

:::important
This section only applies when deploying a 128 Technology Conductor using the 128T Networking Platform image and the "Standalone Conductor" template.
:::

The first step to create a SAS URL is to login to the [Azure Portal](https://portal.azure.com) and in the search bar at the top search for "Storage accounts" as shown in the following picture:

![Storage](/img/platforms_azure_storage.png)

Create a storage account. Click on the storage account once created. Click on "Containers" as shown in the following picture:

![Storage containers](/img/platforms_azure_containers.png)

Create a container with a public access level set to "Private (no anonymous access)". Click on the container once created. Click on the "Upload" button, select your 128 Technology certificate and click the "Upload" button. Once your 128 Technology certificate is uploaded click on it. Click on the "Generate SAS" tab as shown below:

![Container overview](/img/platforms_azure_container_overview.png)

Make sure the field "Permissions" is set to "Read", and set a narrow start and expiry date/time in which the installation of the 128T Conductor is going to take place. Next click the button "Generate SAS token and URL". The SAS URL value will appear in the field "Blob SAS URL". Proceed to copy the value of the field "Blob SAS URL" using the copy copy to clipboard function placed at the end of the field as show in the following screenshot:

![SAS URL](/img/platforms_azure_sasurl_clipboard.png)

Now you can proceed to deploy the 128T Conductor in non interactive mode using the template "Standalone Conductor" of the 128T Networking Platform BYOL image. Once the Conductor is operational please remember to delete your 128 Technology certificate from the storage account and container to prevent and avoid any misuse.
