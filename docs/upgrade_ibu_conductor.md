---
title: Image-based Software Upgrade for the Conductor
sidebar_label: Image-based Software Upgrade for the Conductor
---
Image-based installations provide many benefits over the earlier RPM package-based installation/upgrade process, including upgrade speed, stability, efficiency, and ease of use.  This section describes upgrading a Conductor and Conductor-managed routers to the image-based software installation.

Existing deployments using package-based upgrade (PBU) workflows will continue to be supported however for an improved user experience, we recommend adopting the image-based process.

**Can an image-based conductor manage a package-based router?**

## Overview

During the initial conductor upgrade, the SSR software is first upgraded from package-based to a standard, image-based version. Once the initial image-based upgrade (IBU) is complete, a second upgrade to the selected version of the image-based software is initiated. This ensures that the data conversions are consistent, and sets a baseline for the upgrade. All subsequent upgrades are performed from the GUI or PCLI. For large deployments, upgrades can be performed by API's.

- Rollback: Once the SSR has been converted/upgraded to image-based software, rollback is only supported to the previous *image-based* version. Rollback from image-based to package-based is not possible. 
- Once a router has been converted to image-based, the router may not migrate to a conductor running package-based software.
- The minimum supported conductor and managed router starting version for package based conversion and upgrade is 5.1.0. 

### HA Considerations

* If an HA pair is discovered to have a mismatched software state (image-based and package-based) an Alarm is reported. The software state must be the same for both nodes.
* Failure of a router to complete the conversion generates a user visible event and records the reasons for the failure on the conductor.
* Router conversion success generates an event recording the transition on the conductor.
* The image-based and package-based status is visible in the `asset-status` in the GUI, and in the PCLI using `show assets`.

#### Plugin Support

The conversion/upgrade process preserves the currently installed plugin packages. In cases where the plugin has version dependencies, the plugin is upgraded. 
