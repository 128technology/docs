---
title: "Automated Provisioner: Duplicate Asset ID Error"
sidebar_label: "AP: Duplicate Asset ID Error"
---

## Introduction

This document describes the process for troubleshooting the duplicate asset ID error with Automated Provisioning (AP).

Here are a few situations that may cause a duplicate asset ID:
* SSR has been cloned from staging and has not completed the initialization procedure, creating a unique ID
* The same quickstart file has been applied to multiple SSRs
* A user has manually entered the same asset ID into the salt-minion ID file on multiple SSRs

:::note
The terms "salt-master" and "conductor" are used interchangeably throughout this document. "Salt-master" refers to the salt-master process running on the conductor, which orchestrates tasks for AP.  Also the terms "minion", "salt-minion" and "asset" are used interchangeably throughout this document. "Minion" runs on an "asset", or system hosting an SSR. Minions are responsible for carrying out tasks on the host, given to it by the salt-master.
:::

This document will reference salt keys and salt grains. Some good resources for these topics are:

[Salt-Key Command](https://docs.saltproject.io/en/latest/ref/cli/salt-key.html)

[Salt Grains](https://docs.saltproject.io/en/latest/ref/modules/all/salt.modules.grains.html)

:::note
The `salt-key` command referenced above can be accessed from the Linux shell with `t128-salt-key`. All arguments to the command and behavior are identical.
:::

## Symptoms

An asset that has a duplicate asset ID error can be seen from the conductor CLI using the `show assets` command with a provided asset-id. For example:
```
admin@node1.conductor# show assets asset1
Tue 2021-04-20 14:21:30 UTC

===============================================
 asset1
===============================================
  Router:                  my-router
  Node:                    node1
  Current Version:         4.5.8-1.debug.el7
  Status:                  Running
  First Connection Date:   2021-04-20 00:34:01

  -----------------------------
  Software Versions Information
  -----------------------------
  Refresh in Progress:     False


=====================
 Duplicate Asset IDs
=====================
 asset1

Completed in 0.10 seconds
```

A duplicate asset ID error can also be seen as an alarm event from the conductor CLI using the `show events alarm`. For example:
```
admin@node1.conductor# show events alarm
Tue 2021-04-20 14:24:31 UTC

=========== ======= ============ ============================= ========== ======== ========== =============================================================== ================
 Router      Node    Event Type   Time                          Severity   Source   Category   Message                                                         Shelved Status
=========== ======= ============ ============================= ========== ======== ========== =============================================================== ================
 conductor   node1   add          2021-04-20T14:16:08.039000Z   critical   asset1   asset      A duplicate asset with id 'asset1', which is configured as      not-shelved
                                                                                               my-router, has been detected. Ensure all assets have a unique
                                                                                               id and restart salt-minion on asset 'asset1'
```

Lastly a denied key can be seen by querying the salt-master directly from the Linux command line:
```
[root@conductor ~]# t128-salt-key -L
Accepted Keys:
asset1
asset2
asset3
Denied Keys:
asset1
Unaccepted Keys:
asset4
Rejected Keys:
```

:::note
The `t128-salt` and `t128-salt-key` commands can only be executed by the `root` user at the Linux shell.
:::

There are multiple situations that may cause a duplicate asset ID error.

1. A single salt-minion disconnected, had its key regenerated, and reconnected
    * In this case, the asset will show as disconnected and have a duplicate asset ID error
1. Two salt-minions with the same ID attempted to connect
    * In this case, either the connected asset or the denied minion may be the correct one
    * The correct asset may also be disconnected when another minion with the same ID connects, making it difficult to distinguish which situation caused the asset ID error

## Root Cause

A denied key is a public key that is rejected automatically by the salt-master when the salt-minion tries to authenticate with its public key. A rejected key is a different state that indicates a user manually rejected a salt key. There are two different situations that can result in the salt-master denying a key:
1. A salt-minion was rebuilt, reinstalled or the public/private key pair was wiped and new keys were automatically regenerated when the salt-minion service started. Now the minion's keys do not match the salt keys previously associated with the minion ID on the conductor.
1. There are two salt-minions trying to authenticate with the same salt-minion ID.

In the denied key state the salt-minion does not receive any communication from the salt-master. The conductor automatically creates a duplicate asset ID error when it detects that the salt-master has moved a salt key into the denied state.

## Steps to Rectify

There are two different procedures for rectifying the two different situations. If the user is unsure which situation they are in, then they should try the procedure for rectifying a salt-minion with new keys first, before moving onto locating multiple minions with the same ID.

### Rectifying A Salt-Minion with New Keys

The user needs to drop to the Linux shell and delete the accepted and denied keys with the same asset ID using the `t128-salt-key -d <asset-id>` command. For example:
```
[root@conductor ~]# t128-salt-key
Accepted Keys:
asset1
asset2
asset3
Denied Keys:
asset1
Unaccepted Keys:
asset4
Rejected Keys:
[root@conductor ~]# t128-salt-key -d asset1
The following keys are going to be deleted:
Accepted Keys:
asset1
Denied Keys:
asset1
Proceed? [N/y] y
Key for minion asset1 deleted.
Key for minion asset1 deleted.
[root@conductor ~]#
```

:::note
If the conductor is in HA configuration then the salt keys need to be deleted from *both* conductors or the asset will be stuck in the `key-accepted` state.
:::

The salt-minion may reach out again automatically and get accepted by the conductor if the asset ID matches an asset ID in the SSR configuration. If the salt-minion does not reach out then it needs to be restarted manually from the Linux command line with `systemctl restart salt-minion`.

If the root cause was indeed a salt-minion that regenerated new keys (situation #1 above) and not two different salt-minions with different keys and the same ID (situation #2 above), then this procedure will solve your problem. The asset will reconnect properly and no duplicate ID error will appear. If the duplicate asset ID error and the denied and accepted keys reappear, then the user knows they are dealing with multiple salt-minions with the same minion ID.

### Rectifying Multiple Salt-Minions with the Same Minion ID

If the user tried the procedure from the previous section and the duplicate ID error and denied keys have reappeared then the user is dealing with multiple salt-minions with the same ID. Unfortunately, the only course of action in this case is to track down the system with the improper ID. After tracking down the system the user simply needs to change the ID located at `/etc/salt/minion_id` and restart the salt minion with `systemctl restart salt-minion`. The denied key associated with the old salt-minion ID will be deleted by the conductor automatically after one minute when the old ID stops trying to authenticate.

Tracking down the asset with the duplicate ID is not always easy. Since the salt-master automatically denies the authentication attempt from this bad actor, the conductor has no insight into the IP address or any other information about this asset. Secondly, the user does not know if the key that is currently denied belongs to the asset with the incorrect ID, or the correct one. Whichever system tries to authenticate first will get accepted and the other system will get denied.

The user should start by trying to validate the currently connected router to ensure it is the correct one. The user can connect directly to the router's PCLI via the conductor's PCLI by using the `connect` command. This command allows the user to login to the router's PCLI directly. The user can then run any PCLI command which will help them validate the currently connected router. For example, connecting to the remote router and checking the network interface IP addresses:
```
admin@node1.conductor# connect router my-router node node1 username admin
Connecting...
The authenticity of host '[127.127.0.1]:16386 ([127.127.0.1]:16386)' can't be established.
RSA key fingerprint is SHA256:NwG6NUitnfSNQyOXSjXkjU3jOen+zjPSL1ZNiU6JfYk.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '[127.127.0.1]:16386' (RSA) to the list of known hosts.
admin@127.127.0.1's password:
FIPS mode initialized. SSH client running in FIPS 140-2 mode
Starting the PCLI...
admin@node1.my-router#
admin@node1.my-router# show network-interface
Wed 2021-04-21 18:14:59 UTC

=========== ====== ======== ======== ============ ====== ============= ========== ========== =============== ============== ========== ============== ============= ======
 Router      Node   Device   Name     Forwarding   VLAN   Device Type   Type       DHCP       Address         Gateway        Hostname   Admin Status   Oper Status   GIID
=========== ====== ======== ======== ============ ====== ============= ========== ========== =============== ============== ========== ============== ============= ======
 my-router   node1      10   intf10   true            0   ethernet      external   disabled   172.16.1.2/24   172.16.1.201   --         up             up               1
 my-router   node1      11   intf11   true            0   ethernet      external   disabled   172.16.3.2/24   172.16.3.3     --         up             up               2

Completed in 0.16 seconds
admin@node1.my-router#
```

The user can also use the salt command line from the conductor's Linux shell to try and retrieve information from the asset who has been accepted to determine if this is the bad actor or the correct asset. For example, running the salt command `grains.items` will return a large amount of information about the system. Or the command `grains.get` can return specific pieces of information about the system. This might give the user a clue if the currently connected system has the correct minion ID. In the example below, the hostname grain retrieved was `asset10`, and if the customer is matching asset IDs to hostnames, then this may be a clue that this system is causing the duplicate ID error because the minion ID should be `asset10`:
```
[root@t227-dut1 ~]# t128-salt asset1 grains.get host
asset1:
    asset10
```

Unfortunately the user can only query information about the system with the key that is accepted. If the user has validated that the currently connected system is the correct system, then they could try the following procedure to locate the bad actor:
1. Login to the correct system's Linux shell directly and stop the salt-minion with `systemctl stop salt-minion`
    * Only do this if the user can maintain connectivity to this system so they can start the salt-minion again after this situation is resolved
1. Delete both the accepted and denied salt-keys on the conductor(s) with `t128-salt-key` as stated above
1. Wait for the bad actor to connect successfully via salt
1. Use `t128-salt '<asset-id>' file.write /etc/salt/minion_id "<new-asset-id>"` to remotely update the salt-minion ID file then restart the salt-minion remotely with `t128-salt '<asset-id>' service.restart salt-minion`
1. Delete the accepted salt key from the conductor(s)
1. Start the salt-minion on the correct system

If this procedure does not work then the correct course of action is to deny both duplicate salt keys until the systems have been properly authenticated. Once the correct system is found, regenerate a new minion ID and keys for the authentic minion and keep the bad actor system's key denied until it can be claimed.
