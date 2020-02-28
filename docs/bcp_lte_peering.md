---
title: LTE Peering
sidebar_label: LTE Peering
---
It is quite common for 128T routers to use LTE interfaces as a "last resort" transport when primary circuits are down, congested, or experiencing issues. This document recommends various configuration settings to strike a balance between performance and bandwidth usage for LTE interfaces, to get the most benefit from them when peering over LTE.

:::note
 This document is intended for customers that use LTE interfaces as a last resort transport, not for those using it as a primary transport.
:::

## Overview

LTE interfaces have two material differences when compared to most wireline interfaces:

1. Most wireless providers employ *Carrier-Grade NAT* equipment on their LTE network, which can cause impact to long-lived sessions between peers if there are periods of inactivity. Furthermore, it typically results in a private IP address being issued via DHCP to the LTE modem, which affects the directionality of session setup.
2. LTE services are typically sold using bandwidth-based service plans. Thus, additional overhead used for machine-to-machine communications costs real money.

In this document, we provide a configuration fragment that illustrates how to tune your LTE interface to provide connectivity with minimal overhead.

## Configuration Sample

```
    neighborhood           LTE
        name               LTE
        peer-connectivity  outbound-only
        topology           spoke
        vector             lte

        bfd
            state                enabled
            desired-tx-interval  60000
            authentication-type  sha256
            multiplier           3
            link-test-interval   120
            link-test-length     10
            dscp                 0
        exit

        udp-transform
            mode  always-transform
            nat-keep-alive-mode     enabled
            nat-keep-alive-timeout  30
        exit

        path-mtu-discovery
            enabled  true
            interval 600
        exit
    exit
```

## Notes about the configuration

A [Carrier-grade NAT](https://en.wikipedia.org/wiki/Carrier-grade_NAT), which is indistinguishable from an enterprise-grade (or consumer) NAT from a 128T configuration perspective, requires certain configuration considerations. First, as seen in the configuration fragment above, it is important to set the `peer-connectivity` to `outbound-only`. This will guarantee that any traffic originating at a peer and destined for the LTE device will be created "inside out" from the NAT's perspective. (For more information on the outbound-only feature of the 128T product, read the reference manual.)

The `bfd` configuration is dilated to use `60000` milliseconds as its interval. This configuration is empirically observed to work on most U.S. LTE provider networks – the Carrier-grade NAT devices present in the United States typically use NAT bindings longer than one minute. This value may need adjustment in your local region, if you experience difficulties in establishing sessions toward 128T routers over LTE networks.

:::important
These BFD keepalive messages are small and therefore do not consume much bandwidth. However, on interfaces where every byte counts against your monthly bandwidth allocation, it is important to keep these settings as conservative as you can to maintain a stable connection.
:::

Last, the `udp-transform` configuration element in the neighborhood is configured with its `mode` set to `always-transform`. Because we can presume that the Carrier-grade NAT exists, we do not need to test for it using our detection mechanism. This reduces unnecessary overhead on the path.
