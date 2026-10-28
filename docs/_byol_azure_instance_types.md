<!--- BYOL Azure Instance Types -->

The following instance types are supported for virtual SSR in Azure. Choose the size that best meets your requirements. More information can be found in the [Azure Documentation](https://learn.microsoft.com/en-us/azure/virtual-machines/sizes).

| Azure Instance Type | Comperable SSR Model | Max vNICs Supported | vCPU Cores | Memory (GiB) | MANA Required |
| --- | --- | --- | --- | --- | --- |
| Standard_F8s_v2   |  --       |  4   |  8   | 16 | No |
| Standard_F16s_v2  |  SSR130   |  4   |  16  | 32 | No |
| Standard_F32s_v2  |  --       |  8   |  32  | 64 | No |
| Standard_D8s_v5   |  --       |  4   |  8   | 32 | No |
| Standard_F4as_v7  | SSR120, SSR400, SSR440 |  4   |  4   | 16 | Yes |
| Standard_F8as_v7  | SSR130  |  8   |  8   | 32  | Yes |
| Standard_E8s_v7   | SSR1200 |  4   |  8   | 64  | Yes |
| Standard_E16s_v7  | SSR1300 |  8   |  16  | 128 | Yes |
| Standard_E32s_v7  | SSR1400 |  8   |  32  | 256 | Yes |
| Standard_E64s_v7  | SSR1500 |  8   |  64  | 512 | Yes |

Session Smart Router Size recommendatations can be found in [System Requirements](intro_system_reqs.md).
:::warning
Microsoft Azure Network Adapter (MANA) will be supported by SSR software in a future release. See the [knowledge base article](../kb/2026/10/19/azure-mana-field-alert) for more information.
:::
:::note
Recommendations are based strictly on hardware equivalency, matching vCPU and memory specifications of physical SSR appliance models models
:::
