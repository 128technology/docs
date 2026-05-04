<!--- Deployment Guide - Network Design Reference Table --->

The following IP addressing and naming scheme is used consistently throughout this guide. Substitute your own values when configuring your network.

| Parameter | Example Value | Description |
|-----------|--------------|-------------|
| Authority Name | `AcmeCorp` | Organizational authority name |
| Conductor Router Name | `conductor1` | Conductor system name |
| Conductor Node Name | `node0` | Conductor node name |
| Conductor IP Address | `192.168.100.10` | Static management IP on the conductor |
| Conductor Subnet Mask | `/24` | Management network prefix |
| Conductor Gateway | `192.168.100.1` | Management network gateway |
| Router Name | `branch1` | Branch router system name |
| Router Node Name | `node0` | Router node name |
| Router WAN Interface | `wan1` (`ge-0-0`) | WAN port — uses DHCP |
| Router LAN Interface | `lan1` (`ge-0-3`) | LAN port |
| Router LAN IP Address | `192.168.1.1/24` | LAN gateway address |
| Tenant Name | `corp` | LAN-side user tenant |
| Service Name | `internet` | Internet breakout service |
| Service Address | `0.0.0.0/0` | All internet-bound traffic |
| Neighborhood | `internet` | SVR neighborhood name |
