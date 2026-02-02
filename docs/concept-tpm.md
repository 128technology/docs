---
title: Trusted Platform Module Overview
sidebar_label: Trusted Platform Module 
---

#### Version History

| Release | Modification                |
| ------- | --------------------------- |
| 7.1.3-r2   | Trusted Platform Module support added. |

A Trusted Platform Module (TPM) is a secure cryptoprocessor that stores cryptographic keys. It serves as a secure storage mechanism for essential security artifacts such as digital certificates.

## TPM-Based Certificates

The SSR400 and SSR440 use the TPM-based certificate to ensure secure identification of the device. The device has a burnt-in idev-id certificate on the TPM. The idev-id certificate provides the device's Juniper serial number and model, proving that the device was manufactured in a Juniper facility. The TPM certificate is the most secure way for a Juniper device to prove its identity.

### Benefits of TPM-Based Certificates

- Provides trust. Helps to establish advanced security in an insecure digital world.
- Provides confidentiality. Data sent is encrypted and only visible to the server and client.
- Provides integrity. Ensures that the data has not been modified during the transfer.

### How Does a Conventional SSL/TLS Certificate Work?

Secure Socket Layer (SSL) is a protocol that allows encryption. It helps to secure and authenticate communications between a client and a server. It can also secure email, VoIP, and other communications over unsecured networks. SSL is also referred to as Transport Layer Security (TLS).

In unsecured HTTP connections, hackers can easily intercept messages between client and server. SSL certificates use a public/private keypair system to initiate the HTTPS protocol. Hence, SSL certificates enable secure connections for users and clients to connect. SSL/TLS works through:

- Secure communication that begins with a TLS handshake. The two communicating parties open a secure connection and exchange the public key.

- During the TLS handshake, the two parties generate session keys. The session keys encrypt and decrypt all communications after the TLS handshake.

- Different session keys encrypt communications in each new session.

- TLS ensures that the user on the server side, or the website the user is interacting with, is who they claim.

- TLS also ensures that data has not been altered, since a Message Authentication Code (MAC) is included with transmissions.

When a signed SSL certificate secures a website, it proves that the organization has verified and authenticated its identity with the trusted third party. When the browser trusts the CA, the browser now trusts that organization’s identity too.



