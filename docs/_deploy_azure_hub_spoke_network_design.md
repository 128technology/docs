<!--- Azure Hub and Spoke Router Deployment Guide - Network Design Reference --->

The following IP addressing and naming scheme is used consistently throughout this guide. Substitute your own values when configuring your network.

| Parameter | Example Value | Description |
|-----------|--------------|-------------|
| Azure Region | `eastus` | Azure region for all deployed resources |
| Resource Group | `SSR-RG` | Azure resource group containing all resources |
| VNet Name | `SSR-VNet` | Virtual network address space `10.0.0.0/16` |
| Conductor Subnet | `ssr-conductor-subnet` | Conductor management subnet (`10.0.0.0/24`) |
| Conductor Private IP | `10.0.0.10` | Static private IP assigned within the conductor subnet |
| Conductor Public IP | `<auto-assigned>` | Azure-assigned public IP — used for SSH, GUI, and as the conductor address |
| Authority Name | `Authority128` | SSR organizational authority name |
| Conductor Name | `Conductor` | Conductor system name |
| Hub WAN Subnet | `ssr-hub-wan` | Hub router public (WAN) subnet (`10.0.1.0/24`) |
| Hub LAN Subnet | `ssr-hub-lan` | Hub router private (LAN) subnet (`10.0.2.0/24`) |
| Hub Router Name | `azure-hub-router` | Hub router system name |
| Hub Node Name | `node0` | Hub router node name |
| Hub WAN Device Interface | `wan-dev` | Hub WAN device interface name |
| Hub WAN Network Interface | `wan1` | Hub WAN network interface name |
| Hub LAN Device Interface | `lan-dev` | Hub LAN device interface name |
| Hub LAN Network Interface | `lan1` | Hub LAN network interface name |
| Hub LAN IP | `10.0.2.1/24` | LAN gateway address assigned to the hub LAN interface |
| Hub Tenant | `hub-corp` | Hub LAN-side user tenant |
| Spoke WAN Subnet | `ssr-spoke-wan` | Spoke router public (WAN) subnet (`10.0.3.0/24`) |
| Spoke LAN Subnet | `ssr-spoke-lan` | Spoke router private (LAN) subnet (`10.0.4.0/24`) |
| Spoke Router Name | `azure-spoke-router` | Spoke router system name |
| Spoke Node Name | `node0` | Spoke router node name |
| Spoke WAN Device Interface | `wan-dev` | Spoke WAN device interface name |
| Spoke WAN Network Interface | `wan1` | Spoke WAN network interface name |
| Spoke LAN Device Interface | `lan-dev` | Spoke LAN device interface name |
| Spoke LAN Network Interface | `lan1` | Spoke LAN network interface name |
| Spoke LAN IP | `10.0.4.1/24` | LAN gateway address assigned to the spoke LAN interface |
| Spoke Tenant | `spoke-corp` | Spoke LAN-side user tenant |
| Service Name | `Internet-Traffic` | Internet breakout service |
| Service Address | `0.0.0.0/0` | All internet-bound traffic |
| Neighborhood | `internet` | SVR peering neighborhood name |
