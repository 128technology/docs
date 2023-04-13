---
title: ZTP Onboarding to a Conductor
sidebar_label: ZTP Onboarding to a Conductor
---

**This document explains the process of using ZTP to onboard routers and enable WAN Assurance Telemetry for conductor-managed deployments.** 

SSR software can run on Juniper branded appliances, whitebox hardware (certified or self-evaluated), or virtual environments. For software versions prior to SSR Version 6.0, router adoption relies on an on-premise conductor to manage the routers. To assist in the onboarding of these routers to an on-premises conductor, you can leverage the Mist cloud and the ZTP process. This procedure assumes you do not already have an account, organization, or sites configured on the Mist portal. These items are required for SSR/Mist WAN Assurance.

:::note
Conductor-managed WAN Assurance may be run on SSR deployments using software releases 5.4.4 and above. 6.x introduces the availability of SSR integration to a Mist Managed environment.
:::

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

#### 1. Create an account on the [Mist portal](https://manage.mist.com/).

#### 2. Create an organization for the authority.

- From the Mist menu on the left, select **Organization**, and select **Settings** from the menu.

    ![Organization Settings](/img/wan_org_settings.png)

- In the Create Organization panel, enter a name for the Organization.

    ![Organization Panel](/img/wan_create_org.png)

    For additional information about creating an Organization, please refer to the Mist [Organization Config documentation](https://www.mist.com/documentation/category/organization-config/).

#### 3. Create one Site for each physical location for onboarding the SSRs.

Create a unique site for each physical (or logical) location in the network. For example, the spoke and hub should be onboarded to different sites. Other devices from the Juniper stack such as Mist APs, Switches, SRX, etc., should be onboarded and assigned to the same site as the SSR when possible. This provides a clean topology view of all devices running within a site.

- From the Mist menu on the left, select **Organization** and select **Site Configuration** from the menu.

    ![Site Configuration](/img/wan_org_site_config.png)

- In the Sites List, click on the **Create Site** button.

    ![Site Button](/img/wan_create_site_button.png)

- Use the New Site panel to configure a site.

    ![New Site Panel](/img/wan_new_site.png)

- Add the Conductor IP address to the Site. This allows devices such as the SSR 120/130 to use ZTP to access the conductor through Mist.

    ![Session Smart Conductor Address](/img/wanas_conductor_ip_mist.png)

    For information about the fields used to create a site, please refer to the Mist [Site Configuration documentation](https://www.mist.com/documentation/category/site-configuration/).

:::note
For existing deployments of Conductor-managed Session Smart Networking, the Conductor IP address is pre-populated.

For new deployments enter the Conductor IP address as shown above.
:::

#### 4. Add the Organization registration code.

The Mist Organization's registration code must be added to the SSR Conductor to enable WAN Assurance on all connected routers.

- From the Mist menu on the left, select **Organization > Inventory**.

    ![Inventory Menu](/img/wan_inventory.png)

- In the Inventory panel, click on the **WAN Edge** selection on the top of the screen.

    ![Inventory panel](/img/wan_inventory_panel.png)

- Click on the **Adopt WAN Edges** button in the top right corner. The WAN Edge Adoption dialog appears, displaying the registration code.

    ![WAN Edge Adoption](/img/wan_registration_code.png)

- Click on **Copy to Clipboard**.

- Return to the **SSR Conductor GUI** and login to the PCLI as an admin.

- Paste the registration code into the PCLI.

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

- To enter the registration code using the **SSR Conductor** GUI, copy the text registration-code from the Mist portal (info above) and paste it under **Configuration > Authority > Mist WAN Assurance > Registration Code**.

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
- Committing the registration code enables WAN Assurance on all connected routers. If you only want WAN Assurance enabled on certain routers, please refer to [Skipping Specific Routers](#skipping-specific-routers) before committing the registration code information to the configuration.

#### 5. Commit the registration code to the configuration.

## Onboarding Routers

Once a valid registration code is committed on the conductor, registration is automatic. The conductor sends instructions to all connected routers to self-onboard to the Mist cloud. The process is automated and the routers do not require any user interaction.

### Skipping Specific Routers

A router or routers can be skipped during the Mist onboarding process. Change **authority > router > mist-wan-assurance > enabled** to `false`. The Conductor will skip the router and associated nodes (if it is an HA router).

For a system that has completed the onboarding process, setting `mist-wan-assurance` to `false` will prevent telemetry data from being sent to the cloud.

:::note
Disabling WAN Assurance does not automatically release the router from the cloud. See Releasing a Router for more information.
:::

## Site Assignment (Mist)

Once the SSR portion of the onboarding process is complete, each router is displayed on the Mist inventory page under **Organization > Inventory**. Select WAN Edges on the top of the page to see a list of the routers and status. The router is listed as Unassigned, and must be assigned to the appropriate site.

:::note
Sites must have already been created - there is no option to create a site in the drop down.
:::

1. Select the Unassigned router.
2. Click on the **More** drop down on the upper right corner.
3. Select **Assign to Site**.
4. In the Assign WAN Edges dialog, select the appropriate site from the drop down.
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
 Agent      Connection   SSR          SSR-mist-agent   Platform                      Device-ID           Interfaces
========== ============ ============= ================= ============================= =================== ============
 assigned   up           5.6.1-9.el7   4.0.3330-1.el7    OpenStack Foundation - Nova   02-00-01-c9-90-16            6

Retrieved mist state.
Completed in 1.06 seconds
admin@node1.conductor1#
```

For additional information about working with WAN Assurance Telemetry, see these additional sections:

- #### [Features](wan_telemetry_features.md)

    #### [Topology Mapping](wan_telemetry_features.md#topology-mapping)

    #### [Application Insights](wan_telemetry_features.md#application-insights--sle)

- #### [Troubleshooting](wan_telemetry_troubleshooting.md)

    #### [`show` commands](wan_telemetry_troubleshooting.md#show-command)

    #### [Connection Status](wan_telemetry_troubleshooting.md#ssr-connection-status)

    #### [Releasing a Router](wan_telemetry_troubleshooting.md#moving-a-router)

