---
title: Transport-based Encryption
sidebar_label: Transport-based Encryption
---

Transport-based Encryption allows you to select specific links for encryption, such as a link using public broadband or LTE, and disable encryption on trusted links. This reduces the performance hit taken when encrypting traffic over an already secure transport link. When a failover occurs from a trusted link to a public connection, payload encryption can be enabled to maintain the secure connection. 
 
transport based encryption, it will only matter if the policy is configured on a service and encryption is disabled. 

Here is a high level summary of the above implementation descriptions:
a.	Adaptive encryption does not apply to this feature. It functions, as it does now, only for the services that have encryption turned on.
b.	This feature only applies to the services that have security policy defined but encryption turned off.
c.	With this feature, payload encryption happens just once on the first router where the override is enabled (irrespective of the number of hops and payload override configuration) and decryption happens only at the last hop.
