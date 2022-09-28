---
title: Site Assignment
sidebar_label: Site Assignment
---

Once the onboarding process is complete, each router is displayed on the Mist Inventory page under **Organization > Inventory**. The next step is to assign it to a site and begin gathering data in Mist. 

In the Mist Inventory panel the new router shows as "Unassigned".

1. Select the new router from the inventory.

    ![Inventory](/img/wan_site_assign1.png)

2. From the **More** dropdown list, select **Assign to site**.
    
    ![Assign to Site](/img/wan_site_assign2.png)

3. Select the site from from the **Site** list. 

    ![Site List](/img/wan_site_assign3_nomist.png)


4. For conductor-managed routers (SSR Software version 5.4.x to 6.x) Make sure there is **no** checkmark in the **Manage Configuration from Mist** under **Manage Configuration**. This informs the device to reach out to the conductor IP address specified when the site was created to receive configuration information.

    If you are configuring a **Mist-managed** router (SSR Software version 6.x and above) place a checkmark in the **Manage Configuration from Mist** box.

5. Click **Assign to Site**.  

Once the site assignment is complete, the information is relayed back to the corresponding SSR router, and the router begins streaming the telemetry data to the cloud. See [Features](wan_telemetry_features.md) for more information.
