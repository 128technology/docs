---
title: Metrics
---
When querying the `STATS` API, you will notice the resolution of the data changes over time.  This is due to the downsampling that occurs.  Downsampling is performed to reduce the amount of data persisted to disk, ultimately purging the data from the system after a period of time.

The system samples data every 5 seconds.  The sampling interval is configurable under `authority > router > system > metrics > sample-period <value>`.
:::note
It is not recommended to change the sample-period.  Increasing the value reduces the resolution of the information collected.  Decreasing the value will create a greater computational load on the system. The software has been tuned to operate optimally at a sampling interval of 5 seconds.
:::
- The full resolution of 5 second sampled data is kept for 1 hour.
- Every five minutes, the sampled data is aggregated.  The 5 minute values are kept for a day.
- Every hour the 5 minute values are aggregated.  The 1 hour values are kept for 6 months.
- After 6 months, the data is purged from disk.

### In Memory Metrics
By default, not all metrics are persisted to disk and subject to downsampling. When executing `show stats` commands utilizing the `since` argument, the command will report that the requested data will be unavailable.

In-memory metrics can be configured so that only metrics matching a filter are persisted. For more information refer to [Configuring In-Memory Metrics](config_in-memory_metrics.md).

Care should be taken to avoid overloading the system with the metrics. Many metrics are currently in-memory because of the heavy load they introduce to the system if they were all persisted. 

An Example of `show stats` command using a `since` argument is shown below:

```
admin@node.router# show stats ipfix since 5:30
Tue 2020-03-15 13:07:06 UTC
WARNING: Some metrics are not available historically. Their current values will be displayed.
Retrieving statistics...

Since: 2020-03-15 05:30:00

IPFIX Stats
-----------

======================= ======== =======
 Metric                  Node     Value
======================= ======== =======
 record-export-rate      sydney       0
 time-per-export         sydney       0
 time-per-session        sydney       0
 total-generation-time   sydney       0
 total-records           sydney       0

Completed in 0.06 seconds
```

## Session Establishment Metrics
A key indicator of application performance is the time it takes to establish the TCP session between client and server.  This is effectively the time it takes to get to the first data packet between endpoints.  This metric is more telling than packet transmission rates because it is directional and end to end.  Importantly, this information can be used as a measure of SLA to influence path selection.

Session establishment metrics have been created and are gathered on a per service, per interface, per destination, per traffic-class basis.  This level of granularity provides surgically accurate information on how the network treatment and performance is impacting application behavior.  A capability that is unique only to the 128T router.

To add more context to the sessions traversing the 128T router, the newly added session establishment metrics detailed below will be collected in protocol based buckets *TCP*, *UDP*, *ICMP*, and *TLS*.  Each protocol has its own determination of what qualifications need to be met for a session to become *established*.  In turn there is protocol/application-specific handling of each of these, defined by what is considered *established*.  For the remainder of the document, the following definitions of establishment are implied per protocol:

- **TCP** - session has seen an acknowledgement to the first packet after the TCP handshake that contains payload
- **UDP** - session has seen a packet in the reverse direction
- **ICMP** - session has seen a packet in the reverse direction
- **TLS** - session has seen an acknowledgement to the first packet after the TLS handshake that contains payload

### Time to Establish
This is a grouping of 3 different metrics: min, max, and mean.  The time from session start to when it reaches the established state as defined above per-protocol.  The exception is for TLS, the start time will be at TCP establishment instead of session start.

```
admin@t116-dut1.t116# show stats highway destination-reachability tcp time-to-establishment
Tue 2020-03-31 20:33:26 UTC
Retrieving statistics...

time-to-establishment
---------------------

======== =========== ========= =================== ==================== =============== =======
 Metric   Node        Service   Network-interface   Destination-prefix   Traffic-class   Value
======== =========== ========= =================== ==================== =============== =======
 max      t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
          t116-dut1   foo       controlKniIf        192.168.56.51        high                0
          t116-dut1   foo       controlKniIf        192.168.56.51        low                 0
          t116-dut1   foo       controlKniIf        192.168.56.51        medium              0
 min      t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
          t116-dut1   foo       controlKniIf        192.168.56.51        high                0
          t116-dut1   foo       controlKniIf        192.168.56.51        low                 0
          t116-dut1   foo       controlKniIf        192.168.56.51        medium              0

Completed in 0.02 seconds
```

```
admin@t116-dut1.t116# show stats highway destination-reachability tcp time-to-establishment max
Tue 2020-03-31 20:39:12 UTC
Retrieving statistics...

Maximum time to establishment
-----------------------------

=========== ========= =================== ==================== =============== =======
 Node        Service   Network-interface   Destination-prefix   Traffic-class   Value
=========== ========= =================== ==================== =============== =======
 t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 t116-dut1   foo       controlKniIf        192.168.56.51        high                0
 t116-dut1   foo       controlKniIf        192.168.56.51        low                 0
 t116-dut1   foo       controlKniIf        192.168.56.51        medium              0

Completed in 0.02 seconds
```

```
admin@t116-dut1.t116# show stats highway destination-reachability tcp time-to-establishment min
Tue 2020-03-31 20:39:25 UTC
Retrieving statistics...

Minimum time to establishment
-----------------------------

=========== ========= =================== ==================== =============== =======
 Node        Service   Network-interface   Destination-prefix   Traffic-class   Value
=========== ========= =================== ==================== =============== =======
 t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 t116-dut1   foo       controlKniIf        192.168.56.51        high                0
 t116-dut1   foo       controlKniIf        192.168.56.51        low                 0
 t116-dut1   foo       controlKniIf        192.168.56.51        medium              0

Completed in 0.02 seconds
```

### Sessions Reached Establishment
Counts of how many sessions reach the established state as defined per-protocol above.

```
admin@t116-dut1.t116# show stats highway destination-reachability tcp established
Tue 2020-03-31 20:38:29 UTC
Retrieving statistics...

TCP sessions that were successfully established
-----------------------------------------------

=========== ========= =================== ==================== =============== =======
 Node        Service   Network-interface   Destination-prefix   Traffic-class   Value
=========== ========= =================== ==================== =============== =======
 t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 t116-dut1   foo       controlKniIf        192.168.56.51        high                0
 t116-dut1   foo       controlKniIf        192.168.56.51        low                 0
 t116-dut1   foo       controlKniIf        192.168.56.51        medium              0
```

### Sessions Timed Out Before Establishment
Counts of how many sessions timed out without ever reaching establishment, as defined per-protocol above. The TLS bucket of this metric is incremented only when the TCP established state has been reached but before the TLS established state has been reached.

```
admin@t116-dut1.t116# show stats highway destination-reachability tcp timeout-before-establishment
Tue 2020-03-31 20:40:21 UTC
Retrieving statistics...

Timed out TCP sessions before establishment
-------------------------------------------

=========== ========= =================== ==================== =============== =======
 Node        Service   Network-interface   Destination-prefix   Traffic-class   Value
=========== ========= =================== ==================== =============== =======
 t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 t116-dut1   foo       controlKniIf        192.168.56.51        high                0
 t116-dut1   foo       controlKniIf        192.168.56.51        low                 0
 t116-dut1   foo       controlKniIf        192.168.56.51        medium              0

Completed in 0.02 seconds
```

### Destination Unreachable
Counts of how many sessions could not complete because the destination was unreachable. This is determined by receipt of an ICMP destination unreachable for the session.

The below metrics don't apply across all of the specified protocols/applications (UDP, ICMP, TCP, TLS) and will have the specific protocol/application name in the metric.

```
admin@t116-dut1.t116# show stats highway destination-reachability tcp unreachable
Tue 2020-03-31 20:41:06 UTC
Retrieving statistics...

TCP unreachable
---------------

=========== ========= =================== ==================== =============== =======
 Node        Service   Network-interface   Destination-prefix   Traffic-class   Value
=========== ========= =================== ==================== =============== =======
 t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 t116-dut1   foo       controlKniIf        192.168.56.51        high                0
 t116-dut1   foo       controlKniIf        192.168.56.51        low                 0
 t116-dut1   foo       controlKniIf        192.168.56.51        medium              0

Completed in 0.02 seconds
```

### Session Close Before TCP Establishment
Counts the number of sessions that are closed by reset or fin before the session has finished the TCP handshake and data has been acknowledged.  This can be a server responding to a SYN with a reset or a proxy terminating a session it can’t complete.

```
admin@t116-dut1.t116# show stats highway destination-reachability tcp close-before-establishment
Tue 2020-03-31 20:41:56 UTC
Retrieving statistics...

Closed TCP sessions before establishment
----------------------------------------

=========== ========= =================== ==================== =============== =======
 Node        Service   Network-interface   Destination-prefix   Traffic-class   Value
=========== ========= =================== ==================== =============== =======
 t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 t116-dut1   foo       controlKniIf        192.168.56.51        high                0
 t116-dut1   foo       controlKniIf        192.168.56.51        low                 0
 t116-dut1   foo       controlKniIf        192.168.56.51        medium              0

Completed in 0.02 seconds
```

### Session Close Before TLS Establishment
Counts the number of sessions that are closed by reset or fin after TCP establishment but before the session has finished the TLS handshake and data has been acknowledged.

```
admin@t116-dut1.t116# show stats highway destination-reachability tls close-before-establishment
Tue 2020-03-31 20:42:30 UTC
Retrieving statistics...

Closed TlS sessions before establishment
----------------------------------------

=========== ========= =================== ==================== =============== =======
 Node        Service   Network-interface   Destination-prefix   Traffic-class   Value
=========== ========= =================== ==================== =============== =======
 t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 t116-dut1   foo       controlKniIf        192.168.56.51        high                0
 t116-dut1   foo       controlKniIf        192.168.56.51        low                 0
 t116-dut1   foo       controlKniIf        192.168.56.51        medium              0

Completed in 0.02 seconds
```

### Configuration
In order to begin collection of the metrics described above, a service-route must be configured to enable reachability-detection.

An example of enabled configuration is below:

```
service-route
  name                   service-agent1
  nat-target             1.2.3.4
  service-name           web
  service-route-policy   sap1
  reachability-detection
    enabled     true
  next-hop
    node-name   slice1
    interface   intf1
    gateway-ip  1.1.1.2
```

In order to filter reachability by destination prefix by traffic class:

```
admin@t116-dut1.t116# show stats highway destination-reachability destination-prefix 192.168.56.51 traffic-class best-effort
Tue 2020-03-31 20:44:47 UTC
Retrieving statistics...

Destination Reachability Statistics
-----------------------------------

=================================== =========== ========= =================== ==================== =============== =======
 Metric                              Node        Service   Network-interface   Destination-prefix   Traffic-class   Value
=================================== =========== ========= =================== ==================== =============== =======
 icmp established                    t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 icmp time-to-establishment max      t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 icmp time-to-establishment min      t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 icmp timeout-before-establishment   t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 icmp unreachable                    t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 tcp close-before-establishment      t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 tcp established                     t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 tcp time-to-establishment max       t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 tcp time-to-establishment min       t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 tcp timeout-before-establishment    t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 tcp unreachable                     t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 tls close-before-establishment      t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 tls established                     t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 tls time-to-establishment max       t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 tls time-to-establishment min       t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 tls timeout-before-establishment    t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 udp established                     t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 udp time-to-establishment max       t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 udp time-to-establishment min       t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 udp timeout-before-establishment    t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0
 udp unreachable                     t116-dut1   foo       controlKniIf        192.168.56.51        best-effort         0

Completed in 0.03 seconds
```