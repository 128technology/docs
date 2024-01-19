---
title: Concepts of Traffic Engineering
sidebar_label: Concepts
---

A significant challenge with networking is how to manage traffic across network applications running on connected devices in different environments - not to mention the dynamic nature of those applications and their performance requirements! To ensure a consistent quality of service (QoS) and real-time delivery of data, it becomes imperative to employ traffic engineering schemes. 

These schemes can be used to accommodate traffic patterns, improve network efficiency, manage traffic dynamically, and provide quality of service. Through ongoing analysis, we can predict and regulate the the behavior of data traffic, and optimize the network performance. 

The objectives of Traffic Engineering are:

- Optimize Load balancing
- Minimize network congestion (path congestion?) 
- Maximize QoS
- Improve resource utilization
- Reduce packet loss
- Minimize end to end delays
- Minimize energy consumption

Let's use a typical HQ/Branch deployment to illustrate some ways we can use traffic engineering to optimize the traffic flow across this network.

### Network Topology

Following diagram illustrates a typical HQ/Branch deployment. The Customer has a contract with their service provider to receive 150 Mbps symmetric links at each branch. Any traffic sent above 150Mbs will be dropped at the ISP router. In order to reduce the impact on real-time traffic, the Customer wants the SSR to make an intelligent decision on what to drop, rather than having their router randomly drop traffic.

In this case, we can leverage Traffic Engineering schemes provided by the SSR to prioritize important traffic, and make necessary (any?) changes to the network design. **(this isn't clear - is the SSR going to automatically make the design changes, or is it going to prioritize traffic and the user makes the design changes? I think the latter.)**

![Network Topology](/img/concepts_traff_eng.png)

There are two methods for applying traffic engineering. 
- Classify Ingress traffic into priority queues using either DSCP Marking or Local Classification
- Enforce Egress Traffic classifications using a Transmit Cap and Traffic Profile

The SSR provides tools to classify traffic at Ingress and apply policies to enforce traffic engineering at Egress. In order to leverage Traffic Engineering on an SSR port, a user has to configure traffic-engineering enabled to True under the device-interface. 

## How It Works - Ingress Traffic

The SSR has four queues that define priority; High, Medium, Low, and Best-Effort, and traffic can be assigned to the appropriate queue. The SSR classifies ingress traffic into these queues in two ways: using DSCP marking prioritization, or local prioritization. DSCP marking uses the DSCP value from the ingress packet to determine priority through the use of a DSCP map. Local prioritization classifies traffic based solely on the configuration in the SSR. 

### DSCP Map Classification

DSCP mapping allows user to classify ingress traffic to the four priority queues; Priority 0 for High priority traffic, 1 for Medium, 2 for Low and 3 for Best effort. User can configure additional traffic classes and  directly assign the incoming DSCP to traffic classes.

To use a DSCP Map, change the Prioritization mode under Network Interface settings to DSCP and assign a DSCP map covering the DSCP values from 0 to 63 under different priorities. (does this involve additional customization?)

### Local Classification

Local classification is enabled by default on the network interfaces. Local classification uses the following built-in tools:
- Traffic Class: Traffic classes are queues that the SSR maintains for every egress (really? I thought this was ingress port information??) port. There are 4 traffic classes:
    - High: Used for high priority traffic such as VOIP, or Live streaming traffic
    - Medium: Used for Multimedia or Control plane traffic
    - Low: Used for standard traffic like low priority cloud apps.
    - Best-Effort: Internet or scavenger traffic

- Service Class: (note to myself: service-class only applies to DSCP traffic - as configured above) A `service-class` provides a way for you to define categories of traffic for prioritization, the priority queue to which the traffic will be assigned, and the DSCP value that the SSR marks the traffic with on egress. A service-class can also be used for policing traffic on a per-session basis through rate-limiting. If rate-limiting is enabled for a service-class, both a `max-flow-rate` and `max-burst-rate` can be configured. By default, the SSR configuration contains pre-defined service-classes. These can be used as is, modified, deleted, or augmented with custom service-class definitions. A DSCP value can only belong to one service-class. Traffic is assigned to a service-class in one of the following ways.

 - If ingress traffic matches a configured session-type by destination-port, the service-class configured for the session-type will be used for the session. 
 - If the service where the traffic is classified has a service-policy which specifies a service-class, the service-class will be used for the session. 

 :::note 
 When traffic matches both a configured session-type, and the service’s service-policy has a session-type, the session-type of the service-policy will be used. 
 :::

 Example: A user has a service configured for VOIP traffic. They want to give priority to VOIP traffic. To do this they must configure a service-policy with an appropriate service-class (Telephony) and assign the service-policy to the VOIP Service.

- Session Type: The session-type defines common protocols and classifies them by transport type and destination port numbers. A service-class is a mandatory configuration option for a session-type. By default, the SSR configuration contains pre-defined service-classes. These can be used as is, modified, deleted, or augmented with custom service-class definitions.

 Example: A user has an internet service defined as 0.0.0.0/0, with a service-policy that does not include a service-class. TCP port 80 matches session-type HTTP which is assigned to the default Standard service-class. UDP/TCP port 53 matches session-type DNS, which is assigned to the NetworkControl service-class.

 :::note
 There is an exception to this statement for session-type RTP. The SSR will perform DPI to detect RTP sessions instead of using the port-ranges of 5004-5005.
 :::

## Egress Traffic
Egress traffic is classified using the methods below.

- Transmit Cap
 A `transmit-cap` must be configured to identify the upper limit of bandwidth out of a physical port. In order for traffic engineering to operate correctly, this must be configured appropriately. For example, if the device port is 1Gbps, but the ISP is policing the upstream bandwidth at 100Mbps, the transmit speed should be capped at 100Mbps.

- Traffic Profile
 A traffic profile identifies and reserves a percentage of the available bandwidth (per the transmit-cap) for each of the SSR priority queues.  
 For example, a user assigns 40% of the transmit-cap to the best-effort queue, and 20% of the transmit-cap to each High, Low and Medium queue. 
 In a case where the Best Effort queue is only being utilized at 5% of the transmit-cap and there is more ingress High priority traffic than 20% of the egress transmit-cap, then the High priority traffic will consume bandwidth from the Best Effort queue until the Best Effort queue needs to completely utilize its reserved bandwidth. This is true for all the queues. 

The diagram below illustrates how these configurations relate to one another:

![Traffic Engineering Overview](/img/config_traff_eng_overview.png)

