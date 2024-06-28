---
title: Configuring RADUIS over TLS
sidebar_label: Configuring RADIUS over TLS
---

RADIUS over TLS is designed to provide secure communication of RADIUS requests using the Transport Secure Layer (TLS) protocol. RADIUS over TLS, also known as RADSEC, redirects regular RADIUS traffic to remote RADIUS servers connected over TLS. RADSEC allows RADIUS authentication, authorization, and accounting data to be passed safely across untrusted networks.

In this section:
- Configuring RADSEC
- Signing and Importing Webserver Certificates
- Syslog over TLS

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

Use the `import certificate client` workflow to create a client certificate named `radsec`.

```this-will-have-to-be-changed>
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



