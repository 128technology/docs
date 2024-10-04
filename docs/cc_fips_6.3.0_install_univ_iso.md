---
title: SSR Installation
sidebar_label: SSR Installation
---

Before beginning, ensure that you have an appropriate rollover cable available to connect to your computer. The SSR has a console port (CONSOLE) with an RJ-45 connector. Use the console port to connect the SSR to a management console or to a console server. The baud rate of the console port is 115200 bps.

1. Connect an RJ45 rollover cable to the console port on the SSR device.
2. Connect the other end of the cable to your computer.
3. Insert your bootable USB with the new ISO image into the USB port of the SSR device.
4. Connect the power input to the SSR device.
5. Power on the SSR.
6. At the instruction in the terminal window: `Press ESC for boot menu`, do so.
7. From the boot menu, enter the boot device number corresponding to your USB, and press Enter.
8. From the boot menu select **TAB** or **DEL** to enter Setup.

  ![Boot menu](/img/u-iso1_install_presstab_setup.png)

9. Select the Boot image on the USB device you wish to install. In the example below, there is only one image downloaded. 

  ![Choose Image](/img/u-iso2_choose_image.png)

10. At the Install menu, select Serial or VGA.

  ![Install Type](/img/u-iso3_choose_install_type.png)

11. To enable FIPS Enforcement for SSR software, select Install Option 1, and select **Enter**. This ensures that key generation is done with FIPS approved algorithms and continuous monitoring tests in place.

  :::important
  FIPS mode is required for Common Criteria compliance. Failure to configure FIPS mode, or the use of any other cryptographic engine nullifies compliance.
  :::

 The download and installation begins.

  ![Unpacker](/img/u-iso5_begin_install.png)

12. When the installation completes, you will be prompted to reboot. A reboot is necessary to start the services and launch the GUI. Device intialization and management is performed from the GUI.
  
  ![Unpacker Successful](/img/u-iso6_unpacker_complete.png)


  ![Final Install Screen](/img/u-iso7_serial_install.png)

**Great job! Your software has installed, now let's go [initialize your device!](cc_fips_6.3.0_initialize_u-iso_device.md)**