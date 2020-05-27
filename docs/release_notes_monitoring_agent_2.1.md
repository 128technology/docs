---
title: 128T Monitoring Agent 2.1 Release Notes
sidebar_label: '2.1'
---


## Release 2.1.0

### New Features and Improvements

---
- **MON-184** Added stop command in cli to stop all associated Telegraf services.

For help using this cli option, please refer to the [Monitoring Agent Guide](plugin_monitoring_agent.md#stopping-services).

---
- **MON-141** Added support for multiple logically seperate monitoring agent instances with the `lib-directory` config option.

For help configuring this option, please refer to the [Monitoring Agent Guide](plugin_monitoring_agent.md#configuration).

---
- **MON-208** Update Telegraf to latest stable version 1.14.2.

A new stable version of telegraf was released upstream. The main reason for upgrading was to get support for multiline lines.

---
- **MON-194** Added arp state collector to collect state of the arp table.

To configure the new input plugin, please refer to the [Monitoring Agent Guide](plugin_monitoring_agent.md#arp-state-collector).

---
- **MON-144** Added configuration option to enable tracking of index so that the event collector picks up where it left off in the case of a restart.

For help configuring this option, please refer to the [Monitoring Agent Guide](plugin_monitoring_agent.md#event-collector).


### Issues Fixed

- **MON-195** Device state collector collects state from peer node on an HA router.

  _**Resolution**_ The device state collector will now only request state from the local node.

---
- **MON-181** Event collector excludes multiline events.

  _**Resolution**_ The event collector will accumulate subsequent invalid lines and attempt to submit the accumulated line.
