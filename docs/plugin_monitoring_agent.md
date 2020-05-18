---
title: 128T Monitoring Agent
sidebar_label: Monitoring
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

The 128T Monitoring Agent can be obtained from the official 128T software repository. The following versions of the **monitoring-agent** are available for corresponding 128T software version.

| Monitoring Agent            | 128T                        |
| --------------------------- | --------------------------- |
| 128T-monitoring-agent-1.2.0 | 128T >= 4.1.0; 128T < 4.3.0 |
| 128T-monitoring-agent-2.1.0 | 128T >= 4.3.0               |

The agent can be install using dnf utility. For example.

```console
# dnf install 128T-monitoring-agent
Last metadata expiration check: 0:00:08 ago on Mon 18 May 2020 08:30:20 PM UTC.
Dependencies resolved.
===========================================================================================================
 Package                            Arch                Version                 Repository            Size
===========================================================================================================
Installing:
 128T-monitoring-agent              x86_64              2.1.0-5                 128tech              7.0 M
Installing dependencies:
 telegraf-128tech                   x86_64              1.14.2-1                128tech               20 M

Transaction Summary
===========================================================================================================
Install  2 Packages

Total download size: 27 M
Installed size: 101 M
Is this ok [y/N]: y
Downloading Packages:
(1/2): 128T-monitoring-agent-2.1.0-5.rpm                                    19 MB/s | 7.0 MB     00:00
(2/2): telegraf-128tech-1.14.2-1.x86_64.rpm                                 32 MB/s |  20 MB     00:00
-----------------------------------------------------------------------------------------------------------
Total                                                                       36 MB/s |  27 MB     00:00
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                   1/1
  Running scriptlet: telegraf-128tech-1.14.2-1.x86_64                                                  1/2
  Installing       : telegraf-128tech-1.14.2-1.x86_64                                                  1/2
  Running scriptlet: telegraf-128tech-1.14.2-1.x86_64                                                  1/2
Created symlink from /etc/systemd/system/multi-user.target.wants/telegraf.service to /usr/lib/systemd/system/telegraf.service.
  Installing       : 128T-monitoring-agent-2.1.0-5.x86_64                                              2/2
  Running scriptlet: 128T-monitoring-agent-2.1.0-5.x86_64                                              2/2
Created symlink from /etc/systemd/system/128T.service.wants/128T-monitoring-agent.service to /usr/lib/systemd/system/128T-monitoring-agent.service.
Created symlink from /etc/systemd/system/multi-user.target.wants/128T-monitoring-agent.service to /usr/lib/systemd/system/128T-monitoring-agent.service.
  Running scriptlet: telegraf-128tech-1.14.2-1.x86_64                                                  2/2
  Running scriptlet: 128T-monitoring-agent-2.1.0-5.x86_64                                              2/2
Removed symlink /etc/systemd/system/multi-user.target.wants/telegraf.service.
  Verifying        : 128T-monitoring-agent-2.1.0-5.x86_64                                              1/2
  Verifying        : telegraf-128tech-1.14.2-1.x86_64                                                  2/2

Installed:
  128T-monitoring-agent.x86_64 2.1.0-5                   telegraf-128tech.x86_64 1.14.2-1

Complete!
```

## Configuration

The monitoring agent has its own set of configurations and looks for inputs from specific directories on disk. By default, the configuration for the agent should be present in `/etc/128t-monitoring/config.yaml` and uses YAML format which looks something like this:

```yaml
enabled: true
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
  - name: t128_peer_path
  - name: lte_metric
    exclude-outputs: [file]
outputs:
  - name: file
  - name: message_queue
```

The `enabled` field is meant as global toggle for applying the monitoring agent functionality. When set to `disabled` the monitoring agent will remain dormant on the 128T.

Each of the `tags`, a collection of key/value pairs, are used to add meta information to the collected metrics. This data makes it easier to identify the origin, and to provide filtering by the collectors. By default, the agent includes the `${HOSTNAME}`, `${ROUTER}` and `${NODE}` tags to every collected input. The corresponding values are derived from the running system. The same config can ideally be used for each node in the authority, as their respective values are evaluated at runtime.

`sample-interval` and `push-interval` indicate the frequency (in seconds) for how often the data is collected and subsequently pushed to the collection target. When the `push-interval` value is greater than the `sample-interval`, the agent will produce `ceiling(push-interval/sample-interval)` samples collected within the push duration. It is recommended to configure the `push-interval` as a multiple of `sample-interval`.

The `inputs` represent a single unit of collection. This can be a combination of inputs available from `telegraf` as well as other inputs developed by 128T. The function and configuration of each of the 128T provided inputs can be found in subsequent sections. For `telegraf` inputs please refer to the [influx documentation online](https://docs.influxdata.com/telegraf/v1.13/plugins/plugin-list/#input-plugins). Each `input` can be a combination of one or more collectors and can contain other collector specific information. For each of the inputs, a user can also configure an `include-outputs` which is a list of outputs to send the collected information to. This allows the user to build a matrix of inputs and outputs and provides a granular control over which input should be sent to what output. Similarly, the user can also configure an `exclude-outputs` which will include all defined outputs except the one specified.

The `outputs` represent a data sink where the collected information is to be delivered. By virtue of using `telegraf`, the monitoring agent gets automatic support of the [available outputs supported by telegraf](https://docs.influxdata.com/telegraf/v1.13/plugins/plugin-list/#output-plugins). Each `input` can be configured to be delivered to one or more `output`.

## Directory Structure

The `monitoring-agent` uses a well-defined directory structure where it derives the inputs from various configuration. The following directories are especially important:

### Inputs

Path: `/var/lib/128t-monitoring/inputs/`

The `inputs` directory contains config files for the various inputs that are enabled in the monitoring-agent configuration. The monitoring agent expects to see a file called `<input-name.conf>` in this directory. Users can override the file name by specifying `conf: <filename.conf>` in the input definition within the config above. This file should only contain the telegraf definition for the input(s) that belong and not any other configuration. Configuration for all the 128T inputs will automatically be staged in the inputs directory. See the Config Examples section below for more details.

### Outputs

Path: `/var/lib/128t-monitoring/outputs/`

The `outputs` directory will contain the config files for the various data sink configured in the monitoring-agent configuration. For each `output` the conf file should contain the telegraf configuration for that one output only. This allows the monitoring-agent to create a telegraf config per input and include the appropriate outputs.

### Config

Path: `/var/lib/128t-monitoring/config`

The `config` directory contains the fully formed telegraf config files created by the monitoring agent. These file are generated based on the contents of `config.yaml` and the `inputs` and `outputs` directories.

For example, the using the `t128_metrics` input and the `file` output in the examples section below will result in a configuration file such as:

```toml
[global_tags]
router = "lte-router"
node = "lte-node"

[agent]
interval = 10
flush_interval = 20

[inputs]
[[inputs.exec]]
timeout = "15s"
commands = [ "/usr/bin/metricCollector128t --config /etc/128t-monitoring/collectors/t128_metrics/default_config.toml",]
data_format = "influx"

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
    ## [[inputs.t128_metric.metric]]
    ## name = "peer_path"
    ##
    ## [inputs.t128_metric.metric.fields]
    ## Refer to the 128T REST swagger documentation for the list of available metrics
    ##     key_name = "stats/<path_to_metric>"
    ##     latency = "stats/bfd/peer-path/latency"
    ##
    ## [inputs.t128_metric.metric.parameters]
    ##     parameter_name = ["value1", "value2"]
    ##     peer_path = ["path1"]

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

This example sends data to a kafka broker:

`/var/lib/128t-monitoring/outputs/kafka.conf`

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

In this example data is sent via syslog:

`/var/lib/128t-monitoring/outputs/syslog.conf`

```toml
[[outputs.syslog]]
  address = "udp://<ip>:514"
  default_sdid = "128T"
```

:::important  
For syslog output, not specifying the `default_sdid` parameter can result in empty or truncated messages  
:::

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
    ## name = "peer_path"
    ##
    ## [inputs.t128_metric.metric.fields]
    ## Refer to the 128T REST swagger documentation for the list of available metrics
    ##     key_name = "stats/<path_to_metric>"
    ##     latency = "stats/bfd/peer-path/latency"
    ##
    ## [inputs.t128_metric.metric.parameters]
    ##     parameter_name = ["value1", "value2"]
    ##     peer_path = ["path1"]
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

## 128T Collectors

The 128T monitoring-agent comes pre-packaged with a set of collectors to assist in the monitoring of the 128T platform. Here are the various collectors and how to use them:

### Metric collector

The `metricCollector128t` python executable is responsible for collecting the configured metrics from a running system. By default, the metrics specified in `/etc/128t-monitoring/collectors/t128_metrics/default_config.toml` will be used by the collector. This represents a set of pre-configured metrics that 128T recommends a network operator to monitor. The configuration file in a `TOML` definition of metrics and has the following format:

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

The `name` becomes the name of the measurement in the context of influxdb format. The `metric.fields` represent the various metrics to be collected. The `packets-received` in the above example will be field-name for the `stats/aggregate-session/service/packets-received` KPI which is the path of that KPI from the 128T REST API documentation. Finally, the `metric.parameters` can be used to configure key parameters such as `service` to be used for filtering the set of collected stats. In the above example, the metrics would be collected for all services but the `service` parameter can be used to specify a subset of services to monitor instead.

### Event Collector

The event collector can be used for collecting and pushing events for various categories such as admin, alarm, system, traffic and provisioning as they occur on the system. The type of the event is available via a `tag` and can be used for filtering only specific events as desired. For example, the following configuration can be used for pushing just the `alarm` and `admin` event

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

### Device interface state collector

The `deviceInterfaceStateCollector128t` collector can be used for monitoring the admin, oper and redundancy status of various device-interfaces configured on the node. The name is available as `device-interface` tag and telegraf `tagpass` can be used to filter specific interfaces as needed. For example:

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
```

### Peer Path State collector

The `peerPathStateCollector128t` collector can be used for monitoring the up/down status of all the peer paths on the node. The various part of a peer-path such as `adjacentAddress` and `networkInterface` are available as tags which can be filtered. For example:

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

The `topAnalyticsCollector128t` collector can be used for monitoring the top sources, top sessions and top applications on the router. The different aspects of each of these data sources are easily tunable using the input configuration.

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
