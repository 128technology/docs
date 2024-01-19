---
title: Configuring Traffic Engineering
sidebar_label: Configuration
---

This section provides some use-case examples to demonstrate the traffic engineering configuration process.

## Traffic Cap and Queuing

Using the following diagram, let's assume the following scenario:

Traffic is getting congested while flowing towards headquarters since two of the three branches are exceeding the bandwidth provided by the service provider. The customer is facing the following issues:

Issue 1: The ISP router is allowing 150Mbps traffic from each branch. Branch 1 and 2 have started exceeding the upstream bandwidth and are seeing a lot of traffic dropping for all applications.

Issue 2: The customer has two important services they wish to prioritize: Voice over IP, and File Transfer to a file server in headquarters using SFTP. They want to ensure that the traffic associated with these services is classified correctly.

Issue 3: The customer wants to ensure that sufficient bandwidth is reserved for these services to suit their application needs. 

![Network Topology](/img/concepts_traff_eng.png)

