---
title: Service Policy Baseline Configurations
sidebar_label: Service Policy Baseline Defaults
---

One of the most powerful aspects of the SSR data model is the flexibility offered by a `service-policy`. Giving customers the ability to configure thresholds for when traffic should migrate from path to path based on current network status is a daunting task, however; most customers – and even application developers – are unaware of the sensitivity of their service to latency, loss, and jitter.

This document recommends several base class `service-policy` definitions for common types of traffic. These can be used as sane starting points for configuring the SSR. Administrators should derive their own policies from these base definitions, adding in administrative preference for path selection using vectors.

The entire set of proposed base class policies is provided at the end of this document in a format suitable for copy/paste into existing systems.

## Traffic Categories

Traffic can be broken into two basic categories, each with their respective set of subcategories. The basic categories are *real-time traffic* and *non real-time traffic*. The goal of categorizing traffic is to construct a corresponding set of basic policies for managing that traffic. We will discuss the network resource consumption behavior of commonly deployed network services (such as VoIP, SCCM, and FTP) and create basic models for them, but will also discuss strategies for choosing an appropriate base class for custom applications.

### Real-Time Traffic

As described in [delay-limits], real-time traffic's basic requirement is the *preservation of the time relation (variation) between the information entities of the stream*. In practice, this means the most important factor to consider for the success of the service traffic is **latency**. There are largely three major categories of real-time traffic today, of which two are common in enterprise networking:

- Voice/Video over IP (hereafter collectively referred to as VoIP)
- Remote desktop services
- Online gaming

#### VoIP

VoIP traffic is somewhat unique in that it is comprised of (at least) two separate, parallel channels: the *signaling* used for user location, call setup and teardown, etc., and the *media* – the audio/video traffic itself. Each of these have significantly different properties and for this reason it is recommended that they be separated into unique services whenever possible. In most deployments, there is a clean separation between the IP:ports used for signaling and the IP:ports used for media.

:::note
VoIP signaling is in fact not a real-time network service, but is described here due to its codependence on media streaming, which is a classic real-time network service.
:::

VoIP signaling, at least for telephony applications, typically creates a long-lived session; this session is created when a phone is powered on and registers, and lasts until that phone is powered off. As such, it is important to ensure that the signaling follows the best path available at all times. This is done using the `session-resiliency` setting `revertible-failover`.

Signaling is not particularly sensitive to jitter or loss. The recommended latency for VoIP signaling is `250`, as the most prevalent VoIP protocol (SIP) retransmits messages when no reply is received within 500ms. Using a value of `250` accommodates one round trip between UAC and UAS.

The `service-class` is assigned the value `Signalling`, one of SSR's factory default service classes. It will mark egress packets with DSCP 40 (CS5), per the recommendations of [[RFC 4594]](https://tools.ietf.org/html/rfc4594#section-4.2).

Baseline configuration:

```
*admin@labsystem1.fiedler (service-policy[name=voip-signaling])# show
name                 voip-signaling
description          "SIP, H.323, MEGACO, etc."
service-class        Signalling
session-resiliency   revertible-failover
path-quality-filter  true
best-effort          true
max-latency          250
```

VoIP media, on the other hand, is very sensitive to latency, loss, and jitter. the SSR software calculates "MOS" ([Mean Opinion Score](https://en.wikipedia.org/wiki/Mean_opinion_score)) for every peer path, as a composite metric derived by BFD metric data exchanged across the path. MOS is a "Quality of Experience" measurement, which assigns a single scalar value between 1 and 5 to an interactive session. Our benchmark for reasonable quality for VoIP media will be 3.6, which is the threshold below which many users will be disastisfied [[voip-mechanic]](https://www.voipmechanic.com/mos-mean-opinion-score.htm).

Because voice and video calls are transient, we *strongly discourage* using `revertible-failover` as the `session-resiliency` setting. This can cause traffic to "ping pong" between two links during congestion or periods of "brown outs," degrading the overall quality of experience for the caller.

Baseline configuration:

```
*admin@labsystem1.fiedler (service-policy[name=voip-audio])# show
name                 voip-audio
description          "RTP/bearer audio"
service-class        Telephony
session-resiliency   failover
path-quality-filter  true
best-effort          true
min-mos              3.6
```

:::note
MOS values can be dramatically affected by the codecs used in the audio/video streams. A G.711 stream (which is uncompressed) can achieve a theoretical maximum MOS of 4.4, whereas a G.729 stream can reach a theoretical maximum MOS of 3.9. However, the SSR's MOS calculation is derivative of path latency, loss, and jitter and will not consider codec. A value above 3.6 should be suitable for most signaled media traffic.
:::

Alternatively, it is possible to approximate the same behavior by explicitly specifying loss, latency, and jitter values. This gives additional flexibility if the values need to be tuned individually.

Baseline configuration (alternate):

```
*admin@labsystem1.fiedler (service-policy[name=voip-audio])# show
name                 voip-audio
description          "RTP/bearer audio"
service-class        Telephony
session-resiliency   failover
path-quality-filter  true
best-effort          true
max-loss             1
max-latency          150
max-jitter           30
```

#### Interactive Video

For video traffic associated with VoIP sessions (videoconferencing), the only difference is the recommended marking of the packets; for video, this is `MultimediaConferencing` which uses AF41 (Assured Forwarding).

Baseline configuration:

```
*admin@labsystem1.fiedler (service-policy[name=voip-video])# show
name                 voip-video
description          "Interactive video"
service-class        MultimediaConferencing
session-resiliency   failover
path-quality-filter  true
best-effort          true
max-loss             1
max-latency          150
max-jitter           30
```

#### Remote Desktop Services

Remote Desktop (including Virtual Desktop Infrastructure, a.k.a. "VDI") is a client/server implementation where a user communicates with a local client application that connects to a remote server, streaming display information from server to client, and keyboard/mouse information streamed from client to server. This is common in enterprise networking, whether it is in support of "thin client" deployments (as is popularized by the commercial applications Citrix Desktop and VMware's "PCoIP"), or troubleshooting tools such as Microsoft Remote Desktop and VNC.

Remote Desktop quality of experience is degraded for latency values above 225ms, so this will be our governing factor.

Baseline configuration:

```
*admin@labsystem1.fiedler (service-policy[name=remote-desktop])# show
name                 remote-desktop
description          "Remote Desktop and VDI"
service-class        RealTimeInteractive
session-resiliency   failover
path-quality-filter  true
max-latency          225
```

:::note
The baseline configuration recommends `session-resiliency` to be set to `failover`, which is acceptable for infrequent and/or transient use of remote desktop services such as troubleshooting exercices, or transactional applications. For enterprises that use VDI as a standard means for allowing employees to access their desktops as hosted server infrastructure, consider setting `session-resiliency` to `true`.
:::

#### Gaming

Gaming traffic is highly susceptible to latency and fairly insensitive to loss (since most real-time games will periodically send cumulative updates to clients to ensure state synchronization). Thus the governing metric is again latency.

We will set `best-effort` to `false`, since gaming applications requiring low latency will become unplayable if latency exceeds 100ms. We will also set `revertible-failover` to `true`, as gaming sessions are typically long-lived.

Baseline configuration:

```
*admin@labsystem1.fiedler (service-policy[name=gaming])# show
name                 gaming
description          "Real-time gaming applications"
service-class        LowLatencyData
session-resiliency   revertible-failover
path-quality-filter  true
best-effort          false
max-latency          100
```

### Non Real-Time Traffic

As opposed to real-time traffic, the quality of experience for *non real-time traffic* is less dependent on round trip latency. We will describe several categories of traffic:

- Management traffic, both interactive (e.g., SSH, telnet) and non-interactive (SNMP, NTP, Syslog, API calls, etc.)
- Streaming video
- Mission-critical data: enterprise-specific applications critical to day-to-day operations
- Best-effort data, which typically represents the lion's share of the network traffic
- Bulk/scavenger data, the lowest class of data and first to be dropped during congestion

#### Management Traffic

Management traffic can be interactive, as is the case when administrators log into devices over the network; they can also be non-interactive, as is the case for machine-to-machine (M2M) traffic exemplified by SNMP. The difference between interactive and non-interactive focuses on latency: the human-to-machine interface quickly becomes unusable as latency grows.

For the interactive traffic, we set `session-resiliency` to `failover` as these types of interactive sessions are typically short-lived. For M2M traffic, management sessions may last indefinitely, hence the use of `revertible-failover`.

Baseline configurations:

```
*admin@labsystem1.fiedler (service-policy[name=management-interactive])# show                                    
name                 management-interactive
description          "SSH, Telnet, mosh, etc."
service-class        OAM
session-resiliency   failover
path-quality-filter  true
best-effort          true
max-latency          200

*admin@labsystem1.fiedler (service-policy[name=management-m2m])# show                                            
name                 management-m2m
description          "SNMP, NTP, Syslog, etc."
service-class        OAM
session-resiliency   revertible-failover
path-quality-filter  true
best-effort          true
max-latency          1000
```

#### Streaming Video

There are many variants of streaming video in today's networks; for the purposes of session policy definition we will divided streaming video into two categories: enterprise-relevant (such as e-learning content), and non-critical or "scavenger" video (entertainment content such as YouTube).

Streaming video, unlike real-time video, is relatively insensitive to loss, latency, and jitter. The distinction we draw between the enterprise-class policy and the scavenger policy is in two factors:

- Enterprise-class video is marked as AF31 as compared to scavenger video marked as CS1
- Enterprise-class video has `best-effort` forwarding enabled, whereas scavenger video will not be forwarded if no paths meeth the quality criteria

Baseline configuration:

```
*admin@labsystem1.fiedler (service-policy[name=video-streaming])# show
name                 video-streaming
description          "Enterprise video streaming services"
service-class        MultimediaStreaming
session-resiliency   failover
path-quality-filter  true
best-effort          true
max-loss             5
max-latency          4000

*admin@labsystem1.fiedler (service-policy[name=video-streaming-scavenger])# show
name                 video-streaming-scavenger
description          "Non-organizational streaming video"
service-class        LowPriorityData
session-resiliency   failover
path-quality-filter  true
best-effort          false
max-loss             5
max-latency          4000
```

#### Interactive Data

When users (as network clients) interact with servers in a session-oriented, transactional way – typically using HTTP/HTTPS – this is referred to as *interactive data*. Users are sensitive to high latency connections when interacting with network resources; as such, this `service-policy` leverages `path-quality-filter` to choose the most suitable forwarding path.

Baseline configuration:

```
*admin@labsystem1.fiedler (service-policy[name=data-interactive])# show
name                 data-interactive
description          "Interactive data"
service-class        LowLatencyData
path-quality-filter  true
best-effort          true
max-latency          250
```

:::note
In present-day networks, a large percentage of network transactions leverage HTTP/HTTPS. For this reason, it is not advisable to classify all HTTP/HTTPS traffic as `data-interactive`, as this could dramatically shift the percentages of traffic assigned to your SSR's traffic-engineering queues away from `best-effort` data. This policy straddles between `data-mission-critical` and `data-best-effort`, and should be used judiciously to improve network performance for client/server applications that fit into that spot in your network's QoS framework.
:::

#### Mission-Critical Data

The policy for "mission-critical" data differs from "interactive-data" only through the use of the `service-class` (AF31 vs. AF21). As such, during times of network congestion and contention, mission-critical data will be prioritized over interactive data.

Resist the temptation to assign this `service-policy` to too many services; it should be used sparingly to truly reflect the highest priority services within your enterprise network.

Baseline configuration:

```
*admin@labsystem1.fiedler (service-policy[name=data-mission-critical])# show
name                 data-mission-critical
description          "Mission-critical data"
service-class        MultimediaStreaming
path-quality-filter  true
best-effort          true
max-latency          250
```

:::note
This baseline configuration uses the `MultimediaStreaming` service-class, which in turn uses DSCP 26 (AF31). MultimediaStreaming is assigned to the SSR's `medium` traffic-engineering queue.
:::

#### Best-Effort Data

The majority of traffic on any network is classified as "best effort" data. Traditionally this will use the `Standard` service class (DSCP 0). There are no path quality requirements explicitly called out for best effort data. This is recommended the `service-policy` for "default route" services such as `0.0.0.0/0`.

Aside from the `service-class` assignment, the only other configuration is the `session-resiliency` value of `failover`. The value of `failover` is recommended for transient sessions; for long-lived sessions where resiliency is crucial, consider classifying that traffic discretely as its own `service` and assigning a more appropriate `service-policy`.

Baseline configuration:

```
*admin@labsystem1.fiedler (service-policy[name=data-best-effort])# show
name                data-best-effort
description         "Best effort data"
service-class       Standard
session-resiliency  failover
```

#### Bulk/Scavenger Data

Bulk/scavenger data is prioritized at the bottom of the list, and will be the last class of traffic to get network resources during periods of contention. This is typically used for things like OS updates, which can rapidly choke a network when populations of machines all attempt downloads in a synchronized fashion.

Baseline configuration:

```
*admin@labsystem1.fiedler (service-policy[name=data-scavenger])# show
name                 data-scavenger
description          "Scavenger class data"
service-class        LowPriorityData
path-quality-filter  false
```

## References

[delay-limits]
Suznjevic, M. and Saldana, J., "Delay Limits for Real-Time Services", [draft-suznjevic-tsvwg-delay-limits-00](https://www.ietf.org/archive/id/draft-suznjevic-tsvwg-delay-limits-00.txt), June 2016.

[voip-mechanic]
"Measuring MOS for VoIP Test", [MOS - Mean Opinion Score for VoIP](https://www.voipmechanic.com/mos-mean-opinion-score.htm).

[RFC 4594]
Babiarz, J., et. al., "Configuration Guidelines for DiffServ Service Classes", [RFC 4594](https://tools.ietf.org/html/rfc4594), August 2006.

## Basic Service Policy Definitions

The output here is provided in `flat` format, to facilitate copy/pasting into an existing SSR conductor or router. Note that it has referencial dependencies on the various system-default `service-class` configuration, so for users that have modified or removed those `service-class` elements, adjustments will be required.

```
config authority service-policy voip-signaling name voip-signaling
config authority service-policy voip-signaling description "SIP, H.323, MEGACO, etc."
config authority service-policy voip-signaling service-class Signalling
config authority service-policy voip-signaling session-resiliency revertible-failover
config authority service-policy voip-signaling path-quality-filter true
config authority service-policy voip-signaling best-effort true
config authority service-policy voip-signaling max-latency 250
config authority service-policy remote-desktop name remote-desktop
config authority service-policy remote-desktop description "Remote Desktop and VDI"
config authority service-policy remote-desktop service-class RealTimeInteractive
config authority service-policy remote-desktop session-resiliency failover
config authority service-policy remote-desktop path-quality-filter true
config authority service-policy remote-desktop max-latency 225
config authority service-policy gaming name gaming
config authority service-policy gaming description "Real-time gaming applications"
config authority service-policy gaming service-class LowLatencyData
config authority service-policy gaming session-resiliency revertible-failover
config authority service-policy gaming path-quality-filter true
config authority service-policy gaming best-effort false
config authority service-policy gaming max-latency 100
config authority service-policy management-interactive name management-interactive
config authority service-policy management-interactive description "SSH, Telnet, mosh, etc."
config authority service-policy management-interactive service-class OAM
config authority service-policy management-interactive session-resiliency failover
config authority service-policy management-interactive path-quality-filter true
config authority service-policy management-interactive best-effort true
config authority service-policy management-interactive max-latency 200
config authority service-policy management-m2m name management-m2m
config authority service-policy management-m2m description "SNMP, NTP, Syslog, etc."
config authority service-policy management-m2m service-class OAM
config authority service-policy management-m2m session-resiliency revertible-failover
config authority service-policy management-m2m path-quality-filter true
config authority service-policy management-m2m best-effort true
config authority service-policy management-m2m max-latency 1000
config authority service-policy voip-audio name voip-audio
config authority service-policy voip-audio description "RTP/bearer audio"
config authority service-policy voip-audio service-class Telephony
config authority service-policy voip-audio session-resiliency failover
config authority service-policy voip-audio path-quality-filter true
config authority service-policy voip-audio best-effort true
config authority service-policy voip-audio max-loss 1
config authority service-policy voip-audio max-latency 150
config authority service-policy voip-audio max-jitter 30
config authority service-policy voip-video name voip-video
config authority service-policy voip-video description "Interactive video"
config authority service-policy voip-video service-class RealTimeInteractive
config authority service-policy voip-video session-resiliency failover
config authority service-policy voip-video path-quality-filter true
config authority service-policy voip-video best-effort true
config authority service-policy voip-video max-loss 1
config authority service-policy voip-video max-latency 150
config authority service-policy voip-video max-jitter 30
config authority service-policy video-streaming name video-streaming
config authority service-policy video-streaming description "Enterprise video streaming services"
config authority service-policy video-streaming service-class MultimediaStreaming
config authority service-policy video-streaming session-resiliency failover
config authority service-policy video-streaming path-quality-filter true
config authority service-policy video-streaming best-effort true
config authority service-policy video-streaming max-loss 5
config authority service-policy video-streaming max-latency 4000
config authority service-policy video-streaming-scavenger name video-streaming-scavenger
config authority service-policy video-streaming-scavenger description "Non-organizational streaming video"
config authority service-policy video-streaming-scavenger service-class LowPriorityData
config authority service-policy video-streaming-scavenger session-resiliency failover
config authority service-policy video-streaming-scavenger path-quality-filter true
config authority service-policy video-streaming-scavenger best-effort false
config authority service-policy video-streaming-scavenger max-loss 5
config authority service-policy video-streaming-scavenger max-latency 4000
config authority service-policy data-best-effort name data-best-effort
config authority service-policy data-best-effort description "Best effort data"
config authority service-policy data-best-effort service-class Standard
config authority service-policy data-best-effort session-resiliency failover
config authority service-policy data-interactive name data-interactive
config authority service-policy data-interactive description "Interactive data"
config authority service-policy data-interactive service-class LowLatencyData
config authority service-policy data-interactive path-quality-filter true
config authority service-policy data-interactive best-effort true
config authority service-policy data-interactive max-latency 250
config authority service-policy data-mission-critical name data-mission-critical
config authority service-policy data-mission-critical description "Mission-critical data"
config authority service-policy data-mission-critical service-class MultimediaStreaming
config authority service-policy data-mission-critical path-quality-filter true
config authority service-policy data-mission-critical best-effort true
config authority service-policy data-mission-critical max-latency 250
config authority service-policy data-scavenger name data-scavenger
config authority service-policy data-scavenger description "Scavenger class data"
config authority service-policy data-scavenger service-class LowPriorityData
config authority service-policy data-scavenger path-quality-filter false
```

