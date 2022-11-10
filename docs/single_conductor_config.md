---
title: Configure the Conductor
sidebar: Configure the Conductor
---
 
The Conductor manages the SSR Routers you configure within the same Authority. It offers centralized administration, provisioning, monitoring, analytics, and lifecycle management of the SSR routers. 

Network configuration is provisioned on the conductor and pushed out to the routers. This can be done in the following ways:

- Existing SSR configurations imported to the conductor. 
- Non-SSR network configurations imported to the conductor; however these may need to be reviewed and revised to fit SSR conventions.
- [Configuration templates created](config_templates.md) in the SSR software and imported to the conductor.
- Network configuration manually created on the conductor after installation. 

### Import Configurations

1. Export the configuration of your existing network. Place that configuration into the `/etc/128technology/config-exports` directory on the SSR.
2. From the SSR PCLI execute the `import-config <filename>` command to import the configuration onto the conductor as a candidate config.
	From the SSR GUI, select **Import/Export** from the Configuration menu on the left panel.
	Click the **Apply** icon for the desired configuration file. 
3. Once this operation has completed, `commit` the configuration to make it the running config. Any errors or conflicts will be noted and must be resolved before the commit succeeds. Once any errors are resolved, the config is available to update any connected routers. 

### Initial Manual Configuration

Use the steps below to complete a base configuration of the Conductor.

#### Name the Authority
1. Log in to the GUI for your Conductor.
2. Select **Configuration**.
3. Select Authority and change the Authority Name to a unique identifier for your system.
4. Select VALIDATE and then COMMIT.

#### Create a Service
The *service* configuration element is the cornerstone of the SSR data model. It is what allows administrators to describe eligible destinations for traffic, and subsequently define access controls, routing policy, and traffic treatment. 

Each IP destination that will receive traffic must be configured as a *service*. A service can be defined as broadly as a netmask or as specific as a transport protocol and single port. This example creates a service representing the entire internet, as 0.0.0.0/0.

1.	Log in to the Conductor GUI.
2.	Select Configuration.
3.	Scroll down to Services.
4.	Select ADD next to Services.
5.	Name the service *internet*, and select SAVE.
6.	On the **Service** screen, verify that **Enabled** is set to *true*.
7.  Set **Scope** to *public*.
8.  Scroll down to Service Addresses and select ADD.
9.  Enter the IP address 0.0.0.0/0, and select SAVE.
10. At the top of the screen, select VALIDATE and then COMMIT. 

For a more in-depth look at Services, please see [Service and Service Policy Design](bcp_service_and_service_policy_design.md).

For more information about configuring and deploying conductors, please see [Conductor Deployment](bcp_conductor_deployment.md).

