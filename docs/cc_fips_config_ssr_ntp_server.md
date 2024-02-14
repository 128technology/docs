---
title: Configure the SSR as an NTP Server
sidebar_label: Configure the SSR as an NTP Server
---
In many hub-and-spoke deployments, devices at the spoke locations are accustomed to using either public services (such as `time.nist.gov` or `pool.ntp.org`) or self-hosted NTP services as their clock source. Rather than carry this traffic on the WAN, this section describes how to use a branch SSR as the NTP server.

### Configuring Devices to use the SSR as an NTP Server

This configuration example is for both the end devices as well as for the SSR itself, and should be modified as needed to fit your compliant network. In the example below, we will assume that the SSR's LAN IP address is `192.168.1.1`. This is only an example.

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

The `ntp-server` configuration will offer the SSR's LAN interface (192.168.1.1) as the NTP server to use when issuing DHCP leases.

:::note
Any devices that have static IP assignments will need to have the NTP server configured accordingly.
:::

The custom `host-service` configuration shown here will direct any traffic sent to 192.168.1.1:123/UDP to the Linux host subsystem on the SSR device, where the `ntpd` running on the host platform will reply. As seen in the configuration example above, it is important to ensure that every `tenant` population that can access that LAN interface is allowed access to the `host-service` through the use of an `access-policy` statement. (In our example, we have three tenants on the LAN: *trusted*, *guest*, and *corporate*).

