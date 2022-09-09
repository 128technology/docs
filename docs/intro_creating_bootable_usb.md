---
title: Creating a Bootable USB from ISO
sidebar_label: Creating Bootable USB
---

## Introduction

Juniper Networks distributes the SSR software in a number of forms for different environments. Of those asset types, the ISO is most commonly used to stage a system that does not have an operating system, or if the system is being repurposed as an SSR system. The goal of this guide is produce a bootable USB drive from an SSR ISO.

For small deployments or a proof of concept, each ISO image can be loaded on to a bootable USB to install the operating system and SSR software.

### Creating a Bootable ISO: Linux and MacOS

Creating a bootable ISO from Linux, Windows or MacOS is straightforward. The best way to get started is with a tool that makes creating bootable USBs easy for any platform. 

1. [Download and install Etcher](https://www.balena.io/etcher/) for your platform.

2. Download the SSR ISO for the software version to be loaded onto the USB. Use the [download instructions](intro_downloading_iso.md). 

3. Launch Etcher. Select the ISO as the source from step 2.
![Select ISO](/img/usb_select_iso.png)

4. Select the target USB device attached to the system.
![Select Target](/img/usb_select_target.png)

5. Click Flash! to get started.
![Click Flash!](/img/usb_select_flash.png)

6. Wait for the USB to be flashed with the image.
![Waiting](/img/usb_flashing.png)

7. Once the image has been flashed, the contents will be validated against the source.
![Validating](/img/usb_validating.png)

8. Once validated, eject the USB drive.
![Complete](/img/usb_complete.png)

9. After you have created the bootable ISO, follow the [instructions for installing from bootable media](intro_installation_bootable_media.md). 