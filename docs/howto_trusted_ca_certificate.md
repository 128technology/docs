---
title: Adding a Trusted Certificate
sidebar_label: Adding a Trusted Certificate
---
Any Linux system hosting 128T comes with public certificates of common public Certificate Authorities (CA) already loaded. This allows them to trust end host certificates signed by these CAs, or signed by designated signing authorities in a chain of trust back to the CAs, right out of the box.

However, many enterprises or service providers operate their own CA with no tie to public CA infrastructure. Should the 128T host need to connect to servers using certificates signed by these private CAs, the system will need to have the private CA's certificates installed as a trusted certificate authority.

An example of this is a 128T host configured for LDAP over SSL, which must connect to an LDAP server that is using a host certificate signed by the private CA. If the 128T host is to trust the server when it opens a connection, it will require that it can has the private CA certificate, and any intermediate signing CA certificates.

## Example Scenario

Let's say our enterprise has a private certificate authority consisting of a root CA which delegates signing authority to a subordinate signing CA, and the signing CA signs end host certificates which are to be trusted.

The public certificate of the root CA in PEM form looks like:
```
-----BEGIN CERTIFICATE-----
MIIDxjCCAq6gAwIBAgIBATANBgkqhkiG9w0BAQUFADB0MRMwEQYKCZImiZPyLGQB
...root CA contents...
EvWDvU72qH7pfC7TMeuvTOhnBmGsY/0RZnVbzG3SvE5/ZfWhjBK1MegQeHKVvZjl
Ez9VDlefIZwjSA==
-----END CERTIFICATE-----
```
The public certificate of the signing CA in PEM form looks like:
```
-----BEGIN CERTIFICATE-----
MIIDzzCCAregAwIBAgIBAjANBgkqhkiG9w0BAQUFADB0MRMwEQYKCZImiZPyLGQB
...signing CA contents...
NB7FEenRXO+vevj0PVVaxJUNyJEqfQwTyH0GaQD3VlGXJheyMCzpW9Gx76aBOXz0
EyuS5Hop+ONX7G3qPTv8gQc8EQ==
-----END CERTIFICATE-----
```

To load these on a 128T host, place the PEM formatted public key contents in `/etc/pki/ca-trust/source/anchors/`. For this example the root CA public certificate would be saved to `/etc/pki/ca-trust/source/anchors/myenterprise-root-ca.crt`, and the signing CA public certificate would be saved to `/etc/pki/ca-trust/source/anchors/myenterprise-signing-ca.crt`.

With the public certificate saved, run `sudo update-ca-trust` for the system to process and recognize them as trusted CA certificates.

## Automation of CA Certificate Installation Using Salt

If you have a deployment of many 128T nodes which must all be loaded with private CA certificates, you can automate the distribution of the certificates using salt.

For example, the salt state `/srv/salt/trusted-ca-certificates.sls` with contents below would install the certificate as previously described:
```
myenterprise root ca:
  file.managed:
    - name: /etc/pki/ca-trust/source/anchors/myenterprise-root-ca.crt
    - contents: |
        -----BEGIN CERTIFICATE-----
        MIIDxjCCAq6gAwIBAgIBATANBgkqhkiG9w0BAQUFADB0MRMwEQYKCZImiZPyLGQB
        ...root CA contents...
        EvWDvU72qH7pfC7TMeuvTOhnBmGsY/0RZnVbzG3SvE5/ZfWhjBK1MegQeHKVvZjl
        Ez9VDlefIZwjSA==
        -----END CERTIFICATE-----

myenterprise signing ca:
  file.managed:
    - name: /etc/pki/ca-trust/source/anchors/myenterprise-signing-ca.crt
    - contents: |
        -----BEGIN CERTIFICATE-----
        MIIDzzCCAregAwIBAgIBAjANBgkqhkiG9w0BAQUFADB0MRMwEQYKCZImiZPyLGQB
        ...signing CA contents...
        NB7FEenRXO+vevj0PVVaxJUNyJEqfQwTyH0GaQD3VlGXJheyMCzpW9Gx76aBOXz0
        EyuS5Hop+ONX7G3qPTv8gQc8EQ==
        -----END CERTIFICATE-----

update ca trust:
  cmd.run:
   - name: 'update-ca-trust'
   - onchanges_any:
     - file: /etc/pki/ca-trust/source/anchors/myenterprise-signing-ca.crt
     - file: /etc/pki/ca-trust/source/anchors/myenterprise-root-ca.crt
```