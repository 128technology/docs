---
title: Installer Command Line Reference
sidebar_label: Installer Command Line Reference
---

This is a reference document for the 128T Installer command line interface.
To get started installing 128T with the Installer, see the
[Manual Installation Guide](intro_installation_installer.md).

## Running the Installer

To start the Installer, run the `install128t` command.

:::note

`install128t` must always be run as the root user, or with `sudo install128t`.
The Installer will detect non-root usage and exit with this message:

```txt
You must run the Installer as root.
```

:::note

To avoid SSH session timeout during installation, it is strongly recommended to use the Screen utility when performing an installation, upgrade or rollback.
:::

:::

Use the `-h`/`--help` flag to display help information for the `install128t`
command line:

```sh
install128t --help
```

The `--version` flag or the `rpm` command may be used to determine the Installer
version:

```sh
$ install128t --version
128T Installer 3.0.0

$ rpm -q 128T-installer
128T-installer-3.0.0-1.x86_64
```

When the Installer is used to install 128T for the first time, it will automatically
run the 128T Initializer to complete setup of 128T, unless the
[`--install-only` option](#options) is specified. See the
[Initializer documentation](initializer_cli_reference.md)
for the relevant version of 128T for details on its usage and options.

After a successful run, the `install128t` process will exit with a return code
of 0. If any error was encountered during the operation, the return code will
be non-zero.

### Interactive Mode

Without any arguments, the Installer will open a wizard interface to install
128T.

```sh
install128t
```

Follow the on-screen prompts to complete the installation and initialization process.
Step-by-step instructions for the Installer wizard can be found in the
[Installation Guide](intro_installation_installer.md#install-using-128t-installer).

### Automated Mode

For more advanced use cases, preferences may be specified on the command line
to perform an operation in an automated fashion, using the `-p`/`--preferences`
option.

In this mode, no wizard will be displayed, but informational messages will be
printed to the console as the Installer is running.

```sh
$ cat /tmp/preferences.json
{
  "install": {
    "initialize": {
      "node-name": "MyNode",
      "node-ip": "127.0.0.1",
      "node-role": "combo",
      "router-name": "MyRouter"
    }
  }
}

$ install128t --preferences /tmp/preferences.json
```

:::tip Did you know?

You can specify a preferences file with `-p`, but you can _also_ pass the
preferences directly on the command line. For example:

```sh
install128t -p '{"download": {"128T-version": "4.5.7"}}'
```

:::

The specified preferences **must** be valid JSON (trailing commas are not allowed),
and they must conform to the Installer preferences file schema.
See the [full schema documentation](installer_preferences.md) for details.

### Install from RPM

To install or upgrade 128T directly from RPM files, use the `--rpm-path` option
to specify a directory in which the RPM files are located.

In order to use this option, both a 128T RPM and the corresponding version of the
128T manifest RPM must be in the specified directory, as shown here:

```sh
$ ls /tmp/local-install/
128T-4.5.7-1.el7.x86_64.rpm
128T-manifest-4.5.7.1.el7-1.x86_64.rpm

$ install128t --rpm-path /tmp/local-install/
```

The Installer will ask for confirmation before proceeding with the operation.

:::warning

If the specified RPM is not an upgrade to the currently installed 128T version,
this option will **erase and reinstall** 128T! Pay attention to the confirmation
prompt to ensure an upgrade will be performed (`Confirm Upgrade`) rather than
a reinstallation (`Confirm Install`).

:::

### Options

<!-- markdownlint-disable line-length -->
| Option | Description |
|--------|-------------|
| `-d`, `--dry-run` | Skip all steps that modify the system, e.g. downloading software or rebooting the system. This can be useful to validate a preference file without executing the operation specified in it. |
| `-l LOG_LEVEL`, `--log-level LOG_LEVEL` | Change the log level the Installer runs with. Must be one of `ERROR`, `INFO`, `WARNING`, `DEBUG`. |
| `--install-only` | If specified, the Installer will not run the Initializer when it completes a successful installation. **NOTE**: Use this option with care; 128T will be unable to start until it has been initialized. See the [Initializer documentation](initializer_cli_reference.md) for details on how to use it to manually initialize 128T. |
<!-- markdownlint-enable line-length -->

<!-- Deprecated options not documented:
    --web-port
    --web-certificate
-->

## Subcommands

Besides using a preference file, `install128t` may also be used to perform other
tasks directly from the command line, without using the interactive wizard interface.

:::tip

Any subcommand may be passed the `-h`/`--help` flag to show its usage information
and available options:

```sh
install128t download --help
```

:::

### `download`

Download 128T software and save it to the local repository.
After download, the software will be available for future installation and upgrades.

```sh
install128t download
```

The `--128T-version` option is used to specify a version to download:

```sh
install128t download --128T-version 4.5.7
```

:::tip

Version requirements of the same format as the preference file may be used for
this option:

```sh
install128t download --128T-version ">= 4.5.1"
```

:::

If no version is specified, the latest available version will be downloaded.

### `import`

The `import` subcommand is used to save software from other locations to the
local repository, after which it will be available for future installation and
upgrades.

#### Automatically find and import ISO

With this option, the Installer will attempt to search the local filesystem for
a 128T ISO file, mount it, and save the contents to the local repository.

```sh
install128t import --iso-hunt
```

#### Specify an ISO path

With this option, the Installer will attempt to mount and import packages from
the ISO file specified.

```sh
install128t import --iso-path /root/128T-4.5.1-1.el7.v1.x86_64.iso
```

<!-- TODO: IN-322 reword once restriction is removed

#### Specify a package directory

With this option, the Installer will import all packages from the specified directory.
The directory must include a 128T RPM to be considered valid for importing.

```sh
install128t import --packages-path /tmp/packages
```

-->

### `repo`

The `repo` subcommand is used to enable or disable 128T software repositories
used for downloading 128T. Advanced users can use this subcommand to enable
pre-release software or update software access credentials.

:::tip

`install128t repo` has several subcommands of its own, each of which may be passed
the `-h`/`--help` option to display usage and options, like other subcommands.

:::

#### List Repositories

The `repo list` subcommand shows the configured 128T software repositories. The `-a`/`--all`
option may be be used to show disabled repositories as well as enabled repositories.

```sh
install128t repo list
```

#### Enable Repositories

The `repo enable` subcommand is used to enable 128T software repositories.
Multiple repositories may be specified to enable each of them. The name specified
to this command should match the name in the `Repository` column of the
`install128t repo list` command output.

```sh
install128t repo enable alpha beta
```

#### Disable Repositories

The `repo disable` subcommand is used to disable 128T software repositories.

Usage matches the `repo enable` command.

```sh
install128t repo disable alpha beta
```

#### Update Repository Authentication

The `repo authenticate` subcommand is used to configure credentials for
authenticating with 128T software repositories. To use this subcommand, you
must specify both a username and a token for authentication.

```sh
install128t repo authenticate --username my_user --token 'example$token'
```

:::caution

If your authentication token contains special characters, the shell may expand
or interpret them. Enclose the token in single quotes (`'`) to prevent shell
expansion.

:::

If the specified credentials are found to be invalid, the Installer will display
an error message and exit, and the credentials will not be saved. To verify credential status, use the `install128t repo list` command. 

:::note
If the credentials cannot be checked (e.g. no Internet connection is available), the remote packages will appear unavailable (no upgrades available) but the credentials will still be saved. They will be checked again, if possible, the next time the Installer is run. 
:::

## Uninstalling 128T

:::warning

This command stops and uninstalls 128T. It will also remove 128T data files,
including configuration, logs, and more. Use with caution!

:::

The `erase128t` can be used to uninstall 128T. It is packaged with the Installer,
but it is _not_ a subcommand of the `install128t` command.

```sh
erase128t
```

Use `-h`/`--help` to see all available options.

<!-- markdownlint-disable line-length -->
| Option | Description |
|--------|-------------|
| `-y`, `--assume-yes` | Skip confirmation prompts and run as if the answer was "yes". |
| `-c`, `--cleanup-only` | Do not uninstall 128T, but still delete associated data such as configuration. |
| `-l`, `--keep-logs` | Do not remove 128T log files. |
<!-- markdownlint-enable line-length -->
