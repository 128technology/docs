---
title: Device Default Port Layout
sidebar_label: Device Default Port Layout
---

The information in this section pertains to system onboarding using the Image-based installation introduced with the version 6.0 release. 

When a whitebox device is installed with SSR software, the software scans the device to generate a default port map. When the device is recognized as a certified device, a known port layout is configured as the device default.
When the device is unrecognized, a default port layout is generated based upon PCI address order.
This order often does NOT match the external bezel port order. Some plugging in and testing may be required.

The following sections provide information about port connections on Juniper certified devices and non-certified devices that are considered compatible. 

- [Lanner 1515:](#lanner-1515) Certified Device
- [Silicom Madrid 90500-0151-G61:](#silicom-madrid-90500-0151-g61) Certified Device
- [Fitlet2 Dual Port:](#fitlet2-dual-port) Non-certified, Compatible Device
- [Fitlet2 Quad Port:](#fitlet2-quad-port) Non-certified, Compatible Device
- [Additional Non-certified, Compatible Devices](#additional-non-certified-compatible)

Use this data to complete the onboarding process for your whitebox device. 

### Lanner 1515

![Lanner 1515](/img/install_onbd_hdwr_lanner.png)

1. Connect port 3 `ge0/0/3` (WAN) to a network providing DHCP address assignment, and outbound connectivity to Mist. If you are adopting using the PCLI `adopt` command, proceed to [PCLI Adoption.](intro_installation_fips.md#adopt-the-router-from-the-ssr-pcli)

2. Connect port 6 `ge0/0/6` (LAN) to your laptop, and statically assign your laptop port address 192.168.6.10

3. Go to https://192.168.6.1 

4. Then what????

### Silicom Madrid 90500-0151-G61

![Silicom Madrid](/img/install_onbd_hdwr_silicom.png)

1. Connect port 6 `ge0/0/6` (WAN) to a network providing DHCP address assignment, and outbound connectivity to Mist. If you are adopting using the PCLI `adopt` command, proceed to [PCLI Adoption.](intro_installation_fips.md#adopt-the-router-from-the-ssr-pcli)

2. Connect port 3 `ge0/0/3` (LAN) to your laptop, and statically assign your laptop port address 192.168.3.10.

3. Go to https://192.168.3.1 

4. Then what????


### Fitlet2 Dual Port

![Fitlet2 Dual Port](/img/install_onbd_hdwr_fitletdual.png)

1. Connect port 2 `ge0/0/0 ` (WAN) to a network providing DHCP address assignment, and outbound connectivity to Mist. If you are adopting using the PCLI `adopt` command, proceed to [PCLI Adoption.](intro_installation_fips.md#adopt-the-router-from-the-ssr-pcli)

2. Connect port 1 `ge0/0/1` (LAN) to your laptop, and statically assign your laptop port address 192.168.1.10.

3. Go to https://192.168.1.1 

4.  Then What??


### Fitlet2 Quad Port

![Fitlet2 Quad Port](/img/install_onbd_hdwr_fitletquad.png)

1. Connect port 2 `ge0/0/0 ` (WAN) to a network providing DHCP address assignment, and outbound connectivity to Mist. If you are adopting using the PCLI `adopt` command, proceed to [PCLI Adoption.](intro_installation_fips.md#adopt-the-router-from-the-ssr-pcli)

2. Connect port 1 `ge0/0/1` (LAN) to your laptop, and statically assign your laptop port address 192.168.1.10.

3. Go to https://192.168.1.1 

4.  Then What??

### Additional Non-certified, Compatible 

![Generic appliance](/img/install_onbd_hdwr_generic.png)

Ports `ge0/0/0 – ge0/0/n` will be automatically mapped based on the internal PCI address order. The external ports are NOT likely to be physically ordered or labeled the same as the internal port numbering. Device port discovery is required!

1. Discover and document how each external port maps to each port for the device. Use as reference going forward in the deployment.

2. Connect `ge0/0/0` (WAN) to a network providing DHCP address assignment and outbound connectivity to Mist.

3. Connect `ge0/0/1` (LAN) to your laptop and statically assign your laptop port address `192.168.1.10`.

:::note
Port numbering can be re-mapped to match external layout if needed, however this requires SW install customization.
:::




