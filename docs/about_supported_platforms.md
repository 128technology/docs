---
title: Platform Support Policy
sidebar_label: Platform Support Policy
---

Juniper's Session Smart Router (SSR) software is optimized for use with the Session Smart Router portfolio of Juniper hardware. Juniper also certifies specific third-party hardware configurations for new customer deployments. Juniper continues to support existing installations of previously certified platforms listed in the [Certified Platform Status](about_certified_platforms.mdx) page. This page describes the support scope for current and legacy platforms.

## Terminology

For the purposes of describing the platform support policy, the following terms are defined:

- **Platform** - A physical or virtual system, typically consisting of some amount of resources for compute, memory, disk, and networking. For example: A physical server, virtual machine, or public cloud virtual machine instance.

- **Certified Platform** - A platform configuration with a locked-down SKU, bill of materials (BOM), BIOS, and DMI information. Certification applies only to the exact listed configuration.

- **Current Certified Platform** - A certified platform approved for new customer purchases and deployments.

- **Legacy Supported Platform** - A previously certified platform that Juniper continues to support for existing installations. Legacy supported platforms are not available to new customers for purchase or deployment.

- **Non-Certified Platform** - Any platform that has not been tested and approved for use by Juniper with SSR Networking software.

### Current Certified Platform

Current certified platforms have the following characteristics:

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

## Support for SSR on Current and Legacy Platforms

Juniper supports the SSR Networking Platform software on the current certified platform and on the listed legacy platforms for existing installations, per the [product support policy](about_support_policy.md). Support for legacy installations applies to all currently supported SSR releases. Juniper will assist customers in problem analysis to determine whether a technical issue is related to the third-party platform or Juniper software. To isolate the issue, Juniper reserves the right to request that the third-party hardware be altered or removed. If the root cause is believed to originate from a third-party vendor's product, the customer must open a support request with that vendor's support organization.

## Support for SSR on Non-Certified Platforms

Juniper does not support, or commit to the functionality, stability, or performance of the SSR Networking Platform software on platforms that are neither currently certified nor listed as legacy supported.

For current certified and legacy supported platforms, see [Certified Platform Status](about_certified_platforms.mdx).
