---
title: Mosh Plugin
sidebar_label: Mosh
---

The Mosh plugin provides the ability to install the MObile SHell [MOSH](https://mosh.org/) on 128T nodes.  Mosh is provided under GNU GPLv3.

## Installation

The 128T Mosh plugin is obtained from the official 128T software repository.

:::important
It is recommended to use the conductor GUI > Plugins page for installing plugins. This allows the system to select the correct version of plugin based on the 128T version.
:::

:::important
After installing the plugin, the 128T service on the conductor should be restarted for the changes to take effect.
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
