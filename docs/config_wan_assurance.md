---
title: Configuring WAN Assurance
sidebar_label: Configuring WAN Assurance
---

The process defined in this document can be used to onboard 128T SSR’s to the MIST cloud. Since 128T can run on any certified hardware or virtual machine, this process relies on an on-premise conductor to assist in the onboarding. 

Configuring WAN Assurance requires Administrator level priviledges on all platforms, SSR/128T and MIST. 

High Level Steps:
Install the MIST WAN Assurance Plugin on the Conductor
create an account on the MIST portal.
Create Sites


## Enable WAN Assurance on the Conductor

1. Install the Mist WAN Assurance plugin onto the Conductor. Use the plugin workflow from the GUI (process link here); or run the following command from the PCLI:
2. `admin@node1.conductor1# manage plugin install 128T-mist-wan-assurance latest`
3. Restart the conductor.


Conductor On-boarding instructions

1. Create an account on the [MIST portal](https://integration.mistsys.com/). **Does the user do this or is this and Admin function? What kind of account?**

2. Create an organization for the authority and sites per physical location for on-boarding 128T SSRs. **(Is this done on the SSR/128T system or is this part of the MIST Portal Config?)**

Log in to the MIST portal as the Administrator to access the registration code for the organization. This allows additional on-boarding of 128T routers from the conductor. 

* Go to the following location on the MIST portal
	Gateways > Inventory > Adopt Gateways > Session Smart Router (SSR)
There has to be another step in here. 

* Click on “Copy to Clipboard”  
* Login to the conductor PCLI as admin user and paste the snippet there 
    
    
```
    admin@node1.conductor1# configure authority mist-wan-assurance registration-code eyJ0eX
    AiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmdfaWQiOiIwYzE2MGI3Zi0xMDI3LTRjZDEtOTIzYi03NDQ1MzRj
    NGIwNzAiLCJzdmMiOiIxMjhyb3V0ZXIiLCJwcm92aWRlciI6ImF3cyIsImVudiI6InN0YWdpbmciLCJlcHRlcm1
    fdXJsIjoid3NzOi8vZXAtdGVybWluYXRvci1zdGFnaW5nLm1pc3RzeXMubmV0L3dzIiwiaWF0IjoxNjIyNzQ2MT
    c1LCJleHAiOjE2NTQyODIxNzV9.iDobxHQzKZkJyTd98jUoVFZrZet7ElvPQdsCdDFfAN0
    admin@node1.conductor1#
    *admin@node1.conductor1#
    *admin@node1.conductor1#
    *admin@node1.conductor1# compare config running candidate
    
    config
    
        authority
    
            mist-wan-assurance
                registration-code  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmdfaWQiOiIwYzE2MGI3Zi0xMDI3LTRjZDEtOTIzYi03NDQ1MzRjNGIwNzAiLCJzdmMiOiIxMjhyb3V0ZXIiLCJwcm92aWRlciI6ImF3cyIsImVudiI6InN0YWdpbmciLCJlcHRlcm1fdXJsIjoid3NzOi8vZXAtdGVybWluYXRvci1zdGFnaW5nLm1pc3RzeXMubmV0L3dzIiwiaWF0IjoxNjIyNzQ2MTc1LCJleHAiOjE2NTQyODIxNzV9.iDobxHQzKZkJyTd98jUoVFZrZet7ElvPQdsCdDFfAN0
            exit
        exit
    exit
    
    *admin@node1.conductor1#
    
```
NOTE: In order to use the GUI workflow, simply copy the text after registration-code and configure the value (paste the text?) under Configuration > Authority > Mist WAN Assurance > Registration Code.

IMPORTANT: The default mode of operation is to enable WAN Assurance on all connected routers. If this is not desired please refer to the Skipping specific routers section.

IMPORTANT: Please ensure the assets are in the running state before performing this operation. Once committed, the installation and enablement process can take anywhere for 5 to 30 minutes to complete.

Once satisfied with the configuration proceed to commit from the PCLI or GUI. 

### Skipping specific routers

If some routers need to be skipped from the MIST on-boarding, they can opt out of the process. To do so, change the authority > router > mist-wan-assurance > enabled to false and the conductor will skip over all the nodes (in case of HA) for that router. 

If the system was previously on-boarded, the configuration will work to stop sending the telemetry data to the cloud. (this statement seems disjointed; need more information about this)

:::note
This setting will not automatically release the router from the cloud. The instructions to do that are in the Releasing a router section.
:::

### On-boarding routers

Registration (automatic)

Once a valid registration code is committed, the conductor sends instructions to all the connected routers to self-onboard to the MIST cloud. The routers go through an automated process and do not require any user interaction.

* Conductor transfers the registration-code and installs the necessary software on each connected router 
* Each router connects/reaches out to the pre-determined MIST terminator (as dictated by the registration-code) and presents unique identifying information to the cloud 
* When the MIST cloud completes the on-boarding, it will provide the router with a unique identification and new keys to send additional telemetry information. ***each router is provided with a unique ID, and new keys for additional telemetry information.*** (is the router using the new keys to send the telemetry info to the MIST cloud? Or is the MIST cloud providing new keys that some other device uses to send additional telemetry info?What are these new keys, who gets them, who uses them, what is the telemetry info, who is sending and receiving?)  

## Creating Site Assignments (MIST) **Creating a Site**

The **Site** is a key concept for MIST Assurance features. Some general recommendations for creating sites are:
* Create a unique site for each physical (or logical) location in the network. For example, the spoke and hub should be onboarded to different sites. 
* Other devices from the Juniper stack such as MIST APs, Switches, SRX, etc., should be onboarded and assigned to the same site as SSR when possible. This is important because it provides a clean topology view of all devices running within a site. 
Issue: There is no information about how to create a Site in this doc (or I haven’t found it yet). But it is made clear how important the concept of a site is. I need information about how to create a site, or how a site is created if it is done automatically. 

### Site Assignment (MIST)

Once the automatic (onboarding) process above is complete, each router is displayed on the MIST inventory under Gateway > Inventory. The router is listed as Unassigned, and the name of the router can be used to identify and assign the router to the appropriate site. 

**The router name often identifies the appropriate site for assigning the router.** or simply **Assign the router to the appropriate site. Often the router name indicates the appropriate site.**
￼
### Site assignment workflow: 

* Select the Unassigned router 
* Click on the More drop-down on the upper right corner

* Select Assign to Site 
* Select the site in the drop down (NOTE: The site needs to be already created as there is no option to create a site in the drop down) 
* Click on Assign to Site 

Once the site assignment is completed, the information is relayed back to the corresponding 128T router, and the router begins streaming the telemetry data to the cloud.

## New WAN Assurance features (128T)

### Topology Mapping

The 128T Router can be configured to receive LLDP packets from LAN interfaces. This information is useful for creating a local site level topology view as shown below (where is the site level topology shown?) Use the following code example to enable the LLDP receive mode on LAN interfaces.

configure authority router <router> node <node> device-interface <lan-intf> lldp mode receive-only

### Gateway Insights

Once on-boarding is complete, the router begins streaming telemetry data. Data appears on the MIST portal after approximately 15 minutes.  The Gateway Insights page provides a good starting point for viewing the analytics being streamed to the cloud.

### Application Insights & SLE

To provide insights into the application, services, and some SLE functionality, enable `session-record`. It is recommended to enable session records for all the 128T services to provide a broad look at the application use. 

1    authority
2        service             internet
3            name            internet
4
5            session-record
6                profile  profile1
7            exit
8        exit
9
10       session-record-profile     profile1
11            name                   profile1
12            include-modify-record  true
13
14            intermediate-records
15                enabled  true
16            exit
17        exit

## Moving a router
There are two steps to moving a router; releasing and re-onboarding. 

### Releasing a router

If the device needs to be removed from the organization, or released for other reasons, use the following process. 
1. On the MIST UI

* Go to Gateways > Inventory > Select the router 
* Click on More and select Release 
* Click on Release to confirm the final step 
2. On the 128T conductor

After a few minutes the router will be released and stop sending the data to the MIST cloud. Once that process is completed,  disable the router by following the instructions here.

**going to need this to be explained; the link takes me back to onboarding, not anything related to disabling.**

### Re-Onboarding a router

To re-onboard a router without doing a full ISO re-initialization, the additional steps needs to be taken in order to unrelease the router and trigger the on-boarding process again. 

From the conductor shell:

`release mist agent router <router> node <node>`

In the GUI:

1. In the Tools menu, select Plugin Commands

2. In the Plugin Commands pane, select the plugin command (top right corner) **release mist agent**.

3. Set the router context: select the router and node from the drop down lists.

4. Click **Execute**.



￼￼
