---
title: Authentication Methods
sidebar_label: Authentication Methods
---

| Release | Modification |
| ------- | ------------ |
| 5.6.0   | Feature introduced |
| 6.2.4   | Enabled automatic account creation for authorized RADIUS users |

## Overview

With the release of version 5.6, both RADIUS and LDAP remote authentication can be configured on a system. RADIUS will take precedence over LDAP, and is the first authorization request sent out. If RADIUS authentication is rejected or if the RADIUS Server is not available, then LDAP authorization is requested.

It is also possible to configure only RADIUS authentication.

## Configuring RADIUS Users

RADIUS account creation can now be done automatically, based on data from the RADIUS server. You no longer have to manually `create-user`; instead the `automatic` option is set on the RADIUS server, and the account is created automatically the first time a new user logs into the system. This allows remote users that exist only in RADIUS to connect to the device without needing a local account. In large network deployments, multiple SSRs are often dispersed over a geographic area, but connected to a single authentication server. This provides a simple method of managing the user accounts.

### How It Works

The automatic account creation is an option within the SSR configuration, `config authority radius-server <name> account-creation <[ manual | automatic ]>`. Configuring `automatic` enables remote users that exist only in RADIUS to connect to the device without needing a local account. The first successful login to the SSR triggers the account creation, and then requires the user to login a second time to complete the process. 

```
[root@t128-dut1 centos]# ssh j1@localhost
j1@localhost's password:
Last login: Fri Feb 23 16:52:46 2024 from ::1
+---------------------------------------+
|                                       |
|    Welcome to:                        |
|                                       |
|     | .   . ,---. . ,---. ,---. ,--.  |
|     | |   | |   | | |---' |---' |     |
|     | `---' '   ' ' '     `---' '     |
|  ---'                                 |
|        __ ___       __   __       __  |
|  |\ | |_   |  |  | /  \ |__) |_/ (_   |
|  | \| |__  |  |/\| \__/ | \  | \ __)  |
|                                       |
| Session Smart Networking Platform ... |
+---------------------------------------+
Creating User Account...
Account created. Please log in again.
Connection to localhost closed.
[root@t128-dut1 centos]# ssh j1@localhost
j1@localhost's password:
Last login: Wed Mar  6 15:52:18 2024 from ::1
+---------------------------------------+
|                                       |
|    Welcome to:                        |
|                                       |
|     | .   . ,---. . ,---. ,---. ,--.  |
|     | |   | |   | | |---' |---' |     |
|     | `---' '   ' ' '     `---' '     |
|  ---'                                 |
|        __ ___       __   __       __  |
|  |\ | |_   |  |  | /  \ |__) |_/ (_   |
|  | \| |__  |  |/\| \__/ | \  | \ __)  |
|                                       |
| Session Smart Networking Platform ... |
+---------------------------------------+
j1@conductor-node-1.Conductor#
j1@conductor-node-1.Conductor# show user
Wed 2024-03-06 15:52:41 UTC
✔ Retrieving user data...

====================================================
 Information for j1:
====================================================
  Full Name:               (not set)
  Roles:                   admin
  Administration Type:     remote
  Authentication Type:     remote
  Features:                configure, show-commands
  Enabled:                 true
  Resource Groups:         (not set)
  Pending Config Changes:  false
  Lock Status:             N/A
  Last Failed Login:       N/A

LDAP server is disabled but an entry exists for them in the user datastore.

Completed in 0.44 seconds
j1@conductor-node-1.Conductor# shell
[j1@t128-dut1 ~]$ pwd
/home/j1

```

Additionally, RADIUS has the concept of a Vendor Specific Attribute (VSA). This allows the administrator to configure their RADIUS server to include that VSA. The VSA is then configured with a group of the form `128t-<role>`; for example, `128t-admin` or `128t-user`. When a user logs in they are assigned a new user account with that privilege level.

#### Manual User Configuration

The manual operation is still available by default, and requires the previous configuration process where `create user` must be run with `authentication-type` set to `remote`. 

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

## Configure the RADIUS Server

To configure RADIUS authentication, provide the following information in the configuration of the authority:
```
  radius-server  myradius
      name     myradius
      address  172.18.2.183
      port     8120
      secret   (removed) <--- testing123
      timeout  10
    exit
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
Password requirements are available in [**Password Policies**](config_password_policies.md). 
:::





