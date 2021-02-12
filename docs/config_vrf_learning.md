---
title: VRF Learning via BGP
sidebar_lable: VRF Learning via BGP
---

The following configuration procedures can be used to initiate VRF learning using BGP. 

## Add VRF Objects 

To add VRF learning using BGP, add VRF objects to the `routing default-instance`, and configure BGP as the routing protocol. This allows the 128T BGP instance to peer with a remote peer and learn routes for the VRF.
```
router         Test
	routing		default-instance
		vrf		red
           	name              red
            routing-protocol		bgp
               	type                bgp
                local-as  		    1
                router-id 10.1.1.1
 				neighbor
                    neighbor-address  10.1.1.2
                    neighbor-as       3000
```
In the example above, all routes learned via BGP will be installed within the VRF table Red. 

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

When VRF static routes are redistributed into BGP (using `redistribute-static`), only the static routes within that VRF are redistributed into BGP. When BGP is configured outside a VRF directly under `routing default-instance`, the static routes from the global (default) route table are distributed. The `static-route` command is used to populate static routes in the respective VRF table.

### Tenant to VRF Mapping

128T routers use Tenants to segment L3 traffic in the forwarding plane. VRF provides L3 segmentation at the routing layer. A 128T router does not have any VRF definitions associated with an interface. Instead, an interface can be assigned a tenant to denote all traffic coming from that interface to be classified as that tenant. The VRF-Tenant mapping is used for redistributing connected routes and for mapping services.

Use the following example to create a basic configuration for mapping a tenant to a vrf:
```
    router Test
        routing default-instance
            vrf red
                tenant-name finance
```
A tenant can only be mapped to one VRF.

## Service Mapping

Each Service prefix is matched against the routing table that corresponds to the tenant (using the VRF `tenant-name` mapping configuration). If no VRF tenant mapping exists for the tenant, the service prefix is matched against the global routing table. If no match is found, no FIB entries are installed for that service and tenant.

### Services with Different Tenants

The VRF mapping below has a tenant per VRF, and there are 2 services; each with a different tenant access policy.
```
router         Test
    routing		default-instance
        vrf			red
            tenant-name		finance
        vrf               	blue
            tenant-name		eng
    
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
The following show commands have been extended to specify a `vrf-name`. For specific use examples, refer to the linked section in the Command Line Reference guide.

[`show bgp`](cli_reference.md#show-bgp)

[`show bgp neighbors`](cli_reference.md#show-bgp-neighbors)

[`show bgp summary`](cli_reference.md#show-bgp-summary)

[`show fib`](cli_reference.md#show-fib)

[`show rib`](cli_reference.md#show-rib)

[`show vrf`](cli_reference.md#show-vrf)

[`clear bgp vrf`](cli_reference.md#clear-bgp)

