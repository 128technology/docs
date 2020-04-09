---
title: 128T 4.0 Release Notes
sidebar_label: '4.0'
---

## Release 4.0.1

### Issues Fixed

- **I95-24556** Analytics log file now follows the same rotation scheme as the other log files on the system.

- **I95-24873** HTTP CONNECT method dropped when adaptive-encryption is enabled.

- **I95-25203** ZScaler plugin could cause a system fault when configured for HA.

- **I95-25205** PPPoE configured interfaces may cause the system to take longer than 5 minutes to start.

- **I95-25235** Race condition between monitoring scripts managing T1 interfaces could cause the link to be in the down state.

- **I95-25241** When logs are at DEBUG level, extensive interface flapping can cause a system fault.

- **I95-25242** Race condition with applying kernel routes could produce a FIB with the incorrect route

- **I95-25283** Receiving a packet without metadata for an established session can cause a system fault, which can happen during upgrades or path flaps.

- **I95-25292** For 128T network-interfaces with link  mtu smaller than configured  value, Path MTU discovery results in "Path MTU: unavailable"

- **I95-25327** shared-phys-address incorrectly checks against entire authority instead of the router.

- **I95-25333** Race condition in security key distribution can cause encryption failures.

- **I95-25346** Top sessions table does not update time correctly when graph is clicked.

- **I95-25352** Peering connection statistics displaying no data on topology page.

- **I95-25353** HA nodes of a Router that do not have their time synchronized will be unable to synchronize time series data.

- **I95-25356** Device and network Interface graphs are rendering as having no data when data is traversing links.

- **I95-25425** DHCP relay service defined as /32 causes traffic to be black-holed.

- **I95-25454** Forwarding interfaces are not able to come up when deployed in AWS.

- **I95-25527** Kernel route with next hops cannot resolve BGP route when there is also a kernel blackhole route.

- **I95-25535** Malformed packets can lead to a system fault due to misclassification.

- **I95-25575** 128T peers are unable to establish a connection when deployed in AWS.

- **I95-25579** DHCP HA interface unable to renew lease on newly active link when link down occurs.

- **I95-25739** Reverse path traffic could be dropped for BGP over SVR traffic when going over an internode link.

- **I95-25748** Asymmetric routing may occur if static/kernel routes are configured as the appropriate cost is not being applied to those routes.

- **I95-25813** When utilizing the Conductor as a proxy for upgrades, a Router upgrade to 4.0.0 could fail if no connection to the Internet is available.