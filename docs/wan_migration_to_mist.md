---
title: Migrating a Router to Mist
sidebar_label: Migrating a Router to Mist
---

This document explains the process of migrating a Conductor-managed router to a Mist-managed environment. 

## Prerequisites

- The conductor and router are running version x.x.x or newer of the Mist WAN Assurance plugin **I see no indication in the docs for the WA Plugin - Yikes!**

- The router was previously onboarded and connected to the Mist cloud using the [ZTP Onboarding to a Conductor workflow](config_wan_assurance.md). 
- For HA routers, each node should have a direct connection to the Mist cloud.
- The router must be online and connected to the cloud for the migration process to be initiated.
- The router is running a cloud-ready, image-based installation of SSR software, such as V6.0.0 or greater. Conductor-managed instances often are package-based installations. For upgrade instructions, please see [Image-Based Installation](intro_installation_image.md).
- The router configuration must be re-created on the Mist cloud.
- The Mist cloud configuration should have the necessary components for establishing a successful cloud connection post migration.
- While still connected to the conductor, the system environment has to be prepared for migration to the Mist cloud.
- For a use case involving in-band management, the Mist config template must allow access to the conductor via SSH. This will ensure connectivity during the migration.

:::warning
- The migration operation will be service impacting.
:::

:::note
- After upgrading to an image based software version, verify that the `mist-agent` is running. Use [Mist Agent Startup](add-link-here) to verify operation. 
:::

## Router Migration

Use the following preparation and configuration steps to complete migration. 

### Device Map Generation

While conductor-managed routers allow the user to configure the device-interface via PCI mapping, Mist management relies on name mapping instead. In order to create a compatible device map, use the following procedure.

**AdD StEPs HeRe**

### Update the Mist Site

The site where the new router will be assigned must be updated to indicate that it will be Mist-managed. 

1. Unassign the device from the previous conductor-managed site.
2. Assign the device to the new site with the Managed by Mist flag set.
3. Make sure the site is associated with the appropriate template.

The following error will appear in the mist-agent logs.

```
Mar 28 05:16:25 t129-dut2.openstacklocal 128T-mist-agent[17634]: ERR unsupported combination of onboarding and management mode: brownfield, cloud-managed

```

### Update init Files for Mist-Management

Care must be taken when modifying the `init` files for Mist-managemnt. Changes to the `init` files impact internal operations of the SSR software. 

1. Create a backup of the init files

```
cp -v /etc/128technology/global.init /etc/128technology/global.init.conductor
cp -v /etc/128technology/local.init /etc/128technology/local.init.conductor
```

2. Remove the conductor from the global.init. 

**HoW iS tHiS dOnE? ThErE aRe No StEpS.**

An example of the changed init file:

```
{
    "init": {
        "routerName": "t129-dut1",
        "control": {
            "node1": {
                "host": "127.0.0.1"
            }
        },
        "conductor": {}
    }
}
``` 

3. Disable and stop `salt-minion` on the router. 

```
systemctl disable salt-minion
systemctl stop salt-minion
```

4. Verify that the reverse SSH service is enabled and still running.

```
systemctl status reverse-ssh_conductor1_login
systemctl is-enabled reverse-ssh_conductor1_login
```

:::important
Make sure to keep the `salt-minion` disabled. If `salt` connects to conductor, it will attempt to re-initialize the router as conductor-managed.
:::

### Migrate the Site to Mist-Managed

This involves converting the router to whitebox mode, restarting the Mist-agent, and restarting the router. 

1. Convert the system from Brownfield to Whitebox mode. 
 - Use the `show-mist` to display the Mist configuration of the router.
 - Copy the router registration code, name, and type.
 - Create a file at `/etc/128T-hardware-bootstrapper/config.json` and paste in the information you just copied from the show mist command. 
 - Set the `type` to `whitebox`. The result should look like this:

```
{
    "registration_code": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmdfaWQiOiIwNDhkODhjMS0wZWEyLTQyYWEtYjk3Ni1mYzI1Y2ZjYjdlN2MiLCJzdmMiOiIxMjhyb3V0ZXIiLCJwcm92aWRlciI6ImF3cyIsImVudiI6InN0YWdpbmciLCJlcHRlcm1fdXJsIjoid3NzOi8vZXAtdGVybWluYXRvci1zdGFnaW5nLm1pc3RzeXMubmV0L3dzIiwiaWF0IjoxNjc5OTc1MjY3LCJleHAiOjE3MTE1MTEyNjd9.NmuH8kbRcYPvExlMxxklKSN-6xqMsxvyKlqEHHxfeeo",
    "router_name": "t129-dut2",
    "type": "whitebox"
}
```

2. Restart the `128T-mist-agent`. The following error appears in the `mist-agent` logs
 ```
 Mar 28 05:45:29 t129-dut2.openstacklocal 128T-mist-agent[17634]: ERR unsupported combination of onboarding and management mode: brownfield, cloud-managed
 ```
3. Run `systemctl restart 128T-mist-agent` to re-load the agent in the correct mode for this operation.

 ```
 systemctl enable 128T-mist-agent
 systemctl restart 128T-mist-agent
 ```

:::important
The process to download the first intent config will reinitialize the SSR to be Mist-managed. This requires a 128T restart and may take some time. Be patient!
:::

## Verifying the Migration

To veriy the successful migration, SSH to the router via the conductor. Check the following locations for a successful operation.

- The `/etc/128technology/local.init` indicates a `managementMode` of `mistCloud.`

- Use `show mist` to check the status of the onboarding process. 
 - Verify the router is assigned and up.
 - Verify the following output matches the settings entered earlier.

```
admin@node0.020001fe8cf7# show mist detail | grep onboarding
✔ Piping output...
     onboarding-mode:                          whitebox
admin@node0.020001fe8cf7# show mist detail | grep manage
✔ Piping output...
     management-mode:                          cloud-managed
admin@node0.020001fe8cf7#
```
If these checks are all verified, the router is now Mist-managed, and ready for traffic validation!

### Other Notes
- Once the router becomes MIST managed, `salt` stops and there is no connectivity to the conductor.
- The `reverse-ssh_conductor1_login.service` was running during the migration, which allows you to reverse ssh from the conductor.
- The `show mist` command does not work from the conductor.

```
admin@node1.conductor-t129# show mist router t129-dut1 detail
Tue 2023-03-28 04:42:13 UTC
⚠ Retrieving mist state 0/0 targets complete...

================= ==============
 Target            Message
================= ==============
 node1.t129-dut1   Disconnected

Failed to retrieve mist state. 0 targets failed, 1 target is disconnected, and 0 succeeded.
Completed in 0.03 seconds
admin@node1.conductor-t129# connect router t129-dut1 node node1 username centos
✔ Validating target...
Connecting...
centos@127.127.0.1's password:
FIPS mode initialized. SSH client running in FIPS 140-2 mode
Last login: Tue Mar 28 04:21:20 2023 from ::1
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
[centos@i-004fcc39 ~]$ sudo su
[root@i-004fcc39 centos]# su - admin
Last login: Tue Mar 28 04:29:39 UTC 2023 on pts/1
admin@node0.0200012d64df#
```

## Post Migration Cleanup
After a successful Mist migration, it is strongly recommeded that the following cleanup steps be taken from the conductor.

- Remove salt SSH keys (**WhErE?**)
- Remove SSH keys for 930 connection (**WhErE?**)
- Delete the asset-id for the migrated node. Once this change is committed, you will no longer be able to SSH to the device.
- Remove the conductor services from the MIST configuration.

```
admin@node1.conductor-t129# connect router t129-dut2 node node1 username centos
✔ Validating target...
Connecting...
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the RSA key sent by the remote host is
SHA256:cMh8ry+JZhhO2yYkWAXO+PDYAp8UZhDZ4UFQrFzN3pQ.
Please contact your system administrator.
Add correct host key in /home/admin/.ssh/known_hosts to get rid of this message.
Offending RSA key in /home/admin/.ssh/known_hosts:1
RSA host key for [127.127.0.1]:16386 has changed and you have requested strict checking.
Known host key verification failed.
% Error: Known host verification failed
admin@node1.conductor-t129#
```







