---
title: Events
sidebar_label: Events
---

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
