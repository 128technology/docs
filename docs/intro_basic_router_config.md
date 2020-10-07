---
title: Basic Router Configuration
sidebar: Basic Router Configuration
---

## Basic Router Configuration

128T Routers learn routes through Secure Vector Routing as well as through more traditional means. Static routes can be manually configured, or you can set the 128T to perform BGP Peering. Additionally, the 128T can be configured to use Route Filters and Policies to perform actions on routes. The steps below generate a basic router configuration on the conductor. This configuration becomes part of the quickstart file that is generated and automatically pulled into the Bootstrap process after the Router installation. 

## Configure a Router from the Conductor
Using the Conductor, the following procedures guide you through a basic router configuration. The names and IP addresses used here are for example only, to provide continutity in the sample process. 

### Create the Router
1.	Log in to the Conductor GUI.
2.	Select Configuration.
3.	In the Routers list, select ADD. 
4.	Name the new router _dallasbr2_ and select SAVE. 
	- Input the location coordinates: +32.7767-096.7970/. 
	- Select **internal** for Inter-node Security Policy. 

### Create the WAN Interface 
1.	Scroll down to Nodes and select ADD next to Nodes. 
	- Name the node, _node1_;select SAVE. 
	- Select the Role of **Combo** for the node. 
2.	Scroll down and select ADD next to Device Interfaces. 
	- Name the Device Interface _wan1_; select SAVE.
	- Select **Ethernet** for Device Interface Type.
	- Enter the PCI address, _wan1_ under PCI Address.
3.	Scroll down to Network Interfaces; select ADD. 
	- Name it _wan1_ and select SAVE. 
	- Select **external** for Type. 
	- Set **internal** as the Security Policy. 
4.	Scroll down to Interface Addresses; select ADD. 
	- Enter 2.2.2.128 for the address; select SAVE. 
	- Give the network interface a Prefix of 24. 
	- Assign a Gateway of 2.2.2.1.  
5.	Return to the Network Interface level (up one level).
	- Scroll down to Neighborhoods; select ADD. 
	- Select **internet** and SAVE.
	- Under Basic Information, verify the Topology is **Spoke**. 

### Configure the LAN Interface	
1.	Return to the Node level of the configuration (up three levels). 
2.	Scroll down to Device Interfaces; select ADD. 
	- Name the Device Interface _lan1_.
	- Select **Ethernet** for Device Interface Type
	- Enter the PCI address of _lan1_ under PCI Address
3.	Scroll down to Network Interfaces; select ADD. 
	- Name the interface _lan1_.  
	- Select **External** for Type. 
	- Assign dallas.corp as the Tenant. 
4.	Scroll down to Interface Addresses; select ADD. 
	- Enter the address 192.168.64.1. 
	- Give the network interface a Prefix of 24. 

### Verify and Commit the Configuration
1.	Return to the dallasbr2 Router level (up four levels).
2. 	Scroll down to the Service Routes and verify the Service Routes that you have on the router.
3.	Return to the Authority level (up one level) and click on the Authority tile. 
4.	Verify that there is a configured Conductor Address.
5.	Select VALIDATE. When the validation passes, select COMMIT. 

The Conductor has now staged your Router. Next we will use OTP to deploy the Router. 

