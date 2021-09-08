---
title: Configuring WAN Assurance
sidebar_label: Configuring WAN Assurance
---

Use the following process to onboard Session Smart Routers (SSR) to the MIST cloud. Since SSN software can run on any certified hardware or virtual machine, this process relies on an on-premise conductor to assist in the onboarding. 

:::important
Configuring WAN Assurance requires Administrator level privileges on all platforms, SSR and MIST. 
:::

High Level Steps:
- Create an account on the MIST portal.
- Add your Organization.
- Create Sites.
- Register the Conductor with Mist.
- Assign routers to a Site.

## Enable WAN Assurance on the Conductor

This procedure assumes you do not already have an account, organization, or sites configured on the Mist portal. These items are required for SSR/Mist Wan Assurance.

1. Create an account on the [MIST portal](https://integration.mistsys.com/). 

2. Create an organization for the authority. 

- From the Mist menu on the left, select **Organization**, and select **Settings** from the menu.

    ![Organization Settings](/img/wan_org_settings.png)

- In the Create Organization panel, enter a name for the Organization. 

    ![Organization Panel](/img/wan_create_org.png)

    For additional information about creating an Organization, please refer to the Mist [Organization Config documentation](https://www.mist.com/documentation/category/organization-config/).

3. Create one Site for each physical location for on-boarding 128T SSRs. 

    Create a unique site for each physical (or logical) location in the network. For example, the spoke and hub should be onboarded to different sites. Other devices from the Juniper stack such as MIST APs, Switches, SRX, etc., should be onboarded and assigned to the same site as the SSR when possible. This provides a clean topology view of all devices running within a site.
    
- From the Mist menu on the left, select **Organization** and select **Site Configuration** from the menu.

    ![Site Configuration](/img/wan_org_site_config.png)

- In the Sites List, click on the **Create Site** button.

    ![Site Button](/img/wan_create_site_button.png)

- Use the New Site panel to configure a site. 

    ![New Site Panel](/img/wan_new_site.png)
    
    For information about the fields used to create a site, please refer to the Mist [Site Configuration documenation](https://www.mist.com/documentation/category/site-configuration/). 

4. Access the registration code for the organization. 

- From the Mist menu on the left, select **Organization > Inventory**.

    ![Inventory Menu](/img/wan_inventory.png)

- In the Inventory panel, click on the **Gateways** selection on the top of the screen.

    ![Inventory panel](/img/wan_inventory_panel.png)

- Click on the Adopt Gateways button in the top right corner. The Gateway Adoption dialog appears, displaying the registration code.

    ![Gateway Adoption](/img/wan_registration_code.png)

- Click on **Copy to Clipboard**. 

5. Return to the SSR and login to the conductor PCLI as an admin. 

6. Paste the registration code into the PCLI. 

```
    admin@node1.conductor1# configure authority mist-wan-assurance registration-code eyJ0eX
    AiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmdfaWQiOiIwYzE2MGI3Zi0xMDI3LTRjZDEtOTIzYi03NDQ1MzRj
    NGIwNzAiLCJzdmMiOiIxMjhyb3V0ZXIiLCJwcm92aWRlciI6ImF3cyIsImVudiI6InN0YWdpbmciLCJlcHRlcm1
    fdXJsIjoid3NzOi8vZXAtdGVybWluYXRvci1zdGFnaW5nLm1pc3RzeXMubmV0L3dzIiwiaWF0IjoxNjIyNzQ2MT
    c1LCJleHAiOjE2NTQyODIxNzV9.iBul1W1nk!3JyTd98jUoVFZrZet7ElvPQdsCdDFfAN0
    admin@node1.conductor1#
    *admin@node1.conductor1#
    *admin@node1.conductor1#
    *admin@node1.conductor1# compare config running candidate
```

To enter the registration code in the SSR GUI, copy the text registration-code from the MIST portal (info above) and paste it under **Configuration > Authority > Mist WAN Assurance > Registration Code**.
    
```
    config
    
        authority
    
            mist-wan-assurance
                registration-code  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmdfaWQiOiIwYzE2MGI3Zi0xMDI3LTRjZDEtOTIzYi03NDQ1MzRjNGIwNzAiLCJzdmMiOiIxMjhyb3V0ZXIiLCJwcm92aWRlciI6ImF3cyIsImVudiI6InN0YWdpbmciLCJlcHRlcm1fdXJsIjoid3NzOi8vZXAtdGVybWluYXRvci1zdGFnaW5nLm1pc3RzeXMubmV0L3dzIiwiaWF0IjoxNjIyNzQ2MTc1LCJleHAiOjE2NTQyODIxNzV9.iDobxHQzKZkJyTd98jUoVFZrZet7ElvPQdsCdDFfAN0
            exit
        exit
    exit
    
    *admin@node1.conductor1#
    
```
Committing the registration code enables WAN Assurance on all connected routers. If you only want WAN Assurance enabled on certain routers, please refer to [Skipping Specific Routers](#skipping-specific-routers) before committing the registration code information to the configuration.

7. Commit the registration code to the configuration.

### On-Boarding Routers

Once a valid registration code is committed, registration is automatic. The conductor sends instructions to all connected routers to self-onboard to the MIST cloud. The  process is automated and the routers do not require any user interaction.

### Skipping Specific Routers

A router or routers can be skipped during the Mist On-boarding process. Change *authority > router > mist-wan-assurance > enabled* to `false`. The Conductor will skip the router and associated nodes (if it is an HA router).

For a system that has completed the on-boarding process, setting `mist-wan-assurance` to `false` will prevent telemetry data from being sent to the cloud. 

:::note
Disabling WAN Assurance does not automatically release the router from the cloud. See Releasing a Router for more information.
:::

### Site Assignment (MIST)

Once the SSR/128T portion of the onboarding process is complete, each router is displayed on the MIST inventory page under **Organization > Inventory**. Select Gateways on the top of the page to see a list of the routers and status. The router is listed as Unassigned, and must be assigned to the appropriate site.

:::note
Sites must have already been created - there is no option to create a site in the drop down.
:::

1. Select the Unassigned router.
2. Click on the **More** drop down on the upper right corner.
3. Select **Assign to Site**.
4. In the Assign Gateway dialog, select the appropriate site from the drop down.
5. Click on **Assign to Site**.

Once the site assignment is complete, the information is relayed back to the corresponding 128T router, and the router begins streaming the telemetry data to the cloud.

## SSR WAN Assurance Features

### Topology Mapping

The SSR can be configured to receive LLDP packets from LAN interfaces. This information is useful for creating a local site level topology view. Use the following code example to enable the LLDP receive mode on LAN interfaces.

`configure authority router <router> node <node> device-interface <lan-intf> lldp mode receive-only`

### Gateway Insights

Once on-boarding is complete, the router begins streaming telemetry data. Data appears on the MIST portal after approximately 15 minutes. The Gateway Insights page provides a good starting point for viewing the analytics being streamed to the cloud. 

1. Select Gateways from the left side menu.
2. On the Gateways page, select a site from the drop down.
3. Select a router from the list.
4. In the Properties pane, select the link to Gateway Insights.


### Application Insights & SLE

To provide insights into the application, services, and some SLE functionality, enable `session-record`. It is recommended to enable session records for all the SSR/128T services to provide a broad look at the application use. 
```
1    authority
2        service             internet
3            name            internet
4
5            session-record
6                profile  profile1
7            exit
8        exit
9
10       session-record-profile     profile1
11            name                   profile1
12            include-modify-record  true
13
14            intermediate-records
15                enabled  true
16            exit
17        exit
```

## Moving a Router

There are two steps to moving a router; releasing and re-onboarding. (why would you need to move a router? Where are you moving it from and to?)

### Releasing a router

If the device needs to be removed from the organization, or released for other reasons, use the following process. 

#### From the MIST GUI:

* Go to **Organization > Inventory**.
* Select the checkbox next to the router.
* Click on the **More** drop down that appears on the top of the page. 
* Select **Release**.
* Click on **Release** to confirm.

#### On the 128T conductor

From the conductor shell:

`release mist agent router <router> node <node>`

In the GUI:

1. In the Tools menu, select Plugin Commands

2. In the Plugin Commands pane, select the plugin command (top right corner) **release mist agent**.

3. Set the router context: select the router and node from the drop down lists.

4. Click **Execute**.

After a few minutes the router will be released and stop sending the data to the MIST cloud. Once that process is completed,  disable the router by following the instructions here.

**going to need this to be explained; the link takes me back to onboarding, not anything related to disabling.**

### Re-Onboarding a router

To re-onboard a router without doing a full ISO re-initialization, use the following steps to trigger the on-boarding process again. 

**Need the steps. The ones that were here are for releasing the the router, not re-onboarding.**

