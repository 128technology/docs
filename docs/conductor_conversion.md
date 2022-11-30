---
title: Conductor Conversion
sidebar_label: Conductor Conversion
---

An SSR device (SSR1xx or SSR 1xxx) shipped with SSR 5.4.x Routing software may be reinitialized as a conductor for use in an existing network. The conductor can be used with or without Cloud Telemetry for devices running pre 6.0.x SSR software.

Use the following procedure to reinitialize an SSR 1xx/1xxx as a conductor.

1. To start the Initializer, run the `initialize128t` command. `initialize128t` must always be run as the root user, or with `sudo initialize128t`.

:::note
The SSR softare must not be running during initialization. The Initializer will detect when the SSR is running and exit with this message:

```txt
SSR is running; cannot launch Initializer
```

To stop the SSR, follow the steps shown in the
[Installation Guide](intro_installation.md#stopping-the-128t-routing-software).
:::

2. In the SSR Initializer wizard, use the space bar to select the **Conductor**role for the SSR node, and press the **Enter** key to select **OK**.

  ![SSR Role](/img/initializer_Serial2.png)

3. When asked _What kind of Router/Conductor node is this?_, select **Standalone** from the following options:

 ![Identify the Node](/img/initializer_standalone.png)

- **Standalone:** This router/conductor has no highly available peer, and is not currently planned for high availability.

4. Enter the following system properties on the **Node Info** screen:

  ![Node Information](/img/initializer_Serial5.png)

  - **Node Name:** The name of the system within your SSR Router or Conductor, for example, _conductor_. By default this field uses the Linux system's hostname. The node name identifies the conductor node under the **Conductor** element in the Authority. 

  :::note
  Both routers and conductors can consist of one node (for standalone systems) or two nodes (for highly available systems).
  :::

  - **Conductor Name:** The name of the Conductor system as a whole. When referring to a running SSR software instance, it is identifiable by the full name of `nodeName.routerName`; e.g., `conductor-node1.conductor`. The full system name is reflected in the PCLI prompt.

5. On the **Password Setup** screen, create a password for the SSR Admin user. The administrator password must be at least 8 characters long, contain at least 1 uppercase letter, at least 1 lowercase letter, at least 1 number, cannot contain the username in any form, and cannot repeat characters more than 3 times. This operation is only performed on the standalone or first node in the HA peer, and the password must be entered twice. 

  :::note
  Resetting a password requires entering the old password. If a password is lost or forgotten and the account is inaccessible, the account cannot be recovered. Please keep password records accessible and secure. 
  :::

  ![Password Setup](/img/initializer_Serial6.png)

6. Press the **Enter** key to select **OK**. The Initializer performs a hardware compatibility check. The compatibility check may fail due to warnings or failure notices, which are displayed in the output script. If no failures are present, you can choose to continue with the installation even if multiple warnings exist. For information on why a specific test may have failed or generated a warning, contact Juniper Technical Support.

7. When prompted, select `<Yes>` to start the conductor.

  ![Initializer Complete](/img/initializer_complete.png)

  :::note
  If installing the SSR software for the first time, a system reboot is required.
  :::

Additional information about the `initializer` can be found in the [Initializer Command Line Reference section](initializer_cli_reference.md).

### Verify Installation

After installing the SSR Routing Software it is important to verify that the installation was completed successfully.

#### To Verify the SSR Installation:

1. Launch a command prompt window.

2. Execute the command:

   ```
   sudo systemctl status 128T
   ```

   **Result:** The service is listed as _Active (running)_.<br/>If the service is listed as _Inactive_, run the `sudo systemctl start 128T` command. This may take several minutes to fully launch the service.

3. Once the service is listed as _Active_, log into the system as Admin using the system default password.<br/>**Result:** The installation is verified.

4. Close the command prompt window.

## Next Steps

See [Router Interactive Installation](intro_installation_bootable_media.md) or [Router Installation Using OTP](intro_otp_iso_install.mdx) for steps to install your routers. 

If your deployment will take advantage of Mist Telemetry, see [Enable WAN Assurance on the Conductor](config_wan_assurance.md#enable-wan-assurance-on-the-conductor) for those next steps. 

