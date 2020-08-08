---
title: BGP Community Services Plugin
sidebar_label: BGP Community Services
---

The BGP Community Services Plugin allows the 128T router to create services based on the community strings of prefixes learned via BGP from remote routers. The plugin allows you to configure a profile containing mappings of application names to community strings. A router can be assigned one profile, which will allow it to create [application identification](concepts_appid.md) information to associate learned prefixes to application names. These application names can then be configured within a service definition in order to appropriately populate the routers FIB. The primary use case for this plugin was to identify Microsoft Office 365 application traffic for customers using ExpressRoute. However, there may be other use cases where it is desirable for prefixes identified by a BGP community string to be mapped into a service dynamically.

:::note
The instructions for installing and managing the plugin can be found [here](plugin_intro.md#installation-and-management).
:::

## Configuration Snippet
One or more BGP community profile objects can be configured at the authority level of the configuration. These profiles are then assigned to the individual routers.

### BGP Community Services Profile Configuration
An example configuration is shown below, which shows the standard community strings for [Microsoft Office 365 over ExpressRoute](https://docs.microsoft.com/en-us/office365/enterprise/bgp-communities-in-expressroute). The `application-name` values are completely user configurable. The `bgp-community` is a list object to allow for scenarios where you may want to associate multiple community strings with a single application.

```
config

    authority

        bgp-community-services-profile  O365
            name              O365

            application       ExchangeOnline
                application-name  ExchangeOnline
                bgp-community     12076:5010
            exit

            application       SharePointOnline
                application-name  SharePointOnline
                bgp-community     12076:5020
            exit

            application       SkypeForBusiness
                application-name  SkypeForBusiness
                bgp-community     12076:5030
            exit

            application       OtherO365
                application-name  OtherO365
                bgp-community     12076:5100
            exit
        exit
    exit
exit
```
In order to place prefixes learned for these applications in the FIB of a router, services must be created that reference the `application-name` values chosen above. Example services that correspond to the previously configured `O365` profile are shown below.
```
config

    authority

        service  MSEX
            name              MSEX
            application-name  ExchangeOnline

            access-policy     lan
                source  lan
            exit
        exit

        service  MSSP
            name              MSSP
            application-name  SharePointOnline

            access-policy     lan
                source  lan
            exit
        exit

        service  MSSK
            name              MSSK
            application-name  SkypeForBusiness

            access-policy     lan
                source  lan
            exit
        exit

        service  MSOT
            name              MSOT
            application-name  OtherO365

            access-policy     lan
                source  lan
            exit
        exit
    exit
exit
```
Before the router can leverage the application identification module for BGP community services, you must assign a profile to the router as shown below.
```
config

    authority

        router  router1
            name                            router1
            bgp-community-services-profile  O365
        exit
    exit
exit
```

:::important
In order for the router to use the prefix values calculated for each application, the `application-identification` mode `module` MUST be enabled on the router as shown below.
:::
```
config

    authority

        router  router1
            name                        router1

            application-identification
                mode  module
            exit
        exit
    exit
exit
```

## Troubleshooting

### Pillar Generation
When the plugin is installed on the conductor, each commit triggers a script called `generate_pillar` to auto-generate pillar data for each node of each router. Please check the following locations on the conductor for debugging information.

- Logs for the pillar generation for each commit can be found here
```
/var/log/128technology/plugins/bgp-community-services-generate-pillar.log
```

- The actual pillar data containing mappings of application name to community strings can be found here
```
/var/lib/128technology/plugins/pillar/bgp-community-services/<asset name>.sls
```

### Router Application Identification Module Configuration
If a BGP Community Services Profile has been assigned to the router, the 128T-bgp-community-services router package should be installed on all nodes of the router via Salt. In addition, a configuration file should be generated and a symlink should be created to enable the application module.

- The configuration for the plugin module, directly generated from pillar data can be found here
```
/var/lib/128technology/plugins/bgp-community-services/config.json
```

- A symlink to the `bgp-community-services` executible should exist as shown below
```
# cd /etc/128technology/application-modules/
# ll
total 0
drwxr-xr-x 2 root root 45 Jun 29 23:28 app_module_utils
lrwxrwxrwx 1 root root 70 Jun 30 00:44 bgp-community-services -> /etc/128technology/application-modules/defaults/bgp-community-services
drwxr-xr-x 2 root root 86 Jun 29 23:28 defaults
lrwxrwxrwx 1 root root 21 Jun 29 20:30 office365.py -> defaults/office365.py
# 
```

### Application Identification Output
Once the application identification module is setup correctly and a configuration exists, it will begin to generate JSON data in an application module file. If this file does not exist, or if it is not being updated periodically, ensure that application-identification mode module is configured on the router.

- The application module file is located here
```
/var/run/128technology/application-modules/bgp-community-services.json
```

The contents of this file should show a JSON mapping of the user defined application names to a list of prefixes. If the module had any difficulties producing the data, it should generate an error message that can be used to help in determining the reason for the failure. The failure will also indicate which application and community string the module was processing when it encountered a failure. This may be useful in determining if the failure happened initially with the first application/community or later in the processing of the dta. Some examples are shown below.

- This error indicates that the routingManager API was not available to be queried 
```json
{
  "module-name": "bgp-community-services",
  "duration": 60,
  "continue-file-watch": true,
  "services": {},
  "error": "URLError: [Errno 111] Connection refused on application ExchangeOnline and community 12076:5010"
}
```

- This error indicates that the routingManager API was available but returned an error
```json
{
  "module-name": "bgp-community-services",
  "duration": 60,
  "continue-file-watch": true,
  "services": {},
  "error": "HTTPError: 502 Bad Gateway on application ExchangeOnline and community 12076:5010"
}
```

- This error indicates that routingManager did not return the expected data. Check to ensure BGP is configured correctly on the router
```json
{
  "module-name": "bgp-community-services",
  "duration": 60,
  "continue-file-watch": true,
  "services": {},
  "error": "AttributeError: 'str' object has no attribute 'get' on application ExchangeOnline and community 12076:5010"
}
```

- An empty result like this indicates that no match was found for the configured BGP community strings. Please check the received prefixes to ensure you are getting the communitie strings you expect
```json
{
  "module-name": "bgp-community-services",
  "duration": 60,
  "continue-file-watch": true,
  "services": {}
}
```

## Azure Express Route O365 Profile Definition
The output here is provided in `flat` format to facilitate copy/pasting into an existing 128T conductor or router. This can be used to create a proile named `O365` which can be assigned to specific routers. It will define application-names `ExchangeOnline`, `SharePointOnline`, `SkypeForBusiness`, and `OtherO365` which can each be used in the `application-name` field to define a service.

```
config authority bgp-community-services-profile O365 name O365
config authority bgp-community-services-profile O365 application ExchangeOnline application-name ExchangeOnline
config authority bgp-community-services-profile O365 application ExchangeOnline bgp-community 12076:5010
config authority bgp-community-services-profile O365 application SharePointOnline application-name SharePointOnline
config authority bgp-community-services-profile O365 application SharePointOnline bgp-community 12076:5020
config authority bgp-community-services-profile O365 application SkypeForBusiness application-name SkypeForBusiness
config authority bgp-community-services-profile O365 application SkypeForBusiness bgp-community 12076:5030
config authority bgp-community-services-profile O365 application OtherO365 application-name OtherO365
config authority bgp-community-services-profile O365 application OtherO365 bgp-community 12076:5100
```
