---
title: Configuring DSCP Steering
sidebar_label: Configuring DSCP Steering
---

When traffic is traversing an IPSec encrypted tunnel, every flow within that tunnel shares the same layer 3 headers, making them difficult to identify. 

To provide identification and aid in load balancing and traffic engineering, DSCP values can be set at the tunnel endpoint. When the traffic reaches the SSR, the DSCP value is used for both traffic engineering priority and path priority for DSCP traffic steering.

Beginning with SSR version 6.1.4, DSCP Steering is now enabled for BGP over SVR tunnels. Using the configuration below, and [configuring BGP over SVR](config_bgp.md#bgp-over-svr-bgposvr), the child service configured for DSCP steering is now recognized and steered appropriately. 

## Basic Configuration

- Configure the ingress interface for `dscp-steering`
- Configure a parent service that matches the traffic profile of the tunnel
- Configure a child service that defines the `dscp-range` to steer

#### Example Config

Configure the `network-interface` for `dcsp-steering`:
```
network-interface foo
    name foo
    global-id 12
    vlan 0
    dscp-steering
        enabled true
        transport
            protocol udp
            port-range
                start-port 4500
            exit
        exit
    exit
exit     
```
Configure the parent service for the tunnel:
```
service          tunnel
    name           tunnel
    description    "IPSec Tunnel"
    scope          public
    security       internal
    address        5.5.5.100/0
    access-policy  red
        source      red
        permission  allow
    exit
exit
```

Configure the child service with the `dscp-range`:
```
service          high-priority.tunnel
    name           high-priority.tunnel
    description    "The high priority traffic within this tunnel"
    scope          public
    security       internal
    dscp-range     14
        start-value 14
    exit
exit
```

## How it Works

DSCP traffic steering is configured on the `network-interface` to identify the protocol and port, and the `service`, to identify the DSCP values used to steer the traffic. 

### Network Interface Configuration

Configuring `dscp-steering` at the network-interface level focuses DSCP traffic steering on a specific transport protocol and port range, rather than an entire interface.  

Only traffic matching the `dscp-steering` properties configured on the `network-interface` and in the `service` is steered using DSCP. Other traffic is handled according to the relevant configuration. 

The following example is designed to target IPSec NAT traversal traffic which is typically UDP, with a destination port 4500. 

```
network-interface foo
    name foo
    global-id 12
    vlan 0
    dscp-steering
        enabled true
        transport
            protocol udp
            port-range
                start-port 4500
            exit
        exit
    exit
exit     
```

When steering ESP traffic, ports are not specified. For example:

```
network-interface foo
    name foo
    global-id 12
    vlan 0
    dscp-steering
        enabled true
        transport
            protocol esp
            exit
        exit
    exit
exit   
```

:::info
DSCP steering was designed with IPSec use cases in mind. Traditionally IPSec uses ESP or UDP (for NAT-T) as transport, and the examples provided are the recommended configuration. In use cases beyond IPSec where DSCP steering may be useful, other transports such as `icmp`, `tcp`, and `gre` can be configured for DSCP Steering treatment as well.
:::

### Service Configuration

A DSCP value and range is configured for a child service; this identifies the priority and handling of the traffic at the router. DSCP aware services are configured in a hierarchy; DSCP values are not configured on the parent service.

The following example configuration splits the tunnel across 3 services. Traffic with `dscp-range` value 14 is handled by the high-priority service; traffic with `dscp-range` values from 26 to 28 is handled by the low-priority service. The remaining traffic falls back into the parent tunnel service.

```
service          tunnel
    name           tunnel
    description    "IPSec Tunnel"
    scope          public
    security       internal
    address        5.5.5.100/0
    access-policy  red
        source      red
        permission  allow
    exit
exit

service          high-priority.tunnel
    name           high-priority.tunnel
    description    "The high priority traffic within this tunnel"
    scope          public
    security       internal
    dscp-range     14
        start-value 14
    exit
exit

service          low-priority.tunnel
    name           low-priority.tunnel
    description    "The low priority traffic within this tunnel"
    scope          public
    security       internal
    dscp-range     26
        start-value 26
        end-value   28
    exit
exit

```

### Restrictions 

- The DSCP steering transport list for a network-interface is limited to one range.
- Any service with a `dscp-range` configuration must be a child service.
- Only provisioned service-routes are supported. 
- DSCP steering ranges must not overlap. 

## GUI Configuration Screens

The following screens demonstrate configuring DSCP steering on the network interface using the GUI.

1. Enable DSCP Steering, and select the DSCP Steering Transport button.

![DSCP Steering button](/img/dscp_steering1.png)

2. Select a protocol.

![DSCP Steering Info](/img/dscp_steering2.png)

3. Enter the port or port range.

![DSCP Steering Port Ranges](/img/dscp_steering3.png)

4. Select Validate and Commit.

![DSCP Steering Transport Validate](/img/dscp_steering4.png)


