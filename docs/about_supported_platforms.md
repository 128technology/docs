---
title: Platform Support Policy
sidebar_label: Platform Support Policy
---

Juniper's Session Smart Router (SSR) software is optimized for use with the Session Smart Router portfolio of Juniper hardware. For additional flexibility, Juniper also offers specific, pre-certified platforms that can be purchased via third party hardware partners. Each platform provides different capabilities and characteristics with regard to performance, functionality, and operating environment. The following describes the level of support for the certified portfolio platforms, and details the Juniper certified portfolio program.

## Terminology

For the purposes of describing the platform support policy, the following terms are defined:

- **Platform** - A physical or virtual system, typically consisting of some amount of resources for compute, memory, disk, and networking. For example: A physical server, virtual machine, or public cloud virtual machine instance.

- **Certified Platform** -Pre-tested platform that has a locked down SKU, BOM, BIOS through the manufacturer. Must utilize exact SKU to ensure Certified experience via Conductor and Mist.

- **Non-Certified Platform** - Any platform that has not been tested and approved for use by Juniper with SSR Networking software.

### SSR Certified Platform

Certified platforms within the portfolio have the following characteristics:

- SSR Networking software is continuously tested on the platform for performance and functionality with each new major release.

- The complete SKU build, including BOM, BIOS, and DMI information, is controlled by Juniper specification.

- May include pre-established Mist template for ease of onboarding.

- May include commitment to keep up with third-party supply chain and platform changes (end of life parts, BIOS changes, etc.).

- Supplier relationship is established for facilitation of purchasing and support.

- Includes performance benchmarking for ease of scoping.

- Supporting documentation can be provided as needed.

#### LTE Certified

Systems that contain an **on board** LTE adapter are required to pass certification from the carrier.

LTE certified platforms have the following characteristics:
- Has obtained [PTCRB](https://en.wikipedia.org/wiki/PTCRB) (or [GCF](https://en.wikipedia.org/wiki/Global_Certification_Forum) in Europe) and mobile-carrier specific certification in the specified platform.
:::note
Certification is tied to a specific LTE card, hardware platform, and SSR Networking Platform software version.
:::
- If certification is not present, SIM card acquisition may be difficult from the carrier in large quantities.

## Support for SSR on Certified Platforms

Juniper supports the SSR Networking Platform software running on SKUs listed under the Certified Portfolio per the [product support policy](about_support_policy.md). Juniper will assist customers in problem analysis to determine whether or not the technical issue is related to the third-party platform or Juiper software. This only includes platforms which have been Certified by Juniper. In order to isolate the issue, Juniper reserves the right to request that the third-party hardware be altered or removed.  If the root cause is believed to originate from a third-party vendor's product, the customer is required to open a support request with the third-party vendor's support organization independent of Juniper.

## Support for SSR on Non-Certified Platforms

Juniper provides no support, or commitments to functionality, stability, or performance of the SSR Networking Platform software on platforms that have not been certified.

For a complete listing of certified plaforms, please see our [Certified Portfolio](about_certified_platforms.md).
