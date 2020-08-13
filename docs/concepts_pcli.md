---
title: 'Programmable Command Line Interface (PCLI)'
sidebar_label: 'PCLI'
---

## About the PCLI

The PCLI (an acronym for _Programmable Command Line Interface_) is one of the two primary human interfaces on the 128T router; this document will use the terms PCLI and CLI interchangeably. This document describes the set of PCLI commands supported by the 128T router. Each command listed below will show all mandatory and optional arguments, representative output from the PCLI where applicable, and version history.

Note that all of the examples in this document will be run as the _admin_ role (as denoted by the prompt in this and other examples); however, each command will also indicate which user roles – either _user_ or _admin_ at the time of this writing – are eligible to run the command based upon that command&#39;s privileges. Note that unprivileged _user_ accounts will not only be unable to execute these commands, they will not "see" them in the PCLI as part of the help text, etc.

Optional arguments are written in brackets (`[` `]`), and users may include or omit them as needed. Variable arguments (where users need to supply a value, rather than entering in the literal string shown in the syntax) are written in angle brackets (`<` `>`).

```
show stats packet-processing action failure [core <core>]
```

In this example, a user may include core information[^1]. If including core, the user must supply the literal string "core" and a value for the core, such as "0".

[^1]: forwarding plan metrics are stored uniquely per worker `forwarding-core-count`.

Braces, brackets, and pipes are often combined and nested to describe the complete grammar of the command line syntax for any given command.

## The PCLI Prompt

The PCLI will indicate that there are uncommitted configuration changes via a change to the prompt. When uncommitted changes exist, the prompt is prefixed with an asterisk ("\*"):

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

### &lt;ctrl&gt;+z

Cisco CLI implements `<ctrl>+z`, which is a shortcut for `enter` + `top`

`<ctrl>+z` on the 128T is an improvement over Cisco's CLI and is the equivalent to the following two actions:

1. `<enter>` execute whatever is currently on the prompt line (if any)
2. `top<enter>` exit the current menu and go to the root of the PCLI tree

When the buffer is empty:

```
admin@node1.router1# configure authority router router1 <enter>
admin@node1.router1 (router[name=router1])# <ctrl-z>
admin@node1.router1#
```

With a valid command

```
admin@node1.router1# configure authority router router1 <enter>
admin@node1.router1 (router[name=Fabric128])# validate <ctrl-z>
✔ Validating...
Candidate configuration is valid
admin@node1.router1#
```

With an invalid command

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

1. !! to re-run the last command run
2. !&lt;number&gt; to re-run a specific command from the PCLI history. Negative numbers are supported to perform a reverse search of the history. (i.e., `!-1` = `!!`)
3. !&lt;string&gt; to re-run the most recent substring match from the PCLI history (reverse search of history).