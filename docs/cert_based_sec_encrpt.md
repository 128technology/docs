---
title: Certificate-based Security Encryption
sidebar_label: Certificate-based Security Encryption
---

Security is a critical component of SD-WAN products in today’s market. The effectiveness of any security strategy relies on the strength of its security algorithm and how related information is exchanged between participants.

The SSR uses a Public Key Infrastructure (PKI) to validate the installed certificates and the authenticity of devices within the network, as well as a peer-to-peer security key exchange between SSRs. The configuration is no longer used as the vehicle for distributing and managing security keys. The result is a design that creates maximum scale, avoids mid-network re-encryption, and provides the ability to rotate keys as required.

## How Does It Work?

The security rekeying mechanism is configured at the Authority, and requires that all routers and conductors are running the same version of software that supports this capability. Any SSR unable to participate in the key exchange (running an older version of software) will cause traffic to fail between those peers. In these cases, events will be generated when peering fails to establish.

### Certificate Management 

Certificate management is performed from the CLI using the commands and parameters provided in Configuration Commands and Parameters. The Certificate Signing Request Workflow is interactive, asking the user what they would like placed in the CSR. The following three validity checks take place upon importing a certificate:

- Ensure that there is no private key accompanying the certificate. On 100 and 1000 series platforms the private key is parsed and validated against the matching private key on disk.

- Parse the certificate and then validate it (dates/roles/other restrictions, etc.).

- Check the certificate against the known revoked certificates (CRL).

If the above three checks pass, then the private key and certificate are accepted and imported

Long-lived Certificates are issued to every Juniper manufactured router by the Juniper Networks Certificate Authority. Use of the rekey feature requires that a certificate be provided during installation. The base certificate can be replaced during initial software installation, however all routers in a single authority MUST have certificates issued by the same certificate hierarchy. Otherwise, replacing a certificate may be done during a maintenance window.

### Certificate Security

The Certificate Revocation List (CRL) Manager handles the discovery, fetching, and periodic updates to CRLs. From this process a list of all known revoked certificates from all CRL sources is created, and the master list is published to disk.

The following are some details of certificate security.

- The Trusted Platform Module (TPM) stores the private key of the base certificate. The certificate and any keys are not included in any configuration.

- Periodic revocation checks of the base certificate are performed based on the configuration defaults or user configured timelines.

- When rekeying is enabled on a newly initialized router that does NOT have a valid, signed certificate, an alarm is generated. A valid certificate must be obtained from a Certificate Authority before valid secure communication can take place. When a valid certificate is present, the router will create an elliptic-curve public/private key pair (see [RFC8422]) 

- Contained within the SVR certificate is a router identifier, which must match the identifier of the router in the peer configuration. This router identifier is a UUID and guaranteed to be unique per node, even across RMAs.

- The public key is used to create an X.509 certificate signing request (CSR) with the common name field set to the router's UUID. A certificate signing request is initiated through a secure connection to a configured Certificate Authority (CA). The CA digitally signs the CSR and returns it to the requesting router. Certificates and Public Keys are stored locally on each router in PEM format defined by RFC7468. 

## Certificate Revocation List

Managing the Certificate Revocation List (CRL) includes the discovery, fetching, and periodic updates to CRLs using the configuration commands and parameters provided in Configuration Commands and Parameters. These parameters generate a list of all known valid and revoked certificates from all CRL sources and saves this information to disk. The CRL configuration parameters include:

**There does not seem to be any commands directly associated with creating a CRL other than certificate-revocation url and polling-interval. If there are others, please provide pointers.**

## Installing Certificates

Installing a trusted CA certificate on the SSR uses the existing functionality as described in [Adding a Trusted Certificate](howto_trusted_ca_certificate.md).

## Replace or Revoke a Certificate

When a certificate is revoked, expired, or invalid, the SSR generates an alarm. Based upon the SSR configuration, it will either `fail-soft` (the default behavior) or `fail-hard`.

Soft failure results in a notification that the certificate is no longer valid and that appropriate action must be taken. 

Hard failure results in the same notification, as well as the removal of all peering relationships. This stops the device from participating in SVR.

The following sections describe the procedures for replacing and revoking certificates.

### Expiring Certificate

Expiring certificates will generate the following alarms.

If a certificate expires within a month, a minor alarm is generated. 
If a certificate expires within a week, a major alarm is generated. 
If a certificate is expired or otherwise invalid, a critical alarm is generated. 

When a router's certificate is about to expire or needs to be replaced, a new certificate can be added to the system using the [installation procedure](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/howto_trusted_ca_certificate). Once the new certificate file has been loaded into the system, an event is triggered to restart the peer authentication procedure again.

### Compromised Certificate

In the case of a compromised system or certificate, the certificate will be revoked. 

The router periodically checks the Certificate Revocation List (CRL) from existing certificate authority servers for any revocations, according to the interval defined in the configuration. If a revocation has taken place, the router takes the action defined in the configuration (fail-soft or fail-hard). 

## Peer Authentication

Peer validation is done whenever a new certificate is added, or peer configuration has changed. When a certificate is received from a peer on multiple peer paths, a cached validation response is used. Validation is accomplished by verifying the routerID of its peer matches that of the certificate.

The public key is sent by both routers on both pathways, but only needs to be validated one time for each router peer.

When receiving a certificate from a peer router and performing validation, the receiving router must extract the peer router's public key and save it. This is used for validating the authenticity of any subsequent Peer Key/Rekey requests.

### Peer Key and Rekey
A single symmetric key is used for all paths between two routers. The key is saved and remains valid during network outages and path failures, until a new key is accepted as a replacement.

During the rekeying period the old key is used. A wait time of 30 seconds is added post key computation to prevent any retransmitted packets, delayed packets, or long latency packets not having a key ready for use.

If a peer sends a Key Request to a peer for which there is no valid key and receives no response, then the peer path remains out of service until there is a valid response.

The peer continues to resend requests at periodic intervals as defined in the configuration setting `authority > security-key-management > peer-key-retransmit-interval`. If there is no response after the time defined by `authority > security-key-management > peer-key-timeout`, the peer path is declared invalid and removed from service. Once the peer is taken out of service due to key timeout, it will continue to send rekey attempts at the `peer-key-timeout intervals`, or upon interface state change.

## High Availability

Each node of an HA pair manages its own unique certificate - certificates are not shared between nodes. Each node manages its own unique connection to its peers.

When two nodes are configured as a redundant pair, each of the keys need to be exchanged between nodes. This is done to avoid rekeying on flow migration due to node failures. Keys can be safely exchanged between nodes as the HA sync interfaces are connected point to point over a SSH connection.

## Configuration

config certificate-revocation 
 - url    blah.bla.com
 - polling interval 
	- Frequency to fetch CRL
	- units: hours
	- range: 1-168 
	- default: 24
 - backoff- interval: delay in seconds to apply to the polling-interval
	- units: seconds
	- type: uint32
	- default: ?

Peer Certificate Validation

config peer-validation 
	- validate peering connections on this router
	- values: true/false
	- default: false


## Troubleshooting

Use the following information to help troublshoot certificate events or issues.

### PCLI commands

- `show certificate` - Show basic certificate information
- `show certificate detail` - Show all OpenSSL details about the certificate
- `show certificate crl` - Show basic information about the CRL (including source)

### Audit Events/Logging

Audit events and logs are generated for the following events:

- Generate CSR

```
=======================================================================================================================================================
 2025-03-19T20:50:35.173Z Generated certificate signing request.
=======================================================================================================================================================
 Type:               system.generate_csr
 Node:               test-1
 Description:        Generated CSR for: TestCertificate
 Json Event Detail:  {"name":"TestCertificate","common_name":"example.com","country_name":"US","state_province_name":"California","locality_name":"San
 Francisco","organization_name":"ExampleOrg","organizational_unit_name":"IT","email_address":"admin@example.com","validity_period_days":365}
 Permitted:          True
```

- Import Certificate
```
======================================================================================================================================================================================================
 2025-03-26T21:22:43.108Z Ingested a certificate.
======================================================================================================================================================================================================
 Type:               system.ingest_certificate
 Node:               test-1
 Description:        Ingested certificate: TestCertificate
 Json Event Detail:  {"purpose":"TLS Web Client
 Authentication","common_name":"example.com","crl_urls":["http://10.27.34.42/crlfile.crl"],"certificate_authority":"N/A","fingerprint":"6D:C7:8E:48:4F:55:63:D9:AB:70:66:CD:29:4E:1C:37:CF:89:17:B0"}
 Permitted:          True
```

- Peer Certificate Validation

(Need example)

- CRL Update
```
========================================================================================================================================================================================================
 2025-03-07T20:59:50.736Z Updated certificate revocation list files.
========================================================================================================================================================================================================
 Type:               system.crl_update
 Node:               t158-dut1.CONDUCTOR
 Description:        Updated CRL for issuer: endpoint
 Json Event Detail:  {"forced":false,"last_updated":"Oct 17 16:33:11 2024 GMT","next_update":"Oct 27 15:33:10 2024
 GMT","crl_url":"http://10.27.39.143/testCrl.pem","size":14162,"total_entries":279,"added_entries":0,"removed_entries":0,"success":true,"certificate_authority":"/C=US/O=Google Trust Services/CN=WR2"}
 Permitted:          True
```

### Show Stats Commands

#### Event Counters

`show stats security CSR success` 
`show stats security CSR failure` 
`show stats security certificate import success` 
`show stats security certificate import failure` 
`show stats security CRL fetch success` 
`show stats security CRL fetch failure` 
`show stats security CRL ingestion success` 
`show stats security CRL ingestion failure `

#### Certificate Event Counters

`show stats security certificate expired` 
`show stats security certificate invalid` 
`show stats security certificate revoked` 

#### Peer Certificate Event Counters

`show stats security peer certificate expired` 
`show stats security peer certificate invalid` 
`show stats security peer certificate revoked` 

### Configuration Commands and Parameters

**`enhanced-security-key-management`**

- authority > enhanced-security-key-management
- Boolean, default=false. Flag for using the security key management capabilities. Restart of the entire authority is required if enabled post deployment.

**`security-key-management`**

- authority > security-key-management
- Container for authority-wide security policies pertaining to SVR encryption.

**`peer-key-rekey-interval`**

- authority > security-key-management > peer-key-rekey-interval
- Hours between security key regeneration for peer routers
- uint value of 0-720, units = hours, default = 24

**`peer-key-retransmit-interval`**

- authority > security-key-management > peer-key-retransmit-interval
- Seconds between security key retransmission for peer routers, when peer key establishment has not been acknowledged.
- uint value of 5-3600, units = seconds, default = 30.

**`peer-key-timeout`**

- authority > security-key-management > peer-key-timeout
- Seconds before security key retransmission timeout for peer routers, when peer key establishment has not been acknowledged.
- uint value, units = seconds, default = 3600.

**`invalid-certificate-behavior`**

- authority > security-key-management > invalid-certificate-behavior
- Behavior when a certificate is revoked, expired, or invalid.
- enumeration of `fail-soft `or `fail-hard`. Default = `fail-soft`.
- `fail-soft` generates an alert indicating action needs to be taken.
- `fail-hard` removes all peering relationships. **Does it also provide an alert as the soft fail does?**

**`ca-profile`**

- authority > security-key-management > ca-profile
- Container for certificate authority properties in use with SVR certificates.

**ca-profile url**

- authority > security-key-management > ca-profile > url
- Location of the CA.

**`revocation-check-interval`**

- authority > security-key-management > ca-profile > revocation-check-interval
- Hours between security key revocation check.
- uint value of 0-720, units = hours, default = 48.

**`key-exchange-algorithm`**

- authority > security-key-management > key-exchange-algorithm
- The algorithm to use for exchanging keys between peers.
- enumeration of diffie-hellman, ml-kem, or diffie-hellman-ml-kem.

**`diffie-hellman-key-size`**

- authority > security-key-management > diffie-hellman > diffie-hellman-key-size
- Definition of the key size to use when key-exchange-algorithm is set to diffie-hellman.
- Enumeration of the values 1024, 2048 or 4096.

**`ml-kem-key-size`**

- authority > security-key-management > ml-kem > ml-kem-key-size
- Definition of the key size to use when key-exchange-algorithm is set to ml-kem.
- Enumeration of the values 512, 768 or 1024.

