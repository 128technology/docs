---
title: Introduction - SSR Common Criteria Installation and Configuration
sidebar_label: Introduction - SSR Common Criteria Installation and Configuration
---

The focus of this document is to provide the required configuration steps to install and operate the SSR in a manner consistent with the requirements of Common Criteria and FIPS. 

Common Criteria for information technology is an international agreement signed by several countries that permits the evaluation of security products against a common set of standards. In the Common Criteria Recognition Arrangement (CCRA) the participants agree to mutually recognize evaluations of products performed in other countries. All evaluations are performed using a common methodology for information technology security evaluation.

For more information on Common Criteria, see https://www.commoncriteriaportal.org/.

## Introduction to Session Smart Networking Common Critieria Compliance

The Session Smart Networking Platform is the first 100% software-defined, session-based distributed IP routing and network services platform designed from the ground-up with an application and service-centric context. The platform consists of two primary components: the Session Smart Router (SSR) and the Conductor. Together, they form a single logical control plane that is highly distributed, and a data plane that is truly session-aware.

The family of Juniper SSR appliances consists of the Session Smart Networking software executing on Juniper branded platforms. The compliant appliances include the following:

- SSR 120
- SSR 130
- SSR 1200
- SSR 1300
- SSR 1400
- SSR 1500

The software is Juniper SSR software v6.3.0-R1. The software is deployed in an ISO package file, which includes Enterprise Linux 7.9 with kernel version 4.18.0.

The SSR security guidance documentation (this guide, the SSR Common Criteria Installation and User Guide V1.0) is delivered to all users. To achieve Common Criteria compliance, the SSR must at all times be deployed and operated in accordance with this document. The SSR Common Criteria Installation and User Guide V1.0 is a Common Criteria Guidance Supplement which extends the existing manuals and other product documentation. The SSR Common Criteria Installation and User Guide applies to the above listed hardware. 

SSR devices are provisioned and configured by the user as a Session Smart Router (SSR) or into a Session Smart Conductor (Conductor). The Router implements the data plane and control plane functions and performs most functions. The Conductor implements a centralized management and policy engine allowing provisioning and management of several Routers. A Conductor also acts as an information aggregation repository. 

The conductor manages the associated routers. To do this, the Administrator establishes a local or remote management connection to the Conductor.

Each SSR can be administered individually; the administrator connects locally from console or remotely from a remote management station and issues commands through the Command Line Interface (CLI). For local administration, the administrator authenticates with a username and a password or via public-key authentication using cryptographic keys stored in the local ﬁle system. The Administrator’s credentials (private key) used to access the system via SSH must be protected on any other platform on which they reside.

The SSR implements all the security functions of a network device, as well as a stateful traffic filtering firewall to guard access to the protected network. Routers are deployed in various data centers, branches, and other facilities to protect the network connection. These Routers are associated to a Conductor for configuration management, information aggregation, and life-cycle management. 

### Network Interface Compliance for Common Criteria

Each SSR has multiple network interfaces.

- Conductor interfaces always operate as Non-Forwarding.
- Router interfaces may operate as Forwarding or Non-Forwarding.

A non-forwarding interface is always serviced by the Linux network stack. It is used for management purposes such as configuration, command, and control only. Forwarding interfaces carry SVR traffic between external networks.

Although the SSR software permits forwarding interfaces to also be configured for management access, these *management over forwarding* operations are non-compliant for Common Criteria deployments. SSH management connections to the SSR must only be configured for non-forwarding interfaces. Refer to the Appendix for an example where management interfaces are correctly configures as `forwarding = false`.

### Additional Software Details

SSR provides SSH for Remote Administration on Port 22, using OpenSSH v7.4 and OpenSSL v1.0.2k. These versions are certified for FIPS 140-2 compliance. 

All implementations of cryptographic algorithms are certified under the Cryptographic Algorithm Validation Program (CAVP) only when used on the Juniper hardware platforms listed in this document. 

All software used as part of the SSR is implemented to minimize the attack surface and only allow the minimum number of connections with outside users and products. 

Administration of the SSR can be performed using either the CLI or the WebGUI and is considered Common Criteria-certified when a valid CA certificate and webserver certificate is configured in the `trusted ca-certificate` store.  

The SSR implements a number of security mechanisms to protect itself and any critical data, and to ensure that attempts to tamper with the SSR or data are detected.


