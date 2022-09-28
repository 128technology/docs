---
title: WAN Assurance Features
sidebar_label: Features
---

The following are some of the features available with WAN Assurance Telemetry.

### WAN Edge Insights

Once onboarding is complete, the router begins streaming telemetry data. Data appears on the Mist portal after approximately 15 minutes. The WAN Edge Insights page provides a good starting point for viewing the analytics being streamed to the cloud.

To view the events and activity on the fully onboarded device:

- Select WAN Edges from the sidebar. 
- From the Site dropdown, choose the site where the SSR is assigned, and select the SSR.
    
    ![Site Dropdown](/img/wan_site_assign5a.png)

- From the Site panel, choose WAN Edge Insights. 
    
    ![Link to WAN Edge Insights](/img/wan_site_assign5b.png)

    ![WAN Edge Insights](/img/wan_site_assign5.png)


### Topology Mapping

The SSR can be configured to receive LLDP packets from LAN interfaces. This information is useful for creating a local site level topology view. Use the following code example to enable the LLDP receive mode on LAN interfaces.

`configure authority router <router> node <node> device-interface <lan-intf> lldp mode receive-only`

### Application Insights & SLE

To provide insights into the application, services, and some SLE functionality, enable `session-record` on the SSR. It is recommended to enable session records for all the SSR services to provide a broad look at the application use.
```
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
```
Additionally, configuring `application-identification` to `mode all` populates the Application Summary in the SSR GUI. Applications are grouped by Category or Clients, and can be further refined by using the following **view by** options: Bytes Recieved, Bytes Sent, Total Bytes.

![Application Summary](/img/app_summary.png)

For more information, see [Using Application Summary.](how_to_use_app_summary.md)
