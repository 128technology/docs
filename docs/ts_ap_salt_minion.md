---
title: "Automated Provisioner: Salt Minion"
sidebar_label: "AP: Salt Minion"
---

This document describes the process for troubleshooting issues with Automated Provisioning (AP) using Salt.

:::note
The terms "salt-master" and "conductor" are used interchangeably throughout this document. "Salt-master" refers to the salt-master process running on the conductor, which orchestrates tasks for AP.  Also the terms "minion", "salt-minion" and "asset" are used interchangeably throughout this document. "Minion" runs on an "asset", or system hosting an SSR router. Minions are responsible for carrying out tasks on the host, given to it by the salt-master.
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
 Current Version:         4.1.4-1.el7
 Status:                  running
 Failed Status:           running

 ------
 Errors
 ------
 reverse-ssh_conductor1_login_unit: Unable to manage file: Message timed out
```

## Root Cause

At certain times some errors that are seen may be transient during periods of intermittent connectivity, or while the salt-master corrects things found in the incorrect state on the minion. Errors that persist are often the result of issues with connectivity between the minion and conductor, or the minion timing out tying to complete tasks given to it by the salt-master.

## Steps to Rectify

Throughout the lifecycle of an SSR asset, some errors are normal and will clear on their own over time. The first steps are to ensure there is working connectivity between the minion and the salt-master.

### Diagnosing the Issues

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

- Verify that the minion is successfully opening connections to the salt-master on TCP port 4505 and 4506. For example, you can use the `ss` Linux utility to look for active sockets:

```
[t128@host ~]$ sudo ss -ptn | grep -E '(4505|4506)'
ESTAB      0      162    169.254.127.127:39308              128.128.128.128:4506                users:(("salt-minion",pid=5234,fd=24))
ESTAB      0      0      169.254.127.127:35024              128.128.128.128:4505                users:(("salt-minion",pid=5234,fd=19),("salt-minion",pid=5039,fd=19))
```
:::note
Connections on TCP port 4506 are transient, and only exist when the minion needs to report information back to the salt-master. Seeing a none, or a varying number of connections being opened on TCP port 4506 is normal.
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

If the `salt-minion` does not appear to be attempting connections to salt-master, or has healthy connections to conductor but continues to have persistent errors, you can try restarting `salt-minion`:

```
sudo systemctl restart salt-minion
```

If it appears there are connectivity issues that are preventing AP from functioning, correct any networking issues that exist.

## Asset Status

In versions of SSR Software prior to 6.3.0, the asset states were a combination of SALT statuses and SSR statuses. This caused ambiguity with the true state of the SSR. In order to provide a clearer picture of asset states, beginning with version 6.3.0 the SALT status and the SSR status have been decoupled. This document provides a summary of the SSR asset states seen when upgrading or installing SSR software, as well as any time `show assets asset-id` is run. 

### Asset States in Versions Earlier than 6.3.0

The information below describes the Asset states reported on SSR Software versions prior to 6.3.0, and provides context for the changes put in place with version 6.3.0. 

- **Pending:** The SALT minion has sent its public key to the conductor and is waiting to be accepted. This does not indicate that the minion is currently reaching out; it may have sent the key to the conductor and is waiting, it may have sent the key and then shut down while waiting, or it may have been disconnected.
- **Key Accepted:** The SALT master has accepted the SALT minion's public key. This action is triggered by the user associating the asset ID of the system with a node in configuration. This does not indicate that the SALT minion has connectivity.
- **Connected:** The SALT minion has connected and the SALT master is running highstate.
- **Disconnected:** The SALT minion has disconnected.
- **Not Installed:** After running highstate, the SALT master has detected that SSR is not installed on the asset.
Installed: After running highstate, the SALT master has detected that SSR is installed and is detecting whether SSR is provisioned correctly, and if the 128T service is running.
- **Resynchronizing:** Highstate is being reapplied, either due to a config change or because the user sent the `sync` command.
- **Reinitializing:** The conductor has detected that the 128T service is not provisioned correctly and is stopping the service to reinitialize it.
- **Starting:** The SALT minion has reported that the 128T service is running but is trying to detect whether the service has fully started by retrieving the process state to see if all processes are running. The process state is retrieved via the SSH tunnels and the conductor may not have SSH connectivity to the asset yet.
- **Stopped:** The 128T service is stopped.
- **Running:** The conductor has detected that all SSR processes are running. The Running state implies the following:
    * The salt minion is connected and has applied highstate
    * All SSR processes are in the Running state
    * The asset has SSH connectivity to the conductor
It is important to note that the Running state only indicates that the current configuration has been processed. It does not mean that traffic is routing correctly. 

These asset states are a combination of SALT statuses and SSR statuses. The following example describes the potential confusion with the SSR statuses and SALT statuses being combined: 

Let's assume an asset is in running. If the SALT minion disconnects (which they often do), then the asset will transition to disconnected. The SSR processes are still in running, and the SSH connectivity is still connected, but the customer sees disconnected and worries that the asset is no longer routing traffic. 

In order to provide a clearer picture of asset states, the SALT status and the SSR status have been decoupled beginning with version 6.3.0. 

### Versions 6.3.0 and Above

The information below describes the asset states reported on SSR Software version 6.3.0 and higher.

- **Pending:** The SALT minion has sent its public key to the conductor and is waiting to be accepted. This does not indicate that the minion is currently reaching out; it may have sent the key to the conductor and is waiting, it may have sent the key and then shut down while waiting, or it may have been disconnected.
- **Key Accepted:** The SALT master has accepted the SALT minion's public key. This action is triggered by the user associating the asset ID of the system with a node in configuration. This does not indicate that the SALT minion has connectivity.
- **Synchronizing:** The minion has connected and the SALT master is running highstate. 
- **Synchronized:** Highstate is complete and the minion is in steady state. 
- **Resynchronizing:** Highstate is being reapplied, either due to a config change or because the user sent the sync command. 
- **Reinitializing:** The conductor has detected that the 128T service is not provisioned correctly and is stopping the service to reinitialize it.

Additionally, individual statuses are displayed under `show assets <asset-id>` for the following functions:

- SALT status
- Conductor Connectivity
- Peer Conductor Connectivity
- Service Status

### Example Output

The SSR process state and SSH connectivity state are individually displayed in the `show assets detail` view:
```
admin@t163-dut1.Conductor# show assets t163-dut4.novalocal
Thu 2024-10-17 17:49:36 UTC
Retrieving assets...

====================================================
 t163-dut4.novalocal
====================================================
  Router:                       Router
  Node:                         t163-dut4
  Current Version:              6.3.0-107.r1.el7
  Install Type:                 Image
  Status:                       Synchronized <========= salt status
  Conductor Connectivity:       Connected <============ SSR connectivity status to current conductor node
  Peer Conductor Connectivity:  Connected <============ SSR connectivity status to peer conductor node (if exists)
  Service Status:               Running   <============ SSR process status
  First Connection Date:        2024-10-08 15:02:59
  Time in Status:               1d 15h 55m 32s

Completed in 0.42 seconds
```
