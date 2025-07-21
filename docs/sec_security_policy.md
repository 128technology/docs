---
title: Security Policies
sidebar_label: Security Policies
---

The Session Smart Router - or SSR, should have been called the SSSR for Secure Session Smart Router, but folks in tech love TLAs. By design, the SSR will only forward packets to a destination upon creation of a policy. Once a routed path exists within the network, it is important to ensure that the payload is encrypted to keep data safe. Even though more and more traffic is being natively encrypted, there is still content that is sent over untrusted networks without encryption, or without the additional layers of encryption necessary to thwart bad actors. The SSR offers a policy-driven approach to defining the level of encryption needed per service and per path.

While there are many aspects to security, the focus of this document is the security of payload and metadata encryption between SSRs.

Metadata is encrypted and decrypted between SSR routers, but payload encryption is performed end-to-end. This is illustrated in a multi-hop router deployment by the image below.

![End-to-end encryption and decryption](/img/sec_metadata_payload_encryption.png)

### HMAC
HMAC signatures, appended to the end of a packet's payload, guarantee the contents of each packet have not been changed, and that the peering router is known and trusted by the receiver. While possible, it is not recommended to disable HMAC between SSRs, as it will prevent middle-man attempts to corrupt or impact active sessions.

Timed Based HMAC signatures can be used to protect SVR pathways against replay attacks. Upon initiation of every session, a Session HMAC Key is created. The Session HMAC Keys persist for the life of a session and deployments not change. Time-based HMAC signatures change at a specified interval.


### Payload Encryption
The SSR uses industry hardened AES encryption ciphers that rely on the use of an encryption key and an initialization vector (IV). The IV is used to "prime the session" as a unique IV is generated per packet, allowing encryption to be stateless.
When creating a new security policy within the SSR, the SSR will automatically generate random values for the key and IV and store them securely within the device. It is not recommended to manually supply values for these attributes as this _may_ compromise the security of the network.

There are four locations where security policies can be defined:
* The security policy defined in the `service > security-policy` serves to encrypt and decrypt the payload of packets within a session. The encryption keys and algorithms defined at the service are always symmetric between SSR nodes.
* A security policy can be defined in `network-interface > inter-router-security`. This security policy defines how metadata are **decrypted** for SVR traffic received on the respective interface.
* A security policy can be defined on `network-interface > adjacency > inter-router-security`. The security policy associated with the adjacency defines what keys and **encryption** algorithms are used for encrypting metadata (and hmac signing packets) sent to an SVR peer.
* A security policy can be defined in `router > inter-node-security`. This security policy defines the encryption of metadata (and hmac signing packets) for HA interfaces used for inter-node communication.

### Best Practices
The SSR affords you the ability to provision a unique security policy per service. However, in a typical hub-and-spoke topology, a single security policy can be shared among all services, with a separate security policy used for metadata encryption and authentication.

HA interfaces between SSR nodes are directly connected between nodes and therefore pose no risk of interception. Given the additional computational cost of encrypting and decrypting traffic, it is recommended to apply a security policy to `inter-node-security` with encryption and hmac disabled for this purpose.

Example:
```
        security  encrypt-hmac-disabled
            name                 encrypt-hmac-disabled
            description          "Encryption and message authentication disabled"
            hmac-cipher          sha256
            hmac-key             (removed)
            encryption-cipher    aes-cbc-128
            encryption-key       (removed)
            encryption-iv        (removed)
            encrypt              false
            hmac-mode            disabled
            adaptive-encryption  false
        exit
```

## Changing a Security Policy
Changing a security policy is a service impacting event as it is not possible to alter security keys and encryption ciphers for existing flows. Care must be taken to understand the blast radius of these changes. It goes without saying, you must understand the security policy that needs to change and how it is being used for services and peer paths. If altering the global security policy that is used for all services, all traffic will be impacted. Changing a security policy should always be performed during a maintenance window after fully understanding the overall impact to the environment. Due to the fact that sessions are not terminated on security policy change, the best course of action is to **reboot all the routers where traffic flows through the SSR with a security policy change has been made**.

The best approach to making any change to a security policy is to create a new policy, with a new name, and apply it to the respective service, interface, or adjacency. This affords network administrators the ability to readily identify sessions that may not have adopted the new policy.
After applying the change, be sure to restart the SSR on any routers that share the same security policy to clear any active sessions. After the SSR has restarted, ensure that traffic is traversing the service as expected:

```
admin@node0.0200017bb97d# show service contains-service-name any
Wed 2023-11-15 17:25:55 UTC
✔ Retrieving service information...

========= =========== =========== ================ ================ ======= ========== ============== ==============
 Service   Prefixes    Transport   Tenant Allowed   Service-Policy   State   Sessions   Tx Bandwidth   Rx Bandwidth
========= =========== =========== ================ ================ ======= ========== ============== ==============
 any       0.0.0.0/0   -           trusted-lan      any-sp           Up           119   23.56 kbps     23.59 kbps

Completed in 0.12 seconds
```

Identify that sessions are traversing the service. 

```
shadmin@node0.0200017bb97d# show sessions service-name any
Wed 2023-11-15 17:27:06 UTC
Node: node0.0200017bb97d Page 1

====================================== ===== ========= ============= ========== ============ ====== ======= =============== ========== =============== =========== =============== =========== =========== ========= ================
 Session Id                             Dir   Service   Tenant        Dev Name   Intf Name    VLAN   Proto   Src IP          Src Port   Dest IP         Dest Port   NAT IP          NAT Port    Payload     Timeout   Uptime
                                                                                                                                                                                                Encrypted
====================================== ===== ========= ============= ========== ============ ====== ======= =============== ========== =============== =========== =============== =========== =========== ========= ================
 48e2d02a-cd65-43b7-b3f5-621c91525426   fwd   any       trusted-lan   ge-0-1     ge-0-1_400    400   TCP     172.16.1.11.2      62360   162.159.6.1.3         443   192.168.0.247       37993   False           677   0 days 0:21:11
 48e2d02a-cd65-43b7-b3f5-621c91525426   rev   any       trusted-lan   ge-0-0     ge-0-0          0   TCP     162.159.61.3         443   192.168.0.247       37993   0.0.0.0                 0   False          1078   0 days 0:21:11
 1fa9a14d-b216-4c4f-93da-efdaef25d61c   fwd   any       trusted-lan   ge-0-1     ge-0-1_400    400   TCP     172.16.1.11.2      62403   140.82.11.2.25        443   192.168.0.247       38028   False           670   0 days 0:20:30
 1fa9a14d-b216-4c4f-93da-efdaef25d61c   rev   any       trusted-lan   ge-0-0     ge-0-0          0   TCP     140.82.112.25        443   192.168.0.247       38028   0.0.0.0                 0   False           790   0 days 0:20:30
```

Sample some of the newly created sessions and confirm that the new security policy is in effect by examining the output of `show sessions by-id`.

:::info
Note the output of:<br/>
`Forward Flows > Metadata Security Policy`: This comes from the configuration of `network-interface > adjacency > inter-router-security`, which is the metadata encryption policy.<br/>
`Payload Security Policy`: This comes from the configuration `service > security-policy`, which is the payload encryption policy.<br/>
`Reverse Flows > Decrypt Security Policy`: This comes from the configuration `network-interface > inter-router-security`, which is the metadata decryption policy.
:::


```
admin@conductor.site1# show sessions by-id router west-dc-router 30da8df9-2f91-42a2-b54c-cc66e5651714
Thu 2023-11-09 22:20:42 UTC
Retrieving session information...
===============================================================================================================================================================================================================================
 west-dc-router.west-dc-01         Session ID: 30da8df9-2f91-42a2-b54c-cc66e5651714
===============================================================================================================================================================================================================================
 Service Name:                      local-subnets
 Service Route Name:                N/A
 Session Source:                    SourceType: INTER_NODE
 Payload Security Policy:           service-sec
 Payload Encrypted:                 True
 Forward Flows:
     Decrypt Security Policy:       encrypt-hmac-disabled
     Attributes:
         Metadata Security Policy:  peer-sec
 Reverse Flows:
     Decrypt Security Policy:       peer-sec
     Attributes:
         Metadata Security Policy:  encrypt-hmac-disabled
========================================================================================================================================================
 west-dc-router.west-dc-02         Session ID: 30da8df9-2f91-42a2-b54c-cc66e5651714
===================================================================================================================================================================================================
 Service Name:                      local-subnets
 Session Source:                    SourceType: PUBLIC
 Inter Node:                        True
 Payload Security Policy:           service-sec
 Payload Encrypted:                 True
 Forward Flows:
     Decrypt Security Policy:       <empty>
     Attributes:
         Metadata Security Policy:  encrypt-hmac-disabled
 Reverse Flows:
     Decrypt Security Policy:       encrypt-hmac-disabled
     Attributes:
         Metadata Security Policy:  <empty>
```
