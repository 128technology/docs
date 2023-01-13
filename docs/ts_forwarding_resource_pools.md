---
title: Forwarding Plane Resource Pools
sidebar_label: Forwarding Plane Resource Pools
---

Critical to "right-sizing" the SSR for a given deployment is an understanding of how the forwarding plane is configured for its resource pools.  These resource pools are used for setting up sessions, forwarding tables and packet transformations as quickly and efficiently as possible.  The resource pools are proportionately sized relative to the amount of huge pages allocated during system initialization.

```
admin@node2.burlma# show capacity
Tue 2019-08-27 15:54:50 UTC

Node: node2

===================== ========= ========== =======
 Resource              Entries   Capacity   Usage
===================== ========= ========== =======
 access-policy-table       518       2048   25.3%
 action-pool             16277     287590   5.7%
 arp-table                   3      62359   0.0%
 fib-table                1862      16340   11.4%
 flow-table               9244     127455   7.3%
 source-tenant-table        11       2048   0.5%
```

System configuration plays the largest role in consuming these resource pools.  In the event that these resources are at risk of being exhausted, an alarm will be generated for each of the resource pools should they reach 85% of their capacity.  Exhaustion of any of these tables will result in an inability for the system to operate properly.

If the system configuration is already optimized, meaning any services or tenants no longer in use are already removed, it may be time to explore migrating the SSR to a platform with more memory available. If the system has additional unused RAM, the amount of huge pages can be increased by running the initializer.

:::note
An SSR can not be running while reinitializing the system. Performing this operation should be done during a maintenance window where a service disruption will have the least amount of impact.
:::

```
systemctl stop 128T
initialize128t
```

Navigating through the initializer will present an option to increase the amount of huge pages allocated to the SSR beyond the default value.  Making a change to the huge page quantity will require a reboot of the host platform.



