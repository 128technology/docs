---
title: TCP Session Optimization
sidebar_label: TCP Session Optimization
---

TCP session optimization is specifically for customers using low-bandwidth, high-latency links, that experience random drops not due to traffic congestion. In this environment, session optimization will override congestion control and the `send` window to provide better performance for the TCP stream over low-bandwidth, high-latency, lossy links. 

To identify paths for TCP session optimization, BFD must indicate that the path has a high latency (more than half a second). The following settings are then configured on the device-interface.  

1. Set a [`traffic-engineering transmit-cap`](config_reference_guide.md#traffic-engineering) of 10Mbs (or maybe 25Mbps - checking on this) or lower on the desired device-interface.
2. The `enable-detection` field under [`device-interface > session-optimization`](config_reference_guide.md#session-optimization-device-interface) must be set to `true` (true is the default value).

### Limitations

Session failover for optimized sessions is not supported in HA configurations.

SVR uses UDP transport on transport links, so any WAN optimization features for TCP will no longer effect SVR UDP-based underlay traffic.

Since the SSR operates as a full caching TCP proxy for optimized sessions, third party TCP optimization solutions deployed on overlay endpoints may not function properly across the SVR optimized links.