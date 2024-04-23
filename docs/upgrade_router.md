---
title: Upgrading a Router
sidebar_label: Upgrading a Router
---
Use the following procedures to upgrade a Router.

:::note
The Router software version cannot be higher than the software version installed on the Conductor.
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

### Upgrade using the Conductor's PCLI

For routers managed by an SSR Conductor, a self-upgrade, or manual upgrade, can be initiated from the SSR conductor's PCLI. This upgrade process is completed in two stages: *download* followed by *upgrade*. There are command changes asociated with software version 6.3.0 and those chages are indicated below. For earlier versions of SSR software, please refer to the [Legacy Upgrades](upgrade_legacy.md) section. 

As an administrator-level user, log into the conductor's PCLI.

1. Use the command `show assets` to list the devices managed by this conductor, and the software revision each asset is currently running.

2. For a given asset, use the command `show asset [asset ID]` or `show asset software router [router name]`  to view the available software upgrades for that asset. The list will be in the section labeled "Available for Download" at the end of the output.
   :::note
   If there are software releases absent from the list that you are confident should appear, use the command `send command yum-cache-refresh router [router name]` to refresh the software list.
   :::

3. Type `request system software download router <rtr> node <node> version <image-version>`. You can monitor the progress by using `show system software download router <rtr> node <node>` which will indicate status (e.g., *Downloading*).

4. Once the download is complete, use the command `request system software upgrade router <rtr> node <node> version <image-version>` to initiate the upgrade process. View upgrade progress using `show system software upgrade router <rtr> node <node>`

In a high availability deployment, the conductor upgrades each router node sequentially to minimize/avoid downtime. For manual upgrades, intiating an upgrade on one HA node or router will automatically upgrade the second node/router. However, it is still recommended to perform upgrade activity during periods of low traffic or maintenance windows.