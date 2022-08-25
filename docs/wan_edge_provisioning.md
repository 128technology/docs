---
title: WAN Edge Provisioning
sidebar_label: WAN Edge Provisioning
---

To facilitate the ZTP (zero-touch provisioning) process of onboarding an SSR into the Mist Cloud, it is a best practice to create the topology and configuration where the SSR will be adopted before adding the SSR to the Mist Cloud. The process described here allows you to create a basic configuration to be loaded onto the SSR during onboarding. 

This process assumes that you already have an account on the Mist Portal.

## Site Creation

Create one Site for each physical location for onboarding the SSRs.

- Create a unique site for each physical (or logical) location in the network. For example, the spoke and hub should be onboarded to different sites. Other devices from the Juniper stack such as Mist APs, Switches, SRX, etc., should be onboarded and assigned to their respective sites. This provides a clean topology view of all devices running within a site.
- Spoke Site is typically the location where a full stack solution is deployed. The location field is required for creation. Site variables are assigned after the network is defined.

![Create a Site](/img/wanas_create_site.gif)

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

## Create Standalone WAN Edge Template

Navigate to “WAN Edge Templates” and create a new template.

![WAN Edge Template](/img/wanas_standalone_template.gif)

Enter your NTP and DNS settings.

![Define Template](/img/wanas_template_static.png)

## Create the WAN Interface

Add a new WAN interface to the template.

![WAN Interface](/img/wanas_add_wan.gif)

Enter and save the WAN interface settings.

![WAN Settings](/img/wanas_add_wan.png)

## Create the LAN Interface

Add a new LAN interface to the template.

![LAN Interface](/img/wanas_add_lan.gif)

Select your previously created network, and set the IP address the device will use from within the subnet.

![Set IP](/img/wanas_add_lan.png)

Set up a DHCP server pool for the LAN network.

![Set Server Pool](/img/wanas_add_lan_dhcp.png)

## Create Breakout Steering Policy

Add a traffic steering policy specifying use of WAN path, and previously configured WAN interface.

![Steering Policy](/img/wanas_add_steering.gif)

## Create an Access Policy

Add an access policy to the template.

![Add Access Policy](/img/wanas_add_access_policy.gif)

Select your network, your internet app, and breakout steering policy.

![Define Access Policy](/img/wanas_add_access_policy2.gif)

## Associate Template With Site

Save the template you have configured, and associate the template with your previously created site.

![Save Template](/img/wanas_save_assign_template.gif)




