---
title: Configuring Banners
sidebar_label: Configuring Banners
---

Administrators can configure a login banner message to identify a Common Criteria compliant instance using the `configure authority web-messages` command or using the GUI.

## Using the GUI

![Configure Web Messages](/img/config_web_message.png)

![Command line messages](/img/conf_cli_message.png)

## Using the Command Line

### `configure authority cli-messages`

Configure CLI Messages

##### Subcommands

| command | description |
| ------- | ----------- |
| `delete` | Delete configuration data |
| [`login-message`](#configure-authority-cli-messages-login-message) | The message displayed before login through console. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| `show` | Show configuration data for &#x27;cli-messages&#x27; |
| [`welcome-message`](#configure-authority-cli-messages-welcome-message) | The message displayed after a successful login through console. |

### `configure authority cli-messages login-message`

The message displayed before login through console.

#### Usage

```
configure authority cli-messages login-message [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

#### Description

##### string

A text value.

### `configure authority cli-messages welcome-message`

The message displayed after a successful login through console.

#### Usage

```
configure authority cli-messages welcome-message [<string>]
```

##### Positional Arguments

| name | description |
| ---- | ----------- |
| string | The value to set for this field |

#### Description

##### string

A text value.

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


