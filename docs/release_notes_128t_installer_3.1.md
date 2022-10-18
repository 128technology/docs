---
title: SSR Installer 3.1 Release Notes
sidebar_label: '3.1'
---

:::important
**Upgrade Installer:** Before **upgrading to, or installing** version 5.4, update the Installer to version 3.1. Failing to upgrade the installer may result in a rollback failure, should a rollback be necessary at any time.
:::

## Release 3.1.6

### Resolved Issues

- **IN-504 Conductor-only software download takes too long:** The installer now complies with the configured proxy settings when validating authenticated repository credentials.
------
- **IN-510 Installer can hang indefinitely:** The installer now enforces a 30 second timeout when checking credentials against remote repositories to prevent the installer from  hanging indefinitely under poor network conditions.

## Release 3.1.5

### Resolved Issues

- **IN-491 Installer Repo uses HTTP instead of HTTPS:** Installer repo now defaults to HTTPS. 
------
- **IN-502 Improve error message for package-based install attempt on an image-based install:** The package-based installation process will not attempt to install on an image-based install, and provides relevant messaging. 
------
- **IN-503 Help prevent a DNF crash that can occur under poor network conditions:** Installer and download operations will now provide useful error feedback when poor network conditions are encountered, and operations will halt. This may result in the upgrade option not being available.
------
- **IN-505 Installer does not attempt to use subsequent configured repositories:** When multiple conductor-hosted repositories are used (`prefer-conductor` or `conductor-only` configuration) with an HA conductor, package availability is checked on both Conductors instead of just one.

## Release 3.1.4

### Resolved Issues

- **IN-497 Router upgrades take an extended amount if the repo times out with conductor-only configured:** Routers that are configured as `conductor-only` and that can resolve the remote repo, but where the repo access operations time out, may result in an extended amount of time for upgrades to complete. This issue has been resolved.
------
- **IN-464/IN-487 Reinstall is now an "Advanced Feature":** Reinstallation should be performed from the ISO, rather than the Installer to avoid problems of leftover packages and kernel mismatches.
------
- **IN-479 Update Support Contacts in the Installer:** The contact information in the Installer has been updated.

## Release 3.1.3

### Resolved Issues

- **IN-482 Prevent inadvertent restart of the service:** This issue has been resolved.  

## Release 3.1.2

### Resolved Issues

- **IN-472 CVE-2020-14352:** This vulnerability has been addressed. 

## Release 3.1.1

### Resolved Issues

- **IN-467 install/rollback operation flags rpmdb corruption when database is not corrupt:** During an installation or rollback, the rpmdb corruption detection process could terminate the operation and result in a failed install/rollback operation.
------
- **IN-469 Initial splash screen notice is hidden:** Initial notice was hidden in the slash screen on startup, This notice is now visible once the first screen is provided.

## Release 3.1.0

### New Features and Improvements

- **Installer upgrade to support SSR Release 5.4.0**

### Resolved Issues

- **IN-365 Installer tries to delete users from groups:** The installer no longer tries to delete users from groups even if they don't exist. 
------
- **IN-435 Rollback Failing:** An upgrade is prevented if the SSR-manifest package is not installed before the upgrade.
------
- **IN-438 Upgrade did not reboot, leaving system in Stopped state:** Resolved an issue where the system would sometimes not reboot after upgrading the SSR.
------
- **IN-446 Install does not enable the rappid repos by default:** Resolved an issue where some dependencies were missing.
------
- **IN-452 Handle End of File error:** Resolved an issue where the installer was not handling an end of file error. 
------
- **IN-455 Rollback operations failing:** Resolved an issue where the installer was being upgraded again as part of the SSR installation. 
