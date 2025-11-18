---
title: Bring Your Own License (BYOL)
sidebar_label: '4.0'
---
## Release 4.0.0

**Release Date:** TBD

#### New Features and Improvements

- **I95-54267 Azure SSR image support for vTPM**

On first boot of the SSR volume, the instance the vTPM (if detected) will be automatically initialized with RSA encryption key pair. The BYOL image contains a script which can be used to validate the vTPM operations based on the initialization.

Encrypt: /home/t128/t128_tpm_crypto.sh encrypt -i secret.txt -o secret.txt.enc
Decrypt: /home/t128/t128_tpm_crypto.sh decrypt -i secret.txt.enc -o output.txt

NOTE: SSR version 7.1.3-r2 or higher is required to leverage the vTPM capabilities in software.

- **WAN-4033, I95-60406 Enhancements to onboarding-config via cloud-init**

New options were added to the onboarding-config (typically installed via cloud-init) to enable additional use cases. Some examples of new additions:
 * Support custom NTP server
 * Support static HTTPS Proxy for MIST connection

- **I95-62888 Support for HA sync and fabric links**

Support for HA fabric and HA sync to establish a dual-node HA in public cloud.


### Resolved Issues

 - **I95-62016 Sanitize sensitive information from logs and files on disk**

    _**Resolution:**_ Certain sensitive onboarding information is not properly scrubbed from files on disk and logs.


 - **I95-63304 BYOL Template is not producing consistent interface ordering**

    _**Resolution:**_ Update the udev and cloud-init rules to ensure a more strict ordering and naming of interfaces which matches the device map and SSR-ROLE tags more appropriately.


 - **I95-62888 Interface tagging in Azure is not consistent**

    _**Resolution:**_ Some Azure side changes broke how the image manages interface tagging for role assignments. The Azure SDK was updated to use managed identity APIs and more consistent parsing of the SSR-ROLE tags.


