--- 
title: SVR Zero Trust Network Architecture
sidebars-label: SVR Zero Trust Network Architecture
---

Security is a critical component of SD-WAN products in today’s market. The SSR (Session Smart Router) offers several means of ensuring the integrity of data transmitted through the router, such as encrypting application payload content, encrypting SVR (Secure Vector Routing) metadata and authentication for metadata.

As an example, lets look at the needs of a financial institution. They have to keep transaction traffic secure. If it is not kept secure, the results are catastrophic for both the instution and the individual/companies whose transaction gets hijacked. SSR technology uses SVR to create a Zero Trust Network Architecture (ZTNA), allowing you to configure unparalelled security without the increased packet size, fragmentation, and increased transaction time common with IPSec. This design creates maximum scale, avoids mid-network re-encryption, and provides the ability to rotate keys as required.

In a newly deployed network, SVR ZTNA is more secure than the default security implementation of SVR, and far more secure than IPSec. SVR ZTNA affords you the best security strength not only because of the encryption key exchange, but through its ability to perform key rotations.

Additionally, the flexiblity of SVR to choose a different physical path to satisfy SLA requirements is not found in traffic encrypted within an IPSec Tunnel. Traffic encrypted within an IPSec Tunnel always follows the same path, not allowing for different flows to have different SLA-driven physical paths.

## SVRv2 and IPSec

To understand the value of the SVR zero-trust network architecture (SVR ZTNA), we can draw some comparisons against IPSec. Not with IPSec, but against it.  

| Characteristic | IPSec/IKE | SVRv2 |
| --- | --- | --- |
| Payload Encryption | Yes—via ESP | Yes; encrypted with per-Flow AES-CBC-256 payload key. |
| Encrypt Original IP SA/DA	| Yes—via ESP | Yes; encrypted with AES-CBC-256 encrypted Metadata sent within first Payload packet using metadata key. | 
| Secure Channel to exchange keys | Yes, via IKEv2 | Yes, via Diffie-Hellman-Ephemeral. DH-E provides 4096-bit Peer key used to encrypt BFD Metadata. | 
| Confidentiality | Payload is encrypted with the IPSec Tunnel key; however, all individual sessions with the same IPSec tunnel share the same key. There is no confidentiality between sessions sharing the same source and destination address. | Payload encrypted with Per-Flow Payload key; SVR Metadata (containing the Per-Flow Payload key) is encrypted with the SVR Metadata Key. Because each flow has a separate key, each flow has confidentiality, even between the same source and destination address. | 
| Integrity	| ESP Authentication Header | HMAC SHA-384 signature signs all SVR Metadata and/or Payload in SVR packet. | 
| Authentication | IKEv2 PSK or x.509v3 certificates | Yes. Via SSR-signed x.509v3 certificate through root of trust to Intermediate CA installed on SSR| 
| Data Origin Authentication | HMAC-SHA-384 | HMAC SHA-384 signature| 
| Replay Protection	Yes	| Yes. Nonce added for Replay Protection.| 
| Perfect Forward Secrecy | Yes	| Yes. Ephemeral Keys in DH-E are seeded by salt. | 
| IPv4 and IPv6	| Yes | Yes | 

The SVR ZTNA is a more secure, more flexible, and more efficient transport network. If you want securtiy across your network, this is the best option. 

## How It Works

Key rotation provides a high level of transport security. Configuring this feature creates a specific interval for the router to generate a new security key/payload key and distribute it across the network (or session?).

The security rekeying mechanism (key rotation) is configured on the conductor, at the Authority level, and requires that all routers and conductors are running the same version of software that supports this feature. Any SSR running an older version of software that does not support this functionality will cause traffic to fail between those peers. In these cases, events will be generated when peering fails to establish.

The Security Key Manager is enabled by setting `enhanced-security-key-management` to `true`. The leader node then generates a local metadata key, which includes the following data:

- rekey index
- encryption key
- encryption cipher
- encryption IV
- HMAC key
- HMAC cipher 

The leader node sends this and other information to the peer node(s), which stores the metadata key that allows the peer to encrypt and decrypt messages.

This allows peer authentication, and the dynamic key generation and exchange provides the encryption of Secure Vector Routing (SVR) traffic. Routers generate their own keys based on X.509 certificates for encrypting metadata (metadata keys) and distribute them to their peers by BFD metadata. Sessions are encrypted using payload keys generated on demand, encrypted, and distributed to the peer by SVR.

### Peer Key and Key Rotation

A single symmetric key is used for all paths between two routers. The key is saved and remains valid during network outages and path failures, until a new key is accepted as a replacement.

During the rekeying period the old key is used. A wait time of 30 seconds is added post key computation to prevent any retransmitted packets, delayed packets, or long latency packets not having a key ready for use.

If a peer sends a Key Request to a peer for which there is no valid key and receives no response, then the peer path remains out of service until there is a valid response.

The peer continues to resend requests at periodic intervals as defined in the configuration setting `authority > security-key-management > peer-key-retransmit-interval`. If there is no response after the time defined by `authority > security-key-management > peer-key-timeout`, the peer path is declared invalid and removed from service. Once the peer is taken out of service due to key timeout, it will continue to send rekey attempts at the `peer-key-timeout intervals`, or upon interface state change.

## Configuration

Configuration is performed on the conductor, at the Authority level, on a per router basis. To accept the default values for enhanced and security key management, simply set `enhanced-security-key-management` to `true`; 

```
config

    authority
        enhanced-security-key-management  true
```
And configure a `peering-common-name` on each router. This enables SVR and key rotation between all associated routers.

```
        router                            combo-east
            name                 combo-east
            peering-common-name  second-fake-alias-2
            location             usa
            description          "router 1"
            inter-node-security  internal
```

The default values for rekeying (Key Rotation) are the following:

| Configuration Attributes | Description | 
| --- | --- |
| key-exchange-algorithm  | Configure Key Exchange Algorithm |
| payload-key-rekey-interval | Hours between payload security key regeneration. Range is 1-720, or never. Default is 24 hours.  |
| peer-key-rekey-interval | Hours between security key regeneration for peer routers. Range is 1-720, or never. Default is 24 hours. |
| peer-key-retransmit-interval | Seconds between security key retransmission for peer routers, when peer key establishment has not been acknowledged. Range is 5-3600, default is 30 seconds. |
| peer-key-timeout | Seconds before security key retransmission timeout for peer routers, when peer key establishment has not been acknowledged. Default is 3600 seconds. |

#### Sample Default Configuration: 

```
config

    authority
        enhanced-security-key-management  true
		


        router                            RTR_EAST_CONDUCTOR
            name  RTR_EAST_CONDUCTOR

            node  conductor-east-1
                name  conductor-east-1
            exit
        exit

        router                            combo-east
            name                 combo-east
            peering-common-name  second-fake-alias-2
            location             usa
            description          "router 1"
            inter-node-security  internal



        router                            combo-west
            name                 combo-west
            peering-common-name  second-fake-alias-3
            location             usa
            inter-node-security  internal
```

