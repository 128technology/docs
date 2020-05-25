## Configuring Dual Router High Availability

There are several different high availability models possible with the 128T routing software. This document covers *dual router high availability*, which is when two instances of the 128T software are each configured as separate routers (rather than as two nodes within a single router). This is characterized by:

- An iBGP interface shared between the two devices in lieu of a "fabric" interface in the dual node deployment.
- No `shared-phys-address` (and hence no shared interfaces) between the two devices. Interface protection in a dual router HA deployment is accomplished using traditional routing protocols (Layer 3) rather than IP/MAC takeover (Layer 2).
- No state synchronization between the two devices (and hence no "HA link"). While this improves  overall performance for the routers (since there is no overhead incurred due to state synchronization), the implication is that there are some capabilities not supported in this design. See Unsupported Features, below.

Dual router high availability is recommended for large data center designs, where there can be a large volume of traffic, as this is where the performance savings for avoiding state synchronization is most notable.





## Unsupported Features

When deploying two nodes in a dual router high availability deployment, several features that rely on synchronized state between nodes are no longer available.

- Source NAT. 

