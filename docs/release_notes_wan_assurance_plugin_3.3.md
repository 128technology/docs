---
title: WAN Assurance Plugin 3.3 Release Notes
sidebar_label: '3.3'
---

## Release 3.3.1

### New Features
- **WAN-782 Support for automatic detection of custom applications:**

The services where all addresses belong to RFC1918 address space will be reported to the MIST backend as custom apps. These custom apps will be visible in the Application insights page along side other auto detected applications.

### Resolved Issues

- **WAN-658 Duplicate ARP events being generated:** The duplicate events were generated every time the connection to the cloud was disrupted. The condition is now handled more gracefully and duplicate events are no longer generated.

- **WAN-618 Releasing SSR from one org to another can result in errors** The device will auto-detect a transition from one org to another eliminating the need to explicitly release and un-release the device. The device, however, will still remain in the inventory of the original org which the user can clean up at their convenience.

- **MIST-59532 Peer down alerts are not being reported for HA routers:** Correct device-interface name is being used to populate the events for HA router to prevent the events from being discarded.

- **I95-45173 Newly on-boarded routers were reported as dummy-router in the MIST inventory:** The initial registration process is now delayed until conductor completes the full reinitialization of the router and the configured router and node names are available.

- **I95-45171 The service-router is not auto-generated when the plugin is enabled by default:** The FQDN based service auto-generation has been deprecated and the auto-generation is not required anymore.
