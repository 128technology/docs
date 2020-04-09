---
title: 128T Installer 2.3.2 Release Notes
sidebar_label: 2.3.2
---
## Issues Fixed
- **IN-170** - The Installer may fail to download all packages required for a system update if empty rpms are present in local repo

- **IN-171** - asset detail view may show "Attempt 1/3: Stopped 128T service" for a long time

- **IN-155** - Roll back operations performed when system cannot roll back

- **IN-83**  - Installer does not retry on DNF -13 error code


## Caveats
- **IN-126** - Installation does not fully complete but returns Success

     Symptom: When performing an upgrade, the installer will complete however not all packages will be updated and the following Error can be seen in the log:

     ```
     "Curl error (6): Couldn't resolve host name for https://mirrors.128technology.com/reposnaps/Mirrors/11_01_2018/CentOS/7.5.1804/updates/x86_64/mirror-list.html
      [Could not resolve host: mirrors.128technology.com; Unknown error]"
     
     Cause: The router node could not resolve the 128T software repository
     ```

     Corrective Action: When performing the upgrade from less than 4.1.x to 4.1.x, ensure internet or Conductor access (where Conducted hosted services are enabled)

- **IN-141** - Unsupported installed rpms result in Canceled upgrade

     Symptom: GUI presents a failure on upgrade with the following text provided: "Error: transaction check vs depsolve:"
     
        example:

     ```
       "Cancelling upgrade of the second node on the router due to failure on this node: Failed to install 128T-manifest-0:4.1.0.1.el7.centos-1.x86_64:
        Error: transaction check vs depsolve:
        iptables = 1.4.21-28.el7 is needed by iptables-services-1.4.21-28.el7.x86_64
        To diagnose the problem, try running: 'rpm -Va --nofiles --nodigest'.
        You probably have corrupted RPMDB, running 'rpm --rebuilddb' might fix the issue."
     ```

     Cause: Installed version of the RPMs come from a later version of the Supported 128T OS version. 128T Versions 3.2.8, 4.0.0 and 4.0.1 are supported on CentOS 7.4. Version 4.1.0 is supported on CentOS 7.5.

     Corrective Action: For the offending RPM that comes from a different version of the OS than is installed and running, perform either operation:

    1. Remove the offending rpm (in the example above "iptables-services-1.4.21-28.el7.x86_64" would be removed)

    2. Setup a new repo pointing to the supported CentOS vault version and downgrade the related rpms

- **IN-157** - Installer fails with DNF -11 SIGSEGV failure

     Symptom: Install fails with the following error: "Error executing DNF command (code: -11)"

     Cause: DNF uses the CentOS curl functions, in CentOS 7.3/7.4 the curl libraries may exhibit this issue.

     Corrective Action: If 128T 4.1.0 or greater is installed this is not an issue. If upgrading from a previous version and using the 128T Conductor, the Conductor will perform retries to attempt to work around this issue (performing the download a second time will also work around this if the retries fail). If using the local installer for installation, re-execute the installer to work around this issue
