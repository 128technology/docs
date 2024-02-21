---
title: Static NAT
sidebar_label: Static NAT
---

SSR supports source NAT pool configurations at interface and service-route level as described in [Static NAT Bindings](config_nat_pools#static-nat-bindings). However, this is not always sufficient to enable simple configuration for static bidirectional NAT between two same-sized subnets.

Static NAT defines a one-to-one mapping from one IP subnet to another IP subnet. The mapping includes source IP address translation in one direction and destination IP address translation in the reverse direction. In cases where IP address overlapping is found, such as when merging networks (for example, a corporate acquisition and merger) this simple configuration change is significantly less work than changing all the local IP addresses. The diagram below illustrates this example. 

![Static Nat Diagram](/img/static_nat_example.png)

The `spk-lan2` network-interface is not routable (cannot send or receive traffic) in the `Corp` and `Internet` networks. The client in `spk-lan2` has a local IP within the `192.168.1.0/24` subnet and overlaps with another client from `Corp` in `spk-lan1`. This will cause problems for any sessions between `hub-lan1` or `spk-lan1` to `spk-lan2`. By configuring `bidirectional-nat` on `spk-lan1` and `spk-lan2`, the two `192.168.1.0/24` subnets are mapped to `172.16.128.0/24` and `172.16.129.0/24` respectively and differentiate themselves on the hub router.

`bidirectional-nat` provides value in two ways:
- NAT an unroutable private IP to a routable public IP
- NAT duplicate private IPs (on different routers/networks) to different public IPs to provide differentiation on the receiving end

#### Example

```
config
    authority
        router      spoke
            node       node1-spoke
                device-interface    spk-lan2
                    network-interface    spk-lan2
                        bidirectional-nat    192.168.1.0/24
                            local-ip         192.168.1.0/24
                            remote-ip        172.16.128.0/24
                        exit 
                    exit
                exit
                
                device-interface    spk-lan1
                    network-interface   spk-lan1
                        bidirectional-nat    192.168.1.0/24
                            local-ip         192.168.1.0/24
                            remote-ip        172.16.129.0/24
                        exit 
                    exit
                exit
            exit
        exit
    exit
exit 

```

### Non-SVR Traffic

In order for non-SVR traffic (for example, LAN-to-LAN traffic traversing a single SSR) to take advantage of static-NAT addressing, you must disable egress source-nat at the service level by setting `service > source-nat` to `disabled` as shown below. 

```
authority
    service LAN-to-LAN
        name LAN-to-LAN
        description "LAN-to-LAN non-SVR traffic traversing a single SSR router"
        source-nat disabled
        scope private
        security aes1
        address <dest-lan-subnet>
        access-policy <src-lan-subnet>
            source <src-lan-subnet>
            permission allow
        exit
    exit
exit
```

### Using the GUI

Set the local and remote IP addresses under Authority > Router > Node > Device Interface > Network Interface.

![Network Interface](/img/static_nat_gui_net-intf.png)

![Bidirectional NAT Config](/img/static_nat_gui_nat-config.png)

### Show Commands

For details about command output, refer to the [`show sessions`](cli_reference.md#show-sessions) and [`show sessions by-id`](cli_reference.md#show-sessions-by-id) commands.

#### Source NAT
- On the session ingress node, the `show sessions by-id` output has an Ingress Source NAT field where the source-nat type, NAT’d source address, NAT’d port, and protocol are displayed.

![Session Ingress](/img/source-nat1.png)

- On the session egress node the `show sessions by-id` output has an Ingress Source NAT field where the source-nat type, NAT’d source address, NAT’d port, and protocol are displayed. 

![Session Egress](/img/source-nat2.png)

- The `show sessions` output has `NAT IP` and `NAT Port` columns where the NAT’d source address and NAT’d source port are displayed. 

![NAT IP and Port](/img/source-nat3.png)

#### Destination NAT

- On the session egress node the `show sessions by-id` output shows the NAT’d destination address in the Forward Flow `NextHop` and Reverse Flow `src ip` fields. 

![Destination forward flow](/img/dest-nat1.png)

- The `show sessions` output reverse flow `src ip `column also shows the NAT’d destination address.

![Destination Reverse Flow Source IP](/img/dest-nat2.png)

#### Version History

| Release | Modification |
| ------- | ------------ |
| 6.2.0   | Static NAT Feature Introduced   |