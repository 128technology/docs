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
- PIM Source-Specific Multicast (PIM-SSM)
- Static Configuration of RP
- IGMP v2/v3
- Multicast over SVR in Hub and Spoke topology

### Multicast Configuration

:::note
In order to support Multicast over SVR, the BGP over SVR configuration is used in conjunction with the PIM configuration to generate auto-provisioned services and service-paths. BGP over SVR must be provisioned to support the Multicast feature. See [BGP over SVR](config_bgp.md#bgp-over-svr-bgposvr) for configuration details. 
:::

The following are the components necessary to configure multicast over SVR on the SSR. Configuration for each of the components is provided below, and a full example configuration is provided at the end of this process. 

- Routing Interface: Specify the BGP over SVR interface
- BGP over SVR: See [BGP over SVR](config_bgp.md#bgp-over-svr-bgposvr) for configuration details. 
- Routing protocol such as IGMPv2/v3
- PIM
- RP: The Rendezvous Point. In the current implementation, the RP must be external to the SSR. 
- Service: Services are created for the multicast traffic, and defined for the Group address.
- Multicast-sender-policy: Defines the tenant that is allowed to be the source of the multicast stream.
- Access Policy: Configures the tenants allowed to receive the multicast traffic via IGMP joins at routers in the network. 

Refer to [Tenants](config_tenants.md) for more information on configuring Tenants.

### Configuration Process

The following diagram represents a simple multicast configuration. A Client sends a multicast to address 225.1.1.1. Location1 and Location2 want to receive this multicast stream. The network is setup to use an external, non-SSR Rendezvous Point (RP) at 20.20.20.20 for all multicast traffic. This router is 192.168.22.2 and is configured for BGP with SSR rtr2. It advertises 20.20.20.20 as the RP for multicast into BGP,  allowing the SSR network to identify the path to the RP.

![Multicast diagram](/img/config_multicast.png)

Key points in the rtr2 configuration:
* BGP is configured with the external router, 192.168.22.2
* BGP over SVR will be configured with two spokes
* PIM is configured on the LAN interface towards the external router
* The tenant edsel is configured on the LAN interface


#### Configuration for rtr2

```
config
    authority
        router  rtr2
            node                 node1
                name              node1
                device-interface  eth6
                    network-interface  lan3
                        name       lan3
                        tenant     edsel
                        address    192.168.22.1
                            ip-address     192.168.22.1
                            prefix-length  30
                            gateway        192.168.22.2
                        exit
                    exit
                exit
            exit
            routing              default-instance
                type              default-instance
                routing-protocol  bgp
                    type            bgp
                    local-as        65128
                    neighbor        192.168.22.2
                        neighbor-address  192.168.22.2
                        neighbor-as       65100
                    exit
                    neighbor        192.168.128.0
                        neighbor-address  192.168.128.0
                        neighbor-as       65128
                        transport

                            local-address
                                routing-interface  loopback0
                            exit
                        exit
                        address-family    ipv4-unicast
                            afi-safi       ipv4-unicast
                            next-hop-self  true
                        exit
                    exit
                    neighbor        192.168.128.1
                        neighbor-address  192.168.128.1
                        neighbor-as       65128
                        transport

                            local-address
                                routing-interface  loopback0
                            exit
                        exit
                        address-family    ipv4-unicast
                            afi-safi       ipv4-unicast
                            next-hop-self  true
                        exit
                    exit
                exit
                pim
                    interface  node1 lan3
                        node       node1
                        interface  lan3
                    exit
                    rp         224.0.0.0/4
                        address      20.20.20.20
                        group-range  224.0.0.0/4
                    exit
                exit
```

#### Configuration for Spoke 1 (rtr0)

Key points for the Spoke configuration - this applies to each spoke, since the configuration is nearly identical.
* BGP over SVR configured to the hub
* PIM configured with the same RP on the LAN interface
* IGMP configured on the LAN interface
* Using tenant studebaker on the LAN where the IGMP joins will come from 
```
config
    authority
        router  rtr0
            node                 node1
                device-interface  eth3
                    network-interface  lan0
                        tenant     studebaker
                        address    192.168.0.1
                            ip-address     192.168.0.1
                            prefix-length  24
                        exit
                    exit
                exit
            exit
            routing              default-instance
                type              default-instance
                interface         loopback0
                    name        loopback0
                    ip-address  192.168.128.0
                exit
                routing-protocol  bgp
                    type            bgp
                    local-as        65128
                    address-family  ipv4-unicast
                        afi-safi  ipv4-unicast
                        network   192.168.0.0/24
                            network-address  192.168.0.0/24
                        exit
                    exit
                    neighbor        192.168.128.2
                        neighbor-address  192.168.128.2
                        neighbor-as       65128
                        transport

                            local-address
                                routing-interface  loopback0
                            exit
                        exit
                    exit
                exit
                igmp
                    interface  node1 lan0
                        node       node1
                        interface  lan0
                    exit
                exit
                pim
                    interface  node1 lan0
                        node       node1
                        interface  lan0
                    exit
                    rp         225.0.0.0/4
                        address      20.20.20.20
                        group-range  225.0.0.0/4
                    exit
                exit
            exit
        exit
    exit
exit
```

#### Configuration for Spoke 2 (rtr1)

```
config
    authority
        router  rtr1
            node                 node1
                device-interface  eth3
                    network-interface  lan0
                        tenant     studebaker
                        address    192.168.1.1
                            ip-address     192.168.1.1
                            prefix-length  24
                        exit
                    exit
                exit
            exit
            routing              default-instance
                type              default-instance
                interface         loopback0
                    name        loopback0
                    ip-address  192.168.128.1
                exit
                routing-protocol  bgp
                    type            bgp
                    local-as        65128
                    address-family  ipv4-unicast
                        afi-safi  ipv4-unicast
                        network   192.168.1.0/24
                            network-address  192.168.1.0/24
                        exit
                    exit
                    neighbor        192.168.128.2
                        neighbor-address  192.168.128.2
                        neighbor-as       65128
                        transport
                            local-address
                                routing-interface  loopback0
                            exit
                        exit
                    exit
                exit
                igmp
                    interface  node1 lan0
                        node       node1
                        interface  lan0
                    exit
                exit
                pim
                    interface  node1 lan0
                        node       node1
                        interface  lan0
                    exit
                    rp         224.0.0.0/4
                        address      20.20.20.20
                        group-range  224.0.0.0/4
                    exit
                exit
            exit
        exit
    exit
exit
``` 
#### Configure the Service 

The service allows the traffic to flow. It allows the tenant from the hub edsel to send the multicast stream, and the tenants studebaker on each spoke can join and receive the multicast stream.   

```
config
    authority
        service  multicast
            name                     multicast
            address                  224.0.0.0/4
            access-policy            studebaker
                source  studebaker
            exit
            multicast-sender-policy  edsel
                source  edsel
            exit
        exit
    exit
exit
```
#### Other Considerations

While this configuration example uses one RP for the multicast range, you can use different RPs for different multicast addresses or ranges. The same can be done for the service; smaller services for more specific ranges of multicast with different senders and receivers as needed.
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


