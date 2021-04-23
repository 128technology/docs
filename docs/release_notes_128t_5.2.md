---
title: 128T 5.2 Release Notes
sidebar_label: '5.2'
---

## Release 5.2.0

### New Features and Improvements

- **I95-37459 Show Commands for Services:** The [show fib](cli_reference.md#show-fib) and [show fib lookup](cli_reference.md#show-fib-lookup)commands have been enhanced to provide more granular path-related debugging.
------
- **I95-39336 Best Path Criteria:** The [service-policy](config_reference_guide.md/#service-policy) has been enhanced to include values that allow the the router to select the best path based on the current latency/MoS values of the paths. 
------
- **I95-38081 Automatic generation of MSS Value:** The [network-interface configuration object](config_reference_guide.md#network-interface) now has an automatic option for the enforced-mss value. This automatically calculates the MSS of the network interface from the interface session MTU.


### Resolved Issues

- **I95-29583 Default Language Setting:** Changes to the default language are now saved per user, not per system.
------



------
- **I95-39298 STEP Waypoint NAT Support:** When a resolved external NAT address is present in the adjacency configuration, it is used when advertising the peer path in the STEP router document.
------
