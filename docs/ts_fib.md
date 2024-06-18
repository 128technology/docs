---
title: FIB Troubleshooting
sidebar_label: FIB Troubleshooting
---

### `show fib lookup`

Use [`show fib lookup`](cli_reference.md#show-fib-lookup) to identify the FIB entry a particular packet matches.

Enter the name of a tenant or a source-interface and source-address, as well as the destination-ip, destination-port, and protocol as options to return the FIB entry that a packet with these characteristics would match as processed by service area.

```
admin@node0.ssr1# show fib lookup tenant t0 protocol udp destination-port 1001 destination-ip 192.168.0.1
Sun 2024-05-19 19:19:43 UTC
Retrieving fib for input...

================ ====== ======= ======== ===== ========= =========== ======== ======
 IP Prefix        Port   Proto   Tenant   VRF   Service   Next Hops   Vector   Cost
================ ====== ======= ======== ===== ========= =========== ======== ======
 192.168.0.0/24      0   UDP     t0       -     f1        None        -        -

Completed in 0.01 seconds
admin@node0.ssr1#
```

### `show service-path service-name <service>`

When looking at a single FIB entry, it is sometimes unclear what action the packet will take. Is the intent to natively IP route the packet or send it over SVR? What are the available paths that might be considered for this service. In these scenarios, the command [`show service-paths service-name <service>`](cli_reference.md#show-service-path) can be very useful. After using the show fib lookup command to understand what entry will be selected, the resulting service name can be used as the input to the show service-path command.

### `show stats packet-processing lookup`

Commands under `show stats packet-processing lookup` illustrate how packets are being processed by the service area. 

[`show stats packet-processing lookup tenant-table`](cli_stats_reference.md#show-stats-packet-processing-lookup-tenant-table) `hit` or `miss` displays how many packets (which did not match an existing installed flow) came into a particular interface and either matched a configured tenant or did not match a configured tenant, respectively. 

[`show stats packet-processing lookup fib-table `](cli_stats_reference.md#show-stats-packet-processing-lookup-fib-table) `hit`, `deny`, or `miss` displays how many times a packet has resulted in a lookup of the FIB table with either a successful match (hit), no match (miss), or a policy that indicated traffic should be denied (deny).

### `show capacity`

The maximum capacity of the FIB and other tables, along with the current number of entries and percentage of utilization, can be seen using the [`show capacity`](cli_reference.md#show-capacity) command.
