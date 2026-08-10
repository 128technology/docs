<!--- Azure Conductor Deployment Guide - Network Design Reference --->

The following IP addressing and naming scheme is used consistently throughout this guide. Substitute your own values when configuring your network.

| Parameter | Example Value | Description |
|-----------|--------------|-------------|
| Azure Region | `eastus` | Azure region for all deployed resources |
| Resource Group | `SSR-RG` | Azure resource group containing all resources |
| VNet Name | `SSR-VNet` | Virtual network address space `10.0.0.0/16` |
| Conductor Subnet | `ssr-conductor-subnet` | Conductor management subnet (`10.0.0.0/24`) |
| Conductor Private IP | `10.0.0.10` | Static private IP assigned within the conductor subnet |
| Conductor Gateway | `10.0.0.1` | Conductor subnet gateway |
| Conductor Public IP | `<auto-assigned>` | Azure-assigned public IP — used for SSH, GUI, and as the conductor address |
| Authority Name | `Authority128` | SSR organizational authority name |
| Conductor Name | `Conductor` | Conductor system name |
| Conductor Node Name | `node0` | Conductor node name |
| Router WAN Subnet | `ssr-router-wan` | Router public (WAN) subnet (`10.0.1.0/24`) |
| Router LAN Subnet | `ssr-router-lan` | Router private (LAN) subnet (`10.0.2.0/24`) |
| Router Name | `azure-router-1` | Router system name |
| Router Node Name | `node0` | Router node name |
| WAN Device Interface | `wan-dev` | WAN device interface name |
| WAN Network Interface | `wan1` | WAN network interface name |
| LAN Device Interface | `lan-dev` | LAN device interface name |
| LAN Network Interface | `lan1` | LAN network interface name |
| Router LAN IP | `10.0.2.1/24` | LAN gateway address assigned to the router LAN interface |
| Tenant Name | `corp` | LAN-side user tenant |
| Service Name | `Internet-Traffic` | Internet breakout service |
| Service Address | `0.0.0.0/0` | All internet-bound traffic |
| Neighborhood | `internet` | SVR peering neighborhood name |
