---
title: GRE Plugin
sidebar_lable: GRE
---

The 128T GRE plugin can be used for creating IPv4 GRE tunnels between a 128T router and a remote GRE tunnel destination. For services such as Zscaler, this provides better throughput compared to other tunneling mechanisms.

## Installation ##

The 128T-gre plugin is available in following versions:
- 128T-gre-1.0.0: >= 128T-3.2.8, < 128T-4.3.0
- 128T-gre-2.0.0: >= 128T-4.3.0

It is recommended to use the conductor GUI > Plugins page for installing plugins. This allows the system to select the correct version of plugin based on the 128T version.

```
# dnf list 128T 128T-gre
Last metadata expiration check: 5 days, 5:37:52 ago on Wed 18 Mar 2020 08:54:57 PM UTC.
Installed Packages
128T.x86_64         4.2.4-1.el7         @128tech-local-saved
128T-gre.x86_64     1.0.0-1.el7         @128tech-local-saved
```

:::important
After installing the plugin, the 128T service on the conductor should be restarted for the changes to take effect.
:::

## Configuration ##
The GRE plugin can be configured on an individual router. In order to configure the tunnel, it is important to collect the following information up-front:
- Remote tunnel information
- Ingress traffic to be sent through the tunnel
- WAN interfaces to be used for sending the tunnel traffic

### Remote GRE tunnel information ###

#### Tunnel information ####
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
                    host  20.20.20.13
                exit

                destination   sec-tunnel
                    name  sec-tunnel
                    host  30.30.30.14

                    icmp-keep-alive
                        enabled             true
                        link-test-interval  10
                        number-of-retries          3
                        retry-interval      1
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

#### Tunnel ICMP health check parameters ####
The GRE tunnels do not have an inherent mechanism to detect the availability of remote peers.  As a result, the GRE plugin allows the user to configure ICMP probes to the destination. The configuration is enabled by default with the following settings:

```
icmp-keep-alive
    enabled             true
    link-test-interval  10
    number-of-retries          3
    retry-interval      1
exit
```
:::note
The time interval for the attributes are in seconds.
:::

Every `link-test-interval` an icmp check is performed to determine the availability of the remote tunnel peer. When the peer does not respond, a new attempt is made after `retry-interval`. After sending the initial ping plus `number-of-retries` amount of ping requests, the peer is considered as down. In the above config, assuming an unresponsive peer, first ping is sent at 10 seconds, followed by 3 more pings at 1 second interval each. In total taking the system about 13 seconds and 4 pings to detect a peer as down. Once a peer is considered down, the next attempt to detect the tunnel liveliness is made after 10 seconds (or the `link-test-interval`).

In the above example, the two tunnels `pri-tunnel` and `sec-tunnel` create two additional KNI interfaces called `gre-0` and `gre-1` respectively. When a tunnel is determined to be non-responsive, the corresponding `gre-x` interfaces are brought down. For example, in the above config, when the `pri-tunnel` goes down, the corresponding `gre-0` interfaces is brought down as well. The significance of this will be made clear in the next sections.

### 128T services to transport over the tunnel ###
Next step is to identify the the prefix or the subnet to be transported over the tunnel. In some cases, it might be desirable to transport all internet traffic through the tunnel, so the prefix could be as simple as 0.0.0.0/0. This can be done by capturing the prefix in a 128T service and setting the next-hop as the `gre-x` interfaces. As noted in the [previous section](#tunnelicmp_health_check_parameters), each destination on a given node corresponds to a `gre-x` inteface. By configuring the next-hop as the appropriate GRE interfaces, it allows the incoming traffic to be service-function chained to a GRE tunnel towards a WAN interface.

```
admin@node1.conductor1# show config running authority service lan-svc

config

    authority

        service  lan-svc
            name           lan-svc
            address        10.10.10.0/24

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

In the example above, all the `lan` tenant traffic in the `10.10.10.0/24` subnet will be sent to the `gre-0` and `gre-1` network interfaces. These `gre-x-intf` are auto generated by the conductor and correspond to the configured destination. In the above config, when the `gre-0` interface will be used as primary target for lan subnet while that tunnel is up. If the `pri-tunnel` goes down, all new sessions will automatically be routed to the `sec-tunnel` via the `gre-1` interface.

### WAN interfaces for sending the tunnel packets ###
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
            address               20.20.20.13

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
            address               30.30.30.14

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

#### Static Source NAT considerations ####
:::note
For some of the KNI based interfaces such as PPPoE and LTE, the source nat may not be needed
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

                address-pool  20.20.20.12/32
                    address      20.20.20.12/32
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

                address-pool  30.30.30.12/32
                    address      30.30.30.12/32
                    tenant-name  _internal_
                exit
            exit
        exit
    exit
exit
```

## Debugging & Troubleshooting ##

### Config Generation ###
When the plugin is installed on the conductor, each commit triggers two scripts called `generate_confguration` and `generate_pillar` to auto-generate KNI, services etc and to generate pillar data for each router. Please check the following locations for debugging information.

- Logs for the config and pillar generation for each commit can be found here
```
/var/log/128technology/plugins/gre-generate-config.log
/var/lib/128technology/plugins/pillar/gre/<router>.sls
```

### GRE Tunnel not working on the router ###
When the config and pillar data are successfully generated, a `t128-setup-gre` RPM is installed on the router itself. As part of this process, a script called `handle_gre_config` is executed which will create all the necessary config etc on the running system.

- Logs for the config generation on the router can be found here
```
/var/log/128technology/plugins/gre-handle-config.log
```

- Debugging the runtime status of the GRE tunnels can be done by monitoring the journal for the following tags
```
journalctl -t /monitoring_script.par -t /init.par
```

- For debugging the linux network namespace, here are some of the common commands:
```
# ip netns <name> ip addr
# ip netns <name> ip route show table all
# ip netns <name> ip rule list
```

### Tunnel operation ###
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

In addition, a `ping-monitor` service is started for each configured tunnel, the `systemctl status ping-monitor@<tunnel-name>` can be used to query the status of the ping service.