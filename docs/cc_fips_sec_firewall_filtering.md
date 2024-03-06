---
title: Customizable Firewall Rules and Filters
sidebar_label: Customizable Firewall Rules and Filters
---

As part of the security hardening and certification process, the SSR has implemented the following firewall features to provide a more secure platform for network traffic.  

The SSR implements a packet filtering firewall which allows you to define rules for filtering traffic. The rules may be defined for specific traffic or all  traffic. 

When Firewall filtering rules are defined, only the traffic identified in the traffic filtering rules is filtered. All other traffic is allowed. If no firewall rules are configured, traffic flows normally subject to the SSR configuration. 

Firewall rules may be applied to each network interface separately, and are applied in the order defined by the user. The SSR follows the rule base for each network connection and implements the first rule that matches the traffic. The SSR inspects each packet independently, and no residual information for previously inspected packets influences the inspection.

## Packet Filtering

The SSR uses Berkeley Packet Filters (BPF) to create customizable firewall filters. This filtering solution can be a key tool to prevent packet level attacks and aid with intrusion detection and prevention. Using BPF, packets on the SSR can be filtered by any known packet field, and the order in which filters are applied can be set by the user. 
Filters are configured and applied on the receiving network-interface. 

#### Configuration 

1. At the Authority level, define the router, then the node, the device interface, and the network interface where the filters will be configured.

2. Under `filter-rule`, define:
- The `action` - `deny` discards any packets matching the filter applied. `permit` allows packets that match the rule to bypass any additional rules, and passes the traffic.  
- The filter type - `bpf` (Berkeley Packet Filter) is currently the only option. This identifies the filter to be applied. Validation confirms proper BPF syntax.

3. Configuration of permit rules follows the same process.  

4. After the Filter Rule list has been created, you can reorder the rules using the `move` command. This list determines the order in which filter rules are applied.

:::note
The number and complexity of rules will have an impact on forwarding performance.
:::

#### Configuration Example:

```
*admin@conductor.conductor# configure authority router 128t-west
*admin@conductor.conductor (router[name=128t-west])# node 128t-west
*admin@conductor.conductor (node[name=128t-west])# device-interface bfp-test
*admin@conductor.conductor (device-interface[name=bfp-test])# network-interface intf30
*admin@conductor.conductor (network-interface[name=intf30])# filter-rule DropUDP_Port400
*admin@conductor.conductor (filter-rule[name=DropUDP_Port400])# action deny
*admin@conductor.conductor (filter-rule[name=DropUDP_Port400])# bpf "udp port 400"
*admin@conductor.conductor (filter-rule[name=DropUDP_Port400])# exit
*admin@conductor.conductor (network-interface[name=intf30])# filter-rule PermitIPaddress
*admin@conductor.conductor (filter-rule[name=PermitIPaddress])# action permit
*admin@conductor.conductor (filter-rule[name=PermitIPaddress])# bpf "host 192.168.0.0"
```
Rules can be moved using the `move` command:

```
*admin@conductor.conductor (device-interface[name=bfp-test])# network-interface intf30
*admin@conductor.conductor (network-interface[name=intf30])# move filter-rule DropUDP_Port400 after PermitIPaddress
*admin@conductor.conductor (network-interface[name=intf30])# show
name         intf30

filter-rule  PermitIPaddress
    name    PermitIPaddress
    bpf     "host 192.168.0.0"
    action  permit
exit

filter-rule  DropUDP_Port400
    name    DropUDP_Port400
    bpf     "udp port 400"
    action  deny
exit
```

:::note
Detailed information about Berkeley Packet Filters is outside of the scope of this documentation, but is readily available on the internet.
:::

## ICMP 

Because ICMP can be an attack vector for a network or used to discover your network topology, ICMP attributes have been updated for firewall protection. 

### ICMP Type as a Session Attribute

By default, the SSR does not use ICMP codes as a session attribute. However, the SSR does match ICMP error packets with the sessions that generated them, and only accepts those ICMP packets when they match an existing session. For instance, to protect against ICMP attacks from using a barrage of `Destination Unreachable` messages, if a TCP packet generates a `Destination Unreachable`, upon receipt of the `Destination Unreachable` the SSR uses the code to interpret the packet and match it to an existing session. If a match is found, the packet is forwarded to the end host. If a match is not found, the packet is rejected.

To enable ICMP type as a session attribute:

1. From the Authority level, configure `icmp-control`. 


2. Set `icmp-async-reply` to `drop`.

3. Set `icmp-session-match` to `identifier and type`. 

#### Configuration Example

```
*admin@conductor.conductor# configure authority icmp-control icmp-async-reply drop
*admin@conductor.conductor# configure authority icmp-control icmp-session-match identifier-and-type
```

### Discard ICMP Echo Replies With No Request

When you configure the ICMP Async Reply as `drop` (shown above), any ICMP Echo Replies that arrive at the SSR are dropped if no corresponding request has been seen. This helps to prevent DoS (Denial of Service) attacks such as an ICMP Ping flood. 

## IPv4 Option Filtering

Attackers sometimes configure IPv4 options incorrectly, producing either incomplete or malformed fields. These malformed packets can be used to compromise hosts on the network. IPv4 Options Filtering provides a mechanism to determine what to do with network data packets based on the options field of the packets. The SSR will inspect the IPv4 header options, compare them to a user defined exclusiont list, and make necessary decisions whether the packets are allowed or dropped and logged.

By default, all IPv4 packets with options are allowed. To configure the dropping of specific IPv4 options, you must first enable `drop-all`. This reveals the Drop Exclusions list, where you can define IPv4 options to exclude from the drop action. 

1. At the Authority level, configure `ipv4-option-filter action drop-all`. 

2. To configure allowed options, `ipv4-option-filter drop-exclusion 11`. 

3. Enter the Option type/number from the [IPv4 Parameters](https://www.iana.org/assignments/ip-parameters/ip-parameters.xhtml#ip-parameters-1).

#### Configuration Example

```
*admin@conductor.conductor# configure authority ipv4-option-filter action drop-all
*admin@conductor.conductor# configure authority ipv4-option-filter drop-exclusion 11
*admin@conductor.conductor# show config candidate authority ipv4-option-filter

config

    authority

        ipv4-option-filter
            action          drop-all
            drop-exclusion  11
        exit
    exit
exit

*admin@conductor.conductor#
```

### Broadcast and Multicast Source Addresses

To prevent DoS attacks, packets with broadcast or multicast source IP and MAC addresses are now dropped by default. Otherwise the traffic is propogated across the entire network, flooding the network.

## Transport State Enforcement

This functionality sets the action on how the TCP state machine should process unexpected TCP packets. This is important because in some cases where these unexpected packets arrive, it may indicate a TCP Reset attack. By default, the SSR checks and follows the TCP sequence numbers of all the sessions passing through, and increments the associated metrics. Setting the Transport State Enforcement field to Strict ensures any packets in the TCP stream that fall outside of the sequence number stream will be dropped. 

Any packets in the TCP stream that fall outside of the sequence number stream will be dropped. This will apply to any service that has this service policy configured.

#### Configuration Example

```
*admin@conductor.conductor# configure authority service-policy prefer-path-2 transport-
state-enforcement strict
*admin@conductor.conductor#
```

For a detailed description of Transport State Enforcement, refer to [Transport State Enforcement](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/bcp_service_and_service_policy_design#transport-state-enforcement). For additional configuration information, see the [transport-state-enforcement](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/config_reference_guide#service-policy) parameter. 

## TCP Half-Open Connection Limit

Half-open TCP connections are those where the handshake has started but not completed. An attacker will initiate the handshake in order to take over all available TCP connections, known as a SYN Flood attack or distributed denial of service  (DDoS) attack. This prevents service to legitimate traffic and potentially bring down the network.

The SSR provides the ability to configure a limit to these half-open TCP connections. 

The connection limit is configured at the router level (Authority > Router), and is unlimited by default. To set a limit, enter a numerical value in the `Half-Open Connection Limit` field in the Router Basic Information panel. When configured, the SSR tracks how many half-open sessions there are based on existing TCP session state **and will deny any new TCP sessions once the limit has been reached**.

:::caution
When the SSR approaches the configured limit of half-open TCP connections, the establishment of **healthy** TCP sessions may be significantly impacted. Please ensure that this value is set appropriately for your network. More importantly, attempt to identify the devices that are creating half-open sessions.
:::

Additionally, if you require a limit for half-open TCP sessions, it may be helpful to consider the initial TCP session timeout value. The default timer is 10 seconds. If an application fails to establish a TCP socket, the sessions that are in that state will still remain on the SSR for that initial timeout. 

An awareness of these two values (half-open limit and TCP session timer) may mitigate the impact of limiting the establishment of **healthy** TCP sessions.

#### Configuration Example

```
*admin@conductor.conductor#
*admin@conductor.conductor# configure authority router 128t-west half-open-connection-l
imit 100000
```

## Firewall Audit Events

Use the `show events type traffic` to display the two types of traffic events. 

Use the `show events type traffic.denied` or the `show events type traffic.permitted` to display the  firewall audit events.

```
admin@combo-east-a.combo-east# show events type traffic.denied
Wed 2024-03-06 21:00:24 UTC
==================================================================
 2024-03-06T21:00:23.956Z Traffic request violates access policy.
==================================================================
 Type:               traffic.denied
 Node:               combo-east-a
 Denied Reason:      access
 Destination Address:172.16.2.40
 Destination Port:   1024
 Ingress Interface:  1.10
 Ip Protocol:        udp
 Permitted:          False
 Source Address:     172.16.1.40
 Source Port:        1024
```

```
admin@combo-east-a.combo-east# show events type traffic.permitted
Wed 2024-03-06 21:12:25 UTC
=====================================================
 2024-03-06T21:11:18.014Z Traffic request permitted.
=====================================================
 Type:               traffic.permitted
 Node:               combo-east-a
 Destination Address:172.16.1.40
 Destination Port:   1024
 Ingress Interface:  5.0
 Ip Protocol:        udp
 Permitted:          True
 Source Address:     172.16.2.40
 Source Port:        1024

=====================================================
 2024-03-06T21:08:57.335Z Traffic request permitted.
=====================================================
 Type:               traffic.permitted
 Node:               combo-east-a
 Destination Address:172.16.1.2
 Icmp Type:          8
 Ingress Interface:  1.10
 Ip Protocol:        icmp
 Permitted:          True
 Source Address:     172.16.1.40
``` 

To correlate an interface with a firewall audit event, use the internal ID of the interface to undrestand which interface generated the event. This is visible in the `show device-interface` command as the `Internal ID: 1`. 

```
admin@test1.Fabric128# show device-interface
Fri 2023-10-27 10:06:30 EDT
✔ Retrieving device interface information...

========================================
 test1:LAN
========================================
 Type:                ethernet
 Internal ID:         1
 Forwarding:          true
 PCI Address:         0000:00:04.0
 MAC Address:         fa:16:3e:88:8d:c1

 Admin Status:        up
 Operational Status:  up
 Provisional Status:  up
 Redundancy Status:   non-redundant
 Speed:               10 Gb/s
 Duplex:              full

 in-octets:                         360
 in-unicast-pkts:                     4
 in-errors:                           0
 out-octets:                          0
 out-unicast-pkts:                    0
 out-errors:                          0

 Plugin Info:         unavailable

```

### Discarded Traffic

When firewall filtering is enabled, and rules are configured, any traffic that does not match the configured policies will be discarded/dropped. Additionally, any traffic meeting the following conditions will be discarded:

- Any malformed packets.
- If the source address of the network packet is defined as being on a broadcast network.
- If the source address of the network packet is defined as being on a multicast network.
- Any packets with the following IP options: Loose Source Routing, Strict Source Routing, or Record Route.



