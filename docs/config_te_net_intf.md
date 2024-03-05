---
title: Network Interface Traffic Engineering
sidebar_label: Network Interface Traffic Engineering
---

Network interface traffic engineering allows you to impose traffic limitations on all traffic egressing a specific network-interface. This configuration also applies to all associated adjacencies of the network-interface, but does not impact other traffic that is egressing the same device-interface but belongs to different network-interfaces.

How It (Network Interface Traffic Engineering) Works

For network-interface traffic-engineering to make a scheduling decision, the egress VLAN ID of a packet is queried to determine whether that packet has scheduling enabled. If so, the packet is enqueued into a scheduler specific for that network-interface. If not, the packet continues with normal packet processing. 

Configuration

Network-interface traffic-engineering is configured on the network-interface of a device-interface. It does not have any impact on other device-interfaces or network-interfaces belonging to the same device-interface but impacts associated adjacencies.

```
device-interface foo
    network-interface foo.20
        vlan 20         
        traffic-engineering             
            enabled true              
            transmit-cap 1000000              
            traffic-profile example-profile-1          
        exit      
    exit      
    network-interface foo.30          
        vlan 30          
        traffic-engineering              
            enabled true              
            transmit-cap 2000000              
            traffic-profile example-profile-2          
        exit      
    exit  
exit 
```

From the GUI interface, configuration specific to network-interface traffic-engineering can be found in the network-interface section under the “Traffic Engineering Settings” section. 