---
title: Installer 2.6 Release Notes
sidebar_label: 2.6
---

## Release 2.6.3

### Issues Fixed

- **IN-344** rpmdb corruption detection operation may fail on slower systems resulting in a node asset persisting in a connected state or an installation/upgrade may fail with a message of "Unable to repair RPM database" 
  _**Cause:**_ The rpm operation on lower end systems may exceed the time defined, resulting in a false negative response for a corrupted rpm database. An example of a lower end system is a 2 Core 4G system.

## Release 2.6.2

### Issues Fixed

- **IN-332** - grub2-efi-x64 removed on upgrade to SSR version 4.4.2 or 4.5.1 if the conductor is running on non uEFI OS imaged hardware and the routers are running on uEFI OS imaged hardware.

   Until the systems are updated with the 128T-installer 2.6.2-1 version all upgrades should be performed by importing the SSR OTP ISO on the conductor for the targeted SSR upgrade version. Removal of grub2-efi-x64 rpm and a system reboot afterwards will result in a system that will not boot. Note: If the conductors have access to the public repos, the installer will be updated through the normal upgrade process. Additional information on the import process can be found here: [pcli import iso](cli_reference.md#import-iso) and [installer import](installer_cli_reference.md#import)

## Release 2.6.1

### New Features and Improvements

- **IN-267** - Detect and correct corrupted linux rpmdb, rpmdb is used for linux package management.

## Release 2.6.0

### New Features and Improvements

- Support for SSR version 4.3.8

## Special Considerations

- **IN-261** - Installation using a SSR-OS 7.3 base is no longer supported.

## Caveats

- **IN-141** - Unsupported installed rpms result in Canceled upgrade
  _**Symptom:**_ GUI presents a failure on upgrade with the following text provided:

  ```
  Error: transaction check vs depsolve:
  ```

  example:

  ```
  Cancelling upgrade of the second node on the router due to failure on this node:
  Failed to install 128T-manifest-0:4.1.0.1.el7:
  Error: transaction check vs depsolve:
  iptables = 1.4.21-28.el7 is needed by iptables-services-1.4.21-28.el7.x86_64
  ```

  To diagnose the problem, try running: `rpm -Va --nofiles --nodigest`.
  If this is a corrupted RPMDB, running `rpm --rebuilddb` may address the issue.

  _**Cause:**_ Installed version of the RPM's coming from a later version of the Supported SSR OS version. SSR Versions 3.2.8, 4.0.0 and 4.0.1 are supported on SSR-OS 7.4. Version 4.1.0 is supported on SSR-OS 7.5.

  _**Corrective Action:**_ For the offending RPM that comes from a different version of the OS than is installed and running, perform either operation:

  1. Remove the offending rpm (in the example above "iptables-services-1.4.21-28.el7.x86_64" would be removed
  2. Setup a new repo pointing to the support SSR-OS vault version and downgrade the related rpms
