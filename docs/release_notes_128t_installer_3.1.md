---
title: SSR Installer 3.1 Release Notes
sidebar_label: '3.1'
---

:::important
**Upgrade Installer:** Before **upgrading to, or installing** version 5.4, update the Installer to version 3.1. Failing to upgrade the installer may result in a rollback failure, should a rollback be necessary at any time.
:::

## Release 3.1.2

### Resolved Issues

- **IN-472 CVE vulnerability:** An automatic update of CentOS is now generated to address this vulnerability. 

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
