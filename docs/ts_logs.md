---
title: Understanding Logs on the 128T
sidebar_label: Logs
---
Logs 128T are stored in 4 principal locations: `/var/log/128technology/`, `/var/log/install128t/`, `/var/log/salt/` and in the journal.

- `/var/log/128technology/`, as the name suggests, contains the majority of the logs related to 128T application processing.
- 128T utilizes [Salt Stack](https://www.saltstack.com) for life cycle management and Dev Ops automation. Salt-related log files are contained within their default directory of `/var/log/salt/`.
- The 128T-installer is a separate application that is used for installing and upgrading the 128T.  Any logs related to installation, initialization, upgrade, or rollback will be contained within the `/var/log/install128t/` directory.
- The journal contains logs from the web server.  In order to view logs related to these processes, you can execute `journalctl -u <process>`, where the web server process name is `128TWeb`.

An example listing of the `/var/log/128technology/` directory can be seen here:

```
[root@branch-1-router ~]# ls -al /var/log/128technology/
total 2252560
drwxrwxrwx+  5 root  root     53248 Apr  2 13:30 .
drwxr-xr-x. 19 root  root      4096 Apr  1 03:18 ..
-rwxrwxrwx+  1 root  root   7118857 Mar 27  2018 128-server.log
-rwxrwxrwx+  1 root  root     51066 Mar 21  2018 128T.1.pcap
-rwxrwxrwx+  1 root  root        24 Mar 19  2018 128T.2.pcap
-rw-rw-rw-+  1 root  root  10000293 Nov 20 01:46 128T_lan.1.pcap
-rw-rw-rw-+  1 root  root  10000728 Nov 20 01:46 128T_lan.2.pcap
-rw-rw-rw-+  1 root  root   5482123 Nov 20 01:46 128T_lan.pcap
-rwxrwxrwx+  1 root  root        24 Mar 27  2018 128T.pcap
-rw-rw-rw-+  1 root  root  10000310 Nov 20 01:38 128T_wan.1.pcap
-rw-rw-rw-+  1 root  root  10001413 Nov 20 01:38 128T_wan.2.pcap
-rw-rw-rw-+  1 root  root  10000535 Nov 20 01:38 128T_wan.3.pcap
-rw-rw-rw-+  1 root  root   5826182 Nov 20 01:38 128T_wan.pcap
-rw-rw-rw-+  1 root  root     20682 Feb 19 22:31 accessManager.1.log
-rw-rw-rw-+  1 root  root     14551 Mar 27 00:21 accessManager.log
-rw-rw-rw-+  1 root  root     20701 Feb 19 22:31 analyticsReporter.1.log
-rw-rw-rw-+  1 root  root     10111 Mar 25 19:59 analyticsReporter.log
-rw-rw-rw-+  1 root  root     30557 Feb 19 22:31 applicationFrameworkManager.1.log
-rw-rw-rw-+  1 root  root      3501 Nov 18 02:23 applicationFrameworkManager.2.log
applicationFrameworkManager.log
drwxrwxrwx+  2 root  root      4096 Feb 21 00:00 audit
-rw-rw-rw-+  1 root  root      1985 Feb 21 00:00 auditdReceiver.1.log
-rw-rw-rw-+  1 root  root      1507 Feb 21 00:00 auditdReceiver.log
-rw-rw-rw-+  1 root  root     21835 Feb 19 22:31 conflux.1.log
-rw-rw-rw-+  1 root  root     13422 Mar 27 00:26 conflux.log
-rw-rw-rw-+  1 root  root      8130 Mar 25 19:59 databaseQueryCoordinator.log
drwxrwxrwx+  3 root  root      4096 Nov 19 01:17 dhcp
-rw-rw-rw-+  1 root  root   2807247 Apr  2 14:49 dnsManager.log
-rw-rw-rw-+  1 root  root      7645 Mar 25 19:59 dynamicPeerUpdateManager.log
-rw-rw-rw-+  1 root  root       863 Feb 19 17:15 flpp.1.log
-rw-rw-rw-+  1 root  root       863 Feb 21 00:00 flpp.log
-rw-rw-rw-+  1 root  root    237234 Feb 20 23:57 highway.1.log
-rw-rw-rw-+  1 root  root    345109 Mar  7 20:01 highwayExceptions.pcap
-rw-rw-rw-+  1 root  root   2495651 Apr  2 14:41 highway.log
-rw-rw-rw-+  1 root  root       863 Feb 21 00:00 highwayPlatform.log
-rw-rw-rw-+  1 root  root      2944 Feb 23 12:50 hostedApplications
-rw-rw-rw-+  1 root  root      2100 Feb 20 23:59 influx_clean.log
-rw-rw-rw-+  1 root  root   6811683 Apr  2 14:51 influxdb_http.log
-rw-rw-rw-+  1 root  root   2780652 Apr  2 14:50 influxdb.log
-rw-rw-rw-+  1 root  root  11662771 Jul 29  2019 journalctl.log
-rw-rw-rw-+  1 root  root    106811 Feb 19 22:31 nodeMonitor.1.log
-rw-rw-rw-+  1 root  root     13956 Apr  1 21:03 nodeMonitor.log
-rw-rw-rw-+  1 admin 128t      1811 Mar 27 00:12 pcli.1.log
-rw-rw-rw-+  1 admin 128t      1676 Mar 27 00:19 pcli.log
-rw-rw-rw-+  1 admin 128t      6218 Mar 27 00:19 pdmTransportAgent.log
-rw-rw-rw-+  1 root  root    119488 Apr  1 21:04 persistentDataManager.log
-rw-rw-rw-+  1 root  root     68943 Apr  2 10:59 processes.log
-rw-rw-rw-+  1 root  root     15187 Mar 25 19:59 processManager.log
-rw-rw-rw-+  1 root  root      1196 Feb 17 12:58 quickassist_install.log
-rwxrwxrwx+  1 root  root   1016971 Feb 21 00:00 redis.log
-rw-rw-rw-+  1 root  root      8991 Mar 25 19:59 redisServerManager.log
drwxrwxrwx+  2 root  root      4096 Mar  5  2018 routing
routingEngineProcesses.log
-rw-rw-rw-+  1 root  root   5958945 Apr  2 14:48 routingManager.log
-rw-rw-rw-+  1 root  root    254101 Nov 19 00:27 runtimeStatsFlOnConfig.log
-rw-rw-rw-+  1 root  root    619642 Mar 25 19:59 runtimeStatsHwmOnConfig.log
-rw-rw-rw-+  1 root  root     15953 Mar 25 19:59 secureCommunicationManager.log
-rw-rw-rw-+  1 root  root     10193 Mar 25 19:59 securityKeyManager.log
-rw-rw-rw-+  1 root  root   8118256 Apr  1 22:41 serviceArea.log
-rw-rw-rw-+  1 root  root      8005 Mar 25 19:59 snmpTrapAgent.log
-rw-rw-rw-+  1 root  root    662881 Apr  2 14:01 stateMonitor.log
-rw-rw-rw-+  1 root  root      8048 Mar 25 19:59 systemServicesCoordinator.log
-rw-rw-rw-+  1 root  root       672 Feb 21 00:00 tank_clean.log
-rw-rw-rw-+  1 root  root      4893 Feb 20 23:59 tunnelProcesses.log
-rwxrwxrwx+  1 root  root   2201622 Feb 17 13:03 web-server.log
-rw-rw-rw-+  1 root  root        83 Feb 20 23:59 yin-and-friends.log
-rw-rw-rw-+  1 root  root   2907035 Apr  2 13:59 zookeeperServer.log
```

You may have noticed that some log files are approximately 10MB large and others that have a `file-name.#.log` format.  128T rotates logs when it starts and if a log file reaches 10MB in size. There are a maximum number of 25 rotated files per process before the oldest one gets deleted.

Each process that runs on a 128T writes to its own log. You can view the processes on your 128T by issuing the command `show system processes` in the PCLI:

```
admin@branchoffice1.seattlesite1# show system processes
Mon 2018-09-10 20:10:28 UTC

=============== ============================= ========= ========= =======
 Node            Process                       Status    Primary   Role
=============== ============================= ========= ========= =======
 branchoffice1   accessManager                 running             combo
 branchoffice1   analyticsReporter             running             combo
 branchoffice1   applicationFrameworkManager   running             combo
 branchoffice1   conflux                       running             combo
 branchoffice1   databaseQueryCoordinator      running             combo
 branchoffice1   dnsManager                    running             combo
 branchoffice1   dynamicPeerUpdateManager      running             combo
 branchoffice1   highway                       running             combo
 branchoffice1   nodeMonitor                   running             combo
 branchoffice1   persistentDataManager         running             combo
 branchoffice1   redisServerManager            running             combo
 branchoffice1   routingManager                running             combo
 branchoffice1   secureCommunicationManager    running             combo
 branchoffice1   securityKeyManager            running             combo
 branchoffice1   snmpTrapAgent                 running             combo
 branchoffice1   stateMonitor                  running             combo
 branchoffice1   systemServicesCoordinator     running             combo

Completed in 0.10 seconds
```

The `128TWeb` server process is not in the output of `show system processes` because the web server is managed by systemd and not by 128T's process manager.

The log that is currently being written to is the log that does not have a number added to its name. For example, highway.log is the current highway log while highway.1.log is the most recently rotated highway log. 

To rotate all your logs, issue:
```
admin@branchoffice1.seattlesite1# rotate log
```

Or if you want to rotate a specific process log file, issue:
```
admin@branchoffice1.seattlesite1# rotate log node <node name> <process name>
```

To change your logging level, issue the command:
```
admin@branchoffice1.seattlesite1# set log level <log-level>
```

If you want to change the log level for a single process, then issue:
```
admin@branchoffice1.seattlesite1# set log level node <node name> <log-level> <process name>
```

Log levels are:
- fatal
- error
- warning
- info
- debug
- trace

To go back to the default log level, then issue:
```
admin@branchoffice1.seattlesite1# set log level configured
```

You can change your default log level by configuring under your router's system settings:
```
admin@branchoffice1.seattlesite1# configure authority router <router name> system log-level <log-level>
```

To write messages to all logs:
```
admin@branchoffice1.seattlesite1# write log "this is a test"
Log message successfully written
admin@branchoffice1.seattlesite1# quit

[t128@branch-1-router ~]$ tail -50 /var/log/128technology/highway.log 
...
May 22 23:22:51.385 [USER| -- ] INFO  (highwayManagerPo) this is a test

[t128@branch-1-router ~]$ tail -50 /var/log/128technology/nodeMonitor.log 
...
May 22 23:22:51.384 [USER| -- ] INFO  (node  ) this is a test
```

To write messages to a certain process log:
```
admin@branchoffice1.seattlesite1# write log node branchoffice1 "this is a test HighwayManager" highway
Log message successfully written
admin@branchoffice1.seattlesite1# quit

[t128@branch-1-router ~]$ tail -50 /var/log/128technology/highway.log 
…
May 22 23:22:51.385 [USER| -- ] INFO  (highwayManagerPo) this is a test
May 22 23:31:01.288 [USER| -- ] INFO  (highwayManagerPo) this is a test HighwayManager
[t128@branch-1-router ~]$ tail -50 /var/log/128technology/nodeMonitor.log 
...
May 22 23:22:51.384 [USER| -- ] INFO  (node  ) this is a test
```

When working with the 128T Support Team, you may be asked to bundle your logs. This is easy with the built-in 128T log compression utility: 
```
admin@branchoffice1.seattlesite1# save tech-support-info
Retrieving Tech Support Info...
/var/log/128technology/tech-support-info.tar.gz
admin@branchoffice1.seattlesite1# quit
[t128@branch-1-router ~]$ ls -alrt /var/log/128technology/tech-support-info*
-rw-r--r-- 1 root root   727891 Sep 12 20:11 /var/log/128technology/tech-support-info.log
-rw-r--r-- 1 root root 2198659 Sep 12 20:11 /var/log/128technology/tech-support-info.tar.gz
```

This command bundles all the log files and other system environment properties that may be needed to diagnose issues related to 128T, and compresses them into a file in `/var/log/128technology/`.