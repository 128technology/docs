---
title: Configuring Forward Error Correction
sidebar: Configuring Forward Error Correction
---

## Overview

Forward Error Correction adds resiliency against packet loss between two points in the network. The SSR implements Forward Error Correction using parity packets and a round based approach. In each round, a set number of data packets will be sent before a parity packet. The number of packets per round is based on the observed packet loss for this flow.  When the loss is greater, fewer data packets are sent before a parity packet.  

FEC has two modes, Static and Dynamic, and a configurable Profile. 

### Dynamic Mode: 

This is the default mode. All values in the profile, default or user configured, are used. If the LowLossThreshold is configured to be above zero, it sets a LowLossRatio of 0 up to the LowLossThreshold. When the LowLossRatio is 0, tracking is disabled.  

When tracking is disabled, FEC remains enabled, but does not calculate parity on each data packet, or send a parity packet at the end of the round. Once loss is observed at a greater than zero ratio tracking is enabled, parity calculations begin, and parity packets are transmitted at the end of the round.

### Static Mode: 

This mode hides all fields except for Low Loss Ratio. In this mode, FEC never changes behavior based on loss. Both thresholds are implicitly set to 0 (always on) and the High Loss Ratio is set to the value entered for the Low Loss Ratio. This provides a consistent n packets per parity, regardless of link quality.

### Forward Error Correction Profile

The Forward Error Correction Profile has four configurable values:
* Low Loss Ratio - Default 1:20. Defines the number of data packets to transmit before a parity packet is transmitted when loss is low.
* High Loss Ratio - Default 1:2. Defines the number of data packets to transmit before a parity packet is transmitted when loss is high.
* Low Loss Threshold - Default: 1%. The packet loss percentage at which Forward Error Correction will be enabled.
* High Loss Threshold - Default: 10%. The packet loss percentage at which the high-loss-ratio on parity packets will be applied.
These defaults will switch on FEC when loss reaches 1% and ramp up the frequency of parity packets from 1:20 to 1:2 as loss rises to up 10% .

### Sample Configuration

**Need Sample Config to put here**

## How to Use Forward Error Correction

:::note
Forward Error Corrections carries a 4 byte per-packet overhead, and a parity packet overhead every N packets (Largest Packet Size in round + Packet Sizes Trailer (N * 2 bytes) + 4 bytes)
:::

This feature should not be used when transferring large amounts of data at the MTU size. Similar to metadata, it is possible for this feature to increase the size of the packets beyond the MTU.

Additionally, this feature should not be used to diagnose link quality issues. If the packet loss is above a nominal amount, the extra data that FEC adds to the wire will likely cause extra loss, further decreasing link quality. 

Packet retransmission will not work when FEC is enabled. 

### PCLI

FEC Profile
	Do you name the profile? 
	Is there one overall profile, or can different nodes have different profiles? 
	What about different traffic types?
	Any impact to HA? Special config considerations for HA? 
Dynamic/Static
	Can this be configured per node/protocol/interface?
Service Policy
Neighborhood

### GUI

FEC Profile
Dynamic/Static
Service Policy
Neighborhood

Enabling FEC from the Service Policy

Within the `service policy` the feature `packet resiliency` has a selectable mode, `forward-error-correction` and a pointer to the FEC profile. 

Enabling FEC from the Neighborhood Configuration

Toggle Packet Resiliency (enable/disable) across a path, within the Neighborhood.

## Troubleshooting

Metrics for FEC are categorized into success and failure counters. Use the following counters to help diagnose any issues that arise.

### Success Counters

Use `show packet-processing action success fec` to view the following success metrics.

* Parity-sent:  A parity packet was successfully sent.
* Trailer-added: An FEC trailer was successfully added to a packet.
* Trailer-removed: An FEC trailer was successfully removed from a packet.
* Regenerated-packet: A packet that was missing from a round was able to be regenerated via the parity packet.
* Completed-round: A round was able to be completed successfully. Either all packets arrived as expected, or a single packet was missing and the parity was able to regenerate the missing packet.
* Unnecessary-parity: A parity packet was received for a round in which no loss was experienced, and as such was unnecessary to be able to complete a round.
* Resync: The number of times the recipient of an FEC marked packet determined it was out of sync with the sender. This causes a flush of all cached information and a latch to the information contained in the packet.
* Out-of-order: The number of times a data packet was received out of order for the current round. This packet was allowed through.

### Failure Counters

Use `show packet-processing action failure fec` to view the following failure metrics. 

* Allocation: The number of times a packet was dropped because memory for the FEC trailer could not be allocated.
* Round-completion: The number of times a round was not able to be completed. Mainly occurs when the number of packets lost in a round is greater than one, and the parity packet cannot heal the round. However, if the scenario described under the Resync counter is detected, then this stat may also be incremented if the current round is not completed.
* Out-of-order-discard:  The number of packets dropped due to belonging to a recently completed FEC round.
* Unexpected-parity: The number of parity packets received when the recipient of FEC packets was not tracking a round.
* Parity-discard: The number of parity packets that were discarded because not enough data packets were received.  
* Buffer-expansion-failure: The number of packets that were dropped because packet payload could not be expanded to fit a FEC header.
* Invalid-payload-length: The number of packets dropped while attempting to process an FEC packet, but the payload was too short to accommodate an FEC header.
