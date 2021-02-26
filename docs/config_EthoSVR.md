---
title: Configuring Ethernet Over Secure Vector Routing
sidebar_label: Configuring Ethernet Over Secure Vector Routing
---

Use the following procedures to configure a 128T network to use Ethernet Over SVR (EoSVR). Any network interface can be configured to use Ethernet Over SVR. 

### Configure an Ethernet Over SVR Bridge

1. On the Configuration home screen, select a router.
2. Scroll down and select a node.
3. Scroll down to Interfaces and select the device interface (the LAN interface) that connects to the peer 128T router. 
4. Scroll down to the network interfaces, and select the network interface (the LAN interface) that connects to the peer 128T router.
4. Scroll down to the Ethernet Over SVR tile, and click it. 

	![Ethernet over SVR](/img/config_EthoSVR_tile.png)

5. Enter a name for the bridge. 
6. Set Enabled to true. 
	:::note
	Enabling the Encapsulate All switch encapsulates all traffic, including IP traffic. 
	:::
7. In the Peer Info panel, select ADD.
8. Enter LAN IP address of the corresponding peer 128T router where the same bridge name is configured.
9. From the Name drop down, select the Peer router, and click SAVE. 
10. Repeat this process for the Peer router, using the same name for the bridge and adding the appropriate Peer IP address and name. 

### Create a Service For EthOverSVR

In most cases the layer 2 services will be created automatically. However, there may be times when the service must be created manually, or modifying an existing service is necessary. Use the following procedure to create a service on each router for layer 2 traffic. For IP traffic, use the [Create a Service](intro_basic_conductor_config.md/#create-a-service) procedure.

1. On the Configuration home screen, scroll down to Services and click ADD.
2. Name the service and click SAVE.
3. Under Service Applies To, click New and select router from the drop down. 
4. Click SAVE.
5. In the Router Name panel, select ADD.
6. Select the router name from the drop down.
7. Return to the Service panel, and scroll to the Service Transpoprt pane.
8. Click ADD, select UDP from the drop down, and click SAVE. 
9. In the **Service Transport: UDP** window, under Port ranges click ADD.
10. Set the Start Port to 1281 and click SAVE.
11. Create another service for the other router - perform the same steps, but in setp 6, choose the Peer router.
12. Return to the Configuration home screen.

Each new EoSVR service adds an Ethernet Over SVR Bridge (`eosvr bridge`) service-route. 

#### Assign the Service

1. On the Configuration home screen, scroll down to Services. 
2. Select the service you created first.
3. Scroll down to Service addresses and click ADD.
4. Enter the Peer IP address and click SAVE.
5. Repeat for the second service you created. 

### Peer List

The Peer list (created as part of the EoSVR config process) consists of peers with the same EoSVR bridge name and network interface IP.  
