---
title: DNS Cache Plugin
sidebar_label: DNS Cache
---

The 128T-dns-cache plugin provides a DNS caching service on your 128T router by forwarding all traffic on a configured `ingress-service` and `tenant` to `dnsmasq`. By default it uses existing system configuration for nameserver resolution but supports optionally configuring custom server addresses.

By enabling this plugin, you can provide DNS caching with fast resolution times to your network.

## Installation

The following versions are available for corresponding 128T software versions:

| DNS Cache | 128T |
| --- | --- |
| 128T-dns-cache-1.0.0 | 128T >= 3.2.8; 128T < 4.3.0 |
| 128T-dns-cache-2.0.0 | 128T >= 4.3.0 |

:::important
It is recommended to use the conductor GUI > Plugins page for installing plugins. This allows the system to select the correct version of plugin based on the 128T version.
:::

:::important
After installing the plugin, the 128T service on the conductor should be restarted for the changes to take effect.
::::

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

## Thirdparty Software & Licenses
- dnsmasq (GNU GPL v2, v3)

## Troubleshooting
To verify that the services are running properly on the 128T router:
* `systemctl status 128T-dns-cache-forwarder.service`
* `systemctl status 128T-dns-matcher.service`

Verify that the dns-cache network interface (default `dns-cache-intf`) is UP.
