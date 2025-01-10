---
title: Disable Console Output
sidebar_label: Disable Console Output
---

In some cases, you may want to disable console output to protect the information displayed. You may disable the output using either of the procedures below.

### From the GUI

1. Log in to the SSR as the `admin` user.
2. Under Configuration, select Authority.
3. Select the Router to disable the console output.
4. Select the node.
5. Under Basic Information, set the Serial Console Enabled to `false`.

![Console Output](/img/sec-disable-console-output.png)

6. Validate and Commit the change.
7. Reboot the router.

The router must be rebooted for the change to take effect. 

:::note
The console is disabled once the operating system starts. This means that during the initial bootup sequence, the console is fully functional regardless of the console setting.
:::

### From the CLI

1. Log in to the SSR as the `admin` user.
2. Use the following config example to configure `serial-console-enabled false`.

:::note
The `serial-console-enabled` command is only visible in Advanced User mode.
:::

```
authority
    router Fabric128
        node node1
            serial console enabled false
            exit
        exit
    exit
exit
```

3. Validate and Commit the change.
4. Reboot the router. The router must be rebooted for the change to take effect.

:::note
The console is disabled once the operating system starts. This means that during the initial bootup sequence, the console is fully functional regardless of the console setting.
:::

#### Upgrades

After disabling the serial console output (setting to `false`), a restart is required. The setting **will** perpetuate after an upgrade. Additionally, a restart is required after the serial console output is re-enabled (set to `true`).