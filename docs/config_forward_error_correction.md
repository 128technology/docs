---
title: Configuring Forward Error Correction
sidebar: Configuring Forward Error Correction
---

#### Version History
| Release | Modification                |
| ------- | --------------------------- |
| 5.5.0   | This feature was introduced |

## Overview

Forward Error Correction (FEC) adds resiliency against packet loss between two points in the network. The SSR implements Forward Error Correction using parity packets and a "round" based approach. In each round, a set number of data packets are sent before a parity packet. The number of packets per round is based on the observed packet loss for the flow. When the loss is greater, fewer data packets are sent before a parity packet.  

FEC has two modes, Dynamic and Static. Each mode is enabled through the FEC profile.

## Dynamic Mode 

Dynamic is the default mode. In Dynamic mode, the behavior of FEC is adjusted for the currently observed packet loss. When no loss is detected, no parity packets are added to the transmission. When some amount of loss is found, the ratio necessary to heal the loss is calculated, and parity packets are added to the transmission. As the loss goes up or down, the loss ratio is adjusted automatically. 

### Sample Dynamic Configuration

```
        forward-error-correction-profile  fec-profile-dynmc
            name                 fec-profile-dynmc
            mode                 dynamic
        exit
```

```
        service-policy                    policy-a
            name                              policy-a
            service-class                     Standard
            lb-strategy                       hunt
            session-resiliency                none
            packet-resiliency                 forward-error-correction
            transport-state-enforcement       reset
            forward-error-correction-profile  fec-profile-dynmc
        exit
```

## Static Mode 

In Static mode, you configure the loss ratio in the profile, and FEC uses this ratio regardless of link quality. This provides a consistent number of parity packets, but will increase overhead on links with no or low loss.

### Sample Static Configuration

```
forward-error-correction-profile  fec-profile-statc
            name                 fec-profile-statc
            mode                 static
            ratio                10
```
```
        service-policy                    policy-a
            name                              policy-a
            service-class                     Standard
            lb-strategy                       hunt
            session-resiliency                none
            packet-resiliency                 forward-error-correction
            transport-state-enforcement       reset
            forward-error-correction-profile  fec-profile-statc
        exit
```
## How to Use Forward Error Correction

Forward Error Correction profiles are configured at the authority level and are not traffic-specific, which allows them to be used on any service and any router in the authority. 

The order of configuration is not important, but the following process configures a dynamic FEC profile using the default values, and assigns it to a service for UDP traffic.

Create the Forware Error Correction profile.
```
        forward-error-correction-profile  fec-profile-dynmc
            name                 fec-profile-dynmc
            mode                 dynamic
        exit
```

Create the `service-policy`, or add the FEC profile to an existing `service-policy` by specifying `forward-error-correction` under `packet-resiliency`.
```
        service-policy                    policy-a
            name                              policy-a
            service-class                     Standard
            lb-strategy                       hunt
            session-resiliency                none
            packet-resiliency                 forward-error-correction
            transport-state-enforcement       reset
            forward-error-correction-profile  fec-profile-dynmc
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
            service-policy  policy-a
        exit
```

#### Static Profile

Configuration and use of the static profile is similar to the process described above. The Static profile is configured as shown below. 

```
        forward-error-correction-profile  fec-static-profile-statc
            name                 fec-static-profile-statc
            mode                 static
            low-loss-ratio       10
```

### Disable/Enable FEC from the Neighborhood Configuration

The neighborhood/adjacency configuration can be used to disable FEC in cases where the per packet overhead from FEC is unnecessary (for example, on a very high quality link). Toggle `packet-resiliency` (enable/disable) across a path, within the Neighborhood.

#### Limitations

Forward Error Correction has the following limitations:

- Forward Error Corrections carries a 4 byte per-packet overhead, and a parity packet overhead every N packets (Largest Packet Size in round + Packet Sizes Trailer (N * 2 bytes) + 4 bytes).

- If you are going to be transferring large amounts of data at, or close to, the MTU size with FEC enabled, it is strongly recommended to enable `path-MTU`. This setting automatically adjusts the packet size, allowing space for the FEC headers and preventing fragmentation.

- Additionally, this feature should not be used to diagnose link quality issues. If the packet loss is above a nominal amount, the extra data that FEC adds to the wire will likely cause extra loss, further decreasing link quality. 

- Packet retransmission will not work when FEC is enabled. 

## FEC Support on High Speed Ports

The `fec-mode` feature provides compatibility with other devices (Dell, Broadcom, etc) that use optical ports, allowing you to set the port speed for these high speed optical ports. The feature is enabled on 100GB NIC ports at the device-interface level, and is an advanced or administrator only feature/command. 

The `fec-mode` is configured as `auto`, `baser`, `rs`, or `none`. For example:

#### Configuration Example:

```
config 
    authority 
        router router-b 
            node node 
                device-interface xe-4-2 
                fec-mode baser


        router router-b 
            node node 
                device-interface xe-4-3 
                fec-mode auto
            exit
        exit
    exit
exit


admin@node.router-b# show config running flat | grep fec
✔ Piping output...
config authority router router-b node node device-interface xe-4-2 fec-mode    baser
config authority router router-b node node device-interface xe-4-3 fec-mode    auto
```

If the switch speed and port speed do not match, the link will be reported as `down`.

- Switch set to default (fec74); SSR port is `auto` or `baser` (fec74): fec74 on both ends; link is up
- Set switch to fec108; SSR port is `auto` or `rs` (fec108): fec108 on both ends; link is up
- Set switch to fec108; SSR port is `baser` (fec74): link is down
- Set switch to fec74; SSR port is `rs` (fec108): link is down

## Troubleshooting

Metrics for FEC are categorized into success and failure counters. Use the following counters to help diagnose any issues that arise.

### Success Counters

Use [`show stats packet-processing action success fec`](cli_stats_reference.md#show-stats-packet-processing-action-success-fec) to view the following success metrics.

#### Add

- **Parity-sent:**  A parity packet was successfully sent.
- **Trailer-added:** An FEC trailer was successfully added to a packet.

#### Remove

- **Trailer-removed:** An FEC trailer was successfully removed from a packet.
- **Regenerated-packet:** A packet that was missing from a round was able to be regenerated via the parity packet.
- **Completed-round:** A round was able to be completed successfully. Either all packets arrived as expected, or a single packet was missing and the parity was able to regenerate the missing packet.
- **Unnecessary-parity:** A parity packet was received for a round in which no loss was experienced, and as such was unnecessary to be able to complete a round.
- **Resync:** The number of times the recipient of an FEC marked packet determined it was out of sync with the sender. This causes a flush of all cached information and a latch to the information contained in the packet.
- **Out-of-order:** The number of times a data packet was received out of order for the current round. This packet was allowed through.

### Failure Counters

Use [`show stats packet-processing action failure fec`](cli_stats_reference.md#show-stats-packet-processing-action-failure-fec) to view the following failure metrics. 

#### Add

- **Allocation:** The number of times a packet was dropped because memory for the FEC trailer could not be allocated.
- **Buffer-expansion:** The number of packets that were dropped because packet payload could not be expanded to fit a FEC header.

#### Remove

- **Completed-round:** The number of times a round was not able to be completed. Mainly occurs when the number of packets lost in a round is greater than one, and the parity packet cannot heal the round. However, if the scenario described under the Resync counter is detected, then this stat may also be incremented if the current round is not completed.
- **Out-of-order:** The number of packets dropped due to belonging to a recently completed FEC round.
- **Unexpected-parity:** The number of parity packets received when the recipient of FEC packets was not tracking a round.
- **Parity-discard:** The number of parity packets that were discarded because not enough data packets were received.  
- **Invalid-payload-length:** The number of packets dropped while attempting to process an FEC packet, but the payload was too short to accommodate an FEC header.
