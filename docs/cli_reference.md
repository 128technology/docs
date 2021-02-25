---
title: 'Command Line Reference'
sidebar_label: 'Command Line Reference'
---

This reference is better understood if you know the basics of how to operate the PCLI.  If you have not used the PCLI before, it is beneficial to first read [the basics about the PCLI](concepts_pcli.md) and the [basics of the configuration management](config_basics.md).

## `clear arp`

Clear the entire ARP cache or a subset if arguments are provided.

#### Usage

```
clear arp [{vlan <vlan> | ip <ip>}] [device-interface <device-interface>] [force] [node <node>] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| device-interface | The device interface on which to clear the ARP cache (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| ip | The IP address for which to clear an ARP entry (must be specified after &#x27;device-interface&#x27;) [type: IP address] |
| node | The name of the node |
| router | The name of the router |
| vlan | The VLAN on which to clear the ARP cache (must be specified after &#x27;device-interface&#x27;) [type: int] |

##### See Also

| command | description |
| ------- | ----------- |
| [`show arp`](#show-arp) | Shows the contents of the ARP table on the specified node. |

#### Description

The `clear arp` command is typically used during troubleshooting, to remove ARP (Address Resolution Protocol) entries from a 128T router or node&#x27;s ARP cache. The command has multiple filters, allowing administrators to specify which specific entry to remove. The PCLI will auto-complete typed entries for improved accuracy. 

#### Version History
| Release | Modification                |
| ------- | --------------------------- |
| 3.2.0   | This feature was introduced |

## `clear bgp`

Clear routes associated with one or all BGP neighbors.

#### Usage

```
clear bgp vrf <vrf-name> [{in | out | soft}] [force] router <router> <neighbor>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| in | Soft reset received BGP updates |
| out | Soft reset transmitted BGP updates |
| router | The name of the router for which to clear BGP neighbors |
| soft | Soft reset received and transmitted BGP updates |
| vrf | Clears routes associated with one or all BGP neighbors in the specified VRF. |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| neighbor | neighbor ip-address [type: IP address or &#x27;all&#x27;] |

##### See Also

| command | description |
| ------- | ----------- |
| [`show bgp`](#show-bgp) | Displays information about the state of the BGP process on the 128T router. |

## clear context router

#### Usage
```
clear context router
```

#### Description
Clear both the router context and node context.

#### Version History
| Release | Modification                  |
| ------- | ----------------------------- |
| 5.0.0   | This feature has been removed |

#### See Also
- [clear context node](#clear-context-node) Clear only the node context
- [set context router](#set-context-router) Set the context to a different router
- [set context stats start-time](#set-context-stats-start-time) Set the start time for show stats commands

## clear context stats start-time

#### Usage
```
clear context stats start-time
```

#### Description
Clears the start time for show stats commands.

#### Version History
| Release | Modification                  |
| ------- | ----------------------------- |
| 5.0.0   | This feature has been removed |

## clear events admin

#### Usage
```
clear events admin
```

#### Description
Clears admin event records.

#### Version History
| Release | Modification                  |
| ------- | ----------------------------- |
| 4.5.0   | This feature has been removed |

## clear events alarm

#### Usage
```
clear events alarm
```

#### Description
Clears alarm event records.

#### Version History
| Release | Modification                  |
| ------- | ----------------------------- |
| 4.5.0   | This feature has been removed |

## clear events all

#### Usage
```
clear events all
```

#### Description
Clears all event records.

#### Version History
| Release | Modification                  |
| ------- | ----------------------------- |
| 4.5.0   | This feature has been removed |

## clear events system

#### Usage
```
clear events system
```

#### Description
Clears system event records.

#### Version History
| Release | Modification                  |
| ------- | ----------------------------- |
| 4.5.0   | This feature has been removed |

## clear events traffic

#### Usage
```
clear events traffic
```

#### Description
Clears traffic event records.

#### Version History
| Release | Modification                  |
| ------- | ----------------------------- |
| 4.5.0   | This feature has been removed |

## `clear history`

Clear the PCLI's command history for this user.

#### Usage

```
clear history
```

##### See Also

| command | description |
| ------- | ----------- |
| [`show history`](#show-history) | Show PCLI command history for the current user. |

## clone

Clone the configuration of one router to create a new router with a new name and identical contents. 

#### Usage

```
router [force] <name> <new-name>
```
##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | An identifier for the router |
| new-name | The new value for the router name |

#### Example
```
admin@conductor-east-1.RTR_EAST_CONDUCTOR# configure authority clone router Boston NewYork
```

#### Description
The clone command duplicates the configuration data from the existing `Boston` router into a new router with the name `NewYork`, and stages it to the candidate configuration.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 5.0.0   | This feature was introduced |

## `commit`

Commit the candidate config as the new running config.

#### Usage

```
commit [force] [validate-local]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |
| validate-local | Only validate the configuration on the Conductor |

#### Description

The `commit` command causes the 128T router to validate the candidate configuration, and then replace the running configuration with the candidate configuration (assuming it passes the validation step). It is used once a series of configuration changes have been made, and an administrator wishes to &quot;activate&quot; those configuration changes.

When run from a 128T conductor, the conductor will first validate the configuration itself before distributing configuration to all of its managed routers for each of them to validate the configuration. After the managed routers have all reported the results of their validation, the commit activity takes place (assuming a successful validation). This distributed validation can be skipped by using the validate-local keyword argument.

The `commit` command will prompt a user for confirmation, as this is a (potentially) service affecting command. By supplying the optional `force` keyword, the confirmation step is skipped:

```
*admin@labsystem1.fiedler# commit
Are you sure you want to commit the candidate config? [y/N]: y
Configuration committed

*admin@labsystem1.fiedler# commit force
Configuration committed
admin@labsystem1.fiedler#
```
If the validation step fails, the administrator will be notified, the commit step is not executed, and the existing running configuration will remain in place. The validator will get a list of all errors that must be addressed before the commit can be completed. There may also be warnings displayed in the event that the candidate configuration contains elements that are deprecated.

#### Example

```
*admin@burl-corp-primary.burl-corp# commit
✖ Validating, then committing...
% Error: Failed to commit:
1. Service name "bar" does not exist

    config
        authority
            router burl-corp
                service-route foo
                    service-name

2. A service route must have at least one next-hop, peer,
nat-target, use-learned-routes, routing-stack or host configured. It cannot have both
the peer and nat-target configured.

    config
        authority
            router burl-corp
                service-route foo

3. Service-route foo for service '' is not allowed on router burl-corp. Please check the applies-to config
on the service.

    config
        authority
            router burl-corp
                service-route foo
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 3.0.0   | `force` feature was added   |


## `compare config`

Display the differences between two configurations.

#### Usage

```
compare config [<old>] [<new>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| old | The original configuration against which differences should be computed (default: running). Can be _candidate_, _running_, _factory-defaults_, or the name of a previously exported configuration. |
| new | The updated configuration for which differences should be computed. Can be _candidate_, _running_, _factory-defaults_, or the name of a previously exported configuration. |

#### Description

The `compare config` command presents a list of differences between the two configurations specified as arguments on the command line. The one listed first influences the output in a very important way: the 128T router will return a list of configuration commands that will cause the configuration to be listed _first_ to be brought to parity with the one listed _second_. (Note: since the only editable configuration is the &quot;candidate&quot; configuration, the changes outlined by the _compare config_ command cannot be directly applied to the &quot;running&quot; configuration.)

The ability to specify _a previously exported configuration file_ to compare against the running or candidate config allows you to compare configurations **without** having to import the exported config into the candidate config for comparison. 

In the example below, the candidate and running configurations are identical save for a single _service-route_ that has been added to the candidate configuration.

```
*admin@labsystem1.fiedler# compare config running candidate

config
    authority
        router  Fabric128
            name           Fabric128
            service-route  myRoute
                name          myRoute
                service-name  myService
                destination   10.10.10.10
            exit
        exit
    exit
exit
```

This shows that the running configuration is missing the candidate's service-route. By reversing the order of the arguments, the output changes:

```
*admin@labsystem1.fiedler# compare config candidate running

config
    authority
        router  Fabric128
            name           Fabric128
            delete service-route force myRoute
        exit
    exit
exit
```

Note here that the output shows that the running configuration has _deleted the candidate configuration's service-route_ via the `delete service-route force myRoute` statement. Cutting and pasting this configuration into the PCLI will affect the candidate configuration – and make it match the running configuration.

When two configurations are identical, comparing them will return that there are no changes to display:

```
admin@labsystem1.fiedler# compare config candidate running

# No differences
admin@labsystem1.fiedler#
```

##### See Also

| command | description |
| ------- | ----------- |
| [`create config autogenerated`](#create-config-autogenerated) | Run configuration generation. |
| [`delete config exported`](#delete-config-exported) | Delete an exported configuration from disk. |
| [`export config`](#export-config) | Export a copy of the current running or candidate config. |
| [`import config`](#import-config) | Import a configuration as the candidate config. |
| [`restore config factory-default`](#restore-config-factory-default) | Restore the candidate config to the factory defaults. |
| [`restore config running`](#restore-config-running) | Discard uncommitted changes from the candidate config. |
| [`set config encryption`](#set-config-encryption) | Sets the encryption key for the 128T configuration |
| [`show config exports`](#show-config-exports) | Display configuration exports. |
| [`show config version`](#show-config-version) | Display running configuration version. |
| [`show events config commit`](#show-events-config-commit) | Shows events related to running config change |
| [`show stats config`](#show-stats-config) | Metrics pertaining to the get-config RPC |

#### Version History

| Release | Modification                |
| ------- | --------------------------- |
| 2.0.0   | This feature was introduced |
| 5.1.0   | Added the ability to compare between the running or candidate config and an exported config, or between two exported configurations. |

## configure

#### Usage
```
configure [authority [ ... ] ]
```

#### Description

The `configure` command places administrators into the configuration tree (hierarchy), where they will be making changes to the _candidate configuration_. When entered as a standalone command (i.e., `configure` by itself), the administrator is placed at the top of the configuration tree.

```
admin@labsystem1.fiedler# configure
admin@labsystem.beacon (config)#
```

Alternatively, administrators may execute the `configure` command with optional arguments to enter into configuration mode "deeper" in the configuration tree. For example:

```
admin@labsystem1.fiedler# configure authority router Fabric128
admin@labsystem1.fiedler (router[name=Fabric128])#
```

By supplying optional arguments to the configure command as in the above example, the administrator has entered into the configuration tree at the "router" tier, within the router element named "Fabric128". Not only can administrators enter into the configuration tree at any point through this technique, but new configuration can also applied directly in this same way.

```
admin@labsystem1.fiedler# configure auth router Fabric128 description "sample description"
admin@labsystem1.fiedler# show config candidate

config

    authority
        name      Authority128

        router    Fabric128
            name                 Fabric128
            location             usa
            description          "sample description"
...
```
#### Required Fields
Some arguments and subcommands contain required fields for configuration. The `configure` help text now identifies required fields. For example:
```
...
usage: inter-node-security [<security-ref>]

The name of the security policy used for inter node communication between router interfaces

positional arguments:
security-ref    The value to set for this field

security-ref (leafref) (required): This type is used by other entities that need to reference configured security policies. 

Options: internal, aes1, or test
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 2.0.0   | Command was renamed to `configure` from `config` |


## `connect`

Connect to a Managed Router.  For more information, read [Connecting to 128T Routers from Conductor](ts_connecting_to_routers.md).

#### Usage

```
connect [username <username>] router <router> node <node>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| node | The node to connect to |
| router | The router to connect to |
| username | Username to use for login to the Managed Router (default: &lt;current user&gt;) |

## `create capture-filter`

Creates a capture-filter using BPF syntax (as used in wireshark) on the target interface.

#### Usage

```
create capture-filter device-interface <device-interface> router <router> node <node> <capture-filter>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| device-interface | The device interface on which to create the capture filter |
| node | The node on which to create the capture filter |
| router | The router on which to create the capture filter |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| capture-filter | The capture-filter to create (Uses BPF syntax) |

##### See Also

| command | description |
| ------- | ----------- |
| [`delete capture-filter`](#delete-capture-filter) | Deletes a capture-filter created using create capture-filter. (It will not delete filters committed as part of the configuration.) |
| [`show capture-filters`](#show-capture-filters) | Show active capture-filters. |
| [`show stats packet-capture`](#show-stats-packet-capture) | Stats pertaining to captured packets |

#### Example

```
admin@tp-colo-primary.tp-colo# create capture-filter device-interface blended-5 "host 172.18.5.4"
Successfully created capture-filter
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 4.4.0   | This feature was introduced |

## `create certificate request webserver`

Create a certificate signing request.

#### Usage

```
create certificate request webserver
```

##### See Also

| command | description |
| ------- | ----------- |
| [`create certificate self-signed webserver`](#create-certificate-self-signed-webserver) | Create a self-signed certificate. |
| [`delete certificate webserver`](#delete-certificate-webserver) | Delete the webserver certificate. |
| [`import certificate webserver`](#import-certificate-webserver) | Import a certificate to be used by the webserver. |
| [`show certificate webserver`](#show-certificate-webserver) | Display the webserver certificate |

#### Description

The `create certificate request webserver` generates a certificate-request, which is then sent to a Certificate Authority. The 128T router will, through a series of interactive prompts, request information from the administrator to generate either the request or certificate, as appropriate.

The certificate created by the `create certificate` command stores its output file at `/etc/128technology/pki/`.

## `create certificate self-signed webserver`

Create a self-signed certificate.

#### Usage

```
create certificate self-signed webserver
```

##### See Also

| command | description |
| ------- | ----------- |
| [`create certificate request webserver`](#create-certificate-request-webserver) | Create a certificate signing request. |
| [`delete certificate webserver`](#delete-certificate-webserver) | Delete the webserver certificate. |
| [`import certificate webserver`](#import-certificate-webserver) | Import a certificate to be used by the webserver. |
| [`show certificate webserver`](#show-certificate-webserver) | Display the webserver certificate |

#### Description

The `create certificate self-signed webserver` generates a self-signed certificate which is used for the local webserver. The 128T router will, through a series of interactive prompts, request information from the administrator to generate either the request or certificate, as appropriate.

#### Example

```
admin@labsystem1.fiedler# create certificate self-signed webserver
Certificate common name: test.128technology.com
Country name (2 char): US
State name: MA
Organization name: 128Technology
RSA key size (2048/4096) [4096]: 4096
Certificate validity in days (1 - 7300) [365]: 365
Self-signed certificate successfully
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number: 31228 (0x79fc)
...
```

## `create config autogenerated`

Run configuration generation.

#### Usage

```
create config autogenerated
```

#### Description

Forces re-generation of all automatically generated configuration items, and stages the configuration changes into the current candidate configuration. Configuration generation is done automatically as part of a `commit`. This command serves only to aid in debugging, and allows you to validate, inspect, and make edits, without committing the changes.

##### See Also

| command | description |
| ------- | ----------- |
| [`compare config`](#compare-config) | Display the differences between two configurations. |
| [`delete config exported`](#delete-config-exported) | Delete an exported configuration from disk. |
| [`export config`](#export-config) | Export a copy of the current running or candidate config. |
| [`import config`](#import-config) | Import a configuration as the candidate config. |
| [`restore config factory-default`](#restore-config-factory-default) | Restore the candidate config to the factory defaults. |
| [`restore config running`](#restore-config-running) | Discard uncommitted changes from the candidate config. |
| [`set config encryption`](#set-config-encryption) | Sets the encryption key for the 128T configuration |
| [`show config exports`](#show-config-exports) | Display configuration exports. |
| [`show config version`](#show-config-version) | Display running configuration version. |
| [`show events config commit`](#show-events-config-commit) | Shows events related to running config change |
| [`show stats config`](#show-stats-config) | Metrics pertaining to the get-config RPC |

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 5.1.0   | This feature was introduced |

## `create session-capture`

Creates a session capture at the specified node and service.

#### Usage

```
create session-capture [source-ip <source-ip>] [source-port <source-port>] [destination-ip <destination-ip>] [destination-port <destination-port>] [protocol <protocol>] [session-count <session-count>] [packet-count <packet-count>] [local-only] service <service> router <router> node <node>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| destination-ip | The destination IP address/prefix to match [type: IP prefix] (default: 0.0.0.0/0) |
| destination-port | The destination port to match (can be a range) [type: port or port-range] (default: 0-65535) |
| local-only | Session capture is local to the node |
| node | The ingress node on which to create the session capture |
| packet-count | The number of packets to capture per session, in each direction [type: &#x27;unlimited&#x27; or positive int] (default: 100) |
| protocol | The protocol to match (in decimal or by name, eg &#x27;tcp&#x27;) [type: string or uint8] (default: all) |
| router | The router on which to create the session capture |
| service | The service on which to create the session capture |
| session-count | The number of sessions to capture [type: &#x27;unlimited&#x27; or positive int] (default: 100) |
| source-ip | The source IP address/prefix to match [type: IP prefix] (default: 0.0.0.0/0) |
| source-port | The source port to match (can be a range) [type: port or port-range] (default: 0-65535) |

##### See Also

| command | description |
| ------- | ----------- |
| [`delete session-capture`](#delete-session-capture) | Deletes session capture from selected service. |
| [`delete session-capture by-id`](#delete-session-capture-by-id) | Deletes session-capture by capture-id from selected service. |
| [`show session-captures`](#show-session-captures) | Show active session-captures. |

#### Description

When destination or source IPs are not specified, any IP will be matched.

When destination or source port is not provided, port range of 0-65535 is used.

When protocol is not provided, all protocols will be matched.

When session-count is not specified, default will be unlimited.

When packet-count is not specified, default is 100 packets in each direction for each session matched.

## `create user`

Create a new user account interactively.

#### Usage

```
create user <username>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| username | the name of the account to create |

##### See Also

| command | description |
| ------- | ----------- |
| [`delete user`](#delete-user) | Delete a user account |
| [`edit prompt`](#edit-prompt) | Allows the user to specify a custom format for the PCLI prompt. |
| [`edit user`](#edit-user) | Modify an existing user account |
| [`restore prompt`](#restore-prompt) | Restore the PCLI prompt to the factory default. |
| [`restore users factory-default`](#restore-users-factory-default) | Restore the user configuration to factory defaults. |
| [`set password`](#set-password) | Change your password. |
| [`show user`](#show-user) | Display information for user accounts. |

#### Description

The `create user` command allows administrators to create user accounts for user and/or administrative access to the 128T router&#x27;s management port. Issuing the `create user &lt;username&gt;` launches an interactive session that prompts for the new user&#x27;s full name, password, whether they are an administrative or basic user, and the enabled/disabled state of that user account.

:::note
The password must be at least eight characters long, with at least one uppercase letter, one lowercase letter, one digit, and cannot contain any characters that repeat more than three times.
:::

#### Example

```
admin@labsystem1.fiedler# create user jdeveloper
Creating account "jdeveloper"...
Full Name: Joe Developer
Password: <not echoed to screen>
Confirm: <not echoed to screen>
Role (user | admin) [user]: admin
Enabled: true
Account "jdeveloper" successfully created
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |


## `delete capture-filter`

Deletes a capture-filter created using create capture-filter. (It will not delete filters committed as part of the configuration.)

#### Usage

```
delete capture-filter device-interface <device-interface> router <router> node <node> <capture-filter>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| device-interface | The device interface on which to delete the capture filter |
| node | The node on which to remove the capture filter |
| router | The router on which to remove the capture filter |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| capture-filter | The capture-filter to remove (Uses BPF syntax) |

##### See Also

| command | description |
| ------- | ----------- |
| [`create capture-filter`](#create-capture-filter) | Creates a capture-filter using BPF syntax (as used in wireshark) on the target interface. |
| [`show capture-filters`](#show-capture-filters) | Show active capture-filters. |
| [`show stats packet-capture`](#show-stats-packet-capture) | Stats pertaining to captured packets |

#### Example

```
admin@tp-colo-primary.tp-colo# delete capture-filter device-interface blended-5 "host 172.18.5.4"
Successfully deleted capture-filter
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 4.4.0   | This feature was introduced |

## delete (in config)

#### Usage

```
delete { <configuration> } [ force ]
```

#### Description

The `delete` command, when issued within the configuration hierarchy, lets administrators delete portions of the candidate configuration. This can be used to delete specific fields within a configuration element, or entire elements.

The command will prompt you for confirmation before deleting the configuration, unless the optional keyword `force` is included.

#### Example

```
admin@labsystem1.fiedler# config authority router burlington
admin@labsystem1.fiedler (router[name=burlington])# delete node combo1
Are you sure you want to delete item "[name=combo1]" [y/N]: N
Operation canceled
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |


## `delete certificate webserver`

Delete the webserver certificate.

#### Usage

```
delete certificate webserver [force]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### See Also

| command | description |
| ------- | ----------- |
| [`create certificate request webserver`](#create-certificate-request-webserver) | Create a certificate signing request. |
| [`create certificate self-signed webserver`](#create-certificate-self-signed-webserver) | Create a self-signed certificate. |
| [`import certificate webserver`](#import-certificate-webserver) | Import a certificate to be used by the webserver. |
| [`show certificate webserver`](#show-certificate-webserver) | Display the webserver certificate |

#### Description

The _delete certificate webserver_ command allows administrators to delete certificates that are stored on the 128T router. Note that the 128T router will always prompt the administrator to confirm deletion (the &quot;force&quot; keyword is not allowed).

#### Example

```
admin@labsystem1.fiedler# delete certificate webserver
Are you sure you want to delete certificate 'webserver'? [y/N]: y
admin@labsystem1.fiedler#
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## `delete config exported`

Delete an exported configuration from disk.

#### Usage

```
delete config exported [force] <name>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | Name of the exported configuration to delete |

##### See Also

| command | description |
| ------- | ----------- |
| [`compare config`](#compare-config) | Display the differences between two configurations. |
| [`create config autogenerated`](#create-config-autogenerated) | Run configuration generation. |
| [`export config`](#export-config) | Export a copy of the current running or candidate config. |
| [`import config`](#import-config) | Import a configuration as the candidate config. |
| [`restore config factory-default`](#restore-config-factory-default) | Restore the candidate config to the factory defaults. |
| [`restore config running`](#restore-config-running) | Discard uncommitted changes from the candidate config. |
| [`set config encryption`](#set-config-encryption) | Sets the encryption key for the 128T configuration |
| [`show config exports`](#show-config-exports) | Display configuration exports. |
| [`show config version`](#show-config-version) | Display running configuration version. |
| [`show events config commit`](#show-events-config-commit) | Shows events related to running config change |
| [`show stats config`](#show-stats-config) | Metrics pertaining to the get-config RPC |

#### Description

The _delete config_ command allows administrators to delete configurations from the 128T&#x27;s filesystem that had previously been exported with the _export config_ command. The _force_ flag will skip the confirmation check without prompting the user.

#### Example

```
admin@cnd1.conductor# delete config exported 20180115_export.gz
Are you sure that you want to delete exported config '20180115_export.gz'? [y/N]: y
Successfully deleted exported configuration: '20180115_export.gz'
admin@cnd1.conductor#
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.2.0   | This feature was introduced |

## `delete flows`

Clears all active flow data from this node.

#### Usage

```
delete flows [force] [node <node>] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |
| node | The node from which to delete flow entries |
| router | The router from which to delete flow entries |

#### Description

The _delete flows_ command clears all active flow data from this node. Administrators can specify which node to clear flow data from by adding the node name as an optional argument to the command.

This command has been maintained for backward compatibility to older versions of software. The delete sessions command is preferred in versions newer than 3.2.0.

:::warning
This may be a service impacting operation.
:::

#### Example

```
admin@labsystem1.fiedler# delete flows linecard-test
admin@labsystem1.fiedler#
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## `delete session-capture`

Deletes session capture from selected service.

#### Usage

```
delete session-capture [source-ip <source-ip>] [source-port <source-port>] [destination-ip <destination-ip>] [destination-port <destination-port>] [protocol <protocol>] [session-count <session-count>] [packet-count <packet-count>] [local-only] service <service> router <router> node <node>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| destination-ip | The destination IP address/prefix to match [type: IP prefix] (default: 0.0.0.0/0) |
| destination-port | The destination port to match (can be a range) [type: port or port-range] (default: 0-65535) |
| local-only | Session capture is local to the node |
| node | The node on which to remove the session-capture filter |
| packet-count | The number of packets to capture per session, in each direction [type: &#x27;unlimited&#x27; or positive int] (default: 100) |
| protocol | The protocol to match (in decimal or by name, eg &#x27;tcp&#x27;) [type: string or uint8] (default: all) |
| router | The router on which to remove the session-capture filter |
| service | The service on which to create the session capture |
| session-count | The number of sessions to capture [type: &#x27;unlimited&#x27; or positive int] (default: 100) |
| source-ip | The source IP address/prefix to match [type: IP prefix] (default: 0.0.0.0/0) |
| source-port | The source port to match (can be a range) [type: port or port-range] (default: 0-65535) |

##### Subcommands

| name | description |
| ---- | ----------- |
| by-id | Deletes session-capture by capture-id from selected service. |

##### See Also

| command | description |
| ------- | ----------- |
| [`create session-capture`](#create-session-capture) | Creates a session capture at the specified node and service. |
| [`delete session-capture by-id`](#delete-session-capture-by-id) | Deletes session-capture by capture-id from selected service. |
| [`show session-captures`](#show-session-captures) | Show active session-captures. |

## `delete session-capture by-id`

Deletes session-capture by capture-id from selected service.

#### Usage

```
delete session-capture by-id service <service> router <router> node <node> <capture-id>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| node | The node on which to remove the session-capture filter |
| router | The router on which to remove the session-capture filter |
| service | The service on which to create the session capture |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| capture-id | The session-capture to remove. [type: int] |

##### See Also

| command | description |
| ------- | ----------- |
| [`create session-capture`](#create-session-capture) | Creates a session capture at the specified node and service. |
| [`delete session-capture`](#delete-session-capture) | Deletes session capture from selected service. |
| [`show session-captures`](#show-session-captures) | Show active session-captures. |

## `delete sessions`

Delete all current sessions or a subset if arguments are provided.

#### Usage

```
delete sessions [{session-id <session-id> | service-name <service-name>}] [force] [node <node>] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |
| node | The node from which to delete sessions |
| router | The router from which to delete sessions |
| service-name | The name of the service for which to delete all sessions |
| session-id | The identifier of the session to be deleted |

#### Description

The _delete sessions_ command removes all current sessions or a subset if arguments are provided.
:::warning
This may be a service impacting operation.
:::

## `delete user`

Delete a user account

#### Usage

```
delete user [force] <username>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| username | the name of the account to delete |

##### See Also

| command | description |
| ------- | ----------- |
| [`create user`](#create-user) | Create a new user account interactively. |
| [`edit prompt`](#edit-prompt) | Allows the user to specify a custom format for the PCLI prompt. |
| [`edit user`](#edit-user) | Modify an existing user account |
| [`restore prompt`](#restore-prompt) | Restore the PCLI prompt to the factory default. |
| [`restore users factory-default`](#restore-users-factory-default) | Restore the user configuration to factory defaults. |
| [`set password`](#set-password) | Change your password. |
| [`show user`](#show-user) | Display information for user accounts. |

#### Example

```
admin@labsystem1.fiedler# delete user jdeveloper
Delete account 'jdeveloper'? [y/N]: y
Account 'jdeveloper' successfully deleted
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## `edit prompt`

Allows the user to specify a custom format for the PCLI prompt.

#### Usage

```
edit prompt <format>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| format | Format string for the prompt display |

##### See Also

| command | description |
| ------- | ----------- |
| [`create user`](#create-user) | Create a new user account interactively. |
| [`delete user`](#delete-user) | Delete a user account |
| [`edit user`](#edit-user) | Modify an existing user account |
| [`restore prompt`](#restore-prompt) | Restore the PCLI prompt to the factory default. |
| [`restore users factory-default`](#restore-users-factory-default) | Restore the user configuration to factory defaults. |
| [`set password`](#set-password) | Change your password. |
| [`show user`](#show-user) | Display information for user accounts. |

#### Description

The _edit prompt_ command lets administrators change the display of the PCLI prompt, and includes a flexible array of options for customizability. In addition to various variables, the prompt string can include conditional statements, to affect the display of the prompt under different operating modes. All of this is accomplished by supplying a _format string_, which contains the syntax of the desired PCLI prompt.
```
State Variables
===============

{user}      - Name of the currently logged in user
{address}   - Address (node.router) of the current system
{node}      - Name of the connected node
{router}    - Name of the connected router
{context}   - Currently set context if one is set; empty otherwise
{path}      - Full path to the current PCLI menu, separated by &#x27;/&#x27;
{location}  - Name of current PCLI menu
{privilege} - &quot;#&quot; if the current user has administrator privileges, else &quot;&gt;&quot;

Conditional Variables
=====================

{top-level}  - Evaluates true if the PCLI is at the top menu
{uncomitted} - Evaluates true if the candidate configuration differs from the running configuration

Conditionals
============

A conditional statement allows the prompt to be customized with conditional or state variables

The format of a conditional statement is:

    [condition?value_if_true:value_if_false]

The condition is true if a state variable is not an empty string or if a conditional variable is true

For example:

    'This prompt is [top-level?definitely:not] top level'

Yields one of the following:

    'This prompt is definitely top level' (if top-level is true or has a value)

    'This prompt is not top level' (if top-level is false or has no value)

Timestamps
==========

Custom timestamps are created with the use of standard strftime format codes

For example:

    '(%x %H:%M) {user}@{address}$ '

Yields:

    '(03/08/17 11:46) admin@node.router$ '

See <https://docs.python.org/3/library/datetime.html#strftime-strptime-behavior> for all format codes

Any '?'s that appear in a timestamp must be escaped with a '\'

Special characters*
==================

\n - Newline
\t - Tab
\[ - Literal '['
\] - Literal ']'
{{ - Literal '{'
}} - Literal '}'
%% - Literal '%'

* Use \\ if not using a quoted string to specify the prompt
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.1.0   | This feature was introduced |


## `edit user`

Modify an existing user account

#### Usage

```
edit user [<username>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| username | The name of the account to modify (default: &lt;current user&gt;) |

##### See Also

| command | description |
| ------- | ----------- |
| [`create user`](#create-user) | Create a new user account interactively. |
| [`delete user`](#delete-user) | Delete a user account |
| [`edit prompt`](#edit-prompt) | Allows the user to specify a custom format for the PCLI prompt. |
| [`restore prompt`](#restore-prompt) | Restore the PCLI prompt to the factory default. |
| [`restore users factory-default`](#restore-users-factory-default) | Restore the user configuration to factory defaults. |
| [`set password`](#set-password) | Change your password. |
| [`show user`](#show-user) | Display information for user accounts. |

#### Description

The _edit user_ command enters a configuration subtree specific to administering user accounts. From within this subtree, administrators can change any of the attributes associated with a user account (full name, password, role, and enabled state). This is done in a "configuration-like" way, where commands are issued as _attribute value_.

As with standard configuration, using the &amp;quot;?&amp;quot; command will list the options available for editing.

#### Example

```
admin@labsystem1.fiedler# edit user jdeveloper
admin@labsystem1.fiedler (user[name=jdeveloper])# ?

User Attributes
---------------
enabled      Enable or disable this user.
full-name    The user's full name, for display purposes only.
password     No help available
role         A list of roles assigned to the user.

General Commands
----------------
delete       Delete an attribute from a user account
do           Execute a top-level command
exit         Exit this menu (You can also press Ctrl+D)
quit         Quit the PCLI
top          Return to the root menu
up           Exit this menu and navigate up the hierarchy the given number of levels
where        Display the current location in the CLI hierarchy

admin@labsystem1.fiedler (user[name=jdeveloper])#
```
Modifying these attributes is done as follows:
```
admin@labsystem1.fiedler (user[name=jdeveloper])# full-name "Joseph Developer"
Account 'jdeveloper' updated successfully
admin@labsystem1.fiedler (user[name=jdeveloper])# top
admin@labsystem1.fiedler# show user jdeveloper

=============================
 Information for jdeveloper:
=============================
 Enabled: true
 Full Name: Joseph Developer
 Role: admin
admin@labsystem1.fiedler#
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## exit (in config)

The _exit_ command moves your focus to the PCLI home.

#### Usage

```
exit
```

#### Example

```
admin@labsystem1.fiedler# config authority router beacon
admin@labsystem1.fiedler (router[name=beacon])# where
configure authority router beacon
admin@labsystem1.fiedler (router[name=beacon])# exit
admin@labsystem1.fiedler# where
admin@labsystem1.fiedler#
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## `export config`

Export a copy of the current running or candidate config.

#### Usage

```
export config <datastore> <export-name>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| datastore | running \| candidate |
| export-name | A name consisting of alphanumeric characters or any of the following: . - _ |

##### See Also

| command | description |
| ------- | ----------- |
| [`compare config`](#compare-config) | Display the differences between two configurations. |
| [`create config autogenerated`](#create-config-autogenerated) | Run configuration generation. |
| [`delete config exported`](#delete-config-exported) | Delete an exported configuration from disk. |
| [`import config`](#import-config) | Import a configuration as the candidate config. |
| [`restore config factory-default`](#restore-config-factory-default) | Restore the candidate config to the factory defaults. |
| [`restore config running`](#restore-config-running) | Discard uncommitted changes from the candidate config. |
| [`set config encryption`](#set-config-encryption) | Sets the encryption key for the 128T configuration |
| [`show config exports`](#show-config-exports) | Display configuration exports. |
| [`show config version`](#show-config-version) | Display running configuration version. |
| [`show events config commit`](#show-events-config-commit) | Shows events related to running config change |
| [`show stats config`](#show-stats-config) | Metrics pertaining to the get-config RPC |

#### Description

The _export_ command takes a configuration from a previously created backup (via _create config backup_), from the candidate configuration, or from the 128T router&#x27;s running configuration, and stores it as a file on the local filesystem. It can then be taken off, moved onto other systems, archived, etc.

Exported files are stored in /etc/128technology/config-backups/ and are stored as GZIP compressed files.

The _export_ command&#x27;s complement, _import_ is used to reverse the process, taking a configuration archive and restoring it onto a system.

#### Example

```
admin@labsystem1.fiedler# export config candidate myCandidate
Successfully exported configuration: /etc/128technology/config-exports/myCandidate.gz
admin@labsystem1.fiedler#
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |
| 3.1.0   | The location of the exported configuration changed |

## `import certificate webserver`

Import a certificate to be used by the webserver.

#### Usage

```
import certificate webserver
```

##### See Also

| command | description |
| ------- | ----------- |
| [`create certificate request webserver`](#create-certificate-request-webserver) | Create a certificate signing request. |
| [`create certificate self-signed webserver`](#create-certificate-self-signed-webserver) | Create a self-signed certificate. |
| [`delete certificate webserver`](#delete-certificate-webserver) | Delete the webserver certificate. |
| [`show certificate webserver`](#show-certificate-webserver) | Display the webserver certificate |

#### Description

This command allows administrators to load certificates into their 128T router by pasting them into their active PCLI session. By issuing the `import certificate` command, the PCLI prompts the user for the name of the certificate they plan to import, then asks whether it is a CA (certificate authority) certificate or not. Once these questions are answered, administrators can paste the certificate, and is reminded to press CTRL-D once the pasting is complete. Pressing CTRL-D causes the 128T router to validate the configuration to ensure it is a valid X.509 certificate before loading it into persistent storage. If the X.509 validation fails, the user is informed as follows:

#### Example

```
admin@labsystem1.fiedler# import certificate webserver
Enter the CA certificate in PEM format (Press CTRL-D to finish):
Certificate is not in valid X509 format
admin@labsystem1.fiedler#
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## `import config`

Import a configuration as the candidate config.

#### Usage

```
import config [force] <name>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | Name of the configuration file to import |

##### See Also

| command | description |
| ------- | ----------- |
| [`compare config`](#compare-config) | Display the differences between two configurations. |
| [`create config autogenerated`](#create-config-autogenerated) | Run configuration generation. |
| [`delete config exported`](#delete-config-exported) | Delete an exported configuration from disk. |
| [`export config`](#export-config) | Export a copy of the current running or candidate config. |
| [`restore config factory-default`](#restore-config-factory-default) | Restore the candidate config to the factory defaults. |
| [`restore config running`](#restore-config-running) | Discard uncommitted changes from the candidate config. |
| [`set config encryption`](#set-config-encryption) | Sets the encryption key for the 128T configuration |
| [`show config exports`](#show-config-exports) | Display configuration exports. |
| [`show config version`](#show-config-version) | Display running configuration version. |
| [`show events config commit`](#show-events-config-commit) | Shows events related to running config change |
| [`show stats config`](#show-stats-config) | Metrics pertaining to the get-config RPC |

#### Description

This command takes a backup configuration (one that has been stored with the `export` command) and overwrites the current candidate configuration with its contents. Inclusion of the optional &quot;force&quot; keyword will skip the prompt for confirmation.

#### Example

```
admin@labsystem1.fiedler# import config myCandidate.gz
Replace the existing candidate configuration with the contents of backup _myCandidate.gz_? [y/N]: y
Backup configuration _myCandidate.gz_ successfully written to the candidate config
admin@labsystem1.fiedler#
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## `import iso`

Import 128T ISO to the local repository

#### Usage

```
import iso [force] [verbose] {hunt | filepath <filepath>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| filepath | The absolute filepath to the ISO |
| force | Skip confirmation prompt |
| hunt | Find and import all ISOs from the filesystem |
| verbose | Increase log level verbosity |

#### Example

```
admin@conductor.Conductor# import iso hunt
This command is resource intensive and can take a while. Are you sure? [y/N]: y
Current Installer version: 2.5.0-0.20200326163206.snapshot
Installer will run in non-interactive mode
Refreshing DNF cache (this may take a few minutes)
Cleaning DNF data: expire-cache
Making the DNF cache
Cleaning legacy local repos (this may take a few minutes)
Installer will hunt for ISOs to import
Importing packages for 128T-4.4.0-0.202004021313.release.el7.x86_64.rpm
Installer complete
Import success
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 4.4.0   | This feature was introduced |

## `manage plugin install`

Install a plugin on conductor.

#### Usage

```
manage plugin install [node <node>] <name> [<version>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| node | Node to install on (default: all) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | Name of plugin to install |
| version | Version of plugin to install (default: latest) |

##### See Also

| command | description |
| ------- | ----------- |
| [`manage plugin remove`](#manage-plugin-remove) | Remove an installed plugin. |
| [`show plugins available`](#show-plugins-available) | Shows latest verison of plugins available for install. |
| [`show plugins installed`](#show-plugins-installed) | Shows installed plugins. |

## `manage plugin remove`

Remove an installed plugin.

#### Usage

```
manage plugin remove [node <node>] <name>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| node | Node to remove on (default: all) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | Name of plugin to be removed |

##### See Also

| command | description |
| ------- | ----------- |
| [`manage plugin install`](#manage-plugin-install) | Install a plugin on conductor. |
| [`show plugins available`](#show-plugins-available) | Shows latest verison of plugins available for install. |
| [`show plugins installed`](#show-plugins-installed) | Shows installed plugins. |

## `migrate`

Migrate a 128T router to a new conductor. For more details on the 128T rotuer migration read the [How to: Conductor Migration](howto_conductor_migration.md).

#### Usage

```
migrate [skip-validation] [force] conductor <address> [<address>] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| conductor | The address(es) of the conductor node(s) to migrate to |
| force | Skip confirmation prompt |
| router | The router to migrate |
| skip-validation | Attempt to migrate the router without checking if migration is possible |

##### See Also

| command | description |
| ------- | ----------- |
| [`send command download`](#send-command-download) | Download 128T software on a router |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command restart`](#send-command-restart) | Restart a 128T node |
| [`send command rollback`](#send-command-rollback) | Rollback a 128T router to the previously installed version |
| [`send command start`](#send-command-start) | Start a 128T node |
| [`send command stop`](#send-command-stop) | Stop a 128T node |
| [`send command upgrade`](#send-command-upgrade) | Upgrade a 128T node |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the 128T software versions available for download and upgrade. |
| [`show assets`](#show-assets) | Shows the automated provisioning status of 128T nodes. |
| [`show assets software`](#show-assets-software) | Shows assets software information. |
| [`show assets summary`](#show-assets-summary) | A summary of assets connected to the Conductor. |

## `ping`

Send an ICMP request through a network interface.

#### Usage

```
ping [count <count>] [size <size>] [timeout <timeout>] [set-df-bit] [egress-interface <egress-interface>] [gateway-ip <gateway-ip>] router <router> node <node> <destination-ip>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| count | Number of ping requests to send [type: int] (default: 4) |
| egress-interface | Network interface from which to ping |
| gateway-ip | Gateway IP address from which to ping [type: IP address] |
| node | The node from which to send the ping request |
| router | The router from which to send the ping request |
| set-df-bit | Set the IPv4 &#x27;Don&#x27;t Fragment&#x27; bit on the request packet |
| size | Number of data bytes to send [type: int] (default: 56) |
| timeout | Time to wait for a response, in seconds [max: 10 seconds] [type: int] (default: 1) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| destination-ip | Destination IP of the ping request [type: IP address] |

#### Description

This issues ICMP requests to the specified _destination-ip_ merely as a connectivity test, and bypasses the typical packet processing logic that would potentially restrict access to various tenants and destined for service addresses. The _count_ modifier will affect the number of pings that are issued. The _interface_ modifier lets administrators specify the egress interface for issuing the pings. The _timeout_ modifier will set the waiting period for a reply before declaring the ping as a failure. The _set-df-bit_ and _record-route_ options enable the respective flags in the outgoing ICMP request.

#### Example

```
admin@gouda.novigrad# ping egress-interface wan-interface 8.8.8.8
PING 8.8.8.8 56 bytes of data.
Ping from 8.8.8.8 (8.8.8.8): icmp_seq=0 ttl=57 time=12.97ms
Ping from 8.8.8.8 (8.8.8.8): icmp_seq=1 ttl=57 time=10.597ms
Ping from 8.8.8.8 (8.8.8.8): icmp_seq=2 ttl=57 time=10.643ms
Ping from 8.8.8.8 (8.8.8.8): icmp_seq=3 ttl=57 time=10.444ms
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.2.0   | This feature was introduced. The previous behavior of the _ping_ command is now realized as _service-ping_ |

## `quit`

Quit the PCLI.

#### Usage

```
quit
```

#### Description

This command logs the user out, and quits the PCLI.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## `refresh dns resolutions`

Refreshes all DNS resolutions configured on the platform.

#### Usage

```
refresh dns resolutions [hostname <hostname>] [force] [router <router>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| hostname | The DNS hostname belonging to a node |
| router | The name of the router (default: &lt;current router&gt;) |

##### See Also

| command | description |
| ------- | ----------- |
| [`set dns resolution`](#set-dns-resolution) | Sets a hostname resolution temporarily until the next time the node processes config |
| [`show dns resolutions`](#show-dns-resolutions) | Shows all DNS resolutions |

## `release dhcp lease`

Releases an active DHCP lease.

#### Usage

```
release dhcp lease [force] network-interface <network-interface> router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| network-interface | The network interface on which to release the current DHCP lease |
| router | The name of the router |

##### See Also

| command | description |
| ------- | ----------- |
| [`show dhcp mappings`](#show-dhcp-mappings) | Show each DHCP mapping from an interface to mapping/IP family/config types. |
| [`show dhcp prefix-delegation`](#show-dhcp-prefix-delegation) | Show the prefix learned for prefix-delegation. |
| [`show dhcp v4`](#show-dhcp-v4) | Display dhcp lease info for network-interfaces. |
| [`show dhcp v6`](#show-dhcp-v6) | Display dhcp lease info for network-interfaces. |

## `repeat`

Repeat any command multiple times.

#### Usage

```
repeat [beep] [exit-on-failure] [interval <interval>] <command> [<command> ...]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| beep | Beep if the command fails to execute |
| exit-on-failure | Exit if the command fails to execute |
| interval | Seconds to wait between updates [type: int] (default: 2) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| command | Command to repeat |

#### Description

This command can be used to &quot;watch&quot; statistics over a specified period. In order to stop the _repeat_ command, the user must issue a `CTRL-C`.

#### Example

```
admin@gouda.novigrad# repeat show stats device-interface

Running "show stats device-interface" every 2 seconds

Wed 2020-04-22 17:42:04 UTC
Retrieving statistics...

Device Interface Management Stats
---------------------------------

================= ======= =======
 Metric            Node    Value
================= ======= =======
 message-failure   gouda       0
 message-success   gouda       2

Completed in 1.66 seconds
```

## `replace config`

Search for and replace configuration data that matches a specified pattern.

#### Usage

```
replace config [force] <find> <replace>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Replace all matching data without prompts |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| find | The text to find in the candidate configuration |
| replace | The new value to replace &#x27;find&#x27; with |

#### Description

The _replace_ command is a powerful tool for making sweeping configuration changes, similar to a &quot;find and replace&quot; operation in a word processor.
The _replace_ command has several optional arguments that affect how the replacement occurs; _case-sensitive_ will only match elements within the configuration that match the case supplied with the _query_ string. The _regex_ argument treats the query string as a regular expression. The _whole-word_ argument requires that the match be an entire word, rather than just a substring or partial match.

The user-supplied _query string_ and _replacement string_ are the matching text, and the replacement text, respectively.

#### Example

```
admin@labsystem1.fiedler# replace config all internal newInternal
Replacing 'config authority router RTR_EAST_CONDUCTOR inter-node-security internal' with 'newInternal'...
Replacing 'config authority router RTR_EAST_COMBO inter-node-security internal' with 'newInternal'...
Replacing 'config authority router RTR_WEST_COMBO inter-node-security internal' with 'newInternal'...
Replacing 'config authority router RTR_CENTRAL_COMBO inter-node-security internal' with 'newInternal'...
Replacing 'config authority security internal name internal' with 'newInternal'...
Replace completed successfully
admin@labsystem1.fiedler#
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.1.0   | This feature was introduced |

## `restore config factory-default`

Restore the candidate config to the factory defaults.

#### Usage

```
restore config factory-default [force]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### See Also

| command | description |
| ------- | ----------- |
| [`compare config`](#compare-config) | Display the differences between two configurations. |
| [`create config autogenerated`](#create-config-autogenerated) | Run configuration generation. |
| [`delete config exported`](#delete-config-exported) | Delete an exported configuration from disk. |
| [`export config`](#export-config) | Export a copy of the current running or candidate config. |
| [`import config`](#import-config) | Import a configuration as the candidate config. |
| [`restore config running`](#restore-config-running) | Discard uncommitted changes from the candidate config. |
| [`set config encryption`](#set-config-encryption) | Sets the encryption key for the 128T configuration |
| [`show config exports`](#show-config-exports) | Display configuration exports. |
| [`show config version`](#show-config-version) | Display running configuration version. |
| [`show events config commit`](#show-events-config-commit) | Shows events related to running config change |
| [`show stats config`](#show-stats-config) | Metrics pertaining to the get-config RPC |

#### Description

This command removes all administrator-added configuration, and restores the basic configuration to all of the 128T router&#x27;s factory default settings. The PCLI will prompt for confirmation before resetting the configuration, unless the optional _force_ modifier is added.

#### Example

```
admin@labsystem1.fiedler# restore config factory-default
Are you sure you want to restore the candidate config to factory defaults? [y/N]: n
Operation canceled
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.1.0   | This feature was introduced. Replaces the deprecated `reset-factory-default-config` |

## `restore config running`

Discard uncommitted changes from the candidate config.

#### Usage

```
restore config running [force]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### See Also

| command | description |
| ------- | ----------- |
| [`compare config`](#compare-config) | Display the differences between two configurations. |
| [`create config autogenerated`](#create-config-autogenerated) | Run configuration generation. |
| [`delete config exported`](#delete-config-exported) | Delete an exported configuration from disk. |
| [`export config`](#export-config) | Export a copy of the current running or candidate config. |
| [`import config`](#import-config) | Import a configuration as the candidate config. |
| [`restore config factory-default`](#restore-config-factory-default) | Restore the candidate config to the factory defaults. |
| [`set config encryption`](#set-config-encryption) | Sets the encryption key for the 128T configuration |
| [`show config exports`](#show-config-exports) | Display configuration exports. |
| [`show config version`](#show-config-version) | Display running configuration version. |
| [`show events config commit`](#show-events-config-commit) | Shows events related to running config change |
| [`show stats config`](#show-stats-config) | Metrics pertaining to the get-config RPC |

#### Description

This command removes all administrator-added configuration since the last _commit_, effectively bringing the running configuration and the candidate configuration back to parity. The PCLI will prompt for confirmation before resetting the configuration, unless the optional _force_ modifier is added.

#### Example

```
*admin@node1.bernstein# restore config running
Are you sure you want to discard uncommitted changes from the candidate config? [y/N]: y
Candidate configuration changes successfully discarded
*admin@node1.bernstein#
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.1.0   | This feature was introduced |
| 2.0.0   | Previously named _restore config candidate_ |

## `restore prompt`

Restore the PCLI prompt to the factory default.

#### Usage

```
restore prompt [force]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### See Also

| command | description |
| ------- | ----------- |
| [`create user`](#create-user) | Create a new user account interactively. |
| [`delete user`](#delete-user) | Delete a user account |
| [`edit prompt`](#edit-prompt) | Allows the user to specify a custom format for the PCLI prompt. |
| [`edit user`](#edit-user) | Modify an existing user account |
| [`restore users factory-default`](#restore-users-factory-default) | Restore the user configuration to factory defaults. |
| [`set password`](#set-password) | Change your password. |
| [`show user`](#show-user) | Display information for user accounts. |

#### Description

The _restore prompt_ command returns the PCLI&#x27;s prompt to its factory default, in the event that an administrator has modified it.

#### Example

```
(04/10/2020 19:56) admin@gouda.novigrad$restore prompt
Restore the default prompt? [y/N]: y
PCLI prompt successfully updated
admin@gouda.novigrad#
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.1.0   | This feature was introduced |

## `restore users factory-default`

Restore the user configuration to factory defaults.

#### Usage

```
restore users factory-default [force]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### See Also

| command | description |
| ------- | ----------- |
| [`create user`](#create-user) | Create a new user account interactively. |
| [`delete user`](#delete-user) | Delete a user account |
| [`edit prompt`](#edit-prompt) | Allows the user to specify a custom format for the PCLI prompt. |
| [`edit user`](#edit-user) | Modify an existing user account |
| [`restore prompt`](#restore-prompt) | Restore the PCLI prompt to the factory default. |
| [`set password`](#set-password) | Change your password. |
| [`show user`](#show-user) | Display information for user accounts. |

#### Description

The _restore users factory-default_ command deletes all administratively created user accounts (i.e., all but the ones that are installed with the 128T routing software natively) and leaves the system with just the _admin_ and _user_ accounts.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## `rotate log`

Rotate log files.

#### Usage

```
rotate log [force] [router <router>] [node <node>] [<process-name>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to rotate logfiles |
| router | The router for which to rotate logfiles (default: &lt;current router&gt;) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| process-name | The process for which to rotate logfiles (default: all) |

##### See Also

| command | description |
| ------- | ----------- |
| [`set log level`](#set-log-level) | Set the log level of a process. |
| [`write log message`](#write-log-message) | Write a message to the log. |
| [`write log snapshot`](#write-log-snapshot) | Write a snapshot to the log. |

#### Description

This command is used to rotate log files (i.e., close the current log file and open a new one) generated by the various processes that comprise the 128T router to rotate. The 128T router&#x27;s log files, stored in `/var/log/128technology`, keep 25 prior logs for each process, space permitting. Files are rotated such that, for instance, pcli.log becomes pcli.1.log while pcli.1.log becomes pcli.2.log, and so on. The oldest log file for each process is removed.

The _rotate log_ command is useful prior to engaging in troubleshooting exercises, to help narrow down which files may contain items of interest. It is particularly useful when used in conjunction with the _write_ command, described elsewhere in this document.

Without any arguments, the _rotate log_ command will rotate all log files on all nodes.

For more information about 128T logging read [Understanding Logs on the 128T](ts_logs.md)

#### Example

```
admin@labsystem1.fiedler# rotate log
Logs successfully rotated
admin@labsystem1.fiedler#
```
The optional arguments _process-name_ and _node-name_ let administrators specify which processes should rotate their logs, and on which nodes.
```
admin@labsystem1.fiedler# shell ls -ltr /var/log/128technology/ | grep highwayManager
-rw-r--r-- 1 root root    14964 Oct  8 05:34 highwayManager.4.log
-rw-r--r-- 1 root root    35908 Oct  8 05:42 highwayManager.3.log
-rw-r--r-- 1 root root    10653 Oct 11 11:12 highwayManager.2.log
-rw-r--r-- 1 root root   146057 Oct 11 11:42 highwayManager.1.log
-rw-r--r-- 1 root root   117673 Oct 11 14:48 highwayManager.log
admin@labsystem1.fiedler# rotate log highwayManager labsystem1
Logs successfully rotated

admin@labsystem1.fiedler# shell ls -ltr /var/log/128technology/ | grep highwayManager
-rw-r--r-- 1 root root    14964 Oct  8 05:34 highwayManager.5.log
-rw-r--r-- 1 root root    35908 Oct  8 05:42 highwayManager.4.log
-rw-r--r-- 1 root root    10653 Oct 11 11:12 highwayManager.3.log
-rw-r--r-- 1 root root   146057 Oct 11 11:42 highwayManager.2.log
-rw-r--r-- 1 root root   117673 Oct 11 14:48 highwayManager.1.log
-rw-r--r-- 1 root root        0 Oct 12 09:45 highwayManager.log
```
In this example you can see that what was previously named highwayManager.4.log has been _rotated_ to highwayManager.5.log; likewise, all other logs were incremented. What was highwayManager.log is now highwayManager.1.log, and a new highwayManager.log file has been created, and is empty.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## `save runtime-stats`

Gathers runtime process stats and stores it in a logfile.

#### Usage

```
save runtime-stats [force] [router <router>] [node <node>] <filename> [<process-name>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | Target node from which to gather runtime stats |
| router | Target router from which to gather runtime stats (default: &lt;current router&gt;) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| filename | Custom filename to store system information |
| process-name | Target process from which to gather runtime stats (default: all) |

#### Example

```
admin@gouda.novigrad# save runtime-stats stats.txt
Retrieving Runtime Stats...
Runtime stats saved to /var/log/128technology/stats.txt
```

## `save tech-support-info`

Gather system information for technical support.

#### Usage

```
save tech-support-info [<prefix>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| prefix | Custom file prefix to add the archive file |

#### Description

This command packages statistics, logs and other diagnostic data, to exchange with 128 Technology&#x27;s support team. The _tech-support-info_ command echoes the location where it stores the file when complete (`/var/log/128technology/tech-support-info.tar.gz`).

:::note
This command collect a lot of data, and may take some time to complete.
:::

#### Example

```
admin@labsystem1.fiedler# save tech-support-info

Retrieving Tech Support Info...
/var/log/128technology/tech-support-info.tar.gz
```


## `search`

Search for any PCLI command or configuration data from the current location in the command tree.

#### Usage

```
search <find>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| find | Find all the matching text |

##### Subcommands

| name | description |
| ---- | ----------- |
| config | Search all configuration data |
| commands | Search PCLI commands |
| config-attributes | Search configuration attributes |

#### Description

The _search_ command and its various subcommands let users search through the 128T router&#x27;s PCLI command tree, the configuration tree, and user-supplied configuration data to locate the information specified by the supplied _find_ string.

When omitting the optional filter, the _search_ command will return results for all of the types of information it can locate: commands, configuration attributes, and configuration data.

#### Example

```
admin@labsystem1.fiedler# search ntp

Commands:
  - show ntp
  - show config candidate authority router system ntp
  - show config candidate authority router system ntp server
  - show config candidate authority router system ntp server ip-address
  - show config candidate authority router system services ntp
  - show config running authority router system ntp
  - show config running authority router system ntp server
  - show config running authority router system ntp server ip-address
  - show config running authority router system services ntp

Configuration Attributes:
  - configure authority router system ntp
  - configure authority router system services ntp
```

## `search commands`

Search PCLI commands

#### Usage

```
search commands <find>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| find | Find all the matching text |

## `search config`

Search all configuration data

#### Usage

```
search config <find>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| find | Find all the matching text |

##### Subcommands

| name | description |
| ---- | ----------- |
| running | Search running configuration data |
| candidate | Search candidate configuration data |

#### Description

The output of _search_ can be filtered by explicitly specifying _commands_ configuration.

#### Example

```
admin@gouda.novigrad# search commands reset
Commands:
  - show stats highway firewall-detector tcp-reset-received
  - show stats packet-processing action success tcp-proxy sessions-reset
  - show stats redundancy session-reads tcp-reset-sent
  - show stats service-area sent tcp-reset-for-adaptive-encryption-failure
```
```
admin@labsystem1.fiedler# search config Newton

Candidate and Running Configuration:
  - config authority router Fabric128 node ptcricket location Newton, MA

admin@labsystem1.fiedler#
```

## `search config candidate`

Search candidate configuration data

#### Usage

```
search config candidate <find>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| find | Find all the matching text |

#### Example

```
admin@labsystem1.fiedler# search config candidate myRoute

Candidate Configuration:
  - config authority router Fabric128 service-route myRoute name myRoute

admin@labsystem1.fiedler#
```

## `search config running`

Search running configuration data

#### Usage

```
search config running <find>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| case-sensitive | Interpret the search query as case-sensitive |
| regex | Process the query as a regular expression |
| whole-word | Don't allow partial matches of words |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| find | Find all the matching text |

#### Example

```
admin@labsystem1.fiedler# search config running Newton

Running Configuration:
  - config authority router Fabric128 node ptcricket location Newton, MA

admin@labsystem1.fiedler#
```

## `search config-attributes`

Search configuration attributes

#### Usage

```
search config-attributes <find>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| find | Find all the matching text |

#### Description
The output of _search_ can be filtered by explicitly specifying _config-attributes_ configuration.

#### Example

```
admin@gouda.novigrad# search config-attributes name
Configuration Attributes:
  - configure authority dscp-map name
  - configure authority dynamic-hostname
  - configure authority ipfix-collector name
  - configure authority ldap-server name
  - configure authority name
  - configure authority router name
  - configure authority router nat-pool address-pool tenant-name
  - configure authority router nat-pool name
  - configure authority router node device-interface name
  - configure authority router node device-interface network-interface hostname
  - configure authority router node device-interface network-interface management-vector name
  - configure authority router node device-interface network-interface name
  - configure authority router node device-interface network-interface neighborhood name
  - configure authority router node name
  - configure authority router peer authority-name
  - configure authority router peer name
  - configure authority router peer router-name
  - configure authority router redundancy-group name
  - configure authority router routing interface name
  - configure authority router service-route host node-name
  - configure authority router service-route name
  - configure authority router service-route next-hop node-name
  - configure authority router service-route service-name
  - configure authority router service-route-policy name
  - configure authority router system log-category name
  - configure authority router system services snmp-server access-control name
  - configure authority router system services webserver server node-name
  - configure authority routing filter name
  - configure authority routing filter rule name
  - configure authority routing policy name
  - configure authority routing policy statement name
  - configure authority security name
  - configure authority service application-name
  - configure authority service name
  - configure authority service-class name
  - configure authority service-policy name
  - configure authority service-policy vector name
  - configure authority session-type name
  - configure authority tenant name
  - configure authority traffic-profile name
```

## `send command download`

Download 128T software on a router

#### Usage

```
send command download [dry-run] [force] router <router> [<version>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| dry-run | View version changes without command execution |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | The router on which to download software |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| version | The version of 128T as semantic version and optionally a release identifier (e.g. &quot;3.0.0&quot; or &quot;3.0.1-snapshot1&quot;); if not provided, the latest is assumed |

##### See Also

| command | description |
| ------- | ----------- |
| [`migrate`](#migrate) | Migrate a 128T router to a new conductor |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command restart`](#send-command-restart) | Restart a 128T node |
| [`send command rollback`](#send-command-rollback) | Rollback a 128T router to the previously installed version |
| [`send command start`](#send-command-start) | Start a 128T node |
| [`send command stop`](#send-command-stop) | Stop a 128T node |
| [`send command upgrade`](#send-command-upgrade) | Upgrade a 128T node |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the 128T software versions available for download and upgrade. |
| [`show assets`](#show-assets) | Shows the automated provisioning status of 128T nodes. |
| [`show assets software`](#show-assets-software) | Shows assets software information. |
| [`show assets summary`](#show-assets-summary) | A summary of assets connected to the Conductor. |

#### Description

_send command_ is only available within the PCLI of a 128T Conductor.

## `send command reconnect`

Attempt to reconnect an asset

#### Usage

```
send command reconnect [router <router>] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| node | The name of the node |
| router | The name of the router (default: &lt;current router&gt;) |

##### Subcommands

| name | description |
| ---- | ----------- |
| disconnected | Attempt to reconnect all disconnected assets. |

##### See Also

| command | description |
| ------- | ----------- |
| [`migrate`](#migrate) | Migrate a 128T router to a new conductor |
| [`send command download`](#send-command-download) | Download 128T software on a router |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command restart`](#send-command-restart) | Restart a 128T node |
| [`send command rollback`](#send-command-rollback) | Rollback a 128T router to the previously installed version |
| [`send command start`](#send-command-start) | Start a 128T node |
| [`send command stop`](#send-command-stop) | Stop a 128T node |
| [`send command upgrade`](#send-command-upgrade) | Upgrade a 128T node |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the 128T software versions available for download and upgrade. |
| [`show assets`](#show-assets) | Shows the automated provisioning status of 128T nodes. |
| [`show assets software`](#show-assets-software) | Shows assets software information. |
| [`show assets summary`](#show-assets-summary) | A summary of assets connected to the Conductor. |

## `send command reconnect disconnected`

Attempt to reconnect all disconnected assets.

#### Usage

```
send command reconnect disconnected [force]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### See Also

| command | description |
| ------- | ----------- |
| [`migrate`](#migrate) | Migrate a 128T router to a new conductor |
| [`send command download`](#send-command-download) | Download 128T software on a router |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command restart`](#send-command-restart) | Restart a 128T node |
| [`send command rollback`](#send-command-rollback) | Rollback a 128T router to the previously installed version |
| [`send command start`](#send-command-start) | Start a 128T node |
| [`send command stop`](#send-command-stop) | Stop a 128T node |
| [`send command upgrade`](#send-command-upgrade) | Upgrade a 128T node |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the 128T software versions available for download and upgrade. |
| [`show assets`](#show-assets) | Shows the automated provisioning status of 128T nodes. |
| [`show assets software`](#show-assets-software) | Shows assets software information. |
| [`show assets summary`](#show-assets-summary) | A summary of assets connected to the Conductor. |

## `send command restart`

Restart a 128T node

#### Usage

```
send command restart [force] router <router> node <node>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |
| node | The node to restart |
| router | The router to restart |

##### See Also

| command | description |
| ------- | ----------- |
| [`migrate`](#migrate) | Migrate a 128T router to a new conductor |
| [`send command download`](#send-command-download) | Download 128T software on a router |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command rollback`](#send-command-rollback) | Rollback a 128T router to the previously installed version |
| [`send command start`](#send-command-start) | Start a 128T node |
| [`send command stop`](#send-command-stop) | Stop a 128T node |
| [`send command upgrade`](#send-command-upgrade) | Upgrade a 128T node |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the 128T software versions available for download and upgrade. |
| [`show assets`](#show-assets) | Shows the automated provisioning status of 128T nodes. |
| [`show assets software`](#show-assets-software) | Shows assets software information. |
| [`show assets summary`](#show-assets-summary) | A summary of assets connected to the Conductor. |

#### Description

_send command_ is only available within the PCLI of a 128T Conductor.

## `send command rollback`

Rollback a 128T router to the previously installed version

#### Usage

```
send command rollback [force] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | The router to rollback |

##### See Also

| command | description |
| ------- | ----------- |
| [`migrate`](#migrate) | Migrate a 128T router to a new conductor |
| [`send command download`](#send-command-download) | Download 128T software on a router |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command restart`](#send-command-restart) | Restart a 128T node |
| [`send command start`](#send-command-start) | Start a 128T node |
| [`send command stop`](#send-command-stop) | Stop a 128T node |
| [`send command upgrade`](#send-command-upgrade) | Upgrade a 128T node |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the 128T software versions available for download and upgrade. |
| [`show assets`](#show-assets) | Shows the automated provisioning status of 128T nodes. |
| [`show assets software`](#show-assets-software) | Shows assets software information. |
| [`show assets summary`](#show-assets-summary) | A summary of assets connected to the Conductor. |

#### Description

_send command_ is only available within the PCLI of a 128T Conductor.

## `send command start`

Start a 128T node

#### Usage

```
send command start [force] router <router> node <node>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |
| node | The node to start |
| router | The router to start |

##### See Also

| command | description |
| ------- | ----------- |
| [`migrate`](#migrate) | Migrate a 128T router to a new conductor |
| [`send command download`](#send-command-download) | Download 128T software on a router |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command restart`](#send-command-restart) | Restart a 128T node |
| [`send command rollback`](#send-command-rollback) | Rollback a 128T router to the previously installed version |
| [`send command stop`](#send-command-stop) | Stop a 128T node |
| [`send command upgrade`](#send-command-upgrade) | Upgrade a 128T node |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the 128T software versions available for download and upgrade. |
| [`show assets`](#show-assets) | Shows the automated provisioning status of 128T nodes. |
| [`show assets software`](#show-assets-software) | Shows assets software information. |
| [`show assets summary`](#show-assets-summary) | A summary of assets connected to the Conductor. |

#### Description

_send command_ is only available within the PCLI of a 128T Conductor.

## `send command stop`

Stop a 128T node

#### Usage

```
send command stop [force] router <router> node <node>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |
| node | The node to stop |
| router | The router to stop |

##### See Also

| command | description |
| ------- | ----------- |
| [`migrate`](#migrate) | Migrate a 128T router to a new conductor |
| [`send command download`](#send-command-download) | Download 128T software on a router |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command restart`](#send-command-restart) | Restart a 128T node |
| [`send command rollback`](#send-command-rollback) | Rollback a 128T router to the previously installed version |
| [`send command start`](#send-command-start) | Start a 128T node |
| [`send command upgrade`](#send-command-upgrade) | Upgrade a 128T node |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the 128T software versions available for download and upgrade. |
| [`show assets`](#show-assets) | Shows the automated provisioning status of 128T nodes. |
| [`show assets software`](#show-assets-software) | Shows assets software information. |
| [`show assets summary`](#show-assets-summary) | A summary of assets connected to the Conductor. |

#### Description

_send command_ is only available within the PCLI of a 128T Conductor.

## `send command upgrade`

Upgrade a 128T node

#### Usage

```
send command upgrade [dry-run] [force] router <router> <version>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| dry-run | View version changes without command execution |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | The router to upgrade |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| version | The version of 128T as semantic version and optionally a release identifier (e.g. &quot;3.0.0&quot; or &quot;3.0.1-snapshot1&quot;); if not provided, the latest is assumed |

##### See Also

| command | description |
| ------- | ----------- |
| [`migrate`](#migrate) | Migrate a 128T router to a new conductor |
| [`send command download`](#send-command-download) | Download 128T software on a router |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command restart`](#send-command-restart) | Restart a 128T node |
| [`send command rollback`](#send-command-rollback) | Rollback a 128T router to the previously installed version |
| [`send command start`](#send-command-start) | Start a 128T node |
| [`send command stop`](#send-command-stop) | Stop a 128T node |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the 128T software versions available for download and upgrade. |
| [`show assets`](#show-assets) | Shows the automated provisioning status of 128T nodes. |
| [`show assets software`](#show-assets-software) | Shows assets software information. |
| [`show assets summary`](#show-assets-summary) | A summary of assets connected to the Conductor. |

#### Description

_send command_ is only available within the PCLI of a 128T Conductor.

## `send command yum-cache-refresh`

Refresh the yum cache as well as the 128T software versions available for download and upgrade.

#### Usage

```
send command yum-cache-refresh [force] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | The router to refresh |

##### See Also

| command | description |
| ------- | ----------- |
| [`migrate`](#migrate) | Migrate a 128T router to a new conductor |
| [`send command download`](#send-command-download) | Download 128T software on a router |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command restart`](#send-command-restart) | Restart a 128T node |
| [`send command rollback`](#send-command-rollback) | Rollback a 128T router to the previously installed version |
| [`send command start`](#send-command-start) | Start a 128T node |
| [`send command stop`](#send-command-stop) | Stop a 128T node |
| [`send command upgrade`](#send-command-upgrade) | Upgrade a 128T node |
| [`show assets`](#show-assets) | Shows the automated provisioning status of 128T nodes. |
| [`show assets software`](#show-assets-software) | Shows assets software information. |
| [`show assets summary`](#show-assets-summary) | A summary of assets connected to the Conductor. |

## `service-ping`

Send an ICMP request using a service or tenant

#### Usage

```
service-ping [count <count>] [size <size>] [timeout <timeout>] [set-df-bit] [service-name <service-name>] [tenant <tenant>] [source-ip <source-ip>] router <router> node <node> <destination-ip>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| count | Number of ping requests to send [type: int] (default: 4) |
| node | The node from which to send the ping request |
| router | The router from which to send the ping request |
| service-name | Name of service which includes the destination trying to be reached; only required if service is ambiguous |
| set-df-bit | Set the IPv4 &#x27;Don&#x27;t Fragment&#x27; bit on the request packet |
| size | Number of data bytes to send [type: int] (default: 56) |
| source-ip | IP from which to test whether traffic is allowed [type: IP address] |
| tenant | Name of source tenant for ICMP request (default is the global tenant) |
| timeout | Time to wait for a response, in seconds [max: 10 seconds] [type: int] (default: 1) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| destination-ip | Destination IP of the ping request [type: IP address] |

#### Description

This issues ICMP requests to the specified _destination-ip_, and offers the administrators a variety of ways to formulate the request. The _tenant_ and _service-name_ modifiers specify which "source tenant" to use for the request, and the name of the service for which the _destination-ip_ applies. The _count_ modifier will affect the number of pings that are issued. The _interface_ modifier lets administrators specify the egress interface for issuing the pings. The _timeout_ modifier will set the waiting period for a reply before declaring the ping as a failure. The _set-df-bit_ and _record-route_ options enable the respective flags in the outgoing ICMP request.

#### Example

```
admin@gouda.novigrad# service-ping service-name Internet tenant lanSubnet source-ip 192.168.0.5 8.8.8.8
PING 8.8.8.8 56 bytes of data.
Ping from 8.8.8.8 (8.8.8.8): icmp_seq=0 ttl=57 time=22.296ms
Ping from 8.8.8.8 (8.8.8.8): icmp_seq=1 ttl=57 time=11.303ms
Ping from 8.8.8.8 (8.8.8.8): icmp_seq=2 ttl=57 time=10.516ms
Ping from 8.8.8.8 (8.8.8.8): icmp_seq=3 ttl=57 time=10.428ms
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |
| 3.0.0   | Included tenant, service, and node information |
| 3.2.0   | Previously named _ping_     |

## `set config encryption`

Sets the encryption key for the 128T configuration

#### Usage

```
set config encryption [force] [router <router>] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |
| node | The node on which to disable config encryption (default: all) |
| router | The router on which to set config encryption (default: &lt;current router&gt;) |

##### Subcommands

| name | description |
| ---- | ----------- |
| disabled | Disables the encryption for the 128T configuration |

##### See Also

| command | description |
| ------- | ----------- |
| [`compare config`](#compare-config) | Display the differences between two configurations. |
| [`create config autogenerated`](#create-config-autogenerated) | Run configuration generation. |
| [`delete config exported`](#delete-config-exported) | Delete an exported configuration from disk. |
| [`export config`](#export-config) | Export a copy of the current running or candidate config. |
| [`import config`](#import-config) | Import a configuration as the candidate config. |
| [`restore config factory-default`](#restore-config-factory-default) | Restore the candidate config to the factory defaults. |
| [`restore config running`](#restore-config-running) | Discard uncommitted changes from the candidate config. |
| [`show config exports`](#show-config-exports) | Display configuration exports. |
| [`show config version`](#show-config-version) | Display running configuration version. |
| [`show events config commit`](#show-events-config-commit) | Shows events related to running config change |
| [`show stats config`](#show-stats-config) | Metrics pertaining to the get-config RPC |

#### Example

```
admin@node1.t128# set config encryption
Are you sure you would like to enable configuration encryption? [y/N]: y
✔ Encrypting configuration... 1/1 targets complete.
Configuration was successfully encrypted.
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 4.5.0   | This feature was introduced |

## `set config encryption disabled`

Disables the encryption for the 128T configuration

#### Usage

```
set config encryption disabled [force] [router <router>] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |
| node | The node on which to disable config encryption (default: all) |
| router | The router on which to disable config encryption (default: &lt;current router&gt;) |

#### Example

```
admin@node1.t128# set config encryption disabled
Are you sure you would like to disable configuration encryption? [y/N]: y
✔ Disabling configuration encryption... 1/1 targets complete.
Configuration encryption was successfully disabled.
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 4.5.0   | This feature was introduced |

## set context node

#### Usage

```
set context node <node>
```

##### Positional Arguments

- **node**    the name of the node

#### Description

The _set context node_ command puts the PCLI into a mode where every subsequent command that is issued that can take a node (in the case of a 128T router) as an argument will default to the context&#39;s values.

#### Version History

| Release | Modification             |
| ------- | -------------------------|
| 5.0.0   | This feature was removed |

## set context router

#### Usage

```
set context router <router>
```

##### Description

The _set context router_ command can be used to set the PCLI into a mode where every subsequent command that is issued that can take a router (in the case of the 128T Conductor) or a node (in the case of a 128T router) as an argument will default to the context&#39;s values.

:::note
This does _not_ "remote shell" into the router/node specified by the context&#39;s values, it merely uses these as default values for commands that (generally) display value. E.g., show stats, show flows, etc.
:::

When a context is set, the prompt changes to indicate the context as a parenthetical label at the beginning of each PCLI command.

Setting the context to a router is only available within the PCLI of a 128T Conductor.

##### Positional Arguments

| name | description |
| ---- | ----------- |
| router | The name of the router |

#### Example

```
admin@conductor1.labconductor# set context router beacon
(beacon) admin@conductor1.labconductor#
```

#### See Also

- [clear context node](#clear-context-node) Clear only the node context
- [clear context router](#clear-context-router) Clear both the router context and node context
- [set context stats start-time](#set-context-stats-start-time) Set the start time for show stats commands

#### Version History

| Release | Modification             |
| ------- | -------------------------|
| 5.0.0   | This feature was removed |

## set context stats start-time

#### Usage

```
set context start-time [<start-time>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| start-time | A timestamp string that can include date, time, or both. Special value "now" sets the start time point to the current time [type: timestamp or 'now'] (default: now) |

#### Description

_set context stats start-time_ lets administrators set a "zero time" for all statistics that the 128T has accumulated. While this _stats start-time_ context is set, all of the output for _show stats_ commands will reflect the accumulation of statistics since that time. This is very useful when troubleshooting issues, or after making configuration changes, to only show data relevant to the exercise at hand.

The _set context stats start-time_ has a flexible parser and can accept many different forms of "time" strings that include date information, time information, or both. There&#39;s also a keyword "now" that sets the _stats start-time_ to the current 128T system clock. (The "now" behavior is the default, and thus the 128T will set the _stats start-time_ to the current clock time when no argument is supplied.)

#### Example

```
admin@cnd1.conductor# set context stats start-time
Stats start time set to: 2018-02-07 10:41:58

admin@cnd1.conductor# set context stats start-time "December 25, 2017"
Stats start time set to: 2017-12-25 00:00:00
```

#### See Also

- [clear context node](#clear-context-node) Clear only the node context
- [clear context router](#clear-context-router) Clear both the router context and node context
- [set context router](#set-context-router) Set the context to a different router

#### Version History

| Release | Modification             |
| ------- | -------------------------|
| 5.0.0   | This feature was removed |

## `set dns resolution`

Sets a hostname resolution temporarily until the next time the node processes config

#### Usage

```
set dns resolution [router <router>] <hostname> <ip-address>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| router | The router on which to set the hostname resolution (default: &lt;current router&gt;) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| hostname | The hostname to set the resolution for |
| ip-address | The ip-address the hostname should resolve to [type: IP address] |

##### See Also

| command | description |
| ------- | ----------- |
| [`refresh dns resolutions`](#refresh-dns-resolutions) | Refreshes all DNS resolutions configured on the platform. |
| [`show dns resolutions`](#show-dns-resolutions) | Shows all DNS resolutions |

#### Example

```
admin@node1.t128# set dns resolution my.router 1.2.3.4
Successfully set hostname resolution on node node1
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 4.5.0   | This feature was introduced |

## `set log level`

Set the log level of a process.

#### Usage

```
set log level [category <category>] [force] [router <router>] [node <node>] <level> [<process-name>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| category | The log category for which to set the level (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node on which to set the corresponding process log level |
| router | The router on which to set the corresponding process log level (default: &lt;current router&gt;) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| level | The log level |
| process-name | The process for which to set the log level (the log level will change for all processes when no process is specified) (default: all) |

##### Subcommands

| name | description |
| ---- | ----------- |
| configured | Reset the process log level to the configured system log level. |

##### See Also

| command | description |
| ------- | ----------- |
| [`rotate log`](#rotate-log) | Rotate log files. |
| [`write log message`](#write-log-message) | Write a message to the log. |
| [`write log snapshot`](#write-log-snapshot) | Write a snapshot to the log. |

#### Description

The _set log level_ command adjusts the degree to which the 128T router writes information into its log files. This is used to selectively turn up and down log verbosity for troubleshooting purposes.

The optional &lt;process-name&gt; and &lt;node-name&gt; arguments, can selectively change only a specific 128T router&#x27;s software process on a given node.

The _level_ must be one of: fatal, error, warning, info, debug, and trace. These are listed in order of increasing verbosity. 128 Technology, Inc. generally recommends that systems be set to _info_ level by default under normal operating circumstances.

As of software version 3.1, a new subcommand _set log level category_, allows administrators to collectively adjust groups of related functionality for specific troubleshooting exercises – instead of blindly adjusting the entire system&#x27;s log level and potentially impacting performance.

The category can be any of the following:

| Category Name | Long Name | Description |
| --- | --- | --- |
| ATCS | Analytics | Components related to the 128T Analytics Engine |
| PLAT | Platform | Components related to the underlying platform management. |
| RDB | Redundancy Database | The subsystem responsible for synchronizing data between nodes. |
| IPC | Interprocess Communications | The subsystem responsible for messaging between components within the 128T product. |
| DATA | Metadata Database | Components related to the configuration and state databases. |
| RTG | Routing | Components related to the routing engine. |
| HWMC | &quot;HighwayManager Control&quot; | Control system for packet processing. |
| FLC | &quot;FastLane Control&quot; | Control system for packet forwarding. |
| FPP | First Packet Processing | System for processing the initial packet of each new session. |
| DISC | Discovery | Discovery-based components (except BFD). Today this is DHCP and ARP. |
| LINK | Internode Link Detection | The subsystem for inter-node communication (today, BFD). |
| USER | User | User-created log messages, generated via the _write_ command. |

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |
| 3.1.0   | Log categories introduced   |

## `set log level configured`

Reset the process log level to the configured system log level.

#### Usage

```
set log level configured [category <category>] [force] [router <router>] [node <node>] [<process-name>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| category | The log category for which to reset the level. (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node on which to set the corresponding process log level |
| router | The router on which to set the corresponding process log level (default: &lt;current router&gt;) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| process-name | The process for which to set the log level (default: all) |

#### Description

Will return the 128T router&#x27;s logging behavior to the verbosity specified within the configuration, located at: `authority &gt; router &gt; system &gt; log-level`. Alternatively, administrators can specify a log level to dynamically change all system processes to use.

## `set password`

Change your password.

#### Usage

```
set password
```

##### See Also

| command | description |
| ------- | ----------- |
| [`create user`](#create-user) | Create a new user account interactively. |
| [`delete user`](#delete-user) | Delete a user account |
| [`edit prompt`](#edit-prompt) | Allows the user to specify a custom format for the PCLI prompt. |
| [`edit user`](#edit-user) | Modify an existing user account |
| [`restore prompt`](#restore-prompt) | Restore the PCLI prompt to the factory default. |
| [`restore users factory-default`](#restore-users-factory-default) | Restore the user configuration to factory defaults. |
| [`show user`](#show-user) | Display information for user accounts. |

#### Description

The _set password_ command allows a PCLI user to change their password. As is typical with most password changing routines, as a security precaution the user must enter their current password before they&#x27;re permitted to change it.
:::note
If a password is lost or forgotten and the account is inaccessible, the account cannot be recovered. Please keep password records accessible and secure. 
:::

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |


## `set provisional-status`

Set the provisional status of a specific interface to down, or returning it to the "up" state after taking it down. 

#### Usage

```
set provisional-status [<node>] [<device>] <up/down>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| node | Identify the node where the device is located. |
| device| Device on which the interface is located. |

##### Subcommands

| name | description |
| ---- | ----------- |
| Up/Down | Set the interface status to up or down. |

##### See Also

| command | description |
| ------- | ----------- |
| [`show device-interface`](#show-device-interface) | Display detailed device interface information. |

#### Description

The `set provisional-status` command allows a specific interface to be brought down without a configuration change. This is useful in situations where you need to temporarily bring down a just device interface (i.e., to trigger an interface failover). 

#### Example

```
admin@test1.Fabric128# set provisional-status node test1 10 down
✔ Setting provisional status...
Successfully set provisional status for device 10
```
```
admin@test1.Fabric128# set provisional-status node test1 10 up
✔ Setting provisional status...
Successfully set provisional status for device 10
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 4.5.3   | This feature was introduced |


## `shell`

Execute a Unix shell command.

#### Usage

```
shell [<command> ...]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| command | Shell command to execute |

#### Description

The shell command allows administrators to execute a bash shell, or to execute a command within the context of a bash shell (specified as a series of optional parameters to the _shell_ command).

#### Example

```
admin@cnd1.conductor# shell ls -la /var/log/128technology/ | head
Piping output...
total 134600
drwxrwxr-x+  2 root  root    12288 Feb  7 10:13 .
drwxr-xr-x. 14 root  root     4096 Feb  5 03:40 ..
-rw-rwxr--+  1 root  root     6885 Feb  7 10:12 128-server.log
-rw-rwxr--+  1 root  root     5613 Jan 15 09:41 accessManager.10.log
-rw-rwxr--+  1 root  root     3640 Feb  7 10:10 accessManager.1.log
-rw-rwxr--+  1 root  root     3640 Feb  4 07:35 accessManager.2.log
-rw-rwxr--+  1 root  root     3640 Feb  1 16:36 accessManager.3.log
-rw-rwxr--+  1 root  root     3640 Jan 29 09:50 accessManager.4.log
-rw-rwxr--+  1 root  root     3640 Jan 26 10:23 accessManager.5.log
admin@cnd1.conductor#
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## `show alarms`

Display currently active or shelved alarms

#### Usage

```
show alarms [shelved] [id <id>] [force] [router <router>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| id | ID for which to display alarm information |
| router | The router for which to display alarms (default: all) |
| shelved | Display shelved alarms |

##### See Also

| command | description |
| ------- | ----------- |
| [`show events alarm`](#show-events-alarm) | Show alarm events from the historical events database. |

#### Description

The _show alarms_ subcommand shows all of the active alarms on your 128T router.

A list of all alarms your 128T router is capable of generating and details about them can be found in the [Alarm Guide](events_alarms.md).

#### Example

```
admin@cnd1.conductor# show alarms
Wed 2018-01-17 15:14:03 EST

================== ===================== ========== ============= ========== ===================================
 ID                 Time                  Severity   Source        Category   Message
================== ===================== ========== ============= ========== ===================================
 cnd1.conductor:4   2018-01-17 13:22:38   major      unavailable   system     No connectivity to b1.branch1
 cnd1.conductor:5   2018-01-17 13:22:38   major      unavailable   system     No connectivity to dc1.datacenter
 cnd1.conductor:6   2018-01-17 13:22:38   major      unavailable   system     No connectivity to dc2.datacenter
There are 0 shelved alarms

Completed in 0.35 seconds
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.1.0   | This feature was introduced |
| 3.1.0   | Previously allowed filtering by node, now the command shows all alarms. |

## `show application names`

Display application name entries.

#### Usage

```
show application names [rows <rows>] [force] [node <node>] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The name of the node |
| router | The name of the router |
| rows | The number of application name entries to display at once [type: int or &#x27;all&#x27;] (default: 50) |

#### Description

The _show application names_ subcommand shows all of the &quot;application&quot; names that the 128T has learned, or been configured to recognize, as part of its Application Classification feature.

#### Example

```
admin@gouda.novigrad# show application names
Wed 2020-04-22 16:06:43 UTC

Node: gouda

========================= =============== ================ ===================== =====================
 Application Name          Session Count   Ip Tuple Count   Date Discovered       Last Updated
========================= =============== ================ ===================== =====================
 *.1.nflxso.net                        0               18   2020-04-11 15:35:01   2020-04-22 01:38:15
 *.128technology.com                   0                1   2020-04-12 15:11:09   2020-04-12 15:11:12
 *.adcolony.com                        0              199   2020-04-11 15:05:44   2020-04-22 13:15:27
 *.adobe.com                           0                6   2020-04-11 18:36:26   2020-04-20 20:09:57
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.2.0   | This feature was introduced |

## `show arp`

Shows the contents of the ARP table on the specified node.

#### Usage

```
show arp [rows <rows>] [force] [node <node>] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node from which to retrieve arp entries |
| router | The router from which to retrieve arp entries |
| rows | The number of arps to display at once [type: int or &#x27;all&#x27;] (default: 50) |

##### Subcommands

| name | description |
| ---- | ----------- |
| proxy | Display proxy ARP info for network-interfaces. |

##### See Also

| command | description |
| ------- | ----------- |
| [`clear arp`](#clear-arp) | Clear the entire ARP cache or a subset if arguments are provided. |

#### Description

The _show arp_ subcommand displays the ARP table (MAC address to IP address binding) for a given node. The number of lines of output may be controlled through the use of the optional _rows_ attribute. When not present, the 128T router will default to displaying the first 50 rows of the specified node&#x27;s ARP table.

#### Example

```
admin@gouda.novigrad# show arp
Wed 2020-04-22 16:01:05 UTC

Node: gouda

========== ====== ================= =================== ========
 Dev Name   VLAN   IP                Dest MAC            State
========== ====== ================= =================== ========
 kni254        0   169.254.127.127   1a:f1:bd:a4:ae:6e   Valid
 lan           0   192.168.0.34      b1:7b:c1:04:0b:ba   Valid
 lan           0   192.168.0.35      01:0e:58:b1:94:bf   Valid
 lan           0   192.168.0.146     a4:83:e7:0b:d7:e1   Valid
 wan           0   1.2.3.4           21:41:71:c1:99:c1   Valid

Completed in 0.07 seconds
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 2.0.0   | Added requirement for use of &#39;node&#39; keyword when specifying a node name. |

## `show arp proxy`

Display proxy ARP info for network-interfaces.

#### Usage

```
show arp proxy [name <name>] [force] [router <router>] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| name | Network interface for which to display proxy ARP info (default: all) |
| node | The node for which to display proxy ARP info |
| router | The router for which to display proxy ARP info (default: all) |

#### Description

Displays a list of all configured proxies, grouped by network interface.

#### Example

```
admin@test1.Fabric128# show arp proxy
Mon 2020-01-27 18:35:24 UTC
Node: test1
======== ======== ====== =================== ===================
Device   Name     VLAN   MAC                 Prefix
======== ======== ====== =================== ===================
    10   intf10   None   fa:16:3e:3b:b7:ee   172.16.100.100/30
    10   intf10   None   fa:16:3e:3b:b7:ee   172.16.1.100/32
Completed in 0.08 seconds
```

## `show assets`

Shows the automated provisioning status of 128T nodes.

#### Usage

```
show assets [force] [router <router>] [node <node>] [<id>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display assets |
| router | The router for which to display assets (default: all) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| id | The asset id of the 128T node from which to retrieve the status |

##### Subcommands

| name | description |
| ---- | ----------- |
| software | Shows assets software information. |
| summary | A summary of assets connected to the Conductor. |
| errors | Shows the 128T nodes that have errors. |

##### See Also

| command | description |
| ------- | ----------- |
| [`migrate`](#migrate) | Migrate a 128T router to a new conductor |
| [`send command download`](#send-command-download) | Download 128T software on a router |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command restart`](#send-command-restart) | Restart a 128T node |
| [`send command rollback`](#send-command-rollback) | Rollback a 128T router to the previously installed version |
| [`send command start`](#send-command-start) | Start a 128T node |
| [`send command stop`](#send-command-stop) | Stop a 128T node |
| [`send command upgrade`](#send-command-upgrade) | Upgrade a 128T node |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the 128T software versions available for download and upgrade. |
| [`show assets software`](#show-assets-software) | Shows assets software information. |
| [`show assets summary`](#show-assets-summary) | A summary of assets connected to the Conductor. |

#### Description

The _show assets_ command displays the automated provisioning status of the 128T nodes within an Authority. With 128T&#x27;s automated provisioning feature set, each &quot;asset&quot; represents a platform into which the 128T software is installed, updated, managed, etc. The _show assets_ command allows administrators to see, at a glance, the state of all assets – including which software versions have been installed on which nodes, what their router and node identifiers are, etc.

#### Example

```
admin@labsystem1.fiedler# show assets
Fri 2017-07-21 11:12:49 EDT

========== ================ ============== ============== =============
 Asset Id   Router           Node           128T Version   Status
========== ================ ============== ============== =============
 T10_DUT2   none             none           unknown        pending
 T10_DUT3   RTR_WEST_COMBO   combo-west-1   3.1            running
 T10_DUT4   none             none           unknown        pending

Completed in 0.03 seconds
```
The optional _id_ argument allows administrators to retrieve more detailed information about a specific asset:
```
admin@labsystem1.fiedler# show assets T10_DUT3
Fri 2017-07-21 15:41:54 UTC

========================
 T10_DUT3
========================
 Router:        RTR_WEST_COMBO
 Node:          combo-west-1
 128T Version:  3.1
 Status:        running

Completed in 0.19 seconds
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.1.0   | This feature was introduced |

## `show assets errors`

Shows the 128T nodes that have errors.

#### Usage

```
show assets errors [force] [router <router>] [<id>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | The router for which to display assets summary (default: all) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| id | The asset id of the 128T node from which to retrieve the status |

#### Description

_show assets errors_ will display all assets with at least one automated provisioner related error.

#### Example

```
admin@labsystem1.fiedler# show assets errors
Fri 2017-07-21 15:41:54 UTC

======== ========== =============== ========
 Router   Node       Asset Id        Errors
======== ========== =============== ========
 Boston   Aquarium   Aquarium-1234        1
 NYC      nyc        asset-10             2
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 4.4.0   | This feature was introduced |


## `show assets software`

Shows assets software information.

#### Usage

```
show assets software [force] [router <router>] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display available software |
| router | The router for which to display available software (default: all) |

##### See Also

| command | description |
| ------- | ----------- |
| [`migrate`](#migrate) | Migrate a 128T router to a new conductor |
| [`send command download`](#send-command-download) | Download 128T software on a router |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command restart`](#send-command-restart) | Restart a 128T node |
| [`send command rollback`](#send-command-rollback) | Rollback a 128T router to the previously installed version |
| [`send command start`](#send-command-start) | Start a 128T node |
| [`send command stop`](#send-command-stop) | Stop a 128T node |
| [`send command upgrade`](#send-command-upgrade) | Upgrade a 128T node |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the 128T software versions available for download and upgrade. |
| [`show assets`](#show-assets) | Shows the automated provisioning status of 128T nodes. |
| [`show assets summary`](#show-assets-summary) | A summary of assets connected to the Conductor. |

#### Description

Displays software related information for each managed asset. The following information is provided:
- Current running version of software. 
- Versions available for download and the repository where they are located. 
- Software versions currently being downloaded.
- Previously downloaded versions that can be used to upgrade the platform.

#### Example

```
admin@tp-cond-primary.tp-cond# show assets software
Fri 2020-04-24 13:25:52 UTC

=========== ===================== ================================== ========================================== ============= ============
 Router      Node                  Installed                          Available                                  Downloading   Downloaded
=========== ===================== ================================== ========================================== ============= ============
 burl-corp   burl-corp-primary     4.2.6-1.el7                        4.3.0-1.el7
                                                                      4.3.1-1.el7
                                                                      4.3.2-1.el7
                                                                      4.3.3-1.el7
             burl-corp-secondary   4.2.6-1.el7                        4.3.0-1.el7
                                                                      4.3.1-1.el7
                                                                      4.3.2-1.el7
                                                                      4.3.3-1.el7
 tp-colo     tp-colo-primary       4.4.0-1.el7
             tp-colo-secondary     4.4.0-1.el7
 tp-cond     tp-cond-primary       4.4.0-1.el7
             tp-cond-secondary     4.4.0-1.el7
 tp-lab      tp-lab-primary        4.3.3-1.el7                        4.4.0-1.el7
             tp-lab-secondary      4.3.3-1.el7                        4.4.0-1.el7

Completed in 0.65 seconds
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.2.0   | This feature was introduced |

## `show assets summary`

A summary of assets connected to the Conductor.

#### Usage

```
show assets summary [force] [router <router>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | The router for which to display assets summary (default: all) |

##### See Also

| command | description |
| ------- | ----------- |
| [`migrate`](#migrate) | Migrate a 128T router to a new conductor |
| [`send command download`](#send-command-download) | Download 128T software on a router |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command restart`](#send-command-restart) | Restart a 128T node |
| [`send command rollback`](#send-command-rollback) | Rollback a 128T router to the previously installed version |
| [`send command start`](#send-command-start) | Start a 128T node |
| [`send command stop`](#send-command-stop) | Stop a 128T node |
| [`send command upgrade`](#send-command-upgrade) | Upgrade a 128T node |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the 128T software versions available for download and upgrade. |
| [`show assets`](#show-assets) | Shows the automated provisioning status of 128T nodes. |
| [`show assets software`](#show-assets-software) | Shows assets software information. |

#### Description

_show assets summary_ will display a total of all assets in each state.

#### Example

```
admin@labsystem1.fiedler# show assets summary
Fri 2017-07-21 15:41:54 UTC

 =====================================
  Summary of Assets
 =====================================
  total:                   5
  pending:                 2
  not-installed:           1
  installed:               2

  assets with errors:      2
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 4.4.0   | This feature was introduced |

## `show bgp`

Displays information about the state of the BGP process on the 128T router.

#### Usage

```
show bgp [rows <rows>] [force] router <router> vrf <vrf-name> [<route>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers. |
| router | The name of the router for which to display BGP routes. |
| rows | The number of bgp entries to display at once [type: int or &#x27;all&#x27;] (default: 50). |
| vrf | Displays the BGP routes in the specified VRF instance. |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| route | route ip-prefix [type: IP prefix] |

##### Subcommands

| name | description |
| ---- | ----------- |
| neighbors | Displays information about the state of the BGP neighbors on the 128T router. |
| summary | Show the current BGP summary from the routing manager. |

##### See Also

| command | description |
| ------- | ----------- |
| [`clear bgp`](#clear-bgp) | Clear routes associated with one or all BGP neighbors. |

#### Description

The _show bgp_ command and associated subcommands display information about the state of the BGP process on the 128T router. Each of these subcommands will be described in more detail in the sections that follow.

#### Example

When the _show bgp_ command is issued with no command line arguments, the system returns the general status of the BGP process:

```
admin@labsystem1.fiedler# show bgp
BGP table version is 0, local router ID is 128.128.128.128
Status codes: s suppressed, d damped, h history, \* valid, > best, =
multipath,
              i internal, r RIB-failure, S Stale, R Removed
Origin codes: i - IGP, e - EGP, ? – incomplete

   Network          Next Hop         Metric LocPrf Weight Path
*> 172.18.11.0/24   172.18.1.2            0             0 4200000001  i
*> 172.18.22.0/24   172.18.2.2            0             0 4200000002  i
*> 172.31.255.10/32 172.18.3.2                          0 4200000003  i
*> 192.168.128.0    0.0.0.0               0               32768       i

Total number of prefixes 4
```

The &lt;route&gt; argument is given as an IP prefix (CIDR). The _show bgp &lt;route&gt;_ command gives detailed information on the specified route, if it exists in the 128T router&#39;s Routing Information Base (RIB).
```
admin@labsystem1.fiedler# show bgp 172.18.11.0/24
BGP routing table entry for 172.18.11.0/24
Paths: (1 available, best #1, table Default-IP-Routing-Table)
  Advertised to non peer-group peers:
  172.18.2.2 172.18.3.2
  4200000001
    172.18.1.2 from 172.18.1.2 (1.1.1.1)
      Origin IGP, metric 0, localpref 100, valid, external, best
      Last update: Wed Feb 10 19:08:49 2016
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 5.1.0 | Added VFR support |

## `show bgp neighbors`

Displays information about the state of the BGP neighbors on the 128T router.

#### Usage

```
show bgp neighbors [rows <rows>] [force] router <router> vrf <vrf-name> [<neighbor-ip>] [<option>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | The name of the router for which to display BGP neighbors |
| rows | The number of bgp entries to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| vrf | Displays information about the BGP neighbors in the specified VRF. |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| neighbor-ip | The IP address of the neighbor [type: IP address] |
| option | advertised-routes \| received-routes |

#### Description

The _show bgp neighbors_ command displays detailed information about each of the 128T router&#x27;s BGP peers. By specifying a specific peer (through the optional argument _&lt;neighbor-ip&gt;_), administrators can view state information about one peer at a time. When specifying a specific neighbor, the output may include the routes shared with that peer by appending _advertised-route_ or received from that peer by appending _received-routes_.

#### Example

```
admin@labsystem1.fiedler# show bgp neighbors
BGP neighbor is 172.18.1.2, remote AS 4200000001, local AS 4200000128, external
link
  BGP version 4, remote router ID 1.1.1.1
  BGP state = Established, up for 00:27:25
  Last read 00:00:25, hold time is 90, keepalive interval is 30 seconds
  Configured hold time is 90, keepalive interval is 30 seconds
  Neighbor capabilities:
    4 Byte AS: advertised and received
    Route refresh: advertised and received(old &amp; new)
    Address family IPv4 Unicast: advertised and received
    Graceful Restart Capabilty: advertised and received
      Remote Restart timer is 120 seconds
      Address families by peer:
        none
...
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 5.1.0 | Added VFR support |

## `show bgp summary`

Show the current BGP summary from the routing manager.

#### Usage

```
show bgp summary [rows <rows>] [force] router <router> vrf <vrf-name>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | The name of the router for which to display the BGP summary |
| rows | The number of bgp entries to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| vrf | Displays a summary of the BGP state in the specified VRF instance. |

#### Description

The _show bgp summary_ gives administrators a high-level summary table of the state of all of the 128T router&#x27;s BGP peers.

It includes information on each BGP neighbor, including the version (V) of BGP that they are using (generally v4), the Autonomous System number (AS), the number of BGP messages sent and received (MsgSent, MsgRcvd), the table version (TblVer), etc.

#### Example

```
admin@labsystem1.fiedler# show bgp summary
BGP router identifier 128.128.128.128, local AS number 4200000128
RIB entries 7, using 784 bytes of memory
Peers 3, using 13 KiB of memory

Neighbor        V         AS MsgRcvd MsgSent   TblVer  InQ OutQ  Up/Down  State/PfxRcd
172.18.1.2      4 4200000001      62      73        0    0    0 00:29:07             1
172.18.2.2      4 4200000002      62      73        0    0    0 00:29:10             1
172.18.3.2      4 4200000003      88      84        0    0    0 00:09:53             1

Total number of neighbors 3
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 5.1.0 | Added VFR support |

## `show capacity`

Shows current fib/flow/arp/action usage and capacities at the specified node.

#### Usage

```
show capacity [force] [node <node>] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node from which to retrieve capacities |
| router | The router from which to retrieve capacities |

#### Example

```
admin@gouda.novigrad# show capacity
Wed 2020-04-22 15:17:55 UTC

Node: gouda

===================== ========= ========== =======
 Resource              Entries   Capacity   Usage
===================== ========= ========== =======
 access-policy-table        17       5402   0.3%
 action-pool              2274     301210   0.8%
 arp-table                  23      65535   0.0%
 fib-table                 176      19051   0.9%
 flow-table               1882     131554   1.4%
 source-tenant-table        54       2736   2.0%

Completed in 0.09 seconds
```

## `show capture-filters`

Show active capture-filters.

#### Usage

```
show capture-filters [device-interface <device-interface>] [force] [router <router>] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| device-interface | Device interface on which to show capture-filters (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node on which to show capture-filters |
| router | The router on which to show capture-filters (default: all) |

##### See Also

| command | description |
| ------- | ----------- |
| [`create capture-filter`](#create-capture-filter) | Creates a capture-filter using BPF syntax (as used in wireshark) on the target interface. |
| [`delete capture-filter`](#delete-capture-filter) | Deletes a capture-filter created using create capture-filter. (It will not delete filters committed as part of the configuration.) |
| [`show stats packet-capture`](#show-stats-packet-capture) | Stats pertaining to captured packets |

#### Description

Shows all configured capture-filters, including static capture-filters that exist as part of the configuration as well as dynamic capture-filters (i.e., those created using the create capture-filter command).

#### Example

```
admin@tp-colo-primary.tp-colo# show capture-filters device-interface blended-5
Thu 2020-04-23 20:28:05 UTC

========= ================= ================ =================
 Router    Node              Interface Name   Capture Filters
========= ================= ================ =================
 tp-colo   tp-colo-primary   blended-5        host 172.18.5.4

Completed in 0.01 seconds
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 4.4.0   | This feature was introduced |

## `show certificate webserver`

Display the webserver certificate

#### Usage

```
show certificate webserver
```

##### See Also

| command | description |
| ------- | ----------- |
| [`create certificate request webserver`](#create-certificate-request-webserver) | Create a certificate signing request. |
| [`create certificate self-signed webserver`](#create-certificate-self-signed-webserver) | Create a self-signed certificate. |
| [`delete certificate webserver`](#delete-certificate-webserver) | Delete the webserver certificate. |
| [`import certificate webserver`](#import-certificate-webserver) | Import a certificate to be used by the webserver. |

#### Example

```
admin@labsystem1.fiedler# show certificate webserver

Certificate:
​    Data:
​        Version: 3 (0x2)
​        Serial Number: 17087 (0x42bf)
​    Signature Algorithm: sha256WithRSAEncryption
​        Issuer: C=US, ST=MA, O=a, CN=a
​        Validity
​            Not Before: May  5 04:49:02 2016 GMT
​            Not After : May  6 04:49:02 2017 GMT
​        Subject: C=US, ST=MA, O=a, CN=a
​        Subject Public Key Info:
​            Public Key Algorithm: rsaEncryption
...
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |


## show config candidate

#### Usage

```
show config candidate [authority [router [ ...] ][verbose] [flat]
```

#### Description

This command returns the current candidate configuration on the 128T router (i.e., the configuration that is currently being edited, not the configuration that is actively running). The output from _show config candidate_ will only show fields and values within the configuration that are set to non-default values, for brevity.

The _show config candidate_ command has two optional flags: _verbose_ and _flat_. Adding the _verbose_ flag will show the entire configuration, including items that are part of the system&#39;s default configuration (normally hidden when using _show config candidate_ by itself). Adding the _flat_ flag will output the configuration as a series of individual, fully qualified configuration statements, which can singularly affect each component of the configuration discretely. That is, any of the lines can be used without any context to configure a single attribute, object, etc.

Note that the output from _show config candidate_ is formatted in such a way so as to allow the text to be cut and pasted into a CLI session to configure a separate 128T router.

```
admin@labsystem1.fiedler# show config candidate
config
​    authority
​        router  Fabric128
​            name  Fabric128
​            node  labsystem1
​                name              labsystem1
​                id                1
​                description       "Primary lab system"
​                location          "Newton, MA"
​                role              combo
​                device-interface  1
​                    id                 1
​                    description        "external network"
​                    type               ethernet
​                    pci-address        0000:02:00.0
...
```
The same configuration using the _flat_ flag is displayed quite differently:
```
admin@labsystem1.fiedler# show config candidate flat
config authority router Fabric128 name  Fabric128
config authority router Fabric128 node labsystem1 name              labsystem1
config authority router Fabric128 node labsystem1 id                1
config authority router Fabric128 node labsystem1 description       "Primary lab system"
config authority router Fabric128 node labsystem1 location          "Newton, MA"
config authority router Fabric128 node labsystem1 role              combo
config authority router Fabric128 node labsystem1 device-interface 1 id                 1
config authority router Fabric128 node labsystem1 device-interface 1 description        "external network"
config authority router Fabric128 node labsystem1 device-interface 1 type               ethernet
config authority router Fabric128 node labsystem1 device-interface 1 pci-address        0000:02:00.0
```

The _show config candidate_ command also lets users show specific portions of the configuration by specifying the path to the areas of interest. For multiple instance items, such as _node_, _service_, etc., a keyword _all_ will display all items of the specified type:

```
admin@labsystem1.fiedler# show config candidate authority session-type verbose all
config
​    authority
​        session-type  HTTP
​            name           HTTP
​            service-class  Standard
​            timeout        7200000
​            transport      tcp
​                protocol    tcp
​                port-range  80
​                    start-port  80
​                exit
​                port-range  8080
​                    start-port  8080
​                exit
​            exit
​        exit
...
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced as "show candidate-config" |
| 2.0.0   | Renamed and reorganized as "show config candidate". _flat_, _verbose_, and configuration branch arguments added |

## `show config exports`

Display configuration exports.

#### Usage

```
show config exports [<name>] [flat]
```

#### Description

This command lists the set of exported configurations that are stored on your 128T router. 

The _show config exports_ command has two optional flags: _name_ and _flat_. Use the _name_ flag to identify a specific configuration to display. Adding the _flat_ flag will output the configuration as a series of individual, fully qualified configuration statements.

##### See Also

| command | description |
| ------- | ----------- |
| [`compare config`](#compare-config) | Display the differences between two configurations. |
| [`create config autogenerated`](#create-config-autogenerated) | Run configuration generation. |
| [`delete config exported`](#delete-config-exported) | Delete an exported configuration from disk. |
| [`export config`](#export-config) | Export a copy of the current running or candidate config. |
| [`import config`](#import-config) | Import a configuration as the candidate config. |
| [`restore config factory-default`](#restore-config-factory-default) | Restore the candidate config to the factory defaults. |
| [`restore config running`](#restore-config-running) | Discard uncommitted changes from the candidate config. |
| [`set config encryption`](#set-config-encryption) | Sets the encryption key for the 128T configuration |
| [`show config version`](#show-config-version) | Display running configuration version. |
| [`show events config commit`](#show-events-config-commit) | Shows events related to running config change |
| [`show stats config`](#show-stats-config) | Metrics pertaining to the get-config RPC |


#### Example 1

```
admin@conductor-east-1.RTR_EAST_CONDUCTOR# show config exports
Mon 2021-02-22 15:19:28 EST
✔ Retrieving exported configurations...
======================= ====================== ================= ===================
 Name                    Date Modified          Compressed Size   Uncompressed Size
======================= ====================== ================= ===================
 Arthur-C-Doyle.gz       2021-01-25T16:28:27Z            1.8 kB             18.1 kB
 SherlockHolmes.gz       2021-01-25T16:04:29Z            1.8 kB             18.1 kB
 DoctorWatson.gz         2021-01-25T16:06:27Z            1.8 kB             18.1 kB

Completed in 0.22 seconds
```

#### Example 2 

```
admin@conductor-east-1.RTR_EAST_CONDUCTOR# show config exports DoctorWatson.gz flat
Mon 2021-02-22 15:21:35 EST
✔ Retrieving exported configurations...
config authority router RTR_EAST_CONDUCTOR name            RTR_EAST_CONDUCTOR
config authority router RTR_EAST_CONDUCTOR location        usa
config authority router RTR_EAST_CONDUCTOR resource-group  east-admin
config authority router RTR_EAST_CONDUCTOR system log-level  trace
config authority router RTR_EAST_CONDUCTOR node conductor-east-1 name              conductor-east-1
config authority router RTR_EAST_CONDUCTOR node conductor-east-1 device-interface fabric name               fabric
config authority router RTR_EAST_CONDUCTOR node conductor-east-1 device-interface fabric type               ethernet
config authority router RTR_EAST_CONDUCTOR node conductor-east-1 device-interface fabric pci-address        0000:00:04.0
config authority router RTR_EAST_CONDUCTOR node conductor-east-1 device-interface fabric forwarding         false
config authority router RTR_EAST_CONDUCTOR node conductor-east-1 device-interface fabric network-interface fabric name       fabric
config authority router RTR_EAST_CONDUCTOR node conductor-east-1 device-interface fabric network-interface fabric global-id  22
config authority router RTR_EAST_CONDUCTOR node conductor-east-1 device-interface fabric network-interface fabric type       fabric
config authority router RTR_EAST_CONDUCTOR node conductor-east-1 device-interface fabric network-interface fabric address 172.16.3.1 ip-address     172.16.3.1
config authority router RTR_EAST_CONDUCTOR node conductor-east-1 device-interface fabric network-interface fabric address 172.16.3.1 prefix-length  24
config authority router RTR_EAST_CONDUCTOR node conductor-east-2 name              conductor-east-2
config authority router RTR_EAST_CONDUCTOR node conductor-east-2 device-interface fabric name               fabric
config authority router RTR_EAST_CONDUCTOR node conductor-east-2 device-interface fabric type               ethernet
config authority router RTR_EAST_CONDUCTOR node conductor-east-2 device-interface fabric pci-address        0000:00:04.0
config authority router RTR_EAST_CONDUCTOR node conductor-east-2 device-interface fabric forwarding         false
config authority router RTR_EAST_CONDUCTOR node conductor-east-2 device-interface fabric network-interface fabric name       fabric
config authority router RTR_EAST_CONDUCTOR node conductor-east-2 device-interface fabric network-interface fabric global-id  23
config authority router RTR_EAST_CONDUCTOR node conductor-east-2 device-interface fabric network-interface fabric type       fabric
config authority router RTR_EAST_CONDUCTOR node conductor-east-2 device-interface fabric network-interface fabric address 172.16.3.2 ip-address     172.16.3.2
config authority router RTR_EAST_CONDUCTOR node conductor-east-2 device-interface fabric network-interface fabric address 172.16.3.2 prefix-length  24
config authority resource-group east-admin name  east-admin
config authority access-management role east-admin name            east-admin
config authority access-management role east-admin capability      config-write
config authority access-management role east-admin capability      config-read
config authority access-management role east-admin resource-group  east-admin
config authority access-management token expiration  1800
Completed in 0.18 seconds
admin@conductor-east-1.RTR_EAST_CONDUCTOR#
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.0.0   | This feature was introduced |
| 5.1.0   | Added the _name_ flag, allowing you to identify a specific configuration to display. |

## `show config locally-modified`

Display all routers with a locally modified config version

#### Usage

```
show config locally-modified
```

## `show config out-of-sync`

Display all routers with a config version that is out of sync with the conductor

#### Usage

```
show config out-of-sync
```

## show config running

#### Usage

```
show config running [authority [router [...] ][verbose] [flat]
```

#### Description

This command returns the current running configuration on the 128T router (i.e., the configuration that is active and processing traffic). The output from _show config running_ will only show fields and values within the configuration that are set to non-default values, for brevity.

The _show config running_ command has two optional flags: _verbose_ and _flat_. Adding the _verbose_ flag will show the entire configuration, including items that are part of the system&#39;s default configuration (normally hidden when using _show config running_ by itself). Adding the _flat_ flag will output the configuration as a series of individual, fully qualified configuration statements, which can singularly affect each component of the configuration discretely. That is, any of the lines can be used without any context to configure a single attribute, object, etc.

Note that the output from _show config running_ is formatted in such a way so as to allow the text to be cut and pasted into a CLI session to configure a separate 128T router.

```
admin@labsystem1.fiedler# show config running
config
​    authority
​        name           Authority128
​        router         Fabric128
​            name                 Fabric128
​            description          "Default router"
​            inter-node-security  internal
...
```

The _show config running_ command also lets users show specific portions of the configuration by specifying the path to the areas of interest. For multiple instance items, such as _node_, _service_, etc., a keyword _all_ will display all items of the specified type:

```
admin@labsystem1.fiedler# show config running authority service-class verbose all
config
​    authority
​        service-class  Standard
​            name            Standard
​            dscp            0
​            priority        0
​            rate-limit      false
​            max-flow-rate   0
​            max-flow-burst  0
​        exit

​        service-class  NetworkControl
​            name            NetworkControl
​            dscp            48
​            priority        0
​            rate-limit      false
​            max-flow-rate   0
​            max-flow-burst  0
​        exit
...
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced as "show running-config" |
| 2.0.0   | Renamed and reorganized as "show config running" |


## `show config version`

Display running configuration version.

#### Usage

```
show config version [force] [router <router>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | The name of the router (default: &lt;current router&gt;) |

##### See Also

| command | description |
| ------- | ----------- |
| [`compare config`](#compare-config) | Display the differences between two configurations. |
| [`create config autogenerated`](#create-config-autogenerated) | Run configuration generation. |
| [`delete config exported`](#delete-config-exported) | Delete an exported configuration from disk. |
| [`export config`](#export-config) | Export a copy of the current running or candidate config. |
| [`import config`](#import-config) | Import a configuration as the candidate config. |
| [`restore config factory-default`](#restore-config-factory-default) | Restore the candidate config to the factory defaults. |
| [`restore config running`](#restore-config-running) | Discard uncommitted changes from the candidate config. |
| [`set config encryption`](#set-config-encryption) | Sets the encryption key for the 128T configuration |
| [`show config exports`](#show-config-exports) | Display configuration exports. |
| [`show events config commit`](#show-events-config-commit) | Shows events related to running config change |
| [`show stats config`](#show-stats-config) | Metrics pertaining to the get-config RPC |

#### Description

This command displays the version number of the running configuration on the 128T router. This version number is auto-generated, and is the UNIX timestamp when the configuration is committed. (As a consequence, you should expect that successive commits to the same configuration will increment the version by more than one. This is a change in behavior from pre-2.0 software, which used a monotonically incrementing integer to represent the configuration version.)

#### Example

```
admin@labsystem1.fiedler# show config version
Fri 2017-02-24 09:34:43 EST
Version 1487780689 committed at: Wed 2017-02-22 11:24:49

Completed in 0.17 seconds
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 2.0.0   | The behavior changed as described in the Description text above |
| 3.0.0   | Updated to display the timestamp of the configuration change in human readable form |

## show context stats start-time

#### Usage

```
show context stats start-time
```

#### Description

The _show context stats start-time_ subcommand shows the _stats start-time_ (if set), or indicates that there is no start-time currently set. For more information on setting _stats start-time_, please refer to _set context_ in this manual.

#### Example

```
admin@cnd1.conductor# show context stats start-time
No stats start time set, show stats will be relative to launch time

admin@cnd1.conductor# set context stats start-time "December 25, 2017"
Stats start time set to: 2017-12-25 00:00:00

admin@cnd1.conductor# show context stats start-time
Stats start time set to: 2017-12-25 00:00:00

admin@cnd1.conductor# clear context stats start-time
Success

admin@cnd1.conductor# show context stats start-time
No stats start time set, show stats will be relative to launch time
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.2.0   | This feature was introduced |
| 5.0.0   | This feature was removed |

## `show device-interface`

Display detailed device interface information.

#### Usage

```
show device-interface [name <name>] [force] [node <node>] router <router> [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers. |
| name | Device interface to display (if omitted, all will be displayed) (default: all) |
| node | The node for which to display device interfaces |
| router | The router for which to display device interfaces |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| detail (default) |  |
| extended-statistics |  |
| registers |  |
| summary |  |
| verbosity |  | 

#### Description

This command displays detailed information about device interface(s) (i.e., physical ports) on a 128T router node. The optional command line arguments allow a user to reduce the set of information to a specific set of interfaces on a given node, or a specific interface on a specific node.

Omitting all optional arguments will display detailed information on all device interfaces defined within the 128T router.

#### Example

```
admin@test1.Fabric128# show device-interface name 10
Mon 2020-11-23 20:45:37 UTC

✔ Retrieving device interface information...

========================================
 test1:10
========================================
 Type:                ethernet
 Forwarding:          true
 PCI Address:         0000:00:04.0
 MAC Address:         fa:16:3e:16:42:6c

 Admin Status:        up
 Operational Status:  up
 Provisional Status:  up
 Redundancy Status:   non-redundant
 Speed:               1 Gb/s
 Duplex:              full

 in-octets:                           0
 in-unicast-pkts:                     0
 in-errors:                           0
 out-octets:                          0
 out-unicast-pkts:                    0
 out-errors:                          0

 Plugin Info:         unavailable

Completed in 0.17 seconds
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |
| 3.0.0   | Added requirement for prepending keywords to the _device-interface-id_ and _node_ arguments to avoid command line ambiguity |
| 3.2.0   | Device-interface is keyed by _name_ rather than _id_ |
| 4.5.3   | Added support for Provisional Status |

## `show dhcp mappings`

Show each DHCP mapping from an interface to mapping/IP family/config types.

#### Usage

```
show dhcp mappings [rows <rows>] [force] [node <node>] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node from which to identify DHCP mappings |
| router | The name of the router to show |
| rows | The number of mappings to display at once [type: int or &#x27;all&#x27;] (default: 50) |

##### See Also

| command | description |
| ------- | ----------- |
| [`release dhcp lease`](#release-dhcp-lease) | Releases an active DHCP lease. |
| [`show dhcp prefix-delegation`](#show-dhcp-prefix-delegation) | Show the prefix learned for prefix-delegation. |
| [`show dhcp v4`](#show-dhcp-v4) | Display dhcp lease info for network-interfaces. |
| [`show dhcp v6`](#show-dhcp-v6) | Display dhcp lease info for network-interfaces. |

#### Example

```
admin@gouda.novigrad# show dhcp mappings
Wed 2020-04-22 15:05:25 UTC

Node: gouda

================= ================== ====== ============== ================ =============
 Src Device Port   Dest Device Port   VLAN   Mapping Type   IP Family Type   Config Type
================= ================== ====== ============== ================ =============
               1                252      0   originating    ipv4             server
               2                  0      0   originating    ipv4             client
             252                  1      0   derived        ipv4             server

Completed in 0.05 seconds
```

## `show dhcp prefix-delegation`

Show the prefix learned for prefix-delegation.

#### Usage

```
show dhcp prefix-delegation [group <group>] [force] [router <router>] [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| group | Prefix-delegation group to display (if omitted, all will be displayed) |
| router | The name of the router to show (default: &lt;current router&gt;) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

##### See Also

| command | description |
| ------- | ----------- |
| [`release dhcp lease`](#release-dhcp-lease) | Releases an active DHCP lease. |
| [`show dhcp mappings`](#show-dhcp-mappings) | Show each DHCP mapping from an interface to mapping/IP family/config types. |
| [`show dhcp v4`](#show-dhcp-v4) | Display dhcp lease info for network-interfaces. |
| [`show dhcp v6`](#show-dhcp-v6) | Display dhcp lease info for network-interfaces. |

#### Example

```
admin@gouda.novigrad# show dhcp prefix-delegation
Wed 2020-04-22 14:47:05 UTC

========== ============ ================ ========== ============== ===============
 Router     Group Name   Interface Name   Status     Prefix         Prefix Length
========== ============ ================ ========== ============== ===============
 novigrad   pd-group-1   t128tuntap1      resolved   2001:db2:1::   56

Completed in 0.08 seconds
```

## `show dhcp v4`

Display dhcp lease info for network-interfaces.

#### Usage

```
show dhcp v4 [name <name>] [force] [node <node>] router <router> [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| name | Network interface to display (default: all) |
| node | The node for which to display dhcp lease info |
| router | The router for which to display dhcp lease info |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

##### See Also

| command | description |
| ------- | ----------- |
| [`release dhcp lease`](#release-dhcp-lease) | Releases an active DHCP lease. |
| [`show dhcp mappings`](#show-dhcp-mappings) | Show each DHCP mapping from an interface to mapping/IP family/config types. |
| [`show dhcp prefix-delegation`](#show-dhcp-prefix-delegation) | Show the prefix learned for prefix-delegation. |
| [`show dhcp v6`](#show-dhcp-v6) | Display dhcp lease info for network-interfaces. |

#### Example

```
admin@gouda.novigrad# show dhcp v4
Wed 2020-04-22 14:47:05 UTC

========== ======= ================== =================== ============ ================ =============== ==============
 Router     Node    Device Interface   Network Interface   Dhcp State   Address          Prefix Length   Gateway
========== ======= ================== =================== ============ ================ =============== ==============
 novigrad   gouda   wan                wan-interface       Resolved     1.2.3.4          24              1.2.3.1

Completed in 0.20 seconds
```
Specifying the argument _detail_ provides additional information
```
admin@gouda.novigrad# show dhcp v4 detail
Wed 2020-04-22 14:55:43 UTC

============================================================
 Router
============================================================
  Node:                            gouda
    Device Interface:              wan
      Network Interface:           wan-interface
        Dhcp State:                Resolved
          State Machine State:     Bound
          Lease Start Time:        Wed Apr 22 14:13:09 2020
          Lease Renewal Time:      Wed Apr 22 15:13:09 2020
          Lease Rebinding Time:    Wed Apr 22 15:43:09 2020
          Lease Expiration Time:   Wed Apr 22 16:13:09 2020
          Learned MTU:             0 bytes
          Server Address:          1.2.3.1
          Dns Server Address:
            - 8.8.8.8
            - 1.1.1.1
          Addresses:
            Address:               1.2.3.4
            Prefix Length:         24
            Gateway:               1.2.3.1

Completed in 0.30 seconds
```

## `show dhcp v6`

Display dhcp lease info for network-interfaces.

#### Usage

```
show dhcp v6 [name <name>] [force] [node <node>] router <router> [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| name | Network interface to display (default: all) |
| node | The node for which to display dhcp lease info |
| router | The router for which to display dhcp lease info |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

##### See Also

| command | description |
| ------- | ----------- |
| [`release dhcp lease`](#release-dhcp-lease) | Releases an active DHCP lease. |
| [`show dhcp mappings`](#show-dhcp-mappings) | Show each DHCP mapping from an interface to mapping/IP family/config types. |
| [`show dhcp prefix-delegation`](#show-dhcp-prefix-delegation) | Show the prefix learned for prefix-delegation. |
| [`show dhcp v4`](#show-dhcp-v4) | Display dhcp lease info for network-interfaces. |

#### Example

```
admin@gouda.novigrad# show dhcp v6
Wed 2020-04-22 14:47:05 UTC

========== ======= ================== =================== ============ ================================= =============== =================================
 Router     Node    Device Interface   Network Interface   Dhcp State   Address                           Prefix Length   Gateway
========== ======= ================== =================== ============ ================================= =============== =================================
 novigrad   gouda   wan                wan-interface       Resolved     2001:db8:85a3:0:0:8a2e:370:7334   96              2001:db8:85a3:0:0:8a2e:370:7330

Completed in 0.20 seconds
```

## `show dns resolutions`

Shows all DNS resolutions

#### Usage

```
show dns resolutions [hostname <hostname>] [rows <rows>] [force] [router <router>] [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| hostname | The DNS hostname belonging to a node |
| router | The name of the router holding the node with the DNS resolutions (default: &lt;current router&gt;) |
| rows | The number of dns resolutions to display at once [type: int or &#x27;all&#x27;] (default: 50) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

##### See Also

| command | description |
| ------- | ----------- |
| [`refresh dns resolutions`](#refresh-dns-resolutions) | Refreshes all DNS resolutions configured on the platform. |
| [`set dns resolution`](#set-dns-resolution) | Sets a hostname resolution temporarily until the next time the node processes config |

#### Description

Shows all hostnames that require DNS resolution. Hostnames can be specified throughout the configuration; commonly defined on the _network-interface_ and within a _service_.

#### Example

```
admin@gouda.novigrad# show dns resolutions
Wed 2020-04-22 14:31:54 UTC

========== ======= ========================= ========== ====================== ======================
 Router     Node    Hostname                  Resolved   Last Resolved          Expiration
========== ======= ========================= ========== ====================== ======================
 novigrad   gouda   my.host.name              Y          2020-04-22T14:30:43Z   2020-04-22T14:34:43Z

Completed in 0.02 seconds
```
Specifying the argument _detail_ provides additional information
```
admin@gouda.novigrad# show dns resolutions detail
Wed 2020-04-22 14:43:43 UTC

=============================================
 Node: gouda.novigrad
=============================================
  Router:            novigrad
  Node:              gouda
  DNS Resolution:
    Hostname:        my.host.name
    Resolved:        Y
    IPv4 Address:    1.2.3.4
    Last Resolved:   2020-04-22T14:42:44Z
    Expiration:      2020-04-22T14:46:44Z

Completed in 0.10 seconds
```

## `show domain-categories`

Display app-id-v2 domain-name categories used by sessions

#### Usage

```
show domain-categories [force] [node <node>] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display domain-name categories of active sessions |
| router | The router for which to display domain-name categories of active sessions |

##### See Also

| command | description |
| ------- | ----------- |
| [`show domain-names`](#show-domain-names) | Display app-id-v2 domain-names used by sessions |

## `show domain-names`

Display app-id-v2 domain-names used by sessions

#### Usage

```
show domain-names [category <category>] [rows <rows>] [force] [node <node>] router <router> [<request-order>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| category | Category to show domain-names for |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node from which to retrieve app-id domain-names |
| router | The router from which to retrieve app-id domain-names |
| rows | The number of domain-names to display at once [type: int or &#x27;all&#x27;] (default: 50) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| request-order | Get domains sorted by most-sessions or most-recent |

##### See Also

| command | description |
| ------- | ----------- |
| [`show domain-categories`](#show-domain-categories) | Display app-id-v2 domain-name categories used by sessions |

## `show dynamic-peer-update`

Display view of dynamic peer update on the conductor.

#### Usage

```
show dynamic-peer-update [force] [router <router>] [<table>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | Router for which to show dynamic peer update information (default: &lt;current router&gt;) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| table | Show the learned-hostnames of a router, or show the peer-hostnames of a router, or all (default: all) |

##### See Also

| command | description |
| ------- | ----------- |
| [`show stats dynamic-peer-update`](#show-stats-dynamic-peer-update) | Stats pertaining to dynamic peer update processes |
| [`sync peer addresses`](#sync-peer-addresses) | Synchronize dynamic addresses (DHCP and PPPoE) between routers and a conductor. |

## `show entitlement`

Displays entitlement utilized.

#### Usage

```
show entitlement [force] [router <router>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | The name of the router for which to display entitlement utilized. Conductor routers will show the entitlement utilized per project of all conducted routers. (default: &lt;current router&gt;) |

#### Description

The 128T Networking Platform calculates the Peak Router Bandwidth Capacity; this is the highest router bandwidth value of any 5 second interval over the specific license period. The Router Bandwidth is calculated based on the aggregate of sessions traversing the router.

#### Example

```
admin@gouda.novigrad# show entitlement
Tue 2020-04-21 18:56:30 UTC
============= =========== ======================
 Project           Month   Entitlement Utilized
============= =========== ======================
 Lab Router    *Apr 2020             11.94 Mbps
                Mar 2020             14.23 Mbps

Completed in 0.63 seconds
```

The asterisk next to the date indicates the current month and therefore a partial entitlement calcuation.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.1.0   | This feature was introduced |

## `show events alarm`

Show alarm events from the historical events database.

#### Usage

```
show events alarm [from <from>] [to <to>] [rows <rows>] [force] [router <router>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| from | Only show events after the provided time. You can use the provided standard timestamps, such as 45m, 1d, or 1mo; or enter a value [type: timestamp] (default: 1970-01-01 00:00:00) |
| router | The name of the router for which to display alarm events (default: &lt;current router&gt;) |
| rows | The number of alarm events to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| to | Only show events before the provided time. You can use the provided standard timestamps, such as 45m, 1d, or 1mo; or enter a value [type: timestamp] |

##### See Also

| command | description |
| ------- | ----------- |
| [`show alarms`](#show-alarms) | Display currently active or shelved alarms |

#### Description

The _show events alarm_ command displays various event records that the 128T collects during operation. As of software version 3.1, the only event type that is capable of being shown is the alarm history.

The output can be optionally restricted to specific time windows using the `from` and `to` qualifiers. Because this command can generate a lot of output, the `rows` limiter is particularly useful on busy systems.

#### Example

```
user@labsystem1.fiedler> show events alarm
Fri 2017-07-21 11:59:51 EDT
=================== ============ ====================== ==========
 Node                Event Type   Time                   Severity   ...
=================== ============ ====================== ==========
 labsystem1          clear        2017-07-21T15:24:04Z   major
 labsystem1          clear        2017-07-21T15:24:04Z   major
 labsystem1          add          2017-07-21T15:23:59Z   major
 labsystem2          add          2017-07-21T15:23:59Z   major
 labsystem2          clear        2017-07-21T15:23:19Z   major
 labsystem1          clear        2017-07-21T15:23:19Z   major
 labsystem1          clear        2017-07-21T15:23:19Z   major
 labsystem1          clear        2017-07-21T15:23:19Z   major
 labsystem1          add          2017-07-21T15:23:14Z   major

Completed in 0.11 seconds
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.1.0   | This feature was introduced |

## `show events config commit`

Shows events related to running config change

#### Usage

```
show events config commit [flat] [from <from>] [to <to>] [force] [router <router>] [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| flat | Display with full paths on each line instead of as a hierarchy |
| force | Skip confirmation prompt. Only required when targeting all routers |
| from | Only show events after the provided time. Can either be a timestamp or a delta, such as 45m, 1d, or 1mo. [type: timestamp] |
| router | The router for which to display config commit events (default: &lt;current router&gt;) |
| to | Only show events before the provided time. Can either be a timestamp or a delta, such as 45m, 1d, or 1mo [type: timestamp] |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: detail) |

##### See Also

| command | description |
| ------- | ----------- |
| [`compare config`](#compare-config) | Display the differences between two configurations. |
| [`create config autogenerated`](#create-config-autogenerated) | Run configuration generation. |
| [`delete config exported`](#delete-config-exported) | Delete an exported configuration from disk. |
| [`export config`](#export-config) | Export a copy of the current running or candidate config. |
| [`import config`](#import-config) | Import a configuration as the candidate config. |
| [`restore config factory-default`](#restore-config-factory-default) | Restore the candidate config to the factory defaults. |
| [`restore config running`](#restore-config-running) | Discard uncommitted changes from the candidate config. |
| [`set config encryption`](#set-config-encryption) | Sets the encryption key for the 128T configuration |
| [`show config exports`](#show-config-exports) | Display configuration exports. |
| [`show config version`](#show-config-version) | Display running configuration version. |
| [`show stats config`](#show-stats-config) | Metrics pertaining to the get-config RPC |

#### Example

```
admin@node1.t128# configure authority router t128 description "test router"
*admin@node1.t128# commit
Are you sure you want to commit the candidate config? [y/N]: y
✔ Validating, then committing...
Configuration committed
admin@node1.t128# show events config commit
Thu 2020-06-04 12:47:59 UTC
✔ Retrieving configuration events...

======================================================================
 2020-06-04T12:47:53.487Z admin changed running configuration on t128
======================================================================

config

    authority

        router  t128
            name         t128
            description  "test router"
        exit
    exit
exit

Completed in 0.09 seconds
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 4.5.0   | This feature was introduced |

## `show events config encryption`

Shows events related to config encryption change

#### Usage

```
show events config encryption [from <from>] [to <to>] [force] [router <router>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| from | Only show events after the provided time. Can either be a timestamp or a delta, such as 45m, 1d, or 1mo [type: timestamp] |
| router | The router for which to display config encryption events (default: &lt;current router&gt;) |
| to | Only show events before the provided time. Can either be a timestamp or a delta, such as 45m, 1d, or 1mo [type: timestamp] |

#### Example

```
admin@node1.t128# show events config encryption
Thu 2020-06-04 13:24:47 UTC
✔ Retrieving configuration events...

========================================================================
 2020-06-04T12:38:17.409Z root changed configuration encryption on t128
========================================================================
enable encryption

========================================================================
 2020-06-04T12:39:37.930Z root changed configuration encryption on t128
========================================================================
disable encryption

Completed in 0.08 seconds
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 4.5.0   | This feature was introduced |

## `show fib`

Shows current fib entries at the specified node.

#### Usage

```
show fib service-name <name> | hierarchy-service-name <name> | contains-service-name <name>} prefix <prefix> source-address <source-IP> source-interface <interface-name> tenant <tenant-name> [{detail}] rows <rows>] [force] router <router> node <node>  
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| contains-service-name | Partial substring match to display FIB entries |
| force | Skip confirmation prompt. Only required when targeting all routers |
| hierarchy-service-name | Use the hierarchy root to filter FIB entries |
| node | The node from which to retrieve fib entries |
| prefix | Filter the results by prefix |
| router | The router from which to retrieve fib entries |
| rows | The number of fib nodes to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| service-name | Filter the results by the service name |
| source-address | Show FIB results filtered by source-address |
| source-interface | Show FIB results filtered by source-interface |
| tenant | Show FIB results filtered by tenant |
| vrf | Displays all FIB entries with tenants that match the specified VRF. |

#### Description

This command shows the Forwarding Information Base (FIB) entries on the node that is specified by the &lt;node-name&gt; argument. The output may be limited to a specified number of rows by adding the optional _&lt;rows&gt;_ modifier at the end of the command.

This command can generate a large quantity of output on a busy system, and it is advised that administrators exercise caution when issuing this command without the &lt;rows&gt; modifier. 

#### Example

```
admin@gouda.novigrad# show fib
Tue 2020-04-21 17:48:39 UTC

Node: gouda

Entry Count: 176
Capacity:    19051

==================== ======= ======= ==================== ========================= ==============
 IP Prefix            Port    Proto   Tenant               Service                   Next Hops
==================== ======= ======= ==================== ========================= ==============
 0.0.0.0/0            <any>   <any>   lanSubnet            Internet                  1.2.3.4
 0.0.0.0/0            <any>   <any>   _internal_           Internet                  1.2.3.4
 0.0.0.0/0            <any>   <any>   MBP.lanSubnet        Internet                  1.2.3.4
 96.230.191.0/24      <any>   <any>   lanSubnet            Internet                  1.2.3.4
 96.230.191.0/24      <any>   <any>   _internal_           Internet                  1.2.3.4
 1.2.3.430/32         <any>   igmp    <global>             <ControlMessageService>   <none>
 1.2.3.4/32           179     tcp     <global>             <ControlMessageService>   <none>
 1.2.3.4/32           179     tcp     blocklist            <ControlMessageService>   <none>
 1.2.3.4/32           500     udp     <global>             VPN                       192.168.0.3
 1.2.3.4/32           500     udp     blocklist            VPN                       192.168.0.3
 127.0.0.0/8          <any>   <any>   <global>             <ControlMessageService>   <none>
 127.0.0.0/8          <any>   <any>   untrustedLanSubnet   <ControlMessageService>   <none>
 169.254.127.126/31   <any>   <any>   lanSubnet            Internet                  1.2.3.4
 169.254.127.126/31   <any>   <any>   _internal_           Internet                  1.2.3.4
 169.254.127.126/32   53      udp     _internal_           LanDnsProxy               1.2.3.4
                                                                                     1.2.3.4
 169.254.127.126/32   53      udp     MBP.lanSubnet        LanDnsProxy               1.2.3.4
                                                                                     1.2.3.4
 169.254.127.126/32   179     tcp     _internal_           <ControlMessageService>   <none>
 169.254.128.132/32   <any>   <any>   lanSubnet            Internet                  1.2.3.4
 169.254.128.132/32   <any>   <any>   _internal_           Internet                  1.2.3.4
 169.254.128.132/32   <any>   <any>   MBP.lanSubnet        Internet                  1.2.3.4
 169.254.128.132/32   <any>   <any>   untrustedLanSubnet   Internet                  1.2.3.4
 169.254.128.132/32   <any>   igmp    <global>             <ControlMessageService>   <none>
...
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 3.0.0   | Added _node_ keyword to enforce PCLI consistency |
| 5.1.0   | Added VFR support, next hop details and the ability to filter by: service-name, hierarchy-service-name, contains-service-name, prefix, source-address, source-interface, and tenant. |


## `show history`

Show PCLI command history for the current user.

#### Usage

```
show history [rows <rows>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| rows | The number of recent commands to show [type: int or &#x27;all&#x27;] |

##### See Also

| command | description |
| ------- | ----------- |
| [`clear history`](#clear-history) | Clear the PCLI&#x27;s command history for this user. |

#### Example

```
admin@gouda.novigrad# show history
   1   show run
   2   show config running
   3   quit
   4   shell

...

 465   show ntp
 466   show network-interface
 467   show network-interface wan-interface
 468   show network-interface name wan-interface
 469   show network-interface application
 470   show history
```

## `show load-balancer`

Shows current load balancer agent entries from the highway manager at the specified node.

#### Usage

```
show load-balancer [service <service>] [agent <agent>] [force] [node <node>] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| agent | Agent name to show. If unspecified, shows all agents. |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The name of the node |
| router | The name of the router |
| service | Service name to show. If unspecified, shows all services. |

#### Description

The _show load-balancer_ command provides feedback on the 128T router&#x27;s load balancing behavior, when configured to balance traffic (via a service-policy).

This command, when issued without any filters (agent, node, or service) will display all agents, nodes, and services that are subject to load balancing. (The output can be quite verbose.) These filters may be combined to &quot;hone in&quot; on specific agents/nodes/services selectively.

This command is extremely helpful for identifying why the 128T router selected specific destinations for its session-oriented traffic.

#### Example

```
admin@labsystem1.fiedler# show load-balancer
===============================================================================
Service:  web
Strategy: proportional
+-----------+--------+-----------+
|   Agent   |  Node  |  Service  |
|-----------+--------+-----------|
| agent_2_a | test1  |    web    |
+-----------+--------+-----------+

Capacity:
======  =====  ======  ======
  Used    Max    Util    Rate
======  =====  ======  ======
     0   2000    0.0%     0/s
======  =====  ======  ======

Paths (count 1):
intf10.0 gateway 172.16.12.1
======  =========  =======  =======  =========  ========
  Type    Quality    State     Loss    Latency    Jitter
======  =========  =======  =======  =========  ========
 local         30  unknown  unknown    unknown   unknown
======  =========  =======  =======  =========  ========
...
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.1.0   | This feature was introduced |

## `show lte`

Display LTE summary.

#### Usage

```
show lte [device-interface <device-interface>] [force] [node <node>] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| device-interface | LTE device interface (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display LTE data |
| router | The router for which to display LTE data |

##### Subcommands

| name | description |
| ---- | ----------- |
| connection | Display LTE connection. |
| detail | Display LTE detail. |
| modem | Display LTE modem. |
| network | Display LTE network. |
| profile | Display LTE profile. |
| signal | Display LTE signal. |
| sim | Display LTE sim. |

## `show lte connection`

Display LTE connection.

#### Usage

```
show lte connection [device-interface <device-interface>] [force] [node <node>] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| device-interface | LTE device interface (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display LTE data |
| router | The router for which to display LTE data |

#### Description

This command queries the LTE devices and displays the following state info:

- registration-status
- connection-status 
- netstat (tx, rx, tx-error, rx-error, etc)

## `show lte detail`

Display LTE detail.

#### Usage

```
show lte detail [device-interface <device-interface>] [force] [node <node>] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| device-interface | LTE device interface (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display LTE data |
| router | The router for which to display LTE data |

## `show lte firmware`

Display lte firmware information.

#### Usage

```
show lte firmwware [device-interface <device-interface>] [force] [node <node>] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| device-interface | LTE device interface (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display LTE data |
| router | The router for which to display LTE data |

#### Description

This command queries the LTE devices and displays the following state info:

- carrier-name
- FW-version
- IMEI
- card-model
- bands-supported
- bands-enabled

## `show lte modem`

Display LTE modem.

#### Usage

```
show lte modem [device-interface <device-interface>] [force] [node <node>] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| device-interface | LTE device interface (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display LTE data |
| router | The router for which to display LTE data |

## `show lte network`

Display LTE network.

#### Usage

```
show lte network [device-interface <device-interface>] [force] [node <node>] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| device-interface | LTE device interface (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display LTE data |
| router | The router for which to display LTE data |

## `show lte profile`

Display LTE profile.

#### Usage

```
show lte profile [device-interface <device-interface>] [force] [node <node>] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| device-interface | LTE device interface (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display LTE data |
| router | The router for which to display LTE data |

## `show lte signal`

Display LTE signal.

#### Usage

```
show lte signal [device-interface <device-interface>] [force] [node <node>] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| device-interface | LTE device interface (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display LTE data |
| router | The router for which to display LTE data |

#### Description

This command queries the LTE devices and displays the following state info:

- rating
- RSSI
- SNR
- carrier-name

## `show lte sim`

Display LTE sim.

#### Usage

```
show lte sim [device-interface <device-interface>] [force] [node <node>] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| device-interface | LTE device interface (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display LTE data |
| router | The router for which to display LTE data |

#### Description

This command queries the LTE devices and displays the following state info:

- ICCID
- registration-status
- carrier-name
- carrier-mcc
- carrier-mnc

## `show lte summary`

Display lte device summary.

#### Usage

```
show lte summary [device-interface <device-interface>] [force] [node <node>] router <router>
```
#### Keyword Arguments

| name | description |
| ---- | ----------- |
| device-interface | LTE device interface (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display LTE data |
| router | The router for which to display LTE data |

#### Description

This command queries the LTE devices and displays the following state info:

- device-name
- target-name
- registration-status
- connection-status (show IP if connected, otherwise, show previous error)
- signal-strength (rating, RSSI, and SNR)

## `show network-interface`

Display network-interface data for network-interface.

#### Usage

```
show network-interface [name <name>] [force] [node <node>] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| name | Network interface to display (if omitted, all will be displayed) |
| node | The node for which to display network-interface data |
| router | The router for which to display network-interface data |

##### Subcommands

| name | description |
| ---- | ----------- |
| application | Display application data info for network-interfaces. |

#### Description

The _show network-interface_, a counterpart to _show device-interface_, shows information and statistics relevant to the logical interfaces configured on your 128T networking platform.

The _show network-interface_ command will show router, node, and device names, as well as the network-interface name and basic information about each interface.

#### Example

```
admin@gouda.novigrad# show network-interface
Tue 2020-04-21 15:19:25 UTC

========== ======= ======== ================ ============ ====== ============= ========== ========== =================== ============== ========================= ======== ======== ======
 Router     Node    Device   Name             Forwarding   VLAN   Device Type   Type       DHCP       Address             Gateway        Hostname                  Admin    Oper     GIID
                                                                                                                                                                   Status   Status
========== ======= ======== ================ ============ ====== ============= ========== ========== =================== ============== ========================= ======== ======== ======
 novigrad   gouda   wan      wan-interface    true            0   ethernet      external   v4         1.2.3.4/24          2.3.4.5        my.host.name              up       up          1
 novigrad   gouda   lan      lan-interface    true            0   ethernet      external   disabled   192.168.0.1/24      --             --                        up       up          2
 novigrad   gouda   lan      lan-untrusted    true         3000   ethernet      external   disabled   172.16.0.1/24       --             --                        up       up          4
 novigrad   gouda   mgmt     mgmt-interface   false           0   ethernet      external   disabled   192.168.0.2/24      --             --                        n/a      n/a         3

Completed in 0.33 seconds
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.2.0   | This feature was introduced |

## `show network-interface application`

Display application data info for network-interfaces.

#### Usage

```
show network-interface application [name <name>] [force] [node <node>] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| name | Network interface to display (default: all) |
| node | The node for which to display application data |
| router | The router for which to display application data |

#### Description

The command _show network-interface application_ can be used to display information regarding DHCP client reservations when running a DHCP server on the respective _network-interface_.

#### Example

```
admin@gouda.novigrad# show network-interface application
Tue 2020-04-21 15:26:19 UTC

====================================================================================================
 Application Data
====================================================================================================

 Interface:                                    gouda:wan-interface
 state:                                        Interface not configured for any managed application

 Interface:                                    gouda:lan-interface
 dhcp-server:
     kea-status:
       active (running/success) since Sat 2020-04-11 12:57:23 UTC
     kea-ctrl-status:
       active (running/success) since Sat 2020-04-11 12:57:23 UTC
     metrics:
         declined-addresses:                   0
         pkt4-ack-sent:                        1900
         pkt4-discover-received:               403
         pkt4-inform-received:                 469
         pkt4-offer-sent:                      403
         pkt4-received:                        2317
         pkt4-release-received:                2
         pkt4-request-received:                1443
         pkt4-sent:                            2303
         reclaimed-declined-addresses:         0
         reclaimed-leases:                     13
         subnet[1].assigned-addresses:         24
         subnet[1].declined-addresses:         0
         subnet[1].reclaimed-declined-addresses:0
         subnet[1].reclaimed-leases:           13
         subnet[1].total-addresses:            181
     subnets:
         subnet:
           current-lease-count:                24
           current-leases:
               lease:
                 client-last-transaction-time: 2020-04-21 15:26:12
                 hostname:                     homecomtsiphone
                 hw-address:                   70:3c:69:58:01:28
                 ip-address:                   192.168.0.36
                 valid-lifetime:               86400
           subnet:                             192.168.0.1/24

           ...

     ha-heartbeat:
       role:                                   primary
       state:                                  standalone

 Interface:                                    gouda:lan-untrusted
 state:                                        Interface not configured for any managed application

 Interface:                                    gouda:mgmt-interface
 state:                                        Interface not configured for any managed application

Completed in 0.76 seconds
```

## `show ntp`

Display ntp status from the node monitor at the specified node.

#### Usage

```
show ntp [force] [router <router>] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node from which to retrieve ntp status |
| router | The router from which to retrieve ntp status (default: &lt;current router&gt;) |

#### Description

The _show ntp_ subcommand displays properties of the NTP (Network Time Protocol) process running on the local node, or on the node specified as the optional &lt;node‑name&gt; parameter passed on the command line.

#### Example

```
admin@gouda.novigrad# show ntp
Tue 2020-04-21 15:17:26 UTC

Node: gouda

======== ================== ================= ========= ====== ====== ====== ======= ========= ======== ======== ============
 Status   Time Source        Ref. ID           Stratum   Type   When   Poll   Reach     Delay   Offset   Jitter   Tally Code
======== ================== ================= ========= ====== ====== ====== ======= ========= ======== ======== ============
 active   *time-a-g.nist.g   .NIST.                  1   u       628   1024     377    22.968   -0.239    1.700   syspeer
 active   +time-a-wwv.nist   .NIST.                  1   u        18   1024     377    50.919    0.959    1.524   candidate
 active   +voipmonitor.wci   216.218.254.202         2   u       659   1024     377    71.502   -2.721    8.596   candidate
 active   +ec2-52-6-191-28   128.138.140.44          2   u        85   1024     377    19.926   -1.250    2.324   candidate
 active   -time.cloudflare   10.11.8.211             3   u       334   1024     375    45.860   -9.908   10.247   outlyer
 active   +electrode.felix   77.37.6.59              3   u       124   1024     377   115.003   -0.834    2.565   candidate
 active   +ntp1.as34288.ne   85.158.25.74            2   u       183   1024     377   114.938   -5.516    4.387   candidate
 active   +time-b-b.nist.g   .NIST.                  1   u       971   1024     377    48.929   -0.438    3.269   candidate
 active   -acheron.bitsrc.   120.251.163.32          3   u       588   1024     377    77.970    3.562    3.732   outlyer

Completed in 1.30 seconds
```

The "Ref. ID" field is a four letter ASCII string assigned to the reference clock, and refers to the identifiers defined in RFC 5905.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## `show ospf`

Show general information about OSPF

#### Usage

```
show ospf [area <area-id>] [force] router <router> [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| area | The area to filter OSPF information for |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | The router to request OSPF information from |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

##### Subcommands

| name | description |
| ---- | ----------- |
| border-routers | Show information about the OSPF border routers |
| database | Show OSPF database information |
| neighbors | Show information about OSPF neighbors |
| interfaces | Show information about the OSPF interfaces |
| routes | Show information about the OSPF routes |

#### Example

```
admin@combo-east.ComboEast# show ospf
Fri 2020-04-17 19:11:06 UTC

=========== ============ ========== ============= ==================== ========= =========== =============
 Router      Router ID    ABR Type   ASBR Router   External LSA Count   Area ID   Area Type   Area Border
                                                                                              Router
=========== ============ ========== ============= ==================== ========= =========== =============
 ComboEast   172.16.4.2   cisco      true          1                    0.0.0.0
 ComboEast   172.16.4.2   cisco      true          1                    0.0.0.1   normal

Completed in 0.35 seconds
```
Specifying the argument _detail_ provides additional information
```
admin@combo-east.ComboEast# show ospf detail
Fri 2020-04-17 19:11:14 UTC

====================================================
 Router: ComboEast
====================================================
  Router ID:                             172.16.4.2
  Deferred Shutdown:                     0.0 s
  RFC1583 Compatible:                    false
  Stub Advertisement Enabled:            false
  Opaque Capable:                        false
  Post-Start Enabled:                    0.0 s
  Pre-Shutdown Enabled:                  0.0 s
  SPF Schedule Delay:                    0.0 s
  Holdtime Minimum:                      50 ms
  Holdtime Maximum:                      5000 ms
  Holdtime Multiplier:                   1
  SPF Last Executed:                     4m 16s ago
  SPF Last Duration:                     0 ms
  SPF Has Not Run:                       false
  SPF Timer Due:                         0.0 s
  LSA Minimum Interval:                  5.0 s
  LSA Minimum Arrival:                   1.0 s
  Write Multiplier:                      20
  Refresh Timer:                         10.0 s
  ABR Type:                              cisco
  ASBR Router:                           true
  External LSA Count:                    1
  External LSA Checksum:                 0x00004aa4
  Opaque AS LSA Count:                   0
  Opaque AS LSA Checksum:                0x00000000
  Attached Area Count:                   2
  Adjacency Changes Logged:              false
  Adjacency Changes Logged (all):        false
  Area:
    Area ID:                             0.0.0.0
    Backbone:                            true
    Interface Total Count:               1
    Interface Active Count:              1
    Fully Adjacent Neighbor Count:       1
    Authentication:                      none
    Passing Fully Virtual Adjacencies:   0
    SPF Executed Count:                  8
    LSA Count:                           5
    LSA Router Count:                    2
    LSA Router Checksum:                 0x00019ad4
    LSA Network Count:                   1
    LSA Network Checksum:                0x0000f755
    LSA Summary Count:                   2
    LSA Summary Checksum:                0x0000f3ad
    LSA ASBR Count:                      0
    LSA ASBR Checksum:                   0x00000000
    LSA NSSA Count:                      0
    LSA NSSA Checksum:                   0x00000000
    LSA Opaque Link Count:               0
    LSA Opaque Link Checksum:            0x00000000
    LSA Opaque Area Count:               0
    LSA Opaque Area Checksum:            0x00000000
  Area:
    Area ID:                             0.0.0.1
    Area Type:                           normal
    Backbone:                            false
    No Summaries:                        false
    Shortcutting Mode:                   default
    S-bit Concensus:                     true
    Interface Total Count:               1
    Interface Active Count:              1
    Fully Adjacent Neighbor Count:       0
    Authentication:                      none
    Passing Fully Virtual Adjacencies:   0
    SPF Executed Count:                  3
    LSA Count:                           3
    LSA Router Count:                    1
    LSA Router Checksum:                 0x000042bc
    LSA Network Count:                   0
    LSA Network Checksum:                0x00000000
    LSA Summary Count:                   2
    LSA Summary Checksum:                0x00014c4b
    LSA ASBR Count:                      0
    LSA ASBR Checksum:                   0x00000000
    LSA NSSA Count:                      0
    LSA NSSA Checksum:                   0x00000000
    LSA Opaque Link Count:               0
    LSA Opaque Link Checksum:            0x00000000
    LSA Opaque Area Count:               0
    LSA Opaque Area Checksum:            0x00000000

Completed in 0.29 seconds
```

## `show ospf border-routers`

Show information about the OSPF border routers

#### Usage

```
show ospf border-routers [force] router <router> [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | The router to request OSPF information from |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

#### Example

```
admin@combo-east.ComboEast# show ospf border-routers
Fri 2020-04-17 19:12:20 UTC

============= ================== ================
 Router Name   Border Router ID   Routes (count)
============= ================== ================
 ComboEast     172.16.4.3         1

Completed in 0.29 seconds
```
Specifying the argument _detail_ provides additional information
```
dmin@combo-east.ComboEast# show ospf border-routers detail
Fri 2020-04-17 19:12:30 UTC

========================================
 Router: ComboEast
========================================
  Border Router:
    Border Router ID:        172.16.4.3
    Route:
      Area ID:               0.0.0.0
      Cost:                  10
      Inter-Area:            false
      ABR:                   true
      ASBR:                  false
      Path:
        Via:                 172.16.3.3
        Device Interface:    11
        Network Interface:   intf11

Completed in 0.33 seconds
```

## `show ospf database`

Show OSPF database information

#### Usage

```
show ospf database [self-originate] [force] router <router> [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | The router to request OSPF information from |
| self-originate | Retrieve only self-originated LSA information |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

##### Subcommands

| name | description |
| ---- | ----------- |
| max-age | Show OSPF LSAs which have reached maximum age |
| lsa | Show OSPF database LSA information |

#### Example

```
admin@combo-east.ComboEast# show ospf database
Fri 2020-04-17 19:13:24 UTC

=========== ============= ============= ============ ==================== ====== =================
 Router      Area ID       Type          LSA ID       Advertising Router   Age    Sequence Number
=========== ============= ============= ============ ==================== ====== =================
 ComboEast   0.0.0.0       Router        172.16.4.2   172.16.4.2           386    0x80000006
 ComboEast   0.0.0.0       Router        172.16.4.3   172.16.4.3           1120   0x80000005
 ComboEast   0.0.0.0       Network       172.16.3.3   172.16.4.3           1121   0x80000001
 ComboEast   0.0.0.0       Summary       172.16.1.0   172.16.4.2           421    0x80000002
 ComboEast   0.0.0.0       Summary       172.16.2.0   172.16.4.3           1289   0x80000002
 ComboEast   0.0.0.1       Router        172.16.4.2   172.16.4.2           381    0x80000005
 ComboEast   0.0.0.1       Summary       172.16.2.0   172.16.4.2           421    0x80000001
 ComboEast   0.0.0.1       Summary       172.16.3.0   172.16.4.2           421    0x80000001
 ComboEast   unavailable   AS_External   12.0.0.1     172.16.4.2           386    0x80000001

Completed in 0.39 seconds

```
Specifying the argument _detail_ provides additional information
```
admin@combo-east.ComboEast# show ospf database detail
Fri 2020-04-17 19:13:37 UTC

==============================================
 Router: ComboEast
==============================================
  Area:
    Area ID:                    0.0.0.0
    LSA Type:
      Type:                     Router
      LSA:
        LSA ID:                 172.16.4.2
        Advertising Router:     172.16.4.2
                                (self)
        Age:                    398
        Sequence Number:        0x80000006
        Checksum:               0x0000d067
        Link Count:             1
      LSA:
        LSA ID:                 172.16.4.3
        Advertising Router:     172.16.4.3
        Age:                    1133
        Sequence Number:        0x80000005
        Checksum:               0x0000ca6d
        Link Count:             1
    LSA Type:
      Type:                     Network
      LSA:
        LSA ID:                 172.16.3.3
        Advertising Router:     172.16.4.3
        Age:                    1133
        Sequence Number:        0x80000001
        Checksum:               0x0000f755
    LSA Type:
      Type:                     Summary
      LSA:
        LSA ID:                 172.16.1.0
        Advertising Router:     172.16.4.2
                                (self)
        Age:                    433
        Sequence Number:        0x80000002
        Checksum:               0x0000824f
        Route IP Prefix:        172.16.1.0/24
      LSA:
        LSA ID:                 172.16.2.0
        Advertising Router:     172.16.4.3
        Age:                    1301
        Sequence Number:        0x80000002
        Checksum:               0x0000715e
        Route IP Prefix:        172.16.2.0/24
  Area:
    Area ID:                    0.0.0.1
    LSA Type:
      Type:                     Router
      LSA:
        LSA ID:                 172.16.4.2
        Advertising Router:     172.16.4.2
                                (self)
        Age:                    393
        Sequence Number:        0x80000005
        Checksum:               0x000042bc
        Link Count:             1
    LSA Type:
      Type:                     Summary
      LSA:
        LSA ID:                 172.16.2.0
        Advertising Router:     172.16.4.2
                                (self)
        Age:                    433
        Sequence Number:        0x80000001
        Checksum:               0x0000dde9
        Route IP Prefix:        172.16.2.0/24
      LSA:
        LSA ID:                 172.16.3.0
        Advertising Router:     172.16.4.2
                                (self)
        Age:                    433
        Sequence Number:        0x80000001
        Checksum:               0x00006e62
        Route IP Prefix:        172.16.3.0/24
  Area:
    Area ID:                    unavailable
    LSA Type:
      Type:                     AS_External
      LSA:
        LSA ID:                 12.0.0.1
        Advertising Router:     172.16.4.2
                                (self)
        Age:                    398
        Sequence Number:        0x80000001
        Checksum:               0x00004aa4
        Route IP Prefix:        12.0.0.1/32
        External Metric Type:   type-2
        Route Tag:              0

Completed in 0.34 seconds
```

## `show ospf database lsa`

Show OSPF database LSA information

#### Usage

```
show ospf database lsa [{origin <ip> | self-originate}] [lsa-id <id>] [force] lsa-type <type> router <router> [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| lsa-id | The Link State ID to retrieve |
| lsa-type | The LSA type to retrieve |
| origin | Retrieve LSAs from this advertising router IP |
| router | The router to request OSPF information from |
| self-originate | Retrieve only self-originated LSA information |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

#### Example

```
admin@combo-east.ComboEast# show ospf database lsa lsa-type router
Fri 2020-04-17 19:15:01 UTC

=========== ========= ============ ========== =========== ============= ============
 Router      Area ID   LSA ID       LSA Type   Flags       Metric        Link Count
=========== ========= ============ ========== =========== ============= ============
 ComboEast   0.0.0.0   172.16.4.2   Router     ABR, ASBR   unavailable   1
 ComboEast   0.0.0.0   172.16.4.3   Router     ABR         unavailable   1
 ComboEast   0.0.0.1   172.16.4.2   Router     ABR, ASBR   unavailable   1

Completed in 0.33 seconds
```
Specifying the argument _detail_ provides additional information
```
admin@combo-east.ComboEast# show ospf database lsa lsa-type router detail
Fri 2020-04-17 19:15:24 UTC

====================================================
 Router: ComboEast
====================================================
  Router ID:                172.16.4.2
  Area:
    Area ID:                0.0.0.0
    LSA:
      LSA ID:               172.16.4.2
      Advertising Router:   172.16.4.2
                            (self)
      LSA Type:             Router
      Age:                  506
      Sequence Number:      0x80000006
      Checksum:             0x0000d067
      Length:               36 bytes
      Translated:           false
      Options:
        - E
      Flags:
        - ABR
        - ASBR
      Metric:               unavailable
      Link Count:           1
      Link:
        Link Type:          Transit
        Link ID Type:       DesignatedRouterAddress
        Link ID:            172.16.3.3
        Data Type:          RouterInterfaceAddress
        Data:               172.16.3.2
        Metric:             10
    LSA:
      LSA ID:               172.16.4.3
      Advertising Router:   172.16.4.3
      LSA Type:             Router
      Age:                  1240
      Sequence Number:      0x80000005
      Checksum:             0x0000ca6d
      Length:               36 bytes
      Translated:           false
      Options:
        - E
      Flags:
        - ABR
      Metric:               unavailable
      Link Count:           1
      Link:
        Link Type:          Transit
        Link ID Type:       DesignatedRouterAddress
        Link ID:            172.16.3.3
        Data Type:          RouterInterfaceAddress
        Data:               172.16.3.3
        Metric:             10
  Area:
    Area ID:                0.0.0.1
    LSA:
      LSA ID:               172.16.4.2
      Advertising Router:   172.16.4.2
                            (self)
      LSA Type:             Router
      Age:                  501
      Sequence Number:      0x80000005
      Checksum:             0x000042bc
      Length:               36 bytes
      Translated:           false
      Options:
        - E
      Flags:
        - ABR
        - ASBR
      Metric:               unavailable
      Link Count:           1
      Link:
        Link Type:          Stub
        Link ID Type:       Net
        Link ID:            172.16.1.0
        Data Type:          NetworkMask
        Data:               255.255.255.0
        Metric:             10

Completed in 0.40 seconds
```
```
admin@combo-east.ComboEast# show ospf database lsa lsa-id 172.16.4.3 lsa-type router
Fri 2020-04-17 19:16:25 UTC

=========== ========= ============ ========== ======= ============= ============
 Router      Area ID   LSA ID       LSA Type   Flags   Metric        Link Count
=========== ========= ============ ========== ======= ============= ============
 ComboEast   0.0.0.0   172.16.4.3   Router     ABR     unavailable   1

Completed in 0.35 seconds
```
```
admin@combo-east.ComboEast# show ospf database lsa lsa-id 172.16.4.3 lsa-type router detail
Fri 2020-04-17 19:17:24 UTC

====================================================
 Router: ComboEast
====================================================
  Router ID:                172.16.4.2
  Area:
    Area ID:                0.0.0.0
    LSA:
      LSA ID:               172.16.4.3
      Advertising Router:   172.16.4.3
      LSA Type:             Router
      Age:                  1359
      Sequence Number:      0x80000005
      Checksum:             0x0000ca6d
      Length:               36 bytes
      Translated:           false
      Options:
        - E
      Flags:
        - ABR
      Metric:               unavailable
      Link Count:           1
      Link:
        Link Type:          Transit
        Link ID Type:       DesignatedRouterAddress
        Link ID:            172.16.3.3
        Data Type:          RouterInterfaceAddress
        Data:               172.16.3.3
        Metric:             10

Completed in 0.26 seconds
```

## `show ospf database max-age`

Show OSPF LSAs which have reached maximum age

#### Usage

```
show ospf database max-age [force] [router <router>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | The router to request OSPF information from (default: &lt;current router&gt;) |

#### Example

```
admin@combo-east.ComboEast# show ospf database max-age
Fri 2020-04-17 19:19:15 UTC

=========== ========== ============= ======================= =================
 Router      LSA ID     LSA Type      Advertising Router IP   Reference Count
=========== ========== ============= ======================= =================
 ComboEast   12.0.0.1   AS_External   172.16.4.2              4

Completed in 0.34 seconds
```
```
admin@combo-east.ComboEast# show ospf database self-originate
Fri 2020-04-17 19:21:29 UTC

=========== ========= ========= ============ ==================== ===== =================
 Router      Area ID   Type      LSA ID       Advertising Router   Age   Sequence Number
=========== ========= ========= ============ ==================== ===== =================
 ComboEast   0.0.0.0   Router    172.16.4.2   172.16.4.2           148   0x80000007
 ComboEast   0.0.0.0   Summary   172.16.1.0   172.16.4.2           906   0x80000002
 ComboEast   0.0.0.1   Router    172.16.4.2   172.16.4.2           148   0x80000006
 ComboEast   0.0.0.1   Summary   172.16.2.0   172.16.4.2           906   0x80000001
 ComboEast   0.0.0.1   Summary   172.16.3.0   172.16.4.2           906   0x80000001

Completed in 0.33 seconds
```
```
admin@combo-east.ComboEast# show ospf database self-originate detail
Fri 2020-04-17 19:21:39 UTC

============================================
 Router: ComboEast
============================================
  Area:
    Area ID:                  0.0.0.0
    LSA Type:
      Type:                   Router
      LSA:
        LSA ID:               172.16.4.2
        Advertising Router:   172.16.4.2
                              (self)
        Age:                  158
        Sequence Number:      0x80000007
        Checksum:             0x0000c870
        Link Count:           1
    LSA Type:
      Type:                   Summary
      LSA:
        LSA ID:               172.16.1.0
        Advertising Router:   172.16.4.2
                              (self)
        Age:                  915
        Sequence Number:      0x80000002
        Checksum:             0x0000824f
        Route IP Prefix:      172.16.1.0/24
  Area:
    Area ID:                  0.0.0.1
    LSA Type:
      Type:                   Router
      LSA:
        LSA ID:               172.16.4.2
        Advertising Router:   172.16.4.2
                              (self)
        Age:                  158
        Sequence Number:      0x80000006
        Checksum:             0x00003ac5
        Link Count:           1
    LSA Type:
      Type:                   Summary
      LSA:
        LSA ID:               172.16.2.0
        Advertising Router:   172.16.4.2
                              (self)
        Age:                  916
        Sequence Number:      0x80000001
        Checksum:             0x0000dde9
        Route IP Prefix:      172.16.2.0/24
      LSA:
        LSA ID:               172.16.3.0
        Advertising Router:   172.16.4.2
                              (self)
        Age:                  916
        Sequence Number:      0x80000001
        Checksum:             0x00006e62
        Route IP Prefix:      172.16.3.0/24

Completed in 0.32 seconds
```
```
admin@combo-east.ComboEast# show ospf database lsa lsa-type router origin 172.16.4.3
Fri 2020-04-17 19:25:03 UTC

=========== ========= ============ ========== ======= ============= ============
 Router      Area ID   LSA ID       LSA Type   Flags   Metric        Link Count
=========== ========= ============ ========== ======= ============= ============
 ComboEast   0.0.0.0   172.16.4.3   Router     ABR     unavailable   1

Completed in 0.38 seconds
```
```
admin@combo-east.ComboEast# show ospf database lsa lsa-type router origin 172.16.4.3 detail
Fri 2020-04-17 19:25:12 UTC

====================================================
 Router: ComboEast
====================================================
  Router ID:                172.16.4.2
  Area:
    Area ID:                0.0.0.0
    LSA:
      LSA ID:               172.16.4.3
      Advertising Router:   172.16.4.3
      LSA Type:             Router
      Age:                  144
      Sequence Number:      0x80000006
      Checksum:             0x0000c86e
      Length:               36 bytes
      Translated:           false
      Options:
        - E
      Flags:
        - ABR
      Metric:               unavailable
      Link Count:           1
      Link:
        Link Type:          Transit
        Link ID Type:       DesignatedRouterAddress
        Link ID:            172.16.3.3
        Data Type:          RouterInterfaceAddress
        Data:               172.16.3.3
        Metric:             10

Completed in 0.37 seconds
```

## `show ospf interfaces`

Show information about the OSPF interfaces

#### Usage

```
show ospf interfaces [network-interface <name>] [force] router <router> [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| network-interface | The network interface to fetch OSPF information for |
| router | The router to request OSPF information from |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

#### Example

```
admin@combo-east.ComboEast# show ospf interfaces
Fri 2020-04-17 19:29:52 UTC

============= ================== =========== ======== ============ =========== ========= ===========
 Router Name   Device Interface   Network     Status   IP Address   OSPF Type   Area ID   Area Type
                                  Interface
============= ================== =========== ======== ============ =========== ========= ===========
 ComboEast     10                 intf10      up       172.16.1.2   Peer        0.0.0.1   normal
                                                       /24
 ComboEast     11                 intf11      up       172.16.3.2   Peer        0.0.0.0   normal
                                                       /24

Completed in 0.37 seconds
```
Specifying the argument _detail_ provides additional information
```
admin@combo-east.ComboEast# show ospf interfaces detail
Fri 2020-04-17 19:30:06 UTC

===============================================
 Router: ComboEast
===============================================
  Interface:
    Device Interface:            10
    Network Interface:           intf10
    Interface Index:             3
    Status:                      up
    MTU Size:                    1500 bytes
    Bandwidth:                   10 Mbps
    OSPF Enabled:                true
    OSPF Running:                false
    Flags:
      - UP
      - BROADCAST
      - RUNNING
      - MULTICAST
    Address:
      IP Address:                172.16.1.2/24
      Broadcast IP Address:      unavailable
      Unnumbered Interface:      false
      V-Link Peer:               unavailable
      MTU Mismatch Detection:    false
      Router ID:                 172.16.4.2
      OSPF Type:                 Peer
      OSPF State:                DR
      Area ID:                   0.0.0.1
      Area Type:                 normal
      Network Type:              BROADCAST
      Cost:                      10
      Transmit Delay:            1.0 s
      Priority:                  1
      BDR ID:                    unavailable
      BDR Address:               unavailable
      LSA Sequence:              0x00000000
      Multicast Member (All):    true
      Multicast Member (DR):     true
      Timer Hello:               0.1 s
      Timer Dead:                0.025 s
      Timer Wait:                0.025 s
      Timer Retransmit:          0.2 s
      Timer Hello Due:           6.981 s
      Timer Passive:             false
      Neighbor Count:            0
      Adjacent Neighbor Count:   0
  Interface:
    Device Interface:            11
    Network Interface:           intf11
    Interface Index:             4
    Status:                      up
    MTU Size:                    1500 bytes
    Bandwidth:                   10 Mbps
    OSPF Enabled:                true
    OSPF Running:                false
    Flags:
      - UP
      - BROADCAST
      - RUNNING
      - MULTICAST
    Address:
      IP Address:                172.16.3.2/24
      Broadcast IP Address:      unavailable
      Unnumbered Interface:      false
      V-Link Peer:               unavailable
      MTU Mismatch Detection:    false
      Router ID:                 172.16.4.2
      OSPF Type:                 Peer
      OSPF State:                Backup
      Area ID:                   0.0.0.0
      Area Type:                 normal
      Network Type:              BROADCAST
      Cost:                      10
      Transmit Delay:            1.0 s
      Priority:                  1
      BDR ID:                    172.16.4.2
      BDR Address:               172.16.3.2
      LSA Sequence:              0x00000000
      Multicast Member (All):    true
      Multicast Member (DR):     true
      Timer Hello:               0.1 s
      Timer Dead:                0.025 s
      Timer Wait:                0.025 s
      Timer Retransmit:          0.2 s
      Timer Hello Due:           1.85 s
      Timer Passive:             false
      Neighbor Count:            1
      Adjacent Neighbor Count:   1

Completed in 0.32 seconds
```

## `show ospf neighbors`

Show information about OSPF neighbors

#### Usage

```
show ospf neighbors [network-interface <name>] [neighbor <ip>] [force] router <router> [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| neighbor | The neighbor IP address for which to fetch OSPF information |
| network-interface | The network interface to fetch OSPF neighbor information for |
| router | The router to request OSPF information from |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

#### Example

```
admin@combo-east.ComboEast# show ospf neighbors
Fri 2020-04-17 19:30:22 UTC

============= ==================== ========== ======= ==================== =================== ===========
 Router Name   Neighbor Router ID   Priority   State   Dead Timer Due (s)   Interface Address   Interface
                                                                                                State
============= ==================== ========== ======= ==================== =================== ===========
 ComboEast     172.16.4.3           1          Full    31.302               172.16.3.2          DR

Completed in 0.32 seconds
```
Specifying the argument _detail_ provides additional information
```
admin@combo-east.ComboEast# show ospf neighbors detail
Fri 2020-04-17 19:30:36 UTC

==============================================================
 Router: ComboEast
==============================================================
  Neighbor:
    Neighbor Router ID:                           172.16.4.3
    Priority:                                     1
    State:                                        Full
    Dead Timer Due:                               37.832 s
    Interface Address:                            172.16.3.2
    Device Interface:                             11
    Network Interface:                            intf11
    Interface State:                              DR
    Area ID:                                      0.0.0.0
    Area Type:                                    normal
    Database Summary List Count:                  0
    LSA Request List Count:                       0
    LSA Retransmission List Count:                0
    State Change Count:                           6 changes
    Last Progressive Change:                      35m 52s ago
    Last Regressive Change:                       never
    Last Regressive Change Reason:                NoEvent
    Designated Router ID:                         172.16.3.3
    Backup Designated Router ID:                  172.16.3.2
    Options:
      - E
    Thread Inactivity Timer:                      true
    Thread Database Description Retransmission:   false
    Thread LSA Request Retransmission:            true
    Thread LSA Update Retransmission:             true

Completed in 0.30 seconds
```

## `show ospf routes`

Show information about the OSPF routes

#### Usage

```
show ospf routes [force] router <router> [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | The router to request OSPF information from |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

#### Example

```
admin@combo-east.ComboEast# show ospf routes
Fri 2020-04-17 19:33:20 UTC

============= =============== ============ ========= ====== ========= =======
 Router Name   Route Prefix    Route Type   Area ID   Cost   Discard   Paths
============= =============== ============ ========= ====== ========= =======
 ComboEast     172.16.1.0/24   Network      0.0.0.1   10               1
 ComboEast     172.16.2.0/24   Network      0.0.0.0   20               1
 ComboEast     172.16.3.0/24   Network      0.0.0.0   10               1

Completed in 0.40 seconds
```
Specifying the argument _detail_ provides additional information
```
admin@combo-east.ComboEast# show ospf routes detail
Fri 2020-04-17 19:33:29 UTC

===========================================
 Router: ComboEast
===========================================
  Network Route:
    Route Prefix:            172.16.1.0/24
    Area ID:                 0.0.0.1
    Cost:                    10
    Inter-Area:              false
    Intra-Area:              true
    Path:
      Device Interface:      10
      Network Interface:     intf10
  Network Route:
    Route Prefix:            172.16.2.0/24
    Area ID:                 0.0.0.0
    Cost:                    20
    Inter-Area:              true
    Intra-Area:              false
    Path:
      Via:                   172.16.3.3
      Device Interface:      11
      Network Interface:     intf11
  Network Route:
    Route Prefix:            172.16.3.0/24
    Area ID:                 0.0.0.0
    Cost:                    10
    Inter-Area:              false
    Intra-Area:              true
    Path:
      Device Interface:      11
      Network Interface:     intf11
  No External Routes
  Router:
    Router ID:               172.16.4.3
    Route:
      Area ID:               0.0.0.0
      Cost:                  10
      Inter-Area:            false
      ABR:                   true
      ASBR:                  false
      Path:
        Via:                 172.16.3.3
        Device Interface:    11
        Network Interface:   intf11

Completed in 0.35 seconds
```

## `show peers`

Display peer information.

#### Usage

```
show peers [name <name>] [force] router <router> [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| name | Peer to display (default: all) |
| router | The router on which to display peers |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

##### Subcommands

| name | description |
| ---- | ----------- |
| hostnames | Display resolved hostnames of peers |

#### Description

The _show peers_ command displays properties of each of the &quot;neighboring&quot; 128T routers that the router in question has a peering association with.

This command shows information on peering associations between 128T routers, not peering associations with BGP peers. For information on BGP peering statistics, refer to &quot;show bgp&quot; in this document.

For each peer it shows which interface the peer is reachable via, the destination IP address for which the peer is reached, the VLAN to use to reach it, and whether the peer is currently &quot;up&quot;, &quot;down&quot;, or &quot;initializing&quot;.

#### Example

```
admin@tp-cond-primary.tp-cond# show peers router all
Fri 2020-04-17 19:07:42 UTC

============================== ===================== ==================== ================ ========= ============= =============
 Peer                           Node                  Network Interface    Destination      Status    Hostname      Path MTU
============================== ===================== ==================== ================ ========= ============= =============
 burl-corp -> brawny            burl-corp-secondary   lighttower           1.2.3.4          up        unavailable   unavailable
 burl-corp -> seattle-site      burl-corp-secondary   lighttower           1.2.3.4          up        unavailable   unavailable
 burl-corp -> tp-colo           burl-corp-primary     comcast              1.2.3.4          up        unavailable   unavailable
 burl-corp -> tp-colo           burl-corp-primary     comcast              1.2.3.4          up        unavailable   unavailable
 burl-corp -> tp-colo           burl-corp-secondary   lighttower           1.2.3.4          up        unavailable   unavailable
 burl-corp -> tp-colo           burl-corp-secondary   lighttower           1.2.3.4          up        unavailable   unavailable
 burl-corp -> tpn_router        burl-corp-secondary   lighttower           1.2.3.4          up        unavailable   unavailable
 tp-colo -> imjustarouter       tp-colo-primary       public-lab-dmz-pri   1.2.3.4          up        unavailable   unavailable
 tp-colo -> imjustarouter       tp-colo-secondary     public-lab-dmz-sec   1.2.3.4          standby   unavailable   unavailable
 tp-colo -> mobile128T          tp-colo-primary       public-lab-dmz-pri   1.2.3.4          up        unavailable   unavailable
 tp-colo -> mobile128T          tp-colo-secondary     public-lab-dmz-sec   1.2.3.4          standby   unavailable   unavailable
 tp-colo -> brawny              tp-colo-primary       public-lab-dmz-pri   1.2.3.4          up        unavailable   unavailable
 tp-colo -> brawny              tp-colo-secondary     public-lab-dmz-sec   1.2.3.4          standby   unavailable   unavailable
 tp-colo -> burl-corp           tp-colo-primary       public-blended       1.2.3.4          up        unavailable   unavailable
 tp-colo -> burl-corp           tp-colo-primary       public-blended       1.2.3.4          up        unavailable   unavailable
 tp-colo -> burl-corp           tp-colo-secondary     public-comcast       1.2.3.4          up        unavailable   unavailable
 tp-colo -> burl-corp           tp-colo-secondary     public-comcast       1.2.3.4          up        unavailable   unavailable
 tp-colo -> tp-lab              tp-colo-primary       colo-lab-pri         1.2.3.4          up        unavailable   unavailable
 tp-colo -> tp-lab              tp-colo-secondary     colo-lab-sec         1.2.3.4          standby   unavailable   unavailable
 tp-lab -> tp-colo              tp-lab-primary        lab-colo-pri         1.2.3.4          standby   unavailable   unavailable
 tp-lab -> tp-colo              tp-lab-secondary      lab-colo-sec         1.2.3.4          up        unavailable   unavailable

Completed in 1.25 seconds
```
The _detail_ option will show peer path statistics (loss, latency, jitter, calculated MOS, uptime) for each peer path.
```
admin@tp-cond-primary.tp-cond# show peers router all detail
Wed 2020-04-22 20:58:38 UTC
WARNING: Targeting router 'all' may take a long time. Continue anyway? [y/N]: y

============================== ===================== ==================== ============= ========= ============= ============= ============= ============ ========= ======= =============
 Peer                           Node                  Network Interface    Destination   Status    Hostname      Path MTU      Latency(ms)   Jitter(ms)   Loss(%)     MOS   Uptime
============================== ===================== ==================== ============= ========= ============= ============= ============= ============ ========= ======= =============
 burl-corp -> brawny            burl-corp-secondary   lighttower           1.2.3.4       down      unavailable   unavailable            22            1         0   0.439   unavailable
 burl-corp -> seattle-site      burl-corp-secondary   lighttower           1.2.3.4       up        unavailable   unavailable            88            0         0   0.436   12d4h31m
 burl-corp -> tp-colo           burl-corp-primary     comcast              1.2.3.4       up        unavailable   unavailable             8            0         0    0.44   12d4h31m
 burl-corp -> tp-colo           burl-corp-primary     comcast              1.2.3.4       up        unavailable   unavailable             1            0         0    0.44   12d4h31m
 burl-corp -> tp-colo           burl-corp-secondary   lighttower           1.2.3.4       up        unavailable   unavailable             7            0         0    0.44   12d4h31m
 burl-corp -> tp-colo           burl-corp-secondary   lighttower           1.2.3.4       up        unavailable   unavailable             3            0         0    0.44   12d4h31m
 burl-corp -> tpn_router        burl-corp-secondary   lighttower           1.2.3.4       up        unavailable   unavailable             1            0         0    0.44   12d4h31m
 tp-colo -> imjustarouter       tp-colo-primary       public-lab-dmz-pri   1.2.3.4       up        unavailable   unavailable            19            1         0   0.439   1d0h46m
 tp-colo -> imjustarouter       tp-colo-secondary     public-lab-dmz-sec   1.2.3.4       standby   unavailable   unavailable            17            0         0    0.44   unavailable
 tp-colo -> mobile128T          tp-colo-primary       public-lab-dmz-pri   1.2.3.4       up        unavailable   unavailable            18            0         0    0.44   1d0h46m
 tp-colo -> mobile128T          tp-colo-secondary     public-lab-dmz-sec   1.2.3.4       standby   unavailable   unavailable            19            0         0   0.439   unavailable
 tp-colo -> brawny              tp-colo-primary       public-lab-dmz-pri   1.2.3.4       down      unavailable   unavailable            33            0         0   0.439   unavailable
 tp-colo -> brawny              tp-colo-secondary     public-lab-dmz-sec   1.2.3.4       standby   unavailable   unavailable            22            0         0   0.439   unavailable
 tp-colo -> burl-corp           tp-colo-primary       public-blended       1.2.3.4       up        unavailable   unavailable             8            0         0    0.44   0d12h41m
 tp-colo -> burl-corp           tp-colo-primary       public-blended       1.2.3.4       up        unavailable   unavailable             7            0         0    0.44   1d0h46m
 tp-colo -> burl-corp           tp-colo-secondary     public-comcast       1.2.3.4       up        unavailable   unavailable             1            0         0    0.44   1d0h57m
 tp-colo -> burl-corp           tp-colo-secondary     public-comcast       1.2.3.4       up        unavailable   unavailable             2            0         0    0.44   0d10h2m
 tp-colo -> tp-lab              tp-colo-primary       colo-lab-pri         1.2.3.4       up        unavailable   unavailable             0            0         0    0.44   1d0h46m
 tp-colo -> tp-lab              tp-colo-secondary     colo-lab-sec         1.2.3.4       standby   unavailable   unavailable             0            0         0    0.44   unavailable
 tp-lab -> tp-colo              tp-lab-primary        lab-colo-pri         1.2.3.4       standby   unavailable   unavailable             -            -         -       -   unavailable
 tp-lab -> tp-colo              tp-lab-secondary      lab-colo-sec         1.2.3.4       up        unavailable   unavailable             0            0         0    0.44   1d0h46m

Completed in 1.34 seconds
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.0.0   | This feature was introduced |

## `show peers hostnames`

Display resolved hostnames of peers

#### Usage

```
show peers hostnames [force] [router <router>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | The router on which to display peer hostnames (default: all) |

#### Example

```
admin@tp-cond-primary.tp-cond# show peers hostnames router tp-lab
Fri 2020-04-17 19:16:15 UTC

=================== ======== ======================== ============
 Peer                Router   Hostname                 IP Address
=================== ======== ======================== ============
 tp-lab -> tp-colo   tp-lab   nodea.router1.128t.com   1.2.3.4
 tp-lab -> tp-colo   tp-lab   nodea.router1.128t.com   1.2.3.4

Completed in 0.24 seconds
```

## `show platform`

Display platform information of nodes.

#### Usage

```
show platform [force] [router <router>] [node <node>] [<category>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which platform info will be displayed |
| router | The router for which platform info will be displayed (default: &lt;current router&gt;) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| category | all \| cpu \| device-interfaces \| disk \| memory \| operating-system \| vendor (default: all) |

##### See Also

| command | description |
| ------- | ----------- |
| [`show stats cpu`](#show-stats-cpu) | CPU utilization information |
| [`show stats disk`](#show-stats-disk) | Disk usage information |
| [`show stats memory`](#show-stats-memory) | Memory usage information |

#### Description

The _show platform_ command displays properties of the underlying platform upon which the 128T software is running. This can assist in finding PCI addresses and MAC addresses for the hardware in the system, as well as disk information, OS information, etc.

#### Example

```
admin@labsystem1.fiedler# show platform
Mon 2017-02-27 16:00:20 EST

========================================================
 labsystem1
========================================================

------------------
 Memory Information
------------------
 Memory:

---------------
 CPU Information
---------------
 Type:            Pentium (Fill By OEM)
 Speed:           1.60
 Cores:           4

...
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.0.0   | This feature was introduced |

## `show plugins available`

Shows latest verison of plugins available for install.

#### Usage

```
show plugins available [node <node>] [<name>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| node | The node for which to display available plugins (default: all) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | Name of plugin to show |

##### See Also

| command | description |
| ------- | ----------- |
| [`manage plugin install`](#manage-plugin-install) | Install a plugin on conductor. |
| [`manage plugin remove`](#manage-plugin-remove) | Remove an installed plugin. |
| [`show plugins installed`](#show-plugins-installed) | Shows installed plugins. |

## `show plugins installed`

Shows installed plugins.

#### Usage

```
show plugins installed [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| node | The node for which to display installed plugins (default: all) |

##### See Also

| command | description |
| ------- | ----------- |
| [`manage plugin install`](#manage-plugin-install) | Install a plugin on conductor. |
| [`manage plugin remove`](#manage-plugin-remove) | Remove an installed plugin. |
| [`show plugins available`](#show-plugins-available) | Shows latest verison of plugins available for install. |

## `show rib`

Displays the contents of the 128T router&#39;s Routing Information Base (RIB)

#### Usage

```
show rib [rows <rows>] [force] router <router> vrf <vrf-name> [<route>] 
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | The name of the router for which to display RIB routes |
| rows | The number of rib entries to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| vrf | Displays all routes learned in the specified VRF table. |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| route | Route ip-prefix [type: IP prefix] |

##### Subcommands

| name | description |
| ---- | ----------- |
| summary | Displays a summary of the Routing Information Base (RIB) |
| connected | Displays the contents of the Routing Information Base (RIB) filtered to show only connected routes |
| static | Displays the contents of the Routing Information Base (RIB) filtered to show only static routes |
| bgp | Displays the contents of the Routing Information Base (RIB) filtered to show only those learned from BGP |
| ospf | Displays the contents of the Routing Information Base (RIB) filtered to show only those learned from OSPF |

#### Description

The _show rib_ subcommand displays the contents of the 128T router&#x27;s Routing Information Base (RIB). This is the complete list of connected, direct, and learned routes on the system. (Note that the output may be quite verbose.)

When issuing the command without any arguments, the entire RIB is displayed.

#### Example

```
admin@labsystem1.fiedler# show rib
Codes: K - kernel route, C - connected, S - static, R - RIP,
       O - OSPF, I - IS-IS, B - BGP, P - PIM, A - Babel,
       > - selected route, * - FIB route

C>* 10.0.0.0/16 is directly connected, eth0
C>* 127.0.0.0/8 is directly connected, lo
C>* 172.16.1.0/24 is directly connected, 1-10.0
C>* 172.16.2.0/24 is directly connected, 1-11.0
C>* 172.16.3.0/24 is directly connected, dpdk3
```

When a specific route is given as an argument to the command, more detail is shown for that route:
```
admin@labsystem1.fiedler# show rib 10.0.0.0/16 summary
Routing entry for 10.0.0.0/16
  Known via "connected", distance 0, metric 0, vrf 0, best
  * directly connected, eth0

admin@labsystem1.fiedler#
```

## `show rib bgp`

Displays the contents of the Routing Information Base (RIB) filtered to show only those learned from BGP

#### Usage

```
show rib bgp [rows <rows>] [force] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | The name of the router for which to display the RIB |
| rows | The number of rib entries to display at once [type: int or &#x27;all&#x27;] (default: 50) |

#### Description

The _show rib bgp_ subcommand displays the contents of the 128T router&#x27;s Routing Information Base (RIB) filtered to show only those learned from BGP.

#### Example

```
admin@labsystem1.fiedler# show rib bgp
Fri 2020-04-17 17:23:28 UTC
Codes: K - kernel route, C - connected, S - static, R - RIP,
       O - OSPF, I - IS-IS, B - BGP, E - EIGRP, N - NHRP,
       T - Table, v - VNC, V - VNC-Direct, A - Babel, D - SHARP,
       F - PBR,
       > - selected route, * - FIB route

B>  0.0.0.0/0 [20/0] via 172.2.34.23 (recursive), 2d10h30m
  *                    via 172.2.34.23, g684 onlink, 2d10h30m
B>  85.12.94.23/32 [20/0] via 172.2.34.23 (recursive), 2d10h30m
  *                          via 172.2.34.23, g684 onlink, 2d10h30m
B>  85.12.94.24/32 [20/0] via 172.2.34.23 (recursive), 2d10h30m
  *                          via 172.2.34.23, g684 onlink, 2d10h30m
B>  85.12.94.25/32 [20/0] via 172.2.34.23 (recursive), 2d10h30m
  *                          via 172.2.34.23, g684 onlink, 2d10h30m
B>  85.12.94.26/32 [20/0] via 172.2.34.23 (recursive), 2d10h30m
  *                          via 172.2.34.23, g684 onlink, 2d10h30m
B>  85.12.94.27/32 [20/0] via 172.2.34.23 (recursive), 2d10h30m
  *                          via 172.2.34.23, g684 onlink, 2d10h30m
B>  85.12.94.28/32 [20/0] via 172.2.34.23 (recursive), 2d10h30m
  *                          via 172.2.34.23, g684 onlink, 2d10h30m
B>  85.12.94.202/32 [20/0] via 172.2.34.23 (recursive), 2d10h30m
  *                           via 172.2.34.23, g684 onlink, 2d10h30m
B>  64.112.104.111/32 [20/0] via 172.2.34.23 (recursive), 2d10h30m
  *                            via 172.2.34.23, g684 onlink, 2d10h30m
B>  64.112.104.112/32 [20/0] via 172.2.34.23 (recursive), 2d10h30m
  *                            via 172.2.34.23, g684 onlink, 2d10h30m
B>  64.112.104.113/32 [20/0] via 172.2.34.23 (recursive), 2d10h30m
  *                            via 172.2.34.23, g684 onlink, 2d10h30m
B>  64.112.104.114/32 [20/0] via 172.2.34.23 (recursive), 2d10h30m
  *                            via 172.2.34.23, g684 onlink, 2d10h30m
...
```

## `show rib connected`

Displays the contents of the Routing Information Base (RIB) filtered to show only connected routes

#### Usage

```
show rib connected [rows <rows>] [force] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | The name of the router for which to display the RIB |
| rows | The number of rib entries to display at once [type: int or &#x27;all&#x27;] (default: 50) |

#### Description

The _show rib connected_ subcommand displays the contents of the 128T router&#x27;s Routing Information Base (RIB) filtered to show only the connected routes.

#### Example

```
admin@gouda.novigrad# show rib connected
Fri 2020-04-17 18:35:34 UTC
Codes: K - kernel route, C - connected, S - static, R - RIP,
       O - OSPF, I - IS-IS, B - BGP, E - EIGRP, N - NHRP,
       T - Table, v - VNC, V - VNC-Direct, A - Babel, D - SHARP,
       F - PBR,
       > - selected route, * - FIB route

C>* 96.230.191.0/24 is directly connected, g1, 6d05h38m
C>* 169.254.127.126/31 is directly connected, g4294967294, 6d05h38m
C>* 169.254.128.132/32 is directly connected, g5, 6d05h38m
C>* 172.16.0.0/24 is directly connected, g4, 6d05h38m
C>* 192.168.0.0/24 is directly connected, g2, 6d05h38m


Completed in 0.22 seconds
```

## `show rib ospf`

Displays the contents of the Routing Information Base (RIB) filtered to show only those learned from OSPF
#### Usage

```
show rib ospf [rows <rows>] [force] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | The name of the router for which to display the RIB |
| rows | The number of rib entries to display at once [type: int or &#x27;all&#x27;] (default: 50) |

#### Description

The _show rib ospf_ subcommand displays the contents of the 128T router&#x27;s Routing Information Base (RIB) filtered to show only those learned from OSPF.

#### Example

```
@combo-east.ComboEast# show rib ospf
Fri 2020-04-17 19:10:07 UTC
Codes: K - kernel route, C - connected, S - static, R - RIP,
       O - OSPF, I - IS-IS, B - BGP, E - EIGRP, N - NHRP,
       T - Table, v - VNC, V - VNC-Direct, A - Babel, D - SHARP,
       F - PBR,
       > - selected route, * - FIB route

O   172.16.1.0/24 [110/10] is directly connected, g1, 00:03:46
O>* 172.16.2.0/24 [110/20] via 172.16.3.3, g2, 00:15:15
O   172.16.3.0/24 [110/10] is directly connected, g2, 00:15:25
```

## `show rib static`

Displays the contents of the Routing Information Base (RIB) filtered to show only static routes

#### Usage

```
show rib static [rows <rows>] [force] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | The name of the router for which to display the RIB |
| rows | The number of rib entries to display at once [type: int or &#x27;all&#x27;] (default: 50) |

#### Description

The _show rib static_ subcommand displays the contents of the 128T router&#x27;s Routing Information Base (RIB) filtered to show only static routes.

#### Example

```
admin@gouda.novigrad# show rib static
Fri 2020-04-17 18:54:38 UTC
Codes: K - kernel route, C - connected, S - static, R - RIP,
       O - OSPF, I - IS-IS, B - BGP, E - EIGRP, N - NHRP,
       T - Table, v - VNC, V - VNC-Direct, A - Babel, D - SHARP,
       F - PBR,
       > - selected route, * - FIB route

S>* 1.1.1.1/32 [10/0] is directly connected, g1, 00:00:07
S>* 10.10.10.10/32 [5/0] unreachable (blackhole), 00:01:24


Completed in 0.31 seconds
```

## `show rib summary`

Displays a summary of the Routing Information Base (RIB)

#### Usage

```
show rib summary [rows <rows>] [force] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | The name of the router for which to display the RIB summary |
| rows | The number of rib entries to display at once [type: int or &#x27;all&#x27;] (default: 50) |

#### Description

The _show rib summary_ command outputs a concise table with statistics on the RIB.

#### Example

```
admin@gouda.novigrad# show rib summary
Fri 2020-04-17 18:40:02 UTC
IP Address Family
Route Source         Routes               FIB  (vrf Default-IP-Routing-Table)
kernel               9                    9
connected            5                    5
------
Totals               14                   14

IPv6 Address Family
Route Source         Routes               FIB  (vrf Default-IP-Routing-Table)
------
Totals               0                    0

Completed in 0.29 seconds
```

## `show security key-status`

Display detailed security key status.

#### Usage

```
show security key-status [force] [router <router>] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display security key status |
| router | The router for which to display security key status (default: &lt;current router&gt;) |

#### Description

The _show security key-status_ subcommand displays information and statistics related to the 128T&#x27;s security rekeying feature. It will indicate the current key index (which will be common among all routers managed by a 128T conductor) and relevant statistics on when the last rekey event occurred, when the next will occur, etc.

#### Example

```
admin@cnd1.conductor# show security key-status
Wed 2018-02-07 12:46:20 EST

=========================================
 cnd1.conductor
=========================================
 Key manager state:        active_leader
 Rekey index:              1
 Last rekey:               n/a
 Next rekey:               n/a
 Key change count:         1
 Config key change count:  0
 Key change error:         n/a
 Config key change error:  n/a

Completed in 0.17 seconds
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.2.0   | This feature was introduced |

## `show service`

Displays run-time data of each service on a router.

#### Usage

```
show service [{service-name <name> | hierarchy-service-name <name> | contains-service-name <name>}] [{detail}] router <router> node <node> [<verbosity>]
```
#### Keyword Arguments

| name | description |
| ---- | ----------- |
| contains-service-name | The partial substring match for which to display the service path |
| hierarchy-service-name | The hierarchy root for which to display the service path |
| node | The node for which to display service path |
| router | The router for which to display the service path |
| service-name | The exact service name for which to display the service path |

#### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | Display detailed information for the service |

#### Example 1 Summary
```
show service

Service         Prefixes           Transport        Access     Service-Policy   State         Sessions      Tx Bandwidth     Rx Bandwidth

Web             10.0.0.0/8         Http, Https      Red, Blue    policy1       Excellent        10            1.2Kbps         1.2Kbps
                11.0.0.0/8                                                                                                                           

Database        12.0.0.1/32        TCP/8000         Blue         policy3       Degraded         20            3.4Kbps         1.2Kbps

Internet        0.0.0.0/0          Http, Https      Green        policy2       Excellent        10            1.0Gbps         2.2Kbps

Login           10.2.2.2/32        Ssh              Red, Green   policy2       Unavailable       2            1.0kbps         4.2Kbps

SIP             10.2.3.3.0/24      SIP              Blue          None         Unavailable       0            0.0Kbps         1.52Kbps

WAP             10.2.4.0/24        UDP[1000-1500]   Global        None         Excellent         1            1.2Kbps         1.2Kbps

```
The fields are defined as follows: 

- Service: Name of Service.
- Prefixes: List of prefixes associated with the service.
- Transport: Protocol name (SIP, SSH, etc.), or raw protocol and port.
- Access: List of configured access policies.
- Sessions: Total number of sessions for this service.
- Service-Policy: Name of service-policy associated with this service.
- State: Indicates the quality of the service, whether it is excellent, degraded, or unavailable.
- Bandwidth: Bandwidth consumed by the service.


#### Example 2 Detail
```
show service service-name Web detail

Service Web

Prefix:          10.0.0.0/8, 11.0.0.0/8 
Auto-generated : Yes (Router)
Transport      : HTTP, HTTPS
Access         : Red, Blue

Service-Policy : policy1
State          : Excellent

Enabled        : Yes
NextHop Type   : SVR, Local Service-Route
Traffic Class  : HIgh, Low, Medium, Best-Effort
Service-Routes : web-route1, web-route2, peer-route2
Service-Paths  : 
   Node 1:
     Up Paths: Peer1, Peer2, Lan1
     Down Paths: Lan2
   Node 2: 
     Up Paths: Peer1, Peer2, Lan1
     Down Paths: Lan2
Sessions       : 10
Tx Bandwidth   : 1.2Kbps
Rx Bandwidth   : 1.2Kbps
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 5.1.0   | Detail fields added: Enabled, NextHop Type, Traffic Class, Service Routes |

## `show service-path`

Displays service path information at the specified node.

#### Usage

```
show service-path [{service-name <name> | hierarchy-service-name <name> | contains-service-name <name>}] [{rows <rows> | detail}] router <router> node <node>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| contains-service-name | The partial substring match for which to display the service path |
| detail | Display detail info of service path |
| hierarchy-service-name | The hierarchy root for which to display the service path |
| node | The node for which to display service path |
| router | The router for which to display the service path |
| rows | The number of service paths to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| service-name | The exact service name for which to display the service path |

#### Description

The `show service-path` command displays active service paths passing through the 128T router. This simplifies troubleshooting, allowing you to determine where sessions belonging to a particular service would egress. Multiple service filters allow you to target a specific service or services. Output can be displayed as a summary or in a detail view with pagination support. When using the `detail` argument, in-path metrics are managed by the performance monitor when enabled. If the performance monitor is not enabled, the local metrics generated by BFD are used. 

#### Example 1 Summary
```
show service-path

Service    Service-route     Type              Destination  Next-Hop  Interface  Vector  Cost  Rate  Capacity        State

Web        web-route1        service-agent     4.4.4.4      1.1.1.2     lan        red     10    1    200/3000       Up*
Web        web-route1        service-agent     4.4.4.4      1.1.1.3     lan        red     10    1    200/3000       Up
Web        web-route2        service-agent     5.5.5.5      2.2.2.2     lan       blue     20    2    50/unlimited   Down
Login      <None>            BgpOverSVR        10.1.1.1     1.2.3.4     wan        red     10    3        -          Up
Login      <None>            BgpOverSVR        11.1.1.1     1.2.3.4     wan        red     10    1        -          Up
App1       <None>            Routed                -           -         -          -      -     -        -          -
App1       learned-routed    Routed                -           -         -          -      -     -        -          -


```
#### Example 2 Detail
```
show service-path service-name web detail
==============
 Service: web
==============
  Service-Route:    web-route1
  Type:                    service-agent
  Destination:         4.4.4.4
  Next-Hop:            1.1.1.2, Lan(Up)
  Peer:                    unavailable
  Path-Metrics:
     High
         TCP:  latency [5ms] loss [3] jitter [2ms]
         TLS:  latency [3ms] loss [3] jitter [2ms]
         UDP:  latency [4ms] loss [2] jitter [0ms]
         ICMP: latency [3ms] loss [2] jitter [0ms]
     Medium
         TCP:  latency [200ms] loss [200] jitter [200ms] (Exceeds maximum latency of 100ms)
         TLS:  latency [100ms] loss [100] jitter [100ms]
         UDP:  latency [100ms] loss [100] jitter [100ms]
         ICMP: latency [100ms] loss [100] jitter [100ms]
     Low
         TCP:  latency [0ms] loss [0] jitter [0ms]
         TLS:  latency [0ms] loss [0] jitter [0ms]
         UDP:  latency [0ms] loss [0] jitter [0ms]
         ICMP: latency [0ms] loss [0] jitter [0ms]
     Best-Effort
         TCP:  latency [0ms] loss [0] jitter [0ms]
         TLS:  latency [0ms] loss [0] jitter [0ms]
         UDP:  latency [0ms] loss [0] jitter [0ms]
         ICMP: latency [0ms] loss [0] jitter [0ms]
  Vector:                   Red
  Cost:                     10
  Rate:                     1
  Capacity:               200/3000
  Index:                    17
 
  Service-Route:    web-route1
  Type:                    service-agent
  Destination:         4.4.4.4
  Next-Hop:            1.1.1.3, Lan(Down)[Gateway Arp unresolved)
  Peer:                    unavailable
  Path-Metrics:
     High
         TCP:  latency [0ms] loss [0] jitter [0ms]
         TLS:  latency [0ms] loss [0] jitter [0ms]
         UDP:  latency [0ms] loss [0] jitter [0ms]
         ICMP: latency [0ms] loss [0] jitter [0ms]
     Medium
         TCP:  latency [0ms] loss [0] jitter [0ms]
         TLS:  latency [0ms] loss [0] jitter [0ms]
         UDP:  latency [0ms] loss [0] jitter [0ms]
         ICMP: latency [0ms] loss [0] jitter [0ms]
     Low
         TCP:  latency [0ms] loss [0] jitter [0ms]
         TLS:  latency [0ms] loss [0] jitter [0ms]
         UDP:  latency [0ms] loss [0] jitter [0ms]
         ICMP: latency [0ms] loss [0] jitter [0ms]
     Best-Effort
         TCP:  latency [0ms] loss [0] jitter [0ms]
         TLS:  latency [0ms] loss [0] jitter [0ms]
         UDP:  latency [0ms] loss [0] jitter [0ms]
         ICMP: latency [0ms] loss [0] jitter [0ms]
  Vector:                   Red
  Cost:                      10
  Rate:                      1
  Capacity:               200/3000
  Index:                    18
 
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 5.1.0   | Detail fields added: Next-hop, Peer, Path-Metrics, Index |

## `show session-captures`

Show active session-captures.

#### Usage

```
show session-captures [{id <id> | detail}] [service <service>] [force] [router <router>] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| detail | Display session-captures in detail |
| force | Skip confirmation prompt. Only required when targeting all routers |
| id | The session-capture to show in detail [type: int] |
| node | The node on which to show session-captures |
| router | The router on which to show session-captures (default: all) |
| service | Service for which to show session-captures (default: all) |

##### See Also

| command | description |
| ------- | ----------- |
| [`create session-capture`](#create-session-capture) | Creates a session capture at the specified node and service. |
| [`delete session-capture`](#delete-session-capture) | Deletes session capture from selected service. |
| [`delete session-capture by-id`](#delete-session-capture-by-id) | Deletes session-capture by capture-id from selected service. |

## `show sessions`

Displays active sessions passing through the 128T router.

#### Usage

```
show sessions [{service-name <name> | hierarchy-service-name <name> | contains-service-name <name>}] [rows <rows>] [force] [by-id] [node <node>] router <router> 
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| contains-service-name | The partial substring match to show sessions for |
| force | Skip confirmation prompt. Only required when targeting all routers |
| hierarchy-service-name | The hierarchy root to show sessions for |
| node | The node from which to retrieve session flows |
| router | The router from which to retrieve session flows |
| rows | The number of session flows to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| service-name | The exact service name to show sessions for |

##### Subcommands

| name | description |
| ---- | ----------- |
| by-id| &lt;session-id&gt; |
| top | &lt;bandwidth&gt; |

#### Description

The _show sessions_ command displays active sessions passing through the 128T router. The output from the command shows the sessions internal ID (useful for searching through log files), the service, tenant, and source/destination IP information for each active session. Additionally, you can specify the node using the optional _node-name_ argument, and the session-id using the _by-id_ subcommand. 

The NAT IP and Port fields will be populated whenever a session is subject to source NAT (see _source-nat_ later in this reference guide for more information). It also shows the timeout value that will cause the session to expire if it remains idle for that number of seconds.

Various services and tenants may display with surrounding braces to indicate that these are internally-generated services and tenants. These internal services and tenants are created when peering between adjacent nodes, establishing BGP sessions, BFD sessions, etc.

:::info
The contents of the table will vary based upon the software version in use. This applies when, for example, a conductor running a new software version requests session table data from routers running older software versions.
:::

#### Examples
`show sessions`
```
admin@gouda.novigrad# show sessions
Fri 2020-04-17 16:55:34 UTC

Node: gouda

====================================== ===== ============= =========== ========== ====== ======= ================= ========== ================= =========== ================= ========== =================== ========= =================
 Session Id                             Dir   Service       Tenant      Dev Name   VLAN   Proto   Src IP            Src Port   Dest IP           Dest Port   NAT IP            NAT Port   Payload Encrypted   Timeout   Uptime
====================================== ===== ============= =========== ========== ====== ======= ================= ========== ================= =========== ================= ========== =================== ========= =================
 01187fb8-765a-45e5-ae90-37d77f15e292   fwd   Internet      lanSubnet   lan           0   udp     192.168.0.28         44674   35.166.173.18          9930   96.230.191.130       19569   false                   154   0 days  0:00:28
 01187fb8-765a-45e5-ae90-37d77f15e292   rev   Internet      lanSubnet   wan           0   udp     35.166.173.18         9930   96.230.191.130        19569   0.0.0.0                  0   false                   154   0 days  0:00:28
 0859a4ae-bcff-4aa6-b812-79a5236a6c13   fwd   Internet      lanSubnet   lan           0   tcp     192.168.0.41         60843   17.249.171.246          443   96.230.191.130       51941   false                     2   0 days  0:00:10
 0859a4ae-bcff-4aa6-b812-79a5236a6c13   rev   Internet      lanSubnet   wan           0   tcp     17.249.171.246         443   96.230.191.130        51941   0.0.0.0                  0   false                     2   0 days  0:00:10
 146ebae5-822b-49e3-a0bf-b5329181b9d5   fwd   Internet      lanSubnet   lan           0   tcp     192.168.0.41         60838   17.248.185.112          443   96.230.191.130       53054   false                  1879   0 days  0:00:24
 146ebae5-822b-49e3-a0bf-b5329181b9d5   rev   Internet      lanSubnet   wan           0   tcp     17.248.185.112         443   96.230.191.130        53054   0.0.0.0                  0   false                  1879   0 days  0:00:24
 1ee1761c-a193-413c-889f-41fd61fe5242   fwd   Internet      lanSubnet   lan           0   udp     192.168.0.72         55723   208.67.222.222          443   96.230.191.130       22918   false                  1891   0 days  0:00:11
 1ee1761c-a193-413c-889f-41fd61fe5242   rev   Internet      lanSubnet   wan           0   udp     208.67.222.222         443   96.230.191.130        22918   0.0.0.0                  0   false                  1891   0 days  0:00:11
```
`show sessions by-id`
```
admin@node1.seattle-site-01# show sessions by-id cea963be-be0b-4a9a-9368-7956b3975687                                                                                                                                                                          
Thu 2020-11-12 18:49:01 UTC
✔ Retrieving session information...
============================================================================================================================================================================================================
 seattle-site-01.node1    Session ID: cea963be-be0b-4a9a-9368-7956b3975687
============================================================================================================================================================================================================
 Service name:                      internet
 Session source:                     SourceType: PUBLIC
 Session type:                      HTTPS
 Service class:                     Bronze
 Source tenant:                     seattle-reid.field-eng.corp
 Peer name:                         N/A
 Inter node:                        N/A
 Inter router:                      N/A
 Ingress source nat:                N/A
 Payload security policy:           encrypt-hmac-disabled
 Common name info:                  N/A
 Session keys:
     Forward session key:           [discriminator 42949672960, tenant seattle-reid.field-eng.corp, peer <unknownPeer>, src ip 172.25.128.59, dest ip 23.45.228.49, src port 38562, dest port 443, proto 6]
     Reverse session key:           [discriminator 42949672960, tenant seattle-reid.field-eng.corp, peer <unknownPeer>, src ip 23.45.228.49, dest ip 96.93.108.35, src port 443, dest port 61291, proto 6]
 State info:
     Session state:                 ESTABLISHED
     Redundancy state:              SYNCED
 Time info:
     Start time:                    0 days  0:02:00
     Ttl duration for database:     1900
 Forward flows:
     Key:                           [src ip 172.25.128.59, dest ip 23.45.228.49, src l4 port 38562, dest l4 port 443, proto 6, vlan 6, device port 3]
     Direction:                     forward
     Tcp state:                     Established
     Packets received:              30
     Packets sent:                  30
     Decrypt security policy:       <empty>
     Action list:                    DpiIngress TtlValidateIpv4 TcpStateMachine IpHeaderTransform EthernetHeaderTransform AppForward
     Time to live:                  1781
     Path index:                    0
     Attributes:
         Path key:                  NextHop : 1-1.0=96.93.108.38, destination Ip <empty>/128
         Arp status:                Valid
         Waypoint key:              <empty>
         Source nat key:            dynamic source nat; address 96.93.108.35; port 61291; protocol tcp (6)
         Metadata security policy:  <empty>
 Reverse flows:
     Key:                           [src ip 23.45.228.49, dest ip 96.93.108.35, src l4 port 443, dest l4 port 61291, proto 6, vlan 0, device port 1]
     Direction:                     reverse
     Tcp state:                     Established
     Packets received:              31
     Packets sent:                  31
     Decrypt security policy:       <empty>
     Action list:                    TtlValidateIpv4 TcpStateMachine DpiEgress IpHeaderTransform EthernetHeaderTransform AppForward
     Time to live:                  1781
     Path index:                    0
     Attributes:
         Path key:                  NextHop : 1-3.6=172.25.128.59, destination Ip 172.25.128.59/32
         Arp status:                Valid
         Waypoint key:              <empty>
         Source nat key:            <empty>
         Metadata security policy:  <empty>
```
#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 3.0.0   | Added _node_ keyword to enforce PCLI consistency |
| 3.1.0   | Was _show flows_ - Substantially reformatted output |
| 4.5.3   | Added _by-id_ subcommand |

## `show sessions top bandwidth`

Display the top sessions ordered by bandwidth.

#### Usage

```
show sessions top bandwidth [force] router <router> [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | The router for which to display top sessions by bandwidth |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

#### Description

The _top bandwidth_ subcommand will list, in order, the top ten highest consumers of bandwidth among all active sessions. This is useful to understand the current utilization on your 128T network resources.

#### Example

```
admin@gouda.novigrad# show sessions top bandwidth
Fri 2020-04-17 16:59:01 UTC

Node: gouda

============= ==================== ==================== ========== ========== ===================
   Bandwidth   Source               Destination          Protocol   Service    Tenant
============= ==================== ==================== ========== ========== ===================
 695.50 kbps   192.168.0.32:59066   3.21.226.121:8801    udp        Internet   MikeMBP.lanSubnet
 343.72 kbps   192.168.0.72:61321   52.207.7.190:443     tcp        Internet   lanSubnet
 151.55 kbps   192.168.0.32:51109   3.21.226.121:8801    udp        Internet   MikeMBP.lanSubnet
 130.15 kbps   192.168.0.72:61320   54.174.137.247:443   tcp        Internet   lanSubnet
   8.42 kbps   192.168.0.32:51417   3.21.226.121:8801    udp        Internet   MikeMBP.lanSubnet
   7.74 kbps   192.168.0.72:51018   208.67.222.222:443   udp        Internet   lanSubnet
   6.72 kbps   192.168.0.72:51015   208.67.222.222:443   udp        Internet   lanSubnet
   6.49 kbps   192.168.0.32:55306   35.174.127.31:443    tcp        Internet   MikeMBP.lanSubnet
   5.94 kbps   192.168.0.32:56504   3.21.226.121:443     tcp        Internet   MikeMBP.lanSubnet
   3.27 kbps   192.168.0.68:64345   17.167.192.225:443   tcp        Internet   lanSubnet

Completed in 0.10 seconds
```


## `show step lsdb`

Show STEP link state database

#### Usage

```
show step lsdb [originator <originator-name>] [force] router <router> [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| originator | The STEP originating router |
| router | The router to request STEP information from |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

## `show step routes`

Show STEP routes

#### Usage

```
show step routes [node <node-name>] [service <service-name>] [ip-prefix <prefix>] [force] router <router> [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| ip-prefix | STEP routes for this ip prefix [type: IP prefix] |
| node | STEP routes on this node |
| router | The router to request STEP information from |
| service | STEP routes for this service |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

## `show system`

Display detailed system state.

#### Usage

```
show system [force] [router <router>] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display system state |
| router | The router for which to display system state (default: &lt;current router&gt;) |

##### Subcommands

| name | description |
| ---- | ----------- |
| connectivity | Display inter-node connection statuses. |
| services | Display a table summarizing statuses of 128T systemd services. |
| processes | Display a table summarizing the statuses of processes. |
| registry | Shows registered services from the system services coordinator for the specified process, node or router. |
| version | Show system version information. |

##### See Also

| command | description |
| ------- | ----------- |
| [`show alarms`](#show-alarms) | Display currently active or shelved alarms |

#### Description

The _show system_ subcommand displays overall system health for the nodes that comprise your 128T router. It includes the state of the node (&quot;starting&quot; is displayed when the node is in the process of starting up and is not yet ready for handling traffic, &quot;running&quot; means the node is active, &quot;offline&quot; means the node is configured but not currently present), its role, software version, and uptime.

#### Example

```
admin@labsystem1.fiedler# show system
Mon 2017-02-27 15:11:06 EST

===============================
 labsystem1
===============================
 Status:       running
 Version:      4.3.2
 Uptime:       4 days  6:17:31
 Role:         combo
 Alarm Count:  0

Completed in 0.22 seconds
```

## `show system connectivity`

Display inter-node connection statuses.

#### Usage

```
show system connectivity [force] [router <router>] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display connection statuses |
| router | The router for which to display connection statuses (default: &lt;current router&gt;) |

##### Subcommands

| name | description |
| ---- | ----------- |
| internal | Displays inter-node secure communication connections. |

#### Description

The _connectivity_ subcommand displays the state of all connected systems. On a 128T Conductor, this is a convenient way to display all of the nodes that are connected, disconnected, or &quot;unconfigured&quot;. (Note: when a node appears as _unconfigured_, it means that it is attempting to connect to the 128T conductor, but that conductor does not have any supporting configuration to supply to it.)

#### Example

```
admin@cnd1.conductor# show system connectivity
Fri 2018-02-09 09:30:48 EST

================ ================ ==============
 Local Node       Remote Node      State
================ ================ ==============
 cnd1.conductor   b1.branch1       disconnected
 cnd1.conductor   dc1.datacenter   disconnected
 cnd1.conductor   dc2.datacenter   disconnected

Completed in 0.20 seconds
```

## `show system connectivity internal`

Displays inter-node secure communication connections.

#### Usage

```
show system connectivity internal [force] [router <router>] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display internal connections |
| router | The router for which to display internal connections (default: &lt;current router&gt;) |

#### Description

The _internal_ subcommand of _show system connectivity internal_ will report all interprocess connections that are currently available on the system, as well as connections between a router and conductor (if applicable).

#### Example

```
admin@cnd1.conductor# show system connectivity internal
Fri 2018-02-09 09:31:38 EST

================ ================ ================= ================= ===========
 Local Node       Remote Node      Service           Address           Message
================ ================ ================= ================= ===========
 cnd1.conductor   cnd1.conductor   Zookeeper         127.0.0.1:4370    Connected
 cnd1.conductor   cnd1.conductor   db-store          127.0.0.2:9042    Connected
 cnd1.conductor   cnd1.conductor   ssc               127.0.0.2:12222   Connected
 cnd1.conductor   cnd1.conductor   step-repository   127.0.0.2:15555   Connected

Completed in 0.27 seconds
```

## `show system processes`

Display a table summarizing the statuses of processes.

#### Usage

```
show system processes [force] [router <router>] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display statuses of processes |
| router | The router for which to display statuses of processes (default: &lt;current router&gt;) |

##### See Also

| command | description |
| ------- | ----------- |
| [`show stats process`](#show-stats-process) | Metrics about 128T processes |

#### Description

The _processes_ subcommand will list the processes for all nodes in the cluster, and which processes on which nodes are considered _leaders_ (from a high availability standpoint).

#### Example

```
admin@tp-cond-primary.tp-cond# show system processes router tp-colo
Wed 2020-04-15 20:35:32 UTC

=========================== ============================= ========= ========= =======
 Node                        Process                       Status    Primary   Role
=========================== ============================= ========= ========= =======
 tp-colo-primary.tp-colo     accessManager                 running             combo
 tp-colo-primary.tp-colo     analyticsReporter             running             combo
 tp-colo-primary.tp-colo     applicationFrameworkManager   running             combo
 tp-colo-primary.tp-colo     conflux                       running             combo
 tp-colo-primary.tp-colo     databaseQueryCoordinator      running             combo
 tp-colo-primary.tp-colo     dnsManager                    running   Y         combo
 tp-colo-primary.tp-colo     dynamicPeerUpdateManager      running   Y         combo
 tp-colo-primary.tp-colo     highway                       running             combo
 tp-colo-primary.tp-colo     nodeMonitor                   running             combo
 tp-colo-primary.tp-colo     persistentDataManager         running             combo
 tp-colo-primary.tp-colo     redisServerManager            running   Y         combo
 tp-colo-primary.tp-colo     routingManager                running   Y         combo
 tp-colo-primary.tp-colo     secureCommunicationManager    running             combo
 tp-colo-primary.tp-colo     securityKeyManager            running   Y         combo
 tp-colo-primary.tp-colo     snmpTrapAgent                 running             combo
 tp-colo-primary.tp-colo     stateMonitor                  running             combo
 tp-colo-primary.tp-colo     systemServicesCoordinator     running             combo
 tp-colo-secondary.tp-colo   accessManager                 running             combo
 tp-colo-secondary.tp-colo   analyticsReporter             running             combo
 tp-colo-secondary.tp-colo   applicationFrameworkManager   running             combo
 tp-colo-secondary.tp-colo   conflux                       running             combo
 tp-colo-secondary.tp-colo   databaseQueryCoordinator      running             combo
 tp-colo-secondary.tp-colo   dnsManager                    running   N         combo
 tp-colo-secondary.tp-colo   dynamicPeerUpdateManager      running   N         combo
 tp-colo-secondary.tp-colo   highway                       running             combo
 tp-colo-secondary.tp-colo   nodeMonitor                   running             combo
 tp-colo-secondary.tp-colo   persistentDataManager         running             combo
 tp-colo-secondary.tp-colo   redisServerManager            running   N         combo
 tp-colo-secondary.tp-colo   routingManager                running   N         combo
 tp-colo-secondary.tp-colo   secureCommunicationManager    running             combo
 tp-colo-secondary.tp-colo   securityKeyManager            running   N         combo
 tp-colo-secondary.tp-colo   snmpTrapAgent                 running             combo
 tp-colo-secondary.tp-colo   stateMonitor                  running             combo
 tp-colo-secondary.tp-colo   systemServicesCoordinator     running             combo

Completed in 0.23 seconds
```

## `show system registry`

Shows registered services from the system services coordinator for the specified process, node or router.

#### Usage

```
show system registry [<router-name>] [<node-name>] [<process-name>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| router-name | The router from which to retrieve registered services (default: all) |
| node-name | The node from which to retrieve registered services (default: all) |
| process-name | The process from which to retrieve registered services (default: all) |

##### See Also

| command | description |
| ------- | ----------- |
| [`show stats registered-services`](#show-stats-registered-services) | Stats pertaining to Registered Services |
| [`show stats ssc`](#show-stats-ssc) | Metrics pertaining to the SSC |

#### Description

The _registry_ subcommand shows the processes/services that have registered with the local system&#x27;s &quot;SSC&quot; (system services coordinator). On a 128T Conductor, this will show all of the connected routers_ registered system processes/services.

#### Example

```
admin@tp-cond-primary.tp-cond# show system registry
Wed 2020-04-15 20:39:35 UTC

=========== ===================== ============================ ===============================
 Router      Node                  Process                      Registered Service
=========== ===================== ============================ ===============================
 burl-corp   burl-corp-primary     all                          ALL
 burl-corp   burl-corp-secondary   all                          ALL
 tp-colo     tp-colo-primary       all                          ALL
 tp-colo     tp-colo-secondary     all                          ALL
 tp-cond     tp-cond-primary       accessManager                LOG
 tp-cond     tp-cond-secondary     accessManager                LOG
 tp-cond     tp-cond-primary       analyticsReporter            LOG
 tp-cond     tp-cond-secondary     analyticsReporter            LOG
 tp-cond     tp-cond-primary       automatedProvisioner         ASSET_STATE_SYNC
 tp-cond     tp-cond-primary       automatedProvisioner         ASSET_MAINTENANCE
 tp-cond     tp-cond-primary       automatedProvisioner         LOG
 tp-cond     tp-cond-secondary     automatedProvisioner         ASSET_MAINTENANCE
 tp-cond     tp-cond-secondary     automatedProvisioner         LOG
 tp-cond     tp-cond-secondary     automatedProvisioner         AUTOMATED_PROVISIONING
 tp-cond     tp-cond-primary       conflux                      LOG
 tp-cond     tp-cond-secondary     conflux                      LOG
 tp-cond     tp-cond-primary       databaseQueryCoordinator     STATS
 tp-cond     tp-cond-primary       databaseQueryCoordinator     AUDIT
 tp-cond     tp-cond-primary       databaseQueryCoordinator     ENTITLEMENT
 tp-cond     tp-cond-primary       databaseQueryCoordinator     ANALYTICS
 tp-cond     tp-cond-primary       databaseQueryCoordinator     LOG
 tp-cond     tp-cond-secondary     databaseQueryCoordinator     ANALYTICS
 tp-cond     tp-cond-secondary     databaseQueryCoordinator     ENTITLEMENT
 tp-cond     tp-cond-secondary     databaseQueryCoordinator     STATS
 tp-cond     tp-cond-secondary     databaseQueryCoordinator     LOG
 tp-cond     tp-cond-secondary     databaseQueryCoordinator     AUDIT
 tp-cond     tp-cond-primary       dnsManager                   DNS_RESOLUTION
 tp-cond     tp-cond-primary       dnsManager                   LOG
 tp-cond     tp-cond-secondary     dnsManager                   LOG
 tp-cond     tp-cond-secondary     dnsManager                   DNS_RESOLUTION
 tp-cond     tp-cond-primary       dynamicPeerUpdateManager     LOG
 tp-cond     tp-cond-secondary     dynamicPeerUpdateManager     CONDUCTOR_SHOW_DYNAMIC_PEER
 tp-cond     tp-cond-secondary     dynamicPeerUpdateManager     CONDUCTOR_DYNAMIC_PEER_UPDATE
 tp-cond     tp-cond-secondary     dynamicPeerUpdateManager     LOG
 tp-cond     tp-cond-primary       nodeMonitor                  GET_PCI_ADDRESSES
 tp-cond     tp-cond-primary       nodeMonitor                  NODE_INFO
 tp-cond     tp-cond-primary       nodeMonitor                  LDAP_INFO
 ...
```

## `show system services`

Display a table summarizing statuses of 128T systemd services.

#### Usage

```
show system services [force] [router <router>] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display statuses |
| router | The router for which to display statuses (default: &lt;current router&gt;) |

#### Description

Most 128T processes are under the control of a process aptly named the _processManager_. Some services must exist outside of the control of the _processManager_ and are instead goverened by Linux&#x27;s systemd. `show system services` displays a table summarizing statuses of 128T systemd services.

#### Example

```
admin@tp-cond-primary.tp-cond# show system services
Wed 2020-04-15 20:41:18 UTC

========================= ============================== ==============
 Node                      Service                        Active State
========================= ============================== ==============
 tp-cond-primary.tp-cond   128T-plugin-adapter.service    active
 tp-cond-primary.tp-cond   128TWeb.service                active
 tp-cond-primary.tp-cond   128TWebAuth.service            active
 tp-cond-primary.tp-cond   auditd.service                 active
 tp-cond-primary.tp-cond   mars.service                   active
 tp-cond-primary.tp-cond   prank.service                  active
 tp-cond-primary.tp-cond   t128-process-metrics.service   active
 tp-cond-primary.tp-cond   tank.service                   active

Completed in 0.11 seconds
```

## `show system version`

Show system version information.

#### Usage

```
show system version [force] [router <router>] [node <node>] [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node to show version information for |
| router | The router to show version information for (default: &lt;current router&gt;) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

#### Description

The _version_ argument displays more detailed information about the software build (number, date) that is running on your system.

#### Example

```
admin@gouda.novigrad# show system version detail
Wed 2020-04-15 20:49:21 UTC

==============================================================
 Node: gouda.novigrad
==============================================================
  Version:           4.3.2
  Build Date:        2020-04-09T18:00:17Z
  Build Machine:     releasehost1.openstacklocal
  Build User:        jenkins
  Build Directory:   /i95code
  Hash:              137944e030d9fdc2f7d6c037a32722e540ced67d
  Package:           128T-4.3.2-1.el7

Completed in 0.06 seconds
```

## `show tenant members`

Shows the prefix-to-tenant associations by network-interface on the specified node.

#### Usage

```
show tenant members [rows <rows>] [force] [node <node>] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node from which to retrieve tenant members |
| router | The router from which to retrieve tenant members |
| rows | The number of tenant members to display at once [type: int or &#x27;all&#x27;] (default: 50) |

#### Description

The _show tenant_ subcommand displays the mapping logic that the 128T router uses for associating the _source IP address_ of inbound requests to tenant definitions – whether they be interface-based (i.e., a tenant has been configured on a network-interface) or member based (i.e., a prefix has been configured within a neighborhood).

#### Example

```
admin@gouda.novigrad# show tenant members
Wed 2020-04-15 19:10:00 UTC

Node: gouda

============ ========= =================== ================ =================== ==================== =============
 Device I/F   VLAN ID   Network I/F         Network I/F IP   Source IP Prefix    Tenant               Source Type
============ ========= =================== ================ =================== ==================== =============
 lan                0   lan-interface       192.168.0.2      192.168.0.0/24      lanSubnet            PUBLIC
 lan                0   lan-interface       192.168.0.2      192.168.0.32/32     MBP.lanSubnet        PUBLIC
 lan             3000   lan-untrusted       172.16.0.1       0.0.0.0/0           untrustedLanSubnet   PUBLIC
 wan                0   wan-interface       96.230.191.130   35.156.0.0/14       blocklist            PUBLIC
 wan                0   wan-interface       96.230.191.130   217.0.0.0/8         blocklist            PUBLIC
 wan                0   wan-interface       96.230.191.130   218.0.0.0/8         blocklist            PUBLIC
 dh00000001         0   dhcp-server-gen-2   169.254.128.132  0.0.0.0/0           <global>             PUBLIC
 kni254             0   controlKniIf        169.254.127.126  0.0.0.0/0           _internal_           PUBLIC
 wan                0   wan-interface       96.230.191.130   220.0.0.0/8         blocklist            PUBLIC
 wan                0   wan-interface       96.230.191.130   222.0.0.0/8         blocklist            PUBLIC

Completed in 9.01 seconds
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.2.0   | This feature was introduced |

## `show top sources`

Shows top sources (by source address) over the last 30 minutes at the specified node.

#### Usage

```
show top sources [by <by>] [rows <rows>] [force] [node <node>] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| by | total-data \| session-count [type: metric] (default: total-data) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node from which to retrieve top sources |
| router | The router from which to retrieve top sources |
| rows | The number of top sources to display at once [type: int or &#x27;all&#x27;] (default: 10) |

#### Description

The _show top sources_ command will render a table displaying the highest consumers (by source address) of data or rote number of sessions.

#### Example

```
admin@gouda.novigrad# show top sources
Wed 2020-04-15 18:48:19 UTC
Results from last 30 minutes

Node: gouda

============== =================== ============== =============== ===================
 Source IP      Tenant              Total Data ▾   Session Count   Current Bandwidth
============== =================== ============== =============== ===================
 192.168.0.23   lanSubnet                2.10 GB              62               0 bps
 192.168.0.25   lanSubnet                1.36 GB             238           3.44 Mbps
 192.168.0.32   MBP.lanSubnet          157.78 MB            1337          46.81 kbps
 192.168.0.53   lanSubnet               44.98 MB             856               0 bps
 192.168.0.72   lanSubnet               36.87 MB              91           9.60 kbps
 192.168.0.41   lanSubnet               32.19 MB             325               0 bps
 192.168.0.78   lanSubnet                5.83 MB              52             216 bps
 192.168.0.68   lanSubnet                3.80 MB             212               0 bps
 192.168.0.3    lanSubnet                2.34 MB             398          21.41 kbps
 192.168.0.5    lanSubnet                1.21 MB             150               0 bps

Completed in 0.07 seconds
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.2.0   | This feature was introduced |


## `show udp-transform`

Display the status of UDP transform between peers.

#### Usage

```
show udp-transform [force] [node <node>] router <router>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display transform status |
| router | The router for which to display transform status |

#### Description

A 128T router may need to transform TCP packets into UDP packets to enable SVR to traverse stateful firewalls. By default, the 128T router runs a [firewall detector](concepts_machine_communication.md#firewall-detector) process over peer paths, and will dynamically enable UDP transform when necessary. (Administrators may also elect to enable UDP transform if they know there are stateful firewalls in the path.) This command shows whether a path has UDP transform enabled, and if so, which firewall detection tests triggered the feature to be enabled.

#### Example

```
admin@labsystem1.fiedler# show udp-transform router newton
============= ============ ============ ========== =========================================
 Router Name   Node Name    Peer         Status     Reason(s)
============= ============ ============ ========== =========================================
 newton        labsystem2   becket       enabled    TCP SYN; Mid-flow; TCP SYN Jumbo;
                            becket       enabled    TCP SYN; TCP SYN Jumbo;
                            burlington   enabled    TCP SYN; Mid-flow; TCP SYN Jumbo;
```

## `show user`

Display information for user accounts.

#### Usage

```
show user [<username>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| username | the name of the account to display (default: &lt;current user&gt;) |

##### See Also

| command | description |
| ------- | ----------- |
| [`create user`](#create-user) | Create a new user account interactively. |
| [`delete user`](#delete-user) | Delete a user account |
| [`edit prompt`](#edit-prompt) | Allows the user to specify a custom format for the PCLI prompt. |
| [`edit user`](#edit-user) | Modify an existing user account |
| [`restore prompt`](#restore-prompt) | Restore the PCLI prompt to the factory default. |
| [`restore users factory-default`](#restore-users-factory-default) | Restore the user configuration to factory defaults. |
| [`set password`](#set-password) | Change your password. |

#### Description

The _show user_ subcommand displays the attributes for the specified user account (i.e., whether the account is enabled, the user&#x27;s full name, and their role).

#### Example

```
admin@labsystem1.fiedler# show user jdeveloper

=============================
 Information for jdeveloper:
=============================
 Enabled: true
 Full Name: Joe Developer
 Role: admin

admin@labsystem1.fiedler#
```
If the 128T is configured to obtain user accounts from LDAP, the connectivity status of the LDAP server is displayed at the end of the output.
```
admin@labsystem1.fiedler# show user all

============== ====================== ======= =============== =========
 Username       Full Name              Roles   Features        Enabled
============== ====================== ======= =============== =========
 admin                                 admin   configure       true
 user           user                   user    show-commands   true
 jdeveloper     Joe Developer          admin   configure       true


LDAP server is configured and online
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |
| 4.4.0   | LDAP status was added to `show user all` |

## `show vrf`

Displays details about all configured VRF's. 

#### Usage
```
show vrf <vrf-name>
```
#### Description 

Provides details about all configured VRF’s including the tenants, network-interfaces, and routing-interfaces in each VRF. Use to verify whether the configuration was specified correctly and resulted in the desired VRF state.

#### Example

```
show vrf
Wed 2020-12-09 19:56:31 UTC

Retrieving from 'ComboEast'...

======= ========= ==================== ====================
 Name    Tenants   Routing Interfaces   Network Interfaces
======= ========= ==================== ====================
 chips   chips     lo0-chips            combo-east 12-173
 salsa   salsa     lo0-salsa
 tacos   tacos                          combo-east 10-174

Completed in 0.03 seconds
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 5.1.0   | This feature was introduced |

## `sync peer addresses`

Synchronize dynamic addresses (DHCP and PPPoE) between routers and a conductor.

#### Usage

```
sync peer addresses [force] [router <router>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| router | The name of the router to synchronize (default: &lt;current router&gt;) |

##### See Also

| command | description |
| ------- | ----------- |
| [`show dynamic-peer-update`](#show-dynamic-peer-update) | Display view of dynamic peer update on the conductor. |
| [`show stats dynamic-peer-update`](#show-stats-dynamic-peer-update) | Stats pertaining to dynamic peer update processes |

#### Description

This command will force a network element (or group of network elements) to synchronize any dynamically-learned IP addresses to its conductor. (The conductor will redistribute these dynamic addresses to other members of the Authority as necessary.)

#### Example

```
admin@cnd1.conductor# sync peer addresses
Fri 2018-02-09 09:46:44 EST
Successfully synchronized dynamic peer addresses

Completed in 0.06 seconds
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.2.0   | This feature was introduced |

## `time`

Force another command to display its execution time.

#### Usage

```
time <command> [<command> ...]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| command | Command to run and time |

#### Description

When `time` preceeds another command, it will provide the total amount of wall clock time it takes for the operation to complete. Natively not all PCLI commands output the duration it takes to complete the operation. The time command, much like the Linux version, provides this information.

#### Example

```
Are you sure you want to commit the candidate config? [y/N]: y
✔ Validating, then committing...
Configuration committed

admin@gouda.novigrad# time commit
Wed 2020-04-15 15:50:26 UTC
Are you sure you want to commit the candidate config? [y/N]: y
✔ Validating, then committing...
Configuration committed
Completed in 4.86 seconds
```

## top

#### Usage

```
top
```

#### Description
This command sets the focus of the PCLI prompt to the top level of the PCLI&#39;s hierarchy. It is used while in configuration mode to "jump" up out and back to the baseline prompt. It is only available within configuration mode.

#### Example

```
admin@labsystem1.fiedler# config authority router burlington
admin@labsystem1.fiedler (router[name=burlington])# node combo1
admin@labsystem1.fiedler (node[name=combo1])# where
config authority router burlington node combo1
admin@labsystem1.fiedler (node[name=combo1])# top
admin@labsystem1.fiedler# where
admin@labsystem1.fiedler#
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## up

#### Usage

```
up [<levels>]
```

#### Description

This command moves the administrative focus of the PCLI "up" the specified number of levels. When the optional &lt;levels&gt; argument is left off, it moves the focus up one level.

:::note
This command is only available while in configuration mode.
:::

#### Example

```
admin@labsystem1.fiedler# config authority router burlington
admin@labsystem1.fiedler (router[name=burlington])# node combo1
admin@labsystem1.fiedler (node[name=combo1])# device-interface 11
admin@labsystem1.fiedler (device-interface[id=11])# network-interface ext11
admin@labsystem1.fiedler (network-interface[name=ext11])# where
config authority router burlington node combo1 device-interface 11
network-interface ext11
admin@labsystem1.fiedler (network-interface[name=ext11])# up
admin@labsystem1.fiedler (device-interface[id=11])# where
config authority router burlington node combo1 device-interface 11
admin@labsystem1.fiedler (device-interface[id=11])# up 3
admin@labsystem1.fiedler (authority)# where
config authority

admin@labsystem1.fiedler (authority)#
```

#### Privileges Required
Available to _admin_ and _user_.

#### Version History
| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## `validate`

Validate the candidate config.

#### Usage

```
validate [router <router>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| router | The name of the router (default: all) |

#### Description

This command validates the current candidate configuration to check for referential integrity among the various configuration objects, to check for the use of deprecated configuration elements, and to supply warnings when various configuration elements cannot be validated.

Many configuration elements within the 128T router refer to other configuration elements by their _name_. If an administrator mistypes a name, or a referenced object is deleted without updating the source of that reference, this candidate configuration is said to be invalid. By using the validate command, administrators can ensure their configuration is valid prior to committing it to be the running configuration.

:::note
validation occurs automatically whenever the commit command is run; this standalone
command allows administrators to check for validity without requiring that the
configuration is committed immediately.
:::

The `validate` command provides warnings when a configuration contains deprecated elements - elements that are scheduled for removal in a future release of the 128T software. This is to give administrators the opportunity to replace the impacted configuration stanzas with their replacement.

The `validate` command will also provide warnings when a configuration cannot be validated and requires administrative oversight.

When validation fails, the administrator is notified via output to the CLI. The output from the `validate` command will identify the configuration that is failing validation.

#### Example

```
admin@node1.bernstein# validate
✖ Validating...
% Error: Candidate configuration is invalid:
1. inter-node-security is required
reported by router 'bernstein'

    config
        authority
            router datacenter
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## `where`

Display the current location in the CLI hierarchy.

#### Usage

```
where
```

#### Description

This command returns the user&#x27;s current position within the CLI hierarchy. When executed from the main CLI prompt, it returns nothing. When executed from within the configuration tree, it returns the user&#x27;s current position within the tree.

#### Example

```
admin@labsystem1.fiedler# where
admin@labsystem1.fiedler# conf auth router newton
admin@labsystem1.fiedler (router[name=newton])# where
configure authority router newton
admin@labsystem1.fiedler (router[name=newton])#
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## `write log message`

Write a message to the log.

#### Usage

```
write log message [force] [router <router>] [node <node>] <message> [<process-name>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node on which to log |
| router | The router on which to log (default: &lt;current router&gt;) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| message | The message to write to the log (messages with a space must be surrounded with quotes) |
| process-name | The process to which to write a log message (default: all) |

##### See Also

| command | description |
| ------- | ----------- |
| [`rotate log`](#rotate-log) | Rotate log files. |
| [`set log level`](#set-log-level) | Set the log level of a process. |
| [`write log snapshot`](#write-log-snapshot) | Write a snapshot to the log. |

#### Description

The `write log message` command lets administrators write messages into log files; this is typically used as a marker during troubleshooting exercises, to insert a string that can later be located to reference the onset of a test.

#### Example

```
admin@labsystem1.fiedler# write log message "---- starting test here ----"
Log message successfully written
admin@labsystem1.fiedler#
```

This message will appear in the log files with the category type "USER", as is demonstrated here:

```
[admin@labsystem1 ~]$ tail -n 5 /var/log/128technology/stateMonitor.log
  "message" : "No connectivity to labsystem5.burlington",
  "value" : "2"
}}
Total alarms for node: 0
Mar 13 14:14:38.345 [USER| -- ] INFO  (stateMonitPoller) ---- starting test here ----
[admin@labsystem1 ~]$
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## `write log snapshot`

Write a snapshot to the log.

#### Usage

```
write log snapshot [category <category>] [force] [router <router>] [node <node>] [<process-name>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| category | The log category for which to write the snapshot. (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node on which to log |
| router | The router on which to log (default: &lt;current router&gt;) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| process-name | The process to write a snapshot (default: all) |

##### See Also

| command | description |
| ------- | ----------- |
| [`rotate log`](#rotate-log) | Rotate log files. |
| [`set log level`](#set-log-level) | Set the log level of a process. |
| [`write log message`](#write-log-message) | Write a message to the log. |

#### Description

The `write log snapshot` command is debugging tool that outputs zookeeper state information related information to each respective process that utilizes zookeeper.

#### Example

```
admin@gouda.novigrad# write log snapshot
The snapshot was successfully written
```

```
[root@novigrad ~]# less /var/log/128technology/persistentDataManager.log
...
Apr 14 17:23:43.538 [DATA| -- ] INFO  (persistentPoller) Zookeeper debug snapshot info:
zk::Client:
    clientID          = 0x1010444f3f60003
    IO thread         = 0x8d432700
    Completion thread = 0x8cc31700
    Current state     = Connected (3)
    Current server    = 127.0.0.1:2181
    Servers           = 127.0.0.1:2181
    History:
        Apr 11 12:56:01.675 zk::Client::connectRequested
        Apr 11 12:56:01.682 zk::Client::onConnect
    zk::Node: event history for dead Nodes
        History:
================================================================================
    PersistentDataZooKeeper for statePda
    Reader recipes: 0
    Writer recipes: 3
    ...
```



## show stats
<!-- Not updated to 4.3+ -->
#### Syntax

```
show stats [since [ <timestamp> | launch] ] [<verbosity>] ...
```

#### Description

The _show stats_ command, and its myriad of subcommands, retrieve statistical data from various functions within the 128T router and return them to the user. Used for troubleshooting, debugging configuration, or just to monitor the health and well-being of the 128T router, these show commands provide a wealth of information and insight to users of the software.

Below is a representative sample of one of the _show stats_ commands.

:::note
The number and types of columns displayed may vary from software release to software release, as new statistics become available.
:::

```
admin@corp2-primary.corp2# show stats packet-processing lookup access-policy-table
Mon 2017-02-27 10:29:48 EST

Retrieving statistics...

Access Policy Table Stats
-------------------------
========= =============== ====== =======
 Metric    Node            Port   Value
========= =============== ====== =======
 allow     corp2-primary     10   37177
​           corp2-primary     11       0
​           corp2-primary     12      84
​           corp2-primary     13     305
​           corp2-primary    255       0
 deny      corp2-primary     10       0
​           corp2-primary     11       0
​           corp2-primary     12       0
​           corp2-primary     13       0
​           corp2-primary    255       0
 failure   corp2-primary     10       0
​           corp2-primary     11       0
​           corp2-primary     12       0
​           corp2-primary     13       0
​           corp2-primary    255       0
 miss      corp2-primary     10       0
​           corp2-primary     11       0
​           corp2-primary     12       0
​           corp2-primary     13       0
​           corp2-primary    255       0

Completed in 0.48 seconds
```

:::note
In this example the _Port_ value of 255 represents packets that are being sent to the CPU on the receiving 128T for additional processing – namely, the first packet of a new session. Many of the _show stats_ commands will reference port 255, and in all cases this value 255 represents an "internal" port created by the 128T router for interprocess communication purposes.
:::

Each table of output can be displayed in three different modes of verbosity: debug, detail, and summary. The default is _detail_, which consolidates all traffic from various CPU cores that have been allocated to packet processing into a single value.

The value _debug_ shows a breakdown of all statistics into their most granular constituent components. For the access-policy-table, this will show how many access-policy-table hits have occurred by CPU core.

```
admin@labsystem1.fiedler# show stats packet-processing lookup access-policy-table allow debug
Wed 2016-11-02 09:22:12 EDT
Retrieving statistics...

Access Policy Table Allow
-------------------------
====== ============ ====== =======
 Core   Node         Port   Value
====== ============ ====== =======
​    0   labsystem1      2       0
​    0   labsystem1    255       0
​    1   labsystem1      2       0
​    1   labsystem1    255       0
​    2   labsystem1      2       0
​    2   labsystem1    255       0

Completed in 0.13 seconds
```

The value summary, the least verbose, summarizes all of the statistics system-wide.

```
admin@labsystem1.fiedler# show stats packet-processing lookup access-policy-table allow summary
Wed 2016-11-02 09:22:32 EDT
Retrieving statistics...

Access Policy Table Allow
-------------------------
============ =======
 Node         Value
============ =======
 labsystem1       0

Completed in 0.17 seconds
```

As of software version 3.1, the _show stats_ command provides an additional feature, the ability to set a "zero point" for displaying statistical output using the _since_ command. The _since_ command takes either a timestamp as its argument (in ISO 8601 format), or the keyword _launch_, which shows statistics accumulated since the 128T routing software was launched. For more information on the zero point, refer to the section of this guide on _set context stats_.

```
admin@labsystem1.fiedler# show stats packet-processing lookup access-policy-table allow since 2017-07-26T12:00:00Z
Thu 2017-07-27 11:22:32 EDT
Retrieving statistics...

Access Policy Table Allow
-------------------------
============ ====== =======
 Node         Port   Value
============ ====== =======
 labsystem1     10       0
 labsystem1     11       0
 labsystem1    254       0
 labsystem1    255       0

Completed in 0.16 seconds
```

Generally speaking, the statistical data available via the 128T router&#39;s PCLI is organized into a tree-like hierarchy, with each subcommand having (potentially) its own series of subcommands. By omitting the (optional) subcommands, the 128T router will summarize all data from all possible subcommands and present it in a summary table (this is new behavior as of our 1.1 software release); while this is very convenient to show a lot of potential data at a glance, it does incur additional processing overhead, and the retrieval of statistics may take an inordinately long time.

Each of the various _show stats_ subcommands will be described in sections that follow.

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 1.1.0   | Made significant improvements to the ability to filter the data, summarize the data. Improved the output format for all stats tables. |

## show stats aggregate-session
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats aggregate-session [by-device-interface | by-network-interface | by-node | by-project | by-service | by-service-class | by-service-group | by-service-route | by-tenant ] [<data specifier>] [<additional filter criteria>] [<verbosity>]
```

#### Description

The _show stats aggregate-session_ command and its various subcommands show aggregate data about session traffic traversing the 128T router, through a variety of different aggregation lenses. Each of the subcommands lets users show different "cuts" of the session data; e.g., the _by-service-route_ subcommand will show all traffic associated with the configured service-route elements on a given system.

Each of the subcommands includes the following data:

| Data Specifier | Description |
| --- | --- |
| bandwidth | The amount of bandwidth in bytes/second. |
| rx-data | The amount of data received in bytes. |
| rx-packets | The number of packets received. |
| rx-tcp-data | The amount of data received over TCP. |
| rx-tcp-packets | The number of TCP packets received. |
| rx-tcp-retransmissions | The number of duplicate TCP packets received. |
| rx-udp-data | The amount of data received over UDP. |
| rx-udp-packets | The number of UDP packets received. |
| session-arrival-rate | The arrival rate (in new sessions per second) for traffic. |
| session-count | The number of active sessions. |
| session-departure-rate | The number of sessions terminated per second. |
| total-data | The total amount of data for all sessions. |
| total-packets | The total number of packets received and sent. |
| total-tcp-data | The total amount of data received and sent over TCP. |
| total-tcp-packets | The total number of TCP packets sent and received. |
| total-tcp-retransmissions | The total number of TCP retransmissions sent and received. |
| total-udp-data | The total amount of data received and sent over UDP. |
| total-udp-packets | The total number of UDP packets sent and received over UDP. |
| tx-data | The total amount of data transmitted. |
| tx-packets | The total number of packets transmitted. |
| tx-tcp-data | The total amount of data transmitted over TCP. |
| tx-tcp-packets | The total number of packets transmitted over TCP. |
| tx-tcp-retransmissions | The total number of TCP retranmissions sent. |
| tx-udp-data | The total amount of UDP data sent. |
| tx-udp-packets | The total number of packets sent using UDP. |

Within each of the various lenses, the output can be filtered down to an constituent element of that type; for example, the _show stats aggregate-session by-device-interface_ can filter the output to display the statistics for a single device-interface. This is done _after_ the data specifier, as follows:

```
user@labsystem1.fiedler> show stats aggregate-session by-device-interface bandwidth device-interface labsystem1.10
Fri 2017-07-21 14:51:56 EDT
Retrieving statistics...

Session Bandwidth
-----------------
====================== =========
 Device-interface         Value
====================== =========
 labsystem1.10           5301328

Completed in 0.05 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.0.0   | This feature was introduced |

## show stats arp
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats arp [{ encapsulation | entries | queued | received | sent }] [node <node-name>] [<verbosity>]
```

#### Description

The _show stats arp_ command has a variety of subcommands to display statistical information on various aspects of the 128T router&#39;s handling of sent and received ARP messages. Each of those will be described in the sections that follow.

Omitting the subcommand will cause the 128T router to aggregate statistics from all of the subcommands and present them in tabular view; as there are a lot of subcommands, this command may take a very long time to accumulate – particularly on a busy system.

```
admin@labsystem1.fiedler# show stats arp
Wed 2016-11-02 09:22:51 EDT
Retrieving statistics...

ARP + ICMPv6 Management Stats
-----------------------------
================================================= ============ =======
 Metric                                            Node         Value
================================================= ============ =======
 encapsulation sent failure                        labsystem1       0
 encapsulation sent success                        labsystem1       0
 entries                                           labsystem1       0
 queued failure drop                               labsystem1       0
 queued failure queue-full                         labsystem1       0
 queued packets                                    labsystem1       0
 received arp-reply                                labsystem1       0
 received arp-request                              labsystem1     321
 received errors arp-reply                         labsystem1       0
 received errors arp-request                       labsystem1     321
 received errors neighbor-advertisement            labsystem1       0
 received errors neighbor-solicit                  labsystem1       0
 received errors processing                        labsystem1       0
 received errors unknown-type                      labsystem1       0
 received neighbor-advertisement                   labsystem1       0
 received neighbor-solicit                         labsystem1       0
 sent failure allocation                           labsystem1       0
 sent failure arp-reply                            labsystem1       0
 sent failure arp-request                          labsystem1       0
 sent failure gratuitous-arp                       labsystem1       0
 sent failure neighbor-advertisement               labsystem1       0
 sent failure neighbor-solicit                     labsystem1       0
 sent failure standby                              labsystem1       0
 sent failure unsolicited-neighbor-advertisement   labsystem1       0
 sent success arp-reply                            labsystem1       0
 sent success arp-request                          labsystem1       0
 sent success gratuitous-arp                       labsystem1       0
 sent success neighbor-advertisement               labsystem1       0
 sent success neighbor-solicit                     labsystem1       0
 sent success unsolicited-neighbor-advertisement   labsystem1       0

Completed in 0.32 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 3.0.0   | Added _node_ keyword and _verbosity_ specifiers |

## show stats arp encapsulation
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats arp encapsulation sent [{ failure | success }] [node <node-name>] [<verbosity>]
```

#### Description

The _show stats arp encapsulation_ command has a variety of command-line modifiers that show statistics related to the transmission of Layer 2 encapsulation of IP packets.

When no subcommand is specified, the 128T router will return statistics on all subcommands and present them in a summary table:

```
admin@labsystem1.fiedler# show stats arp encapsulation sent
Wed 2016-11-02 09:23:23 EDT
Retrieving statistics...

IP Packet Sent Stats
--------------------
========= ============ =======
 Metric    Node         Value
========= ============ =======
 failure   labsystem1       0
 success   labsystem1       0

Completed in 0.08 seconds
```

Each of the two commands beneath _show stats arp encapsulation_ display a similar table, one example of which is shown below:

```
admin@labsystem1.fiedler# show stats arp encapsulation sent success
Wed 2016-11-02 09:23:41 EDT
Retrieving statistics...

IP Packets sent after successful ARP resolution
-----------------------------------------------
============ =======
 Node         Value
============ =======
 labsystem1       0

Completed in 0.04 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 3.0.0   | Added _node_ keyword and _verbosity_ specifiers |

## show stats arp entries
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats arp entries [node <node-name>] [<verbosity>]
```

#### Description

The _show stats arp entries_ command displays tabular data regarding the number of ARP entries that the 128T router has in its ARP cache. Sample output is below:

```
admin@labsystem1.fiedler# show stats arp entries
Retrieving statistics...

The number of active ARP entries
--------------------------------
=============  =======
Node             Value
=============  =======
linecard-test        2
=============  =======
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 3.0.0   | Added _node_ keyword and _verbosity_ specifiers |

## show stats arp queued
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats arp queued [{ failure { drop | queue-full } | packets }] [node <node-name>] [<verbosity>]
```

#### Description

The _show stats arp queued_ command has three modes, depending on the command line arguments used when it is invoked. The two failure modes (drop and queue full) will display counts for the number of packets that are dropped due to the failure to receive a response to an ARP request issued by the 128T router, and the number of packets that failed to enqueue due to a failed ARP request, respectively.

The _show stats arp queued packets_ command shows the number of packets waiting in queues for a pending ARP transation.

All three of these commands will display tabular data such as the following:

```
admin@labsystem1.fiedler# show stats arp queued failure queue-full
Retrieving statistics...

The number of packets that failed to enqueue
--------------------------------------------
=============  =======
Node             Value
=============  =======
linecard-test        0
=============  =======
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 3.0.0   | Added _node_ keyword and _verbosity_ specifiers |

## show stats arp received
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats arp received [{ arp-reply | arp-request | errors { arp-reply | arp-request | neighbor-advertisement | neighbor-solicit | processing | unknown-type } | neighbor-advertisement | neighbor-solicit }] [node <node-name>] [<verbosity>]
```

#### Description

The _show stats arp received_ command has a variety of command line modifiers to show various sets of statistics regarding the ARP traffic that this system has received. The _arp-reply_ and _arp-request_ modifiers show the number of ARP replies and requests that the 128T router has received, respectively. Each of these commands outputs its data in a table that looks like the following:

```
admin@labsystem1.fiedler# show stats arp received arp-reply
Retrieving statistics...

The number of ARP replies received
----------------------------------
=============  =======
Node             Value
=============  =======
linecard-test        0
=============  =======
```

The _show stats arp received errors_ command has a list of modifiers to allow users to see the statistics regarding to the number of invalid or ignored ARP/ICMPv6 packets in various forms. These statistics are particularly useful during troubleshooting exercises; large numbers of ARP receive errors may be emblematic of larger network issues.

The ARP reply and ARP request modifiers show statistics related to the number of errors related to the receipt of ARP replies and requests. The neighbor-advertisement and neighbor-solicit modifiers show errors related to the receipt of ICMPv6 errors. When the 128T router has difficulties with processing ARP or ICMPv6 packets, they will increment the values in the _processing_ table. Unclassified (or unclassifiable) ARP/ICMPv6 packets received will increment the values in the _unknown-type_ table.

All of the modifiers (arp-reply, arp-request, neighbor-advertisement, neighbor-solicit, processing, unknown-type) show their data in a similar format:

```
admin@labsystem1.fiedler# show stats arp received errors unknown-type
Retrieving statistics...

The number of Packets received of an unknown type
-------------------------------------------------
=============  =======
Node             Value
=============  =======
linecard-test        0
=============  =======
```

The _show stats arp received neighbor-advertisement_ and _neighbor-solicit_ modifiers are used to show statistics regarding the number of ICMPv6 packets received. Note that at this time the 128T router can classify ICMPv6 packets, even in the absence of full IPv6 support.

```
admin@labsystem1.fiedler# show stats arp received neighbor-advertisement
Retrieving statistics...

The number of ICMPv6 Neighbor Advertisements received
-----------------------------------------------------
=============  =======
Node             Value
=============  =======
linecard-test        0
=============  =======

admin@labsystem1.fiedler# show stats arp received neighbor-solicit
Retrieving statistics...

The number of ICMPv6 Neighbor Solicits received
-----------------------------------------------
=============  =======
Node             Value
=============  =======
linecard-test        0
=============  =======
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 3.0.0   | Added _node_ keyword and _verbosity_ specifiers |

## show stats arp sent
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats arp sent [{ failure { allocation | arp-reply | arp-request | gratuitous-arp | neighbor-advertisement | neighbor-solicit | standby | unsolicited-neighbor-advertisement} | success { arp-reply | arp-request | gratuitous-arp | neighbor-advertisement | neighbor-solicit | unsolicited-neighbor-advertisement } }] [node <node-name>] [<verbosity>]
```

#### Description

The _show stats arp sent_ command has two modes: success and failure. Each of these modes shows tabular data relating to successful or failed ARP events, and outputs its counters in tabular format such as the following:

```
admin@labsystem1.fiedler# show stats arp sent success arp-reply
Retrieving statistics...

The number of ARP replies sent
------------------------------
=============  =======
Node             Value
=============  =======
linecard-test        0
=============  =======
```

The _success_ modifier tallies the number of ARP transmission events for requests, replies, and gratuitous ARPs. The _failure_ modifier increments when various ARP transmission events occur; _allocation_ shows the number of allocation failures when the 128T router fails to send an ARP packet, _arp-request_ and _arp-reply_ show the number of errors when sending requests and replies, and _gratuitous-arp_ shows the number of failed gratuitous ARP transmission attempts. The various modifiers associated with ICMPv6 are not in use at this time.

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 3.0.0   | Added _node_ keyword and _verbosity_ specifiers |

## show stats bfd
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats bfd [{ by-peer-path | neighbor | received [{ invalid | processed | total | valid }] } ] [<verbosity>]
```

#### Description

The _show stats bfd_ command is used for determining the health of the 128T router&#39;s (BFD) Bidirectional Forwarding Detection processing. The various modifiers associated with _show stats bfd_ are enumerated in the sections that follow.

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 3.0.0   | Added _by-peer-path_ statistics, and verbosity modifier |

## show stats bfd by-peer-path
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats bfd by-peer-path [jitter | latency | loss] [<verbosity>]
```

#### Description

The _show stats bfd by-peer-path_ command shows the values for jitter, latency, and packet loss as measured and reported by the BFD processing between this 128T router and one of its configured _peers_. This is helpful for troubleshooting connectivity issues and/or understanding why a particular path has been deprioritized over another, when link quality measurements are factored into a routing decision.

```
admin@labsystem1.fiedler # show stats bfd by-peer-path
Mon 2017-02-27 10:38:23 EST
Retrieving statistics...

by-peer-path
------------
========= ==================================== =======
 Metric    Peer-path                            Value
========= ==================================== =======
 jitter    peer_corp/10.0.1.1/labsystem1/10/0       0
 latency   peer_corp/10.0.1.1/labsystem1/10/0       0
 loss      peer_corp/10.0.1.1/labsystem1/10/0       0
 mos       peer_corp/10.0.1.1/labsystem1/10/0       0

Completed in 0.17 seconds
```

The _peer-path_ is displayed in the following format:

- peerName/adjacencyAddress/nodeName/nodeInterface/nodeVLAN

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.0.0   | This feature was introduced |

## show stats bfd neighbor
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats bfd neighbor [num-failover-events | num-source-nat-changes] [node <nodename>] [<verbosity>]
```

#### Description

The _show stats bfd neighbor_ counts the number of times that a neighbor has had a failover (a switchover where a pair of devices has exchanged active control of packet processing) or a NAT address has changed, as detected by BFD.

```
admin@labsystem1.fiedler# show stats bfd neighbor num-failover-events
Mon 2017-02-27 10:44:32 EST
Retrieving statistics...

Number of failover events in neighbors
--------------------------------------
================== =======
 Node               Value
================== =======
 labsystem1             3

Completed in 0.12 seconds
```

Generally speaking, devices behind dynamic NATs will be accessible via a specific IP:port in perpetuity as long as the port is refreshed frequently enough to keep that NAT&#39;s binding alive. However, NATs can be rebooted and pinholes can close; this statistic will let you know if the 128T router detected its neighbor has changed NAT ports over time.

```
admin@test1.Fabric128# show stats bfd neighbor num-source-nat-changes
Fri 2016-10-28 14:18:52 EDT
Retrieving statistics...

Number of source NAT changes in neighbors
-----------------------------------------
======= =======
 Node    Value
======= =======
 test1       0

Completed in 1.72 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |
| 3.0.0   | added statistics to count failover events (via _num-failover-events_) |

## show stats bfd received invalid
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats bfd received invalid { authentication-field | detect-multiple | discriminator | header-large | header-small | header-version | length-packets | packets | payload-small } [node <node-name>] [<verbosity>]
```

#### Description

The _show stats bfd received invalid_ command, with its modifiers, shows the administrator the count for all BFD packets that were deemed invalid, broken down into categories for which the 128T router failed to handle them. The _authentication-field_ modifier counts the number of BFD packets that had an invalid authorization field, the _detect-multiple_ packets had an invalid multiplier value, and the _discriminator_ had an invalid discriminator. The various _header-_ modifiers count whether or not the header of the BFD packet was too large, too small, or had the wrong version information within it. The _length-packets_ modifier counts the number of packets marked invalid due to an incorrect length. Packets that arrive under the minimum size threshold for BFD packets are invalidated and shown in the _payload-small_ counter. The total of all invalid packets is captured in the table shown by the _packets_ modifier.

All of the modifiers will display a table similar to the following:

```
admin@labsystem1.fiedler# show stats bfd received invalid packets
Retrieving statistics...

The number of invalid BFD packets received
------------------------------------------
=============  =======
Node             Value
=============  =======
linecard-test        0
=============  =======
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 3.0.0   | Added _node_ keyword and _verbosity_ specifiers |

## show stats bfd received processed
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats bfd received processed [node <node-name>] [<verbosity>]
```

#### Description

The _show stats bfd received processed_ command shows the current count of the number of BFD packets that the 128T router has received and successfully processed.

```
admin@labsystem1.fiedler# show stats bfd received processed
Retrieving statistics...

The number of BFD packets processed
-----------------------------------
=============  =======
Node             Value
=============  =======
linecard-test        0
=============  =======
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 3.0.0   | Added _node_ keyword and _verbosity_ specifiers |

## show stats bfd received total
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats bfd received total [node <node-name>] [<verbosity>]
```

#### Description

The _show stats bfd received total_ counter displays the number of BFD packets that the 128T router has received (valid and invalid).

```
admin@labsystem1.fiedler# show stats bfd received total
Retrieving statistics...

The number of BFD packets received
----------------------------------
=============  =======
Node             Value
=============  =======
linecard-test        0
=============  =======
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 3.0.0   | Added _node_ keyword and _verbosity_ specifiers |

## show stats bfd received valid
<!-- Not updated to 4.3 -->
#### Syntax
```
show stats bfd received valid packets [node <node-name>] [<verbosity>]
```

#### Description

The _show stats bfd received valid_ counter shows the number of valid BFD packets that the 128T router has received.

```
admin@labsystem1.fiedler# show stats bfd received valid packets
Retrieving statistics...

The number of valid BFD packets received
----------------------------------------
=============  =======
Node             Value
=============  =======
labsystem1           0
=============  =======
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 3.0.0   | Added _node_ keyword and _verbosity_ specifiers |

## show stats cpu
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats cpu utilization [core <core-number>] [<verbosity>]
```

#### Description

The _show stats cpu_ statistic shows the utilization value for each CPU core on the system that is being leveraged by the 128T networking software:

```
user@dc1.datacenter> show stats cpu
Wed 2018-02-07 13:04:47 EST
Retrieving statistics...

CPU utilization
---------------
============= =================== ====== =======
 Metric        Node                Core   Value
============= =================== ====== =======
 utilization   dc1                    0      48
​               dc1                    1      43
​               dc1                    2      31
​               dc1                    3     100

Completed in 0.04 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.2.0   | This feature was introduced |

## show stats database
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats database memory-utilization [node <node>] [<verbosity>]
```

#### Description

The _show stats database_ statistic displays details about the 128T router&#39;s on-board database activity. As of software version 3.1, this is limited to the amount of memory that the database has allocated:
```
user@labsystem1.fiedler> show stats database
Mon 2017-07-24 10:36:10 EDT
Retrieving statistics...

Database Tracking Metrics
-------------------------
================= =================== =============
 Metric            Node                      Value
================= =================== =============
 memory-consumed   labsystem1          13243043840

Completed in 0.06 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.1.0   | This feature was introduced |

## show stats device-interface
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats device-interface [{ message-failure | message-success }] [node <node>] [<verbosity>]
```

#### Description

The _show stats device-interface_ statistics count the number of device-interface configuration (interface management) events, and tally both successes (shown under message-success) and failures (shown under message-failure).

As with most statistical output, omitting the message-failure/message-success parameter will show a table containing both items:

```
admin@labsystem1.fiedler# show stats device-interface
Wed 2016-11-02 09:24:53 EDT
Retrieving statistics...

Device Interface Management Stats
---------------------------------
================= ============ =======
 Metric            Node         Value
================= ============ =======
 message-failure   labsystem1       0
 message-success   labsystem1       5

Completed in 0.17 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.1.0   | This feature was introduced |

## show stats disk
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats disk [{ capacity | component | used }] [node <node-name>] [<verbosity>]
```

#### Description

The _show stats disk_ statistics displays information about the capacity of the fixed disk(s) associated with the nodes that comprise the 128T router, as well as the free space/used space on those disks.

```
admin@labsystem1.fiedler# show stats disk
Mon 2016-10-31 10:23:52 EDT
Retrieving statistics...

Disk usage
----------
=========== =================== ===============
 Metric      Node                        Value
=========== =================== ===============
 capacity    t128_corp_primary   1787980414976
 component   t128_corp_primary     98257735680
 used        t128_corp_primary    196037148672

Completed in 0.18 seconds
```

Added in software version 3.1 is _show stats disk component_, which highlights the most common consumers of disk space by the 128T software (core dumps, system files, log files, and historical data).

```
user@labsystem1.fiedler> show stats disk component
Mon 2017-07-24 10:39:22 EDT
Retrieving statistics...

Component disk usage
--------------------
============ ================== =============
 Node         Component                Value
============ ================== =============
 labsystem1   Core Dumps                   6
 labsystem1   System             89358360915
 labsystem1   T128 Logs             10089514
 labsystem1   Time Series Data    8888420989

Completed in 0.09 seconds
```

#### Privileges Required

Available to _admin_ and _user_. Updated in 3.0 to add _node_ keyword and _verbosity_ specifiers.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.1.0   | This feature was introduced |
| 3.0.0   | Added _show stats disk component_ |

## show stats dpi
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats dpi [{ parsed | received }] [router <router-name>] [node <node-name>] [<verbosity>]
```

#### Description

Introduced with the _application classification_ feature in software version 3.2, this command shows the statistics pertaining to the 128T&#39;s Deep Packet Inspection (DPI) function, which looks into the contents of X.509 certificates to find Common Name attributes, to associate with applications.

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.2.0   | This feature was introduced |

## show stats dynamic-peer-update
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats dynamic-peer-update [{ connection | leadership | requests | responses }] [router <router-name>] [node <node-name>] [<verbosity>]
```

#### Description

The 128T networking platform&#39;s _dynamic peer update_ feature is what allows 128T devices that obtain IP addresses via a dynamic protocol (e.g., DHCP, LTE, PPPoE, etc.) to establish permanent peering relationships with other 128T devices. Introduced in our 3.2 software, the _show stats dynamic-peer-update_ subcommand will enumerate the various stages and states of behavior associated with this new feature.

```
admin@cnd1.conductor# show stats dynamic-peer-update
Wed 2018-02-07 13:51:38 EST
Retrieving statistics...

Dynamic Peer Update Stats
-------------------------
======================================= =========== ====== =======
 Metric                                  Router      Node   Value
======================================= =========== ====== =======
 connection first-conductor-connect      conductor   cnd1       0
 connection first-server-connect         conductor   cnd1       1
 connection last-conductor-disconnect    conductor   cnd1       0
 leadership lost                         conductor   cnd1       0
 leadership won                          conductor   cnd1       1
 requests received push                  conductor   cnd1       0
 requests received sync                  conductor   cnd1       0
 requests received sync-peer-addresses   conductor   cnd1       0
 requests sent push                      conductor   cnd1       0
 requests sent sync                      conductor   cnd1       0
 responses received not-found            conductor   cnd1       0
 responses received other-failure        conductor   cnd1       0
 responses received success              conductor   cnd1       0
 responses received time-out             conductor   cnd1       0

Completed in 0.54 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.2.0   | This feature was introduced |

## show stats external-protocols
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats external-protocols [{ agent | manager } [ { channel-messages | errors | packets }] [node <node>] [<verbosity>]
```

#### Description

Each 128T router has a set of processes known as the _External Protocol Manager_ (EPM) and _External Protocol Agent_ (EPA) that communicate with each other to report on various types of environmental issues. The _show stats external-protocols_ tables represent a breakdown of the different types of messaging that the EPM and EPA exchange. The table can be broken down further into the EPM statistics (with the optional argument _manager_, or the EPA statistics with the optional argument _agent_.

This command is usually only run at the request of 128 Technology&#39;s support organization to diagnose a specific problem.

```
admin@labsystem1.fiedler# show stats external-protocols
Wed 2016-11-02 09:25:15 EDT
Retrieving statistics...

External Protocol's Stats
-------------------------
========================================================= ============ =======
 Metric                                                    Node         Value
========================================================= ============ =======
 agent channel-messages received                           labsystem1       9
 agent channel-messages sent                               labsystem1       5
 agent errors classify-drop                                labsystem1       0
 agent errors early-inbound                                labsystem1       0
 agent errors early-outbound                               labsystem1       0
 agent errors fastlane-not-ready-drop                      labsystem1       0
 agent errors global-interface-lookup-drop                 labsystem1       0
 agent errors illegal-ethernet-drop                        labsystem1       0
 agent errors illegal-external-protocols-channel-message   labsystem1       4
 agent errors illegal-ip-drop                              labsystem1       0
 agent errors inbound-drop                                 labsystem1       0
 agent errors outbound-drop                                labsystem1       0
 agent errors outbound-l2-resolution-reply-drop            labsystem1       0
 agent errors session-collision                            labsystem1       0
 agent packets inbound                                     labsystem1       0
 agent packets outbound                                    labsystem1       0
 manager channel-messages received                         labsystem1       5
 manager errors early-inbound                              labsystem1       4
 manager packets inbound                                   labsystem1       0
 manager packets outbound                                  labsystem1       8

Completed in 0.32 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.1.0   | This feature was introduced |

## show stats external-protocols agent
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats external-protocols agent [{ channel-messages | errors | packets }] [node <node>] [<verbosity>]
```

#### Description

This external-protocols subcommand displays statistical output for the messaging send and received by the External Protocols Agent (EPA) – to and from the EPM.

This command is usually only run at the request of 128 Technology&#39;s support organization to diagnose a specific problem.

```
admin@labsystem1.fiedler# show stats external-protocols agent
Wed 2016-11-02 09:30:54 EDT
Retrieving statistics...

agent
-----
=================================================== ============ =======
 Metric                                              Node         Value
=================================================== ============ =======
 channel-messages received                           labsystem1       9
 channel-messages sent                               labsystem1       5
 errors classify-drop                                labsystem1       0
 errors early-inbound                                labsystem1       0
 errors early-outbound                               labsystem1       0
 errors fastlane-not-ready-drop                      labsystem1       0
 errors global-interface-lookup-drop                 labsystem1       0
 errors illegal-ethernet-drop                        labsystem1       0
 errors illegal-external-protocols-channel-message   labsystem1       4
 errors illegal-ip-drop                              labsystem1       0
 errors inbound-drop                                 labsystem1       0
 errors outbound-drop                                labsystem1       0
 errors outbound-l2-resolution-reply-drop            labsystem1       0
 errors session-collision                            labsystem1       0
 packets inbound                                     labsystem1       0
 packets outbound                                    labsystem1       0

Completed in 0.19 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show stats external-protocols manager
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats external-protocols manager [{ channel-messages | errors | packets }] [node <node>] [<verbosity>]
```

#### Description

This external-protocols subcommand displays statistical output for the messaging send and received by the External Protocols Agent (EPM) – to and from the EPA.

This command is usually only run at the request of 128 Technology&#39;s support organization to diagnose a specific problem.

```
admin@labsystem1.fiedler# show stats external-protocols manager
Wed 2016-11-02 09:32:17 EDT
Retrieving statistics...

manager
-------
=========================== ============ =======
 Metric                      Node         Value
=========================== ============ =======
 channel-messages received   labsystem1       5
 errors early-inbound        labsystem1       4
 packets inbound             labsystem1       0
 packets outbound            labsystem1       8

Completed in 0.18 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show stats highway
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats highway [{ action-event | actions | firewall-detector }] [node <node>] [<verbosity>]
```

#### Description

The "highway manager" (or "highwayManager") is a 128T router software process that governs the packet forwarding behavior of a Slice (including the packet-forwarding component of a Combo). The _show stats highway_ command shows statistics regarding the operation of the highway manager.

```
admin@labsystem1.fiedler# show stats highway
Wed 2016-11-02 09:34:54 EDT
Retrieving statistics...

Global Highway Manager Stats
----------------------------
====================================== ============ =======
 Metric                                 Node         Value
====================================== ============ =======
 actions action-meter                   labsystem1       2
 firewall-detector discovery-timeout    labsystem1       0
 firewall-detector reply-received       labsystem1       0
 firewall-detector reply-sent           labsystem1       0
 firewall-detector request-received     labsystem1       0
 firewall-detector request-sent         labsystem1       0
 firewall-detector tcp-reset-received   labsystem1       0
 firewall-detector unknown-received     labsystem1       0

Completed in 0.23 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## show stats highway action-event
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats highway action-event [{ dequeue | enqueue | enqueue-failure | send-retry | send-success | send-timeout }] [node <node>] [<verbosity>]
```

#### Description

Each flow within a 128T router&#39;s flow table may have various _actions_ associated with it, to describe the operations that the 128T router may apply to packets that match the flow entry. Examples of actions are encryption, decryption, add metadata, perform DPI, etc.

The _show stats highway action-event_ subcommands tabulate different actions associated with the 128T router&#39;s internal action processing; i.e., how many action events have been enqueued, dequeued, etc.

This command is generally only run at the specific request of the support team from 128 Technology, Inc.

```
admin@labsystem1.fiedler# show stats highway action-event
Mon 2017-02-27 11:20:16 EST
Retrieving statistics...

Action Event Stats
------------------
================= ============ =======
 Metric            Node         Value
================= ============ =======
 dequeue           labsystem1       0
 enqueue           labsystem1       0
 enqueue-failure   labsystem1       0
 send-retry        labsystem1       0
 send-success      labsystem1       0
 send-timeout      labsystem1       0

Completed in 0.03 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.0.0   | This feature was introduced |

## show stats highway actions
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats highway actions action-meter [node <node>] [<verbosity>]
```

#### Description

Each flow within a 128T router&#39;s flow table may have various _actions_ associated with it, to describe the operations that the 128T router may apply to packets that match the flow entry. Examples of actions are encryption, decryption, add metadata, perform DPI, etc.

The _show stats highway action action-meter_ returns the number of active "actions" that are allocated.

```
admin@labsystem1.fiedler# show stats highway actions action-meter
Wed 2016-11-02 09:35:35 EDT
Retrieving statistics...

Active Action Entries
---------------------
============ =======
 Node         Value
============ =======
 labsystem1       2

Completed in 0.07 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## show stats highway firewall-detector
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats highway firewall-detector [{ discovery-timeout | reply-received | reply-sent | request-received | request-sent | tcp-reset-received | unknown-received }] [node <node>] [<verbosity>]
```

#### Description

Occasionally, 128T nodes are deployed with firewalls between them. The 128T router&#39;s built-in "firewall detector" uses a purpose-built testing algorithm and associated state machine to learn the type and nature of the firewall, so that it can accommodate it and send packets between the divided nodes successfully. The various _show stats highway firewall-detector_ subcommands show the various states within this state machine.

```
admin@labsystem1.fiedler# show stats highway firewall-detector
Wed 2016-11-02 09:36:00 EDT
Retrieving statistics...

Firewall Detector Stats
-----------------------
==================== ============ =======
 Metric               Node         Value
==================== ============ =======
 discovery-timeout    labsystem1       0
 reply-received       labsystem1       0
 reply-sent           labsystem1       0
 request-received     labsystem1       0
 request-sent         labsystem1       0
 tcp-reset-received   labsystem1       0
 unknown-received     labsystem1       0

Completed in 0.18 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show stats icmp
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats icmp [sent [ failure | success] ] [<verbosity>]
```

#### Description

The _show stats icmp_ shows information on the ICMP activity (sent and received) by the 128T router. The optional _sent_ filter will show ICMP packets sent.

As with many other _show stats_ commands, _show stats icmp_ has options to change the verbosity of the output using the detail/debug/summary flags.

```
admin@labsystem1.fiedler# show stats icmp
Wed 2016-11-02 09:37:13 EDT
Retrieving statistics...

ICMP Manager Stats
------------------
========================= ============ =======
 Metric                    Node         Value
========================= ============ =======
 sent failure echo-reply   labsystem1       0
 sent success echo-reply   labsystem1       0

Completed in 0.12 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show stats interface
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats interface [{ received [ { buffer-allocation-failures | bytes | error | missed | packets | utilization }] | sent [{ bytes | error | packets | utilization }] ]
```

#### Description

The _show stats interface_ command displays interface-based statistics broken down into two main categories: receive statistics and transmit statistics (the _received_ and _sent_ subcommands, respectively). Each will be shown individually in the two sections that follow.

Executing the standalone command _show stats interface_ displays a comprehensive set of all interface-based statistics available on the 128T router. Note that this command will execute a lot of queries, and may take as long as 60 seconds to return data to the PCLI.

```
admin@labsystem1.fiedler# show stats interface
Wed 2016-11-02 09:41:29 EDT
Retrieving statistics...

Ethernet Interface Statistics
-----------------------------
==================================== ============ ====== ========
 Metric                               Node         Port    Value
==================================== ============ ====== ========
 received buffer-allocation-failure   labsystem1      2        0
 received bytes                       labsystem1      2   530496
 received error                       labsystem1      2        0
 received missed                      labsystem1      2        0
 received packets                     labsystem1      2     2657
 received utilization                 labsystem1      2        0
 sent bytes                           labsystem1      2   260426
 sent error                           labsystem1      2        0
 sent packets                         labsystem1      2      805
 sent utilization                     labsystem1      2        0

Completed in 0.19 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 1.1.0   | Changed from "show stats interface-packets-received" and "show stats interface-packets-sent" to the "show stats interface" hierarchy. |
| 3.2.0   | Added _missed_ to _show stats interface received_ |

## show stats interface received
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats interface received
```

#### Description

The _show stats interface received_ command displays information about the interfaces on a packet-forwarding element of the 128T router (i.e., a Slice or Combo).

```
admin@labsystem1.fiedler# show stats interface received
Wed 2016-11-02 09:42:16 EDT
Retrieving statistics...

received
--------
=========================== ============ ====== ========
 Metric                      Node         Port    Value
=========================== ============ ====== ========
 buffer-allocation-failure   labsystem1      2        0
 bytes                       labsystem1      2   533184
 error                       labsystem1      2        0
 missed                      labsystem1      2        0
 packets                     labsystem1      2     2671
 utilization                 labsystem1      2        0

Completed in 0.13 seconds
```

The categorization of metrics is as follows: _buffer-allocation-failure_ counts the number of times that the 128T router could not allocate a buffer to receive a packet that had arrived on the interface (this is generally due to a resource exhaustion on your 128T node and will be requested of you by 128 Technology&#39;s support department); _bytes_ counts the number of bytes received on the interface; _error_ counts the number of receive errors (malformed packets) on the interface; missed counts the number of packets that were dropped or discarded by the interface; _packets_ counts the raw number of packets that have arrived; _utilization_ measures the receive bandwidth per interface.

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.1.0   | This feature was introduced |

## show stats interface sent
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats interface received
```

#### Description

The _show stats interface sent_ command displays information about the interfaces on a packet-forwarding element of the 128T router (i.e., a Slice or Combo).

```
admin@labsystem1.fiedler# show stats interface sent
Wed 2016-11-02 09:42:39 EDT
Retrieving statistics...

sent
----
============= ============ ====== ========
 Metric        Node         Port    Value
============= ============ ====== ========
 bytes         labsystem1      2   263602
 error         labsystem1      2        0
 packets       labsystem1      2      815
 utilization   labsystem1      2        0

Completed in 0.12 seconds
```

The categorization of metrics is as follows: _bytes_ counts the number of bytes transmitted on the interface; _error_ counts the number of send errors (malformed packets) on the interface; _packets_ counts the raw number of packets that have been sent; _utilization_ measures the transmit bandwidth per interface.

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.1.0   | This feature was introduced |

## show stats ipfix
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats ipfix [record-export-rate | time-per-export | time-per-session | total-generation-time | total-records] [node <node-name>] [<verbosity>]
```

#### Description

The _show stats ipfix_ command shows information about the 128T router&#39;s IPFIX (IP Flow Information eXport) record generation and export feature.

The output shows a number of IPFIX stats; the _record-export-rate_ is the number of IPFIX records exported per second.  The values for _time-per-session_ and _time-per-export_, both expressed in microseconds, represent the average time spent by the 128T system to generate and export IPFIX records, respectively. The _total-generation-time_, also expressed in microseconds, represents the amount of time spent generating IPFIX records since the system was started. Lastly, the _total-records_ is a counter of the number of IPFIX records generated in total.

```
user@labsystem1.fiedler> show stats ipfix
Mon 2017-07-24 11:21:59 EDT
Retrieving statistics...

IPFIX Stats
-----------
======================= =================== =======
 Metric                  Node                Value
======================= =================== =======
 record-export-rate      labsystem1              0
 time-per-export         labsystem1              0
 time-per-session        labsystem1              0
 total-generation-time   labsystem1              0
 total-records           labsystem1              0

Completed in 0.10 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.1.0   | This feature was introduced |

## show stats memory
<!-- Not updated to 4.3 -->
#### Syntax
```
show stats memory [{ capacity | used }] [node <node-name>] [<verbosity>]
```

#### Description

The _show stats memory_ command shows information about the total memory (the _capacity_ subcommand) and the used memory (the _used_ subcommand) on each node within the 128T router.

```
admin@labsystem1.fiedler# show stats memory
Wed 2016-11-02 09:43:00 EDT
Retrieving statistics...

Memory usage
------------
========== ============ ============
 Metric     Node              Value
========== ============ ============
 capacity   labsystem1   8216723456
 used       labsystem1   5796524032

Completed in 0.17 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.1.0   | This feature was introduced |
| 3.0.0   | Added _verbosity_ argument  |

## show stats metrics
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats metrics [{ active-metrics | collections-pending | collections-skipped | per-collection-latency | per-metric-latency | read-metric-latency }] [process <process>] [node <node>]
```

#### Description

The _show stats metrics commands_ display information about metrics (statistical data) collected by the 128T router for rendering to the user.

```
admin@labsystem1.fiedler# show stats metrics
Thu 2018-02-08 09:48:40 EST
Retrieving statistics...

Metrics Library Performance Measurements
----------------------------------------
======================== ========= ============ =========================== =======
 Metric                   Router    Node         Process                     Value
======================== ========= ============ =========================== =======
 active-metrics           beacon    labsystem1   databaseQueryCoordinator        6
​                                    labsystem1   dynamicPeerUpdateManager       19
​                                    labsystem1   nodeMonitor                    88
​                                    labsystem1   systemServicesCoordinator     526
 collections-pending      beacon    labsystem1   databaseQueryCoordinator        1
​                                    labsystem1   dynamicPeerUpdateManager        1
​                                    labsystem1   nodeMonitor                     1
​                                    labsystem1   systemServicesCoordinator       1
 collections-skipped      beacon    labsystem1   databaseQueryCoordinator        0
​                                    labsystem1   dynamicPeerUpdateManager        0
​                                    labsystem1   nodeMonitor                     0
​                                    labsystem1   systemServicesCoordinator       0
 per-collection-latency   beacon    labsystem1   databaseQueryCoordinator      494
​                                    labsystem1   dynamicPeerUpdateManager      710
​                                    labsystem1   nodeMonitor                  3954
​                                    labsystem1   systemServicesCoordinator   21583
 per-metric-latency       beacon    labsystem1   databaseQueryCoordinator       82
​                                    labsystem1   dynamicPeerUpdateManager       37
​                                    labsystem1   nodeMonitor                    44
​                                    labsystem1   systemServicesCoordinator      41
 read-metric-latency      beacon    labsystem1   databaseQueryCoordinator        0

Completed in 0.17 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.0.0   | This feature was introduced |
| 3.2.0   | _pending-aggregations_ renamed to _collections-pending_; _collections-skipped_ added |

## show stats packet-capture
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-capture { success | write-failure } [core <core>] [node <node>] [port <port>]
```

#### Description

The _show stats packet-capture_ commands display information about any ongoing packet capture activity that an administrator has initiated. The _success_ statistics show the number of packets that have been captured to date, the _write-failure_ statistics show the number of packets that failed to be written to a file (likely due to disk space issues).

Both the _success_ and _write-failure_ modifiers show their information in the standard, tabular format:

```
admin@labsystem1.fiedler# show stats packet-capture success
Wed 2016-11-02 09:43:24 EDT
Retrieving statistics...

Packets send to be captured
---------------------------
============ ====== =======
 Node         Port   Value
============ ====== =======
 labsystem1      2       0
 labsystem1    255       0

Completed in 0.08 seconds
```

As with most commands that display their information in this format, the _show stats packet-capture_ command can be filtered by core, node and/or port with optional command-line arguments.

```
admin@labsystem1.fiedler# show stats packet-capture success port 2
Wed 2016-11-02 09:43:41 EDT
Retrieving statistics...

Packets send to be captured
---------------------------
============ ====== =======
 Node         Port   Value
============ ====== =======
 labsystem1      2       0

Completed in 0.12 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## show stats packet-processing
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing { action | classifier | enqueue | fib-action | flow-action | fragmentation | lookup | received | sent } [core <core>] [node <node>] [<verbosity>]
```

#### Description

The _show stats packet-processing_ is a top-level category that is the umbrella category for various statistics pertaining to the 128T router&#39;s packet processing. See the following sections for details on each of the subordinate commands.

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced as a top-level category for many statistics that had been maintained elsewhere in earlier releases |

## show stats packet-processing action
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing action [{ failure | success }]
```

#### Description

The _show stats packet-processing-action_ command displays information for the various flow actions within the 128T router. Each flow, as it is instantiated by the 128T router, may have various "actions" associated with it based upon either the nature of the traffic, the configuration of the 128T router, or both.

The subcommands associated with packet-processing-action are grouped into success conditions and failure conditions, then broken down by action type, each one showing tabular data for the notable events associated with that flow action.

The various sections that follow illustrate all of the _show stats packet-processing action_ subcommands.

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.1.0   | This feature was introduced. Replaces the "show packet-processing-actions" command hierarchy in 1.0. |
| 2.0.0   | Formally "show packet-processing-action" |

## show stats packet-processing action failure
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing action failure [{ aes | bfd | ethernet-header-transform | hmac | metadata | rate-limit-check | tcp-state | ttl-validate }]
```

#### Description

The _show stats packet-processing-action failure_ command enumerates all of the different failure cases for action processing within the 128T router. As mentioned earlier, _actions_ are applied to packets received, and can perform a wide variety of functions: encryption, transformations, rate limiting, TCP state machine validation, etc. When these actions are applied to a packet and that action fails, the stats within this table are incremented.

```
admin@labsystem1.fiedler# show stats packet-processing action failure summary
Wed 2016-11-02 09:47:51 EDT
Retrieving statistics...

Failure Processing of Packet Action Stats
-----------------------------------------
============================================ ============ =======
 Metric                                       Node         Value
============================================ ============ =======
 aes data-normalization                       labsystem1       0
 aes decryption-exception                     labsystem1       0
 aes encryption-exception                     labsystem1       0
 aes get-data-length                          labsystem1       0
 aes iv-append                                labsystem1       0
 aes iv-generation                            labsystem1       0
 aes iv-seed                                  labsystem1       0
 aes metadata-decryption                      labsystem1       0
 aes metadata-encryption                      labsystem1       0
 aes no-context-found                         labsystem1       0
 aes payload-decryption                       labsystem1       0
 aes payload-encryption                       labsystem1       0
 aes set-data-length                          labsystem1       0
 bfd decode                                   labsystem1       0
 bfd echo-init                                labsystem1       0
 bfd empty-metadata                           labsystem1       0
 bfd empty-payload                            labsystem1       0
 bfd invalid-header                           labsystem1       0
 bfd metadata-parse                           labsystem1       0
 ethernet-header-transform arp-table-misses   labsystem1       0
 ethernet-header-transform packet-expansion   labsystem1       0
 hmac allocation                              labsystem1       0
 hmac cannot-find-digest                      labsystem1       0
 hmac digest-calculation                      labsystem1       0
 hmac digest-compare                          labsystem1       0
 metadata add                                 labsystem1       0
 metadata get-length                          labsystem1       0
 metadata invalid-type                        labsystem1       0
 metadata not-present                         labsystem1       0
 rate-limit-check                             labsystem1       0
 tcp-state illegal-flag-combination           labsystem1       0
 tcp-state invalid-state-transition           labsystem1       0
 ttl-validate                                 labsystem1       0

Completed in 0.42 seconds
```

| Action Category | Description |
| --- | --- |
| aes | These actions are related to the encryption and/or decryption of packets. |
| bfd | The BFD actions (Bidirectional Forwarding Detection) are associated with the inter-node and/or inter-router BFD exchanges that 128T routers use to determine health, aliveness, and utilization. |
| ethernet-header-transform | Ethernet headers are transformed (rewritten) as packets are sent to next hop gateways or hosts. (The source and destination MAC addresses.) |
| hmac | HMAC (Hash-based Message Authentication Code) is used to authenticate that the sender of a message is who it says that it is. 128T routers optionally use HMAC to authenticate one another – essentially "signing" packets to validate the authenticity of the source. |
| ip-header-transform | IP headers are transformed to change one protocol into another; notably, ICMP is transformed to UDP when sent via SVR to another 128T peer. |
| metadata | 128T routers use metadata to exchange state with one another. The insertion and removal of metadata are common actions at the outset of a new session. |
| rate-limit-check | Rate limiting (in bytes per second) is a flow-based action. |
| tcp-state | The 128T router will "follow" the TCP state machine for TCP-based flows (ensuring that the three-way handshake is completed within a set amount of time, for example). Checking the validity of the TCP state is a flow action. |
| ttl-validate | TTL (Time To Live) validation is used within IP networks as a last resort for loop prevention. |

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show stats packet-processing action success
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing action success [{ aes | bfd | detour | dpi | drop | forward | hmac | metadata | rate-limit-check | tcp-state | ttl-validate }]
```

#### Description

Like the _show stats packet-processing action failure_ command, the _show stats packet-processing-action success_ command enumerates all of the different cases for action processing within the 128T router, but in this case ones that have completed successfully. When these actions are applied to a packet and that action succeeds, the stats within this table are incremented.

```
admin@labsystem1.fiedler# show stats packet-processing action success summary
Wed 2016-11-02 09:57:03 EDT
Retrieving statistics...

Successful Processing of Packet Action Stats
--------------------------------------------
=========================================== ============ =======
 Metric                                      Node         Value
=========================================== ============ =======
 aes metadata-decryption                     labsystem1       0
 aes metadata-encryption                     labsystem1       0
 aes metadata-false-positive-detected        labsystem1       0
 aes no-metadata                             labsystem1       0
 aes no-payload                              labsystem1       0
 aes payload-decryption                      labsystem1       0
 aes payload-encryption                      labsystem1       0
 bfd async-processed                         labsystem1       0
 bfd echo-processed                          labsystem1       0
 detour                                      labsystem1       0
 dpi encryption detected                     labsystem1       0
 dpi encryption enqueue                      labsystem1       0
 drop                                        labsystem1       0
 ethernet-header-transform                   labsystem1       0
 forward to-wire                             labsystem1       0
 hmac append-no-payload                      labsystem1       0
 hmac digest-added                           labsystem1       0
 hmac digest-removed                         labsystem1       0
 hmac not-required                           labsystem1       0
 hmac validate-no-payload                    labsystem1       0
 metadata add-false-positive-correction      labsystem1       0
 metadata add-not-required                   labsystem1       0
 metadata added                              labsystem1       0
 metadata propagate-not-required             labsystem1       0
 metadata remove-false-positive-correction   labsystem1       0
 metadata remove-not-required                labsystem1       0
 metadata removed                            labsystem1       0
 metadata right-lane-sent                    labsystem1       0
 metadata updated                            labsystem1       0
 rate-limit-check                            labsystem1       0
 tcp-state                                   labsystem1       0
 ttl-validate                                labsystem1       0

Completed in 0.40 seconds
```

| Action Category | Description |
| --- | --- |
| aes | These actions are related to the encryption and/or decryption of packets. |
| bfd | The BFD actions (Bidirectional Forwarding Detection) are associated with the inter-node and/or inter-router BFD exchanges that 128T routers use to determine health, aliveness, and utilization. |
| detour | The detour action diverts packets from the "fast lane" (switching fabric) to the control path for further processing. |
| dpi | DPI, or Deep Packet Inspection, is used to peer into the payload of a packet for various patterns to perform more granular classification. |
| drop | As its name implies, this action causes a packet to be dropped. |
| ethernet-header-transform | Ethernet headers are transformed (rewritten) as packets are sent to next hop gateways or hosts. (The source and destination MAC addresses.) |
| forward | This action is used to indicate that a packet should be forwarded out of the 128T router and onto its next hop. |
| hmac | HMAC (Hash-based Message Authentication Code) is used to authenticate that the sender of a message is who it says that it is. 128T routers optionally use HMAC to authenticate one another – essentially "signing" packets to validate the authenticity of the source. |
| ip-header-transform | IP headers are transformed to change one protocol into another; notably, ICMP is transformed to UDP when sent via SVR to another 128T peer. |
| metadata | 128T routers use metadata to exchange state with one another. The insertion and removal of metadata are common actions at the outset of a new session. |
| rate-limit-check | Rate limiting (in bytes per second) is a flow-based action. |
| tcp-state | The 128T router will "follow" the TCP state machine for TCP-based flows (ensuring that the three-way handshake is completed within a set amount of time, for example). Checking the validity of the TCP state is a flow action. |
| ttl-validate | TTL (Time To Live) validation is used within IP networks as a last resort for loop prevention. |

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show stats packet-processing classifier
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing classifier [{ received ... | sent ... }] [node <node>] [port <port>]
```

#### Description

As packets are received by a 128T router, an initial classification is done to determine further treatment and processing. Most basic Layer 2 through Layer 4 types are classified and categorized, and reflected in the _show stats packet-processing classifier received_ tables.

The _show stats packet-processing classifier sent_ tables likewise return statistics regarding the number of packets of various L2-L4 types that the 128T router transmits.

The _received_ and _sent_ options are enumerated in the sections that follow.

Both the _received_ and _sent_ options are displayed in tabular format that breaks down the quantities by node and device port; the output for these tables may optionally be filtered to specific nodes and/or device ports by supplying them as arguments to the command line.

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## show stats packet-processing classifier received
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing classifier received ... [node <node>] [port <port>]
```

#### Description

This command displays the current tally of the various types of packets that the 128T router has received. The table below enumerates that various statistics that are accumulated and a brief description for each.

| Classification | Description |
| --- | --- |
| arp | Incremented for each ARP packet received (both requests and replies). |
| broadcast-mac-discards | Incremented when packets are discarded due to the presence of a broadcast MAC address (FF:FF:FF:FF:FF:FF). |
| dhcp | Incremented with each received DHCP packet. |
| discards | Incremented when packets are discarded because the classifier did not recognize them as a known type. |
| exception | The number of software exceptions encountered when classifying packets. |
| icmp | The count of all received ICMP (IPv4) packets. |
| icmp-ttl-discards | The number of ICMP packets discarded due to its time to live reaching zero (0). |
| icmpv6 | The count of all received ICMPv6 packets. |
| icmpv6-hop-limit-discards | The number of ICMPv6 packets discarded due to their hop limit being reached. |
| icmpv6-link-local-discards | The number of link-local ICMPv6 packets discarded. |
| invalid-header-length | The number of received packets that had an invalid IP header length. |
| invalid-ipv6 | The number of invalid IPv6 packets received. |
| invalid-length | The number of received packets that had an invalid length (mismatch between received size and advertised size). |
| ipv4 | The total number of IPv4 packets that the 128T router has classified. |
| ipv4-fabric-fragmented | The number of IPv4 "fabric fragments" (packets that are fragmented between two 128T devices) received. |
| ipv4-fragmented | The total number of fragmented IPv4 packets that the 128T router has classified. (Including all fragments.) |
| ipv6 | The total number of IPv6 packets that the 128T router has classified. |
| ipv6-fabric-fragmented | The number of IPv6 "fabric fragments" (packets that are fragmented between two 128T devices) received. |
| ipv6-fragmented | The total number of fragmented IPv6 packets that the 128T router has classified. (Including all fragments.) |
| is-is | The total number of IS-IS (Intermediate System to Intermediate System) packets classified on receipt. |
| lacp | The total number of LACP (Link Aggregation Control Protocol) packets that have been classified on receipt. |
| ndp | The total number of NDP (Neighbor Discovery Protocol) packets that have been received and classified. |
| ospf | The total number of OSPF (Open Shortest Path First) routing packets that have been received and classified. |
| other-layer-4-protocol | This statistic counts the number of packets that have been received that do not fall into a known type (TCP, UDP, SCTP). |
| sctp | The total number of SCTP (Stream Control Transport Protocol) packets that have been received. |
| tcp | The total number of TCP (Transmission Control Protocol) packets that have been received. |
| total | The total number of packets that have been received, irrespective of type. |
| tunnel | The number of packets that have been received that were tunneled. |
| udp | The total number of UDP (User Datagram Protocol) packets that have been received. |
| unknown-layer-3-protocol-discards | The number of packets received that had a Layer 3 type that the classifier does not recognize. |
| vlan | The number of packets received that had a VLAN tag. |

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 2.0.0   | was "show stats packet-classifier received" |
| 3.2.0   | added several more categories of classified packets |

## show stats packet-processing classifier sent
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing classifier sent ... [node <node>] [port <port>]
```

#### Description

This command displays the current tally of the various types of packets that the 128T router has transmitted. The table below enumerates that various statistics that are accumulated and a brief description for each.

| Classification | Description |
| --- | --- |
| arp | This statistic counts the number of ARP packets (requests and replies) that the 128T router has sent. |
| dhcp | This counts the number of DHCP packets that the 128T router has sent. |
| icmp | This statistic counts the number of IPv4 ICMP packets that the 128T router has sent. |
| icmpv6 | This statistic counts the number of IPv6 ICMP packets that the 128T router has sent. (Note: IPv6 is not currently available.) |
| ipv4 | This statistic counts the total number of IPv4 packets that the 128T router has sent. |
| ipv4-fabric-fragmented | The number of IPv4 "fabric fragments" (packets that are fragmented between two 128T devices) that have been sent. |
| ipv4-fragmented | This statistic counts the total number of fragmented IPv4 packets that the 128T router has sent. |
| ipv6 | This statistic counts the number of IPv6 packets that the 128T router has sent. (Note: IPv6 is not currently available.) |
| ipv6-fabric-fragmented | The number of IPv6 "fabric fragments" (packets that are fragmented between two 128T devices) that have been sent. |
| ipv6-fragmented | This statistic counts the number of fragmented IPv6 packets that the 128T router has sent. (Note: IPv6 is not currently available.) |
| is-is | This statistic counts the number of IS-IS packets that the 128T router has sent. (Note: IS-IS is not currently supported.) |
| lacp | This statistic counts the number of LACP packets that the 128T router has sent. (Note: LACP is not currently available.) |
| ndp | This statistic counts the number of NDP packets that the 128T router has sent. (Note: IPv6 is not currently available.) |
| ospf | This statistic counts the number of OSPF packets that the 128T router has sent. |
| other-layer-3-protocol | This statistic counts the number of packets that the 128T router has sent that do not fall into one of the other, counted network-layer categories. |
| other-layer-4-protocol | This statistic counts the number of packets that the 128T router has sent that do not fall into one of the other, counted transport-layer categories. (I.e., TCP, UDP, SCTP.) |
| sctp | This statistic counts the number of SCTP packets that the 128T router has sent. |
| tcp | This statistic counts the number of TCP packets that the 128T router has sent. |
| total | This shows the total number of packets that the 128T router has transmitted. |
| tunnel | This shows the number of packets that have been transmitted that are encapsulated in a tunnel. |
| udp | This statistic counts the number of UDP packets that the 128T router has sent. |
| vlan | This statistic reflects the number of packets that the 128T router has sent that include a VLAN tag. |

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 2.0.0   | was "show stats packet-classifier sent" |
| 3.2.0   | added several more categories of classified packets |

## show stats packet-processing enqueue
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing enqueue ... [node <node >] [port <port>] [<verbosity>]
```

#### Description

This command displays information about the various queues within the 128T router&#39;s traffic management and packet processing subsystems. At various points in a packet&#39;s lifecycle through the 128T router it is enqueued for processing; the subcommands associated with _show stats packet-processing enqueue_ give tallies for the successful, and unsuccessful enqueue events.

Generally speaking, the various failure modes listed below are typically incremented when a queue is full – not draining as fast as packets are arriving. This is usually due to an unexpected flood of inbound packets.

The various subcommands are listed below:

| Subcommand | Description |
| --- | --- |
| to-controller-failure | This statistic counts the number of failure events when a control packet is unable to be enqueued when destined for the "fast lane controller". (Generally, the first packet of a new session.) |
| to-controller-success | This counts the number of successfully enqueued packets destined for the fast lane controller. |
| to-deferred-ring-failure | This statistic counts the number of failure events when a packet is unable to be enqueued when destined for the traffic engineering subsystem (e.g., for scheduling). |
| to-deferred-ring-success | This counts the number of successfully enqueued packets destined for the traffic engineering subsystem. |
| to-worker-core-failure | This statistic counts the number of failure events when a packet is unable to be enqueued back into the fast lane from the controller (generally, the first packet of a new session that has been processed by the controller). |
| to-worker-core-success | This counts the number of successfully enqueued packets destined for egress processing. |

A representative sample command is given here:

```
admin@labsystem1.fiedler# show stats packet-processing enqueue to-controller-success
Tue 2016-11-01 10:23:46 EDT
Retrieving statistics...

Enqueued Control Packets
------------------------
============ =======
 Node         Value
============ =======
 labsystem1       5

Completed in 0.07 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced. Replaces (deprecates) _show stats fast-lane-enqueue_ from pre-2.0 software releases. |
| 3.2.0   | Reorganized statistics and renamed several categories |

## show stats packet-processing fib-action
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing fib-action ... [node <node>] [port <port>] [ <verbosity>]
```

#### Description

FIB entries in the 128T router may have associated "actions", which affect the packet&#39;s processing logic upon entry into the router. (Note: FIB lookups happen logically later than flow table lookups; for statistics related to flow table action events, refer to the section on _show stats packet-processing flow-action_).

The _show stats packet-processing fib-action_ table shows success, failure, and exception events (counters). More detail on success and failure events can be seen in the output from _show stats packet-processing action_. When the action processing has an exception, this means an internal error has occurred in attempting the action processing.

```
admin@test1.Fabric128# show stats packet-processing fib-action
Tue 2016-11-01 13:33:38 EDT
Retrieving statistics...

Fib Action Summary Stats
------------------------
=========== ======= ====== =======
 Metric      Node    Port   Value
=========== ======= ====== =======
 exception   test1     10       0
​             test1     11       0
​             test1    255       0
 failure     test1     10       0
​             test1     11       0
​             test1    255       0
 success     test1     10    2266
​             test1     11    2266
​             test1    255       0

Completed in 0.12 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |
| 2.1.0   | Renamed. Was _show stats packet-processing fib-action-summary_ |

## show stats packet-processing flow-action
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing flow-action ... [node <node>] [port <port>]
```

#### Description

Flow entries in the 128T router may have associated "actions", which affect the packet&#39;s processing logic upon entry into the router. Flow lookups happen very early in a packet&#39;s lifecycle within the 128T router, so it is quite common for these values to be large..

The _show stats packet-processing flow-action_ table shows success, failure, and exception events (counters). More detail on success and failure events can be seen in the output from _show stats packet-processing action_. When the action processing has an exception, this means an internal error has occurred in attempting the action processing.

```
admin@test1.Fabric128# show stats packet-processing flow-action
Tue 2016-11-01 13:31:44 EDT
Retrieving statistics...

Flow Action Summary Stats
-------------------------
=========== ======= ====== =========
 Metric      Node    Port     Value
=========== ======= ====== =========
 exception   test1     10         0
​             test1     11         0
​             test1    255         0
 failure     test1     10         1
​             test1     11         0
​             test1    255         0
 success     test1     10   2492074
​             test1     11   2492090
​             test1    255         0

Completed in 0.12 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |
| 2.1.0   | Renamed. Was _show stats packet-processing flow-action-summary_ |

## show stats packet-processing fragmentation
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing fragmentation [{ received | sent }]
```

#### Description

The _show stats packet-processing fragmentation_ statistics capture information about all of the fragmented IP packets that the 128T router processes (both received fragments and transmitted fragments). The _received_ and _sent_ commands are detailed below.

A comprehensive list of all fragmentation-related statistics is available via the command _show stats packet-processing fragmentation_ with no subcommand specified. Be advised, this command can take quite some time to complete due to the number of queries it generates.

```
admin@test1.Fabric128# show stats packet-processing fragmentation
Tue 2016-11-01 13:41:13 EDT
Retrieving statistics...

Fragmentation and Reassembly Stats
----------------------------------
======================================== ======= ====== =======
 Metric                                   Node    Port   Value
======================================== ======= ====== =======
 received duplicate-first-fragment        test1     10       0
​                                          test1     11       0
​                                          test1    255       0
 received duplicate-last-fragment         test1     10       0
​                                          test1     11       0
​                                          test1    255       0
...
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 2.0.0   | Renamed. Was _show stats fragmentation_ |

## show stats packet-processing fragmentation received
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing fragmentation received [{ duplicate-first-fragment | duplicate-last-fragment | failure-to-reassemble | fragment-chains-discarded | fragment-chains-exceeded | fragment-chains-timeout | incomplete-fragments | invalid-length-first-fragment | successfully-reassembled }] [node <node>] [port <port>]
```

#### Description

Fragmented IP packets, as the name implies, are large packets split into smaller pieces prior to delivery. The fragments may arrive in any order, and must be reassembled by the recipient. If any of the fragments fail to arrive, the remaining fragments are of no value and are discarded. The _show stats packet-processing fragmentation received_ statistics categorize different observed behaviors (one success case and several failure cases) with fragmented packets and increment statistics accordingly.

The _duplicate-first-fragment_ and _duplicate-last-fragment_ modifiers increment when the particular fragment arrives twice. The _failure-to-reassemble_ increments when the 128T router cannot reassemble all of the fragments (usually due to missing fragments).

Fragments are reassembled in what are called "fragment chains". There are three statistics specific to the fragment chains: _fragment-chains-discarded_ counts the number of times a fragment chain is discarded due to an error (not receiving all fragments, errored fragments, etc.); _fragment-chains-exceeded_ is incremented when the 128T router does not have any available fragment chains to queue packets for reassembly; _fragment-chain-timeout_ is when a fragment chain does not receive all fragments for a given reassembly job within ten (10) seconds.

The _incomplete-fragments_ modifier shows the number of reassembly jobs that were missing fragments. The _invalid-length-first-fragment_ modifier increments when a fragment arrives with a misadvertised length.

The _successfully-reassembled_ modifier shows the number of fragment chains that have collected all fragments and completed reassembly with no errors.

All of the commands within _show stats packet-processing fragmentation_ display their information similarly; one such example is below. The output may optionally be filtered by data node and/or port by adding the appropriate modifiers.

```
admin@test1.Fabric128# show stats packet-processing fragmentation received successfully-reassembled
Tue 2016-11-01 13:49:44 EDT
Retrieving statistics...

Successfully Reassembled
------------------------
======= ====== =======
 Node    Port   Value
======= ====== =======
 test1     10       0
 test1     11       0
 test1    255       0

Completed in 0.02 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 2.0.0   | Renamed. Was _show stats fragmentation received_ |

## show stats packet-processing fragmentation sent
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing fragmentation sent { fragmentation-creation-failure | ipv4-dont-fragment-drop | ipv4-fabric-fragments | ipv4-non-fabric-fragments | ipv4-packets-fragmented | ipv6-fabric-fragments | ipv6-mtu-exceeded-drop | ipv6-packets-fragmented | unknown-l2-version } [node <node>] [port <port>]
```

#### Description

The complement to the _receive_ statistics are the _show stats fragmentation sent_ statistics, which account for all of the packets that the 128T router performs fragmentation on.

The _fragmentation-creation-failure_ counts all instances where the 128T router cannot fragment a packet (internal error). The _ipv4-dont-fragment-drop_ counts all packets dropped because they exceed the path MTU and have the "don&#39;t fragment" bit set (hence the 128T router cannot fragment it). The _ipv4-packets-fragmented_ and _ipv6-packets-fragmented_ counters are a running total of the number of packets (not fragments) that have been fragmented. The _ipv4-fabric-fragments_ and _ipv6-fabric-fragments_ counters are a running total of the number of fragmented packets sent over a "fabric" link (i.e., using Secure Vector Routing) between 128T routers. The _unknown-l2-version_ counts the number of jumbo packets with an unknown (and therefore unhandled) L2 type.

All of the commands within _show stats packet-processing fragmentation_ display their information similarly; one such example is below. The output may optionally be filtered by data node and/or port by adding the appropriate modifiers.

```
admin@test1.Fabric128# show stats packet-processing fragmentation sent ipv4-packets-fragmented
Tue 2016-11-01 13:52:48 EDT
Retrieving statistics...

Fragmented IPv4 Packets
-----------------------
======= ====== =======
 Node    Port   Value
======= ====== =======
 test1     10       0
 test1     11       0
 test1    255       0

Completed in 0.17 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 2.0.0   | Renamed. Was _show stats fragmentation sent_ |
| 3.2.0   | added _ipv4-fabric-fragments_, _ipv6-fabric-fragments_ |

## show stats packet-processing lookup
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing lookup ... [node <node>] [core <core>] [port <port>]
```

#### Description

This command displays the current tally of various lookup table activity on the 128T router&#39;s data path. The various subcommands beneath _show stats packet-processing lookup_ are enumerated in the sections that follow.

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show stats packet-processing lookup access-policy-table
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing lookup access-policy-table ... [node <node>] [core <core>] [port <port>]
```

#### Description

The access-policy-table statistics increment as sessions are established based on whether or not the access-policy criteria specified in the services are "hits" (matched) or "misses" (not matched). The "lock-failure" mode is an internal troubleshooting tool for 128 Technology&#39;s support team. By omitting the subcommand, a table with data regarding all subcommands (hit, lock-failure, and miss) is shown.

This show command presents the access-policy statistics in tabular format, based on ingress port (as defined in a configured device-interface).

```
admin@test1.Fabric128# show stats packet-processing lookup access-policy-table
Tue 2016-11-01 13:57:17 EDT
Retrieving statistics...

Access Policy Table Stats
-------------------------
========= ======= ====== =======
 Metric    Node    Port   Value
========= ======= ====== =======
 allow     test1     10    2266
​           test1     11    2268
​           test1    255       0
 deny      test1     10       0
​           test1     11       0
​           test1    255       0
 failure   test1     10       0
​           test1     11       0
​           test1    255       0
 miss      test1     10       0
​           test1     11       0
​           test1    255       0

Completed in 0.07 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 2.0.0   | Renamed. was _show stats access-policy-table_ |

## show stats packet-processing lookup fib-table
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing lookup fib-table ... [node <node>] [core <core>] [port <port>]
```

#### Description

Each packet-forwarding component of the 128T router maintains a Forwarding Information Base (FIB) that includes rules for packet processing. When packets arrive that do not match an established flow, the system performs a FIB query to determine their disposition. This table records those events; the _hit_ table is when a match is found, the _miss_ table contains a tally of the times when no match was found.

```
admin@test1.Fabric128# show stats packet-processing lookup fib-table
Tue 2016-11-01 13:58:15 EDT
Retrieving statistics...

FIB Table Stats
---------------
======== ======= ====== ========
 Metric   Node    Port    Value
======== ======= ====== ========
 hit      test1     10     2266
​          test1     11     2268
​          test1    255        0
 miss     test1     10   185857
​          test1     11   182505
​          test1    255        0

Completed in 0.12 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 2.0.0   | Renamed. was _show stats fib-table_ |

## show stats packet-processing lookup flow-table
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing lookup flow-table ... [node <node>] [core <core>] [port <port>]
```

#### Description

One of the first operations performed by a 128T router for each inbound packet is to check its flow table to see if it belongs to an existing flow. The flow-table statistics show the results of this check, be they successful (_flow-table hit_) or unsuccessful (_flow-table miss_).

```
admin@test1.Fabric128# show stats packet-processing lookup flow-table
Tue 2016-11-01 13:59:24 EDT
Retrieving statistics...

Flow Table Stats
----------------
======== ======= ====== ==========
 Metric   Node    Port      Value
======== ======= ====== ==========
 hit      test1     10   16510515
​          test1     11   16507731
​          test1    255          0
 miss     test1     10     188123
​          test1     11     184773
​          test1    255          0

Completed in 0.07 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 2.0.0   | Renamed. was _show stats flow-table_ |

## show stats packet-processing lookup icmp-table
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing lookup icmp-table ... [node <node>] [core <core>] [port <port>]
```

#### Description

The 128T router&#39;s "ICMP blackhole" feature lets administrator selectively decide when to respond to external ICMP packets. The _show stats icmp-table_ statistics show the activity related to this ICMP blackholing – i.e., when a network-interface&#39;s _icmp_ is set to _drop_.

```
admin@test1.Fabric128# show stats packet-processing lookup icmp-table
Tue 2016-11-01 14:00:59 EDT
Retrieving statistics...

Icmp Blackhole Stats
--------------------
============ ======= ====== =======
 Metric       Node    Port   Value
============ ======= ====== =======
 ipv4 allow   test1     10       0
​              test1     11       0
​              test1    255       0
 ipv4 deny    test1     10       0
​              test1     11       0
​              test1    255       0
 ipv6 allow   test1     10       0
​              test1     11       0
​              test1    255       0
 ipv6 deny    test1     10       0
​              test1     11       0
​              test1    255       0

Completed in 0.12 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show stats packet-processing lookup tenant-table
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing lookup tenant-table ... [node <node>] [core <core>] [port <port>]
```

#### Description

The 128T router&#39;s tenant lookup table is used to ascribe inbound packets to configured _tenants_. The resultant of the lookup is used in a subsequent lookup, the tenant-specific FIB lookup, to decide on the disposition for that packet.

Entries into the tenant table are populated by configuration on the 128T router. Each _interface_ contributes to the source lookup table, with its assigned tenant (or the "global tenant" in the absence of an assigned tenant). Each service-route will create an entry in the tenant table, assigned to the tenant of the service that agent belongs to. Also, each waypoint (for internode "router" traffic) creates an entry into the table.

The _hit_ modifier shows the normal (success) case, when a tenant is found in the lookup. The _miss_ modifier shows the failure case, when no tenant can be found; in this case, the packet will be tallied and dropped. The _lock-failure_ modifier increments when a lookup fails because the fast lane cannot obtain exclusive access to the source lookup table.

```
admin@labsystem1.fiedler# show stats packet-processing lookup tenant-table
Wed 2016-11-02 10:30:46 EDT
Retrieving statistics...

Tenant Table Stats
------------------
========= ============ ====== =======
 Metric    Node         Port   Value
========= ============ ====== =======
 failure   labsystem1      2       0
​           labsystem1    255       0
 hit       labsystem1      2       0
​           labsystem1    255       0
 miss      labsystem1      2       0
​           labsystem1    255       0

Completed in 0.25 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 2.0.0   | Renamed. was _show stats source-lookup-table_ |

## show stats packet-processing received
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing received [{ control-block-alloc-failure | control-success | egress-success | interface-standby-drop | interface-success }] [node <node>] [core <core>] [port <port>] [<verbosity>]
```

#### Description

This command displays the current types of events that can transpire upon receipt of packets. The various subcommands are listed in the sections that follow.

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show stats packet-processing received control-block-alloc-failure
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing received control-block-alloc-failure [node <node>] [core <core>] [port <port>] [<verbosity>]
```

#### Description

This statistic shows the number of times that the 128T router was unable to allocate a packet control block, a data structure used for each connection. This type of resource exhaustion is an abnormal event; this command is usually only run at the request of 128 Technology&#39;s support organization to diagnose a specific problem. As with other _show stats_ commands, this one may be filtered by node and/or port to refine the output.

```
admin@test1.Fabric128# show stats packet-processing received control-block-alloc-failure
Tue 2016-11-01 14:20:12 EDT
Retrieving statistics...

Packet Control Block Allocation Failures
----------------------------------------
======= ====== =======
 Node    Port   Value
======= ====== =======
 test1     10       0
 test1     11       0
 test1    255       0

Completed in 0.07 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 2.0.0   | Renamed. Was _show stats control-block-pool-exhausted_ |

## show stats packet-processing received control-success
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing received control-success [node <node>] [core <core>] [port <port>] [<verbosity>]
```

#### Description

Control packets are used within the 128T router to communicate between various software processes. The _show stats packet-processing received control-success_ statistics are incremented when control packets are sent between the fast lane and the Highway Manager process. This occurs when events such as adding an interface occurs, or when AES encryption is enabled or disabled. This command is generally only run at the direct request of 128 Technology&#39;s support team, when troubleshooting a reported issue.

```
admin@test1.Fabric128# show stats packet-processing received control-success
Tue 2016-11-01 14:33:09 EDT
Retrieving statistics...

Control Packets Received
------------------------
======= ====== =======
 Node    Port   Value
======= ====== =======
 test1     10       0
 test1     11       0
 test1    255      13

Completed in 0.12 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 2.0.0   | Renamed. Was _show stats control-packets-received_ |

## show stats packet-processing received injected-success
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing received injected-success [node <node>] [core <core>] [port <port>] [<verbosity>]
```

#### Description

This statistic shows the number of packets that have been received in the "fast lane" (where fast packet processing occurs) that are destined for an egress interface.

```
admin@test1.Fabric128# show stats packet-processing received injected-success
Tue 2016-11-01 14:26:37 EDT
Retrieving statistics...

Injected Packets Received
-----------------------
======= ====== =======
 Node    Port   Value
======= ====== =======
 test1     10   25347
 test1     11   32270
 test1    255       0

Completed in 0.12 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 2.0.0   | Renamed. Was _show stats control-block-pool-exhausted_ |
| 3.2.0   | Renamed. Was _show stats packet-processing received egress-success_ |

## show stats packet-processing received interface-standby-drop
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing received interface-standby-drop [node <node>] [core <core>] [port <port>] [<verbosity>]
```

#### Description

This statistic shows the number of times that a packet was received by an interface that is in "standby" – i.e., it is not the active interface in a redundancy group. When a 128T router receives a packet on an interface that is in standby, it drops it and increments these counters.

```
admin@test1.Fabric128# show stats packet-processing received interface-standby-drop
Tue 2016-11-01 14:24:24 EDT
Retrieving statistics...

Packets Dropped on Standby Interface
------------------------------------
======= ====== =======
 Node    Port   Value
======= ====== =======
 test1     10     192
 test1     11       0
 test1    255       0

Completed in 0.12 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show stats packet-processing received interface-success
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing received interface-success [node <node>] [core <core>] [port <port>] [<verbosity>]
```

#### Description

This statistic shows the number packets successfully received from an interface.

```
admin@test1.Fabric128# show stats packet-processing received interface-success
Tue 2016-11-01 14:21:34 EDT
Retrieving statistics...

Packets Received from Interface
-------------------------------
======= ====== ==========
 Node    Port      Value
======= ====== ==========
 test1     10   27930555
 test1     11   27925830
 test1    255          0

Completed in 0.04 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show stats packet-processing sent
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats packet-processing sent [interface-failure | interface-standby-drop | interface-success] [node <node >] [port <port>] [core <core>] [<verbosity>]
```

#### Description

This command displays the current tally of the various types of packets that the 128T router has transmitted (or failed to transmit, as the case may be). The table below enumerates that various statistics that are accumulated and a brief description for each.

| Subcommand | Description |
| --- | --- |
| interface-failure | Incremented for each packet that fails to be transmitted via an egress interface for an unspecified reason. |
| interface-retry | Incremented each time a packet transmission is retried. |
| interface-standby-drop | Incremented for each packet that is dropped because the interface it would use is the standby interface within a redundant pair of interfaces. |
| interface-success | Incremented for each packet that successfully egresses the router. |

```
admin@test1.Fabric128# show stats packet-processing sent summary
Wed 2016-11-02 10:44:22 EDT
Retrieving statistics...

sent
----
============================= ======= ============
 Metric                        Node    Value
============================= ======= ============
 interface-failure             test1            0
 interface-retry               test1            0
 interface-standby-drop        test1            0
 interface-success             test1   1851260123
 interface-unconfigured-drop   test1            0

Completed in 0.15 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |
| 3.2.0   | Added _interface-retry_ statistics |

## show stats process
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats process [{ cpu | memory }] [pid <value>[,<value>...] ] [process-name <name>[,<name>] ]
```

#### Description

The _show stats process_ command shows memory and CPU consumption for various processes on the routers and nodes in your deployment. You can specify which process (via its ID, or PID) if this is known, or by a process&#39;s name (if known).

```
admin@cnd1.conductor# show stats process
Thu 2018-02-08 10:47:02 EST
Retrieving statistics...

Process Stats
-------------
============= =========== ====== ======= ================= =========
 Metric        Router      Node     Pid   Process-name        Value
============= =========== ====== ======= ================= =========
 cpu usage     conductor   cnd1   15165   java                    1
                           cnd1   15197   ssh                     1
                           cnd1   15211   sshd                    1
                           cnd1   15262   java                    5
                           cnd1   15264   systemServicesC         2
                           cnd1   15276   stateMonitor            1
                           cnd1   15281   nodeMonitor             7
                           cnd1   16630   atop                    5
 memory rss    conductor   cnd1   11072   salt-master         57380
                           cnd1   11908   salt-master         57384
                           cnd1   15165   java               106608
                           cnd1   15167   persistentDataM     88488
                           cnd1   15262   java              1049432
                           cnd1   15283   node                86476
                           cnd1   15624   _event_publishe     80396
                           cnd1   15801   salt-master         59452
...
```

These are used for memory or CPU consumption issues and are unusual events that will generally be requested by 128 Technology&#39;s support organization for triage purposes.

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.2.0   | This feature was introduced |

## show stats redis-server-manager
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats redis-server-manager [{ redis-server-inactives | redis-server-network-flaps | redis-session-expirations }] [node <node>] [<verbosity>]
```

#### Description

The _show stats redis-server-manager_ displays information around the database used by the 128T routing software to hold state information for its high availability processing. The _redis-server-inactives_ metric is the number of events where a node could not connect to the database; the _redis-server-network-flaps_ counts the number of network events that caused connectivity problems to the database, and the _redis-session-expiration_ counts the number of connections that were torn down due to detection of a stale connection.

```
admin@labsystem1.fiedler# show stats redis-server-manager
Mon 2017-02-27 13:00:38 EST
Retrieving statistics...

Redis Server Manager Stats
--------------------------
============================ ============ =======
 Metric                       Node         Value
============================ ============ =======
 redis-server-inactives       labsystem1       0
 redis-server-network-flaps   labsystem1       0
 redis-session-expirations    labsystem1       0

Completed in 0.13 seconds
```

These are used for troubleshooting high availability failures and/or session loss and are unusual events that will generally be requested by 128 Technology&#39;s support organization for triage purposes.

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.0.0   | This feature was introduced |

## show stats redundancy
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats redundancy [{ database-connection | port-initialization | port-list-records | session-delete | session-errors | session-reads | session-reconstruction | session-refresh | session-writes }] [node <node>] [<verbosity>]
```

#### Description

The _show stats redundancy_ commands show statistics related to the 128T router&#39;s behavior when configured in a redundant (highly available) pair of nodes. These commands can be helpful in diagnosing the behavior of a system when an active node has relinquished control to its mated pair, and to check on the resiliency of the active sessions that have been established.

The subcommands within _show stats redundancy_ provide more detail on each of the various counters and are discussed in the sections that follow.

These commands are typically only run at the request of 128 Technology&#39;s support team, and to diagnose specific network conditions. This information, when combined with 128T log output, will help the support team to isolate network anomalies.

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show stats redundancy database-connection
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats redundancy database-connection [{ active-connections | client-disconnect | connect | error-disconnect | errors | failed-connect }] [node <node>] [<verbosity>]
```

#### Description

The _show stats redundancy database-connection_ set of commands list the statistics related to the 128T router&#39;s internal database used to track and replicate data between two nodes in a mated pair of Controls/Combos.

These commands are typically only run at the request of 128 Technology&#39;s support team, and to diagnose specific network conditions. This information, when combined with 128T log output, will help the support team to isolate network anomalies.

The various subcommands within _show stats redundancy database-connection_ are described in the table that follows:

| Subcommand | Description |
| --- | --- |
| active-connections | This tracks the number of active connections to the redundancy database. |
| client-disconnect | This indicates the number of instances of a client successfully disconnecting from the redundancy database. |
| connect | This tracks the number of instances when a client connects to the database. |
| error-disconnect | This tracks the number of instances when a client has been disconnected from the redundancy database due to an internal error. |
| errors | This tracks the total number of errors (during client connection and disconnection) by the database. |
| failed-connect | This counts the number of failed connection attempts by a client to the redundancy database. |

```
admin@labsystem1.fiedler# show stats redundancy database-connection
Tue 2016-11-15 15:17:03 EST
Retrieving statistics...

Client Connection stats
-----------------------
==================== =================== =======
 Metric               Node                Value
==================== =================== =======
 active-connections   labsystem1              2
 client-disconnect    labsystem1              0
 connect              labsystem1              2
 error-disconnect     labsystem1              0
 errors               labsystem1              0
 failed-connect       labsystem1              0

Completed in 0.12 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show stats redundancy port-initialization
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats redundancy port-initialization [{ marker-query-pending | marker-record-found | marker-record-not-found | marker-record-read-error | marker-record-write | pending-queries }] [node <node>] [<verbosity>]
```

#### Description

The _show stats redundancy port-initialization_ tables show statistics related to allocation of "port blocks" from the redundancy database. Various functions on the 128T router require allocation of specific IP:port tuples (e.g., source NAT and waypoint flows) choose ports to uniquely identify sessions as they traverse the node(s). These ports must be preserved during failover, and a newly active system must not inadvertently choose a port selected by a system that had relinquished the active role (i.e., cause what is called a "collision"). The behaviors of the mechanism for ensuring port continuity and uniqueness is reflected in this table.

These commands are typically only run at the request of 128 Technology&#39;s support team, and to diagnose specific network conditions. This information, when combined with 128T log output, will help the support team to isolate network anomalies.

| Subcommand | Description |
| --- | --- |
| marker-query-pending | At boot or after one of its interfaces has become active, a 128T router will issue a "marker query" to the redundancy database for each interface. This meter reflects the number of outstanding queries that have not yet received a reply. This value should typically be zero (0). |
| marker-record-found | This increments when a request for a marker record results in a match. (Generally at failover or restart.) |
| marker-record-not-found | This increments when a request for a marker record finds no match. (Generally at cold boot.) |
| marker-record-read-error | This value increments when a system cannot read the marker record from the database. This is |
| marker-record-write | This indicates the number of marker records tht a 128T router sets in the redundancy database after querying for an existing marker record and not finding one. This typically happens only during initial boot or when a system needs to grow the port range it has in use. |
| pending-queries | This meter will increment during boot, and is generally caused by the timing of the various 128T routing processes starting up (i.e., the database queries are attempted before the database is finished initialization or the communication to it is not yet available). During normal operation this should be zero (0). |

```
admin@labsystem1.fiedler# show stats redundancy port-initialization
Tue 2016-11-15 15:17:37 EST
Retrieving statistics...

Port Redundancy Stats
---------------------
========================== ============== =======
 Metric                     Node           Value
========================== ============== =======
 marker-query-pending       labsystem1         0
​                            labsystem2         0
 marker-record-found        labsystem1         7
​                            labsystem2         0
 marker-record-not-found    labsystem1         1
​                            labsystem2         8
 marker-record-read-error   labsystem1         0
​                            labsystem2         0
 marker-record-write        labsystem1       442
​                            labsystem2        18
 pending-queries            labsystem1         0
​                            labsystem2         0

Completed in 0.07 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show stats redundancy port-list-records
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats redundancy port-list-records [{ list-record-pop-errors | list-record-pop-failures | list-record-pop-pending | list-record-pop-success | list-record-push }] [node <node>] [<verbosity>]
```

#### Description

The _show stats redundancy port-list_ tables show statistics related to allocation of "blocks" of ports for 128T applications that require unique ports per use – things such as source NAT and waypoint-to-waypoint communication.

The 128T router will request a block of free ports using a "pop" operation from the redundancy database, use those until they&#39;re (mostly) consumed, until it requests another. Meanwhile as it frees ports from previous allocations as sessions are torn down or expire, it aggregates a block of these ports and will "push" it back onto the database for later use. (This manifests as a _least recently used_, or LRU, algorithm, where ports that are freed wind up at the back of the line for subsequent reuse.)

These commands are typically only run at the request of 128 Technology&#39;s support team, and to diagnose specific network conditions. This information, when combined with 128T log output, will help the support team to isolate network anomalies.

| Subcommand | Description |
| --- | --- |
| list-record-pop-errors | This indicates the number of errors that occurred when attempting to retrieve a block of free ports from the redundancy database because the database was unreachable. |
| list-record-pop-failures | This indicates the number of failures when attempting to retrieve a block of free ports from the redundancy database because no free blocks were available. |
| list-record-pop-pending | This indicates the number pending requests that have neither succeeded nor failed, but are still being processed. |
| list-record-pop-success | This counts the number of blocks of free ports that have been successfully requested from the database. |
| list-record-push | This indicates the number of free ports returned to circulation. |

```
admin@labsystem1.fiedler# show stats redundancy port-list-records
Tue 2016-11-15 15:18:25 EST
Retrieving statistics...

Port Redundancy Stats
---------------------
========================== ============== =======
 Metric                     Node           Value
========================== ============== =======
 list-record-pop-errors     labsystem1         0
​                            labsystem2         0
 list-record-pop-failures   labsystem1         0
​                            labsystem2         0
 list-record-pop-pending    labsystem1         0
​                            labsystem2         0
 list-record-pop-success    labsystem1       225
​                            labsystem2         6
 list-record-push           labsystem1       598
​                            labsystem2       396

Completed in 0.17 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show stats redundancy session-delete
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats redundancy session-delete [node <node>] [<verbosity>]
```

#### Description

The _show stats redundancy session-delete_ statistic records the number of times a session is deleted from the database containing redundancy information. This occurs when a session ends (either due to TCP socket closure or because of UDP timeouts expiring).

```
admin@labsystem1.fiedler# show stats redundancy session-delete
Tue 2016-11-15 15:18:51 EST
Retrieving statistics...

Session deleted from the database
---------------------------------
============ ========
 Node          Value
============ ========
 labsystem1   154308

Completed in 0.11 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show stats redundancy session-errors
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats redundancy session-errors [{ cache-timeouts | decode-failures | invalid-buffer-received | invalid-session-key | new-session-creation-failure | session-not-found | session-update-failures | unsupported-feature }] [node <node>] [<verbosity>]
```

#### Description

The _show stats redundancy session-errors_ tables show statistics related to the 128T router&#39;s behavior when configured in a redundant (highly available) pair of nodes. The subcommands within _show stats redundancy session-errors_ provide more detail on each of the various counters and are discussed in the sections that follow.

These commands are typically only run at the request of 128 Technology&#39;s support team, and to diagnose specific network conditions. This information, when combined with 128T log output, will help the support team to isolate network anomalies.

| Subcommand | Description |
| --- | --- |
| cache-timeouts | After a failover event, inbound packets are queued as database queries are issued to reconstruct sessions. This counter is incremented when packets are dropped from the cache because a reply did not arrive from the database in time. |
| decode-failures | This counts the number of database responses that could not be decoded. This is generally due to a version compatibility problem. |
| fib-lookup-error | This counts the number of events where a session was found in the redundancy database, but the packet could not be processed because the corresponding FIB entry was not yet installed. |
| invalid-buffer-received | This error occurs when a reply from the database is not a valid buffer; this is a version compatibility problem. |
| new-session-creation-failure | For UDP packets, or mid-flow (i.e., non-SYN) TCP packets when transport-state-enforcement is disabled. |
| session-not-found | This statistic increments when a database query comes back with no match. |
| session-update-failures | This increments when an update to the redundancy database fails for an unspecified reason. |
| source-lookup-error | This counts the number of events where a session was found in the redundancy database, but the packet could not be processed because the corresponding source table entry was not yet installed. |
| unsupported-feature | This increments when a session reply returns an unsupported redundancy scenario. |

```
admin@labsystem1.fiedler# show stats redundancy session-errors
Tue 2016-11-15 15:19:09 EST
Retrieving statistics...

Session Redundancy Error Stats
------------------------------
============================== ============ =======
 Metric                         Node         Value
============================== ============ =======
 cache-timeouts                 labsystem1       0
 decode-failures                labsystem1       0
 invalid-buffer-received        labsystem1       0
 invalid-session-key            labsystem1       0
 new-session-creation-failure   labsystem1    1544
 session-not-found              labsystem1       0
 session-update-failures        labsystem1       0
 unsupported-feature            labsystem1       0

Completed in 0.12 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show stats redundancy session-reads
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats redundancy session-reads [{ create-new-session | net-unreachable-sent | query-pending | query-result-not-found | query-result-success | query-result-timeout | tcp-reset-sent }] [node <node>] [<verbosity>]
```

#### Description

The _show stats redundancy session-reads_ commands show statistics related to the 128T router&#39;s behavior when querying the redundancy database. After a redundancy event (where packet processing fails over from one node to another), the newly active node will query the redundancy database as inbound packets arrive to reconstruct stored session state that had been created by the formerly active node. This set of statistics shows the results of these "session read" queries.

| Subcommand | Description |
| --- | --- |
| create-new-session | This indicates that the query to the database succeeded, but resulted in no result; therefore, this is the first packet in a new session and will be created as such. |
| net-unreachable-sent | This is incremented when a query to the database fails; the active node will send back an ICMP network unreachable response. |
| query-pending | This shows the number of queries that have been sent to the database that have not (yet) received a reply. |
| query-result-not-found | This indicates the number of queries that were sent for which no matching entry was found in the database; this is generally because the packet received is the first of a new session. |
| query-result-success | This indicates the number of queries that responded back with a matching entry. |
| query-result-timeout | This counts the number of queries that timed out before receiving a reply from the database. |
| tcp-reset-sent | This counts the number of TCP RSTs that were sent by the 128T router because of failures in querying the redundancy database. |

```
admin@labsystem1.fiedler# show stats redundancy session-reads
Tue 2016-11-15 15:19:41 EST
Retrieving statistics...

Session Read Stats
------------------
======================== ============ ========
 Metric                   Node          Value
======================== ============ ========
 create-new-session       labsystem1   149585
 net-unreachable-sent     labsystem1        0
 query-pending            labsystem1        0
 query-result-not-found   labsystem1   156870
 query-result-success     labsystem1      987
 query-result-timeout     labsystem1        0
 tcp-reset-sent           labsystem1     5722

Completed in 0.12 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show stats redundancy session-reconstruction
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats redundancy session-reconstruction [{ created-inter-node-service-paths | created-inter-router-service-paths | created-local-service-paths | diverted-to-external-protocol-agent }] [node <node>] [<verbosity>]
```

#### Description

The _show stats redundancy session-reconstruction_ commands show statistics that tracks the types of sessions that a newly active 128T reconstructs after consulting the database post-failover.

| Subcommand | Description |
| --- | --- |
| created-inter-node-service-paths | This counts the number of sessions that have been reconstructed where the ingress interface and egress interface are on different nodes. |
| created-inter-router-service-paths | This counts the number of sessions that have been reconstructed where the ingress interface and egress interface are on different routers. |
| created-local-service-paths | This counts the number of sessions that have been reconstructed where the ingress and egress interfaces are on the same node. |
| diverted-to-external-protocol-agent | This is related to BGP recovery, and indicates the number of inbound packets that have been identified as BGP packets and subsequently "diverted" to be processed by the local RoutingManager (rather than be treated like a more typical session). |

```
admin@labsystem1.fiedler# show stats redundancy session-reconstruction
Tue 2016-11-15 15:20:03 EST
Retrieving statistics...

Redundancy session reconstruction stats
---------------------------------------
===================================== ============ =======
 Metric                                Node         Value
===================================== ============ =======
 created-inter-node-service-paths      labsystem1       0
 created-inter-router-service-paths    labsystem1       6
 created-local-service-paths           labsystem1     981
 diverted-to-external-protocol-agent   labsystem1       0

Completed in 0.03 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show stats redundancy session-refresh
<!-- Not updated to 4.3 -->
####Syntax

```
show stats redundancy session-refresh [node <node>] [<verbosity>]
```

#### Description

The _show stats redundancy session-refresh_ counts the number of times that active sessions are refreshed in the redundancy database. This keeps records associated with active sessions in the database, preventing them from being cleaned up due to inactivity timers firing. (Ensuring that the data in the database is current and valid.)

```
admin@labsystem1.fiedler# show stats redundancy session-refresh
Tue 2016-11-15 15:20:25 EST
Retrieving statistics...

Session Refresh to the database
-------------------------------
============== ========
 Node            Value
============== ========
 labsystem1     411946
 labsystem2      19420

Completed in 0.06 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show stats redundancy session-writes
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats redundancy session-writes [{ errors | write-request-sent | write-request-success }] [node <node>] [<verbosity>]
```

#### Description

The _show stats redundancy session-writes_ statistics show information about the number of session events that have been written into the database that contains redundancy information. The _errors_ statistic increments when a session write fails; the _write-request-sent_ increments for each session request that is attempted to be written to the database, and _write-request-success_ statistics increment when transactions are written and receive a positive response.

```
admin@labsystem1.fiedler# show stats redundancy session-writes
Tue 2016-11-15 15:20:47 EST
Retrieving statistics...

Session Write Stats
-------------------
============================= ============ ========
 Metric                        Node          Value
============================= ============ ========
 errors encode-failures        labsystem1        0
 errors errors-from-database   labsystem1        0
 write-request-sent            labsystem1   168216
 write-request-success         labsystem1   168216

Completed in 0.12 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show stats registered-services
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats registered-services events [node <node>] [<verbosity>]
```

#### Description

Within the 128T router&#39;s software architecture, a process known as the System Services Coordinator (SSC) acts as a logical hub for other software processes to register with. The _show stats registered-services events_ command tallies the number of other software processes that have successfully registered with the SSC.

```
admin@cnd1.conductor# show stats registered-services
Thu 2018-02-08 17:13:50 EST
Retrieving statistics...

Registered Services
-------------------
======== =========== ====== =======
 Metric   Router      Node   Value
======== =========== ====== =======
 events   conductor   cnd1      39

Completed in 0.10 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## show stats routing
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats routing [{ errors | route-updates | routes }] [node <node-name>] [ <verbosity>]
```

#### Description

The _show stats routing_ command displays information about the internal interface between the 128T router&#39;s Route Table Manager (RTM) and its routing engine, from the perspective of its RTM. For each route the RTM receives, it increments add-route statistics. For each removal it receives, the delete-route statistics are incremented. The fib-meter shows a count of the number of FIB entries that the RTM has currently.

When the routing engine has sent a number of routing changes to RTM and wishes the RTM to "activate" these new changes, it informs the RTM to install the routes; this activity is captured in the output of the _show stats routing route-updates_ command.

```
admin@labsystem1.fiedler# show stats routing route-updates
Retrieving statistics (this could take up to 60 seconds)...

Stats pertaining to updating the routing table
----------------------------------------------
================  =============  =======
Metric            Node             Value
================  =============  =======
received add      linecard-test        2
received delete   linecard-test        0
received install  linecard-test        3
received total    linecard-test        5
================  =============  =======
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 3.0.0   | Added _node_ and _verbosity_ optional arguments |
| 3.1.0   | _show stats routing pending-route-updates_ deprecated |

## show stats routing-agent
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats routing-agent [{ add-route | delete-route | fib-meter | install-route }] [node <node>] [<verbosity>]
```

#### Description

The routing agent is a software component that exists on all packet-processing nodes within a 128T router that talks to the routing manager to learn of the RIB. The routing agent, in turn, adds those routes locally on the node. The _show stats routing-agent_ tables tally the various actions associated with the routing agent.

```
admin@test1.Fabric128# show stats routing-agent
Wed 2016-11-02 11:00:35 EDT
Retrieving statistics...

Routing Agent Stats
-------------------
=============== ======= =======
 Metric          Node    Value
=============== ======= =======
 add-route       test1       4
 delete-route    test1       0
 fib-meter       test1       4
 install-route   test1       5

Completed in 0.17 seconds
```

The 128T router will increment _add-route_ when it receives new routes from the routing manager, and likewise will increment _delete-route_ when it receives instructions on removing routes from the routing manager. Once the routing manager is done with the route updates it will tell the routing agents to install the routes it has communicated; this event will increment the _install-route_ counter.

The fib-meter shows the current quantity of entries in the Forwarding Information Base.

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show stats service-area
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats service-area [{ dhcp | received | sent | session-install-errors }] [since <since> ] [node <node-name>] [<verbosity>]
```

#### Description

The 128T router&#39;s service area is where flow installation logic and path selection logic reside. The first packet of every unknown flow is sent to the service area for disposition; the various subcommands within _show stats service-area_ count the number of events of various types to help illustrate its behavior. The various subcommands are described in the sections that follow.

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 1.1.0   | Renamed _biflow-install-errors_ to _session-install-errors_ |
| 3.0.0   | Added _node_ and _verbosity_ optional arguments |
| 3.1.0   | Added statistics regarding DHCP |

## show stats service-area dhcp
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats service-area [ack | decline | discover | nack | offer | release | request | unknown] [dropped-packets | processed-packets] [since <since>] [node <node-name>] [<verbosity>]
```

#### Description

The _show stats service-area dhcp_ statistics contain information about the 128T router&#39;s Dynamic Host Configuration Protocol (DHCP) protocol messaging. The various types of DHCP messages (ack, decline, etc.) are all given their own statistics, and all are categorized into either dropped or processed counters.

The total number of dropped or processed DHCP packets is obtained by omitting the DHCP message type specifier.

```
admin@labsystem1.fiedler# show stats service-area dhcp
Thu 2017-07-27 11:30:55 EDT
Retrieving statistics...

Highway manager DHCP Packet Stats
---------------------------------
============================ ============ =======
 Metric                       Node         Value
============================ ============ =======
 ack dropped-packets          labsystem1       0
 ack processed-packets        labsystem1       0
 decline dropped-packets      labsystem1       0
 decline processed-packets    labsystem1       0
 discover dropped-packets     labsystem1       0
 discover processed-packets   labsystem1       0
 dropped-packets              labsystem1       0
 nack dropped-packets         labsystem1       0
 nack processed-packets       labsystem1       0
 offer dropped-packets        labsystem1       0
 offer processed-packets      labsystem1       0
 processed-packets            labsystem1       0
 release dropped-packets      labsystem1       0
 release processed-packets    labsystem1       0
 request dropped-packets      labsystem1       0
 request processed-packets    labsystem1       0
 unknown dropped-packets      labsystem1       0
 unknown processed-packets    labsystem1       0

Completed in 0.74 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.1.0   | This feature was introduced |

## show stats service-area received
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats service-area received [{ adaptive-encryption-modify-packets | bad-shared-mem-entry | collision-modify-packets | dropped-packets | duplicate-reverse-metadata-packets | empty-reverse-metadata-packets | existing-flows | existing-session | existing-session-reverse-metadata-packets | external-protocol-agent-packets | fabric-packets | flow-expired-reverse-metadata-packets | flow-move-packets | invalid-reverse-metadata-packets | mid-flow-modify-packets | no-fib-entry | non-fabric-packets | reverse-metadata-process-failure | session-collision-change-direction | session-collision-change-direction | session-collision-ignore-drop | session-collision-ignored | session-ignored-reverse-metadata-packets | session-updated-reverse-metadata-packets | update-session-with-peer-failure | update-session-with-peer-success | valid-reverse-metadata-packets }] [node <node-name>] [<verbosity>]
```

#### Description

The _show stats service-area received_ statistics count the number of packets that the 128T router&#39;s fast path has sent to the service area for business logic processing.

```
admin@labsystem1.fiedler# show stats service-area received
Retrieving statistics (this could take up to 60 seconds)...

Stats pertaining to the packets received by the Service Area
------------------------------------------------------------
=======================  =============  =======
Metric                   Node             Value
=======================  =============  =======
dropped-packets          linecard-test        2
existing-flows           linecard-test    33995
existing-session         linecard-test    34007
fabric-packets           linecard-test        0
mid-flow-modify-packets  linecard-test        2
non-fabric-packets       linecard-test     1672
=======================  =============  =======
```

The statistic tables are categorized into the types listed below:

| Modifier | Description |
| --- | --- |
| adaptive-encryption-modify-packets | This counts all of the packets that are modified due to the engagement of adaptive-encryption on a flow/session. |
| bad-shared-mem-entry | This increments when packets have an invalid shared memory entry, and is evidence of possible memory corruption. |
| collision-modify-packets | This counts the number of packets that have experienced "collision" (when a packet is handled by the service logic on the 128T that already matches an existing session-in-progress) and that packet modifies the existing session&#39;s properties. |
| dropped-packets | This catches all conditions within the service area when it drops packets due to an error. |
| duplicate-reverse-metadata-packets | This counts all instances where the same reverse metadata is received more than one time. |
| empty-reverse-metadata-packets | This counts every instance of when metadata received on the reverse path contains no information. |
| existing-flows | This counts the number of packets received where a flow has already been installed by the service area. This most commonly occurs when several packets are sent by a client in rapid succession, and packets other than the first are sent to the service area while the service area is still in the process of installing the flow for the first one. This is a fairly common occurrence. |
| existing-session | This counts the total number of packets received by the service area that already have a session in progress. |
| existing-session-reverse-metadata-packets | This counts the number of reverse metadata packets that have arrived in the service area for a session that is already active. |
| external-protocol-agent-packets | This counts the number of packets received in the service area that were originated by an external protocol agent (128T internal). |
| fabric-packets | This counts the number of packets received on fabric interfaces and sent to the service area for processing. |
| flow-expired-reverse-metadata-packets | This is the number of packets containing reverse metadata that were received by the service area due to flow expiry. |
| flow-move-packets | This counts the number of packets that trigger a move from one destination to another. |
| invalid-reverse-metadata-packets | This increments whenever the service area deems that reverse metadata it has received is not parsable or has failed authentication. |
| mid-flow-modify-packets | This counts the number of packets that the fast path has sent to the service area to modify the properties of an existing flow; e.g., when routes change and a new interface needs to be used for an existing flow entry. |
| no-fib-entry | This counts the number of packets that were received but did not match a FIB entry. |
| non-fabric-packets | This counts the number of packets received on external interfaces and sent to the service area for processing. |
| reverse-metadata-process-failure | This increments whenever a 128T receives reverse metadata (e.g., the first packet received in response from a next-hop 128T that this router peers with), but that metadata could not be parsed properly. |
| session-collision-change-direction | A session collision is when two devices both send packets to each other through 128T devices and use "mirror image" sets of ports (the source of one flow is the same as the destination of the compliment); this is common for RTP, for example. One of these flows establishes a session, and the next will either change the direction (if it wins the tiebreaker) or be ignored (if it loses the tiebreaker). These two statistics count these interactions. |
| session-collision-ignore-drop ||
| session-collision-ignored ||
| session-ignored-reverse-metadata-packets | This counts the number of reverse metadata packets that have been ignored by a 128T for any number of possible conditions (e.g., no action required). |
| session-updated-reverse-metadata-packets | This counts the number of sessions that have been updated due to information contained within reverse metadata that the service area has received. |
| update-flow-with-peer-failure | This counts the number of reverse metadata packets that failed to update a flow. |
| update-flow-with-peer-success | This counts the number of reverse metadata packets that successfully updated a flow. |
| update-session-with-peer-failure | This counts the number of reverse metadata packets that failed to update a session. |
| update-session-with-peer-success | This counts the number of reverse metadata packets that successfully updated a session. |
| valid-reverse-metadata-packets | This counts the number of parsable, valid reverse metadata packets received by the service area. |

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 3.0.0   | Added many statistics related to session collisions and reverse metadata |
| 3.2.0   | Added many statistics       |

## show stats service-area sent
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats service-area sent { arp-resolve-failure | arp-resolve-pending | arp-resolve-success | success }
```

#### Description

The 128T router&#39;s service area is where flow installation logic and path selection logic reside. The first packet of every unknown flow is sent to the service area for disposition; the various subcommands within _show stats service-area_ count the number of events of various types to help illustrate its behavior.

```
admin@test1.Fabric128# show stats service-area sent
Wed 2016-11-02 11:04:41 EDT
Retrieving statistics...

Service Area Packets Sent Stats
-------------------------------
===================== ======= =======
 Metric                Node    Value
===================== ======= =======
 arp-resolve-failure   test1       0
 arp-resolve-pending   test1       0
 arp-resolve-success   test1       0
 success               test1    2083

Completed in 0.07 seconds
```

| Modifier | Description |
| --- | --- |
| arp-resolve-failure | If the service area needs a MAC address for the destination it has selected for a new flow, it will send an ARP for it; if this ARP fails, the packets will be dropped and this counter will increment. |
| arp-resolve-pending | Packets waiting for an ARP to resolve will be queued in the service area, until the ARP succeeds or fails. This counter increments with each packet that queues, waiting for this ARP transaction. |
| arp-resolve-success | This counter increments once an ARP transaction has succeeded, for each queued packet that is sent. |
| success | This counter increments for each packet sent to the fast path successfully. |

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## show stats service-area session-install-errors
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats service-area session-install-errors [{ duplicate-reverse-flow | fib-lookup | invalid-packet | service-paths-unavailable | urpf-check-failure | waypoint-allocation }]
```
#### Description

When the 128T router&#39;s service area receives the first packet of a new flow, for service traffic it will attempt to install a session – a bidirectional set of flow entries into its flow table, for symmetrically forwarding traffic from client to server and vice versa. This table tallies the number of error cases when the service area fails to install a session.

```
admin@test1.Fabric128# show stats service-area session-install-errors
Wed 2016-11-02 11:05:06 EDT
Retrieving statistics...

Service Area Session Installation Error Stats
---------------------------------------------
======================== ======= =======
 Metric                   Node    Value
======================== ======= =======
 duplicate-reverse-flow   test1       0
 fib-lookup               test1       0
 invalid-packet           test1       0
 urpf-check-failure       test1       0
 waypoint-allocation      test1       0

Completed in 0.17 seconds
```

| Modifier | Description |
| --- | --- |
| duplicate-reverse-flow | The insert of new flow failed because of a reverse flow already matching the same criteria of an existing flow. (A reverse flow is the complement to a forward flow, and serves to send packets from the "server" to the "client" in a client/server transaction.) |
| fib-lookup | This counts the number of installation failures that occur due to a FIB lookup miss for the reverse flow. |
| gateway-lookup-failure | This increments when a session fails to be installed because a next-hop gateway lookup fails, and hence there is no way to egress the packet. |
| invalid-packet | This counts the number of times a packet that the service area cannot process causes a flow installation failure. |
| service-paths-unavailable | This counts the number of sessions that fail due to all possible service paths being unavailable (down, full, below thresholds, etc.). |
| urpf-check-failure | This counts the number of times the 128T router service area fails to install a reverse flow due to a uRPF (Unicast Reverse Path Forwarding) check. This is when a _router_ has its _reverse-flow-enforcement_ enumeration set to "strict", and the ingress interface is not the one that the 128T element would normally use for forwarding packets in the reverse direction. |
| waypoint-allocation | This counts the number of installation failures due to the service area&#39;s inability to allocate a waypoint for the new session (due to exhaustion of the available "waypoint pool"). |

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 1.1.0   | Renamed _biflow_ to _session_ |
| 3.0.0   | Added statistics for _service-paths-unavailable_ |

## show stats session
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats session [active | add | added-existing | flow active | flow add failure | flow remove failure | max-remove-timeout-exceeded | remove] [since <since>] [node <node-name>] [<verbosity>]
```

#### Description

Processing _sessions_ is at the heart of the 128T router&#39;s purpose: "vectoring" (or steering) forward and reverse flows through a network of one or more 128T routing nodes from a source to a destination. The _show stats session_ commands aggregate the statistics for session-oriented routing across various groupings to provide insight into the traffic patterns exercised by your 128T router.

The data from _show stats session_ is sampled by the 128T router periodically (at intervals of one second), so the output shown represents a view into the previous sample.

| Modifier | Description |
| --- | --- |
| active | This counts the number of active sessions that a given 128T (or node) is processing. |
| add | This counts the number of sessions that a 128T has added since its last reboot. |
| added-existing | This counts the number of times that the 128T router has attempted to add a flow that already exists. This is fairly common, and generally happens when a flow add request is in progress and more packets for that session arrive before the initial flow add request has been completed. Once the initial packet&#39;s flow creation event completes, the other packets will increment the statistics as _added-existing_. |
| flow active | This counts the number of active flows (generally, a session is comprised of two flows and this value should be roughly twice the number of active sessions). |
| flow add failure | This counts the number of times a flow failed to be added due to an internal error. |
| flow remove failure | This counts the number of times a flow failed to be removed due to an internal error. |
| max-remove-timeout-exceeded | This shows the number of instances where the 128T router&#39;s ability to remove expired flows is not keeping up. This is generally due to some type of resource exhaustion on the 128T router; this command is typically only used upon the request of 128 Technology&#39;s support team. |
| remove | This counts the number of sessions that a 128T has removed since its last reboot. |

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |
| 2.1.0   | Renamed subcommands         |
| 3.0.0   | Reorganized all subcommands |

## show stats source-nat
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats source-nat [{ active-tables | allocate-ports-for-db | giid-transition-to-active | giid-transition-to-inactive | inactive-tables | reinitialize-ports-in-db | release-ports-to-db | reserved-ports }] [node <node>] [<verbosity>]
```

#### Description

The 128T router can optionally perform network address translation (NAT) on the source address of packets it forwards to remote destinations. When doing so, it will translate the original source IP:port "tuple" to a specific IP:port tuple on its egress interface – and generally it maps many originating IPs to a single IP address, using the port as the differentiation.

To provide continuity of service after a failure of one member of a pair of highly available 128T routers, the ports allocated by an active node are written into a database and replicated to its complement in the pair. This way, in the event of a failure, the newly active node will be able to use the same ports that the failed peer had allocated.

The statistics in _show stats source-nat_ tally as various events occur within the port allocation, write to database, and failure events occur. This command is usually only run at the request of 128 Technology&#39;s support organization to diagnose a specific problem.

```
admin@test1.Fabric128# show stats source-nat
Wed 2016-11-02 13:48:48 EDT
Retrieving statistics...

Highway Manager source-nat port allocation Stats
------------------------------------------------
============================= ======= =======
 Metric                        Node    Value
============================= ======= =======
 active-tables                 test1       0
 allocate-ports-for-db         test1       0
 giid-transition-to-active     test1       0
 giid-transition-to-inactive   test1       0
 inactive-tables               test1       0
 reinitialize-ports-in-db      test1       0
 release-ports-to-db           test1       0
 reserved-ports                test1       0

Completed in 0.12 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show stats ssc
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats ssc [{ clients | operations | received | sessions | transactions | transmitted }] [node <node>] [<verbosity>]
```

#### Description

The 128T router&#39;s System Services Coordinator (SSC) is a software process that acts as a registrar for the other software processes within the system. As other software processes launch, they will register as clients to the SSC, and these registration events are tallied in the statistical tables associated with the _show stats ssc_ command.

The _clients_ modifier shows the current number of active events that clients have triggered (connections, and disconnections) as well as the current number of registered clients. The _operations_ branch shows compression and decompression events that have occurred between the SSC client and server. The _received_ branch shows SSC messages that have been received, categorized into counters grouped by client, by service, and various error categories.

```
admin@test1.Fabric128# show stats ssc
Thu 2016-11-03 16:25:38 EDT
Retrieving statistics...

SSC Stats
---------
========================== ======= =======
 Metric                     Node    Value
========================== ======= =======
 clients                    test1     262
 received invalid message   test1       0

Completed in 0.12 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## show stats traffic-eng
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats traffic-eng [device-port [ { drop | queue-depth [ { avg | max | min | total }] | schedule-failure | schedule-success } ] | internal-application [{ queue-depth [ { avg | max | min | total }] | schedule-failure | schedule-success | sent-failure | sent-retry | sent-success } ] [node <node>] [<verbosity>]
```

#### Description

The 128T router&#39;s traffic engineering subsystem is responsible for queuing inbound packets and scheduling them for transmission to their destination. The _show stats traffic-eng_ command tabulates the number of packets that have been scheduled (or failed to be scheduled) and sent (or failed to be sent).

The commands are grouped into two coarse categories: packets queued for a device port (i.e., on egress) or for internal application handling (i.e., on ingress).

```
user@labsystem1.fiedler> show stats traffic-eng device-port summary
Thu 2018-02-08 17:48:44 EST
Retrieving statistics...

Device Port Traffic Engineering Stats
-------------------------------------
=================== =================== =======
 Metric              Node                Value
=================== =================== =======
 drop                labsystem1              0
 queue-depth avg     labsystem1              0
 queue-depth max     labsystem1              0
 queue-depth min     labsystem1              0
 queue-depth total   labsystem1              0
 schedule-failure    labsystem1              0
 schedule-success    labsystem1              0

Completed in 0.11 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |
| 3.1.0   | Added statistics related to dropped packets and queue depths (part of the enhancements in this software related to traffic engineering) |

## show stats waypoint
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats waypoint [{ active-inter-router-tables | allocate-ports-for-default-range-tables | allocate-ports-for-range-based-tables | giid-transition-to-active | giid-transition-to-inactive | inactive-inter-router-tables | reinitialize-ports-in-db | release-ports-to-db | reserved-ports }] [node <node>] [<verbosity>]
```

#### Description

Much like the _source-nat_ feature, the 128T router performs network address translation (NAT) of packets it forwards to remote 128T routers. These packets are rewritten to have a source IP address of one of the transmitting router&#39;s "waypoints" – an IP:port combination unique to that sending device. This is how the 128T router ensures that the return packets from that destination return using a symmetrical path, as the IP address is "owned" by a specific network element.

To provide continuity of service after a failure of one member of a pair of highly available 128T routers, the ports allocated by an active node are written into a database and replicated to its complement in the pair. This way, in the event of a failure, the newly active node will be able to use the same ports that the failed peer had allocated.

The statistics in _show stats waypoint_ tally as various events occur within the port allocation, write to database, and failure events occur. This command is usually only run at the request of 128 Technology&#39;s support organization to diagnose a specific problem.

```
admin@test1.Fabric128# show stats waypoint
Wed 2016-11-02 14:07:42 EDT
Retrieving statistics...

Highway Manager waypoint port allocation Stats
----------------------------------------------
========================================= ======= =======
 Metric                                    Node    Value
========================================= ======= =======
 active-inter-router-tables                test1       0
 allocate-ports-for-default-range-tables   test1       1
 allocate-ports-for-range-based-tables     test1       0
 giid-transition-to-active                 test1       0
 giid-transition-to-inactive               test1       0
 inactive-inter-router-tables              test1       0
 reinitialize-ports-in-db                  test1       0
 release-ports-to-db                       test1       0
 reserved-ports                            test1       0

Completed in 0.17 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show stats worker-core
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats worker-core [{ aes | control-messages-sent | packet-processing-utilization | process-loop-exception }] [node <node>] [<verbosity>]
```

#### Description

The statistics in _show stats worker-core_

```
admin@test1.Fabric128# show stats worker-core
Wed 2016-11-02 14:08:54 EDT
Retrieving statistics...

Worker Core Stats
-----------------
=============================== ======= =======
 Metric                          Node    Value
=============================== ======= =======
 aes context create failure      test1       0
 aes context create success      test1       2
 aes context destroy failure     test1       0
 aes context destroy success     test1       0
 control-messages-sent           test1      13
 packet-processing-utilization   test1      73
 process-loop-exception          test1       0

Completed in 0.12 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 2.0.0   | Renamed and reorganized (was _show stats controller_ in earlier software versions) |
| 3.2.0   | Removed statistics regarding traffic engineering (these have been moved to the _show stats traffic-eng_ hierarchy) |

## show stats worker-core aes
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats worker-core aes context [{ create [ { failure | success }] | destroy [{ failure | success }] ] [node <node>] [<verbosity>]
```

#### Description

The _show stats worker-core aes_ command shows statistics regarding the use of AES encryption/decryption on the 128T router, specifically regarding the treatment of AES inter-process communication control messages. The various subcommands are described here.

The _context_ sub-tree shows information on AES encryption contexts (an encryption context is a set of key-value pairs associated with an encryption/decryption session). The _context_ sub-tree can show _success_ or _failure_ statistics either the creation or destruction of these contexts; these are invoked with _show stats worker-core aes context create_ and _show stats worker-core aes context destroy_, respectively. Each of these commands will display a table similar to the following:

```
admin@test1.Fabric128# show stats worker-core aes context create success
Wed 2016-11-02 14:17:18 EDT
Retrieving statistics...

AES Context Creation Successes
------------------------------
======= =======
 Node    Value
======= =======
 test1       2

Completed in 0.07 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 2.0.0   | Renamed. Was _show stats controller aes_ |

## show stats worker-core control-messages-sent
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats worker-core control-messages-sent [node <node>] [<verbosity>]
```

#### Description

This command shows the number of control messages that have been cloned, and broadcast to all individual data cores. (Control messages are 128T router internal inter-process communication events between software processes.)

```
admin@test1.Fabric128# show stats worker-core control-messages-sent
Wed 2016-11-02 14:18:35 EDT
Retrieving statistics...

Control Messages Sent
---------------------
======= =======
 Node    Value
======= =======
 test1      13

Completed in 0.07 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 2.0.0   | Renamed. Was _show stats controller control-messages-sent_ |

## show stats worker-core packet-processing-utilization
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats worker-core packet-processing-utilization [node <node>] [<verbosity>]
```

#### Description

This command shows CPU utilization for packet processing. (As of the 2.0 software, the 128T router uses a CPU core for packet processing and a separate CPU core for traffic engineering; in prior versions of software these were combined onto the same CPU core and hence the statistics were aggregated between these two functions.)

```
admin@test1.Fabric128# show stats worker-core packet-processing-utilization
Wed 2016-11-02 14:21:04 EDT
Retrieving statistics...

Packet Processing Core Utilization
----------------------------------
======= =======
 Node    Value
======= =======
 test1      79

Completed in 0.12 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 2.0.0   | Renamed. Was part of _show stats controller core-utilization_ |

## show stats worker-core process-loop-exception
<!-- Not updated to 4.3 -->
#### Syntax

```
show stats worker-core control-messages-sent [node <node>] [<verbosity>]
```

#### Description

This command shows errors (exceptions) that have transpired in the fast packet processing engine of the 128T router. These events are not common and should be brought to the attention of your 128T support representative.

```
admin@test1.Fabric128# show stats worker-core process-loop-exception
Wed 2016-11-02 14:27:10 EDT
Retrieving statistics...

Worker Core Process Loop Exceptions
-----------------------------------
======= =======
 Node    Value
======= =======
 test1       0

Completed in 0.12 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

