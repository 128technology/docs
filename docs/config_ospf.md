---
title: Open Shortest Path First (OSPF)
sidebar_label: OSPF
---
The goal of this guide is to provide guidance for implementing OSPF on the 128T Networking Platform. The OSPF feature enables a dynamic and flexible integration of SVR in customer networks.
Open Shortest Path First (OSPF) is an interior gateway protocol (IGP) that is most often used to dynamically manage network routes in large enterprise network. It determines routes  dynamically by obtaining information from other routers and advertising routes to other routers by way of Link State Advertisements (LSAs). The information gathered from the LSAs is used to construct a topology map of the network. This topology map is shared across routers in the network and used to populate the IP routing table with available routes.

Learning routes from OSPF simplifies enterprise configuration and integration with Secure  Vector Routing.

## Prerequisites
This document presumes that the reader has a running 128T system and wants to add configuration to support OSPF. The running 128T system includes configuration for basic platform functionality (e.g., router, node, device-interface, network-interface) and basic routing configuration (e.g., tenants, services, etc.).

## OSPF Configuration
As with BGP and static routes, the OSPF configuration exists within the routing configuration container in the 128T data model. First, we’ll configure the OSPF “instance” and give it the instance-id of 1.
```
*admin@labsystem1.fiedler# config authority
*admin@labsystem1.fiedler (authority)# router burlington *admin@labsystem1.fiedler (router[name=burlington])# routing default-instance *admin@labsystem1.fiedler (routing[type=default-instance])# ospf 1
*admin@labsystem1.fiedler (ospf[instance=1])# show
instance 1
```
Next we’ll configure a router-id. Typically, the highest router-id on the network becomes the designated router for the network.
```
*admin@labsystem1.fiedler (ospf[instance=1])# router-id 192.0.2.1
*admin@labsystem1.fiedler (ospf[instance=1])# show
instance 1
router-id 192.0.2.1
```
Next we’ll configure an OSPF area and put interfaces into that area. The area is in the format x.x.x.x; for example, area 0 is configured as 0.0.0.0. Interfaces, as they are in other areas of the system, require the node name that contains the interface and the interface’s name.
:::note
If adding an interface that is part of a highly available set (e.g., they share the same MAC address and global ID), it is important that you only add one of the interfaces into the area. This will be sufficient to achieve high availability, as the 128T software will map the “shared” interface into the area.
:::
```
*admin@labsystem1.fiedler (ospf[instance=1])# area 0.0.0.0
*admin@labsystem1.fiedler (area[id=0.0.0.0])# interface labsystem5 lan0
*admin@labsystem1.fiedler (interface[node=labsystem5][interface=lan0])# exit
*admin@labsystem1.fiedler (area[id=0.0.0.0])# exit
*admin@labsystem1.fiedler (ospf[instance=1])# show
instance 1
router-id 192.0.2.1
area 0.0.0.0
id 0.0.0.0
       interface  labsystem5 lan0
       node       labsystem5
       interface lan0
       exit
exit
```
Next, we can optionally elect to have the 128T redistribute connected routes, static routes, BGP routes, or service routes into OSPF. This is done with one or more “redistribute” elements within the OSPF instance. (Within each of these redistribute elements you can specify metrics, metric-type, and policies to apply to the redistributed routes.)
```
*admin@labsystem1.fiedler (ospf[instance=1])# redistribute bgp
*admin@labsystem1.fiedler (redistribute[protocol=bgp])#
*admin@labsystem1.fiedler (redistribute[protocol=bgp])# up
*admin@labsystem1.fiedler (ospf[instance=1])# redistribute static
*admin@labsystem1.fiedler (redistribute[protocol=static])# up
*admin@labsystem1.fiedler (ospf[instance=1])# show
instance      1
router-id     192.0.2.1

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
To enable service routing (service-route elements) to leverage the learned routes that a 128T has exchanged via OSPF (or any routing protocol), the “use-learned-routes” selector should be enabled in the appropriate service-route configuration.
```
*admin@labsystem1.fiedler (router[name=burlington])# service-route rte_internet
*admin@labsystem1.fiedler (service-route[name=rte_internet])# use-learned-routes
*admin@labsystem1.fiedler (service-route[name=rte_internet])# show
name rte_internet
service-name internet
use-learned-routes
```
![OSPF Topology](/img/config_ospf.png)

## Configuration Verification
Several “show” commands are available in the PCLI to display information about the state of the OSP protocol. In addition to the “show ospf” branch of output, you will now see contributions to the RIB from OSPF in the output of “show rib”.
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

## OSPF Troubleshooting Steps
1. Verify OSPF router information (show ospf detail or show ospf summary)
    1. Check the area
    2. Check for adjacency
2. Verify OSPF interface ( show ospf interface)
3. Verify OSPF neighbors (show ospf neighbors)
    1. Check state FULL for each neighbor
    2. Verify which router is the designated router
4. Verify RIB (show rib or show ospf routes)
   1. Routes beginning with O are OSPF routes
5. Verify FIB ( show fib)
   1. FIB entry has the appropriate next hop
```
admin@128tconductor-node.128TConductor# show ospf router 128TRouter summary
Sat 2018-10-20 17:48:29 UTC

================== =============== ========== ======== =========== ========= =========== ========
Router              Router ID       ABR Type   ASBR     External    Area ID   Area Type   Area
                                               Router   LSA Count                         Border
                                                                                          Router
================== =============== ========== ======== =========== ========= =========== ========
128TRouter          10.52.113.128   unknown    true     84          0.0.0.0

Completed in 0.66 seconds
admin@128tconductor-node.128TConductor#

*admin@128tconductor-node.128TConductor# show ospf router 128TRouter detail
Sat 2018-10-20 17:46:27 UTC

=============================================================
 Router 128TRouter
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
admin@128tconductor-node.128TConductor#

admin@128tconductor-node.128TConductor# show ospf database router 128TRouter
Sat 2018-10-20 03:21:52 UTC

============ ============= ============= ============== ============= ===== ============
 Router       Area ID       Type          LSA ID         Advertising   Age   Sequence
                                                         Router              Number
============ ============= ============= ============== ============= ===== ============
 128TRouter   0.0.0.0       Router        10.10.10.128   10.10.10.128  617   0x8000000e
 128TRouter   0.0.0.0       Router        10.10.10.1     10.10.10.1    385   0x80000017
 128TRouter   0.0.0.0       Network       10.58.0.0      10.10.10.1    641   0x80000003
 128TRouter   unavailable   AS_External   10.0.0.0       10.10.10.128  607   0x80000006
 128TRouter   unavailable   AS_External   10.1.254.96    10.10.10.128  597   0x80000006
 128TRouter   unavailable   AS_External   10.10.60.0     10.10.10.128  597   0x80000006
 128TRouter   unavailable   AS_External   10.10.220.0    10.10.10.128  587   0x80000006
 128TRouter   unavailable   AS_External   10.10.221.0    10.10.10.128  607   0x80000006
 128TRouter   unavailable   AS_External   10.10.225.0    10.10.10.128  617   0x80000006
 128TRouter   unavailable   AS_External   10.10.226.0    10.10.10.128  607   0x80000006
 128TRouter   unavailable   AS_External   10.10.252.0    10.10.10.128  627   0x80000006
 128TRouter   unavailable   AS_External   10.52.0.0      10.10.10.128  627   0x80000006
```