---
title: Bidirectional Forwarding Detection (BFD)
sidebar_label: BFD with BGP and OSPF
---

This section provides information about using BFD with BGP and OSPF protocols on the Session Smart Networking Platform.

## Overview

BFD asynchronous mode can be enabled on the OSPF interface or the BGP neighbor. BFD configuration allows the following BFD parameters to be set: 

- **enable** (default: false): Enable/disable BFD asynchronous mode.
- **multiplier** (default: 3): The number of BFD packets that can be lost without the BFD session declared as down.
- **required-min-rx-interval** (default: 1000): The minimum interval in milliseconds that this system must receive a BFD control packet.
- **desired-tx-interval** (default: 1000): The minimum transmission interval in milliseconds used to send BFD control packets.

For OSPF, the BFD configuration can be created for the given OSPF interface. Once a neighbor is learned on this interface, then a BFD session is created with the same addresses used to create the OSPF adjacency.  

For BGP, the BFD configuration is created for a BGP neighbor. Once the BGP neighbor is learned, then a BGP session is created. BFD uses the same addresses as the BGP adjacency. These can be interface addresses for directly connected BGP neighbors, or loopback addresses. 

The BFD peers are automatically removed by the protocols once the BGP/OSPF neighbor is removed. The OSPF/BGP adjacency remains up when BFD is configured for the peer. However, if the BFD configuration is modified while the BFD session is Up, then the OSPF/BGP adjacency will flap.

## Configuration

The following is a simple configuration for OSPF and BGP.

```
authority
    router A
        routing default-instance
                  ospf              2
                      area          0.0.0.0
                          interface  T217_DUT2 inet20
                                node       T217_DUT2
                                interface  inet20
                                    bfd
                                        enable               true
                                        required-min-rx-interval 500
                                        desired-tx-interval  500
                                        multiplier           3

           
            routing-protocol bgp
                neighbor 1.0.0.11
                    bfd
                            enable               true
                            required-min-rx-interval 500
                            desired-tx-interval  500
                            multiplier            5

```

BFD can also be enabled in the VRF.

```
authority
    router A
        routing default-instance
           vrf vrfA
                      ospf              2
                          area          0.0.0.0
                              interface  T217_DUT2 inet30
                                    node       T217_DUT2
                                    interface  inet30
                                        bfd
                                            enable               true
                                            required-min-rx-interval 500
                                            desired-tx-interval  500
                                            multiplier           3

                routing-protocol bgp
                    neighbor 1.0.0.11
                        bfd
                                   enable               true
                                   required-min-rx-interval 500
                                   desired-tx-interval  500
                                   multiplier           3
```

## Troubleshooting

The following `show` commands are available through the SSR PCLI. Additionally, the  BFD status is available in the GUI. 

The following show commands are also available for insight into the configuration:

`show bfd [vrf <name>] [peer <ip>] [<verbosity>]`

#### Example Output

```
# show bfd
Tue 2022-02-01 15:31:46 UTC

======= =========== ========== ======= =============
 Vrf     Peer        Local      State   Uptime
======= =========== ========== ======= =============
         16.0.0.3    16.0.0.2   up      15h 54m 2s
 music   11.1.20.4   g20        up      37m 29s
         11.1.10.4   g10        up      15h 58m 52s


# show bfd vrf music peer 11.1.20.4
Tue 2022-02-01 15:41:16 UTC

======= =========== ======= ======= ========
 Vrf     Peer        Local   State   Uptime
======= =========== ======= ======= ========
 music   11.1.20.4   g20     up      19s


# show bfd detail
Tue 2022-02-01 15:39:13 UTC

==========================================
 Information
==========================================
 Item:
   Remote Detect Multiplier:   3
   Remote Receive Interval:    1000
   Remote:                     1167833603
   Vrf:                        default
   Id:                         3654638929
   Receive Interval:           1000
   Remote Transmit Interval:   1000
   Multihop:                   True
   Detect Multiplier:          3
   Passive Mode:               False
   Status:                     up
   Remote Echo Interval:       50
   Local:                      16.0.0.2
   Remote Diagnostic:          ok
   Peer:                       16.0.0.3
   Echo Interval:              0
   Uptime:                     57689
   Minimum Ttl:                252
   Diagnostic:                 ok
   Transmit Interval:          1000
 Item:
   Remote Detect Multiplier:   3
   Remote:                     3892773233
   Interface:                  g20
   Remote Receive Interval:    1000
   Vrf:                        music
   Id:                         927933835
   Receive Interval:           1000
   Remote Transmit Interval:   1000
   Multihop:                   False
   Detect Multiplier:          3
   Passive Mode:               False
   Status:                     up
   Remote Echo Interval:       50
   Remote Diagnostic:          ok
   Peer:                       11.1.20.4
   Echo Interval:              0
   Uptime:                     2696
   Diagnostic:                 ok
   Transmit Interval:          1000
 Item:
   Remote Detect Multiplier:   3
   Remote:                     3305953639
   Interface:                  g10
   Remote Receive Interval:    1000
   Vrf:                        default
   Id:                         1713249686
   Receive Interval:           1000
   Remote Transmit Interval:   1000
   Multihop:                   False
   Detect Multiplier:          3
   Passive Mode:               False
   Status:                     up
   Remote Echo Interval:       50
   Remote Diagnostic:          ok
   Peer:                       11.1.10.4
   Echo Interval:              0
   Uptime:                     57979
   Diagnostic:                 ok
   Transmit Interval:          1000

```

## BFD Echo mode tests

This feature enables BFD asynchronous mode support. Many routers additionally use BFD echo mode to ensure a forwarding path is available. While the SSR does not support the sending of BFD echo mode tests to a non-SSR router, we can return the echo mode traffic to the originating router allowing it to pass its echo mode test. Unlike BFD asynchronous mode, BFD echo mode is not handled by a BFD process on the peer router. Instead, it is intended to be processed by the packet forwarding plane and returned to the originating router. In order to pass this echo test traffic, an SSR must be configured to allow this traffic just like any other forwarding traffic. This requires a tenant and a service as with all traffic forwarded by the SSR.

To verify that the SSR is capable of relaying the echo mode packets, first [identify the tenant](ts_applications.md#identifying-the-requesting-tenant) from the ingress interface and source IP address of the peer router. Then, check the FIB to verify that there is a [match to a service](ts_applications.md#identifying-the-service) for this tenant. BFD echo traffic typically uses UDP destination port 3785 and should have the destination IP address of the peer router. A valid configuration does not require a specific service for BFD so long as this traffic is covered by another configured service. The next-hop of the FIB entry must point towards the egress interface that connects to this peer router.



