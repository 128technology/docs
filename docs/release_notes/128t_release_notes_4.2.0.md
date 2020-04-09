---
title: 128T 4.2.0 Release Notes
sidebar_label: 4.2.0
---

:::important
The 4.2.0 software reserves address range 169.254.130.0/24 by default. This is for a DHCP server generated address pool that is needed for the new DHCP server enhancements.
:::

## New Features and Improvements
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

## Special Considerations
- Support has been added to manage the Linux interfaces that are not part of the controlled 128T interfaces. These interfaces are called non-forwarding interfaces. These interfaces should be configured, when the conductors are upgraded to 4.2.0 the configuration validation will provide a warning that a non-forwarding interface is not configured until this configuration is added for each node/router. If these interfaces are configured and defined before the conductors are upgraded, the shared or fabric device interface type must be explicitly set and DHCP is not supported. Note: 4.1.5 does not raise a validation error if the interface had DHCP. (I95-30831)

- Support has been added to allow the 128T Software to determine the number of CPU forwarding Cores that the router will use. In previous releases the "automatic/manual" parameter was not available and the core count was set in either the local.init or in the UI for the number of cores. If local.init is set only, 4.2.0 will set to automatic and determine the number of cores to use. If set in the UI, this parameter will be set to manual and the existing value will be used. Note if automatic is set and the core count is changed in the PCLI the change will be accepted as valid configuration but the automatic parameter will override as this parameter takes precedence over the value in the forwarding core count. (I95-30884)

- Prior to 4.1.5, any peering with routers that have the same IP addresses was not supported. In 4.1.5 or greater remote peers having the same IP address is now supported in one direction, with the use of "outbound-only". 128T currently does not support ALL routers having the same IP address, the same IP address support is unidirectional. For example:
  ```
    The following is supported:
    
        R1(172.16.1.1) --- peered --- R2 (192.168.1.1)
                  |------- peered --- R3 (192.168.1.1)

    The following is not supported:
    
        R1(192.168.1.1) --- peered --- R2 (192.168.1.1)
                   |------- peered --- R3 (192.168.1.1)
  ```
- When creating non-forwarding interfaces on pre 4.2.0 routers, these interfaces should not be configured with default routes until after upgrading the routers to 4.2.0 or greater. (I95-30940)

- On 128T nodes installed after July 1 2019 on pre 4.2.0 versions, Chrome running on MAC OSX Cataline does not consider the 128T self signed web certificates valid. Apple has put out an advisory: https://support.apple.com/en-us/HT210176 . Once the node is upgraded to 4.2.0, create a new self signed web cert in the PCLI `create certificate self-signed webserver` (I95-31672)


## Feature Deprecation

- **I95-28388** Table and Tile display options in the Configuration dialogs are no longer available

- **I95-25275** atop rpm is no longer a requirement and is not installed with 4.2.0 for new installations.
  The atop service was previously used to collect statistical information. The service by default was masked and results in daily emails being sent to the root user.
  If the deployment uses the atop service beyond the requirements of the previous 128T software releases, it can remain. If the deployment does not use the atop service, the rpm can be removed and in so doing emails will no longer be sent to the root user email. An example of the emails sent is: `Failed to try-restart atop.service: Unit is masked.`

## Issues Fixed

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

## Caveats

- **I95-29592** Conductor UI and/or PCLI may not update the asset software version correctly

  _**Symptom:**_ The Conductor UI and/or the PCLI may not correctly reflect the software version running on the asset

  _**Conditions:**_ After the asset has been upgraded

  _**Corrective Action:**_ If the asset is not updated after ~5 minutes after an upgrade is performed, the salt-minion will need a restart on the asset node that does not update the version. This is done with the following command on the node as the root Linux user:
  ```
systemctl restart salt-minion"
  ```

- **I95-27808** `sync peer addresses router force` from conductor may not trigger router to send address information from peer

  _**Symptom:**_ When performing the following command on the Conductor PCLI, `sync peer addresses router force` the router may not provide the peer address information

  _**Conditions:**_ Unknown

  _**Corrective Action:**_ Perform the PCLI command on the router to update the information on the conductor.