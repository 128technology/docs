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
Beginning with SSR software **version 7.0** (including **7.1**), FIPS mode is enabled by default and blocks the use of non-FIPS-compliant algorithms, including **MD5** and **SHA-1**. Both NTP authentication types — `md5` and `sha1` — therefore require FIPS to be disabled on the affected node before the configuration is applied. See the disable procedure on the [conductor install page](single_conductor_install.mdx#fips-enforcement-mode) or in [Troubleshooting IDP](ts_idp.md#fips-mode-and-idp). In a future SSR release, FIPS will be compliance-by-configuration and will no longer block these algorithms.
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