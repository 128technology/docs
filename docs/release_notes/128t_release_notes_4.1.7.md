---
title: 128T 4.1.7 Release Notes
sidebar_label: 4.1.7
---

:::note
The 4.1.7 release is a superset of the 4.1.6 release. Features and corrections in the 4.1.6 release are not provided in these release notes. Please refer to the [4.1.6 release notes](./128t_release_notes_4.1.6.md) for further information.
:::

## Defect Fixes

- **I95-31170** NodeMonitor Application fault on shutdown.

- **I95-32449,I95-25567,I95-31060,I95-31675**  failed to reserve ports for WayPoint resulting in loss of traffic

## Special Considerations

- When configuring network-interface adjacencies via the PCLI the peer field is now required. If the peer is missing the PCLI will provide a message that it is required:
  ```
"Argument 'peer' is required"
  ```

- Prior to 4.1.5, any peering with routers that have the same IP addresses was not supported. In 4.1.5 or greater remote peers having the same IP address is now supported in one direction, with the use of "outbound-only". 128T currently does not support ALL routers having the same IP address, the same IP address support is unidirectional. For example:

  ```
    The following is supported:
    
    	R1(172.16.1.1) --- peered --- R2 (192.168.1.1)
    	          |------- peered --- R3 (192.168.1.1)
  
    The following is not supported:
    
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
  if the "tenant one" configuration object does not exist, the tenant object will not be created. If it does exist then the command will set the attribute "name" to "one"             

  _**Corrective Action:**_ - On initial creation, do not use flat configuration operations for creating the configuration.


- **I95-29842** Nodes with Overlapping DHCP addresses will not be displayed when 'show peers' command is run

  _**Symptom:**_ Nodes with Overlapping DHCP addresses will not be displayed in the output of show peers
  
  _**Conditions:**_ After upgrading to pre 4.1.5 to 4.1.6 and if Overlapping DHCP addresses are being used in the network topology
  
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
systemctl restart salt-minion
  ```


- **I95-29271** PCLI/Netconf subsystem may fault on exit

  _**Symptom:**_ PCLI or Netconf session may fault
  
  _**Conditions:**_ On session exit (either exit from PCLI or direct Netconf session exit)

  _**Corrective Action:**_ N/A, no user corrective action is required.


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
“The upgrade failed because: NetworkError when attempting to fetch resource.”
  ```

  _**Conditions:**_ When upgrading the Conductor from the Conductor GUI

  _**Corrective Action:**_ Verify the conductor can reach the 128T repository, once verified to be accessible, perform the upgrade operation again.

- **I95-27808** `sync peer addresses router force` from conductor may not trigger router to send address information from peer

  _**Symptom:**_ When performing the following command on the Conductor PCLI, `sync peer addresses router force` the router may not provide the peer address information

  _**Conditions:**_ Unknown

  _**Corrective Action:**_ Perform the PCLI command on the router to update the information on the conductor.

- **I95-27722** Alarms for "Peer not reachable" may not clear and will persist after nodes are back and operational

  _**Symptom:**_ Alarms for "peer not reachable" provided in on the Conductor

  _**Conditions:**_ Unknown, seen after system upgrade

  _**Corrective Action:**_ NA, The alarms will clear within 15 minutes.