---
title: Intra- and Inter-System Communication
sidebar_label: Machine Communication
---
This document lists the different communication channels between nodes within a router, between peering routers, and between routers and their conductor. This is to provide:

- A guide for port forwarding when deploying a conductor behind a firewall
- A tool to help predict and manage the amount of ambient, management-plane bandwidth that SSR software will use during "steady state." (This is useful when deploying devices that have limited use and/or expensive WAN connections, such as LTE.)

## Connections
Each running instance of SSR software (generically termed as a _node_) can exist in one of two _roles_: a _router_ or a _conductor_. Furthermore, two _nodes_ can be coupled together to form a highly available router or conductor. There are machine to machine (M2M) connections between the various topologies of nodes, which will be covered here. These include:

- Node to node connectivity within a highly available router
- Router to router connectivity between peering routers
- Router to conductor connectivity for management, adminstration, and orchestration

## Node to Node Connectivity (High Availability)
The vast majority of node-to-node connections, deployed as highly available systems, are done over directly connected interfaces between collocated machines. As such, bandwidth consumption and firewall management are not applicable. However, it is possible to geographically separate highly available nodes and have them communicate over a WAN, typically in the form of a data center interconnection.

:::important
Geographic distribution for highly available systems is only supported for nodes serving as conductors. Juniper does not support geographic distribution of nodes acting as routers.
:::

When deploying geographically separated conductor nodes, the following requirements must be met:
- Latency less than 150ms
- Packet loss less than 0.01%
- No firewalling between the systems

## Router to Router Connectivity
Between peered routers, there are four different M2M connections that are established aside from forwarding plane traffic that is sent between them, and excluding routing protocol control plane traffic (BGP). Each of the connections is described here.

:::note
Peering SSR routers requires a successful exchange of BFD packets in order to initiate SVR connections. _At least one of the devices must be reachable at 1280/UDP._ Peering can be established if one device is behind a NAT that allocates dynamic ports, but not both. To peer devices that are both behind distinct NATs (not recommended), you must forward 1280/UDP to one or both of them.
:::

### BFD (Peer Path Detection)
| Direction     | Port/Proto | Default Interval | Notes                                                        |
| ------------- | ---------- | ---------------- | ------------------------------------------------------------ |
| bidirectional | 1280/UDP   | 1s               | Frequency negotiated between devices by configuring `desired-tx-interval` and `required-min-rx-interval` settings. Client and server payloads are variable length, typically greater than 90 bytes. This is due to the presence of peer-name. |

[BFD](https://en.wikipedia.org/wiki/Bidirectional_Forwarding_Detection), or Bidirectional Forwarding Detection (as defined in [RFC 5880](https://tools.ietf.org/html/rfc5880)), is exchanged between SSR routers to detect SVR path availability. I.e., the successful, and continued exchange of BFD packets is a prerequisite for choosing that path to carry SVR traffic. For peer path detection, SSR uses the _asynchronous mode_ of BFD.

The peering status between SSR devices is viewable using the PCLI command `show peers`.

The default timer values for BFD traffic are adequate for deployments where head end routers are managing 1,000 aggregate peer paths. For larger deployments, these values should be dilated.

### BFD (Path Quality)
| Direction     | Port/Proto | Default Interval | Notes                                                        |
| ------------- | ---------- | ---------------- | ------------------------------------------------------------ |
| bidirectional | 1280/UDP   | 10s              | A ten (10) packet burst sent between SSR routers on each peer path. Client and server payloads are variable length, typically greater than 90 bytes. This is due to the presence of peer-name.|

Each SSR router will measure the path quality to its peer using the _echo mode_ of BFD. It does so by sending a burst of ten packets every ten seconds over each peer path. These packets are echoed back from the remote SSR instance and returned to the point of origin. This allows the transmitter to accurately measure round trip time, and calculate packet loss and jitter (variability in interpacket arrival times).

The results of the path quality testing are available in the output of the PCLI command `show peers detail`.

:::note
The SSR will also *calculate* a Mean Opinion Score (MOS) for each peer path. This is derived from the loss, latency, and jitter values empirically determined by the Path Quality BFD packets.
:::

In many common deployment scenarios, the SSR software is deployed as "hub-and-spoke," where the traffic flows exclusively (or nearly exclusively) in one direction from branch deployments toward data centers. In these topologies, it is common and recommended to disable the asynchronous packets sent by the hub routers toward the edge routers, since the path selection critieria is not relevant.

### Firewall Detector
| Direction     | Port/Proto | Client Payload (bytes) | Server Payload (bytes) | Default Interval | Notes                                                        |
| ------------- | ---------- | ---------------------- | ---------------------- | ---------------- | ------------------------------------------------------------ |
| bidirectional | 1280 and 1283/TCP   | 6516                   | 6516                   | 300s             | Rate can be adjusted by setting `udp-transform/detect-interval` or disabled by setting `udp-transform/mode` to `always-transform`. |

Each SSR periodically sends _firewall detector_ packets on each peer path to determine if stateful firewalls exist on the peer path. Firewalls between SSR devices can interfere with SVR behavior; because of this, the firewall detector is used to automatically trigger a _UDP transform_ feature, to carry SVR over UDP when firewalls would otherwise block TCP. The status of the firewall detector is show in the PCLI in the output of `show udp-transform`:

```
admin@labsystem1.fiedler# show udp-transform router newton
============= ============ ============ ========== =========================================
 Router Name   Node Name    Peer         Status     Reason(s)
============= ============ ============ ========== =========================================
 newton        labsystem2   becket       enabled    TCP SYN; Mid-flow; TCP SYN Jumbo;
                            becket       enabled    TCP SYN; TCP SYN Jumbo;
                            burlington   enabled    TCP SYN; Mid-flow; TCP SYN Jumbo;
```

The firewall detector function sends deliberately malformed, out-of-order, and missequenced packets in bursts of four packets every five minutes (by default). This time may be increased if you are certain there is no firewall on the path, nor any possibility of the path changing to include a stateful device. If you know there is a firewall device in the path, you can force the `udp-transform` to `always-transform`, which suppresses the firewall detector packets entirely.

### Path MTU Discovery
| Direction     | Port/Proto | Client Payload (bytes) | Server Payload (bytes) | Default Interval | Notes                                                        |
| ------------- | ---------- | ---------------------- | ---------------------- | ---------------- | ------------------------------------------------------------ |
| bidirectional | 1280/UDP   | 2945                   | 90                     | 600s             | Interval is configurable within `path-mtu-discovery/interval`, or disabled `path-mtu-discovery/enabled`. |

Peering SSR routers will perform path MTU discovery on each peer path between each other. This test is run every ten (10) minutes by default, to adjust in the event of path changes between peering devices. During the test, SSR routers send packets of various sizes to discover the MTU of the path. However, in some government deployments the use of MTU discovery is not possible. 

In order to accommodate these deployments where “ICMP Destination Unreachable - Fragmentation Needed” response messages are not generated (RFC1911 is not followed), three successive non-responses are considered equivalent to ICMP responses for the purposes of driving the algorithm with an inferred MTU.

The discovered MTU is viewable in the output of `show peers`.

### Secure Vector Routing Traffic

By using SVR, the SSR creates sessions to transport directional, encrypted, tunnel-free traffic to its peers by creating engineered pathways between waypoints – IP addresses assigned to SSR interfaces. This is a significant departure from legacy tunnel-based approaches. For additional information about Waypoints and Secure Vector Routing (SVR) please refer to [Concepts of Waypoints and Waypoint Ports](concepts_waypoint_ports.md).

| Direction     | Port/Proto | Client Payload (bytes) | Server Payload (bytes) | Default Interval | Notes                                                        |
| ------------- | ---------- | ---------------------- | ---------------------- | ---------------- | ------------------------------------------------------------ |
| bidirectional | 16385-65,353 <br /> TCP/UDP | -- | -- | -- | Native TCP sessions use TCP for transport. UDP is used for all other session types. Use `udp-transform` to force UDP transport. |

#### Protocol

By default, native TCP sessions use TCP, and UDP is used for all other session types. However, if firewall detection is enabled and [triggered](#firewall_detector), all traffic destined for a peer transitions to UDP. 

You can manually configure traffic to use UDP for transport by modifying the [`udp-transform`](config_reference_guide.md#udp-transform) sub-element under [network-interface > adjacency](config_reference_guide.md#adjacency) or [network-interface > neighborhood](config_reference_guide.md#neighborhood).

#### Port Ranges

The default range of ports used for configuring waypoints with SVR is 16,385 through 65,533. When sending traffic to a peer, the SSR will allocate an even numbered waypoint for itself and an odd numbered waypoint for its peer.

If you need to limit the ports or port range the SSR uses for receiving traffic, a `port-range` can be configured under the `neighborhood`. This tells peer SSRs to constrain the destination port range used when communicating with another router. Note that when manually specifying a port range, port numbers 1025 to 16383 can also be used. 

#### Example:
Let's say you want to utilize UDP for transport, but do not want to open up all the default ports. To limit the number of ports open on your firewall, you choose to specify a port range of 10,000 to 12,000. With each new waypoint, thousands of active sessions are added. Even with a small port range selection you can easily support many active users.

### TTL Handling

Beginning with version 6.0.0, the SSR's handling of SVR traffic can be configured to adjust the TTL value on hops between SSR routers. This adjustment can prevent situations where the TTL expires on packets flowing through multiple hops and then out to the Internet to their final destination. 

| Element | Type | Description |
| --- | --- | --- |
| ttl-padding | enumeration | Valid values: 0-255, automatic, false. Default is 0. A numeric value is used to adjust the TTL of each packet destined to the next SSR. All subsequent routers continue to decrement the TTL value, but seeding at a higher value at each SSR hop minimizes the risk of TTL expiring mid-route. Automatic allows BFD traffic to help determine hops between SSR's and adjusts padding automatically. False disables the feature. |

## Router to Conductor Connectivity
Each deployed router (and in many cases, individual nodes within that router) has multiple concurrent connections to each conductor node within its authority. The primary connection between a router and a conductor is using 930/TCP, which is an encrypted SSH connection that bears most router-to-conductor inter-process communication (IPC). The secondary connetion is that between a router's _salt-minion_ and a conductor's _salt-master_, which leverages 4505-4506/TCP.

:::important
When deploying a firewall in front of your SSR conductor, it is important to ensure that ports 930/TCP, 4505/TCP, and 4506/TCP are forwarded to your conductor node.
:::

### Software Version Check
| Direction | Port/Proto | Client Payload (bytes) | Server Payload (bytes) | Default Interval | Notes                                                        |
| --------- | ---------- | ---------------------- | ---------------------- | ---------------- | ------------------------------------------------------------ |
| to router | 4506/TCP   | 950                    | 2100                   | 12hr             | The payload size will be variable based on how many software versions are available for upgrade. |

Every twelve (12) hours, the conductor will query the router to see which versions it is eligible to download. This value is not configurable.

### Alarms
| Direction    | Port/Proto | Client Payload (bytes) | Server Payload (bytes) | Default Interval | Notes                                                        |
| ------------ | ---------- | ---------------------- | ---------------------- | ---------------- | ------------------------------------------------------------ |
| to conductor | 930/TCP    | 214 (est.)             | 150                    | variable         | The payload size and frequency of alarms sent from a router to a conductor is variable based on the types and frequencies of alarms. |

Alarms are sent by every managed router node to the conductor using a secure socket. The payload exchanged is dependent on the frequency and count of alarms that are sent.

Alarms are shown on the GUI of the conductor as well as via the PCLI command `show alarms`.

### Site-Wide Entitlement
| Direction    | Port/Proto | Client Payload (bytes) | Server Payload (bytes) | Default Interval | Notes                                                        |
| ------------ | ---------- | ---------------------- | ---------------------- | ---------------- | ------------------------------------------------------------ |
| to conductor | 930/TCP    | 182 (est.)             | 0                      | 300s             | The payload size is variable based on the name of the device transmitting the entitlement data. |

Each router relays its utilization data to the conductor every five minutes, to render it on the conductor UI as part of the conductor's _entitlement_ graph. This value is not configurable.

The current entitlement usage is shown in the device GUI as well as the output of the PCLI command `show entitlement`.

### Conductor/Asset Keepalives
| Direction    | Port/Proto | Client Payload (bytes) | Server Payload (bytes) | Default Interval           | Notes                   |
| ------------ | ---------- | ---------------------- | ---------------------- | -------------------------- | ----------------------- |
| to conductor | 4505/TCP   | 0                      | 0                      | 10s (client), 20s (server) | TCP keepalive ACKs only |

The TCP socket between the router node's _salt-minion_ and the conductor's _salt-master_ is refreshed periodically to ensure that the minion/master connectivity persists. This value is not configurable.

### Key Exchange/Security Rekeying
| Direction    | Port/Proto | Client Payload (bytes) | Server Payload (bytes) | Default Interval | Notes                                                        |
| ------------ | ---------- | ---------------------- | ---------------------- | ---------------- | ------------------------------------------------------------ |
| to conductor | 930/TCP    | 150                    | 294                    | none             | Variable based on configured `rekey-interval` and the number of `security` configuration elements. |

The conductor orchestrates a periodic key exchange when the `authority > rekey-interval` is changed from its default value of `never`. When set, each router will receive a key from conductor at the defined interval for each `security` element configured.

The status for the key exchange and rekeying process is shown in the output of the PCLI command `show security key-status`.

### Asset Keepalives
| Direction     | Port/Proto | Client Payload (bytes) | Server Payload (bytes) | Default Interval | Notes |
| ------------- | ---------- | ---------------------- | ---------------------- | ---------------- | ----- |
| bidirectional | 4506/TCP   | 514                    | 84                     | 1s               |       |

The asset keepalive messages are used to ensure persistent connectivity between a router's _minion_ and the corresponding _master_ running on its conductor(s). The asset's connection state is viewable using the `show assets` command within the PCLI on the conductor.

### Shell `connect`
| Direction     | Port/Proto | Client Payload (bytes) | Server Payload (bytes) | Default Interval          | Notes                                                        |
| ------------- | ---------- | ---------------------- | ---------------------- | ------------------------- | ------------------------------------------------------------ |
| bidirectional | 930/TCP    | 104                    | 104                    | 20s (client), 5s (server) | Amount of data exchanged is largely dependent on administrator activity once connected to a remote router. |

The conductor offers several ways of connecting to a remote router's shell (including both its PCLI shell and Linux shell): either via the `connect` command within the PCLI, or using the _PCLI cut-through_ feature within the conductor's GUI. Both of these leverage a secure (SSH) connection between the router its conductor(s).

Each _node_ within a router will connect to each of its conductors.

### Log Retriever Connection
| Direction     | Port/Proto | Client Payload (bytes) | Server Payload (bytes) | Default Interval          | Notes                                                        |
| ------------- | ---------- | ---------------------- | ---------------------- | ------------------------- | ------------------------------------------------------------ |
| bidirectional | 930/TCP    | 104                    | 104                    | 20s (client), 5s (server) | Amount of data exchanged is entirely dependent on if/when administrators retrieve logs from remote routers via conductor GUI. |

The _log retriever_ is a function within the conductor's GUI to allow administrators to download log files, packet captures, and tech-support-info bundles. When using this GUI function on the conductor, it will retrieve a file inventory via this connection, and also use that same connection to relay any logs to the user via their web browser.

Each _node_ within a router will connect using this mechanism to each of its conductors.

### Conductor-hosted Software Repository
| Direction     | Port/Proto | Client Payload (bytes) | Server Payload (bytes) | Default Interval          | Notes                                                        |
| ------------- | ---------- | ---------------------- | ---------------------- | ------------------------- | ------------------------------------------------------------ |
| bidirectional | 930/TCP    | 104                    | 104                    | 20s (client), 5s (server) | Only exchanged if the conductor hosted software repository is configured. |

When the conductor is used as a software repository for its managed routers, there will be connectivity checks sent periodically. The frequency at which these are exchanged is not configurable. When the conductor is not used as a software repository (which is the default behavior), these keepalives are not sent.

### Conductor Software Proxy
| Direction     | Port/Proto | Client Payload (bytes) | Server Payload (bytes) | Default Interval          | Notes                                                        |
| ------------- | ---------- | ---------------------- | ---------------------- | ------------------------- | ------------------------------------------------------------ |
| bidirectional | 930/TCP    | 104                    | 104                    | 20s (client), 5s (server) | Only exchanged if the conductor is configured as a proxy for software retrieval. |

When the conductor is used as a proxy for reaching the SSR software repository, there will be connectivity checks sent periodically. The frequency at which these are exchanged is not configurable. When the conductor is not used as a software proxy (which is the default behavior), these keepalives are not sent.

### SSH Keepalives
| Direction     | Port/Proto | Client Payload (bytes) | Server Payload (bytes) | Default Interval | Notes                                                        |
| ------------- | ---------- | ---------------------- | ---------------------- | ---------------- | ------------------------------------------------------------ |
| bidirectional | 930/TCP    | 84                     | 48                     | 5s               | Maintains secure socket connection between conductor and deployed router. |

The connection between the router and conductor is refreshed every five seconds using keepalive messages.

### Dynamic Peer Update
| Direction     | Port/Proto | Client Payload (bytes) | Server Payload (bytes) | Default Interval | Notes                                                        |
| ------------- | ---------- | ---------------------- | ---------------------- | ---------------- | ------------------------------------------------------------ |
| bidirectional | 930/TCP    | 128                    | 100                    | on demand        | Variable size payload based on router and node name. This is exercised whenever a dynamic IP address on a deployed router changes. |

The Dynamic Peer Update (DPU) process supplies dynamic IP address information from a router to conductor, which will then propagate that information down to all routers that create adjacencies to that address. When a `network-interface` that uses dynamic addressing (e.g., DHCP, PPPoE) acquires an address for the first time or changes its address, that information is sent to conductor via DPU.

The status of the DPU exchange is shown in the output of the PCLI command `show dynamic-peer-update`.
