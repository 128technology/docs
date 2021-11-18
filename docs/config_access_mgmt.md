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

## SSH Idle Time
Idle SSH sessions are logged out after 60 minutes of inactivity. When using the manual install process, it is strongly recommended to use the Screen utility to avoid an SSH session timeout. Screen allows you to disconnect from the terminal without interrupting the program being executed, circumventing any timeout and disconnection issues. Use the following procedure to perform the manual installation from Screen. 

From the terminal window:
1. Create a screen and attach to it.
	- `screen-d -m -s <name-of-screen-session>`
	- `screen -x <name-of-screen-session>`
2. Shut down the salt-minion.
	- `sudo systemctl stop salt-minion`
3. Run the installer from the Screen session.
	- `sudo install128t`
4. Respond to the interactive install questions as required.
5. When the upgrade/installation process begins, you can safely detach from the Screen session. 
	- `ctrl+a`
	- `d`

For additional information about the manual installation process with Screen, please refer to [Manually Installing the 128T](intro_installation_installer.md).

### Additional Changes to SSH Parameters
- The SSH login grace time is limited to waiting for one minute for a password to be entered.
- SSH access is limited to users assigned to the `wheel` group.
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
- Verification of the `*.gz` file format.  
