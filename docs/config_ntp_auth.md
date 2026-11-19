---
title: NTP Authentication
sidebar_label: NTP Authentication
---

#### Version History
| Release | Modification                |
| ------- | --------------------------- |
| 5.6.0   | NTP Authentication introduced |

Support for NTP authentication allows external NTP servers to be authenticated using an `md5` or `sha1` hash, allowing the SSR to verify the identity of the server being used for NTP time synchronization.

:::important
SSR4x0 series devices have **FIPS mode enabled by default**. With SSR versions 7.0.x and 7.1.x, FIPS enforcement prevents the use of non-FIPS-compliant cryptographic algorithms such as **MD5** and **SHA-1**. This affects features that rely on these algorithms.

With the release of software version 7.2.x, FIPS is **compliance-by-configuration** and no longer blocks these algorithms. **However, the use of MD5 is strictly prohibited for secure hashing and cryptographic authentication by FIPS 140** because MD5 is vulnerable to collision attacks and considered legacy from a compliance standpoint. The use of these legacy BGP and MSDP protocols with TCP MD5 authentication enabled is outside of the SSR cryptographic module boundary, and is not covered by the FIPS power-on self-tests.

Both NTP authentication types — `md5` and `sha1` — require FIPS to be disabled on the affected node before the configuration is applied. However, it is not a FIPS-approved operating mode to use features which include MD5 or SHA1 authentication. If your 7.0.x or 7.1.x deployment **does not require FIPS compliance** and you wish to disable FIPS mode, refer to the disable procedure on the [conductor install page](single_conductor_install.mdx#fips-enforcement-mode) or in [Troubleshooting IDP](ts_idp.md#fips-mode-and-idp).
:::

To allow the NTP client to synchronize with an authenticated server the following information must be provided:

- **Server ip-address:** This is required.
- **Key-number:** The specific number used by the server to identify the key. Range is 1-65534. The number configured on the device must match the key number expected by the server.
- **Authentication type:** Either `md5` or `sha1` (recommended)
- **Shared key from the server:** 20 characters long for `md5`. 40 characters long for `sha1`.

Example config:

```
                    authority
                        name Authority128
                        router Fabric128
                            name Fabric128
                            system
                                ntp
                                    server 1.1.1.1
                                        ip-address  1.1.1.1
                                        authentication-key
                                            key-number 1
                                            type md5
                                            value ay4SZtX$VuooRx9XD+d+
                                        exit
                                    exit
                                exit
                            exit
                        exit
                    exit
```                 