---
title: Application Identification
sidebar_label: Application Identification
---

Application Identification can automatically learn, identify, and classify applications processed by the SSR and store them in the [web filtering cache](config_domain-based_web_filter.md#how-it-works). 

### Modes

- **module:** The SSR uses an external module for application classification. For more information about the external module, see [Concepts of Application Identification](concepts_appid.md).
- **tls:** The SSR inspects the Server Name Indicaton (SNI) in the Client Hello to identify applications.  
- **http:** The SSR will learn applications via HTTP host name parsing. 
- **all:** Includes all modes. To use [web filtering](config_domain-based_web_filter.md), `application-identification` must be set to **all**. 

By default, the SSR automatically downloads domain and application datatsets weekly. The defaults (shown below) can be adjusted as necessary using the Application Data Updates panel or from the PCLI for each router. For additional information, see [`application-identification` in the Element Reference section.](config_reference_guide.md#application-identification)

![Application Data Updates](/img/dbwf_app-id_updates.png)

## Application Summary

The Application Summary is available for routers where both Application Identification and Summary Tracking are enabled. `summary-tracking` is enabled by default, and `application-identification` must be set to `mode all`. Refer to [Application Summary](how_to_use_app_summary.md) to learn more about using the Application Summary. 

### Configuring Learning Mode and Application Summary

Application learning mode gathers statistics about domains and categories. You can select the type of information to be gathered; Modules, HTTP, TLS, or All. When configuring Application Learning mode, **all** is the preferred setting.

To configure Learning Mode via the GUI:
1. Select a router.
2. Scroll down to Router Settings and click Application Identification Settings.

![Application ID Setting Button](/img/config_app_learning1.png)

3. Set `enabled` to `true`.

![App ID Basic Info](/img/config_app_learning2.png)

4. Under Application Identification, select ADD.
5. Select a type of application to identify. In most cases, selecting `all` will provide the best data set.

![App Id Dropdown](/img/config_app_learning3.png)

6. Click Save.

7. Validate and Commit the changes. 

Once enabled, the Application Summary is populated. 

