---
title: 128T 4.3.0 Release Notes
sidebar_label: 4.3.0
---

## New Features and Improvements

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


## Special Considerations
- If upgrading from 4.1 consult the [4.2.3 release notes Special Considerations](./release_notes/128t_release_notes_4.2.3.md#special-considerations) section


## Issues Fixed
- **I95-14559** Adding a device-interface in the GUI incorrectly produces an error that type is not set to PPPoE

- **I95-30084** Empty BGP neighbor/transport/local-address prevents configuration from being committed

- **I95-31492** Peer path uptime in `show peers detail` is incorrect

- **I95-31611** Left navigation pane is improperly rendered when filter slideout is opened

- **I95-31661** GUI incorrectly shows state as `Unknown` for management interfaces

- **I95-31920** Browser page refresh is required after Conductor upgrade in order to login

- **I95-32022** `dhcp release` has been renamed to `release dhcp` to properly match verb syntax

- **I95-32108** Header is poorly rendered in GUI when browser width is small

- **I95-32244** Download of software upgrade may fail and not provide feedback

- **I95-32334** Session count sparkline value is 2x of the actual value

- **I95-32463** DHCP server rejects packets larger than 500 bytes

- **I95-32579** Edit config header overlaps with Task Panel in GUI

- **I95-32583** Custom charts with session-count can be incorrect in a HA configuration

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

- **I95-33264** Race condition exists for HA shared LAN interfaces wherein if the primary node is restarted, the primary interface may not take over after the restart, causing traffic to be blackholed

- **I95-33277** Traceroute using TCP does not work if udp-transform is enabled.

  _**Corrective Action:**_ Traceroute over UDP should be used as a workaround

- **I95-33278** End of log messages were being truncated when sent to syslog

- **I95-33279** Path MTU discovery unresolvable when no ICMP is generated

- **I95-33296** Removing a redundant interface and its corresponding redundancy-group within the same commit would abort the commit

- **I95-33441** Changing node name can cause the 128T to fault on shutdown due to a rare race condition

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

- **I95-32789** Peer stats in Conductor UI not provided during upgrade

  _**Symptom:**_ When upgrading a node from pre 4.3 to 4.3, the peer node will not provide general stats in the conductor UI until the peer is also upgraded.

  _**Conditions:**_ When nodes of a router or conductor pair are on different versions (for routers this is the short transition where the first node is upgraded and the second node is in the process of upgrading but still operational)

  _**Corrective Action:**_ NA, when both nodes are operational and on the 4.3 version the stats information on the router dialog will be provided. Stats can still be retrieved from the PCLI of the node while it is running.