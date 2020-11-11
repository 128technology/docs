---
title: Access Management on the 128T
sidebar_label: Access Management
---

Following industry security best practices, SSH features have been limited and in the case of SSH Root Login, have been disabled.

## Root Access
To permit root access to the 128T system, ensure that there is at least one user configured on each system with super user (sudo) privileges. Failure to do so may result in the loss of management connectivity to the router. 
**SSH Root login is not permitted.**

Prerequisites for installation and upgrades now include configuring a super user in /etc/sudoers that is allowed to execute Linux shell commands as root (sudo privileges).
During an upgrade, if the existing version allows SSH Root login, it will be disabled. When a system is installed using the OTP ISO, a "t128" user is automatically configured with sudo privileges. 

### Addtitional Changes to SSH Parameters
- The SSH Idle timeout interval is five minutes.
- The SSH login grace time is limited to waiting for one minute for a password to be entered.
- When creating a user with SSH privileges from the UI, that user must be assigned to an admin user group.

## Limiting Login Attempts
If a user attempts to login unsuccessfully six times within a 15 minute window, they will be locked out for 30 minutes. The failed attempts are cumulative from both SSH and the web interface. The user will need to wait, or their account can be reset by an admin from the Linux shell. 
Syntax to unlock:
`faillock --user <user> --reset`

:::note
User account status is managed independently per node of the HA pair.
:::

## File Upload Limitations
The `config import` functionality has the following constraints:

- A max file size of 25 MB – an error is displayed if the file size is too large.
- One upload per user every 15 seconds.
- Verification of the `*.gz` file format. This does not apply to uploading QuickStart files, Templates, and Custom Charts, as those files are verified before loading. 
