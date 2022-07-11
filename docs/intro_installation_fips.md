---
title: Next Generation Installation
sidebar_label: Next Generation Installation
---

Versions 5.6.1 and higher and version 6.0 overview of how and why here

### FIPS 

For release 6.0 and later there are two methods to enable FIPS enforcement, depending whether the system is installed using the package-based install or the image-based install.

The package-based workflow requires that the `fips=1` flag be manually set during the installation. In cases where the flag was not or cannot be set during installation, a fips rpm is available for download and can be installed.

1. Use up/down keys to highlight the desired install mode
	![Bios Install](/img/56fips_BIOSinstall_1.png)

2. Press TAB to edit the config.

3. Add ‘fips=1’ to the end of the vmlinuz parameters
	![FIPS Parameter](/img/56fips_BIOSinstall_2.png)

4. Press Enter to start the FIPS install

The image-based installation is performed from a menu that is dynamically generated at install time. 

1. Select ‘5’ for the install option to select “Enable FIPS 140-2 mode” (the leading asterisk indicates the currently selected entries). 
	![Generated Meu](/img/60fips_install_1.png)

2. The resulting system boots into FIPS 140-2 enforcing mode. 
	![Boot](/img/60fips_install_2.png)

3. Verify FIPS mode is active by reading the kernel crypto state using `sysctl`. The result is an error when attempting to use a non-FIPS compliant crypto such as md5.
	![Error Message at bottom](/img/60fips_install_3.png)