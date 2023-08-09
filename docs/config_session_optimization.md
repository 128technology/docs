---
title: TCP Session Optimization
sidebar_label: TCP Session Optimization
---

TCP session optimization is specifically for customers using low-bandwidth, high-latency links, that experience random drops not due to traffic congestion. In this environment, session optimization will override congestion control and the `send` window to provide better performance for the TCP stream over low-bandwidth, high-latency, lossy links. 

To identify paths for TCP session optimization, BFD must indicate that the path has a high latency (more than half a second). The following settings are then configured on the device-interface.  

1. Set a [`traffic-engineering transmit-cap`](config_reference_guide.md#traffic-engineering) of 10 Mb or lower on the desired device-interface.
2. The `enable-detection` field under [`device-interface > session-optimization`](config_reference_guide.md#session-optimization-device-interface) must be true (true is the default value).

### Caveats

Because the packets that are stored for this feature cannot be easily backed up and recovered `session-optimization` should not be configured on High Availability nodes, or inline with other WAN optimization features that employ flow move or route modify. 
