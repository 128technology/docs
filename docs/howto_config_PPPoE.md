---
title: Configuring Dual PPPoE
sidebar_label: Configuring Dual PPPoE
---

### Configuration

Support for multiple PPPoE interfaces on a single node is configured as follows.

```
device-interface pppoe-dev-1
    name pppoe-dev-1
    type pppoe
    target-interface dpdk3
    pppoe
        user-name user1
        password passw0rd1
        authentication-protocol chap
    exit
    network-interface pppoe-intf-1
        name pppoe-intf-1
        source-nat true
    exit
exit
device-interface pppoe-dev-2
    name pppoe-dev-2
    type pppoe
    target-interface dpdk4
    pppoe
        user-name user2
        password passw0rd2
        authentication-protocol chap
    exit
    network-interface pppoe-intf-2
        name pppoe-intf-2
        source-nat true
    exit
exit
```

In the event of a disconnection, the `failure` section of `show device-interface` displays the `ppd-exit-code` and the `ppd-exit-reason`. The example below shows an authentication failure.

```
*admin@test1.Fabric128# show device-interface name pppoe-new
Fri 2020-05-15 17:29:02 UTC
=========================================================================
 test1:pppoe-new
=========================================================================
 Type:                pppoe
 Forwarding:          true
 Mode:                host
 MAC Address:         4e:b1:12:11:9e:fd
 Admin Status:        up
 Operational Status:  down
 Redundancy Status:   non-redundant
 Speed:               0
 Duplex:              unknown
 in-octets:                        2942
 in-unicast-pkts:                    44
 in-errors:                           0
 out-octets:                       1050
 out-unicast-pkts:                   25
 out-errors:                          0
 Error:
   PPPoE State:
     connection-status:ppp2 does not exist
     failure:
       attempt:       2
       last-failure-time:Fri May 15 17:28:17 2020
       next-retry-time:Fri May 15 17:33:17 2020
       pppd-exit-code:19
       pppd-exit-reason:We failed to authenticate ourselves to the peer.
Completed in 0.12 seconds 
```

### Reconnection Timer

In situations where there are several connection attempts (for example, consecutive authenication failures), logic is used to back off the reconnect attempts on specific failure codes. Failure codes and the intervals between reconnection attempts are configurable. Use the JSON file `/var/lib/128technology/pppoe/{ppp<giid>}.init` to specify the exit codes and adjust interval times. The defaults are shown in the example below. 

After the first authentication failure (for pppd exit code 19), the intervals between each subsequent reconnect attempt will be 60s (1min), 300s (5min), 600s (10min), 1200s (20min), 2400s (40min), and 3600s (1hr). If the reconnect attempts continue after the sixth failure, the same interval time is used (3600s).

```
{
    "backoff-intervals": [60, 300, 600, 1200, 2400, 3600],
    "pppd-exit-codes": [19],
}
```
#### Connection Status using Linux

When the 128T is not running and the PPPoE connection is managed by linux, a `pppoe-state` utility is used to return the connection status. To use the utility, run `pppoe-state ppp<giid>` as shown below.

```
[root@t189-dut1 ~]# pppoe-state ppp2
{
    "PPPoE State": {
        "RX-OK": "7",
        "TX-OVR": "0",
        "Iface": "ppp2",
        "TX-OK": "7",
        "prefix": "32",
        "MTU": "1492",
        "RX-ERR": "0",
        "TX-DRP": "0",
        "TX-ERR": "0",
        "RX-DRP": "0",
        "address": "172.16.100.2",
        "peer": "172.16.100.1",
        "Flags": "PPP, RUNNING, PROMISCUOUS, UP, NOARP",
        "RX-OVR": "0"
    }
}
```