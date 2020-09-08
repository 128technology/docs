---
Title: Configuring BGP
sidebar_label: BGP
---



## Configuring BGP

The Border Gateway Protocol (BGP) is a standard exterior gateway protocol developed for exchanging routing and reachability information between Autonomous Systems, a collection of IP routing prefixes managed by a single administrative entity. BGP makes routing decisions based on paths and network policies; although historically mainly seen in service provider networks, it is now gaining acceptance in large enterprise networks. BGP can also be used for routing within an autonomous system as an interior gateway protocol; when doing so it is referred to as iBGP.

Learning routes from BGP simplifies enterprise configuration and integration with Secure Vector Routing. In this configuration guide we will also discuss a 128T-specific feature referred to as "BGP over SVR" (or BGPoSVR), which combines the power of Secure Vector Routing with the rich feature set of the BGP protocol.

### Prerequisites

This section presumes that the reader has a running 128T system and wants to add configuration to support BGP. The running 128T system should already include configuration for basic platform functionality (e.g., `router`, `node`, `device-interface`, `network-interface`) and basic 128T modeling configuration (e.g., tenants, services, etc.). Refer to the [Element Reference](config_reference_guide.md) section of our documentation for a better understanding about basics of the 128T data model.

### Peering with non-128T Routers

The BGP configuration exists in the [`routing`](config_reference_guide.md#routing) configuration container within the 128T data model. For any routing configuration, static or dynamic, a default routing instance called `default-instance` must be defined in the 128T configuration.

In this example we will assume that BGP is configured on the peering router with IP address 1.1.1.1, as autonomous system number (ASN) 6000. To peer the 128T router with this router, we can configure BGP on our 128T using the following commands:

```
admin@branchoffice1.seattlesite1# config auth
admin@branchoffice1.seattlesite1 (authority)# router seattlesite1 
admin@branchoffice1.seattlesite1 (router[name=seattlesite1])# routing default-instance
```
Every 128T router (in this case, the router named `seattlesite1`), contains all of its legacy routing protocol information within the `default-instance` routing container.
```
admin@branchoffice1.seattlesite1 (routing[type=default-instance])# routing-protocol bgp
```
Here we will enter into the BGP portion of the routing configuration model.
```
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# local-as 100 admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# router-id 1.1.1.128
```
This sets our local autonomous system number to 100, and sets the router ID to 1.1.1.128.
```
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# address-family ipv4-unicast
admin@branchoffice1.seattlesite1 (address-family[afi-safi=ipv4-unicast])# exit
```
At least one `address-family` is required to be configured. These address families are also sometimes referred to as "AFI-SAFI" (pronounced "affy-saffy"), which is an Address Family Indicator plus Sub-Address Family Indicator. The most commonly configured `address-family` on the 128T router is by far `ipv4-unicast`. If your deployment uses other address families (e.g., IPv6) or routes multicast, you may also need to configure support for other address families.
```
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# neighbor 1.1.1.1
admin@branchoffice1.seattlesite1 (neighbor[neighbor-address=1.1.1.1])# neighbor-as 6000
admin@branchoffice1.seattlesite1 (neighbor[neighbor-address=1.1.1.1])# address-family ipv4-unicast
admin@branchoffice1.seattlesite1 (address-family[afi-safi=ipv4-unicast])# next-hop-self true
admin@branchoffice1.seattlesite1 (address-family[afi-safi=ipv4-unicast])#exit
admin@branchoffice1.seattlesite1 (neighbor[neighbor-address=1.1.1.1])# exit
```
Last, we configure the `neighbor`. As stated in the example above, we've identified its IP address as `1.1.1.1` and its ASN as 6000. (Because this neighbor has a different ASN than the 128T, the 128T will recognize it as an eBGP peer rather than an iBGP peer.) We give it an `address-family` of `ipv4-unicast`, which lets the 128T know to exchange IPv4 unicast routes with the peer.

Lastly, we set `next-hop-self` to `true.` During advertisement, non-directly connected routers need to learn how to reach an advertised route. To provide this information to the non-directly connected (as well as iBGP peers), next-hop-self command is used. This will cause the 128T to rewrite the `next-hop` information in the routes it advertises to this peer to be its own address.

:::note
In the example above, we've set our router's AS to 100. This will apply to all neighbors as the "default" AS it will advertise. You can override this on a per-neighbor basis by setting `local-as` within the `neighbor` configuration to a different value. However, *you must not configure the same value within the neighbor as you've already set in your global configuration*. This may cause issues when attempting to establish a peering relationship.
:::

Use the `exit` command several times to return to the `routing-protocol` level of the configuration hierarchy, and issue the `show` command. Your configuration should look something like this:

```
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# show
type bgp
local-as 100
router-id 1.1.1.128

address-family  ipv4-unicast
    afi-safi  ipv4-unicast
exit

neighbor        1.1.1.1
    neighbor-address  1.1.1.1
    neighbor-as       6000
    shutdown          false
    
    address-family    ipv4-unicast
        afi-safi      ipv4-unicast
        next-hop-self true
    exit
exit
```

### Advertising Routes
There are two ways to advertise routes into BGP:
1. Using `network` statements to identify the prefixes you want to advertise
2. Redistributing routes learned through other IGP or from configuration

#### Using the `network` Statement
To advertise routes to BGP, configure the network to be advertised under the address-family of the router. You may also apply a policy to the advertised route using  					 					 					command.

:::note
You can apply policies to these routes (i.e., policy and filters) individually. Policies are configured within the authority-level `routing` configuration at `config > authority > routing > filter` and `config > authority > routing > policy`. For more information, refer to the section in our documentation on Filters and Policies.
:::

```
**admin@branchoffice1.seattlesite1# config auth admin@branchoffice1.seattlesite1 (authority)# router seattlesite1 admin@branchoffice1.seattlesite1 (router[name=seattlesite1])# routing default-instance
 admin@branchoffice1.seattlesite1 (routing[type=default-instance])# routing-protocol bgp
 admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# address- family ipv4-unicast
 admin@branchoffice1.seattlesite1 (address-family[afi-safi=ipv4-unicast])# network 172.16.255.0/30
 admin@branchoffice1.seattlesite1 (network[network- address=172.16.255.0/30])# policy allow
 admin@branchoffice1.seattlesite1 (network[network- address=172.16.255.0/30])# exit**
```
In this example we're advertising the CIDR `172.16.255.0/30`, and it will use the global route policy named `allow` (not shown).

#### Redistributing Routes
To redistribute connected, static, service routes and/or routes learned through OSPF, you can use the `redistribute` configuration.

```
admin@branchoffice1.seattlesite1# config auth admin@branchoffice1.seattlesite1 (authority)# router seattlesite1 admin@branchoffice1.seattlesite1 (router[name=seattlesite1])# routing default-instance
admin@branchoffice1.seattlesite1 (routing[type=default-instance])# routing-protocol bgp
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# redistribute connected
```

### Routing Features

This section contains various features supported by the 128T's BGP implementation.

#### Configuring 128T as a Route Reflector Client

While configuring iBGP, you may need to enable the **Route Reflector** option to facilitate easy learning of routes. Your 128T can be configured as a route reflector client for a particular neighbor under the specific neighbor configuration.

```
admin@branchoffice1.seattlesite1# config auth admin@branchoffice1.seattlesite1 (authority)# router seattlesite1 admin@branchoffice1.seattlesite1 (router[name=seattlesite1])# routing default-instance
admin@branchoffice1.seattlesite1 (routing[type=default-instance])# routing- protocol bgp
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# neighbor 1.1.1.1
```
In our example, the route reflector in our network is our neighbor `1.1.1.1`.
```
admin@branchoffice1.seattlesite1 (neighbor[neighbor-address=1.1.1.1])# address-family ipv4-unicast
admin@branchoffice1.seattlesite1 (address-family[afi-safi=ipv4-unicast])# route-reflector client true
admin@branchoffice1.seattlesite1 (address-family[afi-safi=ipv4-unicast])# exit
```
By setting `route-reflector client true`, we instruct the 128T to treat the neighbor as a route reflector.

#### BGP Confederations
When configuring iBGP, the **Confederation** feature may come in handy when dealing with an enormous autonomous system. This feature allows you to break up the AS into smaller sub-autonomous systems. Confederation can be directly configured under the routing protocol element. Here, 65535 is the **confederation identifier AS number** and, 1100 and 2200 are the **member AS** numbers of that confederation AS.

```
admin@branchoffice1.seattlesite1# config auth admin@branchoffice1.seattlesite1 (authority)# router seattlesite1 admin@branchoffice1.seattlesite1 (router[name=seattlesite1])# routing default-instance
admin@branchoffice1.seattlesite1 (routing[type=default-instance])# routing- protocol bgp
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# confederation identifier 65535
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# confederation member-as 1100
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# confederation member-as 2200
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# exit
```

#### BGP over SVR (BGPoSVR)
BGP over SVR can be used when peering with a 128T. This provides the benefit of Secure Vector Routing for all BGP traffic flowing to-and-from the 128T peers. To configure BGP over SVR, ensure that the running 128T system has configuration for basic platform functionality.

Next, we need to configure a *routing interface*, which is similar to a loopback interface on traditional routers. Unlike normal loopback BGP peering, this IP address does not need to be routable on the transport network as it will never see the wire. BGP peering will be created on this interface. The conductor will then trigger on this and configure a few more pieces (autogenerated) to activate BGP over SVR, such as:

- _bgp_speaker_ tenant
- Auto-generated BGP services and service routes
- Router Peers

These BGP connections will then be protected by SVR, and able to flexibly migrate between SVR paths.

:::note
You must use a conductor to configure BGP over SVR; manually configuring the various pieces between two routers is not supported.
:::

:::note
If the interface facing the BGPoSVR peer is already part of a neighborhood, then ensure that the two routers' interface topology types (`network-interface >neighborhood > topology`) are configured such that it allows the routers to form peering relationships for the auto-generated peer service routes; e.g., mesh-mesh, mesh-hub, mesh-spoke or hub-spoke.
:::

Next, configure a BGP instance with the router’s local AS and a router-id which matches the routing interface's IP. For each BGP over SVR peer, use a neighbor address of the neighbor's routing interface IP address. Next, configure the normal BGP peer configuration options such as the timers and address families that are needed. In address-family IPv4-unicast, `next-hop-self` must be set to `true`.

:::note
When configuring BGPoSVR with an eBGP peer, you must set `multihop ttl` to at least `2`.
:::

##### Configuration Template:
```
config
    authority
    router myRouter
        routing default-instance
            type default-instance
            interface rtg-int
                name rtg-int
                ip-address <myAddress>
            exit
            routing-protocol bgp
                type bgp
                local-as 100
                router-id <myAddress>
                neighbor <theirAddress>
                neighbor-as 200
                timers
                    hold-time 9
                    keepalive-interval 3
                exit
                address-family ipv4-unicast
                    afi-safi ipv4-unicast
                    next-hop-self true
                exit
                transport
                    local-address
                        routing-interface rtg-int
                    exit
                exit
                multihop
                    ttl 255
                exit
            exit
        exit
    exit
exit
```

##### Sample Configuration:
```
admin@branchoffice1.seattlesite1# config auth admin@branchoffice1.seattlesite1 (authority)# router seattlesite1 admin@branchoffice1.seattlesite1 (router[name=seattlesite1])# routing default-instance
admin@branchoffice1.seattlesite1 (routing[type=default-instance])# interface bgp-int-seattle
admin@branchoffice1.seattlesite1 (interface[name=bgp-int-seattle])# ip- address 10.128.128.2
admin@branchoffice1.seattlesite1 (interface[name=bgp-int-seattle])# exit admin@branchoffice1.seattlesite1 (routing[type=default-instance])# routing- protocol bgp
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# local-as 100 admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# router-id 10.128.128.2
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# address- family ipv4-unicast
admin@branchoffice1.seattlesite1 (address-family[afi-safi=ipv4-unicast])# exit
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# neighbor 10.128.128.1
admin@branchoffice1.seattlesite1 (neighbor[neighbor-address=10.128.128.1])# neighbor-as 300
admin@branchoffice1.seattlesite1 (neighbor[neighbor-address=10.128.128.1])# address-family ipv4-unicast
admin@branchoffice1.seattlesite1 (address-family[afi-safi=ipv4-unicast])# next-hop-self true
admin@branchoffice1.seattlesite1 (address-family[afi-safi=ipv4-unicast])# exit
admin@branchoffice1.seattlesite1 (neighbor[neighbor-address=10.128.128.1])# transport
admin@branchoffice1.seattlesite1 (transport)# local-address
admin@branchoffice1.seattlesite1 (local-address)# routing-interface bgp-int-seattle
admin@branchoffice1.seattlesite1 (local-address)# exit
admin@branchoffice1.seattlesite1 (transport)# exit
admin@branchoffice1.seattlesite1 (neighbor[neighbor-address=10.128.128.1])# multihop
admin@branchoffice1.seattlesite1 (multihop)# ttl 255
admin@branchoffice1.seattlesite1 (multihop)# exit
admin@branchoffice1.seattlesite1 (neighbor[neighbor-address=10.128.128.1])# exit
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# exit admin@branchoffice1.seattlesite1 (routing[type=default-instance])# exit admin@branchoffice1.seattlesite1 (router[name=seattlesite1])# exit admin@branchoffice1.seattlesite1 (authority)# exit admin@branchoffice1.seattlesite1#
```

#### Verifying the BGP Configuration
Use `show bgp` to see the overview of the BGP routing process on the 128T:

```
admin@branchoffice1.seattlesite1# show bgp
Wed 2019-02-20 23:14:58 UTC
BGP table version is 12, local router ID is 10.128.128.2, vrf id 0
Status codes:  s suppressed, d damped, h history, * valid, > best, = multipath,
               i internal, r RIB-failure, S Stale, R Removed
Nexthop codes: @NNN nexthop's vrf id, < announce-nh-self
Origin codes:  i - IGP, e - EGP, ? - incomplete

   Network          Next Hop            Metric LocPrf Weight Path
   10.128.128.2/32  10.128.128.3                           0 200 300 ?
   10.128.128.3/32  10.128.128.3                           0 200 300 ?
   128.128.128.1/32 10.128.128.3                           0 200 300 ?
   128.128.128.128/32
                    10.128.128.3                           0 200 300 ?
   172.16.128.2/32  10.128.128.3                           0 200 300 ?
   172.16.255.0/30  0.0.0.0                  0         32768 i
   172.26.128.0/30  10.128.128.3                           0 200 300 i

Displayed  7 routes and 7 total paths
```

In addition to the output from `show bgp`, you will now see contributions to the RIB from BGP in the output of `show rib`.

```
admin@branchoffice1.seattlesite1# show rib
Wed 2019-02-20 23:04:20 UTC
Codes: K - kernel route, C - connected, S - static, R - RIP,
       O - OSPF, I - IS-IS, B - BGP, P - PIM, T - Table, v - VNC,
       V - VNC-Direct,
       > - selected route, * - FIB route

B   1.1.1.0/24 [20/0] via 1.1.1.1 inactive, 22:28:18
C>* 1.1.1.0/24 is directly connected, g4
B>* 2.2.2.0/24 [20/0] via 1.1.1.1, g4, 22:28:18
B>* 3.3.3.0/24 [20/0] via 1.1.1.1, g4, 22:28:18
C>* 10.0.128.0/31 is directly connected, g1
K>* 128.128.128.1/32 is directly connected, Null0, bh
K>* 128.128.128.128/32 is directly connected, Null0, bh
C>* 169.254.127.126/31 is directly connected, g4294967294
S>* 172.16.128.2/32 [1/0] via 10.0.128.1, g1
K   172.16.128.2/32 is directly connected, Null0, bh
K>* 172.26.128.2/32 is directly connected, Null0, bh
C>* 192.168.64.0/24 is directly connected, g2


Completed in 0.09 seconds
admin@branchoffice1.seattlesite1#
```

:::note
As shown in the header, the routes that start with `B` are contributed by BGP.
:::