---
title: HTTP Probe Reachability Detection Plugin
sidebar_label: HTTP Probe Reachability Detection
---
The http-probe plugin is designed to leverage the reachability detection APIs that were introduced in the SSR as of 5.2.0 version of software. More documentation on the core product feature can be found [here](config_service_health.md)

:::note
The instructions for installing and managing the plugin can be found [here](plugin_intro.md#installation-and-management).
:::

## Overview
Once installed and configured properly, the plugin will do the following operations on the router.

* Launch a set of HTTP(s) monitor services which will probe the configured HTTP or HTTPs URL at the configured frequency
* Periodically update the load-balancer APIs with the up/down status on service-paths associated with the http-probes

:::note
For HTTPS probes, the client will allow self-signed certificates for inspecting the reachability status of the service.
:::

## Configuration Snippet
The plugin leverages the existing SSR reachability detection and enforcement configuration within the service-route on the router.

### HTTP Profile configuration
* Config Path: authority > router[name] > http-probe-profile
* Config Fields:


| Name  | Type    | Constraints | Description                             |
| --    | --      | --          | --                                      |
| name  | string  | key         | The name of the http probe profile      |
| url   | string  | max: 2048   | A valid http or https URL to be used for availability checking      |
| probe-interval | uint32 | default: 10 | The duration (in seconds) of how often to perform a link test to the destination |
| number-of-attempts | uint32 | default: 4 | The number of consecutive HTTP(s) requests to be sent within the probe-duration before deciding that destination is unreachable |
| probe-duration | uint32 | default: 5 | The duration (in seconds) within which to reach the destination. Each attempt will be made in (probe-duration / number-of-attempts) interval |
| valid-status-code | list | at least 1 value required | The list of valid status codes to be expected from the server |

* Example:
```config {9-14}

config

    authority

        router  my-router
            name                my-router

            http-probe-profile  http-probe-1
                name               http-probe-1
                url                http://172.16.2.5:5060/
                valid-status-code  202
                valid-status-code  200
            exit
        exit
    exit
exit
```

### Service route configuration
Once the profile is created, the next step is to enable the reachability enforcement and probe detection for a non SVR service-route and reference the profile in that config.

* Config Path: authority > router[name] > service-route[name] > reachability-detection

* Config Fields:
The following fields should be enabled for the probe based detection to work. The http-probe mechanism is based on the concept of health probes described [here](https://docs.128technology.com/docs/config_service_health/#health-probes). The configuration fields below are required for the system to react to the loadbalancer API calls that the plugin makes.

| Name  | Type    | Value | Description                             |
| --    | --      | --          | --                                      |
| enforcement | boolean | true | Toggle the configuration to be enabled for the reachability enforcement to take effect. |
| probe-type | enumeration | always | For probe based reachability detection to take effect the probe-type must be set to `always`. |
| hold-down | uint32 | probe-duration * 2 | The `hold-down` time is the amount of time in seconds that the path is kept out-of-service when path transitions from down to up. |
| probe > probe-type | enumeration | http-probe | The probe-type must be set to `http-probe` in order to leverage the HTTP(s) based probing |
| probe > http-probe-profile | reference | - | Reference to a previously configured http-probe-profile on the router |

:::warning
The `reachability-detection > probe` configuration allows for multiple probes of various types to be configured. All the probes for a given service-route must be up for the route to be considered as up.
:::


### Probe reachability
The router should have a distinct path for the probe traffic. It is recommended that the user create dedicated services and service routes for this purpose. At this time, the plugin does not generate any configuration to ensure the reachability of the probe traffic to the destination. The probe will be originated in the default linux environment. In case of in-band management, the probe traffic will be associated with the `_internal_` tenant so care must be taken to allow the tenant when creating such config. As a reference the following configuration represents a service and route to reach one of the HTTP probes in this document.

```
config

    authority

        service  http-probe-1
            name                  http-probe-1

            transport             tcp
                protocol    tcp

                port-range  5060
                    start-port  5060
                exit
            exit
            address               172.16.2.5

            access-policy         _internal_
                source  _internal_
                permission allow
            exit
            share-service-routes  false
        exit

        router  my-router
            name           my-router

            service-route  http-probe-rte-1
                name          http-probe-rte-1
                service-name  http-probe-1

                next-hop      node1 wan
                    node-name  node1
                    interface  wan
                exit
            exit
        exit

    exit
exit
```

## Use Cases

### Path selection
One of the primary use cases of the plugin would be to monitor the internet or some other service reachability by pinging an HTTP server over a given service path. This is very much similar in concept to the native ICMP probe functionality that exists in the product.

### Proportional Load balancing via destination NATs
In this use case, a particular service or workflow is designed to be load balanced across several upstream servers by doing a proportional load balancing along with destination NAT. In this use case, the SSR http-probe plugin can be used to monitor the service status of each of those upstream servers to determine if the particular server should be in service or not from routing perspective. The following configuration snippet builds on the example above to demonstrate this scenario.

In this example, both `test-app-route-1` and `test-app-route-2` are equal cost routes used for proportional load balancing.

```config
config

    authority

        router  my-router
            name           my-router

            service-route  test-app-route-1
                name                    test-app-route-1
                service-name            test-app
                vector                  path1
                nat-target              172.16.2.5

                next-hop                node1 wan-bb
                    node-name  node1
                    interface  wan-bb
                exit

                reachability-detection
                    enabled               true
                    enforcement           true
                    hold-down             60
                    reachability-profile  dummy
                    probe-type            always

                    probe                 probe1
                        name                probe1
                        http-probe-profile  http-probe-1
                    exit
                exit
            exit

            service-route  test-app-route-2
                name                    test-app-route-2
                service-name            test-app
                vector                  path2
                nat-target              172.16.3.5

                next-hop                node1 wan-lte
                    node-name  node1
                    interface  wan-lte
                exit

                reachability-detection
                    enabled               true
                    enforcement           true
                    hold-down             60
                    reachability-profile  dummy
                    probe-type            always

                    probe                 probe2
                        name                probe2
                        http-probe-profile  http-probe-2
                    exit
                exit
            exit
        exit
    exit
exit

admin@node1.conductor1#

```

Each service-route is designed to probe a unique URL for that servers and monitors the health of the service at the TCP socket level as well as the HTTP stack. When one of the servers cannot be reached or responds with a unsuccessful status code (e.g. 404, 504 etc) the service path is taken out of service.

:::warning
When all the service routes associated with the same service are down, the default system behavior is to operates in a `best-effort` mode in which the physical link and L2 connectivity is used to determine the health of the path. In this case, it's possible that sessions are routed to paths that are down from a probe perspective. As soon as one of the paths comes back in service, the load balancer will start using that path for all subsequent new sessions. The `best-effort` flag can be set to false for the associated service-policy to disable this behavior.
:::


## Troubleshooting

### Checking the probe status
The `show service-path` command can be used to view the current status of the probe and to view how the load balancer is interpreting the current status. For example:

```
admin@node1.conductor1# show service-path router my-router node node1 service-name test-app
Sun 2021-11-07 03:19:33 UTC
Node: node1.my-router Page 1

========== ================== =============== =============== ============ =========== ======== ====== ====== ========== ==========
 Service    Service-Route      Type            Destination     Next-Hop     Interface   Vector   Cost   Rate   Capacity   State
========== ================== =============== =============== ============ =========== ======== ====== ====== ========== ==========
 test-app   test-app-route-1   service-agent   172.16.2.5/32   172.16.2.5   wan-bb      path1     100      0   0/100      Up(Up)
 test-app   test-app-route-2   service-agent   172.16.3.5/32   172.16.3.5   wan-lte     path2     100      0   0/100      Up(Down)

Completed in 0.05 seconds
admin@node1.conductor1#admin@node1.conductor1#
```

In addition, the probe's running status in linux can be found by inspecting the `128T-http-probe-status-change-notifier@<probe-name>.service`. For example,

```
# systemctl status 128T-http-probe-status-change-notifier@http-probe-2.service -l
● 128T-http-probe-status-change-notifier@http-probe-2.service - HTTP Monitor Status change observer for destination http-probe-2
   Loaded: loaded (/usr/lib/systemd/system/128T-http-probe-status-change-notifier@.service; static; vendor preset: disabled)
   Active: inactive (dead) since Sun 2021-11-07 03:22:43 UTC; 8s ago
  Process: 24823 ExecStart=/usr/libexec/128T-http-probe/scripts/loadbalancer_cli --probe-name ${NAME} determine-status --status ${STATUS} --code ${CODE} (code=exited, status=0/SUCCESS)
 Main PID: 24823 (code=exited, status=0/SUCCESS)

Nov 07 03:22:42 my-router.openstacklocal systemd[1]: Starting HTTP Monitor Status change observer for destination http-probe-2...
Nov 07 03:22:43 my-router.openstacklocal loadbalancer_cli[24823]: Determine status for probe http-probe-2 with status down and code 0
Nov 07 03:22:43 my-router.openstacklocal loadbalancer_cli[24823]: Skipping service-route test-app-route-1 with profile {'validStatusCode': [202, 200], 'probeDuration': 5, 'numberOfAttempts': 4, 'probeInterval': 10, 'name': 'http-probe-1', 'url': 'http://172.16.2.5:5060/'}
Nov 07 03:22:43 my-router.openstacklocal loadbalancer_cli[24823]: Processing service-route test-app-route-2 with profile {'validStatusCode': [202, 200], 'probeDuration': 5, 'numberOfAttempts': 4, 'probeInterval': 10, 'name': 'http-probe-2', 'url': 'http://172.16.3.5:5061/'}
Nov 07 03:22:43 my-router.openstacklocal loadbalancer_cli[24823]: http-probe-2: Setting service-path test-app-route-2 for service test-app as down
Nov 07 03:22:43 my-router.openstacklocal systemd[1]: Started HTTP Monitor Status change observer for destination http-probe-2.
```

## Triggering Manual Failover Or Recovery
In some situations, it might be desirable to forcefully trigger a failover or recovery for an otherwise healthy path. In the above example, the primary `http-probe-1` can be brought down by doing the following:

- Stop the http-monitor service for the path instance

```bash
# systemctl stop http-monitor@http-probe-1.service
```

- Edit the `/var/run/128technology/plugins/http_monitor/{probe-name}.state` and set the `STATUS=down`

```bash
# echo "STATUS=down" >> /var/run/128technology/plugins/http_monitor/http-probe-1.state

# systemctl status 128T-http-probe-status-change-notifier@http-probe-1.service -l
● 128T-http-probe-status-change-notifier@http-probe-1.service - HTTP Monitor Status change observer for destination http-probe-1
   Loaded: loaded (/usr/lib/systemd/system/128T-http-probe-status-change-notifier@.service; static; vendor preset: disabled)
   Active: inactive (dead) since Sun 2021-11-07 03:27:34 UTC; 45s ago
  Process: 29533 ExecStart=/usr/libexec/128T-http-probe/scripts/loadbalancer_cli --probe-name ${NAME} determine-status --status ${STATUS} --code ${CODE} (code=exited, status=0/SUCCESS)
 Main PID: 29533 (code=exited, status=0/SUCCESS)

Nov 07 03:27:34 my-router.openstacklocal systemd[1]: Starting HTTP Monitor Status change observer for destination http-probe-1...
Nov 07 03:27:34 my-router.openstacklocal loadbalancer_cli[29533]: Determine status for probe http-probe-1 with status down and code 200
Nov 07 03:27:34 my-router.openstacklocal loadbalancer_cli[29533]: Processing service-route test-app-route-1 with profile {'validStatusCode': [202, 200], 'probeDuration': 5, 'numberOfAttempts': 4, 'probeInterval': 10, 'name': 'http-probe-1', 'url': 'http://172.16.2.5:5060/'}
Nov 07 03:27:34 my-router.openstacklocal loadbalancer_cli[29533]: http-probe-1: Setting service-path test-app-route-1 for service test-app as down
Nov 07 03:27:34 my-router.openstacklocal loadbalancer_cli[29533]: Skipping service-route test-app-route-2 with profile {'validStatusCode': [202, 200], 'probeDuration': 5, 'numberOfAttempts': 4, 'probeInterval': 10, 'name': 'http-probe-2', 'url': 'http://172.16.3.5:5061/'}
Nov 07 03:27:34 my-router.openstacklocal systemd[1]: Started HTTP Monitor Status change observer for destination http-probe-1.
```

:::tip
The same steps can be used to bring `up` a path that is currently `down` by changing `STATUS=up` in the steps above.
:::

:::tip
Additional debugging can be turned on for the `http-monitor` instance by setting `LOG_LEVEL=DEBUG` in `/var/run/128technology/plugins/http_monitor/{probe-name}.conf` config file
:::
