---
title: SNMP - Configuration 
sidebar_label: SNMP - Configuration
---

To configure SNMP on the SSR, the following are the high level steps.


- Configure KNI Interface at both hub and spoke SSRs

- Enable SNMP Server in Router System Settings at both hub and spoke SSRs

- Configure Global Services: snmp (polling) and snmp-trap
	- A unique Service for snmp polling for every hub and spoke SSR
	- One common Service snmp-trap 

- Configure Service Routes at both hub and spoke SSRs

The procedure documented below uses the GUI to create the configuration, and assumes the following:

- SNMP Manager is located behind hub SSR
- Both spoke and hub SSRs are not located behind any firewall or NAT devices

### Configure the KNI Interface

Router > Node > Device Interface

1. Under the Device Interface, click ADD.

2. In the New Device Interface pane, enter a name for the device interface.

3. Set the Device interface type as Host. (Host, then what? Forwarding? Identifier? KNI namespace? If not setting anything, why?)

4. Scroll down to Network Interfaces. Click on ADD to add a new network interface for the SNMP device interface.

5. Under Management Traffic Settings, configure a vector name, set the priority to 100, and enable a default route. (why are no other Basic Information settings configured?) Note: Broadband is used for simplicity - defining a dedicated management vector is recommended. (this should be changed to define that dedicated management vector, since this procedure assumes Production)

6. Scroll down to Interface Addresses. 

7. Click ADD. 

8. Enter the IP address of the Network interface and click SAVE.
9. Configure the KNI IP subnet. Every SSR running SNMP must be configured with a unique, routable IP subnet. Choosing /30 maximizes the number of subnets in a chosen IP block. 

**The gateway IP is the IP of an interface to be created by the SSR at the Linux level in step 2.4 upon Validate + Commit. 

:::note
This GW IP is also the IP that should be used to poll at the SNMP Manager, not the SSR snmp interface IP.
:::

10. Under Host Services, click ADD.

11. Under Service Type, select snmp-server.

12. Under Access Policies, click add and enter the IP address for the SNMP manager.

### Configure Router System Settings

Return to the Router level, and scroll down to the Router Settings.
1. Click the System Settings button.
2. Scroll down to the SNMP Server Settings and Enable the SNMP Server.
3. Under SNMP Notification Receivers, click add and enter the IP address of the SNMP Manager and set the Notification Type to **trap**.
4. Return to (go up) the router system settings, and scroll to the SNMP Access Control Policies and click ADD.
5. Enter the new Access Control Policy name and click SAVE. 
6. In the SNMP Access Control Policies pane, enter the Permitted Client Host IP address. 
7. Click Validate, then Commit.
After Validate + Commit, you will see a new interface created at the Linux level bearing the same name and GW IP of the snmp interface created at SSR earlier. This GW IP is the IP that the SNMP Manager will be polling.

### Configure Global Services

At the Authority Level, scroll down to Services, and click ADD.
1. Enter a name for the new service; in this case, the service name is snmp-(name of the SSR). Create a service for each SSR. This service is used for polling of individual SSRs.

2. In the Basic Information panel, verify that the Share Service Routes toggle is set to true (default).

3.  Scroll down to Policies, and set the Security Policy to **internal**. (No Service Policy?)

4. Scroll back up to Service Addresses and enter the KNI Subnet for the SSR configured in step 9 of the KNI Interface process.

#### Configure the SNMP-trap

Return to the Authority level, scroll down to Services, and click ADD.
1. Name the service **snmp-trap**. This service is used for traps from all SSRs.
2. In the Basic Information panel, verify that the Share Service Routes toggle is set to true (default).

3.  Scroll down to Policies, and set the Security Policy to **internal**. (No Service Policy?)

4. Scroll back up to Service Addresses and enter the IP address of the SNMP manager.

5. Click Validate, then Commit. 


## Configure the SNMP Service Route

The SNMP Service route is used for polling each SSR by the SNMP manager.

Authority > Router > Service Routes
From the Authority level, select the router.
Scroll down to Service Routes and click ADD.
Enter the New Service Route name; `snmp` and click SAVE.
In the Service route Information pane, choose the snmp service route created earlier.
Under 



