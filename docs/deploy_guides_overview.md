---
title: Deployment Guides Overview
sidebar_label: Overview
---

Conductor and Router Deployment Guides are provided to help walk a network engineer through the steps required to stand up a conductor-managed SSR network.

Conductor deployment guides currently include VMware ESXi. In this guide, we explain how to install and configure a conductor to be ready for a branch router to onboard and come online, managed by the conductor, forwarding internet traffic for LAN users, and reachable by the conductor over the same WAN interface used for internet breakout.

Router deployment guides include VMWare ESXi spoke and hub configurations. By the end of the guide, the VMware router VM will be running SSR 7.1.4-3.r2, managed by an existing SSR conductor, and forwarding internet traffic from LAN users with management traffic returning to the conductor over the same WAN interface used for internet breakout. 

The deployment guides are intended to be used independently of one another, allowing you to mix and match conductor and router platforms.