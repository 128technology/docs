---
title:  Source and Destination NAT
sidebar_label: Source and Destination NAT
---
## Source NAT

Source NAT can be enabled on `authority > router > node > network-interface`. When enabling `source-nat` on a network-interface, all traffic egressing the interface will be network address and port translated (NAPT) to the address on the interface.

:::note
The port range is not configurable and ranges between 16384 to 65534, allowing for 49,151 concurrent sessions per interface.
:::

```
admin@gouda.novigrad# show config running authority router novigrad node gouda device-interface wan network-interface wan-interface 

config

    authority

        router  novigrad
            name  novigrad

            node  gouda
                name              gouda

                device-interface  wan
                    name               wan

                    network-interface  wan-interface
                        name                    wan-interface
                        global-id               1
                        vlan                    0
                        type                    external
                        conductor               false

                        neighborhood            internet
                            name  internet
                        exit
                        inter-router-security   interfabric
                        prioritization-mode     local
                        source-nat              true
                        mtu                     1500
                        enforced-mss            disabled
                        icmp                    allow
                        hostname                gouda.novigrad.net
                        multicast-listeners     automatic
                        multicast-report-proxy  false
                        dhcp disabled
                        address 192.168.1.101
                            ip-address 192.168.1.101
                            prefix-length 24
                            gateway 192.168.1.1
                        exit
                        address 192.168.1.102
                            ip-address 192.168.1.102
                            prefix-length 24
                            gateway 192.168.1.1
                        exit
                    exit
                exit
            exit
        exit
    exit
exit
```

If support for more than 49,150 concurrent sessions per interface is needed, you can configure a [NAT Pool](config_nat_pools.md) or add additional `addresses` to the `network-interface`, expanding the source NAT capacity.

When multiple addresses are configured using `source-nat`, the next configured address is utilized **only after the first is fully exhausted**. Each configured address is used until it is exhausted.

## Destination NAT

Static desination network address translation can be performed by configuring a `service-route > nat-target`. It is common to leverage the public address of the router for internal services, such as VPN. Traffic destined to the SSR, configured as a _service_ with an _address_ that matches that of the public-facing network-interface is then NATed to an internal private address on the LAN for the application. This setting only performs address translation and does not modify the port.

```
config
    authority
       name ssr-128
       service vpn
           name vpn
           description "vpn access to internal application"
           address 10.10.10.2
           transport tcp
               protocol tcp
               port-range 5000
                   start-port 5000
               exit
           exit
       exit
       router ssr-router
           name ssr-router
           node ssr-node
               name ssr-node
               device-interface wan
                   name wan
                   network-interface wan
                       name wan
                       address 10.10.10.2
                           ip-address 10.10.10.2
                           prefix-length 24
                           gateway 10.10.10.1
                       exit
                   exit
               exit
               device-interface lan
                   name lan
                   network-interface lan
                       name lan
                       address 192.168.1.2
                           ip-address 192.168.1.2
                           prefix-length 24
                           gateway 192.168.1.1
                       exit
                   exit
               exit
           exit
           service-route dest-nat-route
               name dest-nat-route
               service-name vpn
               nat-target 192.168.1.101
               next-hop ssr-node lan
                   node-name ssr-node
                   interface lan
               exit
           exit
       exit
   exit
exit
```