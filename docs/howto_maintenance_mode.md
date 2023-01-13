---
title: Maintenance Mode
---

Maintenance mode is used when staging equipment in a production network prior to its go-live date, or to isolate a router/device from the network in order to perform debugging or an upgrade. The primary function of maintenance mode is to suppress alarms from systems that are incomplete, or undergoing maintenance activities that would cause alarms. When the device maintenance is complete, you can set the router out of maintenance mode.

## Alarms during Maintenance mode

When an SSR is put into **Maintenance Mode** all alarms for that SSR device will be **shelved**. Shelving refers to placing an alarm in state such that it is not considered critical and so as to not bother the user. Shelved alarms will continue to be monitored by the system but will not be presented on the standard UI.

The state of shelved alarms can be optionally viewed by issuing:
```
show alarms shelved
```

You can use the router keyword to display alarms from a specific router
```
show alarms shelved router bostonsite1
```
:::note
You can view events for a specific router starting from a particular time by using the from/to keyword
:::

```
show events alarm router bostonsite1 from 2019-04-03
```

:::note
Alarms follow the ISO 8601 standard for date & time.
:::

## Enabling Maintenance Mode

You can enable maintenance mode by setting it to `true` either in the GUI or in the PCLI: `authority > router > maintenance-mode > true/false`

On GUI:

![Maintenance Mode in Configuration](/img/howto_maintenance_mode.png)

On PCLI:
```
[root@datacenter1~]# su admin
 Starting the PCLI...
 admin@datacenter1.bostonsite1# config authority router bostonsite1 maintenance-mode true
```

Similarly, you can disable the  _**maintenance-mode**_ by setting it to _**false**_.