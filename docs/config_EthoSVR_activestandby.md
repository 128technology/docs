---
title: Configuring Ethernet Over SVR for Active/Standby
sidebar_label: Configuring Ethernet Over SVR for Active/Standby
---

Ethernet over SVR (EoSVR) provides a site to site ethernet broadcast domain between SSR routers with increased security and efficiency, without the overhead of IP packet encapsulation.

EoSVR is a point-to-point L2 service that provides session resiliency even during a failover between different underlying networks. 

The SSR also allows you to configure redundancy at the L2 service level. For example, in a network deployment where there are no loop detection mechanisms are available, the EoSVR Active Standby configuration gives you the ability to configure two different endpoints on the P2P L2 service, while making sure only one of them is active at a time. 

------
However, there may be cases where you also require redundancy at the service level when using L2 services in the network. An example use case would be the replacement of a portion of an existing VPLS transport network with Juniper Smart Session Networking:
An example use case would be the replacement of a portion of an existing VPLS transport network with Juniper Smart Session Networking:
------

![Ethernet over SVR Active Standby](/img/ethosvr_active-standby.png)

In this example, VLAN A needs to be extended so that End Device 2 can be reached from any of the two Headends, typically deployed in two different datacenters. 

## Configuration Example

EoSVR Active/Standby feature relies on the standard EoSVR functionality. In order to configure it, the same LAN interface IP address needs to be defined on both Headends (see Figure 1):

```
name               Lan1
global-id          27
 
ethernet-over-svr name     br6
ethernet-over-svr enabled  true
 
ethernet-over-svr peer 169.254.50.5 SSR_HE1 ip-address  169.254.50.5
ethernet-over-svr peer 169.254.50.5 SSR_HE1 peer        SSR_HE1
tenant   branch.tenant1
 
address 169.254.50.6 ip-address     169.254.50.6
address 169.254.50.6 prefix-length  24

```
#### Headend1

```
name               Lan
global-id          30
 
ethernet-over-svr name     br7
ethernet-over-svr enabled  true
 
ethernet-over-svr peer 169.254.50.5 SSR_BRANCH ip-address  169.254.50.5
ethernet-over-svr peer 169.254.50.5 SSR_BRANCH peer        SSR_BRANCH
tenant             he1.tenant1
 
address 169.254.50.7 ip-address     169.254.50.7
address 169.254.50.7 prefix-length  24

```

#### Headend2

```
name               lan_l2
global-id          10
 
ethernet-over-svr name     br5
ethernet-over-svr enabled  true
 
ethernet-over-svr peer 169.254.50.6 SSR_BRANCH ip-address  169.254.50.6
ethernet-over-svr peer 169.254.50.6 SSR_BRANCH  peer        SSR_BRANCH 
tenant             he2.tenant1
 
address 169.254.50.5 ip-address     169.254.50.5
address 169.254.50.5 prefix-length  24

```

## How It Works

EoSVR A/S relies on the fact that the SSR will send broadcast traffic using only one of the defined services (either the active or the backup), regardless of the fact that the traffic is being received from both of them. 

![ARP Traffic](/img/ethosvr_activestandby_ARP.png)

Just like on the standard EoSVR case, typically two services are created: one for L2 traffic and one for the IP traffic. For both types, vectors will be used to determine which service gets priority over the other one. 

In order to see the detailed step by step procedure, let´s assume a scenario like the one on Figure 1.


### Configure LAN Interfaces

Configure LAN network interfaces:
•	Both Headends will configure their respective EoSVR bridges with the same IP address in the network interface and peer with the branch EoSVR bridge
•	The branch will configure its EoSVR bridge peering with the IP address configured in both Headends (any of the Headend routers can be selected)

```
name               Lan1
global-id          27
 
ethernet-over-svr name     br6
ethernet-over-svr enabled  true
 
ethernet-over-svr peer 169.254.50.5 SSR_HE1 ip-address  169.254.50.5
ethernet-over-svr peer 169.254.50.5 SSR_HE1 peer        SSR_HE1
tenant   branch.tenant1
 
address 169.254.50.6 ip-address     169.254.50.6
address 169.254.50.6 prefix-length  24
```

#### Headend 1

```
name               Lan
global-id          30
 
ethernet-over-svr name     br7
ethernet-over-svr enabled  true
 
ethernet-over-svr peer 169.254.50.5 SSR_BRANCH ip-address  169.254.50.5
ethernet-over-svr peer 169.254.50.5 SSR_BRANCH peer        SSR_BRANCH
tenant             he1.tenant1
 
address 169.254.50.7 ip-address     169.254.50.7
address 169.254.50.7 prefix-length  24
```

#### Headend 2

```
name               lan_l2
global-id          10
 
ethernet-over-svr name     br5
ethernet-over-svr enabled  true
 
ethernet-over-svr peer 169.254.50.6 SSR_BRANCH ip-address  169.254.50.6
ethernet-over-svr peer 169.254.50.6 SSR_BRANCH  peer        SSR_BRANCH 
tenant             he2.tenant1
 
address 169.254.50.5 ip-address     169.254.50.5
address 169.254.50.5 prefix-length  24
```

### Configure Neighborhoods to determine active and standby services

In order to control which is service will act as active and which as standby, two different neighborhoods can be defined. On the branch side both will apply, whilst on each Headend. Site, only one of them, either the active or the standby, will be configured :

Branch

```
name                   wan1
global-id              25
conductor              false

neighborhood wan1_standby name    wan1_standby
neighborhood wan1_standby vector  wan1_standby

neighborhood wan1_active name    wan1_active
neighborhood wan1_active vector  wan1_active`
```

Headend 1

```
name                   wan1
global-id              7

neighborhood wan1_active name      wan1_active
neighborhood wan1_active topology  hub
neighborhood wan1_active vector    wan1_active
```

Headend 2
```
name                   wan1
global-id              28

neighborhood wan1_standby name      wan1_standby
neighborhood wan1_standby topology  hub
neighborhood wan1_standby vector    wan1_standby
```

### Step 3: Configure services

Please check the documentation around configuring standard EoSVR to get further details on how to configure L2 and L3 services.

Typically, the following services will be required for an EoSVR A/S non-encapsulated use case following a branch to headend direction:

L2 service
```
name            l2_service
security        unencrypted
 
transport udp protocol    udp
 
transport udp port-range 1281 start-port  1281
address         169.254.50.5
 
access-policy branch.tenant1 source  branch.tenant1
service-policy  iberdrola_L2

```

L3_service
```
name                  L3_service
security              unencrypted

transport tcp protocol  tcp

transport udp protocol  udp

transport icmp protocol  icmp
address               0.0.0.0/0

access-policy branch.tenant1 source  branch.tenant1
service-policy        iberdrola_L2
share-service-routes  true
```

Headend 1
```
name          L2_service_SR
service-name  L2_service
bridge-name   br7
```

```
name          L3_service_SR
service-name  L3_service
bridge-name   br7
```

Headend 2
```
name          L2_service_SR
service-name  L2_service
bridge-name   br5
```

```
name          L3_service_SR
service-name  L3_service
bridge-name   br5
```

### Step 4: Configure service policy

Make sure the session-resiliency flag is enabled and configure the vector list according to active / standby priorities:

```
name                  iberdrola_L2
vector wan1_active name  wan1_active
vector wan1_standby name  wan1_standby
session-resiliency    revertible-failover
peer-path-resiliency  true
```



