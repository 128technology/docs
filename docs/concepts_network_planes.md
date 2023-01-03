---
title: Forwarding Plane Separation
sidebar_label: Forwarding Planes
---
A common concept in high-level network architecture is the notion of several distinct planes of the network: forwarding plane, control plane, and management plane. The management plane of the network is made up of the systems required to operate, administer, monitor, and maintain the network. The nodes in a management plane may include monitoring servers, data collection servers, authorized administrator PC's, and servers hosting the control plane of the network being managed.

While many clouds and data center environments enjoy the luxury of a cleanly separate network forwarding plane to connect these management plane systems, this is not common other networks such as a WAN. In these environments the management of the network must be carried out within it's own network forwarding plane. This describes a practice for SSR networks to give the management plane first-class citizenship within the forwarding plane. It describes the management plane systems as a proper network tenant having requisite services with routing, inclusive of the Linux servers hosting the control plane for SSR nodes.

## Tenancy
Every endpoint on an SSR network is given tenancy, and the endpoints that make up management plane are no exception. When network management is carried out within the forwarding plane it should be given it's own proper tenant, in order to cleanly segment it from other endpoints. For example, the following would establish a tenant called `OAM` for the authority. Endpoints anywhere in the network belonging to the management plane that will need to send sessions, such as administrator PC's, monitoring servers, and SSR node hosts, can be given `OAM` tenancy:
```
tenant             OAM
    name         OAM
    description  "Network Operations, Administration, and Management"
exit
```

## Services
There are often many services required within the management plane of a network. This includes services for things like DNS, NTP, SSH/HTTPS element management, software distribution servers, IPFIX collectors, syslog receivers, and so on. Each one of these should be modeled with proper services providing access from the management tenant.

Because every SSR node host may be the target of management sessions, each node must be given a service such as the following. For simple IP address management (IPAM) and routing, ideally contiguous blocks of addresses can be allocated for SSR hosts. In this example, we'll assume that `10.128.0.0/16` is reserved in IPAM for SSR node hosts.
```
service            mgmt-router1-node1
    name            mgmt-router1-node1
    service-group   OAM
    description     "Router node management"
    security        no-encryption
    address         10.128.0.1

    access-policy   OAM
        source  OAM
    exit
exit
```

## SSR Nodes
The Linux kernel of every SSR node in the network will be the host of inbound sessions to a management plane service, and will originate outbound sessions to other management plane services. For certain procedures, like inventory discovery, some management plane systems may use the source address of an inbound connection as a key to send outbound sessions back to the address. Because of this, sessions should be free of any source or destination NAT whenever possible.

The following configuration on an  SSR node would provide it with a host Kernel Network Interface (KNI) for attachment to the management plane. It is made the default route in the kernel route table, given management plane tenancy for outbound sessions, and set up with the Linux side of the KNI having the address corresponding to the management plane service for inbound sessions to the node. Review the [Host Services](concepts_linux_host_networking.md) configuration guide for more details.

:::note
In the SSR configuration of a host KNI, you are describing the SSR forwarding plane side of the KNI. The configuration of the address in the `gateway` setting is automatically given to the Linux side of the KNI. In other words, the service address for inbound sessions to the node should be set to the `gateway` in the address configuration for the SSR KNI.
:::
```
device-interface       mgmt-loopback
    name                  mgmt-loopback
    description           "Management plane interface"
    type                  host

    network-interface     mgmt-loopback
        name                    mgmt-loopback
        description             "Management plane interface"
        default-route           true
        tenant                  OAM

        management-vector
            priority  100
        exit

        address                 10.128.0.0
            ip-address     10.128.0.0
            prefix-length  31
            gateway        10.128.0.1
        exit
    exit
exit
```

In order to optimize address utilization, the pool of addresses which are allocated for use as SSR node management services, can be configured as KNI gateways with their `/31` complement as the SSR forwarding plane address. For example, the allocation of `10.128.0.2` - `10.128.0.3` to a set of nodes could have addresses configured like this:
- Node1 with a management service address `10.128.128.2`:
```
address            10.128.128.3
    ip-address     10.128.128.3
    prefix-length  31
    gateway        10.128.128.2
exit
```
- Node2 with management service address `10.128.128.3`:
```
address            10.128.128.2
    ip-address     10.128.128.2
    prefix-length  31
    gateway        10.128.128.3
exit
```

## Routing
Throughout the topology of SSRs, management services must be distributed using STEP and routed using Secure Vector Routing. This means that static service routes are created where the services need to egress, and dynamically routed from wherever they ingress.

For SSR node management services, this would mean that each router would be provisioned with a service route like the one below:
```
service-route         static-mgmt-router-node
    name          static-mgmt-router-node
    service-name  mgmt-router-node

    next-hop      node1 mgmt-loopback
        node-name   node1
        interface   mgmt-loopback
    exit
exit
```

Where SSRs are interconnected with other external routing domains, the service addresses for SSR node management may need to be advertised using another routing protocol such as BGP or OSPF. This ensures that they have a route for packets which are part of forward flows on sessions going to SSR node management services, and reverse flows for sessions originating from SSR host nodes.

## Summary
Simple and effective management of a network is a key to deployment success. With this practice of management built into the forwarding plane of an SSR network, management services, including the SSR node hosts themselves, can be consistently accessed with all the benefits that SSR networking provides. Network administrators, operations personnel, monitoring systems, and SSR hosts themselves are given tenancy for secure access to the services they need.
