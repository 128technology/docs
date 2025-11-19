---
title: Certificate-based Security Encryption
sidebar_label: Certificate-based Security Encryption
---
#### Version History

| Release | Modification                | 
| ------- | --------------------------- | 
| 7.1.0   | Certificate-based Security Encryption support added. | 

In addition to Enhanced Security Key Management, the SSR offers certificate based security encryption to encrypt, validate, and exchange certificates between devices within the network. 

## Certificate Management 

Certificate management allows you to provision a certificate for use with Enhanced Security Key Management. There are four steps to provision a certificate.

1. Instruct the SSR to generate a private key.

2. Instruct the SSR to create and return a CSR using the above key.

3. Send the CSR to the CA and have it issue a certificate.

4. Instruct the SSR to import the certificate.

Before the certificate is accepted, the following three validity checks take place upon importing a certificate:

- Ensure that there is no private key accompanying the certificate.

- Parse the certificate and then validate it (dates/roles/other restrictions, etc.).

- Check the certificate against the known revoked certificates (CRL).

If the above three checks pass, then the certificate is accepted and imported. 

### Certificate Security

The Certificate Revocation List (CRL) Manager handles the discovery, fetching, and periodic updates to CRLs. From this process a list of all known revoked certificates from all CRL sources is created, and the master list is published to disk.

The following are some details of certificate security.

- Periodic revocation checks of the base certificate are performed based on the configuration defaults or user configured timelines. 

- When a certificate is configured to link to a certificate on disk that does not exist, an alarm is generated. A valid certificate must be obtained from a Certificate Authority before secure communication can take place.  

## Certificate Revocation List

Managing the Certificate Revocation List (CRL) includes the discovery, fetching, and periodic updates to CRLs. The SSR can be configured to either dynamically learn revoked and expired certificates and add them to the local CRL, or have the location or locations of the CRL assigned and poll that location at set intervals. The lists of known valid and revoked certificates are gathered and saved locally. The list is then shared with the configured routers.

If the CRL cannot be retrieved, an alarm will fire and persist until such time as that CRL can be retrieved. 

### Configuration

There are two configuration parameters, an optional list of CRL URLs to fetch updates, and the polling interval for those CRL URLs. 

```
configure authority
	certificate-revocation-list <url> 
		polling-interval 24hrs
		backoff-interval 60sec
```

- URL: Enter one or more URLs where CRLs are hosted.
- `polling-interval`: Frequency in hours at which to fetch CRLs. Default is 24.
- `backoff-interval`: Delay in seconds to apply to the polling-interval. Default is 60.

## Provisioning Process

Use this procedure to provision a certificate for use with Enhanced Security Key Management.

### Prerequisites

A configured, functioning Certificate Authority (CA) is required.

### Install the Trusted CA Certificate

Installing a trusted CA certificate on the SSR uses the existing functionality as described in [Adding a Trusted Certificate](howto_trusted_ca_certificate.md).

In order to provision a certificate on the system, install the public certificate of the Certificate Authority, as well as all certificates up the chain to the root of trust. To accomplish this, the user must obtain these certificates and append them into a single file. For example:

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

Once this file has been obtained, the contents are placed into the SSR configuration at the authority level:

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

The name of the `trusted-ca-certificate` should be easily identifiable; `svrv2-root-of-trust` was chosen for illustration purposes.

The setting `validation-mode warn` is configured in cases where issues are discovered with the certificate. The certificate chain is committed, but warnings are generated for those issues. If the `validation-mode` is set to `strict` the certificate-chain is not committed.

### Authenticate to Use REST

In order to call into the SSRs REST interfaces, a user must authenticate first. This is accomplished by logging in, and storing the bearer token.

**Example:**

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

**Conductor Response:**

```
{"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJhZG1pbiJdLCJzY29wZXMiOlsiY29uZmlndXJlIiwic2hvdy1jb21tYW5kcyJdLCJjYXBhYmlsaXRpZXMiOlsiY29uZml

<edited for security>

xueOlHpcNYuZlygk_-VuLPJ_gWRADyj4HjlTibt_TzMvrvv_b7V37uFHgdiR_sfaj2DOGj4T4sRz6dZHW_ojv9pPmjwFJsceqXViYbMYkNQfyaXGmp5vb8jH47fYiay02xcC-qZ18ICMuQ0ozCZ2mI9PnlS50u1jnUhwgf24vfgJsJkZOg6Q4vGxBmRtKcG49Nc5HQOhUWfUctmT5e7cvVfZw"}
```

Store the value of the token in a file called `token.txt` for use later.

### Issue a Private-key Creation Request

The goal of this workflow is to ensure that the private key of the SSR never leaves the SSR. To do so, we need to instruct the SSR to create a private key. To accomplish this, we provide the SSR some details, including:

- what algorithm it should use, 
- how big the key size should be, and 
- what the key should be named. 

:::note
The name must be the same across key request, the certificate signing request, and certificate ingestion.
:::

Create the following file (updated to the customers algorithm/key size preference):

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

Upon success, you can verify that the key was created by logging on to the SSR, `ssh` into a linux shell, and ensuring that `/etc/128technology/pki/custom_ssr_peering.key` exists on disk.

### Issue a `certificate-signing-request`

In order to create a signed certificate by the CA for the SSR, the CA needs a `certificate-signing-request`. Instruct the SSR to create the request using the values provided; at a minimum the `name` and `common-name`. The SSR must sign the request with its private-key.

1. Create a file that contains the body of the CSR-request. At a minimum this must include the name `custom_ssr_peering`, and the common name:

**csr_request.json**

```
{
    "name": "custom_ssr_peering",
    "common_name": "SSR_12345679"
}
```

This example represents the minimum requirements. Any of the following additional details may be added to the request:

- country_name (string, optional): The country name.
- state_province_name (string, optional): The state or province name.
- locality_name (string, optional): The locality name.
- organization_name (string, optional): The organization name.
- organizational_unit_name (string, optional): The organizational unit name.
- email_address (string, optional): The email address.
- algorithm (string): The cryptographic algorithm family to use when generating the private key. Acceptable options are: (RSA, ECC)
- rsa_key_size (integer, optional): The RSA key size. Only valid when algorithm is set to “RSA”. Valid key sizes are any multiple of 256 between 2048 and 4096.
- ecc_curve (string, optional): The ECC curve to use. Only valid when algorithm is set to “ECC”.Valid curves are: (SECP256R, SECP384R1, SECP521R1)
- validity_period (integer, optional): The validity period in days.

2. Issue the CSR request to the SSR:

```
curl -k -X GET https://10.27.35.89/api/v1/certificate-request     
  -H "Content-Type: application/json"    
  -H "Authorization: Bearer $(cat token.txt)"    
  -d @csr_request.json
```

The SSR returns the following certificate request:

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

Provide the certificate signing request to the CA. 

### Ingest the Certificate

When the signed certificate is returned, instruct the SSR to ingest the certificate. The certificate must be associated with the name used in the two earlier API calls. Create the following json file:

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

Once the certificate is successfully ingested, verify that the certificate was accepted.

1. `ssh` to the SSR. 
2. Log in as the root user: `sudo su`.
3. Verify that `/etc/128technology/pki/custom_ssr_peering.pem` exists on disk.
  `ls -l /etc/128technology/pki/custom_ssr_peering.pem`

### Configure the Certificate

**need pcli output from Mike

## Certificate Replacement or Revocation

When a certificate is revoked, expired, or invalid, the SSR generates an alarm. Based upon the SSR configuration, it will either `fail-soft` (the default behavior) or `fail-hard`.
**restate what this means for just the certificates

- `fail-soft` results in a notification that the certificate is no longer valid and that appropriate action must be taken.

- `fail-hard` sends a notification that the certificate is no longer valid, and removes all peering relationships. The peer connection is severed and the device is prevented from participating in SVR.

### Expiring Certificate

Expiring certificates will generate the following alarms.

- Within a month; Minor alarm. 
- Within a week; Major alarm. 
- Currently expired, revoked, or otherwise invalid; Critical alarm. 

When a router's certificate is about to expire or needs to be replaced, a new certificate can be added to the system using the [installation procedure](howto_trusted_ca_certificate.md). Once the new certificate file has been loaded into the system, an event is triggered to restart the peer authentication procedure.

**existing cert about to expire, how to get a new one


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
**Mike will verify this - probably not in the software

<!---### Show Stats Commands 

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

#### Peer Certificate Event Counters - SVRv2

`show stats security peer certificate expired` 
`show stats security peer certificate invalid` 
`show stats security peer certificate revoked` 
--->