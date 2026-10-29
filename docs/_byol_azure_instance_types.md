<!--- BYOL Azure Instance Types -->

The following instance types are supported for virtual SSR in Azure. Choose the size that best meets your requirements. More information can be found in the [Azure Documentation](https://learn.microsoft.com/en-us/azure/virtual-machines/sizes).

| Azure Instance Type | Comparable SSR Model | Max vNICs Supported | vCPU Cores | Memory (GiB) | MANA Required |
| --- | --- | --- | --- | --- | --- |
| Standard_F8s_v2   |  --       |  4   |  8   | 16 | No |
| Standard_F16s_v2  |  --       |  4   |  16  | 32 | No |
| Standard_F32s_v2  |  --       |  8   |  32  | 64 | No |
| Standard_D8s_v5   |  --       |  4   |  8   | 32 | No |

These recommendations are based strictly on hardware equivalency, matching vCPU and memory specifications of physical SSR appliance models. Session Smart Router hardware size recommendations can be found in [System Requirements](intro_system_reqs.md).

:::important
MANA support for vSSR is required for instance sizes comparable to most SSR hardware platforms. However, MANA support for vSSR is not yet available. HPE Networking is targeting support for MANA-enabled hardware in SSR version 7.3.3-r2 (and higher).

For additional information regarding MANA support, see the [Azure MANA Compatibility Knowledge Base article](../kb/2026/10/19/azure-mana-field-alert) for more information.
:::