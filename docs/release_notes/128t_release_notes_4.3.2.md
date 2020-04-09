---
title: 128T 4.3. Release Notes
sidebar_label: 4.3.2
---

## Special Considerations ##
Consult the [4.3.0 release notes Special Considerations](./release_notes/128t_release_notes_4.3.0.md#special-considerations) section

## Issues Fixed
- **I95-33559** `send command download router all <version>` will report `% Error: Failed to execute the 'download-software' RPC: Request failed with error: TIMEOUT` even though the command completes successfully.

  _**Conditions:**_ Execute download command from Conductor with >25 managed assets.

- **I95-33655** GUI Ping and Service Ping do not report incremental ICMP response messages; only the summary is produced when the command has completed.

  Until the system is upgraded to 4.3.2, this issue can be mitigated by using the PCLI versions of the same command.

- **I95-33759** GUI DHCP Client Lease table reports no leases while DHCP server has active client leases.
  Until the system is upgraded to 4.3.2, this issue can be mitigated by using the PCLI version of the same command: `show network-interface application node <node-name> name <interface-name>`

- **I95-33789** Forwarding core count incorrectly reported in GUI under Router -> Node -> Platform Information
  Until the system is upgraded to 4.3.2, this issue can be mitigated by using the PCLI version of the same command: `show platform cpu `

- **I95-33845** security package updates
  
- **I95-33938** REST API missing documentation reference for the command to delete configuration backups.  The missing and supported API is  `DELETE /api/v1/config/export/:filename`

- **I95-33979** Custom Reports in the GUI created with peer path metrics for jitter, latency, or loss are rendered as a line chart instead with a single value instead of one per path

  _**Conditions:**_ Custom Reports rendering data from peer paths when multiple peer paths exist

- **I95-34015** nginx process does not properly restart during a rollback of 128T

  _**Symptom:**_ systemd continually attempts to restart nginx process

  _**Conditions:**_ 128T software is being downgraded to version 4.2.0 <= version <= 4.2.4

- **I95-34061** Linux command equivalent of the PCLI `connect` command: `connect128t --router <router-name> --node <node name>` produces the cosmetic error:
  
  ```
  /usr/lib/128technology/par/connect128t.par/subpar/runtime/support.py:117: UserWarning: Unable to extract to requested directory '/usr/lib/128technology/unpar/connect128t', falling back to tmp dir
  ```
  There is no impact to the functionality of `connect128t`

- **I95-34068** SVR sessions fail to establish due to waypoint allocation failures after HA node failover.

  _**Symptom:**_ The following warning log is generated:
  
  ```
Mar 03 09:25:10.813 [HWMC| – ] WARN (icmpManager ) Base Exception: failed to allocate ports for WayPoint; intf=5.0; local=192.0.2.100; remote=198.51.100.128
  ```

  Until the system is upgraded to 4.3.2, this issue can be mitigated by removing the corresponding adjacency configuration and adding it back.
  
- **I95-34164** Load balancer occasionally returns standby paths during packet duplication flow setup
  
- **I95-34249** Time scale selector in upper right hand of Top 10 Sessions only shows the last hour of data, regardless of what value is selected.

- **I95-34371** Large FIBs can take excess of 30 seconds to load, causing the highway process to fault and restart

  _**Symptom:**_ System would appear to take a long time to load its FIB

  _**Conditions:**_ System running at TRACE log level may induce this problem

  Until the system is upgraded to 4.3.2, this issue can be mitigated by ensuring the system is configured at log level INFO, and if necessary, reduce the size of the service configuration.

- **I95-34397** ARP caching and reverse MAC learning is not triggered when an ARP response takes longer than 1 second

- **I95-34421** Lenovo onboard Intel X722 NIC is not recognized by 128T and cannot be used as a forwarding interface

- **I95-34498** Erroneous centos-release-yum4 errors in `/var/log/salt/minion` log file

  _**Symptom:**_ Log messages appear in salt minion file

  ```
2020-03-25 17:59:37,893 [salt.loader.12.230.70.246.int.module.cmdmod][ERROR ][18140] stdout: package centos-release-yum4 is not installed
  ```

  _**Conditions:**_ Automated Provisioner performs a software version query 
  
- **I95-35477** Interface never becomes active when `shared-phys-address` is configured to be the same as the physical MAC

- **I95-34645** Swagger API for "clone" and "move" operations are incorrect.  They are `/config/{configStore}/authority/district/{district}/clone` when they should be `/config/{configStore}/authority/district/clone`

- **I95-34653** SNMP IF-MIB does not display correctly when a non-forwarding management interface is present

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