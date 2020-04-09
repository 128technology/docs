---
title: Session Timers
sidebar_label: Session Timers
---
When packets stop arriving on the flows of a session, the 128T router will clear the session after a period of time. The amount of time depends on the type of traffic.

## Session Type Timeout

The time the router will wait before removing the session is governed by the timeout value in the session-type matched by the traffic.

For example, the following configuration examples show the session-types for `DNS` and `SSH`. Their timeouts are `5000` milliseconds and `1900000` milliseconds respectively:
```
session-type                   DNS
    name            DNS
    service-class   NetworkControl
    timeout         5000
    nat-keep-alive  false

    transport       udp
        protocol    udp

        port-range  53
            start-port  53
        exit
    exit

    transport       tcp
        protocol    tcp

        port-range  53
            start-port  53
        exit
    exit
exit
```

```
session-type                   SSH
    name            SSH
    service-class   OAM
    timeout         1900000
    nat-keep-alive  false

    transport       udp
        protocol    udp

        port-range  22
            start-port  22
        exit
    exit

    transport       tcp
        protocol    tcp

        port-range  22
            start-port  22
        exit
    exit
exit
```

## Default Timeout

For traffic which does not match any session type, the following default timeout values are used:
* TCP  - 1900000 ms
* UDP  - 180000 ms
* ICMP - 10000 ms

## TCP Timeout

For a session using TCP, the 128T examines the state of the flows. When first TCP packets arrive, the flows for the session are given a timeout of 10s. Once the connection reaches an established state, the timeout for the flows are updated to the default or configured session-type timeout value.
