---
title: Certificate Requirements and Validation
sidebar_label: Certificate Requirements and Validation
---

#### Version History

| Release | Modification                |
| ------- | --------------------------- |
| 7.0.0   | Certificate management and validation support added. |

This page describes the certificate properties that the SSR enforces, how `validation-mode` affects behavior, and the differences between config-time and runtime validation.

## Accepted Cryptographic Algorithms

The SSR validates the signature algorithm used to sign each certificate in the chain. Only the following algorithms are accepted:

### RSA Signature Algorithms

| Algorithm | OID |
| --- | --- |
| SHA-256 with RSA Encryption | 1.2.840.113549.1.1.11 |
| SHA-384 with RSA Encryption | 1.2.840.113549.1.1.12 |
| SHA-512 with RSA Encryption | 1.2.840.113549.1.1.13 |

### ECDSA Signature Algorithms

| Algorithm | OID |
| --- | --- |
| ECDSA with SHA-256 | 1.2.840.10045.4.3.2 |
| ECDSA with SHA-384 | 1.2.840.10045.4.3.3 |
| ECDSA with SHA-512 | 1.2.840.10045.4.3.4 |

### RSASSA-PSS Signature Algorithms

RSASSA-PSS signatures (OID 1.2.840.113549.1.1.10) are accepted when the underlying hash algorithm is SHA-256, SHA-384, or SHA-512.

:::note
Certificates signed with SHA-1 or MD5 are rejected.
:::

## Key Requirements

### RSA Keys

- **Minimum key size:** 2048 bits
- Accepted key types: `RSA` and `RSA-PSS`

### Elliptic Curve (ECC) Keys

Only the following named curves are accepted:

| Curve | Alternate Name |
| --- | --- |
| SECP256R1 | prime256v1 (P-256) |
| SECP384R1 | P-384 |
| SECP521R1 | P-521 |

:::note
Other key types (e.g., DSA, Ed25519) are not supported and will be rejected.
:::

## Certificate Extension Requirements

The SSR enforces different extension requirements depending on the role of the certificate.

### Trusted CA Certificates (`trusted-ca-certificate`)

Certificates configured as trusted certificate authorities must meet the following requirements:

| Extension | Requirement |
| --- | --- |
| Basic Constraints | Must be present, must have `CA:TRUE`, and **must be marked critical**. |

A CA certificate where the Basic Constraints extension is present and has `CA:TRUE` but is **not marked as critical** will be rejected. This is enforced per [RFC 5280 §4.2.1.9](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.9), which states that the Basic Constraints extension on CA certificates **MUST** be marked critical.

**Example of a conforming CA certificate extension:**

```
X509v3 Basic Constraints: critical
    CA:TRUE
```

**Example of a non-conforming CA certificate extension (will be rejected):**

```
X509v3 Basic Constraints:
    CA:TRUE
```

### Client Certificates (`client-certificate`)

Client certificates used for peering are validated as leaf (end-entity) certificates:

| Property | Requirement |
| --- | --- |
| Signature Algorithm | Must be an [accepted algorithm](#accepted-cryptographic-algorithms). |
| Public Key | Must be an [accepted key type and size](#key-requirements). |

### Intermediate CA Certificates

Intermediate certificates in a chain are validated as CA certificates and must meet the same Basic Constraints requirements as [Trusted CA Certificates](#trusted-ca-certificates-trusted-ca-certificate).

## Understanding `validation-mode`

The `validation-mode` setting is available on `trusted-ca-certificate`, `client-certificate`, and router-level `client-certificate` objects. It controls the behavior of **config-time validation** (the checks that run when you commit configuration).

```
trusted-ca-certificate my-ca
    validation-mode  warn
```

| Mode | Behavior |
| --- | --- |
| `strict` (default) | Any certificate issue found during config-time validation causes the commit to **fail with an error**. The configuration is not accepted. |
| `warn` | Certificate issues found during config-time validation produce **warnings** but the commit is **allowed to proceed**. |

### What `validation-mode` Does Not Control

:::warning Important
`validation-mode` only affects config-time validation (the checks that run during `commit`). It does **not** affect runtime validation.

When certificates are used at runtime — for example, during BFD peer authentication or key exchange — the SSR performs an independent validation that always enforces all requirements regardless of the `validation-mode` setting.

This means a certificate that passes config-time validation with `validation-mode warn` may still be **rejected at runtime** if it does not meet all requirements.
:::

## Config-Time vs. Runtime Validation

The SSR validates certificates at two distinct points, and the checks performed at each point are not identical in the current release.

### Config-Time Validation (Inspector)

Config-time validation runs during `validate` and `commit` operations. It checks:

- Certificate time validity (not expired, not not-yet-valid).
- Signature algorithm is on the approved list.
- Public key type is accepted (RSA or ECC).
- Basic Constraints role (CA certificates should have `CA:TRUE`; leaf certificates should not).
- Self-signed certificate detection.
- Extended Key Usage presence.

The results of these checks are controlled by `validation-mode`:
- In `strict` mode, issues block the commit.
- In `warn` mode, issues produce warnings but the commit proceeds.

### Runtime Validation

Runtime validation occurs when certificates are actively used — for example, during BFD session establishment, key exchange, or peer authentication. Runtime validation **always enforces** the following, regardless of `validation-mode`:

- Full certificate chain verification (signature chain from leaf to trusted root).
- Certificate time validity.
- Signature algorithm allowlist.
- Public key type and minimum key size (RSA ≥ 2048 bits).
- ECC curve allowlist.
- Basic Constraints criticality (via strict X.509 conformance checking).
- Certificate Revocation List (CRL) checking, when CRLs are configured.

### Behavioral Differences

Because config-time and runtime validation are separate processes, certain edge cases may produce different outcomes:

| Scenario | Config-Time Result | Runtime Result |
| --- | --- | --- |
| CA cert with `CA:TRUE` but Basic Constraints **not critical** | May pass with `validation-mode warn` | **Rejected** — strict X.509 conformance is always enforced |
| Certificate with weak signature algorithm | Warning (`warn`) or error (`strict`) | **Rejected** |
| Expired certificate | Warning (`warn`) or error (`strict`) | **Rejected** |
| Valid, conforming certificate | Passes | Passes |

:::tip
To avoid runtime failures, ensure all certificates meet the full set of requirements documented on this page **before** importing them, even when using `validation-mode warn`. The `warn` setting is intended as a diagnostic aid, not as a way to bypass certificate requirements.
:::

## `invalid-certificate-behavior` (Runtime)

Separately from `validation-mode`, the `invalid-certificate-behavior` setting controls what happens when a peer's certificate fails **runtime** validation during BFD key exchange:

| Setting | Behavior |
| --- | --- |
| `fail-soft` (default) | A notification is generated that the certificate is no longer valid. The peer connection remains active, but appropriate action should be taken. |
| `fail-hard` | A notification is generated, and all peering relationships with the affected peer are **removed**. The peer is prevented from participating in SVR. |

This setting is configured under Enhanced Security Key Management. See [Enhanced Security Key Management](sec_enhanced_key_mgmt.md) for details.

## Generating Conforming Certificates

When requesting certificates from your Certificate Authority, ensure the following:

### For CA / Intermediate Certificates

```
X509v3 Basic Constraints: critical
    CA:TRUE
```

The `critical` flag is required. Most well-configured CAs include this by default, but some enterprise or legacy PKI systems may omit it.

### For Client / Leaf Certificates

- Include the Extended Key Usage (EKU) extension with the appropriate purpose (`TLS Web Client Authentication` or `TLS Web Server Authentication`)
- Do **not** set `CA:TRUE` in Basic Constraints
- Use an RSA key of at least 2048 bits, or an ECC key on an accepted curve

### Verifying Certificate Properties

You can inspect a certificate's properties before importing it using OpenSSL:

```bash
openssl x509 -in certificate.pem -text -noout
```

Look for the following in the output:

```
X509v3 Basic Constraints: critical
    CA:TRUE
X509v3 Key Usage: critical
    Certificate Sign, CRL Sign
X509v3 Extended Key Usage:
    TLS Web Client Authentication
```

## Troubleshooting

### Certificate Rejected at Runtime but Passed Config Commit

If a certificate was accepted during config commit (especially with `validation-mode warn`) but is rejected at runtime (e.g., BFD session fails to establish):

1. Inspect the certificate with `openssl x509 -in cert.pem -text -noout`.
2. Verify that Basic Constraints on CA certificates includes both `CA:TRUE` and the `critical` flag.
3. Verify the signature algorithm is on the [accepted list](#accepted-cryptographic-algorithms).
4. Verify the key size meets the [minimum requirements](#key-requirements).
5. Check for certificate expiration.

### Common Certificate Issues

| Issue | Symptom | Resolution |
| --- | --- | --- |
| Basic Constraints not critical on CA cert | Config commit warns or succeeds; runtime rejects. | Reissue the CA certificate with `critical` flag on Basic Constraints. |
| RSA key below 2048 bits | Rejected at both config and runtime. | Regenerate the key with at least 2048 bits. |
| SHA-1 signature | Rejected at both config and runtime. | Reissue the certificate with SHA-256 or stronger. |
| Missing Extended Key Usage | Warning during config commit or certificate import. | Reissue the certificate with the appropriate EKU. |
| Expired certificate | Warning or error at config time; rejected at runtime. | Renew the certificate. |

## See Also

- [Configure Certificate Management](config_custom_certs.md)
- [Certificate-based Security Encryption](sec-cert-based-encrypt.md)
- [Enhanced Security Key Management](sec_enhanced_key_mgmt.md)
- [Adding a Trusted Certificate](howto_trusted_ca_certificate.md)
- [Signing and Importing Webserver Certificates](config_webserver_certs.md)
