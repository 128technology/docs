---
title: Username and Password Policies
sidebar_label: Username and Password Policies
---

Username and password requirements are listed below. For a list of the CLI commands and how they are used to configure and enforce requirements, please refer to [`configure authority password-policy`](https://www.juniper.net/documentation/us/en/software/session-smart-router/docs/config_command_guide#configure-authority-password-policy).

### Password Requirements

The SSR password policies have been updated to provide a more secure experience. When creating passwords and password policies for users, the following parameters are enforced.

1. Password must contain 1 capital, 1 lower case, 1 number and 1 special character.
2. Password must be at least 9 characters.
3. Minimum password length is configurable (greater than 9).
4. When a password is changed, characters must be changed in at least eight of the positions within the password.
5. The minimum password lifetime is 24 hours/1 day.
6. There is a 60-day maximum password lifetime restriction.
7. Password reuse is prohibited for a minimum of **five** generations.
8. A temporary password for system logons is allowed, with an **immediate** change to a permanent password.
9. The default admin password **must** be changed to strong password on first use.
10. The maximum failed login attempts are configurable, with a default of 6.
11. User lock time (time the user must wait before attempting login after reaching the max failed attempts) is configurable. The default is 1800 seconds.


### Using the Web Interface

The Password Policy dialog under Authority Settings can be used to adjust password settings.

![Configure Password Policies](/img/config-password-policies.png)

### Username Requirements

1. Usernames may contain only lower and upper case letters, digits, underscores `_`, or dashes `-`. 
2. They can end with a dollar sign `$`. 
3. Dashes `-` are not allowed at the beginning of the username. 
4. Fully numeric usernames and usernames beginning with `.` are not recommended. 
5. Usernames may only be up to 32 characters long.
6. The `.` character is allowed within a username: `firstname.lastname`.
