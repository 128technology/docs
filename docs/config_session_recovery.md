---
title: Session Recovery Detection
sidebar_label: Session Recovery Detection
---

### Version History

| Release | Modification |
| --- | --- |
| 6.1.0 | Feature introduced |

When SSR routers are peered, forward and reverse flows are exchanged between devices. However, in a case where there is a service interruption on one node and the session no longer exists, that node can no longer process the flows sent from the peered SSR. The interrupted node sends a message to the peer to enable metadata, which which may falsely indicate that the SSR is listening and responding to wayports. 

To resolve this issue and keep the session alive, the `session-recovery-detection` feature has been added. The feature has two detection modes, the default `packet-based`, and `inactivity-based` which has a configurable timeout. When `inactivity-based` detection is enabled, the originating node monitors activity on the return flow. If no activity is detected for the specified time, the originator will add an additional metadata attribute called `session-health-check` to the next packet. The `session-health-check` attribute is validated by the receiving node. If the flow on the receiving node does not exist, it generates an `enable-metadata` message back to the originator. 

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
Because this feature uses a request/response mechanism, **all** SSR's must be upgraded before using/enabling this feature.
:::

### Show Commands

Info coming

### Show Stats Commands

Info coming