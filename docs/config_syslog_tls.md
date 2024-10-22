---
title: Configuring Syslog Over TLS
sidebar_label: Configuring Syslog Over TLS
---

Syslog over TLS allows the secure transportation of system log messages from the syslog client to the syslog server. TLS uses certificates to authenticate and encrypt the communication.

## Syslog over TLS Configuration - Existing Certificate

Use the following information to configure Syslog over TLS using an existing certificate.

#### 1. Configure the Trusted CA Certificate. 

The trusted CA certificate is necessary to validate the incoming client certificate. Certificates are pasted in as a multi-line config. 

Create a root certificate named `ca_root` and paste the certificate file content into the command:

```
admin@conductor-node-1.Conductor# config authority trusted-ca-certificate ca_root
admin@conductor-node-1.Conductor (trusted-ca-certificate[name=ca_root])# content
Enter plain for content (Press CTRL-D to finish):
<paste-cert-file-content-here>
```

:::note
The `trusted-ca-certificate` is a list and may contain different CA roots used for different certificates. In that case, naming them all `ca_root` would not be suitable. In that case, choose a name that is meaningful to the user and CA, eg: `globalsign_root`.
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

To complete the process, `validate` and `commit` the changes. After the confiuration changes have been committed, the SSR will send the syslog to 192.168.1.100:6514 over TLS.
When the user logs into the node `t327-dut1` via ssh, the authentication request is sent via RADSEC to the server `172.18.5.224` and the user is authenticated. 


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
E7YygMkI7oAnHCioslB+x2Am/xKPRosh3s50fIN3mY409/byMGipfGcyNlMn8MT8XbS
XF/zmGBI1/4aRbeqL5VMDPO+9DNRxXMgqBs2y48WanGvZeZTP5B/sSczlhOSxHnu
DxNYQ7+rZs9NpKzktCXOSA8nszHp5PNCWsa8tVNQvyhAqboTGrXQZhjZRWzg3nzS
Gb5XIxudEteQOg5LJW/7GpxFmF+XtNxzfSJpw1/tKeA32VN9In++nwoflhUCAwEA
AaBDMEEGCSqGSIb3DQEJDjE0MDIwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwIwGAYD
VR0RAQH/BA4wDIIEZHV0MYcEChsgyzANBgkqhkiG9w0BAQsFAAOCAQEAK32e8BUh
n9ficSqiRq3b0UuaQGnNrQ1oAY5FeaTY/2gDPYCju43HTsW1TSoK6376UxU43yAC
nAbFVe8p6fMIh9LkR+I9IM/Z2PXUtUrE8MPQo6z4/9aDGgwEoj654nArM7rWXh05
7RBhzALsh2GWt2GT9FXcODIbGcsu6Ea2+24o1MuKMxDGEWjCnJJheXmFsqraKRnu
rcgzjMPc1F+iMb3O/bzFnj3a4Pj3dRK59bV/0zD7ti8KC/jodV80yzMVn4uSPlj1
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
wHAt15TH3iarSPE3dV3L0c1tyOFaMUNLAd3nsPArR0w/1YF3o8r2ML9OmZ4WmkZK
vyFx6AsuVm5MpXR4z7U4j955sqRkWsi3I1hLtMPzuWEJA/AbpTCxb1k2xJDQWira
/NALlz6NPVRcngBt56ZDhMNmy/g2zGEcmitEqMUOS7apvRk6hZK94dfjSQe4iEpX
Sdd6vvZxdrWGV10lmDDH0SPtmGBE+34r1UNIbp/XVRh6KxiNcjFVNBwlwqATmTYh
xkXAPw1pAgMBAAECggEACZ3YNLnnvBOiAmx5larvCWvIZz7+am/cJseRmBfIbkT9
5ooFqvu0OVyTqaJIR8XaR2PnXH6StXmntnqDpHWQTqUvlbGANIqWsyiig26zFCEu
IAXwr0TKRERzKAWT4lwmOAGi4LuQa6Ty/wdNyx9z9f6hBQi2C5Rnm9OdkE6vsAtJ
NbNcsV+bvedfLoJqG1MM3sh3LT3RAltaMuJEw3PdFiMVcQIJgGr85nVJcg4SCUkh
JKlfUE83IqkwAd1V0jn/2yopCmQBLrpyqlRu2MmwFiIS+IUcoReemNK8mlfd8hbR
bc0Zvum65DS1Y6wuuBdWP2v49xaX8fDrVy8unIHQ4wKBgQDDtTq7L06XqJkHtKj3
6XqVO5oKZhu1tcLDXWsxHnJas6Cw8u0cx+r4cTWUWI/HFBYOKRveIqGdb12QR757
lRqK3ie+dZvhsztUm04EnVaNvn09YGl5n8fV+3QrygeanYVYNgRdMPhf6PNmcJQB
Ppj2XsIvjxoiNCf+YSDJNO2SwwKBgQDfBa2U2nKhgZZaYGYmdKT1zqb3TsGWSIIt
KhSJX3CvxT08Czqi3R1PgBdNS9YI8XXsDZnvhcmOeP2vm3ylgJZGS7Gi04Mj9ijQ
+beqMnNBjEjc1oXkemd9bfsDfby6k5Ew5OpzVe5rkOpc7oGy54REFh0hLukaoOFJ
eXxUJ9bEYwKBgGqBrG7GNg1PEckhxnr0s2OXxiM2oonnWxEbPATFPxKhgygJbIUn
P3bplXEgKU78XWxjbukbC700KEUm5kE3SfSdJh/+vVC9S+KlinX0cnA9ZMcMOxqX
nBeV+wkBr9WzOChjbUiSJ/l6O0xapBFxUalytFdRl7VZkRJdJYyao1glAoGACrup
OOqybZdg9wSApgUjEzlYy7ockvD2YtoNlvbi43KomcUok0H08SiG9o9Zw6BrPmsB
J4fWxWaJPvRKsWRY1xU5fU6Ulxx3pmb+MdCvv03TC92/H9nMNTsfw3E/rfMAH8xE
hDx0dvTIcqR/1W5S7TvrNvec/E0VyoVwOFSaf2UCgYApQZxpTvGQ6NMvNHBMaCa1
Xy5AWPfTYbYUTTq9q8t/s1bA5YkA6MJ740dAGzwsUAlJ887QsGXH5ZeQtxVbHbmA
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
FppGSr8hcegLLlZuTKV0eM+1OI/eebKkZFrItyNYS7TD87lhCQPwG6UwsW9ZNsSQ
0Foq2vzQC5c+jT1UXJ4AbeemQ4TDZsv4NsxhHJorRKjFDku2qb0ZOoWSveHX40kH
uIhKV0nXer72cXa1hlddJZgwx9Ej7ZhgRPt+K9VDSG6f11UYeisYjXIxVTQcJcKg
E5k2IcZFwD8NaQIDAQABo2MwYTAdBgNVHQ4EFgQUn07ghxVixnvcB4G51WxouxRA
M2YwHwYDVR0jBBgwFoAUn07ghxVixnvcB4G51WxouxRAM2YwDwYDVR0TAQH/BAUw
AwEB/zAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZIhvcNAQELBQADggEBAHH+4MYOoIrT
DoYsVKJh0x1MHVoCdn39fFvUPFRJg5b3KLyaILzPoS300XOxrtNvY0ayBu70atl8
9RRj1LMqVb3mjR7sigyj4wm2rWLVOJMncZsiVXVmX2rhteYe6Z0IVPXjOS3Yn9Ph
G8K9lQCHwXmLmsbzlQPbFFvRsCA+/OXVhSA4h88eIIWt9fkcPQfjCEk6SBnzOXDU
n7C3l7TweHggfgMvM9a+ullfmfw0ejhbX3JOrXCuA9EIloATgdpyzOKZ6q2tXBtQ
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
dGqxf7I/yKWZtkoxB3JVk3qF7651EaGAzjMHYhmpPVR0K9IAPbyGucK0aOriJqZ5
91wL39G5AgMBAAECggEAE2/xDSQYyG8bv7muRxBbwNw+Q6cwKrcGZtRTRmUM+ee/
zAReBCDmR3KU1zn0SoALkqhFn6rhl6EaSSEIivLeuJZbWC7hPyNgMACWohOvhQcC
j3+cBWH+NXEyVGA3EltgKsscAvpO8qcxirJ2HaURd64wPd7rRVMvrErNGfxUNOh1
fHSd3t7ch7QfQsX+cIRS7ZhIxAKY97nVhlRN1TS8Y0dDW2fSSpV8cqUs7DQjetcI
XG54PAsOjg6TnALtg113zftg6W9WPG2R8CWyW6g3Z0qJ7TDAp6GZMqRBjzjGlfPi
CzUg+YHXCn8P2jrYD/CwSYr42dLX0FZbcdI5NHjSAQKBgQD+rDSi9sIR8Bryo0+R
1B83myMX67dpkWGrxjdrgAijuVSKX5+mT44WGHh8UZtN08bU/pWEWmag9TGBbnic
QY3qJXLyzNHERL7tEEyEGKBoAWuR9qgESI8w2AgJEvCokFO1h5BnmVfnCaB51rrd
iH2irP9Ed3G7+sdVZ3q1AdC3iQKBgQDGtkEpss+i9go2OuVO3ez52SR1aQqiKHak
wCINR52/8UhjGefoCwA59mKUIx9beKxyhVoi2XEXs4LqMCMWUI49INB9IjIn67qW
Cf9wUPGaCOS8P6HTKV+Xm9aZMmMQHTcCamqZbZw2Q9brucdPQJRkcsktKeioV3mL
iwgNliKMsQKBgC3EwQjwk9wpbI5irzAkESArL1ljMWk1iXoXe2pEbkkOS5U6rjRz
Y7Ow3iZpfCG2h6tLvY81t/dART1cu1ar1yNAzt33NEaznCR6o2WyD1Hhv3VSAMwU
Rjee+4K19q40kfaz0E3uDxAkeMSsxJR/rSSJNq8VUElaPmyo1jKlit8RAoGAM4YU
VVyQ7B9BvJf+1zlB9fKwumTXJf657LQI4Eqeg6Nrco7IC+m2UFErdF+7BLvAcx1S
ptCcu1mHa3O51VJj30O/64JPYPyFb9v9yMCkNJ1zucACFL+YkrYMqcJf31DD77Nq
GohKRePHOW39WPZUw8rjkPtZ4TR1RpJxLxyrrrECgYEAucUgTqdA1JmEmm72nQ3z
mzf6LtuLq748DEb8KaTkYwJZaM705/BP8vNLSE/+92gXYkMpTpUBBYTzzK9aYeGE
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
IIMgg00R/5h0arF/sj/fL0cKofSeAgu11z1891d1scDOMwdiGak9VHQr0gA9vIa5
wrRo6uImpnn3XAvf0bkCAwEAAaNvMG0wHQYDVR0OBBYEFBD7hj42fbQv+v95CXIN
/Y3jckxzMB8GA1UdIwQYMBaAFJ9O4IcVYsZ73AeBudVsaLsUQDNmMAkGA1UdEwQC
MAAwCwYDVR0PBAQDAgXgMBMGA1UdJQQMMAoGCCsGAQUFBwMCMA0GCSqGSIb3DQEB
CwUAA4IBAQCW0sZVVr04ofxj28dcyce6TRr9buFeohBWVPZ+Uu3i4eSWuj0cLOl3
d/Z3Vv7jnDDQd4175eqA7rGL7Mfe3MsdSeBTut2z8Ubn45dRMZuLHxcrg5qMCq3b
o5Ff038wm1OB3Jc2ec9nJOUUdGh+gdrlxiKJH9i1VlxvgzgltTGvbH7TQozMdBlF
04O32yP3MXsKhHRvYrtQpSQ248QeSLA/wItSc+vqcsPKjCGwSb183CPHDUmUALkE
zTwd4+soylkHxCW2zZ50lUUqqNt1nSIcVF2V3qqxRZXZcJtN5y9+brpc9Z8eiXys
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

` configure authority router ComboWest node combo-west radius client-certificate-name syslog`
