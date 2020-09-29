---
title: Using 128T as an NTP Server
sidebar_label: Branch NTP Service
---
In many hub-and-spoke deployments, devices at the spoke locations are accustomed to using either public services (such as `time.nist.gov` or `pool.ntp.org`) or self-hosted NTP services as their clock source. Rather than carry this traffic on the WAN, this document demonstrates how 128T can provide NTP services for devices at the branch, avoiding unnecessary WAN traffic, and ensuring that all branch devices use a consistent clock source.

:::note
All of the recommendations in this document presume that the administrator has already set up the 128T to clock off of an upstream source.
:::

## Overview

There are two, somewhat complementary approaches to using a branch 128T as an NTP server:

- Issuing the 128T's address as the NTP server in DHCP repsonses and/or configuring devices to use the 128T's LAN interface as an NTP server
- Capturing all inbound NTP (using a service that captures 123/UDP), and handling that traffic locally

### Configuring Devices to use the 128T as an NTP Server

This is straightforward configuration for both the end devices as well as for the 128T itself. In the example below, we will assume that the 128T's LAN IP address is `192.168.1.1`. Consider the following configuration excerpt:

```config {19,24-29}
node  node1
    name              node1
    device-interface  lan
        name               lan
        network-interface  lan0
            name                   lan0
            description            "Branch LAN"
            address                192.168.1.1
                ip-address     192.168.1.1
                prefix-length  24
                host-service   dhcp-server
                    service-type  dhcp-server
                    address-pool  192.168.1.100
                        start-address      192.168.1.100
                        end-address        192.168.1.199
                        router             192.168.1.1
                        domain-server      1.1.1.1
                        domain-server      1.0.0.1
                        ntp-server         192.168.1.1
                    exit
                exit
                host-service   custom
                    service-type   custom
                    transport      udp
                        protocol    udp
                        port-range  123
                            start-port  123
                        exit
                    exit
                    access-policy  trusted
                        source  trusted
                    exit
                    access-policy  guest
                        source  guest
                    exit
                    access-policy  corporate
                        source  corporate
                    exit
                exit
            exit
        exit
    exit
exit
```

There are two principle components to this configuration excerpt, with respect to NTP treatment: the `host-service` specifying NTP (using 123/UDP), and the `ntp-server` configuration within the `address-pool`.

The `ntp-server` configuration will offer the 128T's LAN interface (192.168.1.1) as the NTP server to use when issuing DHCP leases.

:::note
Any devices that have static IP assignments will need to have the NTP server configured accordingly.
:::

The custom `host-service` configuration shown here will direct any traffic sent to 192.168.1.1:123/UDP to the Linux host subsystem on the 128T device, where the `ntpd` running on the host platform will reply. As seen in the configuration example above, it is important to ensure that every `tenant` population that can access that LAN interface is allowed access to the `host-service` through the use of an `access-policy` statement. (In our example, we have three tenants on the LAN: *trusted*, *guest*, and *corporate*).

### Capturing all Inbound NTP

An alternative/complementary approach to assigning the 128T's LAN interface is to "catch" all inbound traffic for 123/UDP and forcibly redirect it to the 128T's NTP process. This is necessary in many occasions when the NTP server for a given client platform on the LAN is hardcoded, as is the case for many small embedded platforms and Internet of Things (IoT) devices.

:::note
This configuration will catch *all* inbound NTP. If you have devices at the branch that require precision timekeeping from external sources, adjust your service definitions and/or your tenant definitions accordingly to ensure the traffic does not match the "catch-all" service.
:::

The configuration will match all traffic arriving based solely on its port and protocol, and send it to the 128T's Linux subsystem. Here is a relevant configuration excerpt:

```
admin@labsystem1.fiedler# show config running authority service ntp-iot
config
    authority
        service  inbound-ntp
            name                  inbound-ntp
            applies-to           router-group
                type        router-group
                group-name  branches
            exit
            description           "Local NTP"
            scope                 private
            transport             udp
                protocol    udp
                port-range  123
                    start-port  123
                    end-port    123
                exit
            exit
            address               0.0.0.0/0
            access-policy         trusted
                source      trusted
            exit
            access-policy         guest
                source      guest
            exit
            access-policy         corporate
                source      corporate
            exit
            share-service-routes  false
        exit
    exit
exit
```

This configuration will match any destination IP address (`0.0.0.0/0`) for NTP (123/UDP). As in the previous example, we've added `access-policy` statements for the three tenants that we see on the LAN segments at our branch locations. Likewise, we've added a `applies-to` configuration block, to ensure that this service is only pushed down to the routers we've tagged as belonging to the `branches` group.

:::warning
Do not also add the `_internal_` tenant to the `access-policy` list, as this is (typically) the tenant that the 128T will use when sending traffic outbound to external NTP servers. We want to ensure the 128T – and only the 128T – clocks off of an external source.
:::

On each router, we'll configure a `service-route` that looks like this:

```
admin@labsystem1.fiedler# show config runn authority router branch1 service-route rte_inbound-ntp

config
    authority
        router  branch1
            name           branch1
            service-route  rte_inbound-ntp
                name          rte_inbound-ntp
                service-name  inbound-ntp
                nat-target    169.254.127.127
            exit
        exit
    exit
exit
```

This `service-route` leverages [Linux host networking](concepts_linux_host_networking.md) to send packets to `ntpd` using the `kni254` interface present on all 128T devices.

## Conclusion

Avoiding unnecessary WAN traffic is always a welcome change, Using the 128T to provide NTP clock to devices at the branch ensures a consistent time source for a collection of devices that are logically grouped already.