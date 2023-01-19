<!---- SSR 130 Port Connections ---->
The following image of the SSR130 includes Cellular and TAA subvariants.
![Device Connections](/img/hdwr_ssr130_faceplate.png)

Your SSR device uses port 0 (`ge-0/0`) as a default WAN port to contact Mist for zero-touch provisioning (ZTP). You will also be setting up port 3 (`ge-0/3`) with a LAN network.

1. **Connect port 0** to an Ethernet WAN link capable of providing the device with:
    * DHCP address assignment
    * Connectivity to the Internet and Mist

2. **Connect port 3** to your LAN devices, including:
    * Mist-managed Juniper EX switches
    * Mist APs
    * User devices

3. **Power on the device**.

4. Use the [Mist Claim Code](wan_assurance_ssr130_quickstart.md#claim-your-device) to associate the device with a Mist Organization. 
