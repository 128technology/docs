---
title: NTP Client Authentication
sidebar_label: NTP Client Authentication
---

Support for NTP authentication allows external NTP servers to be authenticated using a `sha1` hash, allowing the SSR to verify the identity of the server being used for NTP time synchronization.

Authentication using `md5` is not supported by FIPS mode or Common Criteria. 

To allow the NTP client to synchronize with an authenticated server the following information must be provided:

- **Server ip-address:** This is required.
- **Key-number:** The specific number used by the server to identify the key. Range is 1-65534. The number configured on the device must match the key number expected by the server.
- **Authentication type:** `sha1` (required)
- **Shared key from the server:** 40 characters long for `sha1`.

Example CLI configuration:

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
                        type sha1
                        value ay4SZtX$VuooRx9XD+d+8chLS+95eJtV23+$cjTg
                    exit
                exit
            exit
        exit
    exit
exit
```                 

Configuration using the GUI:

![GUI NTP Configuration](/img/ntp-client-authentication.png)