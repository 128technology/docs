---
title: Session Recovery Detection
sidebar_label: Session Recovery Detection
---

### Version History

| Release | Modification |
| --- | --- |
| 6.1.0 | Feature introduced |

When SSR routers peer, forward and reverse flows are established between devices as traffic flows from client to server through the routers. As failures occur in networks, the SSR communicates with its peers in an effort to preserve client to server communication across alternate available pathways. Traffic destined to flows that no longer exist result in a metadata response from the SSR. This response may falsely indicate that the SSR is listening and responding to wayports - which it does not.

An alternate approach to SSR communication for session recovery has been created, `session-recovery-detection`. The feature has two modes, the default `packet-based` detection, and `inactivity-based` detection which has a configurable timeout. When inactivity-based detection is enabled, the originating node monitors activity on the flow. If no activity is detected for the specified time, the originator will add an additional metadata attribute called `session-health-check` to the next packet. The `session-health-check` attribute is validated by the receiving node. If the flow on the receiving node does not exist, it generates an `enable-metadata` message back to the originator. 

![Session Flow Example](/img/config_session_flow_example.png)

The activity is monitored for both forward and reverse flows, and if forward flow is deemed to be idle, the `session-health-check` attribute will be generated for the reverse traffic.

## How It Works

The following configuration parameter is available under Authority: 

![Session Recovery Detection](/img/config_session_recovery.png)

### Session Recovery Detection

Session Recovery Detection has two modes:

- `packet-based` (default mode)
- `inactivity-based` This has a configurable `inactivity-timeout` with a default of 5 seconds.

:::important
Because this feature uses a request/response mechanism, **all** SSR's using this feature must be upgraded.
:::

#### PCLI Configuration

```
config
    authority        
        session-recovery-detection
            mode                inactivity-based
            inactivity-timeout  1
        exit
    exit
exit
```

### Show Stats Commands

The following `show stats` commands provide insight into session information. For additional details, select the link for each stat. 

- [show stats packet-processing action failure metadata session-health-check-buffer-allocation](cli_stats_reference.md#show-stats-packet-processing-action-failure-metadata-session-health-check-buffer-allocation)

- [show stats packet-processing action failure metadata session-health-check-timeout](cli_stats_reference.md#show-stats-packet-processing-action-failure-metadata-session-health-check-timeout)

- [show stats packet-processing action failure metadata session-health-check-timeout-forward-pinhole-flow](cli_stats_reference.md#show-stats-packet-processing-action-failure-metadata-session-health-check-timeout-forward-pinhole-flow)

- [show stats packet-processing action failure metadata session-health-check-timeout-reverse-pinhole-flow](cli_stats_reference.md#show-stats-packet-processing-action-failure-metadata-session-health-check-timeout-reverse-pinhole-flow)

- [show stats packet-processing action success metadata added-session-health-check](cli_stats_reference.md#show-stats-packet-processing-action-success-metadata-added-session-health-check)

- [show stats packet-processing action success metadata generated-session-health-check-acknowledgement](cli_stats_reference.md#show-stats-packet-processing-action-success-metadata-generated-session-health-check-acknowledgement)

- [show stats packet-processing action success metadata received-session-health-check-acknowledgement](cli_stats_reference.md#show-stats-packet-processing-action-success-metadata-received-session-health-check-acknowledgement)

- [show stats packet-processing action success metadata received-stale-session-health-check-acknowledgement](cli_stats_reference.md#show-stats-packet-processing-action-success-metadata-received-stale-session-health-check-acknowledgement)

- [show stats packet-processing action success metadata sent-session-health-check-acknowledgement](cli_stats_reference.md#show-stats-packet-processing-action-success-metadata-sent-session-health-check-acknowledgement)

- [show stats service-area received reverse-packets-for-stuck-pinhole-session](cli_stats_reference.md#show-stats-service-area-received-reverse-packets-for-stuck-pinhole-session)



