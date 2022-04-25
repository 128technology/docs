---
title: Using the STEP GUI
sidebar_label: Using the STEP GUI
---
#### Version History
| Release | Modification                |
| ------- | --------------------------- |
| 5.6.0   | STEP GUI introduced |

For a graphical view of the information displayed in the PCLI, use the STEP GUI. Located in the Tools menu on the bottom left of the SSR GUI, clicking STEP provides a look into the STEP functionality.

![STEP GUI](/img/howto_step_gui1.png)

The tabs across the top of the pane - LSDB, Routes, Client, Server, and Documents - display STEP related tables. All tables are configurable; select the columns icon to show / hide columns.

**LSDB Link state database:** The information the current router has available for all other routers on the STEP network. To change routers, select the down arrow under Router Context in the top left corner of the screen. 
- Summary selected: A high level summary of the services for each router that the originating router knows about. 
    - Click the router in the table to display the peer path details.

- Detail selected: Shows detail for the paths and advertised services for the originating router. 
    - Select the Originating Router icon next to Summary and choose a router from the dropdown to see all the local information that the originating router has on the selected router.
    - Select an ID to see peer path details.
    - Selecting a service from the table displays additional details. 

**Routes:** Summary shows a list of the service routes on the selected router. Selecting Details displays the detailed information about each service including the IP address and prefix, the best path indicator, and cost for the route. Sort order is determined by Path group, and then can be defined by the user for secondary sorting.

**Client:** Step client for the selected router

**Server:** The server residing on the conductor. Displays all the router connections to the server. 
