---
title: DNS App Id Plugin
sidebar_label: DNS App Id
---

The DNS App ID plugin will rely on the DNS cache plugin for hostname resolution and to serve an API that the DNS App Id Plugin will rely on to identify application sessions based on IP addresses.

Read more about the DNS Cache plugin [here](plugin_dns_cache.md).

## Installation

The following versions are available for corresponding 128T software versions:

| DNS App Id | 128T |
| --- | --- |
| 128T-dns-app-id-1.0.0 | 128T >= 3.2.8; 128T < 4.3.0 |
| 128T-dns-app-id-2.0.0 | 128T >= 4.3.0 |

Installing this plugin will automatically install the required DNS Cache plugin too.

:::important
It is recommended to use the conductor GUI > Plugins page for installing plugins. This allows the system to select the correct version of plugin based on the 128T version.
:::

:::important
After installing the plugin, the 128T service on the conductor should be restarted for the changes to take effect.
::::


## Configuration

In addition to the configuration snippet from the dns-cache plugin, add the below configuration:
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
                exit
            exit
        exit
    exit
exit
```

## Use Cases
To identify traffic passing through a 128T Router by applying pattern matching to fqdn names.

You can then configure additional services and service-routes for the identified applications.

### Built-In Patterns

The plugin contains built in application patterns for Gmail, Google Drive, and Windows Update. The patterns were generated from the following published documents:

| Application    | Document |
| -------------- | --- |
| Gmail          | [link](https://support.google.com/a/answer/9497877?hl=en) |
| Google Drive   | [link](https://support.google.com/a/answer/2589954?hl=en) |
| Windows Update | [link 1](https://docs.microsoft.com/en-us/windows-server/administration/windows-server-update-services/deploy/2-configure-wsus#211-connection-from-the-wsus-server-to-the-internet) [link 2](https://docs.microsoft.com/en-us/windows/deployment/update/windows-update-troubleshooting#device-cannot-access-update-files) |

### Custom Patterns
Shown in the above configuration snippet, you can also add your own custom applications and regex patterns to identify new applications passing through your router. The identification is dynamic so you just need to update the configuration on the Conductor to include new apps or patterns.

:::important
If you configure invalid patterns, you will see the log message `invalid pattern for {name}, will never match!`. This means the pattern you configured is not a valid regex therefore the pattern matching will fail for the app {name} until the configuration is fixed.
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
