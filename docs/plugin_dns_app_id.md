---
title: DNS App Id Plugin
sidebar_label: DNS App Id
---

The DNS App ID plugin identifies traffic passing through your SSR router by applying pattern matching to hostnames contained in DNS requests it processes. You can then configure SSR services for these hostnames, and associate application names to influence routing policy. You can read more about SSR and its application identification concept [here](concepts_appid.md).

This plugin relies on the [DNS Cache](plugin_dns_cache.md) plugin for hostname resolution.

:::note
The instructions for installing and managing this plugin can be found [here](plugin_intro.md#installation-and-management).
:::

## Configuration

In addition to the configuration snippet from the [dns-cache](plugin_dns_cache.md) plugin, the below configuration shows an example of dns-app-id configuration:
```
configure
    authority
        router lab-router
            application-identification
                mode module
            exit
            dns-app-id
                enabled true
                include-all-builtin-apps false
                builtin-apps gmail
                builtin-apps windows-update
                custom-apps cnn
                    name cnn
                    domain-name cnn.com
                    domain-name *.cnn.com
                exit
            exit
        exit
    exit
exit
```

| Element | Type    | Description                                                  |
| ------- | ------- | ------------------------------------------------------------ |
| enabled | boolean | Default: true. Governs whether the DNS AppID behavior is enabled or not. |
| include-all-builtin-apps | boolean | Default: false. Enabling this feature automatically includes all builtin apps including new one's the plugin adds due to upgrades. |
| builtin-apps | string | Multiple instance object. This can reference any built-in application patterns contained within the version of the plugin you're running. |
| custom-apps | subelement | Multiple instance object. Allows administrators to define custom patterns for matching applications. |
| custom-apps > name | string | The name of the custom-app. This value will subsequently be configured within a `service > application-name` to give treatment to that application. |
| custom-apps > description | string | A human-readable description of the custom application. |
| custom-apps > domain-name | string | A wildcard expression (POSIX.2 fnmatch) to match DNS requests that SSR processes. |

### Built-In Patterns

##### Version History

| Release      | Modification                                    |
| ------------ | ----------------------------------------------- |
| 1.2.0, 2.2.0 | `include-builtin-apps` was introduced |
| 1.3.0, 2.3.0, 3.1.0 | Add `YouTube` as builtin pattern |

The plugin contains built in application patterns for Gmail, Google Drive, YouTube, and Windows Update. The patterns were generated from the following published documents:

| Application    | Document |
| -------------- | --- |
| Gmail        | [link](https://support.google.com/a/answer/9497877?hl=en) |
| Google Drive   | [link](https://support.google.com/a/answer/2589954?hl=en) |
| Windows Update | [link 1](https://docs.microsoft.com/en-us/windows-server/administration/windows-server-update-services/deploy/2-configure-wsus#211-connection-from-the-wsus-server-to-the-internet) [link 2](https://docs.microsoft.com/en-us/windows/deployment/update/windows-update-troubleshooting#device-cannot-access-update-fWindows Updateiles) |
| YouTube   | [link](https://www.netify.ai/resources/applications/youtube) |

By enabling the `include-all-builtin-apps` configuration, the plugin will automatically include all the available apps. This allows for new apps to be automatically included as new builtin apps are added over time. Alternatively, you can choose specific builtin apps by name, as shown in the snippet above. The values you can configure are `gmail`, `google-drive`, `youtube` and `windows-update`.


### Custom Patterns

##### Version History

| Release      | Modification                                    |
| ------------ | ----------------------------------------------- |
| 1.2.0, 2.2.0 | Support for adding custom-apps at authority level was introduced |
| 1.3.0, 2.3.0, 3.1.0 | deprecate `patterns` in favor of `domain-name` for custom-apps |

The plugin also allows the user to create their own definitions of applications by configuring a set of patterns to be used for matching the application. Each pattern must be a valid regex that will be applied to a FQDN to identify the application. The `authority > dns-app-id > custom-apps` config can be used to define patterns that apply to all the routers with `dns-app-id` functionality enabled. Also shown in the configuration snippet is the custom-app `cnn` that includes a list of patterns to be applied at the router level. The identification is dynamic, so you just need to update the configuration on the conductor to include new apps or patterns for your routers. When `custom-apps` are configured at the authority and router level, the two lists are combined at runtime for that particular router. For example, if the user configured a custom-app called `zoom` on the authority and another app called `cnn` on the router, the router will contain both the applications.

Each custom-app should use the `domain-name` instead of the deprecated `patterns` for identifying custom applications. It is POSIX.2 compliant with [fnmatch](https://pubs.opengroup.org/onlinepubs/9699919799/functions/fnmatch.html).


#### Example
This example shows our builtin `gmail` application's pattern matching configured as a custom-app. You should not use this example in production, but is intended to document how to build out complicated pattern matching for an application.

```
custom-apps gmail
    name gmail
    domain-name *.client-channel.google.com
    domain-name accounts.google.com
    domain-name apis.google.com
    domain-name clients.*.google.com
    domain-name contacts.google.com
    domain-name hangouts.google.com
    domain-name *.googleusercontent.com
    domain-name mail.google.com
    domain-name www.google.com
    domain-name *.gstatic.com
    domain-name ogs.google.com
    domain-name play.google.com
exit
```

#### Deprecated Patterns
The latest version is backwards compatabile with the `patterns` regex functionality for `custom-apps` however it is much more natural to use `domain-name`. In future releases, the `patterns` functionality will be obsoleted and removed.

:::note
The `.` character bears special meaning within regular expressions, and matches *any single character*. Because hostnames contain literal `.` characters, in order to explicitly reference a dot separator, you must prefix it with **two** backslash characters. I.e., to have a pattern match the hostname `www.128technology.com`, you would type it into the PCLI as `www.128technology.com`. The PCLI will render the double backslash characters as a single backslash when you `show` the configuration.
:::

:::important
If you configure invalid regex patterns, you will see the log message `invalid pattern for {name}, will never match!`. This means the pattern you configured is not a valid regex therefore the pattern matching will fail for the app until the configuration is fixed.
:::

### Automatic Service Generation

##### Version History

| Release      | Modification                                    |
| ------------ | ----------------------------------------------- |
| 1.2.0, 2.2.0 | This capability was introduced                  |
| 2.3.0, 3.0.0 | The generate-as-hierarchical-services capability was introduced |

The `authority > dns-app-id` configuration allows the user to automatically generate services for both the builtin and custom applications.

``` config
config

    authority

        dns-app-id
            generate-services  true
            base-service       internet
        exit
    exit
exit
```

| Element | Type    | Description                                                  |
| ------- | ------- | ------------------------------------------------------------ |
| generate-services | boolean | Default: false. Governs whether to automatically generate services for applications. |
| generate-as-hierarchical-services | boolean | Default: false. Whether to auto generate services as [hierarchical services](bcp_service_and_service_policy_design.md#hierarchical-services). |
| base-service | service-reference | The generated application service will inherit all the properties such as access-policy, service-policy, etc, from the base service. |
| custom-apps | subelement | Multiple instance object. Allows administrators to define custom patterns for matching applications. |
| custom-apps > name | string | The name of the custom-app. This value will subsequently be configured within a `service > application-name` to give treatment to that application. |
| custom-apps > description | string | A human-readable description of the custom application. |
| custom-apps > patterns | regex | A regular expression pattern for matching to DNS requests that the SSR processes. |

Refer to the [Appendix](#appendix) for an example of the config generation.

#### Manually associating with a Service

When auto-generation is not an option, the user can configure the appropriate application services explicitly. Because the DNS AppID uses the same mechanism as a standard SSR [AppID module](concepts_appid.md#appid-using-modules), you'll reference the application using the `application-name` field within a `service` configuration. In the `application-name` field, use the `custom-apps > name` field as your key as shown here:

```
admin@labsystem1.fiedler# show config running authority service cnn

config

    authority

        service  CNN-service
            name                  CNN-service

            description           "CNN and associated hostnames"
            scope                 private
            application-name      cnn

            access-policy         trusted
                source      trusted
                permission  allow
            exit
            service-policy        data-best-effort
            share-service-routes  false
        exit
    exit
exit
```

## Troubleshooting
Verify the services of the 128T-dns-app-id plugin:
* `systemctl status 128T-dns-app-id`

Watch the journal for logging:
* `journalctl -u 128T-dns-app-id -f`

You can modify the systemd service unit manually to update the log-level of the application from INFO to DEBUG. The systemd service unit is located at `/usr/lib/systemd/system/128T-dns-app-id.service`.

You can use `show device-interface dns-cache` to see all available hostnames and IP addresses found by this plugin.

```
========================================
 tnode:dns-cache
========================================
 Type:                host
 Forwarding:          true
 Mode:                host
 MAC Address:         76:23:37:ed:5c:ae

 Admin Status:        up
 Operational Status:  up
 Redundancy Status:   non-redundant
 Speed:               1000
 Duplex:              full

 in-octets:                     3618779
 in-unicast-pkts:                 57795
 in-errors:                           0
 out-octets:                    2641623
 out-unicast-pkts:                57722
 out-errors:                          0

 records:
   gmail:
     172.217.165.141/32
```

Similarly you can use `show application names`.
```
admin@dc.router# show application names
Sat 2020-03-28 03:28:43 UTC

================== =============== ================ ===================== =====================
 Application Name   Session Count   Ip Tuple Count   Date Discovered       Last Updated
================== =============== ================ ===================== =====================
 gmail                          0               15   2020-06-20 03:28:40   2020-06-20 03:28:40
 google-drive                   0                9   2020-06-20 03:28:40   2020-06-20 03:28:40
 windows-update                 0                1   2020-06-20 03:28:40   2020-06-20 03:28:40
```

## Appendix
Consider the following example configuration

```config
config

    authority

        dns-app-id
            generate-services  true
            base-service       internet
        exit

        router  router1
            name        router1

            dns-app-id
                include-all-builtin-apps  true
            exit
        exit


        service  internet
            name              internet
            application-name  icmp-probe

            access-policy     _internal_
                source  _internal_
            exit

            access-policy     dns-cache-plugin
                source  dns-cache-plugin
            exit
        exit
    exit
exit
```

The above configuration will use the `internet` service as a basis for auto generating services for all built in applications such as `google-drive`, `gmail`, etc. Here's what the generated configuration will look like.

```
config

    authority

        service  gmail_internet
            name              gmail_internet

            applies-to        router
                type         router
                router-name  router1
            exit
            application-name  icmp-probe
            application-name  gmail

            access-policy     _internal_
                source  _internal_
            exit

            access-policy     dns-cache-plugin
                source  dns-cache-plugin
            exit
        exit

        service  google-drive_internet
            name              google-drive_internet

            applies-to        router
                type         router
                router-name  router1
            exit
            application-name  icmp-probe
            application-name  google-drive

            access-policy     _internal_
                source  _internal_
            exit

            access-policy     dns-cache-plugin
                source  dns-cache-plugin
            exit
        exit

        service  windows-update_internet
            name              windows-update_internet

            applies-to        router
                type         router
                router-name  router1
            exit
            application-name  icmp-probe
            application-name  windows-update

            access-policy     _internal_
                source  _internal_
            exit

            access-policy     dns-cache-plugin
                source  dns-cache-plugin
            exit
        exit
    exit
exit
```

## Release Notes

:::warning
The plugin must be updated to version 3.1.3 or later prior to [upgrading the conductor to SSR version 5.4.0.](intro_upgrade_considerations.md#plugin-configuration-generation-changes)
:::

### Release 4.0.2

**Release Date:** Apr 30, 2025

#### Issues Fixed

- **PLUGIN-2949** Resolve stale FIB entries on total expiration of an application's DNS entries
- **PLUGIN-2959** Resolve copying unncessary files on image-based upgrade

### Release 4.0.1

**Release Date:** Oct 31, 2024

#### Issues Fixed

- **PLUGIN-2699** Ensure plugin starts on system reboot or 128T restart
- **PLUGIN-2721** Resolve on plugin downgrade config removal

### Release 4.0.0

Image based install and upgrade (IBU) support for SSR 6.3.0.

**Release Date:** Sep 30, 2024

### Release 3.3.0

**Release Date:** Dec 21, 2023

#### New Features and Improvements
- **PLUGIN-1842** Reduce Conductor CPU time to apply salt states in large scale deployments

By using Saltstack data files, the time and processing to apply high states across all assets is significantly reduced.

### Release 3.2.0

**Release Date:** May 13, 2022

#### New Features and Improvements
- **PLUGIN-1611** Improve HA support for DNS based app-id

The DNS cache plugin is enhanced to synchronize the cache between HA nodes to allow the DNS app-id plugin to consume and process DNS records on both nodes.

### Release 3.1.4

#### Issues Fixed

- **PLUGIN-1452**  DNS cache services constantly fail on system startup.

  _**Resolution:**_ The DNS cache systemd services will be deferred until the SSR services are running and stable.

- **PLUGIN-1461**  Config generation for the plugin failing in versions 5.4 and above.

  _**Resolution:**_ Correctly handle the config generation for routers where the DNS cache plugin is not enabled during config generation on versions 5.4 and above.

- **PLUGIN-1494**  No route being injected into FIB table for dns-app-id custom apps.

  _**Resolution:**_ Automatically enable the module mode on router with dns-app-id config enabled.

### Release 3.1.3

#### Issues Fixed

- **PLUGIN-1461**  Config generation for the plugin failing.

  _**Resolution:**_ Correctly handle the config generation for routers where the plugin is not enabled during config generation.

- **PLUGIN-1226**  DNS App Id state script takes too long to execute.

  _**Resolution:**_ Optimized the execution of the script by simplifying some of the plugin router components.

### Release 2.3.1, 3.1.1

#### Issues Fixed

- **PLUGIN-1099** Fixed an incorrect pattern for matching YouTube application

### Release 1.3.0, 2.3.0, 3.1.0

#### New Features and Improvements
- **PLUGIN-1077** Deprecate patterns in favor of domain-name for custom-apps
- **PLUGIN-1078** Add YouTube to builtins
- **PLUGIN-890** Add support to auto generate services as hierarchical services

### Release 3.0.0

#### Issues Fixed

- **PLUGIN-768** Support the DNS App ID plugin in SSR versions `5.1.0` and greater.
- **PLUGIN-611** Added support for plugin state. Plugin state information can be accessed on the PCLI using `show plugins state [router <router>] [node <node>] [{detail | summmary}] 128T-dns-app-id`

### Release 2.2.1

#### Issues Fixed
- **PLUGIN-993** Automatic generation of services not working after upgrade

    _**Resolution**_ Fix the config generation script to read the data from the file on disk instead of standard input.

### Release 1.2.0, 2.2.0

#### New Features and Improvements
- **PLUGIN-877** Add support for automatic builtin app inclusion, authority wide custom-apps, and automatic service generation.

    - A new toggle for automatically including all builtin applications to keep up-to-date with new apps being added via plugin upgrades.
    - Created a new `dns-app-id` plugin at the authority level to provide means for adding `custom-apps` that apply to all routers in the config with `dns-app-id` enabled.
    - Provide an option to automatically generate services for the configured applications.

### Release 1.1.0, 2.1.0

#### Issues Fixed
- **PLUGIN-809** DNS app-id plugin installation fails due to dependency conflict.

    _**Resolution**_ The 128T-dns-app-id-router RPM has been updated to accept all versions of 128T-dns-cache-router RPM.

### Release 1.0.2, 2.0.2

#### Issues Fixed
- **PLUGIN-402** Ensure SSR monitors new file changes and applications restarts with SSR.

