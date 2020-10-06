---
title: 128T Installer 2.6 Release Notes
sidebar_label: 2.6
---

## Release 2.6.2

### New Features and Improvements

- **IN-332** - grub2-efi-x64 removed on upgrade to 128T version 4.4.2 or 4.5.1 if the conductor is running on non uEFI OS imaged hardware and the routers are running on uEFI OS imaged hardware.

   Until the systems are updated with the 128T-installer 2.6.2-1 version all upgrades should be performed by importing the 128T OTP ISO on the conductor for the targeted 128T upgrade version. Removal of grub2-efi-x64 rpm and a system reboot afterwards will result in a system that will not boot. Note: If the conductors have access to the public repos, the installer will be updated through the normal upgrade process. Additional information on the import process can be found here: [pcli import iso](cli_reference.md#import-iso) [installer import](installer_cli_reference.md#import)

## Release 2.6.1

### New Features and Improvements

- **IN-267** - Detect and correct corrupted linux rpmdb, rpmdb is used for linux package management.

## Release 2.6.0

### New Features and Improvements

- Support for 128T version 4.3.8

## Special Considerations

- **IN-261** - Installation using a CentOS 7.3 base is no longer supported.

## Caveats

- **IN-141** - Unsupported installed rpms result in Canceled upgrade
  _**Symptom:**_ GUI presents a failure on upgrade with the following text provided:

  ```
  Error: transaction check vs depsolve:
  ```

  example:

  ```
  Cancelling upgrade of the second node on the router due to failure on this node:
  Failed to install 128T-manifest-0:4.1.0.1.el7.centos-1.x86_64:
  Error: transaction check vs depsolve:
  iptables = 1.4.21-28.el7 is needed by iptables-services-1.4.21-28.el7.x86_64
  ```

  To diagnose the problem, try running: `rpm -Va --nofiles --nodigest`.
  If this is a corrupted RPMDB, running `rpm --rebuilddb` may address the issue.

  _**Cause:**_ Installed version of the RPM's coming from a later version of the Supported 128T OS version. 128T Versions 3.2.8, 4.0.0 and 4.0.1 are supported on CentOS 7.4. Version 4.1.0 is supported on CentOS 7.5.

  _**Corrective Action:**_ For the offending RPM that comes from a different version of the OS than is installed and running, perform either operation:

  1. Remove the offending rpm (in the example above "iptables-services-1.4.21-28.el7.x86_64" would be removed
  2. Setup a new repo pointing to the support CentOS vault version and downgrade the related rpms
