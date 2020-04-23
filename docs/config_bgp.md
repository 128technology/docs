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


the neighbor AS using  					 					 					. Under the neighbor element configure the address

**protocol bgp**

**local-as <>**

family using

and enable  					 					 					as  					 					 					.

**router-id <>**

**neighbor <>**

**routing-**

**neighbor-as <>**

```
address-family ipv4-unicast
next-hop-self
```

**true**

**Note:** *During advertisement, the non-directly connected routers to an external peer need to learn how to reach an advertised route. To provide this information to the non-directly connected as well as iBGP peers,* **next-hop-self** *command is used.*

**Note:** *For BGP neighbor configuration,* *the*  							 							 							*command (under the neighbor instance)*

*can be leveraged when you want to use a specific AS number for your router while peering with that particular neighbor. Note that this AS number* **cannot** *be same as the actual AS number that is configured directly under the routing-protocol instance. Example below indicates the difference in* *red**.*

**local-as**

**admin@branchoffice1.seattlesite1# config auth admin@branchoffice1.seattlesite1 (authority)# router seattlesite1 admin@branchoffice1.seattlesite1 (router[name=seattlesite1])# routing default-instance
 admin@branchoffice1.seattlesite1 (routing[type=default-instance])# routing- protocol bgp
 admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])#** **local-as 100** **admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# router-id 1.1.1.128
 admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# address- family ipv4-unicast
 admin@branchoffice1.seattlesite1 (address-family[afi-safi=ipv4-unicast])# exit
 admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# neighbor 1.1.1.1
 admin@branchoffice1.seattlesite1 (neighbor[neighbor-address=1.1.1.1])# neighbor-as 6000
 admin@branchoffice1.seattlesite1 (neighbor[neighbor-address=1.1.1.1])#** **local-as 62000**

Border Gateway Protocol

2

Go up to the protocol level and issue a  					 					 					command to view the BGP config prior to

committing any changes. An ideal BGP configuration must look like:

**show**

admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# show type bgp
 local-as 100
 router-id 1.1.1.128

```
address-family  ipv4-unicast
    afi-safi  ipv4-unicast
```

exit

```
neighbor        1.1.1.1
    neighbor-address  1.1.1.1
    neighbor-as       6000
    shutdown          false
    address-family    ipv4-unicast
        afi-safi      ipv4-unicast
        next-hop-self true
```

exit exit

To advertise routes to BGP, configure the network to be advertised under the address-family of the router. You may also apply a policy to the advertised route using  					 					 					command.

**Note:** *You can configure the policies directly under the authority level routing configuration, i.e.,* **config>authority>routing> filters/policies***. You must create a filter to match the desired traffic and then create a policy based on that filter. Refer to the* *filters/policies guide* *for detailed information.*

**policy <>**

**admin@branchoffice1.seattlesite1# config auth admin@branchoffice1.seattlesite1 (authority)# router seattlesite1 admin@branchoffice1.seattlesite1 (router[name=seattlesite1])# routing default-instance
 admin@branchoffice1.seattlesite1 (routing[type=default-instance])# routing- protocol bgp
 admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# address- family ipv4-unicast
 admin@branchoffice1.seattlesite1 (address-family[afi-safi=ipv4-unicast])# network 172.16.255.0/30
 admin@branchoffice1.seattlesite1 (network[network- address=172.16.255.0/30])# policy allow
 admin@branchoffice1.seattlesite1 (network[network- address=172.16.255.0/30])# exit**

Border Gateway Protocol 3

To redistribute connected, static, service and/or OSPF routes specifying

within the routing protocol element of the default-

routing instance.

```
redistribute
<connected/static/service/ospf>
```

**admin@branchoffice1.seattlesite1# config auth admin@branchoffice1.seattlesite1 (authority)# router seattlesite1 admin@branchoffice1.seattlesite1 (router[name=seattlesite1])# routing default-instance
 admin@branchoffice1.seattlesite1 (routing[type=default-instance])# routing- protocol bgp
 admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# redistribute connected**

While configuring iBGP, you may need to enable the **Route Reflector** option to facilitate easy learning of routes. Your 128T can be configured as a route reflector client for a particular neighbor under the specific neighbor configuration.

**admin@branchoffice1.seattlesite1# config auth admin@branchoffice1.seattlesite1 (authority)# router seattlesite1 admin@branchoffice1.seattlesite1 (router[name=seattlesite1])# routing default-instance
 admin@branchoffice1.seattlesite1 (routing[type=default-instance])# routing- protocol bgp
 admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# neighbor 1.1.1.1
 admin@branchoffice1.seattlesite1 (neighbor[neighbor-address=1.1.1.1])# address-family ipv4-unicast
 dmin@branchoffice1.seattlesite1 (address-family[afi-safi=ipv4-unicast])# route-reflector client true
 dmin@branchoffice1.seattlesite1 (address-family[afi-safi=ipv4-unicast])# exit**

Border Gateway Protocol 4

When configuring iBGP, the **Confederation** feature may come in handy when dealing with an enormous autonomous system. This feature allows you to break up the AS into smaller sub- autonomous systems. Confederation can be directly configured under the routing protocol element. Here, 65535 is the **confederation identifier AS number** and, 1100 and 2200 are the **member AS** numbers of that confederation AS.

**admin@branchoffice1.seattlesite1# config auth admin@branchoffice1.seattlesite1 (authority)# router seattlesite1 admin@branchoffice1.seattlesite1 (router[name=seattlesite1])# routing default-instance
 admin@branchoffice1.seattlesite1 (routing[type=default-instance])# routing- protocol bgp
 \*admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# confederation identifier 65535
 \*admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# confederation member-as 1100
 \*admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# confederation member-as 2200
 \*admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# exit**

**BGP over SVR:**

BGP over SVR can be used when peering with a 128T. This provides the benefit of Secure Vector Routing for all BGP traffic flowing to-and-from the 128T peers.
 To begin configuring BGP over SVR, ensure that the running 128T system has configuration for basic platform functionality.

Next, we need to configure a *routing interface*, which is similar to a loopback interface on traditional routers. Unlike normal loopback BGP peering, this IP address does not need to be routable on the transport network as it will never see the wire. A BGP peering will be created on this interface. The conductor will then trigger on this and configure a few more pieces (autogenerated) to activate BGP over SVR, such as:

- _bgp_speaker_ tenant
- Auto-generated BGP services and service routes

Border Gateway Protocol 5

• Router Peers
 Those peerings will then be protected by SVR.
 **Note:** *One must use a conductor for BGP over SVR as a manual configuration is unsupported.*

**Note:** *If the WAN interface of your 128T or the interface facing the 128T-BGP peer is already part of a neighborhood, then ensure that their topology type (network interface >neighborhoods >topology) is such that it allows the routers to form peering relationships for the auto-generated peer service routes, e.g., mesh-mesh, mesh-hub, mesh-spoke or hub-spoke. For more information on Neighborhoods, check out Interchange!*

Next, configure a BGP instance with the router’s local AS and a router id which matches the self-routing interface IP. For each BGP over SVR peer, use a neighbor address of the neighbor routing interface IP address. Next, configure the normal BGP peer configuration options such as the timers and address families that are needed. In address-family IPv4-unicast

must be set to  					 					 					.

If BGP over SVR is with eBGP, set the  					 					 					to at least 2.

Configuration Template:

**next-hop-**

**self**

**true**

**multihop ttl**

```
config
    authority
```

**router  routing default-instance**

**type default-instance interface rtg-int**

**name rtg-int**

**ip-address  exit**

**routing-protocol bgp
 type bgp
 local-as 
 router-id  neighbor **

**neighbor-address  neighbor-as 
 timers**

**hold-time 9**

**keepalive-interval 3 exit**

**address-family ipv4-unicast afi-safi ipv4-unicast next-hop-self true**

```
           exit
           transport
```

**local-address routing-interface rtg-int**

**exit exit**

```
            multihop
              ttl 255
```

Border Gateway Protocol

6

**exit exit**

**exit exit**

**exit exit**

**exit**

Sample Configuration:

**admin@branchoffice1.seattlesite1# config auth admin@branchoffice1.seattlesite1 (authority)# router seattlesite1 admin@branchoffice1.seattlesite1 (router[name=seattlesite1])# routing default-instance
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
 admin@branchoffice1.seattlesite1 (transport)# local-address admin@branchoffice1.seattlesite1 (local-address)# routing-interface bgp-int- seattle
 admin@branchoffice1.seattlesite1 (local-address)# exit admin@branchoffice1.seattlesite1 (transport)# exit admin@branchoffice1.seattlesite1 (neighbor[neighbor-address=10.128.128.1])# multihop
 admin@branchoffice1.seattlesite1 (multihop)# ttl 5 admin@branchoffice1.seattlesite1 (multihop)# exit admin@branchoffice1.seattlesite1 (neighbor[neighbor-address=10.128.128.1])# exit
 admin@branchoffice1.seattlesite1 (routing-protocol[type=bgp])# exit admin@branchoffice1.seattlesite1 (routing[type=default-instance])# exit admin@branchoffice1.seattlesite1 (router[name=seattlesite1])# exit admin@branchoffice1.seattlesite1 (authority)# exit admin@branchoffice1.seattlesite1#**

Border Gateway Protocol 7

**BGP Verification:**

Issue the command  					 					 					on your router:

**show bgp**

In addition to the branch of output, you will now see contributions to the RIB from

BGP in the output of

**show bgp**

**show rib**

Border Gateway Protocol

8

**BGP Troubleshooting:**

Issue the following commands to verify BGP related information:

• Verify BGP router information (

)

```
show bgp summary
```

- Check the AS
- Check for router ID and peers (up/down and state column)

• Verify OSPF neighbors ( )

```
show bgp neighbors
```

• Verify RIB (

• Check BGP state for each neighbor = established, up for <time>

)

**show rib**

• Verify FIB (

• Routes beginning with B are BGP routes

**show fib)**

• FIB entry has the appropriate next hop