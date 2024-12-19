---
title: Syslog Over TLS
sidebar_label: Syslog Over TLS
---

Syslog over TLS allows the secure transportation of system log messages from the syslog client to the syslog server. TLS uses certificates to authenticate and encrypt the communication.

## Syslog over TLS Configuration - Generate Certificate

Use the following examples to generate a client certificate for use on the device. 

#### 1. Generate the Signing Request

Use the `create certificate request client` command to generate the signing request.

```
admin@conductor-node-1.Conductor# create certificate request client syslog
Country name (2 letter code): US
State or province name (full name): MA
Locality name (eg: city): Westford
Organization name (eg: company): Juniper
Organization unit (eg: engineering):
Common name: dut1
Email address:
Subject Alternative Name - DNS (fully qualified domain name):
Subject Alternative Name - IP Address:
% Error: Could not create request: Subject Alternative Name (DNS or IP address) is required
admin@conductor-node-1.Conductor# create certificate request client syslog
Country name (2 letter code): US
State or province name (full name): MA
Locality name (eg: city): Westford
Organization name (eg: company): Juniper
Organization unit (eg: engineering):
Common name: dut1
Email address:
Subject Alternative Name - DNS (fully qualified domain name): dut1
Subject Alternative Name - IP Address: 10.27.32.203

Request successfully generated:

-----BEGIN CERTIFICATE REQUEST-----
MIIC1jCCAb4CAQAwTjENMAsGA1UEAwwEZHV0MTELMAkGA1UEBhMCVVMxETAPBgNV
BAcMCFdlc3Rmb3JkMRAwDgYDVQQKDAdKdW5pcGVyMQswCQYDVQQIDAJNQTCCASIw
DQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJ8WwHXP/z49sFsxpN5L9THO5y8N
f/as8Nn6XUyG86YyxcR5IYL5gKR5//EunoVjLAUCHgBqxwaUa3enhNEQS97N4Bcs
E7YygMkI7oAnHCioslB+x2Am/xKPRosh3s50fIN3mY409/byMGipfGcyNlMn8XbS
XF/zmGBI1/4aRbeqL5VMDPO+9DNRxXMgqBs2y48WanGvZeZTP5B/sSczlhOSxHnu
DxNYQ7+rZs9NpKzktCXOSA8nszHp5PNCWsa8tVNQvyhAqboTGrXQZhjZRWzg3nzS
.
.
.
wp4dOHuKsnf+ZsfNK4AGUYdh3qEa1/xJxyug1R3AGjItbkUzbJpR6hp7B0YYWV87
QALMf6F0SKBDXg++
-----END CERTIFICATE REQUEST-----
```

#### 2. Configure the Trusted CA Certificate 

The trusted CA certificate is necessary to validate the incoming client certificate. Certificates are pasted in as a multi-line config. 

Create a root certificate named `ca_root` and paste the certificate file content into the command:

```
admin@conductor-node-1.Conductor# configure authority trusted-ca-certificate ca_root
*admin@conductor-node-1.Conductor (trusted-ca-certificate[name=ca_root])# content
Enter plain for content (Press CTRL-D to finish):
-----BEGIN CERTIFICATE-----
MIIDlDCCAnygAwIBAgIVAJHxzhL42q7io2PBDPR+TCeBsyQgMA0GCSqGSIb3DQEB
CwUAMFExCzAJBgNVBAYTAlVTMRYwFAYDVQQIDA1NYXNzYWNodXNldHRzMREwDwYD
VQQKDAhUZXN0IEluYzEXMBUGA1UEAwwOY2EuZXhhbXBsZS5jb20wHhcNMjQxMDIy
MTYzODI1WhcNMjUxMDIyMTYzODI1WjBRMQswCQYDVQQGEwJVUzEWMBQGA1UECAwN
TWFzc2Fja/m1nIs+rY0Fs1LIyWA1kswIVGVzdCBJbmMxFzAVBgNVBAMMDmNhLmV4
YW1wbGUuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqn81ZnhT
zAPiXOdzJVRdy6GGQJKodQ89/hxZ3oHAFN/7QhknXyWnfz3heShEAw5xdL3PV230
.
.
.
qynFiqlV0UDGgH+e8hCp41Seva5vBGYvwMVHPU80rhoAsTh1BNpM1r9xbvDQs5ui
3QyeFCt/O0A=
-----END CERTIFICATE-----
```

#### 3. Import the Client Certificate

After the certificate is signed and returned, it is imported into the SSR for use by the client using the `import certificate client`  command. It is validated against any trusted certificates entered using `trusted-ca-certificate`. 

The following example shows an valid self-signed certificate being imported:

```
admin@conductor-node-1.Conductor# import certificate client syslog
Enter the end point certificate in PEM format (Press CTRL-D to finish):
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDFrn/2q4mijt14
gjmN2agDfu6sykg4OJ2NDy4IRrBYilExRJHllAndtc04rp7EQ544Z+/J/dNJrmXK
GnHvm/Rg0UdKnbFrw5aentpx3rFefdaf8nlJLW5rFH1wxDqUhE+y5q+s+8k3ESt0
9L/26OxTQP11t5Vh/BEkK5iVHLDBGyHntUvEnM5tFWL7+NvefhuZ6McvY7GPDR8c
bkuNHXlv9laeXQlI6IiiYum8waQDnJBGEx2wPTUguZJWP0YgxLinKiCDIINNEf+Y
dGqxf7I/yKn1gH+Swh0sAYn33651EaGAzjMHYhmpPVR0K9IAPbyGucK0aOriJqZ5
91wL39G5AgMBAAECggEAE2/xDSQYyG8bv7muRxBbwNw+Q6cwKrcGZtRTRmUM+ee/
zAReBCDmR3KU1zn0SoALkqhFn6rhl6EaSSEIivLeuJZbWC7hPyNgMACWohOvhQcC
.
.
.
WiYWxHz5Q4wUxV5uTJR3Jq5rzcHr1shyVDT+aFf9tyNdcLFfbziZ1y/EfAPkOOoH
jLD4SXCWbmRxHYVMn3yhqK4=
-----END PRIVATE KEY-----
 
-----BEGIN CERTIFICATE-----
MIIDpDCCAoygAwIBAgIVAL1k460IeyrQWoU82ZVHZ2asUrTuMA0GCSqGSIb3DQEB
CwUAMFExCzAJBgNVBAYTAlVTMRYwFAYDVQQIDA1NYXNzYWNodXNldHRzMREwDwYD
VQQKDAhUZXN0IEluYzEXMBUGA1UEAwwOY2EuZXhhbXBsZS5jb20wHhcNMjQxMDIy
MTYzODI4WhcNMjUwMTIwMTYzODI4WjBVMQswCQYDVQQGEwJVUzEWMBQGA1UECAwN
TWFzc2FjaHVzZXR031sTH3nuMB3r+h0uSHa1Lc0un+/xGzAZBgNVBAMMEmNsaWVu
dC5leGFtcGxlLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMWu
f/ariaKO3XiCOY3ZqAN+7qzKSDg4nY0PLghGsFiKUTFEkeWUCd21zTiunsRDnjhn
.
.
.
zTwd4+soylkHxCW2zZ50lUUqqNt1nSIcVF2V3qqxRZXZcJtN5y9+brpc9Z8eiXys
9cgLsL60tukLdwxH5S6gAw/MSm6ABYjdv
-----END CERTIFICATE-----
                                                                                                                                                                                                                                                                                
/usr/lib/128technology/unzip/pcli/runfiles/pypi__36__cryptography_40_0_2/cryptography/x509/base.py:576: CryptographyDeprecationWarning: Parsed a negative serial number, which is disallowed by RFC 5280.
  return rust_x509.load_pem_x509_certificates(data)
✔ Importing...
Certificate imported successfully
Would you like to add the certificate to your configuration? [y/N]: y
Which router is this certificate for? (Select all if it applies to the entire authority) [all]: all

Certificate imported successfully
Would you like to clean up the temporary certificate and key files? [Y/n]: Y
```

#### 4. Configure the Device to Accept the Client Certificate

Use the following example command to configure your device to accept the certificate.

` configure authority router ComboWest node combo-west radius client-certificate-name syslog`

## Syslog over TLS Configuration - Existing Certificate

Use the following information to configure Syslog over TLS using an existing certificate.

#### 1. Configure the Trusted CA Certificate. 

The trusted CA certificate is necessary to validate the incoming client certificate. Certificates are pasted in as a multi-line config. 

Create a root certificate named `ca_root_syslog` and paste the certificate file content into the command:

```
admin@conductor-node-1.Conductor# config authority trusted-ca-certificate ca_root_syslog
admin@conductor-node-1.Conductor (trusted-ca-certificate[name=ca_root_syslog])# content
Enter plain for content (Press CTRL-D to finish):
<paste-cert-file-content-here>
```

:::note
The `trusted-ca-certificate` is a list and may contain different CA roots used for different certificates. In that case, naming them all `ca_root` would not be suitable. It is recommended to choose a name that is meaningful to the user and CA, eg: `ca_root_syslog`.
:::

#### 2. Configure a Client Certificate to be used for the Syslog Client.

Repeat the previous step to create a client certificate named `syslog`.

```
admin@conductor-node-1.Conductor# config authority client-certificate syslog
admin@conductor-node-1.Conductor (client-certificate[name=syslog])# content
Enter plain for content (Press CTRL-D to finish):
<paste-cert-file-content-here>
```

#### 3. Configure the Syslog Server at the Authority level to use the configured client certificate.

The following configuration example will add a syslog server named `syslog` that will use the previously configured client certificate. 

```
*admin@t327-dut1.cond# configure authority router cond system syslog server 192.168.1.100 6514
*admin@t327-dut1.cond (server[ip-address=192.168.1.100][port=6514])# up
*admin@t327-dut1.cond (syslog)# client-certificate-name syslog
*admin@t327-dut1.cond (syslog)# protocol tls
*admin@t327-dut1.cond (syslog)# ocsp strict
*admin@t327-dut1.cond (syslog)# facility any
*admin@t327-dut1.cond (syslog)# severity info
*admin@t327-dut1.cond (syslog)# top
```

To complete the process, `validate` and `commit` the changes. After the confiuration changes have been committed, the SSR will send the syslog to `192.168.1.100:6514` over TLS.


