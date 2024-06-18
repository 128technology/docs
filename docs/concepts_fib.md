---
title: Forwarding Information Base (FIB) - Concepts
sidebar_label: FIB Concepts
---

The SSR is a session-based router, and makes forwarding decisions based on the first packet of a flow. All subsequent packets follow the same path through the SSR fabric as the first packet, except when network events dictate that a session must be reevaluated to allow the packets to follow a different path. These decisions are made by the **service area** code of the highway process. This code consults a table known as the Forwarding Information Base (FIB) to make these decisions. 

To minimize delay when forwarding packets, this table requires a fast lookup. To optimize memory usage for the FIB table and other tables used in packet forwarding operations, a portion of the system RAM is set aside as Linux hugepages. Hugepages are allocated and reserved for the FIB tables at system boot time. The amount of memory allocated to hugepages and the number of entries for each table are automatically calculated during initialization of the SSR software based on the amount of RAM present. It is possible to dedicate more system memory to hugepages and to change the number of entries available for each table. However, because doing so will reduce the RAM available for other OS processes, this change should only be carried out at the direction of SSR support.

## What is a FIB Entry?

A FIB entry consists of several key values used as a lookup to determine how to apply policy for a new session. The **values** used as lookup parameters are: IP prefix, protocol, port number, and tenant. The **results** of a FIB entry lookup are the service, next-hops, vector, and cost. An example of a single FIB entry is shown below.

```
==================== =========== ======= ========== ===== ========================= ============= ======== ======
 IP Prefix                 Port   Proto   Tenant     VRF   Service                   Next Hops     Vector   Cost
==================== =========== ======= ========== ===== ========================= ============= ======== ======
10.1.1.0/24                  0   None    t0         -     s0                        192.168.1.2   -        0

```

### How FIB Lookups Are Made

When a packet arrives at the SSR, regardless of whether the packet arrives over SVR or is natively routed to an interface, the packet is first classified as belonging to a **tenant**. The tenant is part of the lookup key for the FIB. If there is no tenant match for the packet (either due to lack of an explicitly configured tenant on an interface, or due to a source address not matching a configured tenant-prefix mapping), the packet is classified as belonging to the `<global>` tenant. When matching a packet of a new session to the FIB table, only FIB entries for the classified tenant are considered.

:::note
A note on the `<global>` tenant: FIB entries for the `<global>` tenant are only generated for services who have the `scope` configuration option set to `public`. This is roughly equivalent to creating an access-policy for the `<global>` tenant. This does not automatically allow traffic for all tenants. If traffic classified as originating from another tenant needs to access a service, an access-policy for that tenant must also be configured on the service.
:::

Once the tenant has been identified, the transport protocol and destination port of the packet are used as keys to lookup the best FIB entry match for the tenant. FIB entries that only specify a transport protocol without specific destination ports - shown as port zero (0) in the FIB - will match any destination port of a packet. Entries with a port of zero are treated as less specific than entries that contain an explicit port range. From the more specific entries (those with a configured port range) that match the destination port of the packet, the destination address is used in a **longest prefix match** (LPM) comparison. The most specific prefix that matches the destination address will be the selected entry. If there are no port-range specific entries that match the destination port of the packet, or if there is no valid prefix match, FIB entries with the transport protocol (but no configured port-range) of the packet will then be considered for an LPM comparison. If there are no entries with the destination protocol of the packet, or if none match the destination address of the packet in an LPM lookup, then entries that do not specify a protocol will be considered for an LPM lookup. If there is no match at this point, then a FIB miss is declared, and the session is not installed in the session table and no packets for the session will be forwarded.

The order of precedence for FIB lookup is as follows:
1.	FIB entry matches IP prefix, transport protocol, and destination port with a configured port range.
2.	FIB entry matches IP prefix and transport protocol.
3.	FIB entry matches IP prefix.

### Results of FIB lookups

A FIB lookup either returns no match, or exactly one matching entry. For a session to be installed and traffic to be forwarded, the FIB must contain at least one next-hop. A valid next-hop may be a specific egress-interface, a next-hop gateway address, or an adjacency address for SVR traffic. There may be multiple next-hops for a single FIB entry. When looking at the FIB, the multiple next-hops may appear to be distinct FIB entries, but that is merely the way the FIB is displayed to the user. In the example below, Service s0 has two entries for the 10.0.0.0/8 prefix – one for tenant t0 and one for tenant t1. This service is configured with a service-route with two next-hops, one out interface wan1 and one out interface wan2.

```
==================== =========== ======= ========== ===== ========================= ============= ======== ======
 IP Prefix                 Port   Proto   Tenant     VRF   Service                   Next Hops     Vector   Cost
==================== =========== ======= ========== ===== ========================= ============= ======== ======
 10.0.0.0/8                   0   None    t0         -     s0                        1-2.0         wan1     10
                                                                                     1-3.0         wan2     100
                                          t1         -     s0                        1-2.0         wan1     10
                                                                                     1-3.0         wan2     100

```

From looking at the above output, it may appear that there are four entries. However, **additional next-hops do not create additional FIB entries**. The above output is considered to be two entries. If there are multiple next-hops available for the selected FIB entry, then the service-policy associated with the service of the matching FIB entry aids in selecting which one is used. This is typically based on vector priority, or traffic may be balanced across multiple paths with equal cost by the SSR’s internal load balancer.
