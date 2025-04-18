---
title: Traffic Engineering Overview
sidebar_label: Traffic Engineering Overview
---
Packet loss due to congestion in networks, particularly over WAN links, is inevitable. Depending on where drops occur, it can have a major impact on perceived quality of experience. Packet loss due to exceeding transmit caps between instances of SSR should be avoided. Traffic engineering allows for scheduling traffic on egress at both the device interface and the network interface level, as well as per adjacency. 

:::note
Enabling traffic engineering will introduce a performance impact to the packet-per-second processing rate as the QoS engine works to ensure fairness of packet distribution under congestion scenarios. When used in conjunction with other traffic engineering settings (e.g., adjacency traffic engineering configured alongside device interface traffic engineering), performance may be further impacted.
:::

[**Adjacency traffic engineering**](bcp_per-adjacency_traffic_engineering.md) provides targeted traffic engineering on bandwidth restricted links between two SSR instances. When configured, the adjacent path and the `receive-cap` are automatically identified, and the rate of traffic destined for that path is limited at that cap. Traffic does not exceed the `receive-cap` associated with the adjacency, and is not dropped by the ISP.

[**Network interface traffic engineering**](config_te_net_intf.md) allows you to impose traffic limitations on all traffic egressing a specific network-interface. This configuration also applies to all associated adjacencies of the network-interface, but does not impact other traffic that is egressing the same device-interface but belongs to different network-interfaces.

[**Device interface traffic engineering**](config_dev_intf_traf_eng.md) allows control on the overall throughput of the egressing interfaces, but may not provide enough granularity for all configurations. For example, several networks segregated by VLANs on a given device-interface may have differing traffic-engineering needs. Some of these networks may remain unrestricted while others have more stringent requirements due to throughput limitations at later hops.

Each of these methods can be configured independently or in any combination. When all three variants are configured, a packet would traverse an adjacency scheduler first, followed by the network-interface, before finally going through the device-interface scheduler. 


