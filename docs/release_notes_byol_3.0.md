---
title: Bring Your Own License (BYOL)
sidebar_label: '3.0'
---
## Release 3.0.0

**Release Date:** June 26, 2025

### New Features
- **I95-59197 BYOL support for EL9:** Update The base BYOL image to use Oracle Linux 9.
- **I95-60147 Conditionally management subnet:** The Management Interface is now optional in all SSR templates.
- **WAN-3513 Support Azure VMBus UUID in UDev rules:** Added support for Azure VMBus UUID in UDev rules instead of MAC Addresses.
- **I95-60201 AWS IMDSv2 Support:** Added support for IMDSv2 in AWS for added security. For more information, please see the [AWS documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html).


### Resolved Issues
- **I95-60395 AWS BYOL Mist Manual Onboarding Method Fails** An erroneous IP route to the IMDS endpoint was being created on the wrong interface causing the instance to fail onboarding.
- **WAN-4006 Password authentication is allowed and authorized keys are not copied over** SSR default passwords were created and the configured authorized keys were not copied once SSR software was installed.
- **I95-60102 Management interface setup is incorrect** The provided conductor-managed and mist-managed router templates created a `management` inteface, but it was not configured as out of band management.