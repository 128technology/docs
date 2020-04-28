---
title: 128T Monitoring Agent 2.0 Release Notes
sidebar_label: '2.0'
---
## Release 2.0.1

### Issues Fixed

----
- **MON-185** telegraf error when processing results from peer path input

  _**Resolution:**_ The extra logging causing the problem was removed
------
- **MON-186** LTE metric collector not reporting any values

  _**Resolution:**_ Updated the library imports and identifiers used to display the missing data
------
- **MON-188** The events inputs collector has invalid sample

  _**Resolution:**_ Updated the sample and staged configuration example for events


## Release 2.0.0

### New Features and Improvements

----
- **MON-126** Automatically stage all 128T input configuration for easy of use

The configuration for all 128T collectors such as t128_metrics, t128_events etc will automatically be staged in the inputs directory for convenience.

----
- **MON-148** Top applications, sessions and sources input plugin

To configure the new input plugin, please refer to the [Monitoring Agent Guide](plugin_monitoring_agent.md#top-analytics-collector)

----

- **MON-164** Test monitoring-agent input configuration

For verification of the data collected the user can use `monitoring-agent-cli generate` command to generate all the telegraf configuration. Subsequently, the user can run `monitoring-agent-cli test-input` to test a specific input. More details can be found in the [Testing And Validation section](plugin_monitoring_agent.md#testing-and-validation)

----

- **MON-171** Update Telegraf to latest stable version 1.14.0 ####

A new stable version of telegraf was released upstream with several new inputs such as execd, wireguard and others.

----
- **MON-175** LTE metric collect will include SNR signal strength ####

The `t128_lte_metric` collector will look for and report SNR signal strength if it is reported by the 128T router.

----


### Issues Fixed
----
- **MON-125** `t128_metrics` default bfd config doesn't work with 4.3

  _**Resolution:**_ The new default config for metrics have the correct parameters for BFD metrics
----
- **MON-146** Metric collector timing out with the default config on customer system

  _**Resolution:**_ The metric configuration will now have a default timeout of 15 seconds.
------
- **MON-160** sample agent-config has invalid tags

  _**Resolution:**_ All the sample configurations now contain valid data
------
- **MON-169** peer-path collector only captures 1 peer-path per node

  _**Resolution:**_ All peer paths on the node will be reported by the peer-path collector
------
- **MON-170** Default telegraf service (not 128T-telegraf) is enabled and running un-necessarily on the system

  _**Resolution:**_ The system telegraf service will be stopped and disabled
