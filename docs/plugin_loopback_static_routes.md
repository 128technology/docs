---
title: Loopback Static Routes Plugin
sidebar_label: Loopback Static Routes
---

The `128T-loopback-static-routes` plugin provides a way to manage the route table in Linux for the loopback interface called [`kni254`](concepts_kni.md) which is created by default on a 128T router. This is useful to set up the appropriate [Linux host networking](concepts_linux_host_networking.md) when management traffic is traversing a forwarding interface managed by the 128T router.

:::note
The instructions for installing and managing the plugin can be found [here](plugin_intro.md#installation-and-management).
:::

The plugin is designed to provide the following capabilities:

* Add a default route with custom metric towards `kni254`
* Provide a list of static routes (with metric) to direct traffic towards `kni254`
* Automatically learn and program static routes for configured services

## Configuration
The plugin aims to solve several different use cases when it comes to setting up the Linux host routing on a 128T router. The sections below explore each of the supported use cases and their configurations.

### Make kni254 the Default Route in Linux
When a 128T router is deployed at the edge of a network (such as a branch or a store), it typically does not have a dedicated management interface. In such scenarios, the traffic originating in Linux such as DNS, NTP, etc., has to be routed through the 128T platform. The [linux host networking](concepts_linux_host_networking.md#advanced-configuration) document describes the 128T configuration needed to accomplish this in details. The plugin configuration to set up the Linux routing to enable in-band management access is shown below.

```config
authority
    router  router1
        node    node1
        loopback-static-routes
            enabled     true
            default     true
            metric      0
```

:::note
The `metric` of zero will try to make this "the" default route in Linux. If the system has an out-of-band management interface and `kni254` is intended to be a backup default route choose a higher metric.
:::

### Automatically Discover Prefixes from Services
The configuration attribute `learn-from-service`, when enabled, will selectively allow access to configured services. The `kni254` interface always belongs to the `_internal_` tenant and the plugin scans the running 128T configuration for the services that allow access to the `_internal_` tenant.

:::note
The `learn-from-service` config can only be used when `default-route` is set to false.
:::

Consider the following example:
```config
authority
    service dns
        address     8.8.8.8/32
        scope       private
        access-policy
            source      _internal_
            permission  allow

    service conductor_1
        address     172.16.101.10/32
        scope       private
        ...
        access-policy
            source      _internal_
            permission  allow

    service other_service
        address     0.0.0.0/0
        scope       private

    router  router1
        node    node1
        loopback-static-routes
            enabled                 true
            learn-from-services     true
            metric                  128
```

The configuration above will add a static route of `8.8.8.8/32` for the `dns` service and `172.16.101.10/32` for the `_conductor_1_` service. Since the `other_service` does not allow the `_internal_` tenant it will not be considered for adding the static routes towards `kni254`. All prefixes learned through this method will get the same configured metric in Linux. For example both the routes will get a metric of `128` in the above example.

:::note
When the 128T router is running software version 4.3.0 or greater, the learning mode will automatically react to new services being committed to the 128T configuration and keep the Linux host routes in sync.
:::

### Configuring static-route
In addition to, or instead of, learning routes through service definition, the user can add other static prefixes to the configuration. In the example below, first route adds a `/32` with a metric of `100` and second route adds a `/16` with a metric of `200`

```
authority
    router  router1
        node    node1
        loopback-static-routes
            enabled                 true
            default-route           false
            learn-from-services     true
            metric                  128

            static-route
                address     10.10.10.10/32
                metric      100
            static-route
                address     192.168.0.0/16
                metric      200
```

:::note
The `static-route` config can only be used when `default-route` is set to false.
:::

:::info
A service or static-route with prefix `0.0.0.0/0` is the same as setting `default-route` to true for the plugin configuration.
:::

:::important
Once the plugin is enabled, it will take over the management of the `/etc/sysconfig/network-scripts/route-kni254` file. This implies that when conductor services or other features such as management-over-forwarding are used its important to leave the `learn-from-services` flag set to true. Otherwise you could miss routing some of the traffic towards `kni254` and some services might not work as intended.
:::


## Troubleshooting

#### Service Inspection
When the plugin configuration is updated, the `128T-handle-loopback-static-routes-config.path` service will react to those changes and update the `kni254` routes. The `128T-handle-loopback-static-routes-config.service` can be checked for troubleshooting.

```console
# systemctl status 128T-handle-loopback-static-routes-config.service
● 128T-handle-loopback-static-routes-config.service - Config Handler for 128T loopback static route plugin
   Loaded: loaded (/usr/lib/systemd/system/128T-handle-loopback-static-routes-config.service; static; vendor preset: disabled)
   Active: inactive (dead) since Wed 2020-07-01 22:35:51 UTC; 3s ago
  Process: 20458 ExecStart=/usr/bin/handle_loopback_static_route_config (code=exited, status=0/SUCCESS)
 Main PID: 20458 (code=exited, status=0/SUCCESS)

Jul 01 22:35:46 t102-dut2.openstacklocal systemd[1]: Starting Config Handler for 128T loopback static route plugin...
...
Jul 01 22:35:46 t102-dut2.openstacklocal python3.6[20458]: plugins.loopback_static_routes.router.handle_config.process_config - Setting default-route for kni254 with metric 0
Jul 01 22:35:46 t102-dut2.openstacklocal python3.6[20458]: plugins.loopback_static_routes.router.handle_config.route_config - Updating route config file /etc/sysconfig/network-scripts/route-kni254
Jul 01 22:35:46 t102-dut2.openstacklocal handle_loopback_static_route_config[20458]: Successfully generated static routes for kni254 loopback interface
Jul 01 22:35:51 t102-dut2.openstacklocal systemd[1]: Started Config Handler for 128T loopback static route plugin.
```

#### Route Inspection
The plugin updates the `/etc/sysconfig/network-scripts/route-kni254` file and applies the route to `kni254`. Here's an example of what the file would look like on a running system depending on the configuration.

```
# cat /etc/sysconfig/network-scripts/route-kni254
# Generated by loopback static-routes plugin. Do not edit below this line.
192.168.1.6/32 via 169.254.127.126 dev kni254
8.8.8.8/32 via 169.254.127.126 dev kni254
```

## Release Notes

### Release 4.0.0

#### Issues Fixed

- **PLUGIN-768** Support the Loopback Static Routes plugin in 128T versions `5.1.0` and greater.
