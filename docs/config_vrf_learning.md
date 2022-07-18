---
title: VRF Support
sidebar_label: VRF Support
---

The following configuration procedures can be used to provide VRF support for static routes, BGP, and OSPF. Configuration can take place at the global/default VRF level, or inside a VRF container. 

With VRF, you have the ability to have multiple, independent instances of both BGP and OSPF. When managing multiple networks, VRF provides the ability learn and isolate these networks from one another, so that traffic destined for an internal private IP address does not get routed to a different network.  

## Add VRF Objects Using BGP

To add VRF support for BGP, add VRF objects to the `routing default-instance`, and configure BGP as the routing protocol. This allows the SSR BGP instance to peer with a remote peer and learn routes for the VRF.
```
router         Test
    routing    default-instance
        vrf    red
            name    red
            routing-protocol        bgp
                type                bgp
                local-as            1
                router-id 10.1.1.1
                neighbor
                    neighbor-address  10.1.1.2
                    neighbor-as       3000
```
In the example above, all routes learned via BGP will be installed within the VRF table Red. 

## Add VRF Objects Using OSPF

To add VRF support for OSPF, add VRF objects to the `routing default-instance`, and configure an OSPF instance with the `instance-id` of 1. This allows the SSR OSPF instance to dynamically learn and advertise routes to other routers by way of Link State Advertisements (LSAs). 
```
router  Test
            name     Test

            routing  default-instance
                type  default-instance

                vrf   red
                    name              red
                    tenant-name       finance
                               
                    ospf              1
                        instance      1
                        router-id     10.11.2.202

                        redistribute  static
                            protocol  static
                        exit

                        redistribute  service
                            protocol  service
                            policy    OSPF_policy
                        exit

                        area          0.0.0.0
                            id         0.0.0.0

                            interface  test-01-1 lan
                                node       test-01-1
                                interface  lan
                            exit
                        exit
                    exit
                exit

                vrf   blue
                    name              blue
                    tenant-name       eng

                    ospf              2
                        instance      2
                        router-id     11.11.2.202

                        redistribute  service
                            protocol  service
                            policy    OSPF_policy
                        exit

                        redistribute  static
                            protocol  static
                        exit

                        area          0.0.0.0
                            id         0.0.0.0

                            interface  test-01-1 lan2
                                node       test-01-1
                                interface  lan2
                            exit
                        exit
                    exit
                exit
            exit
        exit
    exit
```

In the example above, all routes learned via OSPF will be installed within the VRF table Red. 

### VRF Support for Static Routes

Static route configuration is configured in the respective VRF instance.
```
router         Test
    routing               default-instance
        vrf               red
            static-route      11.1.1.1/32 10
                next-hop-interface  node1 wan5          
```
### Redistributing Static Routes

When VRF static routes are redistributed (using `redistribute-static`), only the static routes within that VRF are redistributed. When BGP or OSPF is configured outside a VRF directly under `routing default-instance`, the static routes from the global (default) route table are distributed. The `static-route` command is used to populate static routes in the respective VRF table.

### Tenant to VRF Mapping

The following information pertains to tenant to VRF mapping using static routes, BGP, or OSPF.

SSR routers use Tenants to segment L3 traffic in the forwarding plane. VRF provides L3 segmentation at the routing layer. An SSR router does not have any VRF definitions associated with a network interface. Instead, network interfaces are configured with names matching tenants in a VRF. If the network interface tenant does not match any explicitly configured VRF's, then the network interface belongs to the global/default VRF. Keep in mind that a tenant can only be mapped to one VRF.

For example, an VRF can have a tenant-name `128`. This would match network-interfaces with a tenant of `engineeering.128` and a network-interface with a tenant of `finance.128`.

In the following example, all traffic coming from the interface is classified as that tenant. Using vrf `blue` as a reference, the tenant-name `eng` must exist on lan2 and the VRF. The VRF-Tenant mapping is used for redistributing connected routes and for mapping services.
```
    router Test
        routing default-instance
            vrf red
                tenant-name finance
```
```
            network-interface  lan
                name                                 lan
                global-id                            90

                neighborhood                         LAN
                    name      LAN
                    topology  mesh
                    exit
                tenant                               finance
                    inter-router-security                internal

                    address                              10.11.2.210
                        ip-address     10.11.2.210
                        prefix-length  29
```
```
    router Test
        routing default-instance
            vrf blue
                tenant-name eng
```
```
            network-interface  lan2
                name                                 lan2
                global-id                            90

                neighborhood                         LAN2
                    name      LAN2
                    topology  mesh
                    exit
                tenant                               eng
                    inter-router-security                internal

                    address                              11.11.2.210
                        ip-address     11.11.2.210
                        prefix-length  29
```

## Service Mapping

Each Service prefix is matched against the routing table that corresponds to the tenant (using the VRF `tenant-name` mapping configuration). If no VRF tenant mapping exists for the tenant, the service prefix is matched against the global routing table. If no match is found, no FIB entries are installed for that service and tenant.

### Services with Different Tenants

The VRF mapping below has a tenant per VRF, and there are 2 services; each with a different tenant access policy.
```
router         Test
    routing     default-instance
        vrf         red
            tenant-name     finance
        vrf                 blue
            tenant-name     eng
    
Service  web
    address 10.1.1.0/24
    access-policy tenant finance

Service  database
    address 10.1.1.0/24
    access-policy tenant eng
```

The prefix is the same for both the services, but the service `web` is matched against the routes in VRF `red`, while the service database is matched against routes in VRF `blue`. 
FIB entries are installed for each tenant based on where the best matched route is in the respective VRF route table.

### Single Service with Multiple Tenants Associated with Different VRFs

In this example the VRF mapping has a tenant per VRF, but only one service with access to both tenants.

```
router         Test
    routing               default-instance
        vrf               red
            tenant-name       finance
        vrf               blue
            tenant-name       eng
Service  web
    address 10.1.1.0/24
    access-policy tenant finance
    access-policy tenant eng
```

With the VRF associations to a single service, the tenants (`finance` and `eng`) use the same prefix (`10.1.1.0/24`) but are located in different VRFs (red/finance, blue/eng). In this configuration the same service can lead to 2 different next hops for different tenants. 

:::note
In the following cases, a single service with multiple tenants associated with different VRFs is not currently supported. 

- If the service has a service-route with a NAT target not bound to a specific next-hop.
- If the service is a multicast service.

In these cases, validation will ensure that all access-policy tenants are associated with **the same, or no VRF.**
:::

### Service with no Tenant VRF Association

A service with access to tenants that have no VRF association will default to the global routing table for route matches.
VRF serves as a routing table for each tenant to ensure that there is a route to the destination. Multiple tenants can have access to this VRF table via Services. If a service is not defined with a prefix that matches the routing table, no FIB entries are installed. 

## Show Commands
The following show commands have been extended to specify `vrf`. For specific use examples, refer to the linked section in the Command Line Reference guide.

#### BGP

[`show bgp`](cli_reference.md#show-bgp)

[`show bgp neighbors`](cli_reference.md#show-bgp-neighbors)

[`show bgp summary`](cli_reference.md#show-bgp-summary)

#### OSPF

[`show ospf`](cli_reference.md#show-ospf)

[`show ospf neighbors`](cli_reference.md#show-ospf-neighbors)

[`show ospf routes`](cli_reference.md#show-ospf-routes)

[`show ospf interfaces`](cli_reference.md#show-ospf-interfaces)

[`show ospf database`](cli_reference.md#show-ospf-database)

#### Other Show Commands

[`show fib`](cli_reference.md#show-fib)

[`show rib`](cli_reference.md#show-rib)

[`show vrf`](cli_reference.md#show-vrf)

[`clear bgp vrf`](cli_reference.md#clear-bgp)

