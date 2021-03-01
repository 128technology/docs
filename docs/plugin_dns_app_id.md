---
title: DNS App Id Plugin
sidebar_label: DNS App Id
---

The DNS App ID plugin identifies traffic passing through your 128T router by applying pattern matching to hostnames contained in DNS requests it processes. You can then configure 128T services for these hostnames, and associate application names to influence routing policy. You can read more about 128T and its application identification concept [here](concepts_appid.md).

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
                    patterns cnn.com
                    patterns .*\\.cnn.com
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
| custom-apps > patterns | regex | A regular expression pattern for matching to DNS requests that the 128T processes. |

### Built-In Patterns

##### Version History

| Release      | Modification                                    |
| ------------ | ----------------------------------------------- |
| 1.2.0, 2.2.0 | `include-builtin-apps` was introduced |

The plugin contains built in application patterns for Gmail, Google Drive, and Windows Update. The patterns were generated from the following published documents:

| Application    | Document |
| -------------- | --- |
| Gmail        | [link](https://support.google.com/a/answer/9497877?hl=en) |
| Google Drive   | [link](https://support.google.com/a/answer/2589954?hl=en) |
| Windows Update | [link 1](https://docs.microsoft.com/en-us/windows-server/administration/windows-server-update-services/deploy/2-configure-wsus#211-connection-from-the-wsus-server-to-the-internet) [link 2](https://docs.microsoft.com/en-us/windows/deployment/update/windows-update-troubleshooting#device-cannot-access-update-files) |

By enabling the `include-all-builtin-apps` configuration, the plugin will automatically include all the available apps. This allows for new apps to be automatically included as new builtin apps are added over time. Alternatively, you can choose specific builtin apps by name, as shown in the snippet above. The values you can configure are `gmail`, `google-drive`, and `windows-update`.


### Custom Patterns

##### Version History

| Release      | Modification                                    |
| ------------ | ----------------------------------------------- |
| 1.2.0, 2.2.0 | Support for adding custom-apps at authority level was introduced |

The plugin also allows the user to create their own definitions of applications by configuring a set of patterns to be used for matching the application. Each pattern must be a valid regex that will be applied to a FQDN to identify the application. The `authority > dns-app-id > custom-apps` config can be used to define patterns that apply to all the routers with `dns-app-id` functionality enabled. Also shown in the configuration snippet is the custom-app `cnn` that includes a list of patterns to be applied at the router level. The identification is dynamic, so you just need to update the configuration on the conductor to include new apps or patterns for your routers. When `custom-apps` are configured at the authority and router level, the two lists are combined at runtime for that particular router. For example, if the user configured a custom-app called `zoom` on the authority and another app called `cnn` on the router, the router will contain both the applications.

:::note
The `.` character bears special meaning within regular expressions, and matches *any single character*. Because hostnames contain literal `.` characters, in order to explicitly reference a dot separator, you must prefix it with **two** backslash characters. I.e., to have a pattern match the hostname `www.128technology.com`, you would type it into the PCLI as `www\\.128technology\\.com`. The PCLI will render the double backslash characters as a single backslash when you `show` the configuration.
:::

#### Example
This example shows our builtin `gmail` application's pattern matching configured as a custom-app. You should not use this example in production, but is intended to document how to build out complicated pattern matching for an application.

```
custom-apps gmail
    name gmail
    patterns .*\\.client-channel\\.google\\.com
    patterns accounts\\.google\\.com
    patterns apis\\.google\\.com
    patterns clients.*\\.google\\.com
    patterns contacts\\.google\\.com
    patterns hangouts\\.google\\.com
    patterns .*\\.googleusercontent\\.com
    patterns mail\\.google\\.com
    patterns www\\.google\\.com
    patterns .*\\.gstatic\\.com
    patterns ogs\\.google\\.com
    patterns play\\.google\\.com
exit
```

:::important
If you configure invalid regex patterns, you will see the log message `invalid pattern for {name}, will never match!`. This means the pattern you configured is not a valid regex therefore the pattern matching will fail for the app until the configuration is fixed.
::::

### Automatic Service Generation

##### Version History

| Release      | Modification                                    |
| ------------ | ----------------------------------------------- |
| 1.2.0, 2.2.0 | This capability was introduced  |

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
| base-service | service-reference | The generated application service will inherit all the properties such as access-policy, service-policy, etc, from the base service. |
| custom-apps | subelement | Multiple instance object. Allows administrators to define custom patterns for matching applications. |
| custom-apps > name | string | The name of the custom-app. This value will subsequently be configured within a `service > application-name` to give treatment to that application. |
| custom-apps > description | string | A human-readable description of the custom application. |
| custom-apps > patterns | regex | A regular expression pattern for matching to DNS requests that the 128T processes. |

Refer to the [Appendix](#appendix) for an example of the config generation.

#### Manually associating with a Service

When auto-generation is not an option, the user can configure the appropriate application services explicitly. Because the DNS AppID uses the same mechanism as a standard 128T [AppID module](concepts_appid.md#appid-using-modules), you'll reference the application using the `application-name` field within a `service` configuration. In the `application-name` field, use the `custom-apps > name` field as your key as shown here:

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

### Release 3.0.0

#### Issues Fixed

- **PLUGIN-768** Support the DNS App ID plugin in 128T versions `5.1.0` and greater.
- **PLUGIN-611** Add a plugin state endpoint with summary and detail verbosity. State information can be accessed on the PCLI using `show plugins state [router <router>] [node <node>] [{detail | summmary}] 128T-dns-app-id`

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
- **PLUGIN-402** Ensure 128T monitors new file changes and applications restarts with 128T.

