---
title: Dynamic Ingress Source NAT
sidebar_label: Dynamic Ingress Source NAT
---

Dynamic Source NAT translates multiple source IP addresses into a smaller pool of translated addresses and dynamic ports, which conserves public IP address space and provides the flexibility to source NAT a specific IP range. This supports scaling up sessions for an internal service. For example, in a corporate office with a SIP phone service where all phones have different IPs on port 5060, these internal IP addresses are source NAT’ed to a single external IP address. 

Dynamic Source NAT may also provide solutions for IP address conflicts, but the IP mapping is not one-to-one and does NOT provide destination NAT in the reverse direction. To facilitate the destination NAT mapping for network connections from the external client to the internal client, use [`bidirectional-nat`](config_static_nat.md). 

Consider the following scenario, similar to the Static NAT example focusing on a company acquisition, where the `spk-lan2` network is overlapping and not routable in `Corp` and `Internet`. 

![Static Nat Diagram](/img/static_nat_example.png)

The Dynamic Source NAT challenge is illustrated in scenarios #2 and #4 below, where multiple clients of IP subnet 192.168.1.0/24, from `spk-lan2` are running same application on port 1111, but given only one IP address, 172.16.128.10, to source NAT out. 

| Scenario | Source | Destination | Translation Required |
| --- | --- | --- | --- |
| 2 | 192.168.1.10:1111 @ spk-lan2<br/> 192.168.1.11:1111 @ spk-lan2 | 10.10.10.10:xxxx @ hub-lan1 | 172.16.128.10:1653 -> 10.10.10.10:xxxx <br/> 172.16.128.10:1654 -> 10.10.10.10:xxxx |
| 4 | 192.168.1.10:1111 @ spk-lan2<br/> 192.168.1.11:1111 @ spk-lan2 | 172.16.129.10:* @spk-lan1 | 172.16.128.10:1653 -> 172.16.129.10:xxxx <br/> 172.16.128.10:1654 -> 172.16.129.10:xxxx |

By applying Dynamic Source NAT configuration to the `spk-lan2` interface, the `192.168.1.0/24` subnet can be mapped to the single IP address and subnet `172.16.128.10/32`, with dynamically allocated ports. This allows the SSR to dynamically build a many-to-one source NAT mapping.  

## Configuration

In scenario #2, sessions from an application using port 1111 are initiated from multiple clients of the spk-lan2 interface, to a client of hub-lan1 on 10.10.10.10. The first client at host 192.168.1.10 and port 1111 is assigned a source NAT of 172.16.128.10:1653 where port 1653 is allocated dynamically. The second client at 192.168.1.11 with port 1111 is allocated a dynamic source NAT of 172.16.128.10:1654. 

Scenario #4 is similar, except the target connections are to the client at the `spk-lan1` interface using 172.16.129.10  which has been mapped by Static NAT. The same Dynamic Source NAT processes from Senario #2 are applied here.

The following is the router configuration for both the above use cases. Packets going through `spk-lan2` within the 192.168.1.0/24 domain will be source-natted to 172.16.128.10/32. 

### Sample PCLI Configuration

```
config
    authority
         router  spoke
            node  node1-spoke
                device-interface  spk-lan2
                    network-interface  spk-lan2
                        dynamic-source-nat  192.168.1.0/24
                            local-ip   192.168.1.0/24
                            remote-ip  172.16.128.10/32
                        exit
                    exit
                exit
            exit
        exit
    exit
exit 
```

### Sample GUI Configuration:

Network Interface Configuration

![Network Interface configuration](/img/dnat_net-intf_gui_config.png) 

Dynamic Source NAT Configuration

![Dynamic Source NAT Configuration](/img/dnat_gui_config.png)

### Configuration Commands

Dynamic Source NAT is configured from the network-interface using the following commands: 

[`dynamic-source-nat`](config_command_guide.md#configure-authority-router-node-device-interface-network-interface-dynamic-source-nat): Defines the prefixes that need to be dynamically source natted for packets ingressing this interface. 

- [`local-ip`](config_command_guide.md#configure-authority-router-node-device-interface-network-interface-dynamic-source-nat-local-ip): For packets ingressing this interface, the IP that is source NAT'ed to the `remote-ip`. 
- [`remote-ip`](config_command_guide.md#configure-authority-router-node-device-interface-network-interface-dynamic-source-nat-remote-ip): For packets ingressing this interface, the IP where the `local-ip` will be source NAT'ed. `remote-ip` must use the /32 prefix.

## Show Commands
 
The [`show network-interface source-nat-rules`](cli_reference.md#show-network-interface-source-nat-rules) can be run from the router or the conductor to display brief or detailed information for NAT configurations. Please see the [NAT Troubleshooting](ts_nat_troubleshooting.md) pages for information about the `source-nat-rules` subcommand. 

