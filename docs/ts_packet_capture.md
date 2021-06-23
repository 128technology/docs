---
title: PCLI Packet Capture
---

PCAPs are one of the most useful tools to debug traffic issues on a 128T Router(s) as well as wider networking issues. The nature of troubleshooting is that it is transitory; once the problem has been identified, the system state should be restored to its previous state (or possibly with necessary modifications as a result of the troubleshooting exercise). This guide walks through the approaches for applying dynamic capture filters to the 128T Networking Platform.

Packet capture can be initiated from the PCLI or from the user interface. 

![Session Capture Selection](/img/session_capture_menu.png)

The Session Capture Window displays:

![Session Capture Window](/img/ts_create_session_capture.png)

## Packet Capture in the GUI

Packet capture in the SSR GUI is labelled Session Capture and is accessed from the Tools menu. 

## Packet Capture per Device Interface

Enabling packet capture through configuration, while useful for defining filters that will survive a reboot, can pose challenges while debugging. Pending configuration changes may exist, requiring reverting the configuration so as to apply a capture filter. Thankfully there exists a dynamic way to apply capture filters to a device interface that does not require making configuration changes.

When using dynamic capture filters, the following rules apply:

- Creating or removing a dynamic capture filter does not persist and will not survive a restart of the 128T software
- Interactions exist with configured capture filters
  - If capture filters exist within the configuration and a configuration change happens that does not impact static capture filters, the configuration change will not affect dynamic capture filters
  - If static capture filters exist within the configuration, and if a configuration change modifies the static capture filters, all dynamic capture filters will be removed

Three commands provide the capabilities to manage dynamic capture filters.

- [create capture-filter](cli_reference.md#create-capture-filter)
- [delete capture-filter](cli_reference.md#delete-capture-filter)
- [show capture-filter](cli_reference.md#show-capture-filters)

### create capture-filter

Dynamic capture filters use Berkeley Packet Filter (BPF) syntax, the same as statically configured capture filters. If the syntax is not correct, the filter will be rejected. Please refer to [online BPF documentation](https://biot.com/capstats/bpf.html) for syntax help. If a capture filter already exists, the create operation will be ignored.

The syntax for creating a capture filter can be seen below:

```
>> create capture-filter
  usage: capture-filter [force] [router <router>] [node <node>]
                         device-interface <device-interface> <capture-filter>
  Creates capture-filter from highway at the specified node
  keyword arguments:
  device-interface    The device interface on which to create the capture
                      filter
  force               Skip confirmation prompt
  node                The node on which to create the capture filter
  router              The router on which to create the capture filter
  positional arguments:
  capture-filter      The capture-filter to create (Uses BPF syntax)
```

### delete capture-filter

This command can be used to remove dynamic capture filters as well as temporarily removing any static capture filtered added through configuration.  The command will return an error if the capture filter is not present.

The syntax for removing a capture filter can be seen below:

```
>> delete capture-filter
  usage: capture-filter [force] [router <router>] [node <node>]
                        device-interface <device-interface> <capture-filter>
  Deletes capture-filter from highway at the specified node
  keyword arguments:
  device-interface    The device interface on which to delete the capture
                      filter
  force               Skip confirmation prompt
  node                The node on which to remove the capture filter
  router              The router on which to remove the capture filter

  positional arguments:
  capture-filter    The capture-filter to remove (Uses BPF syntax)
```

The keyword `all` can be used as an argument to `device-interface` to remove all capture filters on a particular node and router.  Omitting `capture-filter` from the command will remove all capture filters for a specified device interface.

### show capture-filter

In order to display both static and dynamic capture filters, the _show capture-filters_ PCLI command will reflect the current state capture filters.

The syntax for displaying static and dynamic capture filters can be seen below:

```
>> show capture-filters
  usage: capture-filters [device-interface <device-interface>]
                         [force] [router <router>] [node <node>]
  Show active capture-filters
  keyword arguments:
  device-interface    Device interface on which to show capture-filters
  force               Skip confirmation prompt
  node                The node on which to show capture-filters
  router              The router on which to show capture-filters
```

## Selective Packet Capture

While a powerful tool, it can be difficult to isolate a particular set of packets pertaining to a service using device-interface packet captures; especially if the session that is being tracked is an SVR session, where the IPs and L4 ports will be NATed. To simplify the troubleshooting effort, selective packet captures provides filtering controls beyond what is capable with BPF, and affords the administrator the ability to match traffic by service. A powerful capability of this feature is to apply a trace not only on the ingress node where the capture is defined, but also triggering traces on every subsequent 128T node the session traverses.

Selective capture can operate in one of two modes:
- _local-only_ mode will trigger a capture only on the node to which the command is issued
- _default_ mode will propagate the capture to all subsequent 128T nodes the session traverses

:::note
Much like per device interface packet captures, selective packet captures will not survive a restart of the 128T.
:::

### Default Mode

There are four locations within the 128T wherein capturing packets will provide full visibility into the behavior of a packet.
1. Forward flow of a session arriving on the ingress interface (before any NATing has been applied)
2. Forward flow of a session leaving the egress interface (post NAT with decrypted metadata)
3. Reverse flow of a session arriving on the egress interface
4. Reverse flow of a session leaving the ingress interface

When creating a selective capture filter on the LAN interface, sessions will be tagged with an action that will capture all packets for the session at each of the four points listed above. Additionally, [metadata](concepts_metadata.md) will indicate to subsequent 128T nodes/routers to enable the packet capture for this session. Each 128T node will install capture filters in each of the four capture points for the same session. A [PCAP](https://www.tcpdump.org/pcap.html) file will be created on each node, containing the name of the service captured.

![Typical Network Diagram](/img/ts_packet_capture_selective_capture.png)

Referencing the above diagram, a capture on node1.routerA will create PCAPs for a single session on each of the 12 points shown.

#### Local Mode

When creating selective packet captures in _local-mode_, a user can initiate a capture filter, targeting a particular node. No other "downstream" nodes will capture this session.

### Creating Selective Packet Capture

Executing `create session-capture` will create a file with the name `128T_service_<service-name>.pcap` on each node the session traverses. Additionally, `INFO` level logging for session setup and tear down will be added to the `serviceArea.log`. All sessions captured for the same service, even if they match more than one filter will be added to the same file and the “.pcap” file.

:::note
There is no mechanism to stop a capture for an existing session once the capture is in progress. Each session defaults to capturing 100 packets.
:::

The syntax for creating a selective capture filter can be seen below:

```
>> create session-capture
usage: session-capture [source-ip <source-ip>] [source-port <source-port>] [destination-ip <destination-ip>] [destination-port <destination-port>] [protocol <protocol>] [session-count
                       <session-count>] [packet-count <packet-count>] [local-only] [force] [router <router>] [node <node>] service <service>

Creates a session capture at the specified node for service

When destination or source IPs are not specified, any IP will be matched.
When destination or source port is not provided, port range of 0-65535 is used.
When protocol is not provided, all protocols will be matched.
When session-count is not specified, default will be unlimited.
When packet-count is not specified, default is 100 packets in each direction for each session matched.

keyword arguments:
destination-ip      The destination IP address/prefix to match
destination-port    The destination port to match (can be a range)
force               Skip confirmation prompt
local-only          Session capture is local to the node
node                The ingress node on which to create the session capture
packet-count        The number of packets to capture per session, in each direction
protocol            The protocol to match (in decimal or by name, eg 'tcp')
router              The router on which to create the session capture
service             The service on which to create the session capture
session-count       The number of sessions to capture
source-ip           The source IP address/prefix to match
source-port         The source port to match (can be a range)
```

### Removing Selective Packet Capture

The selective packet capture can be removed by specifying the filter or by the uniquely generated capture id which is displayed in the [show command](#showing-selective-packet-captures):

The syntax for removing a selective capture filter can be seen below:

```
>> delete session-capture
usage: session-capture [source-ip <source-ip>] [source-port <source-port>] [destination-ip <destination-ip>] [destination-port <destination-port>] [protocol <protocol>] [session-count
                       <session-count>] [packet-count <packet-count>] [local-only] [force] [router <router>] [node <node>] service <service>

Deletes session-capture from selected service

keyword arguments:
destination-ip      The destination IP address/prefix to match
destination-port    The destination port to match (can be a range)
force               Skip confirmation prompt
local-only          Session capture is local to the node
node                The node on which to remove the session-capture filter
packet-count        The number of packets to capture per session, in each direction
protocol            The protocol to match (in decimal or by name, eg 'tcp')
router              The router on which to remove the session-capture filter
service             The service on which to create the session capture
session-count       The number of sessions to capture
source-ip           The source IP address/prefix to match
source-port         The source port to match (can be a range)

subcommands:
by-id    Deletes session-capture from selected service
```

```
>> delete session-capture by-id
usage: by-id [force] [router <router>] [node <node>] service <service> <capture-id>

Deletes session-capture from selected service

keyword arguments:
force      Skip confirmation prompt
node       The node on which to remove the session-capture filter
router     The router on which to remove the session-capture filter
service    The service on which to create the session capture

positional arguments:
capture-id    The session-capture to remove.
```

If the selective capture is created for a limited number of sessions, once all the sessions have been captured, the capture will remove itself. Issuing a command to remove the capture will stop any new captures for new sessions on that service and any session that is still active will continue capturing until the packet count reaches the specified or default termination count.

### Showing Selective Packet Captures

The syntax for displaying selective packet capture filters can be seen below:

```
>> show session-captures
usage: session-captures [{id <id> | detail}] [service <service>] [force] [router <router>] [node <node>]

Show active session-captures

keyword arguments:
detail     display session-captures in detail
force      Skip confirmation prompt
id         The session-capture to show in detail
node       The node on which to show session-captures
router     The router on which to show session-captures
service    Service for which to show session-captures
```

The output from the show command will display currently enabled capture filters as well as the session IDs for those sessions that were captured.  With no parameters, the command will display a summary of all captures for all services.  Below is a sample output, with two captures for service “west”, and one capture for service “east”, with one active session being captured.

```
========= ==== =================== =================== ========== ==================== =================
 Service   Id   Source              Destination         Protocol   Remaining Sessions   Active Sessions
========= ==== =================== =================== ========== ==================== =================
 west       2   0.0.0.0/0:0-65535   0.0.0.0/0:0-65535   tcp        unlimited                          0
 west       5   0.0.0.0/0:0-65535   0.0.0.0/0:0-65535   icmp       unlimited                          1
 east       1   0.0.0.0/0:0-65535   0.0.0.0/0:0-65535   icmp       unlimited                          0
```

If you specify the service and capture ID via arguments, you will see details of the sessions being captured.  In the above example you can see that service “west” has an active session on capture `5`.  The detailed view can be seen below, where it shows session “1640858e-fe6a-44cd-b38a-7d479a68418” is actively being captured:

```
>> show session-captures service west id 5
Mon 2020-06-08 11:32:57 EDT


=============================================
 Router: Novigrad
=============================================
 ===========================================
  Service: west
  Id:      5
 ===========================================
  Filter:
    source-ip:        0.0.0.0/0
    source-port:      0-65535
    destination-ip:   0.0.0.0/0
    destination-port: 0-65535
    protocol:         icmp
    packet-count:     100
    session-count:    unlimited

  Sessions:
    active:           1
      1640858e-fe6a-44cd-b38a-7d479a68418
    remaining:        unlimited
```
