---
title: HA Sync Redundancy Plugin
sidebar_label: HA Sync Redundancy Plugin
---

The HA Sync Redundancy plugin adds the ability to include an additional link in the team interface configured as per [Non-Forwarding HA Interfaces](https://docs.128technology.com/docs/config_non_forwarding_ha_interfaces). This plugin automates the manual process described [here](https://docs.128technology.com/docs/config_adding_interfaces_to_ha_team/). Additionally, the plugin provides the ability to use the HA sync connection (single or dual-member) to send HA fabric traffic as well by creating a vlan sub-interface and setting up a KNI interfae in a bridge with this sub-interface.

## Configuration Snippet

### Redundant HA Sync Interface
The configuration sample below will add Linux interface `enp0s14f1` to the HA sync team interface.
```
config

    authority

        router  lshields
            name  lshields

            node  lanner7573
                name                lanner7573

                ha-sync-redundancy
                    redundant-interface    enp0s14f1
                exit
            exit
        exit
    exit
exit
```

### HA Fabric Over HA Sync
The configuration sample below will auto-generate HA fabric interfaces that will leverage the existing HA sync connection to transit between the nodes.
```
config

    authority

        router  lshields
            name  lshields

            ha-sync-redundancy
                generate-shared-fabric-interface    true
            exit
        exit
    exit
exit
```

This will auto-generate the configuration for a device-interface named `ha-fabric` on any nodes in the router, each with a network-interface named `ha-fabric-intf`. The addresses used on these interfaces will be from the network `169.254.252.0/30`. The network can be overridden by specifying a different network range for the option `fabric-network` within the `ha-sync-redundancy` container.

## Use Cases
Within an HA router, the communication that occurs on the HA sync connection is vital to proper operation of the router. In many ways it should be thought of as akin to a backplane of a chassis based router, despite the fact that it is provided through an Ethernet connection. Due to the importance of this connection to proper functionality, customers often wish to provide redundant connections for this traffic in case of cable or interface failure.

Additionally there is typically a desire to minimize the number of cables that run between two nodes in an HA router, possibly due to lack of physical ports available. This plugin gives the ability to leverage the existing HA sync connection for HA fabric traffic in order to limit the number of physical connections between the two nodes. This can either allow users to avoid the use of three cables when using a redundant HA connection or two avoid using two when the hardware does not provide sufficient ports.

## Troubleshooting

### Config Auto-Generation
When enabling use of the shared fabric interface, this plugin auto-generates configuration for a kni host interface named `ha-fabric`. If expected configuration is not being generated, please check the following log on the conductor for errors.
```
/var/log/128technology/plugins/ha-sync-redundancy-generate-configuration.log
```

### Plugin State
The `show plugin state` command provides useful information in troubleshooting proper performance of the plugin. The `summary` version of this command shows a simple table indicating the status of the team and/or bridge as well as their individual members. A sample output of a fully working plugin is shown below.

:::note
If only using one of the two options in this plugin, the output will only contain information for either the team or bridge.
:::

```
admin@node1.conductor# show plugins state router router1 summary 128T-ha-sync-redundancy
Fri 2021-09-03 20:05:53 UTC
Retrieving state data...
Target: node1.router1

============== ======== ====== ================
 Interface      Exists   Up     In Bridge/Team
============== ======== ====== ================
 team-ens3      True     True   N/A
 ens3           True     True   True
 ens4           True     True   True
 ha-fabric-br   True     True   N/A
 fabric         True     True   True
 ha-fabric      True     True   True

Target: node2.router1

============== ======== ====== ================
 Interface      Exists   Up     In Bridge/Team
============== ======== ====== ================
 team-ens3      True     True   N/A
 ens3           True     True   True
 ens4           True     True   True
 ha-fabric-br   True     True   N/A
 fabric         True     True   True
 ha-fabric      True     True   True

Retrieved state data.
Completed in 4.12 seconds
admin@node1.conductor#
```
If there is a False value for any of these fields, further investigation should be undertaken as outlined below.

The `show plugin state` command can also be issued with a `detail` option. This option will report the output of the Linux commands `brctl show` and `teamdctl <team name> state` which can provide additional details of the status of the bridge and team interfaces.

:::note
 If only using one of the two options in this plugin, the output will only contain information for either the team or bridge.
:::

```
admin@node1.conductor# show plugins state router router1 detail 128T-ha-sync-redundancy
Fri 2021-09-03 20:17:21 UTC
Retrieving state data...

============================================================================
 node1.router1
============================================================================
   Fabric Status:
 bridge name    bridge id               STP enabled     interfaces
 ha-fabric-br           8000.500000020001       no              fabric
                                                        ha-fabric

   Team Status:
     ports:
       ens3:
         ifinfo:
           dev_addr:                           50:00:00:02:00:01
           dev_addr_len:                       6
           ifindex:                            3
           ifname:                             ens3
         link:
           duplex:                             full
           speed:                              1000
           up:                                 True
         link_watches:
           list:
             link_watch_0:
               delay_down:                     0
               delay_up:                       0
               down_count:                     1
               name:                           ethtool
               up:                             True
           up:                                 True
       ens4:
         ifinfo:
           dev_addr:                           50:00:00:02:00:01
           dev_addr_len:                       6
           ifindex:                            4
           ifname:                             ens4
         link:
           duplex:                             full
           speed:                              1000
           up:                                 True
         link_watches:
           list:
             link_watch_0:
               delay_down:                     0
               delay_up:                       0
               down_count:                     0
               name:                           ethtool
               up:                             True
           up:                                 True
     runner:
       active_port:                            ens4
     setup:
       daemonized:                             False
       dbus_enabled:                           True
       debug_level:                            0
       kernel_team_mode_name:                  activebackup
       pid:                                    11070
       pid_file:                               /var/run/teamd/team-ens3.pid
       runner_name:                            activebackup
       zmq_enabled:                            False
     team_device:
       ifinfo:
         dev_addr:                             50:00:00:02:00:01
         dev_addr_len:                         6
         ifindex:                              11
         ifname:                               team-ens3
```

The sections below contain information on how the plugin orchestrates the setup of the team and bridge interfaces. This information can be used to troubleshoot proper operation of the plugin if these commands show issues with either the team or the bridge.

### Plugin Configuration
When configuration is created for this plugin, the conductor will create a configuration file with the appropriate information on each node of the router. This file will be located in the directory `/var/lib/128technology/plugins/ha-sync-redundancy/` and named `config.yaml`. A copy of this file named `config.yaml.current` will also be found in this directory if the config was read correctly. This file is used to maintain the last state of the configuration to detect when changes are made so that interfaces no longer needed can be cleaned up. The contents of this file should look as follows (based on the configuration above).

```yaml
redundant_interface: "enp0s14f0"
ha_fabric_vlan: "1000"
```

:::note
It can take several minutes after a commit from conductor for this file to be generated
:::

### Configuration handling
Upon generation of the configuration file, a configuration handler will be executed. This handler will read the configuration file and will setup the redundant team interface member as well as setup a [kni namespace script](https://docs.128technology.com/docs/plugin_kni_namespace_scripts/) configuration file that will handle the vlan interface and bridge creation. This script will write errors to the log file `/var/log/128technology/plugins/ha-sync-redundancy.log`, which can provide information if issues arise. The config handler can also be executed manually by running `/usr/bin/t128-ha-sync-redundancy-config-handler`.

The contents of this file should look similar to what is shown below.
```yaml
vlan-interfaces:
- name: fabric
  base-intf: team-enp10s0f0
  vlan-id: 2000
bridges:
- name: ha-fabric-br
  kni-intf: ha-fabric
  target-intf: fabric
```

### Kni Namespace script
This portion is only relevant to the configuration of a HA Fabric Vlan. After the configuration has been handled, as mentioned above, a configuration file for the namespace scripts will be generated at `/var/lib/128technology/kni/host/ha-fabric.conf`. In addition, symbolic links should be created to the kni namespace scripts in the directory `/etc/128technology/plugins/network-scripts/host/ha-fabric` as shown below:

```
[root@lr202006003427 ha-fabric]# ll
total 20
lrwxrwxrwx 1 root root  69 Aug 30 20:26 init -> /etc/128technology/plugins/network-scripts/default/kni_namespace/init
-rwxr-xr-x 1 root root 246 Aug 30 20:52 monitoring
lrwxrwxrwx 1 root root  62 Aug 30 20:26 reinit -> /etc/128technology/plugins/network-scripts/host/ha-fabric/init
lrwxrwxrwx 1 root root  73 Aug 30 20:26 shutdown -> /etc/128technology/plugins/network-scripts/default/kni_namespace/shutdown
lrwxrwxrwx 1 root root  72 Aug 30 20:26 startup -> /etc/128technology/plugins/network-scripts/default/kni_namespace/startup
[root@lr202006003427 ha-fabric]#
```

If these scripts have errors, they will be shown in `/var/log/128technology/highway.log`. On occasion, setting the log-level to debug will provide additional details of how these scripts are run and errors they generate.

## Release Notes

:::warning
The plugin must be updated to version 1.1.0 or later prior to [upgrading the conductor to SSR version 5.4.0.](intro_upgrade_considerations.md#plugin-config-generation-changes)
:::

### Release 1.1.0

#### Issues Fixed

- **PLUGIN-1451**  Config generation for the plugin failing

  _**Resolution:**_ Correctly handle the config generation for routers where the plugin is not enabled during config generation
