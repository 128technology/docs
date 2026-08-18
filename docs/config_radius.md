---
title: Authentication Methods
sidebar_label: Authentication Methods
---

| Release | Modification |
| ------- | ------------ |
| 5.6.0   | Feature introduced |
| 6.2.4   | Enabled automatic account creation for authorized RADIUS users |
| 6.3.0   | RADIUS servers configurable per router |
| 6.1.11  | Require the configuration of `message-authenticator` |

## Overview

Either RADIUS or LDAP remote authentication can be configured on a system. If RADIUS authentication is rejected or if the RADIUS Server is not available, then LDAP authorization is requested.

:::important
Beginning with SSR software **version 7.0** (including **7.1**), FIPS mode is enabled by default and blocks the use of non-FIPS-compliant algorithms such as **MD5**. Because the RADIUS protocol uses MD5 internally to protect the shared secret and per-attribute payloads, RADIUS authentication will not function on a 7.0 or 7.1 node while FIPS is enabled. If you need RADIUS on those releases, disable FIPS on the affected node first — see the procedure on the [conductor install page](single_conductor_install.mdx#fips-enforcement-mode) or in [Troubleshooting IDP](ts_idp.md#fips-mode-and-idp). [RADIUS over TLS (RADSEC)](config_radsec.md) is unaffected and is the recommended option when FIPS must remain enabled. In a future SSR release, FIPS will be compliance-by-configuration and will no longer block these algorithms.
:::

## Configuring RADIUS 

When authenticating from a RADIUS server, the user is authenticated against the configured credentials. When `account-creation` is set to `automatic`, users are added and identified on the server, with each user account created automatically upon successful authentication on a local device. This provides a simple method for managing user accounts connected to a single authentication server with devices deployed over a wide geography.

If automatic account creation is enabled, users are configured on the RADIUS server using a RADIUS Vendor Specific Attribute (VSA) and user accounts are created on first login to the SSR based on the role specified in the VSA.

### Configure the RADIUS Server

Using the RADIUS Vendor Specific Attribute (VSA) allows the administrator to identify users and assign them to a user role. The Juniper RADIUS VSA is `Juniper-local-user-name`, and is `type 1`. This is currently the only Juniper VSA supported by the SSR. The VSA Vendor ID indicates a Juniper system; the Juniper vendor ID is 2636. Each user is configured with a group in the form `128t-<role>`; for example, `128t-admin` or `128t-user`. When a user logs in they are assigned a new user account with that privilege level.

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

#### Message Authenticator

To remain current with network security standards, the use of the `message-authenticator` VSA on `access-accept` and `access-reject` messages is now required. If your radius server is not configured to provide this VSA, RADIUS authentication will not function.

Please refer to your RADIUS server documentation for information on setting the `message-authenticator`. 

In versions 6.1.12, 6.2.8, 6.3.3, and later, an option to bypass the requirement for the Message-Authenticator check in RADIUS requests and responses was added. **Disabling this check is NOT recommended**, but may be necessary for some backwards compatibility scenarios. 

:::important
Disabling this check is considered unsafe and will allow for vulnerabilities to be exploited for user authentication.
:::

The following example illustrates disabling the message-authenticator requirement:
```
configure authority 
    router Fabric128 
    node node-1 
        radius enable-message-authenticator false
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

The first successful login to the SSR triggers the account creation, and after initial account creation the user session is terminated and the user will need to login again. Once a local account has been created on an SSR subsequent logins will function as normal.

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

## Multiple RADIUS Servers

You can configure up to two RADIUS servers at the authority level and up to two at the router level. When servers are configured at both levels, the router-level servers take precedence and are tried first, followed by any authority-level servers.

### Server Selection

The SSR uses a proxy layer (radsecproxy) to manage RADIUS server selection. Selection is **not** round-robin or load-balanced — it follows these rules:

- When all servers are healthy, the **first server in configuration order** handles all requests. The secondary server receives no traffic.
- If the active server becomes unreachable (no response), the proxy marks it as failed after approximately 15 seconds and directs subsequent requests to the next server.
- Server ordering within each scope follows the order in which the servers appear in configuration. Router-scope servers are ordered before authority-scope servers.

### Failover Behavior

:::caution
RADIUS server failover is **best-effort and non-revertive**. It does not provide seamless redundancy for the login in progress. Consider it a manual-recovery aid rather than automatic high availability.
:::

Be aware of the following failover characteristics:

- **Failover does not rescue the current login attempt.** The authentication layer (PAM) times out the request in approximately 3 seconds — before the proxy has determined whether the server is reachable. For interactive SSH, this results in the first one or two password prompts being denied before failover takes effect on a subsequent attempt. Single-attempt authenticators (the web UI, REST API, and automation scripts) experience a hard failure.
- **Failover is non-revertive.** Once traffic moves to a secondary server, it does not automatically return to the primary when the primary recovers. A configuration commit that changes the RADIUS configuration restarts the proxy and resets server selection.
- **A server that replies but denies all users is never failed over.** The proxy considers any valid RADIUS response — including an Access-Reject — as proof the server is healthy. If a server responds but denies every user (for example, due to a stale user database or a misconfigured backend), traffic remains directed at that server indefinitely while the healthy server is never contacted.

### NAS Identity

By default, every SSR node sends the same NAS-IP-Address (`169.254.127.127`) and NAS-Identifier (`sshd`) in Access-Request packets. If your RADIUS server uses these attributes for policy decisions or logging correlation, configure per-node overrides:

```text
configure authority router <router> node <node> radius nas-identifier <string>
configure authority router <router> node <node> radius nas-ip-address <ip>
```

:::note
The `nas-ip-address` setting controls the RADIUS attribute value only — it does not change the source IP address of the RADIUS packet on the wire.
:::

### Design Recommendations

- **Always maintain a local admin account** that does not depend on RADIUS. If all configured RADIUS servers are unreachable or malfunctioning, only a local account can restore access.
- **Keep all configured servers' user databases synchronized.** A backup server that responds but denies users is worse than an unreachable server — it holds selection permanently with no path to recovery other than a service restart.
- **Plan for account lockouts after a RADIUS outage.** Failed authentication attempts during an outage count against the local `faillock` threshold. Once the RADIUS server recovers, previously locked accounts remain locked for the configured `unlock_time`. Include `faillock` reset in your recovery runbook.
- **Use RADSEC when possible.** [RADIUS over TLS](config_radsec.md) provides transport security and is unaffected by FIPS mode restrictions on MD5.

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
