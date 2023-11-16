---
title: VRF Route Leaking
sidebar_label: VRF Route Leaking
---

## Why Leak Routes?

The word "leak" implies a break or a breach, and in some cases, route leaking can be malicious. However in the case of VRF route leaking it indicates the intentional sharing of route information across VRF instances. Some benefits are that traffic can be shared or balanced across VRF instances, or sharing a default route to the internet that can be adopted by each VRF. This document describes the process of configuring the import and export actions for sharing VRF routes, whether on the same router, between routers, or sharing routes from multiple VRFs between routers.

## How It Works

The exchange of routes between a VRF on one SSR and a VRF on another SSR is achieved using a single BGP session in the default VRF, where the VPN address family carries the routes for multiple VRFs via that one BGP session. This configuration allows each VRF to share and copy the designated routes.

Only one instance of the BGP VPN RIB route table exists on a router within the default VRF. It can be modified to hold routes from multiple VRFs using a combination of the IP prefix and an 8-byte Route Distinguisher (RD). The RD must be configured for each VRF that is meant to export routes into the VPN table. To identify which VPN routes are imported to a VRF, a Route Target (RT) is identified. The RT is a BGP extended community attribute that identifies both the VPN RIB where the routes will be shared, and is used to identify the routes to be imported to a VRF.  

### Route Distinguisher
The Route Distinguisher (RD) is an identification number, used to create a distinct route to a common IPv4 address prefix. In the example below, we use the router-ID and a vlan-id from the VRF, but any number or name can be used.  

### Route Target
The Route Target (RT) identifies one or more routers that may receive a set of routes carried by BGP. There should be an understanding between the routers what the RT represents. In the example below, we use the local AS number (65000 from the private AS number space), and append a logical value; 1 for `vrfA` and 2 for `vrfB`. This construction makes it fairly easy to understand.  

The RFC 4364 architecture for VPN route exchange via BGP depends on an underlying MPLS transport network, so that traffic from different VRFs (with overlapping IP address space) can be tunneled through the network. The SSR does not use MPLS for this purpose. Instead of MPLS tunneling, the SSR uses SVR and the tenant concept to enable tunnel-free forwarding of VPN traffic. The tenant identifies the VRF and provides functionality similar to the VPN label in the RFC 4364 architecture. 

## Configuration

Route leaking can be configured for any of the following scenarios.

### VRF Route Sharing Within a Router

To share routes between VRF A and VRF B on the same SSR, use the following process:

1. Configure a `route-distinguisher` for VRF A.
2. Configure the route export from VRF A into the VPN RIB 
- Specify the RT to attach to the exported routes 
- Optionally specify an export policy. 

```
config
    authority
		router     router-boston
            routing       default-instance
                type      default-instance
                                
                vrf    vrfA
                    name             vrfA
                    tenant-name      tenantA
                    routing-protocol    bgp
                        type            bgp
                        local-as        65000
                        address-family     ipv4-unicast
                            afi-safi       ipv4-unicast
                            vpn-export
                                route-distinguisher        16.0.0.2:101
                                vpn-export-route-target    65000:1
                            exit
                            vpn-import
                                vpn-import-route-target    65000:2
                            exit
                            redistribute     connected
                                protocol     connected
                            exit
                        exit
                        address-family       ipv6-unicast
                            afi-safi         ipv6-unicast
                            vpn-export
                                route-distinguisher         16.0.0.2:101
                                vpn-export-route-target     65000:1
                            exit
                            vpn-import
                                 vpn-import-route-target     65000:2
                            exit
                            redistribute     connected
                                protocol     connected
                            exit
                        exit
                    exit
                exit
```

3. Configure an RD for VRF B.
4. Configure the route import from the VPN RIB into VRF B 
- Specify the RT to attach to the exported routes 
- Optionally specify an export policy. 

```
				vrf      vrfB
                    name                vrfB
                    tenant-name         tenantB
                        routing-protocol    bgp
                            type bgp
                            local-as     65000
                            address-family    ipv4-unicast
                                afi-safi      ipv4-unicast
                                vpn-export
                                    route-distinguisher       16.0.0.2:102
                                    vpn-export-route-target   65000:2
                                exit
                                vpn-import
                                    vpn-import-route-target   65000:1
                                exit
                                redistribute     connected
                                    protocol     connected
                                exit                                
                            exit
                            address-family     ipv6-unicast
                                afi-safi       ipv6-unicast
                                vpn-export
                                    route-distinguisher         16.0.0.2:102
                                    vpn-export-route-target     65000:2
                                exit
                                vpn-import
                                    vpn-import-route-target     65000:1
                                exit
                                redistribute     connected
                                    protocol     connected
                                exit
                            exit
                        exit
                    exit
                exit
            exit
```

#### Some Notes
- Either VRF A or VRF B may be the default VRF.
- Route leaking is only allowed with BGP routes, however, BGP neighbors do not need to be configured. If static, connected, or OSPF routes of a VRF are to be shared, they first need to be redistributed into BGP. 


### VRF Route Sharing Between Different Routers
Use the following configuration process to allow routes from VRF A on SSR-MZ to appear in VRF A on SSR-DZ. 

1. Configure VRF A on SSR-MZ, and identify the RD and RT.
2. Configure the route export from vrfA into the VPN RIB, 
- Specify the RT to attach to the exported routes 
- Optionally specify an export policy. (more steps)

```
        router SSR-MZ
            routing default-instance
				vrf vrfA
                   name vrfA
                   tenant-name tenantA
                   routing-protocol bgp
                       type bgp
                       local-as 65000
                       router-id 16.0.0.2
                       address-family ipv4-unicast
                           afi-safi ipv4-unicast
                           vpn-export
                               route-distinguisher 16.0.0.2:101
                               vpn-export-route-target 65000:1
                           exit
                           vpn-import
                               vpn-import-route-target 65000:1
                           exit
                       exit
                       address-family ipv6-unicast
                           afi-safi ipv6-unicast
                           vpn-export
                               route-distinguisher 16.0.0.2:101
                               vpn-export-route-target 65000:1
                           exit
                           vpn-import
                               vpn-import-route-target 65000:1
                           exit
                       exit
                       redistribute connected
                           protocol connected
                       exit
                   exit
               exit

```

3. Configure the route import from the VPN RIB into vrfA on SSR-DZ
- Select what routes to import by specifying the same RT as in the previous steps
- Optionally specify an import policy. (more steps)

```
        router SSR-DZ
            routing default-instance
				vrf vrfA
				    name vrfA
                    tenant-name tenantA
                    routing-protocol bgp
                    	type bgp
	                    local-as 65000
	                	router-id 16.0.0.3
		                    address-family ipv4-unicast
			                	afi-safi ipv4-unicast
				                vpn-export
				                    route-distinguisher 16.0.0.3:201
						            vpn-export-route-target 65000:1
		                        exit
				                vpn-import                                       	
				                	vpn-import-route-target 65000:1
					            exit
			                exit
			                address-family ipv6-unicast
			                	redistribute connected
			                		protocol connected
		                        exit
		                        afi-safi ipv6-unicast
		                        vpn-export
			                        route-distinguisher 16.0.0.3:201
			                        vpn-export-route-target 65000:1
		                        exit
		                	    vpn-import
		                            vpn-import-route-target 65000:1
		                        exit
		                    exit
	                        redistribute connected
	                            protocol connected
                            exit
	                    exit
	                exit
	            exit
```

4. Configure the exchange of BGP VPN routes between SSR-MZ and SSR-DZ. Configure the VPN address family on each BGP neighbor. If the routers are direct BGP neighbors, the BGP peering is done using each router’s default VRF, where the VPN RIB is located. The result is the exchange of routes between SSR-MZ and SSR-DZ from the VPN RIB, allowing the BGP policy mechanisms to be available to select the subset of the VPN routes for exchange, and for modifying their attributes.

```
		router SSR-DZ
			routing default-instance
				type default-instance
					interface loopback
						name loopback
						ip-address 16.0.0.3
					exit
					routing-protocol bgp
						type bgp
		                local-as 65000
		                router-id 16.0.0.3
			            neighbor SSR-MZ
		                    neighbor-address 16.0.0.2
			                    neighbor-as 65000
				                transport
									local-address
										routing-interface loopback
									exit
								exit
								address-family ipv4-vpn
									afi-safi ipv4-vpn
									next-hop-self true
								exit
								address-family ipv6-vpn
									afi-safi ipv6-vpn
									next-hop-self true
								exit
							exit
						exit
```

If SSR-MZ and SSR-DZ are not direct BGP neighbors, there must be some set of other BGP peers between them, configured to propagate the VPN address family routes from SSR-MZ and ultimately send them to SSR-DZ.

```
        router SSR-MZ
            routing default-instance
                type default-instance
                    interface loopback
                        name loopback
                        ip-address 16.0.0.2
                    exit
                    routing-protocol bgp
                        type bgp
                        local-as 65000
                        router-id 16.0.0.2
                        neighbor SSR-DZ
                            neighbor-address 16.0.0.3
                                neighbor-as 65000
                                transport
                                    local-address
                                        routing-interface loopback
                                    exit
                                exit
                                address-family ipv4-vpn
                                    afi-safi ipv4-vpn
                                    next-hop-self true
                                exit
                                address-family ipv6-vpn
                                    afi-safi ipv6-vpn
                                    next-hop-self true
                                exit
                            exit
                        exit
```

### Sharing Routes from Multiple VRFs via a Single BGP Session

In a situation where SSR-MZ has multiple VRFs A, B, C; and all routes are to be shared with SSR-DZ, (which also has VRFs A, B, C) the configuration is very similar as the previous steps. The difference is using a different RT for each VRF. 

- Export each VRF on SSR-MZ into it’s VPN RIB, using a different RT for each VRF
- Share the VPN RIB routes from SSR-MZ to SSR-DZ using a single BGP session in the default VRF.
- Import the routes from the VPN RIB on SSR-DZ into the respective VRF's (based on the RT).

### Import and Export Policies

Import and export policies can be applied to the route leaking configuration. These can be general import/export routing policies, or specific to the VRF import/export configuration. For example, an import routing policy can be configured as below:

```
			routing
                filter match-vrfA
		            type extended-community-filter
	                name match-vrfA
		            rule r1
                        name r1
                        extended-community 65000:1
				    exit
 		        exit
	            filter match-vrfB
				    type extended-community-filter
				    name match-vrfB
				        rule r1
	                    	name r1
				           extended-community 65000:2                                 
				        exit
                    exit
                    filter match-vlan70
                        type prefix-filter
                        name match-vlan70
                        rule r1
                            name r1
                            prefix 10.70.0.0/16
                        exit
                    exit
                    policy select-all-of-vrfA-and-only-vlan70-from-vrfB
                        name select-all-of-vrfA-and-only-vlan70-from-vrfB
                        statement get-vrfA
                            name get-vrfA
                            condition extended-community-filter-condition
                                type extended-community-filter-condition
                                extended-community-filter match-vrfA
                            exit
                        exit
                        statement get-vlan70-from-vrfB
                            name get-vlan70-from-vrfB
                            condition address-prefix-filter-condition
                                type address-prefix-filter-condition
                                prefix-filter match-vlan70
                            exit
                            condition extended-community-filter-condition
                                type extended-community-filter-condition
                                extended-community-filter match-vrfB
                            exit
                        exit
                    exit
                exit
```
This policy is then applied to both routing targets (configured earlier) as shown here:

```
             router SSR-MZ
                 routing default-instance
                     vrf vrfA
                         routing-protocol bgp
                             address-family ipv4-unicast
                                 afi-safi ipv4-unicast
                                 vpn-import
                                     vpn-import-route-target 65000:1
                                     vpn-import-route-target 65000:2
                                     import-policy select-all-of-vrfA-and-only-vlan70-from-vrfB
                                 exit
```
In this example, the vpn-import action imports both routes from vrfA and vrfB, but the policy only selects a subset of those routes.


## Configuration Commands

**Links to configuration command documentation will be integrated when that doc is available**

The following commands are used to configure VRF Route Sharing.

#### [`vpn-export`](config_command_guide.md#configure-authority-router-routing-routing-protocol-address-family-vpn-export)
`vpn-export` is specified under `routing-protocol bgp > address-family ipv4-unicast` (or `ipv6-unicast`) in the VRF. When the `vpn-export` configuration is present, IPv4 (or IPv6) BGP routes are exported from the VRF into the VPN RIB. The `route-distinguisher` and `route-target` attributes are mandatory and need to be specified. The `export-policy` attribute is optional and must reference an existing routing policy. When specified, this routing policy is applied when exporting the routes into the VPN RIB.

#### [`vpn-import`](config_command_guide.md#configure-authority-router-routing-routing-protocol-address-family-vpn-import)

`vpn-import` is specified under `routing-protocol bgp > address-family ipv4-unicast` (or `ipv6-unicast`) in the VRF. When the `vpn-import` configuration is present, IPv4 (or IPv6) BGP routes are imported from the VPN RIB into the VRF. The `route-target` attribute is mandatory; at least one must be specified. Multiple route targets may be specified. The `import-policy` attribute is optional and must reference an existing routing policy. When specified, this routing policy is applied when importing the routes from the VPN RIB.

#### [`address-family ipv4-vpn`](config_command_guide.md#configure-authority-router-routing-routing-protocol-neighbor-address-family-afi-safi)

`address-family ipv4-vpn` can only be specified for BGP neighbors in the default VRF. All the configuration elements under `address-family ipv4-vpn` are the same as under the existing `address-family ipv4-unicast` configuration element. When this address family is configured and the BGP neighbor router has an equivalent configuration, the VPN RIB routes will be exchanged with the neighbor.

#### [`address-family ipv6-vpn`](config_command_guide.md#configure-authority-router-routing-routing-protocol-neighbor-address-family-afi-safi)

`address-family ipv6-vpn` can only be specified for BGP neighbors in the default VRF. All the configuration elements under `address-family ipv6-vpn` are the same as under the existing `address-family ipv4-unicast` configuration element. When this address family is configured and the BGP neighbor router has an equivalent configuration, the VPN RIB routes will be exchanged with the neighbor.
