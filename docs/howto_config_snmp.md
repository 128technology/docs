---
title: SNMP - Configuration 
sidebar_label: SNMP - Configuration
---
## Overview

The following are the high level steps for configuring SNMP. Each procedure is broken out below. 

- Configure KNI Interface at both hub and spoke SSRs

- Enable SNMP Server in Router System Settings at both hub and spoke SSRs

- Configure Global Services: snmp (polling) and snmp-trap
	- A unique Service for snmp polling for every hub and spoke SSR
	- One common Service snmp-trap 

- Configure Service Routes at both hub and spoke SSRs

## Configuration

The procedures below use the GUI to create the configuration, and assume the following:

- The SNMP Manager is located behind the hub SSR
- Both spoke and hub SSRs are not located behind any firewall or NAT devices

### Configure the KNI Interface

1. From the Authority, navigate to the Router > Node > Device Interface.

2. Under the Device Interface, click ADD.

![Add Device Interface](/img/howto_config_snmp1.png)

3. In the New Device Interface pane, enter a name for the device interface.

![New Device Interface](/img/howto_config_snmp2.png)

4. Set the Device interface type as Host. 

![Device Interface Type](/img/howto_config_snmp3.png)

*(Host, then what? Forwarding? Identifier? KNI namespace? If not setting anything, why?)*

5. Scroll down to Network Interfaces. Click on ADD to add a new network interface for the SNMP device interface.

![Add Network Interface](/img/howto_config_snmp4.png)

6. Enter `snmp` as the name of the network interface and click SAVE.

![New Network Interface](/img/howto_config_snmp5.png)

7. Under Management Traffic Settings, define a dedicated management vector. 
- enter the name 
- set the priority to 100
- enable a default route 

*(why are no other Basic Information settings configured?)* 

![Management Traffic Settings](/img/howto_config_snmp6.png)

8. Scroll down to Interface Addresses, click ADD and enter the IP address of the Network interface and click SAVE.

![New Network Interface IP Address](/img/howto_config_snmp8.png)

9. Configure the KNI IP subnet. Every SSR running SNMP must be configured with a unique, routable IP subnet. Choosing /30 maximizes the number of subnets in a chosen IP block. 

![IP Subnet](/img/howto_config_snmp9.png)

**Please provide additional information on the following. I do not understand the context of these comments in the How To Configure SNMP powerpoint** 

*The gateway IP is the IP of an interface to be created by the SSR at the Linux level in step 2.4 upon Validate + Commit.* 

*This GW IP is also the IP that should be used to poll at the SNMP Manager, not the SSR snmp interface IP.*

10. Under Host Services, click ADD.

11. Under Service Type, select snmp-server.

![New Host Service](/img/howto_config_snmp10.png)

12. Under Access Policies, click add, and enter the IP address for the SNMP manager.

![Access Policy IP](/img/howto_config_snmp11.png)

### Configure Router System Settings

Return to the Router level, and scroll down to the Router Settings.
1. Click the System Settings button.
2. Scroll down to the SNMP Server Settings and Enable the SNMP Server.

![SNMP Server Settings](/img/howto_config_snmp12.png)

3. Under SNMP Notification Receivers, click ADD, enter the IP address of the SNMP Manager, and set the Notification Type to **trap**.

![Notifictation Receiver](/img/howto_config_snmp14.png)

4. Return to the router system settings, scroll down to the SNMP Access Control Policies and click ADD.
5. Enter the `management` as the new Access Control Policy name and click SAVE. 

![New Access Control Policy](/img/howto_config_snmp15.png)

6. In the SNMP Access Control Policies pane, enter the Permitted Client Host IP address. 
![SNMP Access Control Policy](/img/howto_config_snmp15-1.png)

7. Click Validate, then Commit.

A new interface is created at the Linux level bearing the same name and gateway IP of the snmp interface created earlier. The gateway IP is the address that the SNMP Manager will be polling.

### Configure Global Services

At the Authority Level, scroll down to Services, and click ADD.
1. Enter a name for the new service; in this case, the service name is snmp-(name of the SSR). Create a service for each SSR. This service is used for polling of individual SSRs.

![New Polling Service](/img/howto_config_snmp16.png)

2. In the Basic Information panel, verify that the Share Service Routes toggle is set to true (default).

![Share Service Routes](/img/howto_config_snmp16-1.png)

3.  Scroll down to Policies, and set the Security Policy to **internal**. (No Service Policy?)

![Security Policy](/img/howto_config_snmp16-2.png)

4. Scroll back up to Service Addresses and enter the KNI Subnet for the SSR configured in step 9 of the KNI Interface process.

![KNI Subnet](/img/howto_config_snmp16-3.png)

#### Configure the SNMP-trap

Return to the Authority level, scroll down to Services, and click ADD.
1. Name the service **snmp-trap**. This service is used for traps from all SSRs.
2. In the Basic Information panel, verify that the Share Service Routes toggle is set to true (default).

3.  Scroll down to Policies, and set the Security Policy to **internal**. (No Service Policy?)

4. Scroll back up to Service Addresses and enter the IP address of the SNMP manager.

5. Click Validate, then Commit. 


### Configure the SNMP Service Routes

The SNMP Service routes are used for polling each SSR by the SNMP manager.

#### SNMP Service Route

1. Authority > Router > Service Routes
2. From the Authority level, select the router.
3. Scroll down to Service Routes and click ADD.
4. Enter the New Service Route name; `snmp` and click SAVE.
5. In the Service route Information pane, choose the `snmp` service route created earlier.
6. Under Service Route Type, select Use Learned Routes from the drop down.
7. Click Validate, then Commit.

Return to the Router level, and select the hub SSR. You can see the service route is automatically generated at the hub where the SNMP Manager lives.

#### SNMP-trap Serivce Route

1. From the Router level, and select Service Routes.
2. Click ADD.
3. Enter a new Service Route name, `snmp-trap` and click SAVE.
4. In the Service route Information pane, choose the `snmp-trap` service route created earlier.
5. Under Service Route Type, select Use Learned Routes from the drop down.
6. Click Validate, then Commit.

Return to the Router level, and select the Spoke SSR. You can see the service route is automatically generated where the snmp traps are generated.


