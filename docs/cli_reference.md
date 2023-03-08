---
title: Command Line Reference
sidebar_label: Command Line Reference
---

The Command Line Reference guide is better understood if you know the basics of operating the programmable command line interface (PCLI). Commands and actions such as clear, edit, delete, restore, and show, for example, are described here. If you have not used the PCLI before, please refer to [About the PCLI](concepts_pcli.md) for an explanation of how it works.

## `adopt`

Assign the current router to a Mist organization.

#### Usage

```
adopt [{org-id <org-id> | registration-code <registration-code>}] [force] [router-name <router-name>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. |
| org-id | The ID of the Mist organization where the router is assigned. |
| registration-code | The registration code used to assign this router to an organization. |
| router-name | Assign a name to the router. |

##### See Also

| command | description |
| ------- | ----------- |
| [`show mist`](#show-mist) | Display information about the link between the SSR and the Mist Cloud |

#### Description

If you know the ID of the organization in Mist, or the registration code for the router, you can use the optional `org-id` or `registration-code` arguments. Otherwise, use the interactive dialog to walk through entering Mist credentials and assigning the router to an organization.

| Release | Modification                |
| ------- | ----------------------------|
| 6.0.0   | This feature was introduced |

## `clear app-id cache`

Clear app-id entries from cache

#### Usage

```
clear app-id cache [force] [stale-entries] [node <node>] {router <router> | resource-group <resource-group>} [<cache>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |
| node | The node on which to clear app-id cache entries |
| resource-group | The name of the resource group |
| router | The router on which to clear app-idcache entries |
| stale-entries | Only clear the stale (expired) entries |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| cache | Clear app-id entries from address cache, domain cache, url cache, or all (default: all) |

##### See Also

| command | description |
| ------- | ----------- |
| [`clear app-id cache-entry address`](#clear-app-id-cache-entry-address) | Clear specific app-id entry from cache by address key |
| [`clear app-id cache-entry domain`](#clear-app-id-cache-entry-domain) | Clear specific app-id entry from cache by domain name key |
| [`clear app-id cache-entry url`](#clear-app-id-cache-entry-url) | Clear specific app-id entry from cache by url key |
| [`lookup application by-address`](#lookup-application-by-address) | Look up application identification by address key |
| [`lookup application by-domain`](#lookup-application-by-domain) | Look up application identification by domain name or url key |
| [`show app-id cache`](#show-app-id-cache) | Show information of app-id entries in cache |
| [`show stats app-id application-director cache`](cli_stats_reference.md#show-stats-app-id-application-director-cache) | Statistics for &#x27;cache&#x27; |

## `clear app-id cache-entry address`

Clear specific app-id entry from cache by address key

#### Usage

```
clear app-id cache-entry address [force] [node <node>] {router <router> | resource-group <resource-group>} <ip> <port> <protocol>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |
| node | The node on which to clear app-id cache entry |
| resource-group | The name of the resource group |
| router | The router on which to clear app-id cache entry |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip | IP address of the address key [type: IP address] |
| port | Port of the address key [type: port] |
| protocol | Protocol of the address key [type: string or uint8] |

##### See Also

| command | description |
| ------- | ----------- |
| [`clear app-id cache`](#clear-app-id-cache) | Clear app-id entries from cache |
| [`clear app-id cache-entry domain`](#clear-app-id-cache-entry-domain) | Clear specific app-id entry from cache by domain name key |
| [`clear app-id cache-entry url`](#clear-app-id-cache-entry-url) | Clear specific app-id entry from cache by url key |
| [`lookup application by-address`](#lookup-application-by-address) | Look up application identification by address key |
| [`lookup application by-domain`](#lookup-application-by-domain) | Look up application identification by domain name or url key |
| [`show app-id cache`](#show-app-id-cache) | Show information of app-id entries in cache |
| [`show stats app-id application-director cache`](cli_stats_reference.md#show-stats-app-id-application-director-cache) | Statistics for &#x27;cache&#x27; |

## `clear app-id cache-entry domain`

Clear specific app-id entry from cache by domain name key

#### Usage

```
clear app-id cache-entry domain [force] [node <node>] {router <router> | resource-group <resource-group>} <domain>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |
| node | The node on which to clear app-id cache entry |
| resource-group | The name of the resource group |
| router | The router on which to clear app-id cache entry |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| domain | Domain name |

##### See Also

| command | description |
| ------- | ----------- |
| [`clear app-id cache`](#clear-app-id-cache) | Clear app-id entries from cache |
| [`clear app-id cache-entry address`](#clear-app-id-cache-entry-address) | Clear specific app-id entry from cache by address key |
| [`clear app-id cache-entry url`](#clear-app-id-cache-entry-url) | Clear specific app-id entry from cache by url key |
| [`lookup application by-address`](#lookup-application-by-address) | Look up application identification by address key |
| [`lookup application by-domain`](#lookup-application-by-domain) | Look up application identification by domain name or url key |
| [`show app-id cache`](#show-app-id-cache) | Show information of app-id entries in cache |
| [`show stats app-id application-director cache`](cli_stats_reference.md#show-stats-app-id-application-director-cache) | Statistics for &#x27;cache&#x27; |

## `clear app-id cache-entry url`

Clear specific app-id entry from cache by url key

#### Usage

```
clear app-id cache-entry url [force] [node <node>] {router <router> | resource-group <resource-group>} <url>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |
| node | The node on which to clear app-id cache entry |
| resource-group | The name of the resource group |
| router | The router on which to clear app-id cache entry |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| url | URL |

##### See Also

| command | description |
| ------- | ----------- |
| [`clear app-id cache`](#clear-app-id-cache) | Clear app-id entries from cache |
| [`clear app-id cache-entry address`](#clear-app-id-cache-entry-address) | Clear specific app-id entry from cache by address key |
| [`clear app-id cache-entry domain`](#clear-app-id-cache-entry-domain) | Clear specific app-id entry from cache by domain name key |
| [`lookup application by-address`](#lookup-application-by-address) | Look up application identification by address key |
| [`lookup application by-domain`](#lookup-application-by-domain) | Look up application identification by domain name or url key |
| [`show app-id cache`](#show-app-id-cache) | Show information of app-id entries in cache |
| [`show stats app-id application-director cache`](cli_stats_reference.md#show-stats-app-id-application-director-cache) | Statistics for &#x27;cache&#x27; |

## `clear app-id stats`

Clear inactive app-id stats

#### Usage

```
clear app-id stats [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |
| node | The node on which to clear inactive app-id stats |
| resource-group | The name of the resource group |
| router | The router on which to clear inactive app-id stats |

##### See Also

| command | description |
| ------- | ----------- |
| [`show stats app-id applications`](cli_stats_reference.md#show-stats-app-id-applications) | Statistics for &#x27;applications&#x27; |

## `clear arp`

Refresh the entire ARP cache or a subset if arguments are provided.

#### Usage

```
clear arp [{vlan <vlan> | ip <ip>}] [device-interface <device-interface>] [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| device-interface | The device interface on which to refresh the ARP cache (default: all). |
| force | Skip confirmation prompt. Only required when targeting all routers. |
| ip | The IP address for which to clear an ARP entry (must be specified after &#x27;device-interface&#x27;). [type: IP address] |
| node | The name of the node. |
| resource-group | The name of the resource group. |
| router | The name of the router. |
| vlan | The VLAN on which to clear the ARP cache (must be specified after &#x27;device-interface&#x27;). [type: int] |

##### See Also

| command | description |
| ------- | ----------- |
| [`show arp`](#show-arp) | Shows the contents of the ARP table on the specified node. |

#### Description

The `clear arp` command is typically used during troubleshooting to force a refresh of ARP (Address Resolution Protocol) entries from an SSR or node&#x27;s ARP cache. The command has multiple filters, allowing administrators to specify which entry to refresh. The PCLI auto-completes typed entries for improved accuracy. 

:::note
ARP entries are not removed or deleted; instead the command forces a refresh of the cache outside of the scheduled ARP timeout.
:::

#### Version History
| Release | Modification                |
| ------- | --------------------------- |
| 3.2.0   | This feature was introduced |

## `clear bgp`

Clear routes associated with one or all BGP neighbors.

#### Usage

```
clear bgp [{in | out | soft}] [vrf <vrf>] [force] {router <router> | resource-group <resource-group>} <neighbor>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| in | Soft reset received BGP updates |
| out | Soft reset transmitted BGP updates |
| resource-group | The name of the resource group |
| router | The name of the router for which to clear BGP neighbors |
| soft | Soft reset received and transmitted BGP updates |
| vrf | VRF name |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| neighbor | neighbor ip-address [type: IP address or &#x27;all&#x27;] |

##### See Also

| command | description |
| ------- | ----------- |
| [`show bgp`](#show-bgp) | Displays information about the state of the BGP process on the SSR. |

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
commit [force] [validate-router-all]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |
| validate-router-all | Distribute config to each managed router for validation and wait for results before committing |

#### Description

The `commit` command causes the SSR to validate the candidate configuration, and then replace the running configuration with the candidate configuration (assuming it passes the validation step). It is used once a series of configuration changes have been made, and an administrator wishes to &quot;activate&quot; those configuration changes.

When run from an SSR conductor, the conductor only validates the configuration itself locally before committing the configuration and then distributing it to all managed routers. If the user wishes, the conductor has the ability to distribute the configuration to all managed routers for each of them to validate it and report the results of their validation before the commit takes place (assuming a successful validation). This operation is much slower than local validation because the conductor must wait for all routers to report their results and some may be unreachable or timeout. The user may request a distributed validation by using the `validate-router-all` keyword.

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

The `compare config` command presents a list of differences between the two configurations specified as arguments on the command line. The one listed first influences the output in a very important way: the SSR will return a list of configuration commands that will cause the configuration to be listed _first_ to be brought to parity with the one listed _second_. (Note: since the only editable configuration is the &quot;candidate&quot; configuration, the changes outlined by the _compare config_ command cannot be directly applied to the &quot;running&quot; configuration.)

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
| [`set config encryption`](#set-config-encryption) | Sets the encryption key for the SSR configuration |
| [`show config exports`](#show-config-exports) | Display configuration exports. |
| [`show config version`](#show-config-version) | Display running configuration version. |
| [`show events config commit`](#show-events-config-commit) | Shows events related to running config change |
| [`show stats config`](cli_stats_reference.md#show-stats-config) | Metrics pertaining to the get-config RPC |

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

Connect to a Managed Router.  For more information, read [Connecting to SSRs from Conductor](ts_connecting_to_routers.md).

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
| [`show stats packet-capture`](cli_stats_reference.md#show-stats-packet-capture) | Stats pertaining to captured packets |

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

The `create certificate request webserver` generates a certificate-request, which is then sent to a Certificate Authority. The SSR will, through a series of interactive prompts, request information from the administrator to generate either the request or certificate, as appropriate.

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

The `create certificate self-signed webserver` generates a self-signed certificate which is used for the local webserver. The SSR will, through a series of interactive prompts, request information from the administrator to generate either the request or certificate, as appropriate.

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
| [`set config encryption`](#set-config-encryption) | Sets the encryption key for the SSR configuration |
| [`show config exports`](#show-config-exports) | Display configuration exports. |
| [`show config version`](#show-config-version) | Display running configuration version. |
| [`show events config commit`](#show-events-config-commit) | Shows events related to running config change |
| [`show stats config`](cli_stats_reference.md#show-stats-config) | Metrics pertaining to the get-config RPC |

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 5.1.0   | This feature was introduced |

## `create session-capture`

Creates a session capture at the specified node and service.

#### Usage

```
create session-capture [source-ip <source-ip>] [source-port <source-port>] [destination-ip <destination-ip>] [destination-port <destination-port>] [protocol <protocol>] [session-count <session-count>] [packet-count <packet-count>] [local-only] [tag <tag>] service <service> router <router> node <node>
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
| tag | An optional custom name for the session capture pcap files |

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
create user [<username>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| username | the name of the account to create |

##### See Also

| command | description |
| ------- | ----------- |
| [`delete user`](#delete-user) | Delete a user account |
| [`delete user tokens`](#delete-user-tokens) | Revoke API access tokens for a user. |
| [`edit prompt`](#edit-prompt) | Allows the user to specify a custom format for the PCLI prompt. |
| [`edit user`](#edit-user) | Modify an existing user account |
| [`edit user mode`](#edit-user-mode) | Edit the current user's configuration mode. |
| [`restore prompt`](#restore-prompt) | Restore the PCLI prompt to the factory default. |
| [`restore users factory-default`](#restore-users-factory-default) | Restore the user configuration to factory defaults. |
| [`set password`](#set-password) | Change your password. |
| [`show roles`](#show-roles) | Display all configured roles |
| [`show user`](#show-user) | Display information for user accounts. |
| [`show user activity`](#show-user-activity) | Show the most recent usage of SSR. |

#### Description

The `create user` command allows administrators to create user accounts for user and/or administrative access to the SSR's management port. Issuing the `create user <username>` launches an interactive session that prompts for the new user's full name, password, whether they are an administrative or basic user, and the enabled/disabled state of that user account.

:::note
Password policies have been updated with the release of version 5.6. Please see [Password Policies](config_password_policies.md) for additional information. 
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
| [`show stats packet-capture`](cli_stats_reference.md#show-stats-packet-capture) | Stats pertaining to captured packets |

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

The _delete certificate webserver_ command allows administrators to delete certificates that are stored on the SSR. Note that the SSR will always prompt the administrator to confirm deletion (the &quot;force&quot; keyword is not allowed).

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
| [`set config encryption`](#set-config-encryption) | Sets the encryption key for the SSR configuration |
| [`show config exports`](#show-config-exports) | Display configuration exports. |
| [`show config version`](#show-config-version) | Display running configuration version. |
| [`show events config commit`](#show-events-config-commit) | Shows events related to running config change |
| [`show stats config`](cli_stats_reference.md#show-stats-config) | Metrics pertaining to the get-config RPC |

#### Description

The _delete config_ command allows administrators to delete configurations from the SSR's filesystem that had previously been exported with the _export config_ command. The _force_ flag will skip the confirmation check without prompting the user.

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
delete flows [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |
| node | The node from which to delete flow entries |
| resource-group | The name of the resource group |
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
delete session-capture [source-ip <source-ip>] [source-port <source-port>] [destination-ip <destination-ip>] [destination-port <destination-port>] [protocol <protocol>] [session-count <session-count>] [packet-count <packet-count>] [local-only] [tag <tag>] service <service> router <router> node <node>
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
| tag | An optional custom name for the session capture pcap files |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`by-id`](#delete-session-capture-by-id) | Deletes session-capture by capture-id from selected service. |

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
| capture-id | The session-capture to remove. |

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
delete sessions [{session-id <session-id> | service-name <service-name>}] [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |
| node | The node from which to delete sessions |
| resource-group | The name of the resource group |
| router | The router from which to delete sessions |
| service-name | The name of the service for which to delete all sessions |
| session-id | The identifier of the session to be deleted |

#### Description

The _delete sessions_ command removes all current sessions or a subset if arguments are provided.
:::warning
This may be a service impacting operation.
:::

## `delete system software`

Remove or cancel a previously started download.

#### Usage

```
delete system software version <version>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| version | The version to cancel or remove. |

##### See Also

| command | description |
| ------- | ----------- |
| [`request system software download`](#request-system-software-download) | Download a new version of the SSR. |
| [`request system software upgrade`](#request-system-software-upgrade) | Upgrade to a new version of the SSR. |
| [`set system software image`](#set-system-software-image) | Set the boot image. |
| [`show system software available`](#show-system-software-available) | Display new versions of the SSR that can be installed. |
| [`show system software download`](#show-system-software-download) | Display in-progress and completed downloads of new SSR versions. |
| [`show system software upgrade`](#show-system-software-upgrade) | Follow an in-progress upgrade. |
| [`show system version`](#show-system-version) | Show system version information. |

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

##### Subcommands

| command | description |
| ------- | ----------- |
| [`tokens`](#delete-user-tokens) | Revoke API access tokens for a user. |

##### See Also

| command | description |
| ------- | ----------- |
| [`create user`](#create-user) | Create a new user account interactively. |
| [`delete user tokens`](#delete-user-tokens) | Revoke API access tokens for a user. |
| [`edit prompt`](#edit-prompt) | Allows the user to specify a custom format for the PCLI prompt. |
| [`edit user`](#edit-user) | Modify an existing user account |
| [`edit user mode`](#edit-user-mode) | Edit the current user&#x27;s configuration mode. |
| [`restore prompt`](#restore-prompt) | Restore the PCLI prompt to the factory default. |
| [`restore users factory-default`](#restore-users-factory-default) | Restore the user configuration to factory defaults. |
| [`set password`](#set-password) | Change your password. |
| [`show roles`](#show-roles) | Display all configured roles |
| [`show user`](#show-user) | Display information for user accounts. |
| [`show user activity`](#show-user-activity) | Show the most recent usage of SSR. |

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
## `delete user tokens`

Revoke API access tokens for a user.

#### Usage

```
delete user tokens [force] <username>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| username | the name of the account to revoke API tokens for |

##### See Also

| command | description |
| ------- | ----------- |
| [`create user`](#create-user) | Create a new user account interactively. |
| [`delete user`](#delete-user) | Delete a user account |
| [`edit prompt`](#edit-prompt) | Allows the user to specify a custom format for the PCLI prompt. |
| [`edit user`](#edit-user) | Modify an existing user account |
| [`edit user mode`](#edit-user-mode) | Edit the current user&#x27;s configuration mode. |
| [`restore prompt`](#restore-prompt) | Restore the PCLI prompt to the factory default. |
| [`restore users factory-default`](#restore-users-factory-default) | Restore the user configuration to factory defaults. |
| [`set password`](#set-password) | Change your password. |
| [`show roles`](#show-roles) | Display all configured roles |
| [`show user`](#show-user) | Display information for user accounts. |
| [`show user activity`](#show-user-activity) | Show the most recent usage of SSR. |

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
| [`delete user tokens`](#delete-user-tokens) | Revoke API access tokens for a user. |
| [`edit user`](#edit-user) | Modify an existing user account |
| [`edit user mode`](#edit-user-mode) | Edit the current user&#x27;s configuration mode. |
| [`restore prompt`](#restore-prompt) | Restore the PCLI prompt to the factory default. |
| [`restore users factory-default`](#restore-users-factory-default) | Restore the user configuration to factory defaults. |
| [`set password`](#set-password) | Change your password. |
| [`show roles`](#show-roles) | Display all configured roles |
| [`show user`](#show-user) | Display information for user accounts. |
| [`show user activity`](#show-user-activity) | Show the most recent usage of SSR. |

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

##### Subcommands

| command | description |
| ------- | ----------- |
| [`mode`](#edit-user-mode) | Edit the current user&#x27;s configuration mode. |

##### See Also

| command | description |
| ------- | ----------- |
| [`create user`](#create-user) | Create a new user account interactively. |
| [`delete user`](#delete-user) | Delete a user account |
| [`delete user tokens`](#delete-user-tokens) | Revoke API access tokens for a user. |
| [`edit prompt`](#edit-prompt) | Allows the user to specify a custom format for the PCLI prompt. |
| [`edit user mode`](#edit-user-mode) | Edit the current user&#x27;s configuration mode. |
| [`restore prompt`](#restore-prompt) | Restore the PCLI prompt to the factory default. |
| [`restore users factory-default`](#restore-users-factory-default) | Restore the user configuration to factory defaults. |
| [`set password`](#set-password) | Change your password. |
| [`show roles`](#show-roles) | Display all configured roles |
| [`show user`](#show-user) | Display information for user accounts. |
| [`show user activity`](#show-user-activity) | Show the most recent usage of SSR. |

#### Description

:::note
The password must be at least eight characters long, with at least one uppercase letter, one lowercase letter, one digit, and cannot contain any characters that repeat more than three times.
:::

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

## `edit user mode`

Edit the current user&#x27;s configuration mode.

#### Usage

```
edit user mode <value>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| value | basic \| advanced |

##### See Also

| command | description |
| ------- | ----------- |
| [`create user`](#create-user) | Create a new user account interactively. |
| [`delete user`](#delete-user) | Delete a user account |
| [`delete user tokens`](#delete-user-tokens) | Revoke API access tokens for a user. |
| [`edit prompt`](#edit-prompt) | Allows the user to specify a custom format for the PCLI prompt. |
| [`edit user`](#edit-user) | Modify an existing user account |
| [`restore prompt`](#restore-prompt) | Restore the PCLI prompt to the factory default. |
| [`restore users factory-default`](#restore-users-factory-default) | Restore the user configuration to factory defaults. |
| [`set password`](#set-password) | Change your password. |
| [`show roles`](#show-roles) | Display all configured roles |
| [`show user`](#show-user) | Display information for user accounts. |
| [`show user activity`](#show-user-activity) | Show the most recent usage of SSR. |

#### Description

Advanced mode exposes additional configuration elements for editing and viewing.

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
| [`set config encryption`](#set-config-encryption) | Sets the encryption key for the SSR configuration |
| [`show config exports`](#show-config-exports) | Display configuration exports. |
| [`show config version`](#show-config-version) | Display running configuration version. |
| [`show events config commit`](#show-events-config-commit) | Shows events related to running config change |
| [`show stats config`](cli_stats_reference.md#show-stats-config) | Metrics pertaining to the get-config RPC |

#### Description

The _export_ command takes a configuration from a previously created backup (via _create config backup_), from the candidate configuration, or from the SSR&#x27;s running configuration, and stores it as a file on the local filesystem. It can then be taken off, moved onto other systems, archived, etc.

Exported files are stored in /etc/128technology/config-exports/ and are stored as GZIP compressed files.

The _export_ command&#x27;s complement, _import_ is used to reverse the process, taking a configuration archive and restoring it onto a system.
The _delete config exported_ command removes unneeded exported configurations.
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

This command allows administrators to load certificates into their SSR by pasting them into their active PCLI session. By issuing the `import certificate` command, the PCLI prompts the user for the name of the certificate they plan to import, then asks whether it is a CA (certificate authority) certificate or not. Once these questions are answered, administrators can paste the certificate, and is reminded to press CTRL-D once the pasting is complete. Pressing CTRL-D causes the SSR to validate the configuration to ensure it is a valid X.509 certificate before loading it into persistent storage. If the X.509 validation fails, the user is informed as follows:

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
| [`set config encryption`](#set-config-encryption) | Sets the encryption key for the SSR configuration |
| [`show config exports`](#show-config-exports) | Display configuration exports. |
| [`show config version`](#show-config-version) | Display running configuration version. |
| [`show events config commit`](#show-events-config-commit) | Shows events related to running config change |
| [`show stats config`](cli_stats_reference.md#show-stats-config) | Metrics pertaining to the get-config RPC |

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

Import SSR ISO to the local repository

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

## `lookup application by-address`

Look up application identification by address key

#### Usage

```
lookup application by-address router <router> node <node> <ip> <port> <protocol>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| node | The node on which to look up application identification |
| router | The router on which to look up application identification |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip | IP address of the address key [type: IP address] |
| port | Port of the address key [type: port] |
| protocol | Protocol of the address key [type: string or uint8] |

##### See Also

| command | description |
| ------- | ----------- |
| [`clear app-id cache`](#clear-app-id-cache) | Clear app-id entries from cache |
| [`clear app-id cache-entry address`](#clear-app-id-cache-entry-address) | Clear specific app-id entry from cache by address key |
| [`clear app-id cache-entry domain`](#clear-app-id-cache-entry-domain) | Clear specific app-id entry from cache by domain name key |
| [`clear app-id cache-entry url`](#clear-app-id-cache-entry-url) | Clear specific app-id entry from cache by url key |
| [`lookup application by-domain`](#lookup-application-by-domain) | Look up application identification by domain name or url key |
| [`show app-id cache`](#show-app-id-cache) | Show information of app-id entries in cache |
| [`show stats app-id application-director cache`](cli_stats_reference.md#show-stats-app-id-application-director-cache) | Statistics for &#x27;cache&#x27; |

## `lookup application by-domain`

Look up application identification by domain name or url key

#### Usage

```
lookup application by-domain router <router> node <node> <domain-url>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| node | The node on which to look up application identification |
| router | The router on which to look up application identification |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| domain-url | Domain name or URL |

##### See Also

| command | description |
| ------- | ----------- |
| [`clear app-id cache`](#clear-app-id-cache) | Clear app-id entries from cache |
| [`clear app-id cache-entry address`](#clear-app-id-cache-entry-address) | Clear specific app-id entry from cache by address key |
| [`clear app-id cache-entry domain`](#clear-app-id-cache-entry-domain) | Clear specific app-id entry from cache by domain name key |
| [`clear app-id cache-entry url`](#clear-app-id-cache-entry-url) | Clear specific app-id entry from cache by url key |
| [`lookup application by-address`](#lookup-application-by-address) | Look up application identification by address key |
| [`show app-id cache`](#show-app-id-cache) | Show information of app-id entries in cache |
| [`show stats app-id application-director cache`](cli_stats_reference.md#show-stats-app-id-application-director-cache) | Statistics for &#x27;cache&#x27; |

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
| [`show plugins categories`](#show-plugins-categories) | Shows all possible plugin categories. |
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
| [`show plugins categories`](#show-plugins-categories) | Shows all possible plugin categories. |
| [`show plugins installed`](#show-plugins-installed) | Shows installed plugins. |

## `migrate`

Migrate an SSR to a new conductor. For more details on the SSR rotuer migration read the [How to: Conductor Migration](howto_conductor_migration.md).

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
| [`send command download`](#send-command-download) | Download SSR software on a router |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command restart`](#send-command-restart) | Restart an SSR node |
| [`send command rollback`](#send-command-rollback) | Rollback an SSR to the previously installed version |
| [`send command start`](#send-command-start) | Start an SSR node |
| [`send command stop`](#send-command-stop) | Stop an SSR node |
| [`send command upgrade`](#send-command-upgrade) | Upgrade an SSR node |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the SSR software versions available for download and upgrade. |
| [`show assets`](#show-assets) | Shows the automated provisioning status of SSR nodes. |
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
refresh dns resolutions [{router <router> | resource-group <resource-group>}] [hostname <hostname>] [force]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| hostname | The DNS hostname belonging to a node |
| resource-group | The name of the resource group |
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
release dhcp lease [force] [node <node>] {router <router> | resource-group <resource-group>} network-interface <network-interface>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| network-interface | The network interface on which to release the current DHCP lease |
| node | The name of the node (default: all) |
| resource-group | The name of the resource group |
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
replace config <find> <replace>
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

## `request idp restart`

Restart IDP Command

#### Usage

```
request idp restart [force] [rebuild] router <router> node <node>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |
| node | The node for which to restart IDP |
| rebuild | Delete and rebuild IDP |
| router | The router for which to restart IDP |

##### See Also

| command | description |
| ------- | ----------- |
| [`show idp application status`](#show-idp-application-status) | Show IDP application status. |
| [`show idp details`](#show-idp-details) | Show IDP details. |
| [`show idp events`](#show-idp-events) | Show all IDP events. |
| [`show idp events by-application`](#show-idp-events-by-application) | Show IDP events by application. |
| [`show idp events by-attack`](#show-idp-events-by-attack) | Show IDP events by attack type. |
| [`show idp events by-severity`](#show-idp-events-by-severity) | Show IDP events by severity level. |
| [`show idp network`](#show-idp-network) | Show IDP networks. |
| [`show idp platform`](#show-idp-platform) | Show IDP platform data. |
| [`show idp signatures`](#show-idp-signatures) | Show IDP signature package details. |
| [`show stats idp`](cli_stats_reference.md#show-stats-idp) | Metrics about IDP. |

#### Description

Initiate a restart of the underlying IDP engine.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 6.0.4   | This feature was introduced |

## `request idp signature-query`

Request IDP signature database connectivity.

#### Usage

```
request idp signature-query [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to refresh security signature data |
| resource-group | The name of the resource group |
| router | The router for which to refresh security signature data |

#### Description

Query and display the IDP signature database connectivity details.

##### See Also

| command | description |
| ------- | ----------- |
| [`show idp application status`](#show-idp-application-status) | Show IDP application status. |
| [`show idp details`](#show-idp-details) | Show IDP details. |
| [`show idp events`](#show-idp-events) | Show all IDP events. |
| [`show idp events by-application`](#show-idp-events-by-application) | Show IDP events by application. |
| [`show idp events by-attack`](#show-idp-events-by-attack) | Show IDP events by attack type. |
| [`show idp events by-severity`](#show-idp-events-by-severity) | Show IDP events by severity level. |
| [`show idp network`](#show-idp-network) | Show IDP networks. |
| [`show idp platform`](#show-idp-platform) | Show IDP platform data. |
| [`show idp signatures`](#show-idp-signatures) | Show IDP signature package details. |
| [`show stats idp`](cli_stats_reference.md#show-stats-idp) | Metrics about IDP. |

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 6.0.4   | This feature was introduced |

## `request system software download`

Download a new version of the SSR.

#### Usage

```
request system software download version <version>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| version | The version to download. |

##### See Also

| command | description |
| ------- | ----------- |
| [`delete system software`](#delete-system-software) | Remove or cancel a previously started download. |
| [`request system software upgrade`](#request-system-software-upgrade) | Upgrade to a new version of the SSR. |
| [`set system software image`](#set-system-software-image) | Set the boot image. |
| [`show system software available`](#show-system-software-available) | Display new versions of the SSR that can be installed. |
| [`show system software download`](#show-system-software-download) | Display in-progress and completed downloads of new SSR versions. |
| [`show system software upgrade`](#show-system-software-upgrade) | Follow an in-progress upgrade. |
| [`show system version`](#show-system-version) | Show system version information. |

## `request system software upgrade`

Upgrade to a new version of the SSR.

#### Usage

```
request system software upgrade version <version>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| version | The version to upgrade to. |

##### See Also

| command | description |
| ------- | ----------- |
| [`delete system software`](#delete-system-software) | Remove or cancel a previously started download. |
| [`request system software download`](#request-system-software-download) | Download a new version of the SSR. |
| [`set system software image`](#set-system-software-image) | Set the boot image. |
| [`show system software available`](#show-system-software-available) | Display new versions of the SSR that can be installed. |
| [`show system software download`](#show-system-software-download) | Display in-progress and completed downloads of new SSR versions. |
| [`show system software upgrade`](#show-system-software-upgrade) | Follow an in-progress upgrade. |
| [`show system version`](#show-system-version) | Show system version information. |

#### Description

:::warning
This may be a service impacting operation.
:::

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
| [`set config encryption`](#set-config-encryption) | Sets the encryption key for the SSR configuration |
| [`show config exports`](#show-config-exports) | Display configuration exports. |
| [`show config version`](#show-config-version) | Display running configuration version. |
| [`show events config commit`](#show-events-config-commit) | Shows events related to running config change |
| [`show stats config`](cli_stats_reference.md#show-stats-config) | Metrics pertaining to the get-config RPC |

#### Description

This command removes all administrator-added configuration, and restores the basic configuration to all of the SSR&#x27;s factory default settings. The PCLI will prompt for confirmation before resetting the configuration, unless the optional _force_ modifier is added.

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
restore config running [force] [<username>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| username | Name of the account to discard candidate changes from (default: &lt;current user&gt;) |

##### See Also

| command | description |
| ------- | ----------- |
| [`compare config`](#compare-config) | Display the differences between two configurations. |
| [`create config autogenerated`](#create-config-autogenerated) | Run configuration generation. |
| [`delete config exported`](#delete-config-exported) | Delete an exported configuration from disk. |
| [`export config`](#export-config) | Export a copy of the current running or candidate config. |
| [`import config`](#import-config) | Import a configuration as the candidate config. |
| [`restore config factory-default`](#restore-config-factory-default) | Restore the candidate config to the factory defaults. |
| [`set config encryption`](#set-config-encryption) | Sets the encryption key for the SSR configuration |
| [`show config exports`](#show-config-exports) | Display configuration exports. |
| [`show config version`](#show-config-version) | Display running configuration version. |
| [`show events config commit`](#show-events-config-commit) | Shows events related to running config change |
| [`show stats config`](cli_stats_reference.md#show-stats-config) | Metrics pertaining to the get-config RPC |

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
| [`delete user tokens`](#delete-user-tokens) | Revoke API access tokens for a user. |
| [`edit prompt`](#edit-prompt) | Allows the user to specify a custom format for the PCLI prompt. |
| [`edit user`](#edit-user) | Modify an existing user account |
| [`edit user mode`](#edit-user-mode) | Edit the current user&#x27;s configuration mode. |
| [`restore users factory-default`](#restore-users-factory-default) | Restore the user configuration to factory defaults. |
| [`set password`](#set-password) | Change your password. |
| [`show roles`](#show-roles) | Display all configured roles |
| [`show user`](#show-user) | Display information for user accounts. |
| [`show user activity`](#show-user-activity) | Show the most recent usage of SSR. |

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
## `restore system factory-default`

Restore the system to factory defaults.

#### Usage

```
restore system factory-default [force] [router <router>] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |
| node | The name of the node |
| router | The name of the router (default: &lt;current router&gt;) |

#### Description

Once initiated, the system will begin to stop all running processes and restore the system to the factory default configuration. Once the process has been completed, the system will reboot.

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
| [`delete user tokens`](#delete-user-tokens) | Revoke API access tokens for a user. |
| [`edit prompt`](#edit-prompt) | Allows the user to specify a custom format for the PCLI prompt. |
| [`edit user`](#edit-user) | Modify an existing user account |
| [`edit user mode`](#edit-user-mode) | Edit the current user&#x27;s configuration mode. |
| [`restore prompt`](#restore-prompt) | Restore the PCLI prompt to the factory default. |
| [`set password`](#set-password) | Change your password. |
| [`show roles`](#show-roles) | Display all configured roles |
| [`show user`](#show-user) | Display information for user accounts. |
| [`show user activity`](#show-user-activity) | Show the most recent usage of SSR. |

#### Description

The _restore users factory-default_ command deletes all administratively created user accounts (i.e., all but the ones that are installed with the SSR routing software natively) and leaves the system with just the _admin_ and _user_ accounts.

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

This command is used to rotate log files (i.e., close the current log file and open a new one) generated by the various processes that comprise the SSR to rotate. The SSR&#x27;s log files, stored in `/var/log/128technology`, keep 25 prior logs for each process, space permitting. Files are rotated such that, for instance, pcli.log becomes pcli.1.log while pcli.1.log becomes pcli.2.log, and so on. The oldest log file for each process is removed.

The _rotate log_ command is useful prior to engaging in troubleshooting exercises, to help narrow down which files may contain items of interest. It is particularly useful when used in conjunction with the _write_ command, described elsewhere in this document.

Without any arguments, the _rotate log_ command will rotate all log files on all nodes.

For more information about SSR logging read [Understanding Logs on the SSR](ts_logs.md)

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
save runtime-stats [{router <router> | resource-group <resource-group>}] [force] [node <node>] <filename> [<process-name>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | Target node from which to gather runtime stats |
| resource-group | The name of the resource group |
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
save tech-support-info [force] [manifest <manifest>] [router <router>] [node <node>] [<prefix>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |
| manifest | The manifest describing the commands and logs to collect (default: summary) |
| node | The name of the node |
| router | The name of the router (default: &lt;current router&gt;) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| prefix | Custom file prefix to add the archive file |

#### Description

This command packages statistics, logs and other diagnostic data, to exchange with Juniper's support team. The _tech-support-info_ command echoes the location where it stores the file when complete (`/var/log/128technology/tech-support-info.tar.gz`).

New manifest files can be created and placed into `/etc/128technology/tech-support-manifests`. Each manifest contains a list of PCLI commands, shell commands, files, and systemd journal&#x27;s to collect.

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
search [limit <limit>] <find>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| limit | limit the maximum number of results [type: int] |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| find | Find all the matching text |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`commands`](#search-commands) | Search PCLI commands. |
| [`config`](#search-config) | Search both config datastores for specific data. |
| [`config-attributes`](#search-config-attributes) | Search configuration attributes. |

#### Description

The _search_ command and its various subcommands let users search through the SSR&#x27;s PCLI command tree, the configuration tree, and user-supplied configuration data to locate the information specified by the supplied _find_ string.

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

Search PCLI commands.

#### Usage

```
search commands [limit <limit>] <find>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| limit | limit the maximum number of results [type: int] |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| find | Find all the matching text |

## `search config`

Search both config datastores for specific data.

#### Usage

```
search config [limit <limit>] <find>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| limit | limit the maximum number of results [type: int] |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| find | Find all the matching text |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`candidate`](#search-config-candidate) | Search candidate configuration data |
| [`running`](#search-config-running) | Search running configuration data |

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
search config candidate [limit <limit>] <find>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| limit | limit the maximum number of results [type: int] |

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
search config running [limit <limit>] <find>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| case-sensitive | Interpret the search query as case-sensitive |
| limit | limit the maximum number of results [type: int] |
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

Search configuration attributes.

#### Usage

```
search config-attributes [limit <limit>] <find>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| limit | limit the maximum number of results [type: int] |

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

Download SSR software on a router

#### Usage

```
send command download [dry-run] [force] {router <router> | resource-group <resource-group>} [<version>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| dry-run | View version changes without command execution |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The router on which to download software |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| version | The version of SSR as semantic version and optionally a release identifier (e.g. &quot;3.0.0&quot; or &quot;3.0.1-snapshot1&quot;); if not provided, the latest is assumed |

##### See Also

| command | description |
| ------- | ----------- |
| [`migrate`](#migrate) | Migrate an SSR to a new conductor |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command restart`](#send-command-restart) | Restart an SSR node |
| [`send command rollback`](#send-command-rollback) | Rollback an SSR to the previously installed version |
| [`send command start`](#send-command-start) | Start an SSR node |
| [`send command stop`](#send-command-stop) | Stop an SSR node |
| [`send command sync`](#send-command-sync) | Transition an asset back to &#x27;connected&#x27; and perform a sync. |
| [`send command upgrade`](#send-command-upgrade) | Upgrade an SSR node |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the SSR software versions available for download and upgrade. |
| [`show assets`](#show-assets) | Shows the automated provisioning status of SSR nodes. |
| [`show assets software`](#show-assets-software) | Shows assets software information. |
| [`show assets summary`](#show-assets-summary) | A summary of assets connected to the Conductor. |

#### Description

_send command_ is only available within the PCLI of an SSR Conductor.

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

| command | description |
| ------- | ----------- |
| [`disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |

##### See Also

| command | description |
| ------- | ----------- |
| [`migrate`](#migrate) | Migrate an SSR to a new conductor |
| [`send command download`](#send-command-download) | Download SSR software on a router |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command restart`](#send-command-restart) | Restart an SSR node |
| [`send command rollback`](#send-command-rollback) | Rollback an SSR to the previously installed version |
| [`send command start`](#send-command-start) | Start an SSR node |
| [`send command stop`](#send-command-stop) | Stop an SSR node |
| [`send command sync`](#send-command-sync) | Transition an asset back to &#x27;connected&#x27; and perform a sync. |
| [`send command upgrade`](#send-command-upgrade) | Upgrade an SSR node |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the SSR software versions available for download and upgrade. |
| [`show assets`](#show-assets) | Shows the automated provisioning status of SSR nodes. |
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
| [`migrate`](#migrate) | Migrate an SSR to a new conductor |
| [`send command download`](#send-command-download) | Download SSR software on a router |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command restart`](#send-command-restart) | Restart an SSR node |
| [`send command rollback`](#send-command-rollback) | Rollback an SSR to the previously installed version |
| [`send command start`](#send-command-start) | Start an SSR node |
| [`send command stop`](#send-command-stop) | Stop an SSR node |
| [`send command sync`](#send-command-sync) | Transition an asset back to &#x27;connected&#x27; and perform a sync. |
| [`send command upgrade`](#send-command-upgrade) | Upgrade an SSR node |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the SSR software versions available for download and upgrade. |
| [`show assets`](#show-assets) | Shows the automated provisioning status of SSR nodes. |
| [`show assets software`](#show-assets-software) | Shows assets software information. |
| [`show assets summary`](#show-assets-summary) | A summary of assets connected to the Conductor. |

## `send command restart`

Restart an SSR node

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
| [`migrate`](#migrate) | Migrate an SSR to a new conductor |
| [`send command download`](#send-command-download) | Download SSR software on a router |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command rollback`](#send-command-rollback) | Rollback an SSR to the previously installed version |
| [`send command start`](#send-command-start) | Start an SSR node |
| [`send command stop`](#send-command-stop) | Stop an SSR node |
| [`send command sync`](#send-command-sync) | Transition an asset back to &#x27;connected&#x27; and perform a sync. |
| [`send command upgrade`](#send-command-upgrade) | Upgrade an SSR node |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the SSR software versions available for download and upgrade. |
| [`show assets`](#show-assets) | Shows the automated provisioning status of SSR nodes. |
| [`show assets software`](#show-assets-software) | Shows assets software information. |
| [`show assets summary`](#show-assets-summary) | A summary of assets connected to the Conductor. |

#### Description

_send command_ is only available within the PCLI of an SSR Conductor.

## `send command rollback`

Rollback an SSR to the previously installed version

#### Usage

```
send command rollback [force] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The router to rollback |

##### See Also

| command | description |
| ------- | ----------- |
| [`migrate`](#migrate) | Migrate an SSR to a new conductor |
| [`send command download`](#send-command-download) | Download SSR software on a router |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command restart`](#send-command-restart) | Restart an SSR node |
| [`send command start`](#send-command-start) | Start an SSR node |
| [`send command stop`](#send-command-stop) | Stop an SSR node |
| [`send command sync`](#send-command-sync) | Transition an asset back to &#x27;connected&#x27; and perform a sync. |
| [`send command upgrade`](#send-command-upgrade) | Upgrade an SSR node |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the SSR software versions available for download and upgrade. |
| [`show assets`](#show-assets) | Shows the automated provisioning status of SSR nodes. |
| [`show assets software`](#show-assets-software) | Shows assets software information. |
| [`show assets summary`](#show-assets-summary) | A summary of assets connected to the Conductor. |

#### Description

_send command_ is only available within the PCLI of an SSR Conductor.

## `send command start`

Start an SSR node

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
| [`migrate`](#migrate) | Migrate an SSR to a new conductor |
| [`send command download`](#send-command-download) | Download SSR software on a router |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command restart`](#send-command-restart) | Restart an SSR node |
| [`send command rollback`](#send-command-rollback) | Rollback an SSR to the previously installed version |
| [`send command stop`](#send-command-stop) | Stop an SSR node |
| [`send command sync`](#send-command-sync) | Transition an asset back to &#x27;connected&#x27; and perform a sync. |
| [`send command upgrade`](#send-command-upgrade) | Upgrade an SSR node |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the SSR software versions available for download and upgrade. |
| [`show assets`](#show-assets) | Shows the automated provisioning status of SSR nodes. |
| [`show assets software`](#show-assets-software) | Shows assets software information. |
| [`show assets summary`](#show-assets-summary) | A summary of assets connected to the Conductor. |

#### Description

_send command_ is only available within the PCLI of an SSR Conductor.

## `send command stop`

Stop an SSR node

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
| [`migrate`](#migrate) | Migrate an SSR to a new conductor |
| [`send command download`](#send-command-download) | Download SSR software on a router |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command restart`](#send-command-restart) | Restart an SSR node |
| [`send command rollback`](#send-command-rollback) | Rollback an SSR to the previously installed version |
| [`send command start`](#send-command-start) | Start an SSR node |
| [`send command sync`](#send-command-sync) | Transition an asset back to &#x27;connected&#x27; and perform a sync. |
| [`send command upgrade`](#send-command-upgrade) | Upgrade an SSR node |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the SSR software versions available for download and upgrade. |
| [`show assets`](#show-assets) | Shows the automated provisioning status of SSR nodes. |
| [`show assets software`](#show-assets-software) | Shows assets software information. |
| [`show assets summary`](#show-assets-summary) | A summary of assets connected to the Conductor. |

#### Description

_send command_ is only available within the PCLI of an SSR Conductor.

## `send command sync`

Transition an asset back to &#x27;connected&#x27; and perform a sync.

#### Usage

```
send command sync [{router <router> | resource-group <resource-group>}] [force] [force] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | A single &#x27;force&#x27; forces the synchronization by disabling the smart sync skip mechanism. A second &#x27;force&#x27; skips the confirmation prompt. This argument can be repeated up to 2 times |
| node | The node to sync |
| resource-group | The name of the resource group |
| router | The router to sync (default: &lt;current router&gt;) |

##### See Also

| command | description |
| ------- | ----------- |
| [`migrate`](#migrate) | Migrate a SSR router to a new conductor |
| [`send command download`](#send-command-download) | Download SSR software on a router |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command restart`](#send-command-restart) | Restart a SSR node |
| [`send command rollback`](#send-command-rollback) | Rollback a SSR router to the previously installed version |
| [`send command start`](#send-command-start) | Start a SSR node |
| [`send command stop`](#send-command-stop) | Stop a SSR node |
| [`send command upgrade`](#send-command-upgrade) | Upgrade a SSR node |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the SSR software versions available for download and upgrade. |
| [`show assets`](#show-assets) | Shows the automated provisioning status of SSR nodes. |
| [`show assets software`](#show-assets-software) | Shows assets software information. |
| [`show assets summary`](#show-assets-summary) | A summary of assets connected to the Conductor. |

#### Description

Transition an asset back to &#x27;connected&#x27; and perform a sync. The sync operation ensures the asset is provisioned correctly and all plugin changes are applied.

## `send command upgrade`

Upgrade an SSR node

#### Usage

```
send command upgrade [dry-run] [force] {router <router> | resource-group <resource-group>} <version>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| dry-run | View version changes without command execution |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The router to upgrade |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| version | The version of SSR as semantic version and optionally a release identifier (e.g. &quot;3.0.0&quot; or &quot;3.0.1-snapshot1&quot;); if not provided, the latest is assumed |

##### See Also

| command | description |
| ------- | ----------- |
| [`migrate`](#migrate) | Migrate an SSR to a new conductor |
| [`send command download`](#send-command-download) | Download SSR software on a router |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command restart`](#send-command-restart) | Restart an SSR node |
| [`send command rollback`](#send-command-rollback) | Rollback an SSR to the previously installed version |
| [`send command start`](#send-command-start) | Start an SSR node |
| [`send command stop`](#send-command-stop) | Stop an SSR node |
| [`send command sync`](#send-command-sync) | Transition an asset back to &#x27;connected&#x27; and perform a sync. |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the SSR software versions available for download and upgrade. |
| [`show assets`](#show-assets) | Shows the automated provisioning status of SSR nodes. |
| [`show assets software`](#show-assets-software) | Shows assets software information. |
| [`show assets summary`](#show-assets-summary) | A summary of assets connected to the Conductor. |

#### Description

_send command_ is only available within the PCLI of an SSR Conductor.

## `send command yum-cache-refresh`

Refresh the yum cache as well as the SSR software versions available for download and upgrade.

#### Usage

```
send command yum-cache-refresh [force] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The router to refresh |

##### See Also

| command | description |
| ------- | ----------- |
| [`migrate`](#migrate) | Migrate an SSR to a new conductor |
| [`send command download`](#send-command-download) | Download SSR software on a router |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command restart`](#send-command-restart) | Restart an SSR node |
| [`send command rollback`](#send-command-rollback) | Rollback an SSR to the previously installed version |
| [`send command start`](#send-command-start) | Start an SSR node |
| [`send command stop`](#send-command-stop) | Stop an SSR node |
| [`send command sync`](#send-command-sync) | Transition an asset back to &#x27;connected&#x27; and perform a sync. |
| [`send command upgrade`](#send-command-upgrade) | Upgrade an SSR node |
| [`show assets`](#show-assets) | Shows the automated provisioning status of SSR nodes. |
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

Sets the encryption key for the SSR configuration

#### Usage

```
set config encryption [{router <router> | resource-group <resource-group>}] [force] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |
| node | The node on which to disable config encryption (default: all) |
| resource-group | The name of the resource group |
| router | The router on which to set config encryption (default: &lt;current router&gt;) |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`disabled`](#set-config-encryption-disabled) | Disables the encryption for the SSR configuration |

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
| [`show stats config`](cli_stats_reference.md#show-stats-config) | Metrics pertaining to the get-config RPC |

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

Disables the encryption for the SSR configuration

#### Usage

```
set config encryption disabled [{router <router> | resource-group <resource-group>}] [force] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt |
| node | The node on which to disable config encryption (default: all) |
| resource-group | The name of the resource group |
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

| command | description |
| ------- | ----------- |
| [`configured`](#set-log-level-configured) | Reset the process log level to the configured system log level. |

##### See Also

| command | description |
| ------- | ----------- |
| [`rotate log`](#rotate-log) | Rotate log files. |
| [`write log message`](#write-log-message) | Write a message to the log. |
| [`write log snapshot`](#write-log-snapshot) | Write a snapshot to the log. |

#### Description

The _set log level_ command adjusts the degree to which the SSR writes information into its log files. This is used to selectively turn up and down log verbosity for troubleshooting purposes.

The optional &lt;process-name&gt; and &lt;node-name&gt; arguments, can selectively change only a specific SSR&#x27;s software process on a given node.

The _level_ must be one of: fatal, error, warning, info, debug, and trace. These are listed in order of increasing verbosity. Juniper generally recommends that systems be set to _info_ level by default under normal operating circumstances.

As of software version 3.1, a new subcommand _set log level category_, allows administrators to collectively adjust groups of related functionality for specific troubleshooting exercises – instead of blindly adjusting the entire system&#x27;s log level and potentially impacting performance.

The category can be any of the following:

| Category Name | Long Name | Description |
| ------------- | --------- | ----------- |
| ATCS | Analytics | Components related to the SSR Analytics Engine. |
| DATA | Metadata Database | Components related to the configuration and state databases. |
| DISC | Discovery | Discovery-based components (except BFD). Today this is DHCP and ARP. |
| USER | User | User-created log messages, generated via the &#x27;write&#x27; command. |
| FLC | FastLane Control | Control system for packet forwarding. |
| FLPP | First Packet Processing | System for processing the initial packet of each new session. |
| HWMC | HighwayManager Control | Control system for packet processing. |
| IPC | Interprocess Communications | The subsystem responsible for messaging between components within the SSR product. |
| LINK | Internode Link Detection | The subsystem for inter-node communication (today, BFD). |
| PLAT | Platform | Components related to the underlying platform management. |
| PLUG | Plugin Components | Components related to plugin management. |
| RDB | Redundancy Database | The subsystem responsible for synchronizing data between nodes. |
| RTG | Routing | Components related to the routing engine. |
| SESS | Session Startup | Components related to session setup. |
| STEP | STEP | Components related to STEP. |
| TEST | Test | Components related to testing. |
| UTIL | Utility | Components related to utility libraries. |
| DPDK | DPDK | Components related to DPDK. |
| DNS | Domain Name System | Components related to DNS. |
| PCLI | PCLI | All the PCLI&#x27;s log messages. |
| BONS | Configuration Database | Components related to the configuration database. |
| LDAP | LDAP | All the System Security Services Daemon logs. |
| IDP | IDP | Components related to IDP. |

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |
| 3.1.0   | Log categories introduced   |
| 6.0.0   | LDAP category added         |

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
| process-name | The process for which to set the log level (the log level will change for all processes when no process is specified) (default: all) |

#### Description

Will return the SSR&#x27;s logging behavior to the verbosity specified within the configuration, located at: `authority &gt; router &gt; system &gt; log-level`. Alternatively, administrators can specify a log level to dynamically change all system processes to use.

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
| [`delete user tokens`](#delete-user-tokens) | Revoke API access tokens for a user. |
| [`edit prompt`](#edit-prompt) | Allows the user to specify a custom format for the PCLI prompt. |
| [`edit user`](#edit-user) | Modify an existing user account |
| [`edit user mode`](#edit-user-mode) | Edit the current user&#x27;s configuration mode. |
| [`restore prompt`](#restore-prompt) | Restore the PCLI prompt to the factory default. |
| [`restore users factory-default`](#restore-users-factory-default) | Restore the user configuration to factory defaults. |
| [`show roles`](#show-roles) | Display all configured roles |
| [`show user`](#show-user) | Display information for user accounts. |
| [`show user activity`](#show-user-activity) | Show the most recent usage of SSR. |

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

Set the provisional status of a device-interface to down, or returning it to the "up" state after taking it down. 

#### Usage

```
set provisional-status router <router> node <node> <name> <status>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| node | The node on which to set the device&#x27;s provisional status |
| router | The router on which to set the device&#x27;s provisional status |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | Device interface on which to set the provisional status |
| status | The desired provisional status for the device |

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

## `set software access-token`

Save credentials for accessing SSR software repositories.

#### Usage

```
set software access-token [{router <router> | resource-group <resource-group>}] [force] [node <node>] <username> <token>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers. |
| node | The name of the node. |
| resource-group | The name of the resource group. |
| router | The name of the router (default: &lt;current router&gt;). |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| username | The username for the software access account. |
| token | Authentication token for SSR software. |

| Release | Modification                |
| ------- | ----------------------------|
| 5.5.2   | This feature was introduced |

## `set system software image`

Set the boot image.

#### Usage

```
set system software image <image>
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| image | The image to load on next boot |

##### See Also

| command | description |
| ------- | ----------- |
| [`delete system software`](#delete-system-software) | Remove or cancel a previously started download. |
| [`request system software download`](#request-system-software-download) | Download a new version of the SSR. |
| [`request system software upgrade`](#request-system-software-upgrade) | Upgrade to a new version of the SSR. |
| [`show system software available`](#show-system-software-available) | Display new versions of the SSR that can be installed. |
| [`show system software download`](#show-system-software-download) | Display in-progress and completed downloads of new SSR versions. |
| [`show system software upgrade`](#show-system-software-upgrade) | Follow an in-progress upgrade. |
| [`show system version`](#show-system-version) | Show system version information. |

| Release | Modification                |
| ------- | ----------------------------|
| 6.0.0   | This feature was introduced |

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
show alarms [{router <router> | resource-group <resource-group>}] [shelved] [id <id>] [force]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| id | ID for which to display alarm information |
| resource-group | The name of the resource group |
| router | The router for which to display alarms (default: all) |
| shelved | Display shelved alarms |

##### See Also

| command | description |
| ------- | ----------- |
| [`show events alarm`](#show-events-alarm) | Show alarm events from the historical events database. |

#### Description

The _show alarms_ subcommand shows all of the active alarms on your SSR.

A list of all alarms your SSR is capable of generating and details about them can be found in the [Alarm Guide](events_alarms.md).

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

## `show app-id cache`

Show information of app-id entries in cache

#### Usage

```
show app-id cache [rows <rows>] [force] [node <node>] {router <router> | resource-group <resource-group>} <cache>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node on which to show app-id cache entries |
| resource-group | The name of the resource group |
| router | The router on which to show app-id cache entries |
| rows | The number of app-id cache to display at once [type: int or &#x27;all&#x27;] (default: 50) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| cache | Show app-id entries from address, domain, or url cache |

##### See Also

| command | description |
| ------- | ----------- |
| [`clear app-id cache`](#clear-app-id-cache) | Clear app-id entries from cache |
| [`clear app-id cache-entry address`](#clear-app-id-cache-entry-address) | Clear specific app-id entry from cache by address key |
| [`clear app-id cache-entry domain`](#clear-app-id-cache-entry-domain) | Clear specific app-id entry from cache by domain name key |
| [`clear app-id cache-entry url`](#clear-app-id-cache-entry-url) | Clear specific app-id entry from cache by url key |
| [`lookup application by-address`](#lookup-application-by-address) | Look up application identification by address key |
| [`lookup application by-domain`](#lookup-application-by-domain) | Look up application identification by domain name or url key |
| [`show stats app-id application-director cache`](cli_stats_reference.md#show-stats-app-id-application-director-cache) | Statistics for &#x27;cache&#x27; |

## `show app-id categories`

Show available top-level categories

#### Usage

```
show app-id categories [router <router>] [node <node>] [<name>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| node | The node on which to show app-id categories |
| router | The router on which to show app-id categories (default: &lt;current router&gt;) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | Display the subcategories for category &#x27;name&#x27; |

## `show application modules registration`

Display registered application-modules.

#### Usage

```
show application modules registration [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The name of the node |
| resource-group | The name of the resource group |
| router | The name of the router |

##### See Also

| command | description |
| ------- | ----------- |
| [`show application modules status`](#show-application-modules-status) | Display applications provided by a module. |

#### Description

The _show application modules registration_ subcommand shows all of the modules that provide application names to SSR as part of its Application Classification feature.

## `show application modules status`

Display applications provided by a module.

#### Usage

```
show application modules status [rows <rows>] [force] [node <node>] {router <router> | resource-group <resource-group>} name <name> [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| name | The module to get status for |
| node | The name of the node |
| resource-group | The name of the resource group |
| router | The name of the router |
| rows | The number of application entries to display at once [type: int or &#x27;all&#x27;] (default: 50) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

##### See Also

| command | description |
| ------- | ----------- |
| [`show application modules registration`](#show-application-modules-registration) | Display registered application-modules. |

#### Description

The _show application modules status_ subcommand shows all of application names and transport information of a module, as well as other debugging information.

## `show application names`

Display application name entries.

#### Usage

```
show application names [rows <rows>] [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The name of the node |
| resource-group | The name of the resource group |
| router | The name of the router |
| rows | The number of application name entries to display at once [type: int or &#x27;all&#x27;] (default: 50) |

#### Description

The _show application names_ subcommand shows all of the application names that the SSR has learned, or been configured to recognize, as part of its Application Classification feature.

#### Example

```
admin@gouda.novigrad# show application names
Wed 2020-04-22 16:06:43 UTC

Node: gouda

================== =============== ================ ===================== =====================
 Application Name   Session Count   Ip Tuple Count   Date Discovered       Last Updated
================== =============== ================ ===================== =====================
 O365-Skype                     6                5   2021-04-14 09:20:09   2021-04-14 09:20:09
 O365-Exchange                  5               16   2021-04-14 09:20:09   2021-04-14 09:20:09
 O365-Common                    0               25   2021-04-14 09:20:09   2021-04-14 09:20:09
 O365-SharePoint                0                5   2021-04-14 09:20:09   2021-04-14 09:20:09
 dropbox                        0               65   2021-04-14 13:37:49   2021-04-14 13:37:49
 gmail                          0               17   2021-04-14 13:58:09   2021-04-14 13:58:09
 google-drive                   0               27   2021-04-14 13:58:09   2021-04-14 13:58:09
```

The various columns are as follows:

| Column | Description                      | 
| ------ | ---------------------------------|
| Application Name | The name of the identified application. |
| Session Count | The number of active sessions for the application. | 
| Ip Tuple Count | The number of addresses and ports associated with the application. |
| Date Discovered | The time at which the router first learned this application. Restarting the router or deleting the application will reset the time.  |
| Last Updated | The time at which the router updated the entries for the application. The time is updated when the ip tuple information associated with the application has changed.  |

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.2.0   | This feature was introduced |

## `show arp`

Shows the contents of the ARP table on the specified node.

#### Usage

```
show arp [rows <rows>] [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node from which to retrieve arp entries |
| resource-group | The name of the resource group |
| router | The router from which to retrieve arp entries |
| rows | The number of arps to display at once [type: int or &#x27;all&#x27;] (default: 50) |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`proxy`](#show-arp-proxy) | Display proxy ARP info for network-interfaces. |

##### See Also

| command | description |
| ------- | ----------- |
| [`clear arp`](#clear-arp) | Clear the entire ARP cache or a subset if arguments are provided. |

#### Description

The _show arp_ subcommand displays the ARP table (MAC address to IP address binding) for a given node. The number of lines of output may be controlled through the use of the optional _rows_ attribute. When not present, the SSR will default to displaying the first 50 rows of the specified node&#x27;s ARP table.

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
show arp proxy [{router <router> | resource-group <resource-group>}] [name <name>] [force] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| name | Network interface for which to display proxy ARP info (default: all) |
| node | The node for which to display proxy ARP info |
| resource-group | The name of the resource group |
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

Shows the automated provisioning status of SSR nodes.

#### Usage

```
show assets [{router <router> | resource-group <resource-group>}] [force] [node <node>] [<id>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display assets |
| resource-group | The name of the resource group |
| router | The router for which to display assets (default: all) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| id | The asset id of the SSR node from which to retrieve the status |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`errors`](#show-assets-errors) | Shows the SSR nodes that have errors. |
| [`software`](#show-assets-software) | Shows assets software information. |
| [`summary`](#show-assets-summary) | A summary of assets connected to the Conductor. |

##### See Also

| command | description |
| ------- | ----------- |
| [`migrate`](#migrate) | Migrate an SSR to a new conductor |
| [`send command download`](#send-command-download) | Download SSR software on a router |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command restart`](#send-command-restart) | Restart an SSR node |
| [`send command rollback`](#send-command-rollback) | Rollback an SSR to the previously installed version |
| [`send command start`](#send-command-start) | Start an SSR node |
| [`send command stop`](#send-command-stop) | Stop an SSR node |
| [`send command upgrade`](#send-command-upgrade) | Upgrade an SSR node |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the SSR software versions available for download and upgrade. |
| [`show assets software`](#show-assets-software) | Shows assets software information. |
| [`show assets summary`](#show-assets-summary) | A summary of assets connected to the Conductor. |

#### Description

The _show assets_ command displays the automated provisioning status of the SSR nodes within an Authority. With SSR&#x27;s automated provisioning feature set, each &quot;asset&quot; represents a platform into which the SSR software is installed, updated, managed, etc. The _show assets_ command allows administrators to see, at a glance, the state of all assets – including which software versions have been installed on which nodes, what their router and node identifiers are, etc.

#### Example

```
admin@labsystem1.fiedler# show assets
Fri 2017-07-21 11:12:49 EDT

========== ================ ============== ============== =============
 Asset Id   Router           Node           SSR Version   Status
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
 SSR Version:  3.1
 Status:        running

Completed in 0.19 seconds
```

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.1.0   | This feature was introduced |

## `show assets errors`

Shows the SSR nodes that have errors.

#### Usage

```
show assets errors [{router <router> | resource-group <resource-group>}] [force] [<id>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The router for which to display assets summary (default: all) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| id | The asset id of the SSR node from which to retrieve the status |

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
show assets software [{router <router> | resource-group <resource-group>}] [force] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display available software |
| resource-group | The name of the resource group |
| router | The router for which to display available software (default: all) |

##### See Also

| command | description |
| ------- | ----------- |
| [`migrate`](#migrate) | Migrate an SSR to a new conductor |
| [`send command download`](#send-command-download) | Download SSR software on a router |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command restart`](#send-command-restart) | Restart an SSR node |
| [`send command rollback`](#send-command-rollback) | Rollback an SSR to the previously installed version |
| [`send command start`](#send-command-start) | Start an SSR node |
| [`send command stop`](#send-command-stop) | Stop an SSR node |
| [`send command upgrade`](#send-command-upgrade) | Upgrade an SSR node |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the SSR software versions available for download and upgrade. |
| [`show assets`](#show-assets) | Shows the automated provisioning status of SSR nodes. |
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
show assets summary [{router <router> | resource-group <resource-group>}] [force]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The router for which to display assets summary (default: all) |

##### See Also

| command | description |
| ------- | ----------- |
| [`migrate`](#migrate) | Migrate an SSR to a new conductor |
| [`send command download`](#send-command-download) | Download SSR software on a router |
| [`send command reconnect`](#send-command-reconnect) | Attempt to reconnect an asset |
| [`send command reconnect disconnected`](#send-command-reconnect-disconnected) | Attempt to reconnect all disconnected assets. |
| [`send command restart`](#send-command-restart) | Restart an SSR node |
| [`send command rollback`](#send-command-rollback) | Rollback an SSR to the previously installed version |
| [`send command start`](#send-command-start) | Start an SSR node |
| [`send command stop`](#send-command-stop) | Stop an SSR node |
| [`send command upgrade`](#send-command-upgrade) | Upgrade an SSR node |
| [`send command yum-cache-refresh`](#send-command-yum-cache-refresh) | Refresh the yum cache as well as the SSR software versions available for download and upgrade. |
| [`show assets`](#show-assets) | Shows the automated provisioning status of SSR nodes. |
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

## `show bfd`

Show BFD Peer &lt;&gt;

#### Usage

```
show bfd [vrf <vrf>] [peer <ip>] [force] {router <router> | resource-group <resource-group>} [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers. |
| peer | Retrieve BFD information for this peer. |
| resource-group | The name of the resource group. |
| router | The router to request BFD information from. |
| vrf | VRF name |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

## `show bgp`

Displays information about the state of the BGP process on the SSR.

#### Usage

```
show bgp [rows <rows>] [vrf <vrf>] [force] {router <router> | resource-group <resource-group>} [<route>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The name of the router for which to display BGP routes |
| rows | The number of bgp entries to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| vrf | VRF name |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| route | route ip-prefix [type: IP prefix] |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`neighbors`](#show-bgp-neighbors) | Displays information about the state of the BGP neighbors on the SSR. |
| [`summary`](#show-bgp-summary) | Show the current BGP summary from the routing manager. |

##### See Also

| command | description |
| ------- | ----------- |
| [`clear bgp`](#clear-bgp) | Clear routes associated with one or all BGP neighbors. |

#### Description

The _show bgp_ command and associated subcommands display information about the state of the BGP process on the SSR. Each of these subcommands will be described in more detail in the sections that follow.

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

The &lt;route&gt; argument is given as an IP prefix (CIDR). The _show bgp &lt;route&gt;_ command gives detailed information on the specified route, if it exists in the SSR&#39;s Routing Information Base (RIB).
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

Displays information about the state of the BGP neighbors on the SSR.

#### Usage

```
show bgp neighbors [rows <rows>] [vrf <vrf>] [force] {router <router> | resource-group <resource-group>} [<neighbor-ip>] [<option>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The name of the router for which to display BGP neighbors |
| rows | The number of bgp entries to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| vrf | VRF name |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| neighbor-ip | The IP address of the neighbor [type: IP address] |
| option | advertised-routes \| received-routes |

#### Description

The _show bgp neighbors_ command displays detailed information about each of the SSR&#x27;s BGP peers. By specifying a specific peer (through the optional argument _&lt;neighbor-ip&gt;_), administrators can view state information about one peer at a time. When specifying a specific neighbor, the output may include the routes shared with that peer by appending _advertised-route_ or received from that peer by appending _received-routes_.

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
show bgp summary [rows <rows>] [vrf <vrf>] [force] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The name of the router for which to display the BGP summary |
| rows | The number of bgp entries to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| vrf | VRF name |

#### Description

The _show bgp summary_ gives administrators a high-level summary table of the state of all of the SSR&#x27;s BGP peers.

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
show capacity [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node from which to retrieve capacities |
| resource-group | The name of the resource group |
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
show capture-filters [{router <router> | resource-group <resource-group>}] [device-interface <device-interface>] [force] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| device-interface | Device interface on which to show capture-filters (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node on which to show capture-filters |
| resource-group | The name of the resource group |
| router | The router on which to show capture-filters (default: all) |

##### See Also

| command | description |
| ------- | ----------- |
| [`create capture-filter`](#create-capture-filter) | Creates a capture-filter using BPF syntax (as used in wireshark) on the target interface. |
| [`delete capture-filter`](#delete-capture-filter) | Deletes a capture-filter created using create capture-filter. (It will not delete filters committed as part of the configuration.) |
| [`show stats packet-capture`](cli_stats_reference.md#show-stats-packet-capture) | Stats pertaining to captured packets |

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


## `show config candidate`

Display candidate configuration data
#### Usage

```
show config candidate [verbose] [flat]
```

#### Description

This command returns the current candidate configuration on the SSR (i.e., the configuration that is currently being edited, not the configuration that is actively running). The output from _show config candidate_ will only show fields and values within the configuration that are set to non-default values, for brevity.

The _show config candidate_ command has two optional flags: _verbose_ and _flat_. Adding the _verbose_ flag will show the entire configuration, including items that are part of the system&#39;s default configuration (normally hidden when using _show config candidate_ by itself). Adding the _flat_ flag will output the configuration as a series of individual, fully qualified configuration statements, which can singularly affect each component of the configuration discretely. That is, any of the lines can be used without any context to configure a single attribute, object, etc.

Note that the output from _show config candidate_ is formatted in such a way so as to allow the text to be cut and pasted into a CLI session to configure a separate SSR.

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

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| flat | Display with full paths on each line instead of as a hierarchy |
| verbose | Display all config data, including default values |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`authority`](#show-config-candidate-authority) | Show configuration data for `authority` |
| [`generated`](#show-config-candidate-generated) | Show configuration data for `generated` |

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced as "show candidate-config" |
| 2.0.0   | Renamed and reorganized as "show config candidate". _flat_, _verbose_, and configuration branch arguments added |

## `show config exports`

Display configuration exports.

#### Usage

```
show config exports [<name>] [<flat>]
```

#### Description

This command lists the set of exported configurations that are stored on your SSR. 

The _show config exports_ command has two optional flags: _name_ and _flat_. Use the _name_ flag to identify a specific configuration to display. Adding the _flat_ flag will output the configuration as a series of individual, fully qualified configuration statements.

##### Positional Arguments

| name | description |
| ---- | ----------- |
| name | The name of the exported configuration to display (default: all) |
| flat | Display with full paths on each line instead of as a hierarchy. Only applicable when name is not &#x27;all&#x27; |

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
| [`set config encryption`](#set-config-encryption) | Sets the encryption key for the SSR configuration |
| [`show config version`](#show-config-version) | Display running configuration version. |
| [`show events config commit`](#show-events-config-commit) | Shows events related to running config change |
| [`show stats config`](cli_stats_reference.md#show-stats-config) | Metrics pertaining to the get-config RPC |


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

Display all routers with a locally modified config version.

#### Usage

```
show config locally-modified
```

## `show config out-of-sync`

Display all routers with a config version that is out of sync with the conductor.

#### Usage

```
show config out-of-sync
```

## `show config running`

Display running configuration data

#### Usage

```
show config running [verbose] [flat]
```

#### Description

This command returns the current running configuration on the SSR (i.e., the configuration that is active and processing traffic). The output from _show config running_ will only show fields and values within the configuration that are set to non-default values, for brevity.

The _show config running_ command has two optional flags: _verbose_ and _flat_. Adding the _verbose_ flag will show the entire configuration, including items that are part of the system&#39;s default configuration (normally hidden when using _show config running_ by itself). Adding the _flat_ flag will output the configuration as a series of individual, fully qualified configuration statements, which can singularly affect each component of the configuration discretely. That is, any of the lines can be used without any context to configure a single attribute, object, etc.

Note that the output from _show config running_ is formatted in such a way so as to allow the text to be cut and pasted into a CLI session to configure a separate SSR.

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

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| flat | Display with full paths on each line instead of as a hierarchy |
| verbose | Display all config data, including default values |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`authority`](#show-config-running-authority) | Show configuration data for `authority` |
| [`generated`](#show-config-running-generated) | Show configuration data for `generated` |

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced as "show running-config" |
| 2.0.0   | Renamed and reorganized as "show config running" |


## `show config version`

Display running configuration version.

#### Usage

```
show config version [{router <router> | resource-group <resource-group>}] [force]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
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
| [`set config encryption`](#set-config-encryption) | Sets the encryption key for the SSR configuration |
| [`show config exports`](#show-config-exports) | Display configuration exports. |
| [`show events config commit`](#show-events-config-commit) | Shows events related to running config change |
| [`show stats config`](cli_stats_reference.md#show-stats-config) | Metrics pertaining to the get-config RPC |

#### Description

This command displays the version number of the running configuration on the SSR. This version number is auto-generated, and is the UNIX timestamp when the configuration is committed. (As a consequence, you should expect that successive commits to the same configuration will increment the version by more than one. This is a change in behavior from pre-2.0 software, which used a monotonically incrementing integer to represent the configuration version.)

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
| verbosity | detail \| summary \| extended-statistics \| registers (default: detail) |

#### Description

This command displays detailed information about device interface(s) (i.e., physical ports) on an SSR node. The optional command line arguments allow a user to reduce the set of information to a specific set of interfaces on a given node, or a specific interface on a specific node.

Omitting all optional arguments will display detailed information on all device interfaces defined within the SSR.

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
show dhcp mappings [rows <rows>] [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node from which to identify DHCP mappings |
| resource-group | The name of the resource group |
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
show dhcp prefix-delegation [group <group>] [force] {router <router> | resource-group <resource-group>} [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| group | Prefix-delegation group to display (if omitted, all will be displayed) |
| resource-group | The name of the resource group |
| router | The name of the router to show |

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
show dhcp v4 [name <name>] [force] [node <node>] {router <router> | resource-group <resource-group>} [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| name | Network interface to display (default: all) |
| node | The node for which to display dhcp lease info |
| resource-group | The name of the resource group |
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
show dhcp v6 [name <name>] [force] [node <node>] {router <router> | resource-group <resource-group>} [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| name | Network interface to display (default: all) |
| node | The node for which to display dhcp lease info |
| resource-group | The name of the resource group |
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
show dns resolutions [{router <router> | resource-group <resource-group>}] [hostname <hostname>] [rows <rows>] [force] [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| hostname | The DNS hostname belonging to a node |
| resource-group | The name of the resource group |
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
show domain-categories [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display domain-name categories of active sessions |
| resource-group | The name of the resource group |
| router | The router for which to display domain-name categories of active sessions |

##### See Also

| command | description |
| ------- | ----------- |
| [`show domain-names`](#show-domain-names) | Display app-id-v2 domain-names used by sessions |

## `show domain-names`

Display app-id-v2 domain-names used by sessions

#### Usage

```
show domain-names [category <category>] [rows <rows>] [force] [node <node>] {router <router> | resource-group <resource-group>} [<request-order>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| category | Category to show domain-names for |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node from which to retrieve app-id domain-names |
| resource-group | The name of the resource group |
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
show dynamic-peer-update [{router <router> | resource-group <resource-group>}] [rows <rows>] [force] [<table>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | Router for which to show dynamic peer update information (default: all) |
| rows | The number of hostnames to display at once [type: int or &#x27;all&#x27;] (default: 50) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| table | Show the learned-hostnames of a router, or show the peer-hostnames of a router, or all (default: all) |

##### See Also

| command | description |
| ------- | ----------- |
| [`show stats dynamic-peer-update`](cli_stats_reference.md#show-stats-dynamic-peer-update) | Stats pertaining to dynamic peer update processes |
| [`sync peer addresses`](#sync-peer-addresses) | Synchronize dynamic addresses (DHCP and PPPoE) between routers and a conductor. |

## `show entitlement`

Displays entitlement utilized.

#### Usage

```
show entitlement [{router <router> | resource-group <resource-group>}] [force]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The name of the router for which to display entitlement utilized. Conductor routers will show the entitlement utilized per project of all conducted routers. (default: &lt;current router&gt;) |

#### Description

The SSR Networking Platform calculates the Peak Router Bandwidth Capacity; this is the highest router bandwidth value of any 5 second interval over the specific license period. The Router Bandwidth is calculated based on the aggregate of sessions traversing the router.

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

## `show events`

Show events from the historical events database.

#### Usage

```
show events [{router <router> | resource-group <resource-group>}] [from <from>] [to <to>] [type <type>] [flat] [rows <rows>] [limit <limit>] [force] [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| flat | Display configuration with full paths on each line instead of as a hierarchy. Only applicable for &#x27;admin.running_config_change&#x27; events. |
| force | Skip confirmation prompt. Only required when targeting all routers |
| from | Only show events after the provided time. Can either be a timestamp or a delta, such as 45m, 1d, or 1mo [type: timestamp] (default: 1970-01-01 00:00:00) |
| limit | The total number of events to retrieve [type: int] |
| resource-group | The name of the resource group |
| router | The name of the router for which to display events (default: &lt;current router&gt;) |
| rows | The number of events to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| to | Only show events before the provided time. You can use the provided standard timestamps, such as 45m, 1d, or 1mo; or enter a value [type: timestamp] |
| type | Filter events based on the event type and subtype |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

##### See Also

| command | description |
| ------- | ----------- |
| [`show alarms`](#show-alarms) | Display currently active or shelved alarms |

#### Description

The _show events_ command displays various event records that the SSR collects during operation. 

The output can be optionally restricted to specific time windows using the `from` and `to` qualifiers. Because this command can generate a lot of output, the `rows` limiter is particularly useful on busy systems.

Categories can be enabled or disabled individually in `config &gt; authority &gt; router &gt; audit`. There are five main top-level categories that can be filtered using the `type` argument.

* admin: A catch-all category for events that are triggered by a user&#x27;s action.

* alarm: A historical record of &#x27;show alarms&#x27; including a unique event each time an alarm was created and cleared.

* system: A catch-all category for events that the system creates itself.

* traffic: A record of whether traffic was allowed or denied. By default this is disabled.

* provisioning: A historical record of `show assets` including unique events for each internal state transition.

Additional filtering can be done by specifying a dot (.) followed by a subtype. For example, `type admin.running_config_change` will only show configuration change events, while `type system.ntp_adjustment` will only display NTP adjustment events.
The output can be optionally restricted to specific time windows using the `from` and `to` qualifiers. Because this command can generate a lot of output, the `rows` and `limit` limiters are particularly useful on busy systems.

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

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.1.0   | This feature was introduced |

## `show events config commit`

Shows events related to running config change

#### Usage

```
show events config commit [{router <router> | resource-group <resource-group>}] [flat] [from <from>] [to <to>] [force] [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| flat | Display with full paths on each line instead of as a hierarchy |
| force | Skip confirmation prompt. Only required when targeting all routers |
| from | Only show events after the provided time. Can either be a timestamp or a delta, such as 45m, 1d, or 1mo. [type: timestamp] |
| resource-group | The name of the resource group |
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
| [`set config encryption`](#set-config-encryption) | Sets the encryption key for the SSR configuration |
| [`show config exports`](#show-config-exports) | Display configuration exports. |
| [`show config version`](#show-config-version) | Display running configuration version. |
| [`show stats config`](cli_stats_reference.md#show-stats-config) | Metrics pertaining to the get-config RPC |

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
show events config encryption [{router <router> | resource-group <resource-group>}] [from <from>] [to <to>] [force]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| from | Only show events after the provided time. Can either be a timestamp or a delta, such as 45m, 1d, or 1mo [type: timestamp] |
| resource-group | The name of the resource group |
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
show fib [{service-name <name> | hierarchy-service-name <name> | contains-service-name <name> | match-service-name <name>}] [rows <rows>] [vrf <vrf>] [tenant <tenant>] [source-ip <source-ip>] [source-interface <source-interface>] [summary] [force] [node <node>] {router <router> | resource-group <resource-group>} [<ip-prefix>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| contains-service-name | The partial substring match to show for the fib |
| force | Skip confirmation prompt. Only required when targeting all routers. |
| hierarchy-service-name | The hierarchy root to show for the fib |
| match-service-name | The regex to match service names to show for the fib |
| node | The node from which to retrieve fib entries |
| resource-group | The name of the resource group |
| router | The router from which to retrieve fib entries |
| rows | The number of fib nodes to display at once. Enter a number or `all` (default: 50). |
| service-name | The exact service name to show for the fib |
| source-interface | The incoming network-interface used to perform a source lookup |
| source-ip | The incoming ip-address used to perform a source lookup [type: IP address] |
| summary | show next-hop information as a count if summary |
| tenant | The tenant name match to show for the fib |
| vrf | VRF name |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| ip-prefix | FIB IP prefix [type: IP prefix] |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`lookup`](#show-fib-lookup) | Shows current fib entries at the specified node using incoming packet info |

#### Description

This command shows the Forwarding Information Base (FIB) entries on the node that is specified by the `node-name` argument. The output may be limited to a specified number of rows by adding the optional `rows` modifier at the end of the command.

This command can generate a large quantity of output on a busy system, and it is advised that administrators exercise caution when issuing this command without the `rows` modifier. 

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
| 5.1.0   | Added next hop details, and the ability to filter by VFR, resource-group, and tenant. |
| 5.2.0   | Added and the following arguments: service-name, hierarchy-service-name, contains-service-name, match-service-name, source-ip, and source-interface. |

## `show fib lookup`

Shows current FIB entries at the specified node using incoming packet info.

#### Usage

```
show fib lookup [tenant <tenant>] [source-ip <source-ip>] [source-interface <source-interface>] [summary] [force] [node <node>] {router <router> | resource-group <resource-group>} destination-ip <destination-ip> destination-port <destination-port> protocol <protocol>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| destination-ip | The incoming destination IP-address used to lookup fibs [type: IP address]. |
| destination-port | The incoming destination port used to lookup the fib [type: port]. |
| force | Skip confirmation prompt. Only required when targeting all routers. |
| node | The node on which to find a fib entry. |
| protocol | Name or number of the protocol used to lookup the fib [type: string or uint8]. |
| resource-group | The name of the resource group. |
| router | The router on which to find a fib entry. |
| source-interface | The incoming network-interface used to perform a source lookup. |
| source-ip | The incoming ip-address used to perform a source lookup [type: IP address]. |
| summary | show next-hop information as a count if summary. |
| tenant | The tenant name used to lookup the fib. |

#### Description

This command shows the Forwarding Information Base (FIB) entries on the node that is specified by the `node-name` argument. The output may be limited to a specified number of rows by adding the optional `rows` modifier at the end of the command.

This command can generate a large quantity of output on a busy system, and it is advised that administrators exercise caution when issuing this command without the `rows` modifier.

| Release | Modification                |
| ------- | ----------------------------|
| 5.2.0   | Introduced the command |

## `show history`

Show PCLI command history for the current user.

#### Usage

```
show history [rows <rows>] [from <from>] [to <to>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| from | Only show events after the provided time. Can either be a timestamp or a delta, such as 45m, 1d, or 1mo [type: timestamp] |
| rows | The number of recent commands to show [type: int between 0 and 500 or &#x27;all&#x27;] (default: all) |
| to | Only show events before the provided time. Can either be a timestamp or a delta, such as 45m, 1d, or 1mo [type: timestamp] |

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

## `show idp application status`

Show underlying IDP application status.

#### Usage

```
show idp application status [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers. |
| node | The node for which to display status. |
| resource-group | The name of the resource group. |
| router | The router for which to display status. |

##### See Also

| command | description |
| ------- | ----------- |
| [`request idp restart`](#request-idp-restart) | Restart IDP Command.|
| [`request idp signature-query`](#request-idp-signature-query) | Request IDP signature database connectivity. |
| [`show idp details`](#show-idp-details) | Show IDP details. |
| [`show idp events`](#show-idp-events) | Show all IDP events. |
| [`show idp events by-application`](#show-idp-events-by-application) | Show IDP events by application. |
| [`show idp events by-attack`](#show-idp-events-by-attack) | Show IDP events by attack type. |
| [`show idp events by-severity`](#show-idp-events-by-severity) | Show IDP events by severity level. |
| [`show idp network`](#show-idp-network) | Show IDP networks. |
| [`show idp platform`](#show-idp-platform) | Show IDP platform data. |
| [`show idp signatures`](#show-idp-signatures) | Show IDP signature package details. |
| [`show stats idp`](cli_stats_reference.md#show-stats-idp) | Metrics about IDP. |

#### Description

Query and display the current state of the IDP application along with detailed messages.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 6.0.4   | This feature was introduced. |

## `show idp details`

Show underlying IDP details.

#### Usage

```
show idp details [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers. |
| node | The node for which to display idp details. |
| resource-group | The name of the resource group. |
| router | The router for which to display idp details. |

##### See Also

| command | description |
| ------- | ----------- |
| [`request idp restart`](#request-idp-restart) | Restart IDP Command.|
| [`request idp signature-query`](#request-idp-signature-query) | Request IDP signature database connectivity. |
| [`show idp application status`](#show-idp-application-status) | Show underlying IDP application status. |
| [`show idp events`](#show-idp-events) | Show all IDP events. |
| [`show idp events by-application`](#show-idp-events-by-application) | Show IDP events by application. |
| [`show idp events by-attack`](#show-idp-events-by-attack) | Show IDP events by attack type. |
| [`show idp events by-severity`](#show-idp-events-by-severity) | Show IDP events by severity level. |
| [`show idp network`](#show-idp-network) | Show IDP networks. |
| [`show idp platform`](#show-idp-platform) | Show IDP platform data. |
| [`show idp signatures`](#show-idp-signatures) | Show IDP signature package details. |
| [`show stats idp`](cli_stats_reference.md#show-stats-idp) | Metrics about IDP. |

#### Description

Query and display the IDP details.

## `show idp events`

Show all IDP events.

#### Usage

```
show idp events [{from <from> | since <since>}] [to <to>] [verbose] [rows <rows>] router <router> node <node>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| from | Only show events after the specified time, events are kept for 24 hours maximum. Can either be a timestamp, such as yyyy-mm-dd hh:mm:ss, hh:mm and 8am, 2pm (current day if not specified) or a delta, such as 45m, 2h, 1d [type: timestamp]. |
| node | The name of the node. |
| router | The name of the router. |
| rows | The number of event entries to display at once [type: int or &#x27;all&#x27;] (default: 50). |
| since | Only show events after the specified time, events are kept for 24 hours maximum. Can either be a timestamp, such as yyyy-mm-dd hh:mm:ss, hh:mm and 8am, 2pm (current day if not specified) or a delta, such as 45m, 2h, 1d [type: timestamp]. |
| to | Only show events before the specified time, events are kept for 24 hours maximum. Can either be a timestamp, such as yyyy-mm-dd hh:mm:ss, hh:mm and 8am, 2pm (current day if not specified) or a delta, such as 45m, 2h, 1d [type: timestamp]. |
| verbose | Get detailed event information. |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`by-application`](#show-idp-events-by-application) | Show IDP event by application. |
| [`by-attack`](#show-idp-events-by-attack) | Show IDP event by attack type. |
| [`by-severity`](#show-idp-events-by-severity) | Show IDP event by severity level. |

##### See Also

| command | description |
| ------- | ----------- |
| [`request idp restart`](#request-idp-restart) | Restart IDP Command.|
| [`request idp signature-query`](#request-idp-signature-query) | Request IDP signature database connectivity. |
| [`show idp application status`](#show-idp-application-status) | Show IDP application status. |
| [`show idp details`](#show-idp-details) | Show IDP details. |
| [`show idp events by-application`](#show-idp-events-by-application) | Show IDP events by application. |
| [`show idp events by-attack`](#show-idp-events-by-attack) | Show IDP events by attack type. |
| [`show idp events by-severity`](#show-idp-events-by-severity) | Show IDP events by severity level. |
| [`show idp network`](#show-idp-network) | Show IDP networks. |
| [`show idp platform`](#show-idp-platform) | Show IDP platform data. |
| [`show idp signatures`](#show-idp-signatures) | Show IDP signature package details. |
| [`show stats idp`](cli_stats_reference.md#show-stats-idp) | Metrics about IDP. |

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 6.0.4   | This feature was introduced. |

## `show idp events by-application`

Show IDP events by application.

#### Usage

```
show idp events by-application [{from <from> | since <since>}] [to <to>] [verbose] [name <name>] [rows <rows>] router <router> node <node>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| from | Only show events after the specified time, events are kept for 24 hours maximum. Can either be a timestamp, such as yyyy-mm-dd hh:mm:ss, hh:mm and 8am, 2pm (current day if not specified) or a delta, such as 45m, 2h, 1d [type: timestamp]. |
| name | Filter IDP events by application. |
| node | The name of the node. |
| router | The name of the router. |
| rows | The number of event entries to display at once [type: int or &#x27;all&#x27;] (default: 50). |
| since | Only show events after the specified time, events are kept for 24 hours maximum. Can either be a timestamp, such as yyyy-mm-dd hh:mm:ss, hh:mm and 8am, 2pm (current day if not specified) or a delta, such as 45m, 2h, 1d [type: timestamp]. |
| to | Only show events before the specified time, events are kept for 24 hours maximum. Can either be a timestamp, such as yyyy-mm-dd hh:mm:ss, hh:mm and 8am, 2pm (current day if not specified) or a delta, such as 45m, 2h, 1d [type: timestamp]. |
| verbose | Get detailed event information. |

##### See Also

| command | description |
| ------- | ----------- |
| [`request idp restart`](#request-idp-restart) | Restart IDP Command.|
| [`request idp signature-query`](#request-idp-signature-query) | Request IDP signature database connectivity. |
| [`show idp application status`](#show-idp-application-status) | Show IDP application status. |
| [`show idp details`](#show-idp-details) | Show IDP details. |
| [`show idp events`](#show-idp-events) | Show all IDP events. |
| [`show idp events by-attack`](#show-idp-events-by-attack) | Show IDP events by attack type. |
| [`show idp events by-severity`](#show-idp-events-by-severity) | Show IDP events by severity level. |
| [`show idp network`](#show-idp-network) | Show IDP networks. |
| [`show idp platform`](#show-idp-platform) | Show IDP platform data. |
| [`show idp signatures`](#show-idp-signatures) | Show IDP signature package details. |
| [`show stats idp`](cli_stats_reference.md#show-stats-idp) | Metrics about IDP. |


#### Description

Query by application name and display summary, brief or detailed, of filtered events.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 6.0.4   | This feature was introduced. |

## `show idp events by-attack`

Show IDP events by attack type.

#### Usage

```
show idp events by-attack [{from <from> | since <since>}] [to <to>] [verbose] [name <name>] [rows <rows>] router <router> node <node>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| from | Only show events after the specified time, events are kept for 24 hours maximum. Can either be a timestamp, such as yyyy-mm-dd hh:mm:ss, hh:mm and 8am, 2pm (current day if not specified) or a delta, such as 45m, 2h, 1d [type: timestamp]. |
| name | Filter IDP events by attack. |
| node | The name of the node. |
| router | The name of the router. |
| rows | The number of event entries to display at once [type: int or &#x27;all&#x27;] (default: 50). |
| since | Only show events after the specified time, events are kept for 24 hours maximum. Can either be a timestamp, such as yyyy-mm-dd hh:mm:ss, hh:mm and 8am, 2pm (current day if not specified) or a delta, such as 45m, 2h, 1d [type: timestamp]. |
| to | Only show events before the specified time, events are kept for 24 hours maximum. Can either be a timestamp, such as yyyy-mm-dd hh:mm:ss, hh:mm and 8am, 2pm (current day if not specified) or a delta, such as 45m, 2h, 1d [type: timestamp]. |
| verbose | Get detailed event information. |

##### See Also

| command | description |
| ------- | ----------- |
| [`request idp restart`](#request-idp-restart) | Restart IDP Command.|
| [`request idp signature-query`](#request-idp-signature-query) | Request IDP signature database connectivity. |
| [`show idp application status`](#show-idp-application-status) | Show IDP application status. |
| [`show idp details`](#show-idp-details) | Show IDP details. |
| [`show idp events`](#show-idp-events) | Show all IDP events. |
| [`show idp events by-application`](#show-idp-events-by-application) | Show IDP events by application. |
| [`show idp events by-severity`](#show-idp-events-by-severity) | Show IDP events by severity level. |
| [`show idp network`](#show-idp-network) | Show IDP networks. |
| [`show idp platform`](#show-idp-platform) | Show IDP platform data. |
| [`show idp signatures`](#show-idp-signatures) | Show IDP signature package details. |
| [`show stats idp`](cli_stats_reference.md#show-stats-idp) | Metrics about IDP. |

#### Description

Query by attack type and display summary, brief or detailed, of filtered events.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 6.0.4   | This feature was introduced. |

## `show idp events by-severity`

Show IDP events by severity level.

#### Usage

```
show idp events by-severity [{from <from> | since <since>}] [to <to>] [verbose] [name <name>] [rows <rows>] router <router> node <node>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| from | Only show events after the specified time, events are kept for 24 hours maximum. Can either be a timestamp, such as yyyy-mm-dd hh:mm:ss, hh:mm and 8am, 2pm (assume current day if not specified) or a delta, such as 45m, 2h, 1d [type: timestamp]. |
| name | Filter IDP events by severity. |
| node | The name of the node. |
| router | The name of the router. |
| rows | The number of event entries to display at once [type: int or &#x27;all&#x27;] (default: 50). |
| since | Only show events after the specified time, events are kept for 24 hours maximum. Can either be a timestamp, such as yyyy-mm-dd hh:mm:ss, hh:mm and 8am, 2pm (assume current day if not specified) or a delta, such as 45m, 2h, 1d [type: timestamp]. |
| to | Only show events before the specified time, events are kept for 24 hours maximum. Can either be a timestamp, such as yyyy-mm-dd hh:mm:ss, hh:mm and 8am, 2pm (assume current day if not specified) or a delta, such as 45m, 2h, 1d [type: timestamp]. |
| verbose | Get detailed event information. |

##### See Also

| command | description |
| ------- | ----------- |
| [`request idp restart`](#request-idp-restart) | Restart IDP Command.|
| [`request idp signature-query`](#request-idp-signature-query) | Request IDP signature database connectivity. |
| [`show idp application status`](#show-idp-application-status) | Show IDP application status. |
| [`show idp details`](#show-idp-details) | Show IDP details. |
| [`show idp events`](#show-idp-events) | Show all IDP events. |
| [`show idp events by-application`](#show-idp-events-by-application) | Show IDP events by application. |
| [`show idp events by-attack`](#show-idp-events-by-attack) | Show IDP events by attack type. |
| [`show idp network`](#show-idp-network) | Show IDP networks. |
| [`show idp platform`](#show-idp-platform) | Show IDP platform data. |
| [`show idp signatures`](#show-idp-signatures) | Show IDP signature package details. |
| [`show stats idp`](cli_stats_reference.md#show-stats-idp) | Metrics about IDP. |

#### Description

Query by severity level and display summary, brief or detailed, of filtered events.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 6.0.4   | This feature was introduced. |

## `show idp network`

Show IDP networks.

#### Usage

```
show idp network [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers. |
| node | The node for which to display networks. |
| resource-group | The name of the resource group. |
| router | The router for which to display networks. |

##### See Also

| command | description |
| ------- | ----------- |
| [`request idp restart`](#request-idp-restart) | Restart IDP Command.|
| [`request idp signature-query`](#request-idp-signature-query) | Request IDP signature database connectivity. |
| [`show idp application status`](#show-idp-application-status) | Show IDP application status. |
| [`show idp details`](#show-idp-details) | Show IDP details. |
| [`show idp events`](#show-idp-events) | Show all IDP events. |
| [`show idp events by-application`](#show-idp-events-by-application) | Show IDP events by application. |
| [`show idp events by-attack`](#show-idp-events-by-attack) | Show IDP events by attack type. |
| [`show idp events by-severity`](#show-idp-events-by-severity) | Show IDP events by severity level. |
| [`show idp platform`](#show-idp-platform) | Show IDP platform data. |
| [`show idp signatures`](#show-idp-signatures) | Show IDP signature package details. |
| [`show stats idp`](cli_stats_reference.md#show-stats-idp) | Metrics about IDP. |

#### Description

Query and display the current state of the IDP network along with detailed messages.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 6.0.4   | This feature was introduced. |

## `show idp platform`

Show IDP platform data.

#### Usage

```
show idp platform [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers. |
| node | The node for which to display IDP platform informatiion. |
| resource-group | The name of the resource group. |
| router | The router for which to display IDP platform information. |

##### See Also

| command | description |
| ------- | ----------- |
| [`request idp restart`](#request-idp-restart) | Restart IDP Command.|
| [`request idp signature-query`](#request-idp-signature-query) | Request IDP signature database connectivity. |
| [`show idp application status`](#show-idp-application-status) | Show IDP application status. |
| [`show idp details`](#show-idp-details) | Show IDP details. |
| [`show idp events`](#show-idp-events) | Show all IDP events. |
| [`show idp events by-application`](#show-idp-events-by-application) | Show IDP events by application. |
| [`show idp events by-attack`](#show-idp-events-by-attack) | Show IDP events by attack type. |
| [`show idp events by-severity`](#show-idp-events-by-severity) | Show IDP events by severity level. |
| [`show idp network`](#show-idp-network) | Show IDP networks. |
| [`show idp signatures`](#show-idp-signatures) | Show IDP signature package details. |
| [`show stats idp`](cli_stats_reference.md#show-stats-idp) | Metrics about IDP. |

#### Description

Query and display IDP platform data.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 6.0.4   | This feature was introduced. |

## `show idp signatures`

Show IDP signature package details.

#### Usage

```
show idp signatures [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers. |
| node | The node for which to display signature package details. |
| resource-group | The name of the resource group. |
| router | The router for which to display signature package details. |

##### See Also

| command | description |
| ------- | ----------- |
| [`request idp restart`](#request-idp-restart) | Restart IDP Command.|
| [`request idp signature-query`](#request-idp-signature-query) | Request IDP signature database connectivity. |
| [`show idp application status`](#show-idp-application-status) | Show IDP application status. |
| [`show idp details`](#show-idp-details) | Show IDP details. |
| [`show idp events`](#show-idp-events) | Show all IDP events. |
| [`show idp events by-application`](#show-idp-events-by-application) | Show IDP events by application. |
| [`show idp events by-attack`](#show-idp-events-by-attack) | Show IDP events by attack type. |
| [`show idp events by-severity`](#show-idp-events-by-severity) | Show IDP events by severity level. |
| [`show idp network`](#show-idp-network) | Show IDP networks. |
| [`show idp platform`](#show-idp-platform) | Show IDP platform data. |
| [`show stats idp`](cli_stats_reference.md#show-stats-idp) | Metrics about IDP. |

#### Description

Query and display the IDP signature package details.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 6.0.4   | This feature was introduced. |

## `show load-balancer`

Shows current load balancer agent entries from the highway manager at the specified node.

#### Usage

```
show load-balancer [service <service>] [agent <agent>] [rows <rows>] [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| agent | Agent name to show. If unspecified, shows all agents. (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | node for which to display load balancer |
| resource-group | The name of the resource group |
| router | router for which to display load balancer |
| rows | The number of load balance services to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| service | Service name to show. If unspecified, shows all services. (default: all) |

#### Description

The _show load-balancer_ command provides feedback on the SSR&#x27;s load balancing behavior, when configured to balance traffic (via a service-policy).

This command, when issued without any filters (agent, node, or service) will display all agents, nodes, and services that are subject to load balancing. (The output can be quite verbose.) These filters may be combined to &quot;hone in&quot; on specific agents/nodes/services selectively.

This command is extremely helpful for identifying why the SSR selected specific destinations for its session-oriented traffic.

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
show lte [device-interface <device-interface>] [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| device-interface | LTE device interface (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display LTE data |
| resource-group | The name of the resource group |
| router | The router for which to display LTE data |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`connection`](#show-lte-connection) | Display LTE connection. |
| [`detail`](#show-lte-detail) | Display LTE detail. |
| [`modem`](#show-lte-modem) | Display lte modem. |
| [`network`](#show-lte-network) | Display LTE network. |
| [`profile`](#show-lte-profile) | Display LTE profile. |
| [`signal`](#show-lte-signal) | Display LTE signal. |
| [`sim`](#show-lte-sim) | Display LTE sim. |

## `show lte connection`

Display LTE connection.

#### Usage

```
show lte connection [device-interface <device-interface>] [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| device-interface | LTE device interface (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display LTE data |
| resource-group | The name of the resource group |
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
show lte detail [device-interface <device-interface>] [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| device-interface | LTE device interface (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display LTE data |
| resource-group | The name of the resource group |
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
show lte modem [device-interface <device-interface>] [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| device-interface | LTE device interface (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display LTE data |
| resource-group | The name of the resource group |
| router | The router for which to display LTE data |

## `show lte network`

Display LTE network.

#### Usage

```
show lte network [device-interface <device-interface>] [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| device-interface | LTE device interface (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display LTE data |
| resource-group | The name of the resource group |
| router | The router for which to display LTE data |

## `show lte profile`

Display LTE profile.

#### Usage

```
show lte profile [device-interface <device-interface>] [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| device-interface | LTE device interface (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display LTE data |
| resource-group | The name of the resource group |
| router | The router for which to display LTE data |

## `show lte signal`

Display LTE signal.

#### Usage

```
show lte signal [device-interface <device-interface>] [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| device-interface | LTE device interface (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display LTE data |
| resource-group | The name of the resource group |
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
show lte sim [device-interface <device-interface>] [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| device-interface | LTE device interface (default: all) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display LTE data |
| resource-group | The name of the resource group |
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

## `show mist`

Display information about the link between the SSR and the Mist Cloud.

#### Usage

```
show mist [{router <router> | resource-group <resource-group>}] [force] [node <node>] [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers. |
| node | Node for which to display Mist state. |
| resource-group | The name of the resource group. |
| router | Router for which to display Mist state (default: all). |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

##### See Also

| command | description |
| ------- | ----------- |
| [`adopt`](#adopt) | Assign the current router to a Mist organization. |

| Release | Modification                |
| ------- | ----------------------------|
| 5.5.2   | This feature was introduced |

## `show network-interface`

Display network-interface data for network-interface.

#### Usage

```
show network-interface [name <name>] [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| name | Network interface to display (if omitted, all will be displayed) |
| node | The node for which to display network-interface data |
| resource-group | The name of the resource group |
| router | The router for which to display network-interface data |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`application`](#show-network-interface-application) | Display application data info for network-interfaces. |

#### Description

The _show network-interface_, a counterpart to _show device-interface_, shows information and statistics relevant to the logical interfaces configured on your SSR networking platform.

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
show network-interface application [name <name>] [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| name | Network interface to display (default: all) |
| node | The node for which to display application data |
| resource-group | The name of the resource group |
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
show ntp [{router <router> | resource-group <resource-group>}] [force] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node from which to retrieve ntp status |
| resource-group | The name of the resource group |
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

Show general information about OSPF.

#### Usage

```
show ospf [rows <rows>] [vrf <vrf>] [area <area-id>] [force] {router <router> | resource-group <resource-group>} [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| area | The area to filter OSPF information for |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The router to request OSPF information from |
| rows | The number of items to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| vrf | VRF name |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`border-routers`](#show-ospf-border-routers) | Show information about the OSPF border routers. |
| [`database`](#show-ospf-database) | Show OSPF database information. |
| [`interfaces`](#show-ospf-interfaces) | Show information about the OSPF interfaces. |
| [`neighbors`](#show-ospf-neighbors) | Show information about OSPF neighbors. |
| [`routes`](#show-ospf-routes) | Show information about the OSPF routes. |

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

Show information about the OSPF border routers.

#### Usage

```
show ospf border-routers [rows <rows>] [vrf <vrf>] [force] {router <router> | resource-group <resource-group>} [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The router to request OSPF information from |
| rows | The number of items to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| vrf | VRF name |

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

Show OSPF database information.

#### Usage

```
show ospf database [rows <rows>] [vrf <vrf>] [self-originate] [force] {router <router> | resource-group <resource-group>} [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The router to request OSPF information from |
| rows | The number of items to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| self-originate | Retrieve only self-originated LSA information |
| vrf | VRF name |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`lsa`](#show-ospf-database-lsa) | Show OSPF database LSA information. |
| [`max-age`](#show-ospf-database-max-age) | Show OSPF LSAs which have reached maximum age. |

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

Show OSPF database LSA information.

#### Usage

```
show ospf database lsa [{origin <ip> | self-originate}] [rows <rows>] [vrf <vrf>] [lsa-id <id>] [force] {router <router> | resource-group <resource-group>} lsa-type <type> [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| lsa-id | The Link State ID to retrieve |
| lsa-type | The LSA type to retrieve |
| origin | Retrieve LSAs from this advertising router IP |
| resource-group | The name of the resource group |
| router | The router to request OSPF information from |
| rows | The number of items to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| self-originate | Retrieve only self-originated LSA information |
| vrf | VRF name |

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

Show OSPF LSAs which have reached maximum age.

#### Usage

```
show ospf database max-age [rows <rows>] [vrf <vrf>] [force] {router <router> | resource-group <resource-group>} [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The router to request OSPF information from |
| rows | The number of items to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| vrf | VRF name |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

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

Show information about the OSPF interfaces.

#### Usage

```
show ospf interfaces [rows <rows>] [vrf <vrf>] [network-interface <name>] [force] {router <router> | resource-group <resource-group>} [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| network-interface | The network interface to fetch OSPF information for |
| resource-group | The name of the resource group |
| router | The router to request OSPF information from |
| rows | The number of items to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| vrf | VRF name |

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

Show information about OSPF neighbors.

#### Usage

```
show ospf neighbors [rows <rows>] [vrf <vrf>] [network-interface <name>] [neighbor <ip>] [force] {router <router> | resource-group <resource-group>} [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| neighbor | The neighbor IP address for which to fetch OSPF information |
| network-interface | The network interface to fetch OSPF neighbor information for |
| resource-group | The name of the resource group |
| router | The router to request OSPF information from |
| rows | The number of items to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| vrf | VRF name |

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

Show information about the OSPF routes.

#### Usage

```
show ospf routes [rows <rows>] [vrf <vrf>] [force] {router <router> | resource-group <resource-group>} [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The router to request OSPF information from |
| rows | The number of items to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| vrf | VRF name |

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
show peers [name <name>] [dynamic-damping] [force] {router <router> | resource-group <resource-group>} [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| dynamic-damping | display BFD dynamic-damping stats |
| force | Skip confirmation prompt. Only required when targeting all routers |
| name | Peer to display (default: all) |
| resource-group | The name of the resource group |
| router | The router on which to display peers |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`hostnames`](#show-peers-hostnames) | Display resolved hostnames of peers |

#### Description

The _show peers_ command displays properties of each of the &quot;neighboring&quot; SSRs that the router in question has a peering association with.

This command shows information on peering associations between SSRs, not peering associations with BGP peers. For information on BGP peering statistics, refer to &quot;show bgp&quot; in this document.

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
show peers hostnames [{router <router> | resource-group <resource-group>}] [force]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
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
show platform [{router <router> | resource-group <resource-group>}] [force] [node <node>] [<category>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which platform info will be displayed |
| resource-group | resource group whose routers&#x27; platform info will be displayed |
| router | The router for which platform info will be displayed (default: &lt;current router&gt;) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| category | all \| cpu \| device-interfaces \| disk \| fan-speeds \| memory \| operating-system \| temperatures \| vendor (default: all) |

##### See Also

| command | description |
| ------- | ----------- |
| [`show stats cpu`](cli_stats_reference.md#show-stats-cpu) | CPU utilization information |
| [`show stats disk`](cli_stats_reference.md#show-stats-disk) | Disk usage information |
| [`show stats memory`](cli_stats_reference.md#show-stats-memory) | Memory usage information |

#### Description

The _show platform_ command displays properties of the underlying platform upon which the SSR software is running. This can assist in finding PCI addresses and MAC addresses for the hardware in the system, as well as disk information, OS information, etc.

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
show plugins available [{name <name> | category <category>}] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| category | Filter plugins by category |
| name | Name of plugin to show |
| node | The node for which to display available plugins (default: all) |

##### See Also

| command | description |
| ------- | ----------- |
| [`manage plugin install`](#manage-plugin-install) | Install a plugin on conductor. |
| [`manage plugin remove`](#manage-plugin-remove) | Remove an installed plugin. |
| [`show plugins categories`](#show-plugins-categories) | Shows all possible plugin categories. |
| [`show plugins installed`](#show-plugins-installed) | Shows installed plugins. |

## `show plugins categories`

Shows all possible plugin categories.

#### Usage

```
show plugins categories
```

##### See Also

| command | description |
| ------- | ----------- |
| [`manage plugin install`](#manage-plugin-install) | Install a plugin on conductor. |
| [`manage plugin remove`](#manage-plugin-remove) | Remove an installed plugin. |
| [`show plugins available`](#show-plugins-available) | Shows latest verison of plugins available for install. |
| [`show plugins installed`](#show-plugins-installed) | Shows installed plugins. |

## `show plugins installed`

Shows installed plugins.

#### Usage

```
show plugins installed [category <category>] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| category | Filter plugins by category |
| node | The node for which to display installed plugins (default: all) |

##### See Also

| command | description |
| ------- | ----------- |
| [`manage plugin install`](#manage-plugin-install) | Install a plugin on conductor. |
| [`manage plugin remove`](#manage-plugin-remove) | Remove an installed plugin. |
| [`show plugins available`](#show-plugins-available) | Shows latest verison of plugins available for install. |
| [`show plugins categories`](#show-plugins-categories) | Shows all possible plugin categories. |

## `show plugins state`

Show plugin state data for a given plugin

#### Usage

```
show plugins state [{router <router> | resource-group <resource-group>}] [force] [node <node>] [<verbosity>] <plugin>
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | node for which to display plugin state data |
| resource-group | The name of the resource group |
| router | router for which to display plugin state data (default: all) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |
| plugin | name of plugin to display state data for |

## `show rib`

Displays the contents of the Routing Information Base (RIB)

#### Usage

```
show rib [rows <rows>] [vrf <vrf>] [force] {router <router> | resource-group <resource-group>} [<route>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The name of the router for which to display RIB routes |
| rows | The number of rib entries to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| vrf | VRF name |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| route | Route ip-prefix [type: IP prefix] |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`bgp`](#show-rib-bgp) | Displays the contents of the Routing Information Base (RIB) filtered to show only those learned from BGP. |
| [`connected`](#show-rib-connected) | Displays the contents of the Routing Information Base (RIB) filtered to show only connected routes. |
| [`ospf`](#show-rib-ospf) | Displays the contents of the Routing Information Base (RIB) filtered to show only those learned from OSPF. |
| [`static`](#show-rib-static) | Displays the contents of the Routing Information Base (RIB) filtered to show only static routes. |
| [`summary`](#show-rib-summary) | Displays a summary of the Routing Information Base (RIB) |

#### Description

The _show rib_ subcommand displays the contents of the SSR&#x27;s Routing Information Base (RIB). This is the complete list of connected, direct, and learned routes on the system. (Note that the output may be quite verbose.)

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

Displays the contents of the Routing Information Base (RIB) filtered to show only those learned from BGP.

#### Usage

```
show rib bgp [rows <rows>] [vrf <vrf>] [force] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The name of the router for which to display the RIB |
| rows | The number of rib entries to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| vrf | VRF name |

#### Description

The _show rib bgp_ subcommand displays the contents of the SSR&#x27;s Routing Information Base (RIB) filtered to show only those learned from BGP.

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

Displays the contents of the Routing Information Base (RIB) filtered to show only connected routes.

#### Usage

```
show rib connected [rows <rows>] [vrf <vrf>] [force] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The name of the router for which to display the RIB |
| rows | The number of rib entries to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| vrf | VRF name |

#### Description

The _show rib connected_ subcommand displays the contents of the SSR&#x27;s Routing Information Base (RIB) filtered to show only the connected routes.

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

Displays the contents of the Routing Information Base (RIB) filtered to show only those learned from OSPF.

#### Usage

```
show rib ospf [rows <rows>] [vrf <vrf>] [force] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The name of the router for which to display the RIB |
| rows | The number of rib entries to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| vrf | VRF name |

#### Description

The _show rib ospf_ subcommand displays the contents of the SSR&#x27;s Routing Information Base (RIB) filtered to show only those learned from OSPF.

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

Displays the contents of the Routing Information Base (RIB) filtered to show only static routes.

#### Usage

```
show rib static [rows <rows>] [vrf <vrf>] [force] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The name of the router for which to display the RIB |
| rows | The number of rib entries to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| vrf | VRF name |

#### Description

The _show rib static_ subcommand displays the contents of the SSR&#x27;s Routing Information Base (RIB) filtered to show only static routes.

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
show rib summary [rows <rows>] [vrf <vrf>] [force] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The name of the router for which to display the RIB summary |
| rows | The number of rib entries to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| vrf | VRF name |

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
## `show roles`

Display all configured roles

#### Usage

```
show roles [name <name>] [rows <rows>]
```
##### Keyword Arguments

| name | description |
| ---- | ----------- |
| name | role to display |
| rows | The number of roles to display at once [type: int or &#x27;all&#x27;] (default: 50) |

##### See Also

| command | description |
| ------- | ----------- |
| [`create user`](#create-user) | Create a new user account interactively. |
| [`delete user`](#delete-user) | Delete a user account |
| [`delete user tokens`](#delete-user-tokens) | Revoke API access tokens for a user. |
| [`edit prompt`](#edit-prompt) | Allows the user to specify a custom format for the PCLI prompt. |
| [`edit user`](#edit-user) | Modify an existing user account |
| [`edit user mode`](#edit-user-mode) | Edit the current user&#x27;s configuration mode. |
| [`restore prompt`](#restore-prompt) | Restore the PCLI prompt to the factory default. |
| [`restore users factory-default`](#restore-users-factory-default) | Restore the user configuration to factory defaults. |
| [`set password`](#set-password) | Change your password. |
| [`show user`](#show-user) | Display information for user accounts. |
| [`show user activity`](#show-user-activity) | Show the most recent usage of SSR. |

## `show security key-status`

Display detailed security key status.

#### Usage

```
show security key-status [{router <router> | resource-group <resource-group>}] [force] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display security key status |
| resource-group | The name of the resource group |
| router | The router for which to display security key status (default: &lt;current router&gt;) |

#### Description

The _show security key-status_ subcommand displays information and statistics related to the SSR's security rekeying feature. It will indicate the current key index (which will be common among all routers managed by an SSR conductor) and relevant statistics on when the last rekey event occurred, when the next will occur, etc.

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

Displays service information at the specified node.

#### Usage

```
show service [{service-name <name> | hierarchy-service-name <name> | contains-service-name <name>}] [node <node>] router <router> [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| contains-service-name | The partial substring match to show service info for |
| hierarchy-service-name | The hierarchy root to show service info for |
| node | The node for which to display service info (default: all) |
| router | The router for which to display service info |
| service-name | The exact service name to show service info for |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

#### Description

The _show service_ command display active service information from the SSR. This command has multiple service filters allowing target to specific service or services. Output can be displayed in summary or in detail view.

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

The `show service-path` command displays active service paths passing through the SSR. This simplifies troubleshooting, allowing you to determine where sessions belonging to a particular service would egress. Multiple service filters allow you to target a specific service or services. Output can be displayed as a summary or in a detail view with pagination support. When using the `detail` argument, in-path metrics are managed by the performance monitor when enabled. If the performance monitor is not enabled, the local metrics generated by BFD are used. 

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
show session-captures [{id <id> | detail}] [{router <router> | resource-group <resource-group>}] [service <service>] [force] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| detail | Display session-captures in detail |
| force | Skip confirmation prompt. Only required when targeting all routers |
| id | The session-capture to show in detail |
| node | The node on which to show session-captures |
| resource-group | The name of the resource group |
| router | The router on which to show session-captures (default: all) |
| service | Service for which to show session-captures (default: all) |

##### See Also

| command | description |
| ------- | ----------- |
| [`create session-capture`](#create-session-capture) | Creates a session capture at the specified node and service. |
| [`delete session-capture`](#delete-session-capture) | Deletes session capture from selected service. |
| [`delete session-capture by-id`](#delete-session-capture-by-id) | Deletes session-capture by capture-id from selected service. |

## `show sessions`

Displays active sessions passing through the SSR.

#### Usage

```
show sessions [{service-name <name> | hierarchy-service-name <name> | contains-service-name <name>}] [rows <rows>] [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| contains-service-name | The partial substring match to show sessions for |
| force | Skip confirmation prompt. Only required when targeting all routers |
| hierarchy-service-name | The hierarchy root to show sessions for |
| node | The node from which to retrieve session flows |
| resource-group | The name of the resource group |
| router | The router from which to retrieve session flows |
| rows | The number of session flows to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| service-name | The exact service name to show sessions for |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`by-id`](#show-sessions-by-id) | Show information of a session for a given Id |
| [`top`](#show-sessions-top) | &lt;bandwidth&gt; |

#### Description

The _show sessions_ command displays active sessions passing through the SSR (or the node specified by the optional _node-name_ argument. The output from the command shows the sessions internal ID (useful for searching through log files), the service, tenant, and source/destination IP information for each active session.

The NAT IP and Port fields will be populated whenever a session is subject to source NAT (see _source-nat_ later in this reference guide for more information). It also shows the timeout value that will cause the session to expire if it remains idle for that number of seconds.

Various services and tenants may display with surrounding braces to indicate that these are internally-generated services and tenants. These internal services and tenants are created when peering between adjacent nodes, establishing BGP sessions, BFD sessions, etc.

:::info
The contents of the table will vary based upon the software version in use. This applies when, for example, a conductor running a new software version requests session table data from routers running older software versions.
:::

#### Example
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
## `show sessions by-id`

Show information of a session for a given ID.

#### Usage
```
show sessions by-id [node <node>] router <router> <id> [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| node | The node on which to show show session by-id (default: all) |
| router | The router on which to show session by-id |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| id | Unique identifier of a session to be displayed |
| verbosity | detail |
| summary | (default: detail) |

#### Example

```
show sessions by-id

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
show sessions top bandwidth [force] {router <router> | resource-group <resource-group>} [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The router for which to display top sessions by bandwidth |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

#### Description

The `top bandwidth` subcommand will list, in order, the top ten highest consumers of bandwidth among all active sessions. This is useful to understand the current utilization on your SSR network resources.

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

## `show stats`

Please refer to the [Show Stats Reference](cli_stats_reference.md) for detailed information about `show stats`.

## `show step clients`

Show STEP clients

#### Usage

```
show step clients [rows <rows>] [force] {router <router> | resource-group <resource-group>} [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The router to request STEP information from |
| rows | The number of items to display at once [type: int or &#x27;all&#x27;] (default: 50) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

## `show step lsdb`

Show STEP link state database

#### Usage

```
show step lsdb [rows <rows>] [originator <originator-name>] [force] {router <router> | resource-group <resource-group>} [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| originator | The STEP originating router |
| resource-group | The name of the resource group |
| router | The router to request STEP information from |
| rows | The number of items to display at once [type: int or &#x27;all&#x27;] (default: 50) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

## `show step routes`

Show STEP routes

#### Usage

```
show step routes [rows <rows>] [node <node-name>] [service <service-name>] [ip-prefix <prefix>] [force] {router <router> | resource-group <resource-group>} [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| ip-prefix | STEP routes for this ip prefix [type: IP prefix] |
| node | STEP routes on this node |
| resource-group | The name of the resource group |
| router | The router to request STEP information from |
| rows | The number of items to display at once [type: int or &#x27;all&#x27;] (default: 50) |
| service | STEP routes for this service |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

## `show step-repo clients`

Show STEP repo clients

#### Usage

```
show step-repo clients [<verbosity>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |



## `show system`

Display detailed system state.

#### Usage

```
show system [{router <router> | resource-group <resource-group>}] [force] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display system state |
| resource-group | The name of the resource group |
| router | The router for which to display system state (default: &lt;current router&gt;) |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`connectivity`](#show-system-connectivity) | Display inter-node connection statuses. |
| [`processes`](#show-system-processes) | Display a table summarizing the statuses of processes. |
| [`registry`](#show-system-registry) | Shows registered services from the system services coordinator for the specified process, node or router. |
| [`services`](#show-system-services) | Display a table summarizing statuses of SSR systemd services. |
| [`software`](#show-system-software) | &lt;available&gt; \| &lt;download&gt; \| &lt;upgrade&gt; |
| [`version`](#show-system-version) | Show system version information. |

##### See Also

| command | description |
| ------- | ----------- |
| [`show alarms`](#show-alarms) | Display currently active or shelved alarms |

#### Description

The _show system_ subcommand displays overall system health for the nodes that comprise your SSR. It includes the state of the node (&quot;starting&quot; is displayed when the node is in the process of starting up and is not yet ready for handling traffic, &quot;running&quot; means the node is active, &quot;offline&quot; means the node is configured but not currently present), its role, software version, and uptime.

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
show system connectivity [{router <router> | resource-group <resource-group>}] [force] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display connection statuses |
| resource-group | The name of the resource group |
| router | The router for which to display connection statuses (default: &lt;current router&gt;) |

##### Subcommands

| command | description |
| ------- | ----------- |
| [`internal`](#show-system-connectivity-internal) | Displays inter-node secure communication connections. |

#### Description

The _connectivity_ subcommand displays the state of all connected systems. On an SSR Conductor, this is a convenient way to display all of the nodes that are connected, disconnected, or &quot;unconfigured&quot;. (Note: when a node appears as _unconfigured_, it means that it is attempting to connect to the SSR conductor, but that conductor does not have any supporting configuration to supply to it.)

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
show system connectivity internal [{router <router> | resource-group <resource-group>}] [force] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display internal connections |
| resource-group | The name of the resource group |
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
show system processes [{router <router> | resource-group <resource-group>}] [force] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display statuses of processes |
| resource-group | The name of the resource group |
| router | The router for which to display statuses of processes (default: &lt;current router&gt;) |

##### See Also

| command | description |
| ------- | ----------- |
| [`show stats process`](cli_stats_reference.md#show-stats-process) | Metrics about SSR processes |

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
| [`show stats registered-services`](cli_stats_reference.md#show-stats-registered-services) | Stats pertaining to Registered Services |
| [`show stats ssc`](cli_stats_reference.md#show-stats-ssc) | Metrics pertaining to the SSC |

#### Description

The _registry_ subcommand shows the processes/services that have registered with the local system&#x27;s &quot;SSC&quot; (system services coordinator). On an SSR Conductor, this will show all of the connected routers_ registered system processes/services.

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

Display a table summarizing statuses of SSR systemd services.

#### Usage

```
show system services [{router <router> | resource-group <resource-group>}] [force] [node <node>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display statuses |
| resource-group | The name of the resource group |
| router | The router for which to display statuses (default: &lt;current router&gt;) |

#### Description

Most SSR processes are under the control of a process aptly named the _processManager_. Some services must exist outside of the control of the _processManager_ and are instead goverened by Linux&#x27;s systemd. `show system services` displays a table summarizing statuses of SSR systemd services.

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

## `show system software available`

Display new versions of the SSR that can be installed.

#### Usage

```
show system software available [<verbosity>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

##### See Also

| command | description |
| ------- | ----------- |
| [`delete system software`](#delete-system-software) | Remove or cancel a previously started download. |
| [`request system software download`](#request-system-software-download) | Download a new version of the SSR. |
| [`request system software upgrade`](#request-system-software-upgrade) | Upgrade to a new version of the SSR. |
| [`set system software image`](#set-system-software-image) | Set the boot image. |
| [`show system software download`](#show-system-software-download) | Display in-progress and completed downloads of new SSR versions. |
| [`show system software upgrade`](#show-system-software-upgrade) | Follow an in-progress upgrade. |
| [`show system version`](#show-system-version) | Show system version information. |

## `show system software download`

Display in-progress and completed downloads of new SSR versions.

#### Usage

```
show system software download [version <version>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| version | Display state about only a single version |

##### See Also

| command | description |
| ------- | ----------- |
| [`delete system software`](#delete-system-software) | Remove or cancel a previously started download. |
| [`request system software download`](#request-system-software-download) | Download a new version of the SSR. |
| [`request system software upgrade`](#request-system-software-upgrade) | Upgrade to a new version of the SSR. |
| [`set system software image`](#set-system-software-image) | Set the boot image. |
| [`show system software available`](#show-system-software-available) | Display new versions of the SSR that can be installed. |
| [`show system software upgrade`](#show-system-software-upgrade) | Follow an in-progress upgrade. |
| [`show system version`](#show-system-version) | Show system version information. |

## `show system software upgrade`

Follow an in-progress upgrade.

#### Usage

```
show system software upgrade
```

##### See Also

| command | description |
| ------- | ----------- |
| [`delete system software`](#delete-system-software) | Remove or cancel a previously started download. |
| [`request system software download`](#request-system-software-download) | Download a new version of the SSR. |
| [`request system software upgrade`](#request-system-software-upgrade) | Upgrade to a new version of the SSR. |
| [`set system software image`](#set-system-software-image) | Set the boot image. |
| [`show system software available`](#show-system-software-available) | Display new versions of the SSR that can be installed. |
| [`show system software download`](#show-system-software-download) | Display in-progress and completed downloads of new SSR versions. |
| [`show system version`](#show-system-version) | Show system version information. |

## `show system version`

Show system version information.

#### Usage

```
show system version [{router <router> | resource-group <resource-group>}] [force] [node <node>] [<verbosity>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node to show version information for |
| resource-group | The name of the resource group |
| router | The router to show version information for (default: &lt;current router&gt;) |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail \| summary (default: summary) |

##### See Also

| command | description |
| ------- | ----------- |
| [`delete system software`](#delete-system-software) | Remove or cancel a previously started download. |
| [`request system software download`](#request-system-software-download) | Download a new version of the SSR. |
| [`request system software upgrade`](#request-system-software-upgrade) | Upgrade to a new version of the SSR. |
| [`set system software image`](#set-system-software-image) | Set the boot image. |
| [`show system software available`](#show-system-software-available) | Display new versions of the SSR that can be installed. |
| [`show system software download`](#show-system-software-download) | Display in-progress and completed downloads of new SSR versions. |
| [`show system software upgrade`](#show-system-software-upgrade) | Follow an in-progress upgrade. |

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
show tenant members [rows <rows>] [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node from which to retrieve tenant members |
| resource-group | The name of the resource group |
| router | The router from which to retrieve tenant members |
| rows | The number of tenant members to display at once [type: int or &#x27;all&#x27;] (default: 50) |

#### Description

The _show tenant_ subcommand displays the mapping logic that the SSR uses for associating the _source IP address_ of inbound requests to tenant definitions – whether they be interface-based (i.e., a tenant has been configured on a network-interface) or member based (i.e., a prefix has been configured within a neighborhood).

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

Show top sources (by source address) over the last 30 minutes at the specified node.

#### Usage

```
show top sources [by <by>] [rows <rows>] [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| by | total-data \| session-count [type: metric] (default: total-data) |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node from which to retrieve top sources |
| resource-group | The name of the resource group |
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
show udp-transform [peer <peer>] [force] [node <node>] {router <router> | resource-group <resource-group>}
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| node | The node for which to display transform status |
| peer | Only display udp-transforms for a single peer (default: all) |
| resource-group | The name of the resource group |
| router | The router for which to display transform status |

#### Description

An SSR may need to transform TCP packets into UDP packets to enable SVR to traverse stateful firewalls. By default, the SSR runs a [firewall detector](concepts_machine_communication.md#firewall-detector) process over peer paths, and will dynamically enable UDP transform when necessary. (Administrators may also elect to enable UDP transform if they know there are stateful firewalls in the path.) This command shows whether a path has UDP transform enabled, and if so, which firewall detection tests triggered the feature to be enabled.

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

##### Subcommands

| command | description |
| ------- | ----------- |
| [`activity`](#show-user-activity) | Show the most recent usage of SSR. |

##### See Also

| command | description |
| ------- | ----------- |
| [`create user`](#create-user) | Create a new user account interactively. |
| [`delete user`](#delete-user) | Delete a user account |
| [`delete user tokens`](#delete-user-tokens) | Revoke API access tokens for a user. |
| [`edit prompt`](#edit-prompt) | Allows the user to specify a custom format for the PCLI prompt. |
| [`edit user`](#edit-user) | Modify an existing user account |
| [`edit user mode`](#edit-user-mode) | Edit the current user&#x27;s configuration mode. |
| [`restore prompt`](#restore-prompt) | Restore the PCLI prompt to the factory default. |
| [`restore users factory-default`](#restore-users-factory-default) | Restore the user configuration to factory defaults. |
| [`set password`](#set-password) | Change your password. |
| [`show roles`](#show-roles) | Display all configured roles |
| [`show user activity`](#show-user-activity) | Show the most recent usage of SSR. |

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
If the SSR is configured to obtain user accounts from LDAP, the connectivity status of the LDAP server is displayed at the end of the output.
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

## `show user activity`

Show the most recent usage of SSR.

#### Usage

```
show user activity [from <from>] [to <to>] [rows <rows>] [<username>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| from | Only show events after the provided time. Can either be a timestamp or a delta, such as 45m, 1d, or 1mo. [type: timestamp] |
| rows | The number of events to display at once [type: int] (default: 50) |
| to | Only show events before the provided time. Can either be a timestamp or a delta, such as 45m, 1d, or 1mo [type: timestamp] |


##### Positional Arguments

| name | description |
| ---- | ----------- |
| username | the name of the account to display (default: &lt;current user&gt;) |

##### See Also

| command | description |
| ------- | ----------- |
| [`create user`](#create-user) | Create a new user account interactively. |
| [`delete user`](#delete-user) | Delete a user account |
| [`delete user tokens`](#delete-user-tokens) | Revoke API access tokens for a user. |
| [`edit prompt`](#edit-prompt) | Allows the user to specify a custom format for the PCLI prompt. |
| [`edit user`](#edit-user) | Modify an existing user account |
| [`edit user mode`](#edit-user-mode) | Edit the current user&#x27;s configuration mode. |
| [`restore prompt`](#restore-prompt) | Restore the PCLI prompt to the factory default. |
| [`restore users factory-default`](#restore-users-factory-default) | Restore the user configuration to factory defaults. |
| [`set password`](#set-password) | Change your password. |
| [`show roles`](#show-roles) | Display all configured roles |
| [`show user`](#show-user) | Display information for user accounts. |

## `show vrf`

Show VRF name, tenants, and interfaces

#### Usage

```
show vrf [force] {router <router> | resource-group <resource-group>} [<verbosity>]
```
#### Description 

Provides details about all configured VRF’s including name, tenants, network-interfaces, and routing-interfaces in each VRF. Use to verify whether the configuration was specified correctly and resulted in the desired VRF state.

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The router to request VRF information from |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| verbosity | detail |
| summary | (default: summary) |

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
sync peer addresses [{router <router> | resource-group <resource-group>}] [force]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| force | Skip confirmation prompt. Only required when targeting all routers |
| resource-group | The name of the resource group |
| router | The name of the router to synchronize (default: &lt;current router&gt;) |

##### See Also

| command | description |
| ------- | ----------- |
| [`show dynamic-peer-update`](#show-dynamic-peer-update) | Display view of dynamic peer update on the conductor. |
| [`show stats dynamic-peer-update`](cli_stats_reference.md#show-stats-dynamic-peer-update) | Stats pertaining to dynamic peer update processes |

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

## `trace`

Trace the HTTP API calls of another command, for troubleshooting purposes.

#### Usage

```
trace [verbose] [verbose] [verbose] [no-logs] <command> [<command> ...]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| no-logs | Do not display log messages. |
| verbose | Include additional information about each request and response. This argument can be repeated up to 3 times |

##### Positional Arguments

| name | description |
| ---- | ----------- |
| command | Trace another command&#x27;s HTTP calls |

#### Description

The `trace` command is used when attempting to determine what SSR services need to be inspected during troubleshooting.





## `validate`

Validate the candidate config.

#### Usage

```
validate [router <router>]
```

##### Keyword Arguments

| name | description |
| ---- | ----------- |
| router | The name of the router (default: &lt;current router&gt;) |

#### Description

This command validates the current candidate configuration to check for referential integrity among the various configuration objects, to check for the use of deprecated configuration elements, and to supply warnings when various configuration elements cannot be validated.

Many configuration elements within the SSR refer to other configuration elements by their _name_. If an administrator mistypes a name, or a referenced object is deleted without updating the source of that reference, this candidate configuration is said to be invalid. By using the validate command, administrators can ensure their configuration is valid prior to committing it to be the running configuration.

:::note
Validation occurs automatically whenever the commit command is run; this standalone
command allows administrators to check for validity without requiring that the
configuration is committed immediately.
:::

The `validate` command provides warnings when a configuration contains deprecated elements - elements that are scheduled for removal in a future release of the SSR software. This is to give administrators the opportunity to replace the impacted configuration stanzas with their replacement.

The `validate` command will also provide warnings when a configuration cannot be validated and requires administrative oversight.

When validation fails, the administrator is notified via output to the CLI. The output from the `validate` command will identify the configuration that is failing validation.

When run from an SSR conductor, the conductor only validates the configuration itself locally. If the user wishes, the conductor has the ability to distribute the configuration to all managed routers for each of them to validate it and report the results of their validation. This operation is much slower than local validation because the conductor must wait for all routers to report their results and some may be unreachable or timeout. The user may request a distributed validation by executing `validate router all`.

:::note
validation occurs automatically whenever the commit command is run; this standalone command allows administrators to check for validity without requiring that the configuration is committed immediately.
:::

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


