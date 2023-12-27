---
title: Traceroute
sidebar_label: Traceroute
---
#### Version History

| Release | Modification |
| ------- | ------------ |
| 6.1.0   | This feature was introduced. |
| 6.2.3-R2 | Updates and improvements made to the keyword arguments |

Traceroute is implemented as a troubleshooting tool, allowing you to debug connectivity from point to point.

Network administrators frequently make use of Linux traceroute as a complement to ping when isolating intermediate connectivity issues and troubleshooting MTU, and TTL issues. Traceroute provides information on the intermediate connectivity on a hop-by-hop basis between a source and destination. The SSR Traceroute commands provide the ability to detect failure points in connectivity along the network traffic flow. With the routing model and distributed nature of the SSR, traceroute behaves differently depending on the use case.

The following types of traceroute are available:

- `routed traceroute`: Mirrors the traceroute utility in Unix. Uses the service, tenant, and interface according to the SSR’s route table.
- `service traceroute`: Analogous to the service-ping functionality. Useful to debug test traffic as defined in the deployment.
- `peer traceroute`: Performs traceroute between two adjacent SSRs. Useful for diagnosing peering issues.

## How It Works

Discovery packets are sent from the originating SSR to a single the destination port with varying time-to-live (TTL) values. For each iteration, the TTL is increased by 1, and a 3 packet burst is transmitted. This process is repeated until the originating SSR receives a suitable ‘terminating’ packet from the final destination, or until an upper-limit is reached for hop counts. 

For service-traceroute and routed-traceroute, ICMP echo requests are the default discovery packets. Peer-traceroute uses BFD packets as the default. To support instances where ICMP replies are disabled at the destination or disallowed by firewall rules, UDP is also supported.

## Command Information

```
admin@combo-west-a.combo-west# traceroute
usage: traceroute [max-hops <max-hops>] [wait-time <wait-time>] [egress-interface <egress-interface>] [source-ip <source-ip>] [gateway-ip <gateway-ip>] [service <service>] [tenant <tenant>] [peer <peer>] router <router> node <node> <destination-ip>
```

The `traceroute` command creates a traceroute context for probing the path to a specified endpoint. Traceroute targets can be specified as SVR peers, service/tenant defined endpoints, or targets reachable by routing.

#### Keyword Arguments

| Element | Type | Description |
| ---- | ---- | ----------- |
| egress-interface | string | Network interface on which to originate the traceroute session |
| gateway-ip | IP address | The gateway address on the egress interface |
| max-hops | integer | The maximum number of hops before the operation is terminated |
| node | string | The node on which to start the traceroute |
| peer | string | The peer name for the traceroute command (default is empty) |
| router | string | The router on which to start the traceroute |
| service | string | The service for the traceroute command (default is empty) |
| source-ip | IP address | The source address. Optional if the matching service utilizes a source-nat (default: 127.0.0.1) |
| tenant | string | The tenant name for the traceroute command (default is empty) |
| wait-time | integer | The maximum time, in seconds, to wait for a response to each probe (default 3s) |

#### Positional Arguments

| Element | Type | Description |
| --- | --- | --- |
| destination-ip | IP address | The destination address |

To define each of the traceroute types, enter at least the following parameters:

- **Service Traceroute**: Enter the service name and destination-ip. (Additional arguments are optional)

 `traceroute service <service-name> tenant <tenant-name> source-ip <address> <destination-ip>`

 The `source-ip` is only required if there is no `source-nat` configured. If you omit the `source-ip` without `source-nat` configured, then you will get an error requesting to either apply `source-nat,` or provide a `source-ip`.

- **Routed Traceroute**: Enter the destination-ip. By specifying the optional arguments `egress-interface` and `gateway-ip`, routed traceroute will bypass the service, tenant, and routing table. 

 `traceroute <destination-ip> egress-interface <interface-name> <gateway-ip>`

- **Peer Traceroute**: Enter the peer name, egress-interface, and destination-ip. (Additional arguments are optional)

 `traceroute peer <peer> egress-interface <interface-name> <destination-ip>`

 Peer name, egress-interface, and destination IP can be found using the `show peers` command:

 ```
 admin@combo-west-a.combo-west# show peers
 Fri 2023-12-08 18:29:26 UTC
 ✔ Retrieving peer paths...
 
 ========= ========= =================== ================ ======== ============= ==========
  Peer      Node      Network Interface   Destination      Status   Hostname      Path MTU
 ========= ========= =================== ================ ======== ============= ==========
  test-3    runner    intf1               192.168.128.2    up       unavailable       1500

 Completed in 0.11 seconds
 ```

#### Example Service Traceroute:

```
admin@combo-west-a.combo-west# traceroute service east tenant red 172.16.1.201
Running traceroute...
traceroute to 172.16.1.201, 64 hops max 
1. 172.16.102.101 10ms 7ms 1ms
2. 172.16.101.1 20ms 5ms 2ms
3. 172.16.4.1 42ms 5ms 6ms
4. 172.16.1.201 4ms 4ms 3ms
```

### Show Command

Use `show stats traceroute` to display traceroute metrics.

```
admin@combo-west-a.combo-west# show stats traceroute 

Tue 2023-02-07 14:55:09 UTC 

Retrieving statistics... 

Traceroute Handling Stats 

------------------------- 

============================= ============== ======= 

 Metric                        Node           Value 

============================= ============== ======= 

 received port-unreachable     combo-west-a       1 

 received ttl-expired          combo-west-a       3 

 received unexpected-packets   combo-west-a       0 

Completed in 0.04 seconds 
```