---
title: GRE Plugin
sidebar_label: GRE
---

The 128T GRE plugin can be used for creating IPv4 GRE tunnels between a 128T router and a remote GRE tunnel destination. For services such as Zscaler, this provides better throughput compared to other tunneling mechanisms.

:::note
The instructions for installing and managing the plugin can be found [here](plugin_intro.md#installation-and-management).
:::

## Configuration
The GRE plugin can be configured on an individual router. In order to configure the tunnel, it is important to collect the following information up-front:
- Remote tunnel information
- Ingress traffic to be sent through the tunnel
- WAN interfaces to be used for sending the tunnel traffic

### Remote GRE tunnel information

#### Tunnel information
First and foremost, it is important to identify the address and other probe parameter for the remote GRE endpoints.

```
admin@node1.conductor1# show config running authority router router1 gre

config

    authority

        router  router1
            name  router1

            gre
                enabled       true

                destination   pri-tunnel
                    name  pri-tunnel
                    host  192.168.20.13
                exit

                destination   sec-tunnel
                    name  sec-tunnel
                    host  192.168.30.14

                    icmp-keep-alive
                        link-test-interval  10
                        number-of-retries   5
                        retry-interval      5
                    exit
                exit

                enabled-node  node1
                    node-name    node1
                    tenant       _internal_
                    destination  pri-tunnel
                    destination  sec-tunnel
                exit
            exit
        exit
    exit
exit

admin@node1.conductor1#
```

In the above example, you will notice there are two tunnels configured on the router. Each `destination` represents a single tunnel interface and allows the user to configure an IPv4 address for the destination. The `enabled-node` configuration allows the user to control which 128T router node will be operating which tunnel. In addition the `enabled-node > tenant` can be used to apply a specific tenant for the GRE tunnel traffic. For each destination on each enabled-node, the 128T router creates a unique KNI interface and the configured tenant is applied to this interface.

### Tunnel ICMP health check parameters
The GRE tunnels do not have an inherent mechanism to detect the availability of remote peers.  As a result, the GRE plugin allows the user to configure ICMP probes to the destination. The configuration is enabled by default with the following settings:

```
icmp-keep-alive
    link-test-interval  10
    number-of-retries   5
    retry-interval      5
exit
```
:::note
The time interval for the attributes are in seconds.
:::

Every `link-test-interval` an icmp check is performed to determine the availability of the remote tunnel peer. For an unresponsive peer, a total of `number-of-retries + 1` icmp ping attempts will be made within the `retry-interval`. If the peer does not respond to any of these ping attempts, then its considered as down. In the above config, assuming an unresponsive peer, first ping is sent at 10 seconds, followed by 5 more pings at 1 second interval each. In total taking the system about 15 seconds and 6 pings to detect a peer as down. Once a peer is considered down, the next attempt to detect the tunnel liveliness is made after 10 seconds (or the `link-test-interval`).

In the above example, the two tunnels `pri-tunnel` and `sec-tunnel` create two additional KNI interfaces called `gre-0` and `gre-1` respectively. When a tunnel is determined to be non-responsive, the corresponding `gre-x` interface is brought down. For example, in the above config, when the `pri-tunnel` goes down, the corresponding `gre-0` interface is brought down as well. This allows for traffic to fail over to a secondary tunnel if available. More details on this will be explained later in the document.

#### ICMP health check to private address

##### Version History

| Release      | Modification                                    |
| ------------ | ----------------------------------------------- |
| 1.1.0, 2.1.0 | `icmp-keep-alive > address-type` was introduced |

Some GRE tunnel providers require the endpoint to ping an internal private address to detect the tunnel liveliness. The `icmp-keep-alive > address-type` can be used to configure a private address for keep-alive detection. Consider the following example:

```console
gre
    enabled         true
    plugin-network  192.168.10.0/28

    destination     pri-tunnel
        name             pri-tunnel
        host             192.168.20.13

        icmp-keep-alive
            address-type  custom
            address       192.168.10.13
        exit
    exit
exit
```

In the above configuration, the `address-type > custom` is used to set a private icmp-address of `192.168.10.13`. In doing so, the icmp-health check algorithm described [above](#tunnelicmp_health_check_parameters) will be run on the private address of `192.168.10.13` instead of the default `destination > host`. The behavior in terms of declaring the tunnel as down and continuous monitoring remains the same.

:::important
When using a private ICMP address, its important to also use an in-subnet address for the generated KNIs. This can be accomplished by configuring the appropriate `plugin-network` as illustrated in the example above.
:::

### 128T services to transport over the tunnel
Next step is to identify the the prefix or the subnet to be transported over the tunnel. In some cases, it might be desirable to transport all internet traffic through the tunnel, so the prefix could be as simple as 0.0.0.0/0. This can be done by capturing the prefix in a 128T service and setting the next-hop as the `gre-x` interfaces. As noted in the [previous section](#tunnelicmp_health_check_parameters), each destination on a given node corresponds to a `gre-x` inteface. By configuring the next-hop as the appropriate GRE interfaces, it allows the incoming traffic to be service-function chained to a GRE tunnel towards a WAN interface.

```
admin@node1.conductor1# show config running authority service lan-svc

config

    authority

        service  lan-svc
            name           lan-svc
            address        192.168.10.0/24

            access-policy  lan
                source  lan
            exit
        exit
    exit
exit
```
```
admin@node1.conductor1# show config running authority router router1 service-route lan-svc-rte-primary

config

    authority

        router  router1
            name           router1

            service-route  lan-svc-rte-primary
                name          lan-svc-rte-primary
                service-name  lan-svc

                next-hop      node1 gre-0-intf
                    node-name   node1
                    interface   gre-0-intf
                    gateway-ip  169.254.132.10
                exit
            exit
        exit
    exit
exit
```
```
admin@node1.conductor1# show config running authority router router1 service-route lan-svc-rte-secondary

config

    authority

        router  router1
            name           router1

            service-route  lan-svc-rte-secondary
                name          lan-svc-rte-secondary
                service-name  lan-svc

                next-hop      node1 gre-1-intf
                    node-name   node1
                    interface   gre-1-intf
                    gateway-ip  169.254.132.14
                exit
            exit
        exit
    exit
exit
```

In the example above, all the `lan` tenant traffic in the `192.168.10.0/24` subnet will be sent to the `gre-0` and `gre-1` network interfaces. These `gre-x-intf` are auto generated by the conductor and correspond to the configured destination. In the above config, when the `gre-0` interface will be used as primary target for lan subnet while that tunnel is up. If the `pri-tunnel` goes down, all new sessions will automatically be routed to the `sec-tunnel` via the `gre-1` interface.

### WAN interfaces for sending the tunnel packets
Another piece of configuration that is auto-generated is the service corresponding to the two configured tunnels. In the above example, the two tunnels `pri-tunnel` and `sec-tunnel` will trigger two auto-generated services, one for each of the destination. The generated service will look something like this:

```
admin@node1.conductor1# show config running authority service gre_router1__internal__0

config

    authority

        service  gre_router1__internal__0
            name                  gre_router1__internal__0

            applies-to            router
                type         router
                router-name  router1
            exit

            transport             gre
                protocol  gre
            exit

            transport             icmp
                protocol  icmp
            exit
            address               192.168.20.13

            access-policy         _internal_
                source      _internal_
                permission  allow
            exit
            share-service-routes  false
        exit
    exit
exit
```
```
admin@node1.conductor1# show config running authority service gre_router1__internal__1

config

    authority

        service  gre_router1__internal__1
            name                  gre_router1__internal__1

            applies-to            router
                type         router
                router-name  router1
            exit

            transport             gre
                protocol  gre
            exit

            transport             icmp
                protocol  icmp
            exit
            address               192.168.30.14

            access-policy         _internal_
                source      _internal_
                permission  allow
            exit
            share-service-routes  false
        exit
    exit
exit
```

The next step, is to configure the service-routes or other routing configuration for these generated services. Typically, such routes are directed towards the WAN interface and user has full control over how & where this traffic can be routed.

```
admin@node1.conductor1# show config running authority router router1 service-route pri_tunnel_rte

config

    authority

        router  router1
            name           router1

            service-route  pri_tunnel_rte
                name          pri_tunnel_rte
                service-name  gre_router1__internal__0

                next-hop      node1 dpdk2-wan1-intf
                    node-name        node1
                    interface        dpdk2-wan1-intf
                    source-nat-pool  gre-dpdk2-nat-pool
                exit
            exit
        exit
    exit
exit
```
```
admin@node1.conductor1# show config running authority router router1 service-route sec_tunnel_rte

config

    authority

        router  router1
            name           router1

            service-route  sec_tunnel_rte
                name          sec_tunnel_rte
                service-name  gre_router1__internal__1

                next-hop      node1 dpdk3-wan2-intf
                    node-name        node1
                    interface        dpdk3-wan2-intf
                    source-nat-pool  gre-dpdk3-nat-pool
                exit
            exit
        exit
    exit
exit
```

#### Static Source NAT considerations
:::note
This section can be skipped for WAN interface types of PPPoE and LTE
:::

Please note that the `next-hop` is making use of a `shared-nat-pool` called `gre-dpdk2-nat-pool` for example. This nat-pool is necessary for performing a source nat of the GRE tunnel traffic depending on which egress interface are being used.

:::note
The `network-interface > source-nat` flag does not support GRE, hence the `shared-nat-pool` is required.
:::

The sample `shared-nat-pool` configuration is as follows:

```
admin@node1.conductor1# show config running authority router router1 nat-pool gre-dpdk2-nat-pool

config

    authority

        router  router1
            name      router1

            nat-pool  gre-dpdk2-nat-pool
                name          gre-dpdk2-nat-pool

                address-pool  192.168.20.12/32
                    address      192.168.20.12/32
                    tenant-name  _internal_
                exit
            exit
        exit
    exit
exit
```
```
admin@node1.conductor1# show config running authority router router1 nat-pool gre-dpdk3-nat-pool

config

    authority

        router  router1
            name      router1

            nat-pool  gre-dpdk3-nat-pool
                name          gre-dpdk3-nat-pool

                address-pool  192.168.30.12/32
                    address      192.168.30.12/32
                    tenant-name  _internal_
                exit
            exit
        exit
    exit
exit
```

### Other configuration

#### MSS Clamping
##### Version History

| Release      | Modification                   |
| ------------ | ------------------------------ |
| 1.1.0, 2.1.0 | `enforced-mss` was introduced  |

The TCP MSS (maximum segment size) is the amount of data that the interface is willing to accept in a single TCP segment. This option is negotiated by the client and server based on their local environments. However, tunneling adds extra overhead in terms of packet bytes so its important to be able to adjust the MSS (maximum segment-size) for TCP connections by the routers. By default, the `enforced-mss` is set to be `path-mtu` which allows us to automatically adjust the MSS based on the MTU of the tunnel interface. In addition, user can override the value to a static number as shown in the example below.

```console
gre
    enabled         true
    plugin-network  192.168.10.0/28

    destination     dut3-tunnel
        name             dut3-tunnel
        host             192.168.20.13
        enforced-mss     1300
    exit
exit
```

## Debugging & Troubleshooting

### Config Generation
When the plugin is installed on the conductor, each commit triggers two scripts called `generate_confguration` and `generate_pillar` to auto-generate KNI, services etc and to generate pillar data for each router. Please check the following locations for debugging information.

- Logs for the config and pillar generation for each commit can be found here
```
/var/log/128technology/plugins/gre-generate-config.log
/var/lib/128technology/plugins/pillar/gre/<router>.sls
```

### GRE Tunnel not working on the router
When the config and pillar data are successfully generated, a `t128-setup-gre` RPM is installed on the router itself. As part of this process, a script called `handle_gre_config` is executed which will create all the necessary config etc on the running system.

- Logs for the config generation on the router can be found here
```
/var/log/128technology/plugins/gre-handle-config.log
```

- Debugging the runtime status of the GRE tunnels can be done by monitoring the journal for the following tags
```
journalctl -t /monitoring_script.par -t /init.par
```

- For debugging the linux network namespace, here are some of the common commands along with the relevant output of how a healthy system would look like

**ip netns pri-tunnel ip addr**

```
# ip netns pri-tunnel ip addr
...

4: pri-tunnel-t0@NONE: <POINTOPOINT,NOARP,UP,LOWER_UP> mtu 1476 qdisc noqueue state UNKNOWN group default qlen 1000
    link/gre 169.254.132.2 peer 192.168.20.13
    inet6 fe80::5efe:a9fe:8402/64 scope link
       valid_lft forever preferred_lft forever
108: pri-tunnel: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether ca:9f:53:9a:de:c2 brd ff:ff:ff:ff:ff:ff
    inet 169.254.132.2/30 brd 169.254.132.3 scope global pri-tunnel
       valid_lft forever preferred_lft forever
    inet6 fe80::c89f:53ff:fe9a:dec2/64 scope link
       valid_lft forever preferred_lft forever
110: gre-0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 9e:20:89:e4:49:3f brd ff:ff:ff:ff:ff:ff
    inet 169.254.132.10/30 brd 169.254.132.11 scope global gre-0
       valid_lft forever preferred_lft forever
    inet6 fe80::9c20:89ff:fee4:493f/64 scope link
       valid_lft forever preferred_lft forever
```

** ip netns pri-tunnel ip route show table all **

```
# ip netns pri-tunnel ip route show table all
default via 169.254.132.9 dev gre-0 table 128
default dev pri-tunnel-t0 scope link
192.168.20.13 via 169.254.132.1 dev pri-tunnel
169.254.0.0/16 dev pri-tunnel scope link metric 1108
169.254.0.0/16 dev gre-0 scope link metric 1110
169.254.132.0/30 dev pri-tunnel proto kernel scope link src 169.254.132.2
169.254.132.8/30 dev gre-0 proto kernel scope link src 169.254.132.10
```

** ip netns pri-tunnel ip rule list **
```
# ip netns pri-tunnel ip rule list
0:      from all lookup local
32765:  from all iif pri-tunnel-t0 lookup 128
32766:  from all lookup main
32767:  from all lookup default
```

** ip netns exec pri-tunnel iptables -nvL **

```
# ip netns exec pri-tunnel iptables -nvL
Chain INPUT (policy ACCEPT 13167 packets, 474K bytes)
 pkts bytes target     prot opt in     out     source               destination

Chain FORWARD (policy ACCEPT 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination
    0     0 TCPMSS     tcp  --  pri-tunnel-t0 *       0.0.0.0/0            0.0.0.0/0            tcp flags:0x06/0x02 TCPMSS clamp to PMTU

Chain OUTPUT (policy ACCEPT 14014 packets, 505K bytes)
 pkts bytes target     prot opt in     out     source               destination
```

### Tunnel operation
The status of the tunnel and other data is available via the auto generated tunnel interfaces. Here's an example:

```
admin@node1.conductor1# show device-interface router router1 name pri-tunnel
Tue 2020-03-24 03:22:37 UTC

===========================================
 node1.router1:pri-tunnel
===========================================
 Type:                host
 Forwarding:          true
 Mode:                host
 MAC Address:         ea:a6:fe:1c:3d:70

 Admin Status:        up
 Operational Status:  up
 Redundancy Status:   non-redundant
 Speed:               1000

 in-octets:                     6243918
 in-unicast-pkts:                104054
 in-errors:                           0
 out-octets:                    4691030
 out-unicast-pkts:               100393
 out-errors:                          0

 GRE::
   icmp-probe-status:
     attempts:        45008
     elapsed:         0.006435333052650094
     last_attempt:    1585020151.1222534
     status:          up
   stats:
     RX errors::
       crc:           0
       fifo:          0
       frame:         0
       length:        0
       missed:        0
     RX::
       bytes:         380
       dropped:       0
       errors:        0
       mcast:         0
       overrun:       0
       packets:       7
     TX errors::
       aborted:       0
       fifo:          0
       heartbeat:     0
       transns:       0
       window:        0
     TX::
       bytes:         692
       carrier:       106
       collsns:       4
       dropped:       0
       errors:        110
       packets:       11

Completed in 0.07 seconds
```

In addition, a `ping-monitor` service is started for each configured tunnel, the `systemctl status ping-monitor-namespace@<tunnel-name>` can be used to query the status of the ping service.

## Release Notes

### Release 3.0.0

#### Issues Fixed

- **PLUGIN-768** Support the GRE plugin in 128T versions `5.1.0` and greater.
- **PLUGIN-611** Added support for plugin state. Plugin state information can be accessed on the PCLI using `show plugins state [router <router>] [node <node>] [{detail | summmary}] 128T-gre`

### Release 1.1.3, 2.1.3

#### Issues Fixed
- **PLUGIN-799** Pillar data for GRE tunnel is false by default

    _**Resolution**_ Set the enabled key to true by default when generating the pillar data

- **PLUGIN-479** Address range checking not valid for GRE tunnel

    _**Resolution**_ Use non-strict mode when getting plugin network in config generation

### Release 1.1.2, 2.1.2

#### Issues Fixed
- **PLUGIN-677** GRE plugin doesn't start up correctly post reboot

    _**Resolution**_ Implemented a config watcher service to handle startup conditions and dynamically apply configuration changes at runtime.

