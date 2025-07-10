---
title: Initialize Your Device - Web Workflow
sidebar_label: Initialize Your Device - Web Workflow
---

This is the part where configuring your device gets really easy!

<!-- markdown-link-check-disable -->
As a first step, connect your laptop or other device to any of the designated LAN ports and connect to https://192.168.128.1 to access the SSR onboarding UI.
<!-- markdown-link-check-enable -->

:::note
The laptop or other client device must be assigned a static IP address within the range of `192.168.128.2` to `192.168.128.254` along with a subnet mask of `/24` or `255.255.255.0`.
:::

Using your browser, choose the workflow below that best suits your needs:

Installing a Conductor-managed network? Start with [Initialize a Conductor](#initialize-a-conductor), then [Initialize a Conductor-managed Router](#initialize-a-conductor-managed-router).

Onboarding your device to Mist? Start with [Initialize a Mist-managed Router](#initialize-a-mist-managed-router).

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
 - Admin and system accounts password
 - Artifactory username and password (if available)

 ![Conductor Association](/img/u-iso9_define_conductor.png)

:::note
Setting the password for the system accounts (`admin`, `root`, and `t128`) is performed during initialization from either the web interface or the conductor command line. All system account passwords are set to the same value.
:::

3. Click **ASSOCIATE**

4. The device reboots and comes online as a Conductor.

5. To initialize the second conductor of an HA Pair, select **HA NODE 1**, and select the address type (DHCP or STATIC). Enter the following information:

	- Conductor name
	- Node IP Address (Static)
	- Node Gateway (Static)
	- Interface Name (Static)
	- DNS Server address (Optional)
	- Admin and system account passwords
	- Artifactory username and password (if available)

 ![HA Conductor Association](/img/u-iso9a_ha_conductor1.png)

5. Click **ASSOCIATE** when you have completed the required information. The device reboots and comes online as the second Conductor.

For information about deploying and configuring a conductor, see [Conductor Deployment](bcp_conductor_deployment.md) and [Import Configurations to the Conductor](single_conductor_config.md). Otherwise, continue with [Initialize a Conductor-Managed Router](#initialize-a-conductor-managed-router).

## Initialize a Conductor-Managed Router

Use the following process to initialize your device as a Conductor-managed router.
1. Select **SSR Router Managed via Conductor** under SSR Managed.

  ![SSR Conductor-managed router](/img/u-iso10_cond-mngd_router.png)

2. Enter the router name, the associated Conductor IP address, and the Admin and system account passwords.

  ![Conductor Managed Association](/img/u-iso11_cond-mngd-assoc-new.png)

3. Click **ASSOCIATE** when you have completed the required information.

The Router will onboard itself to the Conductor. Router configuration is performed from the Conductor. See [Basic Router Configuration](intro_basic_router_config.md) for more information.

## Initialize a Mist-Managed Router

There are two ways to initialize a Mist-managed router; selecting the Mist organization and adopting the router through the Mist UI, or entering the Mist registration code.

You can use either of the following processes to initialize your device as a Mist-managed router.

### Mist Organization Selection

1. Select Mist Organization Selection under **Mist Cloud Managed**.

  ![Mist Org Selection](/img/u-iso12_select_mist_managed.png)

2. Enter your login credentials to log in to Mist.

  ![Login to Mist](/img/u-iso13_mist_login.png)

3. Select the Organization, and enter the router name.

   ![Select Org](/img/u-iso14_assign-org-name.png)

4. Click **ADOPT**. The router information is displayed on the SSR GUI. Your router is adopted into your Mist Organization, and is now available in your inventory ready to be [assigned to a site](#mist-site-assignment).

  ![Mist-Managed](/img/u-iso14a_assign-org-name.png)

### Mist Registration Code

1. Select Mist Registration Code under **Mist Cloud Managed**.

![Select Mist Registration Code](/img/u-iso18_mist_reg_code1.png)

2. Enter your Mist Registration Code for your organization. If you do not have your registration code, refer to the steps below.

![Enter Mist Registration Code](/img/u-iso19_mist_reg_code1.png)

3. Click **ADOPT**. Your router is adopted into your Mist Organization, and is now available in your inventory ready to be [assigned to a site](#mist-site-assignment).

#### Retrieve the Mist Registration Code

Use the following procedure to retrieve the Mist registration code from your Mist Organization.

1. Using a separate browser, log in to your Mist Organization.

2. From the Mist menu on the left, select **Organization > Inventory**.

	![Inventory Menu](/img/wan_inventory.png)

3. In the Inventory panel, click on the **WAN Edge** selection on the top of the screen.

  ![Inventory panel](/img/wan_inventory_panel.png)

4. Click on the **Adopt WAN Edges** button in the top right corner. The WAN Edge Adoption dialog appears, displaying the registration code.

  ![WAN Edge Adoption](/img/wan_registration_code.png)

5. Click on **Copy to Clipboard**.

6. Return to the **Initialization page** and paste the registration code into the Registration Code field.

### Mist Site Assignment

1. Log into your Mist Organization.

2. Once you are in your Mist Organization, select Organization from the left side menu, and then select Inventory.

  ![Mist Inventory](/img/u-iso15a_router-in-mist.png)

3. On the Inventory list for the Organization, select the newly installed router.

4. Use the **Site** dropdown and select **Assign To Site**.

  ![Mist Inventory](/img/u-iso15_router-in-mist.png)

5. Place a check in the **Manage configuration with Mist** checkbox.

  ![Assign to site](/img/u-iso17_assign_wan_edges.png)

6. Click **Assign to Site**.

The router is now assigned to the selected site, and managed by Mist.

