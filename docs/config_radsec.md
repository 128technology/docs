---
title: Configuring RADUIS over TLS
sidebar_label: Configuring RADIUS over TLS
---

RADIUS over TLS is designed to provide secure communication of RADIUS requests using the Transport Secure Layer (TLS) protocol. RADIUS over TLS, also known as RADSEC, redirects regular RADIUS traffic to remote RADIUS servers connected over TLS. RADSEC allows RADIUS authentication, authorization, and accounting data to be passed safely across untrusted networks.

In this section:
- [Configuring RADSEC](#configuring-radsec)
- [Signing and Importing Webserver Certificates](#signing-and-importing-webserver-certificates)
- [Syslog Over TLS](#configuring-syslog-over-tls)

## Configuring RADSEC

Use the following information to configure RADIUS over TLS (RADSEC).

#### 1. Configure the RADSEC server. 

The following configuration example will add a radius server named `radsec`

```
admin@t327-dut1.cond# configure authority radius-server radsec
admin@t327-dut1.cond (radius-server[name=radsec])# address 172.18.5.224
admin@t327-dut1.cond (radius-server[name=radsec])# port 2083
admin@t327-dut1.cond (radius-server[name=radsec])# protocol tls
admin@t327-dut1.cond (radius-server[name=radsec])# account-creation manual
admin@t327-dut1.cond (radius-server[name=radsec])# ocsp strict
admin@t327-dut1.cond (radius-server[name=radsec])# server-name t327-dut1.openstacklocal
admin@t327-dut1.cond (radius-server[name=radsec])# top
``` 

#### 2. Configure the trusted CA certificate. 

The trusted CA certificate is necessary to validate the incoming client certificate. Certificates are pasted in as a multi-line config. 

Create a certificate root named `ca_root` and paste the certificate file content into the command:

```
admin@conductor-node-1.Conductor# config authority trusted-ca-certificate ca_root
admin@conductor-node-1.Conductor (trusted-ca-certificate[name=ca_root])# content
Enter plain for content (Press CTRL-D to finish):
<paste-cert-file-content-here>
```

#### 3. Configure a client certificate to be used for the RADIUS client.

Repeat the previous step to create a client certificate named `radsec`.

```
admin@conductor-node-1.Conductor# config authority client-certificate radsec
admin@conductor-node-1.Conductor (client-certificate[name=radsec])# content
Enter plain for content (Press CTRL-D to finish):
<paste-cert-file-content-here>
```

#### 4. Configure the RADIUS server at the Authority level to use the configured client certificate.

Associate the previously configured `radsec` client certificate to the radius server running on a specified node.

`configure authority router cond node t327-dut1 radius client-certificate-name radsec`

Note that the client certificate selected should match the appropriate IP/hostname of the node as seen from the RADIUS server.

`validate` and `commit` the changes. 

#### 5. Create a RADIUS User

Create a remotely authenticated RADIUS user. In this example we create user `test1`.

```
*admin@conductor-node-1.Conductor# create user test1
Full Name: test1
Authentication Type (remote or local): remote
Roles (space separated): admin
Enabled (true or false): true
Account 'test1' successfully created
```

When the user logs into the node `t327-dut1` via ssh, the authentication request is sent via RADSEC to the server `172.18.5.224` and the user is authenticated. 

## Signing and Importing Webserver Certificates

Imported webserver certificates are validated against trusted certificates configured using `trusted-ca-certificate`. Use the following information to create, sign, and import the certificates to the webserver.

### Configure a Trusted Certificate

Certificates are pasted in as a multi-line config. 

Configure a certificate root named `ca_root` and paste the certificate file content into the command:

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

After the certificate is signed and returned, it is imported into the SSR for use by the webserver using the `import certificate webserver`  command. It is validated against any trusted certificates entered using `trusted-ca-certificate`. 

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
The imported certificate will be validated against the configured trusted root certificates and checked for insecure algorithms and invalid configurations. Bypassing or disabling these validations will result in a non-compliant configuration. 

## Configuring Syslog Over TLS

Syslog over TLS allows the secure transportation of system log messages from the syslog client to the syslog server. TLS uses certificates to authenticate and encrypt the communication.

Use the following information to configure Syslog transport over TLS.

#### 1. Configure the trusted CA certificate. 

The trusted CA certificate is necessary to validate the incoming client certificate. Certificates are pasted in as a multi-line config. 

Create a certificate root named `ca_root` and paste the certificate file content into the command:

```
admin@conductor-node-1.Conductor# config authority trusted-ca-certificate ca_root
admin@conductor-node-1.Conductor (trusted-ca-certificate[name=ca_root])# content
Enter plain for content (Press CTRL-D to finish):
<paste-cert-file-content-here>
```

#### 2. Configure a client certificate to be used for the syslog client.

Repeat the previous step to create a client certificate named `syslog`.

```
admin@conductor-node-1.Conductor# config authority client-certificate syslog
admin@conductor-node-1.Conductor (client-certificate[name=syslog])# content
Enter plain for content (Press CTRL-D to finish):
<paste-cert-file-content-here>
```

#### 3. Configure the syslog server at the Authority level to use the configured client certificate.

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

To complete the process, `validate` and `commit` the changes. After the confiuration changes have been committed, the SSR will send the syslog to 192.168.1.100:6514 over TLS.
When the user logs into the node `t327-dut1` via ssh, the authentication request is sent via RADSEC to the server `172.18.5.224` and the user is authenticated. 
