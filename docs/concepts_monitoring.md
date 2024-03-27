---
title: Monitoring Agent
sidebar_label: Monitoring Agent
---

The SSR Monitoring Agent is an application for collecting data from a node running SSR software and pushing it to a collector. It is capable of collecting the data from several sources such as metrics or events. The current mechanism of monitoring an SSR involves performing REST or GraphQL queries from the conductor. At scale, this can become inefficient and be problematic in terms of the performance of the conductor. Additionally it is important to interact with 3rd party monitoring platforms as means for organizations to collect, analyze and report using various KPIs available from SSR software and other applications in the network.

The monitoring agent at its core is designed to push data to external platforms. It currently leverages the [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/) collection stack on every SSR. However, the monitoring agent is designed with other tools and scale in mind. The monitoring agent is composed of the following:

- **monitoring-agent-cli**
  Used for configuring and interacting with the underlying application

- **collectors**
  A set of inputs designed to collect data from several sources such as metrics, events etc.

- **targets**
  A set of outputs for collecting and pushing the data to various data sinks such as external monitoring platforms, files on disk etc.

## File-based Configuration

The monitoring agent has its own set of configurations and looks for inputs from specific directories on disk. By default, the configuration for the monitoring agent should be present in `/etc/128t-monitoring/config.yaml` and uses YAML format. For example:

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

The `enabled` field is meant as global toggle for applying the monitoring agent functionality. When set to `disabled` the monitoring agent will remain dormant on the SSR.

`lib-directory` is the root directory for the Monitoring Agent. Other directores exist relative to it. This is useful when intending to isolate a set of Monitoring Agent elements from others.

Each of the `tags`, a collection of key/value pairs, are used to add meta information to the collected metrics. This data makes it easier to identify the origin, and to provide filtering by the collectors. By default, the agent includes the `${HOSTNAME}`, `${ROUTER}` and `${NODE}` tags to every collected input. The corresponding values are derived from the running system. The same config can ideally be used for each node in the authority, as their respective values are evaluated at runtime.

`sample-interval` and `push-interval` indicate the frequency (in seconds) for how often the data is collected and subsequently pushed to the collection target. When the `push-interval` value is greater than the `sample-interval`, the agent will produce `ceiling(push-interval/sample-interval)` samples collected within the push duration. It is recommended to configure the `push-interval` as a multiple of `sample-interval`. These values can be overridden at the input level for finer control of agent's behavior.

The `inputs` represent a single unit of collection. This can be a combination of inputs available from `telegraf` as well as other inputs developed by Juniper. The function and configuration of each of the SSR provided inputs can be found in subsequent sections. For `telegraf` inputs please refer to the [influx documentation online](https://docs.influxdata.com/telegraf/v1/configure_plugins/input_plugins/). Each `input` can be a combination of one or more collectors and can contain other collector specific information. For each of the inputs, a user can also configure an `include-outputs` which is a list of outputs to send the collected information. This allows the user to build a matrix of inputs and outputs and provides a granular control over which input should be sent to what output. Similarly, the user can also configure an `exclude-outputs` which will include all defined outputs except the one specified.

The `outputs` represent a data sink where the collected information is to be delivered. By virtue of using `telegraf`, the monitoring agent gets automatic support of the [available outputs supported by telegraf](https://docs.influxdata.com/telegraf/v1/configure_plugins/output_plugins/). Each `input` can be configured to be delivered to one or more `output`.

## Directory Structure

The `monitoring-agent` uses a well-defined directory structure where it derives the inputs from various configuration. As described above, the base of the directory structure can be specified using the `lib-directory` configuration field. Directories exist relative to that one. The following directories are especially important:

### Inputs

Path: `/var/lib/128t-monitoring/inputs/`

The `inputs` directory contains config files for the various inputs that are enabled in the monitoring-agent configuration. The monitoring agent expects to see a file called `<input-name.conf>` in this directory. Users can override the file name by specifying `conf: <filename.conf>` in the input definition within the config above. This file should only contain the telegraf definition for the input(s) that belong and not any other configuration. Configuration for all the SSR inputs will automatically be staged in the inputs directory. See the Config Examples section below for more details.

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

The `samples` directory contains example configurations for the included SSR collectors. You can also display these using the [`monitoring-agent-cli`](#sample-config).

## Config Examples

The following examples highlight just a few ways the monitoring agent can be configured. Be sure to reference the Telegraf documentation for the full ecosystem of input and outputs that are supported.

### Inputs

#### t128_metrics

This example configures the `t128_metrics` collector to gather a set of default metrics from the SSR. This file is also included in the samples directory.

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

#### Builtin variables
Within an **input** configuration, several variables have been made available for substitution.

| Value             | Meaning                                           | Version Introduced |
| ----------------- | ------------------------------------------------- | ------------------ |
| `${ROUTER}`       | The router name of the running SSR instance      | 3.0.0              |
| `${NODE}`         | The node name of the running SSR instance        | 3.0.0              |
| `${128T_VERSION}` | The version of the running SSR instance          | 3.0.0              |
| `${WEB_PORT}`     | A local port that can be used to access SSR APIs | 3.0.0              |

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
The new variable substitution scheme allows for GraphQL based queries to be executed on the router to obtain useful information to be included as tags. For example, the scheme can be used to periodically send the entitlements information or use a config description field as a tag for some inputs. The agent configuration can include the variables as follows:

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

The `monitoring-agent-cli sample` command can be used to view the various collectors that are created as part of the SSR monitoring agent. The `list-available` command will simply show the set of available inputs (and outputs) that are packaged as part of the SSR monitoring-agent. These are in addition to the ones available natively via telegraf. For example:

```console
# monitoring-agent-cli sample list-available
inputs:
- t128_device_state
- t128_metrics
- t128_peer_path
- t128_events
- t128_lte_metric
- t128_top_analytics
- t128_session_records
```

The configuration for each of these inputs can be viewed via `monitoring-agent-cli sample view <collector_name>` command such as:

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
2020-04-15T06:51:17Z D! [agent] Initializing
> device-interface-state,device-interface=dpdk1-lan,host=t127-dut2.openstacklocal,router=router1 adminStatus="ADMIN_UP",enabled=true,operationalStatus="OPER_UP",redundancyStatus="NON_REDUNDANT" 1586933478000000000
```

In order to run an input to the configured outputs end-to-end just once for validation, testing and debugging purposes, the `run-once` command can be used. This will execute the configured inputs and produce data to the outputs as specified in the monitoring agent configuration file.

```console
# monitoring-agent-cli run-once t128_metrics
Collecting t128_metrics and writing to outputs for input t128_metrics
2021-04-08T02:49:46Z I! Starting Telegraf 1.17.4
2021-04-08T02:49:46Z D! [agent] Initializing
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

The `monitoring-agent-cli stop` command can be used to stop `128T-telegraf` services launched by the `configure` command.

```console
# monitoring-agent-cli stop
Stopping telegraf service 128T-telegraf@t128_metrics.service
Stopping telegraf service 128T-telegraf@t128_events.service
Stopping telegraf service 128T-telegraf@t128_arp_state.service
Stopping telegraf service 128T-telegraf@t128_device_state.service
```

## Collectors

The monitoring-agent comes pre-packaged with a set of collectors to assist in the monitoring of the SSR platform. Here are the various collectors and how to use them:

### Metric collector

The `t128_metrics` input is responsible for collecting the configured metrics from a running system. By default, the metrics specified in `/etc/128t-monitoring/collectors/t128_metrics/default_config.toml` will be used by the collector. This represents a set of pre-configured metrics that we recommend that a network operator monitor. The configuration file in a `TOML` definition of metrics has the following format:

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

Each element of the configuration specifies an aspect of the [InfluxDB line protocol](https://docs.influxdata.com/influxdb/v1.8/write_protocols/line_protocol_tutorial/) or the SSR REST API. REST API documentation is available from the "About This System" page in the SSR GUI.

- **name**
  The line protocol measurement to be used for the output

- **fields**
  What line protocol fields should exist in the output

- **fields.key** (e.g. `packets-received`)
  A line protocol field key that should exist in the output

- **fields.value** (e.g. `stats/aggregate-session/service/packets-received`)
  The SSR KPI providing the value for the associated field key. See the SSR REST API documentation available from the "About This System" page in the SSR GUI for a full list. Note that the documentation prefixes the KPIs with `/router/{router}/`.

- **parameters** (e.g. `service`)
  The SSR parameters that should be preserved as line protocol tags in the output. When a non-empty list of values is provided for a parameter, only KPIs with matching parameters will be included in the output.

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
The event collector can be used for collecting and pushing events for various categories such as admin, alarm, system, traffic and provisioning as they occur on the system. The type of the event is available via a `tag` and can be used for filtering only specific events as desired. For example, the following configuration can be used for pushing just the `alarm` and `admin` event. The configuration file in a `TOML` definition of event collector has the following format:

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
:::note
The events described above need to be enabled for the router under `authority > router > system > audit` for the event collector to be able to collect and push those events.
:::

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
The `t128_device_state` input can be used for monitoring the admin, oper, provisional, and redundancy status of various device-interfaces configured on the node. The device interface name is available as the `device-interface` tag and the mac address is available as the `mac-address` tag. The `TOML` definition of the configuration looks as below. Telegraf `tagpass` can be used to filter specific interfaces as needed. For example:

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

The `peerPathStateCollector128t` collector can be used for monitoring the up/down status of all the peer paths on the node. When using the `TOML` definition shown below the various part of a peer-path such as `adjacentAddress` and `networkInterface` are available as tags which can be filtered. For example:

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

### ARP State Collector
The `t128_arp_state` input can be used for monitoring the arp table status of a network interface configured on the node. The device interface name, network interface name, vlan, ip address, and destination mac will be found as tags and telegraf tagpass can be used to filter specific arp entries as needed. For example:

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

The `lteMetricCollector128t` collector when run will scan the current node configuration for any SSR supported and configured LTE devices. This collector can be used for pushing the `signal-strength` and `carrier` information to the monitoring stack. For example:

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

The `topAnalyticsCollector128t` collector can be used for monitoring the top sources, top sessions and top applications on the router. The different aspects of each of these data sources are easily tunable using the input configuration. The monitoring agent configuration provides a way to manage each of the top-sessions, top-sources and top-applications individually as follows. The simple `TOML` configuration as below to capture the various top measurements on the system.

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

The `t128_graphql` input can be used to retrieve data from a GraphQL API. The `TOML` configuration for the GraphQL input can be seen below

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
  The path to a point in the graph relative to which `extract_fields` and `extract_tags` will be specified. This path may contain `(<key>:<value>)` arguments corresponding to those in the GraphQL tree.

- **extract_fields**
  Paths, absolute or relative to the `entry_point`, from which fields should be created. Each value MUST point to a leaf in the graph. If the path is absolute, it MUST NOT diverge from the `entry_point` and MUST exclude graphQL argument. The keys become the field names for the produced values. At least one field MUST be specified.

- **extract_tags**
  Paths, absolute or relative to the `entry_point`, from which tags should be created. Each value MUST point to a leaf in the graph. If the path is absolute, it MUST NOT diverge from the `entry_point` and MUST exclude the `(<key>:<value>)` arguments which are allowed in the `entry_point`. The keys become the tag names for the produced values.

Note that `(<key>:<value>)` arguments are valid only on the `entry_point`. They MUST NOT be specified on `extract_fields` or `extract_tags`.

It is possible for the relative paths of `extract_fields` and `extract_paths` to enter GraphQL lists. When that is the case, a separate line will be created for each entry in the list.

When dealing with multiple child nodes, it is advised that each be handled in separate `t128_graphql` inputs.


### Session Records Collector

| Release | Modification                                     |
| ------- | ------------------------------------------------ |
| 3.6.1   | `t128_session_records` input type was introduced |

The monitoring agent `session-records` input can be used to generate session records on the system.

:::note
The session record input is only compatible with SSR >= 5.4.0.
:::

The `t128_session_records` collector allows a simple `TOML` configuration as below to capture the various session records on the system.

```toml
[[inputs.t128_session_records]]
  ## Create a stream of 128T session reocrds.

  ## A (unique) file to use for index tracking. This tracking allows each
  ## session record to be produced once. By default, no tracking is used and
  ## session records are produced starting from the point telegraf is launched.
  # index-file = "/var/lib/128t-monitoring/state/session_records.index"

  ## The name of the log file to produce to /var/log/128t-monitoring/<log-name>.log
  # log-name = "session_records"

  ## input session record filtering based on type
  # [inputs.t128_session_records.tagpass]
  # recordType = ["CREATE", "INTERMEDIATE", "CLOSE", "ERROR", "MODIFY"]
```


## SSR Processors

### Transform Processor

| Release | Modification                                   |
| ------- | ---------------------------------------------- |
| 3.3.1   | `t128_transform` was introduced                |
| 3.5.0   | `state-change` transform option was introduced |
| 3.5.0   | `previous_fields` wre introduced               |

The `t128_transform` processor can be used to compute a diff or rate from fields passing through it. Alternatively, it can be used to detect a change in state for a field.

| Element         | Type                | Description                                                                                                                                                                 |
| --------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transform       | string              | The transform to perform - `rate`, `diff`, or `state-change`                                                                                                                |
| expiration      | duration            | If no value has been seen for this amount of time, begin again as if it is the first value. For `state-change` retransmit the current state.                                |
| remove-original | bool                | Remove the original field (**NOT LINE**) in the case that the field is renamed.                                                                                             |
| fields          | dict[string:string] | A mapping of `new-field = existing-field` where the new field is the computed transform of the existing field. If the names are the same, the field will be replaced.       |
| previous_fields | dict[string:string] | Optionally include a field indicating the previous observed value. Specify as `previous-field = new-field` such that the previous indicates the prior value of `new-field`. |

The processor operates on each field separately. For example, multiple metrics may pass through with a `value` field. The processor will distinguish between them using the tags and measurement name.

When there is no value to produce, the processor excludes the field. If the field name matches the source field, the field is removed. If the line is no longer valid, for example, if it has no fields, Telegraf will remove it, effectively dropping the line. When watching for state changes on lines that have a single field, the original line will be dropped. In this way, a polling mechanism can be turned into a means of notification.

Here are some examples of the `TOML` configuration.

State Change:

```toml
[[processors.t128_transform]]
    transform = "state-change"

    [processors.t128_transform.fields]
        "state" = "state"

    [processors.t128_transform.previous_fields]
        "previous-state" = "state"
```

Diff:

```toml
[[processors.t128_transform]]
    transform = "diff"
    remove-original = true
    expiration = 30s

    [processors.t128_transform.fields]
        "delta" = "counter"
```

For this diff case, the transform will compute the delta from a "counter" field. No delta can be computed from a single point, so the processor waits until the second observed value to produce the diff. If no values are observed for more than thirty seconds, the processor will begin computing again.

### Pass Processor

| Release | Modification                    |
| ------- | ------------------------------- |
| 3.6.1   | `t128_pass` was introduced      |

The `t128_pass` processor can be used to filter out metrics with complex logic. The usual mechanism to filter out metrics is to use the built-in Telegraf metric selectors (`tagpass`, `tagdrop`, `fieldpass`, `fielddrop`, etc). These have a shortcoming in that they are combined by logical `AND`s. The `t128_pass` keeps the familiar syntax but allows more complex filters.

One `t128_pass` processor is composed of multiple `conditions`. The `conditions` are logically `OR`'d together. Each `condition` can be composed of `tags` and `fields` which specify acceptable values much like the built-in filtering mechanisms. A `condition`'s components are logically `AND`'d together, but can be configured to `OR`. A `condition` can have different matching `mode`s, either `exact`, `glob`, or `regex` and a `condition` can be inverted as a whole with `invert`.

```toml
[[processors.t128_pass]]
  ## The conditions that must be met to pass a metric through. This is similar
  ## behavior to a tagpass, but the multiple tags are ANDed
  [[processors.t128_pass.condition]]
	## Mode dictates how to match the condition's tag values
	## Valid values are:
	##  * "exact": exact string comparison
	##  * "glob": go flavored glob comparison (see https://github.com/gobwas/glob)
	##  * "regex": go flavored regex comparison
	# mode = "exact"

	## Operation dictates how to combine the condition's tag matching
	## Valid values are:
	##  * "and": logical and the results together
	##  * "or": logical or the results together
	# operation = "and"

	## Invert dictates whether to invert the final result of the condition
	# invert = false

	## Whether to ignore if any tag or field keys are missing.
	# ignore_missing_keys = false

  [processors.t128_pass.condition.tags]
	# tag1 = ["value1", "value2"]
	# tag2 = ["value3"]

  ## Fields work the same way and can be included in the same condition.
  ## Only string values are accepted and the non-string field values in this section
  ## will be converted to strings before comparison.
  [processors.t128_pass.condition.fields.string]
	# field1 = ["value1", "value2"]
	# field2 = ["value3"]

  [[processors.t128_pass.condition]]
	# mode = "exact"

  [processors.t128_pass.condition.tags]
	# tag1 = ["value3"]
```

