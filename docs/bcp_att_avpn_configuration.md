---
title: AT&T AVPN Configuration
sidebar_label: AT&T AVPN Configuration
---

import Mermaid from '@theme/Mermaid';

This guide is for network engineers and architects using their 128T Session Smart router to connect to AT&T’s MPLS VPN (AVPN) service. It will cover:
- Service class definitions for the various COS queues on the AT&T MPLS network
- Strategies for mapping `service` configuration to the COS queues using `service-policy` elements
- Guidelines for setting your `traffic-engineering` properties, to match the circuit profile of your AT&T MPLS link

:::note
While the techniques described here apply to any MPLS connection, they will be most valuable when engineering branch office (i.e., smaller) MPLS links, due to the higher likelihood of congestion.
:::

This document is intended to be a companion guide to the *AT&T Network-Based Class of Service Customer Router Configuration Guide*. At the time of this writing, the latest version is Release 4.0, December 2016.

## AT&T Service Classes

The AT&T AVPN MPLS network uses six distinct classes of service for carrying customer traffic, as well as a seventh “control” queue for communication between the CE and PE router. This section describes each of the classes of service and provides 128T configuration fragments to illustrate how to configure your 128T Session Smart router to interact with the AVPN network.

:::note
This document assumes the use of a 6COS circuit profile. The 4COS circuit does not use the COS2V nor COS5 classes of service. Otherwise, the recommendations made in this document apply.
:::

:::caution
In each of the `service-class` configuration excerpts below, you will see it has been assigned a `traffic-class`. The 128T Session Smart router has four traffic classes, in order of priority: high, medium, low, best-effort. This is different from other network equipment, which may order the priorities as high, medium, best-effort, low.
:::

All of the `service-class` elements in this section are provided as an appendix to this document, to facilitate their import (or copy/paste) into your existing 128T configuration.

### COS1: Real-time

The COS1 class is treated differently than the other classes on AVPN; any packets received that are marked as COS1 exceed the configured bandwidth, they are explicitly dropped ("hard policed"). Packets are identified as COS1 through the use of the "EF" DSCP marking (decimal 46).

COS1 is typically reserved for Voice over IP (VoIP) traffic.

Configuration:

```
admin@AAPCDCVACON0A.AAPCONPOD0# show config run auth service-class ATT-COS1

config

    authority

        service-class  ATT-COS1
            name           ATT-COS1
            description    "Real-time applications (EF)"
            dscp           46
            traffic-class  high
        exit
    exit
exit
```

### COS2V: Delay-sensitive applications

The COS2V queue, identified through the use of the DSCP value AF41 (decimal 34), is typically reserved for video conferencing traffic.

#### Configuration

```
admin@AAPCDCVACON0A.AAPCONPOD0# show config run auth service-class ATT-COS2V

config

    authority

        service-class  ATT-COS2V
            name           ATT-COS2V
            description    "Delay-sensitive applications (AF41)"
            dscp           34
            traffic-class  medium
        exit
    exit
exit
```

### COS2: Time-critical applications

The COS2 queue, identified through the use of DSCP AF31 (decimal 26), is to be used for time-sensitive, mission-critical, low bandwidth applications. This is the recommended class VoIP signaling (e.g., SIP, H.323, SCCP), as it is low-bandwidth (typically a small number of kilobits per second) but extremely time-sensitive.

#### Configuration

```
admin@AAPCDCVACON0A.AAPCONPOD0# show config run auth service-class ATT-COS2

config

    authority

        service-class  ATT-COS2
            name           ATT-COS2
            description    "Time-sensitive mission-critical low-bandwidth applications (AF31)"
            dscp           26
            traffic-class  medium
        exit
    exit
exit
```

### COS3: Time-sensitive applications

This class of service should include all mission-critical applications that are *interactive* in nature; that is, they correspond to applications that are transactional in nature. In enterprises this may be a CRM system, an ERP system, or other important client/server applications.

COS3 is distinguishable by its DSCP value of AF21 (decimal 18).

#### Configuration

```
admin@AAPCDCVACON0A.AAPCONPOD0# show config run auth service-class ATT-COS3

config

    authority

        service-class  ATT-COS3
            name           ATT-COS3
            description    "Time-sensitive mission-critical applications (AF21)"
            dscp           18
            traffic-class  medium
        exit
    exit
exit
```

### COS4: Best Effort

The "best effort" class is the one that should be used by the majority of network traffic.

There is no DSCP value associated with best effort traffic (decimal 0).

#### Configuration

```
admin@AAPCDCVACON0A.AAPCONPOD0# show config run auth service-class ATT-COS4

config

    authority

        service-class  ATT-COS4
            name           ATT-COS4
            description    "Best effort (default)"
            dscp           0
            traffic-class  best-effort
        exit
    exit
exit
```

### COS5: Scavenger

The last class of service for customer traffic is COS5, or scavenger. This is for all non business-oriented traffic. This typically gets the lowest allocation when assigning traffic engineering percentages, and thus will experience congestion first.

Scavenger traffic is identified as COS5 through the use of the AF11 DSCP value (decimal 10).

#### Configuration

```
admin@AAPCDCVACON0A.AAPCONPOD0# show config run auth service-class ATT-COS5

config

    authority

        service-class  ATT-COS5
            name           ATT-COS5
            description    "Scavenger (AF11)"
            dscp           10
            traffic-class  best-effort
        exit
    exit
exit
```

### Control Queue

The control queue is used for communicating between the CE and PE router, and should typically be limited to BGP and BFD only. This is an extremely low bandwidth queue.

:::warning
In many deployments the 128T does not BGP peer with the PE router, and in no deployments will the 128T send BFD to the PE router. Do not mark BFD or BGP with DSCP CS6/decimal 48. This is only presented for completeness, or when BGP peering with the PE router.
:::

#### Configuration

```
admin@AAPCDCVACON0A.AAPCONPOD0# show config run auth service-class ATT-control

config

    authority

        service-class  ATT-control
            name           ATT-control
            description    "Control traffic only (CS6)"
            dscp           48
            traffic-class  high
        exit
    exit
exit
```

## Service Policies

The 128T will use `service-policy` to indicate which sessions need to get marked and treated with the `session-type` configurations. Each `service` should have a corresponding `service-policy`, to ensure that the markings are applied and the correct `traffic-class` is used for traffic engineering.

The base class `service-policy` configurations presented here are derived from the [BCP on Service Policy](bcp_service-policy_defaults).

| Base `service-policy` | AVPN `service-class` |
| --- | :-: |
| `voip-audio` | ATT-COS1 |
| `voip-video` | ATT-COS2V |
| `video-streaming` | ATT-COS2V |
| `voip-signaling` | ATT-COS2 |
| `data-mission-critical` | ATT-COS2 |
| `remote-desktop` | ATT-COS2 |
| `management-interactive` | ATT-COS3 |
| `management-m2m` | ATT-COS3 |
| `data-interactive` | ATT-COS3 |
| `data-best-effort` | ATT-COS4 |
| `data-scavenger` | ATT-COS5 |
| `video-streaming-scavenger` | ATT-COS5 |

## Traffic Engineering Strategies

The 128T router uses four traffic engineering queues for prioritizing egress traffic during times of congestion or link contention. The general practice of mapping the `traffic-class` assignments (high, medium, low, best-effort) into the various 6COS queues is shown below.


<Mermaid chart={`
  graph LR
    voip-audio --> ATT-COS1
    id1(BFD, BGP) -.-> ATT-control
    voip-video --> ATT-COS2V
    voip-streaming --> ATT-COS2V
    voip-signaling --> ATT-COS2
    data-mission-critical --> ATT-COS2
    remote-desktop --> ATT-COS2
    management-interactive --> ATT-COS3
    management-m2m --> ATT-COS3
    data-interactive --> ATT-COS3
    data-best-effort --> ATT-COS4
    data-scavenger --> ATT-COS5
    video-streaming-scavenger --> ATT-COS5
    subgraph best-effort
    ATT-COS5
    end
    subgraph low
    ATT-COS4
    end
    subgraph medium
    ATT-COS2V
    ATT-COS2
    ATT-COS3
    end
    subgraph high
    ATT-COS1
    ATT-control
    end
`}/>

Each AT&T AVPN circuit has a *profile* associated with it (referred to as a "COS Package"), that maps to bandwidth allocations for the various COS queues. These in turn need to be mapped to the four egress traffic engineering queues on the 128T. The COS Package from AT&T is expressed as a set of six numbers (corresponding to the queues), where the first number is the percentage of the circuit bandwidth allocated for COS1, and the remaining five numbers (which sum to 100%) represent the amount of *bandwidth remaining* from the bandwidth not used by COS1.

:::warning
Math involved.
:::

### Sizing the Traffic Engineering Policy

| Traffic Class | Value                            |
| :-----------: | -------------------------------- |
| high          | COS1 percentage from COS Profile |
| medium | (sum of COS2V + COS2 + COS3) * (100% - COS1 bandwidth) |
| low | COS4 * (100% - COS1 bandwidth) |
| best-effort | COS5 * (100% - COS1 bandwidth) |

Example (simple COS profile for a 6COS model):

| COS1 | COS2V | COS2 | COS3 | COS4 | COS5 |
| :--: | :---: | :--: | :--: | :--: | :--: |
|  5%  |  20%  | 20%  | 20%  | 20%  | 20%  |

In this case, the `high` percentage is `5`. The `medium` class gets 60% (20% + 20% + 20%) of the remaining 95%, which is `57`. The `low` class gets 20% of the remaining 95%, which is `19`. And `best-effort` also gets 20%, which is `19`.

:::note
These values are merely starting points that should line up to the COS Profile of the AT&T AVPN circuit. Further tuning is left to the discretion of the network engineer.
:::

The `traffic-profile` would therefore look like this:

 ```
*admin@labsystem1.fiedler# show config candidate authority traffic-profile 6COS-simple

config

    authority

        traffic-profile  6COS-simple
            name         6COS-simple

            high
                distribution  5
            exit

            medium
                distribution  57
            exit

            low
                distribution  19
            exit

            best-effort
                distribution  19
            exit
        exit
    exit
exit
 ```

This `traffic-profile` is applied to a `device-interface`:

```
*admin@labsystem1.fiedler# show config candidate authority router newton node labsystem2 device eno4 traffic-engineering

config

    authority

        router  newton
            name  newton

            node  labsystem2
                name              labsystem2

                device-interface  eno4
                    name                 eno4

                    traffic-engineering
                        transmit-cap     100000000
                        traffic-profile  6COS-simple
                    exit
                exit
            exit
        exit
    exit
exit
```

## Appendix: Service Class Configuration

The following configuration output is presented here to facilitate copy/paste into your 128T conductor.

:::note
Because the `dscp` value is a key field for the `service-class` object, no two `service-class` configurations can share the same value. This will likely require you to delete existing `service-class` configuration, as the 128T ships with *factory default* `service-class` elements that will conflict with the ones presented below.
:::

```
config authority service-class ATT-COS1 name           ATT-COS1
config authority service-class ATT-COS1 description    "Real-time applications (EF)"
config authority service-class ATT-COS1 dscp           46
config authority service-class ATT-COS1 traffic-class  high
config authority service-class ATT-COS2V name           ATT-COS2V
config authority service-class ATT-COS2V description    "Delay-sensitive applications (AF41)"
config authority service-class ATT-COS2V dscp           34
config authority service-class ATT-COS2V traffic-class  medium
config authority service-class ATT-COS2 name           ATT-COS2
config authority service-class ATT-COS2 description    "Time-sensitive mission-critical low-bandwidth applications (AF31)"
config authority service-class ATT-COS2 dscp           26
config authority service-class ATT-COS2 traffic-class  medium
config authority service-class ATT-COS3 name           ATT-COS3
config authority service-class ATT-COS3 description    "Time-sensitive mission-critical applications (AF21)"
config authority service-class ATT-COS3 dscp           18
config authority service-class ATT-COS3 traffic-class medium
config authority service-class ATT-COS4 name           ATT-COS4
config authority service-class ATT-COS4 description    "Best effort (default)"
config authority service-class ATT-COS4 dscp           0
config authority service-class ATT-COS4 traffic-class  best-effort
config authority service-class ATT-COS5 name           ATT-COS5
config authority service-class ATT-COS5 description    "Scavenger (AF11)"
config authority service-class ATT-COS5 dscp           10
config authority service-class ATT-COS5 traffic-class  best-effort
config authority service-class ATT-control name           ATT-control
config authority service-class ATT-control description    "Control traffic only (CS6)"
config authority service-class ATT-control dscp           48
config authority service-class ATT-control traffic-class  high
```