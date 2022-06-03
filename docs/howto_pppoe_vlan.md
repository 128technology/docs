---
title: VLAN Support on a PPPoE Interface
sidebar_label: VLAN Support on PPPoE
---

VLAN support on a PPPoE interface is enabled by configuring the `target-interface` as `<base-eth-interface>.<vlan-id>`.  For example, if the DSL modem is connected to the Ethernet interface `eth0` on the system, and the ISP requires using VLAN tag 1 for the PPPoE connection, the `target-interface` to configure is `eth0.1`.

#### Example Configuration:

```
device-interface pppoe-dev
    name pppoe-dev
    type pppoe
    target-interface eth0.1
    pppoe
        user-name username
        password password
        authentication-protocol chap
    exit
    enabled true
    network-interface pppoe-intf
        name pppoe-intf
        source-nat true
    exit
```

:::note
PPPoE interfaces are natively Linux interfaces. The SSR uses a set of scripts (running in Linux) to manage the PPPoE interface and leverages KNI, iptable rules, and network namespace to exchange packets with the PPPoE interface.
:::

For additional information about configuring PPPoE interfaces, see [Configuring PPPoE.](howto_config_PPPoE.md)

To further illustrate the use of the PPPoE VLAN tag, the following configuration snippet shows the difference between a non-VLAN tagged interface and two tagged interfaces. 

```
device-interface pppoe-dev-1
    name pppoe-dev-1
    description "PPPoE device NOT using VLAN"
    type pppoe
    target-interface eth1
    pppoe
        user-name user1
        password password1
        authentication-protocol chap
    exit
    network-interface pppoe-intf-1
        name pppoe-intf-1
        source-nat true
    exit
exit
device-interface pppoe-dev-2
    name pppoe-dev-2
    description "PPPoE device using VLAN 0"
    type pppoe
    target-interface eth1.0
    pppoe
        user-name user2
        password password2
        authentication-protocol chap
    exit
    network-interface pppoe-intf-2
        name pppoe-intf-2
        source-nat true
    exit
exit
device-interface pppoe-dev-3
    name pppoe-dev-3
    description "PPPoE device using VLAN 100"
    type pppoe
    target-interface eth1.100
    pppoe
        user-name user3
        password password3
        authentication-protocol chap
    exit
    network-interface pppoe-intf-3
        name pppoe-intf-3
        source-nat true
    exit
exit
```

