---
title: Installer 2.4 Release Notes
sidebar_label: 2.4
---

## Release 2.4.1

### Issues Fixed

- **IN-224** System boots to incorrect kernel for SSR release on rollback

- **IN-227** Rollback fails when system starts from a non SSR based kernel

## Release 2.4.0

### Issues Fixed

- **IN-199** System boots to old kernel after upgrade from a previous SSR release

- **IN-167** Installer sends error event after installation was successful if it cannot initially send the success event.

## Caveats

- **IN-126** - Installation does not fully complete but returns Success
  _**Symptom:**_ When performing an upgrade, the installer will complete however not all packages will be updated.

  _**Cause:**_ The router node could not resolve the SSR software repository

  _**Corrective Action:**_ When performing the upgrade from less than 4.1.0 to 4.1.0, ensure internet or Conductor access (where Conducted hosted services are enabled)

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

  _**Cause:**_ Installed version of the RPM's come from a later version of the Supported SSR OS version.

  _**Corrective Action:**_ For the offending RPM that comes from a different version of the OS than is installed and running, perform either operation:

  1. Remove the offending rpm (in the example above "iptables-services-1.4.21-28.el7.x86_64" would be removed
  2. Setup a new repo pointing to the support SSR-OS vault version and downgrade the related rpms

- **IN-157** - Installer fails with DNF -11 SIGSEGV failure

  _**Symptom:**_ Install fails with the following error: "Error executing DNF command (code: -11)"

  _**Cause:**_ DNF uses the curl functions, in earlier versions of SSR-OS the curl libraries may exhibit this issue.

  _**Corrective Action:**_ If SSR 4.1.0 or greater is installed this is not an issue. If upgrading from a previous version and using the Conductor, the Conductor will perform retries to work around this issue. If using the local installer for installation, re-execute the installer to work around this issue.     
