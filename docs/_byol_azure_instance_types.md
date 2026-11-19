<!--- BYOL Azure Instance Types -->

The following instance types are supported for virtual SSR in Azure. Choose the size that best meets your requirements. More information can be found in the [Azure Documentation](https://learn.microsoft.com/en-us/azure/virtual-machines/sizes).

| Azure Instance Type | Max vNICs Supported | vCPU Cores | Memory (GiB) |
| --- | --- | --- | --- |
| Standard_F8s_v2   |  4   |  8   | 16 |
| Standard_F16s_v2  |  4   |  16  | 32 |
| Standard_F32s_v2  |  8   |  32  | 64 |
| Standard_D8s_v5   |  4   |  8   | 32 |

These recommendations are based strictly on hardware equivalency, matching vCPU and memory specifications of physical SSR appliance models. Session Smart Router hardware size recommendations can be found in [System Requirements](intro_system_reqs.md).
