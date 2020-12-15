---
title: Configuring Service and Topology Exchange Protocol (STEP)
sidebar_label: Configuring Service and Topology Exchange Protocol (STEP)
---

The **STEP Repository** is built upon a highly efficient and scalable in-memory database. There is no business logic in the STEP repository itself; all of the routing decisions (both client publishing routing data, and the client using the data to perform SPF) are performed on each router.

Routers participating in a STEP-enabled network publish information about services, peer connections, and link state in a JSON encoded document called the STEP document. This information is used by all routers to intelligently route traffic to services and react to network changes. The STEP repository can also be used by service providers to advertise service information from their networks/authority. 

## Enable STEP

The STEP repository is located on the Conductor, and the repository process runs by default. Using the `step-repo` command to assign the IP Address allows the routers to connect to it and build the STEP document. Use the following commands to enable the STEP repository on the Conductor. 
``` 
config authority
    step-repository 11.1.1.1
        address 11.1.1.1
        description "STEP Repository on the Conductor"
    exit
```

### Configuring Weighted Moving Average (WMA) Parameters

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

If `sla-metrics-moving-average-sample-size` or `sla-metrics-significance-threshold` is not configured, the default values will be used. Likewise, if `sla-metrics-increase-report-delay` or `sla-metrics-decrease-report-delay` is not configured, the default configuration is in effect.

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

Only the default-district parameters have any effect. If no district-settings are configured, or if any of the step-peer-path-advertisement values are not provided, the default values will be used.
