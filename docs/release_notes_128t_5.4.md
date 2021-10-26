---
title: SSR 5.4 Release Notes
sidebar_label: '5.4'
---
:::info
Issues resolved in a release are merged into subsequent releases chronologically AND numerically. 

If you do not see an issue listed below, it may have been resolved in another recently released version. A link to the Release Notes for the most recent chronological release of SSR / 128T Software is provided.

Alternatively, refer to the **[List of Releases](about_releases.md)** page for release dates and links to all SSR / 128T Release Notes; or, if you know the Issue ID Number, enter that into the Search field at the top right of this page. 
:::

## Upgrade Considerations

**Before upgrading please review the [Upgrade Considerations](intro_upgrade_considerations.md) page. Several modifications have been made to the process for verifying configurations, which will impact existing configurations.**
------
- **I95-42452 Conductor Upgrade Time:** Upgrades to version 5.4 can take up to 40 minutes due to the number of rpms being upgraded. Please plan accordingly.
------
- **I95-42624 Upgrade Installer:** Before **upgrading** to version 5.4, update the Installer version for the software to Installer version 3.1.0. Failing to upgrade the installer may result in a rollback failure, should a rollback be necessary at any time. 

## Release 5.4.0

**Release Date:** November 3, 2021

### New Features and Improvements

- **I95-17275 Single Flow DSCP Packet Steering:**
------
- **I95-24970 New Feature List:**
------
- **I95-25600 Updates to `show-tech-support-info`:**
------
- **I95-26074 Enable Session View:** Added a 'Find Associated Paths' button to each session, which shows another modal listing the relevant routers.
------
- **I95-26311 Added Debug and Logs links to Tools Menu:** To provide easy access to these valuable tools, links have been added to the Tools menu on the main page.
------
- **I95-31358 VRRP Interface Redundancy:**
------
- **I95-35131 Description Field for static DHCP Pool Assignment:** A description field has been added for static DHCP pool assignment.
------
- **I95-35180 SSH Re-key Support:** The ability to rekey the interval on ssh sessions has been added.
------
- **I95-35568 (This has already been implemented, hasn't it?) Configurable login banner for CLI/GUI.**
------
- **I95-35570 Limit Private Web and SSH access:** 
------
- **I95-35654 Improved Upgrade Workflow (GUI):** Added `Select Operation` to the router upgrade workflow, allowing users to see which versions are available based on the desired operation (either Download or Upgrade).
------
- **I95-40192 Chinese GUI is now supported:**
------
- **I95-40436 Updated Application ID Domain Data:** Updates to the built in domain data
------
- **I95-40558 OSPF `show` commands:** Several new `show ospf` and `show ospf database` commands have been added. 
------ 
- **I95-40679 Show DPU command pagination:** Pagination has been added to the `show dpu` command to better present the volume of information.
------
- **I95-41016 WAN Assurance:** 
------
- **I95-41093 Show Commit time:** The GUI now displays the time of the last commit operation.
------
- **I95-41418 User Mode accessible from the PCLI:** The `edit user mode` command is now availble in the PCLI. This command sets the configuration mode for both the PCLI and GUI. Setting this field to `advanced` allows the user to view and configure fields that are normally hidden. 
------
- **I95-41457 VRF Learning via OSPF:** VRF can now learn via OSPF as well as BGP. For more information, see [VRF Learning.](config_vrf_learning.md)
------
- **I95-41724 Software Versions provided in Dropdown:**
------
- **I95-42107 User defined Help for Templates:** When defining templates, adminstrators can provide help text for the template that will display for the user completing the templated configuration. For more information, see [Adding Help for a Template.](config_templates.md/#adding-help-for-a-template)
------
- **I95-42278 Template filters for use with Subnets:** Filters have been added for use with CIDR formatting. 
------
- **I95-42445 Upload Template Schema:** The ability to upload template schema through an API using the GUI. For additional information see [Configuring Templates.](config_templates.md)
------







