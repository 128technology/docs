---
title: Configuring RADUIS over TLS
sidebar_label: Configuring RADIUS over TLS
---

RADIUS over TLS is designed to provide secure communication of RADIUS requests using the Transport Secure Layer (TLS) protocol. RADIUS over TLS, also known as RADSEC, redirects regular RADIUS traffic to remote RADIUS servers connected over TLS. RADSEC allows RADIUS authentication, authorization, and accounting data to be passed safely across untrusted networks.

This section describes the steps to configure TLS server certification, allowing secure use of the SSR Web GUI.

In this guide:
- Configuring RADSEC
- Syslog over TLS
- Audit Logging over TLS

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

### Certificate signing request and importing for webserver

Imported webserver certificates will be validated against trusted certificates configured via trusted-ca-certificate.To configure the certificates they are pasted in as a multi-line config, for example create a certificate root named “ca_root”:

```
admin@conductor-node-1.Conductor# config authority trusted-ca-certificate ca_root
admin@conductor-node-1.Conductor (trusted-ca-certificate[name=ca_root])# content
Enter plain for content (Press CTRL-D to finish):
<paste-cert-file-content-here>
```

A certificate signing request can be generated using the `create certificate request webserver` command. 

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

Once a certificate is signed and returned, this can be imported into the SSR for use by the webserver using the import certificate request webserver  command where it will be validated against any trusted certificates entered via trusted-ca-certificate. The following example shows an invalid self-signed certificate being imported:

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

## Configuring Syslog over TLS

To configure Syslog server over TLS the following steps are needed:
1.	Configure trust store CA certificate (necessary to validate the incoming client certificate)
2.	Configure a client certificate to be used for the radius client
3.	Configure a syslog server config at the authority level to use the previously configured client certificate

To configure the certificates they are pasted in as a multi-line config, for example create a certificate root named “ca_root”:

```
admin@conductor-node-1.Conductor# config authority trusted-ca-certificate ca_root
admin@conductor-node-1.Conductor (trusted-ca-certificate[name=ca_root])# content
Enter plain for content (Press CTRL-D to finish):
<paste-cert-file-content-here>
```

Repeat this step for a client certificate “syslog”, eg: config authority client-certificate syslog

To configure the syslog server to 192.168.1.100:6514 :

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

Once all config has been added this can be validated and committed with validate then commit

Once all config has been committed the SSR should send TLS syslog to 192.168.1.100:6514.




