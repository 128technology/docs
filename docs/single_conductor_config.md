---
title: Import Configurations to the Conductor
sidebar: Import Configurations to the Conductor
---
 
The Conductor manages the SSR Routers you configure within the same Authority. It offers centralized administration, provisioning, monitoring, analytics, and lifecycle management of the SSR routers. 

Network configuration is provisioned on the conductor and pushed out to the routers. This can be done in the following ways:

- Existing SSR configurations imported to the conductor. 
- [Configuration templates created](config_templates.md) in the SSR software and imported to the conductor.
- Network configuration manually created on the conductor after installation. 

## Import Configurations

Configurations can be imported using either the GUI or the PCLI.

### Using the SSR GUI:

1. From the Configuration menu on the left, select **Import/Export**.

![Config Import Menu](/img/conductor_config_import_gui.png)

2. Available configurations are listed on the Import/Export Configuration screen. Select the **Apply** icon for the configuration you wish to import. 

![Import Export List](/img/conductor_config_import_gui2.png)

3. Click the Apply button on the instruction window.

![Apply Config Instructions](/img/conductor_config_import_gui3.png)

4. The imported configuration is added as the running config, and must be manually committed using the **COMMIT** button on the GUI. The list of changes **Ready to Commit** are shown on the bottom right of the GUI. 

![Commit Button](/img/conductor_config_import_gui3a.png)

![Ready to Commit](/img/conductor_config_import_gui4.png)

### Using the SSR PCLI:

1. Export the configuration of your existing network. Place that configuration into the `/etc/128technology/config-exports` directory on the SSR.
2. From the SSR PCLI execute the `import-config <filename>` command to import the configuration onto the conductor as a candidate config.
	From the SSR GUI, select **Import/Export** from the Configuration menu on the left panel.
	Click the **Apply** icon for the desired configuration file. 
3. Once this operation has completed, `commit` the configuration to make it the running config. Any errors or conflicts will be noted and must be resolved before the commit succeeds. Once any errors are resolved, the config is available to update any connected routers. 

## Initial Manual Configuration

Manual configurations are created on the conductor, using either the GUI or the PCLI. To understand this process, refer to [Configuration Management on the SSR](config_basics.md) as a starting point. 

