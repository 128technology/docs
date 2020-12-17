---
title: Service and Topology Exchange Protocol (STEP)
sidebar_label: Service and Topology Exchange Protocol (STEP)
---

Because networks are constantly changing, services and service reachability information need to be dynamically exchanged between routers. Services are defined to represent the capabilities that the network is designed to deliver to consumers. These services, along with their requisite policies and characteristics, dictate how the traffic patterns traverse the network. 

Service and Topology Exchange Protocol (STEP) provides a way to achieve service availability through a central repository. STEP helps network administrators easily design and scale existing or new networks and provide insight into the service availability across the whole network.

The **STEP Repository** is built upon a highly efficient and scalable in-memory database. There is no business logic in the STEP repository itself; all of the routing decisions (both client publishing routing data, and the client using the data to perform path computations) are performed on each router.

Routers participating in a STEP-enabled network publish information about services, peer connections, and link state in a JSON encoded document called the STEP document. This information is used by all routers to intelligently route traffic to services and react to network changes. The STEP repository can also be used by service providers to advertise service information from their networks/authority.

A router supporting STEP publishes a document to the STEP repository. To enable optimal routing decisions in the network, routers need to advertise the peer path SLA metrics in their STEP router document and publish that to the STEP repository. Much of the router document content is expected to be stable and only need occasional updates (such as the operational status of a peer path changing from “up” to “down” or vice versa). 

However, the peer path metrics can change constantly, multiple times per minute. These loss, latency and jitter metrics are measured at every BFD link test interval (10 seconds by default), so advertising them frequently represents a scaling problem. In general, a router will update its router document and publish it as soon as a relevant change has occurred. But updating the peer path metrics requires a damping mechanism. This guide describes the processing pipeline that receives the raw metric update stream from BFD and transforms it into a manageable series of STEP router document updates. 

### Calculating the Weighted Moving Average (WMA)

The peer path SLA metrics originate from BFD and are individually generated for each peer path on the router. By default, this happens every 13s. The metrics are:

- loss (as a percentage)
- latency (in ms)
- jitter (in ms)

These metrics need to be advertised in the STEP router document, but at a lower frequency. In support of that, a moving average calculation is performed to smooth out brief spikes. The moving average is weighted towards the most recent values, and the sample size for the moving average is configurable. The default sample size is 3. The WMA parameters can be configured by neighborhood. For configuration information, see [Configuring Weighted Moving Average Parameters](config_STEP.md#neighborhood-and-adjacency).

### Determining the Reporting Delay

In order to determine how quickly a metric change needs to be advertised, the latest SLA metrics coming out of the WMA calculation are compared against the values most recently advertised in the router document. The result is a percentage increase or decrease for each of the three metric types. The largest percentage increase and the largest percentage decrease are chosen from the three percentage values. The Reporting Delay parameters can be configured by neighborhood. For configuration information, see [Configuring Weighted Moving Average Parameters](config_STEP.md#neighborhood-and-adjacency).

#### Threshold Values

A 100% change from 1ms latency to 2ms latency versus a 100% change from 100ms to 200ms is qualitatively different. Threshold values for the three metric types can be configured that set a “noise floor”. Changes in value below the threshold are considered trivial and don’t contribute to the percentage increase/decrease calculation. Before calculating the change, both the previously advertised metric values and the latest WMA metric values are raised up to the threshold (if they are below). The comparison is then done on those resulting values.

The default thresholds are:
- Loss = 1%
- Latency = 5ms
- Jitter = 2ms

#### Mapping from Percentage Change to Resulting Reporting Delay

After computing the largest increase and largest decrease percentage, those values then get mapped to a reporting delay value (measured in seconds). By delaying the report of a small change, the router document update gets deferred to a later time, when the metric might have already changed back to its previously advertised value. In that case, the router document update would be avoided completely.

As new moving average values come in, the delay gets re-evaluated, always comparing the latest WMA against the values in the most recent router document advertisement. The reference point from which the delay will be applied is the earliest time a change was detected after the most recent router document advertisement. That way the reporting of the metric change does not get delayed indefinitely. 

### Consolidating Individual Updates Into Router Document Updates

After waiting for the computed delay, a peer path metric change is ready to be included in the next router document update. Ideally that should happen right away in order to get the information out. But there can be multiple peer path metric changes, each with their own reporting delay, resulting in different points in time when they are ready to be advertised in the router document.
To consolidate this into a small number of router document updates, an overall rate limit is imposed on the router document updates. The configurable parameters are:

- Average interval (in seconds) between router document peer path metric updates (default is 3 minutes).
- Burst size, measured in how many updates may happen in bursts faster than the average interval (default is 2).

Additionally, the burst rate is configurable. That is the smallest possible interval between two consecutive router document peer path metric updates. The default is 30 seconds. The end effect of these rate limiting measures is that “interesting” changes will get advertised immediately (if the metrics were relatively stable before), whereas in the worst case of constant major change, the router will limit itself to the average update interval (3 minutes by default).

For detailed information about configuring STEP please see [Configuring STEP](config_STEP.md). 
