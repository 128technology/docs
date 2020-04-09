---
title: 128T 4.2 Release Notes
sidebar_label: 4.2
---

## Release 4.2.6

:::note
The 4.2.6 release is a superset of the 4.2.5 release. Features and corrections in the 4.2.5 release are not provided in these release notes. Please refer to the [4.2.5 release notes](#release-425) for further information.
:::


### Issues Fixed

- **I95-34068** SVR sessions fail to establish due to waypoint allocation failures after HA node failover.
  _**Symptom:**_ The following warning log is generated:

  ```
  Mar 03 09:25:10.813 [HWMC| – ] WARN (icmpManager ) Base Exception: failed to allocate ports for WayPoint; intf=5.0; local=172.27.233.47; remote=10.61.55.109
  ```

  Until the system is upgraded to 4.2.6, this issue can be mitigated by removing the corresponding adjacency configuration and adding it back.

- **I95-34164** Load balancer occasionally returns standby paths during packet duplication flow setup

- **I95-34371** Large FIBs can take excess of 30 seconds to load, causing the highway process to fault and restart

  _**Symptom:**_ System would appear to take a long time to load its FIB

  _**Conditions:**_ System running at TRACE log level may induce this problem

  Until the system is upgraded to 4.2.6, this issue can be mitigated by ensuring the system is configured at log level INFO, and if necessary, reduce the size of the service configuration.

- **I95-34645** Swagger API for "clone" and "move" operations are incorrect.  They are `/config/{configStore}/authority/district/{district}/clone` when they should be `/config/{configStore}/authority/district/clone`

- **I95-34577** Interface never becomes active when `shared-physical-address` is configured to be the same as the physical MAC


## Release 4.2.5

:::note
The 4.2.5 release is a superset of the 4.2.4 release. Features and corrections in the 4.2.4 release are not provided in these release notes. Please refer to the [4.2.4 release notes](#release-424) for further information.
:::

### Issues Fixed

- **I95-18857** Support for automatic loopback has been added to Sangoma T1 devices

- **I95-27764** `write log snapshot` does not work for process highway

- **I95-28190** Addressed issue causing PPPoE passwords to be incorrectly changed to `(removed)`.
  _**Symptom:**_ `device-interface > pppoe > password` gets converted to `(removed)` upon changing `device-interface > name`.

  _**Conditions:**_ Changing the object's key, in this case `device-interface > name` causes secure fields to be incorrectly converted to `(removed)`.

  Until the system is upgraded to 4.2.5, this issue can be mitigated by deleting the existing `device-interface` object and recreate it.

- **I95-30011** HA router nodes may take upwards of 40 seconds to achieve quorum.

  _**Symptom:**_ SVR traffic may be dropped while a redundant node is restarting.

  _**Conditions:**_ The hostname of the platform cannot be resolved

  Until the system is upgraded to 4.2.5, this issue can be mitigated by setting the hostname of the node to a value that can be resolved or add an address for the system in `/etc/hosts`

- **I95-31597** Configuring a static ARP entry within a `neighbor` configuration is not honored

  _**Symptom:**_ Dynamic ARP entries take precedence over statically configured ARP entries

- **I95-32244** Cannot upgrade after software download completes

  _**Conditions:**_ Managed router being upgraded via Conductor can intermittently fail due to transient network conditions, 4.2.5 will now perform multiple attempts to verify the download completed.

  Until the system is upgraded to 4.2.5, this issue can be mitigated by performing the Download operation again.

- **I95-32509** Generated configuration objects are shown by default in GUI and PCLI

- **I95-32660** `saltMaster.log` files rotate once daily with a maximum of 25 rotated files, consuming a large amount of disk space.  This has been changed to rotate hourly, with a maximum of 25 rotated files.

- **I95-33024** Specifying a `metric` value within `advertise-default` of OSPF causes advertisements to be withdrawn

  Until the system is upgraded to 4.2.5, this issue can be mitigated by remove `metric` value from `advertise-default` configuration

- **I95-33174** Some LTE cards do not use the correct wireless bands for the AT&T network

- **I95-33432** Path MTU discovery could be fooled by a (bad acting) network element that fragments large packets in spite of the do-not-fragment (DF) flag

  _**Symptom:**_ Sessions utilizing large packets (like those in some print jobs) may result in failed attempts

  _**Conditions:**_ in-path network element fragments packets with DF bit set.

- **I95-33485** Upgrading a HA node of a 128T router can result in traffic being dropped

  _**Symptom:**_ Existing traffic for some services are blackholed during upgrade

  Until the system is upgraded to 4.2.5, this issue can be mitigated by completing the upgrade of both nodes or restart non-upgraded 128T

- **I95-33506** File descriptors can leak upon incorrectly configuring a non-existent namespace within an interface type of `host`.

  _**Symptom:**_ 128T application will fail to run network scripts and other applications

  _**Conditions:**_ Setting `network-namespace` to a value that does not exist on the host platform after committing configuration

  Until the system is upgraded to 4.2.5, this issue can be mitigated by removing the invalid configuration.

- **I95-33535** Interface name incorrectly allows for prefixed whitepace in configuration, resulting in failure to create interface.

- **I95-33556** 128T may drop inbound SVR traffic when destination service address and port overlaps with interface (waypoint) address and wayport. 

  _**Conditions:**_ `address` on a service matches that of the `network-interface` that participates in SVR AND `tenant` on the service matches the `tenant` on the `network-interface` depending on the service scope AND the `port-range` defined on the `network-interface` overlaps with `port-range` of the service. 

  Until the system is upgraded to 4.2.5, this issue can be mitigated by changing the `port-range` on the neighborhood to a range that does not overlap with the service. In 4.2.5 a configuration validation has been added to detect such overlap and provide user with appropriate error message.

- **I95-33634** 128T unable to bind to `device-interface`

  _**Symptom:**_ Interface will be administratively up but operationally down

  _**Conditions:**_ highway process faults can leave an interface unbound to _any_ driver, resulting in the inability for the system to rebind to the interface.

  Until the system is upgraded to 4.2.5, this issue can be mitigated by issuing a `reboot` on the impacted system.

- **I95-33668** Peer path fails to meet (default) SLA, triggering BGP prefix flapping

  _**Symptom:**_ Advertised routes are withdrawn and subsequently re-advertised with a new route metric.

  _**Conditions:**_ When a service with no `service-policy` configured, therefore utilizing system defaults, traverses a path below SLA.

- **I95-33683, I95-33951** When 128T Networking Platform is configured to use LDAP for authentication, login will fail if the user is a member of both `128t-user` and `128t-admin`

  _**Symptom:**_ User is unable to login.

  Until the system is upgraded to 4.2.5, this issue can be mitigated by removing the user from one of the two LDAP groups.

- **I95-33710** Working configuration fails to validate after upgrade

  _**Symptom:**_ Validation of the configuration will fail with the message `% Error: Candidate configuration is invalid: 1. name is required`. 

  _**Conditions:**_ `device-interface` of type `host` will fail validation if a `management-vector` does not exist.

  Until the system is upgraded to 4.2.5, this issue can be mitigated by configuring a `management-vector` on the `network-interface`s that exist within the `device-interface`.

- **I95-33793** SVR fails to recover session on multi-hop inter-node failure

  _**Symptoms:**_ Security lookup failure and packet drops.

  _**Conditions:**_ This scenario occurs only with multi-hop SVR, where an intermediate node WAN link fails, and the target alternate path is `outbound-only`.  This only affects existing sessions.  New sessions will be unaffected.

- **I95-33857, I95-33643** Short OTP QuickStart DHCP server lease time results in an initial OTP QuickStart failure. 

- **I95-34058** Session setup fails for outbound only when first packet exceeds MTU

  _**Symptoms:**_ Session setup fails

  _**Conditions:**_ Paths configured as `outbound-only`, and the first packet of the flow exceeds MTU (typically UDP).

- **I95-34090** A network-interface configured with multiple neighborhoods, where one of the neighborhoods defines a port range, will result in traffic being dropped on the defined range

  _**Symptoms:**_ SVR traffic is dropped when destined for a port range configured on its peer 128T router's neighborhood

- **I95-34092** `rotate log` command does not rotate `fastLane.log`, `serviceArea.log` and `flpp.log`.

- **I95-34113** DHCP lease management in the GUI shows no client leases exist

  _**Conditions:**_ firewall is running on the host 128T platform

  Until the system is upgraded to 4.2.5, this issue can be mitigated by adding the interface `veth` to the `TRUSTED` firewalld zone

- **I95-34135** CVE-2020-8597: A buffer overflow flaw was found in the ppp package

- **I95-34158** Modifying a port-range configuration value to include an overlapping range results in a list with an incorrect range.

  _**Conditions:**_ An existing range list is modified to include an overlapping range

  Until the system is upgraded to 4.2.5, this issue can be mitigated by entering a unique range of values that do not overlap.

- **I95-34160** Standby node can leak traffic out of its redundant interface when the shared MAC is set to the same MAC as the physical MAC

- **I95-34173** The loss of power for the routing manager standby node in a HA router configuration may lead to temporary BGP traffic drops on the primary node.

- **I95-34174** Added configuration `negotiate-capabilities` for BGP neighbor to optionally suppress sending the Capabilities Optional Parameter in the BGP OPEN message.

- **I95-34186** PPPoE interface is disconnected upon changing `device-interface` name

- **I95-34200** Influx database corruption resulting in `show entitlement` or displaying Event history from the Conductor UI to produce an error

- **I95-34209** Incorrect Zscaler plugin installed when installed via the Conductor GUI

- **I95-34310** Secure fields from the 128T configuration are in the commit audit events from config diff operations.

- **I95-34328** asset fails to set high-state and provides errors in `show asset summary`

  _**Symptoms:**_ show asset summary provides errors for an asset and does not perform high-state operations. The error `error: db5 error` would be seen in `/var/log/salt/minion.log` file

  _**Conditions:**_ When the centos rpmdb has been corrupted.

  Until the system is upgraded to 4.2.5, run the following commands on the target asset `mv /var/lib/rpm/__db* /tmp; yum clean all; dnf clean all`

- **I95-34407** Renaming a configuration list item can result in factory default values being populated in the renamed object.

- **I95-34408** When creating/renaming a device-interface, prefix-delegation configuration was blocked until dhcp is explicitly disabled


## Release 4.2.4

:::note
The 4.2.4 release is a superset of the 4.2.3 release. Features and corrections in the 4.2.3 release are not provided in these release notes. Please refer to the [4.2.3 release notes](#release-423) for further information.
:::


### Issues Fixed

- **I95-30084** Empty BGP neighbor/transport/local-address prevents configuration from being committed

- **I95-32449** WayPoint allocation failures resulting in session setup failures

- **I95-32463** DHCP server rejects packets larger than 500 bytes

- **I95-32625** service-route/host configuration results in invalid route, dropping packets

- **I95-32754** DHCP Server can flood the journal with monitoring messages

- **I95-32843** System can fault when routing loop is created with OSPF

- **I95-32902** LTE APN name not displayed correctly

- **I95-32957** The LTE reset command did not handle some error cases resulting in a failure

- **I95-33122** Configuration now enforces non-forwarding-fabric interfaces must be in the same subnet as its HA pair

- **I95-33148** Non-forwarding interfaces could not come up if a manually created bridge interface existed with the same IP address with that of another 128T provisioned interface

- **I95-33149** Changing a HA non-forwarding interface address will fail to reestablish the connection between nodes

  _**Corrective Action:**_ Restart 128T on the node that did not receive the config change

- **I95-33161** Interfaces that are DHCP enabled within linux (128T not running), returning it from being managed by 128T will result in the error: `dhclient(pid) is already running - exiting`. The interface, as a result will not be able to acquire any IP, until the interface is restarted.

  _**Corrective Action:**_ Invoke `ifdown` on the interface being converted by 128T

- **I95-33170** `show system connectivity internal` incorrectly shows interprocess communication connections status as disconnected

- **I95-33216** Interfaces that are DHCP enabled that are "returned" to linux after 128T shutdown will result in the dhclient process being killed. This results in the interface being unable to renew its dhcp lease after it expires.

  _**Corrective Action:**_ Create a `oneshot` service to be invoked by 128T at `ExecStopPost` so that the `control-group` is separate from 128T service.

- **I95-33277** Traceroute using TCP does not work if udp-transform is enabled.

  _**Corrective Action:**_ Traceroute over UDP should be used as a workaround

- **I95-33279** Path MTU discovery unresolvable when no ICMP is generated

- **I95-33296** Removing a redundant interface and its corresponding redundancy-group within the same commit would abort the commit

- **I95-33441** Changing node name can cause the 128T to fault on shutdown due to a rare race condition

- **I95-33449** 128T Application fault on startup of LTE interface and node name change that is taking place during the startup

- **I95-33474** 128T added MLX4 Azure Accelerated networking devices

- **I95-33486** commit failed when PPPoE interface is set in next-hop interface on service-route

- **I95-33529** Promiscuous mode on ethernet interfaces is not dynamically reconfigurable

- **I95-33536** 128T fault on shutdown with very large number of peer paths

- **I95-33586** Using hostnames rather than IP addresses for nat-target or target-address in a service-route would cause config validation to fail and report an Invalid IP when inspector is enabled.


## Release 4.2.3

:::note
The 4.2.3 release is a superset of the 4.2.2 release. Features and corrections in the 4.2.2 release are not provided in these release notes. Please refer to the [4.2.2 release notes](#release-422) for further information.
:::


### Issues Fixed

- **I95-33264** Secondary HA node reboot may result in traffic no longer flowing through the fabric

- **I95-33278** Asset/hostname missing from syslog messages


## Release 4.2.2

:::note
The 4.2.2 release is a superset of the 4.2.1 release. Features and corrections in the 4.2.1 release are not provided in these release notes. Please refer to the [4.2.1 release notes](#release-421) for further information.
:::


### Issues Fixed

- **I95-32521** Packets continuously dropping on HA failover triggered by power outage

- **I95-32686** BFD packets only sent once a minute on an outbound only link even when the peer is sending once a second

- **I95-32699** Packets dropped on HA failure with adaptive encryption


## Release 4.2.1

:::note
The 4.2.1 release is a superset of the 4.2.0 release. Features and corrections in the 4.2.0 release are not provided in these release notes. Please refer to the [4.2.0 release notes](#release-420) for further information.
:::


### Issues Fixed

- **I95-32264** In large deployments Automated provisioner can take an extended amount of time to transition a node to a "RUNNING" state

- **I95-32335** Access Policy label for tenant displays as "Custom DHCP options"

- **I95-32444** Highway Manager application may fault if HA node attempts to recover sessions with an app-id service before app-id modules are loaded

- **I95-32479** access policy table and source tenant table do not increase as more memory is allocated

  
## Release 4.2.0

:::important
The 4.2.0 software reserves address range 169.254.130.0/24 by default. This is for a DHCP server generated address pool that is needed for the new DHCP server enhancements.
:::

### New Features and Improvements

- **I95-9057** Service-route visualization

- **I95-11293** `show capacity` command displays maximum number of flows, maximum number of fib entries, maximum number of arp entries, and the maximum number of action entries.

- **I95-12112, I95-23428, I95-23576, I95-25658, I95-28084, I95-28089, I95-28758, I95-28848, I95-28854, I95-29061, I95-29808** GUI has been redesigned, designing for increased usability, and easier access to information

- **I95-15831, I95-20788, I95-26921** Native Management Interface Configuration (also referred to as non-forwarding interface)

- **I95-17224** Stateful HA NAT Pool for Source NAT

- **I95-17457** SNMPv2 128T Traps

- **I95-18465**, **I95-25578, I95-25734, I95-29277** DHCP enhancements

- **I95-19779** Peer Paths are now referenced by object names instead of the internal IDs. The format for a peer path is: peer-name | destination (can be an adjacency IP or a host-name | node-name | device-port | VLAN-id

- **I95-20413** VLAN support on interface types of KNI

- **I95-20754** IPFIX DeltaCount Fields

- **I95-20755** IPFIX Interface Fields

- **I95-21279** Azure Accelerated Networking Support

- **I95-21421** Support Multiple paths to Conductor

- **I95-21605** Multiple IP Addresses supported per network-interface

- **I95-22853** IPFIX Single Flow Records

- **I95-23024** QuickStart Zero Touch Provisioning

- **I95-23317, I95-24667, I95-25214, I95-25596, I95-25621, I95-28788** `tech-support-info` now includes LDAP debugging information, locally generated configuration files, yum logs, systemd service status, configuration versions

- **I95-23378** GraphQL API for ping command now indicates which fields are required

- **I95-23556** User preferences can now be exported and imported across platforms

- **I95-24301** Native Support for FTP Passive mode

- **I95-24666** Apply router override for conductor(s) address

- **I95-25063, I95-27581** BFD Scaling Enhancements

- **I95-25374** `delete sessions` command safety measures

- **I95-25530** Dynamic Peer Update Show Command

- **I95-25668** Show sessions enhancement - Added flow direction

- **I95-25724** Power Saver mode now configurable

- **I95-25793** Handling of inter-router session expiry race conditions

- **I95-25885** Web-driven Conductor upgrade now displays the version to be upgraded prior to confirmation of the upgrade

- **I95-26190** Cleared alarms are now overlaid on Custom Reports at the time at which they occurred

- **I95-26220** Event Manager user-level access

- **I95-26271** Application to assist in determining appropriate huge pages

- **I95-26338** DHCP Server per network-interface

- **I95-26490** DNS feature enhancements

- **I95-26644** User preference has been added to disable upgrade available notification

- **I95-26779** GUI-based PCLI can now be "undocked" from within the GUI

- **I95-26804** Congestion Control fairness flows enhancements

- **I95-26861** Improved the performance and reduced the memory footprint of time series data collection

- **I95-26914** IPv6 DHCP release/renew command enhancements

- **I95-26793** Validation does not exist to prevent provisioning a service-route for a service belonging to another router-group

- **I95-27024** GUI Log Retrieval page has filtering capabilities and easier navigation

- **I95-27197** Firewall Detector scaling enhancements

- **I95-27739** VRRP active/active interface negotiation 

- **I95-27805** Generated configuration is now hidden by default.  A toggle exists in Config Explorer to display generated configuration

- **I95-27886** Session Duplication support for inter-node links

- **I95-28187** Packet Duplication for non-SVR packets

- **I95-28339** Host KNI Default Route

- **I95-28341** Routing Manager Configuration Optimization

- **I95-28433** Dropped Packets Troubleshooting Tool

- **I95-28442** Linux command `connect` has been added to easily reverse SSH into managed routers from Conductor's Linux shell

- **I95-28461** `show asset summary` command

- **I95-28482** `device-interface/target-interface` does not have input validation, allowing for incorrect configuration

- **I95-28744** GraphQL API added for service ping

- **I95-28881, I95-31050** SIP ALG support via plugin

- **I95-28884** Spotlight search feature within GUI

- **I95-28896, I95-29707** Configuration commit performance improvements

- **I95-28912** Removed Session Optimization Limitations on Latency

- **I95-29149** NIC Flow Control enable/disable support

- **I95-29273** Node page within GUI offers link to launch PCLI session directly to device

- **I95-29568** BGP withdrawal of routes if path does not meet SLA

- **I95-29749** Carrier preferences are now supported for Sierra Wireless cards

- **I95-29933** Improved system performance for peer path state processing

- **I95-30884** New Data process CPU Core count mode attribute

- **I95-31331** `lte-info` now support JSON output

- **I95-31454** Notifications have been added for Automated Provisioner events

### Issues Fixed

- **I95-19549** Configuration Generation will fail to generate a peer configuration if the peer name is not the same as the router name

- **I95-19779** Peer Path stats use Device Interface ID, in 4.2.0 the name will now be used.

- **I95-20458** No feedback is provided to the user from the GUI in the event of an upgrade failure on the Conductor

- **I95-21677** No feedback is provided when refreshing available software versions, either successfully or unsuccessfully

- **I95-21979** An ethernet interface with DHCP enabled cannot be created from GUI. Validation does not pass and throws the error: `"There must be at least one address configured when type is not pppoe and dhcp is disabled"`.

- **I95-23758** Sessions established with undefined, experimental or reserved protocols (143-255) can cause a failure to remove all sessions.

- **I95-23915** A user may be unexpectedly logged out of the GUI.  The web server log will contain the message ```error: Halting application due to error generatedMessage=true, name=AssertionError [ERR_ASSERTION], code=ERR_ASSERTION, actual=false, expected=true, operator===, _worker=3```

- **I95-24380** Configuration validation does not prevent defining the same IP address within tenant/member-of

- **I95-24739, I95-29517** Persistent alarm when peering adjacency is removed or peer IP address is changed

- **I95-24759** Delete user button exists for user admin, which should not be allowed to be removed

- **I95-24777** A privilege violation exists where an account with the role of `user`, can `scp` backups from the `/etc/128technology/config-exports` directory.  This functionality should be limited only to accounts with the role of `admin`.

- **I95-25217** Installer page "show install log" consumes 100% of CPU on web client

- **I95-25277** Custom Reports do not indicate the graph point location when routers poll at differing sampling intervals

- **I95-25329** Nested navigation bars are created when launching the PCLI from within the GUI

- **I95-25343** API requests for top 10 sessions will return no data if time window does not match the sampling interval

- **I95-25363** Alarms button in topology info pane is now disabled when no alarms are present

- **I95-25553** Disabling and re-enabling a service is not real time configurable and required a restart of the 128T service.

- **I95-25582** Dynamic sampling interval for IPFIX is computed only once when configuration is loaded instead of current bandwidth

- **I95-25589** Administrators are unable to create a username that contains either numbers or symbols

- **I95-25681** session-count metrics can decrement less than zero, creating a very large number

- **I95-25694** Pressing the enter key does not perform the default button operation in a GUI dialog box

- **I95-25801** `auditdReceiver` process can fault on 128T shutdown

- **I95-25815** Virtualized AWS Conductor startup incorrectly requires DPDK interface support

- **I95-25873** GUI Router page displays Session Count, Session Arrival Rate and Session Departure rate down to 17 digits of precision where it should be rounded down to only 2

- **I95-25984, I95-32181** Power outage may result in a zero byte global.init file, rendering 128T unable to start

- **I95-26009** Unable to login to 128T when configured to use LDAP and the user database has over 10,000 entries

- **I95-26072** Critical message `"Failed to restore from backup messages on routers"` incorrectly displayed during the upgrade of a node of a HA router pair

- **I95-26160** Managed 128T router connectivity state not updating properly in `show system connectivity`

- **I95-26313, I95-31136** traceroute not supported through 128T routers and TTL is not correctly decremented. With this correction, traceroute is now supported and the TTL will be decremented on each hop. 

- **I95-26412** Interfaces configured for DHCP do not display their learned address on the interface list on the Router page of the GUI

- **I95-26465** If locale is set to a language other than English, available software versions for upgrade will not be displayed

- **I95-26634** BGP routes are not updated when VLANed interface is operationally down

- **I95-26793** service-routes associated with services outside of router-based-services are incorrectly being applied

- **I95-26996** When synchronizing a new node into a HA pair (RMA), if the new node is on a version older than the existing node, there will not be an option to upgrade the newly added node through the GUI

- **I95-27150** PCLI piping allows execution of Linux commands that can compromise the integrity of the system

- **I95-27194** Node health CPU information shows CPU utilization incorrectly

- **I95-27302** "TRAFFIC" audit events can sometimes report `"An unknown traffic event occurred"`

- **I95-27597** `"send command upgrade router all <version>"` will fail if the version contains the rpmspec field (i.e. '-1' following the version)

- **I95-27707** 128T Router node does not propagate software repository communication failures in the Conductor UI

- **I95-27711** Metrics on Custom Reports drop during the activation of configuration

- **I95-27722** Alarms for "Peer not reachable" may not clear and will persist after nodes are back and operational

- **I95-27881** Enabling ZScaler plugin required restart of 128t-ipsec service, service is not restarted on configuration commit

- **I95-27946** Commit may fail on Conductor when node in router pair is stopped

- **I95-28096** Rolled up (average) metrics are incorrectly computed

- **I95-28103** After a restart of the highway process, any interfaces that were managed by 128T that were not gracefully restored, now provide detailed logging information regarding their state and corresponding transition.

- **I95-28166** Superfluous analytics log messages when two nodes in a HA pair are unable to peer

- **I95-28265** Metered metrics, such as session arrival rate, may be slightly inaccurate

- **I95-28535** Unable to obtain DHCP lease after redundant interface state transitions back to operationally up

- **I95-28766** Conductor PCLI shows configuration change when no changes have been performed

- **I95-28770** Session Optimization takes precedence over packet-retransmission feature, disabling packet-retransmission when session optimization is enabled

- **I95-28776** Retransmitted packets are not acknowledged when both packet-retransmission and tap-multiplex are configured

- **I95-28806** `show config` on managed router incorrectly allows option for `force`

- **I95-29115** service-route / max-sessions is not real-time configurable and requires a restart of the 128T service

- **I95-29134** `save tech-support-info` indicates the failure `%Error: Failed to execute the 'save tech-support-info' RPC: Fatal error creating tarball` when files being archived contain spaces; even though the operation completes successfully

- **I95-29139** If a commit or validate operation fails on the GUI, the spinner will spin forever

- **I95-29177** Alarm "source" extends past the end of the browser for long values

- **I95-29208** Can not access Configuration Explorer after selecting field within explorer

- **I95-29517** Peer unreachable alarm can't be cleared when peer becomes reachable after related config changes

- **I95-29268** VRRP incorrectly is allowed to be configured multiple times on a single device-interface

- **I95-29595** Permissions of 128T binaries are permissive for all users of the system.  This has been changed to only allow binaries to be executed by root and specific groups

- **I95-29627** Accelerated Network Interfaces are not restored back to Linux when 128T is stopped when running in Azure

- **I95-29637** GUI Validation could not be completed due to a service error on non visible configuration parameters

- **I95-29664** netvsc devices on Azure can cause Accelerated Network Interfaces to fail to initialize

- **I95-29733** Conductor UI may not provide an indication that a software version check is in progress

- **I95-29741** Salt connection between Router and Conductor may not reestablish on a connection failure

- **I95-29801, I95-31170, I95-31116** NodeMonitor application fault when sysLimitsOverride parameters are set

- **I95-29811** Session created with a non-standard protocol (e.g. security audits performing "fuzzing") can cause flows to never be deleted and exhaust the flow table

- **I95-29812** Service ping does not work with `peer-connectivity` set to `outbound-only` between 128T routers

- **I95-29821** Packet fragmentation for SVR paths is larger than configured MTU by the L4 packet header size

- **I95-29932** `routingManager` process can fault on shutdown of the 128T service

- **I95-29976** Large configurations can cause the router to request the configuration multiple times, causing an unnecessary duplication of effort

- **I95-29990** When a KNI interface starts as operationally down, either due to oper status or monitoring script or a watched interface down for T1, the state remains the default of unknown and never transition to down.

- **I95-30002** Service route generation skipped for generation set to true if another service with the same name is set to generation false

- **I95-30011** System hostnames that cannot be resolved cause two HA nodes to achieve quorum after DNS lookup times out (approximately 40 seconds)

- **I95-30078, I95-30268** Traffic does not switch to standby interface on management path communication failure 

- **I95-30103** Creating tenants using output of `show config running flat` does not work (Entering flat configuration into PCLI does not always create the configuration)

- **I95-30270** `show network-interface` intermittently displays `<unresolved>` for a functioning interface

- **I95-30315** DHCP Server fails to start after system power failure and power recovery

- **I95-30327** On peer path failure, peer path may remain down if going through a nat to get to the remote peer

- **I95-30334** Shared interfaces can operate with both interfaces on each HA nodes as active (each acting in standalone mode)

- **I95-30354, I95-30687** admin user or 128t-admin group missing after upgrade

- **I95-30383** Connection error to node may result in configuration not being applied

- **I95-30388** SVR traffic can briefly stop when redundant node reboots

- **I95-30401** Asset remains in pending state on initialization if the connection is terminated during pending state operations

- **I95-30448** Application module retry interval takes an extended time after a failure. With this correction, if a failure is encountered the retries will start at 60 minutes and increase exponentially for each subsequence failure after the second failure.

- **I95-30497, I95-30835** Configuration validate not timing out after time threshold met, preventing additional timeouts.

- **I95-30457** highway process may incur a system fault when processing a BFD packet at the same time the process is shutting down

- **I95-30625** Access Policy Table is fixed at 2048 entries and does not scale according to huge pages size

- **I95-30687** 128t-admin group removed from admin user during HA peer upgrade

- **I95-30695** GUI PCLI Process left running if the connect command is run and user navigates away from the page 

- **I95-30734** "worker-core packet-processing-utilization" would show 100% due to improper handling of unidirectional flows when packet-retransmission feature is enabled

- **I95-30742** Incorrect packet fragmentation when first packet is a jumbo packet

- **I95-30777** Node restart in an HA router may result in extended time to resolve active node

- **I95-30781** Invalid configuration accepted when adjacency or neighborhood port-range does not have end-port configured

- **I95-30833** BGP over SVR neighbor not connecting due to missing route

- **I95-30884** DHCP server sends responses out multiple interfaces, with incorrect MAC

- **I95-30934** Services with matching tenants and protocols with port ranges ending in 65535 may result in services failing.

- **I95-30962** Fatal Log message not raised when invalid local.init or global.init formatting is detected.

- **I95-30995** On 128T shutdown, X710 NIC Interfaces do not establish link with kernel message `"Rx/Tx is disabled on this device..."` 

- **I95-30922, I95-31072** Highway Manager application fault as a result of a small action pool size when sysLimitsOverride parameters are set

- **I95-31005** 128T does not safely handle the case where a DHCP server provides a client lease with an address of 0.0.0.0

- **I95-31022** traceroute not decrementing TTL for each hop through the 128T router

- **I95-31089** tenant member-of applied to a neighborhood associated with a network-interface is not dynamically reconfigurable

- **I95-31136** Incorrect ICMP unreachable source ip address when using IPv4 to IPv6 Interworking

- **I95-31170** nodeMonitor process can fault on shutdown

- **I95-31191** proxy-ip not automatically added for SIP ALG Plugin support 

- **I95-31200** BGP timer configuration is not dynamically configurable

- **I95-31214** ICMP sessions do not fail over to HA node when path SLA is no longer being met for packet loss threshold

- **I95-31232** Peer router highwayManager faults when pinhole traffic originating from this peer is sent to a remote peer that is restarting.

- **I95-31244** When a pinhole session is restored upon failover, if the routing table is not up-to-date, the packet will incorrectly be routed to the same interface from which it came from.

- **I95-31255** Intermittently managed routers may send a `"No connectivity"` alarm to the Conductor

- **I95-31330** lte-info erroneously reports `"excellent"` signal strength when it is not

- **I95-31333** highwayManager application fault during multiple interface state transitions

- **I95-31515** highwayManager application faults if no paths are available for session duplication

- **I95-31570** Changing the order of custom charts can sometimes render the dashboard page inoperable

- **I95-31672** New version of Chrome does not consider our self signed web certifiate valid

- **I95-31742** routingManager application can fault when a device interface is removed

- **I95-31860** `shared-phy-address` is not dynamically reconfigurable

- **I95-32065** NAPT translation does not work with for a service-route with a next-hop

- **I95-32361** Peer path MTU can not be resolved for waypoints that share an overlapping IP address

## Feature Deprecation

- **I95-28388** Table and Tile display options in the Configuration dialogs are no longer available

- **I95-25275** atop rpm is no longer a requirement and is not installed with 4.2.0 for new installations.
  The atop service was previously used to collect statistical information. The service by default was masked and results in daily emails being sent to the root user.
  If the deployment uses the atop service beyond the requirements of the previous 128T software releases, it can remain. If the deployment does not use the atop service, the rpm can be removed and in so doing emails will no longer be sent to the root user email. An example of the emails sent is: `Failed to try-restart atop.service: Unit is masked.`


## Special Considerations

- Validation has been added to prevent issues when destination service address and port ranges overlap with interface (waypoint) address and wayport ranges. If your configuration has an overlapping port range prior to the upgrade, you will now receive a validation error. The configuration must be remediated in order to make any additional changes. (I95-33556)

- Support has been added to provision management interfaces.  Typically, these are Linux interfaces that are not part of the 128T configuration. These interfaces are called non-forwarding interfaces. It is strongly recommended that non-forwarding interfaces now be configured within the 128T.  When the Conductors are upgraded to 4.2.X, the configuration validation will provide a warning when non-forwarding interfaces are not configured for 128T routers configured in a HA pair. If non-forwarding interfaces are configured prior to upgrading the Conductors to 4.2.X, the shared or fabric device interface type must be explicitly set.  DHCP however is not supported. Note: 4.1.5 does not raise a validation error if the interface had DHCP. (I95-30831)

- When creating non-forwarding interfaces on pre 4.2.0 routers, these interfaces should not be configured with default routes until after upgrading the routers to 4.2.0 or greater. (I95-30940)

- Support has been added to allow the 128T Software to automatically determine the number of CPU forwarding cores that the router will use. In previous releases the "automatic/manual" parameter was not available and the core count was defined in environment config or within the UI. If set within the environment config (local.init), 4.2.X will set core count to automatic and determine the number of cores to use. If set in the UI, this parameter will be set to manual and the existing UI value will be used. Note that if automatic is set and the core count is changed in the PCLI, the change will be accepted as valid configuration but the automatic parameter will override as the automatic parameter takes precedence over the value in the forwarding core count. (I95-30884)

- Prior to 4.1.5, peering with routers that have the same IP addresses was not supported. In 4.1.5 or greater remote peers having the same IP address is now supported in one direction, with the use of "outbound-only". 128T currently does not support ALL routers having the same IP address, the same IP address support is unidirectional. For example:

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

- On 128T nodes installed after July 1, 2019 on pre 4.2.X versions, Chrome running on MAC OSX Catalina does not consider the 128T self-signed web certificates valid. Apple has put out an advisory: https://support.apple.com/en-us/HT210176 . Once the node is upgraded to 4.2.X, create a new self-signed web cert in the PCLI `create certificate self-signed webserver` (I95-31672)


## Caveats

- **I95-29592** Conductor UI and/or PCLI may not update the asset software version correctly

  _**Symptom:**_ The Conductor UI and/or the PCLI may not correctly reflect the software version running on the asset

  _**Conditions:**_ After the asset has been upgraded

  _**Corrective Action:**_ If the asset is not updated after ~5 minutes after an upgrade is performed, the salt-minion will need to be restarted on the respective node. This is done with the following command on the node as the root Linux user:

  ```
  systemctl restart salt-minion
  ```

- **I95-27808** `sync peer addresses router force` from Conductor may not trigger router to send address information from peer

  _**Symptom:**_ When performing the following command on the Conductor PCLI, `sync peer addresses router force` the router may not provide the peer address information

  _**Conditions:**_ Unknown

   _**Corrective Action:**_ Perform the PCLI command on the router to update the information on the Conductor.