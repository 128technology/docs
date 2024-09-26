---
title: Device Interface Traffic Engineering
sidebar_label: Device Interface Traffic Engineering
---

Device interface traffic engineering allows you to impose a transmit cap on all traffic egressing a specific device-interface. 

## How It Works

For device-interface traffic-engineering to make a scheduling decision, the packet is queried to determine whether that packet has scheduling enabled. If so, the packet is enqueued into a scheduler specific for that device-interface. If not, the packet continues with normal packet processing. 

Let's use the following scenario to understand how to configure device interface traffic engineering:

During the initial SSR deployment, the customer was passing approximately 80Mbps of traffic, and did not have traffic engineering configured. Over time the traffic increased and now is exceeding the 150Mbps limit set by the ISP. This causes traffic to be dropped at the upstream ISP router. 

## Configuration

To match bandwidth provided by the ISP, the customer enables Traffic Engineering on the Egress device-interface that is connected to ISP, and then configures a transmit-cap of 150Mbps.

Device interface traffic engineering is configured under the [`device-interface`](config_command_guide.md#configure-authority-router-node-device-interface-traffic-engineering).  

```
authority
    router
        node
            device-interface 2
                traffic-engineering             
                enabled true              
                transmit-cap 1500000              
                traffic-profile example-profile-1 
            exit
        exit         
    exit
```

- `enabled`: Creates the scheduler to be used on egress for the device interface
- `transmit-cap`: The effective port rate of the device interfaces in bits per second. This value is matched internally to the link speed of the device.
- `traffic-profile`: Identifies the traffic-profile to be used when determining the traffic class distributions.

![Traffic Engineering Settings](/img/config_dev_interface_te.png)


### Limitations

Enabling traffic engineering will introduce a performance impact to the packet-per-second processing rate as the QoS engine works to ensure fairness of packet distribution under congestion scenarios. When used in conjunction with other traffic engineering settings (e.g., adjacency traffic engineering configured alongside device interface traffic engineering), performance may be further impacted.

## Troubleshooting and Statistics

Given the packet performance nature of the scheduler, no logs exist at the per-packet level to monitor traffic-engineering performance. The statistics described below are the best source of information about performance. The `success-bandwidth` and `failure-bandwidth` meters are good indicators of how well the scheduler is handling packets. For failure-bandwidth, additional statistics can be used to determine the reason for loss. Some examples are a queue full scenario resulting from an unhandled burst, or packets being dropped due to excessive time spent within the scheduler. 

Statistics for device-interface traffic engineering can be viewed from the `show stats traffic-eng device-interface` command. Use the following statistics to help analyze device-interface behavior when traffic-engineering is configured. 

The general statistics apply to the scheduler as a whole. Per-traffic-class statistics are maintained for all the available traffic-classes (high, medium, low, best-effort). 

### Gathering Statistics

To gather information about device interface traffic engineering, query the following statistics using the `show stats traffic-eng device-interface` command. These statistics are specific to the device interface and provide insight into how the schedulers are operating. 

```
admin@combo-east-a.combo-east# show stats traffic-eng device-interface
Tue 2024-03-19 13:39:20 UTC
Retrieving statistics...

Device Interface Traffic Engineering Stats
------------------------------------------

============================================================== ============== ==================
 Metric                                                         Node                      Value
============================================================== ============== ==================
 common schedule-failure                                        combo-east-a             269453
 common schedule-success                                        combo-east-a           12836478
 common tracked-buffers                                         combo-east-a                 63
 peer-path dequeue-cycle-count                                  combo-east-a           38454523
 peer-path enqueue-cycle-count                                  combo-east-a           38454523
 peer-path packets-queued                                       combo-east-a                  0
 peer-path per-traffic-class buffer-capacity-exceeded-bytes     combo-east-a                  0
 peer-path per-traffic-class buffer-capacity-exceeded-packets   combo-east-a                  0
 peer-path per-traffic-class dequeue-aqm-drop-bytes             combo-east-a                  0
 peer-path per-traffic-class dequeue-aqm-drop-packets           combo-east-a                  0
 peer-path per-traffic-class dequeue-max-latency-drop-bytes     combo-east-a                  0
 peer-path per-traffic-class dequeue-max-latency-drop-packets   combo-east-a                  0
 peer-path per-traffic-class dequeue-success-bytes              combo-east-a           48740202
 peer-path per-traffic-class dequeue-success-packets            combo-east-a             126011
 peer-path per-traffic-class schedule-failure-bandwidth         combo-east-a                  0
 peer-path per-traffic-class schedule-failure-bytes             combo-east-a                  0
 peer-path per-traffic-class schedule-failure-packets           combo-east-a                  0
 peer-path per-traffic-class schedule-success-bandwidth         combo-east-a            1231157
 peer-path per-traffic-class schedule-success-bytes             combo-east-a           48740202
 peer-path per-traffic-class schedule-success-packets           combo-east-a             126011
 peer-path scheduler-reset                                      combo-east-a                  0
```

### Statistics Descriptions

To gather information about device interface traffic engineering, query the following statistics using the `show stats traffic-eng device-interface` command. These statistics are specific to the device interface and provide insight into how the schedulers are operating.

- `enqueue-cycle-count`: The current enqueue cycle count in traffic engineering for this interface. This statistic refers to the last time (in cycles) that a packet was enqueued into the scheduler. This value is helpful when debugging. 
- `dequeue-cycle-count`: The current dequeue cycle count in traffic engineering for this interface. This statistic refers to the last time (in cycles) that the scheduler attempted to dequeue a packet.  This value is helpful when debugging.
- `packets-queued`: The current number of packets queued in traffic engineering for this interface. 
- `scheduler-reset`: The number of times the scheduler was reset due to encountering an processing error. 
- `per-traffic-class schedule-success-bytes`: The number of bytes successfully scheduled for transmission for this interface.  
- `per-traffic-class schedule-success-packets`: The number of packets successfully scheduled for transmission for this interface.  
- `per-traffic-class schedule-failure-bytes`: The number of bytes failed to be scheduled for transmission due to bandwidth oversubscription for this interface.
- `per-traffic-class schedule-failure-packets`: The number of packets failed to be scheduled for transmission due to bandwidth oversubscription for this interface.  
- `per-traffic-class dequeue-success-bytes`: The number of bytes successfully dequeued from the scheduler for transmission for this interface.  
- `per-traffic-class dequeue-success-packets`: The number of packets successfully dequeued from the scheduler for transmission for this interface.  
- `per-traffic-class dequeue-max-latency-drop-bytes`: The number of bytes scheduled for transmission that were dropped due to excessive latency for this interface. 
- `per-traffic-class dequeue-max-latency-drop-packets`: The number of packets scheduled for transmission that were dropped due to excessive latency for this interface. 
- `per-traffic-class dequeue-aqm-drop-bytes`: The number of bytes scheduled for transmission that were dropped due to Active Queue Management for this interface. 
- `per-traffic-class dequeue-aqm-drop-packets`: The number of packets scheduled for transmission that were dropped due to Active Queue Management for this interface. 
- `per-traffic-class buffer-capacity-exceeded-bytes`: The number of bytes failed to be scheduled for transmission due to exceeded buffer capacity for this interface. 
- `per-traffic-class buffer-capacity-exceeded-packets`: The number of packets failed to be scheduled for transmission due to exceeded buffer capacity for this interface. 
- `per-traffic-class schedule-success-bandwidth`: Traffic bandwidth in bytes per second successfully scheduled for transmission for this interface.  
- `per-traffic-class schedule-failure-bandwidth`: Traffic bandwidth in bytes per second that failed to be scheduled or was dropped due to active queue managment for this interface. 
