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

Templates allow for re-usable and consistent configuration for every SSR device you deploy. Navigate to “WAN Edge Templates” and create a new template.

![WAN Edge Template](/img/wanas_standalone_template.gif)

Enter your NTP and DNS settings.

![Define Template](/img/wanas_template_static.png)

## WAN Interface

The first thing to do in your template is to describe which port to use for the WAN.

![Add WAN](/img/intro_wa_quickstart_6.gif)

1. Scroll to the WAN section of the template, and select **Add WAN**.
2. Name the WAN port `wan1`.
3. Since you already plugged port 0 on the device into the Internet, enter `ge-0/0/0` to designate it as a WAN port.
4. Make sure **IP Configuration** is set to be learned from DHCP, and that Source NAT is enabled.
5. Click **`Add`** at the bottom of the **Edit WAN Configuration** side panel.

![Configure WAN](/img/intro_wa_quickstart_7.png)

## LAN Interface

Next, associate your LAN network segment with the appropriate port on the device, and give the LAN additional network services such as DHCP.

![Add LAN](/img/intro_wa_quickstart_8.gif)

1. Scroll to the LAN section of the template, and select **Add LAN**.
2. From the Network dropdown menu, select your network segment to associate it with the LAN.
3. Enter the port used for the LAN port, for example `ge-0/0/3`.
4. In the **IP Address** setting, enter `192.168.1.1` to assign the WAN edge device `.1` for use as gateway in the network.
5. Enter `/24` for the **Prefix Length**.

![Configure LAN](/img/intro_wa_quickstart_9.png)

6. To provide DHCP services to endpoints on this network, select the button for DHCP server.
7. Give your DHCP server an address pool starting with `192.168.1.100` and ending with `192.168.1.200`.
8. Enter `192.168.1.1` as the Gateway to be assigned to DHCP clients.
9. Finally, enter `1.1.1.1,8.8.8.8` as DNS Servers to be assigned to clients on the network.
5. Click **`Add`** at the bottom of the **Edit LAN Configuration** side panel.

![Configure DHCP](/img/intro_wa_quickstart_10.png)

## Policy

Your template has WANs and LANs; now you need to tell the device how to use them to connect users to applications. This is done using Traffic Steering and Application Policies.

### Steering Policy

![Add steering](/img/intro_wa_quickstart_11.gif)

1. Scroll to the Traffic Steering section of the template, and select **Add Traffic Steering**.
2. Name your steering policy, for example, `local-breakout`.
3. Select **Add Paths** to give your steering policy a path to send traffic.
4. Select `WAN` as the path type, and select your WAN interface. For apps that use the policy, this indicates you want them sent directly out of the local WAN interface.
5. **Click the check** in the upper right of the Add Path box, and then click **`Add`** at the bottom of the **Add Traffic Steering** side panel.


### Application Policy

Finally, tie your networks and applications together in an application policy.

![Add access](/img/intro_wa_quickstart_12.gif)

1. Scroll to the Application Policy section of the template, and select **Add Policy**.
2. Enter a string in the name column, and **click the check** to the right of your entry.
3. From the **Network** column dropdown, select your LAN network.
4. From the **Applications** column dropdown, select your Internet app.
5. From the **Traffic Steering** column dropdown, select your local breakout steering policy.

![Configure access](/img/intro_wa_quickstart_13.gif)

You now have a working WAN Edge template you can apply to many sites and devices across your organization.

## Assign to Site

With your template set up, save and assign it to the site where your WAN edge device will be deployed.

![Configure access](/img/intro_wa_quickstart_14.gif)

1. Scroll to the top and click **Save**.
2. Click the **Assign to Site** button, and select the site where you want the template config applied.



