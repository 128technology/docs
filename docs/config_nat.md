---
title: Network Address Translation (NAT)
sidebar_label: NAT
---
## Source NAT
Source NAT can be enabled on `authority > router > node > network-interface`. When enabling `source-nat` on a network-interface, all traffic egressing the interface will be network address and port translated (NAPT) to that of the address on the interface.

:::note
The port range is not configurable and ranges between 16384 to 65534, allowing for 49,150 concurrent sessions per interface.
:::

```
admin@gouda.novigrad# show config running authority router novigrad node gouda device-interface wan network-interface wan-interface 

config

    authority

        router  novigrad
            name  novigrad

            node  gouda
                name              gouda

                device-interface  wan
                    name               wan

                    network-interface  wan-interface
                        name                    wan-interface
                        global-id               1
                        vlan                    0
                        type                    external
                        conductor               false

                        neighborhood            internet
                            name  internet
                        exit
                        inter-router-security   interfabric
                        prioritization-mode     local
                        source-nat              true
                        mtu                     1500
                        enforced-mss            disabled
                        icmp                    allow
                        hostname                gouda.novigrad.net
                        multicast-listeners     automatic
                        multicast-report-proxy  false
                        dhcp                    v4
                    exit
                exit
            exit
        exit
    exit
exit
```

If support for more than 49,150 concurrent sessions per interface is needed, you can configure a _NAT Pool_ or add additional `address`es to the network-interface, expanding the source NAT capacity.

When multiple addresses are configured, utilizing `source-nat`, the second address configured will only be utilized once the first is fully exhausted; so on and so forth.  Once the next configured address starts being utilized, it will remain in use until exhausted.

## Destination NAT
Static desination network address translation can be performed by configuring a `service-route > nat-target`. It is common to leverage the public address of the router for internal services, such as VPN. Traffic destined to the SSR, configured as a _service_ with an _address_ that matches that of the public-facing network-interface is then NATed to an internal private address on the LAN for the application. This setting only performs address translation and does not modify the port.

## Static NAT

SSR supports source NAT pool configurations at interface and service-route level as described in [Static NAT Bindings](#static-nat-bindings). However, this is not always sufficient to enable simple configuration for static bidirectional NAT on a pool of IP addresses. 

Static NAT defines a one-to-one mapping from one IP subnet to another IP subnet. The mapping includes destination IP address translation in one direction and source IP address translation in the reverse direction. In cases where IP address overlapping is found, such as when merging networks (for example, a corporate acquisition and merger) this simple configuration change is significantly less work than changing all the local IP addresses. The diagram below illustrates this example. 

![Static Nat Diagram](/img/static_nat_example.png)

The `spk-lan2` network-interface is not routable (cannot send or receive traffic) in the `Corp` and `Internet` networks. The Client in `spk-lan2` has local IP of `192.168.1.0`, and overlaps with the client from `Corp` in `spk-lan1`. This will cause problems for any sessions between `hub-lan1` or `spk-lan1` to `spk-lan2`. By applying a static NAT configuration that maps `192.18.1.0/24` to `172.16.128.0/24`, sessions destined to `spk-lan2` and arriving from`Corp` or `Internet` are routed to their destination.

The same process must be applied to `spk-lan1`, in this example using the remote IP address `172.16.129.0`.

#### Example

```
config
    authority
        router      spoke
            node       node1-spoke
                device-interface    spk-lan2
                    network-interface    spk-lan2
                        bidirectional-nat    192.168.1.0/24
                            local-ip         192.168.1.0/24
                            remote-ip        172.16.128.0/24
                        exit 
                    exit
                exit
                
                device-interface    spk-lan1
                    network-interface   spk-lan1
                        bidirectional-nat    192.168.1.0/24
                            local-ip         192.168.1.0/24
                            remote-ip        172.16.129.0/24
                        exit 
                    exit
                exit
            exit
        exit
    exit
exit 

```

### Using the GUI

Set the local and remote IP addresses under Authority > Router > Node > Device Interface > Network Interface.

![Network Interface](/img/static_nat_gui_net-intf.png)

![Bidirectional NAT Config](/img/static_nat_gui_nat-config.png)

### Show Commands

For details about command output, refer to the [`show sessions`](cli_reference.md#show-sessions) and [`show sessions by-id`](cli_reference#.mdshow-sessions-by-id) commands.

#### Source NAT
- On the session ingress node, the `show sessions by-id` output has an Ingress Source NAT field where the source-nat type, NAT’d source address, NAT’d port, and protocol are displayed.
- On the session egress node the `show sessions by-id` output has an Ingress Source NAT field where the source-nat type, NAT’d source address, NAT’d port, and protocol are displayed.
- The `show sessions` output has `NAT IP` and `NAT Port` columns where the NAT’d source address and NAT’d source port are displayed.

#### Destination NAT

- On the session egress node the `show sessions by-id` output shows the NAT’d destination address in the Forward Flow `NextHop` and Reverse Flow `src ip` fields.
- The `show sessions` output reverse flow `src ip `column also shows the NAT’d destination address.

## NAT Pools

NAT pools are a construct that allow for the use of IP and port ranges to be shared across one or more network-interfaces for either source or destination NATing capabilies.

### Static NAT bindings
A static NAT binding can be configured by creating an `authority > router > nat-pool` object and assigning it to a network-interface.  The following rules and constraints will apply to this configuration:

* The _nat-pool_ prefix is used to create a N:M mapping. Where each source IP (from ingress interface) is hashed to an IP address in the nat pool.
* The static _nat-pool_ can only be configured as:
  * _ingress-nat-pool_ on a _network-interface_ when peering with another SSR
  * egress-nat-pool on a _network-interface_ when not performing SVR
  * _source-nat-pool_ on a _service-route / next-hop_
* SSR software will not reply to ARP requests on the pool prefix on the associated interface.  Therefore the SSR relies on the pool to be routed to the SSR gateway interface by another mechanism (e.g. static-routes, BGP, etc.) by the _next-hop_ in the network.
* Changes to the pool configuration will not affect the existing sessions as it has the potential of cascading effect on the network. These changes will resolve over time as the existing sessions naturally expire.

The static NAT pool will simply hash the source IP address of incoming packets to the corresponding IP address in the pool.

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

<u>Flow Move Considerations</u>

Currently session migration is only supported for SVR sessions. This restriction exists because session migration of a non-SVR session is not guaranteed to terminate on the same server. As a result, the remote server might receive mid flow packets from a different source, resulting in undefined behavior.

<u>Session Recovery Considerations</u>

For shared NAT pools provisioned on an HA interface that encounters a failover, the SSR software will put the interface into recovery mode to recover all sessions. At the end of the recovery period all non-discovered ports designed as free are returned to the NAT pool.

### Tenant filtering
The _nat-pool_ configuration can optionally be provisioned with a list of tenants. When the configuration has _multiple_ IP pools available, the _tenant_ can be used to determine which IP pool will be selected for the source NAT. Absence of a tenant implies that the IP pool is valid for all traffic. The following rules will be applied in order to determine the selection of the NAT pool:

* The packet has a source tenant associated with it
  * If more than one IP pool has a matching tenant, only the first IP pool is used and the hash is applied to create a session. The remainder of the matches are discarded
  * If a pool with no tenant is configured
    * Same as above
  * All IP pools have tenant configured but none of them match the source tenant
    * Log the failure, increment stat and drop the packet
* The packet has no source tenant associated with it
  * At least one IP pool has no tenant configured to do the source NAT otherwise this will result in the session being dropped

The tenant matching rules will apply to sub-tenants as well. For example, if an IP pool allows tenant engineering, then traffic with source tenant lab.engineering will also match the pool.
