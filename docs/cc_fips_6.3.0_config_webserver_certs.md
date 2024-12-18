---
title: Signing and Importing Webserver Certificates
sidebar_label: Signing and Importing Webserver Certificates
---

Imported webserver certificates are validated against trusted certificates configured using `trusted-ca-certificate`. Use the following information to create, sign, and import the certificates to the webserver.

### Configure a Trusted Certificate

Certificates are pasted in as a multi-line config. 

Configure a root certificate named `ca_root` and paste the certificate file content into the command:

```
admin@conductor-node-1.Conductor# config authority trusted-ca-certificate ca_root
admin@conductor-node-1.Conductor (trusted-ca-certificate[name=ca_root])# content
Enter plain for content (Press CTRL-D to finish):
<paste-cert-file-content-here>
```

### Generate the Signing Request

Use the `create certificate request webserver` command to generate the certificate signing request.

```
admin@t327-dut1.cond# create certificate request webserver
Country name (2 letter code): US
State or province name (full name): Massachusetts
Locality name (eg: city): Westford
Organization name (eg: company): Juniper
Organization unit (eg: engineering): engineering
Common name: www.router.com
Email address: bob@juniper.net
Subject Alternative Name - DNS (fully qualified domain name): www.router.com
Subject Alternative Name - IP Address: 1.1.1.1

Request successfully generated:

-----BEGIN CERTIFICATE REQUEST-----
MIIDLDCCAhQCAQAwgZkxFzAVBgNVBAMMDnd3dy5yb3V0ZXIuY29tMQswCQYDVQQG
EwJVUzERMA8GA1UEBwwIV2VzdGZvcmQxEDAOBgNVBAoMB0p1bmlwZXIxFDASBgNV
... <text removed for brevity>
.
.
.
-----END CERTIFICATE REQUEST-----
```

### Import the Certificate

After the certificate is signed and returned, it is imported into the SSR for use by the webserver using the `import certificate webserver` command. It is validated against any trusted certificates entered using `trusted-ca-certificate`. 

The following example shows a valid certificate being imported:

```
admin@t327-dut1.cond# import certificate webserver
Enter the end point certificate in PEM format (Press CTRL-D to finish):
-----BEGIN CERTIFICATE-----
MIIDHTCCAgWgAwIBAgICL/AwDQYJKoZIhvcNAQELBQAwDzENMAsGA1UEAwwEMTI4
VDAiGA8yMDI0MDYwNjEyMzIzMVoYDzIwMjUwNjA3MTIzMjMxWjAPMQ0wCwYDVQQD
...
RaIliPRAdN85EXDiAP68ytg5D2ZzxCpmRvj4AiFI3JOc
-----END CERTIFICATE-----

-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCo4PCT4Wp89t5P
53ZJtfgKwdV/CfAi3uXAfWmdluKlXjarlgTc6rgX8wGNSRj5/AajEUU6Z68DaejR
...
KBs2Hz/E/goCvyEqNaJOix+l
-----END PRIVATE KEY-----
                          
admin@t327-dut1.cond# import certificate webserver
Enter the end point certificate in PEM format (Press CTRL-D to finish):
-----BEGIN CERTIFICATE-----
MIIDHTCCAgWgAwIBAgICL/AwDQYJKoZIhvcNAQELBQAwDzENMAsGA1UEAwwEMTI4
VDAiGA8yMDI0MDYwNjEyMzIzMVoYDzIwMjUwNjA3MTIzMjMxWjAPMQ0wCwYDVQQD
...
RaIliPRAdN85EXDiAP68ytg5D2ZzxCpmRvj4AiFI3JOc
-----END CERTIFICATE-----

-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCo4PCT4Wp89t5P
53ZJtfgKwdV/CfAi3uXAfWmdluKlXjarlgTc6rgX8wGNSRj5/AajEUU6Z68DaejR
...
KBs2Hz/E/goCvyEqNaJOix+l
-----END PRIVATE KEY-----
                          
✔ Importing...
Certificate imported successfully
Would you like to add the certificate to your configuration? [y/N]: y
Which router is this certificate for? (Select all if it applies to the entire authority) [all]: all
% Warning:
1. certificate contains the following issues: does not have the extendKeyUsage extension


    config
        authority
            client-certificate webserver
                content

2. certificate contains the following issues: does not have the extendKeyUsage extension


    config
        authority
            client-certificate conductor-webserver
                content

Certificate imported successfully
Would you like to clean up the temporary certificate and key files? [Y/n]: Y
```

The following example shows an invalid self-signed certificate being imported:

```
admin@t327-dut1.cond# import certificate webserver
Enter the end point certificate in PEM format (Press CTRL-D to finish):
-----BEGIN CERTIFICATE-----
MIIDHTCCAgWgAwIBAgICL/AwDQYJKoZIhvcNAQELBQAwDzENMAsGA1UEAwwEMTI4
VDAiGA8yMDI0MDYwNjEyMzIzMVoYDzIwMjUwNjA3MTIzMjMxWjAPMQ0wCwYDVQQD
...
RaIliPRAdN85EXDiAP68ytg5D2ZzxCpmRvj4AiFI3JOc
-----END CERTIFICATE-----

-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCo4PCT4Wp89t5P
53ZJtfgKwdV/CfAi3uXAfWmdluKlXjarlgTc6rgX8wGNSRj5/AajEUU6Z68DaejR
...
KBs2Hz/E/goCvyEqNaJOix+l
-----END PRIVATE KEY-----
                                                                                                                                                                                                                                                                                 
⚠ Importing...
certificate contains the following issues: certificate is self-signed
/usr/lib/128technology/unzip/pcli/runfiles/pypi__36__cryptography_40_0_2/cryptography/x509/base.py:576: CryptographyDeprecationWarning: Parsed a negative serial number, which is disallowed by RFC 5280.
  return rust_x509.load_pem_x509_certificates(data)
Could not validate certificate chain against a trusted anchor.
Would you like to import anyways? [y/N]: y
Certificate imported successfully
```
The imported certificate is validated against the configured trusted root certificates and checked for insecure algorithms and invalid configurations. Bypassing or disabling these validations will result in a non-compliant configuration. 

