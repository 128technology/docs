<!--- BYOL GCP Instance Types -->
The following instance types are supported for virtual SSR in GCP. Choose the size that best meets your requirements. More information on GCP instance types can be found in the [GCP Documentation](https://docs.cloud.google.com/compute/docs/compute-optimized-machines#c2_machine_types).

| GCP Instance Type | Comperable SSR Model | Max vNICs Supported | vCPU Cores | Memory (GiB) |
| --- | --- | --- | --- | --- |
| c2-standard-4  |  SSR120, SSR400, SSR440  |  4    |  4   | 16  |
| c2-standard-8  | SSR130                   |  8    |  8   | 32  |
| n2-highmem-8   | SSR1200                  |  8    |  8   | 64  |
| n2-highmem-16  | SSR1300                  |  10   |  16  | 128 |
| n2-highmem-32  | SSR1400                  |  10   |  32  | 256 |
| n2-highmem-64  | SSR1500                  |  10   |  64  | 512 |

Session Smart Router Size recommendatations can be found in [System Requirements](intro_system_reqs.md).

:::note
Recommendations are based strictly on hardware equivalency, matching vCPU and memory specifications of physical SSR appliance models models
:::