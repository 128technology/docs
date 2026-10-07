<!--- GCP Conductor Deployment Guide - Network Design Reference --->

The following IP addressing and naming scheme is used consistently throughout this guide. Substitute your own values when configuring your network.

| Parameter | Example Value | Description |
|-----------|--------------|-------------|
| Deployment Name | `conductor` | VM instance name displayed in GCP and the conductor UI |
| VPC | `conductor-vpc` | Global private network in GCP |
| Subnet | `conductor-subnet` | Regional segment within the VPC (`192.168.1.0/24`) |
| Internal IP | `192.168.1.2` | Conductor `nic0` private IP address assigned by GCP |
| External IP | `35.X.X.X` | Conductor `nic0` public IP address assigned by GCP |
| Authority Name | `Authority128` | Organizational authority name |
| Conductor Node Name | `node0` | Conductor node name |
