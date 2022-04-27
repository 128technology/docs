---
title: NTP Authentication
sidebar_label: NTP Authentication
---

Support for NTP authentication allows external NTP servers to be authenticated using an `md5` or `sha1` hash, allowing the SSR to verify the identity of the server being used for NTP time synchronization.

To allow the NTP client to synchronize with an authenticated server the following information must be provided:

- **Server ip-address:** This is required.
- **Key-number:** The specific number used by the server to identify the key. Range is 1-65534. The number configured on the device must match the key number expected by the server.
- **Authentication type:** Either `md5` or `sha1` (recomended)
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