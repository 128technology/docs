---
title: Service and Service Policy Design
sidebar_label: Service and Service Policy Design
---

Designing a service-oriented network with the 128T Session Smart router benefits from careful planning and thoughtful policy decisions. With the ability to steer traffic using the best path on a per-session basis, administrators have more control than ever before in deciding how their users maximize the network. This document discusses two fundamental, and related concepts: the *service* and the *service-policy*.

A service is a network destination of interest to your network's users. It can represent a web server, a PBX system for your phones, a CRM system in the public cloud, or something specific only to you. The `service` data model in the 128T modeling language gives administrators great flexibility in defining what constitutes an "interesting" application that requires specific treatment as contrasted to bulk data. The `service-policy` affiliated with that `service` lets the administrator specify the treatment for the traffic of that service: where it should go, which path it should use to get there, how it gets treated along the way (marked and queued), and what to do in the event of network failures.

In this document we will cover the various types of services that are configurable in the 128T data model, and how to apply them. We will then discuss the predominant service-policy options for governing the traffic treatment for traffic steering, and give some rules of thumb for how to apply them.

## Intended Audience

This document is intended for network administrators and network architects responsible for designing 128T configurations for their end users. It provides a conceptual overview for the different options available for configuring `service` and `service-policy` data models, and guidance on when to use the various attributes.

This document is relevant to the day-to-day job of network operations and network support staff, to help them to interpret a configuration to understand its intent.

## Overview

In the 128T worldview, each IP destination that will receive traffic must be configured as a *service*. A service can be defined as broadly as a netmask (it is common for our customers to have a service representing the entire internet, as 0.0.0.0/0) or as specific as a transport protocol and single port. As traffic arrives at a 128T router, it (among other things) is associated with a configured service, which will in turn influence its path selection.

Path selection on the 128T is a decision process that considers several factors:

- Current network state. Are next hops reachable? Is a remote peer reachable? What are the current quality metrics for the various potential paths?
- Administrative priorities. Which path should this traffic take in the "sunny day scenario," when all paths are available? How should the 128T assess viability for a path for any given service?

In the previous section of this document we discuss how 128T determines whether or not a remote peer is reachable (asynchronous BFD) and the quality of the path (echo BFD). These both pertain to the *current network state*. The *administrative priorities* of the 128T are described through the use of a *service-policy*, a configuration element that is associated with a service.

## Service Types

The *service* configuration element is the cornerstone of the 128T data model. It is what allows administrators to describe eligible destinations for traffic, to which they can subsequently define access controls, routing policy, and traffic treatment. There is a strong correlation between successful deployments of the 128T software and a deep understanding of the services on the target network.

A service's configuration is very flexible, and can represent many different aspects of a network's topology. The various data modeling variants of a service are described in the sections that follow.

### Fully Qualified Services

The most fundamental, and granular definition of a service is one which defines a specific application on your network. The goal of any 128T-powered configuration should be to configure *fully qualified* services with as much precision as possible. The key elements of a fully qualified service are:

- A narrow range of IP addresses that all serve the application
- Specific transport protocols and ports that the application uses

Example:

```
admin@labsystem1.fiedler# show config running authority service cloudflare-dns

config

    authority

        service  cloudflare-dns
            name                  cloudflare-dns
            scope                 private

            transport             udp
                protocol    udp

                port-range  53
                    start-port  53
                exit
            exit
            address               1.1.1.1/32
            address               1.0.0.1/32

            access-policy         trusted
                source  trusted
            exit

            access-policy         _internal_
                source      _internal_
                permission  allow
            exit
            share-service-routes  false
        exit
    exit
exit
```

:::tip Key to success
Define the service as specifically as possible, using transport/port and specific IP addresses as appropriate.
:::

### CIDR Services

Many deployments of the 128T software include a number of *CIDR services* which – in contrast to fully qualified services – are broad swaths of IP addresses, typically located behind a 128T at a specific location.

The hallmarks of a CIDR Service are that it seldom has transport protocols defined, and never has ports defined. (Administrators may configure transport protocols without ports to restrict a service to TCP, UDP, and ICMP only, and block other IP protocols such as GRE.)

Example:

```
admin@labsystem1.fiedler# show config run auth service burlington-guest

config

    authority

        service  burlington-guest
            name           burlington-guest
            scope          private
            security       internal
            address        172.18.32.0/20

            access-policy  trusted
                source      trusted
                permission  allow
            exit

            access-policy  _internal_
                source      _internal_
                permission  allow
            exit
            source-nat     network-interface
        exit
    exit
exit
```

### Summary and Spoke Services

*Summary services* and *spoke services* work in conjunction with each another to provide coarse routes from one 128T to another, and specific routes from the receiving 128T router to the destination. It is commonly used in "hub and spoke" topologies, where a less-specific route will direct traffic to a location, and that location's router has more specific routes to apply to the traffic.

For example, in a retail deployment it is common for each branch location to have a specific CIDR block allocated, e.g., 10.20.20.0/24 for "site 2020." For traffic originating in a data center and destined for the branch, a summary service is configured using the address 10.20.20.0/24. The branch router has more specific spoke services for the individual applications at the branch; e.g., 10.20.20.128/32, 10.20.20.60/32 UDP/5060, etc.

Conceptually, summary services and spoke services are very similar to CIDR services and application-based services, respectively. However, there is one significant difference between a summary service and a CIDR service: the summary service *must include a transport section*. This is the "trigger" for the receiving 128T router to apply a more-specific spoke service.

:::note
A second, common attribute of summary services is the inclusion of an `applies-to` block in the configuration. The purpose of this block is described in more detail in the _Router/Router Group-based Services_ section below. Because summary and spoke services are generally at their most useful in massive deployments to reduce overall configuration overhead, this is a strong case for using Router/Router Group-based services whenever summary services are considered.
:::

Example:

```
config

    authority
    
        service            site2020_summary
            name                  site2020_summary

            applies-to            router-group
                type        router-group
                group-name  datacenters
                group-name  retail-site2020
            exit
            security              internal

            transport             tcp
                protocol  tcp
            exit

            transport             udp
                protocol  udp
            exit

            transport             icmp
                protocol  icmp
            exit
            address               10.20.20.0/24

            access-policy         datacenter
                source  datacenter
            exit
            service-policy        core2store-retail
            share-service-routes  true
        exit
    exit
exit
```

### Generated Services

Various features within the 128T will cause services to be generated automatically when configured. This includes:

- Conductor Host Services
- BGP over SVR
- DHCP Relay

:::note
The services generated by the 128T are created as fully qualified services.
:::

Each of these service types shares one important attribute: they are created with the `generated` flag set to `true`. If you want to make any modifications to the generated services, you must first set `generated` to `false`, or else your configuration changes will be stripped upon the next time the configuration is committed. For more information on configuration workflows involving the `generated` flag, refer to the [128T software documentation](config_basics.md#generated-configuration).

Example (BGP over SVR):

```
config

    authority

        service            _bgp_dc1_loopback1
            name                     _bgp_dc1_loopback1
            description              "Auto generated BGP Service for dc1 at 172.20.0.1"
            enabled                  true
            scope                    private
            security                 internal
            tap-multiplexing         false

            transport                tcp
                protocol    tcp

                port-range  179
                    start-port  179
                    end-port    179
                exit
            exit
            address                  172.20.0.1/32
            access-policy-generated  false

            access-policy            _bgp_speaker_
                source      _bgp_speaker_
                permission  allow
            exit
            service-policy           MPLS-DIA-LTE
            share-service-routes     false
            source-nat               network-interface
            application-type         generic
            generated                true
        exit
    exit
exit
```

### Router/Router Group-Based Services

Router- and router group-based services are not services unto themselves; rather, the term refers to the capability of limiting the scope of services to specific routers or sets of routers. By default, any service configured on a 128T conductor is pushed down to all routers it manages. This may result in unnecessary bloat on routers that will never have a calling for a specific service. E.g., in a typical retail deployment traffic generally goes in one of two directions: originating at a store and heading to a data center, or originating at a data center and heading to a store. Thus it is important for head end routers to have access to store services, and for a store to have the configuration corresponding to its own local services, but there will be no need for every store to have every other store's local services in a full mesh.

:::note
In case a full mesh is a requirement, 128 Technology has the Summary and Spoke Services – which use router-based services to optimize the configuration.
:::

Use the `applies-to` configuration within a `service` to restrict its scope:

```
admin@labsystem1.fiedler# show config running authority service lo_burlington

config

    authority

        service  lo_burlington
            name           lo_burlington

            applies-to     router
                type         router
                router-name  burlington
                router-name  newton
            exit
            description    "burlington loopback"
            scope          private
            security       interfabric
            address        172.31.0.2/32

            access-policy  trusted
                source  trusted
            exit

            access-policy  _internal_
                source  _internal_
            exit
        exit
    exit
exit
```

In this example, the service will only be delivered to two routers: `burlington` and `newton`. When using the `applies-to router-group` configuration, the group name is configured within each router.

```
config

    authority

        service  core2store-default
            name            core2store-default

            applies-to      router-group
                type        router-group
                group-name  DC-routers
                group-name  retail-routers
            exit
            enabled         true
            scope           private
            security        internal

            transport       tcp
                protocol  tcp
            exit

            transport       udp
                protocol  udp
            exit
            address         10.0.0.0/8

            access-policy   datacenter
                source      datacenter
                permission  allow
            exit

            service-policy  DIA-MPLS-LTE
        exit
    exit
exit
```

Here's a common sight in large retail deployments: a `core2store` service for traffic originating in the data center and destined for a retail store. It is applied to two router groups: `DC-routers` and `retail-routers`. By applying a `group` tag on a managed router that matches either (or both) of these two group names, it will receive a copy of this configuration from the conductor.

### Application-Module Services

Application-module services are dynamic and have two parts: a `service` configuration that references an `application-name`, and a script resident on the 128T's host operating system with that `application-name` that generates forwarding rules (FIB entries, in the form of JSON configuration) that are installed onto the 128T. Application-module services give the ultimate flexibility to the 128T administrator: the ability to  define the forwarding logic of the 128T using the programming language of their choice.

To enable an application-module service, a router must have `application-identification` with `mode` set to `module`, as is shown here:

```
admin@labsystem1.fiedler# show config running auth router burlington application-identification

config

    authority

        router  burlington
            name                        burlington

            application-identification
                mode  module
            exit
        exit
    exit
exit
```

A service that references a module name is configured like this:

```
admin@labsystem1.fiedler# show config running auth service custom-service

config

    authority

        service  custom-service
            name                  custom-service

            description           "Custom service definition using Application Module"
            scope                 private
            application-name      customsvc

            access-policy         _internal_
                source      _internal_
                permission  allow
            exit

            share-service-routes  false
        exit
    exit
exit
```

Lastly, a file within `/etc/128technology/application-modules/` to be executed by the 128T software:

```
[pt@labsystem4 application-modules]$ cd /etc/128technology/application-modules/
[pt@labsystem4 application-modules]$ ls -ltr
total 12
lrwxrwxrwx  1 root root   21 Sep  1  2018 office365.py -> defaults/office365.py
drwxr-xr-x  2 root root 4096 Jan 29 16:46 app_module_utils
drwxr-xr-x. 2 root root 4096 Jan 29 16:48 defaults
-rwxr-xr-x  1 root root 1372 Feb 26 06:35 customsvc.py
```

Here we can see the python script `customsvc.py` file, which matches the `application-name` configured in the `service` definition above. This is what creates the linkage between the service and the script.

For more information on creating your own custom `application-module`, review the documentation and browse the articles on Interchange.

## Service Policy

Each service can have a `service-policy` associated with it, to govern its behavior through various configurable attributes. This can influence the service's path selection and behavior in the event of path failures or path impairments as *administrative priorities*.

Here's a representative `service-policy`, to provide context for discussion:

```
service-policy  MPLS-DIA-LTE
    name                 MPLS-DIA-LTE
    vector               mpls
        name      mpls
        priority  5
    exit

    vector               broadband
        name      broadband
        priority  10
    exit

    vector               lte
        name      lte
        priority  15
    exit

    session-resiliency   revertible-failover
    path-quality-filter  true
    max-loss             1
    max-latency          300
    max-jitter           100
exit
```

There are three principal controls within this service-policy:

- Vectors, which are used to indicate the administrative preference for path selection.
- A session-resiliency choice, used to indicate the desired behavior in the event of path failures.
- Path quality metrics, used to indicate the tolerance for loss, latency, and jitter on a path before it is declared ineligible for selection.

### Vectors

By configuring vectors and assigning `priority` to them, an administrator can influence the path selection for egress traffic by a 128T device. Each vector has two components: a `name` and a `priority`. The `name` listed is also applied to an adjacency (though typically configured within a `neighborhood` and triggering the generation of a peer adjacency) to associate to the preferred egress path.

By way of example, here is an adjacency on the broadband interface of an example branch location:

```
config

    authority

        router  site2020
            name  site2020

            node  node1
                name              node1

                device-interface  wan
                    name               wan

                    network-interface  wan1
                        name       wan1

                        adjacency  203.0.113.2 dc1
                            ip-address             203.0.113.2
                            peer                   dc1
                            peer-connectivity      bidirectional
                            generated              true
                            inter-router-security  interrouter
                            cost                   0
                            qp-value               0
                            vector                 broadband
                        exit
                    exit
                exit
            exit
        exit
    exit
exit
```

In the configuration fragment, you can see that the broadband interface (named `wan1`) has an adjacency configured to connect to its data center (named `dc1`). This adjacency uses the vector `broadband`.

Consider the `MPLS-DIA-LTE` service-policy shown above, which lists five vectors. For services leveraging this service-policy, the adjacency with the `broadband` vector would be the second priority, behind adjacencies referencing `mpls` – since that has a lower cost (higher priority).

### Session Resiliency

As shown in the `MPLS-DIA-LTE` service-policy, the session-resiliency is set to `revertible-failover`. This policy comes into play when traffic needs to move in the event of a failure to a transport circuit (either a path failure or a path quality threshold has been crossed). After a failure to a circuit, traffic using that path will migrate to the next best circuit. When that circuit's quality is restored (the path returns to the `up` state, or the quality thresholds return to satisfactory values), `revertible-failover` *will migrate the traffic back to the preferred circuit*. Contrast this to the session-resiliency setting of `failover`, which will persist the traffic on the migrated circuit and not return it to the preferred circuit.

In general, 128 Technology recommends using the `revertible-failover` setting for long-lived session types, such as SIP registrations. By contrast, 128 Technology recommends using the `failover` setting for transient sessions (such as the audio associated with a telephone call).

:::note
The vast majority of network sessions are transient, short-lived sessions, but you can validate this during your application discovery exercises.
:::

### Path Quality Metrics

The 128T supports four path quality metrics in its service-policy, all of which establish thresholds for determining a path's eligibility for carrying traffic that references that service-policy. The metrics are:

- `max-loss`, which will indicate the maximum percentage of packet loss before a path is ineligible
- `max-latency`, which indicates the maximum latency (half of the round trip time) before a path is unsuitable
- `max-jitter`, which indicates the maximum jitter before a path is unsuitable
- `min-mos` (not part of the example configuration), which indicates the minimum Mean Opinion Score before a path is considered unsuitable

:::info
The MOS value for a given path is a composite metric, computed based on loss, latency and jitter as its factors.
:::

