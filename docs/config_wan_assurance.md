---
title: Conductor Managed WAN Assurance
sidebar_label: Conductor Managed WAN Assurance
---

SSR software can run on any certified hardware or virtual machine, however, for software versions prior to SSR Version 6.0, router adoption relies on an on-premise conductor to assist in the onboarding. This document explains the process of brining the conductor into the Mist cloud to manage the SSRs. This procedure assumes you do not already have an account, organization, or sites configured on the Mist portal. These items are required for SSR/Mist WAN Assurance.

:::important
Configuring WAN Assurance requires Administrator level privileges on all platforms, SSR and Mist.
:::

High Level Steps:
- Create an account on the Mist portal.
- Add your Organization.
- Create Sites.
- Register the Conductor with Mist.
- Assign routers to a Site.

## Enable WAN Assurance on the Conductor

For detailed information about Mist WAN Assurance, please refer to the [Mist WAN Assurance documentation](https://www.juniper.net/us/en/products/cloud-services/wan-assurance.html).

1. Create an account on the [Mist portal](https://manage.mist.com/).

2. Create an organization for the authority.

- From the Mist menu on the left, select **Organization**, and select **Settings** from the menu.

    ![Organization Settings](/img/wan_org_settings.png)

- In the Create Organization panel, enter a name for the Organization.

    ![Organization Panel](/img/wan_create_org.png)

    For additional information about creating an Organization, please refer to the Mist [Organization Config documentation](https://www.mist.com/documentation/category/organization-config/).

3. Create one Site for each physical location for onboarding the SSRs.

    Create a unique site for each physical (or logical) location in the network. For example, the spoke and hub should be onboarded to different sites. Other devices from the Juniper stack such as Mist APs, Switches, SRX, etc., should be onboarded and assigned to the same site as the SSR when possible. This provides a clean topology view of all devices running within a site.

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

- In the Inventory panel, click on the **WAN Edge** selection on the top of the screen.

    ![Inventory panel](/img/wan_inventory_panel.png)

- Click on the Adopt WAN Edges button in the top right corner. The WAN Edge Adoption dialog appears, displaying the registration code.

    ![WAN Edge Adoption](/img/wan_registration_code.png)

- Click on **Copy to Clipboard**.

5. Return to the SSR and login to the conductor PCLI as an admin.

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

To enter the registration code in the SSR GUI, copy the text registration-code from the Mist portal (info above) and paste it under **Configuration > Authority > Mist WAN Assurance > Registration Code**.

```
    config

        authority

            mist-wan-assurance
                registration-code  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmdfaWQiOiIwYzE2MGI3Zi0xMDI3LTRjZDEtOTIzYi03NDQ1MzRjNGIwNzAiLCJzdmMiOiIxMjhyb3V0ZXIiLCJwcm92aWRlciI6ImF3cyIsImVudiI6InN0YWdpbmciLCJlcHRlcm1fdXJsIjoid3NzOi8vZXAtdGVybWluYXRvci1zdGFnaW5nLm1pc3RzeXMubmV0L3dzIiwiaWF0IjoxNjIyNzQ2MTc1LCJleHAiOjE2NTQyODIxNzV9.iBul1W1nk!3J0
            exit
        exit
    exit

    *admin@node1.conductor1#

```
Committing the registration code enables WAN Assurance on all connected routers. If you only want WAN Assurance enabled on certain routers, please refer to [Skipping Specific Routers](#skipping-specific-routers) before committing the registration code information to the configuration.

7. Commit the registration code to the configuration.

### Onboarding Routers

Once a valid registration code is committed, registration is automatic. The conductor sends instructions to all connected routers to self-onboard to the Mist cloud. The process is automated and the routers do not require any user interaction.

### Skipping Specific Routers

A router or routers can be skipped during the Mist onboarding process. Change *authority > router > mist-wan-assurance > enabled* to `false`. The Conductor will skip the router and associated nodes (if it is an HA router).

For a system that has completed the onboarding process, setting `mist-wan-assurance` to `false` will prevent telemetry data from being sent to the cloud.

:::note
Disabling WAN Assurance does not automatically release the router from the cloud. See Releasing a Router for more information.
:::

### Site Assignment (Mist)

Once the SSR portion of the onboarding process is complete, each router is displayed on the Mist inventory page under **Organization > Inventory**. Select Gateways on the top of the page to see a list of the routers and status. The router is listed as Unassigned, and must be assigned to the appropriate site.

:::note
Sites must have already been created - there is no option to create a site in the drop down.
:::

1. Select the Unassigned router.
2. Click on the **More** drop down on the upper right corner.
3. Select **Assign to Site**.
4. In the Assign Gateway dialog, select the appropriate site from the drop down.
5. Click on **Assign to Site**.

Once the site assignment is complete, the information is relayed back to the corresponding SSR router, and the router begins streaming the telemetry data to the cloud.

### Viewing the SSR status

The status of the SSR connection to the MIST cloud and other details can be found on the GUI and PCLI.

#### On the Conductor UI

* Navigate to Plugins > MIST WAN ASSURANCE > Details.

 ![Plugins Context Menu](/img/wana_plugin_detail.png)

* Select the router from the `Router Context` menu.

 ![Plugins Context Menu](/img/wana_plugin_context.png)

* The summary output is displayed by default and contains useful information about the device connection to the MIST cloud.

 ![Plugins Context Menu](/img/wana_plugin_state.png)


#### On the Conductor PCLI

* The `show mist` command can be used to display the summary and detail information about the 128 router's connection to the MIST cloud.

```console
admin@node1.conductor1# show mist router 128t-east
Wed 2022-07-20 05:33:05 UTC
✔ Retrieving mist state...
Target: node1.128t-east

========== ============ ============= ================= ============================= =================== ============
 Agent      Connection   128T          128T-mist-agent   Platform                      Device-ID           Interfaces
========== ============ ============= ================= ============================= =================== ============
 assigned   up           5.6.1-9.el7   4.0.3330-1.el7    OpenStack Foundation - Nova   02-00-01-c9-90-16            6

Retrieved mist state.
Completed in 1.06 seconds
admin@node1.conductor1#
```

## SSR WAN Assurance Features

### Topology Mapping

The SSR can be configured to receive LLDP packets from LAN interfaces. This information is useful for creating a local site level topology view. Use the following code example to enable the LLDP receive mode on LAN interfaces.

`configure authority router <router> node <node> device-interface <lan-intf> lldp mode receive-only`

### Gateway Insights

Once onboarding is complete, the router begins streaming telemetry data. Data appears on the Mist portal after approximately 15 minutes. The Gateway Insights page provides a good starting point for viewing the analytics being streamed to the cloud.

1. Select Gateways from the left side menu.
2. On the Gateways page, select a site from the drop down.
3. Select a router from the list.
4. In the Properties pane, select the link to Gateway Insights.


### Application Insights & SLE

To provide insights into the application, services, and some SLE functionality, enable `session-record`. It is recommended to enable session records for all the SSR services to provide a broad look at the application use.
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
Additionally, configuring `application-identification` to `mode all` populates the Application Summary in the SSR GUI. Applications are grouped by Category or Clients, and can be further refined by using the following **view by** options: Bytes Recieved, Bytes Sent, Total Bytes.

![Application Summary](/img/app_summary.png)

For more information, see [Using Application Summary.](how_to_use_app_summary.md)

## Troubleshooting

Use the following information to help identify or resolve issues configuring WAN Assurance on an SSR.

### Show Command
The `show plugins state` command displays extensive information about the state of the plugin. Use the following command as a starting point for any troubleshooting.

`show plugins state router <router name> summary 128T-mist-wan-assurance`

The `connection` column will display the current status of the device connection to the MIST cloud. When the connection is down, it will also display information useful to diagnose the connection issue.

```
admin@node1.office# show plugins state summary 128T-mist-wan-assurance
Thu 2022-05-12 22:38:34 EDT
✔ Retrieving state data...
Target: node1.office

============ ======================== ============== ================= =================== ============
 Agent        Connection               128T           128T-mist-agent   Device-ID           Interfaces
============ ======================== ============== ================= =================== ============
 unassigned   down - no DNS response   5.5.0-43.el7   3.1.2666-1.el7    02-00-01-f3-39-eb            4

Retrieved state data.
Completed in 1.98 seconds
admin@node1.office#
```

For additional troubleshooting information use the `detail` commands as shown below

`show plugins state router <router name> detail 128T-mist-wan-assurance`

### Moving a Router

In a situation where a router needs to be moved from one organization to another or physically relocated the router must be released and then re-onboarded.

### Releasing a Router

To release a router, use the following process from the MIST GUI:

* Go to **Organization > Inventory**.
* Select the checkbox next to the router.
* Click on the **More** drop down that appears on the top of the page.
* Select **Release**.
* Click on **Release** to confirm.

After a few minutes the router will be released and stop sending the data to the Mist cloud. Use the information in  [Viewing the SSR Status](#viewing-the-ssr-status) to check the current status. A successfully released router will display the following:

 ![Plugins Context Menu](/img/wana_plugin_released.png)


Once that process is completed, disable the Mist WAN Assurance plugin on the router.

![Disable MWA Plugin](/img/wana_disabled_mwa.png)

### Re-Onboarding a Router

Once the necessary changes have been made to the registration-code and other configuration, the re-onboarding process can begin.

#### Using the Conductor UI

1. Navigate to Plugins > MIST WAN ASSURANCE > Details.

 ![Plugins Context Menu](/img/wana_plugin_detail.png)

2. Confirm the registration-code on the router is as expected. This can done via the `Detail State` tab as shown below.

 ![Plugins Detail State](/img/wana_plugin_detail_regcode.png)

3. Re-enable the plugin on the router and commit the configuration.

![Enable MWA Plugin](/img/wana_enabled_mwa.png)

4. Switch to the `Command` tab, select the router from the `Router Context` menu and select the `unrelease mist agent` command.

 ![Plugins Command Context Menu](/img/wana_plugin_command_context.png)

5. Click on `Execute` to initiate the re-onboarding process using the registration-code currently available on the system.

 ![Unreleased](/img/wana_unreleased.png)


#### Using the conductor PCLI

1. Confirm the registration-code on the router is as expected.

```console
admin@node1.conductor1# show mist router 128t-east detail
Wed 2022-07-20 05:58:33 UTC
✔ Retrieving mist state...

==============================================================================================================================================================================================================================================================
 node1.128t-east
==============================================================================================================================================================================================================================================================
   128T:                                       5.6.1-9
   128T-mist-agent:                            4.0.3330-1
   Agent:                                      released
   Connection:                                 down
   registration-code:                          eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmdfaWQiOiIwYzE2MGI3Zi0xMDI3LTRjZDEtOTIzYi03NDQ1MzRjNGIwNzAiLCJzdmMiOiIxMjhyb3V0ZXIiLCJwcm92aWRlciI6ImF3cyIsImVudiI6InN0YWdpbmciLCJlcHRlcm1fdXJsIjoid3NzOi8vZXAtdGVyb
 WluYXRvci1zdGFnaW5nLm1pc3RzeXMubmV0L3dzIiwiaWF0IjoxNjU4MjkzMTQ2LCJleHAiOjE2ODk4MjkxNDZ9.LVIW0Gx8Q8IIkp0o1J86ZoW3_FytrRDKJEMQdBqABCD
   registration-time:                          unknown

Retrieved mist state.
Completed in 0.97 seconds
admin@node1.conductor1#
```

2. Re-enable the plugin on the router.

```console
admin@node1.conductor1# config authority router 128t-east mist-wan-assurance enabled true
```

3. Unrelease the router to initiate the re-onboarding process.

```console
admin@node1.conductor1# unrelease mist agent
node   router
admin@node1.conductor1# unrelease mist agent router 128t-east node node1
✔ Retrieving...
Target: node1.conductor1

Unreleased

Successfully retrieved info.
admin@node1.conductor1#
```

4. Once re-onboarded, check the status using the `show mist` command.
```console
admin@node1.conductor1# show mist router 128t-east
Wed 2022-07-20 06:01:32 UTC
✔ Retrieving mist state...
Target: node1.128t-east

============ ============ ============= ================= ============================= =================== ============
 Agent        Connection   128T          128T-mist-agent   Platform                      Device-ID           Interfaces
============ ============ ============= ================= ============================= =================== ============
 unassigned   up           5.6.1-9.el7   4.0.3330-1.el7    OpenStack Foundation - Nova   02-00-01-63-0e-65            6

Retrieved mist state.
Completed in 0.90 seconds
admin@node1.conductor1#
```
