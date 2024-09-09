---
title: Password Change and Account Recovery
sidebar_label: Password Change and Account Recovery
---

## Changing your Password

Changing a user password requires entering the old password. For this reason it is highly recommended to keep password records accessible and secure. User password reset is typically performed from the GUI. 

1. Access your user profile from the GUI.
2. Under **Profile** select **Change Password**.

![User Profile](/img/user-profile.png)

3. Enter your current password, new password, and confirm the new password.

![Change Password Screen](/img/user-change-password.png)

4. Click **Save**.

Additionally, changing the user password can be performed from the command line using the `set password` command.

```
user222@node1.conductor# set password
Changing the current password will log this user out of all active sessions. Subsequent logins will require the new password to authenticate.
Enter your current password:
Enter a new password:
Confirm:
✔ Modifying password...
Password updated successfully
```

## Account Recovery - Administrator Activity 

For a situation where an admin or user password is lost and the account is inaccessible, the Administrator can recover access to the account. In this situation, use the following procedure to reset the lost password.

:::important
This process should only be used to recover access to an account where the password has been lost. 
:::

1. Make sure the 128T process is running. If it is not running or is restarted before logging into the PCLI and making the update, the password change will be lost. 
2. Log in to the Linux shell. 
3. Change the password for the corresponding Linux user. In this example the `admin` user password has been lost. The same procedure is used for a lost user password. 

```
$ whoami
t128
$ sudo passwd admin
[sudo] password for t128:
Changing password for user admin.
New password:
Retype new password:
passwd: all authentication tokens updated successfully.
```
After changing the password in Linux, the admin/user must log in to the SSR PCLI or the GUI and update the password. If this step is not followed, the next time the SSR is restarted the change will be lost. 

1. Log into GUI/PCLI.
2. Change the password for the admin/user again via the GUI/PCLI. This will ensure that the password change remains persistent across SSR restarts.

```
$ sudo su admin
admin@node1.conductor# set password
Changing the current password will log this user out of all active sessions. Subsequent logins will require the new password to authenticate.
Enter your current password:
Enter a new password:
Confirm:
✔ Modifying password...
Password updated successfully
```

