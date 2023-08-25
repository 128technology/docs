
<!--- SSR 1400 Hardware ---->

![Device Connections](/img/hdwr_ssr1400_faceplate.png)

### Port Mapping Info

| Name | Port | Description | PCI Address | Speed | Type |
| --- | --- | --- | --- | --- | --- |
| mgmt-0-0 | MGMT | Management interface | 0000:01:00.0 | 1000 | MGMT |
| xe-0-0 | Port 0/0 | WAN 1 network interface | 0000:6a:00.0 | 10000 | WAN |
| xe-0-1 | Port 0/1 | WAN 2 network interface | 0000:6a:00.1 | 10000 | WAN |
| xe-0-2 | Port 0/2 | WAN 3 network interface | 0000:6a:00.2 | 10000 | WAN |
| xe-0-3 | Port 0/3 | LAN 1 network interface | 0000:6a:00.3 | 10000 | LAN |
| ge-1-0 | Port 1/0 | HA Sync network interface | 0000:19:00.0 | 1000 | HASync |
| ge-1-1 | Port 1/1 | LAN 2 network interface | 0000:19:00.1 | 1000 | LAN |
| ge-1-2 | Port 1/2 | LAN 3 network interface | 0000:19:00.2 | 1000 | LAN |
| ge-1-3 | Port 1/3 | LAN 4 network interface | 0000:19:00.3 | 1000 | LAN |
| xe-2-0 | Port 2/0 | LAN 5 network interface | 0000:1b:00.0 | 10/25GB | LAN |
| xe-2-1 | Port 2/1 | LAN 6 network interface | 0000:1b:00.1 | 10/25GB | LAN |
| xe-2-2 | Port 2/2 | LAN 7 network interface | 0000:1b:00.2 | 10/25GB | LAN |
| xe-2-3 | Port 2/3 | HA Fabric network interface | 0000:1b:00.3 | 10/25GB | HAFabric |

Your SSR device uses Port 0/0 (`xe-0-0 `) as a default WAN port to contact Mist for zero-touch provisioning (ZTP). You will also be setting up Port 0/3 (`xe-0-3`) with a LAN network.

1. **Connect port 0** to an Ethernet WAN link capable of providing the device with:
    * DHCP address assignment
    * Connectivity to the Internet and Mist

2. **Connect port 0/3** to your LAN devices, including:
    * Mist-managed Juniper EX switches
    * Mist APs
    * User devices

3. **Power on the device**.

4. Use the [Mist Claim Code](wan_assurance_ssr120_quickstart.md#claim-your-device) to associate the device with a Mist Organization. 