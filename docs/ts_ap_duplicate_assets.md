---
title: "Automated Provisioner: Duplicate Asset ID Error"
sidebar_label: "AP: Duplicate Asset ID Error"
---

## Introduction

This document describes the process for troubleshooting the duplicate asset ID error with Automated Provisioning (AP).

:::note
The terms "salt-master" and "conductor" are used interchangeably throughout this document. "Salt-master" refers to the salt-master process running on conductor, which orchestrates tasks for AP.  Also the terms "minion", "salt-minion" and "asset" are used interchangeably throughout this document. "Minion" runs on an "asset", or system hosting a 128T router. Minions are responsible for carrying out tasks on the host, given to it by the salt-master.
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

It is not always clear which situation is causing the duplicate asset ID error. If an asset is in the disconnected state and has a duplicate asset ID error then the conductor is unable to distinguish if the denied key is from the same salt-minion who is now disconnected, or the correct salt-minion is simply disconnected at the time when a new salt-minion tried to authenticate with a different public key and the same ID. However, if an asset is in any state where it is currently connected to the conductor (connected, installed, starting, running, stopped, etc.) and has a duplicate ID error then the user knows that they have a salt-minion with a duplicate ID trying to connect. But, they do not know if the asset currently connected is the correct asset, or if the asset with the denied key is the correct asset.

## Root Cause

A denied key is a public key that is rejected automatically by the salt-master when the salt-minion tries to authenticate with its public key. A rejected key is a different state that indicates a user manually rejected a salt key. There are two different situations that can result in the salt-master denying a key:
1. A salt-minion was rebuilt, reinstalled or the public/private key pair was wiped and new keys were automatically regenerated when the salt-minion service started. Now the minion's keys do not match the salt keys previously associated with the minion ID on the conductor.
2. There are two salt-minions trying to authenticate with the same salt-minion ID.

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

The salt-minion may reach out again automatically and get accepted by the conductor if the asset ID matches an asset ID in the 128T configuration. If the salt-minion does not reach out then it needs to be restarted manually from the Linux command line with `systemctl restart salt-minion`.

If the root cause was indeed a salt-minion that regenerated new keys and not two different salt-minions with the same ID, then this procedure will solve your problem and the asset will reconnect properly and no duplicate ID error will appear. If the duplicate asset ID error and the denied and accepted keys reappear then the user knows they are dealing with multiple salt-minions with the same minion ID.

### Rectifying Multiple Salt-Minions with the Same Minion ID

If the user tried the procedure from the previous section and the duplicate ID error and denied keys have reappeared then the user is dealing with multiple salt-minions with the same ID. Unfortunately, the only course of action in this case is to track down the system with the improper ID. After tracking down the system the user simply needs to change the ID located at `/etc/salt/minion_id` and restart the salt minion with `systemctl restart salt-minion`. The denied key associated with the old salt-minion ID will be deleted by the conductor automatically after one minute when the old ID stops trying to authenticate.

Tracking down the asset with the duplicate ID is not always easy. Since the salt-master automatically denies the authentication attempt from this bad actor, the conductor has no insight into the IP address or any other information about this asset. Secondly, the user does not know if the key that is currently denied belongs to the asset with the incorrect ID, or the correct one. Whichever system tries to authenticate first will get accepted and the other system will get denied. However, the user can use the salt command line to try and retrieve information from the asset who has been accepted to determine if this is the bad actor or the correct asset. For example, running the salt command `grains.items` will return a large amount of information about the system. Or the command `grains.get` can return specific pieces of information about the system. This might give the user a clue if the currently connected system has the correct minion ID. In the example below, the hostname grain retrieved was `asset10`, and if the customer is matching asset IDs to hostnames, then this may be a clue that this system is causing the duplicate ID error because the minion ID should be `asset10`:
```
[root@t227-dut1 ~]# t128-salt asset1 grains.get host
asset1:
    asset10
```

Unfortunately the user can only query information about the system with the key that is accepted. If the user thinks the system that is currently accepted has the correct minion ID, they could try deleting both accepted and denied keys again and hope that the bad actor connects first and gets accepted so they can query information about that system.
