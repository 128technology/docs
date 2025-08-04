--- 
title: Enhanced Security Key Management
sidebars-label: Enhanced Security Key Management
---

#### Version History

| Release | Modification                |
| ------- | --------------------------- |
| 7.0.0   | Enhanced Security Key Management support added. |

Security is a critical component of [SD-WAN (software-defined wide area network)](https://www.juniper.net/us/en/products/routers/session-smart-router.html) products in today’s market. [The SSR (Session Smart Router)](about_128t.md) offers several means of ensuring the integrity of data transmitted through the router, such as encrypting application payload content, encrypting SVR (Secure Vector Routing) metadata, and authentication for metadata.

As an example, let's look at the needs of a financial institution. They have to keep transaction traffic secure. If not, the results are catastrophic for both the instution and the individual/companies whose transaction gets hijacked. SSR technology uses SVR along with Enhanced Security Key Management, allowing you to configure unparalelled security without the increased packet size, fragmentation, and increased transaction time [common with IPSec](about_svr_savings.md). This design creates maximum scale, avoids mid-network re-encryption, and provides the ability to rotate keys as required.

The following diagrams show simple examples of how Enhanced Security Key Management can be deployed. 

#### Conductor Hub and Spoke 

![Conductor behind](/img/conductor-behind-svrv2.png)

In this example, green represents management traffic on TCP/930 and TCP/4505-4506. Blue represents SVR between the hub and spokes. The management traffic flows inside the SVR path to the hub. The hub then sends it over the LAN to the conductor. Management traffic can be configured to traverse SVR paths if required. Red represents customer traffic between the hub and spokes. For additional deployment information, see [Conductor Deployment - Conductor Behind SSR.](bcp_conductor_deployment.md#conductor-behind-ssr)

#### Multi-hop Hub and Spoke

![Multi-hop hub and spoke](/img/hub-n-spoke-svrv2.png)

This example shows a multi-hop hub and spoke deployment. Red represents customer traffic between the hubs and spoke, and out to a public network. Blue represents the SVR connection between spokes and the hub. The traffic flows inside the SVR path from spoke to hub or spoke to hub to spoke. 

In a newly deployed network, Enhanced Security Key Management is more secure than the default security implementation of SVR, and far more secure than IPSec. Enhanced Security Key Management affords you the best security strength not only because of the encryption key exchange, and its unique per-session encryption keys, but through its ability to perform key rotations for any network topology.

Additionally, the flexiblity of SVR to choose a different physical path to satisfy SLA requirements is not found in traffic encrypted within an IPSec Tunnel. Traffic encrypted within an IPSec Tunnel always follows the same path, not allowing for different flows to have different SLA-driven physical paths.

## SVRv2 and IPSec 

To understand the value of Enhanced Security Key Management, we can draw some comparisons against IPSec.  

| Characteristic | IPSec/IKE | SVRv2 |
| --- | --- | --- |
| Payload Encryption | ESP | Encrypted with per-Flow AES-CBC-256 payload key. |
| Encrypt Original IP SA/DA	| ESP | Encrypted with AES-CBC-256 encrypted Metadata sent within first Payload packet using metadata key. | 
| Secure Channel to exchange keys | IKEv2 | Diffie-Hellman. DH provides 4096-bit Peer key used to encrypt BFD Metadata. | 
| Confidentiality | Payload is encrypted with the IPSec Tunnel key; however, all individual sessions with the same IPSec tunnel share the same key. There is no confidentiality between sessions sharing the same source and destination address. | Payload encrypted with Per-Flow Payload key; SVR Metadata (containing the Per-Flow Payload key) is encrypted with the SVR Metadata Key. Because each session has a separate key, each session has confidentiality, even between the same source and destination address. | 
| Integrity	| ESP Authentication Header | HMAC SHA-384 signature signs all SVR Metadata and/or Payload in SVR packet. | 
| Authentication | IKEv2 PSK or x.509v3 certificates | SSR-signed x.509v3 certificate through root of trust to Intermediate CA installed on SSR| 
| Data Origin Authentication | HMAC-SHA-384 | HMAC SHA-384 signature| 
| Replay Protection | Yes | Nonce added for Replay Protection.| 
| Perfect Forward Secrecy | Yes	| Keys in DH are seeded by Salt. | 
| IPv4 and IPv6	| Yes | Yes | 

The Enhanced Security Key Management provides a more secure, more flexible, and more efficient transport network. If you want securtiy across your network, this is the best option.

## How It Works

The foundation of Enhanced Security Key Management is the ability to define peer-to-peer certificate-based security and key rotation within your SVR peer network. There are two ways you can provision this level of security. 

When configured to used Enhanced Security Key Management, the SSR will automatically create a self-signed certificate. This allows you to configure peering between SSRs quickly, however because it is a self-signed certificate, it does not offer the same protections as a CA-signed certificate. To configure Enhanced Security Key Management using the self-signed certificate, use the [Configuration](#configuration) procedure below. 

To provide thorough, end-to-end security the use of a trusted and provisioned certificate and signing authority is supported. To take advantage of this feature, begin with [Configuring a Custom Certificate](config-custom-certs.md), and then return to the [Configuration](#configuration) section below. 

:::note
The user provided certificates and signing authority must be in place before configuring Enhanced Security Key Management. If they are NOT in place prior to configuration and are added afterwards, then the SSR service will need to be restarted in order to pick up the changes.
:::

The following diagram provides a look at a typical SSR/SVR deployment.

![sample topology](/img/ztna-sample-topo.png)

In this topology, the selected path through the network is: Host 1 – R2 – R3 – R4 – Host 5

The payload for the first flow - `Blue` - consists of data packets A, B, and C. Additional flows may have the same source and destination (Host 1/Host 5) but to satisfy SLA requirements they could take a different physical path through Router 6.

This illustrates an important difference between SVR and IPSec tunnels; traffic encrypted within an IPSec Tunnel always follows the same path, not allowing different flows to have different SLA-driven physical paths. SVR does not have this limitation. 

### Key Rotation

Key rotation provides a high level of transport security. Configuring this feature creates a specific interval for the router to generate a new security key/payload key and distribute it across the network.

The security rekeying mechanism (key rotation) is configured on the conductor, at the Authority level, and requires that all routers and conductors are running the same version of software that supports this feature. 

This enhanced level of security is enabled by setting `enhanced-security-key-management` to `true`, which triggers the router to generate **a local metadata key**.

### SSR Keys

The router sends the **metadata key** and other information to the peers, allowing peer authentication and the ability to encrypt and decrypt messages. The peers store this key until a new key is accepted as a replacement. This dynamic key generation and exchange provides the encryption of Secure Vector Routing (SVR) traffic. 

- Metadata Key
    - Transmitted within BFD Metadata
    - Metadata Key is same for all peer router connections
    - Encrypts SVR TLVs

Routers generate their own **peer keys** based on X.509 certificates for encrypting metadata keys and distribute them to their peers by BFD metadata. 

- Peer Key
    - Generated via DH from PKI
    - Encrypts BFD Metadata

Sessions are encrypted using **payload keys** generated on demand, encrypted, and distributed to the peer over SVR.

- Payload Key
    - Transmitted within SVR Metadata encrypted by the peer key
    - Encrypts Payload per-session

The following diagram illustrates the SSR Key Exchange process:

![Key Exchange](/img/svr-ztna-key-exchange.png)

1. SVR certificates are installed onto the SSR from the Conductor.
    - SCEP is used to communicate to an intermediate/root CA.

2. The DH key exchange between routers creates a **peer key**.

3. Each router generates a **metadata key** and transmits this via BFD Metadata, encrypted using the Peer Key. 
    - Each Peer creates their own key. 
    - The originating router encrypts SVR Metadata with the peer’s **metadata key**.

4. Each router generates unique **payload key** per session, and transmits this key in the metadata TLV, encrypted using the **metadata key** on a router-to-router basis (end-to-end).

### Peer Key and Key Rotation

A single key is used for all paths between two routers. The key is saved and remains valid during network outages and path failures, until a new key is accepted as a replacement.

During the rekeying period the old key is used. A wait time of 30 seconds is added post key computation to prevent any retransmitted packets, delayed packets, or long latency packets not having a key ready for use.

If a peer sends a Key Request to a peer for which there is no valid key and receives no response, then the peer path remains out of service until there is a valid response.

The peer continues to resend requests at periodic intervals as defined in the configuration setting `authority > security-key-management > peer-key-retransmit-interval`. If there is no response after the time defined by `authority > security-key-management > peer-key-timeout`, the peer path is declared invalid and removed from service. Once the peer is taken out of service due to key timeout, it will continue to send rekey attempts at the `peer-key-timeout intervals`, or upon interface state change.

### Certificate Replacement or Revocation

When a certificate is revoked, expired, or invalid, the SSR generates an alarm. Based upon the SSR configuration, it will either `fail-soft` (the default behavior) or `fail-hard`.

`fail-soft` results in a notification that the certificate is no longer valid and that appropriate action must be taken. 

`fail-hard` results in a notification that the certificate is no longer valid, as well as the removal of all peering relationships. This severs the peer connection and stops the device from participating in SVR. 

### Peer Authentication

Peer validation is done whenever a new certificate is added, or peer configuration has changed. When a certificate is received, a cached validation response is used. If configured, the received certificate is validated against the `trusted-ca-certificate` list.

When receiving a certificate from a peer router and performing validation, the receiving router extracts and saves the peer router's public key. This is used for validating the authenticity of any subsequent Peer Key/Rekey requests.

### Requirements

SSR 7.0.0 is required on all devices participating in Enhanced Security Key Management. Any SSR running an older version of software that does not support this functionality will cause traffic to fail between those peers. In these cases, events will be generated when peering fails to establish.

## Configuration

Configuration is performed on the conductor, at the Authority level, on a per router basis. To accept the default values for enhanced security key management: 

1. Set `enhanced-security-key-management` to `true`; 

```
config

    authority
        enhanced-security-key-management  true
```
2. Configure a `peering-common-name` on each router. In a secure environment, the router name should never be sent between routers as plaintext in BFD messages. The `peering-common-name` is an alias that identifies the router and is configured at the router level. When `enhanced-security-key-management` is configured, it is validated against the peering-common-name from the ceritficate, and integrated into the auto-generated adjacencies list for the peers of the router from the neighborhood configuration.

```
        router                            combo-east
            name                 combo-east
            peering-common-name  second-fake-alias-2
            location             usa
            description          "router 1"
            inter-node-security  internal
```

The peer list of the router must also have the `peering-common-name` of that peer. If the peer list is not manually configured, it is auto-generated from the neighborhoods.

#### Rekeying (Key Rotation) Atttributes and Default Values

| Configuration Attributes | Description | 
| --- | --- |
| key-exchange-algorithm  | Configure Key Exchange Algorithm |
| payload-key-rekey-interval | Hours between payload security key regeneration. Range is 1-720, or never. Default is 24 hours.  |
| peer-key-rekey-interval | Hours between security key regeneration for peer routers. Range is 1-720, or never. Default is 24 hours. |
| peer-key-retransmit-interval | Seconds between security key retransmission for peer routers, when peer key establishment has not been acknowledged. Range is 5-3600. Default is 30 seconds. |
| peer-key-timeout | Seconds before security key retransmission timeout for peer routers, when peer key establishment has not been acknowledged. Default is 3600 seconds. |

#### Default Configuration Example

```
config 
    authority 
        security-key-management 
            payload-key-rekey-interval    24
            peer-key-rekey-interval       24
            peer-key-retransmit-interval  30
            peer-key-timeout              3600
            invalid-certificate-behavior  fail-soft
```

In cases where you want to manually force key rotation on the routers, use the `security metadata-key regenerate` command to tell the active node to immediately regenerate the metadata key with an incremented rekey index. The active node will push the new metadata key to the peer node.

#### Sample Default Configuration: 

```
config

    authority
        enhanced-security-key-management  true
		
        router                  RTR_EAST_CONDUCTOR
            name                RTR_EAST_CONDUCTOR

            node                conductor-east-1
                name            conductor-east-1
            exit
        exit

        router                   combo-east
            name                 combo-east
            peering-common-name  second-fake-alias-2
            location             usa
            description          "router 1"
            inter-node-security  internal

        router                   combo-west
            name                 combo-west
            peering-common-name  second-fake-alias-3
            location             usa
            inter-node-security  internal
```

## Troubleshooting

The following Events, Alarms, and Show commands are available to troubleshoot issues encountered with Enhanced Security Key Management. 

### Events and Alarms

The following alarms are generated if the certificate received from the peer is invalid, expired, or if the router is unable to authenticate the peer. Use the `show alarms` command to see details about the alarm. 

- Certificate Expired
- Certificate about to Expire (one month prior)
- Certificate Revoked
- Certificate Invalid
- Unable to Authenticate Peer

The following is an example of an alarm generated if the certificate state is invalid: 

```
=============== ===================== ============ ==================== ================ ======================================================================== 

      ID              Time              Severity    Source              Category        Message 

=============== ===================== ============ ==================== ================ ======================================================================== 

combo-east-1:4   2025-01-28 19:07:00   MAJOR       INTERFACE                                DHCP address for interface [wan-intf] has not been resolved 
combo-east-1:5   2025-01-28 19:07:00   MAJOR       INTERFACE                                DHCP address for interface [lan-intf] has not been resolved 
combo-east-1:13  2025-01-28 19:12:21   CRITICAL    RTR_WEST_COMBO           PEER            Peer RTR_WEST_COMBO certificate is invalid: expired - testing-detail 
```

```
admin@combo-east-1.RTR_EAST_COMBO# show alarms id combo-east-1:13 
Tue 2025-01-28 19:17:39 UTC 
✔ Retrieving alarms... 
============================================================================================ 
combo-east-1:13 
============================================================================================ 
Time: 2025-01-28 19:12:21 
Severity: CRITICAL 
Source: RTR_WEST_COMBO 
Category: PEER 
Process: stateMonitor 
Message: Peer RTR_WEST_COMBO certificate is invalid: expired - testing-detail 
Completed in 0.02 seconds 
```

### Show Commands

`show security key-status` provides the following additional information: 

- `metadata rekey index` - Index of the current rekey interval.
- `metadata last rekey` - Number of seconds since the last rekey occurred.
- `metadata next rekey` - Number of seconds until the next rekey occurs.
- `metadata manager status` - Indicates whether the current node is Active-Leader or Redundant-Peer, or displays inactive when the feature is not enabled.

```
                ================================================
                 N1
                ================================================
                  Key Manager State:        Active Leader
                  Rekey Index:              189000
                  Last Rekey:               0 hrs 20 min 24 sec
                  Next Rekey:               1 hrs 2 min 56 sec
                  Key Change Count:         5
                  Config Key Change Count:  2
                  Key Change Error:         key error
                  Config Key Change Error:  config error
                  Metadata Rekey Index:     199000
                  Metadata Last Rekey:      0 hrs 20 min 25 sec
                  Metadata Next Rekey:      1 hrs 2 min 57 sec
```

`show peers security` includes the following information:

-   Security state machine state
-   Local salt value
-   Peer salt value
-   Local metadata key index
-   Peer metadata key index
-   Whether a peer’s certificate has been received
-   Whether a local certificate has been acknowledged by peer
-   Whether a peer’s salt has been received
-   Whether a local salt has been acknowledged by peer
-   Whether a peer’s metadata key has been received
-   Whether a local metadata key has been acknowledged by peer

```
admin@test1.headend# show peers security
Mon 2025-07-21 20:28:18 UTC
✔ Retrieving peer paths...

==============
 Peer: branch
==============
  Peer:               branch
  Node:               test1
  Network Interface:  intf11
  Destination:        172.16.4.5
  Status:             up
  Hostname:           unavailable
  Path Mtu:           unavailable
  Security Status:    MKEY_EXCH_COMP
  Salt:               3565600980
  Peer Salt:          1668479739
  Key Index:          5
  Peer Ki:            253
  Cert Rec:           True
  Cert Ack:           True
  Salt Rec:           True
  Salt Ack:           True
  Key Rec:            True
  Key Ack:            True


==============
 Peer: branch
==============
  Peer:               branch
  Node:               test1
  Network Interface:  intf12
  Destination:        172.16.4.7
  Status:             up
  Hostname:           unavailable
  Path Mtu:           unavailable
  Security Status:    MKEY_EXCH_COMP
  Salt:               3565600980
  Peer Salt:          1668479739
  Key Index:          5
  Peer Ki:            253
  Cert Rec:           True
  Cert Ack:           True
  Salt Rec:           True
  Salt Ack:           True
  Key Rec:            True
  Key Ack:            True

Completed in 0.10 seconds
admin@test1.headend#
```

`show security security-associations`

```
admin@node0# show security security-associations
Fri 2024-03-01 14:28:03 UTC Retrieving security associations...
============== =========== ======= =================== ================ ======== 
 Peer           Peer Name   Node    Network Interface   Destination      Status
============== =========== ======= =================== ================ ======== 
 0200019a8f31   Hub1        node0   ge-0-0              192.168.10.101   up
 0200019a8f31   Hub1        node0   ge-0-1              172.25.22.2      up
 0200019a8f31   Hub1        node1   ge-0-0              192.168.10.101   up
 0200019a8f31   Hub1        node1   ge-0-1              172.25.22.2      up
```

`show security security-associations [peer-name] detail`

```
admin@node0# show security security-associations Hub1 detail
Fri 2024-03-01 14:28:03 UTC Retrieving security associations...
Peer Name: Hub1
State: UP
Peer Certificate: Valid
Public Key: Valid
Local salt: b869b3424513340a, Remote salt: 4cb3488cb19397c3
Peer Key Rekey In: 20 hrs 2 min 56 sec
Peer Rekey Count: 5
Metadata Key Rekey In: 2 hrs 13 min 12 sec
Local Metadata Key Index: 12 (2), Remote Metadata Key Index: 13 (1)
```


