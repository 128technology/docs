---
title: Troubleshooting Session Processing
sidebar_label: Session Processing
---

## Session Processing on the Session Smart Router

Session Smart Routers behave as both a firewall and a router. It is in its name – to be session smart – where the platform can apply a surgical amount of policy, treatment and offer a rich amount of application data for use in understanding network performance.

When it comes to determining proper performance and utilization of a SSR, one must minimally look at three characteristics:
* Throughput
* Session Capacity
* Connections per second (CPS)

This document will focus on the last of these three factors, CPS, and how to understand its utilization as it relates to the SSR's ability to process sessions.

Connections per second deal with how quickly the SSR can create, modify and store a new session accepted by its configured policy. Every system has a maximum session processing rate that is governed by the platform on which it runs. In SSR software versions prior to 6.1, session processing is single-threaded and is rate-limited by CPU clock speed and overall CPU business (as the OS scheduler affords compute cycles to this task). In software versions 6.1 and beyond, session processing is multi-threaded and can take advantage of additional host cores.

The session processing thread is responsible for session setup and modify operations. Modify operations are performed for a flow move (peer path failure or SLA violation) or with the use of application identification which updates the session after DPI. The session processing thread has a buffer queue for handling bursts of traffic or when the thread is “backed up”. As the queue fills up, latency increases for all packets in the queue. This will translate into end-to-end latency within the network. The system should be scaled with ample headroom to handle peak session processing load.

Ideally the SSR should be operating at no more than 80% utilization of its session processing threads so that it can handle bursty conditions that would be triggered as a result of path migrations. When a path failures occur, or a service is no longer within SLA, the SSR needs to modify existing sessions to ensure they are traversing the optimal pathway. For systems carrying considerable load, this could be many thousands of sessions that need to be updated.


### Enabling Multi-Threading
While SSR software versions 6.1 have support for multi-threading for session processing, it is not enabled by default. Reference the [config reference guide](config_reference_guide.md#session-setup-scaling) for details on the configuration parameters. Note that this feature must be enabled on both nodes if operating in a HA cluster.

:::warning
It is not recommended to set `session-processor-mode` to `manual` unless instructed by a member of Juniper support or engineering teams to ensure that this value is right-sized for the environment.
:::

```
config authority router <router-name> node <node-name> session-setup-scaling   true
config authority router <router-name> node <node-name> session-processor-mode  automatic
```

Once the configuration changes have been made and committed, a restart of the SSR is required for the changes to take effect.


### Examining Utilization of Session Processing Threads
In general, viewing average host CPU utilization alone will be an inaccurate view of session processing utilization. This is due to the OS scheduler and the business of all other threads. Instead, one must look at the individual session processing threads.

#### SSR version < 6.1
In software versions prior to 6.1, examining the utilization of the “PacketProcessing” thread can be achieved by viewing the output of the command `top -H d 1.0 | grep PacketProcess` from the OS shell, as seen below.

```
[centos@SOL-DL360-DUT1 ~]$ top -H d 1.0 | grep PacketProcess
 8590 root      20   0  265.2g   7.2g 113312 S 41.2  2.9 177:25.82 PacketProcessin
 8590 root      20   0  265.2g   7.2g 113312 S 39.8  2.9 177:26.23 PacketProcessin
 8590 root      20   0  265.2g   7.2g 113312 R 42.2  2.9 177:26.66 PacketProcessin
 8590 root      20   0  265.2g   7.2g 113312 S 42.7  2.9 177:27.10 PacketProcessin
 8590 root      20   0  265.2g   7.2g 113312 R 41.2  2.9 177:27.52 PacketProcessin
 8590 root      20   0  265.2g   7.2g 113312 R 37.3  2.9 177:27.90 PacketProcessin
 8590 root      20   0  265.2g   7.2g 113312 R 46.6  2.9 177:28.38 PacketProcessin
 8590 root      20   0  265.2g   7.2g 113312 R 52.0  2.9 177:28.91 PacketProcessin
 8590 root      20   0  265.2g   7.2g 113312 S 56.3  2.9 177:29.49 PacketProcessin
 8590 root      20   0  265.2g   7.2g 113312 R 61.8  2.9 177:30.12 PacketProcessin
```

#### SSR version >= 6.1
In software versions 6.1 and greater, the session processing thread(s) will have the name `Session-Prox-XX` where `XX` is a zero-based index of the number of threads allocated to session processing. An easy way to view the number of threads allocated to session processing as well as seeing current utilization can be accomplished by running the command `show stats process thread process-name highway | grep SessionProc | grep "cpu usage"`.

```
admin@test1.combo1# show stats process thread process-name highway | grep SessionProc | grep "cpu usage"
✔ Piping output...
 cpu usage             test1   highway        SessionProc-00         61.8
 cpu usage             test1   highway        SessionProc-01           55
 cpu usage             test1   highway        SessionProc-02           48
 cpu usage             test1   highway        SessionProc-03         40.6
 cpu usage             test1   highway        SessionProc-04         30.2
 cpu usage             test1   highway        SessionProc-05           20
```

Top can be used as well to follow the session processing threads:
```
[centos@SOL-DL360-DUT1 ~]$ top -H d 1.0 | grep SessionProc
 7532 root      20   0  266.9g   8.8g 120940 S 60.0  3.5  39:48.64 SessionProc-00                                                                 
 7533 root      20   0  266.9g   8.8g 120940 R 55.0  3.5  37:18.75 SessionProc-01                                                     
 7534 root      20   0  266.9g   8.8g 120940 S 55.0  3.5  34:42.19 SessionProc-02                                                       
 7535 root      20   0  266.9g   8.8g 120940 S 45.0  3.5  31:33.67 SessionProc-03                                                          
 7536 root      20   0  266.9g   8.8g 120940 S 35.0  3.5  27:27.56 SessionProc-04                                                          
 7537 root      20   0  266.9g   8.8g 120940 S 20.0  3.5  22:51.79 SessionProc-05
```

### Understanding CLI Output

The "Service Area" is the colloquial name given to the business logic responsible for session processing. The set of stats related to `internal-application` of Service Area processing are valuable to understand system behavior. These stats are monotonically increasing scalar values, so one would need to compare deltas over two periods of time to get an accurate view of rate. In particular, `schedule-failure` and `sent-tmeout` are signs that the session processing is unable to keep up with load or unable to handle the entirety of bursty traffic patterns.

```
admin@test1.combo1# show stats traffic-eng internal-application internal-application "Service Area"
Wed 2023-10-18 17:03:48 UTC
✔ Retrieving statistics...

Internal Application Traffic Engineering Stats
----------------------------------------------

==================================================== ======= ====================== =============
 Metric                                               Node    Internal-application         Value
==================================================== ======= ====================== =============
 per-traffic-class buffer-capacity-exceeded-packets   test1   Service Area                     0
 per-traffic-class dequeue-aqm-drop-packets           test1   Service Area                     0
 per-traffic-class dequeue-max-latency-drop-packets   test1   Service Area                     0
 per-traffic-class dequeue-success-packets            test1   Service Area              24113256
 per-traffic-class schedule-failure-packets           test1   Service Area                     0
 per-traffic-class schedule-success-packets           test1   Service Area              24113256
 schedule-failure                                     test1   Service Area                     0
 schedule-success                                     test1   Service Area              24114030
 scheduler-reset                                      test1   Service Area                     0
 sent-retry                                           test1   Service Area           32121873138
 sent-success                                         test1   Service Area              24113708
 sent-timeout                                         test1   Service Area                     0

Completed in 0.03 seconds
```

SSR software versions 6.1 introduces the thread-specific metrics `show stats process thread process-name highway thread-name`.

```
admin@test1.combo1# show stats process thread process-name highway thread-name SessionProc-00
Wed 2023-10-18 17:01:07 UTC
✔ Retrieving statistics...

Process Thread Metrics
----------------------

===================== ======= ============== ================ =========
 Metric                Node    Process-name   Thread-name        Value
===================== ======= ============== ================ =========
 cpu iowait            test1   highway        SessionProc-00         0
 cpu system-usage      test1   highway        SessionProc-00       9.2
 cpu usage             test1   highway        SessionProc-00        63
 cpu user-usage        test1   highway        SessionProc-00      53.8
 queue delay           test1   highway        SessionProc-00        59
 queue depth           test1   highway        SessionProc-00         0
 queue total           test1   highway        SessionProc-00   8355742
 task errors           test1   highway        SessionProc-00         0
 task execution-time   test1   highway        SessionProc-00       389
 task total            test1   highway        SessionProc-00   8363312

Completed in 0.02 seconds
```

The units for `queue delay` and `task execution-time` are in microseconds.
All values are rolling averages, except for `queue total` and `task total` which are counters.
 
The values `cpu system-usage`, `cpu usage`, and `cpu user-usage` are based out of 100% and indicate utilization of the service area thread performing session setup.
 
High values for queue depth and queue delay, coupled with high CPU usage values, are indicative of the service area threads not keeping up.


### Creating a Dashboard for Active Monitoring
Creating a `Custom Report` on the Conductor is strongly recommended for each head-end router in an authority. Head-ends are central aggregation points for traffic and therefore typically have the highest utilization and blast radius.

On the Conductor GUI, navigate to `CUSTOM REPORTS`, then click on `NEW` in the top-right corner. Select `New Empty Report` and give it the name: `Session Processing Utilization - <Router Name>` (where `<Router Name>` is the name of the router on which these reports will be customized).

:::note
Time series graphs of per-thread utilization are only available on SSR software starting with 6.1.
:::

The following graph will show time series thread utilization of session processing threads. This graph needs to be customized per router, per node, per process, and each SessionProc thread.
When building this graph, make sure to include each of the running `SessionProc` threads.
![Session Processing Thread Utilization](/img/ts_sp_session_processing_thread_utilization.png)
`process/thread/cpu/usage`
`Router <router-name> Node <node-name> Process Name 'highway' Thread Name 'SessionProc-XX'`

As noted earlier, while monitoring session processing utilization is important it is not sufficient. Looking at the utilization of all other threads is important to understand how the CPU is scheduling work across all host processors. This is valuable to determine if other processes are starving out the session processing threads.
![Host CPU Utilization - All Threads](/img/ts_sp_host_cpu_thread_utilization.png)
`process/thread/cpu/usage`
`All for Selected Router`

On a production system there will be a non-zero value of packets waiting in a queue to be processed by the session processing threads. When this value increases steadily and remains at a steady state, this is indicative of the system being unable to keep up with load. The following graph will demonstrate the queue depth for all packets destined for session processing. Note that this graph requires a custom series with the router, node, process and thread name specified according to the image below.
![Session Processing Queue Depth](/img/ts_sp_session_processing_queue_depth.png)
`process/thread/queue/depth`
`Router <router-name> Node <node-name> Process Name 'highway' Thread Name 'SessionPipeline'`

Queue delay represents the average amount of time (in microseconds) packets are waiting to be processed. When this value is steadily increasing, this is indicative of the system being unable to keep up with load. The following graph will demonstrate the average time packets are waiting to be processed. Note that this graph requires a custom series with the router, node, process and thread name specified according to the image below.
![Session Processing Queue Delay](/img/ts_sp_session_processing_queue_delay.png)
`process/thread/queue/delay`
`Router <router-name> Node <node-name> Process Name 'highway' Thread Name 'SessionPipeline'`

When the session processing queue overflows or packets exceed their maximum time waiting in the queue, they are dropped so that clients can re-transmit the packet. Timeouts on their own are not indicative of an overloaded SSR as bursts will always happen in a network during network churn. However, if this value is steadily increasing this can be indicative of the SSR being unable to keep up with session processing load.
![Service Area Scheduling Timeouts](/img/ts_sp_service_area_schedule_timeouts.png)
`traffic-eng/internal-application/sent-timeout`
`All for Selected Router`

When the session processing queue is full and no additional packets can be scheduled for session setup or modification, these packets are dropped so that clients can re-transmit the packet with an effort to be processed during the next iteration. Scheduling failures on their own are not indicative of an overloaded SSR as bursts will always happen in a network during network churn. However, if this value is steadily increasing this can be indicative of the SSR being unable to keep up with session processing load.
![Service Area Scheduling Failures](/img/ts_sp_service_area_schedule_failures.png)
`traffic-eng/internal-application/schedule-failure`
`All for Selected Router`

