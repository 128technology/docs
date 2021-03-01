---
title: Learning VRF Routes
sidebar_label: Learning VRF Routes
---

128T uses the concept of Tenancy to provide L3 network segmentation. The 5.1 release brings support for learning VRF routes through BGP and the associated routing tables.

Virtual Routing and Forwarding (VRF) instances make it possible to maintain multiple routing tables with overlapping address spaces in one router. A single 128T router can support multiple VRF instances, and is able to establish BGP peering sessions within each VRF to receive and distribute VRF routes. When a 128T router is connected to more than one VPN, each VPN can become its own VRF, supporting overlapping addresses. This provides a much broader scope of L3 network paths.

## VRF Support

To add VRF learning using BGP, add VRF objects to routing default-instance, and configure BGP as the routing protocol. This allows the 128T BGP instance to peer with a remote peer and learn routes for that particular VRF.

### Static Routes

Static routes are configured in the respective VRF instance, using the `static-route` command. For configuration information, see [VRF Support for Static Routes](config_vrf_learning.md#vrf-support-for-static-routes). 

When VRF static routes are redistributed into BGP (using `redistribute static`), only the static routes within that VRF are redistributed into BGP. When BGP is configured outside a VRF directly under `routing default-instance`, the static routes from the global (default) route table are distributed. The `static-route` command is used to populate static routes in the respective VRF table.

### Tenant to VRF Mapping

128T routers use Tenants to segment L3 traffic in the forwarding plane. VRF provides L3 segmentation at the routing layer. A set of routes associated with a VRF are accessible only to interfaces that have that particular VRF enabled. 

A 128T router does not have any VRF definitions associated with an interface. Instead, an interface can be assigned a tenant to denote all traffic coming from that interface to be classified as that tenant. The default behavior of a 128T router is to allow all tenants to access the global routing table.

VRFs are a table of routes that are accessed by tenants. The VRF-Tenant mapping is used for redistributing connected routes and for mapping services. A tenant can only be mapped to one VRF. 

### Subtenants

When a tenant is mapped to a VRF, all the subtenants are mapped to that VRF. If a particular subtenant is already mapped to another VRF, that VRF takes precedence for the subtenant. 

### Service Mapping

Service definitions remain the same, with prefixes/FQDN and access policies allowing specific tenants to access those services. Each Service prefix is matched against the routing table that corresponds to the tenant (using the VRF `tenant-name` mapping configuration). If no VRF tenant mapping exists for the tenant, the service prefix is matched against the global routing table. If no match is found, no FIB entries are installed for that service and tenant.

For information about configuring each of the following types of Service Mapping, please refer to the linked configuration procedure.

- [Services with Different Tenants](config_vrf_learning.md#services-with-different-tenants)
- [Single Service with multiple tenants associated with different VRFs](config_vrf_learning.md#single-service-with-multiple-tenants-associated-with-different-vrfs)
- [Service with no tenant VRF association](config_vrf_learning.md#service-with-no-tenant-vrf-association)
