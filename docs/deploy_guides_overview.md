---
title: Deployment Guides Overview
sidebar_label: Overview
---

Conductor and Router Deployment Guides are provided to help walk a network engineer through the steps required to stand up a conductor-managed SSR network.

Conductor deployments include VMware ESXi and AWS EC2 (BYOL). Each guide walks through the conductor deployment from instance creation to a working configuration with a managed router that forwards internet traffic for LAN users and reaches the conductor over the same WAN interface used for internet breakout.

Router deployment guides include VMWare ESXi spoke and hub configurations. By the end of the guide, the VMware router VM will be running SSR 7.1.4-3.r2, managed by an existing SSR conductor, and forwarding internet traffic from LAN users with management traffic returning to the conductor over the same WAN interface used for internet breakout. 

The deployment guides are intended to be used independently of one another, allowing you to mix and match conductor and router platforms.