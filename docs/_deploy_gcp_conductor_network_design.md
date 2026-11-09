<!--- GCP Conductor Deployment Guide - Network Design Reference --->

The following IP addressing and naming scheme is used consistently throughout this guide. Substitute your own values when configuring your network.

| Parameter | Example Value | Description |
| --- | --- | --- |
| Deployment Name | `conductor` | VM instance name displayed in GCP and the conductor UI |
| Service Account | `service-account` | Creates a service account with the required IAM roles automatically. |
| Machine Type | `c2-standard-8` | GCP machine type for the Conductor VM (for example, c2-standard-8). |
| Region | us-east1 | GCP region for the Conductor deployment. |
| Zone | us-east1-b | GCP zone within the selected region. |
| Boot Disk Size | `60` | Boot disk size in GB. Minimum 60 GB is recommended. |
| SSR Mode | `conductor` | Conductor deployment. |
| SSR Version | `7.1.4` | SSR software version to be installed. |
| Admin Allowed CIDR | `0.0.0.0/0` | Source CIDR allowed for SSH and HTTPS administration. |
| SSH Public Key | Paste the SSH public key you created earlier. | Public SSH key added for administrator access. |
| SSR Software Access Username | ssr_software_access_username | Username for BYOL repository access. |
| SSR Software Access Token | ssr_software_access_username | Token/password for BYOL repository access. |
| Control Allowed CIDR | `0.0.0.0/0` | Source CIDR allowed to reach the Conductor control interface on ports 930, 4505, and 4506.. |
| Control Interface Network | `conductor-vpc` | VPC network name used by the Conductor control interface. |
| Control Interface Subnet | `conductor-subnet` | Subnet name used by the Conductor control interface. |
| Internal IP | `192.168.1.2` | Conductor `nic0` private IP address assigned by GCP |
| External IP | `35.X.X.X` | Conductor `nic0` public IP address assigned by GCP |
| Authority Name | `Authority128` | Organizational authority name |
| Conductor Node Name | `node0` | Conductor node name |