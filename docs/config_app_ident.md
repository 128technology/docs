---
title: Application Identification
sidebar: Application Identification
---

Application Identification allows the automatic generation of category-based child services under a service. It also will automatically learn, identify, and classify applications processed by the SSR and store them in the [web filtering cache](config_domain-based_web_filter.md#how-it-works). 

### Modes

- **module:** The SSR uses an external module for application classification. The SSR expects classification modules to be installed on the system in /var/etc/128technology/application-modules, and are provided with the SSR software.
- **tls:** The system inspects X.509 certificates exchanged during the TLS handshake to look for Common Name elements to identify applications. 
- **http:** The SSR will learn applications via HTTP host name parsing. 
- **all:** Includes all modes. To use [web filtering](config_domain-based_web_filter.md), `application-identification` must be set to **all**. 

By default, Application Identification automatically downloads updated domain and application datatsets weekly. The defaults (shown below) can be adjusted as necessary using the Application Data Updates panel or from the PCLI for each router. For additional information, see [application-identification in the Element Reference section.](config_reference_guide.md#application-identification)

![Application Data Updates](/img/dbwf_app-id_updates.png)

## Application Summary

The Application Summary is available for each router with Application Identification enabled. Use the steps below to configure Application Learning mode for a router that does not have application identification enabled. Refer to [Application Summary](how_to_use_app_summary.md) to learn more about using the Application Summary. 

### Configuring Learning Mode and Application Summary

Application learning mode gathers statistics about domains and categories. You can select the type of information to be gathered; Modules, HTTPS, TLS, or All. 

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

