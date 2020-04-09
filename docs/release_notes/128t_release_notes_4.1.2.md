---
title: 128T 4.1.2 Release Notes
sidebar_label: 4.1.2
---

:::note
The 4.1.2 release requires the 128T-installer 2.3.0 or greater. By default, the latest installer will automatically be used.
:::

## Issues Fixed
- **I95-22743** Installation now enables Kernel crash capturing

- **I95-24835** Creation of new security-policy generates error upon commit

- **I95-24963** `show event alarm rows all` reports the error `Failed to retrieve alarm events`

- **I95-25744** Tab-ing in GUI dialog boxes does not toggle between buttons or fields

- **I95-25790** Peer path statistics on PCLI may be missing for routers with multiple paths

- **I95-26021** WEB/GUI page scrolling stops working after router AP upgrade

- **I95-26154** System can fault when executing `save tech-support-info`

- **I95-26293** Changing the router name will prevent future logins

- **I95-26361** Asset reports downloading software after download has completed

- **I95-26447, I95-26509** Conductor software proxy is configured when `conductor-only` is not set

- **I95-26492** Duplicate addresses returned from a DNS request are not deduplicated

- **I95-26620** BGP routes not populated in the RIB when the eBGP neighbor's ttl is set to 1

- **I95-26690** Stats may not be displayed until 128T is restarted

- **I95-26696** Connectivity alarms are incorrectly re-evaluated on configuration changes resulting in retransmitting the alarm

- **I95-26706** Empty global ID for non-redundant interface produces validation warning

- **I95-26732** Router-based services are incorrectly shared with other neighborhoods

- **I95-26797** saltmaster.log and logrotate.d message filling root mail

- **I95-26845** Waypoint Exhaustion Post Change

- **I95-26910, I95-26911, I95-26912, I95-26927, I95-26972, I95-27046, I95-27067, I95-27076, I95-27125, I95-27181, I95-27184, I95-27248, I95-27357, I95-27404, I95-27421** Validation can take a long time on large configurations

- **I95-26943** Custom charts displays "all" series, when it should say "selected router"

- **I95-26956** Piping `show` commands through `grep` on large topologies never completes

- **I95-26981** Alarm shelving is not honored after 128T restarts

- **I95-26982, I95-27057, I95-27063, I95-27215, I95-27427** PCLI can have long response times with large configurations

- **I95-26985** 128T can get hung on shutting down when removing kni kernel module

- **I95-27023** PCLI can get stuck in `Starting the PCLI…`

- **I95-27029** `show asset software` incorrectly prompts for confirmation

- **I95-27032** HA indicator overlaid on top of router selector in custom charts

- **I95-27035, I95-27382, I95-27415, I95-27430** Web server may have poor responsiveness with large configurations

- **I95-27051** Congestion control algorithm for session optimization has been reverted to no fairness

- **I95-27066** Validatate operations can be executed multiple times for the same configuration

- **I95-27084** Topology map zooms in then back out after selecting a router

- **I95-27102** Large configurations increase the load time of the topology page  A loading indicator was added to provide a better user experience

- **I95-27105** 128T not restarted after reinitialization

- **I95-27107** NTP service does not start before 128T which can cause HA synchronization issues if time is incorrect between nodes

- **I95-27120** PCLI does not honor log level changes

- **I95-27121** 128T can crash when flow capacity has been exceeded

- **I95-27136, I95-27216** Terminated PCLI sessions can still linger preventing future logins

- **I95-27137** Configurations that contain a large number of hostnames/FQDNs can cause commit to take a long time

- **I95-27153** Large numbers of shelving alarms changes result in CPU saturation spikes

- **I95-27173** Requesting both IPv4 and IPv6 DHCP addresses for LTE does not work for some carriers

- **I95-27209, I95-27560** Large configurations can take a long time to commit

- **I95-27235** Subsequent requests to refreshing "Available Versions" do nothing

- **I95-27241** PCLI can hang on quit after committing configuration

- **I95-27246** Changing system clock to an earlier time will cause the 128T to not produce any metrics

- **I95-27248** Large configurations can take a long time to retrieve on both the PCLI and GUI

- **I95-27250** Configurations that have a large number of peer paths on a Router can cause HA to fail on those nodes. This is a result of running out of memory within one of the processes. This setting is configurable to fit the needs of the deployment

- **I95-27282, I95-27369** Large configurations can cause delays in GraphQL responsiveness

- **I95-27285** Large configurations can cause `save tech-support-info` to take a long time to complete

- **I95-27300** Unable to properly allocate forwarding core count to leverage multi-socket systems

- **I95-27310** It is possible to oversubscribe the system by allocating more forwarding cores than exist on the platform

- **I95-27401, I95-27511** Unclean shutdowns can cause the analytics database to become corrupt

- **I95-27444** Flow audit events are created even if auditing is disabled

- **I95-27522** `highwayManager.log` file is unnecessarily overflowing with the message:
  ```
[HWMC|AEM ] ERROR (ActionEventManag) The High queue has overflowed. Dropping message
  ```

- **I95-27524** `128status.sh` script has been added for troubleshooting

- **I95-27604** FIB Next Hops is `<none>` when there are only service-routes with services with application-name
  
- **I95-27614** The 128T would send ICMP unreachable responses for destination MACs that were not its own

- **I95-27799** Per-router services fail validation when a service applies to more than one router-group

- **I95-27830** 2 or more ICMP packets within milliseconds resulted in a software fault



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
“Download timed out, try again”
  ```
  The Following message can be seen in the automatedProvisioner.log file during a router upgrade:
  ```
“Download request timer exceeded for <router name>”
  ``` 

  _**Conditions:**_ Always

  _**Corrective action:**_ None, The error is incorrectly provided and the download will continue or retried.