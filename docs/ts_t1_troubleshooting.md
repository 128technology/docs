---
title: T1 Troubleshooting
sidebar_label: T1 Troubleshooting
---

## T1 Troubleshooting Process

The 128T software is often configured to leverage legacy T1/E1 circuits to connect to provider MPLS networks. This document contains troubleshooting techniques available to 128T administrators, to confirm whether a T1 has issues prior to escalating to service provider, and to distinguish between a T1 issue and a downstream issue.

### Confirm Interface Status

The PCLI command [`show device-interface`](https://docs.128technology.com/docs/cli_reference#show-device-interface) shows the status of the T1 interface, including its administrative status and its operational status. For functioning T1 interfaces, the interface state will be `up` both administratively and operationally.

Here is an example from a healthy system:

```
admin@node1.router# show device-interface node all summary  | egrep "Status|t1"
 Name              Admin Status   Operational Status   Redundancy Status   MAC Address
 node1:t1-carrier1 up             up                   non-redundant       ea:83:07:63:27:74
 node2:t1-carrier2 up             up                   non-redundant       fa:88:6a:46:20:a3
```

Here is an example from a system with T1 problems:

```
admin@node1.router# show device-interface node all summary  | egrep "Status|t1"
 Name              Admin Status   Operational Status   Redundancy Status   MAC Address
 node1:t1-carrier1 up             unknown              non-redundant       a6:c2:7f:75:47:26
 node2:t1-carrier2 up             down                 non-redundant       72:c4:48:fc:6f:3f
```

:::note
The state of `unknown` represents a T1 that has *never successfully come online since 128T system start*. The initial state of a T1 interface on the 128T platform is `unknown`, until it transitions to `up`. When a T1 is `unknown`, it can be treated as out of service.
:::

### Confirm Peer Status

Typically, a site will have multiple upstream peers that it connects with over any given transport circuit; for example, a branch location will connect to multiple head ends on each of its T1 circuit, its broadband circuit, LTE connection, etc. These individual connections are referred to as "peer paths," and are periodically measured using BFD packets. If some but not all of the peer paths are down on a given circuit, or only a subset are flapping (repeatedly transitioning between up and down), the issue is most likely related to a downstream issue and not a local T1 issue. As an additional point of investigation, it is encouraged to look at other branch locations that peer with the same head ends/peers to see if there is any correlation to down/flapping peer paths.

Here is an example of a system with working peers:

```
admin@node1.router# show peers | egrep "Status|t1"
 Peer       Node    Network Interface   Destination       Status   Hostname      Path MTU
 headend1   node1   mpls-t1-backup      192.0.2.201       standby  unavailable   unavailable
 headend1   node1   mpls-t1-backup      192.0.2.202       standby  unavailable   unavailable
 headend1   node2   mpls-t1             192.0.2.201       up       unavailable   unavailable
 headend1   node2   mpls-t1             192.0.2.202       up       unavailable   unavailable
 headend2   node1   mpls-t1-backup      198.51.100.11     standby  unavailable   unavailable
 headend2   node1   mpls-t1-backup      198.51.100.12     standby  unavailable   unavailable
 headend2   node2   mpls-t1             198.51.100.11     up       unavailable   unavailable
 headend2   node2   mpls-t1             198.51.100.12     up       unavailable   unavailable
 ucaas-he1  node1   mpls-t1-backup      203.0.113.101     standby  unavailable   unavailable
 ucaas-he1  node2   mpls-t1             203.0.113.102     up       unavailable   unavailable
```

:::note
In some deployments there will be "standby" paths to router peers. These may show as either `down` or `standby` in the output of `show peers`. In the sample output above these are displayed as `standby` for the backup MPLS link.
:::

Here is an example of a system with issues communicating to peers over its T1 circuit:

```
admin@node1.router# show peers | egrep "Status|t1"
 Peer       Node    Network Interface   Destination       Status   Hostname      Path MTU
 headend1   node1   mpls-t1-backup      192.0.2.201       down     unavailable   unavailable
 headend1   node1   mpls-t1-backup      192.0.2.202       down     unavailable   unavailable
 headend1   node2   mpls-t1             192.0.2.201       down     unavailable   unavailable
 headend1   node2   mpls-t1             192.0.2.202       down     unavailable   unavailable
 headend2   node1   mpls-t1-backup      198.51.100.11     down     unavailable   unavailable
 headend2   node1   mpls-t1-backup      198.51.100.12     down     unavailable   unavailable
 headend2   node2   mpls-t1             198.51.100.11     down     unavailable   unavailable
 headend2   node2   mpls-t1             198.51.100.12     down     unavailable   unavailable
 ucaas-he1  node1   mpls-t1-backup      203.0.113.101     down     unavailable   unavailable
 ucaas-he1  node2   mpls-t1             203.0.113.102     down     unavailable   unavailable
```

### Build a Timeline

Based on when your monitoring system detects a failure, or your users report connectivity problems, start building a timeline of events. This is conventional wisdom in network troubleshooting: piece together the information from logs, event history, and alarms, to compile a timeline that can be traced back to the *trigger* of the problem. This is how we will arrive at the root cause of the issue.

Log into the local router's PCLI to view active alarms and event history.

:::note
The PCLI output is often very wide and may cause lines to wrap making it difficult to read on narrow screens. Ensure your screen is wide enough to prevent line wrap.
:::

1. First, check the current system time from within the PCLI:

```
admin@node1.router# shell date
Mon Mar  9 11:19:41 EDT 2020
```

2. Choose a timeframe (e.g., 24 hours) offset from the current time, and use the `show events alarm` command to list all T1 events that have occurred in that timeframe by passing the `from` argument. The timezone of the value passed to `from` in the example below is assumed to be the same as that of the system.

```
admin@node1.router# show events alarm from "2020-03-08 11:19" | grep t1
```

3. Compile each of these events into a timeline. Each event that is displayed will indicate in the `Event Type` column whether it is a new event (the type is `add`), or clearing a prior event (the type is `clear`). Furthermore, each event will fall into one of two Categories: `network-interface` or `peer`.

#### Interpreting the Data

The `network-interface` category is used when the interface transitions to up or down, either administratively (i.e., disabled or enabled by an administrator), or operationally (the physical circuit).

The `peer` category reflects the ability for the 128T software to reach remote devices over that circuit.

When a `network-interface` is down, either operationally or administratively, this will obviously impact all traffic on that interface. For circumstances when the `network-interface` is operationally down, proceed to the Circuit Troubleshooting section of this document.

For peers, it is important to identify if the issue affects *just one peer or all of the peers* leveraging the T1 interface. When the issue is limited to one peer, it is typically a downstream issue that should be escalated to the circuit provider. When the issue affects all peers, it is typically a circuit issue.

## Circuit Troubleshooting

The command [`show device-interface`](https://docs.128technology.com/docs/cli_reference#show-device-interface) will show the details of the T1 interface activity, including errors, alarms, and signal strength.

Here is an example of a clean T1 circuit.

```
admin@node1.router# show device node node1 name t1
Mon 2020-03-09 17:56:40 UTC

======================================================
 node1:t1
======================================================
 Type:                t1
 Mode:                host
 MAC Address:         2e:8d:d0:21:a3:9a

 Admin Status:        up
 Operational Status:  up
 Redundancy Status:   non-redundant
 Speed:               1000

 in-octets:                 44113322596
 in-unicast-pkts:             274899493
 in-errors:                           0
 out-octets:                45274259759
 out-unicast-pkts:            248173338
 out-errors:                          0

 T1 State:
     State:           up
     Flags:           PPP, RUNNING, UP, NOARP
     Iface:           w1g1ppp
     MTU:             1500
     RX-DRP:          0
     RX-ERR:          0
     RX-OK:           282904443
     RX-OVR:          0
     TX-DRP:          0
     TX-ERR:          0
     TX-OK:           254742784
     TX-OVR:          0
     Alarms: 
 ***** w1g1: T1 Rx Alarms (Framer) *****

 ALOS:  OFF     | LOS:  OFF
 RED:   OFF     | AIS:  OFF
 LOF:   OFF     | RAI:  OFF

 ***** w1g1: T1 Rx Alarms (LIU) *****

 Short Circuit: OFF
 Open Circuit:  OFF
 Loss of Signal:        OFF

 ***** w1g1: T1 Tx Alarms *****

 AIS:   OFF     | YEL:  OFF

 ***** w1g1: T1 Performance Monitoring Counters *****

 Line Code Violation    : 0
 Bit Errors (CRC6/Ft/Fs)        : 0
 Out of Frame Errors    : 0
 Sync Errors            : 0

 Rx Level       : > -2.5db
```

Here is an example of a misbehaving T1; note the section on Performance Monitoring Counters at the end of the output:

```
admin@node1.router# show device-interface node node1 name t1
Mon 2020-03-09 17:50:14 UTC

======================================================
 node1:t1
======================================================
 Type:                t1
 Mode:                host
 MAC Address:         f6:a0:e7:ea:39:0a

 Admin Status:        up
 Operational Status:  up
 Redundancy Status:   non-redundant
 Speed:               1000

 in-octets:                    36727823
 in-unicast-pkts:                233085
 in-errors:                           0
 out-octets:                   38634055
 out-unicast-pkts:               229578
 out-errors:                          0

 T1 State:
     State:           up
     Flags:           PPP, RUNNING, UP, NOARP
     Iface:           w1g1ppp
     MTU:             1500
     RX-DRP:          9
     RX-ERR:          0
     RX-OK:           238562
     RX-OVR:          0
     TX-DRP:          0
     TX-ERR:          0
     TX-OK:           233929
     TX-OVR:          0
     Alarms:
***** w1g1: T1 Rx Alarms (Framer) *****

 ALOS:  OFF     | LOS:  OFF
 RED:   OFF     | AIS:  OFF
 LOF:   OFF     | RAI:  OFF

 ***** w1g1: T1 Rx Alarms (LIU) *****

 Short Circuit: OFF
 Open Circuit:  OFF
 Loss of Signal:        OFF

 ***** w1g1: T1 Tx Alarms *****

 AIS:   OFF     | YEL:  OFF

 ***** w1g1: T1 Performance Monitoring Counters *****

 Line Code Violation    : 0
 Bit Errors (CRC6/Ft/Fs)        : 284284
 Out of Frame Errors    : 349
 Sync Errors            : 1
   
 Rx Level       : > -2.5db
```

:::note
The 128 Technology solution includes the Sangoma E1/T1 card for interfacing to MPLS networks. For more information on the Framer alarms, the LIU alarms, and the Tx alarms, refer to the [Sangoma Reference Guide](https://wiki.freepbx.org/pages/viewpage.action?pageId=57411508) for details.
:::

#### Checking the Circuit Status

From Linux prompt on the node where the T1 card is installed, use the following command to confirm if the T1 card is observing circuit flapping. For this we'll use the `journalctl` command, which shows log messages in the system's journal. We can restrict it to start and end times, and then pipe it to the `grep` command to filter out everything but the messages related to `wanpipe` (the Sangoma card).

```
journalctl --since "START TIME" --until "END TIME" | grep wanpipe | grep -i connect
```

Example:
```
[t128@node1 ~]$ journalctl --since "2019-09-20 00:00" --until "2019-09-20 23:55" | grep wanpipe | grep -i connect
Sep 20 18:50:23 node1 kernel: wanpipe1: T1 disconnected!
Sep 20 18:50:29 node1 kernel: wanpipe1: T1 connected!
Sep 20 18:50:37 node1 kernel: wanpipe1: T1 disconnected!
Sep 20 18:50:42 node1 kernel: wanpipe1: T1 connected!
```
In this example we can see that the T1 card (`wanpipe1`) is reporting circuit loss at 18:50:23, restored six seconds later, down again eight seconds after that, and restored again in five seconds. This is a classic example of a "flapping" circuit. This circuit behavior will affect all peers, and cause all traffic to be migrated off of the circuit. This should correspond to interface failures in the output of `show events alarm`.

These should be added to your troubleshooting timeline.

#### Check for  T1 physical errors

We'll use the command `show device-interface node <name> name <interfaceName>` to look at the error counters for the circuit.

```
admin@node1.router# show device-interface node node1 name t1
...
 ***** w1g1: T1 Performance Monitoring Counters *****
 Line Code Violation    : 263653
 Bit Errors (CRC6/Ft/Fs)        : 1286
 Out of Frame Errors    : 230
 Sync Errors            : 17
```

Repeat this command several times to see if errors are incrementing, or if these counters are residual from an earlier incident.

```
admin@node1.router# show device-interface node node1 name t1
...
 ***** w1g1: T1 Performance Monitoring Counters *****
 Line Code Violation    : 2732653
 Bit Errors (CRC6/Ft/Fs)        : 1386
 Out of Frame Errors    : 239
 Sync Errors            : 17
```

#### Clearing the Counters
The 128T cannot reset Sangoma counters within its administrative interfaces. To clear the counters, you must follow these steps within the Linux host operating system.

:::note
The **Sync Errors** counter cannot be cleared.
:::

1. Use the command `ip netns` to identify the [Linux namespace](https://en.wikipedia.org/wiki/Linux_namespaces) used for the T1 interface. This will be of the format `t1-ns-<number>`.

```
[t128@node1 ~]$ ip netns
t1-ns-5 (id: 1073741828)
routingEngine
```

In this example, the T1 namespace is `t1-ns-5`.

2. Clear the performance counters using the command `ip netns exec <t1 namespace> wanpipemon -i w1g1 -c fpm`

```
[t128@node1 ~]$ sudo ip netns exec t1-ns-5 wanpipemon -i w1g1 -c fpm
DSU/CSU Perfomance Monitoring counters were flushed.
Performance monitoring counters flushed
```

####  Confirm Presence of the Sangoma card

Use the Linux command `lspci` to confirm that the card appears on the Linux system's PCI bus. Here is the expected result (note that the PCI address `04:04.0` may be different on your hardware platform):

```
[root@node1 ~]# lspci | grep Sangoma
04:04.0 Network controller: Sangoma Technologies Corp. A200/Remora FXO/FXS Analog AFT card
```

If the card is not present, this is the output:

```
[root@node1 ~]# lspci | grep Sangoma
[root@node1 ~]# 
```

This is indicative of a failure to the Sangoma card or the host machine.

#### Confirm Status of the T1 Card

Use the command `wanrouter status` to make sure the card is active and connected. The expected output should look something like this:

```
[root@node1 ~]# wanrouter status
Devices currently active:
        Wanpipe1  Wanpipe Config:
Device name | Protocol Map | Adapter  | IRQ | Slot/IO | If's | CLK | Baud rate |
wanpipe1    | N/A          | A101/1D/2/2D/4/4D/8/8D/16/16D| 22  | 4       | 1    | N/A | 0         |


Wanrouter Status:
Device name | Protocol | Station | Status        |
wanpipe1    | AFT TE1  | N/A     | Connected     |
```

If the card or drivers are malfunctioning, it will look like this:

```
[root@node1 ~]# wanrouter status
Router is stopped !
[root@node1 ~]#
```

Failure in this scenario means that the T1 card is not loading properly. Try to restore connectivity to the card by powering off the entire host, waiting a short time, and powering it back on. If the failure persists, this system should be replaced.

#### Confirm the System can Query the Device

Use the command `wanrouter hwprobe` to confirm communication between the host operating system and the Sangoma card. Expected output:

```
[root@node1 ~]# wanrouter hwprobe
-------------------------------
| Wanpipe Hardware Probe Info |
-------------------------------
1 . AFT-A101-SH : SLOT=4 : BUS=4 : IRQ=22 : CPU=A : PORT=1 : HWEC=0 : V=40
Sangoma Card Count: A101-2=1 
```

Failure output:

```
[root@node1 ~]# wanrouter hwprobe
modprobe: ERROR: could not insert 'wanpipe': No such device
```

For failure cases, more information may be in the logfile `/var/log/wanrouter` and the system journal:

```
root@node1 log]# cat /var/log/wanrouter
Tue Oct  1 09:07:52 UTC 2019: starting WAN router
Loading driver wanpipe ... fail
```

Use the `journalctl` command and look for messages related to `wanpipe`:

```
root@node1 log]# journalctl --since “2019-09-21 00:00:00” --until “2019-09-21 20:00:00” | grep wanpipe
Sep 21 21:18:02 aapfl9343p1b kernel: __sdla_bus_read_4:1157: wanpipe PCI Error: Illegal Register read: 0x0040 = 0xFFFFFFFF
Sep 21 21:18:02 aapfl9343p1b kernel: __sdla_bus_read_4:1157: wanpipe PCI Error: Illegal Register read: 0x0040 = 0xFFFFFFFF
Sep 21 21:18:02 aapfl9343p1b kernel: __sdla_shark_te1_read_fe:567: wanpipe PCI Error: Illegal Register read: 0x40 = 0xFFFFFFFF
```

#### Confirm Layer3 PPP connection using ICMP

We'll use the old standby `ping` to make sure we can reach the PPP peer. Use the `ping` command, specifying the egress interface, and put in the service provider's Provider Edge (PE) IP address:

```
admin@node1.router# ping node AAPVA0962P1B egress-interface t1 10.61.73.170
PING 10.61.73.170 56 bytes of data.
Ping from 10.61.73.170 (10.61.73.170): icmp_seq=0 ttl=254 time=13.388ms
Ping from 10.61.73.170 (10.61.73.170): icmp_seq=1 ttl=254 time=9.513ms
Ping from 10.61.73.170 (10.61.73.170): icmp_seq=2 ttl=254 time=11.235ms
Ping from 10.61.73.170 (10.61.73.170): icmp_seq=3 ttl=254 time=11.583ms
```

If the ping request fails and all indications from the 128T and Sangoma diagnostics indicate an otherwise healthy system, escalate to the service provider for investigation on the PE equipment.

## Manual Loopback

The Sangoma T1 Card with the latest firmware will automatically loop back on detection of a loop signal from the service provider. However, there may be cases where you will need to manually loop up the card. This is done through the Linux shell using `wanpipe` commands.

:::note
When T1 is placed in loopback, the interface is no longer usable for remote administration, conductor connectivity, traffic forwarding, etc. **This should only be done during scheduled maintenance, or in critical situations.** Because this can interfere with remote administration, *it is essential another path be available so that the Node can be accessed to enter the command to disable T1 loopback* (thus restoring normal service) issued locally.
:::

The output of `show device-interface` will indicate a status of Admin: Up and Oper: Down while the loopback is engaged. You will need to use the Linux shell to query the card for statistics while it is unavailable to 128T.

Performance counters can be retrieved using the Linux command `wanpipemon -i w1g1 -c Ta`

:::note
All of the commands in this section must be run from within the T1's namespace in Linux. You can either precede all of the commands with `ip netns exec t1-ns-<number>`, or use the command `ip netns exec t1-ns-<number> bash` to start a shell within that namespace. If using the latter technique, all commands will be run from within the namespace; use the `exit` command to leave that shell and return to the default namespace.

For the examples in this section, we will **not** use individual `ip netns exec` commands for each sample output. These were run from within a `bash` shell in the namespace.
:::

To enable a manual loopback:

```
[root@node1 ~]# wanpipemon -i w1g1 -c Tallb
Enable Line/Remote Loopback mode ... Done!
LB CMD Return Code: SANG_STATUS_SUCCESS (0)
```

To confirm the loopback status:

```
[root@node1 ~]# wanpipemon -i w1g1 -c Tlb
***** w1g1: T1 Loopback status (0x00000080) *****
Line (Remote) Loopback: ON
```

To disable line loopback mode:

```
[root@node1 ~]# wanpipemon -i w1g1 -c Tdllb
Disable Line/Remote Loopback mode ... Done!
LB CMD Return Code: SANG_STATUS_SUCCESS (0)
```

To confirm loopback is disabled:

```
[root@node1 ~]# wanpipemon -i w1g1 -c Tlb
All loopback modes are disabled!
```

## Standard T1 Configuration File

Below is the standard configuration file included with the 128T software. The file is located at `/etc/wanpipe/wanpipe1.conf`.

```
[devices]
wanpipe1 = WAN_AFT_TE1, Comment
[interfaces]
w1g1 = wanpipe1, , STACK, Comment
w1g1ppp = wanpipe1, , WANPIPE, ppp, w1g1.ppp
[wanpipe1]
CARD_TYPE         = AFT
S514CPU         = A
CommPort         = PRI
AUTO_PCISLOT         = YES
FE_MEDIA        = T1
FE_LCODE        = B8ZS
FE_FRAME        = ESF
FE_LINE                = 1
TE_CLOCK         = NORMAL
TE_REF_CLOCK         = 0
TE_HIGHIMPEDANCE        = NO
TE_RX_SLEVEL        = 360
LBO                 = 0DB
FE_TXTRISTATE        = NO
MTU                 = 1500
UDPPORT         = 9000
TTL                = 255
IGNORE_FRONT_END = NO
TDMV_HW_DTMF        = NO
[w1g1ppp]
IPX        = NO
MULTICAST        = NO
DYN_INTR_CFG        = NO
TRUE_ENCODING_TYPE        = NO
GATEWAY        = NO
[w1g1.ppp]
IP_MODE        = STATIC
PAP        = NO
CHAP        = NO
[w1g1]
HDLC_STREAMING        = YES
ACTIVE_CH        = ALL
MTU                = 0
MRU                = 0
DATA_MUX        = NO
```

## Escalating to the Service Provider

If the troubleshooting exercise leads you to believe the issue is with the service provider's circuit, we recommend collecting the following information prior to escalating.

1. Confirm the circuit is plugged in and the node has power 
2. Status of active T1
   1. Admin: up/down
   2. Operational: up/down/unknown
   3. T1 State: up/down
   4. T1 Flags: RUNNING versus Missing
   5. T1 Card Present in system Yes/No
3. Alarm Analysis: (Provide Command Output)
   1. T1 interface flapping: Yes/No
   2. T1 peers flapping (all): Yes/No
   3. BGP flapping: Yes/No (Correlated to T1 Events?)
4. Interface Error Analysis: (Provide Command Output)
   1. KNI errors accumulating: Yes/No
   2. Layer 3 Errors accumulating: Yes/No
   3. T1 Performance Errors Accumulting : Yes/No
   4. T1 RX signal in spec: Yes/No 
5. Can ping PPP peer (Provider Edge) IP: Yes/No