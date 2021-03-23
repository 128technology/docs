---
title: 128T Installer 2.7 Release Notes
sidebar_label: 2.7
---

## Release 2.7.0

### New Features and Improvements

- Support for 128T version 5.1

### Resolved Issues

- **IN-320 `createrepo` fails when upgrading:** The installer now uses unique temporary directories to hold temporary repodata instead of the default.
------
- **IN-385 Retry Query Operations:** Added the ability to perform multiple retry operations when querying remote repositories during the installation process. 

### Caveats

- **IN-343** - The installation process may incorrectly identify a failed download.
------
- **IN-375:** When deploying in AWS, verify that the latest AWS CLI is being used. 
------
- **IN-381:** If `tmux` has been installed on the system by another application, the version 2.7 Installer will have a conflict. 
	- If the `tmux` package is already present on a system, perform `yum remove tmux`. Then use `yum install 128T-installer` to install the new installer. Be careful to _only_ remove `tmux`; removing anything other than `tmux` may result in 128T operational or installation issues.  
------
- **IN-398:** An active tmux session/server process prevents `install128t` from running, and displays the following error:
   ```
      Failed to create install128t session
      No tmux session with name install128t found
   ```
   The following message may be logged in `/var/log/install128t/tmux_wrapper.log` : `protocol version mismatch (client 8, server 7)`. 

   _**Corrective Action:**_ Terminate all active tmux sessions/server processes and perform the installation/upgrade operation again.
