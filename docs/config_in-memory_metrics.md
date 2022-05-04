---
title: Configuring In-Memory Metrics
sidebar_label: In-Memory Metrics
---

Support for persisting in-memory SSR metrics allows historical access to longer term system measurements. The feature also provides greater control over which combinations of those in-memory metrics are persisted and for how long.

## Metrics Profile

To use In-Memory Metrics, specify the metrics intended for persistence as part of a Metrics Profile. Profiles are configured at the Authority level and referenced by the relevant routers. Each Profile specifies a number of metrics and the desired parameter filters.

### Metrics

An individual metric indicates one SSR metric to be part of the profile. Each profile must contain at least one metric to be valid. The metric’s ID matches the description in the REST API/Swagger documentation for the statistic.

### Filters

Filters are optional, but are important in their ability to limit the resources consumed by the metrics subsystem. Filters allow you to indicate your interest in a particular interface or peer-path without the necessity to persist all of the instances of the metric. If no filters are indicated, all instances are persisted.

When using filters, the parameters and values must be relevant for all metrics in the profile. If one of the metrics does not have the specified parameter, or has none of the values, that metric will produce no data.

Example of Simple Grouping with Filtering:

```
config

    authority

        metrics-profile  internet-reachability-metrics
            name    internet-reachability-metrics

            metric  /stats/highway/destination-reachability/icmp/time-to-establishment/max
                id           /stats/highway/destination-reachability/icmp/time-to-establishment/max
                description  "Max ICMP time to establish"
            exit

            metric  /stats/highway/destination-reachability/tcp/time-to-establishment/max
                id           /stats/highway/destination-reachability/tcp/time-to-establishment/max
                description  "Max TCP time to establish"
            exit

            metric  /stats/highway/destination-reachability/icmp/time-to-establishment/mean
                id           /stats/highway/destination-reachability/icmp/time-to-establishment/mean
                description  "Avg ICMP time to establish"
            exit

            metric  /stats/highway/destination-reachability/tcp/time-to-establishment/mean
                id           /stats/highway/destination-reachability/tcp/time-to-establishment/mean
                description  "Avg TCP time to establish"
            exit

            filter  service
                parameter  service
                value      internet
            exit

            filter  traffic-class
                parameter  traffic-class
                value      best-effort
            exit
        exit
    exit
exit
```

When the above profile is referenced by a router, the various reachability metrics are persisted only for the `internet` service and `best-effort` traffic-class. These metrics are available as time-series from the GraphQL API or in the GUI.

### Profile References

Once a profile is configured on the Authority, it is availble to the routers, and each router may reference any number of relevant profiles. With each reference to a profile, the router configuration must specify the retention for the profile. The Profile Retention value determines how long the profile’s metrics are retained.

### Profile Retention

Profile Retention can be configured as any of four values: **in-memory**, **short**, **intermediate**, and **long**. 

The current implementation of the **in-memory** retention value is limited. 

:::note 
Metrics cascade from one retention value to the next; the use of any one value implies all values before it are also in effect. For example, using **intermediate** implies that **short** is also used.
:::

Configuring retention values for persisted metrics helps manage the amount of data stored over time. Three settings are configurable:
- short
- intermediate
- long

Each setting has three configuration fields.

- **enabled** (true/false): Activates/deactivates the retention setting, as well as the retention value(s) that follow. For example, disabling intermediate retention also disables long retention. Similarly, disabling the short retention disables all retention.
- **interval**: Time between data points for retention. 
- **duration**: How long the data will be stored before being dropped from the data store. 

Retention Defaults

| Retention | State | Interval | Duration |
| --- | --- | --- | --- |
| short | Enabled: true | 5 seconds | 1 hour |
| intermediate | Enabled: true | 5 minutes | 1 day |
| long | Enabled: true | 1 hour | 180 days |

:::note
Increasing the retention duration and/or decreasing the interval from the defaults has the potential to impact system overhead and should be carefully considered.
:::

The following example shows metrics retention configured only for short retention with the default values:

```
configure
    authority
        router        MyRouter
            name   MyRouter 
                system
                    metrics
                        retention 
                            short
                                enabled true
                                interval 5s
                                duration 1h
                            intermediate 
                                enabled false  
                                interval 5m
                                duration 1d
                            long
                                enabled false  
                                interval 1h
                                duration 180d
                            exit
                        exit
                    exit
                exit
            exit
        exit
    exit
exit
```

#### Example Profile 

The following example configuration takes metrics specified in the `internet-reachability-metrics` profile and stores them through the **intermediate** retention time period.

```
configure
    authority
        router           MyRouter
            name MyRouter
            system
                metrics
                    profile  internet-reachability-metrics
                        name       internet-reachability-metrics
                        retention  intermediate
                    exit
                exit
            exit
        exit
    exit
exit

```

### In-Memory Metrics Sample Configuration

The following example provides a sample configuration that makes use of several aspects of the Metrics Profile feature.

- Multiple metrics in the same profile
- Filtered profile (peer-metrics)
- Unfiltered profile (events)
- Multiple profiles for the same router (MyRouter)
- Different retention targets for different profiles (MyRouter)

```
config
    authority
        metrics-profile  peer-metrics
            name    peer-metrics

            metric  /stats/bfd/peer-path/async/sent/success
                id  /stats/bfd/peer-path/async/sent/success
            exit

            metric  /stats/bfd/peer-path/async/received/miss
                id  /stats/bfd/peer-path/async/received/miss
            exit

            filter  peer-name
                parameter  peer-name
                value      MyOtherRouter
            exit
        exit

        metrics-profile  events
            name    events

            metric  /stats/audit/events/produced
                id  /stats/audit/events/produced
            exit
        exit

        router           MyRouter
            name MyRouter
            system
                metrics
                    profile  events
                        name       events
                        retention  long
                    exit

                    profile  peer-metrics
                        name       peer-metrics
                        retention  short
                    exit
                exit
            exit
        exit

        router           MyConductor
            name MyConductor
            system
                metrics
                    profile  events
                        name       events
                        retention  long
                     exit
                exit
            exit
        exit
    exit
exit

```




