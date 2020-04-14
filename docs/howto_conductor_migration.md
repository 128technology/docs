---
title: Conductor Migration
---

Before going through this document, it is beneficial to first understand the [best practices for deploying your conductor](bcp_conductor_deployment.md).

The purpose of this guide is to provide an overview and walkthrough the process of migrating the routers and their conductor configurations to a newly installed 128T Conductor

## Prerequisites

This document presumes that the reader has already installed a new conductor and wants to migrate the routers in the network along with their configurations. If you have not yet setup your 128T nodes, you can follow the [installation guide](intro_installation.md) to walk you through that process.

## Migration Process

During the process of standing up the 128T conductor as mentioned in the Installation Guide, there are a couple of things we will have to make sure before proceeding with the migration of the router. Make sure that you have exported the configurations from the existing Conductor and import them to the new Conductor.

While importing the configurations to the Conductor, we will need to *“commit”* the changes from the PCLI as long as the candidate configuration is valid. A restart will be required and then we can proceed with the migration.

:::important
It is extremely important that the conductor configurations are exported/imported correctly to avoid losing the configuration.
:::

Once the new conductor is all set up, we can go on with migrating the routers one at a time. The below commands have to be run on the PCLI on every router and should be repeated for all the routers individually.

For standalone conductor, on the router use the command: `migrate conductor <address1>`

For HA conductor, on the routers use the command: `migrate conductor <address1> <address2>` 

## Verify Migration

If any router does not get migrated successfully, it will show an error or else the migration will proceed smoothly.

- Make sure that the TCP ports 930, 4505 and 4506 on the Conductor are enabled, as the routers will require to access these ports in order for them and the new Conductor to communicate.
- These TCP ports have to be added open on any firewalls in front of the conductor. (In reference to the public connections a Conductor runs, and the firewall required to allow those connections)
- After the migration runs successfully, all the assets will show “running” from the new Conductor.