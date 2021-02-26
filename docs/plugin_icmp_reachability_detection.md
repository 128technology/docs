---
title: ICMP Reachability Detection Plugin
sidebar_label: ICMP Reachability Detection
---

The ICMP reachability detection plugin is designed to solve the problem where upstream next-hop failures cause 128T to blackhole traffic for non-SVR services. When a 128T router is provisioned to send traffic towards operationally valid next-hop(s), one of those next-hops might be incapable of delivering the packets to the final destination due to upstream failures beyond simple link or ARP failures causing the traffic being blackholed. The ICMP reachability detection plugin solves this problem by pinging a destination for reachability and allowing new sessions to failover to alternate paths when the primary path is unreachable. The plugin can also be used to perform a similar probe end-to-end to a server over SVR and trigger a failover in the same manner.

:::note
The instructions for installing and managing the plugin can be found [here](plugin_intro.md#installation-and-management).
:::


## Overview
 The plugin is designed to assist with failover for services that use a hunt based strategy, where traffic prefers one path over another during normal operations. (As opposed to a proportional distribution strategy which leverages multiple paths simultaneously.). If the router has two wan interfaces - broadband and LTE, the plugin can be set up to use broadband as the primary path and LTE as the secondary path. The plugin works by performing a continuous ICMP ping for the configured service(s) over each of the specified paths. A unique [application-id module](concepts_appid.md#appid-using-modules) based service is generated to represent each of the potential paths. When the primary path is reachable, the corresponding primary path service will be activated to route the sessions. In the event of the primary path failure, the secondary path service will be activated and all subsequent sessions will then be routed using the new service.

## Plugin Behavior
At the core of the plugin is the `ping-monitor` utility which will be used to do a continuous ping to the destination over all available paths. The `icmp-probe-agent` will be notified of any path status changes by the `ping-monitor` to help make decisions on how to update the application module configuration. The `service-route > icmp-probe > vector-priority` will be used to sort the paths in logical order.

The application module JSON will be set up based on the `service > icmp-probe` configuration to learn the address and transport. For the example above, the JSON for the primary path will look like this:

```json
{
  "module-name": "icmp-probe-internet",
  "duration": 86400,
  "continue-file-watch": true,
  "services": {
    "icmp-internet-broadband": [
      {
        "ip-prefix": "0.0.0.0/0"
      }
    ]
  }
}
```

### Sunny Day Scenario

The diagram below shows two available paths - broadband and LTE. In a sunny day scenario, the plugin will perform continuous pings to the destination and report the status as up. In this case, the configured `service > icmp-probe > address` will be configured in the application module for broadband service. This in turn will trigger the 128T router to install the FIB entries for the `internet-broadband` service and all incoming sessions will be routed to the only available path for that service called `rte-internet-broadband`. This is essentially why the plugin can only operate in hunt mode.

![Sunny Day Scenario](/img/icmp_probe_sunny_day_scenario.png)

### Primary Path Failure Scenario
The diagram below depicts the failure to ping the server over the broadband interface. This failure would typically cause the traffic to be blackholed as the upstream ISP gateway is still reachable via ARP. The ICMP probe plugin, however, will detect the server ICMP failure and will in turn update the application module JSON for the LTE service with the configured `service > icmp-probe > address`. As a result of this, the 128T router will remove the FIB entries for the broadband service and replace it with FIB entries for the internet-lte service. All subsequent sessions will then be routed using the only available rte-internet-lte service route.

![Primary Path Failure](/img/icmp_probe_primary_path_failover_scenario.png)

### Primary Path Recovery Scenario
As soon as the primary path (broadband in the above example) is reachable, the ICMP probe process will update application module JSON with the `internet-broadband` service. This will cause the subsequent sessions to migrate back to the primary broadband interface. When the primary path comes up the system will wait `service > icmp-probe > hold-down` seconds before bringing it in service. This will act as a damper in case the path is flapping too frequently.

### All Path Failures
The `service-policy > best-effort` flag will determine the behavior of the `icmp-probe-agent` in the event where all paths are down. When `best-effort > false`, the agent will update the application module with a `dummy` service name which would cause all FIB entries associated with the service to be withdrawn and the client connections to be rejected with an ICMP unreachable. When `best-effort > true`, the agent will update the JSON with the primary path as defined by the vector-priority.

## Configuration

For the plugin to operate we need to identify all the paths that can be used to reach the service. This is typically achieved by configuring a `service-route` on the router. The plugin configuration will leverage application-names and service-route to generate other relevant configurations.

### ICMP Probe Enablement
The ICMP probe plugin is enabled on the target router as shown in the configuration excerpt below:

```config
admin@node1.conductor1# show config running authority router router1 icmp-probe

config

    authority

        router  router1
            name        router1

            icmp-probe
                enabled  true
            exit
        exit
    exit
exit
```

| Element | Type    | Properties | Description                                       |
| ------- | ------- | -----------| ------------------------------------------------- |
|enabled | boolean | default: true | Control whether the plugin is to be run on the router |
|plugin-network| ip-prefix | default: 169.254.142.0/28 | This controls the IP address for the internal network for carrying the ICMP ping packets. This should only be changed if there is a conflict with another IP block in use on the same host system. |


### Service Definition
By setting the `service > application-name > icmp-probe` a `service` can be designated as a candidate for performing ICMP probe based monitoring. For example:

```config
admin@node1.conductor1# show config running authority service internet

config

    authority

        service  internet
            name              internet
            application-name  icmp-probe

            access-policy     lan
                source  lan
            exit

            access-policy     _internal_
                source  _internal_
            exit

            icmp-probe
                address    0.0.0.0/0
                hold-down  6
            exit
        exit
    exit
exit

```

| Element | Type    | Properties | Description                                     |
| ------- | ------- | -----------|------------------------------------------------ |
| address | ip-prefix | mandatory | The list of addresses to be associated with the service. These are the same addresses that a user would typically configure as the `service > address` |
|hold-down| seconds | default: 5 | The amount of time a path must remain up before considering it as reachable after detecting a failure.|

The following considerations should be made for defining the service properties:

- The `service > name` is used to auto-generate services of the form `{service-name}-{path-name}`. If the combined names are larger than 255 characters it will result in validation errors.
- The `service > service-policy > lb-strategy` is assumed to be `hunt` and is recommended to be set to that for clarity. Even if the policy is set to `proportional`, the plugin creates unique services per path so the end behavior will still be `hunt`.
- All the other service configuration such as access-policy, service-policy, etc., will be copied into generated services for application identification.

:::note
When enabling ICMP probe for SVR paths any auto-generated `peer` or `next-peer` service-route should be set to `generated > false` before adding the ICMP probe configuration.
:::

:::note
The `service > transport` can be configured to restrict the service to specific protocol and port ranges. The generated service will copy that configuration from the `icmp-probe` service.
:::

### Service Route Definition

The `service-route` configuration is used to identify unique paths for a given service along with configuring the rest of the ICMP probe settings. For example:

```config
admin@node1.conductor1# show config running authority router router1 service-route internet-orig-broadband

config

    authority

        router  router1
            name           router1

            service-route  internet-bb-rte
                name          internet-bb-rte
                service-name  internet

                next-hop      node1 broadband-intf
                    node-name  node1
                    interface  broadband-intf
                exit

                icmp-probe
                    path-name        broadband
                    vector-priority  10
                    probe-address    8.8.8.8
                    probe-interval   10
                    number-of-retries 4
                    retry-interval    1
                exit
            exit
        exit
    exit
exit

admin@node1.conductor1# show config running authority router router1 service-route internet-orig-lte

config

    authority

        router  router1
            name           router1

            service-route  internet-lte-rte
                name          internet-lte-rte
                service-name  internet

                next-hop      node1 lte-intf
                    node-name   node1
                    interface   lte-intf
                exit

                icmp-probe
                    path-name        lte
                    vector-priority  20
                    probe-address    9.9.9.9
                    retry-interval   1
                exit
            exit
        exit
    exit
exit

```

| Element | Type    | Properties | Description                                     |
| ------- | ------- | -----------|------------------------------------------------- |
| path-name | string | required | The name to uniquely identify a single path. |
| vector-priority | integer | required | Priority value for the path. Lower vector-priority values take precedence for load balancing upon path failure. |
| probe-address | ip-address | optional | Address to ping for determining path health. When a service is defined with a single /32 address, the service > address will be used as the ICMP destination |
| probe-interval | seconds | default: 10| Duration of how often to perform an ICMP probe test to the `probe-address` |
| number-of-retries | integer | default: 5| Number of consecutive missed ICMP ping responses from the destination within the retry-interval before deciding that the path is unusable.|
| retry-interval | seconds | default: 5 | Duration within which to reach the destination. Each attempt will be made in duration / number-of-retries interval |

The following considerations should be made while configuring the service-route for the plugin:

- Each unique path on the router should correspond to a unique value for `service route > next-hop > icmp-probe > path-name`. For example, if the router has two interfaces broadband and LTE, each would be represented with a unique `path-name`.
- Each `service route > next-hop > icmp-probe > path-name` should represent a single path on the router. This will be used for generating KNIs, tenants and other configurations required to make the implementation work. Failure to do so will result in the auto config generation to fail.
- The `service route > next-hop > icmp-probe > vector-priority` should reflect the order in which the paths are to be preferred for routing
- When the `icmp-probe > probe-address` is not configured, the service should have a single /32 address for the probe to work. Failure to do so will result in the auto config generation to fail.
- When the service covers more than a single address (such as 0.0.0.0/0), the `icmp-probe > probe-address` effectively ties the reachability fate of the entire service and path to that single server. This could cause some false positives in reporting the path as down if the upstream server is facing some issues.


:::note
The plugin can support any number of paths to be monitored for activity. Each of th path must have a unique vector-priority associated with them to determine the preference order.
:::

## Triggering Manual Failover Or Recovery
In some situations, it might be desirable to forcefully trigger a failover or recovery for an otherwise healthy path. In the above example, the primary `broadband` can be brought down by doing the following:

- Stop the ping-monitor service for the path instance

```bash
# curl --unix-socket /var/run/128technology/plugins/icmp-probe-agent.sock http://localhost/path-info
{"internet": {"current-path": "broadband", "paths": {"broadband": "up", "lte": "up"}}}

# systemctl stop ping-monitor-namespace@internet-broadband.service
```

- Edit the `/var/run/128technology/plugins/ping_monitor/{service}-{path}.state` and set the `STATUS=down`

```bash
# echo "STATUS=down" >> /var/run/128technology/plugins/ping_monitor/internet-broadband.state

# curl --unix-socket /var/run/128technology/plugins/icmp-probe-agent.sock http://localhost/path-info
{"internet": {"current-path": "lte", "paths": {"broadband": "down", "lte": "up"}}}

# systemctl status 128T-icmp-probe-agent.service -l
● 128T-icmp-probe-agent.service - ICMP probe agent
   Loaded: loaded (/usr/lib/systemd/system/128T-icmp-probe-agent.service; enabled; vendor preset: disabled)
   Active: active (running) since Thu 2020-07-30 04:56:07 UTC; 18min ago
 Main PID: 32226 (python3.6)
    Tasks: 18
   Memory: 22.8M
   CGroup: /system.slice/128T-icmp-probe-agent.service
           └─32226 python3.6 /usr/lib/128T-icmp-reachability-detection//par/icmpProbeAgent.par -l DEBUG

Jul 30 05:14:42 t102-dut2.openstacklocal python3.6[32226]: plugins.icmp_reachability_detection.router.icmp_probe_agent.app_id - Processing: 0.0.0.0/0 None
Jul 30 05:14:42 t102-dut2.openstacklocal python3.6[32226]: t128.plugin.lib.app_id.builder - Updating /var/run/128technology/application-modules/icmp-probe-internet.json with
                                                           {
                                                             "module-name": "icmp-probe-internet",
                                                             "duration": 86400,
                                                             "continue-file-watch": true,
                                                             "services": {
                                                               "icmp-internet-lte": [
                                                                 {
                                                                   "ip-prefix": "0.0.0.0/0"
                                                                 }
                                                               ]
                                                             }
                                                           }
Jul 30 05:14:42 t102-dut2.openstacklocal python3.6[32226]: plugins.icmp_reachability_detection.router.icmp_probe_agent.state_machine - Advancing from State.PathUp->State.PathUp
Jul 30 05:14:42 t102-dut2.openstacklocal python3.6[32226]: aiohttp.access -  [30/Jul/2020:05:14:42 +0000] "POST /ping-status HTTP/1.1" 200 180 "-" "curl/7.29.0"
Jul 30 05:14:42 t102-dut2.openstacklocal python3.6[32226]: plugins.icmp_reachability_detection.router.icmp_probe_agent.agent - Handling status request
Jul 30 05:14:42 t102-dut2.openstacklocal python3.6[32226]: plugins.icmp_reachability_detection.router.icmp_probe_agent.agent - internet received {'current-path': 'lte', 'paths': {'broadband': 'down', 'lte': 'up'}}
Jul 30 05:14:42 t102-dut2.openstacklocal python3.6[32226]: aiohttp.access -  [30/Jul/2020:05:14:42 +0000] "GET /path-info HTTP/1.1" 200 239 "-" "curl/7.29.0"
Jul 30 05:14:43 t102-dut2.openstacklocal python3.6[32226]: plugins.icmp_reachability_detection.router.icmp_probe_agent.agent - Handling status request
Jul 30 05:14:43 t102-dut2.openstacklocal python3.6[32226]: plugins.icmp_reachability_detection.router.icmp_probe_agent.agent - internet received {'current-path': 'lte', 'paths': {'broadband': 'down', 'lte': 'up'}}
Jul 30 05:14:43 t102-dut2.openstacklocal python3.6[32226]: aiohttp.access -  [30/Jul/2020:05:14:43 +0000] "GET /path-info HTTP/1.1" 200 239 "-" "curl/7.29.0"
```

:::tip
The same steps can be used to bring `up` a path that is currently `down` by changing `STATUS=up` in the steps above.
:::


## Troubleshooting

### Checking the ICMP Probe and Agent Status
The status of the ICMP probe for the various paths can be discovered by querying the path based KNI interfaces as shown below:

```
admin@node1.conductor1# show device-interface router router1 name lte
Thu 2020-07-30 04:50:21 UTC

============================================
 node1.router1:lte
============================================
 Type:                host
 Forwarding:          true
 Mode:                host
 MAC Address:         6a:5e:62:52:e8:d0

 Admin Status:        up
 Operational Status:  up
 Redundancy Status:   non-redundant
 Speed:               1000

 in-octets:                     6053488
 in-unicast-pkts:                100882
 in-errors:                           0
 out-octets:                    4328304
 out-unicast-pkts:                92378
 out-errors:                          0

 ICMP:
   Agent:
     internet:
       current-path:  broadband
       paths:
         broadband: up
         lte:       up
   Probe:
       icmp-probe-internet-broadband:
         attempts:    733
         elapsed:     0.01019028015434742
         last_attempt: 2020-07-30 18:39:31.779657
         status:      up

Completed in 0.07 seconds
admin@node1.conductor1#
```

The `icmp-probe-agent` determines the state of the current path selection and reports its status via the path KNIs as seen in the example above. The result of the path selection should also be reflected via application-id module changes and can be viewed as follows:

```shell
admin@node1.conductor1# show application names router router1
Thu 2020-07-30 05:09:39 UTC

Node: node1.router1

========================= =============== ================ ===================== =====================
 Application Name          Session Count   Ip Tuple Count   Date Discovered       Last Updated
========================= =============== ================ ===================== =====================
...
 icmp-internet-broadband                   0                1   2020-07-30 05:09:15   2020-07-30 05:09:15
...
Completed in 0.11 seconds
admin@node1.conductor1#
```

### Service Status
The plugin relies various `systemd` services to work in concert to provide a robust solution.

#### Plugin Config Handling
The following services are triggered for any changes made to the plugin configuration on the conductor.

```bash
# systemctl status 128T-handle-icmp-reachability-detection-config.path
● 128T-handle-icmp-reachability-detection-config.path
   Loaded: loaded (/usr/lib/systemd/system/128T-handle-icmp-reachability-detection-config.path; enabled; vendor preset: disabled)
   Active: active (waiting) since Mon 2020-06-29 22:17:07 UTC; 4 weeks 2 days ago

Jun 29 22:17:07 t102-dut2.openstacklocal systemd[1]: Stopped 128T-handle-icmp-reachability-detection-config.path.
Jun 29 22:17:07 t102-dut2.openstacklocal systemd[1]: Stopping 128T-handle-icmp-reachability-detection-config.path.
Jun 29 22:17:07 t102-dut2.openstacklocal systemd[1]: Started 128T-handle-icmp-reachability-detection-config.path.

# systemctl status 128T-handle-icmp-reachability-detection-config.service
● 128T-handle-icmp-reachability-detection-config.service - Config Handler for 128T icmp reachability detection plugin
   Loaded: loaded (/usr/lib/systemd/system/128T-handle-icmp-reachability-detection-config.service; static; vendor preset: disabled)
   Active: inactive (dead) since Sat 2020-07-25 06:02:34 UTC; 4 days ago
 Main PID: 19709 (code=exited, status=0/SUCCESS)

Jul 25 06:02:34 t102-dut2.openstacklocal python3.6[19709]: plugins.icmp_reachability_detection.router.lib.config - Generating KNI config for internet and lte
Jul 25 06:02:34 t102-dut2.openstacklocal python3.6[19709]: plugins.icmp_reachability_detection.router.lib.config - Generating application-id script for service internet
Jul 25 06:02:34 t102-dut2.openstacklocal python3.6[19709]: __main__ - Stopping the icmp-probe-agent service
Jul 25 06:02:34 t102-dut2.openstacklocal python3.6[19709]: __main__ - Stopping services ping-monitor-namespace@internet-broadband.service 128T-icmp-path-change-notifier@internet-broadband.path
Jul 25 06:02:34 t102-dut2.openstacklocal python3.6[19709]: __main__ - Stopping services ping-monitor-namespace@internet-lte.service 128T-icmp-path-change-notifier@internet-lte.path
Jul 25 06:02:34 t102-dut2.openstacklocal python3.6[19709]: __main__ - Restarting the icmp-probe-agent service
Jul 25 06:02:34 t102-dut2.openstacklocal python3.6[19709]: __main__ - Starting services ping-monitor-namespace@internet-broadband.service 128T-icmp-path-change-notifier@internet-broadband.path
Jul 25 06:02:34 t102-dut2.openstacklocal python3.6[19709]: __main__ - Starting services ping-monitor-namespace@internet-lte.service 128T-icmp-path-change-notifier@internet-lte.path
Jul 25 06:02:34 t102-dut2.openstacklocal python3.6[19709]: __main__ - Done!!
Jul 25 06:02:34 t102-dut2.openstacklocal systemd[1]: Started Config Handler for 128T icmp reachability detection plugin.

```


#### Status of the ICMP Pings Per Path
The `ping-monitor` utility is used to perform a continuous ping and is run as a template service. The status for each of the path instances can be checked as follows:

```bash
# systemctl status ping-monitor-namespace@internet-broadband.service
● ping-monitor-namespace@internet-broadband.service - Ping Monitor for destination internet/broadband within network namespace
   Loaded: loaded (/usr/lib/systemd/system/ping-monitor-namespace@.service; disabled; vendor preset: disabled)
   Active: active (running) since Thu 2020-07-30 04:56:07 UTC; 1min 58s ago
 Main PID: 32229 (python3.6)
   CGroup: /system.slice/system-ping\x2dmonitor\x2dnamespace.slice/ping-monitor-namespace@internet-broadband.service
           └─32229 python3.6 /usr/lib/ping-monitor//par/ping_monitor.par --path-name=internet-broadband --address=8.8.8.8 --timeout=5 --num-tries=5 --interval=10 --socket-path=/var/run/128technology/icmp-probe-internet-broadband.sock --log-level=

Jul 30 04:57:17 t102-dut2.openstacklocal ip[32229]: - - [30/Jul/2020 04:57:17] "GET / HTTP/1.1" 200 -
Jul 30 04:57:18 t102-dut2.openstacklocal python3.6[32229]: apps.ping_monitor.ping - Got [Errno 101] Network is unreachable while pinging 8.8.8.8
Jul 30 04:57:27 t102-dut2.openstacklocal ip[32229]: - - [30/Jul/2020 04:57:27] "GET / HTTP/1.1" 200 -
Jul 30 04:57:28 t102-dut2.openstacklocal python3.6[32229]: apps.ping_monitor.ping - Got [Errno 101] Network is unreachable while pinging 8.8.8.8
Jul 30 04:57:37 t102-dut2.openstacklocal ip[32229]: - - [30/Jul/2020 04:57:37] "GET / HTTP/1.1" 200 -
Jul 30 04:57:38 t102-dut2.openstacklocal python3.6[32229]: apps.ping_monitor.ping - Got [Errno 101] Network is unreachable while pinging 8.8.8.8
Jul 30 04:57:48 t102-dut2.openstacklocal python3.6[32229]: apps.ping_monitor.ping - Got [Errno 101] Network is unreachable while pinging 8.8.8.8
Jul 30 04:57:49 t102-dut2.openstacklocal ip[32229]: - - [30/Jul/2020 04:57:49] "GET / HTTP/1.1" 200 -
Jul 30 04:57:58 t102-dut2.openstacklocal python3.6[32229]: apps.ping_monitor.ping - Got [Errno 101] Network is unreachable while pinging 8.8.8.8
Jul 30 04:58:00 t102-dut2.openstacklocal ip[32229]: - - [30/Jul/2020 04:58:00] "GET / HTTP/1.1" 200 -

# systemctl status ping-monitor-namespace@internet-lte.service
● ping-monitor-namespace@internet-lte.service - Ping Monitor for destination internet/lte within network namespace
   Loaded: loaded (/usr/lib/systemd/system/ping-monitor-namespace@.service; disabled; vendor preset: disabled)
   Active: active (running) since Thu 2020-07-30 04:56:08 UTC; 2min 40s ago
 Main PID: 32232 (python3.6)
   CGroup: /system.slice/system-ping\x2dmonitor\x2dnamespace.slice/ping-monitor-namespace@internet-lte.service
           └─32232 python3.6 /usr/lib/ping-monitor//par/ping_monitor.par --path-name=internet-lte --address=9.9.9.9 --timeout=1 --num-tries=5 --interval=10 --socket-path=/var/run/128technology/icmp-probe-internet-lte.sock --log-level=

Jul 30 04:57:09 t102-dut2.openstacklocal ip[32232]: - - [30/Jul/2020 04:57:09] "GET / HTTP/1.1" 200 -
Jul 30 04:57:19 t102-dut2.openstacklocal ip[32232]: - - [30/Jul/2020 04:57:19] "GET / HTTP/1.1" 200 -
Jul 30 04:57:29 t102-dut2.openstacklocal ip[32232]: - - [30/Jul/2020 04:57:29] "GET / HTTP/1.1" 200 -
Jul 30 04:57:40 t102-dut2.openstacklocal ip[32232]: - - [30/Jul/2020 04:57:40] "GET / HTTP/1.1" 200 -
Jul 30 04:57:51 t102-dut2.openstacklocal ip[32232]: - - [30/Jul/2020 04:57:51] "GET / HTTP/1.1" 200 -
Jul 30 04:58:02 t102-dut2.openstacklocal ip[32232]: - - [30/Jul/2020 04:58:02] "GET / HTTP/1.1" 200 -
Jul 30 04:58:13 t102-dut2.openstacklocal ip[32232]: - - [30/Jul/2020 04:58:13] "GET / HTTP/1.1" 200 -
Jul 30 04:58:23 t102-dut2.openstacklocal ip[32232]: - - [30/Jul/2020 04:58:23] "GET / HTTP/1.1" 200 -
Jul 30 04:58:34 t102-dut2.openstacklocal ip[32232]: - - [30/Jul/2020 04:58:34] "GET / HTTP/1.1" 200 -
Jul 30 04:58:44 t102-dut2.openstacklocal ip[32232]: - - [30/Jul/2020 04:58:44] "GET / HTTP/1.1" 200 -

```

:::tip
Additional debugging can be turned on for the `ping-monitor` instance by setting `LOG_LEVEL=DEBUG` in `/var/run/128technology/plugins/ping_monitor/{service}-{path}.conf` config file
:::


#### Status of the Path Selection Algorithm

The `icmp-probe-agent` takes its inputs from the `ping-monitor` services by watching on path updates for those instances. In addition it determines the current path selection and udpates the `application-id` modules accordingly. The following service status can be used for troubleshooting:

```bash
# systemctl status 128T-icmp-path-change-notifier@internet-broadband.path
● 128T-icmp-path-change-notifier@internet-broadband.path - Path watcher for ping-monitor status updates on internet-broadband
   Loaded: loaded (/usr/lib/systemd/system/128T-icmp-path-change-notifier@.path; disabled; vendor preset: disabled)
   Active: active (waiting) since Thu 2020-07-30 04:56:07 UTC; 6min ago

Jul 30 04:56:07 t102-dut2.openstacklocal systemd[1]: Started Path watcher for ping-monitor status updates on internet-broadband.

# systemctl status 128T-icmp-path-change-notifier@internet-broadband.service
● 128T-icmp-path-change-notifier@internet-broadband.service - Ping Monitor for destination internet-broadband
   Loaded: loaded (/usr/lib/systemd/system/128T-icmp-path-change-notifier@.service; static; vendor preset: disabled)
   Active: inactive (dead) since Thu 2020-07-30 04:56:09 UTC; 6min ago
  Process: 32271 ExecStop=/usr/bin/curl --unix-socket /var/run/128technology/plugins/icmp-probe-agent.sock http://localhost/path-info (code=exited, status=0/SUCCESS)
  Process: 32248 ExecStart=/usr/libexec/128T-icmp-status-update.sh ${NAME} ${STATUS} ${MAX_RETRIES} (code=exited, status=0/SUCCESS)
  Process: 32246 ExecStartPre=/usr/bin/echo Executing path update for ${NAME} with ${STATUS} (code=exited, status=0/SUCCESS)
 Main PID: 32248 (code=exited, status=0/SUCCESS)

Jul 30 04:56:08 t102-dut2.openstacklocal systemd[1]: Starting Ping Monitor for destination internet-broadband...
Jul 30 04:56:08 t102-dut2.openstacklocal echo[32246]: Executing path update for internet-broadband with down
Jul 30 04:56:08 t102-dut2.openstacklocal 128T-icmp-status-update.sh[32248]: failed to update icmp-probe-agent 7, retrying in a second
Jul 30 04:56:09 t102-dut2.openstacklocal 128T-icmp-status-update.sh[32248]: Finished updating the icmp-probe-agent
Jul 30 04:56:09 t102-dut2.openstacklocal curl[32271]: % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
Jul 30 04:56:09 t102-dut2.openstacklocal curl[32271]: Dload  Upload   Total   Spent    Left  Speed
Jul 30 04:56:09 t102-dut2.openstacklocal curl[32271]: [155B blob data]
Jul 30 04:56:09 t102-dut2.openstacklocal curl[32271]: {"internet": {"current-path": "lte", "paths": {"broadband": "down", "lte": "up"}}}
Jul 30 04:56:09 t102-dut2.openstacklocal systemd[1]: Started Ping Monitor for destination internet-broadband.

# systemctl status 128T-icmp-path-change-notifier@internet-lte.path
● 128T-icmp-path-change-notifier@internet-lte.path - Path watcher for ping-monitor status updates on internet-lte
   Loaded: loaded (/usr/lib/systemd/system/128T-icmp-path-change-notifier@.path; disabled; vendor preset: disabled)
   Active: active (waiting) since Thu 2020-07-30 04:56:08 UTC; 6min ago

Jul 30 04:56:08 t102-dut2.openstacklocal systemd[1]: Started Path watcher for ping-monitor status updates on internet-lte.

# systemctl status 128T-icmp-path-change-notifier@internet-lte.service
● 128T-icmp-path-change-notifier@internet-lte.service - Ping Monitor for destination internet-lte
   Loaded: loaded (/usr/lib/systemd/system/128T-icmp-path-change-notifier@.service; static; vendor preset: disabled)
   Active: inactive (dead) since Thu 2020-07-30 04:56:09 UTC; 6min ago
  Process: 32262 ExecStop=/usr/bin/curl --unix-socket /var/run/128technology/plugins/icmp-probe-agent.sock http://localhost/path-info (code=exited, status=0/SUCCESS)
  Process: 32238 ExecStart=/usr/libexec/128T-icmp-status-update.sh ${NAME} ${STATUS} ${MAX_RETRIES} (code=exited, status=0/SUCCESS)
  Process: 32237 ExecStartPre=/usr/bin/echo Executing path update for ${NAME} with ${STATUS} (code=exited, status=0/SUCCESS)
 Main PID: 32238 (code=exited, status=0/SUCCESS)

Jul 30 04:56:08 t102-dut2.openstacklocal systemd[1]: Starting Ping Monitor for destination internet-lte...
Jul 30 04:56:08 t102-dut2.openstacklocal echo[32237]: Executing path update for internet-lte with up
Jul 30 04:56:08 t102-dut2.openstacklocal 128T-icmp-status-update.sh[32238]: failed to update icmp-probe-agent 7, retrying in a second
Jul 30 04:56:09 t102-dut2.openstacklocal 128T-icmp-status-update.sh[32238]: Finished updating the icmp-probe-agent
Jul 30 04:56:09 t102-dut2.openstacklocal curl[32262]: % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
Jul 30 04:56:09 t102-dut2.openstacklocal curl[32262]: Dload  Upload   Total   Spent    Left  Speed
Jul 30 04:56:09 t102-dut2.openstacklocal curl[32262]: [155B blob data]
Jul 30 04:56:09 t102-dut2.openstacklocal systemd[1]: Started Ping Monitor for destination internet-lte.
Jul 30 04:56:09 t102-dut2.openstacklocal curl[32262]: {"internet": {"current-path": "broadband", "paths": {"broadband": "down", "lte": "up"}}}

# systemctl status 128T-icmp-probe-agent.service  -l
● 128T-icmp-probe-agent.service - ICMP probe agent
   Loaded: loaded (/usr/lib/systemd/system/128T-icmp-probe-agent.service; enabled; vendor preset: disabled)
   Active: active (running) since Thu 2020-07-30 04:56:07 UTC; 7min ago
 Main PID: 32226 (python3.6)
    Tasks: 5
   Memory: 22.2M
   CGroup: /system.slice/128T-icmp-probe-agent.service
           └─32226 python3.6 /usr/lib/128T-icmp-reachability-detection//par/icmpProbeAgent.par -l DEBUG

Jul 30 04:56:09 t102-dut2.openstacklocal python3.6[32226]: plugins.icmp_reachability_detection.router.icmp_probe_agent.state_machine - Updating path-info PathUp for path lte for service internet
Jul 30 04:56:09 t102-dut2.openstacklocal python3.6[32226]: plugins.icmp_reachability_detection.router.icmp_probe_agent.app_id - Service DotMap(icmpProbe=DotMap(address=['0.0.0.0/0'], holdDown=6), name='internet', transport=DotMap())
Jul 30 04:56:09 t102-dut2.openstacklocal python3.6[32226]: plugins.icmp_reachability_detection.router.icmp_probe_agent.app_id - Creating service for internet, icmp-internet-lte, ['0.0.0.0/0'], DotMap()
Jul 30 04:56:09 t102-dut2.openstacklocal python3.6[32226]: plugins.icmp_reachability_detection.router.icmp_probe_agent.app_id - Processing: 0.0.0.0/0 None
Jul 30 04:56:09 t102-dut2.openstacklocal python3.6[32226]: t128.plugin.lib.app_id.builder - Updating /var/run/128technology/application-modules/icmp-probe-internet.json with
                                                           {
                                                             "module-name": "icmp-probe-internet",
                                                             "duration": 86400,
                                                             "continue-file-watch": true,
                                                             "services": {
                                                               "icmp-internet-lte": [
                                                                 {
                                                                   "ip-prefix": "0.0.0.0/0"
                                                                 }
                                                               ]
                                                             }
                                                           }
Jul 30 04:56:09 t102-dut2.openstacklocal python3.6[32226]: plugins.icmp_reachability_detection.router.icmp_probe_agent.state_machine - Advancing from State.HoldDown->State.PathUp
Jul 30 04:56:09 t102-dut2.openstacklocal python3.6[32226]: aiohttp.access -  [30/Jul/2020:04:56:09 +0000] "POST /ping-status HTTP/1.1" 200 180 "-" "curl/7.29.0"
Jul 30 04:56:09 t102-dut2.openstacklocal python3.6[32226]: plugins.icmp_reachability_detection.router.icmp_probe_agent.agent - Handling status request
Jul 30 04:56:09 t102-dut2.openstacklocal python3.6[32226]: plugins.icmp_reachability_detection.router.icmp_probe_agent.agent - internet received {'current-path': 'lte', 'paths': {'broadband': 'down', 'lte': 'up'}}
Jul 30 04:56:09 t102-dut2.openstacklocal python3.6[32226]: aiohttp.access -  [30/Jul/2020:04:56:09 +0000] "GET /path-info HTTP/1.1" 200 239 "-" "curl/7.29.0"
```

:::tip
Additional debugging can be turned on for the `icmp-probe-agent` by passing the `-l DEBUG` to the `/usr/lib/systemd/system/128T-icmp-probe-agent.service` on the `ExecStart` line
:::


## Appendix: Auto-Generated Configuration

The `service > icmp-probe` and `service-route > icmp-probe` configuration will be used to generate other functional configuration elements as needed. At a high level, configuration needs to be generated to do the following:

- ICMP reachability detection
  - KNI for each of the paths to be used for the service(s)
  - Service and service-routes to enable ICMP over those paths
  - Tenants to uniquely identify each of the generated KNIs
- Per path app-id services
  - An application-id service with unique application name for each of the path for the service
  - Service routes to route sessions over appropriate paths

The above example configuration will result in the following auto-generated configuration for this plugin
```config
admin@node1.conductor1# show config running authority tenant broadband

config

    authority

        tenant  broadband
            name         broadband
            description  "Auto-generated tenant for icmp-reachability-detection"
        exit
    exit
exit

admin@node1.conductor1# show config running authority tenant lte

config

    authority

        tenant  lte
            name         lte
            description  "Auto-generated tenant for icmp-reachability-detection"
        exit
    exit
exit

admin@node1.conductor1# show config running authority service broadband-icmp

config

    authority

        service  broadband-icmp
            name                  broadband-icmp

            transport             icmp
                protocol  icmp
            exit
            address               8.8.8.8

            access-policy         broadband
                source      broadband
                permission  allow
            exit
            share-service-routes  false
        exit
    exit
exit

admin@node1.conductor1# show config running authority service lte-icmp

config

    authority

        service  lte-icmp
            name                  lte-icmp

            transport             icmp
                protocol  icmp
            exit
            address               9.9.9.9

            access-policy         lte
                source      lte
                permission  allow
            exit
            share-service-routes  false
        exit
    exit
exit

admin@node1.conductor1# show config running authority service internet-broadband

config

    authority

        service  internet-broadband
            name              internet-broadband
            application-name  icmp-internet-broadband

            access-policy     _internal_
                source  _internal_
            exit
        exit
    exit
exit

admin@node1.conductor1# show config running authority service internet-lte

config

    authority

        service  internet-lte
            name              internet-lte
            application-name  icmp-internet-lte

            access-policy     _internal_
                source  _internal_
            exit
        exit
    exit
exit

admin@node1.conductor1# show config running authority router router1 node node1 device-interface broadband

config

    authority

        router  router1
            name  router1

            node  node1
                name              node1

                device-interface  broadband
                    name               broadband
                    description        "Auto generated host KNI interface for internet"
                    type               host
                    network-namespace  broadband

                    network-interface  broadband-intf
                        name       broadband-intf
                        global-id  3
                        type       external
                        tenant     broadband

                        address    169.254.142.2
                            ip-address     169.254.142.2
                            prefix-length  31
                            gateway        169.254.142.3
                        exit
                    exit
                exit
            exit
        exit
    exit
exit

admin@node1.conductor1# show config running authority router router1 node node1 device-interface lte

config

    authority

        router  router1
            name  router1

            node  node1
                name              node1

                device-interface  lte
                    name               lte
                    description        "Auto generated host KNI interface for internet"
                    type               host
                    network-namespace  lte

                    network-interface  lte-intf
                        name       lte-intf
                        global-id  5
                        type       external
                        tenant     lte

                        address    169.254.142.4
                            ip-address     169.254.142.4
                            prefix-length  31
                            gateway        169.254.142.5
                        exit
                    exit
                exit
            exit
        exit
    exit
exit

admin@node1.conductor1# show config running authority router router1 service-route rte-broadband-icmp

config

    authority

        router  router1
            name           router1

            service-route  rte-broadband-icmp
                name          rte-broadband-icmp
                service-name  broadband-icmp

                next-hop      node1 broadband-intf
                    node-name  node1
                    interface  broadband-intf
                exit
            exit
        exit
    exit
exit

admin@node1.conductor1# show config running authority router router1 service-route rte-lte-icmp

config

    authority

        router  router1
            name           router1

            service-route  rte-lte-icmp
                name          rte-lte-icmp
                service-name  lte-icmp

                next-hop      node1 lte-intf
                    node-name   node1
                    interface   lte-intf
                exit
            exit
        exit
    exit
exit

admin@node1.conductor1# show config running authority router router1 service-route rte-internet-broadband

config

    authority

        router  router1
            name           router1

            service-route  rte-internet-broadband
                name          rte-internet-broadband
                service-name  internet-broadband

                next-hop      node1 broadband-intf
                    node-name  node1
                    interface  broadband-intf
                exit
            exit
        exit
    exit
exit

admin@node1.conductor1# show config running authority router router1 service-route rte-internet-lte

config

    authority

        router  router1
            name           router1

            service-route  rte-internet-lte
                name          rte-internet-lte
                service-name  internet-lte

                next-hop      node1 lte-intf
                    node-name   node1
                    interface   lte-intf
                exit
            exit
        exit
    exit
exit

```

Some of the key aspects of the auto-generated configuration are as follows:
- Each of the generated service has an application-name of the form `icmp-{service}-{path}` as can be seen with `icmp-internet-broadband` and `icmp-internet-lte` in the above example. These application names determine which path is currently available for the service.
- The generated KNIs each represent a unique path and are useful for performing the ICMP probe over those paths. The `broadband-icmp` and `lte-icmp` services are generated to assist with that.

## Release Notes

### Release 3.0.0

#### Issues Fixed

- **PLUGIN-768** Support the ICMP Reachability Detection plugin in 128T versions `5.1.0` and greater.
