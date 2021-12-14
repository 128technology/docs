---
title: Native GRE Tunnels
sidebar_label: Native GRE Tunnels
---

Generic Routing Encapsulation (GRE) is a lightweight tunneling protocol that encapsulates L3 traffic in an L3 and GRE header. The 128T Networking Platform now supports both a [GRE plugin](plugin_gre.md) as well as native GRE tunnels. 

:::note
This is not an SVR feature. GRE tunnels are not created to send packets between peered 128T routers. However, a packet coming from SVR can egress into a GRE tunnel, and vice versa.
:::

## Sending Packets

When a GRE tunnel is configured, sessions are set up to and from the endpoints. With a GRE tunnel configured as a possible path for the service, the load balancer has the option of choosing the tunnel as the packet’s next hop.

When the tunnel is selcted as the next hop the session sets up normally, and the the appropriate headers are added for the tunnel. 

## Receiving Packets

On the receiving end, a static flow is created to receive all traffic coming from that tunnel. When a GRE encapsulated packet arrives, the tunnel headers are removed and the packet is forwarded to the normal lookup path. If a session exists, the packet is processed by the corresponding flow. If the session for this packet does not yet exist, a session is created.

## Configuration

Use the following information to configure a GRE tunnel. 

### Interface Configuration

Network-interfaces can be configured as gre-tunnels. These interfaces are virtual interfaces, which must share a VLAN tag with a non-virtual interface. The shared VLAN tag indicates which non-virtual interface the tunnel is associated with.

#### Configuration from the GUI
The following procedure describes configuring a GRE Tunnel using the GUI. 
1. Under Configuration, select the Router.
2. Scroll down and select the Node.
3. Select the Device Interface.
4. Scroll down to Network Interfaces and click ADD.
5. Enter a name for the device interface and click SAVE.
6. Under Type, select GRE Tunnel.
7. Under Network Interface Tunnel Settings, choose either Inherited or Custom. The Source is the IP address of the start the tunnel. It can be inherited from the associated non-virtual network interface, or configured explicitly using Custom.
8. Add the Destination IP address for the tunnel. 
9. Click Validate and Commit.

#### PCLI Configuration
The following example configuration describes using the PCLI to configure a GRE Tunnel.
Router and node configuration are provided for context:
```
router    Router128
    name           Router128
    location       usa  
    node           test1
        name              test1
        enabled           true
```
1. Create a device interface `GRE`.
```
        device-interface  GRE
            name               GRE
            type               ethernet
            pci-address        0000:00:06.0
```
2. Create a non-tunnel interface, `base`. 
```
            network-interface  base
                name       base
                global-id  2
                tenant     red

                address    172.16.3.1
                    ip-address     172.16.3.1
                    prefix-length  24
                exit
            exit
```
3. Create a tunnel interface, `tunnel`. This is the virtual interface representing the tunnel. Set the type field to `gre-tunnel`.
```
            network-interface  tunnel
                name       tunnel
                global-id  3
                type       gre-tunnel
                tenant     red
```
Please note that in this configuration, the `base` interface and the gre-tunnel interface `tunnel` share the same vlan. For this to work, they must be on a single device-interface. 

4. Create the tunnel container with a destination of the IP address for the destination of the tunnel. The source identifies how the local IP address is obtained. Setting it to `network-interface` acquires the address from `network-interface-base`.
```
                tunnel
                    destination  172.16.3.2

                    source
                        network-interface
                    exit
                exit
            exit
        exit
    exit
```
5. Create two service-routes for the tunnel, an outbound and inbound. Be sure to specify the virtual tunnel interface as the outbound service-route interface.
```
    service-route  gre-outbound
        name          gre-outbound
        service-name  gre-outbound
        next-hop      test1 tunnel
            node-name   test1
            interface   tunnel
            gateway-ip  172.16.3.2
        exit
    exit

    service-route  gre-inbound
        name          gre-inbound
        service-name  gre-inbound

        next-hop      test1 eth
            node-name  test1
            interface  base
        exit
    exit
exit

```

### Tunnel Statistics

The following tunnel encapsulation statistics provide details on encapsulation and decapsulation success, as well as failure modes.

- [`stats packet-processing action success tunnel gre encapsulate`](cli_stats_reference.md#show-stats-packet-processing-action-success-tunnel-gre-encapsulate)

- [`stats packet-processing action success tunnel gre decapsulate`](cli_stats_reference.md#show-stats-packet-processing-action-success-tunnel-gre-decapsulate)

- [`stats packet-processing action failure tunnel gre decapsulate`](cli_stats_reference.md#show-stats-packet-processing-action-failure-tunnel-gre-decapsulate): The decapsulate failure indicates that the packets entering from the tunnel either were not tunneled properly, or are otherwise malformed.

- [`stats packet-processing action failure tunnel invalid-entry`](cli_stats_reference.md#show-stats-packet-processing-action-failure-tunnel-invalid-entry): The `invalid-entry` stat should be 0; it indicates a system error with propagating the tunnel configuration.


