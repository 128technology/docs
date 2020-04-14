## Identifying Applications by Name

The 128T Session Smart routing platform has several techniques by which it can associate inbound traffic to named applications. This is sometimes referred to as "Application Identification" (or "appID"), and the feature that allows administrators to define network policies using Fully Qualified Domain Names (FQDNs) instead of IP addresses.

The 128T router has three built-in techniques for affiliating named applications to services, all of which will be described in this document. (A fourth technique, involving service function chaining third party software is not covered here.) The three techniques are:

1. Using DNS to resolve FQDNs to IP addresses
2. Using the `application-identification` mode `tls`
3. Using the `application-identification` mode `module`

### DNS-based Services

Generally, when configuring a `service` on a 128T router, administrators use the `address` field to identify the IP address(es)/CIDR block(s) that the 128T should use to match to inbound traffic. However, the `address` field will also accept hostnames, such as `www.128technology.com`. When a service uses a hostname in the `address` field, it is referred to as a *DNS-based service*.

For every DNS-based service, the 128T will use its local DNS to resolve the hostnames; for every IP address that is returned the 128T will treat that as though it were configured in the `address` field, and install FIB entries accordingly. Here is a sample configuration for reference:

```
admin@labsystem1.fiedler# show config running authority service interchange

config

    authority

        service  interchange
            name                  interchange

            scope                 private
            security              internal
            address               community.128technology.com

            access-policy         trusted
                source      trusted
                permission  allow
            exit
            share-service-routes  false
        exit
    exit
exit
```

In this configuration, the `address` is configured as `community.128technology.com`. This will be resolved once the configuration is committed, and the 128T will resolve that hostname and install FIB entries. The 128T will periodically re-resolve those hostnames to ensure that the FIB entries are kept up-to-date.

> Note: the names used in the `address` field must be DNS-resolvable names. You cannot use wildcards such as `*.128technology.com`.

**Advantages**:

1. This is a very easy and intuitive way to associate traffic to services, without having to define a long list of IP addresses. When upstream devices change their IP address, there's no need to reconfigure the 128T to keep it up-to-date, as this is handled by DNS.
2. Unlike AppID based on TLS, there is no "chicken and egg issue;" i.e., no prerequisite to have the destination be reachable in order to learn the destination's name.

**Disadvangates**:

This technique relies on your 128T getting the same answers from DNS that your clients get. Take for example a massive SaaS provider such as `www.salesforce.com`. Their web site resolves to hundreds or thousands of IP addresses distributed across the globe. When the 128T resolves that hostname, it will get a handful of answers; if a client does the same DNS query and gets a different set of answers, then the traffic the client sends will not match the FIB entries that the 128T has created.

*Key to Success*: Use DNS-based services when your destination uses a small set of nonvolatile IP addresses. This technique is perfect for small, hosted services. The effectiveness of using DNS-based services diminishes rapidly when referencing names that resolve to dozens of address or more.

### AppID based on TLS

The 128T router can also *learn about named destinations* by inspecting the traffic that goes to and from various destinations. This is done by inspecting the X.509 certificate sent by a server during the TLS handshake process. Importantly: *this presupposes that the 128T can route packets to that destination for the purposes of retrieving the server's certificate*. Thus, when using AppID based on TLS, it is important to ensure that there is a `service` and `service-route` capable of reaching that server in addition to the one you'll configure for the named application.

Within the `Server Hello` message sent by a server will be information about that certificate, which is always sent in cleartext. One such example is here:

```
[ptimmons@labsystem1 ~]$ openssl x509 -in /tmp/512b-rsa-example-cert.pem -text -noout
Certificate:
    Data:
        Version: 1 (0x0)
        Serial Number: 3578 (0xdfa)
    Signature Algorithm: sha1WithRSAEncryption
        Issuer: C=JP, ST=Tokyo, L=Chuo-ku, O=Frank4DD, OU=WebCert Support, CN=Frank4DD Web CA/emailAddress=support@frank4dd.com
        Validity
            Not Before: Aug 22 05:26:54 2012 GMT
            Not After : Aug 21 05:26:54 2017 GMT
        Subject: C=JP, ST=Tokyo, O=Frank4DD, CN=www.example.com
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (512 bit)
                Modulus:
                    00:9b:fc:66:90:79:84:42:bb:ab:13:fd:2b:7b:f8:
                    de:15:12:e5:f1:93:e3:06:8a:7b:b8:b1:e1:9e:26:
                    bb:95:01:bf:e7:30:ed:64:85:02:dd:15:69:a8:34:
                    b0:06:ec:3f:35:3c:1e:1b:2b:8f:fa:8f:00:1b:df:
                    07:c6:ac:53:07
                Exponent: 65537 (0x10001)
    Signature Algorithm: sha1WithRSAEncryption
         14:b6:4c:bb:81:79:33:e6:71:a4:da:51:6f:cb:08:1d:8d:60:
         ec:bc:18:c7:73:47:59:b1:f2:20:48:bb:61:fa:fc:4d:ad:89:
         8d:d1:21:eb:d5:d8:e5:ba:d6:a6:36:fd:74:50:83:b6:0f:c7:
         1d:df:7d:e5:2e:81:7f:45:e0:9f:e2:3e:79:ee:d7:30:31:c7:
         20:72:d9:58:2e:2a:fe:12:5a:34:45:a1:19:08:7c:89:47:5f:
         4a:95:be:23:21:4a:53:72:da:2a:05:2f:2e:c9:70:f6:5b:fa:
         fd:df:b4:31:b2:c1:4a:9c:06:25:43:a1:e6:b4:1e:7f:86:9b:
         16:40
```

> Note: this sample certificate was supplied by [FM4DD](http://www.fm4dd.com/openssl/certexamples.htm).

About a third of the way through the output you can see that the *Common Name* (listed as `CN` in the `Subject` line) is `www.example.com`. This is what 128T will parse and subsequently retain as the "application name" for this destination.

### AppID using Modules

