---
title: Configuring Banners
sidebar_label: Configuring Banners
---

Administrators can configure a login banner message to identify a Common Criteria compliant instance using the configure authority web-messages command shown here. For additional information, please see [configure authority web-messages](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/config_command_guide#configure-authority-web-messages) command.

### `configure authority web-messages`

Configure Web Messages

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`login-message`](#configure-authority-web-messages-login-message) | The message displayed on the login screen. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;web-messages&#x27; |
| [`welcome-message`](#configure-authority-web-messages-welcome-message) | The message displayed after a successful login. |

### `configure authority web-messages login-message`

The message displayed on the login screen.

#### Usage

```
configure authority web-messages login-message [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

### `configure authority web-messages welcome-message`

The message displayed after a successful login.

#### Usage

```
configure authority web-messages welcome-message [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |