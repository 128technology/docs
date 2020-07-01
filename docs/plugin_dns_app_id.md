---
title: DNS App Id Plugin
sidebar_label: DNS App Id
---

The DNS App ID plugin will identify traffic passing through your 128T router by applying pattern matching to FQDN names. You can then configure 128T services and associate application names to influence routing policy. You can read more about 128T and its application identification concept [here](concepts_appid.md).

This plugin will rely on the [DNS Cache](plugin_dns_cache.md) plugin for hostname resolution.

:::note
The instructions for installing and managing the plugin can be found [here](plugin_intro#installation-and-management).
:::

## Configuration

In addition to the configuration snippet from the [dns-cache](plugin_dns_cache.md) plugin, the below configuration shows an example of dns-app-id configuration:
```
configure
    authority
        router ${DUT2_ROUTER}
            application-identification mode
            dns-app-id
                enabled true
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

### Built-In Patterns

The plugin contains built in application patterns for Gmail, Google Drive, and Windows Update. The patterns were generated from the following published documents:

| Application    | Document |
| -------------- | --- |
| Gmail          | [link](https://support.google.com/a/answer/9497877?hl=en) |
| Google Drive   | [link](https://support.google.com/a/answer/2589954?hl=en) |
| Windows Update | [link 1](https://docs.microsoft.com/en-us/windows-server/administration/windows-server-update-services/deploy/2-configure-wsus#211-connection-from-the-wsus-server-to-the-internet) [link 2](https://docs.microsoft.com/en-us/windows/deployment/update/windows-update-troubleshooting#device-cannot-access-update-files) |

As you can see in the configuration snippet above, all you need to configure for the builtin-apps are the names of the apps you wish to include in our pattern matching. The values you can configure are `gmail`, `google-drive`, and `windows-update`.


### Custom Patterns
Also shown in the configuration snippet is the custom-app `cnn` that includes a list of patterns to be applied. Each pattern must be a valid regex that will be applied to a FQDN to identify the application. The identification is dynamic so you just need to update the configuration on the conductor to include new apps or patterns for your routers.

#### Example
This example shows our builtin gmail application's pattern matching configured as a custom-app. You should not use this example in production, but is intended to document how to build out complicated pattern matching for an application.

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

## Troubleshooting
Verify the services of the 128T-dns-app-id plugin:
* `systemctl status 128T-dns-app-id`

Watch the journal for logging:
* `journalctl -u 128T-dns-app-id -f`

You can modify the systemd service unit manually to update the log-level of the application from INFO to DEBUG.

You can use `show device-interface dns-cache` to see all available fqdn and IP addresses found by this plugin.

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
   Gmail:
     172.217.165.141/32
```

Similarly you can use `show application names`.
```
admin@dc.router# show application names
Sat 2020-03-28 03:28:43 UTC

================== =============== ================ ===================== =====================
 Application Name   Session Count   Ip Tuple Count   Date Discovered       Last Updated
================== =============== ================ ===================== =====================
 Gmail                          0               15   2020-06-20 03:28:40   2020-06-20 03:28:40
 GoogleDrive                    0                9   2020-06-20 03:28:40   2020-06-20 03:28:40
 WindowsUpdate                  0                1   2020-06-20 03:28:40   2020-06-20 03:28:40
```
