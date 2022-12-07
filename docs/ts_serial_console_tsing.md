---
title: Serial Console Troubleshooting
sidebar_label: Serial Console Troubleshooting
---

Please note that Legacy and UEFI consoles display differently. The following is the  installation screen when booting to a Legacy console:

![Boot Screen](/img/intro_install_LegacyInstall.png)

The following is the  installation screen when booting to a UEFI console:

![New Boot Screen](/img/intro_install_OTPInstall_1.png)

## Troubleshooting

- Default baud rate for serial console access is 115200/8-n-1
- When performing an installation via the serial console, some systems do not interpret control characters that may be passed on the serial console line. For example, the following may be seen during the installation process:

  ![Corrupt Serial Install Complete](/img/install_serial_corrupt.png)

  In cases where the screen output becomes unreadable, use the following procedure. 
  - Type: `^a` (Ctrl-a)
  - Type: `k`
  - Type: `y` [for yes to exist screen]
  - Reconnect with screen (i.e., Screen command could be `screen /dev/tty.usbserial-1430 115200`).
  - Type: `^l` (Ctrl-l) (lower case L) to repaint the screen. 

  ![Resolved Serial Install Complete](/img/install_serial_resolved.png)

  :::note
  Repaint does not work on the initial boot screen when imaging a system. If the serial console is disconnected, it is recommended to restart the system and begin the imaging process again.
  :::

  Repeat these steps if the screen becomes unreadable at any time during the initialization process. 


