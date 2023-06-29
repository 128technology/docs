---
title: Border Gateway Protocol (BGP)
sidebar_label: BGP
---

The Border Gateway Protocol (BGP) is a standard exterior gateway protocol developed for exchanging routing and reachability information between Autonomous Systems, a collection of IP routing prefixes managed by a single administrative entity. BGP makes routing decisions based on paths and network policies; although historically mainly seen in service provider networks, it is now gaining acceptance in large enterprise networks. BGP can also be used for routing within an autonomous system as an interior gateway protocol; when doing so it is referred to as iBGP.

Learning routes from BGP simplifies enterprise configuration and integration with Secure Vector Routing. In this configuration guide we will also discuss a SSR-specific feature referred to as "BGP over SVR" (or BGPoSVR), which combines the power of Secure Vector Routing with the rich feature set of the BGP protocol.

## Prerequisites

This section presumes that you have a running SSR system and wants to add configuration to support BGP. The running SSR system should already include configuration for basic platform functionality (e.g., `router`, `node`, `device-interface`, `network-interface`) and basic SSR modeling configuration (e.g., tenants, services, etc.). Refer to the [Element Reference](config_reference_guide.md) section of our documentation for a better understanding about basics of the SSR data model.

## Peering with non-SSR Routers

The BGP configuration exists in the [`routing`](config_reference_guide.md#routing) configuration container within the SSR data model. For any routing configuration, static or dynamic, a default routing instance called `default-instance` must be defined in the SSR configuration.

In this example we will assume that BGP is configured on the peering router with IP address 1.1.1.1, as autonomous system number (ASN) 6000. 

1. To peer the SSR with this router, configure BGP on our SSR using the following commands:

```
admin@branchoffice1.seattlesite1# config auth
admin@branchoffice1.seattlesite1 (authority)# router seattlesite1 
admin@branchoffice1.seattlesite1 (router[name=seattlesite1])# routing default-instance
```
Every SSR router (in this case, the router named `seattlesite1`), contains all of its legacy routing protocol information within the `default-instance` routing container.
```
admin@branchoffice1.seattlesite1 (routing[type=default-instance])# routing-protocol bgp
```

2. Enter into the BGP portion of the routing configuration model; set the local autonomous system number to 100, and set the router ID to 1.1.1.128.

```
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# local-as 100
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# router-id 1.1.1.128
```

3. Configure the `address-family` using `ipv4-unicast`. At least one `address-family`must be configured, and typically is set as `ipv4-unicast`. If your deployment uses other address families (e.g., IPv6) or routes multicast, you may also need to configure support for other address families.

```
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# address-family ipv4-unicast
admin@branchoffice1.seattlesite1 (address-family[afi-safi=ipv4-unicast])# exit
```
Address families are also sometimes referred to as "AFI-SAFI" (pronounced "affy-saffy"), which is an Address Family Indicator plus Sub-Address Family Indicator. 

4. Configure the `neighbor`. In the example here, we've identified its IP address as `1.1.1.1` and its ASN as 6000. (Because this neighbor has a different ASN than the SSR, the SSR will recognize it as an eBGP peer rather than an iBGP peer.) An `address-family` of `ipv4-unicast`, lets the SSR know to exchange IPv4 unicast routes with the peer.

```
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# neighbor 1.1.1.1
admin@branchoffice1.seattlesite1 (neighbor[neighbor-address=1.1.1.1])# neighbor-as 6000
admin@branchoffice1.seattlesite1 (neighbor[neighbor-address=1.1.1.1])# address-family ipv4-unicast
admin@branchoffice1.seattlesite1 (address-family[afi-safi=ipv4-unicast])# next-hop-self true
admin@branchoffice1.seattlesite1 (address-family[afi-safi=ipv4-unicast])#exit
admin@branchoffice1.seattlesite1 (neighbor[neighbor-address=1.1.1.1])# exit
```

5. Set `next-hop-self` to `true.` During advertisement, non-directly connected routers need to learn how to reach an advertised route. To provide this information to the non-directly connected (as well as iBGP peers), next-hop-self command is used. This will cause the SSR to rewrite the `next-hop` information in the routes it advertises to this peer to be its own address.

:::note
In the example above, we've set our router's AS to 100. This will apply to all neighbors as the "default" AS it will advertise. You can override this on a per-neighbor basis by setting `local-as` within the `neighbor` configuration to a different value. However, *you must not configure the same value within the neighbor as you've already set in your global configuration*. This may cause issues when attempting to establish a peering relationship.
:::

6. Use the `exit` command several times to return to the `routing-protocol` level of the configuration hierarchy, and issue the `show` command. Your configuration should look something like this:

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

## Advertising Routes
There are two ways to advertise routes into BGP:
- Using `network` statements to identify the prefixes you want to advertise
- Redistributing routes learned through other IGP or from configuration

#### Using the `network` Statement
To advertise routes to BGP, configure the network to be advertised under the address-family of the router. You may also apply a policy to the advertised route using  					 					 					command.

:::note
You can apply policies to these routes (i.e., policy and filters) individually. Policies are configured within the authority-level `routing` configuration at `config > authority > routing > filter` and `config > authority > routing > policy`. For more information, refer to the section in our documentation on Filters and Policies.
:::

```
**admin@branchoffice1.seattlesite1# config auth
 admin@branchoffice1.seattlesite1 (authority)# router seattlesite1
 admin@branchoffice1.seattlesite1 (router[name=seattlesite1])# routing default-instance
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
admin@branchoffice1.seattlesite1# config auth
admin@branchoffice1.seattlesite1 (authority)# router seattlesite1
admin@branchoffice1.seattlesite1 (router[name=seattlesite1])# routing default-instance
admin@branchoffice1.seattlesite1 (routing[type=default-instance])# routing-protocol bgp
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# redistribute connected
```

## BGP over SVR (BGPoSVR)
Use BGP over SVR when peering with an SSR to gain the benefit of Secure Vector Routing for all BGP traffic flowing to-and-from the SSR peers. 

This procedure assumes that the SSR system is configured for basic platform functionality. Refer to the configuration example below for context.

To configure BGP over SVR:

1. Configure a *routing interface*. This is similar to a loopback interface on traditional routers. 
Unlike normal loopback BGP peering, this IP address does not need to be routable on the transport network because it will never see the wire. BGP peering is created on this interface. The conductor triggers on this and autogenerates the following components to activate BGP over SVR:

- _bgp_speaker_ tenant
- Auto-generated BGP services and service routes
- Router Peers

These BGP connections are protected by SVR, and able to migrate between SVR paths.

:::note
You must use a conductor to configure BGP over SVR; manually configuring the various pieces between two routers is not supported.
:::

:::note
If the interface facing the BGPoSVR peer is already part of a neighborhood, then ensure that the two routers' interface topology types (`network-interface >neighborhood > topology`) are configured allowing the routers to form peering relationships for the auto-generated peer service routes; e.g., mesh-mesh, mesh-hub, mesh-spoke or hub-spoke.
:::

2. Configure a BGP instance with the router’s local AS and a router-id that matches the routing interface's IP. For each BGP over SVR peer, use a neighbor address of the neighbor's routing interface IP address. 

3. Configure the BGP peer configuration options such as the timers and address families. In address-family IPv4-unicast, `next-hop-self` must be set to `true`.

:::note
When configuring BGPoSVR with an eBGP peer, you must set `multihop ttl` to at least `2`.
:::

#### Configuration Example:
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

#### Sample Configuration:
```
admin@branchoffice1.seattlesite1# config auth
admin@branchoffice1.seattlesite1 (authority)# router seattlesite1
admin@branchoffice1.seattlesite1 (router[name=seattlesite1])# routing default-instance
admin@branchoffice1.seattlesite1 (routing[type=default-instance])# interface bgp-int-seattle
admin@branchoffice1.seattlesite1 (interface[name=bgp-int-seattle])# ip- address 10.128.128.2
admin@branchoffice1.seattlesite1 (interface[name=bgp-int-seattle])# exit
admin@branchoffice1.seattlesite1 (routing[type=default-instance])# routing- protocol bgp
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# local-as 100
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# router-id 10.128.128.2
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
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# exit
admin@branchoffice1.seattlesite1 (routing[type=default-instance])# exit
admin@branchoffice1.seattlesite1 (router[name=seattlesite1])# exit
admin@branchoffice1.seattlesite1 (authority)# exit
admin@branchoffice1.seattlesite1#
```

### Service-route Mesh For Route Reflector Clients

Use this option to generate a full-mesh BGP over SVR configuration, where all spokes learn the routes from other spokes via the reflector. In this configuration, the hub is a route reflector and all spokes are SVR peers, having been placed in the same mesh neighborhood. The BGP next hop is the originating spoke, and traffic is passed via SVR directly between the spokes. 

To use this feature, the following configuration must be in place:

- BGP must be configured with one or more route reflectors.
    - On the router to be used as a route reflector, configure `routing-protocol bgp neighbor <ip-addr> address-family ipv4-unicast route-reflector client  true`.
- The route-reflector is configured to connect via BGP over SVR to multiple clients.
- The route-reflector clients are configured to have a full mesh of SVR peering relationships with each other - this is done by putting them all in the same mesh neighborhood.

After verifying the router configurations are correct, use the GUI or the pcli to set `route-reflector-client-mesh` to `true`. The conductor then generates the service-routes to allow direct SVR communication between the clients, based on the BGP routes they learn from each other via the reflector.

#### Version History

| Release | Modification |
| ------- | ------------ |
| 6.1.0   | This feature was introduced. |

### Security Policy and Service Policy

The Security and Service Policy configuration options are provided for specifying the policy to be used for generated BGP-over-SVR services. 

![BGP Service Generation Settings](/img/config_bgp_serv_gen_settings.png)

To access these settings from the pcli:

```
config
    authority
        bgp-service-generation
        security-policy                 internal
        service-policy                  prefer-path1
        route-reflector-client-mesh     true
        exit
    exit
exit
```

#### Version History

| Release | Modification |
| ------- | ------------ |
| 6.1.0   | This feature was introduced. |

### Verifying the BGP Configuration
Use `show bgp` to see the overview of the BGP routing process on the SSR:

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

In addition to the output from `show bgp`, the contributions to the RIB from BGP are visible in the output of `show rib`.

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
As shown in the header, the routes that start with **B** are contributed by BGP.
:::

## BGP over SVR Inter-Hub Steering

Path based BGP over SVR Routing responds to changes in peer adjacency, operational status, or SLA. It adds the ability to select and advertise BGP routes between BGP over SVR neighbors. It does this by monitoring the peer paths between BGP over SVR peers and dynamically adjusting the BGP neighbor inbound and outbound policy on those peers to reflect the priority and SLA of the peer paths.

In an SVR hub and spoke topology where a spoke connects to more than one hub router, it may be desirable to align service-policy based peer-path selection (between spoke and the hubs) with the BGP next-hop selection. The BGP next-hop (i.e. hub) that the spoke selects should correspond to the best available peer-path at any time.

The user configures the service-policy which provides the criteria for picking the best path. With this information, the BGP neighbors are prioritized. To ensure that BGP uses the best path, we configure the `action set-path-based-as-path prepend` to an AS path, which is a sequence of AS numbers. The prepend value is applied to BGP routes matched by the policy, making the BGP route AS path longer and thus less preferred. This forces BGP over a particular path, based on the path quality requirements. 

However, in cases where failover or connection issues force the use of a less desirable path, the software will recognize the (lesser) path as "in use" and will not prepend the AS-path. When the path returns to the best path, the value is prepended to the less desirable path. 

This changes dynamically over time: If the preferred path (based on the `service-policy`) changes, the system adjusts the routing policy on the fly. The same criteria is applied to any changes to the path choice.

## Configuration

The following configuration process assumes that we are starting with a BGP over SVR configuration that has multiple BGP over SVR neighbors.

1. Configure the network interface neighborhoods so that each SVR adjacency is identified by a unique vector. If a particular network interface has multiple adjacencies, configure multiple neighborhoods on that interface. 

```
router hub1


        network-interface mpls 
            neighborhood mpls-hub1-spoke 
             vector mpls-hub1-spoke
         exit

        network-interface lte 
            neighborhood lte-hub1-spoke 
            vector lte-hub1-spoke 
        exit
    exit

router hub2


        network-interface mpls 
            neighborhood mpls-hub2-spoke 
             vector mpls-hub2-spoke
         exit

        network-interface lte 
            neighborhood lte-hub2-spoke 
            vector lte-hub2-spoke 
        exit
    exit


router spoke1


        network-interface mpls 
            neighborhood mpls-hub1-spoke 
             vector mpls-hub1-spoke
         exit

        network-interface mpls 
            neighborhood mpls-hub2-spoke 
             vector mpls-hub2-spoke 
        exit
    exit

        network-interface lte 
            neighborhood lte-hub1-spoke 
            vector lte-hub1-spoke 
        exit

        network-interface lte 
            neighborhood lte-hub2-spoke 
            vector lte-hub2-spoke
        exit
    exit
```

2. Configure a service policy that maps the adjacency vectors to a priority. 
```
service-policy prefer-mpls-hub1 
    vector mpls-hub1-spoke 
    priority 1
    exit
service-policy prefer-mpls-hub1 
    vector mpls-hub2-spoke 
    priority 2
    exit
service-policy prefer-mpls-hub1 
    vector lte-hub1-spoke 
    priority 3
    exit
service-policy prefer-mpls-hub1 
    vector lte-hub2-spoke 
    priority 4
    exit
exit
```

3. Configure a routing policy that includes the new routing policy `set-path-based-as-path` action. See [Configuration Commands](#configuration-commands) below for additional information.

```
policy spoke-to-hub  
    statement 1
        action set-path-based-as-path 
            type             set-path-based-as-path
            prepend          65000
            service-policy   prefer-mpls-hub1 
        exit
    exit
exit
```

4. Configure the BGP over SVR neighbor policies: Inbound and Outbound policies are configured on the spoke to select a BGP route containing the hub with the most preferred adjacency. 

```
router spoke 
    routing default-instance 
        routing-protocol bgp 
        neighbor <hub1> 
            neighbor-policy inbound-policy spoke-to-hub
        exit
    exit

router spoke 
    routing default-instance 
        routing-protocol bgp 
        neighbor <hub1> 
            neighbor-policy outbound-policy spoke-to-hub
        exit

router spoke 
     routing default-instance 
        routing-protocol bgp 
        neighbor <hub2> 
            neighbor-policy inbound-policy spoke-to-hub
        exit

router spoke 
    routing default-instance 
        routing-protocol bgp 
        neighbor <hub2> 
            neighbor-policy outbound-policy spoke-to-hub 
        exit
    exit
exit
```

The service policy in the new routing policy path-based action determines the best BGP peer using the adjacency vectors. Per peer routing policies are dynamically modified as the best paths to the BGP over SVR neighbors change.

### How It Works

On the spoke, the best adjacency is to `hub1` (via mpls1). The BGP `hub1` inbound policy uses the primary routing policy which has no `as-path prepend`. The BGP `hub2` inbound policy uses the shadow inbound policy that sets an `as-path prepend` making the received routes less preferred.

When the adjacency from spoke to `hub1` over mpls goes down, the best adjacency is now `hub2` (via mpls2). The `hub1` inbound policy changes to use the shadow, and the `hub2` inbound policy uses the primary. Route updates from `hub2` are now preferred.

### BGP Conditional Advertisement 

Path-based BGP can be used in combination with BGP conditional advertisement. Path-based BGP sets the BGP selected route using the inbound policy. BGP conditional advertisement only considers the BGP selected route. BGP conditional advertisement will always override the neighbor outbound policy. If a BGP prefix matches both the BGP outbound policy and the BGP conditional advertisement advertise-policy, the conditional advertisement takes precedence. 

### Configuration Commands

The configuration for `set-path-based-as-path` is performed under the routing policy, as an action within a statement: 

```
action set-path-based-as-path 
    type             set-path-based-as-path
    prepend          <as-path> 
    service-policy   <service-policy-name>
```
In context:

```
authority
    routing
        policy spoke-to-hub
            name spoke-to-hub

            statement  s0
                name    s0
                policy  accept

                action  set-path-based-as-path
                    type            set-path-based-as-path
                    prepend         65001
                    service-policy  prefer-mpls-hub1
                exit
            exit
        exit
```

## Troubleshooting 

The PCLI command `show bgp path-based-policy` displays the current best peer for each group of peers sharing the same service policy. Information includes the last time the best peer changed for the group, and the number of times the best peer changed. The current `show bgp` commands, along with the `show peers` and logging messages can also help debug this feature. 

The following is an example output from `show bgp path-based-policy`:

```
admin@node0.02000101ffc5# show bgp path-based-policy
Mon 2023-06-26 19:24:04 UTC
\u2714 Getting BGP path-based-policy information...

========================= ============= ============= =================== ==============
 Routing Policy            Num Changes   Last Change   Service Policy      Primary Peer
========================= ============= ============= =================== ==============
 prefer_wan2-from-hub                1   13s           prefer_wan2-s0-sp   hub2
 prefer_wan2-towards-hub             1   13s           prefer_wan2-s0-sp   hub2

Successfully retrieved BGP path-based-policy information.
Completed in 0.19 seconds


admin@node0.02000101ffc5# show bgp path-based-policy detail
Mon 2023-06-26 19:24:10 UTC
\u2714 Getting BGP path-based-policy information...

============================================================
 Information
============================================================
 Path Based Policy:
   Peers:                        hub1, hub2
   Time Since Update Millisec:   18976
   Routing Policy:               prefer_wan2-from-hub
   Service Policy:
     Primary Peers:              hub2
     Policy:                     prefer_wan2-s0-sp
   Changes:                      1
 Path Based Policy:
   Peers:                        hub1, hub2
   Time Since Update Millisec:   18949
   Routing Policy:               prefer_wan2-towards-hub
   Service Policy:
     Primary Peers:              hub2
     Policy:                     prefer_wan2-s0-sp
   Changes:                      1

Successfully retrieved BGP path-based-policy information.
Completed in 0.04 seconds
```

## VRF BGP Over SVR

The establishment of a BGP session over SVR is achieved by the conductor auto-generating the necessary services and service-routes. The introduction of the VRF feature allows for configuring BGP instances within a VRF, and establishing BGP sessions with neighbors within the same VRF. 

When configuring VRFs, there can be multiple BGP instances configured on one router, each one expecting to communicate via a separate VRF routing table. The result is that the generated routing-stack service-route needs to indicate which VRF table to direct the BGP session to.

By explicitly disabling the auto-generation of BGP services and service-routes for any configured BGP neighbor, it is possible to establish BGP sessions that use routing interfaces (aka “loopback” interfaces) for communication without also using SVR.

Other supported use cases include the ability to establish BGP over SVR sessions with each side residing in a different VRF. The typical scenario is a VPN architecture where one router is a CPE device on a customer site without any explicit VRF configuration. It connects to another router at the VPN provider which has a VRF configured for this customer and a BGP instance inside that VRF: 

![BGP Instance inside VRF](/img/config_BGPoSVRinVRF.png)

In this example, the BGP instance configured in the default VRF on a CPE router needs to establish a session with a VRF BGP instance in the VPN provider’s router. To enable the generation of appropriate BGP service and service-route configuration objects, and in cases where the VRF's have overlapping address space, some additional BGP neighbor configuration is required.

### Configuration Example

The following example is based on the VPN provider scenario illustrated above: **router A** (the VPN Provider) represents a core router with a BGP instance inside a VRF peered with **router B’s** (Customer Y) BGP instance inside the default VRF.
```
authority
    router A
        routing default-instance
            vrf vrfA
                interface loopback-vrfA
                    ip-address 10.0.0.10
                exit
                routing-protocol bgp
                    local-as 500
                    router-id 10.0.0.10
                    neighbor 10.0.0.11
                        neighbor-as 500
                        transport
                            bgp-service-generation
                                neighbor-vrf default
                            exit
                            local-address
                                routing-interface loopback-vrfA
                            exit
                        exit
                    exit
                exit
            exit
        exit
    exit
    router B
        routing default-instance
            interface loopback
                 ip-address 10.0.0.11
            exit
            routing-protocol bgp
                local-as 500
                router-id 10.0.0.11
                neighbor 10.0.0.10
                    neighbor-as 500
                    transport
                        bgp-service-generation
                            neighbor-vrf vrfA
                        exit
                        local-address
                            routing-interface loopback
                        exit
                    exit
                exit
            exit
        exit
    exit
exit

```

#### BGP Service Generation

The `bgp-service-generation` configuration object is available in a BGP neighbor’s `transport` settings. For neighbors specified in the default routing instance or specified inside a VRF, the following choices are available:

- `disabled `: Do not generate BGP service or service-routes.
- `neighbor-vrf (<vrf-name>|default) `: Name of the neighbor’s VRF in which the peer BGP instance resides. Can be “default” to specify the default VRF.
- `same-neighbor-vrf `: (Default) Generate the BGP service if there is a matching peer with a BGP instance within the same VRF. Explicitly specifying this is equivalent to not configuring any `bgp-service-generation` statement.

#### Routing-Stack Service-Route

A service-route of type `routing-stack` can be directed to a specific VRF:
```
authority
    router
        service-route <service-route-name>
            service-name <service-name>
            routing-stack
            routing-stack-vrf <vrf-name>
```
The existing `routing-stack` statement directs the session into the `routingEngine` network namespace used by the routing engine. The optional `routing-stack-vrf <vrf-name>` statement specifies the desired VRF within the `routingEngine` namespace. The `vrf-name` parameter is a reference to an existing VRF in the same router. If no `routing-stack-vrf` is specified, the target of the service-route is the default VRF.

Service-routes of type `routing-stack` are automatically generated by the conductor for use with an auto-generated BGP service. Manually creating this type of service-route is not supported.

#### Generated Services and Tenants

More than one access-policy can be specified in a service; a service is generated for each unique routing-interface and VRF tuple for a given router. Because multiple peering relationships may exist using that service, the access-policy lists all tenants associated with the BGP neighbors using that service for peering. All tenants used in these access-policy statements appear as generated tenants in the configuration, one for each VRF in use.

For a BGP neighbor residing in the default VRF, the generated BGP service  is named `_bgp_<router-name>_<routing-interface-name>`, and the tenant associated with this BGP neighbor in the default VRF is named `_bgp_speaker_`.

For a BGP neighbor residing in a non-default VRF, the generated BGP service is named `_bgp_<router-name>_<vrf-name>_<vrf-routing-interface-name>`. The associated tenant is named `_<vrf-name>._vrf_bgp_speaker_`.

### Troubleshooting

If expected BGP services or service-routes are not auto-generated, use the log messages on the conductor to troubleshoot. Each BGP service and service-route that is generated or skipped for config generation results in a debug level log message. These messages are written to `persistentDataManager.log` with category RTG and sub-category CFG.

If all expected configuration has been generated, but a BGP over SVR session does not come up, then all available tools for debugging traffic problems also apply to BGP sessions:

- show fib
- show service-path
- show sessions

Additionally, use the `show rib {vrf <vrf-name>}` command to verify the BGP neighbor is reachable and its kernel route entry is not superseded by another, higher priority entry in the RIB. 

## BGP Conditional Advertisement

When an SSR prefers a given provider for outbound traffic, it can be configured to receive locally destined traffic from that provider. By advertising the SSR's local routes to the preferred provider, it ensures that locally destined traffic only comes from the preferred provider.

### Configuration

BGP conditional advertisement is configured under the BGP neighbor address by configuring a conditional routing policy and an advertisement routing policy.

When the conditional routing policy is satisfied against all BGP selected routes in the BGP RIB, all routes in the BGP RIB matched by the advertising routing policy are advertised to the configured neighbor. 

If the conditional routing policy is not satisfied, all routes matched by the advertising route policy are withdrawn from the configured neighbor. The conditional routing policy may be configured to be satisfied in an `exist-case`, where any route matches the policy; or where no route matches - a `non-exist case`. 

For example:

```
routing-protocol bgp
    type                       bgp
    local-as                   2
    conditional-advertisement
        interval-time  15
    exit
    neighbor                   <neighbor-ip>
        address-family    ipv4-unicast
            conditional-advertisement
                advertisement-policy  <policy-name>
                exist-policy          <policy-name>
            exit
        exit
    exit
    neighbor                   <neighbor-ip>
        address-family    ipv4-unicast
            conditional-advertisement
                advertisement-policy  <policy-name>
                non-exist-policy      <policy-name>
            exit
        exit
    exit
exit

```
The conditional routing policy is evaluated by default every 60 seconds, but is configurable as shown above.

Conditional advertisement is applicable to established BGP neighbors only.

### Example Configuration

In this example, the hubs are 11.1.1.4, 11.1.1.5, and 172.16.3.6. The conditional exist policy for each hub is the default route prefix match, and the peer address of the hub. The hubs use the same advertise policy.

```
filter  default-route
    type  prefix-filter
    name  default-route 
    rule  10
        name    10
        prefix  0.0.0.0/0
    exit
exit
filter  15-0
    type  prefix-filter
    name  15-0
    rule  10
        name    10
        prefix  15.0.0.0/16
        le      32
    exit
exit
policy  default-dut4
    name       default-dut4
    statement  10
        name       10
        condition  address-prefix-filter-condition
            type           address-prefix-filter-condition
            prefix-filter  default-route
        exit
        condition  peer-condition
            type          peer-condition
            peer-address  11.1.1.4
        exit
    exit
exit 
policy  default-dut5
    name       default-dut5
    statement  10
        name       10
        condition  address-prefix-filter-condition
            type           address-prefix-filter-condition
            prefix-filter  default-route
        exit
        condition  peer-condition
            type          peer-condition
            peer-address  11.1.1.5
        exit
    exit
exit
policy  default-dut6
    name       default-dut6
    statement  10
        name       10
        condition  address-prefix-filter-condition
            type           address-prefix-filter-condition
            prefix-filter  default-route
        exit
        condition  peer-condition
            type          peer-condition
            peer-address  172.16.3.6
        exit
    exit
exit
policy  15-0
    name       15-0 
    statement  10
        name       10
         condition  address-prefix-filter-condition
            type           address-prefix-filter-condition
            prefix-filter  15-0
        exit
        action     set-community
            type                 set-community
            community-attribute  2:15
        exit
    exit
exit

routing-protocol  bgp
    type                       bgp
    local-as                   2
    conditional-advertisement
        interval-time  15
    exit
    neighbor                   11.1.1.4
        neighbor-address  11.1.1.4
        neighbor-as       4
        address-family    ipv4-unicast
            afi-safi                   ipv4-unicast
            conditional-advertisement
                advertisement-policy  15-0
                exist-policy          default-dut4
            exit
        exit
    exit
    neighbor                   11.1.1.5
        neighbor-address  11.1.1.5
        neighbor-as       5 
        address-family    ipv4-unicast
            afi-safi                   ipv4-unicast
            conditional-advertisement
                advertisement-policy  15-0
                exist-policy          default-dut5
            exit
        exit
    exit
    neighbor                   172.16.3.6
        neighbor-address  172.16.3.6
        neighbor-as       6
        address-family    ipv4-unicast
            afi-safi                   ipv4-unicast
            conditional-advertisement
                advertisement-policy  15-0
                exist-policy          default-dut6
            exit
        exit
    exit
exit

```
### Known Limitations

This feature may introduce some additional load on the routing engine as the conditional policy must be executed each time the BGP RIB changes.

### Show Commands

Use `show bgp neighbors` to see information about the neighbor conditional advertisement configuration and state:

```
PCLI# show bgp neighbors
…
BGP neighbor is 11.1.1.5, remote AS 5, local AS 2, external link
…
  Condition EXIST, Condition-map *default-dut5, Advertise-map *15-0, status: Withdraw
```

## BGP Graceful Restart

Users can now configure `graceful-restart` as disabled, rather than helper mode or full graceful restart. Additionally, the graceful restart mode on BGP neighbors can be configured differently than on the BGP instance. Historically there was no separate neighbor configuration. The graceful restart mode must be explicitly enabled, otherwise the default mode is **helper**. 

Example New Data Model Objects
```
routing-protocol     bgp
    local-as         65    
    graceful-restart        
        mode             enable       
        restart-time     150       
        stale-routes-time    150        
    …        
    neighbor     172.16.0.1            
        neighbor-as    66           
        graceful-restart               
            mode         disable
```


### Show Command and Troubleshooting

Use the `show bgp neighbors` command to verify graceful restart is configured as expected. Graceful restart is part of BGP capabilities negotiation.  When the BGP peering session is established, the command output includes the negotiated graceful restart:
```
Graceful Restart Capability: advertised
Graceful restart information:
    Local GR Mode: Helper*
    Remote GR Mode: Disable
    R bit: False
Timers:
    Configured Restart Time(sec): 120
    Received Restart Time(sec): 0
```

If the BGP peering session does not form, use packet capture to view the local BGP protocol traffic from the linux shell: 
`ip netns exec routingEngine tcpdump -i any -v "tcp port 179”`

## Routing Features

This section contains various features supported by the SSR's BGP implementation.

### Configuring SSR as a Route Reflector

While configuring iBGP, you may need to enable the **Route Reflector** capability to facilitate easy learning of routes. Your SSR can be configured as a route reflector for a particular neighbor or more realistically a set of neighbors, also known as a route reflector client(s). This can be configured in the route reflector router's BGP config, under the respective neighbor object.

```
admin@branchoffice1.seattlesite1# config auth
admin@branchoffice1.seattlesite1 (authority)# router seattlesite1
admin@branchoffice1.seattlesite1 (router[name=seattlesite1])# routing default-instance
admin@branchoffice1.seattlesite1 (routing[type=default-instance])# routing- protocol bgp
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# neighbor 1.1.1.1
```
In our example, the route reflector in our network is `branchoffice1` router, and our route reflector client is its neighbor `1.1.1.1`.
```
admin@branchoffice1.seattlesite1 (neighbor[neighbor-address=1.1.1.1])# address-family ipv4-unicast
admin@branchoffice1.seattlesite1 (address-family[afi-safi=ipv4-unicast])# route-reflector client true
admin@branchoffice1.seattlesite1 (address-family[afi-safi=ipv4-unicast])# exit
```
By setting `route-reflector client true`, we instruct the `branchoffice1` router to treat the neighbor as a route reflector client.

There is one additional field which needs to be set in route reflector's BGP config, and that is `Cluster-ID`, which has the format of an IP address. This can be set to anything unique in the AS, and can be the same as the `Router ID` field.

When the route reflector sends routes to the clients, by default it doesn't modify the next-hop. An outbound policy can be used to change the next-hop in these routes to that of the route reflector, if desired. In such instances, another option, which is turned off by default, needs to be set in the route reflector's BGP config: `Route Reflector Allow Outbound Policy = TRUE`.

### BGP Confederations
When configuring iBGP, the **Confederation** feature may be helpful when dealing with an enormous autonomous system. This feature allows you to break up the AS into smaller sub-autonomous systems. Confederation can be directly configured under the routing protocol element. Here, 65535 is the **confederation identifier AS number** and, 1100 and 2200 are the **member AS** numbers of that confederation AS.

```
admin@branchoffice1.seattlesite1# config auth
admin@branchoffice1.seattlesite1 (authority)# router seattlesite1
admin@branchoffice1.seattlesite1 (router[name=seattlesite1])# routing default-instance
admin@branchoffice1.seattlesite1 (routing[type=default-instance])# routing- protocol bgp
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# confederation identifier 65535
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# confederation member-as 1100
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# confederation member-as 2200
admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# exit
```
