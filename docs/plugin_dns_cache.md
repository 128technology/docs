---
title: DNS Cache Plugin
sidebar_label: DNS Cache
---

The 128T-dns-cache plugin provides a DNS caching service on your 128T router by forwarding all traffic on a configured `ingress-service` and `tenant` to [dnsmasq](http://www.thekelleys.org.uk/dnsmasq/doc.html). By default it uses existing system configuration for nameserver resolution but supports optionally configuring custom server addresses. The plugin is implemented as a service function chain (SFC) where the DNS traffic received on an ingress interface is detoured through a Kernel Network Interface (KNI) to be cached by `dnsmasq`. A typical flow of the packets for the plugin is illustrated below:

lan-intf (lan-tenant) > `ingress-service` > `dnsmasq` > dns-kni (`tenant`) > egress-service > wan-intf

By enabling this plugin, you can provide DNS caching with fast resolution times to your network.

:::note
The instructions for installing and managing the plugin can be found [here](plugin_intro#installation-and-management).
:::

## Configuration

Assuming the below 128T configuration:
```
config
    authority
        name Authority128
        conductor-address ${DUT1_MGMT}
        tenant dns
            name dns
        exit
        tenant lan
            name lan
            security aes1
        exit
        tenant wan
            name wan
            security aes1
        exit
        service internet
            name internet
            security internal
            address 0.0.0.0/0
            access-policy _internal_
                source _internal_
                permission allow
            exit
            access-policy lan
                source lan
                permission allow
            exit
            access-policy wan
                source wan
                permission allow
            exit
            access-policy dns
                source dns
                permission allow
            exit
            share-service-routes false
        exit
        service dns
            name dns
            transport udp
                protocol udp
                port-range 53
                    start-port 53
                exit
            exit
            address 0.0.0.0/0
            access-policy _internal_
                source _internal_
            exit
        exit
        router ${DUT2_ROUTER}
            name ${DUT2_ROUTER}
            node ${DUT2_NODE_NAME}
                name ${DUT2_NODE_NAME}
                role combo
                device-interface inband-mgmt
                    name inband-mgmt
                    pci-address ${DUT2_MGMT_PCI}
                    network-interface inband-mgmt-intf
                        name inband-mgmt-intf
                        conductor true
                        tenant wan
                        source-nat true
                        dhcp v4
                        host-service web
                            service-type web
                        exit
                        host-service ssh
                            service-type ssh
                        exit
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
        router ${DUT2_ROUTER}
            name ${DUT2_ROUTER}
            dns-cache
                enabled true
                tenant dns
                ingress-service dns
            exit
        exit
    exit
exit
```

To configure custom server addresses for dnsmasq, add the `addresses` field:
```
dns-cache
    enabled          true
    addresses        1.1.1.1
    addresses        2.2.2.2
    tenant           dns
    ingress-service  dns
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
