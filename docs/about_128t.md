---
title: 128T Networking Platform
sidebar_label: 128T
---

## What is the 128T Networking Platform?

Networks exist to connect users to services and applications, and network design should start with those services at the core. Secure Vector Routing (SVR) is a new routing architecture that enables the network to differentiate the way it delivers applications and services with simplicity, security, and scalability in mind. It replaces tunnel-based network overlays and inefficient provisioning systems with distributed control, simple intelligent service-based routing, and in-band (data plane) session-based signaling. SVR is fully compatible and interoperable with existing network protocols and architectures, allowing it to be gradually introduced into an existing IP network without affecting the network endpoints or hosts.

## How does it work?

At the core of the SVR control plane is a service-based data model, which provides the language for describing the network’s services, tenancy, and associated policies. The SVR data model is global and location independent, meaning every router in an SVR fabric shares the same service-based policies and topology, at all times – no matter where it is. The service-centric data model is expressed in YANG and exposed via northbound REST/GraphQL and NETCONF APIs to deliver a full suite of application and orchestration integration services.

To simplify routing, addressing, and access control, SVR uses the concept of “Routing with Words.” This is where services are described and communicated across the network in plain language, and aligned with the principles of Named Data Networking. In place of routes solely defined by IP addresses and CIDR blocks, SVR uses names that carry a hierarchical multi-tenancy context.

SVR ensures that bi-directional sessions follow the same path. Traditional routers use a stateless per packet “hot potato” forwarding approach with no notion of session. With SVR, all packets associated with a session are routed along the same path, no matter which way they’re traveling. This symmetric flow enables packets to be intelligently routed, sessions to be controlled, and traffic to be proactively analyzed. It also prevents unauthorized flows from using a given path.

Session directionality forms the foundation of SVR’s secure routing and segmentation model. It enables a SVR fabric to behave as a zone-based firewall. As every SVR route defines the direction of session at initiation, each route becomes a secure vector that tightly controls access to the destination or service. In short, secure vector routing unifies access control and security policies during routing.

SVR architecture defines a location independent and segmented approach to routing and addressing based on waypoints. Waypoint addresses (or simply “waypoints”) are IP addresses configured on secure vector routers that are used to govern sessions across network paths.

Waypoints are separate and distinct from the IP addresses and named services that identify end-to-end network sessions between devices and services. Secure vector routes define the path (e.g., set of routers) each session must follow within an SVR topology. Every SVR-based router can be reached by one or more waypoints, and Bi-directional Forwarding Detection (BFD) and inline flow monitorint are used to test connection and path attributes between the waypoints.

The waypoint-based routing with SVR is inherently segment based, meaning that end-to-end route vectors can be created based on multiple router (or waypoint) hops. Since each SVR router maintains an overall view of the topology and service-based policies, dynamic multi-segment paths can be established. Ephemeral session state in each router along the path guarantees symmetric communications.

To establish a symmetric flow, the ingress secure vector router adds metadata to the first packet of each session. This metadata is used to signal information about a session including original IP addresses, tenant, and policy information. The metadata is only included when the SVR router is aware that there is another secure vector router downstream and, from there, all packets for that session follow the same path. Reverse metadata is included in the first packet on the return path for the same session. The metadata is only included in the initial packets sent between the two SVR routers. The exchange of metadata is always digitally signed to prevent tampering and can be optionally encrypted.

The forward metadata includes information about the original source IP address and port, original  destination address and port, the tenant associated with the origin of the request, desired class of service, and other policy and control information. The reverse metadata includes utilization metrics and possible service class modification information so as to influence future routing decisions.