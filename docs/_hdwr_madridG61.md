<!--- Silicom Madrid 90500-0151-G61---->


![Silicom Madrid](/img/install_onbd_hdwr_silicom.png)

1. Connect port 6 `ge0/0/6` (WAN) to a network providing DHCP address assignment, and outbound connectivity to Mist. If you are adopting using the PCLI `adopt` command, proceed to [PCLI Adoption.](intro_installation_image.md#adopt-the-router-from-the-ssr-pcli)

2. Connect port 3 `ge0/0/3` (LAN) to your laptop, and statically assign your laptop port address 192.168.3.10.

3. Go to `https://192.168.3.1 `

4. Log in to the router and use one of the following ways to associate the device with a Mist organization.
    * [GUI through LAN port.](intro_installation_image.md#associate-the-router-with-mist)
    * [PCLI `adopt`command.](intro_installation_image.md#adopt-the-router-from-the-ssr-pcli)


| Name | Description | PCI Address | Speed | Type |
| --- | --- | --- | --- | --- |
| ge-0-1 | WAN 1 network interface, connected to port 1 labeled on the device | 0000:02:00.1 | 1000 | WAN |
| ge-0-2 | WAN 2 network interface, connected to port 2 labeled on the device | 0000:02:00.0 | 1000 | WAN |
| ge-0-3 | WAN 3 network interface, connected to port 3 labeled on the device | 0000:03:00.1 | 1000 | WAN |
| ge-0-4 | LAN network interface, connected to port 4 labeled on the device | 0000:03:00.0 | 1000 | LAN |
| ge-0-5 | HA fabric network interface, connected to port 5 labeled on the device | 0000:04:00.1 | 1000 | HAFabric |
| ge-0-6 | HA sync network interface, connected to port 6 labeled on the device | 0000:04:00.0 | 1000 | HASync |

