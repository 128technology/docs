---
title: 'About the Programmable Command Line Interface (PCLI)'
sidebar_label: 'About the PCLI'
---

The Programmable Command Line Interface (PCLI) is one of the two primary human interfaces for the SSR; this document uses the terms PCLI and CLI interchangeably. This document describes how to use the PCLI commands supported by the SSR. 

Note that all of the examples in this document are run as the _admin_ role (as denoted by the prompt in this and other examples); however, each command also indicates which user roles – either _user_ or _admin_ at the time of this writing – are eligible to run the command based upon that command's privileges. Note that unprivileged _user_ accounts are not only unable to execute these commands, they do not "see" them in the PCLI as part of the help text, etc.

Optional arguments are written in brackets (`[` `]`), and users may include or omit them as needed. Variable arguments (where users need to supply a value, rather than entering in the literal string shown in the syntax) are written in angle brackets (`<` `>`).

```
show stats packet-processing action failure [core <core>]
```

In this example, a user may include core information[^1]. If including core, the user must supply the literal string "core" and a value for the core, such as "0".

[^1]: forwarding plan metrics are stored uniquely per worker `forwarding-core-count`.

Braces, brackets, and pipes are often combined and nested to describe the complete grammar of the command line syntax for any given command.

## The PCLI Prompt

The PCLI will indicate when there are uncommitted configuration changes via a change to the prompt. When uncommitted changes exist, the prompt is prefixed with an asterisk ("\*"):

```
*admin@labsystem1.fiedler#
*admin@labsystem1.fiedler# validate
Candidate configuration is valid
*admin@labsystem1.fiedler# commit
Are you sure you want to commit the candidate config? [y/N]: y
Configuration committed
admin@labsystem1.fiedler#
```

## Shortcuts

### `<ctrl>+z` 

This command is the equivalent to the following two actions:

1. `<enter>`: Execute what is currently on the prompt line (if any).
2. `top<enter>`: Exit the current menu and go to the root of the PCLI tree.

When the buffer is empty:

```
admin@node1.router1# configure authority router router1 <enter>
admin@node1.router1 (router[name=router1])# <ctrl-z>
admin@node1.router1#
```

With a valid command:

```
admin@node1.router1# configure authority router router1 <enter>
admin@node1.router1 (router[name=Fabric128])# validate <ctrl-z>
✔ Validating...
Candidate configuration is valid
admin@node1.router1#
```

With an invalid command:

```
admin@node1.router1 (router[name=router1])# bad <ctrl-z>
Command 'bad' not found (use '?' for help)
admin@node1.router1#
```

### `!` (run previous command)

`!` can be used to execute a previously executed command from the PCLI's history.
:::note
PCLI history can be seen by running `show history`.
:::

The `!` command offers three options:

1. `!!`: Re-run the last command.
2. `!<number>`: Re-run a specific command from the PCLI history. Negative numbers are supported to perform a reverse search of the history (i.e., `!-1` = `!!`).
3. `!<string>`: Re-run the most recent substring match from the PCLI history (reverse search of history).

## Features

### Paste Config

When working across multiple systems, it is convenient to copy snippets of one configuration and paste them directly into another SSR configuration. The PCLI detects configuration entered in bulk and accepts input in either `show config` native format or flat format. Invalid configuration is handled as if it were entered line by line.

An example of copying a service from one system and pasting it to another is shown below.

```
admin@tp-colo-primary.tp-colo# show config running authority service internet_service

config

    authority

        service  internet_service
            name                  internet_service
            enabled               true
            scope                 private
            security              no_encryption
            address               0.0.0.0/0

            access-policy         _internal_
                source      _internal_
                permission  allow
            exit

            access-policy         t128
                source      t128
                permission  allow
            exit
            service-policy        data-best-effort
            share-service-routes  true
        exit
    exit
exit

...

admin@tp-colo-secondary.tp-colo# config
(config)> authority
(authority)> service internet_service
(service)> name internet_service
(service)> enabled true
(service)> scope private
(service)> security no_encryption
(service)> address 0.0.0.0/0
(service)> access-policy linux
(access-policy)> source linux
(access-policy)> permission allow
(access-policy)> exit
(service)> access-policy t128
(access-policy)> source t128
(access-policy)> permission allow
(access-policy)> exit
(service)> service-policy data-best-effort
(service)> share-service-routes true
(service)> exit
(authority)> exit
(config)> exit
```
