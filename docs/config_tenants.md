---
title: Tenants
sidebar_label: Tenants
---

Tenancy is a powerful concept unique to the SSR that allows administrators to create partitions within their network in order to segment access to network services. A tenant is effectively a network “perimeter” that defines a grouping of devices, and creates a _de facto_ trust zone. All users within a tenant, by default, are given access to the same set of services; or, said another way, members of a tenant share common _network policy_.

## Modeling Your Network Tenancy
A tenant represents the basic means for grouping collections of devices together into a network segment. All devices within a tenant are treated with a common policy, and thereby will have consistent access to the services that have been "published" to the tenant.

Each tenant, as modeled on your SSR, has its own segment of the router's Forwarding Information Base (FIB) for making forwarding decisions for packets it receives. As services are made available to a tenant, entries are populated into the router's FIB, keyed by that tenant's name; members of that tenant will have routes to respective service, and non-members will not – all without the use of complex access controls or external firewalling.

The SSR gives administrators several ways to define/describe how inbound packets are mapped to tenants: by matching the source IP address of inbound packets to configured IP prefixes within a network neighborhood, or based upon their ingress network-interface. (When both are in use on the same system, _the network-interface’s tenant will take precedence if both apply_.)

Each method for identifying inbound tenancy will be discussed in the sections that follow.

## Adding Tenants
Once you’ve decided upon a partitioning scheme for your users and their network services, creating basic tenants is a straightforward exercise.

```
admin@labsystem1.burlington# config authority
admin@labsystem1.burlington (authority)# tenant engineering
admin@labsystem1.burlington (tenant[name=engineering])# description "engineering division"
admin@labsystem1.burlington (tenant[name=engineering])# security internal
admin@labsystem1.burlington (tenant[name=engineering])# show
name         engineering
description  "engineering division"
security     internal
```

It may not look like much, but you’ve created a tenant!

The field `security` refers to another configuration element on the system (a security policy), which governs how the SSR encrypts and authenticates packets it receives and forwards. In this example we refer to a security element that comes installed on all SSRs by default, the one called `internal`. If you typed `security internal` and the SSR reported an error saying that it could not resolve the reference, then this part of your default configuration was missing. Don’t worry, creating a new security policy is just as simple as creating a tenant, a few short configuration steps.

This represents the minimum amount of configuration required to create a simple tenant partition. Later, as we configure services to make available to this tenant, you will see how this partition serves to segment these services from all other tenants, and from all other services.

## Tenancy by Subnet
Administrators can also use subnets to define the composition of a tenant. This is done within the tenant’s configuration, where a list of one or more subnets is specified within a neighborhood. These subnets are applicable to the interfaces that contain these neighborhoods, unless an interface has an explicitly assigned tenant (as we will see in the next section). Any lead packet of a session that arrives on any tenantless interface is matched to the provisioned subnets of all neighborhoods within the tenants to determine tenant membership. (Said another way, the ingress interface has zero or more neighborhoods configured on it; for each of these neighborhoods, the source IP address is matched to tenant _members_ to see if this IP address can be affiliated with a tenant.) This is then used as part of the FIB’s lookup key, to determine disposition of that lead packet.

Adding a list of one or more subnets to a tenant configuration is straightforward. In the example below we add three such subnets to the tenant we just created:

```
admin@labsystem1.burlington# conf authority
admin@labsystem1.burlington (authority)# tenant engineering
admin@labsystem1.burlington (tenant[name=engineering])# member HQnetwork
admin@labsystem1.burlington (member[neighborhood=HQnetwork])# address 172.17.128.0/24
admin@labsystem1.burlington (member[neighborhood=HQnetwork])# up
admin@labsystem1.burlington (tenant[name=engineering])# show
name         engineering
description  "engineering division"
security     internal

member       HQnetwork
    neighborhood  HQnetwork
    address       172.17.128.0/24
exit
```

Any packet arriving on an interface that is configured with the “HQnetwork” neighborhood, and whose source IP falls within this subnet, will be assumed to be part of the “engineering” tenant. As mentioned, this will affect the scope of routes available to the inbound request, reducing it to only the set applicable to “engineering."

Configuring a neighborhood on a network-interface is straightforward:

```
admin@labsystem1.burlington# config auth router burlington
admin@labsystem1.burlington (router[name=burlington])# node labsystem1
admin@labsystem1.burlington (node[name=labsystem1])# device-interface 12
admin@labsystem1.burlington (device-interface[id=12])# network-interface int12
admin@labsystem1.burlington (network-interface[name=int12])# neighborhood HQnetwork
admin@labsystem1.burlington (neighborhood[name=HQnetwork])# up
admin@labsystem1.burlington (network-interface[name=int12])# up
admin@labsystem1.burlington (device-interface[id=12])# up
admin@labsystem1.burlington (node[name=labsystem1])# show
name              labsystem1
id                1
description       "Combo in Burlington datacenter"
location          "Burlington, MA"

device-interface  11
    id                   11
    description          "slot 1 port 1"
    type                 ethernet
    pci-address          0000:02:00.0
    capture-filter       ip
    shared-phys-address  00:00:5E:00:53:01

    network-interface    ext11
        name         ext11
        description  "external interface"
        vlan         0
        type         external

        address      198.51.100.128
            ip-address     198.51.100.128
            prefix-length  24
        exit
    exit
exit

device-interface  12
    id                 12
    description        "slot 1 port 2"
    type               ethernet
    pci-address        0000:05:00.0

    network-interface  int12
        name          int12
        description   "internal interface"
        vlan          0
        type          shared

        neighborhood  HQnetwork
            name  HQnetwork
        exit

        address       172.16.0.1
            ip-address     172.16.0.1
            prefix-length  12
        exit
    exit
exit
```

## Tenancy by Interface
Each SSR is a collection of one or more nodes, which represent the top of the hierarchy of a single deployment of SSR software. In turn, each node communicates with the IP network via device interfaces (physical interfaces) – physical connections to the network on bare metal systems, or bridged interfaces when the SSR software is deployed in virtual environments. On top of the device interfaces we build network interfaces (logical interfaces), or VLANs. The relationship in each of these levels of the hierarchy is many to one; i.e., there can be many device-interface elements per node, and many network-interface elements per device-interface.

Each of these network-interfaces has an optional configuration field, tenant. By applying a tenant name to this interface, all packets received on this interface are presumed to belong to that tenant, _even if the source IP address of that packet would indicate it is a member of a neighborhood-defined tenant_. This restricts the set of routes available to sources that reach the SSR via this interface to only those available to that tenant.

This is accomplished by way of each router filtering the routes in its FIB to only those pertinent to the specific tenant. (I.e., the tenant becomes part of the lookup key into the FIB, so only routes matching the tenant will match.)

```
admin# config authority
admin (authority)# router burlington
admin (router[name=burlington])# node node1
admin (node[name=slice1])# device-interface 12
admin (device-interface[id=11])# network-interface int12
admin (network-interface[name=int12])# tenant engineering
Here is the finished configuration:
admin (network-interface[name=int12])# show
name         int12
description  "Engineering network"
vlan         0
type         external
tenant       engineering

address      10.1.0.1
    ip-address     10.1.0.1
    prefix-length  24
exit
```

All inbound requests on this specific network-interface, considered part of the “engineering” tenant, will only be able to access services that are part of the engineering tenant, or those services in other tenants that have explicitly allowed (via access-policy) members of the engineering tenant. Using access-policy statements to control access – allowing or denying various user populations – is described in the section on Service configuration.

## Subtenant Hierarchies

The SSR not only allows you to partition your user population into various tenants, it allows for further segmentation of those tenants into “families” of tenants – a hierarchical (family) tree, where subtenants (children) inherit properties from their parentage. When granting access to a service to a tenant, all children of that tenant are also granted access by default; however, the converse is not true. When a child tenant is granted access to a service, the parent tenant will not have routes to it.

This allows for very fine-grained access control, where services and tenant families can be combined to give access to network services to very specific user populations.

Here is an example of a subtenant, a further refinement of the “engineering” tenant that we created earlier:

```
admin@labsystem1.burlington# config authority
admin@labsystem1.burlington (authority)# tenant dev.engineering
admin@labsystem1.burlington (tenant[name=dev.engineering])# member HQnetwork
admin@labsystem1.burlington (member[neighborhood=HQnetwork])# address 172.17.2.0/25
admin@labsystem1.burlington (member[neighborhood=HQnetwork])# up
admin@labsystem1.burlington (tenant[name=dev.engineering])# description "development team"
admin@labsystem1.burlington (tenant[name=dev.engineering])# security internal
admin@labsystem1.burlington (tenant[name=dev.engineering])# show
name         dev.engineering
description  "development team"
security     internal

member       HQnetwork
    neighborhood  HQnetwork
    address       172.17.2.0/25
exit
```

This configuration fragment establishes the user population within the subnet 172.17.2.0/25 as members of the dev.engineering team. The SSR uses dotted notation to indicate tenant parentage: dev.engineering is a child of engineering. The dotted notation is not limited to one level of depth, a tenant family can have an arbitrarily large number of descendants (e.g., eastcoast.dev.engineering, or bldg12.eastcoast.dev.engineering).

Irrespective of the number of levels of the tenant hierarchy, the same rule applies: children have access to services offered by their parents, but parents do not have access to services offered by their children.

Assigning a tenant to a network-interface will also let you use membership to identify subtenants, however you cannot override a network-interface tenant with a different tenant tree.

Referencing the example above, adding a member for `HQnetwork` in a different tenant "family" (such as `developer.acme`) will have no effect. The assignment of `engineering` to the network-interface strictly limits tenant affiliation to `engineering` and/or its children.

## The Global Tenant
We've discussed two ways that tenancy can be determined on an SSR: by assigning a tenant to an interface, or by creating neighborhood-based _tenant members_, that can use the source IP address within a neighborhood to glean tenancy. If neither of these rulesets apply – a packet arrives on an interface without a `tenant` assigned, and neither does it match a tenant's `member` definition for the neighborhood(s) on that interface – then the tenancy of that session is said to be assigned to the _global tenant_, which is also sometimes referred to as "tenantless."

```
admin@labsystem1.fiedler# show fib router newton
Mon 2019-01-21 06:18:00 EST

Node: labsystem2.newton

Entry Count: 2255
Capacity:    17402

============ ======= ======= =================== ========================= ==============
 IP Prefix    Port    Proto   Tenant              Service                   Next Hops
============ ======= ======= =================== ========================= ==============
 0.0.0.0/8    <any>   <any>   <global>             <ControlMessageService>   <none>
 0.0.0.0/8    <any>   <any>   guest                <ControlMessageService>   <none>
 0.0.0.0/8    <any>   <any>   trusted              <ControlMessageService>   <none>
```

The services that are available to this tenant are limited to only those whose `scope` is set to `public` – there is no means for otherwise creating an `access-policy` that specifies whether the global tenant has access to a service.

The net result of this "global" tenant is that an SSR can operate without any tenant definitions whatsoever: assuming all service configurations have their `scope` set to `public`, then the router's FIB is unilaterally applied to all inbound packets, making the SSR behave akin to a traditional router. But what's the fun in that?