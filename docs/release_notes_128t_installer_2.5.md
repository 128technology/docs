---
title: Installer 2.5 Release Notes
sidebar_label: 2.5
---

## Release 2.5.0

### New Features and Improvements

- Support for SSR version 4.4, the 2.5 installer version is required for upgrading to the SSR 4.4 version.

- **IN-206** - Support for Offline ISO importing

## Special Considerations

- **IN-261** - Installation using a CentOS 7.3 base is no longer supported.

### Issues Fixed

- **IN-238** - Installer does not provide feedback that a certificate has Expired. With this release the installer will now notify the user when their SSR release certificate has expired before attempting an upgrade/install operation.

- **IN-248** - Upgrade may hang on `save-to-local: rebuilding package` operation. 

  Until the system is updated with the 2.5.0 installer, this issue can be mitigated by downloading the rpms needed for rolling back the system.

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

  _**Cause:**_ Installed version of the RPM's coming from a later version of the Supported SSR OS version. SSR Versions 3.2.8, 4.0.0 and 4.0.1 are supported on CentOS 7.4. Version 4.1.0 is supported on CentOS 7.5.

  _**Corrective Action:**_ For the offending RPM that comes from a different version of the OS than is installed and running, perform either operation:

  1. Remove the offending rpm (in the example above "iptables-services-1.4.21-28.el7.x86_64" would be removed
  2. Setup a new repo pointing to the support CentOS vault version and downgrade the related rpms
