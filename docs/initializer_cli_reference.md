---
title: Initializer Command Line Reference
sidebar_label: Initializer Command Line Reference
---

This is a reference document for the 128T Initializer command line interface.
For a guide to basic usage, see the initialization section of the
[Manual Installation Guide](intro_installation_installer.md#initialize-the-128t-node).

## Running the Initializer

To start the Initializer, run the `initialize128t` command.

:::note

`initialize128t` must always be run as the root user, or with `sudo initialize128t`.
The Initializer will detect non-root usage and exit with this message:

```txt
You must run the Initializer as root.
```

:::

Use the `-h`/`--help` flag to display help information for the `initialize128t`
command line:

```sh
initialize128t --help
```

After a successful run, the `initialize128t` process will exit with a return code
of 0. If any error was encountered during the operation, the return code will
be non-zero.

:::note

128T must not be running during initialization. The Initializer will
detect when 128T is running and exit with this message:

```txt
128T is running; cannot launch Initializer
```

To stop 128T, follow the steps shown in the
[Installation Guide](intro_installation.md#stopping-the-128t-routing-software).

:::

### Interactive Mode

Without any arguments, the Initializer will open a wizard interface to initialize
128T.

```sh
initialize128t
```

Follow the on-screen prompts to complete the initialization process. Step-by-step
instructions for the Initializer wizard can be found in the
[Installation Guide](intro_installation_installer.md#initialize-the-128t-node).

### Automated Mode

For more advanced use cases, preferences may be specified on the command line
to perform initialization in an automated fashion, using the `-p`/`--preferences`
option.

In this mode, no wizard will be displayed, but informational messages will be
printed to the console as the Initializer is running.

```sh
$ cat /tmp/preferences.json
{
  "node-name": "MyNode",
  "node-ip": "127.0.0.1",
  "node-role": "combo",
  "router-name": "MyRouter"
}

$ initialize128t --preferences /tmp/preferences.json
```

:::tip Did you know?

You can specify a preferences file with `-p`, but you can _also_ pass the
preferences directly on the command line. For example:

```sh
initialize128t -p \
    '{"node-name": "MyNode", "node-role": "combo", "router-name": "MyRouter"}'
```

:::

The specified preferences **must** be valid JSON (trailing commas are not allowed),
and they **must** conform to the Initializer preferences file schema.
See the [full schema documentation](initializer_preferences.md) for details.

## Options

<!-- markdownlint-disable line-length -->
| Option | Description |
|--------|-------------|
| `-d`, `--dry-run` | Skip all steps that modify the system, e.g. downloading software or rebooting the system. This can be useful to validate a preference file without executing the operation specified in it.|
| `-l LOG_LEVEL`, `--log-level LOG_LEVEL` | Change the log level the Installer runs with. Must be one of `ERROR`, `INFO`, `WARNING`, `DEBUG`. |
<!-- markdownlint-enable line-length -->
