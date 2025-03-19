---
title: Certificate-based Security Encryption
sidebar_label: Certificate-based Security Encryption
---

Security is a critical component of SD-WAN products in today’s market, and the effectiveness of any security strategy relies on the strength of its security algorithm and how related information is exchanged between participants. 

Currently, the method for distributing security keys used for encryption and authentication is to  include them as part of the configuration. While this is adequate for many deployments, it presents two significant challenges and limitations:
- When security keys are distributed through configuration they risk being compromised in transit or at rest.
- Rekeying is limited to deployments that do not have an SSR “in front” of a conductor.

To that end, the SSR has implemented a Public Key Infrastructure (PKI) to validate the installed certificates and the authenticity of devices within the network. For peers that use the Diffie-Hellman algorithm, this same infrastructure is also used to produce and authenticate shared keys. 

## How Does It Work?

The security rekeying mechanism is configured at the Authority, and requires that all routers and conductors are running the same version of software that supports this capability. Any SSR unable to participate in the key exchange (running an older version of  software) will cause traffic to fail between those peers. In these cases, events will be generated when peering fails to establish.

### Certificate Management Overview

The Certificate Manager will handle the importing and validation of certificates. It is also responsible for implementing the Certificate Signing Request workflow. (need to work on this)

Long-lived Certificates are issued to every Juniper manufactured router connected to either the Mist Cloud or a conductor by the Juniper Networks Certificate Authority. The root of the certificate chain is Juniper Networks. Customers may replace this base certificate on an SSR during initial software installation. All routers in a single authority MUST have certificates issued by the same certificate hierarchy. Certificates may be replaced during a maintenance window.

ODM, virtualized, or other non-Juniper hardware platforms cannot use self-signed certificates. To use the rekey feature, a certificate must be provided during installation. 

### Certificate Security

The Certificate Revocation List (CRL) Manager handles the discovery, fetching, and periodic updates to CRLs. From this process a list of all known revoked certificates from all CRL sources is created the master list is published to disk.

The following list outlines certificate security.

- The Trusted Platform Module (TPM) stores the private key of the base certificate. The certificate and any keys are not included in any configuration.

- Periodic revocation checks of the base certificate are performed based on the configuration defaults or user configured timelines.

- When rekeying is enabled on a newly initialized router that does NOT have a valid, signed certificate, an alarm is generated. A valid certificate must be obtained from a Certificate Authority before valid secure communication can take place. When a valid certificate is present, the router will create an elliptic-curve public/private key pair (see [RFC8422]) 

- Hostnames are now configured using a router UUID to guarantee a unique and static value per router, even across RMAs. The use of the hostname as the router name is common practice. This translates to the peer-name containing the hostname, and is provided as clear text in the configuration. Because the hostname is considered sensitive customer data, it represents a security vulnerability. The use of the UUID addresses this vulnerability. This information can be safely shared through configuration among router peers to validate their identity against the certificate.

- The public key is used to create an X.509 certificate signing request (CSR) with the common name field set to the router's UUID. A certificate signing request is initiated through a secure connection to a configured Certificate Authority (CA). The CA digitally signs (ECDSA) the CSR and returns it to the requesting router. Certificates and Public Keys are stored locally on each router in PEM format defined by [RFC7468]. Elliptic curve is used to ensure the X.509 certificate is as small as possible. 

Note: While this document refers to the use of Elliptic Curve certificates and Elliptic Curve Diffie Hellman, RSA certificates and traditional Diffie Hellman can be used. However, it is recommended that the same type of certificate is used throughout the authority.

## Installing Certificates

Installing a trusted CA certificate on the SSR uses the existing functionality as described in https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/howto_trusted_ca_certificate.
Certificates can also be installed onto platforms as part of the staging process, using the same procedure.

## Replace or Revoke a Certificate

When a certificate is revoked, expired, or invalid, the SSR generates an alarm. Based upon the SSR configuration, it will either `fail-soft` (the default behavior) or `fail-hard`.

Soft failure results in a notification that the certificate is no longer valid and that appropriate action must be taken. 

Hard failure results in the same notification, as well as the removal of all peering relationships. This stops the device from participating in SVR.

The following sections describe the procedures for replacing and revoking certificates.

### Expiring Certificate

When a router's certificate is about to expire or needs to be replaced, a new certificate can be added to the system using the [installation procedure](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/howto_trusted_ca_certificate). Once the new certificate file has been loaded into the system, an event is triggered to restart the peer authentication procedure again.

### Compromised Certificate

In the case of a compromised system or certificate (do certificates get compromised?), the certificate should be revoked. 
Okay, how do I do that??

Note that the router periodically checks the Certificate Revocation List (CRL) from existing certificate authority servers for any revocations, according to the interval defined in the configuration. If a revocation has taken place, the router takes the action defined in the configuration (fail-soft or fail-hard). 

## Peer Authentication

Peer validation is done one time. When a certificate is received from a peer on multiple peer paths a cached validation response is used. Validation is accomplished by verifying the routerID of its peer matches that of the certificate.

Each node of a HA pair manages its own unique certificate - certificates are not shared between nodes. Each node manages their own unique connection to its peers.

**Keys and Lifetimes
see table in SSR Securoty Encryption V2 - copy this into the the docs**

## High Availability

There will be no special logic to handle Highly Available nodes in a router.  Each node must have its own private key and thus its own certificate.  Each will be responsible for its own CRL management.

When two nodes are configured as a redundant pair, each of the keys need to be exchanged between nodes.[EC1] [MB2] [EC3] [MB4]  This is done to avoid rekeying on flow migration due to node failures. Keys can be safely exchanged between nodes as the HA sync interfaces are connected point to point over a SSH connection.


### Configuration
There will be configuration at the router level to determine whether the router will perform peer certificate validation.

## Troubleshooting

### PCLI commands

- `show certificate` - show basic certificate information
- `show certificate detail` - show all OpenSSL details about the certificate
- `show certificate crl` - shows basic information about the CRL (including source)

### Audit Events/Logging

Audit events and logs will be added whenever certain events take place, both in the success and failure cases:
- Generate CSR
- Import Certificate
- Peer Certificate Validation

**Please add a section for relevant counters that will be added as well.
Some critical contents:
- Peer IP and other identifiers for peer authentication cases
- Source IP for API workflows
- CRL source IP
- Certificate fingerprints and some summary metadata about the certs**

### Commands

authority > enhanced-security-key-management
·       Boolean, default of false, flag for using the functionality defined within this document or the existing security capabilities. Restart of the entire authority is required if enabled post deployment.
authority > security-key-management
·       New container for authority-wide security policies pertaining to SVR encryption
authority > security-key-management > peer-key-rekey-interval
·       Hours between security key regeneration for peer routers
·       uint value of 0-720, units = hours, default = 24
authority > security-key-management > peer-key-retransmit-interval
·       Seconds between security key retransmission for peer routers, when peer key establishment has not been acknowledged
·       uint value of 5-3600, units = seconds, default = 30
authority > security-key-management > peer-key-timeout
·       Seconds before security key retransmission timeout for peer routers, when peer key establishment has not been acknowledged
·       uint value, units = seconds, default = 3600
authority > security-key-management > invalid-certificate-behavior
·       Behavior when a certificate is revoked, expired, or invalid
·       enumeration of fail-soft or fail-hard. Default = fail-soft
·       fail-soft will provide an alert indicating action needs to be taken
·       fail-hard will remove all peering relationships
authority > security-key-management > ca-profile
·       New container for certificate authority properties in use with SVR certificates
authority > security-key-management > ca-profile > url
·       Location of the CA
authority > security-key-management > ca-profile > revocation-check-interval
·       Hours between security key revocation check
·       uint value of 0-720, units = hours, default = 48
authority > security-key-management > key-exchange-algorithm
·       The algorithm to use for exchanging keys between peers
·       enumeration of diffie-hellman, ml-kem  or diffie-hellman-ml-kem
authority > security-key-management > diffie-hellman > diffie-hellman-key-size
·       Definition of the key size to use when key-exchange-algorithm is set to diffie-hellman
·       Enumeration of the values 1024, 2048 or 4096[RP1] 
authority > security-key-management > ml-kem > ml-kem-key-size
·       Definition of the key size to use when key-exchange-algorithm is set to ml-kem
·       Enumeration of the values 512, 768 or 1024[RP2] 

## Configuration

Simple Config


Detailed Config