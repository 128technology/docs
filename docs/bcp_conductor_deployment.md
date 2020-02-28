---
title: Conductor Deployment Patterns
sidebar_label: Conductor Deployment
---

The 128T conductor is the centralized orchestration platform within a 128T Authority, and maintains (many) persistent connections to each router and its constituent node(s). This document discusses the various  options for deploying the 128T conductor, discussing the relative strengths and drawbacks of each.

All of the design patterns contained within this document are supported configurations; however, certain designs are discouraged due to their complexity, the number of limitations it imposes on your network design, the functional caveats it imposes, etc. These will be explicitly noted within each section accordingly.

For each topic, we will discuss items such as:

- Any resource requirements (e.g., public internet addresses)
- All corresponding 128T or Linux OS configuration requirements
- When the design pattern is encouraged or discouraged
- Its flexibility and scale

## Universal Considerations

### POD Design

The conductor is the single point of configuration for an array of managed routers; as such, its configuration can grow to be quite large. As the configuration grows larger, the processing time for new configuration moves, adds, and changes grows accordingly. 128 Technology recommends that network deployments be sized to a ratio of 2,000 assets per conductor (where an asset is a single instance of 128T software). I.e., either 1,000 highly available routers comprised of two nodes each, 2,000 standalone nodes, or any combination thereof.

For large scale deployments exceeding 2,000 assets, the conventional approach is to subdivide the network into PODs – independently managed networks.

### Linux OS Tuning

#### Configuring firewalld

When deploying conductor on theInternet, 128 Technology recommends limiting access to the system using *firewalld*. The basic premise is to restrict inbound access to the public-facing addresses to only allow ports 4505/TCP, 4506/TCP, and 930/TCP. This is generally done by:

1. Creating a specific firewalld **zone**; e.g., `conductor`
2. Creating a firewalld **service** for the conductor's salt master, containing TCP ports 4505, 4506; e.g., `salt-master`
3. Creating a firewalld **service** for the conductor's NETCONF connection, containing TCP port 930; e.g., `netconf`
4. Adding the "salt-master" and "netconf" services to the `conductor` zone
5. Set the public address to be in the `conductor` zone

128 Technology has developed some salt states to assist with these common configuration steps. Refer to our [public Github repo](https://github.com/128technology/salt-states/blob/master/setup-firewalld-t128-zone.sls) for some samples you can use to tune your system accordingly.

#### Hyperthreading

128 Technology recommends enabling hyperthreading for systems operating as conductors, as it may improve performance.

:::note
Because 128 Technology *does not* recommend hyperthreading for nodes running 128T software as a router, please be aware when repurposing a host from conductor to router that hyperthreading should be disabled.
:::

### About _Conductor Host Services_

_Conductor Host Services_ refers to the built-in feature within the 128T software that will generate configuration to simplify the connectivity between routers and their conductor(s). By configuring the `conductor-address` field within the 128T's data model, and by indicating which interface(s) on a manged router should be used to connect to conductor, the conductor will automatically generate the supporting configuration infrastructure. This includes:

- The `_conductor_` service (which will have a trailing sequence number; e.g., `_conductor_1`)
- A `service-route` for each `network-interface` on each router that has `conductor` set to `true`

The Conductor Host Services feature forms the basis for the majority of the conductor design patterns described in this document, and should be leveraged whenever possible.

## Addressing

### Public Conductor

The most conventional deployment model is where the conductor is reachable on a public IPv4 address, and all managed nodes have direct access to it via one or more WAN connections. This is the simplest of all deployment schemes, as it allows you to leverage the global `conductor-address` fields within the 128T data model to unambiguously define the conductor targets across the entire population of router nodes.

This deployment model is recommended when possible.

Configuration required:

```
config auth conductor-address [public address of conductor]
config auth router r1 node n1 device-interface WAN network-interface WAN0 conductor true
```

### Public Conductor Behind NAT

Another common model is a deployment where the conductor is behind a static NAT/firewall, which is forwarding to a private address assigned to the conductor. When placing the conductor behind a static NAT/firewall (effectively giving it a public IP address), be mindful of whether the NAT/firewall supports "hairpinning." (Hairpinning is when a device sends packets to the public IP address of a NAT that it sits behind.) This is because a conductor's salt-minion will connect to its own salt master, and will attempt to do so at the same IP address that all external minions connect to. If the NAT does not support hairpinning, then follow the steps outlined below in the section on _Split Horizon Conductor_.

#### Port Forwarding

When deploying a conductor behind a firewall, open 930/TCP (used for NETCONF) and 4505-4506/TCP (used for salt) to allow a conductor to communicate to managed routers. Open 443/TCP for the web UI, and 22/TCP for remote SSH.

### Split Horizon Conductor

A "split horizon" conductor is one that has IP presence on more than one broadcast domain, and where it is contacted on multiple IP addresses by different subsets of the overall population. (E.g., when a conductor resides in a data center coresident with head end routers, and external routers address the conductor on a public IP address while the data center routers address it using a LAN or management IP address.)

When deploying a split horizon conductor, there are two options: use the 128T's native _Conductor Host Services_ using the public conductor's address (with some exceptions, as noted below), or manually define conductor services. Each of these will be defined further here.

#### Using Conductor Host Services

Despite the router population having multiple distinct targets for a single conductor, it is nevertheless possible to use authority-wide, fixed addresses in the 128T configuration, yet have the routers forward to different targets. This leverages the Linux _firewalld_ process.

This design is recommended when the majority of the router population uses one address (typically a public address), and a minority of the router population access the same conductor at a second address (typically a private address). In this design, you should configure the authority-wide `conductor-address` as the address that is to be used by the majority of the routers. For the subset of routers that will use a second address, we'll perform a NAT function.

Within each Linux host on the minority set of routers, use the following `firewall-cmd` command (all on one line):

```
firewall-cmd --permanent --direct --add-rule ipv4 nat OUTPUT 0 -d <public IP> -j
    DNAT --to-destination <private IP>
```

This command will set a persistent `firewalld` rule that will translate packets sent from `<public IP>` on output, and instead send them to `<private IP>`. The application(s) (i.e., `persistentDataManager` and `salt-minion`) will believe they're sending packets to `<public IP>`, but `firewalld` will rewrite them and send them to `<private IP>` instead.

#### Manually Defining Conductor Services

Rather than use the built-in conductor services feature, you can "roll your own" conductor services by manually defining a conductor service. For the purposes of this example, we'll assume your conductor has two appearances: one on the public internet, and a second on a LAN. We'll need to define a `conductor` service that contains both IP addresses, and the various ports used for the routers to connect to it.

:::tip
It is possible to split the conductor service into separate services for each address, and set the `applies-to` for the service to the various populations. E.g., all of your data center routers can be in a `router-group` named "dc-routers" and your branch locations can be in a `router-group` named "branch". Then you can have a `service` defined for the local address with `applies-to` set to `dc-routers`, and a second `service` defined for the public address with `applies-to` set to `branch`.
:::

Once the services are defined, you'll also need to create `service-route` configuration for each router, to reach the conductor service.

##### Linux Configuration

Each of the routers using the manually-defined conductor service will need to be initialized with the appropriate conductor address. (This will set the `/etc/128technology/global.init` and `/etc/salt/minion` files to their appropriate values.)

## Conductor Redundancy

Most production deployments include redundant conductor nodes. When deployed as a highly available pair, conductor nodes are always run as _active/active_, with all managed routers connecting to both. Unlike highly available routers, there is no notion of interface takeover with conductors; each conductor node is given a unique IP address reachable by all devices at all times.

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

### In-Band Management

The term _in-band management_ in the context of conductor connectivity refers to the use of a forwarding interface by a router node for reaching the conductor. I.e., there is no dedicated interface specifically for the conductor to "manage" the node. As most 128T deployments separate the remote sites from the conductor over a WAN, it is exceedingly common to leverage in-band management between a remote node and a conductor. For SDWAN deployments, in-band management is _strongly recommended_, for the branch locations. For head end systems that are colocated with the conductors, out-of-band management is preferable, assuming there are sufficent free interfaces on the chosen head end hardware platform.

### Out-of-Band Management

Routing nodes are said to leverage _out-of-band management_ when they have a dedicated interface for the traffic to reach the conductor. Out-of-band management is generally only feasible when a conductor is colocated with the routing nodes, as is commonly the case at a head end data center.

:::note
It is possible to have a dedicated out-of-band management interface on branch locations, but this connection will almost certainly ultimately ride over the same device's WAN connection to the conductor. I.e., the management traffic will egress one interface on the device and be sent back to another interface on the same device. As such, the in-band management model is more suitable, as it avoids unnecessary hops.
:::
