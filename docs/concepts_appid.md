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

This is a very easy and intuitive way to associate traffic to services, without having to define a long list of IP addresses. When upstream devices change their IP address, there's no need to reconfigure the 128T to keep it up-to-date, as this is handled by DNS.

**Disadvangates**:

This technique relies on your 128T getting the same answers from DNS that your clients get. Take for example a massive SaaS provider such as `www.salesforce.com`. Their web site resolves to hundreds or thousands of IP addresses distributed across the globe. When the 128T resolves that hostname, it will get a handful of answers; if a client does the same DNS query and gets a different set of answers, then the traffic the client sends will not match the FIB entries that the 128T has created.

*Key to Success*: Use DNS-based services when your destination uses a small set of nonvolatile IP addresses. This technique is perfect for small, hosted services. The effectiveness of using DNS-based services diminishes rapidly when referencing names that resolve to dozens of address or more.

### AppID based on TLS



### AppID using Modules

