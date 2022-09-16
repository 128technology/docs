---
title: Register and Onboard the SSR
sidebar_label: Register and Onboard the SSR
---

An organization's registration code is used by the SSR devices to automatically onboard into the Mist cloud. Use the following procedure to access the registration code for the organization.

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

To enter the registration code in the SSR GUI, copy the text registration code from the Mist portal (shown above) and paste into the SSR GUI under **Configuration > Authority > Mist WAN Assurance > Registration Code**.

![Registration Code Field](/img/wan_telemetry_regcode.jpg)

:::note
If you are onboarding a Juniper SSR appliance, the Onboarding Mode should be set to *greenfield*. If you are onboarding a whitebox SSR - a non-Juniper appliance - running SSR software, the Onboarding Mode should be set to *brownfield* as shown in the example above.  
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