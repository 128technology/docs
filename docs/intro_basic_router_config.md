---
title: Basic Router Configuration
sidebar: Basic Router Configuration
---

## Basic Router Configuration

128T Routers can learn routes through traditional means as well as through Secure Vector Routing. You can manually configure static routes into the RIB or you can set your 128T to do BGP Peering. You can also configure your 128T to use Route Filters and Policies to make changes or perform actions on routes based off of rules that you set. 

In this lab, you will configure your 128T to route using BGP. You will connect three 128T Routers to a BGP router that they will learn their routes from. You will then use your 128T to advertise a BGP route to the BGP router. Lastly, you will create some Route Filters and Policies to change the behavior of the learned BGP routes. 

## Configure Branch Router in Conductor

1.	Log in to your assigned Onramp environment and select WEB GUI for Conductor

2.	Username: admin
Password: 128Tadmin

3.	Select Configuration

4.	Create a dallas.corp tenant. 

5.	Go back to the top level and select ADD next to Routers. Name your new router dalbo2 and select SAVE. 

6.	Input +32.7767-096.7970/ for Coordinates and select internal for Inter-node Security Policy. 

7.	Select ADD next to Nodes. Give the node the name of node1 and select SAVE. 

8.	Select the Role of combo for your Node. 

9.	Select ADD next to Device Interfaces and give your Device Interface the name wan1

10.	Select ethernet for Device Interface Type

11.	Enter the PCI address of wan1 under PCI Address

12.	Select ADD next to Network Interfaces and name it wan1. 

13.	Select external for Type. Select internal as your Security Policy. 

14.	Select ADD next to Interface Addresses and put in 2.2.2.128 for the address. 

15.	Give your network interface a Prefix of 24 and a Gateway of 2.2.2.1.  

16.	Go back up to the Network Interface level and select ADD next to Neighborhoods. Select internet. Make sure the Topology is spoke. 

17.	Go back up to the Node level of your configuration. 

18.	Select ADD next to Device Interfaces and give your Device Interface the name lan1

19.	Select ethernet for Device Interface Type

20.	Enter the PCI address of lan1 under PCI Address

21.	Select ADD next to Network Interfaces and name it lan1.  

22.	Select external for Type and assign dallas.corp as the Tenant. 

23.	Select ADD next to Interface Addresses and put in 192.168.64.1 for the address. 

24.	Give your network interface a Prefix of 24. 

25.	Go back up to the dalbo2 Router level and make sure you have all the same Service Routes that you have on the seabo1 Router. 

26.	Go back up to the Authority level and click on the Authority tile. Make sure you have 192.168.7.99 configured as your Conductor Address.

27.	 Select VALIDATE and, if everything seems good, COMMIT. 

The Conductor has now staged your Branch 2 Router. Now we will use OTP to deploy our Router. 


Step 3:	Create QuickStart File

1.	Log in to your assigned Onramp environment and select WEB GUI for Conductor

2.	Username: admin
Password: 128Tadmin

3.	Select Routers select dalbo2

4.	Under the Node section should be a QUICKSTART LINK. If it is not there, refresh the page. Click QUICKSTART LINK.

5.	Copy the Password.

6.	Select the Click here to download the QuickStart file. 


Step 4:	Put QuickStart File on Branch 2 Router

1.	Log in to your assigned Onramp environment and select WEB GUI for Branch 2 Router

2.	Append /quick-start to the URL that appears.

3.	Username: admin
Password: 128Tadmin

4.	Drag and Drop your QuickStart file.

5.	Input your QuickStart Password 

6.	Select PROCEED

Your Router will now be configured and set up to be managed by your Conductor. This process will take a couple of minutes. Once you see Success! you have officially deployed a 128T Router using the OTP method. 

7.	Log in to your Conductor and take a look at the Router menu. You should see that your Dallas Router completed installation. 

You should now have 1 Conductor and 3 Routers deployed. All 3 of your Routers should have a wan1 internet path. 


Step 5:	Verify Connectivity

1.	Log in to Onramp and select OPEN CONSOLE for Branch 2 Client

2.	Open Terminal Emulator and issue the following commands:

$ ping server1
$ ping server2
$ ping server3-dnat

3.	Open any of the Web Services

If you get successful pings and web pages shows up in your browser, then you have connectivity to your webservers and you are now sending traffic using Secure Vector Routing! 

