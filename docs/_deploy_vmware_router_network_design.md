<!--- VMware Router Deployment Guide - Network Design Reference --->

The following IP addressing and naming scheme is used consistently throughout this guide. Substitute your own values when configuring your network.

| Parameter | Example Value | Description |
|-----------|--------------|-------------|
| Authority Name | `Authority128` | Organizational authority name |
| Conductor Name | `Conductor` | Pre-existing conductor system name |
| Conductor IP Address | `192.168.100.10` | Conductor IP — must be reachable from the router WAN |
| Router Name | `branch1` | VMware router system name |
| Router Node Name | `node0` | Router node name |
| Router Asset ID | `branch1` | Asset ID reported after initialization; see [Step 2](deploy_vmware_router_install.mdx#asset-id) |
| WAN Device Interface | `wan-dev` | WAN device interface name |
| WAN Network Interface | `wan1` | WAN network interface name |
| WAN PCI Address | _(discovered in [Step 3](deploy_vmware_router_pci.mdx))_ | VMXNet3 WAN NIC PCI address |
| LAN Device Interface | `lan-dev` | LAN device interface name |
| LAN Network Interface | `lan1` | LAN network interface name |
| LAN PCI Address | _(discovered in [Step 3](deploy_vmware_router_pci.mdx))_ | VMXNet3 LAN NIC PCI address |
| Router LAN IP Address | `192.168.1.1/24` | LAN gateway address |
| Tenant Name | `corp` | LAN-side user tenant |
| Service Name | `Internet-Traffic` | Internet breakout service |
| Service Address | `0.0.0.0/0` | All internet-bound traffic |
| Neighborhood | `internet` | SVR neighborhood name |
