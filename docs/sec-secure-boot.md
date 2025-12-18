---
title: Secure Boot
sidebar_label: Secure Boot
---

SSR-400/SSR-440 are factory configured with a cryptographic public key that only allows an authenticated firmware image to run on the device. 

Secure boot ensures that only trusted (Juniper-signed) code will run from power-on through to linux OS boot. Kernel IMA ensures that only trusted (Juniper or Oracle signed) code will run in the Linux OS, kernel loadable driver modules, and the SSR application.

If authentication fails due to corruption or tampering, the boot processes terminates and the system will reset.

