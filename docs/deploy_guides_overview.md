---
title: Deployment Guides Overview
sidebar_label: Overview
---

Conductor and Router Deployment Guides are provided to help walk a network engineer through the steps required to stand up a conductor-managed SSR network.

Conductor deployments are available for VMware ESXi and Azure. Each conductor guide walks you through deploying the conductor VM, initializing SSR software, configuring the authority, and preparing the conductor to manage routers.

Router deployment guides are available for VMware ESXi and Azure. The Azure guide covers a hub-and-spoke topology where both routers are deployed as BYOL Azure VMs, managed by a pre-existing conductor, and connected via SVR peering with the hub providing internet breakout for both local LAN users and spoke LAN users.

The deployment guides are intended to be used independently of one another, allowing you to mix and match conductor and router platforms.