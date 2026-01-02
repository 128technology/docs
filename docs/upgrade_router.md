---
title: Upgrading a Router
sidebar_label: Upgrading a Router 
---
Use the following procedures to upgrade a Router.

:::note
The Router software version cannot be higher than the software version installed on the Conductor.
:::

:::important
**The minimum starting version for upgrading a conductor or a router to 7.0.1 or higher is 6.3.5.** If the conductor is not currently running at least 6.3.5, first upgrade to this version. Then upgrade each router to 6.3.5, and wait for all managed routers to reach the synchronized state prior to upgrading to 7.0.1. There are new keying requirements enforced by the conductor in 7.0.1, and if the routers do not reach the synchronized state before upgrading to 7.0.1, those routers will not be able to communicate with the conductor.
:::

### Upgrade using the Conductor's GUI

1. Navigate to the Routers page.
2. At the top of the page, select Software Lifecycle.
3. To being the upgrade process, select Initiate Upgrade.
4. Select Download and a version from the dropdown.
5. Select the router or routers where the software will be downloaded from the router list. 
6. Click start. 
7. When the download process completes, return to the Software Lifecycle panel and select upgrade, the version, the router, and finally the Start button.
The upgrade will run to completion with no interaction necessary. 

#### Lifecycle History

To view the install history for your routers, selecting Lifecycle History displays all versions downloaded and installed, and the operation status. 

### Upgrade using the Conductor PCLI

For routers managed by an SSR Conductor, a self-upgrade, or manual upgrade, can be initiated from the SSR conductor's PCLI. This upgrade process is completed in two stages: *download* followed by *upgrade*. There are command changes asociated with software version 6.3.0 and those chages are indicated below. For earlier versions of SSR software, please refer to the [Legacy Upgrades](upgrade_legacy.md) section. 

As an administrator-level user, log into the conductor's PCLI. 

1. Use the command `show assets` to list the devices managed by this conductor, and the software revision each asset is currently running.

2. For a given asset, use the command `show system software available router <router> node <node>` to show the versions available for download, or `show system software available router <router>` to see versions available for both nodes simultaneously. 

3. Type `request system software download router <router> node <node> version <image-version>`. You can monitor the progress by using `show system software download router <router> node <node>` which indicates status (e.g., in progress download, completed download, and failed download).
	To download software to both nodes in an HA router at the same time, type `request system software download router <router> version <image-version>`, and use `show system software download router <router>` to monitor progress on both nodes. 

4. Once the download is complete, use the command `request system software upgrade router <router> node <node> version <image-version>` to initiate the upgrade process. View upgrade progress using `show system software upgrade router <router> node <node>`

In a high availability deployment, the conductor upgrades each router node sequentially to minimize/avoid downtime. For manual upgrades, intiating an upgrade on one HA node or router will automatically upgrade the second node/router. 

If you perform an upgrade from the CLI using the `request system software upgrade router <conductor-router-name>` from an HA conductor, it launches a sequenced self upgrade, one node at a time. In a situation where you prefer to upgrade each node manually, you can target each node directly using `request system software upgrade router <conductor-router-name> node <conductor-node-name>`. Use `show system software upgrade` to view the status of an in progress upgrade. When the upgrade is complete on the first node, you may run the command on the second node. 

However, it is still recommended to perform upgrade activity during periods of low traffic or maintenance windows.

