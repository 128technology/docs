---
title: NAT Pools
sidebar_label: NAT Pools
--- 

## NAT Pools

NAT pools are a construct that allows for the use of IP and port ranges to be shared across one or more network-interfaces for either source or destination NATing capabilities.

### Static NAT Bindings

A static NAT binding is configured by creating an `authority > router > nat-pool` object and assigning it to a network-interface. The following rules and constraints apply to this configuration:

* The _nat-pool_ prefix is used to create a N:M mapping, where each source IP (from an ingress interface) is hashed to an IP address in the nat pool.
* The static _nat-pool_ can only be configured as:
  * _ingress-nat-pool_ on a _network-interface_ when peering with another SSR
  * *egress-nat-pool* on a _network-interface_ when not performing SVR
  * _source-nat-pool_ on a _service-route / next-hop_
* SSR software will not reply to ARP requests on the pool prefix on the associated interface. The SSR relies on the pool to be routed to the SSR gateway interface by another mechanism such as static-routes, BGP, etc., by the _next-hop_ in the network.
* Changes to the pool configuration will not affect the existing sessions as it has the potential of cascading effect on the network. These changes resolve over time as the existing sessions naturally expire.

The static NAT pool hashes the source IP address of incoming packets to the corresponding IP address in the pool.

```
nat-pool
	name static-pool-1
	type static
	address-pool
		address 10.10.10.10/31

network-interface
	name	test-lan
	address
		ip-address 192.168.10.1
		prefix-length 24
	ingress-source-nat-pool static-pool-1
```

In the configuration snippet above, the _192.168.10.0/24_ network for the `test-lan` will be source NAT’d to `10.10.10.10/31`. Traffic from an endpoint of source address 192.168.10.10 will be source NAT’d to 10.10.10.10; 192.168.10.11 will be source NAT’d to 10.10.10.11 and so on. Since the NAT in the model relies on a N:M mapping this can only be configured as an _ingress-source-nat-pool_ (on _network-interface_) or as a destination-nat-pool (on _service-route / next-hop_).

### Shared NAT pools
In some scenarios, it is desirable to share the same NAT pool across services and interfaces. This feature accommodates the same NAT pool to be configured on different interfaces. There are some considerations that should be noted for failure and recovery.

#### Flow Move Considerations

Currently session migration is only supported for SVR sessions. This restriction exists because session migration of a non-SVR session is not guaranteed to terminate on the same server. As a result, the remote server might receive mid flow packets from a different source, resulting in undefined behavior.

#### Session Recovery Considerations

For shared NAT pools provisioned on an HA interface that encounters a failover, the SSR software will put the interface into recovery mode to recover all sessions. At the end of the recovery period all non-discovered ports designed as free are returned to the NAT pool.

### Tenant Filtering
The _nat-pool_ configuration can optionally be provisioned with a list of tenants. When the configuration has _multiple_ IP pools available, the _tenant_ can be used to determine which IP pool will be selected for the source NAT. Absence of a tenant implies that the IP pool is valid for all traffic. The following rules will be applied in order to determine the selection of the NAT pool:

* The packet has a source tenant associated with it:
  * If more than one IP pool has a matching tenant, only the first IP pool is used and the hash is applied to create a session. The remainder of the matches are discarded.
  * If a pool with no tenant is configured:
    * Same as above.
  * All IP pools have tenant configured but none of them match the source tenant:
    * Log the failure, increment stat and drop the packet.
* The packet has no source tenant associated with it:
  * At least one IP pool has no tenant configured to do the source NAT, otherwise this will result in the session being dropped.

The tenant matching rules apply to sub-tenants as well. For example, if an IP pool allows tenant engineering, then traffic with source tenant `lab.engineering` will also match the pool.
