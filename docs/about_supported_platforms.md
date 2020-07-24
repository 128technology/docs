---
title: Platform Support Policy
---

128 Technology software is designed to be abstracted from the underlying platform infrastructure, for maximum deployment flexibility. Each platform provides different capabilities and characteristics with regard to performance, functionality, and operating environment. 128 Technology strongly reccomends that any combination of software and platform undergo a thorough certification process, and certain platforms are maintained within 128 Technology's own certification program. The following describes the levels of support for platforms, and details the 128 Technology certification program.

## Terminology

For the purposes of describing the platform support policy, the following terms are defined:

- ***Platform*** - A physical or virtual system, typically consisting of some amount of resources for compute, memory, disk, and networking. *Example*: A physical server, virtual machine, or public cloud virtual machine instance.
- ***Certification*** - The process of testing to ensure that a specific combination of a 128T software version and platform build meet requirements for functionality, stability, and performance. *Example*: The [128T Certification Program](#128t-certification-program) provides certification of a set of platforms with 128T software.
- ***Certified Platform*** - A platform that is currently in the 128T Certification Program as a [128T Certified Platform](#128t-certified-platform). *Example*: A specified build of Lenovo SR530 server is a certified platform.
- ***Compatible Platform*** - A platform that meets or exceeds [minimum platform specifications](#minimum-platform-specifications) and is known to be able to run 128T software. *Example*: A Compulabs fitlet2 with Intel Atom E3950, 8GB of memory, and 128GB of disk is a compatible platform.
- ***Incompatible Platform*** - A platform that does not meet [minimum platform specifications](#minimum-platform-specifications) and is unlikely to run 128T software at acceptible levels of functionality, stability, performance, or at all. *Example*: The [Apollo Guidance Computer](https://en.wikipedia.org/wiki/Apollo_Guidance_Computer) is an incompatible platform.

## 128T Certification Program

128 Technology continuously works to maintain a platform abstraction in its software design. At the same time, there are often characteristics and optimizations that require platform-specific support. This support comes by way of a platform certification program which provides assurances of performance and function of the 128T software. For example, the 128T software utilizes [DPDK](https://www.dpdk.org) for broad driver support, and in some cases specific firmware revisions need to be loaded prior to being able to fully utilize 128T's optimized packet forwarding capabilities.

Inclusion in the 128T Certification Program is based a given platforms ability to continuously meet certain test and support criteria. New platforms are added to the program at 128 Technology's discretion. For details on how to get new platforms in to the 128T certification program, or further information regarding the program, please contact 128 Technology.

### 128T Certified Platform

The 128T Certification program provides certification done by 128 Technology for certain platforms. Certified platforms have the following:

* 128T software is continuously tested on the platform for performance and functionality
* May include commitment to support device on future 128T software versions (up to EOL date)
* May include commitment to keep up with 3rd party supply chain and engineering changes (end of life parts, BIOS changes, etc.)
* Supplier relationship established, locked down bill of materials and BIOS
* Includes performance benchmarking
* Supporting documentation as needed

### LTE Certified

LTE certification is a superset of [128T certification](#128t-certified-platform). Systems that contain an **onboard** LTE adapater are required to pass certification from the carrier.

LTE certified platforms have the following:
* Has obtained PTCRB (or GCF in Europe) and mobile-carrier specific certification in the specified platform
:::note
certification is tied to a specific LTE card, hw platform, and 128T sw version
:::
* If certification is not present, SIM card acquisition may be difficult from carrier in large quantities

## 128T Compatible Platform

The 128T Certification program provides a [compatible platform guide](#128t-compatible-platforms-guide) for platforms which are compatible.
:::note
128 Technology strongly recommends certification for any build in a production deployment. When a compatible platform is used, certification should be done by the end operator or a third party. See [compatible platform support](#support-for-128t-on-compatible-platforms). 
:::

Compatible platforms have the following:
* 128T software has run on the device successfully in at least one customer environment
* No commitment to keep up with 3rd party supplier changes
* No commitment to support device on future 128T versions
* May require additional configuration upon implementation (vs. out of box experience)
* Performance benchmarking not provided
* Supporting documentation not provided

### 128T Compatible Platforms Guide

When selecting a compatible platform for a 128T router, the following provides some general guidance based on deployment use case.

| Use | CPU | Memory | Disk | Network Interface |
| --- | --- | --- | --- | --- |
| Small Branch Office | 4 Intel cores | 8 GB ECC | 64 GB SSD | 4+ Physical NICs compatible with DPDK |
| Medium Branch Office | 8 Intel cores | 16 GB ECC | 64+ GB SSD | 4+ Physical NICs compatible with DPDK |
| Large Branch Office | 16 Intel cores | 32 GB ECC | 240+ GB SSD | 4+ Physical NICs compatible with DPDK |
| Headend or Datacenter | 8+ Intel Xeon cores | 32 GB ECC | 240+ GB SSD | 5+ Physical NICs compatible with DPDK |

## Minimum Platform Specifications

These are the minimum platform specifications for running the 128T software.

### Router

* 4C Intel x86 processor
* 8GB ECC Memory
* 64GB SSD
* 2 DPDK enabled NIC ports (standalone)
* 4 DPDK enabled NIC ports (HA)
* 1 (1G) Management port

### Conductor

* 4C Intel processor
* 8GB ECC Memory
* 64GB SSD
* 1 (1G) Management port

## Support for 128T on Compatible Platforms

128 Technology will assist customers in problem analysis to determine whether or not the technical issue is related to the third-party platform or software. In order to isolate the issue, 128 Technology reserves the right to request that the third-party hardware or software be altered or removed. 128 Technology does not maintain the ability to test or reproduce issues found when running on compatible platorms, and reserves to right to request testing be done within a customer environment. If the root cause is believed to originate from a third-party vendor's product, the customer is required to open a support request with the third-party vendor's support organization.

## Support for 128T on Incompatible Platforms

128 Technology provides no support, or commitments to functionality, stability, and performance of the 128T software on incompatible platforms.