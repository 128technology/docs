---
title: Bring Your Own License (BYOL)
sidebar_label: '2.0'
---
## Release 2.0.0

**Release Date:** October 24, 2024

### New Features

- **I95-57252 BYOL Support for Conductor and Conductor Managed router:** Added support for IBU Conductors. BYOL Conductors are supported with 6.3.0-R1 and above. Added support for IBU Conductor Managed routers. Conductor managed routers require 6.1.0 or above and must be managed by a 6.3.0-R1 or greater conductor.

- **I95-58706 Whitelist AWS cXa instance types:** Added support for AWS cXa instance types such as c7a. These instance types utilize various AMD processors. For more information, please see the [AWS documentation](https://aws.amazon.com/ec2/instance-types/#Compute_Optimized).

### Resolved Issues

- **I95-58549 Azure and AWS instances can sometimes fail to successfully connect to Mist:** On first boot the system can sometimes fail to connect to Mist before timing out. This causes the SSR software to not be installed. The timeout is now increased.
