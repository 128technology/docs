---
title: Basic Router Configuration
sidebar: Basic Router Configuration
---
The steps below generate a basic router configuration on the conductor. This configuration becomes part of the quickstart file that is generated and automatically pulled into the Bootstrap process after the Router installation. 

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
	- Name the node, _node1_; select SAVE. 
	- Select the Role of **Combo** for the node. 
2.	Scroll down and select ADD next to Device Interfaces. 
	- Name the Device Interface _wan1_; select SAVE.
	- Select **Ethernet** for Device Interface Type.
	- Enter the PCI address of the interface to be used as the WAN interface under PCI Address. To identify the PCI Address, refer to [Identify Interface PCI Addresses](intro_system_reqs.md#identify-interface-pci-addresses).
3.	Scroll down to Network Interfaces; select ADD. 
	- Name it _wan1_ and select SAVE. 
	- Select **external** for Type. 
4.	Scroll down to Interface Addresses; select ADD. 
	- Enter 2.2.2.128 for the address; select SAVE. 
	- Give the network interface a Prefix of 24. 
	- Assign a Gateway using your network gateway address.  
5.	Return to the Network Interface level (up one level).
	- Scroll down to Neighborhoods; select ADD. 
	- Select **internet** and SAVE.
	- Under Basic Information, verify the Topology is **Spoke**. 

### Configure the LAN Interface	
1.	Return to the Node level of the configuration (up three levels). 
2.	Scroll down to Device Interfaces; select ADD. 
	- Name the Device Interface _lan1_.
	- Select **Ethernet** for Device Interface Type.
	- Enter the PCI address of the interface to be used as the LAN interface under PCI Address. To identify the PCI Address, refer to [Identify Interface PCI Addresses](intro_system_reqs.md#identify-interface-pci-addresses).
3.	Scroll down to Network Interfaces; select ADD. 
	- Name the interface _lan1_.  
	- Select **External** for Type. 
	- Assign _corp_ as the Tenant. 
4.	Scroll down to Interface Addresses; select ADD. 
	- Enter the address 192.168.64.1. 
	- Give the network interface a Prefix of 24. 

### Create a Service Route
1.	Return to the Router level (up four levels).
2.	Scroll down to Service Routes and select ADD.
	- Name the Service Route _internet-route_ and select ADD.
 	- Select **internet** as the Service Name.
 	- Under Service Route Type, select **Service Agent**.
3.	Scroll down to Next Hop and select ADD.
	- Select _node1_ as the Node.
	- Select _wan1_ for the Network Interface.
	- Select Save. 
4.	Return to the Authority level (up three levels).
	- Scroll down to Services, and select _internet_.
	- Scroll down to security Policies and select _internal_.

### Verify and Commit the Configuration
1.	In the Routers list, select the _dallasbr2_ router.
2.	Return to the Authority level (up one level) and click on the Authority tile. 
3.	Verify that there is a configured Conductor Address.
4.	Select VALIDATE. When the validation passes, select COMMIT. 

The Conductor has now staged your Router. Next, we will use OTP to deploy the Router. 

