---
title: 128T Monitoring Agent 1.2 Release Notes
sidebar_label: '1.2'
---

## Release 1.2.1

### New Features and Improvements

---

- **MON-225** Update telegraf dependency to 1.14.3

---

- **MON-218** Expose MAC address in the device state input

  Allow better correlation between device and network interfaces.

---

- **MON-210** Improve performance of several provided inputs

  Reduce the resource consumption as well as the time needed to collect data. In particular, the `t128_metrics` input has been significanly improved.

### Issues Fixed

---

- **MON-205** Honor the input enable/disable flag in the agent's config

  _**Resolution**_ The configuration allows the user to disable an input. However, an input was being treated as enabled as long as it existed in the config. That configuration option is now honored.

---

- **MON-225** `t128_events` input would occasionally drop or delayed events

  _**Resolution**_ Update the telegraf dependency to 1.14.3 as well as the `execd` input to better handle simultaneous events.

## Release 1.2.0

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
