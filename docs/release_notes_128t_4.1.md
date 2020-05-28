---
title: 128T 4.1 Release Notes
sidebar_label: 4.1
---

## Release 4.1.10

### Issues Fixed

- **I95-30610** RTP is not properly classified for subsequent 128T routers
------
- **I95-33279** Path MTU discovery unresolvable when no ICMP is generated
------
- **I95-34058** Session setup fails for paths configured as `outbound-only` when first packet of a flow exceeds MTU (typically UDP)
------
- **I95-34068** SVR sessions fail to establish due to waypoint allocation failures after HA node failover.

  _**Symptom:**_ The following warning log is generated:

  ```
  Mar 03 09:25:10.813 [HWMC| – ] WARN (icmpManager ) Base Exception: failed to allocate ports for WayPoint; intf=5.0; local=192.0.2.100; remote=198.51.100.128
  ```

  Until the system is upgraded to 4.1.10, this issue can be mitigated by removing the corresponding adjacency configuration and adding it back.
------
- **I95-34090** A network-interface configured with multiple neighborhoods, where one of the neighborhoods defines a port range, will result in traffic being dropped on the defined range

  _**Symptoms:**_ SVR traffic is dropped when destined for a port range configured on its peer 128T router's neighborhood
------
- **I95-34158** Modifying a port-range configuration value to include an overlapping range results in a list with an incorrect range.

  _**Conditions:**_ An existing range list is modified to include an overlapping range

  Until the system is upgraded to 4.1.10, this issue can be mitigated by entering a unique range of values that do not overlap.
------
- **I95-34310** Secure fields from the 128T configuration are in the commit audit events from config diff operations.
------
- **I95-34744** highway process can fault when a DHCP server assigns the IP address 0.0.0.0 to the 128T router

## Release 4.1.9

### Issues Fixed

- **I95-35138** A vulnerability in the SaltStack code allows for unauthenticated salt-minions to execute any script on the salt-master.
  :::info
  This fix is required only on the 128T Conductor.
  :::

## Release 4.1.8

:::note
The 4.1.8 release is a superset of the 4.1.7 release. Features and corrections in the 4.1.7 release are not provided in these release notes. Please refer to the [4.1.7 release notes](#release-417) for further information.
:::

### Issues Fixed

- **I95-18857** Support for automatic loopback has been added to Sangoma T1 devices
------
- **I95-33536** Fixed highway abort condition on shutdown with large number of peer paths

  _**Symptom:**_ highwayManager process aborts on shutdown or restart

  _**Conditions:**_ 128T router with greater than 2500 active peer paths restarted with `systemctl restart 128T`

  _**Corrective Action:**_ None required, system will automatically recover.
------
- **I95-33485** Upgrading a HA node of a 128T router can result in traffic being dropped

  _**Symptom:**_ Existing traffic for some services is blackholed during upgrade

  _**Corrective Action:**_ Complete upgrade of both nodes or restart non-upgraded 128T
------
- **I95-33323** highwayManager process can fault on processing DNS responses for services with addresses defined as FQDN

  _**Symptom:**_ Traffic stops forwarding while process restarts

  _**Corrective Action:**_ This condition is rare and is exacerbated by DNS responses that change for the same request.  Typically the order of the A records have changed for load balancing purposes.  This can be mitigated by ensuring the DNS responses are consistent, or removing the FQDN from the service configuration.
------
- **I95-33296** Removing a redundant device-interface and its corresponding redundancy-group as part of the same commit will cause the commit operation to fail.

  _**Symptom:**_ Unable to commit configuration changes

  _**Corrective Action:**_ Perform two commit operations.  The first commit must be to remove the redundancy-group.
------
- **I95-32843** System can fault when routing loop is created with OSPF and BGP

  _**Symptom:**_ highwayManager process faults after configuration is loaded.

  _**Corrective Action:**_ Restore existing configuration to remove routing loop created by OSPF.

## Release 4.1.7

:::note
The 4.1.7 release is a superset of the 4.1.6 release. Features and corrections in the 4.1.6 release are not provided in these release notes. Please refer to the [4.1.6 release notes](#release-416) for further information.
:::

### Issues Fixed

- **I95-31170** NodeMonitor Application fault on shutdown.
------
- **I95-32449,I95-25567,I95-31060,I95-31675**  failed to reserve ports for WayPoint resulting in loss of traffic


## Release 4.1.6

:::note
The 4.1.6 release is a superset of the 4.1.5 release. Features and corrections in the 4.1.5 release are not provided in these release notes. Please refer to the [4.1.5 release notes](#release-415) for further information.
:::

### Issues Fixed

- **I95-21979** An ethernet interface with DHCP enabled cannot be created from GUI. Validation does not pass and throws the error: `"There must be at least one address configured when type is not pppoe and dhcp is disabled"`.
------
- **I95-25553** Disabling and re-enabling a service is not real time configurable and required a restart of the 128T service.
------
- **I95-25984, I95-32181** Power outage may result in a zero byte global.init file, rendering 128T unable to start
------
- **I95-26634** BGP routes are not updated when VLANed interface is operationally down
------
- **I95-28103** After a restart of the highway process, any interfaces that were managed by 128T that were not gracefully restored, now provide detailed logging information regarding their state and corresponding transition.
------
- **I95-28535** Unable to obtain DHCP lease after redundant interface state transitions back to operationally up
------
- **I95-29115** service-route / max-sessions is not real-time configurable and requires a restart of the 128T service
------
- **I95-29741** Salt connection between Router and Conductor may not reestablish on a connection failure
------
- **I95-29811** Session created with a non-standard protocol (e.g. security audits performing "fuzzing") can cause flows to never be deleted and exhaust the flow table
------
- **I95-29812** Service ping does not work with `peer-connectivity` set to `outbound-only` between 128T routers
------
- **I95-29821** Packet fragmentation for SVR paths is larger than configured MTU by the L4 packet header size
------
- **I95-29990** When a KNI interface starts as operationally down, the state remains the default of unknown and never transition to down.
------
- **I95-30002** Service route generation skipped for generation set to true if another service with the same name is set to generation false
------
- **I95-30078, I95-30268** Traffic does not switch to standby interface on management path communication failure 
------
- **I95-30315** DHCP Server fails to start after system power failure and power recovery
------
- **I95-30327** On peer path failure, peer path may remain down if going through a nat to get to the remote peer
------
- **I95-30334** Shared interfaces can operate with both interfaces on each HA nodes as active (each acting in standalone mode)
------
- **I95-30354, I95-30687** admin user or 128t-admin group missing after upgrade
------
- **I95-30383** Connection error to node may result in configuration not being applied
------
- **I95-30401** Asset remains in pending state on initialization if the connection is terminated during pending state operations
------
- **I95-30448** Application module retry interval takes an extended time after a failure. With this correction, if a failure is encountered the retries will start at 60 minutes and increase exponentially for each subsequence failure after the second failure.
------
- **I95-30734** "worker-core packet-processing-utilization" would show 100% due to improper handling of unidirectional flows when packet-retransmission feature is enabled
------
- **I95-30742** Incorrect packet fragmentation when first packet is a jumbo packet
------
- **I95-30781** Warning not provided when neighborhood does not have an end port range
------
- **I95-30833** BGP over SVR neighbor not connecting due to missing route
------
- **I95-30934** Services with matching tenants and protocols with port ranges ending in 65535 may result in services failing.
------
- **I95-31005** 128T does not safely handle the case where a DHCP server provides a client lease with an address of 0.0.0.0
------
- **I95-31200** BGP timer configuration is not dynamically configurable
------
- **I95-31208** continuous configuration updates do to network anomalies lead to increased memory usage
------
- **I95-31232** Highway application may fault during network port scanning of the router
------
- **I95-31244** When a pinhole session is restored upon failover, if the routing table is not up-to-date, the packet will incorrectly be routed to the same interface from which it came from.
------
- **I95-31251** Peer intermittently does not recover after system restart
------
- **I95-31255** Intermittently managed routers may send a `"No connectivity"` alarm to the Conductor
------
- **I95-31333** highwayManager application fault during multiple interface state transitions
------
- **I95-31515** highwayManager application faults if no paths are available for session duplication
------
- **I95-31570** Changing the order of custom charts can sometimes render the dashboard page inoperable
------
- **I95-31742** routingManager application can fault when a device interface is removed
------
- **I95-32065** NAPT translation does not work with for a service-route with a next-hop
------
- **I95-32257** Router behind a NAT not peering after upgrade


## Release 4.1.5

### Product Enhancements

#### Overlapping IP address support for adjacencies

Prior versions of the 128T software did not support two routers with the same WAN IP address communicating with common infrastructure. The most common manifestation of this issue is when two routers both share the same private IP address (e.g., 192.168.1.100) and are peering with the same head end router. In this scenario, the head end router cannot disambiguate between the two devices, which may lead to routing issues (e.g., traffic intended for one location may be sent to another location with the same address). It is for this reason that large-scale projects were discouraged/prevented from using private IP addresses, due to the high likelihood of IP collision.

### Issues Fixed

- **I95-30078** - HA node communication failure results in two systems both taking control of a shared (redundant) interface
  
  _**Symptom:**_ Traffic egressing a highly available device may get pinned to the wrong node in a highly available pair.
  
  _**Mitigation (pre-4.1.5):**_ Manually purge specific traffic flows that are pinned to the wrong node, to allow them to regenerate.
------
- **I95-30387** - ‘path MTU is unresolvable' alarm after 128T restart or BFD link erroneously shows 100% packet loss when device is behind a NAT
  
  _**Symptom:**_ when two 128T devices communicate with one another and there is an intervening NAT device (as is common in LTE networks), the path will show 100% packet loss for various NAT types.
  
  _**Mitigation (pre-4.1.5):**_ this problem was introduced in 4.1.5-1 and fixed in 4.1.5-2.
------
- **I95-25787** Overlapping IP address support for adjacencies (See [Special Considerations](#special-considerations))
------
- **I95-27406** Ctrl-c does not terminate PCLI tab completion
------
- **I95-28337** When two HA systems have a temporary disconnection between one another, it may prevent administrative (PCLI) logins.
------
- **I95-29135** A 128T node may permanently lose "asset" connectivity to Conductor in the wake of a connection failure. The asset connectivity affects the Conductor's ability to remotely start/stop/upgrade a 128T router, but does not impact other administrative functions.
------
- **I95-29136** The PCLI now warns users logging in if their login exceeds the recommended number (4).
------
- **I95-29173** Tab complete produced unexpected output at various places within the PCLI.
------
- **I95-29188** Performance improvements for distributing large configurations from Conductor to routers
------
- **I95-29206** Routers establish connections to the Conductor in a way that avoids "thundering herd" problems
------
- **I95-29217** Inaccurate "There are changes waiting to be validated. Click the validate button to refresh the list." message in the configuration section of the conductor UI
------
- **I95-29238** Entering new configuration with non-interactive commands result in configuration not being applied.
------
- **I95-29252** Reconfiguring VLANs on interfaces would occasionally require a restart of 128T software.
------
- **I95-29278** Revertible path failover can sometimes not revert a session. This would cause a device to continue to use a secondary path in the event that a primary path fails, traffic is migrated to the secondary path, but later the primary path is restored.
------
- **I95-29282, I95-27182** Restart of the standby conductor node may impact administrative access to active Conductor node for up to 10 minutes.
------
- **I95-29283** The system's ARP table size now corresponds to the number of peering routers. This prevents ARP table overflow issues that may cause outages as nodes can no longer communicate with one another.
------
- **I95-29289** Certain dual failure conditions could result in a redundant interface being inactive on both nodes in a highly available pair. This could occur, for example, if one node was rebooted and its counterpart had a software failure (crash) before the first node was able to resynchronize completely. This would previously require a reboot to restore.
------
- **I95-29364** Node not transitioning from starting state on initial deployment. This affects the time to turn up a new system due to an extra restart being required.
------
- **I95-29367** Application can fault when administratively disabling a T1 Interface, requiring a software restart.
------
- **I95-29377** Application can fault when disabling an interface that is configured for DHCP, requiring a software restart.
------
- **I95-29430** Fixed a cosmetic issue when a progress indicator remained during a configuration commit action that resulted in validation errors.
------
- **I95-29688** An internal software communication failure resulted in the PCLI command 'show system' showing partial data.
------
- **I95-29841** Two services (routes) with the same IP address, where one has a security policy assigned and another does not, may cause an application fault when traffic hits that security policy. This would result in full traffic loss until the application restarted (approx. 30 seconds).
------
- **I95-29744** Restart of a node may result in failed sessions, requiring rebooting the counterpart node to restore service. This has only been observed during upgrade scenarios.
------
- **I95-30857** BGP routes not being updated after a large number of peer path state changes in conjunction with a configuration change. This may result in the 128T from advertising future route updates.
------
- **I95-30845** FIB entries become invalid after race condition with simultaneous configuration change and routing updates, resulting in routing failure.
------
- **I95-30598** Automated Provisioner issues continuous salt minion restarts for a node in a disconnected state, resulting in unnecessary reattempts.
------
- **I95-30424** With BGP, there exists a race condition on startup that results in FIB entries missing some routes, resulting in routing failure.
------
- **I95-30143** High state is applied to nodes when configuration has changed, causing unnecessary Conductor to router communication.  This has been changed to only apply high state when necessary. (Note: when a node is disconnected and reconnects high state is always applied)
------
- **I95-30011** SVR packets dropped briefly when standby node in an HA router pair is restarted.


## Release 4.1.4

### Issues Fixed

- **I95-15146** Large NETCONF client requests can fail to be processed
------
- **I95-22948** `show ospf` shows incorrect data when OSPF is not configured
------
- **I95-24724** Jumbo frames are dropped on a KNI interface
------
- **I95-24811** Maximum network-interface mtu has been reduced to 9198 to avoid fragmentation issues
------
- **I95-25863** Requesting metrics beyond what is available returns empty data
------
- **I95-25964** Removed access-policy configuration for dhcp-server
------
- **I95-26059** Changing a device-interface name will stop pcap capture
------
- **I95-26079** A system fault can occur if a commit operation is cancelled
------
- **I95-26089** `show network-interface` can sometimes output no data
------
- **I95-26199** SVR port range is restricted to 1025-16383.  This has been increased to 1025-65535
------
- **I95-26237** Custom charts for device-interfaces can have incorrect session count metrics
------
- **I95-26288** A ping flood can stop future ICMP processing
------
- **I95-26517** Unable to provision conductor service on a device-interface type of T1
------
- **I95-26601** MTU configuration on a bridged KNI interface is not dynamically reconfigurable
------
- **I95-27044** System fault can occur when changing encryption keys
------
- **I95-27170** Added numerous tranmission stats for DHCP clients
------
- **I95-27242** Attempting to upgrade a managed router to a version greater than the Conductor fails silently
------
- **I95-27281** Session migration does not work when a session is initiated from a router with `peer-connectivity=bidirectional` to a router with `peer-connectivity=outbound-only`
------
- **I95-27328** Unable to execute yum commands on nodes after ztp
------
- **I95-27339** Sessions for a DHCP relay service can linger, causing subsequent DHCP request failures
------
- **I95-27371** BGP route reflector can not be disabled by setting `client false`
------
- **I95-27487** Invalid config produces the message `% Error: Config does not exist in Zookeeper`
------
- **I95-27521** `forwarding-core-count` is not honored in configuration
------
- **I95-27536** LTE interfaces that are unable to connect to the carrier's network can cause system instability
------
- **I95-27540, I95-27943** An erroneous message of `"download timed out, try again"` very shortly after downloading a software upgrade, even though no error occurred
------
- **I95-27600** T1 interface shows up even if the w1g1ppp is down
------
- **I95-27601** `show assets` does not show configured asset after changing its asset id
------
- **I95-27614** When operating in promiscuous mode, the 128T can send ICMP unreachables for dest macs that are not its own
------
- **I95-27635** Configuring BGP local-as under neighbor causes BGP configuration to not work properly
------
- **I95-27636** Bandwidth of UDP traffic is displayed incorrectly when traffic shaping is enabled
------
- **I95-27673** GUI may display `There may be changes waiting to be validated…` after validate with no errors
------
- **I95-27683** Unable to shutdown BGP peer
------
- **I95-27708** System can fault when generating `ntpd.conf`
------
- **I95-27728** sssd restarts when changing user system preferences
------
- **I95-27730** Node reboots after 128T upgrade when reboot is unnecessary
------
- **I95-27733** `128status.sh` script has been added to provide detailed 128T system health information
------
- **I95-27752** Session duplication only works with `security-policy` `hmac-mode` `regular`
------
- **I95-27763** BGP neighbor local-as is ignored when set to neighbor remote-as
------
- **I95-27830** System can fault when multiple "first" packets are processed simultaneously
------
- **I95-27878** Database process can consume large amount of CPU due to internal debugging data.  This database has been removed
------
- **I95-27889** System can fault on shutdown
------
- **I95-27899** Router is stuck in the state of "Key Accepted" during assets registration
------
- **I95-27922** System can fault when flow is selectively deleted from ingress router between two 128T peers with ongoing traffic
------
- **I95-27925** Sparklines do not show numerical value when time window is greater than 5 seconds
------
- **I95-27928** Terminal emulators that do not support 256 colors will produce the error `% Error: Unhandled AttributeError: 'NoneType' object has no attribute 'text'` 
------
- **I95-27937** System can fault when executing `save tech-support-info` on high-end server platforms with greater than 16 cores
------
- **I95-27940** Asset software version is still displayed after disconnect
------
- **I95-27953** bgpd process can fault in execution of `show ip bgp neighbor <neighbor-addr> received-routes` when communities match and are configured with a strip policy
------
- **I95-27959** Unable to initiate install of software after download through the asset page
------
- **I95-27979** Provisioning a service-route through the GUI allows entry of a service name.  The service name should only provide options from a drop-down of provisioned services.
------
- **I95-27986** Unable to provision service-route next-hop through GUI
------
- **I95-28031** Unable to disable generated flag on DHCP relay service
------
- **I95-28053** Inconsistency between units in spark lines and value on graphs
------
- **I95-28056** Event History page can result in poor system-wide network performance in large deployments.  The Event History page now requires a selection of a single router from which to obtain event history
------
- **I95-28060, I95-28380** System can fault when a configuration is applied with active sessions that contain overlapping private IPs
------
- **I95-28161** GUI displays no service-routes for services that have service-routes
------
- **I95-28162** Swagger document has wrong placeholders for Clone functions
------
- **I95-28191** Session optimization feature can cause 100% CPU utilization with low bandwidth
------
- **I95-28208** ISIS packets generate an exception in `highwayManager.log` files
------
- **I95-28219** Non-admin users are able to edit and view other users within the GUI
------
- **I95-28220** `show assets` now displays if an asset never connected
------
- **I95-28245, I95-28311, I95-28312** Control buffer pool can be exhausted for routers with a large number of peers
------
- **I95-28271** systemServicesCoordinator process can fault when processing IPC
------
- **I95-28347** Router upgrade can restart after rebooting a Conductor node before the upgrade completes
------
- **I95-28351** Invoking `lshw` can cause the system to fault
------
- **I95-28380** Service validation check not handling implicit /32 address resulting in an application fault
------
- **I95-28389** Malformed or missing user data store will prevent the 128T from starting
------
- **I95-28412** System can reinitialize multiple times during initial ZTP process
------
- **I95-28446** Sessions can be dropped during HA node failover
------
- **I95-28448** High CPU utilization for prolonged periods of time can induce a split-brain situation
------
- **I95-28480** Incorrect directory permissions can cause the Conductor-hosted software repository to fault
------
- **I95-28498** Redirecting output from PCLI show commands to a file produces multiple instances of `Redirecting output...` in the file
------
- **I95-28510** Patch available icon is shown on assets that are unmanaged
------
- **I95-28528** An empty option exists in Peer Authority and Router dropdowns
------
- **I95-28592** GraphQL API has been added for system connectivity status
------
- **I95-28673** ping command did not display round trip time
------
- **I95-28691** Large configurations can cause timeouts during processing
------
- **I95-28694** Import/Export page can fail to load
------
- **I95-28730** System can fault on receipt of BGP packet to an interface that does not exist
------
- **I95-28748** When configured for LDAP, users may not be able to login
------
- **I95-28827** Malformed environment configuration will cause 128T to fail to start
------
- **I95-28863** PCLI may fail to load resulting in message `% Error: Unhandled UnboundLocalError: local variable 'model' referenced before assignment`
------
- **I95-29032** In rare cases, the routingManager process can fault processing configuration
------
- **I95-29042** AWS ENA driver will fault if interface is disabled and then enabled.


## Release 4.1.3

:::note
The 4.1.3 release requires the 128T-installer 2.3.0 or greater. By default, the latest installer will automatically be used.
:::

### Issues Fixed

- **I95-27792** Asset status not updated correctly
------
- **I95-27339** DHCP stuck flows


## Release 4.1.2

:::note
The 4.1.2 release requires the 128T-installer 2.3.0 or greater. By default, the latest installer will automatically be used.
:::

### Issues Fixed

- **I95-22743** Installation now enables Kernel crash capturing
------
- **I95-24835** Creation of new security-policy generates error upon commit
------
- **I95-24963** `show event alarm rows all` reports the error `Failed to retrieve alarm events`
------
- **I95-25744** Tab-ing in GUI dialog boxes does not toggle between buttons or fields
------
- **I95-25790** Peer path statistics on PCLI may be missing for routers with multiple paths
------
- **I95-26021** WEB/GUI page scrolling stops working after router AP upgrade
------
- **I95-26154** System can fault when executing `save tech-support-info`
------
- **I95-26293** Changing the router name will prevent future logins
------
- **I95-26361** Asset reports downloading software after download has completed
------
- **I95-26447, I95-26509** Conductor software proxy is configured when `conductor-only` is not set
------
- **I95-26492** Duplicate addresses returned from a DNS request are not deduplicated
------
- **I95-26620** BGP routes not populated in the RIB when the eBGP neighbor's ttl is set to 1
------
- **I95-26690** Stats may not be displayed until 128T is restarted
------
- **I95-26696** Connectivity alarms are incorrectly re-evaluated on configuration changes resulting in retransmitting the alarm
------
- **I95-26706** Empty global ID for non-redundant interface produces validation warning
------
- **I95-26732** Router-based services are incorrectly shared with other neighborhoods
------
- **I95-26797** saltmaster.log and logrotate.d message filling root mail
------
- **I95-26845** Waypoint Exhaustion Post Change
------
- **I95-26910, I95-26911, I95-26912, I95-26927, I95-26972, I95-27046, I95-27067, I95-27076, I95-27125, I95-27181, I95-27184, I95-27248, I95-27357, I95-27404, I95-27421** Validation can take a long time on large configurations
------
- **I95-26943** Custom charts displays "all" series, when it should say "selected router"
------
- **I95-26956** Piping `show` commands through `grep` on large topologies never completes
------
- **I95-26981** Alarm shelving is not honored after 128T restarts
------
- **I95-26982, I95-27057, I95-27063, I95-27215, I95-27427** PCLI can have long response times with large configurations
------
- **I95-26985** 128T can get hung on shutting down when removing kni kernel module
------
- **I95-27023** PCLI can get stuck in `Starting the PCLI…`
------
- **I95-27029** `show asset software` incorrectly prompts for confirmation
------
- **I95-27032** HA indicator overlaid on top of router selector in custom charts
------
- **I95-27035, I95-27382, I95-27415, I95-27430** Web server may have poor responsiveness with large configurations
------
- **I95-27051** Congestion control algorithm for session optimization has been reverted to no fairness
------
- **I95-27066** Validatate operations can be executed multiple times for the same configuration
------
- **I95-27084** Topology map zooms in then back out after selecting a router
------
- **I95-27102** Large configurations increase the load time of the topology page  A loading indicator was added to provide a better user experience
------
- **I95-27105** 128T not restarted after reinitialization
------
- **I95-27107** NTP service does not start before 128T which can cause HA synchronization issues if time is incorrect between nodes
------
- **I95-27120** PCLI does not honor log level changes
------
- **I95-27121** 128T can crash when flow capacity has been exceeded
------
- **I95-27136, I95-27216** Terminated PCLI sessions can still linger preventing future logins
------
- **I95-27137** Configurations that contain a large number of hostnames/FQDNs can cause commit to take a long time
------
- **I95-27153** Large numbers of shelving alarms changes result in CPU saturation spikes
------
- **I95-27173** Requesting both IPv4 and IPv6 DHCP addresses for LTE does not work for some carriers
------
- **I95-27209, I95-27560** Large configurations can take a long time to commit
------
- **I95-27235** Subsequent requests to refreshing "Available Versions" do nothing
------
- **I95-27241** PCLI can hang on quit after committing configuration
------
- **I95-27246** Changing system clock to an earlier time will cause the 128T to not produce any metrics
------
- **I95-27248** Large configurations can take a long time to retrieve on both the PCLI and GUI
------
- **I95-27250** Configurations that have a large number of peer paths on a Router can cause HA to fail on those nodes. This is a result of running out of memory within one of the processes. This setting is configurable to fit the needs of the deployment
------
- **I95-27282, I95-27369** Large configurations can cause delays in GraphQL responsiveness
------
- **I95-27285** Large configurations can cause `save tech-support-info` to take a long time to complete
------
- **I95-27300** Unable to properly allocate forwarding core count to leverage multi-socket systems
------
- **I95-27310** It is possible to oversubscribe the system by allocating more forwarding cores than exist on the platform
------
- **I95-27401, I95-27511** Unclean shutdowns can cause the analytics database to become corrupt
------
- **I95-27444** Flow audit events are created even if auditing is disabled
------
- **I95-27522** `highwayManager.log` file is unnecessarily overflowing with the message:
  ```
  [HWMC|AEM ] ERROR (ActionEventManag) The High queue has overflowed. Dropping message
  ```
------
- **I95-27524** `128status.sh` script has been added for troubleshooting
------
- **I95-27604** FIB Next Hops is `<none>` when there are only service-routes with services with application-name
------
- **I95-27614** The 128T would send ICMP unreachable responses for destination MACs that were not its own
------
- **I95-27799** Per-router services fail validation when a service applies to more than one router-group
------
- **I95-27830** 2 or more ICMP packets within milliseconds resulted in a software fault


## Release 4.1.1

### Issues Fixed

- **I95-21219** In large deployments, displaying all peer paths on the topology page can cause poor performance.  Peer path lines for a given router are only drawn when selecting a router.
------
- **I95-23631** "All Routers" option on custom dashboards can cause poor performance for large deployments
------
- **I95-23634** Large configurations can cause the web server performance to degrade
------
- **I95-25297** auditd and plugin files are unnecessarily rotated
------
- **I95-25367** The 128T does not respond to ICMP packets destined for its interfaces
------
- **I95-25897** Installing from an ISO can cause an incorrect core count allocation
------
- **I95-26021** Window scroll bar become inoperable requiring a complete browser page reload
------
- **I95-26247** Configuring a prefix-list in a BGP neighbor can cause a system fault
------
- **I95-26266** When an interface configured for DHCP changes state to operationally down, the system can lock up
------
- **I95-26284** DHCP packets being relayed through 128T can get dropped
------
- **I95-26328** Login failure when LDAP username and home directory do not match
------
- **I95-26385** Added audit events for `global.init` and `local.init`
------
- **I95-26392** Upgrading an asset through the Conductor was restricted to only use 2.2.x versions of the installer
------
- **I95-26397** Cannot access dashboard tabs when exceeding screen limit
------
- **I95-26428** GUI fails to commit cloned router config, producing error: `"reverse SSH port must be unique within an authority"`
------
- **I95-26457** System can fault on shutdown when unbinding interfaces
------
- **I95-26467** Setting DHCP option `interface-mtu` causes DHCP server to fail to start
------
- **I95-26504** Transmitting large ICMP packets over SVR can cause the system to fault
------
- **I95-26582** SSH keep-alives between conductor and router are happening too frequently
------
- **I95-26683** Factory defaults can be inadvertently applied when bringing up a HA node
------
- **I95-26721** kni processes may linger upon shutdown causing security keys to not install properly
------
- **I95-26765** There exists no way to clear DHCP client leases.  The command `dhcp-agent release-current-dhcp-lease` has been added
------
- **I95-26788** The system can fault when unprovisioning a redundant interface
------
- **I95-26799** Errors generated by assets are erroneously duplicated
------
- **I95-26802** Upgrading or downloading software upgrades on all routers can impair performance of the Conductor. The asset selector has been restricted to a maximum of 10 routers to avoid overwhelming the Conductor with simultaneous download and upgrade operations
------
- **I95-26828** In large deployments, issuing a PCLI command to all routers from the Conductor can impact performance.  A warning is issued when issuing commands to all routers
------
- **I95-26838** Events on the GUI dashboard are displayed out of time order
------
- **I95-26842** PCLI does not honor log-level and always logs at DEBUG
------
- **I95-26846** `mount` has been added to the output of `save tech-support-info`
------
- **I95-26848** Commiting a configuration that contains router validation errors from Conductor is not commited
------
- **I95-26858** 128T may start up with 0 byte length `ntpd.conf` and `global.init` files
------
- **I95-26862** Asset state timers are unnecessarily aggressive
------
- **I95-26868** TCP timers for assets are unnecessarily aggressive
------
- **I95-26870, I95-26889, I95-26908** Large configurations can cause the PCLI to time out
------
- **I95-26873** Commit and Validatate operations can be executed multiple times for the same configuration.  A message now appears preventing the user from executing the same operation twice
------
- **I95-26875, I95-26890, I95-26901** Large configuration can cause validation to time out
------
- **I95-26924** `show assets` command erronously prompts for confirmation
------
- **I95-26925** Executing `save tech-support-info` can time out
------
- **I95-26928** 128T can fault on shutdown
------
- **I95-26929** 128T can fault on startup if it contains BGP configuration

## Release 4.1.0

### New Features and Improvements

- **I95-18018** Upgrade to CentOS 7.5
------
- **I95-18889** GUI Dashboard with Improved Navigation
------
- **I95-19231** Loopback for BGP Peering
------
- **I95-19370** DHCP Server
------
- **I95-21279** Azure Accelerated Networking Support
------
- **I95-23620** IPv6 Services
------
- **I95-23494** Router-Based Services
------
- **I95-24541** UDP Transform NAT Traversal
------
- **I95-25350** Core Isolation Mask Readability
------
- **I95-25543** Non-traffic audit events are now enabled by default.
------
- **I95-25647** Quectel EC25-A LTE card support

:::note
The 4.1.0 release requires the 128T-installer 2.2.0 or greater. By default, this installer will automatically be used.
:::

### Issues Fixed

- **I95-22879** Alarm count in bubble may not reflect the alarms in UI
------
- **I95-22926** Configuring dynamic-hostname writes all FQDN-based peers to /etc/hosts.
------
- **I95-23122** The output of `show platform` may display the incorrect number of cores.
------
- **I95-23761** Changing the web server's listening port does not affect the forwarding port for host-service.
------
- **I95-24337, I95-25803** Interface alarms reference internal device-interface IDs which do not exist in customer visible configuration.
------
- **I95-24404** When changing an interface from redundant to non-redundant, no validation will occur if the global-id remains configured.
------
- **I95-24453** 128T would not start on systems with less than 7GB of RAM.
------
- **I95-24469** The user is now presented with a dialog that the 128T-installer will be updated prior to downloading an update of the 128T software.
------
- **I95-24598** Alarm overlay will scroll outside of chart bounds when moved with the slider.
------
- **I95-24879** Failed to communicate from core network in data center to branch office due to "Error adding session".
------
- **I95-25051** Blue update status icon remains blinking on routers.
------
- **I95-25164** An invalid node name sent over NETCONF for a `service-route` can cause the system to fault.
------
- **I95-25174** Eroneous journal entries appear on restart of 128T when Zscaler plugin is enabled.
------
- **I95-25311** GUI FIB table is inconsistent with output of `show fib` on PCLI.
------
- **I95-25329** PCLI in Conductor GUI creates nested navigation bars
------
- **I95-25425** DHCP Relay with `/32` and FIB next-hop set to none requires additional service configuration
------
- **I95-25429** Rare race condition when applying configuration can cause the system to fault.
------
- **I95-25498** Neighbor solicitation messages received on an interface without a IPv6 address will silently drop the messages without incrementing any counters.
------
- **I95-25532** The autocomplete on the assets page does not display the asset id correctly.
------
- **I95-25536** If a more specific static route matching a kernel route is removed, the kernel route remains inactive.
------
- **I95-25539** A GUI initiated upgrade of a Conductor node failes to restart the Conductor service upon completion of the upgrade.
------
- **I95-25570** 128T process can fault on system shutdown.
------
- **I95-25580** Copy-and-pasting a router configuration can cause validation issues. 
------
- **I95-25655** An unresolvable hostname can cause the `rsyslogd` service to fault.
------
- **I95-25693** Cloning a `network-interface` causes a configuration warning with the message: `'qp-value' has been deprecated`.
------
- **I95-25698** Number of Custom charts over 20-25 may result in charts disappearing
------
- **I95-25729** The use of overlapping IP addresses for services can cause a failure to route packets.
------
- **I95-25788** Static route option for DHCP enabled egress interface not available
------
- **I95-25855** The GUI may return `null` for the PCI address of a device interface.
------
- **I95-25864** In the rare case when two HA nodes of the same Router are simultaneously started with factory default configuration, a race condition can occur where configuration from the Conductor may not be applied to the Router.
------
- **I95-25891** In very rare cases where networks can have over 18 seconds of delay, the use of the Session Optimization can cause a system fault.
------
- **I95-25895** Standby system can fault when upgrading the HA pair from 4.0 to 4.1.
------
- **I95-25917** After an upgrade of a system installed from an ISO, 128T is not enabled upon system reboot.
------
- **I95-25937** Reverse SSH service fails when the server-side SSH keys change.
------
- **I95-25949, I95-26091** IGMPv2 joins are dropped by the 128T.
------
- **I95-25981** Setting user preferences to display configuration as tiles or tables is not honored.
------
- **I95-25982** Configuring a service next-hop as a network-interface provisioned for DHCPv6 can cause the system to fault.
------
- **I95-26007** Executing `save tech-support-info` can sometimes cause interface state to be incorrectly reported.
------
- **I95-26058** System can fault when receiving a malformed packet.
------
- **I95-26066** Session classified as applications without a common name can cause the standby node to fault when the data is synchronized.
------
- **I95-26107** Path MTU discovery may not resolve when behind a NAT


## Special Considerations

- When configuring network-interface adjacencies via the PCLI the peer field is now required. If the peer is missing the PCLI will provide a message that it is required:
  ```
  "Argument 'peer' is required"
  ```
------
- Prior to 4.1.5, any peering with routers that have the same IP addresses was not supported. In 4.1.5 or greater remote peers having the same IP address is now supported in one direction, with the use of "outbound-only". 128T currently does not support ALL routers having the same IP address, the same IP address support is unidirectional. For example:
  The following is supported:
  ```
    	R1(172.16.1.1) --- peered --- R2 (192.168.1.1)
    	          |------- peered --- R3 (192.168.1.1)
  ```

  The following is not supported:
  ```
    	R1(192.168.1.1) --- peered --- R2 (192.168.1.1)
    	           |------- peered --- R3 (192.168.1.1)     
  ```


## Caveats

- **I95-30103** Entering flat configuration into PCLI does not always create the configuration

  _**Symptom:**_ - When performing configuration using flat (or cut and paste of the complete flat configuration line) the configuration is not applied

  _**Conditions:**_ - When a configuration object does not previously exist and setting an attribute of that configuration object. For example in the following configuration line:
  ```
  configure authority tenant one name one
  ```

  If the "tenant one" configuration object does not exist, the tenant object will not be created. If it does exist then the command will set the attribute "name" to "one"             

  _**Corrective Action:**_ - On initial creation, do not use flat configuration operations for creating the configuration.
------
- **I95-29842** Nodes with Overlapping DHCP addresses will not be displayed when 'show peers' command is run

  _**Symptom:**_ Nodes with Overlapping DHCP addresses will not be displayed in the output of show peers

  _**Conditions:**_ After upgrading to pre 4.1.5 to 4.1.6 and if Overlapping DHCP addresses are being used in the network topology

  _**Corrective Action:**_ After upgrading the Conductors perform a commit operation from either the PCLI or the Conductor GUI
------
- **I95-29733** Conductor UI may not provide an indication that a refresh is in progress (flashing blue dot)

  _**Symptom:**_ When selecting the Router to fresh the available versions to upgrade, the flashing blue indicator may not be present

  _**Conditions:**_ Shortly after both HA conductors have been upgraded and the refresh button is selected for a router

  _**Corrective Action:**_ N/A, no user corrective action can be performed. Waiting for a moment will result in the appearance of the solid blue dot if an upgrade is available (Note: Both conductors must be running a version greater than or equal to the target router version)
------
- **I95-29592** Conductor UI and/or PCLI may not update the asset software version correctly

  _**Symptom:**_ The Conductor UI and/or the PCLI may not correctly reflect the software version running on the asset

  _**Conditions:**_ After the asset has been upgraded

  _**Corrective Action:**_ If the asset is not updated after ~5 minutes after an upgrade is performed, the salt-minion will need a restart on the asset node that does not update the version. This is done with the following command on the node as the root linux user:
  ```
  systemctl restart salt-minion
  ```
------
- **I95-29271** PCLI/Netconf subsystem may fault on exit

  _**Symptom:**_ PCLI or Netconf session may fault

  _**Conditions:**_ On session exit (either exit from PCLI or direct Netconf session exit)

  _**Corrective Action:**_ N/A, no user corrective action is required.
------
- **I95-29134** `save tech-support-info` fails to create tech support file

  _**Symptom:**_ `save tech-support-info` fails with the following error message:
  ```
  "Error: Failed to execute the 'save-tech-support-info' RPC: Fatal error creating tarball"
  ```

  _**Conditions:**_ When configuration exports have been saved with spaces it in the name of the exported configuration file

  _**Corrective Action:**_ Remove the saved configuration files with spaces in the name and avoid using spaces when exporting configuration. Note: Exporting configuration files with spaces in the name may be prevented in a future release.
------
- **I95-28766** Conductor PCLI shows configuration change when no changes have been performed

  _**Symptom:**_ Conductor PCLI may incorrectly provide an * that there is a candidate configuration change

  _**Conditions:**_ Unknown

  _**Corrective Action:**_ None, if the configuration has not changed this indicator can be ignored. A comparison can be performed with `compare config running candidate`
------
- **I95-27946** Commit may fail on Conductor when node in router pair is stopped

  _**Symptom:**_ When performing a commit to a router where one of the nodes is offline, the commit from the Conductor may not respond or may fail. Performing a validate operation a second time may provide the following error response:

  ```
  “✖ Validating...
   % Error: Candidate configuration is invalid:
   1. A request of type validate is already in progress”
  ```
  _**Conditions:**_ When a node in the router pair is offline.

  _**Corrective Action:**_ The validate operation is sent from the conductor to the nodes to verify that the configuration is correct. The validate will timeout to the node that is offline. Bring the node back online and perform the operation a second time.
------
- **I95-27944** Network error may cause upgrade to fail and not retry.

  _**Symptom:**_ The following message is provided on the Conductor UI
  ```
  “The upgrade failed because: NetworkError when attempting to fetch resource.”
  ```
  _**Conditions:**_ When upgrading the Conductor from the Conductor GUI

  _**Corrective Action:**_ Verify the conductor can reach the 128T repository, once verified to be accessible, perform the upgrade operation again.
------
- **I95-27808** `sync peer addresses router force` from conductor may not trigger router to send address information from peer

  _**Symptom:**_ When performing the following command on the Conductor PCLI, `sync peer addresses router force` the router may not provide the peer address information

  _**Conditions:**_ Unknown

  _**Corrective Action:**_ Perform the PCLI command on the router to update the information on the conductor.
------
- **I95-27722** Alarms for "Peer not reachable" may not clear and will persist after nodes are back and operational

  _**Symptom:**_ Alarms for "peer not reachable" provided in on the Conductor

  _**Conditions:**_ Unknown, seen after system upgrade

  _**Corrective Action:**_ NA, The alarms will clear within 15 minutes.
------  
- **I95-25947** The upgrade to 4.1 can take upwards of 40 minutes to complete.  The increase in installation time is due to the underlying OS upgrade from CentOS from 7.3 to 7.5.
------
- **I95-25828** Rollback to the previous version of software is not supported due to the underlying operating system upgrade.
------
- **I95-25659** When 128T learns the peer IP of a 128T Router through BFD source NAT detection, it uses the learned address for most things, but not for flow moves. Flow move detection relies on the statically configured adjacency within the configuration, not the updated addresses that BFD provides. To prevent for move failures when waypoints are behind a NAT, the administrator should configure  `external-nat-address` on the corresponding adjacency.  The value given to that field should be that same source NATed address.
------
- **I95-25823** kernel warnings can be seen in journalctl when running the 128T within Azure.  An example of the warning messages can be seen below.
  ```
        Aug 29 02:23:32 sct1_dut1 kernel: Modules linked in: rte_kni(OE) igb_uio(OE) uio vfat fat intel_powerclamp coretemp kvm_intel kvm irqbypass crc32_pclmul ghash_clmulni_intel aes
        Aug 29 02:23:32 sct1_dut1 kernel: CPU: 1 PID: 1620 Comm: fastLane Tainted: G           OE  ------------   3.10.0-862.14.4.el7.x86_64 #1
        Aug 29 02:23:32 sct1_dut1 kernel: Hardware name: ADI Engineering RCC-VE2/RCC-VE2, BIOS ADI_RCCVE2-01.00.00.00 08/25/2017
        Aug 29 02:23:32 sct1_dut1 kernel: Call Trace:
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff83713754>] dump_stack+0x19/0x1b
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff830945d8>] __warn+0xd8/0x100
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff8309471d>] warn_slowpath_null+0x1d/0x20
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff831256b9>] update_cpumasks_hier+0x3c9/0x410
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff83122cd0>] ? cpuset_read_u64+0x100/0x100
        Aug 29 02:23:32 sct1_dut1 nodeMonitor[1624]: Processed configuration update (2)
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff83125953>] cpuset_write_resmask+0x253/0xa10
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff8311b020>] ? cgroup_rightmost_descendant+0x80/0x80
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff83125700>] ? update_cpumasks_hier+0x410/0x410
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff8311d411>] cgroup_file_write+0x1d1/0x2d0
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff832221c8>] ? __sb_start_write+0x58/0x110
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff832d5437>] ? security_file_permission+0x27/0xa0
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff8321f240>] vfs_write+0xc0/0x1f0
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff8322006f>] SyS_write+0x7f/0xf0
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff8372579b>] system_call_fastpath+0x22/0x27
        Aug 29 02:23:32 sct1_dut1 kernel: ---[ end trace e9955ec11f51ffa9 ]---
        Aug 29 02:23:32 sct1_dut1 kernel: ------------[ cut here ]------------
        Aug 29 02:23:32 sct1_dut1 kernel: WARNING: CPU: 1 PID: 1620 at kernel/cpuset.c:994 update_cpumasks_hier+0x3c9/0x410
        Aug 29 02:23:32 sct1_dut1 kernel: Modules linked in: rte_kni(OE) igb_uio(OE) uio vfat fat intel_powerclamp coretemp kvm_intel kvm irqbypass crc32_pclmul ghash_clmulni_intel aes
        Aug 29 02:23:32 sct1_dut1 kernel: CPU: 1 PID: 1620 Comm: fastLane Tainted: G        W  OE  ------------   3.10.0-862.14.4.el7.x86_64 #1
        Aug 29 02:23:32 sct1_dut1 kernel: Hardware name: ADI Engineering RCC-VE2/RCC-VE2, BIOS ADI_RCCVE2-01.00.00.00 08/25/2017
        Aug 29 02:23:32 sct1_dut1 kernel: Call Trace:
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff83713754>] dump_stack+0x19/0x1b
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff830945d8>] __warn+0xd8/0x100
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff8309471d>] warn_slowpath_null+0x1d/0x20
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff831256b9>] update_cpumasks_hier+0x3c9/0x410
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff83122cd0>] ? cpuset_read_u64+0x100/0x100
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff83125953>] cpuset_write_resmask+0x253/0xa10
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff8311b020>] ? cgroup_rightmost_descendant+0x80/0x80
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff83125700>] ? update_cpumasks_hier+0x410/0x410
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff8311d411>] cgroup_file_write+0x1d1/0x2d0
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff832221c8>] ? __sb_start_write+0x58/0x110
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff832d5437>] ? security_file_permission+0x27/0xa0
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff8321f240>] vfs_write+0xc0/0x1f0
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff8322006f>] SyS_write+0x7f/0xf0
        Aug 29 02:23:32 sct1_dut1 kernel:  [<ffffffff8372579b>] system_call_fastpath+0x22/0x27
        Aug 29 02:23:32 sct1_dut1 kernel: ---[ end trace e9955ec11f51ffaa ]---
  ```
