---
title: NAT Troubleshooting
sidebar_label: NAT Troubleshooting
---

Use [`show network-interface source-nat-rules`](cli_reference.md#show-network-interface-source-nat-rules) to display source NAT rules under a given network interface. A network-interface name is required and can be issued from a conductor with targeted router and node. The rules are organized in the following columns.

#### Direction
- Ingress
	- network-interface -> dynamic-source-nat
	- network-interface -> bidirectional-nat
	- network-interface -> ingress-source-nat-pool

- Egress
	- network-interface -> source-nat
	- network-interface -> egress-source-nat-pool

#### Type:

- Dynamic 
	- network-interface -> dynamic-source-nat
	- network-interface -> source-nat

- Bidirectional
	- network-interface -> bidirectional-nat

- Shared
	- network-interface -> ingress-source-nat-pool
	- network-interface -> egress-source-nat-pool

- From: The original source ip prefix.
- To: The NAT’d source ip prefix.
- Protocol: TCP, UDP, or ICMP.

#### Dynamic Rules

For dynamic rules, the following columns are populated using information from the underlying port allocator: 

- Key: Port allocator key in the form of `2/1/<giid>/<ip><proto>`.
- State: Port allocator state, ready, standby, or recovery.
- Total Ports: Total ports configured.
- Ports In Db: Ports left in redis.
- Ports In Mem: Ports available in memory.
- Ports Released: Ports released in memory but not put back in redis.
- Ports In Use: Ports used by active sessions.



#### Summary View - Conductor

```
admin@conductor.RTR_EAST_CONDUCTOR# show network-interface source-nat-rules router RTR_EAST_COMBO node combo-east-1 name ingress-intf summary
Thu 2024-02-08 18:53:13 UTC
✔ Retrieving source NAT rules...

=========== =============== ================= ==================
 Direction   Type            From              To
=========== =============== ================= ==================
 ingress     dynamic         172.16.1.0/24     192.168.5.120/32
 ingress     dynamic         172.16.1.202/31   192.168.6.202/32
 ingress     dynamic         172.16.1.204/31   192.168.7.204/32
 ingress     dynamic         172.16.1.206/31   192.168.8.206/32
 ingress     bidirectional   172.16.1.204/30   192.168.9.200/30

Completed in 0.04 seconds

```

#### Detail View - Conductor

```
admin@conductor.RTR_EAST_CONDUCTOR# show network-interface source-nat-rules router RTR_EAST_COMBO node combo-east-1 name ingress-intf detail
Thu 2024-02-08 18:54:43 UTC
✔ Retrieving source NAT rules...

=========== =============== ================= ================== ========== ======================== ========= ============= ============= ============== ================ ==============
 Direction   Type            From              To                 Protocol   Key                      State     Total Ports   Ports In Db   Ports In Mem   Ports Released   Ports In Use
=========== =============== ================= ================== ========== ======================== ========= ============= ============= ============== ================ ==============
 ingress     dynamic         172.16.1.0/24     192.168.5.120/32   tcp        2/1/1/192.168.5.120/6    Standby         49151         48151           1000                0              0
 ingress     dynamic         172.16.1.0/24     192.168.5.120/32   udp        2/1/1/192.168.5.120/17   Standby         49151         48151            999                0              1
 ingress     dynamic         172.16.1.0/24     192.168.5.120/32   icmp       2/1/1/192.168.5.120/1    Standby         49151         48151           1000                0              0
 ingress     dynamic         172.16.1.202/31   192.168.6.202/32   tcp        2/1/1/192.168.6.202/6    Standby         49151         48151           1000                0              0
 ingress     dynamic         172.16.1.202/31   192.168.6.202/32   udp        2/1/1/192.168.6.202/17   Standby         49151         48151            998                0              2
 ingress     dynamic         172.16.1.202/31   192.168.6.202/32   icmp       2/1/1/192.168.6.202/1    Standby         49151         48151           1000                0              0
 ingress     dynamic         172.16.1.204/31   192.168.7.204/32   tcp        2/1/1/192.168.7.204/6    Standby         49151         48151           1000                0              0
 ingress     dynamic         172.16.1.204/31   192.168.7.204/32   udp        2/1/1/192.168.7.204/17   Standby         49151         48151            998                0              2
 ingress     dynamic         172.16.1.204/31   192.168.7.204/32   icmp       2/1/1/192.168.7.204/1    Standby         49151         48151           1000                0              0
 ingress     dynamic         172.16.1.206/31   192.168.8.206/32   tcp        2/1/1/192.168.8.206/6    Standby         49151         48151           1000                0              0
 ingress     dynamic         172.16.1.206/31   192.168.8.206/32   udp        2/1/1/192.168.8.206/17   Standby         49151         48151            999                0              1
 ingress     dynamic         172.16.1.206/31   192.168.8.206/32   icmp       2/1/1/192.168.8.206/1    Standby         49151         48151           1000                0              0
 ingress     bidirectional   172.16.1.204/30   192.168.9.200/30   n/a        n/a                      n/a               n/a           n/a            n/a              n/a            n/a

Completed in 0.04 seconds

```

#### Summary View - Router

```
admin@combo-east-1.RTR_EAST_COMBO# show network-interface source-nat-rules name ingress-intf
Thu 2024-02-08 18:53:24 UTC
✔ Retrieving source NAT rules...

=========== =============== ================= ==================
 Direction   Type            From              To
=========== =============== ================= ==================
 ingress     dynamic         172.16.1.0/24     192.168.5.120/32
 ingress     dynamic         172.16.1.202/31   192.168.6.202/32
 ingress     dynamic         172.16.1.204/31   192.168.7.204/32
 ingress     dynamic         172.16.1.206/31   192.168.8.206/32
 ingress     bidirectional   172.16.1.204/30   192.168.9.200/30

Completed in 0.06 seconds

```

#### Detail View - Router

```
admin@combo-east-1.RTR_EAST_COMBO# show network-interface source-nat-rules name ingress-intf detail
Thu 2024-02-08 18:54:48 UTC
✔ Retrieving source NAT rules...

=========== =============== ================= ================== ========== ======================== ========= ============= ============= ============== ================ ==============
 Direction   Type            From              To                 Protocol   Key                      State     Total Ports   Ports In Db   Ports In Mem   Ports Released   Ports In Use
=========== =============== ================= ================== ========== ======================== ========= ============= ============= ============== ================ ==============
 ingress     dynamic         172.16.1.0/24     192.168.5.120/32   tcp        2/1/1/192.168.5.120/6    Standby         49151         48151           1000                0              0
 ingress     dynamic         172.16.1.0/24     192.168.5.120/32   udp        2/1/1/192.168.5.120/17   Standby         49151         48151            999                0              1
 ingress     dynamic         172.16.1.0/24     192.168.5.120/32   icmp       2/1/1/192.168.5.120/1    Standby         49151         48151           1000                0              0
 ingress     dynamic         172.16.1.202/31   192.168.6.202/32   tcp        2/1/1/192.168.6.202/6    Standby         49151         48151           1000                0              0
 ingress     dynamic         172.16.1.202/31   192.168.6.202/32   udp        2/1/1/192.168.6.202/17   Standby         49151         48151            998                0              2
 ingress     dynamic         172.16.1.202/31   192.168.6.202/32   icmp       2/1/1/192.168.6.202/1    Standby         49151         48151           1000                0              0
 ingress     dynamic         172.16.1.204/31   192.168.7.204/32   tcp        2/1/1/192.168.7.204/6    Standby         49151         48151           1000                0              0
 ingress     dynamic         172.16.1.204/31   192.168.7.204/32   udp        2/1/1/192.168.7.204/17   Standby         49151         48151            998                0              2
 ingress     dynamic         172.16.1.204/31   192.168.7.204/32   icmp       2/1/1/192.168.7.204/1    Standby         49151         48151           1000                0              0
 ingress     dynamic         172.16.1.206/31   192.168.8.206/32   tcp        2/1/1/192.168.8.206/6    Standby         49151         48151           1000                0              0
 ingress     dynamic         172.16.1.206/31   192.168.8.206/32   udp        2/1/1/192.168.8.206/17   Standby         49151         48151            999                0              1
 ingress     dynamic         172.16.1.206/31   192.168.8.206/32   icmp       2/1/1/192.168.8.206/1    Standby         49151         48151           1000                0              0
 ingress     bidirectional   172.16.1.204/30   192.168.9.200/30   n/a        n/a                      n/a               n/a           n/a            n/a              n/a            n/a

Completed in 0.05 seconds 
```