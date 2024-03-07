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

To prevent dropped traffic, the customer has to enable Traffic Engineering on the Egress device-interface that is connected to ISP, and then has to configure a transmit-cap of 150Mbps to match bandwidth provided by the ISP.

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

## Troubleshooting and Statistics

Given the packet performance nature of the scheduler, no logs exist at the per-packet level to monitor traffic-engineering performance. The statistics described below are the best source of information about performance. The `success-bandwidth` and `failure-bandwidth` meters are good indicators of how well the scheduler is handling packets. For failure-bandwidth, additional statistics can be used to determine the reason for loss. Some examples are a queue full scenario resulting from an unhandled burst, or packets being dropped due to excessive time spent within the scheduler. 

Statistics for device-interface traffic engineering can be viewed from the `show stats traffic-eng device-interface` command. Use the following statistics to help analyze device-interface behavior when traffic-engineering is configured. 

The general statistics apply to the scheduler as a whole. Per-traffic-class statistics are maintained for all the available traffic-classes (high, medium, low, best-effort). 

### Statistics Descriptions

To gather information about network interface traffic engineering, query the following statistics using the `show stats traffic-eng network-interface` command. These statistics are specific to the network interface and provide insight into how the schedulers are operating. 

- `enqueue-cycle-count`: The current enqueue cycle count in traffic engineering for this network-interface. This statistic refers to the last time (in cycles) that a packet was enqueued into the scheduler. 
- `dequeue-cycle-count`: The current dequeue cycle count in traffic engineering for this network-interface. This statistic refers to the last time (in cycles) that the scheduler attempted to dequeue a packet. 
- `packets-queued`: The current number of packets queued in traffic engineering for this network-interface. 
- `scheduler-reset`: The number of times the scheduler was reset due to encountering an processing error. 
- `per-traffic-class schedule-success-bytes`: The number of bytes successfully scheduled for transmission for this network-interface.  
- `per-traffic-class schedule-success-packets`: The number of packets successfully scheduled for transmission for this network-interface.  
- `per-traffic-class schedule-failure-bytes`: The number of bytes failed to be scheduled for transmission due to bandwidth oversubscription for this network-interface.
- `per-traffic-class schedule-failure-packets`: The number of packets failed to be scheduled for transmission due to bandwidth oversubscription for this network-interface.  
- `per-traffic-class dequeue-success-bytes`: The number of bytes successfully dequeued from the scheduler for transmission for this network-interface.  
- `per-traffic-class dequeue-success-packets`: The number of packets successfully dequeued from the scheduler for transmission for this network-interface.  
- `per-traffic-class dequeue-max-latency-drop-bytes`: The number of bytes scheduled for transmission that were dropped due to excessive latency for this network-interface. 
- `per-traffic-class dequeue-max-latency-drop-packets`: The number of packets scheduled for transmission that were dropped due to excessive latency for this network-interface. 
- `per-traffic-class dequeue-aqm-drop-bytes`: The number of bytes scheduled for transmission that were dropped due to Active Queue Management for this network-interface. 
- `per-traffic-class dequeue-aqm-drop-packets`: The number of packets scheduled for transmission that were dropped due to Active Queue Management for this network-interface. 
- `per-traffic-class buffer-capacity-exceeded-bytes`: The number of bytes failed to be scheduled for transmission due to exceeded buffer capacity for this network-interface. 
- `per-traffic-class buffer-capacity-exceeded-packets`: The number of packets failed to be scheduled for transmission due to exceeded buffer capacity for this network-interface. 
- `per-traffic-class schedule-success-bandwidth`: Traffic bandwidth in bytes per second successfully scheduled for transmission for this network-interface.  
- `per-traffic-class schedule-failure-bandwidth`: Traffic bandwidth in bytes per second that failed to be scheduled or was dropped due to active queue managment for this network-interface. 
