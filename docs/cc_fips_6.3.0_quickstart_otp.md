---
title: QuickStart the SSR Router
sidebar_label: QuickStart the SSR
---

Use this procedure to set up a typical standalone branch router leveraging the QuickStart capabilities of the SSR Networking Platform.

The SSR router will need to be provisioned on the conductor.

When a router configuration has been added to the conductor, but the device has not yet connected, in place of device-specific information, QuickStart instructions will be displayed.

After the configuration has been added to the authority on the conductor:

1. On the Conductor, use the GUI to begin the QuickStart process for the newly created SSR Router by accessing “Routers” -> “Router Name” -> “QUICKSTART LINK”

![QuickStart Generate QuickStart Link](/img/intro_ztp_quickstart_server_2.png)

2. Confirm the basic information about the target router, the *router name*, *node name*, and *asset ID*. The *device host address* is the IP address that is assigned to the SSR router during the staging process.  By default this is set to `192.168.0.128`.

3. Enter the password that will be used to encrypt the contents of the QuickStart file. This password will be required when applying the file to the target router.

![QuickStart Link Generation](/img/intro_ztp_quickstart_server_3.png)

4. Copy the auto generated “Password” (this can be set to a different value)
5. Follow step 1 in the Quickstart dialog to download the QuickStart file locally by selecting the “Click Here” link
6. Connect the computer that contains the QuickStart file to any ethernet port except for port 1 on the router. Ensure DHCP is enabled on the computer connected to the router.
7. Follow step 2 in the Quickstart dialog: Click the link to start the QuickStart URL process.
8. Login locally to the new router with the default username `admin` and password `128Tadmin`
9. Drag and drop the QuickStart file and click “Proceed”

![QuickStart file upload](/img/intro_ztp_quickstart_client_1.png)

10. Paste the “Password” previously copied to unencrypt the QuickStart file and click “Continue”

![QuickStart Password Field](/img/intro_ztp_quickstart_client_2.png)

11. Click “Proceed” to start this process. Optionally, select the “Show Details” slider to view the full configuration.

![QuickStart File Accepted](/img/intro_ztp_quickstart_client_3.png)

After a couple minutes, this process completes and your SSR Router is fully configured.

![QuickStart Working](/img/intro_ztp_quickstart_client_4.png)

After a few more minutes, the router QuickStart webpage will show a message that the router was successfully configured.

![QuickStart Success](/img/intro_ztp_quickstart_client_5.png)

### Change the Default Passwords after Installation

The following user accounts and passwords are created during the ISO installation process:

| Username | Password   |
| -------- | ---------- |
| root     | 128tRoutes |
| t128     | 128tRoutes |

Change these passwords immediately. Use the `passwd` command from the UNIX window.

```
[t128@test-router ~]$ passwd
Changing password for user t128
Changing password for t128
(current)UNIX password:
New password:
Retype new password: 
passwd: all authentication tokens updated successfully.
[t128@test-router ~]$ su - 
Password:
[root@test-router ~]# passwd
Changing password for user root.
New password:
Retype new password: 
passwd: all authentication tokens updated successfully.
[root@test-router ~]#
```

### Verifying Operation
The SSR router will have connected to the conductor.  The Router page that was previously empty should now be populated with information about the system. Go to the SSR Conductor UI to verify the process completed for this newly created SSR Router by accessing “Routers” -> “Router Name” -> “Node Name”
- Verify “SSR Processes” -> “All Processes Running”
- Verify “Asset Status” -> “RUNNING”
- Verify all 4 interfaces are “Up”

![QuickStart Verification](/img/intro_ztp_quickstart_verification.png)

Congratulations, you have setup your SSR router.
