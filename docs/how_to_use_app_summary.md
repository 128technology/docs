---
title: Using Application Summary
sidebar: Using Application Summary
---
The Application Summary is available for each router with Application Identification enabled. In cases where an SSR has [domain-based filtering](config_domain-based_web_filtering.md) enabled, Application Identification is also enabled. 

To manually enable Application Identification for a router, go to Configuration -> Authority -> [router name] -> Application Identification Settings and set to `true`.

![Application ID Summary Enabled](/img/app_summary_enabled.png)

The Application Summary is accessed from the Router page in the GUI. Select a router from the Authority -> Routers list. In the panel across the top of the page, the Applications Seen panel displays a list with the names of each application and total bytes transferred in the last X minutes. Click on this table or the Applications Seen selection on the right side of the top panel.

The Application Summary panel is displayed below the router chart when a point in the graph is selected. The selected time is shown at the top right of the chart.

![Application Summary](/img/app_summary.png)

By default the table shows all Applications, grouped by Category. To view Applications or Clients, use the `Pivot By` dropdown. The table controls include `Search`, `View By`, and `Pivot By`. 

Search is typically used to locate specific applications or clients when the list is extensive. 
View By options include: Bytes Recieved, Bytes Sent, Total Bytes.
Pivot By: Application, Category, Clients.

Clicking on the down arrow on the left-side of the table expands collapsed rows, showing associated child data when available. Click on the appropriate color coded checkbox to hide the series in the chart. You can also change the data is being viewed by clicking the chart icon in the top-left of the table. This switches the chart to view all parent data in a given Pivot, or only relevant child data related to the parent (for example, all Applications related to a Category).

Application Summary data is viewed on a node-by-node basis; data is displayed one node at a time. Use the **Node** dropdown on the top-right of the page to change the node being viewed. 

Clicking a row in the table populates the **Client & Next Hop Information** table. This table shows Next Hop information related to a client directly under the selected row. To view all details about a client, click on the **Details** button in the first column of the table. 

Similar to the Custom Reports functionality, a time selector in the top-right of the page  allows you to select a time range (default is 30 minute lookback). To minimize load time and strain on the system, the max lookback is limited to 24 hours.

