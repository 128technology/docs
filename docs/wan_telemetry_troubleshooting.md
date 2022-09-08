---
title: Troubleshooting
sidebar_label: Troubleshooting
---

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

### SSR Connection Status

The status of the SSR connection to the MIST cloud and other details can be found on the GUI and PCLI.

#### On the Conductor UI

* Navigate to Plugins > MIST WAN ASSURANCE > Details.

 ![Plugins Context Menu](/img/wana_plugin_detail.png)

* Select the router from the `Router Context` menu.

 ![Plugins Context Menu](/img/wana_plugin_context.png)

* The summary output is displayed by default and contains useful information about the device connection to the MIST cloud.

 ![Plugins Context Menu](/img/wana_plugin_state.png)

#### On the Conductor PCLI

* The `show mist` command can be used to display the summary and detail information about the SSR's connection to the MIST cloud.

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
