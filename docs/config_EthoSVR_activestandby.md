---
title: Configuring Ethernet Over SVR for Active/Standby
sidebar_label: Configuring Ethernet Over SVR for Active/Standby
---

EoSVR is a point-to-point L2 service that provides session resiliency even during a failover between different underlying networks. However, there may be cases where you also require redundancy at the service level when using L2 services in the network.

For example, in a network deployment where there are no loop detection mechanisms available, the EoSVR Active Standby configuration gives you the ability to configure two different endpoints on the P2P L2 service, while making sure only one is active at a time. In the configuration example below, VLAN A needs to be extended so that End Device 2 can be reached from any of the two Headends, typically deployed in two different datacenters.

![Ethernet over SVR Active Standby](/img/ethosvr_active-standby.png)

In this example, VLAN A needs to be extended so that End Device 2 can be reached from any of the two Headends, typically deployed in two different datacenters. 

## Configuration Example

The EoSVR Active/Standby feature relies on the standard EoSVR functionality. To configure Active/Standby, the same LAN interface IP address needs to be defined on both Headends (see Figure 1).

*does this show the full configuration? In other words, can I just configure this and have it work?* 

#### Branch

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

## How It Works

EoSVR A/S relies on the SSR to send broadcast traffic using only one of the defined services (either the active or the backup), regardless of the fact that the traffic is being received from both of them. 

![ARP Traffic](/img/ethosvr_activestandby_ARP.png)

As with the standard EoSVR case, two services are created: one for L2 traffic and one for the IP traffic. For both types, vectors are used to determine which service gets priority. 

In order to demonstrate the configuration, let´s assume the scenario in Figure 1.

### Step 1: Configure LAN Interfaces

Configure the LAN network interfaces:

- Both Headends have their respective EoSVR bridges configured with the same IP address in the network interface and in the peer with the branch EoSVR bridge. *(not clear on what is being configured here: is the "same IP address" from the branch with the EoSVR bridge, or is the IP address used in both the network interface and the peer that has an EoSVR bridge?*)

- The branch EoSVR bridge peering is configured with the IP address used in both Headends. Any of the Headend routers can be selected (*this doesn't make sense - can you clarify what you mean by any of the headends can be selected? You are describing the configuration of two, are there others that they can select?*)

#### Branch 

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

### Step 2: Configure Neighborhoods to determine active and standby services

In order to control which service is active and which is standby, two different neighborhoods are defined. On the branch side both (*neighborhoods?*) are applied on each Headend. (*For the?*) Site, only one, either active or standby, is configured. *need help understanding this*

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

### Step 3: Configure Services

If you are not familiar with configuring L2 and L3 services, please refer to [Create a Service for Ethernet Over SVR](config_EthoSVR.md#create-a-service-for-ethernet-over-svr). *(that documentation does not cover L3 services - do I need to add that?)*

Configure the following services for an EoSVR A/S non-encapsulated use case, following a branch-to-headend direction.

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

When you configure the [service policy](config_reference_guide.md#service-policy), make sure session-resiliency is set to `revertible failover.` Configure the vector list according to the active / standby priorities. For information about configuring vectors and priorities, refer to the [Configuration Element Reference.](config_reference_guide.md#vector)

```
name                  customer_L2
vector wan1_active name  wan1_active
vector wan1_standby name  wan1_standby
session-resiliency    revertible-failover
peer-path-resiliency  true
```



