---
title: Conductor Deployment Patterns
sidebar_label: Conductor Deployment
---

The 128T conductor is the centralized orchestration platform within a 128T Authority, and maintains many persistent connections to each router and its constituent nodes. This document discusses the various  options for deploying the 128T conductor, discussing the relative strengths and drawbacks of each.

All of the design patterns contained within this document are supported configurations; however, certain designs are discouraged due to their complexity, the number of limitations it imposes on your network design, the functional caveats it imposes, etc. These will be explicitly noted within each section accordingly.

For each topic, we will discuss items such as:

- Any resource requirements (e.g., public internet addresses)
- All corresponding 128T or Linux OS configuration requirements
- When the design pattern is encouraged or discouraged
- The design pattern's flexibility and scale

## About this Guide
This guide is intended to be referenced by network architects during the Design phase of a planned deployment, to assist with:

- Selecting the most appropriate platform for the conductor
- Preparing the base platform and underlying operating system for optimal conductor performance
- Choosing the most suitable design pattern for the deployment

### Terminology

#### Conductor Host Services
_Conductor Host Services_ refers to the built-in feature within the 128T software that will generate configuration to simplify the connectivity between routers and their conductor(s). By configuring the `conductor-address` field within the 128T's data model, and by indicating which interface(s) on a manged router should be used to connect to conductor, the conductor will automatically generate the supporting configuration infrastructure. This includes:

- The `_conductor_` service (which will have a trailing sequence number; e.g., `_conductor_1`)
- A `service-route` for each `network-interface` on each router that has `conductor` set to `true`

The Conductor Host Services feature forms the basis for the majority of the conductor design patterns described in this document, and should be leveraged whenever possible.

#### In-Band Management
The term _in-band management_ in the context of conductor connectivity refers to the use of a forwarding interface by a router node for reaching the conductor. I.e., there is no dedicated interface specifically for the conductor to "manage" the node. As most 128T deployments separate the remote sites from the conductor over a WAN, it is exceedingly common to leverage in-band management between a remote node and a conductor. For SDWAN deployments, in-band management is _strongly recommended_, for the branch locations. For head end systems that are colocated with the conductors, out-of-band management is preferable, assuming there are sufficent free interfaces on the chosen head end hardware platform.

#### Out-of-Band Management
Routing nodes are said to leverage _out-of-band management_ when they have a dedicated interface for the traffic to reach the conductor. Out-of-band management is generally only feasible when a conductor is colocated with the routing nodes, as is typically the case only at a head end data center.

:::note
It is possible to have a dedicated out-of-band management interface on branch locations, but this connection will almost certainly ultimately ride over the same device's WAN connection to the conductor. I.e., the management traffic will egress one interface on the device and be sent back to another interface on the same device. As such, the in-band management model is more suitable, as it avoids unnecessary hops.
:::

## Universal Considerations
This section contains information pertinent to all conductor deployments.

### Platform Requirements
It is important from the outset to choose a platform (physical or virtual) that is suitable for the demands of managing an array of 128T routers. As the deployment scales, so too do the demands on the conductor. In general, the two primary concerns are CPU and memory. The speed of a conductor's CPU (moreso than the quantity of CPU cores) will have the most impact on its performance as deployments scale up. The amount of memory will have an impact on the responsiveness of the conductor's administrative interfaces as the deployments scale up.

:::note
The 128T conductor will run effectively on a virtual machine in both private and public cloud infrastructure. From a physical vs. virtual standpoint, there is no difference in the CPU and memory requirements, and thus the decision ultimately comes down to architectural preference and cost.
:::

Running a small lab network or pilot deployment on a modestly sized conductor is acceptable, but be advised that migrating routers from a "temporary" or "POC" conductor to a production conductor may incur downtime during the transition. It is best to procure and deploy suitable hardware up front.

128 Technology provides a [sizing tool](https://community.128technology.com/viewdocument/128t-conductor-sizing-spreadsheet?CommunityKey=db47b751-299b-4fb9-8859-a7bf877ed8d8&tab=librarydocuments) on our community site to give guidance on CPU, memory, and disk requirements for bare metal and cloud conductor deployments.

:::tip Key Decision
Size your conductor for the size you anticipate your network to grow to, or the number of nodes your administrative policy caps for a single configuration platform. For deployments in excess of 2,000 managed nodes (remembering that a highly available router counts twice), see the section on POD design below.
:::

### POD Design
The conductor is the single point of configuration for an array of managed routers; as such, its configuration can grow to be quite large. As the configuration grows larger, the processing time for new configuration moves, adds, and changes grows accordingly. 128 Technology recommends that network deployments be sized to a ratio of 2,000 assets per conductor (where an asset is a single instance of 128T software). I.e., either 1,000 highly available routers comprised of two nodes each, 2,000 standalone nodes, or any combination thereof.

For large scale deployments in excess of 2,000 assets, the conventional approach is to subdivide the network into PODs – independently managed networks. Each POD, or set of managed assets, is independently managed.

:::tip Key Decision
POD design can have impacts on staging and provisioning workflows (for example, identifying during software installation which conductor a router should be homed to), it is recommended to plan for multi-POD deployments at the outset of the program, and not to wait until your deployment is approaching 2,000 nodes.
:::

### Tuning your System
128 Technology recommends various platform and operating system settings to ensure the optimal performance of your 128T conductor.

#### Platform Tuning
128 Technology recommends enabling hyperthreading for systems operating as conductors, as it may improve performance.

:::note
Because 128 Technology _does not_ recommend hyperthreading for nodes running 128T software as a router, please be aware when repurposing a host from conductor to router that hyperthreading should be disabled.
:::

#### Linux OS Tuning
This section is specifically geared toward end users that want to build their own conductor nodes on top of a base CentOS operating system. For users that install their conductor software using a 128 Technology-provided ISO, these settings will be set already.

##### Configuring firewalld
When deploying conductor on the internet, 128 Technology recommends limiting access to the system using *firewalld*. (The [*firewalld* system daemon](https://firewalld.org/) is a managed firewall application within Linux.) The basic premise is to restrict inbound access to the public-facing addresses to only allow ports 4505/TCP, 4506/TCP, and 930/TCP. This is generally done by:

1. Creating a specific firewalld **zone**; e.g., `conductor`
2. Creating a firewalld **service** for the conductor's salt master, containing TCP ports 4505, 4506; e.g., `salt-master`
3. Creating a firewalld **service** for the conductor's NETCONF connection, containing TCP port 930; e.g., `netconf`
4. Adding the "salt-master" and "netconf" services to the `conductor` zone
5. Set the public address to be in the `conductor` zone

128 Technology has developed some salt states to assist with these common configuration steps. Refer to our [public Github repo](https://github.com/128technology/salt-states/blob/master/setup-firewalld-t128-zone.sls) for some samples you can use to tune your system accordingly.

## Design Patterns
This section enumerates the supported topologies for the 128T conductor. Straying from one of these  designs may be possible, but should be avoided unless absolutely necessary.

### Public Conductor
The most conventional deployment model is where the conductor is reachable on a public IPv4 address, and all managed nodes have direct access to it via one or more WAN connections. This is the simplest of all deployment schemes, as it allows you to leverage the global `conductor-address` fields within the 128T data model to unambiguously define the conductor targets across the entire population of router nodes.

This design pattern is suitable for both public cloud deployments of the 128T conductor, as well as private cloud deployments where the 128T conductor co-resides alongside other 128T routers in a data center. 

This deployment model is recommended when possible.

Configuration required:

```
config auth conductor-address [public address of conductor]
config auth router r1 node n1 device-interface WAN network-interface WAN0 conductor true
```

A sample configuration is provided in [Appendix A](#appendix-a-public-conductor).

### Public Conductor Behind NAT
Another common model is a deployment where the conductor is behind a static NAT/firewall, which is forwarding to a private address assigned to the conductor. When placing the conductor behind a static NAT/firewall (effectively giving it a public IP address), be mindful of whether the NAT/firewall supports "hairpinning." (Hairpinning is when a device sends packets to the public IP address of a NAT that it sits behind.) This is because a conductor's salt-minion will connect to its own salt master, and will attempt to do so at the same IP address that all external minions connect to. If the NAT does not support hairpinning, then follow the steps outlined below in the section on _Split Horizon Conductor_.

#### Port Forwarding
When deploying a conductor behind a firewall, open 930/TCP (used for NETCONF) and 4505-4506/TCP (used for salt) to allow a conductor to communicate to managed routers. Open 443/TCP for the web UI, and 22/TCP for remote SSH.

Because there is little difference from each deployed router's perspective between this and the previous design pattern, the configuration provided in [Appendix A](#appendix-a-public-conductor) is representative of this design as well. All NAT awareness exists outside of the 128T's configuration.

### Conductor Behind 128T
Oftentimes a conductor is hosted within a data center that has a 128T head end router at its edge. In these topologies, the design is a hybrid of the previous two (conductor behind NAT, split horizon conductor). From the remote routers' perspective (i.e., the branch locations not resident at this data center and other data center routers), the conductor is only reachable through the head end 128T router. That same 128T head end router will typically communicate with conductor using a private address.

- The head end fronting the conductor must perform NAT/NAPT to forward 4505/TCP, 4506/TCP, and 930/TCP to the conductor on the data center LAN. The authority-wide `conductor-address` is an IP address that is resolved/routed to that head end router.
- The head end router overrides the `conductor-address` with specific configuration to reference the local address.
- The head end router uses `management-config-generated` set to `proxy` requests received on its WAN interface (from remote branch sites) to the internal conductor's address.

####Remote Routers: to SVR or not to SVR?
When deploying your conductor behind another 128T at a data center, it opens the possibility of using Secure Vector Routing to reach the conductor using peer paths between a branch and the data center. However, 128 Technology *does not recommend* using SVR between systems for several reasons:

1. It exacerbates the Jekyll/Hyde problem (described below), by virtue of being both at the branch and the data center
2. Certain upgrade workflows or maintenance activities will cause remote sites to toggle between SVR and natural routing, which is suboptimal

A sample configuration is provided in [Appendix B](#appendix-b-conductor-behind-128t).

## Conductor Redundancy
Most production deployments include redundant conductor nodes. When deployed as a highly available pair, conductor nodes are always run as _active/active_, with all managed routers connecting to both. Unlike highly available routers, there is no notion of interface takeover with conductors; each conductor node is given a unique IP address reachable by all devices at all times. The two conductors that comprise a highly available pair will communicate with one another to synchronize state, such that it does not matter which conductor an administrator logs into to view metrics, alarms, etc.

The two conductor nodes must therefore have IP reachability to one another. For conductor nodes that are physically adjacent to one another, a direct cable between them is the most common deployment style. When separating conductor nodes over any distance, ensure they have a route to reach one another that will not interfere with the connectivity to the nodes they manage.

### Geographic Redundancy
Highly available conductors run as active/active, and have ongoing needs for state synchronization between one another. For this reason, 128 Technology requires that the network between geographically separated conductors have *latency of no more than 100ms*, and *packet loss no greater than 1%*.

## Conductor Access (Router Design)

### Jekyll/Hyde Access
A critical design consideration when configuring 128T routers to talk to the conductor is referred to as the "Jekyll/Hyde" problem: the system daemons that require connectivity to the 128T conductor must have persistent access whether the 128T router application is running or not. As starting the 128T application will typically have an (intentional) impact on that host platform's routing behavior, administrators must be aware of two distinct behaviors: the routing configuration in Linux while 128T is stopped ("Dr. Jekyll"), and the routing configuration in Linux while 128T is running ("Mr. Hyde"). Fortunately, the 128T software has facilities to create most, if not all of the requisite configuration.

When using _Conductor Host Services_ to create your configuration for a router to reach the conductor, the 128T configuration generator will create all of the necessary infrastructure (within both 128T as well as the host platform) to connect to the conductor on the interfaces you've specified. It does so by creating a _KNI_ (Kernel Network Interface), which is a network interface that connects between the Linux kernel and the 128T software.

:::important
You must also specify `conductor=true` on one of your network-interface configuration elements, in order for the 128T to recognize which egress path(s) to use.
:::

The KNI (named `kni254`) shuttles packets back and forth between the Linux processses (salt, secureCommunicationManager) and the 128T routing domain. Conductor Host Services will install specific, /32 routes to one or two conductor addresses, using the local KNI address (169.254.127.126) as its next-hop. Those will be sent "up" to the 128T routing domain, where they will match the generated `_conductor_` service(s), and follow the service-route out of the specified interface.

------

# Appendix A: Public Conductor

```
config

    authority
        conductor-address  192.0.2.2

        remote-login

        exit

        router             datacenter
            name                 datacenter
            inter-node-security  internal

            node                 node1
                name              node1
                asset-id          b77cefa0-b870-49bc-8b58-31d55bc56527
                role              combo

                device-interface  wan
                    name               wan
                    type               ethernet
                    pci-address        0000:01:00.0
                    forwarding         true

                    network-interface  wan0
                        name        wan0
                        global-id   2
                        conductor   true
                        source-nat  true

                        address     203.0.113.2
                            ip-address     203.0.113.2
                            prefix-length  24
                            gateway        203.0.113.1
                        exit
                    exit
                exit
            exit

            service-route        _conductor_1_route_1
                name          _conductor_1_route_1
                service-name  _conductor_1
                generated     true

                next-hop      node1 wan0
                    node-name   node1
                    interface   wan0
                    gateway-ip  203.0.113.1
                exit
            exit
        exit

        router             branch1
            name                 branch1
            inter-node-security  internal

            node                 node1
                name              node1
                asset-id          04822a5c-1f78-4d82-a442-bcb914c7fd99
                role              combo

                device-interface  wan
                    name               wan
                    type               ethernet
                    pci-address        0000:01:00.0

                    network-interface  wan1
                        name                   wan1
                        global-id              3
                        conductor              true
                        inter-router-security  internal
                        source-nat             true

                        address                198.51.100.2
                            ip-address     198.51.100.2
                            prefix-length  24
                            gateway        198.51.100.1
                        exit
                    exit
                exit
            exit

            service-route        _conductor_1_route_1
                name          _conductor_1_route_1
                service-name  _conductor_1
                generated     true

                next-hop      node1 wan1
                    node-name   node1
                    interface   wan1
                    gateway-ip  198.51.100.1
                exit
            exit
        exit

        router             bernstein
            name    bernstein

            system
                inactivity-timer  86400
            exit

            node    node1
                name              node1

                device-interface  wan
                    name               wan
                    type               ethernet
                    pci-address        0000:01:00.0
                    forwarding         false

                    network-interface  wan0
                        name       wan0
                        global-id  1
                        type       shared

                        address    192.0.2.2
                            ip-address     192.0.2.2
                            prefix-length  24
                            gateway        192.0.2.1
                        exit
                    exit
                exit
            exit
        exit

        tenant             _internal_
            name         _internal_
            description  "Auto generated tenant for internal services"
            generated    true
        exit

        service            _conductor_1
            name                     _conductor_1
            enabled                  true
            scope                    private
            tap-multiplexing         false

            transport                icmp
                protocol  icmp
            exit

            transport                tcp
                protocol    tcp

                port-range  443
                    start-port  443
                    end-port    443
                exit

                port-range  930
                    start-port  930
                    end-port    930
                exit

                port-range  4505
                    start-port  4505
                    end-port    4505
                exit

                port-range  4506
                    start-port  4506
                    end-port    4506
                exit
            exit
            address                  192.0.2.2/32
            access-policy-generated  true

            access-policy            _internal_
                source      _internal_
                permission  allow
            exit
            service-policy           _conductor_
            share-service-routes     false
            source-nat               network-interface
            application-type         generic
            fqdn-resolution-type     v4
            generated                true
        exit

        service-policy     _conductor_
            name                         _conductor_
            description                  "Auto generated service-policy for conductor services"
            lb-strategy                  proportional
            session-resiliency           none
            path-quality-filter          false
            best-effort                  true
            max-loss                     0.5
            max-latency                  250
            max-jitter                   100
            transport-state-enforcement  reset
            generated                    true
            ingress-source-nat           network-interface
        exit
    exit
exit
```

## Notes on the Configuration

1. The inclusion of `conductor-address` into the configuration generates the service `_conductor_1`. Each configuration can contain no more than two `conductor-address` values configured; a second `conductor-address` would create `_conductor_2`.

2. In this configuration, each of the two sample routers (`datacenter` and `branch1`) use their WAN interface to reach the Conductor. This is done by setting `conductor` to `true` on the WAN interface.
3. The interface used to reach the conductor must have `source-nat` set to `true`. (This is because the conductor connection is initiated by a process in Linux, which travels through `kni254` to reach the 128T's forwarding plane, and will have an unroutable source address: 169.254.127.127.)

------

# Appendix B: Conductor behind 128T

```
config

    authority
        conductor-address  203.0.113.2

        remote-login

        exit

        router             datacenter
            name                           datacenter
            conductor-address              172.20.0.128
            inter-node-security            internal

            node                           node1
                name              node1
                asset-id          b77cefa0-b870-49bc-8b58-31d55bc56527
                role              combo

                device-interface  wan
                    name               wan
                    type               ethernet
                    pci-address        0000:01:00.0
                    forwarding         true

                    network-interface  wan0
                        name        wan0
                        global-id   2
                        conductor   false
                        tenant      internet
                        source-nat  true

                        address     203.0.113.2
                            ip-address     203.0.113.2
                            prefix-length  24
                            gateway        203.0.113.1
                        exit
                    exit
                exit

                device-interface  lan
                    name               lan
                    type               ethernet
                    pci-address        0000:02:00.0
                    forwarding         true

                    network-interface  lan0
                        name        lan0
                        global-id   4
                        conductor   true
                        source-nat  true

                        address     172.20.0.1
                            ip-address     172.20.0.1
                            prefix-length  24
                        exit
                    exit
                exit
            exit

            management-service-generation
                service-route-type  paths-as-next-hop
                proxy               true
            exit

            service-route                  _conductor_1_route_1
                name          _conductor_1_route_1
                service-name  _conductor_1
                generated     true

                next-hop      node1 lan0
                    node-name       node1
                    interface       lan0
                    target-address  172.20.0.128
                exit
            exit

            service-route                  _conductor_datacenter_1_route_1
                name          _conductor_datacenter_1_route_1
                service-name  _conductor_datacenter_1
                generated     true

                next-hop      node1 lan0
                    node-name   node1
                    interface   lan0
                    gateway-ip  172.20.0.128
                exit
            exit
        exit

        router             branch1
            name                 branch1
            inter-node-security  internal

            node                 node1
                name              node1
                asset-id          04822a5c-1f78-4d82-a442-bcb914c7fd99
                role              combo

                device-interface  wan
                    name               wan
                    type               ethernet
                    pci-address        0000:01:00.0

                    network-interface  wan1
                        name                   wan1
                        global-id              3
                        conductor              true
                        inter-router-security  internal
                        source-nat             true

                        address                198.51.100.2
                            ip-address     198.51.100.2
                            prefix-length  24
                            gateway        198.51.100.1
                        exit
                    exit
                exit
            exit

            service-route        _conductor_1_route_1
                name          _conductor_1_route_1
                service-name  _conductor_1
                generated     true

                next-hop      node1 wan1
                    node-name   node1
                    interface   wan1
                    gateway-ip  198.51.100.1
                exit
            exit
        exit

        router             bernstein
            name    bernstein

            system
                inactivity-timer  86400
            exit

            node    node1
                name              node1

                device-interface  wan
                    name               wan
                    type               ethernet
                    pci-address        0000:01:00.0
                    forwarding         false

                    network-interface  wan0
                        name       wan0
                        global-id  1
                        type       shared

                        address    192.0.2.2
                            ip-address     192.0.2.2
                            prefix-length  24
                            gateway        192.0.2.1
                        exit
                    exit
                exit
            exit
        exit

        tenant             internet
            name         internet
            description  "Public internet"

            member       internet
                neighborhood  internet
                address       0.0.0.0/0
            exit
        exit

        tenant             _internal_
            name         _internal_
            description  "Auto generated tenant for internal services"
            generated    true
        exit

        service            _conductor_1
            name                     _conductor_1
            enabled                  true
            scope                    private
            tap-multiplexing         false

            transport                icmp
                protocol  icmp
            exit

            transport                tcp
                protocol    tcp

                port-range  443
                    start-port  443
                    end-port    443
                exit

                port-range  930
                    start-port  930
                    end-port    930
                exit

                port-range  4505
                    start-port  4505
                    end-port    4505
                exit

                port-range  4506
                    start-port  4506
                    end-port    4506
                exit
            exit
            address                  203.0.113.2/32
            access-policy-generated  false

            access-policy            _internal_
                source      _internal_
                permission  allow
            exit

            access-policy            internet
                source      internet
                permission  allow
            exit
            service-policy           _conductor_
            share-service-routes     false
            source-nat               network-interface
            application-type         generic
            fqdn-resolution-type     v4
            generated                true
        exit

        service            _conductor_datacenter_1
            name                     _conductor_datacenter_1

            applies-to               router
                type         router
                router-name  datacenter
            exit
            enabled                  true
            scope                    private
            tap-multiplexing         false

            transport                icmp
                protocol  icmp
            exit

            transport                tcp
                protocol    tcp

                port-range  443
                    start-port  443
                    end-port    443
                exit

                port-range  930
                    start-port  930
                    end-port    930
                exit

                port-range  4505
                    start-port  4505
                    end-port    4505
                exit

                port-range  4506
                    start-port  4506
                    end-port    4506
                exit
            exit
            address                  172.20.0.128/32
            access-policy-generated  true

            access-policy            _internal_
                source      _internal_
                permission  allow
            exit
            service-policy           _conductor_
            share-service-routes     false
            source-nat               network-interface
            application-type         generic
            fqdn-resolution-type     v4
            generated                true
        exit

        service-policy     _conductor_
            name                         _conductor_
            description                  "Auto generated service-policy for conductor services"
            lb-strategy                  proportional
            session-resiliency           none
            path-quality-filter          false
            best-effort                  true
            max-loss                     0.5
            max-latency                  250
            max-jitter                   100
            transport-state-enforcement  reset
            generated                    true
            ingress-source-nat           network-interface
        exit
    exit
exit
```

## Notes on the Configuration

1. As in the previous example, the interfaces that have `conductor` set to `true` also require `source-nat` to be set to `true`.

2. The datacenter router includes new configuration in the `management-service-generation` container; `proxy` is set to `true`, to forward requests received on its WAN interface to the conductor's private IP. The `paths-as-next-hop` value for `service-route-type` will generate one `service-route` to reach the conductor, with multiple next-hops for configurations with more than one conductor. The other choice, `paths-as-service-route` will generate multiple `service-route` configurations with a single next-hop apiece.

3. In this design, the datacenter router reaches to the conductor using the `lan` interface. The global `conductor-address` is overridden by the router. (If there are two conductors configured at the authority level, any router that overrides the addresses must override both.)

4. The datacenter's unique accesss create a unique service specific to it: `_conductor_datacenter_1`. It has the actual conductor's address configured and will match the requests arriving via `kni254`.

5. The generated `_conductor_1` service will require that the `access-policy-generated` toggle be set to `false`, and that the `access-policy` contain a reference to the WAN interfaces of the remote site(s). In our case, we have the WAN interface of the `datacenter` router in an "internet" neighborhood (0.0.0.0/0), such that any inbound, non-SVR request on the WAN will be treated as sourced from the `internet` tenant. We've added an `access-policy` statement for allowing inbound access to the `internet` tenant.

:::note
This tenancy design may require some tuning to fit into your environment. It is good practice to use tenancy on your WAN interfaces (in the form of neighborhood/membership, preferably). This gives you more control over the security of an interface. For example, we could have a tenant named `remote-sites` that contains the WAN IP addresses of the remote sites (presuming they're static addresses), and use that in our `_conductor_1` access-policy instead of `internet`. This would restrict inbound access. But for cases where branch offices use dynamic addressing (DHCP), this is not possible.
:::