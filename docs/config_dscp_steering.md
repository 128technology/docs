---
title: Configuring DSCP Steering
sidebar_label: Configuring DSCP Steering
---

When traffic is tunneled through an encryption tunnel such as IPSec, every flow within that tunnel looks the same. DPSC packet steering allows the classification of traffic based upon the known DSCP values. 

When the tunnel endpoint encrypts traffic, it can set a DSCP value representative of the traffic within the tunnel. When the traffic reaches the SSR, the DSCP value can be used as both a representation of traffic engineering priority, and path priority.

## Configuration Options

### Service Configuration

A DSCP value or range can be configured at the Service level. The dscp-aware services are configured in a hierarchy, with the parent service configured without a DSCP value, and the children service are configured with a DSCP value.

The following configuration splits the tunnel across 3 services: the traffic with dscp value 14 is handled by the high-priority service; the traffic with dscp values from 26 to 28 is handled by the low-priority service. The remaining traffic falls back into the tunnel service.

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
        End-value   28
    exit
exit

```

### Network Interface Configuration

The `dscp-steering` option is available at the network-interface level. This allows you to enable traffic steering for dscp traffic entering on a specific transport and port range rather than an entire interface.  

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

```

### Restrictions 

- The DSCP steering transport list for a network-interface is limited to one range.
- Any service with a `dscp-range` configuration must be a child service.
- Only provisioned service-routes are supported. 
- DSCP steering ranges must not overlap. 

## GUI Configuration Screens

The following screens demonstrate configuring the network interface using the GUI.

Enable DSCP Steering, and select the DSCP Steering Transport button.

![DSCP Steering button](/img/dscp_steering1.png)

Select a protocol.

![DSCP Steering Info](/img/dscp_steering2.png)

Enter the port or port range.

![DSCP Steering Port Ranges](/img/dscp_steering3.png)


