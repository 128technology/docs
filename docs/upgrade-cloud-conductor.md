---
title: Cloud Conductor Upgrade
sidebar_label: Cloud Conductor Upgrade
---

This guide provides steps for upgrading both a single conductor as well as two High Availability (HA) cloud conductors running early (pre-6.3.5) package based software to the current (7.0.1 and later) image-based software. This upgrade has specific requirements due to earlier cloud deployments. 

Earlier Azure cloud deployments (prior to the 6.3.0 SSR release) were not LVM enabled. LVM is a basic requirement to use the image based software released with SSR version 6.3.0, and deployed on Conductors starting with 6.3.6. To successfully upgrade a cloud deployed Conductor, you must migrate from the older deployment on Azure to a new, LVM-enabled Azure deployment. The steps provided in this guide describe the upgrade/migration process. 

address the transition to a two-disk system and Logical Volume Management (LVM) requirements introduced in version 6.3.0. 

## Upgrading a Cloud Conductor




## Upgrading HA Cloud Conductors

To successfully upgrade a cloud deployed Conductor, you must migrate from the older deployment on Azure to a new, LVM-enabled Azure deployment. The steps provided in this guide describe the upgrade/migration process. This document provides steps to migrate from two HA 6.2.10 conductors, to two new HA 7.0.5 conductors.

This example conductor deployment consists of two HA conductors installed with SSR version 6.2.10). Each conductor has 1 attached network interface assigned with 1 (private??) IP address. Both conductors are deployed in the same region and subnet with different availability zones (node 1 is in availability zone 1 and node 2 is in availability zone 2). There is an external NAT that translates separate public IP addresses to each conductor’s (private??) IP address. 

Before deploying the two new 7.x conductors, it is required to block incoming traffic destined to the two original 6.x conductors’ IP addresses. This may be done at the external NAT, or an upstream firewall. The intent is to prevent an influx of incoming traffic traversing to the new conductors while they are deploying and initializing.

Each new 7.x conductor has one attached network interface assigned with the respective original conductor’s (private??) IP address. The original conductor’s network interface is assigned to another unused, (private??) IP address. Each new conductor is deployed in the same original region, subnet, and its respective original availability zone. During the deployment, the new conductors require outbound internet access as they require connectivity to `software.128technology.com` via TCP 443 to download the SSR software.

After the deployment and migration processes are completed, the previously created block rule will be removed to allow inbound management traffic from the routers to the new conductors.

The diagram below shows the start and end state of the migration described in this document.

### Process Overview

The migration process consists of the following steps:

1.	Pre-maintenance Window Tasks (2 hours)
a.	Securely copy necessary backup files from both original conductor nodes into a separate machine.
b.	Input the required values in the Azure conductor deployment template parameters and cloud-init files.
c.	Enable Azure subscription to allow programmatic deployment of the Azure SSR offering.
2.	Block Incoming Traffic Destined to the Original Conductors’ IP Addresses (maintenance window – 30 minutes)
a.	Configure upstream external NAT to block incoming traffic destined to the original conductors’ IP addresses.
3.	New Conductor Deployment (maintenance window - 2 hours)
a.	Shut down the original conductor nodes.
b.	Change the original conductor nodes’ private IP addresses to unused, private IP addresses.
c.	Using the provided Azure conductor deployment template files (template, parameters, and cloud-init), deploy two separate conductor VMs with the original conductor nodes’ original private IP addresses.
4.	Conductor Migration (maintenance window - 30 minutes)
a.	From the separate machine, securely copy the necessary backup files to the new conductor nodes. Ensure that:
i.	The original primary node backup file is copied into the new primary node. 
ii.	The original secondary node backup file is copied into the new secondary node.
b.	On each new conductor node, extract the copied backup file.
5.	Verify New Conductor Nodes are Connected and Synchronized (maintenance window - 30 minutes)
a.	Leverage pcli and GUI to verify that the conductors are connected and synchronized.
6.	Allow Incoming Traffic Destined to the New Conductors (maintenance window – 30 minutes)
a.	Configure upstream External NAT to allow incoming traffic destined to the new conductors.
7.	Verify Routers are Connected and Synchronized to the New Conductors (maintenance window – estimated time depends on the number of routers and WAN connectivity)
a.	Leverage pcli and GUI to verify that the conductors are connected and synchronized.
8.	Clean Up
a.	On the new, primary conductor node, undo the requirement that forces the user t128 to be prompted for a sudo password.
