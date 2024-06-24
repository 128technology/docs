---
title: FIB Design Considerations
sidebar_label: FIB Design Considerations
---

This section covers some things to consider when designing your network, services, and service routes.

### BGP over SVR

One interesting aspect of using BGP over SVR is that because the FIB uses route updates to construct the next-hop for FIB entries, it is possible to configure services with broad address ranges larger than the scope of an individual peer router, and utilize BGP to update next hops for the individually created FIB entries based on the routing-interface address returned by BGP. When using pure service-routing, services are generally required to be tied to a specific site/SSR.

In cases where a service-route is configured for the service, the next-hop for each FIB entry for the service comes from the service-route (either a service-agent next hop interface/gateway, or peer router adjacencies) and overrides the next-hop from the RIB. 

A service-agent, peer, or next-peer service route also creates a null kernel route in the RIB. They exist for internal purposes, and can be observed in the RIB but are no cause for concern. These kernel routes will not influence the way the FIB is built for other services when building the FIB. They will not trigger additional FIB entries with more specific prefixes for other services, and there is no danger of creating a null next-hop entry. 

There is however, one very specific scenario where an auto-generated kernel route can influence the FIB. It is related to BGP over SVR and routing interface addresses. 

When a BGP over SVR neighbor is configured, the system generates a (non-null) kernel route towards the local routing interface. This kernel route is treated like other routes in the RIB and therefore influences FIB entries. In the example RIB and FIB output below, the local router has a BGP neighbor using routing interface address of 10.0.0.128/32 who advertises the network 10.0.0.0/24. The kernel route results in an extra FIB entry for service hub with a next-hop of `None`. The practical implication is that if the user desired to use this address for additional services on the router such as SNMP polling, SSH, or simply allowing ICMP ping, these services would not follow the broader route advertised by BGP. In fact, these services would require a peer service route pointing to the remote router.

```
        service  hub
            name           hub
            security       none
            address        10.0.0.0/24

            access-policy  spoke
                source  spoke
            exit
        exit

RIB:
======= ============= ========== ========== ========= ======== ====== ============ =============== ==================== ============= ============= ===========
 Vrf     Prefix        Protocol   Selected  Distance   Metric  Uptime  Ip          Interface name   Directly connected   Recursive     Blackhole     Fib
======= ============= ========== ========== ========= ======== ====== ============ =============== ==================== ============= ============= ===========
 default 10.0.0.0/24   bgp        true            20        0   30485  10.0.0.128  unavailable      unavailable          true          unavailable   unavailable
 default 10.0.0.0/24   bgp        true            20        0   30485  10.0.0.128  lo0              unavailable          unavailable   unavailable   true
 default 10.0.0.128/32 kernel     true           254        0   30502  unavailable lo0              true                 unavailable   unavailable   true
 default 10.0.0.128/32 kernel     unavailable    254  1000000   30502  unavailable unavailable      unavailable          unavailable   true          true

FIB:
=============== ====== ======= ======== ===== ========= ============ ======== ======
 IP Prefix       Port   Proto   Tenant   VRF   Service   Next Hops    Vector   Cost
=============== ====== ======= ======== ===== ========= ============ ======== ======
 10.0.0.0/24        0   None    spoke    -     hub       172.16.0.2   -           0
 10.0.0.128/32      0   None    spoke    -     hub       None         -           -

```

### FIB Sprawl

The amount of RAM present in the system dictates the maximum number of entries allowed in the FIB table. Therefore, FIB space is a limited resource on the platform and should be considered during configuration design. Design decisions of the tenant/service model for a deployment have a major impact on the size of the FIB. The number of service addresses, transport/port-ranges, and tenant access-policies configured have a major influence on how the FIB is built, as do the number of routes seen in the RIB. 

Here are some general suggestions for reducing the size of the FIB:

- Limit the number of tenants in the configuration: While it is important to use as many tenants as required to enforce policy on the network, these should be limited to general categories of devices/users existing throughout the network. Unique tenants per site are generally not a good idea. The SSR does support the concept of tenant hierarchy, however it is important to not overuse this construct. An access policy for a parent tenant results in a FIB entry for each child tenant of this parent which can quickly lead to FIB sprawl. It is suggested to limit the use of hierarchy to no more than three tiers.

- Limit the number of routes in the RIB: As shown in the section of [How the FIB is Constructed](concepts_fib_construction.md), the routes in the RIB can have a major impact on the resulting FIB table. Receiving a large number of routes via dynamic routing protocols can quickly lead to FIB sprawl. It is suggested to use route filtering to only accept aggregate routes and to drop any more specific routes that point to the same next-hop destination.

- Use `service applies-to` logic: The use of `applies-to` logic in the services ensures that services are installed only on their respective routers. This logic can minimize the impact of unneeded services on a router. For example, in a hub and spoke deployment, it is not necessary for one spoke to see the services targeting another spoke. Traffic may follow a more generic service to the hub (which presumably is a larger device with more memory), and the hub can then see the more specific service targeting the destination spoke.

- In a BGP over SVR design, it may be possible to use broader service definitions covering the address scope of all spoke sites instead of site-specific services. This coupled with limiting the amount of spoke routes in the RIB can greatly reduce the size of the FIB table.

### Access Policies

It is important to discuss access policies configured on services. An access-policy with permission set to `deny` will generate FIB entries. However, the permit/deny action is only evaluated on the ingress router of an SSR fabric. In scenarios where traffic flows via SVR and applies-to service logic results in FIB entries being created on the next-SVR-hop SSR for deny policies, the traffic will not be denied. The next-hop in the FIB entry of the subsequent router will be used, a session will be installed in the session table, and packets for the session will be forwarded. To illustrate this, consider the example below. 

There is a service that matches all traffic to a spoke router’s LAN. This service is applied to both the hub and spoke router. Traffic is allowed from the hub to this full address range. 

Later, it is determined that there is a specific server in this LAN that we want to deny access to from the hub. Another service named `deny-server` was added for the specific server address, with a deny access policy for the hub tenant. In order to reduce FIB consumption on the hub, `applies-to` logic was used to block this traffic at the spoke.

```
        service          spoke1
            name           spoke1

            applies-to     router
                type         router
                router-name  spoke1
                router-name  hub
            exit
            security       internal
            address        10.0.1.0/24

            access-policy  hub
                source  hub
            exit
        exit

        service          deny-server
            name           deny-server

            applies-to     router
                type         router
                router-name  spoke1
            exit
            security       internal
            address        10.0.1.10/32

            access-policy  hub
                source      hub
                permission  deny
            exit
        exit
```

The expectation is that this configuration satisfies the design intent. However, this configuration **does** allow hub traffic to hit the server. In fact, traffic using the service `deny-server` with tenant hub will be seen in the spoke’s session table. While this configuration is a simple, contrived scenario to illustrate the point, it can be encountered in real world deployments, particularly when sending spoke-to-spoke traffic through a hub when certain traffic is allowed and other traffic denied.

The exception to this situation is one that uses a service hierarchy. If the FIB lookup on the next-SVR-hop SSR results in a service within the same hierarchy as the original service signaled via SVR metadata, then the access-policies will be evaluated and any using `permission deny` will prevent the session from being established. In the example above, if the service `deny-server` were simply defined as hierarchical from the parent spoke1 service as shown below, the deny access-policy would be evaluated and traffic to the server would be denied by the spoke.

```
        service  deny-server.spoke1
            name           deny-server.spoke1

            applies-to     router
                type         router
                router-name  spoke1
            exit
            address        10.0.1.10/32

            access-policy  hub
                source      hub
                permission  deny
            exit
        exit
```


