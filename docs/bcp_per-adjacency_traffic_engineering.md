---
title: Per Adjacency Traffic Engineering
sidebar_label: Per Adjacency Traffic Engineering
---

Packet loss due to congestion in networks, particularly over WAN links, is inevitable. Depending on where drops occur, it can have a major impact on perceived quality of experience. Packet loss due to exceeding transmit caps between instances of SSR should be avoided. Per-adjacency traffic engineering can be enabled to regulate the upload and download rates between peers.  

## Overview 

Per-adjacency traffic engineering provides targeted traffic engineering for both directions on a bandwidth restricted link between two SSR instances. Traffic engineering on the device interface continues to be associated with the upload rate of a connected link; the `transmit-cap`. Traffic engineering at the adjacency level is associated with the download limit of the adjacent SSR instance; the `receive-cap`.  

For example, in the following hub and spoke diagram the Datacenter router has 5 adjacencies off of the individual device interface with a `transmit-cap` upload speed configured at 50Mb. The adjacent branch routers have 10Mb, 5Mb, 1Mb, 5Mb, and 2.5Mb configured as their device interface transmit caps. With such a large `transmit-cap` at the Datacenter, traffic rates exceeding the allowed download speeds (10Mb, 5Mb, 1Mb, 5Mb, and 2.5Mb) on each of the paths to the branch routers will result in traffic being dropped by the ISP. 

![Hub and Spoke Network](/img/per_adjacency_example.png)

Per-adjacency traffic engineering allows you to automatically identify the adjacent path and the `receive-cap`, and limit the rate of traffic destined for that path. With a `receive-cap` configured for each adjacency, traffic does not exceed the `receive-cap` associated with the adjacency, and is not dropped by the ISP. 

### Traffic Profile

A traffic profile allows you to adjust the amount of bandwidth allocated for various traffic categories.  When a traffic profile is configured, it is applied on a network or device interface, and allows for the enforcement of the defined path characteristics. Note that the `traffic-class` values for best-effort, high, medium, and low are percentage values, and collectively must add up to 100 percent.
```
router > traffic-profile
    name    profile1
    protocol tcp
          protocol tcp
          traffic-class high
              traffic-class high
              enabled true
              acceptable-error-threshold    5
              time-to-establishment
                    enabled true
                max       100
                mean          50
          traffic-class best-effort
              traffic-class best-effort
              enabled true
              acceptable-error-threshold    10
              time-to-establishment
                    enabled true
                max       500
                mean          250
    protocol udp
          protocol udp
          acceptable-error-threshold    20
          time-to-establishment
         enabled    false
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

Once a profile is configured, the defaults listed above are enforced. To turn off the specific enforcement, use the disable value shown above.

### Auto-Configuration via Neighborhoods

:::note
Per adjacency traffic-engineering is limited to spoke nodes in a hub and spoke topology. 
:::

Typically, adjacencies are automatically configured via [neighborhoods](concepts_glossary.md#neighborhoods). All nodes in a neighborhood share layer 3 connectivity. Between any two nodes we can form a pair of adjacencies, one on each router, which describes their peering. When the adjacencies are automatically created, the spoke’s neighborhood `receive-cap` is inspected by the neighborhood Hub router. It creates an adjacency with a `transmit-cap` matching the spoke’s `receive-cap`. 

:::note 
In order to generate the adjacencies correctly, configure a `receive-cap` on the neighborhood of the network interface with limited receive capabilities.
:::

```
network-interface foo
    neighborhood bar
        topology spoke
  vector internet
        traffic-engineering
            enabled true
            receive-cap 1000000 (<---)
	      traffic-profile profile
        exit
    exit
exit
```

### Manual Configuration via Adjacencies

The preferred method for configuring adjacencies is using auto-configure via neighborhoods. However, it is possible to manually configure per adjacency traffic-engineering. To limit the router’s transmit speeds when communicating with a specific peer, set the `traffic-engineering` container in the adjacency to have the desired `transmit-cap`. 

```
network-interface foo
    adjacency 1.1.1.1
        ip-address 1.1.1.1
        peer peer_router
        inter-router-security interfabric
        peer-connectivity bidirectional
        traffic-engineering
            enabled true
            transmit-cap 1000000
	traffic-profile profile
        exit
    exit
exit
```
### Gathering Statistics

To gather information about Per-Adjacency Traffic Engineering, query the following statistics using the `show stats traffic-eng device-interface peer-path` command within the CLI. These statistics are specific to the peer-path and provide insight into how the adjacency schedulers are operating.

- `enqueue-cycle-count`: The current enqueue cycle count in traffic engineering for this peer path.
- `dequeue-cycle-count`: The current dequeue cycle count in traffic engineering for this peer path.
- `packets-queued`: The current number of packets queued in traffic engineering for this peer path.
- `per-traffic-class schedule-success-bytes`: The number of bytes successfully scheduled for transmission for this peer path. 
- `per-traffic-class schedule-success-packets`: The number of packets successfully scheduled for transmission for this peer path. 
- `per-traffic-class schedule-failure-bytes`: The number of bytes failed to be scheduled for transmission due to bandwidth oversubscription for this peer path. 
- `per-traffic-class schedule-failure-packets`: The number of packets failed to be scheduled for transmission due to bandwidth oversubscription for this peer path. 
- `per-traffic-class dequeue-success-bytes`: The number of bytes successfully dequeued from the scheduler for transmission for this peer path. 
- `per-traffic-class dequeue-success-packets`: The number of packets successfully dequeued from the scheduler for transmission for this peer path. 
- `per-traffic-class dequeue-max-latency-drop-bytes`: The number of bytes scheduled for transmission that were dropped due to excessive latency for this peer path.
- `per-traffic-class dequeue-max-latency-drop-packets`: The number of packets scheduled for transmission that were dropped due to excessive latency for this peer path.
- `per-traffic-class dequeue-aqm-drop-bytes`: The number of bytes scheduled for transmission that were dropped due to Active Queue Management for this peer path.
- `per-traffic-class dequeue-aqm-drop-packets`: The number of packets scheduled for transmission that were dropped due to Active Queue Management for this peer path.
- `per-traffic-class buffer-capacity-exceeded-bytes`: The number of bytes failed to be scheduled for transmission due to exceeded buffer capacity for this peer path.
- `per-traffic-class buffer-capacity-exceeded-packets`: The number of packets failed to be scheduled for transmission due to exceeded buffer capacity for this peer path.
- `per-traffic-class schedule-success-bandwidth`: Traffic bandwidth successfully scheduled for transmission for this peer path. 
- `per-traffic-class schedule-failure-bandwidth`: Current scheduler enqueue failure rate in bytes per second for a given traffic class within the scheduler.

### Additional Information

Per adjacency traffic engineering works well in a one-to-many topology described above. However, it is less effective in the following topologies:

- Topologies where multiple routers are communicating with a bandwidth-restricted branch router. Multiple routers sourcing traffic into the ISP destined for the branch router do not communicate how much traffic they are sending. As a result, oversubscription of the link is possible and the distribution of prioritized traffic from the sourcing routers will be dropped. 
- A topology that includes multiple active paths from an individual datacenter router to the branch routers. 
- A Full-mesh topology.