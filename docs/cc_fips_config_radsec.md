---
title: Configuring Secure RADIUS Transport
sidebar_label: Configuring Secure RADIUS Transport
---

Use the following procedure to configure Secure RADIUS Transport:

1. Configure trust store CA certificate (necessary to validate the incoming client certificate)
2. Configure a client certificate to be used for the radius client
3. Configure a radius server config at the authority level to use the previously configured client certificate.

Certificates are pasted in as a multi-line config. For example, create a certificate root named `ca_root`:

```
admin@conductor-node-1.Conductor# config authority trusted-ca-certificate ca_root
admin@conductor-node-1.Conductor (trusted-ca-certificate[name=ca_root])# content
Enter plain for content (Press CTRL-D to finish):
<paste-cert-file-content-here>
```
Repeat this step to create a client certificate, “radsec”, eg: `config authority client-certificate radsec`.



Next, configure the Radsec server. The following configuration example will add a radius server named `radsec`

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
Associate the previously configured `radsec` client certificate to the radius server running on a specific node.

`configure authority router cond node t327-dut1 radius client-certificate-name radsec`

Note that the client certificate selected should match the appropriate IP/hostname of the node as seen from the RADIUS server.

`validate` and `commit` the changes. 

Create a remotely authenticated user that will be used by RADIUS. In this example we create user `test1`.
```
*admin@conductor-node-1.Conductor# create user test1
Full Name: test1
Authentication Type (remote or local): remote
Roles (space separated): admin
Enabled (true or false): true
Account 'test1' successfully created
```
When this user logs into the node t327-dut1 (via ssh for example) the authentication request is sent via RADSEC to the server 172.18.5.224.
