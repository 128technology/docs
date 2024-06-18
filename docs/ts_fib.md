---
title: FIB Troubleshooting
sidebar_label: FIB Troubleshooting
---

To see what FIB entry a particular packet will match, the command show fib lookup can be used. This command will take a destination-ip, destination-port, and protocol as options along with either the name of a tenant or a source-interface and source-address and return the FIB entry that a packet with these characteristics would match as processed by service area.

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

When looking at a single FIB entry, it is sometimes unclear what action the packet will take. Is the intent to natively IP route the packet or send it over SVR? What are the available paths that might be considered for this service. In these scenarios, the command `show service-paths service-name <service>` can be very useful. After using the show fib lookup command to understand what entry will be selected, the resulting service name can be used as the input to the show service-path command.

There are also various statistics that can illustrate how packets are being processed by service area under the command tree show stats packet-processing lookup. In particular, tenant-table hit or miss will show how many packets (which did not match an existing installed flow) came into a particular interface and either matched a configured tenant or did not match a configured tenant, respectively. Additionally, fib-table hit, deny, or miss will show how many times a packet has resulted in a lookup of the FIB table with one either successful match (hit), no match (miss), or a policy that indicated traffic should be denied (deny).

The maximum capacity of the FIB and other tables, along with the current number of entries and percentage of utilization, can be seen using the show capacity command.
