---
title: Initialize Your Device
sidebar_label: Initialize Your Device
---

Use the GUI to initialize the device as a Conductor, a Conductor-managed Router, or a Mist-managed Router. 

![U-ISO Device Selection GUI](/img/u-iso8_launch_gui.png)

### Initialize a Conductor

Use the following process to initialize your device as a Conductor.

1. Select **SSR Conductor** under SSR Managed.

  ![SSR Conductor](/img/u-iso8a_initialize_conductor.png)

2. To initialize a single conductor, or the first conductor of an HA pair, enter the node name, the Conductor name, and user name and password, and click **ASSOCIATE**.

 ![Conductor Association](/img/u-iso9_define_conductor.png)

  To initialize the second conductor of an HA Pair, enter the information as above, but also select the checkboxes for **Existing HA Peer** and **Learn from HA Peer**. 

  ![HA Conductor Association](/img/u-iso9a_ha_conductor.png)

3. Click **ASSOCIATE** when you have completed the required information. 

The Conductor is now available in the Configuration. You must commit the configuration changes from the SSR GUI.

### Initialize a Conductor-Managed Router

Use the following process to initialize your device as a Conductor-managed router.
1. Select **SSR Router Managed via Conductor** under SSR Managed.

  ![SSR Conductor-managed router](/img/u-iso10_cond-mngd_router.png)

2. Enter the router name and the associated Conductor IP address.

  ![Conductor Managed Association](/img/u-iso11_cond-mngd-assoc.png)

3. Click **ASSOCIATE** when you have completed the required information. 

The Router will onboard itself to the Conductor. You must commit the configuration changes from the SSR GUI.

### Initialize a Mist-Managed Router

Use the following process to initialize your device as a Mist-managed router.

1. Select Mist Organization Selection under **Mist Cloud Managed**. 

  ![Mist Org Selection](/img/u-iso12_select_mist_managed.png)

2. Enter your login credentials to log in to Mist.

  ![Login to Mist](/img/u-iso13_mist_login.png)

3. Select the Organization, and enter the router name.

   ![Select Org](/img/u-iso14_assign-org-name.png)

4. Click Adopt. The router information is displayed on the SSR GUI.

  ![Mist-Managed](/img/u-iso14a_adopted_router.png)

5. Log into your Mist Organization.

6. Once you are in your Mist Organization, select Organization from the left side menu, and then select Inventory.

7. On the Inventory list for the Organization, select the newly installed router.

  ![Mist Inventory](/img/u-iso15_router-in-mist.png)

8. Use the More... dropdown and select Assign To Site. 

  ![More dropdown](/img/u-iso16_inventory_more_dropdown.png)

9. Select the Site, and click Assign to Site.

  ![Assign to site](/img/u-iso17_assign_wan_edges.png)

The router is now available in your inventory, assigned to the selected site. 