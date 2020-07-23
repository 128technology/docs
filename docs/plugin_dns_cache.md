---
title: DNS Cache Plugin
sidebar_label: DNS Cache
---

The 128T-dns-cache plugin provides a DNS caching service on your 128T router by forwarding all traffic on a configured `ingress-service` and `tenant` to [dnsmasq](http://www.thekelleys.org.uk/dnsmasq/doc.html). By default it uses existing system configuration for nameserver resolution, but supports optionally configuring custom server addresses. The plugin is implemented as a service function chain (SFC) where the DNS traffic received on an ingress interface is detoured through a Kernel Network Interface (KNI) to be cached by `dnsmasq`. A typical flow of the packets for the plugin is illustrated below:

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

| Element | Type    | Description                                                  |
| ------- | ------- | ------------------------------------------------------------ |
| enabled | boolean | Default value: true. Governs whether the DNS cache is operationally enabled or not. |
| name | 128T device name | Default value: `dns-cache`. This controls the name of the service function chain interface.|
| addresses | IPv4 address | Multiple instance object. This will specify the upstream DNS resolvers to use, overriding the ones normally used by the Linux host operating system on the machine. |
| ingress-service | reference | This refers to a configured `service` within the authority that will be used to "trap" inbound DNS requests, to divert them to dnsmasq. Generally, this is a service that has an address of 0.0.0.0/0 and restricted to UDP/53. |
| plugin-network | CIDR | Default value: 169.254.141.128/30. This controls the IP addresses used for the internal SFC network to detour packets to and from the on-board DNS cache. This should only be changed if there is a conflict with another IP block in use on this same host system. |
| tenant | reference | This is the tenant that will be assigned to the SFC interface (of type KNI). All packets leaving the DNS cache and heading toward an upstream DNS resolver will be associated with this tenant. For this reason, it is important that your 128T configuration also includes a `service` that allows this `tenant` to reach the upstream resolvers. Typically, this is an `internet` service (0.0.0.0/0). |
| ingress-source-nat-pool | reference | This refers to a configured `source-nat-pool`, and will be used when forwarding the traffic through the DNS cache/service function chain. |

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

## Third Party Software and Licenses
- dnsmasq (GNU GPL v2, v3)

## Troubleshooting
To verify that the services are running properly on the 128T router:
* `systemctl status 128T-dns-cache-forwarder.service`
* `systemctl status 128T-dns-cache-matcher.service`

Verify that the dns-cache network interface (default `dns-cache-intf`) is UP.

## Release Notes

### Release 1.0.1

#### Issues Fixed
- **PLUGIN-402** Ensure the application restarts with 128T

### Release 2.0.1

#### Issues Fixed
- **PLUGIN-402** Ensure the application restarts with 128T
