---
title: Secure Boot
sidebar_label: Secure Boot
---

#### Version History

| Release | Modification                |
| ------- | --------------------------- |
| 7.1.0   | Secure Boot support added. |
| 7.1.3   | IMA support added. |

The SSR400 and SSR440 are factory configured with a cryptographic public key that only allows an authenticated firmware image to run on the device. 

Secure boot ensures that only trusted (Juniper-signed) code will run from power-on through to linux OS boot. Kernel IMA ensures that only trusted (Juniper or Oracle signed) code will run in the Linux OS, kernel loadable driver modules, and the SSR application.

If authentication fails due to corruption or tampering, the boot processes terminates and the system will reset.

### IMA

IMA is Linux’s Integrity Measurement Architecture. The SSR supports IMA validation using GPG Signatures. 

During the SSR IBU build process, every executable file (binaries, libraries, scripts, etc.) is signed. The signature is embedded into the root file system extended attributes of the file.

IMA validation is enabled by default, allowing the kernel to check the signature of each file before loading it for execution. If the check fails, execution is denied with a **Permission denied** (EACCES) error code.
