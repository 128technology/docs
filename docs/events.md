---
title: Alarms and Events
---

## What are Alarms and Events

An **event** is an occurrence that happens at a specific point of time. These indicate that a significant system event has occurred but is not an ongoing persistent event.

An **alarm** is an indication that the system is in a state that may require user intervention to resolve.

An alarm is stateful, an event is a one-off occurrence. For example, an alarm is usually associated with two events, an "ADD" when it is created and a "CLEAR" when it goes away.

## How Do I Find Alarms?

You can find alarms in the PCLI by typing:

```
admin@conductor1.nycsite1# show alarms
Tue 2018-09-11 14:44:15 UTC

=============================== ===================== ========== ============================================== =========== ====================================================
 ID                              Time                  Severity   Source                                         Category    Message
=============================== ===================== ========== ============================================== =========== ====================================================
 datacenter1.bostonsite1:60      2018-09-11 14:42:46   info       unavailable                                    interface   Intf 10 (1) administratively down
 datacenter1.bostonsite1:61      2018-09-11 14:42:46   major      If - 1 | Destination - 10.0.128.0 | Vlan - 0   peer        Peer seattlesite1 path is down (PeerName:
                                                                                                                             seattlesite1 | Destination: 10.0.128.0 | NodeName:
                                                                                                                             datacenter1 | DeviceInterface: 1 | Vlan: 0)
 branchoffice1.seattlesite1:36   2018-09-11 14:42:41   major      If - 1 | Destination - 10.0.128.1 | Vlan - 0   peer        Peer bostonsite1 path is down (PeerName:
                                                                                                                             bostonsite1 | Destination: 10.0.128.1 | NodeName:
                                                                                                                             branchoffice1 | DeviceInterface: 1 | Vlan: 0)

There are 0 shelved alarms
Completed in 0.62 seconds
```

The web client will have a badge icon on the bell on the left panel that indicates the total number of alarms.  Additionally, the header on the Dashboard will enumerate the total alarms into one of three categories: critical, major and minor.  Both the bell and the critical, major and minor are links to the alarm page which filters alarms respectively.

![alarms_and_events_alarm_screenshot](/img/events_alarm_screenshot.png)

## How Do I Find Events?

You can find events in the PCLI by typing:

```
admin@conductor1.nycsite1# show events alarm
Tue 2018-09-11 14:46:14 UTC

============== =============== ============ ====================== ========== ========================================== =================== ================== ================
 Router         Node            Event Type   Time                   Severity   Source                                     Category            Message            Shelved Status
============== =============== ============ ====================== ========== ========================================== =================== ================== ================
 seattlesite1   branchoffice1   add          2018-09-10T23:49:47Z   major      bostonsite1+3.3.3.128+branchoffice1+3+0    peer                Peer bostonsite1   not-shelved
                                                                                                                                              path is down
                                                                                                                                              (PeerName:
                                                                                                                                              bostonsite1 |
                                                                                                                                              Destination:
                                                                                                                                              3.3.3.128 |
                                                                                                                                              NodeName:
                                                                                                                                              branchoffice1 |
                                                                                                                                              DeviceInterface:
                                                                                                                                              3 | Vlan: 0)
 bostonsite1    datacenter1     add          2018-09-10T23:49:53Z   major      seattlesite1+1.1.1.128+datacenter1+4+0     peer                Peer               not-shelved
                                                                                                                                              seattlesite1
                                                                                                                                              path is down
                                                                                                                                              (PeerName:
                                                                                                                                              seattlesite1 |
                                                                                                                                              Destination:
                                                                                                                                              1.1.1.128 |
                                                                                                                                              NodeName:
                                                                                                                                              datacenter1 |
                                                                                                                                              DeviceInterface:
                                                                                                                                              4 | Vlan: 0)
 seattlesite1   branchoffice1   clear        2018-09-10T23:49:54Z   major      bostonsite1+3.3.3.128+branchoffice1+3+0    peer                Peer bostonsite1   not-shelved
                                                                                                                                              path is down
                                                                                                                                              (PeerName:
                                                                                                                                              bostonsite1 |
                                                                                                                                              Destination:
                                                                                                                                              3.3.3.128 |
                                                                                                                                              NodeName:
                                                                                                                                              branchoffice1 |
                                                                                                                                              DeviceInterface:
                                                                                                                                              3 | Vlan: 0)
```

Within the web client, the Event History link will bring you to a page where all events can be displayed, or by applying varying level of filters, restrict the messages to only a particular router or event type.

![alarms_and_events_events_screenshot](/img/events_events_screenshot.png)

## Contents of Alarms and Events

| Field    | Description                                                  |
| :------- | :----------------------------------------------------------- |
| dateTime | This is the date and time that the event occurred. The format of the value followsthe ISO 8601 standard |
| node     | The system within the 128T which produced the event          |
| process  | The process within the node which produced the event         |
| source   | The name of the entity which was the originator of the alarm. When the topic is a network-interface, this would be the name of the network-interface. |
| category | This is the alarm type. Each category has a specific message format:<br />• **system** Related to the system, e.g. CPU, memory, etc.<br />• **process** Related to an internal software process<br />• **interface/network-interface** Related to an interface on the 128T (up, down,etc.)<br />• **platform** Related to low-level events that aren't necessarily derived from the machine; e.g. security keys<br />• **peer** Related to connectivity between 128T routers<br />• **platform-state** Sourced from the stats infrastructure<br />• **redundancy** Related to high availability behavior; e.g. a failover or leadership change<br />• **giid** Related to an interface that is part of a redundant pair (giid is an interface's "global ID")<br />• **asset**  An alarm sourced by an asset (a managed node) that is dervied from Automated Provisioner |
| severity | Alarms can be categorized in one of four severities: critical, major, minor and info. These severity levels can be used to filter alerts based on one of these levels. The default severity level is info, which shows all alarms.<br />• **critical** The condition affects service<br />• **major** Immediate action is required<br />• **minor** Minor warning conditions<br />• **info** No action is required |
| message  | Descriptive text regarding the nature of the alarm           |

## Shelving Alarms

When a 128T is put into “Maintenance Mode” all alarms for that 128T will be “shelved”. Shelved alarms will continue to be monitored by the system but will not be presented on the standard UI. The state of shelved alarms can be optionally viewed by issuing:

```
admin@conductor1.nycsite1# show alarms shelved
```

## Alarms

| Field     | Data                                                         |
| --------- | ------------------------------------------------------------ |
| Category  | asset                                                        |
| Severity  | major                                                        |
| Message   | Asset `<id>`, which is configured as `<node>`.`<router>`, is not running |
| Threshold | Issued when the 128T service stops on a node (must be managed by ZTP). Clears on 128T start. |

| Cause                                              | Troubleshooting Step                                         |
| -------------------------------------------------- | ------------------------------------------------------------ |
| 128T is not running on node `<node>` router `<router>` | Start 128T from the Conductor PCLI by entering with `send command start router <router> node <node>` or pressing the start button on the Conductor’s router page in the GUI. If 128T cannot start check `systemctl status 128T` on that node. |

------

| Field     | Data                                                         |
| --------- | ------------------------------------------------------------ |
| Category  | asset                                                        |
| Severity  | major                                                        |
| Message   | Asset`<id>`, which is configured as `<node>`.`<router>`, failed to install. |
| Threshold | Issued when the 128T install fails on a node (must be managed by ZTP). Clears once 128T is installed. |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 128T failed to install on node `<node>` router `<router>`, which is asset `<id>` | Issue command `show assets <id>` to see detailed information on why the install failed and follow the instructions to fix the issue and retry the installation. |

------

| Field     | Data                                                         |
| --------- | ------------------------------------------------------------ |
| Category  | asset                                                        |
| Severity  | critical                                                     |
| Message   | `<node>`.`<router>` has a software version that does not match its peer. |
| Threshold | Issued if any node in a router has mismatched versions. Cleared when they are all equal. |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Multiple nodes configured within one router have different software versions. | Manually upgrade the node that has the lower version using 128T or upgrade the router from the PCLI by issuing the `send command upgrade router <router> <version>` or hitting the upgrade button on the Conductor's Software Management Studio page on the GUI. |

------

| Field     | Data                                                         |
| --------- | ------------------------------------------------------------ |
| Category  | asset                                                        |
| Severity  | critical                                                     |
| Message   | A duplicate asset with id `<id>` has been detected. Ensure all assets have a unique id and restart salt-minion on asset `<id>`, which is configured as `<node>`.`<router>`. |
| Threshold | Issued if any node being manged by a conductor has the same asset id as another node in the authority. |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Multiple nodes configured within an authority have the same asset id. |Execute `show assets` to identify the `<router>`.`<node>` that has a duplicate ID.  Change the asset id for that node in the Conductor to have a unique id.<br />**Tip:** Clearing the asset-id value will generate a random value.         |

------

| Field     | Data                                                         |
| --------- | ------------------------------------------------------------ |
| Category  | giid                                                         |
| Severity  | major                                                        |
| Message   | DHCP address for interface [`<interface name>`] has not been resolved |
| Threshold | Issued when DHCP address for interface is unresolved.        |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Interface configured to obtain address dynamically using DHCP but was not able to acquire one in time. | Ensure the interface is operationally up<br/>Ensure the interface is connected to a network with a DHCP server and the server will accept the node’s request for DHCP address.<br/>Collect the DHCP statistics to check for any failures.<br/>Collect packet traces on the DHCP interface to investigate any protocol level failures. |

------

| Field     | Data                            |
| --------- | ------------------------------- |
| Category  | interface                       |
| Severity  | info                            |
| Message   | interface administratively down |
| Threshold | up/down                         |

| Cause                                                        | Troubleshooting Step                          |
| ------------------------------------------------------------ | --------------------------------------------- |
| The interface is down due to being disabled in the configuration | Re-enable the interface in the configuration. |

------

| Field     | Data                       |
| --------- | -------------------------- |
| Category  | interface                  |
| Severity  | critical                   |
| Message   | interface operational down |
| Threshold | up/down                    |

| Cause                                            | Troubleshooting Step                                         |
| ------------------------------------------------ | ------------------------------------------------------------ |
| Interface is down for an Ethernet WAN connection | The next hop networking equipment is down. Troubleshoot by checking for link status on adjacent equipment, adjacent switch ports, etc. |
| Interface is down for an HA or LAN connection    | The next hop networking equipment is down. Troubleshoot by checking for link status on adjacent equipment, adjacent switch ports, etc. |
| The down interface is an LTE interface           | Check that strength and status of the LTE connection by using the `show device-interface router <router name> id <interface id>` command.<br/>• If the signal strength is marginal, poor, or 0 the LTE interface is malfunctioning.<br/>• If the system mode is not listed as LTE the signal is malfunctioning.<br/>• If the Operation Status is down, the LTE interface is malfunctioning.<br/><br/>In the event of the conditions above, contact 128 Technology. |

------

| Field     | Data                                                         |
| --------- | ------------------------------------------------------------ |
| Category  | peer                                                         |
| Severity  | major                                                        |
| Message   | Peer `<name>` path is down                                     |
| Threshold | When a single path is marked down by BFD. The source of the alarm includes the Node/interface/IP/VLAN. |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Router Interface is down.                                    | Enter the show device-interface router `<router>` node `<node>` `<interface>` command to verify the router's interface status. If the interface is down, the next hop equipment is likely down. Troubleshoot the adjacent device(s). |
| Adjacency router's interface is down.                        | Enter the show device-interface router `<router>` command to verify the adjacency router's interface status. If the interface is down, the troubleshoot the adjacent device’s interface. |
| Path health has degraded sufficiently and is impacting performance. | Using the GUI, click the Home icon and select the appropriate view for the current environment. Examine the graph for any anomalies at the time of the alarm. If the loss is 5% or higher the path has degraded. |

------

| Field     | Data                                             |
| --------- | ------------------------------------------------ |
| Category  | peer                                             |
| Severity  | critical                                         |
| Message   | Peer `<name>` is not reachable                     |
| Threshold | When all paths to a peer are marked down by BFD. |

| Cause                                                 | Troubleshooting Step                                         |
| ----------------------------------------------------- | ------------------------------------------------------------ |
| All “Peer path” alarms to a given peer are triggered. | Review the statistics for `show stats bfd by-peer-path` to investigate for anomolies.<br />Capture packets on the interface(s) that talk to the peer and look for successful UDP traffic to and from the peer at port 1280. |

------

| Field     | Data                                             |
| --------- | ------------------------------------------------ |
| Category  | peer                                             |
| Severity  | major                                         |
| Message   | Peer `<name>` path MTU is unresolvable.                     |

| Cause                                                        | Troubleshooting Step                             |
| ------------------------------------------------------------ | ------------------------------------------------ |
| Maximum Transmit Unit for packet size is unable to be determined. | Set the MTU for the device-interface statically. |

------

| Field     | Data                                     |
| --------- | ---------------------------------------- |
| Category  | platform                                 |
| Severity  | major                                    |
| Message   | flow table limit exceeded                |
| Threshold | greater than 90% of the total flow table |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Occurs when 90% or more of the total flow table is utilized. | The alarm is cleared when 80% or less of the total flow table is utilized. |
------

| Field     | Data                                    |
| --------- | --------------------------------------- |
| Category  | platform                                |
| Severity  | major                                   |
| Message   | fib table limit exceeded                |
| Threshold | greater than 90% of the total FIB table |

| Cause                                                       | Troubleshooting Step                                         |
| ----------------------------------------------------------- | ------------------------------------------------------------ |
| Occurs when 90% or more of the total FIB table is utilized. | The alarm is cleared when 80% or less of the total FIB table is utilized. This may be due to suboptimal configuration or insufficient memory allocated to the 128T software. Contact 128T support if this alarm persists. |

------

| Field     | Data                                       |
| --------- | ------------------------------------------ |
| Category  | platform                                   |
| Severity  | major                                      |
| Message   | action table limit exceeded                |
| Threshold | greater than 90% of the total action table |

| Cause                                                    | Troubleshooting Step                                         |
| -------------------------------------------------------- | ------------------------------------------------------------ |
| Occurs when 90% or more of the action table is utilized. | The alarm is cleared when 80% or less of the action table is utilized.  This table's use is proportional to the number of active flows. |

------

| Field     | Data                                    |
| --------- | --------------------------------------- |
| Category  | platform                                |
| Severity  | major                                   |
| Message   | arp table limit exceeded                |
| Threshold | greater than 90% of the total arp table |

| Cause                                             | Troubleshooting Step                                        |
| ------------------------------------------------- | ----------------------------------------------------------- |
| Occurs when 90% or more of the ARP table is used. | The alarm is cleared when 80% or less of the table is used. |

------

| Field    | Data                                      |
| -------- | ----------------------------------------- |
| Category | platform                                  |
| Severity | critical                                  |
| Message  | Security Rekey failed for: `<node-name(s)>` |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Issued when a conductor fails to distribute newly created security keys during rekey process to any managed routers. | Make sure failed nodes are running and have connectivity to the conductor. If the problem still persists please contact 128T customer support. |

------

| Field    | Data                                      |
| -------- | ----------------------------------------- |
| Category | platform                                  |
| Severity | critical                                  |
| Message  | Security Rekey failed for: `<node-name(s)>` |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Issued when a conductor fails to distribute newly created security keys during rekey process to any managed routers. | Make sure failed nodes are running and have connectivity to the conductor. If the problem still persists please contact 128T customer support. |

------

| Field     | Data                                                         |
| --------- | ------------------------------------------------------------ |
| Category  | process                                                      |
| Severity  | major                                                        |
| Message   | Process has exited unexpectedly: `<process-name>`              |
| Threshold | Issued when a 128T system process exits and is cleared when it is successfully restarted |

| Cause                                               | Troubleshooting Step                                         |
| --------------------------------------------------- | ------------------------------------------------------------ |
| Process exits once and restarts to normal operation | The 128T system is designed to restart processes in the event of a failure. If this alarm state is only seen briefly and then clears it is likely that the system has self-recovered. Please report to 128T customer support. |
| Process exits continuously                          | Contact 128T customer support                                |

------

| Field     | Data                   |
| --------- | ---------------------- |
| Category  | system                 |
| Severity  | critical               |
| Message   | system memory exceeded |
| Threshold | greater than 90%       |

| Cause                                   | Troubleshooting Step                                         |
| --------------------------------------- | ------------------------------------------------------------ |
| A process is consuming excessive memory | Locate the system processes consuming large amounts of system memory by running `show stats process memory rss` from the PCLI. |

------

| Field     | Data                          |
| --------- | ----------------------------- |
| Category  | system                        |
| Severity  | major                         |
| Message   | disk space low                |
| Threshold | less than 10% disk space left |

| Cause              | Troubleshooting Step                                         |
| ------------------ | ------------------------------------------------------------ |
| Disk usage is high | Using standard Linux tools such as “df” and “ls” determine which files are consuming large amounts of disk space. In the event that there are unneeded files they should be removed. |

------

| Field     | Data                                                         |
| --------- | ------------------------------------------------------------ |
| Category  | system                                                       |
| Severity  | major                                                        |
| Message   | No connectivity to `<router>`.`<node>`                           |
| Threshold | When a connection between a node that is present in config/environment config is not present. |

| Cause                                          | Troubleshooting Step                                         |
| ---------------------------------------------- | ------------------------------------------------------------ |
| The node is not reachable by the conconductor. | Enter `show system connectivity router all node all | grep <router>` and `show system connectivity internal node all | grep <router>`commands to check connectivity status. If any entry is listed as not connected, there is a communication issue between node and the conductor. The most probable cause is outage or degradation or improperly configured public keys. |
| The node is not reachable by its HA peer.      | Enter `show system connectivity router all node all | grep <router>` and `system connectivity internal node all | grep <router>`commands to check connectivity status. If any entry is listed as not connected, there is a communication issue between node and the conductor. The most probable cause is outage or degradation or improperly configured public keys. |

------

| Field     | Data                            |
| --------- | ------------------------------- |
| Category  | system                          |
| Severity  | major                           |
| Message   | Host cpu utilization exceeded   |
| Threshold | greater than 85% for 30 seconds |

| Cause                                              | Troubleshooting Step                                         |
| -------------------------------------------------- | ------------------------------------------------------------ |
| Intermittent process consuming large amount of CPU | If the alarm triggers and clears intermittently this could indicate a periodic load spike or intermittent process workload. Check the current cpu utilization of all processes in the system by using the linux command `top` or the PCLI command `show stats process cpu`. If the processes “highway” is consuming a large amount of CPU this could indicate a high network load event. |
| Process consistently consuming large amount of CPU | If the alarm is constantly active this could indicate an under-provisioned system. Check the current cpu utilization of all processes in the system by using the linux command `top` or the PCLI command `show stats process cpu. If the process “highway” is consuming a large amount of CPU this could indicate a high network load. Contact 128T support for guidance on provisioning the system. |

------

| Field     | Data                                                         |
| --------- | ------------------------------------------------------------ |
| Category  | system                                                       |
| Severity  | Major                                                        |
| Message   | Received config sync info state for node `<node-name>` with syncVersion=`<version>`, error=`<error>`, message=`<message>` and resulting action=`<action>`   |
| Threshold | Configuration synchronization error |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| The router is unable to receive the configuration from the Conductor | Run the command `show asset <asset-id>` of the system exhibiting the problem.  This will return the status of the asset and provide more detailed information regarding the nature of the problem. |

------

| Field     | Data                                      |
| --------- | ----------------------------------------- |
| Category  | system                                    |
| Severity  | major                                     |
| Message   | Hostname [`<hostname>`] is unresolved       |
| Threshold | When a configured hostname is unresolved. |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| The router was unable to resolve the hostname given in the config | Verify that the hostname is resolvable from linux using a utility like `dig`. Verify that the hostname has a corresponding /etc/hosts entry |

------

| Field     | Data                                                         |
| --------- | ------------------------------------------------------------ |
| Category  | system                                                       |
| Severity  | Major                                                        |
| Message   | No active NTP server                                         |
| Threshold | Issued when the system is not connected to any active NTP servers. |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| The router is having connectivity problems to the NTP server that was selected. | Specify NTP server(s) to connect to. From PCLI, “configure authority router `<router name>` system ntp server `<ntp server address>`”.<br/>Make this more resilient by specifying more NTP servers. A common practice is to specify 4 servers. |

------

| Field     | Data                                |
| --------- | ----------------------------------- |
| Category  | system                              |
| Severity  | critical                            |
| Message   | Node `<node-name>` went offline       |
| Threshold | Issued when an HA node goes offline |

| Cause                                             | Troubleshooting Step                                         |
| ------------------------------------------------- | ------------------------------------------------------------ |
| The HA peer node has shut down or stopped running | Verify that the HA peer node is powered on and running. If the node is running verify that the 128T service is running without error by issuing the command `systemctl status 128T`. If the system appears to be running correctly check connectivity between the systems by issuing the PCLI command `show system connectivity` on both nodes. |
| Connectivity between HA nodes is down             | HA node connectivity can be evaluated with the PCLI command `show system connectivity`. If the state to the peer node is not `connected` check the inter node tunnel status by running the PCLI command `show system connectivity internal`. All tunnels to the peer node should report “connected”. If connectivity is down verify links between the systems and if they are up then please contact 128T support. |

------

| Field     | Data                                |
| --------- | ----------------------------------- |
| Category  | system                              |
| Severity  | major                            |
| Message   | Corrupt entitlement certificate received<br/>Invalid entitlement certificate received<br/>Unable to obtain entitlement certificate  |
| Threshold | Certificate failure |

| Cause                                             | Troubleshooting Step                                         |
| ------------------------------------------------- | ------------------------------------------------------------ |
| Unable to read entitlement data from certificate | Ensure that the certificate installed on the system matches the one received from 128 Technology.  Run `install128t` to reinstall the certificate.  If the problem persists, contact customer support to obtain a new certificate. |

------

| Field     | Data                                |
| --------- | ----------------------------------- |
| Category  | system                              |
| Severity  | major                            |
| Message   | SNMP server failure  |
| Threshold | Unable to communicate to SNMP server |

| Cause                                             | Troubleshooting Step                                         |
| ------------------------------------------------- | ------------------------------------------------------------ |
| Network connectivity failure or misconfiguration | Ensure that the SNMP server defined in the configuration is reachable.  Usually this can be determined by issueing a `ping` to the server address.  If the server does not respond, run a packet capture on the interface used for SNMP to observe if traffic is being generated from the 128T upon event generation. |

------

| Field     | Data                                |
| --------- | ----------------------------------- |
| Category  | system                              |
| Severity  | major                            |
| Message   | Restart required.  |
| Threshold | Restart is required for configuration to take effect |

| Cause                                             | Troubleshooting Step                                         |
| ------------------------------------------------- | ------------------------------------------------------------ |
| non-dynamically reconfiguable filed has been edited| Some fields within the 128T configuration is not dynamic and requires a restart of the 128T process to take effect (e.g. forwarding-cores).  From the Conductor Router page, click on the gear icon to issue a restart of the 128T process.  Alternatively, from within the linux shell of the 128T Router, issue `systemctl restart 128T` |

## Events

| Field    | Data                                                         |
| -------- | ------------------------------------------------------------ |
| Category | giid                                                         |
| Severity | info                                                         |
| Message  | DHCP address for interface [`<interface-name>`] has successfully been resolved/renewed |

| Cause                                                        | Troubleshooting Step |
| ------------------------------------------------------------ | -------------------- |
| The DHCP address lease for the interface has been successfully resolved or renewed. | None.                |

------

| Field    | Data                                                      |
| -------- | --------------------------------------------------------- |
| Category | giid                                                      |
| Severity | minor                                                     |
| Message  | DHCP address for interface [`<interface-name>`] has changed |
| Notes    | Issued when the DHCP address changes during a renewal.    |

| Cause                                                  | Troubleshooting Step                                         |
| ------------------------------------------------------ | ------------------------------------------------------------ |
| Occurs when the DHCP address changes during a renewal. | This is just for information purposes and no action is normally needed. |

------

| Field    | Data                                                         |
| -------- | ------------------------------------------------------------ |
| Category | platform                                                     |
| Severity | major                                                        |
| Message  | Offline file `<file-name>` was never completed                 |
| Notes    | Issued when an offline audit file was not closed correctly by the audit log subsystem. This could indicate lost audit logs. |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Occurs when an offline audit file was not closed correctly by the auto log subsystem.<br/>Note: This may indicate lost audit logs. | This event could indicate a disk write failure or a previous improper shutdown of the system. Check the integrity of the system disks using the linux command `fsck`. Ensure that the system is powered down correctly whenever possible. |

------

| Field    | Data                                                         |
| -------- | ------------------------------------------------------------ |
| Category | platform                                                   |
| Severity | major                                                        |
| Message  | External modification of /etc/resolv.conf detected.     |
| Notes    | Issued when the file /etc/resolve.conf is modified by user or code. |

| Cause                                            | Troubleshooting Step                                         |
| ------------------------------------------------ | ------------------------------------------------------------ |
| /etc/resolv.conf is edited | This file is managed by the 128T platform and should not be edited by hand or by an external script or processes. |

------

| Field    | Data                                                         |
| -------- | ------------------------------------------------------------ |
| Category | platform                                                   |
| Severity | major                                                        |
| Message  | Application script on interface `<interface-name>` exited unexpectedly.     |
| Notes    | Issued when the interface plugin script hits an unhandled exception in code.   |

| Cause                                            | Troubleshooting Step                                         |
| ------------------------------------------------ | ------------------------------------------------------------ |
| Application script faults. | If this happens, check the status of the interface on which the script is running.  If the interface is operational and the problem persists, contact customer support. |

------

| Field    | Data                                                         |
| -------- | ------------------------------------------------------------ |
| Category | platform                                                   |
| Severity | major                                                        |
| Message  | Application script on interface `<interface-name>` was restarted after unexpected exit.    |
| Notes    | Application script on interface was restarted.  |

| Cause                                            | Troubleshooting Step                                         |
| ------------------------------------------------ | ------------------------------------------------------------ |
| Application script on interface restarted unexpectedly. | If this happens, check the status of the interface on which the script is running.  If the interface is operational and the problem persists, contact customer support. |

------

| Field    | Data                                                         |
| -------- | ------------------------------------------------------------ |
| Category | redundancy                                                   |
| Severity | major                                                        |
| Message  | Process RedisServer on node `<node-name>` is now active.   |
| Notes    | Issued when the redis process on node assumes leadership |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Leadership for redis process has changed | This may happen if the HA link between nodes has gone down.  Check the availability of both nodes and their respective HA interface status.  If one of the nodes is offline, start the 128T process.  If the node is online, check the interface status. |

------

| Field    | Data                                                         |
| -------- | ------------------------------------------------------------ |
| Category | redundancy                                                   |
| Severity | major                                                        |
| Message  | Process RoutingEngine on node `<node-name>` is now active.   |
| Notes    | Issued when the routing engine process on node assumes leadership |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Leadership for routing engine process has changed | This may happen if the HA link between nodes has gone down.  Check the availability of both nodes and their respective HA interface status.  If one of the nodes is offline, start the 128T process.  If the node is online, check the interface status. |

------

| Field    | Data                                                         |
| -------- | ------------------------------------------------------------ |
| Category | redundancy                                                   |
| Severity | major                                                        |
| Message  | Process SecurityLeader on node `<node-name>` is now active.   |
| Notes    | Issued when the security leader process on node assumes leadership |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Leadership for security leader process has changed | This may happen if the HA link between nodes has gone down.  Check the availability of both nodes and their respective HA interface status.  If one of the nodes is offline, start the 128T process.  If the node is online, check the interface status. |

------

| Field    | Data                                                         |
| -------- | ------------------------------------------------------------ |
| Category | redundancy                                                   |
| Severity | major                                                        |
| Message  | Process AutomatedProvisioner on node `<node-name>` is now active.   |
| Notes    | Issued when the automated provisioner process on node assumes leadership |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Leadership for automated provisioner process has changed | This may happen if the HA link between nodes has gone down.  Check the availability of both nodes and their respective HA interface status.  If one of the nodes is offline, start the 128T process.  If the node is online, check the interface status. |

------

| Field    | Data                                                         |
| -------- | ------------------------------------------------------------ |
| Category | redundancy                                                   |
| Severity | major                                                        |
| Message  | Node `<node-name>` is now active for shared interface          |
| Notes    | Issued when a redundant interface assumes a leadership change. |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Application script on interface was restarted | This event does not necessarily indicate a system error and can occur occasionally due to HA failover events, for example when an interface is taken down for maintenance. This can be reported as a system is started and assumes leadership. If it occurs during runtime, see the sections on related interface alarms (eg: “interface operational down”) for more detailed causes and troubleshooting steps. |
