---
title: Hardware Support Policy
---

128 Technology provides a software-based networking solution that serves as the underlying framework for digital transformation. Because the software is abstracted from the underlying infrastructure, the same software-based solution can be deployed on bare metal servers, virtualized platforms, or in the public cloud, providing considerable deployment flexibility.

In contrast to hardware-centric solutions, software provides scalability and agility because administrators can rapidly spin up, configure, and spin down software instances. Abstracting the underlying compute also simplifies deployment from a lifecycle management perspective because each router is treated in a similar manner.

During initial deployment, the steps for zero-touch provisioning are the same whether routers are deployed on bare metal, a private OpenStack cloud, or in AWS. Within the management tool, the 128T Conductor, deployed assets are managed using the same interface, simplifying administrative workflows.

For many customers, the scalability of software can also lead to considerable savings. Instead of purchasing hardware for peak capacity, an enterprise can create a new software router with application instances in the public cloud for periods of high demand, and then spin down the entire infrastructure when the demand subsides.

### Challenges

While 128 Technology continuously works to maintain a hardware abstraction in its design, there are nuances that require platform-specific support. This support comes by way of a platform certification program which provides assurances of supportabilty of the 128T software.

The 128T software utilizes on [DPDK](https://www.dpdk.org) for broad driver support. In some cases, specific firmware revisions need to be loaded prior to being able to fully utilize 128T's optimized packet forwarding capabilities.

## Disclaimer

128 Technology will update the [Hardware Compatibility Guide](marisa.please.provide) with new hardware platforms that have been tested and certified. General Support for selected new hardware technology (such as servers, processors, chipsets, and add-in cards) is based on 128 Technology's discretion.

If a specific server, storage array, or device is not listed on the Systems Compatibility Guide, please contact 128 Technology to determine plans for supporting the hardware combination for the 128T.

128 Technology will assist customers in problem analysis to determine whether or not the technical issue is related to the third-party hardware or software.

If the root cause is believed to originate from a third-party vendor's product for which 128 Technology does not maintain a cooperative support relationship, the customer is required to open a support request with the third-party vendor's support organization.

## 128T Certification Program

### 128T Certified Platform

* 128T software has been successfully tested for performance and functionality
* May include commitment to support device on future 128T software versions (up to EOL date)
* May include commitment to keep up with 3rd party supply chain and engineering changes (end of life parts, BIOS changes, etc.)
* Supplier relationship established, locked down bill of materials and BIOS
* Includes performance benchmarking
* Supporting documentation as needed

### 128T Compatible Platform

A compatible platform is one that meets the [minimum hardware specifications](#minimum-hardware-specifications) and is known to be able to run 128T software. The [Compatible Hardware Guide](marisa.please.provide) contains a list of hardware configurations known that have had some level of testing performed.

* 128T software has run on the device successfully in at least one customer environment
* No commitment to keep up with 3rd party supplier changes
* No commitment to support device on future 128T versions
* May require additional configuration upon implementation (vs. out of box experience)
* Performance benchmarking not provided
* Supporting documentation not provided

### LTE Certified

LTE certification is a superset of [128T certification](#128t-certified-platform). Systems that contain an **onboard** LTE adapater are required to pass certification from the carrier.

* Has obtained PTCRB (or GCF in Europe) and mobile-carrier specific certification in the specified hardware platform
:::note
certification is tied to a specific LTE card, hw platform, and 128T sw version
:::
* If certification is not present, SIM card acquisition may be difficult from carrier in large quantities

## Minimum Hardware Specifications

### 128T

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