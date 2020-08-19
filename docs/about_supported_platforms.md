---
title: Platform Support Policy
---

128 Technology software is designed to be abstracted from the underlying platform infrastructure, for maximum deployment flexibility. Each platform provides different capabilities and characteristics with regard to performance, functionality, and operating environment. 128 Technology strongly recommends that any combination of software and platform undergo a thorough certification process. The following describes the levels of support for platforms, and details the 128 Technology certification program.

## Terminology

For the purposes of describing the platform support policy, the following terms are defined:

- ***Platform*** - A physical or virtual system, typically consisting of some amount of resources for compute, memory, disk, and networking. _Example_: A physical server, virtual machine, or public cloud virtual machine instance.
- ***Certification*** - The process of testing to ensure that a specific combination of a 128T Networking Platform software version and platform build meet requirements for functionality, stability, and performance. _Example_: The [128T Certification Program](#128t-certification-program) provides certification of a set of platforms with 128T Networking Platform software.
- ***Certified Platform*** - A platform that is currently in the 128T Certification Program as a [128T Certified Plus Platform](#128t-certified-plus-platform), or [128T Certified Platform](#128t-certified-platform). _Example_: A specified build of Lenovo SR530 server is a certified platform.
- ***Qualified Platform*** - A platform that meets or exceeds [minimum platform specifications](#minimum-platform-specifications) and is known to be able to run 128T Networking Platform software. _Example_: A CompuLab fitlet2 with Intel Atom E3950, 8GB of memory, and 128GB of disk is a qualified platform.
- ***Compatible Platform*** - A platform that meets or exceeds [minimum platform specifications](#minimum-platform-specifications). _Example_: A platform with Intel Xeon D-1518, 8GB of memory, and 128GB of disk is a compatible platform.
- ***Incompatible Platform*** - A platform that does not meet [minimum platform specifications](#minimum-platform-specifications) and is unlikely to run 128T Networking Platform software at acceptable levels of functionality, stability, performance, or at all. _Example_: The [Apollo Guidance Computer](https://en.wikipedia.org/wiki/Apollo_Guidance_Computer) is an incompatible platform.

## 128T Certification Program

128 Technology continuously works to maintain a platform abstraction in its software design. At the same time, there are often characteristics and optimizations that require platform-specific support. This support comes by way of a platform certification program which provides assurances of performance and functionality of the 128T Networking Platform software. For example, the 128T Networking Platform software utilizes [DPDK](https://www.dpdk.org) for broad driver support, and in some cases specific firmware revisions need to be loaded prior to being able to fully utilize 128T's optimized packet forwarding capabilities.

Inclusion in the 128T Certification Program is based on a given platforms ability to continuously meet certain test and support criteria. New platforms are added to the program at 128 Technology's discretion. For details on how to get new platforms in to the 128T certification program, or further information regarding the program, please [contact](https://www.128technology.com/contact) 128 Technology.

### 128T Certified Plus Platform

The 128T Certification program provides a designation of Certified Plus for certain platforms. Certified Plus platforms have the following characteristics:

* 128T Networking Platform software is continuously tested on the platform for performance and functionality
* Complete build, including BIOS, DMI information, and labeling controlled by 128 Technology specification
* May include commitment to keep up with third-party supply chain and platform changes (end of life parts, BIOS changes, etc.)
* Supplier relationship established
* Includes performance benchmarking
* Supporting documentation as needed

#### LTE Certified

LTE certification is a superset of [128T Certified Plus](#128t-certified-plus-platform). Systems that contain an **onboard** LTE adapter are required to pass certification from the carrier.

LTE certified platforms have the following characteristics:
* Has obtained [PTCRB](https://en.wikipedia.org/wiki/PTCRB) (or [GCF](https://en.wikipedia.org/wiki/Global_Certification_Forum) in Europe) and mobile-carrier specific certification in the specified platform
:::note
Certification is tied to a specific LTE card, hardware platform, and 128T Networking Platform software version
:::
* If certification is not present, SIM card acquisition may be difficult from carrier in large quantities

### 128T Certified Platform

The 128T Certification program provides a designation of Certified for certain platforms. Certified platforms have the following characteristics:

* At least one version of 128T Networking Platform software has been tested on the platform for performance and functionality
* Supplier relationship may be established
* Includes performance benchmarking
* Supporting documentation as needed

### 128T Qualified Platform

The 128T Certification program provides a designation of Qualified for certain platforms.
:::note
128 Technology strongly recommends certification for any build in a production deployment. When a qualified platform is used, certification should be done by the end operator or a third-party. See [compatible platform support](#support-for-128t-on-compatible-platforms).
:::

Qualified platforms have the following characteristics:

* Meets [minimum platform specifications](#minimum-platform-specifications)
* 128T Networking Platform software has run on the device successfully in at least one customer environment
* No commitment to keep up with third-party supplier changes
* No commitment to support device on future 128T versions
* May require additional configuration upon implementation (vs. out of box experience)
* Performance benchmarking not provided
* Supporting documentation not provided

### 128T Compatible Platform

The 128T Certification program provides a [compatible platform guide](#128t-compatible-platforms-guide) for platforms which are compatible.
:::note
128 Technology strongly recommends certification for any build in a production deployment. When a compatible platform is used, certification should be done by the end operator or a third-party. See [compatible platform support](#support-for-128t-on-compatible-platforms).
:::

Compatible platforms have the following characteristics:
* Meets [minimum platform specifications](#minimum-platform-specifications)
* No commitment to keep up with third-party supplier changes
* No commitment to support device on future 128T versions
* May require additional configuration upon implementation (vs. out of box experience)
* Performance benchmarking not provided
* Supporting documentation not provided

#### 128T Compatible Platforms Guide

When selecting a compatible platform for a 128T router, the following provides some general guidance based on deployment use case.

| Use | CPU | Memory | Disk | Network Interface |
| --- | --- | --- | --- | --- |
| Small Branch Office | 4 Intel cores, single socket | 8 GB ECC | 64 GB SLC SSD | 4+ Physical NICs compatible with DPDK |
| Medium Branch Office | 8 Intel cores, single socket | 16 GB ECC | 64+ GB SLC SSD | 4+ Physical NICs compatible with DPDK |
| Large Branch Office | 16 Intel cores, single socket | 32 GB ECC | 240+ GB SLC SSD | 4+ Physical NICs compatible with DPDK |
| Head-end or Data center | 8+ Intel Xeon cores, single socket | 32 GB ECC | 240+ GB SLC SSD | 5+ Physical NICs compatible with DPDK |

##### BIOS Reccomendations

Platforms may have a varity of different features and capabilities configurable in the system BIOS. When running 128T on compatible platforms, the following a some BIOS settings reccomendations:
* Hyperthreading disabled for platform operating as a router
* Hyperthreading enabled for platform operating as a conductor
* Lan bypass disabled
* Wake on LAN disabled
* Date time format: UTC format / GMT time zone
* Power on setting: always on
* Setup prompt timeout value: 3 seconds
* Bboot mode: do not change manufacturer's settings (Legacy or UEFI accepted)
* Boot order: HDD, USB, PXE
* Watchdog time: enabled
* Power profile: maximum performance
* System version, release date, manufacturer's part number, and serial number set in DMI table

## Minimum Platform Specifications

These are the minimum platform specifications for running the 128T Networking Platform software.

### Router

* 4C Intel x86 processor, single socket
* 8GB ECC Memory
* 64GB SLC SSD
* 1 DPDK enabled NIC port for standalone systems (two recommended)
* 2 DPDK enabled NIC ports for HA systems (three recommended)
* 1 dedicated NIC port for HA synchronization
* (optional) 1 dedicated NIC port for out-of-band management
* Hyperthreading disabled

:::note
Multi-socket platforms are not compatible for a router.
:::

### Conductor

* 4C Intel processor
* 8GB ECC Memory
* 64GB SSD
* 1 (1G) Management port
* Hyperthreading enabled

## Support for 128T on Compatible Platforms

128 Technology will support the 128T Networking Platform software running on compatible third party platforms per the [product support policy](about_support_policy.md). 128 Technology will assist customers in problem analysis to determine whether or not the technical issue is related to the third-party platform or software. This includes platforms which are Certified Plus, Certified, Qualified, and Compatible. In order to isolate the issue, 128 Technology reserves the right to request that the third-party hardware or software be altered or removed. 128 Technology does not maintain the ability to test or reproduce issues found when running on compatible platforms, and reserves to right to request testing be done within a customer environment. If the root cause is believed to originate from a third-party vendor's product, the customer is required to open a support request with the third-party vendor's support organization independent of 128 Technology.

## Support for 128T on Incompatible Platforms

128 Technology provides no support, and commitments to functionality, stability, or performance of the 128T Networking Platform software on incompatible platforms.
