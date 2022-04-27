---
title: Bidirectional Forwarding Detection (BFD)
sidebar_label: BFD
---

This section provides information about using BFD with BGP and OSPF protocols on the Session Smart Networking Platform.

## Overview

BFD can be enabled on the OSPF interface or the BGP neighbor. BFD configuration allows the following BFD parameters to be set: 

- **enable** (default: false): Enable/disable BFD protocol.
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





