<!---FIPS Enforcement Mode--->

FIPS Enforcement is available for **version 6.0 and later**. FIPS mode can be enabled manually during the installation. In cases where the flag was not or cannot be set during installation, a FIPS RPM is available for download from the SSR repos, and can be installed.

:::important
If you require strict FIPS compliance, the `fips=1` kernel option must be added to the kernel command line during system installation to ensure that key generation is done with FIPS approved algorithms and continuous monitoring tests in place.

If FIPS enablement is done retrospectively via RPM installation, the already created accounts could be using non-FIPS compliant cyphers.
:::

Use the following procedure to enable FIPS enforcement.

1. Use up/down keys to highlight the desired install mode. 

  ![Bios Install](/img/56fips_BIOSinstall_1.png)

2. Press TAB to edit the config.

3. Add `fips=1` to the end of the vmlinuz parameters.

  ![FIPS Parameter](/img/56fips_BIOSinstall_2.png)

4. Press Enter to start the install. 