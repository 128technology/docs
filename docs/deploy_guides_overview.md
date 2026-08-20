---
title: Deployment Guides Overview
sidebar_label: Overview
---

Conductor and Router Deployment Guides are provided to help walk a network engineer through the steps required to stand up a conductor-managed SSR network.

Conductor deployments include VMware ESXi and AWS EC2 (BYOL). Each guide walks through the conductor deployment from instance creation to a working configuration with a managed router that forwards internet traffic for LAN users and reaches the conductor over the same WAN interface used for internet breakout.

Router deployment guides are available for VMware ESXi and AWS EC2 (BYOL). The VMware Router guide covers a single conductor-managed branch router on ESXi. The AWS Hub and Spoke guide covers deploying a hub router and a spoke router in AWS EC2, with SVR peering between them and local internet breakout at each site.

The deployment guides are intended to be used independently of one another, allowing you to mix and match conductor and router platforms.