---
title: 128T 5.3 Release Notes
sidebar_label: '5.3'
---
:::info
Issues resolved in a release are merged into subsequent releases chronologically AND numerically. 

If you do not see an issue listed below, it may have been resolved in another recently released version. A link to the Release Notes for the most recent chronological release of SSR / 128T Software is provided.

Alternatively, refer to the **[List of Releases](about_releases.md)** page for release dates and links to all SSR / 128T Release Notes; or, if you know the Issue ID Number, enter that into the Search field at the top right of this page. 
:::

## Release 5.3.0
**Release Date:** July 9, 2021

### New Features and Improvements

- **I95-35414 Refresh actions now available for individual sections on the Router Page:** The Device interface, Network Interface, and Peer Paths table sections now can be refreshed independently.
------
- **I95-38244 The Routers Page is easier to Search:** Added a column selector and a search matching system to make the search function more granular. 
------
- **I95-38445 [GUI Session Capture](ts_packet_capture.md#session-capture-in-the-gui):** Added pages to the user interface that allow you to view and configure capture information.  
------
- **I95-39293 and I95-40139 GUI Plugin Details and Commands:** Added pages to the user interface that allow you to [run the commands that are bundled with the installed plugins](plugin_intro.md#installation-and-management). 
------
- **I95-40458 Added the ability to toggle between Advanced and Basic Configuration mode:** Added the option to limit the main configuration screen to the most frequently used fields, or display all configuration options. 
------
- **I95-40532 Added Tenant prefix support on network interface:** This provides a simpler way to configure the tenant prefixes on a per branch basis.

### Resolved Issues

:::info
**IMPORTANT** 

- **I95-39457 ServiceSecurityCheck validator should check for next-peer in service-route:** A missing validation check on `next-peer` service routes allows the configuration to be committed without presenting an error, preventing the establishment of an SVR session. This issue has been resolved in 5.3.0.

	**_To reconcile pre-5.3.0 configurations:_** Manually configure a security policy on each service with a `peer` and `next-peer` service route. 
:::
------
- **I95-19871 Unknown session-type mismatched:** When a session-type does not have a match, the `Unclassified` service-class is used when it is available.**
------
- **I95-34951 Creating a new interface autofills incorrect data:** Resolved an issue where data for an existing interface is autofilled for a new interface. The New Interface screen now displays fields correctly. 
------
- **I95-39713 Access policy object screen has incorrect heading text:** The heading for the access policy setting has been changed to display the correct heading text.
------
- **I95-39954 Conductor Service Generation Service Policy cannot be set:** Resolved a `management-service-generation` validation error. 
------
- **I95-40124 GRE Interface not inherting teneancy from parent:** The GRE Interface now inherts teneancy and neighborhood configuration from parent.
------
- **I95-40144 EoSVR with outbound only sessions showing errors:** Resolved an issue where EoSVR with outbound only sessions may show errors when FPM is turned on, and will not contribute to FPM data.
------
- **I95-40168 `show udp-transform` not providing result details:** The `show udp-tranform` reason field now provides correct details.
------
- **I95-40191 Office365 service failing on bootup:** This issue has been resolved.
------
- **I95-40239 CVE-2021-26937:** This vulnerability has been resolved.
------
- **I95-40241 RHSA-2020:1180:** Resolved RHSA-2020:1180 by deprecating package ImageMagick.
------
- **I95-40242 CESA-2021:0856 advisory:** This vulnerability has been resolved. 
------
- **I95-40298 Local Validation not the default:** When running validate or commit from the PCLI on a Conductor, local validation is now the default instead of distributed validation.
------
- **I95-40304 Allow for duplicate domain names:** When the same domain name appears for multiple categories, the system will preserve the first such entry and ignore the rest.
------
- **I95-40334 `show service-path` shows BGPoSVR for an EoSVR interface:** Resolved the issue where `ethernet-over-svr` routes would be displayed as `bgp-over-svr` in the output. 
------
- **I95-40349 Improve Session Not Found Message:** The message is now more user-friendly. 
------
- **I95-40380 Routers Page facet selector requires a search value:** Removed a condition causing the facets to be ignored when the search bar is empty.
------
- **I95-40407 Conductor CLI complains that it is a managed router:** This issue has been resolved. 
------
- **I95-40429 Unable to make local router changes:** Resolved an issue where any local changes were overwritten immediately, rather than when the configuration on the conductor was committed.
------
- **I95-40435 Loss of HA headend after configuration changes to spoke:** Resoved an issue where configuration changes to traffic-engineering when HA is enabled force the interface into standby mode.
------
- **I95-40460 The Download Quickstart link in Firefox does not download the file:** This issue has been resolved. 
------
- **I95-40473 API Username not being recorded:** Resolved an issue where the `modify_user` event was omitting the `fullName` modified field.
------
- **I95-40489 ISO missing 128T-minion-connector rpm:** The 128T-minion-connector plugin rpm was not included in the 5.1 OTP ISO. This has been corrected in the 128T-5.1.3-1.el7.OTP.v3.x86_64.iso ISO.
------
- **I95-40577 Import certificate webserver not copying the private key:** This issue has been resolved.
------
- **I95-40669 Reverse SSH config file only generated if remote login enabled:** The reverse SSH config file is now generated correctly. 
------
- **I95-40682 GUI login page keeps focus on the last selected element:** The Login page now focuses on the username field after an invalid login.
------
- **I95-40888`show application modules status` generating an unhandled error:** Resolved an issue with `show application modules status` causing unhandled errors.
------
- **I95-41116 Authentication Error after Upgrade:** Resolved an issue where performing an upgrade, then a rollback, then upgrade, blocked validation. 
------
- **I95-41275 Synchronization unable to complete:** Resolved an issue where a previous failure prevents synchronization. 

## Caveats

- **I95-40879 Config validation not enforced before 5.3.0 for "profile must be configured when performance-monitoring is enabled on a neighborhood":** Stricter validations have been added to enforce the requirement that profile must be configured when performance-monitoring is enabled on a neighborhood. This requirement was loosely enforced prior to version 5.3.0 through configuration checks. With the stricter checks in Version 5.3, errors may appear in previously valid configurations. These configurations should be updated immediately after upgrade to ensure correct operation of the redundant interfaces during failover.
------
- **I95-41033 Upgrade to 5.3 results in "Error: Candidate configuration is invalid" global_id issue:** Stricter validations have been added to version 5.3.0. With the stricter checks, errors may appear in previously valid configurations. These configurations should be updated immediately after upgrade to ensure correct operation.
------
- **I95-41058 Upgrade to 5.3 results in "Error: Candidate configuration is invalid: Security not configured":** Stricter validations have been added to version 5.3.0. With the stricter checks, errors may appear in previously valid configurations. These configurations should be updated immediately after upgrade to ensure correct operation.
------
- **I95-41076 Stricter validations have been added to InterfaceRedundancyCheck:** Stricter validations have been added to enforce the requirement that redundant network interface configurations must be identical. This requirement was loosely enforced prior to version 5.3.0 through configuration checks, and allowed invalid configurations to be accepted. With the stricter checks in Version 5.3, errors may appear in previously valid configurations. These configurations should be updated immediately after upgrade to ensure correct operation of the redundant interfaces during failover.
------
- **I95-41265: Committing changes to a configuration during an upgrade is not permitted:** Committing configuration changes is not allowed when the system is in a "mixed version" state, ie: during upgrade. For example, if one node of an HA pair is at 4.5.3 and an upgrade to 5.3.0 has been performed on the other node, do not attempt to commit a configuration change until both nodes are updated to the new release.
------
- **I95-412166 Candidate configuration is not synced between nodes and is not stored on disk:** Configuration changes are made to a “candidate” configuration. In releases prior to 5.3.0 the candidate configuration was stored on disk and would persist through product reboots. Beginning with 5.3.0, the candidate configuration is not saved to disk and will not persistent through reboot. 

Additionally, the candidate configuration is no longer synchronized between HA nodes. In release 5.3.0 only the running configuration is synchronized between nodes.

