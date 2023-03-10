---
title: BFD Overlay over SVR
sidebar_label: BFD Overlay over SVR
---

In deployments where the number of SVR sessions between SSRs are limited due to carrier settings, the established BFD channel is leveraged to encapsulate SVR sessions. When enabled, the SSR transforms each packet in the SVR session to a UDP packet, matching the IP/Port tuples of the BFD peer connection. The carrier does not see any additional sessions between the SSRs beyond the initial BFD peer connection. 

## Configuration

This feature is accessed from Authority -> Router -> Node -> Device -> Network Interface -> Neighborhood, as part of a `spoke` configuration.

In the SSR GUI, use the path described above to access the Neighborhood configuration. After naming the neighborhood, choose the `spoke` topology type. This opens the Peer Path Overlay field. The following options are available:

- **svr**: The original SVR overlay connection method. This is the default method for bidirectional connectivity behavior. 
- **bfd-tunnel**: Outbound only connection method; enables the BFD Overlay over SVR feature. 

**Need pcli equivalent config information**

### How it Works

Both peers must be running the same version of the SSR software and have the same overlay model (`bfd-tunnel`) for BFD overlay to work correctly. 

An attribute is added to the unencrypted metadata of UDP packets going over the BFD connection to distinguish this traffic from other BFD traffic. New sessions are established with this additional overhead. Sessions continue to allocate waypoints, and are used to create individual flows. These waypoints are carried in the metadata and used locally on each router. 

 ## Troubleshooting

 Use the following `show stats` metrics to view and troubleshoot issues encountered with BFD Overlay over SVR:

- `/stats/packet-processing/action/success/tunnel/bfd/encapsulate` 
- `/stats/packet-processing/action/success/tunnel/bfd/decapsulate`