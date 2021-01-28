---
title: Secure Vector Routing Savings Proof Points
sidebar_label: Secure Vector Routing Savings
description: 'Session Smart tunnel-free SD-WAN affords cost savings of 30-40% over traditional tunnel-based SD-WAN solutions.  The proof is in the pudding, as can be realized with the built-in proof points tool.'
---

Traditional SD-WAN solves the issues of WAN connectivity by creating virtual networks, or overlays, on top of the current transport network. Overlay-based SD-WAN however comes with a dependency on tunnels. While the use of tunnels can make the creation of overlays easier, tunnels bring with them a number of costs. In some applications, such as VoIP, tunnel overhead consumes as much as 40% to 100% additional packet bandwidth[^1], resulting in poor bandwidth efficiency, increased latency, packet drops and worst of all, poor customer experience.

[^1]: https://www.128technology.com/blog/tunnel-based-versus-tunnel-free-sd-wan-with-acg-research/

Overlay-based SD-WAN creates a network transport that is heavyweight and less optimized; fragmentation is introduced; and scalability and security are negatively impacted. 128T Session Smart routers offer a tunnel-free SD-WAN solution, which is more native, lightweight and scalable, to implement than overlay-based SD-WAN.

A tunnel, as defined according to [RFC 1853](https://tools.ietf.org/rfc/rfc1853.txt), encapsulates original IP payload with a new IP header. The original IP header is maintained while a new one is added.

![Tunnel](/img/about_svr_savings_3.png)

The advantage of a tunnel is to bridge portions of the network that have disjointed capabilities and policies. This encapsulation of traffic, when it reaches its destination, needs to be decapsulated, leaving the original IP header with its payload.

Although there are many kinds of tunnels, all have one thing in common: they add additional bytes to existing IP packets.

GRE (defined in [RFC 2784](https://tools.ietf.org/html/rfc2784)) is very popular in the SD-WAN industry.
GRE Overhead = 8 (GRE bytes) + 20 (IP GRE Header) = 24 Bytes. Therefore, GRE adds 24 additional bytes to the packet size.

IPsec with GRE: IPsec (defined in [RFC 6071](https://tools.ietf.org/html/rfc6071)) is a very popular way of creating encrypted tunnels in SD-WAN. IPsec enables authentication and encryption of IP packets. IPsec uses two main protocols, Authentication Header (AH) and Encapsulating Security Payload (ESP). These protocols authenticate (AH) and encrypt plus authenticate (ESP), respectively.

IPsec can be used in conjunction with GRE or VXLAN tunneling protocols. This means GRE header is added first, followed by the IPsec header.
IPsec Overhead: 20 (IPsec Header) + 8 (ESP Header) + 8 (Init. Vector) + 2 (ESP Trailer) + 12 (ESP Auth.) = 50 Bytes
Therefore, a total of 50 bytes are added additionally to MTU. This is in addition to the 24 bytes added by GRE.

Virtual Extensible LAN (VXLAN): Although VXLAN (defined in [RFC 7348](https://tools.ietf.org/html/rfc7348)) is very popular in the data center world, it has found its way into the SD-WAN industry. Because VXLAN is a layer 2 encapsulation, it encapsulates the entire Ethernet frame.
VXLAN Overhead = 20 (Outer IP Header) + 8 (Outer UDP) + 8 (VXLAN Header) + 14 (Inner Ethernet Header) = 50 Bytes, which is 50 bytes extra as compared to the native IP packet.

When an application uses a smaller packet size, adding tunnel overhead results in a very inefficient utilization of bandwidth. This is true about common applications, such as VoIP that uses a packet size of 60 bytes when utilizing G.729 codec.
For the impact of tunnel on VoIP, consider the case of a GRE tunnel:
* IP Packet = 60 bytes (as required for G.729 codec)
* Additional bytes for GRE = 24 Bytes
* Percentage of additional bytes needed = 24/60 = 40%

This means 40% additional bytes are required to carry IP packets that are otherwise not needed if the packet is sent natively. This kind of calculation can be repeated for IPsec (with GRE) and VXLAN. The impact of the additional bytes can be clearly seen. The worse case scenario is IPsec with GRE.  That is nearly 123% overhead.

SD-WAN is commonly deployed on internet links, and if it is a low bandwidth link or if the link suffers from congestion, which if often the case, this will lead to performance degradation of the application.

Packet size increase has a negative impact not only on bandwidth usage but also affects the transmission and queuing delay, thus affecting jitter and overall packet delay and the customer’s experience.

The problem of tunnels is only exaggerated in cloud deployments. The [economic benefits of SVR in the cloud](https://www.128technology.com/wp-content/uploads/2018/08/economic-benefits-of-session-smart-routing-in-sd-wan-and-cloud-networks-by-acg-research.pdf) are realized even more.

One of the biggest downsides to tunnels is that of the bandwidth overhead, but there are also security, quality of service, and scaling issues as well.  You can read about other issues with tunnels and overhead [here](https://www.128technology.com/blog/13-debts-of-tunnel-networks/).


128T Session Smart tunnel-free SD-WAN makes the network more scalable, bandwidth efficient, eliminating fragmentation and delivering better security when compared to the traditional tunnel-based SD-WAN. When tunnel-free SD-WAN is combined with session awareness, the network becomes dynamic and stateful. This results in an intelligent distributed fabric that goes beyond the stateless L2 and L3 connectivity provided by other SD-WAN solutions. By removing the overhead burden from transport and the need to process such overheads from CPE, the SD-WAN network becomes simple. SD-WAN CPE becomes more scalable and less costly, resulting in potential capex savings.

## Secure Vector Routing Savings Comparison Tool

The GUI of the 128T offers a comparison tool to contrast different tunneling techniques and their bandwidth overhead with that of SVR directly on the traffic traversing the 128T in its environment.

![SVR Savings](/img/about_svr_savings_1.png)

Clicking on the line graph will show the data points over time for your traffic, indicating how much overall bandwidth is used. Optionally, you can view the overhead as a percentage of the payload to get a better understanding of tunneling costs.
![SVR Savings Graph](/img/about_svr_savings_2.png)

:::info
The tool can not account for differences in configured MTU within the network. If tunnel encapsulation introduces fragmentation, the bandwidth savings are greater as each fragmented packet incurs additional encapsulation overhead.
:::

