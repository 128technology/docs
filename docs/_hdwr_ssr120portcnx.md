
<!--- SSR 120 Hardware ---->
The following image of the SSR120 includes Cellular and TAA subvariants.
![Device Connections](/img/hdwr_ssr120_faceplate.png)

### Port Mapping Info

| Name | Port | Description | PCI Address | Speed | Type |
| --- | --- | --- | --- | --- | --- |
| ge-0-0 | Port 0 | WAN 1 network interface | 0000:04:00.1 | 1000 | WAN |
| ge-0-1 | Port 1 | WAN 2 network interface | 0000:04:00.0 | 1000 | WAN |
| ge-0-2 | Port 2 | WAN 3 network interface | 0000:03:00.1 | 1000 | WAN |
| ge-0-3 | Port 3 | LAN network interface | 0000:03:00.0 | 1000 | LAN |
| ge-0-4 | Port 4 | HA fabric network interface | 0000:02:00.1 | 1000 | HAFabric |
| ge-0-5 | Port 5 | HA sync network interface | 0000:02:00.0 | 1000 | HASync |

Your SSR device uses Port 0 (`ge-0-0`) as a default WAN port to contact Mist for zero-touch provisioning (ZTP). You will also be setting up Port 3 (`ge-0-3`) with a LAN network.

1. **Connect port 0** to an Ethernet WAN link capable of providing the device with:
    * DHCP address assignment
    * Connectivity to the Internet and Mist

2. **Connect port 3** to your LAN devices, including:
    * Mist-managed Juniper EX switches
    * Mist APs
    * User devices

3. **Power on the device**.

4. Use the [Mist Claim Code](wan_assurance_ssr120_quickstart.md#claim-your-device) to associate the device with a Mist Organization. 