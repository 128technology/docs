---
title: Application Troubleshooting
sidebar_label: Application Troubleshooting
---

This guide describes the methodology behind troubleshooting issues on the SSR that apply to a specific application's behavior. This technique is useful when the SSR is forwarding traffic, but end users complain about certain applications that are not behaving properly (e.g., performance is slow, certain applications don't work).

This document is for network administrators responsible for managing a deployed Session Smart Networking Platform.

## Application Latency Troubleshooting Steps

The basic approach used to troubleshoot applications on the Session Smart Networking Platform follows the set of steps below:

1. Identify the applications affected.
2. Identify the requesting _tenant_ that is attempting to use the application. 
3. Identify the _service_ associated with the application. 
4. Determine the SSR's selected route for the application.
5. Generate test traffic using the `service-ping` command.
6. Perform end user testing.

Each of these steps is discussed in more detail in the sections that follow. It is recommended to perform the application troubleshooting steps on both the local router and the remote router.

## Identify the Affected Applications

The following information can be gathered from the customer:

- Application Names
- Functions
- Any application dependencies such as DNS, LDAP/TACACS+, etc.

## Identifying the Requesting Tenant

Each source of traffic that arrives at an SSR is associated with a tenant; this may be either an administratively assigned tenant, or the default _global tenant_, which is used when no explicitly configured tenant exists. Tenancy is determined in one of several ways:

1. By arriving on a `network-interface` that has a `tenant` configured.
2. By arriving on a `network-interface` that has one or more `neighborhood` elements configured, and those neighborhoods are referenced in `tenant > member` configuration.
3. Via conveyance from an upstream SSR device that has encoded the source tenant information into SSR _metadata_. This tenancy assignment will not be discussed in this document, as the traffic routing decision is made by the first SSR encountered by a client. The focus of this document will be on items 1 and 2 exclusively.

The configuration on an SSR – specifically, items 1 and 2 above – constructs the *source lookup table* used by the SSR to affiliate inbound requests to tenants.

While it is possible to determine the contents of the source lookup table by checking the ingress `network-interface` and reviewing the tenant assignment or neighborhoods' members, the SSR administrative interfaces provide tools to make it simpler.

### Determining the Tenant from the PCLI

To determine the impacted service and service class, use the command `show tenant members` to display the **Source Lookup Table** for the specified SSR. 

```
admin@node1.router# show tenant members
Mon 2019-11-25 17:36:37 UTC

Node: SOLMA0128P1A

============ ========= ============== ================= ================== =================
 Device I/F   VLAN ID   Network I/F    Network I/F IP    Source IP Prefix   Tenant
============ ========= ============== ================= ================== =================
          2         0   ha-fabric      169.254.255.0     169.254.255.1/32   <fabric>
          3         0   pos            10.0.0.1          0.0.0.0/0          cust
          3         2   utility        10.128.0.1        0.0.0.0/0          utility.cust
          3         3   voice          10.192.0.1        0.0.0.0/0          voice.cust
          4         0   DIA            128.128.128.129   0.0.0.0/0          <global>
     kni254         0   controlKniIf   169.254.127.126   0.0.0.0/0          _internal_
        lte         0   lte            169.254.100.101   0.0.0.0/0          <global>
         t1         0   mpls-backup    169.254.128.128   0.0.0.0/0          <global>
```

### Determining the Tenant from the GUI

1. Open the Conductor's GUI. 
2. Under Authority, click on **Routers**. In the main information panel, a list of all of the managed routers is displayed. 
3. Click on a router to display its information page. 
4. On the right side of the information page, click **Routing Details**. 
5. From the Routing Details screen, click on the **Source Tenant** tab at the top of the screen. This displays the output of the source lookup table for the router – the same output as the PCLI's `show tenant members` command. 

## Identifying the Service

Sometimes, the service a user is attempting to access is self-evident (e.g., in cases where all traffic is forwarded using a "quad zero" service). In other cases it is not so clear. Follow the steps below if you need assistance in determining the *service* that particular inbound traffic is matching.

:::note
It is worth following these steps if you are not 100% certain of the service that is used for a given source/destination IP pair, since there may be unexpected "better" matches with more specific prefixes, or even "worse" matches if the service you're expecting to see doesn't match.
:::

### Identifying the Destination IP Address, Port, and Transport

All service matching is performed based on the destination address of packets received by an SSR, inclusive of port and transport protocol. It is important to understand what address, port, and protocol are being transmitted by the client. There are several tools to use to glean this:

- Packet captures. Enabling packet captures on the ingress interface will definitively show what IP/port/proto is being sent by the client. Use a capture filter such as `host a.b.c.d` (e.g., `host 192.168.1.100`) on the ingress interface, to isolate the trace to a source with the IP address `a.b.c.d`.

:::info Remember
When capturing packets on an interface that has a VLAN tag you must also include `and vlan` in your capture-filter.
:::

- The output of `show sessions` from the PCLI (or the equivalent output in the GUI) will identify all traffic that is in the SSR's *session table* – i.e., it has been through "first packet processing" on the SSR. Use the `grep` command to filter this traffic down to the source IP address, to see which destination(s) that client is attempting to access. From this list, winnow it down to the destination.

:::note
If the traffic is not present in the output of `show sessions`, then it is either not reaching that SSR, failing to establish a session due to some configuration or software error, or was a very short-lived session and it has already expired from the session table.
:::

In addition to the packet capture methods described above, you can use the [Selective Packet Capture feature](ts_packet_capture.md#selective-packet-capture) to apply a trace not only on the ingress node where the capture is defined, but also triggering traces on every subsequent SSR node the session traverses.

### Determining the Service from the PCLI

If you were able to find the session in the output of the session table, it will positively identify the name of the service that is being accessed. Move on to the next step, Determinine the Selected Route.

If you were unable to find the session in the output of the session table, we'll need to dig into the IP/port/protocol of the packet to see which service it should match.

#### Which Services Are Available?

From the PCLI, use the following command to identify which services are available to the tenant. For this example we'll use the tenant `trusted`.

```
show fib router newton | grep " trusted"
```

:::note
The tenant name within quotes has a preceding space. That will let you isolate services that are specifically allowed by this tenant, and not any of its descendents (children, grandchildren, etc.).
:::

This command will output a list of prefixes/transports/ports, sorted by IP address:

```
admin@labsystem1.fiedler# show fib router newton | grep " trusted"
✔ Piping output...
 0.0.0.0/8            <any>   <any>   trusted       <ControlMessageService>    <none>
 1.0.0.0/8            <any>   <any>   trusted       internet                   108.26.188.1
 1.0.0.1/32           53      udp     trusted       cloudflare-dns             108.26.188.1
 1.1.1.1/32           53      udp     trusted       cloudflare-dns             108.26.188.1
 2.0.0.0/7            <any>   <any>   trusted       internet                   108.26.188.1
 4.0.0.0/6            <any>   <any>   trusted       internet                   108.26.188.1
 8.0.0.0/7            <any>   <any>   trusted       internet                   108.26.188.1
 10.128.200.0/24      <any>   <any>   trusted       becket-servicenet          10.172.170.61
 11.0.0.0/8           <any>   <any>   trusted       internet                   108.26.188.1
 12.0.0.0/6           <any>   <any>   trusted       internet                   108.26.188.1
 ...
```

#### Which Service Did I Match?

Note that the matching algorithm for the SSR will give preference to *transport and port*. That is, a fully qualified port/protocol match will be considered better than an exact IP address match with no port/protocol specified. By way of example, consider the following two configuration examples:

```
service
       service-name    cloudflare-dns
       address         1.0.0.1/32
       address         1.1.1.1/32
exit
                       
service
       service-name    all-dns-traffic
       address         0.0.0.0/0
       transport       udp
               protocol      udp
               port-range 53
                       start-port    53
               exit
       exit
exit
```

Inbound traffic for `1.0.0.1` will match the `cloudflare-dns` service, and traffic for `8.8.8.8 UDP/53` will match the `all-dns-traffic` service. But traffic for `1.0.0.1 UDP/53` will _also_ match the `all-dns-traffic` service; even though the IP address in the `cloudflare-dns` service is more specific, because the port and protocol are exact matches, this traffic will match the `all-dns-traffic` service.

The lookup algorithm is as follows:

1. Perform the lookup with a "fully qualified" protocol and port (e.g., UDP/53).
2. If there is no hit, perform a lookup with a fully-qualified protocol and a wildcard port (e.g., UDP/*)
3. If there is no hit, perform a lookup with a fully wildcarded protocol and port

This information is critical when trying to understand which service your inbound traffic matches.

## Determine the Selected Route

Once you've positively identified the service that the client is requesting, we'll see which route the SSR will use for that traffic.

For service-routed traffic (i.e., when there's either an explicitly configured or a generated `service-route` for that `service` on the ingress router), you can use the `show load-balancer` tool within the PCLI to determine how the SSR will route the traffic. For natively-routed traffic, we'll use the RIB to show us where to expect the traffic to be sent.

### Service-Routed Traffic

```
admin@labsystem1.fiedler# show load-balancer router newton service cloudflare-dns
Tue 2019-12-03 16:49:04 EST
===============================================================================
Service:  cloudflare-dns
Strategy: hunt

+--------------------+-------------+------------+----------------+
|       Agent        | Destination |    Node    |    Service     |
+--------------------+-------------+------------+----------------+
| rte_cloudflare-dns |   <empty>   | labsystem2 | cloudflare-dns |
+--------------------+-------------+------------+----------------+

Capacity:
====== =========== ====== ======
 Used         Max   Util   Rate
====== =========== ====== ======
    1   unlimited           0/s

Paths (count 1):
wan.0 gateway 128.128.128.128
======= ========= ====== ======= ====== ========= ========
  Type   Quality   Cost   State   Loss   Latency   Jitter
======= ========= ====== ======= ====== ========= ========
 local         0    N/A      up     0%       0ms      0ms
```

This `cloudflare-dns` service is a non-SVR service (the next-hop type is `local`). This traffic is using the `wan.0` egress interface and will be sent to the gateway router `128.128.128.128`.

Now we'll look at an SVR service to see what the `load-balancer` output looks like:

```
admin@labsystem1.fiedler# show load-balancer router becket service newton-https
Tue 2019-12-03 16:50:56 EST
===============================================================================
Service:  newton-https
Strategy: hunt

+----------------------+-------------+------------+--------------+
|        Agent         | Destination |    Node    |   Service    |
+----------------------+-------------+------------+--------------+
| newton-https__newton |    newton   | labsystem4 | newton-https |
+----------------------+-------------+------------+--------------+

Capacity:
====== =========== ====== ======
 Used         Max   Util   Rate
====== =========== ====== ======
    0   unlimited           0/s

Paths (count 2):
lte.0 gateway 128.128.128.129
======== ========= ====== ======= ====== ========= ========
   Type   Quality   Cost   State   Loss   Latency   Jitter
======== ========= ====== ======= ====== ========= ========
 router         0    N/A      up     0%     156ms      3ms

wan0.0 gateway 192.168.2.1
======== ========= ====== ======= ====== ========= ========
   Type   Quality   Cost   State   Loss   Latency   Jitter
======== ========= ====== ======= ====== ========= ========
 router         0    N/A    down     0%       0ms      0ms
++ Warning: Path link is down
```

In this case, we can tell that it is an SVR route because the `Destination` is another router. Each of the paths (of which there are two) is of type `router`. The peer path over `wan0.0` is down, and thus we should expect the traffic to egress over the `lte.0` interface. You can also see the path statistics here (loss/latency/jitter) which can influence route selection in the event that a `service-policy` is applied to a service and requires specific ceilings for those values.

## Check the Selected Route's Health

Now that we've identified the tenant, the service, and the path that traffic will take, we'll investigate the health of that path. The process for doing this varies slightly based on whether it is an SVR path or a non-SVR path.

### SVR Traffic

When traffic is sent from one SSR to another SSR *peer*, it is called Secure Vector Routing, or "SVR."

:::note
SSRs can also send traffic to other SSRs as "native" traffic – i.e., non-SVR. This is fairly uncommon, however.
:::

The first thing to check when verifying a route's health is to look at the output of `show peers`. Here's an example:

```
admin@labsystem1.fiedler# show peers router becket
Tue 2019-12-03 18:12:03 EST

================== ============ =========== ================= ======== ================ 
 Peer               Node         Interface   Destination       Status   Hostname             
================== ============ =========== ================= ======== ================ 
 becket -> newton   labsystem4   wan0        128.128.128.129   down     lab.128t.com   
 becket -> newton   labsystem4   lte         128.128.128.129   up       lab.128t.com 
```

As we saw in the output from `show load-balancer`, one of the peers between these two routers is down (over the `wan0` interface). The LTE peer path is up, however, so this is the one which will be used.

:::note
If all peer paths between a source and a destination are down, and there are no other routes, the SSR has a "best effort" route it will use if configured to do so.
:::

#### Service Ping

Once you have identified the tenant, service, and path, you can exercise that path using the PCLI's built-in `service-ping` capability. While the syntax is a bit complex, it will use the exact same forwarding logic that the SSR control plane uses for making traffic forwarding decisions.

Here is an example of the `service-ping` at work:

```
admin@labsystem1.fiedler# service-ping router becket node labsystem4 service-name newton-https tenant trusted 128.128.128.129
PING 128.128.128.129 56 bytes of data.
Ping from 128.128.128.129 (128.128.128.129): icmp_seq=0 ttl=48 time=136.176ms
Ping from 128.128.128.129 (128.128.128.129): icmp_seq=1 ttl=48 time=112.438ms
Ping from 128.128.128.129 (128.128.128.129): icmp_seq=2 ttl=48 time=119.685ms
Ping from 128.128.128.129 (128.128.128.129): icmp_seq=3 ttl=48 time=100.758ms
```

You can pass the router, node, service, tenant, and destination IP addresses to the `service-ping` command. You cannot pass transport and port, however; as the `service-ping` command will exclusively generate ICMP packets.

:::note
The `service-ping` command will exercise the entire data path, including creating a session. You can see the effects of the `service-ping` in the output of `show sessions` – but you have to act fast (or have a second screen), since the session will expire five seconds after the last ping is sent.
:::

#### Checking Sessions

Each bidirectional flow of traffic processed by an SSR will have a unique *session ID* that persists for the duration of the session. (This is the leftmost column in the output of `show sessions`). When an SSR sends SVR traffic to another SSR, **the session ID persists between the two devices**. This greatly assists in troubleshooting, since you can identify the traffic of interest on the ingress device and see if the session arrives successfully at the next hop SSR.

### Non-SVR Traffic

For non-SVR traffic, we can use the "classic" `ping` function to make sure the SSR can reach the outside world. If the SSR can reach its next hop gateway, but pings to the far end destination fail, then the issue should be taken up with the ISP providing the circuit.

```
admin@labsystem1.fiedler# ping router becket node labsystem4 egress-interface wan0 1.0.0.1
PING 1.0.0.1 56 bytes of data.
Ping from 1.0.0.1 (1.0.0.1): icmp_seq=0 ttl=57 time=114.491ms
Ping from 1.0.0.1 (1.0.0.1): icmp_seq=1 ttl=57 time=138.771ms
Ping from 1.0.0.1 (1.0.0.1): icmp_seq=2 ttl=57 time=138.339ms
Ping from 1.0.0.1 (1.0.0.1): icmp_seq=3 ttl=57 time=138.002ms
```

### WAN Link Status

Verfiy whether the WAN links are up by checking the peer path information with the commands below.

- Use [`show device-interface router <routerName> summary`](cli_reference.md/#show-device-interface) to confirm that the target device-interface is up/up/up.

- Use [`show network-interface router <routerName>`](cli_reference.md/#show-network-interface) to confirm that the target network-interface is up.

- From the Router PCLI, check the up/down transition of the peer-paths using [`show peers name router <routerName> detail`](cli_reference.md/#show-peers).

- From the Conductor PCLI, confirm peer status is up: [`show peers name router <routerName> detail`](cli_reference.md/#show-peers).
       
### WAN Side Application Latency

- Check link latency via BFD based information
    [`show stats bfd by-peer-path router <routerName>`](cli_stats_reference.md/#show-stats-bfd-by-peer-path)
    - Check [`show stats bfd by-peer-path router <routerName> async received miss`](cli_stats_reference.md/#show-stats-bfd-by-peer-path-async-received-miss) for BFD async packets not received in time on the peer path.
    - Check jitter using [`show stats bfd by-peer-path router <routerName> jitter`](cli_stats_reference.md/#show-stats-bfd-by-peer-path-jitter).
    - Check latency using [`show stats bfd by-peer-path router <routerName> latency`](cli_stats_reference.md/#show-stats-bfd-by-peer-path-latency).

- Identify the impacted service and service class

    - Use [`show-fib router <router> tenant <tenant>`](cli_reference.md/#show-fib) to gather information about FIB entries at the router.

#### Reviewing Traffic Engineering Priorities

Look closely at the traffic engineering priorities. An oversubscribed traffic class may cause the application performance to suffer. If an oversubscribed traffic class is identified, consider reclassifying the traffic in the identified class, or increasing the allocation for that class. Use the following `show` commands to dig into the application processing details.

Use the `show stats traffic-eng device-interface per-traffic-class traffic-class <traffic class>` to display the available success and failure statistics associated with traffic engineering. When experiencing a degradation in user experience for a particular application, checking the associated error statistics for traffic engineering may show an overwhelmed traffic-class. 

Statistics such as `buffer-capacity-exceeded-packets`, and `schedule-failure-packets` show issues where an incoming burst or sustained rate has exceeded a particular queue (or multiple queues) within traffic engineering, causing the loss of those packets. 

Statistics such as `dequeue-aqm-drop-packets` and `dequeue-max-latency-drop-packets` show that packets have buffered for an excessive amount of time and are being dropped to clear up buffer space within the scheduler for more recent packets. This type of packet loss is indicative of excessive bandwidth which has overwhelmed the transmit-cap of the device-interface for a prolonged period of time. 

#### Fragmentation 

To check for fragmentation, run the [`show stats packet-processing fragmentation router <routerName>`](cli_stats_reference.md/#show-stats-packet-processing-fragmentation) command multiple times and look for incrementing stats. If Path MTU Discovery [PMTUD] is currently disabled, we recommend it be enabled. 
:::note
The Automatic MSS adjustment feature was added in version 5.2.
:::

## Perform End User Testing

Now that you have a sense of the type of application traffic you're interested in troubleshooting, we'll follow basic troubleshooting methodology:

1. Coordinate a time with the end user reporting a problem to attempt to reproduce the issue.

2. Prior to testing, enable packet captures on the non-SVR interfaces (typically the LAN) at both the ingress SSR and the egress SSR devices. Use filters that are inclusive, but as narrow as possible to keep the signal:noise ratio high.
:::note
Typically filtering traffic based on source IP at the ingress SSR and destination IP at the egress SSR is the most useful, since this will sidestep NAT issues.
:::

3. If possible, raise the log level on the ingress and egress SSR for the `highway` process. The command is `set log level debug highway` from the router's PCLI. If the router is not busy, you can set the log level to `trace` instead of debug.
:::note
Do not raise the log level on busy routers (i.e., head end) to `trace`, and do not leave them running at `debug` for extended periods.
:::

4. Use the command `write log message BEGINNING TEST 1` to cause the SSR to put an identifier into each log on the system.

5. Ask your user to run tests that demonstrate the failure.

6. Use the command `write log message ENDING TEST 1`

7. Repeate steps 4-6 several times, incrementing the TEST numbers in your log message.

8. Lower the log levels on all devices, disable packet captures on all devices.

9. Retrieve the logs and captures from ingress and egress SSR systems.

10. Analyze the captures to follow the packet flow from ingress to egress SSR. Ensure that all messages received on the ingress router arrive and are forwarded by the egress router, and that the return path follows suit in the reverse direction.

11. If the packet captures and logs do not both contain the user's test traffic, change the filter to improve the signal:noise ratio and re-test. **Getting packet captures that correspond to logs that demonstrate the failure is the most important step.**

If the SSR devices are confirmed to be forwarding traffic in both directions but the application is not working, then consult with the application provider to get their consultation. If the SSR devices are not forwarding traffic, continue troubleshooting.

### Traffic Doesn't Leave the Ingress Router

This is generally due to a configuration problem or a transient network issue (e.g., an interface failure). Look for the `BEGINNING TEST` messages in the logs and correlate them to the packet captures you took. Look for evidence of failure. For configurations that had been working previously but stopped (with no configuration changes), correlate the time at which traffic stopped working to any notable items in the router's event history – viewable with the command `show events alarm`.

### Traffic Doesn't Reach the Egress Router

If traffic is processed by the ingress router and you believe it is forwarded out to the egress router but doesn't arrive, perform additional testing as follows:

1. Enable packet captures as was done previously, but also enable them on the WAN interface(s) of the ingress and egress SSR devices. Use `capture-filter` configuration that limits the traffic to only the two waypoints of the two routers in question.

2. Run the tests as was done previously. Investigate the `highway` logs or the output of the `show sessions` table while the traffic is in progress to see what waypoint allocations were assigned to that traffic flow. On the ingress router this will be indicated by the `rev` flow for the session.

3. Look for these ports in the WAN captures on both the ingress and egress routers. If you see them leaving the ingress router and not arriving at the egress router, then this should be taken to your ISP for assistance in troubleshooting.

### Traffic Doesn't Leave the Egress Router

As with issues with the ingress router, this is generally due to a configuration problem or a transient network issue (e.g., an interface failure). Look for the `BEGINNING TEST` messages in the logs and correlate them to the packet captures you took. Look for evidence of failure. For configurations that had been working previously but stopped (with no configuration changes), correlate the time at which traffic stopped working to any notable items in the router's event history – viewable with the command `show events alarm`.

## Support Services

Juniper offers several options for support services to assist with troubleshooting. Users with a valid End User License Agreement can escalate support issues using our support system (telephone, email, web portal) as governed by our Service and Support Plan. We also host a peer-to-peer community portal, Interchange, for discussing issues that are less time sensitive or urgent. 

### Support Logs
In cases where the above troubleshooting steps have not resolved the issue, please gather the following information before opening a support ticket.

- Application name
- Name of the router/node
- Source ip/port
- Destination ip/port
- Tenant/service/service class [TE]
- Exact date/time of issue

Perform/gather the following:

- **Before** collecting the TSI, run `save runtime-stats filename <filename>` 

    - Run the command `save runtime-stats filename <filename>` on each node.
    - Wait 30 seconds.
    - Run the command again.

    Example: 
    ```
    admin@labconductor.lab# save runtime-stats filename runtime-stats-1
    Retrieving Runtime Stats...
    Runtime stats saved to /var/log/128technology/filename
    admin@labconductor.lab# save runtime-stats filename runtime-stats-2
    etrieving Runtime Stats...
    Runtime stats saved to /var/log/128technology/filename
    ```
- Session captures along path.

    A session capture should auto-create pcaps from end to end and should be generated BEFORE collecting the TSI
- Full TSI/logs including journal from each router/node

    Example Journal:
    `journalctl --since "yyyy-mm-dd hh:mm:ss” --until “yyyy-mm-dd hh:mm:ss" > /tmp/journal.txt`
- If the issue is related to salt, include conductor logs.
