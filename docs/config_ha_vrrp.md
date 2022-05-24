---
title: Configuring Dual Router High Availability and VRRP
sidebar_label: Dual Router High Availability and VRRP
---

The release of the 5.4 software includes VRRP as a configuration option, as well as a new service route parameter, [`enable-failover`](#enable-service-route-failover), to provide failover across multiple service-routes that have this flag set. 

The following sample configuration provides context for using vrrp and enabling service route failover to provide failover on a dual router high availability configuration. 

## Configure the Primary Router

Identify the primary router, and configure the following settings.

- Peer
- VRRP and priority on the interfaces
- Enable failover and set priority on the service routes

The configuration for the secondary router will be similar but not identical. 

### Assign the Peer
On the primary router, assign the peer router to which the primary will failover. 

```
config
    authority
        router          router-a
            name                  router-a
            location              "router-a Philadephia"
            location-coordinates  +39.9526-75.1652/
            inter-node-security   internal

            peer                router-b
                name            router-b
                authority-name  Authority128
                router-name     router-b
```

### Configure VRRP

Configure node1 on router-a with the following interfaces:
- lan
- wan
- far (the inter-router communication link)

Activate VRRP on the `lan` device interface of node1. By configuring `router-a` with a higher VRRP priority (100), `router-a` is identified as the primary router. We will configure `router-b` as the secondary router.

```
			node                  node1
                name                      node1
                asset-id                  f1305f6b-44c3-4b1e-b887-7376efc974d7
                role                      combo
                asset-validation-enabled  false

                device-interface          lan
                    name               lan
                    type               ethernet
                    pci-address        0000:00:04.0

                    vrrp
                        enabled                 true
                        vrid                    128
                        priority                100
                    exit

                    network-interface  lan
                        name          lan
                        global-id     1
                        tenant        red
                        source-nat    false
                        qp-value      30
                        mtu           1500

                        address       172.16.1.2
                            ip-address     172.16.1.2
                            prefix-length  24
                        exit
                        address       172.16.1.111
                            ip-address     172.16.1.111
                            prefix-length  24
                        exit
                    exit
                exit

                device-interface          wan
                    name               wan
                    type               ethernet
                    pci-address        0000:00:05.0

                     network-interface  wan
                        name                   wan
                        global-id              3
                        inter-router-security  aes1
                        source-nat             false
                        qp-value               30
                        mtu                    1500

                        address                172.16.2.111
                            ip-address     172.16.2.111
                            prefix-length  24
                        exit
                    exit
                exit

                device-interface          far
                    name               far
                    type               ethernet
                    pci-address        0000:00:06.0

                    network-interface  far
                        name                   far
                        global-id              2

                        neighborhood           peer
                            name               peer
                            peer-connectivity  bidirectional
                            topology           mesh
                            vector             peer
                        exit
                        inter-router-security  aes1
                        source-nat             false
                        qp-value               30
                        mtu                    1500

                        address                172.16.3.2
                            ip-address     172.16.3.2
                            prefix-length  24
                        exit
                    exit
                exit
            exit
```

### Enable Service Route Failover

Set `enable-failover` to true. This will enable failover between service routes on router-a.  

```
			service-route        local-route
                name             local-route
                service-name     traffic
                vector           local-vrrp
                enable-failover  true

                next-hop         node1 wan
                    node-name    node1
                    interface    wan
                exit
            exit

            service-route        peer-route
                name             peer-route
                service-name     traffic
                vector           peer
                enable-failover  true
                next-peer        router-b
            exit
```

Assign a vector to the service route, and then assign a priority to the vector in the service policy. This priority determines service route preference, with the higher priority being the preferred route. 

:::note
Vector priority is assigned in descending order; the lowest number has the highest priority. To assign vector `local-vrrp` the highest priority, it is assigned a value of 1. Vector `peer` has a **lower priority** of 10.  
:::

```
		service-policy      poc-policy
            name            poc-policy
            service-class   Standard

            vector          local-vrrp
                name        local-vrrp
                priority    1
            exit

            vector          peer
                name        peer
                priority    10
            exit

            session-resiliency    revertible-failover
            peer-path-resiliency  true
            path-quality-filter   true
            max-loss              0.5
            max-latency           250
            max-jitter            100
        exit
```

Configuring session resiliency allows the traffic to fail back to the primary service route once the service-route is operational again. The max-loss, max-latency, and max-jitter settings will determine at what point failover happens. 

## Configure the Secondary Router

Identify the secondary router, and configure the following settings.

- Peer
- VRRP and priority on the interfaces
- Enable failover and set priority on the service routes

The differences for the secondary router are the priority values. 

### Assign the Peer
On the secondary router, assign the peer router to which the secondary router will failover when service to the primary router has been restored. 

```
		router          router-b
            name                  router-b
            location              "router-b New York"
            location-coordinates  +40.7128-074.0059/
            inter-node-security   internal

            peer                  router-a
                name            router-a
                authority-name  Authority128
                router-name     router-a
            exit
```

### Configure VRRP

Configure node1 on router-b with the following interfaces:
- lan
- wan
- far (this is the inter-router communication link)

Activate VRRP on the `lan` device interface of node1. Configuring a lower VRRP priority (97) on the `lan` interface of router-b, identifies router-b as the secondary router. On a dual router HA setup, the vrids must be the same on the two redundant/VRRP devices - `router-a` and `router-b` `lan` device interfaces must have the same vrid.

```
            node                  node1
                name                      node1
                asset-id                  8100f73d-2071-47c3-86cb-07eba002b698
                role                      combo
                asset-validation-enabled  false

                device-interface          lan
                    name               lan
                    type               ethernet
                    pci-address        0000:00:04.0

                    vrrp
                        enabled                 true
                        vrid                    128
                        priority                97
                    exit

                    network-interface  lan
                        name          lan
                        global-id     4
                        tenant        red
                        source-nat    false
                        qp-value      30
                        mtu           1500

                        address       172.16.1.2
                            ip-address     172.16.1.2
                            prefix-length  24
                        exit

                        address       172.16.1.111
                            ip-address     172.16.1.111
                            prefix-length  24
                        exit
                    exit
                exit

                device-interface          wan
                    name               wan
                    type               ethernet
                    pci-address        0000:00:05.0

                    network-interface  wan
                        name                   wan
                        global-id              6
                        inter-router-security  aes1
                        source-nat             false
                        qp-value               30
                        mtu                    1500

                        address                172.16.2.111
                            ip-address         172.16.2.111
                            prefix-length      24
                        exit
                    exit
                exit

                device-interface       far
                    name               far
                    type               ethernet
                    pci-address        0000:00:06.0

                    network-interface  far
                        name                   far
                        global-id              5

                        neighborhood           peer
                            name               peer
                            peer-connectivity  bidirectional
                            topology           mesh
                            vector             peer
                        exit
                        inter-router-security  aes1
                        source-nat             false
                        qp-value               30
                        mtu                    1500

                        address                172.16.3.3
                            ip-address         172.16.3.3
                            prefix-length      24
                        exit
                    exit
                exit
            exit
```

### Enable Service Route Failover

To preserve session state between routers, configure the following service routes. Set `enable-failover` to true.

```
			service-route        local-route
                name             local-route
                service-name     traffic
                vector           local-vrrp
                enable-failover  true

                next-hop         node1 lan
                    node-name    node1
                    interface    lan
                exit
            exit

            service-route        peer-route
                name             peer-route
                service-name     traffic
                vector           peer
                enable-failover  true
                next-peer        router-a
            exit
```

Assign a vector to the service route, and then assign a priority to the vector in the service policy. This priority determines service route preference, with the higher priority being the preferred route. 

:::note
Vector priority is assigned in descending order; the lowest number has the highest priority. To assign vector `local-vrrp` the highest priority, it is assigned a value of 1. Vector `peer` has a **lower priority** of 10.  
:::

```
		service-policy      poc-policy
            name            poc-policy
            service-class   Standard

            vector          local-vrrp
                name        local-vrrp
                priority    1
            exit

            vector          peer
                name        peer
                priority    10
            exit

            session-resiliency    revertible-failover
            peer-path-resiliency  true
            path-quality-filter   true
            max-loss              0.5
            max-latency           250
            max-jitter            100
        exit
```

Configuring session resiliency allows the traffic to fail back to the primary service route once the service route is operational again. The max-loss, max-latency, and max-jitter settings will determine at what point failover happens.

### Show Command for VRRP Status

VRRP redundancy status (vrrp-active/standby) is displayed in the `show device-interface` output.

```
========================================
 test1:10
========================================
 Type:                ethernet
 Forwarding:          true
 PCI Address:         0000:00:04.0
 MAC Address:         fa:16:3e:96:e3:ef

 Admin Status:        up
 Operational Status:  up
 Provisional Status:  up
 Redundancy Status:   vrrp-active
```

## Sample VRRP Configuration

The steps above illustrate the differences in a high availability configuration, but do not comprise a full config. The full sample configuration is provided below for your reference. 

```
config
    authority
        router          router-a
            name                  router-a
            location              "router-a Philadephia"
            location-coordinates  +39.9526-75.1652/
            inter-node-security   internal

            peer                router-b
                name            router-b
                authority-name  Authority128
                router-name     router-b
            exit

            node                  node1
                name                      node1
                asset-id                  f1305f6b-44c3-4b1e-b887-7376efc974d7
                role                      combo
                asset-validation-enabled  false

                device-interface          lan
                    name               lan
                    type               ethernet
                    pci-address        0000:00:04.0

                    vrrp
                        enabled                 true
                        vrid                    128
                        priority                100
                    exit
                    network-interface  lan
                        name          lan
                        global-id     1
                        tenant        red
                        source-nat    false
                        qp-value      30
                        mtu           1500

                        address       172.16.1.2
                            ip-address     172.16.1.2
                            prefix-length  24
                        exit
                        address       172.16.1.111
                            ip-address     172.16.1.111
                            prefix-length  24
                        exit
                    exit
                exit

                device-interface          wan
                    name               wan
                    type               ethernet
                    pci-address        0000:00:05.0

                    network-interface  wan
                        name                   wan
                        global-id              3
                        inter-router-security  aes1
                        source-nat             false
                        qp-value               30
                        mtu                    1500

                        address                172.16.2.111
                            ip-address     172.16.2.111
                            prefix-length  24
                        exit
                    exit
                exit

                device-interface          far
                    name               far
                    type               ethernet
                    pci-address        0000:00:06.0

                    network-interface  far
                        name                   far
                        global-id              2

                        neighborhood           peer
                            name               peer
                            peer-connectivity  bidirectional
                            topology           mesh
                            vector             peer
                        exit
                        inter-router-security  aes1
                        source-nat             false
                        qp-value               30
                        mtu                    1500

                        address                172.16.3.2
                            ip-address     172.16.3.2
                            prefix-length  24
                        exit
                    exit
                exit
            exit

            service-route         local-route
                name             local-route
                service-name     traffic
                vector           local-vrrp
                enable-failover  true

                next-hop         combo lan
                    node-name  combo
                    interface  lan
                exit
            exit

            service-route         peer-route
                name             peer-route
                service-name     traffic
                vector           peer
                enable-failover  true
                next-peer        router-b
            exit
        exit

        router          router-b
            name                  router-b
            location              "router-b New York"
            location-coordinates  +40.7128-074.0059/
            inter-node-security   internal

            peer                  router-a
                name            router-a
                authority-name  Authority128
                router-name     router-a
            exit

            node                  node1
                name                      node1
                asset-id                  8100f73d-2071-47c3-86cb-07eba002b698
                role                      combo
                asset-validation-enabled  false

                device-interface          lan
                    name               lan
                    type               ethernet
                    pci-address        0000:00:04.0

                    vrrp
                        enabled                 true
                        vrid                    128
                        priority                99
                    exit

                    network-interface  lan
                        name          lan
                        global-id     4
                        tenant        red
                        source-nat    false
                        qp-value      30
                        mtu           1500

                        address       172.16.1.2
                            ip-address     172.16.1.2
                            prefix-length  24
                        exit

                        address       172.16.1.111
                            ip-address     172.16.1.111
                            prefix-length  24
                        exit
                    exit
                exit

                device-interface          wan
                    name               wan
                    type               ethernet
                    pci-address        0000:00:05.0

                    network-interface  wan
                        name                   wan
                        global-id              6
                        inter-router-security  aes1
                        source-nat             false
                        qp-value               30
                        mtu                    1500

                        address                172.16.2.111
                            ip-address         172.16.2.111
                            prefix-length      24
                        exit
                    exit
                exit

                device-interface       far
                    name               far
                    type               ethernet
                    pci-address        0000:00:06.0

                    network-interface  far
                        name                   far
                        global-id              5

                        neighborhood           peer
                            name               peer
                            peer-connectivity  bidirectional
                            topology           mesh
                            vector             peer
                        exit
                        inter-router-security  aes1
                        rewrite-dscp           false
                        source-nat             false
                        qp-value               30
                        mtu                    1500

                        address                172.16.3.3
                            ip-address         172.16.3.3
                            prefix-length      24
                        exit
                    exit
                exit
            exit

            service-route        local-route
                name             local-route
                service-name     traffic
                vector           local-vrrp
                enable-failover  true

                next-hop         combo lan
                    node-name    combo
                    interface    lan
                exit 
            exit

            service-route         peer-route
                name             peer-route
                service-name     traffic
                vector           peer
                enable-failover  true
                next-peer        router-a
            exit
        exit

        security        aes1
            name               aes1
            hmac-cipher        sha256
            hmac-key           (removed)
            encryption-cipher  aes-cbc-256
            encryption-key     (removed)
            encryption-iv      (removed)
            encrypt            false
            hmac               false
        exit

        service         traffic
            name            traffic
            service-group   all
            description     "traffic service for all"
            enabled         true
            tenant          red
            scope           private
            security        aes1

            transport       udp
                protocol    udp

                port-range  443
                    start-port  443
                exit
            exit
            address         172.16.2.0/24

            access-policy   172.16.1.0/24
                source      172.16.1.0/24
                permission  allow
            exit
            service-policy  poc-policy
        exit

        service-policy      poc-policy
            name            poc-policy
            service-class   Standard

            vector          local-vrrp
                name        local-vrrp
                priority    1
            exit

            vector          peer
                name        peer
                priority    10
            exit

            session-resiliency    revertible-failover
            peer-path-resiliency  true
            path-quality-filter   true
            max-loss              0.5
            max-latency           250
            max-jitter            100
        exit

        session-type    ping
            name           ping
            service-class  Standard

            transport      icmp
                protocol  icmp
            exit
        exit
    exit
exit

```

The following is a config snippet to support vrrp with vlan. The vrrp network-interface with a vlan tag matching the one in the vrrp config will be used for sending out VRRP advertisements.

:::important
The network-interface must have a static IP address.
:::
```
config
    authority
        router    Fabric128
            name              Fabric128
            node              test1
                name              test1
                enabled           true
                device-interface  dev
                    name               dev
                    type               ethernet
                    pci-address        0000:00:05.0
                    vrrp
                        enabled                 true
                        vlan                    1
                        vrid                    128
                        priority                100
                        advertisement-interval  1000
                    exit
                    network-interface  intf1
                        name          intf1
                        vlan          0
                        type          external
                        dhcp          v4
                    exit
                    network-interface  intf2
                        name          intf2
                        vlan          1
                        type          external
                        address       172.16.3.1
                            ip-address     172.16.3.1
                            prefix-length  24
                            gateway        172.16.3.10
                        exit
                    exit
                exit
            exit
            node              test2
                name              test2
                enabled           true
                device-interface  dev
                    name               dev
                    type               ethernet
                    pci-address        0000:00:05.0
                    vrrp
                        enabled                 true
                        vlan                    1
                        vrid                    128
                        priority                99
                        advertisement-interval  1000
                    exit
                    network-interface  intf1
                        name          intf1
                        vlan          0
                        type          external
                        dhcp          v4
                    exit
                    network-interface  intf2
                        name          intf2
                        vlan          1
                        type          external
                        address       172.16.3.1
                            ip-address     172.16.3.1
                            prefix-length  24
                            gateway        172.16.3.10
                        exit
                    exit
                exit
            exit
        exit
    exit
exit
```
