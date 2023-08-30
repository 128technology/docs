---
title: DHCP Relay Best Practices
sidebar_label: DHCP Relay Best Practices
---

The purpose of a DHCP relay is to forward incoming requests from DHCP clients to a DHCP server. Normally, a client can talk directly to a DHCP server; especially on a single subnet. However, in the case where the server and clients are not on the same subnet, a DCHP relay agent can be deployed to mediate these requests. The SSR can accommodate this type of DHCP relay services.

### Requirements

To configure DHCP relay on the SSR, the following requirements must be met or available.

- IP address of the DHCP server which manages the DHCP address pool.
- The DHCP server must be accessible from the SSR.
- A unique tenant must be configured for the DHCP relay to flag requests observed by the SSR.

### Design Types

The following standard design models for DHCP Relay are addressed in this guide:

- [DHCP relay with SVR](#dhcp-relay-with-svr)
- [DHCP relay with SVR and multiple DHCP servers](#dhcp-relay-and-multiple-dhcp-servers)
- [DHCP relay with BGP over SVR](#dhcp-relay-with-bgp-over-svr)

### Architecture

A high-level overview of the architecture used for testing is shown in the diagram below.

![DHCP Test Architecture](/img/dhcp_relay_arch.jpg)

### Site Types

The following characteristics define the common models where DHCP Relay is deployed:

- Enterprise DC to Branch relay (DHCP server lives on the DC LAN)
- Branch to Branch relay (DHCP server lives on one of the branch LANs)

## DHCP Relay with SVR

Most basic deployments utilize DHCP relay with SVR only, where DHCP relay is implemented in its simplest form. The key elements to configure are tenants, services, and service-routes. The final step is to tag the branch office’s network interface with the tenant. This will be the interface receiving DHCP broadcasts.

### Tenant

A unique tenant and service must be designed as shown below. This tenant will be used to tag and identify DHCP request session on the ingress interface and associated them with the dhcp-relay service.

```
config
    authority
        tenant dhcp.demo 
            name dhcp.demo
        exit 
    exit
exit

```

### Service

A service is created with `application-type dhcp-relay`. A unique tenant must be applied to the access policy to allow the SSR to process DHCP requests.

```
config
    authority
        service    	dhcp_relay
            name 			dhcp_relay
            security 		internal

            access-policy 	dhcp.demo
            	source 		dhcp.demo
            exit
            application-type 	dhcp-relay
        exit
    exit
exit

```

### Service Route

A service-route is configured on the Branch1 or Enterprise DC routers referencing the DHCP relay service, with a `service-agent next-hop` pointing to the IP address of the DHCP server (`nat-target` in the example below).

```
config
    authority
        router 		Branch1
            name 		Branch1

            service-route        dhcp_relay_service-route
                name             dhcp_relay_service-route
                service-name     dhcp-relay
                nat-target       172.16.1.3

                next-hop         node1 lan1
                    node-name    node1
                    interface 	 node1
                exit
            exit
        exit
    exit
exit
```

### Network Interface

On the router processing the DHCP relay requests (Branch 2), the unique tenant created must be applied to the network-interface receiving the DHCP broadcasts. These DHCP request broadcasts are tagged by the tenant and associated with the `dhcp-relay` service. After the association is made, the SSR will convert the broadcast into a unicast and forward it to the IP of the DHCP servers.

```
config
    authority
        router    Branch2
            name 	Branch2

            node    node1
                name                node1

                device-interface    blue-lan1
                    name                blue-lan1
                    pci-address         0000:00:04.0

                    network-interface   lan1
                        name            		 lan1
                        global-id       		 6
                        tenant          		 dhcp.demo
                        inter-router-security    internal
                        source-nat               true

                        address 				 172.26.2.25
                            ip-address 			 172.26.2.25
                            prefix-length 		 24
                            gateway 			 172.26.2.2
                        exit
                    exit
                exit
            exit
        exit
    exit
```
### Sample Configuration

```
config

    authority
		conductor-address	192.168.1.7
			router				Branch1 
				name				Branch1
				router-group		all_routers

			node		node1
				name			node1
				asset-id		t220-dut1.openstacklocal

				device-interface  	wan-eth0 
					name				wan-eth0
					pci-address			0000:00:03.0

				network-interface 	wan
					name				wan
					global-id			1
					conductor			true
					default-route		true

					neighborhood	Broadband 
						name			Broadband
						topology 		mesh 
					exit
					inter-router-security 	internal 
					source-nat				true
					management				true

					management-vector 
						name		mgmt 
						priority 	5
					exit

					address			192.168.1.9
						ip-address		192.168.1.9
						prefix-length 	24
						gateway			192.168.1.1
					exit 
				exit
			exit

			device-interface  	red-lan1 
				name				red-lan1
				pci-address			0000:00:04.0

				network-interface 	lan1
					name				lan1
					global-id			6
					tenant				lan
					inter-router-security	internal
					source-nat			true
					address				172.16.1.15
						ip-address			172.16.1.15
						prefix-length 		24
						gateway				172.16.1.1
					exit 
				exit
			exit 
		exit

		service-route 	dhcp-relay_route
			name			dhcp-relay_route 
			service-name	dhcp_relay
			nat-target		172.16.1.3
			next-hop		node1 lan1 
				node-name 		node1 
				interface 		lan1
			exit 
		exit
			router    Branch2
            	name 	Branch2

            node    node1
                name                node1

                device-interface    blue-lan1
                    name                blue-lan1
                    pci-address         0000:00:04.0

                    network-interface   lan1
                        name            		 lan1
                        global-id       		 6
                        tenant          		 dhcp.demo
                        inter-router-security    internal
                        source-nat               true

                        address 				 172.26.2.25
                            ip-address 			 172.26.2.25
                            prefix-length 		 24
                            gateway 			 172.26.2.2
                        exit
                    exit
                exit
            exit
        exit
    exit

	tenant 	lan
		name 	lan
	exit

	tenant 	dhcp.demo
		name 	dhcp.demo
	exit

	service 	internet
		name 	internet
		address 	0.0.0.0/0

		access-policy 	lan
			source 			lan
		exit
	exit

	service 	dhcp_relay
		name 		dhcp_relay
		security 	internal

		access-policy 	dhcp.demo
			source 			dhcp.demo
		exit

		service-policy 		dhcp_relay
		application-type 	dhcp-relay
	exit
exit
```

## DHCP Relay and Multiple DHCP Servers

To achieve redundancy, more than one DHCP server is deployed. **The SSR accommodates multiple severs by configuring additional service-route elements referencing the same service.** When ingress traffic on the SSR is tagged by the network-interface with the tenant associated with `dhcp_relay` service, the SSR broadcasts DHCP requests to all next-hops within the service-route's next-hop. 

The fastest server wins.

### Adding Service-Routes

Building upon the earlier configuration and the information above, all that is needed to add additional DHCP servers is an additional **service-route** for each DHCP server. In our example configuration, we will be adding a second service route (`dhcp-relay_route2`) to the Branch1 router with the new DHCP Server IP address - `nat-target` 172.16.1.4.

```
config
    authority
        router 		Branch1
            name 		Branch1

            service-route        dhcp-relay_route1
                name             dhcp-relay_route1
                service-name     dhcp-relay
                nat-target       172.16.1.3

                next-hop         node1 lan1
                    node-name    node1
                    interface 	 lan1
                exit
            exit

            service-route        dhcp-relay_route2
                name             dhcp-relay_route2
                service-name     dhcp-relay
                nat-target       172.16.1.4

                next-hop         node1 lan1
                    node-name    node1
                    interface 	 lan1
                exit
            exit
        exit
    exit
exit
```

### Sample Configuration

```
config

    authority
		conductor-address	192.168.1.7
			router				Branch1 
				name				Branch1
				router-group		all_routers

			node	node1
				name	node1
				asset-id	t220-dut1.openstacklocal

				device-interface  	wan-eth0 
					name				wan-eth0
					pci-address			0000:00:03.0

				network-interface 	wan
					name				wan
					global-id			1
					conductor			true
					default-route		true

					neighborhood	Broadband 
						name			Broadband
						topology 		mesh 
					exit
					inter-router-security 	internal 
					source-nat				true
					management				true

					management-vector 
						name		mgmt 
						priority 	5
					exit

					address			192.168.1.9
						ip-address		192.168.1.9
						prefix-length 	24
						gateway			192.168.1.1
					exit 
				exit
			exit

			device-interface  	red-lan1 
				name			red-lan1
				pci-address		0000:00:04.0

				network-interface 	lan1
					name				lan1
					global-id			6
					tenant				lan
					inter-router-security		internal
					source-nat			true
					address				172.16.1.15
						ip-address		172.16.1.15
						prefix-length 	24
						gateway			172.16.1.1
					exit 
				exit
			exit 
		exit

		service-route 	dhcp-relay_route1
			name			dhcp-relay_route1 
			service-name	dhcp_relay
			nat-target		172.16.1.3
			next-hop		node1 lan1 
				node-name 		node1 
				interface 		lan1
			exit 
		exit

		service-route 	dhcp-relay_route2
			name			dhcp-relay_route2 
			service-name	dhcp_relay
			nat-target		172.16.1.4
			next-hop		node1 lan1 
				node-name 		node1 
				interface 		lan1
			exit 
		exit
			router    Branch2
            	name 	Branch2

            node    node1
                name                node1

                device-interface    blue-lan1
                    name                blue-lan1
                    pci-address         0000:00:04.0

                    network-interface   lan1
                        name            		 lan1
                        global-id       		 6
                        tenant          		 dhcp.demo
                        inter-router-security    internal
                        source-nat               true

                        address 				 172.26.2.25
                            ip-address 			 172.26.2.25
                            prefix-length 		 24
                            gateway 			 172.26.2.2
                        exit
                    exit
                exit
            exit
        exit
    exit

	tenant 	lan
		name 	lan
	exit

	tenant 	dhcp.demo
		name 	dhcp.demo
	exit

	service 	internet
		name 		internet
		address 	0.0.0.0/0

		access-policy 	lan
			source 		lan
		exit
	exit
	service			local-lan-summary_router1
		name		local-lan-summary_router1
		security	internal
		address		172.16.1.12/32

		access-policy 	lan 
			source 		lan
		exit 
	exit

	service		local-lan-summary_router3
		name		local-lan-summary_router3
		security	internal
		address		172.16.1.12/32

		access-policy 	wan 
			source 		wan
		exit 
	exit

	service 	dhcp_relay
		name 		dhcp_relay
		security 	internal

		access-policy 	dhcp.demo
			source 		dhcp.demo
		exit

		service-policy 		dhcp_relay
		application-type 	dhcp-relay
	exit
exit
```

## DHCP Relay with BGP over SVR

By default, the SSR will auto-generate service-routes and services for each DHCP server. This is good for SVR without BGP. To make DHCP relay work with BGP over SVR, we need to make additional changes to the auto-generated configuration **after** the auto-generation of configuration objects is complete. 

Please review DHCP Relay with SVR for tenant and network-interface configurations.

### Service

Configure the `dhcp-relay` service with `application-type dhcp-relay` and add the tenants to which this applies. Finally, set `share-service-route` to `false`.

```
config
    authority
        service    	dhcp_relay
            name 			dhcp_relay
            security 		service-sec

            access-policy 	dhcp.demo
            	source 		dhcp.demo
            exit
            share-service-routes false
            application-type 	dhcp-relay
        exit
    exit
exit
```

### Service Routes

On the Branch 1 SSR Router:

1.	Create a `service-route` for this service with a `nat-target` of the DHCP server, and perform a commit. The conductor auto-generates an additional DHCP service.

```
config
    authority
        router 		Branch1
            name 		Branch1

            service-route        dhcp_relay_service-route
                name             dhcp_relay_service-route
                service-name     dhcp-relay
                nat-target       172.16.1.3

                next-hop         node1 lan1
                    node-name    node1
                    interface 	 lan1
                exit
            exit
        exit
    exit
exit
```

2.	**Change the configuration of the auto-generated DHCP service** to `generated=false` and `share-service-routes=false`.

```
config
	authority

		service _dhcp_relay_5_172.16.1.3
			name 				_dhcp_relay_5_172.16.1.3
			description 		"Auto generated DHCP relay service for DHCP server 172.16.1.3"
			enabled 			true
			scope 				private
			tap-multiplexing 	false

			transport 	udp
				protocol 		udp
				port-range 		67
					start-port 	67
					end-port 		67
				exit
			exit
			address 					172.16.1.3/32
			generate-categories 		false
			access-policy-generated 	false
			
			access-policy 				dhcp.demo
				source 					dhcp.demo
				permission 				allow
			exit
			share-service-routes 		false
			source-nat 					disabled
			application-type 			generic
			fqdn-resolution-type 		v4
			
			session-record
				include-hierarchical-services 	true
			exit
			generated 		false
		exit
	exit
exit
```

3. Go into the auto-generated service-route and change `generated` to `false`, change type to `use-learned-routes`, and perform one last commit.

```
config
	authority
		router 	Branch1
			name 		Branch1
			service-route 		_dhcp_relay_dhcp_relay_service-route
				name 			_dhcp_relay_dhcp_relay_service-route
				service-name 	_dhcp_relay_5_172.16.1.3
				enable-failover false
				generated 		false
				use-learned-routes
			exit
		exit
	exit
exit
```
4.	RIB/FIB should show the service for BGP as the path for `dhcp_relay`. In this case, the SSR on Branch2 has a path for `dhcp_relay` to the SSR on Branch1 over BGP.

### RIB/FIB/BGP Show Commands

#### SSR Branch 1

```
admin@node1.Branch1# show bgp summary
Thu 2022-03-31 20:24:49 UTC
IPv4 Unicast Summary:
BGP router identifier 2.2.2.1, local AS number 64512 vrf-id 0
BGP table version 3
RIB entries 5, using 960 bytes of memory
Peers 2, using 43 KiB of memory

Neighbor    V 		AS 		MsgRcvd 	MsgSent 	TblVer 	InQ 	OutQ 	Up/Down 	State/PfxRcd 	PfxSnt
2.2.2.2 	4 	 64513 		  18087 	  19383 		 0 	  0 	   0 	6d01h18m 			   0 		 3
2.2.2.4 	4 	 64514 		  17219 	  17221 		 0 	  0 	   0 	5d23h27m 			   0 		 3


Total number of neighbors 2
Completed in 0.20 seconds
admin@node1.Branch1# show bgp
Thu 2022-03-31 20:24:51 UTC
BGP table version is 3, local router ID is 2.2.2.1, vrf id 0
Default local pref 100, local AS 64512
Status codes: s suppressed, d damped, h history, * valid, > best, = multipath,
			  i internal, r RIB-failure, S Stale, R Removed
Nexthop codes: @NNN nexthop's vrf id, < announce-nh-self
Origin codes: i - IGP, e - EGP, ? - incomplete

	Network 		Next Hop 	Metric 	LocPrf Weight Path
*> 	2.2.2.1/32 		0.0.0.0 		 0 			32768 	?
*> 	172.16.1.0/24 	0.0.0.0 		 0 			32768 	?
*> 	192.168.1.0/24 	0.0.0.0 		 0 			32768 	?

Displayed 3 routes and 3 total paths
Completed in 0.22 seconds

admin@node1.Branch1# show fib service-name _bgp_Branch1_R1
Thu 2022-03-31 20:31:42 UTC

Entry Count: 109
Capacity: 23387

============ ====== ======= =============== ===== ================= ============= ======== ======
IP Prefix 	  Port 	 Proto 	 Tenant 		 VRF 	Service 		Next Hops 	  Vector 	Cost
============ ====== ======= =============== ===== ================= ============= ======== ======
2.2.2.1/32 	  179 	  TCP 	_bgp_speaker_ 	  -	  _bgp_Branch1_R1 	0-None.4095 	- 		 0

Completed in 0.05 seconds
admin@node1.Branch1# show fib service-name _dhcp_relay_5_172.16.1.3
Thu 2022-03-31 20:31:45 UTC

Entry Count: 109
Capacity: 23387

=============== ====== ======= ========= ===== ========================== =========== ======== ======
IP Prefix 		Port 	Proto 	Tenant 	  VRF   Service 				  Next Hops   Vector   Cost
=============== ====== ======= ========= ===== ========================== =========== ======== ======
172.16.1.3/32 	 67 	 UDP   dhcp.demo   - 	_dhcp_relay_5_172.16.1.3 	1-2.0 		 - 		 0
```

#### SSR Branch 2

```
Default local pref 100, local AS 64514
Status codes: s suppressed, d damped, h history, * valid, > best, = multipath,
			  i internal, r RIB-failure, S Stale, R Removed
Nexthop codes: @NNN nexthop's vrf id, < announce-nh-self
Origin codes: i - IGP, e - EGP, ? - incomplete

	Network 		Next Hop 	Metric 	LocPrf Weight Path
*> 	2.2.2.1/32 		2.2.2.1 		 0 		 0  64512  ?
*> 	172.16.1.0/24   2.2.2.1 		 0 		 0  64512  ?
*> 	192.168.1.0/24  2.2.2.1 		 0 		 0  64512  ?

Displayed 3 routes and 3 total paths
Completed in 0.40 seconds

admin@node1.Branch2# show bgp summary
Thu 2022-03-31 20:32:25 UTC

IPv4 Unicast Summary:
BGP router identifier 2.2.2.4, local AS number 64514 vrf-id 0
BGP table version 3
RIB entries 5, using 960 bytes of memory
Peers 1, using 21KiB of memory

Neighbor    V 		AS 		MsgRcvd 	MsgSent 	TblVer 	InQ 	OutQ 	Up/Down 	State/PfxRcd 	PfxSnt
2.2.2.1		4		64512	17236		17234			 0	 0		  0 	5d23h35m		3				3


Total number of neighbors 1 Completed in 0.18 seconds

admin@node1.Branch2# show fib service-name _dhcp_relay_5_172.16.1.3 Thu 2022-03-31 20:32:38 UTC

Entry Count: 112
Capacity:	23387

=============== ====== ======= ========= ===== ========================== =========== ======== ======
IP Prefix 		Port 	Proto 	Tenant 	  VRF   Service 				  Next Hops   Vector   Cost
=============== ====== ======= ========= ===== ========================== =========== ======== ======
172.16.1.3/32	 67		UDP		dhcp.demo  -	_dhcp_relay_5_172.16.1.3  192.168.1.9	 -		 0

Completed in 0.15 seconds

admin@node1.Branch2# show fib service-name _bgp_Branch1_R1 Thu 2022-03-31 20:33:05 UTC

Entry Count: 112
Capacity:	23387

=============== ====== ======= ============= ===== ========================== =========== ======== ======
IP Prefix 		Port 	Proto 	Tenant 	  	 VRF    Service 				  Next Hops   Vector   Cost
=============== ====== ======= ============= ===== ========================== =========== ======== ======
2.2.2.1/32		179		TCP	   _bgp_speaker_   -	_bgp_Branch1_R1			  192.168.1.9	 -		  0
```

### Sample Configuration

```
config
	authority
		service 		dhcp_relay
			name 			dhcp_relay
			access-policy 	dhcp.demo
				source 		dhcp.demo
			exit

			share-service-routes 	false
			application-type 		dhcp-relay
		exit
	exit
exit

config
	authority
		service 		_dhcp_relay_5_172.16.1.3
			name 			_dhcp_relay_5_172.16.1.3
			description 	"Auto generated DHCP relay service for DHCP server 172.16.1.3"
			enabled 		true
			scope 			private
			tap-multiplexing 	false
			transport 		udp
				protocol 	udp

				port-range 	67
					start-port 	67
					end-port 	67
				exit
			exit

			address 	172.16.1.3/32
			generate-categories 	false
			access-policy-generated false

			access-policy 		dhcp.demo
				source 			dhcp.demo
				permission 		allow
			exit

			share-service-routes 	false
			source-nat 				disabled
			application-type generic
			fqdn-resolution-type 	v4

			session-record
				include-hierarchical-services 	true
			exit

			generated 		false
		exit
	exit
exit

config
	authority
		router 		Branch1
			name 			Branch1
			service-route 	dhcp_relay_service-route
				name 			dhcp_relay_service-route
				service-name 	dhcp_relay
				nat-target 		172.16.1.3
				next-hop 		node1 lan1
					node-name 	node1
					interface 	lan1
				exit
			exit
		exit
	exit
exit

config
	authority
		router 	Branch1
			name 	Branch1
			service-route 	_dhcp_relay_dhcp_relay_service-route
				name 			_dhcp_relay_dhcp_relay_service-route
				service-name 	_dhcp_relay_5_172.16.1.3
				enable-failover false
				generated 		false
				use-learned-routes
				
				reachability-detection
					enabled 			false
					detection-window 	5
				exit
			exit
		exit
	exit
exit
```

