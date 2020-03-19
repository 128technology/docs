---
title: "Automated Provisioner: Salt Minion"
sidebar_label: "AP: Salt Minion"
---

This document describes the process for troubleshooting issues with Automated Provisioning (AP) using Salt.

:::note
The terms "master" and "conductor" are used interchangeably throughout this document. "Master" refers to the salt-master process running on conductor, which orchestrates tasks for AP.  Also the terms "minion", "salt-minion" and "asset" are used interchangeably throughout this document. "Minion" runs on an "asset", or system hosting a 128T router. Minions are responsible for carrying out tasks on the host, given to it by the master.
:::

## Symptoms

There are several conditions which are symptomatic of issues which may be affecting AP, such as asset disconnected from conductor and general asset errors. These can be seen from conductor CLI using the `show assets` command with a provided asset-id. For example:

```
admin@node1.conductor# show assets asset-id
Mon 2019-08-21 19:45:35 EDT

=======================================
 asset-id
=======================================
 Router:                  my-router
 Node:                    node1
 Current Version:         None
 Status:                  disconnected

 -----------------------------
 Software Versions Information
 -----------------------------
 Refresh In Progress:     False
```

```
admin@node1.conductor# show assets asset-id
Mon 2019-08-26 19:45:12 EDT

=============================================================================
 asset-id
=============================================================================
 Router:                  my-router
 Node:                    node1
 Current Version:         4.1.4-1.el7.centos
 Status:                  running
 Failed Status:           running

 ------
 Errors
 ------
 reverse-ssh_conductor1_login_unit: Unable to manage file: Message timed out
```

## Root Cause

At certain times some errors that are seen may be transient during periods of intermittent connectivity, or while the salt master corrects things found in the incorrect state on the minion. Errors that persist are often the result of issues with connectivity between the minion and conductor, or the minion timing out tying to complete tasks given to it by the master.

## Steps to Rectify

Throughout the lifecycle of a 128T asset, some errors are normal and will clear on their own over time. The first steps are to ensure there is working connectivity between the minion and the master.

### Diagnosing the issues

The following steps can help diagnose issues with salt-minion which may be affecting AP:

- Ensure that the `salt-minion` process is running:

```
[t128@host ~]$ sudo systemctl status salt-minion
● salt-minion.service - The Salt Minion
   Loaded: loaded (/usr/lib/systemd/system/salt-minion.service; enabled; vendor preset: disabled)
  Drop-In: /usr/lib/systemd/system/salt-minion.service.d
           └─restartAlways.conf
   Active: active (running) since Wed 2019-08-28 09:23:19 PDT; 6min ago
     Docs: man:salt-minion(1)
           file:///usr/share/doc/salt/html/contents.html
           https://docs.saltstack.com/en/latest/contents.html
 Main PID: 5036 (salt-minion)
    Tasks: 14
   Memory: 92.0M
   CGroup: /system.slice/salt-minion.service
           ├─5036 /usr/bin/python /usr/bin/salt-minion
           ├─5039 /usr/bin/python /usr/bin/salt-minion
           └─5058 /usr/bin/python /usr/bin/salt-minion
```

- Ensure the host has a working route to conductor by inspecting the route table. For example the following host has a default route via the `kni254` data interface:

```
[t128@host ~]$ ip r l
default via 169.254.127.126 dev kni254
169.254.0.0/16 dev kni254 scope link metric 1009
169.254.127.126/31 dev kni254 proto kernel scope link src 169.254.127.127
169.254.253.128/30 dev habr proto kernel scope link src 169.254.253.130 metric 425
```

- Verify that the minion is successfully opening connections to the master on TCP port 4505 and 4506. For example, you can use the `ss` Linux utility to look for active sockets:

```
[t128@host ~]$ sudo ss -ptn | grep -E '(4505|4506)'
ESTAB      0      162    169.254.127.127:39308              128.128.128.128:4506                users:(("salt-minion",pid=5234,fd=24))
ESTAB      0      0      169.254.127.127:35024              128.128.128.128:4505                users:(("salt-minion",pid=5234,fd=19),("salt-minion",pid=5039,fd=19))
```
:::note
Connections on TCP port 4506 are transient, and only exist when the minion needs to report information back to the master. Seeing a none, or a varying number of connections being opened on TCP port 4506 is normal.
:::

- If you suspect network issues are impacting the minion's ability to function, you can further diagnose by verifying packets are flowing as expected on the wire using `tcpdump`. For example:

```
[t128@host ~]$ sudo tcpdump -i any 'tcp port 4505 or tcp port 4506' -nnN
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on any, link-type LINUX_SLL (Linux cooked), capture size 262144 bytes
09:34:55.380670 IP 128.128.128.128.4505 > 169.254.127.127.35024: Flags [.], ack 1309158047, win 219, options [nop,nop,TS val 2905329152 ecr 1874888070], length 0
09:34:55.380703 IP 169.254.127.127.35024 > 128.128.128.128.4505: Flags [.], ack 1, win 544, options [nop,nop,TS val 1874908102 ecr 2905322513], length 0
09:34:56.892259 IP 169.254.127.127.39500 > 128.128.128.128.4506: Flags [S], seq 1973885769, win 29200, options [mss 1460,sackOK,TS val 1874909613 ecr 0,nop,wscale 7], length 0
09:34:56.982670 IP 128.128.128.128.4506 > 169.254.127.127.39500: Flags [S.], seq 2047989050, ack 1973885770, win 26847, options [mss 1460,sackOK,TS val 2905330754 ecr 1874909613,nop,wscale 7], length 0
09:34:56.982752 IP 169.254.127.127.39500 > 128.128.128.128.4506: Flags [.], ack 1, win 229, options [nop,nop,TS val 1874909704 ecr 2905330754], length 0
09:34:56.983720 IP 169.254.127.127.39500 > 128.128.128.128.4506: Flags [P.], seq 1:499, ack 1, win 229, options [nop,nop,TS val 1874909705 ecr 2905330754], length 498
09:34:57.073622 IP 128.128.128.128.4506 > 169.254.127.127.39500: Flags [.], ack 499, win 219, options [nop,nop,TS val 2905330844 ecr 1874909705], length 0
09:34:57.075619 IP 128.128.128.128.4506 > 169.254.127.127.39500: Flags [P.], seq 1:85, ack 499, win 219, options [nop,nop,TS val 2905330847 ecr 1874909705], length 84
09:34:57.075648 IP 169.254.127.127.39500 > 128.128.128.128.4506: Flags [.], ack 85, win 229, options [nop,nop,TS val 1874909797 ecr 2905330847], length 0
09:34:57.077239 IP 169.254.127.127.39500 > 128.128.128.128.4506: Flags [F.], seq 499, ack 85, win 229, options [nop,nop,TS val 1874909798 ecr 2905330847], length 0
09:34:57.168641 IP 128.128.128.128.4506 > 169.254.127.127.39500: Flags [F.], seq 85, ack 500, win 219, options [nop,nop,TS val 2905330940 ecr 1874909798], length 0
```

If the `salt-minion` does not appear to be attempting connections to master, or has healthy connections to conductor but continues to have persistent errors, you can try restarting `salt-minion`:

```
sudo systemctl restart salt-minion
```

If it appears there are connectivity issues that are preventing AP from functioning, correct any networking issues that exist.
