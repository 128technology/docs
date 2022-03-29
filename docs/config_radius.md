---
title: Radius Authentication
sidebar_label: Radius Authentication
---

| Release | Modification |
| ------- | ------------ |
| 5.6.0   | Feature introduced |

## Overview

Radius authentication provides remote authentication for users and provides a third type of user authentication available with the SSR: Local, LDAP, and Radius.

With the release of version 5.6, the SSR will authenticate all user logins using Radius first. If remote authentication fails, then local authentication will be attempted.

## Configure the Radius Server

To configure radius authentication, provide the following information in the configuration of the authority:
```
  radius-server  myradius
      name     myradius
      address  172.18.2.183
      port     8120
      secret   (removed) <--- testing123
      timeout  10
    exit
```

## Configure Radius Users

Radius authentication is locally administered and remotely authenticated.

```
admin@conductor-node-1.Conductor# create user
Username: test
Full Name: Test
Authentication Type (remote or local): remote
Roles (space separated): admin
Enabled (true or false): true
Account 'test' successfully created
admin@conductor-node-1.Conductor#
```

## User Authentication

### Local users  

A user that is locally administered and locally authenticated.

The [`create user`](cli_reference.md#create-user) command allows administrators to create user accounts for user and/or administrative access to the SSR router's management port. Issuing the `create user <username>` prompts for the new user's full name, password, whether they are an administrative or basic user, and the enabled/disabled state of that user account.

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

:::note
Password requirements have been updated in version 5.6. Please refer to [**Password Policies**](config_password_policies.md) for more information. 
:::

### LDAP users 

LDAP users are remotely administered and remotely authenticated, similar to Radius authentication. For information about configuring LDAP users, please refer to [LDAP User Account Requirements.](config_ldap.md#ldap-user-account-requirements)

<!--- Need additional information about this statement:
	LDAP users will not be allowed to configure via PCLI or GUI. Inspector rule will be added to stop this combination to be configured. Access manager code will be updated to set user-administration as remote-administered and authentication-type as remote in the config file. No changed to /etc/passwd and /etc/shadow system files. ---> 


