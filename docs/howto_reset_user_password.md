---
title: Resetting a Lost User Password
sidebar_label: Resetting a Lost User Password
---

Resetting a user or admin password requires entering the old password. For this reason it is highly recommended to keep password records accessible and secure. However, if a password is lost or forgotten and the account is inaccessible, the account password can be reset. 

In this situation, use the following procedure to change the lost password.

1. Log in to the Linux shell using `sudo`. 
2. Change the password for the corresponding Linux user. 

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
After changing the password in Linux, the SSR user must log in to the PCLI or the GUI and update their password there. 

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