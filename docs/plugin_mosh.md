# Mosh Plugin

The Mosh plugin provides the ability to install the MObile SHell (MOSH)[https://mosh.org/] on 128T nodes.  Mosh is provided under GNU GPLv3.

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
