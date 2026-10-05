---
title: Password Change and Account Recovery
sidebar_label: Password Change and Account Recovery
---

## First Login With a Default Password

Beginning with SSR 7.2.4-R2, default passwords require replacement after a fresh installation or full factory reset. When you log in with an expired or temporary password, complete the password-change prompts before continuing normal access with that account. You do not need to access your profile or run `set password` first. See [Default Passwords and First Login](config_password_security.md#default-passwords-and-first-login) for the `admin`, `root`, and `t128` procedures.

An expired default password is not a lost password. Use the first-login password-change workflow when you know the current credential; use account recovery below only when the password has been lost.

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
	If the `t128` password is expired, complete its password-change prompts before proceeding. Use the replacement password for the sudo password prompt below.
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

:::note
The admin password must be consistent across both nodes of an HA pair. Changing the password through the GUI/PCLI will update both nodes, but the `sudo passwd admin` linux command only updates the node where the command is executed. Repeat steps 1-3 above for each node of the HA pair before updating the password through the SSR PCLI or the GUI.
:::

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

