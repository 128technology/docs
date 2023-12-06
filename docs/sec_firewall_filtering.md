---
title: Customizable Firewall Rules and Filters
sidebar_label: Customizable Firewall Rules and Filters
---

The following enhancements have been made to the SSR to provide more complete protection as a firewall. 

## Packet Filtering

The SSR uses Berkeley Packet Filters (BPF) to create customizable firewall filters. This filtering solution can be used to prevent packet level attacks. Packets can be filtered by any known packet field, and the order in which filters are applied can be set by the user. 
Filters are configured and applied on the receiving network-interface. 

#### Configure using the GUI: 

Authority > Router > Node > device-interface > network-interface

1. Scroll to Filter Rule.

![Network interface filter configuration](/img/bpf_image1.png)

2. Click Add.

3. In the New Item window, name the rule and click SAVE.

![New filter name](/img/bpf_image2.png)

4. In the Filter Rule window, define:
- The action - Deny discards any matching packets (what do they match? you haven't set any packet information in this filter). Permit allows packets that match the rule to bypass any additional rules, and passes the traffic.  
- The Filter type - BPF is currently the only option. 
- Berkeley Packet Filter - Identifies the filter to be applied. Validation confirms proper BPF syntax.

![BPF Filter Rule](/img/bpf_image4.png)

5. Click Validate and Commit. From the authority drop down, select the network interface to return to the Filter list.

6. Configuration of permit rules follows the same process. 

![Permit rule configuration](/img/bpf_image5.png) 

7. After the Filter Rule list has been created, you can reorder the rules using the drop down menu to the left of the filter name. 

![Reorder menu](/img/bpf_image6.png)

This list determines the order in which filter rules are applied. 

:::note
The number of rules and the filtering operation is resource heavy and may impact performance.
:::

#### Configure from the PCLI:

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
    bpf     host
    action  permit
exit

filter-rule  DropUDP_Port400
    name    DropUDP_Port400
    bpf     "udp port 400"
    action  deny
exit
```

## ICMP 

ICMP attributes have been updated for firewall protection. 

#### Discard ICMP Echo Replies With No Request

ICMP Echo Replies that arrive at the SSR are dropped if no corresponding request has been seen and the ICMP Aysnc Reply is set to drop. This is the new default behavior; no change in configuration is necessary.

#### ICMP Type as a Session Attribute

By default, the SSR does not use ICMP codes as a session attribute. However, the SSR does match ICMP error packets with the sessions that generated them, and only accepts those ICMP packets when they match an existing session. For instance, if a TCP packet generates a `Destination Unreachable`, upon receipt of the `Destination Unreachable` the SSR uses the code to interpret the packet and match it to an existing session. If a match is found, the packet is forwarded to the end host. If a match is not found, the packet is rejected.

To enable ICMP type as a session attribute:

1. At the Authority level, select the Authority Settings button. 

![Authority Settings button](/img/ipv4_option_filter1.png)

2. Change the `ICMP Session Match` to `identifier and type`. 

![ICMP Control pane](/img/icmp_type_attribute1.png)

Changes take effect after the configuration has been committed. 

#### From the Command Line

```
*admin@conductor.conductor# configure authority icmp-control icmp-async-reply drop
*admin@conductor.conductor# configure authority icmp-control icmp-session-match identifier-and-type
```

## IPv4 Option Filtering

The SSR now has the ability to go deeper than the basic IPv4 header options check and inspect the options to make necessary decisions whether the packets are allowed or dropped and logged.

By default, all IPv4 options are allowed traffic. To configure the dropping of specific IPv4 options, you must first enable `drop-all`. This reveals the Drop Exclusions list, where you can define IPv4 options to exclude from the drop action. 

1. At the Authority level, select the Authority Settings button. 

![Authority Settings button](/img/ipv4_option_filter1.png)

2. Scroll down to the IPv4 Option Filter button, and select it.

![IPv4 Option Filter button](/img/ipv4_option_filter2.png)

3. The IPv4 Options Filter window opens, indicating the `allow-all` action. Open the drop down and select `drop-all`.

![IPv4 Option Filter window](/img/ipv4_option_filter3.png)

If you do not want any allowed options, you do not have to proceed any farther. Return to the Authority level and continue with other configuration activities. 

4. In the Drop Exclusion field, select **ADD**. 

![Drop Exclusion field](/img/ipv4_option_filter4.png)

5. Enter the Option type/number from the [IPv4 Parameters](https://www.iana.org/assignments/ip-parameters/ip-parameters.xhtml#ip-parameters-1) and click Save.

![Drop Exclusion Option number](/img/ipv4_option_filter5.png)

6. The new exclusion is listed in the Drop Exclusions table. Click ADD to configure more exclusions. 

![Drop Exclusion Option table](/img/ipv4_option_filter6.png)

#### Using the PCLI

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

Packets with broadcast or multicast source L2 addresses will now be dropped by default.

## Transport State Enforcement

By default, the SSR checks and follows the TCP sequence numbers of all the sessions passing through, and increments the associated metrics. Setting the Transport State Enforcement field to Strict ensures any packets in the TCP stream that fall outside of the sequence number stream will be dropped. 

1. Under Authority, scroll to Service Policies, and select a service policy.
2. In the Basic Information panel, click on the Transport State Enforcement drop down and select Strict.

![service policy](/img/transport_state_enforce1.png)

Any packets in the TCP stream that fall outside of the sequence number stream will be dropped. This will apply to any service that has this service policy configured.

![service](/img/transport_state_enforce2.png)

#### From the Command Line

```
*admin@conductor.conductor# configure authority service-policy prefer-path-2 transport-
state-enforcement strict
*admin@conductor.conductor#
```

## TCP Half-Open Connection Limit

Half-open TCP connections are those where the handshake has started but not completed. The SSR provides the ability to configure a limit to these half-open TCP connections. This provides protection against SYN flood DDoS attacks.

The connection limit is configured at the router level (Authority > Router), and is unlimited by default. To set a limit, enter a numerical value in the `Half-Open Connection Limit` field in the Router Basic Information panel. When configured, the SSR tracks how many half-open sessions there are based on existing TCP session state and will deny any new TCP sessions once the limit has been reached.

![TCP Connection Limit](/img/tcp_conx_limit.png)

#### From the Command Line

```
*admin@conductor.conductor#
*admin@conductor.conductor# configure authority router 128t-west half-open-connection-l
imit 100000
```

## Correlating Interfaces in Audit Events

To correlate an interface with an audit event, the internal ID of the interface is visible in the `show device-interface` command.

```
admin@test1.Fabric128# show device-interface
Fri 2023-10-27 10:06:30 EDT
✔ Retrieving device interface information...

========================================
 test1:10
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

Use this information to match an interface ID for an audit log using the `show events` command.

```
==================================================================
 2023-10-27T02:56:51.513Z Traffic request violates access policy.
==================================================================
 Type:               traffic.denied
 Node:               test1
 Denied Reason:      access
 Destination Address:172.16.2.201
 Destination Port:   443
 Ingress Interface:  1.0
 Ip Protocol:        udp
 Permitted:          False
 Source Address:     172.16.1.201
 Source Port:        10000

```




