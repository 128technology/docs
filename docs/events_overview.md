---
title: Alarms and Events
sidebar_label: Alarm and Events
---

## What are Alarms and Events?

An **event** is an occurrence that happens at a specific point of time. These indicate that a significant system event has occurred but is not an ongoing persistent event.

An **alarm** is an indication that the system is in a state that may require user intervention to resolve.

An alarm is stateful, an event is a one-off occurrence. For example, an alarm is usually associated with two events, an "ADD" when it is created and a "CLEAR" when it goes away.

## How Do I Find Alarms?

You can find alarms in the PCLI by typing:

```
admin@conductor1.nycsite1# show alarms
Tue 2018-09-11 14:44:15 UTC

=============================== ===================== ========== ============================================== =========== ====================================================
 ID                              Time                  Severity   Source                                         Category    Message
=============================== ===================== ========== ============================================== =========== ====================================================
 datacenter1.bostonsite1:60      2018-09-11 14:42:46   info       unavailable                                    interface   Intf 10 (1) administratively down
 datacenter1.bostonsite1:61      2018-09-11 14:42:46   major      If - 1 | Destination - 10.0.128.0 | Vlan - 0   peer        Peer seattlesite1 path is down (PeerName:
                                                                                                                             seattlesite1 | Destination: 10.0.128.0 | NodeName:
                                                                                                                             datacenter1 | DeviceInterface: 1 | Vlan: 0)
 branchoffice1.seattlesite1:36   2018-09-11 14:42:41   major      If - 1 | Destination - 10.0.128.1 | Vlan - 0   peer        Peer bostonsite1 path is down (PeerName:
                                                                                                                             bostonsite1 | Destination: 10.0.128.1 | NodeName:
                                                                                                                             branchoffice1 | DeviceInterface: 1 | Vlan: 0)

There are 0 shelved alarms
Completed in 0.62 seconds
```

The web client will have a badge icon on the bell on the left panel that indicates the total number of alarms.  Additionally, the header on the Dashboard will enumerate the total alarms into one of three categories: critical, major and minor.  Both the bell and the critical, major and minor are links to the alarm page which filters alarms respectively.

![alarms_and_events_alarm_screenshot](/img/events_alarm_screenshot.png)

## How Do I Find Events?

You can find events in the PCLI by typing:

```
admin@conductor1.nycsite1# show events alarm
Tue 2018-09-11 14:46:14 UTC

============== =============== ============ ====================== ========== ========================================== =================== ================== ================
 Router         Node            Event Type   Time                   Severity   Source                                     Category            Message            Shelved Status
============== =============== ============ ====================== ========== ========================================== =================== ================== ================
 seattlesite1   branchoffice1   add          2018-09-10T23:49:47Z   major      bostonsite1+3.3.3.128+branchoffice1+3+0    peer                Peer bostonsite1   not-shelved
                                                                                                                                              path is down
                                                                                                                                              (PeerName:
                                                                                                                                              bostonsite1 |
                                                                                                                                              Destination:
                                                                                                                                              3.3.3.128 |
                                                                                                                                              NodeName:
                                                                                                                                              branchoffice1 |
                                                                                                                                              DeviceInterface:
                                                                                                                                              3 | Vlan: 0)
 bostonsite1    datacenter1     add          2018-09-10T23:49:53Z   major      seattlesite1+1.1.1.128+datacenter1+4+0     peer                Peer               not-shelved
                                                                                                                                              seattlesite1
                                                                                                                                              path is down
                                                                                                                                              (PeerName:
                                                                                                                                              seattlesite1 |
                                                                                                                                              Destination:
                                                                                                                                              1.1.1.128 |
                                                                                                                                              NodeName:
                                                                                                                                              datacenter1 |
                                                                                                                                              DeviceInterface:
                                                                                                                                              4 | Vlan: 0)
 seattlesite1   branchoffice1   clear        2018-09-10T23:49:54Z   major      bostonsite1+3.3.3.128+branchoffice1+3+0    peer                Peer bostonsite1   not-shelved
                                                                                                                                              path is down
                                                                                                                                              (PeerName:
                                                                                                                                              bostonsite1 |
                                                                                                                                              Destination:
                                                                                                                                              3.3.3.128 |
                                                                                                                                              NodeName:
                                                                                                                                              branchoffice1 |
                                                                                                                                              DeviceInterface:
                                                                                                                                              3 | Vlan: 0)
```

Within the web client, the Event History link will bring you to a page where all events can be displayed, or by applying varying level of filters, restrict the messages to only a particular router or event type.

![alarms_and_events_events_screenshot](/img/events_events_screenshot.png)

In large deployments, there may be a large number of events on a conductor. It may be difficult to wade through the pages of events if you know you are looking for a particular event within a window of time. The `show events` command supports filtering events by time when specifying starting and ending time ranges. The syntax for time follows the same format of the event timestamps.

```
show events alarm from 2020-03-30T22:00:00Z to 2020-03-30T23:59:59Z router burlma-corp
```

:::note
Note the trailing `Z`. Most systems are configured to be in UTC time. If the trailing `Z` was absent, the time filter would be restricted to the local time zone
:::

```
show events alarm from 2020-03-30T22:00:00Z to 2020-03-30T23:59:59Z router AAPDENCOPOD4
```

## Contents of Alarms and Events

| Field | Description |
| --- | --- |
| dateTime | This is the date and time that the event occurred. The format of the value follows the ISO 8601 standard. |
| node | The system within the SSR which produced the event. |
| process  | The process within the node which produced the event. |
| source   | The name of the entity which was the originator of the alarm. When the topic is a network-interface, this would be the name of the network-interface. |
| category | This is the alarm type. Each category has a specific message format:<br />• **system** Related to the system, e.g. CPU, memory, etc.<br />• **process** Related to an internal software process<br />• **interface/network-interface** Related to an interface on the SSR (up, down,etc.)<br />• **platform** Related to low-level events that aren't necessarily derived from the machine; e.g. security keys<br />• **peer** Related to connectivity between SSR routers<br />• **platform-state** Sourced from the stats infrastructure<br />• **redundancy** Related to high availability behavior; e.g. a failover or leadership change<br />• **giid** Related to an interface that is part of a redundant pair (giid is an interface's "global ID")<br />• **asset**  An alarm sourced by an asset (a managed node) that is dervied from Automated Provisioner |
| severity | Alarms can be categorized in one of four severities: critical, major, minor and info. These severity levels can be used to filter alerts based on one of these levels. The default severity level is info, which shows all alarms.<br />• **critical** The condition affects service<br />• **major** Immediate action is required<br />• **minor** Minor warning conditions<br />• **info** No action is required |
| message  | Descriptive text regarding the nature of the alarm           |

## Shelving Alarms

When an SSR is put into [Maintenance Mode](howto_maintenance_mode.md) all alarms for that SSR are “shelved”. Shelved alarms continue to be monitored by the system, but are not presented on the standard UI. The state of shelved alarms can be viewed by issuing the following command:

```
admin@conductor1.nycsite1# show alarms shelved
```

## Alarm Suppression

While shelving alarms for a router is useful for staging and maintenance activities, there are situations where a more granular approach is useful. 

By using the Alarm Suppression feature individual alarms as well as alarm types can be filtered or hidden. This allows users to focus on alarms that are relevant to their configuration needs without creating unique rules to hide every type of alarm. 

You can write custom shelves, allowing you to shelve nuisance alarms, or for example, silence alarming on interfaces that are intentionally configured as administratively down. 

### How It Works

An Alarm Shelf is configured using [`configure authority alarm-shelving shelf <name>`](config_command_guide.md#configure-authority-alarm-shelving-shelf) and one or more of the following parameters. There are several configuration attributes used to define an alarm shelf:

| command | description |
| ------- | ----------- |
| [`applies-to`](config_command_guide.md#configure-authority-alarm-shelving-shelf-applies-to) | Logical group to which a configuration element applies |
| [`category`](config_command_guide.md#configure-authority-alarm-shelving-shelf-category) | Shelve alarms for this category. |
| `clone` | Clone a list item |
| `delete` | Delete configuration data |
| [`generated`](config_command_guide.md#configure-authority-alarm-shelving-shelf-generated) | Indicates whether or not the Shelf was automatically generated as a result of Alarm Shelf generation. |
| [`match-type`](config_command_guide.md#configure-authority-alarm-shelving-shelf-match-type) | How the individual items in the shelf should be matched in order to trigger the shelving |
| [`message-regex`](config_command_guide.md#configure-authority-alarm-shelving-shelf-message-regex) | Shelve alarms with messages that match this regex. |
| [`name`](config_command_guide.md#configure-authority-alarm-shelving-shelf-name) | An arbitrary name for the alarm shelf. |
| [`node-name`](config_command_guide.md#configure-authority-alarm-shelving-shelf-node-name) | Shelve alarms from this node. |
| [`node-name-regex`](config_command_guide.md#configure-authority-alarm-shelving-shelf-node-name-regex) | Shelve alarms from nodes that match this regex. |
| `override-generated` | Force auto-generated configuration and any modifications to it to persist on commit |
| [`router-name`](config_command_guide.md#configure-authority-alarm-shelving-shelf-router-name) | Shelve alarms from this router. |
| [`router-name-regex`](config_command_guide.md#configure-authority-alarm-shelving-shelf-router-name-regex) | Shelve alarms from routers that match this regex. |
| [`severity`](config_command_guide.md#configure-authority-alarm-shelving-shelf-severity) | Shelve alarms for this severity. |
| `show` | Show configuration data for &#x27;shelf&#x27; |

#### `applies-to`
The logical group to which this alarm shelf applies. Valid options are:

- authority - Applies to all routers in the authority. 
- router - Router(s) to which the configuration applies.
- router-group - Logical group of router(s) to which the configuration applies.
- resource-group - An RBAC (Resource Based Access Control) management group to which the configuration applies.

When this field is used, the conductor automatically filters which routers receive the alarm shelf configuration. For instance, if a router-group is specified here, only routers in the router-group receive the alarm-shelf configuration. Only those routers will compare their alarms against the configuration. This prevents sending alarm-filters to every router in the authority, and limits those performance implications. 

Routers specified in the `applies-to` configuration are not used in the comparison operation with an alarm. If a shelf needs to target a specific router, it must be specified using the `router-name` parameter.

#### `category`
The `category` parameter has the following values:

- none - A `category` of `none` indicates that `category` will not be considered when evaluating alarms against this shelf.
- extensible-alarm
- system
- process
- interface
- platform
- peer
- base
- node-base
- global-base
- network-interface
- platform-stat
- redundancy
- giid
- asset
- prefix-delegation
- service
- bgp-neighbor
- msdp-neighbor

#### `match-type`
The `match-type` defines the behavior when multiple dimensions are specified for an alarm shelf:

- All – All items specified in the shelf must match an alarm to trigger the shelving.
- Any – At least one item specified in the shelf must match an alarm to trigger the shelving.

#### `message-regex`
The `message-regex` parameter is defined as a regular expression string and allows you to target messages in alarms that may share some commonality. In this way, a single alarm shelf may shelve many alarms.

#### `name`
The name of the shelf.

#### `node-name`
The `node-name` is defined as a string, and is intended to match a single node name.

#### `node-name-regex`
The `node-name-regex` parameter is defined as a regular expression string. It is used to filter node names that may conform to a user defined scheme. In this way, a single alarm shelf may shelve many alarms.

#### `router-name`
The `router-name` is a string intended to match a single router name.

#### `router-name-regex`
The `router-name-regex`parameter is a regular expression string. It is used to filter router names that may conform to a user defined scheme. In this way, a single alarm shelf may shelve many alarms.

#### `severity`
The `severity` parameter has the following values:

- none - A `severity` of `none` indicates that `severity` will not be considered when evaluating alarms against this shelf.
- info
- minor
- major
- critical


### Configuration Example
```
config
     authority
        alarm-shelving
             shelf  test-shelf
                name         test-shelf
                category     system
                severity     info
                router-name  testRouterName
                node-name    testNodeName
                match-type   any
            exit
        exit
    exit
exit
```

