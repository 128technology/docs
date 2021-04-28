---
title: Native GRE Tunnels
sidebar_label: Native GRE Tunnels
---

Generic Routing Encapsulation (GRE) is a lightweight tunneling protocol that encapsulates L3 and above in a L3 and GRE header. The 128T Networking Platform now supports both a GRE plugin as well as native GRE tunnels. 

:::note
This is not an SVR feature. No GRE tunnels will be created to send packets between peered 128T routers. However, a packet coming from SVR can egress into a GRE tunnel, and vice versa.
:::

## Sending Packets To The Tunnel

When a GRE tunnel is configured, sessions can be set up going to and from the tunnel. A first packet arriving at the 128T is sent to the service area. If the GRE tunnel is configured as a possible path for the service, the load balancer has the option of choosing the tunnel as the packet’s next hop.

When the tunnel is selcted as the next hop the session sets up normally, but an additional TUNNEL_ADD action is populated on the forward flow. This action adds the appropriate headers for the tunnel. When a packet reaches the end of the action chain, it is properly encapsulated and ready to go into the tunnel.

## Receiving Packets From The Tunnel

When a GRE tunnel is configured, a static flow is created matching the IP addresses of the GRE tunnel. This static flow receives all traffic coming from that tunnel.
It has a single action installed: `TUNNEL_REMOVE`. The `tunnel remove` action strips off the tunnel headers and forwards the packet to the normal lookup path. If a session exists, the packet gets a second flow hit and is processed by the corresponding flow. If the session for this packet does not yet exist, it will be sent to the service area, where one will be created.

## Configuration

The following information will help you configure a GRE tunnel. 

### Interface Configuration

Network-interfaces can now be configured as gre-tunnels. These interfaces are virtual interfaces, which must share a vlan tag with a non-virtual interface. The shared vlan tag indicates which non-virtual interface the tunnel is associated with.


Select the router 
Scroll down and select the Node
Select the Device interface.
Scroll down to Network interfaces and click ADD
Enter a name for the device interface and click SAVE
Under Type, select GRE Tunnel.
Under network interface tunnel settings, choose either inherited or custom. The source is the IP address of our end of the tunnel. It can be inherited from the associated non-virtual network interface, or configured explicitly using ‘custom’.
Add the Destination IP address for the tunnel. 
