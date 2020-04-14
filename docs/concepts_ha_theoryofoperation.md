---
title: High Availability - Theory of Operation
sidebar_label: HA - Theory of Operation
---
This document describes the most common set of deployment models for taking two instances of 128T routing software (referred to as “nodes”) and deploying those nodes together to provide high availability. The 128T routing software presents several deployment options for high availability, including:

- **Dual node high availability**: where two nodes form one logical router, with shared state and a "fabric" backplane between them.
- **Dual router high availability**: where two nodes form two logical routers, with no shared state. This is a familiar approach to administrators accustomed to deploying pairs of legacy routing platforms.

This document will describe the benefits and caveats of each of these models, as well as delving into other architectural decisions that should be considered when deploying highly available systems.

## Intended Audience
This document is intended for network architects, and is to be used as a guideline during the network design phase of deployment.

## Introduction
High availability (or “HA”) is the practice of deploying additional network elements for traffic resiliency, to account for link or system downtime. In general, 128 Technology, Inc. encourages the deployment of highly available routers and conductors, as this will provide service continuity in the event of network failures, software faults, or hardware downtime (both scheduled and unscheduled).

:::note
There are other types of protection afforded 128T-powered networks, including path protection (via peer path selection) and link impairment protection (via session resiliency features, packet duplication, packet retransmitions, etc.), but these are not a consequence of supplying two nodes to mitigate the impact of failures.
:::

This document will define the terms used to describe the 128T router’s implementation of high availability, describe the various configurable elements associated with high availability, and how they can be set and/or tuned in order to afford maximal protection against failures. It also presents various common topologies, to assist in selecting the best model for any given deployment.

In general, the configurations presented in this document will be presented in a “vanilla” fashion – without undue service configuration, tenant configuration, traffic policies, etc. – except where necessary to illustrate specific use cases relevant to high availability behavior.

## Theory of Operation
Deploying a highly available solution offers protection from failures or maintenance operations that could impact service. Generally speaking, the protections that high availability offers can be grouped in to several categories:

- **Software protection**: the software components on a node can stop (due to upgrade, software fault, reboot, etc.) the companion components on a highly available counterpart can resume operation.
- **Hardware protection**: the platform on which the software runs can stop (due to replacement, hardware failure, power failure, etc.) while the companion highly available platform assumes control of all shared interfaces. Note that for the purposes of this document, Virtual Machines (VM) will be treated as hardware components unless specifically called out otherwise.
- **Link protection**: a single link can fail and not interrupt service, if there are shared forwarding interfaces and/or fabric interfaces (more on this later).

The 128T offers all three types of protections listed above in each of its HA models. It does so by deploying two nodes that operate in concert (as either one logical router or as two logical routers) to provide service continuity in the event of failure. Each of the nodes contains a full set of software processes necessary for forwarding traffic, running routing protocols, communicating with its peers and management systems, etc. This allows a 128T to run independently in the event that its HA counterpart is unavailable.

### Dual Node High Availability
The _dual node high availability_ design is a longstanding deployment model supported by the 128T. In this design two nodes share one common set of state; because the 128T is stateful (i.e., it retains some residual information about each active session for the lifetime of that session) it must share this information with its counterpart to protect active sessions in the event of any impairment. This model is exemplified by using a _redundancy link_, a dedicated connection between the two systems where session state is exchanged.

#### Redundancy Link
Configured within the 128T software (and implemented as a _team interface_ in Linux), this is typically implemented as a cross connect cable between two colocated systems. The "cross connect cable" is a logical concept and also includes connections between virtual machines. Also, the cross connect cable may be implemented between geographically diverse locations.

For more information about configuring redundant interfaces see [Non-forwarding HA Interfaces](config_non_forwarding_ha_interfaces.md).

The 128T configuration model only supports one redundancy link to be configured. However, it is possible to configure a second redundancy link manually. For instructions, refer to the guide [Adding Interfaces to HA Team Interface](config_adding_interfaces_to_ha_team.md) for configuring additional redundancy links.

#### About State Synchronization
This state sharing occurs via a high-performance database that is available to both nodes. As sessions are established through a 128T node, the receiving node consults this database to determine whether this session had previously been established via its counterpart. If it does not find any information, it processes this session as new, and it inserts state information into the shared database. In this way, session continuity is preserved irrespective of which node is active at the outset of an established session.

For 128T routers, session state synchronization for a session will occur only after a number of packets have been exchanged bi-directionally. This is to avoid the overhead of state synchronization for short-lived sessions (fewer than twelve packets), where a client reinitiating the session anew is as efficient as recovery.

128T conductors also leverage the redundancy link for state synchronization, to checkpoint the status of connected systems, configuration updates, and alarms.

#### Leader Election
In addition to state synchronization, the 128T software also uses the redundancy link for _leader election_ – the term used to describe the negotiation between the two systems for determining which is more fit for active duty. Because the 128T software is comprised of a number of discrete software processes (daemons), there are actually multiple "leaders" for each dual node HA system simultaneously. Below is the sample output of the command `show system processes node all` from a highly available system:

```
admin@BEACON00128A.BEACON00128# show sys proc node all
Fri 2020-02-28 10:47:26 UTC

============== ============================= ========= ========= =======
 Node           Process                       Status    Primary   Role
============== ============================= ========= ========= =======
 BEACON00128A   accessManager                 running             combo
 BEACON00128A   analyticsReporter             running             combo
 BEACON00128A   applicationFrameworkManager   running             combo
 BEACON00128A   conflux                       running             combo
 BEACON00128A   databaseQueryCoordinator      running             combo
 BEACON00128A   dynamicPeerUpdateManager      running   N         combo
 BEACON00128A   fastLane                      running             combo
 BEACON00128A   highwayManager                running             combo
 BEACON00128A   nodeMonitor                   running             combo
 BEACON00128A   persistentDataManager         running             combo
 BEACON00128A   redisServerManager            running   N         combo
 BEACON00128A   routingManager                running   Y         combo
 BEACON00128A   secureCommunicationManager    running             combo
 BEACON00128A   securityKeyManager            running   N         combo
 BEACON00128A   snmpTrapAgent                 running             combo
 BEACON00128A   stateMonitor                  running             combo
 BEACON00128A   systemServicesCoordinator     running             combo
 BEACON00128B   accessManager                 running             combo
 BEACON00128B   analyticsReporter             running             combo
 BEACON00128B   applicationFrameworkManager   running             combo
 BEACON00128B   conflux                       running             combo
 BEACON00128B   databaseQueryCoordinator      running             combo
 BEACON00128B   dynamicPeerUpdateManager      running   Y         combo
 BEACON00128B   fastLane                      running             combo
 BEACON00128B   highwayManager                running             combo
 BEACON00128B   nodeMonitor                   running             combo
 BEACON00128B   persistentDataManager         running             combo
 BEACON00128B   redisServerManager            running   Y         combo
 BEACON00128B   routingManager                running   N         combo
 BEACON00128B   secureCommunicationManager    running             combo
 BEACON00128B   securityKeyManager            running   Y         combo
 BEACON00128B   snmpTrapAgent                 running             combo
 BEACON00128B   stateMonitor                  running             combo
 BEACON00128B   systemServicesCoordinator     running             combo
```

This is a list of the system processes that make up a 128T router. (There is a similar, but different set that exists on a 128T conductor.) The fourth column in the output shows whether a process is primary (has leadership) or not. As you can see in this output, it is not unusual for one node to be leader for some processes and not others; for example, `BEACON00128A` is the leader for `routingManager`, whereas `BEACON00128B` is the leader for `securityKeyManager`.

Each of the processes indicated with a `Y` or `N` undergo leader election and remain in constant communication with one another, whereas the processes that do not have any indicator will run on both systems autonomously. Failure events will oftentimes re-trigger a leader election process to ensure the fittest system is in control.

### Dual Router High Availability
The _dual router high availability_ design is where two individual 128T software instances are coupled together to provide continuity in the event of a failure. While there is no state synchronized between the two devices (since there is no redundancy link), they are redundant to one another by upstream 128T devices detecting a failure and routing around it. Note that "detecting a failure" entails routing protocol convergence and/or SVR path failure determination.

The dual router high availability design has some distinct advantages over the dual node design:

- Fewer port requirements.
- Fewer moving parts. Because there is no dependency on synchronizing a shared database, electing leaders between paired nodes, or sharing state, the implementation is more resilient.

It does come with some tradeoffs, however:

- More rigid restrictions on the network topology (IGP/EGP).
- Certain 128T features are not usable and/or must be disabled, notably source NAT and TCP state enforcement.
- Shared interfaces cannot be used.

## Terminology
**Dual Node High Availability**: a deployment model where two instances (nodes) of 128T software are coupled as a single, logical router.

**Dual Router High Availability**: a deployment model where two instances (nodes) of 128T software are coupled as distinct, single node routers.

**Fabric link**: a connection between two nodes in a dual node high availability deployment. This link is used for forwarding traffic between the two nodes, analogous to a backplane "fabric" on a chassis-based router. This is also sometimes referred to as an *inter-node link* or a "dogleg."

**Inter-router link**: a connection between two routers in a dual router high availability deployment. This link is used for forwarding traffic between the two routers much in the same way as a fabric link does between nodes. Generally we run iBGP as an IGP over this inter-router link.

**Redundancy link**: a connection between two nodes in a dual node high availability deployment, used exclusively for synchronizing state between them. (No traffic is forwarded on this link.)

**Redundancy group**: a configuration construct for combining interfaces into a collection that *shares fate*, such that if one interface goes down, the other interface(s) in the group are administratively failed over along with it. This is useful in deployments where two nodes are configured as mirror images of one another in an "active/standby" configuration.

## Modeling
In general terms, high availability is an expense incurred to guard against failure scenarios; typically, high availability models are _not_ intended to protect against all possible failure scenarios, but the most common ones (e.g., software failure, hardware failure, circuit failure). It is impractical, and in some cases impossible, to guard against multiple concurrent failures. Thus, a tolerance profile should be constructed to include the failure scenarios that are most common, most impactful, or both.

When deploying a high availability 128T router, there are several options available depending on (Ethernet) port availability, and the tolerance profile. The two main considerations when designing a high availability 128T router are interface failure protections and platform protections (inclusive of hardware and software).

Interface protections allow for service continuity when an interface fails, or is otherwise disabled. Each interface that is to be protected has presence on both nodes in an HA couplet, which will have ramifications on the hardware platform that is selected. In a simple example, two nodes each have a single LAN and WAN interface, and these are protected. Adding a second WAN provider will incur an additional Ethernet interface on one node, but protecting it requires an additional Ethernet interface on its counterpart. Alternatively, you could deploy two independent WAN connections on each node (e.g., ISP 1 and ISP 2 on one node, ISP 3 and ISP 4 on the other node) and consume the same number of ports, but without any specific protection around any interface or ISP failure.

While the 128T platform affords you many flexibilities in your modeling, let's start with some simple assumptions and build upon them.

### Active/Standby Model
The simplest model is the active/standby model, where both nodes are configured as mirror images of one another. The LAN and WAN interfaces are protected, and there is a redundancy link between the two nodes to synchronize state. In this model, you will need to configure a set of `redundancy-group` configurations, one for each node.

This configuration protects against a LAN interface failure, a WAN interface failure, and a platform failure.

### Active/Standby Model with Fabric Interface
This model builds upon the previous by adding a fabric interface. The fabric interface between the nodes gives them a path to reach the active LAN or WAN interface, should packets arrive that need forwarding but the local LAN/WAN interface is unusable.

In the Active/Standby Model with Fabric Interface, the `redundancy-group` configuration is no longer mandatory; it can be used to govern administrative preference over which node in a pair is active when all interfaces are usable across the router. A `redundancy-group` can also be used to put both LAN and WAN traffic on a single node when there is only one interface impaired, but this is strictly administrative preference.

This model is advantaged over the standard active/standby model, in that it protects against the failure mode where dissimilar links are down on each system (e.g., the LAN interface on node 1 is down and the WAN interface on node 2 is down). This comes at the cost of one additional Ethernet port on each node, to account for the fabric link.

### Active/Active Model
The Active/Active model is one where each node in the router has (at least) one unique interface per node that is not represented on its counterpart. Generally speaking, this model has a protected LAN interface and dissimilar WAN interfaces (e.g., node 1 uses ISP 1, node 2 uses ISP 2). Just as with the Active/Standby model, you can elect to add a fabric interface – and in fact it is quite common to do so. (Without a fabric interface, only one ISP can be used at a time and it is arguably equivalent to an Active/Standby model.) With a fabric interface in place, the router will use the appropriate egress ISP based on the policies provisioned in the 128T, assuming all ISPs are active, which may mean that traffic arrives on one node and egresses via a separate node.

This model is advantaged over Active/Standby in that you get the benefit of "SD-WAN," able to leverage the best ISP path for a given type of traffic at any point in time. Yet if any platform failure occurs, each node has the ability to continue processing traffic to the array of ISPs available to it.

#### Active/Active with no Shared Interfaces
There are certain features which may be unavailable when not using shared interfaces, including:

- _source-nat_ – when there's no shared interface, there's no way to synchronize dynamically allocated source ports.
- _transport-state-enforcement_ – this feature will not work without synchronizing data between systems.

### Hybrid Models
Hybrid models include multiple LAN interfaces and multiple WAN interfaces, some or all of which may be protected. (These deployments may include `redundancy-group` configurations, to ensure the coupled interfaces are always co-active on the same node.) Hybrid models should include a fabric interface between the nodes.

This model is used when there are multiple LAN interfaces, and one or more need protection. It requires the maximum number of Ethernet interfaces, and is the most complex configuration model.