---
title: 128T 4.3 Release Notes
sidebar_label: 4.3
---

## Release 4.3.7

### Issues Fixed

- **I95-24681** Grammatical improvements to HA initialization, providing more clarity around the use of specific IP addresses
------
- **I95-26276** Enabled OSPF authentication in configuration
------
- **I95-30610** RTP is not properly classified for subsequent 128T routers
------
- **I95-35172** Adding DHCP server instances requires a software restart
------
- **I95-35401** SVR traffic would be dropped as a result of tenant members source type being incorrectly classified.
  _**Conditions:**_ When the interface has an adjacency and tenant members are applied via neighborhoods and/or child tenants. The tenant table will show the source type as `PUBLIC` for that entry when it should show as `HYBRID`, resulting in traffic being dropped.
------
- **I95-35602** The command `show network-interface` may result in a `Unhandled TypeError` in the PCLI when a PPPoE interface is down
------
- **I95-35633** The GUI performance has been improved for configuration edit operations
------
- **I95-35644** Added support for `bgp route-reflector allow-outbound-policy`


## Release 4.3.6

### Issues Fixed

- **I95-35377** Additional metrics added to realize active traffic engineering behavior
------
- **I95-35394** salt-minion may fault during an upgrade or rollback operation. This issue does not impact the upgrade or rollback operations.


## Release 4.3.5

### Issues Fixed

- **I95-33842** Race condition on 128T startup, causing DHCP server to fail to start
  _**Conditions:**_ DHCP server is not running. The following log message can be seen:
  ```
init[5720]: [dh00000001 | dhcp-server-ns-1:1073742075] Running command ['/usr/sbin/ip', 'netns', 'set', 'dhcp-server-ns-1', '1073742075']
init[5720]: [dh00000001 | dhcp-server-ns-1:1073742075] Command "/usr/sbin/ip netns set dhcp-server-ns-1 1073742075" failed: RTNETLINK answers: No space left on device
  ```
  Until the system is upgraded to 4.3.5, this issue can be mitigated by restarting the 128T.
------
- **I95-34053** When configured to use LDAP, locally created user credentials and access are not honored for those users that already exist in LDAP.
  Until the system is upgraded to 4.3.5, this issue can be mitigated by restarting the 128T.
------
- **I95-34629** During the initial window of a router to Conductor connection outage or as connectivity is established between HA peers, configuration commits may fail silently. Candidate configuration will remain uncommitted.
  Until the system is upgraded to 4.3.5, this issue can be mitigated by attempting the commit again.
------
- **I95-34716** Fixed a rare race condition crash on startup of the Automated Provisioner
------
- **I95-34744** highway process can fault when a DHCP server assigns the IP address 0.0.0.0 to the 128T router
------
- **I95-34790** Dual node HA routers with large numbers of peer paths (>500) may see some flows get blackholed after a node failover occurs.
------
- **I95-34842** The configuration attribute `authority > router > node > device-interface > vrrp` has been removed from configuration in the GUI as the capability does not exist
------
- **I95-34961** Using a QuickStart file to provision a router fails if the ZScaler plugin is installed on the Conductor.
------
- **I95-34968** Self-signed certificates created during initial installation of 128T are invalid
------
- **I95-35035** Significantly improved the performance of populating the FIB from configuration and dynamic routes
------
- **I95-35062** Non-permanent LTE failures are incorrectly displayed as a failure context in `show device-interface`
------
- **I95-35082** When a 128T is deployed behind a NAT firewall and has path MTU (PMTU) discovery enabled, SVR sessions established for outbound-only connections are set up with the configured interface MTU, not the discovered PMTU.
------
- **I95-35093** `show asset <asset-id>` incorrectly continues to show `Currently Upgrading` version after completion of an upgrade.
------
- **I95-35099** Removing a 128T user does not remove its Linux credentials, allowing the user to still login to Linux.
  Until the system is upgraded to 4.3.5, this issue can be mitigated by disabling rather than deleting the user.
------
- **I95-35115** Aggregate bandwidth charts may not display data accurately
------
- **I95-35155** `show device-interface` output did not include duplex mode
------
- **I95-35188** Adding a tenant or changing the order of tenants in the configuration can lead to traffic being dropped upon session recovery
  _**Conditions:**_ Configuration change is made to tenants while one node of a HA pair is offline.  After the configuration change, the node that was offline takes over as the primary for existing sessions.
  Until the system is upgraded to 4.3.5, if the tenant configuration has changed and a HA node has taken over as active, the traffic that is being dropped can be cleared by performing a simultaneous reboot of both nodes.
------
- **I95-35205** LTE interfaces do not honor MTU settings set in the network
  Until the system is upgraded to 4.3.5, the learned MTU value can be directly set within Linux
------
- **I95-35303** `persistentDataManager` process can fault on shutdown of 128T
------
- **I95-35323** BGP over SVR does not work if both sides of the routers have VLAN tagged interfaces
  Until the system is upgraded to 4.3.5, configure the outgoing SVR interfaces without vlans. At least one side of the BGP over SVR routers should not utilize VLAN tagging.
------
- **I95-35395** Enabled BGP router reflector `cluster-id` in configuration


## Release 4.3.4

### Issues Fixed

- **I95-35138** A vulnerability in the SaltStack code allows for unauthenticated salt-minions to execute any script on the salt-master.
  :::info
  This fix is required only on the 128T Conductor.
  :::
------
- **I95-31618** Upon initial plugin installation on a 128T, configuration for the plugin is not honored.
  Until the system is upgraded to 4.3.4, this issue can be mitigated by committing the configuration again.


## Release 4.3.3

### New Features and Improvements

- **I95-22789** Dual LTE Support
  For information on how to configure the 128T with two LTE interfaces, please read the [How To: LTE](howto_lte.md) guide.

## Release 4.3.2

### Issues Fixed

- **I95-18857** Support for automatic loopback has been added to Sangoma T1 devices
------
- **I95-27764** `write log snapshot` does not work for process highway
------
- **I95-28190** Addressed issue causing PPPoE passwords to be incorrectly changed to `(removed)`.

  _**Symptom:**_ `device-interface > pppoe > password` gets converted to `(removed)` upon changing `device-interface > name`.

  _**Conditions:**_ Changing the object's key, in this case `device-interface > name` causes secure fields to be incorrectly converted to `(removed)`.

  Until the system is upgraded to 4.3.2, this issue can be mitigated by deleting the existing `device-interface` object and recreate it.
------
- **I95-30011** HA router nodes may take upwards of 40 seconds to achieve quorum.

  _**Symptom:**_ SVR traffic may be dropped while a redundant node is restarting.

  _**Conditions:**_ The hostname of the platform cannot be resolved

  Until the system is upgraded to 4.3.2, this issue can be mitigated by setting the hostname of the node to a value that can be resolved or add an address for the system in `/etc/hosts`
------

- **I95-31597** Configuring a static ARP entry within a `neighbor` configuration is not honored

  _**Symptom:**_ Dynamic ARP entries take precedence over statically configured ARP entries

------
- **I95-32244** Cannot upgrade after software download completes

  _**Conditions:**_ Managed router being upgraded via Conductor can intermittently fail due to transient network conditions, 4.3.2 will now perform multiple attempts to verify the download completed.

  Until the system is upgraded to 4.3.2, this issue can be mitigated by performing the Download operation again.
------
- **I95-32509** Generated configuration objects are shown by default in GUI and PCLI
------
- **I95-32660** `saltMaster.log` files rotate once daily with a maximum of 25 rotated files, consuming a large amount of disk space.  This has been changed to rotate hourly, with a maximum of 25 rotated files.
------
- **I95-33024** Specifying a `metric` value within `advertise-default` of OSPF causes advertisements to be withdrawn

  Until the system is upgraded to 4.3.2, this issue can be mitigated by remove `metric` value from `advertise-default` configuration
------
- **I95-33174** Some LTE cards do not use the correct wireless bands for the AT&T network
------
- **I95-33432** Path MTU discovery could be fooled by a (bad acting) network element that fragments large packets in spite of the do-not-fragment (DF) flag

  _**Symptom:**_ Sessions utilizing large packets (like those in some print jobs) may result in failed attempts

  _**Conditions:**_ in-path network element fragments packets with DF bit set.
------
- **I95-33485** Upgrading a HA node of a 128T router can result in traffic being dropped

  _**Symptom:**_ Existing traffic for some services are blackholed during upgrade

  Until the system is upgraded to 4.3.2, this issue can be mitigated by completing the upgrade of both nodes or restart non-upgraded 128T
------
- **I95-33506** File descriptors can leak upon incorrectly configuring a non-existent namespace within an interface type of `host`.

  _**Symptom:**_ 128T application will fail to run network scripts and other applications

  _**Conditions:**_ Setting `network-namespace` to a value that does not exist on the host platform after committing configuration

  Until the system is upgraded to 4.3.2, this issue can be mitigated by removing the invalid configuration.
------
- **I95-33535** Interface name incorrectly allows for prefixed whitepace in configuration, resulting in failure to create interface.
------
- **I95-33556** 128T may drop inbound SVR traffic when destination service address and port overlaps with interface (waypoint) address and wayport.

  _**Conditions:**_ `address` on a service matches that of the `network-interface` that participates in SVR AND `tenant` on the service matches the `tenant` on the `network-interface` depending on the service scope AND the `port-range` defined on the `network-interface` overlaps with `port-range` of the service.

  Until the system is upgraded to 4.3.2, this issue can be mitigated by changing the `port-range` on the neighborhood to a range that does not overlap with the service. In 4.3.2 a configuration validation has been added to detect such overlap and provide user with appropriate error message.
------
- **I95-33559** `send command download router all <version>` will report `% Error: Failed to execute the 'download-software' RPC: Request failed with error: TIMEOUT` even though the command completes successfully.

  _**Conditions:**_ Execute download command from Conductor with >25 managed assets.
------
- **I95-33634** 128T unable to bind to `device-interface`

  _**Symptom:**_ Interface will be administratively up but operationally down

  _**Conditions:**_ highway process faults can leave an interface unbound to _any_ driver, resulting in the inability for the system to rebind to the interface.

  Until the system is upgraded to 4.3.2, this issue can be mitigated by issuing a `reboot` on the impacted system.
------
- **I95-33655** GUI Ping and Service Ping do not report incremental ICMP response messages; only the summary is produced when the command has completed.

  Until the system is upgraded to 4.3.2, this issue can be mitigated by using the PCLI versions of the same command.
------
- **I95-33668** Peer path fails to meet (default) SLA, triggering BGP prefix flapping

  _**Symptom:**_ Advertised routes are withdrawn and subsequently re-advertised with a new route metric.

  _**Conditions:**_ When a service with no `service-policy` configured, therefore utilizing system defaults, traverses a path below SLA.
------
- **I95-33683, I95-33951** When 128T Networking Platform is configured to use LDAP for authentication, login will fail if the user is a member of both `128t-user` and `128t-admin`

  _**Symptom:**_ User is unable to login.

  Until the system is upgraded to 4.3.2, this issue can be mitigated by removing the user from one of the two LDAP groups.
------
- **I95-33710** Working configuration fails to validate after upgrade

  _**Symptom:**_ Validation of the configuration will fail with the message `% Error: Candidate configuration is invalid: 1. name is required`.

  _**Conditions:**_ `device-interface` of type `host` will fail validation if a `management-vector` does not exist.

  Until the system is upgraded to 4.3.2, this issue can be mitigated by configuring a `management-vector` on the `network-interface`s that exist within the `device-interface`.
------
- **I95-33759** GUI DHCP Client Lease table reports no leases while DHCP server has active client leases.
  Until the system is upgraded to 4.3.2, this issue can be mitigated by using the PCLI version of the same command: `show network-interface application node <node-name> name <interface-name>`
------
- **I95-33789** Forwarding core count incorrectly reported in GUI under Router -> Node -> Platform Information
  Until the system is upgraded to 4.3.2, this issue can be mitigated by using the PCLI version of the same command: `show platform cpu `
------
- **I95-33793** SVR fails to recover session on multi-hop inter-node failure

  _**Symptoms:**_ Security lookup failure and packet drops.

  _**Conditions:**_ This scenario occurs only with multi-hop SVR, where an intermediate node WAN link fails, and the target alternate path is `outbound-only`.  This only affects existing sessions.  New sessions will be unaffected.
------
- **I95-33845** security package updates
------
- **I95-33857, I95-33643** Short OTP QuickStart DHCP server lease time results in an initial OTP QuickStart failure.
------
- **I95-33938** REST API missing documentation reference for the command to delete configuration backups.  The missing and supported API is  `DELETE /api/v1/config/export/:filename`
------
- **I95-33979** Custom Reports in the GUI created with peer path metrics for jitter, latency, or loss are rendered as a line chart instead with a single value instead of one per path

  _**Conditions:**_ Custom Reports rendering data from peer paths when multiple peer paths exist
------
- **I95-34015** nginx process does not properly restart during a rollback of 128T

  _**Symptom:**_ systemd continually attempts to restart nginx process

  _**Conditions:**_ 128T software is being downgraded to version 4.2.0 <= version <= 4.2.4
------
- **I95-34061** Linux command equivalent of the PCLI `connect` command: `connect128t --router <router-name> --node <node name>` produces the cosmetic error:

  ```
  /usr/lib/128technology/par/connect128t.par/subpar/runtime/support.py:117: UserWarning: Unable to extract to requested directory '/usr/lib/128technology/unpar/connect128t', falling back to tmp dir
  ```
  There is no impact to the functionality of `connect128t`
------
- **I95-34068** SVR sessions fail to establish due to waypoint allocation failures after HA node failover.

  _**Symptom:**_ The following warning log is generated:

  ```
Mar 03 09:25:10.813 [HWMC| – ] WARN (icmpManager ) Base Exception: failed to allocate ports for WayPoint; intf=5.0; local=192.0.2.100; remote=198.51.100.128
  ```

  Until the system is upgraded to 4.3.2, this issue can be mitigated by removing the corresponding adjacency configuration and adding it back.
------
- **I95-34090** A network-interface configured with multiple neighborhoods, where one of the neighborhoods defines a port range, will result in traffic being dropped on the defined range

  _**Symptoms:**_ SVR traffic is dropped when destined for a port range configured on its peer 128T router's neighborhood
------
- **I95-34092** `rotate log` command does not rotate `fastLane.log`, `serviceArea.log` and `flpp.log`.
------
- **I95-34113** DHCP lease management in the GUI shows no client leases exist

  _**Conditions:**_ firewall is running on the host 128T platform

  Until the system is upgraded to 4.3.2, this issue can be mitigated by adding the interface `veth` to the `TRUSTED` firewalld zone
------
- **I95-34135** CVE-2020-8597: A buffer overflow flaw was found in the ppp package
------
- **I95-34158** Modifying a port-range configuration value to include an overlapping range results in a list with an incorrect range.

  _**Conditions:**_ An existing range list is modified to include an overlapping range

  Until the system is upgraded to 4.3.2, this issue can be mitigated by entering a unique range of values that do not overlap.
------
- **I95-34160** Standby node can leak traffic out of its redundant interface when the shared MAC is set to the same MAC as the physical MAC
------
- **I95-34164** Load balancer occasionally returns standby paths during packet duplication flow setup
------
- **I95-34173** The loss of power for the routing manager standby node in a HA router configuration may lead to temporary BGP traffic drops on the primary node.
------
- **I95-34174** Added configuration `negotiate-capabilities` for BGP neighbor to optionally suppress sending the Capabilities Optional Parameter in the BGP OPEN message.
------
- **I95-34186** PPPoE interface is disconnected upon changing `device-interface` name
------
- **I95-34200** Influx database corruption resulting in `show entitlement` or displaying Event history from the Conductor UI to produce an error
------
- **I95-34209** Incorrect Zscaler plugin installed when installed via the Conductor GUI
------
- **I95-34249** Time scale selector in upper right hand of Top 10 Sessions only shows the last hour of data, regardless of what value is selected.
------
- **I95-34310** Secure fields from the 128T configuration are in the commit audit events from config diff operations.
------
- **I95-34328** asset fails to set high-state and provides errors in `show asset summary`

  _**Symptoms:**_ show asset summary provides errors for an asset and does not perform high-state operations. The error `error: db5 error` would be seen in `/var/log/salt/minion.log` file

  _**Conditions:**_ When the centos rpmdb has been corrupted.

  Until the system is upgraded to 4.3.2, run the following commands on the target asset `mv /var/lib/rpm/__db* /tmp; yum clean all; dnf clean all`
------
- **I95-34371** Large FIBs can take excess of 30 seconds to load, causing the highway process to fault and restart

  _**Symptom:**_ System would appear to take a long time to load its FIB

  _**Conditions:**_ System running at TRACE log level may induce this problem

  Until the system is upgraded to 4.3.2, this issue can be mitigated by ensuring the system is configured at log level INFO, and if necessary, reduce the size of the service configuration.
------
- **I95-34397** ARP caching and reverse MAC learning is not triggered when an ARP response takes longer than 1 second
------
- **I95-34407** Renaming a configuration list item can result in factory default values being populated in the renamed object.
------
- **I95-34408** When creating/renaming a device-interface, prefix-delegation configuration was blocked until dhcp is explicitly disabled
------
- **I95-34421** Lenovo onboard Intel X722 NIC is not recognized by 128T and cannot be used as a forwarding interface
------
- **I95-34498** Erroneous centos-release-yum4 errors in `/var/log/salt/minion` log file

  _**Symptom:**_ Log messages appear in salt minion file

  ```
2020-03-25 17:59:37,893 [salt.loader.12.230.70.246.int.module.cmdmod][ERROR ][18140] stdout: package centos-release-yum4 is not installed
  ```

  _**Conditions:**_ Automated Provisioner performs a software version query
------
- **I95-34577** Interface never becomes active when `shared-phys-address` is configured to be the same as the physical MAC
------
- **I95-34645** Swagger API for "clone" and "move" operations are incorrect.  They are `/config/{configStore}/authority/district/{district}/clone` when they should be `/config/{configStore}/authority/district/clone`
------
- **I95-34653** SNMP IF-MIB does not display correctly when a non-forwarding management interface is present
------

## Release 4.3.1

### Issues Fixed

- **I95-34058, I95-34064** Session setup fails for outbound only when first packet exceeds MTU


## Release 4.3.0

### New Features and Improvements

- **I95-10004** Proxy ARP

- **I95-10058** SNMPv2 Request/Response

- **I95-20708** PCLI logout on upgrade/rollback

- **I95-22221** Support Different IPs for Conductor-Hosted Services

- **I95-23822** GUI: Service Ping

- **I95-25111** Metrics for 128T processes

- **I95-25913** Address Latest CVEs

- **I95-26271** Hugepage Calculator

- **I95-27263** GUI: DHCP Lease Management

- **I95-27784** Configuration Processing Performance Improvements

- **I95-28744** GraphQL API for Service Ping

- **I95-29273** Quick-Connect: Button to remote login to 128T router from Conductor

- **I95-29972** Duration added to asset state

- **I95-30226** MT2880 - ConnectX-5 EN 2x100Gbps NIC Support

- **I95-30389** Peer Path Metric Distinction

- **I95-31340** Extended Firewall Pinhole Capabilities

- **I95-31615** Encryption Alignment Avoidance

- **I95-31939** Salt Minion Watchdog

- **I95-32010** GUI: Processing Indicators added to configuration operations

- **I95-32145** LTE Certification Enhancements

- **I95-32456** Reverse Packet ARP Handling


### Issues Fixed

- **I95-14559** Adding a device-interface in the GUI incorrectly produces an error that type is not set to PPPoE
------
- **I95-30084** Empty BGP neighbor/transport/local-address prevents configuration from being committed
------
- **I95-31492** Peer path uptime in `show peers detail` is incorrect
------
- **I95-31611** Left navigation pane is improperly rendered when filter slideout is opened
------
- **I95-31661** GUI incorrectly shows state as `Unknown` for management interfaces
------
- **I95-31920** Browser page refresh is required after Conductor upgrade in order to login
------
- **I95-32022** `dhcp release` has been renamed to `release dhcp` to properly match verb syntax
------
- **I95-32108** Header is poorly rendered in GUI when browser width is small
------
- **I95-32244** Download of software upgrade may fail and not provide feedback
------
- **I95-32334** Session count sparkline value is 2x of the actual value
------
- **I95-32463** DHCP server rejects packets larger than 500 bytes
------
- **I95-32579** Edit config header overlaps with Task Panel in GUI
------
- **I95-32583** Custom charts with session-count can be incorrect in a HA configuration
------
- **I95-32625** service-route/host configuration results in invalid route, dropping packets
------
- **I95-32754** DHCP Server can flood the journal with monitoring messages
------
- **I95-32843** System can fault when routing loop is created with OSPF
------
- **I95-32902** LTE APN name not displayed correctly
------
- **I95-32957** The LTE reset command did not handle some error cases resulting in a failure
------
- **I95-33122** Configuration now enforces non-forwarding-fabric interfaces must be in the same subnet as its HA pair
------
- **I95-33148** Non-forwarding interfaces could not come up if a manually created bridge interface existed with the same IP address with that of another 128T provisioned interface
------
- **I95-33149** Changing a HA non-forwarding interface address will fail to reestablish the connection between nodes

  _**Corrective Action:**_ Restart 128T on the node that did not receive the config change
------
- **I95-33161** Interfaces that are DHCP enabled within linux (128T not running), returning it from being managed by 128T will result in the error: `dhclient(pid) is already running - exiting`. The interface, as a result will not be able to acquire any IP, until the interface is restarted.

  _**Corrective Action:**_ Invoke `ifdown` on the interface being converted by 128T
------
- **I95-33170** `show system connectivity internal` incorrectly shows interprocess communication connections status as disconnected
------
- **I95-33216** Interfaces that are DHCP enabled that are "returned" to linux after 128T shutdown will result in the dhclient process being killed. This results in the interface being unable to renew its dhcp lease after it expires.

  _**Corrective Action:**_ Create a `oneshot` service to be invoked by 128T at `ExecStopPost` so that the `control-group` is separate from 128T service.
------
- **I95-33264** Race condition exists for HA shared LAN interfaces wherein if the primary node is restarted, the primary interface may not take over after the restart, causing traffic to be blackholed
------
- **I95-33277** Traceroute using TCP does not work if udp-transform is enabled.

  _**Corrective Action:**_ Traceroute over UDP should be used as a workaround
------
- **I95-33278** End of log messages were being truncated when sent to syslog
------
- **I95-33279** Path MTU discovery unresolvable when no ICMP is generated
------
- **I95-33296** Removing a redundant interface and its corresponding redundancy-group within the same commit would abort the commit
------
- **I95-33441** Changing node name can cause the 128T to fault on shutdown due to a rare race condition
------

## Special Considerations

If upgrading from 4.1 consult the [4.2.3 release notes Special Considerations](release_notes_128t_4.2.md#special-considerations) section

## Caveats

- **I95-29592** Conductor UI and/or PCLI may not update the asset software version correctly

  _**Symptom:**_ The Conductor UI and/or the PCLI may not correctly reflect the software version running on the asset

  _**Conditions:**_ After the asset has been upgraded

  _**Corrective Action:**_ If the asset is not updated after ~5 minutes after an upgrade is performed, the salt-minion will need to be restarted on the respective node. This is done with the following command on the node as the root Linux user:
  ```
systemctl restart salt-minion
  ```
------
- **I95-27808** `sync peer addresses router force` from Conductor may not trigger router to send address information from peer

  _**Symptom:**_ When performing the following command on the Conductor PCLI, `sync peer addresses router force` the router may not provide the peer address information

  _**Conditions:**_ Unknown

  _**Corrective Action:**_ Perform the PCLI command on the router to update the information on the Conductor.
------
- **I95-32789** Peer stats in Conductor UI not provided during upgrade

  _**Symptom:**_ When upgrading a node from pre 4.3 to 4.3, the peer node will not provide general stats in the conductor UI until the peer is also upgraded.

  _**Conditions:**_ When nodes of a router or conductor pair are on different versions (for routers this is the short transition where the first node is upgraded and the second node is in the process of upgrading but still operational)

  _**Corrective Action:**_ NA, when both nodes are operational and on the 4.3 version the stats information on the router dialog will be provided. Stats can still be retrieved from the PCLI of the node while it is running.
