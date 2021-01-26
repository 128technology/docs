---
title: Set Hostname
---

Set the system hostname of a 128T node to the default value of `node.router` or define a custom hostname. Where `node` and `router` are set to the respective values defined in 128T configuration.

## Installation

The Set Hostname plugin is obtained from the official 128T software repository.

:::important
It is recommended to use the conductor GUI > Plugins page for installing plugins. This allows the system to select the correct version of plugin based on the 128T version.
:::

:::important
After installing the plugin, the 128T service on the conductor should be restarted for the changes to take effect.
:::

## Configuration

The plugin confiugration is managed at the node level. If `enabled`, the plugin will auto-generate a hostname of `node.router` unless the `hostname` field is configured to a value besides `auto`. If `disabled` the hostname will remain as currently set.

### Enabled

Either of the below examples will result in `node.router` as the hostname.

```
set-hostname
    enabled   true
exit
```

```
set-hostname
    enabled   true
    hostname  auto
exit
```

The below example will set the hostname to `custom-name`.

```
set-hostname
    enabled   true
    hostname  custom-name
exit
```

### Disabled

```
set-hostname
    enabled   false
exit
```

## Caveat
Ensure your `PS1` shell variable includes `\H` instead of `\h` to view the full hostname otherwise in the `node.router` case you will only see the `node` component, but the system hostname will be accurate.
