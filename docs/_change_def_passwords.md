<!---Change the Default Passwords--->

The following user accounts and passwords are created during the ISO installation process:

| Username | Password   |
| -------- | ---------- |
| root     | 128tRoutes |
| t128     | 128tRoutes |

It is *strongly recommended* that you change these passwords immediately. Use the `passwd` command from the UNIX window.

```
[t128@test-conductor ~]$ passwd
Changing password for user t128
Changing password for t128
(current)UNIX password:
New password:
Retype new password: 
passwd: all authentication tokens updated successfully.
[t128@test-conductor ~]$ su - 
Password:
[root@test-conductor ~]# passwd
Changing password for user root.
New password:
Retype new password: 
passwd: all authentication tokens updated successfully.
[root@test-conductor ~]#
```