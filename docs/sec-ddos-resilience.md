---
title: Resilience Against DoS and DDoS Attacks
sidebar_label: Resilience Against DoS and DDoS Attacks
---

The Session Smart Router (SSR) is designed to provide secure, high-performance networking in both trusted and untrusted environments. As part of that design, the SSR includes several architectural features that inherently protect against Denial-of-Service (DoS) and Distributed Denial-of-Service (DDoS) attacks.

This document outlines the key attack surfaces relevant to DoS/DDoS, and describes the protections in place within the SSR software architecture to mitigate those threats.

## Attack Surfaces Overview

There are two primary surfaces where an attacker may attempt to disrupt SSR operation:

1. **SVR Waypoint Interface:** The data-plane WAN interface that is often Internet-facing and could be targeted with high-volume traffic.

2. **SVR Signaling (BFD Listener):** The control-plane component responsible for maintaining session liveness between SSR nodes. This is based on a BFD-like mechanism and listens on UDP port 1280.

Each of these areas is protected by multiple layers of validation, resource isolation, and cryptographic enforcement.

## Protection at the SVR Waypoint Interface

The waypoint interface is responsible for handling SVR traffic including session creation. In a DDoS scenario, an attacker may attempt to overwhelm the SSR by sending a high volume of packets that trigger session creation or consume forwarding resources.

### FastLane and Service Area Process Separation

SSR uses a multi-process architecture that separates responsibilities for performance and security. The **FastLane** process handles all packet forwarding, cryptographic validation, and flow matching. The **Service Area** process is responsible for session setup and policy enforcement.

Each of these processes is isolated onto separate CPU cores, preventing one from starving the other of resources. The FastLane is specifically designed to operate under high traffic conditions, performing in-memory operations that can efficiently discard unauthenticated or invalid packets before they consume additional resources.

### Packet Validation Workflow

When a packet arrives at the waypoint (WAN) interface, it undergoes a series of validation steps as part of the FastLane process:

- **Session Flow Matching:** The packet is first checked against existing session flows. If a match is found, then before the packet is forwarded the following additional checks take place: 
	- The packet requires per-packet HMAC validation to prevent replay attacks.
	- Encryption validation and decryption are performed to ensure the packet was encrypted with the correct session parameters (cipher, key, and IV).

:::note
In multi-hop SVR designs, encryption validation and decryption are deferred until the final hop where the session terminates.
::: 

- If the packet **does not match any existing flow** and the SSR is operating as a waypoint, the system checks for a specific metadata key (a unique byte string) in the packet. If found the following next steps are performed:

	- Validate HMAC, using expected session parameters.
	- Decrypt the encrypted metadata using the correct session keys.
	- Verify the metadata format.

- If there is **no flow match** and **no metadata** is found:

	- The packet is treated as general traffic.
	- The system determines the tenant, typically auto-assigned as `<global>` for waypoints.
	- A Forwarding Information Base (FIB) lookup is performed using the packet’s destination tuple. Usually, this results in a FIB miss, and the packet is dropped with an ICMP Network Unreachable message sent.

Only packets that successfully pass all required validation stages, including session match, HMAC check, decryption, and FIB resolution, are handed off to the Service Area. This layered approach ensures unauthenticated or malformed packets are filtered early, preserving system integrity and performance.

## Protection at the SVR Signaling Layer (BFD Listener)

SVR peer-to-peer signaling is implemented using a BFD-like mechanism over UDP port 1280. This is used to maintain liveness between SSR nodes. Because it operates as a listener, it could be a potential vector for DoS if not properly secured.

### Session Identification and Validation

Each BFD connection includes two key identifiers that are defined at configuration time:

- **BFD Discriminator:** A unique value derived from a hash of the waypoint IPs. This identifies a specific peer connection.
- **Session Key:** A tuple consisting of the source IP, source interface, destination IP, and peer name. This key is used as additionnal layer of authentification. In certificate-based SVR encryption, the peer-name, and IP addresses are stored securely by the device configuration, this information is not made available to devices snooping on the wire. The key itself is not transmitted in the packets, only the hash and key ID are transmitted.

Packets received on the BFD listener are only accepted if the discriminator **and** session key match an existing session. Invalid or unknown sessions are dropped, making attacks against the BFD agent particularly difficult.

### Replay Protection

To prevent replay attacks, all signaling packets include a **sequence number**. If a packet is received with a stale sequence number — even if other parameters appear valid — it will be dropped.

## Conclusion

The SSR platform offers strong, built-in defenses against DoS and DDoS attacks. Its session-aware, zero-trust architecture, combined with deep packet validation and resource isolation, ensures that only authenticated, authorized traffic is processed. These validations are lightweight and designed to operate efficiently under high-volume conditions, allowing the router to maintain performance even during attempted attacks.
