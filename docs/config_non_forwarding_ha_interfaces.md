---
title: Non-Forwarding HA Interfaces
sidebar_label: Non-Forwarding HA Interfaces
---

Non forwarding interfaces are used for several purposes, including HA peer node control traffic, reaching a Conductor from an SSR, reaching managed SSRs from a Conductor, management traffic and reaching the public internet.

Before we get started, it is important to understand the [terminology relating to SSR interfaces](concepts_interface_types.md)

:::important
Changing a forwarding interface to non forwarding and vice versa is not dynamically reconfigurable and requires a restart of the SSR node.
:::

A quick recap:

`External` interfaces are not used for any control traffic to the node's HA peer and the user has no limit to how many `external` interfaces they configure. A user may configure either one `fabric` or one `shared` interface per node, and that interface will be used for all HA control traffic.

## Configuring Non-Forwarding HA Interfaces

This example will configure an interface to be used to establish connectivity between HA peers. To configure a non-forwarding interface, set the `forwarding` flag to `false`. This example uses a `device-interface` set to type `ethernet`.

```
node    T116_DUT1
    name                      T116_DUT1

    device-interface          control
        name               control
        type               ethernet
        pci-address        0000:00:04.0
        forwarding         false
```


The next step is to add a `network-interface`. Start by creating a `fabric` interface to reach the HA peer node.  `fabric` was chosen in this situation because the HA nodes are directly connected:

```
node    T127_DUT1
    name                      T127_DUT1

    device-interface          control
        name               control
        type               ethernet
        pci-address        0000:00:04.0
        forwarding         false

        network-interface  peer-fabric-intf
            name       peer-fabric-intf
            type       fabric

            address    172.16.1.1
                ip-address     172.16.1.1
                prefix-length  24
                gateway        172.16.1.201
            exit
        exit
    exit
exit
```


This interface is needed to establish connectivity to the HA peer node. A similar `fabric` interface is required on each node of the HA pair.

```
node    T127_DUT2
    name                      T127_DUT2

    device-interface          control
        name               control
        type               ethernet
        pci-address        0000:00:04.0
        forwarding         false

        network-interface  peer-fabric-intf
            name       peer-fabric-intf
            type       fabric

            address    172.16.1.2
                ip-address     172.16.1.2
                prefix-length  24
                gateway        172.16.1.201
            exit
        exit
    exit
exit
```


At this point, it may be a good time to commit the configuration.

The interfaces created within the SSR configuration will manage corresponding interfaces in Linux. The SSR will dynamically update all SSH tunnels which are used to send control traffic to the peer node.

```
eth1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::f816:3eff:fe4c:5ebe  prefixlen 64  scopeid 0x20<link>
        ether fa:16:3e:4c:5e:be  txqueuelen 1000  (Ethernet)
        RX packets 5581689  bytes 1057148542 (1008.1 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 5818989  bytes 1002306918 (955.8 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

team-eth1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.16.1.1  netmask 255.255.255.0  broadcast 172.16.1.255
        inet6 fe80::f816:3eff:fe4c:5ebe  prefixlen 64  scopeid 0x20<link>
        ether fa:16:3e:4c:5e:be  txqueuelen 1000  (Ethernet)
        RX packets 5544219  bytes 977056448 (931.7 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 5777931  bytes 979222766 (933.8 MiB)
        TX errors 0  dropped 2 overruns 0  carrier 0  collisions 0
```

:::note
The first time a non-forwarding interface is configured and SSR "takes over" the Linux interfaces, a backup of all the previous ifcfg scripts will be created at `/var/run/128technology/network-script-backups.tar.gz`.
:::

Notice the interfaces are configured as network team because the type was set to `fabric`. If instead the type was set to `shared` then interface `eth1` would have been configured directly with the static IP address.

:::info
Upon committing configuration changing the control IP addresses, it can take up to **two minutes** for the node to reconnect internally or reconnect to its HA peer node. This delay happens because SSR is waiting for the TCP state machine to close existing connections.  Don't panic.  Just sit tight and wait for everything to reconnect.
:::

While this example showcases peering with a HA node on a conductor, the configuration and operations are identical for a router.

Run `show system connectivity` to ensure that both nodes are connected.
```
admin@T127_DUT1.Conductor# show system connectivity
Wed 2019-02-13 16:09:06 UTC

===================== ===================== ==============
 Local Node            Remote Node           State
===================== ===================== ==============
 T127_DUT1.Conductor   T127_DUT2.Conductor   connected

Completed in 0.11 seconds
```

Run `show system connectivity internal` to confirm that the internal processes are communicating with each other.
```
admin@T127_DUT1.Conductor# show system connectivity internal
Wed 2019-02-13 16:09:30 UTC

===================== ===================== ================= ================= ===========
 Local Node            Remote Node           Service           Address           Message
===================== ===================== ================= ================= ===========
 T127_DUT1.Conductor   T127_DUT1.Conductor   Zookeeper         127.0.0.1:4370    Connected
 T127_DUT1.Conductor   T127_DUT1.Conductor   ssc               127.0.0.2:12222   Connected
 T127_DUT1.Conductor   T127_DUT1.Conductor   step-repository   127.0.0.2:15555   Connected
 T127_DUT1.Conductor   T127_DUT2.Conductor   Internal SSH      127.0.0.1:932     Connected
 T127_DUT1.Conductor   T127_DUT2.Conductor   LeaderElect       127.0.0.1:2225    Connected
 T127_DUT1.Conductor   T127_DUT2.Conductor   Quorum            127.0.0.1:2224    Connected
 T127_DUT1.Conductor   T127_DUT2.Conductor   ZED               127.0.0.1:4392    Connected
 T127_DUT1.Conductor   T127_DUT2.Conductor   Zookeeper         127.0.0.1:4371    Connected
 T127_DUT1.Conductor   T127_DUT2.Conductor   influx-rpc        127.0.0.3:8088    Connected
 T127_DUT1.Conductor   T127_DUT2.Conductor   ssc               127.0.0.3:12222   Connected
 T127_DUT1.Conductor   T127_DUT2.Conductor   step-repository   127.0.0.3:15555   Connected
 T127_DUT1.Conductor   T127_DUT2.Conductor   tank              127.0.0.3:11011   Connected
```

Now that connectivity has been fully established between HA peer nodes, it is useful to configure some external management interfaces. This example will create an `external` Ethernet interface using `DHCPv4`.

```
device-interface          mgmt
    name               mgmt
    type               ethernet
    pci-address        0000:00:03.0
    forwarding         false

    network-interface  ext-mgmt-intf
        name               ext-mgmt-intf
        type               external
        default-route      true

        management-vector
            name      ext-mgmt-vector
            priority  100
        exit
        dhcp               v4
    exit
exit
```

Notice that some additional fields were configured. The `default-route` is set to `true`.  This instructs Linux to set this external interface as the default route for all traffic. Secondly, a `management-vector` was configured.  This is required when setting the `default-route` to `true`. The user is allowed to define multiple interfaces as the `default-route`, so the `management-vector` is used to define the priority of all interfaces which are set as the default route.

:::note
If you configure the interface that is currently being used to connect to SSR as an `external` interface, you will notice your connection hang for a few moments while SSR takes over the interface after the config is committed. Once the commit is complete you will notice the interface's ifcfg script has been updated:
:::

```
[root@t127-dut1 ~]# cat /etc/sysconfig/network-scripts/ifcfg-eth0
BOOTPROTO=dhcp
DEFROUTE=yes
DEVICE=eth0
METRIC=100
MTU=1500
NM_CONTROLLED=no
ONBOOT=yes
TYPE=Ethernet
USERCTL=no
```

The goal of this functionality is to eliminate the need for administrators to have to drop to the Linux shell to manually configure interfaces. A configuration field name `ifcfg-option` was added to the `network-interface` to allow super users to add any config field directly to an ifcfg script that SSR currently does not support. SSR does validate that the user is not trying to configure any options that SSR already configures to avoid creating conflicts with SSR settings. An example is firewalld zones.  Perhaps this external interface needs to be configured as a trusted interface.

```
network-interface  ext-mgmt-intf
    name               ext-mgmt-intf
    global-id          5
    type               external
    default-route      true

    management-vector
        name      ext-mgmt-vector
        priority  100
    exit
    dhcp               v4

    ifcfg-option       ZONE
        name   ZONE
        value  trusted
    exit
exit
```

Upon committing this configuration you will see the ifcfg script get updated with the new value.

```
[root@t127-dut1 ~]# cat /etc/sysconfig/network-scripts/ifcfg-eth0
BOOTPROTO=dhcp
DEFROUTE=yes
DEVICE=eth0
METRIC=100
MTU=1500
NM_CONTROLLED=no
ONBOOT=yes
TYPE=Ethernet
USERCTL=no
ZONE=trusted
```

## HA Sync Redundancy

Within an HA router, the communication that occurs on the HA sync connection is vital to proper operation of the router. In many ways this communication channel is similar to the backplane of a chassis-based router, despite the fact that it is provided through an Ethernet connection. Due to the importance of this connection to proper functionality, customers often wish to provide redundant connections for this traffic in case of cable or interface failure.

Beginning with version 7.2.0, HA Sync Redundancy allows you to configure a non-forwarding `bond` device interface for the HA control traffic interface. Grouping this bond interface with multiple ethernet device interfaces provides the solution for this desired connection redundancy.

### Configure HA Sync Redundancy

Use the following steps to configure HA sync redundancy.

1. On the Configuration page, under Routers, select the router.

    ![Routers](/img/nfi-ha-sync-config1.png)

2. Scroll down and select the Node.

    ![Select the Node](/img/nfi-ha-sync-config1a.png)

Under Device Interfaces, select your non-forwarding HA control interface. 

    ![Device Interface](/img/nfi-ha-sync-config2.png)

3. Make note of the PCI Address used.

    ![Device Interface Type Settings](/img/nfi-ha-sync-config3.png)

4. Change the HA control Device Interface Type from type ethernet to type `bond`.

    ![Change to Bond](/img/nfi-ha-sync-config4.png)

#### Add New Non-Forwarding Device Interfaces

1. Next to the Device Interface heading, select ADD.

    ![New Device Interface](/img/nfi-ha-sync-config5.png)

2. Provide a name for the device interface and click **SAVE**.

    ![Device name](/img/nfi-ha-sync-config5a.png)

3. Configure the following:

    - Device type `ethernet` 
    - Use the PCI address noted from step 1
    - Select the bond interface from step 2 as the Parent Bond for this interface

    ![Control-1 device interface](/img/nfi-ha-sync-config6.png)


4. Return to the Device Interface level and add another new Non-Fowarding Device Interface to be the redundant interface.

5. Next to the Device Interface heading, select ADD.

    ![New Device Interface](/img/nfi-ha-sync-config5.png)

6. Provide a name for the device interface and click **SAVE**.

7. Configure the device Type ethernet, using an available PCI address, and
select the bond interface from step 2 as the Parent Bond for this interface.

    ![Control-2 device interface](/img/nfi-ha-sync-config7.png)

8. Click **Validate** and **Commit**.

:::important
It is highly recommended to perform these steps for each node of the HA pair.
:::

For additional information about bond interfaces, see [Configuring LAG and LACP](config_lacp.md#configuring-lag-and-lacp). For command information, see [parent-bond](config_command_guide.md#configure-authority-router-node-device-interface-parent-bond).
