---
title: Provisioning
sidebar_label: Provisioning
---

To facilitate the ZTP (zero-touch provisioning) process of onboarding an SSR into the Mist Cloud, it is a best practice to create the topology and configuration where the SSR will be adopted **before** adding the SSR to the Mist Cloud. The process described here allows you to create a basic configuration to be loaded onto the SSR during onboarding.

## Add a Network

![Add a Network](/img/wanas_create-network.gif) 

In the add network panel, define the following:

- Network name, IP address and subnet.
- Enable “Access to Mist Cloud” to permit services from this network to the Mist cloud. Enabling “Advertise via Overlay” will announce this network via iBGP.
- Add users/hosts representing the LAN segments – these will be used as a source in service policies.
- Configure support for source and destination NAT.

![Network Details Panel](/img/wanas_create-network_detail.png)

## Identify Applications

Applications represent the "things" that the users are connecting to. These include:
- Network services
- SaaS apps
- Private subnets
- Cloud workloads

To create a new application, navigate to Applications and click Add Applications. 

![Add Application](/img/wanas_add-app.gif)

Configure and save a basic Internet app. If you intend to have a catch-all application for all traffic, it is best practice to create an "Internet" application that is represented by a quad 0 (0.0.0.0/0).

![Application Panel](/img/wanas_add-app_static.png)