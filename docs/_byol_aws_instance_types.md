<!--- BYOL AWS Instance Types -->

The following instance sizes are supported for virtual SSR in AWS. Choose the size that best meets your requirements. More information can be found in the [AWS Documentation](https://docs.aws.amazon.com/ec2/latest/instancetypes/instance-types.html)

| AWS Instance Type | Comperable SSR Model | Max vNICs Supported | vCPU Cores | Memory (GiB) |
| ----------------- | -------------------- | ------------------- | ------ | -- |
| c5n.xlarge        |  SSR120, SSR400, SSR440 | 4  |  4    |   10.5  |
| c5n.2xlarge       |  SSR130                 | 4  |  8    |   21  |
| r8in.2xlarge      |  SSR1200                | 4  |  8    |   64  |
| r8in.4xlarge      |  SSR1300                | 8  |  16   |   128  |
| r8in.8xlarge      |  SSR1400                | 8  |  32   |   256  |
| r8in.16xlarge     |  SSR1500                | 8  |  64   |   512  |

Session Smart Router Size recommendatations can be found in [System Requirements](intro_system_reqs.md).

:::note
Recommendations are based strictly on hardware equivalency, matching vCPU and memory specifications of physical SSR appliance models models
:::