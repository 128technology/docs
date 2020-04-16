---
title: T1 Troubleshooting
sidebar_label: T1 Troubleshooting
---

## T1 Troubleshooting Process

The 128T software is often configured to leverage legacy T1/E1 circuits to connect to provider MPLS networks. This document contains troubleshooting techniques available to 128T administrators, to confirm whether a T1 has issues prior to escalating to service provider, and to distinguish between a T1 issue and a downstream issue.

### Confirm Interface Status

The PCLI command [`show device-interface`](https://docs.128technology.com/docs/cli_reference#show-device-interface) shows the status of the T1 interface, including its administrative status and its operational status. For functioning T1 interfaces, the interface state will be `up` both administratively and operationally.

Here is an example of a working system.

```
admin@node1.router# show device-interface node all summary  | egrep "Status|t1"
 Name              Admin Status   Operational Status   Redundancy Status   MAC Address
 node1:t1-carrier1 up             up                   non-redundant       ea:83:07:63:27:74
 node2:t1-carrier2 up             up                   non-redundant       fa:88:6a:46:20:a3
```

Here is an example of a system with T1 problems:

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

Here is an example of a system with issues communicating to peers over the T1 circuit:

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

## Build a Timeline

[[TODO]]

Log into the local router's PCLI to view active alarms and event history.

> Note: the PCLI output is often very wide and may cause lines to wrap making it difficult to read on narrow screens. Ensure your screen is wide enough to prevent line wrap.

1. First, check the current system time from within the PCLI:

```
admin@node1.router# shell date
Mon Mar  9 11:19:41 EDT 2020
```

2. Choose a timeframe (e.g., 24 hours) offset from the current time, and use the `show events alarm` command to list all T1 events that have occurred in that timeframe by passing the `from` argument. The timezone of the value passed to `from` in the example below is assumed to be the same as that of the system.


    admin@node1.router# show events alarm from "2020-03-08 11:19" | grep t1

1. Build a timeline. Each event that is displayed will indicate in the `Event Type` column whether it is a new event (the type is `add`), or clearing a prior event (the type is `clear`). Furthermore, each event will fall into one of two Categories: `network-interface` or `peer`.

### How to Interpret the Data

The `network-interface` category is when the interface transitions to up or down, either administratively (i.e., disabled or enabled by an administrator), or operationally (the physical circuit).

The `peer` category reflects the ability for the 128T software to reach remote devices over that circuit.

> Note: for more information on how 128T devices peer with one another, refer to our Peering guide.

When a `network-interface` is down, either operationally or administratively, this will obviously impact all traffic on that interface. For circumstances when the `network-interface` is operationally down, proceed to the Circuit Troubleshooting section of this document.

For peers, it is important to identify if the issue affects *just one peer or all of the peers* leveraging the T1 interface. When the issue is limited to one peer, it is typically a downstream issue that should be escalated to the circuit provider. When the issue affects all peers, it is typically a circuit issue.

## Circuit Troubleshooting

The command `show device-interface` will show the details of the T1 interface activity, including errors, alarms, and signal strength.

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


​    
​     ***** w1g1: T1 Performance Monitoring Counters *****
​    
​     Line Code Violation    : 0
​     Bit Errors (CRC6/Ft/Fs)        : 284284
​     Out of Frame Errors    : 349
​     Sync Errors            : 1


​    
​     Rx Level       : > -2.5db

> Note: the 128 Technology solution includes the Sangoma E1/T1 card for interfacing to MPLS networks. For more information on the Framer alarms, the LIU alarms, and the Tx alarms, refer to the [Sangoma Reference Guide](https://wiki.freepbx.org/pages/viewpage.action?pageId=57411508) for details.

Output Highlights Follow of T1 Flapping Example


                From Linux prompt on Active T1 node run the following to confirm if T1 card is flapping, see timestamp format example


                journalctl --since "START TIME" --until "END TIME" | grep wanpipe | grep -i connect
                        NOTE: Can verify the uptime of BGP peers to see if impacted - BGP is primary via T1
                        NOTE: Can also use historical alarm process outlined above for T1 up/down


[root@aappa8692p4b ~]# journalctl --since "2019-09-20 00:00" --until "2019-09-20 19:50" | grep wanpipe | grep -i connect
Sep 20 18:50:23 aappa8692p4b kernel: wanpipe1: T1 disconnected!
Sep 20 18:50:29 aappa8692p4b kernel: wanpipe1: T1 connected!
Sep 20 18:50:37 aappa8692p4b kernel: wanpipe1: T1 disconnected!
Sep 20 18:50:42 aappa8692p4b kernel: wanpipe1: T1 connected!


                Check T1 physical errors via how device-interface node <active t1 node> name <t1 for Node B, t1-backup for Node A)


admin@AAPFL9145P1B.AAPFL9145P1# show device-interface node AAPFL9145P1B name t1
                                <snip>
 ***** w1g1: T1 Performance Monitoring Counters *****
 Line Code Violation    : 263653
 Bit Errors (CRC6/Ft/Fs)        : 1286
 Out of Frame Errors    : 230
 Sync Errors            : 17


                Repeat command to see if errors are incrementing or have normalized
admin@AAPFL9145P1B.AAPFL9145P1# show device-interface node AAPFL9145P1B name t1
                                <snip>
 ***** w1g1: T1 Performance Monitoring Counters *****
 Line Code Violation    : 2732653
 Bit Errors (CRC6/Ft/Fs)        : 1386
 Out of Frame Errors    : 239
 Sync Errors            : 17


Run the following commands in Linux to clear T1 Performance Counters (NOTE Sync Errors Don’t Clear)

Validate the t1 namespace via ip netns
[root@aapnc4162p3b ~]# ip netns
t1-ns-5 (id: 1073741828)
routingEngine




Clear the performance counters via ip netns exec <t1 namespace> wanpipemon -i w1g1 -c fpm
[root@aapnc4162p3b ~]# ip netns exec t1-ns-5 wanpipemon -i w1g1 -c fpm
DSU/CSU Perfomance Monitoring counters were flushed.
Performance monitoring counters flushed
Output Highlights Follow of T1 Down Example


        Check T1 physical errors via how device-interface node <active t1 node> name <t1 for Node B, t1-backup for Node A)


admin@AAPVA2290P4B.AAPVA2290P4# show device-interface name t1
<snip>
 Operational Status:  unknown                        (T1 Operational state unknown or down)
 T1 State:
     State:           down                                (T1 State down)
<snip>        
 ***** w1g1: T1 Rx Alarms (Framer) *****                (T1 Rx Framer Alarms ON, e.g., Loss of Signal LOS, Loss of Frame, RED)


 ALOS:  OFF     | LOS:  ON
 RED:   ON      | AIS:  OFF
 LOF:   ON      | RAI:  OFF


 ***** w1g1: T1 Rx Alarms (LIU) *****                        (T1 Rx Line Alarms, e.g., LoS, Open)


 Short Circuit: OFF
 Open Circuit:  ON
 Loss of Signal:        ON


 ***** w1g1: T1 Tx Alarms *****                        (T1 Tx Alarms, e.g., AIS, Yellow)


 AIS:   OFF     | YEL:  ON




 ***** w1g1: T1 Performance Monitoring Counters *****        (T1 Rx Signal Level Down)


 Line Code Violation    : 0
 Bit Errors (CRC6/Ft/Fs)        : 0
 Out of Frame Errors    : 0
 Sync Errors            : 0


 Rx Level       : < -36db
________________


5. Confirm Health of T1 Card Health
                
           
           
           
           
           
           
                Output of healthy status of T1 Card


[root@aapva0962p1b ~]# lspci | grep Sangoma
04:04.0 Network controller: Sangoma Technologies Corp. A200/Remora FXO/FXS Analog AFT card


[root@aapva0962p1b ~]# wanrouter status
Devices currently active:
        Wanpipe1  Wanpipe Config:
Device name | Protocol Map | Adapter  | IRQ | Slot/IO | If's | CLK | Baud rate |
wanpipe1    | N/A          | A101/1D/2/2D/4/4D/8/8D/16/16D| 22  | 4       | 1    | N/A | 0         |


Wanrouter Status:
Device name | Protocol | Station | Status        |
wanpipe1    | AFT TE1  | N/A     | Connected     |


[root@aapva0962p1b ~]# wanrouter hwprobe
-------------------------------
| Wanpipe Hardware Probe Info |
-------------------------------
1 . AFT-A101-SH : SLOT=4 : BUS=4 : IRQ=22 : CPU=A : PORT=1 : HWEC=0 : V=40
Sangoma Card Count: A101-2=1 


Output of failed status of T1 Card        


[root@aapfl9343p1b ~]# lspci | grep Sangoma
<card not present in list>


[root@aapfl9343p1b ~]# wanrouter status
Router is stopped !


[root@aapfl9343p1b ~]# wanrouter hwprobe
modprobe: ERROR: could not insert 'wanpipe': No such device


root@aapfl9343p1b log]# cat /var/log/wanrouter
Tue Oct  1 09:07:52 UTC 2019: starting WAN router
Loading driver wanpipe ... fail


root@aapfl9343p1b log]# journalctl --since “2019-09-21 00:00:00” --until “2019-09-21 20:00:00” | grep wanpipe
Sep 21 21:18:02 aapfl9343p1b kernel: __sdla_bus_read_4:1157: wanpipe PCI Error: Illegal Register read: 0x0040 = 0xFFFFFFFF
Sep 21 21:18:02 aapfl9343p1b kernel: __sdla_bus_read_4:1157: wanpipe PCI Error: Illegal Register read: 0x0040 = 0xFFFFFFFF
Sep 21 21:18:02 aapfl9343p1b kernel: __sdla_shark_te1_read_fe:567: wanpipe PCI Error: Illegal Register read: 0x40 = 0xFFFFFFFF
6. Confirm if Layer3 PPP connection is reachable via icmp


                Confirm the active t1 interface and obtain the IP address of the interface


admin@AAPVA0962P1A.AAPVA0962P1# show network-interface node all | grep t1
 AAPVA0962P1   AAPVA0962P1A   t1-backup   mpls-t1-backup       0   t1            disabled   10.61.73.169/30      --                --         up             unknown
 AAPVA0962P1   AAPVA0962P1B          t1   mpls-t1              0   t1            disabled   10.61.73.169/30      --                --         up             up




Generate a ping to the target AT&T Provider Edge (PE) Interface which is the mpls-t1 network interface +1


admin@AAPVA0962P1A.AAPVA0962P1# ping node AAPVA0962P1B egress-interface mpls-t1 10.61.73.170
PING 10.61.73.170 56 bytes of data.
Ping from 10.61.73.170 (10.61.73.170): icmp_seq=0 ttl=254 time=13.388ms
Ping from 10.61.73.170 (10.61.73.170): icmp_seq=1 ttl=254 time=9.513ms
Ping from 10.61.73.170 (10.61.73.170): icmp_seq=2 ttl=254 time=11.235ms
Ping from 10.61.73.170 (10.61.73.170): icmp_seq=3 ttl=254 time=11.583ms


NOTE: When working with AT&T AVPN NOC inform them that the local PE/CE BGP Peer is not in use and is purposefully in an ACTIVE state

________________


APPENDIX A: Loopback Testing w/ AT&T
The Sangoma T1 Card offers various loop testing capabilities to validate the T1 interface. Details on how to run the loopback automation script are provided below.


When T1 is placed in loopback the conductor can no longer use this path to manage the node, it is essential another path be available so that the Node can be accessed to enter the command to disable T1 loopback (thus restoring normal service) issued locally. Test typically run off hours to avoid impact, if circuit is erroring heavily should be admin down


NOTE: show device-interface status will be Admin: Up and Oper: Down while loop is up, can check for performance errors during testing via  wanpipemon -i w1g1 -c Ta 
The Test to run with AT&T is the Line Loopback allb/dllb example below. -  wanpipemon -p aft within namespace (e.g., ip netns exec t1-ns-5 bash) to list loopback commands 


allb    Active Line Loopback mode / dllb    Remove Line Loopback mode
Activate Line Loop for carrier to test against - Analog manual loop to carrier    


aplb    Active Payload Loopback mode / dplb    Remove  Payload Loopback mode
Activate Payload Loop for carrier to test against - Digital data portion of time slots 1-24; regenerate framing requires data test pattern within framing as opposed to link      


adlb    Active Diagnostic Digital Loopback mode internal test / ddlb    Remove Diagnostic Digital Loopback mode internal test 
Activate diagnostic loop on T1 interfaces, requires clocking set to MASTER via wanpipemon -i w1g1 -c Twrite -fe_clock MASTER  - replace w/ NORMAL once done with test


salb    Send Loopback Activate Code / sdlb    Remove Send Loopback Activate Code
Send a loop to the carrier to loop NIU, requires clocking set to MASTER  via wanpipemon -i w1g1 -c Twrite -fe_clock MASTER  - replace w/ NORMAL once done with test       


Sample Line Loopback Test 


Activate Line Loopback Mode* 
[root@aapva0775p1b ~]# wanpipemon -i w1g1 -c Tallb
Enable Line/Remote Loopback mode ... Done!
LB CMD Return Code: SANG_STATUS_SUCCESS (0)


Confirm Loopback Status
[root@aapva0775p1b ~]# wanpipemon -i w1g1 -c Tlb
***** w1g1: T1 Loopback status (0x00000080) *****
Line (Remote) Loopback: ON


Disable Line Loopback Mode
[root@aapva0775p1b ~]# wanpipemon -i w1g1 -c Tdllb
Disable Line/Remote Loopback mode ... Done!
LB CMD Return Code: SANG_STATUS_SUCCESS (0)


Confirm Loopback Mode Disabled
[root@aapva0775p1b ~]# wanpipemon -i w1g1 -c Tlb
All loopback modes are disabled!


Note: Need to be in namespace e.g., ip netns exec t1-ns-X bash, run ip netns to obtain t1 namespace on node
Note: Physical loopback plug requires the interface clock to be set to MASTER via wanpipemon -i w1g1 -c Twrite -fe_clock MASTER  - replace w/ NORMAL once done
Loopback Testing Automation Script:


To be run from conductor that contains the router in question, i.e., POD1 for POD1 routers. 


Command: 
loop_t2.pex


Options: 
        -l                                        Function flag -- perform loopback
        -d <loopback-duration>                        Loopback duration in seconds
        -s                                        Function flag -- obtain T1 stats
        -c                                        Function flag -- clear T1 stats
        -R <substring1> <substringN>                Run function against one or more routers
        -t <primary | secondary>                        Run function against primary NODE A or secondary NODE B, default to secondary as T1 default is active on NODE B
        --enable                                        Run loopback test manually without duration, requires --disable to terminate
        --disable                                        Remove loopback test manually


Examples:
        loop_t2.pex -l -d 300 -R 0962                Run loopback for 300 seconds against router 0962 NODE B secondary default, will remove loopback test after duration
        loop_t2.pex -l -d 240 -R 0962 -t primary        Run loopback for 240 seconds against router 0962 NODE A primary, will remove loopback test after duration
        loop_t2.pex -l --enable -R 0962                 Manually run loopback test against router 0962 NODE A secondary default,, --disable required to remove loopback test
loop_t2.pex -l --disable -R 0962                Manually disable loopback test on router 0962 NODE A secondary default
loop_t2.pex -s -R 0962 -t primary                Obtain T1 stats collection from router 0962 NODE B primary
loop_t2.pex -c -R 0962                         Clear T1 stats on router 0962 NODE B secondary default


When T1 is placed in loopback the conductor can no longer use this path to manage the node, it is essential that another path be validated as available so that the Node can be accessed to enter the command to disable T1 loopback (thus restoring normal service) issued locally. Test typically run off hours to avoid impact, if circuit is erroring heavily should be admin down and worked off hours assuming alt path is stable


NOTE:  Following warning message will be displayed for end user as a reminder to check alternate paths prior to running the loopback test
********************************************************
*  WARNING:
*  If the T1 interface is the only path for remote access,
*  this node will be administratively unreachable!!!!
**********************************************************
Continue[y/N]:y
APPENDIX B: Sangoma T1 Config Validation


The Sangoma T1 config file is located in /etc/wanpipe/wanpipe1.conf
The following config file is standard across all T1 interfaces, including B8ZS Line Coding, Extended Super Frame and obtaining clock from the line (NORMAL)


# WANPIPE1 Configuration File
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
________________
APPENDIX C: Circuit Checklist Required to Open a Ticket with AT&T


1. Confirm the circuit is plugged into either Node A or Node B and the node has power 
Example of T1 not being plugged into either T1 card on back of unit
Note: Carrier NIU Demarcation point is typically at phone board, straight through CAT6 connection to SCUBA T1 interface
Note: Carrier NIU can occasionally be in telco/meet-me room requiring extended dmarc
  
2. Status of active T1, Node A or Node B confirmed in Step 1: (Provide Command Output)
   1. Admin: up/down
   2. Operational: up/down/unknown
   3. T1 State: up/down
   4. T1 Flags: RUNNING versus Missing
   5. T1 Card Present in system ye/no
3. Alarm Analysis: (Provide Command Output)
   1. T1 interface flapping: Yes/No
   2. T1 peers flapping (all): Yes/No
   3. BGP flapping: Yes/No (Correlated to T1 Events?)
4. Interface Error Analysis: (Provide Command Output)
   1. KNI errors accumulating: Yes/No
   2. Layer 3 Errors accumulating: Yes/No
   3. T1 Performance Errors Accumulting : Yes/No
   4. T1 RX signal in spec: Yes/No 
5. Can ping layer 3 PE IP: Yes/No   (NOTE: When working with AT&T the local BGP will be ACTIVE as it is not in use, this is not an issue)


If definitive proof exists that the circuit is down and/or taking errors or the PE IP is not pingable proceed with opening an AT&T AVPN T1 ticket with associated details in format above
APPENDIX D: T1 Troubleshooting Cheat Sheet
Following steps outline the process to identify T1 issues and call out to carrier for testing.
1. Access Conductor associated with store router (i.e., Conductor POD1 for P1 store routers)
2. ssh into router and enter PCLI via   su-admin
3. Confirm status of active T1 - typically NODEB t1 interface is being leveraged - if both are down physical verification may be required by AAP Manager on Duty (MOD)
        admin@AAPAL9360P4A.AAPAL9360P4# show network-interface node all | grep t1
 AAPAL9360P4   AAPAL9360P4A          t1-backup   mpls-t1-backup   0   t1            disabled   10.61.68.13/30       --                --         up             unknown
 AAPAL9360P4   AAPAL9360P4B          t1                 mpls-t1               0   t1            disabled   10.61.68.13/30       --                --         up             up
4. Confirm uptime of BGP peers via show bgp summary | egrep "Tbl|172.27"
        admin@AAPAL9360P4A.AAPAL9360P4# show bgp summary | egrep "Tbl|172.27"
Neighbor        V         AS MsgRcvd MsgSent   TblVer  InQ OutQ  Up/Down State/PfxRcd
172.27.232.15   4      64794  135388  114247        0    0    0 01:26:32           40
172.27.233.15   4      64894   95300   81060        0    0    0 00:11:17           40
5. Confirm local time of system via shell date
admin@AAPAL9360P4A.AAPAL9360P4# shell date
Wed Oct 23 21:09:17 UTC 2019
6. Obtain t1 logs since last BGP hit or for last 24 hours by manipulating time stamp - show events alarm from 2019-10-23T19:30:35.630000Z | grep t1
AAPAL9360P4B   add          2019-10-23T19:35:41.175000Z   major      Peer AAPROAVAPOD4 path is down (PeerName: AAPROAVAPOD4 | Destination: 172.27.232.47 | NodeName: AAPAL9360P4B | DeviceInterface: t1 | Vlan: 0)   
AAPAL9360P4B   clear        2019-10-23T19:35:49.187000Z   major    Peer AAPROAVAPOD4 path is down (PeerName: AAPROAVAPOD4 | Destination: 172.27.232.47 | NodeName: AAPAL9360P4B | DeviceInterface: t1 | Vlan: 0)   
AAPAL9360P4B   add          2019-10-23T19:39:58.019000Z   major     Peer AAPDENCOPOD4 path is down (PeerName: AAPDENCOPOD4 | Destination: 172.27.233.79 | NodeName: AAPAL9360P4B | DeviceInterface: t1 | Vlan: 0)  
AAPAL9360P4B   clear        2019-10-23T19:40:01.017000Z   major     Peer AAPDENCOPOD4 path is down (PeerName: AAPDENCOPOD4 | Destination: 172.27.233.47 | NodeName: AAPAL9360P4B | DeviceInterface: t1 | Vlan: 0)   
AAPAL9360P4B   add          2019-10-23T19:35:41.175000Z   critical   unavailable                                    network-interface   Intf t1 (5) operationally down
AAPAL9360P4B   clear        2019-10-23T19:35:49.187000Z  critical   unavailable                                    network-interface   Intf t1 (5) operationally down 
                  Note: Checking if all peers are experiencing issues and/or check for t1 interface flap - check peer status as well via show peers 
                Note: If T1 is stable issue may be unrelated to T1, remove grep t1 to further analyze logs
7. Confirm health of physical T1 interface via show device-interface node <active-mpls-node> name <active-mpls-interface>
                show device-interface node AAPAL9360P4B name t1
                Note: Run command repeatedly checking for increases in Line Code Violations, Bit and Out of Frame Errors
                Note: If T1 is erroring heavily the interface should be admin down assuming there is an alternate viable path while the circuit is being triaged
                Note: If t1 is down look for TX/RX Framer/LIU Errors and Rx Level
8. If T1 issue is confirmed open a BMP ticket with AT&T AVPN MPLS Group and await response - if no trouble found open a second BMP ticket off hours
   1. Once 2nd ticket is created enable loopback script from Conductor associated with store router (i.e., Conductor POD1 for P1 store routers) in order for AT&T to run automated testing against - loop_t2.pex -l -d 3600 -R <Router Number>
loop_t2.pex -l -d 300 -R 9360
Note: Ensure alternate path exists to adjacent Node or the only viable path will be disabled during test isolating router
Note: Leverage -t primary flag if T1 is active on Node B - test will disable after 
Note: Will use 3600 seconds or 1 hour to ensure AT&T automation will complete once ticket is open                
9. Obtain Results from AT&T AVPN MPLS Group Once Loopback Testing is completed - verify loopback is disabled and system can be accessed






APPENDIX E: Process to Identify Potential Sites with T1 Issues


There are several methods that can be leveraged to identify sites with potential issues. Note the methods identified are to be leveraged to obtain potential T1 circuit top offenders, however analysis outlined above must be carried out to ensure the issues is in fact T1 related.


1. BFD Peer Path Analysis, leveraging alarm aggregation to identify sites with highest BFD T1 Peer Flap totals over time








2. Monitoring Scripts and Interface Polling to Obtain Error Counters on T1 Interfaces


        Scripts to collect stats and identify issues are being developed as are efforts to collect T1 error counters per interface into Avatar directly
        Once available they will be shared and reviewed with the  greater team to help streamline the troubleshooting process.
________________


3. Review BGP uptime from 128T routers or BGP route Age time from Ruckus L3 Switch in ROA/DEN


128T command on ROA/DEN Router, can be run from specific POD Conductor as well
Command output will be sorted by BGP uptime
Note to obtain the router name use the last two octets of the BGP peer e.g., 10.53.175.100 = Store 7500
admin@AAPROAVAPOD1A.AAPROAVAPOD1# show bgp summary | awk '{print $9 "\t" $1 "\t" $10}' | sort
00:03:38 10.53.175.100 1
00:12:12 10.53.168.108 1
<snip>


Ruckus Command to Obtain POD BGP Peer - 172.27.23X.10X - 232/233 ROA/DEN; 100-104 POD 1-5
SSH@AAPROAVASW01#show ip bgp summary | inc ESTAB|Accep                      
  Neighbor Address  AS#         State   Time          Rt:Accepted Filtered Sent     ToSend
  172.27.3.97       64701       ESTAB   1026d11h12m   40          0        1686     0        
  172.27.232.99     64799       ESTAB   1163d11h48m   0           0        1726     0        
  172.27.232.100    64791       ESTAB   48d15h50m     313         0        1413     0        
  172.27.232.101    64792       ESTAB   50d12h42m     395         0        1331     0        
  172.27.232.102    64793       ESTAB   48d22h51m     175         0        1551     0        
  172.27.232.103    64794       ESTAB   15d 0h35m     409         0        1317     0        
  172.27.232.104    64795       ESTAB   48d16h31m     394         0        1332     0        


Ruckus command to list routes from a given POD by Age - 100-104 POD 1-5
SSH@AAPROAVASW01#show ip bgp routes detail neighbor 172.27.232.10X | inc Age
1       Prefix: 10.110.104.0/24,  Status: BE,  Age: 5d3h25m55s
2       Prefix: 10.110.109.0/24,  Status: BE,  Age: 2d4h39m39s
       <snip>


Ruckus command to list all routes with an age less than 4 hours - Next Hop Provides POD
telnet@AAPROAVASW01#show ip bgp route detail age 14400
1       Prefix: 10.110.106.0/24,  Status: BE,  Age: 2h5m56s
         NEXT_HOP: 172.27.232.104, Metric: 0, Learned from Peer: 172.27.232.104 (64795)
          LOCAL_PREF: 200,  MED: none,  ORIGIN: igp,  Weight: 0  AS_PATH: 64795 65310
            Adj_RIB_out count: 6,  Admin distance 20
2       Prefix: 10.110.158.0/24,  Status: BE,  Age: 1h34m14s
         NEXT_HOP: 172.27.232.102, Metric: 0, Learned from Peer: 172.27.232.102 (64793)
          LOCAL_PREF: 200,  MED: none,  ORIGIN: igp,  Weight: 0  AS_PATH: 64793 65310
<snip>


NOTE: To obtain the store leverage the 2nd and 3rd octets of the route prefix, e.g., Prefix: 10.110.104.0/24 = Store 1004