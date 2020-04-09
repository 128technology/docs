---
title: 128T 4.1.5 Release Notes
sidebar_label: 4.1.5
---
## Product Enhancements
### Overlapping IP address support for adjacencies

Prior versions of the 128T software did not support two routers with the same WAN IP address communicating with common infrastructure. The most common manifestation of this issue is when two routers both share the same private IP address (e.g., 192.168.1.100) and are peering with the same head end router. In this scenario, the head end router cannot disambiguate between the two devices, which may lead to routing issues (e.g., traffic intended for one location may be sent to another location with the same address). It is for this reason that large-scale projects were discouraged/prevented from using private IP addresses, due to the high likelihood of IP collision.

## Defect Fixes
- **I95-30078** - HA node communication failure results in two systems both taking control of a shared (redundant) interface

  _**Symptom:**_ Traffic egressing a highly available device may get pinned to the wrong node in a highly available pair.
  
  _**Mitigation (pre-4.1.5):**_ Manually purge specific traffic flows that are pinned to the wrong node, to allow them to regenerate.
- **I95-30387** - ‘path MTU is unresolvable' alarm after 128T restart or BFD link erroneously shows 100% packet loss when device is behind a NAT

  _**Symptom:**_ when two 128T devices communicate with one another and there is an intervening NAT device (as is common in LTE networks), the path will show 100% packet loss for various NAT types.

  _**Mitigation (pre-4.1.5):**_ this problem was introduced in 4.1.5-1 and fixed in 4.1.5-2.


- **I95-25787** Overlapping IP address support for adjacencies (See Special Considerations below)

- **I95-27406** Ctrl-c does not terminate PCLI tab completion

- **I95-28337** When two HA systems have a temporary disconnection between one another, it may prevent administrative (PCLI) logins.

- **I95-29135** A 128T node may permanently lose "asset" connectivity to Conductor in the wake of a connection failure. The asset connectivity affects the Conductor's ability to remotely start/stop/upgrade a 128T router, but does not impact other administrative functions.

- **I95-29136** The PCLI now warns users logging in if their login exceeds the recommended number (4).

- **I95-29173** Tab complete produced unexpected output at various places within the PCLI.

- **I95-29188** Performance improvements for distributing large configurations from Conductor to routers

- **I95-29206** Routers establish connections to the Conductor in a way that avoids "thundering herd" problems

- **I95-29217** Inaccurate "There are changes waiting to be validated. Click the validate button to refresh the list." message in the configuration section of the conductor UI

- **I95-29238** Entering new configuration with non-interactive commands result in configuration not being applied.

- **I95-29252** Reconfiguring VLANs on interfaces would occasionally require a restart of 128T software.

- **I95-29278** Revertible path failover can sometimes not revert a session. This would cause a device to continue to use a secondary path in the event that a primary path fails, traffic is migrated to the secondary path, but later the primary path is restored.

- **I95-29282, I95-27182** Restart of the standby conductor node may impact administrative access to active Conductor node for up to 10 minutes.

- **I95-29283** The system's ARP table size now corresponds to the number of peering routers. This prevents ARP table overflow issues that may cause outages as nodes can no longer communicate with one another.

- **I95-29289** Certain dual failure conditions could result in a redundant interface being inactive on both nodes in a highly available pair. This could occur, for example, if one node was rebooted and its counterpart had a software failure (crash) before the first node was able to resynchronize completely. This would previously require a reboot to restore.

- **I95-29364** Node not transitioning from starting state on initial deployment. This affects the time to turn up a new system due to an extra restart being required.

- **I95-29367** Application can fault when administratively disabling a T1 Interface, requiring a software restart.

- **I95-29377** Application can fault when disabling an interface that is configured for DHCP, requiring a software restart.

- **I95-29430** Fixed a cosmetic issue when a progress indicator remained during a configuration commit action that resulted in validation errors.

- **I95-29688** An internal software communication failure resulted in the PCLI command 'show system' showing partial data.

- **I95-29841** Two services (routes) with the same IP address, where one has a security policy assigned and another does not, may cause an application fault when traffic hits that security policy. This would result in full traffic loss until the application restarted (approx. 30 seconds).

- **I95-29744** Restart of a node may result in failed sessions, requiring rebooting the counterpart node to restore service. This has only been observed during upgrade scenarios.

- **I95-30857** BGP routes not being updated after a large number of peer path state changes in conjunction with a configuration change. This may result in the 128T from advertising future route updates.

- **I95-30845** FIB entries become invalid after race condition with simultaneous configuration change and routing updates, resulting in routing failure.

- **I95-30598** Automated Provisioner issues continuous salt minion restarts for a node in a disconnected state, resulting in unnecessary reattempts.

- **I95-30424** With BGP, there exists a race condition on startup that results in FIB entries missing some routes, resulting in routing failure.

- **I95-30143** High state is applied to nodes when configuration has changed, causing unnecessary Conductor to router communication.  This has been changed to only apply high state when necessary. (Note: when a node is disconnected and reconnects high state is always applied)

- **I95-30011** SVR packets dropped briefly when standby node in an HA router pair is restarted.

## Special Considerations

- When configuring network-interface adjacencies via the PCLI the peer field is now required. If the peer is missing the PCLI will provide a message that it is required:
  ```
"Argument 'peer' is required"
  ```
  
- Running a network with both 4.1.5+ and pre-4.1.5 routers that contain duplicate, static IP addresses will result in validation failures, and prevent an administrator from committing the configuration.

## Caveats
- **I95-29842** Nodes with Overlapping DHCP addresses will not be displayed when 'show peers' command is run

  _**Symptom:**_ Nodes with Overlapping DHCP addresses will not be displayed in the output of show peers
  
  _**Conditions:**_ After upgrading to 4.1.5 and if Overlapping DHCP addresses are being used in the network topology
  
  _**Corrective Action:**_ After upgrading the Conductors perform a commit operation from either the PCLI or the Conductor GUI


- **I95-29733** Conductor UI may not provide an indication that a refresh is in progress (flashing blue dot)

  _**Symptom:**_ When selecting the Router to fresh the available versions to upgrade, the flashing blue indicator may not be present
  
  _**Conditions:**_ Shortly after both HA conductors have been upgraded and the refresh button is selected for a router

  _**Corrective Action:**_ N/A, no user corrective action can be performed. Waiting for a moment will result in the appearance of the solid blue dot if an upgrade is available (Note: Both conductors must be running a version greater than or equal to the target router version)


- **I95-29592** Conductor UI and/or PCLI may not update the asset software version correctly

  _**Symptom:**_ The Conductor UI and/or the PCLI may not correctly reflect the software version running on the asset
  
  _**Conditions:**_ After the asset has been upgraded
  
  _**Corrective Action:**_ If the asset is not updated after ~5 minutes after an upgrade is performed, the salt-minion will need a restart on the asset node that does not update the version. This is done with the following command on the node as the root linux user:
  ```
"systemctl restart salt-minion"
  ```


- **I95-29271** PCLI/Netconf subsystem may fault on exit

  _**Symptom:**_ PCLI or Netconf session may fault
  
  _**Conditions:**_ On session exit (either exit from PCLI or direct Netconf session exit)

  _**Corrective Action:**_ N/A, no user corrective action is required.


- **I95-27946** Commit may fail on Conductor when node in router pair is stopped

  _**Symptom:**_ When performing a commit to a router where one of the nodes is offline, the commit from the Conductor may not respond or may fail. Performing a validate operation a second time may provide the following error response:
  ```
“✖ Validating...
   % Error: Candidate configuration is invalid:
   1. A request of type validate is already in progress”
  ```

  _**Conditions:**_ When a node in the router pair is offline.

  _**Corrective Action:**_ The validate operation is sent from the conductor to the nodes to verify that the configuration is correct. The validate will timeout to the node that is offline. Bring the node back online and perform the operation a second time.


- **I95-27944** Network error may cause upgrade to fail and not retry.

  _**Symptom:**_ The following message is provided on the Conductor UI
  ```
"The upgrade failed because: NetworkError when attempting to fetch resource.”
  ```

  _**Conditions:**_ When upgrading the Conductor from the Conductor GUI

  _**Corrective Action:**_ Verify the conductor can reach the 128T repository, once verified to be accessible, perform the upgrade operation again.


- **I95-29134** `save tech-support-info` fails to create tech support file

  _**Symptom:**_ `save tech-support-info` fails with the following error message:
  ```
"Error: Failed to execute the 'save-tech-support-info' RPC: Fatal error creating tarball"
  ```

  _**Conditions:**_ When configuration exports have been saved with spaces it in the name of the exported configuration file

  _**Corrective Action:**_ Remove the saved configuration files with spaces in the name and avoid using spaces when exporting configuration. Note: Exporting configuration files with spaces in the name may be prevented in a future release.


- **I95-28766** Conductor PCLI shows configuration change when no changes have been performed

  _**Symptom:**_ Conductor PCLI may incorrectly provide an * that there is a candidate configuration change
  
  _**Conditions:**_ Unknown
  
  _**Corrective Action:**_ None, if the configuration has not changed this indicator can be ignored. A comparison can be performed with `compare config running candidate`


- **I95-27808** `sync peer addresses router force` from conductor may not trigger router to send address information from peer

  _**Symptom:**_ When performing the following command on the Conductor PCLI, `sync peer addresses router force` the router may not provide the peer address information

  _**Conditions:**_ Unknown

  _**Corrective Action:**_ Perform the PCLI command on the router to update the information on the conductor.


- **I95-27722** Alarms for "Peer not reachable" may not clear and will persist after nodes are back and operational

  _**Symptom:**_ Alarms for "peer not reachable" provided in on the Conductor

  _**Conditions:**_ Unknown, seen after system upgrade

  _**Corrective Action:**_ NA, The alarms will clear within 15 minutes.


- **I95-30103** Entering flat configuration into PCLI does not always create the configuration

  _**Symptom:**_ - When performing configuration using flat (or cut and paste of the complete flat configuration line) the configuration is not applied

  _**Conditions:**_ - When a configuration object does not previously exist and setting an attribute of that configuration object. For example in the following configuration line:
  ```
configure authority tenant one name one
  ```
  if the "tenant one" configuration object does not exist, the tenant object will not be created. If it does exist then the command will set the attribute "name" to "one"             

  _**Corrective Action:**_ - On initial creation, do not use flat configuration operations for creating the configuration.