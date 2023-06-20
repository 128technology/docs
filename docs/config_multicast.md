---
title: Multicast
sidebar_label: Multicast
---

Multicast is a “one source, many destinations” method of traffic distribution, meaning only the destinations that explicitly indicate their need to receive the information from a particular source receive the traffic stream.

Network applications that can function with unicast but are better suited for multicast include collaborative groupware, teleconferencing, periodic or “push” data delivery (stock quotes, sports scores, magazines, newspapers, and advertisements), server or website replication, and distributed interactive simulation (DIS) such as war simulations or virtual reality. Any IP network concerned with reducing network resource overhead for one-to-many or many-to-many data or multimedia applications with multiple receivers benefits from multicast.

Please refer to the [Juniper Multicast Overview](https://www.juniper.net/documentation/us/en/software/junos/multicast/topics/concept/multicast-ip-overview.html) for more in-depth information about Multicast. 

## Multicast on the SSR 

Multicast on the SSR supports the following protocols and topology: 

- PIM Sparse-Mode
- Static Configuration of RP
- IGMP v2/v3
- Multicast over SVR in Hub and Spoke topology

### Multicast Configuration

:::note
BGP over SVR is a prerequisite for Multicast over SVR.
:::

The following components are necessary to configure multicast on the SSR. Configuration for each of the components is provided below, and a full example configuration is provided at the end of this process. 

- Routing Interface: Specify the BGP over SVR interface
- BGP over SVR: See [BGP over SVR](config_bgp.md#bgp-over-svr-bgposvr) for configuration details. 
- Routing protocol such as IGMPv2/v3
- PIM
- RP
- Tenant: defined as multicast. For additional info about Tenants, see [Tenants](config_tenants.md)
- Service: Services are created for the multicast traffic, and defined for the Group address.
- Access Policy: Allows receivers on the outgoing interfaces
- Multicast sender policy: Allows the sources to send for the Multicast Group (clarify this) 

### Configuration Process

Use the following steps to generate a simple Multicast configuration. 

1. Define the routing default interface.
``` 
           routing               default-instance
                type              default-instance

                interface         loopback
                    name        loopback
                    ip-address  10.5.0.1
                exit
```
2. [BGP over SVR](config_bgp.md#bgp-over-svr-bgposvr). 
```
                routing-protocol  bgp
                    type            bgp
                    local-as        500
                    router-id       10.5.0.1

                    address-family  ipv4-unicast
                        afi-safi  ipv4-unicast

                        network   10.5.1.0/24
                            network-address  10.5.1.0/24
                        exit

                        network   10.5.2.0/24
                            network-address  10.5.2.0/24
                        exit
                    exit

                    neighbor        16.0.0.2
                        neighbor-address  16.0.0.2
                        neighbor-as       1
                        description       "BGP over SVR to Gateway"

                        transport

                            local-address
                                routing-interface  loopback
                            exit
                        exit

                        multihop
                            ttl  5
                        exit
                    exit
                exit
```
3. Add the routing protocol (IGMP) that defines an interface and IGMP version, as well as the IGMP Joined Group.
```
				    igmp

                    interface  Boston lan1
                        node       Boston
                        interface  lan1

                        join       226.0.0.10
                            group  226.0.0.10
                        exit

                        join       226.0.0.11
                            group   226.0.0.11
                            source  10.111.1.7
                        exit

                        join       226.0.0.40
                            group  226.0.0.40
                        exit

                        join       226.0.0.140
                            group  226.0.0.140
                        exit

                        join       226.0.0.41
                            group  226.0.0.41
                        exit

                        join       227.0.0.100
                            group  227.0.0.100
                        exit
                    exit

                    interface  Boston lan2
                        node       Boston
                        interface  lan2

                        join       226.0.0.10
                            group  226.0.0.10
                        exit

                        join       226.0.0.11
                            group   226.0.0.11
                            source  10.111.1.7
                        exit

                        join       226.0.0.140
                            group  226.0.0.140
                        exit
                    exit
                exit
```
4. Define the PIM and RP.
```
                pim

                    interface  Boston lan1
                        node       Boston
                        interface  lan1
                    exit

                    interface  Boston lan2
                        node       Boston
                        interface  lan2
                    exit

                    rp         226.0.0.0/24
                        address      172.16.111.6
                        group-range  226.0.0.0/24
                    exit

                    rp         227.0.0.0/24
                        address      10.111.1.6
                        group-range  227.0.0.0/24
                    exit
                exit
            exit
```
5. Define the Multicast Tenant.
```
        tenant             multicast
            name  multicast
        exit
```
6. Create the Service. 
```
        service            customerA-mc
            name                     customerA-mc
            security                 aes1
            address                  224.0.0.0/4
```
7. Add an Access policy: An access policy is not required, however if an access policy is not specifically configured, then all interfaces will allow "joins".
```
            access-policy  customerA-mc
                source  customerB
            exit
```
8. Multicast sender policy: Name the policy, and indicate the source.
```
            multicast-sender-policy  multicast
                source  multicast
            exit
        exit
```

## Show Commands

Each of the commands listed below and the subcommands for each, provide additional details for multicast visibility. Use the links to learn more about each command.

| Command | Description |
| ------- | ----------- |
| [show igmp interface](cli_reference.md#show-igmp-interface) | Display the igmp interfaces | 
| [show igmp groups](cli_reference.md#show-igmp-groups) | Display the igmp groups | 
| [show pim mroute](cli_reference.md#show-pim-mroute) | Display the PIM mroute | 
| [show pim interface](cli_reference.md#show-pim-interface) | Display the PIM interface | 
| [show pim join](cli_reference.md#show-pim-join) | Display the PIM Joins | 
| [show pim neighbor](cli_reference.md#show-pim-neighbor) | Display the PIM neighbor |
| [show pim rp-info](cli_reference.md#show-pim-rp-info) | Display the PIM RP info | 
| [show pim state](cli_reference.md#show-pim-state) | Display the PIM state | 

:::note
Each show command allows a vrf option:
`show ip igmp [vrf <vrfname>]` 
:::


