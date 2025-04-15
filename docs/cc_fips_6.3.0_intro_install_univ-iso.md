---
title: SSR Image-Based Installation Overview 
sidebar_label: SSR Image-Based Installation Overview
---

Beginning with version 6.3.0, the SSR uses a single image-based ISO with a significantly simplified installation process. After the SSR installation completes, the GUI provides clear choices and processes for the Conductor and Conductor-managed router configuration options. 

#### Version History

| Release | Modification |
| ------- | ------------ |
| 6.0.0 | Image-based ISO installation process implemented for Mist-managed networks. |
| 6.3.0 | Image-based ISO updated, migrating to a single ISO installation format for Conductor, Conductor-managed, and Mist-managed deployments.  |

The installation workflow for Common Criteria compliance consists of the following steps:

- [Download](#download)
- [Create a bootable USB](intro_creating_bootable_usb.md)
- [Software Installation](cc_fips_6.3.0_install_univ_iso.md)
- [Device Initialization](cc_fips_6.3.0_initialize_u-iso_device.md)
- [Quickstart Procedure](cc_fips_6.3.0_quickstart_otp.md)

## Download

The image-based ISOs are available for download at the following location:

<!-- markdown-link-check-disable-next-line -->
https://software.128technology.com/artifactory/list/generic-128t-install-images-release-local/

Files available for download are:

- `*.iso` - This file is used for installing/staging bare metal platforms. **Use this file to perform an initial image-based install.**  
- `*.tar` - This file is used by Mist or the SSR conductor for image-based upgrades, and is accessed directly by the system during the upgrade. User download is not necessary or advised.

You will be prompted for your username and token to access the web page listing the software versions. Download is done directly from the page.

### Create a Bootable USB

Use the instructions for [Creating a Bootable USB](intro_creating_bootable_usb.md) to create a bootable USB drive containing the universal ISO image. 

Once you have the USB, let's go [Install the SSR software!](cc_fips_6.3.0_install_univ_iso.md) 