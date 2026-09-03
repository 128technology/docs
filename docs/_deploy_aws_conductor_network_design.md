<!--- AWS Conductor Deployment Guide - Network Design Reference --->

The following IP addressing and naming scheme is used consistently throughout this guide. Substitute your own values when configuring your environment.

| Parameter | Example Value | Description |
|-----------|--------------|-------------|
| Authority Name | `Authority128` | Organizational authority name |
| Conductor Name | `Conductor` | Conductor system name |
| Conductor Node Name | `node0` | Conductor node name |
| Conductor Instance Type | `c5.xlarge` | AWS EC2 instance size |
| Conductor VPC CIDR | `10.0.0.0/16` | AWS VPC for the conductor |
| Conductor Subnet CIDR | `10.0.1.0/24` | Control subnet within the conductor VPC |
| Conductor Private IP | `10.0.1.10` | Private IP assigned to the conductor ENI |
| Conductor Elastic IP | `203.0.113.10` | AWS Elastic IP — the address managed routers use to reach this conductor |
| SSR Version | `7.1.4` | SSR software version installed via BYOL |
| Tenant Name | `corp` | LAN-side user tenant |
| Service Name | `Internet-Traffic` | Internet breakout service |
| Service Address | `0.0.0.0/0` | All internet-bound traffic |
| Router Name | `aws-branch1` | Example router name |
| Router Node Name | `node0` | Router node name |
| Router Instance Type | `c5.xlarge` | AWS EC2 instance size |
| Router WAN Subnet | `10.1.1.0/24` | WAN (public) subnet in the router VPC |
| Router LAN Subnet | `10.1.2.0/24` | LAN (private) subnet in the router VPC |
| Router WAN Elastic IP | `203.0.113.20` | Elastic IP on the router WAN ENI (external peering address) |
| Router LAN IP | `10.1.2.1` | Static LAN gateway address on the router |
