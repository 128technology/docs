---
title: Configuring Forward Error Correction
sidebar: Configuring Forward Error Correction
---

## Overview

Forward Error Correction (FEC) adds resiliency against packet loss between two points in the network. The SSR implements Forward Error Correction using parity packets and a "round" based approach. In each round, a set number of data packets are sent before a parity packet. The number of packets per round is based on the observed packet loss for the flow. When the loss is greater, fewer data packets are sent before a parity packet.  

FEC has two modes, Static and Dynamic, and a configurable Profile. 

### Dynamic Mode: 

Dynamic is the default mode. All values in the profile, default or user configured, are used. If the `low-loss-threshold` is configured to be above zero, it sets a `low-loss-ratio` of 0 up to the `low-loss-threshold`. When the `low-loss-ratio` is 0, tracking is disabled.  

When tracking is disabled, FEC remains enabled, but does not calculate parity on each data packet, or send a parity packet at the end of the round. Once loss is observed at a greater than zero ratio, tracking is enabled, parity calculations begin, and parity packets are transmitted at the end of the round.

### Static Mode: 

Static mode hides all fields except for `low-loss-ratio`. In this mode, FEC does not change behavior based on loss. Thresholds are implicitly set to 0 (always on) and the `high-loss-ratio` is set to the value entered for the `low-loss-ratio`. This provides a consistent number of packets per parity, regardless of link quality.

If a static mode profile is not created, the default value for `low-loss-ratio` (20) is used.  

### Forward Error Correction Profile

The Forward Error Correction Profile has four configurable values:
* `low-loss-ratio` - Default 1:20. Defines the number of data packets to transmit before a parity packet is transmitted when loss is low.
* `high-loss-ratio` - Default 1:2. Defines the number of data packets to transmit before a parity packet is transmitted when loss is high.
* `low-loss-threshold` - Default: 1%. The packet loss percentage at which Forward Error Correction will be enabled.
* `high-loss-threshold` - Default: 10%. The packet loss percentage at which the `high-loss-ratio` on parity packets will be applied.

These defaults will switch on FEC when loss reaches 1% and ramp up the frequency of parity packets from 1:20 to 1:2 as loss rises to up 10%.

## Sample Dynamic Configuration

```
        forward-error-correction-profile  fec-profile
            name                 fec-profile
            mode                 dynamic
            low-loss-ratio       20
            high-loss-ratio      2
            low-loss-threshold   1
            high-loss-threshold  10
        exit
```

```
        service-policy                    packet-duplication-policy
            name                              packet-duplication-policy
            service-class                     Standard
            lb-strategy                       hunt
            session-resiliency                packet-duplication
            packet-resiliency                 forward-error-correction
            transport-state-enforcement       reset
            forward-error-correction-profile  fec-profile
        exit
```

## How to Use Forward Error Correction

Forward Error Correction has the following limitations:

- Forward Error Corrections carries a 4 byte per-packet overhead, and a parity packet overhead every N packets (Largest Packet Size in round + Packet Sizes Trailer (N * 2 bytes) + 4 bytes).

- This feature should not be used when transferring large amounts of data at the MTU size. Similar to metadata, it is possible for this feature to increase the size of the packets beyond the MTU.

- Additionally, this feature should not be used to diagnose link quality issues. If the packet loss is above a nominal amount, the extra data that FEC adds to the wire will likely cause extra loss, further decreasing link quality. 

- Packet retransmission will not work when FEC is enabled. 

### Configuring Forward Error Correction

Forward Error Correction profiles are configured at the authority level, and can be used by any router in the authority. You can create a profile for a particular type of traffic, or even traffic type and a transport medium, and have it available for any router in the Authority.

The order of configuration is not important, but the following process configures a dynamic FEC profile using the default values, for a service that monitors UDP traffic.

Create the Forware Error Correction profile.
```
        forward-error-correction-profile  fec-profile
            name                 fec-profile
            mode                 dynamic
            low-loss-ratio       20
            high-loss-ratio      2
            low-loss-threshold   1
            high-loss-threshold  10
        exit
```

Create the `service-policy`, or add the FEC profile to an existing `service-policy` by specifying `forward-error-correction` under `packet-resiliency`.
```
        service-policy                    packet-duplication-policy
            name                              packet-duplication-policy
            service-class                     Standard
            lb-strategy                       hunt
            session-resiliency                packet-duplication
            packet-resiliency                 forward-error-correction
            transport-state-enforcement       reset
            forward-error-correction-profile  fec-profile
        exit
```

Create the `service`, or add the `service-policy` with the FEC profile to an existing service.
```
        service         west
            name            west
            service-group   all
            description     "web service for everyone"
            enabled         true
            scope           private
            security        aes1

            transport   udp
                protocol  udp
            exit
            address         172.16.2.201/24

            access-policy   red@0.0.0.0/0
                source      red@0.0.0.0/0
                permission  allow
            exit
            service-policy  packet-duplication-policy
        exit
```

### Static Profile

Configuration and use of the static profile is similar to the process described above. The Static profile is configured as shown below. 

```
        forward-error-correction-profile  fec-static-profile
            name                 fec-static-profile
            mode                 static
            low-loss-ratio       30
```

### Disable/Enable FEC from the Neighborhood Configuration

The neighborhood/adjacency configuration can be used to disable FEC in cases where the per packet overhead from FEC is unnecessary (for example, on a very high quality link). Toggle `packet-resiliency` (enable/disable) across a path, within the Neighborhood.

## Troubleshooting

Metrics for FEC are categorized into success and failure counters. Use the following counters to help diagnose any issues that arise.

### Success Counters

Use `show packet-processing action success fec` to view the following success metrics.

- **Parity-sent:**  A parity packet was successfully sent.
- **Trailer-added:** An FEC trailer was successfully added to a packet.
- **Trailer-removed:** An FEC trailer was successfully removed from a packet.
- **Regenerated-packet:** A packet that was missing from a round was able to be regenerated via the parity packet.
- **Completed-round:** A round was able to be completed successfully. Either all packets arrived as expected, or a single packet was missing and the parity was able to regenerate the missing packet.
- **Unnecessary-parity:** A parity packet was received for a round in which no loss was experienced, and as such was unnecessary to be able to complete a round.
- **Resync:** The number of times the recipient of an FEC marked packet determined it was out of sync with the sender. This causes a flush of all cached information and a latch to the information contained in the packet.
- **Out-of-order:** The number of times a data packet was received out of order for the current round. This packet was allowed through.

### Failure Counters

Use `show packet-processing action failure fec` to view the following failure metrics. 

- **Allocation:** The number of times a packet was dropped because memory for the FEC trailer could not be allocated.
- **Round-completion:** The number of times a round was not able to be completed. Mainly occurs when the number of packets lost in a round is greater than one, and the parity packet cannot heal the round. However, if the scenario described under the Resync counter is detected, then this stat may also be incremented if the current round is not completed.
- **Out-of-order-discard:** The number of packets dropped due to belonging to a recently completed FEC round.
- **Unexpected-parity:** The number of parity packets received when the recipient of FEC packets was not tracking a round.
- **Parity-discard:** The number of parity packets that were discarded because not enough data packets were received.  
- **Buffer-expansion-failure:** The number of packets that were dropped because packet payload could not be expanded to fit a FEC header.
- **Invalid-payload-length:** The number of packets dropped while attempting to process an FEC packet, but the payload was too short to accommodate an FEC header.
