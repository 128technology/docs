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
| Tenant Name | `corp` | LAN-side user tenant |
| Service Name | `Internet-Traffic` | Internet breakout service |
| Service Address | `0.0.0.0/0` | All internet-bound traffic |
| Neighborhood | `internet` | SVR peering neighborhood name |
