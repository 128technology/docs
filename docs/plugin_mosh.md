---
title: Mosh Plugin
sidebar_label: Mosh
---
<!-- markdown-link-check-disable-next-line -->
The Mosh plugin provides the ability to install the MObile SHell [MOSH](https://mosh.org/) on SSR nodes. Mosh is provided under GNU GPLv3.

:::note
The instructions for installing and managing the plugin can be found [here](plugin_intro.md#installation-and-management).
:::

## Configuration

The configuration to manage this plugin is located in the `node` configuration

```
*admin@t133-dut1.conductor (node[name=TNode])# show
name          TNode
asset-id      t133-dut2.openstacklocal
role          combo

mosh
    enabled  true
exit
```

## Release Notes

### Release 2.0.0

#### Issues Fixed

- **PLUGIN-768** Support the Mosh plugin in SSR versions `5.1.0` and greater.
