---
title: Monitoring Head End Routers
sidebar_label: Monitoring Head End Routers
---



## Best Practices: Monitoring Head End Routers

While every network implementation has its own unique characteristics, there are some attributes that are common to all network topologies – particularly those built with the 128T Session Smart router. This Best Practices document lists some foundational metrics and data to monitor for system performance and health, and is intended as a baseline upon which network administrators can build.

### Platform Fundamentals

Each 128T router is running on a computer, and that computer may be either physical or virtual. It is important to monitor various attributes of the underlying platform to ensure a healthy, stable platform. This includes:

- **CPU utilization**. A 128T router running as a head end will "pin" a number of CPU cores for its packet forwarding engine. The number of cores is established at the time the software is installed, using a platform assessment algorithm, but may be modified by a user using the `forwarding-core-count` configuration option within the 128T data model.
- **Memory**. The 128T router should have a fairly predictable pattern of memory utilization. There may be periodic peaks of activity as various system processes run; e.g., database downsampling, resynchronizing with a peer, applying configuration, etc.
- **Disk**. All 128T log files will rotate through a fixed number of iterations (twenty five, including the active log). Thus the disk utilization should stay relatively constant.
- **System sensors**. This includes things such as the platform temperature, fan speeds, etc. (physical machines only). All computers have onboard temperature sensors, report fan RPM, among other metrics. These should be monitored to ensure proper operating conditions per the manufacturer's guidelines.
- **Link state**. 

### 128T Software Fundamentals

Generally, each head end router connects to dozens or hundreds of branch routers, and frequently over multiple transport circuits. The primary focus for monitoring a head end router is to ensure that is fit for aggregating and forwarding traffic to and from the branch routers. The important metrics to consider are:

- RIB size. The 128T router's Routing Information Base (RIB) is the accumulation of all routes that the device uses for making traffic forwarding decisions. These are acquired through configuration or through routing protocols. In general, a head end router's RIB should have a predictable number of routes. Variability in the number of RIB entries is due to routing changes, configuration changes, or peer availability.
- Session count. As a head end router processes traffic, this will create sessions in the router's *session table*. In general, the volume of traffic a router processes should be periodic; for example, in a retail deployment the traffic patterns should ebb and flow with each retail location's hours of operation. While every network will have different periodic frequencies, virtually all networks will process traffic in a fairly predictable pattern. Large spikes in sessions can be due to misbehaving or misconfigured devices, upstream servers that are not responsive to client requests, security scanning software, or denial of services attack.
- Session arrival/session departure rates. As with session counts, 