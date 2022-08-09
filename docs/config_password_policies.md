---
title: Password Policies
sidebar_label: Password Policies
---

| Release | Modification |
| ------- | ------------ |
| 5.6.0   | Feature introduced |

The SSR password policies have been updated to provide a more secure experience. When creating passwords and password policies for users, the following parameters are enforced.

1. Password must contain 1 capital, 1 lower case, 1 number and 1 special character.
2. Password must be between 8 and 15 characters.
3. Minimum and maximum password length must be configurable.
4. When a password is changed, characters must be changed in at least eight of the positions within the password.
5. The minimum password lifetime is 24 hours/1 day.
6. There is a 60-day maximum password lifetime restriction.
7. Password reuse is prohibited for a minimum of **five** generations.
8. A temporary password for system logons is allowed, with an **immediate** change to a permanent password.
9. The default admin password **must** be changed to strong password on first use.