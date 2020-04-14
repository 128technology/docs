---
title: Adding Interfaces to HA Team Interface
sidebar_label: Adding Interfaces to HA Team Interface
---
This guide provides a procedure for manually adding multiple interfaces to the HA sync team interface.

For more information regarding non-forwarding interfaces please refer to this blog: [Configuring Non Forwarding Interfaces](config_non_forwarding_ha_interfaces.md).

In order to configure the non forwarding interface used for HA sync, you must configure a non-forwarding interface of type `fabric`. The interface type of `fabric`indicates a direct link between HA peers. 128T will configure these Linux interfaces as a network team. Here is an example 128T configuration:

```
admin@T106_DUT1.Conductor (node[name=T106_DUT3])# show
name                      T106_DUT3
asset-id                  T106_DUT3
role                      combo

device-interface          30
    name               30
    type               ethernet
    pci-address        0000:00:04.0
    forwarding         false

    network-interface  intf30
        name       intf30
        global-id  3
        type       fabric

        address    172.16.1.3
            ip-address     172.16.1.3
            prefix-length  24
        exit
    exit
exit
```

And here are the corresponding interfaces created in Linux:

```
[root@t106-dut3 ~]# ifconfig team-dpdk1
team-dpdk1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.16.1.3  netmask 255.255.255.0  broadcast 172.16.1.255
        inet6 fe80::f816:3eff:fe2a:ee79  prefixlen 64  scopeid 0x20<link>
        ether fa:16:3e:2a:ee:79  txqueuelen 1000  (Ethernet)
        RX packets 20203  bytes 4480216 (4.2 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 21158  bytes 5902456 (5.6 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

[root@t106-dut3 ~]# ifconfig dpdk1
dpdk1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::f816:3eff:fe2a:ee79  prefixlen 64  scopeid 0x20<link>
        ether fa:16:3e:2a:ee:79  txqueuelen 1000  (Ethernet)
        RX packets 21444  bytes 4960484 (4.7 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 23100  bytes 6943224 (6.6 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

One limitation of the non-forwarding interfaces is that the user is only allowed to configure one non-forwarding `fabric` interface in the 128T configuration.  Therefore only one interface will exist in the teamed interface in Linux. In order to add a second interface the administrator is going to have to manually tweak some ifcfg scripts. First, navigate to the directory that contains all the ifcfg scripts:

```
[root@t106-dut3 ~]# cd /etc/sysconfig/network-scripts/

[root@t106-dut3 network-scripts]# ls
check-t1      ifcfg-team-dpdk1  ifdown-isdn    ifdown-t1        ifup-eth   ifup-plusb   ifup-Team
ifcfg-dpdk1   ifdown            ifdown-lte     ifdown-Team      ifup-ib    ifup-post    ifup-TeamPort
ifcfg-dpdk2   ifdown-bnep       ifdown-post    ifdown-TeamPort  ifup-ippp  ifup-ppp     ifup-tunnel
ifcfg-dpdk3   ifdown-eth        ifdown-ppp     ifdown-tunnel    ifup-ipv6  ifup-pppoe   ifup-wireless
ifcfg-eth0    ifdown-ib         ifdown-pppoe   ifup             ifup-isdn  ifup-routes  init.ipv6-global
ifcfg-kni254  ifdown-ippp       ifdown-routes  ifup-aliases     ifup-lte   ifup-sit     network-functions
ifcfg-lo      ifdown-ipv6       ifdown-sit     ifup-bnep        ifup-plip  ifup-t1      network-functions-ipv6
```

Examine the ifcfg script for the interface that is already a part of the network team. In this example, the interface is `ifcfg-dpdk1`. The interface `dpdk1` was used because that interface corresponds to the PCI address of the non-forwarding `fabric` interface in the 128T configuration above, in this case `0000:00:04.0`:

```
[root@t106-dut3 network-scripts]# cat ifcfg-dpdk1
BOOTPROTO=none
DEVICE=dpdk1
DEVICETYPE=TeamPort
HWADDR=fa:16:3e:2a:ee:79
ONBOOT=yes
TEAM_MASTER=team-dpdk1
TYPE=Ethernet
USERCTL=no
```

:::warning
Please ensure that you are not using an interface that is already being managed by 128T. The PCI address of this interface should not exist in the 128T configuration.
:::

This example will configure `dpdk2`, which has a PCI address of `0000:00:05.0`. The first step is to perform an `ifdown` on the interface:

```
[root@t106-dut3 network-scripts]# ifdown dpdk2
```

Now simply configure another interface's ifcfg script to match the one above, except preserve the `DEVICE` and `HWADDR` fields of the original configuration.`` 

```
[root@t106-dut3 network-scripts]# cat ifcfg-dpdk2
BOOTPROTO=none
DEVICE=dpdk2
DEVICETYPE=TeamPort
HWADDR=fa:16:3e:ad:92:c1
ONBOOT=yes
TEAM_MASTER=team-dpdk1
TYPE=Ethernet
USERCTL=no
```

We can see that the interface is still down:

```
[root@t106-dut3 network-scripts]# ifconfig
dpdk1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::f816:3eff:fe2a:ee79  prefixlen 64  scopeid 0x20<link>
        ether fa:16:3e:2a:ee:79  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 35  bytes 2760 (2.6 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

dpdk3: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::f816:3eff:fec7:52f7  prefixlen 64  scopeid 0x20<link>
        ether fa:16:3e:c7:52:f7  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 8  bytes 656 (656.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 8950
        inet 192.168.1.7  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::f816:3eff:fe60:9a72  prefixlen 64  scopeid 0x20<link>
        ether fa:16:3e:60:9a:72  txqueuelen 1000  (Ethernet)
        RX packets 74700  bytes 103933935 (99.1 MiB)
        RX errors 23  dropped 0  overruns 0  frame 23
        TX packets 10425  bytes 1263510 (1.2 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

kni254: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 169.254.127.127  netmask 255.255.255.254  broadcast 255.255.255.255
        inet6 fe80::5489:42ff:fe96:fc71  prefixlen 64  scopeid 0x20<link>
        ether 56:89:42:96:fc:71  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 16  bytes 1136 (1.1 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 258244  bytes 131164364 (125.0 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 258244  bytes 131164364 (125.0 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

Now that the second interface is configured, perform an `ifup` on the team interface, and Linux will perform an `ifup` on all interfaces on the team. The user will see `dpdk2` come up:

```
[root@t106-dut3 network-scripts]# ifup team-dpdk1

[root@t106-dut3 network-scripts]# ifconfig
dpdk1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::f816:3eff:fe2a:ee79  prefixlen 64  scopeid 0x20<link>
        ether fa:16:3e:2a:ee:79  txqueuelen 1000  (Ethernet)
        RX packets 96314  bytes 20321228 (19.3 MiB)
        RX errors 14  dropped 0  overruns 0  frame 14
        TX packets 95410  bytes 23959816 (22.8 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

dpdk2: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::f816:3eff:fe2a:ee79  prefixlen 64  scopeid 0x20<link>
        ether fa:16:3e:2a:ee:79  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 13  bytes 1142 (1.1 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

dpdk3: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::f816:3eff:fec7:52f7  prefixlen 64  scopeid 0x20<link>
        ether fa:16:3e:c7:52:f7  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 8  bytes 656 (656.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 8950
        inet 192.168.1.7  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::f816:3eff:fe60:9a72  prefixlen 64  scopeid 0x20<link>
        ether fa:16:3e:60:9a:72  txqueuelen 1000  (Ethernet)
        RX packets 74841  bytes 103948483 (99.1 MiB)
        RX errors 24  dropped 0  overruns 0  frame 24
        TX packets 10540  bytes 1279138 (1.2 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

kni254: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 169.254.127.127  netmask 255.255.255.254  broadcast 255.255.255.255
        inet6 fe80::5489:42ff:fe96:fc71  prefixlen 64  scopeid 0x20<link>
        ether 56:89:42:96:fc:71  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 16  bytes 1136 (1.1 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 261227  bytes 132791356 (126.6 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 261227  bytes 132791356 (126.6 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

team-dpdk1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.16.1.3  netmask 255.255.255.0  broadcast 172.16.1.255
        inet6 fe80::f816:3eff:fe2a:ee79  prefixlen 64  scopeid 0x20<link>
        ether fa:16:3e:2a:ee:79  txqueuelen 1000  (Ethernet)
        RX packets 392  bytes 80972 (79.0 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 373  bytes 348552 (340.3 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

Lastly, verify the Router still has connectivity to its peer node:

```
admin@T106_DUT3.Router# show system connectivity
Mon 2019-12-23 03:54:47 UTC

============ ===================== ===========
 Local Node   Remote Node           State
============ ===================== ===========
 T106_DUT3    T106_DUT1.Conductor   connected
 T106_DUT3    T106_DUT2.Conductor   connected
 T106_DUT3    T106_DUT4.Router      connected

Completed in 0.08 seconds
```