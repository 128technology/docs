---
title: Application Identification
sidebar_label: Application Identification
---

## Identifying Applications by Name

The Session Smart Routing platform has several techniques by which it can associate inbound traffic to named applications. This is sometimes referred to as "Application Identification" (or "appID"), and the feature that allows administrators to define network policies using Fully Qualified Domain Names (FQDNs) instead of IP addresses.

The SSR has three built-in techniques for affiliating named applications to services, all of which will be described in this document. (A fourth technique, involving service function chaining third party software is not covered here.) The three techniques are:

1. Using DNS to resolve FQDNs to IP addresses
2. Using the `application-identification` mode `tls`
3. Using the `application-identification` mode `module`

Additionally, [web filtering](config_domain-based_web_filter.md#overview) provides domain classification using third party data sources to generate a comprehensive, real time, and up-to-date worldwide database for categorizing domains and URLs. 

### DNS-based Services

Generally, when configuring a `service` on a SSR, administrators use the `address` field to identify the IP address(es)/CIDR block(s) that the SSR should use to match to inbound traffic. However, the `address` field will also accept hostnames, such as `www.128technology.com`. When a service uses a hostname in the `address` field, it is referred to as a *DNS-based service*.

For every DNS-based service, the SSR will use the host system's local DNS capabilities to resolve hostnames; for every IP address that is returned the SSR will treat that as though it were configured in the `address` field, and install FIB entries accordingly. It will also refresh these FIB entries based on the time-to-live (TTL) returned by the DNS server. Here is a sample configuration for reference:

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

In this configuration, the `address` is configured as `community.128technology.com`. This will be resolved once the configuration is committed, and the SSR will resolve that hostname and install FIB entries. The SSR will periodically re-resolve those hostnames to ensure that the FIB entries are kept up-to-date.

:::note
The names used in the `address` field must be DNS-resolvable names. You cannot use wildcards such as `*.128technology.com`.
:::

**Advantages**:

1. This is a very easy and intuitive way to associate traffic to services, without having to define a long list of IP addresses. When upstream devices change their IP address, there's no need to reconfigure the SSR to keep it up-to-date, as this is handled by DNS.
2. Unlike AppID based on TLS, there is no "chicken and egg issue;" i.e., no prerequisite to have the destination be reachable in order to learn the destination's name.

**Disadvantages**:

This technique relies on your SSR getting the same answers from DNS that your clients get. Take for example a massive SaaS provider such as `www.salesforce.com`. Their web site resolves to hundreds or thousands of IP addresses distributed across the globe. When the SSR resolves that hostname, it will get a handful of answers; if a client does the same DNS query and gets a different set of answers, then the traffic the client sends will not match the FIB entries that the SSR has created.

:::tip Key to success
Use DNS-based services when your destination uses a small set of nonvolatile IP addresses. This technique is perfect for small, hosted services. The effectiveness of using DNS-based services diminishes rapidly when referencing names that resolve to dozens of address or more.
:::

### AppID based on TLS

The SSR can also *learn about named destinations* by inspecting the traffic that traverses it. This is done by inspecting the X.509 certificate sent by a server during the TLS handshake process. Importantly: *this presupposes that the SSR can route packets to that destination for the purposes of retrieving the server's certificate*. Thus, when using AppID based on TLS, it is important to ensure that there is a `service` and `service-route` capable of reaching that server in addition to the one you'll configure for the named application.

:::note
Normally this is done by having a "catch-all" service for `0.0.0.0/0` to route traffic out to the internet, but it does not need to be.
:::

Within the `Server Hello` message sent by a server will include its X.509 certificate, which is decipherable by the client to include information about the server. One such example is here:

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

:::note
This sample certificate was supplied by [FM4DD](http://www.fm4dd.com/openssl/certexamples.htm).
:::

About a third of the way through the output you can see that the *Common Name* (listed as `CN` in the `Subject` line) is `www.example.com`. This is what SSR will parse and subsequently retain as the "application name" for this destination. Domain-names and IP addresses are learned from TLS and mapped to hierarchical services using the `domain-name` field.

```
config

    authority

        service  internet
            name                  internet
            description           "all internet traffic"
            address               0.0.0.0/0

            access-policy         trusted
                source      trusted
                permission  allow
            exit
            service-policy        NO-LTE
            share-service-routes  false
        exit

        service  example.internet
            name                  example.internet
            description           "www.example.com website"
            domain-name           www.example.com

            access-policy         trusted
                source      trusted
                permission  deny
            exit
            share-service-routes  false
        exit
    exit
exit
```

### AppID and Tenancy

Application Identification service lookups now consider the source tenant. This allows matches to be specific to certain networks/users. For example, the following configuration will now properly classify by tenancy:

```
service internet
   address 0.0.0.0/0
   access-policy tenant1 allow
   access-policy tenant2 allow

service app1.internet
   application-name WorkApp
   access-policy tenant1 allow

service app2.internet
   application-name WorkApp
   access-policy tenant2 allow
```

Traffic learned for WorkApp using `tenant1` will match to `app1.internet`, whereas that using `tenant2` will match to `app2.internet`. This is true for all types of AppId services.

Additionally, AppId child services no longer merge in access-policy entries from the parent service if an access-policy is provisioned on the AppId child. If no access-policy is provisioned, then the parent's policies are inherited.

### AppID using Modules

The last, and arguably most powerful built-in technique for performing application identification is to use a *module* – effectively, a script that is resident on the SSR's host operating system that will generate a JSON file that contains dynamic, ingestible routes. This is extremely flexible, but requires some programming expertise.

:::note
It is also possible to simply place a static JSON document on the SSR's filesystem (i.e., one that is not generated by a local script) as a means of feeding an application identification module into the SSR).
:::

Configuring application identification based on modules first requires that a router have the feature enabled:

```
admin@labsystem1.fiedler# show config running authority router becket application-identification

config

    authority

        router  becket
            name    becket

            application-identification
                mode  module
            exit
        exit
    exit
exit
```

#### Script-Based Module Setup

Scripts are placed on the router's filesystem at `/etc/128technology/application-modules/`. These scripts produce a JSON output stored at `/var/run/128technology/application-modules/`, which in turn is processed by the SSR and installed as FIB entries.

#### Systemd-Based Module Setup

`systemd` may be used to manage the execution of application identification modules. JSON output produced by the module is passed directly to the highway REST API instead of being written to disk.

Using this approach, modules are registered by creating a file at `/etc/128technology/application-modules/services/<module-name>`. This file lists the systemd units of the module and specifies if and how SSR should interact with them.
- `reload-service`: When the highway process starts, reload the systemd unit. This is a signal to POST the JSON to highway again as module data is not saved through process restarts.
- `stop-on-shutdown`: Stop the systemd unit when SSR is shutting down.

Modules must be registered in order for SSR to accept the POST of JSON module data.

In the following example, a systemd timer unit is used to periodically invoke the main service/script, which does the work of gathering module data. Both are stopped on shutdown, but only the timer unit needs to fire again on restart of SSR.
```
[
    {
        "service-name": "office365.timer",
        "reload-service": true,
        "stop-on-shutdown": true
    },
    {
        "service-name": "office365.service",
        "reload-service": false,
        "stop-on-shutdown": true
    }
]
```

For more information about using timers with the systemd service, refer to [ArchLinux systemd/Timers](https://wiki.archlinux.org/title/Systemd/Timers).

#### Viewing Modules

Module registration and detailed module status (including a full list of ip-prefix/ports/protocol) can be accessed via a REST API or from the CLI. Please refer to the API documentation available from the GUI, and the [`show application modules status`](cli_reference.md#show-application-modules-status) and [`show application modules registration`](cli_reference.md#show-application-modules-registration) for full details.

#### Referencing Modules in Configuration

Each module produces a list of service names that are used to reference it in the configuration through the `application-name` list. For example, an application identification module named `zoom` will retrieve and process all of the IP addresses used for the `ZOOM` videoconferencing service. The corresponding service looks like this:

```
admin@labsystem1.fiedler# show config running authority service ZOOM

config

    authority

        service  ZOOM
            name                  ZOOM

            description           "Zoom meetings"
            scope                 private
            application-name      ZOOM

            access-policy         trusted
                source      trusted
                permission  allow
            exit
            share-service-routes  false
        exit
    exit
exit
```

The `application-name` is configured as it is with the `tls` variant of `application-identification`. In this case, however, it will read the contents of a JSON file to produce the FIB entries. Below is an excerpt from the `zoom` module's output:

```
{
  "duration": 86400,
  "services": {
    "ZOOM": [
      {
        "ip-prefix": "3.7.35.0/25"
      },
      {
        "ip-prefix": "3.21.137.128/25"
      },
      {
        "ip-prefix": "3.22.11.0/24"
      },
      ...
    ]
  },
  "module-name": "zoom"
}
```

:::note
In the case of this module, the script that generates the JSON is `/etc/128technology/application-modules/zoom.py`, the output is stored as `/var/run/128technology/application-modules/zoom.json`. A copy of the `zoom.py` script is available on our user community, [AI-Driven SD-WAN powered by Session Smart community](https://community.juniper.net/answers/communities/community-home?CommunityKey=310d1a41-12fa-4627-9a99-880145a7c87c).
:::

The `services` tag of `ZOOM` is what associates these IP prefixes to the service we've shown above. Each of these IP prefixes (which could have also included port ranges, but don't in this example) will create a FIB entry for the `ZOOM` service, and be given access and policy determinations based on the configuration we've set in our SSR.

The SSR ships with an Office365 module, and other modules can be found on [AI-Driven SD-WAN powered by Session Smart community](https://community.juniper.net/answers/communities/community-home?CommunityKey=310d1a41-12fa-4627-9a99-880145a7c87c), our user community, as well as on Github. For more information on writing your own application identification module, refer to our developer documentation or our sample code.
