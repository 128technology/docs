---
title: Site Assignment
sidebar_label: Site Assignment
---

After the SSR has been onboarded to the Mist Cloud, assign it to a site to begin managing the device configuration and gathering data in Mist. 

In the Mist Inventory panel the new router shows as "Unassigned".

1. Select the new router from the inventory.

	![Inventory](/img/wan_site_assign1.png)

2. From the **More** dropdown list, select **Assign to site**.
	
	![Assign to Site](/img/wan_site_assign2.png)

3. Select the site from from the **Site** list. If you are onboarding a **conductor-managed device, do not select Manage Configuration from Mist** under Manage Configuration. This allows the device to reach out to the conductor IP address specified when the site was created to receive configuration information.

	![Site List](/img/wan_site_assign3_nomist.png)

4. If you are onboarding a **Mist-managed device** (using SSR 6.0 software) select **Manage Configuration from Mist** under Manage Configuration. If this is not selected, the router will not be managed by Mist. 

	![Managed by Mist](/img/wan_site_assign4.png)

5. Click **Assign to Site**.  

The site assignment takes a few minutes. Once the site has been fully onboarded, use the Mist WAN Edge - Device View to access the router, and the Insights view to see events and activity. 

![WAN Edge Insights](/img/wan_site_assign5.png)
