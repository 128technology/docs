---
title: Configuring Service and Topology Exchange Protocol (STEP)
sidebar_label: Configuring Service and Topology Exchange Protocol (STEP)
---

Use the information in this section to enable routers to connect to the STEP repository on the conductor and build their STEP documents. Additionally, information about configuring reporting parameters, and using the show commands to view STEP details is provided. 

## Enable STEP

The STEP repository is located on the Conductor, and the repository process runs by default. Using the `step-repo` command to assign the IP Address allows the routers to connect to the repository and build the STEP document. Use the following commands to enable the STEP repository on the Conductor. 
``` 
config authority
    step-repo 11.1.1.1
        address 11.1.1.1
        description "STEP Repository on the Conductor"
    exit
```

### Configuring Peer Path Advertisement Settings

The weighted moving average and reporting delay parameters can be configured per neighborhood:

```
config
  authority
    router        NorthEast
        node                  node1
            device-interface          wan3
                network-interface  wan3
                    neighborhood           broadband

                        step-peer-path-advertisement
                            sla-metrics
                                moving-average-sample-size  3

                                significance-threshold
                                    min-loss     0.1
                                    min-latency  5
                                    min-jitter   2
                                exit

                                increase-report-delay       1
                                    percentage  1
                                    delay       1800
                                exit
                                increase-report-delay       10
                                    percentage  10
                                    delay       240
                                exit
                                increase-report-delay       20
                                    percentage  20
                                    delay       150
                                exit
                                increase-report-delay       50
                                    percentage  50
                                    delay       30
                                exit
                                increase-report-delay       100
                                    percentage  100
                                    delay       15
                                exit
                                increase-report-delay       200
                                    percentage  200
                                    delay       1
                                exit

                                decrease-report-delay       1
                                    percentage  1
                                    delay       1800
                                exit
                                decrease-report-delay       10
                                    percentage  10
                                    delay       240
                                exit
                                decrease-report-delay       50
                                    percentage  50
                                    delay       15
                                exit
```

Any auto-generated adjacency in the neighborhood reflects the same configuration values:
```
config
  authority
    router        NorthEast
        node                  node1
            device-interface          wan3
                network-interface  wan3
                    adjacency              10.0.3.23 West

                        step-peer-path-advertisement
                            sla-metrics
                                moving-average-sample-size  3

                                significance-threshold
                                    min-loss     0.1
                                    min-latency  5
                                    min-jitter   2
                                exit

                                increase-report-delay       1
                                    percentage  1
                                    delay       1800
                                exit
                                increase-report-delay       10
                                    percentage  10
                                    delay       240
                                exit
                                increase-report-delay       20
                                    percentage  20
                                    delay       150
                                exit
                                increase-report-delay       50
                                    percentage  50
                                    delay       30
                                exit
                                increase-report-delay       100
                                    percentage  100
                                    delay       15
                                exit
                                increase-report-delay       200
                                    percentage  200
                                    delay       1
                                exit

                                decrease-report-delay       1
                                    percentage  1
                                    delay       1800
                                exit
                                decrease-report-delay       10
                                    percentage  10
                                    delay       240
                                exit
                                decrease-report-delay       50
                                    percentage  50
                                    delay       15
                                exit
```
Note that the effective values are those in the adjacency. The adjacency configuration may be auto-generated or manually configured. The values configured in the neighborhood have no direct effect on the router behavior, they only provide the input for instantiating adjacency objects.

If `moving-average-sample-size` or `significance-threshold` is not configured, the default values will be used. Likewise, if `increase-report-delay` or `decrease-report-delay` is not configured, the default configuration is in effect.

### Router District Settings
The rate limit parameters for peer path SLA updates to the STEP router document can be configured for each router. The router can use different values on a per-district basis:
```
config
    authority
        router        NorthEast
            district-settings     default-district
                district-name                 default-district

                step-peer-path-sla-metrics-advertisement
                    update-rate-limit        180
                    minimum-update-interval  30
                    update-burst-size        2
                exit
            exit
```

Only the default district parameters have any effect. If no `district-settings` are configured, or if any of the `step-peer-path-advertisement` values are not provided, the default values will be used.

## Configurable Parameters
```
step peer path advertisement
    sla-metrics
        moving average sample size
        significance threshold
            min-loss
            min-latency
            min-jitter
        increase report delay
            percentage
            delay
        decrease-report-delay
            percentage
            delay
```
See [step-peer-path-advertisement (adjacency)](config_reference_guide.md#step-peer-path-advertisement-adjacency) for configuration details. 
```
district-settings
    default-district
    district-name
    step-peer-path-sla-metrics-advertisement
        update-rate-limit
        minimum-update-interval
        update-burst-size        
```
See [step-peer-path-advertisement (district)](config_reference_guide.md#step-peer-path-advertisement-district) for configuration details.

## Show Commands

The following show commands provide a view into the STEP functionality.

- `show step lsdb`
```
admin@T197_DUT5.Site5# show step lsdb
Thu 2020-12-17 19:04:42 UTC

Retrieving from 'Site5'...

================== ===============
 District           Originator
================== ===============
 default-district   Site4
 default-district   Site5
 default-district   Datacenter

```
For additional information, see [show step lsdb](cli_reference.md#show-step-lsdb).

- `show step routes`
```
admin@T197_DUT5.Site5# show step routes
Thu 2020-12-17 19:26:56 UTC

Retrieving from 'T197_DUT5.Site5'...

=========== ===================== =============
 Node Name   Service               IP Prefix
=========== ===================== =============
 T197_DUT5   site4-LAN             10.4.0.0/16

```
For additional information, see [show step routes](cli_reference.md#show-step-routes). 

