<!--- Deployment Guide - Network Design Reference Table --->

The following IP addressing and naming scheme is used consistently throughout this guide. Substitute your own values when configuring your network.

| Parameter | Example Value | Description |
|-----------|--------------|-------------|
| Authority Name | `AcmeCorp` | Organizational authority name |
| Conductor Router Name | `conductor1` | Conductor system name |
| Conductor Node Name | `node1` | Conductor node name |
| Conductor IP Address | `192.168.100.10` | Static management IP on the conductor |
| Conductor Subnet Mask | `/24` | Management network prefix |
| Conductor Gateway | `192.168.100.1` | Management network gateway |
| Conductor PCI (MGMT port) | `0000:03:00.0` | SSR1200 MGMT port PCI address |
| Router Name | `branch1` | Branch router system name |
| Router Node Name | `node1` | Router node name |
| Router WAN Interface | `wan1` (`ge-0-0`) | WAN port — uses DHCP |
| Router WAN PCI Address | `0000:04:00.3` | SSR130 Port 0 PCI address |
| Router LAN Interface | `lan1` (`ge-0-3`) | LAN port |
| Router LAN PCI Address | `0000:04:00.0` | SSR130 Port 3 PCI address |
| Router LAN IP Address | `192.168.1.1/24` | LAN gateway address |
| Tenant Name | `corp` | LAN-side user tenant |
| Service Name | `internet` | Internet breakout service |
| Service Address | `0.0.0.0/0` | All internet-bound traffic |
| Neighborhood | `internet` | SVR neighborhood name |
