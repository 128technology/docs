---
title: 128T 5.2 Release Notes
sidebar_label: '5.2'
---

## Release 5.2.0

### New Features and Improvements

- **I95-37296 Native 128T Support for GRE:**
------
- **I95-37459 Show Commands for Services:** The [show fib](cli_reference.md#show-fib) and [show fib lookup](cli_reference.md#show-fib-lookup)commands have been enhanced to provide more granular path-related debugging.
------
- **I95-37510 Change AppId modules to be run as systemd unit:**
------
- **I95-38081 Automatic generation of MSS Value:** The [network-interface configuration object](config_reference_guide.md#network-interface) now has an automatic option for the enforced-mss value. This automatically calculates the MSS of the network interface from the interface session MTU.
-----
- **I95-39336 Best Path Criteria:** The [service-policy](config_reference_guide.md/#service-policy) has been enhanced to include values that allow the the router to select the best path based on the current latency/MoS values of the paths. 
------

- **I95-39580 Reference Candidate Config Values in a Template:** Using a custom tag in Advanced Mode allows you to reference a value from a candidate configuration. For details about using this tag in Advanced Mode, refer to [Pulling Values from the Candidate Configuration](config_templates.md).

### Resolved Issues

- **I95-29583 Default Language Setting:** Changes to the default language are now saved per user, not per system.
------
- **I95-37101 PCLI Updates for `show since` command:**
------
- **I95-38510 Security mismatch on HA nodes dropping internode traffic:**
------
- **I95-39298 STEP Waypoint NAT Support:** When a resolved external NAT address is present in the adjacency configuration, it is used when advertising the peer path in the STEP router document.
------
- **I95-38303 `show application modules` added:** ADD LINK HERE AND SUPPORTING INFO.
------
- **I95-39374 Multi-core Traffic Engineering and Per-Adjacency Traffic Engineering feature interaction:** Resolved an issue where it was possible for a packet on a non-scheduled adjacency to make it into the schedulerGroup when adjacency-only Traffic Engineering was enabled.
------
- **I95-39377 Provide progress while PCLI connects to 128T:** The system now provides progress to prevent users from attempting to use the PCLI before the system is fully operational. 
------
- **I95-39380 Inline performance monitoring causes metadata parsing errors:** Added validation for the presence of performance-monitoring profile when enabled.
------
- **I95-39406 Installer Update/software upgrade dependencies:** Upgrades from the Conductor now require an updated Installer before downloading and installing software to the Router. 
------
- **I95-39483 Validate/Commit And Diff Endpoints Not Filtered by RBAC:** Validate, Commit and diff operations now honor RBAC settings.
------
- **I95-39492 The GUI displays configuration changes "Ready to Commit" when there are no pending config changes:** This issue has been resolved.
------
- **I95-39538 Periodic disruptions in service:** Resolved an issue in the HttpParser for application identification when parsing malformed HTTP traffic.
------








------
- **I95-39587 Duplicate entries in show commands on PCLI when using bulk-edit:** Resolved an issue with the use of bulk-edit in the PCLI.
------
- **I95-39602 Show peer path status under `show peers hostnames`:** Replaced redundant Router column with `Node`, and added a `Status` column.
------
- **I95-39632 Toggling traffic engineering causes power saver to fail:** Resolved an issue that causes power saver to fail on muti-core systems when traffic engineering is toggled. 
------
- **I95-39641 `show device-interface extended-stats` command reported unavailable when the virtio device does not expose extended stats:** Resolved an issue with the show device-interface extended-statistics/registers command.
------
- **I95-39695 Delete Session feature not working:** Resolved an issue with the Session Details dialog.
------
- **I95-39701 Remote router login ignores 'User' selection:** Resolved an issue where a parameter name mismatch caused the current user to be ignored.
------
- **I95-39711 PCLI unhandled error when exporting a config using a name that has already been used.** The PCLI now provides a clear error message describing the issue.
------
- **I95-39764 Per Adjacency Traffic Engineering Crashing For Multiple Paths on Configuration:** Resolved an issue when receiving adjacencies with out of order path-indexes. 
------
- **I95-39782 The aggregate stats pull from highway logs provides more detail than necessary:** Reduced the unnecessary detail. 
------
- **I95-39796 Conductor and Authority missing from GUI on first login:** Added multiple retries to retrieve system data upon first login. 
------



