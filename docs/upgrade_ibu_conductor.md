---
title: Upgrading the Conductor
sidebar_label: Upgrading the Conductor
---

SSR software version 6.3.0 and newer allows a Conductor to manage routers running image-based software, manage routers running older, package-based software, and initiate image-based upgrades to those routers.

Image-based installations provide many benefits over the earlier RPM package-based installation/upgrade process, including upgrade speed, stability, efficiency, and ease of use. This section describes the process for upgrading a Conductor, allowing it to manage both package-based and image-based routers.

:::note
Before upgrading a conductor, it is recommended to [export the running configuration](config_basics.md#importexport).

For systems with both primary and secondary conductors, it is a best practice to upgrade only one conductor at a time. 
:::

**7.0.1 Conductor Upgrades**

If you are upgrading a conductor that is currently installed with version 6.3.4 or lower, and you wish to upgrade to version 7.0.1 or higher, you must first upgrade the conductor to any version of the 6.3.x software, including and higher than 6.3.5. 

Routers running SSR software versions earlier than 6.3.5 cannot connect to conductors running SSR software version 7.0.1 and higher. A transitional step is required to enable routers running versions earlier than 6.3.5 (6.0.x, 6.1.x, 6.2.x, 6.3.4 and lower) to communicate with a conductor running 7.0.1+. 

1. Upgrade the conductor to any version of the 6.3.x software, including and higher than 6.3.5.
2. Upon completion of the install, allow all managed routers to connect and reach the **Synchronized** state. 
  The new keying requirements that are part of 6.3.5+ are loaded onto the routers during synchronization. These are required for routers to communicate with a 7.0.1+ conductor. If the routers do not reach the synchronized state, those routers will not be able to communicate with the 7.0.1+ conductor.
3. Once the routers are synchronized, you may upgrade the conductor to 7.0.1. All synchronized routers, regardless of version, will be able to communicate with the upgraded conductor. The routers are not required to upgrade to 7.0.1 or to 6.3.5.

If your conductor is currently running SSR version 6.3.5+, you may upgrade to 7.0.1 normally. 

## Upgrade using the GUI

Use the following procedures to upgrade a Conductor from the GUI.

1. Select **Conductor** under Authority.
2. In the **Node: Conductor** panel, select the **Manage SSR Software** icon (the arrow within a circle). This icon displays green when upgrades are available. 
3. In the **Upgrade SSR** window, use the drop down to select the SSR version for the upgrade. 
4. Click **Proceed**.

The Upgrade screen displays the Raw Log with the upgrade progress. Once the upgrade is complete, the Conductor is restarted and the GUI is refreshed. 

## Upgrading Using the CLI

Use the `request system software upgrade` command and the associated arguments to perform upgrades. All of the upgrade features are available from the command line as well as the GUI. 

```
admin@conductor-node-1.Conductor# request system software upgrade
usage: upgrade [{router <router> | resource-group <resource-group>}] [simultaneous] [skip-package-transfer] [skip-pre-check]
               [skip-health-check] [cohort-id <cohort-id>] [force] [node <node>] version <version>
keyword arguments:
cohort-id                 Assign a cohort ID to the operation.
force                     Skip confirmation prompt.
node                      The name of the node
resource-group            The name of the resource group
router                    The router on which to upgrade SSR software (default: Conductor)
simultaneous              Upgrade both nodes in an HA router at the same time to maximize speed but interrupt service. Only valid when targeting a router.
skip-health-check         Skip the post upgrade health check, which reverts to the previous version upon failure.
skip-package-transfer     Don't transfer any packages installed on top of the current SSR ISO to the new SSR ISO. Only valid for
                          image based systems.
skip-pre-check            Skip the pre upgrade health check, which prevents the upgrade from starting upon failure.
version                   The targeted upgrade version.

see also:
request system software downgrade       Downgrade to a new version of the SSR.
request system software download        Download a new version of the SSR.
request system software health-check    Perform a health check of an SSR.
request system software revert          Revert to a previous version of the SSR.
*admin@conductor-node-1.Conductor# request system software upgrade
```

#### Image-based and Package-based Installation Status

The image-based and package-based status is visible under **Install Type** in the PCLI using `show assets`.

:::note
The states displayed in the `status` column under `show assests` have changed. The old and new states are mapped below. 

| Old | New |
| --- | ---|
| Disconnected | Disconnected |
| Connected | Synchronizing or Resynchronizing |
| Running | Synchronized |
:::

For more information about asset status and state descriptions, see [Asset Status](ts_ap_salt_minion.md#asset-status).

**Image Based**

```
admin@t106-dut1.Conductor# show assets
Mon 2024-09-09 18:14:18 UTC
Retrieving assets...

=========== =========== ===================== ================== ============== ================ ================ ========
 Router      Node        Asset Id              SSR Version        Install Type   Status           Time in Status   Errors
=========== =========== ===================== ================== ============== ================ ================ ========
 Conductor   t106-dut1   t106-dut1.novalocal   6.3.0-107.r1.el7   Image          Synchronized     34m 44s               0
             t106-dut2   t106-dut2.novalocal   6.3.0-107.r1.el7   Image          Synchronized     21m 19s               0
```

**Package Based**

```
admin@conductor-east-1.RTR_EAST_CONDUCTOR# show assets
Mon 2024-09-09 18:15:20 UTC
✔ Retrieving assets...

==================== ================== ===================== ====================== ============== ============== ================ ========
 Router               Node               Asset Id              SSR Version            Install Type   Status         Time in Status   Errors
==================== ================== ===================== ====================== ============== ============== ================ ========
 RTR_EAST_COMBO       combo-east-1       t212-dut3.novalocal   6.3.0-107.r1.el7       Package        Synchronized   3d 23h 18m 58s        0
                      combo-east-2       t212-dut4.novalocal   6.3.0-107.r1.el7       Package        Synchronized   4d 2h 40m 27s         0
 RTR_EAST_CONDUCTOR   conductor-east-1   t212-dut1.novalocal   6.3.0-107.r1.el7       Package        Synchronized   4d 2h 42m 57s         0
                      conductor-east-2   t212-dut2.novalocal   6.3.0-107.r1.el7       Package        Synchronized   4d 2h 43m 14s         0

Completed in 0.04 seconds
```

## High Availability Upgrades

In a high availability configuration, the default behavior is to perform a sequenced self-upgrade from the CLI. Executing the `request system software upgrade router <conductor-router-name>` from an HA conductor launches a sequenced self upgrade, one node at a time. In a situation where you prefer to upgrade each node manually, you can target each node directly using `request system software upgrade router <conductor-router-name> node <conductor-node-name>`. When the upgrade is complete on the first node, you may run the command on the second node.  

:::note
When upgrading an HA conductor from a version earlier than 6.3.0, it is necessary to upgrade **both nodes** before the asset status will reach the **Synchronized** state on the upgraded nodes. Until both nodes have been upgraded, the asset status will show **Disconnected**. The salt master services on the new software are not started until both nodes have been upgraded.
:::

#### Other HA Considerations

* If an HA pair is discovered to have a mismatched software state (image-based and package-based) an Alarm is reported. The software state must be the same for both nodes.
* Failure of a router to complete the conversion generates a user visible event and records the reasons for the failure on the conductor.
* Router conversion success generates an event recording the transition on the router.
* The image-based and package-based status is visible in the PCLI using `show assets`.

#### Plugin Support

The conversion/upgrade process preserves the currently installed plugin packages. In cases where the plugin has version dependencies, the plugin is upgraded. 



