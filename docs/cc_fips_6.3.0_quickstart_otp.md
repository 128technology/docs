---
title: QuickStart the SSR Router
sidebar_label: QuickStart the SSR
---

:::important
Before beginning the Quickstart process, verify that you have enabled [Strict Host Key Checking](cc_fips_6.3.0_otp_router_install.md#enable-strict-host-key-checking) and provisioned the host keys on the router. Failure to enable strict host key checking will invalidate the security of the communications between the conductor and routers. 
:::

Use this procedure to set up a typical standalone branch router leveraging the QuickStart capabilities of the SSR Networking Platform.

When a router configuration has been added to the conductor but the device has not yet connected, QuickStart instructions will be displayed in place of device-specific information.

1. On the Conductor, use the web interface to access **Routers** -> **Router Name** -> **QUICKSTART LINK** to begin the QuickStart process. 

![QuickStart Generate QuickStart Link](/img/intro_ztp_quickstart_server_2.png)

2. Confirm the basic information about the target router, the *router name*, *node name*, and *asset ID*. The *device host address* is the IP address that is assigned to the SSR router during the staging process. By default this is set to `192.168.0.128`.

3. Enter the password that will be used to encrypt the contents of the QuickStart file. This password will be required when applying the file to the target router.

![QuickStart Link Generation](/img/intro_ztp_quickstart_server_3.png)

4. Copy the auto generated “Password” (this can be set to a different value).
5. Follow step 1 in the Quickstart dialog to download the QuickStart file locally by selecting the “Click Here” link.
6. Connect the computer that contains the QuickStart file to any ethernet port except for port 1 on the router. Ensure DHCP is enabled on the computer connected to the router.
7. Follow step 2 in the Quickstart dialog: Click the link to start the QuickStart URL process.
8. Login locally to the new router with the default username `admin` and password `128Tadmin`.
9. Drag and drop the QuickStart file and click **Proceed**.

![QuickStart file upload](/img/intro_ztp_quickstart_client_1.png)

10. Paste the “Password” previously copied to unencrypt the QuickStart file and click “Continue”

![QuickStart Password Field](/img/intro_ztp_quickstart_client_2.png)

11. Click **Proceed** to start this process. Optionally, select the “Show Details” slider to view the full configuration.

![QuickStart File Accepted](/img/intro_ztp_quickstart_client_3.png)

After a couple minutes, this process completes and your SSR Router is fully configured.

![QuickStart Working](/img/intro_ztp_quickstart_client_4.png)

After a few more minutes, the router QuickStart webpage will show a message that the router was successfully configured.

![QuickStart Success](/img/intro_ztp_quickstart_client_5.png)

### Enable Strict Host Key Checking 

Enabling strict `host-key-checking` provides secure communication between the conductor and a router. 
Similar to SSH, there are two `host-key-checking` options; `yes` which requires the host key to be provisioned manually, or `accept-new` which accepts the key on first connection. 

There are two configuration parameters where `host-key-checking` can be set: 

- **`inter-router host-key-checking`** controls host key verification between a router and the conductor. When set to `yes`, strict host key checking is enabled between the router and the conductor. However, the host keys must be manually provisioned on each router. 
 
 ```
 config authority router RTR_EAST_COMBO node combo-east-1 ssh-settings inter-router host-key-checking yes
 config authority router RTR_EAST_COMBO node combo-east-2 ssh-settings inter-router host-key-checking yes
 ```

- **`inter-node host-key-checking`** controls host key verification between redundant HA nodes. When set to `yes`, strict host key checking is enabled between the router and the conductor **between each node** of an HA router. However, the host keys must be manually provisioned on each router. 

```
config authority router RTR_EAST_COMBO node combo-east-1 ssh-settings inter-node host-key-checking yes
config authority router RTR_EAST_COMBO node combo-east-2 ssh-settings inter-node host-key-checking yes
```
 
To save the work of manually provisioning the host key on the router, set the `accept-new` parameter. This automatically loads the host key on first connection.

```
config authority router RTR_EAST_COMBO node combo-east-1 ssh-settings inter-router host-key-checking accept-new
```

Use the `show system connectivity known-hosts` to view the accepted host keys for the current node.

#### Manual Provisioning of the Conductor Key

If a router is configured for strict `inter-router host-key-checking` (set to `yes`), but **does not** have `accept-new` configured, it will be necessary to manually provision the conductor key **prior** to onboarding the router to the conductor. This will require the administrator to retrieve the host key of each node of the conductor and configure this in the router.

On the conductor, identify the `key` for each node using the command `show system connectivity host-keys node all`.

From the router PCLI, provision each conductor key using the following command:
`create system connectivity known-hosts node <node> <conductor address> ssh-rsa <key> <comment>`

- `<node>` is the router node. The key should be added on each router node in an HA pair. 
- `<conductor address>` is the conductor address. This should be added for each conductor address of an HA conductor pair.
- `<key>` is the `Key` retrieved from the previous step.
- `<comment>` is an option that can be used to identify the key; for example `Conductor1`.

The following example manually configures the key to the conductor node `192.168.1.13`:

`create system connectivity known-hosts router RTR_EAST_COMBO node combo-east-1 [192.168.1.13]:930 ssh-rsa <public key contents>`

### Root Access
To permit root access to the SSR system, ensure that there is at least one user configured on each system with super user (sudo) privileges. Failure to do so may result in the loss of management connectivity to the router. 
**Logging in as `root` over SSH is not permitted.**

Prerequisites for installation and upgrades now include configuring a super user in `/etc/sudoers` that is allowed to execute Linux shell commands as root (sudo privileges).
During an upgrade, if the existing version allows SSH Root login, it will be disabled. When a system is installed using the OTP ISO, a "t128" user is automatically configured with sudo privileges. 

1. Login using the admin credentials. 
2. Enter the Linux shell: Type `shell` to suspend the CLI and enter the Linux shell. 
3. Type `su` and enter the default root password. 
4. Use the following command to grant sudo privilege to the `admin` user account: 
 `/usr/sbin/visudo` 
5. Add an entry for admin as follows: 
 ```
 admin    ALL=(ALL)      ALL
 ```
6. Save the file and exit from `visudo`.
7. Type `exit` to leave the `su` prompt. 

### Change the Default Passwords

The following user accounts and passwords are created during the ISO installation process:

| Username | Password   |
| -------- | ---------- |
| root     | 128tRoutes |
| t128     | 128tRoutes |

Change these passwords immediately. Use the `passwd` command from the Linux shell to individually set the password for each username. 

```
[admin@localhost ~]$ sudo passwd t128
Changing password for user t128
New password:
Retype new password: 
passwd: all authentication tokens updated successfully.
[admin@localhost ~]$ sudo passwd root 
Changing password for user root.
New password:
Retype new password: 
passwd: all authentication tokens updated successfully.
[admin@localhost ~]$
```

:::note
The root account will not be used for day-to-day access, but the root account password should be stored securely off-box so that it can be used for admin account recovery if required. 
:::

### Software Compliance Validation

After installing the SSR Software, it is important to verify that the installation successfully  completed and that the system is running in the FIPS enforcememt mode required for Common Criteria compliance. After starting the SSR router or conductor, the login screen appears on the console. Alternatively you may `ssh` to the SSR management IP address using the admin account. 

1. Login using the admin credentials. 
2. Use `show system version`  to verify the correct software release is running: 

```
Last login: Thu Dec 14 13:28:36 UTC 2023 on pts/0
admin@conductor.conductor# show system version
Fri 2024-03-01 16:23:37 UTC
✔ Retrieving system version 1/1 targets complete...

=========== =========== ========= ======== ====================== =====================
 Router      Node        Version   Status   Build Date             Package
=========== =========== ========= ======== ====================== =====================
 128t-east   128t-east   6.2.5     r2       2024-06-06T23:56:25Z   128T-6.2.5-5r2.el
                                                                   7 (package based)

Completed in 0.05 seconds
admin@conductor.conductor#
```
 It should report Version 6.2.5 and Status r2.
 
3. Type `shell` to suspend the CLI and enter the Linux shell. 
4. Execute the command `sudo systemctl status 128T` and verify the service is listed as `active (running)`.

```
[root@conductor-test admin]# sudo systemctl status 128T -l
 128T.service - 128T service
  Loaded: loaded (usr/lib/systemd/system/128T.service; enabled; vendor preset: disabled)
  Active: active (running) since Mon 2023-7-31 18:04:29 UTC; 50min ago
 Main PID: 23317 (processManager)
```
 
5. Perform the following steps to verify the software integrity and protect against future tampering: 
 
- Execute the self-test scan `sudo systemctl start 128T-rpm-verify` 
 
 The self-test scan is intiated and takes approximately two minutes to complete. Upon completion, run: 

 `systemctl status 128T-rpm-verify` 

 The scan validates all executable files on the system against the `sha256` digest hash recorded in the signed RPMs from which they were installed. This ensures that no files have been replaced or tampered with. 

- Run `systemctl status 128T-rpm-verify` to confirm that the service shows:

 `PASS: All RPM file digests verified`
 
- If the result displays the following:

 `FAIL: RPM file digest mismatch detected`

 The failure must be resolved before continuing to ensure compliance. The full path to each file having a self-check digest mismatch is reported as part of the `status` output. 
 
- After the self-test scan test has succeed, enable the automatic self-test by executing the `enable` command in the linux shell:

 `sudo systemctl enable 128T-rpm-verify`

 The self-test is enabled on every subsequent reboot. If the self-test fails, the 128T service will not start.  
 
6. Perform the following steps to verify that FIPS security enforcment mode is enabled in the OS:
 `openssl md5 /dev/null` 
 Expected result:  `digital envelope routines … Disabled for fips` 

7. Run the following command to verify that FIPS security enforcing mode is enabled in the kernel: 
 `cat /proc/sys/crypto/fips_enabled` 
 Expected result:  `1`  

8. Type `exit` to leave the Linux shell and return to the CLI. 
9. Type `quit` to log out from CLI. 

You have now completed security validation of the installation.  

### CLI Access Post Install

Use the following procedure to access the CLI at any time after installation. 

1. Open a terminal window and SSH to the SSR's IP address. 
2. Use your login credentials to log in to the SSR 
 
 - If using an account other than admin, type `pcli` to start the SSR CLI. 

 - Type `shell` to suspend the CLI and enter the Linux shell.  

To terminate an active session: 

- Type `exit` to return from the Linux shell to the CLI. 

- Type `quit` to log out from CLI.

- If using an account other than admin, type `exit` to end the login session. 

Common Criteria certiﬁcation does not require any restrictions on executing commands. See the [Conﬁguration Command Reference Guide](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/config_command_guide) for command information and usage. 

Congratulations, you have setup your SSR router.
