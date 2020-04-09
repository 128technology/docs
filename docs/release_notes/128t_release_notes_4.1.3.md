---
title: 128T 4.1.3 Release Notes
sidebar_label: 4.1.3
---

:::note
The 4.1.3 release requires the 128T-installer 2.3.0 or greater. By default, the latest installer will automatically be used.
:::

## Issues Fixed
- **I95-27792** Asset status not updated correctly

- **I95-27339** DHCP stuck flows

## Caveats
- **I95-27946** Commit may fail on conductor when node in router pair is stopped

  _**Symptom:**_ When performing a commit to a router where one of the nodes is offline, the commit from the Conductor may not respond or may fail. Performing a validate operation a second time may provide the following error response:
  
  ```
“✖ Validating...
   % Error: Candidate configuration is invalid:
   1. A request of type validate is already in progress”
  ```

  _**Conditions:**_ When a node in the router pair is offline.

  _**Corrective Action:**_ The validate operation is sent from the conductor to the nodes to verify that the configuration is correct. The validate will timeout to the node that is offline. Bring the node back online and perform the operation a second time.


- **I95-27808** 'sync peer addresses router force' from conductor may not trigger router to send address information from peer

  _**Symptom:**_ When performing the following command on the conductor PCLI 'sync peer addresses router force' the router may not provide the peer address information

  _**Conditions:**_ Unknown

  _**Corrective Action:**_ Perform the PCLI command on the router to update the information on the conductor.


- **I95-27722** Alarms for Peer not reachable may persist after nodes are back and operational

  _**Symptom:**_ Alarms for a peer not reachable provided in on the Conductor

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


- **I95-27540, I95-27943** Download request timer exceeded seen during upgrades

  _**Symptoms:**_ The following messages can be seen in the Conductor UI during an upgrade:
  ```
"Download timed out, try again”
  ```
  The Following message can be seen in the automatedProvisioner.log file during a router upgrade:
  ```
“Download request timer exceeded for <router name>”
  ```
  _**Conditions:**_ Always

  _**Corrective action:**_ None, The error is incorrectly provided and the download will continue or retried.