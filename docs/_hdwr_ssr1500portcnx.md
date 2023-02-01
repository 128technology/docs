
<!--- SSR 1500 Hardware ---->

![Device Connections](/img/hdwr_ssr1500_faceplate.png)

### Port Mapping Info

| Name | Port | Description | PCI Address | Speed | Type |
| --- | --- | --- | --- | --- | --- |
| mgmt-0-0 | MGMT | Management interface | 0000:41:00.0 | 1000 | MGMT |
| ge-1-0 | Port 1/0 | WAN 1 network interface | 0000:44:00.0 | 1000 | WAN |
| ge-1-1 | Port 1/1 | WAN 2 network interface | 0000:44:00.1 | 1000 | WAN |
| ge-1-2 | Port 1/2 | WAN 3 network interface | 0000:44:00.2 | 1000 | WAN |
| ge-1-3 | Port 1/3 | HA Sync network interface | 0000:44:00.3 | 1000 | HASync |
| xe-2-0 | Port 2/0 | HA Fabric network interface | 0000:42:00.0 | 10000 | HAFabric |
| xe-2-1 | Port 2/1 | LAN 1 network interface | 0000:42:00.1 | 10000 | LAN |
| xe-2-2 | Port 2/2 | LAN 2 network interface | 0000:42:00.2 | 10000 | LAN |
| xe-2-3 | Port 2/3 | LAN 3 network interface | 0000:42:00.3 | 10000 | LAN |
| xe-3-0 | Port 3/0 | LAN 4 network interface | 0000:81:00.0 | 10000 | LAN |
| xe-3-1 | Port 3/1 | LAN 5 network interface | 0000:81:00.1 | 10000 | LAN |
| xe-3-2 | Port 3/2 | LAN 6 network interface | 0000:81:00.2 | 10000 | LAN |
| xe-3-3 | Port 3/3 | LAN 7 network interface | 0000:81:00.3 | 10000 | LAN |
| xe-4-0 | Port 4/0 | LAN 8 network interface | 0000:c1:00.0 | 10000 | LAN |
| xe-4-1 | Port 4/1 | LAN 9 network interface | 0000:c1:00.1 | 10000 | LAN |
| xe-4-2 | Port 4/2 | LAN 10 network interface | 0000:c1:00.2 | 10000 | LAN |
| xe-4-3 | Port 4/3 | LAN 11 network interface | 0000:c1:00.3 | 10000 | LAN |

Your SSR device uses Port 1/0 (`ge-1-0 `) as a default WAN port to contact Mist for zero-touch provisioning (ZTP). You will also be setting up Port 2/1 (`xe-2-1`) with a LAN network.

1. **Connect port 0** to an Ethernet WAN link capable of providing the device with:
    * DHCP address assignment
    * Connectivity to the Internet and Mist

2. **Connect port 2/1** to your LAN devices, including:
    * Mist-managed Juniper EX switches
    * Mist APs
    * User devices

3. **Power on the device**.

4. Use the [Mist Claim Code](wan_assurance_ssr120_quickstart.md#claim-your-device) to associate the device with a Mist Organization. 