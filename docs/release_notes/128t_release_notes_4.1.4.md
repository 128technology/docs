---
title: 128T 4.1.4 Release Notes
sidebar_label: 4.1.4
---

## Issues Fixed
- **I95-15146** Large NETCONF client requests can fail to be processed

- **I95-22948** `show ospf` shows incorrect data when OSPF is not configured

- **I95-24724** Jumbo frames are dropped on a KNI interface

- **I95-24811** Maximum network-interface mtu has been reduced to 9198 to avoid fragmentation issues

- **I95-25863** Requesting metrics beyond what is available returns empty data

- **I95-25964** Removed access-policy configuration for dhcp-server

- **I95-26059** Changing a device-interface name will stop pcap capture

- **I95-26079** A system fault can occur if a commit operation is cancelled

- **I95-26089** `show network-interface` can sometimes output no data

- **I95-26199** SVR port range is restricted to 1025-16383.  This has been increased to 1025-65535

- **I95-26237** Custom charts for device-interfaces can have incorrect session count metrics

- **I95-26288** A ping flood can stop future ICMP processing

- **I95-26517** Unable to provision conductor service on a device-interface type of T1

- **I95-26601** MTU configuration on a bridged KNI interface is not dynamically reconfigurable

- **I95-27044** System fault can occur when changing encryption keys

- **I95-27170** Added numerous tranmission stats for DHCP clients

- **I95-27242** Attempting to upgrade a managed router to a version greater than the Conductor fails silently

- **I95-27281** Session migration does not work when a session is initiated from a router with `peer-connectivity=bidirectional` to a router with `peer-connectivity=outbound-only`

- **I95-27328** Unable to execute yum commands on nodes after ztp

- **I95-27339** Sessions for a DHCP relay service can linger, causing subsequent DHCP request failures

- **I95-27371** BGP route reflector can not be disabled by setting `client false`

- **I95-27487** Invalid config produces the message `% Error: Config does not exist in Zookeeper`

- **I95-27521** `forwarding-core-count` is not honored in configuration

- **I95-27536** LTE interfaces that are unable to connect to the carrier's network can cause system instability

- **I95-27540, I95-27943** An erroneous message of `"download timed out, try again"` very shortly after downloading a software upgrade, even though no error occurred

- **I95-27600** T1 interface shows up even if the w1g1ppp is down

- **I95-27601** `show assets` does not show configured asset after changing its asset id

- **I95-27614** When operating in promiscuous mode, the 128T can send ICMP unreachables for dest macs that are not its own

- **I95-27635** Configuring BGP local-as under neighbor causes BGP configuration to not work properly

- **I95-27636** Bandwidth of UDP traffic is displayed incorrectly when traffic shaping is enabled

- **I95-27673** GUI may display `There may be changes waiting to be validated…` after validate with no errors

- **I95-27683** Unable to shutdown BGP peer

- **I95-27708** System can fault when generating `ntpd.conf`

- **I95-27728** sssd restarts when changing user system preferences

- **I95-27730** Node reboots after 128T upgrade when reboot is unnecessary

- **I95-27733** `128status.sh` script has been added to provide detailed 128T system health information

- **I95-27752** Session duplication only works with `security-policy` `hmac-mode` `regular`

- **I95-27763** BGP neighbor local-as is ignored when set to neighbor remote-as

- **I95-27830** System can fault when multiple "first" packets are processed simultaneously

- **I95-27878** Database process can consume large amount of CPU due to internal debugging data.  This database has been removed

- **I95-27889** System can fault on shutdown

- **I95-27899** Router is stuck in the state of "Key Accepted" during assets registration

- **I95-27922** System can fault when flow is selectively deleted from ingress router between two 128T peers with ongoing traffic

- **I95-27925** Sparklines do not show numerical value when time window is greater than 5 seconds

- **I95-27928** Terminal emulators that do not support 256 colors will produce the error `% Error: Unhandled AttributeError: 'NoneType' object has no attribute 'text'` 

- **I95-27937** System can fault when executing `save tech-support-info` on high-end server platforms with greater than 16 cores

- **I95-27940** Asset software version is still displayed after disconnect

- **I95-27953** bgpd process can fault in execution of `show ip bgp neighbor <neighbor-addr> received-routes` when communities match and are configured with a strip policy

- **I95-27959** Unable to initiate install of software after download through the asset page

- **I95-27979** Provisioning a service-route through the GUI allows entry of a service name.  The service name should only provide options from a drop-down of provisioned services.

- **I95-27986** Unable to provision service-route next-hop through GUI

- **I95-28031** Unable to disable generated flag on DHCP relay service

- **I95-28053** Inconsistency between units in spark lines and value on graphs

- **I95-28056** Event History page can result in poor system-wide network performance in large deployments.  The Event History page now requires a selection of a single router from which to obtain event history

- **I95-28060, I95-28380** System can fault when a configuration is applied with active sessions that contain overlapping private IPs

- **I95-28161** GUI displays no service-routes for services that have service-routes

- **I95-28162** Swagger document has wrong placeholders for Clone functions

- **I95-28191** Session optimization feature can cause 100% CPU utilization with low bandwidth

- **I95-28208** ISIS packets generate an exception in `highwayManager.log` files

- **I95-28219** Non-admin users are able to edit and view other users within the GUI

- **I95-28220** `show assets` now displays if an asset never connected

- **I95-28245, I95-28311, I95-28312** Control buffer pool can be exhausted for routers with a large number of peers

- **I95-28271** systemServicesCoordinator process can fault when processing IPC

- **I95-28347** Router upgrade can restart after rebooting a Conductor node before the upgrade completes

- **I95-28351** Invoking `lshw` can cause the system to fault

- **I95-28380** Service validation check not handling implicit /32 address resulting in an application fault

- **I95-28389** Malformed or missing user data store will prevent the 128T from starting

- **I95-28412** System can reinitialize multiple times during initial ZTP process

- **I95-28446** Sessions can be dropped during HA node failover

- **I95-28448** High CPU utilization for prolonged periods of time can induce a split-brain situation

- **I95-28480** Incorrect directory permissions can cause the Conductor-hosted software repository to fault

- **I95-28498** Redirecting output from PCLI show commands to a file produces multiple instances of `Redirecting output...` in the file

- **I95-28510** Patch available icon is shown on assets that are unmanaged

- **I95-28528** An empty option exists in Peer Authority and Router dropdowns

- **I95-28592** GraphQL API has been added for system connectivity status

- **I95-28673** ping command did not display round trip time

- **I95-28691** Large configurations can cause timeouts during processing

- **I95-28694** Import/Export page can fail to load

- **I95-28730** System can fault on receipt of BGP packet to an interface that does not exist

- **I95-28748** When configured for LDAP, users may not be able to login

- **I95-28827** Malformed environment configuration will cause 128T to fail to start

- **I95-28863** PCLI may fail to load resulting in message `% Error: Unhandled UnboundLocalError: local variable 'model' referenced before assignment`

- **I95-29032** In rare cases, the routingManager process can fault processing configuration

- **I95-29042** AWS ENA driver will fault if interface is disabled and then enabled.

## Caveats
- **I95-27946** Commit may fail on Conductor when node in router pair is stopped

  _**Symptom:**_ When performing a commit to a router where one of the nodes is offline, the commit from the Conductor may not respond or may fail. Performing a validate operation a second time may provide the following error response:
  ```
“✖ Validating...
    % Error: Candidate configuration is invalid:
    1. A request of type validate is already in progress”
  ```
  _**Conditions:**_ When a node in the router pair is offline.

  _**Corrective Action:**_ The validate operation is sent from the conductor to the nodes to verify that the configuration is correct. The validate will timeout to the node that is offline. Bring the node back online and perform the operation a second time.


- **I95-27808** `sync peer addresses router force` from conductor may not trigger router to send address information from peer

  _**Symptom:**_ When performing the following command on the Conductor PCLI, `sync peer addresses router force` the router may not provide the peer address information

  _**Conditions:**_ Unknown

  _**Corrective Action:**_ Perform the PCLI command on the router to update the information on the conductor.


- **I95-27722** Alarms for "Peer not reachable" may not clear and will persist after nodes are back and operational

  _**Symptom:**_ Alarms for "peer not reachable" provided in on the Conductor

  _**Conditions:**_ Unknown, seen after system upgrade

  _**Corrective Action:**_ NA, The alarms will clear within 15 minutes.


- **I95-27673** GUI may display changes waiting to be validated after validate with no errors

  _**Symptom:**_ The following message may be displayed
  ```
"There may be changes waiting to be validated..."
  ```

  _**Conditions:**_ When a configuration revert has been performed.

  _**Corrective Action:**_ If validate completes with no errors, the configuration can be committed and will be revalidated before the commit is completed.


- **I95-27944** Network error may cause upgrade to fail and not retry.

  _**Symptom:**_ The following message is provided on the Conductor UI
  ```
“The upgrade failed because: NetworkError when attempting to fetch resource.”
  ```

  _**Conditions:**_ When upgrading the Conductor from the Conductor GUI

  _**Corrective Action:**_ Verify the conductor can reach the 128T repository, once verified to be accessible, perform the upgrade operation again.


- **I95-28766** Conductor PCLI shows configuration change when no changes have been performed

  _**Symptom:**_ Conductor PCLI may incorrectly provide an * that there is a candidate configuration change
  
  _**Conditions:**_ Unknown
  
  _**Corrective Action:**_ None, if the configuration has not changed this indicator can be ignored. A comparison can be performed with `compare config running candidate`


- **I95-29136** Configured PCLI session limit warning not provided

  _**Symptom:**_ Warning not provided when active PCLI session limit is reached

  _**Conditions:**_ When the number of active PCLI sessions is below sessionlimit+2

  _**Corrective Action:**_ Set the session limit to a value 2 less than desired value


- **I95-29134** `save tech-support-info` fails to create tech support file

  _**Symptom:**_ `save tech-support-info` fails with the following error message:
  ```
"Error: Failed to execute the 'save-tech-support-info' RPC: Fatal error creating tarball"
  ```
  _**Conditions:**_ When configuration exports have been saved with spaces it in the name of the exported configuration file

  _**Corrective Action:**_ Remove the saved configuration files with spaces in the name and avoid using spaces when exporting configuration. Note: Exporting configuration files with spaces in the name may be prevented in a future release.
