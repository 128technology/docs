---
title: Site Assignment
sidebar_label: Site Assignment
---

Once the SSR onboarding process is complete, each router is displayed on the Mist Inventory page under **Organization > Inventory**. The next step is to assign it to a site and begin gathering data in Mist. 

In the Mist Inventory panel the new router shows as "Unassigned".

1. Select the new router from the inventory.

    ![Inventory](/img/wan_site_assign1.png)

2. From the **More** dropdown list, select **Assign to site**.
    
    ![Assign to Site](/img/wan_site_assign2.png)

3. Select the site from from the **Site** list. Make sure there is **no** checkmark in the **Manage Configuration from Mist** under **Manage Configuration**. This informs the device to reach out to the conductor IP address specified when the site was created to receive configuration information.

    ![Site List](/img/wan_site_assign3_nomist.png)

5. Click **Assign to Site**.  

### Events and Activity

Once the site assignment is complete, the information is relayed back to the corresponding SSR router, and the router begins streaming the telemetry data to the cloud. 

To view the events and activity on the fully onboarded device:

- Select WAN Edges from the sidebar. 
- From the Site dropdown, choose the site where the SSR is assigned, and select the SSR.
    
    ![Site Dropdown](/img/wan_site_assign5a.png)

- From the Site panel, choose WAN Edge Insights. 
    
    ![Link to WAN Edge Insights](/img/wan_site_assign5b.png)

    ![WAN Edge Insights](/img/wan_site_assign5.png)
