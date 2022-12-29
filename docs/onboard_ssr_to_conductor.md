---
title: Onboard an SSR Device to a Conductor
sidebar_label: Onboard an SSR Device to a Conductor
---

The steps in this section describe the process of onboarding an SSR device (SSR1x0/1x00) to a Conductor using Mist, but without Cloud Telemetry (WAN Assurance Telemetry) integration. The steps are similar, but do not include a Mist Organization registration code. It does however, require an account on the Mist Portal, and the creation of an Organization. These provide the reference location for the SSR to connect to the Conductor. 

 **This document explains the process of enabling Mist ZTP for conductor-managed deployments.** This procedure assumes you do not already have an account, organization, or sites configured on the Mist portal. These items are required for SSR/Mist WAN Assurance.

#### High Level Steps:
- [Install and deploy a Conductor](merged_single_conductor_install.mdx)
- [Import or create a network configuration on the Conductor](single_conductor_config.md)
- [Create an account on the Mist portal](#1-create-an-account-on-the-mist-portal)
- [Add your Organization](#2-create-an-organization-for-the-authority)
- [Create Sites](#3-create-one-site-for-each-physical-location-for-onboarding-the-ssrs)
- [Connect your Device](#connect-your-device-to-the-cloud) 
- [Onboard the SSR](#onboarding-the-ssr)

## Conductor Provisioning

The SSR Device must have a configuration provisioned on the managing Conductor **before** powering up and onboarding the SSR device. That can include either importing a configuration, or manually generating the configuration on the conductor. 

Additionally, the conductor uses the asset ID to recognize the SSR device and associate it to a logically configured router. For the SSR to be onboarded to the conductor, this match has to be made for the appropriate router in the configuration. It is crucial to verify the Asset ID for the SSR Device when provisioning the router configuration on the conductor. 

It is strongly recommended to configure the SSR WAN and LAN interfaces to match the ports identified as the WAN and LAN ports in the documentation (see below).

## Mist Configuration for Onboarding the SSR 

Configuring WAN Assurance requires Administrator level privileges on all platforms, SSR and Mist.

#### 1. Create an account on the [Mist portal](https://manage.mist.com/).

#### 2. Create an organization for the authority.

- From the Mist menu on the left, select **Organization**, and select **Settings** from the menu.

    ![Organization Settings](/img/wan_org_settings.png)

- In the Create Organization panel, enter a name for the Organization.

    ![Organization Panel](/img/wan_create_org.png)

    For additional information about creating an Organization, please refer to the Mist [Organization Config documentation](https://www.mist.com/documentation/category/organization-config/).

#### 3. Create one Site for each physical location for onboarding the SSRs.

Create a unique site for each physical (or logical) location in the network. **For example, the spoke and hub should be onboarded to different sites. Other devices from the Juniper stack such as Mist APs, Switches, SRX, etc., should be onboarded and assigned to the same site as the SSR when possible.** This provides a clean topology view of all devices running within a site.

- From the Mist menu on the left, select **Organization** and select **Site Configuration** from the menu.

    ![Site Configuration](/img/wan_org_site_config.png)

- In the Sites List, click on the **Create Site** button.

    ![Site Button](/img/wan_create_site_button.png)

- Use the New Site panel to configure a site.

    ![New Site Panel](/img/wan_new_site.png)

- **Add the Conductor IP address to the Site.** This allows devices such as the SSR 120/130 to use ZTP to access the conductor through Mist.

    ![Session Smart Conductor Address](/img/wanas_conductor_ip_mist.png)

    For information about the fields used to create a site, please refer to the Mist [Site Configuration documentation](https://www.mist.com/documentation/category/site-configuration/).

:::note
For existing deployments of Conductor-managed Session Smart Networking, the Conductor IP address is pre-populated.

For new deployments enter the Conductor IP address as shown above.
:::

### Connect Your Device to the Cloud

:::important
Before powering on the SSR, it is important to verify that the Conductor this SSR will be connecting to **has a valid configuration** for the SSR to download. See Provisioning Notes above.
:::

Once the conductor IP address has been configured, it is time to connect and power up your SSR Device.

![Device Connections](/img/intro_wa_ssr120_quickstart_1.png)

Your SSR device uses port 0 (`ge-0/0/0`) as a default WAN port to contact Mist for zero-touch provisioning (ZTP). You will also be setting up port 3 (`ge-0/0/3`) with a LAN network.

1. **Connect port 0** to an Ethernet WAN link capable of providing the device with:
    * DHCP address assignment
    * Connectivity to the Internet and Mist

2. **Connect port 3** to your LAN devices, including:
    * Mist-managed Juniper EX switches
    * Mist APs
    * User devices

3. **Power on the device**.

Great job! Your SSR device is now connected and awaiting further instructions.

## Onboarding the SSR

The conductor sends instructions to the connected SSR devices to self-onboard; the process is automated and the devices do not require any user interaction.



<!---- remove the info below, verify it's use in Telemetry 

## Additional Information

### Skipping Specific Routers

A router or routers can be skipped during the Mist onboarding process. Use the Conductor GUI to change **authority > router > mist-wan-assurance > enabled** to `false`. The Conductor will skip the router and associated nodes (if it is an HA router).

For a system that has completed the onboarding process, setting `mist-wan-assurance` to `false` will prevent telemetry data from being sent to the cloud.

:::note
Disabling WAN Assurance does not automatically release the router from the cloud. See Releasing a Router for more information.
::: ----->