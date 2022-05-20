---
title: Authentication Methods
sidebar_label: Authentication Methods
---

| Release | Modification |
| ------- | ------------ |
| 5.6.0   | Feature introduced |

## Overview

With the release of version 5.6, both Radius and LDAP remote authentication can be configured on a system. Radius will take precedence over LDAP, and is the first authorization request sent out. If Radius authentication is rejected or if the Radius Server is not available, then LDAP authorization is requested.

It is also possible to configure only Radius authentication.

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

## LDAP User Authentication 

LDAP users are remotely administered and remotely authenticated. For information about configuring LDAP users, please refer to [LDAP User Account Requirements.](config_ldap.md#ldap-user-account-requirements)


### Local Users  

Local users are locally administered and locally authenticated.

The [`create user`](cli_reference.md#create-user) command allows administrators to create user accounts for user and administrative access to the SSR router's management port. Issuing the `create user <username>` prompts for the new user's full name, password, whether they are an administrative or basic user, and the enabled/disabled state of that user account.

```
admin@labsystem1.fiedler# create user jdeveloper
Creating account "jdeveloper"...
Full Name: Joe Developer
Authentication Type (remote or local): local
Password: <not echoed to screen>
Confirm: <not echoed to screen>
Role (user | admin) [user]: admin
Enabled: true
Account "jdeveloper" successfully created
```

:::note
Password requirements have been updated in version 5.6. Please refer to [**Password Policies**](config_password_policies.md) for more information. 
:::





