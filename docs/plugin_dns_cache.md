---
title: DNS Cache Plugin
sidebar_label: DNS Cache
---

The 128T-dns-cache plugin provides a DNS caching service on your 128T router by forwarding all traffic on a configured `ingress-service` and `tenant` to [dnsmasq](http://www.thekelleys.org.uk/dnsmasq/doc.html). By default it uses existing system configuration for nameserver resolution, but supports optionally configuring custom server addresses. The plugin is implemented as a [service function chain](plugin_intro.md#service-function-chaining) (SFC) where the DNS traffic received on an ingress interface is detoured through a [Kernel Network Interface](concepts_kni.md) (KNI) to be cached by `dnsmasq`. A typical flow of the packets for the plugin is illustrated below:

lan-intf (lan-tenant) > `ingress-service` > `dnsmasq` > dns-kni (`tenant`) > egress-service > wan-intf

By enabling this plugin, you can provide DNS caching with fast resolution times to your network.

:::note
The instructions for installing and managing the plugin can be found [here](plugin_intro.md#installation-and-management).
:::

## Configuration

Assuming the below 128T configuration:
```
config
    authority
        name Authority128
        conductor-address labconductor.acme.com
        tenant dns-cache-plugin
            name dns-cache-plugin
        exit
        tenant lan-clients
            name lan-clients
            security aes1
        exit
        service internet
            name internet
            security internal
            address 0.0.0.0/0
            access-policy lan-clients
                source lan-clients
                permission allow
            exit
            access-policy dns-cache-plugin
                source dns-cache-plugin
                permission allow
            exit
            share-service-routes false
        exit
        service dns-catcher
            name dns-catcher
            transport udp
                protocol udp
                port-range 53
                    start-port 53
                exit
            exit
            address 0.0.0.0/0
            access-policy lan-clients
                source lan-clients
                permission allow
            exit
        exit
        router labrouter
            name labrouter
            node node1
                name node1
                role combo
                device-interface LAN
                    name LAN
                    network-interface vlan0
                        name vlan0
                        tenant lan-clients
                        dhcp v4
                    exit
                exit
            exit
        exit
    exit
exit
```

We can apply the following DNS cache plugin configuration:
```
config
    authority
        router lab-router
            name lab-router
            dns-cache
                enabled true
                tenant dns-cache-plugin
                ingress-service dns-catcher
            exit
        exit
    exit
exit
```

| Element | Type    | Default | Description                                                  |
| ------- | ------- | -------| ------------------------------------------------------------ |
| enabled | boolean | true | Governs whether the DNS cache is operationally enabled or not. |
| name | 128T device name | `dns-cache`| This controls the name of the service function chain interface.|
| addresses | IPv4 address | N/A | Multiple instance object. This will specify the upstream DNS resolvers to use, overriding the ones normally used by the Linux host operating system on the machine. |
| ingress-service | reference | N/A | This refers to a configured `service` within the authority that will be used to "trap" inbound DNS requests, to divert them to dnsmasq. Generally, this is a service that has an address of 0.0.0.0/0 and restricted to UDP/53. |
| plugin-network | CIDR | 169.254.141.128/30 | This controls the IP addresses used for the internal SFC network to detour packets to and from the on-board DNS cache. This should only be changed if there is a conflict with another IP block in use on this same host system. |
| tenant | reference | N/A | This is the tenant that will be assigned to the SFC interface (of type KNI). All packets leaving the DNS cache and heading toward an upstream DNS resolver will be associated with this tenant. For this reason, it is important that your 128T configuration also includes a `service` that allows this `tenant` to reach the upstream resolvers. Typically, this is an `internet` service (0.0.0.0/0). |
| ingress-source-nat-pool | reference | N/A | This refers to a configured `source-nat-pool`, and will be used when forwarding the traffic through the DNS cache/service function chain. |
| max-ttl | seconds | 1500 | The configured maximum TTL will be advertised to clients instead of the true TTL value if it is lower. The true TTL value is however kept in the cache to avoid flooding the upstream DNS servers. See [release notes for details](#release-120-220) |

### Notes about the Sample Configuration

The `ingress-service` we have configured is `dns-catcher`. This is a simple service that matches any IP address (0.0.0.0/0) and has a destination protocol and port of UDP/53. Our `dns-catcher` service is set to allow the `lan-clients` tenant (which is assigned to the LAN `network-interface`), so any traffic arriving on this interface destined for UDP/53 will be detoured to the DNS cache.

The DNS cache will either respond locally (if there's an existing cache entry), or will forward the request to an upstream resolver. For the latter case, it will reenter the 128T's forwarding plane via the KNI interface (a.k.a. the "service function chain" interface) and be affiliated with the `tenant` named `dns-cache-plugin`.

Once in the 128T's data plane, this traffic will match the `internet` service (we've added an `allow` statement for the `dns-cache-plugin` tenant), and be forwarded out to the upstream server(s).

### Custom DNS Servers

To configure custom server addresses for dnsmasq instead of the ones affiliated with the host machine that the plugin is running on, add the `addresses` field:

```
dns-cache
    enabled          true
    addresses        1.1.1.1
    addresses        2.2.2.2
    tenant           dns-cache-plugin
    ingress-service  dns-catcher
exit
```

### Redirecting and blocking domains

##### Version History

| Release      | Modification                                    |
| ------------ | ----------------------------------------------- |
| 1.1.0, 2.1.0 | `dns-cache > redirect-domains` and `dns-cache > block-domains` were introduced |

The DNS cache plugin will send all requests it processes to the list of servers provided in its configuration. Generally, these are configured as public DNS servers. However, many enterprises commonly host their own authoritative name server for their own domain (e.g., some-private-domain.com). The redirect-domains configuration lets administrators specify a distinct DNS server for a given domain, and 128T will use this when issuing queries for any host within that domain.


``` config
config

    authority

        router  router1
            name       router1

            dns-cache
                enabled true
                tenant dns-cache-plugin
                ingress-service dns-catcher

                redirect-domains  some-private-domain.com
                    domain   some-private-domain.com
                    address  192.168.8.8
                exit
                block-domains     block-domain.com
            exit
        exit
    exit
exit
```

The `block-domains` configuration allows the DNS server to block those domains by replying back with NXDOMAIN indicating that the domain name doesn't exist.

### Custom Options

##### Version History

| Release | Modification                                    |
| ------------ | ----------------------------------------------- |
| 3.3.1   | `dns-cache > custom-options` was introduced |

The `custom-options` allows the user to configure additional dnsmasq options that are not exposed as support configuration options.

```config {10-13}
config

    authority

        router  router
            name       router

            dns-cache

                custom-options  domain-needed
                    name   domain-needed
                    value  yes
                exit
            exit
        exit
    exit
exit
```

| Config   | Description                          |
| -------- | ------------------------------------ |
| name     | The name of the dnsmasq option     |
| value    | The value of the option              |

:::warning
The `custom-option` is added to the dnsmasq config file; any invalid option could prevent the application from starting up.
:::


## Third Party Software and Licenses
- dnsmasq (GNU GPL v2, v3)

## Troubleshooting
To verify that the services are running properly on the 128T router:
* `systemctl status 128T-dns-cache-forwarder.service`
* `systemctl status 128T-dns-cache-matcher.service`

Verify that the dns-cache network interface (default `dns-cache-intf`) is UP.

## Release Notes

:::warning
The plugin must be updated to version 3.2.1 or later prior to [upgrading the conductor to SSR version 5.4.0.](intro_upgrade_considerations.md#plugin-config-generation-changes)
:::

### Release 3.4.0

**Release Date:** May 13, 2022

#### New Features and Improvements

- **PLUGIN-1611** Improve HA support for DNS based app-id

The DNS cache plugin is enhanced to synchronize the cache between HA nodes to allow the DNS app-id plugin to consume and process DNS records on both nodes.

### Release 3.3.1

**Release Date:** Apr 29, 2022

#### New Features and Improvements

- **PLUGIN-1208** Enhance DNS Cache Plugin with An Advanced field

Added support for new custom dnsmasq options that are otherwise not provided via direct configuration.

#### Issues Fixed
- **PLUGIN-1707** dns-cache service stops working

  _**Resolution:**_ The salt states were made more robust to handle certain failure conditions better. In addition, the router will monitor the status of the dns service and restart it as necessary.

### Release 3.2.2

#### Issues Fixed

- **PLUGIN-1452** The dns-app-id plugin has lot of failures on system startup

  _**Resolution:**_ The dns-app-id plugin will wait for dns-cache components to be initialized and running before starting up

- **PLUGIN-1480** Large configuration was causing plugin config generation to fail

  _**Resolution:**_ The config generation logic for the plugin will handle config with long lines correctly

### Release 3.2.1

#### Issues Fixed

- **PLUGIN-1461**  Config generation for the plugin failing in the Bonsai mode

  _**Resolution:**_ Correctly handle the config generation for routers where the DNS cache plugin is not enabled during bonsai config generation

- **PLUGIN-1367**  DNS cache services constantly fail on system startup

  _**Resolution:**_ The DNS cache systemd services will be deferred until the 128T services are running and stable.

### Release 3.1.0

#### Issues Fixed

- **PLUGIN-768** Support the DNS Cache plugin in 128T versions `5.1.0` and greater.

### Release 1.2.0, 2.2.0

#### Issues Fixed
- **PLUGIN-952** FIB entry for dns-app-id based applications was deleted before the advertised TTL causing traffic to be blackholed

  _**Resolution:**_ The TTL value advertised to the clients is made configurable and is also set to 1500 seconds by default to match the internal DNS cache timers.

### Release 1.1.0, 2.1.0

#### New Features and Improvements

- **PLUGIN-641** Provide support for redirecting and blocking domains

Added support for redirecting domains to a different upstream domain server. In addition, added support for blocking domains that the user should not be able to access.

#### Issues Fixed

- **PLUGIN-684** DNS cache plugin fails to apply configuration on initial installation

  _**Resolution:**_ Make config handling on the router dependent on a successful plugin router RPM installation.

### Release 1.0.1, 2.0.1

#### Issues Fixed
- **PLUGIN-402** Ensure the application restarts with 128T
