---
title: Certificate Management Overview
sidebar_label: Certificate Management Overview
---

The SSR uses a Public Key Infrastructure (PKI) to authenticate devices, encrypt management and transport traffic, and establish trust between routers, conductors, and external services. This page introduces the concepts that are common to every certificate workflow on the SSR — where certificates are used, the supported formats, the two configuration models, and where private keys are stored — and points you to the detailed configuration guides for each feature.

If you are new to PKI concepts such as key pairs, certificate authorities, certificate signing requests, and revocation, review a general X.509 primer before continuing. This page assumes that background and focuses on how those concepts map onto the SSR.

## Where the SSR Uses Certificates

The SSR relies on certificates in several independent subsystems. Each subsystem has its own configuration guide, and the cryptographic requirements that apply across all of them are described in [Certificate Requirements and Validation](cert_validation_requirements.md).

| Use Case | Purpose | Configuration Guide |
| --- | --- | --- |
| Web server (HTTPS admin UI) | Secures the administrative GUI. By default the SSR generates a self-signed certificate; a CA-signed certificate can be imported through the PCLI. | [Signing and Importing Webserver Certificates](config_webserver_certs.md). |
| Enhanced Security Key Management (ESKM) | Provides peer-to-peer, certificate-based identity between routers for Secure Vector Routing. | [Enhanced Security Key Management](sec_enhanced_key_mgmt.md), [Configure Certificate Management](config_custom_certs.md). |
| Secure Conductor Onboarding (SCO) | Authenticates a router to a conductor during onboarding using file-based certificates. | [Secure Conductor Onboarding](sec-conductor-onboard.md). |
| Syslog over TLS | Encrypts and authenticates the connection to a remote syslog server. | [Configure Syslog over TLS](config_syslog_tls.md). |
| RADIUS and RADSEC | Secures RADIUS authentication traffic over TLS. | [Configure RADIUS](config_radius.md), [Configure RADSEC](config_radsec.md). |
| LDAP over SSL (LDAPS / STARTTLS) | Validates the LDAP server certificate when connecting for authentication. Trust is established through the operating system CA bundle, not the SSR certificate framework. | [Configure LDAP](config_ldap.md), [Adding a Trusted Certificate](howto_trusted_ca_certificate.md). |

:::note
LDAP trust uses the operating system CA bundle and the `certificate-assurance` setting (`weak`, `mild`, `moderate`, or `strong`) rather than the SSR `trusted-ca-certificate` framework. See [Configure LDAP](config_ldap.md) for details.
:::

## Certificate Formats

The SSR works exclusively with **PEM-encoded** certificates and keys, both in configuration and through the REST APIs. PEM is the Base64-encoded, human-readable format that begins with a header such as `-----BEGIN CERTIFICATE-----`. Private keys and certificates are stored locally in PEM format as defined by [RFC 7468](https://datatracker.ietf.org/doc/html/rfc7468).

The SSR does not accept DER-encoded (binary) certificates. If your Certificate Authority provides certificates in DER format, convert them to PEM before importing:

```bash
openssl x509 -inform DER -outform PEM -in certificate.der -out certificate.pem
```

## Certificate Configuration Models

The SSR supports two models for associating certificate material with the configuration. Choosing the right model depends on whether a private key must reside on the node.

### File Reference

In the file-reference model, the configuration stores a **name reference** to a certificate that is expected to exist on disk at the node. The certificate and key material itself is not embedded in the configuration.

- The certificate and key files are placed on disk through the REST API (see [Configure Certificate Management](config_custom_certs.md)).
- Configuring a file reference does **not** create the file on disk. The reference resolves once the file has been placed by the API.
- The configuration and the on-disk file can be put in place in either order; what matters is that both are present before the certificate is expected to be active.

Use the file-reference model for identity certificates whose private key was generated and retained on the node, such as ESKM peering certificates and the certificates used by Secure Conductor Onboarding.

### Content-Based

In the content-based model, the PEM content is embedded directly in the SSR configuration.

- The certificate material is distributed automatically through normal configuration workflows.
- No file needs to be placed on disk out of band.

Use the content-based model for trust anchors — such as `trusted-ca-certificate` objects — where no private key is required on the node and easy distribution through configuration is convenient.

### Choosing a Model

| Scenario | Recommended Model |
| --- | --- |
| Identity certificate whose private key was generated on the node (ESKM, SCO). | File reference. |
| Trusted CA certificate used to establish a chain of trust. | Content-based. |

Mixing the two models is not harmful, but using each model for its intended purpose keeps deployments easier to reason about.

## Key Storage on the SSR

Certificate private keys are generated locally on each node and stored at `/etc/128technology/pki/`. The private key is never transmitted through configuration and never leaves the node on which it was generated.

- File permissions restrict access to the key material to the SSR process.
- [Configuration Integrity](concepts_config_integrity.md) provides data-at-rest protection for the configuration.
- Because the private key already resides on disk, the file-reference model is the natural fit for identity certificates: the API places the signed certificate alongside the key that generated its CSR.

## Operational Best Practices

Follow these practices to keep certificate lifecycles manageable and to avoid the most common deployment problems.

- **Use the REST APIs to place certificates on disk.** Manually copying PEM files onto a node with `scp` or `cp` bypasses certificate validation, audit-event generation, and key-to-certificate matching. The system then has no record of the certificate and cannot manage its lifecycle.
- **Place the file before the certificate is expected to be active.** A file reference and its on-disk file can be configured in either order, but both must be in place before the certificate is used.
- **Use end-entity certificates for peering identity.** A certificate marked with `CA:TRUE` (an intermediate or root CA certificate) must never be used as a peering identity certificate. A peering certificate identifies a router, not an authority. See [Certificate Requirements and Validation](cert_validation_requirements.md).
- **Provision certificates for every node.** In a High Availability pair, each node generates its own private key and manages its own certificate. Repeat the provisioning workflow for every router and every node. See [Enhanced Security Key Management](sec_enhanced_key_mgmt.md).

## Inspecting Certificates with OpenSSL

Before importing certificate material, you can inspect and validate it locally with OpenSSL. The following commands are useful when preparing certificates for the SSR.

| Task | Command |
| --- | --- |
| Inspect a certificate. | `openssl x509 -in cert.pem -text -noout` |
| Inspect a CSR. | `openssl req -in csr.pem -text -noout` |
| Verify a certificate against a CA chain. | `openssl verify -CAfile ca.pem cert.pem` |
| Convert a DER certificate to PEM. | `openssl x509 -inform DER -outform PEM -in cert.der -out cert.pem` |
| Check a private key. | `openssl rsa -check -in key.pem` |
| View a DER-encoded CRL. | `openssl crl -in file.crl -inform DER -text -noout` |
| Generate an ECC private key. | `openssl ecparam -genkey -name prime256v1 -noout -out private.pem` |
| Derive the public key from a private key. | `openssl ec -in private.pem -pubout -out public.pem` |
| Generate a CSR from an existing key. | `openssl req -new -key private.pem -out request.csr -subj "/CN=router1.example.com/O=Acme Corp"` |

## Where to Next

- [Configure Certificate Management](config_custom_certs.md) — the end-to-end REST API workflow for provisioning ESKM peering certificates.
- [Certificate Requirements and Validation](cert_validation_requirements.md) — accepted algorithms, key sizes, extensions, and the difference between config-time and runtime validation.
- [Enhanced Security Key Management](sec_enhanced_key_mgmt.md) — peer-to-peer, certificate-based key exchange for Secure Vector Routing.
- [Certificate-based Security Encryption](sec-cert-based-encrypt.md) — provisioning, CRL management, and certificate replacement.
- [Signing and Importing Webserver Certificates](config_webserver_certs.md) — securing the administrative GUI.
- [Adding a Trusted Certificate](howto_trusted_ca_certificate.md) — managing operating-system-level CA trust for services such as LDAP.
