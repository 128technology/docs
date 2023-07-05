---
title: SSR Installer 3.2 Release Notes
sidebar_label: '3.2'
---

:::important
**Upgrade Installer:** Before **upgrading to, or installing** SSR version 5.4, update the Installer to the latest version. Failing to upgrade the installer may result in a rollback failure, should a rollback be necessary at any time.
:::

## Release 3.2.0

### Resolved Issues

- **IN-533 `import-iso` must check package signatures:** The installer now verifies the integrity of all packages in the ISOs during the import process.
