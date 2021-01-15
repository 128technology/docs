---
title: Set Hostname
---

Set the system hostname of a 128T node to the default value of `node.router` or define a custom name.

## Installation

The Set Hostname plugin is obtained from the official 128T software repository.

:::important
It is recommended to use the conductor GUI > Plugins page for installing plugins. This allows the system to select the correct version of plugin based on the 128T version.
:::

:::important
After installing the plugin, the 128T service on the conductor should be restarted for the changes to take effect.
:::

## Configuration

The plugin confiugration is managed at the node level. If `enabled` is set the hostname will be set to `node.router`, but if `name` is configured, it will be set as the hostname. If `name` is not set and it is `disabled` the hostname will remain as currently set.

## Caveat
Ensure your `PS1` shell variable includes `\H` instead of `\h` to view the full hostname otherwise in the `node.router` case you will only see the `node` component, but the system hostname will be accurate.
