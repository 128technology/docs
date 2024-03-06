---
title: Upgrades and Uninstallation
sidebar_label: Upgrades and Uninstallation
---
This section provides information about the secure upgrade process and the uninstallation process of Common Criteria compliant software.

## Software Upgrades

To determine the current version of software running on your Conductor or Router, run the following command from the Conductor PCLI:

[`show system version`](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/cli_reference#show-system-version)

Use this information if you upgrading to a newer software version **after having installed** SSR Version 6.2.3-14R2. This is the initial Common Criteria compliant SSR software release.  

The SSR Software packages are available from the Juniper Networks public servers using the **username and token provided to you.** During the upgrade process, your SSR uses this information to securely access the download location. Depending on your upgrade selection, the following location is accessed by the upgrade process:

<!-- markdown-link-check-disable-next-line -->
- https://software.128technology.com/artifactory/list/generic-128t-isos-release-local

Please refer to [Upgrade Considerations](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/intro_upgrade_considerations) before upgrading. 

:::important
**The SSH Root login is not permitted and is not compliant with Common Criteria guidelines.** If the existing version allows SSH Root login, it will be disabled during the upgrade. 
::: 

To perform an upgrade on either a conductor or router, refer to the detailed instructions at [Upgrading the SSR Networking Platform.](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/intro_upgrading) 

Two upgrade methods are available depending on your network internet access: The `install128t` process which downloads and installs using an internet connection, or the `import iso` method where the ISO is downloaded onto a USB device, then loaded onto the Conductor, and installed from there. 

When using the `import iso` method, the `check-rpm-signature required` (default) option must be run. This ensures that the RPM signature and `sha256` digest of each package is validated during the import process. The use of `check-rpm-signature disabled` or `check-rpm-signature allow-unsigned` is not compliant for Common Criteria systems. For an online installation, signature checking is performed automatically. 

After upgrading the software, repeat the [Software Compliance Validation](cc_fips_access_mgmt.md#software-compliance-validation) steps to ensure continued compliance. 
 
:::important
Firmware and Software updates are expected to be performed by an Administrator on a regular basis, in response to the release of product updates due to known vulnerabilities. Only Common Criteria compliant software releases shall be installed on the target device.
::: 

## Uninstallation

Common Criteria requires the Administrator to ensure there is no unauthorized access possible to sensitive residual information (e.g. cryptographic keys, keying material, PINs, passwords, etc.) on Common Criteria certified network equipment when that equipment is discarded or removed from its operational environment. 

For the certified SSR platforms, all software and configuration reside on the SSD hard drive `/dev/sda`. Use the following procedure to zeroize/erase the SSD hard drive. 

1. Log in to the local serial console as the root user 

2. Enter the following to gracefully shut down SSR service: 
 
 `systemctl stop 128T` 

3. Enter the following command to enter single-user mode: 
 
 `systemctl emergency` 

4. Re-enter the root password when prompted 

5. Enter the following command to zeroize the SSD hard drive: 
 
 `dd if=/dev/zero of=/dev/sda bs=1M conv=fsync status=progress `
 
 This process may take 30 minutes or more and will report **No space left on device** when complete. 

 ![Uninstall and wipe SSD](/img/cc_fips_uninstall.png)
 
6. Power off the system, or use the following command for soft power-off: 
 `echo o > /proc/sysrq-trigger` 

The system is wiped of all information, and is no longer operational as an SSR. If the system is to be reused in future, perform the ISO installation process. 






