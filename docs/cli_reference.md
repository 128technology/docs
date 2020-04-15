---
title: 'Command Line Reference'
sidebar_label: 'Command Line Reference'
---

This reference is better understood if you know the basics of how to operate the PCLI.  If you have not used the PCLI before, it is beneficial to first read [the basics about the PCLI](concepts_pcli.md) and the [basics of the configuration management](config_basics.md).

## clear

#### Syntax

```
clear { arp | context { stats start-time | node | router } | events }
```

#### Description

The `clear` command has four distinct modes of operation:

- `clear arp` will remove ARP entries from a specific router or node.
-  `clear context stats start-time`, `clear context node` and `clear context router` will "reset" the context of the PCLI back to its typical, "context free" setting. (For more information on setting contexts, refer to the section on `set context` in this manual.)
- The `clear events` command erases historical event data associated with various record types that the system can generate (e.g., alarm records or administrative actions).
- The `clear history` command will remove the PCLI&#39;s command history, removing the ability to cycle back through the command history by using the arrow keys in a terminal session.

#### Platforms

The `clear context router` command is only available on the 128T Conductor.

#### Privileges Required

Available to _admin_ and _user_ accounts.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.0.0   | This feature was introduced |
| 3.1.0   | `clear events` was added    |
| 3.2.0   | `clear arp` and `clear context stats start-time` was added |

## clear arp

#### Syntax

```
clear arp { device-interface <device-interface> | vlan <vlan> | ip <ip-address> | router <router-name> | node <node-name> }
```

#### Description

The `clear arp` command is typically used during troubleshooting, to remove ARP (Address Resolution Protocol) entries from a 128T router or node&#39;s ARP cache. The command has multiple filters, allowing administrators to specify which specific entry to remove.

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | --------------------------- |
| 3.2.0   | This feature was introduced |

## commit

#### Syntax

```
commit [force]
```

#### Description

The `commit` command causes the 128T router to validate the candidate configuration, and then replace the running configuration with the candidate configuration (assuming it passes the validation step). It is used once a series of configuration changes have been made, and an administrator wishes to "activate" those configuration changes.

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

```
*mbaj@burl-corp-primary.burl-corp# commit
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

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 3.0.0   | `force` feature was added   |

## compare

#### Syntax

```
compare config { candidate | running } { candidate | running }
```

#### Description

The `compare` command presents a list of differences between the two configurations specified as arguments on the command line. The one listed first influences the output in a very important way: the 128T router will return a list of configuration commands that will cause the configuration to be listed _first_ to be brought to parity with the one listed _second_. (Note: since the only editable configuration is the "candidate" configuration, the changes outlined by the _compare_ command cannot be directly applied to the "running" configuration.)

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

#### Privileges Required

Available to _admin_ and _user_ accounts.

#### Version History

| Release | Modification                |
| ------- | --------------------------- |
| 2.0.0   | This feature was introduced |

## configure

#### Syntax

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

The full suite of components, and relationships among those components, within the configuration tree are described in the Configuration Elements Reference section of this document.

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 2.0.0   | command was renamed to `configure` from `config` |


## create

#### Syntax

```
create { certificate | user }
```

#### Description

The `create` command has two modes of operation: one that creates X.509 certificate requests/self-signed certificates, and another that takes the 128T router&#39;s configuration and creates a backup file. The sections that follow describe each of these two modes in more detail.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 1.1.0   | Adjusted hierachy for certificate management. Added ability to create configuration backups. |

## create certificate

#### Syntax

```
create certificate { request | self-signed } webserver
```

#### Description

The `create certificate` has two modes, one that generates a certificate-request (which is then sent to a Certificate Authority), and one that creates a self-signed-certificate. In both cases the process to be followed is very similar; the 128T router will, through a series of interactive prompts, request information from the administrator to generate either the request or certificate, as appropriate.

The certificate created by the `create certificate` command stores its output file at `/etc/128technology/pki/`.

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

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 1.1.0   | `create certificate` was moved to a submenu |

## create user

#### Syntax

```
create user <username>
```

#### Description

The `create user` command allows administrators to create user accounts for user and/or administrative access to the 128T router&#39;s management port. Issuing the `create user <username>` launches an interactive session that prompts for the new user&#39;s full name, password, whether they are an administrative or basic user, and the enabled/disabled state of that user account.

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

Note that the password must be at least eight characters long, with at least one uppercase letter, one lowercase letter, one digit, and cannot contain any characters that repeat more than three times.

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |


## delete (in config)

#### Syntax

```
delete { <configuration> } [ force ]
```

#### Description

The `delete` command, when issued within the configuration hierarchy, lets administrators delete portions of the candidate configuration. This can be used to delete specific fields within a configuration element, or entire elements.

The command will prompt you for confirmation before deleting the configuration, unless the optional keyword `force` is included.

```
admin@labsystem1.fiedler# config authority router burlington
admin@labsystem1.fiedler (router[name=burlington])# delete node combo1
Are you sure you want to delete item "[name=combo1]" [y/N]: N
Operation canceled
```

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## delete (top level of PCLI)

#### Syntax

```
delete { certificate | flows | user }
```

#### Description

The _delete_ command allows administrators to delete various aspects of persistent data on their 128T router. The various modes of the _delete_ command are shown in the sections that follow.

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## delete certificate

#### Syntax

```
delete certificate webserver
```

#### Description

The _delete certificate webserver_ command allows administrators to delete certificates that are stored on the 128T router. Note that the 128T router will always prompt the administrator to confirm deletion (the "force" keyword is not allowed).

```
admin@labsystem1.fiedler# delete certificate webserver
Are you sure you want to delete certificate 'webserver'? [y/N]: y
admin@labsystem1.fiedler#
```

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## delete config

#### Syntax

```
delete config exported [force] <export-name>
```

#### Description

The _delete config_ command allows administrators to delete configurations from the 128T&#39;s filesystem that had previously been exported with the _export config_ command. The _force_ flag will skip the confirmation check without prompting the user.

```
admin@cnd1.conductor# delete config exported 20180115_export.gz
Are you sure that you want to delete exported config '20180115_export.gz'? [y/N]: y
Successfully deleted exported configuration: '20180115_export.gz'
admin@cnd1.conductor#
```

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.2.0   | This feature was introduced |

## delete flows

#### Syntax

```
delete flows [<node-name>]
```

#### Description

The _delete flows_ command clears all active flow data from this node. Administrators can specify which node to clear flow data from by adding the node name as an optional argument to the command.

```
admin@labsystem1.fiedler# delete flows linecard-test
admin@labsystem1.fiedler#
```

:::warning
This may be a service impacting operation.
:::

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## delete user

#### Syntax

```
delete user <username>
```

#### Description

The _delete user_ command deletes a user account that had previously been created via the _create user_ command.

```
admin@labsystem1.fiedler# delete user jdeveloper
Delete account 'jdeveloper'? [y/N]: y
Account 'jdeveloper' successfully deleted
```

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## do

#### Syntax

```
do <command>
```

#### Description

The _do_ command lets administrators execute the various PCLI commands while within the configuration branch. This command is available ubiquitously while in configuration mode.

```
admin@cnd1.conductor (authority)# do show config exports
Tue 2018-01-16 10:31:14 EST
There are no configuration exports
Completed in 0.05 seconds
admin@cnd1.conductor (authority)#
```

#### Privileges Required

Available to _admin_ only; _do_ is only available within configuration mode.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## edit

#### Syntax

```
edit { prompt | user }
```

#### Description

The _edit_ command lets administrators change aspects and preferences of their 128T system; _edit prompt_ will change the system (PCLI) prompt, and _edit user_ manages the various user accounts on the 128T system. Each will be described in the sections that follow.

#### Privileges Required

Available to _admin_ only

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.1.0   | This feature was introduced |

## edit prompt

#### Syntax

```
edit prompt <format-string>
```

#### Description

The _edit prompt_ command lets administrators change the display of the PCLI prompt, and includes a flexible array of options for customizability. In addition to various variables, the prompt string can include conditional statements, to affect the display of the prompt under different operating modes. All of this is accomplished by supplying a _format string_, which contains the syntax of the desired PCLI prompt.

The format string can accept the following special variables and patterns:

| Variable Name | Variable Contents |
| --- | --- |
| {user} | Name of the currently logged in user (e.g., "admin") |
| {address} | Full name (node.router) of the current system |
| {node} | The name of the current node |
| {router} | The name of the router |
| {context}   | Currently set context if one is set; empty otherwise. See _set context_ for more information. |
| {path}       | Full path to the current PCLI menu, separated by &#39;/&#39; |
| {location}   | Name of current PCLI menu |
| {privilege} | "#" if the current user has administrator privileges, else "&gt;" |

The _set prompt_ format also supports conditional content, by using a _conditional statement_ with the following

#### Syntax

```
[conditionalVariable!trueFormat:falseFormat]
```

The conditional is broken into three parts; the _conditionalVariable_ is one of the following types, and will evaluate to true or false based on the current PCLI state. The _trueFormat_ value is in "prompt format" syntax, and will be included in the prompt if the conditional variable evaluates to true; likewise, the _falseFormat_ is included if the conditional variable evaluates to false.

| Conditional | Evaluation |
| --- | --- |
| {top-level} | Evaluates to true if the PCLI is at the top level, evaluates to false otherwise. |

For example:

```
edit prompt 'This prompt is [top-level?definitely:not] top level'
```

The edit prompt format string also supports various timestamp codes as described by strftime format codes.2

For example:

```
edit prompt '(%x %H:%M) {user}@{address}$'
```

Also, there are various special/reserved characters, as well as character that must be escaped if you use them in a format string. This includes:

| Character | Format String Representation |
| --- | --- |
| newline | \n |
| tab | \t |
| [ | \[ |
| ] | \] |
| { | {{ |
| } | }} |
| % | %% |
| ! | \! |

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.1.0   | This feature was introduced |

## edit user

#### Syntax

```
edit user <username>
```

#### Description

The _edit user_ command enters a configuration subtree specific to administering user accounts. From within this subtree, administrators can change any of the attributes associated with a user account (full name, password, role, and enabled state). This is done in a "configuration-like" way, where commands are issued as _attribute value_.

As with standard configuration, using the "?" command will list the options available for editing.

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

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## exit

#### Syntax

```
exit
```

#### Description

The _exit_ command moves your focus to the PCLI home.
```
admin@labsystem1.fiedler# config authority router beacon
admin@labsystem1.fiedler (router[name=beacon])# where
configure authority router beacon
admin@labsystem1.fiedler (router[name=beacon])# exit
admin@labsystem1.fiedler# where
admin@labsystem1.fiedler#
```

#### Privileges Required

Available to _admin_ only; _exit_ is only available within configuration mode.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## export

#### Syntax

```
export config { backup <name> | candidate | running } target>
```

#### Description

The _export_ command takes a configuration from a previously created backup (via _create config backup_), from the candidate configuration, or from the 128T router&#39;s running configuration, and stores it as a file on the local filesystem. It can then be taken off, moved onto other systems, archived, etc.

Exported files are stored in /etc/128technology/config-backups/ and are stored as GZIP compressed files.

```
admin@labsystem1.fiedler# export config candidate myCandidate
Successfully exported configuration: /etc/128technology/config-exports/myCandidate.gz
admin@labsystem1.fiedler#
```

The _export_ command&#39;s complement, _import_ is used to reverse the process, taking a configuration archive and restoring it onto a system.

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |
| 3.1.0   | The location of the exported configuration changed |

## import

#### Syntax

```
import { certificate | config }
```

#### Description

This command allows administrators import either configuration backups or X.509 certificates (via textual cut and paste) and make them available to the 128T router&#39;s software.

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 2.0.0   | Added _config_ as a subcommand |

## import certificate

#### Syntax

```
import certificate webserver
```

#### Description

This command allows administrators to load certificates into their 128T router by pasting them into their active PCLI session. By issuing the `import certificate` command, the PCLI prompts the user for the name of the certificate they plan to import, then asks whether it is a CA (certificate authority) certificate or not. Once these questions are answered, administrators can paste the certificate, and is reminded to press CTRL-D once the pasting is complete. Pressing CTRL-D causes the 128T router to validate the configuration to ensure it is a valid X.509 certificate before loading it into persistent storage. If the X.509 validation fails, the user is informed as follows:

```
admin@labsystem1.fiedler# import certificate webserver
Enter the CA certificate in PEM format (Press CTRL-D to finish):
Certificate is not in valid X509 format
admin@labsystem1.fiedler#
```

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## import config

#### Syntax

```
import config [force] <backup-name>
```

#### Description

This command takes a backup configuration (one that has been stored with the _export_ command) and overwrites the current candidate configuration with its contents. Inclusion of the optional "force" keyword will skip the prompt for confirmation.

```
admin@labsystem1.fiedler# import config myCandidate.gz
Replace the existing candidate configuration with the contents of backup _myCandidate.gz_? [y/N]: y
Backup configuration _myCandidate.gz_ successfully written to the candidate config
admin@labsystem1.fiedler#
```

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## ping

#### Syntax

```
ping [count <number>] [size <size>] [timeout <timeout>] [set-df-bit] egress-interface <interface-name> [gateway-ip <address>] <destination-ip>
```

#### Description

This issues ICMP requests to the specified _destination-ip_ merely as a connectivity test, and bypasses the typical packet processing logic that would potentially restrict access to various tenants and destined for service addresses. The _count_ modifier will affect the number of pings that are issued (the default is four). The _interface_ modifier lets administrators specify the egress interface for issuing the pings. The _timeout_ modifier will set the waiting period for a reply before declaring the ping as a failure; the default is 10 (seconds). The _set-df-bit_ and _record-route_ options enable the respective flags in the outgoing ICMP request.

#### Privileges Required

Available to _admin_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.2.0   | This feature was introduced. The previous behavior of the _ping_ command is now realized as _service-ping_ |

## quit

#### Syntax

```
quit
```

#### Description

This command logs the user out, and quits the PCLI.

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## replace

#### Syntax

```
replace config [case-sensitive] [regex] [whole-word] [all] <query> <replacement>
```

#### Description

The _replace_ command is a powerful tool for making sweeping configuration changes, similar to a "find and replace" operation in a word processor. The _replace_ command has several optional arguments that affect how the replacement occurs; _case-sensitive_ will only match elements within the configuration that match the case supplied with the _query_ string. The _regex_ argument treats the query string as a regular expression. The _whole-word_ argument requires that the match be an entire word, rather than just a substring or partial match.

The user-supplied _query string_ and _replacement string_ are the matching text, and the replacement text, respectively.
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

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.1.0   | This feature was introduced |

## restore

#### Syntax

```
restore { config | prompt | users }
```

#### Description

The _restore_ command is used to return aspects of the 128T router to earlier states. For configuration, this may restore a previously backed-up configuration (or even the factory default configuration). For users, this will restore the factory default installed users – effectively deleting all administratively created user accounts.

The various modes of the _restore_ commands are shown in the sections that follow.

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 1.1.0   | User account restoration added |

## restore config

#### Syntax

```
restore config { backup | factory-default | running }
```

#### Description

The _restore config_ command operates on the candidate configuration (the "work in progress" copy of the configuration which is subject to edits), to allow administrators to save changes, undo changes, or return the candidate configuration to the 128T router&#39;s factory defaults.

The various modes of the _restore config_ commands are shown in the sections that follow.

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.1.0   | This feature was introduced |

## restore config backup

#### Syntax

```
restore config backup <backup-name>
```

#### Description

This command copies the contents of a stored backup (i.e., one created with the "create config backup" command) to the candidate configuration. Since the backup is placed into the candidate, it will need to be committed (_commit_) in order to take effect for packet forwarding.

```
admin@labsystem1.fiedler# restore config backup my_config.bkup
Configuration successfully written to the candidate config
admin@labsystem1.fiedler#
```

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.1.0   | This feature was introduced |

## restore config factory-default

#### Syntax

```
restore config factory-default [force]
```

#### Description

This command removes all administrator-added configuration, and restores the basic configuration to all of the 128T router&#39;s factory default settings. The PCLI will prompt for confirmation before resetting the configuration, unless the optional _force_ modifier is added.

```
admin@labsystem1.fiedler# restore config factory-default
Are you sure you want to restore the candidate config to factory defaults? [y/N]: n
Operation canceled
```

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.1.0   | This feature was introduced. Replaces the deprecated `reset-factory-default-config` |

## restore config running

#### Syntax

```
restore config running [force]
```

#### Description

This command removes all administrator-added configuration since the last _commit_, effectively bringing the running configuration and the candidate configuration back to parity. The PCLI will prompt for confirmation before resetting the configuration, unless the optional _force_ modifier is added.

```
*admin@node1.bernstein# restore config running
Are you sure you want to discard uncommitted changes from the candidate config? [y/N]: y
Candidate configuration changes successfully discarded
*admin@node1.bernstein#
```

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.1.0   | This feature was introduced |
| 2.0.0   | previously named _restore config candidate_ |

## restore prompt

#### Syntax

```
restore prompt [force]
```

#### Description

The _restore prompt_ command returns the PCLI&#39;s prompt to its factory default, in the event that an administrator has modified it.

```
(04/10/2020 19:56) admin@gouda.novigrad$restore prompt
Restore the default prompt? [y/N]: y
PCLI prompt successfully updated
admin@gouda.novigrad#
```

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.1.0   | This feature was introduced |

## restore users

#### Syntax

```
restore users factory-default [force]
```

#### Description

The _restore users factory-default_ command deletes all administratively created user accounts (i.e., all but the ones that are installed with the 128T routing software natively) and leaves the system with just the _admin_ and _user_ accounts.

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## rotate

#### Syntax

```
rotate log [<process-name>] [<node-name>]
```

#### Description

This command is used to rotate log files (i.e., close the current log file and open a new one) generated by the various processes that comprise the 128T router to rotate. The 128T router&#39;s log files, stored in `/var/log/128technology`, keep 25 prior logs for each process, space permitting. Files are rotated such that, for instance, pcli.log becomes pcli.1.log while pcli.1.log becomes pcli.2.log, and so on. The oldest log file for each process is removed.

The _rotate log_ command is useful prior to engaging in troubleshooting exercises, to help narrow down which files may contain items of interest. It is particularly useful when used in conjunction with the _write_ command, described elsewhere in this document.

Without any arguments, the _rotate log_ command will rotate all log files on all nodes.

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

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## save

#### Syntax

```
save { events | runtime-stats <filename> | tech-support-info }
```

#### Description

This command packages statistics (in the case of _runtime-stats_), or logs and other diagnostic data (in the case of _tech-support-info_), to exchange with 128 Technology&#39;s support team. The _runtime-stats_ command will save the file within `/var/log/128technology` with the filename specified as a command line argument. The tech-support-info command echoes the location where it stores the file when complete (`/var/log/128technology/tech-support-info.tar.gz`).

The _save events_ subcommand is described in more detail below.

Note that these commands collect a lot of data, and may take some time to complete.

```
admin@labsystem1.fiedler# save tech-support-info

Retrieving Tech Support Info...
/var/log/128technology/tech-support-info.tar.gz
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.1.0   | This feature was introduced |
| 3.0.0   | Added _runtime-stats_       |
| 3.1.0   | Added _events_              |

## save events

#### Syntax

```
save events { admin | alarm | all | system | traffic } [from <startDate>] [to <endDate>]
```

#### Description

The _save events_ subcommand, added in software version 3.1, writes historical system events into a CSV file in `/var/log/128technology`. The _save events_ subcommand can take one of several arguments, to filter the content to a specific subset of the entirety of the platform&#39;s events.

By default, the _save events_ command will write the events going back 168 hours (one week); either the start date or the end date can be specified in YYYY-MM-DDThh:mm::ssZ format to change the window of time for the output file&#39;s contents.

```
admin@labsystem1.fiedler# save events system
Writing event records...
system events saved to /var/log/128technology/system_events.csv

admin@labsystem1.fiedler# save events system from 2017-07-20T16:00:00Z
Writing event records...
system events saved to /var/log/128technology/system_events.csv
admin@labsystem1.fiedler#
```

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.1.0   | This feature was introduced |

## search

#### Syntax

```
search [commands | config [ candidate | running] | config-attributes ] [case-sensitive ] [regex] [whole-word] <query>
```

#### Description

The _search_ command and its various subcommands let users search through the 128T router&#39;s PCLI command tree, the configuration tree, and user-supplied configuration data to locate the information specified by the supplied _query_ string.

When omitting the optional filter, the _search_ command will return results for all of the types of information it can locate: commands, configuration attributes, and configuration data:

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
Supplying a filter will limit the search:
```
admin@labsystem1.fiedler# search config Newton

Candidate and Running Configuration:
  - config authority router Fabric128 node ptcricket location Newton, MA

admin@labsystem1.fiedler#
```
Note well the output above that indicates that the string "Newton" was found in both the candidate and running configurations. For items that only appear in one or the other, the result will indicate this as well:
```
admin@labsystem1.fiedler# search config myRoute

Candidate Configuration:
  - config authority router Fabric128 service-route myRoute name myRoute
admin@labsystem1.fiedler#
```
The output of _search config_ can be further filtered by explicitly specifying either _candidate_ or _running_ as an optional argument:
```
admin@labsystem1.fiedler# search config candidate myRoute

Candidate Configuration:
  - config authority router Fabric128 service-route myRoute name myRoute

admin@labsystem1.fiedler#
```

New as of version 3.1, a user can specify whether the search results should match entire words (with the _whole-word_ flag), search with case sensitivity (with the _case-sensitive_ flag), or to treat the search string as a regular expression for flexible matching patterns (with the _regex_ flag).

```
admin@labsystem1.fiedler# search config whole-word internal

Running Configuration:
 - config authority router RTR_CENTRAL_COMBO inter-node-security internal
 - config authority router RTR_EAST_COMBO inter-node-security internal
 - config authority router RTR_EAST_CONDUCTOR inter-node-security internal
 - config authority router RTR_WEST_COMBO inter-node-security internal
 - config authority security internal name internal

admin@labsystem1.fiedler# search config whole-word newInternal

Candidate Configuration:
 - config authority router RTR_CENTRAL_COMBO inter-node-security newInternal
 - config authority router RTR_EAST_COMBO inter-node-security newInternal
 - config authority router RTR_EAST_CONDUCTOR inter-node-security newInternal
 - config authority router RTR_WEST_COMBO inter-node-security newInternal
 - config authority security newInternal name newInternal

admin@labsystem1.fiedler#
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |
| 3.1.0   | Updated to add _case-sensitive_, _regex_, and _whole-word_ flags |

## send

#### Syntax

```
send command { restart | rollback | start | stop | upgrade } { router <routerName> { node <nodeName> } } [force]
```

#### Description

The _send_ command is available on the 128T Conductor and is used to instruct routers that it manages to execute basic system-level commands. The _start_, _stop_, and _restart_ commands will cause the router to launch, halt, or reload all of its software processes. The _upgrade_ and _rollback_ commands are used for software version management.

:::note
In order to use the _send_ command to manage remote routers, your network must be set up to use _automated provisioning_ between the conductor and router(s). Automated provisioner establishes the control channel through which the _send_ command transmits instructions from a conductor to one or more routers.
:::

The optional _force_ flag will omit the confirmation prompt before sending the command. Note that all of these commands are service impacting.

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.1.0   | This feature was introduced |

## service-ping

#### Syntax

```
service-ping [tenant <tenant>] [service-name <service-name>] [interface <interface>] [count <count>] [size <size>] [timeout <timeout>] [set-df-bit] [record-route] [node <node>] <destination-ip>
```

#### Description

This issues ICMP requests to the specified _destination-ip_, and offers the administrators a variety of ways to formulate the request. The _tenant_ and _service-name_ modifiers specify which "source tenant" to use for the request, and the name of the service for which the _destination-ip_ applies. The _count_ modifier will affect the number of pings that are issued (the default is four). The _interface_ modifier lets administrators specify the egress interface for issuing the pings. The _timeout_ modifier will set the waiting period for a reply before declaring the ping as a failure; the default is 10 (seconds). The _set-df-bit_ and _record-route_ options enable the respective flags in the outgoing ICMP request.

```
admin@labsystem1.fiedler# ping count 3 192.168.1.1
PING 192.168.1.1 (192.168.1.1) 56 bytes of data.
Ping from 192.168.1.1 (192.168.1.1): icmp_seq=0 ttl=10
Ping from 192.168.1.1 (192.168.1.1): icmp_seq=1 ttl=10
Ping from 192.168.1.1 (192.168.1.1): icmp_seq=2 ttl=10
admin@labsystem1.fiedler#
```

#### Privileges Required

Available to _admin_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |
| 3.0.0   | Included tenant, service, and node information |
| 3.2.0   | Previously named _ping_     |

## set

#### Syntax

```
set { context | log level | password }
```

#### Description

The _set_ command is used to change runtime attributes of the 128T routing platform. The various uses are described in the sections of this document that follow.

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## set context

#### Syntax

```
set context { [router <router-name>] [node <node-name>] } | stats start-time [<time> | now]
```

#### Description

The _set context_ command has two distinct functions; first, it can be used to set the PCLI into a mode where every subsequent command that is issued that can take a router (in the case of the 128T Conductor) or a node (in the case of a 128T router) as an argument will default to the context&#39;s values.

:::note
This does _not_ "remote shell" into the router/node specified by the context&#39;s values, it merely uses these as default values for commands that (generally) display value. E.g., show stats, show flows, etc.
:::

When a context is set, the prompt changes to indicate the context as a parenthetical label at the beginning of each PCLI command:

```
admin@conductor1.labconductor# set context router beacon
(beacon) admin@conductor1.labconductor#
```

Setting the context to a router is only available within the PCLI of a 128T Conductor.

The second function, _set context stats start-time_ lets administrators set a "zero time" for all statistics that the 128T has accumulated. While this _stats start-time_ context is set, all of the output for _show stats_ commands will reflect the accumulation of statistics since that time. This is very useful when troubleshooting issues, or after making configuration changes, to only show data relevant to the exercise at hand.

The _set context stats start-time_ has a flexible parser and can accept many different forms of "time" strings that include date information, time information, or both. There&#39;s also a keyword "now" that sets the _stats start-time_ to the current 128T system clock. (The "now" behavior is the default, and thus the 128T will set the _stats start-time_ to the current clock time when no argument is supplied.)

```
admin@cnd1.conductor# set context stats start-time
Stats start time set to: 2018-02-07 10:41:58

admin@cnd1.conductor# set context stats start-time "December 25, 2017"
Stats start time set to: 2017-12-25 00:00:00

admin@cnd1.conductor#
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.0.0   | This feature was introduced |
| 3.2.0   | Introduced _stats start-time_ functionality |

## set log level

#### Syntax

```
set log level { category <categoryName> | configured } [node <nodeName>] <level> [<processName>]
```

#### Description

The _set log level_ command adjusts the degree to which the 128T router writes information into its log files. This is used to selectively turn up and down log verbosity for troubleshooting purposes.

The special command _set log level configured_ will return the 128T router&#39;s logging behavior to the verbosity specified within the configuration, located at: `authority > router > system > log-level`. Alternatively, administrators can specify a log level to dynamically change all system processes to use.

The optional &lt;processName&gt; and &lt;nodeName&gt; arguments, can selectively change only a specific 128T router&#39;s software process on a given node.

The _level_ must be one of: fatal, error, warning, info, debug, and trace. These are listed in order of increasing verbosity. 128 Technology, Inc. generally recommends that systems be set to _info_ level by default under normal operating circumstances.

As of software version 3.1, a new subcommand _set log level category_, allows administrators to collectively adjust groups of related functionality for specific troubleshooting exercises – instead of blindly adjusting the entire system&#39;s log level and potentially impacting performance.

The category can be any of the following:

| CategoryName | Long Name | Description |
| --- | --- | --- |
| ATCS | Analytics | Components related to the 128T Analytics Engine |
| PLAT | Platform | Components related to the underlying platform management. |
| RDB | Redundancy Database | The subsystem responsible for synchronizing data between nodes. |
| IPC | Interprocess Communications | The subsystem responsible for messaging between components within the 128T product. |
| DATA | Metadata Database | Components related to the configuration and state databases. |
| RTG | Routing | Components related to the routing engine. |
| HWMC | "HighwayManager Control" | Control system for packet processing. |
| FLC | "FastLane Control" | Control system for packet forwarding. |
| FPP | First Packet Processing | System for processing the initial packet of each new session. |
| DISC | Discovery | Discovery-based components (except BFD). Today this is DHCP and ARP. |
| LINK | Internode Link Detection | The subsystem for inter-node communication (today, BFD). |
| USER | User | User-created log messages, generated via the _write_ command. |

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |
| 3.1.0   | Log categories introduced   |

## set password

#### Syntax

```
set password
```

#### Description

The _set password_ command allows a PCLI user to change their password. As is typical with most password changing routines, as a security precaution the user must enter their current password before they&#39;re permitted to change it.

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## shell

#### Syntax

```
shell [<command> ...]
```

#### Description

The shell command allows administrators to execute a bash shell, or to execute a command within the context of a bash shell (specified as a series of optional parameters to the _shell_ command).

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

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## show

#### Syntax

```
show { alarms | application | arp | assets | bgp | certificate | config | context | device-interface | entitlement | events | fib | load-balancer | network-interface | ntp | peers | platform | rib | security | sessions | stats | system | top | user | version }
```

#### Description

The _show_ command is the primary means for users to retrieve information about the current state of their 128T router. The various _show_ subcommands are described in more detail in the various sections that follow.

Most _show_ commands require that your configuration has at least one _node_ defined (as the _show_ commands display data per _node_); if you are executing a _show_ command with no _node_ configured, you will receive an error to that effect from the PCLI.

:::note
The output format of the commands may vary slightly from release to release. The examples presented here are representative of current software (release 1.1). It is expected for the content and appearance to evolve along with the 128T router&#39;s software.
:::

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |


## show alarms

#### Syntax

```
show alarms
```

#### Description

The _show alarms_ subcommand shows all of the active alarms on your 128T router.

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

A list of all alarms your 128T router is capable of generating and details about them can be found in the [Alarm Guide](events_alarms.md).

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.1.0   | This feature was introduced |
| 3.1.0   | previously allowed filtering by node, now the command shows all alarms. |

## show application

#### Syntax

```
show application names [rows <rows>] [router <routername>] [node <nodename>]
```

#### Description

The _show application names_ subcommand shows all of the "application" names that the 128T has learned, or been configured to recognize, as part of its Application Classification feature.

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.2.0   | This feature was introduced |

## show arp

#### Syntax

```
show arp [node { <node-name> | all }] [rows]
```

#### Description

The _show arp_ subcommand displays the ARP table (MAC address to IP address binding) for a given node. The number of lines of output may be controlled through the use of the optional _rows_ attribute. When not present, the 128T router will default to displaying the first 50 rows of the specified node&#39;s ARP table.

```
user@b1.beacon> show arp node b1
Wed 2018-02-07 10:48:17 EST

Node: t128_corp_primary

========== ====== ============== =================== =========
 Dev Port   VLAN   IP             Dest MAC            State
========== ====== ============== =================== =========
​       10    128   172.32.32.64   5c:5e:ab:0f:26:40   Valid
​       11      0   16.7.1.128     08:5b:0e:31:16:02   Valid
​       11      0   16.8.1.128     70:e2:84:05:b6:5b   Valid
...
```

The first part of the output shows the device port associated with the ARP entry. (In the example above, the device ports are 10 and 11.)

The _node_ keyword can take _all_ as an argument to show the ARP tables for all nodes that comprise a given router.

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 2.0.0   | added requirement for use of &#39;node&#39; keyword when specifying a node name. |

## show assets

#### Syntax

```
show assets [<id>]
```

#### Description

The _show assets_ command displays the automated provisioning status of the 128T nodes within an Authority. With 128T&#39;s automated provisioning feature set, each "asset" represents a platform into which the 128T software is installed, updated, managed, etc. The _show assets_ command allows administrators to see, at a glance, the state of all assets – including which software versions have been installed on which nodes, what their router and node identifiers are, etc.
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

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.1.0   | This feature was introduced |

## show bgp

#### Syntax

```
show bgp { [<route>] | neighbors [<neighbor-ip>] [advertised-route | received-routes ] | summary }
```

#### Description

The _show bgp_ command and associated subcommands display information about the state of the BGP process on the 128T router. Each of these subcommands will be described in more detail in the sections that follow.

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

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## show bgp &lt;route&gt;

#### Syntax

```
show bgp <route>
```

#### Description

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

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## show bgp neighbors

#### Syntax

```
show bgp neighbors [<neighbor-ip> [ { advertised-route | received-routes }]]
```

#### Description

The _show bgp neighbors_ command displays detailed information about each of the 128T router&#39;s BGP peers. By specifying a specific peer (through the optional argument _&lt;neighbor-ip&gt;_), administrators can view state information about one peer at a time. When specifying a specific neighbor, the output may include the routes shared with that peer by appending _advertised-route_ or received from that peer by appending _received-routes_.

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

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## show bgp summary

#### Syntax

```
show bgp summary
```

#### Description

The _show bgp summary_ gives administrators a high-level summary table of the state of all of the 128T router&#39;s BGP peers.

It includes information on each BGP neighbor, including the version (V) of BGP that they are using (generally v4), the Autonomous System number (AS), the number of BGP messages sent and received (MsgSent, MsgRcvd), the table version (TblVer), etc.

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

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## show certificate

#### Syntax

```
show certificate webserver
```

#### Description

This command displays the contents of the webserver certificate.

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

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## show config

#### Syntax

```
show config { candidate | exports | running | version }
```

#### Description

This command displays information about the configuration(s) on your 128T router. The primary modes of _show config_ are to display the _candidate_ and _running_ configurations – the configurations that administrators edit, and that the 128T router uses to process sessions, respectively.

```
admin@labsystem1.fiedler# show config version
Fri 2017-02-24 09:34:43 EST
Version 1487780689 committed at: Wed 2017-02-22 11:24:49
Completed in 0.17 seconds
admin@labsystem1.fiedler#
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.1.0   | This feature was introduced |
| 2.0.0   | show candidate-config, show running-config, show config-version, have been reorganized under _show config_ |
| 3.0.0   | removed _show config backup_, replaced by _show config exports_ |

## show config candidate

#### Syntax

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

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced as "show candidate-config" |
| 2.0.0   | Renamed and reorganized as "show config candidate". _flat_, _verbose_, and configuration branch arguments added |

## show config exports

#### Syntax

```
show config exports
```

#### Description

This command lists the set of exported configurations that are stored on your 128T router. (Exported configurations are created with the _export config_ command, described in more detail later in this document.)

```
admin@labsystem1.fiedler# export config candidate 201703021024am
Successfully exported configuration: /etc/128technology/config-exports/201703021024am.gz
admin@labsystem1.fiedler# show config exports
Thu 2017-03-02 10:24:43 EST
201703021024am.gz

Completed in 0.22 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.0.0   | This feature was introduced |

## show config running

#### Syntax

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

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced as "show running-config" |
| 2.0.0   | Renamed and reorganized as "show config running" |

## show config version

#### Syntax

```
show config version
```

#### Description

This command displays the version number of the running configuration on the 128T router. This version number is auto-generated, and is the UNIX timestamp when the configuration is committed. (As a consequence, you should expect that successive commits to the same configuration will increment the version by more than one. This is a change in behavior from pre-2.0 software, which used a monotonically incrementing integer to represent the configuration version.)

```
admin@labsystem1.fiedler# show config version
Fri 2017-02-24 09:34:43 EST
Version 1487780689 committed at: Wed 2017-02-22 11:24:49

Completed in 0.17 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 2.0.0   | The behavior changed as described in the Description text above |
| 3.0.0   | Updated to display the timestamp of the configuration change in human readable form |

## show context

#### Syntax

```
show context stats start-time
```

#### Description

The _show context stats start-time_ subcommand shows the _stats start-time_ (if set), or indicates that there is no start-time currently set. For more information on setting _stats start-time_, please refer to _set context_ in this manual.

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

admin@cnd1.conductor#
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.2.0   | This feature was introduced |

## show device-interface

#### Syntax

```
show device-interface [router <router-name>] [node <node-name>] [name <device-name>]
```

#### Description

This command displays detailed information about device interface(s) (i.e., physical ports) on a 128T router node. The optional command line arguments allow a user to reduce the set of information to a specific set of interfaces on a given node, or a specific interface on a specific node.

Omitting all optional arguments will display detailed information on all device interfaces defined within the 128T router:

```
admin@labsystem1.myRouter# show device-interface
Fri 2016-12-09 11:14:58 EST

========================================
 labsystem1.1
========================================
 Type:                ethernet
 PCI Address:         0000:02:00.0
 MAC Address:         unavailable
 Admin Status:        up
 Operational Status:  up
 Redundancy Status:   not-redundant
 in-octets:                    21234570
 in-unicast-pkts:                112463
 in-errors:                           0
 out-octets:                    8991876
 out-unicast-pkts:                27786
 out-errors:                          0

Completed in 0.18 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |
| 3.0.0   | Added requirement for prepending keywords to the _device-interface-id_ and _node_ arguments to avoid command line ambiguity |
| 3.2.0   | Device-interface is keyed by _name_ rather than _id_ |

## show entitlement

#### Syntax
```
show entitlement
```

#### Description

This command displays the bandwidth entitlement for your 128T router.

```
admin@labsystem1.fiedler# show entitlement
Mon 2017-02-27 10:24:21 EST
============== ============ ====================
 Period Start   Period End   Bandwidth Measured
============== ============ ====================
 2017-FEB-1     2017-MAR-1             28205200
 2017-JAN-1     2017-FEB-1             54829072

Completed in 0.22 seconds
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.1.0   | This feature was introduced |

## show events

#### Syntax

```
show events alarm [from <fromTime>] [to <toTime>] [rows <rows>]
```

#### Description

The _show events_ command displays various event records that the 128T collects during operation. As of software version 3.1, the only event type that is capable of being shown is the alarm history.

The output can be optionally restricted to specific time windows using the `from` and `to` qualifiers. Because this command can generate a lot of output, the `rows` limiter is particularly useful on busy systems.

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

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.1.0   | This feature was introduced |

## show fib

#### Syntax

```
show fib [router <router-name>] [node <node-name>] [<rows>]
```

#### Description

This command shows the Forwarding Information Base (FIB) entries on the node that is specified by the &lt;node-name&gt; argument. The output may be limited to a specified number of rows by adding the optional _&lt;rows&gt;_ modifier at the end of the command.

This command can generate a large quantity of output on a busy system, and it is advised that administrators exercise caution when issuing this command without the &lt;rows&gt; modifier.

```
admin@labsystem1.fiedler# show fib
Node name: linecard-test
=============  ======  =======  ========  ==============  ===========
IP Prefix        Port  Proto    Tenant    Service         Next Hops
=============  ======  =======  ========  ==============  ===========
172.16.1.0/24       0  <none>   red       east            1-10.0
172.16.1.1/32     179  TCP      red       UnknownService  <none>
172.16.2.0/24       0  <none>   red       west            1-11.0
172.16.2.1/32     179  TCP      red       UnknownService  <none>
=============  ======  =======  ========  ==============  ===========

admin@labsystem1.fiedler# show fib node linecard-test 2
Node name: linecard-test
=============  ======  =======  ========  ==============  ===========
IP Prefix        Port  Proto    Tenant    Service         Next Hops
=============  ======  =======  ========  ==============  ===========
172.16.1.0/24       0  <none>   red       east            1-10.0
172.16.1.1/32     179  TCP      red       UnknownService  <none>
=============  ======  =======  ========  ==============  ===========
Press any key to continue or 'q' to quit: q
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 3.0.0   | Added _node_ keyword to enforce PCLI consistency |

## show load-balancer

#### Syntax

```
show load-balancer [agent <agent-name>] [node <node-name>] [service <service-name>]
```

#### Description

The _show load-balancer_ command provides feedback on the 128T router&#39;s load balancing behavior, when configured to balance traffic (via a service-policy).

This command, when issued without any filters (agent, node, or service) will display all agents, nodes, and services that are subject to load balancing. (The output can be quite verbose.) These filters may be combined to "hone in" on specific agents/nodes/services selectively.

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

This command is extremely helpful for identifying why the 128T router selected specific destinations for its session-oriented traffic.

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.1.0   | This feature was introduced |

## show network-interface

#### Syntax

```
show network-interface [name <if-name>] [router <router-name>] [node <node-name>]
```

#### Description

The _show network-interface_, a counterpart to _show device-interface_, shows information and statistics relevant to the logical interfaces configured on your 128T networking platform.


```
admin@cnd1.conductor# show network-interface router datacenter
Wed 2018-02-07 12:07:36 EST

============ ====== ======== ====== ====== ============= ========== ===============
 Router       Node   Device   Name   VLAN   Device Type   DHCP       Address
============ ====== ======== ====== ====== ============= ========== ===============
 datacenter   dc1    None     eno1      0   ethernet      disabled   192.0.2.1/31
 datacenter   dc1    None     eno2      0   ethernet      disabled   10.128.0.1/16
 datacenter   dc2    None     eno1      0   ethernet      disabled   192.0.2.1/31
 datacenter   dc2    None     eno2      0   ethernet      disabled   10.128.0.1/16

Completed in 0.88 seconds
```

The _show network-interface_ command will show router, node, and device names, as well as the network-interface name and basic information about each interface.

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.2.0   | This feature was introduced |

## show ntp

#### Syntax

```
show ntp [node <node-name>]
```

#### Description

The _show ntp_ subcommand displays properties of the NTP (Network Time Protocol) process running on the local node, or on the node specified as the optional &lt;node‑name&gt; parameter passed on the command line.

```
admin@cnd1.conductor# show ntp
Wed 2018-02-07 12:39:25 EST

Node: cnd1.conductor

======== ================== ========= ========= ====== ====== ====== ======= ======== ======== ========
 Status   Time Source        Ref. ID   Stratum   Type   When   Poll   Reach    Delay   Offset   Jitter
======== ================== ========= ========= ====== ====== ====== ======= ======== ======== ========
 active   \*time-d-g.nist.g  .NIST.          1   u         5     64       1   22.097   -0.210    0.417
 active    usnyc3-ntp-002.   .GPSs.          1   u         4     64       1   11.234    1.150    0.652

Completed in 1.32 seconds
```

The "Ref. ID" field is a four letter ASCII string assigned to the reference clock, and refers to the identifiers defined in RFC 5905.

#### Privileges Required

Available to _admin_ and _user_ accounts. Updated in 3.0, added _node_ keyword to enforce PCLI consistency.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## show peers

#### Syntax

```
show peers [<peer-name>]
```

#### Description

The _show peers_ command displays properties of each of the "neighboring" 128T routers that the router in question has a peering association with.

This command shows information on peering associations between 128T routers, not peering associations with BGP peers. For information on BGP peering statistics, refer to "show bgp" in this document.

For each peer it shows which interface the peer is reachable via, the destination IP address for which the peer is reached, the VLAN to use to reach it, and whether the peer is currently "up", "down", or "initializing".

```
admin@labsystem1.fiedler# show peers
Mon 2017-02-27 15:50:01 EST

=============== ===================== ===== ============== ====== ========
 Peer            Node                   If   Destination    Vlan   Status
=============== ===================== ===== ============== ====== ========
 peerA           labsystem1             11   REDACTED          0   up
 peerA           labsystem2            211   REDACTED          0   down
 peerB           labsystem1             10   REDACTED       1002   init
 peerB           labsystem2            210   REDACTED       1002   init
 peerC           labsystem1             10   REDACTED       1002   up
 peerC           labsystem2            210   REDACTED       1002   down

Completed in 0.17 seconds
```

#### Privileges Required

Available to _admin_ and _user_ accounts.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.0.0   | This feature was introduced |

## show platform

#### Syntax

```
show platform [node <node-name>]
```

#### Description

The _show platform_ command displays properties of the underlying platform upon which the 128T software is running. This can assist in finding PCI addresses and MAC addresses for the hardware in the system, as well as disk information, OS information, etc.

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

#### Privileges Required

Available to _admin_ and _user_ accounts.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.0.0   | This feature was introduced |

## show rib

#### Syntax

```
show rib [<route>] | [summary]
```

#### Description

The _show rib_ subcommand displays the contents of the 128T router&#39;s Routing Information Base (RIB). This is the complete list of connected, direct, and learned routes on the system. (Note that the output may be quite verbose.)

When issuing the command without any arguments, the entire RIB is displayed.

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

The _show rib summary_ command outputs a concise table with statistics on the RIB:

```
admin@labsystem1.fiedler# show rib summary
Route Source         Routes               FIB  (vrf 0)
connected            5                    5
------
Totals               5                    5

admin@labsystem1.fiedler#
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## show security

#### Syntax

```
show security key-status
```

#### Description

The _show security key-status_ subcommand displays information and statistics related to the 128T&#39;s security rekeying feature. It will indicate the current key index (which will be common among all routers managed by a 128T conductor) and relevant statistics on when the last rekey event occurred, when the next will occur, etc.

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

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.2.0   | This feature was introduced |

## show sessions

#### Syntax

```
show sessions { [node <node-name>] [<rows>] | top bandwidth }
```

#### Description

The _show sessions_ subcommand displays active sessions passing through the 128T router (or the node specified by the optional _node-name_ argument. The output from the command shows the sessions internal ID (useful for searching through log files), the service, tenant, and source/destination IP information for each active session.

The NAT IP and Port fields will be populated whenever a session is subject to source NAT (see _source-nat_ later in this reference guide for more information). It also shows the timeout value that will cause the session to expire if it remains idle for that number of seconds.

Various services and tenants may display with surrounding braces to indicate that these are internally-generated services and tenants. These internal services and tenants are created when peering between adjacent nodes, establishing BGP sessions, BFD sessions, etc.

:::info
The contents of the table will vary based upon the software version in use. This applies when, for example, a conductor running a new software version requests session table data from routers running older software versions.
:::

```
admin@labsystem1.fiedler# show sessions
Fri 2017-07-21 13:06:06 EDT

Node: labsystem1
================================ ========== ========== ========== ====== =======
 Session Id                       Service    Tenant     Dev Port   VLAN   Proto
================================ ========== ========== ========== ====== =======
 198b5f05-c62f-47a5-9d8d-d474cc   <Control   <unknown        255      0   TCP
 198b5f05-c62f-47a5-9d8d-d474cc   <Control   <unknown         10      0   TCP

Completed in 0.11 seconds
```

The _top bandwidth_ arguments will list, in order, the top ten highest consumers of bandwidth among all active sessions. This is useful to understand the current utilization on your 128T network resources.

```
admin@labsystem1.fiedler# show sessions top bandwidth
Fri 2017-07-21 13:13:42 EDT

Node: labsystem1
=========== ===================== =================== ========== ========================= =================
 Bandwidth   Source                Destination         Protocol   Service                   Tenant
=========== ===================== =================== ========== ========================= =================
​       0.0   192.168.254.2:59000   192.168.254.1:179   TCP        <ControlMessageService>   <unknownTenant>
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |
| 3.0.0   | Added _node_ keyword to enforce PCLI consistency |
| 3.1.0   | Was _show flows_ - Substantially reformatted output |

## show stats

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

## show system

#### Syntax

```
show system [connectivity | processes | registry | version] [node <node>]
```

#### Description

The _show system_ subcommand displays overall system health for the nodes that comprise your 128T router. It includes the state of the node ("starting" is displayed when the node is in the process of starting up and is not yet ready for handling traffic, "running" means the node is active, "offline" means the node is configured but not currently present), its role, software version, and uptime.

```
admin@labsystem1.fiedler# show system
Mon 2017-02-27 15:11:06 EST

===============================
 labsystem1
===============================
 Status:       running
 Version:      3.0.0
 Uptime:       0 days 20:58:28
 Role:         combo
 Alarm Count:  0

Completed in 0.22 seconds
```

The optional _node-name_ argument will only show information about the specified node.

Adding the _processes_ argument will list the processes for all nodes in the cluster, and which processes on which nodes are considered _leaders_ (from a high availability standpoint).

The _connectivity_ argument displays the state of all connected systems. On a 128T Conductor, this is a convenient way to display all of the nodes that are connected, disconnected, or "unconfigured". (Note: when a node appears as _unconfigured_, it means that it is attempting to connect to the 128T conductor, but that conductor does not have any supporting configuration to supply to it.)

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

By adding the _internal_ flag to _show system connectivity internal_, the system will report all interprocess connections that are currently available on the system, as well as connections between a router and conductor (if applicable).

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

The _registry_ argument shows the processes/services that have registered with the local system's "SSC" (system services coordinator). On a 128T Conductor, this will show all of the connected routers_ registered system processes/services.

The _version_ argument displays more detailed information about the software build (number, date) that is running on your system.

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |
| 3.0.0   | Added _connectivity_ and _tunnels_ commands |
| 3.1.0   | _show version_ was moved under _show system version_ |
| 3.2.0   | _show system tunnels_ was renamed _show system connectivity internal_ |

## show tenant

#### Syntax

```
show tenant members [rows <number>] [router <router-name>] [node <nodename> ]
```

#### Description

The _show tenant_ subcommand displays the mapping logic that the 128T router uses for associating the _source IP address_ of inbound requests to tenant definitions – whether they be interface-based (i.e., a tenant has been configured on a network-interface) or member based (i.e., a prefix has been configured within a neighborhood).

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.2.0   | This feature was introduced |

## show top

#### Syntax

```
show top sources by [total-data | session-count] [rows <num>]
```

#### Description

The _show top sources_ command will render a table displaying the highest consumers (by source address) of data or rote number of sessions.

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.2.0   | This feature was introduced |


## show udp-transform

#### Syntax

```
show udp-transform [force] [router <router>] [node <node>]
```

##### Keyword Arguments
- **force**  Skip confirmation prompt
- **node**   Node for which to display transform status
- **router** Router for which to display transform status

#### Description
Display the status of UDP transform between peers.

UDP transform, also known as the [firewall detector]](concepts_machine_communication.md#firewall-detector) is used to determine if stateful firewalls exist between 128T peers as certain firewalls may interfere with SVR.

```
admin@labsystem1.fiedler# show udp-transform router newton
============= ============ ============ ========== =========================================
 Router Name   Node Name    Peer         Status     Reason(s)
============= ============ ============ ========== =========================================
 newton        labsystem2   becket       enabled    TCP SYN; Mid-flow; TCP SYN Jumbo;
                            becket       enabled    TCP SYN; TCP SYN Jumbo;
                            burlington   enabled    TCP SYN; Mid-flow; TCP SYN Jumbo;
```

## show user

#### Syntax

```
show user [<username>]
```
##### Positional Arguments
- **username** The name of the account to display (default: &lt;current user&gt;)

##### See Also
- [create user](#create-user)
- [delete user](#delete-user)
- [edit prompt](#edit-prompt)
- [edit user](#edit-user)
- [restore prompt](#restore-prompt)
- [restore users factory-default](#restore-users-factory-default)
- [set password](#set-password)

#### Description

The _show user_ subcommand displays the attributes for the specified user account (i.e., whether the account is enabled, the user&#39;s full name, and their role).

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

#### Privileges Required

Available to _admin_ only.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |
| 4.4.0   | LDAP status was added to `show user all` |

## sync

#### Syntax

```
sync peer addresses [force] [router <router>]
```

##### Keyword Arguments
- **force**   Skip confirmation prompt
- **router**  The name of the router to synchronize

##### See Also
- [show dynamic-peer-update](#show-dynamic-peer-update)
- [show stats dynamic-peer-update](#show-stats-dynamic-peer-update)

#### Description

This command will force a network element (or group of network elements) to synchronize any dynamically-learned IP addresses to its conductor. (The conductor will redistribute these dynamic addresses to other members of the Authority as necessary.)

```
admin@cnd1.conductor# sync peer addresses
Fri 2018-02-09 09:46:44 EST
Successfully synchronized dynamic peer addresses

Completed in 0.06 seconds
```

#### Privileges Required

Available to _admin_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 3.2.0   | This feature was introduced |

## time

#### Syntax

```
time <command> [<command> ...]
```

##### Positional Arguments
- **command** command to run and time

#### Description

When `time` preceeds another command, it will provide the total amount of wall clock time it takes for the operation to complete. Natively not all PCLI commands output the duration it takes to complete the operation.  The time command, much like the Linux version, provides this information.

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

#### Syntax

```
top
```

#### Description

This command sets the focus of the PCLI prompt to the top level of the PCLI&#39;s hierarchy. It is used while in configuration mode to "jump" up out and back to the baseline prompt. It is only available within configuration mode.

```
admin@labsystem1.fiedler# config authority router burlington
admin@labsystem1.fiedler (router[name=burlington])# node combo1
admin@labsystem1.fiedler (node[name=combo1])# where
config authority router burlington node combo1
admin@labsystem1.fiedler (node[name=combo1])# top
admin@labsystem1.fiedler# where
admin@labsystem1.fiedler#
```

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |


## up

#### Syntax

```
up [<levels>]
```

#### Description

This command moves the administrative focus of the PCLI "up" the specified number of levels. When the optional &lt;levels&gt; argument is left off, it moves the focus up one level.

This command is only available while in configuration mode.

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

## validate

#### Syntax

```
validate [router <router>]
```

##### Keyword Arguments
- **router** The name of the router on which to execute the validate operation (default: all)

#### Description

This command validates the current candidate configuration to check for referential integrity among the various configuration objects, to check for the use of deprecated configuration elements, and to supply warnings when various configuration elements cannot be validated.

Many configuration elements within the 128T router refer to other configuration elements by their _name_. If an administrator mistypes a name, or a referenced object is deleted without updating the source of that reference, this candidate configuration is said to be invalid. By using the validate command, administrators can ensure their configuration is valid prior to committing it to be the running configuration.

:::note
validation occurs automatically whenever the commit command is run; this standalone command allows administrators to check for validity without requiring that the configuration is committed immediately.
:::

The `validate` command provides warnings when a configuration contains deprecated elements – elements that are scheduled for removal in a future release of the 128T software. This is to give administrators the opportunity to replace the impacted configuration stanzas with their replacement.

The `validate` command will also provide warnings when a configuration cannot be validated and requires administrative oversight.

When validation fails, the administrator is notified via output to the CLI. The output from the `validate` command will identify the configuration that is failing validation:

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

#### Privileges Required

Available to _admin_ and _user_.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## where

#### Syntax

```
where
```

#### Description

This command returns the user&#39;s current position within the CLI hierarchy. When executed from the main CLI prompt, it returns nothing. When executed from within the configuration tree, it returns the user&#39;s current position within the tree.

```
admin@labsystem1.fiedler# where
admin@labsystem1.fiedler# conf auth router newton
admin@labsystem1.fiedler (router[name=newton])# where
configure authority router newton
admin@labsystem1.fiedler (router[name=newton])#
```

#### Privileges Required

Available to _admin_ only; _where_ is only available within configuration mode.

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 1.0.0   | This feature was introduced |

## write log message

#### Syntax

```
write log message [force] [router <router>] [node <node>] <message> [<process-name>]
```

##### Keyword Arguments
- **force** Skip confirmation prompt
- **node**  The node on which to log
- **router** The router on which to log

##### Positional Arguments
- **message** The message to write to the log (messages with a space must be surrounded with quotes)
- **process-name** The process to which to write a log message (the message will write to all process logs when no process is specified) (default: all)

#### Description

The `write log message` command lets administrators write messages into log files; this is typically used as a marker during troubleshooting exercises, to insert a string that can later be located to reference the onset of a test.

Note that `<message>` is a quoted string, as in the following example:

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

#### Privileges Required

Available to _admin_ only.

##### See Also
- [rotate log](#rotate)
- [set log level](#set-log-level)
- [write log snapshot](#write-log-snapshot)

#### Version History

| Release | Modification                |
| ------- | ----------------------------|
| 2.0.0   | This feature was introduced |

## write log snapshot

#### Syntax
```
write log snapshot [category <category>] [force] [router <router>] [node <node>] [<process-name>]
```

##### Keyword Arguments
- **category**  The log category for which to write the snapshot. Default is all categories.
- **force**     Skip confirmation prompt
- **node**      The node on which to log
- **router**    The router on which to log

##### Positional Arguments
- **process-name**  The process to write a snapshot (all processes will write a snapshot when no process is specified) (default: all)

#### Description
The `write log snapshot` command is debugging tool that outputs zookeeper state information related information to each respective process that utilizes zookeeper.

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
##### See Also
- [rotate log](#rotate)
- [set log level](#set-log-level)
- [write log message](#write-log-message)