---
title: Service Health Learning and Fault Avoidance
sidebar_label: Service Health Learning and Fault Avoidance
---

When an interface is operationally down, or ARP requests to the next-hop gateway are not consistently returned, the path in question will be removed from routing decisions. In concert with dynamic routing protocols such as BGP, network software is able to determine the best path to the destination. However in some deployments, routers can be pre-configured with all potentially available transports, or lacking in dynamic routing protocols to determine if the path to the final destination is available on a given route. As a result, the path selected by the router might effectively black-hole traffic.

A unique advantage of Session Smart Routing is that it can understand patterns and characteristics of the underlying traffic passing through the system. These heuristics can then be leveraged on a number of different parameters in order to make more intelligent routing and load balancing decisions.

- Per Service
- Per Path
- Per transport and application such as TCP, UDP, TLS etc
- Per destination (/32 address only)
- Per traffic-class (high, medium, low, best-effort)

The Session Smart Router (SSR) collects key performance metrics to assist in making load balancing decisions, such as:

- Number of TCP connection errors
- Number of UDP failures due to ICMP unreachable
- Time to first data packet for TCP and TLS

Service Health Learning can operate in a detection mode to gather the metrics listed above, and then enforce path selection based on the experienced values.

## Detection Mode

Detection Mode is configured on the service-route, and allows you to gather statistics based on the traffic profiles as described in [Session Establishment Metrics](concepts_metrics.md/#session-establishment-metrics). This mode defines the criteria the 128T router uses to apply load balancing decisions. Detection mode allows you to visualize the current network and understand the necessary configuration for enforcement.

### Configure Detection Mode

Detection Mode is configured per service-route, and gathers statistics using [Session Establishment Metrics](concepts_metrics.md/#session-establishment-metrics).

To enable Detection Mode:

1. Under Authority, select a router.
2. Scroll down to Service Routes.
3. Click ADD.
4. Enter a Name for the new Service Route, and click SAVE.
5. Choose the Service Name.
6. Choose the Service Route Type and the Peer (if necessary).

The following is an example configuration from the PCLI.
```
authority

    router  Fabric128
        name           Fabric128

        service-route  test-1_intf13_route-0
            name                    test-1_intf13_route-0
            service-name            east-0

            next-hop                test-1 intf13
                node-name   test-1
                interface   intf13
                gateway-ip  172.16.4.4
            exit

            reachability-detection
                enabled           true
                enforcement       false
            exit
        exit
    exit
exit
```

Reachability Detection is now enabled and will gather service route information. Configure as many detection settings as necessary to gather information about the network connectivity.
The next step is to set Enforcement Mode parameters for load balancing.

## Enforcement Mode

In Enforcement Mode, you define a traffic profile using the parameters from Detection Mode to apply criteria that determines the health of a path and subsequent selection by the load balancer.

### Configure Enforcement Mode

It is easiest to use the Service Routes configured in Detection Mode and simply enable Reachability Detection Enforcement.

1. Under Authority, select a Router.
2. Scroll down to Service Routes.
3. Select the Service Route.
4. Under Reachability Detection Settings, enable Reachability Detection Enforcement.
5. Define the Enforcement Detection Window (time). The `detection-window` (default 5s) determines how often the stats will be aggregated in terms of min, max, and median.
6. Define an Enforcement Hold-Down time. This determines how long the path stays down upon determining it is unusable.
7. If you have previously configured a Reachability Profile, select the appropriate profile. If there is no existing Reachability Detection Profile, use the procedure below.
8. Scroll to Reachability Detection Enforcement Probes and click ADD.
9. Enter a name for the probe and click SAVE.
10. In the Probe Type window, select a probe type from the drop-down. The default probe type is an ICMP probe.
11. Click Validate, and then Commit.

#### Creating a Reachability Detection Profile

1. Go to the Router level (up one level).
2. Scroll down to Reachability Profile, and click ADD.
3. Under Protocol, click ADD.
4. Select the Protocol type from the drop-down (tcp, tls, udp) and click SAVE.
5. Under the protocol class label, click ADD.
6. Select a traffic class ID and click SAVE. The traffic-class configuration allows you to configure different treatments for different classes of traffic for the same service.
7. In the Acceptable Error Threshold field, set the threshold.
8. In the `time-to-establishment.label` field, set Enabled to true. Define the max and mean times as necessary. This configures the time allowed to establish a session for the protocol.
9. Return to the Router level.
10. Select the Service Route where the Enforcement settings will be in affect.
11. Scroll down to Reachability Detection settings. In the Reachability Detection Enforcement Profile select the Reachability Profile you just created.
12. Click Validate, and then Commit.

The following is an example Enforcement configuration with a Reachability Profile entered from the PCLI.

```
authority

    router  Fabric128
        name                  Fabric128

        reachability-profile  profile-1
            name      profile-1

            protocol  tcp
                protocol-type  tcp

                traffic-class  high
                    traffic-class-id            high
                    enabled                     true
                    acceptable-error-threshold  50

                    time-to-establishment
                        enabled  true
                        max      500
                        mean     250
                    exit
                exit
            exit

            protocol  udp
                protocol-type  udp

                traffic-class  high
                    traffic-class-id            high
                    enabled                     true
                    acceptable-error-threshold  50

                    time-to-establishment
                        enabled  true
                        max      500
                        mean     250
                    exit
                exit
            exit
        exit

        service-route  test-1_intf13_route-0
            name                    test-1_intf13_route-0
            service-name            east-0

            next-hop                test-1 intf13
                node-name   test-1
                interface   intf13
                gateway-ip  172.16.4.4
            exit

            reachability-detection
                enabled               true
                enforcement           true
                detection-window      10
                hold-down             60
                reachability-profile  profile-1
                probe-type            always
                    probe               foo
                        name                foo
                        enabled             true
                        icmp-probe-profile  icmp-profile-0
                    exit
                exit
            exit
        exit
    exit
exit
```

### Traffic Profile

When a traffic profile is configured, it allows for the enforcement of path characteristics.
```
router > traffic-profile
	name	profile1
	protocol tcp
          protocol tcp
          traffic-class high
              traffic-class high
              enabled true
              acceptable-error-threshold	5
              time-to-establishment
    	            enabled	true
	            max	      100
	            mean	      50
          traffic-class best-effort
              traffic-class best-effort
              enabled true
              acceptable-error-threshold	10
              time-to-establishment
    	            enabled	true
	            max	      500
	            mean	      250
	protocol udp
          protocol udp
          acceptable-error-threshold	20
          time-to-establishment
   	     enabled	false
```
- `traffic-profile` allows the user to configure enforcement parameters for tcp, udp and tls.
- `traffic-class` allows the user to configure different treatments for different classes of traffic for the same service. The same default values (as described below) apply to all the classes.
- `acceptable-error-threshold` (expressed in percentage) is the amount of errors acceptable on the path before taking it offline. For TCP, this includes the session closed before establishment, any ICMP error that constitutes destination unreachable, and session timeout before establishment. For UDP, this includes the destination unreachable class of ICMP errors.
- `time-to-establishment` allows the user to configure a max and a mean time for a session to be established as defined for the protocol within the configured detection-window. The following table describes the default values.

| Config | Type | Default Value | How to disable? |
| ------ | ---- | ------------- | --------------- |
| acceptable-error-threshold | percentage | 25% | 0% |
| traffic-class |
| enabled | boolean | true | false |
| time-to-establishment |
| - enabled | boolean | true | false |
| - max | milliseconds | 500 ms | 0 ms |
| - mean | milliseconds | 250 ms | 0 ms |

Once a profile is configured, the above defaults are enforced. To turn off the specific enforcement, configure an appropriate value as listed above.

### Health Probes

An ICMP probe, as described below is built into the system, providing the health probe method. Other application specific probes ([HTTP, TLS](plugin_http_probe.md), SIP, etc.) are made possible with external plugins utilizing the REST API added for this feature. The two main aspects are:

- Load-balancer API to declare select paths as down
- Mechanism to report activity or inactivity over a path to an external application

#### Health Probes REST API

The reachability manager provides a REST API for setting, getting, and deleting probe state. Note that the state is cleared when the probe-type becomes disabled.

If any probe sets state to down for the service-path, the path is marked as down. The path may still periodically become up to allow organic traffic for one interval as it exits the hold-down period. This can be seen through the `show service-path` command.

For the REST API, either (service-route + service) or (network-interface) must be given. Network-interface may map to more than one service-route. One service-route may map to multiple service-paths.

### ICMP Probe

The default probe is an ICMP based health probe to detect the liveliness of the remote endpoint. Below is a sample config:

The probe-name for the REST API is `128T-icmp-probe`.

```
icmp-probe-profile
    name                     icmp-profile1
    probe-interval		10s
    number-of-attempts		5
    probe-duration		1s
    probe-address             8.8.8.8
    probe-address             9.9.9.9
    sla-metrics
        max-loss	10%
        latency
            max	200ms
            mean	50ms

```

The following table describes the configuration values above:

| Config | Type | Constraints | Description |
| ------ | ---- | ----------- | ----------- |
| router > icmp-probe-profile |
| name | string | key | Unique name to identify an ICMP probe profile |
| probe-interval | uint32 (seconds) range: 1-3600 | default: 10 | Duration (in seconds) of how often to perform a link test to the destination. |
| number-of-attempts | uint8 range: 1-20 | default: 4 | Number of consecutive ICMP ping requests to be sent within the probe-duration before deciding that destination is unreachable. |
| probe-duration | uint8 (seconds) range: 1-10 | default: 1	| Duration (in seconds) within which to reach the destination. Each attempt will be made in probe-duration / number-of-attempts interval. |
| sla-metrics |
| max-loss | uint8 (percent) | default: 10%	| The amount of acceptable loss on the link. The loss will be determined by sending number-of-attempts ICMP requests and waiting the probe-duration to get the replies back. |
| latency > max	| milliseconds | default: 250 | Maximum acceptable latency based on the ping test. |
| latency > mean | milliseconds	| default: 100 | The average latency on a path based on the ping test. |

#### Troubleshooting the ICMP Probe Profile

If any of the addresses listed in the profile do not meet the SLA requirements, all service-routes referencing this profile are marked as down.

Stats are available for number of failed-to-send, response-timeout, and ping success in total, and for ping exceeded-by-max-loss, exceeded-by-max-latency, and exceeded-by-mean-latency.

Ping state will be detected for each unique combination of probe-profile, service-name, and tenant.

If an ICMP probe fails to send requests, the PCLI ping command and highway logs can be used to debug. If `ping node <node-name> egress-interface <intf-name> gateway <gateway-ip> <address>` succeeds where the node and egress-interface match the service-route next-hop and the gateway is from the routing FIB or the interface gateway, then the ICMP probe will be able to send a ping.

Probe-interval and probe-duration should be tuned so that probe-interval + probe-duration is less than the detection-window, allowing the ping to run to completion within the detection window. If the ping interval is longer, when the path is declared down, is held-down, and is brought up for one window, the probe may say the path is down and the service-path will be brought down again, bouncing the path repeatedly.

### Custom Health Probe Plugins

The extensibility APIs described above enable plugins to be developed for performing additional probes using TCP, [TLS, HTTP](plugin_http_probe.md), SIP etc. The plugin workflow for these types of probes would be as follows:
- Augment the service-route > reachability-detection > probe choice statement to plugin specific probe configuration. In general, there is no restriction enforced on what and how many plugins run a reachability check in parallel.
- The probe plugin operates independently to determine if the path is up or down. Based on the specific business logic, the plugin triggers the path down using the load balancer APIs.
- The probe plugin uses the probe-status REST API to set service-paths up or down.

### Tracking Behavior

The algorithm for tracking errors, establishment times, etc. is run on a per-service, per-path and per-traffic-class basis. In addition, the following destination address are also tracked:
- Any fully qualified address (/32 for IPv4 and /128 for IPv6) configured in service > address is tracked for the above metrics.
- When there is a service-route > nat-target or service-route > next-hop > target-address configured, they are tracked for the metrics above.

### Load Balancer Behavior

An algorithm is used to flag and recover path failures.
- The enforcement algorithm calculates the health of each path based on the profile at the configured detection interval.
- When any of the configured thresholds are exceeded, the path is flagged as unusable. The first test to fail causes the path to be taken out of consideration from the load balancer.
- Once the path is deemed to be not healthy: The subsequent sessions are used for routing. In the event that none of the paths are healthy, the best-effort algorithm picks one of the paths for routing sessions. This can be disabled by turning off best-effort configuration in the service-policy.

:::note
When a path becomes unavailable, all the existing sessions continue to be routed over this path. Since this is non-SVR, changing a destination or path might have unintended consequences.
:::

The path is kept down for the configured hold-down time before being put back in service. At that time, the tracking and enforcement algorithm restarts.

## Troubleshooting

If the value of the threshold or window is too small, the link will go in and out of service. If this is the case, adjust the threshold value in the configuration.

Alarms and events:
- During enforcement mode, if a path is taken out of service for a given service, protocol, or traffic class, an alarm is generated to indicate the event. The alarm is cleared when the path is put back in service.

Show commands:
- `show stats` command can be used for capturing the “current” snapshot of the relevant stats.
- The Meets-SLA field has been added to the `show load-balancer` command to indicate the result of the reachability detection.

```
======== ========= ====== ======= ====== ========= ======== ===== ===========
   Type   Quality   Cost   State   Loss   Latency   Jitter   Mos   Meets-SLA
======== ========= ====== ======= ====== ========= ======== ===== ===========
 router         0    N/A      up   0.7%     250ms    100ms   2.0         Yes
```
- The `show service-path` output indicates when a non-SVR path is no longer in-service and why.
Two fields have been added to the show command: Meets-SLA and Reachability-Probes. Meets-SLA indicates if a service agent meets or satisfies SLA as a result of reachability detection. Reachability-Probes shows the probes status from reachability detection.

```
show service-path

==============
 Service: web
==============
  Service-Route:    web-route1
  Type:                    service-agent
  Destination:         4.4.4.4
  Next-Hop:            1.1.1.3, Lan(Down)[Gateway Arp unresolved)
  Peer:                    unavailable
  Path-Metrics:
     High
         TCP:  latency [0ms] loss [0] jitter [0ms]
         TLS:  latency [0ms] loss [0] jitter [0ms]
         UDP:  latency [0ms] loss [0] jitter [0ms]
         ICMP: latency [0ms] loss [0] jitter [0ms]
     Medium
         TCP:  latency [0ms] loss [0] jitter [0ms]
         TLS:  latency [0ms] loss [0] jitter [0ms]
         UDP:  latency [0ms] loss [0] jitter [0ms]
         ICMP: latency [0ms] loss [0] jitter [0ms]
     Low
         TCP:  latency [0ms] loss [0] jitter [0ms]
         TLS:  latency [0ms] loss [0] jitter [0ms]
         UDP:  latency [0ms] loss [0] jitter [0ms]
         ICMP: latency [0ms] loss [0] jitter [0ms]
     Best-Effort
         TCP:  latency [0ms] loss [0] jitter [0ms]
         TLS:  latency [0ms] loss [0] jitter [0ms]
         UDP:  latency [0ms] loss [0] jitter [0ms]
         ICMP: latency [0ms] loss [0] jitter [0ms]
  Vector:                   Red
  Cost:                      10
  Rate:                      1
  Capacity:               200/3000
  Index:                    18
  Meets-SLA:           Yes
  Reachability-Probes:
               TestProbe1: Up
               TestProbe2: Down
```
