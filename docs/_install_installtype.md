<!---Choose the Installation Type--->

After imaging the ISO onto removable media, insert it into the target device and power it on.

Upon boot, the following screen is displayed. The default selection is booting to the serial console (115200 baud). You must manually choose the installation process suited for your environment. 

To install using the Interactive Installation, use the arrow keys to select either `Install 128T Routing Software Serial Console` or **`Install 128T Routing Software VGA Console`**. As noted earlier, this guide describes the installation process using the Interactive Installation, specifically using the VGA console.

![VGA Boot with Interactive Install](/img/install_select_interactive.png)

Differences for the serial console are described in [Serial Console Installation Information](#serial-console-install-information). 

:::note
Because not all hardware has video support, booting to the serial console 115200 baud is the default, and is automatically selected after 30 seconds. When using the serial console, the terminal size is 80x25 - anything smaller may result in abnormal navigation behavior.

Selecting the wrong type of console (Serial or VGA) may result in garbled characters being displayed. If allowed to continue it will result in an incorrect installation. If the wrong console is selected, reboot the target system and select the correct line for the target hardware.
::: 

#### Install via Serial Console

Use this option when running on hardware with no video chipset. It uses `/dev/ttyS0` 115200 baud as the serial console for interacting with the installer. 

![Serial Install Selection](/img/install_select_interactive2.png)

For serial console issues please refer to [Serial Console Troubleshooting](ts_serial_console_tsing.md).

#### Install via VGA Console

Use this option when running on hardware that has onboard graphics chipsets. This installs SSR software using the GUI installer.

The procedure that follows here is the **Interactive Install on the VGA Console**.