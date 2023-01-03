---
title: Glossary
---
# Data Model
The data model used to describe network, service, and policy behavior consists of a series of interrelated objects, organized into a configuration hierarchy. All of these modeling components are contained within the _authority_, which represents the collection of all SSRs networking components.

## Authority
The topmost configuration container in the SSR data model is called the authority, which is where system-wide global data is stored. Conceptually, the authority represents the complete set of all SSRs managed under a single organizational entity. The global data within the authority container includes service-layer and policy-layer configuration that applies to all of the SSRs within this organizational entity. (In this document, the term “authority” and “organizational entity” are synonymous, unless specifically referring to the SSR’s configuration object container.)

## Network Layer

### Router
The routers are the SSR software systems responsible for receiving and sending packets to their correct destinations, aka routing. Routers consist of either one node (a standalone router), or two nodes (a high availability router).  You can think of Routers as a logical entity because they consist of one or two Nodes. Routers have `description` and `location-coordinates` fields that should be used to help give you some context as to the function of this router and where it is located. The name given to a Router should be a helpful name that tells the viewer of the configuration as much useful information as possible. 

Any elements configured under the Router are considered Local Data. That means that they only exist in that Router and not in the other Routers. Global Data is anything that is configured outside the Router element and applies to your whole Authority, not just one Router. 

### Node
Included in the local data of the router hierarchy are the software components that comprise that router referred to as nodes. Each node is a single running instance of SSRs software that is either physical or virtual. Within router-specific routing attributes – including both “classic” routing protocols such as BGP and OSPF, as well as SSRs-specific “service routes,” defined elsewhere. Localized policies, primarily focused on the traffic distribution and traffic engineering behaviors of an individual router, are also part of the local data within the router hierarchy.

### Device Interface
The Device Interface tells you which port on the physical server that you are using. The Device Interface will consist of a name, the type of interface it is, and an identifier for how to tell the SSR software which port it is taking control of. For example, if the `type` is `ethernet`, then you will need to put in a `pci-address` as your identifier. 

A device interface (represented in the data model as _device-interface_) is the manifestation of the I/O device where packets ingress and egress. A device-interface can be one of several varieties:

- **Ethernet**: the most common type of interface, this is a physical Ethernet port on a hardware-based system, or a virtual Ethernet port on a virtual machine.
- **Host**: creates a Kernel Network Interface, which carries traffic between the SSR software application and the underlying host operating system.
- **Bridged**: used to attach the SSR software application to a Linux bridge.
- **PPPoE**: support for Point-to-Point Protocol over Ethernet, a popular network delivery mechanism for ISPs when using DSL.
- **LTE**: support for Long-Term Evolution, a standard wireless communication protocol developed by the 3GPP.
- **T1**: support for Transmission System 1, a carrier interface with speeds up to 1.544Mbps.

```
device-interface  wan1
    name                 wan1
    pci-address          0000:00:09.0
    shared-phys-address  00:01:00:A1:CA:A5
    
    network-interface    wan1
        name                   wan1
        global-id              5
    
        neighborhood           internet
            name      internet
            topology  hub
            vector    internet
        exit
        inter-router-security  aes1
    
        address                3.3.3.128
            ip-address     3.3.3.128
            prefix-length  24
            gateway        3.3.3.1
        exit
    
        adjacency              1.1.1.128
            ip-address             1.1.1.128
            peer-connectivity      bidirectional
            peer                   seattlesite1
            generated              true
            inter-router-security  aes1
            cost                   0
            qp-value               0
            vector                 internet
        exit
    
        adjacency              2.2.2.128
            ip-address             2.2.2.128
            peer-connectivity      bidirectional
            peer                   dallassite1
            generated              true
            inter-router-security  aes1
            cost                   0
            qp-value               0
            vector                 internet
        exit
    exit
exit
```
If two Device Interfaces have the same `shared-phys-address` that means that they are a redundant pair. You can issue `show device-interface summary` to find out which one is currently active and which is standby. 

### Network Interface
Network Interfaces tell your SSRs which networks it is participating in. You can have multiple Network Interfaces per Device Interface. Network Interfaces have `global-id` that are used by the SSR software to identify which Network Interface to send traffic out of. If two Network Interfaces have the same `global-id` then they are treated as redundant for one another, or as a _shared interface_.

:::note
Do not assign a `global-id` to a network-interface on your own. Your SSRs will generate a unique `global-id` for a standalone network-interface, and will automatically assign a common `global-id` for shared interfaces when it detects that they each reference a common `shared-phys-address`. For more information on shared interfaces, refer to the [High Availability Best Practices](concepts_ha_theoryofoperation.md) documentation.
:::

```
network-interface    wan1
    name                   wan1
    global-id              5
    
    neighborhood           internet
        name      internet
        topology  hub
        vector    internet
    exit
    inter-router-security  aes1
    
    address                3.3.3.128
        ip-address     3.3.3.128
        prefix-length  24
        gateway        3.3.3.1
    exit
    
    adjacency              1.1.1.128
        ip-address             1.1.1.128
        peer-connectivity      bidirectional
        peer                   seattlesite1
        generated              true
        inter-router-security  aes1
        cost                   0
        qp-value               0
        vector                 internet
    exit
    
    adjacency              2.2.2.128
        ip-address             2.2.2.128
        peer-connectivity      bidirectional
        peer                   dallassite1
        generated              true
        inter-router-security  aes1
        cost                   0
        qp-value               0
        vector                 internet
    exit
exit
```

## Redundancy Group
A Reundancy Group is a group of Device Interfaces that are tied to each other. This means that when one goes down, they will all switch over to their redundant partner. 

```
redundancy-group      datacenter1
    name      datacenter1
    
    member    datacenter1 mpls1
        node       datacenter1
        device-id  mpls1
    exit
    
    member    datacenter1 srv1
        node       datacenter1
        device-id  srv1
    exit
    
    member    datacenter1 srv2
        node       datacenter1
        device-id  srv2
    exit
    
    member    datacenter1 srv3
        node       datacenter1
        device-id  srv3
    exit
    
    member    datacenter1 wan1
        node       datacenter1
        device-id  wan1
    exit
exit
```

## Neighborhoods
Neighborhoods are a means of specifying which Network Interfaces in your SSRs Authority are connected to each other, helping your SSRs conductor understand your network topology. By using Neighborhoods, your SSRs will auto-configure certain elements, such as Peers, Adjacencies, and Service Routes, to ensure that the Network Interfaces in the same Neighborhood connect to each other automatically. By viewing the Network Interfaces and seeing which ones share the same Neighborhood labels, you can get a picture for which Network Interfaces are connected to each other. In the Neighborhood configuration, you can also see a field called `topology`. The values for Topology are:

- mesh
- hub
- spoke

Meshes will connect to everything, hubs connect to spokes and meshes, and spokes connect to hubs and meshes. Knowing this information can help you visualize which Network Interfaces are connected to each other.

## Adjacency
Another sub-element of the Network Interface is the Adjacency. The Adjacency tells your SSRs how it can reach its Peer. Peers can be reachable from multiple Network Interfaces, so this is just one of the ways that a particular Peer is reachable. 

## Peer
A Peer is another SSRs router that your current SSRs router is connected to. By understanding which routers are Peers, you can start to draw out a network diagram with your SSRs nodes. 
```
router          seattlesite1
    name                  seattlesite1
    location-coordinates  +47.6062-122.3321/
    description           Test-Changed
    inter-node-security   internal
    
    peer                  bostonsite1
        name            bostonsite1
        authority-name  CompanyX
        router-name     bostonsite1
    exit
    
    node                  branchoffice1
        name              branchoffice1
        asset-id          branch-1-router
        role              combo
    
        device-interface  mpls1
            name               mpls1
            type               ethernet
            pci-address        0000:00:04.0
            capture-filter     len>0
    
            network-interface  mpls1
                name                    mpls1
                global-id               3
                vlan                    0
                type                    external
                conductor               false
    
                neighborhood            mpls
                    name                mpls
                    peer-connectivity   bidirectional
                    topology            spoke
                    vector              mpls
                    qp-value            0
    
                    udp-transform
                        mode                 auto-detect
                        detect-interval      300
                        nat-keep-alive-mode  disabled
                    exit
    
                    path-mtu-discovery
                        enabled   false
                        interval  600
                    exit
                exit
                inter-router-security   internal
                prioritization-mode     local
                source-nat              false
                qp-value                0
                mtu                     1500
                enforced-mss            disabled
    
                address                 10.0.128.0
                    ip-address     10.0.128.0
                    prefix-length  31
                    gateway        10.0.128.1
                exit
    
                adjacency               10.0.128.1
                    ip-address             10.0.128.1
                    peer-connectivity      bidirectional
                    peer                   bostonsite1
                    generated              true
                    inter-router-security  aes1
                    cost                   0
                    qp-value               0
                    vector                 mpls
    
                    udp-transform
                        mode                 auto-detect
                        detect-interval      300
                        nat-keep-alive-mode  disabled
                    exit
    
                    path-mtu-discovery
                        enabled   false
                        interval  600
                    exit
                exit
                icmp                    allow
                    multicast-listeners     automatic
                    multicast-report-proxy  false
                    dhcp                    disabled
                exit
            exit
    
            device-interface  lan1
                name               lan1
                pci-address        0000:00:03.0
    
                network-interface  lan1
                    name       lan1
                    global-id  4
                    tenant     seattle.corp
    
                    address    192.168.64.1
                        ip-address     192.168.64.1
                        prefix-length  24
                    exit
                exit
            exit
    
            device-interface  wan1
                name               wan1
                pci-address        0000:00:05.0
    
                network-interface  wan1
                    name                   wan1
                    global-id              6
    
                    neighborhood           internet
                        name    internet
                        vector  internet
                    exit
                    inter-router-security  aes1
    
                    address                1.1.1.128
                        ip-address     1.1.1.128
                        prefix-length  24
                        gateway        1.1.1.1
                    exit
    
                    adjacency              3.3.3.128
                        ip-address             3.3.3.128
                        peer-connectivity      bidirectional
                        peer                   bostonsite1
                        generated              true
                        inter-router-security  aes1
                        cost                   0
                        qp-value               0
                        vector                 internet
                    exit
                exit
            exit
        exit
    exit
exit
```

## Tenants
Tenant is the term within the SSR data model used to represent a segmented partition within a L2/L3 network. Unlike other networking paradigms, where segmentation is done using overlay networking techniques (such as VLANs, VxLANs, etc.), the SSR uses a novel tenancy model to place traffic sources and routes to their services (also referred to as service routes) into logical partitions within the underlay network itself. A rich set of hierarchical access control policies built into the tenancy model ensures that network traffic flows along prescribed paths, and only from eligible sources. Tenants, like the services that they access, reside within the global data in an authority's configuration. A tenant defined within the SSR authority is said to “stretch” across all SSRs that are members of that authority, and tenant information is shared between SSRs router instances.

For information on how to define tenants, read the section in our documentation [Configuring Tenants](config_tenants.md)

Tenants are a way to define endpoints that you want to identify on your network. When you define Tenants, you can create access policies on your Services based on the Tenant name. 
```
tenant          corp
    name  corp
exit
    
tenant          seattle.corp
    name  seattle.corp
exit
    
tenant          dallas.corp
    name  dallas.corp
exit
    
tenant          _internal_
    name         _internal_
    description  "Auto generated tenant for internal services"
    generated    true
exit
```
As you can probably notice from the configuration above, to configure a Tenant, all you need to do is give it a name. Your name should be descriptive. Optionally, there is a description field you can use to give more context to anyone reviewing your configuration. 

Tenants can be children of other Tenants. This means that if you apply an access policy to a parent Tenant, all the children will inherit it. However, if you set the access policy at the child, then the parent will not get that access from the child. You can create the parent-child relationship by how you name your Tenants. The name format is `child.parent`. So for example, if the tenant is `dallas.corp`, then the parent is `corp` and `dallas` is the child. You can have an arbitrary number of levels of tenants within a tenant, such as `greatgrandchild.grandchild.child.parent`. 

Traffic gets associated with a Tenant in one of three ways:

1. Tenancy was assigned by an upstream SSRs and communicated in metadata.
2. By arriving on a Network Interface that has a tenant configured.
3. By arriving on a network-interface that has a neighborhood configured, and the source IP address of the IP packet is defined within a tenant's `member > address` definition.

In the metadata that SSRs send to each other when using SVR, they include the Tenant traffic has already been assigned. So, if my Seattle Router assigns the `seattle.corp` Tenant to a session and then sends that session to my Boston Router, my Boston Router will already know that this session belongs to the `seattle.corp` Tenant and use that information in determining if this session has access to the Service it is trying to access.

At the Network Interface, you can also assign a Tenant and if any traffic that doesn't already have a Tenant assigned ingresses this Network Interface, it will belong to that Tenant. 

```
device-interface  lan1
    name               lan1
    pci-address        0000:00:03.0
    
    network-interface  lan1
        name       lan1
        global-id  4
        tenant     seattle.corp
    
        address    192.168.64.1
            ip-address     192.168.64.1
            prefix-length  24
        exit
    exit
exit
```
Lastly, if you are using neighborhoods, then you can associate tenancy based on the originating subnet. Within the tenant configuration, you will find a sub-element called `member`. The `member` element defines the association of IP address ranges within a neighborhood to a tenant. If a network interface belongs to that neighborhood, and the source address of the traffic that ingresses that network interface falls into one of the subnets assigned to that tenant, then the traffic will be associated to that tenant. This technique allows you to correlate traffic into an array of tenants when it arrives on a single network interface.
```
tenant          corp
    name    corp
    
    member  mpls
        neighborhood  mpls
        address       192.168.64.1/24
        address       10.0.0.0/24
    exit
exit
```
In this example, any traffic arriving on an interface that is part of the `mpls` neighborhood, will be associated with the `corp` tenant if it is sourced from 192.168.64.0/24 or 10.0.0.0/24.

:::note
Some configurations elect to use this technique for tenant association in lieu of the previous technique (assigning a tenant to a network-interface). This is done by associating the network-interface with a neighborhood, and setting the `member > address` prefix to `0.0.0.0/0`.
:::

## Service Layer

### Services
Services make up the heart of the SSR data model. the SSR data model is built upon the idea that one should build their network around the applications that they will be accessing and not determine which applications their network can access based off of the way their network is set up. In the SSR data model, a `service` is a traffic destination being accessed by constituents in your network. 

Service configuration, which represents the cornerstone of the SSR’s worldview, is part of the set of global data within an authority. Services represent specific applications that a network delivers; e.g., web services, database services, or voice/video services. Using a top-down approach, the SSR data model asks that administrators define the services that their network will deliver, the requirements that the service demands (in terms of latency, packet loss, jitter, etc.), and the network topology – and the SSR will deliver traffic to the service using the optimal paths through the network. Because they are global data within an authority, all services defined within an authority are part of the dataset for each SSRs router that is also a member of that authority.

```
service  video
    name            video
    enabled         true
    security        encryption_only
    
    transport       tcp
        protocol    tcp
    
        port-range  8554
            start-port  8554
        exit
    exit
    
    transport       udp
        protocol  udp
    exit
    address         172.16.128.2/32
    
    access-policy   corp
        source  corp
    exit
    service-policy  prefer_broadband
exit
```

The `address` and `transport` fields indicate the IP address(es), transport protocols, and ports that make up this service. The `access-policy` elements indicate the user populations (typically defined as the name of a `tenant`) that are allowed access to this service.

:::note
The naming convention you choose when modeling your network is very important when you are going back to look at what you configured. Giving your services meaningful names can remove a lot of the guesswork as to what the service you defined actually is – particularly for those that support this configuration in the future.
:::

## Policy Layer
A set of global policies rounds out the data model; complementing the router-specific policies, the global policies describe the treatment of traffic that flows between SSRs. This includes information on how packets are classified into their various types (e.g., how to differentiate between web traffic, voice traffic, proprietary application traffic, etc.) and the requirements that those traffic varieties have from a networking perspective.

## Service Policies
Your Service may be configured with a _Service Policy_. A Service Policy tells each SSRs how to handle traffic destined for that Service. It will define things such as whether the Service will be load balanced and with what strategy, whether session resiliency is set up, and selecting path preference with Vectors. The Service Policy will give you a better understanding of how important a Service is to a deployment and what paths that traffic will take to get to that Service.

```
service-policy  prefer_broadband
    name                         prefer_broadband
    lb-strategy                  hunt
    
    vector                       internet
        name      internet
        priority  ordered
    exit
    
    vector                       mpls
        name      mpls
        priority  ordered
    exit
    session-resiliency           none
    path-quality-filter          false
    best-effort                  true
    transport-state-enforcement  reset
exit
```

## Vectors
Defined in the Service Policy, vectors let you set path priority with your SSRs. You will see the Vectors configured at the Neighborhoods which are sub-elements of the Network Interface. The Service Policy is where you can determine the priority of each Vector when the SSR is deciding which path to send traffic down and thus which Network Interfaces to use. 
```
network-interface  mpls1
    name                    mpls1
    global-id               3
    vlan                    0
    type                    external
    conductor               false
    
    neighborhood            mpls
        name                mpls
        peer-connectivity   bidirectional
        topology            spoke
        vector              mpls
        qp-value            0
    
        udp-transform
            mode                 auto-detect
            detect-interval      300
            nat-keep-alive-mode  disabled
        exit
    
        path-mtu-discovery
            enabled   false
            interval  600
        exit
    exit
exit
```

## Service Routes
Service Routes are used to tell your SSRs how to reach a particular Service. This is Local Data, so it is only specific to a particular Router. It tells that Router that if you see traffic that matches one of your configured Services, then send it to the following destination. The destination can be one or more SSRs Peers, a gateway, an IP address, a subnet, a blackhole, etc. If the destination is another SSRs, then the SSRs will use Secure Vector Routing to send the traffic. 

```
service-route         webserver-route
    name          webserver-route
    service-name  webserver
    peer          bostonsite1
exit
            
service-route                 local-webserver3-route
    name                  local-webserver3-route
    service-name          webserver3
    nat-target            172.36.128.2
    service-route-policy  lb-policy
exit
```

## Service Route Policies
A Service Route Policy is way to set limits on the Service Routes to use when the SSR is determining which path to take. This is necessary for load balancing. You can set limits based on the max number of concurrent sessions to send down one path or the session rate/second for that path. Service Route Policies get applied to the Service Routes. 

```
service-route-policy  lb-policy
    name          lb-policy
    max-sessions  1000
exit
```

## Routing Default-Instance
While using Service Routes with the SSR is the preferred method of routing, you may also encounter deployments that use traditional routing methods such as BGP, OSPF, or Static Routes. You will find the settings for these under `routing` under the Router. The Routing element must have a `type` of `default-instance` but the sub-elements under that will have all the settings you need to set for creating Static Routes, BGP peering, and OSPF peering. 

When the SSR is making routing decisions, it will use traditional administrative distances to figure out which route to use with one exception: Service Routes get priority over every other route. You can see what route will get chosen with `show fib`. You can see the traditional routing decisions with `show rib`. 

```
routing               default-instance
    type              default-instance

    routing-protocol  bgp
        type            bgp
        local-as        100
        router-id       1.1.1.128

        address-family  ipv4-unicast
            afi-safi                ipv4-unicast

            default-route-distance
                external  69
                internal  13
                local     55
            exit

            network                 192.168.64.0/24
                network-address  192.168.64.0/24
                policy           mark-vrfl
            exit
        exit
    exit
exit
```