---
title: Linux Host Networking Through 128T
sidebar_label: Linux Host Networking
---
The 128T software is a set of daemons (processes) that run within a Linux operating system. There are many standard Linux components leveraged by 128T (e.g., NTP, sshd, dnf, etc.) that require network access. These components (hereafter referred to as _host components_) will send traffic via Linux's routing table unless instructed otherwise. This document describes the best practice for routing that traffic from the underlying Linux host operating system into the 128T routing domain, for subsequent traffic forwarding using the 128T paradigm.
:::note
When running on the host platform, the 128T has its own routing table in addition to the one that is running within Linux.
:::

This document applies specifically to 128T routers. The 128T conductor does not require any special configuration to affect Linux host networking, since it does not forward packets using any technique other than Linux host networking to begin with.

## Basic Configuration
To forward traffic between Linux and 128T, we will use an interface type known as a [_Kernel Network Interface_, or KNI](concepts_kni). This is used to connect userspace applications with kernel networking.

By default, the 128T creates a KNI interface ("kni254") that is used to route packets to Linux as part of its _host-service_ configuration. (A host-service is configured on a network-interface, and is used to forward various traffic types such as SSH and HTTP/HTTPS to Linux applications.) This kni254 interface is, by default, only used for inbound traffic (from Linux to the 128T) for host-services. By following the steps below, we can leverage the kni254 interface to send outbound traffic to 128T.

Create services (or modify existing services) for network access, adding an `access-policy` that permits the tenant `_internal_`.
:::info
The `_internal_` tenant is associated with all inbound requests arriving from Linux to 128T via kni254.
:::

```
service  internet
    name                  internet
    description           "internet reachability"
    scope                 private
    security              internal
    address               0.0.0.0/0
       
    access-policy         guest
        source      guest
        permission  allow
    exit
    access-policy         trusted
        source      trusted
        permission  allow
    exit
    access-policy         _internal_
        source      _internal_
        permission  allow
    exit
    share-service-routes  false
exit
```
:::note
Traffic originating from Linux and traveling through a KNI interface will have a source address of 169.254.127.127, which is a _link-local_ address. You must ensure that `source-nat` is enabled on the egress interface used to carry this traffic out of the 128T platform.
:::

### Advanced Configuration
If you want to selectively forward via 128T, you can edit  `/etc/sysconfig/network-scripts/route-kni254` from its default route of  `0.0.0.0/0` with any address/prefix you wish. Additionally, you can edit the `route-kni254` file to contain as many individual route statements as you like; it is important to only edit this file while 128T is stopped, however, since 128T will cache the contents of the file when it starts, and restore the copy it cached when software is stopped.

1. Stop 128T software on a given router. There are many ways to accomplish this, one of which is to type `sudo systemctl stop 128T` from the Linux shell prompt.
:::note
You must ensure you are in a position to access the Linux subsystem on a 128T router even when 128T software is not running.
:::
2. Add a route to the internet in a route file associated with `kni254` (the following should all be typed on one line):
  ```
sudo echo 0.0.0.0/0 via 169.254.127.126 dev kni254 metric 200 > /etc/sysconfig/network-scripts/route-kni254
  ```
3. Start 128T software: `sudo systemctl start 128T`


:::info
The [loopback-static-route plugin](plugin_loopback_static_routes#make-kni254-the-default-route-in-linux) can be installed and enabled on the 128T router to dynamically manage the Linux routes.
:::

### KNI VLAN
A `host` device-interface can be configured with a vlan-enabled network interface.  Doing so creates a unique linux interface that is managed for each network-interface, but only one underlying KNI will be created on the system. If there is no non-vlan network-interface on the device-interface, an implicit underlying “base” interface is instantiated for the KNI, and linux VLAN interfaces are stacked on it.

Output reflecting KNI interfaces with a VLAN of 200 configured:

```
admin@t124-dut1.Fabric128# show device-interface
Sat 2019-02-16 18:45:18 UTC

========================================
 t124-dut1:dev12
========================================
 Type:                host
 Forwarding:          true
 Mode:                host
 MAC Address:         b2:9c:1f:9a:d9:7a

 Admin Status:        up
 Operational Status:  up
 Redundancy Status:   non-redundant
 Speed:               1000

 in-octets:                        2816
 in-unicast-pkts:                    38
 in-errors:                           0
 out-octets:                          0
 out-unicast-pkts:                    0
 out-errors:                          0

 network-interfaces:
   dev12:
     base state:      good
   dev12.200:
     vlan state:      good

Completed in 0.24 seconds
```
```
admin@t124-dut1.Fabric128# show platform device-interfaces
Sat 2019-02-16 18:45:56 UTC

===============================================================
 t124-dut1
===============================================================
 ----------------------------
 Device Interface Information
 ----------------------------

 Name:                     dev12
 Manufacturer:
 Description:
 Driver:
 Driver Version:           unavailable
 Speed:
 PCI Address:
 MAC Address:              be:0c:c2:1e:79:be
 Firmware Version:         unavailable
 Statistics Supported:     unavailable
 Test Info Supported:      unavailable
 EEPROM Access Supported:  unavailable
 Register Dump Supported:  unavailable
 network-interfaces:
   dev12:
     base info:            good
   dev12.200:
     vlan info:            good

Completed in 1.29 seconds
```
