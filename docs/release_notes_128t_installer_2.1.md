---
title: Installer 2.1 Release Notes
sidebar_label: 2.1
---
## Release 2.1.0

### Issues Fixed

- **IN-106, IN-111** - Installer fails due to presense of .repodata 
- **IN-112** - SSR not started when installer does not complete but no changes were made on the system
- **IN-130** - New installation or upgrade may result in a failed installation or upgrade 

### Caveats
- **IN-126** - Installation does not fully complete but returns Success
  _**Symptom:**_ When performing an upgrade, the installer will complete however not all packages will be updated.

  _**Cause:**_ The router node could not resolve the SSR software repository

  _**Corrective Action:**_ When performing the upgrade ensure internet or Conductor access (where Conducted hosted services are enabled)

- **IN-141** - Unsupported installed rpms result in Canceled upgrade
  _**Symptom:**_ GUI presents a failure on upgrade with the following text provided:
  ```
Error: transaction check vs depsolve:
  ```
  example:
  ```
Cancelling upgrade of the second node on the router due to failure on this node: Failed to install 128T-manifest-0:4.1.0.1.el7:
        Error: transaction check vs depsolve:
        iptables = 1.4.21-28.el7 is needed by iptables-services-1.4.21-28.el7.x86_64
  ```
  To diagnose the problem, try running: 'rpm -Va --nofiles --nodigest'.
  You probably have corrupted RPMDB, running 'rpm --rebuilddb' might fix the issue."

  _**Cause:**_ Installed version of the RPM's come from a later version of the Supported SSR OS version.
     
  _**Corrective Action:**_ For the offending RPM that comes from a different version of the OS than is installed and running, perform either operation:
  1. Remove the offending rpm (in the example above "iptables-services-1.4.21-28.el7.x86_64" would be removed
  2. Setup a new repo pointing to the support SSR-OS vault version and downgrade the related rpms
         
