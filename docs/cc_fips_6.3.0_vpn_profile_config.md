---
title: Configure a VPN Protection Profile
sidebar_label: Configure a VPN Protection Profile
---
The VPN Protection Profile feature adds support for X.509 ceritifcate management for IPSec plugin, along with the validation strength of the VPN’s encryption algorithms. The IPSec Plugin is delivered with the SSR ISO, and has been tested and received certification for use as part of Common Criteria compliance. To use the VPN Protection Profile feature, the IPSec plugin provided with the SSR ISO must be installed and configured as described below. The IPSec plugin is currently the only plugin that is Common Criteria compliant.

## Install the IPSec Plugin

The IPSec plugin can be installed using either the Web Interface, or the SSR CLI. If use of the web interface has been enabled through the generation and configuration of a `trusted-ca-ertificate`, the GUI may be used to perform the IPsec plugin installation. For information about configuring a `trusted-ca-ertificate`, see [Signing and Importing Webserver Certificates](cc_fips_6.3.0_access_mgmt.md#signing-and-importing-webserver-certificates).

Use the instructions for installing and managing the plugin found in [Plugin Workflow - Installation and Management](plugin_intro.md#installation-and-management).

Otherwise, use the following command from the SSR CLI:

`manage plugin {install | remove} [node <node>] name <plugin-name>`

After installing the IPSec plugin, enable `common-criteria-mode` for use in a Common Criteria compliant environment. Use the following code example to set `common-criteria-mode` to `true`:

```
config

     authority
         ipsec-client-settings
             common-criteria-mode true
         exit
     exit
 exit
```

## Configure X.509 Certificate-type for Tunnel Authentication

The IPsec plugin requires users to generate/acquire their private key, a CA certificate file, and user certificate file. This must be signed by the CA certificate offline by utilities mentioned in Libreswan document (or other reliable sources such as openssl). Refer to the public [HOWTO: Using_NSS_with_libreswan document](https://libreswan.org/wiki/HOWTO:_Using_NSS_with_libreswan) for additional information. 

The IPsec plugin will take over the configuration mentioned in `Importing third-party files into NSS` in the Libreswan document. 

:::note
All x509 certificates must meet common criteria compliant requirements regarding algorithms. Please see [Cryptographic Algorithms](cc_fips_6.3.0_access_mgmt.md#ssh-server-cryptographic-algorithms) for more information. 
:::

Use the following steps to create the X.509 certificate-type for Tunnel Authentication. 

1. Configure the [`private-key`](plugin_ipsec_client.md#private-key).
2. Configure the [`client-certificate`](config_command_guide.md#configure-authority-client-certificate).
3. Configure the [`trusted-ca-certificate`](config_command_guide.md#configure-authority-trusted-ca-certificate).
4. Enter the key names for each of these items in their respective fields in the [`ipsec-profile`](plugin_ipsec_client.md#profiles).

This information is used to generate the PKCS12 file. The IPsec NSS database stores the generated PKCS12 file for tunnel authentication. 