---
title: Rate Limiting
---

Rate limiting, when configured, is applied to packets entering the data path prior to any packet transformations so as to prevent an individual flow from consuming more bandwidth than allowed.

## Per-Flow Rate Limiting

The 128T has the ability to apply rate limiting to individual flows within a session for a service. This provides the ability to ensure that each flow to and from a service conforms to a specific "shape".  This can be particularly useful if the sessions of a service are used for high bandwidth applications such as downloading or uploading content.  Each flow can be restricted to use only a specific amount of bandwidth. This capability in turn can be used to limit the amount of traffic egressing the 128T, regulating the traffic entering the traffic scheduler.

Individual flow rate limiting, can prevent bad actors and lead to a more desirable overall system performance. Accurate rate limiting can be a bit of an art to configure properly per flow, as it is highly dependent on the application.

### Configuration

Rate limiting can be configured for a particular service, by way of its associated service-class and is applied individually to each flow.

There are two parameters that affect the shape of a flow:
* `max-flow-rate` defined in bits/second, regulates the average rate of traffic.
  :::note
  Rate is calculated on a interval relative to the arrival of flows. Some bursts may appear, but not greater than the configured `max-burst-rate`
  :::
* `max-flow-burst` defined in bits/seconds, serves to minimize bursts of traffic within a flow.

Sample configuration:

```
service-class   rate-policy-class
    name                         rate-policy-class
    rate-limit                   true
    max-flow-rate                100000
    max-flow-burst               100000
exit

service-policy  shaped-service-policy
    name           shaped-service-policy
    service-class  rate-policy-class
exit

service         shaped-service
    name            shaped-service
    service-policy  shaped-service-policy
exit
```

This example will limit bursts as well as the bandwidth per flow to 100Kbps.

## Per-Service Rate Limiting

Rate limiting per service affords the administrator the ability to configure the maximum aggregate incoming bandwidth allowed for a service. [Services](concepts_glossary.md#services), being a global construct, can be applied across all routers. Each router therefore has the ability to define an individual policy, which can then be applied to the service directly on a specific router by leveraging [router-group](bcp_service_and_service_policy_design.md#routerrouter-group-based-services) syntax.

For example, in a hub and spoke topology, if a service is defined between a 128T router located within a data center and all branch locations, the aggregate rate limit configured _locally_ on the data center router would be applied to all incoming traffic for this service entering the data center. No rate limiting will be applied at the branch sites.

For a service defined from a branch site to the data center, the aggregate rate limit would be applied at the branch site, using the locally defined rate limiting policy, and would not be applied at the data center.

### Configuration

Rate limiting policy can be defined in one of two ways:

* _shared_ - the profile is shared across multiple services that have the profile defined in their _service-class_, where all sessions that belong to all matching services get a slice of the bandwidth on a first-come first-serve basis.
* _per-service_ - each service has its own rate-limiter, and the bandwidth is only shared across sessions that belong to that service. Multiple service-classes can use the same profile, but the bandwidth will not be shared across services.

Since 128T services are directional, it is important to be able to control the direction in which the traffic is being rate-limited. For example, if the service being limited is a software update service and if the updates are being pushed, configuring the `upload-settings` of the rate-limit profile will control the bandwidth of the incoming traffic. If the updates are being pulled, configuring the `download-settings` will control the rate. Upload and download settings can be configured simultaneously.

Once the rate-limit-policy is defined, in order for it to be applied to a service, `aggregate-rate-limit-policy` must be defined in the `service-class`.

:::note
The `rate-limit` field in a `service-class` is only used when configuring *per-flow rate limiting*, it is not necessary to set this to `true` to enable *per-service rate limiting*.
:::

:::note
Flow rate limiting and aggregate rate limiting can configured independently of each other. When both `rate-limit` and `aggregate-rate-limit-policy` are enabled in the `service-class`, flow rate limiting will be applied first, before aggregate rate limiting.
:::

Sample configuration:

```
rate-limit-policy    rate-limiting
    name               rate-limiting
    mode               shared
    upload-settings
        max-rate   300000
        max-burst  300000
    exit
    download-settings
        max-rate   300000
        max-burst  300000
    exit
exit

service-class   rate-policy-class
    name                         rate-policy-class
    aggregate-rate-limit-policy  rate-limiting
exit

service-policy  shaped-service-policy
    name           shaped-service-policy
    service-class  rate-policy-class
exit

service         shaped-service
    name            shaped-service
    service-policy  shaped-service-policy
exit

```

### Troubleshooting

To determine the number of packets meeting the rate limit check, execute the command on the PCLI:
```
show stats packet-processing action success rate-limit-check
```

To determine the number of packets dropped as a result of exceeding flow rate check, execute the command on the PCLI:
```
show stats packet-processing action failure rate-limit-check flow-rate-exceeded
```

To determine the number of packets dropped as a result of exceeding shared flow rate check, execute the command on the PCLI:
```
show stats packet-processing action failure rate-limit-check shared-rate-exceeded
```

### Caveats

* Enabling rate-limiting at a service level does have an impact on system performance and requires additional memory.
* Using _rate-limit-policy_ in _shared_ mode on systems with multiple CPU cores where packet processing worker threads are provisioned on both cores will have a greater impact on system performance as locking is necessary to ensure consistency in aggregate calculations.
* Shared rate limiting is shared across all sessions within a 128T node and is not shared across nodes of a HA pair.
* Shared rate limiting is not shared across multiple routers processing sessions for the same service.
