---
title: Local Configuration Override 
sidebar_label: Local Configuration Override
---

In some situations, local administrators may need to make configuration changes to their router in order to repair or establish communications. In these environments they may not have access to the conductor, or may not be able to communicate with the personnel responsible for managing the conductor. This feature allows the admin to make local changes without having conductor connectivity, and prevents the local changes from being overwritten when that connectivity is reestablished.

## How It Works

Use the command `set config local-override` to prevent conductor generated configuration changes from being applied to a router. This command will not interfere with the communication between the router and a conductor, allowing router status and other information to continue to be exchanged. 

## Configuration

Use the command `set config local-override` to engage or disengage the `config local-override` mode. This command is issued at the `router` level, for a router, and cannot target individual nodes or a Conductor.
```
config
	authority
		router 	router-east128t
			set config local-override
			exit
		exit
	exit
```

The commands can be run on the router, or on the conductor targeting a router. Attempting to run the command targeting a conductor will return an error.

**Enable/Disable on a Router:**
```
admin@combo-east-1.RTR_EAST_COMBO# set config local-override
```
```
admin@combo-east-1.RTR_EAST_COMBO# set config local-override disabled
```

**Enable/Disable from a Conductor targeting a Router:** 

```
admin@conductor-east-1.RTR_EAST_CONDUCTOR# set config local-override router RTR_EAST_COMBO
```
```
admin@conductor-east-1.RTR_EAST_CONDUCTOR# set config local-override disabled router RTR_EAST_COMBO
```

:::info
If you are making configuration changes directly on a router and `config local-override` is not enabled, a message is displayed notifying you of the option to enable it.
```
admin@combo-east-1.RTR_EAST_COMBO# configure authority router RTR_EAST_COMBO
% Warning: You are about to make configuration changes to a router that is managed by a Conductor. These changes could be overwritten at
any time by the Conductor. Consider enabling config local override mode to prevent the conductor from overwriting the local changes by
running 'set config local-override'.
Are you sure you want to edit 'description'? [y/N]:
```
:::

### Comparing Configurations

Using `set config local-override` puts the managed router's configuration in local override mode. This prevents configuration updates from the Conductor from overwriting the current router configuration. However, configuration updates from the conductor are saved on the router as an exported config named `last-seen-conductor-config`. 

When local override mode is engaged, copy of the router configuration is saved as an exported configuration on the router named `at-local-override`. This is saved as a baseline for the original router config.

The user can diff the router current config against either the `last-seen-conductor-config`, or the original router config `at-local-override` before changes were made. It is important to note that any changes made to the local router while in local override mode **will not** be sync'ed to the conductor.

- To compare the running config against the config when local override mode was engaged use: `compare config at-local-override`.

- To compare running config against the last seen conductor config use: `compare config last-seen-conductor-config`.

- To revert to the original configuration when local override mode was engaged, use: `import config at-local-override`.

### Disabling Local Override Mode

Use the command `set config local-override disable` to disable the local override mode. The router fetches the latest configuration from the conductor and applies it to the local configuration. Any changes that were made to the local router while in local override mode will be lost. If you wish to keep the router local configuration changes, they must be made on the conductor prior to disabling local override mode.   

### Show Commands

The following commands are used to view the local configuration override status of the router.

`show config out-of-sync`

The Local Override column indicates the config local override mode status:

```
admin@conductor-east-1.RTR_EAST_CONDUCTOR# show config out-of-sync
Fri 2023-04-07 20:35:28 UTC
Retrieving configuration version...

============== ============================= =========================== ================
 Router Name    Conductor Commit Time         Difference From Conductor   Local Override
============== ============================= =========================== ================
 Burbank        Sat 1970-04-11 09:48:20.000   9 seconds                   True
 LosAngeles     Sat 1970-04-11 09:48:20.000   9 seconds                   True
 NewYork        Sat 1970-04-11 07:48:29.000   2 hours                     False
 Boston         Sat 1970-04-04 09:48:29.000   7 days                      False
 SanFrancisco   None                          3 months                    True
 Houston        Disconnected                  Unknown                     Unknown
 Madrid         Disconnected                  Unknown                     Unknown
```

`show config locally-modified`

The Local Override column indicates the config local override mode status:

```
admin@conductor-east-1.RTR_EAST_CONDUCTOR# show config locally-modified
Fri 2023-04-07 20:47:05 UTC
Retrieving configuration version...

============= ============================= ============================= ================
 Router Name   Conductor Commit Time         Local Commit Time             Local Override
============= ============================= ============================= ================
 Burbank       Sat 1970-04-11 09:48:20.000   Sat 1970-04-11 09:48:20.000   True
 LosAngeles    Sat 1970-04-11 09:48:20.000   Sat 1970-04-11 09:48:20.000   False
```

`show config local-override`

This command shows the local override status of any router. 

```
admin@conductor-east-1.RTR_EAST_CONDUCTOR# show config local-override router all
Fri 2023-04-07 20:35:28 UTC
Retrieving configuration local override status...

============== ================
 Router Name    Local Override
============== ================
 Burbank        True
 LosAngeles     True
 NewYork        False
 Boston         False
 SanFrancisco   True
 Houston        Unknown
 Madrid         Unknown
```
