---
title: Configuring Dual Router High Availability
sidebar_label: High Availability (Dual Router)
---

There are several different high availability models possible with the 128T routing software. This document covers *dual router high availability*, which is when two instances of the 128T software are each configured as separate routers (rather than as two nodes within a single router). This is characterized by:

- An iBGP interface shared between the two devices in lieu of a "fabric" interface in the dual node deployment.
- No `shared-phys-address` (and hence no shared interfaces) between the two devices. Interface protection in a dual router HA deployment is accomplished using traditional routing protocols (Layer 3) rather than IP/MAC takeover (Layer 2).
- No state synchronization between the two devices (and hence no "HA link"). While this improves  overall performance for the routers (since there is no overhead incurred due to state synchronization), the implication is that there are some capabilities not supported in this design. See Unsupported Features, below.

Dual router high availability is recommended for data center designs where there will be a large volume of traffic, as this is where the performance savings of eliminating state synchronization are most notable.





## Unsupported Features

When deploying two nodes in a dual router high availability deployment, several features that rely on synchronized state between nodes are no longer available.

- Source NAT. When source NAT is enabled, a system will allocate ephemeral ports on its egress interface as sessions leave the 128T router. Because there is no state synchronization between the two nodes in this deployment model, these ephemeral ports are not shared. Thus, if the active node fails and traffic starts transiting its counterpart, the source NAT allocation on the newly active system will be different. This will impact application flows.



... transport state enforcement



## Design Overview

Unlike a "traditional" dual node high availability design, in which two nodes compose a single router and use an out-of-band interface (the "sync interface") to synchronize state and a fabric interface to forward packets from one node to the other, the dual router trades these in for an inter-router iBGP connection for forwarding packets.

:::note
It is possible to configure multiple inter-router connections for added resiliency if there are spare physical connections available between the two routers.
:::

The sample high level topology we will discuss in this document is as follows:

![dual-router-ha-diagrams](/Users/ptimmons/Downloads/dual-router-ha-diagrams.png)

### Notes about the Topology

In this sample exercise, each of the two routers (`routerA` and `routerB`) have two WAN interfaces and one LAN interface. Between them is an interconnect cable; for collocated routers, this can be a simple "crossover" cable between the two systems.

### Routing Overview

Unlike the dual node redundancy model, where the two devices collectively harbor a single instance of the `routingManager` process, routing within the dual router redundancy model must be accomplished "by hand;" i.e., discretely on each individual system. This consists of two components:

1. Each router uses BGPoSVR to exchange routes with the other
2. For services that use `peer`-type service-routes to reach another 128T instance, these service-routes will need to include the complementary router as an additional `next-peer`. I.e., each router in the HA pair will point to the `next-peer` 128T as well as a `next-peer` for one another

## Sample Configuration

Each of the two routers that comprise the highly available pair will be configured similarly. Here is our `routerA`:

```
admin@node1.bernstein# show config runn auth router routerA

config

    authority
    
        router  routerA
            name                 routerA
            router-group         headend-datacenter1
            inter-node-security  internal
    
            node                 node1
                name                  node1
                asset-id              797b06cb-2187-406a-a933-4e93fc991fb0
                description           "routerA standalone node"
                role                  combo
                forwarding-core-mode  automatic
    
                device-interface      eno1
                    name               eno1
                    type               ethernet
                    pci-address        0000:00:01.0
                    forwarding         true
    
                    network-interface  interrouter
                        name                   interrouter
                        global-id              10
    
                        neighborhood           dc1-interrouter
                            name               dc1-interrouter
                            peer-connectivity  bidirectional
                            topology           mesh
                        exit
                        inter-router-security  unencrypted
    
                        address                169.254.1.28
                            ip-address     169.254.1.28
                            prefix-length  31
                        exit
                    exit
                exit
    
                device-interface      eno2
                    name               eno2
                    description        "LAN interface"
                    type               ethernet
                    pci-address        0000:00:02.0
                    forwarding         true
    
                    network-interface  lan
                        name         lan
                        global-id    11
                        description  "Data center LAN"
                        vlan         0
    
                        address      10.0.128.2
                            ip-address     10.0.128.2
                            prefix-length  24
                        exit
                    exit
                exit
    
                device-interface      eno3
                    name               eno3
                    description        "WAN interface 1"
                    type               ethernet
                    pci-address        0000:00:03.0
                    forwarding         true
    
                    network-interface  wan1
                        name         wan1
                        global-id    12
                        description  "WAN 1"
                        vlan         0
    
                        address      198.51.100.2
                            ip-address     198.51.100.2
                            prefix-length  24
                        exit
                    exit
                exit
    
                device-interface      eno4
                    name               eno4
                    description        "WAN interface 2"
                    type               ethernet
                    pci-address        0000:00:04.0
                    forwarding         true
    
                    network-interface  wan2
                        name         wan2
                        global-id    13
                        description  "WAN 2"
                        vlan         0
    
                        address      203.0.113.2
                            ip-address     203.0.113.2
                            prefix-length  24
                        exit
                    exit
                exit
            exit
    
            routing              default-instance
                type              default-instance
    
                interface         lo1
                    name        lo1
                    ip-address  169.254.2.1
                exit
    
                routing-protocol  bgp
                    type       bgp
                    local-as   64512
                    router-id  169.254.2.1
    
                    neighbor   169.254.2.2
                        neighbor-address  169.254.2.2
                        neighbor-as       64512
                        shutdown          false
    
                        timers
                            connect-retry                   30
                            minimum-advertisement-interval  30
                        exit
    
                        transport
                            passive-mode   false
    
                            local-address
                                routing-interface  lo1
                            exit
                        exit
    
                        address-family    ipv4-unicast
                            afi-safi       ipv4-unicast
                            next-hop-self  true
                        exit
                    exit
                exit
            exit
        exit
    exit
exit
```