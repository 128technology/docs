---
title: Using the STEP GUI
sidebar_label: Using the STEP GUI
---

import useBaseUrl from '@docusaurus/useBaseUrl';

#### Version History
| Release | Modification                |
| ------- | --------------------------- |
| 5.6.0   | STEP GUI introduced |

## STEP Configuration

Use the STEP Configuration Settings button on the Configuration Home panel to set basic STEP configuration parameters.

<img src={useBaseUrl('/img/howto_stepgui_config.png')} alt="STEP Configuration Home" width="300" height="200" />

To configure STEP settings from the GUI, enter information into the fields as shown.

![STEP Settings](/img/howto_stepgui_config2.png)

### Add a STEP Repository

Click ADD and enter the IP address of the STEP repository. 

<img src={useBaseUrl('/img/howto_stepgui_config3.png')} alt="New STEP Repo" width="400" height="150" />

Enter the Basic STEP Repository information.

![Basic STEP Repo](/img/howto_stepgui_config4.png)

The default District settings  and Connection Settings are currently tied to default values and not configurable at this time. For information about configuring `step-peer-path-sla-metrics-advertisement` within the district settings, see [Router District Settings.](config_STEP.md#router-district-settings)

## STEP Tables

For a graphical view of the information displayed in the PCLI, use the STEP GUI. Located in the Tools menu on the bottom left of the SSR GUI, clicking STEP and select a router to get a look into the STEP functionality.

![STEP GUI](/img/howto_step_gui1.png)

The tabs across the top of the pane - LSDB, Routes, Client, and Server - display STEP related tables. All tables are configurable; select the columns icon to show / hide columns.

**LSDB Link State Database:** The information the selected router has available for all other routers on the STEP network. There are two views available on this tab; Summary and Detail.

- Summary view: Shows a high level summary of the services for each router known to the router selected in the Router Context (this is the router selected when accessing the STEP GUI). 
    - Click the router in the table to display the peer path details.

- Details view: The Details view on the LSDB tab has two parameters:
The **Router Context** selector on the top left determines what router is being queried for the information.
The **Originating Router** selector determines which router document is shown in the table below. The Originating Router displays the information that is being advertised from that particular router.

![LSDB Details View](/img/howto_step_gui_lsdbDetails.png)

Items in the tables are selectable and will display additional detail screens. 

**Routes:** Displays all service routes for the selected router (Router Context). These routes are computed by the router based on the topology information received from the STEP repository as shown on the LSDB tab.

- Summary view: Shows a high level summary of the service routes known to the router selected in the Router Context. Includes Node Name, Service Name, IP Prefix, number of paths, and the Best Path for each.

- Details view: The Details view  displays information about individual services. Each Service is presented in it's own table as shown below. 

![Routes Detail View](/img/howto_step_gui_routeDetails.png)

**Client:** STEP client details for the selected router. Provides information about the connection to the one or two STEP repositories in the authority. 

![Client View](/img/howto_step_gui_client.png)

**Server:** The server residing on the conductor. Displays the server connections to each router, including session state, and status. Any STEP router documents received by the server can be downloaded from this location as well. 

![Server Details View](/img/howto_step_gui_server.png)
