---
title: Security Policies
sidebar_label: Security Policies
---

SSR - the Session Smart Router, should have been called the SSSR for Secure Session Smart Router, but folks in tech love TLAs. The SSR will only forward packets to a destination when a policy exists. Once a routed path exists within the network, it is important to ensure that the payload is encrypted so that data is kept safe. While more and more traffic is natively being encrypted, there is still content that is still sent "in the clear", or additional layers of encryption are necessary to thwart bad actors. The SSR offers a policy-driven approach to define the level of encryption needed per service and per path.

While there are many aspects to security, this document will focus on the security of payload and metadata encryption between SSRs.

Metadata is encrypted and decrypted between SSR routers, but payload encryption is performed end-to-end, as is described by the image below for multi-hop router deployments.

![End-to-end encryption and decryption](/img/sec_metadata_payload_encryption.png)

### HMAC
HMAC signatures, contained within metadata, guarantee the contents were not changed, and that the router sending it is known to the receiver. While it is possible to disable HMAC between SSRs, it is recommended as it prevents any mid-stream attempts to corrupt or impact sessions that are ongoing.

Timed Based HMAC signatures can be used to protect SVR pathways against replay attacks. Upon start, every session creates a Session HMAC Key which is the Peer Key at the time the session was created. Session HMAC Keys persist for the life of a session, and do not change. Time based HMAC signatures change the at the specified interval.


### Payload Encryption
The SSR uses industry hardened AES encryption ciphers which rely on the use of an encryption key and an initialization vector (IV). The IV itself is used to "prime the session" as a unique IV is generated per packet which allows encryption to be stateless.
When creating a new security policy within the SSR, the SSR will automatically generate random values for the key and IV and store them securely within the device. It is not recommended to manually supply values for these attributes as this _may_ compromise the security of the network.

* The security policy defined in the `service > security-policy` serves to encrypt and decrypt the payload of packets within a session. The encryption keys and algorithms defined at the service are always symmetric between SSR nodes.
* A security policy can be defined in `network-interface > inter-router-security`. This security policy defines how metadata and HMAC are **decrypted** for SVR traffic received on the respective interface.
* Lastly, a security policy can be defined on `network-interface > adjacency > inter-router-security`. The security policy associated with the adjacency defines what keys and **encryption** algorithm will be used for encrypting traffic sent to a SVR peer.

### Best Practices
While the SSR affords you the ability to provision a unique security policy per service, in a typical hub-and-spoke topology, a single security policy can be shared among all services, with a separate security policy used for metadata encryption and authentication.

## Changing a Security Policy
Changing a security policy is a service impacting event as it is not possible to alter security keys and encryption ciphers for existing flows. Care must be taken to understand the blast radius of these changes. It goes without saying, but you must understand the security policy that needs to change and how it is being used for services and peer paths. If altering the global security policy that is used for all services, all traffic will be impacted. Sessions will not be terminated and reestablished; rather they will follow their own life cycle and the new policy will take effect for subsequent sessions. Changing a security policy should always be performed during a maintenance window after fully understanding the overall impact to the environment. Due to the fact that sessions are not terminated on security policy change, long-lived flows may need to be manually terminated in order for them to take on the properties of the new policy.

The best approach to making any change to a security policy is to create a new policy, with a new name, and apply it to the respective service, interface or adjacency. Doing so affords network administrators the ability to readily identify sessions that may not have adopted the new policy.
After applying the change, be sure to run `delete sessions service-name <service-name>` for **all** services that share the same security policy to clear any active sessions. Once the sessions have been cleared, ensure that traffic is traversing the service as expected:

```
admin@node0.0200017bb97d# show  service contains-service-name any
Wed 2023-11-15 17:25:55 UTC
✔ Retrieving service information...

========= =========== =========== ================ ================ ======= ========== ============== ==============
 Service   Prefixes    Transport   Tenant Allowed   Service-Policy   State   Sessions   Tx Bandwidth   Rx Bandwidth
========= =========== =========== ================ ================ ======= ========== ============== ==============
 any       0.0.0.0/0   -           trusted-lan      any-sp           Up           119   23.56 kbps     23.59 kbps

Completed in 0.12 seconds
```

Identify the sessions traversing the service, paying particular attention to those with an uptime greater than the time of the configuration change. If sessions exist with an uptime greater than the time of the `delete sessions` command, be sure to execute the `delete sessions` command again and confirm that they have been cleared.

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
`Forward Flows > Metadata Security Policy` which comes from the configuration `network-interface > adjacency > inter-router-security`, which is the metadata encryption policy<br/>
`Payload Security Policy` which comes from the configuration `service > security-policy`, which is the payload encryption policy<br/>
`Reverse Flows > Decrypt Security Policy` which comes from the configuration `network-interface > inter-router-security`, which is the metadata decryption policy
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
