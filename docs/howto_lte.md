---
title: LTE
sidebar_label: LTE
---

#### History

| Release | Modification                |
| ------- | --------------------------- |
| 4.3.3   | This feature was introduced |

## Dual LTE

LTE connectivity is a valuable means of providing an alternate path for multi-path routing; either as a primary path in locations that have no access to circuits or as a path of last resort in the event that the primary circuit has failed.

Dual LTE support is valuable when connecting to two discrete wireless carriers where there is a need for an active/active LTE connection.  This is commonly used in remote ATMs or kiosks as a replacement for 56K DSL lines.

### Prerequisites

Of the many LTE modules on the market, 128 Technology has standardized on those modules that utilize QMI (Qualcomm MSM Interface Protocol).

When running with a single LTE module, there are no restrictions on how the adapter is connected within the hardware platform.  When running with two LTE cards, it is required that the second module be connected via USB interface over MiniPCIe, M.2 or even USB dongle.

### Hardware Identification

In order to identify the LTE module we need to know on what bus and device it is connected within Linux. Verify the existence of the second LTE module by scanning the USB bus. At the linux shell, execute the command `lsusb` to output the list of connected USB devices.

```bash
[root@SOL_SCM920420006 ~]# lsusb
Bus 001 Device 003: ID 1199:9071 Sierra Wireless, Inc.
Bus 001 Device 002: ID 8087:07db Intel Corp.
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

:::info
QMI-based LTE modules that exist within the 128T platform will load the `qmi_wwan` linux driver.
:::

Scan the path `/sys/bus/usb/drivers/qmi_wwan/*/net` to detect the QMI supported interface names.  It is these interface names that will be used within the 128T configuration.
```bash
[root@SOL_SCM920420006 ~]# ls /sys/bus/usb/drivers/qmi_wwan/*/net/
/sys/bus/usb/drivers/qmi_wwan/1-3:1.8/net/:wwp0s21u3i8
/sys/bus/usb/drivers/qmi_wwan/1-4:1.10/net/:wwp0s21u4i10
/sys/bus/usb/drivers/qmi_wwan/1-4:1.8/net/:wwp0s21u4i8
/sys/bus/usb/drivers/qmi_wwan/2-1:1.8/net/:wwp0s21u1i8
```

From the output of `lsusb` above, the Sierra Wireless adapter (2nd LTE card), we can tell is connected to `Bus 001 Device 003`.  This corresponds to QMI interface `wwp0s21u3i8`.

### Configuration

Two new config fields have been added to the network-interface with this feature:

- **default-route**: enable/disable default-route via LTE interface in linux
- **management-vector** contains the following two fields:
  - **name**: name of the vector
  - **priority**: the metric of default-route

Below is an example config with two LTE modules configured. The first module has AT&T SIM and the second one has Verizon SIM. Both have default-route enabled; the AT&T interface has a metric of 300 and the Verizon interface has a metric of 500.

```128T
device-interface lte-dev-1
    name lte-dev-1
    type lte
    target-interface wwp0s21u1i8
    lte
        apn-name broadband
        authentication
            user-name foo
            password foo
            authentication-protocol chap
        exit
    exit
    network-interface lte-intf-1
        name lte-intf-1
        source-nat true
        dhcp v4
        default-route true
        management-vector lte-route-1
            name lte-route-1
            priority 300
        exit
    exit
exit
device-interface lte-dev-2
    name lte-dev-2
    type lte
    target-interface wwp0s21u4i8
    lte
        apn-name vzwinternet
        authentication
            user-name bar
            password bar
            authentication-protocol pap
        exit
    exit
    network-interface lte-intf-2
        name lte-intf-2
        source-nat true
        dhcp v4
        default-route true
        management-vector lte-route-2
            name lte-route-2
            priority 500
        exit
    exit
exit
```

When 128T is not running, both LTE interfaces will be returned to linux. Before this handover happens, a default-route will be added to each interface in linux as well as an associated metric to their default-route. This is a result of the _management-vector_ configuration defined above.

After committing this configuration and shutting down 128T, the linux route table will look something like:

```bash
[root@SOL_SCM920420006 ~]# ip route
default via 172.17.0.1 dev enp4s0f0 proto static metric 100
default dev wwp0s21u1i8 scope link metric 300
default dev wwp0s21u4i8 scope link metric 500
10.66.101.176/29 dev wwp0s21u4i8 proto kernel scope link src 10.66.101.179
10.195.40.224/28 dev wwp0s21u1i8 proto kernel scope link src 10.195.40.232
172.17.0.0/16 dev enp4s0f0 proto kernel scope link src 172.17.200.166 metric 100
```

This is the only configuration that is necessary to utilize both LTE adapters.  Once the configuration is committed, the LTE interfaces can be use for routing just like any other interface.

### Troubleshooting

The output of the `show device-interface` command contains extensive information in the event of failure regarding LTE connectivity.  Of note, the following can be used to determine the cause of any failure:
- Last known failure type, code, reason, and timestamp
- Total attempts that have been made
- An estimate of when the next attempt would be made based on the corresponding backoff configuration

```
admin@128t-node.128t-router# show device-interface name lte-dev
Thu 2019-12-19 15:22:54 UTC

======================================================
 128t-node:lte-dev
======================================================
 Type:                lte
 Forwarding:          true
 Mode:                host
 MAC Address:         da:d1:54:e1:4e:54

 Admin Status:        up
 Operational Status:  down
 Redundancy Status:   non-redundant
 Speed:               0

 in-octets:                       16450
 in-unicast-pkts:                   225
 in-errors:                           0
 out-octets:                          0
 out-unicast-pkts:                    0
 out-errors:                          0

 LTE:
   Active Profile:
     APN:             broadband
     Auth:            none
     PDP type:        ipv4-or-ipv6
   Connection Status:     disconnected
   Current Ipv4 Settings: Error Retrieving Information
   Failure Context:
     attempt:            19
     code:               33
     last-failure-time:  Thu Dec 19 15:08:04 2019
     next-retry-time:    Thu Dec 19 16:08:04 2019
     reason:             option-unsubscribed
     type:               6
   Packet Stats:         Error Retrieving Information
   RSSI Signal Strength: -48 dBm
   Radio Interface:      lte
   Registration Status:  registered
   Signal Strength:      excellent
   usb-port:             /dev/ttyUSB8


Completed in 0.08 seconds
```
In additional to the PCLI, standalone `qmicli` and `serial-command` scripts are also available for troubleshooting from the Linux shell:

`lte-state <interface-name>` returns a  JSON string that contains dynamic information regarding the LTE connection status, such as IP address, signal strength, carrier, etc.

`lte-info <interface-name>` returns a JSON string that contains static information regarding the LTE module, such as firmware version, band capabilities, hardware model, etc.

These scripts can be utilized through the salt infrastructure to remotely monitor the health of the interfaces.



A new field, `usb-port` has been added to the output to `show device-interface`.  This is the USB device to which the LTE adapter is connected. While the majority of the communication between the 128T and the LTE module is over QMI, AT commands are used for certain operations, such as a card reset.

To determine which devices support AT commands, scan the path `/sys/class/net/{interface}/device/../*/ttyUSB*/`.  With the information retrieved from the `ls` command, you can then create a serial connection to the device to issues AT commands.

```bash
[root@SOL_SCM920420006 ~]# ls /sys/class/net/wwp0s21u4i8/device/../*/ttyUSB*/
/sys/class/net/wwp0s21u4i8/device/../1-4:1.0/ttyUSB6/:driver  port_number  power  subsystem  tty  uevent
/sys/class/net/wwp0s21u4i8/device/../1-4:1.2/ttyUSB7/:driver  port_number  power  subsystem  tty  uevent
/sys/class/net/wwp0s21u4i8/device/../1-4:1.3/ttyUSB8/:driver  port_number  power  subsystem  tty  uevent
```

`serial-command port <usb-port> <at-command>` to run AT commands. Issue the `ATQ0` command and check that an `OK` reply is returned.

```bash
qmicli -d /dev/cdc-wdm0 --uim-get-card-status
```
To get the firmeware loaded on the adapater, issue the command:
```bash
lte-image-preference --interface=wwp0s21u1i8 get
```
To set the firmware on the adapater, issue the command:
```bash
lte-image-preference --interface=wwp0s21u1i8 set ATT
```

## Special Considerations

Prior to 4.3.3, on a single LTE system, a default-route within linux with a metric of 128 was always added. For backward compatibility and consistency of default behavior, after upgrade to 4.3.3:
- A default-route with a metric of 128 will be added to the 128T configuration if:
  - default-route is not set **OR** set to false
  - **AND** management-vector is **NOT** configured

A validation warning (as shown below) will be issued when these conditions have not been met.

```
*admin@SOL_SCM920420006.SOL_SCM920420006# commit
Are you sure you want to commit the candidate config? [y/N]: y
⚠ Validating, then committing...
Warnings:
1. System is running a config without a default-route and a management-vector configured, a default-route with a metric of 128 will be added after 128T shutdown. To disable, set default-route to false and configure a management-vector.

    config
        authority
            router SOL_SCM920420006
                node SOL_SCM920420006
                    device-interface lte-dev-1
                        network-interface lte-intf-1
                            default-route

Configuration committed
*admin@SOL_SCM920420006.SOL_SCM920420006# q
```
After the 128T shutdown, you’ll see that default route with metric 128 is set within linux.
```bash
[root@SOL_SCM920420006 ~]# systemctl stop 128T
[root@SOL_SCM920420006 ~]# ip route
default via 172.17.0.1 dev enp4s0f0 proto static metric 100
default dev wwp0s21u1i8 scope link metric 128
```
If you need to disable the default route, within the 128T configuration, you need to:
- set `default-route` to _false_
- **AND** configure a not-empty `management-vector`