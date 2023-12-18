---
title: Username and Password Policies
sidebar_label: Username and Password Policies
---

| Release | Modification |
| ------- | ------------ |
| 5.6.0   | Feature introduced |
| 6.0.1   | Added Max failed login attempts and User lock time. |
| 6.0.4   | Added Username requirements. |

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

### Username Requirements

1. Usernames may contain only lower and upper case letters, digits, underscores `_`, or dashes `-`. 
2. They can end with a dollar sign `$`. 
3. Dashes `-` are not allowed at the beginning of the username. 
4. Fully numeric usernames and usernames beginning with `.` are not recommended. 
5. Usernames may only be up to 32 characters long.
6. The `.` character is allowed within a username: `firstname.lastname`.

:::important
After upgrading to a release with new username pattern support, users can add a username using the above requirements. However, after rolling back a node to the previous release, the username delete will fail because the old user data model does not support the new format. Usernames that do not support the **old** username pattern should be deleted before rolling back nodes. If they are not, those users cannot be deleted after the rollback.
:::