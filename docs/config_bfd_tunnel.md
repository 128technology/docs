---
title: BFD Tunnels over SVR
sidebar_label: BFD Tunnels over SVR
---

In situations where SVR sessions between SSRs are limited due to carrier settings, the established BFD channel is leveraged to encapsulate SVR sessions. When enabled, the SSR transforms each packet in the SVR session to a UDP packet, matching the IP/Port tuples of the BFD peer connection. The carrier will not see any additional sessions between the SSRs beyond the initial BFD peer connection. 

## Configuration

This feature is accessed from Authority -> Router -> Node -> Device -> Network Interface -> Neighborhood, as part of a `spoke` configuration.

In the SSR GUI, use the path described above to access the Neighborhood configuration. After naming the neighborhood, choose the `spoke` topology type. This opens the Peer Path (Connectivity?) Overlay field. The following options are available:

- **svr**: The SVR overlay connection method. This is the original method that consists of bidirectional and outbound-only connectivity behavior 
- **bfd-tunnel**: This connection method enables the Tunnel Packets Over BFD feature. 

### How it Works

Both peers must have the same overlay model (bfd-tunnel) to accurately enable tunneling, as well as be running the same version of the SSR software. 

An attribute is added to the unencrypted metadata to UDP packets going over the BFD connection to distinguishes the this tunnel from other BFD traffic. New sessions are established with this additional overhead. 
Sessions contiue to allocate waypoints, and are used to create individual flows. These waypoints will be carried in metadata and used locally on each router. 

 ## Troubleshooting

 Use the following `show stats` metrics to view and troubleshoot issues encountered with BFD Tunneling:

- `/stats/packet-processing/action/success/tunnel/bfd/encapsulate` 
- `/stats/packet-processing/action/success/tunnel/bfd/decapsulate`