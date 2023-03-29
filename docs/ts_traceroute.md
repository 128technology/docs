---
title: Traceroute
sidebar_label: Traceroute
---
#### Version History

| Release | Modification |
| ------- | ------------ |
| 6.1.0   | This feature was introduced. |

Traceroute is implemented as a troubleshooting tool, allowing you to debug connectivity from point to point.

Network administrators frequently make use of Linux traceroute as a complement to ping when isolating intermediate connectivity issues and troubleshooting MTU, and TTL issues. Traceroute provides information on the intermediate connectivity on a hop-by-hop basis between a source and destination. The SSR Traceroute commands provide the ability to detect failure points in connectivity along the network traffic flow. With the routing model and distributed nature of the SSR, traceroute behaves differently depending on the use case.

The following types of traceroute are available:

- `routed traceroute`: Mirrors the traceroute utility in Unix. Uses the service, tenant, and interface according to the SSR’s route table.
- `service traceroute`: Analogous to the service-ping functionality. Useful to debug test traffic as defined in the deployment.
- `peer traceroute`: Performs traceroute between two adjacent SSRs. Useful for diagnosing peering issues.

## How it Works

Discovery packets are sent from the originating SSR to a single the destination port with varying time-to-live (TTL) values. For each iteration, the TTL is increased by 1, and a 3 packet burst is transmitted. This process is repeated until the originating SSR receives a suitable ‘terminating’ packet from the final destination, or until an upper-limit is reached for hop counts. 

For service-traceroute and peer-traceroute, ICMP echo requests are the default discovery packets. To support instances where ICMP replies are disabled at the destination or disallowed by firewall rules, UDP is also supported.

## Command Information

```
admin@combo-west-a.combo-west# traceroute
usage: traceroute [peer-name <peer-name>][source-ip <source-ip>] [service <service>] [tenant <tenant>] destination-ip <destination-ip>
```

The `traceroute` command creates a traceroute context for probing the path to a specified endpoint. Traceroute targets can be specified as SVR peers, service/tenant defined endpoints, or targets reachable by routing.

| Element | Type | Description |
| --- | --- | --- |
| destination-ip | positional | The destination IP address for the traceroute command |
| peer-name | string | The name of the SVR peer to probe (default is empty) |
| service | string | The service for the traceroute command (default is empty) |
| source-ip | IP address | The source address for the traceroute command (default: 0.0.0.0) |
| tenant | string | The tenant name for the traceroute command (default is empty) |

To define each of the traceroute types, enter the following parameters:

- Service traceroute: Enter the service name, tenant, and destination-ip.
- Routed traceroute: Enter the destination-ip.
- Peer traceroute: Enter the peer name and destination-ip.

Example of a Service Traceroute:
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