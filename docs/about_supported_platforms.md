---
title: Platform Support Policy
---

Juniper's Session Smart Router (SSR) software is optimized for use with the Session Smart Router portfolio of Juniper hardware. For additional flexibility, Juniper also offers specific, pre-certified platforms that can be purchased via third party hardware partners. Each platform provides different capabilities and characteristics with regard to performance, functionality, and operating environment. The following describes the level of support for the certified portfolio platforms, and details the Juniper certified portfolio program.

## Terminology

For the purposes of describing the platform support policy, the following terms are defined:


- **Platform** - A physical or virtual system, typically consisting of some amount of resources for compute, memory, disk, and networking. _Example_: A physical server, virtual machine, or public cloud virtual machine instance.

- **Certified Platform** - A platform that has a locked down SKU, BOM, and BIOS through the manufacturer, and has passed Juniper certification testing to ensure that a specific combination of an SSR Networking Platform software version and platform build meet requirements for functionality, stability, and performance. Only the SKU's listed below ensure a Certified experience with Conductor- and Mist-managed deployments.

- **Non-Certified Platform** - Any platform that has not been tested and approved for use by Juniper with SSR Networking software.

## SSR Certification Program

Juniper continuously works to maintain a platform abstraction in its software design. At the same time, there are often characteristics and optimizations that require platform-specific support. This support comes by way of a platform certification program which provides assurances of performance and functionality of the SSR Networking Platform software. For example, the SSR Networking Platform software utilizes [DPDK](https://www.dpdk.org) for broad driver support, and in some cases specific firmware revisions need to be loaded prior to being able to fully utilize the SSR's optimized packet forwarding capabilities.

Inclusion in the SSR Certification Program is based on a given platforms ability to continuously meet certain test and support criteria. New platforms are added to the program at Juniper's discretion. For details on how to get new platforms in to the SSR certification program, or further information regarding the program, please contact Juniper support.

### SSR Certified Platform

The SSR Certification program provides a designation of Certified for certain platforms. CCertified platforms within the portfolio have the following characteristics:

- SSR Networking software is continuously tested on the platform for performance and functionality with each new major release.

- The complete SKU build, including BOM, BIOS, and DMI information, is controlled by Juniper specification.

- May include pre-established Mist template for ease of onboarding.

- May include commitment to keep up with third-party supply chain and platform changes (end of life parts, BIOS changes, etc.).

- Supplier relationship is established for facilitation of purchasing and support.

- Includes performance benchmarking for ease of scoping.

- Supporting documentation can be provided as needed.

#### LTE Certified

LTE certification is a superset of an SSR Certified Platform. Systems that contain an **onboard** LTE adapter are required to pass certification from the carrier.

LTE certified platforms have the following characteristics:
- Has obtained [PTCRB](https://en.wikipedia.org/wiki/PTCRB) (or [GCF](https://en.wikipedia.org/wiki/Global_Certification_Forum) in Europe) and mobile-carrier specific certification in the specified platform
:::note
Certification is tied to a specific LTE card, hardware platform, and SSR Networking Platform software version
:::
- If certification is not present, SIM card acquisition may be difficult from carrier in large quantities

<!---
### SSR Compatible Platform

The SSR Certification program provides a [compatible platform guide](#ssr-compatible-platforms-guide) for platforms which are compatible.
:::note
Juniper strongly recommends certification for any build in a production deployment. When a compatible platform is used, certification should be done by the end operator or a third-party. See [compatible platform support](#support-for-ssr-on-compatible-platforms).
:::

Compatible platforms have the following characteristics:
* Meets [minimum platform specifications](#minimum-platform-specifications)
* No commitment to keep up with third-party supplier changes
* No commitment to support device on future SSR versions
* May require additional configuration upon implementation (vs. out of box experience)
* Performance benchmarking not provided
* Supporting documentation not provided

#### SSR Compatible Platforms Guide

When selecting a compatible platform for an SSR router, the following provides some general guidance based on deployment use case.

| Use | CPU | Memory | Disk | Network Interface |
| --- | --- | --- | --- | --- |
| Small Branch Office | 4 Intel cores, single socket | 8 GB ECC | 120 MLC* GB SSD | 4+ Physical NICs compatible with DPDK |
| Medium Branch Office | 8 Intel cores, single socket | 16 GB ECC | 120+ MLC* GB SSD | 4+ Physical NICs compatible with DPDK |
| Large Branch Office | 16 Intel cores, single socket | 32 GB ECC | 240+ GB MLC* SSD | 4+ Physical NICs compatible with DPDK |
| Head-end or Data center | 8+ Intel Xeon cores, single socket | 32 GB ECC | 240+ GB MLC* SSD | 5+ Physical NICs compatible with DPDK |

:::note
\* MLC drives are recomended where possible. SSD Endurance is important, all drives to be used should have a reasonable minimum TBW rating for production deployments.
:::

#### Compatible Platform BIOS Recommendations

Platforms may have a variety of different features and capabilities configurable in the system BIOS. When running SSR on compatible platforms, the following are the recommended BIOS settings:
* Hyperthreading disabled for platform operating as a router
* Hyperthreading enabled for platform operating as a conductor
* LAN bypass disabled
* Wake on LAN disabled
* Date time format: UTC format / GMT time zone
* Power on setting: always on
* Setup prompt timeout value: 3 seconds
* Boot mode: do not change manufacturer's settings (Legacy or UEFI accepted)
* Boot order: HDD, USB, PXE
* Watchdog timer: disabled
* SR-IOV: enabled
* Secure Boot: disabled
* Serial Port Baud Rate: 115200/8-n-1 (To be used for console installation)
* Power profile: maximum performance
* System version, release date, manufacturer's part number, and serial number set in DMI table

--->

## Minimum Platform Specifications

These are the minimum platform specifications for running the SSR Networking Platform software.

### Router

* Intel 4 Core x86 processor, single socket
* 8GB ECC Memory
* 120GB SSD
* 1 DPDK enabled NIC port for standalone systems (two recommended)
* 2 DPDK enabled NIC ports for HA systems (three recommended)
* 1 dedicated NIC port for HA synchronization
* (optional) 1 dedicated NIC port for out-of-band management
* Hyperthreading disabled

:::note
Multi-socket platforms are not compatible with the SSR software when run as a router.
:::

### Conductor

* Intel 4 Core x86 processor
* 8GB ECC Memory
* 120GB SSD
* 1 (1G) Management port
* Hyperthreading enabled

## Support for SSR on Compatible Platforms

Juniper supports the SSR Networking Platform software running on SKUs listed under the Certified Portfolio per the [product support policy](about_support_policy.md). Juniper will assist customers in problem analysis to determine whether or not the technical issue is related to the third-party platform or Juiper software. This only includes platforms which have been Certified by Juniper. In order to isolate the issue, Juniper reserves the right to request that the third-party hardware be altered or removed.  If the root cause is believed to originate from a third-party vendor's product, the customer is required to open a support request with the third-party vendor's support organization independent of Juniper.

## Support for SSR on Incompatible Platforms

Juniper provides no support, or commitments to functionality, stability, or performance of the SSR Networking Platform software on incompatible platforms.
