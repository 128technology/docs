---
title: Understanding High Availabilty Options
sidebar_label: High Availability Options
---

The Session Smart Router (SSR) is an enterprise-grade SD-WAN solution designed for high availability (HA) and resiliency against multiple failure modes. Its architecture supports flexible HA configurations to ensure minimal downtime and service continuity.

The SSR supports two primary HA deployment models: Dual Node HA and Dual Router HA. Both models provide redundancy and failover capabilities, but differ in topology and behavior.

The most notable difference between a dual router redundancy and a dual node redundancy is the use of a shared interface. Configuring high availability in a shared-interface configuration requires that two SSR routing nodes have at least one device-interface that is shared between them. Shared interfaces are configured on both nodes, but are active on only one node at a time. These shared interfaces must be in the same L2 broadcast domain, as the SSR uses gratuitous ARP messages to announce an interface failover, so that it may receive packets in place of its counterpart. Because the shared interfaces use VRRP and relies on gratuitous ARPs to "take over" the same IP, both physical interfaces must be connected to a switch. This network topology offers the quickest failover times across both interface and node failure scenarios.

Because the SSR is a stateful router, session state is synchronized between nodes, minimizing failover times. In a dual router topology, the SSR must reconstruct session state for all active sessions. Depending on the configured policy, this operation may be disruptive to active traffic and require active connections to be reestablished.

In addition to session state, configuration, metrics, and FIB are replicated between nodes. The architecture of the SSR is such that its routing stack does not synchronize the RIB between nodes. Instead, the SSR relies on the respective routing protocols (BGP, OSPF, multicast), graceful restart, and timer capabilities to ensure that the RIB can be regenerated on its peer node in the event of a peer node failure. Interface failures have no impact on routing when interface redundancy is in use.

In the event of a node failure where the node that fails has the active routing stack (primary node), failover times may be sub-optimal if revertible failover is configured. Revertible failover provides preference for the shared interface to be primary when the interface becomes available. In scenarios where a particular circuit is preferred, this can be desirable, however when routing is involved, the interface may become available prior to the routing stack rebuilding its RIB. Since a node failure triggers the secondary node to take over the routing function, preserving the interface state to the newly active (non-revertible failover), ensures that traffic flows to the newly active router. Unless there is a strong need to have interface preference (e.g., avoid using metered circuits), best practice is to have non-revertible failover in conjunction with VRRP.

#### Summary of Key Points

* SSR supports Dual Node HA and Dual Router HA for resiliency
* Shared interfaces enable rapid failover using VRRP and gratuitous ARP
* Session state, configuration, and FIB are synchronized; RIB is regenerated via routing protocols
* Dual Node HA offers faster failover compared to Dual Router HA
* Non-revertible failover is recommended for all configurations using VRRP

For more details about High Availability on the SSR, see [High Availability - Theory of Operation](concepts_ha_theoryofoperation.md).