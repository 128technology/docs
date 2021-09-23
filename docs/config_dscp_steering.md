---
title: Configuring DSCP Steering
sidebar_label: Configuring DSCP Steering
---

When traffic is tunneled through an encryption tunnel such as IPSec, every flow within that tunnel looks the same. DPSC packet steering allows the classification of traffic based upon the known DSCP values. 

When a packet arrives at the SSN on a DSCP-aware interface, the traffic is assumed to be received from an IPSec NAT traversal tunnel. Since IPSec NAT traversal traffic is UDP with a destination port 4500, the SSR will change the flow key that is used for the flow lookup on each packet. The protocol will be replaced by IPSec, and the destination port will be replaced with the DSCP value pulled from the packet. Flow key collisions are avoided because IPSec as a protocol doesn’t have ports in its header.

## Configuration

![DSCP Steering button](/img/dscp_steering1.png.png)

![DSCP Steering Info](/img/dscp_steering2.png)

![DSCP Steering Port Ranges](/img/dscp_steering3.png)

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

