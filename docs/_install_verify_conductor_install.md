<!---Verify Conductor Installation --->

After installing the SSR Software it is important to verify that the installation was completed successfully.

### To Verify the SSR Installation:

After starting the Conductor, the login screen appears. 

1. Login using the admin credentials.

```
test-conductor login: admin
Password:
```
  ![Conductor Admin Login](/img/conductor_install1.png)

2. Enter the Linux shell:

  a. Type `exit` to exit the PCLI.

  b. Type `shell` and press `Enter` to enter the linux shell.

3. Log into the command window as `root`.
4. Execute the command: `sudo systemctl status 128T`

![Linux Shell](/img/conductor_install2.png)

5. When the service is listed as _Active_, log into the system using the system default password. By logging into the system, you have verified the installation. 