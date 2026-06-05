<!--- VMware ESXi Conductor Deployment Guide - Network Design Reference --->

The following IP addressing and naming scheme is used consistently throughout this guide. Substitute your own values when configuring your network.

| Parameter | Example Value | Description |
|-----------|--------------|-------------|
| Authority Name | `Authority128` | Organizational authority name |
| Conductor Name | `Conductor` | Conductor system name |
| Conductor Node Name | `node0` | Conductor node name |
| Conductor Management IP | `192.168.100.10` | Static IP on the VMware management network |
| Conductor Subnet Mask | `/24` | Management network prefix |
| Conductor Gateway | `192.168.100.1` | Management network gateway |
| DNS Server | `8.8.8.8` | DNS used during initialization |
| Tenant Name | `corp` | LAN-side user tenant |
| Service Name | `Internet-Traffic` | Internet breakout service |
| Service Address | `0.0.0.0/0` | All internet-bound traffic |
