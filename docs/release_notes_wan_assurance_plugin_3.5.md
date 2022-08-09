---
title: WAN Assurance Plugin 3.5 Release Notes
sidebar_label: '3.5'
---

## Release 3.5.1
**Release Date:** Aug 03, 2022

### Resolved Issues

- **I95-47351 Conductor with a large number of assets would take a long time to apply WAN Assurance Plugin state:**

  _**Resolution:**_ The WAN Assurance plugin uses plugin data files instead of pillar to synchronize data and apply plugin state to speed up the process.

## Release 3.5.0

**Release Date:** Jul 20, 2022

### New Features
- **I95-45678 Report the TCP round trip time metric**

For TCP sessions the SSR collects metrics on TCP round-trip time which are reported via application summary to the MIST cloud.

- **WAN-903 Improve the reporting for the release workflow**

When a device is released from the MIST portal, the `show mist details` command provides additional context around the status, registration code being used, and other information to assist in re-onboarding the device.

- **PLUGIN-1768 Add configuration commit warnings for expired registration code**

The `authority > mist-wan-assurance > registration-code` is used for onboarding new routers and has an expiration of one year. A warning is now displayed when using an expired code. The `show mist details` commands also displays the expiration date for the configured token.

- **WAN-720 Support Greenfield and Whitebox devices for MIST onboarding**

Support for onboarding and conductor redirection for Juniper branded devices as well as other Whiteboxes was introduced.

:::important
After upgrade the device will stop reporting the TCP reset metrics for SSR version 5.6.0 and lower since those metrics were reporting higher than normal error counts.
:::
