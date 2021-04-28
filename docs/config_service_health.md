---
title: Service Health Learning
sidebar_label: Service Health Learning
---

## Service Health Learning and Fault Avoidance

When an interface is operationally down, or ARP requests to the next-hop gateway are not consistently returned, the path in question will be removed from routing decisions. In concert with dynamic routing protocols such as BGP, network software is able to determine the best path to the destination. However in some deployments, routers can be pre-configured with all potentially available transports, or lacking in dynamic routing protocols to determine if the path to the final destination is available on a given route. As a result, the path selected by the router might effectively black-hole traffic. 

A unique advantage of Session Smart Routing is that it can understand patterns and characteristics of the underlying traffic passing through the system. These heuristics can then be leveraged on a number of different parameters in order to make more intelligent routing and load balancing decisions.

- Per Service 
- Per Path
- Per transport and application such as TCP, UDP, TLS etc
- Per destination (/32 address only)
- Per traffic-class (high, medium, low, best-effort)

The Session Smart Router (SSR) collects key performance metrics to assist in making load balancing decisions, such as:

- Number of TCP connection errors
- Number of UDP failures due to ICMP unreachable
- Time to first data packet for TCP and TLS

Service Health Learning can operate in a detection mode to gather the metrics listed above, and then enforce path selection based on the experienced values.

## Detection Mode

Detection Mode is configured on the service-route, and allows you to gather statistics based on the traffic profiles as described in [Session Establishment Metrics](concepts_metrics.md/#session-establishment-metrics). This mode defines the criteria the 128T router uses to apply load balancing decisions. Detection mode allows you to visualize the current network and understand the necessary configuration for enforcement. 

### Configure Detection Mode

Detection Mode is configured per service-route, and gathers statistics using [Session Establishment Metrics](concepts_metrics.md/#session-establishment-metrics). 

To enable Detection Mode:

1. Under Authority, select a router.
2. Scroll down to Service Routes.
3. Click ADD.
4. Enter a Name for the new Service Route, and click SAVE.
5. Choose the Service Name.
6. Choose the Service Route Type and the Peer (if necessary). 
7. Under Reachablitily Detection Settings, click Enable.

**There is no `detection-window` setting in the UI although the spec asks for one.** 

Reachability Detection is now enabled and will gather service route information. Configure as many detection settings as necessary to gather information about the network connectivity. 
The next step is to set Enforcement Mode parameters for load balancing.

## Enforcement Mode

In Enforcement Mode, you define a traffic profile using the parameters from Detection Mode to apply criteria that determines the health of a path and subsequent selection by the load balancer. 

### Configure Enforcement Mode

It is easiest to use the service routes configured in Detection Mode and simply enable Reachability Detection Enforcement. 

1. Under Authority, select a router.
2. Scroll down to Service Routes.
3. Select the Service Route.
4. Under Reachability Detection Settings, Enable Reachability Detection Enforcement.
5. Define the Enforcement detection window (time). The detection-window (default 5s) determines how often the stats will be aggregated in terms of min, max and median. 
6. Define an Enforcement Hold-down time. This determines how long the path stays down upon determining it is unusable. 
7. If you have previously configured a reachability profile, select the appropriate profile.
8. Click Validate, and then Commit.  

If you have not created a reachability detection profile, use this procedure to do so. 

1. Go to the Router level (up one level).
2. Scroll down to Reachability Profile, and click ADD.
3. Under Protocol, click ADD.
4. Select the protocol type from the drop-down(tcp, tls, udp) and click SAVE.
under the protocol class label, click ADD.
5. Select a traffic class ID and click SAVE. The traffic-class configuration allows you to configure different treatments for different classes of traffic for the same service.  
6. In the `time-to-establishment.label` field, set enabled to true and define the max and mean times as necessary. The time-to-establishment allows you to configure a max and a mean time for a session to be established as defined for the protocol. 
7. Return to the Router level.
8. Select the Service Route.
9. Scroll down to Reachability Detection settings, and in the Reachability Detection Enforcement Profile, select the Reachability Profile you just created. 
10. Click Validate, and then Commit.   

