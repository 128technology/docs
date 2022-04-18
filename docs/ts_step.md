---
title: Troubleshooting STEP
sidebar_label: Troubleshooting STEP
---
## Show Commands

The following show commands provide a view into the STEP functionality.

- `show step lsdb`
```
admin@T197_DUT5.Site5# show step lsdb
Thu 2020-12-17 19:04:42 UTC

Retrieving from 'Site5'...

================== ===============
 District           Originator
================== ===============
 default-district   Site4
 default-district   Site5
 default-district   Datacenter

```
For additional information, see [show step lsdb](cli_reference.md#show-step-lsdb).

- `show step routes`
```
admin@T197_DUT5.Site5# show step routes
Thu 2020-12-17 19:26:56 UTC

Retrieving from 'T197_DUT5.Site5'...

=========== ===================== =============
 Node Name   Service               IP Prefix
=========== ===================== =============
 T197_DUT5   site4-LAN             10.4.0.0/16

```
For additional information, see [show step routes](cli_reference.md#show-step-routes). 

- `show step clients`

To verify that a given router has established connectivity to its repositories, use the `show step clients` command:

```
admin@dut3.Blackall# show step clients
usage: clients [rows <rows>] [<verbosity>]

Show STEP clients

keyword arguments:
rows    The number of items to display at once [type: int or 'all'] (default: 50)

positional arguments:
verbosity    detail | summary (default: summary)


admin@dut3.Blackall# show step clients
Fri 2022-04-15 21:20:46 UTC

================= ================= =========== ================= ============== ================= ========== =================
 Repository        Uptime            Documents   Last Received     Num Received   Last Sent         Num Sent   Num Disconnects
================= ================= =========== ================= ============== ================= ========== =================
 127.0.1.2:15555   0 days 22:29:57   None        0 days  0:00:41           1391   0 days  0:01:23        465                 2
 127.0.1.3:15555   0 days 22:27:15   None        0 days  0:00:41           1393   0 days  0:01:23        465                 1

✔ Retrieving step information...
Completed in 0.46 seconds


admin@dut3.Blackall# show step clients detail
Fri 2022-04-15 21:23:34 UTC

=======================================================
 Information
=======================================================
 Item:
   Last Client Disconnect Time:   2022-04-14T22:48:26Z
   Connected:                     True
   Last Client Connect Time:      2022-04-14T22:50:50Z
   Num Updates Received:          1394
   Num Router Documents:          None
   Num Client Connects:           3
   Num Client Disconnects:        2
   Num Updates Sent:              466
   Last Update Received Time:     2022-04-15T21:23:06Z
   Name:                          Blackall_dut3_Step_0
   Last Update Sent Time:         2022-04-15T21:22:24Z
   Repository:                    127.0.1.2:15555
 Item:
   Last Client Disconnect Time:   2022-04-14T22:51:35Z
   Connected:                     True
   Last Client Connect Time:      2022-04-14T22:53:32Z
   Num Updates Received:          1396
   Num Router Documents:          None
   Num Client Connects:           2
   Num Client Disconnects:        1
   Num Updates Sent:              466
   Last Update Received Time:     2022-04-15T21:23:06Z
   Name:                          Blackall_dut3_Step_1
   Last Update Sent Time:         2022-04-15T21:22:24Z
   Repository:                    127.0.1.3:15555

✔ Retrieving step information...
Completed in 0.06 seconds

```