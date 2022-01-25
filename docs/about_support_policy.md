---
title: Product Software Lifecycle Support Policy
sidebar_label: Software Support Policy
description: "This document defines the product lifecycle support policy for Juniper Networks’ software products.  The policy includes both software maintenance, software support and end-of-life."
---

## Overview and Definitions

The _Lifecycle Policy_ establishes a clear and predictable policy for product maintenance, product support and product end-of-life of Juniper Network’s software products. The policy is intended to enable Juniper Networks customers and partners to align their deployment plans and understand service levels throughout the entire lifecycle of or software products.

For the purpose of the policy, the following definitions apply:

**Maintenance:** Maintenance includes problem resolution through product code changes delivered via patch releases.

**Support:** Support is TAC support and includes technical assistance, general troubleshooting of issues and resolution through known workarounds.

**Software Version and Release:** A “Version” is a series of SSN Releases of a particular software product with a common “x.y” denomination in the first two places of the Release identifier. A Major version of SSN software is distinguished by the “x” in the release number (e.g. 5.0).  A Minor release is a version of SSN software is distinguished by the “y” in the release number (e.g. 5.1). A “Release,” on the other hand, is a particular image issued under a particular Version. For example, 5.1.4 and 5.2.1 are Releases under different Versions. Releases within a particular Version generally have common features and functionality.

**EOSE - End of Software Engineering support date:** EOSE is the date after which Juniper is no longer committed to furnish Software Engineering level support or “Maintenance” for the SSN Software. This means that no further Releases (e.g. service or maintenance releases or patches) will be created for the support Version of SSN Sofware. JTAC support will generally be limited to investigation and troubleshooting in an attempt to provide solutions, configuration guidelines and workarounds. 

**EOS Date:** EOS Date is the date after which Juniper will not be under obligation to perform support services of any kind for the affected software or the embedded operating system software supporting the affected product. 

**End-of-Life (EOL):** End-of-Life means that the product release in question has reached the end of its “useful lifespan”. After the EOL date, Juniper Networks will no longer provide support services for the product release. In most cases the EOL date coincides with the End of Service (EOS) date for the product release.

**End-of-Life Notification (EOLN):** The EOLN is provided by Juniper Networks to notify customers and partners that a product that is planned to reach its End-of-Life date in the near future.

**General Availability (GA):** Software is available for purchase, has proven to be reliable, free of critical bugs and is suitable for usage in production systems.

**Limited Availability (LA):** Software is under controlled access and is not available to the general population.  LA software is covered under support and maintenance.

## Lifecycle Support Policy

This lifecycle support policy covers the lifecycle, milestones, maintenance and support phases for Software Releases of active products as well as products becoming end-of-life.

End-of-Life milestone deadlines for Releases are not triggered by an EOLN. Instead, a product-specific Process Support Notification posted on [Juniper’s public website](about_releases.mdx) at or before general availability of the first Release under the applicable software Version will specify rules for Release EOSE and Release EOS. Juniper may modify those rules from time to time by posting on its public website. 

End-of-Life milestones for Releases under one Version do not affect support commitments relating to Releases for other Versions.
* **Typical Timing of Release EOSE:** EOSE for Releases under a particular Version shall be at least nine (9) months after first general availability of the initial Release under that Version.

* Notwithstanding the minimum timing of Release EOSE, Software Engineering (“Maintenance") services will be provided for at least the two (2) most recent Software Versions. The N-1 Version and its Releases reaches the EOSE date upon the GA of a new Version.

:::tip Example
If the _current_ GA version of software is 5.2.3, 5.2.X and 5.1.X are supported under maintenance.
:::

* **Effect of Release EOSE:** After Release EOSE Juniper will not be under obligation to perform any further software fixes, code changes. No further Releases will be developed or distributed for that Version.

* **Typical Timing of Release EOS:** Release EOS for Releases under a particular Version generally ranges between six (6) and twelve (12) months after the EOSE date for that Version.

* **Effect of Release EOS:** After Release EOS Juniper will not be under obligation to perform support services of any kind for any Releases under the applicable Version. Juniper will not be under any obligation to keep any such Releases available for download after Release EOS.

## CVEs

Juniper Networks is committed to providing the highest quality software with each release. In addition to creating new features and functions for the Session Smart Networking Platform, Critical Vulnerability Exposures (CVE) are continuously evaluated and addressed in accordance with our [security policy](about_security_policy.md). In many cases, CVEs exist in the operating system's libraries, binaries and kernel. Addressing these vulnerabilities requires upgrading direct or indirect dependences of the SSN products from upstream repositories.  In some cases, this requires upgrading the kernel or even the version of OS distribution, which no longer qualifies as a patch and necessitates an increment to a minor or major version of software.

### Extended Maintenance & Support

Extended maintenance and support may be available for certain releases after EOM. To request extended maintenance for a release, customers and partners should contact a Juniper Networks sales representative. In order to receive Extended Maintenance and Support, you must also maintain active subscriptions for the products in question for the duration of the extended maintenance and support period.

### End-of-life products

When a software product reaches its End of Life (EOL), Juniper Networks’ policy is to communicate important milestones in order to help customers understand the impact on them of product end of life and understand the applicable timelines and manage the product transition. 

This communication is handled on a product-by-product basis via an End of Life Notification (EOLN), which is a specific type of Product Support Notification (PSN). EOLN’s are posted at Juniper’s public website. (As of the date of this policy document, the site is located at https://www.juniper.net/support/eol/, where this policy is also posted). 

The EOLN will include the critical milestone dates that will occur in the typical product end of life process. The EOLN may also contain other key information pertaining to Juniper Networks hardware and software products, such as recommended replacement product(s). Rules and milestone dates specified in the EOLN for a particular product may vary from the guidelines stated below. Variance from the guidelines may occur in a variety of cases, including, among others, where the product has joined the Juniper portfolio in an acquisition where the acquired company had a materially different end-of-life policy. 
