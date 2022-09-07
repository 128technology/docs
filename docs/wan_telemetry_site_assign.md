---
title: Site Assignment
sidebar_label: Site Assignment
---


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