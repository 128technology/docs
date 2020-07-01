---
title: Management Traffic over Forwarding Interfaces
sidebar_label: Management over Forwarding
---

Management traffic is any service that makes direct contact to another asset, either to retrieve or interface with the configuration and status of hardware components, the core operating system, features of user interfaces to the OS, or the business application, sometimes taking subsequent action to maintain or change configurations. All actions ultimately provide underlying support to the service being delivered by the managed resource to its users. Access is typically controlled via a set of privileges and will usually allow either modification and/or viewing of sensitive system configurations. Management traffic includes three categories: management, monitoring, and data backups and restores.

Management traffic for networking equipment typically traverses a separate physical interface for the purposes of network isolation, policing and possibly pricing, depending on the service.

Depending on the nature and size of a deployment, hardware may be selected that does not afford the option of devoting a separate physical interface for the purposes of management traffic. In these cases, the forwarding WAN interface can be leveraged for management traffic (such as NTP or DNS).

## Management Traffic for the 128T

* Conductor access over SSC forwarding port (UDP port 930)
* Conductor access over salt ports (TCP ports 4505 and 4506)
* Conductor access over HTTPS port (TCP port 443)
* DNS traffic for FQDN resolution (UDP port 53)
* NOTE: Do we need to allow TCP port 53 as some implementations may rely on it? We do not add TCP, but it could be added by setting generated=false
* NTP (UDP port 123)
* YUM traffic (TCP ports 80 and 443)
* We cannot easily distinguish between YUM and other HTTP/HTTPS traffic
* Inbound access
* SSH (TCP port 22)
* Reverse SSH (custom port - TBD?)
* Other custom applications as defined by host services
* SNMP - server (inbound) and notification client (outbound)
* Syslog - (configured UDP port; default: 514)
* IPFIX - (configured port and transport)

## Benefits of 128T's Management Over Forwarding

* Requires a dedicated interface and a separate WAN connection. This may not always be available due to the lack of physical ports or would require additional equipment to enable such connectivity - switches etc.
* Relies on users to configure these interfaces outside of the 128T data model. This leaves the running software susceptible to environmental changes outside our control and is less than ideal in an appliance model. 
* Relies on the user to apply the correct protection on the linux interface using linux routing and firewalls. The user has to now configure the 128T software one way and linux a different way to achieve security and connectivity. This can also easily leave the WAN interface exposed to outside attackers.
* Leverages native SVR capabilities of encryption, optimal path selection, traffic engineering
* Applications running in linux should be able to connect to the internet while 128T is running
* Applications running in linux should be able to connect to the internet while 128T is down for maintenance and other purposes.
* TBD: At this point should we restrict any outbound traffic or simply assume this WAN interface is the default and leave the rest to linux
* Seamless transition of linux connectivity from 128T running to not running and vice versa.
* Protection of the WAN interface while 128T is not running. This will ensure that only the specific hosted services configured on this WAN interface such as SSH etc would be allowed while 128T is down.

## Configuration

* At least one management interface configured per node. Since we are now able to configure non-forwarding interfaces, we should be able to require this.
* The management flag cannot be enabled on a host or bridge interface types. This is mainly to prevent blackholing of management traffic.
* The management-vector is only configurable on interfaces with management = true
* dns-address = automatic only allowed when the management = true interface is enabled for DHCP
* dns-address is required on a node.
* Require utility-ip-address when interface is redundant or vrrp and management is enabled

#### DNS Service

##### Service

Currently 128T software lacks the ability to configure DNS server address in our data model. However, as part of this feature, since we are managing the linux behavior for DNS we would need to know the correct addresses to use. 
The user has two choices:

* Automatic:
  * If the management interface is configured for DHCP, then use the learned dns addresses.
* Static:
  * The user can statically configure up to 2 DNS server addresses. These addresses are assumed to be public and hence reachable via all of the configured management interfaces.

If there is a mix of dhcp and static address management network-interfaces, both static and automatic DNS can be configured.

A DNS proxy service called _management_dns_ will be created.

```
	service
		name           _management_dns_
        scope          private
        address        169.254.127.126/32
        application-type dns-proxy
        access-policy  _internal_
            source      _internal_
            permission  allow
        service-policy  _management_dns_policy_
```

##### Service Route

For each management interface, a service route will be created with a next-hop of that interface. Consider a sample configuration with device interfaces.

```
authority
	router	MyRouter
		node MyNode
			device-interface wan1
				type 	ethernet
				pci-address	00:03.0
				forwarding	true
				network-interface wan1-internet
					dhcp v4
					management	true
					management-vector       MyNode_wan1_intf
    					name      MyNode_wan1_intf
					    priority  100
					exit
			device-interface wan2
				type 	ethernet
				pci-address	00:04.0
				forwarding	true
				network-interface wan2-internet
					dhcp v4
					management	true
					management-vector       MyNode_wan2_intf
    					name      MyNode_wan2_intf
    					priority  1000
```

For the automatic case, the DNS proxy feature will populate the learned DNS addresses into the service-route. For the static address case, the address will be configured as target-address for the next-hop. For example, using the configuration Fig. 1, the following service routes will be generated for the automatic case

```
authority
	router	MyRouter
	dns-address	automatic
	service-route
		name          _management_dns_route_MyNode_wan1_intf_
		service-name  _management_dns_
		next-hop      MyNode wan1-intf
    		node-name       MyNode
    		interface       wan1-intf
	service-route
			name          _management_dns_route_MyNode_wan2_intf_
			service-name  _management_dns_
			next-hop      MyNode wan2-intf
    			node-name       MyNode
    			interface       wan2-intf
```

And for the static case, here’s what the configuration will look like:

```
authority
		router	MyRouter
		dns-address	static
			address	8.8.8.8
			address	9.9.9.9
		service-route
			name          _management_dns_route_MyNode_wan1_intf_
			service-name  _management_dns_
			next-hop      MyNode wan1-intf
    			node-name       MyNode
    			interface       wan1-intf
    			target-address	8.8.8.8
    			target-address	9.9.9.9
		service-route
			name          _management_dns_route_MyNode_wan2_intf_
			service-name  _management_dns_
			next-hop      MyNode wan2-intf
    			node-name       MyNode
    			interface       wan2-intf
		    	target-address	8.8.8.8
    			target-address	9.9.9.9
```

##### Service Policy

The configured management-vector for these management interfaces will be copied to vector configuration for the service-policy. In addition, the default service-policy will assume a proportional load balancing strategy. 

```
service-policy
		name         _management_dns_policy_
		lb-strategy  proportional
		vector       MyNode_wan1_intf
    		name      MyNode_wan1_intf
    		priority  100
		exit
		vector       MyNode_wan2_intf
    		name      MyNode_wan2_intf
    		priority  1000
```

#### NTP Service

Currently the 128T data model allows for NTP server configuration. It also manages the NTP client on the nodes. This means that we can assume two things:

* If NTP is configured, then the user wants to do NTP over management interface
* The configured NTP servers are the only ones that should be allowed.

With this in mind, if the NTP config is present and a forwarding management interface is discovered on a node, the following configurations will be generated:

##### Service

```
authority
	router	MyRouter
	system
		ntp
    		server  0.us.ntp.pool.org
        		ip-address  0.us.ntp.pool.org
    		exit
    		server  1.us.ntp.pool.org
        		ip-address  1.us.ntp.pool.org
    		exit
		exit
		service
			name           _management_ntp_
			scope          private
			transport       udp
    			protocol    udp
    			port-range  123
        			start-port  123
        			end-port  123
    			exit
			exit
			address        0.us.ntp.pool.org
						   1.us.ntp.pool.org
			access-policy  _internal_
    			source      _internal_
    			permission  allow
			service-policy  _management_ntp_policy_
```

##### Service Route

The service-route for the NTP service is pretty straight forward. It will look something like this:

```
	service-route
			name          _management_ntp_route_MyNode_wan1_intf_
			service-name  _management_ntp_
			next-hop      MyNode wan1-intf
  				node-name       MyNode
    			interface       wan1-intf
	service-route
			name          _management_ntp_route_MyNode_wan2_intf_
			service-name  _management_ntp_
			next-hop      MyNode wan2-intf
    			node-name       MyNode
    			interface       wan2-intf
```

##### Service Policy

A service policy called _management_ntp_policy_ will be created. The contents of the service-policy will be identical to the DNS service policy.

#### YUM Service

The traffic for yum install and updates operates over standard http and https ports. In addition there is no easy way to identify the destination addresses for yum traffic. So as a result, the yum service can only be a catch all http and https service as follows:

#### SNMP Service

The SNMP service is currently configurable in the router > system > services. The SNMP configuration can act as a server and as a client for sending SNMP trap notifications. From the current data model it looks like the notification client can only be configured when the server is configured. Consider this example configuration:

```
snmp-server
    enabled                true
    port                   161
    notification-receiver  172.18.1.28 161 trap
        ip-address  172.18.1.28
        port        161
        type        trap
    exit
exit
```

When running in linux, this configuration would essentially allow access from any interface. However, this leaves a hole in terms of how this server function can end up being accessed. For example, it might be desirable to allow access to this service from only the management interface. As a result, a new enum value to host-service > service-type called snmp-server will be added. This will allow the user to designate the interface for accessing the snmp-server. This is similar to the current implementation for the web-server. Here’s an example configuration:

```
device-interface wan1
	type 	ethernet
	pci-address	00:03.0
	forwarding	true
	network-interface wan1-internet
		dhcp v4
		management	true
		host-service  snmp-server
    		service-type  snmp-server
		exit
		management-vector       MyNode_wan1_intf
    		name      MyNode_wan1_intf
    		priority  100
		exit
```

When 128T is running, this will create internal host services as we do for SSH, Web server etc. When 128T service is not running, the snmp server function should not be needed and this service will be blocked when 128T is down. The details of the internal host service generation is outside the scope of this document.
When the notification-receiver is configured, an outbound service will be required for routing traffic over the management interface. Here are the generated configurations for such a configuration.


#### Inbound Services

The inbound services can be configured as host services already. However, only inbound services that match the following criteria should be enabled while 128T router is not running:

* Services required for conducting maintenance operation on the node
* Services required for access to the box for troubleshooting

Currently the only host-service which matches this criteria is SSH. As a result, only that will be allowed. Other examples of such services could be SFTP etc but we do not currently configure these.

#### User Defined Services

For any other service such as local internet breakout or something more specific, the user can configure the desired service however they choose. For private service, they can allow the _internal_ tenant access to the said service (or just certain prefixes within the _internal_ tenant). Such services will not be enabled while the 128T router is not running.


## 128T Not running

With management interfaces configured in 128T data model, when the 128T service is not running, a default route will be created for the interfaces with the lowest metric. The route with lower metric will be the preferred route in linux. These metric values are taken from the management-vector configuration. The configuration in Fig. 1 should translate to following routes in linux when 128T is down.
```
	# ip route
	default dev wan1-intf scope link metric 100
```

The interfaces which do not have the lowest metric will not be enabled in ifcfg.

If the interface is dhcp-enabled, add PEERDNS to the ifcfg file so that the learned DNS servers will be placed into resolv.conf.

If the interface is redundant and management, we will require the utility-ip-address on the network-interface. We will assign this address to the linux interface when 128T is not running with the original mac address, not the virtual shared-phys-address from 128T config. The utility-ip-address must be unique per router across the nodes. This will be the one field that is not required to be the same for redundant interfaces.

## Reconfiguring from management-over-forwarding to management over non-forwarding

When reconfiguring from management-over-forwarding to management-over-non-forwarding, some special care must be taken to avoid losing ssh /netconf access.

If using DHCP, your DHCP server may give you options to use the interface as the default-route and give you DNS servers to use. In this case, you just need to set network-interface ifcfg-option ZONE=public or the zone of your choosing. Otherwise, the interface will remain in the custom generated zone matching the previously configured host-services.

If using static addresses, leave the management=true and default-route=true. Add network-interface ifcfg-options DNS1/DNS2,PEERDNS=yes, and ZONE=public or the zone of your choosing. Otherwise, the interface will remain in the custom generated zone matching the previously configured host-services.

