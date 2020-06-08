---
title: Microsoft 365
sidebar_label: Microsoft 365
---

128T optimizes Microsoft 365 sessions, allowing you to easily configure the associated services to be delivered using the recommended [network connectivity principles](https://docs.microsoft.com/en-us/office365/enterprise/office-365-network-connectivity-principles). It uses an [AppID module](concepts_appid/#appid-using-modules) for automatic discovery of Microsoft 365 endpoints, and simple service definition.

:::info
Microsoft 365, or M365 is formerly known as Office 365, or O365.
:::

## Configuration

To configure your router for Microsoft 365 you must enable the router for AppID module learning mode, create Microsoft 365 services, and define associated policies for access, security, and routing.

### Enable Module Learning Mode
In the router configuration, enable module based application learning mode by adding `module` to the "Application Identification" settings. 128T software installs a default AppID module for Microsoft 365 applications.

#### GUI Example
![AppId Module Add](/img/howto_m365_1.png)

![AppId Module Save](/img/howto_m365_2.png)

![AppId Module Added](/img/howto_m365_3.png)

#### CLI Example
```
config

    authority

        router   my-router
            name                        my-router

            application-identification
                mode  module
            exit
        exit
    exit
exit
```

:::important
Once the module AppID learning mode is enabled, the router host will periodically connect to Microsoft's `https://endpoints.office.com` web service to retrieve M365 endpoints. Ensure your router host is able to access the public web service using the Linux kernel route table.
:::

### Configure Services
Once module AppID learning mode has been enabled, the following application names will be automatically discovered (see [Verifying Operation](#verifying-operation) to confirm successful discovery): 

| Application Name  | Description                                   |
| ----------------- | --------------------------------------------- |
| `O365-Common`     | Microsoft 365 Common and Office Online        |
| `O365-Exchange`   | Exchange Online                               |
| `O365-SharePoint` | SharePoint Online and OneDrive for Business   |
| `O365-Skype`      | Skype for Business Online and Microsoft Teams |

Create one or more services configured for the module discovered application names.

#### GUI Example
![M365 Service](/img/howto_m365_6.png)

#### CLI Example
```
config

    authority

        service  M365
            name                  M365
            description           "Microsoft 365 Common and Office Online"
            application-name      O365-Common
            share-service-routes  false
        exit

        service  M365-Exchange
            name                  M365-Exchange
            description           "Exchange Online"
            application-name      O365-Exchange
            share-service-routes  false
        exit

        service  M365-Sharepoint
            name                  M365-Sharepoint
            description           "SharePoint Online and OneDrive for Business"
            application-name      O365-Sharepoint
            share-service-routes  false
        exit

        service  M365-Skype
            name                  M365-Skype
            description           "Skype for Business Online and Microsoft Teams"
            application-name      O365-Skype
            share-service-routes  false
        exit
    exit
exit
```

### Service Policies
With your services for Microsoft 365 added, the final step is to configure the services for which tenants can access Microsoft 365, security policies, routing, and optional service-policy.

#### Access
Define which of your [network tenants](config_tenants/#modeling-your-network-tenancy) are allowed to access Microsoft 365 services by adding them to the [service access policies](config_reference_guide/#access-policy-service).

#### Security
Configure the [security policy](config_reference_guide/#security) for the Microsoft 365 services.

:::tip
Microsoft 365 services are designed for direct Internet transport, with robust security and encryption built in to each application. As such, a security policy that disables router encryption is typically preferred.
:::

#### Routing
Give the Microsoft 365 services appropriate [service routes](concepts_glossary/#service-routes) in your overall topology to designate possible routes.

:::tip
In broadband connected branch router scenarios, the optimal route for M365 services will typically be directly out local broadband links. In this case, disabling the sharing of service-routes may be desirable in the service configuration.
:::

#### Service Policy
By using [service policy](bcp_service_and_service_policy_design/#service-policy) associated with your Microsoft 365 services, you can set how your network should treat sessions. This includes QoS, path selection, and failover behavior for Microsoft 365. 

## Verifying Operation

You can verify the discovery by checking the "Applications Seen" on the router page of the GUI, and using the `show application names` in the PCLI.

#### GUI Example
![Applications Seen](/img/howto_m365_4.png)

![M365 Applications Seen](/img/howto_m365_5.png)

#### CLI Example
```
admin@node1.my-router# show application names                                                                                                                                                                                                                  
Mon 2020-06-08 03:03:49 UTC

Node: node1

================== =============== ================ ===================== =====================
 Application Name   Session Count   Ip Tuple Count   Date Discovered       Last Updated
================== =============== ================ ===================== =====================
 O365-Common                    0               25   2020-06-08 02:03:17   2020-06-08 02:03:17
 O365-Exchange                  0               17   2020-06-08 02:03:17   2020-06-08 02:03:17
 O365-SharePoint                0                5   2020-06-08 02:03:17   2020-06-08 02:03:17
 O365-Skype                     0                3   2020-06-08 02:03:17   2020-06-08 02:03:17
```