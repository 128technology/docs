---
title: RMA WAN Assurance Workflow for Juniper Hardware
sidebar_label: RMA - WAN Assurance (Juniper Hardware)
---

Return Merchandise Authorizations (RMAs) are a necessary component in the lifecycle of networking equipment, ensuring operational continuity, customer satisfaction, and the efficient resolution of hardware issues.

RMAs streamline the process of returning defective hardware and obtaining a replacement, minimizing downtime for businesses and ensuring network functionality is restored promptly.

The following workflow walks through the procedure of replacing a defective WAN Edge node of an HA router. This procedure is the same for a standalone router. This document presumes you have already contacted Juniper support, identified that a replacement unit is necessary, and received your replacement unit.

:::note
This guide is intended to be used for Juniper-branded hardware in WAN Assurance deployments only.
:::

## RMA Process
If you are replacing a [Juniper-branded hardware platform](hdwr_ssr_device_port_layout.mdx), the device already has SSR software installed on it. The version of software installed on the replacement unit may not be the same version as the node being replaced. The device must be upgraded upon completion of the RMA procedure.

### Configuration Example

:::important
Do NOT unassign any nodes from the cluster until you complete the reassignment process.
:::

The following example shows the process of replacing `node0` of an HA pair. The SSR software used in this example is SSR-6.1.6. The MAC addresses are provided here for reference.

- MACs for the original cluster:

  Node0 = `90:ec:77:38:e6:73`

  Node1 = `90:ec:77:39:1a:76`

- MAC of the new node:

  Node0 = `90:ec:77:39:1e:f6`

  ![Device Overview 1](/img/rma_wan_assurance_router.png)

#### 1. Replace the bad SSR node (node0) with the new SSR node

  1. Power down the node to be replaced. 
  2. Take note of the location of each of the connections. 
  3. Swap the old device for the new one, replacing each of the connections in the exact location. Do not power on the new unit at this time.

#### 2. Verify that the bad node - `node0` - is offline

Verify that `node0` is not connected to Mist and that `node1` is still connected to Mist.
 
  ![Node Offline](/img/rma_wan_assurance_node_0_offline.png)

#### 3. Claim the new node in Mist 

You must also verify the node is in the Mist inventory and Unassigned.

:::important
Do NOT assign the new node to a site at this time.
:::

  1. Select **WAN Edges**. 

 ![WAN Edge](/img/rma_wan_assurance_select_wan_edges.png)

  2. Select **Inventory**.

 ![Inventory](/img/rma_wan_assurance_select_inventory.png)

  3. Select **Claim WAN Edges** in the upper right of the Inventory view.

 ![Claim Button](/img/rma_wan_claim_button.png)

  4. In the **Claim WAN Edges and Activate Subcriptions** dialog, add the device claim code to the list of devices to claim and select **Add**.

  5. **Un-check** the **Assign claimed WAN edges to site** box. This will place the device into inventory, to be assigned to a site later.

  6. Click the **Claim** button to claim the device into your inventory.

 ![Claim WAN Edge](/img/rma_wan_assurance_claim_wan_edge.png)

  7. Verify that the new node shows in the WAN Edge Inventory.

 ![Verify Model](/img/rma_wan_assurance_verify_model.png)

  8. Connect power to the new node.

  9. Verify the Model is the same between the new node and the cluster.

#### 4. Replace the bad node in Mist

  1. Select the device to be replaced in the Inventory window.
  2. In the WAN Edges window, click on the Utilities dropdown and select **Replace WAN Edge**.

 ![Node Utilities](/img/rma_wan_assurance_node_utilities.png)

  3. When the **Replace WAN Edge** dialog appears, use the radio buttons to select the node to be replaced.

 ![Select Node](/img/rma_wan_assurance_select_node.png)

  4. Enter or select the MAC Address of the replacement node.

 ![Click Replace](/img/rma_wan_assurance_select_mac.png)

  5. Click **Replace**.
  6. From the Analytics menu, select Events to verify the WAN Edge Replacement is in progress. 

 ![Events Menu](/img/rma_wan_assurance_select_events.png)

 When the replacement is complete the following message is displayed.

 ![Confirm Replacement](/img/rma_wan_assurance_node_replaced.png)

### Verify Replacement and Return the Old Device
  
Verify new node is online and running in the WAN Edges view for All Nodes.

 ![Verify Online](/img/rma_wan_assurance_verify_online.png)

If the new device is not the same version as the existing one, [upgrade the device at this time](https://www.juniper.net/documentation/us/en/software/mist/mist-wan/topics/task/ssr-configuration-wan-edge-upgrade.html)

Once you have verified the state of the device, and upgraded the firmware as necessary, place the replaced unit in the box and return to Juniper.
