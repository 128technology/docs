---
title: Custom Certificates
sidebar_label: Custom Certificates
---

#### Version History

| Release | Modification                |
| ------- | --------------------------- |
| 7.0.0   | Certificate-based Security Encryption support added. |

Security is a critical component of SD-WAN products in today’s world. The effectiveness of any security strategy relies on the strength of the security algorithm and how related information is exchanged between participants.

The SSR uses a Public Key Infrastructure (PKI) to validate the installed certificates and the authenticity of devices within the network, as well as a peer-to-peer security key exchange between SSRs. The result is a design that creates maximum scale, avoids mid-network re-encryption, and provides the ability to rotate keys as required.

## Certificate Management 

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

- When rekeying is enabled on a newly initialized router that does NOT have a valid, signed certificate, an alarm is generated. A valid certificate must be obtained from a Certificate Authority before valid secure communication can take place. When a valid certificate is present, the router will create an elliptic-curve public/private key pair (see [RFC8422]). 

- Contained within the SVR certificate is a router identifier, which must match the identifier of the router in the peer configuration. This router identifier is a UUID and guaranteed to be unique per node, even across RMAs.

- The public key is used to create an X.509 certificate signing request (CSR) with the common name field set to the router's UUID. A certificate signing request is initiated through a secure connection to a configured Certificate Authority (CA). The CA digitally signs the CSR and returns it to the requesting router. Certificates and Public Keys are stored locally on each router in PEM format defined by RFC7468. 

## Provisioning Process

Use this procedure to provision a customer provided certificate for use with SVRv2.

### Prerequisites

A configured, functioning Certificate Authority (CA) is required.

### Install the trusted CA certificate(s)

In order to provision a certificate on the system, the public certificate of the Certificate Authority as well as all certificates up the chain to the root of trust. To accomplish this, the user must obtain these certificates and append them into a single file.  As an example, here is what that might look like:

```
-----BEGIN CERTIFICATE-----
MIIEYTCCAsmgAwIBAgIUWfoRok+PTcDoz5BRhnuOIE28wlwwDQYJKoZIhvcNAQEL
BQAwWjELMAkGA1UEBhMCREUxETAPBgNVBAoMCE9wZW5YUEtJMQwwCgYDVQQLDANQ
S0kxKjAoBgNVBAMMIU9wZW5YUEtJIERlbW8gSXNzdWluZyBDQSAyMDI1MDUwNzAe

<edited for security>

sWBdyw2UTZuusUGqELN4UpmYryJkDt6PD9kAMLl/Eawx26ztQbwUpj/vxeLPpc7i
V0fDiiXyWtCeiorR1ipXKMCik13N
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
MIIErjCCAxagAwIBAgIUWfoRok+PTcDoz5BRhnuOIE28wlswDQYJKoZIhvcNAQEL
BQAwJDEiMCAGA1UEAwwZT3BlblhQS0kgUm9vdCBDQSAyMDI1MDUwNzAeFw0yNTA1
MDcyMDAzMDhaFw0zMDA1MDkyMDAzMDhaMFoxCzAJBgNVBAYTAkRFMREwDwYDVQQK
DAhPcGVuWFBLSTEMMAoGA1UECwwDUEtJMSowKAYDVQQDDCFPcGVuWFBLSSBEZW1v

<edited for security>

bVeO0DwOwawBo0O47NaOLhLKWC1jkMsfxqbDj7c3tSY7xDcahzls8KVDNJVnS133
pVnxbgovybrE8JRlOyXgr1lCmMKTiLeza8aFTsA6b+xIsT316D1d5IhlKIM68T7Z
zxK3jfn0veR9W1e2WOgo22jDIx67nkPS54skZEO1XvuOBLmKB/74GUFVZ5+OPxxW
QQwlZqZrgeqUSAZ9gvOv683ouzXCI4+vuATvoYBDe9j9kIPQ1tt32V0YZ790Wo4U
PxE=
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
MIIENjCCAp6gAwIBAgIUY6hJlss7siI3SHZzPH9YiyolzWIwDQYJKoZIhvcNAQEL
BQAwJDEiMCAGA1UEAwwZT3BlblhQS0kgUm9vdCBDQSAyMDI1MDUwNzAeFw0yNTA1
MDcyMDAzMDhaFw0zNTA1MTAyMDAzMDhaMCQxIjAgBgNVBAMMGU9wZW5YUEtJIFJv

<edited for security>

ms1+sB5RcH9jGNVGSEQnz8kcgX+W+GEKqk1m3JswfOAe68BpiakqKTN5GA3PdbQM
dw/lPbQR6X0pLegSikirHeKVX0UHyDZkOv8=
-----END CERTIFICATE-----
```

Once this file has been obtained, its contents must be placed into the SSR configuration at the authority level.  Here is an example:

```
admin@conductor-east-1.RTR_EAST_CONDUCTOR# config authority
admin@conductor-east-1.RTR_EAST_CONDUCTOR (authority)# trusted-ca-certificate svrv2-root-of-trust
admin@conductor-east-1.RTR_EAST_CONDUCTOR (trusted-ca-certificate[name=svrv2-root-of-trust])# content
Enter plain for content (Press CTRL-D to finish):
<paste the contents here>
admin@conductor-east-1.RTR_EAST_CONDUCTOR (trusted-ca-certificate[name=svrv2-root-of-trust])# validation-mode warn
admin@conductor-east-1.RTR_EAST_CONDUCTOR (trusted-ca-certificate[name=svrv2-root-of-trust])# top
admin@conductor-east-1.RTR_EAST_CONDUCTOR# commit
Are you sure you want to commit the candidate config? [y/N]: y
⚠ Validating, then committing...
Configuration committed
```

#### Additional Information

The name of the trusted-ca-certificate can be anything the user would like, `svrv2-root-of-trust` was chosen for illustration purposes.

`validation-mode warn` is there in case there are any issues discovered with the certificate.  We will allow the certificate chain to be committed, but we will warn the user about those issues.  If the `validation-mode` is set to `strict` instead, we will not allow the certificate-chain to be committed.

### Authenticate to Use REST

In order to call into the SSRs REST interfaces, a user must authenticate first. This is accomplished by logging in, and storing the bearer token.

Here is an example:

```
curl 'https://10.27.35.89/api/v1/login' --compressed -k -X POST \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:137.0) Gecko/20100101 Firefox/137.0' \
  -H 'Accept: */*' \
  -H 'Accept-Language: en-US,en;q=0.5' \
  -H 'Accept-Encoding: gzip, deflate, br, zstd' \
  -H 'Referer: https://10.27.35.89/' \
  -H 'Content-Type: application/json' \
  -H 'X-Request-Id: MmUzMGMzNj' \
  -H 'Origin: https://10.27.35.89' \
  -H 'Connection: keep-alive' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'Priority: u=0' \
  -H 'TE: trailers' \
  --data-raw '{"username":"admin","password":"TheAdminPassword1234","application":"GUI"}'
```

Conductor Response:

```
{"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJhZG1pbiJdLCJzY29wZXMiOlsiY29uZmlndXJlIiwic2hvdy1jb21tYW5kcyJdLCJjYXBhYmlsaXRpZXMiOlsiY29uZml

<edited for security>

xueOlHpcNYuZlygk_-VuLPJ_gWRADyj4HjlTibt_TzMvrvv_b7V37uFHgdiR_sfaj2DOGj4T4sRz6dZHW_ojv9pPmjwFJsceqXViYbMYkNQfyaXGmp5vb8jH47fYiay02xcC-qZ18ICMuQ0ozCZ2mI9PnlS50u1jnUhwgf24vfgJsJkZOg6Q4vGxBmRtKcG49Nc5HQOhUWfUctmT5e7cvVfZw"}
```

Store the value of the token in a file called token.txt for use later.

### Issue a private-key creation request to the SSR

:::important
It is necessary for all of the following REST APIs to use the name custom_ssr_peering in order for this private key and eventual certificate to be visible and usable by SVRv2 in 7.0. This is a reserved name that SVRv2 looks for. This is a restriction ONLY on 7.0 and will be much more flexible in 7.1+
:::

One of the main goals of this workflow is to ensure that the private key of the SSR never leaves the SSR. In order to do that, we need to instruct the SSR to create a private key. To do this, we need to give the SSR some details about what algorithm it should use, how big the key size should be, and what the key should be named. Create the following file (updated to the customers algorithm/key size preference):

**key_request.json**

```
{
    "name": "custom_ssr_peering",
    "algorithm": "RSA",
    "rsa_key_size": "2048"
}
```

Now that we have the key request details ironed out, we can issue the request:

```
curl -k -X POST https://10.27.35.89/api/v1/private-key
  -H "Content-Type: application/json"
  -H "Authorization: Bearer $(cat token.txt)"
  -d @key_request.json
```

This should result in a 200 OK.  Once done, the customer can verify that the key was created by logging on to the SSR, dropping into the shell and ensuring that /etc/128technology/pki/custom_ssr_peering.key exists on disk.

### Issue a request to create a certificate-signing-request to the SSR

In order to create a signed certificate by the CA for the SSR, the CA will need a certificate-signing-request.  We instruct the SSR to create one with the values we would like, like the common-name and then  have the SSR sign the request with its private-key.  First, lets create a file that contains the body of the CSR-request, again taking note to use the same custom_ssr_peering name as above:

**csr_request.json**

```
{
    "name": "custom_ssr_peering",
    "common_name": "SSR_12345679"
}
```

There are many more available details that can be placed into the request, but this is the bare minimum.  Once we have this file, we can issue the CSR request to the SSR:

```
curl -k -X GET https://10.27.35.89/api/v1/certificate-request     
  -H "Content-Type: application/json"    
  -H "Authorization: Bearer $(cat token.txt)"    
  -d @csr_request.json
```

The SSR will return:

```
{
  "csr": "-----BEGIN CERTIFICATE REQUEST-----
MIICgTCCAWkCAQAwFzEVMBMGA1UEAwwMMTkyLjE2OC4xLjI1MIIBIjANBgkqhkiG

<edited for security>

0mAvmOoyY3Tmzf4ydMin57/7Cmgt4wpJMHUxJCSx/7c3YwDNHlsQPkMi4y4WPerl
PaH00Oujf4Jj+8EZgzYAACPQUJRW
-----END CERTIFICATE REQUEST-----"
}
```

The customer can take this certificate signing request to the CA and have it issue a certificate.

### Ingest the certificate

With that certificate in hand, we can instruct the SSR to ingest the certificate.  As usual, we need to associate the certificate with the name we used in the past two API calls, so we’ll create a json file for the body again:

**certificate.json**

```
{
    "name": "custom_ssr_peering",
    "certificate": "-----BEGIN CERTIFICATE-----
MIIF3DCCBESgAwIBAgIKAf9HQjJKSQd1lTANBgkqhkiG9w0BAQsFADBaMQswCQYD
VQQGEwJERTERMA8GA1UECgwIT3BlblhQS0kxDDAKBgNVBAsMA1BLSTEqMCgGA1UE

<edited for security>

NL9HxKRhLXhOFLKgAzXA+PmWEdLbqY19QMLVkPERHk9P90o1lZVqajf8iLMj8jbf
aEJN1Q20LWTsBk4vZDp4QtdgPimnp/dR8ZNV2aPmyelIx29cnkALu5/i7WhfRDN7
nN+SyOi2yA4nuorapmprew==
-----END CERTIFICATE-----"
}
```

This should result in a 200OK.  Once done, the customer can verify that the certificate was ingested by logging on to the SSR, dropping into the shell and ensuring that /etc/128technology/pki/custom_ssr_peering.pem exists on disk.

SVRv2 should now be able to use the private key and certificate.







