---
title: Installer 2.3 Release Notes
sidebar_label: 2.3
---

## Release 2.3.2

### Issues Fixed

- **IN-83**  - Installer does not retry on DNF -13 error code

- **IN-155** - Roll back operations performed when system cannot roll back

- **IN-170** - The Installer may fail to download all packages required for a system update if empty rpms are present in local repo

- **IN-171** - asset detail view may show "Attempt 1/3: Stopped SSR service" for a long time

## Release 2.3.1

### Issues Fixed

- **IN-164** DNF subsystem fails during SSR Software upgrade and DNF repository cache refresh.


## Release 2.3.0

### Issues Fixed

- **IN-150** SSR Upgrade terminates with "Unhandled exception: OSError"

- **IN-154** Installer rollback does not work offline

## Caveats

- **IN-126** - Installation does not fully complete but returns Success
  _**Symptom:**_ When performing an upgrade, the installer will complete however not all packages will be updated and the following Error can be seen in the log:

  ```
  Curl error (6): Couldn't resolve host name for https://mirrors.128technology.com/reposnaps/Mirrors/11_01_2018/CentOS/7.5.1804/updates/x86_64/mirror-list.html
  [Could not resolve host: mirrors.128technology.com; Unknown error]
  ```

  _**Cause:**_ The router node could not resolve the SSR software repository

  _**Corrective Action:**_ When performing the upgrade from less than 4.1.0 to 4.1.0, ensure internet or Conductor access (where Conducted hosted services are enabled)

- **IN-141** - Unsupported installed rpms result in Canceled upgrade
  _**Symptom:**_ GUI presents a failure on upgrade with the following text provided:

  ```
  Error: transaction check vs depsolve:
  ```

  example:

  ```
  Cancelling upgrade of the second node on the router due to failure on this node: Failed to install 128T-manifest-0:4.1.0.1.el7.centos-1.x86_64:
  Error: transaction check vs depsolve:
  iptables = 1.4.21-28.el7 is needed by iptables-services-1.4.21-28.el7.x86_64
  ```

  To diagnose the problem, try running: `rpm -Va --nofiles --nodigest`.
  If this is a corrupted RPMDB, running `rpm --rebuilddb` may address the issue.

  _**Cause:**_ Installed version of the RPM's come from a later version of the Supported SSR OS version. SSR Versions 3.2.8, 4.0.0 and 4.0.1 are supported on CentOS 7.4. Version 4.1.0 is supported on CentOS 7.5.

  _**Corrective Action:**_ For the offending RPM that comes from a different version of the OS than is installed and running, perform either operation:

  1. Remove the offending rpm (in the example above "iptables-services-1.4.21-28.el7.x86_64" would be removed
  2. Setup a new repo pointing to the support CentOS vault version and downgrade the related rpms

- **IN-157** - Installer fails with DNF -11 SIGSEGV failure

  _**Symptom:**_ Install fails with the following error: "Error executing DNF command (code: -11)"

  _**Cause:**_ DNF uses the CentOS curl functions, in CentOS 7.3/7.4 the curl libraries may exhibit this issue.

  _**Corrective Action:**_ If SSR 4.1.0 or greater is installed this is not an issue. If upgrading from a previous version and using the Conductor, the Conductor will perform retries to work around this issue. If using the local installer for installation, re-execute the installer to work around this issue.     
