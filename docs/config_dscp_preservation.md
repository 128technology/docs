---
title: DSCP Preservation
sidebar_label: DSCP Preservation
---

DSCP values are commonly changed within network boundaries. In some situations it is important that the DSCP value received at the router are preserved through all SVR hops within the network. This feature allows the network administrator to preserve the original DSCP value across SVR hops.

When a new session is created, the DSCP value of the first packet received from the local LAN is recorded and included in the respective session's metadata. If DSCP values differ per packet within a session, the DSCP value from the first packet in the session will be used for each packet. This is different from traditional tunneled solutions where each packet is preserved in its entirety. 

## Configuration

When set to `true` the `preserve-dscp` command allows you to preserve dscp values that have been set in a service class or received on a LAN-Interface, over an SVR path. The default value is false. 
```
authority my-network
  router my-router
    node router-node-1
      device-interface 1
        network-interface 1
          preserve-dscp true
```

## How it Works

In a network with an application or hardware that changes the value on the WAN and a session with a preserved value of 8, the value sent at each of the hops would be as follows:

```
Client (DSCP: 8) -> SSR (DSCP: 8) -> WAN (DSCP: any) -> SSR (DSCP: 8) -> Server
```
The reverse flow will do the same.

```
Server (DSCP: any) -> SSR (DSCP: any) -> WAN (DSCP: any) -> SSR (DSCP: 8) -> Client
```

It is possible to enable this feature alongside `DSCP rewrite`. When these features are combined, the value on the packet at ingress is recorded and included in the metadata as described above. However, when the packet enters the SVR session, it has its DSCP value rewritten based on the SSR’s classification. When the packet egresses SVR, the value is restored to the original recorded value.
To use the example above with `rewrite-dscp` enabled in the forward direction and a classification with a DSCP of 15:

```
Client (DSCP: 8) -> SSR (DSCP: 15) -> WAN (DSCP: any) -> SSR (DSCP:8) -> Server
```
### Handling HA Failover

In a situation where there is an HA failover, the DSCP value from the local LAN is recorded and compared against the previous value. If the values are different and the failover is on the ingress router, the new value is used. If the failover is on the egress router and the values are different, the known value from the ingress router is used. 
