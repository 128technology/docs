---
title: Native GRE Tunnels
sidebar_label: Native GRE Tunnels
---

Generic Routing Encapsulation (GRE) is a lightweight tunneling protocol that encapsulates L3 and above in a L3 and GRE header. The 128T Networking Platform now supports both a GRE plugin as well as native GRE tunnels. 

:::note
This is not an SVR feature. No GRE tunnels will be created to send packets between peered 128T routers. However, a packet coming from SVR can egress into a GRE tunnel, and vice versa.
:::

## Sending Packets To The Tunnel

When a GRE tunnel is configured, it becomes possible to set up sessions going to and from the tunnel. When a first packet arrives at the 128T and is sent to the service area, if the tunnel is configured as a possible path for the service, the load balancer has the option of choosing the tunnel as the packet’s next hop.
If the tunnel is chosen as the next hop, the session will be set up as normal, but an additional TUNNEL_ADD action will be populated on the forward flow.  This action will add the appropriate headers for the tunnel. When a packet reaches the end of its action chain, it will be properly encapsulated and ready to go into the tunnel.

## Receiving Packets From The Tunnel

When a GRE tunnel is configured, a static flow gets created matching the IP addresses of the tunnel with the protocol GRE. This static flow will receive all traffic coming from that tunnel.
It has a single action installed: TUNNEL_REMOVE. The tunnel remove action will strip off the tunnel headers and forward the packet on to the normal lookup path.  From there, if a session already exists, the packet will get a second flow hit and be processed by the corresponding flow. If the session for this packet does not yet exist, it will be sent to the service area, where one will be created.

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
