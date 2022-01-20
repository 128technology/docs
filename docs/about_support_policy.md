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

**Major Release:** A Major Release is a version of SSN software and is distinguished by the X in the release number X.Y.Z. (e.g. 2.0.0).

**Minor Release:** A Minor Release is a version of SSN software and is distinguished by the Y in the release number X.Y.Z. (e.g. 2.1.0).

**Patch Release:** A Patch Release is a release of SSN software that includes product code changes to address problems. (e.g. 2.1.1).

**End-of-Maintenance (EOM) date:** The end-of-maintenance date is the date after which Juniper Networks will no longer provide Maintenance services for a software release or product.

**Last Date of Support (LDOS):** The Last Date of Support (LDOS) is the last date to receive Juniper Networks Support services for a Software Release that is EOM.

**End-of-Life Notification (EOLN):** The EOLN is provided by Juniper Networks to notify customers and partners that a product that is planned to reach its End-of-Life date in the near future.

**The End-of-Life (EOL):** End-of-Life means that the product release in question has reached the end of its “useful lifespan”. After the EOL date, Juniper Networks will no longer provide support services for the release of the product. In most cases the EOL date coincides with the Last Date of Support (LDOS) for the release of the product.

**General Availability (GA):** Software is available for purchase, has proven to be reliable, free of critical bugs and is suitable for usage in production systems.

**Limited Availability (LA):** Software is under controlled access and is not available to the general population.  LA software is covered under support and maintenance.

**N:** Refers to the current major release of software.

## Lifecycle Support Policy

This lifecycle support policy covers the lifecycle, milestones, maintenance and support phases for Software Releases of active products as well as products becoming end-of-life.

Juniper Networks will provide Maintenance services for at least the two (2) most recent Software Releases. Maintenance services will be provided for at least six (6) months from GA date of the all Software Releases.
:::tip Example
If the _current_ GA version of software is 5.2.3, 5.1.X and 5.0.X are supported under maintenance.
:::

LDOS shall be at least six (6) months from the EOM date of a Software Release or product.  After this date, all support services for the release are unavailable, and the product or release becomes obsolete.   

End-of-life date sall be at least six (6) months from EOM date.  EOL does not apply to incremental Software Releases of an active product.

### Extended Maintenance & Support

Extended maintenance and support may be available for certain releases after EOM. To request extended maintenance for a release, customers and partners should contact a Juniper Networks sales representative. In order to receive Extended Maintenance and Support, you must also maintain active subscriptions for the products in question for the duration of the extended maintenance and support period.

### End-of-life products

For products going EOL, Juniper Networks will communicate an End-of-Life Notification (EOLN) at least 90 days prior to a product’s EOS date. EOS does not apply to incremental software releases of an active product. The EOM date will be at least 12 months from EOS. The LDOS (and effective EOL date) shall be at least one year from the EOM date.

## CVEs

Juniper Networks is committed to providing the highest quality software with each release. In addition to creating new features and functions for the Session Smart Networking Platform, Critical Vulnerability Exposures (CVE) are continuously evaluated and addressed in accordance with our [security policy](about_security_policy.md). In many cases, CVEs exist in the operating system's libraries, binaries and kernel. Addressing these vulnerabilities requires upgrading direct or indirect dependences of the SSN products from upstream repositories.  In some cases, this requires upgrading the kernel or even the version of OS distribution, which no longer qualifies as a patch and necessitates an increment to a minor or major version of software.
