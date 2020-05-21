---
title: '128T IPSEC Client Plugin 1.0 Release Notes'
sidebar_label: '1.0'
---

## Special Considerations
This version of the plugin is compatible with any 128T version less than 4.3 and greater than or equal to 3.2.8.


## Release 1.0.4

### Issues Fixed

- **PLUGIN-384** Added an MTU configuration option to the ipsec profile.
- **PLUGIN-333** The `plugin-network` ip prefix setting in the configuration was ignored and would instead use the default ip prefix setting.
- **PLUGIN-336** Using the `vector-name` configuration option would generate invalid configuration.
- **PLUGIN-400** Added a local subnet configuration option and enhanced the remote subnet configuration option to allow a list of values.


## Release 1.0.1

### Issues Fixed
- **PLUGIN-47** Created generic IPSEC client plugin to provide connectivity to remote IPSEC endpoints. This version supports a single client with up to two remote endpoints.