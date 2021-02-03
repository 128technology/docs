---
title: Configuring VRF Learning
sidebar_lable: Configuring VRF Learning
---

The following configuration procedures can be used to initiate VRF learning using BGP. 

## Add VRF Objects 

To add VRF learning using BGP, add VRF objects to routing default-instance, and configure BGP as the routing protocol. This allows the 128T BGP instance to peer with a remote peer and learn routes for that particular VRF.
router         Test
	routing		default-instance
		vrf		red
           	name              red
routing-protocol		bgp
               		type           	bgp
                		local-as  		1
                		router-id 10.1.1.1
 				neighbor
                    		neighbor-address  10.1.1.2
                    		neighbor-as       3000

In the example above, all routes learned via BGP will be installed within the VRF table Red. 

### VRF Support for Static Routes

Static route configuration is configured in the respective VRF instance.
router         Test
    routing               default-instance
        vrf               red
            static-route      11.1.1.1/32 10
                next-hop-interface  node1 wan5          

### Redistributing Static Routes
When VRF static routes are redistributed into BGP (using redistribute static), only the static routes within that VRF are redistributed into BGP. When BGP is configured outside a VRF directly under routing default-instance, the static routes from the global (default) route table are distributed. The static-route command is used to populate static routes in the respective VRF table.

### Tenant to VRF Mapping
Need procedure here.

## Service Mapping

Each Service prefix is matched against the routing table that corresponds to the tenant (using the vrf tenant-name mapping config). If no VRF tenant mapping exists for the tenant, the service prefix is matched against the global routing table. If no match is found, no FIB entries are installed for that service and tenant.

### Services with Different Tenants
The VRF mapping below has a tenant per VRF, and there are 2 services; each with a different tenant access policy.
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

The prefix is the same for both the services, but service web is matched against the routes in VRF red, while service database is matched against routes in VRF blue. 
FIB entries are installed for each tenant based on where the best match route is present in the respective VRF route table.

### Single Service with multiple tenants associated with different VRFs

In this example the VRF mapping is the same but there is only one service with access to both tenants.
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

With the VRF associations to a single service, the tenants (finance and eng) use the same prefix (10.1.1.0/24) but are looked up in different VRFs (red/finance, blue/eng). In this configuration the same service can lead to 2 different next hops for different tenants. 
Note that in some special cases, this will not be supported initially (Please verify this)

- If the service has a service-route with a NAT target not bound to a specific next-hop.
- If the service is a multicast service.

In these cases, validation will ensure that all access-policy tenants are associated with the same VRF (or no VRF).

### Service with no tenant VRF association

A service with access to tenants that have no VRF association will default to the global routing table for route matches.
VRF serves as a routing table for each tenant to ensure that there is a route to the destination.  Multiple tenants can have access to this VRF table via Services. If a service is not defined with a prefix that matches the routing table, no FIB entries are installed. 

## Show Commands
The following show commands have been extended to specify a `vrf-name`. For specific use examples, refer to the linked section in the Command Line Reference guide (these will be linked in the online doc, but are not linked here).

```
show bgp vrf <vrf-name> [<route>]
show bgp summary vrf <vrf-name>
show bgp neighbors vrf <vrf-name> [<neighbor-ip>] [<option>]
show rib vrf <vrf-name> [<route>]
show fib vrf <vrf-name>
show vrf
clear bgp vrf <vrf-name>  [{in | out | soft}] <neighbor>
```
## Linux Kernel State

Any configured VRF will be present as a VRF table in the Linux kernel within the routingEngine namespace. A VRF in the kernel is represented by a pseudo interface of type “vrf”. Any network interface associated with the VRF (via its tenant) is represented by a kernel interface that is linked to the vrf pseudo interface:
```
[root@t190-dut2 ~]# ip netns exec routingEngine ip link show type vrf
4: vrfA: <NOARP,MASTER,UP,LOWER_UP> mtu 65536 qdisc noqueue state UP mode DEFAULT group default qlen 1000
    link/ether 1a:4b:90:bb:a7:e3 brd ff:ff:ff:ff:ff:ff
5: vrfB: <NOARP,MASTER,UP,LOWER_UP> mtu 65536 qdisc noqueue state UP mode DEFAULT group default qlen 1000
    link/ether 86:a7:3c:07:53:dc brd ff:ff:ff:ff:ff:ff
12: vrfC: <NOARP,MASTER,UP,LOWER_UP> mtu 65536 qdisc noqueue state UP mode DEFAULT group default qlen 1000
    link/ether 0e:25:f1:5a:c4:bd brd ff:ff:ff:ff:ff:ff

[root@t190-dut2 ~]# ip netns exec routingEngine ip link show vrf vrfA
14: g111: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel master vrfA state UNKNOWN mode DEFAULT group default qlen 1000
    link/ether ac:de:48:50:ba:73 brd ff:ff:ff:ff:ff:ff
```

In the above example, g111 is a vlan network-interface configured with a tenant that is part of vrfA. So the g111 link has the master vrfA attribute.
The kernel VRF table is the basis for connecting to the VRF BGP neighbor and enables redistribution of services into the VRF: 
```
[root@t190-dut2 ~]# ip netns exec routingEngine ip route show vrf vrfA
blackhole 10.4.0.0/16 metric 4262412864 
blackhole 10.5.0.0/16 metric 4262412864 
10.111.1.5 via 172.16.111.6 dev g111 proto 186 metric 20 
blackhole 11.1.1.1 metric 4262412864 
172.16.111.0/24 dev g111 proto kernel scope link src 172.16.111.2
```

In the above example, the three blackhole routes represent services with service-routes that are available in the VRF. These are picked up by the VRF BGP instance and re-distributed if redistribute service is configured.

The 172.16.111.0/24 entry is the connected route for the VLAN network-interface bound to the VRF. 10.111.1.5 is a route learned from the VRF BGP peer.
