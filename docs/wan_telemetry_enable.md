---
title: Enable WAN Assurance Telemetry
sidebar_label: Enable WAN Assurance Telemetry
---

- Create an Organization (if needed)
- Create a Site
- Acquire the Registration Code

Once these steps are complete, all connected routers will automatically self-onboard to the Mist cloud. 

## Enable WAN Assurance on the Conductor

If you do not have an account on the [Mist portal](https://manage.mist.com/), create one now.

### Create an organization for the authority.

1. From the Mist menu on the left, select **Organization**, and select **Settings** from the menu.

    ![Organization Settings](/img/wan_org_settings.png)

2. In the Create Organization panel, enter a name for the Organization.

    ![Organization Panel](/img/wan_create_org.png)

    For additional information about creating an Organization, please refer to the Mist [Organization Configuration documentation](https://www.mist.com/documentation/category/organization-config/).

### Create a Site

Create a unique site for each physical (or logical) location in the network. For example, the spoke and hub should be onboarded to different sites. Other devices from the Juniper stack such as Mist APs, Switches, SRX, etc., should be onboarded and assigned to the same site as the SSR when possible. This provides a clean topology view of all devices running within a site.

For detailed information about the fields used to create a site, please refer to the Mist [Site Configuration documenation](https://www.mist.com/documentation/category/site-configuration/).

1. From the Mist menu on the left, select **Organization** and select **Site Configuration** from the menu.

    ![Site Configuration](/img/wan_org_site_config.png)

2. In the Sites List, click on the **Create Site** button.

    ![Site Button](/img/wan_create_site_button.png)

3. Use the New Site panel to configure a site.

    ![New Site Panel](/img/wan_new_site.png)

#### Conductor IP Address

Configure the IP address of the conductor as part of the site creation. Use the following procedure to retrieve and assign the conductor IP address to the Mist site. 

1.  On the Configuration Home panel in the SSR GUI, click the Authority button. 

    ![Authority Home](/img/wanas_conductor_ip1.png)

2. Under Authority Settings, scroll down to **Conductor Addresses** and copy the IP address of the conductor.

    ![Conductor Address](/img/wanas_conductor_ip.png)

3. Return to the Mist Site Configuration, and scroll down to the Session Smart Conductor field and add the Conductor IP address.

    ![Session Smart Conductor Address](/img/wanas_conductor_ip_mist.png)

### Registration Code

The organization registration code is used by the SSR devices to automatically onboard into the Mist cloud. Use the following procedure to access the registration code for the organization.

1. From the Mist menu on the left, select **Organization > Inventory**.

    ![Inventory Menu](/img/wan_inventory.png)

2. In the Inventory panel, click on the **WAN Edge** selection on the top of the screen.

    ![Inventory panel](/img/wan_inventory_panel.png)

3. Click on the Adopt WAN Edges button in the top right corner. The WAN Edge Adoption dialog appears, displaying the registration code.

    ![WAN Edge Adoption](/img/wan_registration_code.png)

4. Click on **Copy to Clipboard**.

The Registration code can be added to the SSR using either the PCLI or the GUI.

5. Return to the SSR GUI and login to the conductor PCLI.

6. Paste the registration code into the PCLI.

```
    admin@node1.conductor1# configure authority mist-wan-assurance registration-code eyJ0eX
    AiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmdfaWQiOiIwYzE2MGI3Zi0xMDI3LTRjZDEtOTIzYi03NDQ1MzRj
    NGIwNzAiLCJzdmMiOiIxMjhyb3V0ZXIiLCJwcm92aWRlciI6ImF3cyIsImVudiI6InN0YWdpbmciLCJlcHRlcm1
    fdXJsIjoid3NzOi8vZXAtdGVybWluYXRvci1zdGFnaW5nLm1pc3RzeXMubmV0L3dzIiwiaWF0IjoxNjIyNzQ2MT
    c1LAiOjE2NTQyODIxNzV9.iBul1W1nk!3JyTd98jUoVFZrZet7ElvPQdsCdDFfAN0
    admin@node1.conductor1#
    *admin@node1.conductor1#
    *admin@node1.conductor1#
    *admin@node1.conductor1# compare config running candidate
```

To enter the registration code in the SSR GUI, copy the text registrationcode from the Mist portal (info above) and paste it under **Configuration > Authority > Mist WAN Assurance > Registration Code**.

![Registration Code Field](/img/wan_telemetry_regcode.jpg)

:::note
If you are onboarding a whitebox SSR - a non-Juniper appliance - running SSR software, the Onboarding Mode should be set to *brownfield* as shown in the example above. If you are onboarding a Juniper SSR appliance, the Onboarding Mode should be set to *greenfield*. 
:::

Committing the registration code enables WAN Assurance on all connected routers. If you only want WAN Assurance enabled on certain routers, please refer to [Skipping Specific Routers](#skipping-specific-routers) before committing the registration code information to the configuration.

7. Click **Commit** in the upper right corner of the GUI to commit the registration code.

### Onboard Routers

Once a valid registration code is committed, registration is automatic. The conductor sends instructions to all connected routers to self-onboard to the Mist cloud. The process is automated and the routers do not require any user interaction.

#### Skipping Specific Routers

A router or routers can be skipped during the Mist onboarding process. Change *authority > router > mist-wan-assurance > enabled* to `false`. The Conductor will skip the router and associated nodes (if it is an HA router).

For a system that has completed the onboarding process, setting `mist-wan-assurance` to `false` will prevent telemetry data from being sent to the cloud.

:::note
Disabling WAN Assurance does not automatically release the router from the cloud. See [Releasing a Router](wan_telemetry_troubleshooting.md#releasing-a-router) for more information.
:::


