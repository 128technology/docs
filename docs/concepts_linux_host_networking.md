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
To forward traffic between Linux and 128T, we will use an interface type known as a _Kernel Network Interface_, or KNI. This is used to connect userspace applications with kernel networking.

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
