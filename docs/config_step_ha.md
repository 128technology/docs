---
title: STEP High Availability
sidebar_label: STEP High Availability
---

#### Version History
| Release | Modification                |
| ------- | --------------------------- |
| 5.6.0   | STEP HA introduced |

## STEP Repository High Availability

To achieve STEP repository high availability, the conductor is placed in an HA configuration. Each of the two conductor nodes hosts a STEP repository, and both nodes are active. All routers in the authority are connected to both repositories. Each router sends and recieves STEP router document updates from both repositories, providing redundancy in case one of the repositories becomes unavailable. Each router uses existing secure communication channels to the conductor nodes to exchange STEP information.

To configure STEP repository High Availability, specify the IP addresses of both conductor nodes as STEP repositories:

```
config
    authority
        step-repo          192.168.1.11
            address      192.168.1.11
            description  "STEP repository on conductor node 1”
        exit
        step-repo          192.168.1.4
            address      192.168.1.4
            description  "STEP repository on conductor node 2"
        exit

```

STEP repositories on systems other than the conductor nodes are not supported at this time.

To verify that a given router has established connectivity to its repositories, use the `show step clients` command:

```
admin@dut3.Blackall# show step clients
usage: clients [rows <rows>] [<verbosity>]

Show STEP clients

keyword arguments:
rows    The number of items to display at once [type: int or 'all'] (default: 50)

positional arguments:
verbosity    detail | summary (default: summary)


admin@dut3.Blackall# show step clients
Fri 2022-04-15 21:20:46 UTC

================= ================= =========== ================= ============== ================= ========== =================
 Repository        Uptime            Documents   Last Received     Num Received   Last Sent         Num Sent   Num Disconnects
================= ================= =========== ================= ============== ================= ========== =================
 127.0.1.2:15555   0 days 22:29:57   None        0 days  0:00:41           1391   0 days  0:01:23        465                 2
 127.0.1.3:15555   0 days 22:27:15   None        0 days  0:00:41           1393   0 days  0:01:23        465                 1

✔ Retrieving step information...
Completed in 0.46 seconds


admin@dut3.Blackall# show step clients detail
Fri 2022-04-15 21:23:34 UTC

=======================================================
 Information
=======================================================
 Item:
   Last Client Disconnect Time:   2022-04-14T22:48:26Z
   Connected:                     True
   Last Client Connect Time:      2022-04-14T22:50:50Z
   Num Updates Received:          1394
   Num Router Documents:          None
   Num Client Connects:           3
   Num Client Disconnects:        2
   Num Updates Sent:              466
   Last Update Received Time:     2022-04-15T21:23:06Z
   Name:                          Blackall_dut3_Step_0
   Last Update Sent Time:         2022-04-15T21:22:24Z
   Repository:                    127.0.1.2:15555
 Item:
   Last Client Disconnect Time:   2022-04-14T22:51:35Z
   Connected:                     True
   Last Client Connect Time:      2022-04-14T22:53:32Z
   Num Updates Received:          1396
   Num Router Documents:          None
   Num Client Connects:           2
   Num Client Disconnects:        1
   Num Updates Sent:              466
   Last Update Received Time:     2022-04-15T21:23:06Z
   Name:                          Blackall_dut3_Step_1
   Last Update Sent Time:         2022-04-15T21:22:24Z
   Repository:                    127.0.1.3:15555

✔ Retrieving step information...
Completed in 0.06 seconds

```

## STEP Router High Availability

Starting with release 5.6, routers in an HA configuration (two router nodes) are supported with STEP. This does not require any router specific configuration. Configuring the STEP repository (or two repositories in the case of an HA conductor) at the authority level enables STEP for all routers in the authority, whether they are HA routers or not.
On an HA router, the STEP client functionality is integrated into the `routingManager` process and thus is performed on the router node that is the primary node for the `routingManager` process. Use the `show system processes` command to identify the primary node :

```
admin@dut5.Townsville# show system processes node all
Fri 2022-04-15 21:35:09 UTC
✔ Retrieving system processes...

================= ============================= ========= ========= =======
 Node              Process                       Status    Primary   Role
================= ============================= ========= ========= =======
 dut5.Townsville   accessManager                 running             combo
 dut5.Townsville   analyticsReporter             running             combo
 dut5.Townsville   applicationFrameworkManager   running             combo
 dut5.Townsville   configDirector                running   Y         combo
 dut5.Townsville   conflux                       running             combo
 dut5.Townsville   databaseQueryCoordinator      running             combo
 dut5.Townsville   dnsManager                    running   Y         combo
 dut5.Townsville   dynamicPeerUpdateManager      running   Y         combo
 dut5.Townsville   highway                       running             combo
 dut5.Townsville   nfxChassisMonitor             running             combo
 dut5.Townsville   nodeMonitor                   running             combo
 dut5.Townsville   redisServerManager            running   Y         combo
 dut5.Townsville   routingManager                running   Y         combo
 dut5.Townsville   secureCommunicationManager    running             combo
 dut5.Townsville   securityKeyManager            running   Y         combo
 dut5.Townsville   snmpTrapAgent                 running             combo
 dut5.Townsville   stateMonitor                  running             combo
 dut5.Townsville   systemServicesCoordinator     running             combo
 dut6.Townsville   accessManager                 running             combo
 dut6.Townsville   analyticsReporter             running             combo
 dut6.Townsville   applicationFrameworkManager   running             combo
 dut6.Townsville   configDirector                running   N         combo
 dut6.Townsville   conflux                       running             combo
 dut6.Townsville   databaseQueryCoordinator      running             combo
 dut6.Townsville   dnsManager                    running   N         combo
 dut6.Townsville   dynamicPeerUpdateManager      running   N         combo
 dut6.Townsville   highway                       running             combo
 dut6.Townsville   nfxChassisMonitor             running             combo
 dut6.Townsville   nodeMonitor                   running             combo
 dut6.Townsville   redisServerManager            running   N         combo
 dut6.Townsville   routingManager                running   N         combo
 dut6.Townsville   secureCommunicationManager    running             combo
 dut6.Townsville   securityKeyManager            running   N         combo
 dut6.Townsville   snmpTrapAgent                 running             combo
 dut6.Townsville   stateMonitor                  running             combo
 dut6.Townsville   systemServicesCoordinator     running             combo

Completed in 0.16 seconds

```

When the node hosting the primary routingManager fails, the other node becomes primary and connects to the STEP repositories.