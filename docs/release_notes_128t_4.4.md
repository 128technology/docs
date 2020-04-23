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

- **I95-28317** PCLI ctrl+z shortcut

- **I95-28801** 128T Conductor docker container

- **I95-31073** salt-minion upgraded to 2019.2.0, increasing capability and stability

- **I95-31352** 2x performance of configuration processing when plugins are enabled

- **I95-31603** Track TCP and TLS time to establishment

- **I95-31751** Improved behavior when requesting too many events on Event Viewer

- **I95-31932** `reconnect-128t-assets` script, reconnecting all disconnected minions

- **I95-32593** Automated Provisioner batching

- **I95-32760** Selected Events remain highlighted when navigating the event page

- **I95-32783** "show assets summary" enhancements

- **I95-33374** Address Latest Vulnerabilities 4.4

- **I95-33382** Password changes now log users out

- **I95-33695** REST API support for user management

### Issues Fixed

- **I95-16902** Tab-complete in PCLI does not quote strings with spaces in them
  _**Conditions:**_ Key field for configuration object contains a space
------
- **I95-30517** `t128-salt` command produces deprecated warning
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
- **I95-33325** OTP QuickStart fails on the first attempt, but works on subsequent attempt(s)
------
- **I95-33386** Clearing the name of a router in the router config page produces an error
------
- **I95-33465** UI sometimes does not provide an indication that it is committing the configuration when importing from backup
------
- **I95-33983** User role can see a list of config exports by executing `show config exports`
------
- **I95-34334** Audit events are not triggered on download and version query timeouts.  Audit events have been added to provide clarity to the administrator in the event that downloads fail to complete.
------
- **I95-34437** Asset State not correctly reported
------

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
