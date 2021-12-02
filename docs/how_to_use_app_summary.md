---
title: Using Application Summary
sidebar: Using Application Summary
---

The Application Summary is available for each router that has Application Identification enabled on it. In most cases where an SSR has domain-based URL filtering enabled, Application Identification has also been enabled. 

To enable Application Identification for a router, go to Configuration -> Authority -> [router name] -> Application Identification Settings and set to `true`.

The Application Summary is accessed by selecting a router from the Authority -> Routers list. The Router page displays a table with current Application Summary statistics. Currently, the list  contains names of each application along with total bytes transferred in the last X minutes. Clicking on any area in this table brings you to the App Summary page.

The Application Summary page works similarly to Custom Reports by showing stats across a time range in a chart, but has an additional feature: clicking on any one point in the chart shows the related data **in the adjoined table below**. The currently selected time correlating to this point shows in the top right of the chart.

By default the table shows all Applications, grouped by Category. This can be changed to view only Applications, or view only Clients (which will show the user a reverse view. The other two views are top-down, the Client view is bottom-up, where we map each Application to each unique Client). The user can change this by using the `Pivot By` dropdown next to the rest of the table controls.

The table controls include `Pivot By`, `View By`, and a `Search`. `View By` changes the metric being viewed in the chart - currently it can change between `rx`, `tx`, and `total bytes`. Clicking on the chevron/caret on the left-side of the table expands a collapsed row and showing associated child data (this is not available for Pivot By: Application). Click on the appropriate checkbox (color-coded to match the relevant series in the chart) to hide that series in the chart. You can also change which data is being viewed in the chart by clicking the chart icon in the top-left of the table - this switches the chart to view all parent data in a given Pivot, or only relevant child data related to the parent (for example, all Applications related to a Category).

Application Summary data currently is only viewed on a node-by-node basis - that is, data viewed comes specifically from one node at a time. Use the **Node** dropdown on the top-right of the page to change the node being viewed. 

Clicking a row in the table will populate the Client & Next Hop Information table. This table shows relevant Next Hop information related to a given client under the selected row. You can view all details about a certain client by clicking on the Details button in the first column of the table. This will display further aggregate details about the client, such as TCP Retransmissions, TCP Resets, New/Active/Failed sessions, Traffic Class, and more.

Similar to the Custom Reports functionality, a time selector in the top-right of the page  allows the user to select a time range other than the default (default is 30 minute lookback). Because of strain on the system, the max lookback is limited to 24 hours. If a larger time range is selected, the range will truncate to 24 hours to avoid issues with load times and system strain.


### Default values
(total bytes transferred in the last X minutes default interval is 1 mintue)

#### other stuff cut and pasted here cuz it's important
 (which indicates "Select an application in the table above to view client information" when no row is selected)