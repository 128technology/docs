---
title: Glossary
---
# Data Model
The data model used to describe network, service, and policy behavior consists of a series of interrelated objects, organized into a configuration hierarchy. All of these modeling components are contained within the _authority_, which represents the collection of all 128T networking components.

## Authority
The topmost configuration container in the 128T data model is called the authority, which is where system-wide global data is stored. Conceptually, the authority represents the complete set of all 128T routers managed under a single organizational entity. The global data within the authority container includes service-layer and policy-layer configuration that applies to all of the 128T routers within this organizational entity. (In this document, the term “authority” and “organizational entity” are synonymous, unless specifically referring to the 128T router’s configuration object container.)

## Network Layer

### Router
The primary building block of a 128T authority is the router. Routers consist of either one node (a standalone router), or two nodes (a high availability router). The configuration work done within the context of a router is referred to as local data (as opposed to the global data within the authority). Said another way: objects configured at the authority level of the hierarchy apply to all routers, and objects configured at the router level of the hierarchy apply only to that specific router.

### Node
Included in the local data of the router hierarchy are the software components that comprise that router referred to as nodes. Each node is a single running instance of 128T software. Within router-specific routing attributes – including both “classic” routing protocols such as BGP and OSPF, as well as 128T-specific “service routes,” defined elsewhere. Localized policies, primarily focused on the traffic distribution and traffic engineering behaviors of an individual router, are also part of the local data within the router hierarchy.

### Device Interface
A device interface (represented in the data model as _device-interface_) is the manifestation of the I/O device where packets ingress and egress. A device-interface can be one of several varieties:

- **Ethernet**: the most common type of interface, this is a physical Ethernet port on a hardware-based system, or a virtual Ethernet port on a virtual machine.
- **Host**: creates a Kernel Network Interface, which carries traffic between the 128T software application and the underlying host operating system.
- **Bridged**: used to attach the 128T software application to a Linux bridge.
- **PPPoE**: support for Point-to-Point Protocol over Ethernet, a popular network delivery mechanism for ISPs when using DSL.
- **LTE**: support for Long-Term Evolution, a standard wireless communication protocol developed by the 3GPP.
- **T1**: support for Transmission System 1, a carrier interface with speeds up to 1.544Mbps.

### Network Interface
A network interface principally defines the IP address and VLAN that is associated with a physical device interface.   There can exist one or more network-interface per device-interface.

### Tenants
Tenant is the term within the 128T data model used to represent a segmented partition within a L2/L3 network. Unlike other networking paradigms, where segmentation is done using overlay networking techniques (such as VLANs, VxLANs, etc.), the 128T router uses a novel tenancy model to place traffic sources and routes to their services (also referred to as service routes) into logical partitions within the underlay network itself. A rich set of hierarchical access control policies built into the tenancy model ensures that network traffic flows along prescribed paths, and only from eligible sources. Tenants, like the services that they access, reside within the global data in an authority's configuration. A tenant defined within a 128T authority is said to “stretch” across all 128T routers that are members of that authority, and tenant information is shared between 128T router instances.

For information on how to define tenants, read the section in our documentation [Configuring Tenants](config_tenants.md)

## Service Layer

### Services
Service configuration, which represents the cornerstone of the 128T router’s worldview, is part of the set of global data within an authority. Services represent specific applications that a network delivers; e.g., web services, database services, or voice/video services. Using a top-down approach, the 128T data model asks that administrators define the services that their network will deliver, the requirements that the service demands (in terms of latency, packet loss, jitter, etc.), and the network topology – and the 128T router will deliver traffic to the service using the optimal paths through the network. Because they are global data within an authority, all services defined within an authority are part of the dataset for each 128T router that is also a member of that authority.

## Policy Layer
A set of global policies rounds out the data model; complementing the router-specific policies, the global policies describe the treatment of traffic that flows between 128T routers. This includes information on how packets are classified into their various types (e.g., how to differentiate between web traffic, voice traffic, proprietary application traffic, etc.) and the requirements that those traffic varieties have from a networking perspective.