---
title: Configure a VPN Protection Profile
sidebar_label: Configure a VPN Protection Profile
---
The VPN Protection Profile feature adds support for X.509 ceritifcate management for IPSec plugin, along with the validation strength of VPN’s encryption algorithms. The IPSec Plugin is delivered with the SSR ISO, and has been tested and received certification for use as part of Common Criteria compliance. To use the VPN Protection Profile feature, the IPSec plugin provided with the SSR ISO must be installed and configured as described below. The IPSec plugin is currently the only plugin that is Common Criteria compliant.

## Configure X.509 Certificate-type for Tunnel Authentication

The IPsec plugin requires users to generate/acquire their private key, a CA certificate file, and user certificate file. This must be signed by the CA certificate offline by utilities mentioned in Libreswan document (or other reliable sources such as openssl). Refer to the public [HOWTO: Using_NSS_with_libreswan document](https://libreswan.org/wiki/HOWTO:_Using_NSS_with_libreswan) for additional information. 

Note that the IPsec plugin will take over the configuration mentioned in `Importing third-party files into NSS` in the Libreswan document. 

Use the following steps to create the X.509 certificate-type for Tunnel Authentication. 

1. Configure the [`private-key`](#private-key).
2. Configure the [`client-certificate`](config_command_guide.md#configure-authority-client-certificate).
3. Configure the [`trusted-ca-certificate`](config_command_guide.md#configure-authority-trusted-ca-certificate).
4. Enter the key names for each of these items in their respective fields in the [`ipsec-profile`](#profiles).

This information is used to generate the PKCS12 file. The IPsec NSS database stores the generated PKCS12 file for tunnel authentication. 