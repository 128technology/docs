---
title: 128T 4.1.6 Release Notes
sidebar_label: 4.1.6
---

:::note
The 4.1.6 release is a superset of the 4.1.5 release. Features and corrections in the 4.1.5 release are not provided in these release notes. Please refer to the [4.1.5 release notes](./128t_release_notes_4.1.5.md) for further information.
:::

## Defect Fixes

- **I95-21979** An ethernet interface with DHCP enabled cannot be created from GUI. Validation does not pass and throws the error: `"There must be at least one address configured when type is not pppoe and dhcp is disabled"`.

- **I95-25553** Disabling and re-enabling a service is not real time configurable and required a restart of the 128T service.

- **I95-25984, I95-32181** Power outage may result in a zero byte global.init file, rendering 128T unable to start

- **I95-26634** BGP routes are not updated when VLANed interface is operationally down

- **I95-28103** After a restart of the highway process, any interfaces that were managed by 128T that were not gracefully restored, now provide detailed logging information regarding their state and corresponding transition.

- **I95-28535** Unable to obtain DHCP lease after redundant interface state transitions back to operationally up

- **I95-29115** service-route / max-sessions is not real-time configurable and requires a restart of the 128T service

- **I95-29741** Salt connection between Router and Conductor may not reestablish on a connection failure

- **I95-29811** Session created with a non-standard protocol (e.g. security audits performing "fuzzing") can cause flows to never be deleted and exhaust the flow table

- **I95-29812** Service ping does not work with `peer-connectivity` set to `outbound-only` between 128T routers

- **I95-29821** Packet fragmentation for SVR paths is larger than configured MTU by the L4 packet header size

- **I95-29990** When a KNI interface starts as operationally down, the state remains the default of unknown and never transition to down.

- **I95-30002** Service route generation skipped for generation set to true if another service with the same name is set to generation false

- **I95-30078, I95-30268** Traffic does not switch to standby interface on management path communication failure 

- **I95-30315** DHCP Server fails to start after system power failure and power recovery

- **I95-30327** On peer path failure, peer path may remain down if going through a nat to get to the remote peer

- **I95-30334** Shared interfaces can operate with both interfaces on each HA nodes as active (each acting in standalone mode)

- **I95-30354, I95-30687** admin user or 128t-admin group missing after upgrade

- **I95-30383** Connection error to node may result in configuration not being applied

- **I95-30401** Asset remains in pending state on initialization if the connection is terminated during pending state operations

- **I95-30448** Application module retry interval takes an extended time after a failure. With this correction, if a failure is encountered the retries will start at 60 minutes and increase exponentially for each subsequence failure after the second failure.

- **I95-30734** "worker-core packet-processing-utilization" would show 100% due to improper handling of unidirectional flows when packet-retransmission feature is enabled

- **I95-30742** Incorrect packet fragmentation when first packet is a jumbo packet

- **I95-30781** Warning not provided when neighborhood does not have an end port range

- **I95-30833** BGP over SVR neighbor not connecting due to missing route

- **I95-30934** Services with matching tenants and protocols with port ranges ending in 65535 may result in services failing.

- **I95-31005** 128T does not safely handle the case where a DHCP server provides a client lease with an address of 0.0.0.0

- **I95-31200** BGP timer configuration is not dynamically configurable

- **I95-31208** continuous configuration updates do to network anomalies lead to increased memory usage

- **I95-31232** Highway application may fault during network port scanning of the router

- **I95-31244** When a pinhole session is restored upon failover, if the routing table is not up-to-date, the packet will incorrectly be routed to the same interface from which it came from.

- **I95-31251** Peer intermittently does not recover after system restart

- **I95-31255** Intermittently managed routers may send a `"No connectivity"` alarm to the Conductor

- **I95-31333** highwayManager application fault during multiple interface state transitions

- **I95-31515** highwayManager application faults if no paths are available for session duplication

- **I95-31570** Changing the order of custom charts can sometimes render the dashboard page inoperable

- **I95-31742** routingManager application can fault when a device interface is removed

- **I95-32065** NAPT translation does not work with for a service-route with a next-hop

- **I95-32257** Router behind a NAT not peering after upgrade

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