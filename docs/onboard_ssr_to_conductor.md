---
title: Onboard an SSR Device to a Conductor
sidebar_label: Onboard an SSR Device to a Conductor
---

The steps in this section describe the process of onboarding SSR100 or SSR1000 series devices to a Conductor using the Mist-redirect ZTP (Zero Touch Provisioning) process, without Cloud Telemetry (WAN Assurance Telemetry) integration. This procedure requires an account, organization, and sites configured on the Mist portal, and provides steps to configure those items.

For details about WAN Assurance offerings; 

- See [Cloud Telemetry](config_wan_assurance.md) for information about conductor-managed deployments with access to Mist Telemetry data.
- See [Mist WAN Assurance](https://www.juniper.net/documentation/product/us/en/mist-wan-assurance/) for information about Mist-managed deployments.

:::note
The Mist-redirect ZTP process for Conductor-managed deployments is only supported on Juniper SSR100 or SSR1000 series devices.
:::

#### High Level Steps:
- [Install and deploy a Conductor](single_conductor_install.mdx)
- [Import or create a network configuration on the Conductor](single_conductor_config.md)
- [Create an account on the Mist portal](#1-create-an-account-on-the-mist-portal)
- [Add your Organization](#2-create-an-organization-for-the-authority)
- [Create Sites](#3-create-one-site-for-each-physical-location-for-onboarding-the-ssrs)
- [Connect your Device](#connect-your-device-to-the-cloud) 
- [Onboard the SSR](#onboarding-the-ssr)

## Conductor Provisioning

The SSR device must have a configuration provisioned on the managing Conductor **before** powering up and onboarding the SSR device. That can include either importing a configuration, or manually generating the configuration on the conductor. 

Additionally, the conductor uses the asset ID to recognize the SSR device and associate it to a logically configured router. For the SSR to be onboarded to the conductor, this match has to be made for the appropriate router in the configuration. It is crucial to verify the Asset ID for the SSR device when provisioning the router configuration on the conductor. 

It is strongly recommended to configure the SSR WAN and LAN interfaces to match the ports identified as the WAN and LAN ports in the documentation (see below).

## Mist Configuration for Onboarding the SSR 

Configuring WAN Assurance requires Administrator level privileges on all platforms, SSR and Mist.

#### 1. Create an account on the [Mist portal](https://manage.mist.com/).

#### 2. Create an organization for the authority.

- From the Mist menu on the left, select **Organization**, and select **Settings** from the menu.

    ![Organization Settings](/img/wan_org_settings.png)

- In the Create Organization panel, enter a name for the Organization.

    ![Organization Panel](/img/wan_create_org.png)

    For additional information about creating an Organization, please refer to the Mist [Organization Config documentation](https://www.mist.com/documentation/create-mist-org/).

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

    For information about the fields used to create a site, please refer to the Mist [Site Configuration documentation](https://www.mist.com/documentation/mist-edge-getting-started-guide-2/#Create_a_Site_for_Campus_Branches).

:::note
For new deployments enter the Conductor IP address as shown above.

When onboarding an SSR device to an existing Conductor-managed deployment, the existing condutor IP address is used.
:::

### Connect Your Device to the Cloud

:::important
Before powering on the SSR, it is important to verify that the Conductor this SSR will be connecting to **has a valid configuration** for the SSR to download. See Provisioning Notes above.
:::

Once the conductor IP address has been configured, it is time to connect and power up your SSR device.

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

## Verify Onboarding

After onboarding the SSR, it is important to verify that the process was completed successfully.

### To Verify the SSR Onboarding:

1. Launch a command prompt window.

2. Execute the command:

  ```
  sudo systemctl status 128T
  ```

3. When the service is listed as _Active_, log into the system as Admin using the system default password. By logging into the system, you have verified the installation. 

4. Close the command prompt window. 

5. Use a web browser to navigate to the IP address of the SSR GUI. For example; `https://192.168.1.25`

6. Log in to the SSR GUI using the admin name and password you created earlier.
  