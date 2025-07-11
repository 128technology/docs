---
title: Ethernet Over Secure Vector Routing
sidebar_label: Ethernet Over Secure Vector Routing
---

Ethernet Over SVR (EoSVR) extends the Ethernet broadcast domain across multiple sites. EoSVR provides a site to site ethernet broadcast domain between SSR routers with increased security and efficiency, without the overhead of IP packet encapsulation.

Layer 2 and IP traffic destined for your LAN arrives on the SSR and is transported over an Ethernet Over SVR bridge to the destination SSR within the customer network. The bridge is configured between not more than two routers, and the configuration is validated before committing it to the running config.

EoSVR is only supported for point to point layer 2 services, and provides the following advantages over traditional MPLS networks:
- Eliminates additional CE routers needed to deploy MPLS pseudowires.
- First packet processing with metadata for VxLAN packets eliminates the need to tunnel the VxLAN packet within another IP packet (e.g. GRE).
- SVR packets can travel over multiple transport types (Internet or MPLS), providing multipath failover redundancy. 
- Increased security; SVR packets are encrypted and authenticated.

See [Configuring Ethernet over SVR](config_EthoSVR.md) for configuration information. 

## Packet Types
There are four types of packets that are enabled for Ethernet Over SVR:
- Non-IP, multicast, and broadcast packets.
- IP packets.
- VxLAN packets carrying Non-IP packets.
- VxLAN packets carrying IP packets.

### Non-IP, Multicast and broadcast Traffic

Non-IP (ARP, CDP, LLDP, etc), multicast, and broadcast traffic are encapsulated within an IP payload and transported as an SVR packet. Once marked as EoSVR, the flow is given a high timeout, allowing the flow to be reused for all non-IP packets. 
All SVR capabilities are available for non-IP encapsulated packets including failover, service policy enforcement, and multi-hop. EoSVR is backward compatible with all existing routers, and can be enabled on a per end point basis.

Each router with an EoSVR bridge auto generates a new, specific service and service-route for EoSVR traffic, allowing remote routers with the same bridge name to access the EoSVR bridge. When the bridge name is manually specified, a new service-route is introduced.

Non-IP traffic is unidirectional. For example, router R1 and router R2 have the same bridge name configured. An ARP request on EoSVR bridge on router R1 creates a session to R2 via SVR. The ARP reply from R2 creates another session to R1. These sessions will timeout if no other non-IP packets are detected.

#### Tunneling

There is an option to encapsulate and tunnel all traffic if necessary. In this case, even the IP traffic will be tunneled under the session. Q-in-Q traffic is treated as non-ip traffic and uses the same session.

### IP Traffic

All IP traffic is sent over SVR with the following new fields in the metadata:

- Source MAC
- Destination MAC

The first packet carries the metadata containing the L2 information to the final SSR. There the ethernet header is replaced with the fields above, and the packet is sent to the final destination.

The new metadata field avoids tunneling the entire IP packet inside another IP packet. The first packet carries the layer 2 information. Any subsequent packets that are sent without metadata have the layer 2 information restored at the final SSR, which extends the broadcast domain.

Flows setup for IP Traffic are bidirectional. These packets are expected to be in the same broadcast domain, and the ethernet address is preserved at the final SSR.

### VxLAN Traffic

VxLAN traffic is is identified by having a destination port of 4789. When VxLAN traffic arrives on an SSR, a service is defined to carry the traffic. This service will have a service-route with a next-hop to the peer SSR. Because VxLAN traffic is unidirectional, two services are used to transport VxLAN traffic from one SSR to another, one in each direction. 

**SSR R1 Service**
```
Service Vxlan_To_R2
  protocol UDP
  Port 4789
  Address 1.1.1.0/24
  ```

**SSR R2 Service**
```
Service Vxlan_To_R1
  protocol UDP
  Port 4789
  Address 2.2.2.0/24
```
If more addresses are involved, they are added to the existing service. All VxLAN traffic is sent over SVR with new fields in ebedded in the metadata. 

### Ethernet Over Secure Vector Routing across a NAT boundary

Due to differences in the nature of EoSVR versus regular SVR, standard methods for [Session Recovery Detection](config_session_recovery.md#session-recovery-detection) and prevention may not function as well for EoSVR traffic. In scenarios where a spoke router needs to sit behind a NAT in relation to the hub, it is recommended to set the NAT device to 1:1 NAT to the SSR, rather than implementing NAPT.



