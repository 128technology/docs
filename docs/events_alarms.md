---
title: Alarms
sidebar_label: Alarms
---

## Asset

| Field     | Data                                                         |
| --------- | ------------------------------------------------------------ |
| Category  | asset                                                        |
| Severity  | critical                                                     |
| Message   | `<node>`.`<router>` has a software version that does not match its peer. |
| Threshold | Issued if any node in a router has mismatched versions. Cleared when they are all equal. |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Multiple nodes configured within one router have different software versions. | Manually upgrade the node that has the lower version. Upgrade the router from the PCLI by issuing the `send command upgrade router <router> <version>` or the upgrade button on the Router page on the Conductor's GUI. |

------

| Field     | Data                                                         |
| --------- | ------------------------------------------------------------ |
| Category  | asset                                                        |
| Severity  | critical                                                     |
| Message   | A duplicate asset with id `<id>` has been detected. Ensure all assets have a unique id and restart salt-minion on asset `<id>`, which is configured as `<node>`.`<router>`. |
| Threshold | Issued if any node being manged by a conductor has the same asset id as another node in the authority. |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Multiple nodes configured within an authority have the same asset id. | Execute `show assets` to identify the `<router>`.`<node>` that has a duplicate ID.  Change the asset id for that node in the Conductor to have a unique id.<br />**Tip:** Clearing the asset-id value will generate a random value. |

------

| Field     | Data                                                         |
| --------- | ------------------------------------------------------------ |
| Category  | asset                                                        |
| Severity  | major                                                        |
| Message   | Asset `<id>`, which is configured as `<node>`.`<router>`, is not running |
| Threshold | Issued when the SSR service stops on a node (must be managed by ZTP). Clears on SSR start. |

| Cause                                                  | Troubleshooting Step                                         |
| ------------------------------------------------------ | ------------------------------------------------------------ |
| SSR is not running on node `<node>` router `<router>` | Start SSR from the Conductor PCLI by entering with `send command start router <router> node <node>` or pressing the start button on the Conductor’s router page in the GUI. If the SSR cannot start check `systemctl status 128T` on that node. |

------

| Field     | Data                                                         |
| --------- | ------------------------------------------------------------ |
| Category  | asset                                                        |
| Severity  | major                                                        |
| Message   | Asset`<id>`, which is configured as `<node>`.`<router>`, failed to install. |
| Threshold | Issued when the SSR install fails on a node (must be managed by ZTP). Clears once SSR is installed. |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| SSR failed to install on node `<node>` router `<router>`, which is asset `<id>` | Issue command `show assets <id>` to see detailed information on why the install failed and follow the instructions to fix the issue and retry the installation. |

------

## bgp_neighbor

| Field     | Data                                                         |
| --------- | ------------------------------------------------------------ |
| Category  | bgp_neighbor                                                     |
| Severity  | major                                                        |
| Message   | Neighbor `<ipaddress>` failed to reach the ESTABLISHED state. |
| Threshold | Issued when the BGP neighbor is not in the ESTABLISHED state. Clears when the BGP neighbor returns to the ESTABLISHED state. |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1. The remote IP address is not reachable due to some network connectivity problem. <br />2. The remote router is not configured to accept a BGP connection. <br />3. The OPEN message exchange fails. | Use the command `show bgp neighbors` and review the content for misconfiguration, state machine connection status, and disconnect failures. |

------

## giid

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

## Interface

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
| The down interface is an LTE interface           | Check that strength and status of the LTE connection by using the `show device-interface router <router name> id <interface id>` command.<br/>• If the signal strength is marginal, poor, or 0 the LTE interface is malfunctioning.<br/>• If the system mode is not listed as LTE the signal is malfunctioning.<br/>• If the Operation Status is down, the LTE interface is malfunctioning.<br/><br/>In the event of the conditions above, contact Juniper. |

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

## Peer

| Field     | Data                                             |
| --------- | ------------------------------------------------ |
| Category  | peer                                             |
| Severity  | critical                                         |
| Message   | Peer `<name>` is not reachable. |
| Threshold | When all paths to a peer are marked down by BFD. |

| Cause                                                 | Troubleshooting Step                                         |
| ----------------------------------------------------- | ------------------------------------------------------------ |
| All “Peer path” alarms to a given peer are triggered. | Review the statistics for `show stats bfd by-peer-path` to investigate for anomolies.<br />Capture packets on the interface(s) that talk to the peer and look for successful UDP traffic to and from the peer at port 1280. |

------

| Field     | Data                                                         |
| --------- | ------------------------------------------------------------ |
| Category  | peer                                                         |
| Severity  | major                                                        |
| Message   | Peer `<name>` path is down                                   |
| Threshold | When a single path is marked down by BFD. The source of the alarm includes the Node/interface/IP/VLAN. |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Router Interface is down.                                    | Enter the show device-interface router `<router>` node `<node>` `<interface>` command to verify the router's interface status. If the interface is down, the next hop equipment is likely down. Troubleshoot the adjacent device(s). |
| Adjacency router's interface is down.                        | Enter the show device-interface router `<router>` command to verify the adjacency router's interface status. If the interface is down, the troubleshoot the adjacent device’s interface. |
| Path health has degraded sufficiently and is impacting performance. | Using the GUI, click the Home icon and select the appropriate view for the current environment. Examine the graph for any anomalies at the time of the alarm. If the loss is 5% or higher the path has degraded. |

------

| Field    | Data                                    |
| -------- | --------------------------------------- |
| Category | peer                                    |
| Severity | major                                   |
| Message  | Peer `<name>` path MTU is unresolvable. |

| Cause                                                        | Troubleshooting Step                             |
| ------------------------------------------------------------ | ------------------------------------------------ |
| Maximum Transmit Unit for packet size is unable to be determined. | Set the MTU for the device-interface statically. |

------

## Platform

| Field    | Data                                        |
| -------- | ------------------------------------------- |
| Category | platform                                    |
| Severity | critical                                    |
| Message  | Security Rekey failed for: `<node-name(s)>` |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Issued when a conductor fails to distribute newly created security keys during rekey process to any managed routers. | Make sure failed nodes are running and have connectivity to the conductor. If the problem still persists please contact Juniper customer support. |

------

| Field    | Data                                        |
| -------- | ------------------------------------------- |
| Category | platform                                    |
| Severity | critical                                    |
| Message  | Security Rekey failed for: `<node-name(s)>` |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Issued when a conductor fails to distribute newly created security keys during rekey process to any managed routers. | Make sure failed nodes are running and have connectivity to the conductor. If the problem still persists please contact Juniper customer support. |

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
| Occurs when 90% or more of the total FIB table is utilized. | The alarm is cleared when 80% or less of the total FIB table is utilized. This may be due to suboptimal configuration or insufficient memory allocated to the SSR software. Contact Juniper support if this alarm persists. |

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

| Field     | Data                                                         |
| --------- | ------------------------------------------------------------ |
| Category  | process                                                      |
| Severity  | major                                                        |
| Message   | Process has exited unexpectedly: `<process-name>`            |
| Threshold | Issued when a SSR system process exits and is cleared when it is successfully restarted |

| Cause                                               | Troubleshooting Step                                         |
| --------------------------------------------------- | ------------------------------------------------------------ |
| Process exits once and restarts to normal operation | The SSR is designed to restart processes in the event of a failure. If this alarm state is only seen briefly and then clears it is likely that the system has self-recovered. Please report to Juniper customer support. |
| Process exits continuously                          | Contact Juniper customer support                                |

------

## System

------

| Field     | Data                                |
| --------- | ----------------------------------- |
| Category  | system                              |
| Severity  | critical                            |
| Message   | Node `<node-name>` went offline     |
| Threshold | Issued when an HA node goes offline |

| Cause                                             | Troubleshooting Step                                         |
| ------------------------------------------------- | ------------------------------------------------------------ |
| The HA peer node has shut down or stopped running | Verify that the HA peer node is powered on and running. If the node is running verify that the SSR service is running without error by issuing the command `systemctl status 128T`. If the system appears to be running correctly check connectivity between the systems by issuing the PCLI command `show system connectivity` on both nodes. |
| Connectivity between HA nodes is down             | HA node connectivity can be evaluated with the PCLI command `show system connectivity`. If the state to the peer node is not `connected` check the inter node tunnel status by running the PCLI command `show system connectivity internal`. All tunnels to the peer node should report “connected”. If connectivity is down verify links between the systems and if they are up then please contact Juniper support. |

------

| Field     | Data                   |
| --------- | ---------------------- |
| Category  | system                 |
| Severity  | critical               |
| Message   | system memory exceeded |
| Threshold | greater than 90%       |

| Cause                                   | Troubleshooting Step                                         |
| --------------------------------------- | ------------------------------------------------------------ |
| Alarm triggers above 90% memory usage | The Alarm resets/clears when memory usage drops below 80%. |
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
| Message   | No connectivity to `<router>`.`<node>`                       |
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
| Alarm triggers above 85% CPU usage for 30 seconds | The alarm clears when the CPU usage drops below 70%. |
| Intermittent process consuming large amount of CPU | If the alarm triggers and clears intermittently this could indicate a periodic load spike or intermittent process workload. Check the current cpu utilization of all processes in the system by using the linux command `top` or the PCLI command `show stats process cpu`. |
| Process consistently consuming large amount of CPU | If the alarm is constantly active this could indicate an under-provisioned system. Check the current cpu utilization of all processes in the system by using the linux command `top` or the PCLI command `show stats process cpu`. Contact Juniper support for guidance on provisioning the system. |

------

| Field     | Data                                                         |
| --------- | ------------------------------------------------------------ |
| Category  | system                                                       |
| Severity  | major                                                        |
| Message   | Received config sync info state for node `<node-name>` with syncVersion=`<version>`, error=`<error>`, message=`<message>` and resulting action=`<action>` |
| Threshold | Configuration synchronization error                          |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| The router is unable to receive the configuration from the Conductor | Run the command `show asset <asset-id>` of the system exhibiting the problem.  This will return the status of the asset and provide more detailed information regarding the nature of the problem. |

------

| Field     | Data                                      |
| --------- | ----------------------------------------- |
| Category  | system                                    |
| Severity  | major                                     |
| Message   | Hostname [`<hostname>`] is unresolved     |
| Threshold | When a configured hostname is unresolved. |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| The router was unable to resolve the hostname given in the config | Verify that the hostname is resolvable from linux using a utility like `dig`. Verify that the hostname has a corresponding /etc/hosts entry |

------

| Field     | Data                                                         |
| --------- | ------------------------------------------------------------ |
| Category  | system                                                       |
| Severity  | major                                                        |
| Message   | No active NTP server                                         |
| Threshold | Issued when the system is not connected to any active NTP servers. |

| Cause                                                        | Troubleshooting Step                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| The router is having connectivity problems to the NTP server that was selected. | Specify NTP server(s) to connect to. From PCLI, “configure authority router `<router name>` system ntp server `<ntp server address>`”.<br/>Make this more resilient by specifying more NTP servers. A common practice is to specify 4 servers. |

------

| Field     | Data                                                         |
| --------- | ------------------------------------------------------------ |
| Category  | system                                                       |
| Severity  | major                                                        |
| Message   | Corrupt entitlement certificate received<br/>Invalid entitlement certificate received<br/>Unable to obtain entitlement certificate |
| Threshold | Certificate failure                                          |

| Cause                                            | Troubleshooting Step                                         |
| ------------------------------------------------ | ------------------------------------------------------------ |
| Unable to read entitlement data from certificate | Ensure that the certificate installed on the system matches the one received from Juniper.  Run `install128t` to reinstall the certificate.  If the problem persists, contact customer support to obtain a new certificate. |

------

| Field     | Data                                 |
| --------- | ------------------------------------ |
| Category  | system                               |
| Severity  | major                                |
| Message   | SNMP server failure                  |
| Threshold | Unable to communicate to SNMP server |

| Cause                                            | Troubleshooting Step                                         |
| ------------------------------------------------ | ------------------------------------------------------------ |
| Network connectivity failure or misconfiguration | Ensure that the SNMP server defined in the configuration is reachable.  Usually this can be determined by issueing a `ping` to the server address.  If the server does not respond, run a packet capture on the interface used for SNMP to observe if traffic is being generated from the SSR upon event generation. |

------

| Field     | Data                                                 |
| --------- | ---------------------------------------------------- |
| Category  | system                                               |
| Severity  | major                                                |
| Message   | Restart required                                    |
| Threshold | Restart is required for configuration to take effect |

| Cause                                               | Troubleshooting Step                                         |
| --------------------------------------------------- | ------------------------------------------------------------ |
| Non-dynamically reconfiguable filed has been edited | Some fields within the SSR configuration are not dynamic and requires a restart of the SSR process to take effect (e.g. forwarding-cores).  From the Conductor Router page, click on the gear icon to issue a restart of the SSR process.  Alternatively, from within the linux shell of the SSR Router, issue `systemctl restart 128T` |

------

| Field     | Data                                                 |
| --------- | ---------------------------------------------------- |
| Category  | system                                               |
| Severity  | minor                                                |
| Message   | Application Identification cache utilization is approaching maximum capacity  |
| Threshold | Fires at 95% of `max-capacity` value (default is 10,000) |

| Cause                                               | Troubleshooting Step                                         |
| --------------------------------------------------- | ------------------------------------------------------------ |
| Capacity of the cache exceeds 95% of the `max-capacity` configured value | The alarm is cleared once the capacity of the 
cache goes below 85% of the configured value, and as sessions using those stats expire. The alarm can be addressed by adjusting the `max-capacity` value under `application-identification`. App-id stats are tracked per application, per client, and per next-hop. The granularity of per-application, per-client traffic stats will be reduced while the alarm is active on the system. |
