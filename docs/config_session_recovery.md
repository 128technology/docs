---
title: Session Recovery Detection
sidebar_label: Session Recovery Detection
---

### Version History

| Release | Modification |
| --- | --- |
| 6.1.0 | Feature introduced |

In a Spoke and Hub topology, forward and reverse flows are exchanged between devices. However, in a case where there is a service interruption on a hub and the session no longer exists, the hub can no longer process the flows sent by the spoke. The hub sends a message to the spoke to enable metadata, which often is flagged as a security issue. 

To resolve this issue and keep the session alive, the `session-recovery-detection` feature has been added. The feature has two detection modes, the default `packet-based`, and `inactivity-based` which has a configurable timeout. When enabled, the originating node (Spoke in the diagram below) will monitor activity on the reverse flow. If no activity is detected for the specified time, it will add an additional metadata attribute called `session-health-check` to the next forward flow. The `session-health-check` attribute will be validated by the receiving node (in this case the hub) and if the flow on the hub does not exist, the hub can safely generate an enable-metadata message back to the spoke. 

![Session Flow Example](/img/config_session_flow_example.png)

The activity is monitored for both forward and reverse flows, and if forward flow is deemed to be idle, the `session-health-check` attribute will be generated for the reverse traffic.

## How It Works

The following configuration parameter is available under Authority: 

![Session Recovery Detection](/img/config_session_recovery.png)

### Session Recovery Detection

Session Recovery Detection has two modes:

- `packet-based` (default mode)
- `inactivity-based` This has a configurable `inactivity-timeout` with a default of 5 seconds.

Because this feature uses a request/response mechanism, **all** SSR's must be upgraded before using/enabling this feature.

### Show Commands

Info coming

### Show Stats Commands

Info coming