---
title: Configuring Ethernet Over Secure Vector Routing
sidebar_label: Configuring Ethernet Over Secure Vector Routing
---

Use the following procedures to configure an SSR network to use Ethernet over SVR (EoSVR). Any network interface can be configured to use Ethernet over SVR. 

:::note
When configuring EoSVR on a STEP-enabled router, it is a best practice to clear all existing sessions so the routers begin using the STEP-based routes. This is especially important for EoSVR configurations, to prevent stuck flows and traffic from being dropped. Use the command `delete sessions service <eosvr-service-name>` to clear sessions.
:::

### Configure an Ethernet over SVR Bridge

1. On the Configuration home screen, select a Router.
2. Scroll down and select a Node.
3. Scroll down to **Device Interfaces** and select the device interface (the LAN interface) that connects to the peer SSR router. 
4. Scroll down to **Network Interfaces**, and select the network interface (the LAN interface) that connects to the peer SSR router.
5. Scroll down to the **Ethernet Over SVR Bridge** tile, and click it. 
	![Ethernet over SVR](/img/config_EthoSVR_tile.png)

6. Enter a name for the bridge. 
7. Set Enabled to true. 
	![Name the Bridge](/img/config_EthoSVR_BridgeS5.png)

	:::note
	Enabling the Encapsulate All switch encapsulates all traffic, including IP traffic. 
	:::

8. In the Peer Info panel, select ADD.
9. Enter LAN IP address of the corresponding peer SSR router where the same bridge name is configured.
	![Peer Info](/img/config_EthoSVR_BridgeS8.png)

10. From the Name drop down, select the Peer router, and click SAVE. 
11. Repeat this process for the Peer router, using the same name for the bridge and adding the appropriate Peer IP address and name. 

### Create a Service For Ethernet over SVR

Use the following procedure to create a service on each router for layer 2 traffic. For IP traffic, use the [Create a Service](intro_basic_conductor_config.md#create-a-service) procedure.

1. On the Configuration home screen, scroll down to **Services** and click ADD.
2. Name the service and click SAVE.
3. Under **Service Applies To**, click New and select router from the drop down. 
4. Click SAVE.
5. In the **Router Name** panel, select ADD.
6. Select the router name from the drop down, and click SAVE.
7. Return to the **Service** panel, and scroll to the **Service Transport** pane.
8. Click ADD, select **UDP** from the drop down, and click SAVE. 
9. In the **Service Transport: UDP** window, under **Port Ranges** click ADD.
10. Set the **Start Port** to 1281 and click SAVE.
11. Return to the Service Panel, and scroll down to the **Service Addresses** panel. 
12. Click ADD, and enter the IP address of the EthOverSVR interface (the LAN interface for the router for which you are currently configuring the service.)
13. Click SAVE.
14. Create another service for the other router - perform the same steps, but in step 6, choose the Peer router.
15. Return to the Configuration home screen.

### Assign the Service Route

1. On the Configuration home screen, select the first router configured for EoSVR.
2. Scroll down to the **Service Route** panel and click ADD.
3. Name the Service Route and click SAVE.
4. Under **Service Route Information**, select the EoSVR service you created prevoiusly.
5. Under **Service Route Type**, select the drop down, scroll down and select **Eosvr Bridge**. 
	![Service Route Type](/img/config_EthoSVR_ASR5.png)

6. In the **To EoSVR Bridge** field, use the drop down to select the EoSVR Bridge you configured earlier. 
	![Service Route Type Next](/img/config_EthoSVR_ASR6.png)

7. Repeat the procedure for the second router configured for EoSVR. 

### Peer List

The Peer list (created as part of the EoSVR config process) consists of peers with the same EoSVR bridge name and network interface IP.  
