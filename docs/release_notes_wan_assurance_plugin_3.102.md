---
title: WAN Assurance Plugin 3.102 Release Notes
sidebar_label: '3.102'

---
## Release 3.102.0

**Release Date:** June 5, 2026

### Resolved Issues

- **WAN-4866 mist-agent enters restart loop after upgrade on conductor-managed deployments without Mist org**

  _**Resolution**_ On conductor-managed or air-gapped deployments without a Mist organization configured, the mist-agent service could enter a continuous restart loop after an SSR upgrade, generating excessive log entries and alarms. The upgrade process now preserves the pre-upgrade state of the mist-agent service, preventing unnecessary restarts.
