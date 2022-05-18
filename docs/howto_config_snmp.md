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
2. In the New Device Interface pane, Add the device interface.

3. Identify the Device interface type. (Host, then what? Identifier? KNI namespace?)

4. Scroll down to Network Interfaces. Click on ADD to add a new network interface for the SNMP device interface.

5. Under Management Traffic Settings, configure a vector name, priority, and default route. 

6. Configure the KNI IP subnet. Every SSR running SNMP must be configured with a unique, routable IP subnet. Choosing /30 will maximize the number of such subnets in a chosen IP block. 

The gateway IP is the IP of an interface to be created by the SSR at the Linux level in step 2.4 upon Validate + Commit as documented here: 

This GW IP is also the IP that should be used to poll at the SNMP Manager, not the SSR snmp interface IP.




