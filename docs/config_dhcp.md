---
title: Dynamic Host Configuration Protocol (DHCP)
sidebar_label: DHCP
---

The **Dynamic Host Configuration Protocol** (**DHCP**) is a network management protocol used on Internet Protocol networks whereby a DHCP server dynamically assigns an IP address and other network configuration parameters to each device on a network so they can communicate with other IP networks.

The DHCP protocol provides a mechanism for unprovisioned hosts to request an IP-address and configuration via broadcast requests. Based on available address pools, a DHCP server can provide a DHCP client a time-limited IP address “lease”.

When running in a HA configuration with two nodes, only one of the nodes will actively operate as a DHCP server for those intererfaces that are shared between both systems. Client lease information is sychronized between nodes to ensure that upon link or node failure, the newly active DHCP server will operate with the same information.

:::important
The same interface configured as a DHCP server can not also to be configured for DHCP relay.
:::

Naturally the DHCP server can not itself reside on an interface that is configured as a DHCP client.

## Basic Configuration
A DHCP Server is configured on the _network-interface_ as a _host-service_ of type `dhcp-server`.

```
network-interface    intf4
    name        intf4
    global-id   4
    vlan        4
    type        external
    source-nat  false
    mtu         9216

    address     172.16.4.1
        ip-address     172.16.4.1
        prefix-length  24

        host-service   dhcp-server
            service-type    dhcp-server
            server-name     128TDhcpServer4
            max-lease-time  10

            address-pool    172.16.4.161
                start-address  172.16.4.161
                domain-server  4.4.4.4
                domain-name    www.128technology.com
            exit
        exit
    exit
exit
```
The DHCP server supports setting custom options per _dhcp-server_ instance.  Custom options are configured as type-value pairs.

```
custom             4
  code   4
  descriptime time-server
  value  4.4.4.4
exit
```

Static reservations are supported.  When configuring a static assignment within an address pool, the lease will inherit the attributes of the pool (typically this would be the _router_ and _domain-server_).  If you desire to override any of the attributes of the DHCP pool, these can be configured uniquely per static assignment.

```
address-pool       192.168.0.20
    start-address      192.168.0.20
    end-address        192.168.0.200
    router             192.168.0.1
    domain-server      192.168.0.1

    static-assignment  192.168.0.5
        address             192.168.0.5
        link-layer-address  77:88:CC:00:22:11
        domain-server       1.1.1.1
    exit
exit
```



## Troubleshooting

From within the PCLI, you can execute [show network-interface application](cli_reference.md#show-network-interface-application) to show statistics related to the DHCP server as well as any active DHCP client leases.

```
admin@gouda.novigrad# show network-interface application
Tue 2020-04-21 15:26:19 UTC

====================================================================================================
 Application Data
====================================================================================================

 Interface:                                    gouda:wan-interface
 state:                                        Interface not configured for any managed application

 Interface:                                    gouda:lan-interface
 dhcp-server:
     kea-status:
       active (running/success) since Sat 2020-04-11 12:57:23 UTC
     kea-ctrl-status:
       active (running/success) since Sat 2020-04-11 12:57:23 UTC
     metrics:
         declined-addresses:                   0
         pkt4-ack-sent:                        1900
         pkt4-discover-received:               403
         pkt4-inform-received:                 469
         pkt4-offer-sent:                      403
         pkt4-received:                        2317
         pkt4-release-received:                2
         pkt4-request-received:                1443
         pkt4-sent:                            2303
         reclaimed-declined-addresses:         0
         reclaimed-leases:                     13
         subnet[1].assigned-addresses:         24
         subnet[1].declined-addresses:         0
         subnet[1].reclaimed-declined-addresses:0
         subnet[1].reclaimed-leases:           13
         subnet[1].total-addresses:            181
     subnets:
         subnet:
           current-lease-count:                24
           current-leases:
               lease:
                 client-last-transaction-time: 2020-04-21 15:26:12
                 hostname:                     homecomtsiphone
                 hw-address:                   70:3c:69:58:01:28
                 ip-address:                   192.168.0.36
                 valid-lifetime:               86400
           subnet:                             192.168.0.1/24

           ...
    
     ha-heartbeat:
       role:                                   primary
       state:                                  standalone

 Interface:                                    gouda:lan-untrusted
 state:                                        Interface not configured for any managed application

 Interface:                                    gouda:mgmt-interface
 state:                                        Interface not configured for any managed application

Completed in 0.76 seconds
```
Active client lease management can be seen in the GUI by navigating to Router > Node > DHCP Server.  It is also from within this interface that you can selectively revoke a client lease.
![config_dhcp_1](/img/config_dhcp_1.png)