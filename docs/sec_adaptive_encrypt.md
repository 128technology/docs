---
title: Adaptive Encryption
sidebar_label: Adaptive Encryption
---

## Introduction

In order to provide security across the WAN, the 128T Networking Platform provides the functionality to encrypt between peered routers. However, for traffic that is already encrypted by the end host, this is redundant. Adaptive Encryption is aimed at identifying the encrypted traffic and providing security for non-encrypted traffic by encrypting it through the 128T Router.

On a service where most of the traffic is expected to be encrypted, the goal is to identify and encrypt those few sessions that are not. This eliminates the performance overhead of encrypting traffic that is already encrypted.

Adaptive encryption only applies to payload encryption, not metadata encryption.

## Overview

When adaptive encryption is enabled and the first packet arrives in the service area, the L4 protocol determines how it is handled.

### IPSEC

If the packet has an IPSEC ESP header, the stream is encrypted and the session is installed without additional encryption actions. If the packet matches the IPSEC or IPSEC-NAT session-type, it’s assumed to be IPSEC and treated as IPSEC ESP.

### TCP

For TCP streams, TLS is currently the most widely used end-to-end encryption protocol. It is used to encrypt all HTTPS traffic.
TLS, and other protocols that ride on top of TCP, are not seen until the 4th packet of the stream. At that point the session has been established and the router has chosen whether or not to encrypt.
With Adaptive Encryption enabled, the router assumes that the TCP session is likely to be encrypted. No encryption actions are installed, but a DPI action is enabled.  The DPI action looks for TLS headers after the TCP handshake is complete.

If the DPI action sees the TLS handshake, it is disabled and the session carries on, unencrypted by the router.
If the DPI action does not see a TLS handshake, all packets are diverted back to the service area and the session modified for encryption. Starting with that packet, all subsequent packets on the session are encrypted over the fabric.

It is important to note that detouring packets to the service-area for session modification is expensive. Using this feature on a service where most of the traffic is unencrypted will double the load on the service-area.

## Non-TCP and Non-IPSEC Protocols

If a packet is plain UDP, ICMP, or any other non-TCP and non-IPSEC protocol, it is assumed to be unencrypted and is installed with encryption actions. 

## Configuration

Adaptive Encryption is enabled by a boolean in the [security-policy](config_reference_guide.md#security):

```
leaf adaptive-encryption {
                    type boolean;
                    default true;
                    description
                    	"Prevent packets that are detected as encrypted from 
                    	 being encrypted again as they pass through the router.";
}
```

A security-policy can be applied for multiple purposes. However, because adaptive-encryption only applies to payload encryption, **the adaptive encryption field only has meaning where the policy is configured on a service and encryption is also enabled.** If the same security-policy is configured on an interface, the field has no meaning.

## Reporting

Use the following show commands to view statistics to verify whether the feature is active. 

- Number of sessions the router has detected are unencrypted:

	`show stats packet-processing action success dpi unencrypted`

- Number of sessions the router has detected are TLS encrypted:

	`show stats packet-processing action success dpi client detected`

	:::note
	The show stats packet-processing command is also used for Application Identification and may be incremented even if Adaptive Encryption is not enabled.
	:::

- Number of sessions have been modified to be encrypted:

	`show stats service-area received adaptive-encryption-modify-packets`


