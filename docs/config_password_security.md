---
title: Password Security
sidebar_label: Password Security
---

Password security is one of the first lines of defense for every organization, and Juniper recommends strong password security. For information on password requirements, see [Password Policies](config_password_policies.md).

## Set a Password for the System Accounts

Setting the password for the system accounts (`admin`, `root`, and `t128`) is performed during initialization from either the web interface, the conductor command line, or the interactive intializer. All system account passwords are set to the same value, preventing any of the account passwords from being overlooked. 

Create a password for the SSR system accounts. The password must be at least 9 characters long, contain at least 1 uppercase letter, at least 1 lowercase letter, at least 1 number, cannot contain the username in any form, and cannot repeat characters more than 3 times. 

### From the Web Interface

From the Conductor Association screen, select PASSWORD, or PASSWORD HASH, and enter a password for the system accounts. Selecting PASSWORD HASH will generate a pre-salted sha512 hashed password using the text you enter.

![Conductor Association](/img/u-iso9_define_conductor.png)

Click ASSOCIATE to assign the password to the `admin`, `root`, and `t128` user accounts.

### From the Command Line

Use the `initialize conductor` command to set the SSR system account passwords. The password must be at least 9 characters long, contain at least 1 uppercase letter, at least 1 lowercase letter, at least 1 number, cannot contain the username in any form, and cannot repeat characters more than 3 times. 

```
admin@default.router# initialize conductor node-name c1 router-name conductor1
Enter a password for the SSR 'admin', 't128' and 'root' users:
Confirm:
✔ Initializing...
Device successfully initialized.

admin@default.router#
```
You can also specify the `password-hash` argument to generate a pre-salted sha512 hashed password using the text you enter.

:::note
The root account will not be used for day-to-day access, but the root account password should be stored securely off-box so that it can be used for admin account recovery if required. 
:::
