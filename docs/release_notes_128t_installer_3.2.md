---
title: SSR Installer 3.2 Release Notes
sidebar_label: '3.2'
---

:::important
**Upgrade Installer:** Before **upgrading to, or installing** SSR version 5.4, update the Installer to the latest version. Failing to upgrade the installer may result in a rollback failure, should a rollback be necessary at any time.
:::

## Release 3.2.3

### Resolved Issues

- **IN-557 Handle SSR OS Upgrades and Downgrades:** Installer maintenance to provide support for future SSR releases.

## Release 3.2.2

### Resolved Issues

- **IN-552 Download may fail if partial download exists in local repository:** Resolved an issue when duplicate unsaved packages were present. 
------
- **IN-554 DNF process issue:** Resolved a rare RPM data corruption issue that may occur during upgrade.  
------
- **IN-555 Update Installer to use new Conductor repos:** Provide installation support for SSR 6.3.0 and later.

## Release 3.2.1

### Resolved Issues

- **IN-543 Security fixes for CVE-2019-3817:** Updates made to `libcomps` and `python2-libcomps`.
------
- **IN-544 Import GPG keys as part of `import iso` installer workflow:** Previously, GPG keys were only imported during repo authentication. If repo authentication had not yet been performed, the RPMs or ISOs could not be imported. The issue has been resolved, and the Installer now imports the GPG keys during the import step, even if repo authentication has not been performed.
------
- **IN-545 Misleading Import ISO failure message when using the PCLI:** The `import iso` failure message has been clarified when running the operation from the PCLI.
------
- **IN-546 Create DNF cache after GPG key import:** The DNF cache is now created when importing the GPG keys. 

## Release 3.2.0

### Resolved Issues

- **IN-533 Check package signatures on import:** The installer now verifies the integrity of all packages in the ISOs during the import process.
