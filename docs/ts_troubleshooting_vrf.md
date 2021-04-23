---
title: Troubleshooting VRF
sidebar_label: Troubleshooting VRF
---
The `show rib vrf` command can be used to check for the presence of VRF route entries.
If expected VRF route entries are not present, the following steps may be used to troubleshoot the problem:

- The `show vrf` command will display all the VRFs that were created based on the running configuration. A missing or incorrect VRF entry is likely due to a configuration issue.

- The `show bgp summary vrf` command displays an overview of the status of the BGP VRF peering sessions. Any non-established session can then be investigated further.

- The `show network-interface` command can be used to check all interfaces associated with the VRF (via their tenant assignment). The BGP VRF peering might not be able to become established due to a down interface.

### Linux Kernel State

Any configured VRF will be present as a VRF table in the Linux kernel within the routingEngine namespace. A VRF in the kernel is represented by a pseudo interface of type “vrf”. Any network interface associated with the VRF (via its tenant) is represented by a kernel interface that is linked to the VRF pseudo interface:
```
[root@t190-dut2 ~]# ip netns exec routingEngine ip link show type vrf
4: vrfA: <NOARP,MASTER,UP,LOWER_UP> mtu 65536 qdisc noqueue state UP mode DEFAULT group default qlen 1000
    link/ether 1a:4b:90:bb:a7:e3 brd ff:ff:ff:ff:ff:ff
5: vrfB: <NOARP,MASTER,UP,LOWER_UP> mtu 65536 qdisc noqueue state UP mode DEFAULT group default qlen 1000
    link/ether 86:a7:3c:07:53:dc brd ff:ff:ff:ff:ff:ff
12: vrfC: <NOARP,MASTER,UP,LOWER_UP> mtu 65536 qdisc noqueue state UP mode DEFAULT group default qlen 1000
    link/ether 0e:25:f1:5a:c4:bd brd ff:ff:ff:ff:ff:ff

[root@t190-dut2 ~]# ip netns exec routingEngine ip link show vrf vrfA
14: g111: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel master vrfA state UNKNOWN mode DEFAULT group default qlen 1000
    link/ether ac:de:48:50:ba:73 brd ff:ff:ff:ff:ff:ff
```

In the above example, g111 is a vlan network-interface configured with a tenant that is part of vrfA. So the g111 link has the master vrfA attribute.
The kernel VRF table is the basis for connecting to the VRF BGP neighbor and enables redistribution of services into the VRF: 
```
[root@t190-dut2 ~]# ip netns exec routingEngine ip route show vrf vrfA
blackhole 10.4.0.0/16 metric 4262412864 
blackhole 10.5.0.0/16 metric 4262412864 
10.111.1.5 via 172.16.111.6 dev g111 proto 186 metric 20 
blackhole 11.1.1.1 metric 4262412864 
172.16.111.0/24 dev g111 proto kernel scope link src 172.16.111.2
```

In the above example, the three blackhole routes represent services with service-routes that are available in the VRF. These are picked up by the VRF BGP instance and re-distributed if redistribute service is configured.

The 172.16.111.0/24 entry is the connected route for the VLAN network-interface bound to the VRF. 10.111.1.5 is a route learned from the VRF BGP peer.
