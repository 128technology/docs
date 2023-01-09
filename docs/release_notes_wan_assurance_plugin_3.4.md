---
title: WAN Assurance Plugin 3.4 Release Notes
sidebar_label: '3.4'
---

## Release 3.4.1
**Release Date:** May 16, 2022

### Resolved Issues

- **I95-46089 WAN assurance process consumes excessive memory resulting in alarms:** The mist-agent will limit the amount of data it buffers in internal cache when processing data with errors.

## Release 3.4.0

**Release Date:** May 13, 2022
### New Features
- **WAN-667 Improve the connection diagnostics for MIST cloud**

When the router is unable to connect to the MIST cloud the `show plugin state summary` command will provide additional details to help diagnose the connection failure.

### Resolved Issues

- **WAN-955 Custom app names don't match the service names on Application Insights:** The auto detected custom app names will not be sanitized and the actual names will be included in the data sent to the MIST cloud.

- **I95-45196 Restart command does not reboot the device** The restart command will now reboot the device instead of starting the SSR systemd service.

- **MIST-61604 Device release command was not processed correctly:** The logic to detect whether a device has been released from the MIST cloud handles the cloud disconnect cases more gracefully.

- **WAN-962 Higher than normal TCP reset counts being observed for Application SLE:** The device side logic to detect TCP reset was too aggressive which resulted in the reported data being unusable. With this fix, the device will only report the TCP reset metrics for SSR version 5.6.0 or higher.

:::important
After upgrade the device will stop reporting the TCP reset metrics for SSR version 5.6.0 and lower since those metrics were reporting higher than normal error counts.
:::
