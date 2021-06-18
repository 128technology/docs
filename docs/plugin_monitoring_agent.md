---
title: 128T Monitoring Agent
sidebar_label: Monitoring Agent
---

The 128T Monitoring Agent is an entity for collecting data from a node running 128T software and to push it to a collector. It is capable of collecting the data from several sources such as metrics, events etc. The current mechanism of monitoring a 128T router involves performing REST or GraphQL queries from the conductor. At scale, this can become inefficient and be problematic in terms of the performance of the conductor. Additionally it is important to interact with 3rd party monitoring platforms as means for organizations to collect, analyze and report using various KPIs available from 128T software and other application in the network.

The monitoring agent at its core is designed to be able to push data to external platforms. It currently leverages the [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/) collection stack on every 128T router. However, the monitoring agent is designed with other tools and scale in mind. The monitoring agent is composed of the following:

- **monitoring-agent-cli**  
  Used for configuring and interacting with the underlying application

- **collectors**  
  A set of inputs designed to collect data from several sources such as metrics, events etc.

- **targets**  
  A set of outputs for collecting and pushing the data to various data sinks such as external monitoring platforms, files on disk etc.

## Installation

### Plugin
For deployments running 128T version `5.1.0` or greater on the conductor, install the monitoring agent plugin for configuration management.

:::note
The instructions for installing and managing the plugin can be found [here](plugin_intro.md#installation-and-management).
:::

### Manual installation
The 128T Monitoring Agent can be obtained from the official 128T software repository. The latest 128T-monitoring-agent should always be used and is compatible with `128T >= 4.1.0`

:::important  
Monitoring Agent 3.X deprecates prior releases and is compatible with all previously supported 128T versions. It should be preferred for new installations and upgrades.  
:::

The agent can be install using the `dnf` utility.

```console
dnf install 128T-monitoring-agent
```

## Configuration

### Plugin Configuration
With the plugin installed, the configuration for the monitoring agent can be managed via the conductor. The general workflow for creating the configuration is as follows:

- Configure the inputs
- Configure the outputs
- Create an agent config profile
- Reference the profile on the router

#### Input Configuration
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

#### Output configuration
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

#### Agent Configuration
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

#### Router configuration
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
### File based configuration 
#### Version History

| Release      | Modification                                                    |
| ------------ | --------------------------------------------------------------- |
| 3.3.1        | runtime environment `name` was introduced                       |
| 3.0.0        | per input `sample-interval` and `push-interval` were introduced |
| 1.2.0, 2.1.0 | `lib-directory` was introduced                                  |

The monitoring agent has its own set of configurations and looks for inputs from specific directories on disk. By default, the configuration for the agent should be present in `/etc/128t-monitoring/config.yaml` and uses YAML format which looks something like this:

```yaml
name: user-agent
enabled: true
lib-directory: /var/lib/128t-monitoring
tags:
  - key: router
    value: ${ROUTER}
sample-interval: 60
push-interval: 300
inputs:
  - name: events
  - name: t128_metrics
    include-outputs: [message_queue]
  - name: t128_device_state
    sample-interval: 30
    push-interval: 90
  - name: t128_peer_path
  - name: lte_metric
    exclude-outputs: [file]
outputs:
  - name: file
  - name: message_queue
```

When multiple instances of the Monitoring Agent are running, two inputs with the same name can collide (be started/stopped/reconfigured by both instances) even if they are listed in separate `config.yaml` files. By default, the name of the directory containing the config file will be used as the name of the environment in order to distinguish them. Alternatively, the config `name` field can be explicitly specified to identify the unique environment.

The `enabled` field is meant as global toggle for applying the monitoring agent functionality. When set to `disabled` the monitoring agent will remain dormant on the 128T.

`lib-directory` is the root directory for the Monitoring Agent. Other directores exist relative to it. This is useful when intending to isolate a set of Monitoring Agent elements from others.

Each of the `tags`, a collection of key/value pairs, are used to add meta information to the collected metrics. This data makes it easier to identify the origin, and to provide filtering by the collectors. By default, the agent includes the `${HOSTNAME}`, `${ROUTER}` and `${NODE}` tags to every collected input. The corresponding values are derived from the running system. The same config can ideally be used for each node in the authority, as their respective values are evaluated at runtime.

`sample-interval` and `push-interval` indicate the frequency (in seconds) for how often the data is collected and subsequently pushed to the collection target. When the `push-interval` value is greater than the `sample-interval`, the agent will produce `ceiling(push-interval/sample-interval)` samples collected within the push duration. It is recommended to configure the `push-interval` as a multiple of `sample-interval`. These values can be overridden at the input level for finer control of agent's behavior.

The `inputs` represent a single unit of collection. This can be a combination of inputs available from `telegraf` as well as other inputs developed by 128T. The function and configuration of each of the 128T provided inputs can be found in subsequent sections. For `telegraf` inputs please refer to the [influx documentation online](https://docs.influxdata.com/telegraf/v1.13/plugins/plugin-list/#input-plugins). Each `input` can be a combination of one or more collectors and can contain other collector specific information. For each of the inputs, a user can also configure an `include-outputs` which is a list of outputs to send the collected information to. This allows the user to build a matrix of inputs and outputs and provides a granular control over which input should be sent to what output. Similarly, the user can also configure an `exclude-outputs` which will include all defined outputs except the one specified.

The `outputs` represent a data sink where the collected information is to be delivered. By virtue of using `telegraf`, the monitoring agent gets automatic support of the [available outputs supported by telegraf](https://docs.influxdata.com/telegraf/v1.13/plugins/plugin-list/#output-plugins). Each `input` can be configured to be delivered to one or more `output`.

## Directory Structure

The `monitoring-agent` uses a well-defined directory structure where it derives the inputs from various configuration. As described above, the base of the directory structure can be specified using the `lib-directory` configuration field. Directories exist relative to that one. The following directories are especially important:

### Inputs

Path: `/var/lib/128t-monitoring/inputs/`

The `inputs` directory contains config files for the various inputs that are enabled in the monitoring-agent configuration. The monitoring agent expects to see a file called `<input-name.conf>` in this directory. Users can override the file name by specifying `conf: <filename.conf>` in the input definition within the config above. This file should only contain the telegraf definition for the input(s) that belong and not any other configuration. Configuration for all the 128T inputs will automatically be staged in the inputs directory. See the Config Examples section below for more details.

### Outputs

Path: `/var/lib/128t-monitoring/outputs/`

The `outputs` directory will contain the config files for the various data sink configured in the monitoring-agent configuration. For each `output` the conf file should contain the telegraf configuration for that one output only. This allows the monitoring-agent to create a telegraf config per input and include the appropriate outputs.

### Config

Path: `/var/lib/128t-monitoring/config`

The `config` directory contains the fully formed telegraf config files created by the monitoring agent. These file are generated based on the contents of `config.yaml` and the `inputs` and `outputs` directories.

For example, using the `t128_events` input and the `file` output in the examples section below will result in a configuration file such as:

```toml
[global_tags]
router = "lte-router"
node = "lte-node"

[agent]
interval = 10
flush_interval = 20

[inputs]
[[inputs.execd]]
command = [ "/usr/bin/eventCollector128t", "--log-name", "event_collector", "--topic", "events", "--index-file", "/tmp/events.index",]
signal = "none"
data_format = "influx"

[inputs.execd.tagpass]
type = [ "admin",]

[outputs]
[[outputs.file]]
files = ["stdout", "/tmp/metrics.out"]
data_format = "influx"
```

:::important  
Users should not make changes to these files as they will be overwritten by the `monitoring-agent-cli configure` command.  
:::

### Samples

`/var/lib/128t-monitoring/samples/`

The `samples` directory contains example configurations for the included 128T collectors. You can also display these using the [`monitoring-agent-cli`](#sample-config).

## Config Examples

The following examples higlight just a few ways the monitoring agent can be configured. Be sure to reference the Telegraf documentation for the full ecosystem of input and outputs that are supported.

### Inputs

#### t128_metrics

This example configures the `t128_metrics` collector to gather a set of default metrics from the 128T. This file is also included in the samples directory.

Path: `/var/lib/128t-monitoring/inputs/t128_metrics.conf`

```toml
[[inputs.t128_metrics]]
    ## When configured, the metric collector input will pull KPIs from the 128T system
    ## running on the current node. Depending on the KPI, the information can be used for
    ## monitoring various aspects of the running system such as services, interfaces, errors etc.

    ## By default, if no configuration is present, the set of metrics defined in
    ## /etc/128t-monitoring/collectors/t128_metrics/default_config.toml will be used
    ## for monitoring. Here's a sample configuration on how to define custom metrics.
    ##
    ## [[inputs.t128_metrics.metric]]
    ## name = "service"
    ##
    ## [inputs.t128_metrics.metric.fields]
    ## Refer to the 128T REST swagger documentation for the list of available metrics
    ##     key_name = "stats/<path_to_metric>"
    ##     packets-received = "stats/aggregate-session/service/packets-received"
    ##
    ## [inputs.t128_metrics.metric.parameters]
    ##     parameter_name = ["value1", "value2"]
    ##     service = ["service1"]

    timeout = "15s"
```

:::tip  
Depending on the number of metrics you have enabled, you may need to increase the timeout to allow collection to complete. This can also influence your minimum polling interval.  
:::

#### Linux System

This example gathers cpu, disk, and memory metrics from the linux host using native telegraf collectors:

Path: `/var/lib/128t-monitoring/inputs/system.conf`

```toml
[[inputs.cpu]]
  ## Whether to report per-cpu stats or not
  percpu = true
  ## Whether to report total system cpu stats or not
  totalcpu = true
  ## If true, collect raw CPU time metrics.
  collect_cpu_time = false
  ## If true, compute and report the sum of all non-idle CPU states.
  report_active = false

[[inputs.disk]]
  ## Ignore mount points by filesystem type.
  ignore_fs = ["tmpfs", "devtmpfs", "devfs", "iso9660", "overlay", "aufs", "squashfs"]

[[inputs.mem]]
```

### Outputs

#### Local Filesystem

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

#### Kafka

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

#### Syslog

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

### Variable Replacement

#### Version History
| Release | Modification                            |
| ------- | --------------------------------------- |
| 3.3.3   | GraphQL based variables were introduced |

#### Builtin variables
Within an **input** configuration, several variables have been made available for substitution.

| Value             | Meaning                                           | Version Introduced |
| ----------------- | ------------------------------------------------- | ------------------ |
| `${ROUTER}`       | The router name of the running 128T instance      | 3.0.0              |
| `${NODE}`         | The node name of the running 128T instance        | 3.0.0              |
| `${128T_VERSION}` | The version of the running 128T instance          | 3.0.0              |
| `${WEB_PORT}`     | A local port that can be used to access 128T APIs | 3.0.0              |

An example of this would be:

```console
$ cat /var/lib/128t-monitoring/inputs/example.conf
[[inputs.example]]
  version = "${128T_VERSION}"

$ monitoring-agent-cli generate --force
Generating example

$ cat /var/lib/128t-monitoring/config/example.conf
[global_tags]
host = "${HOSTNAME}"

[agent]
interval = 1
flush_interval = 1

[inputs]
[[inputs.example]]
version = "5.0.0"

[outputs]
[[outputs.file]]
files = [ "/tmp/test.out",]
```

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
## Monitoring Agent CLI

The `monitoring-agent-cli` is a utility for validating and executing the configuration for the monitoring-agent. The various components of the CLI as follows:

### Validation

The `monitoring-agent validate` command will ensure that the monitoring-agent config along with other inputs and outputs are correctly setup and flag any particular errors to the user. The `validate` command will not make any changes to the running system.

### Sample Config

The `monitoring-agent-cli sample` command can be used to view the various collectors that are created as part of the 128T monitoring agent. The `list-available` command will simply show the set of available inputs (and outputs) that are packaged as part of the 128T monitoring-agent. These are in addition to the ones available natively via telegraf. For example:

```console
# monitoring-agent-cli sample list-available
inputs:
- t128_device_state
- t128_metrics
- t128_peer_path
- t128_events
- t128_lte_metric
- t128_top_analytics
```

The configuration for each of these inputs can be viewed via `monitoring-agent-cli sample view <plugin_name>` command such as:

```console
# monitoring-agent-cli sample view t128_metrics
[[inputs.t128_metrics]]
    ## When configured, the metric collector input will pull KPIs from the 128T system
    ## running on the current node. Depending on the KPI, the information can be used for
    ## monitoring various aspects of the running system such as services, interfaces, errors etc.

    ## By default, if no configuration is present, the set of metrics defined in
    ## /etc/128t-monitoring/collectors/t128_metrics/default_config.toml will be used
    ## for monitoring. Here's a sample configuration on how to define custom metrics.
    ##
    ## [[inputs.t128_metric.metric]]
    ## name = "service"
    ##
    ## [inputs.t128_metric.metric.fields]
    ## Refer to the 128T REST swagger documentation for the list of available metrics
    ##     key_name = "stats/<path_to_metric>"
    ##     packets-received = "stats/aggregate-session/service/packets-received"
    ##
    ## [inputs.t128_metric.metric.parameters]
    ##     parameter_name = ["value1", "value2"]
    ##     service = ["service1"]
```

### Generation

The `monitoring-agent-cli generate` command can be used to (re-)generate the telegraf configuration files. This command does not restart the telegraf services and is a good way to pre-stage configuration for testing.

```console
# monitoring-agent-cli generate
The command does not start/restart 128T-telegraf services but can still impact already running instances. Do you want to continue? [Y/n]: y
Generating t128_top_analytics
Generating t128_device_state
```

### Configuration

When the `monitoring-agent-cli configure` command is run, it will first validate and report any errors to the user. Once valid configuration is in place, the configure command does the following at a high level:

- For each of the configured and enabled inputs, generate a telegraf config file in the `/var/lib/128t-monitoring/config` directory

- Launch an instance of the `128T-telegraf` service for each of the configured inputs which allows us to collect each input independently.

At this point, each input will be running a telegraf instance and will allow the collection of inputs & outputs to run on the system.

### Testing and Validation

Once the Monitoring Agent has configured and started the `128T-telegraf`services, you can use the command `systemctl list-units 128T-telegraf*` to list them out.

```console
# systemctl list-units 128T-telegraf*
UNIT                                    LOAD   ACTIVE SUB     DESCRIPTION
128T-telegraf@events.service            loaded active running 128T telegraf service for events
128T-telegraf@system.service            loaded active running 128T telegraf service for system
128T-telegraf@t128_device_state.service loaded active running 128T telegraf service for t128_device_state
128T-telegraf@t128_metrics.service      loaded active running 128T telegraf service for t128_metrics
128T-telegraf@t128_peer_path.service    loaded active running 128T telegraf service for t128_peer_path
```

Additionally, its often useful to test the input configuration before full rollout. This can be easily accomplished by the `test-input` command.

```console
# monitoring-agent-cli test-input t128_device_state
Testing input t128_device_state
2020-04-15T06:51:17Z I! Starting Telegraf 1.14.0
2020-04-15T06:51:17Z D! [agent] Initializing plugins
> device-interface-state,device-interface=dpdk1-lan,host=t127-dut2.openstacklocal,router=router1 adminStatus="ADMIN_UP",enabled=true,operationalStatus="OPER_UP",redundancyStatus="NON_REDUNDANT" 1586933478000000000
```

#### Version History

| Release | Modification                          |
| ------- | ------------------------------------- |
| 3.4.0   | `run-once` CLI command was introduced |
In order to run an input to the configured outputs end-to-end just once for validation, testing and debugging purposes, the `run-once` command can be used. This will execute the configured inputs and produce data to the outputs as specified in the monitoring agent configuration file.

```console
# monitoring-agent-cli run-once t128_metrics
Collecting t128_metrics and writing to outputs for input t128_metrics
2021-04-08T02:49:46Z I! Starting Telegraf 1.17.4
2021-04-08T02:49:46Z D! [agent] Initializing plugins
2021-04-08T02:49:46Z D! [sarama]  Initializing new client
2021-04-08T02:49:46Z D! [sarama] client/metadata fetching metadata for all topics from broker 192.168.1.7:9092
2021-04-08T02:49:46Z D! [sarama] Connected to broker at 192.168.1.7:9092 (unregistered)
2021-04-08T02:49:46Z D! [sarama] client/brokers registered new broker #1001 at kafka_1:9092
2021-04-08T02:49:46Z D! [sarama]  Successfully initialized new client
2021-04-08T02:49:46Z D! [agent] Connecting outputs
2021-04-08T02:49:46Z D! [agent] Attempting connection to [outputs.kafka]
2021-04-08T02:49:46Z D! [agent] Successfully connected to outputs.kafka
2021-04-08T02:49:46Z D! [agent] Starting service inputs
2021-04-08T02:49:46Z D! [agent] Stopping service inputs
2021-04-08T02:49:46Z D! [agent] Input channel closed
2021-04-08T02:49:46Z I! [agent] Hang on, flushing any cached metrics before shutdown
2021-04-08T02:49:46Z D! [sarama] producer/broker/1001 starting up
2021-04-08T02:49:46Z D! [sarama] producer/broker/1001 state change to [open] on test/0
2021-04-08T02:49:46Z D! [sarama] Connected to broker at kafka_1:9092 (registered as #1001)
2021-04-08T02:49:46Z D! [outputs.kafka] Wrote batch of 138 metrics in 8.298753ms
2021-04-08T02:49:46Z D! [outputs.kafka] Buffer fullness: 0 / 10000 metrics
2021-04-08T02:49:46Z D! [agent] Stopped Successfully
```

### Stopping Services

The `monitorinag-agent-cli stop` command can be used to stop `128T-telegraf` services launched by the `configure` command.

```console
# monitoring-agent-cli stop
Stopping telegraf service 128T-telegraf@t128_metrics.service
Stopping telegraf service 128T-telegraf@t128_events.service
Stopping telegraf service 128T-telegraf@t128_arp_state.service
Stopping telegraf service 128T-telegraf@t128_device_state.service
```

## 128T Collectors

The 128T monitoring-agent comes pre-packaged with a set of collectors to assist in the monitoring of the 128T platform. Here are the various collectors and how to use them:

### Metric collector

The `t128_metrics` input is responsible for collecting the configured metrics from a running system. By default, the metrics specified in `/etc/128t-monitoring/collectors/t128_metrics/default_config.toml` will be used by the collector. This represents a set of pre-configured metrics that 128T recommends a network operator to monitor. The various configuration options available under `authority > monitoring > input > metrics` are as follows:

| Element            | Type      | Description                                                                            |
| ------------------ | --------- | -------------------------------------------------------------------------------------- |
| use-default-config | boolean   | Whether to use the set of builtin metrics as recommended by 128T router for monitoring |
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

The configuration file in a `TOML` definition of metrics has the following format:

```toml
[[metric]]
  name = "service"
  [metric.fields]
    packets-received = "stats/aggregate-session/service/packets-received"
    packets-transmitted = "stats/aggregate-session/service/packets-transmitted"
    session-arrival-rate = "stats/aggregate-session/service/session-arrival-rate"
    session-departure-rate = "stats/aggregate-session/service/session-departure-rate"
    bandwidth-received = "stats/aggregate-session/service/bandwidth-received"
    bandwidth-transmitted = "stats/aggregate-session/service/bandwidth-transmitted"
    tcp-retransmissions = "stats/aggregate-session/service/tcp-retransmissions"
    session-count = "stats/aggregate-session/service/session-count"
  [metric.parameters]
    service = []
```

Each element of the configuration specifies an aspect of the [InfluxDB line protocol](https://docs.influxdata.com/influxdb/v1.8/write_protocols/line_protocol_tutorial/) or the [128T REST API](api_rest_4.2.0.md).

- **name**  
  The line protocol measurement to be used for the output

- **fields**  
  What line protocol fields should exist in the output

- **fields.key** (e.g. `packets-received`)  
  A line protocol field key that should exist in the output

- **fields.value** (e.g. `stats/aggregate-session/service/packets-received`)  
  The 128T KPI providing the value for the associated field key. See the [128T REST API documentation](api_rest_4.2.0.md) for a full list. Note that the documentation prefixes the KPIs with `/router/{router}/`.

- **parameters** (e.g. `service`)  
  The 128T parameters that should be preserved as line protocol tags in the output. When a non-empty list of values is provided for a parameter, only KPIs with matching parameters will be included in the output.

A custom set of metrics can be collected by configuring the `t128_metrics` input as described in the sample. The configuration follows the same structure as the default file, but the metrics are nested under the input.

```toml
[[inputs.t128_metrics]]
    [[inputs.t128_metrics.metric]]
      name = "disk"

    [[inputs.t128_metrics.metric.fields]]
      used = "stats/disk/used"
      capacity = "stats/disk/capacity"

    [[inputs.t128_metrics.metric.parameters]]
      disk = ["/"]
```

### Event Collector

#### Version History

| Release      | Modification                            |
| ------------ | --------------------------------------- |
| 1.2.0, 2.1.0 | `t128_events` input type was introduced |

The event collector can be used for collecting and pushing events for various categories such as admin, alarm, system, traffic and provisioning as they occur on the system. The type of the event is available via a `tag` and can be used for filtering only specific events as desired. For example, the following configuration can be used for pushing just the `alarm` and `admin` event. The various configuration options available under `authority > monitoring > input > event` are as follows:

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
The events described above need to be enabled for the router under `authority > router > system > audit` for the event collector to be able to collect and push those events.
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

The configuration file in a `TOML` definition of event collector has the following format:

```toml
[[inputs.t128_events]]
  ## Create a stream of 128T events for alarm, audit etc. This information is useful for
  ## monitoring the health of the system.

  ## A (unique) file to use for index tracking. This tracking allows each
  ## event to be produced once. By default, no tracking is used and events are
  ## produced starting from the point telegraf is launched.
  # index-file = "/var/lib/128t-monitoring/state/events.index"

  ## The name of the log file to produce to /var/log/128t-monitoring/<log-name>.log
  # log-name = "event_collector"

  ## The TANK topic to consume. Should be "events" or "offline_events".
  # topic = "events"

  ## input event filtering based on type (admin, alarm, system, traffic, provisioning)
  ## NOTE: For information on filtering severity refer to the output configuration example
  [inputs.t128_events.tagpass]
  type = ["alarm", "admin"]
```

:::important  
In versions 1.2.0, 2.1.0 and later, the more feature rich `t128_events` seen above should be used over the `execd` input version seen below. The config below should only be used with those older versions of the monitoring agent.  
:::

```toml
[[inputs.execd]]
  ## Create a stream of 128T events for alarm, audit etc. This information is useful for
  ## monitoring the health of the system.
  command = "/usr/bin/eventCollector128t"
  signal = "none"
  data_format = "influx"

  ## input event filtering based on type (admin, alarm, system, traffic, provisioning)
  ## NOTE: For information on filtering severity refer to the output configuration example
  [inputs.execd.tagpass]
  type = ["alarm", "admin"]
```

### Device Interface State Collector

#### Version History

| Release      | Modification                                                    |
| ------------ | --------------------------------------------------------------- |
| 3.3.1        | `t128_device_state` input type was introduced                   |
| 3.3.1        | `provisional-status` tag was added (available in 128T >= 4.5.3) |
| 1.2.1, 2.1.1 | `mac-address` tag was introduced                                |


The `t128_device_state` input can be used for monitoring the admin, oper, provisional, and redundancy status of various device-interfaces configured on the node. The device interface name is available as the `device-interface` tag and the mac address is available as the `mac-address` tag. The various configuration options available under `authority > monitoring > input > device-interface` are as follows:

| Element   | Type      | Description                                                                                                         |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------------- |
| interface | leaf-list | Device interface names to be included in the collection. Empty list implies all configured interfaces are collected |

The example configuration for `device-interface` collector is as shown below
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

The `TOML` definition of the configuration looks as below. Telegraf `tagpass` can be used to filter specific interfaces as needed. For example:

```toml
[[inputs.t128_device_state]]
  ## To filter on select device interfaces, you can use the `tagpass` and `tagdrop` concepts
  ## from telegraf. For example:
  ## [inputs.t128_device_state.tagpass]
  ##     device-interface = ["wan1"]
  ##     mac-address = ["00:0a:95:9d:68:16"]
```


:::important  
In versions 3.3.1 and later, the simplified `t128_device_state` seen above should be used over the `execd` input version seen below. The config below should only be used with those older versions of the monitoring agent.  
:::

```toml
[[inputs.exec]]
  ## Collect information about the 128T device-interface admin, operational and
  ## redundancy status. This information is useful for monitoring the system health.
  commands = ["/usr/bin/deviceInterfaceStateCollector128t"]

  ## Timeout for the device-interface state collector to finish
  timeout = "5s"

  ## Data format to consume.
  ## Each data format has its own unique set of configuration options, read
  ## more about them here:
  ## https://github.com/influxdata/telegraf/blob/master/docs/DATA_FORMATS_INPUT.md
  data_format = "influx"

  ## To filter on select device interfaces, you can use the `tagpass` and `tagdrop` concepts
  ## from telegraf. For example:
  ## [[inputs.exec.tagpass]]
  ##     device-interface = ["wan1"]
  ##     mac-address = ["00:0a:95:9d:68:16"]
```

### Peer Path State collector

The `peerPathStateCollector128t` collector can be used for monitoring the up/down status of all the peer paths on the node. The various configuration options available under `authority > monitoring > input > peer-path` are as follows:


| Element           | Type      | Description                                                                                                          |
| ----------------- | --------- | -------------------------------------------------------------------------------------------------------------------- |
| network-interface | leaf-list | Network interface names to be included in the collection. Empty list implies all configured interfaces are collected |
| peer-router       | leaf-list | Peer routers to be included in the collection. Empty list implies all configured peer routers are collected          |

The example configuration for `device-interface` collector is as shown below
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

When using the `TOML` definition shown below the various part of a peer-path such as `adjacentAddress` and `networkInterface` are available as tags which can be filtered. For example:

```toml
[[inputs.exec]]
  ## Collect information about the 128T adjacency peer-path status. This information
  ## is useful to monitoring the secure WAN connectivity to the peers
  commands = ["/usr/bin/peerPathStateCollector128t"]

  ## Timeout for the peer-path state collector to finish
  timeout = "5s"

  ## Data format to consume.
  ## Each data format has its own unique set of configuration options, read
  ## more about them here:
  ## https://github.com/influxdata/telegraf/blob/master/docs/DATA_FORMATS_INPUT.md
  data_format = "influx"

  ## To filter on select peer-paths, you can use the `tagpass` and `tagdrop` concepts
  ## from telegraf. For example:
  ## [[inputs.exec.tagpass]]
  ##     adjacentAddress = ["10.10.10.10"]
  ##     networkInterface = ["wan1"]

```

### Arp State Collector

#### Version History

| Release | Modification                               |
| ------- | ------------------------------------------ |
| 3.3.1   | `t128_arp_state` input type was introduced |

The `t128_arp_state` input can be used for monitoring the arp table status of a network interface configured on the node. The various configuration options available under `authority > monitoring > input > arp` are as follows:

| Element           | Type      | Description                                                                                                          |
| ----------------- | --------- | -------------------------------------------------------------------------------------------------------------------- |
| device-interface  | leaf-list | Device interface names to be included in the collection. Empty list implies all configured interfaces are collected  |
| network-interface | leaf-list | Network interface names to be included in the collection. Empty list implies all configured interfaces are collected |

The example configuration for `arp` collector is as shown below
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

The device interface name, network interface name, vlan, ip address, and destination mac will be found as tags and telegraf tagpass can be used to filter specific arp entries as needed. For example:

```toml
[[inputs.t128_arp_state]]
  ## To filter on select properties of the arp entry, you can use the `tagpass` and `tagdrop` concepts
  ## from telegraf. For example:
  ## [inputs.t128_arp_state.tagpass]
  ##     device-interface = ["wan1"]
  ##     network-interface = ["wan1intf"]
  ##     vlan = ["128"]
  ##     ip-address = ["192.169.128.0"]
  ##     destination-mac = ["00:0a:95:9d:68:16"]
```

:::important  
In versions 3.3.1 and later, the simplified `t128_arp_state` seen above should be used over the `execd` input version seen below. The config below should only be used with those older versions of the monitoring agent.  
:::

```toml
[[inputs.exec]]
  ## Collect information about the 128T arp table.
  ## This information is useful for monitoring interface's next hop reachability.
  commands = ["/usr/bin/arpStateCollector128t"]

  ## Timeout for the arp state collector to finish
  timeout = "5s"

  ## Data format to consume.
  ## Each data format has its own unique set of configuration options, read
  ## more about them here:
  ## https://github.com/influxdata/telegraf/blob/master/docs/DATA_FORMATS_INPUT.md
  data_format = "influx"

  ## To filter on select properties of the arp entry, you can use the `tagpass` and `tagdrop` concepts
  ## from telegraf. For example:
  ## [[inputs.exec.tagpass]]
  ##     device-interface = ["wan1"]
  ##     network-interface = ["wan1intf"]
  ##     vlan = ["128"]
  ##     ip-address = ["192.169.128.0"]
  ##     destination-mac = ["00:0a:95:9d:68:16"]
```

### LTE Collector

The `lteMetricCollector128t` collector when run will scan the current node configuration for any 128T supported and configured LTE devices. This collector can be used for pushing the `signal-strength` and `carrier` information to the monitoring stack. For example:

```toml
[[inputs.exec]]
  ## Collect the signal-strength and carrier information from configured LTE card(s) on
  ## the system. This information is useful for monitoring any fluctuations in carrier
  ## signal causing loss of connectivity.
  commands = ["/usr/bin/lteMetricCollector128t"]

  ## Timeout for the LTE metric collector to finish
  timeout = "10s"

  ## Data format to consume.
  ## Each data format has its own unique set of configuration options, read
  ## more about them here:
  ## https://github.com/influxdata/telegraf/blob/master/docs/DATA_FORMATS_INPUT.md
  data_format = "influx"
```

### Top Analytics Collector

The `topAnalyticsCollector128t` collector can be used for monitoring the top sources, top sessions and top applications on the router. The different aspects of each of these data sources are easily tunable using the input configuration. The monitoring agent configuration provides a way to manage each of the top-sessions, top-sources and top-applications individually as follows:
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

The `top_analytics` collector allows a simple `TOML` configuration as below to capture the various top measurements on the system.
```toml
[[inputs.top_analytics]]
    # # By default all the data sources below are enabled along with their default properties.
    # [[inputs.top_analytics.sessions]]
    #     enabled = true

    # [[inputs.top_analytics.sources]]
    #     enabled = true
    #     max_rows = 10
    #     category = "TOTAL_DATA"

    # [[inputs.top_analytics.applications]]
    #     enabled = true
    #     max_rows = 10
    #     filter = "<word to search for in application names>"
    #     # Minimum number of active session for the application to be reported
    #     min-session-count = 1
```

The **top sessions** input above can be used to stream the view of the top 10 sessions by bandwidth utilization. The **enabled** flag can be used to turn off the collection of top sessions.

The **top sources** input can be used to capture the list of source IP addresses by either **TOTAL_DATA** (default) or by **SESSION_COUNT**. In addition, the user can configure the maximum number of top data samples to collect as configured by the **max_rows** configuration above. Finally the **enabled** flag can be used to turn off the top sources collection is need be.

The **top applications** input is useful when application identification in terms of module or tls have been configured on the router. By default, all the discovered sessions will be reported by the input. The user can tune the collection by setting up a search filter in the form of **filter** or eliminate the applications that have some minimum number of sessions via **min-session-count**. The **max-rows** will limit the reporting to the first N rows. The collection can be turned off by setting **enabled** to be false.

### GraphQL Collector

| Release | Modification                             |
| ------- | ---------------------------------------- |
| 3.3.1   | `t128_graphql` input type was introduced |

The `t128_graphql` input can be used to retrieve data from a GraphQL API. The various configuration options available under `authority > monitoring > input > graphql` are as follows:

| Element               | Type   | Description                                                                                                                                                                                                             |
| --------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| query-entry-point     | string | The path to a point in the graphQL tree from which fields and tags will be extracted. This path may contain (`<key>:<value>`) graphQL arguments such as (name:'${ROUTER}').                                             |
| extract-field         | list   | List of leaf nodes to be collected from query response as fields                                                                                                                                                        |
| extract-field > name  | string | The name of the field                                                                                                                                                                                                   |
| extract-field > value | string | The graphQL query path from which to extract the value. The path can be relative to the entry-point or absolute. If the path is abolute, it cannot diverge from the entry point path and must exclude graphQL arguments |
| extract-tag           | list   | List of leaf nodes to be collected from query response as tags                                                                                                                                                          |
| extract-tag > name    | string | The name of the tag                                                                                                                                                                                                     |
| extract-tag > value   | string | The graphQL query path from which to extract the value. The path can be relative to the entry-point or absolute. If the path is abolute, it cannot diverge from the entry point path and must exclude graphQL arguments |

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

The `TOML` configuration for the GraphQL input can be seen below

```toml
[[inputs.t128_graphql]]
  ## collector_name = "t128-device-state"
  ## base_url = "http://localhost:${WEB_PORT}/api/v1/graphql/"
  ## unix_socket = ""
  ## timeout = "10s"
  ## entry_point = "allRouters(name:'${ROUTER}')/nodes/nodes(name:'${NODE}')/nodes/deviceInterfaces/nodes"

  ## [inputs.t128_graphql.extract_fields]
  ##   enabled = "enabled"
  ##   interface-count = "allRouters/nodes/nodes/nodes/deviceInterfaces/totalCount    # absolute path

  ## [inputs.t128_graphql.extract_tags]
  ##   name = "name"
  ##   type = "type"
  ##   admin-status = "state/adminStatus"
  ##   operational-status = "state/operationalStatus"
  ##   provisional-status = "state/provisionalStatus"
  ##   redundancy-status = "state/redundancyStatus"
  ##   duplex = "state/duplex"
  ##   speed = "state/speed"
  ##   mac-address = "state/macAddress"
  ##   router-name = "allRouters/nodes/name"    # absolute path
```

- **collector_name**  
  A name for the collector which will be used as the measurement name of the produced data

- **base_url**  
  The URL of the GraphQL API

- **unix_socket**  
  The unix socket to use; the defualt empty string indicates no unix socket is being used

- **timeout**  
  A limit on the amount of time taken for a given request. If the timeout is hit, no data will be produced for the sample.

- **entry_point**  
  The path to a point in the graph relative to which `extract_fields` and `extract_tags` will be specified. This path may contain `(<key>:<value)` arguments corresponding to those in the GraphQL tree.

- **extract_fields**  
  Paths, absolute or relative to the `entry_point`, from which fields should be created. Each value MUST point to a leaf in the graph. If the path is absolute, it MUST NOT diverge from the `entry_point` and MUST exclude graphQL argument. The keys become the field names for the produced values. At least one field MUST be specified.

- **extract_tags**  
  Paths, absolute or relative to the `entry_point`, from which tags should be created. Each value MUST point to a leaf in the graph. If the path is absolute, it MUST NOT diverge from the `entry_point` and MUST exclude graphQL argument. The keys become the tag names for the produced values.

Note that `(<key>:<value>)` arguments are valid only on the `entry_point`. They MUST NOT be specified on `extract_fields` or `extract_tags`.

It is possible for the relative paths of `extract_fields` and `extract_paths` to enter GraphQL lists. When that is the case, a separate line will be created for each entry in the list.

When dealing with multiple child nodes, it is advised that each be handled in separate `t128_graphql` inputs.

## Monitoring Agent Plugin Notes

## Release 2.0.2

#### New Features and Improvements:
 - **PLUGIN-1163** Updated the plugin to use the latest monitoring agent version [`3.5.0`](plugin_monitoring_agent.md#release-350).

## Release 2.0.1

#### New Features and Improvements:
 - **MON-352** Updated the plugin to use the latest monitoring agent version [`3.4.2`](plugin_monitoring_agent.md#release-342).

## Release 2.0.0

#### New Features and Improvements:
 - **PLUGIN-667** Introduce a new monitoring agent plugin to better manage the monitoring agent through the GUI and PCLI. Some key highlights are:
 * Support all the 128T developed collectors such as metrics, events, top-sessions, etc.
 * Support the most commonly used outputs such as file, syslog, `Kafka`, etc.
 * Support multi-line input fields for generic telegraf configuration with TOML syntax validation.

## Monitoring Agent Release Notes

### Release 3.5.0

#### New Features and Improvements:

- **MON-337** Support absolute paths to `extract_fields` and `extract_tags` in `t128_graphql` collector

#### Issues Fixed:
- **MON-354** `t128_device_state` collector has incorrect tags and fields for 128T versions < 4.5.3

  _**Resolution**_ Adjust some tags and fields in the `t128_device_state` collector for 128T versions < 4.5.3


### Release 3.4.2

#### New Features and Improvements:

- **WAN-116** Allow any topic in the events input.

#### Issues Fixed:
- **I95-39979** Monitoring agent sending the same metrics multiple times when using the kafka output.

  _**Resolution**_ The kafka output was enhanced to include a batch retry mechanism where it will try up to `max_batch_retry` times (default of `5`) to push the buffered metrics during the push interval. The kafka output will only try to resend metrics which failed to be sent from the previous batch retry.


### Release 3.4.0

#### New Features and Improvements:

- **MON-337** Create an ability to run specified input once on demand for testing and debugging

#### Issues Fixed:
- **MON-328** Monitoring agent failed to setup the environment in some installations

  _**Resolution**_ The script to setup the environment is run every time the monitoring agent service restarts to ensure the correct environment setup

### Release 3.3.1

#### New Features and Improvements:

- **MON-309** Upgrade telegraf to 1.17.2
- **MON-306** Provide a `name` in the agent config to differentiate multiple Monitoring Agent instances
- **MON-311** A `t128_graphql` input is now available
- **MON-311** A dedicated `t128_device_state` input is now available
- **MON-311** A dedicated `t128_arp_state` input is now available
- **I95-38959** Improve `t128_metrics` performance with bulk retrieval

#### Issues Fixed:

- **MON-316** Correct default metrics bug where interface `received-missed` was collected from `stats/interface/received/error`

  _**Resolution**_ The default metrics configuration was updated to point `received-missed` to the correct `stats/interface/received/missed`

### Release 3.1.0

#### New Features and Improvements:

- **MON-297** The LTE collector will use the state file generated by 128T software where possible.

#### Issues Fixed

- **MON-300** Prevent the monitoring agent service from accidentally starting 128T service

  _**Resolution**_ If 128T is not running, the MA will fail to start instead of starting 128T

- **MON-294** LTE interfaces were not found in the 128T configuration

  _**Resolution**_ Account for the differences in the configuration across various 128T software versions.

### Release 3.0.0

#### New Features and Improvements

- **MON-230** Make 3.X version of the Monitoring agent compatible with 4.1.0 <= 128T < 6.0.0
- **MON-233** Upgrade telegraf to 1.14.5
- **MON-234** Improve metrics collection performance by creating a native Telegraf plugin
- **MON-198** Provide sample and push interval overrides per input in the agent's config
- **MON-246** Enable value substitution in telegraf configuration files

#### Issues Fixed

- **MON-280** Make the arp state collector compatible with 128T 5.X

  _**Resolution**_ The arp state collector now dynamically handles data collection depending on the 128T version.


### Release 2.1.1

#### New Features and Improvements

- **MON-225** Update telegraf dependency to 1.14.3
- **MON-227** Allow this version of the Monitoring Agent to be installed with 128T < 6.0.0 (previously < 5.0.0)
- **MON-218** Expose MAC address in the device state input
  - Allow better correlation between device and network interfaces.

- **MON-210** Improve performance of several provided inputs
  - Reduce the resource consumption as well as the time needed to collect data. In particular, the `t128_metrics` input has been significanly improved.

#### Issues Fixed

- **MON-205** Honor the input enable/disable flag in the agent's config

  _**Resolution**_ The configuration allows the user to disable an input. However, an input was being treated as enabled as long as it existed in the config. That configuration option is now honored.

- **MON-225** `t128_events` input would occasionally drop or delayed events

  _**Resolution**_ Update the telegraf dependency to 1.14.3 as well as the `execd` input to better handle simultaneous events.

### Release 2.1.0

#### New Features and Improvements

- **MON-184** Added stop command in cli to stop all associated Telegraf services.

For help using this cli option, please refer to the [Monitoring Agent Guide](plugin_monitoring_agent.md#stopping-services).

- **MON-141** Added support for multiple logically seperate monitoring agent instances with the `lib-directory` config option.

For help configuring this option, please refer to the [Monitoring Agent Guide](plugin_monitoring_agent.md#configuration).

- **MON-208** Update Telegraf to latest stable version 1.14.2.

A new stable version of telegraf was released upstream. The main reason for upgrading was to get support for multiline lines.

- **MON-194** Added arp state collector to collect state of the arp table.

To configure the new input plugin, please refer to the [Monitoring Agent Guide](plugin_monitoring_agent.md#arp-state-collector).

- **MON-144** Added configuration option to enable tracking of index so that the event collector picks up where it left off in the case of a restart.

For help configuring this option, please refer to the [Monitoring Agent Guide](plugin_monitoring_agent.md#event-collector).

#### Issues Fixed

- **MON-195** Device state collector collects state from peer node on an HA router.

  _**Resolution**_ The device state collector will now only request state from the local node.

- **MON-181** Event collector excludes multiline events.

  _**Resolution**_ The event collector will accumulate subsequent invalid lines and attempt to submit the accumulated line.


### Release 2.0.1

#### Issues Fixed

- **MON-185** telegraf error when processing results from peer path input

  _**Resolution:**_ The extra logging causing the problem was removed

- **MON-186** LTE metric collector not reporting any values

  _**Resolution:**_ Updated the library imports and identifiers used to display the missing data

- **MON-188** The events inputs collector has invalid sample

  _**Resolution:**_ Updated the sample and staged configuration example for events

### Release 2.0.0

#### New Features and Improvements
- **MON-126** Automatically stage all 128T input configuration for easy of use

The configuration for all 128T collectors such as t128_metrics, t128_events etc will automatically be staged in the inputs directory for convenience.

- **MON-148** Top applications, sessions and sources input plugin

To configure the new input plugin, please refer to the [Monitoring Agent Guide](plugin_monitoring_agent.md#top-analytics-collector)

- **MON-164** Test monitoring-agent input configuration

For verification of the data collected the user can use `monitoring-agent-cli generate` command to generate all the telegraf configuration. Subsequently, the user can run `monitoring-agent-cli test-input` to test a specific input. More details can be found in the [Testing And Validation section](plugin_monitoring_agent.md#testing-and-validation)

- **MON-171** Update Telegraf to latest stable version 1.14.0 ####

A new stable version of telegraf was released upstream with several new inputs such as execd, wireguard and others.

- **MON-175** LTE metric collect will include SNR signal strength ####

The `t128_lte_metric` collector will look for and report SNR signal strength if it is reported by the 128T router.


#### Issues Fixed
- **MON-125** `t128_metrics` default bfd config doesn't work with 4.3

  _**Resolution:**_ The new default config for metrics have the correct parameters for BFD metrics

- **MON-146** Metric collector timing out with the default config on customer system

  _**Resolution:**_ The metric configuration will now have a default timeout of 15 seconds.

- **MON-160** sample agent-config has invalid tags

  _**Resolution:**_ All the sample configurations now contain valid data

- **MON-169** peer-path collector only captures 1 peer-path per node

  _**Resolution:**_ All peer paths on the node will be reported by the peer-path collector

- **MON-170** Default telegraf service (not 128T-telegraf) is enabled and running un-necessarily on the system

  _**Resolution:**_ The system telegraf service will be stopped and disabled

### Release 1.2.1

#### New Features and Improvements

- **MON-225** Update telegraf dependency to 1.14.3

- **MON-218** Expose MAC address in the device state input

Allow better correlation between device and network interfaces.

- **MON-210** Improve performance of several provided inputs

Reduce the resource consumption as well as the time needed to collect data. In particular, the `t128_metrics` input has been significanly improved.

#### Issues Fixed

- **MON-205** Honor the input enable/disable flag in the agent's config

  _**Resolution**_ The configuration allows the user to disable an input. However, an input was being treated as enabled as long as it existed in the config. That configuration option is now honored.

- **MON-225** `t128_events` input would occasionally drop or delayed events

  _**Resolution**_ Update the telegraf dependency to 1.14.3 as well as the `execd` input to better handle simultaneous events.

### Release 1.2.0

#### New Features and Improvements

- **MON-184** Added stop command in cli to stop all associated Telegraf services.

For help using this cli option, please refer to the [Monitoring Agent Guide](plugin_monitoring_agent.md#stopping-services).

- **MON-141** Added support for multiple logically seperate monitoring agent instances with the `lib-directory` config option.

For help configuring this option, please refer to the [Monitoring Agent Guide](plugin_monitoring_agent.md#configuration).

- **MON-208** Update Telegraf to latest stable version 1.14.2.

A new stable version of telegraf was released upstream. The main reason for upgrading was to get support for multiline lines.

- **MON-194** Added arp state collector to collect state of the arp table.

To configure the new input plugin, please refer to the [Monitoring Agent Guide](plugin_monitoring_agent.md#arp-state-collector).

- **MON-144** Added configuration option to enable tracking of index so that the event collector picks up where it left off in the case of a restart.

For help configuring this option, please refer to the [Monitoring Agent Guide](plugin_monitoring_agent.md#event-collector).

#### Issues Fixed

- **MON-195** Device state collector collects state from peer node on an HA router.

  _**Resolution**_ The device state collector will now only request state from the local node.

- **MON-181** Event collector excludes multiline events.

  _**Resolution**_ The event collector will accumulate subsequent invalid lines and attempt to submit the accumulated line.


### Release 1.1.1

#### Issues Fixed

- **MON-185** telegraf error when processing results from peer path input

  _**Resolution:**_ The extra logging causing the problem was removed

- **MON-186** LTE metric collector not reporting any values

  _**Resolution:**_ Updated the library imports and identifiers used to display the missing data

- **MON-188** The events inputs collector has invalid sample

  _**Resolution:**_ Updated the sample and staged configuration example for events


### Release 1.1.0

#### New Features and Improvements

- **MON-126** Automatically stage all 128T input configuration for easy of use

The configuration for all 128T collectors such as t128_metrics, t128_events etc will automatically be staged in the inputs directory for convenience.

- **MON-148** Top applications, sessions and sources input plugin

To configure the new input plugin, please refer to the [Monitoring Agent Guide](plugin_monitoring_agent.md#top-analytics-collector)

- **MON-164** Test monitoring-agent input configuration

For verification of the data collected the user can use `monitoring-agent-cli generate` command to generate all the telegraf configuration. Subsequently, the user can run `monitoring-agent-cli test-input` to test a specific input. More details can be found in the [Testing And Validation section](plugin_monitoring_agent.md#testing-and-validation)

- **MON-171** Update Telegraf to latest stable version 1.14.0 ####

A new stable version of telegraf was released upstream with several new inputs such as execd, wireguard and others.

- **MON-175** LTE metric collect will include SNR signal strength ####

The `t128_lte_metric` collector will look for and report SNR signal strength if it is reported by the 128T router.


#### Issues Fixed

- **MON-146** Metric collector timing out with the default config on customer system

  _**Resolution:**_ The metric configuration will now have a default timeout of 15 seconds.

- **MON-160** sample agent-config has invalid tags

  _**Resolution:**_ All the sample configurations now contain valid data

- **MON-169** peer-path collector only captures 1 peer-path per node

  _**Resolution:**_ All peer paths on the node will be reported by the peer-path collector

- **MON-170** Default telegraf service (not 128T-telegraf) is enabled and running un-necessarily on the system

  _**Resolution:**_ The system telegraf service will be stopped and disabled
