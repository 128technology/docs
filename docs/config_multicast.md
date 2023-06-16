---
Title: Multicast
Sidebar_label: Multicast
---

The following Multicast overview is a condensed collection of information from the [Juniper Multicast Overview](https://www.juniper.net/documentation/us/en/software/junos/multicast/topics/concept/multicast-ip-overview.html). Please refer to that document for more in-depth information about Multicast. 

## Overview 
Multicast is a one-to-many distribution of traffic; from one source to multiple destinations that have expressed an interest in receiving the traffic. Multicast traffic streams typically contain video, audio, or both, between a single server source and many client receivers.

A multicast address is used to send a datagram to a set of hosts that can be on different subnetworks and are configured as members of a **multicast group**.

Individual hosts can join or leave a multicast group at any time. There are no restrictions on the physical location or the number of members in a multicast group. A host can be a member of more than one multicast group at any time. A host does not have to belong to a group to send packets to members of a group.
Routers use a group membership protocol to learn about the presence of group members on directly attached subnetworks. When a host joins a multicast group, it transmits a group membership protocol message for the group or groups that it wants to receive and sets its IP process and network interface card to receive frames addressed to the multicast group.

Multicast traffic lies between the extremes of unicast (one source, one destination) and broadcast (one source, all destinations). Multicast is a “one source, many destinations” method of traffic distribution, meaning only the destinations that explicitly indicate their need to receive the information from a particular source receive the traffic stream.

Network applications that can function with unicast but are better suited for multicast include collaborative groupware, teleconferencing, periodic or “push” data delivery (stock quotes, sports scores, magazines, newspapers, and advertisements), server or website replication, and distributed interactive simulation (DIS) such as war simulations or virtual reality. Any IP network concerned with reducing network resource overhead for one-to-many or many-to-many data or multimedia applications with multiple receivers benefits from multicast.

A single source of multicast packets finds its way to every interested receiver. As with broadcast, the transmitting host generates only a single stream of IP packets, so the load remains constant whether there is one receiver or one million. The network routing devices replicate the packets and deliver the packets to the proper receivers, but only the replication role is a new one for routing devices. The links leading to subnets consisting of entirely uninterested receivers carry no multicast traffic. Multicast minimizes the burden placed on sender, network, and receiver.

## Multicast on the SSR 

Multicast on the SSR supports the following protocols and topology: 

- PIM Sparse-Mode
- Static Configuration of RP
- IGMP v2/v3
- Multicast over SVR in Hub and Spoke topology

### Multicast Configuration

The following components are necessary to configure multicast on the SSR. Configuration for each of the components is provided below, and a full example configuration is provided at the end of this process. 

:::note
BGPoSVR is a prerequisite for Multicast over SVR.
:::

- Routing Interface: Specify the BGP over SVR interface
- BGP over SVR: See [BGP over SVR](config_bgp.md#bgp-over-svr-bgposvr) for configuration details. 
- Routing protocol such as IGMPv2/v3
- PIM
- RP
- Tenant: defined as multicast. For additional info about Tenants, see [Tenants](config_tenants/md)
- Service: Services are created for the multicast traffic, and defined for the Group address.
- Access Policy: Allows receivers on the outgoing interfaces
- Multicast sender policy: Allows the sources to send for the Multicast Group (clarify this) 

### Configuration Process

Use the following steps to generate a simple Multicast configuration. 

1. Routing default interface 
``` 
           routing               default-instance
                type              default-instance

                interface         loopback
                    name        loopback
                    ip-address  10.5.0.1
                exit
```
2. [BGP over SVR](config_bgp#bgp-over-svr-bgposvr) 
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
3. Routing protocol (igmp) that defines an interface and igmp version, as well as the IGMP Joined Group.
```
				    igmp

                    interface  T280_DUT5 lan1
                        node       T280_DUT5
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

                    interface  T280_DUT5 lan2
                        node       T280_DUT5
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

                    interface  T280_DUT5 lan1
                        node       T280_DUT5
                        interface  lan1
                    exit

                    interface  T280_DUT5 lan2
                        node       T280_DUT5
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
5. Define the Multicast Tenant
```
        tenant             multicast
            name  multicast
        exit
```
6. Create the Service 
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
8. Multicast sender policy: Name the policy, and indicate the source
```
            multicast-sender-policy  multicast
                source  multicast
            exit
        exit
```

## Show Commands
Each of the commands listed below and the subcommands for each, provide additional details for multicast visibility. Use the links to learn more about each command.

| command | description |
| ------- | ----------- |
| show igmp interface | Display the igmp interfaces | 
| show igmp groups  |  | 
| show pim mroute [A.B.C.D [A.B.C.D] |   | 
| show pim interface |   | 
| show pim join |   | 
| show pim neighbor |   | 
| show pim rp-info |   | 
| show pim state |   | 

Note that each show command allows a vrf option:
`show ip igmp [vrf <vrfname>]` 


