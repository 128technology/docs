---
title: 128T 4.4 Release Notes
sidebar_label: 4.4
---

## Release 4.4.0

### New Features and Improvements

- **I95-17398** [Support for system upgrade from ISO](intro_upgrading.md#upgrading-from-an-iso)

- **I95-20710** LDAP status in GUI

- **I95-25289** Honor storage-duration as retention policy

- **I95-26013** [Support for vendor-specific information in DHCP options](config_dhcp.md#vendor-specific-information-dhcp-options)

- **I95-26954** Reduced steady-state bandwidth usage for nodes at rest, resulting in improved performance and reduced network bandwidth

- **I95-27874** [Enable packet capture from CLI](ts_packet_capture.md)

- **I95-28317** [PCLI ctrl+z shortcut](concepts_pcli.md#ctrlz)

- **I95-28801** 128T Conductor docker container

- **I95-31073** salt-minion upgraded to 2019.2.0, increasing capability and stability

- **I95-31352** 2x performance of configuration processing when plugins are enabled

- **I95-31603** Track TCP and TLS time to establishment

- **I95-31751** Improved behavior when requesting too many events on Event Viewer

- **I95-31932** `reconnect-128t-assets` script, reconnecting all disconnected minions

- **I95-32593** Automated Provisioner batching

- **I95-32760** Selected Events remain highlighted when navigating the event page

- **I95-32783** ["show assets summary" enhancements](cli_reference.md#show-assets-summary)

- **I95-33374** Address Latest Vulnerabilities 4.4

- **I95-33382** Password changes now log users out

- **I95-33695** REST API support for user management

### Issues Fixed

- **I95-16902** Tab-complete in PCLI does not quote strings with spaces in them
  _**Conditions:**_ Key field for configuration object contains a space
------
- **I95-24957** `t128-salt` command produces an error when running. This error is cosmetic as the operation completes successfully.
  ```
  Exception ignored in: <generator object _stream_return at 0x7f45d0b66d58>
Traceback (most recent call last):
  File "/usr/lib/128technology/python/salt/venv/lib/python3.6/site-packages/salt/transport/tcp.py", line 1013, in _stream_return
AttributeError: 'NoneType' object has no attribute 'StreamClosedError'
  ```
------
- **I95-28223** PCLI tab-completion incorrectly includes candidate configuration for `show device-interface <interface-name>`
------
- **I95-30517** `t128-salt` command produces deprecated warning. This warning is cosmetic as the operation completes successfully.
  ```
  [WARNING ] /tmp/tmpigi2k61k/pip3/salt/salt/transport/ipc.py:292: DeprecationWarning: encoding is deprecated, Use raw=False instead.
  self.unpacker = msgpack.Unpacker(encoding=encoding)

  [WARNING ] /tmp/tmpigi2k61k/pip3/salt/salt/payload.py:149: DeprecationWarning: encoding is deprecated, Use raw=False instead.
    ret = msgpack.loads(msg, use_list=True, ext_hook=ext_type_decoder, encoding=encoding)
  ```
------
- **I95-32250** Traffic audit events can consume large amount of memory on a busy system
------
- **I95-32707** Quickstart link does not appear after initial router config is created
------
- **I95-33302** Application ID modules may experience a delay or fail to update FIB

  _**Symptom:**_ The following log message will be seen in the `highway.log` when application identification scripts fail to complete.

  ```
  ERROR (routingAgePoller) Timeout handler not keeping up
  ```

  _**Conditions:**_ Platforms at the minimum specified hardware requirements or lower may experience this behavior depending on the type and quantity of application modules loaded.
------
- **I95-33325** OTP QuickStart fails on the first attempt, but works on subsequent attempt(s)
------
- **I95-33386** Clearing the name of a router in the router config page produces an error
------
- **I95-33465** UI sometimes does not provide an indication that it is committing the configuration when importing from backup
------
- **I95-33983** User role can see a list of config exports by executing `show config exports`
------
- **I95-34053** When configured to use LDAP, locally created user credentials and access are not honored for those users that already exist in LDAP.
  Until the system is upgraded to 4.4.0, this issue can be mitigated by rebooting the 128T.
------
- **I95-34334** Audit events are not triggered on download and version query timeouts.  Audit events have been added to provide clarity to the administrator in the event that downloads fail to complete.
------
- **I95-34437** Asset State not correctly reported
------
- **I95-34629** During the initial window of a router to Conductor connection outage or as connectivity is established between HA peers, configuration commits may fail silently. Candidate configuration will remain uncommitted.
  Until the system is upgraded to 4.4.0, this issue can be mitigated by attempting the commit again.
------
- **I95-34716** Fixed a rare race condition crash on startup of the Automated Provisioner
------
- **I95-34753** ARP packet validation failure produces misleading log message.

  ```
  WARN  (arpManagerTP    ) Base Exception: Invalid Icmp Header Format: no   NS option available.
  ERROR (arpManagerTP    ) Caught unexpected exception
  ```
  Enhanced logging to indicate receiving interface during invalid ARP classification and add the packet to the `highwayExceptions.pcap`.
------
- **I95-34790** A HA router with over 500 peer paths and high rate of traffic, may result in some flows being black-holed during a node failover event.
------
- **I95-34882** `show user` is missing from `search commands regex ".*"`
------
- **I95-35062** Non-permanent LTE failures are incorrectly displayed as a failure context in `show device-interface`
------
- **I95-35081** Long authority names can obscure "UP" navigation button with the configuration UI
------
- **I95-35093** `show asset <asset-id>` incorrectly continues to show `Currently Upgrading` version after completion of an upgrade.
------
- **I95-35088** Removing a 128T user does not remove its Linux credentials, allowing the user to still login to Linux.
  Until the system is upgraded to 4.4.0, this issue can be mitigated by disabling rather than deleting the user.
------
- **I95-35115** Aggregate bandwidth charts may not display data accurately
------
- **I95-35138** A vulnerability in the SaltStack code allows for unauthenticated salt-minions to execute any script on the salt-master.
  :::info
  This fix is required only on the 128T Conductor.
  :::

## Special Considerations
- Python has been upgraded from version 2 to version 3.  Any custom salt states that have been written that include python code, may need to be upgraded or rewritten in advance of the upgrading to 4.4. (I95-31073)
------
- `show config exports` command is no longer available to a user with *user* privileges.  This command is only intended for those users with *administrator* privileges. (I95-33983)
------
- The Following REST API resources are have been deprecated and will be removed in later releases.
  1. `/router/{router}/node/{node}/networkInterface/byDeviceInterface`
  2. `linkLatency`, `jitter` and `packetLoss` fields have been deprecated in `/router/{router}/node/{node}/adjacency` and `/router/{router}/node/{node}/deviceInterface/{deviceInterface}/networkInterface/{networkInterface}/adjacency` response messages.
  3. `averageBandwidth` and `traffic` fields have been deprecated in `/router/{router}/node/{node}/deviceInterface` response messages.
  4. `averageBandwidth` and `traffic` fields have been deprecated in `/router/{router}/node/{node}/networkInterface` and `/router/{router}/node/{node}/deviceInterface/{deviceInterface}/networkInterface` response messages.
  5. `traffic`, `averageBandwidth`, `sessions`, `sessionArrivalRate`, `cpu`, `disk`, `memory`, and `platform`  fields have been deprecated in `/router/{router}/node` and `/router/{router}/node/{node}` response messages.
  6. `bandwidth`, `sessions`, `sessionArrivalRate` and `bytesTransmitted`  fields have been deprecated in `/service and /service/{service}` response messages.
  7. `averageBandwidth`, `traffic`, `sessions`, and `sessionArrivalRate` fields will be removed from `/serviceClass` response messages.
  8. `bandwidth`, `sessions` and `traffic`  fields have been deprecated in `/tenant` and `/tenant/{tenant}` response messages.
     (I95-25614)

## Caveats

- **I95-34941** _nodejs_ process can segfault during the upgrade of the 128T

  _**Corrective Action:**_ No action required. The webserver will immediately restart.
------
- **I95-33560** When upgrading a HA conductor to version 4.4.0 or later there is a compatibility issue due to an upgrade of the asset provisioning software. This results in a reported asset error that will persist until the two nodes are upgraded to the same version.

  _**Symptom:**_ This error is seen during the upgrade of an HA conductor pair to version 4.4.0 or later. An upgrade of a single standalone conductor node will not see this error. The following error will be reported by the node running software version earlier than 4.4.0:
  ```
"128T highstate: ["Rendering SLS '128T:reverse_ssh' failed: Jinja variable 'dict object' has no attribute 'iteritems'"]"
  ```
  This error can be viewed by running the following PCLI command from either node: `show assets <asset-id>`. Where asset-id is the asset-id of the node running pre 4.4.0 version that has not yet been upgraded.

  _**Corrective Action:**_ This error is transient and will only persist for the duration of the upgrade. The error it will not self-correct. Continue to upgrade the second conductor node. After upgrade, verify that there are no asset state errors.
------
