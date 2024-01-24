---
title: Router Migration to Mist-Managed
sidebar_label: Router Migration to Mist-Managed
---

The document will cover the steps that can be followed to migration a router from conductor managed to MIST managed following some manual steps.

:::warning
The migration operation will be service impacting.
:::

## Prerequisites

The conductor and router has to run version x.x.x or newer of the MIST WAN Assurance plugin
The router has been onboarded and connected to the MIST cloud using the adoption workflow i.e. registration-code. Details on this can be found here
For HA router, each node should have its own direct connection to the MIST cloud
The router has to be online and connected to the cloud in order for the migration process to be initiated
The router is running 6.0.0 or newer version that is cloud ready
User (re-)creates the router configuration on the MIST cloud
The MIST cloud config should have the necessary configuration for establishing a successful cloud connection post migration


## Preparation

While still connected to the conductor, the system environment has to be prepared for migration to the MIST cloud
For inband management use case, please ensure the MIST config template allows access to the conductor via SSH. This would be important to ensure connectivity during the migration

### Device Map Generation
While the conductor based system allows the user to configure the device-interface via PCI mapping, the MIST based deployment relies on name mapping instead. In order to create a compatible device map, the following commands

Create a new hardware-bootstrapper entry point to only generate the device-map