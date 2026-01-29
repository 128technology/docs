--- 
title: SSR Alarms
sidebar_label: SSR Alarms
---


## Alarm Severity Level: Critical

| Category | Description | Cause | Troubleshooting |
|----------|-------------------|-------------|-----|
| System | System memory exceeded: `{threshold}%`. | System memory is above 90% memory usage. The alarm clears when memory usage drops below 80%.<br /><br />**Threshold:** 90%. | A process is consuming excessive memory. If the alarm is constantly active this could indicate an under-provisioned system. Check the current memory utilization of all processes in the system by using the linux command `top`. Additionally the PCLI command `show stats process memory rss` may be helpful.|
| System | ZooKeeper jute buffer utilization is `{utilization}`%, which exceeds the alarm threshold. | **Threshold:** 75%. | System environment configuration should be updated. Contact technical support for assistance. |
| System | Node `{node}` with version `{nodeVersion}` does not match the HA peer with version `{peerVersion}`. |||
| System | Unable to communicate with Chassis Manager. | SSR4x0 series only. ||
| System | The following chassis sensor(s) are approaching critical temperatures: `{sensors}`. | SSR4x0 series only. | System performance has been throttled to mitigate heat. The system will shut down if the temperature continues to rise. |
| System | Node `{node}` went offline. | The HA peer node has shut down or stopped running.<br /><br />**Threshold:** Issued when an HA node goes offline. | Verify that the HA peer node is powered on and running. If the node is running verify that the SSR service is running without error by issuing the command `systemctl status 128T`. If the system appears to be running correctly, check connectivity between the systems by issuing the PCLI command `show system connectivity` on both nodes. |
| System | Node `{node}` went offline. | Connectivity between HA nodes is down.<br /><br />**Threshold:** Issued when an HA node goes offline. | HA node connectivity can be evaluated with the PCLI command `show system connectivity`. If the state to the peer node is not `connected` check the inter node tunnel status by running the PCLI command `show system connectivity internal`. All tunnels to the peer node should report “connected”. If connectivity is down, verify links between the systems. If they are up, please contact technical support. |
| System | `{node}`: Internal Synchronization database is disconnected. | | Verify connectivity between HA nodes is healthy. Check for additional related alarms. If connectivity is present, please contact technical support for additional assistance.|
| Peer | Peer `{peer}` is not reachable. | When all paths to a peer are marked down by BFD, all peer path alarms to that peer are triggered. | Review the statistics for `show stats bfd by-peer-path` to investigate for anomolies.<br />Capture packets on the interface(s) that talk to the peer and look for successful UDP traffic to and from the peer at port 1280. |
| Peer | Peer `{peer}` certificate is invalid: `{state}` - `{detail}`. ||
| Peer | Peer `{peer}` metadata-key is invalid: `{state}` - `{detail}`. ||
| Peer | The following certificates are expired: `{value}`. ||
| Peer | The following certificates are revoked: `{value}`. ||
| Platform | Security Rekey failed for: `<node-name(s)>`. | Issued when a conductor fails to distribute newly created security keys during rekey process to any managed routers. | Make sure failed nodes are running and have connectivity to the conductor. If the problem persists, please contact technical support. |
| Platform | Configure security key distribution failed for: `{configKeyError}`. | | |
| Interface | Intf `{name}` (`{interface}`) operationally down. | Interface is down for an Ethernet WAN connection. | The next hop networking equipment is down. Troubleshoot by checking for link status on adjacent equipment, adjacent switch ports, etc. |
| Interface | Intf `{name}` (`{interface}`) operationally down. | Interface is down for an HA or LAN connection. | The next hop networking equipment is down. Troubleshoot by checking for link status on adjacent equipment, adjacent switch ports, etc. |
| Interface | Intf `{name}` (`{interface}`) operationally down. | The down interface is an LTE interface. | Check that strength and status of the LTE connection by using the `show device-interface router <router name> id <interface id>` command.<br/>- If the signal strength is marginal, poor, or 0, the LTE interface is malfunctioning.<br/>- If the system mode is not listed as LTE the signal is malfunctioning.<br/>- If the Operational Status is down, the LTE interface is malfunctioning.<br/><br/>In the event of the conditions above, contact technical support. |
| Interface | Intf `{name}` (`{interface}`) provisionally down. | The interface is down due to being disabled in the configuration. | Re-enable the interface in the configuration. |
| Asset | `<node>`.`<router>` has a software version that does not match its peer. | Multiple nodes configured within one router have different software versions.<br/>Issued if any node in a router has mismatched versions. Cleared when they are all equal. | Upgrade the node that has the lower version. Upgrade the router from the PCLI by issuing the `send command upgrade router <router> <version>` or the upgrade button on the Router page on the Conductor's GUI. |
| Asset | A duplicate asset with ID ‘`{node}`’`{router}` has been detected. | Multiple nodes configured within an authority have the same asset id. <br/>Issued if any node being manged by a conductor has the same asset id as another node in the authority. | Ensure all assets have a unique ID and restart salt-minion on asset `{node}`, which is configured as `{node}`.`{router}`. <br />Execute `show assets` to identify the `<router>`.`<node>` that has a duplicate ID. Change the asset-id for that node in the Conductor to have a unique id.<br />**Tip:** Clearing the asset-id value will generate a random value. |


## Alarm Severity Level: Major

| Category | Description | Cause | Troubleshooting |
|----------|-------------------|-------------|-----|
| System | Host CPU utilization exceeded. | **Intermittent process consuming large amount of CPU.** <br/>**Threshold:** Greater than 85% for 30 seconds. The alarm clears when the CPU usage drops below 70%. | If the alarm triggers and clears intermittently this could indicate a periodic spike or intermittent process overload. Check the current CPU utilization of all processes in the system by using the linux command `top` or the PCLI command `show stats process cpu`. |
| System | Host CPU utilization exceeded. | **Process consistently consuming large amount of CPU.** <br/>**Threshold:** Greater than 85% for 30 seconds. The alarm clears when the CPU usage drops below 70%. | If the alarm is constantly active this could indicate an under-provisioned system. Check the current CPU utilization of all processes in the system by using the linux command `top` or the PCLI command `show stats process cpu`. Contact technical support for guidance on provisioning the system. | 
| System | No active NTP server. | Issued when the system is not connected to any active NTP servers. The router is having connectivity problems to the NTP server that was selected. | Use `show ntp` to verify the NTP server(s) has been configured. If not, use `configure authority router <router name> system ntp server <ntp server address>` to configure the NTP server.<br/>Make this more resilient by specifying more NTP servers. A common practice is to specify 4 servers. |
| System | Disk space usage exceeds: `{threshold}`%. | Disk usage is high. <br/>**Threshold:** 90%.  | Use standard Linux tools such as “df” and “ls” to determine which files are consuming large amounts of disk space. In the event that there are unneeded files, they should be removed. |
| System | Restart is required for configuration to take effect. | Non-dynamically reconfiguable file has been edited. | Some fields within the SSR configuration are not dynamic and require a restart of the SSR process to take effect (e.g. forwarding-cores). From the Conductor Router page, click on the gear icon to issue a restart of the SSR process. Alternatively, from within the linux shell of the SSR Router, issue `systemctl restart 128T`. |
| System | The following accounts have default passwords and must be updated with a strong user selected password: `{users}`. | Default password detected. | Default passwords present a security risk. These must be updated with a strong user selected password. |
| System | Corrupt entitlement certificate received. | Certificate failure. Unable to read entitlement data from certificate. | Ensure that the certificate installed on the system matches the one received from Juniper. Run `install128t` to reinstall the certificate. If the problem persists, contact technical support to obtain a new certificate. |
| System | Invalid entitlement certificate received. | Certificate failure. Unable to read entitlement data from certificate. | Ensure that the certificate installed on the system matches the one received from Juniper. Run `install128t` to reinstall the certificate. If the problem persists, contact technical support to obtain a new certificate. |
| System | Unable to obtain entitlement certificate. | Certificate failure. Unable to read entitlement data from certificate. | Ensure that the certificate installed on the system matches the one received from Juniper. Run `install128t` to reinstall the certificate. If the problem persists, contact technical support to obtain a new certificate. |
| System | Unknown entitlement certificate error. | Certificate failure. Unable to read entitlement data from certificate. | Ensure that the certificate installed on the system matches the one received from Juniper. Run `install128t` to reinstall the certificate. If the problem persists, contact technical support to obtain a new certificate. |
| System | (SSR4xx-series only). The following chassis sensor(s) have exceeded their recommended temperature thresholds: `{sensors}`. | System performance will degrade if the temperature continues to rise. | Investigate environment, check system thresholds. |
| System | No connectivity to `<router>`.`<node>`.  | **The node is not reachable by the conductor.**<br/>**The node is not reachable by its HA peer.** <br/>Raised when a connection to a node present in the configuration fails or is not active.  | Enter the commands:<br/> `show system connectivity router all node all grep \<router\>`<br/>`show system connectivity internal node all grep \<router\>` to check connectivity status. If any entry is listed as not connected, there is a communication issue between the node and the conductor. Some probable causes are outage, degradation, or improperly configured public keys. |
| System | SNMP server failure. | Unable to communicate with the SNMP server. Network connectivity failure or misconfiguration. | Ensure that the SNMP server defined in the configuration is reachable; issue a `ping` to the server address. If the server does not respond, run a packet capture on the interface used for SNMP to observe if traffic is being generated from the SSR upon event generation. |
| System | Configuration synchronization state unknown. | |  |
| System | Not synchronizing with a Conductor. | | Check connectivity to conductor; `show system connectivity`. |
| System | Configured as Conductor.	| | |
| System | Successfully committed configuration update from conductor. | | |
| System | Configuration received from conductor. | | |
| System | Unable to handle configuration request from Conductor. |||
| System | Received configuration update from conductor but unable to commit. | | |
| System | Received configuration from conductor but unable to commit due to local override. | A local override has been definied on the router. This prevents any conductor initiated configuration changes. | If you believe this to be an error, review your local override configuration. |
| System | Failed to parse configuration from conductor. |  | Verify whether the conductor and routers are running a compatible software release. If not, upgrade where appropriate. If they are and the issue persists, please contact technical support. |
| System | Failed to load configuration from conductor with router's datamodel. |  | Verify whether the conductor and routers are running a compatible software release. If not, upgrade where appropriate. If they are and the issue persists, please contact technical support. |
| System | Configuration provided by conductor does not pass local validation. |  | Verify whether the conductor and routers are running a compatible software release. If not, upgrade where appropriate. If they are and the issue persists, please contact technical support. |
| System | Conductor does not have configuration for this router. |||
| System | Awaiting configuration from Conductor. |||
| System | Configuration is out of sync with conductor. |||
| System | Hostname [`{hostname}`] is unresolved. | The router was unable to resolve the hostname given in the configuration. <br/>**Threshold:** Raised when a configured hostname is unresolved. | Verify that the hostname is resolvable from linux (using a utility such as `dig`). Verify that the hostname has a corresponding `/etc/hosts` entry. |
| Peer | Peer `{peer}` path is down. | **Router Interface is down.** <br/>A single path is marked down by BFD. The source of the alarm includes the Node/interface/IP/VLAN.  | Enter the show device-interface router `<router>` node `<node>` `<interface>` command to verify the router's interface status. If the interface is down, the next hop equipment is likely down. Troubleshoot the adjacent device(s). |
| Peer | Peer `{peer}` path is down. | **Adjacency router's interface is down.** <br/>A single path is marked down by BFD. The source of the alarm includes the Node/interface/IP/VLAN.  | Enter the show device-interface router `<router>` command to verify the adjacency router's interface status. If the interface is down, the troubleshoot the adjacent device’s interface. |
| Peer | Peer `{peer}` path is down. | **Path health has degraded sufficiently and is impacting performance.**  <br/>A single path is marked down by BFD. The source of the alarm includes the Node/interface/IP/VLAN. | Using the GUI, click the Home icon and select the appropriate view for the current environment. Examine the graph for any anomalies at the time of the alarm. If the loss is 5% or higher the path has degraded. |
| Peer | The following certificates are expiring in less than 7 days: `{value}`. | A valid certificate must be obtained from a Certificate Authority before valid secure communication can take place. | Verify certificate key exchange values. The `security metadata-key regenerate` command can be issued to force the active node to immediately regenerate the metadata key. |
| Peer | Peer `{name}` path MTU is unresolvable. | Maximum Transmit Unit for packet size is unable to be determined. | Set the MTU for the device-interface statically. |
| Platform | Application script on interface `{name}` exited unexpectedly. || This should not happen if there is no software or hardware defect and the systems were properly sized. Please contact technical support. |
| Platform | Application script on interface `{name}` was restarted after unexpected exit. |||
| Platform | External modification of `{resolvConfPath}` detected. |||
| Platform | Data plane CPU exceeded: `{threshold}`% | **Threshold:** 85%.| Verify enough cores are allocated to support the forwarding traffic this router handles. Contact technical support for assistance. |
| Platform | Traffic Engineering CPU exceeded: `{threshold}`% | **Threshold:** 85%. | Verify enough cores are allocated to support the forwarding traffic this router handles. Contact technical support for assistance. |
| Platform | `{table}` capacity exceeded: `{threshold}`% | The tables include: Flow, FIB, Action, ARP, Source Tenant, Access Policy. <br/>**Threshold:** 95%. | The alarm is cleared when 80% or less of the total table is utilized. This may be due to suboptimal configuration or insufficient memory allocated to the SSR software. Contact technical support if this alarm persists. |
| Platform | Metrics collection is taking more than 90% of the configured sample period. |||
| Platform | Offline file `{filepath}` was never completed. |||
| Asset | Asset ‘`{source}`’, which is configured as ‘`{node}`.`{router}`’, is not running. | SSR is not running on node `<node>` router `<router>`.<br/>The SSR service has stopped on a node (must be managed by ZTP). Clears on SSR start.  | Start SSR from the Conductor PCLI by entering `send command start router <router> node <node>` or pressing the start button on the Conductor’s router page in the GUI. If the SSR cannot start check `systemctl status 128T` on that node. |
| Asset | Asset ‘`{source}`’, which is configured as ‘`{node}`.`{router}`’, failed to install. | SSR failed to install on node `<node>` router `<router>`, which is asset `<id>`.<br/>Issued when the SSR install fails on a node (must be managed by ZTP). Clears once SSR is installed. | Issue command `show assets <id>` to see detailed information on why the install failed and follow the instructions to fix the issue and retry the installation. |
| GIID | DHCP address for interface [`<interface name>`] has not been resolved. | Issued when DHCP address for interface is unresolved. Interface configured to obtain address dynamically using DHCP but was not able to acquire one in time. | Ensure the interface is operationally up. <br/>Ensure the interface is connected to a network with a DHCP server and the server will accept the node’s request for DHCP address.<br/>Collect the DHCP statistics to check for any failures.<br/>Collect packet traces on the DHCP interface to investigate any protocol level failures. |
| Redundancy | Process `{process}` on node `{node}` is now active. | handleProcessLeaderChange ||
| Redundancy | Node `{node}` is now active for shared interface. | handleInterfaceLeaderChange ||
| Service | `{node}`: SessionProc CPU usage alarm. | | |
| Process | Process has exited unexpectedly: `{eventProcess}`. | Process exits once and restarts to normal operation.<br />Issued when a SSR system process exits and is cleared when it is successfully restarted. | The SSR is designed to restart processes in the event of a failure. If this alarm state is only seen briefly and then clears it is likely that the system has self-recovered. Please report to technical support.<br />If the process exits continuously, contact technical support. |
| BGP Neighbor | Neighbor `{source}` failed to reach established state. | 1. The remote IP address is not reachable due to some network connectivity problem. <br />2. The remote router is not configured to accept a BGP connection. <br />3. The OPEN message exchange fails. <br />Issued when the BGP neighbor is not in the ESTABLISHED state. Clears when the BGP neighbor returns to the ESTABLISHED state.  | Use the command `show bgp neighbors` and review the content for misconfiguration, state machine connection status, and disconnect failures. |
| MSDP Neighbor | Neighbor `{source}` failed to reach established state. | 1. The remote IP address is not reachable due to some network connectivity problem. <br />2. The remote router is not configured to accept a MSDP connection. <br />3. The OPEN message exchange fails. <br />Issued when the MSDP neighbor is not in the ESTABLISHED state. Clears when the MSDP neighbor returns to the ESTABLISHED state. | Use the command `show msdp neighbors` and review the content for misconfiguration, state machine connection status, and disconnect failures. |

## Alarm Severity Level: Minor

| Category | Description | Cause | Troubleshooting | 
|----------|-------------------|-------------|-----|
| System | The following CRL endpoints are unreachable: `{endpoints}`. |||
| Peer | The following certificates are expiring in less than 30 days: `{value}`. |||
| Interface | VRRP backup into `{interface}` taken over as primary. |||
| Interface | Backup into `{interface}` taken over as primary. |||
| Giid | DHCP address for interface [`{name}`] has changed to `{ipAddress}`. |||


## Alarm Severity Level: Info

| Category | Description | Cause | Troubleshooting |
| --- | --- | --- | --- |
| System | Application Identification cache utilization is approaching maximum capacity.
| System | SourceNat ports reserve has been depleted for `{key}`, ports will be exhausted soon.
| System | SourceNat ports reserve has reached 10% level for `{key}`.
| System | WayPoint ports reserve has been depleted for `{key}`, ports will be exhausted soon.
| System | WayPoint ports reserve has reached 10% level for `{key}`.
| System | Alarm shelving status changed.
| Interface | Intf `{name}` (`{interface}`) administratively down.
| Giid | DHCP address for interface [`{name}`] has successfully been resolved/renewed to `{ipAddress}`.
| Service | Service path on node `{node}` with key `{key}` is taken out of service.
