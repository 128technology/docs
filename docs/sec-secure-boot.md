---
title: Secure Boot
sidebar_label: Secure Boot
---

SSR-400/SSR-440 are factory configured with a cryptographic public key that only allows an authenticated firmware image to run on the device. 

Secure boot ensures that only trusted (Juniper-signed) code will run from power-on through to linux OS boot. Kernel IMA ensures that only trusted (Juniper or Oracle signed) code will run in the Linux OS, kernel loadable driver modules, and the SSR application.

If authentication fails due to corruption or tampering, the boot processes terminates and the system will reset.

### IMA

IMA is Linux’s Integrity Measurement Architecture. The SSR supports IMA validation using GPG Signatures. 

During the SSR IBU build process, every executable file (binaries, libraries, scripts, etc.) is signed. The signature is embedded into the root file system extended attributes of the file.

When an IMA enforcement policy is enabled, the kernel checks the signature of each file before loading it for execution. If the check fails, execution is denied with an error.

### Enable IMA Signature Validation 

A default IMA policy (`ima-policy.disabled`) is included in the SSR image. The policy is disabled and must be renamed to be enabled prior to installation. 

Rename the default disabled policy;

`mv /etc/ima/ima-policy.disabled /etc/ima/ima-policy`

And reboot.

*******
This does not make sense to me, given my understanding of how this all works. If you have to boot the hardware in order to enable the IMA policy, then it is not booting securely the first time, right? doesn't that defeat the purpose of having secure boot? I understand this is a proof of work/feature for the beta image, so would this be enabled on a USB image that would be installed to each device, or onto the conductor for routers to install? How is this distributed?