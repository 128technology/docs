---
title: Open Shortest Path First (OSPF)
sidebar_label: OSPF
---
This section provides guidance for implementing OSPF on the SSR Networking Platform. The OSPF feature enables a dynamic and flexible integration of SVR in customer networks.

Open Shortest Path First (OSPF) is an interior gateway protocol (IGP) that is most often used to dynamically manage network routes in large enterprise networks. It determines routes dynamically by obtaining information from other routers and advertising routes to other routers by way of Link State Advertisements (LSAs). The information gathered from the LSAs is used to construct a topology map of the network. This topology map is shared across routers in the network and used to populate the IP routing table with available routes.

Learning routes from OSPF simplifies enterprise configuration and integration with Secure Vector Routing.

#### Revision History

| Release | Modification | 
| --- | --- |
|6.2.3-R2 | Support for OSPF V3 added |

## Prerequisites
This document presumes you have a running SSR system and want to add configuration to support OSPF. The running SSR system includes configuration for basic platform functionality (e.g., router, node, device-interface, network-interface) and basic routing configuration (e.g., tenants, services, etc.).

## OSPF Configuration

Each configuration step below shows both the command line input and corresponding screen from the GUI.

As with BGP and static routes, the OSPF configuration exists within the routing configuration container in the SSR data model. First, we’ll configure the OSPF “instance” and give it the instance-id of 1.
```
*admin@labsystem1.fiedler# config authority
*admin@labsystem1.fiedler (authority)# router burlington 
*admin@labsystem1.fiedler (router[name=burlington])# routing default-instance 
*admin@labsystem1.fiedler (routing[type=default-instance])# ospf 1
*admin@labsystem1.fiedler (ospf[instance=1])# show 

instance 1
```

![OSPF pane](/img/ospf-image1.png)

![New OSPF instance](/img/ospfv2-image2.png)

Next we’ll configure a router-id. Typically, the highest router-id on the network becomes the designated router for the network.
```
*admin@labsystem1.fiedler (ospf[instance=1])# router-id 192.0.2.1
*admin@labsystem1.fiedler (ospf[instance=1])# show 

instance 1
router-id 192.0.2.1
```

![OSPF1 Router ID](/img/ospfv2-image3.png)

Next we'll configure the OSPF version. The default version is OSPFv2, but you can also configure OSPFv3. Only one OSPFv2 and one OSPFv3 instance is allowed per VRF.

:::note
The command to configure OSPFv3 is similar to v2 and shown here:
`version ospfv3`
:::

```
*admin@labsystem1.fiedler (ospf[instance=1])# version ospfv2
*admin@labsystem1.fiedler (ospf[instance=1])# show
instance      1
version       ospfv2
```

![OSPF Version](/img/ospfv2-image3a.png)

Next we’ll configure an OSPF area and put interfaces into that area. The area is in the format x.x.x.x; for example, area 0 is configured as 0.0.0.0. Interfaces, as they are in other areas of the system, require the node name that contains the interface and the interface’s name.
:::note
If adding an interface that is part of a highly available set (e.g., they share the same MAC address and global ID), it is important that you only add one of the interfaces into the area. This will be sufficient to achieve high availability, as the SSR software will map the “shared” interface into the area.
:::
```
*admin@labsystem1.fiedler (ospf[instance=1])# area 0.0.0.0
*admin@labsystem1.fiedler (area[id=0.0.0.0])# interface labsystem5 lan0
*admin@labsystem1.fiedler (interface[node=labsystem5][interface=lan0])# exit
*admin@labsystem1.fiedler (area[id=0.0.0.0])# exit
*admin@labsystem1.fiedler (ospf[instance=1])# show 

instance    1
version     ospfv2
router-id 192.0.2.1
area 0.0.0.0
id 0.0.0.0
       interface  labsystem5 lan0
       node       labsystem5
       interface lan0
       exit
exit
```

![OSPF area](/img/ospfv2-image4.png)

Next, we can optionally elect to have the SSR redistribute connected routes, static routes, BGP routes, or service routes into OSPF. This is done with one or more “redistribute” elements within the OSPF instance. (Within each of these redistribute elements you can specify metrics, metric-type, and policies to apply to the redistributed routes.)
```
*admin@labsystem1.fiedler (ospf[instance=1])# redistribute bgp
*admin@labsystem1.fiedler (redistribute[protocol=bgp])#
*admin@labsystem1.fiedler (redistribute[protocol=bgp])# up
*admin@labsystem1.fiedler (ospf[instance=1])# redistribute static
*admin@labsystem1.fiedler (redistribute[protocol=static])# up
*admin@labsystem1.fiedler (ospf[instance=1])# show
instance    1
version     ospfv2
router-id   192.0.2.1

area          0.0.0.0
       id            0.0.0.0

       interface  labsystem5 lan0
       node       labsystem5
       interface  lan0
       exit
exit

redistribute  bgp
       protocol  bgp
exit

redistribute  static
       protocol  static
exit
```

![OSPF Redistribution](/img/ospfv2-image9.png)

To enable service routing ([service-route elements](concepts_glossary.md#service-routes)) to leverage the learned routes that a SSR has exchanged via OSPF (or any routing protocol), the “use-learned-routes” selector should be enabled in the appropriate service-route configuration.
```
*admin@labsystem1.fiedler (router[name=burlington])# service-route rte_internet
*admin@labsystem1.fiedler (service-route[name=rte_internet])# use-learned-routes
*admin@labsystem1.fiedler (service-route[name=rte_internet])# show
name rte_internet
service-name internet
use-learned-routes
```

![OSPF Learned Routes](/img/ospfv2-image11.png)

![OSPF Topology](/img/config_ospf.png)

## Configuration Verification
Several `show` commands are available in the PCLI to display information about the state of the OSP protocol. In addition to the `show ospf` branch of output, you will also see contributions to the RIB from OSPF in the output of `show rib`.
```
admin@labsystem1.fiedler# show ospf
usage: ospf [area <area-id>] [router <router>] [<verbosity>]

Show general information about OSPF

keyword arguments:
area   the area to filter OSPF information for
router the router to request OSPF information from

positional arguments:
verbosity    detail | summary (default: summary)

subcommands:
border-routers    Show information about the OSPF border routers
database          Show OSPF database information
interfaces        Show information about the OSPF interfaces
neighbors         Show information about OSPF neighbors
routes            Show information about the OSPF routes
```

## OSPF Graceful Restart

OSPF Graceful Restart helps avoid route flaps and dropped traffic due to a software or hardware failure. For example, if the routing protocol on a peer router crashes and restarts, or the routing protocol one HA node fails and fails over to another node, OSPF graceful restart will avoid dropped traffic and route flapping. 

### How Does It Work?

When a router peered with another router via OSPF restarts, the peered router withdraws any routes learned from the restarting router until the restart is complete and the routing protocol connection is re-established. This withdrawal of routes often causes route flaps and dropped traffic. However, the SSR may continue to forward packets even though the routing protocol has restarted because the forwarding function is independent of the routing protocol. This is especially true for dual node High Availability. 

By enabling OSPF GR on all peered routers, timers can be set to prevent the peered router from withdrawing routes. Additionally, enabling the `helper-restart timer` and `strict-lsa-checking` will configure whether or not to terminate OSPF graceful restart in a situation where there is a change to an LSA that would be flooded to the restarting router, or when there is a changed LSA on the restarting router's retransmission list. 

#### Interaction with BGP Graceful Restart

For situations where OSPF is redistributed into BGP, an additional timer has been added which will allow OSPF graceful restart to complete before a BGP graceful restart completes. 

For situations where OSPF is redistributed into BGP, the `select-delay-time` timer has been added to BGP Graceful Restart. It is important that the OSPF graceful restart complete before the BGP graceful restart completes, due to the impact on the routing table. This should be set to a value greater than the time for OSPF graceful restart to complete. To determine the OSPF graceful restart length, examine the logging messages seen via `debug ospf graceful-restart`. 

### Simple Configuration

```
    ospf              1
        instance          1

        graceful-restart
            restart-time  120

            helper
                helper-restart-time  120
            exit
        exit
```

For additional information about the OSPF graceful restart commands, please see [`ospf graceful-restart`](config_command_guide.md#configure-authority-router-routing-ospf-graceful-restart). 

## OSPF Troubleshooting Steps
1. Verify OSPF router information (`show ospf detail` or `show ospf summary`)
    1. Check the area
    2. Check for adjacency
2. Verify OSPF interface (`show ospf interface`)
3. Verify OSPF neighbors (`show ospf neighbors`)
    1. Check state FULL for each neighbor
    2. Verify which router is the designated router
4. Verify RIB (`show rib` or `show ospf routes`)
   1. Routes beginning with O are OSPF routes
5. Verify FIB (`show fib`)
   1. FIB entry has the appropriate next hop
```
admin@SSRconductor-node.SSRConductor# show ospf router SSR Router summary
Sat 2018-10-20 17:48:29 UTC

================== =============== ========== ======== =========== ========= =========== ========
Router              Router ID       ABR Type   ASBR     External    Area ID   Area Type   Area
                                               Router   LSA Count                         Border
                                                                                          Router
================== =============== ========== ======== =========== ========= =========== ========
SSR Router          10.52.113.128   unknown    true     84          0.0.0.0

Completed in 0.66 seconds
admin@SSRconductor-node.SSRConductor#

*admin@SSRconductor-node.SSRConductor# show ospf router SSRRouter detail
Sat 2018-10-20 17:46:27 UTC

=============================================================
 Router SSRRouter
=============================================================
  Router ID:                             10.10.10.128
  Deferred Shutdown:                     0.0 s
  RFC1583 Compatible:                    false
  Stub Advertisement Enabled:            false
  Opaque Capable:                        false
  Post-Start Enabled:                    0.0 s
  Pre-Shutdown Enabled:                  0.0 s
  SPF Schedule Delay:                    0.0 s
  Holdtime Minimum:                      50 ms
  Holdtime Maximum:                      5000 ms
  Holdtime Multiplier:                   1
  SPF Last Executed:                     -1d 17h 56m 15s ago
  SPF Last Duration:                     0 ms
  SPF Has Not Run:                       false
  SPF Timer Due:                         0.0 s
  LSA Minimum Interval:                  5.0 s
  LSA Minimum Arrival:                   1.0 s
  Write Multiplier:                      20
  Refresh Timer:                         10.0 s
  ABR Type:                              unknown
  ASBR Router:                           true
  External LSA Count:                    84
  External LSA Checksum:                 0x002c4b5a
  Opaque AS LSA Count:                   0
  Opaque AS LSA Checksum:                0x00000000
  Attached Area Count:                   1
  Adjacency Changes Logged:              false
  Adjacency Changes Logged (all):        false
  Area:
    Area ID:                             0.0.0.0
    Backbone:                            true
    Interface Total Count:               1
    Interface Active Count:              1
    Fully Adjacent Neighbor Count:       1
    Authentication:                      none
    Passing Fully Virtual Adjacencies:   0
    SPF Executed Count:                  4
    LSA Count:                           3
    LSA Router Count:                    2
    LSA Router Checksum:                 0x0000c2b1
    LSA Network Count:                   1
    LSA Network Checksum:                0x0000c606
    LSA Summary Count:                   0
    LSA Summary Checksum:                0x00000000
    LSA ASBR Count:                      0
    LSA ASBR Checksum:                   0x00000000
    LSA NSSA Count:                      0
    LSA NSSA Checksum:                   0x00000000
    LSA Opaque Link Count:               0
    LSA Opaque Link Checksum:            0x00000000
    LSA Opaque Area Count:               0
    LSA Opaque Area Checksum:            0x00000000
    
Completed in 0.58 seconds
admin@SSRconductor-node.SSRConductor#

admin@SSRconductor-node.SSRConductor# show ospf database router SSRRouter
Sat 2018-10-20 03:21:52 UTC

============ ============= ============= ============== ============= ===== ============
 Router       Area ID       Type          LSA ID         Advertising   Age   Sequence
                                                         Router              Number
============ ============= ============= ============== ============= ===== ============
 SSRRouter   0.0.0.0       Router        10.10.10.128   10.10.10.128  617   0x8000000e
 SSRRouter   0.0.0.0       Router        10.10.10.1     10.10.10.1    385   0x80000017
 SSRRouter   0.0.0.0       Network       10.58.0.0      10.10.10.1    641   0x80000003
 SSRRouter   unavailable   AS_External   10.0.0.0       10.10.10.128  607   0x80000006
 SSRRouter   unavailable   AS_External   10.1.254.96    10.10.10.128  597   0x80000006
 SSRRouter   unavailable   AS_External   10.10.60.0     10.10.10.128  597   0x80000006
 SSRRouter   unavailable   AS_External   10.10.220.0    10.10.10.128  587   0x80000006
 SSRRouter   unavailable   AS_External   10.10.221.0    10.10.10.128  607   0x80000006
 SSRRouter   unavailable   AS_External   10.10.225.0    10.10.10.128  617   0x80000006
 SSRRouter   unavailable   AS_External   10.10.226.0    10.10.10.128  607   0x80000006
 SSRRouter   unavailable   AS_External   10.10.252.0    10.10.10.128  627   0x80000006
 SSRRouter   unavailable   AS_External   10.52.0.0      10.10.10.128  627   0x80000006
```