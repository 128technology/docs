---
title: Tuning BFD Settings
sidebar_label: Tuning BFD
---

The BFD protocol is defined in [RFC 5880](https://tools.ietf.org/html/rfc5880), which describes the basics of its state machine. When two SSR routers are configured to be peered together, they will begin to send BFD packets to each other over each peer path in order to establish peer reachability (using UDP port 1280). The state will be "down" until a three-way BFD handshake occurs, in which case the state will transition to become "up."

Throughout the life cycle of the BFD peering relationship between SSR routers, two different kinds of BFD operating modes are used:

- BFD asynchronous control mode

- BFD echo mode

### SSR Peer BFD Settings

For a given peering relationship between SSR routers, the following settings are available:
```
  bfd
      state                       enabled
      desired-tx-interval         1000
      required-min-rx-interval    500
      required-min-echo-interval  1000
      authentication-type         sha256
      multiplier                  3
      link-test-interval          10
      link-test-length            10
  exit
```

### Asynchronous Control Mode

Asynchronous control mode messages are used between SSR router peers to establish and maintain peering state. In other words, it is the exchange of these messages that determine if a peer is up or down. These messages are exchanged between router waypoints, with both routers periodically transmitting async mode messages to their peers, as well as expecting to receive and process async mode messages from their peers.

The following BFD settings influence how an SSR uses async mode messages:

```
desired-tx-interval
required-min-rx-interval
multiplier
```

These settings are used in a negotiation between two SSR peers over a given peer path. They are used in determining precisely when each router should send, and expect to receive async control mode messages. They are also used in determining the length of time that must pass without receiving messages from a peer, before that peer is deemed to be "down."

The below setting on an SSR router communicates to its peer how often (in milliseconds) the router wishes to transmit BFD async mode packets:

```
desired-tx-interval
```

In other words, "*I'd like to send to you at this interval.*"

The below setting on an SSR router communicates to its peer the minimum interval (in milliseconds) between BFD async mode packets that it is capable of receiving:

```
required-min-rx-interval
```

In other words, "*don't send to me at less than this interval.*"

Once the SSR routers establish communication with each other, each peer gains knowledge of the intervals their peer wishes to transmit async control mode messages to them at, as well as the minimum intervals the peer is able to receive at. Based on this knowledge, they will each begin to transmit async control mode messages at either their own `desired-tx-interval` time or their peers `required-min-rx-interval` time, whichever is greater.

The below setting goes into a calculation for an SSR router to determine how long it should go without receiving an async mode packet from it's peer, before it declares it "down":

```
multiplier
```

Initially this time is effectively the `multiplier` times the router's own `required-min-rx-interval`. However, once the router has learned the `desired-tx-interval` of its peer, it will then understand the interval it should expect to receive messages from the peer. At that point, it will take the greater of either its own `required-min-rx-interval`, or the peer's `desired-tx-interval` it has learned, and multiply that value by its `multiplier` to become the length of time without receiving messages before it deems the peer path down. The multiplier therefore represents the number of consecutive, missed async BFD messages before deeming the peer path down.

In other words, "*if I don't receive a message in the amount of time that is my multiplier times either my configured `required-min-rx-interval`, or my peer's `desired-tx-interval` that I've learned (whichever is greater), I'll deem the peer path to be down.*"

If both router peers use the default settings above, you should expect to see them transmit async control mode messages every 1000ms, or 1s. If one or both peers do not receive an async control mode packet in 3x1000ms (3s), it will consider the peer path to be "down."

### Damping

BFD is used to detect path failures between routers. BFD notifies the load-balancer and other peer-path observers when there is packet loss between peering routers, or if the link fails. In many cases it becomes critical to minimize session failovers to prevent the session from oscillating between paths, to reduce unnecessary changes to routing tables, prevent consumption of valuable system resources, and avert needless convergence impact. SSR routers have a hold down timer that can be configured to prevent BFD from making immediate updates until the timer has expired. This method works well when the characteristic of the link is well known and a predetermined value can be assigned to the timer.

In cases where link characteristics change or are unpredictable, the SSR router can dynamically adjust BFD notification periods and reduce excessive notifications to clients. This prevents unnecessary instability in the network, minimizing unnecessary failovers and flapping links. 

Simple BFD damping (hold-down timer) is enabled by default, and can be disabled by an administrator. Dynamic BFD Damping is enabled by an administrator using the `dynamic-damping` configuration field. 

#### Parameters

**Initial Hold Down Timer:** The minimum amount of time BFD must wait before beginning notifications. The default is 5 seconds, and can be configured to be any value lower than the `maximum-hold-down-time`. The hold-down-timer will not accept a value of 0. 

**Maximum Hold Down Timer:** The maximum amount of time that BFD must wait before it begins notifications. This timer only applies when BFD damping is enabled. The default value for this is 3600s (or 1 hour). The network administrator may configure this to be any value higher than the initial`hold-down-time`.

**Dynamic Damping:** Disabled by default. When enabled, the SSR router uses the `hold-down-time` and `maximum-hold-down-time` parameters to dynamically adjust the damping timer to ensure that excessive BFD flaps are not affecting the system negatively. This prevents the effect of oscillations, or flapping, caused by BFD and underperforming (or volatile) links. It ensures stability of the entire network and reduces the events requiring the network administrator's attention.

| Element | Parent Configuration | Type | Values |
| --- | --- | --- | --- |
| hold-down-time | BFD (router, peer, neighborhood, adjacency) | Seconds | Default: 5 Range: 1-300 |
| dynamic-damping | BFD (router, peer, neighborhood, adjacency) | Enumeration | Enabled/Disabled Default: Disabled |
| maximum-hold-down-time | BFD (router, peer, neighborhood, adjacency) | Seconds | Default: 3600 (1 hour) Only configurable when dynamic-damping is enabled. Must be greater than hold-down-time. |

##### Example

```
config authority
    router Router1
        bfd
            state enabled
            hold-down-time 10
            damping enabled
            maximum-hold-down-time 60
        peer foo
            bfd
                hold-down-time 3
                damping disabled
        node bar
            device-interface dev1
                network-interface net1
                    neighborhood n1
                        bfd
                            hold-down-time 30
                            damping Enabled
                            maximum-hold-down-time 600
                    adjacenency 1.1.1.1 peer1
                        bfd
                            hold-down-time 300
                            damping Disabled
```
If damping is disabled, the configured `hold-down-time` will be used with the current existing `hold-down-time` logic. For additional information, see [BFD Router](config_reference_guide.md#bfd-router) in the Configuration Element Reference Guide.

### Echo Mode

Echo mode messages are used between SSR router peers to measure path quality, including jitter, packet loss, and latency (JPL). Echo mode messages are transmitted from one router to its peer, which simply echoes them back to the originating router. In contrast to async control mode messages, which are conversations between peer BFD agents, echo mode messages are one router's conversation with itself via its router peer, over a specific peer path.

The below sets how often (in seconds) an SSR router will perform a test of path quality using BFD echo mode messages:

```
link-test-interval
```

The below sets the number of echo mode packets to be used when performing a path quality test using BFD echo mode messages:

```
link-test-length
```

The below sets the minimum amount of time between echo packets that a particular peer is able to handle. This gets communicated in BFD messages as a means of telling a peer what it can handle, and is useful as a means of a router preventing a peer from overloading it with echo mode packets.

```
required-min-echo-interval
```

If both router peers use the default settings above, you should expect to see each router independently perform echo mode tests every 10s, consisting of 10 echo mode packets sent to its peer in rapid succession, for each peer path it has established with that peer. Upon receipt, the peer will echo them back to the originating router, which will measure JPL.


### Visibility into BFD

Visibility into the status of the BFD async control mode can be seen as "up" or "down" in PCLI commands such as the one below. They can also be seen in the topology view of the GUI and alarms are generated whenever a BFD detects paths are down:

```
show peers
```

By adding `detail` to the command (i.e., `show peers detail`) you can see the current JPL statistics for each peer path.

Visibility into the measured results of BFD echo mode can be seen on a per service-route basis using the one below. This shows data from a running average of multiple successive echo mode tests:

```
show load-balancer
```

On a per-peer path basis, this command shows results from echo mode measurements, however, this is NOT the same running average as data seen in `show load-balancer`  it is simply the raw data resulting from the last time a test was performed:

```
show stats bfd by-peer-path
```