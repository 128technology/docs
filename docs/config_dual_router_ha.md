## Configuring Dual Router High Availability

There are several different high availability models possible with the 128T routing software. This document covers *dual router high availability*, which is when two instances of the 128T software are each configured as separate routers (rather than as two nodes within a single router). This is characterized by:

- An iBGP interface shared between the two devices in lieu of a "fabric" interface in the dual node deployment.
- No `shared-phys-address` (and hence no shared interfaces) between the two devices. Interface protection in a dual router HA deployment is accomplished using traditional routing protocols.

Testing 1, 2, 3.