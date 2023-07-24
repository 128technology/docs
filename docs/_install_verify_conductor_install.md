<!---Verify Conductor Installation --->

After installing the SSR Software it is important to verify that the installation was completed successfully.

### To Verify the SSR Installation:

1. Launch a command prompt window.

2. Execute the command:

  ```
  sudo systemctl status 128T
  ```

3. When the service is listed as _Active_, log into the system as Admin using the system default password. By logging into the system, you have verified the installation. 

### Change the Default Passwords

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