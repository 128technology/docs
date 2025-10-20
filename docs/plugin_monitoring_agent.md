---
title: Monitoring Agent Plugin
sidebar_label: Monitoring Agent Plugin
---

The monitoring agent plugin builds upon the [monitoring agent](concepts_monitoring.md) application included as part of the SSR software. The monitoring application can be managed via various [config files](concepts_monitoring.md#file-based-configuration) on disk which can be cumbersome and error prone. The plugin provides a better config management experience while providing a more user friendly way to configure the built-in application.

## Installation

### Plugin
For deployments running SSR version `5.1.0` or greater on the conductor, install the monitoring agent plugin for configuration management.

:::note
The instructions for installing and managing the plugin can be found [here](plugin_intro.md#installation-and-management).
:::

## Configuration

With the plugin installed, the configuration for the monitoring agent application can be managed via the conductor. The general workflow for creating the configuration is as follows:

- Configure the inputs
- Configure the outputs
- Create an agent config profile
- Reference the profile on the router

### Input Configuration
The monitoring agent plugin allows the user to configure a set of inputs to be captured to monitor the routers. The configuration can be found under `config > authority > monitoring > input`. The configuration will depend on the type of input selected and here are the common fields that apply to all the inputs


| Element           | Type                  | Description                                                                    |
| ----------------- | --------------------- | ------------------------------------------------------------------------------ |
| name              | string                | The name of the input                                                          |
| type              | enumeration           | The type of the input such as device-state, metrics etc                        |
| additional-config | multiline-toml-string | Additional telegraf configuration for the input not captured by the data model |
| tags              | list                  | List of tags to be included for this particular input                          |
| tags > tag        | string                | The name of the tag                                                            |
| tags > node       | -                     | Use the node name of the router as tag value                                   |
| tags > router     | -                     | Use the router name of the router as tag value                                 |
| tags > value      | string                | User specified value for the tag                                               |

Based on the selected type, additional type specific configuration will be configurable. Here's an example of a `custom-input` which allows the user to create a TOML telegraf configuration.

```config
admin@node1.conductor1#
admin@node1.conductor1# configure authority monitoring input cpu
admin@node1.conductor1 (input[name=cpu])# type custom-input
*admin@node1.conductor1 (input[name=cpu])# config
Enter toml for config (Press CTRL-D to finish):
[[inputs.cpu]]
  ## Whether to report per-cpu stats or not
  percpu = true
  ## Whether to report total system cpu stats or not
  totalcpu = true
  ## If true, collect raw CPU time metrics.
  collect_cpu_time = false
  ## If true, compute and report the sum of all non-idle CPU states.
  report_active = false


*admin@node1.conductor1 (input[name=cpu])#
```

### Output configuration
The output configuration provides information about the various data sink for the inputs. The monitoring configuration provides specific output types for convenience as well as a `custom-output` type for specifying any telegraf supported output definition. The common fields are as follows:

| Element           | Type                  | Description                                                                        |
| ----------------- | --------------------- | ---------------------------------------------------------------------------------- |
| name              | string                | The name of the output                                                             |
| type              | enumeration           | The type of the output such as Kafka, syslog etc                                   |
| push-jitter       | uint32                | The amount of time to jitter sending of the data to the output                     |
| batch-size        | uint32                | The maximum number of rows of data to send at once                                 |
| buffer-limit      | uint32                | The maximum number of unsent metrics in the buffer                                 |
| data-format       | enumeration           | The output data format for telegraf such as influx, json                           |
| format            | string                | When the data-format is other, the name of the output format supported by telegraf |
| additional-config | multiline-toml-string | Additional telegraf configuration for the output not captured by the data model    |

Based on the selected type, additional type specific configuration will be configurable. Here's an example of a `custom-output` which allows the user to create a TOML telegraf configuration

```config
*admin@node1.conductor1# configure authority monitoring output http
*admin@node1.conductor1 (output[name=http])# type custom-output
*admin@node1.conductor1 (output[name=http])#
*admin@node1.conductor1 (output[name=http])# config
Enter toml for config (Press CTRL-D to finish):
# A plugin that can transmit metrics over HTTP
[[outputs.http]]
  ## URL is the address to send metrics to
  url = "http://127.0.0.1:8080/telegraf"


*admin@node1.conductor1 (output[name=http])#
```

### Agent Configuration
The `agent-config` can be leveraged to create a monitoring profile by referencing the various inputs and outputs configured in the previous steps. This allows multiple profiles to be created and applies to different routers. The various configuration options for the `agent-config` as follows:


| Element                     | Type                  | Description                                                                                           |
| --------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------- |
| name                        | string                | The name of the agent configuration profile                                                           |
| push-interval               | interval              | The frequency with which to send data to the output(s)                                                |
| sample-interval             | interval              | The frequency with which to collect data from the input(s)                                            |
| tags                        | list                  | List of tags to be included for this particular input                                                 |
| tags > tag                  | string                | The name of the tag                                                                                   |
| tags > node                 | -                     | Use the node name of the router as tag value                                                          |
| tags > router               | -                     | Use the router name of the router as tag value                                                        |
| tags > value                | string                | User specified value for the tag                                                                      |
| variables                   | list                  | List of config variables which allows for customization on the running system                         |
| variables > name            | string                | The name of the variable                                                                              |
| variables > query           | string                | The [GraphQL query](#graphql-variables) to be executed to determine the value of the variable         |
| input                       | list                  | List of inputs to be included in the profile                                                          |
| input > name                | reference             | Reference to the input configured above                                                               |
| input > push-interval       | uint32                | Override the push-interval for the specific input                                                     |
| input > sample-interval     | uint32                | Override the sample-interval for the specific input                                                   |
| input > include-all-outputs | boolean               | Default; true. When enabled, the input will be sent to all configured outputs                         |
| input > output              | reference             | When `include-all-outputs` is false, configure a set of outputs to be used as data sink               |
| input > additional-config   | multiline-toml-string | Additional Telegraf configuration not present in the datamodel such as preprocessors, aggregators etc |

An example of the agent configuration looks as follows:

```
config

    authority

        monitoring

            agent-config  my-agent
                name             my-agent

                tags             custom
                    tag    custom
                    value  custom1
                exit

                tags             router
                    tag     router
                    router
                exit
                sample-interval  10s
                push-interval    30s

                input            device-state
                    name                 device-state
                    include-all-outputs  false
                    output               syslog
                exit

                input            events
                    name                 events
                    push-interval        1s
                    include-all-outputs  true
                exit

                input            graph
                    name  graph
                exit

                input            metrics
                    name                 metrics
                    sample-interval      100s
                    include-all-outputs  false
                    output               kafka
                exit
            exit
        exit
    exit
exit
```

### Router configuration
Once all the inputs, outputs and agent-config are provisioned, the profile can be referenced on the individual routers. The monitoring config elements can be found under `authority > router > system > monitoring`

| Element      | Type      | Description                                       |
| ------------ | --------- | ------------------------------------------------- |
| enabled      | boolean   | Enable or disable the Monitoring Agent            |
| agent-config | reference | The agent-config that should apply to this router |

Here's an example of the router configuration

```
config

    authority

        router  router1
            name    router1

            system

                monitoring
                    enabled       true
                    agent-config  my-agent
                exit
            exit
        exit
    exit
exit
```

## Supported Inputs

The monitoring-agent comes pre-packaged with a set of collectors to assist in the monitoring of the SSR platform. Here are the various collectors and how to use them:

### Metric

The `metrics` input is responsible for collecting the configured metrics from a running system. The various configuration options available under `authority > monitoring > input > metrics` are as follows:

| Element            | Type      | Description                                                                            |
| ------------------ | --------- | -------------------------------------------------------------------------------------- |
| use-default-config | boolean   | Whether to use the set of builtin metrics as recommended by the SSR for monitoring |
| metric             | list      | List of metrics                                                                        |
| metric > name      | string    | The desired name of the metric to include in the telegraf                              |
| metric > id        | metric-id | The ID of the metric as it exists in the REST API                                      |
| filter             | list      | List of parameter values that should be included in the output                         |
| filter > parameter | string    | The name of the parameter being referenced                                             |
| filter > value     | leaf-list | The list of values to be included in the match                                         |

An example configuration of the metrics input looks as follows:

```config
config

    authority

        monitoring

            input  bandwidth-metrics
                name     bandwidth-metrics
                type     metrics

                metrics
                    use-default-config  false

                    metric              internet-rx-bandwidth stats/aggregate-session/service/bandwidth-received
                        name  internet-rx-bandwidth
                        id    stats/aggregate-session/service/bandwidth-received
                    exit

                    metric              internet-tx-bandwidth stats/aggregate-session/service/bandwidth-received
                        name  internet-tx-bandwidth
                        id    stats/aggregate-session/service/bandwidth-received
                    exit

                    filter              service
                        parameter  service
                        value      internet
                    exit
                exit
            exit
        exit
    exit
exit
```

:::note
Please refer to [metric collector](concepts_monitoring.md#metric-collector) for more details about the input.
:::

### Event

The `event` input can be used for collecting and pushing events for various categories such as admin, alarm, system, traffic and provisioning as they occur on the system. The various configuration options available under `authority > monitoring > input > event` are as follows:

| Element      | Type    | Default | Description                                                                        |
| ------------ | ------- | ------- | ---------------------------------------------------------------------------------- |
| admin        | boolean | true    | Include admin events generated by the system                                       |
| audit        | boolean | true    | Include audit events generated by the system                                       |
| alarm        | boolean | true    | Include alarm events generated by the system                                       |
| traffic      | boolean | true    | Include traffic events generated by the system                                     |
| provisioning | boolean | true    | Include provisioning events generated by the system                                |
| system       | boolean | true    | Include system events generated by the system                                      |
| track-index  | boolean | true    | Enable best effort tracking of events generated while the output cannot be reached |

:::note
The events described above need to be enabled for the router under `authority > router > system > audit` for the event input to be able to collect and push those events.
:::

An example configuration for events inputs is as below
```config
config

    authority

        monitoring

            input  events
                name               events
                type               events

                event
                    admin         true
                    audit         false
                    alarm         true
                    traffic       false
                    provisioning  false
                    system        false
                exit
            exit
        exit
    exit
exit
```

:::note
Please refer to [event collector](concepts_monitoring.md#event-collector) for more details about the input.
:::

### Device Interface State

The `device-state` input can be used for monitoring the admin, oper, provisional, and redundancy status of various device-interfaces configured on the node. The various configuration options available under `authority > monitoring > input > device-interface` are as follows:

| Element   | Type      | Description                                                                                                         |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------------- |
| interface | leaf-list | Device interface names to be included in the collection. Empty list implies all configured interfaces are collected |

The example configuration for `device-state` input is as shown below
```config
config

    authority

        monitoring

            input  device-state
                name              device-state

                tags              my-tag
                    tag    my-tag
                    value  my-value
                exit

                type              device-interface

                device-interface
                    interface  wan1
                exit
            exit
        exit
    exit
exit
```

:::note
Please refer to [device interface state collector](concepts_monitoring.md#device-interface-state-collector) for more details about the input.
:::

### Peer Path State

The `peer-path` input can be used for monitoring the up/down status of all the peer paths on the node. The various configuration options available under `authority > monitoring > input > peer-path` are as follows:


| Element           | Type      | Description                                                                                                          |
| ----------------- | --------- | -------------------------------------------------------------------------------------------------------------------- |
| network-interface | leaf-list | Network interface names to be included in the collection. Empty list implies all configured interfaces are collected |
| peer-router       | leaf-list | Peer routers to be included in the collection. Empty list implies all configured peer routers are collected          |

The example configuration for `peer-path` input is as shown below
```config
config

    authority

        monitoring

            input  peer-paths
                name       peer-paths
                type       peer-path

                peer-path
                    network-interface  dpdk3
                exit
            exit
        exit
    exit
exit
```

:::note
Please refer to [peer path state collector](concepts_monitoring.md#peer-path-state-collector) for more details about the input.
:::

### Arp State

The `arp-state` input can be used for monitoring the arp table status of a network interface configured on the node. The various configuration options available under `authority > monitoring > input > arp` are as follows:

| Element           | Type      | Description                                                                                                          |
| ----------------- | --------- | -------------------------------------------------------------------------------------------------------------------- |
| device-interface  | leaf-list | Device interface names to be included in the collection. Empty list implies all configured interfaces are collected  |
| network-interface | leaf-list | Network interface names to be included in the collection. Empty list implies all configured interfaces are collected |

The example configuration for `arp` input is as shown below
```config
config

    authority

        monitoring

            input  arp-state
                name  arp-state
                type  arp

                arp
                    device-interface  dpdk3
                exit
            exit
        exit
    exit
exit
```

:::note
Please refer to [arp state collector](concepts_monitoring.md#arp-state-collector) for more details about the input.
:::

### LTE

The `lte` input can be used for pushing the `signal-strength` and `carrier` information to the monitoring stack. It can be enabled by setting `authority > monitoring > input > type` as lte

```config
config

    authority

        monitoring

            input  lte-test
                name  lte-collector
                type  lte
            exit
        exit
    exit
exit
```

:::note
Please refer to [LTE collector](concepts_monitoring.md#lte-collector) for more details about the input.
:::

### Top Analytics

The top analytics input can be used for monitoring the top sources, top sessions and top applications on the router.

#### Top Sessions
The input type of `top-sessions` can be used to enable the top-sessions configuration. An example of such configuration is as follows:

```config
config

    authority

        monitoring

            input  top-sessions
                name  top-sessions
                type  top-sessions
            exit
        exit
    exit
exit
```

#### Top Sources
The `top-sources` input can be used to configure the various aspects of the top sources API on the system. The various configuration options available under `authority > monitoring > input > top-sources` are as follows:


| Element  | Type        | Default    | Description                                                                               |
| -------- | ----------- | ---------- | ----------------------------------------------------------------------------------------- |
| max-rows | uint32      | 10         | The maximum number of rows to be collected per sample                                     |
| category | enumeration | total-data | Controls how the top sources are determined. Options are `session-count` and `total-data` |

An example configuration is as follows:

```config
config

    authority

        monitoring

            input  top-sources
                name         top-sources
                type         top-sources

                top-sources
                    max-rows  10
                    category  session-count
                exit
            exit
        exit
    exit
exit
```

#### Top Applications
The monitoring agent `top-applications` input can be used to configure various aspects of the API on the system. The various configuration options available under `authority > monitoring > input > top-applications` are as follows:

| Element            | Type   | Default | Description                                                       |
| ------------------ | ------ | ------- | ----------------------------------------------------------------- |
| max-rows           | uint32 | 10      | The maximum number of rows to be collected per sample             |
| min-session-count  | uint32 | 1       | The minimum number of sessions for an application to be collected |
| application-filter | string | -       | Restrict the applications to be included in the collection        |

An example of the top applications configuration is as follows:

```config
config

    authority

        monitoring

            input  top-apps
                name              top-apps
                type              top-applications

                top-applications
                    max-rows           10
                    min-session-count  5
                exit
            exit
        exit
    exit
exit
```

:::note
Please refer to [top analytics collector](concepts_monitoring.md#top-analytics-collector) for more details about the input.
:::

### GraphQL

The `graphql` input can be used to retrieve data from a GraphQL API. The various configuration options available under `authority > monitoring > input > graphql` are as follows:

| Element            | Type   | Description                                                       |
| ------------------ | ------ | ----------------------------------------------------------------- |
| query-entry-point     | string | The path to a point in the graphQL tree from which fields and tags will be extracted. This path may contain (`<key>:<value>`) graphQL arguments such as (name:'$\{ROUTER\}').|
| extract-field         | list   | List of leaf nodes to be collected from query response as fields |
| extract-field > name  | string | The name of the field |
| extract-field > value | string | The graphQL query path from which to extract the value. The path can be relative to the entry-point or absolute. If the path is absolute, it cannot diverge from the entry point path and must exclude graphQL arguments |
| extract-tag           | list   | List of leaf nodes to be collected from query response as tags |
| extract-tag > name    | string | The name of the tag |
| extract-tag > value   | string | The graphQL query path from which to extract the value. The path can be relative to the entry-point or absolute. If the path is absolute, it cannot diverge from the entry point path and must exclude graphQL arguments |

An example configuration using can be seen as below
```
config

    authority

        monitoring

            input  graph
                name     graph
                type     graphql

                graphql
                    query-entry-point  allRouters(name:'${ROUTER}')/nodes/nodes(name:'${NODE}')/nodes/deviceInterfaces/nodes

                    extract-field      enabled
                        name   enabled
                        value  enabled
                    exit

                    extract-field      interface-count
                        name   interface-count
                        value  allRouters/nodes/nodes/nodes/deviceInterfaces/totalCount
                    exit

                    extract-tag        router-name
                        name   router-name
                        value  allRouters/nodes/name
                    exit

                    extract-tag        name
                        name   name
                        value  name
                    exit

                    extract-tag        type
                        name   type
                        value  type
                    exit

                    extract-tag        admin-status
                        name   admin-status
                        value  state/adminStatus
                    exit
                exit
            exit
        exit
    exit
exit
```

:::note
Please refer to [GraphQL collector](concepts_monitoring.md#graphql-collector) for more details about the input.
:::

#### GraphQL variables
The new variable substitution scheme allows for GraphQL based queries to be executed on the router to obtain useful information to be included as tags. For example, the scheme can be used to periodically send the entitlements information or use a config description field as a tag for some inputs. The monitoring agent plugin provides a mechanism to configure such variables as shown in in the example below

```config
config

    authority

        monitoring

            agent-config  my-agent
                name             my-agent

                variables        entitlement
                    variable  entitlement
                    query     allRouters(name:${ROUTER})/nodes/entitlement/id
                exit
            exit
        exit
    exit
exit
```

When configuring the variables on the file system, the agent configuration can include the variables as follows:

Path: `/etc/128t-monitoring/config.yaml`

```yaml
enabled: true
variables:
  - name: ENTITLEMENT
    query: allRouters(name:"${ROUTER}")/nodes/entitlement/id
  - name: DESCRIPTION
    query: allRouters(name:"${ROUTER}")/nodes/nodes(name:"${NODE}")/nodes/deviceInterfaces(name:"10")/nodes/description
```


### Session Records

The monitoring agent `session-records` input can be used to generate session records on the system.

:::note
The session record input is only compatible with SSR >= 5.4.0.
:::

The various configuration options available under authority > monitoring > input > session-records are as follows:

| Element               | Type   | Default | Description                                                                          |
| --------------------- | ------ | ------- | -------------------------------------------------------------------------------------|
| include-all-records   | string | true    | Whether to include all the session records generated by the system.                  |
| record-type           | list   | empty   | List of valid session record type such as create, intermediate, modify, close, error |


:::note
Please refer to [session-record collector](concepts_monitoring.md#session-records-collector) for more details about the input.
:::

## SSR Processors

Processors are not currently exposed explicitly in the plugin config, but they can be achieved through an input's [additional config](#input-configuration).

:::note
Please refer to the [ssr processors](concepts_monitoring.md#ssr-processors) documentation for examples and sample config.
:::

## Outputs

### Local Filesystem

Configuring the file output will write metrics to the local filesystem. This can be useful for testing or as a backup data source in case network connectivity issues prevent data from reaching the intended collection endpoint.

The file output is one of the built in available types for the monitoring agent plugin. The various configuration options available under `authority > monitoring > output > file` are as follows:

| Element               | Type     | Description                                                                  |
| --------------------- | -------- | ---------------------------------------------------------------------------- |
| file                  | list     | Either `stdout` or absolute path to file on disk                             |
| rotation-interval     | duration | The file(s) will be rotated at the specified interval                        |
| rotation-max-size     | uint32   | The file(s) will be rotated when it becomes larger than the configured size. |
| rotation-max-archives | unit32   | The maximum number of archives to keep when the file(s) is rotated.          |

An example configuration for file output looks as follows:

```config
config

    authority

        monitoring

            output  file
                name  file
                type  file

                file
                    file                   stdout
                    file                   /tmp/foobar
                    rotation-interval      12h
                    rotation-max-size      100
                    rotation-max-archives  5
                exit
            exit
        exit
    exit
exit
```

The monitoring configuration corresponds to the following telegraf configuration.

Path: `/var/lib/128t-monitoring/outputs/file.conf`

```toml
[[outputs.file]]
  ## Files to write to, "stdout" is a specially handled file.
  files = ["stdout", "/tmp/metrics.out"]

  ## Use batch serialization format instead of line based delimiting.  The
  ## batch format allows for the production of non line based output formats and
  ## may more efficiently encode metric groups.
  # use_batch_format = false

  ## The file will be rotated after the time interval specified.  When set
  ## to 0 no time based rotation is performed.
  # rotation_interval = "0d"

  ## The logfile will be rotated when it becomes larger than the specified
  ## size.  When set to 0 no size based rotation is performed.
  # rotation_max_size = "0MB"

  ## Maximum number of rotated archives to keep, any older logs are deleted.
  ## If set to -1, no archives are removed.
  # rotation_max_archives = 5

  ## Data format to output.
  ## Each data format has its own unique set of configuration options, read
  ## more about them here:
  ## https://github.com/influxdata/telegraf/blob/master/docs/DATA_FORMATS_OUTPUT.md
  data_format = "influx"
```

### Kafka

The `kafka` output is one of the built in available types for the monitoring agent plugin. The various configuration options available under `authority > monitoring > output > kafka` are as follows:

| Element           | Type                      | Description                                                                      |
| ----------------- | ------------------------- | -------------------------------------------------------------------------------- |
| broker            | list                      | List of Kafka broker(s) to communicate with                                      |
| broker > host     | ip-address or domain name | The address or domain name for the Kafka broker                                  |
| broker > port     | l4-port                   | The port number for the Kafka broker                                             |
| compression-codec | enumeration               | The compression codec to be used for communicating with Kafka                    |
| max-retry         | unit32                    | The maximum number of times to retry before failing until the next push interval |
| topic             | string                    | The Kafka topic to produce messages for                                          |

Here's an example monitoring config for `kafka` output
```
config

    authority

        monitoring

            output  kafka
                name               kafka
                type               kafka
                data-format        json

                kafka

                    broker  192.168.1.7 9092
                        host  192.168.1.7
                        port  9092
                    exit
                    topic   test
                exit
                additional-config  (text/toml)
            exit
        exit
    exit
exit
```

This example sends data to a Kafka broker:

Path: `/var/lib/128t-monitoring/outputs/kafka.conf`

```toml
[[outputs.kafka]]
  ## URLs of kafka brokers
  brokers = ["<ip>:9092"]
  ## Kafka topic for producer messages
  topic = "telegraf"
  max_retry = 3
  data_format = "json"
```

### Syslog

The `syslog` output is one of the built in available types for the monitoring agent plugin. The various configuration options available under `authority > monitoring > output > syslog` are as follows:

| Element               | Type     | Description                                                                     |
| --------------------- | -------- | ------------------------------------------------------------------------------- |
| address               | uri      | The URL to the syslog server. For example tcp://127.0.0.1:8094                  |
| default-severity-code | uint8    | Default severity code to be used when severity_code metric field is not present |
| default-facility-code | uint8    | Default severity code to be used when severity_code metric field is not present |
| sdid                  | string   | The default Syslog SDID to be used for fields and tags                          |
| tcp-keep-alive-period | duration | Period between TCP keep alive probes                                            |

Here's an example monitoring plugin config for `syslog` output
```config
config

    authority

        monitoring

            output  syslog
                name    syslog
                type    syslog

                syslog
                    address                tcp://localhost:514
                    default-severity-code  3
                    default-facility-code  20
                exit
            exit
        exit
    exit
exit
```

In this example data is sent via syslog:

Path: `/var/lib/128t-monitoring/outputs/syslog.conf`

```toml
[[outputs.syslog]]
  address = "udp://<ip>:514"
  default_sdid = "128T"
```

:::important
For syslog output, not specifying the `default_sdid` parameter can result in empty or truncated messages
:::

## Monitoring Agent Plugin Release Notes

### Release 5.0.0

#### New Features and Improvements

Support for install and upgrade of a customized upstream Linux-based SSR OS distribution for 7.0 and above.

:::note
On conductor, the plugin will auto upgrade to this version when upgrading from 6.x to 7.x version of SSR software. In addition, all routers will also be auto upgraded to their respective Oracle Linux 7 or Oracle Linux 9 plugin version depending on the SSR version running on the device.
:::


**Release Date:** Oct 13, 2025

### Release 4.1.1

**Release Date:** Jun 11, 2025

#### Issues Fixed

- **PLUGIN-3029** Errors configuring metric-id with monitoring-agent metric input

    _**Resolution**_ The regular expression for metric-id was adjusted to work correctly with UI and PCLI.

- **WAN-4111** Race condition in index updates can cause events to be incorrectly retransmitted

    _**Resolution**_ The SSR now reliably tracks and persists the highest observed index to eliminate the race condition.

### Release 4.1.0

**Release Date:** Apr 30, 2025

#### New Features and Improvements:

- **I95-58843** Version agnostic HTTP input for SSR input APIs

The monitoring-agent t128_http input prefers socket based HTTP APIs over legacy implementations.

- **PLUGIN-2628** The CPU collector performance has been improved for SSR >= 6.3

The CPU collector now monitors a static set of datapath and control cores, reducing the collection time of the data.

#### Issues Fixed

- **WAN-4027** Resolve defunct telegraf instances on system startup

### Release 4.0.1

**Release Date:** Oct 31, 2024

#### Issues Fixed

- **PLUGIN-2721** Resolve on plugin downgrade config removal

### Release 4.0.0

Image based install and upgrade (IBU) support for SSR 6.3.0.

**Release Date:** Sep 30, 2024

### Release 3.0.5

**Release Date:** Dec 14, 2023

**Router Version**
- 128T-monitoring-agent-plugin-router-1.1.10-2
- 128T-monitoring-agent-3.8.9-1

#### New Features and Improvements:

- **PLUGIN-630** Report additional LTE metrics

The [LTE collector](concepts_monitoring.md#lte-collector) now includes additional information such as `carrier`, `connection-status`, `active-band-class`, `apn`, `service-mode` and `service-status`.

- **PLUGIN-2275** Introduced `timeout` argument for `run-once` command

A new `timeout` argument is added for the `run-once` testing tool provided by `monitoring-agent-cli` to control how long the input waits to complete its data completion.

#### Issues Fixed ####
  - **PLUGIN-2069 Disabling monitoring agent does not stop the collection services**

    _**Resolution**_ The various monitoring agent services are now correctly stopped when the plugin is disabled or uninstalled.

  - **PLUGIN-2274 Monitoring Agent Plugin incorrectly allows the `data-format` option on some outputs.**

    _**Resolution**_ For syslog output, the `data-format` option will no longer be allowed to avoid user confusion.

  - **I95-52139 High memory reported when using the cpu collector**

    _**Resolution**_ The underlying memory leak for the CPU collector has been fixed to resolve the high memory condition.

  - **PLUGIN-2272 The `include-output` configuration causes duplicated config to be added to the generated config**

    _**Resolution**_ The code generation logic handles multiple `include-output` requests correctly and resolves the duplication in the generated config.

  - **I95-53604 Router syslog output is sometimes malformed**

    _**Resolution**_ When an input uses multiple syslog outputs, the data corruption caused by message serialization code has been addressed.

  - **WAN-1714 Dataplane CPU shows incorrect data for core utilization on node0**

    _**Resolution**_ The cpu collector handles various edge cases with missing data, IDP enabled, etc., when reporting the core utilization statistics.

  - **I95-43137 Session Records not sent correctly in syslog output**

    _**Resolution**_ The syslog message parsing was improved to correctly handle the JSON output format produced by session records input.

### Release 2.2.0

**Release Date:** Oct 25, 2022

**Router Version**
- 128T-monitoring-agent-plugin-router-1.1.0-4
- 128T-monitoring-agent-3.7.3-3

#### Issues Fixed ####
  - **PLUGIN-1902** Monitoring agent plugin fails to generate the metric input

    _**Resolution**_ Improved the handling of default values when processing the monitoring agent metrics input configuration

  - **PLUGIN-1903** Monitoring configuration does not work for milliseconds sampling and push interval

    _**Resolution**_ The validation for the sampling and push interval no longer allows the invalid interval values in milliseconds, microseconds and nanoseconds

  - **WAN-1449** The cpu state collector does not report correct values for IDP data core

    _**Resolution**_ The query for retrieving the IDP data core usage is corrected to handle some errors more gracefully

### Release 2.1.0

**Release Date:** Jun 24, 2022

#### New Features and Improvements:
  - **MON-391** Add support for tech support info collection for all monitoring agent components
  - **MON-389** Add support for adjacent hostname in the peer-path collector

#### Issues Fixed ####
  - **PLUGIN-1729** Monitoring agent service stopped sending metrics

    _**Resolution**_ The monitoring agent service will now be stopped gracefully before upgrades and will automatically restart after upgrade

### Release 2.0.3

#### New Features and Improvements:
 - **PLUGIN-1163** Updated the plugin to use the latest monitoring agent version.

### Release 2.0.1

#### New Features and Improvements:
 - **MON-352** Updated the plugin to use the latest monitoring agent version.

### Release 2.0.0

#### New Features and Improvements:
 - **PLUGIN-667** Introduce a new monitoring agent plugin to better manage the monitoring agent through the GUI and PCLI. Some key highlights are:
 * Support all the SSR developed collectors such as metrics, events, top-sessions, etc.
 * Support the most commonly used outputs such as file, syslog, `Kafka`, etc.
 * Support multi-line input fields for generic telegraf configuration with TOML syntax validation.
