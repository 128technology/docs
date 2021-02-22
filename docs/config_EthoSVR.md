---
title: Configuring Ethernet Over Secure Vector Routing
sidebar_label: Configuring Ethernet Over Secure Vector Routing
---

Any network interface can be enabled to use EoSVR. 

### Configure an ethernet-over-svr-bridge

1. On the Configuration Home page, select a router.
2. Scroll down and select a node.
3. Scroll down to Interfaces and select the device interface that connects to the peer 128T router. 
4. Scroll down to the network interfaces, and select the network interface that connects to the peer 128T router.
4. Scroll down to the Ethernet Over SVR Bridge tile, and click it. 

	![Ethernet over SVR](/img/config_EthoSVR_tile.png)

5. Enter a name for the bridge. 
6. Set Enabled to true, and Encapsulate all traffic to true. 
7. In the Peer Info panel, select ADD.
8. Enter the Peer IP address.
9. From the Name drop down, select the Peer router, and click SAVE. 

### Create a list of peer IPs (L2 adjacencies)

(GUI based procedure coming)

### Peer List

The Peer list (created as part of the EoSVR config process) consists of peers with the same EoSVR bridge name and network interface IP. This is automatically populated once the EoSVR bridge name is configured on the routers. 
