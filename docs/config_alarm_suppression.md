---
title: Alarm Suppression
sidebar_label: Alarm Suppression
--- 

## Alarm Suppression

While shelving alarms for a router is useful for staging and maintenance activities, there are situations where a more granular approach is useful. 

By using the Alarm Suppression feature individual alarms as well as alarm types can be filtered or hidden. This allows users to focus on alarms that are relevant to their configuration needs without creating unique rules to hide every type of alarm. You can write custom shelves, allowing you to shelve nuisance alarms, or for example, silence alarming on interfaces that are intentionally configured as administratively down. 

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

### Configuration Example - CLI
```
config authority alarm-shelving shelf test-shelf name         test-shelf
config authority alarm-shelving shelf test-shelf category     system
config authority alarm-shelving shelf test-shelf severity     info
config authority alarm-shelving shelf test-shelf router-name  testRouterName
config authority alarm-shelving shelf test-shelf node-name    testNodeName
config authority alarm-shelving shelf test-shelf match-type   any
```

```
admin@conductor-east-1.RTR_EAST_CONDUCTOR# show alarms shelved
Tue 2024-07-09 14:25:28 UTC
WARNING: Targeting router 'all' may take a long time. Continue anyway? [y/N]: y
✔ Retrieving alarms...

================================ ===================== ========== ======== =========== =================================== ============
 ID                               Time                  Severity   Source   Category    Message                             Reason
================================ ===================== ========== ======== =========== =================================== ============
 combo-east-1.RTR_EAST_COMBO:30   2024-07-09 14:24:47   INFO                INTERFACE   Intf 11 (2) administratively down   test-shelf

Completed in 0.02 seconds
```

### Configuration Example - GUI

1. Under Authority Settings, scroll down to Alarm Shelves, and select ADD.

![Authority Settings - Alarm Shelves](/img/alarm_suppression_gui1.png)

2. In the New Shelf window, enter a shelf name and click ADD.

![New Shelf window](/img/alarm_suppression_gui2.png)

3. Enter the shelf information.

![Shelf Basic Information](/img/alarm_suppression_gui3.png)

4. Under Alarm Shelf Applies To, select ADD (or select an existing Service Group from the list).

![Service Group](/img/alarm_suppression_gui3a.png)

5. Validate and Commit the changes.

#### To display the shelved alarms:

1. From the Dashboard, select the Alarms notification icon.

![Dashboard](/img/alarm_suppression_gui4.png)

2. In the alarms view, select the Filter Icon, and select Shelved from the list.

![Alarm Filter List](/img/alarm_suppression_gui5.png)

3. The shelved alarms list is displayed. Selecting an alarm will display the details below.

![Shelved Alarms Display](/img/alarm_suppression_gui6.png)


