---
title: Native GRE Tunnels
sidebar_label: Native GRE Tunnels
---

Generic Routing Encapsulation (GRE) is a lightweight tunneling protocol that encapsulates L3 and above in an L3 and GRE header. The 128T Networking Platform now supports both a GRE plugin as well as native GRE tunnels. 

:::note
This is not an SVR feature. No GRE tunnels will be created to send packets between peered 128T routers. However, a packet coming from SVR can egress into a GRE tunnel, and vice versa.
:::

## Sending Packets To The Tunnel

When a GRE tunnel is configured, sessions are set up to and from the tunnel. A first packet arriving at the 128T is sent to the service area. If the GRE tunnel is configured as a possible path for the service, the load balancer has the option of choosing the tunnel as the packet’s next hop.

When the tunnel is selcted as the next hop the session sets up normally, but a `tunnel_add` action is populated on the forward flow. This action adds the appropriate headers for the tunnel. When a packet reaches the end of the action chain, it is properly encapsulated and ready to go into the tunnel.

## Receiving Packets From The Tunnel

When a GRE tunnel is configured, a static flow is created matching the IP addresses of the GRE tunnel. This static flow receives all traffic coming from that tunnel.
The `tunnel remove` action is added and strips off the tunnel headers and forwards the packet to the normal lookup path. If a session exists, the packet gets a second flow hit and is processed by the corresponding flow. If the session for this packet does not yet exist, it is sent to the service area, where one will be created.

## Configuration

Use the following information to configure a GRE tunnel. 

### Interface Configuration

Network-interfaces can now be configured as gre-tunnels. These interfaces are virtual interfaces, which must share a vlan tag with a non-virtual interface. The shared vlan tag indicates which non-virtual interface the tunnel is associated with.


1. Select the router 
2. Scroll down and select the Node
3. Select the Device interface.
4. Scroll down to Network interfaces and click ADD
5. Enter a name for the device interface and click SAVE
6. Under Type, select GRE Tunnel.
7. Under network interface tunnel settings, choose either inherited or custom. The source is the IP address of the start the tunnel. It can be inherited from the associated non-virtual network interface, or configured explicitly using ‘custom’.
8. Add the Destination IP address for the tunnel. 

### Tunnel Statistics

The following tunnel encapsulation statistics provide details on encapsulation and decapsulation success, as well as failure modes.

- stats packet-processing action success tunnel gre encapsulate

- stats packet-processing action success tunnel gre decapsulate

- stats packet-processing action failure tunnel gre decapsulate: This will be seen in cases where the 128T is receiving malformed packets.

- stats packet-processing action failure tunnel invalid-entry: Only seen when a session is trying to send into a tunnel that no longer exists.  


