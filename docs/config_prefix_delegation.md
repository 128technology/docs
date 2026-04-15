---
title: Prefix Delegation
sidebar_label: Prefix Delegation
---

In IPv4, clients are typically assigned private addresses on the LAN, and the router performs NAT when sending traffic out to the broader WAN network. 

In IPv6, clients use globally addressable addresses. The work of assigning addresses from a prefix is delegated to the router. For detailed information about how prefix delegation works, see [RFC3633](https://www.rfc-editor.org/rfc/rfc3633). At a high level; 

"A delegating router is provided IPv6 prefixes for delegation to requesting routers. A requesting router requests prefixes from the delegating router. The delegating router chooses prefixes, and sends them to the requesting router. The requesting router might assign a subnet from a delegated prefix to one of its interfaces, and begin sending router advertisements for the prefix on that link."

Once the router has the prefix to use, different modes can be used to assign addresses to the clients. See https://www.rfc-editor.org/rfc/rfc8415 for details.

### SSR Support for Prefix Delegation

The SSR acts as a DHCPv6 client on the WAN-side. When the router advertisement is received, the SSR uses the `M` and `O` flags in the advertisement to determine the WAN-side address, as well as the operating mode of the interface; `SLAAC`, `stateful DHCPv6`, and `stateless DHCPv6`. Alternatively, a static address could be set.
 
The corresponding LAN-side receives the delegated prefix and uses it in router-advertisements to the clients. DHCPv6 server is not supported for the LAN; only SLAAC mode is used.

### WAN Configuration

1. Set the WAN interface to use DHCPv6. Alternatively, a static address can be configured.
2. Enable prefix-delegation mode: `prefix-delegation true`.
3. Specify the group (`pd-group-1`) to associate this WAN with the corresponding LAN: `prefix-delegation-group pd-group-1`

```
device-interface wan-device
    network-interface wan
        dhcp v6
        prefix-delegation true
        prefix-delegation-group pd-group-1
```

Additional authorization configuration can be provided.

### LAN Configuration

Use the following information to set the LAN configuration.

1. Set the interface to use `dhcp v6-pd`. 
2. Specify the group corresponding to the WAN: `prefix-delegation-group pd-group-1`.
3. Set the subnet-id to send to the WAN router. This identifies the correct prefix to delegate: `prefix-delegation-subnet-id 1`.
4. Enable router-advertisement: `router-advertisement true`. This sends the prefix to the clients on the LAN side. Multiple LAN interfaces can have the same group, but must have unique subnet-ids. Only 8 bit IDs are used - 56 bits of the prefix are used for delegation.

```
device-interface lan-device
    network-interface lan
        dhcp v6-pd
        prefix-delegation-group pd-group-1
        prefix-delegation-subnet-id 1
        router-advertisement true
```

#### Debugging Commands

The following show commands can be used for debugging configuration issues.

- `show network-interface`: Display network-interface data for network-interface.

```
admin@test1.Fabric128# show network-interface
Tue 2026-02-24 21:51:34 UTC
✔ Retrieving network interfaces...

=========== ======= ========== =========== ============ ====== ============= ========== ========== ======================================== =================== ========== ======== ======
 Router      Node    Device     Name        Forwarding   VLAN   Device Type   Type       DHCP       Address                                  Gateway             Hostname   Status   GIID
=========== ======= ========== =========== ============ ====== ============= ========== ========== ======================================== =================== ========== ======== ======
 Fabric128   test1   wan-dev    wan-intf    true            0   ethernet      external   disabled   2001:db1:1:1::102/64                     2001:db1:1:1::101   --         up          1
 Fabric128   test1   lan-dev1   lan-intf1   true            0   ethernet      external   v6-pd      2001:db1:1:2002:f816:3eff:fed4:9fe2/64   --                  --         up          2
 Fabric128   test1   lan-dev2   lan-intf2   true            0   ethernet      external   v6-pd      2001:db1:1:2003:f816:3eff:fe25:53ea/64   --                  --         up          3
```

- `show dhcp mappings`: Show each DHCP mapping from an interface to mapping/IP family/config types.

```
admin@test1.Fabric128# show dhcp mappings
Tue 2026-02-24 21:54:27 UTC

================= ================== ====== ============== ================ ==========================
 Src Device Port   Dest Device Port   VLAN   Mapping Type   IP Family Type   Config Type
================= ================== ====== ============== ================ ==========================
               1                  0      0   originating    ipv6             client
               2                  0      0   originating    ipv6             prefix_delegation_server
               3                  0      0   originating    ipv6             prefix_delegation_server
```

- `show dhcp prefix-delegation`: Show the prefix learned for prefix-delegation.

```
admin@gouda.novigrad# show dhcp prefix-delegation
Wed 2020-04-22 14:47:05 UTC

========== ============ ================ ========== ============== ===============
 Router     Group Name   Interface Name   Status     Prefix         Prefix Length
========== ============ ================ ========== ============== ===============
 novigrad   pd-group-1   t128tuntap1      resolved   2001:db2:1::   56

Completed in 0.08 seconds
```

- `show dhcp v6`: Display dhcp lease info for network-interfaces.

```
admin@gouda.novigrad# show dhcp v6
Wed 2020-04-22 14:47:05 UTC

========== ======= ================== =================== ============ ================================= =============== =================================
 Router     Node    Device Interface   Network Interface   Dhcp State   Address                           Prefix Length   Gateway
========== ======= ================== =================== ============ ================================= =============== =================================
 novigrad   gouda   wan                wan-interface       Resolved     2001:db8:85a3:0:0:8a2e:370:7334   96              2001:db8:85a3:0:0:8a2e:370:7330

Completed in 0.20 seconds
```