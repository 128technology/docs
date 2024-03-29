---
title: Authentication Methods
sidebar_label: Authentication Methods
---

| Release | Modification |
| ------- | ------------ |
| 5.6.0   | Feature introduced |
| 6.2.4   | Enabled automatic account creation for authorized RADIUS users |

## Overview

RADIUS and LDAP remote authentication can be configured on a system. RADIUS will take precedence over LDAP, and is the first authorization request sent out. If RADIUS authentication is rejected or if the RADIUS Server is not available, then LDAP authorization is requested.

It is also possible to configure only RADIUS authentication.

## Configuring RADIUS 

When authenticating from a RADIUS server, user authentication and local access is now configurable from the RADIUS server. Users are added and identified on the server, and each user account is created automatically when they login to a local device. This provides a simple method for managing user accounts connected to a single authentication server, with devices deployed over a wide geography. 

Users are configured on the RADIUS server using the RADIUS Vendor Specific Attribute (VSA). Automatic account creation is enabled on the SSR, and user accounts are created on first login to the SSR.   

### Configure the RADIUS Server

Using the RADIUS Vendor Specific Attribute (VSA) allows the administrator to identify users and assign them to a user role. The VSA Vendor ID indicates a Juniper system; the Juniper vendor ID is 2636. Each user is configured with a group in the form `128t-<role>`; for example, `128t-admin` or `128t-user`. When a user logs in they are assigned a new user account with that privilege level.

1. On the RADIUS server, identify Juniper as the Vendor.

  `Vendor 2636, type 1, string`

2. Configure the users (Kevan and Paul), and identify their role (admin and user). This example is using FreeRadius.
  
  ```
  Kevan    Cleartext-Password := test123
                Reply-Message = "Hello, %{User-Name}",
                Juniper-Local-User-Name = "128t-admin"

  Paul    Cleartext-Password := test123
                Reply-Message = "Hello, %{User-Name}",
                Juniper-Local-User-Name = "128t-user"               
  ```

### Enable RADIUS Account Creation on the SSR

Automatic account creation is an option within the SSR configuration, based on data configured on the RADIUS server. Using the command `config authority radius-server <name> account-creation <[ manual | automatic ]>` and setting `automatic` enables users that exist in RADIUS to log in to the SSR. 

```
config
  authority
      radius-server  myradius
          name     myradius
          address  172.18.2.183
          port     8120
          secret   (removed) <--- testing123
          account-creation  automatic
          timeout  10
      exit
  exit
exit
```

The first successful login to the SSR triggers the account creation, and then requires the user to login a second time to complete the process. 

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

```

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
