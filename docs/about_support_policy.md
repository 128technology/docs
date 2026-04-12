---
title: Product Software Lifecycle Support Policy
sidebar_label: Software Support Policy
description: "This document defines the product lifecycle support policy for Juniper Networks, Inc.'s SSN software products. The policy includes software maintenance, software support, and end-of-life."
---

When a software product approaches End of Life (EOL), it is the policy of Juniper Networks to communicate these important milestones to our customers. EOL dates for the SSR are posted on the [Session Smart Router Dates & Milestones](https://support.juniper.net/support/eol/software/ssr/) page on the Juniper website.

For specific information regarding the End of Life policy, please see the [Juniper Networks Product End of Life Policy](https://support.juniper.net/support/pdf/eol/juniper-networks-end-of-life-policy-procedure.pdf), which is also linked from the Session Smart Router Dates & Milestones page linked above.

## Modifying SSR Environment

SSR Software is built on top of an open source enterprise Linux distribution. Leveraging open source software affords many benefits. Among these is a flexible and stable OS that natively supports a range of deployments from OEM hardware platforms, to hypervisors, to public cloud deployments. Using a supported, enterprise open source OS means that thousands of developers are monitoring millions of lines of code in the Linux kernel and other packages - finding flaws and developing fixes before vulnerabilities become problems. No other operating system on the planet is nearly as flexible as Linux. In fact, there’s not much you can’t do with Linux.

To that end, some of our customers may choose to use this flexibility to their advantage by making changes to the operating system, packages, daemons, or scripts on an SSR platform. While few restrictions prevent network operators from changing the system environment or installing and removing packages, such changes are not guaranteed to be supported in future SSR software versions. SSR support agreements do not cover environment changes that impact SSR software performance or reliability. Changes made to the environment are not guaranteed to survive a software upgrade, and may need to be reapplied post-upgrade. Customers must vet and test any SSR environment changes in their own lab before deployment.