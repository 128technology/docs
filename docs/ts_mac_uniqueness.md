---
title: MAC Address Uniqueness on 128T
sidebar_label: MAC Address Uniqueness
---
Each Ethernet device uses an address referred to as the Media Access Control (MAC) address that allows other devices to communicate with it at the Data Link layer. These addresses must be unique on each L2 (broadcast) domain, in order to ensure that Ethernet frames are sent to the appropriate device.

Because two devices with the same MAC on the same L2 broadcast domain are indistinguishable from one another, this is often leveraged by equipment manufaturers for the purposes of interface failover; deliberately deploying two devices with the same MAC on the same broadcast domain, and controlling which of them "owns" the interface lets adjacent devices continue to communicate with the same L2 destination when ownership changes from one piece of equipment to another.

The 128T router uses this technique for its "protected interface" failover; by assigning the same `shared-phys-address` on two interfaces spanning two nodes that comprise a router, you can have those nodes elect an active owner of the interface, and transfer ownership to the partner node in the event of a failure.

Thus, enabling this behavior only requires assigning a unique `shared-phys-address` that is shared between the two devices. Furthermore, for the reasons mentioned above, this `shared-phys-address` must be otherwise unique on its broadcast domain.

We have observed cases where broadcast domains span _much further_ than anticipated, and reusing the same `shared-phys-address` on two routers many miles apart has contributed to difficult-to-diagnose issues. In one instance, a nationwide enterprise branch location shared a common broadcast domain with anoter branch location over 12 miles away, using the same ISP.

Furthermore, data suggests that the issue may not necessarily be limited to broadcast domains; if an ISP uses shared DHCP servers that cover many broadcast domains, these may be unwilling to issue DHCP leases to two different broadcast domains if the DHCP requests share a common L2 source address. For this reason, in the remainder of the document we will refer to the problem as existing in a common "domain," which may represent either a broadcast domain or a DHCP domain.

## The Symptoms
If MAC addresses are not unique in a domain, this will lead to peculiar behavior as observed by the network admin. An interface may suddenly "lose" its IP address, and dutifully send DHCP requests to acquire a new address, but have those requests go unanswered. Then, without warning, it will suddenly spring to life and acquire an IP address.

When you see a DHCP-enabled interface that has an `<empty>` value for its address, this is a possible culprit. An example is below (output is truncated to fit the page):

```
admin@SOL2035P3A.SOL2035P3# show network-interface node all
Thu 2019-05-09 13:23:49 UTC

=========== ============ ========= ============= ========== ==================== 
 Router      Node          Device   Name          DHCP       Address
=========== ============ ========= ============= ========== ====================
 SOL2035P3   SOL2035P3A         2   ha-fabric     disabled   169.254.255.0/31
 SOL2035P3   SOL2035P3A         3   pos           disabled   10.120.135.1/25
 SOL2035P3   SOL2035P3A         3   utility       disabled   10.120.135.161/27
 SOL2035P3   SOL2035P3A         3   voice         disabled   10.120.135.193/27
 SOL2035P3   SOL2035P3A         4   DIA           v4         <empty>/32    
```

As you can see here, the DIA interface has no IP address. Capturing packets on that interface (using a `len>0` filter or equivalent) will confirm that the interface is sending DHCP requests. However, if the ISP has already issued a DHCP lease for the MAC address requesting an IP address, these requests may go unanswered.

## The Resolution
To avoid colliding MAC addresses within a domain, we must ensure each is unique. In one representative deployment, the enterprise uses four digit numbers to uniquely identify each location. Thus, we leveraged the last two octets of the `shared-phys-address` to insert this four digit identifier. For example, the branch 1234 uses the MAC address `5a:1f:2b:57:12:34`, and the branch 5678 uses the MAC address `5a:1f:2b:57:56:78`. While this does not guarantee that MAC addresses are unique within a domain (since another device could conceivably have one of those two addresses "natively"), the chances are far, far more remote.

To rectify the problem, we must change the `shared-phys-address` on both the A and B nodes in a router.

Additionally, for specific deployments where the two nodes in a router are not persistently connected to the same L2 interface at the same time, we recommend configuring Linux's MAC address on that interface to match the one that will be used by the 128T software. (This is because we have observed certain business-class DIA circuits that will only issue one IP/MAC binding at a time, and if Linux has a different MAC than 128T, the host's MAC may take a lease at the expense of 128T's MAC.)

This is done by editing the `MACADDR` field within `/etc/sysconfig/network-scripts/ifcfg-<ifname>`. Ensure this matches the MAC configured within 128T's configuration.

:::warning
This is NOT TO BE DONE for "traditional" high availability deployments where both interfaces are plugged into the same L2 broadcast domain at the same time. This is because stopping 128T on one node will cause Linux to ARP out for the MAC address, which will cause disruption to service for its counterpart that is still running.
:::
