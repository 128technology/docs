---
title: "RMA WAN Assurance Workflow"
sidebar_label: "RMA WAN Assurance"
---

Return Merchandise Authorizations (RMAs) are a necessary component in the lifecycle of networking equipment, ensuring operational continuity, customer satisfaction, and the efficient resolution of hardware issues.

RMAs streamline the process of returning defective hardware and obtaining a replacement, minimizing downtime for businesses and ensuring network functionality is restored promptly.

The following workflow walks through the procedure of replacing a defective WAN Edge node of a HA router. This procedure is the same for a standalone router. This document presumes you have already contacted Juniper support, identified that a replacement unit is necessary, and have already received your replacement unit.

### Whitebox Staging
If you are replacing a whitebox platform, you must first ensure that the system is running the same version of firmware of the node that is being replaced. If you have not already done this, follow the [installation guide](intro_installation.md).

### RMA Process
If you are replacing a [Juniper-branded hardware platform](hdwr_ssr_device_port_layout.mdx), the device will already have SSR software installed on it. The version of software installed on the replacement unit may not be the same version as the node being replaced. The device must be upgraded upon completion of the RMA procedure.

:::important
Do NOT unassign any nodes from the cluster until you complete the reassignment process.
:::

The following example will go through the process of replacing node0 of a HA pair. The SSR software running in this example is SSR-6.1.6.

MACs for the original cluster:

Node0 = `90:ec:77:38:e6:73`

Node1 = `90:ec:77:39:1a:76`

MAC of the new node:

Node0 = `90:ec:77:39:1e:f6`

  ![Device Overview 1](/img/rma_wan_assurance_router.png)

1. Replace bad SSR node with new SSR node

Power down the node to be replaced. Take note of the location of each of the connections. Swap the old device for the new one, replacing each of the connections in the exact location. Do not power on the new unit at this time.

2. Verify bad node (node0) is offline

In this example node0 is being replaced so it shows disconnected in Mist

Verify that node0 is not connected to Mist and that node1 is still connected to Mist
 
  ![Node Offline](/img/rma_wan_assurance_node_0_offline.png)

3. Claim the new node in Mist and verify it is in the Mist Inventory and Unassigned

:::important
Do NOT assign new node to a site at this time
:::
Click WAN Edges

  ![WAN Edge](/img/rma_wan_assurance_select_wan_edges.png)

Click Inventory

  ![Inventory](/img/rma_wan_assurance_select_inventory.png)

Click Claim WAN Edges

  ![Claim Button](/img/rma_wan_claim_button.png)

Uncheck “Assign claimed WAN Edges to site”

Enter SSR Claim Code and Click Add

Click Done

  ![Claim WAN Edge](/img/rma_wan_assurance_claim_wan_edge.png)

Verify that the new node is in the WAN Edge Inventory.

Connect power to the new node.

Verify the Model is the same between the new node and the cluster.

  ![Verify Model](/img/rma_wan_assurance_verify_model.png)

4. Replace the bad node in Mist

Click Utilities

Select Replace WAN Edge

  ![Node Utilities](/img/rma_wan_assurance_node_utilities.png)

Select the node to be replaced

  ![Select Node](/img/rma_wan_assurance_select_node.png)

Select the MAC of the replacement node

  ![Click Replace](/img/rma_wan_assurance_select_mac.png)

Click Replace

  ![Confirm Replacement](/img/rma_wan_assurance_node_replaced.png)

5. Verify WAN Edge Replacement is in process under WAN Edge Events
  
6. Verify new node is online and running

  ![Verify Online](/img/rma_wan_assurance_verify_online.png)

7. If the new device is not the same version as the existing one, [upgrade the device at this time](https://www.juniper.net/documentation/us/en/software/mist/mist-wan/topics/task/ssr-configuration-wan-edge-upgrade.html)

8. Place the replaced unit in the box and return to Juniper
