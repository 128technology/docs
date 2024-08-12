---
title: Password Reset and Account Recovery
sidebar_label: Password Reset and Account Recovery
---

Resetting a user or admin password requires entering the old password. For this reason it is highly recommended to keep password records accessible and secure. 

### Password Reset Process

This process describes the typical password reset, and requires entering the current user password.

Use the `passwd` command from the Linux shell to individually set the password for each username. 

```
[admin@localhost ~]$ sudo passwd joeboat
Changing password for user joeboat
New password:
Retype new password: 
passwd: all authentication tokens updated successfully.
```

### Account Recovery - Lost Password 

For a situation where a password is lost and the account is inaccessible, the account can be recovered. In this situation, use the following procedure to change the lost password.

:::important
This process should only be used to recover access to an account where the password has been lost. 
:::

1. Make sure the 128T process is running. If it is not running or is restarted before logging into the PCLI and making the update, the password change will be lost. 
2. Log in to the Linux shell using `sudo`. 
3. Change the password for the corresponding Linux user. In this example the `admin` user password has been lost.

```
$ sudo
$ whoami
t128
$ sudo password admin
[sudo] password for t128:
Changing password for user admin.
New password:
Retype new password:
passwd: all authentication tokens updated successfully.
```
After changing the password in Linux, the SSR user must log in to the SSR PCLI or the GUI and update their password. If this step is not followed, the next time the SSR is restarted the change will be lost. 

1. Log into GUI/PCLI.
2. Change the password again via the GUI/PCLI. This will ensure that their password change remains persistent across SSR restarts.

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

