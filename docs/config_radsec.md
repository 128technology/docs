---
title: Configuring RADUIS over TLS
sidebar_label: Configuring RADIUS over TLS
---

RADIUS over TLS is designed to provide secure communication of RADIUS requests using the Transport Secure Layer (TLS) protocol. RADIUS over TLS, also known as RADSEC, redirects regular RADIUS traffic to remote RADIUS servers connected over TLS. RADSEC allows RADIUS authentication, authorization, and accounting data to be passed safely across untrusted networks.

## RADSEC Configuration - Existing Certificate

Use the following information to configure RADIUS over TLS (RADSEC) using an existing certificate.

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

#### 2. Configure the Trusted CA Certificate. 

The trusted CA certificate is necessary to validate the incoming client certificate. Certificates are pasted in as a multi-line config. 

Create a certificate root named `ca_root` and paste the certificate file content into the command:

```
admin@conductor-node-1.Conductor# config authority trusted-ca-certificate ca_root
admin@conductor-node-1.Conductor (trusted-ca-certificate[name=ca_root])# content
Enter plain for content (Press CTRL-D to finish):
<paste-cert-file-content-here>
```

:::note
The `trusted-ca-certificate` is a list and may contain different CA roots used for different certificates. In that case, naming them all `ca_root` would not be suitable. In that case, choose a name that is meaningful to the user and CA, eg: `globalsign_root`.
:::

#### 3. Configure a Client Certificate to be used for the RADIUS client.

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

## RADSEC Configuration - Generate Certificate

Use the following examples to generate a client certificate for use on the device. 

#### 1. Generate the Signing Request

Use the `create certificate request client` command to generate the signing request.

```
admin@conductor-node-1.Conductor# create certificate request client radsec
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
admin@conductor-node-1.Conductor# create certificate request client radsec
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
E7YygMkI7oAnHCioslB+x2Am/xKPRosh3s50fIN3mY409/byMGipfGcyNlMT8XbS
XF/zmGBI1/4aRbeqL5VMDPO+9DNRxXMgqBs2y48WanGvZeZTP5B/sSczlhOSxHnu
DxNYQ7+rZs9NpKzktCXOSA8nsz
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
-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCqfzVmeFPMA+Jc
53MlVF3LoYZAkqh1Dz3+HFnegcAU3/tCGSdfJad/PeF5KEQDDnF0vc9XbfS2/wJC
wHAt15TH3iarSPE3dV3L0c1tyOFaMUNLAd3nsPArR0w/1YAfr1cAN0rEUZ4WmkZK
vyFx6AsuVm5MpXR4z7U4j955sqRkWsi3I1hLtMPzuWEJA/AbpTCxb1k2xJDQWira
/NALlz6NPVRcngBt56ZDhMNmy/g2zGEcmitEqMUOS7apvRk6hZK94dfjSQe4iEpX
Sdd6vvZxdrWGV10lmDDH0SPtmGBE+34r1UNIbp/XVRh6KxiNcjFVNBwlwqATmTYh
xkXAPw1pAgMBAAECggEACZ3YNLnnvBOiAmx5larvCWvIZz7+am/cJseRmBfIbkT9
5ooFqvu0OVyTqaJIR8XaR2PnXH6StXmntnqDpHWQTqUvlbGANIqWsyiig26zFCEu
IAXwr0TKRERzKAWT4lwmOAGi4LuQa6Ty/wdNyx9z9f6hBQi2C5Rnm9OdkE6vsAtJ
NbNcsV+bvedfLoJqG1MM3sh3LT3RAltaM0ntw3PdFiMVcQIJgGr85nVJcg4SCUkh
JKlfUE83IqkwAd1V0jn/2yopCmQBLrpyqlRu2MmwFiIS+IUcoReemNK8mlfd8hbR
.
.
.
2P6CP4iOY1EjsxNssrLJKkxXdagYeZo5X2KOIqZ8FeVli4BM0mqX96UPN2zV3dNP
eN1DF6VSLghh30ITUauYdQ++
-----END PRIVATE KEY-----
 
-----BEGIN CERTIFICATE-----
MIIDlDCCAnygAwIBAgIVAJHxzhL42q7io2PBDPR+TCeBsyQgMA0GCSqGSIb3DQEB
CwUAMFExCzAJBgNVBAYTAlVTMRYwFAYDVQQIDA1NYXNzYWNodXNldHRzMREwDwYD
VQQKDAhUZXN0IEluYzEXMBUGA1UEAwwOY2EuZXhhbXBsZS5jb20wHhcNMjQxMDIy
MTYzODI1WhcNMjUxMDIyMTYzODI1WjBRMQswCQYDVQQGEwJVUzEWMBQGA1UECAwN
TWFzc2FjaHVzZXR0czERMA8GA1UECgwIVGVzdCBJbmMxFzAVBgNVBAMMDmNhLmV4
YW1wbGUuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqn81ZnhT
zAPiXOdzJVRdy6GGQJKodQ89/hxZ3oHAFN/7QhknXyWnfz3heShEAw5xdL3PV230
tv8CQpHKHjWWQzG1MM3sh3LT3RAltaM0NT6shNXE3va46f3zotWBd6PK9jC/Tpme
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
admin@conductor-node-1.Conductor# import certificate client radsec
Enter the end point certificate in PEM format (Press CTRL-D to finish):
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDFrn/2q4mijt14
gjmN2agDfu6sykg4OJ2NDy4IRrBYilExRJHllAndtc04rp7EQ544Z+/J/dNJrmXK
GnHvm/Rg0UdKnbFrw5aentpx3rFefdaf8nlJLW5rFH1wxDqUhE+y5q+s+8k3ESt0
9L/26OxTQP11t5Vh/BEkK5iVHLDBGyHntUvEnM5tFWL7+NvefhuZ6McvY7GPDR8c
bkuNHXlv9laeXQlI6IiiYum8waQDnJBGEx2wPTUguZJWP0YgxLinKiCDIINNEf+Y
dGqxf7I/h01yH4nDGR3nad30fAN+10chzjMHYhmpPVR0K9IAPbyGucK0aOriJqZ5
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
TWFzc2FjaHVzZXR0czERMA8GA1UECgwIVGVzdCBJbmMxGzAZBgNVBAMMEmNsaWVu
dC5leGFtcGxlLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMWu
f/ariaKO3XiCOY3ZqAN+7qzKSDg4nY0PLghGsFiKUTFEkeWUCd21zTiunsRDnjhn
78n900muZcoace+b9GDRR0qdsWvDlp6e2nHesV591p/yeUktbmsUfXDEOpSET7Lm
r6z7yTcRK3T0v/bo7FNA/XW3lWH8ESQrmJUcsMEbIee1S8Sczm0VYvv4295+G5no
xy9jsY8NHxxuS40deW/2Vp5dCUjoiKJi6bzBpAOckEYTHbA9NSC5klY/RiDEuKcq
IIMgg00R/5h0arF/sj/fL0cKofSeAgu11z1891d1sc0OMwdiGak9VHQr0gA9vIa5
. 
.
.
9cgLsL60tukLdwxH5S6gAw/MSm6ABYjdv
-----END CERTIFICATE-----
                                                                                                                                                                                                                                                                                
/usr/lib/128technology/unzip/pcli/runfiles/pypi__36__cryptography_40_0_2/cryptography/x509/base.py:576: CryptographyDeprecationWarning: Parsed a negative serial number, which is disallowed by RFC 5280.
  return rust_x509.load_pem_x509_certificates(data)
✔ Importing...
Certificate imported successfully
Would you like to add the certificate to your configuration? [y/N]: y
Which router is this certificate for? (Select all if it applies to the entire authority) [all]: all
% Warning:
1. certificate contains the following issues: does not have the extendKeyUsage extension


    config
        authority
            client-certificate radius
                content

2. certificate contains the following issues: does not have the extendKeyUsage extension


    config
        authority
            client-certificate conductor-radius
                content

Certificate imported successfully
Would you like to clean up the temporary certificate and key files? [Y/n]: Y
```

#### 4. Configure the Device to Accept the Client Certificate

Use the following example command to configure your device to accept the certificate.

` configure authority router ComboWest node combo-west radius client-certificate-name radsec`

