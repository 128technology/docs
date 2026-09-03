<!--- AWS Hub and Spoke Router Deployment Guide - Network Design Reference --->

The following IP addressing and naming scheme is used consistently throughout this guide. Substitute your own values when configuring your environment.

| Parameter | Example Value | Description |
|-----------|--------------|-------------|
| Authority Name | `Authority128` | Organizational authority name |
| Conductor Name | `Conductor` | Pre-existing conductor system name |
| Conductor Elastic IP | `203.0.113.10` | AWS Elastic IP — the address managed routers use to reach this conductor |
| SSR Version | `7.1.4` | SSR software version installed via BYOL |
| Tenant Name | `corp` | LAN-side user tenant (authority-wide) |
| Service Name | `Internet-Traffic` | Internet breakout service (authority-wide) |
| Service Address | `0.0.0.0/0` | All internet-bound traffic |
| Neighborhood Name | `internet` | Shared SVR neighborhood name |
| Hub Router Name | `aws-hub1` | Hub router system name |
| Hub Node Name | `node0` | Hub router node name |
| Hub Instance Type | `c5.xlarge` | AWS EC2 instance size |
| Hub VPC CIDR | `10.2.0.0/16` | AWS VPC for the hub router |
| Hub WAN Subnet | `10.2.1.0/24` | WAN (public) subnet in the hub VPC |
| Hub LAN Subnet | `10.2.2.0/24` | LAN (private) subnet in the hub VPC |
| Hub WAN Elastic IP | `203.0.113.30` | Elastic IP on the hub WAN ENI (external peering address) |
| Hub LAN IP | `10.2.2.1` | Static LAN gateway address on the hub |
| Hub WAN PCI Address | `0000:00:06.0` | PCI address of the hub WAN ENI (`eth1`) |
| Hub LAN PCI Address | `0000:00:07.0` | PCI address of the hub LAN ENI (`eth2`) |
| Spoke Router Name | `aws-spoke1` | Spoke router system name |
| Spoke Node Name | `node0` | Spoke router node name |
| Spoke Instance Type | `c5.xlarge` | AWS EC2 instance size |
| Spoke VPC CIDR | `10.1.0.0/16` | AWS VPC for the spoke router |
| Spoke WAN Subnet | `10.1.1.0/24` | WAN (public) subnet in the spoke VPC |
| Spoke LAN Subnet | `10.1.2.0/24` | LAN (private) subnet in the spoke VPC |
| Spoke WAN Elastic IP | `203.0.113.20` | Elastic IP on the spoke WAN ENI (external peering address) |
| Spoke LAN IP | `10.1.2.1` | Static LAN gateway address on the spoke |
| Spoke WAN PCI Address | `0000:00:06.0` | PCI address of the spoke WAN ENI (`eth1`) |
| Spoke LAN PCI Address | `0000:00:07.0` | PCI address of the spoke LAN ENI (`eth2`) |
