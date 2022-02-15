---
title: Getting Started with the SSR Networking Platform
sidebar_label: Getting Started with the SSR Networking Platform
---
## Introduction
The Session Smart Router (SSR) Networking Platform is the first 100% software-defined, session-based distributed IP routing and network services platform designed from the ground-up with an application and service-centric context.  The platform consists of two primary components: the Session Smart Router and the SSR Conductor. Together, they form a single logical control plane that is highly distributed, and a data plane that is truly session-aware. The SSR Networking Platform supports a wide range of deployment models scaling from a small branch office to a high capacity edge router to a hyper-scale software-defined data center.

## SSR Conductor
The SSR Conductor is a centralized management and policy engine that provides orchestration, administration, provisioning, monitoring, and analytics for distributed Session Smart Routers – while maintaining a network-wide, multi-tenant service, and policy data model.

## Session Smart Router
The Session Smart Router combines a service-centric control plane and a session-aware data plane to offer all IP routing tables, feature-rich policy management, advanced data collection, and analytics in addition to high-speed packet forwarding, classification, and security functions.

### Secure Vector Routing (SVR)
The SSR Networking Platform provides Secure Vector Routing, an innovative approach to IP routing that eliminates the need for tunnel-based overlay networks. The SSR Networking Platform and its Secure Vector Routing make existing networks dramatically simpler, smarter, more secure and seamless. SVR comprises two unique control plane and data plane components, the service-centric control plane and the session-aware data plane. 

### Data Model
At the core of the SVR control plane is a service-based data model, which provides the language for describing the network’s services, tenancy, and associated policies. The SVR data model is global and location independent, meaning every router in an SVR fabric shares the same service-based policies and topology, at all times – no matter where it is. The service-centric data model is expressed in YANG and exposed via northbound REST, GraphQL, and NETCONF APIs to deliver a full suite of application and orchestration integration services.

### Routing with Words
To simplify routing, addressing, and access control, SVR uses the concept of “Routing with Words.” This is where services are described and communicated across the network in plain language, and aligned with the principles of Named Data Networking. In place of routes solely defined by IP addresses and CIDR blocks, SVR uses a URL-like Qualified Service Name (QSN) where service-based routes are described by name and carry a hierarchical multi-tenancy context.

## Session-Aware Data Plane
The session-aware data plane makes dynamic forwarding and policy decisions based on SVR’s distributed service-centric control plane, the unique attributes and policies of sessions, and real-time network monitoring. SVR-based routers, deployed at network edges, transform a stateless L2 fabric or L3 network data plane into one that is fully session-aware. This is made possible through the combination of three features: session detection and control, waypoint setting, and session-based signaling (metadata). A session-aware data plane creates end-to-end route vectors that are:
- **Deterministic** – Session traffic is steered in segments between waypoints, with enforced flow symmetry, all without tunnel-based overlays. 
- **Secure** – Each route vector controls the directionality of the session with its initiation. Every session is authenticated at each hop. Payload encryption is defined per service and applied per session. 
- **Dynamic** – Paths are established dynamically based on application policies and network state. Statically provisioned stateful tunnels are replaced with a model based on session state, where sessions are created on-demand and terminated when they’re no longer needed. Link and endpoint session load balancing is native. 
- **Multi-tenant** – Hierarchical multi-tenancy and secure segmentation is supported end-to-end across network and NAT (network address translation) boundaries.

## High Availability and Resilience
The Session Smart Networking platform has been designed to provide High Availability to provide stateful failover in addition to load sharing. The SSR solution can utilize redundant or alternate paths between nodes in a network to reroute traffic, improve resiliency, and maximize throughput. These diverse paths can provide link and node protection.
The solution operates in active/active clustering mode. Routers are grouped together as a pair of nodes, with each unit processing traffic and sharing the network load. Each router consists of two units acting as a stateful HA pair. Active/active clustering provides stateful failover in addition to load sharing. A fabric link between the routers is used to route traffic between them in case of failure. All information between the routers are shared using highly efficient in-memory databases to minimize bandwidth usage and to enable instantaneous information exchange. All processes in an SSR are self-resilient. They can regenerate themselves independently in case of process failures or exceptions.



