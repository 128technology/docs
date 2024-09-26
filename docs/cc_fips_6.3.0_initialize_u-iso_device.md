---
title: Initialize Your Device - Web Workflow
sidebar_label: Initialize Your Device - Web Workflow
---

This is the part where configuring your device gets really easy! Use the GUI to initialize the device as a [Conductor](#initialize-a-conductor), a [Conductor-managed Router](#initialize-a-conductor-managed-router), or a [Mist-managed Router](#initialize-a-mist-managed-router). Use a browser to navigate to your conductor and begin the initialization.  

![U-ISO Device Selection GUI](/img/u-iso8_launch_gui.png)

## Initialize a Conductor

Use the following process to initialize your device as a Conductor.

1. Select **SSR Conductor** under SSR Managed.

  ![SSR Conductor](/img/u-iso8a_initialize_conductor.png)

2. To initialize a standalone conductor, select **STANDALONE**. To initialize the first conductor of an HA pair, select **HA NODE 0**. Select the address type (DHCP or STATIC). 

:::note
In an HA configuration, **HA NODE 0** must always be configured before HA NODE 1. Configuring Node 1 first prevents Node 0 from starting.
:::

Enter the following information: 
 
	- Conductor name
	- Node IP Address (Static)
	- Node Gateway (Static)
	- Interface Name (Static)
	- DNS Server address (Optional)
	- Artifactory username and password (if available)

 ![Conductor Association](/img/u-iso9_define_conductor.png)

3. Click **ASSOCIATE** 

4. The device reboots and comes online as a Conductor.

5. To initialize the second conductor of an HA Pair, select **HA NODE 1**, and select the address type (DHCP or STATIC). Enter the following information:

	- Conductor name
	- Node IP Address (Static)
	- Node Gateway (Static)
	- Interface Name (Static)
	- DNS Server address (Optional)
	- Artifactory username and password (if available)

 ![HA Conductor Association](/img/u-iso9a_ha_conductor.png)

5. Click **ASSOCIATE** when you have completed the required information. The device reboots and comes online as the second Conductor.

## Initialize a Conductor-Managed Router

To initialize your device as a Conductor-managed router, and incorporate `ssh-only` and Strict Hostkey Checking, use the following procedure. 

1. From the SSR initialization page, select the **Or, login locally** link at the bottom of the page.

  ![SSR Local Login](/img/u-iso_com-crit_6.3.0_local-login.png)

2. Enter the your login credentials. 

3. Use the [**Quickstart Procedure**](cc_fips_6.3.0_quickstart_otp.md) and file to configure `ssh-only` and Strict Hostkey checking on the router.  

 



