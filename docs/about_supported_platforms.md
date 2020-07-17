---
title: Platform Support Policy
---

128 Technology provides a software-based networking solution that serves as the underlying framework for digital transformation. Because the software is abstracted from the underlying platform infrastructure, the same software-based solution can be flexibly deployed on bare metal servers, virtualized platforms, or in the public cloud, providing considerable deployment. In contrast to hardware-centric solutions, software provides scalability and agility by allowing administrators to rapidly spin up, configure, and spin down software instances. Abstraction of the underlying platform simplifies lifecycle management in a deployment because each router is treated in a similar manner.

During initial deployment, the steps for zero-touch provisioning are the same whether routers are deployed on bare metal, a private OpenStack cloud, or in AWS. Within the management tool, the 128T Conductor, deployed assets are managed using the same interface, simplifying administrative workflows.

For many customers, the scalability of software can also lead to considerable savings. Instead of purchasing hardware for peak capacity, an enterprise can create a new software router with application instances in the public cloud for periods of high demand, and then spin down the entire infrastructure when the demand subsides.

## Terminology

For the purposes of describing the platform support policy, the following terms are defined:

- ***Platform*** - A physical or virtual system, typically consisting of some amount of resources for compute, memory, disk, and networking. *Example*: A physical server, virtual machine, or public cloud virtual machine instance.
- ***Certification*** - The process of testing to ensure that a specific combination of a 128T software version and platform build meet requirements for functionality, stability, and performance. *Example*: The [128T Certification Program](#128t-certification-program) provides certification of a set of platforms with 128T software.
- ***Certified Platform*** - A platform that is currently in the 128T Certification Program as a [128T Certified Platform](#128t-certified-platform). *Example*: A specified build of Lenovo SR530 server is a certified platform.
- ***Compatible Platform*** - A platform that meets or exceeds [minimum platform specifications](#minimum-platform-specifications) and is known to be able to run 128T software. *Example*: A Compulabs fitlet2 with Intel Atom E3950, 8GB of memory, and 128GB of disk is a compatible platform.
- ***Incompatible Platform*** - A platform that does not meet [minimum platform specifications](#minimum-platform-specifications) and is unlikely to run 128T software at acceptible levels of functionality, stability, performance, or at all. *Example*: The [Apollo Guidance Computer](https://en.wikipedia.org/wiki/Apollo_Guidance_Computer) is an incompatible platform.

## 128T Certification Program

128 Technology continuously works to maintain a platform abstraction in its software design. At the same time, there are often characteristics and optimizations that require platform-specific support. This support comes by way of a platform certification program which provides assurances of supportabilty of the 128T software. For example, the 128T software utilizes [DPDK](https://www.dpdk.org) for broad driver support, and in some cases specific firmware revisions need to be loaded prior to being able to fully utilize 128T's optimized packet forwarding capabilities.

### 128T Certified Platform

The 128T Certification program provides certification done by 128 Technology for certain platforms. Certified platforms have the following:

* 128T software is continuously tested on the platform for performance and functionality
* May include commitment to support device on future 128T software versions (up to EOL date)
* May include commitment to keep up with 3rd party supply chain and engineering changes (end of life parts, BIOS changes, etc.)
* Supplier relationship established, locked down bill of materials and BIOS
* Includes performance benchmarking
* Supporting documentation as needed

### 128T Compatible Platform

The 128T Certification program provides a [compatible platform guide](marisa.please.provide) for platforms which are compatible.
:::note
128 Technology strongly recommends certification for any build in a production deployment. When a compatible platform is used, certification should be done by the end operator or a third party. See [platform support](#platform-support). 
:::

Compatible platforms have the following:
* 128T software has run on the device successfully in at least one customer environment
* No commitment to keep up with 3rd party supplier changes
* No commitment to support device on future 128T versions
* May require additional configuration upon implementation (vs. out of box experience)
* Performance benchmarking not provided
* Supporting documentation not provided

### LTE Certified

LTE certification is a superset of [128T certification](#128t-certified-platform). Systems that contain an **onboard** LTE adapater are required to pass certification from the carrier.

LTE certified platforms have the following:
* Has obtained PTCRB (or GCF in Europe) and mobile-carrier specific certification in the specified platform
:::note
certification is tied to a specific LTE card, hw platform, and 128T sw version
:::
* If certification is not present, SIM card acquisition may be difficult from carrier in large quantities

## Minimum Platform Specifications

These are the minimum platform specifications for running the 128T software.

### Router

* 4C Intel processor
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

## Platform Support

The support provided by 128 Technology 

### Support for 128T on Certified Platforms

128 Technology will update the [Platform Compatibility Guide](marisa.please.provide) with new platforms that have been tested and certified. General Support for selected new platform technology (such as servers, processors, chipsets, and add-in cards) is based on 128 Technology's discretion.

If a particular platform configuration is not listed on as a certified by the 128T Certification Program, please contact 128 Technology to determine plans for certification of the platform for the 128T.

### Support for 128T on Compatible Platforms
128 Technology will assist customers in problem analysis to determine whether or not the technical issue is related to the third-party platform or software.

If the root cause is believed to originate from a third-party vendor's product for which 128 Technology does not maintain a cooperative support relationship, the customer is required to open a support request with the third-party vendor's support organization.

### Support for 128T on Incompatible Platforms
