<!--- GCP Hub and Spoke Router Deployment Guide - Network Design Reference --->

The following IP addressing and naming scheme is used consistently throughout this guide. Substitute your own values when configuring your network.

| Parameter | Hub1 Example Value | Spoke1 Example Value | Description |
|-----------|--------------------|-----------------------|-------------|
| Deployment Name | `hub1` | `spoke1` | VM instance name displayed in GCP and the conductor UI. |
| WAN VPC | `hub-public-vpc` | `spoke-public-vpc` | GCP VPC for the router's WAN interface (`nic0`). |
| WAN Subnet | `hub-public-subnet` (`192.168.10.0/24`) | `spoke-public-subnet` (`192.168.20.0/24`) | Regional segment inside the WAN VPC. |
| LAN VPC | `hub-private-vpc` | `spoke-private-vpc` | GCP VPC for the router's LAN interface (`nic1`) and hosted workloads. |
| LAN Subnet | `hub-private-subnet` (`192.168.11.0/24`) | `spoke-private-subnet` (`192.168.21.0/24`) | Regional segment for the router's LAN interface. |
| Workload Subnet | `hub-workload-subnet` (`192.168.12.0/24`) | `spoke-workload-subnet` (`192.168.22.0/24`) | Regional segment, in the same LAN VPC, hosting the workloads reachable through the router's LAN interface. |
| WAN Internal IP | `192.168.10.2` | `192.168.20.2` | Router WAN interface private IP address assigned by GCP. |
| WAN External IP | `35.X.X.X` | `34.X.X.X` | Router WAN interface public IP address assigned by GCP, used for SVR adjacency between the hub and spoke. |
| LAN Internal IP | `192.168.11.2` | `192.168.21.2` | Router LAN interface private IP address assigned by GCP. |
| Conductor Control IP | `35.Y.Y.Y` | `35.Y.Y.Y` | Public IP of the pre-existing conductor used for router onboarding. |
| Router Node Name | `node0` | `node0` | Router node name. |
| Router Asset ID | `hub1` | `spoke1` | Asset ID assigned during onboarding. |
| WAN Device / Network Interface | `wan-dev` / `wan1` | `wan-dev` / `wan1` | WAN device and network interface names. |
| LAN Device / Network Interface | `lan-dev` / `lan1` | `lan-dev` / `lan1` | LAN device and network interface names. |
| Tenant Name | `hub-workloads` | `spoke-workloads` | Tenant representing the hosted workloads reachable through each router's LAN interface. |
| Service Name | `Hub-Workloads` | `Spoke-Workloads` | Service representing the hosted workload subnet(s) behind each router. |
| Internet Service | `Internet-Traffic` | `Internet-Traffic` | Default internet-bound service, address `0.0.0.0/0`. |
| Hub-Spoke Neighborhood | `svr-hub-spoke` | `svr-hub-spoke` | Neighborhood shared by both WAN interfaces — `Topology` set to `hub` on Hub1 and `spoke` on Spoke1. |
