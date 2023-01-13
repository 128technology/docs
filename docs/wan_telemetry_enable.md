---
title: Create a Site
sidebar_label: Create a Site
---

- Create an account on the Mist portal
- Add your Organization
- Create a Site

## Create an Account

Create an account on the [Mist portal](https://manage.mist.com/).

## Create an Organization

1. From the Mist menu on the left, select **Organization**, and select **Settings** from the menu.

    ![Organization Settings](/img/wan_org_settings.png)

2. In the Create Organization panel, enter a name for the Organization.

    ![Organization Panel](/img/wan_create_org.png)

    For additional information about creating an Organization, please refer to the Mist [Organization Configuration documentation](https://www.mist.com/documentation/category/organization-config/).

## Create a Site

Create a unique site for each physical (or logical) location in the network. For example, the spoke and hub should be onboarded to different sites. Other devices from the Juniper stack such as Mist APs, Switches, SRX, etc., should be onboarded and assigned to the same site as the SSR when possible. This provides a clean topology view of all devices running within a site.

For detailed information about the fields used to create a site, please refer to the Mist [Site Configuration documenation](https://www.mist.com/documentation/category/site-configuration/).

1. From the Mist menu on the left, select **Organization** and select **Site Configuration** from the menu.

    ![Site Configuration](/img/wan_org_site_config.png)

2. In the Sites List, click on the **Create Site** button.

    ![Site Button](/img/wan_create_site_button.png)

3. Use the New Site panel to configure a site.

    ![New Site Panel](/img/wan_new_site.png)

### Conductor IP Address

Configure the IP address of the conductor as part of the site creation. Use the following procedure to retrieve and assign the conductor IP address to the Mist site. 

1.  On the Configuration Home panel in the SSR GUI, click the Authority button. 

    ![Authority Home](/img/wanas_conductor_ip1.png)

2. Under Authority Settings, scroll down to **Conductor Addresses** and copy the IP address of the conductor.

    ![Conductor Address](/img/wanas_conductor_ip.png)

3. Return to the Mist Site Configuration, and scroll down to the Session Smart Conductor field and add the Conductor IP address.

    ![Session Smart Conductor Address](/img/wanas_conductor_ip_mist.png)


:::


