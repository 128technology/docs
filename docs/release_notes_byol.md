---
title: Bring Your Own License (BYOL)
sidebar_label: '1.0'
---
## Release 1.1.0

**Release Date:** September 17, 2024

### New Features

- **I95-58026 Add Azure support for Standard public IP address API:** Azure plans to [deprecate](https://learn.microsoft.com/en-us/azure/load-balancer/skus) support for `Basic` loadbalancer and defaults to `Standard` loadbalancer for certain workflows. The new AMI version adds the support for both modes for completeness.

### Resolved Issues

- **I95-58025 Azure and AWS instances can sometimes fail to successfully onboard on first boot:** On first boot after onboarding, a race condition between startup and initializing the system can sometimes result in the onboarding to fail. The condition is now better handled in the new image.

- **I95-58274 Serial console does not show any output in AWS BYOL image:** The boot line for the BYOL image now contain the appopriate options to enable the console to operate correctly.

## Release 1.0.0

**Release Date:** September 2, 2024

### New Features

- **I95-48255 BYOL Support for Mist Managed router:** Created a new BYOL offering in Azure and AWS, to provide seamless onboarding for MIST managed Session Smart Routers. The offer enables various modes of operation using templates, image based, cloud-init based and manual onboarding modes to best fit the end user workfow.
