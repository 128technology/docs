---
title: Interface Types
sidebar_label: Interface Types
---

**Forwarding:** An interface used to pass session traffic.

**Non Forwarding:** An interface that is not used to pass session traffic and used for management or conductor-specific traffic.

**Non forwarding `external` interface**: An interface that is externally facing such as a management interface or an interface used to reach the conductor. There is no limit to the number of `external` interfaces that a user can configure per node. External interfaces can be Ethernet, LTE, PPPoE or T1 devices. They can also be configured with static IP addresses or to use DHCP.

**Non forwarding `fabric` interface**: An interface that is used to connect directly to the node's HA peer. Since a direct connection from one box to the other is assumed in this case, the interface is configured in Linux as a network team. The network team configuration ensures that if a node's HA peer is rebooted that the node's interface does not get a link down event and the IP address does not disappear from Linux, which causes internal connectivity issues within the node itself. The user may configure one `fabric` or `shared` interface per node, and that interface is used for all HA control traffic. The `fabric` interface must be an Ethernet interface with exactly one address.

**Non forwarding `shared` interface**: A combination of an `external` and `fabric` interface. A `shared` interface serves all the same purposes as an `external` interface while also providing connectivity to the HA peer. A `shared` interface is not directly connected to the HA peer so it is not configured as a Linux network team. The user may configure one fabric or shared interface per node, and that interface is used for all HA control traffic. The `shared` interface must be an Ethernet interface with exactly one address.